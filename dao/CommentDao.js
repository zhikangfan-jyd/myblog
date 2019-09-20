var dbutil = require('./dbutil');
function insertComment (blogId,parent,userName,comments,email,ctime,utime,parent_name,callback) {
    var insertCommentSql = `insert into comments (blok_id,parent,user_name,comments,email,ctime,utime,parent_name) values (?,?,?,?,?,?,?,?)`;
    var params = [blogId,parent,userName,comments,email,ctime,utime,parent_name];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertCommentSql,params,function (error,result) {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    }) 
    connection.end();

}

function queryCommentsByBlogId (blogId,callback) {
    var queryCommentsByBlogIdSql = `select * from comments where blok_id = ?`;
    var params = [blogId];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(queryCommentsByBlogIdSql,params,function (error,result) {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    }) 
    connection.end();

}

function queryCommentsCountByBlogId (blogId,callback) {
    var queryCommentsCountSql = `select count(1) as count from comments where blok_id = ?`;
    var params = [blogId];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(queryCommentsCountSql,params,function (error,result) {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    }) 
    connection.end();
}

function queryNewComments (size,callback) {
    var queryNewCommentsSql = `select * from comments order by id desc limit ?`;
    var params = [size];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(queryNewCommentsSql,params,function (error,result) {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    }) 
    connection.end();
}

module.exports.insertComment = insertComment;
module.exports.queryCommentsByBlogId = queryCommentsByBlogId;
module.exports.queryCommentsCountByBlogId = queryCommentsCountByBlogId;
module.exports.queryNewComments = queryNewComments;