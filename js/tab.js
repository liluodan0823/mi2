//->实现一个选项卡的封装:我们可以分析出,只要多个选项卡的主体结构一样,那么每一个实现的思想都是一模一样的,唯一不一样的就是最外层的盒子不一样
~function () {
    /*
     * tabChange:封装一个选项卡的插件,只要大结构保持统一,以后实现选项卡的功能,只需要调取这个方法执行即可实现
     * ->container:当前要实现选项卡的这个容器
     * ->defaultIndex:默认选中项的索引
     */
    function tabChange(container, defaultIndex) {
        var tabFirstChild=DOM.firstChild(container);
        var tabOptions=DOM.lastChild(tabFirstChild);
        var tabFirst = DOM.firstChild(tabOptions), oLis = DOM.children(tabFirst);
        var divTab=DOM.lastChild(container);
        var divLists=DOM.firstChild(divTab);
        var divList =DOM .nextSiblings(divLists);

        //->让defaultIndex对应的页卡有选中的样式
        defaultIndex = defaultIndex || 0;
        DOM.addClass(oLis[defaultIndex], "tabPromoted");
        DOM.addClass(divList[defaultIndex], "promoted");

        //->实现具体的切换功能
        for (var i = 0; i < oLis.length; i++) {
            oLis[i].onmouseover = function () {
                DOM.addClass(this, "tabPromoted");

                var curSiblings = DOM.siblings(this);
                for (var i = 0; i < curSiblings.length; i++) {
                    DOM.removeClass(curSiblings[i], "tabPromoted");
                }

                var index = DOM.getIndex(this);
                for (i = 0; i < divList.length; i++) {
                    i === index ? DOM.addClass(divList[i], "promoted") : DOM.removeClass(divList[i], "promoted");
                }
            }
        }
    }

    window.zhufengTab = tabChange;
}();

var boxSelect=DOM.getElesByClass("boxTab");
for(var i=0;i<boxSelect.length;i++){
    zhufengTab(boxSelect[i],0);
}
