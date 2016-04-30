;
(function () {
    var step = 0, autoTimer = null, interval = 2000;
    var banner = document.getElementById("banner"), inner = document.getElementById("inner"), tip = document.getElementById("tip"), tipList = tip.getElementsByTagName("li"), btnLeft = document.getElementById("btnLeft"), btnRight = document.getElementById("btnRight");

    //->ʵ�ֽ������
    function changeTip() {
        var tempStep = step;
        tempStep >= tipList.length ? tempStep = 0 : null;
        for (var i = 0; i < tipList.length; i++) {
            tipList[i].className = i === tempStep ? "bgColor" : null;
        }
    }

    //->ʵ���Զ��ֲ�ͼ
    autoTimer = window.setInterval(autoMove, interval);
    function autoMove() {
        step++;
        if (step > 4) {
            step = 0;
            inner.style.left = 0;
        }
        //zhufengAnimate(inner, {left: -step * 1000}, 500);
        animate(inner, {left: -step * 1226}, 500, 0);
        changeTip();
    }

    //->�������ֲ�ͼ����ֹͣ�Զ��ֲ�,����뿪�Զ��ֲ�����
    banner.onmouseenter = function () {
        window.clearInterval(autoTimer);
        btnLeft.style.display = btnRight.style.display = "block";
    };

    banner.onmouseleave = function () {
        autoTimer = window.setInterval(autoMove, interval);
        btnLeft.style.display = btnRight.style.display = "none";
    };


    //->ʵ�ֽ����ֲ�
    tipMove();
    function tipMove() {
        for (var i = 0; i < tipList.length; i++) {
            var cur = tipList[i];
            cur.index = i;
            cur.onclick = function () {
                step = this.index;
                //zhufengAnimate(inner, {left: -step * 1000}, 500, 3);
                animate(inner, {left: -step * 1000}, 500, 0);
                changeTip();
            }
        }
    }

    //->ʵ�������л�
    btnLeft.onclick = function () {
        step--;
        if (step < 0) {
            step = 4;
            inner.style.left = -6130 + "px";
        }
        //zhufengAnimate(inner, {left: -step * 1000}, 500, 4);
        animate(inner, {left: -step * 1226}, 500, 0);
        changeTip();
    };

    btnRight.onclick = autoMove;
})();


/*����֤*/
var oSearchBtn=document.getElementById("searchBtn");
var oSearch=document.getElementById("searchBlock");
var oInput=document.getElementById("input1");
var oSearchKeywords=document.getElementById("searchKeywords");
;(function(){
    oInput.onfocus=function(){

            oSearch.style.display="block";
            oInput.style.border="1px solid #ff6700";
            oSearchBtn.style.border="1px solid #ff6700";
            oSearchKeywords.style.display="none";


    };
    oInput.onblur=function(){
        oSearch.style.display="none";
        oInput.style.borderColor="#e0e0e0";
        oSearchBtn.style.borderColor="#e0e0e0";
        oSearchKeywords.style.display="block";
    }
})();
