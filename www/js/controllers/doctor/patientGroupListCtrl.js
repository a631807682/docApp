var patientGroupListCtrl = function($scope, config, storage, httpService, $state, $stateParams, $ionicModal, $window) {


    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    $scope.imgPath = config.imgPath;

    /**
     * 获取分组病人
     * @param  {[type]} groupId [description]
     * @return {[type]}         [description]
     */
    server.getPatients = function(groupId) {
        var url = config.docApp + "/DiseaseCases/GetPatientWithCaseViewByGroup";
        var data = { patientGroupId: groupId };

        return httpService.get(url, data);
    }

    /**
     * 获取医生非默认分组
     * @param  {[type]} doctorId [description]
     * @return {[type]}          [description]
     */
    server.getDoctorGroups = function(doctorId) {
        var url = config.docApp + "/PatientGroups/GetCustomizeGroupsByDoctorId";
        var data = { "doctorId": doctorId };

        return httpService.get(url, data);
    }

    /**
     * 获取病人非默认分组
     * @param  {[type]} doctorId [description]
     * @param  {[type]} patientId [description]
     * @return {[type]}           [description]
     */
    server.getPatientGroup = function(doctorId, patientId) {
        var url = config.docApp + "/PatientGroups/GetCustomizeByPatientAndDoctor";
        var data = { doctorId: doctorId, patientId: patientId };

        return httpService.get(url, data);
    }

    /**
     * 更新患者分组关系
     * @param  {[type]} patientId [description]
     * @param  {[type]} groupIds  [description]
     * @return {[type]}           [description]
     */
    server.updatePatientGroup = function(patientId, groupIds) {
        var url = config.docApp + "/PatientGroups/UpdatePatientGroupMap";
        var data = { patientId: patientId, groupIds: groupIds };

        return httpService.post(url, data);

    }

    /*
        打开分组弹出层
     */
    client.openGroupModal = function(patient) {

        var doctorId = params.userId;
        var patientId = patient.Patient.PatientId;

        server.getPatientGroup(doctorId, patientId).then(function(response) {

            $scope.modalPatientGroup = response.data.data;
            $scope.modalPatientId = patientId;

            $scope.groupModal.show();
        })


    }

    /*
        关闭分组弹出层
     */
    client.closeGroupModal = function() {
        $scope.groupModal.hide();
    }

    /*
        保存分组
     */
    client.saveGroup = function() {
        var groups = $scope.modalPatientGroup;
        var patientId = $scope.modalPatientId;

        var groupIds = [];

        angular.forEach(groups, function(e, i) {
            groupIds.push(e.PatientGroupId);
        })

        server.updatePatientGroup(patientId, groupIds).then(function(response) {

            $scope.groupModal.hide();
            $state.go('doc.patientGroup');
            //$state.go('doc.profile')

        })

    }

    /*
        打开病历弹出层
     */
    client.openCaseModal = function(diseaseCases) {
        $scope.modalCase = diseaseCases;
        $scope.caseModal.show();
    }

    /*
        关闭病历弹出层
     */
    client.closeCaseModal = function() {
        $scope.caseModal.hide();
    }

    /*
        加载弹出层
     */
    client.loadModal = function() {
        /*
            病历弹出层
         */
        $ionicModal.fromTemplateUrl('case-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.caseModal = modal;
        });

        /*
            分组弹出层
         */
        $ionicModal.fromTemplateUrl('group-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.groupModal = modal;
        });


        $scope.$on('$ionicView.beforeLeave', function() {
            console.log('destroy')
            $scope.caseModal.hide();
             $scope.groupModal.hide();
            $scope.caseModal.remove();
            $scope.groupModal.remove();

        });
    }


    client.init = function() {
        var customer = storage.get(config.customerKey);
        params.userId = customer.CustomerUserId;

        params.groupId = $stateParams.groupId;
        //获取分组患者列表
        server.getPatients(params.groupId).then(function(response) {
            $scope.patients = response.data.data;
        });
        //获取医生分组
        server.getDoctorGroups(params.userId).then(function(response) {
            $scope.doctorGroups = response.data.data;
        })

        client.loadModal();

    }

    client.init();
}



angular.module('controllers').controller('doc.patientGroupListCtrl', patientGroupListCtrl);
