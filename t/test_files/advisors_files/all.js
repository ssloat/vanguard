


vg.Layer=function(id, opt )
{
this.base=vg.Controller;
this.base(id, id );
this.openFlag=false;
this.type="layer";
this.transDurDefault=750;
this.fadeDuration=1000;
this.firstElem;
this.lastElem;
this.elems;
this.scrollTopVal=0;
this.id=id;
this.isTouchpadScrollable=false;
this.hasMoved=false;
this.scrollLeft=0;
this.scrollTop=0;
this.opening=false;
vg.util.attachJsonOptions(this, opt );
this.handleNestedLayer();
this.makePointers();
this._configureAdditionalCSS();
this.configureLayer();
this.addEventListeners();
};
vg.Layer.responsive="respLayer";
vg.Layer.HISTORY_POPSTATE="LAYER_HISTORY_POPSTATE";
vg.Layer.TOUCH_MOVE="LAYER_TOUCH_MOVE";
vg.Layer.ORIENTATION_CHANGE="LAYER_ORIENTATION_CHANGE";
vg.Layer.MOBILE_BASE_PAGE_SCROLL="LAYER_MOBILE_BASE_PAGE_SCROLL";
vg.Layer.modalLayerName='cbdModalDiv';
vg.Layer.maxZindex=200;
vg.Layer.TRAN_NONE_CLOSE='tran_noneClose';
vg.Layer.TRANTYPES={
fadeinout:{open:'tran_fadeIn', close:'tran_fadeOut'},
fadeinout_open_only:{open:'tran_fadeIn', close:vg.Layer.TRAN_NONE_CLOSE},
none:{open:'tran_noneOpen', close:vg.Layer.TRAN_NONE_CLOSE},
slideinout:{open:'tran_slideOpen', close:'tran_slideClose'},
slideinoutmsgdrawer:{open:'tran_slideDrawer', close:vg.Layer.TRAN_NONE_CLOSE}
};
vg.Layer.TRANTYPES.cbd_fade_in_out=vg.Layer.TRANTYPES.fadeinout;
vg.Layer.TRANTYPES.cbd_fade_in=vg.Layer.TRANTYPES.fadeinout;
vg.Layer.STYLE_TO_NUMBER_REGEX=new RegExp("p[xt]" , "g" );
vg.Layer.LAYER_TEMPLATE_REGION_ID="layer";
if(window.openLayers==undefined)
{
window.openLayers=[];
}
if(window.modalCount==undefined)
{
window.modalCount=0;
}
vg.Layer.calculateMaxZ=function()
{
var maxZ=200;
for(var i=0;i < window.openLayers.length;i++)
{
if(window.openLayers[i].zindex > maxZ )
{
maxZ=window.openLayers[i].zindex
}
}
vg.Layer.maxZindex=maxZ;
};
vg.Layer.getMaxZindex=function()
{
var maxZ=200;
for(var i=0;i < window.openLayers.length;i++)
{
var layer=window.openLayers[i];
if(layer.modal&&layer.zindex > maxZ )
{
maxZ=layer.zindex
}
}
return maxZ;
};
vg.Layer.hasOpenLayer=function(type)
{
var	hasOpenLayer=false,
openLayers=window.openLayers,
numLayers,
idx;
if(openLayers!=null&&openLayers.length > 0)
{
if(type)
{
numLayers=openLayers.length;
for(idx=0;idx < numLayers;idx++)
{
if(openLayers[idx].type===type)
{
hasOpenLayer=true;
break;
}
}
}
else
{
hasOpenLayer=true;
}
}
return hasOpenLayer;
};
vg.Layer.positionModal=function()
{
var maxZ=vg.Layer.getMaxZindex();
document.getElementById(vg.Layer.modalLayerName ).style.zIndex=maxZ - 5;
};
vg.Layer.showModal=function(layerZindex)
{
if(window.modalCount==0 )
{
_cbdConfigCBDModalDiv(false);
var node=document.getElementById(vg.Layer.modalLayerName );
if(!node )
{
node=document.createElement('div' );
node.setAttribute('id',vg.Layer.modalLayerName );
vg.html.addStyle(vg.Layer.modalLayerName, node );
document.getElementsByTagName('body' )[0].appendChild(node );
}
if((ie7||ie8)&&windowsVista)
{
vg.html.addStyle('cbdModalDivIE7And8Vista', node);
}
node.style.display='inline';
node.style.zIndex=layerZindex - 5;
if(ieQuirksMode&&CBD_FLOATING_HEAD)
{
document.body.setAttribute('covered','true');
vg.html._fireCustomEvent(vg.event.ELEMENT_DISABLED, document.body );
}
}
window.modalCount++;
vg.Layer.positionModal();
};
vg.Layer.hideModal=function()
{
window.modalCount--;
if(window.modalCount==0 )
{
var node=document.getElementById(vg.Layer.modalLayerName );
node.style.display='none';
if(ieQuirksMode&&CBD_FLOATING_HEAD)
{
document.body.setAttribute('covered','false');
vg.html._fireCustomEvent(vg.event.ELEMENT_DISABLED, document.body );
}
}
else
{
vg.Layer.positionModal();
}
};
vg.Layer.setWidthAttribute=function(layerId, width)
{
vg.comp._lazyLoadComp(layerId);
var contr=vg.comp.getController(layerId);
contr.setWidthAttribute(width);
};
vg.Layer.getComputedHeight=function(layerId){
var hght=Number.NaN;
vg.comp._lazyLoadComp(layerId);
var ctrl=vg.comp.getController(layerId);
if(ctrl){
var prvFlg=ctrl.resizedflag;
ctrl.resizedflag=true;
hght=ctrl.getLayerHeight();
ctrl.resizedflag=prvFlg;
}
return hght;
};
vg.Layer.setHeightAttribute=function(layerId, height)
{
vg.comp._lazyLoadComp(layerId);
var contr=vg.comp.getController(layerId);
contr.setHeightAttribute(height);
};
vg.Layer.getScrollDiv=function(layerId)
{
vg.comp._lazyLoadComp(layerId);
var contr=vg.comp.getController(layerId);
return contr!=null?contr.scrollDiv:null;
};
vg.Layer.resize=function(layerId)
{
vg.comp._lazyLoadComp(layerId);
var contr=vg.comp.getController(layerId);
if(contr){
contr.resiz();
}
};
vg.Layer.prototype=
{
addEventListeners:function()
{
var controller=this;
var wrapDiv=document.getElementById('wrapDiv');
if((this.leader!=null)&&(this.leader==true)&&wrapDiv!=null)
{
vg.html.addEventListener(wrapDiv, 'scroll', function(e){controller.onPageScroll(e)});
}
vg.html.addEventListenerMethod(this.viewNode, vg.event.DOM_CHANGE, this, 'domChanged' );
vg.html.addEventListenerMethod(this.viewNode, vg.event.GEO_CHANGE, this, 'geoChanged' );
vg.html.addEventListenerMethod(this.viewNode, vg.event.DISP_CHANGE, this, 'domChanged' );
vg.html.addEventListenerMethod(null, vg.event.TEXT_ZOOM_CLICK, this, 'geoChanged' );
vg.html.addEventListener(this.viewNode, 'keydown', function(e){controller.keyEventHandler(e)});
if(this.scrollDiv)
{
vg.html.addEventListener(this.scrollDiv, 'scroll', function(e){jsCBDcloseSelectOneMenu(e);});
}
if(cbd.page.isResponsiveCapable===true)
{
vg.html.addEventListener(window, vg.event.BROWSER_RESIZE_END, function(e){controller.adjustOpenRespLayer();});
}
},
initTransition:function()
{
if(this.transitionType===undefined )
{
this.transitionType='fadeinout';
}
var tranType=vg.Layer.TRANTYPES[this.transitionType.toLowerCase()];
this.tranOpen=this[tranType.open];
this.tranClose=this[tranType.close];
if(this.transitionDuration )
{
this.transitionDuration=parseFloat(this.transitionDuration )*1000;
}
else
{
this.transitionDuration=this.transDurDefault;
}
},
initMoveResizeOptions:function()
{
if(!this.moveResizeIsInitialized&&!this._isSmallResponsive()&&!this.enableFullScreen)
{
var controller=this;
if(this.moveable )
{
cbd.loader.addCallback(function(){controller.ddLoaded=true;controller.makeMoveable();});
}
if(this.resizeable )
{
cbd.loader.addCallback(function(){controller.makeResizeable();});
}
if(this.moveable||this.resizeable )
{
cbd.loader.require(['dd-drag','resize']);
cbd.loader.load();
}
this.moveResizeIsInitialized=true;
}
},
handlePersist:function()
{
var controller=this;
if(!this.targetPosition )
{
this.targetPosition="auto";
}
new vg.ElementPersistance(
{
controller:controller,
globalDiv:this.viewNode,
openFunc:function(){jsCBDopenLayer(controller.viewNode.getAttribute('id' ), controller.targetId, controller.targetPosition, controller.enableFullScreen );},
closeFunc:function(){controller.close();},
setTarget:function(tid ){controller.targetId=tid;},
repositionFunc:function(){controller.reposition();}
});
if(cbd.browser.isTouchScreen)
{
vg.html.addEventListener(document.body, 'touchstart', function(e){
if(controller.openFlag)
{
vg.ElementPersistance.mouseLinkLeave(controller.id);
}
});
}
},
handleNestedLayer:function()
{
var layerSpanNode=this.viewNode.parentNode;
var parentNode=layerSpanNode.parentNode;
var isInLayer=vg.html.findAncestor(parentNode,{tagName:'span', attrName:'type', attrValue:'Layer'});
if(isInLayer)
{
parentNode.removeChild(layerSpanNode);
var cssContainer=vg.html._cbdGetCSSContainer(isInLayer);
var layerDiv=vg.html.getElements(cssContainer,{tagName:'div', attrName:'id', attrValue:'layer'})[0];
if(layerDiv==null)
{
layerDiv=vg.html.getElements(cssContainer,{tagName:'div', attrName:'id', attrValue:'vg1Layer'})[0];
}
var existingLayer=vg.html.getElements(layerDiv,{tagName:'span', attrName:'id', attrValue:layerSpanNode.id})[0];
if(existingLayer)
{
layerDiv.removeChild(existingLayer);
}
layerDiv.appendChild(layerSpanNode);
}
},
initContent:function()
{
this.setContentURL();
this.contentLoaded=false;
},
configureLayer:function()
{
if(this.persist )
this.handlePersist();
this.initTransition();
if(this.contentURL )
this.initContent();
},
setContentURL:function(contentURL)
{
this.isUrlChanged=this.contentURL!=contentURL;
if(contentURL) this.contentURL=contentURL;
this.contentURL=this.contentURL.replace(/%s/g, jsCBDgetContextRoot() );
if(this.contentURL.indexOf("http") < 0)
{
this.contentURL=this.contentURL.replace(/\/{2,}/g, '/' );
}
},
onPageScroll:function(e)
{
if(this.openFlag)
{
this.close();
}
},
onDragMouseDown:function()
{
if(window.SelectOneMenu)
{
SelectOneMenu._closePrevMenu();
}
},
onDragEnd:function()
{
this.hasMoved=true;
if(this.onDragEndJs)
{
eval(this.onDragEndJs).call();
}
},
domChangedTimeout:null,
domChanged:function()
{
this.resiz();
this.setFirstAndLastInputElements();
vg.html._fireCustomEvent(vg.event.LAYER_CONTENT_LOAD, this.viewNode);
},
resiz:function()
{
if(this.suppressLayout)
{
this.scrollDiv=this._findScrollDiv();
this.noScrollDiv=vg.html.getElements(this.viewNode,{tagName:'div', attrName:'class', attrValue:this.noScrollDiv_css})[0];
}
this.resizedflag=false;
if(this.openFlag )
{
this.setHeightOfScrollDiv();
this.adjustWidthForScrollBars();
if(!this.hasMoved)
{
this.reposition();
}
if(this._isSmallResponsive()===true&&cbdcommon.support.hasiOSLayerBug&&cbd.page.isResponsiveCapable===true)
{
this.applyScalingFactor(false);
}
}
},
keyEventHandler:function(e)
{
var key=jsCBDgetKey(jsCBDgetEvent(e));
var targ;
if(e.target){
targ=e.target;
}
else if(e.srcElement)
{
targ=e.srcElement;
}
if(targ.nodeType==3)
targ=targ.parentNode;
if(key==9)
{
this.setFirstAndLastInputElements(true);
if(targ==this.lastElem)
{
if(this.firstElem&&!e.shiftKey)
{
jsCBDSetFocus(this.firstElem);
vg.html.preventDefault(e);
}
}
if(targ==this.firstElem&&e.shiftKey)
{
if(cbd.page.isNextGen&&this.lastElem)
{
jsCBDSetFocus(this.lastElem);
}
vg.html.preventDefault(e);
}
}
},
geoChanged:function()
{
if(this.openFlag )
{
this.setHeightOfScrollDiv();
}
},
_findScrollDiv:function()
{
var THIS=this;
return vg.html.getElements(this.viewNode,{tagName:'div'},
function(node){return!vg.html.hasStyle('iframe_cover', node)
&&vg.html.hasStyle(THIS.scrollable_css, node)
&&vg.html.hasStyle(THIS.layer_css, node);})[0];
},
makePointers:function()
{
this.layer_css='layer';
this.scrollable_css='roundBoxScrollDiv';
this.noScrollDiv_css='roundBoxNoScrollDiv';
this.scrollDiv_css=this.scrollable_css+" "+this.layer_css;
var controller=this;
this.outerDiv=this.viewNode.firstChild;
this.scrollDiv=this._findScrollDiv();
this.noScrollDiv=vg.html.getElements(this.viewNode,{tagName:'div', attrName:'class', attrValue:this.noScrollDiv_css},
function(node){return!vg.html.hasStyle('iframe_cover', node);})[0];
this.closeDiv=vg.html.getElements(this.viewNode,{tagName:'div', attrName:'class', attrValue:'close'},
function(node){return!vg.html.hasStyle('iframe_cover', node);})[0];
var tds=vg.html.getElements(this.viewNode,{tagName:'td'});
for(var i=0;i < tds.length;i++)
{
var styles=vg.html.listStyles(tds[i]);
for(var j=0;j < styles.length;j++)
{
if(styles[j].match(/rd[\w_-]*topMid/) )
{
this.topArea=tds[i];
}
else if(styles[j].match(/rd[\w_-]*botMid/) )
{
this.bottomArea=tds[i];
}
else if(styles[j].match(/rd[\w_-]*ctrMid/) )
{
this.scroll_noscroll_container=tds[i];
}
}
}
if(this.suppressLayout )
{
this.contentNode=this.scroll_noscroll_container;
}
else
{
this.contentNode=this.scrollDiv.firstChild;
}
},
makeMoveable:function()
{
var controller=this;
var divs=vg.html.getElements(this.viewNode,
{tagName:'div'},
function(node )
{
return vg.html.hasStyle('drag', node )
});
var dragDiv=divs[0];
var yui=cbd.getYUI();
var dd=new yui.DD.Drag({node:this.viewNode});
dd.addHandle(yui.one(dragDiv));
dd.plug(yui.Plugin.DDConstrained,{
constrain:'#body'
});
vg.html.addEventListenerMethod(dragDiv, "mousedown", this, 'onDragMouseDown');
dd.on('drag:end', function(){controller.onDragEnd()}, controller, true);
dd.on('drag:drag',function(){vg.html._fireCustomEvent(vg.event.LAYER_REPOSITION)},controller,true);
},
makeResizeable:function()
{
var controller=this;
var yui=cbd.getYUI();
var resize=new yui.Resize({
node:this.viewNode,
handles:'all'
});
resize.plug(yui.Plugin.ResizeProxy,{});
resize.after('resize:end', controller.onEndResize, controller, true );
if(parseInt(this.handleSize))
{
resize.eachHandle(function resizeHandle(obj, handleName, index){
controller.adjustResizeHandleSize(obj, handleName, index, this)
});
}
},
adjustResizeHandleSize:function(obj, handleName, index, resize)
{
var heightMatch=resize.REGEX_CHANGE_HEIGHT;
var widthMatch=resize.REGEX_CHANGE_WIDTH;
if(handleName.match(heightMatch))
{
obj.setStyle("height", this.handleSize+"px");
}
if(handleName.match(widthMatch))
{
obj.setStyle("width", this.handleSize+"px");
}
},
onEndResize:function()
{
this.adjustForMinimumWidth();
this.userOnResize();
this.resizedflag=true;
if(window.SelectOneMenu)
{
SelectOneMenu._closePrevMenu();
}
this.setHeightOfScrollDiv();
vg.html._fireCustomEvent(vg.event.LAYER_REPOSITION );
},
open:function()
{
if(this.openFlag )
{
return;
}
this.initMoveResizeOptions();
this.openFlag=true;
vg.validation.hideErr(false);
vg.Layer.calculateMaxZ();
this.zindex=vg.Layer.maxZindex+10;
this.viewNode.style.zIndex=this.zindex;
window.openLayers.push(this );
if(this.modal&&!this.enableFullScreen)
{
this.showModal();
}
if(this.contentURL )
{
this.loadContent();
var tranType=this.transitionType.toLowerCase();
if(tranType!='slideinout')
{
this._open();
}
}
else
{
this._open();
}
},
cancelContentLoad:function()
{
if(this.contentLoader!=null)
{
this.contentLoader.abort();
this.contentLoader=null;
}
},
loadContent:function()
{
var controller=this;
var url=this.contentURL;
this.contentLoader=jsCBDloadContent(url, this.contentNode, 'replaceChildren',
function(request,error,caller )
{
if(controller.suppressLayout)
{
controller.noScrollDiv=vg.html.getElements(controller.viewNode,{tagName:'div', attrName:'class', attrValue:controller.noScrollDiv_css})[0];
controller.scrollDiv=controller._findScrollDiv();
}
var tranType=controller.transitionType.toLowerCase();
if(tranType=='slideinout')
{
controller._open();
}
controller.setFocus();
controller.contentHasLoaded(request,error,caller );
},
null, this.viewNode.getAttribute('id' ), true );
},
contentHasLoaded:function(request, error, caller )
{
if(!error )
{
this.contentLoaded=true;
if(this.onContentLoad&&this.onContentLoad!='' )
{
var userCallback=eval(this.onContentLoad );
userCallback(request, error, caller );
}
}
},
_initRboxContent:function()
{
if(this.scrollDiv==null||this.suppressLayout )
{
this.scrollDiv=this._findScrollDiv();
this.scrollContent=vg.html.getFirstChild(this.scrollDiv);
if(this.scrollDiv.getAttribute("id")==null)
{
this.scrollDiv.setAttribute("id", this.id+"_scrollDiv");
}
}
},
_contentUpdated:function()
{
if(cbd.browser.isIPad )
{
this._initRboxContent();
if(this.scrollDiv&&this.scrollContent)
{
vg.html.setObjTop(this.scrollDiv.firstChild, "0");
}
}
},
userOnResize:function()
{
if(this.resizeFunction)
{
this.reposition();
var	container=(this.suppressLayout)?this.viewNode:this.scrollDiv;
var layerScrollDivHeight=vg.html.getObjHeight(container)-4;
eval(this.resizeFunction).call(this,layerScrollDivHeight);
}
},
_open:function()
{
var id=this.viewNode.getAttribute('id' ),
tranType="";
this.opening=true;
if(this.leader)
{
jsCBDtoggle(id+'Img', true);
}
tranType=this.transitionType.toLowerCase();
this.initSize();
this.setHeightOfScrollDiv();
this.reposition();
this.adjustWidthForScrollBars();
this.tranOpen();
if(tranType!='slideinout')
{
this.showLeader();
}
this.setFocus();
if(this._isSmallResponsive()===true )
{
this.configureSmallRespLayer();
}
vg.html._fireCustomEvent(vg.event.LAYER_OPEN,null,{layerId:this.viewNode.id});
this.opening=false;
},
isDescendantToLayerRegion:function()
{
},
appendToLayerRegion:function()
{
},
configureSmallRespLayer:function()
{
},
_removeSmallRespConfiguration:function()
{
},
adjustOpenRespLayer:function()
{
},
setFirstAndLastInputElements:function(useCache)
{
if(!useCache||!this.firstElem||!this.lastElem)
{
this._setFirstAndLastInputElements();
}
},
_setFirstAndLastInputElements:function()
{
var ret=[],
retLength,
i,
j;
vg.html.getContainerInputs(this.viewNode, ret);
retLength=ret.length;
this.firstElem=null;
this.lastElem=null;
for(i=0;i < retLength;i++)
{
if(vg.html.findFirstHiddenAncestor(ret[i])===null)
{
this.firstElem=ret[i];
break;
}
}
for(j=retLength - 1;j >=0;j--)
{
if(vg.html.findFirstHiddenAncestor(ret[j])===null)
{
this.lastElem=ret[j];
break;
}
}
},
close:function(closeByBrowserBack)
{
"use strict";
var activeElement=document.activeElement,
closeTransitionType;
if(this.enableFullScreen)
{
this._removeFullScreenRespStyles();
}
if(activeElement&&vg.html.isInput(activeElement))
{
activeElement.blur();
}
vg.validation.hideErr(false);
if(this.leaderNode )
{
this.leaderNode.style.display='none';
}
if(this.leader )
{
jsCBDtoggle(this.viewNode.getAttribute('id' )+'Img', false );
}
if(this.openFlag )
{
this.openFlag=false;
this.tranClose();
}
if(this.hasSmallRespConfig===true)
{
closeTransitionType=vg.Layer.TRANTYPES[this.transitionType.toLowerCase()].close;
if(closeTransitionType===vg.Layer.TRAN_NONE_CLOSE)
{
this._removeSmallRespConfiguration();
}
if(!closeByBrowserBack)
{
if(cbdcommon.support.isHTML5HistorySupported()===true)
{
window.history.back();
}
window.scrollTo(this.scrollLeft, this.scrollTop);
}
}
vg.html._fireCustomEvent(vg.event.LAYER_CLOSE,null,{layerId:this.viewNode.id});
},
positionModal:function()
{
vg.Layer.positionModal();
},
setScrollTopVal:function(h)
{
if(h > 0){
this.scrollTopVal=h;
}
},
setScrollPosition:function(h)
{
if(h > 0&&this.scrollDiv){
this.scrollDiv.scrollTop=h;
}
},
showModal:function()
{
vg.Layer.showModal(this.zindex);
},
hideModal:function()
{
vg.Layer.hideModal();
},
changePosition:function(e, x, y )
{
this.positionLeft=x;
this.positionTop=y;
},
repositionWithTarget:function()
{
var id=this.viewNode.getAttribute('id' );
if(this.targetId&&this.targetPosition )
{
var dpData=jsCBDPositionDisplayObject(id, this.targetId, this.targetPosition, false, this.leader );
if(dpData.elem.ldrOffSetX){
this.viewNode.style.left=dpData.elem.viewNode.x+dpData.elem.ldrOffSetX+"px";
}
if(dpData.elem.ldrOffSetY){
this.viewNode.style.top=dpData.elem.viewNode.y+dpData.elem.ldrOffSetY+"px";
}
this.leaderNode=dpData.elem.leaderId?document.getElementById(dpData.elem.leaderId):null;
if(this.leaderNode){
this.leaderNode.style.zIndex=this.zindex+1;
this.leaderNode.style.display='inline';
}
}
},
reposition:function()
{
var id=this.viewNode.getAttribute('id' ),
disp="",
dpData,
tranType="",
showLeader=false,
sw,
mainLeftPosition=0,
isMainLeftAligned=false,
nextGen=cbd.page.isNextGen,
w,
left=0,
sh,
h,
scrollTop,
top,
insideFloatDivInIE=false;
vg.html._fireCustomEvent(vg.event.LAYER_REPOSITION);
if(firefox)
{
this.viewNode.style.visibility='hidden';
}
disp=this.viewNode.style.display;
if(disp=='none')
{
this.viewNode.style.display='inline';
}
if(this._isSmallResponsive()===true||(this.enableFullScreen))
{
if(this.opening===true)
{
this.scrollLeft=_cbdGetScrollLeft();
this.scrollTop=_cbdGetScrollTop();
}
vg.html.setLeft(this.viewNode, 0);
vg.html.setObjTop(this.viewNode, 0);
}
else if(this.targetId&&this.targetPosition )
{
dpData=jsCBDPositionDisplayObject(id, this.targetId, this.targetPosition, false, this.leader );
if(dpData.elem.ldrOffSetX){
this.viewNode.style.left=dpData.elem.viewNode.x+dpData.elem.ldrOffSetX+"px";
}
if(dpData.elem.ldrOffSetY){
this.viewNode.style.top=dpData.elem.viewNode.y+dpData.elem.ldrOffSetY+"px";
}
this.leaderNode=dpData.elem.leaderId?document.getElementById(dpData.elem.leaderId):null;
if(this.leaderNode)
{
this.leaderNode.style.zIndex=this.zindex+1;
tranType=this.transitionType.toLowerCase();
if(tranType!='slideinout')
{
showLeader=true;
}
if(showLeader)
{
this.leaderNode.style.display='inline';
}
else
{
this.leaderNode.style.display='none';
}
}
}
else
{
sw=jsCBDgetScreenWidth();
mainLeftPosition=vg.html.getObjXY(vg.html.getElement("main")).x;
if(!isInteger(mainLeftPosition)||mainLeftPosition < 0)
{
mainLeftPosition=0;
}
isMainLeftAligned=mainLeftPosition===0;
if(!this.positionLeft||this.positionLeft=='centered' )
{
if(nextGen&&isMainLeftAligned&&window.openLayers.length===1)
{
sw=vg.html.getObjWidth("main");
}
w=this.viewNode.offsetWidth;
left=(sw - w )/2;
if(left < 0)
{
left=0;
}
this.viewNode.style.left=left+'px';
}
else if(typeof(this.positionLeft )=='string'&&this.positionLeft.match(/\d+(\px)/) )
{
this.viewNode.style.left=!isMainLeftAligned?parseInt(this.positionLeft.replace('px', '' ))+mainLeftPosition+"px":this.positionLeft;
}
else if(typeof(this.positionLeft )=='string'&&this.positionLeft.match(/\d+(\%)/) )
{
this.viewNode.style.left=!isMainLeftAligned?((parseInt(this.positionLeft.replace('%', '' ))/100)*sw)+mainLeftPosition+"px":this.positionLeft;
}
else
{
this.viewNode.style.left=(!isMainLeftAligned?parseInt(this.positionLeft)+mainLeftPosition:this.positionLeft)+'px';
}
if(!this.positionTop||this.positionTop=='centered' )
{
sh=jsCBDgetScreenHeight();
h=this.viewNode.offsetHeight;
scrollTop=_cbdGetScrollTop();
top=scrollTop+((sh - h )/2 );
if(ieQuirksMode&&document.getElementById('wrapDiv'))
{
insideFloatDivInIE=vg.html.findAncestor(vg.html.getElement(this.viewNode),{tagName:"div", attrName:"id", attrValue:"wrapDiv"});
if(!insideFloatDivInIE)
{
top -=scrollTop;
}
}
this.viewNode.style.top=top+'px';
}
else if(typeof(this.positionTop )=='string'&&this.positionTop.match(/\d+(\%|px)/) )
{
this.viewNode.style.top=this.positionTop;
}
else
{
this.viewNode.style.top=this.positionTop+'px';
}
}
this.resizeIFrame();
if(disp=='none')
{
this.viewNode.style.display=disp;
}
if(firefox)
{
this.viewNode.style.visibility='visible';
}
},
initSize:function()
{
var id;
if(this._isSmallResponsive()===true )
{
vg.html.setWidth(this.viewNode, "100%");
this.setHeightAttribute("100%");
}
else if(this.enableFullScreen)
{
if(!this.isDescendantToLayerRegion())
{
this.appendToLayerRegion();
}
vg.html.setWidth(this.viewNode, "100%");
this.setHeightAttribute("100%");
vg.html.removeStyle("respLayerBig", this.viewNode);
this.addFullScreenRespStyles();
id=vg.html.getElements(this.viewNode,{tagName:'div', attrName:'class'}, function(elem){return vg.html.hasStyle('rd1', elem);})[0];
if(id)
{
vg.html.addStyle("nogreyBorder", id);
}
}
else
{
if(this.transitionType.toLowerCase()=="slideinoutmsgdrawer" )
{
this.viewNode.style.width=Math.round(vg.html.getObjWidth(this.targetId )*0.95 )+'px';
}
else if(this.width )
{
this.setWidthAttribute(this.width);
}
if(this.height&&!this.contentLoaded )
{
this.setHeightAttribute(this.height);
}
id=vg.html.getElements(this.viewNode,{tagName:'div', attrName:'class'}, function(elem){return vg.html.hasStyle('rd1', elem);})[0];
if(id)
{
vg.html.removeStyle("nogreyBorder", id);
if(this.enableFullScreen)
{
this._removeFullScreenRespStyles();
}
}
}
},
resizeIFrame:function()
{
if(!this.iframe)
{
var iframeArr=vg.html.getElements(this.viewNode,{tagName:'iframe'});
if(iframeArr.length > 0)
{
this.iframe=iframeArr[0];
}
else
{
this.iframe="noIFrame";
}
}
if(this.iframe&&this.iframe!="noIFrame")
{
this.iframe.style.height=vg.html.getObjHeight(this.viewNode )+'px';
}
},
setHeightAttribute:function(height)
{
this.height=height;
if(this.height&&!this.resizedflag)
{
if(this.height=='auto'
||typeof(this.height )=='string'
&&(this.height.match(/\d+\%/)
||this.height.match(/\d+p[tx]/) ) )
{
this.viewNode.style.height=this.height;
}
else
{
this.viewNode.style.height=this.height+'px';
}
}
},
setWidthAttribute:function(width)
{
this.width=width;
if(this.width )
{
if(typeof(this.width )=='string'&&this.width.match(/\d+\%/) )
{
var perc=parseInt(this.width.substr(0, this.width.length - 1 ) );
var size=parseInt((perc*jsCBDgetScreenWidth() )/100 );
this.viewNode.style.width=size+'px';
}
else if(this.width=='auto'
||(typeof(this.width )=='string'
&&this.width.match(/\d+px/) ) )
{
this.viewNode.style.width=this.width;
}
else
{
this.viewNode.style.width=this.width+'px';
}
}
},
getHeightAttribute:function()
{
var height=this.height;
if(this.height)
{
if(this.height=='auto'
||typeof(this.height )=='string'
&&(this.height.match(/\d+\%/)
||this.height.match(/\d+p[tx]/) ) )
{
height=this.height;
}
else
{
height=this.height;
}
}
return height;
},
getWidthAttribute:function()
{
var width=this.width;
if(this.width )
{
if(typeof(this.width )=='string'&&this.width.match(/\d+\%/) )
{
var perc=parseInt(this.width.substr(0, this.width.length - 1 ) );
var size=parseInt((perc*jsCBDgetScreenWidth() )/100 );
width=size;
}
else if(this.width=='auto'
||(typeof(this.width )=='string'
&&this.width.match(/\d+px/) ) )
{
width=this.width;
}
else
{
width=this.width;
}
}
return width;
},
getLeftPos:function()
{
var left;
if(!this.positionLeft||this.positionLeft=='centered' )
{
var sw=jsCBDgetScreenWidth();
var w=this.viewNode.offsetWidth;
left=(sw - w )/2;
}
else if(typeof(this.positionLeft )=='string'&&this.positionLeft.match(/\d+(\%|px)/) )
{
left=parseInt(this.positionLeft.replace);
}
else
{
left=this.positionLeft;
}
return left;
},
getTopPos:function()
{
var top;
if(!this.positionTop||this.positionTop=='centered' )
{
var sh=jsCBDgetScreenHeight();
var h=this.viewNode.offsetHeight;
top=_cbdGetScrollTop()+((sh - h )/2 );
}
else if(typeof(this.positionTop )=='string'&&this.positionTop.match(/\d+(\%|px)/) )
{
top=parseInt(this.positionTop);
}
else
{
top=this.positionTop;
}
return top;
},
setHeightOfScrollDiv:function()
{
var makeVisible=false;
if(cbd.browser.isTouchScreen&&this.scrollDiv)
{
vg.touchScreen._makeNodeScrollable(this.scrollDiv.id);
}
if(!jsCBDisVisibleElement(this.viewNode))
{
makeVisible=true;
jsCBDtoggleElement(this.viewNode, true);
}
if(this.scrollDiv){
this.setScrollTopVal(this.scrollDiv.scrollTop);
}
var maxHeight=(jsCBDgetScreenHeight()*80)/100;
var height=this.height;
var autoNotMax=false;
var windowHeight;
if(height=="auto"&&!this.resizedflag )
{
if(this.scrollDiv)
{
this.scrollDiv.style.height="auto";
}
this.viewNode.style.height="auto";
if(vg.html.getObjHeight(this.viewNode ) > maxHeight )
{
this.viewNode.style.height=maxHeight+"px";
windowHeight=maxHeight;
}
else
{
autoNotMax=true;
windowHeight=this.getLayerHeight();
}
}
else
{
windowHeight=this.getLayerHeight();
}
var noscrollHeight=(this.noScrollDiv!=null )?vg.html.getObjHeight(this.noScrollDiv ):0;
var topHeight=(this.topArea!=null)?vg.html.getObjHeight(this.topArea ):0;
var bottomHeight=(this.bottomArea!=null)?vg.html.getObjHeight(this.bottomArea ):0;
var scrollHeight=windowHeight - noscrollHeight - topHeight - bottomHeight;
if(!autoNotMax&&this.scrollDiv&&this.scrollDiv.tagName!="TD" )
{
this.scrollDiv.style.height=scrollHeight+"px";
}
this.scrollHeight=scrollHeight;
this.windowHeight=windowHeight;
if(makeVisible )
{
jsCBDtoggleElement(this.viewNode, false);
}
if(this.scrollDiv&&
(document.getElementById("errFormLayer")==null||!jsCBDisVisibleElement(vg.html.getElement("errFormLayer")))){
this.setScrollPosition(this.scrollTopVal);
this.scrollTopVal=0;
}
},
getLayerHeight:function()
{
var theHeight=this.height,
styleHeight=this.viewNode.style.height;
if(this.resizedflag&&styleHeight)
{
theHeight=styleHeight.replace(vg.Layer.STYLE_TO_NUMBER_REGEX, "" );
}
else if(cbdcommon.screen.isMediaQuerySizeSmall()&&cbdcommon.support.hasiOSLayerBug&&cbd.page.isResponsiveCapable===true ){
theHeight=this.getAdjustediOSScreenHeight();
}
else if(isEmpty(theHeight )||theHeight=="auto" )
{
theHeight=vg.html.getObjHeight(this.viewNode );
}
else if(theHeight.match(/%/) )
{
theHeight=parseInt((parseInt(theHeight.replace('%', '' ), 10)*jsCBDgetScreenHeight())/100, 10);
}
else
{
theHeight=theHeight.replace(vg.Layer.STYLE_TO_NUMBER_REGEX, "" );
}
return theHeight;
},
getAdjustediOSScreenHeight:function()
{
return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
},
makeVisible:function()
{
jsCBDtoggleElement(this.viewNode, true);
},
calculateSlidePosition:function()
{
var h=vg.html.getObjHeight(this.viewNode );
var w=vg.html.getObjWidth(this.viewNode );
var ret={w:0, h:0};
if(this.targetPosition.match(/top/) )
{
ret.w=0;
ret.h=h;
}
else if(this.targetPosition.match(/bottom/) )
{
ret.w=0;
ret.h=-1*h;
}
else if(this.targetPosition=="right" )
{
ret.w=-1*w;
ret.h=0;
}
else if(this.targetPosition=="left" )
{
ret.w=w;
ret.h=0;
}
else
{
if(this.targetPosition.match(/^n.$/) )
{
ret.h=h;
}
if(this.targetPosition.match(/^s.$/) )
{
ret.h=-1*h;
}
if(this.targetPosition.match(/^.e$/) )
{
ret.w=-1*w;
}
if(this.targetPosition.match(/^.w$/) )
{
ret.w=w;
}
else
{
ret.w=0;
ret.h=-1*h;
}
}
return ret;
},
_finishedClose:function()
{
"use strict";
this.openFlag=false;
jsCBDtoggleElement(this.viewNode, false);
vg.Layer.unregisterOpenLayer(this);
if(this.modal&&!this.enableFullScreen)
{
this.hideModal();
}
},
tran_noneOpen:function()
{
jsCBDtoggleElement(this.viewNode, true);
},
tran_noneClose:function()
{
this._finishedClose();
},
onCloseAnimationEnd:function()
{
"use strict";
this._finishedClose();
if(this.hasSmallRespConfig===true)
{
this._removeSmallRespConfiguration();
}
if(this.enableFullScreen)
{
this._removeFullScreenRespStyles();
}
},
_showOrHideContent:function(opac)
{
if(this.scrollDiv)
vg.html.setOpacity(this.scrollDiv, opac);
if(this.contentNode)
vg.html.setOpacity(this.contentNode, opac);
if(this.noScrollDiv)
vg.html.setOpacity(this.noScrollDiv, opac);
},
tran_fadeIn:function()
{
var controller=this;
var id=this.viewNode.getAttribute('id' );
vg.html.setOpacity(this.viewNode, 0.0 );
var anim=vg.smil.animateElement(id, 'opacity', this.fadeDuration, 0, 0, 1,  null, function(){vg.util._removeIEfilterProp(controller.viewNode);});
if(ieQuirksMode)
{
_cbdCheckConditionsAndExecute(function(){return controller.viewNode.style.filter!=''}, function(){jsCBDtoggleElement(controller.viewNode, true)})
}
else
{
jsCBDtoggleElement(this.viewNode, true);
}
},
tran_fadeOut:function()
{
"use strict";
var controller=this,
anim=vg.smil.animateElement(this.viewNode.getAttribute('id' ), 'opacity', 1000, 0, 1, 0, null, function(){controller.onCloseAnimationEnd();});
},
tran_slideClose:function()
{
"use strict";
var pos=this.calculateSlidePosition(),
rbTable=this.outerDiv,
attributes={
left:{from:0, to:pos.w},
top:{from:0, to:pos.h}
},
controller=this,
anim=vg.smil.animateElement(rbTable.getAttribute('id' ), attributes, this.transitionDuration, 0, null, null, null, function(){controller.onCloseAnimationEnd();});
},
tran_slideOpen:function()
{
this.makeVisible();
var h=vg.html.getObjHeight(this.viewNode );
var w=vg.html.getObjWidth(this.viewNode );
var pos=this.calculateSlidePosition();
var clipW=w+"px";
var clipH=h+"px";
if(this.contentNode)
{
this.contentNode.style.overflow="hidden";
}
if(this.noScrollDiv)
{
this.noScrollDiv.style.overflow="hidden";
}
this.viewNode.style.clip="rect(0px,"+clipW+","+clipH+",0px )";
var rbTable=this.outerDiv;
rbTable.setAttribute('id', this.viewNode.getAttribute('id' )+'_roundBox' );
rbTable.style.position="relative";
rbTable.style.left=pos.w+"px";
rbTable.style.top=pos.h+"px";
var attributes={
left:{from:pos.w, to:0},
top:{from:pos.h, to:0}
};
var controller=this;
var anim=vg.smil.animateElement(rbTable.getAttribute('id' ), attributes, this.transitionDuration, 250, null, null, null, function(){controller.showLeader();}, null);
},
showLeader:function()
{
var ldrId='ldr_'+this.viewNode.getAttribute('id' );
var leaderDiv=document.getElementById(ldrId);
if(leaderDiv)
{
leaderDiv.style.opacity=1;
leaderDiv.style.display='inline';
}
},
tran_slideDrawer:function()
{
var controller=this;
this.tran_slideOpen();
setTimeout(function(){controller.tran_slideClose();}, 7000 );
},
adjustForMinimumWidth:function()
{
var viewNodeWidth=vg.html.getObjWidth(this.viewNode);
var outerDivWidth=vg.html.getObjWidth(this.outerDiv);
if(viewNodeWidth < outerDivWidth )
{
this.viewNode.style.width=outerDivWidth+'px';
return true;
}
return false;
},
setFocus:function()
{
if(!this.disableDefaultFocus)
{
this.setFirstAndLastInputElements();
var firstElem=this.firstElem;
if(firstElem&&(!vg.html.isAncestor(this.scrollDiv,firstElem)||this.isElemInScrollView(firstElem)) )
{
jsCBDSetFocus(firstElem);
}
else
{
if(this.scrollDiv)
{
this.scrollDiv.setAttribute("tabindex", "-1");
jsCBDSetFocus(this.scrollDiv);
}
}
}
},
isElemInScrollView:function(element)
{
var controller=this;
if(controller.scrollDiv&&controller.scrollHeight)
{
var scrollTop=vg.html.getObjY(controller.scrollDiv);
var scrollBottom=controller.scrollHeight+scrollTop;
var yPosOfFirstElem=vg.html.getObjY(element);
return(yPosOfFirstElem >=scrollTop&&yPosOfFirstElem <=scrollBottom)
}
else
{
return true;
}
},
adjustWidthForScrollBars:function()
{
},
_configureAdditionalCSS:function()
{
var roundBox=this.outerDiv;
if(vg.html.hasStyle("rdshdw", roundBox))
{
jsCBDaddStyle(roundBox, "vgLayerShadowRoundBox");
}
else
{
jsCBDaddStyle(roundBox, "vgLayerRoundBox");
}
if(this.moveable&&!this.enableFullScreen)
{
jsCBDaddStyle(roundBox, "vgLayerRoundBoxDrag");
}
vg.html.getElements(roundBox,{tagName:"td", maxDepth:3}, null, function(roundboxCell){
jsCBDaddStyle(roundboxCell, "vgLayerRoundBoxCell");
});
},
_isSmallResponsive:function()
{
"use strict";
return(cbd.page.isNextGen&&cbd.page.isResponsiveCapable&&cbdcommon.screen.isMediaQuerySizeSmall() );
},
_destroy:function()
{
vg.html.removeEventListenerById(window, "layerNGwindowResize-"+this.viewNode.id);
}
};
vg.Layer.position=function(layerId)
{
vg.comp._lazyLoadComp(layerId);
var controller=vg.comp.findController(document.getElementById(layerId));
controller.reposition();
};
vg.Layer.getPrintRegion=function(layerId, includeTitle)
{
vg.comp._lazyLoadComp(layerId);
var printRegion=null;
var controller=vg.comp.findController(layerId);
if(controller)
{
printRegion=controller.scroll_noscroll_container.parentNode;
if(includeTitle&&window.isNextGen)
{
var newDiv=document.createElement("div");
newDiv.innerHTML=controller.headerArea.innerHTML+printRegion.innerHTML;
printRegion=newDiv;
}
}
return printRegion;
};
vg.Layer._moveToPrintRegion=function(layerId, includeTitle, div)
{
var controller;
vg.comp._lazyLoadComp(layerId);
controller=vg.comp.findController(layerId);
div=vg.html.getElement(div);
if(controller)
{
div.appendChild(controller.layerBox);
if(!includeTitle)
{
div.className="noTitle";
}
}
};
vg.Layer._clearPrintDiv=function(layerId)
{
var mainDiv=document.getElementById("main");
var layerDiv=document.getElementById("layer");
var parentToMain=mainDiv.parentNode;
mainDiv.setAttribute("class"," ");
layerDiv.setAttribute("class"," ");
if(layerId){
vg.Layer._resetPrintDiv(layerId);
}
parentToMain.removeChild(vg.html.getElement("printLayerDiv"));
return false;
};
vg.Layer._resetPrintDiv=function(layerId){
var controller;
vg.comp._lazyLoadComp(layerId);
controller=vg.comp.findController(layerId);
if(controller)
{
controller.viewNode.firstChild.appendChild(controller.layerBox);
}
};
vg.Layer._toggleLayer=function(open, layerId)
{
vg.comp._lazyLoadComp(layerId);
var node=document.getElementById(layerId );
if(node&&node.jsController )
{
if(open )
{
document.getElementById(layerId ).jsController.open();
}
else
{
}
}
};
vg.Layer._getLayerTargetId=function(id )
{
vg.comp._lazyLoadComp(id);
return vg.comp.getController(id ).targetId;
};
vg.Layer._removeOrphanNodes=function()
{
if(_cbdLeaderIds!=null)
{
for(var i=0;i < _cbdLeaderIds.length;i++)
{
var ldrId=_cbdLeaderIds[i];
var layerId=ldrId.replace("ldr_", "");
vg.comp._lazyLoadComp(layerId);
var layer=document.getElementById(layerId)
if(layer!=null)
{
var layerCntr=vg.comp.getController(layer);
if(layerCntr)
{
if(!layerCntr.openFlag)
{
jsCBDtoggle(ldrId, false);
}
}
}
else
{
leader=document.getElementById(ldrId);
if(leader!=null)
{
var parentNode=leader.parentNode;
parentNode.removeChild(leader);
}
}
}
}
};
vg.Layer.unregisterOpenLayer=function(layerNode){
for(var i=0;i < window.openLayers.length;i++)
{
if(window.openLayers[i]==layerNode )
{
window.openLayers.splice(i, 1 );
i--;
}
}
};
vg.Layer._isOpen=function(layerId)
{
vg.comp._lazyLoadComp(layerId);
return document.getElementById(layerId).jsController.openFlag;
};
vg.Layer._getZindex=function(layerId)
{
vg.comp._lazyLoadComp(layerId);
return document.getElementById(layerId).jsController.zindex;
}
vg.Layer._getParentLayerId=function(element){
var layerNode=_cbdFindAncestor(element,{tagName:'span',attrName:'type',attrValue:'Layer'});
if(layerNode)
{
return(layerNode.id).substring(vg.constants.COMP_ID_PFX_LENGTH ,(layerNode.id).length);
}
return null;
};
vg.Layer.scrollToTop=function(layerId)
{
vg.comp._lazyLoadComp(layerId);
var scrollDiv=document.getElementById(layerId).jsController.scrollDiv;
vg.html.scrollToPosition(scrollDiv,0,0);
};
vg.Layer.isModalLayerOpen=function()
{
return jsCBDisVisible(vg.Layer.modalLayerName);
};
vg.Layer._moveToLayerDiv=function(layerId)
{
var layerDiv=vg.html.getElement('layer')||vg.html.getElement('vg1Layer'),
layer=_cbdFindAncestor(vg.html.getElement(layerId),{tagName:'span',attrName:'type',attrValue:'Layer'});
if(!vg.html.isAncestor(layerDiv, layer))
{
layerDiv.appendChild(layer);
}
};
vg.Layer.scrollToElement=function(elementId)
{
"use strict";
var element=vg.html.getElement(elementId),
layerId=vg.Layer._getParentLayerId(element),
scrollDiv=vg.Layer.getScrollDiv(layerId),
scrollContainerFirstChild,
scrollConfig,
customScrollY=vg.touchScreen.customScrollY,
elemPositionInScrollContainer;
if(scrollDiv)
{
scrollContainerFirstChild=vg.html.getFirstChild(scrollDiv);
if(vg.touchScreen._isCustomScrollContainer(scrollContainerFirstChild))
{
elemPositionInScrollContainer=-1*((vg.html.getObjY(element, true) - vg.html.getObjY(scrollContainerFirstChild, true)));
scrollConfig={"targetYPos":elemPositionInScrollContainer, "scrollContainer":scrollContainerFirstChild};
customScrollY.initScrollingProperties(null,scrollContainerFirstChild);
if(vg.Layer.checkIfInputAtBottom(element, elemPositionInScrollContainer, customScrollY.max, customScrollY.newPos))
{
scrollConfig.newMax=elemPositionInScrollContainer;
}
vg.touchScreen.customScrollY.customScrollMove(scrollConfig);
}
else
{
vg.html.scrollToPosition(scrollDiv,null,element.offsetTop);
}
}
};
vg.Layer.checkIfInputAtBottom=function(element, newMax, oldMax, newPos)
{
return element.tagName==="INPUT"&&newMax < oldMax&&cbd.browser.isAndroid&&newPos!==newMax;
};
vg.LayerNG=function(id, opt)
{
this.base=vg.Controller;
this.id=id;
this.base(id, id );
this.openFlag=false;
this.type="layer";
this.transDurDefault=250;
this.fadeDuration=(this.transitionDuration )?this.transitionDuration:this.transDurDefault;
this.leader=false;
this.widthOffset;
this.firstElem;
this.lastElem;
this.elems;
this.closeButtonId=id+"_closeButton";
this.hasSmallRespConfig=false;
vg.util.attachJsonOptions(this, opt );
this.opening=false;
this.handleNestedLayer();
this.makePointers();
this.setHandleSize();
this.configureLayer();
this.addEventListeners();
this.addWindowResizeListener();
this._configureAdditionalCSS();
this.originalHeight=this.height;
};
var EmptyFunc=function(){};
EmptyFunc.prototype=vg.Layer.prototype;
vg.LayerNG.prototype=new EmptyFunc();
vg.LayerNG.prototype._findScrollDiv=function()
{
var THIS=this;
return vg.html.getElements(this.viewNode,{tagName:'div'},
function(node)
{return vg.html.hasStyle(THIS.scrollable_css, node)
&&vg.html.hasStyle(THIS.layer_css, node);
})[0];
};
vg.LayerNG.prototype.makePointers=function()
{
this.layer_css='layer';
this.scrollable_css='scrollRegion';
this.noScrollDiv_css='noScrollRegion';
this.scrollDiv_css=this.scrollable_css+" "+this.layer_css;
this.scrollNoScroll_css='sizeEnforcer';
this.smallLayer_css='layerSmall';
this.bigLayer_css='layerBig';
this.internalLayerBanner_css='internalLayer';
this.layerTitle_css='layerTitle';
this.outerDiv=this.viewNode.firstChild;
this.scroll_noscroll_container=vg.html.getElements(this.viewNode,{tagName:'div', attrName:'class', attrValue:this.scrollNoScroll_css})[0];
this.scrollDiv=this._findScrollDiv();
this.noScrollDiv=vg.html.getElements(this.viewNode,{tagName:'div', attrName:'class', attrValue:this.noScrollDiv_css})[0];
this.paddingTop=parseFloat(jsCBDGetComputedStylePropertyValue(this.scroll_noscroll_container.parentNode, "padding-top"));
this.paddingLeft=parseFloat(jsCBDGetComputedStylePropertyValue(this.scroll_noscroll_container.parentNode, "padding-left"));
this.paddingBot=parseFloat(jsCBDGetComputedStylePropertyValue(this.scroll_noscroll_container.parentNode, "padding-bottom"));
this.paddingRight=parseFloat(jsCBDGetComputedStylePropertyValue(this.scroll_noscroll_container.parentNode, "padding-right"));
if(this.suppressLayout )
{
this.contentNode=this.scroll_noscroll_container;
}
else
{
this.contentNode=this.scrollDiv.firstChild;
}
this.layerBox=this.outerDiv.firstChild;
var potentialHeaderArea=this.layerBox.firstChild;
this.headerArea=vg.html.hasStyle("headerArea",potentialHeaderArea)?potentialHeaderArea:null;
if(vg.html.hasStyle(this.smallLayer_css, this.outerDiv))
{
this.layerType='small';
}
else if(vg.html.hasStyle(this.bigLayer_css, this.outerDiv))
{
this.layerType='big';
}
};
vg.LayerNG.prototype.setHandleSize=function()
{
if(this.layerType=='small')
{
this.handleSize=6;
}
else if(this.layerType=='big')
{
this.handleSize=12;
}
};
vg.LayerNG.prototype.addWindowResizeListener=function()
{
if(this.height.indexOf('%') > -1&&!ieQuirksMode)
{
var controller=this;
vg.html.addEventListener(window, 'resize', function(e){controller.setHeightOfScrollDiv();}, "layerNGwindowResize-"+controller.viewNode.id);
}
};
vg.LayerNG.prototype.getWidthOffset=function()
{
if(this.persist)
{
return 0;
}
if(this.offsetDif&&!this.resizeable)
{
return this.offsetDif;
}
this.offsetDif=0;
var viewNodeOffsetWidth=0;
var contentOffsetWidth=0;
var makeVisible=false;
if(!jsCBDisVisibleElement(this.viewNode))
{
jsCBDtoggleElement(this.viewNode, true);
makeVisible=true;
}
viewNodeOffsetWidth=this.viewNode.offsetWidth;
contentOffsetWidth=this.contentNode.offsetWidth;
this.offsetDif=viewNodeOffsetWidth - contentOffsetWidth;
if(makeVisible )
{
jsCBDtoggleElement(this.viewNode, false);
}
return this.offsetDif;
};
vg.LayerNG.prototype.setWidthAttribute=function(width)
{
var pixelNumber=0;
this.width=width;
if(this.width )
{
if(!this.widthOffset )
{
this.widthOffset=this.getWidthOffset();
}
pixelNumber=parseInt(this.width );
}
this.viewNode.style.width=pixelNumber+this.widthOffset+'px';
};
vg.LayerNG.prototype.adjustForMinimumWidth=function()
{
var isAdjusted=false;
var scrollNoScrollWidth=vg.html.getObjWidth(this.scroll_noscroll_container );
this.adjustWidthForScrollBars();
var noScrollWidth=this.noScrollDiv?vg.html.getObjWidth(this.noScrollDiv ):0;
if(scrollNoScrollWidth < noScrollWidth )
{
scrollNoScrollWidth=noScrollWidth;
var windowWidth=this.outerDiv.firstChild.offsetLeft*2+scrollNoScrollWidth+this.paddingLeft+this.paddingRight;
this.viewNode.style.width=windowWidth+"px";
isAdjusted=true;
}
var headerWidth=(this.headerArea!=null)?vg.html.getObjWidth(this.headerArea ) - this.paddingLeft - this.paddingRight:0;
if(scrollNoScrollWidth < headerWidth )
{
scrollNoScrollWidth=headerWidth;
var windowWidth=this.outerDiv.firstChild.offsetLeft*2+scrollNoScrollWidth+this.paddingLeft+this.paddingRight;
this.viewNode.style.width=windowWidth+"px";
isAdjusted=true;
}
return isAdjusted;
};
vg.LayerNG.prototype.applyScalingFactor=function(isConfigureSmallRespLayer)
{
"use strict";
var windowInnerWidth=window.innerWidth,
windowInnerHeight=window.innerHeight,
orientation=Math.abs(window.orientation),
screenWidth=orientation===90?screen.height:screen.width,
screenHeight=this.getAdjustediOSScreenHeight(),
scaleX=windowInnerWidth/screenWidth,
scaleY=windowInnerHeight/screenHeight,
inp=this.viewNode.getElementsByTagName('input'),
textInputDetected=false,
cssText='',
i,
inpLength=inp.length,
inpElement,
viewNodeCssText=this.viewNode.style.cssText,
transformIndex=viewNodeCssText.indexOf('-webkit-transform'),
bodyElement=document.getElementById('body'),
scrollLeft=bodyElement.scrollLeft,
scrollTop=bodyElement.scrollTop,
layerLeft=0,
widthDiff;
scaleX=(scaleX > 1)?1:scaleX;
scaleY=(scaleY > 1)?1:scaleY;
if(scaleX < 1&&scaleX > 0)
{
widthDiff=screenWidth - windowInnerWidth;
layerLeft=(widthDiff/2 - scrollLeft)/scaleX*-1;
}
for(i=0;i<inpLength;i++)
{
inpElement=inp[i];
if(inpElement.type==="text")
{
textInputDetected=true;
if(isConfigureSmallRespLayer===true)
{
inpElement.focus();
}
break;
}
}
if(!textInputDetected)
{
if(transformIndex > 0)
{
viewNodeCssText=viewNodeCssText.slice(0,transformIndex);
}
cssText+='-webkit-transform:scale('+scaleX+', '+scaleY+') '+
'translate('+layerLeft+'px, '+scrollTop+'px);';
}
viewNodeCssText=viewNodeCssText+cssText;
this.viewNode.style.cssText=viewNodeCssText;
};
vg.LayerNG.prototype.configureSmallRespLayer=function()
{
"use strict";
if(!this.isDescendantToLayerRegion())
{
this.appendToLayerRegion();
}
this.addSmallRespStyles();
this.addSmallRespListeners();
this.initBrowserHistory();
this.hasSmallRespConfig=true;
cbdcommon.screen.setViewportMetaContent({width:"device-width", initScale:1, minScale:1, maxScale:1});
if(cbdcommon.support.hasiOSLayerBug&&cbd.page.isResponsiveCapable===true)
{
this.applyScalingFactor(true);
}
};
vg.LayerNG.prototype.addSmallRespListeners=function()
{
"use strict";
var THIS=this;
vg.html.addEventListener(window,
'scroll',
function(e)
{
if(_cbdGetScrollTop()<=0 )
{
THIS.resiz();
window.scrollTo(0,1);
}
},
vg.Layer.MOBILE_BASE_PAGE_SCROLL+this.id );
vg.html.addEventListener(this.viewNode,
"touchmove",
function(e){e.preventDefault();},
vg.Layer.TOUCH_MOVE+this.id );
vg.html.addEventListener(window,
"orientationchange",
function(e){
THIS.resiz();
},
vg.Layer.ORIENTATION_CHANGE+this.id );
};
vg.LayerNG.prototype.addSmallRespStyles=function()
{
"use strict";
var	mainDiv=document.getElementById("main"),
gfDiv=document.getElementById("gf"),
ghDiv=document.getElementById("gh"),
ghNoNavDiv=document.getElementById("ghNoNav");
vg.html.addStyle("hideOnSml", mainDiv );
vg.html.addStyle("hideOnSml", document.getElementById("cbdModalDiv") );
if(ghDiv)
{
vg.html.addStyle("hideOnSml", ghDiv);
}
if(ghNoNavDiv)
{
vg.html.addStyle("hideOnSml", ghNoNavDiv);
}
if(gfDiv)
{
vg.html.addStyle("hideOnSml", gfDiv);
}
};
vg.LayerNG.prototype.addFullScreenRespStyles=function()
{
"use strict";
var	mainDiv=document.getElementById("main"),
gfDiv=document.getElementById("gf"),
ghDiv=document.getElementById("gh"),
ghNoNavDiv=document.getElementById("ghNoNav");
vg.html.addStyle("hideOnAll", mainDiv);
if(ghDiv)
{
vg.html.addStyle("hideOnAll", ghDiv);
}
if(ghNoNavDiv)
{
vg.html.addStyle("hideOnSml", ghNoNavDiv);
}
if(gfDiv)
{
vg.html.addStyle("hideOnAll", gfDiv);
}
if(ieQuirksMode)
{
document.body.style.overflow='hidden';
}
else
{
this.viewNode.style.overflow='hidden';
}
};
vg.LayerNG.prototype._configureAdditionalCSS=function()
{
if(cbd.page.isResponsiveCapable)
{
vg.html.addStyle(vg.Layer.responsive, this.viewNode);
if(vg.html.hasStyle(this.bigLayer_css,this.outerDiv))
{
vg.html.addStyle("respLayerBig", this.viewNode);
}
}
};
vg.LayerNG.prototype.initBrowserHistory=function()
{
"use strict";
var THIS=this;
if(cbdcommon.support.isHTML5HistorySupported()===true)
{
var layerState={"layerId":this.id};
window.history.pushState(layerState,"",window.location);
vg.html.addEventListener(window, "popstate", function(e){THIS.onPopState(e.state);}, vg.Layer.HISTORY_POPSTATE+this.id);
}
};
vg.LayerNG.prototype.onPopState=function(layerState)
{
"use strict";
var openLayers=window.openLayers,
openLayerLength=openLayers.length,
topLayer=openLayers[openLayerLength-1],
stateLayerId;
if(layerState)
{
stateLayerId=layerState.layerId;
}
if(this.closeLayerOnPopState(stateLayerId, topLayer.id))
{
this.close(true);
}
};
vg.LayerNG.prototype.closeLayerOnPopState=function(stateLayerId, topLayerId)
{
"use strict";
if(stateLayerId&&!vg.Layer._isOpen(stateLayerId))
{
return false;
}
else if(this.id===topLayerId&&stateLayerId!==topLayerId)
{
return true;
}
};
vg.LayerNG.prototype._removeSmallRespListeners=function()
{
"use strict";
vg.html.removeEventListenerById(window, vg.Layer.HISTORY_POPSTATE+this.id);
vg.html.removeEventListenerById(window,vg.Layer.MOBILE_BASE_PAGE_SCROLL+this.id );
vg.html.removeEventListenerById(this.viewNode, vg.Layer.TOUCH_MOVE+this.id);
vg.html.removeEventListenerById(window, vg.Layer.ORIENTATION_CHANGE+this.id);
};
vg.LayerNG.prototype._removeSmallRespStyles=function()
{
"use strict";
var	mainDiv=document.getElementById("main"),
gfDiv=document.getElementById("gf"),
ghDiv=document.getElementById("gh"),
ghNoNavDiv=document.getElementById("ghNoNav");
vg.html.removeStyle("hideOnSml", mainDiv);
vg.html.removeStyle("hideOnSml", document.getElementById("cbdModalDiv"));
if(ghDiv)
{
vg.html.removeStyle("hideOnSml", ghDiv);
}
if(ghNoNavDiv)
{
vg.html.removeStyle("hideOnSml", ghNoNavDiv);
}
if(gfDiv)
{
vg.html.removeStyle("hideOnSml", gfDiv);
}
};
vg.LayerNG.prototype._removeFullScreenRespStyles=function()
{
"use strict";
var	mainDiv=document.getElementById("main"),
gfDiv=document.getElementById("gf"),
ghDiv=document.getElementById("gh"),
ghNoNavDiv=document.getElementById("ghNoNav");
vg.html.removeStyle("hideOnAll", mainDiv);
if(ghDiv)
{
vg.html.removeStyle("hideOnAll", ghDiv);
}
if(ghNoNavDiv)
{
vg.html.removeStyle("hideOnSml", ghNoNavDiv);
}
if(gfDiv)
{
vg.html.removeStyle("hideOnAll", gfDiv);
}
if(ieQuirksMode)
{
document.body.style.overflow='';
}
else
{
this.viewNode.style.overflow='';
}
};
vg.LayerNG.prototype._removeSmallRespConfiguration=function()
{
"use strict";
this.setHeightAttribute(this.originalHeight);
this._removeSmallRespListeners();
if(!vg.Layer.hasOpenLayer("layer"))
{
this._removeSmallRespStyles();
cbdcommon.screen.setViewportMetaContent({width:"device-width", initScale:1, minScale:0.25, maxScale:5});
window.scrollTo(this.scrollLeft, this.scrollTop);
this.hasSmallRespConfig=false;
}
};
vg.LayerNG.prototype.adjustOpenRespLayer=function()
{
if(this.openFlag)
{
if(this._transitionToSmall())
{
this.configureSmallRespLayer();
}
else if(this._transitionFromSmall())
{
this._removeSmallRespConfiguration();
}
_cbdConfigCBDModalDiv(false);
this.initSize();
this.resiz();
}
};
vg.LayerNG.prototype.isDescendantToLayerRegion=function()
{
"use strict";
var vgHtml=vg.html,
layerRegion=vgHtml.getElement(vg.Layer.LAYER_TEMPLATE_REGION_ID),
layerComp=vgHtml.getElement(vg.constants.COMP_ID_PFX+this.id);
return vg.html.isAncestor(layerRegion, layerComp);
};
vg.LayerNG.prototype.appendToLayerRegion=function()
{
"use strict";
var vgHtml=vg.html,
layerRegion=vgHtml.getElement(vg.Layer.LAYER_TEMPLATE_REGION_ID),
layerComp=vgHtml.getElement(vg.constants.COMP_ID_PFX+this.id);
cbd.getYUI().one(layerRegion).append(layerComp);
};
vg.LayerNG.prototype._transitionToSmall=function()
{
return cbdcommon.screen.isMediaQuerySizeSmall()&&!this.hasSmallRespConfig;
};
vg.LayerNG.prototype._transitionFromSmall=function()
{
return!cbdcommon.screen.isMediaQuerySizeSmall()&&this.hasSmallRespConfig;
};
vg.LayerNG.prototype.adjustWidthForScrollBars=function()
{
var viewNode=this.viewNode;
var toggleElementFunc;
if(!jsCBDisVisibleElement(this.viewNode))
{
toggleElementFunc=jsCBDtoggleElement;
toggleElementFunc(viewNode, true);
}
var viewNodeStyle=viewNode.style;
var getObjWFunc=vg.html.getObjWidth;
var scrollNoScrollWidth=getObjWFunc(this.scroll_noscroll_container );
var scrollWidth=this.scrollDiv?getObjWFunc(this.scrollDiv ):0;
if(scrollNoScrollWidth < scrollWidth )
{
scrollNoScrollWidth=scrollWidth;
var windowWidth=this.outerDiv.firstChild.offsetLeft*2+scrollNoScrollWidth+this.paddingLeft+this.paddingRight;
viewNodeStyle.width=windowWidth+"px";
}
if(this.scrollDiv&&vg.util.hasHorizScrollBar(this.scrollDiv)&&!this._isSmallResponsive())
{
viewNodeStyle.width=parseInt(viewNodeStyle.width.replace('px', '' ))+17+"px";
}
if(toggleElementFunc )
{
toggleElementFunc(viewNode, false);
}
};
vg.LayerNG.prototype.setHeightOfScrollDiv=function()
{
'use strict';
var viewNodeHeight, scrollNoScrollHeight,
height=this.height,
maxHeight=(jsCBDgetScreenHeight()*80)/100,
scrollDiv=this.scrollDiv,
viewNode=this.viewNode,
noScrollDiv=this.noScrollDiv,
scroll_noscroll_style=this.scroll_noscroll_container.style,
headerHeight,
noScrollHeight,
borderHeight,
windowHeight,
viewNodeHeight,
toggleElementFunc,
scrollDivCalculatedHeight;
if(cbd.browser.isTouchScreen&&this.scrollDiv)
{
vg.touchScreen._makeNodeScrollable(this.scrollDiv.id);
}
if(scrollDiv&&ieQuirksMode&&!scrollDiv.currentStyle )
{
this.noScrollDiv=vg.html.getElements(this.viewNode,{tagName:'div', attrName:'class', attrValue:this.noScrollDiv_css})[0];
this.scrollDiv=this._findScrollDiv();
}
if(scrollDiv){
this.setScrollTopVal(scrollDiv.scrollTop);
}
if(!jsCBDisVisibleElement(viewNode))
{
toggleElementFunc=jsCBDtoggleElement;
toggleElementFunc(viewNode, true);
}
headerHeight=(this.headerArea!=null)?vg.html.getObjHeight(this.headerArea ):0;
noScrollHeight=(noScrollDiv)?vg.html.getObjHeight(noScrollDiv):0;
if(height==="auto"&&!this.resizedflag)
{
if(scrollDiv)
{
scrollDiv.style.height="auto";
}
scroll_noscroll_style.height="auto";
viewNode.style.height="auto";
viewNodeHeight=noScrollHeight+vg.html.getObjHeight(viewNode );
if(viewNodeHeight > maxHeight)
{
viewNodeHeight=maxHeight;
}
}
else
{
viewNodeHeight=this.getLayerHeight();
}
viewNodeHeight=this.checkMinHeight(viewNodeHeight);
borderHeight=this.outerDiv.firstChild.offsetTop*2;
windowHeight=viewNodeHeight - borderHeight;
scrollNoScrollHeight=windowHeight - headerHeight - this.paddingTop - this.paddingBot;
if(this.scrollDiv )
{
if(scrollNoScrollHeight < 36+noScrollHeight )
{
scrollNoScrollHeight=36+noScrollHeight;
viewNodeHeight=borderHeight+headerHeight+scrollNoScrollHeight+this.paddingTop+this.paddingBot;
}
scrollDivCalculatedHeight=scrollNoScrollHeight - noScrollHeight;
scrollDiv.style.height=scrollDivCalculatedHeight+"px";
if(scrollDivCalculatedHeight >=scrollDiv.scrollHeight)
{
vg.html.addStyle("hideVertScroll", scrollDiv );
}
else
{
vg.html.removeStyle("hideVertScroll", scrollDiv );
this.adjustWidthForScrollBars();
}
}
scroll_noscroll_style.height=scrollNoScrollHeight > 0?scrollNoScrollHeight+"px":"0px";
viewNode.style.height=viewNodeHeight+"px";
this.scrollHeight=scrollDivCalculatedHeight;
this.windowHeight=windowHeight;
if(toggleElementFunc )
{
toggleElementFunc(this.viewNode, false);
}
if(this.scrollDiv&&(document.getElementById("errFormLayer")==null||
!jsCBDisVisibleElement(vg.html.getElement("errFormLayer"))))
{
this.setScrollPosition(this.scrollTopVal);
this.scrollTopVal=0;
}
};
vg.LayerNG.prototype.checkMinHeight=function(currentHeight)
{
var minHeight=this.minHeight;
if(minHeight.match(/%/))
{
minHeight=parseInt((parseInt(minHeight, 10)*jsCBDgetScreenHeight() )/100, 10);
}
else
{
minHeight=parseInt(minHeight, 10);
}
if(currentHeight < minHeight)
{
currentHeight=minHeight;
}
return currentHeight;
};
vg.LayerNG.setTitle=function(id, title)
{
vg.comp._lazyLoadComp(id);
var layerCont=vg.comp.getController(id);
if(layerCont!=null)
{
layerCont._setTitle(title);
layerCont.setHeightOfScrollDiv();
}
};
vg.LayerNG.prototype._setTitle=function(title)
{
this.headerArea.innerHTML="<div class='"+this.layerTitle_css+"'>"+title+"</div>";
};
vg.LayerNG.prototype._setInternal=function(internal)
{
if(internal)
{
vg.html.addStyle(this.internalLayerBanner_css, this.outerDiv );
}
else
{
vg.html.removeStyle(this.internalLayerBanner_css, this.outerDiv );
}
};
vg.LayerNG.prototype.setFirstAndLastInputElements=function(useCache)
{
if(!useCache||!this.firstElem||!this.lastElem)
{
this.lastElem=document.getElementById(this.closeButtonId);
if(this.lastElem)
{
this.firstElem=vg.html.getFirstElementMatch(this.outerDiv, vg.html.isInput, jsCBDisVisibleElement);
}
else
{
this._setFirstAndLastInputElements();
}
}
};


SelectOneMenu=function(compAttr)
{
this._construct(compAttr);
}
SelectOneMenu.PULLDOWN_HIGHLIGHT=PULLDOWN_HIGHLIGHT="vg-SelOneMenuHover vg-SelOneMenuHoverText";
SelectOneMenu.PULLDOWN_TEXT_FOCUS=PULLDOWN_TEXT_FOCUS="vg-SelOneMenuFocusText";
SelectOneMenu.LABEL_TEXT_FOCUS=LABEL_TEXT_FOCUS="vg-SelOneMenuFocusLabelText";
SelectOneMenu.TRIGGER_HAS_FOCUS="vg-SelOneMenuTriggerHasFocus";
SelectOneMenu.DROP_DOWN_MENU_WIDTH_SHORT="vg-SelOneMenuDropDownMenuWidthShort";
SelectOneMenu.DROP_DOWN_MENU_WIDTH_LONG="vg-SelOneMenuDropDownMenuWidthLong";
SelectOneMenu.selectedPulldownId;
SelectOneMenu.prototype=
{
_construct:function(compAttr)
{
var jsTransient=compAttr.jsTransient,
disabled="",
id=compAttr.id;
this.id=id;
this.controller=this;
this.base=vg.Controller;
this.base(this.id, null, jsTransient);
if(jsTransient&&(this.viewNode==null))
{
return;
}
this.initialized=false;
disabled=vg.html.getDisabledAttr(this.viewNode);
this.disabled=(disabled==='disabled'||disabled==='true')?true:false;
this.compAttr=compAttr;
this.width=compAttr.width;
if(compAttr.respConfig)
{
if(compAttr.respConfig.medium)
{
this.medWidth=compAttr.respConfig.medium.width;
}
if(compAttr.respConfig.small)
{
this.smlWidth=compAttr.respConfig.small.width;
this.smlOverridePositionAndWidth=compAttr.respConfig.small.overridePositionAndWidth==='true'?true:false;
}
}
this.contDiv=document.getElementById(id+'_cont' );
this.borderDiv=document.getElementById(id+'-border' );
this.mainNode=document.getElementById(id+'_main' );
this.textCont=vg.html.getElement(id+'_textCont' );
this.textNode=document.getElementById(id+'_text' );
this.labelDiv=document.getElementById(id+'_label' );
this._initResponsiveCapability();
if((!this.disabled&&cbd.page.isResponsiveCapable)||!cbd.page.isResponsiveCapable)
{
this._initialize();
}
},
_initialize:function()
{
var compAttr=this.compAttr,
controller=this.controller,
disabled=this.disabled,
isAjax=compAttr.isAjax,
size=compAttr.size,
menuwidth=compAttr.menuwidth,
align=compAttr.align,
omitElipse=compAttr.omitElipse,
initTabindex=compAttr.initTabindex,
openOnHover=compAttr.openOnHover,
isTouchScreen=cbd.browser.isTouchScreen,
nextGen=cbd.page.isNextGen,
i=0,
child,
childId,
node,
cssContainer=vg.html._cbdGetCSSContainer(this.viewNode),
menuId='menu-'+this.id,
menu=document.getElementById(menuId);
menu.setAttribute("associatedParentId", this.id);
for(i=0;i < cssContainer.childNodes.length;i++)
{
child=cssContainer.childNodes[i];
childId=child.id;
if(childId!=null&&childId===menuId)
{
cssContainer.removeChild(child);
}
}
this.menu=document.getElementById(menuId);
this.iconCell=this.mainNode.nextSibling;
this.scrollDiv=document.getElementById('scroll-'+this.id );
this.menuOpen=false;
this.selectedIndex=-1;
this.highlightIndex=-1;
this.labelInput=this.viewNode.getElementsByTagName('input')[0];
this.valueInput=SelectOneMenu._getValueInput(this.viewNode);
this.hasFocus=false;
this.initLoad=true;
this.height=null;
this.size=size;
this.disabled=false;
this.lastSortKeyIndex=-1;
this.lastSortKeyValue=null;
this.menuId=menuId;
this.menuwidth=menuwidth;
this.align=align;
this.omitElipse=omitElipse;
this.enableAnim=this.width!=null&&this.menuwidth!=null;
this.fixedLabelAutoMenu=this.width!=null&&this.menuwidth==null;
this.openOnHover=openOnHover;
this.initTabindex=initTabindex;
this.changeValue=null;
this.options=this.menu.getElementsByTagName('tr');
if(this.size&&this.size > this.options.length)
{
this.size=this.options.length;
}
this.rowEventsAdded=false;
vg.html.addEventListener(this.borderDiv, vg.event.GSTR_HOVERSTART,
function(event)
{
controller._addRowEvents(event);
if(controller.openOnHover&&!isTouchScreen)
{
if(!controller.menuOpen){
clearTimeout(controller.tID);
controller._showMenu();
}
clearTimeout(controller.tID);
}
}, "SOM_COMP_MOUSEENTER_TOUCHSTART");
vg.html.addEventListener(this.borderDiv, vg.event.GSTR_HOVEREND,
function(event)
{
controller._mouseout(event);
if(controller.openOnHover&&!isTouchScreen)
{
controller.tID=setTimeout(function(){controller._hideMenu()}, 0);
}
}, "SOM_COMP_MOUSEOUT_TOUCHEND" );
vg.html.addEventListener(document.body, vg.event.GSTR_DOWNSTART, function(e){jsCBDcloseSelectOneMenu(e)}, "SOM_BODY_DOWNSTART" );
for(i=0;i < this.options.length;i++)
{
node=vg.html.getFirstChild(this.options[i]);
node.index=i;
if(node.getAttribute('selected') )
{
this.selectedIndex=i;
}
}
if(this.selectedIndex===-1)
{
this.selectedIndex=0;
}
this._selectItem(vg.html.getFirstChild(this.options[this.selectedIndex]), true, false);
vg.html.addEventListener(this.viewNode, vg.event.GSTR_CLICKEND, function(e){controller._clickEvent(e)}, "SOM_COMP_TOUCHCLICK" );
this.aTag=document.getElementById(this.id+'_aTag' );
vg.html.addEventListener(nextGen?this.aTag:this.borderDiv, 'keydown',
function(e)
{
controller._addRowEvents(e);
controller._keyEvent(e);
}
);
vg.html.addEventListener(this.menu, 'focus', function(e){controller._focus()});
vg.html.addEventListener(this.menu, 'keydown', function(e){controller._menuKeyEvent(e)});
if(nextGen)
{
vg.html.addEventListener(this.aTag, 'focus',
function(e)
{
if(!controller.hasForcedFocus)
{
jsCBDaddStyle(this, SelectOneMenu.TRIGGER_HAS_FOCUS);
}
controller.hasForcedFocus=false;
controller._focus(e);
}
);
vg.html.addEventListener(this.aTag, 'blur',
function(e)
{
vg.html.removeStyle(SelectOneMenu.TRIGGER_HAS_FOCUS, this);
controller._blur();
}
);
vg.html.addEventListener(this.aTag, 'keydown', function(e){controller._menuKeyEvent(e)});
}
else
{
vg.html.addEventListener(this.labelInput, 'focus', function(e){controller._focus(e)});
vg.html.addEventListener(this.labelInput, 'keydown', function(e){controller._menuKeyEvent(e)});
vg.html.addEventListener(this.labelInput, 'blur', function(){controller._blur()});
}
if(!isTouchScreen)
{
if(nextGen)
{
vg.html.addEventListener(this.aTag, 'mouseout',
function(e)
{
vg.html.removeStyle(SelectOneMenu.TRIGGER_HAS_FOCUS, this);
}
);
}
if(controller.openOnHover)
{
vg.html.addEventListener(this.menu, 'mouseover',
function(e)
{
clearTimeout(controller.tID);
controller._showMenu();
controller._highlightItem(e);
}
);
}
vg.html.addEventListener(this.menu, 'mouseout',
function(e)
{
controller._removePulldownHighlightStyle();
if(controller.openOnHover&&!isTouchScreen)
{
controller.tID=setTimeout(function(){controller._hideMenu()}, 0);
}
}
);
}
if(!isAjax&&!this.fixedLabelAutoMenu)
{
if(this.width!=null&&this.width.indexOf('px') > 0)
{
vg.html.setWidth(this.menu, this.width);
}
}
vg.html.disableTextSelect(this.labelInput);
if(this.disabled&&!cbd.page.isResponsiveCapable)
{
_cbdDisableSelect(this.viewNode, true);
}
this.initialized=true;
},
focus:function()
{
if(cbd.page.isNextGen)
{
this.aTag.focus();
}
else
{
this.labelInput.focus();
}
},
_highlightItem:function(e)
{
if(!e)
{
return;
}
var eNode=(!e.tagName)?jsCBDgetEventNode(e):e;
if(this._isUnselectable(eNode) )
{
return;
}
this._removePulldownHighlightStyle();
if(eNode.tagName!='TR')
{
eNode=eNode.parentNode;
}
jsCBDaddStyle(eNode, SelectOneMenu.PULLDOWN_HIGHLIGHT);
this.highlightedItem=eNode;
},
_setLabelValue:function(txt, maxlen, elipse)
{
this.textNode.innerHTML=txt.substr(0,maxlen)+elipse;
},
_mouseout:function(e)
{
},
_removePulldownHighlightStyle:function(e)
{
if(this.highlightedItem)
{
vg.html.removeStyle(SelectOneMenu.PULLDOWN_HIGHLIGHT, this.highlightedItem);
}
},
_isDisabled:function(node)
{
var isDisabledItem=node.getAttribute("disabled" )
return isDisabledItem;
},
_isUnselectable:function(node,debug)
{
if(node.tagName!='TD')
{
node=node.parentNode;
}
return node.getAttribute("unselectable");
},
_selectItem:function(e, blockChangeEvent, api)
{
if(!e)
{
return;
}
var eNode=!e.tagName?jsCBDgetEventNode(e):e;
if(this._isDisabled(eNode)||this._isUnselectable(eNode) )
{
return;
}
var txt=vg.html.getNodeText(eNode );
this.labelInput.value=txt;
this.valueInput.value=eNode.getAttribute('value' );
if(this.width&&this.menuwidth)
{
var maxlen=parseInt(this.width.toString().replace("px",""))/8;
var elipse="...";
if(txt.length < maxlen||this.omitElipse)
{
maxlen=txt.length;
elipse="";
}
this._setLabelValue(txt, maxlen, elipse);
}
else
{
this.textNode.innerHTML=txt;
}
if(this.fixedLabelAutoMenu||this.enableAnim){
if(cbdcommon.screen.isMediaQuerySize("s,m"))
{
this.textNode.style.position='absolute';
}
else
{
this.textNode.style.position='static';
}
}
this.selectedIndex=eNode.index;
var selectedDifferentValue=this.changeValue!=this.valueInput.value;
if(!this.initLoad )
{
if(api==null||!api)
{
this._setFocus();
}
this._highlightItem(eNode);
}
this.highlightIndex=eNode.index;
if(!this.initLoad&&!blockChangeEvent)
{
this._hideMenu();
if(ie)
{
if(cbd.page.isNextGen)
{
this.aTag.focus();
}
else
{
this.labelInput.focus();
}
}
this._executeOnChangeJs(selectedDifferentValue);
}
else
{
this.initLoad=false;
}
if(cbdcommon.screen.isMediaQuerySize("s,m"))
{
this._fitToScreen();
}
},
_executeOnChangeJs:function(selectedDifferentValue)
{
var onChangeJs=this.viewNode.getAttribute('onChangeJs');
if(onChangeJs!=null&&selectedDifferentValue )
{
vg.comp._execEventHandler(onChangeJs, this.viewNode);
}
},
_focus:function()
{
this.changeValue=this.valueInput.value;
jsCBDaddStyle(this.contDiv, SelectOneMenu.PULLDOWN_TEXT_FOCUS);
jsCBDaddStyle(this.labelDiv, SelectOneMenu.LABEL_TEXT_FOCUS);
var onFocusJs=this.viewNode.getAttribute('onFocusJs');
if(onFocusJs!=null)
{
vg.comp._execEventHandler(onFocusJs, this.viewNode);
}
},
_blur:function()
{
jsCBDdeleteStyle(this.contDiv, SelectOneMenu.PULLDOWN_TEXT_FOCUS);
jsCBDdeleteStyle(this.labelDiv, SelectOneMenu.LABEL_TEXT_FOCUS);
},
_execOntoggle:function()
{
var onToggleJs=this.viewNode.getAttribute('ontoggle');
var visibility=!this.menuOpen;
if(onToggleJs!=null)
{
var list=onToggleJs.split(",");
if(onToggleJs.toLowerCase().indexOf("bleedthru") >=0)
{
var myFunc=onToggleJs.slice(0,onToggleJs.indexOf(')'));
if(list.length==3)
onToggleJs=myFunc+","+"null,"+visibility+")";
if(list.length==4)
onToggleJs=myFunc+","+visibility+")";
}
eval(onToggleJs);
}
},
_menuKeyEvent:function(e)
{
var key=jsCBDgetKey(jsCBDgetEvent(e));
if((key==40||key==38)&&this.menuOpen)
{
vg.html.preventDefault(e);
if((key==40&&this.highlightIndex+1 < this.options.length)||
(key==38&&this.highlightIndex - 1 >=0) )
{
this._getNextSelectableItem(key);
}
this._highlightItem(this.options[this.highlightIndex]);
if(vg.html._hasVerticalScrollBar(this.scrollDiv))
{
var heightPerOpt=this.scrollDiv.scrollHeight/this.options.length;
var optionY=(heightPerOpt*this.highlightIndex)+vg.html.getObjY(this.scrollDiv);
vg.html.scrollIntoView(this.scrollDiv, this.options[this.highlightIndex], heightPerOpt, optionY);
}
}
else if(key==13)
{
vg.html.preventDefault(e);
this._selectItem(vg.html.getFirstChild(this.options[this.highlightIndex]), false, false);
}
else if(key==9)
{
if(this.menuOpen)
{
cbd.page.isNextGen?this.aTag.focus():this.labelInput.focus();
this._hideMenu();
}
jsCBDdeleteStyle(this.contDiv, SelectOneMenu.PULLDOWN_TEXT_FOCUS);
jsCBDdeleteStyle(this.labelDiv, SelectOneMenu.LABEL_TEXT_FOCUS);
}
else
{
this._setMatchingItem(key);
if(this.menuOpen&&vg.html._hasVerticalScrollBar(this.scrollDiv))
{
var heightPerOpt=this.scrollDiv.scrollHeight/this.options.length;
var optionY=(heightPerOpt*this.highlightIndex)+vg.html.getObjY(this.scrollDiv);
vg.html.scrollIntoView(this.scrollDiv, this.options[this.highlightIndex], heightPerOpt, optionY);
}
}
},
_getNextSelectableItem:function(key){
var isDownKey=key==40;
var indexChange=(isDownKey?1:-1);
var startVal=this.highlightIndex+indexChange;
var numOptions=this.options.length;
for(var x=startVal;x >=0&&x < numOptions;x+=indexChange )
{
var currNode=vg.html.getFirstChild(this.options[x]);
if(!(this._isDisabled(currNode)||this._isUnselectable(currNode) ) )
{
this.highlightIndex=x;
break;
}
}
},
_setMatchingItem:function(key)
{
var keyChar=String.fromCharCode(key);
if(_isAlphaNumeric(keyChar))
{
this._findMatch(keyChar);
if(!this.hasFocus) this.hasFocus=true;
this._selectItem(vg.html.getFirstChild(this.options[this.highlightIndex]), this.menuOpen, true);
}
},
_findMatch:function(keyChar)
{
var item=null;
var itemValue=null;
var matchFound=false;
if(this.lastSortKeyValue!=keyChar.toUpperCase())
{
this._resetSorting(keyChar.toUpperCase())
}
var searchStartPos=(this.lastSortKeyIndex > -1)?this.lastSortKeyIndex+1:0;
for(var i=searchStartPos;i < this.options.length;i++)
{
item=vg.html.getFirstChild(this.options[i]);
itemValue=item.getAttribute('value');
label=item.innerHTML.toUpperCase();
if(vg.string.startsWith(label, keyChar.toUpperCase())&&itemValue!="none")
{
this.highlightIndex=item.index;
this.lastSortKeyIndex=item.index;
this._highlightItem(item);
matchFound=true;
break;
}
}
if(!matchFound&&searchStartPos!=0)
{
this._resetSorting(keyChar)
this._findMatch(keyChar);
}
},
_resetSorting:function(keyChar)
{
this.lastSortKeyValue=keyChar.toUpperCase();
this.lastSortKeyIndex=-1;
},
_keyEvent:function(e)
{
var key=jsCBDgetKey(jsCBDgetEvent(e));
if((key==40||key==38)&&!this.menuOpen&&!this.disabled)
{
vg.html.preventDefault(e);
this._showMenu();
this._setFocus();
}
},
_setFocus:function()
{
this.hasForcedFocus=true;
this.hasFocus=true;
if(cbd.page.isNextGen)
{
this.aTag.focus();
}
else
{
this.labelInput.focus();
}
},
_clickEvent:function(e)
{
if(cbd.browser.isTouchScreen&&!vg.event.isWithinNodes(e,[this.borderDiv]))
{
return;
}
if(e!=null)
{
vg.html.stopEventPropagation(jsCBDgetEvent(e));
}
if(this.rowEventsAdded==false)
{
var controller=this;
controller._addRowEvents(e);
return;
}
var disabled=vg.html.getDisabledAttr(this.viewNode)
if(disabled!='disabled'&&disabled!='true')
{
var closeOnClick=(this.openOnHover&&!cbd.browser.isTouchScreen)?false:true;
if(this.menuOpen&&closeOnClick)
{
this._hideMenu()
}
else
{
this._showMenu();
this._setFocus();
if(!this.menuOpen)
{
this._showMenu();
}
}
}
},
_hideMenu:function()
{
jsCBDdeleteStyle(this.labelDiv, SelectOneMenu.LABEL_TEXT_FOCUS);
this.menuOpen=false;
this._changeIcon(false);
jsCBDtoggleElement(this.menu, false);
this._resetBorderStyle();
this._execOntoggle();
this.borderDiv.style.width="";
},
_resetBorderStyle:function()
{
},
_setTopBorderStyle:function()
{
},
_setBottomBorderStyle:function()
{
},
_changeIcon:function()
{
},
_compareMenuWidths:function()
{
},
_initResponsiveCapability:function()
{
},
_fitToScreen:function()
{
},
_fitOptionsContainerToScreen:function()
{
},
_showMenu:function()
{
var offsetWidth=this.borderDiv.offsetWidth+'px',
menuStyle=this.menu.style,
compareMenuWidthsValue=0,
scrollBarWidth=14,
alignRight=this.align&&this.align==="right",
i=0,
xleft=0,
xmenuwidth=0,
xwidth=0,
isMediaQuerySizeLessThanLarge=cbdcommon.screen.isMediaQuerySize("s,m");
if(cbd.page.isResponsiveCapable)
{
this._setWidth("");
}
vg.html.removeStyle('vg-SelOneMenuDropDownHide', this.menu );
if(!this.fixedLabelAutoMenu||(this.fixedLabelAutoMenu&&this._compareMenuWidths() < 0))
{
vg.html.setWidth(this.borderDiv, offsetWidth);
this._setWidth(offsetWidth);
this.scrollDiv.firstChild.style.width='100%';
}
SelectOneMenu._closePrevMenu();
SelectOneMenu.selectedPulldownId=this.id;
vg.textZoomNG._resizeNodeOutsideOfZoomContent(this.menu, this.viewNode);
jsCBDtoggleElement(this.menu, true);
this.menuOpen=true;
if(this.size)
{
this.height=0;
for(i=0;i<this.size;i++)
{
this.height+=vg.html.getObjHeight(this.options[i]);
}
if(cbd.page.isNextGen&&this.height > 250)
{
this.height+=10;
}
}
if(!this.height||this.height <=0)
{
this.height=250;
}
if(isMediaQuerySizeLessThanLarge)
{
jsCBDaddStyle(this.menu, "vgsomForceNoWrap");
this.scrollDiv.style.height=(this.scrollDiv.scrollHeight > this.height)?this.height+"px":"100%";
jsCBDdeleteStyle(this.menu, "vgsomForceNoWrap");
}
else
{
this.scrollDiv.style.height=(this.scrollDiv.scrollHeight > this.height)?this.height+"px":"100%";
}
this.highlightIndex=this.selectedIndex;
this._highlightItem(this.options[this.selectedIndex]);
if(!isMediaQuerySizeLessThanLarge)
{
this._positionOptionsContainer();
}
if(this.menuwidth)
{
xmenuwidth=parseInt(this.menuwidth.toString().replace("px",""), 10);
xwidth=parseInt(menuStyle.width.toString().replace("px",""), 10);
this._setWidth(xmenuwidth+'px');
if(alignRight)
{
xleft=parseInt(menuStyle.left.toString().replace("px",""), 10);
menuStyle.left=xleft-(xmenuwidth-xwidth)+"px";
}
}
else if(vg.html.isFixedHeight(this.scrollDiv)&&!vg.html.isFixedWidth(this.menu))
{
this._setWidth((this.menu.offsetWidth+scrollBarWidth )+"px");
}
this._fitOptionsContainerToScreen();
compareMenuWidthsValue=this._compareMenuWidths();
if(compareMenuWidthsValue > 0)
{
vg.html.addStyle(SelectOneMenu.DROP_DOWN_MENU_WIDTH_LONG, this.contDiv);
}
else
{
vg.html.removeStyle(SelectOneMenu.DROP_DOWN_MENU_WIDTH_LONG, this.contDiv);
}
if(compareMenuWidthsValue < 0)
{
vg.html.addStyle(SelectOneMenu.DROP_DOWN_MENU_WIDTH_SHORT, this.contDiv);
}
else
{
vg.html.removeStyle(SelectOneMenu.DROP_DOWN_MENU_WIDTH_SHORT, this.contDiv);
}
if(this.smlOverridePositionAndWidth&&cbdcommon.screen.isMediaQuerySizeSmall())
{
this._setWidth((window.innerWidth - 36)+"px");
this.scrollDiv.firstChild.style.width='100%';
menuStyle.left="18px";
}
jsCBDaddStyle(this.labelDiv, SelectOneMenu.LABEL_TEXT_FOCUS);
if(cbd.browser.isIPad&&this.scrollDiv&&this.scrollDiv.scrollHeight > this.height)
{
vg.touchScreen._makeNodeScrollable(this.scrollDiv.id);
}
this._execOntoggle();
},
_positionOptionsContainer:function()
{
var menuTargetNode=cbdcommon.screen.isMediaQuerySize("s,m")?this.borderDiv:this.mainNode,
menu=this.menu,
pos=vg.html.position({elementNode:menu, targetNode:menuTargetNode, dispLoc:"auto", horzPos:"left"}),
menuLeft=(menu.style.left.replace('px','')*1),
ieNineTenOffset=2;
if(ie9||ie10)
{
menu.style.left=menuLeft+ieNineTenOffset+'px';
}
if(pos.elem.dispLoc.indexOf("top") > -1)
{
this._setTopBorderStyle();
this._changeIcon(true, true);
}
else
{
this._setBottomBorderStyle();
this._changeIcon(true, false);
}
},
_setWidth:function(width)
{
vg.html.setWidth(this.menu, width);
vg.html.setWidth(this.scrollDiv, width);
},
_handleHover:function()
{
},
_addRowEvents:function(event)
{
this._handleHover();
if(!this.rowEventsAdded )
{
event=jsCBDgetEvent(event);
var cssContainer=vg.html._cbdGetCSSContainer(this.viewNode);
cssContainer.appendChild(this.menu);
vg.html.setObjTop(this.menu, "0");
var contr=this;
for(var i=0;i < this.options.length;i++)
{
var optionItem=vg.html.getFirstChild(this.options[i]);
if(this._isDisabled(optionItem))
{
continue;
}
vg.html.addEventListener(optionItem, 'mouseover', function(e){contr._highlightItem(e)});
vg.html.addEventListener(optionItem, 'click', function(e){contr._selectItem(e, false, false)});
}
this.rowEventsAdded=true;
}
},
_test:function()
{
_debug("log", "Hosting-App Prototype");
},
_destroy:function()
{
vg.html.removeEventListenerById(window, "respVgSelectOneMenu"+this.id);
}
};
SelectOneMenu.getValue=function(id)
{
var selectOneMenu=vg.html.getElement(id);
return SelectOneMenu._getValueInput(selectOneMenu).value;
}
SelectOneMenu._getValueInput=function(viewNode)
{
return viewNode.getElementsByTagName('input')[1];
}
SelectOneMenu._hasValue=function(id)
{
var sel=SelectOneMenu.getValue(id);
var isValid=(sel!=null&&sel!="none");
var msgId=jsCBDgetErrMsgId(id);
jsCBDsetErrMessage(msgId, isValid);
return isValid;
}
SelectOneMenu._closePrevMenu=function()
{
if(SelectOneMenu.selectedPulldownId!=null)
{
SelectOneMenu._blur();
}
}
SelectOneMenu._blur=function()
{
if(SelectOneMenu.selectedPulldownId!=null)
{
var pullDown=document.getElementById(SelectOneMenu.selectedPulldownId);
if(pullDown!=null)
{
var controller=vg.comp.getController(pullDown);
if(controller!=null)
{
jsCBDdeleteStyle(controller.contDiv, SelectOneMenu.PULLDOWN_TEXT_FOCUS);
if(controller.hasFocus)
{
controller.hasFocus=false;
if(controller.menuOpen)
{
controller._hideMenu();
}
if(controller.changeValue!=controller.valueInput.value)
{
controller._executeOnChangeJs(true);
}
var onBlurJs=controller.viewNode.getAttribute('onBlurJs');
if(onBlurJs!=null)
{
vg.comp._execEventHandler(onBlurJs, controller.viewNode);
}
}
}
SelectOneMenu.selectedPulldownId=null;
}
}
}
SelectOneMenu._removeOrphanNodes=function()
{
var selectedPulldownId=SelectOneMenu.selectedPulldownId;
if(selectedPulldownId!=null)
{
if(document.getElementById(selectedPulldownId)==null)
{
var menu=document.getElementById('menu-'+selectedPulldownId);
if(menu!=null)
{
menu.parentNode.removeChild(menu);
}
}
}
}
SelectOneMenu.toggleSelectOneMenu=function(id)
{
var pullDown=document.getElementById(id),
controller;
if(pullDown!==null&&_cbdIsNativeSelectOneMenu(pullDown))
{
pullDown.click();
}
else
{
controller=vg.comp.getController(pullDown);
controller.focus();
controller._addRowEvents();
controller._clickEvent();
}
}
SelectOneMenu._testPrototype=function(id)
{
var selectOneMenu=vg.html.getElement(id);
return vg.comp.getController(selectOneMenu)._test();
}
VgSelectOneMenu=function(compAttr)
{
this._construct(compAttr);
this.cellStyle="vg-SelOneMenuDropDownOnTop";
this.menuStyle="vg-SelOneMenuDropDownAtBottom";
if(ie6_proper)
{
this.cellStyle="vg-SelOneMenuDropDownOnTopIE6";
this.menuStyle="vg-SelOneMenuDropDownAtBottomIE6";
}
};
var SelectEmptyFunc=function(){};
SelectEmptyFunc.prototype=SelectOneMenu.prototype;
VgSelectOneMenu.prototype=new SelectEmptyFunc();
VgSelectOneMenu.prototype._setTriggerWidth=function(width)
{
"use strict";
var newWidth=cbdcommon.string.isEmpty(width)?"":width;
if(cbdcommon.screen.isMediaQuerySize("s,m"))
{
this.contDiv.style.width=newWidth;
this.hiddenInputContainer.style.width=this.textCont.style.width="";
}
else
{
this.contDiv.style.width="";
this.hiddenInputContainer.style.width=newWidth;
this.textCont.style.width=newWidth;
}
};
VgSelectOneMenu.prototype._getTriggerWidth=function()
{
"use strict";
if(cbdcommon.screen.isMediaQuerySizeSmall())
{
return cbdcommon.string.isEmpty(this.smlWidth)?this.width:this.smlWidth;
}
else if(cbdcommon.screen.isMediaQuerySizeMedium())
{
return cbdcommon.string.isEmpty(this.medWidth)?this.width:this.medWidth;
}
else
{
return this.width;
}
};
VgSelectOneMenu.prototype._fitToScreen=function()
{
"use strict";
this._setTriggerWidth(this._getTriggerWidth());
if(cbdcommon.screen.isMediaQuerySize("s,m"))
{
this.textNode.style.position="absolute";
this.inputCont.style.overflow="visible";
}
else
{
this.textNode.style.position="static";
this.inputCont.style.overflow="hidden";
}
if(this.menuOpen)
{
this._hideMenu();
this._showMenu();
this._setFocus();
}
};
VgSelectOneMenu.prototype._initResponsiveCapability=function()
{
"use strict";
if(cbd.page.isResponsiveCapable)
{
var hiddenInputRow=vg.html.getElements(this.borderDiv,{tagName:"tr", attrName:"class", attrValue:"vg-SelOneMenuHiddenRow"})[0],
THIS=this;
this.hiddenInputContainer=vg.html.getElements(hiddenInputRow,{tagName:"div", attrName:"class", attrValue:"vg-SelOneMenuInput"})[0];
this.compNode=vg.html.findAncestor(this.viewNode,{tagName:"span", attrName:"id", attrValue:vg.constants.COMP_ID_PFX+this.id});
this.inputCont=vg.html.getElements(this.mainNode,{tagName:"span", attrName:"class", attrValue:"vg-SelOneMenuInputCont"})[0];
vg.html.addEventListener(window, vg.event.BROWSER_RESIZE_END, function(e){
THIS._fitToScreen(true);
}, "respVgSelectOneMenu"+this.id);
this._fitToScreen();
}
};
VgSelectOneMenu.prototype._fitOptionsContainerToScreen=function()
{
"use strict";
var optionsContainer=this.menu,
optionsWidth,
screenWidth,
menuXPosition,
alignRight=this.align&&this.align==="right",
availableScreenWidth;
if(cbdcommon.screen.isMediaQuerySize("s,m"))
{
jsCBDaddStyle(this.menu, "vgsomForceNoWrap");
optionsWidth=vg.html.getObjWidth(optionsContainer);
screenWidth=document.documentElement.clientWidth;
menuXPosition=vg.html.getObjX(this.viewNode);
availableScreenWidth=(alignRight)?(vg.html.getObjWidth(this.viewNode)+menuXPosition):(screenWidth - menuXPosition);
if(optionsWidth > availableScreenWidth)
{
this._setWidth(availableScreenWidth+"px");
if(alignRight)
{
this.menu.style.left="0px";
}
}
jsCBDdeleteStyle(this.menu, "vgsomForceNoWrap");
this._positionOptionsContainer();
}
};
VgSelectOneMenu.prototype._resetBorderStyle=function()
{
vg.html.removeStyle(this.menuStyle, this.mainNode);
vg.html.removeStyle(this.cellStyle, this.mainNode);
vg.html.removeStyle(this.menuStyle, this.iconCell);
vg.html.removeStyle(this.cellStyle, this.iconCell);
vg.html.removeStyle(this.cellStyle, this.menu );
vg.html.removeStyle(this.menuStyle, this.menu );
vg.html.removeStyle('vg-SelOneMenuDropDownwards', this.borderDiv );
vg.html.removeStyle('vg-SelOneMenuDropUpwards', this.borderDiv );
}
VgSelectOneMenu.prototype._changeIcon=function(open, upwards)
{
if(open)
{
vg.html.removeStyle("vg-SelOneMenuIconCell", this.iconCell);
vg.html.addStyle((upwards)?"vg-SelOneMenuIconCellOpenTop "+this.menuStyle:"vg-SelOneMenuIconCellOpenBottom "+this.cellStyle, this.iconCell);
}
else
{
vg.html.removeStyle("vg-SelOneMenuIconCellOpenBottom", this.iconCell);
vg.html.removeStyle("vg-SelOneMenuIconCellOpenTop", this.iconCell);
vg.html.removeStyle(this.cellStyle, this.iconCell);
vg.html.removeStyle(this.menuStyle, this.iconCell);
vg.html.addStyle("vg-SelOneMenuIconCell", this.iconCell);
}
}
VgSelectOneMenu.prototype._compareMenuWidths=function()
{
var compareMenuWidths=0;
var menuWidth=vg.html.getObjWidth(this.contDiv);
var dropDownMenuWidth=(this.menuwidth)?this.menuwidth.replace("px",""):vg.html.getObjWidth(this.menu);
menuWidth=parseInt(menuWidth);
dropDownMenuWidth=parseInt(dropDownMenuWidth);
if(dropDownMenuWidth < menuWidth)
{
compareMenuWidths=-1;
}
else if(dropDownMenuWidth > menuWidth)
{
compareMenuWidths=1;
}
return compareMenuWidths;
}
VgSelectOneMenu.prototype._setTopBorderStyle=function()
{
vg.html.addStyle(this.menuStyle, this.mainNode );
if(this._compareMenuWidths() <=0)
{
vg.html.addStyle(this.cellStyle, this.menu);
vg.html.addStyle(this.menuStyle, this.iconCell);
}
vg.html.addStyle('vg-SelOneMenuDropUpwards', this.borderDiv );
}
VgSelectOneMenu.prototype._setBottomBorderStyle=function()
{
if(this._compareMenuWidths() <=0)
{
vg.html.addStyle(this.menuStyle, this.menu);
vg.html.addStyle(this.cellStyle, this.iconCell);
}
vg.html.addStyle(this.cellStyle, this.mainNode );
vg.html.addStyle("vg-SelOneMenuDropDownwards", this.borderDiv);
}
VgSelectOneMenu.prototype._handleHover=function()
{
vg.html.addStyle('vg-SelOneMenuHover', this.contDiv );
var isMediaQuerySizeLessThanLarge=cbdcommon.screen.isMediaQuerySize("s,m"),
textWidth=vg.html.getObjWidth(this.textNode),
animTime=9,
width=isMediaQuerySizeLessThanLarge?vg.html.getObjClientWidth(this.mainNode):vg.html.getObjWidth(this.textCont),
dur,
THIS=this,
attributes,
triggerWidth=0;
if(isMediaQuerySizeLessThanLarge)
{
textContWidth=vg.html.getObjWidth(this.textCont);
this.textCont.style.width=textContWidth+"px";
this.textNode.style.position="static";
textWidth=vg.html.getObjWidth(this.textNode);
this.textCont.style.width="";
}
this.textNode.style.position=isMediaQuerySizeLessThanLarge?"absolute":"static";
clearTimeout(this.scrollBackAnimationTimeOut);
if((this.fixedLabelAutoMenu||this.enableAnim||isMediaQuerySizeLessThanLarge)&&width < textWidth)
{
this.diff=width - textWidth;
dur=(animTime*this.diff)*-1;
this.scrollForwardAnimationTimeOut=setTimeout(
function()
{
attributes={left:{from:0, to:THIS.diff}};
if(isMediaQuerySizeLessThanLarge)
{
THIS.textNode.style.position='absolute';
}
else
{
THIS.textNode.style.position='relative';
}
THIS.animHover=vg.smil.animateElement({target:THIS.textNode, attr:attributes, duration:dur, disableGeoChangedEvent:true});
}, 300
);
}
};
VgSelectOneMenu.prototype._setLabelValue=function(txt, maxlen, elipse)
{
this.textNode.innerHTML=txt;
}
VgSelectOneMenu.prototype._mouseout=function(e)
{
vg.html.removeStyle('vg-SelOneMenuHover', this.contDiv );
clearTimeout(this.scrollForwardAnimationTimeOut);
var THIS=this;
this.scrollBackAnimationTimeOut=setTimeout(function()
{
if(THIS.animHover)
{
THIS.animHover.stop();
}
if(THIS.textNode.style.left.replace("px","") < 0)
{
var attributes={left:{from:THIS.diff, to:0}};
vg.smil.animateElement({target:THIS.textNode, attr:attributes, duration:150, disableGeoChangedEvent:true});
}
}, 100);
}


SliderTab=function(id)
{
this.base=vg.Controller;
this.base(id, document.getElementById(id));
this.items=new Array();
this.selectedIndex;
var deck=vg.html.getElements(this.viewNode,{tagName:'div', attrName:'selectedcardidx'})[0];
this.deckId=deck.getAttribute('id');
this.animSpeed=300;
this.indicatorCloneOffset=(ie)?2:0;
}
SliderTabItem=function(id, selected)
{
this.base=vg.Controller;
this.base(id, document.getElementById(id));
this.parent=this.viewNode.parentNode.parentNode.parentNode;
this.selected=selected;
var parentController=vg.comp.getController(this.parent);
this.index=parentController.items.length;
parentController.items[this.index]=this;
if(this.selected)
{
parentController.selectedIndex=this.index;
}
var item=this;
this.indicator=this._getIndicator();
this.link=this._getLink();
if(parentController.indicatorClone==null)
{
parentController.indicatorClone=this.indicator.cloneNode(true);
parentController.indicatorClone.style.position='absolute';
document.body.appendChild(parentController.indicatorClone);
vg.html.setLeft(parentController.indicatorClone, -1000);
}
vg.html.addEventListener(this.link, 'click', function(e){parentController.select(e)});
}
SliderTabItem.prototype=
{
_getIndicator:function()
{
var node=this.viewNode;
return vg.html.getElements(this.viewNode,{tagName:'img', attrName:'class'}, function(node){return vg.html.hasStyle('slidertab-arrow', node)})[0];
},
_getLink:function()
{
return this.viewNode.getElementsByTagName('a')[0];
}
}
SliderTab.prototype=
{
select:function(e)
{
var clickedItem=vg.comp.findController(jsCBDgetEventNode(e));
var sliderTabContr=vg.comp.getController(clickedItem.parent);
if(clickedItem.index==sliderTabContr.selectedIndex)
{
return;
}
this._slideIndicator(clickedItem, sliderTabContr);
clickedItem.selected=true;
sliderTabContr.selectedIndex=clickedItem.index;
jsCBDselectDeckCard(sliderTabContr.deckId, clickedItem.index);
},
_slideIndicator:function(clickedItem, sliderTabContr)
{
vg.html.addStyle('selected', clickedItem.viewNode);
vg.html.removeStyle('selected', sliderTabContr.items[sliderTabContr.selectedIndex]);
var currIndicator=sliderTabContr.items[sliderTabContr.selectedIndex].indicator;
var newIndicator=clickedItem.indicator;
var afterAnim=function()
{
if(sliderTabContr.selectedIndex==clickedItem.index)
{
vg.html.removeStyle('slidertab-hidden', newIndicator);
jsCBDtoggleElement(sliderTabContr.indicatorClone, false);
}
}
vg.html.addStyle('slidertab-hidden', currIndicator);
var attributes={
points:{
from:[vg.html.getObjX(currIndicator), vg.html.getObjY(currIndicator)+sliderTabContr.indicatorCloneOffset],
to:[vg.html.getObjX(newIndicator), vg.html.getObjY(newIndicator)+sliderTabContr.indicatorCloneOffset]
}
};
vg.html.setLeft(sliderTabContr.indicatorClone, -1000);
jsCBDtoggleElement(sliderTabContr.indicatorClone, true);
vg.smil.animateElement({target:sliderTabContr.indicatorClone, attr:attributes, duration:sliderTabContr.animSpeed, funcFinished:afterAnim, motionAnimation:true});
}
}


vg.SelectListComp=function(id, opt)
{
this.base=vg.Controller;
this.base(id, null);
this.items=new Array();
this.selectedIndex;
this.sourceList=document.getElementById(id+vg.SelectListComp.CBD_SOURCE_LIST );
this.selectedList=document.getElementById(id+vg.SelectListComp.CBD_SELECTED_LIST);
this.addButton=vg.html.getElement(id+vg.SelectListComp.CBD_SELECTLIST_ADD);
this.addAllButton=vg.html.getElement(id+vg.SelectListComp.CBD_SELECTLIST_ADD_ALL);
this.removeButton=vg.html.getElement(id+vg.SelectListComp.CBD_SELECTLIST_REMOVE);
this.removeAllButton=vg.html.getElement(id+vg.SelectListComp.CBD_SELECTLIST_REMOVE_ALL);
vg.util.attachJsonOptions(this, opt );
this.expandable=(this.selectedList.style.width=="100%" );
this.hscroll=(this.selectedList.style.overflow=='visible');
this.size=this.sourceList.size;
var controller=this;
vg.html.addEventListener(this.addButton, 'click', function(e){controller.add(e);});
vg.html.addEventListener(this.removeButton, 'click', function(e){controller.remove(e);});
if(this.addAllButton)
vg.html.addEventListener(this.addAllButton, 'click', function(e){controller.addAll(e);});
if(this.removeAllButton)
vg.html.addEventListener(this.removeAllButton, 'click', function(e){controller.removeAll(e);});
}
vg.SelectListComp.pad="pad";
vg.SelectListComp.CBD_SOURCE_LIST="SourceList";
vg.SelectListComp.CBD_SELECTED_LIST="SelectedList";
vg.SelectListComp.CBD_SELECTLIST_ADD="SelectListAdd";
vg.SelectListComp.CBD_SELECTLIST_ADD_ALL="SelectListAddAll";
vg.SelectListComp.CBD_SELECTLIST_REMOVE="SelectListRemove";
vg.SelectListComp.CBD_SELECTLIST_REMOVE_ALL="SelectListRemoveAll";
var pad=vg.SelectListComp.pad;
var CBD_SOURCE_LIST=vg.SelectListComp.CBD_SOURCE_LIST;
var CBD_SELECTED_LIST=vg.SelectListComp.CBD_SELECTED_LIST;
var CBD_SELECTLIST_ADD=vg.SelectListComp.CBD_SELECTLIST_ADD;
var CBD_SELECTLIST_ADD_ALL=vg.SelectListComp.CBD_SELECTLIST_ADD_ALL;
var CBD_SELECTLIST_REMOVE=vg.SelectListComp.CBD_SELECTLIST_REMOVE;
var CBD_SELECTLIST_REMOVE_ALL=vg.SelectListComp.CBD_SELECTLIST_REMOVE_ALL;
vg.SelectListComp.prototype=
{
adjustWidthForBoxes:function()
{
if((this.hscroll==true)&&this.sourceList&&this.sourceList.style )
{
this.adjustSelectDiv(this.sourceList);
this.adjustSelectDiv(this.selectedList);
}
},
adjustSelectDiv:function(selectElement)
{
var divtag=vg.html.findAncestor(selectElement,{tagName:'div'});
selectElement.style.width="100%";
var tempwidth=divtag.offsetWidth;
var tempheight=divtag.offsetHeight;
divtag.style.height=tempheight+'px';
selectElement.style.width="";
if(selectElement.offsetWidth < tempwidth)
{
divtag.style.width="100%";
selectElement.style.width="100%";
divtag.style.margin="0px";
divtag.style.padding="0px";
}
else
{
divtag.style.width=tempwidth+'px';
selectElement.style.width="";
}
var listsize=_jsCBDgetListLength(selectElement );
if(this.size <=listsize ) selectElement.size=listsize;
},
add:function(e)
{
if(vg.button._isDisabled(this.addButton ))
{
return;
}
for(var i=0;i < this.sourceList.length;i++)
{
if(this.sourceList.options[i].selected)
{
var added=this.addOneOption(i, this.onAddFormat, this.onAddValidate);
if(added) i--;
}
}
this.adjustWidth(this.selectedList);
if(this.onAdd!=null)
{
eval(this.onAdd);
}
},
addAll:function(e )
{
if(vg.button._isDisabled(this.addAllButton ))
{
return;
}
for(var i=0;i < this.sourceList.length;i++)
{
var added=this.addOneOption(i, this.onAddFormat, this.onAddValidate);
if(added) i--;
}
this.adjustWidth(this.selectedList);
if(this.onAdd!=null)
{
eval(this.onAdd);
}
},
addOneOption:function(idx,onAddFormat,onAddValidate)
{
var selectedListLength=_jsCBDgetListLength(this.selectedList );
if(selectedListLength >=this.maxSelected||(!this.validate(onAddValidate, this.sourceList.options[idx])))
{
return false;
}
var selectedText=this.sourceList.options[idx].text;
selectedText=(!isEmpty(onAddFormat))?onAddFormat(selectedText):selectedText;
if(this.sourceList.options[idx].value=="pad") return false;
var itemRemovedFromSource=false;
if(!this.checkDup(this.selectedList, selectedText))
{
this.addOptionToSelectedList(this.sourceList.options[idx], selectedText);
if(this.moveItems)
{
this.removeOption(this.sourceList,idx);
itemRemovedFromSource=true;
}
this.disableButton(this.removeButton, false);
this.disableButton(this.removeAllButton, false);
if(_jsCBDgetListLength(this.selectedList)==this.maxSelected||_jsCBDgetListLength(this.sourceList)==0)
{
this.disableButton(this.addButton, true);
this.disableButton(this.addAllButton, true);
}
}
return itemRemovedFromSource;
},
addOptionToSelectedList:function(sourceOption,selectedText)
{
var idToSet=sourceOption.getAttribute("id");
if(!this.moveItems)
{
idToSet+="_selected";
}
var i=this._findInsertPoint(this.selectedList.options,selectedText);
this.selectedList.options.add(new Option(selectedText, sourceOption.value, false, false),i);
this.selectedList.options[i].setAttribute("id",idToSet);
_jsCBDremovePadder(this.selectedList );
},
disableButton:function(button, state)
{
if(button!=null)
{
var form=_cbdGetParentForm(button);
var formId=(form!=null?form.getAttribute("id"):"");
jsCBDdisableInputById(formId, button.id, state);
}
},
validate:function(onValidate, option)
{
var valid=(!isEmpty(onValidate))?eval(onValidate)(option.value):true;
return valid;
},
checkDup:function(list, entry)
{
for(var j=0;j < list.length;j++)
{
if(entry==list.options[j].text)
{
return true;
}
}
return false;
},
removeOption:function(list, idx)
{
list.options[idx]=null;
if(list.length==0)
{
list.options[0]=new Option("                         ", "pad", false, false);
}
},
adjustWidth:function(list)
{
if((list.length <=1)&&list.style&&!this.expandable )
{
list.style.width="";
}
if(this.hscroll==true) this.adjustWidthForBoxes();
},
removeOneOption:function()
{
},
remove:function(e)
{
if(vg.button._isDisabled(this.removeButton ))
{
return;
}
var isValid=true;
for(var i=this.selectedList.length-1;i>=0;i-- )
{
if(!isEmpty(this.onRemoveValidate))
{
if(this.selectedList.options[i].selected)
{
isValid=eval(this.onRemoveValidate)(this.selectedList.options[i].value);
}
}
if(!isValid)
{
continue;
}
if(this.selectedList.options[i].selected)
{
if(this.moveItems)
{
if(this.sourceList.length > 0&&this.sourceList.options[0].value=="pad" )
{
this.sourceList.options[0]=null;
}
var j=this._findInsertPoint(this.sourceList.options,this.selectedList.options[i].text);
this.sourceList.options.add(new Option(this.selectedList.options[i].text, this.selectedList.options[i].value, false, false), j);
this.sourceList.options[j].setAttribute("id",this.selectedList.options[i].getAttribute("id"));
}
this.selectedList.options[i]=null;
}
}
if(_jsCBDgetListLength(this.sourceList)!=0&&_jsCBDgetListLength(this.selectedList) < this.maxSelected )
{
this.disableButton(this.addButton, false);
this.disableButton(this.addAllButton, false);
}
if(_jsCBDgetListLength(this.selectedList)==0 )
{
this.disableButton(this.removeButton, true);
this.disableButton(this.removeAllButton, true);
if(this.selectedList.style&&!this.expandable )
{
this.selectedList.style.width="100px";
}
}
this.adjustWidth(this.selectedList);
if(this.onRemove!=null)
{
eval(this.onRemove);
}
},
_findInsertPoint:function(list,item)
{
var j=this.keepSorted?0:list.length;
for(;j<list.length;j++)
{
if(item<list[j].text)
{
break;
}
}
return j;
},
removeAll:function(e)
{
if(vg.button._isDisabled(this.removeAllButton ))
{
return;
}
var i;
var isValid=true;
for(i=this.selectedList.length-1;i>=0;i-- )
{
if(!isEmpty(this.onRemoveValidate))
{
isValid=eval(this.onRemoveValidate)(this.selectedList.options[i].value);
}
if(!isValid)
{
continue;
}
if(this.moveItems)
{
if(this.sourceList.length > 0&&this.sourceList.options[0].value=="pad" )
{
this.sourceList.options[0]=null;
}
var j=this._findInsertPoint(this.sourceList.options,this.selectedList.options[i].text);
this.sourceList.options.add(new Option(this.selectedList.options[i].text, this.selectedList.options[i].value, false, false), j);
this.sourceList.options[j].setAttribute("id",this.selectedList.options[i].getAttribute("id"));
}
this.selectedList.options[i]=null;
}
if(_jsCBDgetListLength(this.selectedList) < this.maxSelected )
{
this.disableButton(this.addButton, false);
this.disableButton(this.addAllButton, false);
}
if(_jsCBDgetListLength(this.selectedList)==0 )
{
this.disableButton(this.removeButton, true);
this.disableButton(this.removeAllButton, true);
if(this.selectedList.style&&!this.expandable )
{
this.selectedList.style.width="100px";
}
}
this.adjustWidth(this.selectedList);
if(this.onRemove!=null)
{
eval(this.onRemove);
}
}
}
function jsCBDsubmitSelectedList(selectedList, sourceList )
{
_cbdSubmitSelectedList(selectedList, sourceList);
}
function jsCBDgetSelectListValues(id)
{
var selectedListID=id+vg.SelectListComp.CBD_SELECTED_LIST;
return _cbdGetSelectListValues(selectedListID, false);
}
function jsCBDSelectListSetOptionAsSelected(compId, listType, position, state)
{
var selectList=document.getElementById(compId+listType);
if(selectList!=null )
{
for(var i=0;i < selectList.length;i++)
{
if(i==position )
{
selectList.options[i].selected=state;
}
}
}
}
function _jsCBDgetListLength(list )
{
if(list.length==0 )
{
return 0;
}
return list.options[0].value==vg.SelectListComp.pad?0:list.length;
}
function _jsCBDremovePadder(selectedList )
{
var i;
for(i=selectedList.length-1;i >=0;i-- )
{
if(selectedList.options[i].value==vg.SelectListComp.pad)
{
selectedList.options[i]=null;
}
}
}
function _cbdSubmitSelectedList(selectedList, sourceList)
{
var i;
_jsCBDremovePadder(selectedList );
if(selectedList!=null )
{
for(i=selectedList.length-1;i >=0;i-- )
{
if(selectedList.options[i].value!=vg.SelectListComp.pad )
{
selectedList.options[i].selected=true;
}
}
}
if(sourceList!=null )
{
for(i=0;i < sourceList.length;i++)
{
if(sourceList.options[i].selected==true )
{
sourceList.options[i].selected=false;
}
}
}
}
function _cbdPrepareSelectListForSubmission(selectListId)
{
var selectedList=document.getElementById(selectListId+vg.SelectListComp.CBD_SELECTED_LIST);
var sourceList=document.getElementById(selectListId+vg.SelectListComp.CBD_SOURCE_LIST);
if(selectedList!=null&&sourceList!=null)
{
jsCBDsubmitSelectedList(selectedList, sourceList );
}
}
function _cbdClearSelectList(selectListCompId)
{
var selectedList=document.getElementById(selectListCompId+vg.SelectListComp.CBD_SELECTED_LIST);
if(selectedList!=null)
{
for(var i=0;i < selectedList.length;i++)
{
if(selectedList.options[i].selected==true )
{
selectedList.options[i].selected=false;
}
}
}
}
function _getListItemsNoPad(list)
{
var itmList=new Array();
if(list!=null)
{
var length=list.length;
for(var i=0;i < length;i++)
{
if(list.options[i].value!=vg.SelectListComp.pad )
{
itmList[i]=list.options[i];
}
}
}
return itmList;
}


function jsCBDmatchEndCalToStartCal(startCalId)
{
"use strict";
var vgCompNS=vg.comp,
startCont=vgCompNS.getController(document.getElementById(startCalId)),
startContMonth=startCont.month,
startContYear=startCont.year,
endCont=vgCompNS.getController(document.getElementById(startCont.attachedCalendarId)),
endContId=endCont.id,
dateObj=new Date(startContYear, startContMonth),
element=document.getElementById("comp-"+endContId);
endCont._updateMonthAndYearPullDowns(startContMonth, startContYear );
endCont._updateCalendar(dateObj, element );
}
function jsCBDenableRangeOkButton(elemId, buttonId)
{
"use strict";
var vgCompNS=vg.comp,
rangeCalOne=vgCompNS.getController(document.getElementById(elemId)),
rangeCalTwo=vgCompNS.getController(document.getElementById(rangeCalOne.attachedCalendarId));
if(rangeCalOne.selectedDate!==null&&rangeCalTwo.selectedDate!==null)
{
jsCBDdisableInput(document.getElementById(buttonId), false);
}
}
function jsCBDSendDateToInput(targetId, elemId)
{
var controller=vg.comp.getController(document.getElementById(elemId)),
target=document.getElementById(targetId),
month=parseInt(jsCBDgetSelectedMonth(elemId), 10)+1+"",
day=jsCBDgetSelectedDay(elemId)+"",
year=jsCBDgetSelectedYear(elemId),
onChangeJs;
if(month.length==1)
{
month="0"+month;
}
if(day.length==1)
{
day="0"+day;
}
vg.html.replaceClass(target, cbd.gh.ASINPUT_NOFOCUS_CLASS, cbd.gh.ASINPUT_FOCUS_CLASS);
target.value=month+"/"+day+"/"+year;
if(controller.layer)
{
onChangeJs=target.onchange;
if(onChangeJs!=null&&onChangeJs!=undefined)
{
onChangeJs();
}
}
vg.validation.procErr(target);
}
function jsCBDselectDate(target, id)
{
var controller=vg.comp.getController(document.getElementById(id)),
day=parseInt(target.innerHTML, 10),
month=controller._getMonthDropdownValue(),
year=controller._getYearDropdownValue(),
element,
tbody,
anchorNode,
i,
j;
if(!isNaN(day ) )
{
controller._setSelectedDateVariables(month, day, year);
day=controller.day;
month=controller.month;
year=controller.year;
controller._setDropdownInputValues(month, day, year);
element=controller.monthPullDown;
while(element.tagName!="TBODY")
{
element=element.parentNode;
}
tbody=element;
for(i=2;i < element.childNodes.length;i++)
{
for(j=0;j < 7;j++)
{
controller._removeSelectedStyle(element.childNodes[i].childNodes[j]);
}
}
controller._setSelectedStyle(year, month, day, target.parentNode);
anchorNode=target.parentNode.firstChild;
controller._addOnclickToPrevSel(anchorNode.id);
controller.prevSelected=anchorNode;
if(anchorNode.onclick)
{
anchorNode.onclick=null;
}
this.allowReselect=false;
target.blur();
}
}
function jsCBDgetSelectedMonth(id)
{
"use strict";
var controller=vg.comp.getController(document.getElementById(id));
return controller.selectedDate.getMonth();
}
function jsCBDgetSelectedYear(id)
{
"use strict";
var controller=vg.comp.getController(document.getElementById(id));
return controller.selectedDate.getFullYear();
}
function jsCBDgetSelectedDay(id)
{
"use strict";
var controller=vg.comp.getController(document.getElementById(id));
return controller.selectedDate.getDate();
}
function jsCBDresetCal(month, year, id)
{
"use strict";
var dateObj=new Date(year, month),
calElem=document.getElementById(id),
controller=vg.comp.getController(calElem);
controller._updateCalendar(dateObj, calElem);
}
function jsCBDsetToCalendarLinkValue(id)
{
var controller=vg.comp.getController(document.getElementById(id+"_layerCal")),
dateObj=controller._pickDateObj(id),
dateInput=document.getElementById(id+"_layerCal_dateInput"),
selDateInput=document.getElementById(id+"_layerCal_selDateInput");
if(dateObj)
{
dateInput.value=dateObj.getDate();
selDateInput.value=dateObj.getDate()+"/"+dateObj.getMonth()+"/"+dateObj.getFullYear();
controller.selectedDate=dateObj;
controller._updateCalendar(dateObj, document.getElementById(id+"_layerCal"));
controller.allowReselect=true;
controller._addOnclickToPrevSel(null);
}
}
function jsCBDcreateCalendarCont(id)
{
"use strict";
var calendarComp=vg.html.getElement(vg.constants.COMP_ID_PFX+id),
calendarViewNode=vg.comp.getController(vg.html.getElement(id)).viewNode,
calendarOpenLayerController=cbdcommon.string.isEmpty(vg.Calendar.OPEN_LAYER_ID)?null:vg.comp.getController(vg.html.getElement(vg.Calendar.OPEN_LAYER_ID)),
prevCalViewNode=null,
calendarContainerId=vg.Calendar.CALENDAR_CONTAINER,
calendarContainer=document.getElementById(calendarContainerId),
cssContainer=null,
loopIndex=0,
calendarContainerChildren=null,
numOfCalendarContainerChildren=0,
calendarContainerChild=null,
associatedParentId="",
hasFoundCalendarContainerCompChild=false;
prevCalViewNode=cbdcommon.string.isEmpty(calendarOpenLayerController)?null:calendarOpenLayerController.viewNode;
if(!calendarContainer )
{
calendarContainer=document.createElement('div');
calendarContainer.setAttribute("id", calendarContainerId);
cssContainer=vg.html._cbdGetCSSContainer(calendarComp);
cssContainer.appendChild(calendarContainer);
}
if(prevCalViewNode )
{
prevCalViewNode.style.left=prevCalViewNode.style.top=vg.Calendar.positionReset;
}
associatedParentId=id.substring(0, id.indexOf("_layerCal"));
calendarViewNode.setAttribute("associatedParentId", associatedParentId);
calendarContainerChildren=calendarContainer.childNodes;
numOfCalendarContainerChildren=calendarContainerChildren.length;
for(loopIndex=0;loopIndex < numOfCalendarContainerChildren;loopIndex++)
{
calendarContainerChild=calendarContainerChildren[loopIndex];
hasFoundCalendarContainerCompChild=(vg.constants.COMP_ID_PFX+id)===calendarContainerChild.getAttribute('id');
if(hasFoundCalendarContainerCompChild )
{
break;
}
}
if(hasFoundCalendarContainerCompChild )
{
calendarContainer.removeChild(calendarContainerChild);
}
calendarContainer.appendChild(calendarComp);
calendarViewNode.style.zIndex="999";
vg.Calendar.OPEN_LAYER_ID=id;
}
function jsCBDupdateZindex(id)
{
var maxZ=200,
i;
if(window.openLayers)
{
for(i=0;i < window.openLayers.length;i++)
{
if(window.openLayers[i].zindex > maxZ )
{
maxZ=window.openLayers[i].zindex
}
}
}
document.getElementById(id).style.zIndex=maxZ+10;
}
vg.Calendar=function(options)
{
var vgCalendarNS=vg.Calendar,
calendarId,
calendarSize,
cal,
dateCodes;
this.id=this._getParam(options['id'],'false');
calendarId=this.id;
monthDropdownId=calendarId+vgCalendarNS.MONTH_INPUT_SUFFIX;
yearDropdownId=calendarId+vgCalendarNS.YEAR_INPUT_SUFFIX;
this.base=vg.Controller;
this.base(calendarId, null);
this.todayDate=this._stringToDateObj(this._getParam(options['today'],null));
this.size=this._getParam(options['size'], 'big');
calendarSize=this.size;
this.isSizeSml=(calendarSize==="small" );
this.isSizeBig=(calendarSize==="big" );
this.isSizeXL=(calendarSize==="xl" );
this.satSel=this._getParam(options['satSel'], 'false');
this.sunSel=this._getParam(options['sunSel'], 'false');
cal=this.todayDate||new Date();
this.day=this._getParam(options['day'], cal.getDate());
this.month=this._getParam(options['month'], cal.getMonth());
this.year=this._getParam(options['year'], cal.getFullYear());
this.defaultYear=this._getParam(options['year'], null);
this.defaultMonth=this._getParam(options['month'], null);
this.defaultDay=this._getParam(options['day'], null);
this.monthYearControls=this._getParam(options['monthYearControls'], 'true');
this.callbackJs=this._getParam(options['callbackJs'], "");
this.dateCodes=this._getParam(options['codedDates'], new Array());
dateCodes=this.dateCodes;
this.dateDescriptors=this._getParam(options['dateDescriptors'], null);
this.startDay=this._getParam(options['startDay'], null);
this.endDay=this._getParam(options['endDay'], null);
this.shadow=this._getParam(options['shadow'], null);
this.layer=this._getParam(options['layer'], null);
this.viewOnly=this._getParam(options['viewOnly'], 'false');
this.blockedFullDates=this._importBlockedFullDates(this._getParam(options['blockedFullDates'], ""));
this.allowReselect=false;
this.prevSelected;
this.initMonth=this.month;
this.initYear=this.year;
this.todayLink=document.getElementById(calendarId+"_todayLink" );
if(this.day!=null&&this.month!=null&&this.year!=null)
{
this.selectedDate=new Date(this.year, this.month, this.day);
}
else
{
this.selectedDate=null;
}
this.attachedCalendarId=this._getParam(options['attachedCalId'],null);
this.blocked=dateCodes.BLOCKED;
this.credit=dateCodes.CREDIT;
this.debit=dateCodes.DEBIT;
this.exchange=dateCodes.EXCHANGE;
this.skip=dateCodes.SKIP;
this.monthPullDown=document.getElementById(monthDropdownId);
this.monthPullDown.id=monthDropdownId;
this.yearPullDown=document.getElementById(yearDropdownId);
this.yearPullDown.id=yearDropdownId;
this.toggleArrowVisibility=!cbd.page.isNextGen;
this.toggleArrowLeft=document.getElementById(calendarId+"_leftArrow");
this.toggleArrowRight=document.getElementById(calendarId+"_rightArrow");
this.defaultDayOnChange=this._getParam(options['defaultDayOnChange'], 0);
this._initCalendar(this.month, this.year);
if(this.layer)
{
jsCBDcreateCalendarCont(calendarId);
}
};
vg.Calendar.CALENDAR_CONTAINER=CALENDAR_CONTAINER='CALENDAR_CONTAINER';
vg.Calendar.months=months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
vg.Calendar.weekdays=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
vg.Calendar.MONTH_INPUT_SUFFIX="_monthInput";
vg.Calendar.YEAR_INPUT_SUFFIX="_yearInput";
vg.Calendar.PREVIOUS="previous";
vg.Calendar.NEXT="next";
vg.Calendar.OPEN_LAYER_ID="";
vg.Calendar.positionReset="-9000px";
vg.Calendar.CALENDAR_LAYER_ID="_layerCal";
vg.Calendar.prototype=
{
_initCalendar:function()
{
var dateObj,
element=document.getElementById(vg.constants.COMP_ID_PFX+this.id),
isNG=cbd.page.isNextGen,
vgHtmlNS=vg.html,
startDay=this.startDay,
endDay=this.endDay;
if(this.layer)
{
vgHtmlNS.addEventListenerMethod(document.body, 'click', this, '_processCalendarClick', this.id+'_close');
this.baseId=this.id.substring(0, this.id.indexOf("_layerCal"));
this.calendarLinkId=this.baseId+(isNG?"_link":"_img");
}
else
{
vgHtmlNS.addEventListenerMethod(element, 'click', this, '_processCalendarClick', this.id+'_processClick');
}
vgHtmlNS.addEventListenerMethod(window, vg.event.BROWSER_RESIZE_END, this, '_repositionOpenLayer', 'Calendar_repositionOpenLayer');
vgHtmlNS.addEventListener(document.body, "touchstart" , function(event){vg.Calendar.closeCalendar(jsCBDgetEventNode(event), event.type );}, "CALENDAR_DOWNSTART" );
if(isNG )
{
if(startDay )
{
this.startDayObj=this._stringToDateObj(startDay );
}
if(endDay )
{
this.endDayObj=this._stringToDateObj(endDay );
}
dateObj=this._pickDateObj(this.id);
}
else
{
if(startDay!==null&&endDay!==null )
{
this.startDayObj=this._stringToDateObj(startDay );
this.endDayObj=this._stringToDateObj(endDay );
}
dateObj=new Date(this.year, this.month);
}
if(isNG&&this.isSizeXL )
{
vgHtmlNS.addEventListenerMethod(this.todayLink, 'click', this, '_processTodayLinkClick', this.id+'_todayLinkClick');
}
this._updateCalendar(dateObj, element);
},
_pickDateObj:function(id)
{
var input=document.getElementById(id),
inpVal=null,
isDateInputComp=input.value,
dateObj=null;
if(isDateInputComp&&input.value!="")
{
inpVal=this._stringToDateObj(input.value);
}
if(inpVal)
{
dateObj=this._checkRange(inpVal);
}
else if(this.defaultYear&&!isNaN(this.defaultMonth))
{
dateObj=this._checkRange(new Date(this.defaultYear, this.defaultMonth, this.defaultDay));
}
else if(this.todayDate)
{
dateObj=this._checkRange(this.todayDate);
}
else
{
dateObj=this._checkRange(new Date());
}
if(cbd.page.isNextGen)
{
this._setSelectedDateVariables(dateObj.getMonth(), dateObj.getDate(), dateObj.getFullYear());
}
return dateObj;
},
_checkRange:function(dateObj)
{
if(cbd.page.isNextGen&&dateObj)
{
if(this.startDayObj&&_isBefore(this.startDayObj, dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()))
{
return this.startDayObj;
}
else if(this.endDayObj&&_isAfter(this.endDayObj, dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()))
{
return this.endDayObj;
}
}
return dateObj;
},
_updateCalendar:function(dateObj, element)
{
"use strict";
var month=dateObj.getMonth(),
date=dateObj.getDate(),
year=dateObj.getFullYear();
this._toggleArrows(month, year);
if(!this.monthYearControls)
{
this._updateTitle(month, year, element);
}
this._updateMonthAndYearPullDowns(month, year);
this._updateDays(month, year, element, false);
},
_toggleArrows:function(month, year )
{
"use strict";
if(this.toggleArrowVisibility )
{
if(month===11&&!this._canGoToNextYear(year) )
{
this._hideNextArrow();
}
else
{
this._showNextArrow();
}
if(month===0&&!this._canGoToPrevYear(year) )
{
this._hidePrevArrow();
}
else
{
this._showPrevArrow();
}
}
},
_canGoToNextYear:function(year)
{
var endDay=this.endDayObj;
if(!endDay )
{
return true;
}
return!(endDay.getFullYear() <=year);
},
_canGoToPrevYear:function(year)
{
var startDay=this.startDayObj;
if(!startDay )
{
return true;
}
return!(startDay.getFullYear() >=year);
},
_hidePrevArrow:function()
{
"use strict";
var leftArrow=this.toggleArrowleft;
if(leftArrow )
{
leftArrow.style.visibility='hidden';
}
},
_showPrevArrow:function()
{
"use strict";
var leftArrow=this.toggleArrowleft;
if(leftArrow )
{
leftArrow.style.visibility='inherit';
}
},
_hideNextArrow:function()
{
"use strict";
var rightArrow=this.toggleArrowRight;
if(rightArrow )
{
rightArrow.style.visibility='hidden';
}
},
_showNextArrow:function()
{
"use strict";
var rightArrow=this.toggleArrowRight;
if(rightArrow )
{
rightArrow.style.visibility='inherit';
}
},
_updateTitle:function(month, year, element)
{
var i=0,
array=vg.html.getElements(element,{tagName:'div', attrName:'class', attrValue:'calTop'}),
elem,
calTop;
if(array.length==0)
{
elem=document.getElementById(element.id.replace('comp-',''));
array=vg.html.getElements(elem,{tagName:'div', attrName:'class', attrValue:'calTop'});
}
calTop=array[0];
while(i < calTop.childNodes.length&&calTop.childNodes[i].tagName!="SPAN")
{
i++;
}
calTop.childNodes[i].innerHTML=vg.Calendar.months[month]+" "+year;
},
_updateDays:function(month, year, element, firstTime)
{
var weeks=this._getWeeks(month, year),
FIRSTWEEK=0,
LASTWEEK=weeks.length - 1,
SUNDAY=0,
SATURDAY=6,
firstDayOfWeek=this._getFirstDayOfMonth(month, year),
isNG=cbd.page.isNextGen,
vgHtmlNS=vg.html,
prevMonthObj,
currentDay,
className,
numDaysInMonth,
numDaysInPrevMonth,
date,
otherDate,
weekNumber,
firstWeek,
lastWeek,
dayOfWeek,
blocked,
code;
if(month==0)
{
prevMonthObj=new Date(year -1, 11);
}
else
{
prevMonthObj=new Date(year, month - 1);
}
numDaysInMonth=this._getDaysInMonth(month, year);
numDaysInPrevMonth=this._getDaysInMonth(prevMonthObj.getMonth(), prevMonthObj.getYear());
date=numDaysInPrevMonth - firstDayOfWeek+1;
otherDate=false;
for(weekNumber=0;weekNumber < weeks.length;weekNumber++)
{
firstWeek=(weekNumber==FIRSTWEEK?true:false);
lastWeek=(weekNumber==LASTWEEK?true:false);
if((typeof cbd.page.isNextGen==='undefined'||!cbd.page.isNextGen)&&this.shadow&&lastWeek)
{
weeks[weekNumber].childNodes[0].className="calfacets calBotLftShdw";
}
else
{
for(dayOfWeek=0;dayOfWeek < 7;dayOfWeek++)
{
currentDay=weeks[weekNumber].childNodes[dayOfWeek];
vgHtmlNS.removeStyle(currentDay.className, currentDay);
className="";
if((firstWeek&&date > numDaysInPrevMonth)||(lastWeek&&date > numDaysInMonth)||(this.shadow&&weekNumber==weeks.length-2&&date > numDaysInMonth))
{
date=1;
}
otherDate=((date > 7&&firstWeek)||((lastWeek||(this.shadow&&weekNumber==weeks.length-2))&&date <(numDaysInMonth - 7))?true:false);
blocked=this._isBlocked(month, year, date, otherDate, dayOfWeek);
if((typeof isNG==='undefined'||!isNG)&&(lastWeek||(this.shadow&&weekNumber==weeks.length-2))&&(dayOfWeek==SUNDAY||dayOfWeek==SATURDAY))
{
if(dayOfWeek==SATURDAY)
{
if(otherDate )
{
vgHtmlNS.addStyle("otherdate", currentDay);
}
vgHtmlNS.addStyle("calfacets", currentDay);
className="calBotRgt";
if(this.shadow)
{
className+="Shdw";
if(weekNumber==weeks.length-2&&!blocked)
{
className+="Day";
}
}
}
else if(dayOfWeek==SUNDAY )
{
vgHtmlNS.addStyle("sun", currentDay);
vgHtmlNS.addStyle("calfacets", currentDay);
className="calBotLft";
}
if(blocked )
{
className+="Blocked blocked";
}
vgHtmlNS.addStyle(className, currentDay);
}
else
{
if(otherDate )
{
vgHtmlNS.addStyle("otherdate", currentDay);
}
if(dayOfWeek==SUNDAY )
{
vgHtmlNS.addStyle("sun", currentDay);
}
if(blocked )
{
vgHtmlNS.addStyle("blocked", currentDay);
}
}
code=this._getCode(month, year, date, otherDate);
if(!otherDate)
{
if(this.viewOnly===false)
{
this._setTodayStyle(year, month, date, currentDay);
this._setSelectedStyle(year, month, date, currentDay);
}
if(code!="")
{
vgHtmlNS.addStyle("special", currentDay);
}
}
if(!firstTime)
{
this._outputDate(currentDay, date, code, year, month);
}
this._updateCode(currentDay, code);
date++;
}
}
}
},
_setTodayStyle:function(year, month, date, currentDay)
{
var vgHtmlNS=vg.html,
today=this.todayDate;
if(today.getDate()==date&&today.getMonth()==month&&today.getFullYear()==year)
{
if(vgHtmlNS.hasStyle("calBotLft", currentDay))
{
vgHtmlNS.removeStyle("calBotLft", currentDay);
vgHtmlNS.addStyle("calBotLftToday", currentDay);
}
else if(vgHtmlNS.hasStyle("calBotRgt", currentDay))
{
vgHtmlNS.removeStyle("calBotRgt", currentDay);
vgHtmlNS.addStyle("calBotRgtToday", currentDay);
}
else if(vgHtmlNS.hasStyle("calBotRgtShdwDay", currentDay))
{
vgHtmlNS.removeStyle("calBotRgtShdwDay", currentDay);
vgHtmlNS.addStyle("calBotRgtShdwToday", currentDay);
}
else
{
vgHtmlNS.addStyle("today", currentDay);
}
}
},
_removeTodayStyle:function(currentDay)
{
var vgHtmlNS=vg.html;
if(vgHtmlNS.hasStyle("calBotLftToday", currentDay))
{
vgHtmlNS.removeStyle("calBotLftToday", currentDay);
vgHtmlNS.addStyle("calBotLft", currentDay);
}
else if(vgHtmlNS.hasStyle("calBotRgtToday", currentDay))
{
vgHtmlNS.removeStyle("calBotRgtToday", currentDay);
vgHtmlNS.addStyle("calBotRgt", currentDay);
}
else if(vgHtmlNS.hasStyle("calBotRgtShdwToday", currentDay))
{
vgHtmlNS.removeStyle("calBotRgtShdwToday", currentDay);
vgHtmlNS.addStyle("calBotRgtShdwDay", currentDay);
}
else
{
vgHtmlNS.removeStyle("today", currentDay);
}
},
_setSelectedDateVariables:function(selMonth, selDay, selYear)
{
"use strict";
this.month=selMonth;
this.day=selDay;
this.year=selYear;
},
_setSelectedStyle:function(year, month, date, currentDay)
{
if(this.day==date&&this.month==month&&this.year==year)
{
var vgHtmlNS=vg.html;
if(vgHtmlNS.hasStyle("calBotLft", currentDay))
{
vgHtmlNS.removeStyle("calBotLft", currentDay);
vgHtmlNS.addStyle("calBotLftSelected", currentDay);
}
else if(vgHtmlNS.hasStyle("calBotRgt", currentDay))
{
vgHtmlNS.removeStyle("calBotRgt", currentDay);
vgHtmlNS.addStyle("calBotRgtSelected", currentDay);
}
else if(vgHtmlNS.hasStyle("calBotRgtShdwDay", currentDay))
{
vgHtmlNS.removeStyle("calBotRgtShdwDay", currentDay);
vgHtmlNS.addStyle("calBotRgtShdwSelected", currentDay);
}
else
{
vgHtmlNS.addStyle("selected", currentDay);
}
}
},
_removeSelectedStyle:function(currentDay)
{
var vgHtmlNS=vg.html;
if(vgHtmlNS.hasStyle("calBotLftSelected", currentDay))
{
vgHtmlNS.removeStyle("calBotLftSelected", currentDay);
vgHtmlNS.addStyle("calBotLft", currentDay);
}
else if(vgHtmlNS.hasStyle("calBotRgtSelected", currentDay))
{
vgHtmlNS.removeStyle("calBotRgtSelected", currentDay);
vgHtmlNS.addStyle("calBotRgt", currentDay);
}
else if(vgHtmlNS.hasStyle("calBotRgtShdwSelected", currentDay))
{
vgHtmlNS.removeStyle("calBotRgtShdwSelected", currentDay);
vgHtmlNS.addStyle("calBotRgtShdwDay", currentDay);
}
else
{
vgHtmlNS.removeStyle("selected", currentDay);
}
},
_closeCalendarLayer:function()
{
"use strict";
if(this.layer)
{
var calId=this.id,
calendar=document.getElementById(calId),
isVisible=false,
calendarStyle;
if(calendar)
{
calendarStyle=calendar.style;
isVisible=calendarStyle.visibility==="visible";
if(isVisible)
{
jsCBDsetVisibility(calId, false);
calendarStyle.left=calendarStyle.top=vg.Calendar.positionReset;
}
vg.Calendar.OPEN_LAYER_ID="";
}
}
},
_parentComponentMatchThisComponent:function(eventNode)
{
var parentComponent=vg.html.findParentComponent(eventNode, vg.Calendar);
if(parentComponent)
{
return parentComponent.jsController===this;
}
return false;
},
_processTodayLinkClick:function(event)
{
"use strict";
var eventNode=jsCBDgetEventNode(event);
if(eventNode )
{
this._selectDay(new Date());
}
},
_selectDay:function(dateObject)
{
"use strict";
var month=dateObject.getMonth(),
day=dateObject.getDate(),
year=dateObject.getFullYear(),
calEl=document.getElementById(this.id);
this._updateMonthAndYearPullDowns(month, year);
this._setDropdownInputValues(month, day, year);
this._setSelectedDateVariables(month, day, year);
this._updateCalendar(dateObject, calEl);
eval(this.callbackJs);
},
_setDropdownInputValues:function(month, day, year)
{
"use strict";
var calendarId=this.id,
dateInput=document.getElementById(calendarId+"_dateInput"),
selectedDateInput=document.getElementById(calendarId+"_selDateInput"),
dateString=this._createDateString(month, day, year);
dateInput.value=day;
selectedDateInput.value=dateString;
this.selectedDate=this._stringToDateObj(dateString);
},
_createDateString:function(month, day, year)
{
"use strict";
var monthStr=(parseInt(month,10)+1 ),
dayStr=((day < 10)?"0":"" )+day,
dateString=monthStr+"/"+dayStr+"/"+year;
return dateString;
},
_processCalendarClick:function(event)
{
"use strict";
var eventNode=jsCBDgetEventNode(event),
parent=null,
date=0,
newNodeId="",
callbackFunction=null,
calendarId=this.id,
baseId=calendarId.substring(0, calendarId.indexOf("_layerCal")),
eventId=eventNode.id,
vgHtmlNS=vg.html,
vgCalendarNS=vg.Calendar,
direction;
if(eventNode)
{
parent=eventNode.parentNode;
if(parent&&vgHtmlNS.hasStyle("otherdate", parent))
{
if(this._parentComponentMatchThisComponent(eventNode))
{
date=parseInt(eventNode.innerHTML, 10);
if(date)
{
direction=(date < 8)?vgCalendarNS.NEXT:vgCalendarNS.PREVIOUS;
vgCalendarNS.navigateByMonth(calendarId, direction);
}
newNodeId=calendarId+"_"+date;
callbackFunction=new Function(this.callbackJs);
callbackFunction.apply(document.getElementById(newNodeId),[event]);
vgHtmlNS.stopEventPropagation(event);
}
}
if((eventId.indexOf(baseId) < 0)&&
(vgHtmlNS.findAncestor(eventNode,{tagName:'div', attrName:'id', attrValue:'CALENDAR_CONTAINER'})===null))
{
this._closeCalendarLayer(event);
}
}
},
_updateCode:function(currentDay, code)
{
var vgHtmlNS=vg.html;
if(!vgHtmlNS.hasStyle("otherdate", currentDay) )
{
if(!this.isSizeSml )
{
if(code=="E")
{
vgHtmlNS.addStyle("exchange", currentDay);
}
else if(code=="C")
{
vgHtmlNS.addStyle("credit", currentDay);
}
else if(code=="D")
{
vgHtmlNS.addStyle("debit", currentDay);
}
else if(code=="S")
{
vgHtmlNS.addStyle("skip", currentDay);
}
}
else
{
if(code=="C"||code=="D"||code=="E"||code=="S")
{
vgHtmlNS.addStyle("event", currentDay);
}
}
}
},
_outputDate:function(currentDay, date, code, year, month)
{
var isOtherDate=vg.html.hasStyle("otherdate", currentDay),
isSelectedDate=!isOtherDate&&this.day==date&&this.month==month&&this.year==year,
isNG=cbd.page.isNextGen,
bigSize=this.isSizeBig,
tempHTML,
id;
if(isOtherDate&&isNG&&!this.isSizeXL)
{
currentDay.innerHTML="";
}
else if(vg.html.hasStyle("blocked", currentDay))
{
currentDay.innerHTML=date+(bigSize?" "+code:"" );
}
else
{
if(this.viewOnly)
{
tempHTML="<a class='vo'>";
}
else
{
id=this.id+"_"+date;
if(isOtherDate)
{
id+='od';
}
tempHTML="<a href='javascript:void(0);' id='"+id+"' class='nvo' ";
if(!isOtherDate&&!(isSelectedDate&&!this.allowReselect))
{
tempHTML+="onclick=\""+this.callbackJs;
if(this.callbackJs.charAt(this.callbackJs.length - 1)!=';')
{
tempHTML+=";";
}
tempHTML+=" return false;\"";
}
tempHTML+=">";
}
tempHTML+=date;
if(!isNG&&bigSize)
{
tempHTML+=" "+code;
}
tempHTML+="</a>";
currentDay.innerHTML=tempHTML;
}
if(isSelectedDate)
{
this.prevSelected=currentDay.firstChild;
}
},
_getDaysInMonth:function(month, year)
{
var dd=new Date(year, month+1, 0);
return dd.getDate();
},
_getFirstDayOfMonth:function(month, year)
{
var firstDayObj=new Date(year, month, 1);
return firstDayObj.getDay();
},
_getWeeks:function(month, year)
{
'use strict';
var numWeeks=this._getNumWeeksInMonth(this._getDaysInMonth(month, year), this._getFirstDayOfMonth(month, year)),
element=this.monthPullDown,
tbody,
rows,
numRows=numWeeks+2,
shadowRow,
i,
weeks=[];
while(element.tagName!=="TBODY")
{
element=element.parentNode;
}
tbody=element;
rows=tbody.childNodes;
if(this.shadow)
{
shadowRow=tbody.removeChild(tbody.lastChild);
}
for(i=rows.length;i > numRows;i--)
{
tbody.removeChild(tbody.lastChild);
}
for(i=rows.length;i < numRows;i++)
{
tbody.appendChild(tbody.lastChild.cloneNode(true));
}
if(this.shadow)
{
tbody.appendChild(shadowRow);
numRows++;
}
for(i=2;i < numRows;i++)
{
weeks.push(rows[i]);
}
return weeks;
},
_getNumWeeksInMonth:function(daysInMonth, firstDayOfMonth)
{
if(daysInMonth==28&&firstDayOfMonth==0)
{
return 4;
}
if(firstDayOfMonth >=5&&daysInMonth==31||
firstDayOfMonth==6&&daysInMonth==30)
{
return 6;
}
return 5;
},
_isBlocked:function(month, year, day, otherDate, dayOfWeek)
{
var blocked,
blockedYear,
blockedMonth,
blockedDay,
i;
if(this.dateDescriptors)
{
blocked=this.dateDescriptors[month+'/'+day+'/'+year]=='BLOCKED';
if(blocked&&!(otherDate&&cbd.page.isNextGen&&this.isSizeXL ) )
{
return true;
}
}
if((dayOfWeek==0&&!this.sunSel)||(dayOfWeek==6&&!this.satSel))
{
return true;
}
if(otherDate)
{
if(day > 25)
{
month--;
}
else if(day < 7)
{
month++;
}
}
if(_isBefore(this.startDayObj, year, month, day+1)||_isAfter(this.endDayObj, year, month, day-1))
{
return true;
}
if(this.month==month&&this.year==year&&this.blocked!=null)
{
for(i=0;i < this.blocked.length;i++)
{
if(this.blocked[i]==day)
{
return true;
}
}
}
for(i=0;i < this.blockedFullDates.length;i++)
{
blockedYear=parseInt(this.blockedFullDates[i][2], 10);
blockedMonth=parseInt(this.blockedFullDates[i][0], 10) - 1;
blockedDay=parseInt(this.blockedFullDates[i][1], 10);
if(blockedYear==year&&blockedMonth==month&&blockedDay==day )
{
return true;
}
}
return false;
},
_stringToDateObj:function(dateString)
{
if(_isDate2(dateString))
{
var array=dateString.split("/");
return new Date(array[2],array[0]-1,array[1]);
}
else
{
return null;
}
},
_importBlockedFullDates:function(dates)
{
var blockedDatesArray=dates.split(","),
array=new Array(),
i;
for(i=0;i < blockedDatesArray.length;i++)
{
array[i]=blockedDatesArray[i].split("/");
}
return array;
},
_getCode:function(month, year, day, otherDate)
{
var code,
i;
if(otherDate)
{
if(day < 7)
{
month++;
if(month==12)
{
month=0;
year++;
}
}
else if(day > 22)
{
month--;
if(month < 0)
{
month=11;
year--;
}
}
}
if(this.dateDescriptors)
{
code=this.dateDescriptors[month+'/'+day+'/'+year];
if(code)
{
if(code=='EXCHANGE' )
{
return 'E';
}
else if(code=='DEBIT' )
{
return 'D';
}
else if(code=='CREDIT' )
{
return 'C';
}
else if(code=='SKIP' )
{
return 'S';
}
}
}
if(this.initMonth==month&&this.initYear==year)
{
if(this.credit!=null)
{
for(i=0;i < this.credit.length;i++)
{
if(this.credit[i]==day)
{
return "C";
}
}
}
if(this.debit!=null)
{
for(i=0;i < this.debit.length;i++)
{
if(this.debit[i]==day)
{
return "D";
}
}
}
if(this.exchange!=null)
{
for(i=0;i < this.exchange.length;i++)
{
if(this.exchange[i]==day)
{
return "E";
}
}
}
if(this.credit!=null)
{
for(i=0;i < this.skip.length;i++)
{
if(this.skip[i]==day)
{
return "S";
}
}
}
}
return "";
},
_getParam:function(valTest, valDefault)
{
if(valTest==null )
{
return valDefault;
}
return valTest;
},
_addOnclickToPrevSel:function(anchNdId)
{
if(this.prevSelected!=null&&
this.prevSelected.tagName=="A"&&
this.prevSelected.id!=anchNdId)
{
var THIS=this;
this.prevSelected.onclick=
function _cbdCalDateClick(event)
{
eval(THIS.callbackJs);
return false;
};
}
},
_repositionOpenLayer:function()
{
"use strict";
var vgHtmlNS=vg.html,
vgCalendarNS=vg.Calendar,
OPEN_LAYER_ID=vgCalendarNS.OPEN_LAYER_ID,
openLayer=vgHtmlNS.getElement(OPEN_LAYER_ID );
if(openLayer)
{
if(isVisible(OPEN_LAYER_ID ) )
{
vgHtmlNS.position(
openLayer,
vgHtmlNS.getElement(openLayer.getAttribute("associatedparentid")),
"bottomleft", false, false, "left"
);
}
else
{
openLayer.style.left=openLayer.style.top=vgCalendarNS.positionReset;
}
}
},
_setDropdownValue:function(dropdownId, newValue)
{
"use strict";
if(cbd.page.isNextGen )
{
vg.Menu._setValue(dropdownId, newValue);
}
else
{
jsCBDsetSelectOneMenuValue(dropdownId, newValue);
}
},
_getDropdownValue:function(dropdownId)
{
"use strict";
if(cbd.page.isNextGen )
{
return vg.Menu._getValue(dropdownId);
}
else
{
return jsCBDgetSelectOneMenuValue(dropdownId);
}
},
_getMonthDropdownValue:function()
{
"use strict";
return this._getDropdownValue(this.monthPullDown.id );
},
_setMonthDropdownValue:function(month)
{
"use strict";
this._setDropdownValue(this.monthPullDown.id, month );
},
_getYearDropdownValue:function()
{
"use strict";
return this._getDropdownValue(this.yearPullDown.id );
},
_setYearDropdownValue:function(year)
{
"use strict";
this._setDropdownValue(this.yearPullDown.id, year );
},
_updateMonthAndYearPullDowns:function(month, year )
{
"use strict";
this._setMonthDropdownValue(month );
this._setYearDropdownValue(year );
}
};
vg.Calendar.updateDate=function(id)
{
"use strict";
var element=document.getElementById(id),
controller=vg.comp.getController(element),
year=parseInt(controller._getYearDropdownValue(),10),
month=parseInt(controller._getMonthDropdownValue(),10),
day=controller.defaultDayOnChange,
updateDay=(day > 0 ),
dateObj=updateDay?new Date(year, month, day):new Date(year, month),
days;
if(updateDay )
{
if(dateObj.getMonth()!==month )
{
day -=dateObj.getDate();
dateObj=new Date(year, month, day);
}
controller._selectDay(dateObj);
}
else
{
controller._updateCalendar(dateObj, element);
}
};
vg.Calendar.navigateByMonth=function(id, direction)
{
"use strict";
var vgCalendarNS=vg.Calendar,
calendarElement=vg.html.getElement(id),
controller=vg.comp.getController(calendarElement),
currentMonth=parseInt(controller._getMonthDropdownValue(), 10),
currentYear=parseInt(controller._getYearDropdownValue(), 10),
newMonth=currentMonth,
newYear=currentYear;
if(direction===vgCalendarNS.PREVIOUS )
{
newMonth=currentMonth - 1;
if(newMonth===-1 )
{
newYear=currentYear - 1;
newMonth=11;
}
}
else if(direction===vgCalendarNS.NEXT )
{
newMonth=currentMonth+1;
if(newMonth===12 )
{
newYear=currentYear+1;
newMonth=0;
}
}
if(newMonth!==currentMonth )
{
controller._setMonthDropdownValue(newMonth );
}
if(newYear!==currentYear )
{
controller._setYearDropdownValue(newYear );
}
vgCalendarNS.updateDate(id);
};
vg.Calendar.navigateByDay=function(calendarId, direction)
{
"use strict";
var vgCalendarNS=vg.Calendar,
dateObject=vgCalendarNS.getSelectedDateObject(calendarId ),
currentDay=dateObject.getDate(),
calendarEl=document.getElementById(calendarId ),
controller=vg.comp.getController(calendarEl ),
navDirection=direction.toLowerCase(),
goPrev=(navDirection===vgCalendarNS.PREVIOUS ),
goNext=(navDirection===vgCalendarNS.NEXT ),
newDay=currentDay;
if(controller&&(goPrev||goNext ) )
{
newDay+=(goPrev?-1:1 );
dateObject.setDate(newDay );
controller._selectDay(dateObject );
}
};
vg.Calendar.closeCalendar=function(eventNode, eventType)
{
"use strict";
var vgCalendarNS=vg.Calendar,
vgHtmlNS=vg.html,
OPEN_LAYER_ID=vgCalendarNS.OPEN_LAYER_ID,
isCalendarLayerOpen=OPEN_LAYER_ID!=="",
isTouchScreenScroll=false,
calendarContainer=document.getElementById(vgCalendarNS.CALENDAR_CONTAINER),
calendarComp=vgHtmlNS.getElement(OPEN_LAYER_ID),
calendar=vg.comp.getController(calendarComp),
isEventInCalendar,
isEventOnCalendarLink,
eventNodeId,
baseIdIndex=-1;
if(isCalendarLayerOpen&&eventNode&&eventType&&calendar)
{
eventNodeId=eventNode.id;
if(eventNodeId)
{
baseIdIndex=eventNodeId.indexOf(calendar.baseId);
}
isTouchScreenScroll=(eventType==='scroll'&&cbd.browser.isTouchScreen);
isEventInCalendar=baseIdIndex >=0
||vgHtmlNS.isAncestor(calendarContainer, eventNode);
isEventOnCalendarLink=(eventNodeId===calendar.calendarLinkId);
if(!isTouchScreenScroll&&!isEventInCalendar&&!isEventOnCalendarLink )
{
calendar._closeCalendarLayer();
}
}
};
vg.Calendar.getSelectedDateObject=function(calendarId )
{
"use strict";
var controller=vg.comp.getController(document.getElementById(calendarId ) ),
selectedDateObject=controller?controller.selectedDate:null;
return selectedDateObject;
};
vg.Calendar.convertDateObjectToReadableString=function(dateObject )
{
"use strict";
var vgCalendarNS=vg.Calendar,
weekDay=vgCalendarNS.weekdays[dateObject.getDay()],
month=vgCalendarNS.months[dateObject.getMonth()],
day=dateObject.getDate(),
year=dateObject.getFullYear(),
dateString=weekDay+", "+month+" "+day+", "+year;
return dateString;
};
vg.Calendar.getSelectedDateAsReadableString=function(calendarId )
{
"use strict";
var vgCalendarNS=vg.Calendar,
selectedDateObj=vgCalendarNS.getSelectedDateObject(calendarId ),
dateString=selectedDateObj?vgCalendarNS.convertDateObjectToReadableString(selectedDateObj ):"";
return dateString;
};
vg.Calendar._closeLayer=function(calendarId )
{
"use strict";
var controller=vg.comp.getController(document.getElementById(calendarId ) );
if(controller)
{
controller._closeCalendarLayer();
}
};
vg.Calendar._dateOnClickHandler=function(clientId )
{
"use strict";
jsCBDSendDateToInput(clientId, clientId+vg.Calendar.CALENDAR_LAYER_ID);
vg.Calendar._closeLayer(clientId+vg.Calendar.CALENDAR_LAYER_ID);
jsCBDSetFocus(document.getElementById(clientId+vg.Calendar.CALENDAR_LAYER_ID));
};


InfoBox=function(id)
{
this.leaderId;
this.content_css="roundBoxCtnt";
this.globalInfoBox=document.getElementById(CBD_GLOBAL_INFO_BOX);
this.mouseIsOverLink=false;
this.pendingTimeouts=[];
this.firstElem;
this.lastElem;
if(window.isNextGen)
{
this.content_css="infoBoxContent";
}
};
InfoBox.prototype=
{
_configure:function(config, e)
{
var sizeHolder,
node;
if(config.id!=null)
{
this.targetNodeId=config.targetNodeId;
if(this.targetNodeId)
{
this.targetNodeId=vg.html._getFullyQualifiedId(this.targetNodeId);
}
if(this._isCurrentInfoBoxOpen(config))
{
return;
}
this.position=config.position;
this.disableEventListener=config.disableEventListener;
this.closeOnClick=config.closeOnClick;
this.targetRequired=config.targetRequired;
this.skin=config.skin;
this.id=config.id;
this.openDelay=config.openDelay;
this.closeDelay=config.closeDelay;
this.touchOnClick=config.touchOnClick;
this.hideOnSml=config.hideOnSml;
}
this.base=vg.Controller;
this.base(this.id, jsCBDgetElementsByAttr(document.getElementById(this.id), "span", "className", "content")[0]);
this.startTouchCounter=0;
this.iBoxPersist=this.viewNode.getAttribute("iBoxPersist")=='true';
sizeHolder=this.contentNode.parentNode;
this.width=sizeHolder.getAttribute('infoBoxWidth');
if(this.targetNodeId!=null)
{
node=document.getElementById(this.targetNodeId);
this.targetNode=node;
this.viewNode=node;
if(!this.targetRequired&&this.targetNode==null)
{
return;
}
vg.html.addStyle("iLayerLink", node);
}
else
{
this.targetNode=this._getTargetNode();
}
this.addEventListeners(e);
},
_isCurrentInfoBoxOpen:function(config)
{
if(this.viewNode&&((this.viewNode.id==config.id)||
(this.targetNodeId&&(this.viewNode.id==this.targetNodeId) ))&&
jsCBDisVisibleElement(this.globalInfoBox))
{
return true;
}
return false;
},
contentLoaded:function(e)
{
this.open(e);
},
addEventListeners:function(e)
{
var controller=this,
closeEventType;
if(this.disableEventListener==null||!this.disableEventListener)
{
if(this.viewNode!=null)
{
vg.html.removeEventListenerById(this.viewNode, "INFOBOX_HOVERSTART");
vg.html.addEventListener(this.viewNode, vg.event.GSTR_HOVERSTART, function(e){controller._hoverStart(e);}, "INFOBOX_HOVERSTART");
if(cbd.browser.isTouchScreen)
{
vg.html.removeEventListenerById(this.viewNode, "INFOBOX_HOVEREND");
vg.html.addEventListener(this.viewNode, vg.event.GSTR_HOVEREND, function(e){controller._hoverEnd(e);}, "INFOBOX_HOVEREND");
if(cbd.page.isResponsiveCapable)
{
vg.html.removeEventListenerById(this.viewNode, "INFOBOX_ORIENTATIONCHANGE");
vg.html.addEventListener(window, "orientationchange", function(e){
if(controller&&jsCBDisVisibleElement(controller.globalInfoBox))
{
controller.close();
setTimeout(function(){
if(controller)
{
controller.open();
}
},1000);
}
}, "INFOBOX_ORIENTATIONCHANGE");
}
}
else
{
vg.html.removeEventListenerById(this.viewNode, "INFOBOX_KEYDOWN");
vg.html.addEventListener(this.viewNode, 'keydown', function(e){controller._keyDown(e);}, "INFOBOX_KEYDOWN");
vg.html.removeEventListenerById(this.targetNode, "INFOBOX_BLUR");
vg.html.addEventListener(this.targetNode, 'blur', function(e){controller._blur(e);}, "INFOBOX_BLUR");
}
if(this.targetNodeId!=null)
{
if("mouseover"===e.type)
{
controller.openWithDelay(e);
}
else if("keydown"===e.type)
{
controller._keyDown(e);
}
}
if(!cbd.browser.isTouchScreen)
{
closeEventType=this.closeOnClick?'click':'mouseout';
vg.html.removeEventListenerById(this.viewNode, "INFOBOX_CLOSE");
vg.html.addEventListener(this.viewNode, closeEventType, function(e){controller.close(e);}, "INFOBOX_CLOSE");
}
}
}
if(this.iBoxPersist)
{
vg.html.removeEventListenerById(this.globalInfoBox, "INFOBOX_HOVERSTART");
vg.html.addEventListener(this.globalInfoBox, vg.event.GSTR_HOVERSTART, function(e){controller._hoverStartGlobalInfoBox(e);},"INFOBOX_HOVERSTART");
vg.html.removeEventListenerById(this.globalInfoBox, "INFOBOX_HOVEREND");
vg.html.addEventListener(this.globalInfoBox, vg.event.GSTR_HOVEREND, function(e){controller._hoverEndGlobalInfoBox(e);}, "INFOBOX_HOVEREND");
}
},
openWithDelay:function(event)
{
this.mouseIsOverLink=true;
this.globalInfoBox.onlink=true;
var	eventInfo=this._getEventInfo(event),
controller=this,
timeout;
this._clearTimeouts();
timeout=setTimeout(function()
{
if(controller.mouseIsOverLink)
{
controller.open(eventInfo);
}
}, this.openDelay);
this.pendingTimeouts.push(timeout);
},
_blur:function(e)
{
if(jsCBDisVisibleElement(this.globalInfoBox))
{
return;
}
else
{
this.close();
}
},
_keyDown:function(event)
{
var eventInfo=this._getEventInfo(event),
key=jsCBDgetKey(jsCBDgetEvent(event));
if(key==32||key==13)
{
if(this.globalInfoBox.style.display=="none")
{
this.open(eventInfo);
}
else
{
this.close();
}
if(key==32)
{
vg.html.stopEventPropagation(event);
vg.html.preventDefault(event);
}
}
if(key==9&&jsCBDisVisibleElement(this.globalInfoBox)&&(this._getTargetNode()==jsCBDgetElementsByAttr(this.viewNode, "a", "name", "iLayerAnchor")[0]))
{
jsCBDSetFocus(this.firstElem);
vg.html.preventDefault(event);
}
},
_getEventInfo:function(event)
{
var eventPos=vg.event.getPosition(event),
eventInfo={event:event, eventPos:eventPos};
return eventInfo;
},
open:function(eventInfo)
{
"use strict";
var controller=this,
globalInfoBox=this.globalInfoBox,
globalInfoBoxContentDiv=jsCBDgetElementsByAttr(globalInfoBox, "div", "className", controller.content_css)[0],
isNextGen=window.isNextGen,
h=jsCBDgetScreenHeight(),
maxPercent=isNextGen?80:40,
max=(maxPercent*h)/100,
scrollDiv=globalInfoBoxContentDiv.parentNode,
event=(eventInfo)?eventInfo.event:null,
eventPos=(eventInfo)?eventInfo.eventPos:null,
preventOpen=(this.hideOnSml&&cbdcommon.screen.isMediaQuerySizeSmall() ),
origWidth,
newWidth,
contentHeight,
leaderData,
leaderId,
leaderElem;
if(!preventOpen)
{
if(Populator.exists(this.viewNode))
{
Populator._copy(this.viewNode, this.contentNode);
Populator._execute(this.contentNode, function(){controller.contentLoaded();});
}
if(globalInfoBox.leader )
{
jsCBDtoggleElement(globalInfoBox.leader, false);
}
globalInfoBoxContentDiv.innerHTML=this.contentNode.innerHTML;
globalInfoBox.onlink=true;
origWidth=this.width;
if(!origWidth )
{
newWidth="auto";
}
else if(origWidth.indexOf("%") > -1)
{
newWidth=(jsCBDgetScreenWidth()*origWidth.replace("%",""))/100+"px";
}
else
{
newWidth=origWidth;
}
vg.html.setWidth(globalInfoBox, newWidth);
vg.textZoomNG._resizeNodeOutsideOfZoomContent(globalInfoBox, this.viewNode);
jsCBDtoggleElement(globalInfoBox, true);
contentHeight=vg.html.getObjHeight(globalInfoBoxContentDiv);
jsCBDtoggleElement(globalInfoBox, false);
vg.html.setHeight(scrollDiv,(contentHeight > max)?max+"px":"auto");
globalInfoBox.count=0;
leaderData=vg.html.position({elementNode:CBD_GLOBAL_INFO_BOX, targetNode:this.targetNode, dispLoc:this.position, infobox:true, leader:true, eventPos:eventPos});
leaderId=leaderData.elem.leaderId;
if(leaderId)
{
globalInfoBox.leaderId=leaderId;
leaderElem=document.getElementById(globalInfoBox.leaderId);
jsCBDtoggleElement(leaderElem, true);
globalInfoBox.leader=leaderElem;
vg.html.removeEventListenerById(globalInfoBox.leader, "INFOBOX_HOVERSTART");
vg.html.addEventListener(globalInfoBox.leader, vg.event.GSTR_HOVERSTART, function(event){controller._hoverStartGlobalInfoBox(event);}, "INFOBOX_HOVERSTART");
vg.html.removeEventListenerById(globalInfoBox.leader, "INFOBOX_HOVEREND");
vg.html.addEventListener(globalInfoBox.leader, vg.event.GSTR_HOVEREND, function(event){controller._hoverEndGlobalInfoBox(event);}, "INFOBOX_HOVEREND");
}
if(vg.util.isIE7ZoomedInOut())
{
globalInfoBoxContentDiv.innerHTML=this.contentNode.innerHTML;
}
vg.javascriptAdapter.attachListeners(globalInfoBoxContentDiv);
jsCBDtoggleElement(globalInfoBox, true);
this.setFocus();
if(this.firstElem&&this.lastElem)
{
vg.html.removeEventListenerById(this.firstElem, "INFOBOX_KEYDOWN_FIRST_ELEMENT");
vg.html.addEventListener(this.firstElem, 'keydown', function(e){controller.keyEventHandler(e);}, "INFOBOX_KEYDOWN_FIRST_ELEMENT");
vg.html.removeEventListenerById(this.lastElem, "INFOBOX_KEYDOWN_LAST_ELEMENT");
vg.html.addEventListener(this.lastElem, 'keydown', function(e){controller.keyEventHandler(e);}, "INFOBOX_KEYDOWN_LAST_ELEMENT");
vg.html.removeEventListenerById(this.viewNode, "INFOBOX_KEYDOWN_VIEW_NODE");
vg.html.addEventListener(this.viewNode, 'keydown', function(e){controller.keyEventHandler(e);}, "INFOBOX_KEYDOWN_VIEW_NODE");
}
}
},
close:function(e)
{
this.globalInfoBox.onlink=false;
this.mouseIsOverLink=false;
if(this.iBoxPersist)
{
this.callCheckClose();
return;
}
InfoBox.close();
},
checkClose:function()
{
if(this.globalInfoBox.count!=0||this.globalInfoBox.onlink)
{
return;
}
InfoBox.close();
},
_getTargetNode:function()
{
var node=jsCBDgetElementsByAttr(this.viewNode, "a", "name", "iLayerAnchor")[0];
if(!node)
{
node=jsCBDgetElementsByAttr(this.viewNode, "span", "name", "iLayerAnchor")[0];
}
if(!node)
{
node=jsCBDgetElementsByAttr(this.viewNode, "a")[0];
}
if(!node)
{
node=this.viewNode;
}
return node;
},
callCheckClose:function()
{
var controller=this,
timeout;
this._clearTimeouts();
timeout=setTimeout(function(e){controller.checkClose();}, this.closeDelay);
this.pendingTimeouts.push(timeout);
},
_clearTimeouts:function()
{
var ptSize=this.pendingTimeouts.length,
i;
for(i=0;i < ptSize;i++)
{
clearTimeout(this.pendingTimeouts[i]);
}
this.pendingTimeouts=[];
},
_hoverStart:function(event)
{
if(cbd.browser.isTouchScreen)
{
if(this.startTouchCounter==0)
{
this.openWithDelay(event);
}
this.startTouchCounter++;
vg.html.stopEventPropagation(event);
}
else
{
this.openWithDelay(event);
}
},
_hoverEnd:function(e)
{
if(!vg.event.isWithinNodes(e,[this.targetNode, this.globalInfoBox]) )
{
this.close(e);
}
else if(this.startTouchCounter==2)
{
this.close(e);
var touchOnClick=this.touchOnClick.replace(/return false;?$/g,'');
if(touchOnClick)
{
(new Function(touchOnClick))();
}
}
},
_hoverStartGlobalInfoBox:function(e)
{
this.globalInfoBox.count++;
if(cbd.browser.isTouchScreen)
{
vg.html.stopEventPropagation(e);
}
},
_hoverEndGlobalInfoBox:function(e)
{
var eventNode,
touchOnClick;
this.globalInfoBox.count--;
if(cbd.browser.isTouchScreen)
{
this.close(e);
eventNode=vg.html.getElement(e.target);
if(!vg.html.isElement(eventNode) )
{
eventNode=eventNode.parentNode;
}
if(vg.event.isWithinNodes(e,[this.targetNode, this.globalInfoBox])&&!vg.html.isInput(eventNode) )
{
touchOnClick=this.touchOnClick.replace(/return false;?$/g,'');
if(touchOnClick)
{
eval(touchOnClick);
}
}
}
else
{
this.callCheckClose();
}
},
setFirstAndLastInputElements:function(useCache)
{
if(!useCache||!this.firstElem||!this.lastElem)
{
this._setFirstAndLastInputElements();
}
},
_setFirstAndLastInputElements:function()
{
var ret=[],
retLength,
i,
controller=this,
globalInfoBox=this.globalInfoBox,
globalInfoBoxContentDiv=jsCBDgetElementsByAttr(globalInfoBox, "div", "className", controller.content_css)[0],
j;
vg.html.getContainerInputs(globalInfoBoxContentDiv, ret);
retLength=ret.length;
this.firstElem=null;
this.lastElem=null;
for(i=0;i < retLength;i++)
{
if(vg.html.findFirstHiddenAncestor(ret[i])===null)
{
this.firstElem=ret[i];
break;
}
}
for(j=retLength - 1;j >=0;j--)
{
if(vg.html.findFirstHiddenAncestor(ret[j])===null)
{
this.lastElem=ret[j];
break;
}
}
},
setFocus:function()
{
if(!this.disableDefaultFocus)
{
this.setFirstAndLastInputElements();
var firstElem=this.firstElem;
if(firstElem&&(!vg.html.isAncestor(this.scrollDiv,firstElem)||this.isElemInScrollView(firstElem)) )
{
jsCBDSetFocus(firstElem);
}
else
{
if(this.scrollDiv)
{
this.scrollDiv.setAttribute("tabindex", "-1");
jsCBDSetFocus(this.scrollDiv);
}
}
}
},
keyEventHandler:function(e)
{
var key=jsCBDgetKey(jsCBDgetEvent(e));
var targ;
if(e.target){
targ=e.target;
}
else if(e.srcElement)
{
targ=e.srcElement;
}
if(targ.nodeType==3)
targ=targ.parentNode;
if(key==9)
{
this.setFirstAndLastInputElements(true);
if(targ==this.lastElem)
{
if(!e.shiftKey)
{
jsCBDSetFocus(jsCBDgetElementsByAttr(this.viewNode, "a", "name", "iLayerAnchor")[0]);
vg.html.preventDefault(e);
}
}
if(targ==this.firstElem&&e.shiftKey)
{
if(cbd.page.isNextGen)
{
jsCBDSetFocus(this.lastElem);
}
vg.html.preventDefault(e);
}
}
if(key==9&&e.shiftKey)
{
if(targ==this.firstElem&&e.shiftKey)
{
if(cbd.page.isNextGen)
{
jsCBDSetFocus(jsCBDgetElementsByAttr(this.viewNode, "a", "name", "iLayerAnchor")[0]);
}
vg.html.preventDefault(e);
}
if(targ==jsCBDgetElementsByAttr(this.viewNode, "a", "name", "iLayerAnchor")[0])
{
jsCBDSetFocus(this.lastElem);
vg.html.stopEventPropagation(event);
vg.html.preventDefault(e);
}
}
}
};
InfoBox._setTriggerLabel=function(infoBoxId, newLabel)
{
var	controller=vg.comp.getController(infoBoxId),
targetNode;
if(controller)
{
targetNode=controller._getTargetNode(infoBoxId);
if(targetNode)
{
targetNode.innerHTML=newLabel;
}
}
};
InfoBox.close=function()
{
if(InfoBoxFactory==null)
{
return;
}
if(InfoBoxFactory.globalInfoBox&&InfoBoxFactory.globalInfoBox.leaderId)
{
jsCBDtoggleElement(document.getElementById(InfoBoxFactory.globalInfoBox.leaderId), false);
}
if(InfoBoxFactory.globalInfoBox)
{
jsCBDtoggleElement(InfoBoxFactory.globalInfoBox, false);
}
if(InfoBoxFactory.viewNode.textZoom===true)
{
jsCBDdeleteStyle(InfoBoxFactory.globalInfoBox, vg.textZoomNG.TEXT_ZOOM_CONTENT_CLASS);
}
InfoBoxFactory.startTouchCounter=0;
};
InfoBox.setContent=function(infoBoxId, html)
{
var floatInfoBox;
compManager._setCompConfig(infoBoxId, "INFOBOX");
vg.comp.getContentNode(infoBoxId ).innerHTML=html;
if(CBD_FLOATING_HEAD)
{
floatInfoBox=FloatingDataTable.getElement(infoBoxId);
if(floatInfoBox)
{
compManager._setCompConfig(floatInfoBox.getAttribute("id"), "INFOBOX");
vg.comp.getContentNode(floatInfoBox ).innerHTML=html;
}
}
};
InfoBox.setTriggerLabel=function(infoBoxId, newLabel)
{
var floatInfoBox;
compManager._setCompConfig(infoBoxId, "INFOBOX");
InfoBox._setTriggerLabel(infoBoxId, newLabel);
if(CBD_FLOATING_HEAD)
{
floatInfoBox=FloatingDataTable.getElement(infoBoxId);
if(floatInfoBox)
{
compManager._setCompConfig(floatInfoBox.getAttribute("id"), "INFOBOX");
InfoBox._setTriggerLabel(floatInfoBox.id, newLabel);
}
}
};
InfoBox.open=function(id)
{
var infoBox=document.getElementById(id);
compManager._setCompConfig(id, "INFOBOX");
vg.comp.getController(infoBox).open();
};
InfoBox.moveConfig=function(compId, targetId)
{
var target=vg.html._getElementWithIdPrefixes(targetId);
vg.html.addEventListener(target, 'mouseover', function(e){compManager._setCompConfig(compId,'INFOBOX', e);});
vg.html.addEventListener(target, 'keydown', function(e){compManager._setCompConfig(compId,'INFOBOX', e);});
};


vg.TreeView=function(id)
{
"use strict";
};
vg.TreeView.SELECTED_STYLE="highlightLink";
vg.TreeView.EXPANDABLE_CLASS="expandable";
vg.TreeView.COLLAPSED_CLASS="collapsed";
vg.TreeView.EXPANDED_CLASS="expanded";
vg.TreeView.ARROW_COLLAPSED_CLASS="arrowCollapsed";
vg.TreeView.ARROW_EXPANDED_CLASS="arrowExpanded";
vg.TreeView.EMPTY_SELECTION="none";
vg.TreeView.prototype=
{
_initTree:function(id, animationDuration)
{
"use strict";
var controller=this,
branchItems,
i,
leafItems,
CLICK_EVENT="click",
MOUSEOVER_EVENT="mouseover",
MOUSEOUT_EVENT="mouseout",
CLASS_ATTRIBUTE="class",
htmlNamespace=vg.html,
hasBranchItemClass=function(node)
{
return htmlNamespace.hasStyle("branchItem", node);
},
hasLeafItemClass=function(node)
{
return htmlNamespace.hasStyle("leafItem", node);
};
this.base=vg.Controller;
this.base(id, null);
this.id=id;
this.animationDuration=animationDuration;
branchItems=htmlNamespace.getElements(this.viewNode,{tagName:"span", attrName:CLASS_ATTRIBUTE},
hasBranchItemClass);
if(branchItems)
{
i=branchItems.length;
while(i--)
{
htmlNamespace.addEventListenerMethod(branchItems[i], CLICK_EVENT, controller,
"_onBranchItemClick");
}
}
leafItems=htmlNamespace.getElements(this.viewNode,{tagName:"li", attrName:CLASS_ATTRIBUTE},
hasLeafItemClass);
if(leafItems)
{
i=leafItems.length;
while(i--)
{
htmlNamespace.addEventListenerMethod(leafItems[i], CLICK_EVENT, controller,
"_onLeafItemClick");
}
}
},
_openAncestorBranches:function(leaf)
{
"use strict";
var anchor,
htmlNamespace=vg.html,
hasExpandableClass=function(node)
{
return htmlNamespace.hasStyle(vg.TreeView.EXPANDABLE_CLASS, node);
},
branch=htmlNamespace.findAncestor(leaf,{tagName:"li"}, hasExpandableClass,
{tagName:"span", attrName:"name", attrValue:"skin"});
while(branch!==null)
{
if(branch.className.indexOf(vg.TreeView.COLLAPSED_CLASS) > 0)
{
anchor=branch.firstChild;
this._toggleBranch(anchor, branch);
}
branch=htmlNamespace.findAncestor(branch,{tagName:"li"}, hasExpandableClass,
{tagName:"span", attrName:"name", attrValue:"skin"});
}
},
_onBranchItemClick:function(e)
{
"use strict";
var clickedElement=jsCBDgetEventNode(e),
htmlNamespace=vg.html,
currentListItem,
isResponsive=this.isResponsive,
hasExpandableSpanStyle=function(item)
{
return htmlNamespace.hasStyle("expandableSpan", item);
},
hasLinkTextBranchItemClasses,
hasItemLabelBranchClasses,
stopFilter={tagName:"span", attrName:"id", attrValue:this.id},
isMediaQuerySizeLarge=cbdcommon.screen.isMediaQuerySizeLarge(),
expandableSpan=htmlNamespace.findAncestor(clickedElement,{tagName:"span"},
hasExpandableSpanStyle, stopFilter),
isExpandableNonResponsive=!isResponsive&&expandableSpan!==null,
isResponsiveSmallOrMedium=isResponsive&&!isMediaQuerySizeLarge,
isResponsiveLargeExpandable=isResponsive&&isMediaQuerySizeLarge&&expandableSpan!==null,
isFilterMenuGroup=this.isMenuGroup();
if(isExpandableNonResponsive||isResponsiveSmallOrMedium||isResponsiveLargeExpandable||isFilterMenuGroup)
{
if(isResponsive||isFilterMenuGroup)
{
if(expandableSpan!==null)
{
clickedElement=expandableSpan;
}
else if(htmlNamespace.hasStyle("categoryText", clickedElement)
||htmlNamespace.hasStyle("selectedItemText", clickedElement)
||htmlNamespace.hasStyle("expandCollapseImage", clickedElement))
{
hasLinkTextBranchItemClasses=function(item)
{
return htmlNamespace.hasStyle("linkText", item)
&&htmlNamespace.hasStyle("branchItem", item);
};
clickedElement=htmlNamespace.findAncestor(clickedElement,{tagName:"span"},
hasLinkTextBranchItemClasses, stopFilter);
}
hasItemLabelBranchClasses=function(item)
{
return htmlNamespace.hasStyle("itemLabel", item)
&&htmlNamespace.hasStyle("branch", item);
};
currentListItem=htmlNamespace.findAncestor(clickedElement,{tagName:"li"},
hasItemLabelBranchClasses, stopFilter);
}
else
{
clickedElement=expandableSpan;
currentListItem=htmlNamespace.findAncestor(clickedElement,{tagName:"li"}, null,
{tagName:"ul"});
}
this._processClick(clickedElement, currentListItem);
}
},
_onLeafItemClick:function(e)
{
"use strict";
var clickedElement=jsCBDgetEventNode(e),
htmlNamespace=vg.html,
clickedElementCheckboxChildren=htmlNamespace.getElements(clickedElement,
{tagName:"input", attrName:"type", attrValue:"checkbox"})[0],
tagName=clickedElement.tagName.toLowerCase(),
hasBranchHeadClasses,
hasSearchInputLeafClass,
stopFilter,
currentListItem,
LI_ELEMENT="li",
categoryListItem,
isLiDisabled,
isCategoryLiDisabled;
if(!clickedElementCheckboxChildren&&(tagName!=="input"||this.isResponsive||this.isMenuGroup()))
{
if(tagName==="span")
{
clickedElement=htmlNamespace.findAncestor(clickedElement,{tagName:"a"}, null,
{tagName:LI_ELEMENT});
}
if(tagName!==LI_ELEMENT)
{
currentListItem=htmlNamespace.findAncestor(clickedElement,{tagName:LI_ELEMENT});
}
else if(!cbdcommon.screen.isMediaQuerySizeLarge())
{
currentListItem=clickedElement;
}
hasSearchInputLeafClass=function(item)
{
return htmlNamespace.hasStyle("searchInputLeaf", item);
};
if(currentListItem&&!hasSearchInputLeafClass(currentListItem))
{
hasBranchHeadClasses=function(item)
{
return htmlNamespace.hasStyle("branch", item)&&htmlNamespace.hasStyle("head", item);
};
stopFilter={tagName:"span", attrName:"id", attrValue:this.id};
categoryListItem=htmlNamespace.findAncestor(currentListItem,{tagName:LI_ELEMENT},
hasBranchHeadClasses, stopFilter);
isLiDisabled=currentListItem&&(htmlNamespace.hasStyle("disabled", currentListItem)
||htmlNamespace.hasStyle("internal-disabled", currentListItem));
isCategoryLiDisabled=categoryListItem
&&(htmlNamespace.hasStyle("disabled", categoryListItem)
||htmlNamespace.hasStyle("internal-disabled", categoryListItem));
if(!(isLiDisabled||isCategoryLiDisabled))
{
this._processClick(clickedElement, currentListItem);
}
}
}
},
_processClick:function(clickedElement, currentListItem)
{
"use strict";
if(this.isToggleableBranch(currentListItem))
{
if(!this.isMenuGroup())
{
this._toggleBranch(clickedElement, currentListItem);
}
}
else
{
this._processSelectItem(clickedElement, currentListItem);
}
},
isMenuGroup:function()
{
"use strict";
var isFilterMenuGroup=false,
largeMediaQuery=cbdcommon.screen.isMediaQuerySizeLarge(),
compSkin;
if(largeMediaQuery)
{
compSkin=vg.html.getCompSkin(this.viewNode);
if(compSkin)
{
isFilterMenuGroup=compSkin.className==="filterNavmenuGroup";
}
}
return isFilterMenuGroup;
},
isToggleableBranch:function(currentListItem)
{
"use strict";
var htmlNamespace=vg.html,
isBranch=false;
if(currentListItem)
{
if(this.isResponsive||this.isMenuGroup())
{
isBranch=htmlNamespace.hasStyle("branch", currentListItem)
&&htmlNamespace.hasStyle("head", currentListItem);
}
else
{
isBranch=htmlNamespace.hasStyle(vg.TreeView.EXPANDABLE_CLASS, currentListItem);
}
}
return isBranch;
},
_processSelectItem:function(clickedElement, currentListItem)
{
"use strict";
},
_toggleBranch:function(clickedBranchItem, clickedBranch)
{
"use strict";
var hasLeafGroupStyle=function(node)
{
return vg.html.hasStyle("leafGroup", node);
},
targetNode=vg.html.getElements(clickedBranch,{tagName:"ul", attrName:"class"},
hasLeafGroupStyle)[0],
targetNodeStyle=targetNode.style,
hasExpandedClass,
expandedBranch,
liCss=clickedBranch.className,
isMenuGroup=this.isMenuGroup(),
isToggleableBranch=this.isResponsive||isMenuGroup,
shouldClose=liCss.indexOf(vg.TreeView.EXPANDED_CLASS) >=0
||(isToggleableBranch&&!vg.html.hasStyle("leafGroupCollapsed", targetNode)),
startPoint,
endPoint,
callback,
coordinates,
hasArrowClass=function(node)
{
return vg.html.hasStyle("arrow", node);
},
arrow=vg.html.getElements(clickedBranchItem,{tagName:"span", attrName:"class"},
hasArrowClass)[0],
vgNamespace=vg,
htmlNamespace=vgNamespace.html,
stateKeeperNamespace=cbd.StateKeeper,
treeViewNamespace=vg.TreeView,
collapsedClass=treeViewNamespace.COLLAPSED_CLASS,
expandedClass=treeViewNamespace.EXPANDED_CLASS,
arrowExpandedClass=treeViewNamespace.ARROW_EXPANDED_CLASS,
arrowCollapsedClass=treeViewNamespace.ARROW_COLLAPSED_CLASS,
filterNav=document.getElementById(this.id),
shouldAnimate=!isMenuGroup;
if(shouldClose)
{
startPoint=targetNode.offsetHeight;
endPoint=1;
if(arrow)
{
htmlNamespace.replaceClass(arrow, arrowExpandedClass, arrowCollapsedClass);
}
callback=function()
{
if(arrow)
{
clickedBranch.className=liCss.replace(expandedClass, collapsedClass);
htmlNamespace.replaceClass(targetNode, expandedClass, collapsedClass);
}
if(isToggleableBranch)
{
htmlNamespace.addStyle("leafGroupCollapsed", targetNode);
htmlNamespace.replaceClass(clickedBranchItem, expandedClass, collapsedClass);
hasExpandedClass=function(node)
{
return vg.html.hasStyle(expandedClass, node);
};
expandedBranch=vg.html.getElements(clickedBranchItem,{tagName:"span",
attrName:"class"}, hasExpandedClass)[0];
if(expandedBranch)
{
htmlNamespace.replaceClass(expandedBranch, expandedClass, collapsedClass);
}
}
targetNodeStyle.height="auto";
stateKeeperNamespace._setState(clickedBranch.id, false, false);
};
}
else
{
if(arrow)
{
htmlNamespace.replaceClass(arrow, arrowCollapsedClass, arrowExpandedClass);
clickedBranch.className=liCss.replace(collapsedClass, expandedClass);
htmlNamespace.replaceClass(targetNode, collapsedClass, expandedClass);
}
if(isToggleableBranch)
{
htmlNamespace.removeStyle("leafGroupCollapsed", targetNode);
htmlNamespace.replaceClass(clickedBranchItem, collapsedClass, expandedClass);
}
startPoint=1;
endPoint=targetNode.offsetHeight;
targetNodeStyle.height="1px";
callback=function()
{
vg.html._fireCustomEvent(vg.event.DOM_CHANGE, filterNav);
targetNodeStyle.height="auto";
stateKeeperNamespace._setState(clickedBranch.id, true, false);
};
}
coordinates={height:{from:startPoint, to:endPoint}};
if(shouldAnimate)
{
vgNamespace.smil.animateElement(
{target:targetNode, attr:coordinates, duration:this.animationDuration,
funcFinished:callback});
}
else
{
callback();
}
},
_destroy:function()
{
var id=this.viewNode.id,
dropDownId=id+"_dropDown",
button=document.getElementById(id+"_button"),
filterNav=this.viewNode,
closeButtonElement=document.getElementById(id+"_closeButton"),
clearButtonElement=document.getElementById(id+"_clearButton"),
clearAnchorElement=document.getElementById(id+"ClearAnchor"),
vgHtml=vg.html;
vgHtml.removeEventListenerById(window, "filterNav-BreakPointChange-"+id);
vgHtml.removeEventListenerById(document.body, "filterNavBodyClick-"+id);
vgHtml.removeEventListenerById(button, "filterNavToggleDropDown-"+id);
vgHtml.removeEventListenerById(closeButtonElement, "filterNavCloseDropDown-"+id);
vgHtml.removeEventListenerById(clearButtonElement, "filterNavClearClick-"+id);
vgHtml.removeEventListenerById(filterNav, "filterNavMouseover-"+id);
vgHtml.removeEventListenerById(filterNav, "filterNavMouseout-"+id);
vgHtml.removeEventListenerById(clearAnchorElement, "filterNavonClearClick-"+id);
}
};
(function(vg, cbd, document, window, jsCBDgetEventNode, _cbdGetParentForm)
{
"use strict";
var BRANCH_CLASS="branch",
HEAD_CLASS="head",
DROP_DOWN_OPEN_CLASS="dropDownOpen",
DROP_DOWN_CLOSED_CLASS="dropDownClosed",
NO_ITEMS_SELECTED_CLASS="noItemsSelected",
SELECTED_CLASS="selected",
LEAF_HIGHLIGHTED_CLASS="highlightLink",
NO_SELECTED_ITEM_TEXT_CLASS="noSelectedItemText",
BUTTON_ID="_button",
DROP_DOWN_ARROW_ID="_dropDownArrow",
DROP_DOWN_ID="_dropDown",
CLOSE_BUTTON_ID="_closeButton",
CLEAR_BUTTON_ID="_clearButton",
LI_ELEMENT="li",
UL_ELEMENT="ul",
SPAN_ELEMENT="span",
INPUT_ELEMENT="input",
ID_ATTRIBUTE="id",
TYPE_ATTRIBUTE="type",
VALUE_ATTRIBUTE="value",
CHECKBOX="checkbox",
PIXELS="px",
SMALL_BREAKPOINT="small",
MEDIUM_BREAKPOINT="medium",
LARGE_BREAKPOINT="large",
COMMA=",",
AMPERSAND="&",
COLON=":",
EMPTY_STRING="",
SPACE=" ",
CHECKBOX_CLICKED_UPDATE_PARAMS="cbdFilterCheckboxClicked=true&cbdFilterCheckboxListId=",
BRANCH_CLICKED_UPDATE_PARAMS="cbdFilterBranchClickedId=",
EXPANDED_BRANCH_IDS_UPDATE_PARAMS="cbdFilterExpandedBranchIds=",
htmlNamespace=vg.html,
compNamespace=vg.comp,
screenNamespace=cbdcommon.screen,
stateKeeperNamespace=cbd.StateKeeper,
hasExpandCollapseClass=function(item)
{
return htmlNamespace.hasStyle("expandCollapseImage", item);
},
hasCategoryTextClass=function(item)
{
return htmlNamespace.hasStyle("categoryText", item);
},
hasSelectedItemTextClass=function(item)
{
return htmlNamespace.hasStyle("selectedItemText", item);
},
hasLinkTextClass=function(item)
{
return htmlNamespace.hasStyle("linkText", item);
},
hasItemLabelBranchHeadClasses=function(item)
{
return htmlNamespace.hasStyle("itemLabel", item)
&&htmlNamespace.hasStyle(BRANCH_CLASS, item)
&&htmlNamespace.hasStyle(HEAD_CLASS, item);
},
setSelectedItemTextWidth=function(categoryListItem)
{
var categoryTextSpan=htmlNamespace.getElements(categoryListItem,{tagName:SPAN_ELEMENT},
hasCategoryTextClass)[0],
selectedItemTextSpan=htmlNamespace.getElements(categoryListItem,
{tagName:SPAN_ELEMENT}, hasSelectedItemTextClass)[0],
expandCollapseImage,
categorySpan,
categorySpanPadding,
categorySpanWidth,
categoryTextSpanPadding,
categoryTextSpanWidth,
expandCollapseImageWidth,
remainingWidth;
if(!selectedItemTextSpan.style.width)
{
expandCollapseImage=htmlNamespace.getElements(categoryListItem,
{tagName:SPAN_ELEMENT}, hasExpandCollapseClass)[0];
categorySpan=htmlNamespace.findAncestor(categoryTextSpan,{tagName:SPAN_ELEMENT},
hasLinkTextClass,{tagName:LI_ELEMENT});
categorySpanPadding=htmlNamespace.getObjPadding(categorySpan);
categorySpanWidth=htmlNamespace.getObjWidth(categorySpan);
categoryTextSpanPadding=htmlNamespace.getObjPadding(categoryTextSpan);
categoryTextSpanWidth=htmlNamespace.getObjWidth(categoryTextSpan);
expandCollapseImageWidth=htmlNamespace.getObjWidth(expandCollapseImage);
remainingWidth=categorySpanWidth - categorySpanPadding.left
- categorySpanPadding.right - categoryTextSpanWidth
- categoryTextSpanPadding.left - categoryTextSpanPadding.right
- expandCollapseImageWidth;
if(remainingWidth > 0)
{
selectedItemTextSpan.style.width=remainingWidth+PIXELS;
}
}
},
setSelectedItemTextWidths=function(id)
{
var filterNav=document.getElementById(id),
i,
categoryListItem,
categoryListItems=htmlNamespace.getElements(filterNav,{tagName:LI_ELEMENT},
hasItemLabelBranchHeadClasses);
if(categoryListItems)
{
i=categoryListItems.length;
while(i--)
{
categoryListItem=categoryListItems[i];
setSelectedItemTextWidth(categoryListItem);
}
}
},
getCategoryInput=function(node, controller)
{
var hasCategoryClass=function(item)
{
return htmlNamespace.hasStyle("category", item);
},
stopFilter=controller.stopFilter,
category;
if(hasCategoryClass(node))
{
category=node;
}
else
{
category=htmlNamespace.findAncestor(node,{tagName:UL_ELEMENT},
hasCategoryClass, stopFilter);
}
return category.children[0];
},
getCategoryInputs=function(viewNode)
{
var isSelectedCategory=function(item)
{
return item.getAttribute(ID_ATTRIBUTE).indexOf(vg.FilterNav.SELECTED_CATEGORY) >=0;
},
inputs=htmlNamespace.getElements(viewNode,{tagName:INPUT_ELEMENT}, isSelectedCategory);
return inputs;
},
fireFilterUpdatedEvent=function(id)
{
var filterNav=document.getElementById(id),
branchInputs=getCategoryInputs(filterNav),
branchInputsIndex=branchInputs.length,
branchInput,
branchInputId,
filteredValues={},
eventData={updatedFilterNavId:id, filteredValues:filteredValues};
while(branchInputsIndex--)
{
branchInput=branchInputs[branchInputsIndex];
branchInputId=branchInput.getAttribute("id");
branchInputId=branchInputId.replace("SelectedCat", "");
filteredValues[branchInputId]=branchInput.getAttribute("value");
}
htmlNamespace._fireCustomEvent(vg.event.FILTER_NAV_UPDATED, filterNav, eventData);
},
openDropDown=function(id)
{
var button=document.getElementById(id+BUTTON_ID),
dropDownArrow=document.getElementById(id+DROP_DOWN_ARROW_ID),
dropDown=document.getElementById(id+DROP_DOWN_ID);
htmlNamespace.addStyle(DROP_DOWN_OPEN_CLASS, button);
htmlNamespace.removeStyle(DROP_DOWN_CLOSED_CLASS, dropDownArrow);
htmlNamespace.removeStyle(DROP_DOWN_CLOSED_CLASS, dropDown);
if(cbdcommon.screen.isMediaQuerySizeSmall()||cbdcommon.screen.isMediaQuerySizeMedium())
{
setSelectedItemTextWidths(id);
}
},
hasSelectedItemTextStyle=function(node)
{
return vg.html.hasStyle("selectedItemText", node);
},
hasLeafGroupStyle=function(node)
{
return vg.html.hasStyle("leafGroup", node);
},
hasCategoryStyle=function(node)
{
return htmlNamespace.hasStyle("category", node);
},
hasBranchItemClass=function(node)
{
return htmlNamespace.hasStyle("branchItem", node);
},
getSelectedCheckboxText=function(categoryNode)
{
var selectedText=null,
checkboxes=htmlNamespace.getElements(categoryNode,
{tagName:"input", attrName:"type", attrValue:"checkbox"}),
index=checkboxes.length,
numberChecked=0;
while(index--)
{
if(checkboxes[index].checked)
{
numberChecked++;
}
}
if(numberChecked > 0&&numberChecked < checkboxes.length)
{
selectedText=numberChecked+" selected";
}
return selectedText;
},
insertButtonNumber=function(filterNav, id, selectedItemCount, showSelectedItemCount)
{
var buttonNumber=document.getElementById(id+"_buttonNumber"),
button=document.getElementById(id+BUTTON_ID),
suppressFromCountSelectedItems,
clearDivElement,
hasSelectedSuppressFromCountClass=function(node)
{
return htmlNamespace.hasStyle("suppressFromCount", node)&&htmlNamespace.hasStyle("selected", node);
};
suppressFromCountSelectedItems=htmlNamespace.getElements(filterNav,{tagName:"li", attrName:"class"},hasSelectedSuppressFromCountClass);
clearDivElement=document.getElementById(id+"Clear");
if(button&&buttonNumber)
{
if(selectedItemCount > 0&&showSelectedItemCount===true)
{
buttonNumber.innerHTML=selectedItemCount;
htmlNamespace.removeStyle(NO_ITEMS_SELECTED_CLASS, button);
}
else
{
htmlNamespace.addStyle(NO_ITEMS_SELECTED_CLASS, button);
}
}
if(clearDivElement)
{
if(selectedItemCount > 0||suppressFromCountSelectedItems.length > 0)
{
htmlNamespace.removeStyle(NO_ITEMS_SELECTED_CLASS,clearDivElement);
}
else
{
htmlNamespace.addStyle(NO_ITEMS_SELECTED_CLASS,clearDivElement);
}
}
},
updateClientSide=function(controller)
{
var id=controller.id,
filterNav=controller.viewNode,
categories=htmlNamespace.getElements(filterNav,{attrName:"class", attrValue:"category"}),
compSkin=vg.html.getCompSkin(filterNav),
categoriesIndex=categories.length,
category,
input,
categoryValue,
selectedItemTextNode,
selectedItemText,
originalItemText,
leaves,
leavesIndex,
leaf,
leafValue,
leafAnchor,
leafIsHighlighted,
linkText,
suppressFromCount,
numberOfBranchesWithSelections=0,
hasCategoryChanged=false;
while(categoriesIndex--)
{
category=categories[categoriesIndex];
input=getCategoryInput(category, controller);
categoryValue=input.getAttribute("value");
selectedItemTextNode=htmlNamespace.getElements(category,{attrName:"class", attrValue:"selectedItemText"})[0];
originalItemText=selectedItemTextNode.innerHTML;
selectedItemText=getSelectedCheckboxText(category);
leaves=htmlNamespace.getElements(category,{attrName:"class", attrValue:"leafItem"});
leavesIndex=leaves.length;
while(leavesIndex--)
{
leaf=leaves[leavesIndex];
leafValue=leaf.getAttribute("value");
leafAnchor=htmlNamespace.getElements(leaf,{tagName:"a"})[0];
if(leafAnchor)
{
leafIsHighlighted=htmlNamespace.hasStyle(LEAF_HIGHLIGHTED_CLASS, leafAnchor);
if(leafValue===categoryValue)
{
linkText=htmlNamespace.getElements(leaf,{attrName:"class", attrValue:"linkText"})[0];
selectedItemText=linkText.innerHTML;
suppressFromCount=htmlNamespace.hasStyle("suppressFromCount",leaf);
if(!leafIsHighlighted)
{
htmlNamespace.addStyle(SELECTED_CLASS, leaf);
htmlNamespace.addStyle(LEAF_HIGHLIGHTED_CLASS, leafAnchor);
}
}
else if(leafIsHighlighted)
{
htmlNamespace.removeStyle(LEAF_HIGHLIGHTED_CLASS, leafAnchor);
htmlNamespace.removeStyle(SELECTED_CLASS, leaf);
}
}
}
setSelectedItemBranchStyle(compSkin, category, selectedItemText, suppressFromCount);
if(selectedItemText===null||suppressFromCount===true)
{
if(suppressFromCount!==true)
{
selectedItemText="All";
}
htmlNamespace.addStyle(NO_SELECTED_ITEM_TEXT_CLASS, selectedItemTextNode);
}
else
{
numberOfBranchesWithSelections++;
htmlNamespace.removeStyle(NO_SELECTED_ITEM_TEXT_CLASS, selectedItemTextNode);
}
selectedItemTextNode.innerHTML=selectedItemText;
hasCategoryChanged=hasCategoryChanged||selectedItemText!==originalItemText;
}
if(hasCategoryChanged)
{
insertButtonNumber(filterNav, id, numberOfBranchesWithSelections, controller.showSelectedItemCount);
}
fireFilterUpdatedEvent(id);
},
setSelectedItemBranchStyle=function(compSkin, category, selectedItemText, suppressFromCount)
{
var isFilterMenuGroup,
branchHead=htmlNamespace.getElements(category,{attrName:"class", attrValue:"branch"})[0],
branchItem=htmlNamespace.getElements(branchHead,{attrName:"class", attrValue:"branchItem"})[0],
leafGroup=htmlNamespace.getElements(branchHead,{attrName:"class", attrValue:"leafGroup"})[0];
if(compSkin)
{
isFilterMenuGroup=compSkin.className==="filterNavmenuGroup";
}
if(selectedItemText!==null )
{
htmlNamespace.addStyle("itemSelected", branchHead);
if(isFilterMenuGroup!==true)
{
htmlNamespace.removeStyle("expanded", branchItem);
htmlNamespace.addStyle("leafGroupCollapsed", leafGroup);
htmlNamespace.addStyle("collapsed", branchItem);
}
}
else
{
htmlNamespace.removeStyle("itemSelected", branchHead);
}
},
updateServerSide=function(controller, updateParams)
{
var updateIDs=controller.updatesComponent,
updateComponentCallback,
id=controller.id;
if(controller.isResponsive)
{
updateComponentCallback=function(updatedComponentId)
{
if(updatedComponentId===id)
{
openDropDown(id);
}
else if(updatedComponentId===vg.constants.ALL_COMPS_PROCESSED)
{
fireFilterUpdatedEvent(id);
}
};
}
if(updateIDs)
{
updateIDs=id+COMMA+updateIDs;
}
else
{
updateIDs=id;
}
jsCBDupdateComponent({compIds:updateIDs, callback:updateComponentCallback, params:updateParams});
},
update=function(controller, updateParams)
{
if(controller.disableAJAX)
{
updateClientSide(controller);
}
else
{
updateServerSide(controller, updateParams);
}
},
clearSelection=function(controller)
{
var hiddenInputs=getCategoryInputs(controller.viewNode),
checkboxInputs=htmlNamespace.getElements(document.getElementById(
controller.id+DROP_DOWN_ID),{tagName:INPUT_ELEMENT,
attrName:TYPE_ATTRIBUTE,attrValue:CHECKBOX}),
i;
if(hiddenInputs)
{
i=hiddenInputs.length;
while(i--)
{
hiddenInputs[i].setAttribute(VALUE_ATTRIBUTE, EMPTY_STRING);
}
}
if(checkboxInputs)
{
i=checkboxInputs.length;
while(i--)
{
checkboxInputs[i].checked=false;
}
}
},
getCurrentlyExpandedBranches=function(controller)
{
var filterNav=controller.viewNode,
expandedBranches=htmlNamespace.getElements(filterNav,{attrName:"class", attrValue:"branchItem.expanded"}),
i,
branches=[],
hasBranchHeadClasses=function(item)
{
return htmlNamespace.hasStyle(BRANCH_CLASS, item)
&&htmlNamespace.hasStyle(HEAD_CLASS, item);
};
if(expandedBranches)
{
i=expandedBranches.length;
while(i--)
{
branches.push(htmlNamespace.findAncestor(expandedBranches[i],
{tagName:LI_ELEMENT}, hasBranchHeadClasses, controller.stopFilter));
}
}
return branches;
},
getCurrentlyExpandedBranchIds=function(controller)
{
var expandedBranchIds=EMPTY_STRING,
expandedBranches=getCurrentlyExpandedBranches(controller),
i=expandedBranches.length;
while(i--)
{
expandedBranchIds+=expandedBranches[i].getAttribute(ID_ATTRIBUTE);
expandedBranchIds+=COMMA;
}
return expandedBranchIds;
},
closeFilterMenuGroupMenus=function(controller)
{
var tree=controller.viewNode,
branches,
branchCounter,
branch,
branchItem,
isExpanded;
if(controller.isMenuGroup())
{
branches=getCurrentlyExpandedBranches(controller);
branchCounter=branches.length;
while(branchCounter--)
{
branch=branches[branchCounter];
branchItem=htmlNamespace.getFirstChild(branch);
controller._toggleBranch(branchItem, branch);
}
}
},
closeDropDowns=function(controller)
{
var id=controller.id,
button=document.getElementById(id+BUTTON_ID),
dropDownArrow=document.getElementById(id+DROP_DOWN_ARROW_ID),
dropDown=document.getElementById(id+DROP_DOWN_ID);
htmlNamespace.removeStyle(DROP_DOWN_OPEN_CLASS, button);
htmlNamespace.addStyle(DROP_DOWN_CLOSED_CLASS, dropDownArrow);
htmlNamespace.addStyle(DROP_DOWN_CLOSED_CLASS, dropDown);
closeFilterMenuGroupMenus(controller);
},
setStateOfExpandedBranches=function(controller, setStateExpanded)
{
var expandedBranchIds,
expandedBranches,
i;
expandedBranchIds=getCurrentlyExpandedBranchIds(controller);
expandedBranches=expandedBranchIds.split(COMMA);
i=expandedBranches.length;
while(i--)
{
stateKeeperNamespace._setState(expandedBranches[i], setStateExpanded, false);
}
},
onClearClick=function(controller)
{
if(controller.isResponsive&&!screenNamespace.isMediaQuerySizeLarge())
{
setStateOfExpandedBranches(controller, false);
}
clearSelection(controller);
update(controller);
htmlNamespace._fireCustomEvent(vg.event.FILTER_NAV_CLEAR, controller.viewNode);
},
handleHoverEvents=function(controller, target, shouldOpenDropdown)
{
var isMenuGroup=controller.isMenuGroup(),
isHoverableElement,
branch,
branchItem,
inDropdown=false,
leafGroup,
branchId,
isBranchCollapsed,
shouldToggleBranch,
toggleFunction;
if(isMenuGroup)
{
leafGroup=hasLeafGroupStyle(target)?target:htmlNamespace.findAncestor(target,{tagName:"ul"}, hasLeafGroupStyle, controller.stopFilter);
if(leafGroup)
{
target=leafGroup;
inDropdown=true;
}
isHoverableElement=inDropdown||hasSelectedItemTextStyle(target)||hasExpandCollapseClass(target);
if(isHoverableElement)
{
branch=htmlNamespace.findAncestor(target,{tagName:"li"}, null,
{tagName:"ul"});
branchItem=htmlNamespace.getElements(branch,{tagName:"span"},
hasBranchItemClass)[0];
branchId=branch.getAttribute(ID_ATTRIBUTE);
isBranchCollapsed=htmlNamespace.hasStyle(vg.TreeView.COLLAPSED_CLASS, branchItem);
clearTimeout(controller["hoverTimeout"+branchId]);
shouldToggleBranch=(isBranchCollapsed&&shouldOpenDropdown)||(!isBranchCollapsed&&!shouldOpenDropdown);
if(shouldToggleBranch)
{
toggleFunction=function()
{
controller._toggleBranch(branchItem, branch);
};
controller["hoverTimeout"+branchId]=setTimeout(toggleFunction, 25);
}
}
}
},
onMouseover=function(event, controller)
{
var target=jsCBDgetEventNode(event);
handleHoverEvents(controller, target, true);
},
onMouseout=function(event, controller)
{
var target=jsCBDgetEventNode(event),
toNode=event.toElement||event.relatedTarget;
if(!isMouseOutInLeafItems(controller, target, toNode)){
handleHoverEvents(controller, target, false);
}
},
isMouseOutInLeafItems=function(controller, target, toNode)
{
var toLeafGroup,
toBranch,
targetLeafGroup,
targetBranch=null,
isMenuGroup=controller.isMenuGroup(),
doNotMouseOut=false;
if(isMenuGroup){
toLeafGroup=hasLeafGroupStyle(toNode)?toNode:htmlNamespace.findAncestor(toNode,{tagName:"ul"}, hasLeafGroupStyle, controller.stopFilter);
if(!toLeafGroup&&hasExpandCollapseClass(toNode)&&hasSelectedItemTextClass(toNode)){
toLeafGroup=toNode;
}
toBranch=toLeafGroup?htmlNamespace.findAncestor(toLeafGroup,{tagName:"li"}, null,{tagName:"ul"}):null;
if(toBranch){
targetLeafGroup=hasLeafGroupStyle(target)?target:htmlNamespace.findAncestor(target,{tagName:"ul"}, hasLeafGroupStyle, controller.stopFilter);
if(!targetLeafGroup){
targetLeafGroup=target;
}
targetBranch=htmlNamespace.findAncestor(targetLeafGroup,{tagName:"li"}, null,{tagName:"ul"});
}
if(targetBranch&&toBranch&&targetBranch.getAttribute(ID_ATTRIBUTE)===toBranch.getAttribute(ID_ATTRIBUTE)){
doNotMouseOut=true;
}
}
return doNotMouseOut;
},
addEventListeners=function(controller)
{
var id=controller.id,
dropDownId=id+DROP_DOWN_ID,
button=document.getElementById(id+BUTTON_ID),
filterNav=controller.viewNode,
closeButtonElement=document.getElementById(id+CLOSE_BUTTON_ID),
clearButtonElement=document.getElementById(id+CLEAR_BUTTON_ID),
clearAnchorElement=document.getElementById(id+"ClearAnchor"),
hasCheckAllOptionClass,
checkAllElements,
hasUncheckAllOptionClass,
uncheckAllElements,
CLICK_EVENT="click",
MOUSEOUT_EVENT="mouseout",
MOUSEOVER_EVENT="mouseover",
i;
if(controller.isResponsive)
{
htmlNamespace.addEventListener(document.body, CLICK_EVENT,
function(event)
{
var targetNode=jsCBDgetEventNode(event),
clickedInFilterNav=vg.html.isAncestor(filterNav, targetNode);
if(clickedInFilterNav===false)
{
closeDropDowns(controller);
}
},
"filterNavBodyClick-"+id
);
htmlNamespace.addEventListener(button, CLICK_EVENT,
function()
{
if(htmlNamespace.hasStyle(DROP_DOWN_OPEN_CLASS, button))
{
closeDropDowns(controller);
}
else
{
openDropDown(id);
htmlNamespace._fireCustomEvent(vg.event.FILTER_NAV_OPEN, filterNav);
}
},
"filterNavToggleDropDown-"+id
);
htmlNamespace.addEventListener(closeButtonElement, CLICK_EVENT,
function()
{
closeDropDowns(controller);
},
"filterNavCloseDropDown-"+id
);
htmlNamespace.addEventListener(clearButtonElement, CLICK_EVENT,
function()
{
onClearClick(controller);
},
"filterNavClearClick-"+id
);
}
if(controller.isResponsive||controller.isMenuGroup())
{
hasCheckAllOptionClass=function(item)
{
return htmlNamespace.hasStyle("checkAllOption", item);
};
checkAllElements=htmlNamespace.getElements(document.getElementById(id),
{tagName:SPAN_ELEMENT}, hasCheckAllOptionClass);
if(checkAllElements)
{
i=checkAllElements.length;
while(i--)
{
htmlNamespace.addEventListenerMethod(checkAllElements[i], CLICK_EVENT, controller,
"_checkAll");
}
}
hasUncheckAllOptionClass=function(item)
{
return htmlNamespace.hasStyle("uncheckAllOption", item);
};
uncheckAllElements=htmlNamespace.getElements(document.getElementById(id),
{tagName:SPAN_ELEMENT}, hasUncheckAllOptionClass);
if(uncheckAllElements)
{
i=uncheckAllElements.length;
while(i--)
{
htmlNamespace.addEventListenerMethod(uncheckAllElements[i], CLICK_EVENT,
controller, "_uncheckAll");
}
}
}
htmlNamespace.addEventListener(controller.viewNode, MOUSEOVER_EVENT,
function(event)
{
onMouseover(event, controller);
},
"filterNavMouseover-"+id
);
htmlNamespace.addEventListener(controller.viewNode, MOUSEOUT_EVENT,
function(event)
{
onMouseout(event, controller);
},
"filterNavMouseout-"+id
);
if(clearAnchorElement)
{
htmlNamespace.addEventListener(clearAnchorElement, CLICK_EVENT,
function()
{
onClearClick(controller);
},
"filterNavonClearClick-"+id
);
}
},
addMouseEventListeners=function(id)
{
var closeButtonElement=document.getElementById(id+CLOSE_BUTTON_ID),
clearButtonElement=document.getElementById(id+CLEAR_BUTTON_ID),
filterButtonElement=document.getElementById(id+BUTTON_ID),
MOUSE_DOWN_EVENT="mousedown",
MOUSE_UP_EVENT="mouseup",
MOUSE_OUT_EVENT="mouseout",
PRESS_CLASS="press";
htmlNamespace.addEventListener(closeButtonElement, MOUSE_DOWN_EVENT,
function()
{
if(!cbd.browser.isTouchScreen)
{
htmlNamespace.addStyle(PRESS_CLASS, closeButtonElement);
}
}
);
htmlNamespace.addEventListener(closeButtonElement, MOUSE_UP_EVENT,
function()
{
htmlNamespace.removeStyle(PRESS_CLASS, closeButtonElement);
}
);
htmlNamespace.addEventListener(closeButtonElement, MOUSE_OUT_EVENT,
function()
{
if(htmlNamespace.hasStyle(PRESS_CLASS, closeButtonElement))
{
htmlNamespace.removeStyle(PRESS_CLASS, closeButtonElement);
}
}
);
htmlNamespace.addEventListener(clearButtonElement, MOUSE_DOWN_EVENT,
function()
{
if(!cbd.browser.isTouchScreen)
{
htmlNamespace.addStyle(PRESS_CLASS, clearButtonElement);
}
}
);
htmlNamespace.addEventListener(clearButtonElement, MOUSE_UP_EVENT,
function()
{
htmlNamespace.removeStyle(PRESS_CLASS, clearButtonElement);
}
);
htmlNamespace.addEventListener(clearButtonElement, MOUSE_OUT_EVENT,
function()
{
if(htmlNamespace.hasStyle(PRESS_CLASS, clearButtonElement))
{
htmlNamespace.removeStyle(PRESS_CLASS, clearButtonElement);
}
}
);
htmlNamespace.addEventListener(filterButtonElement, MOUSE_DOWN_EVENT,
function()
{
if(!cbd.browser.isTouchScreen)
{
htmlNamespace.addStyle(PRESS_CLASS, filterButtonElement);
}
}
);
htmlNamespace.addEventListener(filterButtonElement, MOUSE_UP_EVENT,
function()
{
htmlNamespace.removeStyle(PRESS_CLASS, filterButtonElement);
}
);
htmlNamespace.addEventListener(filterButtonElement, MOUSE_OUT_EVENT,
function()
{
if(htmlNamespace.hasStyle(PRESS_CLASS, filterButtonElement))
{
htmlNamespace.removeStyle(PRESS_CLASS, filterButtonElement);
}
}
);
},
checkUncheckAll=function(controller, clickedElement, shouldCheck)
{
var stopFilter=controller.stopFilter,
hasLeafGroupClass=function(item)
{
return htmlNamespace.hasStyle("leafGroup", item);
},
ulLeafGroup=htmlNamespace.findAncestor(clickedElement,{tagName:UL_ELEMENT},
hasLeafGroupClass, stopFilter),
hasBranchClass=function(item)
{
return htmlNamespace.hasStyle(BRANCH_CLASS,item);
},
currentListItem=htmlNamespace.findAncestor(clickedElement,{tagName:LI_ELEMENT},
hasBranchClass, stopFilter),
listItemId=currentListItem.getAttribute(ID_ATTRIBUTE),
checkboxInputs=htmlNamespace.getElements(ulLeafGroup,{tagName:INPUT_ELEMENT,
attrName:TYPE_ATTRIBUTE, attrValue:CHECKBOX}),
checkboxInput,
expandedBranchIds=getCurrentlyExpandedBranchIds(controller),
hiddenInput,
hiddenInputValue=EMPTY_STRING,
i,
updateParams;
if(checkboxInputs)
{
i=checkboxInputs.length;
while(i--)
{
checkboxInput=checkboxInputs[i];
checkboxInput.checked=shouldCheck;
hiddenInputValue+=checkboxInput.value;
hiddenInputValue+=COMMA;
}
currentListItem=htmlNamespace.findAncestor(checkboxInputs[0],{tagName:LI_ELEMENT},
null, stopFilter);
if(shouldCheck===false)
{
hiddenInputValue=EMPTY_STRING;
}
hiddenInput=getCategoryInput(currentListItem, controller);
hiddenInput.setAttribute(VALUE_ATTRIBUTE, hiddenInputValue);
updateParams=CHECKBOX_CLICKED_UPDATE_PARAMS+listItemId+AMPERSAND+
BRANCH_CLICKED_UPDATE_PARAMS+listItemId+AMPERSAND+
EXPANDED_BRANCH_IDS_UPDATE_PARAMS+expandedBranchIds;
update(controller, updateParams);
}
},
positionDropDown=function(id)
{
var button=document.getElementById(id+BUTTON_ID),
buttonWidth=htmlNamespace.getObjWidth(button),
buttonHeight=htmlNamespace.getObjHeight(button),
dropDownArrow=document.getElementById(id+DROP_DOWN_ARROW_ID),
dropDownArrowWidth=htmlNamespace.getWidthOfHiddenElem(dropDownArrow, false),
dropDownArrowHeight=htmlNamespace.getHeightOfHiddenElem(dropDownArrow, false),
dropDown=document.getElementById(id+DROP_DOWN_ID),
dropDownArrowStyle=dropDownArrow.style;
dropDownArrowStyle.left=buttonWidth/2 - dropDownArrowWidth/2+PIXELS;
dropDownArrowStyle.top=buttonHeight+PIXELS;
dropDown.style.top=buttonHeight+dropDownArrowHeight+PIXELS;
},
processBasicSelectItem=function(controller, clickedElement, currentListItem)
{
var input=getCategoryInput(currentListItem, controller),
currentListItemValue=currentListItem.getAttribute(VALUE_ATTRIBUTE),
clickJS=controller.clickJS;
if(!htmlNamespace.hasStyle(vg.TreeView.SELECTED_STYLE, clickedElement))
{
input.setAttribute(VALUE_ATTRIBUTE, currentListItemValue);
if(clickJS)
{
compNamespace._execEventHandler(clickJS, controller.viewNode);
}
update(controller);
}
},
processFacetCheckboxSelectItem=function(clickedElementCheckedAttribute, hiddenInput,
clickedElement)
{
var hiddenInputValue=hiddenInput.getAttribute(VALUE_ATTRIBUTE),
clickedElementValue=clickedElement.getAttribute(VALUE_ATTRIBUTE);
if(clickedElementCheckedAttribute===true)
{
hiddenInputValue+=COMMA;
hiddenInputValue+=clickedElementValue;
}
else
{
hiddenInputValue=hiddenInputValue.replace(clickedElementValue, EMPTY_STRING);
}
hiddenInput.setAttribute(VALUE_ATTRIBUTE, hiddenInputValue);
},
hasCategoryClass=function(item)
{
return htmlNamespace.hasStyle("category", item);
},
isListItemClickable=function(controller, clickedElement)
{
var isClickable=true,
isSelected=htmlNamespace.hasStyle(vg.TreeView.SELECTED_STYLE, clickedElement),
category;
if(isSelected)
{
category=htmlNamespace.findAncestor(clickedElement,{tagName:UL_ELEMENT}, hasCategoryClass, controller.stopFilter);
isClickable=!htmlNamespace.hasStyle("unfilterDisabled", category);
}
return isClickable;
},
processFacetGeneralSelectItem=function(clickedElement, currentListItem, isResponsive,
hiddenInput, stopFilter)
{
var parentListItem,
subAttribute,
currentListItemValue=EMPTY_STRING,
additionalUpdateParams=EMPTY_STRING,
currentBranchListItem,
hasBranchHeadClasses;
if(htmlNamespace.hasStyle(vg.TreeView.SELECTED_STYLE, clickedElement))
{
parentListItem=htmlNamespace.findAncestor(currentListItem,{tagName:LI_ELEMENT}, null,
stopFilter);
subAttribute=!htmlNamespace.hasStyle(HEAD_CLASS, parentListItem);
if(subAttribute===true)
{
currentListItemValue=parentListItem.getAttribute(VALUE_ATTRIBUTE);
}
}
else
{
currentListItemValue=currentListItem.getAttribute(VALUE_ATTRIBUTE);
if(!screenNamespace.isMediaQuerySizeLarge())
{
additionalUpdateParams+="&cbdFilterLeafSelected=true";
if(isResponsive)
{
hasBranchHeadClasses=function(item)
{
return htmlNamespace.hasStyle(BRANCH_CLASS, item)
&&htmlNamespace.hasStyle(HEAD_CLASS, item);
};
currentBranchListItem=htmlNamespace.findAncestor(clickedElement,
{tagName:LI_ELEMENT}, hasBranchHeadClasses, stopFilter);
stateKeeperNamespace._setState(currentBranchListItem.id, false, false);
}
}
}
hiddenInput.setAttribute(VALUE_ATTRIBUTE, currentListItemValue);
return additionalUpdateParams;
},
processFacetSelectItem=function(controller, clickedElement, currentListItem)
{
var stopFilter=controller.stopFilter,
hiddenInput=getCategoryInput(currentListItem, controller),
updateParams,
hasBranchHeadClasses=function(item)
{
return htmlNamespace.hasStyle(BRANCH_CLASS, item)
&&htmlNamespace.hasStyle(HEAD_CLASS, item);
},
currentBranchListItem=htmlNamespace.findAncestor(clickedElement,{tagName:LI_ELEMENT},
hasBranchHeadClasses, stopFilter),
branchListItemId=currentBranchListItem.getAttribute(ID_ATTRIBUTE),
expandedBranchIds=getCurrentlyExpandedBranchIds(controller),
clickJS=controller.clickJS,
clickedElementCheckedAttribute=clickedElement.checked,
isCheckbox=typeof clickedElementCheckedAttribute!=="undefined",
additionalUpdateParams;
if(isCheckbox)
{
updateParams=CHECKBOX_CLICKED_UPDATE_PARAMS+branchListItemId+AMPERSAND+
BRANCH_CLICKED_UPDATE_PARAMS+branchListItemId+AMPERSAND+
EXPANDED_BRANCH_IDS_UPDATE_PARAMS+expandedBranchIds;
processFacetCheckboxSelectItem(clickedElementCheckedAttribute, hiddenInput,
clickedElement);
}
else if(isListItemClickable(controller, clickedElement))
{
updateParams=BRANCH_CLICKED_UPDATE_PARAMS+branchListItemId+AMPERSAND+
EXPANDED_BRANCH_IDS_UPDATE_PARAMS+expandedBranchIds;
additionalUpdateParams=processFacetGeneralSelectItem(clickedElement, currentListItem,
controller.isResponsive, hiddenInput, stopFilter);
updateParams+=additionalUpdateParams;
}
if(clickJS)
{
compNamespace._execEventHandler(clickJS, controller.viewNode);
}
update(controller, updateParams);
};
vg.FilterNav=function(id, type, updatesComponent, clickJS, showSelectedItemCount, selectedItemCount, disableAJAX)
{
var titleElement=document.getElementById(id+"Title"),
button=document.getElementById(id+BUTTON_ID),
buttonLabel=document.getElementById(id+"_buttonLabel"),
dropDown=document.getElementById(id+DROP_DOWN_ID),
closeButtonElement=document.getElementById(id+CLOSE_BUTTON_ID),
clearTextElement=document.getElementById(id+"ClearText"),
clearButtonElement=document.getElementById(id+CLEAR_BUTTON_ID),
clearDivElement=document.getElementById(id+"Clear"),
filterNav;
this.type=type;
this.updatesComponent=updatesComponent;
this.clickJS=clickJS;
this._initTree(id, 250);
this.disableAJAX=disableAJAX||false;
this.isResponsive=cbd.page.isResponsiveCapable;
this.stopFilter={tagName:"span", attrName:"id", attrValue:id};
this.showSelectedItemCount=showSelectedItemCount;
if(this.isResponsive)
{
buttonLabel.innerHTML=titleElement.innerHTML;
clearButtonElement.innerHTML=clearTextElement.innerHTML;
insertButtonNumber(this.viewNode, id, selectedItemCount, showSelectedItemCount);
if(cbd.browser.isTouchScreen)
{
htmlNamespace.addStyle("noHover", dropDown);
htmlNamespace.addStyle("noHover", button);
}
else
{
htmlNamespace.addStyle("hover", dropDown);
htmlNamespace.addStyle("hover", button);
}
positionDropDown(id);
addMouseEventListeners(id);
htmlNamespace.addEventListenerMethod(window, vg.event.BREAK_POINT_CHANGE, this,
"_onBreakPointChange", "filterNav-BreakPointChange-"+id);
}
addEventListeners(this);
};
vg.FilterNav.SELECTED_CATEGORY="SelectedCat";
vg.FilterNav.CLEAR_CLASS="clear";
compNamespace.inheritPrototype(vg.FilterNav, vg.TreeView);
vg.FilterNav.prototype._onBreakPointChange=function(event)
{
var eventObject=event,
eventBreakPoint=eventObject.breakPoint,
previousBreakPoint=eventObject.previousBreakPoint,
id=this.id;
if((eventBreakPoint===SMALL_BREAKPOINT||eventBreakPoint===MEDIUM_BREAKPOINT)
&&previousBreakPoint===LARGE_BREAKPOINT)
{
positionDropDown(id);
setSelectedItemTextWidths(id);
}
else if(eventBreakPoint===LARGE_BREAKPOINT&&this.isMenuGroup())
{
closeFilterMenuGroupMenus(this);
}
};
vg.FilterNav.prototype._checkAll=function(event)
{
var clickedElement=jsCBDgetEventNode(event);
checkUncheckAll(this, clickedElement, true);
};
vg.FilterNav.prototype._uncheckAll=function(event)
{
var clickedElement=jsCBDgetEventNode(event);
checkUncheckAll(this, clickedElement, false);
};
vg.FilterNav.prototype._processSelectItem=function(clickedElement, currentListItem)
{
if(this.type==="basic")
{
processBasicSelectItem(this, clickedElement, currentListItem);
}
else
{
processFacetSelectItem(this, clickedElement, currentListItem);
}
};
vg.FilterNav.openDropDown=function(id)
{
openDropDown(id);
};
vg.FilterNav.getSelectionsForHistory=function(id)
{
var viewNode=htmlNamespace.getElement(id),
form=_cbdGetParentForm(viewNode),
formID=form.getAttribute(ID_ATTRIBUTE),
inputs=htmlNamespace.getElements(viewNode,{tagName:INPUT_ELEMENT}),
historyItems=[],
historyItem,
input,
inputValue,
inputID,
i=inputs.length;
while(i--)
{
input=inputs[i];
inputID=input.getAttribute(ID_ATTRIBUTE);
inputID=inputID.replace(formID+COLON, EMPTY_STRING);
if(inputID.indexOf(vg.FilterNav.SELECTED_CATEGORY) >=0)
{
inputValue=input.value;
if(inputValue===EMPTY_STRING)
{
inputValue=vg.TreeView.EMPTY_SELECTION;
}
historyItem=vg.util.createNameValObj(inputID, inputValue);
historyItems.push(historyItem);
}
}
return historyItems;
};
vg.FilterNav.processHistorySelections=function(id, historyObject)
{
var viewNode=htmlNamespace.getElement(id),
controller=compNamespace.getController(id),
form,
formID,
inputID,
input,
historyValue,
relevantHistoryObjects,
updateRequired=false,
name;
if(controller)
{
form=_cbdGetParentForm(viewNode);
formID=form.getAttribute(ID_ATTRIBUTE);
relevantHistoryObjects={};
for(name in historyObject)
{
if(historyObject.hasOwnProperty(name)&&name.indexOf(vg.FilterNav.SELECTED_CATEGORY) >=0)
{
inputID=formID+COLON+name;
input=document.getElementById(inputID);
historyValue=historyObject[name];
if(historyValue===vg.TreeView.EMPTY_SELECTION)
{
historyValue=EMPTY_STRING;
}
if(input.value!==historyValue)
{
updateRequired=true;
input.setAttribute(VALUE_ATTRIBUTE, historyValue);
}
}
}
if(updateRequired)
{
update(controller);
}
}
};
vg.FilterNav.hideCategory=function(id)
{
var itemGroup=document.getElementById(id),
controller=vg.comp.findController(id, true),
hiddenInput;
if(itemGroup&&!htmlNamespace.hasStyle("hiddenCategory", itemGroup))
{
htmlNamespace.addStyle("hiddenCategory", itemGroup);
hiddenInput=getCategoryInput(itemGroup, controller);
hiddenInput.setAttribute(VALUE_ATTRIBUTE, "");
update(controller);
}
};
vg.FilterNav.showCategory=function(id)
{
var itemGroup=document.getElementById(id),
listItem;
if(itemGroup)
{
htmlNamespace.removeStyle("hiddenCategory", itemGroup);
listItem=htmlNamespace.getElements(itemGroup,{tagName:LI_ELEMENT},
hasItemLabelBranchHeadClasses)[0];
setSelectedItemTextWidth(listItem);
}
};
}(vg, cbd, document, window, jsCBDgetEventNode, _cbdGetParentForm));
vg.FolderTree=function(id, updatesComponent, clickJS, loadBranchOnClick)
{
"use strict";
this.updatesComponent=updatesComponent;
this.clickJS=clickJS;
this.loadBranchOnClick=loadBranchOnClick;
this._initTree(id, 50);
this._setOnLoadSelectedItem();
};
vg.comp.inheritPrototype(vg.FolderTree, vg.TreeView);
vg.FolderTree.historyKey="fldrTreeSel";
vg.FolderTree.prototype._setOnLoadSelectedItem=function()
{
"use strict";
var selectedAnchor=vg.html.getElements(this.viewNode,{tagName:'a', attrName:'class'},
function(node){
return vg.html.hasStyle(vg.TreeView.SELECTED_STYLE, node);
});
if(selectedAnchor[0])
{
this.selected=selectedAnchor[0];
}
else
{
this.selected=vg.TreeView.EMPTY_SELECTION;
}
};
vg.FolderTree.prototype._processClick=function(clickedElement, currentListItem)
{
"use strict";
if(this.isToggleableBranch(currentListItem))
{
this._toggleBranch(clickedElement, currentListItem);
}
else
{
this._processSelectItem(clickedElement, currentListItem);
}
};
vg.FolderTree.prototype._toggleOrLoadBranch=function(clickedElement, currentListItem)
{
"use strict";
var liCss=currentListItem.className,
isVisible=liCss.indexOf(vg.TreeView.EXPANDED_CLASS) >=0,
targetNode=vg.html.getSibling(clickedElement,{tagName:'ul'},'+'),
that,
id,
updateFunction;
if(this.loadBranchOnClick&&!isVisible&&targetNode.childNodes.length===0)
{
that=this;
id=currentListItem.id;
updateFunction=function updateBranch(compId)
{
var anchor,
listItem;
if(compId===vg.constants.ALL_COMPS_PROCESSED)
{
listItem=document.getElementById(id);
anchor=vg.html.getFirstChild(listItem);
that._toggleBranch(anchor, listItem);
}
};
jsCBDupdateComponent(this.id, currentListItem, updateFunction);
}
else
{
this._toggleBranch(clickedElement, currentListItem);
}
};
vg.FolderTree.prototype._processSelectItem=function(clickedElement, currentListItem)
{
"use strict";
this._processSelection(clickedElement, true);
};
vg.FolderTree.prototype._processSelection=function(clickedElement, execClickJS)
{
"use strict";
var updateIDs,
clickJS;
if(clickedElement&&vg.html.hasStyle(vg.TreeView.SELECTED_STYLE, clickedElement))
{
return;
}
if(this.selected)
{
vg.html.removeStyle(vg.TreeView.SELECTED_STYLE, this.selected);
}
if(clickedElement)
{
vg.html.addStyle(vg.TreeView.SELECTED_STYLE, clickedElement);
}
this.selected=clickedElement;
clickJS=this.clickJS;
if(execClickJS&&clickJS)
{
vg.comp._execEventHandler(clickJS, this.viewNode);
}
updateIDs=this.updatesComponent;
if(updateIDs)
{
jsCBDupdateComponent({compIds:updateIDs});
}
};
vg.FolderTree.getSelectionForHistory=function(id)
{
"use strict";
var viewNode=vg.html.getElement(id),
controller=vg.comp.getController(id),
selectedValue=vg.TreeView.EMPTY_SELECTION,
selectedLeaf=controller.selected,
selectedLi,
historyItem;
if(selectedLeaf&&selectedLeaf!==selectedValue)
{
selectedLi=selectedLeaf.parentNode;
selectedValue=selectedLi.getAttribute("value");
}
historyItem=vg.util.createNameValObj(vg.FolderTree.historyKey, selectedValue);
return historyItem;
};
vg.FolderTree.processHistorySelections=function(id, historyObject)
{
"use strict";
var viewNode=vg.html.getElement(id),
controller=vg.comp.getController(id),
folderTreeSelection,
li,
linkToSelect;
if(controller)
{
folderTreeSelection=historyObject[vg.FolderTree.historyKey];
if(folderTreeSelection&&controller.selected!==folderTreeSelection)
{
if(folderTreeSelection===vg.TreeView.EMPTY_SELECTION)
{
controller._processSelection(null, false);
}
else
{
li=vg.html.getElements(viewNode,{tagName:'li', attrName:'value',
attrValue:folderTreeSelection})[0];
linkToSelect=li.firstChild;
controller._processSelection(linkToSelect, false);
controller._openAncestorBranches(li);
}
}
}
};


(function(cbd,document,vg,cbdcommon,jsCBDgetEventNode){
'use strict';
var OPEN_CSS='dropdownOpen',
CLOSED_CSS='itemListClosed',
htmlNamespace=vg.html,
SELECTED_STYLE="highlightLink",
COLLAPSED_CLASS="collapsed",
EXPANDED_CLASS="expanded",
ARROW_COLLAPSED_CLASS="arrowCollapsed",
ARROW_EXPANDED_CLASS="arrowExpanded",
_toggleBranch=function(leftNav, clickedElement, currentListItem)
{
var hasLeafGroupStyle=function(node)
{
return vg.html.hasStyle("leafGroup", node);
},
targetNode=vg.html.getElements(currentListItem,{tagName:"ul", attrName:"class"}, hasLeafGroupStyle)[0],
targetNodeStyle=targetNode.style,
liCss=currentListItem.className,
shouldClose=liCss.indexOf(EXPANDED_CLASS) >=0,
startPoint,
endPoint,
callBack,
coordinates,
hasArrowClass=function(node)
{
return vg.html.hasStyle("arrow", node);
},
arrow=vg.html.getElements(currentListItem,{tagName:"span", attrName:"class"},
hasArrowClass)[0],
vgNamespace=vg,
stateKeeperNamespace=cbd.StateKeeper;
if(shouldClose)
{
htmlNamespace.addOrRemoveStyle(SELECTED_STYLE, currentListItem.getElementsByTagName('a')[0], false);
currentListItem.getElementsByTagName("ul")[0].style.overflow="hidden";
startPoint=targetNode.offsetHeight;
endPoint=1;
if(arrow)
{
htmlNamespace.replaceClass(arrow, ARROW_EXPANDED_CLASS, ARROW_COLLAPSED_CLASS);
}
callBack=function()
{
if(arrow)
{
currentListItem.className=liCss.replace(EXPANDED_CLASS, COLLAPSED_CLASS);
htmlNamespace.replaceClass(targetNode, EXPANDED_CLASS, COLLAPSED_CLASS);
}
targetNodeStyle.height="auto";
stateKeeperNamespace._setState(currentListItem.id, false, false);
currentListItem.getElementsByTagName("ul")[0].style.overflow="";
};
coordinates={height:{from:startPoint, to:endPoint}};
vgNamespace.smil.animateElement(
{target:targetNode, attr:coordinates, duration:leftNav.closeAnimationDuration,
funcFinished:callBack});
}
else
{
htmlNamespace.addOrRemoveStyle(SELECTED_STYLE, currentListItem.getElementsByTagName('a')[0], true);
currentListItem.getElementsByTagName("ul")[0].style.overflow="hidden";
if(arrow)
{
htmlNamespace.replaceClass(arrow, ARROW_COLLAPSED_CLASS, ARROW_EXPANDED_CLASS);
currentListItem.className=liCss.replace(COLLAPSED_CLASS, EXPANDED_CLASS);
htmlNamespace.replaceClass(targetNode, COLLAPSED_CLASS, EXPANDED_CLASS);
}
startPoint=1;
endPoint=targetNode.offsetHeight;
targetNodeStyle.height="1px";
callBack=function()
{
targetNodeStyle.height="auto";
stateKeeperNamespace._setState(currentListItem.id, true, false);
currentListItem.getElementsByTagName("ul")[0].style.overflow="";
};
coordinates={height:{from:startPoint, to:endPoint}};
vgNamespace.smil.animateElement(
{target:targetNode, attr:coordinates, duration:leftNav.openAnimationDuration,
funcFinished:callBack});
}
};
vg.LeftNav=function(id, respConfig)
{
var parentElement,
columnsSupported=cbdcommon.support.hasStyle('columnCount'),
i,
hasBranchItemClass=function(node)
{
return htmlNamespace.hasStyle("branchItem", node);
};
this.base=vg.Controller;
this.base(id, null);
this.id=id;
this.type=this.viewNode.getAttribute("type");
this.respConfig=respConfig;
if(this.type!==null)
{
this.openAnimationDuration=250;
this.closeAnimationDuration=400;
this.branchItems=htmlNamespace.getElements(this.viewNode,{tagName:"span", attrName:"class"}, hasBranchItemClass);
if(this.branchItems)
{
i=this.branchItems.length;
while(i--)
{
htmlNamespace.addEventListenerMethod(this.branchItems[i], "click", this, "_onBranchItemClick");
}
}
}
if(cbd.page.isResponsiveCapable)
{
this.respDropDown=document.getElementById(id+'_respDropDown');
this.itemList=document.getElementById(id+'_itemList');
if(!columnsSupported)
{
parentElement=vg.html.findParentComponent(this.respDropDown);
vg.html.addStyle('columnsNotSupported', parentElement);
}
vg.html.addEventListenerMethod(this.respDropDown, 'click', this, 'onClick', id+'_LEFT_NAV_ON_CLICK');
vg.html.addEventListenerMethod(document.body, 'click', this, 'onBodyClick', id+'_CLOSE_LEFT_NAV');
}
};
vg.LeftNav.prototype=
{
onClick:function(event)
{
if(vg.html.hasStyle(OPEN_CSS, this.respDropDown))
{
this.close();
}
else
{
this.open();
}
},
onBodyClick:function(event)
{
var leftNavClicked=vg.event.isWithinNodes(event,[this.respDropDown, this.itemList]);
if(!leftNavClicked)
{
this.close();
}
},
open:function()
{
vg.html.addStyle(OPEN_CSS, this.respDropDown);
vg.html.removeStyle(CLOSED_CSS, this.itemList);
},
close:function()
{
vg.html.removeStyle(OPEN_CSS, this.respDropDown);
vg.html.addStyle(CLOSED_CSS, this.itemList);
},
expandBranch:function(elementClicked, currentListItem)
{
var foundAnotherOpenElement=false,
branchItems,
branchItemsCss,
isBranchExpanded,
otherNode,
i,
length;
length=this.branchItems.length;
for(i=0;i< length;i++)
{
branchItems=this.branchItems[i].nextSibling;
branchItemsCss=branchItems===null?'':branchItems.className;
isBranchExpanded=branchItemsCss.indexOf("expanded") > -1;
otherNode=this.branchItems[i].parentNode.id;
if(isBranchExpanded&&otherNode!==currentListItem.id)
{
foundAnotherOpenElement=true;
htmlNamespace.addOrRemoveStyle(SELECTED_STYLE, this.branchItems[i].getElementsByTagName('a')[0], false);
_toggleBranch(this, this.branchItems[i], this.branchItems[i].parentNode);
}
}
if(foundAnotherOpenElement)
{
_toggleBranch(this, elementClicked, currentListItem);
}
},
_onBranchItemClick:function(event)
{
var clickedElement=jsCBDgetEventNode(event),
currentListItem=htmlNamespace.findAncestor(clickedElement,{tagName:"li"}, null,{tagName:"ul"}),
branchHasChildren=htmlNamespace.hasStyle("hasLeaves", currentListItem),
isDisabledBranch=htmlNamespace.hasStyle("disabled", currentListItem),
isAccordianType=this.type!==null&&this.type.indexOf("accordion") > -1,
respConfigSmall,
isExpandCollapse;
if(branchHasChildren&&!isDisabledBranch)
{
if(this.respConfig)
{
respConfigSmall=this.respConfig.small;
}
isExpandCollapse=cbdcommon.screen.isMediaQuerySizeSmall()&&respConfigSmall&&respConfigSmall.supportExpandCollapse===true;
if(isAccordianType)
{
this.expandBranch(clickedElement, currentListItem);
}
else if(isExpandCollapse)
{
_toggleBranch(this, clickedElement, currentListItem);
}
}
}
};
}(cbd,document,vg,cbdcommon,jsCBDgetEventNode));


jsCBDtoggleNavBox=function(state)
{
var spans=vg.html.getElements(document.getElementsByTagName('body' )[0],
{
tagName:'div',
attrName:'class',
attrValue:/vg-NavboxContent/
},
function navBoxCheck(node )
{
vg.comp._lazyLoadComp(node.id);
var controller=node.jsController;
return(controller!==undefined
&&controller!=null
&&controller instanceof vg.NavBox );
}
);
for(var i=0;i < spans.length;i++)
{
_cbdToggleNavBoxById(spans[i].getAttribute('id' ), state, true );
}
cbd.StateKeeper._processEnqueuedStates();
}
jsCBDcloseNavBoxById=function(id )
{
vg.comp._lazyLoadComp(id);
var node=document.getElementById(id );
if(vg.util.isDefined(node)&&
vg.util.isDefined(node.jsController)&&
node.jsController instanceof vg.NavBox )
{
node.jsController.closeNow();
}
}
_cbdToggleNavBoxById=function(id, state, enqueue)
{
vg.comp._lazyLoadComp(id);
var node=document.getElementById(id );
if(node!==undefined&&node!=null )
{
if(node.jsController!==undefined
&&node.jsController instanceof vg.NavBox )
{
if(state)
{
node.jsController.close(enqueue );
}
else
{
node.jsController.open(enqueue );
}
}
}
}
jsCBDtoggleNavBoxById=function(id, state)
{
_cbdToggleNavBoxById(id, state, false);
}
jsCBDNavBoxChangeTitle=function(id, txt)
{
document.getElementById(id+'_headtxt').innerHTML=txt;
}
jsCBDNavBoxIsOpen=function(id )
{
vg.comp._lazyLoadComp(id);
var node=document.getElementById(id );
return(node&&node.jsController&&node.jsController.openflag)?true:false;
}
vg.NavBox=function(cfg)
{
"use strict";
var THIS=this,
listeningNode,
vgHtml=vg.html,
vgEvent=vg.event,
winShadeInitTransClass='winShadeInitTrans',
winShadeTwoContainer;
vg.util.attachJsonOptions(this, cfg);
this.base=vg.Controller;
this.base(THIS.id, null);
this.useHistory=true;
this.isWindowShade=this.type.indexOf('WINDOW_SHADE') >=0;
this.openedBy=null;
this.topEl=document.getElementById(this.id+'_top');
this.header=document.getElementById(this.id+'_head');
this.headTextLink=vgHtml.getFirstChild(document.getElementById(this.id+'_headtxt'));
listeningNode=this.getListeningNode();
if(listeningNode)
{
vgHtml.addEventListener(listeningNode, vgEvent.GSTR_HOVERSTART, function(){THIS.hover();});
if(cbd.browser.isTouchScreen)
{
vgHtml.addEventListener(listeningNode, 'click', function(e){THIS.nohover(e);});
vgHtml.addEventListener(listeningNode, vgEvent.GSTR_MOVE, function(e){THIS._hoverTouchMove(e);});
}
else
{
vgHtml.addEventListener(listeningNode, 'click', function(){THIS.click(false);});
vgHtml.addEventListener(listeningNode, vgEvent.GSTR_HOVEREND, function(e){THIS.nohover(e);});
}
}
this.bodyHeight=vgHtml.getObjHeight(this.id);
this.autohistoryflag=this.historyflag;
if(this.onExpand)
{
this.onExpand=new Function(this.onExpand);
}
if(this.openflag&&this.onExpand)
{
this.onExpand();
}
if(cbd.page.isNextGen)
{
THIS.easing="easeBothStrong";
if(this.isWindowShade&&this.openflag)
{
this._manageWindowShades();
}
this.navboxBody=document.getElementById(this.id);
if(vgHtml.isFixedHeight(this.navboxBody))
{
if(cbd.browser.isTouchScreen)
{
this.navboxBody.style.overflow="hidden";
vg.touchScreen._makeNodeScrollable(this.id);
}
}
}
if(this.openflag&&this.transDirection==="up")
{
this.topEl.style.top=-1*(this.bodyHeight)+"px";
winShadeTwoContainer=vg.html.getElements(vg.html.getElement('comp-'+this.id),{attrName:'class', attrValue:winShadeInitTransClass})[0];
jsCBDdeleteStyle(winShadeTwoContainer , winShadeInitTransClass);
}
if(this.openOnError===true)
{
vg.validation.pageHasValObservers=true;
}
};
vg.NavBox.openWindowShadeId;
vg.NavBox.prototype._triggerValidationObserver=function()
{
if(!this.openflag)
{
this.open();
}
}
vg.NavBox.prototype._updateValidationObserverErrors=function()
{
if(!this.openflag)
{
this.open();
}
}
vg.NavBox.prototype.getListeningNode=function()
{
return this.isWindowShade?this.headTextLink:this.header;
}
vg.NavBox.prototype.loadContent=function()
{
var id=this.viewNode.getAttribute('id' );
var node1=document.getElementById(id );
var THIS=this;
Populator._execute(node1, function(){THIS.contentLoaded();});
}
vg.NavBox.prototype.contentLoaded=function()
{
if(!this.saveState )
{
cbd.StateKeeper._processEnqueuedStates();
}
}
vg.NavBox.prototype.getNode=function()
{
var id=this.viewNode.getAttribute('id' );
return document.getElementById(id );
}
vg.NavBox.prototype.hover=function(e )
{
if(this.disabled )
{
return;
}
var eNode=jsCBDgetEventNode(e );
var id=this.viewNode.getAttribute('id' );
jsCBDaddStyle(document.getElementById(id+'_head' ), 'vg-NavboxHover' );
}
vg.NavBox.prototype._hoverTouchMove=function(e)
{
if(this.disabled )
{
return;
}
var eNode=jsCBDgetEventNode(e);
var id=this.viewNode.getAttribute('id' );
if(vg.event.isWithinNodes(e,[this.getListeningNode()]) )
{
jsCBDaddStyle(document.getElementById(id+'_head' ), 'vg-NavboxHover' );
}
else
{
jsCBDdeleteStyle(document.getElementById(id+'_head' ), 'vg-NavboxHover' );
}
}
vg.NavBox.prototype.nohover=function(e )
{
if(this.disabled )
{
return;
}
var eNode=jsCBDgetEventNode(e );
var id=this.viewNode.getAttribute('id' );
jsCBDdeleteStyle(document.getElementById(id+'_head' ), 'vg-NavboxHover' );
if(cbd.browser.isTouchScreen&&vg.event.isWithinNodes(e,[this.getListeningNode()]) )
{
this.click(false);
}
}
vg.NavBox.prototype.closeNow=function()
{
this.openflag=false;
var id=this.viewNode.getAttribute('id' );
jsCBDdeleteStyle(document.getElementById(id+'_top' ), 'vg-NavboxOpen' );
jsCBDaddStyle(document.getElementById(id+'_top' ), 'vg-NavboxClosed' );
}
vg.NavBox.prototype.close=function(enqueue )
{
if(this.openflag )
{
this.click(enqueue );
}
}
vg.NavBox.prototype.open=function(enqueue )
{
if(!this.openflag )
{
this.click(enqueue );
}
}
vg.NavBox.prototype.disable=function()
{
var id=this.viewNode.getAttribute('id' );
var navBoxHeadContent=document.getElementById(id+'_headcontent');
var span=vg.html.findAncestor(document.getElementById(id+'_headcontent'),{tagName:'span'});
this.disabled=true;
jsCBDaddStyle(document.getElementById(id+'_headtxt'), 'vg-NavboxDisabled' );
jsCBDaddStyle(span, 'disabled' );
}
vg.NavBox.prototype.enable=function()
{
var id=this.viewNode.getAttribute('id' );
var navBoxHeadContent=document.getElementById(id+'_headcontent');
var span=vg.html.findAncestor(document.getElementById(id+'_headcontent'),{tagName:'span'});
this.disabled=false;
jsCBDdeleteStyle(document.getElementById(id+'_headtxt'), 'vg-NavboxDisabled' );
jsCBDdeleteStyle(span, 'disabled' );
}
vg.NavBox.prototype.setStatusFromHistory=function(status )
{
if(status=='opened' )
{
this.open();
}
else if(status=='closed' )
{
this.close();
}
}
vg.NavBox.prototype.click=function(enqueue )
{
if(this.disabled )
{
return;
}
var id=this.viewNode.getAttribute('id' );
var saveState=true;
if(Populator.exists(document.getElementById(id ))&&!jsCBDisPopulatorLoaded(id ) )
{
saveState=false;
cbd.StateKeeper._enqueueState(id,!this.openflag );
}
if(saveState )
{
if(enqueue )
{
cbd.StateKeeper._enqueueState(id,!this.openflag );
}
else
{
cbd.StateKeeper._setState(id,!this.openflag );
}
}
this._click();
}
vg.NavBox.prototype._click=function()
{
var id=this.viewNode.getAttribute('id' ),
node=document.getElementById(id+'_body' ),
noHeight=(ie?1:0 ),
posTop=noHeight,
posBot=noHeight,
time=750,
currentHeight=null,
topId=id+'_top',
bodyId=id+'_body',
cbdAdapter=cbd.adapter,
AUTO='auto',
BLOCK='block',
DISPLAY='display',
HEIGHT='height',
NONE='none',
ZERO_PX='0px',
node_headcontent,
webUsageJS,
bodyNode=document.getElementById(bodyId );
if(this.autohistoryflag )
{
if(this.openflag )
{
cbd.history.add(id, 'closed', 'Closed vg.NavBox' );
}
else
{
cbd.history.add(id, 'opened', 'Opened vg.NavBox' );
}
}
if(this.bodyHeight===0&&!this.openflag )
{
this.bodyHeight=18;
currentHeight=vg.html.getObjHeight(id );
}
else
{
currentHeight=vg.html.getObjHeight(bodyId, 'block');
}
if(currentHeight > 18 )
{
this.bodyHeight=currentHeight;
}
if(cbd.page.isResponsive&&!this.openflag )
{
cbdAdapter.setStyle(bodyNode, DISPLAY, BLOCK );
cbdAdapter.setStyle(bodyNode, HEIGHT,  AUTO );
this.bodyHeight=cbdAdapter.getHeight(bodyNode );
cbdAdapter.setStyle(bodyNode, HEIGHT,  ZERO_PX );
cbdAdapter.setStyle(bodyNode, DISPLAY, NONE );
}
if(_cbdIsEnabled('anim.undo' )&&this.anim!==undefined&&!this.anim.doneflag )
{
time=this.anim.timeElapsed();
posTop=node.style.height.replace('px', '' );
if(this.openflag )
{
posBot=noHeight;
}
else
{
posBot=this.bodyHeight;
}
this.anim.stop();
delete this.anim;
}
else
{
if(this.openflag )
{
posTop=this.bodyHeight;
posBot=noHeight;
}
else
{
posTop=noHeight;
posBot=this.bodyHeight;
}
}
if(!this.openflag )
{
node.style.display=BLOCK;
node.style.height='1px';
}
node.style.overflow='hidden';
node.style.position='relative';
this.openflag=!this.openflag;
this.animate(posTop, posBot, time );
if(this.openflag )
{
jsCBDdeleteStyle(document.getElementById(topId ), 'vg-NavboxClosed' );
jsCBDaddStyle(document.getElementById(topId ), 'vg-NavboxOpen' );
}
if(cbd.page.isNextGen&&this.isWindowShade&&this.openflag)
{
this._manageWindowShades();
}
if(this.openflag )
{
this.loadContent();
}
node_headcontent=document.getElementById(id+'_headcontent' );
if(node_headcontent!=null)
{
webUsageJS=node_headcontent.getAttribute('webUsageJs');
if(webUsageJS!=null)
{
eval(webUsageJS);
}
}
};
vg.NavBox.prototype.animate=function(posTop, posBot, time )
{
"use strict";
var id=this.viewNode.getAttribute('id' ),
THIS=this,
velocity, dist;
if(this.transDur===null||isNaN(this.transDur) )
{
dist=Math.abs(
jsCBDAnimation.convertUnits(posTop )
- jsCBDAnimation.convertUnits(posBot ) );
velocity=(dist*1.0 )/time;
if(velocity < vg.NavBox.minVelocity )
{
time=parseInt(dist/vg.NavBox.minVelocity,10 );
}
}
else
{
time=this.transDur;
}
if(this.transDirection==="up")
{
this.anim=this.transDirectionUp(posTop, posBot, time);
}
else
{
this.anim=vg.smil.animateElement(id+'_body', 'height', time, 0, posTop, posBot, null, function NavBox_animFinished(){THIS.animationFinished();}, null, null, null, null, THIS.easing, this.disableGeoChangedEvent);
}
};
vg.NavBox.prototype.animationFinished=function()
{
"use strict";
delete this.anim;
var id=this.viewNode.getAttribute('id' ),
body=document.getElementById(id+'_body' ),
topNode=document.getElementById(id+'_top' ),
windShadeTwoContainer=topNode.parentNode;
if(this.openflag )
{
body.style.height='auto';
vg.comp._configureHiddenItems(body);
if(this.onExpand)
{
this.onExpand();
}
}
else
{
body.style.display='none';
body.style.height='0px';
vg.html.removeStyle('vg-NavboxOpen', topNode );
vg.html.addStyle('vg-NavboxClosed', topNode );
}
if(this.isWindowShade&&document.getElementById(id+'_head' ))
{
this._toggleWindowShadeLabel();
}
body.style.overflow='visible';
body.style.position='static';
if(this.transDirection==="up")
{
windShadeTwoContainer.style.position="static";
}
if(ie)
{
body.style.zoom='1';
}
if(!this.disableGeoChangedEvent){
vg.html._fireCustomEvent(vg.event.GEO_CHANGE, this.viewNode );
}
};
vg.NavBox.prototype._toggleWindowShadeLabel=function()
{
var newLabelText=(this.openflag )?this.headTextLink.getAttribute('openLabelText'):this.headTextLink.getAttribute('closeLabelText');
if(newLabelText&&newLabelText!=this.labelText)
{
vg.html.getFirstChild(this.headTextLink).innerHTML=newLabelText;
this.labelText=newLabelText;
}
}
vg.NavBox.prototype._manageWindowShades=function()
{
this.topEl.style.zIndex=(this.openflag&&this.isWindowShade)?"3":"";
if(vg.NavBox.openWindowShadeId!=null&&vg.NavBox.openWindowShadeId!=this.id)
{
var controller=vg.comp.getController(document.getElementById(vg.NavBox.openWindowShadeId));
if(controller&&controller.topEl)
{
controller.topEl.style.zIndex="";
controller.close();
controller.openedBy=null;
}
}
if(this.isCloseWindowShadeOnBlur)
{
vg.NavBox.openWindowShadeId=(this.openflag&&this.isWindowShade)?this.id:null;
}
}
vg.NavBox.minVelocity=0.3;
vg.NavBox.isDisabled=function(id)
{
vg.comp._lazyLoadComp(id);
var node=document.getElementById(id);
return(node&&node.jsController&&
node.jsController.disabled===false)?false:true;
}
vg.NavBox.setDisabled=function(id, disabled, disableStateKeeper)
{
vg.comp._lazyLoadComp(id);
var node=document.getElementById(id);
if(node&&node.jsController)
{
var headcontent=document.getElementById(id+'_headcontent');
if(!headcontent){return;}
var span=vg.html.findAncestor(headcontent,{tagName:'span'});
if(!span){return;}
var headtxt=document.getElementById(id+'_headtxt');
if(!headtxt){return;}
node.jsController.disabled=disabled;
var styleFunc=disabled?vg.html.addStyle:vg.html.removeStyle;
styleFunc('vg-NavboxDisabled', headtxt);
styleFunc('disabled', span);
}
if(!(disableStateKeeper===true))
{
}
}
vg.NavBox.toggleFloatingNavBoxById=function(id, callerId)
{
var node=document.getElementById(id );
node.jsController.openedBy=callerId;
_cbdToggleNavBoxById(id, node.jsController.openflag, false);
}
vg.NavBox.prototype._isOpenedBy=function(callerId)
{
if(this.openedBy==callerId)
{
return true;
}
else
{
return false;
}
}
vg.NavBox.prototype._isCloseWindowShadeOnBlur=function()
{
return this.isCloseWindowShadeOnBlur;
}
vg.NavBox.prototype._isSuppressHead=function()
{
return this.isSuppressHead;
}
vg.NavBox.prototype._isWindowShade=function()
{
return this.isWindowShade;
}
vg.NavBox.prototype.transDirectionUp=function(posTop, posBot, time )
{
"use strict";
var id=this.viewNode.getAttribute('id' ),
bodyNode=document.getElementById(id+'_body' ),
topNode=document.getElementById(id+'_top' ),
headNode=document.getElementById(id+'_head' ),
windShadeTwoContainer=topNode.parentNode,
getObjHeight=vg.html.getObjHeight,
THIS=this, clipBottom, clipTop, attributes;
windShadeTwoContainer.style.position="absolute";
bodyNode.style.height="auto";
clipBottom=getObjHeight(headNode)+"px";
clipTop=-getObjHeight(bodyNode)+"px";
if(this.openflag )
{
attributes={
top:{from:posTop, to:-posBot}
};
}
else
{
attributes={
top:{from:-posTop, to:posBot}
};
}
windShadeTwoContainer.style.clip="rect("+clipTop+",auto,"+clipBottom+",0px )";
this.anim=vg.smil.animateElement(id+'_top', attributes, time, 250, null, null, null, function NavBox_animFinished(){THIS.animationFinished();}, null, null, null, null, THIS.easing, this.disableGeoChangedEvent);
};


LinkBar=function(cfg)
{
vg.util.attachJsonOptions(this, cfg);
this.base=vg.Controller;
var THIS=this;
this.base(THIS.clientId, null);
this.id=THIS.clientId;
this.items=[];
this.isAjaxRequest=THIS.isAjaxRequest;
this.allSelected=THIS.isAllLinkItemsEnabled;
this.selectedIndex=parseInt(this.viewNode.getAttribute('selecteditem'),10);
var controller=this;
controller.initLinkBar();
};
LinkBar.prototype=
{
initLinkBar:function()
{
"use strict";
var selectedNode=this.items[this.selectedIndex],
respConfig=this.respConfig,
link,
ON_CLICK="onclick",
ORIG_ON_CLICK="orig_onclick";
if(!this.allSelected)
{
if(selectedNode!=null)
{
link=selectedNode.viewNode;
if(!link.hasAttribute(ON_CLICK)&&!link.hasAttribute(ORIG_ON_CLICK))
{
link.setAttribute(ORIG_ON_CLICK, link.getAttribute(ON_CLICK));
link.setAttribute(ON_CLICK, null);
}
}
}
if(respConfig)
{
this._initiateRespDropDownLinkBar();
}
},
_initiateRespDropDownLinkBar:function(){
"use strict";
var respConfigSml=this.respConfig.small,
respConfigMed=this.respConfig.medium,
showAsDropDown, showAsDropdownSml,
showAsDropdownMed;
if(respConfigSml)
{
showAsDropdownSml=respConfigSml.showAsDropdown;
if(showAsDropdownSml)
{
showAsDropDown=showAsDropdownSml;
}
}
if(respConfigMed)
{
showAsDropdownMed=respConfigMed.showAsDropdown;
if(showAsDropdownMed)
{
showAsDropDown=showAsDropdownMed;
}
}
if(showAsDropDown )
{
this.respDropdownLabel=vg.html.getElements(this.viewNode,{tagName:'span', attrName:'class', attrValue:'respDropdownLabel'})[0];
this.respMenu=vg.html.getElements(this.viewNode,{tagName:'span', attrName:'class', attrValue:'respMenu'})[0];
this.respMenuItems=vg.html.getElements(this.respMenu,{tagName:'span'});
this._createRespDropdownReferences();
this._addRespListenersForDropdown();
this._setRespWidth();
}
},
configLinkBar:function(selectedNode)
{
var i;
var itemsLength=this.items.length;
for(i=0;i < itemsLength;i++)
{
jsCBDtoggleLink(this.items[i].viewNode, true, "current");
this.items[i].selected=false;
}
if(!this.allSelected)
{
jsCBDtoggleLink({link:this.items[selectedNode.index].viewNode, state:false, disabledClass:"current", suppressDisableAttr:true});
}
selectedNode.selected=true;
this.selectedIndex=selectedNode.index;
this.viewNode.setAttribute('selecteditem',selectedNode.index);
cbd.StateKeeper._setState(this.id, String(this.selectedIndex), true);
},
addItem:function(controller)
{
var length=this.items.length;
this.items[length]=controller;
controller.index=length;
},
resetPipes:function()
{
var nodeContainerList;
if(this.respConfig&&this.respMenu)
{
nodeContainerList=this.respMenu.children;
}
else
{
nodeContainerList=this.viewNode.children;
}
var secondNodeIndex=(vg.html.hasStyle("linkBarLabel", nodeContainerList[0]) )?2:1;
var nodeContainerListLength=nodeContainerList.length;
var i;
for(i=secondNodeIndex;i < nodeContainerListLength;i++)
{
jsCBDdeleteStyle(nodeContainerList[i], "noPipe");
}
var isSelectedInd=vg.html.hasStyle("linkBarInd", this.viewNode);
var itemSelected=this.items[this.selectedIndex];
var nodeAfterSelected=itemSelected.viewNode.parentNode.nextSibling;
var isSelectedItemContainsBadgeIcon=vg.html.hasStyle("badgeItem", itemSelected.viewNode.parentNode);
if(isSelectedInd&&nodeAfterSelected&&!isSelectedItemContainsBadgeIcon)
{
jsCBDaddStyle(nodeAfterSelected, "noPipe");
}
},
_createRespDropdownReferences:function()
{
"use strict";
this.dropdownOpen=false;
},
_updateRespDropdownLabel:function(e)
{
"use strict";
this.respDropdownLabel.children[0].innerHTML=e.currentTarget.innerHTML;
var showAsDropDown=this.hasShowAsDropDown();
if(showAsDropDown)
{
this._toggleRespDropdown();
}
},
hasShowAsDropDown:function()
{
"use strict";
var mediaQuerySize=cbdcommon.screen.getMediaQuerySize(), showAsDropDown=false;
var respConfigMediaQuerySize=this.respConfig[mediaQuerySize];
if(respConfigMediaQuerySize)
{
showAsDropDown=respConfigMediaQuerySize.showAsDropdown;
}
return showAsDropDown;
},
_addRespListenersForDropdown:function()
{
"use strict";
vg.html.addEventListenerMethod(this.respDropdownLabel, 'click', this, '_toggleRespDropdown');
if(!cbdcommon.screen.isMediaQuerySizeLarge())
{
this._addRespEventListenersForLinkBarItems();
}
vg.html.addEventListenerMethod(window, vg.event.BROWSER_RESIZE_END, this, '_handleResizeEnd',"_handleResizeEnd"+this.id);
},
_addRespEventListenersForLinkBarItems:function()
{
"use strict";
var respMenuItems=this.respMenuItems;
var respMenuItemsLength=this.respMenuItems.length;
for(var i=0;i < respMenuItemsLength;i++){
vg.html.addEventListenerMethod(respMenuItems[i].firstChild, 'click', this, '_updateRespDropdownLabel',"_updateRespDropdownLabel"+i+this.id );
}
},
_removeRespEventListenersForLinkBarItems:function()
{
"use strict";
var respMenuItems=this.respMenuItems;
var respMenuItemsLength=this.respMenuItems.length;
for(var i=0;i < respMenuItemsLength;i++){
vg.html.removeEventListenerById(respMenuItems[i].firstChild, "_updateRespDropdownLabel"+i+this.id);
}
},
_toggleRespDropdown:function()
{
"use strict";
if(cbdcommon.screen.isMediaQuerySizeSmall()||cbdcommon.screen.isMediaQuerySizeMedium())
{
if(this.dropdownOpen)
{
this._closeRespDropdown();
}
else
{
this.respMenu.style.height="auto";
this._openRespDropdown();
}
this.dropdownOpen=!this.dropdownOpen;
}
},
_closeRespDropdown:function()
{
"use strict";
this._animateRespDropdown(vg.html.getObjHeight(this.respMenu), 0, 'close');
},
_handleResizeEnd:function(event)
{
"use strict";
if(!this.hasShowAsDropDown())
{
this.dropdownOpen=false;
this._closeRespDropdown();
vg.html.removeStyle("respMenuOpen", this.respMenu);
this.respMenu.style.borderBottom='0px';
}
this._setRespWidth();
this._updateRespLinkBarItemsListeners(event);
},
_updateRespLinkBarItemsListeners:function(event)
{
"use strict";
if(cbdcommon.screen.isMediaQuerySizeLarge())
{
this._removeRespEventListenersForLinkBarItems();
}
else
{
this._addRespEventListenersForLinkBarItems();
}
},
_setRespWidth:function()
{
"use strict";
var mediaQuerySize=cbdcommon.screen.getMediaQuerySize();
var respConfigMediaQuerySize=this.respConfig[mediaQuerySize];
if(respConfigMediaQuerySize&&respConfigMediaQuerySize.width)
{
this.viewNode.style.width=respConfigMediaQuerySize.width;
}
else
{
this.viewNode.style.width="";
}
},
_openRespDropdown:function()
{
"use strict";
var	respMenuHeight=vg.html.getObjHeight(this.respMenu),
fullDropdownHeight=respMenuHeight;
this._animateRespDropdown(0, fullDropdownHeight, 'open');
},
_animateRespDropdown:function(fromHeight, toHeight, mode)
{
"use strict";
var THIS=this;
if(mode==='open'&&!cbdcommon.screen.isMediaQuerySizeLarge())
{
this.respMenu.style.height=fromHeight;
vg.html.addStyle("respMenuOpen",this.respMenu);
}
var easingMethod="eastBothStrong";
var attributes={height:{from:fromHeight, to:toHeight}};
var afterAnim=function()
{
if(mode==='close'&&!cbdcommon.screen.isMediaQuerySizeLarge())
{
vg.html.removeStyle("respMenuOpen",THIS.respMenu);
THIS.respMenu.style.height="auto";
}
}
vg.smil.animateElement({target:this.respMenu, attr:attributes, duration:400, funcFinished:afterAnim, easeIn:true});
}
};
LinkBarItem=function(id,selectItemOnClick)
{
this.base=vg.Controller;
this.base(id, null, true);
this.id=id;
this.selected=false;
this.selectItemOnClick=selectItemOnClick;
var controller=this;
vg.html.addEventListener(this.viewNode, 'click', function(e){controller.selectLinkItem(e);});
this.parentController=vg.comp.findController(this.viewNode, true);
this.parentController.addItem(this);
};
LinkBarItem.prototype=
{
selectLinkItem:function(e)
{
this.executeOnClick(e);
this.highlightLink();
},
executeOnClick:function(e)
{
var vn=this.viewNode;
var clickTarget=vn.getAttribute('clicktarget');
var disabled=vn.getAttribute('linkdisabled');
if(clickTarget!=null&&!disabled)
{
vg.html.preventDefault(e);
vg.comp._execEventHandler(clickTarget, vn);
}
},
highlightLink:function()
{
var vn=this.viewNode;
if(this.selectItemOnClick&&!this.selected)
{
var pc=this.parentController;
pc.configLinkBar(this);
var respConfig=pc.respConfig;
if(respConfig&&pc.hasShowAsDropDown())
{
pc.respDropdownLabel.children[0].innerHTML=vn.innerHTML;
}
if(window.isNextGen)
{
pc.resetPipes();
}
}
var webUsageJS=vn.getAttribute('webUsageJs');
if(webUsageJS!=null)
{
eval(webUsageJS);
}
}
};
LinkBar.setLinkBarValue=function(id, value, fireOnClick)
{
var linkBarJSON=vg.comp.getController(id),
length=linkBarJSON.items.length,
linkBarItems=linkBarJSON.items;
for(var i=0;i < length;i++)
{
if(linkBarItems[i].id==value)
{
if(fireOnClick)
{
linkBarItems[i].selectLinkItem();
}
else
{
linkBarItems[i].highlightLink();
}
break;
}
}
};


CommandLinkBar=function(cfg)
{
"use strict";
vg.util.attachJsonOptions(this, cfg);
this.base=vg.Controller;
var THIS=this;
this.base(THIS.clientId, null);
this.id=THIS.clientId;
this.isAjaxRequest=THIS.isAjaxRequest;
var controller=this;
vg.util.execOnPageReady(function(){controller.initCommandLinkBar();});
};
CommandLinkBar.prototype=
{
initCommandLinkBar:function()
{
"use strict";
var respConfig=this.respConfig;
if(respConfig)
{
this._initiateRespDropDownCommandLinkBar();
}
},
_initiateRespDropDownCommandLinkBar:function(){
"use strict";
var respConfigSml=this.respConfig.small,
respConfigMed=this.respConfig.medium,
viewNode, showAsDropDown, showAsDropdownSml,
showAsDropdownMed;
if(respConfigSml)
{
showAsDropdownSml=respConfigSml.showAsDropdown;
if(showAsDropdownSml)
{
showAsDropDown=showAsDropdownSml;
}
}
if(respConfigMed)
{
showAsDropdownMed=respConfigMed.showAsDropdown;
if(showAsDropdownMed)
{
showAsDropDown=showAsDropdownMed;
}
}
if(showAsDropDown )
{
viewNode=this.viewNode;
this.respDropdownLabel=vg.html.getElements(viewNode,{tagName:'span', attrName:'class', attrValue:'respCLBarDropdownLabel'})[0];
this.respMenu=vg.html.getElements(viewNode,{tagName:'span', attrName:'class', attrValue:'respCLBarMenu'})[0];
this.respMenuItems=vg.html.getElements(this.respMenu,{tagName:'span', attrName:'class', attrValue:'comp-CommandLink'});
this._createRespDropdownReferences();
this._addRespListenersForDropdown();
this._setRespWidth();
}
},
_createRespDropdownReferences:function()
{
"use strict";
this.dropdownOpen=false;
},
_updateRespDropdownLabel:function(e)
{
"use strict";
this._updateRespDropdownElement(e);
var showAsDropDown=this.hasShowAsDropDown();
if(showAsDropDown)
{
this._toggleRespDropdown();
}
},
_updateRespDropdownElement:function(e)
{
"use strict";
var selectedItem=e.currentTarget, innerText=selectedItem.innerText;
if(innerText)
{
this.respDropdownLabel.children[0].innerHTML=innerText;
}
else
{
this.respDropdownLabel.children[0].innerHTML=selectedItem.textContent;
}
},
hasShowAsDropDown:function()
{
"use strict";
var mediaQuerySize=cbdcommon.screen.getMediaQuerySize(), showAsDropDown=false;
var respConfigMediaQuerySize=this.respConfig[mediaQuerySize];
if(respConfigMediaQuerySize)
{
showAsDropDown=respConfigMediaQuerySize.showAsDropdown;
}
return showAsDropDown;
},
_addRespListenersForDropdown:function()
{
"use strict";
vg.html.addEventListenerMethod(this.respDropdownLabel, 'click', this, '_toggleRespDropdown');
if(!cbdcommon.screen.isMediaQuerySizeLarge())
{
this._addRespEventListenersForLinkBarItems();
}
vg.html.addEventListenerMethod(window, vg.event.BROWSER_RESIZE_END, this, '_handleResizeEnd',"_handleResizeEnd"+this.id);
},
_addRespEventListenersForLinkBarItems:function()
{
"use strict";
var respMenuItems=this.respMenuItems;
var respMenuItemsLength=this.respMenuItems.length,commandLinkfirstChild;
for(var i=0;i < respMenuItemsLength;i++){
commandLinkfirstChild=respMenuItems[i].children[0];
var hasdisabledStyle=vg.html.hasStyle('disabled-text',commandLinkfirstChild);
var currentElement=vg.html.getElements(commandLinkfirstChild,{attrName:'class', attrValue:'current'})[0];
var enabledItem=!(hasdisabledStyle&&!currentElement);
if(enabledItem)
{
vg.html.addEventListenerMethod(respMenuItems[i].firstChild, 'click', this, '_updateRespDropdownLabel',"_updateRespDropdownLabel"+i+this.id );
}
}
},
_removeRespEventListenersForLinkBarItems:function()
{
"use strict";
var respMenuItems=this.respMenuItems;
var respMenuItemsLength=this.respMenuItems.length;
for(var i=0;i < respMenuItemsLength;i++){
vg.html.removeEventListenerById(respMenuItems[i].firstChild, "_updateRespDropdownLabel"+i+this.id);
}
},
_toggleRespDropdown:function()
{
"use strict";
if(cbdcommon.screen.isMediaQuerySizeSmall()||cbdcommon.screen.isMediaQuerySizeMedium())
{
if(this.dropdownOpen)
{
this._closeRespDropdown();
}
else
{
this.respMenu.style.height="auto";
this._openRespDropdown();
}
this.dropdownOpen=!this.dropdownOpen;
}
},
_closeRespDropdown:function()
{
"use strict";
this._animateRespDropdown(vg.html.getObjHeight(this.respMenu), 0, 'close');
},
_handleResizeEnd:function(event)
{
"use strict";
if(!this.hasShowAsDropDown()&&this.dropdownOpen)
{
this._closeRespDropdown();
this.dropdownOpen=false;
vg.html.removeStyle("respMenuOpen", this.respMenu);
this.respMenu.style.borderBottom='0px';
}
this._setRespWidth();
this._updateRespLinkBarItemsListeners(event);
},
_updateRespLinkBarItemsListeners:function(event)
{
"use strict";
if(cbdcommon.screen.isMediaQuerySizeLarge())
{
this._removeRespEventListenersForLinkBarItems();
}
else
{
this._addRespEventListenersForLinkBarItems();
}
},
_setRespWidth:function()
{
"use strict";
var mediaQuerySize=cbdcommon.screen.getMediaQuerySize(), respConfigMediaQuerySize=this.respConfig[mediaQuerySize],
viewNodeStyle=this.viewNode.style;
if(respConfigMediaQuerySize&&respConfigMediaQuerySize.width)
{
viewNodeStyle.width=respConfigMediaQuerySize.width;
}
else
{
viewNodeStyle.width="";
}
},
_openRespDropdown:function()
{
"use strict";
var	respMenuHeight=vg.html.getObjHeight(this.respMenu),
fullDropdownHeight=respMenuHeight;
this._animateRespDropdown(0, fullDropdownHeight, 'open');
},
_animateRespDropdown:function(fromHeight, toHeight, mode)
{
"use strict";
var THIS=this, isLargeScreen=cbdcommon.screen.isMediaQuerySizeLarge(), easingMethod="eastBothStrong", attributes, afterAnim,
transDur=400;
if(!this.hasShowAsDropDown()&&this.dropdownOpen)
{
transDur=1;
}
if(mode==='open'&&!isLargeScreen)
{
this.respMenu.style.height=fromHeight;
vg.html.addStyle("respMenuOpen",this.respMenu);
}
attributes={height:{from:fromHeight, to:toHeight}};
afterAnim=function()
{
if(mode==='close'&&!isLargeScreen)
{
vg.html.removeStyle("respMenuOpen",THIS.respMenu);
THIS.respMenu.style.height="auto";
}
};
vg.smil.animateElement({target:this.respMenu, attr:attributes, duration:transDur, funcFinished:afterAnim, easeIn:true});
}
};
CommandLinkBar.setValue=function(id, value, runClick)
{
var controller=vg.comp.getController(id);
if(controller)
{
if(controller.respMenuItems){
controller.selectedLink=parseInt(value);
if(runClick){
controller.respMenuItems[parseInt(value)].getElementsByTagName("a")[0].click();
}
}
else
{
controller.selectedLink=parseInt(value);
if(runClick){
respMenuItems=vg.html.getElements(this.respMenu,{tagName:'span',attrName:'class',attrValue:'comp-CommandLink'});
respMenuItems[parseInt(value)].getElementsByTagName("a")[0].click();
}
}
}
};


vg.AlertBox=function(cfg)
{
vg.util.attachJsonOptions(this, cfg);
this.base=vg.Controller;
var THIS=this;
this.id=THIS.id;
this.triggerSpot=THIS.triggerSpot;
this.onOpen=THIS.onOpen;
this.base(this.id, null);
this.contentHeight=null;
this.alertBox=vg.html.getElement(this.id);
this.alertContainer=vg.html.getElements(this.alertBox,{tagName:'div', attrName:'class', attrValue:'alertContainer'})[0];
this.alertTitleClosed=vg.html.getElements(this.alertBox,{tagName:'div', attrName:'class', attrValue:'alertBoxTitleClosed'})[0];
this.alertBoxContent=vg.html.getElements(this.alertBox ,{tagName:'div', attrName:'class', attrValue:'alertBoxContent'})[0];
this.alertTitleOpen=vg.html.getElements(this.alertBox,{tagName:'div', attrName:'class', attrValue:'alertBoxTitleOpen'})[0];
this.stateNode=vg.html.getElements(this.alertBox,{tagName:'div', attrName:'name', attrValue:'state'})[0];
if(this.triggerSpot=='ALERT_BOX')   vg.html.addEventListener(this.alertBox, 'click', function(e){THIS._expand()});
if(this.triggerSpot=='ALERT_ARROW')
{
vg.html.addEventListener(this.alertTitleClosed, 'click', function(e){THIS._expand()});
vg.html.addEventListener(this.alertTitleOpen, 'click', function(e){THIS._expand()});
}
if(this.alertBox.getAttribute('open')=='true')
{
this.alertBox.setAttribute('open','false');
vg.util.execOnPageReady(function(){THIS._expand();});
}
}
vg.AlertBox.prototype._expand=function()
{
var elem=this.alertBox;
var state=elem.getAttribute('open');
this.alertBoxStartPos=(this.alertBoxStartPos)?this.alertBoxStartPos:vg.html.getObjHeight(this.alertContainer);
var startPos=this.alertBoxStartPos;
var endPos=0;
var h=0;
vg.html.setStyle('open', this.stateNode);
h=vg.html.getHeightOfHiddenElem(this.alertContainer, true );
this.alertContainer.style.top='';
this.alertContainer.style.left='';
if(window.alertCount==undefined )
{
window.alertCount=2;
}
if(state=='false')
{
startPos=this.alertBoxStartPos;
endPos=h;
elem.setAttribute('open','true');
vg.html.setStyle('open', this.stateNode);
vg.html.setOpacity(this.alertBoxContent, '1');
window.alertCount++;
elem.style.zIndex=window.alertCount;
}
else
{
startPos=h;
endPos=this.alertBoxStartPos;
elem.setAttribute('open','false');
window.alertCount--;
elem.style.zIndex=2;
}
var attributes={
height:{from:startPos, to:endPos}
};
var THIS=this;
var afterAnimFunc=function(){THIS._postAnimation(state )};
var anim=vg.smil.animateElement(this.alertContainer, attributes, 250, 0, null, null, null, afterAnimFunc , null);
}
vg.AlertBox.prototype._postAnimation=function(state)
{
if(state=='false')
{
vg.html.setOpacity(this.alertBoxContent, '1');
vg.html.setStyle('open', this.stateNode);
if(safari||chrome)
{
this.alertBox.style.height="100%";
}
if(this.onOpen!=null)
{
var onOpenFunc=this.onOpen+"('"+this.id+"')";
eval(onOpenFunc);
}
}
else
{
vg.html.setOpacity(this.alertBoxContent, '0');
this.alertBoxContent.style.zoom="0";
vg.html.setStyle('closed', this.stateNode);
}
}
vg.AlertBox.prototype.show=function(state)
{
if(state==null) return;
this.alertBox.style.visibility=(state?'visible':'hidden');
}
vg.AlertBox.prototype.attachTo=function(newTd)
{
if(newTd==null) return;
newTd.appendChild(this.alertBox.parentNode );
}
vg.AlertBox.prototype.find=function(parentContainer, maxDepth)
{
var anArrAlertBoxes=[];
var arrAlertBoxControllers=[];
if(!parentContainer)
{
return
}
if(!maxDepth)
{
anArrAlertBoxes=vg.html.getElements(parentContainer,{tagName:'div', attrName:'class', attrValue:'alertBox'});
}
else
{
vg.html.getElementsRec(anArrAlertBoxes,maxDepth, parentContainer,{tagName:'div', attrName:'class', attrValue:'alertBox'});
}
for(var i=0;i < anArrAlertBoxes.length;i++)
{
arrAlertBoxControllers[i]=vg.comp.getController(anArrAlertBoxes[i]);
}
return arrAlertBoxControllers;
}
vg.AlertBox.prototype.close=function()
{
var elem=this.alertBox;
var state=elem.getAttribute('open');
if(state=='true')
{
this._expand();
}
}


SideTab=function(id, height)
{
this.base=vg.Controller;
this.base(id, null);
this.id=id;
this.height=height;
this.items=new Array();
this.selectedIndex;
this.currentItem;
this.defaultSideTabItem=this.viewNode.getAttribute('defaultSideTabItem');
this.sideTabCont=new Object;
this.sideTabCont=vg.html.getElement(this.id+":sideTabCont");
if(cbd.page.isNextGen)
{
this.supportCont=vg.html.getElements(this.sideTabCont.parentNode,{tagName:'div', attrName:'class', attrValue:'tabContainerContent'});
this.supportCont=this.supportCont[0];
}
this.sideTabBody=new Object;
this.sideTabBody=vg.html.getElement(this.id+":sideTabBody");
this.sideTabBody.scrollDiv=new Object;
this.sideTabBody.scrollDiv=vg.html.getElements(this.sideTabBody,{tagName:'div', attrName:'class', attrValue:'roundBoxScrollDiv'});
this.sideTabBody.scrollDiv=this.sideTabBody.scrollDiv[0];
var controller=this;
vg.util.execOnPageReady(function(){controller.configSideTab()});
}
SideTab.prototype=
{
configSideTab:function()
{
if(cbd.page.isNextGen)
{
this.fixTabHeight();
if(cbd.browser.isTouchScreen&&vg.html.isFixedHeight(this.sideTabBody))
{
this.sideTabBody.style.overflow="hidden";
this._updateScrollingProperties();
vg.html.addEventListenerMethod(this.viewNode, vg.event.DOM_CHANGE, this, '_updateScrollingProperties' );
}
}
else
{
this.adjustSideTabHeight();
}
},
_updateScrollingProperties:function()
{
if(cbd.browser.isTouchScreen&&cbd.page.isNextGen&&vg.html.isFixedHeight(this.sideTabBody))
{
vg.touchScreen._makeNodeScrollable(this.sideTabBody.getAttribute("id"));
}
},
addItem:function(controller)
{
var length=this.items.length;
this.items[length]=controller;
controller.index=length;
},
setSelectedSideTab:function(controller, execOnClick)
{
this.selectedIndex=controller.index;
this.selectItem(this.selectedIndex);
if(execOnClick)
{
eval(controller.viewNode.getAttribute('clickjs'));
}
cbd.StateKeeper._setState(this.id, this.selectedIndex+1+"", true);
},
selectItem:function(selectedIndex)
{
this.currentItem=this.items[selectedIndex];
if(this.items[selectedIndex].inState==false)
{
for(i=0;i < this.items.length;i++)
{
if(this.items[i].viewNode.className.indexOf("current") >=0 )
{
this.items[i].inState=false;
vg.html.replaceClass(this.items[i].viewNode, "current","unselected" );
}
}
vg.html.replaceClass(this.items[selectedIndex].viewNode, "unselected", "current" );
this.items[selectedIndex].inState=true;
(selectedIndex==0)?vg.html.replaceClass(this.viewNode, "secondaryTabs", "firstTab" ):vg.html.replaceClass(this.viewNode, "firstTab", "secondaryTabs" );
}
},
fixTabHeight:function()
{
var tabContHeight=0;
var minHeight=0;
var itemsLength=this.items.length;
for(var i=0;i < itemsLength;i++)
{
var item=this.items[i];
if(!item.header)
{
var iHeight=(firefox)?vg.html.getObjHeight(vg.html.getFirstChild(item.stTab)):vg.html.getObjHeight(item.viewNode);
minHeight=(iHeight > minHeight)?iHeight:minHeight;
}
}
for(var i=0;i < itemsLength;i++)
{
var item=this.items[i];
if(!item.header)
{
if(ieQuirksMode)
{
vg.html.setHeight(item.stTab, minHeight+"px");
}
else
{
item.stTab.style.minHeight=minHeight+"px";
}
}
tabContHeight+=vg.html.getObjHeight(item.viewNode);
}
tabContHeight+=vg.html.getObjHeight(this.supportCont);
var sideTabHeight=this.height;
if(sideTabHeight)
{
vg.html.setHeight(this.sideTabBody,
(sideTabHeight > tabContHeight?sideTabHeight:tabContHeight)+"px");
this.sideTabBody.style.overflow="auto";
}
},
adjustSideTabHeight:function()
{
var sideTabContHeight=vg.html.getObjHeight(this.sideTabCont);
var sideTabBodyScrollDiv=vg.html.getObjHeight(this.sideTabBody.scrollDiv.parentNode);
var offsetHeight=(this.selectedIndex==0)?20:30;
(sideTabContHeight > sideTabBodyScrollDiv )?vg.html.setHeight(this.sideTabBody,sideTabContHeight+offsetHeight+"px"):vg.html.setHeight(this.sideTabBody,'auto');
}
}
SideTabItem=function(args)
{
this.base=vg.Controller;
this.base(args.id, null, true);
this.id=args.id;
this.header=args.header;
this.inState=false;
this.selectItemOnClick=this.viewNode.getAttribute('selectItemOnClick');
this.stTab=vg.html.getElements(this.viewNode,{tagName:'div', attrName:'class'},
function(elem){return vg.html.hasStyle('stTab', elem);})[0];
var controller=this;
vg.html.addEventListener(this.viewNode, 'click', function(e){controller.selectedSideTab(e)});
this.parentController=vg.comp.findController(this.viewNode, true);
this.parentController.addItem(this);
}
SideTabItem.prototype=
{
selectedSideTab:function(e)
{
var execOnClick=jsCBDgetEventNode(e).tagName.toLowerCase()!='a'&&this.inState==false;
if(this.selectItemOnClick=="true")
{
this.parentController.setSelectedSideTab(this, execOnClick);
}
var webUsageJS=this.viewNode.getAttribute('webUsageJs');
if(webUsageJS!=null)
{
eval(webUsageJS);
}
}
}
SideTab.selectSideTabItem=function(id,index)
{
var controller=vg.comp.getController(id);
controller.setSelectedSideTab(controller.items[index], true);
}


Accordion=function(id, numberOfItems, type, selectedIndex)
{
cbd.loader.require('animation' );
this.id=id;
this.node=document.getElementById(id);
this.items=new Array();
this.node.jsController=this;
this.selectedIndex=selectedIndex;
this.numberOfItems=numberOfItems;
this.type=type;
}
Accordion.MOUSE_OVER_HEAD_CSS=MOUSE_OVER_HEAD_CSS='vg-AccHover';
AccordionItem=function(clientId, id)
{
this.id=id;
this.clientId=clientId;
this.node=document.getElementById(clientId);
this.parent=this.node.parentNode;
this.node.jsController=this;
var parentController=this.parent.jsController;
this.index=parentController.items.length;
parentController.items[this.index]=this;
if(parentController.selectedIndex==this.index)
{
this.selected=true;
}
var body=AccordionItem.getBody(this.node);
body.style.height=(ie)?"100%":"auto";
vg.html.addEventListener(this.node, 'mouseover', AccordionItem.highlight);
vg.html.addEventListener(this.node, 'mouseout', AccordionItem.unhighlight);
vg.html.addEventListener(this.node, 'click', AccordionItem.changeSelection);
AccordionItem.select(this.node, this.selected, true);
}
AccordionItem.highlight=function(e)
{
var eNode=jsCBDgetEventNode(e);
if(AccordionItem.insideTheHeader(eNode))
{
var item=AccordionItem.getItem(eNode);
if(!isEmpty(item))
{
var header=AccordionItem.getHeader(item);
jsCBDaddStyle(header, Accordion.MOUSE_OVER_HEAD_CSS);
}
}
}
AccordionItem.insideTheHeader=function(node)
{
var headerNode;
while(node!=null)
{
if(node.className&&node.className=='vg-AccItemHead')
{
headerNode=node;
break;
}
node=node.parentNode;
}
return headerNode!=null;
}
AccordionItem.unhighlight=function(e)
{
var eNode=jsCBDgetEventNode(e);
if(AccordionItem.insideTheHeader(eNode))
{
var item=AccordionItem.getItem(eNode);
if(!isEmpty(item))
{
var header=AccordionItem.getHeader(item);
jsCBDdeleteStyle(header, Accordion.MOUSE_OVER_HEAD_CSS);
}
}
}
AccordionItem.getHeader=function(item)
{
return(item!=null)?vg.html.getFirstChild(vg.html.getFirstChild(item)):null;
}
AccordionItem.getBody=function(item)
{
return(item!=null)?item.childNodes[1]:null;
}
AccordionItem.getItem=function(node)
{
return vg.html.findParentComponent(node, AccordionItem );
}
AccordionItem.changeSelection=function(e)
{
var item=AccordionItem.getItem(jsCBDgetEventNode(e));
if(!isEmpty(item))
{
var itemController=item.jsController;
var parentController=itemController.parent.jsController;
var items=parentController.items;
var selectedIndex=parentController.selectedIndex;
if(itemController.index!=selectedIndex)
{
AccordionItem.select(item, true);
AccordionItem.select(items[selectedIndex].node, false);
}
}
var webUsageJS=item.getAttribute('webUsageJs');
if(webUsageJS!=null)
{
eval(webUsageJS);
}
}
AccordionItem.animate=function(node, controller, parentController)
{
var body=AccordionItem.getBody(node);
var selectedIndex=parentController.selectedIndex;
var nodeIndex=controller.index;
var prevOpen=selectedIndex < nodeIndex;
var inAMiddle=nodeIndex < parentController.items.length;
var header=AccordionItem.getHeader(node);
var headerHeight=vg.html.getObjSizePosition(header).h;
if(parentController.type!='ACCORDION_FOUR')
{
headerHeight=headerHeight+4;
}
body.style.display='block';
var itemHeight=vg.html.getObjSizePosition(body).h+headerHeight;
var animateProp={attributeName:"height", dur:'750ms'}
var selectedNode=parentController.items[selectedIndex].node;
var anim=null;
var nodes=[];
var openNode=null;
var animFinished=function()
{
if(openNode )
{
openNode.style.height='auto';
}
}
if(prevOpen)
{
anim=vg.smil.animateElement(selectedNode, "height", 750, "0ms", itemHeight, headerHeight, null, animFinished );
}
else
{
openNode=node;
anim=vg.smil.animateElement(node, "height", 750, "0ms", headerHeight, itemHeight, null, animFinished );
}
var sameNode=selectedIndex==nodeIndex;
if(inAMiddle&&!sameNode)
{
openNode=node;
anim=vg.smil.animateElement(node, "height", 750, "0ms", headerHeight, itemHeight, null, animFinished);
vg.smil.animateElement(selectedNode, "height", 750, "1ms", itemHeight, headerHeight);
}
setTimeout(function(){node.style.height=(ie)?"100%":"auto";}, 1000);
}
AccordionItem.select=function(node, state, initLoad)
{
var SELECTED_STYLE="vg-AccItemSelected";
var NOT_SELECTED_STYLE="vg-AccItemDeselected";
var HORIZ_RULE="horizRule";
if(node.nodeType=='1')
{
var controller=node.jsController;
var parentController=controller.parent.jsController;
if(state)
{
if(!initLoad)
{
cbd.StateKeeper._setState(parentController.id, controller.id);
}
if(vg.smil.isLoaded())
{
AccordionItem.animate(node, controller, parentController);
}
parentController.selectedIndex=controller.index;
if(parentController.numberOfItems - 1==controller.index)
{
jsCBDaddStyle(node, HORIZ_RULE);
}
jsCBDaddStyle(node, SELECTED_STYLE);
jsCBDdeleteStyle(node, NOT_SELECTED_STYLE);
}
else
{
if(parentController.numberOfItems - 1==controller.index)
{
jsCBDdeleteStyle(node, HORIZ_RULE);
}
jsCBDaddStyle(node, NOT_SELECTED_STYLE);
jsCBDdeleteStyle(node, SELECTED_STYLE);
}
}
}


NineBoxFilter=function(id)
{
this.base=vg.Controller;
this.base(id, null);
this.id=this.viewNode.getAttribute('id');
this.nineBoxTable=vg.html.getElements(document.getElementById(this.id),{tagName:'table', attrName:'class', attrValue:'nineBoxSelector pad'});
this.items=vg.html.getElements(document.getElementById(this.id),{tagName:'div', attrName:'class', attrValue:'selected'});
this.headers=vg.html.getElements(document.getElementById(this.id),{tagName:'a', attrName:null, attrValue:null});
this.onClickJS=this.viewNode.getAttribute('clickjs');
this.hiddenInput=document.getElementById(this.id+"_hiddenInput");
this.selectedItems=this.hiddenInput.value;
this.overItem=false;
this.allSelected=(this.selectedItems=="1,2,3,4,5,6,7,8,9")?true:false;
this.selectItems(this.selectedItems,true);
var controller=this;
for(var i=0;i < 9;i++)
{
vg.html.addEventListener(this.items[i], 'mousedown', function(e){controller.onItem(e)});
vg.html.addEventListener(this.items[i], 'mouseover', function(e){controller.onItem(e)});
vg.html.addEventListener(this.items[i], 'mouseout', function(e){controller.onItem(e)});
vg.html.addEventListener(this.items[i], 'click', function(e){controller.onItem(e)});
}
for(var i=0;i < 6;i++)
{
vg.html.addEventListener(this.headers[i], 'mousedown', function(e){controller.onColRowHeader(e)});
vg.html.addEventListener(this.headers[i], 'mouseover', function(e){controller.onColRowHeader(e)});
vg.html.addEventListener(this.headers[i], 'mouseout', function(e){controller.onColRowHeader(e)});
vg.html.addEventListener(this.headers[i], 'click', function(e){controller.onColRowHeader(e)});
}
};
NineBoxFilter.prototype=
{
onItem:function(e)
{
var eNode=jsCBDgetEventNode(e);
var state=e.type;
var itemNo=this.getItemNo(eNode)-1;
if(state=="mouseover"&&this.allSelected) state="mouseoverAll";
if(state=="mouseout"&&this.allSelected) state="mouseoutAll";
if(state=="mousedown"&&this.allSelected) state="mousedownAll";
var isSelected=this.isSelected(itemNo);
switch(state)
{
case "mouseover":
isSelected?vg.html.addOrRemoveStyle("deselectedHover", eNode, true):vg.html.addOrRemoveStyle("selectedHover", eNode, true);
break;
case "mouseout":
isSelected?vg.html.addOrRemoveStyle("deselectedHover", eNode, false):vg.html.addOrRemoveStyle("selectedHover", eNode, false);
break;
case "mousedown":
this.setItemState(itemNo);
this.allSelected=(this.getSelected().length==9);
break;
case "mouseoverAll":
this.overItem=true;
this.changeClassOnAll(false);
vg.html.replaceClass(eNode, eNode.className, "selected selectedHover");
break;
case "mouseoutAll":
this.overItem=false;
var controller=this;
setTimeout(function()
{
if(!controller.overItem)
{
controller.changeClassOnAll(true);
}
}, 25 );
break;
case "mousedownAll":
this.toggleAll(false);
this.setItemState(itemNo);
this.allSelected=false;
break;
case "click":
this.setHiddenInputValue();
if(this.onClickJS!=null)
{
eval(this.onClickJS).call(this, this.getSelected());
}
break;
default:
break;
}
},
onColRowHeader:function(e)
{
var eNode=jsCBDgetEventNode(e);
var itemID=this.getItemID(eNode);
var state=e.type;
if(state=="mouseover"&&this.allSelected) this.changeClassOnAll(false);
if(state=="mouseout"&&this.allSelected) this.changeClassOnAll(true);
switch(itemID)
{
case "value":
this.headerItemChange(0,3,6,itemID,state);
break;
case "blend":
this.headerItemChange(1,4,7,itemID,state);
break;
case "growth":
this.headerItemChange(2,5,8,itemID,state);
break;
case "large":
this.headerItemChange(0,1,2,itemID,state);
break;
case "mid":
this.headerItemChange(3,4,5,itemID,state);
break;
case "small":
this.headerItemChange(6,7,8,itemID,state);
break;
default:
break;
}
},
headerItemChange:function(no1,no2,no3,itemID,state)
{
var item=new Array();
item[0]=this.items[no1];
item[1]=this.items[no2];
item[2]=this.items[no3];
item[0].num=no1;
item[1].num=no2;
item[2].num=no3;
var axisSelected=true;
for(i=0;i < item.length;i++)
{
if(!this.isSelected(item[i].num))
{
axisSelected=false;
break;
}
}
var changeClass=(axisSelected&&!this.allSelected)?"deselectedHover":"selectedHover";
switch(state)
{
case "mouseover":
this.overItem=true;
for(i=0;i < item.length;i++)
{
vg.html.addOrRemoveStyle(changeClass, item[i], true)
}
break;
case "mouseout":
for(i=0;i < item.length;i++)
{
vg.html.addOrRemoveStyle(changeClass, item[i], false)
}
break;
case "mousedown":
if(this.allSelected)
{
this.toggleAll(false);
}
var select=(!axisSelected||this.allSelected);
for(i=0;i < item.length;i++)
{
this.setItemState(item[i].num, select);
}
break;
case "click":
this.setHiddenInputValue();
if(this.onClickJS!=null)
{
eval(this.onClickJS).call(this, this.getSelected());
}
break;
default:
break;
}
this.allSelected=(this.getSelected().length==9 );
},
selectItems:function(items,clearAll)
{
var itemsArr=new Array();
itemsArr=items.split(',');
if(clearAll)
{
this.toggleAll(false);
this.allSelected=false;
}
for(i=0;i < itemsArr.length;i++)
{
var itemNo=parseInt(itemsArr[i])-1;
if(itemNo >=0&&itemNo <=8) this.setItemState(itemNo,true);
}
if(this.isAllSelected()) this.allSelected=true;
this.setHiddenInputValue();
},
deselectItems:function(items,clearAll)
{
var itemsArr=new Array();
itemsArr=items.split(',');
if(clearAll)
{
this.toggleAll(true);
}
for(i=0;i < itemsArr.length;i++)
{
var itemNo=parseInt(itemsArr[i])-1;
if(itemNo >=0&&itemNo <=8) this.setItemState(itemNo,false);
}
this.allSelected=false;
this.setHiddenInputValue();
},
changeClassOnAll:function(state)
{
for(var i=0;i < this.items.length;i++)
{
vg.html.replaceClass(this.items[i], this.items[i].className, state?"selected":"deselected")
}
},
toggleAll:function(state)
{
for(var i=0;i < this.items.length;i++)
{
this.setItemState(i,state);
}
},
setItemState:function(itemNo,setStateValue)
{
this.items[itemNo].state=(setStateValue!=null)?setStateValue:!this.isSelected(itemNo);
vg.html.replaceClass(this.items[itemNo], this.items[itemNo].className, this.isSelected(itemNo)?"selected":"deselected")
},
getState:function(itemNo)
{
return this.items[itemNo].state;
},
isSelected:function(itemNo)
{
return this.getState(itemNo);
},
isAllSelected:function()
{
for(var i=0;i <  this.items.length;i++)
{
if(!this.isSelected(i))
{
return false;
}
}
return true;
},
getSelected:function()
{
var selectedItems=new Array();
for(var i=0;i <  this.items.length;i++)
{
if(this.isSelected(i))
{
selectedItems.push(this.items[i].id);
}
}
return selectedItems;
},
getSelectedItemsStr:function()
{
var selectedItemsStr="";
var selectedItems=this.getSelected();
for(i=0;i < selectedItems.length;i++)
{
var sep=(i==selectedItems.length -1)?"":",";
selectedItemsStr+=this.getItemNo(vg.html.getElement(selectedItems[i]) )+sep;
}
return(selectedItemsStr=="")?" ":selectedItemsStr;
},
getDeselected:function()
{
var deselectedItems=new Array();
for(var i=0;i <  this.items.length;i++)
{
if(!this.isSelected(i))
{
deselectedItems.push(this.items[i].id);
}
}
return deselectedItems;
},
getItemID:function(eNode)
{
var itemID=eNode.id.split(":");
return itemID[itemID.length-1];
},
getItemNo:function(eNode)
{
var itemID=this.getItemID(eNode);
return parseInt(itemID.slice(4));
},
setHiddenInputValue:function(eNode)
{
this.hiddenInput.value=this.getSelectedItemsStr();
}
};
NineBoxFilter.getSelectedItems=function(id)
{
var controller=vg.comp.getController(document.getElementById(id));
return controller.getSelected();
};
NineBoxFilter.getDeselectedItems=function(id)
{
var controller=vg.comp.getController(document.getElementById(id));
return controller.getDeselected();
};
NineBoxFilter.selectAll=function(id)
{
var controller=vg.comp.getController(document.getElementById(id));
controller.selectItems("1,2,3,4,5,6,7,8,9",true)
};
NineBoxFilter.deselectAll=function(id)
{
var controller=vg.comp.getController(document.getElementById(id));
controller.deselectItems("1,2,3,4,5,6,7,8,9",true)
};
NineBoxFilter.selectItems=function(id,items,clearAll)
{
var controller=vg.comp.getController(document.getElementById(id));
controller.selectItems(items,clearAll);
};
NineBoxFilter.deselectItems=function(id,items,clearAll)
{
var controller=vg.comp.getController(document.getElementById(id));
controller.deselectItems(items,clearAll);
};


(function(cbd, vg, cbdcommon, ieQuirksMode)
{
"use strict";
var _constants=
{
COLON:":",
COLON_ESCAPED:"\\:",
DIVIDER_HEIGHT:1,
DIVIDER_SELECTOR:".x-adjustablePanelDivider",
DRAG_CONSTRAIN_MODULE:"dd-constrain",
EMPTY_STR:"",
GRIPPER_DRAG_EVENT:"drag:drag",
GRIPPER_SELECTOR:".x-adjustablePanelDividerGripper",
HEIGHT:"height",
ID:"id",
NODE:"node",
PIXELS:"px",
POUND:"#",
STRING:"string",
TRUE:"true",
MIN_HEIGHT:ieQuirksMode?1:0
},
_fixZeroHeight=function(valueToCheck )
{
return(valueToCheck > 0 )?valueToCheck:_constants.MIN_HEIGHT;
},
_escapeColons=function(stringToEscape )
{
return stringToEscape.replace(_constants.COLON, _constants.COLON_ESCAPED );
},
_convertPxToInt=function(stringToConvert )
{
return parseInt(stringToConvert.replace(_constants.PIXELS, _constants.EMPTY_STR ) , 10 );
},
_createDividerYuiDragObject=function(dividerSelector, containerSelector )
{
cbd.getYUI().use(_constants.DRAG_CONSTRAIN_MODULE, function(Y)
{
new Y.DD.Drag({
node:dividerSelector
}).addHandle(
_constants.GRIPPER_SELECTOR
).plug(
Y.Plugin.DDConstrained,
{
constrain:containerSelector,
stickY:_constants.TRUE
}
);
});
},
_gripperDragEvent=function(e)
{
var dragItem=e.target,
HEIGHT=_constants.HEIGHT,
panels,
dragNode,
dragNodeY,
topPanel,
topPanelHeight,
topPanelInitHeight,
topPanelTopBoundary,
botPanel,
botPanelHeight,
botPanelInitHeight,
availableHeight;
if(dragItem )
{
dragNode=dragItem.get(_constants.NODE );
dragNodeY=dragItem.actXY[1]- _constants.DIVIDER_HEIGHT;
panels=dragNode.adjustablePanels;
topPanel=panels.top;
topPanelInitHeight=_convertPxToInt(topPanel.getStyle(HEIGHT ) );
topPanelTopBoundary=topPanel.getY();
botPanel=panels.bot;
botPanelInitHeight=_convertPxToInt(botPanel.getStyle(HEIGHT ) );
availableHeight=topPanelInitHeight+botPanelInitHeight;
topPanelHeight=_fixZeroHeight(dragNodeY - topPanelTopBoundary );
topPanel.setStyle(HEIGHT, topPanelHeight );
botPanelHeight=_fixZeroHeight(availableHeight - topPanelHeight );
botPanel.setStyle(HEIGHT, botPanelHeight );
}
},
_addDragManagerEventListener=function()
{
cbd.getYUI().use(_constants.DRAG_CONSTRAIN_MODULE, function(Y)
{
Y.DD.DDM.on(_constants.GRIPPER_DRAG_EVENT, _gripperDragEvent );
});
};
vg.AdjustablePanel=function(containerId )
{
var CBD_YUI=cbd.getYUI(),
POUND=_constants.POUND,
HEIGHT=_constants.HEIGHT,
containerSelector=POUND+_escapeColons(containerId ),
containerEl=CBD_YUI.one(containerSelector ),
numDividers,
dividerIds,
dividerIdx,
dividerId,
dividerEls,
dividerEl,
dividerSelector;
if(containerEl )
{
this.base=vg.Controller;
this.base(containerId, null );
this.id=containerId;
this.dividerEls=containerEl.all(_constants.DIVIDER_SELECTOR );
dividerEls=this.dividerEls;
numDividers=dividerEls.size();
for(dividerIdx=0;dividerIdx < numDividers;dividerIdx++)
{
dividerEl=dividerEls.item(dividerIdx);
dividerEl.adjustablePanels=
{
top:dividerEl.previous(),
bot:dividerEl.next()
};
dividerId=dividerEl.getAttribute(_constants.ID );
dividerSelector=POUND+_escapeColons(dividerId );
_createDividerYuiDragObject(dividerSelector, containerSelector );
}
if(numDividers > 0 )
{
_addDragManagerEventListener();
}
}
};
}(cbd, vg, cbdcommon, ieQuirksMode));

