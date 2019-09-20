var url = require('url');
var path = new Map();
var timeUtil = require('../util/timeUtil');
var respUtil = require('../util/respUtil');

var tagsDao = require('../dao/tagsDao');
var blogDao = require('../dao/blogDao')

var tagBlogMappingDao = require('../dao/tagBlogMappingDao');
function queryRandomTags (request,response) {
    tagsDao.queryAllTags(function (res) {

        res.sort(function () {
            return Math.random() > 0.5 ? true : false;
        })
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',res));
        response.end();
    })  
}
path.set('/queryRandomTags',queryRandomTags);

function queryByTag (request,response) {
    var params = url.parse(request.url,true).query;
    tagsDao.queryTags(params.tag,function (res) {
        if (res == null || res.length == 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success','查询成功',res));
            response.end();
        } else {
            // console.log(res[0])
            tagBlogMappingDao.queryByTag(res[0].id,parseInt(params.page),parseInt(params.pageSize),function (res) {
                var blogList = [];
                for (var i = 0 ; i < res.length ; i++) {
                    blogDao.queryBlogById(res[i].blok_id,function (res) {
                        blogList.push(res[0]);
                    })
                }
                getResult(blogList,res.length,response);
               
            })
        }
        
    })
   
}
path.set('/queryByTag',queryByTag)


function getResult (blogList,len,response) {
    if (blogList.length < len) {
        setTimeout (()=> {
            getResult(blogList,len,response)
        },10) 
    } else {
        for (var i = 0 ;i < blogList.length ; i++) {
            blogList[i].content = blogList[i].content.replace(/<img[\w\w]*">/g,'');//过滤图片
            blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,5}>/g,'');
            blogList[i].content = blogList[i].content.substring(0,300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',blogList));
        response.end();
    }
}


function queryByTagCount (request,response) {
    var params = url.parse(request.url,true).query;
    tagsDao.queryTags(params.tag,function (res) {
        console.log(res)
       tagBlogMappingDao.queryByTagCount(res[0].id,function (res) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success','查询成功',res));
            response.end();
        })
    })
   
}

path.set('/queryByTagCount',queryByTagCount);
module.exports.path = path;