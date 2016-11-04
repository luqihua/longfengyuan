/**
 * Created by 82172 on 2016/10/30.
 */
$(document).ready(function () {

    /*---样式常量--*/
    var checkBgc = "RGBA(255, 0, 0, 0.6)";
    var unCheckBgc = "RGBA(100, 100, 100, 0.6)";
    var animatedTime = 1000;
    var interval = 2000;
    /*--dom元素--*/
    var slider = $("#slider");
    var banner = $("#banner");
    var circle = $("#circle");
    var leftBtn = $("#left");
    var rightBtn = $("#right");
    /*--全局标记--*/
    var timer;
    var itemWidth = slider.width();
    console.log(itemWidth);
    var currentPos = 0;
    var isAnimated = false;

    /*---左右点击--*/
    var itemHeight = slider.height();
    slider.children("span").css("top", itemHeight / 2 - leftBtn.height() / 2 + "px");
    leftBtn.click(function () {
        turnPage(-1);
    });
    rightBtn.click(function () {
        turnPage(1);
    });

    /*播放*/
    var dots = circle.children("span");
    var num = dots.length;
    for (var i = 0; i < num; i++) {
        dots[i].onclick = dotClick;
    }
    /*-自动播放--*/
    timer = setInterval(doAnim, interval);

    /*--函数---*/
    function dotClick() {
        clearInterval(timer);
        var position = parseInt(this.index);
        dots[currentPos].style.backgroundColor = unCheckBgc;
        dots[position].style.backgroundColor = checkBgc;
        currentPos = position;
        banner.animate(
            {"left": -position * itemWidth + "px"}
            , animatedTime
            , "swing"
            , function () {
                timer = setInterval(doAnim, interval);
            });
    }

    function doAnim() {
        dots[currentPos].style.backgroundColor = unCheckBgc;
        currentPos++;
        if (currentPos >= num) {
            banner.animate({
                "left": 0
            }, animatedTime);
            currentPos = 0;
        }
        dots[currentPos].style.backgroundColor = checkBgc;
        banner.animate(
            {"left": -currentPos * itemWidth + "px"},
            animatedTime);
    }

    function turnPage(type) {
        if (isAnimated) return;
        isAnimated = true;
        clearInterval(timer);
        var position = currentPos + type;
        if (position < 0) position = num - 1;
        if (position >= num)position = 0;
        //console.log(currentPos + "====" + position);
        dots[currentPos].style.backgroundColor = unCheckBgc;
        dots[position].style.backgroundColor = checkBgc;
        currentPos = position;
        banner.animate(
            {"left": -position * itemWidth + "px"}
            , animatedTime
            , "swing"
            , function () {
                isAnimated = false;
                timer = setInterval(doAnim, interval);
            });
    }
});