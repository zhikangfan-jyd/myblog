

var blogDetail = new Vue({
    el:'#blog_detail',
    data:{
        title:'',
        content:'',
        ctime:'',
        tags:'',
        views:''
    },
    computed:{

    },
    created () {
        var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') :'';
        if (searchUrlParams == '') {
            return;
        }

        var bid = -1;
        for (var i = 0 ; i < searchUrlParams.length ; i++) {
            if (searchUrlParams[i].split('=')[0] == 'bid') {
                try {
                    bid = parseInt(searchUrlParams[i].split('=')[1]);
                } catch (e) {
                    console.log(e);
                }
            }
        }

        axios({
            url:`/queryBlogById?bid=${bid}`,
            method:'get'
        }).then((res)=>{
            var data = res.data.data[0];
            this.title = data.title;
            this.content= data.content;
            this.ctime = data.ctime;
            this.tags = data.tags;
            this.views= data.views;
        }).catch((err)=>{
            console.log(err)
            console.log('请求错误！！！')
        })
    }
});

var sendComment = new Vue({
    el:'#send_comments',
    data:{
        vcode:'',
        rightCode:''
    },

    computed:{
        sendComment () {
            return function () {
                var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') :'';
                if (searchUrlParams == '') {
                    return;
                }
        
                var bid = -1;
                for (var i = 0 ; i < searchUrlParams.length ; i++) {
                    if (searchUrlParams[i].split('=')[0] == 'bid') {
                        try {
                            bid = parseInt(searchUrlParams[i].split('=')[1]);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
                var code = document.getElementById('comment_code').value;
                var reply = document.getElementById('comment_reply').value;
                var replyName = document.getElementById('comment_reply_name').value;
                var name = document.getElementById('comment_name').value;
                var email = document.getElementById('comment_email').value;
                var content = document.getElementById('comment_content').value;

                if (code != this.rightCode) {
                    console.log(code,this.rightCode)
                    alert('验证码错误');
                    this.changeCode();
                    return;
                }

                axios({
                    method:'get',
                    url:`/addComment?bid=${bid}&parent=${reply}&userName=${name}&email=${email}&content=${content}&replyName=${replyName}`
                }).then(res => {
                   if (res.data.status == 'success') {
                       alert(res.data.msg);
                       this.changeCode();
                       code = name = email = content = '';
                   }
                }).catch(err => {
                    console.log(err,'请求错误！！！');
                    
                })
            }
        },
        changeCode () {
            return function () {
                axios({
                    method:'get',
                    url:'/queryRandomCode'
                }).then((res)=>{
                    this.vcode = res.data.data.data;
                    this.rightCode = res.data.data.text;
                }).catch((err)=>{
                    console.log('请求出错！！！')
                })
            }
        }
    },

    created () {
       this.changeCode();
    }
});

var blogComment = new Vue({
    el:'#blog_comments',
    data:{
        total:0,
        comments:[],
    },
    computed:{
        reply () {
            return function (commentId,userName) {
                document.getElementById('comment_reply').value = commentId;
                document.getElementById('comment_reply_name').value = userName;
                location.href = '#send_comments';
            }
        }
    },
    created () {
        var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') :'';
        if (searchUrlParams == '') {
            return;
        }

        var bid = -10;
        for (var i = 0 ; i < searchUrlParams.length ; i++) {
            if (searchUrlParams[i].split('=')[0] == 'bid') {
                try {
                    bid = parseInt(searchUrlParams[i].split('=')[1]);
                } catch (e) {
                    console.log(e);
                }
            }
        }
        axios({
            method:"get",
            url:`/queryCommentsByBlogId?bid=${bid}`
        }).then((res)=>{
            this.comments = res.data.data;

            for (var i = 0 ; i < this.comments.length; i++) {
                if (this.comments[i].parent > -1) {
                    this.comments[i].option = `回复@${this.comments[i].parent_name}`;
                }
            }

        }).catch((err)=>{
            console.log(err,"请求出错啦！！！")
        })

        axios({
            method:'get',
            url:`/queryCommentsCountByBlogId?bid=${bid}`
        }).then((res)=>{
            console.log(res);
            this.total = res.data.data[0].count;
        }).catch((err)=>{
            console.log(err)
        })
    }
})