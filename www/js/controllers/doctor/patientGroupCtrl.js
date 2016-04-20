var patientGroupCtrl = function($scope, config, storage, httpService, $state, $stateParams, $ionicModal, tips) {

    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    /**
     * 获取患者分组
     * @param  {[type]} userId [description]
     * @return {[type]}        [description]
     */
    server.getPatientGroup = function(userId) {
        var url = config.docApp + "/Patients/GetGroupAndCount/";
        var data = { id: userId };
        return httpService.get(url, data);
    }

    /**
     * 删除分组
     * @param  {[type]} groupId [description]
     * @return {[type]}         [description]
     */
    server.deletePatientGroup = function(groupId) {
        var url = config.docApp + "/PatientGroups/DeleteMyPatientGroup";
        var data = { patientGroupId: groupId };
        return httpService.get(url, data);
    }

    /**
     * 添加分组
     * @param {[type]} groupName [description]
     */
    server.addPatientGroup = function(groupName) {
        var url = config.docApp + "/PatientGroups/AddMyPatientGroup";
        var data = { groupName: groupName };
        return httpService.get(url, data);
    }

    /**
     * 
     * @param  {[type]} group [description]
     * @return {[type]}       [description]
     */
    client.delete = function(group) {
        var groupId = group.PatientGroup.PatientGroupId;

        //删除
        server.deletePatientGroup(groupId).then(function() {
            //重新获取记录
            server.getPatientGroup(params.userId).then(function(response) {
                params.patientGroups = response.data.data;

            })
        });
    }

    /*
        添加分组
     */
    client.addGroup = function() {
        var name = $scope.modalGroup.name;
        if (name == '') {
            tips.show('请填写分组名称');
            return;
        }
        //添加分组
        server.addPatientGroup(name).then(function() {
            //获取所有分组信息
            server.getPatientGroup(params.userId).then(function(response) {

                params.patientGroups = response.data.data;
                $scope.groupModal.hide();

            })
        })
    }

    /*
        打开病历弹出层
     */
    client.openGroupModal = function() {
        $scope.modalGroup = {
            name: ''
        };
        $scope.groupModal.show();
    }

    /*
        关闭病历弹出层
     */
    client.closeGroupModal = function() {
        $scope.groupModal.hide();
    }



    /*
        加载弹出层
     */
    client.loadModal = function() {
        /*
            病历弹出层
         */
        $ionicModal.fromTemplateUrl('group-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.groupModal = modal;

        });

        $scope.$on('$ionicView.beforeLeave', function() {
            $scope.groupModal.remove();
        });
    }



    client.init = function() {

        var customer = storage.get(config.customerKey);
        params.userId = customer.CustomerUserId;

        server.getPatientGroup(params.userId).then(function(response) {

            params.patientGroups = response.data.data;
            // console.log('init',params.patientGroups);

        })

        client.loadModal();

    }

    client.init();


}



angular.module('controllers').controller('doc.patientGroupCtrl', patientGroupCtrl);
