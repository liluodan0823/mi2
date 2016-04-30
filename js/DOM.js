var DOM={};
DOM.getIndex=function (ele){
    var index=0;//��������Ϊ0�����м�������������Ǽ�
    var p=ele.previousSibling;
    while(p){
        if(p.nodeType===1){
            index++;
        }
        p=p.previousSibling;
    }
    return index;
};
DOM.siblings=function siblings(ele){//���ele�����е�Ԫ���ֵܽڵ�
    var parent=ele.parentNode;
    var children=parent.children;//����Ԫ�ؽڵ㣬IE�л������ע�ͽڵ�
    //var children=parent.childNodes;//���нڵ�
    var a=[];
    for(var i=0;i<children.length;i++){
        if(children[i].nodeType==1&&children[i]!=ele){
            a.push(children[i]);
        }
    }
    return a;

    //var a=[];
    //var p=ele.previousSibling;
    //while(p){
    //    if(p.nodeType==1){
    //        a.push(p);
    //    }
    //    p=p.previousSibling;
    //}
    //a.reverse();
    //var next =ele.nextSibling;
    //while(next){
    //    if(next.nodeType==1){
    //        a.push(next);
    //    }
    //    next=next.nextSibling;
    //}
    //return a;
};
DOM.children=function(parent,str){//���parent������Ԫ���ӽڵ�
    //�����Ի��ָ����ǩ������Ԫ��
    var a=[];
    var childNodes=parent.childNodes;
    if(typeof str=="string"){//�ж�һ�µڶ������������Ƿ���ȷ
        //��ǩ��Ҫ��strָ������ͬ���У���Ҫ��Ԫ�ؽڵ�
        str=str.toUpperCase();//��str������תΪ��д
        for(var i=0;i<childNodes.length;i++){
            child=childNodes[i];
            if(child.tagName===str){//ע���������
                a.push(child);
            }
        }
    }else if(str===undefined){//û��ָ����ǩ����������е���Ԫ�ض�����
        for(var i=0;i<childNodes.length;i++){
            var child=childNodes[i];
            if(child.nodeType===1){
                a.push(child);
            }
        }
    }else{
        throw new Error("��磬���ڶ�����������ˣ���");
    }
    return a;

};

DOM.getElesByClass=function (str,context){//�ڶ��������ǵ���ɸѡ�������ģ��Ҳ�ķ�Χ��
    context=context||document;//����ڶ�������contentû�д�������documentΪ������
    str=str.replace(/^ +| +$/g,"");//ȥ����β�ո�
    var aClass=str.split(/ +/);//ȥ���м�Ŀո�
    var eles=context.getElementsByTagName("*");
    for(var i=0;i<aClass.length;i++){
        var reg=new RegExp("(^| )"+aClass[i]+"( |$)");
        var a=[];
        for(var j=0;j<eles.length;j++){
            var ele=eles[j];
            if(reg.test(ele.className)){
                a.push(ele);
            }
        }
        eles=a;
    }
    return eles;
};

DOM.addClass=function(ele,strClass){
    var reg=new RegExp("(^| )"+strClass+"( |$)");
    if(!reg.test(ele.className))
        ele.className+=" "+strClass;
};

DOM.removeClass=function(ele,strClass){
    var reg=new RegExp("(^| )"+strClass+"( |$)","g");
    var tempStr=ele.className.replace(/ /g,"   ");//��ˮ�����ո�
    ele.className=tempStr.replace(reg," ");
};


DOM.offset=function (ele){//��������Ԫ�ؾ����ĵ������ľ���ƫ����
    var l=ele.offsetLeft;
    var t=ele.offsetTop;
    var p=ele.offsetParent;
    while(p){
        if(window.navigator.userAgent.indexOf("MSIE 8")==-1){
            l+=p.offsetLeft+p.clientLeft;
            t+=p.offsetTop+p.clientTop;

        }else{
            l+=p.offsetLeft;
            t+=p.offsetTop;
        }
        p=p.offsetParent;
    }
    return {left:l,top:t}
};




DOM.listToArray=function (likeArray){
    try{
        return [].slice.call(likeArray,0);
    }catch(e){
        var a=[];
        for(var i=0;i<list.length;i++){
            //a[a.length]=list[i];
            a.push(likeArray[i]);
        }
        return a;
    }
};



DOM.next=function next(ele){//���ele���ڵĵܵ�Ԫ�ؽڵ㣬����ֵ���ֻ��һ��
    if(typeof ele.nextElementSibling=="object"){//�°������֧�ֵ�DOM����
        return ele.nextElementSibling;
    }else{//�����֧��nextElementSibling�������
        var next=ele.nextSibling;
        while(next){
            if(next.nodeType==1){
                return next;
            }
            next=next.nextSibling;
        }
        return null;
    }
};

DOM.previous=function previous(ele){//���ele���ڵĸ��Ԫ�ؽڵ㣬����ֵ���ֻ��һ��Ԫ��
    if(typeof ele.previousElementSibling=="object"){//�°������֧�ֵ�DOM����
        return ele.previousElementSibling;
    }else{//�����֧��previousElementSibling�������
        var previous=ele.previousSibling;
        while(previous){
            if(previous.nodeType==1){
                return previous;
            }
            previous=previous.previousSibling;
        }
        return null;
    }

};
DOM.nextSiblings=function (ele){//���ele���ڵĵܵ���Ԫ�ؽڵ㣬���ص��Ǽ���
    var ary=[];
    if(typeof ele.nextElementSibling=="object"){//�°������֧�ֵ�DOM����
        var next=ele.nextElementSibling;
        while(next){
            ary.push(next);
            next=next.nextElementSibling;
        }
    }else{//�����֧��nextElementSibling�������
        var next=ele.nextSibling;
        while(next){
            if(next.nodeType==1){
                ary.push(next);
            }
            next=next.nextSibling;
        }

    }
    return ary;

};
DOM.previousSiblings=function previousSiblings(ele){//���ele���ڵĸ����Ԫ�ؽڵ㣬���ص��Ǽ���
    var ary=[];
    if(typeof ele.previousElementSibling=="object"){
        var previous=ele.previousElementSibling;
        while(previous){
            ary.push(previous);
            previous=previous.previousElementSibling;
        }
    }else{//�����֧��nextElementSibling�������
        var previous=ele.previousSibling;
        while(previous){
            if(previous.nodeType==1){
                ary.push(previous);
            }
            previous=previous.previousSibling;
        }
    }
    return ary;
};


DOM.insertAfter=function (oldEle,newEle){//��insertBefore���Ӧ����ʾ��newEle��ӵ�oldEle�ĺ��
    //ele.insertBefore(newEle,oldEle);//���µ�a��ӵ��ɵ�b��ǰ��
    oldEle.parentNode.insertBefore(newEle,oldEle.nextSibling);

};
DOM.prepend=function (parent,child){//�˷�����appendChild���Ӧ����childԪ����ӳ�parent�ĵ�һ����Ԫ��
    //����֪��appendChild����ĩβ��λ������ӽڵ�
    parent.insertBefore(child,parent.firstChild);
};


//��������������Ļ�ȡ��Ļ���
DOM.win=function(attr,value){
    if(typeof value=="undefined"){
        return document.documentElement[attr]||document.body[attr];
    }else{
        document.documentElement[attr]=value;
        document.body[attr]=value;
    }

};



//��JSON��ʽ���ַ���ת��ΪJSON��ʽ�Ķ���
DOM.jsonParse=function (str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    }





//->firstChild:��ȡ��һ��Ԫ���ӽڵ�
DOM.firstChild=function(curEle) {
    var chs = this.children(curEle);
    return chs.length > 0 ? chs[0] : null;
}

//->lastChild:��ȡ���һ��Ԫ���ӽڵ�
DOM.lastChild=function(curEle) {
    var chs = this.children(curEle);
    return chs.length > 0 ? chs[chs.length - 1] : null;
}



