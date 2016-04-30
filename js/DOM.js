var DOM={};
DOM.getIndex=function (ele){
    var index=0;//假设索引为0，则有几个哥哥索引就是几
    var p=ele.previousSibling;
    while(p){
        if(p.nodeType===1){
            index++;
        }
        p=p.previousSibling;
    }
    return index;
};
DOM.siblings=function siblings(ele){//获得ele的所有的元素兄弟节点
    var parent=ele.parentNode;
    var children=parent.children;//所有元素节点，IE中还会包括注释节点
    //var children=parent.childNodes;//所有节点
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
DOM.children=function(parent,str){//获得parent的所有元素子节点
    //还可以获得指定标签名的子元素
    var a=[];
    var childNodes=parent.childNodes;
    if(typeof str=="string"){//判断一下第二个参数传的是否正确
        //标签名要和str指定的相同才行，还要是元素节点
        str=str.toUpperCase();//把str无条件转为大写
        for(var i=0;i<childNodes.length;i++){
            child=childNodes[i];
            if(child.tagName===str){//注意这个条件
                a.push(child);
            }
        }
    }else if(str===undefined){//没有指定标签名，则把所有的子元素都返回
        for(var i=0;i<childNodes.length;i++){
            var child=childNodes[i];
            if(child.nodeType===1){
                a.push(child);
            }
        }
    }else{
        throw new Error("大哥，您第二个参数搞错了！！");
    }
    return a;

};

DOM.getElesByClass=function (str,context){//第二个参数是当次筛选的上下文（找查的范围）
    context=context||document;//如果第二个参数content没有传，则以document为上下文
    str=str.replace(/^ +| +$/g,"");//去掉首尾空格
    var aClass=str.split(/ +/);//去掉中间的空格
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
    var tempStr=ele.className.replace(/ /g,"   ");//掺水（掺空格）
    ele.className=tempStr.replace(reg," ");
};


DOM.offset=function (ele){//计算任意元素距离文档顶部的绝对偏移量
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



DOM.next=function next(ele){//获得ele相邻的弟弟元素节点，返回值最多只有一个
    if(typeof ele.nextElementSibling=="object"){//新版浏览器支持的DOM属性
        return ele.nextElementSibling;
    }else{//如果不支持nextElementSibling这个属性
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

DOM.previous=function previous(ele){//获得ele相邻的哥哥元素节点，返回值最多只有一个元素
    if(typeof ele.previousElementSibling=="object"){//新版浏览器支持的DOM属性
        return ele.previousElementSibling;
    }else{//如果不支持previousElementSibling这个属性
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
DOM.nextSiblings=function (ele){//获得ele相邻的弟弟们元素节点，返回的是集合
    var ary=[];
    if(typeof ele.nextElementSibling=="object"){//新版浏览器支持的DOM属性
        var next=ele.nextElementSibling;
        while(next){
            ary.push(next);
            next=next.nextElementSibling;
        }
    }else{//如果不支持nextElementSibling这个属性
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
DOM.previousSiblings=function previousSiblings(ele){//获得ele相邻的哥哥们元素节点，返回的是集合
    var ary=[];
    if(typeof ele.previousElementSibling=="object"){
        var previous=ele.previousElementSibling;
        while(previous){
            ary.push(previous);
            previous=previous.previousElementSibling;
        }
    }else{//如果不支持nextElementSibling这个属性
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


DOM.insertAfter=function (oldEle,newEle){//和insertBefore相对应，表示把newEle添加到oldEle的后边
    //ele.insertBefore(newEle,oldEle);//把新的a添加到旧的b的前边
    oldEle.parentNode.insertBefore(newEle,oldEle.nextSibling);

};
DOM.prepend=function (parent,child){//此方法和appendChild相对应，把child元素添加成parent的第一个子元素
    //我们知道appendChild是在末尾的位置添加子节点
    parent.insertBefore(child,parent.firstChild);
};


//兼容所有浏览器的获取屏幕宽度
DOM.win=function(attr,value){
    if(typeof value=="undefined"){
        return document.documentElement[attr]||document.body[attr];
    }else{
        document.documentElement[attr]=value;
        document.body[attr]=value;
    }

};



//把JSON格式的字符串转换为JSON格式的对象
DOM.jsonParse=function (str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    }





//->firstChild:获取第一个元素子节点
DOM.firstChild=function(curEle) {
    var chs = this.children(curEle);
    return chs.length > 0 ? chs[0] : null;
}

//->lastChild:获取最后一个元素子节点
DOM.lastChild=function(curEle) {
    var chs = this.children(curEle);
    return chs.length > 0 ? chs[chs.length - 1] : null;
}



