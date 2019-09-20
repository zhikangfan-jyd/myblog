

var rendomTags = new Vue({
    el:'#random_tags',
    data:{
        tags:[],

    },
    computed:{
        randomColor () {
            return function () {
                var red = Math.random()*255+50;
                var green = Math.random()*255+50;
                var blue = Math.random()*255+50;
                return `rgb(${red},${green},${blue})`
            }
        },
        randomSize () {
            return function () {
                var size = Math.random()*20 + 12;
                return size;
            }
        }
    },
    created () {
        axios({
            method:'get',
            url:`/queryRandomTags`
        }).then((res)=>{
            for (var i = 0 ; i < res.data.data.length ; i++) {
                res.data.data[i].link = `/?tag=${res.data.data[i].tag}`
            }
            this.tags = res.data.data;
        }).catch((err)=>{
            console.log(err,'请求错误！！！')
        })
    }
});

var newHot = new Vue({
    el:'#new_hot',
    data:{
        titleList:[]
    },

    created () {
        axios({
            method:'get',
            url:'/queryHotBlog'
        }).then(res => {
            console.log(res)
            var result = [];
            for (var i = 0 ; i < res.data.data.length; i++) {
                var temp = {};
                temp.title = res.data.data[i].title;
                temp.link = `/blog_detail.html?bid=${res.data.data[i].id}`;
                result.push(temp);
            }
            this.titleList = result;
        }).catch(err => {
            console.log(err,'请求出错啦！！！')
        })
    }
});
var newComments = new Vue({
    el:'#new_comments',
    data:{
        commentList:[]
    },
    created () {
        axios({
            method:'get',
            url:'/queryNewComments'
        }).then(res => {
            // console.log(res)
            var result = [];
            for (var i = 0 ; i < res.data.data.length; i++) {
                var temp = {};
                temp.user_name = res.data.data[i].user_name;
                // temp.link = `/blog_detail.html?bid=${res.data.data[i].block_id}`;
                temp.ctime = res.data.data[i].ctime;
                temp.comments = res.data.data[i].comments;
                result.push(temp);
            }
            this.commentList = result;
        }).catch(err => {
            console.log(err,'请求错误！！！')
        })
    }
});