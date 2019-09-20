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
        var bid = -2;
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

var sendComment = new Vue({
    el:'#send_comments',
    data:{
        vcode:'',
        rightCode:''
    },

    computed:{
        sendComment () {
            return function () {
                var code = document.getElementById('comment_code').value;

                if (code != this.rightCode) {
                    alert('验证码错误');
                    this.changeCode();
                    return;
                }

                var bid = -2;
                
                var reply = document.getElementById('comment_reply').value;
                var replyName = document.getElementById('comment_reply_name').value;
                var name = document.getElementById('comment_name').value;
                var email = document.getElementById('comment_email').value;
                var content = document.getElementById('comment_content').value;

                axios({
                    method:'get',
                    url:`/addComment?bid=${bid}&parent=${reply}&userName=${name}&email=${email}&content=${content}&replyName=${replyName}`
                }).then(res => {
                   if (res.data.status == 'success') {
                       alert(res.data.msg);
                       this.changeCode();
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