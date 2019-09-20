var timeUtil = require('../util/timeUtil');

var respUtil = require('../util/respUtil');

var commentDao = require('../dao/CommentDao');

var captcha = require('svg-captcha');


var url = require('url');

var path = new Map();

function addComment (request,response) {

    var params = url.parse(request.url,true).query;

    var blogId = parseInt(params.bid);
    var parent = parseInt(params.parent);
    var userName = params.userName;
    var email = params.email;
    var content = params.content;
    var parentName = params.replyName;

    commentDao.insertComment(blogId,parent,userName,content,email,timeUtil.getNow(),timeUtil.getNow(),parentName,function (res) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success','评论成功',null));
        response.end();
    })
}

path.set('/addComment',addComment);

function queryRandomCode (request,response) {
    var img = captcha.create({fontSize:50,width:100,height:40});
    response.writeHead(200,{'Content-Type':'image/svg+xml'});
    response.write(respUtil.writeResult('success','评论成功',img));
    response.end();
}

path.set('/queryRandomCode',queryRandomCode);


function queryCommentsByBlogId (request,response) {
    var params = url.parse(request.url,true).query;
    var blogId = parseInt(params.bid);
    commentDao.queryCommentsByBlogId(blogId,function (res) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',res));
        response.end();
    })
}
path.set('/queryCommentsByBlogId',queryCommentsByBlogId);

function queryCommentsCountByBlogId (request,response) {
    var params = url.parse(request.url,true).query;
    var blogId = parseInt(params.bid);
    commentDao.queryCommentsCountByBlogId(blogId,function (res) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',res));
        response.end();
    })
}

path.set('/queryCommentsCountByBlogId',queryCommentsCountByBlogId);

function queryNewComments (resquest,response) {
    var size = 5;
    commentDao.queryNewComments(size,function (res) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',res));
        response.end();
    })
}
path.set('/queryNewComments',queryNewComments)


module.exports.path = path;