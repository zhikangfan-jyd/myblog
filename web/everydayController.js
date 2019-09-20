var path = new Map();
var timeUtil = require('../util/timeUtil');

var respUtil = require('../util/respUtil');
var everydayDao = require('../dao/everydayDao');

function editEveryday (request,response) {
    request.on('data',function (data) {

        var content = data.toString().trim();
        var ctime = timeUtil.getNow();
        everydayDao.insertEveryday(content,ctime,function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success','添加成功',null));
            response.end();
        })
    })
}

path.set('/editEveryday',editEveryday);


function queryEveryday (request,response) {
   everydayDao.queryEveryday(function (res) {
    response.writeHead(200);
    response.write(respUtil.writeResult('success','添加成功',res));
    response.end();
   })
}

path.set('/queryEveryday',queryEveryday);

module.exports.path = path;