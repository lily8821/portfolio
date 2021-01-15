$(document).ready(function(){
    
    mobileBtn()
    mobileNav();
    mainNav();
    headerScroll();
    contentActive();
})

function mobileBtn(){
    var openMenu = false;
    $("#mobilenav").css({"opacity":0, "top":"-100%"});
    $("#tnav").css({"top": "-100%"})
    
    
    $("#mobilebtn").click(function(){
        
        if(openMenu == false){
            
            setTimeout(function(){
                $("#mobilebtn .line02").addClass("on");
            },0)
            setTimeout(function(){
                $("#mobilebtn .line01").addClass("on");
                $("#mobilebtn .line03").addClass("on");
            },200)
            setTimeout(function(){
                $("#mobilebtn a").addClass("on");
            },400);
            
            $("#mobilenav").animate({"opacity":1, "top":0},500,"easeOutCubic");
            $("#tnav").animate({"top":70},500,"easeOutCubic");
            
            openMenu = true;
        }else if(openMenu == true){
            
            $("#mobilebtn a").removeClass("on")
            $("#mobilebtn .line01").removeClass("on");
            $("#mobilebtn .line02").removeClass("on");
            $("#mobilebtn .line03").removeClass("on");
            
            $("#mobilenav").animate({"opacity":0, "top":"-100%"},500,"easeOutCubic");
            $("#tnav").animate({"top":"-100%"},500,"easeOutCubic");
            
            $("#mobilenav .subnav").slideUp(0);
            $("#mobilenav > ul > li").removeClass("on");
            
            
            openMenu = false
        } 
    })  
}//mobilebtn

function mobileNav(){
    
    $("#mobilenav .subnav").slideUp(0);
    $("#mobilenav .topnav").click(function(){
        
        var isMenu = $(this).next().is(":hidden") //isMenu = false
        
        $("#mobilenav > ul > li").removeClass("on");
        $(this).parent().addClass("on");
        
        
        
        if(isMenu){
            $("#mobilenav .subnav").slideUp(0);
            $(this).next().slideDown(300);
        }else{
            $("#mobilenav .subnav").slideUp(0);
            $("#mobilenav > ul > li").removeClass("on");
        }
 
    })
    
    
}

function mainNav(){
    
    var $mainBg = $("<div class='main_bg'></div>") //bg 태그 생성
    $mainBg.appendTo("#hwrap");
    
    $("#mnav .subnav, .main_bg").slideUp(0);
    
    $("#mnav .topnav").on("mouseenter focus", onMenu);
    $("#mnav").on("mouseleave", outMenu);
    $("#mnav .subnav > li:last-child a").on("focusout", outMenu);
    
    function onMenu(){
        $("#mnav .subnav, .main_bg").stop();
        $("#mnav .subnav, .main_bg").slideDown(300);
        $("#mnav > ul > li").removeClass("on");
        $(this).parent().addClass("on");
        
 
    }
    function outMenu(){
        $("#mnav .subnav, .main_bg").stop();
        $("#mnav .subnav, .main_bg").slideUp(300);
        $("#mnav > ul > li").removeClass("on");
    }
    
    
}


function headerScroll(){
    
    $(window).scroll(function(){
        
        var windowWidth = $(window).innerWidth();
        var headerTop = $(window).scrollTop();
        
        
        if(windowWidth >= 1024 &&  headerTop > 0){
            $("#header_wrap").addClass("on");
        }else{
            $("#header_wrap").removeClass("on");
        }
    })
}


function contentActive(){
    
    
    $(".active").on("mouseenter",onActive);
    $(".active").on("mouseleave",offActive);
    
    function onActive(){
        
        $(".active").removeClass("on");
        $(this).find(".banner_txt").addClass("on");
    }
    
    function offActive(){
        
        $(".active").removeClass("on");
        
    }
}


$(window).load(function(){
    
    var $visualInner; //visual_inner
    var $visualList; //visual_inner ul
    var $visualLi //visual_inner ul li
    var $visualImg //visual_inner > img
    var $barList;
    
    var visualImgWidth;
    var visualImgNum;
    
    var overNum; //초기 이미지 순번
    var timer;
    var isPlay;
    
    
    init();
    inEvent();
    visualReset();
    onPlay();
    showBar(0)
    
    
    
    
    function init(){
        $visualInner = $("#visual_inner");
        $visualList = $("#visual_inner > ul");
        $visualLi = $visualList.children();
        $visualImg = $visualLi.find("img");
        $barList = $("#bar_inner > ul > li");
        
        visualImgNum = $visualLi.size();
        overNum = 0;
        isPlay = true;
        //alert(visualImgNum);
        
    }
    
    function inEvent(){
        
        $(window).on("resize", visualReset);
        $(".play_btn").on("click", playBtn);
 
    }
    
    function visualReset(){
        
        visualImgWidth = $visualInner.innerWidth();
        var windowWidth = $(window).innerWidth();
        
        $visualList.css({"width":visualImgWidth * visualImgNum}); //ul
        $visualLi.css({"width":visualImgWidth}); //li
        $visualImg.css({"width":visualImgWidth});
        
        
        $visualList.css({"left":-visualImgWidth * overNum})
        $("#visual_wrap").css({"height":$visualImg.innerHeight()})

    }
    
    function slideEvent(selectNum){
        
        $visualList.animate({"left":-visualImgWidth * selectNum},1000,"easeOutCubic")
        
        
    }
    
    function autoSlide(){
        overNum ++;
        
        if(overNum >= visualImgNum){
            overNum = 0;
        }

        slideEvent(overNum);
        showBar(overNum);
 
    }
    
    function onPlay(){
        timer = setInterval(autoSlide, 2000)
    }
    
    function onStop(){
        clearInterval(timer);
    }
    
    
    function showBar(selectNum){
        $barList.removeClass("on");
        $barList.eq(selectNum).addClass("on");
        
        
    }
    
    function playBtn(){
        
        if(isPlay == true){
            onStop();
            $(".play_btn").addClass("on");
            isPlay = false;   
        }else if(isPlay == false){
            onPlay();
            $(".play_btn").removeClass("on");
            isPlay = true;
            
        }
 
    }

})

















    
    