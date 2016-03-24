angular.module('docApp').value('config', {
    clientAuthId: 'docAuth',
    host: 'http://192.168.1.111:8008',
    imgPath: "http://192.168.1.111:8008/Uploaded/Original/",
    uploadServer: "http://192.168.1.111:8008/DocPage/UploadPic/upload",

    tokenKey: 'docAccessToken',
    customerKey: 'customerInfo',

    docApp: "/docpage",
    accountApp: '/api',
    customerApp: '/customerpage'

});
