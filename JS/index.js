$(function () {
    // 1.初始化：var swiper=new Swiper('轮播容器','{配置参数}')     =========================
    function bannerSwiper() {
        var mySwiper = new Swiper('#bannerSwiper', {
            loop: true, // 循环模式选
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
                clickable: true,//  此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换
            },
            parallax: true, //开启时差
            // autoplay: true,//等同于以下设置
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: false,//  用户操作swiper之后，是否禁止autoplay。默认为true:停止
            }
        })
        //swiper悬浮停止轮播
        $(".swiper-container").mouseenter(function () {
            mySwiper.autoplay.stop();
        }).mouseleave(function () {
            mySwiper.autoplay.start();
        })
    }






    // 2.获取轮播图数据===========================================================


    $.ajax({
        type: 'get',
        url: "http://iwenwiki.com/api/blueberrypai/getIndexBanner.php",
        success: function (res) {
            var arr = res.banner;
            console.log(arr);
            var str = '';
            for (var i = 0; i < arr.length; i++) {
                //     http://iwenwiki.com/api/blueberrypai/getIndexBanner.php
                //   语法：字符串.replace(/正则的内容/g,'新值')
                var newImg = arr[i].img.replace(/www.wwtliu.com\/sxtstu/g, 'iwenwiki.com/api')
                str += `<div class="swiper-slide">
                    <img src = "${newImg}" alt = "" >
                        <div class="box" data-swiper-parallax="-1600" data-swiper-parallax-duration="1000">
                            <h3>${arr[i].title}</h3>
                            <div class="info">${arr[i].content}</div>
                        </div>
                </div > `;
            }
            // for结束
            $(".banner .swiper-wrapper").html(str);
            // 当页面插入数据后，在调用轮播swiper
            bannerSwiper();
        },
        error: function () {
            console.log('请求错误');
        }
    })
})


// 手动滑动轮播==================================
function lunboSwiper(ele) {
    var mySwiper = new Swiper(ele, {
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },
    })
}

// 乐章

// 3.乐章----------------------------------
$.ajax({
    type: 'get',
    url: 'http://iwenwiki.com/api/blueberrypai/getIndexMovement.php',
    success: function (res) {
        var arr = res.movement;
        var n = -1;//
        // console.log(arr);
        // 1.求 多少个容器swiper-slide  每一屏显示4个li
        var num = Math.ceil(arr.length / 4);

        // 2.创建
        for (var i = 0; i < num; i++) {
            var swiperSlide = $('<div class="swiper-slide"></div>');// $('#box').html()
            // 3.
            var str = '';
            for (var j = 0; j < 4; j++) {
                n++;
                var newImg = arr[n].img.replace(/iwen.wiki\/sxtstu/g, 'iwenwiki.com/api')
                str += `<li>
                        <img src="${newImg}" alt="">
                        <div class="info">
                            <p class="title">${arr[n].title}</p>
                            <div class="desc">
                                ${arr[n].content}
                            </div>
                        </div>
                    </li>`;
            }
            swiperSlide.html('<ul class="list">' + str + '</ul>');
            $(".movement .swiper-wrapper").append(swiperSlide);
        }
        lunboSwiper('#movementSwiper')




    },
    error: function () {
        console.log('请求错误');

    },
})
