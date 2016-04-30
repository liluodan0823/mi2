//->ʵ��һ��ѡ��ķ�װ:���ǿ��Է�����,ֻҪ���ѡ�������ṹһ��,��ôÿһ��ʵ�ֵ�˼�붼��һģһ����,Ψһ��һ���ľ��������ĺ��Ӳ�һ��
~function () {
    /*
     * tabChange:��װһ��ѡ��Ĳ��,ֻҪ��ṹ����ͳһ,�Ժ�ʵ��ѡ��Ĺ���,ֻ��Ҫ��ȡ�������ִ�м���ʵ��
     * ->container:��ǰҪʵ��ѡ����������
     * ->defaultIndex:Ĭ��ѡ���������
     */
    function tabChange(container, defaultIndex) {
        var tabFirstChild=DOM.firstChild(container);
        var tabOptions=DOM.lastChild(tabFirstChild);
        var tabFirst = DOM.firstChild(tabOptions), oLis = DOM.children(tabFirst);
        var divTab=DOM.lastChild(container);
        var divLists=DOM.firstChild(divTab);
        var divList =DOM .nextSiblings(divLists);

        //->��defaultIndex��Ӧ��ҳ����ѡ�е���ʽ
        defaultIndex = defaultIndex || 0;
        DOM.addClass(oLis[defaultIndex], "tabPromoted");
        DOM.addClass(divList[defaultIndex], "promoted");

        //->ʵ�־�����л�����
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
