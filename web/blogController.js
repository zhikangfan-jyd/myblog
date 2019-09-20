var timeUtil = require('../util/timeUtil');

var respUtil = require('../util/respUtil');

var blogDao = require('../dao/blogDao');

var tagsDao = require('../dao/tagsDao');

var tagBlogMappingDao = require('../dao/tagBlogMappingDao');

var url = require('url');

var path = new Map();

function queryBlogCount (request,response) {
    blogDao.queryBlogCount(function (res) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',res));
        response.end();
    })
}
path.set('/queryBlogCount',queryBlogCount);

function queryBlogByPage (request,response) {
    var params = url.parse(request.url,true).query;

    var page = parseInt(params.page);
    var pageSize = parseInt(params.pageSize);
    blogDao.queryBlogByPage(page,pageSize,function (res) {
        // console.log(res);
        for (var i = 0 ;i < res.length ; i++) {
            res[i].content = res[i].content.replace(/<img[\w\w]*">/g,'');//过滤图片
            res[i].content = res[i].content.replace(/<[\w\W]{1,5}>/g,'');
            res[i].content = res[i].content.substring(0,300);
        }

        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',res));
        response.end();
    });
}

path.set('/queryBlogByPage',queryBlogByPage);

function editBlog (request,response) {
    var params = url.parse(request.url,true).query;

    var tags = params.tags.replace(/ /g,'').replace('，',',');
    request.on('data',function (data) {
        blogDao.insertBlog(params.title,data.toString(),0,tags,timeUtil.getNow(),timeUtil.getNow(),function (res) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success','添加成功',null));
            response.end();
            var blogId = res.insertId;
            var tagList = tags.split(',');
            for (var i = 0 ; i < tagList.length ; i++) {
                if (tagList[i] == '') {
                    continue;
                }
                queryTag(tagList[i],blogId);
            }
        })
    })
}
path.set('/editBlog',editBlog);

function queryTag (tag,blogId) {
    tagsDao.queryTags(tag,function (result) {
        if (result == null || result.length == 0) {
            insertTag(tag,blogId);
        } else {
            tagBlogMappingDao.insertTagBlogMapping(result[0].id,blogId,timeUtil.getNow(),timeUtil.getNow(),function (result) {

            })
        }
    })
}
function insertTag (tag,blogId) {
    tagsDao.insertTags(tag,timeUtil.getNow(),timeUtil.getNow(),function (result) {
        insertTagBlogMapping(result.insertId,blogId)
    })
}


function insertTagBlogMapping (tagId,blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId,blogId,timeUtil.getNow(),timeUtil.getNow(),function (result) {

    })
}


function queryBlogById (request,response) {
    var params = url.parse(request.url,true).query;
    blogDao.queryBlogById(parseInt(params.bid),function (res) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',res));
        response.end();
        blogDao.addViews(parseInt(params.bid),function (res) {})
    });
}

path.set('/queryBlogById',queryBlogById);


function queryAllBlog (request,response) {
    blogDao.queryAllBlog(function (res) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',res));
        response.end();
    });
}
path.set('/queryAllBlog',queryAllBlog);

function queryHotBlog (request,response) {

    var size = 5;
    blogDao.queryHotBlog(size,function (res) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',res));
        response.end();
    });
}
path.set('/queryHotBlog',queryHotBlog);


module.exports.path = path;