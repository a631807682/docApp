var onlineChatCtrl = function($scope, config, storage, httpService, $state, tips, $stateParams, $timeout) {


    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    //会话内容 .state .message
    $scope.contents = [];

    $scope.freeNum = 3; //默认免费数量
    $scope.freeIndex = 0; //
    $scope.freeStar = 0;

    //轮训昨天
    var enableConnect = true;
    $scope.$on("$destroy", function() { //视图销毁
        enableConnect = false; //轮询销毁
    });

    /**
     * 获取聊天室基本相信
     * @return {[type]} [description]
     */
    server.getChatInfo = function(chatId, userId) {
        var url = config.chatApp + "/ChatInfo/ChatRoomInfo/";
        var data = { chatId: chatId, userId: userId };
        return httpService.get(url, data);
    }

    /**
     * 获取聊天实时记录
     * @param  {[type]} chatId   [description]
     * @param  {[type]} userId   [description]
     * @param  {[type]} oldCount [description]
     * @return {[type]}          [description]
     */
    server.getChatItems = function(chatId, userId, oldCount) {
        var url = config.chatApp + "/ChattingServer/Connecting/";
        var data = { chatId: chatId, userId: userId, oldCount: oldCount };
        return httpService.connect(url, data);
    }

    /**
     * 写入聊天记录
     * @param {[type]} chatId      [description]
     * @param {[type]} userId      [description]
     * @param {[type]} content     [description]
     * @param {[type]} contentType [description]
     */
    server.setChatItem = function(chatId, userId, content, contentType) {
        var url = config.chatApp + "/ChattingServer/SetChatContent/";
        var data = {
            chatId: chatId,
            userId: userId,
            content: content,
            contentType: contentType
        };

        return httpService.post(url, data);
    }

    /**
     * 生成订单
     * @param  {[type]} chatId [description]
     * @return {[type]}        [description]
     */
    server.getOrder = function(chatId) {
        var url = config.docApp + "/Orders/GetOrderToPay/";
        var data = { OnlineChatId: chatId };
        return httpService.get(url, data);

    }


    /*
    	保持会话轮训
     */
    client.connecting = function() {

        if (enableConnect) {

            server.getChatItems(params.chatId, params.userId, params.oldCount).then(function(response) {
                //实时新会话内容
                var itemInfo = response.data;
                //会话内容
                var contents = $scope.contents;

                angular.forEach(itemInfo.contents, function(item, i) {

                    var newContent = {}; //新消息
                    var isWaiting = false;
                    //处理发送中信息
                    angular.forEach(contents, function(content, n) {

                        if (content.state == 'wait') {

                            if (angular.lowercase(content.message.UserId) == angular.lowercase(item.UserId) && content.message.Content == item.Content) {
                                newContent.state = 'success';
                                newContent.message = item;
                                $scope.contents[n] = newContent;
                                isWaiting = true;
                            }
                        }
                    })

                    //处理初始加载信息
                    if (!isWaiting) {
                        newContent.state = 'success';
                        newContent.message = item;
                        $scope.contents.push(newContent);
                    }

                    client.clear(15); //清空多余记录数

                })

                params.oldCount = itemInfo.oldCount;

                //检测免费条目
                client.checkFree();

                $timeout(client.connecting, 2 * 1000);
            }, function(response) {
                $timeout(client.connecting, 2 * 1000);
            });
        }

    }

    /*
    	清空多余记录
     */
    client.clear = function(max) {
        if ($scope.contents.length > max) {
            var cutNumber = $scope.contents.length - max;
            $scope.contents.splice(0, cutNumber);
        }

    }

    /*
    	检测免费条目
     */
    client.checkFree = function() {

        var contents = $scope.contents;

        var freeStarIndex = 0;
        var tempUserId = "";
        var patientId = "";

        $scope.freeIndex = contents.length;
        //查询已支付通知
        angular.forEach(contents, function(e, i) {

            if (e.message.ContentType == '通知') {
                //寻找收费完成通知
                var val = e.message.Content;
                var regStr = /\[PaymentCompletionHints\](.+?)\[\/PaymentCompletionHints\]/g;
                var ifReg = new RegExp(regStr).test(val);

                if (ifReg) {
                    freeStarIndex = i;
                    tempUserId = e.message.UserId;
                    patientId = tempUserId;
                }
            }

        });

        $scope.freeStar = freeStarIndex; //最后支付完成下标

        var changeTimes = 0;

        for (var i = freeStarIndex; i < contents.length; i++) {

            if (contents[i].message.ContentType != '通知') {

                if (tempUserId != contents[i].message.UserId) {
                    changeTimes++;
                    tempUserId = contents[i].message.UserId;
                }

                if (changeTimes > ($scope.freeNum * 2 - 1)) {
                    $scope.freeIndex = i;
                    break;
                }

            }

        }

    }

    /*
    	发送
     */
    client.sendMessage = function(contentType) {

        var val = params.message;

        if (val && val != "") {
            //展示未确认内容
            client.pushWaitingMessage(params.userId, val);
            //发送记录
            server.setChatItem(params.chatId, params.userId, val, contentType);
        }

        params.message = "";
    }

    /*
    	添加等待中信息
     */
    client.pushWaitingMessage = function(userId, message) {

        var contentMessage = {};
        contentMessage.UserId = userId;
        contentMessage.Content = message;
        contentMessage.CreatedOn = new Date().toLocaleString();

        var content = {
            message: contentMessage,
            state: 'wait'
        };

        $scope.contents.push(content);

    }

    /*
    	收费提示
     */
    client.payHints = function() {
        var contentType = 2;
        params.message = "[PayHints][/PayHints]";
        client.sendMessage(contentType);
    }

    /*
    	收费
     */
    client.pay = function() {

        server.getOrder(params.chatId).then(function(response) {
        	var orderId = response.data.data;

        });

    }

    client.init = function() {
        var customer = storage.get(config.customerKey);

        params.userId = customer.CustomerUserId;
        params.chatId = $stateParams.chatId;
        params.oldCount = 0;

        //初始化聊天室基本信息
        server.getChatInfo(params.chatId, params.userId).then(function(response) {
            var chatInfo = response.data.data;

            if (parseInt(chatInfo.ConsultationRight.Time) > 0) {
                $scope.freeNum = chatInfo.ConsultationRight.Time;
            }

            $scope.chatInfo = chatInfo;
            console.log($scope.chatInfo);

            client.connecting();
        });

    }

    client.init();

}
angular.module('controllers').controller('share.onlineChatCtrl', onlineChatCtrl);