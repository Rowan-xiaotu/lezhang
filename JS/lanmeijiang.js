$(function(){
    // 1.选项卡
    // 1.点击li 让当前的li变成高亮的状态 其他li 取消高亮
    $(".tab li").click(function(){
        $(this).addClass('tabActive').siblings().removeClass('tabActive');

        // 2.获取当前点击的li下标
        var index = $(this).index()
        // 3.点击li对应容器
        $(".box >div").eq(index).addClass('show').siblings().removeClass('show');       
    })

    //2. 分页-------------
    //1.动态创建元素  2.添加事件
    var tsPage = $(".ts-page");
    addPage(8,10);//参数1：当前选中的页码  参数2：总的页码数
    function addPage(current,maxPage){
        // 清空元素
        tsPage.html('');
        // 显示  首页  上一页
        if(current > 1){
            tsPage.append(`<span class="tspage-start disable">首页</span>
        <span class="tapage-before">上一页</span>`);
        }else{
            tsPage.append(`<span class="tapage-before disable">上一页</span>`)
        }
        // 显示  首页  上一页 [...]

        if(current > 3 && maxPage>5){
            tsPage.append('<span class="tapage-ell">....</span>')
        }
        // 显示：首页 上一页 ...2 3 [4] 5 6
        var i = current-2;//  current=2  i=0  current=1 i=-1
        var end = current + 2;
        if(current==1 || current==2){
            i=1;
            end = maxPage<5?maxPage:5;

        }
        if(current==maxPage-1 || current==maxPage){
            i=maxPage-4<1?1:maxPage-4;
            end=maxPage;
        }
        for(;i<=end;i++){
            if(i==current){
                tsPage.append('<span class="page on">'+i+'</span>')
            }else{
                tsPage.append('<span class="page">'+i+'</span>')
            }

        }
        // 显示：首页  上一页  ...  2 3 [4] 5 6 【...】
        if(maxPage>5 && current<maxPage-2){
            tsPage.append('<span class="tspage-ell">...</span>')
        }
        // 显示：最后的下一页 尾页
        if(current<maxPage){
            tsPage.append(`<span class="tspage-after">下一页</span>
                <span class="tspage-end">尾页</span>`)
        }else{
            tsPage.append('<span class="tspage-after disable">下一页</span>')
        }
    }
    //3.添加事件------------------------
    addEvent(10)
    function addEvent(maxPage){
        //1. 点击中间的页码--高亮状态
        $(".ts-page").on('click','.page',function(){
            // console.log($(this).html());
            var num = parseInt($(this).html())
            console.log(num);
            
            addPage(num,maxPage)
            
        })
        //2.首页和尾页 tspage-start
        $(".ts-page").on('click','.tspage-start',function(){
            addPage(1,maxPage)
        })
        // 尾页
        $(".ts-page").on('click','.tspage-end',function(){
            addPage(maxPage,maxPage)
        })
        // 3.下一页
        $(".ts-page").on('click','.tspage-after',function(){
            var num = parseInt($(this).siblings('.on').html());
            num++;
            console.log(num);
            if(num>maxPage){
                num=maxPage;
            }
            addPage(num,maxPage)

        })
        //4.上一页
        
    }
})