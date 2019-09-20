var dbutil = require('./dbutil');

function insertBlog (title,content,views,tags,ctime,utime,callback) {
    var insertSql =  `insert into blok (title,content,views,tags,ctime,utime) values (?,?,?,?,?,?)`;
    var params = [title,content,views,tags,ctime,utime];

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


function queryBlogByPage (page,pageSize,callback) {
    var queryBlogByPageSql =  `select * from blok order by id desc limit ?,?`;
    var params = [page*pageSize,pageSize];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(queryBlogByPageSql,params,function (error,result) {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    }) 
    connection.end();
}

function queryBlogCount (callback) {
    var queryBlogCountSql =  `select count(1) as count from blok`;
    var params = [];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(queryBlogCountSql,params,function (error,result) {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    }) 
    connection.end();
}

function queryBlogById (id,callback) {
    var queryBlogByIdSql =  `select * from blok where id = ?`;
    var params = [id];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(queryBlogByIdSql,params,function (error,result) {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    }) 
    connection.end();
}

function queryAllBlog (callback) {
    var queryAllBlogSql =  `select * from blok order by id desc`;
    var params = [];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(queryAllBlogSql,params,function (error,result) {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    }) 
    connection.end();
}

function addViews (blogId,callback) {
    var addViewsSql =  `update blok set views = views + 1 where id = ? `;
    var params = [blogId];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(addViewsSql,params,function (error,result) {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    }) 
    connection.end();
}

function queryHotBlog (size,callback) {
    var queryHotBlogSql =  `select * from blok order by views desc limit ?`;
    var params = [size];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(queryHotBlogSql,params,function (error,result) {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    }) 
    connection.end();
}

module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
module.exports.addViews = addViews;
module.exports.queryHotBlog = queryHotBlog;