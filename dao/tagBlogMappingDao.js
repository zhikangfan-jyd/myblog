var dbutil = require('./dbutil');


function insertTagBlogMapping (tagId,blogId,ctime,utime,callback) {
    var insertTagSql = `insert into tag_blokmapping (tag_id,blok_id,ctime,utime) values (?,?,?,?)`;
    var params = [tagId,blogId,ctime,utime];
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

function queryByTag (tagId,page,pageSize,callback) {
    var queryByTagSql = `select * from tag_blokmapping where tag_id = ? limit ?,?`;
    var params = [tagId,page*pageSize,pageSize];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(queryByTagSql,params,function (error,result) {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    })
    connection.end(); 
    
}

function queryByTagCount (tagId,callback) {
    var queryByTagCountSql = `select count(1) as count from tag_blokmapping where tag_id = ?`;
    var params = [tagId];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(queryByTagCountSql,params,function (error,result) {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    })
    connection.end(); 
}
module.exports.insertTagBlogMapping = insertTagBlogMapping;
module.exports.queryByTag = queryByTag;
module.exports.queryByTagCount = queryByTagCount;