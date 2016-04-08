angular.module('controllers', [])

.filter('isDate', function() {
    return function(content) {
        return angular.isDate(content);
    }
})
.filter("chatUser", function () {//用户名过滤器
    var filterfun = function (userId, users) {
        if (typeof (userId) != "undefined" && typeof (users) != "undefined") {
            if (users.MyUserInfo.CustomerUserId == userId) {

                return "我";
            }

            if (users.OtherUserInfo.CustomerUserId == userId) {
                return users.OtherUserInfo.Name;
            }

            return "无此用户";
        }

        return "";
    }
    return filterfun;
})
.filter("chatContent", function ($sce, config) {//会话内容过滤器 图片处理
    return function (content) {

        //去除标签
        var clearReg = /<[^>]*>/g;
        content = content.replace(clearReg, "");

        //图片处理
        var imagePath = config.host + "/Uploaded/Original/";
        var imageReg = /\[image\](.+?)\[\/image\]/g;
        var imageReplace = '<img src="' + imagePath + '$1" />';

        var regExp = new RegExp(imageReg);
        var ifReg = regExp.test(content);
        if (ifReg) {
            content = content.replace(imageReg, imageReplace);
        }

        //换行
        content = content.replace(/\[br\]/g, "<br/>");
        content = content + "<br/>";
        //console.log(content);
        return $sce.trustAsHtml(content);

    }

})
.filter("picSrc", function (config) {//会话内容过滤器 图片处理

    return function (photo) {
        var imagePath = "/img/noavatar.jpg";
        if (photo != null && photo != "") {
            imagePath = config.host + "/Uploaded/Original/" + photo;
        }
        return imagePath;
    }

})
.filter("systemHints", function ($sce) {//系统提示过滤器
    return function(content,chatSystemHints)
    {
        
        if (typeof (chatSystemHints) != "undefined") {
            //完成提示
            var paymentCompletionHintsReg = /\[PaymentCompletionHints\](.+?)\[\/PaymentCompletionHints\]/g;
            var regExp_1 = new RegExp(paymentCompletionHintsReg);
            var ifReg_1 = regExp_1.test(content);
            if (ifReg_1) {
                
                content = content.replace(paymentCompletionHintsReg, chatSystemHints.PaymentCompletionHints);
                return content;
            }

            //付款提示
            var payHintsReg = /\[PayHints\]\[\/PayHints\]/g;
            var regExp_2 = new RegExp(payHintsReg);
            var ifReg_2 = regExp_2.test(content);
            if (ifReg_2) {
                content = content.replace(payHintsReg, chatSystemHints.PayHints);


                //链接处理
                var linkReg = /\[a\]([\w\W]+)\[\/a\]/g;
                var regExp = new RegExp(linkReg);
                var ifReg = regExp.test(content);
                if (ifReg) {

                    //exec返回一个数组对象
                    var LinkTitle = linkReg.exec(content)[1];
                    content = content.replace(linkReg, LinkTitle);
                }

                return content;
            }

        }
        return content;
    }


})
.filter("needEven", function () {
    return function (content) {
        //链接处理
        var linkReg = /\[a\]([\w\W]+)\[\/a\]/g;
        var regExp = new RegExp(linkReg);
        var ifReg = regExp.test(content);

        return false;
    }
});;