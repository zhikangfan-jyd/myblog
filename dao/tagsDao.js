var dbutil = require('./dbutil');

function insertTags (tags,ctime,utime,callback) {
    var insertTagSql = `insert into tag (tag,ctime,utime) values (?,?,?)`;
    var params = [tags,ctime,utime]
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertTagSql,params,function (error,result) {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    })
    connection.end(); 
    
}

function queryTags (tags,callback) {
    var queryTagSql = `select * from tag where tag = ?`;
    var params = [tags]
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(queryTagSql,params,function (error,result) {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    })
    connection.end(); 
    
}
function queryAllTags (callback) {
    var queryAllTagSql = `select * from tag`;
    var params = []
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(queryAllTagSql,params,function (error,result) {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    })
    connection.end(); 
    
}
module.exports.insertTags = insertTags;
module.exports.queryTags = queryTags;
module.exports.queryAllTags = queryAllTags;