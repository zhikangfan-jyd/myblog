var dbutil = require('./dbutil');

//存储每日一句
function insertEveryday (content,ctime,callback) {
    var insertSql =  `insert into every_day (content,ctime) values (?,?)`;
    var params = [content,ctime];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function (error,result) {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    }) 
    connection.end();
}
//查询每日一句
function queryEveryday (callback) {
    var selectEverydaySql = `select * from every_day order by id desc limit 1`;
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(selectEverydaySql,function (error,result) {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    })
    connection.end(); 
    
}
module.exports.insertEveryday = insertEveryday;
module.exports.queryEveryday = queryEveryday;