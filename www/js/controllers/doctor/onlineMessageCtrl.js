var onlineMessageCtrl = function($scope, config, storage, httpService, $state, tips) {

    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    $scope.messages = {};
    $scope.showMessage = [];

    /**
     * 获取网络预约
     * @param  {[type]} userId [description]
     * @return {[type]}        [description]
     */
    server.getMessages = function(userId) {
        var data = { "id": userId };
        var url = config.docApp + "/OnlineChats/GetDoctorChatView/";
        return httpService.get(url, data);
    }



    /*
        显示
     */
    client.show = function(type) {
        $scope.type = type;

        var showMessage = [];
        if (type == '新') {
            showMessage = $scope.messages.newUser;
        } else if (type == '未读') {
            showMessage = $scope.messages.newMsg;
        } else if (type == '所有') {
            showMessage = $scope.messages.all;
        }

        $scope.showMessage = showMessage;
        console.log(showMessage)
    }

    /*
        格式化message
     */
    client.formatMessage = function(messages) {
        $scope.messages.newUser = [];
        $scope.messages.newMsg = [];
        $scope.messages.all = messages;

        angular.forEach(messages, function(e, i) {
            //新客户
            if (e.NewUser) {
                $scope.messages.newUser.push(e);
            }
            //未读记录
            if (!e.IsRead) {
                $scope.messages.newMsg.push(e);
            }

        });


    }

    client.init = function() {
        var customer = storage.get(config.customerKey);
        params.userId = customer.CustomerUserId;

        server.getMessages(params.userId).then(function(response) {
            var allMessages = response.data.data;
            client.formatMessage(allMessages);
            client.show('新');
        });
    }



    client.init();

}
angular.module('controllers').controller('doc.onlineMessageCtrl', onlineMessageCtrl);