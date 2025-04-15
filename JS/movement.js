$(function () {

    /***
     * 
     * 
     * 登录
     * 1.点击登录出现弹框
     * 2.弹框点击灰色隐藏   白色不东动
     * 3.点击登录--做登陆事件
     * 
     * 
     * 
     * 
     */

    $(".login").click(function(){
        $(".wrapper").css('display','block')
    })
    //  点击灰色 隐藏容器
    $(".wrapper").click(function(){
        $(this).css('display','none');
    })

    //  阻止事件冒泡
    $('.content').click(function(e){
        e.stopPropagation()
    })


    // 登录
    $("#login").click(function(){
        $.ajax({
            type:'post',
            url:"http://iwenwiki.com/api/blueberrypai/login.php",
            data:{
                user_id:$('user').val(),
                password:$('.pwd').val,
                verification_code:$('.code').val()
            },
            success:function(res){
                console.log(res);
                if(res.success){
                    // 成功登录---隐藏弹框--显示用户信息
                    $(".wrapper").css('display','none')
                    $(".header-info").html(`<span>欢迎您：${user}</span>`)

                }else{
                    console.log(res.msg);
                    
                }
                
            }
        })
    })


    /**
     * 
     * 
     * 
     * 
     * 
     * 
     */


    var audio = document.getElementById('audio');//jquery--Dom

    // 获取总时长

    audio.oncanplay = function(){
        // console.log(audio.duration);
        $(".duration").html(times(audio.duration))
        // 点击播放事件----
        $(".play-btn img").click(function () {
            // paused
            if (audio.paused) {
                audio.play();
                $(".play-btn img").attr('src', 'img/pause.png')
            } else {
                audio.pause();
                $(".play-btn img").attr('src', 'img/play-btn_03.png')
            }
        })
    }
    

    
    audio.ontimeupdate = function () {
        // console.log(123);
        // currentTime 
        // console.log(times(audio.currentTime), audio.duration);
        $(".current").html(times(audio.currentTime))


        // 进度条
        var percent = audio.currentTime / audio.duration * 100 + '%';
        $(".progress-bar").css('width', percent);


        // 判断是否播放完毕
    if (audio.ended) {
        console.log('播放完毕');
        audio.pause();
        $(".play-btn img").attr('src','img/play-btn_03.png')
    }
    }
    


    //事件处理函数
    function times(num) {// num 总秒
        var m = parseInt(num / 60);
        var s = parseInt(num % 60);


        m = m > 9 ? m : '0' + m;
        s = s > 9 ? s : '0' + s;


        return m + ":" + s;
    }


    // 获取动态数据
    $.ajax({
        type:'get',
        url:'http://iwenwiki.com/api/blueberrypai/getSongInfo.php?song=mo',
        success:function(res){
            // console.log(res);
            var songInfo = res.songInfo;
            $(".music-title h3").html(songInfo.song_title)
            $(".music-content .info").html(songInfo.song_intro_cont)
            // 图片路径： http://iwenwiki.com/api/blueberrypai/+ song_pic
            $(".music-content img").attr('src','http://iwenwiki.com/api/blueberrypai/' + songInfo.song_pic)
            // alt+z
            var mp3Url = songInfo.song_source.replace(/iwen.wiki\/sxtstu/g,'iwenwiki.com/api')

            // url地址插入到audio元素
            audio.setAttribute('src',mp3Url)
        }
    })
})



//  获取文章数据---------------------------
$.ajax({
    type:'get',
    url:'http://iwenwiki.com/api/blueberrypai/getInterestingInfo.php',
    success:function(res){
        console.log(res);
        // 1.文章的数据-----------
        var Info = res.interestingInfo
        $("article-title").html(Info.interest_title)
        // 取文字信息
        // console.log(Info.interest_cont);
        // $(".article-info").html(Info.interest_cont)
        // 处理文字的格式：方法1：<pre></pre>  保留文本默认格式   (缺点：不会自动换行)
        // $(".article-info").html('<pre>'+Info.interest_cont+'</pre>');
        // 法2：替换回车键
        var text = Info.interest_cont.replace(/\r\n/g,'<br/>')
        $(".article-info").html(text);

        // // 方法3： 替换回车  给某一个元素
        // var arr = Info.interest_cont.split('\r\n');
        // console.log(arr);
        // var str = '';
        // for(var i=0;i < arr.length;i++){
        //     if(arr[i]){
        //         str+=`<p>${arr[i]}</p>`
        //     }else{
        //         str+=`<p class="height"></p>`
        //     }
        // }
        // $(".article-info").html(str)


        // 2--旅游标签---------------------

        // 3.相关阅读-----------------------
    }
})

