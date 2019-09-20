var everyDay = new Vue({
    el:'#every_day',
    data:{
        content:'窝窝头，一块钱四个嘿嘿'
    },
    computed:{
        getContent () {
            return this.content
        }
    },
    created () {
        //请求数据
        axios({
            method:'get',
            url:'/queryEveryday'
        }).then((res)=>{
            var data = res.data.data[0];
            this.content = data.content;

        }).catch(()=>{
            console.log('请求失败！！！')
        })
    }

});


var articleList = new Vue({
    el:'#article_list',
    data:{
        page:1,
        pageSize:5,
        count:0,
        pageNumList:[],
        articleList:[]
    },
    computed:{
        getPage () {
            return function (page,pageSize) {
                var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') :'';
                // if (searchUrlParams == '') {
                //     return;
                // }
        
                var tag = '';
                for (var i = 0 ; i < searchUrlParams.length ; i++) {
                    if (searchUrlParams[i].split('=')[0] == 'tag') {
                        try {
                            tag = searchUrlParams[i].split('=')[1];
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }

                if (tag == '') {//不是查询情况，执行
                    axios({
                        url:`/queryBlogByPage?page=${page - 1}&pageSize=${pageSize}`,
                        method:'get'
                    }).then((res)=>{
                        var data = res.data.data;
                        var list =  [];
                        for (var i = 0 ; i < data.length ; i++) {
                            
                            var temp = {};
                            temp.title = data[i].title;
                            temp.content = data[i].content;
                            temp.views = data[i].views;
                            temp.link = `/blog_detail.html?bid=${data[i].id}`;
                            temp.date = data[i].ctime;
                            temp.tags = data[i].tags;
                            temp.id = data[i].id;
                            list.push(temp);
                            
                            
                        }
                        articleList.articleList = list;
                    }).catch((res)=>{
                        console.log('请求错误！！！');
                    })
    
                    axios({
                        url:'/queryBlogCount',
                        method:'get'
                    }).then((res) => {
                        var count = res.data.data[0].count;
                        this.count = count;
                        articleList.generatePageTool;
                        this.page = page;
                    }).catch((err)=>{
                        console.log(err)
                        console.log('请求出错！！！');
                    })
                } else {//当后面有参数时，查询
                    axios({
                        url:`/queryByTag?page=${page - 1}&pageSize=${pageSize}&tag=${tag}`,
                        method:'get'
                    }).then((res)=>{
                        console.log(res)
                        var data = res.data.data;
                        var list =  [];
                        for (var i = 0 ; i < data.length ; i++) {
                            
                            var temp = {};
                            temp.title = data[i].title;
                            temp.content = data[i].content;
                            temp.views = data[i].views;
                            temp.link = `/blog_detail.html?bid=${data[i].id}`;
                            temp.date = data[i].ctime;
                            temp.tags = data[i].tags;
                            temp.id = data[i].id;
                            list.push(temp);
                            
                            
                        }
                        articleList.articleList = list;
                    }).catch((res)=>{
                        console.log('请求错误！！！');
                    })
    
                    axios({
                        url:`/queryByTagCount?tag=${tag}`,
                        method:'get'
                    }).then((res) => {
                        var count = res.data.data[0].count;
                        this.count = count;
                        articleList.generatePageTool;
                        this.page = page;
                    }).catch((err)=>{
                        console.log(err)
                        console.log('请求出错！！！');
                    })
                }

            }
        },

        //分页插件
        generatePageTool () {
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({text:'<',page:1});
            if (nowPage > 2) {
                result.push({text:nowPage - 2,page:nowPage - 2})
            }
            if (nowPage > 1) {
                result.push({text:nowPage - 1,page:nowPage - 1})
            }
            result.push({text:nowPage,page:nowPage});
            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text:nowPage + 1,page:nowPage +1});
            }
            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text:nowPage + 2,page:nowPage +2});
            }
            result.push({text:'>',page:parseInt((totalCount + pageSize - 1) / pageSize)});
            this.pageNumList = result;
            
            return result;
        },
        jumpTo () {
            return function (page) {
                this.getPage(page,this.pageSize)
            }
        }
    },
    created () {
        this.getPage(this.page,this.pageSize)
    }
});