
if(!window.vg )
{
vg=new Object();
}
vg.constants={
COL_1_WIDTH:64,
COL_2_WIDTH:146,
COL_3_WIDTH:228,
COL_4_WIDTH:310,
COL_5_WIDTH:392,
COL_6_WIDTH:474,
COL_7_WIDTH:556,
COL_8_WIDTH:638,
COL_9_WIDTH:720,
COL_10_WIDTH:802,
COL_11_WIDTH:884,
COL_12_WIDTH:966,
GRID_MAIN_WIDTH:1002,
COMP_ID_PFX:"comp-",
LOOSE_VALIDATORS_ID:"NONE"
}
vg.constants.COMP_ID_PFX_LENGTH=vg.constants.COMP_ID_PFX.length;
vg.constants.ALL_COMPS_PROCESSED=ALL_COMPS_PROCESSED="ALL_COMPS_PROCESSED";
vg.constants.COMP_OPEN=COMP_OPEN="<span cmp=\"true\" id=\"";
vg.constants.COMP_END=COMP_END="<span cid=\"";
vg.constants.COMP_CLOSE=COMP_CLOSE="</span>";
vg.constants.CONFIG=CONFIG="_vgi_config";
vg.constants.ADOBE=ADOBE="a:";
vg.constants.FLASH=FLASH="f:";
vg.constants.MODEM=MODEM="m:";
vg.constants.HIDDEN=HID="hidden";
vg.constants.VISIBLE=VIS="visible";
vg.constants.LEFT_ARROW=37;
vg.constants.RIGHT_ARROW=39;
vg.constants.FORM_FIELD_INFO=FORM_FIELD_INFO="form-field-info";


if(!window.cbd )
{
cbd={};
}
window.cbdConfig=window.cbdConfig||{};
cbd.page=cbd.page||{};
cbd.page.BASEDOMAIN="vanguard.com";
cbd.page.initExGlobs=false;
cbd.page.basePageLoaded=false;
var pad="pad";
if(window.RIA===undefined )
{
RIA=false;
}
chatPopup=false;
if(!window.console )
{
console={
log:function(){},
error:function(msg ){}
};
}
if(typeof(js_cbdServer)=='undefined')
{
js_cbdServer="";
}
jsCBDtest=function(){
_debug("colRcontent", "local js test");
}
_cbdNStest=function(){
_debug("colRcontent", "local _cbd test");
}
jsCBDnonRiaPageIsReady=function()
{
window._cbdNonRiaPageReady=true;
}
jsCBDexecCmdLink=function(linkId)
{
jsCBDtriggerEventOnNode(linkId, 'mousedown');
jsCBDtriggerEventOnNode(linkId, 'mouseup');
jsCBDtriggerEventOnNode(linkId, 'click');
}
_cbdIsGlobalHeaderLink=function(node)
{
var GH_MENU_LINKS_PREFIX='_cbdGH',
CONTACT_US_PREFIX='_cbdCont',
VGC_SEARCH_INPUT='vgc-searchInput',
VGC_NAVBAR_SEARCH_INPUT='vgc-navBarSearchInput',
isVgnElement=node.className.indexOf('vgn-') > -1,
id=node.getAttribute('id');
if(isVgnElement )
{
return true;
}
else
{
return(id!=null&&
(id.indexOf(GH_MENU_LINKS_PREFIX) > -1||
id.indexOf(CONTACT_US_PREFIX) > -1||
id.indexOf(VGC_SEARCH_INPUT) > -1||
id.indexOf(VGC_NAVBAR_SEARCH_INPUT) > -1));
}
};
jsCBDsetDomain=function()
{
if(window.cbd.page._cbdForceDomain!=null)
{
if(cbd.page._cbdForceDomain)
{
document.domain=cbd.page.BASEDOMAIN;
}
}
else if(!nav&&!firefox&&document.domain!="www"&&!window._cbdHistory)
{
document.domain=cbd.page.BASEDOMAIN;
}
}
_cbdCheckUnsupportedBrowser=function()
{
if(firefox)
{
var versionAsStr=_getBrowserVersionStr();
var versionAsNum=_getBrowserVersionAsNum(versionAsStr);
if(versionAsStr=='2.0.0.2'||versionAsNum < 2.0)
{
return true;
}
}
else if(safariProper)
{
return _isSafari1or2();
}
else if(aol&&mac)
{
return true;
}
return false;
}
_getBrowserVersionStr=function()
{
var browser;
var version;
if(ie)
{
browser="MSIE";
version=_cbdUserAgent.split(browser);
version=version[1].substring(0,version[1].indexOf(';'));
return version;
}
else if(firefox)
{
browser="Firefox";
version=_cbdUserAgent.split(browser+'/');
return version[1];
}
else if(safariProper)
{
browser="Version";
version=_cbdUserAgent.split(browser+'/');
return version[1].substring(0,version[1].indexOf(' '));
}
else if(chrome)
{
browser="Chrome";
version=_cbdUserAgent.split(browser+'/');
return version[1].substring(0,version[1].indexOf(' '));
}
return null;
}
_getBrowserVersionAsNum=function(version)
{
if(version==null)
{
return _getBrowserVersionStr();
}
var decimalPointPos=version.indexOf('.');
var afterDecimal=version.substring(decimalPointPos+1,version.length);
afterDecimal=afterDecimal.replace(/\./g, '');
version=version.substring(0,decimalPointPos+1)+afterDecimal;
return parseFloat(version);
}
_isSafari1or2=function()
{
return(_cbdUserAgent!=null&&_cbdUserAgent.indexOf('Version') < 0);
}
cbd.browser={};
jsCBDinitGlobals=function()
{
Y='yes';
N='no';
FN="force_no";
T=true;
F=false;
if(cbd.page.initExGlobs)
{
return;
}
cbd.page.initExGlobs=true;
_cbdUserAgent=navigator.userAgent;
css2=(document.getElementById!=null );
webtv=(navigator.userAgent.indexOf('WebTV') > 0);
cbd.browser.isIe=ie=(document.all)?true:false;
ie4=(ie)&&(navigator.userAgent.indexOf('MSIE 4') > 0);
ie5=(ie)&&(navigator.userAgent.indexOf('MSIE 5') > 0);
ie6=(ie)&&((navigator.userAgent.indexOf('MSIE 6') > 0)||(navigator.userAgent.indexOf('MSIE 7') > 0));
ie6_proper=(ie)&&(navigator.userAgent.indexOf('MSIE 6') > 0);
ie7=(ie)&&(navigator.userAgent.indexOf('MSIE 7') > 0);
ie8=(ie)&&(navigator.userAgent.indexOf('MSIE 8') > 0);
ie8orLess=(ie&&(!document.documentMode||document.documentMode < 9))?true:false;
ie9=(ie&&(!document.documentMode||document.documentMode===9))?true:false;
ie10=(ie&&(!document.documentMode||document.documentMode===10))?true:false;
if(cbd.isSuppressQuirksMode )
{
ieQuirksMode=false;
}
else
{
ieQuirksMode=ie8orLess||(ie&&!cbd.page.isNextGen);
}
cbd.browser.isWebkit=(navigator.userAgent.indexOf('AppleWebKit') > 0);
cbd.browser.isChrome=chrome=(navigator.userAgent.indexOf('Chrome') > 0);
cbd.browser.isIPad=(navigator.userAgent.indexOf('iPad') > 0)||(navigator.userAgent.indexOf('iPhone') > 0)||(navigator.userAgent.indexOf('iPod') > 0);
cbd.browser.isAndroid=(navigator.userAgent.indexOf('Android') > 0)||(navigator.userAgent.indexOf('Silk') > 0)||(navigator.userAgent.indexOf('Kindle') > 0);
cbd.browser.isBlackBerry=(navigator.userAgent.indexOf('BlackBerry') > 0||navigator.userAgent.indexOf('BB10') > 0)
&&(navigator.userAgent.indexOf('Version/7.') > 0||navigator.userAgent.indexOf('Version/10.') > 0);
cbd.browser.isTouchScreen=cbd.browser.isIPad||cbd.browser.isAndroid||(cbd.browser.isBlackBerry&&('ontouchstart' in window));
safari=(navigator.userAgent.indexOf('Safari') > 0);
cbd.browser.isSafari=safariProper=safari&&!chrome;
safari1=(navigator.userAgent.indexOf('Safari/85') > 0);
cbd.browser.isFirefox=firefox=(navigator.userAgent.indexOf('Firefox') > 0);
firefox5plus=firefox&&_getBrowserVersionStr().split('.',2)[0]>=5;
nav4=(navigator.appName.indexOf('Netscape')==0)&&(navigator.appVersion.indexOf('4.')==0);
nav6=(navigator.appName.indexOf('Netscape')==0)&&(navigator.appVersion.indexOf('5.')==0)&&!firefox&&!navigator.userAgent.indexOf('Safari');
nav6plus=nav6;
nav=nav4||nav6;
mac=navigator.appVersion.indexOf("Mac") > 0?true:false;
aol=(navigator.userAgent.indexOf('AOL') > 0);
aol5=(navigator.userAgent.indexOf('AOL 5') > 0);
win98=(navigator.userAgent.indexOf('Windows 98') > 0);
windowsVista=(navigator.userAgent.indexOf('Windows NT 6.0') > 0);
preLoadFiles=new Array(
"/web/javascript/FormCheck.js");
winInnerHeight=0;
winInnerWidth=0;
if(nav6 )
{
winInnerHeight=window.innerHeight;
winInnerWidth=window.innerWidth;
}
ntRegion=(location.href.match(/^https?:..(?:localhost|t\d+|vvn\d+)/)?true:false );
unixRegion=!ntRegion;
prdRegion=location.port=='';
CBD_MODAL_POP1="cbdModalWin1";
CBD_MODAL_POP2="cbdModalWin2";
CBD_MODAL_POP3="cbdModalWin3";
CBD_MODAL_POP4="cbdModalWin4";
CBD_MODAL_POP5="cbdModalWin5";
CBD_MODAL_POP_PRINT="cbdModalPrintWin";
CBD_MODAL_POP="cbdModalWin";
CBD_NONMODAL_POP="cbdNonModalWin";
CBD_FLOATING_HEAD=false;
stdWinDim=new Array(
782, 430,
400, 200,
500, 200,
500, 400,
400, 430,
625, 350,
550, 430,
625, 430,
500, 300,
400, 400,
609, 430,
766, 430,
625, 500,
766, 500,
560, 430,
600, 400,
400, 290,
700, 400,
625, 725,
782, 725,
459, 725,
612, 725,
765, 725,
1024, 768,
725, 725
);
POPUP_SIZE1=0;
POPUP_SIZE2=2;
POPUP_SIZE3=4;
POPUP_SIZE4=6;
POPUP_SIZE5=8;
POPUP_SIZE6=10;
POPUP_SIZE7=12;
POPUP_SIZE8=14;
POPUP_SIZE9=16;
POPUP_SIZE10=18;
POPUP_SIZE11=20;
POPUP_SIZE12=22;
POPUP_SIZE13=24;
POPUP_SIZE14=26;
POPUP_SIZE15=28;
POPUP_SIZE16=30;
POPUP_SIZE17=32;
POPUP_SIZE18=34;
POPUP_INT_SIZE1=36;
POPUP_SIZE19=38;
POPUP_SIZE20=40;
POPUP_SIZE21=42;
POPUP_SIZE22=44;
POPUP_SIZE23=46;
POPUP_SIZE24=48;
CBD_PRINT_PARM="cbdPrint";
CBD_PRINT_DELAY="CBDPRINTDELAY";
CBD_PRINT_DELAY_TIME="1500";
CBD_PRINT_WIN_MENUBAR="PrintWinMenubar";
CBD_MENUBAR="Menubar";
CBD_INIT_TRANS_URL="cbdInitTransUrl";
urlParent=null;
emafParms="";
H="none";
V="";
errCount=0;
pageLevelErrors=false;
allValidators=new Array();
_flashCharts=new Array();
flyoutArray=new Array();
FOCArray=new Array();
}
jsCBDinitGlobals();
_cbdDoBgLoading=function()
{
if(window!=top)
{
return;
}
for(var i=0;i < preLoadFiles.length;i++)
{
jsCBDloadScript(js_cbdServer+preLoadFiles[i]);
}
}
jsCBDgetKey=function(key)
{
if(window.event)
{
key=window.event.keyCode;
}
else if(key)
{
key=key.keyCode;
}
return key;
}
function getModalPopup()
{
try
{
popup=top.document.modalPopup;
return(popup!=null&&!popup.closed)?popup:null;
}
catch(err)
{
return null;
}
}
function focusOnModalPop(popupRef)
{
if(popupRef&&!popupRef.closed)
{
popupRef.focus();
}
}
jsCBDdoModalCB=function()
{
if(aol5||ie4)
{
return true;
}
jsCBDinitGlobals();
popupRef=getModalPopup();
if(popupRef!=null)
{
setTimeout("focusOnModalPop(popupRef)", 100);
}
return true;
}
jsCBDunloadCB=function()
{
popup=getModalPopup();
if(popup!=null)
{
popup.close();
}
return true;
}
function isRelativeUrl(url)
{
return url.indexOf(":/") < 0;
}
jsCBDstripServerName=function(url)
{
if(!isRelativeUrl(url) )
{
url=url.substring(url.indexOf("/",8));
}
return url;
}
jsCBDrestoreSelectionList=function(aSelectionList )
{
var flag=F;
for(var i=0;i < aSelectionList.length;i++)
{
if(aSelectionList.options[i].defaultSelected==true )
{
aSelectionList.options[i].selected=true;
flag=true;
}
}
}
jsCBDrestoreAllSelectionLists=function()
{
var numForms=document.forms.length;
for(var i=0;i!=numForms;i++)
{
var form=document.forms[i];
var numFormElements=form.elements.length;
for(j=0;j!=numFormElements;j++)
{
if(form.elements[j].type=="select-one" )
{
jsCBDrestoreSelectionList(form.elements[j]);
}
}
}
}
var ORIGIN="origin";
jsCBDgoToUrl=function(url, win, addWebUsage)
{
var curUrl=window.location.href;
var poundPos=curUrl.indexOf("#");
if(poundPos > -1 )
{
curUrl=curUrl.substring(0, poundPos);
}
url=jsCBDaddQueryStringParam(url, null, jsCBDgetGHqueryStr(), false, true);
if(url.charAt(0)=='#')
{
url=jsCBDstripServerName(curUrl)+url;
}
if(addWebUsage )
{
start=curUrl.lastIndexOf("/")+1;
queryStr=curUrl.indexOf("?");
end=queryStr >=0?queryStr:curUrl.length;
url=jsCBDaddQueryStringParam(url, ORIGIN, curUrl.substring(start, end) );
}
win=(win!=null?win:self);
win.top.location=jsCBDconcatUrl(url);
}
jsCBDconcatUrl=function(url)
{
if(isRelativeUrl(url))
{
url=jsCBDgetUrlPrefix()+url;
}
return url;
}
jsCBDgetGHqueryStr=function()
{
var app=jsCBDgetQueryValue("APP");
if(isEmpty(app))
{
return null;
}
var qstr="";
qstr=jsCBDcopyParam(qstr, "APP");
qstr=jsCBDcopyParam(qstr, "crossover");
qstr=jsCBDcopyParam(qstr, "dbOnly");
qstr=jsCBDcopyParam(qstr, "SelectedPlanId");
qstr=jsCBDcopyParam(qstr, "CALLHANDLER");
return qstr.substring(1);
}
jsCBDcopyParam=function(queryStr, param)
{
return jsCBDaddQueryStringParam(queryStr, param, jsCBDgetQueryValue(param), false, true);
}
jsCBDgetSegment=function()
{
var seg=jsCBDgetCookie('_vgi_logon');
var logged=!isEmpty(jsCBDgetCookie('_vgi_logon2'))&&!isEmpty(seg);
return logged?seg:null;
}
jsCBDisAdobeInstalled=function(skipMessage)
{
return cbd.page.isAdobeAcrobatReaderInstalled(skipMessage);
}
cbd.page.isAdobeAcrobatReaderInstalled=function(skipMessage)
{
"use strict";
var installed,
adobeMsg;
installed=_isAdobeInstalled();
if(!skipMessage&&!installed )
{
adobeMsg="You must have Adobe Acrobat Reader installed on your computer to view PDF documents. We were unable to find this application on your system. If you do not have Adobe Acrobat Reader installed, click OK. If you do have the application properly installed, click Cancel.";
if(!confirm(adobeMsg ) )
{
installed=true;
jsCBDsetConfigInfo(vg.constants.ADOBE, true );
}
}
return installed;
}
_isAdobeInstalled=function()
{
var installed=false;
if(jsCBDgetConfigInfo(vg.constants.ADOBE ) )
{
return true;
}
if(cbd.browser.isTouchScreen)
{
return true;
}
if(window.ActiveXObject||"ActiveXObject" in window )
{
installed=_checkAdobeIE();
}
else if(navigator.mimeTypes )
{
installed=navigator.mimeTypes["application/pdf"]!=null&&
navigator.mimeTypes["application/pdf"].enabledPlugin!=null;
}
return installed;
}
_checkAdobeIE=function()
{
var axo=null;
try
{
axo=new ActiveXObject('AcroPDF.PDF');
return true;
}
catch(e)
{
}
try
{
axo=new ActiveXObject('PDF.PdfCtrl');
return true;
}
catch(e)
{
}
try
{
axo=new ActiveXObject('AcroExch.Document');
return true;
}
catch(e)
{
}
return false;
}
jsCBDisFlashInstalled=function()
{
"use strict";
var isFlashInstalled=F,
plugins=navigator.plugins,
version, value;
if(typeof(jsCBDisFlashInstalled.cache)==='undefined')
{
if(plugins!==null&&plugins.length > 0)
{
if(plugins["Shockwave Flash 2.0"]||plugins["Shockwave Flash"])
{
version=plugins["Shockwave Flash"].description;
version=version.replace(/\D+/g, ",").split(",")[1];
isFlashInstalled=parseInt(version) >=9;
}
}
else if(ie&&!mac&&!webtv)
{
isFlashInstalled=_checkFlashIE();
}
value=jsCBDgetCookie(vg.constants.CONFIG);
value=(value===null)?"":value;
if(value.indexOf(vg.constants.FLASH)===-1)
{
jsCBDsetConfigInfo(vg.constants.FLASH, isFlashInstalled);
}
jsCBDisFlashInstalled.cache=isFlashInstalled;
}
return jsCBDisFlashInstalled.cache;
}
_checkFlashIE=function()
{
var version;
var axo;
var e;
try
{
axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.9");
version=axo.GetVariable("$version");
return true;
}
catch(e)
{
return false;
}
}
jsCBDValidatePopupSize=function(size)
{
if(size < 0||
size > stdWinDim.length - 2||
size % 2!=0 )
{
return POPUP_SIZE1;
}
else
return size;
}
jsCBDgetPopupExtraHeight=function(extendHeight)
{
var extraHeight=0;
if(extendHeight)
{
extraHeight=screen.height - 600;
if(extraHeight < 0)
extraHeight=0;
}
return extraHeight;
}
jsCBDopenStdWin=function(url, windowName, scrol, resize, size, windowFeatures, extendHeight, windowHandle, topLocation, leftLocation)
{
size=jsCBDValidatePopupSize(size);
window.popSize=size;
if(chatPopup)
{
url=jsCBDaddQueryStringParam(url, "cbdPop", "1");
}
url=jsCBDaddQueryStringParam(url, "cbdForceDomain", cbd.page.BASEDOMAIN==document.domain);
if(windowHandle!=null&&windowHandle==true)
return jsCBDopenWin(url, windowName, scrol, resize, stdWinDim[size], stdWinDim[size+1], windowFeatures, extendHeight, windowHandle, topLocation, leftLocation );
else
jsCBDopenWin(url, windowName, scrol, resize, stdWinDim[size], stdWinDim[size+1], windowFeatures, extendHeight, null, topLocation, leftLocation );
}
_cbdAdjustFixedWidthModalPop=function(){
if(!cbd.page.isNextGen&&window.isNearGen&&window.name!=null&&(window.name.indexOf("cbdModal") >=0||window.name.indexOf("cbdNonModalWin") >=0)){
jsCBDaddStyle(document.body,"cbdModalPopWin-FW");
}
}
jsCBDopenWin=function(url, winName, scrol, resize, width, height, windowFeatures, extendHeight, windowHandle, topLocation, leftLocation)
{
var offset=false;
if(width==stdWinDim[POPUP_SIZE1]&&height==stdWinDim[POPUP_SIZE1+1])
offset=true;
scrol=scrol==FN?N:Y;
resize=resize==FN?N:Y;
height+=jsCBDgetPopupExtraHeight(extendHeight );
var winl=(screen.width - width)/2;
var wint=(screen.height - height - jsCBDgetToolbarHeight(windowFeatures) )/2;
var cbdWindow=top.window;
if(winName.indexOf(CBD_MODAL_POP) >=0)
{
winName=jsCBDgetModalPopupName();
}
if(topLocation||leftLocation)
{
if(topLocation)
{
wint=topLocation;
}
if(leftLocation)
{
winl=leftLocation;
}
}
else if(offset)
{
winl=0;
wint=0;
}
strpara="scrollbars="+scrol+",resizable="+resize+",width="+width+",height="+height+",top="+wint+",left="+winl;
if(windowFeatures==CBD_PRINT_WIN_MENUBAR)
{
strpara+=",menubar,toolbar";
}
else if(windowFeatures==CBD_MENUBAR)
{
strpara+=",menubar";
}
else if(windowFeatures==true)
{
strpara+=",toolbar";
}
else if(windowFeatures!=null )
{
strpara=strpara+","+windowFeatures;
}
url=jsCBDconcatUrl(url);
var newWindow=window.open(url, winName, strpara);
if(winName.indexOf(CBD_MODAL_POP)==0||winName.indexOf(CBD_MODAL_POP_PRINT)==0)
{
top.document.modalPopup=newWindow;
top.document.modalPopupName=winName;
}
if(windowHandle!=null&&windowHandle==true)
{
return newWindow;
}
}
jsCBDopenBrowser=function(url, windowName, size )
{
jsCBDopenStdWin(url, windowName, Y, Y, size, 'toolbar,directories,menubar,location,status,copyhistory');
}
jsCBDisModalPopup=function()
{
return top.window.name.indexOf(CBD_MODAL_POP) >=0||
top.window.name.indexOf(CBD_MODAL_POP_PRINT) >=0;
}
jsCBDgetModalPopupName=function()
{
var winName=CBD_MODAL_POP1;
if(jsCBDisModalPopup() )
{
winName=CBD_MODAL_POP+(jsCBDgetPopupLevel()+1);
}
else if(safari )
{
if(opener!=null&&opener.top.document!=null)
{
var childName=opener.top.document.modalPopupName;
if(childName!=null )
{
winName=CBD_MODAL_POP+(parseInt(childName.substring(childName.length-1, childName.length))+1);
}
}
}
return winName;
}
jsCBDgetFirstPopup=function()
{
var currWin=top;
var i;
var depth=jsCBDgetPopupLevel();
for(i=1;i < depth;++i )
{
currWin=currWin.opener.top;
}
return currWin;
}
jsCBDgetPopupLevel=function()
{
var cbdWindow=top;
if(jsCBDisModalPopup() )
{
return parseInt(cbdWindow.name.substring(cbdWindow.name.length-1, cbdWindow.name.length) );
}
else
{
return 0;
}
}
jsCBDgetToolbarHeight=function(toolbar )
{
var height=0;
if(toolbar==null||toolbar==F )
{
return 0;
}
else if(toolbar==CBD_MENUBAR||toolbar==true )
{
return 60;
}
else
{
if(toolbar.indexOf("toolbar")!=-1)
{
height+=60;
}
if(toolbar.indexOf("menubar")!=-1)
{
height+=60;
}
return height;
}
}
jsCBDgetPopupSize=function()
{
return opener.popSize;
}
jsCBDclosePopup=function(closeAll, refresh, url )
{
var currentPopup=top;
var firstPopup=jsCBDgetFirstPopup();
if(typeof closeAll=="number"&&closeAll > 0)
{
while(closeAll > 1&&currentPopup!=firstPopup)
{
closeAll--;
currentPopup=currentPopup.opener.top;
}
}
else if(closeAll==true )
{
currentPopup=firstPopup;
}
if(refresh==true )
{
var win=currentPopup.opener;
if(url!=null&&url.length > 0)
{
jsCBDgoToUrl(url,win);
}
else
{
win.location.reload(true );
}
if(!jsCBDisModalPopup()||currentPopup.top.closed)
{
currentPopup.top.close();
}
}
else
{
currentPopup.top.close();
}
}
jsCBDcloseMainWindow=function()
{
if(ie7)
{
top.open('', '_parent', '');
}
else
{
top.opener=self;
}
top.close();
}
jsCBDgetCookie=function(name){
var result=null;
var myCook=" "+document.cookie+";";
var search=" "+name+"=";
var start=myCook.indexOf(search);
var end;
if(start!=-1)
{
start+=search.length;
end=myCook.indexOf(";", start);
result=unescape(myCook.substring(start, end));
}
return result;
}
jsCBDsetCookie=function(name, value, expires, path, domain){
var expStr=((expires==null)?"":(";expires="+expires.toGMTString()));
var pathStr=((path==null)?"":(";path="+path));
var domainStr=((domain==null)?"":(";domain="+domain));
document.cookie=name+"="+escape(value)+expStr+pathStr+domainStr;
}
jsCBDdelCookie=function(name, path, domain){
var TwoDays=2*24*60*60*1000;
var expDate=new Date();
expDate.setTime(expDate.getTime() - TwoDays);
jsCBDsetCookie(name, "", expDate, path, domain);
}
_cbdDebug={};
_cbdDebug.funcs={};
_cbdDebug.flags={};
_cbdDebug.flagsPersist={};
_cbdDebug.options={
validation:{
disabled:function(){_cbdDisableFunction('vg.validation.validateForm', true );},
log:function(){_cbdLogFunction('vg.validation.validateForm', true );}
},
processjs:{
disabled:function(){_cbdDisableFunction('_processJS' );},
log:function(){_cbdLogFunction('_processJS' );}
},
innerHtml:{
disabled:function(){_cbdDisableFunction('jsCBDsetElementInnerHtml' )},
log:function(){_cbdLogFunction('jsCBDsetElementInnerHtml' );}
}
}
_cbdDisableFunction=function(name, ret, out )
{
if(!_cbdDebug.funcs[name])
{
_cbdDebug.funcs[name]=eval(name );
}
var disabledFunc=function(){
var ta=new Date().getTime();
var msg="disabled:"+name+" - start="+ta;
if(out )
{
msg+=" args="+out(arguments );
}
console.log(msg );
var retval=ret;
return retval;
}
eval(name+'=disabledFunc;' );
}
_cbdLogFunction=function(name, ret, out )
{
if(!_cbdDebug.funcs[name])
{
_cbdDebug.funcs[name]=eval(name );
}
var wrapFunc=function(){
var now=new Date();
var ta=now.getTime();
var msg="logged:"+name+" - start="+ta;
if(out )
{
msg+=" args="+out(arguments );
}
console.log(msg );
var retval=_cbdDebug.funcs[name].apply(window, arguments );
var tb=new Date().getTime()
var td=tb - ta;
console.log("logged:"+name+" - time="+td );
return retval;
}
eval(name+'=wrapFunc;' );
}
_cbdEnableFunction=function(name )
{
var func=_cbdDebug.funcs[name];
if(func )
{
eval(name+'=func;' );
}
}
_cbdSetDebugFlag=function(name, val, save )
{
_cbdDebug.flags[name]=val;
if(save )
{
_cbdDebug.flagsPersist[name]=val;
_cbdGenerateDebugCookie();
}
if(_cbdDebug.options[name]&&_cbdDebug.options[name][val])
{
_cbdDebug.options[name][val]();
}
}
_cbdGetDebugFlag=function(name )
{
if(_cbdDebug.flags[name])
{
return _cbdDebug.flags[name];
}
if(_cbdDebug.flagsPersist[name])
{
return _cbdDebug.flagsPersist[name];
}
if(window.cbd&&cbd.debug&&cbd.debug.flags&&cbd.debug.flags[name]
&&cbd.debug.flags[name].def!=null )
{
return cbd.debug.flags[name].def;
}
return 'enabled';
}
_cbdIsDebugFlagSet=function(name )
{
return _cbdDebug.flags[name]||_cbdDebug.flagsPersist[name];
}
_cbdIsEnabled=function(name )
{
var flag=_cbdGetDebugFlag(name );
return flag=='enabled'||flag=='log';
}
_cbdGenerateDebugCookie=function()
{
var pairs=[];
for(var i in _cbdDebug.flagsPersist )
{
var txt=i+'='+_cbdDebug.flagsPersist[i];
pairs.push(txt );
}
jsCBDsetCookie('cbd_debug', pairs.join('&' ), null, '/' );
}
_cbdProcessDebugCookie=function()
{
var txt=jsCBDgetCookie('cbd_debug' );
if(txt )
{
var pairs=txt.split('&' );
for(var i=0;i < pairs.length;i++)
{
var parts=pairs[i].split('=' );
_cbdSetDebugFlag(parts[0], parts[1]);
}
setTimeout(_cbdDebugCreateLink, 1000 );
}
}
_cbdDebugCreateLink=function()
{
var segment=document.getElementById('segment' );
var debugLink=document.getElementById('debug_open' );
if(segment&&!debugLink )
{
segment.innerHTML+='&nbsp;&nbsp;&nbsp;<a href="#" onclick="_cbdOpenDebugWindow();return false;" id="debug_open">Debug</a>';
}
}
_cbdOpenDebugWindow=function()
{
var windowName='debugWindow';
var div=document.getElementById(windowName );
var body=document.getElementById('body');
if(!div )
{
div=document.createElement('span' );
div.setAttribute('id', windowName );
vg.html.getElements(body,{tagName:'div'}, function(node){return vg.html.hasStyle("vg0", node)})[0].appendChild(div);
}
if(!_isYUILoaderDefined())
{
jsCBDloadScript("https://static.vgcontent.info/web/common/yui/3.3.0/build/yui/yui-min.js" );
_cbdCheckConditionsAndExecute(_isYUILoaderDefined, _cbdLoadLoader);
}
else
{
_cbdOpenDebugLayer();
}
}
if(unixRegion )
{
_cbdSetDebugFlag('loader_rollups', 'enabled' );
}
else
{
_cbdSetDebugFlag('loader_rollups', 'disabled' );
}
_cbdProcessDebugCookie();
cbd.print=cbd.print||{};
cbd.print._getPrintAreaStyleAttr=function(elToPrint,isLayer)
{
var styleAttr="";
if(document.isGrid)
{
styleAttr=vg.html.getObjWidth(isLayer?vg.comp.getController(elToPrint).scroll_noscroll_container:elToPrint );
styleAttr="width:"+
((styleAttr > vg.constants.COL_8_WIDTH)?styleAttr+"px":"auto" )+
"!important;";
}
return styleAttr;
}
cbd.print._setInputPrintValues=function(context, displayInputPrintValues)
{
"use strict";
var i=0,
inputs=[],
inputsLength,
input,
inputType,
printValue,
printValueStr="printValue";
vg.html.getContainerInputs(context, inputs);
inputsLength=inputs.length;
for(i=0;i < inputsLength;i++)
{
input=inputs[i];
inputType=input.type;
printValue=input.getAttribute(printValueStr);
if(inputType==="checkbox"||inputType==="radio")
{
if(displayInputPrintValues&&printValue)
{
if(printValue==="checked")
{
input.checked=true;
}
else
{
input.checked=false;
}
}
else
{
if(input.checked)
{
input.setAttribute(printValueStr, "checked");
}
else
{
input.setAttribute(printValueStr, "unchecked");
}
}
}
else if(inputType==="text"||inputType==="textarea"||inputType==="select-one")
{
if(displayInputPrintValues&&printValue)
{
input.value=printValue;
}
else
{
input.setAttribute(printValueStr, input.value);
}
}
}
};
jsCBDprintCB=function()
{
if(vg.html.getElement("printLayerDiv")!=null)
{
_cbdClearDiv();
}
window.print();
}
jsCBDPrintPage=function()
{
jsCBDprintCB();
}
jsCBDprintUnlessIEMac=function(str)
{
if(!mac) document.write(str);
}
function isMacPrint()
{
return(mac&&ie)||(mac&&nav4)||ie4||safari;
}
jsCBDisCharInserted=function(keyCode)
{
if(keyCode==13||keyCode==32||keyCode >=48&&keyCode <=90||keyCode >=96&&keyCode <=111||keyCode >=186&&keyCode <=222 )
{
return true;
}
return false;
}
function isInteger(s)
{
var i;
if(isEmpty(s))
if(isInteger.arguments.length==1) return false;
else return(isInteger.arguments[1]==true);
for(i=0;i < s.length;i++)
{
var c=s.charAt(i);
if(!isDigit(c)) return false;
}
return true;
}
function isWhitespace(s)
{
var i;
var whitespaceStr=" \t\n\r";
if(isEmpty(s))	return true;
for(i=0;i < s.length;i++)
{
var c=s.charAt(i);
if(whitespaceStr.indexOf(c)==-1) return false;
}
return true;
}
function isEmpty(s)
{
return(s==null||s.length==0);
}
jsCBDisEmpty=function(value, label_id, msg_id)
{
if(!css2)
return F;
var empty=isWhitespace(value);
jsCBDdisplayError(label_id, msg_id, empty );
return empty;
}
jsCBDdisplayError=function(label_id, msg_id, state )
{
if(!css2)
return;
if(msg_id==null )
{
msg_id=label_id;
jsCBDsetErrMessage(msg_id, state );
}
else
{
jsCBDsetErrLabel(label_id, state );
jsCBDsetErrMessage(msg_id, state );
}
}
function isDigit(c)
{
return((c >="0")&&(c <="9"))
}
digitCount=function(str)
{
var count=0;
if(str!=null)
{
var tempstr=str;
for(var i=0;i < tempstr.length;i++)
{
var c=tempstr.charAt(i);
if((c >="0")&&(c <="9"))
{
count++;
}
}
}
return(count);
}
function getClientType()
{
var type=jsCBDgetCookie("_vgi_clienttype");
return type==null?"00":type;
}
function setClientMarker(params)
{
today=new Date();
if(params!=null)
params="&"+params;
else params="";
tie="&tie="+today.getTime();
clienttype=getClientType();
caller=String(document.location);
if(caller!=null)
{
index=caller.indexOf('?');
if(index > 0)
caller=caller.substr(0,index);
index=caller.indexOf('web/');
if(index > 0)
{
caller=caller.substr(index+4,caller.length);
}
else
{
index=caller.indexOf('hnw/');
if(index > 0)
caller=caller.substr(index+4,caller.length);
}
caller=encodeURIComponent(caller);
clienttype=encodeURIComponent(clienttype);
params=encodeURIComponent(params);
caller="&caller="+caller+"_"+clienttype;
}
else caller="";
var urlMarker="/web/images/marker.jpg";
document.write('<img src="'+urlMarker+'?clienttype='+clienttype+caller+params+tie+'" width="1" height="1">');
}
jsCBDshowHideLayers=function()
{
var i;
var args=jsCBDshowHideLayers.arguments;
for(i=0;i < args.length - 1;i+=2 )
{
if(args[i]!=null )
{
document.getElementById(args[i]).style.visibility=(args[i+1])?'visible':'hidden';
}
}
}
jsCBDisSecure=function()
{
return(window.location.protocol.indexOf("https") > -1 );
}
jsCBDsetElementText=function(id, text)
{
if(!css2)
return;
var e=document.getElementById(id);
if(e.nodeName.toLowerCase()=="input")
{
e.value=text;
}
else
{
jsCBDsetElementInnerHtml(id, text)
}
}
jsCBDsetElementInnerHtml=function(target, html, mode, wrapInDiv, htmlRender, onLoadCallback, idPrefix, skipContentListeners)
{
if(RIA )
{
vg.util.execOnPageReady(function()
{
_cbdSetElementInnerHtml(target, html, mode, wrapInDiv, htmlRender, onLoadCallback, idPrefix, skipContentListeners);
}
);
}
else
{
_cbdSetElementInnerHtml(target, html, mode, wrapInDiv, htmlRender, onLoadCallback, idPrefix, skipContentListeners);
}
}
_cbdSetElementInnerHtml=function(target, html, mode, wrapInDiv, htmlRender, onLoadCallback, idPrefix, skipContentListeners)
{
if(target.target)
{
html=target.html;
mode=target.mode;
wrapInDiv=target.wrapInDiv;
htmlRender=target.htmlRender;
onLoadCallback=target.onLoadCallback;
idPrefix=target.idPrefix;
target=target.target;
}
if(typeof(target)=="string")
{
target=document.getElementById(target);
}
if(jsCBDgetParent(target, "form", true)!=null )
{
html=html.replace(/<form/g, '<div formAvatar="true"');
html=html.replace(/<\/form/g, '</div');
}
vg.comp.destroy(target);
if(wrapInDiv)
{
var newdiv=document.createElement("div");
newdiv.innerHTML=html;
while(vg.html.getFirstChild(target)!=null)target.removeChild(target.lastChild);
target.appendChild(newdiv);
}
else
{
var currTitle=document.title;
target.innerHTML=html;
jsCBDsetPageTitle(currTitle, true);
}
_processJS(target);
vg.comp.contentUpdated(target);
if(cbd.loader)
{
cbd.loader.addCallback(function(){_cbdRemoveOrphans();})
}
if(RIA)
{
var targetParam=target;
if(!isEmpty(idPrefix))
{
_cbdProcessIds(target, idPrefix);
}
}
if(!skipContentListeners&&typeof jsCBDprocessContentListeners!='undefined')
{
jsCBDprocessContentListeners();
}
if(onLoadCallback)
{
_cbdExecuteOnLoadCallback(onLoadCallback);
}
if(onLoadCallback==null)
{
vg.comp._setInternal(target);
}
if(_isCBDLoaderDefined())
{
cbd.loader.load();
}
if(RIA)
{
var targetNode=target;
var timeoutFunction=function()
{
vg.html._fireCustomEvent(vg.event.DOM_CHANGE, targetNode);
}
vg.util.setTimeout(timeoutFunction, 50);
}
if(target.id&&window.FloatingDataTable)
{
var cloneElement=FloatingDataTable.getElement(target.id);
if(cloneElement!=null)
{
var floatingDiv=FloatingDataTable._findFloatingDiv(cloneElement);
vg.html._fireCustomEvent(vg.event.DOM_CHANGE, floatingDiv,{originalElement:target});
}
}
}
_cbdRemoveOrphans=function()
{
"use strict";
var errorLayerId=FORM_FIELD_INFO,
errorLayer=document.getElementById(errorLayerId),
shouldShowError=cbd.page.isNextGen&&errorLayer.errorFromServer;
if(window.SelectOneMenu)
{
SelectOneMenu._removeOrphanNodes();
}
if(window.vg.Layer)
{
vg.Layer._removeOrphanNodes();
}
if(window.InfoBox)
{
InfoBox.close();
}
if(window.DisableModalDiv)
{
DisableModalDiv._removeOrphanNodes();
}
if(!shouldShowError)
{
vg.validation.hideErr(false);
}
};
_cbdExecuteOnLoadCallback=function(onLoadCallback)
{
if(_isCBDLoaderDefined())
{
cbd.loader.addCallback(onLoadCallback);
}
else
{
onLoadCallback();
}
}
function _processJS(element)
{
var scripts,
numOfScripts=0,
js="",
index,
script;
if(element){
scripts=element.getElementsByTagName("script");
numOfScripts=scripts.length;
}
for(index=0;index < numOfScripts;index++)
{
script=scripts[index];
if(script.getAttribute("type")!=="application/json")
{
js+=script.innerHTML+"\n";
}
}
vg.javascriptAdapter.attachListeners(element);
eval(js);
}
jsCBDshowThemeMsg=function(text)
{
jsCBDshowMsg("themeInfoMsg", text);
jsCBDtoggle("themeInfo", true);
}
jsCBDshowMsg=function(id, text)
{
jsCBDsetElementText(id+"-content", text)
}
jsCBDsetErrLabelText=function(id, text )
{
if(!css2)
return;
var label=document.getElementById(id);
for(var n=vg.html.getFirstChild(label);n!=null;n=next )
{
next=n.nextSibling;
if(n.nodeName.toLowerCase()=='b')
{
n.replaceChild(document.createTextNode(text), vg.html.getFirstChild(n) )
break;
}
}
}
jsCBDsetErrLabel=function(id, state )
{
var errorIt=true;
var next;
if(!css2)
return;
var label=document.getElementById(id);
for(var n=vg.html.getFirstChild(label);n!=null;n=next )
{
next=n.nextSibling;
if(n.nodeName.toLowerCase()=='img'||n.nodeType==3 )
{
errorIt=false;
if(state!=true )
{
label.removeChild(n );
}
}
else if(n.nodeName.toLowerCase()=='b' )
{
if(state!=false&&errorIt )
{
n.className="attention";
var img=document.createElement("img" );
img.src=cbd.page._cbdImagePath+"icons/ind_warning.gif";
img.style.align="middle";
var space=document.createTextNode(" " );
label.insertBefore(img, n );
label.insertBefore(space, n );
}
else if(state!=true )
{
n.className="";
}
break;
}
}
}
function _initEM(msg_id, ajaxVal, dispErr)
{
if(RIA)
{
vg.validation.setRiaError(msg_id, true, true, ajaxVal, dispErr);
}
else
{
jsCBDsetErrMessage(msg_id, true );
}
}
jsCBDsetErrMessage=function(msg_id, state )
{
if(!css2)
return;
if(RIA||this.ria)
{
vg.validation.setRiaError(msg_id, state, false);
return;
}
if(state)
{
vg.html.scrollPage(0, 0);
}
var errDiv=document.getElementById(msg_id);
var isInputErrorTag=errDiv.className.indexOf("inputErr") >=0;
if(isInputErrorTag )
{
var parentCell=jsCBDgetParent(errDiv, "TD", true);
if(state)
{
if(!jsCBDisVisible(msg_id))
{
++errCount;
}
if(parentCell!=null&&
parentCell.className.indexOf("inputErrCell") < 0)
{
parentCell.setAttribute("altClass", parentCell.className );
jsCBDaddStyle(parentCell, "inputErrCell");
}
}
else if(jsCBDisVisible(msg_id)&&state==false )
{
--errCount;
if(parentCell!=null )
{
var oldClass=parentCell.getAttribute("altClass" );
parentCell.className=isEmpty(oldClass)?"":oldClass;
}
}
}
jsCBDtoggle(msg_id, state );
if(!isInputErrorTag)
{
var img_td=document.getElementById(msg_id+"-img-td");
if(state==false||vg.html.getFirstChild(img_td)!=null )
{
return;
}
var img=document.createElement("img" );
img.src=cbd.page._cbdImagePath+"icons/ind_warning.gif";
img.style.border="0";
img_td.appendChild(img );
}
}
jsCBDgetErrMsgId=function(fieldId, errId)
{
var p=/(:err)$/;
if(p.test(fieldId) )
{
fieldId=fieldId.substring(0, fieldId.length-4);
}
return fieldId+":"+(errId!=null?errId:"err");
}
jsCBDgetParent=function(theNode, parentName, recursive, check)
{
var parent=theNode.parentNode;
do
{
if((parent==null||parentName==null||parent.nodeName.toUpperCase()==parentName.toUpperCase())&&
(check==null||check(parent)) )
{
return parent;
}
parent=parent.parentNode;
}
while(recursive)
return null;
}
jsCBDgetEvent=function(anEvent, clone)
{
var e=anEvent?anEvent:window.event;
if(clone&&ie)
{
var cloneObj={};
vg.html._cbdCopyProperties(e, cloneObj);
e=cloneObj;
}
return(e);
}
jsCBDgetEventNode=function(anEvent )
{
var e=jsCBDgetEvent(anEvent);
if(e)
{
return e.target?e.target:e.srcElement;
}
return null;
}
jsCBDaddStyle=function(theNode, style)
{
theNode=jsCBDgetHtmlNode(theNode);
if(!isEmpty(theNode.className) )
{
var currStyles=theNode.className.split(' ');
var addStyles=style.split(' ');
for(var j=0;j < addStyles.length;j++)
{
var found=false;
for(var i=0;i < currStyles.length;i++)
{
if(currStyles[i]==addStyles[j])
{
found=true;
break;
}
}
if(!found )
{
theNode.className=jsCBDcleanUpStyleText(theNode.className+' '+addStyles[j]);
}
}
}
else
{
theNode.className=jsCBDcleanUpStyleText(style);
}
}
jsCBDdeleteStyleRegExp=function(theNode, styleRegExp)
{
theNode=jsCBDgetHtmlNode(theNode);
if(!isEmpty(theNode.className) )
{
var regX=new RegExp(styleRegExp);
var cstyle=theNode.className;
var cstyle2=cstyle.replace(regX, '');
if(cstyle!=cstyle2)
{
theNode.className=jsCBDcleanUpStyleText(cstyle2);
}
}
}
jsCBDdeleteStyle=function(theNode, style)
{
theNode=jsCBDgetHtmlNode(theNode);
if(!isEmpty(theNode.className) )
{
var originalStyle=theNode.className;
var currStyles=originalStyle.split(' ');
var newStyle='';
for(var i=0;i < currStyles.length;i++)
{
var delStyles=style.split(' ');
var found=false;
for(var j=0;j < delStyles.length;j++)
{
if(currStyles[i]==delStyles[j])
{
found=true;
break;
}
}
if(!found)
{
newStyle+=' '+currStyles[i];
}
}
var ns=jsCBDcleanUpStyleText(newStyle);
if(originalStyle!=ns)
{
theNode.className=ns;
}
}
}
jsCBDcleanUpStyleText=function(style){
var nnstyle=style;
nnstyle=nnstyle.replace(/^\s/, "");
return(nnstyle==" ")?"":nnstyle.replace(/\s{2,}/g, " ");
}
jsCBDcleanUpStyle=function(theNode)
{
theNode=jsCBDgetHtmlNode(theNode);
var nstyle=theNode.className;
var nnstyle=jsCBDcleanUpStyleText(nstyle);
if(nnstyle!=nstyle)
{
theNode.className=nnstyle;
}
}
function _doRollover(node, active, skipCursorChange)
{
if(!css2)
{
return;
}
var ROLLOVER_CSS='rollover',
SCROLL_DATATABLE='scrollDataTable',
RESP_DATATABLE_DIV='respDataTableRH',
SCROLL_TD='scrollTD',
index=0,
tdSibling,
trsInTd=[],
tableArray=[],
isTouchScreen=cbd.browser.isTouchScreen,
tdArray=[],
tdArrayLen=0,
responsiveTable=vg.html.findAncestor(node,{tagName:'table'}, function(node){return vg.html.hasStyle(SCROLL_DATATABLE, node)}),
divsInRespTable=responsiveTable&&vg.html.getElements(responsiveTable,{tagName:'div'},function(responsiveTable){return vg.html.hasStyle(RESP_DATATABLE_DIV, responsiveTable)}),
addRollOverClass=(active||(isTouchScreen&&event.touches&&event.touches[0])),
isSortLink=vg.html.getElements(node,{tagName:'span'},function(sortLink){return vg.html.hasStyle('comp-SortLink', sortLink)});
if((isSortLink.length <=0)&&divsInRespTable!==null&&(divsInRespTable.length > 0) )
{
index=node.sectionRowIndex;
tdArray=vg.html.getElements(responsiveTable,{tagName:'td'},
function(responsiveTable){return vg.html.hasStyle(SCROLL_TD, responsiveTable)});
tdArrayLen=tdArray.length;
for(i=0;i< tdArrayLen;i++)
{
trsInTd=vg.html.getElements(tdArray[i],{tagName:'tr'});
if(addRollOverClass)
{
jsCBDaddStyle(trsInTd[index], ROLLOVER_CSS);
}
else
{
jsCBDdeleteStyle(trsInTd[index], ROLLOVER_CSS);
}
}
}
else
{
if(addRollOverClass)
{
jsCBDaddStyle(node, ROLLOVER_CSS);
}
else
{
jsCBDdeleteStyle(node, ROLLOVER_CSS);
}
}
if(!isTouchScreen&&!skipCursorChange)
{
node.style.cursor=active?'pointer':'auto';
}
}
jsCBDupdateErrSummary=function()
{
var counter=document.getElementById("errSummary_span");
if(counter!=null)
{
if(pageLevelErrors )
{
counter.replaceChild(document.createTextNode("errors"), counter.firstChild );
}
else
{
counter.replaceChild(document.createTextNode((errCount > 1?errCount+" errors":"error") ), counter.firstChild );
}
}
jsCBDtoggle("errSummary", errCount > 0 );
}
jsCBDresetErrList=function()
{
if(RIA)
return;
var errList=document.getElementById("errList");
if(errList==null)
return;
var lis=errList.getElementsByTagName("li");
var numOfLi=lis.length;
for(var i=0;i < numOfLi;i++)
{
lis[i].style.display=H;
}
jsCBDtoggle("errList", false);
}
jsCBDUpdateErrList=function(msgId, state )
{
if(!css2||RIA)
return;
var li=document.getElementById(msgId);
var ul=jsCBDgetParent(li, "ul" );
var ulId=ul.getAttribute("id");
var divId=ulId.substr(0, ulId.indexOf('_') );
jsCBDtoggle(msgId, state);
var lis=ul.getElementsByTagName("li");
var numOfLi=lis.length;
var activeItems=0;
for(var i=0;i < numOfLi;i++)
{
if(lis[i].style.display!=H )
{
++activeItems;
}
}
ul.className=activeItems > 1?"multiItem":"singleItem";
jsCBDtoggle(divId, activeItems >=1);
}
jsCBDtoggle=function(id, state, skipGeoChange)
{
if(!css2)
return;
obj=document.getElementById(id);
jsCBDtoggleElement(obj, state);
if(RIA&&!skipGeoChange)
{
vg.html._fireCustomEvent(vg.event.GEO_CHANGE, obj);
}
}
jsCBDtoggleElement=function(e, state)
{
if(e==null )
return;
e=jsCBDgetHtmlNode(e);
if(e.className.indexOf('displayNone') >=0 )
{
jsCBDdeleteStyle(e,'displayNone');
e.style.display=H;
}
with(e.style)
{
if(jsCBDisVisibleElement(e)!=state||state==null )
{
display=(display==H)?V:H;
}
}
}
jsCBDsetVisibility=function(id, state)
{
if(!css2) return;
jsCBDtoggleVisibility(document.getElementById(id), state);
}
jsCBDtoggleVisibility=function(e, state)
{
if(e==null ) return;
e=jsCBDgetHtmlNode(e);
with(e.style)
{
var isVisible=(visibility!="hidden");
if(isVisible!=state||state==null )
{
visibility=(isVisible?"hidden":"visible");
}
}
}
jsCBDisVisible=function(id, checkAncestors)
{
return jsCBDisVisibleElement(document.getElementById(id));
}
jsCBDisVisibleElement=function(e, checkAncestors)
{
var visible=_visible(e);
if(visible&&checkAncestors)
{
e=e.parentNode;
while(e.parentNode.nodeName.toLowerCase()!='body')
{
visible=_visible(e);
if(!visible)
{
return false;
}
e=e.parentNode;
}
}
return visible;
}
_visible=function(e)
{
return e.style.display!=H&&!vg.html.hasStyle('displayNone', e);
}
jsCBDtoggleEventFlipper=function(id )
{
jsCBDtoggle(id+"_pre" );
jsCBDtoggle(id+"_post" );
}
var altExt="-alt";
var imgExt="-img";
jsCBDtoggleNestedFlipper=function(numRows, id, state)
{
jsCBDtoggleNestedFlipperElement(numRows, document.getElementById(id), state);
}
jsCBDtoggleNestedFlipperElement=function(numRows, node, state)
{
jsCBDtoggleFlipperImage(node.id, state);
var trNode=node.parentNode.parentNode;
do
{
trNode=getNextSibling(trNode);
jsCBDtoggleElement(trNode, state);
--numRows;
}while(numRows > 0)
}
function getNextSibling(node)
{
nextNode=node.nextSibling;
while(nextNode!=null)
{
if(nextNode.tagName=="undefine"||nextNode.tagName==null)
{
nextNode=nextNode.nextSibling;
}
else
{
return nextNode;
}
}
}
DATA_TABLE_OPEN_ARROW_CSS='arrowOpen';
DATA_TABLE_CLOSE_ARROW_CSS='arrowClose';
jsCBDtoggleFlipperImage=function(imageId, state )
{
if(!css2 )
return;
var node=document.getElementById(imageId);
if(node.nodeName.toLowerCase()=="img")
{
with(node)
{
var gif=jsCBDstripServerName(src);
var altTitle;
var colImg="icons/nav_flipperopen.gif";
if((gif.indexOf(colImg) > -1)!=state||state==null )
{
var expImg="icons/nav_flipperclosed.gif";
src=(gif.indexOf(colImg) > -1)?cbd.page._cbdImagePath+expImg:cbd.page._cbdImagePath+colImg;
if((altTitle=getAttribute("altTitle" ))!=null )
{
var tempTitle=title;
title=altTitle;
setAttribute("altTitle", tempTitle );
}
}
}
}
else
{
var isFlipperOpen=vg.html.hasStyle(DATA_TABLE_OPEN_ARROW_CSS, node);
if(isFlipperOpen!=state||state==null)
{
vg.html.addOrRemoveStyle(DATA_TABLE_OPEN_ARROW_CSS, node,!isFlipperOpen);
vg.html.addOrRemoveStyle(DATA_TABLE_CLOSE_ARROW_CSS, node, isFlipperOpen);
}
}
}
jsCBDSetFocus=function(obj)
{
if(_cbdIsRiaSelectOneMenu(obj))
{
vg.comp.findController(obj).focus();
}
else
{
try
{
obj.focus();
if(ie)
{
obj.focus();
}
}
catch(Exception)
{
}
}
}
jsCBDToggleAll=function(state )
{
var id;
var i=0;
var size=jsCBDToggleAll.arguments.length;
if(!css2 )
return;
for(i=1;i < size;++i )
{
id=jsCBDToggleAll.arguments[i];
jsCBDtoggle(id, state );
if(document.getElementById(id+altExt)!=null )
{
jsCBDtoggle((id+altExt), state!=null?!state:null );
}
if(document.getElementById(id+imgExt)!=null )
{
jsCBDtoggleFlipperImage(id+imgExt, state);
}
}
}
jsCBDToggleAllByRange=function(state, prefix, start, end )
{
var id;
var i=0;
if(!css2 )
return;
for(i=start;i <=end;++i )
{
id=prefix+i;
jsCBDtoggle(id, state );
if(document.getElementById(id+altExt)!=null )
{
jsCBDtoggle((id+altExt), state!=null?!state:null );
}
if(document.getElementById(id+imgExt)!=null )
{
jsCBDtoggleFlipperImage(id+imgExt, state);
}
}
}
jsCBDgetImageButtonId=function(id)
{
return id;
}
jsCBDdisableImageButton=function(button, state)
{
var disabledClass="disabled";
if(typeof button!="object")
{
button=document.getElementById(jsCBDgetImageButtonId(button));
}
if(state)
{
jsCBDdeleteStyle(button, "onhover");
jsCBDaddStyle(button, disabledClass);
}
else
{
jsCBDdeleteStyle(button, disabledClass);
}
jsCBDdisableInput(button, state);
}
jsCBDpreloadImage=function()
{
if(document.images)
{
var args=jsCBDpreloadImage.arguments;
var path=args[0];
for(i=1;i < args.length;i++)
{
var img=new Image();
img.src=path+args[i];
img.style.display=H;
document.getElementsByTagName("head")[0].appendChild(img);
}
}
}
jsCBDisDisabled=function(input)
{
if(_cbdIsRiaSelectOneMenu(input))
{
var viewNode=vg.html.getCompViewNode(input);
var myController=vg.comp.getController(viewNode);
if(null==myController||"undefined"==typeof(myController))
{
var disabledAttr=viewNode.getAttribute("disabled");
return!(isEmpty(disabledAttr)||(disabledAttr==false) );
}
else
{
return myController.disabled;
}
}
else if(_cbdIsVgButton(input))
{
return vg.button._isDisabled(input)
}
return input.disabled=="disabled"||input.disabled==true;
}
_cbdIsRiaSelectOneMenu=function(node)
{
if(node&&node.getAttribute){
return node.getAttribute('compName')=='selectOneMenu';
}else{
return false;
}
}
_cbdIsNativeSelectOneMenu=function(node)
{
return node.tagName!=null&&node.tagName.toLowerCase()=="select";
}
_cbdIsSelectOneMenu=function(node)
{
return _cbdIsRiaSelectOneMenu(node)||_cbdIsNativeSelectOneMenu(node);
}
function _cbdDisableSelect(element, state)
{
var controller,
disabledStyle=cbd.page.isNextGen?'disabled':'vg-SelOneMenuDisabled',
disabledNode,
aId,
aTag,
inpId;
if(_cbdIsNativeSelectOneMenu(element))
{
if(element.disabled==state)
{
return;
}
element.disabled=state;
}
else
{
element=vg.html.getCompViewNode(element);
controller=vg.comp.getController(element);
if(cbd.page.isResponsiveCapable)
{
if(!state)
{
if(controller?!controller.initialized:false)
{
controller._initialize();
}
}
}
else
{
vg.comp._lazyLoadComp(element.getAttribute('id'));
controller=vg.comp.getController(element);
}
vg.html.setDisabledAttr(controller.viewNode, state);
controller.disabled=state;
disabledNode=cbd.page.isNextGen?controller.contDiv:controller.mainNode;
if(state )
{
vg.html.addStyle(disabledStyle, disabledNode);
}
else
{
vg.html.removeStyle(disabledStyle, disabledNode);
}
aId=element.getAttribute('id')+"_aTag";
aTag=document.getElementById(aId);
if(cbd.page.isNextGen&&aTag)
{
if(state)
{
if(aTag.getAttribute("tabindex")!="-1")
{
aTag.setAttribute("tabindex", "-1");
}
}
else
{
if(controller.initTabindex)
{
aTag.setAttribute("tabindex", controller.initTabindex);
}
else
{
aTag.removeAttribute("tabindex");
}
}
}
}
inpId=element.getAttribute('id')+":dsbl";
jsCBDcreateHiddenInput(inpId, state, inpId, element.parentNode);
}
jsCBDdisableInputById=function(formId, inputId, state, labels)
{
var element=null;
if(document.forms[formId])
{
element=document.forms[formId][inputId];
}
if(element==null)
{
element=document.getElementById(inputId);
}
if(element==null)
return;
if(_cbdIsSelectOneMenu(element))
{
jsCBDdisableInput(element, state, labels);
return;
}
else
{
if(element.length==null)
{
jsCBDdisableInput(element, state, labels);
}
else
{
for(var i=0;i < element.length;i++)
{
jsCBDdisableInput(element[i], state, labels);
}
}
}
}
function testIsValidObject(objToTest){
if(null==objToTest){
return false;
}
if("undefined"==typeof(objToTest) ){
return false;
}
return true;
}
jsCBDdisableInput=function(inputElement, state, labels, skipServerSync)
{
if(inputElement==null)
{
return;
}
if(_cbdIsSelectOneMenu(inputElement))
{
_cbdDisableSelect(inputElement, state);
return;
}
if(_cbdIsVgButton(inputElement))
{
vg.button._disable(inputElement, state);
return;
}
var inputType=(typeof(inputElement.type)!='undefined'?inputElement.type:null);
if(inputType=="text"||inputType=="textarea")
{
if(state)
{
jsCBDaddStyle(inputElement, "disabled-input");
}
else
{
jsCBDdeleteStyle(inputElement, "disabled-input");
}
}
else if((labels!=false)&&vg.validation.isInputGroup(inputElement))
{
jsCBDdisableLabels(vg.validation.getStyleTarget(inputElement), state);
}
if(labels)
{
jsCBDdisableLabels(labels, state);
}
if(inputElement.disabled==state)
return;
inputElement.disabled=state;
if(!skipServerSync)
{
var inpFld=inputElement.name!=undefined?inputElement.name:inputElement.id;
var inpId=inpFld+":dsbl";
var inp=jsCBDcreateHiddenInput(inpId, state, inpId, inputElement.parentNode);
}
if(inputType=="button"&&css2)
{
var altClass=inputElement.getAttribute("altClass")
if(altClass!=null)
{
var temp=inputElement.className;
inputElement.className=altClass;
inputElement.setAttribute("altClass", temp);
}
}
}
function jsCBDdisableLabels(labels, state)
{
if(typeof labels=="array")
{
for(var i=0;i<labels.length;i++)
{
jsCBDdisableLabel(labels[i], state);
}
}
else
{
jsCBDdisableLabel(labels, state);
}
}
function jsCBDdisableLabel(label, state)
{
var label=vg.html.getElement(label);
if(!label) return;
if(state)
{
jsCBDaddStyle(label, "disabled-text");
}
else
{
jsCBDdeleteStyle(label, "disabled-text");
}
}
function jsCBDgetSelectOneMenuLabel(id)
{
var pullDown=document.getElementById(id);
var label=null;
if(_cbdIsNativeSelectOneMenu(pullDown))
{
label=pullDown[pullDown.selectedIndex].text;
}
else
{
var controller=vg.comp.getController(pullDown);
label=controller.labelInput.value;
}
return label;
}
jsCBDtriggerSelectOneMenuOnChange=function(id)
{
var menu=document.getElementById(id);
if(menu!=null&&_cbdIsRiaSelectOneMenu(menu))
{
var controller=vg.comp.getController(menu);
controller._executeOnChangeJs(true);
}
else if(menu!=null&&_cbdIsNativeSelectOneMenu(menu))
{
eval(menu.onChange);
}
}
function jsCBDsetSelectOneMenuValue(id, value)
{
var pullDown=document.getElementById(id);
if(_cbdIsNativeSelectOneMenu(pullDown))
{
var options=pullDown.options;
for(var i=0;i < options.length;i++)
{
if(pullDown[i].value==value)
{
pullDown.selectedIndex=i;
}
}
}
else if(pullDown)
{
vg.comp._lazyLoadComp(id);
var controller=vg.comp.getController(pullDown);
var options=controller.options;
for(var i=0;i < options.length;i++)
{
var option=vg.html.getFirstChild(options[i]);
if(option.getAttribute('value')==value)
{
controller._selectItem(option, true, true, false);
}
}
}
}
function jsCBDgetSelectOneMenuValue(id)
{
var pullDown=document.getElementById(id);
var value=null;
if(_cbdIsNativeSelectOneMenu(pullDown))
{
value=pullDown.value;
}
else
{
var controller=vg.comp.getController(pullDown);
value=SelectOneMenu.getValue(id);
}
return value;
}
function jsCBDgetSelectionIndex(id)
{
var pullDown=document.getElementById(id);
var selectedIndex=null;
if(_cbdIsNativeSelectOneMenu(pullDown))
{
selectedIndex=pullDown.selectedIndex;
}
else
{
var controller=vg.comp.getController(pullDown);
selectedIndex=controller.selectedIndex;
}
return selectedIndex;
}
_cbdIsButton=function(caller)
{
return caller.getAttribute&&(caller.getAttribute("type")=="button"||caller.getAttribute("type")=="submit");
}
_cbdIsVgButton=function(node)
{
if(!RIA)
return false;
if(node.length==null)
{
return node.getAttribute("tagname")=="button";
}
return false;
}
jsCBDbookmarkUrl=function(url, title )
{
if(ie)
{
if(url==null)
{
url=location.href;
}
if(title==null)
{
title=document.title;
}
window.external.AddFavorite(url, title)
}
else
{
var navBookMarkInfo="To bookmark this page, press[Enter]and then Ctrl-D.";
var otherBookMarkInfo="Check your browser's help for information on bookmarking this page.";
alert(nav||firefox?navBookMarkInfo:otherBookMarkInfo );
}
}
var FLASH_CHARTS_PATH=window.cbd.page._cbdFlashPath?window.cbd.page._cbdFlashPath+"charts/":"/web/flash/charts/";
var FLASH_IMAGES_PATH=window.cbd.page._cbdImagePath?window.cbd.page._cbdImagePath:"/web/images/";
var _chartConfigs=
{
balance_trend:{chartObj:"cbd.charting.BalanceTrend", toolTip:{orientation:"horizontal", showKey:false, format:"dollar", footer:{value:"%date", format:"%m/%d/%y"}}},
inv_returns:{chartObj:"cbd.charting.BalanceTrend", toolTip:{orientation:"horizontal", showKey:false, format:"dollar", footer:{value:"%date", format:"%m/%d/%y"}}},
growth10k_sl:{chartObj:"cbd.charting.G10K", toolTip:{orientation:"horizontal", format:"dollar"}},
growth10k_sl_compare:{chartObj:"cbd.charting.G10K", compare:true},
market_summary:{chartObj:"cbd.charting.PriceHistory", summary:true, grid:{w:227, h:115}},
market_summary_compare:{chartObj:"cbd.charting.PriceHistory", grid:{w:500, h:200}},
pie_bcm_aa_target:{chartType:'pie', series:{errorCoords:{w:36, h:30}, zeroSumCoords:{w:36, h:30}, errorText:"Target <br/> NotSet", zeroSumError:"Target<br/>NotSet", errorCss:"pie_bcm_aa_target", zeroSumCss:"pie_bcm_aa_target", colors:["#96151D", "#005293", "#69923A"], radius:18, center:{x:18, y:18}}, labels:{show:false}},
pie_bcm_aa_current:{chartType:'pie', series:{colors:["#96151D", "#005293", "#69923A", "#999999"], zeroSumError:"Data<br/>Unavailable", radius:36, center:{x:36, y:36}}, labels:{show:false}},
bar_atrc:{chartType:'verticalBar', margins:{left:"auto", right:6, top:38, bottom:39}, grid:{w:331, h:177, yAxis:{axisColor:'black', title:"%", maxIntervals:4, minIntervals:2, tickLength:5, tickColor:'black'}, xAxis:{showTicks:false, min:0, delta:1, precision:2, firstTickOffset:.5, showAxis:false, showOrigin:true, originColor:'black'}}},
ETFFeesChart:{chartObj:"cbd.charting.EtfFees"},
tax_and_income:{chartObj:"cbd.charting.Chart", chartType:'verticalBar', processDataFunc:"cbd.charting.processTaxAndIncomeData", series:{showNull:false, format:"dollar", colors:['#336699','#6699CC']}, margins:{left:70, right:20, top:20, bottom:20}, schema:{seriesNode:"distribution"}, legend:{align:'horizontal'}, grid:{w:210, h:170, yAxis:{formatFirstAndLast:false, format:"dollar", maxIntervals:4, minIntervals:2, tickLength:5}, xAxis:{showTicks:false, min:0, delta:1, precision:0, firstTickOffset:.5, labels:["1st Qtr", "2nd Qtr", "3rd Qtr", "4th Qtr"]}}},
acct_progress:{chartObj:"cbd.charting.AcctProgress", chartType:'line', schema:{xpath:true, seriesNode:"//chartdata", dataPt:"//ph/@p", labelPt:"//priceHistory/@timePeriod", ttLabelPt:"//ph/@t"}, grid:{w:205, h:130, xAxis:{tickLength:5, showAxis:true, axisColor:'black', showOrigin:true, originColor:'black', showAllLabels:true, labelPos:"midinterval"}, yAxis:{precision:2, formatFirstAndLast:false, format:"dollar", maxIntervals:4, minIntervals:2, axisColor:'black', tickLength:5}}, series:{fillColor:'#5190CD'},margins:{left:"auto", top:5, right:5, bottom:15}},
pie_pw_dt_s:{chartType:'pie', series:{strokeWidth:0.5, counterClockwise:true, strokeColor:'#000000', radius:30, center:{x:40, y:37}, zeroSumError:"No assets", zeroSumCss:"noAssetsCss", zeroSumCoords:{x:10, y:10, w:60, h:40}, showError:true}, legend:{pos:'right',precision:1, layout:["%label", "%percent"]}},
pie_aa_s:{chartType:'pie', series:{strokeWidth:0.5, strokeColor:'#666666', radius:50, center:{x:55, y:55}, zeroSumError:"No assets", zeroSumCss:"noAssetsCss", zeroSumCoords:{x:10, y:10, w:60, h:40}, showError:true}, legend:{pos:'right',precision:2, layout:["%percent", "%label"]},  schema:{xpath:true, seriesNode:"//chartdata", dataPt:"//data/@value", seriesLabelPt:"//data/@label", colorPt:"//data/@color"}},
pie_ov_s:{chartType:'pie', series:{strokeWidth:0.5, counterClockwise:true, strokeColor:'#000000', radius:30, center:{x:40, y:37}, zeroSumError:"No assets", zeroSumCss:"noAssetsCss", zeroSumCoords:{x:10, y:10, w:60, h:40}, showError:true}, legend:{pos:'right',precision:1, layout:["%label", "%percent"]}},
performance:{chartObj:"cbd.charting.Performance", chartType:'line', margins:{bottom:39}, series:{colors:['#000000'], fillColor:'#967D46'}, grid:{yAxis:{format:"dollar", showAxis:false, showTicks:false, precision:0}}, toolTip:{type:"fixed", bar:"range", layout:['%title','%value'], format:"dollar", header:{value:"%date", format:"%M %y"}, showKey:false, persistent:true}}
};
_cbdGetChartConfig=function(chartName)
{
if(chartName)
{
if(chartName.indexOf(".swf") > -1)
{
chartName=chartName.substr(0, chartName.indexOf('.swf'));
}
return  _chartConfigs[chartName];
}
return null;
}
_cbdLoadCanvas=function(id, opts)
{
cbd.loader.require('cbdCharts' );
cbd.loader.require('cbdChartsRender' );
cbd.loader.require('cbdSimpleCharts' );
cbd.loader.require('cbdToolTip' );
if(_cbdGetChartConfig(opts.chart).chartObj )
{
cbd.loader.require('cbdComplexCharts' );
}
if(!document.createElement('canvas').getContext)
{
cbd.loader.require('excanvas');
}
cbd.loader.addCallback(function(){
cbd.charting.buildCanvasChartFromFlash(id, opts);
});
cbd.loader.load();
}
jsCBDWriteFlashHtml=function(id, chartName, path, width, height, loadType, value, altHtml, transparent, passSegment, bgColor, allowScriptAccess, swLiveConnect, connectionKey, nextGenPlayer, posterSrc)
{
var isIE9Plus, xmlSrc, autoPlay, xpath, tags, url, callback;
if(cbd.media._isMediaPlayerComponent(chartName, nextGenPlayer))
{
document.write("<div id='"+id+"'></div>");
isIE9Plus=cbd.browser.isIe&&((navigator.userAgent.indexOf('MSIE 9') > 0)||(navigator.userAgent.indexOf('MSIE 10') > 0) );
xmlSrc=cbd.media._getSrc(value, ".xml");
autoPlay=cbd.media._getAutoPlay(value);
if((xmlSrc.indexOf(".mp4") >=0)||(xmlSrc.indexOf(".flv") >=0))
{
cbd.media._createHTML5Player(chartName, width, height, id, value, nextGenPlayer, posterSrc, isIE9Plus );
return;
}
else if(xmlSrc.indexOf(".xml") >=0&&cbd.media._isCodecSupported()&&!isIE9Plus)
{
xpath='//clip'
tags={path:"path" , thumbnail:"thumbnail", desc:"desc", ccPath:"ccPath", poster:"poster"};
url=xmlSrc;
callback=function(data){cbd.media.addVideoEpisodesToNode({width:width,height:height,nodeId:id,poster:posterSrc,autoPlay:autoPlay,playVideoButton:true,nextGenPlayer:nextGenPlayer},data)};
vg.XML.parseXML(url, xpath, tags, callback);
return;
}
else if(xmlSrc.indexOf(".xml") >=0&&!cbd.media._isCodecSupported()&&!isIE9Plus )
{
cbd.media._createHTML5Player(chartName, width, height, id, value, nextGenPlayer, posterSrc, xmlSrc );
return;
}
cbd.media._createHTML5Player(chartName, width, height, id, value, nextGenPlayer, posterSrc, xmlSrc, isIE9Plus );
return;
}
if(_isChartCanvas(chartName) )
{
document.write("<div><canvas id='"+id+"'></canvas></div>");
_cbdLoadCanvas(id,{chart:chartName, width:width, height:height, path:path, loadType:loadType, values:value});
return;
}
document.write(jsCBDGetFlashHtml(id, chartName, path, width, height, loadType, value, altHtml, transparent, passSegment, bgColor, allowScriptAccess, swLiveConnect, connectionKey) );
}
cbd.charting=cbd.charting||{};
cbd.charting.canvasCharts=["pie_bcm_aa_target.swf", "pie_bcm_aa_current.swf", "balance_trend.swf", "inv_returns.swf", "growth10k_sl.swf", "bar_atrc.swf", "pie_ov_s.swf"];
_isChartCanvas=function(chartName)
{
var canvasCharts=cbd.charting.canvasCharts,
numberOfCharts=canvasCharts.length,
i,
renderChartAsCanvas=false;
for(i=0;i < numberOfCharts;i++)
{
if(chartName===canvasCharts[i])
{
renderChartAsCanvas=true;
break;
}
}
return(renderChartAsCanvas||(!jsCBDisFlashInstalled()&&_cbdGetChartConfig(chartName)) );
}
cbd.media={};
cbd.media.llPrefix="http://vanguard.vo.llnwd.net/o1";
cbd.media.llSuffix=".mp4";
cbd.media.videoPlayerChartName="VanguardMediaPlayer.swf";
cbd.media.audioPlayerChartName="VanguardAudioPlayer.swf";
cbd.media.flvFileExtnsn="flv";
cbd.media.FLASH_NOT_INSTALLED_MSG='<table border="1" class="flashBox" cellspacing="0" cellpadding="5"><tr><td style="padding-right:10px"><p>You\'ll need to <a href="http://www.macromedia.com/go/getflashplayer"> download Macromedia Flash or<br/>upgrade your existing version </a> to view this data.<br/>The upgrade takes approximately 1 minute with a<br/>56k dial-up modem.</p></td></tr></table>';
cbd.media.ERROR_DOWNLOADING_FILE_MSG='<table border="1" class="flashBox" cellspacing="0" cellpadding="5"><tr><td style="padding-right:14px"><p>There was an error downloading the media file -<br/>Please verify access to your media file.</p></td></tr></table>';
cbd.media._isMediaBeingCreated=false;
cbd.media._isCodecSupported=function()
{
if(document.createElement('video').canPlayType)
{
var vidTest=document.createElement("video");
var h264Test=vidTest.canPlayType('video/mp4;codecs="avc1.42E01E, mp4a.40.2"');
if(h264Test)
{
if(h264Test=="probably")
{
}
else
{
}
return h264Test=="probably"?true:false;
}
}
return false;
}
cbd.media._getSrcFromValue=function(value, chartName)
{
var fileSrc="";
var flvSrc=value.substring(value.indexOf('=')+1 , value.indexOf('.flv')+4);
if(chartName==cbd.media.videoPlayerChartName)
{
fileSrc=cbd.media.llPrefix+flvSrc.substring(flvSrc.indexOf('o1')+2, flvSrc.indexOf(cbd.media.flvFileExtnsn)-1)+cbd.media.llSuffix;
}
else
{
fileSrc=flvSrc;
}
return fileSrc;
}
cbd.media._getSrc=function(value, format)
{
var src="";
if(value.indexOf(format)!==-1)
{
src=value.substring(value.indexOf('=')+1 , value.indexOf(format)+4);
}
return src;
}
cbd.media._getCcSource=function(value)
{
var ccSource='';
if(value.indexOf("ccSource=")==-1)
{
return null;
}
var ccSource=value.substring(value.indexOf('ccSource=')+9 , value.indexOf('.xml')+4);
return ccSource;
}
cbd.media._getAutoPlay=function(value)
{
var autoPlay='';
if(value.indexOf("autoPlay=")==-1)
{
return false;
}
autoPlay=value.substring(value.indexOf('autoPlay=')+9 , value.indexOf('autoPlay=')+10);
autoPlay=autoPlay.toLowerCase();
if(isEmpty(autoPlay))
{
autoPlay=false;
}
else if(autoPlay==='t')
{
autoPlay=true;
}
else
{
autoPlay=false;
}
return autoPlay;
}
cbd.media._isMediaPlayerComponent=function(chartName, nextGenPlayer)
{
if(nextGenPlayer&&((chartName==cbd.media.videoPlayerChartName)||(chartName==cbd.media.audioPlayerChartName)))
{
return true;
}
if(!jsCBDisFlashInstalled()&&cbd.media._isCodecSupported()&&((chartName==cbd.media.videoPlayerChartName)||(chartName==cbd.media.audioPlayerChartName)))
{
return true;
}
return false;
}
cbd.media._createHTML5Player=function(chartName, width, height, targetId, value, nextGenPlayer, posterSrc, xmlSrc, isIE9Pls )
{
var isIE9Plus=isIE9Pls;
if(isIE9Plus==null)
{
isIE9Plus=cbd.browser.isIe&&((navigator.userAgent.indexOf('MSIE 9') > 0)||(navigator.userAgent.indexOf('MSIE 10') > 0) );
}
var autoPlay=cbd.media._getAutoPlay(value);
var ccSource=cbd.media._getCcSource(value);
if(chartName==cbd.media.videoPlayerChartName)
{
var mp4Src=cbd.media._getSrc(value, ".mp4");
if(mp4Src==="")
{
mp4Src=cbd.media._getSrcFromValue(value, chartName);
}
var flvSrc=cbd.media._getSrc(value, ".flv");
cbd.media.addVideoToNode({
width:width,
height:height,
nodeId:targetId,
poster:posterSrc,
autoPlay:autoPlay,
ccSource:ccSource,
playVideoButton:true,
nextGenPlayer:nextGenPlayer,
flshSource:flvSrc,
mp4Source:mp4Src,
isIE9Plus:isIE9Plus,
xmlSource:xmlSrc});
}
if(chartName==cbd.media.audioPlayerChartName)
{
var mp3src=cbd.media._getSrc(value, ".mp3");
cbd.media.addAudioToNode({
width:width,
height:height,
nextGenPlayer:nextGenPlayer,
nodeId:targetId,
isIE9Plus:isIE9Plus,
mp3Source:mp3src});
}
}
cbd.media._createHTML5VideoPlayer=function(width, height, targetId, src )
{
var loadVideo=function()
{
var video=new vg.Video({
width:width,
height:height,
nodeId:targetId,
mp4Source:src});
}
cbd.loader.require('cbdVideoCSS' );
vg.util.loadClientSideComp({module:'cbdVideo', callback:loadVideo});
}
cbd.media._createHTML5AudioPlayer=function(width, height, targetId, src )
{
var loadAudio=function()
{
var audio=new vg.Audio({
width:width,
height:height,
nodeId:targetId,
mp3Source:src});
}
vg.util.loadClientSideComp({module:'cbdAudio', callback:loadAudio});
}
cbd.page.FLASH_NOT_INSTALLED_FLAG=false;
jsCBDGetFlashHtml=function(id, chartName, path, width, height, loadType, value, altHtml, transparent, passSegment, bgColor, allowScriptAccess, swLiveConnect, connectionKey)
{
if(RIA&&value!=null&&value.indexOf("&amp;") < 0)
{
value=value.replace(/&/g, "&amp;");
}
if(cbd.page.isNextGen)
{
value+="&amp;isNextGen=true";
}
if(jsCBDisFlashInstalled() )
{
var chart=new Array();
var flashObjectHtml;
chart["n"]=chartName;
chart["p"]=path;
chart["w"]=width;
chart["h"]=height;
chart["l"]=loadType;
chart["v"]=value;
chart["a"]=altHtml;
chart["t"]=transparent;
chart["s"]=passSegment;
chart["b"]=bgColor;
chart["sc"]=allowScriptAccess;
chart["sw"]=swLiveConnect;
chart["key"]=connectionKey;
_flashCharts[id]=chart;
if(ie&&!mac)
{
flashObjectHtml=_cbdGetFlashObjectHtml(id, chartName, path, width, height, loadType, value, transparent, passSegment, bgColor, allowScriptAccess, swLiveConnect, connectionKey);
}
else
{
flashObjectHtml=_cbdGetFlashEmbedHtml(id, chartName, path, width, height, loadType, value, transparent, passSegment, bgColor, allowScriptAccess, swLiveConnect, connectionKey);
}
return flashObjectHtml;
}
else
{
flashmsgExceptions=new Array("petransactions.swf",
"pie_vpex_investwise.swf");
if(!cbd.page.FLASH_NOT_INSTALLED_FLAG)
{
for(var i=0;i < flashmsgExceptions.length;i++)
{
if(chartName==flashmsgExceptions[i])
{
cbd.page.FLASH_NOT_INSTALLED_FLAG=true;
break;
}
}
var FLASH_NOT_INSTALLED_MSG='<table border="1" class="flashBox" cellspacing="0" cellpadding="5" width="280"><tr><td><p>You\'ll need to <a href="http:\/\/www.macromedia.com/go/getflashplayer"> download Macromedia Flash or upgrade your existing version </a> to view this data. The upgrade takes approximately 1 minute with a 56k dial-up modem.</p></td></tr></table>';
return altHtml!=null?altHtml:FLASH_NOT_INSTALLED_MSG;
}
else
{
return '';
}
}
}
_cbdGetFlashObjectHtml=function(id, chartName, path, width, height, loadType, value, transparent, passSegment, bgColor, allowScriptAccess, swLiveConnect, connectionKey)
{
var objHtmlStart='<OBJECT\n'+
'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"\n'+
'id="'+id+'"\n'+
'name="'+chartName+'"\n'+
'WIDTH="'+width+'"\n'+
'HEIGHT="'+height+'">\n'+
'<PARAM NAME="movie" VALUE="'+path+chartName+'"/>\n'+
'<PARAM NAME="quality" VALUE="high"/>\n'+
' <PARAM NAME="swliveconnect" value="'+swLiveConnect+'"/>\n'+
'<PARAM NAME="allowFullScreen" value="true"/>\n'+
' <PARAM NAME="allowScriptAccess" value="'+allowScriptAccess+'"/>\n';
if(bgColor==null )
{
bgColor='#FFFFFF';
}
objHtmlStart+='<PARAM NAME="bgcolor" VALUE="'+bgColor+'"/>\n';
if(transparent )
{
objHtmlStart+='<PARAM NAME="wmode" VALUE="opaque"/>\n';
}
if(passSegment )
{
var segment=jsCBDgetSegment();
value+="&"+"segment="+segment;
}
var objHtmlParam='<PARAM NAME="FlashVars" VALUE="loadType='+loadType+'&amp;'+value;
if(connectionKey!='')
{
objHtmlParam+='&amp;localConnectionKey='+connectionKey;
}
objHtmlParam+='"/>\n';
var objHtmlEnd='</OBJECT>\n';
return objHtmlStart+(loadType!=null?objHtmlParam:"")+objHtmlEnd;
}
_cbdGetFlashEmbedHtml=function(id, chartName, path, width, height, loadType, value, transparent, passSegment, bgColor, allowScriptAccess, swLiveConnect, connectionKey)
{
if(bgColor==null )
{
bgColor='#FFFFFF';
}
var embHtmlStart='<embed\n'+
'id="'+id+'"\n'+
'name="'+chartName+'"\n'+
'quality="high"\n'+
'bgcolor="'+bgColor+'"\n'+
'swLiveConnect="'+swLiveConnect+'"\n'+
'allowScriptAccess="'+allowScriptAccess+'"\n'+
'allowFullScreen="true"\n'+
'width="'+width+'"\n'+
'height="'+height+'"\n'+
'type="application/x-shockwave-flash"\n'+
'src="'+path+chartName+'"\n';
if(transparent )
{
embHtmlStart+='wmode="opaque"\n';
}
if(passSegment )
{
var segment=jsCBDgetSegment();
value+="&amp;"+"segment="+segment;
}
var embHtmlParam='flashvars="loadType='+loadType+'&amp;'+value;
if(connectionKey!='')
{
embHtmlParam+='&amp;localConnectionKey='+connectionKey;
}
embHtmlParam+='">\n';
var embHtmlEnd='</embed>\n';
return embHtmlStart+(loadType!=null?embHtmlParam:">")+embHtmlEnd;
}
jsCBDupdateFlash=function(chart, keyvar, val){
var flash=jsCBDgetFlashObjById(chart);
flash.SetVariable(keyvar, val);
}
jsCBDupdateChart=function(chartId, key, values)
{
var chart=vg.html.getElement(chartId);
if(chart&&chart.tagName.toUpperCase()=="CANVAS")
{
var controller=vg.comp.getController(chart);
if(controller)
{
controller.updateAttr(key, values);
return;
}
}
newVal=key+"="+values;
c=_flashCharts[chartId];
oldVal=c["v"];
var amp=RIA?"&amp;":"&";
startPos=oldVal.indexOf(key);
if(startPos < 0)
{
newVal=oldVal+amp+newVal;
}
else
{
newVal=oldVal.substring(0, startPos)+newVal;
endPos=oldVal.indexOf(amp, startPos+1);
if(endPos > 0)
{
newVal+=oldVal.substring(endPos, oldVal.length);
}
}
flashHtml=jsCBDGetFlashHtml(chartId, c["n"], c["p"], c["w"], c["h"], c["l"], newVal, c["a"], c["t"], c["s"], c["b"]);
var spanNode=jsCBDgetParent(document.getElementById(chartId), "span", "true", _isMovieElement);
spanNode.innerHTML="";
jsCBDsetElementInnerHtml(spanNode.id, flashHtml,null,true);
}
jsCBDtoggleAllFlashVis=function(state)
{
var results=jsCBDgetElementsByAttr(document.getElementById("main"), "span", "type", "movieContainer");
for(var i=0;i<results.length;i++)
{
if(_cbdFindAncestor(results[i],{tagName:'span',attrName:'type',attrValue:'Layer'})==null)
{
results[i].style.visibility=(state)?"visible":"hidden";
}
}
}
jsCBDpreloadFlashChart=function(chartName, path)
{
if(_isChartCanvas(chartName))
{
return;
}
document.write('<DIV STYLE="display:none">')
if(path==null)
{
jsCBDWriteFlashHtml(chartName, chartName+'.swf','/web/flash/charts/','0','0','XML',null, null, false, false);
}
else
{
jsCBDWriteFlashHtml(chartName, chartName+'.swf', path,'0','0','XML',null, null, false, false);
}
document.write(' </DIV>')
}
jsCBDgetFlashObjById=function(id)
{
var flashObj=document.getElementById(id);
if(flashObj&&flashObj.tagName.toUpperCase()=="CANVAS")
{
return vg.comp.getController(flashObj);
}
else if(safari)
{
return document.getElementById(id);
}
else
{
return window.document[id];
}
}
jsCBDjumpToVideoCuePoint=function(id, cuePoint, autoplay)
{
var flash=jsCBDgetFlashObjById(id);
if(flash&&flash.jumpToVideoCuePoint)
{
flash.jumpToVideoCuePoint(cuePoint, autoplay);
}
}
jsCBDjumpToVideoTime=function(id, time, autoplay)
{
var flash=jsCBDgetFlashObjById(id);
if(flash&&flash.jumpToVideoTime)
{
flash.jumpToVideoTime(time, autoplay);
}
}
jsCBDisVideoPlaying=function(id)
{
var flash=jsCBDgetFlashObjById(id);
if(flash&&flash.isVideoPlaying)
{
return flash.isVideoPlaying();
}
return false;
}
jsCBDplayVideo=function(id)
{
var flash=jsCBDgetFlashObjById(id);
if(flash&&flash.playVideo)
{
flash.playVideo();
}
}
jsCBDpauseVideo=function(id)
{
var flash=jsCBDgetFlashObjById(id);
if(flash&&flash.pauseVideo)
{
flash.pauseVideo();
}
}
jsCBDgetMediaPlayheadTime=function(id)
{
var flash=jsCBDgetFlashObjById(id);
if(flash&&flash.getPlayheadTime)
{
return flash.getPlayheadTime();
}
return null;
}
function _isMovieElement(parentNode)
{
var parent=parentNode;
if(parent!=null)
{
var parentType=parent.getAttribute('type');
if(parentType=="movieContainer")
{
return true;
}
}
}
var cbd_loaded_stylesheets={};
jsCBDloadCSS=function(url)
{
if(!cbd_loaded_stylesheets[url])
{
var e=document.createElement("link");
e.rel="stylesheet";
e.href=url;
document.getElementsByTagName("head")[0].appendChild(e);
cbd_loaded_stylesheets[url]=1;
}
}
jsCBDaddFlashHtmlToNode=function(targetId, id, chartName, path, width, height, loadType, value, altHtml, transparent, passSegment, bgColor, allowScriptAccess, swLiveConnect, connectionKey, nextGenPlayer, posterSrc)
{
var isIE9Plus, xmlSrc, autoPlay, xpath, tags, url, callback;
if(cbd.media._isMediaPlayerComponent(chartName, nextGenPlayer))
{
isIE9Plus=cbd.browser.isIe&&((navigator.userAgent.indexOf('MSIE 9') > 0)||(navigator.userAgent.indexOf('MSIE 10') > 0) );
xmlSrc=cbd.media._getSrc(value, ".xml");
autoPlay=cbd.media._getAutoPlay(value);
if((xmlSrc.indexOf(".mp4") >=0)||(xmlSrc.indexOf(".flv") >=0))
{
cbd.media._createHTML5Player(chartName, width, height, targetId, value, nextGenPlayer, posterSrc, isIE9Plus );
return;
}
else if(xmlSrc.indexOf(".xml") >=0&&cbd.media._isCodecSupported()&&!isIE9Plus )
{
xpath='//clip';
tags={path:"path" , thumbnail:"thumbnail", desc:"desc", ccPath:"ccPath", poster:"poster"};
url=xmlSrc;
callback=function(data){cbd.media.addVideoEpisodesToNode({width:width,height:height,nodeId:targetId,poster:posterSrc,autoPlay:autoPlay,playVideoButton:true,nextGenPlayer:nextGenPlayer},data)};
vg.XML.parseXML(url, xpath, tags, callback);
return;
}
else if(xmlSrc.indexOf(".xml") >=0&&!cbd.media._isCodecSupported()&&!isIE9Plus )
{
cbd.media._createHTML5Player(chartName, width, height, targetId, value, nextGenPlayer, posterSrc, xmlSrc );
return;
}
cbd.media._createHTML5Player(chartName, width, height, targetId, value, nextGenPlayer, posterSrc, xmlSrc, isIE9Plus );
return;
}
if(_isChartCanvas(chartName))
{
_cbdLoadCanvas(id,{parent:targetId, chart:chartName, width:width, height:height, path:path, loadType:loadType, values:value});
return;
}
var out=jsCBDGetFlashHtml(id, chartName, path, width, height, loadType, value, altHtml, transparent, passSegment, bgColor, allowScriptAccess, swLiveConnect, connectionKey);
jsCBDsetElementInnerHtml(targetId, out, null, true);
}
cbd.media.addVideoToNode=function(opts)
{
var waitTime=250, xpath, tags, url, callback, mediaDiv, v;
if(cbd.media._isMediaBeingCreated)
{
waitTime=3500;
}
var mediaDiv=document.getElementById(opts.nodeId);
if(mediaDiv!=null)
{
while(mediaDiv.firstChild ) mediaDiv.removeChild(mediaDiv.firstChild );
}
if(opts.xmlSource)
{
xpath='//clip';
tags={path:"path", thumbnail:"thumbnail", desc:"desc", ccPath:"ccPath", poster:"poster"};
url=opts.xmlSource;
callback=function(data){cbd.media.addVideoEpisodesToNode(opts,data)};
vg.XML.parseXML(url, xpath, tags, callback);
return;
}
if(!vg.Video)
{
setTimeout(function()
{
cbd.media._loadVideo(opts);
}, waitTime);
}
else
{
setTimeout(function()
{
v=new vg.Video(opts);
}, waitTime);
}
cbd.media._isMediaBeingCreated=true;
return;
}
cbd.media.addVideoEpisodesToNode=function(opts, xmlObj)
{
var waitTime=250;
if(cbd.media._isMediaBeingCreated)
{
waitTime=3500;
}
var mediaDiv=document.getElementById(opts.nodeId);
if(mediaDiv!=null)
{
while(mediaDiv.firstChild ) mediaDiv.removeChild(mediaDiv.firstChild );
}
if(!vg.Video)
{
setTimeout(function()
{
cbd.media._loadVideo(opts, xmlObj);
}, waitTime);
}
else
{
setTimeout(function()
{
var v=new vg.Video(opts, xmlObj);
}, waitTime);
}
cbd.media._isMediaBeingCreated=true;
return;
}
cbd.media._loadVideo=function(opts, xmlObj)
{
cbd.loader.loadAndExec('cbdVideo', function(){new vg.Video(opts, xmlObj)});
}
cbd.media.addAudioToNode=function(opts)
{
var mediaDiv=document.getElementById(opts.nodeId);
if(mediaDiv!=null)
{
while(mediaDiv.firstChild ) mediaDiv.removeChild(mediaDiv.firstChild );
}
if(!vg.Audio)
{
setTimeout(function()
{
cbd.media._loadAudio(opts);
}, 250);
}
else
{
var v=new vg.Audio(opts);
}
return;
}
cbd.media._loadAudio=function(opts)
{
cbd.loader.loadAndExec('cbdAudio', function(){new vg.Audio(opts)});
}
jsCBDsetConfigInfo=function(app, val )
{
var configCookie=vg.constants.CONFIG;
var currVal=jsCBDgetCookie(configCookie );
var newVal;
val=(val+"").charAt(0);
if(isEmpty(currVal ) )
{
currVal="";
}
var pos=currVal.indexOf(app );
if(pos >=0 )
{
pos+=app.length;
newVal=currVal.substring(0, pos)+val+currVal.substring(pos+1, currVal.length );
}
else
{
newVal=currVal+app+val+";";
}
jsCBDsetCookie(configCookie, newVal, new Date((new Date()).getTime()+2*365*24*60*60*1000), "/", ".vanguard.com" );
}
jsCBDgetConfigInfo=function(app )
{
var val=jsCBDgetCookie(vg.constants.CONFIG );
if(isEmpty(val) )
{
return false;
}
var pos=val.indexOf(app )+app.length;
return val.charAt(pos)=='t'||val.charAt(pos)=='T';
}
jsCBDback=function(useDocReferrer )
{
if(useDocReferrer )
{
var prevPage=document.referrer;
if(!isEmpty(prevPage)&&prevPage.indexOf("vanguard.com") >=0 )
{
jsCBDgoToUrl(prevPage );
return;
}
}
if(history.length >(firefox?1:0))
{
history.back();
}
else
{
window.close();
}
}
jsCBDaddQueryStringParam=function(url, param, value, encode, skipEmpty)
{
if(isEmpty(value)&&skipEmpty)
{
return url;
}
var ampersand=encode?"%26":"&";
var anchPos=url.indexOf("#");
if(anchPos==0)
{
return url;
}
var anch="";
if(anchPos > 0)
{
anch=url.substring(anchPos);
url=url.substring(0, anchPos);
}
url.indexOf("?")!=-1?url+=ampersand:url+="?";
if(param!=null)
{
url+=param+"=";
}
url+=value+anch;
return url;
}
jsCBDgetQueryValue=function(attribute)
{
var myQstr;
var value="";
var myArray=new Array();
var attVal=new Array();
var i;
myQstr=new String(location.search.substring(1));
myQstr=unescape(myQstr);
myArray=myQstr.split("&");
for(i=0;i < myArray.length;i++)
{
attVal=myArray[i].split("=");
if(attVal[0].toUpperCase()==attribute.toUpperCase())
{
value=attVal[1];
break;
}
}
return value;
}
var flipperState="flipperState";
var flipperStatesSet=false;
jsCBDsetFlipperStates=function(param)
{
if(!css2)
return;
var flippers;
var flipperValue;
var id;
var state;
flipperStatesSet=true;
flippers=param.split(",");
for(var i=0;i < flippers.length;i++)
{
flipperValue=flippers[i].split("*");
id=flipperValue[0];
state=flipperValue[1];
jsCBDtoggleFlipper(id, state=="true", false );
}
}
jsCBDremoveQueryValue=function(url, name)
{
if(url.indexOf(name)!=-1)
{
var paramvalue=jsCBDgetQueryValue(name);
var paramString="&"+name+"="+paramvalue;
url=url.replace(paramString, "");
}
return url;
}
jsCBDtoggleFlipper=function(id, state, init, stateKeeperId)
{
if(!init||!flipperStatesSet)
{
jsCBDtoggle(id, state);
jsCBDtoggleFlipperImage(id+imgExt, state );
}
_cbdToggleFlipperStateCss(id,jsCBDisVisible(id));
if(stateKeeperId)
{
document.getElementById(stateKeeperId).value=jsCBDisVisible(id);
}
}
function _cbdToggleFlipperStateCss(id, state)
{
var flipperTBodyClosedCss='flipperClosed';
var flipperControlClosedCss='flipperRowClosed';
var flipperTBodyOpenCss='flipperOpen';
var flipperControlOpenCss='flipperRowOpen';
var flipperTBody=document.getElementById(id);
var flipperImg=document.getElementById(id+imgExt);
if(flipperImg!=null)
{
var flipperControl=vg.html.findAncestor(flipperImg,{tagName:null},
function(node)
{
return vg.html.hasStyle(flipperControlClosedCss, node)||vg.html.hasStyle(flipperControlOpenCss, node);
});
}
if(flipperTBody)
{
vg.html.addOrRemoveStyle(flipperTBodyOpenCss, flipperTBody, state);
vg.html.addOrRemoveStyle(flipperTBodyClosedCss, flipperTBody,!state);
}
if(flipperControl)
{
vg.html.addOrRemoveStyle(flipperControlOpenCss, flipperControl, state);
vg.html.addOrRemoveStyle(flipperControlClosedCss, flipperControl,!state);
}
}
function _toggleSortLinkImage(sortCell)
{
var imageDiv=vg.html.getElements(sortCell,{tagName:'div'}, function(node){return vg.html.hasStyle('sortImg', node)})[0];
if(!imageDiv) return;
if(vg.html.hasStyle("sortUp", imageDiv))
{
vg.html.replaceClass(imageDiv, "sortUp", "sortUpHover");
}
else if(vg.html.hasStyle("sortDown", imageDiv))
{
vg.html.replaceClass(imageDiv, "sortDown", "sortDownHover");
}
else if(vg.html.hasStyle("sortUpHover", imageDiv))
{
vg.html.replaceClass(imageDiv, "sortUpHover", "sortUp");
}
else if(vg.html.hasStyle("sortDownHover", imageDiv))
{
vg.html.replaceClass(imageDiv, "sortDownHover", "sortDown");
}
}
function _handleFlipperEvent(aEvent, flipId, state, init, stateKeeperId, onStateChange, isWebUsageEnabled)
{
if(aEvent.aEvent)
{
params=aEvent;
aEvent=params.aEvent;
flipId=params.flipId;
state=params.state;
init=params.init;
stateKeeperId=params.stateKeeperId;
onStateChange=params.onStateChange;
isWebUsageEnabled=params.isWebUsageEnabled;
}
if(isWebUsageEnabled=="true")
{
var action;
if(state==null)
{
action=(document.getElementById(flipId).style.display.indexOf('none') > -1)?"opened":"closed";
}
else
{
action=state?"opened":"closed";
}
jsCBDLogActionEvent("TableFlipper:"+flipId+":" , "action_"+action);
}
var eventnode=jsCBDgetEventNode(aEvent);
if(eventnode)
{
with(eventnode)
{
if(nodeName.toLowerCase()=='td'||
nodeName.toLowerCase()=='th'||
(nodeName.toLowerCase()=='img'&&id.toLowerCase()==(flipId.toLowerCase()+'-img'))||
(nodeName.toLowerCase()=='div'&&eventnode.getAttribute("type")=="trigger")||
nodeName.toLowerCase()=='span'||nodeName.toLowerCase()=='a' )
{
jsCBDtoggleFlipper(flipId, state, init, stateKeeperId, onStateChange);
if(onStateChange!=null)
{
eval(onStateChange+"("+jsCBDisVisible(flipId)+",'"+flipId+"')");
}
if(RIA)
{
var obj=document.getElementById(flipId);
vg.html._fireCustomEvent(vg.event.GEO_CHANGE, obj);
}
return true;
}
else
{
return false;
}
}
}
else
{
return true;
}
}
function _clickSortLink(aEvent)
{
"use strict";
var eventPropagationFunction='vg.html.stopEventPropagation(event);',
eventnode=jsCBDgetEventNode(aEvent),
eventNodeName,
currentTarget,
sortLinkSpan,
imageNode,
isNodeNotInSortLink,
sortLink,
onclick;
if(eventnode)
{
eventNodeName=eventnode.nodeName.toLowerCase();
currentTarget=('th'===eventNodeName)?eventnode:vg.html.findAncestor(eventnode,{tagName:"th"});
sortLinkSpan=_cbdGetElements(currentTarget,{tagName:'span', attrName:'type', attrValue:'SortLink'})[0];
imageNode=_cbdGetElements(sortLinkSpan,{tagName:'div'})[0];
isNodeNotInSortLink=imageNode&&eventnode!==imageNode&&eventnode!==imageNode.parentNode&&'a'!==eventNodeName&&'img'!==eventNodeName;
if(sortLinkSpan&&isNodeNotInSortLink)
{
sortLink=_cbdGetElements(sortLinkSpan,{tagName:'a'})[0];
if(sortLink)
{
if(!ieQuirksMode)
{
onclick=sortLink.getAttribute("onclick");
sortLink.setAttribute('onclick', eventPropagationFunction+onclick);
}
jsCBDexecCmdLink(sortLink);
}
}
}
}
jsCBDgetFlipperStates=function(url)
{
if(!css2)
return;
var id;
var flipperInfo="";
var state;
url=jsCBDremoveQueryValue(url, flipperState);
var tbody=document.getElementsByTagName('tbody');
if(!tbody)
{
return url;
}
for(var i=0;i < tbody.length;i++)
{
id=tbody[i].getAttribute("id");
if(id&&document.getElementById(id+imgExt))
{
state=document.getElementById(id).style.display;
state=(state!="none");
if(flipperInfo!="")
{
flipperInfo+=",";
}
flipperInfo=flipperInfo+id+"*"+state;
}
}
return flipperInfo==""?url:jsCBDaddQueryStringParam(url, flipperState, flipperInfo);
}
jsCBDOpenGlossaryTerm=function(url )
{
win=jsCBDopenWin(url, CBD_NONMODAL_POP, Y, Y, 350, 225, null, false, true);
if(win!=null )
{
win.focus();
}
}
jsCBDPositionMenu=function(menuId, event )
{
if(jsCBDisVisible(menuId) )
{
return;
}
_cbdPositionFlyout(menuId, event);
}
_cbdPositionFlyout=function(menuId, event)
{
var ul=document.getElementById(menuId),
flyoutTopPosition,
className,
FIRST_ITEM_PADDING=1,
FIRST_ITEM_PADDING_NG=9,
BORDER=1,
menuHeight=ul.clientHeight,
screenHeight=jsCBDgetScreenHeight(),
cursorYposition=safari?event.screenY:event.clientY,
availableHeight=safari?cursorYposition:screenHeight - cursorYposition,
menuExcessHeight=availableHeight - menuHeight,
nextGen=cbd.page.isNextGen;
if(menuExcessHeight < 0 )
{
if(Math.abs(menuExcessHeight) <(cursorYposition - 20))
{
var insideParent=_cbdFindAncestor(jsCBDgetEventNode(event),{tagName:'ul', attrName:'id', attrValue:menuId});
var offset=(availableHeight < 10)?10:0;
if(!insideParent)
ul.style.top=(menuExcessHeight+offset)+"px";
}
else
{
var listTop=cursorYposition - 40;
ul.style.top=(listTop > 0)?"-"+listTop+"px":"-"+BORDER+"px";
}
}
else
{
className=ul.parentNode.className;
if(className.indexOf("firstItem")==-1 )
{
if(nextGen)
{
flyoutTopPosition="-"+(FIRST_ITEM_PADDING_NG+BORDER)+"px";
}
else
{
flyoutTopPosition="-"+(FIRST_ITEM_PADDING+BORDER)+"px";
}
}
else{
flyoutTopPosition="-"+BORDER+"px";
}
ul.style.top=flyoutTopPosition;
}
}
jsCBDgetScreenHeight=function()
{
var browserHeight;
if(firefox)
{
browserHeight=document.documentElement.clientHeight;
}
else if(nav6plus||ieQuirksMode)
{
browserHeight=document.body.clientHeight;
}
else
{
browserHeight=window.innerHeight;
}
return browserHeight;
}
jsCBDgetScreenWidth=function()
{
var browserWidth;
if(firefox)
{
browserWidth=document.documentElement.clientWidth;
}
else if(nav6plus||ieQuirksMode)
{
browserWidth=document.body.clientWidth;
}
else
{
browserWidth=window.innerWidth;
}
return browserWidth;
}
_cbdGetRelativePxSize=function(relSize, fullSize)
{
if(relSize.indexOf('%') > -1)
{
relSize=relSize.split('%');
relSize=((relSize[0]/100 )*fullSize)+'px';
}
return relSize;
}
_cbdGetScreenRelativeWidth=function(width)
{
return _cbdGetRelativePxSize(width, jsCBDgetScreenWidth());
}
_cbdGetScreenRelativeHeight=function(height)
{
return _cbdGetRelativePxSize(height, jsCBDgetScreenHeight());
}
jsCBDaddValidator=function()
{
var args=jsCBDaddValidator.arguments;
var isJSON=(args[0].valArgs!=null);
var validatorJSON={};
if(isJSON)
{
validatorJSON=args[0];
validatorJSON["funcName"]=validatorJSON.valArgs.shift();
}
else
{
validatorJSON["clientId"]=args[0];
validatorJSON["funcName"]=args[1];
var argArr=[];
for(var i=2;i<args.length;i++)
{
argArr.push(args[i]);
}
validatorJSON["valArgs"]=argArr;
}
if(validatorJSON.clientId==null)
{
validatorJSON["clientId"]=vg.constants.LOOSE_VALIDATORS_ID;
}
var validatorsForId=allValidators[validatorJSON.clientId];
if(validatorsForId==null)
{
validatorsForId=new Array();
}
var thisValidatorPos=_cbdFindValidator(validatorsForId, validatorJSON.funcName);
if(thisValidatorPos >=0)
{
validatorsForId[thisValidatorPos]=validatorJSON;
}
else
{
validatorsForId.push(validatorJSON);
}
allValidators[validatorJSON.clientId]=validatorsForId;
}
jsCBDremoveValidator=function(id, valFunc)
{
var validatorJSON;
var clientID;
var funcName;
var isJSON=id.valArgs!=null;
if(isJSON)
{
validatorJSON=id;
clientId=validatorJSON.clientId;
funcName=validatorJSON.valArgs.shift();
}
else
{
clientId=id;
funcName=valFunc;
}
var validatorsForId=allValidators[clientId];
if(validatorsForId==null)
{
return;
}
var validatorPos=_cbdFindValidator(validatorsForId, funcName);
if(validatorPos >=0)
{
validatorsForId.splice(validatorPos, 1);
}
allValidators[clientId]=validatorsForId;
}
jsCBDremoveAllValidators=function(id)
{
allValidators[id]=null;
}
_cbdFindValidator=function(validators, validator)
{
for(var i=0;i < validators.length;i++)
{
if(validators[i].funcName==validator)
{
return i;
}
}
return -1;
}
jsCBDvalidateById=function(id, pageLevelValidation, ria, skipErrSummary)
{
this.ria=ria;
var isValid=_processValidatorsForId(id, pageLevelValidation);
if(!skipErrSummary)
{
jsCBDupdateErrSummary();
}
return isValid;
}
function _processValidators(form)
{
if(!css2)
return;
var isValid=true;
jsCBDresetErrList();
for(var id in allValidators)
{
if(_cbdIsForm(form)&&form[id])
{
isValid=(_processValidatorsForId(id, 'true')&&isValid);
}
}
jsCBDupdateErrSummary();
if(isValid)
{
_cbdDisableSubmitButton();
}
return isValid;
}
_cbdDisableSubmitButton=function()
{
var hiddenInp=document.getElementById("submitBtnClicked");
if((hiddenInp!=null)&&hiddenInp.getAttribute("disableOnClick") )
{
var button=document.getElementById(hiddenInp.value);
if("image"==(button.getAttribute("btnType")) )
{
jsCBDdisableImageButton(button, true);
}
else
{
jsCBDdisableInput(button, true);
}
}
}
function _processValidatorsForId(id, pageLevelValidation)
{
var validators=allValidators[id];
if(validators==null)
{
return true;
}
var isValid=true;
for(var i=0;i < validators.length;++i )
{
var validatorJSON=validators[i];
var validatorAsStr=validatorJSON.funcName;
if(validatorAsStr=="jsCBDvalidateOnServer"&&pageLevelValidation)
{
continue;
}
var suppressCustomValidatorsOnBlur;
var element=document.getElementById(id);
if(element&&element.form)
{
suppressCustomValidatorsOnBlur=(element.form.getAttribute("suppressCustomValidatorsOnBlur")==="true");
}
if(suppressCustomValidatorsOnBlur&&!pageLevelValidation&&!validatorJSON.standard)
{
continue;
}
var validator=eval(validatorAsStr);
isValid=(validator(validatorJSON.valArgs)&&isValid);
if(!isValid&&id!=vg.constants.LOOSE_VALIDATORS_ID)
{
return false;
}
}
return isValid;
}
function _bypassValidation()
{
allValidators=new Array();
}
jsCBDloadScript=function(url)
{
var e=document.createElement("script");
e.src=url;
e.type="text/javascript";
document.getElementsByTagName("head")[0].appendChild(e);
}
function fmscroll(scrollheight, menuID)
{
var menu=document.getElementById(menuID);
if(menu&&(menu.offsetHeight > scrollheight) )
{
menu.style.height=scrollheight+"px";
menu.style.overflow="auto";
menu.className="scroll";
}
}
function FlyoutObject(triggerId, flyoutId, showPath, pulldownIDs, topMenuClickable)
{
this.triggerId=triggerId;
this.flyoutId=flyoutId;
this.showPath=showPath;
this.pulldownIDs=pulldownIDs;
this.topMenuClickable=topMenuClickable;
}
var _cbdNoLabelChange=false;
jsCBDregisterFlyout=function(triggerId, flyoutId, showPath, pulldownIDs, nolabelchange, topMenuClickable)
{
var thisFlyout=new FlyoutObject(triggerId, flyoutId, showPath, pulldownIDs, topMenuClickable);
var flyOutIndex=0;
while(flyOutIndex < flyoutArray.length )
{
if(flyoutArray[flyOutIndex].flyoutId===flyoutId )
{
break;
}
flyOutIndex++;
}
flyoutArray[flyOutIndex]=new FlyoutObject(triggerId, flyoutId, showPath, pulldownIDs, topMenuClickable);
_cbdNoLabelChange=nolabelchange;
}
jsCBDcloseFlyouts=function(anEvent)
{
jsCBDcloseFOC(anEvent );
if(vg.NavBox&&vg.NavBox.openWindowShadeId)
{
_cbdCloseWindowShadeNavboxes(anEvent );
}
var eventNode=jsCBDgetEventNode(anEvent );
for(var i=0;i < flyoutArray.length;i++)
{
closeFlyout(flyoutArray[i].triggerId, flyoutArray[i].flyoutId, eventNode, flyoutArray[i].showPath, flyoutArray[i].pulldownIDs, flyoutArray[i].topMenuClickable);
}
}
function getNthAncestor(node, n)
{
for(var i=0;i < n;i++, node=node.parentNode)
{
if(node==null)
{
return null;
}
}
return node;
}
function controlPulldowns(ids, state)
{
var idArray=new Array();
idArray=ids.split(",");
for(var i=0;i < idArray.length;i++)
{
toggleVisibility(idArray[i], state);
}
return;
}
function closeFlyout(triggerId, flyoutid, eventnode, showPath, pulldownIDs, topMenuClickable)
{
var triggerNode=document.getElementById(triggerId).parentNode,
OPEN_ICON="openIcon",
searchNode=document.getElementById(flyoutid),
child,
parentUL;
if(jsCBDisVisible(triggerId))
{
vg.html.addStyle(OPEN_ICON, triggerNode);
}
else
{
vg.html.removeStyle(OPEN_ICON, triggerNode);
}
setPulldonws=!(pulldownIDs=="NONE");
if(setPulldonws)
{
if(jsCBDisVisible(triggerId))
{
controlPulldowns(pulldownIDs, false)
}
else
{
controlPulldowns(pulldownIDs, true)
}
}
tagName=eventnode.parentNode.tagName;
var node=eventnode;
while(tagName=="A"||tagName=="LI"||tagName=="UL")
{
node=node.parentNode;
tagName=node.tagName;
}
if(eventnode.firstChild===null&&node.id===flyoutid)
{
return;
}
if(!(tagName=="DIV"&&node.id==flyoutid))
{
child=vg.html.getElements(searchNode,{tagName:'li', attrName:'class', attrValue:'firstItem'});
parentUL=child[0].parentNode||null;
if(parentUL)
{
closeOpenFOCMenus(parentUL);
}
jsCBDtoggle(triggerId, false);
vg.html.removeStyle(OPEN_ICON, triggerNode);
if(setPulldonws)
{
controlPulldowns(pulldownIDs, true);
}
return;
}
input=document.getElementById(flyoutid+'INPUT');
menu=document.getElementById(flyoutid+'menu');
if(eventnode.tagName=="LI")
{
eventnode=eventnode.firstChild;
if(eventnode.firstChild==null) return;
}
var parentUL_id=getNthAncestor(eventnode, 2).id;
parentMenu=(parentUL_id==triggerId);
hasChildMenu=(eventnode.parentNode.lastChild.tagName=='UL');
if(topMenuClickable||!(parentMenu&&hasChildMenu))
{
nodeLabel=eventnode.firstChild.nodeValue;
parentLI=getNthAncestor(eventnode, 3);
parentLIlabel=parentLI.firstChild.firstChild;
if(!_cbdNoLabelChange&&input!=null)
{
input.value=nodeLabel;
input.title=nodeLabel;
}
tagName=eventnode.tagName;
var node=eventnode;
var nodeValue="";
var nodeValues="";
var nodePath="";
while(tagName=="LI"||tagName=="UL"||tagName=="A")
{
node=node.parentNode;
tagName=node.tagName;
className=node.className;
if(tagName=="LI"&&className!="trigger")
{
nodeValue=node.getAttribute("menuValue");
if(nodeValue!=null)
{
nodeValues=nodeValue+","+nodeValues;
var firstchildchild=node.firstChild.firstChild;
if(firstchildchild!=null)
{
nodePath=firstchildchild.nodeValue+" - "+nodePath;
}
}
}
}
nodeValues=nodeValues.substring(0,nodeValues.length-1);
nodePath=nodePath.substring(0,nodePath.length-3);
if(parentMenu)
{
if(menu!=null){
menu.value=nodeValues;
}
}
else
{
if(!_cbdNoLabelChange&&showPath)
{
input.value=input.title=nodePath;
}
if(menu!=null){
menu.value=nodeValues;
}
}
}
else
{
jsCBDtoggle(triggerId, true);
if(setPulldonws)
{
controlPulldowns(pulldownIDs, false);
}
}
return false;
}
function closeChildMenu(node, event)
{
vg.html.preventDefault(event);
if(node)
{
var children=node.children,
childrenLength=children.length,
lastElement=childrenLength > 0?children[childrenLength - 1]:null,
sibling;
if(lastElement&&lastElement.tagName==="UL")
{
jsCBDtoggleVisibility(lastElement, false);
removeHighlightedParents(node);
closeChildMenu(lastElement.children[0], event);
}
sibling=vg.html.getSibling(node,{tagName:'li'}, '+');
if(sibling)
{
closeChildMenu(sibling, event);
}
}
}
function toggleVisibility(id, state, event )
{
if(!css2)
return;
var e;
if((e=document.getElementById(id))==null)
return;
var e=jsCBDgetHtmlNode(e);
var evt=jsCBDgetEvent(event);
if(!state&&e.contains&&e.contains(evt.toElement))
return;
with(e.style)
{
if(isVisible(id)!=state||state==null )
{
var constantsNS=vg.constants;
var hidden=constantsNS.HIDDEN;
var visible=constantsNS.VISIBLE;
visibility=(visibility==hidden)?visible:hidden;
}
}
}
function isVisible(id)
{
return document.getElementById(id).style.visibility!=vg.constants.HIDDEN;
}
cbd.page.parentFlyoutMenuItem=null;
function highlightControl(aEvent, state)
{
var node=jsCBDgetEventNode(aEvent ),
nextGen=cbd.page.isNextGen,
CBD_HIGHLIGHT="cbdHighlight",
parentA,
UL_visibility,
visible,
subMenu;
if(node.tagName==="LI")
{
node=vg.html.getFirstChild(node);
}
if(state)
{
vg.html.addStyle(CBD_HIGHLIGHT, node);
}
else{
vg.html.removeStyle("cbdHighlight", node);
if(nextGen)
{
removeHighlightedParents(node);
subMenu=node.parentNode.parentNode.children[0];
if(subMenu)
{
closeChildMenu(subMenu, aEvent);
}
}
}
if(node.parentNode.parentNode.tagName=="UL")
{
UL_visibility=node.parentNode.parentNode.style.visibility;
}
else
{
return;
}
parentA=getNthAncestor(node, 3);
if(parentA==null||vg.html.getFirstChild(parentA).tagName!="A")
{
if(state)
{
if(cbd.page.parentFlyoutMenuItem!=null)
{
vg.html.removeStyle(cbd.page.parentFlyoutMenuItem, CBD_HIGHLIGHT);
cbd.page.parentFlyoutMenuItem=null;
}
}
return;
}
parentTag=vg.html.getFirstChild(parentA);
if(parentTag.tagName!="INPUT")
{
visible=(UL_visibility=="visible");
if(!nextGen){
if(!state)
{
vg.html.removeStyle("cbdHighlight", parentTag);
}
if(visible)
{
vg.html.addStyle(CBD_HIGHLIGHT, parentTag);
}
}
else if(state)
{
highlightParents(node);
}
if(visible)
{
cbd.page.parentFlyoutMenuItem=parentTag;
}
}
return;
}
function highlightParents(node)
{
var flyoutSelectorSub=node.parentNode.parentNode,
flyoutSelector=flyoutSelectorSub.parentNode;
if(flyoutSelector.tagName==="LI"&&node.tagName==="A" )
{
vg.html.addStyle("cbdHighlight", flyoutSelector.firstChild);
highlightParents(flyoutSelector);
}
else if(flyoutSelector.tagName==="UL"&&node.tagName==="LI"&&flyoutSelectorSub.firstChild.tagName==="A" )
{
vg.html.addStyle("cbdHighlight", flyoutSelectorSub.firstChild);
highlightParents(flyoutSelector);
}
}
function removeHighlightedParents(node)
{
var flyoutSelector=node.parentNode.parentNode.parentNode;
if(flyoutSelector.tagName==="UL"&&node.tagName==="LI" )
{
vg.html.removeStyle("cbdHighlight", node.firstChild);
removeHighlightedParents(flyoutSelector);
}
}
function closeOpenFOCMenus(menu)
{
var menuLength=menu.children.length,
i,
subMenu;
if(menu.tagName==="UL")
{
for(i=0;i<menuLength;i++)
{
subMenu=menu.children[i].children[1];
if(subMenu&&subMenu.tagName==="UL")
{
removeHighlightedParents(menu.children[0]);
jsCBDtoggleVisibility(subMenu, false);
closeOpenFOCMenus(subMenu);
}
}
}
}
jsCBDPositionSelector=function(menuId, event)
{
var node=jsCBDgetEventNode(event );
var event=event?event:window.event;
if(!(node.className=="noSub"||node.nodeName=="LI") )
{
_cbdPositionFlyout(menuId, event );
}
}
jsCBDcopyButtonBehavior=function(tbId, sbName)
{
document.getElementById(tbId).name=sbName;
}
function _debug(id, someText )
{
var theId=document.getElementById(id);
theId.appendChild(document.createTextNode(someText), vg.html.getFirstChild(theId) );
theId.appendChild(document.createElement('br') );
return;
}
function _flyoutSelectorOnclick(value, onclick, onchange, event, flyoutId)
{
var e=jsCBDgetEvent(event);
jsCBDcloseFlyouts(e);
if(onclick!=null&&onclick!='null')
{
eval(onclick+"('"+value+"')");
}
if(flyoutId!=null&&flyoutId!='null'){
var flyout=document.getElementById(flyoutId);
if(flyout.prevSelected!=value&&onchange!=null&&onchange!='null')
{
eval(onchange+"('"+value+"','"+flyoutId+"')");
flyout.prevSelected=value;
}
}
}
jsCBDresetFlyoutSelection=function(flyoutId)
{
var flyout=document.getElementById(flyoutId);
if(flyout!=null)
{
flyout.prevSelected=null;
}
}
jsCBDcreateHiddenInput=function(name, value, id, node)
{
var inp=document.getElementById(id);
if(inp==null)
{
inp=document.createElement("input");
inp.type="hidden";
inp.id=id;
node.appendChild(inp);
}
inp.name=name;
inp.value=value;
return inp;
}
jsCBDgetElementsByAttr=function(parentNode, tagName, attrName, attrVal)
{
var nodes=parentNode.getElementsByTagName(tagName);
var length=nodes.length;
var results=new Array();
for(var i=0;i < length;i++)
{
var nodeAttVal=(attrName=="className")?nodes[i].className:nodes[i].getAttribute(attrName);
if(nodeAttVal==attrVal)
{
results.push(nodes[i]);
}
}
return results;
}
function _trackSubmitButton(button)
{
"use strict";
var btnId, cbd_btn, disable, form, formId, hiddenInput, i, inputs;
btnId=button.getAttribute("id");
button=document.getElementById(btnId);
if(button===null)
{
return;
}
disable=button.getAttribute("disableOnSubmit");
if(disable==='true')
{
hiddenInput=jsCBDcreateHiddenInput(btnId, btnId, "submitBtnClicked", button.parentNode);
hiddenInput.setAttribute("disableOnClick", disable);
}
form=_cbdGetParentForm(button);
if(form===null)
{
return;
}
formId=(form!==null?form.getAttribute("id"):"");
_cbdSetButtonHiddenInput(formId, btnId);
if(button.tagName.toLowerCase()==='a')
{
inputs=button.getElementsByTagName("input");
for(i=0;i < inputs.length;i++)
{
if(inputs[i].getAttribute('transient'))
{
jsCBDdisableInput(inputs[i], false);
}
}
}
}
_cbdSetButtonHiddenInput=function(formId, btnId)
{
if(cbd_btn=document.getElementById(formId+":cbd_btn"))
{
cbd_btn.value=cbd_btn.name=btnId;
}
}
_cbdConcat=function(array1, array2)
{
for(var i=0;i < array2.length;i++)
{
array1.push(array2[i])
}
}
_cbdGetElements=function(context, oFilter, check )
{
var elements=new Array();
var tagName=oFilter.tagName;
if(!context )
{
return elements;
}
var nodes=context.getElementsByTagName(tagName);
if(!check )
{
check=function(a ){return true;};
}
oFilter.tagName=null;
for(var i=0;i < nodes.length;++i)
{
var node=nodes[i];
if(_cbdCheckNodeAttrs(node, oFilter )&&check(node ) )
{
elements.push(node );
}
}
return elements;
}
_cbdGetFormElements=function(form)
{
var formElements=new Array();
_cbdConcat(formElements, form.getElementsByTagName('input'));
_cbdConcat(formElements, form.getElementsByTagName('select'));
_cbdConcat(formElements, _cbdGetElements(form,{tagName:'span', attrName:'compName', attrValue:'selectOneMenu'}));
_cbdConcat(formElements, form.getElementsByTagName('textarea'));
return formElements;
}
jsCBDgetFormElement=function(context, name )
{
var elements=_cbdGetFormElements(_cbdGetParentForm(context ) );
for(var i=0;i < elements.length;i++)
{
if(elements[i].getAttribute('name' )==name )
{
return elements[i];
}
}
return null;
}
_cbdGetParentForm=function(node)
{
if(node!=null)
{
if(_cbdIsForm(node))
{
return node;
}
while((node=node.parentNode)!=null)
{
if(_cbdIsForm(node))
{
return node;
}
}
}
return null;
},
_cbdGetNodesParentFormAction=function(comp)
{
var node=vg.html.getElement(comp),
form, action=null;
if(node)
{
form=_cbdGetParentForm(node);
action=(form)?form.getAttribute("action"):action;
}
return action;
},
_cbdIsForm=function(node)
{
var nodeName=node.nodeName.toLowerCase();
return nodeName=="form"||(nodeName=="div"&&node.getAttribute('formAvatar')!=null)
}
jsCBDSubmitForm=function(triggerId, immediate)
{
var triggerElement=document.getElementById(triggerId);
var form=jsCBDgetParent(triggerElement, "FORM", true);
if(immediate||_processValidators(form))
{
vg.comp.trackCommandComponent(triggerElement);
if(form!=null)
{
form.submit();
}
}
}
var clickedState=false;
function _buttonOnHover(btn)
{
vg.html.setStyle("hover", btn);
}
function _buttonOnClick(btn)
{
clickedState=true;
vg.html.setStyle("press", btn);
}
function _buttonOnFocus(btn)
{
if(!clickedState)
{
vg.html.setStyle("focus", btn);
}
}
function _buttonOnBlur(btn)
{
vg.html.setStyle("default", btn);
}
function _buttonDefault(btn)
{
clickedState=false;
vg.html.setStyle("default", btn);
}
var idCount=0;
function _cbdGetIdCount()
{
return idCount++;
}
jsCBDgetHtmlNode=function(e)
{
return e.viewNode?e.viewNode:e;
}
_cbdGetCobrowseContextRoot=function()
{
return jsCBDgetContextRoot(CONTEXT_ROOT_SECURE);
}
_cbdEncodeAmps=function(str)
{
return str.replace(/&/g, '&amp;');
}
jsCBDdisableLink=function(link)
{
var href=link.getAttribute("href");
link.removeAttribute("href");
var onclick=link.getAttribute("onclick");
link.setAttribute("onclick", new function(){return false;});
jsCBDaddStyle(link, "disabled-text");
if((new String(onclick)).indexOf("return false") < 0 )
{
window.location.href=href;
}
}
jsCBDdisableCommandComponent=function(component,timeIn)
{
var time=3000;
if(timeIn!=null)
{
time=timeIn;
}
if(component.type!=null&&component.type=="button")
{
jsCBDdisableInput(component,true);
window.setTimeout(function(){jsCBDdisableInput(component,false);},time)
}
else if(component.attributes['comp']!=null&&component.attributes['comp'].value=='CommandLink')
{
jsCBDtoggleLink(component,false);
window.setTimeout(function(){jsCBDtoggleLink(component,true);},time)
}
else if(component.attributes['type']!=null&&component.attributes['type'].value=='button')
{
jsCBDdisableInput(component,true);
window.setTimeout(function(){jsCBDdisableInput(component,false);},time)
}
}
jsCBDtoggleLink=function(link, state, disabledClass, containerId, suppressDisableAttr)
{
if(link.link!=null)
{
var params=link;
link=params.link;
state=params.state;
disabledClass=params.disabledClass;
containerId=params.containerId;
suppressDisableAttr=params.suppressDisableAttr;
}
var nextGen=cbd.page.isNextGen;
if(nextGen)
{
var compSpan=vg.html.findAncestor(link,{tagName:"span", attrName:"class", attrValue:/^comp-/});
var stateSpan;
if(compSpan&&(vg.html.hasStyle("comp-OutputLink", compSpan)||(vg.html.hasStyle("comp-CommandLink", compSpan))))
{
stateSpan=vg.html.getElements(compSpan,{tagName:"span", attrName:"name", attrValue:"state"})[0];
}
disabledClass=(disabledClass==null)?'disabled-text':disabledClass;
}
else
{
disabledClass=(disabledClass==null)?'disabled-text bold':disabledClass;
}
suppressDisableAttr=(suppressDisableAttr==null)?false:suppressDisableAttr;
if(containerId!=null)
{
var cont=document.getElementById(containerId);
var aTags=cont.getElementsByTagName('a');
for(var i=0;i < aTags.length;i++)
{
jsCBDtoggleLink({link:aTags[i], state:true, disabledClass:disabledClass, suppressDisableAttr:suppressDisableAttr});
}
jsCBDtoggleLink({link:link, state:false, disabledClass:disabledClass, suppressDisableAttr:suppressDisableAttr});
return;
}
if(state)
{
link.removeAttribute("linkdisabled");
link.removeAttribute("disabled");
var orig_onclick=link.getAttribute("orig_onclick");
var orig_href=link.getAttribute("orig_href");
var orig_onmouseup=link.getAttribute("orig_onmouseup");
if(orig_onclick!=null)
{
link.setAttribute('onclick', orig_onclick);
}
if(orig_href!=null)
{
link.setAttribute('href', orig_href);
}
if(orig_onmouseup!=null)
{
link.setAttribute('onmouseup', orig_onmouseup);
}
link.removeAttribute("orig_onclick");
link.removeAttribute("orig_href");
link.removeAttribute("orig_onmouseup");
jsCBDdeleteStyle(link, disabledClass);
if(nextGen&&stateSpan)
{
jsCBDdeleteStyle(stateSpan, 'disabled-text');
}
}
else
{
if(link.getAttribute("linkdisabled")!=null)
{
return;
}
link.setAttribute('linkdisabled', 'true');
if(suppressDisableAttr==false )
{
link.setAttribute('disabled', 'disabled');
}
link.setAttribute('orig_onclick', link.getAttribute("onclick"));
link.setAttribute('orig_href', link.getAttribute("href"));
link.setAttribute('orig_onmouseup', link.getAttribute("onmouseup"));
link.removeAttribute("href");
link.setAttribute('onclick', null);
link.setAttribute('onmouseup', null);
jsCBDaddStyle(link, disabledClass);
if(nextGen&&stateSpan)
{
jsCBDaddStyle(stateSpan, 'disabled-text');
}
}
}
jsCBDgetSelectTableColumnInputs=function(tableId, dataColNum)
{
var nodes=new Array();
var controller=document.getElementById(tableId);
var nodeAllRows=controller.getElementsByTagName('TR');
for(var i=0;i < nodeAllRows.length;i++)
{
var nodesRow=nodeAllRows[i].getElementsByTagName('TD');
if(nodesRow.length > 0)
{
for(var j=0;j < nodesRow.length;j++)
{
if(j==(dataColNum-1))
{
var colspan=nodesRow[j].getAttribute('colspan');
if(colspan==null||colspan=='1')
{
var nodesInput=nodesRow[j].getElementsByTagName('INPUT');
for(var k=0;k < nodesInput.length;k++)
{
nodes[nodes.length]=nodesInput[k];
}
}
}
}
}
}
return(nodes);
}
jsCBDgetSelectTableRowInputs=function(tableId, rowNum)
{
var controller=document.getElementById(tableId);
var nodeAllRows=controller.getElementsByTagName('TR');
var nodesRow=nodeAllRows[rowNum-1].getElementsByTagName('INPUT');
return(nodesRow);
}
jsCBDgetSelectTableAllInputs=function(tableId)
{
var controller=document.getElementById(tableId);
var nodes=controller.getElementsByTagName('INPUT');
return(nodes);
}
jsCBDcheckSelectTableCheckboxes=function(tableId, set, number)
{
var elements;
if("col"==set)
{
elements=jsCBDgetSelectTableColumnInputs(tableId, number);
}
else if("row"==set)
{
elements=jsCBDgetSelectTableRowInputs(tableId, number);
}
else
{
elements=jsCBDgetSelectTableAllInputs(tableId);
}
if(elements==null||elements.length==0)
return;
if(elements.length)
{
var i;
for(i=0;i<elements.length;i++)
{
_cbdSetNodeChecked(elements[i]);
}
}
else
{
_cbdSetNodeChecked(elements);
}
}
_cbdSetNodeChecked=function(node)
{
var input=jsCBDgetHtmlNode(node);
input.setAttribute("checked", "true");
}
jsCBDgetScrollTop=function()
{
return _cbdGetScrollTop();
}
_cbdGetScrollTop=function()
{
if(RIA&&vg.html.getElement('wrapDiv'))
{
return vg.html.getElement('wrapDiv').scrollTop;
}
return _cbdGetBodyScrollTop();
}
_cbdGetBodyScrollTop=function()
{
return(ieQuirksMode)?document.body.scrollTop:window.pageYOffset;
}
_cbdGetScrollRight=function()
{
if(RIA&&vg.html.getElement('wrapDiv'))
{
return vg.html.getElement('wrapDiv').scrollRight;
}
return(ieQuirksMode)?document.body.scrollRight:window.pageXOffset;
}
_cbdGetScrollLeft=function()
{
if(RIA&&vg.html.getElement('wrapDiv'))
{
return vg.html.getElement('wrapDiv').scrollLeft;
}
return(ieQuirksMode)?document.body.scrollLeft:window.pageXOffset;
}
jsCBDisPopupBlocker=function()
{
var popupBlocker=false;
var myTest=window.open("about:blank","","directories=no,height=10,width=10,menubar=no,resizable=no,scrollbars=no,status=no,titlebar=no,top=0,location=no");
if(!myTest)
{
popupBlocker=true;
}
else
{
myTest.close();
}
return popupBlocker;
}
var CBD_PREFIX="cbd_";
var intClasses=new Object();
intClasses[CBD_PREFIX+'intButton']=true;
intClasses[CBD_PREFIX+'int-only']=true;
intClasses[CBD_PREFIX+'vbutton-int']=true;
intClasses[CBD_PREFIX+'alertInt']=true;
intClasses[CBD_PREFIX+'thInt']=true;
intClasses[CBD_PREFIX+'arInt']=true;
intClasses[CBD_PREFIX+'wrInt']=true;
intClasses[CBD_PREFIX+'internal']=true;
intClasses[CBD_PREFIX+'msgBoxInt']=true;
intClasses[CBD_PREFIX+'offInt']=true;
intClasses[CBD_PREFIX+'onInt']=true;
intClasses[CBD_PREFIX+'tabonInt']=true;
intClasses[CBD_PREFIX+'taboffInt']=true;
jsCBDisIntComp=function(element)
{
while(element!=null&&element.nodeName.toLowerCase()!='body')
{
var cssClasses=element.className;
if(!isEmpty(cssClasses))
{
var classArr=cssClasses.split(" ");
for(var i=0;i < classArr.length;i++)
{
if(intClasses[CBD_PREFIX+classArr[i]])
{
return true;
}
}
}
element=element.parentNode;
}
return false;
}
jsCBDscrollIntoView=function(id)
{
var obj=document.getElementById(id);
obj.scrollIntoView(true);
}
jsCBDReDrawChart=function(chartId, values, hideLabels)
{
jsCBDupdateFlash(chartId, "values", values);
}
jsCBDchangeFlashSize=function(chartId, w, h)
{
var flash=jsCBDgetFlashObjById(chartId);
flash.width=w;
flash.height=h;
}
jsCBDgetFlyoutSelectedValues=function(flyoutId)
{
var menu=document.getElementById(flyoutId+'menu');
var subMenu=document.getElementById(flyoutId+'submenu');
var valuesArr=new Array();
valuesArr[0]=menu.value;
valuesArr[1]=subMenu.value;
return valuesArr;
}
function _isYUILoaderDefined()
{
return cbd.getYUI();
}
function _isCBDLoaderDefined(){
return(window.cbd&&cbd.loader);
}
function _isVGDefined(){
return(window.vg);
}
jsCBDinitCalendarLayer=function(func){
if(!vg.Layer){
cbd.loader.require("cbdLayer");
cbd.loader.addCallback(func);
cbd.loader.load(true);
}
else{
func();
}
}
jsCBDinitChatLayer=function(queryString, isInst)
{
if(cbd.page.isNextGen)
{
jsCBDloadCSS('/web/stylesheet/roundBox.css');
}
if(isInst===undefined||isInst==null)
{
isInst=false;
}
if(queryString===undefined||queryString==null)
{
queryString="";
}
var chatBlock=jsCBDgetQueryValue('cbdPop');
var chatContextRoot=jsCBDgetContextRoot(CONTEXT_ROOT_SECURE);
var sUrl;
var cntxtRoot;
var scrollTop=_cbdGetScrollTop();
scrollTop=(0.07*scrollTop)+scrollTop;
scrollTop=(scrollTop==0)?'10%':scrollTop+'px';
if(isInst)
{
sUrl=chatContextRoot+'Chat.jsf';
cntxtRoot="/VGApp/pe";
}
else
{
if(jsCBDgetSegment())
{
sUrl=chatContextRoot+'ChatFrontControllerSec';
}
else
{
sUrl=chatContextRoot+'ChatFrontController';
}
cntxtRoot="/hnwnesc";
}
sUrl+="?firstTime=true";
if(queryString!=""){
sUrl+='&';
sUrl+=queryString;
}
if(chatBlock=='1'||(chatContextRoot.indexOf(cntxtRoot)>0))
{
return;
}
var div=document.getElementById('chatWindow' );
var body=document.body;
if(!div )
{
div=document.createElement('div' );
div.setAttribute('id', 'chatWindow' );
vg.html.getElements(body,{tagName:'div'}, function(node){return vg.html.hasStyle("vg0", node)})[0].appendChild(div);
}
div.setAttribute('loadedURL',sUrl);
div.setAttribute('chatContextRoot',chatContextRoot);
div.setAttribute('queryString',queryString);
div.setAttribute('isInst',isInst);
if(!_isYUILoaderDefined())
{
jsCBDloadScript("https://static.vgcontent.info/web/common/yui/3.3.0/build/yui/yui-min.js" );
_cbdCheckConditionsAndExecute(_isYUILoaderDefined, _cbdLoadLoader);
}
else
{
_cbdLoadChatLayer();
}
}
_cbdLoadLoader=function()
{
jsCBDloadScript("/web/javascript/loader.js" );
_cbdCheckConditionsAndExecute(_isCBDLoaderDefined, _cbdLoadRIA);
}
_cbdLoadRIA=function()
{
cbd.loader.require("RIA");
cbd.loader.require("RIAStyle");
cbd.loader.require("AJAX");
cbd.loader.require("VG");
if(document.getElementById('debugWindow') )
{
cbd.loader.addCallback(_cbdOpenDebugLayer);
}
else
{
cbd.loader.addCallback(_cbdLoadChatLayer);
}
cbd.loader.load(true);
}
_cbdLoadChatLayer=function()
{
var chatNode=document.getElementById('chatWindow' );
var url=chatNode.getAttribute('chatContextRoot')+'com/vanguard/util/cbd/data/jsp/hnw/ChatLayer.jsf'
url=jsCBDaddQueryStringParam(url, "queryString", "'"+chatNode.getAttribute('queryString')+"'");
url=jsCBDaddQueryStringParam(url, "isInst", chatNode.getAttribute('isInst'));
jsCBDgetContent(url, _cbdLoadChatLayerCallback, null );
var scrollListener=function(){_cbdExecOnScrollEnd(_cbdPositionChatLayer)};
vg.html.addEventListener(window, 'scroll', scrollListener);
vg.html.addEventListener(window, 'DOMMouseScroll', scrollListener);
chatPopup=true;
}
_cbdLoadContentCallback=function(myRequest, error, caller )
{
var div=caller.div;
if(error!=null )
{
div.innerHTML=caller.errorMsg;
return;
}
var html=myRequest.responseText;
jsCBDsetElementInnerHtml({target:div,html:html,onLoadCallback:caller.onload});
}
_cbdLoadChatLayerCallback=function(myRequest, error, caller )
{
var div=document.getElementById('chatWindow' );
if(error!=null )
{
div.innerHTML='Unable to load Chat content';
return;
}
var html=myRequest.responseText;
jsCBDsetElementInnerHtml({target:div,html:html,onLoadCallback:_cbdOpenChatLayer});
}
_cbdOpenChatLayer=function()
{
var layer=document.getElementById('ChatLayer' );
var currentHref=window.location.href.replace(/&/g,"%26");
layer.jsController.contentURL=document.getElementById('chatWindow' ).getAttribute('loadedURL');
layer.jsController.contentLoaded=false;
jsCBDopenLayer('ChatLayer', null, null, _cbdRestoreChatLayerUserPref );
vg.html.scrollPage(0, 0);
}
_cbdRestoreChatLayerUserPref=function()
{
var layerController=vg.comp.getController(document.getElementById('ChatLayer' ));
if(cbdInitChatPosX&&cbdInitChatPosY )
{
layerController.changePosition(null, cbdInitChatPosX, cbdInitChatPosY);
}
if(cbdInitChatWidth )
{
layerController.width=cbdInitChatWidth;
}
if(cbdInitChatHeight )
{
layerController.setHeightAttribute(cbdInitChatHeight);
}
layerController.reposition();
}
_cbdPositionChatLayer=function()
{
var scrollTop=_cbdGetScrollTop();
scrollTop=(0.07*scrollTop)+scrollTop;
scrollTop=(scrollTop==0)?'10%':scrollTop+'px';
var layerController=document.getElementById('ChatLayer' ).jsController;
if(layerController.openFlag)
{
layerController.changePosition(null, layerController.positionLeft, scrollTop);
layerController.reposition();
}
}
_cbdSaveChatLayerPosition=function()
{
var layerViewNode=document.getElementById('ChatLayer' );
var layer=vg.comp.getController(layerViewNode);
var leftPos=layerViewNode.style.left;
var topPos=layerViewNode.style.top;
var width=layerViewNode.style.width;
var height=layerViewNode.style.height;
layer.changePosition(null, leftPos, topPos);
jsCBDgetContent(document.getElementById('chatWindow' ).getAttribute('chatContextRoot')+"com/vanguard/util/cbd/data/jsp/hnw/ChatLayer.jsf?chatLeftPos="+leftPos+"&chatTopPos="+topPos+"&chatWidth="+width+"&chatHeight="+height);
}
var CHAT_IN_PROGRESS="_chatInProgress";
jsCBDsetChatInProgress=function(inProgress)
{
var indexOfSuffix=window.name.lastIndexOf(CHAT_IN_PROGRESS);
var windowNameHasSuffix=indexOfSuffix >=0;
if(inProgress&&!windowNameHasSuffix)
{
window.name=window.name+CHAT_IN_PROGRESS;
}
else if(!inProgress&&windowNameHasSuffix)
{
window.name=window.name.replace(CHAT_IN_PROGRESS,"");
}
}
jsCBDisChatInProgress=function()
{
return window.name.lastIndexOf(CHAT_IN_PROGRESS) >=0;
}
_cbdExecOnScrollEnd=function(func)
{
if(_cbdExecOnScrollEnd.scrollTimeOutId)
{
clearTimeout(_cbdExecOnScrollEnd.scrollTimeOutId)
}
_cbdExecOnScrollEnd.scrollTimeOutId=setTimeout(func, 100);
}
jsCBDsetPageSkin=function(skin, hiddenInputId)
{
_cbdSetElementSkin('body', skin, hiddenInputId);
}
jsCBDsetElementSkin=function(skinElementId, skin, hiddenInputId)
{
_cbdSetElementSkin(skinElementId, skin, hiddenInputId);
}
_cbdSetElementSkin=function(elementId, skin, hiddenInputId)
{
var element=document.getElementById(elementId);
jsCBDdeleteStyleRegExp(element, 'skin-[a-zA-Z0-9-]*' );
jsCBDaddStyle(element, 'skin-'+skin);
if(hiddenInputId!=null)
{
var hiddenInput=document.getElementById(hiddenInputId);
if(hiddenInput!=null)
{
hiddenInput.value=skin;
}
}
}
_cbdFindElemTop=function(obj)
{
var elemtop=0;
if(obj.offsetParent)
{
elemtop=obj.offsetTop
while(obj=obj.offsetParent)
{
elemtop+=obj.offsetTop
}
}
return elemtop;
}
jsCBDsetDivPos=function(idDiv, idElem)
{
var objDiv=document.getElementById(idDiv);
var objElem=document.getElementById(idElem);
if(objDiv!=null&&objElem!=null)
{
var divtop=_cbdFindElemTop(objDiv);
var elemtop=_cbdFindElemTop(objElem);
objDiv.scrollTop=(elemtop-divtop);
}
}
var calClick=false;
function isDayClicked()
{
return calClick;
}
_cbdFindCalendarForm=function(context )
{
if(context ){
return _cbdGetParentForm(context );
}
if(document.calendar ){
return document.calendar;
}
var layerdiv=document.getElementById("cal" );
if(layerdiv ){
var div=_cbdFindCalendarFormFromList(layerdiv.getElementsByTagName('div' ) );
if(div){
return div;
}
}
var divs=document.getElementsByTagName('div' );
return _cbdFindCalendarFormFromList(divs );
}
_cbdFindCalendarFormFromList=function(divs ){
var form=null;
for(var i=0;i < divs.length;i++){
var div=divs[i];
if(_cbdIsForm(div )){
if(div.getAttribute("name" )=="calendar" )
return div;
form=div;
}
}
return form;
}
function getMonth()
{
return jsCBDgetFormElement(_cbdFindCalendarForm(), 'calMonth' );
}
function getYear()
{
return jsCBDgetFormElement(_cbdFindCalendarForm(), 'calYear' );
}
function getTarget()
{
return _cbdFindCalendarForm().getAttribute('action' );
}
function getStartDay()
{
return jsCBDgetFormElement(_cbdFindCalendarForm(), 'startDay' );
}
function getEndDay()
{
return jsCBDgetFormElement(_cbdFindCalendarForm(), 'endDay' );
}
function getSatSel()
{
return jsCBDgetFormElement(_cbdFindCalendarForm(), 'satSel' );
}
function getSunSel()
{
return jsCBDgetFormElement(_cbdFindCalendarForm(), 'sunSel' );
}
function getStartYear()
{
var element=jsCBDgetFormElement(_cbdFindCalendarForm(), 'startYear' );
if(element!=null )
{
return element.value;
}
return null;
}
function getEndYear()
{
var element=jsCBDgetFormElement(_cbdFindCalendarForm(), 'endYear' );
if(element!=null )
{
return element.value;
}
return null;
}
function getBlockedFullDates()
{
var element=jsCBDgetFormElement(_cbdFindCalendarForm(), 'blockedFullDates' );
if(element!=null )
{
return element.value;
}
return null;
}
function getEnableAjaxRefresh()
{
return jsCBDgetFormElement(_cbdFindCalendarForm(), 'enableAjaxRefresh' );
}
function getSelectedDay()
{
var element=jsCBDgetFormElement(_cbdFindCalendarForm(), 'selectedDay' );
if(element!=null )
{
return element.value;
}
return null;
}
function getSelectedMonth()
{
var element=jsCBDgetFormElement(_cbdFindCalendarForm(), 'selectedMonth' );
if(element!=null )
{
return element.value;
}
return null;
}
function getSelectedYear()
{
var element=jsCBDgetFormElement(_cbdFindCalendarForm(), 'selectedYear' );
if(element!=null )
{
return element.value;
}
return null;
}
function getCallbackJs()
{
var element=jsCBDgetFormElement(_cbdFindCalendarForm(), 'callbackJs' );
if(element!=null )
{
return element.value;
}
return null;
}
function formatNumber(number)
{
if(number >=0&&number <=9 )
{
number="0"+number;
}
return number;
}
function setDate(event, inline, callback)
{
var src=null;
var target=jsCBDgetEventNode(event );
calClick=true;
if(target.nodeName=="A")
{
src=target.firstChild.data;
}
else if(target.nodeName=="#text"&&target.parentNode.nodeName=="A")
{
src=target.data;
}
else
{
return;
}
var id=jsCBDgetQueryValue("id");
if(!isEmpty(src) )
{
if(inline )
{
var month=Number(getMonth().value);
var year=getYear().value;
var day=Number(src);
var satSel=getSatSel().value;
var sunSel=getSunSel().value;
var target=getTarget();
if(callback!=null)
{
callback(day, month+1, year);
}
else
{
var url=jsCBDaddQueryStringParam(target, "calMonth", month);
url=jsCBDaddQueryStringParam(url, "calDay", day);
url=jsCBDaddQueryStringParam(url, "calYear", year);
url=jsCBDaddQueryStringParam(url, "calEvent", "SUBMIT");
jsCBDgoToUrl(url);
}
}
else
{
var month=formatNumber(Number(getMonth().value)+1 );
var year=getYear().value;
opener.document.getElementById(id).value=month+"/"+formatNumber(Number(src) )+"/"+year;
jsCBDclosePopup(false, false);
var onChangeJs=opener.document.getElementById(id).onchange;
if(onChangeJs!=null&&onChangeJs!=undefined) onChangeJs();
opener.document.getElementById(id).focus();
}
}
}
function getSelectedDate(id)
{
var input=document.getElementById(id);
var value=input.value
if(!isEmpty(value))
{
return "&selectedDate="+value;
}
return "";
}
function setDateAjax(event, inputId, inline, callback)
{
var src=null;
var target=jsCBDgetEventNode(event );
calClick=true;
if(target.nodeName=="A")
{
src=target.firstChild.data;
}
else if(target.nodeName=="#text"&&target.parentNode.nodeName=="A")
{
src=target.data;
}
else
{
return;
}
var id=null;
if(inputId!=null&&inputId.length > 0)
{
id=vg.Layer._getLayerTargetId('calendar_layer');
}
else
{
id=jsCBDgetQueryValue("id");
}
if(!isEmpty(src) )
{
if(inline )
{
var month=Number(getMonth().value);
var year=getYear().value;
var day=Number(src);
var satSel=getSatSel().value;
var sunSel=getSunSel().value;
var target=getTarget();
var startYear=getStartYear();
var endYear=getEndYear();
var blockedFullDates=getBlockedFullDates();
var enableAjaxRefresh=getEnableAjaxRefresh().value;
var params=jsCBDaddQueryStringParam(target, "calMonth", month);
params=jsCBDaddQueryStringParam(params, "calDay", day);
params=jsCBDaddQueryStringParam(params, "calYear", year);
params=jsCBDaddQueryStringParam(params, "calEvent", "SUBMIT");
if(startYear!=null&&endYear!=null)
{
params=jsCBDaddQueryStringParam(params, "startYear", startYear);
params=jsCBDaddQueryStringParam(params, "endYear", endYear);
}
if(blockedFullDates!=null)
{
params=jsCBDaddQueryStringParam(params, "blockedFullDates", blockedFullDates);
}
if(enableAjaxRefresh!=null)
{
params=jsCBDaddQueryStringParam(params, "enableAjaxRefresh", enableAjaxRefresh);
}
if(callback!=null)
{
jsCBDupdateComponent("calId", null, callback, params);
}else
{
jsCBDupdateComponent("calId", null, null, params);
}
}
else
{
var month=formatNumber(Number(getMonth().value)+1 );
var year=getYear().value;
var strValue=month+"/"+formatNumber(Number(src) )+"/"+year;
if(inputId!=null)
{
var inputElement=document.getElementById(id);
inputElement.value=strValue;
jsCBDcloseLayer('calendar_layer');
var onChangeJs=inputElement.onchange();
if(onChangeJs!=null&&onChangeJs!=undefined) onChangeJs();
inputElement.focus();
}
else
{
opener.document.getElementById(id).value=month+"/"+formatNumber(Number(src) )+"/"+year;
jsCBDclosePopup(false, false);
}
}
}
}
function updateCalendar(node,inline)
{
var month=getMonth().value;
var year=getYear().value;
var satSel=getSatSel().value;
var sunSel=getSunSel().value;
var id=jsCBDgetQueryValue("id");
var	startDay=jsCBDgetQueryValue("startDay");
var	endDay=jsCBDgetQueryValue("endDay");
var numOfPastYears=jsCBDgetQueryValue("numOfPastYears");
var	startYear=jsCBDgetQueryValue("startYear");
var	endYear=jsCBDgetQueryValue("endYear");
var target=getTarget();
var	url=jsCBDaddQueryStringParam(target, "calMonth", month);
var calEvent="UPDATE";
url=jsCBDaddQueryStringParam(url, "calYear", year);
url=jsCBDaddQueryStringParam(url, "satSel", satSel);
url=jsCBDaddQueryStringParam(url, "sunSel", sunSel);
url=jsCBDaddQueryStringParam(url, "startDay", startDay);
url=jsCBDaddQueryStringParam(url, "endDay", endDay);
if(numOfPastYears!=null&&numOfPastYears!=""){
url=jsCBDaddQueryStringParam(url, "numOfPastYears", numOfPastYears);
}
if(startYear!=null&&endYear!=null)
{
url=jsCBDaddQueryStringParam(url, "startYear", startYear);
url=jsCBDaddQueryStringParam(url, "endYear", endYear);
}
url=jsCBDaddQueryStringParam(url, "calEvent", calEvent);
if(!inline )
{
url=jsCBDaddQueryStringParam(url, "id", id);
}
calClick=false;
jsCBDgoToUrl(url);
}
function updateCalendarAjax(node, inline, callback, inputId)
{
var month=getMonth().value;
var year=getYear().value;
var satSel=getSatSel().value;
var sunSel=getSunSel().value;
var startDay=getStartDay().value;
var endDay=getEndDay().value;
var startYear=getStartYear();
var endYear=getEndYear();
var blockedFullDates=getBlockedFullDates();
var enableAjaxRefresh=getEnableAjaxRefresh().value;
var id=null;
calClick=false;
if(inputId!=null&&inputId.length > 0)
{
id=vg.Layer._getLayerTargetId('calendar_layer');}
else
{
id=jsCBDgetQueryValue("id");
}
var target=getTarget();
var	params=jsCBDaddQueryStringParam(target, "calMonth", month);
var calEvent="UPDATE";
params=jsCBDaddQueryStringParam(params, "calYear", year);
params=jsCBDaddQueryStringParam(params, "satSel", satSel);
params=jsCBDaddQueryStringParam(params, "sunSel", sunSel);
params=jsCBDaddQueryStringParam(params, "startDay", startDay);
params=jsCBDaddQueryStringParam(params, "endDay", endDay);
params=jsCBDaddQueryStringParam(params, "calEvent", calEvent);
if(startYear!=null&&endYear!=null)
{
params=jsCBDaddQueryStringParam(params, "startYear", startYear);
params=jsCBDaddQueryStringParam(params, "endYear", endYear);
}
if(blockedFullDates!=null)
{
params=jsCBDaddQueryStringParam(params, "blockedFullDates", blockedFullDates);
}
if(enableAjaxRefresh!=null)
{
params=jsCBDaddQueryStringParam(params, "enableAjaxRefresh", enableAjaxRefresh);
}
if(!inline )
{
params=jsCBDaddQueryStringParam(params, "id", id);
}
if(callback!=null)
{
jsCBDupdateComponent("calId", null, callback, params);
}
else
{
jsCBDupdateComponent("calId", null, null, params);
}
}
function updateMonth(node, inline, delta, disable)
{
if(disable)
{
var prevButton=document.getElementById('prevButton');
var nextButton=document.getElementById('nextButton');
if(prevButton!=null)
{
prevButton.disabled=true;
}
if(nextButton!=null)
{
nextButton.disabled=true;
}
}
var month=Number(getMonth().value);
var year=Number(getYear().value);
month+=delta;
if(month==12 )
{
year++;
month=0;
}
else if(month==-1 )
{
year--;
month=11;
}
getMonth().value=month;
getYear().value=year;
updateCalendar(node, inline);
}
function updateMonthAjax(node, inline, delta, disable, inputId )
{
if(disable)
{
var prevButton=document.getElementById('prevButton');
var nextButton=document.getElementById('nextButton');
if(prevButton!=null)
{
prevButton.disabled=true;
}
if(nextButton!=null)
{
nextButton.disabled=true;
}
}
var month=Number(getMonth().value);
var year=Number(getYear().value);
month+=delta;
if(month==12 )
{
year++;
month=0;
}
else if(month==-1 )
{
year--;
month=11;
}
getMonth().value=month;
getYear().value=year;
updateCalendarAjax(node, inline,inputId);
}
function refreshCalendarAjax(month, year)
{
var satSel=getSatSel().value;
var sunSel=getSunSel().value;
var startYear=getStartYear();
var endYear=getEndYear();
var blockedFullDates=getBlockedFullDates();
var enableAjaxRefresh=getEnableAjaxRefresh().value;
var	startDay=jsCBDgetQueryValue("startDay");
var	endDay=jsCBDgetQueryValue("endDay");
var target=getTarget();
var calEvent="UPDATE";
var target=getTarget();
var params=jsCBDaddQueryStringParam(target, "satSel", satSel);
params=jsCBDaddQueryStringParam(params, "sunSel", sunSel);
params=jsCBDaddQueryStringParam(params, "startDay", startDay);
params=jsCBDaddQueryStringParam(params, "endDay", endDay);
params=jsCBDaddQueryStringParam(params, "calEvent", calEvent);
if(startYear!=null&&endYear!=null)
{
params=jsCBDaddQueryStringParam(params, "startYear", startYear);
params=jsCBDaddQueryStringParam(params, "endYear", endYear);
}
if(blockedFullDates!=null)
{
params=jsCBDaddQueryStringParam(params, "blockedFullDates", blockedFullDates);
}
if(enableAjaxRefresh!=null)
{
params=jsCBDaddQueryStringParam(params, "enableAjaxRefresh", enableAjaxRefresh);
}
params=jsCBDaddQueryStringParam(params, "refreshToMonth", month);
params=jsCBDaddQueryStringParam(params, "refreshToYear", year);
jsCBDupdateComponent("calId", null, null, params);
}
cbd.gh=cbd.gh||{};
var ghopt={};
cbd.gh.GH_SEARCHBOX_ID="_cbdSearchBox",
cbd.gh.GH_FIRST_NAV_ID="ghFirstNav",
cbd.gh.DEFAULT_TEXT="Get a quote or search the site",
cbd.gh.GH_DEFAULT_FAS_TEXT="Search the site",
cbd.gh.ASINPUT_FOCUS_CLASS='asFocus',
cbd.gh.ASINPUT_NOFOCUS_CLASS='asNoFocus';
cbd.gh.makePortalDropdownWTCall=function(link)
{
"use strict";
var webUsage=cbdcommon.wu,
linkLocationTag=webUsage.getMetaTag("DCSext.pageid");
webUsage.addMetaTag("Link", link);
if(linkLocationTag!==null)
{
webUsage.addMetaTag("LinkLocation", linkLocationTag.content);
}
webUsage.dcsTag();
webUsage.clearMetaTag("Link");
webUsage.clearMetaTag("LinkLocation");
};
cbd.gh.messageBar=cbd.gh.messageBar||{};
cbd.gh.messageBar.activeDivId="";
cbd.gh.messageBar.activeHomeIconSpan=null;
cbd.gh.messageBar.messageBarDivId="ghMsgBar";
cbd.gh.messageBar.welcomeDivId="welcomeMessage";
cbd.gh.messageBar.preferenceFormDivId="PrefForm";
cbd.gh.messageBar.sitePrefMenuItemId="sitePrefLi";
cbd.gh.messageBar.messageBarDiv=null;
cbd.gh.messageBar.imageSpanIdMap={"retail":"retail_homeIcon", "fas":"fas_homeIcon", "iam":"iam_homeIcon", "pe":"pe_homeIcon"};
cbd.gh.messageBar.prefSetDivIdMap={"retail":"retail_PrefSet", "fas":"fas_PrefSet", "iam":"iam_PrefSet", "pe":"pe_PrefSet", "no":"no_PrefSet"};
cbd.gh.messageBar.siteToCookieMap={"retail":"P", "fas":"F", "iam":"I", "pe":"R", "no":"N"};
cbd.gh.messageBar.cookieToSiteMap={"P":"retail", "F":"fas", "I":"iam", "R":"pe", "N":"no"};
cbd.gh.messageBar.siteToRadioMap={"retail":"ghMsgSetPrefForm:retail_radioButton", "fas":"ghMsgSetPrefForm:fas_radioButton", "iam":"ghMsgSetPrefForm:iam_radioButton", "pe":"ghMsgSetPrefForm:pe_radioButton", "no":"ghMsgSetPrefForm:no"};
cbd.gh.messageBar.initMessageBar=function()
{
"use strict";
var	choiceFromCookie,
cookieMissing=true,
sitePrefMenuItem,
welcomeDiv;
cbd.gh.messageBar.messageBarDiv=document.getElementById(cbd.gh.messageBar.messageBarDivId);
if(cbd.gh.messageBar.messageBarDiv!==null&&(typeof cbd.gh.messageBar.messageBarDiv!=="undefined"))
{
choiceFromCookie=cbd.gh.messageBar.getChoiceFromCookie();
if(choiceFromCookie!==null)
{
cookieMissing=false;
cbd.gh.messageBar.setHomeIcon(choiceFromCookie);
cbd.gh.messageBar.checkChosenSiteRadio(choiceFromCookie);
cbdcommon.wu.addMetaTag("SitePreference", choiceFromCookie);
}
if(cbd.gh.messageBar.messageBarDiv.getAttribute("data-showWelcomeMessage")==="true"&&cookieMissing)
{
sitePrefMenuItem=document.getElementById(cbd.gh.messageBar.sitePrefMenuItemId);
if(sitePrefMenuItem!==null&&(typeof sitePrefMenuItem!=="undefined"))
{
cbd.gh.messageBar.swapMessageBarDiv(cbd.gh.messageBar.welcomeDivId, false);
}
}
cbd.gh.messageBar.addListenersToSavePreferenceButtons();
cbd.gh.messageBar.addListenersToMsgCloseBtn();
}
};
cbd.gh.messageBar.getChoiceFromCookie=function()
{
"use strict";
var cookieVal=cbdcommon.cookie.getConfigInfoValue("sp:"),
choice=cbd.gh.messageBar.cookieToSiteMap[cookieVal];
if(typeof choice==="undefined")
{
choice=null;
}
return choice;
};
cbd.gh.messageBar.closeMessageBar=function()
{
"use strict";
if(cbd.gh.messageBar.messageBarDiv!==null&&(typeof cbd.gh.messageBar.messageBarDiv!=="undefined"))
{
vg.smil.animateElement(cbd.gh.messageBar.messageBarDiv, "height", 500, 0, null, 1, null,
function()
{
jsCBDtoggleElement(cbd.gh.messageBar.messageBarDiv, false);
});
}
};
cbd.gh.messageBar.savePreference=function(formId)
{
"use strict";
var radioButtons=document.getElementsByName(formId+":ghMsgBarRadioButtons"),
choice="",
i,
currentRadio,
radioButtonsLength=radioButtons.length;
for(i=0;i < radioButtonsLength;i++)
{
currentRadio=radioButtons[i];
if(currentRadio.checked)
{
choice=currentRadio.value;
break;
}
}
if(choice!=="")
{
cbd.gh.messageBar.swapMessageBarDiv(cbd.gh.messageBar.prefSetDivIdMap[choice], true);
cbdcommon.cookie.setConfigInfo("sp:", cbd.gh.messageBar.siteToCookieMap[choice]);
cbd.gh.messageBar.setHomeIcon(choice);
cbdcommon.wu.logWebUsageEvent("SetSitePreference", choice, true);
}
};
cbd.gh.messageBar.animatePortalDropdown=function()
{
"use strict";
var portalDropdown=document.getElementById("ghPortalDropdownHead"),
delay=12000,
portalController,
portalMenuBar,
portalMenuBarPlugin;
if(portalDropdown!==null&&(typeof portalDropdown!=="undefined"))
{
portalController=vg.comp.getController(portalDropdown);
}
if(portalController!==null&&(typeof portalController!=="undefined"))
{
portalMenuBar=portalController.menuBar;
}
if(portalMenuBar!==null&&(typeof portalMenuBar!=="undefined"))
{
portalMenuBarPlugin=portalMenuBar.menuBarPlugin;
}
if(portalMenuBarPlugin!==null&&(typeof portalMenuBarPlugin!=="undefined"))
{
portalMenuBarPlugin.openMenu(delay, cbd.gh.messageBar.sitePrefMenuItemId);
}
};
cbd.gh.messageBar.setHomeIcon=function(choice)
{
"use strict";
if(cbd.gh.messageBar.activeHomeIconSpan!==null&&(typeof cbd.gh.messageBar.activeHomeIconSpan!=="undefined"))
{
jsCBDdeleteStyle(cbd.gh.messageBar.activeHomeIconSpan, "sitePrefHomeDD");
}
if(choice!=="no")
{
cbd.gh.messageBar.activeHomeIconSpan=document.getElementById(cbd.gh.messageBar.imageSpanIdMap[choice]);
if(cbd.gh.messageBar.activeHomeIconSpan!==null&&(typeof cbd.gh.messageBar.activeHomeIconSpan!=="undefined"))
{
jsCBDaddStyle(cbd.gh.messageBar.activeHomeIconSpan, "sitePrefHomeDD");
}
}
};
cbd.gh.messageBar.checkChosenSiteRadio=function(choice)
{
"use strict";
var radioToBeChecked=document.getElementById(cbd.gh.messageBar.siteToRadioMap[choice]);
if(radioToBeChecked!==null&&(typeof radioToBeChecked!=="undefined"))
{
radioToBeChecked.checked=true;
}
};
cbd.gh.messageBar.getPrefForm=function()
{
"use strict";
cbd.gh.messageBar.swapMessageBarDiv(cbd.gh.messageBar.preferenceFormDivId, true);
cbdcommon.wu.logWebUsageEvent("OpenSitePreference", "true", false);
cbdcommon.wu.updateMetaTag("DCSext.OpenSitePreference", "false");
};
cbd.gh.messageBar.swapMessageBarDiv=function(newDivId, setFocusOnMessageBar)
{
"use strict";
if(cbd.gh.messageBar.activeDivId!=="" )
{
jsCBDtoggleElement(document.getElementById(cbd.gh.messageBar.activeDivId), false);
}
cbd.gh.messageBar.activeDivId=newDivId;
jsCBDtoggleElement(document.getElementById(newDivId), true);
if(cbd.gh.messageBar.messageBarDiv!==null&&(typeof cbd.gh.messageBar.messageBarDiv!=="undefined"))
{
if(!jsCBDisVisibleElement(cbd.gh.messageBar.messageBarDiv))
{
cbd.gh.messageBar.messageBarDiv.style.height="1px";
jsCBDtoggleElement(cbd.gh.messageBar.messageBarDiv, true);
vg.smil.animateElement(cbd.gh.messageBar.messageBarDiv, "height", 500, 0, 1, cbd.gh.messageBar.messageBarDiv.scrollHeight, null,
function()
{
cbd.gh.messageBar.messageBarDiv.style.height="";
if(setFocusOnMessageBar===true)
{
cbd.gh.messageBar.messageBarDiv.focus();
}
});
}
else
{
if(setFocusOnMessageBar===true)
{
cbd.gh.messageBar.messageBarDiv.focus();
}
}
}
};
cbd.gh.messageBar.addListenersToSavePreferenceButtons=function()
{
"use strict";
var savePrefButtons=vg.html.getElements(document.body,{tagName:'div', attrName:'class', attrValue:'savePreferenceButton'}),
numberOfButtons=savePrefButtons.length,
i,
savePrefButton,
savePrefFunction=function(event)
{
var trigger=jsCBDgetEventNode(event),
form=_cbdGetParentForm(trigger);
cbd.gh.messageBar.savePreference(form.id);
},
welcomeMessageButton=vg.html.getElements(document.getElementById("welcomeMessage"),{tagName:'div', attrName:'class', attrValue:'savePreferenceButton'})[0],
welcomeDivSavePrefButton=vg.html.getElements(welcomeMessageButton,{tagName:'a'})[0],
animateMenuFunction=function(event)
{
cbd.gh.messageBar.animatePortalDropdown();
};
for(i=0;i < numberOfButtons;i++)
{
savePrefButton=vg.html.getElements(savePrefButtons[i],{tagName:'a'})[0];
vg.comp.addEventListenersForStylesToButton(savePrefButton);
vg.html.addEventListener(savePrefButton, "click", savePrefFunction);
}
vg.html.addEventListener(welcomeDivSavePrefButton, "click", animateMenuFunction);
};
cbd.gh.messageBar.addListenersToMsgCloseBtn=function()
{
"use strict";
var	closeButtonDiv=vg.html.getElements(document.body,{tagName:'div', attrName:'class', attrValue:'x-ghMsgClose'})[0],
closeButton=vg.html.getElements(closeButtonDiv,{tagName:'a'})[0];
vg.comp.addEventListenersForStylesToButton(closeButton);
vg.html.addEventListener(closeButton, 'click', cbd.gh.messageBar.closeMessageBar);
};
cbd.gh.initGH=function()
{
"use strict";
var globalHeaderElement=document.getElementById("gh");
if(globalHeaderElement)
{
var params={id:'ghFirstNav', closeOnScroll:false, autoSubmenuDisplay:true,
hidedelay:0, addScrollRegions:true, hoverIntent:true, shadow:false, minscrollheight:85,
mouseOutExtAreaHideDelay:500, openOnFocus:true, lazyload:true, alignment:'left',
collision:'fit'},
cbdLogo=document.getElementById("_cbdBrand"),
cbdSecondaryLogo=document.getElementById("_cbdCobrand"),
navLinks=vg.html.getElements(document.getElementById("gh"),{attrName:"class", attrValue:"x-ghSubSiloItemLink"}),
navLinksLength=navLinks.length,
navMenus=vg.html.getElements(document.getElementById("gh"),{attrName:"class", attrValue:"-noFly"}),
navMenusLength=navMenus.length,
trackLink=function(){cbdcommon.wu.trackLink('flyoutNav');},
siloNoSubMenu=vg.html.getElements(globalHeaderElement,{attrName:"class", attrValue:"x-noDoubleClick"}),
siloNoSubMenuLength=siloNoSubMenu.length,
preventDoubleClick=function(event){cbdcommon.util.preventDoubleClick(jsCBDgetEventNode(event ) );},
menu=document.getElementById(params.id),
portalDropdownId='ghPortalDropdownHead',
portalMenu=document.getElementById(portalDropdownId),
portalDropdownConfig={id:portalDropdownId, closeOnScroll:false, autoSubmenuDisplay:true, hidedelay:0, addScrollRegions:true,
hoverIntent:true, shadow:false, minscrollheight:85, mouseOutExtAreaHideDelay:500, openOnFocus:true, lazyload:true,
alignment:'left', collision:'fit'},
i,
selectedItem,
selectedItemHTML,
idStart,
fireCustomGHClickEvent=function(event)
{
vg.html._fireCustomEvent(vg.event.CBD_GLOBAL_HEADER_CLICK, event);
};
cbd.gh.initGlobalHeaderSearch();
if(cbdLogo)
{
vg.html.addEventListener(cbdLogo, 'click', function(){
cbdcommon.wu.trackLink('BrandLogoGH');
});
}
if(cbdSecondaryLogo)
{
vg.html.addEventListener(cbdSecondaryLogo, 'click', function(){
cbdcommon.wu.trackLink('CoBrandLogoGH');
});
}
if(navLinksLength)
{
for(i=0;i < navLinksLength;i++)
{
vg.html.addEventListener(navLinks[i], 'click', trackLink);
}
}
if(navMenusLength)
{
for(i=0;i < navMenusLength;i++)
{
vg.html.addEventListener(navMenus[i], 'mouseover', vg.comp.closeAllMenusAndCalendars);
}
}
if(siloNoSubMenuLength)
{
for(i=0;i < siloNoSubMenuLength;i++)
{
vg.html.addEventListener(siloNoSubMenu[i], 'click', preventDoubleClick);
}
}
if(menu)
{
menu=new vg.GHMenu(params);
}
if(portalMenu)
{
vg.html.addEventListener(portalMenu, 'mouseover', vg.comp.closeAllMenusAndCalendars);
var portalMenu=new vg.Menu(portalDropdownConfig);
}
selectedItem=document.getElementById('gh-current');
if(selectedItem)
{
selectedItemHTML=selectedItem.innerHTML;
idStart=selectedItemHTML.indexOf('CBD_NAV');
ghopt.selected1=selectedItemHTML.substring(idStart, selectedItemHTML.indexOf("'", idStart));
}
else
{
ghopt.selected1='CBD_NAV_NONE';
}
if(!vg.GHMenu.disableYUImenu)
{
cbd.gh.initResponsiveGlobalHeader();
cbd.getYUI().all('#gh a').on('click',fireCustomGHClickEvent);
}
cbd.gh.messageBar.initMessageBar();
cbd.gh.utilNav.initUtilNav();
}
};
cbd.gh.initGlobalHeaderSearch=function()
{
"use strict";
var cbdYUI=cbd.getYUI(),
globalHeaderAutoSuggest=cbdcommon.gh.autoSuggest,
globalHeader=cbdYUI.one(document.getElementById('gh')),
searchBoxes=globalHeader.all(".x-ghSearchBox"),
currentItemAttr={},
searchBoxClearIcons=globalHeader.all(".x-ghClearIcon"),
searchBoxCancelButtons=globalHeader.all('.x-ghCancelButtonLink'),
searchForms=globalHeader.all(".x-ghSearchForm"),
searchButtons=globalHeader.all(".x-ghSearchButton"),
numSearchBoxes=searchBoxes.size(),
DATA_CBD_COMPATTR='data-cbd-compattrs',
searchParam,
searchParamArray,
url,
site,
state,
suppressDefaultSubmitAction,
currentItem,
currentItemId,
selectableCellSpansAttr,
selectableCellSpansArray,
selectableCellSpansArrayLength,
i,
j,
tableUrl="",
restUrl="",
source,
restCallback,
restCallbackUrl,
searchToggle=document.getElementById("cbdSearchToggle"),
searchToggleInputs=vg.html.getElements(searchToggle,{tagName:'input', attrName:'type', attrValue:'radio'}),
numSearchToggleInputs=searchToggleInputs.length,
formSubmit=function(formElement)
{
var input=vg.html.getElements(formElement,{attrName:"class", attrValue:"box"})[0],
id=input.id;
if(suppressDefaultSubmitAction!==true)
{
doGHSearch(url, site, state, id);
}
vg.html._fireCustomEvent(vg.event.CBD_GLOBAL_HEADER_SEARCH, input);
return false;
},
onSubmit=function(event)
{
vg.html.preventDefault(event);
return formSubmit(jsCBDgetEventNode(event));
},
_cbdGHAutoSuggestValueChange=function(id, value, label, tableLoadQuery)
{
if(value.substring(0,7)=="https:/")
{
jsCBDgoToUrl(value.substring(7));
}
else if(value.indexOf("javascript:")===0)
{
eval(value);
}
else
{
formSubmit(document.getElementById("searchForm"));
}
},
autoSuggestClear=function()
{
var asId=this.getAttribute('inputId'),
autoSuggest=vg.comp.findController(asId, false);
if(autoSuggest)
{
autoSuggest._resetValueAndFocus();
}
},
autoSuggestCancel=function()
{
var asId=this.getAttribute('inputId'),
autoSuggest=vg.comp.findController(asId, false);
if(autoSuggest)
{
globalHeaderAutoSuggest.cancelBtnClick(autoSuggest.labelInput);
autoSuggest.reset();
}
},
searchButtonClick=function()
{
if(suppressDefaultSubmitAction!==true)
{
doGHSearch(url, site, state, cbd.gh.GH_SEARCHBOX_ID);
}
vg.html._fireCustomEvent(vg.event.CBD_GLOBAL_HEADER_SEARCH);
return false;
},
toggleGHSearch=function(event)
{
var eventNode=jsCBDgetEventNode(event),
DATA_CBD_SEARCHATTR='data-cbd-searchattrs',
searchParam=eventNode.getAttribute(DATA_CBD_SEARCHATTR),
searchParamArray=searchParam.split(','),
toggleSuggestionsUrl=searchParamArray[0],
toggleResultsUrl=searchParamArray[1],
toggleSite=searchParamArray[2],
toggleStateKey=searchParamArray[3];
_updateGHSearch(toggleSuggestionsUrl, toggleResultsUrl, toggleSite, toggleStateKey);
};
globalHeaderAutoSuggest.init();
for(i=0;i < numSearchBoxes;i++)
{
currentItem=searchBoxes.item(i);
currentItemId=currentItem.getAttribute('id');
currentItemAttr=cbdYUI.JSON.parse(currentItem.getAttribute(DATA_CBD_COMPATTR));
selectableCellSpansAttr=currentItemAttr.selectableCellSpans;
selectableCellSpansArray=selectableCellSpansAttr?selectableCellSpansAttr.split(','):'';
selectableCellSpansArrayLength=selectableCellSpansArray.length;
for(j=0;j < selectableCellSpansArrayLength;j++)
{
selectableCellSpansArray[j]=parseInt(selectableCellSpansArray[j],10);
}
source=currentItemAttr.source;
if(source&&source.indexOf(".jsonp") > -1)
{
restUrl=currentItemAttr.source;
}
else
{
tableUrl=currentItemAttr.source;
}
restCallback=currentItemAttr.restCallback;
restCallbackUrl=currentItemAttr.restCallbackUrl;
new AutoSuggest(currentItemId, currentItemAttr.numCharsToTrigger,
currentItemAttr.labelColumn, tableUrl,
function(){return true;}, _cbdGHAutoSuggestValueChange,
0, currentItemAttr.position, currentItemAttr.defaultText,
"", "", false, false, selectableCellSpansArray,
"", currentItemAttr.containerClass, currentItemAttr.disablePositioning,
currentItemAttr.ignoreDefaultTextCheckOnCharCount, currentItemAttr.resultsTableId,
restUrl, restCallback);
currentItem=searchBoxClearIcons.item(i);
if(currentItem)
{
currentItem.on("click", autoSuggestClear);
}
currentItem=searchBoxCancelButtons.item(i);
if(currentItem)
{
currentItem.on("click", autoSuggestCancel);
}
currentItem=searchButtons.item(i);
if(currentItem)
{
currentItem=currentItem.getDOMNode();
vg.comp.addEventListenersForStylesToButton(currentItem);
vg.html.addEventListener(currentItem, "click", searchButtonClick, 'SEARCH_BUTTON_CLICK');
}
currentItem=searchForms.item(i);
if(currentItem)
{
searchParam=currentItemAttr.searchParams;
searchParamArray=searchParam.split(',');
url=searchParamArray[0];
site=searchParamArray[1];
state=searchParamArray[2];
suppressDefaultSubmitAction=currentItemAttr.suppressDefaultSubmitAction;
currentItem=currentItem.getDOMNode();
vg.html.addEventListener(currentItem, "submit", onSubmit, "SEARCH_FORM_SUBMIT");
}
}
if(restCallbackUrl&&!cbdcommon.util.getObjectReference(restCallback))
{
vg.util.loadJavaScriptFile(restCallbackUrl);
}
for(i=0;i < numSearchToggleInputs;i++)
{
vg.html.addEventListener(searchToggleInputs[i], "click", toggleGHSearch, "GH_SEARCH_TOGGLE");
}
};
cbd.gh.initResponsiveGlobalHeader=function()
{
"use strict";
if(!cbdcommon.screen.isQuirksModeBrowser())
{
var myYUI=cbd.getYUI(),
commonGH=cbdcommon.gh,
commonSCREEN=cbdcommon.screen,
commonLogOn=commonGH.logon;
cbd.adapter.onReady(function(){
var ghMenuBtn=myYUI.one("#ghMenuBtnResp"),
mainDiv=myYUI.one("#main"),
gblFoot=myYUI.one(".gblFoot");
if(ghMenuBtn)
{
ghMenuBtn.on("click", commonGH.toggleResponsiveMenu);
}
if(mainDiv)
{
mainDiv.on("click", function(){
if(commonGH.isRespMenuOpen())
{
commonGH.closeResponsiveMenu();
}
});
}
if(gblFoot)
{
gblFoot.on("click", function(){
if(commonGH.isRespMenuOpen())
{
commonGH.closeResponsiveMenu();
}
});
}
commonLogOn.init();
});
myYUI.one(window).on('resize', function(e){
if(commonGH.isRespMenuOpen()&&commonSCREEN.isMediaQuerySizeLarge())
{
commonGH.closeResponsiveMenu();
}
});
}
};
cbd.gh.highlightFirstNavSiloLink=function(link)
{
var yui=cbd.getYUI();
yui.one('#gh-current').removeClass("gh-currentSilo").setAttribute("id","");
yui.one(link).ancestor('li').addClass("gh-currentSilo").setAttribute("id", "gh-current");
}
cbd.gh.utilNav=cbd.gh.utilNav||{};
cbd.gh.utilNav.initUtilNav=function()
{
var utilNav=vg.html.getElements(document.getElementById("ghUtilLinks"),{attrName:"class", attrValue:"navDropDown"}),
utilNavLength=utilNav.length,
i;
for(i=0;i < utilNavLength;i++)
{
cbd.gh.utilNav.addListenersToUtilNav(utilNav[i]);
}
};
cbd.gh.utilNav.addListenersToUtilNav=function(utilNav)
{
"use strict";
var utilNavLabel=vg.html.getElements(utilNav,{attrName:"class", attrValue:"menu-label"})[0],
utilNavDropdown=vg.html.getElements(utilNav,{attrName:"class", attrValue:"yui3-menu-content "})[0],
utilNavLinks=vg.html.getElements(utilNavDropdown,{tagName:"a"}),
utilNavLinksLength=utilNavLinks.length,
utilNavLastLink=utilNavLinks[utilNavLinksLength-1],
labelId=utilNavLabel.id,
dropdownId=utilNavDropdown.id,
i,
navLinkBlurHandler=function()
{
setTimeout(function(){
if(!cbdcommon.util.hasActiveElement(utilNavLinks))
{
cbd.gh.utilNav.closeUtilNav(labelId, dropdownId);
}
},25)
};
vg.html.addEventListener(utilNav, "mouseover", function(){
cbd.gh.utilNav.openUtilNav(labelId, dropdownId);
});
vg.html.addEventListener(utilNav, "mouseout", function(){
cbd.gh.utilNav.closeUtilNav(labelId, dropdownId);
});
vg.html.addEventListener(utilNavLabel, "focus", function(){
cbd.gh.utilNav.openUtilNav(labelId, dropdownId);
});
vg.html.addEventListener(utilNavLabel, "blur", navLinkBlurHandler );
for(i=0;i < utilNavLinksLength;i++)
{
vg.html.addEventListener(utilNavLinks[i], "blur", navLinkBlurHandler );
}
};
cbd.gh.utilNav.openUtilNav=function(menuId, subMenuId)
{
"use strict";
var cbdYUI=cbd.getYUI(),
menuLabel=cbdYUI.one("#"+menuId),
subMenu=cbdYUI.one("#"+subMenuId);
menuLabel.addClass("utilNavSelected");
subMenu.show();
subMenu.setY(menuLabel.getY()+menuLabel.get("offsetHeight"));
};
cbd.gh.utilNav.closeUtilNav=function(menuId, subMenuId)
{
jsCBDtoggleElement(document.getElementById(subMenuId), false);
jsCBDdeleteStyle(document.getElementById(menuId), "utilNavSelected");
};
function doGHSearch(url, site, state, id )
{
var input=document.getElementById(id),
defaultText=cbd.gh.DEFAULT_TEXT,
p,
queryValue;
if(site==="IWE"||site==="IAM"||site==="bridge")
{
defaultText=cbd.gh.GH_DEFAULT_FAS_TEXT;
}
else if(site==="RM")
{
defaultText=cbd.gh.GH_DEFAULT_RM_TEXT;
}
if(input.value===defaultText)
{
return;
}
p=/[a-zA-Z0-9\*\?]+/;
if(!p.test(input.value))
{
input.value='';
_cbdSetInputDefaultText(input,defaultText);
return;
}
if(arguments.length===0||(!url&&!site&&!state ))
{
url=jsCBDgetContextRoot()+"JSP/UtilityBar/Search/SearchGlobalContent.jsf";
}
queryValue=input.value;
queryValue=queryValue.replace(/[\/\|\!\@\#\$\%\=\;\,\.\<\>\{\}\[\]\\\`\~]/g, " ");
if(css2)
{
if((mac&&ie5)||(mac&&safari1)||(win98&&ie5))
{
queryValue=escape(queryValue);
}
else
{
queryValue=encodeURIComponent(queryValue);
}
}
else
{
queryValue=escape(queryValue);
}
if(site==="IWE")
{
jsCBDAddMetaTag("search_query", queryValue);
jsCBDLogWebUsageEvent("search_type", state);
}
if("bridge"===site)
{
url=jsCBDaddQueryStringParam(url, "searchString", queryValue);
url=jsCBDaddQueryStringParam(url, "searchCatalog", "bridgeAll");
}
else
{
url=jsCBDaddQueryStringParam(url, "query", queryValue);
}
vg.html._fireCustomEvent(vg.event.CBD_GLOBAL_HEADER_CLICK);
jsCBDgoToUrl(url, null, true);
}
_updateGHSearch=function(suggestionsUrl, resultsUrl, site, stateKey)
{
"use strict";
var searchButton=document.getElementById("_cbdSearchButton"),
searchForm=document.getElementById("searchForm"),
globalHeader=document.getElementById("gh"),
containerNode=_cbdFindAncestor(globalHeader,{tagName:"span", attrName:"cmp", attrValue:"true"}),
globalHeaderClientId=containerNode.id.replace("comp-","");
jsCBDsetAutoSuggestTableUrl(cbd.gh.GH_SEARCHBOX_ID, suggestionsUrl);
vg.html.removeEventListenerById(searchButton, "SEARCH_BUTTON_CLICK");
vg.html.addEventListener(searchButton, "click",
function()
{
doGHSearch(resultsUrl, site, stateKey, cbd.gh.GH_SEARCHBOX_ID);
}
);
vg.html.removeEventListenerById(searchForm, "SEARCH_FORM_SUBMIT");
vg.html.addEventListener(searchForm, "submit",
function(event)
{
doGHSearch(resultsUrl, site, stateKey, cbd.gh.GH_SEARCHBOX_ID);
vg.html.preventDefault(event);
},
"SEARCH_FORM_SUBMIT"
);
cbd.StateKeeper._setState(globalHeaderClientId, stateKey);
};
_cbdClearInputDefaultText=function(input, defaultText)
{
if((input.value==defaultText)&&vg.html.hasStyle(cbd.gh.ASINPUT_NOFOCUS_CLASS,input) )
{
input.value='';
if(ie)
{
_setCaretPosition(input,0);
}
vg.html.replaceClass(input, cbd.gh.ASINPUT_NOFOCUS_CLASS, cbd.gh.ASINPUT_FOCUS_CLASS);
}
}
_cbdSetInputDefaultText=function(input, defaultText)
{
if(isWhitespace(input.value))
{
input.value=defaultText;
vg.html.replaceClass(input, cbd.gh.ASINPUT_FOCUS_CLASS, cbd.gh.ASINPUT_NOFOCUS_CLASS);
}
}
function openFlashVideoWindow(nameOfVideo, videoTime, aspWidth, aspHeight)
{
var windowParams='top=0, left=0';
var screenHeight=screen.availHeight - 60;
var screenWidth=screen.availWidth - 30;
if(aspWidth&&aspHeight&&screenWidth/aspWidth*aspHeight+30 < screenHeight)
{
screenHeight=screenWidth/aspWidth*aspHeight+30;
}
windowParams+=", height=";
windowParams+=""+screenHeight;
windowParams+=", width=";
windowParams+=""+screenWidth;
windowParams+=", innerHeight=";
windowParams+=""+screenHeight;
windowParams+=", innerWidth=";
windowParams+=""+screenWidth;
windowParams+=", resizable=yes";
windowParams+=", scrollbars=no";
windowParams+=", status=yes";
windowParams+=", titlebar=yes";
var windowName=jsCBDgetContextRoot()+"com/vanguard/util/cbd/data/jsp/FullScreen.jsp?values=";
windowName+=nameOfVideo;
windowName+="&videoTime=";
windowName+=videoTime;
var newwin=window.open(windowName, "VanguardMediaPlayer", windowParams);
if(window.focus){newwin.focus()}
}
jsCBDPrintAnyElement=function(eId,overflow)
{
var eltoPrint,
mainDiv,
layerDiv,
parentToMain,
newDiv,
htmlArray,
cbdPrint=cbd.print;
if(vg.html.getElement("printLayerDiv")!=null)
{
_cbdClearDiv();
}
eltoPrint=document.getElementById(eId);
eltoPrint=eltoPrint.tagName.toLowerCase()=="canvas"?document.getElementById("comp-"+eltoPrint.id):eltoPrint;
mainDiv=document.getElementById("main");
layerDiv=document.getElementById("layer");
mainDiv.setAttribute("class","printLayer");
layerDiv.setAttribute("class","printLayer");
parentToMain=mainDiv.parentNode;
newDiv=document.createElement("div");
newDiv.setAttribute("id","printLayerDiv");
newDiv.style.cssText=cbd.print._getPrintAreaStyleAttr(eltoPrint,false);
cbdPrint._setInputPrintValues(eltoPrint, false);
htmlArray=_cbdExtractScripts(eltoPrint.innerHTML);
newDiv.innerHTML=htmlArray['html'];
cbdPrint._setInputPrintValues(newDiv, true);
if(overflow=='true')
{
newDiv=_cbdExpandOverflow(newDiv);
}
newDiv=_captureCanvasForPrint(newDiv);
parentToMain.insertBefore(newDiv, mainDiv);
window.print();
setTimeout('_cbdClearDiv();',500);
};
_cbdClearDiv=function()
{
var mainDiv=document.getElementById("main");
var layerDiv=document.getElementById("layer");
var parentToMain=mainDiv.parentNode;
mainDiv.setAttribute("class"," ");
layerDiv.setAttribute("class"," ");
var elems=vg.html.getElements(parentToMain,
{tagName:"div", attrName:"id", attrValue:"printLayerDiv", maxDepth:"1"});
if(elems&&elems[0])
{
parentToMain.removeChild(elems[0]);
}
return false;
}
_captureCanvasForPrint=function(divToPrint)
{
if(!ieQuirksMode)
{
var canvasElements=vg.util.toArray(divToPrint.getElementsByTagName("canvas"));
var numItems=canvasElements.length;
for(var i=0;i < numItems;i++)
{
var myCanvas=document.getElementById(canvasElements[i].id);
if(myCanvas.getContext )
{
var newImg=document.createElement("img");
newImg.src=myCanvas.toDataURL();
newImg.style.cssText='width:'+myCanvas.width+'px;height:'+myCanvas.height+'px;';
canvasElements[i].style.display="none";
canvasElements[i].parentNode.appendChild(newImg);
}
}
}
return divToPrint;
}
jsCBDgetPullDownValue=function(id)
{
var pullDown=document.getElementById(id);
var selectedIndex=pullDown.selectedIndex;
return pullDown.options[selectedIndex].value;
}
_cbdExpandOverflow=function(newDiv)
{
var divNodes=newDiv.getElementsByTagName("div");
for(var i=0;i < divNodes.length;i++)
{
divNodes[i].style.overflow="visible";
divNodes[i].style.height="auto";
}
return newDiv;
}
jsCBDcustomTableCellMouseOutJS=function(mouseoutJS, event, cellElement)
{
if(_cbdTableCellMouseEventHandler(event, cellElement))
{
eval(mouseoutJS);
}
}
jsCBDcustomTableCellMouseOverJS=function(mouseoverJS, event, cellElement)
{
if(_cbdTableCellMouseEventHandler(event, cellElement))
{
eval(mouseoverJS);
}
}
_cbdTableCellMouseEventHandler=function(e, cellElement)
{
if(!e) e=window.event;
var target=(window.event)?e.srcElement:e.target;
if(target!=null)
_cbdLogTableCellMouseEvents(e.type+" event source is "+target.nodeName);
while(target!=cellElement)
{
target=target.parentNode;
}
var tableElement;
for(tableElement=cellElement;tableElement!=null&&tableElement.nodeName!="TABLE";)
{
tableElement=tableElement.parentNode;
}
var relatedElement;
if(e.type=="mouseover")
{
relatedElement=(e.relatedTarget)?e.relatedTarget:e.fromElement;
if(relatedElement!=null)
_cbdLogTableCellMouseEvents("mouseover from Element "+relatedElement.nodeName);
}
else if(e.type=="mouseout")
{
relatedElement=(e.relatedTarget)?e.relatedTarget:e.toElement;
if(relatedElement!=null)
_cbdLogTableCellMouseEvents("mouseout to Element "+relatedElement.nodeName);
}
var relatedElementAncestor=relatedElement;
while(relatedElementAncestor!=null&&relatedElementAncestor!=target&&relatedElementAncestor!=tableElement&&relatedElementAncestor.nodeName!="HTML")
{
relatedElementAncestor=relatedElementAncestor.parentNode;
}
if(e.type=="mouseover")
{
if(relatedElementAncestor==target) return false;
}
else if(e.type=="mouseout")
{
if(relatedElementAncestor==target)
{
return false;
}
else if(relatedElementAncestor==tableElement)
{
if(relatedElement!=null)
{
while(relatedElement!=null&&relatedElement.nodeName!="TD")
{
relatedElement=relatedElement.parentNode;
}
_cbdLogTableCellMouseEvents("Element "+relatedElement.nodeName+" onmouseover on TD is "+relatedElement.onmouseover);
if(relatedElement.onmouseover!=null)
{
return false;
}
}
}
}
return true;
}
_cbdLogTableCellMouseEvents=function(logMessage)
{
if((typeof _cbdLogFlag)!='undefined'&&_cbdLogFlag==true)
{
_cbdLog=_cbdLog+"<br/>"+logMessage;
document.getElementById('log').innerHTML=_cbdLog;
}
}
var _cbdIsModem=false;
jsCBDisModemUser=function()
{
var connectionType=document.body.connectionType;
return(typeof(connectionType)!="undefined"&&connectionType=="modem");
}
var _CBD_MODEM_COOKIE="_cbdModemCheck";
var _CBD_MODEM_IMAGE="/web/images/modem2.gif?stamp=";
var _CBD_MODEM_THRESHOLD=1900;
_cbdCheckConnectionSpeed=function()
{
if(jsCBDgetCookie(_CBD_MODEM_COOKIE))
{
return;
}
var isModem=jsCBDisModemUser();
var modemPrefix=vg.constants.MODEM;
jsCBDsetCookie(_CBD_MODEM_COOKIE, isModem);
jsCBDsetConfigInfo(modemPrefix, isModem);
return;
_cbdCheckConnectionSpeed.timerStart=(new Date()).getTime();
var connTestImg=new Image();
connTestImg.src=_CBD_MODEM_IMAGE+_cbdCheckConnectionSpeed.timerStart;
connTestImg.onload=function()
{
if(jsCBDgetCookie(_CBD_MODEM_COOKIE))
{
return;
}
_cbdCheckConnectionSpeed.timerEnd=(new Date()).getTime();
var xmitTime=_cbdCheckConnectionSpeed.timerEnd - _cbdCheckConnectionSpeed.timerStart;
var value=(xmitTime > _CBD_MODEM_THRESHOLD?"T":"F");
jsCBDsetCookie(_CBD_MODEM_COOKIE, value);
_cbdIsModem=(value=="T"?true:false);
jsCBDsetConfigInfo(modemPrefix, jsCBDisModemUser());
}
connTestImg.onabort=function()
{
jsCBDdelCookie(_CBD_MODEM_COOKIE);
}
}
jsCBDshowStars=function(numbStar, caller, reset)
{
var imgPath=cbd.page._cbdImagePath+"icons/";
var imgPathNG=cbd.page._cbdImagePath+"ng/cbd/icons/";
var emptyStar=imgPath+"star_empty.gif";
var halfStar=imgPath+"star_half.gif";
var mapPrefix=null;
var fullStar=imgPath+(reset?"star_full.gif":"star_hover.gif");
if(cbd.page.isNextGen)
{
fullStar=imgPathNG+(reset?"14_ratingstar_pos.png":"14_ratingstar_hover.png");
halfStar=imgPathNG+"14_ratingstar_pos_neg.png";
emptyStar=imgPathNG+"14_ratingstar_neg.png";
}
for(var i=1;i<=5;i++)
{
var imgTag="star"+i;
if((numbStar-i) <(-0.75))
{
document.getElementById(caller+":"+imgTag).src=emptyStar;
}
else if((numbStar-i) >(-0.25))
{
document.getElementById(caller+":"+imgTag ).src=fullStar;
}
else
{
document.getElementById(caller+":"+imgTag).src=halfStar;
}
}
}
jsCBDresetStarRating=function(initialRating,caller)
{
jsCBDshowStars(initialRating, caller, true);
}
vg.StarRating={};
vg.StarRating._touchEnd=function(event, initialRating, caller, compId)
{
var ttlNumOfStars=5;
var starTouchIndex=0;
for(var i=1;i <=ttlNumOfStars;i++)
{
var imgTag="star"+i;
var elem=document.getElementById(caller+":"+imgTag);
if(vg.event.isWithinNodes(event,[elem]))
{
starTouchIndex=i;
}
}
if(starTouchIndex >=1&&starTouchIndex <=ttlNumOfStars)
{
jsCBDsetStars(starTouchIndex,caller,compId);
}
else
{
jsCBDresetStarRating(initialRating, caller);
}
}
vg.StarRating._touch=function(event, initialRating, caller)
{
var ttlNumOfStars=5;
var starTouchIndex=0;
for(var i=1;i <=ttlNumOfStars;i++)
{
var imgTag="star"+i;
var elem=document.getElementById(caller+":"+imgTag);
if(vg.event.isWithinNodes(event,[elem]))
{
starTouchIndex=i;
}
}
if(starTouchIndex >=1&&starTouchIndex <=ttlNumOfStars)
{
jsCBDshowStars(starTouchIndex, caller, false);
}else{
jsCBDresetStarRating(initialRating, caller);
}
}
jsCBDsetStars=function(numbStars,caller,compId)
{
if(!cbd.page.isNextGen)
{
for(var i=1;i <=5;i++)
{
var imgTag="star"+i;
var elem=document.getElementById(caller+":"+imgTag);
if(elem)
{
elem.onmouseover="";
elem.onclick="";
}
}
var elem=document.getElementById(caller+":tblRate" );
if(elem)
{
elem.disabled=true;
elem.onmouseout="";
}
jsCBDshowStars(numbStars,caller,true);
var elem=document.getElementById(caller+":message");
if(elem!=null)
{
elem.innerHTML="<p>Thank you for rating this item.</p>";
}
}
cbd.StateKeeper._setState(compId,numbStars);
if(cbd.page.isNextGen)
{
jsCBDupdateComponent(compId);
}
}
jsCBDdisableStars=function(caller, compId)
{
var timeout=(cbd.page.isNextGen)?200:0;
setTimeout(
function()
{
for(var i=1;i <=5;i++)
{
var imgTag="star"+i;
var elem=document.getElementById(caller+":"+imgTag);
if(elem)
{
elem.onmouseover="";
elem.onclick="";
}
}
var elem=document.getElementById(caller+":tblRate" );
if(elem)
{
elem.disabled=true;
elem.onmouseout="";
}
}, timeout);
}
var ghurl=null;
_cbdGhCallback=function(myRequest, errMsg, caller )
{
if(errMsg==null )
{
var txt=myRequest.responseText.toLowerCase();
var startUsefulHTML=txt.indexOf('<div' );
var endUsefulHTML=txt.indexOf('<!doctype' );
var contr=vg.comp.getController('ghFirstNav');
if(contr!=null)
{
contr._destroy();
}
jsCBDsetElementInnerHtml(caller, myRequest.responseText.substr(startUsefulHTML, endUsefulHTML - startUsefulHTML ));
cbd.gh.initGH();
}
}
_cbdClientSideGHDefault=function(cfg )
{
return true;
}
_cbdClientSideGHFirstNav=function(selectedNav, callback, type )
{
var cfg=_cbdClientSideGHLoad(selectedNav, 'CBD_NAV_NONE', callback, type );
if(callback(cfg ) )
{
document.getElementById('gh' ).changeSelected(cfg );
}
}
_cbdClientSideGHSecondNav=function(firstNav, selectedNav, callback, type )
{
var cfg=_cbdClientSideGHLoad(firstNav, selectedNav, callback, type );
if(callback(cfg ) )
{
document.getElementById('gh' ).changeSelected(cfg );
}
}
_cbdClientSideGHLoad=function(sel1, sel2, callback, type )
{
var callbackname=callback.toString().substring(9, callback.toString().indexOf("(" ) );
_cbdClientSideGHAttachMethod();
var cfg={
sel1:sel1,
sel2:sel2,
uicallback:callbackname,
select:function()
{
document.getElementById('gh' ).changeSelected(this );
}
};
if(undefined!==type&&type!='' )
{
cfg.type=type;
}
return cfg;
}
_cbdGHgetUrl=function()
{
if(ghurl==null )
{
ghurl=jsCBDgetContextRoot()+'com/vanguard/util/cbd/data/jsp/hnw/GlobalHeaderTagOnly.jsf';
}
return ghurl;
}
_cbdGHgenerateUrl=function()
{
var opts=[];
for(var i in ghopt )
{
if(typeof(ghopt[i])=="string" )
{
opts.push(i+'='+ghopt[i]);
}
}
return opts.join('&' );
}
_cbdClientSideGHAttachMethod=function()
{
var node=document.getElementById('gh' );
if(node.changeSelected===undefined )
{
node.changeSelected=function(cfg )
{
ghopt.callback=cfg.uicallback;
ghopt.selected1=cfg.sel1;
ghopt.selected2=cfg.sel2;
if(undefined!==cfg.type&&cfg.type!='' )
{
ghopt.type=cfg.type;
}
if(cfg.PDF_COVER)
{
ghopt.PDF_COVER=cfg.PDF_COVER;
}
ghcurrenturl=_cbdGHgenerateUrl();
var url=_cbdGHgetUrl()+'?'+ghcurrenturl;
var loader=new cbd.ContentLoader(url, _cbdGhCallback, this );
loader.sendRequest();
};
}
}
jsCBDupdateGlobalHeader=function(cfg )
{
_cbdClientSideGHAttachMethod();
document.getElementById('gh' ).changeSelected(cfg );
}
jsCBDchangeGlobalHeaderDisplay=function(mode )
{
if(mode=='NORMAL' )
{
var gh_nonav=document.getElementById('gh' );
var gh_nav=document.getElementById('gh_nav' );
gh_nonav.style.display='none';
gh_nonav.id='gh_nonav';
gh_nav.style.display='';
gh_nav.id='gh';
}
else if(mode=='NONAV' )
{
var gh_nonav=document.getElementById('gh_nonav' );
var gh_nav=document.getElementById('gh' );
gh_nonav.style.display='';
gh_nonav.id='gh';
gh_nav.style.display='none';
gh_nav.id='gh_nav';
}
}
jsCBDredrawGlobalHeader=function(opts )
{
ghcurrenturl=_cbdGHgenerateUrl();
var url=_cbdGHgetUrl()+'?'+ghcurrenturl;
var loader=new cbd.ContentLoader(url, _cbdGhCallback, document.getElementById('gh' ) );
loader.sendRequest();
}
jsCBDenableCobrowseGlobalHeader=function()
{
}
jsCBDdisableCobrowseGlobalHeader=function()
{
}
var gfnode=null;
_cbdGfCallback=function(myRequest, errMsg, caller )
{
if(errMsg==null )
{
var i=myRequest.responseText.indexOf('<!--CBD:GlobalFooterTag-->' );
caller.innerHTML=myRequest.responseText;
}
}
jsCBDredrawGlobalFooter=function()
{
if(!gfnode )
{
var nodes=document.getElementById('main' ).getElementsByTagName('div' );
for(var i=0;i < nodes.length;i++)
{
if(!gfnode )
{
var aclass=nodes[i].getAttribute('class' );
if(aclass )
{
var classes=aclass.split(' ' );
for(var j=0;j < classes.length;j++)
{
if(classes[j]=='gblFoot' )
{
gfnode=nodes[i];
}
}
}
}
}
}
if(gfnode )
{
var loader=new cbd.ContentLoader(jsCBDgetContextRoot()+'com/vanguard/util/cbd/data/jsp/hnw/GlobalFooterTagOnly.jsp', _cbdGfCallback, gfnode );
loader.sendRequest();
}
}
function checkAttrName(attrName, node)
{
switch(attrName)
{
case "class":
attrName=(node.getAttribute('className')!==null)?'className':'class';
break;
default:
attrName=attrName;
}
return attrName;
}
function FOCObject(FOCId)
{
this.FOCId=FOCId;
}
jsCBDregisterFOC=function(FOCId)
{
FOCArray[FOCArray.length]=new FOCObject(FOCId);
}
jsCBDcloseFOC=function(clickEvent)
{
var node=jsCBDgetEventNode(clickEvent);
if(_cbdFindAncestor(node,{tagName:'DIV',attrName:'class',attrValue:'FOCDrop'})!=null )
{
return;
}
else if(_cbdFindAncestor(node,{tagName:'DIV',attrName:'class',attrValue:'FOCTitle'})!=null )
{
var FOCContainer=_cbdFindAncestor(node,{tagName:'DIV',attrName:'class',attrValue:'FOCContainerBegin'});
var FOCId=FOCContainer.parentNode.getAttribute('id');
vg.comp.getController(document.getElementById(FOCId)).toggleOpenClose();
jsCBDcloseFOCs(FOCId);
}
else
{
jsCBDcloseFOCs();
}
}
jsCBDcloseFOCs=function(FOCId)
{
for(var i=0;i < FOCArray.length;i++)
{
if(FOCArray[i].FOCId!=FOCId)
{
vg.comp.getController(document.getElementById(FOCArray[i].FOCId)).blur();
}
}
}
_cbdCloseWindowShadeNavboxes=function(clickEvent)
{
var node=jsCBDgetEventNode(clickEvent);
var navBody=vg.html.hasStyle("winShadeContent", node)||vg.html.findAncestor(node,{}, function(node){return vg.html.hasStyle("winShadeContent", node)});
var navTab=vg.html.hasStyle("vg-NavboxLabel", node)||vg.html.findAncestor(node,{}, function(node){return vg.html.hasStyle("vg-NavboxLabel", node)});
if(navBody==null&&navTab==null&&vg.NavBox.openWindowShadeId!=null)
{
var parentController=vg.comp.getController(vg.NavBox.openWindowShadeId);
if(parentController&&parentController.isWindowShade&&!parentController._isOpenedBy(node.id)&&parentController._isCloseWindowShadeOnBlur() )
{
parentController.close();
}
}
}
_cbdFindAncestor=function(node, oFilter, check, stopFilter)
{
for(node=node.parentNode;node!=null;node=node.parentNode)
{
if(stopFilter!=null&&_cbdCheckNodeAttrs(node, stopFilter) )
{
break;
}
if(check!=null&&!check(node))
{
continue;
}
if(_cbdCheckNodeAttrs(node, oFilter))
{
return node;
}
}
return null;
}
_cbdCheckNodeAttrs=function(node, oAttrs)
{
if(node.getAttribute==null)
{
return false;
}
var tagName=oAttrs.tagName;
var attrName=checkAttrName(oAttrs.attrName, node);
var attrValue=oAttrs.attrValue;
if(tagName!=null&&node.tagName!=tagName.toUpperCase() )
{
return false;
}
if(attrName!=null )
{
var nodeAttrValue=node.getAttribute(attrName);
if(attrValue!=null )
{
if(attrValue instanceof RegExp&&nodeAttrValue!=null)
{
return attrValue.test(nodeAttrValue);
}
else
{
return attrValue==nodeAttrValue;
}
}
else
{
return nodeAttrValue!=null;
}
}
return true;
}
_cbdExecAndDisableLink=function(link)
{
cbdcommon.util.preventDoubleClick(link);
};
jsCBDtriggerEventOnNode=function(nodeId, event)
{
var node=vg.html.getElement(nodeId);
if(document.createEvent)
{
if(event=="mouseenter")
{
event="mouseover";
}
var e=document.createEvent("MouseEvents");
e.initMouseEvent(event, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
node.dispatchEvent(e);
}
else if(document.createEventObject)
{
var e=document.createEventObject();
var needsDotClick=(node.tagName=='INPUT'&&(node.type=='radio'||node.type=='checkbox'))||'a'==node.tagName.toLowerCase();
if(event=='click'&&needsDotClick )
{
node.click();
}
else
{
node.fireEvent("on"+event, e);
}
}
else
{
throw("jsCBDtriggerEventOnNode:can't trigger event, since the browser does not support it");
}
}
jsCBDblockEnterKey=function(e)
{
var keyPressed=jsCBDgetKey(e);
return!(keyPressed==13);
}
jsCBDisCoBrowseActive=function()
{
return false;
}
_cbdIsCustomComponent=function(id )
{
var node=document.getElementById(id );
return(node&&node.jsController );
}
_cbdLoadUnitTest=function(url )
{
if(!url )
{
url=location.href;
}
location.href=jsCBDgetContextRoot()+'com/vanguard/util/cbd/test/jsf/UnitTest.jsf?page=root&url='+url;
}
_cbdGetIEPropertyName=function(propertyName)
{
return cbdcommon.util.getIEPropertyName(propertyName);
};
jsCBDGetComputedStylePropertyValue=function(domElement, propertyName)
{
return cbdcommon.util.getComputedStylePropertyValue(domElement, propertyName);
};
jsCBDgetSelectedSelectManyValues=function(id)
{
var values=_cbdGetSelectListValues(id, true);
return values.join(",");
}
_cbdGetSelectListValues=function(id, getOnlySelected)
{
var values=new Array();
var selectedList=document.getElementById(id);
if(selectedList!=null )
{
for(var i=0;i < selectedList.length;i++)
{
if(selectedList.options[i].value!=pad)
{
if(getOnlySelected)
{
if(selectedList.options[i].selected)
{
values.push(selectedList.options[i].value);
}
}
else
{
values.push(selectedList.options[i].value);
}
}
}
}
return values;
}
_cbdExecuteFunc=function(func, args){
if(typeof(func)=='string')
{
func=eval(func );
}
if(func)
{
return args?func(args):func();
}
}
_cbdCheckConditionsAndExecute=function(conditions, func, trials, notifyIfFails)
{
if(conditions==null||func==null)
{
return;
}
var conditionsMet=true;
if(typeof conditions=='object')
{
for(var i=0;i<conditions.length;i++)
{
var condition=conditions[i];
var thisConditionMet=(typeof condition=='string')?eval(condition):condition.call();
conditionsMet=conditionsMet&&thisConditionMet;
}
}
else
{
conditionsMet=(typeof conditions=='string')?eval(conditions):conditions.call();
}
trials=(trials==null)?99:trials - 1;
if(conditionsMet)
{
_cbdExecuteFunc(func,{status:"success"});
}
else
{
if(trials > 0)
{
var trialsLeft=trials;
setTimeout(function(){_cbdCheckConditionsAndExecute(conditions, func, trialsLeft, notifyIfFails)}, 100);
}
else if(notifyIfFails)
{
vg.util.execFunc(func,{status:"failed"});
}
}
}
jsCBDsetPageTitle=function(title, preventOverides)
{
document.title=title;
if(preventOverides)
{
if(jsCBDsetPageTitle.intervalId!=null)
{
clearInterval(jsCBDsetPageTitle.intervalId);
}
jsCBDsetPageTitle.newTitle=title;
var counter=0;
jsCBDsetPageTitle.intervalId=setInterval(
function()
{
counter++;
if(document.title!=jsCBDsetPageTitle.newTitle&&jsCBDsetPageTitle.newTitle!=null)
{
document.title=jsCBDsetPageTitle.newTitle;
clearInterval(jsCBDsetPageTitle.intervalId);
}
else if(counter==10)
{
clearInterval(jsCBDsetPageTitle.intervalId);
}
}, 200);
}
}
_cbdAreDelayedEventsFinished=function()
{
return!cbd.loader.loadRunning&&vg.delayedEvents==0;
}
function jsCBDgetAbsoluteURL(id, scheme, serverName_PortId)
{
var form=document.getElementById(id);
var _currAction=form.getAttribute('action');
form.setAttribute('action', scheme+"://"+serverName_PortId+_currAction);
}
jsCBDtest=function(){
_debug("log", "Hosting-App jsCBD test");
}
_cbdNStest=function(){
_debug("log", "Hosting-App _cbd test");
}
var wu=new Object();
wu.observables;
wu.CBD_OBSERVABLES="cbd_observables";
wu.observe=function()
{
for(var i=0;i < wu.observables.length;i++)
{
var id=wu.observables[i];
var node=document.getElementById(id);
var type=node.getAttribute("type");
var wuData=node.getAttribute("wuData");
if(type=='checkbox')
{
var isChecked=node.checked;
if(isChecked)
{
jsCBDAddOrAppendMetaTag(wu.CBD_OBSERVABLES, wuData+isChecked);
}
}
else if(type=='button'||type=='submit'||type=='CommandButton')
{
jsCBDAddOrAppendMetaTag(wu.CBD_OBSERVABLES, wuData);
}
}
jsCBDdcsTag();
}
jsCBDAddOrAppendMetaTag=function(name, value)
{
var tag=jsCBDgetMetaTag("DCSext."+name);
if(tag!=null)
{
jsCBDAppendValueToTag(tag, value);
}
else
{
jsCBDAddMetaTag(name, value);
}
}
jsCBDAddMetaTag=function(name, value)
{
var dcsExtName=vg.string.startsWithStr(name, "WT.")?name:"DCSext."+name;
var elem=jsCBDgetMetaTag(dcsExtName);
if(!elem)
{
elem=document.createElement("meta");
document.getElementsByTagName("head")[0].appendChild(elem);
elem.name=dcsExtName;
}
elem.content=value;
_cbdProcessDCSVal(dcsExtName, value);
}
jsCBDUpdateMetaTag=function(name, value)
{
var elem=jsCBDgetMetaTag(name);
if(elem!=null)
{
elem.content=value;
_cbdProcessDCSVal(name, value);
}
}
jsCBDclearMetaTag=function(name)
{
var dcsName=vg.string.startsWithStr(name, "WT.")?name:"DCSext."+name;
var metaTagNode=jsCBDgetMetaTag(dcsName);
if(metaTagNode)
{
metaTagNode.content="";
_cbdClearDCSVal(dcsName);
}
}
jsCBDupdateDcsUri=function(uri)
{
if(wtActive)
{
_tag.dcsMeta();
dcsMultiTrack('DCS.dcsuri', uri);
}
}
jsCBDcalldcsMultiTrack=function()
{
if(wtActive)
{
dcsMultiTrack.apply(this, arguments);
}
}
jsCBDcalldcsMultiTrackWithMeta=function()
{
if(wtActive)
{
dcsMultiTrack.apply(this, arguments);
}
}
jsCBDSendDCSTagsThenClear=function()
{
var argLen=arguments.length;
if(argLen % 2!=0)
{
return;
}
jsCBDcalldcsMultiTrack.apply(this, arguments);
for(var x=0;x < argLen;x+=2)
{
_cbdClearDCSVal(arguments[x]);
}
}
jsCBDAddErrorMetaTag=function(state, value)
{
if(state)
{
var errorMetaTag=jsCBDgetMetaTag("DCSext.error");
if(errorMetaTag!=null)
{
jsCBDAppendValueToTag(errorMetaTag, value);
}
else
{
jsCBDAddMetaTag("error", value);
}
}
}
jsCBDAppendValueToTag=function(metaTag, value, delimiter)
{
var contentAttrTxt=metaTag.getAttribute("content");
var separator=(typeof(delimiter)!="undefined")?delimiter:"::";
if(contentAttrTxt!=null)
{
contentAttrTxt+=separator+value;
metaTag.removeAttribute("content");
metaTag.setAttribute("content", contentAttrTxt);
_cbdProcessDCSVal(metaTag.getAttribute("name"), contentAttrTxt);
}
}
jsCBDgetMetaTag=function(tagName)
{
var metaTags=document.getElementsByTagName("meta");
var size=metaTags.length;
var metaTag=null;
for(var i=0;i < size;i++)
{
var metaTagNode=metaTags[i];
var metaTagName=metaTagNode.getAttribute("name");
if(metaTagName==tagName)
{
metaTag=metaTagNode;
}
}
return metaTag;
}
jsCBDgetMetaTags=function()
{
var elem=document.getElementsByTagName("head");
var head=elem[0].nodeName;
var size=elem[0].childNodes.length;
var metaTag="META TAG INFORMATION \n\n";
for(var i=0;i < size;i++)
{
if(elem[0].childNodes[i].nodeName.toLowerCase()=="meta")
{
metaTag+="NAME="+elem[0].childNodes[i].getAttribute("name")+" -- CONTENT="+elem[0].childNodes[i].getAttribute("content")+"\n";
}
}
alert(metaTag);
}
jsCBDdcsTag=function()
{
if(wtActive)
{
_tag.dcsCollect();
}
}
jsCBDLogWebUsageEvent=function(name, value, cleanup)
{
jsCBDAddMetaTag(name, value);
jsCBDdcsTag();
if(cleanup)
{
jsCBDclearMetaTag(name);
}
}
jsCBDLogActionEvent=function(compName, compValue)
{
_cbdLogActionEvent(compName+compValue);
}
jsCBDLogCompActionEvent=function(comp)
{
var wuData=comp.getAttribute("wuData");
_cbdLogActionEvent(wuData!=null?wuData:"" );
}
_cbdLogActionEvent=function(value)
{
jsCBDcalldcsMultiTrack('DCS.dcsuri', window.location.pathname+".ev", "DCSext.cbd_action", value);
_cbdClearDCSVal("cbd_action");
}
_cbdClearDCSVal=function(aKey)
{
_cbdProcessDCSVal(aKey, "");
}
_cbdProcessDCSVal=function(aKey, newValue)
{
var index="";
if(!wtActive) return;
if(vg.string.startsWithStr(aKey, "WT."))
{
index=aKey.substr(3);
if(index in _tag.WT||newValue!=="")
{
_tag.WT[index]=newValue;
}
}
else if(vg.string.startsWithStr(aKey, "DCS."))
{
index=aKey.substr(4);
if(index in _tag.DCS||newValue!=="")
{
_tag.DCS[index]=newValue;
}
}
else if(vg.string.startsWithStr(aKey, "DCSext."))
{
index=aKey.substr(7);
if(index in _tag.DCSext||newValue!=="")
{
_tag.DCSext[index]=newValue;
}
}
}
jsCBDLogLinkEvent=function(evt)
{
if(wtActive)
{
_tag.dcsDownload(evt);
}
}
jsCBDLogDownloadEvent=function(evt)
{
if(wtActive)
{
_tag.dcsDownload(evt);
}
}
jsCBDwurPulldown=function(pDown)
{
jsCBDLogActionEvent('PullDown:'+pDown.id+":", pDown.value);
}
_cbdOpenDebugLayer=function()
{
var windowName='debugWindow';
var div=document.getElementById(windowName );
var caller={
div:div,
errorMsg:'Unable to load Debug Window',
onload:'_initDebug'
};
cbd.loader.require('cbdDebug' );
var url=jsCBDgetContextRoot()+'com/vanguard/util/cbd/data/jsp/hnw/DebugWindow.jsf';
jsCBDgetContent(url, _cbdLoadContentCallback, caller );
}
_initDebug=function(){
cbd.debug.InitDebugWindow();
jsCBDopenLayer('debugLayer' );
_cbdCheckConditionsAndExecute(_isDebugOpen, _cbdPositionDebug);
}
_isDebugOpen=function(){
return((document.getElementById('debugLayer' ))&&(document.getElementById('debugLayer' ).jsController));
}
_cbdPositionDebug=function(){
layerController=document.getElementById('debugLayer' ).jsController
if(layerController.openFlag){
layerController.changePosition(null,layerController.positionLeft, scrollTop);
layerController.reposition();
}
}
jsCBDdisableCalendarInput=function(id){
var linkNode=vg.html.getElement("comp-"+id).nextSibling.nextSibling;
linkNode.setAttribute("onclickBackup",linkNode.onclick);
jsCBDtoggleLink(linkNode,false);
jsCBDdisableInput(vg.html.getElement(id), true);
}
jsCBDenableCalendarInput=function(id){
var linkNode=vg.html.getElement("comp-"+id).nextSibling.nextSibling;
linkNode.onclick=linkNode.getAttribute("onclickBackup");
jsCBDtoggleLink(linkNode,true);
jsCBDdisableInput(vg.html.getElement(id), false);
}
_cbdUpdateHeaderOrderItems=function(numItems)
{
'use strict';
var orderElements=cbd.getYUI().all('#gh .x-ghOrders'),
numOrderElements=orderElements.size(),
clearOrders=(!numItems||numItems===0 ),
ORDER_ITEMS_SELECTOR='.x-ghOrderItems',
EMPTY_STR='',
currentOrderEl,
currentOrderItems,
i;
for(i=0;i < numOrderElements;i++)
{
currentOrderEl=orderElements.item(i);
if(clearOrders )
{
currentOrderEl.setContent(EMPTY_STR );
}
else
{
currentOrderItems=currentOrderEl.one(ORDER_ITEMS_SELECTOR );
if(currentOrderItems )
{
currentOrderItems.setContent(numItems );
}
}
}
};
jsCBDupdateHeaderOrderItems=function(numItems)
{
'use strict';
if(VGN&&VGN.shoppingCart&&VGN.shoppingCart.update )
{
VGN.shoppingCart.update({total:numItems});
}
else
{
_cbdUpdateHeaderOrderItems(numItems);
}
};
var custom_var,_sp='%3A\\/\\/',_rp="%3A//",_poE=0.0, _poX=0.0,_sH=screen.height,_d=document,_w=window,_ht=escape(_w.location.href),_hr=_d.referrer,_tm=(new Date()).getTime(),_kp=0,_sW=screen.width;
function TLGetCookie(c_name){
if(document.cookie.length > 0)
{
c_start=document.cookie.indexOf(c_name+"=");
if(c_start!=-1){
c_start=c_start+c_name.length+1;
c_end=document.cookie.indexOf(";", c_start);
if(c_end==-1) c_end=document.cookie.length;
return unescape(document.cookie.substring(c_start, c_end));
}
}
return ""
};
function _fC(_u){
_aT=_sp+',\\/,\\.,-,_,'+_rp+',%2F,%2E,%2D,%5F';
_aA=_aT.split(',');
for(var _iI=0;_iI<5;_iI++)
{
eval('_u=_u.replace(/'+_aA[_iI]+'/g,_aA[_iI+5])')
}
return _u
};
function O_LC(useServlet){
tleaf_cv=TLGetCookie('TLTSID')+'|';
if(useServlet)
{
var url="/opinionLab";
var opLabContextRoot=cbdConfig.opLabContextRoot;
if(typeof opLabContextRoot!=="string")
{
opLabContextRoot="/us";
}
if(typeof cbdConfig.opLabDomain==="string")
{
url=cbdConfig.opLabDomain+opLabContextRoot+url;
}
else
{
url=cbd._cbdContextRoot.replace(/[\/]$/, "")+url;
}
_w.open(url+"?time1="+_tm+'&time2='+(new Date()).getTime()+'&prev='+_fC(escape(_hr))+'&referer='+_fC(_ht)+'&height='+_sH+'&width='+_sW+'&custom_var='+tleaf_cv, 'comments', 'width=555,height=500,screenX='+((_sW - 555)/2)+',screenY='+((_sH - 500)/2)+',top='+((_sH - 500)/2)+',left='+((_sW - 555)/2)+',resizable=yes,copyhistory=yes,scrollbars=no');
}
else
{
_w.open("https://secure.opinionlab.com/ccc01/comment_card.asp?time1="+_tm+'&time2='+(new Date()).getTime()+'&prev='+_fC(escape(_hr))+'&referer='+_fC(_ht)+'&height='+_sH+'&width='+_sW+'&custom_var='+tleaf_cv+custom_var, 'comments', 'width=555,height=500,screenX='+((_sW - 555)/2)+',screenY='+((_sH - 500)/2)+',top='+((_sH - 500)/2)+',left='+((_sW - 555)/2)+',resizable=yes,copyhistory=yes,scrollbars=no');
}
};
function _fPe(){
if(Math.random() >=1.0 - _poE){
O_LC();
_poX=0.0
}
};
function _fPx(){
if(Math.random() >=1.0 - _poX) O_LC()
};
window.onunload=_fPx;
function O_GoT(_p){
_d.write('<a href=\'javascript:O_LC()\'>'+_p+'</a>');
_fPe()
}
jsCBDopenVpas=function()
{
jsCBDupdateDcsUri('/VGApp/pe/jsp/web/account/inquiry/ivpas/VpasJumpOffJSP.jsp');
jsCBDopenWin('/VGApp/pe/jsp/web/account/inquiry/ivpas/VpasJumpOffJSP.jsp', 'vpas',true,true,782,430,'toolbar=yes,menubar=yes,status=yes,location=yes,directories=yes');
}
function jsCBDopenFormlitPopup(url, name)
{
var existingPopup=getModalPopup();
if(ie&&(existingPopup!=null)&&(typeof existingPopup!='undefined'))
{
jsCBDopenStdWin("", CBD_MODAL_POP, Y, Y, POPUP_SIZE12 );
existingPopup.close();
}
if(jsCBDisAdobeInstalled())
{
if(name==null)
{
jsCBDopenStdWin(url, CBD_MODAL_POP, Y, Y, POPUP_SIZE12 );
}
else
{
jsCBDopenStdWin(url, name, Y, Y, POPUP_SIZE12 );
}
}
else
{
url=jsCBDaddQueryStringParam(url, "acrobatNotInstalled", "true");
if(name==null)
{
jsCBDopenStdWin(url, CBD_MODAL_POP, N, N, POPUP_SIZE7 );
}
else
{
jsCBDopenStdWin(url, name, N, N, POPUP_SIZE7 );
}
}
}
function _trackSubmitCustomTagButton(button)
{
button=jsCBDgetHtmlNode(button);
var btnId=button.name?button.name:button.id;
var disable=button.getAttribute("disableOnSubmit");
if(disable=='true')
{
var hiddenInput=jsCBDcreateHiddenInput(btnId, button.value, "submitBtnClicked", button.parentNode);
hiddenInput.setAttribute("disableOnClick", disable);
}
}
jsfunctionsLoaded=true;


LGN='999';
FLG='998';
VGR='30';
PR='110';
BRIDGE='666';
PEONLY='222';
VBOONLY='555';
SUNGARD='777';
_529='529';
IIG='997';
AMTS='90';
function jsCBDcheckStatus(status)
{
var seg=jsCBDgetSegment();
return(status==seg||
status==FLG&&(seg=='10'||seg=='20')||
status==LGN&&(seg!=null) );
}
function onContactUs(path)
{
path=path==null?'':path;
var urlLoggedOn=path+jsCBDgetContextRoot()+"TransSegmentedContent_nw?cbdPop=1";
var urlLoggedOff=path+jsCBDgetContextRoot()+"content/UtilityBar/SiteHelp/SiteHelp/ContactUsPublicContent.jsp?cbdPop=1";
jsCBDopenStdWin(jsCBDcheckStatus(LGN )?urlLoggedOn:urlLoggedOff,CBD_MODAL_POP,Y,Y,POPUP_SIZE7);
return F;
}
function onHelp(path)
{
path=path==null?'':path;
var commonPath=path+"/web/siteservices/SiteSvcsHelpSiteHelpLogged";
var urlLoggedOff=commonPath+"OffVersion.html";
var urlLoggedOn=commonPath+"OnVersion.html";
jsCBDgoToUrl(jsCBDcheckStatus(LGN )?urlLoggedOn:urlLoggedOff )
return F;
}
function jsCBDStartDiv(width, height, bgColor, overflow, iewidth, extendheight, extendwidth)
{
overflow="overflow:"+(overflow==null?"auto":overflow)+";";
if(aol5&&mac)
overflow="";
if(extendwidth)
width=jsCBDadjustWidth(width);
if(extendheight||
extendheight==null&&!jsCBDisModalPopup() )
{
height=jsCBDadjustHeight(height);
}
bgColor=(bgColor==null)?"":"background-color:"+bgColor+";";
if(ie||nav4)
{
document.write("<DIV STYLE='"+overflow+bgColor+"height:"+height+"px;width:"+(iewidth!=null?(iewidth+"%"):(width+"px"))+"'>");
}
else if(nav6)
{
document.write("<DIV STYLE='"+overflow+bgColor+"height:"+height+"px;width:"+width+"px;position:absolute;z-index:1'>");
}
}
function jsCBDEndDiv(width, height, extendheight, extendwidth)
{
document.write("</DIV>");
if(nav6)
{
if(extendwidth)
width=jsCBDadjustWidth(width);
if(extendheight||
extendheight==null&&top.window.name.indexOf(CBD_MODAL_POP) < 0)
{
height=jsCBDadjustHeight(height);
}
document.write("<DIV STYLE='overflow:none;height:"+height+"px;width:"+(width - 15)+"px;position:relative'></DIV>");
}
}
function jsCBDadjustHeight(height)
{
var extraHeight=0;
if(jsCBDisModalPopup() )
{
extraHeight=jsCBDgetPopupExtraHeight(T );
}
else if(ie)
extraHeight=document.body.clientHeight - 435;
else if(nav6)
extraHeight=winInnerHeight - 445;
if(extraHeight > 0 )
{
height=parseInt(height, 10 )+extraHeight;
}
return height;
}
function jsCBDadjustWidth(width)
{
var extraWidth=0;
if(ie)
extraWidth=document.body.clientWidth - 780;
else if(nav6)
extraWidth=winInnerWidth - 796;
if(extraWidth > 0 )
{
width=parseInt(width, 10 )+extraWidth;
}
return width;
}
function jsCBDbreakFrame()
{
if(top.window!=window)
{
top.window.location=window.location;
}
}
function IndividualMailRequest(formId, entryPoint)
{
var url=jsCBDgetContextRoot()+"LiteratureRequest?FW_Activity=FindLiteratureActivity&amp;FW_Event=getliterature&amp;vendorID="+formId;
if(entryPoint!=null )
{
url+="&amp;entryPoint="+entryPoint;
}
jsCBDopenStdWin(url, CBD_MODAL_POP, Y, Y, POPUP_SIZE8);
}
function jsCBDopenFormlitPopup(url, name)
{
var existingPopup=getModalPopup();
if(ie&&(existingPopup!=null)&&(typeof existingPopup!='undefined'))
{
jsCBDopenStdWin("", CBD_MODAL_POP, Y, Y, POPUP_SIZE12 );
existingPopup.close();
}
if(jsCBDisAdobeInstalled())
{
if(name==null)
{
jsCBDopenStdWin(url, CBD_MODAL_POP, Y, Y, POPUP_SIZE12 );
}
else
{
jsCBDopenStdWin(url, name, Y, Y, POPUP_SIZE12 );
}
}
else
{
url=jsCBDaddQueryStringParam(url, "acrobatNotInstalled", "true");
if(name==null)
{
jsCBDopenStdWin(url, CBD_MODAL_POP, N, N, POPUP_SIZE7 );
}
else
{
jsCBDopenStdWin(url, name, N, N, POPUP_SIZE7 );
}
}
}
function jsCBDopenFormlit(url)
{
if(!jsCBDisAdobeInstalled())
{
url=jsCBDaddQueryStringParam(url, "acrobatNotInstalled", "true");
}
jsCBDopenStdWin(url, CBD_MODAL_POP, Y, Y, POPUP_SIZE1, T );
}
var currSelection;
function selectRow(obj )
{
if(currSelection!=null&&currSelection!=obj )
{
selectRow(currSelection );
}
if(obj.selected==T  )
{
setBgc(obj, obj.oldColor );
obj.selected=F;
currSelection=null;
}
else
{
obj.oldColor=getBgc(obj );
setBgc(obj, "#99CCFF");
obj.selected=T;
currSelection=obj;
}
}
function setBgc(obj, color )
{
if(ie )
{
obj.style.backgroundColor=color;
}
else
{
obj.bgColor=color;
}
}
function getBgc(obj )
{
return(ie?obj.style.backgroundColor:obj.bgColor );
}
function onEmafLoad()
{
if(self.opener&&urlParent==null)
urlParent=String(self.opener.location);
}
function getURL(urlCurrent)
{
var strTemp;
var index;
var indexext;
indexext=0;
index=urlCurrent.indexOf('?');
if(index > 0)
urlCurrent=urlCurrent.substr(0,index);
index=urlCurrent.indexOf('#');
if(index > 0)
urlCurrent=urlCurrent.substr(0,index);
if(urlCurrent.substr(0,5)=='https')
{
index=urlCurrent.indexOf('S.h');
if(index <=0)
index=urlCurrent.indexOf('S.H');
if(index <=0)
{
index=urlCurrent.indexOf('$');
if(index <=0)
index=urlCurrent.length;
else indexext=index;
}
else
{
index=index+1;
indexext=index;
}
strTemp=urlCurrent.substr(0,index);
if(index > 3&&strTemp.substr(index-3,3)=="Sec")
index=index-2;
if(strTemp.charAt(index-1)=='S')
{
strTemp=strTemp.substr(0,index-1);
if(indexext>0)
strTemp=strTemp.substr(0,index-1);
if(indexext>0)
urlCurrent=strTemp+urlCurrent.substr(indexext);
else urlCurrent=strTemp;
urlCurrent='http'+urlCurrent.substr(5);
}
}
return jsCBDstripServerName(urlCurrent);
}
function onEmafSend()
{
var titleCurrent;
var urlPopup=null;
var urlCurrent;
var str;
var height;
var width;
var hostapp=jsCBDconcatUrl(jsCBDgetContextRoot()+"EmailAFriend");
titleCurrent=document.title;
urlCurrent=getURL(String(self.location));
if(urlParent!=null)
urlParent=getURL(urlParent);
if(urlParent==null)
urlParent=urlCurrent;
str="?parent="+urlParent;
if(emafParms.length > 0)
{
str+="&emafParms="+emafParms;
}
if(urlParent!=urlCurrent)
{
urlPopup=urlCurrent;
if(urlPopup.length > 0)
{
if(ie)
{
width=document.body.offsetWidth;
height=document.body.offsetHeight;
}
else
{
width=window.innerWidth;
height=window.innerHeight;
}
str+="&popup="+urlPopup+"&width="+width+"&height="+height+"&scroll="+hasScrollbar();
}
}
titleCurrent=escape(titleCurrent);
if(titleCurrent.length > 0)
str+='&titleCurrent='+titleCurrent;
jsCBDopenStdWin(hostapp+str,CBD_MODAL_POP,Y,Y,POPUP_SIZE7);
return F;
}
function hasScrollbar()
{
if(ie)
{
if(document.body.scroll==N)
return N;
else return Y;
}
else
{
if(document.height > window.innerHeight||document.width > window.innerWidth)
return Y;
else return N;
}
}
function onOptIn()
{
jsCBDgoToUrl("/web/siteservices/NewsViewsSubscribeEDelivery.html" );
return F;
}
function getCopyYear()
{
var currentYear=new Date().getFullYear();
document.write(currentYear);
}
function jsCBDresizeTo(size, toolbar, extendHeight )
{
size=jsCBDValidatePopupSize(size);
var width=stdWinDim[size];
var height=stdWinDim[size+1];
if(!nav4 )
{
width+=12;
height+=29+jsCBDgetToolbarHeight(toolbar );
}
height+=jsCBDgetPopupExtraHeight(extendHeight );
var winl=0;
var wint=0;
if(size!=POPUP_SIZE1 )
{
var toolbarHeight=0;
if(nav4 )
{
toolbarHeight=jsCBDgetToolbarHeight(toolbar );
}
winl=(screen.width - width)/2;
wint=(screen.height - height - toolbarHeight )/2;
}
window.resizeTo(width, height);
window.moveTo(winl, wint );
}
function jsCBDcloseModalPop()
{
jsCBDclosePopup(F, F );
}
function jsCBDcloseAllModalPop()
{
var parent=jsCBDgetFirstPopup().opener;
jsCBDclosePopup(T, F );
return parent;
}
function jsCBDstartTrans(url)
{
url=jsCBDaddQueryStringParam(url, CBD_INIT_TRANS_URL, escape(window.location.href));
jsCBDgoToUrl(url,null);
}
function jsCBDgetElement(formName, fieldName )
{
if(nav4||ie4)
{
var formObj;
var count=document.forms.length;
for(var i=0;i<count;i++)
{
if(document.forms[i].name==formName)
{
formObj=document.forms[i];
}
}
if(fieldName==null )
{
return formObj;
}
count=formObj.elements.length;
for(var i=0;i < count;i++)
{
if(formObj.elements[i].name==fieldName)
{
return formObj.elements[i];
}
}
}
else
{
return document.getElementById(fieldName!=null?fieldName:formName );
}
return null;
}
function jsQUOTickerSearch(formName, displayInPopup, target)
{
var labelClass="form-labels";
var formObj=jsCBDgetElement(formName);
var str=formObj.ticker.value;
str=escape(str);
var URL=isEmpty(target)?"FundsTickerSearch":target;
URL=jsCBDgetContextRoot()+URL+"?tosearch="+str+"&formName="+formName+"&textFieldName=ticker";
if(formObj.AppTab!=null )
URL=URL+"&AppTab="+formObj.AppTab.value;
if(displayInPopup!=null&&displayInPopup==T)
{
jsCBDopenStdWin(URL,CBD_MODAL_POP,N,Y,POPUP_SIZE1,false,true);
}
else
{
jsCBDgoToUrl(URL );
}
if(!nav4&&!ie4 )
{
document.getElementById("searchlabel").className=labelClass;
}
}
function jsQUOTickerSearchBySearchType(formName, userSelection)
{
var formObj=jsCBDgetElement(formName );
var str=formObj.ticker.value;
str=escape(str);
var URL=jsCBDgetContextRoot()+"FundsTickerSearch?tosearch="+str+"&formName="+formName+"&textFieldName=ticker"+"&searchType="+userSelection;
if(formObj.AppTab!=null )
URL=URL+"&AppTab="+formObj.AppTab.value;
jsCBDgoToUrl(URL );
}
function jsQUOStockTickerSearch(formName, fieldName)
{
var str=jsCBDgetElement(formName,fieldName).value;
str=escape(str);
var URL=jsCBDgetContextRoot()+"FundsClosestMatch?FW_Event=find&form="+formName+"&location=-1&fieldbase="+fieldName+"&findTicker=yes&fromClosest=1&fromTradingPath=Stocks&tosearch="+str+"&errors=";
jsCBDopenStdWin(URL,CBD_MODAL_POP2,Y,Y,POPUP_SIZE4);
}
function jsCBDrewriteUrlsForGH()
{
var qstr=jsCBDgetGHqueryStr();
if(isEmpty(qstr))
{
return;
}
var links=document.getElementsByTagName("a");
for(i=0;i < links.length;++i)
{
with(links[i])
{
if(href.length > 0
&&href.charAt(href.length-1)!='#'&&
href.indexOf("void(") < 0&&
href.indexOf("javascript:") < 0)
{
href=jsCBDaddQueryStringParam(href, null, qstr);
}
}
}
var forms=document.getElementsByTagName("form");
for(i=0;i < forms.length;++i)
{
with(forms[i])
{
if(action.length > 0&&action.indexOf("javascript:") < 0)
{
action=jsCBDaddQueryStringParam(action, null, qstr);
}
}
}
}


if(!window.cbd )
{
cbd={};
}
scrollTop=0;
scrollLeft=0;
jsCBDloadContent=function(url, target, mode, callback, idPrefix, layerId, trailingSpan)
{
var caller=new Object();
caller.target=target;
caller.mode=mode;
caller.callback=callback;
caller.idPrefix=idPrefix;
caller.layerId=layerId;
caller.trailingSpan=trailingSpan;
return jsCBDgetContent(url, _cbdOnContentLoad, caller);
}
_cbdOnContentLoad=function(request, error, caller)
{
if(caller.aborted)
{
return;
}
var html;
var FORM_START="<form";
var FORM_END="</form>";
var target=caller.target;
if(error==null)
{
var response=jsCBDgetResponseText(request);
if(response.error==null)
{
html=response.text.replace(/^\s*/, "");
}
}
else
{
html='<span>'+error.errorMsg+'</span>';
}
var onLoadCallBackFunc=null;
if(caller.callback!=null)
{
onLoadCallBackFunc=function(){
caller.callback(request, error, caller)
}
}
jsCBDsetElementInnerHtml({target:target, html:html, onLoadCallback:onLoadCallBackFunc, idPrefix:caller.idPrefix});
}
_cbdLoadContentChunk=function(url, target, callback, always )
{
var containerNode=document.getElementById(target );
if(!containerNode||always)
{
if(!containerNode )
{
containerNode=document.createElement('div' );
containerNode.setAttribute('id', target );
document.getElementsByTagName('body' )[0].appendChild(containerNode );
document.getElementById('vg0' ).appendChild(containerNode );
}
var _loadChunkCallback=function()
{
_cbdLoadContentChunk.status[target]='done';
callback();
}
jsCBDloadContent(url, containerNode, 'replacechildren', _loadChunkCallback );
}
else if(_cbdLoadContentChunk.status[target]=='done' )
{
callback();
}
}
_cbdLoadContentChunk.status={};
jsCBDloadNavDeck=function(card, url)
{
var cardId=(typeof(card)=="string"?card:card.viewNode.getAttribute("id"));
url=jsCBDaddQueryStringParam(url, "CbdSpiTrans", "true");
url=jsCBDaddQueryStringParam(url, "CbdSpiFlow", "true");
url=jsCBDaddQueryStringParam(url, "cbdCompId", "TBD");
url=jsCBDaddQueryStringParam(url, "CbdSpiDeckId", cardId);
var caller=new Object;
caller.cardId=cardId;
cbd.Navigator.cardId=cardId;
var deckController=null;
var cardController=null;
if(vg.html.getElement(cardId))
{
cardController=vg.comp.getController(cardId);
}
if(cardController)
{
deckController=cardController.deckContr;
}
cbd.Navigator.deckId=deckController.viewNode.getAttribute('id');
caller.navDeckCardId=cardId;
_cbdRemoveProcNav(card);
if(deckController&&deckController.isAnimated)
{
caller.callback=
{
before:
function(){vg.html.setOpacity(document.getElementById(cardId), '0')},
after:
cbd.Navigator._processResponse
};
}
else
{
caller.callback=cbd.Navigator._processResponse;
}
jsCBDgetContent(url, _receiveCompResponse, caller);
}
_cbdRemoveProcNav=function(card)
{
var cardId=(typeof(card)=="string"?card:card.viewNode.getAttribute("id"));
var card=vg.html.getElement(cardId);
var deck=card.parentNode.parentNode;
var deckId=deck.getAttribute('id');
var isNavDeck=document.getElementById(deckId+"_navDeck")!=null;
var holder=_cbdGetProcNavHolder();
if(holder!=null&&!isNavDeck)
{
var procNav=vg.html.getFirstChild(holder);
if(procNav!=null)
{
holder.removeChild(procNav);
}
}
}
_cbdExtractScripts=function(html)
{
var htmlNoScripts="";
var scripts="";
var scriptTagStart=html.indexOf("<script");
var scriptStart;
var scriptEndTag;
var searchIndex=0;
while(scriptTagStart >=0)
{
scriptStart=html.indexOf(">", scriptTagStart)+1;
scriptEndTag=html.indexOf("</script", scriptStart);
scripts+=html.substring(scriptStart, scriptEndTag)+"\n";
htmlNoScripts+=html.substring(searchIndex, scriptTagStart);
searchIndex=html.indexOf(">", scriptEndTag)+1;
if(searchIndex < html.length&&html.charAt(searchIndex)=='\n')
{
++searchIndex;
}
scriptTagStart=html.indexOf("<script", searchIndex);
}
if(searchIndex < html.length)
{
htmlNoScripts+=html.substring(searchIndex);
}
var htmlArray=new Array();
htmlArray['html']=htmlNoScripts;
htmlArray['scripts']=scripts;
return htmlArray;
}
jsCBDkeepScrollPos=function()
{
_cbdRender.keepScrollPos=true;
}
_cbdProcessIds=function(element, idPfx)
{
if(!vg.html.isElement(element))
{
return;
}
idPfx+=':';
vg.html._idPrefixes.push(idPfx);
var elements=vg.html.getElements(element,{tagName:'*'}, function(element){return vg.html.isElement(element)});
if(elements==null)
{
elements=new Array();
}
elements.push(element);
var size=elements.length;
for(var i=0;i < size;i++)
{
var element=elements[i];
var id=element.getAttribute('id');
if(id!=null)
{
var newId;
if(id.substring(0,5)==vg.constants.COMP_ID_PFX)
{
newId=vg.constants.COMP_ID_PFX+idPfx+id.substring(5);
}
else
{
newId=idPfx+id;
}
elements[i].setAttribute('id', newId);
}
}
}
jsCBDprocessContentListeners=function()
{
if(vg.comp._isCompRegistered("contentObserver"))
{
listeners=vg.ContentObserverManager._getContentObservers();
vg.ContentObserverManager._cbdProcessContentObservers(listeners, false);
}
}
vg.ContentObserverManager={};
vg.ContentObserverManager._listOfContentObservers=[];
vg.ContentObserverManager._getContentObservers=function()
{
var ids=vg.ContentObserverManager._listOfContentObservers;
var retVal=[];
for(var i=0;i < ids.length;i++)
{
var id=ids[i];
var node=document.getElementById(id);
if(node)
{
retVal.push(node);
}
else
{
ids.splice(i,1);
i--;
}
}
return retVal;
}
vg.ContentObserverManager._addContentObserver=function(id)
{
var lisfOfContentObservers=vg.ContentObserverManager._listOfContentObservers;
for(var i=0;i < lisfOfContentObservers.length;i++)
{
if(lisfOfContentObservers[i]===id)
{
return;
}
}
lisfOfContentObservers.push(id);
}
vg.ContentObserverManager._cbdProcessContentObservers=function(listeners, isBackbaseListener)
{
var cursorArray=jsCBDgetAutoSuggestSelection();
for(var i=0;i < listeners.length;++i)
{
var listener=isBackbaseListener?listeners[i].viewNode:listeners[i];
var observedId=listener.getAttribute("observedId");
var observed=document.getElementById(observedId);
if(observed!=null)
{
listener.innerHTML=observed.innerHTML;
}
}
jsCBDsetAutoSuggestSelection(cursorArray);
}
jsCBDopenLayer=function(layerId, targetId, position, onOpen, contentURL, enableFullScreen)
{
vg.util.execOnPageReady(function(){_cbdOpenLayerFinish(layerId, targetId, position, onOpen, contentURL, enableFullScreen)});
}
_cbdOpenLayerFinish=function(layerId, targetId, position, onOpen, contentURL, enableFullScreen)
{
if(layerId.layerId!=null)
{
var params=layerId;
layerId=params.layerId;
targetId=params.targetId;
position=params.position;
onOpen=params.onOpen;
contentURL=params.contentURL;
enableFullScreen=params.enableFullScreen;
}
vg.comp._lazyLoadComp(layerId);
var controller=vg.comp.getController(layerId);
if(controller)
{
controller.targetId=targetId;
controller.enableFullScreen=enableFullScreen;
controller.targetPosition=position;
if(contentURL) controller.setContentURL(contentURL);
controller.open();
if(onOpen)
{
onOpen();
}
}
}
jsCBDisLayerOpen=function(id)
{
vg.comp._lazyLoadComp(id);
return vg.comp.getController(id).openFlag;
}
jsCBDscrollLayer=function(id, scrollTop, scrollLeft)
{
vg.comp._lazyLoadComp(id);
var layerScrollDiv=vg.html.getElements(document.getElementById(id),{tagName:'div', attrName:'class'},
function(div){
return(vg.html.hasStyle("roundBoxScrollDiv", div)||vg.html.hasStyle("scrollRegion", div))
})[0];
layerScrollDiv.scrollTop=scrollTop;
if(scrollLeft )
{
layerScrollDiv.scrollLeft=scrollLeft;
}
}
jsCBDSetLayerContent=function(layerId, html)
{
vg.comp._lazyLoadComp(layerId);
var target=document.getElementById(layerId);
vg.comp.destroy(target);
vg.comp.getContentNode(layerId ).innerHTML=html;
}
jsCBDcloseLayer=function(layerId)
{
vg.comp._lazyLoadComp(layerId);
var node=document.getElementById(layerId );
if(node&&node.jsController )
{
node.jsController.close();
}
else
{
vg.Layer._toggleLayer(false, layerId);
}
}
jsCBDScrollLayerToTop=function(layerId)
{
"use strict";
var scrollDiv,
firstChild,
scrollConfig;
vg.comp._lazyLoadComp(layerId);
scrollDiv=vg.comp.getController(layerId ).scrollDiv;
if(scrollDiv)
{
firstChild=vg.html.getFirstChild(scrollDiv);
if(vg.touchScreen._isCustomScrollContainer(firstChild))
{
scrollConfig={"targetYPos":0, "scrollContainer":firstChild};
vg.touchScreen.customScrollY.customScrollMove(scrollConfig);
}
else
{
scrollDiv.scrollTop=0;
}
}
}
jsCBDcloseParentLayer=function(context)
{
var node=vg.html.findParentComponent(context,vg.Layer );
if(node )
{
jsCBDcloseLayer(node.getAttribute('id' ) );
}
return node!=null;
}
jsCBDGetLayerContentUrl=function(layerId)
{
vg.comp._lazyLoadComp(layerId);
var node=document.getElementById(layerId );
return node.jsController.contentURL;
}
jsCBDSetLayerContentUrl=function(layerId, url)
{
vg.comp._lazyLoadComp(layerId);
vg.comp.getController(layerId ).setContentURL(url);
}
jsCBDclearLayer=function(layerId)
{
jsCBDSetLayerContent(layerId, '<span></span>');
}
jsCBDSetLayerContentById=function(layerId, contentId)
{
var content=jsCBDexecXpath(_getIdXpath(contentId)+"/*");
if(content!=null)
{
var scrollArea=_cbdGetContentArea(jsCBDgetControllerById(layerId) );
bb.command.copy(content, scrollArea, 'replaceChildren');
}
}
jsCBDloadLayerContent=function(layerId )
{
vg.comp._lazyLoadComp(layerId);
var controller=vg.comp.getController(layerId );
controller.loadContent();
}
jsCBDrepositionLayer=function(layerId, targetId, position )
{
vg.comp._lazyLoadComp(layerId);
var controller=vg.comp.getController(layerId);
controller.targetId=targetId;
controller.targetPosition=position;
controller.reposition();
}
jsCBDPrintLayer=function(button, suppressTitle, moveContent)
{
var layer,
mainDiv,
layerDiv,
footDiv,
parentToMain,
newDiv,
scrollPos=0,
cbdPrint=cbd.print;
moveContent=moveContent&&window.isNextGen;
if(vg.html.getElement("printLayerDiv")!=null)
{
vg.Layer._clearPrintDiv();
}
layer=vg.html.findParentComponent(button,vg.Layer );
cbdPrint._setInputPrintValues(layer, false);
mainDiv=document.getElementById("main");
layerDiv=document.getElementById("layer");
footDiv=vg.html.getElements(mainDiv,{tagName:'div'}, function(node){return vg.html.hasStyle("gblFoot", node);})[0];
mainDiv.setAttribute("class","printLayer");
layerDiv.setAttribute("class","printLayer");
parentToMain=mainDiv.parentNode;
newDiv=document.createElement("div");
newDiv.setAttribute("id","printLayerDiv");
newDiv.style.cssText=cbd.print._getPrintAreaStyleAttr(layer,true);
if(moveContent)
{
vg.Layer._moveToPrintRegion(layer,!suppressTitle, newDiv);
}
else
{
newDiv.innerHTML=vg.Layer.getPrintRegion(layer,!suppressTitle).innerHTML;
}
cbdPrint._setInputPrintValues(newDiv, true);
if(footDiv!=null&&!window.isNextGen)
{
newFootDiv=footDiv.cloneNode(true);
newDiv.appendChild(newFootDiv);
}
newDiv=_captureCanvasForPrint(newDiv);
if(cbd.browser.isWebkit)
{
scrollPos=document.body.scrollTop;
}
parentToMain.insertBefore(newDiv, mainDiv);
window.print();
if(cbd.browser.isWebkit)
{
document.body.scrollTop=scrollPos;
}
if(moveContent)
{
vg.Layer._clearPrintDiv(layer.id);
}
else
{
setTimeout(vg.Layer._clearPrintDiv, 5000);
}
};
jsCBDopenAndPositionLayer=function(layerId, eventObj, autoX, shadow, fixedBottom)
{
jsCBDopenLayer(layerId, eventObj, fixedBottom?'fixedbottom':'auto' );
}
jsCBDchangeLayerType=function(id,rdtype,height,width,close,drag,openClose)
{
if(window.isNextGen) return;
if(id.id)
{
params=id;
id=params.id;
rdtype=params.rdtype;
height=params.height;
width=params.width;
close=params.close;
drag=params.drag;
openClose=params.openClose;
}
vg.comp._lazyLoadComp(id);
var layer=(typeof(id )=='string' )?document.getElementById(id):id;
var layerController=vg.comp.getController(layer);
var table=vg.html.getFirstChild(layer);
var trs=layer.getElementsByTagName('tr');
var tds=layer.getElementsByTagName('td');
var closeDiv=tds[2].getElementsByTagName('div')[0];
var dragDiv=tds[2].getElementsByTagName('div')[1];
var trTypes=new Array('topRow','ctrRow','botRow');
var tdTypes=new Array('topLft','errCol','topMid','topRgt','ctrLft','ctrMid','ctrRgt','botLft','botMid','botRgt');
if(height!=null)
{
layerController.setHeightAttribute(height);
}
if(width!=null)
{
layerController.setWidthAttribute(width);
}
if(height||width)
{
layerController.resize();
layerController.reposition();
}
if(close!=null)
{
(close)?vg.html.replaceClass(closeDiv,closeDiv.className,"close"):vg.html.replaceClass(closeDiv,closeDiv.className,"noClose")
}
if(drag!=null)
{
(drag)?vg.html.replaceClass(dragDiv,dragDiv.className,"drag"):vg.html.replaceClass(dragDiv,dragDiv.className,"noDrag")
}
table.className=table.className.replace(/\brd([0-9]|[a-z]|[A-Z])+/,rdtype);
vg.html.replaceClass(trs[0], trs[0].className, rdtype+trTypes[0]);
vg.html.replaceClass(trs[1], trs[1].className, rdtype+trTypes[1]);
vg.html.replaceClass(trs[trs.length-1], trs[trs.length-1].className, rdtype+trTypes[2]);
rdtype="vgLayerRoundBoxCell "+rdtype;
vg.html.setStyle((tds[0].className.indexOf('sqd') >=0?rdtype+'sqd'+tdTypes[0]:rdtype+tdTypes[0]), tds[0]);
vg.html.setStyle("vgLayerRoundBoxCell "+tdTypes[1], tds[1]);
vg.html.setStyle(rdtype+tdTypes[2], tds[2]);
vg.html.setStyle((tds[3].className.indexOf('sqd') >=0?rdtype+'sqd'+tdTypes[3]:rdtype+tdTypes[3]), tds[3]);
vg.html.setStyle(rdtype+tdTypes[4], tds[4]);
vg.html.setStyle(rdtype+tdTypes[5], tds[5]);
vg.html.setStyle(rdtype+tdTypes[6], tds[tds.length-4]);
vg.html.setStyle(tds[tds.length-3].className.indexOf('sqd') >=0?rdtype+'sqd'+tdTypes[7]:rdtype+tdTypes[7], tds[tds.length-3]);
vg.html.setStyle(rdtype+tdTypes[8], tds[tds.length-2]);
vg.html.setStyle(tds[tds.length-1].className.indexOf('sqd') >=0?rdtype+'sqd'+tdTypes[9]:rdtype+tdTypes[9], tds[tds.length-1]);
}
_cbdClosePrevSelectOneMenu=function()
{
if(window.SelectOneMenu )
{
SelectOneMenu._closePrevMenu();
}
}
_cbdClosePrevAutoSuggest=function()
{
if(_cbdSelectedAutoSuggest&&!_cbdSelectedAutoSuggest.disablePositioning )
{
_cbdSelectedAutoSuggest.hideSuggestions();
}
}
jsCBDcloseSelectOneMenu=function(e)
{
if(vg.comp.isCompLoaded('SelectOneMenu' ) )
{
var selectedPulldownId=SelectOneMenu.selectedPulldownId;
if(e.type=='scroll'&&selectedPulldownId!=null)
{
if(!cbd.browser.isTouchScreen)
{
_cbdClosePrevSelectOneMenu();
}
}
else
{
var eNode=jsCBDgetEventNode(e);
if(selectedPulldownId!=null&&eNode!=null)
{
if(eNode.getAttribute!=null)
{
var clickedOnMenu=eNode.getAttribute('id')&&eNode.getAttribute('id')=='menu-'+selectedPulldownId;
var clickedInsideInput=vg.html.findAncestor(eNode,{tagName:'span', attrName:'id', attrValue:selectedPulldownId})!=null;
var clickedInsideMenu=vg.html.findAncestor(eNode,{tagName:'div', attrName:'id', attrValue:'menu-'+selectedPulldownId})!=null;
if(!clickedInsideInput&&!clickedInsideMenu&&!clickedOnMenu)
{
_cbdClosePrevSelectOneMenu();
}
}
else
{
_cbdClosePrevSelectOneMenu();
}
}
}
}
}
cbd.DeckPlayer=function(viewNodeId, linkControlsId, autoplay, loopOnce, timeout, counter, hideNextLabel, onCardChange)
{
if(window.isNextGen )
{
this.base=vg.Controller;
this.base(viewNodeId, null );
}
this.deckPlayerCont;
this.viewNodeId=viewNodeId;
this.linkControls=document.getElementById(linkControlsId);
this.autoplay=autoplay;
this.firstTd=null;
this.lastTd=null;
this.currentTd=null;
this.targetTd=null;
this.playORpauseLink=null;
this.playORpauseTd=null;
this.deck=null;
this.nextDescTd=null;
this.contentControls=false;
this.init("deckPlayer");
this.loopOnce=loopOnce;
this.timeout=timeout;
this.counter=counter;
this.hideNextLabel=hideNextLabel;
this.onCardChange=onCardChange;
this._setWasPausedBeforeHover(!autoplay);
this.play();
}
cbd.DeckPlayer.prototype=
{
timerId:null,
playerName:"",
FORWARD:"forward",
REWIND:"rewind",
PLAY:"play",
PAUSE:"pause",
PLAYER_CONTROLLER_STYLE:"deckPlayerController",
SELECTED_STYLE:"roDeck-sel",
LINK_CONTROLS_STYLE:"linkControls",
CONTENT_CONTROLS_STYLE:"contentControls",
CAROUSEL_DISABLED_STYLE:"disabled",
isAutoplay:function(){return this.autoplay},
turnOffAutoplay:function(){this.autoplay=false},
turnOnAutoplay:function(){this.autoplay=true},
init:function(playerName)
{
var allTds=vg.html.getElements(this.linkControls,{tagName:'td', attrName:'class', attrValue:this.LINK_CONTROLS_STYLE});
if(allTds.length==0)
{
allTds=vg.html.getElements(this.linkControls,{tagName:'td', attrName:'class', attrValue:this.CONTENT_CONTROLS_STYLE});
if(allTds.length > 0)
{
this.contentControls=true;
}
}
var noOfTds=allTds.length;
this.firstTd=allTds[0];
this.currentTd=this.firstTd;
this.lastTd=allTds[noOfTds-1];
if(window.isNextGen )
{
this.isCarousel=this.viewNode.getAttribute('type')=='carousel';
this.deckPlayerCont=document.getElementById(this.viewNodeId+"_dpContainer");
var outerDescrTable=vg.html.findAncestor(this.deckPlayerCont,{tagName:'div', attrName:'class', attrValue:'deckPlayer'});
this.deck=vg.html.getElements(outerDescrTable,{tagName:'div', attrName:'selectedCardIdx'})[0];
this.deckPlayerCont=document.getElementById(this.viewNodeId+"_dpContainer");
if(cbd.browser.isTouchScreen&&vg.html.isFixedHeight(this.deckPlayerCont))
{
this._updateScrollingProperties();
vg.html.addEventListenerMethod(this.viewNode, vg.event.DOM_CHANGE, this, '_updateScrollingProperties' );
}
this.currentTd=allTds[this.deck.getAttribute('selectedcardidx')];
}
else
{
var deckPlayerControllerTable=vg.html.findAncestor(this.linkControls,{tagName:'table'});
var outerDescrTable=vg.html.findAncestor(deckPlayerControllerTable,{tagName:'table'});
var roundBoxTable=vg.html.findAncestor(outerDescrTable,{tagName:'table'});
var deckTable=vg.html.getSibling(roundBoxTable,{tagName:'table'}, '-');
this.deck=vg.html.getElements(deckTable,{tagName:'div', attrName:'selectedCardIdx'})[0];
this.counterSpan=document.getElementById(this.deck.id+'_counter');
this.totalCountSpan=document.getElementById(this.deck.id+'_totalCount');
var tdsWithPlayerCntrlStyle=vg.html.getElements(outerDescrTable,
{tagName:'td', attrName:'class', attrValue:this.PLAYER_CONTROLLER_STYLE},
function(node){return node.id.indexOf("nextCardDesc") > 0});
if(tdsWithPlayerCntrlStyle.length > 0)
{
this.nextDescTd=tdsWithPlayerCntrlStyle[0];
}
}
this.deckController=vg.comp.getController(this.deck);
this.playORpauseLink=vg.html.getElements(outerDescrTable,{tagName:'a', attrName:'class', attrValue:"play"})[0];
if(this.playORpauseLink==null)
{
this.playORpauseLink=vg.html.getElements(outerDescrTable,{tagName:'a', attrName:'class', attrValue:"pause"})[0];
}
if(this.playORpauseLink!=null)
{
this.playORpauseTd=this.playORpauseLink.parentNode;
}
this.playerName=playerName;
if(window.isNextGen&&this.isCarousel)
{
this._initCarousel();
}
},
_initCarousel:function()
{
this.dcItemsLength=this.deckController.items.length-1;
this.minPos=0;
this.maxPos=-100*this.dcItemsLength;
this.minSlidePos=6;
this.maxSlidePos=-100*this.dcItemsLength - this.minSlidePos;
this.directionIsLeft=true;
this.animationVelocity=1500;
if(this.linkControls)
{
this.linkControlCarLft=vg.html.getElements(this.linkControls,{tagName:'a', attrName:'class', attrValue:"carLftCont"})[0];
this.linkControlCarRgt=vg.html.getElements(this.linkControls,{tagName:'a', attrName:'class', attrValue:"carRgtCont"})[0];
}
this.smallCarouselControls=document.getElementById(this.viewNodeId+"_smlCarControls");
if(this.smallCarouselControls)
{
this.smallControlCarLft=vg.html.getElements(this.smallCarouselControls,{tagName:'a', attrName:'class', attrValue:"carLftCont"})[0];
this.smallControlCarRgt=vg.html.getElements(this.smallCarouselControls,{tagName:'a', attrName:'class', attrValue:"carRgtCont"})[0];
}
if(this.deckController.horizSlide)
{
var THIS=this;
vg.html.addEventListener(this.deckController.slider, vg.event.GSTR_DRAG_START, function(event){THIS._horizSlideTouchStart(event)}, "_horizSlideTouchStart");
vg.html.addEventListener(this.deckController.slider, vg.event.GSTR_DRAG_END,   function(event){THIS._horizSlideTouchEnd(event)},  "_horizSlideTouchEnd");
}
this._configCarouselControls();
},
_horizSlideTouchStart:function(event)
{
this.touchstartX=vg.event.getPosition(event).x;
this.touchstartY=vg.event.getPosition(event).y;
this.cardOffset=parseInt(this.deckController.slider.style.left.toString().replace("%",""), 10);
this.dcWidth=vg.html.getObjWidth(this.deckController.viewNode);
this.deckController.items[this.deckController.selectedIndex].horizSlideAnim.stop();
var THIS=this;
vg.html.addEventListener(this.deckController.slider, vg.event.GSTR_MOVE, function(event){THIS._horizSlideTouchMove(event);},  "_horizSlideTouchMove");
},
_horizSlideTouchEnd:function(event)
{
vg.html.removeEventListenerById(this.deckController.slider, "_horizSlideTouchMove");
var	end=vg.event.getPosition(event).x,
dist=end - this.touchstartX,
direction=(this.directionIsLeft)?NEXT:PREV,
currentPos=vg.event.getPosition(event).x,
newPos=this.cardOffset+(currentPos - this.touchstartX)/this.dcWidth*100,
doNotGotoCard=(this.deckController._isFirstCard()&&direction===PREV)||(this.deckController._isLastCard()&&direction===NEXT);
if(newPos >=this.minPos||newPos <=this.maxPos)
{
this._horizSlideTouchReturnFirstLastCard(currentPos,newPos);
}
else if(!doNotGotoCard&&Math.abs(dist) > 15&&this.horizontalSlide)
{
jsCBDselectDeckPlayerCard(direction, this.viewNodeId, true);
}
else
{
this.deckController.slider.style.left=this.deckController.selectedIndex*-100+"%";
}
},
_horizSlideTouchMove:function(event)
{
var currentPosX=vg.event.getPosition(event).x,
currentPosY=vg.event.getPosition(event).y,
distanceX=Math.abs(currentPosX - this.touchstartX),
distanceY=Math.abs(currentPosY - this.touchstartY),
newPos=this.cardOffset+(currentPosX - this.touchstartX)/this.dcWidth*100,
gestureThreshold=15;
if(distanceX < gestureThreshold||distanceY < gestureThreshold)
{
this.horizontalSlide=distanceX > distanceY;
}
if(this.horizontalSlide)
{
vg.html.preventDefault(event);
this.pause();
this._setWasPausedBeforeHover(true);
if(newPos <=this.minSlidePos&&newPos >=this.maxSlidePos)
{
this.directionIsLeft=currentPosX < this.prevCurrentPosX;
this.prevCurrentPosX=currentPosX;
this.deckController.slider.style.left=newPos+"%";
}
}
},
_horizSlideTouchReturnFirstLastCard:function(currentPos,newPos)
{
var	leftend=this.deckController.selectedIndex==0,
toPos=(leftend)?this.minPos:this.maxPos,
attributes={left:{from:currentPos, to:toPos, unit:"%"}};
vg.smil.animateElement({target:this.deckController.slider, attr:attributes, duration:".25", easing:this.deckController.easing});
},
play:function()
{
if(this.isAutoplay()==false ){return;}
if(this.targetTd==null){this.pointTargetTd(this.FORWARD);}
else{this.playTargetTd(this.FORWARD);}
this._nextCardOnTimeout();
},
_nextCardOnTimeout:function()
{
if(this.targetTd!=null){
if(this.timerId!=null)
{
clearTimeout(this.timerId);
}
var THIS=this;
this.timerId=setTimeout(function(){THIS.play()}, this.timeout);
}
},
pointTargetTd:function(direction)
{
var tdClass=this.contentControls?this.CONTENT_CONTROLS_STYLE:this.LINK_CONTROLS_STYLE;
if(this.FORWARD==direction)
{
this.targetTd=vg.html.getSibling(this.currentTd,{tagName:'td', attrName:'class', attrValue:tdClass}, '+');
if(this.targetTd==null)
{
this.targetTd=this.firstTd;
if(this.loopOnce)
{
this.turnOffAutoplay();
this.switchDisplayToPlay();
}
}
}
else if(this.REWIND==direction)
{
this.targetTd=vg.html.getSibling(this.currentTd,{tagName:'td', attrName:'class', attrValue:tdClass}, '-');
if(this.targetTd==null){this.targetTd=this.lastTd;}
}
},
playTargetTd:function(direction)
{
this.pointTargetTd(direction);
var currlink=vg.html.getElements(this.targetTd,{tagName:'div'})[0];
this.selectLinkControl(currlink);
this.currentTd=this.targetTd;
},
resetToSelectedTd:function(td)
{
this.currentTd=td;
this.targetTd=td;
},
rewind:function()
{
if(this.isAutoplay()==true)
{
this.pause();
}
this.turnOffAutoplay();
this.playTargetTd(this.REWIND);
},
forward:function()
{
if(this.isAutoplay()==true)
{
this.pause();
}
this.turnOffAutoplay();
this.playTargetTd(this.FORWARD);
},
pause:function()
{
if(this.isAutoplay()==true){
this.switchDisplayToPlay();
if(this.timerId!=null){clearTimeout(this.timerId);}
this.turnOffAutoplay();
}
},
resumePlay:function()
{
if(this.isAutoplay()==false){
this._setWasPausedBeforeHover(false);
this._prepareToPlay();
this.play();
}
},
_prepareToPlay:function()
{
this.switchDisplayToPause();
this.turnOnAutoplay();
},
switchDisplayToPlay:function()
{
if(this.playORpauseLink==null){return;}
this.playORpauseLink.className=this.PLAY;
this.playORpauseLink.setAttribute('title', 'Play');
var THIS=this;
this.playORpauseTd.onclick=function(){THIS.resumePlay()};
},
switchDisplayToPause:function()
{
if(this.playORpauseLink==null){return;}
this.playORpauseLink.className=this.PAUSE;
this.playORpauseLink.setAttribute('title', 'Pause');
var THIS=this;
this.playORpauseTd.onclick=function(){THIS.pause()};
},
selectCard:function(cardIdx, wasSwiped)
{
var isCarouselNextOrPrev=this.isCarousel&&(cardIdx==NEXT||cardIdx==PREV),
controlLinkItem;
jsCBDselectDeckCard(this.deck.id, cardIdx, null, wasSwiped);
if(isCarouselNextOrPrev)
{
this.turnOffAutoplay();
controlLinkItem=document.getElementById(this.deckController.id+":linkControl_"+this.deckController.selectedIndex);
if(controlLinkItem)
{
this.selectLinkControl(controlLinkItem);
}
this._configCarouselControls();
}
else if(this.onCardChange)
{
this.onCardChange.call(window, cardIdx,!this.isAutoplay());
}
},
selectLinkControl:function(linkControl)
{
var parentRow=vg.html.findAncestor(linkControl,{tagName:'tr'});
var selectedDiv=vg.html.getElements(parentRow,{tagName:'div', attrName:'class', attrValue:this.SELECTED_STYLE})[0];
vg.html.removeStyle(this.SELECTED_STYLE, selectedDiv);
vg.html.addStyle(this.SELECTED_STYLE, linkControl);
eval(linkControl.getAttribute("clickTarget"));
if(!window.isNextGen )
{
this.counterSpan.innerHTML=this.deckController.selectedIndex+1;
}
if(this.isCarousel)
{
this._configCarouselControls();
}
},
displayNextCardDesc:function()
{
var nextCardIdx=jsCBDgetSelectedDeckCardIndex(this.deck.id)+1;
var allCards=vg.comp.getController(this.deck).items;
var numCards=allCards.length;
if(nextCardIdx >=numCards)
{
nextCardIdx=0;
}
var nextCard=allCards[nextCardIdx];
var desc=nextCard.viewNode.getAttribute("desc");
this.hideNextLabel?this.nextDescTd.innerHTML="":this.nextDescTd.innerHTML="<b>Next:&#160;</b>"
this.nextDescTd.innerHTML+=desc;
},
linkControlClick:function(linkControl)
{
'use strict';
if(!cbd.page.isResponsiveCapable||cbdcommon.screen.isMediaQuerySizeLarge())
{
if(this.isAutoplay()===true)
{
this.pause();
}
this.resetToSelectedTd(vg.html.findAncestor(linkControl,{tagName:'td'}));
this.selectLinkControl(linkControl);
}
},
_wasPausedBeforeHover:function()
{
return this.pausedBeforeHover;
},
_setWasPausedBeforeHover:function(flag)
{
this.pausedBeforeHover=flag;
},
_destroy:function()
{
clearTimeout(this.timerId);
},
_updateScrollingProperties:function()
{
if(cbd.browser.isTouchScreen&&window.isNextGen&&vg.html.isFixedHeight(this.deckPlayerCont))
{
vg.touchScreen._makeNodeScrollable(this.deckPlayerCont.getAttribute("id"));
}
},
_configCarouselControls:function()
{
if(this.deckController.selectedIndex==0||this.deckController.selectedIndex==this.deckController.items.length-1)
{
this._disableCarouselControls();
}
else
{
this._enableCarouselControls();
}
},
_disableCarouselControls:function()
{
this._enableCarouselControls();
var cIndex=this.deckController.selectedIndex;
var cDeckItemLength=this.deckController.items.length-1;
var disabledStyle=this.CAROUSEL_DISABLED_STYLE;
if(this.linkControls)
{
if(cIndex==0)
{
vg.html.addStyle(disabledStyle, this.linkControlCarLft );
jsCBDtoggleLink(this.linkControlCarLft,false,disabledStyle);
}
if(cIndex==cDeckItemLength)
{
vg.html.addStyle(disabledStyle, this.linkControlCarRgt );
jsCBDtoggleLink(this.linkControlCarRgt,false,disabledStyle);
}
}
if(this.smallCarouselControls)
{
if(cIndex==0)
{
vg.html.addStyle(disabledStyle, this.smallControlCarLft );
jsCBDtoggleLink(this.smallControlCarLft,false,disabledStyle);
}
if(cIndex==cDeckItemLength)
{
vg.html.addStyle(disabledStyle, this.smallControlCarRgt );
jsCBDtoggleLink(this.smallControlCarRgt,false,disabledStyle);
}
}
},
_enableCarouselControls:function()
{
var disabledStyle=this.CAROUSEL_DISABLED_STYLE;
if(this.deckController.selectedIndex!=0||this.deckController.selectedIndex!=this.deckController.items.length-1)
{
if(this.linkControls)
{
vg.html.removeStyle(disabledStyle, this.linkControlCarLft );
vg.html.removeStyle(disabledStyle, this.linkControlCarRgt );
jsCBDtoggleLink(this.linkControlCarLft,true,disabledStyle);
jsCBDtoggleLink(this.linkControlCarRgt,true,disabledStyle);
}
if(this.smallCarouselControls)
{
vg.html.removeStyle(disabledStyle, this.smallControlCarLft );
vg.html.removeStyle(disabledStyle, this.smallControlCarRgt );
jsCBDtoggleLink(this.smallControlCarLft,true,disabledStyle);
jsCBDtoggleLink(this.smallControlCarRgt,true,disabledStyle);
}
}
}
};
jsCBDrewindDeckPlayer=function(playerId)
{
var deckPlayer=jsCBDgetDeckPlayer(playerId);
if(!deckPlayer)
return;
deckPlayer.rewind();
}
jsCBDforwardDeckPlayer=function(playerId)
{
var deckPlayer=jsCBDgetDeckPlayer(playerId);
if(!deckPlayer)
return;
deckPlayer.forward();
}
jsCBDpauseDeckPlayer=function(playerId)
{
var deckPlayer=jsCBDgetDeckPlayer(playerId);
if(!deckPlayer)
return;
deckPlayer.pause();
}
jsCBDresumePlayDeckPlayer=function(playerId)
{
var deckPlayer=jsCBDgetDeckPlayer(playerId);
if(!deckPlayer)
return;
deckPlayer.resumePlay();
}
jsCBDstartReadingDeckPlayerCard=function(playerId)
{
var deckPlayer=jsCBDgetDeckPlayer(playerId);
if(!deckPlayer)
return;
if(deckPlayer.isAutoplay()==false )
{
deckPlayer._setWasPausedBeforeHover(true);
}
deckPlayer.pause();
}
jsCBDstopReadingDeckPlayerCard=function(playerId)
{
var deckPlayer=jsCBDgetDeckPlayer(playerId);
if(!deckPlayer)
return;
if(deckPlayer._wasPausedBeforeHover()==false&&deckPlayer.isAutoplay()==false)
{
deckPlayer._prepareToPlay();
deckPlayer._nextCardOnTimeout();
}
}
jsCBDselectDeckPlayerCard=function(cardIdx, playerId, wasSwiped)
{
var deckPlayer=jsCBDgetDeckPlayer(playerId);
if(!deckPlayer)
return;
deckPlayer.selectCard(cardIdx, wasSwiped);
}
jsCBDdisplayDeckPlayerNextCardDesc=function()
{
if(!window.deckPlayer )
return;
deckPlayer.displayNextCardDesc();
}
jsCBDgetDeckPlayer=function(playerId)
{
var deckPlayer=vg.comp.getController(playerId);
if(!deckPlayer)
{
deckPlayer=window.deckPlayer;
}
return deckPlayer;
}
jsCBDtoggleExpandableRows=function(tableId, state)
{
var table=document.getElementById(tableId);
var expandImgs=vg.html.getElements(table,{tagName:'img', attrName:'expanded'});
for(var i=0;i < expandImgs.length;i++)
{
vg.expRow._toggleExpandableRow(expandImgs[i], state);
}
}
ListGridRowDesc=function(attention)
{
this.attention=attention;
}
jsCBDpreventSelectListBleedThru=function(visibility)
{
if(ie6_proper)
{
var selectLists=document.getElementsByTagName("select");
for(var i=0;i < selectLists.length;i++)
{
var listId=selectLists[i].id;
var currState=(document.getElementById(listId).style.visibility=="visible");
if(visibility!=currState)
{
jsCBDtoggleVisibility(document.getElementById(listId),visibility);
}
}
}
}
_cbdPreventBleedThru=function(listId, visibility, menuState){
var element=document.getElementById(listId);
if(element!=null)
{
var currState=(element.style.visibility=="visible");
if(menuState!==undefined||menuState!=null)
{
jsCBDsetVisibility(listId,menuState);
}
else
{
if(currState!=visibility)
{
jsCBDsetVisibility(listId,visibility);
}
}
}
}
jsCBDpreventSelectListBleedThruById=function(listId, sourceList, selectedList, visibility, menuState, neither)
{
if(ie6_proper)
{
if(sourceList==null)
sourceList=false;
if(selectedList==null)
selectedList=false;
if(neither==null)
neither=false;
if(sourceList)
{
_cbdPreventBleedThru(listId+"SourceList",menuState, visibility);
}
if(selectedList)
{
_cbdPreventBleedThru(listId+"SelectedList",menuState, visibility);
}
if(neither)
{
_cbdPreventBleedThru(listId,menuState, visibility);
}
}
}
jsCBDselectTabBoxItem=function(tabItemId, async, immediateStateKeeper, index, tab, showLoadingIndicator)
{
var tabBoxIdStr=tabItemId.substring(0, tabItemId.lastIndexOf(":")),
tabBoxId=tabBoxIdStr,
tabBoxItemNode=vg.html.getElement(tabItemId),
tabId=tab&&tab.id,
tabIdMatch=tabId&&tabId.match(/_respLink/g),
respTabNode=null,
isRespLink=false,
TABBOX_ITEM_LINK="_tabBoxItemLink",
RESP_LINK="_respLink";
if(tabId&&tabIdMatch&&tabIdMatch.length > 0)
{
isRespLink=true;
}
if(tabBoxItemNode.style.display=='none'||(ie&&!isRespLink&&tabBoxItemNode.style.display=='')){
_cbdSelectTabBoxItem(tabBoxId, tabItemId, async, immediateStateKeeper, isRespLink, showLoadingIndicator);
}
else if(isRespLink)
{
respTabNode=tabBoxIdStr+TABBOX_ITEM_LINK+index+RESP_LINK;
respTabNode=vg.html.getElement(respTabNode).parentNode;
_cbdSetSelectedItem(tabBoxId, respTabNode);
_cbdAddExpandImageTabBoxTab(respTabNode);
_cbdSlideToggleTabBoxItem(tabBoxItemNode);
}
}
var SELECTED_ITEM_CLASS="current";
var SELECTED_ITEM_SYMBOL="&#8250;"
var SELECTED_ITEM_SYMBOL_REGEX=/^(\u203A )+/;
var NOT_SELECTED_ITEM_CLASS="unselected";
var DISABLE_ITEM_CLASS="disabled";
var SPACER_ITEM_CLASS="spacer";
_cbdTabBoxGetLabels=function(id )
{
var ul=vg.html.getElements(document.getElementById(id ),{tagName:'ul', attrName:'class', attrValue:'tabItems'})[0];
return vg.html.getElements(ul,{tagName:'li', maxDepth:3},
function(node)
{
return(node.className!=SPACER_ITEM_CLASS
&&node.parentNode.parentNode.parentNode.getAttribute('id' )==id );
}
);
}
_cbdSelectTabBoxItem=function(tabBoxId, tabItemId, async, immediateStateKeeper, isRespLink, showLoadingIndicator)
{
var tabBoxItem=document.getElementById(tabItemId),
listOfItems=vg.html.getElements(tabBoxItem.parentNode,{tagName:'div', maxDepth:1}, function(node){return vg.html.hasStyle("cntItem",node)}),
respListOfLabels=vg.html.getElements(tabBoxItem.parentNode,{tagName:'div', maxDepth:1}, function(node){return vg.html.hasStyle("respTab",node)}),
selectedIndex,
selectedItem=null,
selected=false,
tabBox=document.getElementById(tabBoxId),
tabBoxController=null,
tabsUL=[],
listOfLabels=[],
listIndex=0,
item=listOfLabels[listIndex],
respItem=null,
itemVal=null,
itemParentNode=null,
mode=null,
thisTabBoxItem=null,
j=0,
i=0;
if(showLoadingIndicator)
{
var respListOfLabels=vg.html.getElements(tabBoxItem.parentNode,
{tagName:'div', maxDepth:1}, function(node){return vg.html.hasStyle("respTab",node)});
for(i=0;i < listOfItems.length;i++)
{
selected=listOfItems[i].getAttribute('id')==tabItemId;
if(selected)
{
_cbdShowLoadingIndicator(respListOfLabels[i], showLoadingIndicator);
break;
}
}
Populator._execute(tabBoxItem, null, i);
}
else
{
Populator._execute(tabBoxItem);
}
vg.comp._lazyLoadComp(tabBoxId);
tabBoxController=vg.comp.findController(tabBox, false);
if(!tabBoxController)
{
return;
}
tabsUL=vg.html.getElements(tabBox,{tagName:'ul', attrName:'class', attrValue:'tabItems'})[0];
listOfLabels=vg.html.getElements(tabsUL,{tagName:'li'},
function(node){return node.className!=SPACER_ITEM_CLASS});
for(j=0;j < listOfLabels.length;j++)
{
if(listOfLabels[j].className==SELECTED_ITEM_CLASS)
{
vg.html._fireCustomEvent(vg.event.DISP_CHANGE, listOfItems[j].id,{elemDisp:false});
}
}
for(i=0;i < listOfItems.length;i++)
{
selected=listOfItems[i].getAttribute('id')==tabItemId;
if(selected)
{
true;
selectedIndex=i;
}
if(listOfItems[i].getAttribute('sharedBy')==null)
{
item=listOfLabels[listIndex];
respItem=respListOfLabels[listIndex];
itemVal=item.childNodes[0].innerHTML;
itemParentNode=item.parentNode.parentNode;
mode=item.getAttribute('mode');
if(mode!='disabled')
{
if(itemParentNode.className=="subhead"
||itemParentNode.className=="int-subhead")
{
if(selected)
{
if(!itemVal.match(SELECTED_ITEM_SYMBOL_REGEX ) )
{
selectedItem=item.childNodes[0];
}
}
}
thisTabBoxItem=tabBoxController.tabBoxItems[i];
item.className=tabBoxController._setTabStyles({"tabNode":item, "itemNode":thisTabBoxItem, "isSelected":selected});
item.setAttribute('mode', selected?SELECTED_ITEM_CLASS:NOT_SELECTED_ITEM_CLASS );
if((typeof respItem!=='undefined')&&(respItem!==null) )
{
respItem.setAttribute('mode', selected?SELECTED_ITEM_CLASS:NOT_SELECTED_ITEM_CLASS );
if(selected)
{
_cbdAddCollapseImageTabBoxTab(respItem);
}
else if(!isRespLink)
{
_cbdAddExpandImageTabBoxTab(respItem);
}
}
if(listIndex+1 > listOfLabels.length )
{
vg.html.addStyle('lastTab', item);
}
}
listIndex++;
}
}
tabBoxController._updateDropdownLabel();
tabBoxController._setTabDivBorder(selectedIndex);
if(tabBox.getAttribute('disablestatekeeper')!="true")
{
cbd.StateKeeper._setState(tabBoxId, selectedIndex, immediateStateKeeper);
}
if(async&&ie)
{
if(isRespLink)
{
setTimeout(function(){_cbdSlideToggleTabBoxItem(tabBoxItem)}, 100);
}
else
{
setTimeout(function(){_cbdSetTabBoxItemsDisplay(tabBoxItem, listOfItems, selectedIndex, selectedItem, isRespLink)}, 100);
}
}
else
{
if(isRespLink)
{
_cbdSlideToggleTabBoxItem(tabBoxItem);
}
else
{
_cbdSetTabBoxItemsDisplay(tabBoxItem, listOfItems, selectedIndex, selectedItem, isRespLink);
}
}
if(!isRespLink)
{
_makeTabBoxItemScrollableForTouch(tabBoxItem, tabBoxItem.id)
}
vg.html._fireCustomEvent(vg.event.DISP_CHANGE, listOfItems[selectedIndex].id,{elemDisp:true});
}
_cbdSetSelectedItem=function(tabBoxId, respTabNode)
{
var tabBoxNode=document.getElementById(tabBoxId),
tabs=vg.html.getElements(tabBoxNode,{tagName:'li', maxDepth:4}),
respTabs=vg.html.getElements(tabBoxNode,{tagName:'div', maxDepth:3}, function(node){return vg.html.hasStyle("respTab",node)}),
tabsLen=tabs.length,
i=0,
tabClass=null;
for(i=0;i < tabsLen;i++)
{
if(respTabs[i].firstElementChild.id===respTabNode.firstElementChild.id)
{
_cbdSetSelectedItemClass(respTabs[i], tabs[i], NOT_SELECTED_ITEM_CLASS, SELECTED_ITEM_CLASS);
}
else
{
_cbdSetSelectedItemClass(respTabs[i], tabs[i], SELECTED_ITEM_CLASS, NOT_SELECTED_ITEM_CLASS);
}
}
}
_cbdSetSelectedItemClass=function(respTab, tab, oldClass, newClass)
{
var tabClass=tab.getAttribute('class'), cbdAdapter=cbd.adapter;
if(tabClass!=="disabled"&&tabClass!=="int-disabled")
{
if(tabClass.match(/int-/g)&&tabClass.match(/int-/g).length > 0)
{
respTab.setAttribute('mode', newClass );
tab.setAttribute('mode', newClass );
cbdAdapter.removeClass(tab, "int-"+oldClass);
cbdAdapter.addClass(tab, "int-"+newClass);
}
else
{
respTab.setAttribute('mode', newClass );
tab.setAttribute('mode', newClass );
cbdAdapter.removeClass(tab, oldClass);
cbdAdapter.addClass(tab, newClass);
}
}
}
_cbdAddExpandImageTabBoxTab=function(respTabNode)
{
cbd.adapter.removeClass(respTabNode, SELECTED_ITEM_CLASS);
cbd.adapter.addClass(respTabNode, NOT_SELECTED_ITEM_CLASS);
}
_cbdShowLoadingIndicator=function(respTabNode, showLoadingIndicator)
{
if(showLoadingIndicator)
{
cbd.adapter.addClass(respTabNode, "loadInd");
}
else
{
cbd.adapter.removeClass(respTabNode, "loadInd");
}
}
_cbdAddCollapseImageTabBoxTab=function(respTabNode)
{
cbd.adapter.removeClass(respTabNode, NOT_SELECTED_ITEM_CLASS);
cbd.adapter.addClass(respTabNode, SELECTED_ITEM_CLASS);
}
_cbdSlideToggleTabBoxItem=function(item)
{
var tabBoxItem=document.getElementById(item),
yuiTabBoxItem=null,
isOpening=false,
velocity=2,
itemHeight=0,
time,
callBackFunction="",
tabBoxId=item.getAttribute('id').substring(0,item.getAttribute('id').lastIndexOf(':')),
tabBoxController=vg.comp.findController(document.getElementById(tabBoxId), false);
if(tabBoxItem===null)
{
tabBoxItem=item;
}
yuiTabBoxItem=cbd.getYUI().one(tabBoxItem);
yuiTabBoxItem.setStyle("opacity", "");
if(yuiTabBoxItem.getStyle('display')==='none')
{
isOpening=true;
}
yuiTabBoxItem.setStyle("display","block");
itemHeight=vg.html.getObjHeight(yuiTabBoxItem.getDOMNode());
yuiTabBoxItem.setStyle("display","none");
time=(tabBoxController.transdur===null)?itemHeight*velocity:tabBoxController.transdur;
if(isOpening)
{
callBackFunction=function(){
if(yuiTabBoxItem.isClosing!==true)
{
yuiTabBoxItem.setStyles({height:"", overflow:"visible"});
}
_makeTabBoxItemScrollableForTouch(item,item.id);
vg.html._fireCustomEvent(vg.event.TABBOX_ITEM_SELECTED_ANIMATION, tabBoxController.id,{nodeId:tabBoxItem.id, controllerId:tabBoxController.id, animationType:CBD_ANIMATION_OPEN});
};
}
else
{
yuiTabBoxItem.isClosing=true;
callBackFunction=function(){
yuiTabBoxItem.setStyles({height:"", display:"none"});
_makeTabBoxItemScrollableForTouch(item,item.id);
yuiTabBoxItem.isClosing=false;
vg.html._fireCustomEvent(vg.event.TABBOX_ITEM_SELECTED_ANIMATION, tabBoxController.id,{nodeId:tabBoxItem.id, controllerId:tabBoxController.id, animationType:CBD_ANIMATION_CLOSE});
};
}
yuiTabBoxItem.setStyles({overflow:"hidden"});
vg.smil.slideToggle({node:yuiTabBoxItem, isOpening:isOpening, duration:time, callBackFunction:callBackFunction, easing:'easeBothStrong'});
};
_makeTabBoxItemScrollableForTouch=function(tabBoxItem, tabBoxItemId)
{
if(cbd.browser.isTouchScreen&&cbd.page.isNextGen&&!vg.html.hasStyle(vg.touchScreen.SCROLL_CONTAINER_CLASS,tabBoxItem)&&vg.html.isFixedHeight(tabBoxItem))
{
vg.touchScreen._makeNodeScrollable(tabBoxItemId);
}
};
_cbdSetTabBoxItemsDisplay=function(tabBoxItem, listOfItems, selectedIndex, selectedItem, slideToggle)
{
var selectedChild=listOfItems[selectedIndex].getAttribute('id'),
lastIndexOfColon=selectedChild.lastIndexOf(":"),
showItem=false,
sharedAttr=null,
i=0,
j=0;
selectedChild=selectedChild.substring(lastIndexOfColon+1);
for(i=0;i < listOfItems.length;i++)
{
showItem=false;
sharedAttr=listOfItems[i].getAttribute('sharedBy');
if(sharedAttr!=null )
{
sharedAttr=sharedAttr.split(",");
for(j=0;j < sharedAttr.length;j++)
{
if(sharedAttr[j]==selectedChild||sharedAttr[j]=="*"||sharedAttr[j]=="" )
{
showItem=true;
break;
}
}
}
if(i!=selectedIndex)
{
jsCBDtoggleElement(listOfItems[i], showItem);
if(!slideToggle)
{
_cbdFadeTabBoxItem(listOfItems[i], showItem);
}
}
}
if(!slideToggle)
{
jsCBDtoggleElement(tabBoxItem, true);
_cbdFadeTabBoxItem(tabBoxItem, true);
}
else
{
_cbdSlideToggleTabBoxItem(tabBoxItem);
}
_cbdSetTabBoxItemFocus(selectedItem);
vg.comp._configureHiddenItems(tabBoxItem);
}
_cbdFadeTabBoxItem=function(tabBoxItem, showItem)
{
var tabBoxId;
if(window.isNextGen )
{
if(showItem )
{
var fadeInCallback=function()
{
tabBoxId=tabBoxItem.getAttribute('id').substring(0,tabBoxItem.getAttribute('id').lastIndexOf(':'));
vg.util._removeIEfilterProp(tabBoxItem);
vg.html._fireCustomEvent(vg.event.TABBOX_ITEM_SELECTED_ANIMATION, tabBoxId,{nodeId:tabBoxItem.id, controllerId:tabBoxId, animationType:CBD_ANIMATION_FADE_IN});
};
vg.smil.cbdFadeIn(tabBoxItem, 250, fadeInCallback);
}
else
{
tabBoxItem.style.opacity=0;
}
}
}
_cbdSetTabBoxItemFocus=function(selectedItem)
{
if(selectedItem)
{
try
{
selectedItem.focus();
}
catch(e)
{
vg.util.checkConditionsAndExecute(function(){return false;}, function(){_cbdSetTabBoxItemFocus(selectedItem);}, 10);
}
}
}
jsCBDgetSelectedTabIndex=function(tabBoxId)
{
var tabBox=document.getElementById(tabBoxId);
var ul=vg.html.getElements(tabBox,{tagName:'ul', attrName:'class', attrValue:'tabItems'})[0];
var listOfLabels=vg.html.getElements(ul,{tagName:'li'}, function(node){return node.className!=SPACER_ITEM_CLASS});
var selectedIndex;
for(var i=0;i < listOfLabels.length;i++)
{
if(listOfLabels[i].getAttribute('mode' )==SELECTED_ITEM_CLASS )
{
selectedIndex=i;
}
}
return selectedIndex;
}
jsCBDSelectNavSquareItem=function(navSquareItemId)
{
var navSquareItem=document.getElementById(navSquareItemId);
var ul=vg.html.findAncestor(navSquareItem,{tagName:'ul'});
var listOfLabels=vg.html.getElements(ul,{tagName:'li'});
var unselectedClass="unselected";
var currentClass="current";
for(var i=0;i < listOfLabels.length;i++)
{
var item=listOfLabels[i];
var itemAnchorId=item.childNodes[0].id;
navSquareItemId==itemAnchorId?vg.html.replaceClass(item,unselectedClass,currentClass):vg.html.replaceClass(item,currentClass,unselectedClass);
}
}
jsCBDPositionDisplayObject=function(displayObj, tgtID, dispLoc, infobox, leader, horzPos)
{
return vg.html.position(displayObj, tgtID, dispLoc, infobox, leader, horzPos);
}
jsCBDCheckFixedStyle=function(node)
{
if(node!=document&&node!=window)
{
var pos=jsCBDGetComputedStylePropertyValue(node, "position");
return(pos=="fixed");
}
return false;
}
var _cbdLeaderIds=new Array();
_cbdCreateLeader=function(displayObjId, ldrType)
{
var newLdrDivId="ldr_"+displayObjId;
var ldrData=new Object;
if(!document.getElementById(newLdrDivId))
{
var newLdrDiv=document.createElement("div");
newLdrDiv.setAttribute("id", newLdrDivId);
newLdrDiv.setAttribute(checkAttrName('class',newLdrDiv), ldrType);
if(displayObjId==CBD_GLOBAL_INFO_BOX)
{
var dynamicCssDiv=vg.html.getElement(CBD_DYNAMIC_CSS_ID);
dynamicCssDiv.appendChild(newLdrDiv);
}
else
{
var wrapdiv=document.getElementById('wrapDiv');
var parentDiv=(wrapdiv)?document.getElementById("vg0"):document.getElementById("layer");
if(parentDiv)
{
parentDiv.appendChild(newLdrDiv);
}
}
ldrData.ldrObjId=newLdrDivId;
_cbdLeaderIds.push(newLdrDivId);
newLdrDiv.style.position="absolute";
newLdrDiv.style.zIndex="4001";
return ldrData;
}
else
{
ldrData.ldrObjId=newLdrDivId;
document.getElementById(newLdrDivId).setAttribute(checkAttrName('class', document.getElementById(newLdrDivId)), ldrType);
return ldrData;
}
}
_cbdFindPos=function(obj)
{
var pos=new Object();
var curleft=curtop=0;
var initObj=obj;
if(obj.offsetParent)
{
curleft=obj.offsetLeft;
curtop=obj.offsetTop;
while(obj=obj.offsetParent)
{
curleft+=obj.offsetLeft;
curtop+=obj.offsetTop;
}
curtop -=_cbdGetTotalScroll(initObj);
}
pos.x=curleft;
pos.y=curtop;
return pos;
}
_cbdGetTotalScroll=function(obj)
{
var scroll=0;
while(obj=obj.parentNode)
{
if(!obj.scrollTop)
continue;
var tagName=obj.tagName.toLowerCase();
scroll+=(tagName=='body'||tagName=='html')?0:obj.scrollTop;
}
return scroll;
}
_cbdGetTotalScrollLeft=function(obj)
{
var scroll=0;
while(obj=obj.parentNode)
{
if(!obj.scrollLeft)
continue;
var tagName=obj.tagName.toLowerCase();
scroll+=(tagName=='body'||tagName=='html')?0:obj.scrollLeft;
}
return scroll;
}
_cbdGetScrollOffset=function(obj)
{
var scroll=0;
while(obj=obj.parentNode)
{
if(!obj.scrollTop)
{
continue;
}
var pos=jsCBDGetComputedStylePropertyValue(obj,'position');
if(pos=='absolute'||pos=='relative')
{
scroll+=obj.scrollTop;
break;
}
}
return scroll;
}
_cbdGetScrollOffsetLeft=function(obj)
{
var scroll=0;
while(obj=obj.parentNode)
{
if(!obj.scrollLeft)
{
continue;
}
var pos=jsCBDGetComputedStylePropertyValue(obj,'position');
if(pos=='absolute'||pos=='relative')
{
scroll+=obj.scrollLeft;
break;
}
}
return scroll;
}
_cbdRemoveDecimal=function(value)
{
value=new String(value)
if(value.indexOf(".")  > 0)
{
value=value.substring(0, value.indexOf("."));
}
return value;
}
_cbdOnBrowserResize=function()
{
_cbdConfigCBDModalDiv(true);
vg.html._resizeDisableDivs();
if(!cbd.browser.isTouchScreen)
{
_cbdClosePrevSelectOneMenu();
}
_cbdClosePrevAutoSuggest();
}
_cbdConfigCBDModalDiv=function(isResizing)
{
"use strict";
var cbdModalDiv=document.getElementById("cbdModalDiv"),
inlineStyles;
if(cbdModalDiv)
{
inlineStyles=cbdModalDiv.style;
if(!isResizing||(isResizing&&inlineStyles.display!=='none'))
{
if((!ie7)||(ie7&&(parseInt(vg.util.getHTMLbodyHeight(), 10) < 3000)))
{
inlineStyles.height="auto";
inlineStyles.width="auto";
inlineStyles.height=vg.util.getHTMLbodyHeight();
inlineStyles.width=vg.util.getHTMLbodyWidth();
}
}
}
};
jsCBDcaptureScrollPosition=function(e){
var eNode=jsCBDgetEventNode(e);
scrollTop=eNode.scrollTop;
scrollTop=eNode.scrollLeft;
}
_cbdIsScrollEvent=function(top,left){
return((top!=scrollTop)||(left!=scrollLeft))
}
jsCBDAnimation=function(id, attr, duration, beginTime, fromPoint )
{
this.uid=jsCBDAnimation.uids++;
this.id=id;
this.attr=attr;
this.duration=duration;
this.beginTime=beginTime;
this.fromPoint=fromPoint;
this.points=[];
this.doneflag=false;
this.interpFunc=jsCBDAnimation.interpFuncs['linear'];
this.convertFunc=jsCBDAnimation.convertFuncs[attr];
this.onfinish=null;
jsCBDAnimation.animations[this.uid]=this;
}
jsCBDAnimation.prototype.setToPoint=function(t )
{
this.toPoint=t;
}
jsCBDAnimation.prototype.setByPoint=function(t )
{
this.toPoint=this.fromPoint+jsCBDAnimation.convertUnits(t );
}
jsCBDAnimation.convertUnits=function(t )
{
var re=new RegExp("([\\+\\-]?)(\\d+)(ms|s|\\%)?" );
var res=re.exec(t );
var ret=1;
if(res!=null )
{
if(res[1]=="-" )
{
ret=-1;
}
ret*=parseInt(res[2], 10 );
if(res[3]=="s" )
{
ret*=1000;
}
}
return ret;
}
jsCBDAnimation.prototype.start=function()
{
this.msBegin=jsCBDAnimation.convertUnits(this.beginTime );
setTimeout('jsCBDAnimation._static_start('+this.uid+' );', this.msBegin );
this.msDT=jsCBDAnimation.convertUnits(this.duration );
this.nSteps=this.msDT/jsCBDAnimation.delay;
this.currentStep=0;
this.dPoints=this.toPoint - this.fromPoint;
for(var i=0;i < this.nSteps;i++)
{
var percentage=(i*100 )/this.nSteps;
var interp=this.interpFunc(percentage );
var stepPoint=this.convertFunc(interp/100.0, this.fromPoint, this.toPoint );
this.points.push(stepPoint );
}
this.points.push(this.toPoint );
}
jsCBDAnimation.prototype.stop=function()
{
this.doneflag=true;
delete jsCBDAnimation.animations[this.uid];
if(this.intervalID!==undefined )
{
clearInterval(this.intervalID );
}
}
jsCBDAnimation.prototype.timeRemaining=function()
{
var now=jsCBDAnimation.getTS();
var dt=now - this.startTS;
var rem=this.msDT - dt;
if(rem < 0 )
{
rem=0;
}
return rem;
}
jsCBDAnimation.prototype.timeElapsed=function()
{
var now=jsCBDAnimation.getTS();
var dt=now - this.startTS;
return dt;
}
jsCBDAnimation.prototype.step=function()
{
var animfunc=jsCBDAnimation.animationTypes[this.attr];
if(animfunc!==undefined )
{
if(this.points[this.currentStep])
{
animfunc(document.getElementById(this.id ), this.points[this.currentStep]);
}
}
}
jsCBDAnimation._static_start=function(uid )
{
var anim=jsCBDAnimation.animations[uid];
if(anim!==undefined )
{
anim.startTS=jsCBDAnimation.getTS();
anim.intervalID=setInterval('jsCBDAnimation._static_step('+uid+' );', jsCBDAnimation.delay );
}
}
jsCBDAnimation.getTS=function()
{
var d=new Date();
var u=Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(),
d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds() );
return u;
}
jsCBDAnimation._static_step=function(uid )
{
var anim=jsCBDAnimation.animations[uid];
if(anim!==undefined )
{
anim.currentStep++;
if(anim.currentStep <=anim.nSteps+1 )
{
anim.step();
}
else
{
if(anim.onfinish )
{
anim.onfinish(anim );
}
anim.stop();
}
}
}
jsCBDAnimation.uids=1;
jsCBDAnimation.animations={};
jsCBDAnimation.animationTypes={};
jsCBDAnimation.interpFuncs={};
jsCBDAnimation.convertFuncs={};
jsCBDAnimation.delay=30;
jsCBDAnimation._interpLinear=function(x )
{
return x;
}
jsCBDAnimation._interpQuad=function(x )
{
return(1/100 )*x*x;
}
jsCBDAnimation._convertPixel=function(perc, a, b )
{
var a2=jsCBDAnimation.convertUnits(a );
var b2=jsCBDAnimation.convertUnits(b );
var val=((b2 - a2 )*perc )+a2;
return val+'px';
}
jsCBDAnimation._convertPercent=function(perc, a, b )
{
return perc;
}
jsCBDAnimation._convertColor=function(perc, a, b )
{
var ra=jsCBDMath.hex2dec(a.substring(1, 3 ) );
var ga=jsCBDMath.hex2dec(a.substring(3, 5 ) );
var ba=jsCBDMath.hex2dec(a.substring(5, 7 ) );
var rb=jsCBDMath.hex2dec(b.substring(1, 3 ) );
var gb=jsCBDMath.hex2dec(b.substring(3, 5 ) );
var bb=jsCBDMath.hex2dec(b.substring(5, 7 ) );
var rc=jsCBDMath.dec2hex(parseInt(((rb - ra )*perc )+ra, 10 ) );
var gc=jsCBDMath.dec2hex(parseInt(((gb - ga )*perc )+ga, 10 ) );
var bc=jsCBDMath.dec2hex(parseInt(((bb - ba )*perc )+ba, 10 ) );
return '#'+rc+gc+bc;
}
jsCBDAnimation._setHeight=function(element, value )
{
if(value!='0px'&&parseInt(value, 10 )!=0 )
{
element.style.height=value;
}
else
{
element.style.height='1px';
}
}
jsCBDAnimation._setOpac=function(element, value )
{
element.style.filter='alpha(opacity='+value+')';
element.style.opacity=value/100;
}
jsCBDAnimation.animationTypes['height']=jsCBDAnimation._setHeight;
jsCBDAnimation.animationTypes['opacity']=jsCBDAnimation._setOpac;
jsCBDAnimation.interpFuncs['linear']=jsCBDAnimation._interpLinear;
jsCBDAnimation.interpFuncs['quadratic']=jsCBDAnimation._interpQuad;
jsCBDAnimation.convertFuncs['height']=jsCBDAnimation._convertPixel;
jsCBDAnimation.convertFuncs['bgcolor']=jsCBDAnimation._convertColor;
jsCBDAnimation.convertFuncs['opacity']=jsCBDAnimation._convertPercent;


if(!window.cbd )
{
cbd={};
}
AjaxResponse=function(text, error)
{
this.text=text;
this.error=error;
};
AjaxResponse.prototype=
{
getText:function()
{
return this.text;
},
getError:function()
{
return this.error;
}
};
Error=function(message)
{
this.errorMsg=message;
};
cbd.metrics=new Object();
cbd.ContentLoader=function(url, callback, caller, encType)
{
this.url=url;
this.callback=callback;
this.caller=caller;
this.encType=encType;
this.post=false;
this.params=null;
this.async=true;
this.request=this._getXmlHttpRequest();
this.READY_STATE_UNINITIALIZED=0;
this.READY_STATE_LOADING=1;
this.READY_STATE_LOADED=2;
this.READY_STATE_INTERACTIVE=3;
this.READY_STATE_COMPLETE=4;
this.MSG_ID_PREFIX="msg_";
};
cbd.ContentLoader.AJAX_INIT_ERR=AJAX_INIT_ERR=new Error("AJAX init failure");
cbd.ContentLoader.AJAX_GET_ERR=AJAX_GET_ERR=new Error("AJAX HTTP/GET failed");
cbd.ContentLoader.HTTP_RESPONSE_ERR=HTTP_RESPONSE_ERR=new Error("HTTP response error");
cbd.ContentLoader.HTTP_204_RESPONSE_ERR=HTTP_204_RESPONSE_ERR=new Error("204 HTTP response error");
cbd.ContentLoader.HTTP_202_RESPONSE_ERR=HTTP_202_RESPONSE_ERR=new Error("202 HTTP response error");
cbd.ContentLoader.AJAX_TEXT_RESPONSE_ERR=AJAX_TEXT_RESPONSE_ERR=new Error("No AJAX text response");
cbd.ContentLoader.AJAX_XML_RESPONSE_ERR=AJAX_XML_RESPONSE_ERR=new Error("No AJAX XML response");
cbd.ContentLoader.XML_TAG_NOT_FOUND=XML_TAG_NOT_FOUND=new Error("XML Tag not found");
cbd.ContentLoader.XML_TAG_VALUE_NOT_FOUND=XML_TAG_VALUE_NOT_FOUND=new Error("XML Tag value not found");
cbd.ContentLoader.isRequestInProgress=function()
{
return cbd.ContentLoader.prototype._openConnections.count > 0;
};
cbd.ContentLoader.killAjax=function()
{
cbd.ContentLoader.blockRequests=true;
var map=cbd.ContentLoader.prototype._openConnections.requests;
var req;
for(var i in map)
{
req=map[i];
if(req&&req.abort)
{
req.abort();
}
}
cbd.ContentLoader.prototype._openConnections.requests={};
cbd.ContentLoader.prototype._openConnections.count=0;
};
cbd.ContentLoader.prototype=
{
_openConnections:{},
getAsync:function()
{
return this.async;
},
setAsync:function(async)
{
this.async=async;
},
getUrl:function()
{
return this.url;
},
setUrl:function(url)
{
this.url=url;
},
setPost:function(post)
{
this.post=post;
},
setParams:function(params)
{
this.params=params;
},
abort:function()
{
if(this.caller)
{
this.caller.aborted=true;
}
this._cleanUpRequests();
this.request.abort();
},
sendRequest:function()
{
if(cbd.ContentLoader.blockRequests)
{
return;
}
var loader=this;
if(this.caller!=null&&!this.caller.disableWaitMsg)
{
setTimeout(function(){loader._showBusyMsg(loader.caller.id);}, 125 );
}
if(this.request!=null)
{
try
{
with(this.request)
{
open(this.post?"POST":"GET", this.url, this.getAsync());
onreadystatechange=function(){loader._processResponse();};
if(this.post)
{
if(this.encType!=null&&(typeof this.encType)!="undefined")
{
setRequestHeader("Content-type", "application/x-www-form-urlencoded;"+this.encType);
}
else
{
setRequestHeader("Content-type", "application/x-www-form-urlencoded");
}
}
send(this.params);
if(this.getAsync())
{
var randomnumber=Math.floor(Math.random()*1001);
this.timeStamp=(new Date()).getTime().toString()+randomnumber;
this._openConnections.requests[this.timeStamp]=this;
++this._openConnections.count;
}
if(firefox&&!this.getAsync()){
loader._processResponse();
}
}
}
catch(error)
{
if(this.callback!=null)
this.callback(this.request, cbd.ContentLoader.AJAX_GET_ERR, this.caller, this.async);
if(this.caller!=null&&!this.caller.disableWaitMsg)
{
this._hideBusyMsg(this.caller.id);
}
return;
}
}
else
{
if(this.callback!=null)
{
this.callback(this.request, cbd.ContentLoader.AJAX_INIT_ERR, this.caller, this.async);
}
}
},
_getXmlHttpRequest:function()
{
var req=null;
try
{
if(window.XMLHttpRequest)
{
req=new XMLHttpRequest();
}
else if(window.ActiveXObject)
{
req=new ActiveXObject("Microsoft.XMLHTTP");
if(!req)
{
req=new ActiveXObject("Msxml2.XMLHTTP");
}
}
return req;
}
catch(e)
{
return null;
}
},
_processResponse:function()
{
var req=this.request;
if(req.readyState==this.READY_STATE_COMPLETE)
{
this._cleanUpRequests();
if(this.caller!=null)
{
this._hideBusyMsg(this.caller.id);
}
if(req.status==202)
{
this._retry();
}
else if(req.status==200)
{
var responseHtml=jsCBDgetResponseText(req).getText();
var redirUrl=req.getResponseHeader('vgRedirect');
var ajaxRedirUrl=_cbdGetRedirUrl(responseHtml);
if(!isEmpty(redirUrl)&&isRelativeUrl(redirUrl))
{
jsCBDgoToUrl(redirUrl);
}
else if(!isEmpty(ajaxRedirUrl)&&vg.util._isRelativeUrl(ajaxRedirUrl))
{
jsCBDgoToUrl(ajaxRedirUrl);
}
else if(_cbdIsLoginPage(responseHtml))
{
window.location.reload(T);
}
else if(_cbdIsFullView(responseHtml))
{
_cbdForceFullView(responseHtml);
}
else if(_cbdIsPostPreservationPage(responseHtml))
{
_cbdHandlePostPreservationPage(responseHtml, this.caller, this.callback);
}
else
{
if(this.callback!=null)
{
this.callback(req, null, this.caller, this.async);
}
}
}
else if(req.status==204||req.status==1223)
{
if(this.callback!=null)
{
this.callback(req, cbd.ContentLoader.HTTP_204_RESPONSE_ERR, this.caller, this.async);
}
}
else if(req.status==500)
{
var responseHtml=jsCBDgetResponseText(req).getText();
if(_cbdIsFullView(responseHtml))
{
_cbdForceFullView(responseHtml);
}
}
else
{
if(this.callback!=null)
{
this.callback(req, cbd.ContentLoader.HTTP_RESPONSE_ERR, this.caller, this.async);
}
}
}
},
_retry:function()
{
var retryTimeout=1000;
if(!this.retry)
{
this.retry=0;
retryTimeout=500;
}
if(this.retry < 30)
{
this.retry++;
var thisRequest=this;
setTimeout(
function(){
thisRequest.sendRequest();
}, retryTimeout
);
}
else if(this.callback!=null)
{
this.callback(this.request, cbd.ContentLoader.HTTP_202_RESPONSE_ERR, this.caller);
}
},
_showBusyMsg:function(callerId)
{
if(!RIA||callerId==null||this.request.readyState==this.READY_STATE_COMPLETE)
{
return;
}
var msgId=this.MSG_ID_PREFIX+callerId;
this._createMsgDiv(msgId);
vg.html.position({elementNode:msgId, targetNode:callerId, dispLoc:"auto", horzPos:"left"});
jsCBDtoggle(msgId, true);
vg.html.position({elementNode:msgId, targetNode:callerId, dispLoc:"auto", horzPos:"left"});
},
_hideBusyMsg:function(callerId)
{
jsCBDtoggle(this.MSG_ID_PREFIX+callerId, false);
},
_createMsgDiv:function(divID)
{
var msgDiv=document.getElementById(divID);
if(msgDiv==null)
{
msgDiv=document.createElement("div");
msgDiv.id=divID;
msgDiv.style.position="absolute";
msgDiv.style.zIndex="2000";
msgDiv.style.display=H;
msgDiv.innerHTML='<table class="roundBox rdshdw" cellspacing="0" cellpadding="0" border="0"><tbody><tr class="rdshdwtopRow"><td class="rdshdwtopLft">&#160;</td><td class="rdshdwtopMid" align="center">&#160;</td><td class="rdshdwtopRgt">&#160;</td></tr><tr class="rdshdwctrRow"><td class="rdshdwctrLft">&#160;</td><td class="rdshdwctrMid"><div class="roundBoxBusy"><p style="margin-bottom:10px;"><img src="'+_cbdImagePath+'loading_small.gif" align="absmiddle"/></p></div></td><td class="rdshdwctrRgt">&#160;</td></tr><tr class="rdshdwbotRow"><td class="rdshdwbotLft">&#160;</td><td class="rdshdwbotMid">&#160;</td><td class="rdshdwbotRgt">&#160;</td></tr></tbody></table>';
document.getElementsByTagName("body")[0].appendChild(msgDiv);
}
return msgDiv;
},
_cleanUpRequests:function()
{
if(this._openConnections.requests[this.timeStamp])
{
this._openConnections.count--;
this._openConnections.requests[this.timeStamp]=null;
delete this._openConnections.requests[this.timeStamp];
}
}
};
cbd.ContentLoader.prototype._openConnections.count=0;
cbd.ContentLoader.prototype._openConnections.requests={};
jsCBDgetXMLTagValue=function(thisRequest, tagName)
{
var error=null;
var response;
try{response=thisRequest.responseXML;}catch(err){error=cbd.ContentLoader.AJAX_XML_RESPONSE_ERR;}
try{response=response.getElementsByTagName(tagName);}catch(err){error=cbd.ContentLoader.XML_TAG_NOT_FOUND;}
try{response=response[0].firstChild.nodeValue;}catch(err){error=cbd.ContentLoader.XML_TAG_VALUE_NOT_FOUND;}
if(error!=null)
{
response=null;
}
return new AjaxResponse(response, error);
};
jsCBDgetResponseText=function(thisRequest)
{
var response=null;
var error=null;
try
{
response=thisRequest.responseText;
}
catch(err)
{
error=cbd.ContentLoader.AJAX_TEXT_RESPONSE_ERR;
}
return new AjaxResponse(response, error);
};
jsCBDupdateComponent=function(compIds, caller, callback, params, postInputs, encType, disableWaitMsg, htmlRender, disableRowAlt, dontSetStateChg, sync, resetError)
{
"use strict";
var errorLayer=document.getElementById(FORM_FIELD_INFO);
if(errorLayer)
{
errorLayer.errorFromServer=false;
}
window._ucCompleted=false;
cbd.ajaxDispatcher.makeCall(_cbdUpdateComponent, arguments);
};
cbd.ContentLoader.updateComponentCalls=0;
_cbdUpdateComponent=function(compIds, caller, callback, params, postInputs, encType, disableWaitMsg, htmlRender, disableRowAlt, dontSetStateChg, sync, resetError)
{
var ignoreResponse=null;
if(compIds.compIds!=null)
{
caller=compIds.caller;
callback=compIds.callback;
params=compIds.params;
postInputs=compIds.postInputs;
encType=compIds.encType;
disableWaitMsg=compIds.disableWaitMsg;
disableRowAlt=compIds.disableRowAlt;
dontSetStateChg=compIds.dontSetStateChg;
sync=compIds.sync;
resetError=compIds.resetError;
ignoreResponse=compIds.ignoreResponse;
if(ignoreResponse==null)
{
ignoreResponse=false;
}
compIds=compIds.compIds;
}
if(cbd.page.isResponsive){
if(!params)
{
params="cbdBreakPoint="+cbdcommon.screen.getMediaQuerySize();
}
else
{
params=params+"&cbdBreakPoint="+cbdcommon.screen.getMediaQuerySize();
}
params=(params.charAt(0)=='?')?params:("?"+params);
}
if(resetError&&vg.validation.registerFirstInvalidElem)
{
vg.validation.registerFirstInvalidElem(null);
}
if(caller!=null)
{
caller=jsCBDgetHtmlNode(caller);
if(caller!='undefined')
{
if(caller.getAttribute){
var nodeId=caller.getAttribute("id");
if(nodeId!=null&&nodeId!="undefined")
{
if(nodeId.indexOf(vg.comp.floatingHeadPrefix) > -1)
{
nodeId=nodeId.replace(new RegExp(vg.comp.floatingHeadPrefix, "g"), "");
caller=document.getElementById(nodeId);
}
}
}
}
caller.disableWaitMsg=(disableWaitMsg!=false);
if(vg.comp.isCommandComp(caller))
{
vg.comp.trackCommandComponent(caller);
if(_cbdIsVgButton(caller))
{
_cbdDisableSubmitButton();
}
}
}
else
{
caller=new Object();
}
caller.ignoreResponse=ignoreResponse;
compIds=vg.constants.COMP_ID_PFX+compIds.replace(/\s/g,"");
compIds=compIds.replace(/,/g, ","+vg.constants.COMP_ID_PFX);
var comma=compIds.indexOf(",");
var firstId=(comma > 0)?compIds.substring(0, comma):compIds;
var comp=document.getElementById(firstId);
var innerComp=document.getElementById(firstId.substring(5));
var form=(innerComp!=null&&_cbdIsForm(innerComp))?innerComp:_cbdGetParentForm(comp);
if(form==null)
return;
var url=form.getAttribute('action');
if(params==null)
{
params="";
}
else
{
params=(params.charAt(0)=='?')?params:("?"+params);
}
params=jsCBDaddQueryStringParam(params, "cbdCompId", compIds );
if(postInputs!=false)
{
params=jsCBDaddQueryStringParam(params, form.id, form.id);
_cbdDisableNestedForm(form, true);
params=jsCBDbuildQueryStr(form, caller, params);
_cbdDisableNestedForm(form, false);
}
else
{
var CSRF_TOKEN='ANTI_CSRF_TOKEN';
var csrfInput=vg.html.getElements(form,{tagName:'input', attrName:'name', attrValue:CSRF_TOKEN})[0];
if(csrfInput!=null)
{
params=jsCBDaddQueryStringParam(params, CSRF_TOKEN, csrfInput.value);
}
}
caller.cid=compIds;
caller.index=cbd.ContentLoader.updateComponentCalls++;
caller.url=url;
vg.html._fireCustomEvent('CBD_UPDATE_COMPONENT_START', window,{id:caller.cid, index:caller.index, url:caller.url});
caller.callback=callback;
caller.disableRowAlt=disableRowAlt;
var contentLoader=new cbd.ContentLoader(url, _receiveCompResponse, caller, encType);
contentLoader.setPost(true);
if(params.charAt(0)=='?')
params=params.substring(1);
contentLoader.setParams(params);
contentLoader.setAsync(!sync);
contentLoader.sendRequest();
if(!dontSetStateChg)
{
cbd.StateKeeper._setStateChanged();
}
};
_cbdDisableNestedForm=function(form, disable)
{
var nestedForms=form.getElementsByTagName('form');
var nestedDivForms=jsCBDgetElementsByAttr(form, 'div', 'formAvatar', 'true');
for(var i=0;i < nestedDivForms.length;++i)
{
_cbdDisableSystemInputs(nestedDivForms[i], disable);
}
for(var i=0;i < nestedForms.length;++i)
{
_cbdDisableSystemInputs(nestedForms[i], disable);
}
};
_cbdDisableSystemInputs=function(form, disable)
{
var inputs=form.getElementsByTagName('input');
for(var i=0;i < inputs.length;i++)
{
var input=inputs[i];
if(input.getAttribute('system')=='true'&&input.getAttribute('type')=='hidden')
{
jsCBDdisableInput(input, disable);
}
}
};
jsCBDbuildQueryStr=function(elem, caller, url)
{
var inputs=elem.getElementsByTagName('input');
var selects=elem.getElementsByTagName('select');
var textarea=elem.getElementsByTagName('textarea');
var txtLen=textarea.length;
for(var i=0;i < txtLen;++i)
{
var textAreaNode=textarea[i];
var textNdVal=vg.html.inputHasDefaultText(textAreaNode)?
"":encodeURIComponent(textAreaNode.value);
url=jsCBDaddQueryStringParam(url, textAreaNode.name, textNdVal);
}
for(var i=0;i < inputs.length;++i)
{
var inputNode=inputs[i];
var inputId=inputNode.id;
var inputType=inputNode.type;
if((inputId==null||inputId.indexOf("cbd_btn") < 0||inputNode.name==caller.id)&&
(inputType!='button'&&inputType!='submit')&&
!jsCBDisDisabled(inputNode) )
{
if((inputType=='radio'||inputType=='checkbox')&&!inputNode.checked )
{
continue;
}
var inpNdVal=vg.html.inputHasDefaultText(inputNode)?
"":encodeURIComponent(inputNode.value);
url=jsCBDaddQueryStringParam(url, inputNode.name, inpNdVal);
if(vg.util.hasAttribute(inputNode, "transient"))
{
jsCBDdisableInput(inputNode, true);
}
}
}
var selectLen=selects.length;
for(var i=0;i < selectLen;++i)
{
var selectNode=selects[i];
var isSelMenu=vg.html.hasStyle("cbdSelList", selectNode);
var isSrcMenu=vg.html.hasStyle("cbdSrcList", selectNode);
if(!isSelMenu&&!isSrcMenu)
{
var itemsLen=selectNode.length;
for(var j=0;j < itemsLen;j++)
{
var item=selectNode[j];
if(item.selected)
{
url=jsCBDaddQueryStringParam(url, selectNode.name, encodeURIComponent(item.value));
}
}
}
else if(isSelMenu)
{
url=_addSelectedListValuesToQueryStr(url, selectNode);
}
}
return url;
};
jsCBDvalidateOnServer=function(args)
{
var inputId=args[0];
var callerId=args[1];
var ajaxParam="ajaxVal=true";
if(cbd.page.isNextGen)
{
ajaxParam+="&dispErr=true";
}
jsCBDupdateComponent(inputId, document.getElementById(callerId), null, ajaxParam);
return true;
};
jsCBDgetContent=function(url, callback, caller, isPost, params)
{
var contentLoader=new cbd.ContentLoader(url, callback, caller);
if(isPost)
{
contentLoader.setPost(true);
}
if(params)
{
contentLoader.setParams(params);
}
contentLoader.sendRequest();
return contentLoader;
};
var resizeTimer=false;
_cbdIsLoginPage=function(html)
{
return html.indexOf("sub-template") < 0&&(html.indexOf("/LoginPage") > 0||html.indexOf("/PMLogin") > 0);
};
_cbdGetRedirUrl=function(html)
{
var redirString='<vg:redir url="';
var url=html.indexOf(redirString);
if(url < 0)
{
return null;
}
var urlStart=url+redirString.length;
var urlEnd=html.indexOf('"', urlStart);
return html.substring(urlStart, urlEnd);
};
_cbdIsPostPreservationPage=function(html)
{
return html.indexOf("document.AUTOSUBMIT.submit()") > 0;
};
_cbdHandlePostPreservationPage=function(html, caller, callback)
{
document.location.reload(true);
};
_cbdIsFullView=function(html)
{
return html.indexOf("CBD_FULL_PAGE") > 0;
};
_cbdForceFullView=function(html)
{
window._cbdOnLoad=function(){};
var bodyStart=html.indexOf("<body");
bodyStart=html.indexOf(">", bodyStart)+1;
var bodyEnd=html.indexOf("</body>")+7;
var newBody=html.substring(bodyStart, bodyEnd);
jsCBDsetElementInnerHtml(document.getElementById("body"),newBody);
};
clearResize=function()
{
resizeTimer=false;
};
_receiveCompResponse=function(request, error, caller, async)
{
vg.util.checkConditionsAndExecute(
_cbdAreDelayedEventsFinished,
function(){
if(error!=null)
return;
var callback=caller.callback;
var callerId=caller.id,
disabledInput,
disabledInputParent;
if(callerId!=null&&callerId!="")
{
var updatedCaller=document.getElementById(callerId);
if(updatedCaller&&_cbdIsVgButton(updatedCaller))
{
vg.button._disable(updatedCaller, false);
disabledInput=document.getElementById("submitBtnClicked");
if(disabledInput)
{
disabledInputParent=disabledInput.parentNode;
if(disabledInputParent)
{
disabledInputParent.removeChild(disabledInput);
}
}
}
}
var response=jsCBDgetResponseText(request);
if(request)
{
try
{
if(typeof(request.onreadystatechange)!=="unknown")
{
request.onreadystatechange=null;
}
if(typeof(request.abort)!=="unknown")
{
request.abort=null;
}
request=null;
}
catch(e)
{
}
}
if(response.error!=null)
{
return;
}
var html=response.text.replace(/^\s*/, "");
vg.util.updateCSRFToken(_parseCSRFToken(html));
_updateComponentsHtml(html, callback, caller);
vg.html._fireCustomEvent('CBD_UPDATE_COMPONENT_END', window,{id:caller.cid, index:caller.index, url:caller.url});
if(caller.navDeckCardId!=null)
{
var upperDeckCardArea;
var divArr=vg.html.getElements(document.getElementById(caller.navDeckCardId),{tagName:'div', attrName:'class', attrValue:'upperProcNavCard'});
if(divArr.length > 0)
{
upperDeckCardArea=divArr[0];
}
if(upperDeckCardArea!=null)
{
jsCBDtoggleElement(upperDeckCardArea, true);
}
}
}
);
};
_cbdAddPostProcessJs=function(compId, compHtml)
{
var jsToAdd="";
return _cbdInsertIntoComponent(compHtml, jsToAdd);
};
_cbdInsertIntoComponent=function(compHtml, newHtml)
{
var compClose=vg.constants.COMP_CLOSE;
var endTag=compHtml.lastIndexOf(compClose);
return compHtml.substring(0, endTag)+newHtml+compClose;
};
_updateComponentsHtml=function(html, callback, caller)
{
if(callback&&(callback.before||callback.after))
{
if(callback.before) callback.before(html);
callback=callback.after;
}
var startTime=(new Date()).getTime();
var vgConstantsNs=vg.constants;
if(!caller.ignoreResponse)
{
var compOpen=vgConstantsNs.COMP_OPEN;
for(var compStart=0, compEnd=0;(compStart=html.indexOf(compOpen, compEnd)) >=0;)
{
var compIdStart=compStart+compOpen.length;
var compId=html.substring(compIdStart, html.indexOf("\"", compIdStart));
compEnd=html.indexOf(vgConstantsNs.COMP_END+compId+"\"", compIdStart+compId.length);
_cbdValidateClosingTag(compEnd, compId);
var compBodyEnd=compEnd;
var compClose=vgConstantsNs.COMP_CLOSE;
var compCloseLength=compClose.length;
compEnd=html.indexOf(compClose, compEnd)+compCloseLength+compCloseLength;
_cbdValidateClosingTag(compEnd, compId);
var compHtml=html.substring(compStart, compEnd);
var comp=document.getElementById(compId);
if(comp!=null)
{
compHtml=_cbdAddPostProcessJs(compId, compHtml);
if(compHtml.indexOf('partialUpdate="true"') > -1)
{
_cbdUpdateSmart(compHtml, caller.disableRowAlt);
}
else
{
var startIndex=html.indexOf(compOpen+compId+"\"");
compHtml=html.substring(html.indexOf(">",startIndex)+1, compBodyEnd);
jsCBDsetElementInnerHtml(compId, compHtml, 'replace', false, null, null, null, true);
}
}
(
function()
{
var componentId=compId.substring(vgConstantsNs.COMP_ID_PFX_LENGTH);
var componentHtml=compHtml;
cbd.loader.addCallback(
function updateCompSingle()
{
if(callback )
{
callback(componentId, componentHtml);
}
if(vg)
{
vg.html._fireCustomEvent(vg.event.DOM_CHANGE, componentId );
}
}
);
}
)();
}
if(typeof jsCBDprocessContentListeners!='undefined')
{
vg.util.execOnPageReady(function()
{
jsCBDprocessContentListeners();
}
);
}
}
if(callback!=null)
{
cbd.loader.addCallback(
function updateCompAll()
{
cbd.loader.addCallback(
function(){
callback(vgConstantsNs.ALL_COMPS_PROCESSED, null);
}
);
cbd.loader.load();
}
);
}
cbd.loader.addCallback(function(){window._ucCompleted=true;});
cbd.loader.load();
cbd.metrics.ajax=(new Date()).getTime() - startTime;
};
_cbdValidateClosingTag=function(compEnd, compId)
{
if(compEnd==-1)
{
var error="Cannot find the end of the Component for "+"'"+compId+"'"+" ";
vg.util.throwException('_updateComponentsHtml', error);
}
};
_cbdDestroyControllers=function(html)
{
var placeHolder=0;
var cmpHtml="";
while(placeHolder >=0&&placeHolder < html.length)
{
var cmpStart=html.indexOf('<span cmp="true"', placeHolder);
var cmpEnd=-1;
if(cmpStart >=0)
{
var idStart=html.indexOf('id="', cmpStart)+('id="').length;
var idEnd=html.indexOf('"', idStart);
var cmpId=html.substring(idStart, idEnd);
var comp=jsCBDgetControllerById(cmpId);
cmpEnd=html.indexOf(cmpId+'"', idEnd);
}
else
{
break;
}
placeHolder=cmpEnd;
}
};
_addSelectedListValuesToQueryStr=function(url, aSelectedList)
{
if(!RIA)
{
return;
}
var listItems=_getListItemsNoPad(aSelectedList);
var itemsLength=listItems.length;
for(var k=0;k<itemsLength;k++)
{
url=jsCBDaddQueryStringParam(url, aSelectedList.name , encodeURIComponent(listItems[k].value));
}
return url;
};
cbd.Navigator=new Object();
cbd.Navigator.historyCounter=0;
cbd.Navigator.onBack=null;
cbd.Navigator.onForward=null;
cbd.Navigator.onException=null;
cbd.Navigator.historyInit=false;
cbd.Navigator.EMPTY_HTML=EMPTY_HTML="<span></span>";
cbd.Navigator.CBD_CANCEL_LAYER_ID="cbdCancelLayerForm:cbdCancelLayer";
cbd.Navigator._openCBDCancelLayer=function()
{
"use strict";
vg.util.execOnPageReady(function(){cbd.Navigator._openCancelLayer();});
};
cbd.Navigator._openCancelLayer=function()
{
"use strict";
var cancelLayerNode=document.getElementById(cbd.Navigator.CBD_CANCEL_LAYER_ID),
navActivityToken,
urlParams,
cancelLayerUrl;
if(cancelLayerNode)
{
jsCBDopenLayer(cancelLayerNode.id);
}
else
{
navActivityToken=document.getElementById("cbdNavActivityToken").value;
urlParams="?responsive="+cbd.page.isResponsive+"&nextGen="+cbd.page.isNextGen+"&atoken="+navActivityToken;
cancelLayerUrl=jsCBDgetContextRoot()+"faces/com/vanguard/util/cbd/data/layouts/facelets/xmlhttp/cancelLayer.xhtml"+urlParams;
jsCBDloadContent(cancelLayerUrl,
"cbdCancelLayerContainer",
"replaceChildren",
function(){
jsCBDopenLayer(cbd.Navigator.CBD_CANCEL_LAYER_ID);
});
}
};
cbd.Navigator.initHistory=function(title)
{
this.historyInit=true;
var counterObj=vg.util.createNameValObj('counter', '0');
var onloadArray=[counterObj];
cbd.history.init(onloadArray, title, cbd.Navigator.historyCallback);
};
cbd.Navigator.initHistoryCallbacks=function()
{
this.onBack=null;
this.onForward=null;
this.onException=null;
};
cbd.Navigator.addHistoryCallbacks=function(callbacks)
{
if(callbacks.onBack!==undefined)
{
this.onBack=callbacks.onBack;
}
if(callbacks.onForward!==undefined)
{
this.onForward=callbacks.onForward;
}
if(callbacks.onException!==undefined)
{
this.onException=callbacks.onException;
}
};
cbd.Navigator._isButtonVisible=function(parentNode)
{
var parentElement=vg.html.findAncestor(parentNode,{}, function(node){if(node.style)return!jsCBDisVisibleElement(node);else return false;});
return parentElement==null;
};
cbd.Navigator.historyCallback=function(arg)
{
if(cbd.Navigator.historyCounter!=0)
{
if(arg.counter < cbd.Navigator.historyCounter)
{
if(this.onBack!=null)
{
this.onBack();
}
else
{
var backButtons=vg.html.getElements(document,{tagName:'input', attrName:'value', attrValue:'Back'}, function(node){return cbd.Navigator._isButtonVisible(node);});
if(backButtons.length==0)
{
backButtons=vg.html.getElements(document,{tagName:'input', attrName:'value', attrValue:'Previous'}, function(node){return cbd.Navigator._isButtonVisible(node);});
}
if(backButtons.length==1)
{
var parentContainer=vg.html.findAncestor(backButtons[0],
{tagName:'span', attrName:'tagname', attrValue:'button'});
if(parentContainer!=null)
{
jsCBDtriggerEventOnNode(parentContainer.id,'click');
}
}
else
{
if(this.onException!=null)
{
this.onException();
}
}
}
}
else if(arg.counter > cbd.Navigator.historyCounter)
{
if(this.onForward!=null)
{
this.onForward();
}
}
}
cbd.Navigator.historyCounter=arg.counter;
};
cbd.Navigator.addHistoryEvent=function()
{
cbd.Navigator.historyCounter++;
cbd.Navigator.initHistoryCallbacks();
cbd.history.add('counter',''+cbd.Navigator.historyCounter,document.title);
};
jsCBDScrollToTopOnTransition=function()
{
cbd.Navigator.scrollToTop=true;
};
cbd.Navigator.doTrans=function(cmdComp, validateOnClient, callback, userParams, syncAttr, disableButton)
{
var form=_cbdGetParentForm(cmdComp);
var formId=form.getAttribute("id");
var formAction=form.getAttribute("action");
var deck=vg.html.findAncestor(cmdComp,{tagName:"div", attrName:"selectedCardIdx"});
var deckId=deck.id;
var divs=vg.html.getElements(deck,{tagName:'div', attrName:'class', attrValue:'vg-deckCard'});
var cardId=divs[0].getAttribute('id');
var card=document.getElementById(cardId);
if(disableButton)
{
vg.button._disable(disableButton,true);
}
cbd.Navigator.userCallback=callback;
cbd.Navigator.deckId=deckId;
cbd.Navigator.cardId=cardId;
var isFormValid=true;
if(validateOnClient)
{
isFormValid=vg.validation.validateForm(form);
}
if(isFormValid)
{
vg.html.clearInputDefaultValues(form);
if(cbd.Navigator.historyInit)
{
setTimeout(function(){cbd.Navigator.addHistoryEvent();}, 10 );
}
if(vg.comp.isCommandComp(cmdComp))
{
vg.comp.trackCommandComponent(cmdComp);
_cbdDisableSubmitButton();
}
var params="";
params=jsCBDaddQueryStringParam(params, "CbdSpiTrans", "true");
params=jsCBDaddQueryStringParam(params, "CbdSpiFlow", "true");
params=jsCBDaddQueryStringParam(params, "CbdSpiDeckId", deckId);
if(userParams)
{
params=jsCBDaddQueryStringParam(params, null, userParams);
}
var contentNode=document.getElementById(cardId);
var deckContr=vg.comp.findController(contentNode, true);
var cback;
if(deckContr&&deckContr.isAnimated)
{
cback=
{
before:
function(){vg.html.setOpacity(document.getElementById(cardId), '0');},
after:
cbd.Navigator._processResponse
};
}
else
{
cback=cbd.Navigator._processResponse;
}
jsCBDupdateComponent({compIds:formId, caller:cmdComp, callback:cback, params:params, resetError:true, sync:syncAttr});
jsCBDclearMetaTag("error");
}
else if(disableButton)
{
vg.button._disable(disableButton,false);
}
return isFormValid;
};
cbd.Navigator.PROCESS_NAV_HOLDER_ID=PROCESS_NAV_HOLDER_ID="CBD_PROCESS_NAV";
cbd.Navigator.NAV_DECK_SUFFIX=NAV_DECK_SUFFIX="_navDeck";
cbd.Navigator._processResponse=function(compId, html, init)
{
var navDeckNode=document.getElementById(cbd.Navigator.deckId+"_navDeck"),
navDeck=(navDeckNode!==null&&(typeof navDeckNode!=="undefined"))?vg.comp.getController(navDeckNode):null,
navDeckProcNavNode=vg.html.getElement(_cbdGetProcNavHolder()),
callback=cbd.Navigator.userCallback,
procNavHolder,
procNavNode,
cardId,
cardController,
logPage,
comp,
form,
formAction;
if(vg.constants.ALL_COMPS_PROCESSED===compId)
{
procNavHolder=_cbdGetProcNavHolder();
procNavNode=vg.html.getElement(procNavHolder);
if(!cbd.Navigator.procNavHtmlReceived&&procNavNode!==null)
{
jsCBDsetElementInnerHtml(_cbdGetProcNavHolder(), cbd.Navigator.EMPTY_HTML);
if(navDeckNode!==null&&(typeof navDeckNode!=="undefined"))
{
jsCBDaddStyle(navDeckNode, "noProcNavUI");
}
}
cbd.Navigator.procNavHtmlReceived=false;
if(cbd.Navigator.initialLoadCompleted&&(navDeck!==null&&(typeof navDeck!=="undefined")))
{
navDeck.startNav();
}
cardId=cbd.Navigator.cardId;
cardController=vg.comp.getController(cardId);
if(cardController.isAnimated())
{
cardController.onTransCallback=cbd.Navigator.userCallback;
cardController.animate();
}
else if(callback!==null&&(typeof callback!=="undefined"))
{
callback(cardId);
}
cbd.Navigator.initialLoadCompleted=true;
}
else if(html.indexOf('type=\"ProcNav\"') > 0||html.indexOf('type=\"typeProcNav\"') > 0)
{
jsCBDsetElementInnerHtml(_cbdGetProcNavHolder(), html);
if(navDeckNode!==null&&(typeof navDeckNode!=="undefined"))
{
jsCBDdeleteStyle(navDeckNode, "noProcNavUI");
}
cbd.Navigator.procNavHtmlReceived=true;
if(html.indexOf("cbdMetaTags") > -1){
vg.util.execOnPageReady(vg.procNav._sendMetaTags(html));
}
}
else
{
cardId=cbd.Navigator.cardId;
logPage=true;
comp=document.getElementById(compId);
if(!comp)
{
jsCBDsetElementInnerHtml(cardId, html);
logPage=vg.wu.isLogSPIFirstPage();
}
else
{
formAction=_cbdGetNodesParentFormAction(comp);
vg.html._fireCustomEvent('CBD_NAVIGATOR_SPI_CHANGE', window,{formAction:formAction}, false);
}
if(vg.wu.isLogSPISndURLChg()&&logPage)
{
vg.util.execOnPageReady(function sendWebUsage()
{
formAction=_cbdGetNodesParentFormAction(compId);
jsCBDupdateDcsUri(formAction);
});
}
if(cbd.Navigator.scrollToTop)
{
document.body.scrollTop=0;
}
vg.util.execOnPageReady(function sendAdobe()
{
if(window.cbdWebAnalytics)
{
formAction=_cbdGetNodesParentFormAction(compId);
cbdWebAnalytics.trackSPIChange(formAction);
}
});
}
};
_cbdGetProcNavHolder=function()
{
var deck=(cbd.Navigator.cardId!=null)?document.getElementById(cbd.Navigator.cardId).parentNode.parentNode:null;
var navDeck=(cbd.Navigator.deckId!=null)?document.getElementById(cbd.Navigator.deckId+cbd.Navigator.NAV_DECK_SUFFIX):null;
var procNavLocation=null;
if(deck!=null)
{
procNavLocation=deck.getAttribute('procNavLocation');
}
else if(navDeck!=null)
{
procNavLocation=navDeck.getAttribute('procNavLocation');
}
if(procNavLocation==null)
{
var navDeckController=_cbdGetNavDeckController();
if(navDeckController!=null) procNavLocation=navDeckController.nodes['cbdProcNav'];
}
else
{
procNavLocation=document.getElementById(procNavLocation);
}
if(procNavLocation==null)
{
procNavLocation=cbd.Navigator.PROCESS_NAV_HOLDER_ID;
}
return(procNavLocation);
};
_cbdSetProcNavTabState=function(holderId,cStep,tSteps)
{
var procNavHolder=(holderId==null)?_cbdGetProcNavHolder():document.getElementById(holderId);
if(procNavHolder==null) return;
var tabNavDeck=vg.html.findAncestor(procNavHolder,{tagName:'div'}, function(node){return node.className&&node.className.indexOf("openAcct") >=0;});
if(tabNavDeck)
{
var tabNavDeckCont=vg.comp.getController(tabNavDeck);
}
if(cStep!=null&&tabNavDeckCont)
{
tabNavDeckCont.curServerSideTab=cStep;
tabNavDeckCont.totalTabs=tSteps;
}
if(tabNavDeck)
{
var itemSpanArr=vg.html.getElements(procNavHolder,{tagName:'span', attrName:'class', attrValue:'comp-navTabItem'});
var firstItem=itemSpanArr[0];
var lastItem=itemSpanArr[itemSpanArr.length-1];
var isFirstDivSelected=vg.html.getElements(firstItem,{tagName:'span', attrName:'class', attrValue:'current'}).length > 0;
var isLastDivSelected=vg.html.getElements(lastItem,{tagName:'span', attrName:'class', attrValue:'current'}).length > 0;
vg.html.removeStyle("firstTab", tabNavDeck);
vg.html.removeStyle("lastTab", tabNavDeck);
if(isFirstDivSelected )
{
vg.html.addStyle("firstTab", tabNavDeck);
}
else if(isLastDivSelected )
{
vg.html.addStyle("lastTab", tabNavDeck);
}
}
};
cbd.StateKeeper=new Object();
cbd.StateKeeper.queue=new Array();
cbd.StateKeeper._setState=function(compId, state, immediateStateKeeper )
{
if(immediateStateKeeper!=null&&!immediateStateKeeper)
{
var stateKeeper=document.getElementById(compId+":state");
if(stateKeeper!=null)
{
stateKeeper.value=state;
}
}
else
{
cbd.StateKeeper._enqueueState(compId, state );
cbd.StateKeeper._processEnqueuedStates();
}
};
cbd.StateKeeper._enqueueState=function(compId, st )
{
cbd.StateKeeper.queue.push({compid:compId, state:st});
};
cbd.StateKeeper._processEnqueuedStates=function()
{
var currentQueue=cbd.StateKeeper.queue;
cbd.StateKeeper.queue=[];
var requests=[];
for(var i=0;i < currentQueue.length;i++)
{
var obj=currentQueue[i];
var compId=obj.compid;
var state=obj.state;
var stateKeeper=document.getElementById(compId+":state");
if(stateKeeper!=null)
{
stateKeeper.value=state;
var myform=_cbdGetParentForm(stateKeeper);
if(myform!=null )
{
var request=null;
for(var j=0;j < requests.length;j++)
{
var irequest=requests[j];
if(irequest.form==myform )
{
request=irequest;
break;
}
}
if(!request )
{
request={
url:myform.getAttribute("action"),
form:myform,
params:jsCBDaddQueryStringParam('', "cbdCompId", "none")
};
requests.push(request );
}
request.params=jsCBDaddQueryStringParam(request.params, stateKeeper.name, stateKeeper.value);
request.params=jsCBDaddQueryStringParam(request.params, "isStateKeeper", "true");
}
}
}
for(var i=0;i < requests.length;i++)
{
var request=requests[i];
cbd.StateKeeper._processState(request.url, request.params );
}
};
cbd.StateKeeper._processState=function(url, params )
{
cbd.ajaxDispatcher.makeCall(cbd.StateKeeper._doProcessState, arguments );
};
cbd.StateKeeper._doProcessState=function(url, params )
{
var contentLoader=new cbd.ContentLoader(url, cbd.StateKeeper._setStateCallback, null);
contentLoader.setPost(true);
contentLoader.setParams(params.substring(1 ) );
contentLoader.sendRequest();
cbd.StateKeeper._setStateChanged();
};
cbd.StateKeeper._setStateChanged=function()
{
document.getElementById("CBD_STATE_CHANGED").value="1";
};
cbd.StateKeeper._isStateChanged=function()
{
return(document.getElementById("CBD_STATE_CHANGED").value=="1");
};
cbd.StateKeeper.refreshCache=function(formId, callback)
{
if(cbd.StateKeeper._isStateChanged())
{
jsCBDupdateComponent(formId, null, callback, null, false);
}
cbd.StateKeeper.refreshCache.enabled=false;
};
cbd.StateKeeper.isPageToBeRefreshed=function()
{
return cbd.StateKeeper.refreshCache.enabled&&cbd.StateKeeper._isStateChanged();
};
cbd.ajaxDispatcher=new Object();
cbd.ajaxDispatcher._queue=new Array();
cbd.ajaxDispatcher.makeCall=function(func, args)
{
var argsCopy=new Array();
argsCopy.push(func);
for(var i=0;i < args.length;++i)
{
argsCopy.push(args[i]);
}
if(!cbd.ContentLoader.isRequestInProgress())
{
cbd.ajaxDispatcher._makeCall(argsCopy);
}
else
{
cbd.ajaxDispatcher._enqueue(argsCopy);
}
};
cbd.ajaxDispatcher._enqueue=function(args)
{
cbd.ajaxDispatcher._queue.push(args);
if(cbd.ajaxDispatcher._queue.length==1)
{
setTimeout("cbd.ajaxDispatcher._checkQueue()", 100);
}
};
cbd.ajaxDispatcher._makeCall=function(args)
{
var func=args.shift();
func.apply(this, args);
};
cbd.ajaxDispatcher._checkQueue=function()
{
if(cbd.ajaxDispatcher._queue.length > 0)
{
if(cbd.ContentLoader.isRequestInProgress())
{
setTimeout("cbd.ajaxDispatcher._checkQueue()", 100);
return;
}
var args=cbd.ajaxDispatcher._queue.shift();
cbd.ajaxDispatcher._makeCall(args);
cbd.ajaxDispatcher._checkQueue();
}
};
_cbdUpdateSmart=function(html, disableRowAlt)
{
var holderDiv=document.createElement('div');
holderDiv.setAttribute('id', 'holder_smartUpdate');
holderDiv.innerHTML=html;
var table=holderDiv.getElementsByTagName('table')[0];
var tableId=table.getAttribute('id');
table.setAttribute('id', 'cbdTempTable');
var currTable=document.getElementById(tableId);
var flipperTable=_cbdIsFlipperTable(table);
while(table.rows.length!=0)
{
var newRow=table.rows[0];
var trIndex=newRow.getAttribute('index');
var status=newRow.getAttribute('status');
var flipperId=newRow.getAttribute('flipperid');
var tbodyId=newRow.getAttribute('tbodyid');
var container=currTable;
var newRowInsideFlipper=false;
if(flipperId!=null)
{
container=document.getElementById(flipperId);
newRowInsideFlipper=true;
}
if(tbodyId!=null&&flipperTable)
{
if(!document.getElementById(tbodyId))
{
var newtbody=document.createElement('tbody');
newtbody.setAttribute('id',tbodyId);
currTable.appendChild(newtbody);
}
container=document.getElementById(tbodyId);
}
if((status!='d')&&((container.rows.length==0&&flipperTable)||(trIndex >=currTable.rows.length&&!flipperTable)))
{
var firstTr=container.getElementsByTagName('tr')[0];
if(firstTr&&firstTr.parentNode.tagName=="TBODY")
{
container=firstTr.parentNode;
}
container.appendChild(newRow);
_processJS(newRow);
}
else if(status=='u')
{
trIndex=flipperTable?_cbdGetIndexForFlipperTable(currTable,trIndex):trIndex;
var oldRow=currTable.rows[trIndex];
var tbody=oldRow.parentNode;
tbody.replaceChild(newRow, oldRow);
if(!firefox||firefox5plus)
{
_processJS(newRow);
}
}
else if(status=='d')
{
trIndex=flipperTable?_cbdGetIndexForFlipperTable(currTable,trIndex):trIndex;
jsCBDtoggleElement(currTable.rows[trIndex], false);
table.deleteRow(0);
}
else if(status=='n')
{
var currRowAtIdxOfNewRow=null;
if(flipperTable)
{
var containerNode=newRowInsideFlipper?container:currTable;
var indx=_cbdGetIndexForFlipperTable(containerNode,trIndex);
currRowAtIdxOfNewRow=containerNode.rows[indx];
if(currRowAtIdxOfNewRow!=null)
{
containerNode.appendChild(newRow);
}
else
{
containerNode.insertBefore(newRow, currRowAtIdxOfNewRow);
}
}
else
{
currRowAtIdxOfNewRow=currTable.rows[trIndex];
var tbody=currRowAtIdxOfNewRow.parentNode;
tbody.insertBefore(newRow, currRowAtIdxOfNewRow);
}
_processJS(newRow);
}
_cbdResetIndex(currTable, trIndex);
}
if(flipperTable) _processJS(table);
if(disableRowAlt==null||!disableRowAlt)
{
_cbdResetAltRows(currTable);
}
};
_cbdResetIndex=function(tbody, startPosition)
{
for(var i=startPosition;i < tbody.rows.length;i++)
{
tbody.rows[i].setAttribute('index', i);
}
};
_cbdGetIndexForFlipperTable=function(table,trIndex)
{
var cnt=0;
var flipId=table.rows[0].getAttribute('flipperid');
var prevFlipId=flipId;
var tbodyId=table.rows[0].getAttribute('tbodyid');
var prevTbodyId=tbodyId;
for(var i=0;i<table.rows.length;i++)
{
var currFlipId=table.rows[i].getAttribute('flipperid');
var currTbodyId=table.rows[i].getAttribute('tbodyid');
if(currFlipId!=null&&currFlipId!=prevFlipId)
{
i+=_cbdGetIndexForFlipperTable(document.getElementById(currFlipId),-1);
}
else if(currTbodyId!=null&&prevTbodyId!=null&&currTbodyId!=prevTbodyId)
{
cnt++;
}
if(cnt==trIndex) return i;
cnt++;
prevFlipId=currFlipId;
prevTbodyId=currTbodyId;
}
return(i-1);
};
_cbdIsFlipperTable=function(table)
{
var tbodies=[];
vg.html.getElementsRec(tbodies, 1, table,{tagName:'tbody'});
if(tbodies.length >1) return true;
return false;
};
_cbdResetAltRows=function(tbody)
{
for(var i=0;i < tbody.rows.length;i++)
{
vg.html.replaceClass(tbody.rows[i],(i % 2!=0)?'ar':'wr',(i % 2!=0)?'wr':'ar');
}
};
_cbdGetNavDeckController=function()
{
if(cbd.Navigator.deckId!=null)
{
var navDeckSuffix=cbd.Navigator.NAV_DECK_SUFFIX;
var navDeckNode=document.getElementById(cbd.Navigator.deckId+navDeckSuffix);
return(navDeckNode!=null)?vg.comp.getController(cbd.Navigator.deckId+navDeckSuffix):null;
}
else
{
return null;
}
};
_parseCSRFToken=function(html)
{
var tokenUpdateStart="<span id=\"tokenUpdate\">",
tokenUpdateEnd="</span>",
tokenStart=-1,
tokenString="",
tokenSpanIdx=html.indexOf(tokenUpdateStart);
if(tokenSpanIdx > -1)
{
tokenStart=tokenSpanIdx+tokenUpdateStart.length;
tokenString=html.substring(tokenStart, html.indexOf(tokenUpdateEnd, tokenStart));
}
return tokenString;
};
cbd.Navigator._onConfirmCancel=function()
{
vg.html._fireCustomEvent(vg.event.CLOSE_CBD_CANCEL_LAYER);
vg.button.triggerClick('cbdCancelLayerForm:confirmCancel');
};


if(!window._cbdLooseFuncs)
{
_cbdLooseFuncs={};
}
handleErr=function(retVal, label_id, msg_id )
{
if(!css2 )
return T;
jsCBDdisplayError(label_id, msg_id,!retVal );
return retVal;
}
_cbdLooseFuncs.handleErr=handleErr;
jsCBDhasInputError=function(html )
{
if(html==null)
return false;
return html.indexOf("_initEM") >=0||html.indexOf("PAGE_ERROR") >=0;
}
jsCBDvalidateInputs=function(args)
{
var validFlag=true;
var inputIdPfx=args[2];
var start=args[4];
var end=args[5];
for(var i=start;i <=end;++i)
{
args[2]=inputIdPfx+i;
validFlag&=_validateInput(args);
}
return validFlag
}
function _validateInput(args)
{
var func=eval(args[0]);
var required=args[1];
var inputId=args[2];
var msgId=jsCBDgetErrMsgId(inputId);
var errListItemId=args[3];
var whitelist=(args.length >=5?args[4]:args[3]);
var additionalFuncArgs=args[5];
if(errListItemId!=null&&(errListItemId instanceof RegExp||errListItemId.indexOf('^') >=0) )
{
errListItemId="";
}
var input=document.getElementById(inputId);
if(input==null)
return;
var value;
if(_cbdIsRiaSelectOneMenu(input))
{
value=vg.comp.getController(input).valueInput.value
}
else
{
value=input.value;
if(isEmpty(trim(value) ))
{
value=input.value="";
}
}
if(vg.validation.isEmptyInput(input) )
{
if(jsCBDisDisabled(input)||!required )
{
jsCBDsetErrMessage(msgId, false);
return true;
}
else if(required)
{
jsCBDsetErrMessage(msgId, true);
return false;
}
}
var retVal=func(value, msgId, null, whitelist, additionalFuncArgs );
if(!isEmpty(errListItemId) )
{
jsCBDUpdateErrList(errListItemId,!retVal);
}
return retVal;
}
_cbdLooseFuncs._validateInput=_validateInput;
_cbdValidateTextArea=function(args)
{
var inputId=args[0],
whitelist=args[1],
required=args[2],
maxLength=args[3],
errId=args[4],
textArea=document.getElementById(inputId),
value=textArea.value,
valueLength=_getTextAreaCharacterCount(textArea),
msgId;
if(jsCBDisDisabled(textArea)||(!required&&isEmpty(value)) )
{
msgId=jsCBDgetErrMsgId(inputId);
jsCBDsetErrMessage(msgId, false);
return true;
}
if(required&&vg.validation.isEmptyInput(textArea))
{
msgId=jsCBDgetErrMsgId(inputId);
jsCBDsetErrMessage(msgId, true);
return false;
}
if((maxLength > 0)&&(valueLength > maxLength)){
msgId=jsCBDgetErrMsgId(inputId, errId);
jsCBDsetErrMessage(msgId, false);
return false;
}
return  _validateGenericInput(value, inputId, null, whitelist);
};
_cbdCheckTextAreaMaxChars=function(event, textArea, maxLength)
{
var value=textArea.value,
valueLength=_getTextAreaCharacterCount(textArea);
if(valueLength >=maxLength&&jsCBDisCharInserted(event.keyCode))
{
return false;
}
};
_cbdUpdateTextAreaCharCount=function(event, textArea, maxLength)
{
var value=textArea.value,
charTextElement=vg.html.getElement(textArea.id+":CharacterTextTable:CharacterText"),
charCountElement=vg.html.getElement(textArea.id+":CharacterTextTable:CharacterText:CharacterCount"),
valueLength=_getTextAreaCharacterCount(textArea);
charsRemaining=maxLength - valueLength;
if(charsRemaining >=0)
{
charTextElement.style.color="#666";
}
else
{
charTextElement.style.color="red";
}
charCountElement.innerHTML=charsRemaining;
};
_getTextAreaCharacterCount=function(textArea)
{
"use strict";
return(ieQuirksMode)?textArea.value.replace(/\r/g, '').length:textArea.value.length;
};
_cbdSMMhasOptions=function(args)
{
var menuId=args[0];
var msgId=jsCBDgetErrMsgId(menuId);
return handleErr(jsCBDcallMethodOnController(menuId, '_hasOptions',[menuId]), msgId );
}
function _validateSelection(args)
{
"use strict";
var menuId=args[0],
optionElement=args[1],
errListItemId=args[2],
isRequired=args[3],
msgId,
retVal;
if(isRequired===false)
{
msgId=jsCBDgetErrMsgId(menuId);
jsCBDsetErrMessage(msgId, false);
retVal=true;
}
else
{
retVal=jsCBDisOptionSelected(menuId, optionElement, errListItemId);
}
return retVal;
}
_cbdLooseFuncs._validateSelection=_validateSelection;
jsCBDisOptionSelected=function(menuId, optionElement, errListItemId)
{
var msgId=jsCBDgetErrMsgId(menuId);
var oneSelected=false;
var numOfDisabled=0;
var menuContainer=document.getElementById(menuId);
if(menuContainer==null)
return;
if(jsCBDisDisabled(menuContainer))
{
return true;
}
if(_cbdIsRiaSelectOneMenu(menuContainer))
{
return SelectOneMenu._hasValue(menuId);
}
var options=menuContainer.getElementsByTagName(optionElement);
if(options.length < 1) options=_cbdGetElementsByName(optionElement, menuId);
for(var i=0;i < options.length;i++)
{
if(options[i].checked||(options[i].selected&&options[i].value!="none") )
{
oneSelected=true;
break;
}
if(jsCBDisDisabled(options[i])||options[i].type=="hidden")
{
++numOfDisabled;
}
}
oneSelected=(oneSelected||(numOfDisabled==options.length&&numOfDisabled!=0) );
jsCBDsetErrMessage(msgId,!oneSelected );
if(!isEmpty(errListItemId)&&!oneSelected )
{
jsCBDUpdateErrList(errListItemId, true);
}
return oneSelected;
}
_cbdGetElementsByName=function(elementTag, elementsName)
{
var allElements=document.getElementsByTagName(elementTag);
var elements=new Array();
for(var i=0;i<allElements.length;i++)
{
if(elementsName==allElements[i].name)
{
elements.push(allElements[i]);
}
}
return elements;
}
jsCBDcomputeTotal=function(containerId, totalId, inpIdPfx, amount)
{
var total=0.0;
if(amount!=null){
amount=amount.toFixed(2);
isDollar=true;
}
else{
amount=100;
isDollar=false;
}
var inputContainer=document.getElementById(containerId);
var inputs=inputContainer.getElementsByTagName("input");
var val=0;
for(var i=0;i < inputs.length;i++)
{
inputId=inputs[i].getAttribute("id");
if(inputId==totalId)
{
continue;
}
if(inpIdPfx==null||(inputId!=null&&inputId.indexOf(inpIdPfx) >=0) )
{
val=inputs[i].value.replace(/\,/g,'');
if(_isDecimal(val)&&val!='.')
{
total+=parseFloat(val);
}
}
}
if(isDollar){
total=total.toFixed(2);
elmText=new String("$"+total);
}
else
{
total=Math.round(total*100)/100;
elmText=new String(total+"%");
}
jsCBDsetElementText(totalId, elmText);
var totalField=document.getElementById(totalId);
if(totalField.getAttribute("numberStyle"))
{
var POS_STYLE="number-positive";
var NEG_STYLE="number-neg";
jsCBDdeleteStyle(totalField, total!=amount?POS_STYLE:NEG_STYLE);
jsCBDaddStyle(totalField, total!=amount?NEG_STYLE:POS_STYLE);
}
return total;
}
function _validateExpectedResult(args)
{
var computeFunc=args[0];
var fieldId=args[1];
var errListItemId=args[2];
var expectedResult=args[3];
var errorFlag=false;
var actualResult=eval(computeFunc);
if(expectedResult==null )
{
expectedResult=100.0;
}
if(!isEmpty(errListItemId) )
{
jsCBDUpdateErrList(errListItemId, actualResult!=expectedResult);
}
jsCBDsetErrMessage(jsCBDgetErrMsgId(fieldId), actualResult!=expectedResult);
return parseFloat(actualResult)==parseFloat(expectedResult);
}
_cbdLooseFuncs._validateExpectedResult=_validateExpectedResult;
jsCBDnotEmpty=function(value, msg_id)
{
return!jsCBDisEmpty(value, msg_id);
}
function _validateSecurityAnswerInput(s, label_id, msg_id, whitelist)
{
var isMT=isEmpty(s);
var isValid=false;
var msg_id=null;
handleErr(true, jsCBDgetErrMsgId(label_id, isMT?"INVALID_CHAR":null));
if(!isMT)
{
if(s.indexOf('  ') >=0)
{
isValid=false;
}
else
{
isValid=_validateGenericInputChars(s,whitelist);
}
msg_id="INVALID_CHAR";
}
handleErr(isValid, jsCBDgetErrMsgId(label_id, msg_id));
return isValid;
}
_cbdLooseFuncs._validateSecurityAnswerInput=_validateSecurityAnswerInput;
function _validateGenericInput(s, label_id, msg_id, whitelist)
{
var isMT=isEmpty(s);
handleErr(true, jsCBDgetErrMsgId(label_id, isMT?"INVALID_CHAR":null));
var isValid=isMT?false:_validateGenericInputChars(s,whitelist);
var msg_id=isMT?null:"INVALID_CHAR";
handleErr(isValid, jsCBDgetErrMsgId(label_id, msg_id));
return isValid;
}
_cbdLooseFuncs._validateGenericInput=_validateGenericInput;
function _validateGenericInputChars(s, whitelist)
{
if(whitelist!=null)
{
if(whitelist.length > 0)
{
whitelist=new RegExp(whitelist);
}
}
else
{
whiteliststr="/^[a-zA-Z0-9|%20|\\.|_|\-|%|#|@|&|\*|\(|\)|\,|\+|\$|\?|\!|\:|\[|\]|\\|\^|\{|\}|\||`|\"|~|=|>]*$/";
whitelist=new RegExp(whiteliststr);
}
return whitelist.test(s)
}
_cbdLooseFuncs._validateGenericInputChars=_validateGenericInputChars;
function _validateBlacklist(args)
{
return _validateRegExp(args);
}
_cbdLooseFuncs._validateBlacklist=_validateBlacklist;
function _validateWhitelist(args)
{
return _validateRegExp(args);
}
_cbdLooseFuncs._validateWhitelist=_validateWhitelist;
function _validateRegExp(args)
{
var v=document.getElementById(args[0]).value;
var b=args[1].test(v);
jsCBDsetErrMessage(jsCBDgetErrMsgId(args[0], args[2]),!b);
return b;
}
_cbdLooseFuncs._validateRegExp=_validateRegExp;
isLetter=function(c)
{
return(((c>="a")&&(c<="z") )||((c >="A" )&&(c<="Z" )));
}
_cbdLooseFuncs.isLetter=isLetter;
isLetterOrDigit=function(c)
{
return(isLetter(c)||isDigit(c));
}
_cbdLooseFuncs.isLetterOrDigit=isLetterOrDigit;
isAlphabetic=function(s, label_id, msg_id)
{
return handleErr(_isAlphabetic(s), label_id, msg_id );
}
_cbdLooseFuncs.isAlphabetic=isAlphabetic;
_isAlphabetic=function(s)
{
s=trim(s);
var p=/^([a-zA-Z])+$/;
return p.test(s);
}
_cbdLooseFuncs._isAlphabetic=_isAlphabetic;
_cbdIsNumeric=function(args)
{
var inputId=args[0];
var required=args[1];
var errListItemId=args[2];
var minDigits=args[3];
var maxDigits=args[4];
var input=document.getElementById(inputId);
var msgId=jsCBDgetErrMsgId(inputId);
if(input==null)
return;
var value=input.value;
var length=value.length;
if(jsCBDisDisabled(input)||!required&&isEmpty(value) )
{
jsCBDsetErrMessage(msgId, false);
return true;
}
var isValidLength=length >=minDigits&&((maxDigits > 0&&length <=maxDigits)||maxDigits <=0);
var retVal=_isNumeric(value)&&isValidLength;
var isNum=_isNumeric(value);
if(!isNum||!isValidLength)
{
jsCBDsetErrMessage(msgId,true);
}
if(!isEmpty(errListItemId))
{
jsCBDUpdateErrList(errListItemId,!retVal);
}
return retVal;
}
isNumeric=function(s, label_id, msg_id)
{
return handleErr(_isNumeric(s), label_id, msg_id );
}
_cbdLooseFuncs.isNumeric=isNumeric;
function _isNumeric(s)
{
s=trim(s);
var p=/^[\d]+$/;
return p.test(s);
}
_cbdLooseFuncs._isNumeric=_isNumeric;
_cbdValidateNumberInt=function(args)
{
var inputId=args[0];
var required=args[1];
var errListItemId=args[2];
var minValue=args[3];
var maxValue=args[4];
var input=document.getElementById(inputId);
var msgId=jsCBDgetErrMsgId(inputId);
if(input==null)
return;
var value=input.value;
if(jsCBDisDisabled(input)||!required&&isEmpty(value) )
{
jsCBDsetErrMessage(msgId, false);
return true;
}
var isValidValue=value >=minValue&&((maxValue > 0&&value <=maxValue)||maxValue <=0);
var retVal=_isNumberInt(value)&&isValidValue;
jsCBDsetErrMessage(msgId,!retVal);
if(!isEmpty(errListItemId))
{
jsCBDUpdateErrList(errListItemId,!retVal);
}
return retVal;
}
function _isNumberInt(s)
{
s=trim(s);
var p=/^[\d]{1,3}((,[\d]{3})*|[\d]*)$/;
return p.test(s);
}
_cbdLooseFuncs._isNumberInt=_isNumberInt;
isDecimal=function(s, label_id, msg_id)
{
s=removeChars(s, ",");
return handleErr(_isDecimal(s), label_id, msg_id );
}
_cbdLooseFuncs.isDecimal=isDecimal;
isDecimalAllowNeg=function(s, label_id, msg_id)
{
s=removeChars(s, ",");
return handleErr(_isDecimal(s, true), label_id, msg_id );
}
_cbdLooseFuncs.isDecimalAllowNeg=isDecimalAllowNeg;
function _isDecimal(s, allowNeg)
{
"use strict";
var anyDecimal=/^-?[\d]+\.?[\d]*$/,
nonNegDecimal=/^[\d]+\.?[\d]*$/,
nonNegAfterDecimal=/^\..?[\d]*$/;
s=trim(s);
if(s.indexOf('.')===0)
{
s="0"+s;
}
if(s.indexOf('-.')===0)
{
s=s.replace("-.", "-0.");
}
return allowNeg?anyDecimal.test(s):nonNegDecimal.test(s)||nonNegAfterDecimal.test(s);
}
_cbdLooseFuncs._isDecimal=_isDecimal;
isPositiveDecimal=function(s, label_id, msg_id)
{
return handleErr(_isPositiveDecimal(s), label_id, msg_id );
}
_cbdLooseFuncs.isPositiveDecimal=isPositiveDecimal;
function _isPositiveDecimal(s)
{
s=removeChars(s, ",");
return _isDecimal(s)&&s > 0;
}
_cbdLooseFuncs._isPositiveDecimal=_isPositiveDecimal;
isNonNegativeDecimal=function(s, label_id, msg_id)
{
return handleErr(_isNonNegativeDecimal(s), label_id, msg_id );
}
_cbdLooseFuncs.isNonNegativeDecimal=isNonNegativeDecimal;
function _isNonNegativeDecimal(s)
{
s=removeChars(s, ",");
return _isDecimal(s)&&(s >=0);
}
_cbdLooseFuncs._isNonNegativeDecimal=_isNonNegativeDecimal;
_cbdIsValidDecimal=function(args)
{
var inputId=args[0];
var required=args[1];
var errListItemId=args[2];
var maxValue=args[3];
var input=document.getElementById(inputId);
var msgId=jsCBDgetErrMsgId(inputId,errListItemId);
if(input==null) return;
var value=input.value;
value=removeChars(value, ",");
if(jsCBDisDisabled(input)||!required&&isEmpty(value) )
{
jsCBDsetErrMessage(msgId, false);
return true;
}
var retVal=((value<=parseFloat(maxValue)));
jsCBDsetErrMessage(msgId,!retVal);
if(!isEmpty(errListItemId))
{
jsCBDUpdateErrList(errListItemId,!retVal);
}
return retVal;
}
_cbdIsPercent=function(args)
{
var inputId=args[0];
var required=args[1];
var errListItemId=args[2];
var allowNeg=args[3];
var minValue=args[4];
var maxValue=args[5];
var allowDec=args[6];
var input=document.getElementById(inputId);
var msgId=jsCBDgetErrMsgId(inputId);
if(input==null)
return;
var value=input.value;
if(jsCBDisDisabled(input)||!required&&isEmpty(value) )
{
jsCBDsetErrMessage(msgId, false);
return true;
}
var retVal;
var isValidValue=false;
var lowerBoundary;
var upperBoundary;
if(minValue!=-999)
{
lowerBoundary=minValue;
}
else if(allowNeg)
{
lowerBoundary=-100;
}
else
{
lowerBoundary=0;
}
if(maxValue!=-999)
{
upperBoundary=maxValue;
}
else
{
upperBoundary=100;
}
if(value >=lowerBoundary&&value <=upperBoundary)
{
isValidValue=true;
}
var hasInvalidDecimal=!allowDec&&(value.indexOf('.') >=0);
retVal=handleErr(!hasInvalidDecimal&&_isDecimal(value, allowNeg)&&isValidValue, msgId );
if(!isEmpty(errListItemId))
{
jsCBDUpdateErrList(errListItemId,!retVal);
}
return retVal;
}
_cbdIsDate=function(args)
{
var inputId=args[0];
var strtDay=args[1];
var endDay=args[2];
var satSel=(args[3]=='true');
var sunSel=(args[4]=='true');
var blkDts=args[5];
var msgIdRng="DATE_INPUT_RANGE_ERR";
var msgIdSel="DATE_INPUT_SELECTION_ERR";
var input=document.getElementById(inputId);
var retVal=true;
if(!input||!input.value) return true;
var valueDt=new Date(_insertDateSeparators(input.value));
var isValidDtRng=true;
if(!isEmpty(strtDay))
{
var strtDt=new Date(strtDay);
isValidDtRng=!isNaN(strtDt.valueOf())&&(valueDt.valueOf() >=strtDt.valueOf());
}
if(isValidDtRng&&!isEmpty(endDay))
{
var endDt=new Date(endDay);
isValidDtRng=!isNaN(endDt.valueOf())&&(valueDt.valueOf() <=endDt.valueOf());
}
if(!isValidDtRng)
{
handleErr(true, jsCBDgetErrMsgId(inputId));
handleErr(true, jsCBDgetErrMsgId(inputId, msgIdSel));
retVal=handleErr(false, jsCBDgetErrMsgId(inputId, msgIdRng));
}
if(isValidDtRng)
{
var isValidDtSel=true;
if(!satSel)
{
isValidDtSel=valueDt.getDay()!=6;
}
if(isValidDtSel&&!sunSel)
{
isValidDtSel=valueDt.getDay()!=0;
}
if(!isValidDtSel)
{
handleErr(true, jsCBDgetErrMsgId(inputId));
handleErr(true, jsCBDgetErrMsgId(inputId, msgIdRng));
retVal=handleErr(false, jsCBDgetErrMsgId(inputId, msgIdSel));
}
}
if(isValidDtRng&&isValidDtSel)
{
var isValidDtBlk=true;
if(!isEmpty(blkDts))
{
var dtArr=blkDts.split(",");
for(i=0;i < dtArr.length;i++)
{
var blkDt=new Date(dtArr[i]);
isValidDtBlk=!isNaN(blkDt.valueOf())&&(valueDt.valueOf()!=blkDt.valueOf());
if(!isValidDtBlk)
{
handleErr(true, jsCBDgetErrMsgId(inputId));
handleErr(true, jsCBDgetErrMsgId(inputId, msgIdRng));
retVal=handleErr(false, jsCBDgetErrMsgId(inputId, msgIdSel));
break;
}
}
}
}
return retVal;
}
isAlphaNumeric=function(s, label_id, msg_id, extendedDomain)
{
return handleErr(_isAlphaNumeric(s, extendedDomain), label_id, msg_id );
}
_cbdLooseFuncs.isAlphaNumeric=isAlphaNumeric;
function _isAlphaNumeric(s, extendedDomain)
{
s=trim(s);
if(isEmpty(s))
return F;
if(extendedDomain==null )
{
extendedDomain="";
}
var i, c;
var length=s.length;
for(i=0;i < length;i++)
{
c=s.charAt(i);
if(!(isLetter(c)||isDigit(c))&&(extendedDomain.indexOf(c)==-1) )
return F;
}
return T;
}
_cbdLooseFuncs._isAlphaNumeric=_isAlphaNumeric;
_betweenAgeRange=function(params)
{
var min=params[0];
var max=params[1];
var today=params[2];
var input=document.getElementById(params[3]);
if(!input||!input.value) return true;
var inputArray=input.value.split("/");
var inputMonth=parseInt(inputArray[0]-1);
var inputDay=parseInt(inputArray[1]);
var inputYear=parseInt(inputArray[2]);
var todayArray=today.split("/");
var todayMonth=parseInt(todayArray[0]);
var todayDay=parseInt(todayArray[1]);
var todayYear=parseInt(todayArray[2]);
var minDate=new Date(todayYear-min,todayMonth,todayDay);
var isYounger=min&&_isAfter(minDate, inputYear, inputMonth, inputDay);
var maxDate=new Date(todayYear-max,todayMonth,todayDay);
var isOlder=max&&_isBefore(maxDate, inputYear, inputMonth, inputDay);
if(isYounger)
{
jsCBDsetErrMessage(jsCBDgetErrMsgId(input.id, "YOUNGER_THAN_MIN"), true );
return false;
}
if(isOlder)
{
jsCBDsetErrMessage(jsCBDgetErrMsgId(input.id, "OLDER_THAN_MAX"), true );
return false;
}
return true;
}
_cbdLooseFuncs._betweenAgeRange=_betweenAgeRange;
_isBefore=function(dateObj, year, month, day)
{
if(dateObj!=null)
{
if(year > dateObj.getFullYear())
{
return false;
}
else if(year==dateObj.getFullYear()&&month > dateObj.getMonth())
{
return false;
}
else if(year==dateObj.getFullYear()&&month==dateObj.getMonth()&&day > dateObj.getDate())
{
return false;
}
else
{
return true;
}
}
}
_cbdLooseFuncs._isBefore=_isBefore;
_isAfter=function(dateObj, year, month, day)
{
if(dateObj!=null)
{
if(year < dateObj.getFullYear())
{
return false;
}
else if(year==dateObj.getFullYear()&&month < dateObj.getMonth())
{
return false;
}
else if(year==dateObj.getFullYear()&&month==dateObj.getMonth()&&day < dateObj.getDate())
{
return false;
}
else
{
return true;
}
}
}
_cbdLooseFuncs._isAfter=_isAfter;
isDate=function(year, month, day, label_id, msg_id)
{
return handleErr(_isDate(year, month, day), label_id, msg_id);
}
_cbdLooseFuncs.isDate=isDate;
function _isDate(year, month, day)
{
var c=new Date(year, month - 1, day);
if(year.length!=4||
c.getMonth()!=month-1||
c.getDate()!=day||
c.getFullYear()!=year)
{
return F;
}
return T;
}
_cbdLooseFuncs._isDate=_isDate;
isDate2=function(date, label_id, msg_id)
{
return handleErr(_isDate2(date), label_id, msg_id );
}
_cbdLooseFuncs.isDate2=isDate2;
function _isDate2(date)
{
date=trim(date);
if(isWhitespace(date)||hasSpaces(date))
{
return F;
}
var length=date.length;
if(length < 6||length > 10)
return F;
var day, month, year;
var delimiter="";
var index=0;
if((index=date.indexOf("/")) >=1 )
{
delimiter="/";
}
else if((index=date.indexOf("-")) >=1 )
{
delimiter="-";
}
if(delimiter!="")
{
month=date.substring(0, index);
day=date.substring(index+1, index=date.indexOf(delimiter, index+1));
year=date.substring(index+1);
}
else
{
month=date.substring(0, 2);
day=date.substring(2, 4);
year=date.substring(4);
}
return _isDate(year, month, day);
}
_cbdLooseFuncs._isDate2=_isDate2;
function _validateDateLessThanToday(input)
{
var date=document.getElementById(input);
var value;
if(date!=null)
{
value=date.value;
}
else
{
value=input;
}
var formattedDate=_insertDateSeparators(value);
var currDate=new Date();
var enteredDate=new Date(formattedDate);
var validDate=(enteredDate < currDate);
if(date!=null)
{
jsCBDsetErrMessage(jsCBDgetErrMsgId(input, "LESS_THAN_TODAY"),!validDate );
}
return validDate;
}
_cbdLooseFuncs._validateDateLessThanToday=_validateDateLessThanToday;
isBirthDate=function(date, label_id, msg_id)
{
return handleErr(_isBirthDate(date), label_id, msg_id );
}
_cbdLooseFuncs.isBirthDate=isBirthDate;
function _isBirthDate(date)
{
return _isDate2(date)&&_validateDateLessThanToday(date);
}
_cbdLooseFuncs._isBirthDate=_isBirthDate;
isMonthYear=function(date, label_id, msg_id)
{
return handleErr(_isMonthYear(date), label_id, msg_id );
}
_cbdLooseFuncs.isMonthYear=isMonthYear;
function _isMonthYear(date)
{
date=trim(date);
if(isWhitespace(date)||hasSpaces(date))
{
return F;
}
var length=date.length;
if(length < 6||length > 7)
return F;
var day, month, year;
var delimiter="";
var index=0;
if((index=date.indexOf("/")) >=1 )
{
delimiter="/";
}
else if((index=date.indexOf("-")) >=1 )
{
delimiter="-";
}
day=01;
if(delimiter!="")
{
month=date.substring(0, index);
year=date.substring(index+1);
}
else
{
month=date.substring(0, 2);
year=date.substring(2);
}
return _isDate(year, month, day);
}
_cbdLooseFuncs._isMonthYear=_isMonthYear;
isYear=function(year, label_id, msg_id)
{
return handleErr(_isYear(year), label_id, msg_id );
}
_cbdLooseFuncs.isYear=isYear;
function _isYear(year)
{
year=trim(year);
if(isWhitespace(year)||hasSpaces(year))
{
return F;
}
var length=year.length;
if(length!=4)
{
return F;
}
return _isDate(year, 1, 1);
}
_cbdLooseFuncs._isYear=_isYear;
isTime=function(time, label_id, msg_id)
{
var result=time.match("(^((0[1-9]|[1-9])|(1[0-2])):{0,1}([0-5][0-9])$)");
if(result==null)
{
return handleErr(false, label_id, msg_id );
}
else
{
return handleErr(true, label_id, msg_id );
}
}
_cbdLooseFuncs.isTime=isTime;
isTimeWithSeconds=function(time, label_id, msg_id)
{
var result=time.match("(^((0[1-9]|[1-9])|(1[0-2])):{0,1}([0-5][0-9]):{0,1}([0-5][0-9])$)");
if(result==null)
{
return handleErr(false, label_id, msg_id );
}
else
{
return handleErr(true, label_id, msg_id );
}
}
_cbdLooseFuncs.isTimeWithSeconds=isTimeWithSeconds;
isMilitaryTimeWithSeconds=function(time, label_id, msg_id)
{
var result=time.match("(^((0[0-9]|[0-9])|(1[0-9])|(2[0-3]))::{0,1}([0-5][0-9])::{0,2}([0-5][0-9])$)");
return handleErr(result!=null, label_id, msg_id );
}
isMilitaryTime=function(time, label_id, msg_id)
{
var result=time.match("(^((0[0-9]|[0-9])|(1[0-9])|(2[0-3])):{0,1}([0-5][0-9])$)");
return handleErr(result!=null, label_id, msg_id );
}
_cbdLooseFuncs.isMilitaryTime=isMilitaryTime;
isName=function(s, label_id, msg_id, whiteList)
{
return handleErr(_isName(s, whiteList), label_id, msg_id);
}
_cbdLooseFuncs.isName=isName;
function _isName(s, whiteList)
{
s=trim(s);
return whiteList.test(s);
}
_cbdLooseFuncs._isName=_isName;
isUserName=function(s, label_id, msg_id)
{
return handleErr(_isUserName(s), label_id, msg_id);
}
_cbdLooseFuncs.isUserName=isUserName;
function _isUserName(s)
{
s=trim(s);
var p=/^[a-zA-Z0-9]+$/;
return s.length >=6&&s.length <=12&&p.test(s);
}
_cbdLooseFuncs._isUserName=_isUserName;
isPassword=function(s, label_id, msg_id, whitelist, argsObj)
{
"use strict";
var min=(argsObj)?argsObj.min:undefined,
max=(argsObj)?argsObj.max:undefined;
return handleErr(_isPassword(s, min, max), label_id, msg_id);
};
_cbdLooseFuncs.isPassword=isPassword;
function _isPassword(str, minLength, maxLength)
{
"use strict";
var passwordStr=trim(str),
length=passwordStr.length,
min=minLength||6,
max=maxLength||10,
validPw=length >=min&&length <=max&&_isAlphaNumeric(passwordStr);
return validPw;
}
_cbdLooseFuncs._isPassword=_isPassword;
isPasswordMaint=function(s, label_id, msg_id, whitelist, argsObj)
{
"use strict"
var min=(argsObj)?argsObj.min:undefined,
max=(argsObj)?argsObj.max:undefined;
return handleErr(_isPasswordMaint(s, min, max), label_id, msg_id);
};
_cbdLooseFuncs.isPasswordMaint=isPasswordMaint;
function _isPasswordMaint(str, minLength, maxLength)
{
"use strict";
var password=trim(str),
length=password.length,
nums=0,
alphas=0,
min=minLength||6,
max=maxLength||10,
i,
validPw,
char;
for(i=0;i < length;++i)
{
char=password.charAt(i);
if(_isNumeric(char) )
{
nums++;
}
else if(_isAlphabetic(char) )
{
alphas++;
}
else
{
return false;
}
}
validPw=nums >=2&&alphas >=2&&length >=min&&length <=max;
return validPw;
}
_cbdLooseFuncs._isPasswordMaint=_isPasswordMaint;
isPasswordEnhanced=function(s, label_id, msg_id, whitelist, argsObj)
{
"use strict";
var min=(argsObj)?argsObj.min:undefined,
max=(argsObj)?argsObj.max:undefined;
return handleErr(_isPasswordEnhanced(s, min, max), label_id, msg_id);
};
_cbdLooseFuncs.isPasswordEnhanced=isPasswordEnhanced;
function _isPasswordEnhanced(str, minLength, maxLength)
{
"use strict";
var password=trim(str),
allowedChars="~`!@#$%^&*()-_+=[{]}\"\\|:'.?,/<>;",
min=minLength||6,
max=maxLength||10,
length=password.length,
validPw=length >=min&&length <=max&&_isAlphaNumeric(password,allowedChars);
return validPw;
}
_cbdLooseFuncs._isPasswordEnhanced=_isPasswordEnhanced;
isPasswordMaintEnhanced=function(s, label_id, msg_id, whitelist, argsObj)
{
"use strict";
var min=(argsObj)?argsObj.min:undefined,
max=(argsObj)?argsObj.max:undefined;
return handleErr(_isPasswordMaintEnhanced(s, min, max), label_id, msg_id);
};
_cbdLooseFuncs.isPasswordMaintEnhanced=isPasswordMaintEnhanced;
function _isPasswordMaintEnhanced(str, minLength, maxLength)
{
"use strict";
var password=trim(str),
length=password.length,
nums=0,
alphas=0,
min=minLength||6,
max=maxLength||10,
i,
validPw,
char;
if(!_isPasswordEnhanced(password, min, max))
{
return false;
}
for(i=0;i < length;i++)
{
char=password.charAt(i);
if(_isNumeric(char) )
{
nums++;
}
else if(_isAlphabetic(char) )
{
alphas++;
}
}
validPw=nums >=2&&alphas >=2;
return validPw;
}
_cbdLooseFuncs._isPasswordMaintEnhanced=_isPasswordMaintEnhanced;
validateSize=function(s, size, label_id, msg_id)
{
return handleErr(_validateSize(s, size), label_id, msg_id );
}
_cbdLooseFuncs.validateSize=validateSize;
function _validateSize(s, size)
{
return s.length==size;
}
_cbdLooseFuncs._validateSize=_validateSize;
isEmail=function(s, label_id, msg_id)
{
return handleErr(_isEmail(s), label_id, msg_id );
}
_cbdLooseFuncs.isEmail=isEmail;
isMultipleEmail=function(s, label_id, msg_id)
{
return handleErr(_isMultipleEmail(s), label_id, msg_id );
}
_cbdLooseFuncs.isMultipleEmail=isMultipleEmail;
function _isEmail(s)
{
s=trim(s);
if(s.length > 100)
{
return false;
}
var p=/^[a-zA-Z0-9_\-%'\+]([a-zA-Z0-9_\.\-%'\+])*\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,10})$/;
return p.test(s);
}
_cbdLooseFuncs._isEmail=_isEmail;
function _isMultipleEmail(s)
{
var email=s.split(',');
for(var i=0;i < email.length;i++)
{
if(!_isEmail(email[i]))
{
return false;
}
}
return true;
}
_cbdLooseFuncs._isMultipleEmail=_isMultipleEmail;
isAddress=function(s, label_id, msg_id)
{
return handleErr(_isAddress(s), label_id, msg_id);
}
_cbdLooseFuncs.isAddress=isAddress;
function _isAddress(s)
{
s=trim(s);
var p=/^[a-zA-Z0-9.#\,\-\s\'\+\&\(\)\/]+$/;
return p.test(s);
}
_cbdLooseFuncs._isAddress=_isAddress;
isTIN=function(tin, label_id, msg_id)
{
return handleErr(_isTIN(tin), label_id, msg_id );
}
_cbdLooseFuncs.isTIN=isTIN;
function _isTIN(tin)
{
return _isSSN(tin)||_isEIN(tin);
}
_cbdLooseFuncs._isTIN=_isTIN;
isSSN=function(ssn, label_id, msg_id)
{
return handleErr(_isSSN(ssn), label_id, msg_id );
}
_cbdLooseFuncs.isSSN=isSSN;
isMaskedSSN=function(ssn, label_id, msg_id)
{
return handleErr(_isMaskedSSN(ssn), label_id, msg_id );
}
_cbdLooseFuncs.isSSN=isSSN;
function _isMaskedSSN(ssn)
{
ssn=trim(ssn);
var p1=/^[\*]{3}-[\*]{2}-[0-9]{4}$/;
var p2=/^[\*]{3}[\*]{2}[0-9]{4}$/;
return p1.test(ssn)||p2.test(ssn)||_isSSN(ssn);
}
function _isSSN(ssn)
{
ssn=trim(ssn);
var p1=/^[\d]{3}-[0-9]{2}-[0-9]{4}$/;
var p2=/^[\d]{9}$/;
return p1.test(ssn)||p2.test(ssn);
}
_cbdLooseFuncs._isSSN=_isSSN;
isEIN=function(ein, label_id, msg_id)
{
return handleErr(_isEIN(ein), label_id, msg_id );
}
_cbdLooseFuncs.isEIN=isEIN;
function _isEIN(ein)
{
ein=trim(ein);
var p=/^[\d]{2}-?[0-9]{7}$/;
return p.test(ein);
}
_cbdLooseFuncs._isEIN=_isEIN;
isDollar=function(value, label_id, msg_id)
{
return handleErr(_isDollar(value), label_id, msg_id);
}
_cbdLooseFuncs.isDollar=isDollar;
function _isDollar(value, allowNeg)
{
value=trim(value);
if(isWhitespace(value)||hasSpaces(value))
{
return F;
}
if(allowNeg&&value.charAt(0)=="-")
{
value=value.substring(1);
}
var p1=/^[\d]{1,3}(,[\d]{3})*([\.][\d]{0,2})?$/;
var p2=/^[\d]{1,3}([\d]{3})*([\.][\d]{0,2})?$/;
var p3=/^[\d]{0,3}([\d]{3})*([\.][\d]{1,2})?$/;
return(p1.test(value)||p2.test(value))||p3.test(value);
}
_cbdLooseFuncs._isDollar=_isDollar;
_cbdIsDollar=function(args)
{
var inputId=args[0];
var required=args[1];
var errListItemId=args[2];
var allowNeg=args[3];
var minValue=args[4];
var maxValue=args[5];
var input=document.getElementById(inputId);
var msgId=jsCBDgetErrMsgId(inputId);
if(input==null)
return;
var value=input.value;
if(jsCBDisDisabled(input)||!required&&isEmpty(value) )
{
jsCBDsetErrMessage(msgId, false);
return true;
}
var isValidValue=true;
var numValue=removeChars(value, ",");
var minMaxMsgId=jsCBDgetErrMsgId(inputId, "MIN_MAX_ERR_MSG");
var minMaxMsgSet=false;
if(document.getElementById(minMaxMsgId)!=null)
{
minMaxMsgSet=true;
}
isValidValue=_isDollar(value, allowNeg);
if(minValue )
{
isMinValid=numValue >=minValue;
if(minMaxMsgSet&&isValidValue&&!isMinValid)
{
msgId=minMaxMsgId;
}
isValidValue=isValidValue&&isMinValid;
}
if(maxValue)
{
isMaxValid=numValue <=maxValue;
if(minMaxMsgSet&&isValidValue&&!isMaxValid)
{
msgId=minMaxMsgId;
}
isValidValue=isValidValue&&isMaxValid;
}
var retVal=handleErr(isValidValue, msgId );
if(!isEmpty(errListItemId))
{
jsCBDUpdateErrList(errListItemId,!retVal);
}
return retVal;
}
isUSPhone=function(value, label_id, msg_id)
{
return handleErr(_isUSPhone(value), label_id, msg_id);
}
_cbdLooseFuncs.isUSPhone=isUSPhone;
function _isUSPhone(phone)
{
phone=trim(phone);
var p1=/^[\d]{10}$/;
var p2=/^[\d]{3}-[\d]{3}-[\d]{4}$/;
var p3=/^\([\d]{3}\)[\s]?[\d]{3}-[\d]{4}$/;
var p4=/^[\d]{3}.[\d]{3}.[\d]{4}$/;
return p1.test(phone)||p2.test(phone)||p3.test(phone)||p4.test(phone);
}
_cbdLooseFuncs._isUSPhone=_isUSPhone;
function _isInternationalPhoneNumber(s)
{
if(isEmpty(s))
{
return false;
}
s=trim(s);
s=removeChars(s,"()- ");
if(s.length < 10)
{
return false;
}
return _isNumeric(s);
}
_cbdLooseFuncs._isInternationalPhoneNumber=_isInternationalPhoneNumber;
getNumericDollarAmount=function(dollarAmount)
{
return removeChars(dollarAmount, ",");
}
_cbdLooseFuncs.getNumericDollarAmount=getNumericDollarAmount;
removeChars=function(str, charsToRemove)
{
size=str.length;
buf="";
for(var i=0;i < size;i++)
{
if(charsToRemove.indexOf(str.charAt(i)) < 0)
{
buf+=str.charAt(i);
}
}
return buf;
}
_cbdLooseFuncs.removeChars=removeChars;
isInternationalPhoneNumber=function(value, label_id, msg_id)
{
return handleErr(_isInternationalPhoneNumber(value), label_id, msg_id);
}
_cbdLooseFuncs.isInternationalPhoneNumber=isInternationalPhoneNumber;
isZip=function(value, label_id, msg_id)
{
return handleErr(_isZip(value), label_id, msg_id);
}
_cbdLooseFuncs.isZip=isZip;
function _isZip(zip)
{
zip=trim(zip);
var p1=/^[\d]{5}$/;
var p2=/^[\d]{5}-?[\d]{4}$/;
return p1.test(zip)||p2.test(zip);
}
_cbdLooseFuncs._isZip=_isZip;
trim=function(s)
{
if(isEmpty(s))
{
return s;
}
return s.replace(/^\s+|\s+$/g,"");
}
_cbdLooseFuncs.trim=trim;
hasSpaces=function(s)
{
var p=/[\s]+/;
return p.test(s);
}
_cbdLooseFuncs.hasSpaces=hasSpaces;
jsCBDformatNumber=function(field, precision, showDecimalZeros, showCommas, removeLeadingZero, showZeros)
{
'use strict';
var num=getNumericDollarAmount(field.value),
neg=false,
wholeNumber="",
dot,
decimalNumber="",
validDecimal,
currChar,
i,
numLength;
if(parseFloat(num)<0)
{
neg=true;
num=Math.abs(parseFloat(num)).toString();
}
if(typeof(showCommas)==="undefined")
{
showCommas=true;
}
if(typeof(showDecimalZeros)==="undefined")
{
showDecimalZeros=true;
}
if(typeof(precision)==="undefined")
{
precision=2;
}
if(precision <=5&&precision >=0)
{
dot=num.indexOf(".");
if(dot!==-1)
{
decimalNumber=num.substring(dot+1,num.length);
num=num.substring(0,dot);
}
validDecimal=_isNumeric(decimalNumber);
if(_isNumeric(num)||validDecimal )
{
if(showCommas)
{
numLength=num.length;
for(i=0;i < numLength;i++)
{
currChar=num.charAt(i);
if(i!==0&&((numLength - i) % 3 )===0)
{
wholeNumber+=",";
}
wholeNumber+=currChar;
}
}
else
{
wholeNumber=num;
}
if(validDecimal||decimalNumber==="" )
{
while(precision > decimalNumber.length)
{
decimalNumber+="0";
}
}
decimalNumber=decimalNumber.substring(0,precision);
if(!showDecimalZeros&&decimalNumber==="00")
{
decimalNumber="";
}
if(typeof(showZeros)==="undefined")
{
showZeros=true;
}
if(showZeros===false&&((decimalNumber===null)?true:
(decimalNumber.replace(/0/g,"").length===0)) )
{
decimalNumber="";
}
if(firefox)
{
field.prevVal=field.value;
}
if(decimalNumber==="")
{
field.value=wholeNumber;
}
else if(removeLeadingZero&&wholeNumber==="0" )
{
field.value="."+decimalNumber;
}
else
{
field.value=wholeNumber+"."+decimalNumber;
}
if(neg)
{
field.value="-"+field.value;
}
}
else
{
field.prevVal=undefined;
}
}
};
_cbdEnforcePrecision=function(node, event, prec, enforceMaxLength)
{
var key=jsCBDgetKey(event);
if(key==37||key==39||key==13||key==9||key==8||key==46||key==35||key==36||_cbdIsTextSelected(node))
{
return true;
}
var value=trim(node.value);
var dotIndex=value.indexOf(".");
var cursorPos=_getCaretPosition(node);
if(dotIndex!=-1&&cursorPos > dotIndex)
{
var numCharsAfterDot=value.length - dotIndex;
if(prec < numCharsAfterDot)
{
return false;
}
}
if(enforceMaxLength)
{
var precisionLength=prec;
if(precisionLength!=0)
{
precisionLength++;
}
var numCharsBeforeDot=dotIndex==-1?value.length:dotIndex;
var potentialLength=numCharsBeforeDot+precisionLength;
if(potentialLength >=node.getAttribute("maxLength"))
{
var beforePeriod=cursorPos <(dotIndex+1);
if((dotIndex==-1||beforePeriod)&&key!=190)
{
return false;
}
}
}
}
_cbdLooseFuncs._cbdEnforcePrecision=_cbdEnforcePrecision;
_cbdIsTextSelected=function(input)
{
if(document.selection)
{
var sel=document.selection.createRange();
return sel.text.length > 0;
}
else
{
return input.selectionEnd > input.selectionStart;
}
}
_cbdLooseFuncs._cbdIsTextSelected=_cbdIsTextSelected;
isUSBankAccountNumber=function(value, label_id, msg_id, whitelist)
{
return handleErr(_isUSBankAccountNumber(value,whitelist), label_id, msg_id);
}
_cbdLooseFuncs.isUSBankAccountNumber=isUSBankAccountNumber;
function _isUSBankAccountNumber(acctNum, whitelist)
{
return whitelist.test(acctNum)&&/^.*[0-9].*$/.test(acctNum)&&!/^[0]*$/.test(acctNum);
}
_cbdLooseFuncs._isUSBankAccountNumber=_isUSBankAccountNumber;
isUSBankRoutingNumber=function(value, label_id, msg_id)
{
return handleErr(_isUSBankRoutingNumber(value), label_id, msg_id);
}
_cbdLooseFuncs.isUSBankRoutingNumber=isUSBankRoutingNumber;
jsCBDisUSBankRoutingNumber=function(acctNum)
{
return _isUSBankRoutingNumber(acctNum);
}
_cbdLooseFuncs.jsCBDisUSBankRoutingNumber=jsCBDisUSBankRoutingNumber;
function _isUSBankRoutingNumber(acctNum)
{
acctNum=trim(acctNum);
var p=/^[\d]{9}$/;
return p.test(acctNum);
}
_cbdLooseFuncs._isUSBankRoutingNumber=_isUSBankRoutingNumber;
function _setAutoFormat(inputId, func, activate)
{
if(func==null)
{
return;
}
var input=document.getElementById(inputId);
if(input==null)
return;
if(activate)
{
input.autoFormat=function(event){vg.validation.autoFormat(jsCBDgetKey(event), func, input.value, inputId)};
vg.html.addEventListener(input, 'keyup', input.autoFormat, 'autoFormat');
}
else
{
vg.html.removeEventListenerById(input, 'autoFormat');
}
}
_cbdLooseFuncs._setAutoFormat=_setAutoFormat;
function _synchValues(func, val)
{
func.dataSource.value=val;
func.dataSource.oldVal=val;
}
_cbdLooseFuncs._synchValues=_synchValues;
BSP=8;
DEL=46;
LAR=37;
RAR=39;
function _inSync(func, key, bypassDelBSP)
{
var currVal=func.dataSource.value;
if(((key==BSP||key==DEL)&&!bypassDelBSP)||
key==LAR|key==RAR)
{
return true;
}
return func.dataSource.oldVal==currVal;
}
_cbdLooseFuncs._inSync=_inSync;
function _formatSsn(key)
{
var func=_formatSsn;
if(_inSync(func, key))
{
return;
}
var pattern=/-/g;
var rawData=func.dataSource.value.replace(pattern, "");
var ssn="";
for(var i=0;i < rawData.length;++i)
{
ssn+=rawData.charAt(i);
if(i==2||i==4 )
{
ssn+="-";
}
}
_synchValues(func, ssn);
}
_cbdLooseFuncs._formatSsn=_formatSsn;
function _formatDate(key)
{
var func=_formatDate;
var inputElement=func.dataSource;
if(_inSync(func, key) )
{
return;
}
var caret=_getCaretPosition(inputElement);
var rawData=inputElement.value;
var date=_insertDateSeparators(rawData);
if(rawData.length!=date.length&&caret!=null )
{
caret+=date.length - rawData.length;
}
_synchValues(func, date);
if(vg.html.hasFocus(inputElement) )
{
_setCaretPosition(inputElement,caret);
}
}
_cbdLooseFuncs._formatDate=_formatDate;
function _insertDateSeparators(dateInput)
{
var pattern=/[-\/]/g;
var rawData=dateInput.replace(pattern, "");
var date="";
var pattern1=/^([\d])[-/]/g;
var pattern2=/^([\d]{2})[-/]([\d])[-/]/g;
var pattern3=/^([\d]{2})[-/]([\d]{1})[-/]([\d]{4})/g;
var pattern4=/^([\d]{1})[-/]([\d]{2})[-/]([\d]{4})/g;
var pattern5=/^([\d]{1})[-/]([\d]{1})[-/]([\d]{4})/g;
var slash1=false;
var slash2=false;
if(pattern3.test(dateInput))
{
slash1=true;
slash2=true;
rawData=dateInput.replace(pattern3, "$1/0$2/$3");
}
else if(pattern4.test(dateInput))
{
slash1=true;
slash2=true;
rawData=dateInput.replace(pattern4, "0$1/$2/$3");
}
else if(pattern3.test(dateInput)||pattern4.test(dateInput))
{
return dateInput;
}
else if(pattern1.test(dateInput))
{
slash1=true;
if(pattern5.test(dateInput))
{
slash2=true;
}
rawData=dateInput.replace(pattern1, "0$1/");
}
else if(pattern2.test(dateInput))
{
slash2=true;
rawData=dateInput.replace(pattern2, "$1/0$2/");
}
for(var i=0;i < rawData.length;++i)
{
date+=rawData.charAt(i);
if(i==1&&!slash1&&!slash2)
{
date+="/";
}
else if(i==3&&!slash2)
{
date+="/";
}
}
return date;
}
_cbdLooseFuncs._insertDateSeparators=_insertDateSeparators;
function _formatTime(key)
{
_formatTimeHelper(key, _formatTime, false);
}
_cbdLooseFuncs._formatTime=_formatTime;
function _formatTimeWithSeconds(key)
{
_formatTimeHelper(key, _formatTimeWithSeconds, true);
}
_cbdLooseFuncs._formatTimeWithSeconds=_formatTimeWithSeconds;
function _formatTimeHelper(key, func, seconds)
{
var inputElement=func.dataSource;
var caret=_getCaretPosition(inputElement);
var rawData=inputElement.value;
var time=_insertTimeSeparators(inputElement, seconds);
if(rawData.length!=time.length&&caret!=null )
{
caret+=time.length - rawData.length;
}
_synchValues(func, time);
if(vg.html.hasFocus(inputElement) )
{
_setCaretPosition(inputElement,caret);
}
}
_cbdLooseFuncs._formatTimeHelper=_formatTimeHelper;
function _insertTimeSeparators(input, seconds)
{
var currVal=input.value,
fixHourPattern=/^([\d]{1})[:]/,
fixMinPattern=/[:]([\d]{1})[:]/,
fixLastPattern=/[:]([\d]{1})$/,
colonsPattern=/[:]/g;
currVal=currVal.replace(fixHourPattern, "0$1:");
if(seconds)
{
currVal=currVal.replace(fixMinPattern, ":0$1:");
}
if(!vg.html.hasFocus(input) )
{
currVal=currVal.replace(fixLastPattern, ":0$1");
}
currVal=currVal.replace(colonsPattern, "");
currVal=currVal.replace(/(.{2})/,"$1:");
if(seconds)
{
currVal=currVal.replace(/(.{5})/,"$1:");
}
return currVal;
}
_cbdLooseFuncs._insertTimeSeparators=_insertTimeSeparators;
function _getCaretPosition(field)
{
if(!vg.html.hasFocus(field) )
{
return null;
}
var caretPos=0;
if(document.selection)
{
field.focus();
var sel=document.selection.createRange();
sel.moveStart('character', -field.value.length);
caretPos=sel.text.length;
}
else if(field.selectionStart||field.selectionStart=='0')
{
caretPos=field.selectionStart;
}
return(caretPos);
}
_cbdLooseFuncs._getCaretPosition=_getCaretPosition;
function _setCaretPosition(field, pos)
{
if(field.setSelectionRange)
{
field.focus();
field.setSelectionRange(pos,pos);
}
else if(field.createTextRange)
{
var range=field.createTextRange();
range.collapse(true);
range.moveEnd('character', pos);
range.moveStart('character', pos);
range.select();
}
}
_cbdLooseFuncs._setCaretPosition=_setCaretPosition;
function _formatMonthYear(key)
{
var func=_formatMonthYear;
if(_inSync(func, key) )
{
return;
}
var rawData=func.dataSource.value;
var date=_insertMonthYearSeparator(rawData);
_synchValues(func, date);
}
_cbdLooseFuncs._formatMonthYear=_formatMonthYear;
function _insertMonthYearSeparator(dateInput)
{
var pattern=/[-\/]/g;
var rawData=dateInput.replace(pattern, "");
var date="";
var pattern1=/^([\d])[-/]/g;
var slash1=false;
if(pattern1.test(dateInput))
{
slash1=true;
rawData=dateInput.replace(pattern1, "0$1/");
}
for(var i=0;i < rawData.length;++i)
{
date+=rawData.charAt(i);
if(i==1&&!slash1)
{
date+="/";
}
}
return date;
}
_cbdLooseFuncs._insertMonthYearSeparator=_insertMonthYearSeparator;
function _formatPhone(key)
{
var func=_formatPhone;
if(_inSync(func, key) )
{
return;
}
var p=/[-()]/g;
var rawData=func.dataSource.value.replace(p, "");
var phone="";
for(var i=0;i < rawData.length;++i)
{
phone+=rawData.charAt(i);
if(i==2||i==5 )
{
phone+="-";
}
}
_synchValues(func, phone);
}
_cbdLooseFuncs._formatPhone=_formatPhone;
function _formatUsPhone(key)
{
var func=_formatUsPhone;
if(_inSync(func, key) )
{
return;
}
var pattern=/[-()\s]/g;
var rawData=func.dataSource.value;
var data=rawData.replace(pattern, "");
var phone="";
var pattern1=/^[(]$/g;
var hasBracket=pattern1.test(rawData);
if(hasBracket)
{
data=rawData;
}
for(var i=0;i < data.length;++i)
{
if(i==0&&!hasBracket)
{
phone+="(";
phone+=data.charAt(i);
}
else if(i==2)
{
phone+=data.charAt(i);
phone+=") ";
}
else if(i==5)
{
phone+=data.charAt(i);
phone+="-";
}
else
{
phone+=data.charAt(i);
}
}
_synchValues(func, phone);
}
_cbdLooseFuncs._formatUsPhone=_formatUsPhone;
function _formatZip(key)
{
var func=_formatZip;
if(_inSync(func, key) )
{
return;
}
var pattern2=/-/g;
var rawData=func.dataSource.value;
var data=rawData.replace(pattern2, "");
var zip="";
var pattern1=/^[\d]{5}[-]$/g;
var containsDash=false;
if(pattern1.test(rawData) )
{
containsDash=true;
data=rawData;
}
for(var i=0;i < data.length;++i)
{
zip+=data.charAt(i);
if(i==4&&data.length > 5&&!containsDash)
{
zip+="-";
}
}
_synchValues(func, zip);
}
_cbdLooseFuncs._formatZip=_formatZip;
function _formatEin(key)
{
var func=_formatEin;
if(_inSync(func, key) )
{
return;
}
var pattern=/-/g;
var rawData=func.dataSource.value;
var data=rawData.replace(pattern, "");
var ein="";
for(var i=0;i < data.length;++i)
{
ein+=data.charAt(i);
if(i==1)
{
ein+="-";
}
}
_synchValues(func, ein);
}
_cbdLooseFuncs._formatEin=_formatEin;
function _formatDollar(key)
{
var func=_formatDollar;
if(_inSync(func, key, true))
{
return;
}
var inputElement=func.dataSource;
var value=inputElement.value;
if(isEmpty(value)||key==9||key==16)
{
return;
}
var isNegative=/^-{1}/.test(value);
var pattern=/^-?0*/;
value=value.replace(pattern, "");
var data=((value.length==0)&&!isNegative)||/^\./.test(value)?"0"+value:value;
var dollar=getNumericDollarAmount(data);
dollar=trim(dollar);
var spanElement=vg.html.findAncestor(inputElement,{tagName:"span"});
if(!spanElement)
{
return null;
}
var showCommas=spanElement.getAttribute('showCommas');
var formattedValue=showCommas?"":dollar;
var decimal=dollar.indexOf('.');
var formattedValueLength=decimal >=0?decimal:dollar.length;
var cursorAtEnd=false;
var caret=_getCaretPosition(inputElement);
cursorAtEnd=(caret==func.dataSource.value.length);
var numOfDigitsBeforeCursor=_cbdGetNumberOfDigitsBeforeCursor(value,caret);
if(showCommas)
{
for(var i=0;i < formattedValueLength;i++)
{
var currChar=dollar.charAt(i);
if(i!=0&&(formattedValueLength - i) % 3==0 )
{
formattedValue+=",";
}
formattedValue+=currChar;
}
if(decimal >=0)
{
formattedValue+=dollar.substring(decimal);
}
}
if(isNegative)
{
formattedValue='-'+formattedValue;
}
_synchValues(func, formattedValue);
if(vg.html.hasFocus(inputElement) )
{
var aPosition=_cbdGetCursorPositionByDigit(formattedValue, numOfDigitsBeforeCursor);
if(cursorAtEnd&&formattedValue!=null)
{
aPosition=formattedValue.length;
}
_setCaretPosition(inputElement,aPosition);
}
}
_cbdLooseFuncs._formatDollar=_formatDollar;
function _cbdGetNumberOfDigitsBeforeCursor(aValue, aCursorPosition)
{
var aNumOfDigits=0;
if(!isEmpty(aValue)&&!isEmpty(aCursorPosition) )
{
for(var i=0;i< aCursorPosition;i++)
{
var aChar=aValue.charAt(i);
if(_isNumeric(aChar)||aChar==".")
{
aNumOfDigits++;
}
}
}
return aNumOfDigits;
}
function _cbdGetCursorPositionByDigit(aValue, numOfDigits )
{
var aPosition=0;
if(!isEmpty(aValue)&&!isEmpty(numOfDigits) )
{
var num=0;
for(var i=0;i< aValue.length;i++)
{
var aChar=aValue.charAt(i);
if(_isNumeric(aChar)||aChar==".")
{
num++;
if(num==numOfDigits)
{
aPosition=i+1;
break;
}
}
}
}
return aPosition;
}
validateBene=function(args)
{
var inputId=args[0];
var rootId=inputId.replace(/_[a-zA-Z]*$/, "" );
var nameId=rootId+"_name";
var relId=rootId+"_rel";
var pctId=rootId+"_pct";
var name=document.getElementById(nameId).value;
var rel=document.getElementById(relId).value;
var pct=document.getElementById(pctId).value;
if(!isEmpty(name)||!isEmpty(pct)||rel.toLowerCase()!="none")
{
var msgId=jsCBDgetErrMsgId(inputId);
var suffix=inputId.replace(/^[a-zA-Z0-9:_-]*_/, "" );
switch(suffix)
{
case "name":
return isName(name, msgId);
case "rel":
return jsCBDisOptionSelected(inputId, "option");
case "pct":
return isDecimal(pct, msgId);
}
}
else
{
jsCBDsetErrMessage(jsCBDgetErrMsgId(nameId), false);
jsCBDsetErrMessage(jsCBDgetErrMsgId(relId), false);
jsCBDsetErrMessage(jsCBDgetErrMsgId(pctId), false);
return true;
}
}
_cbdLooseFuncs.validateBene=validateBene;
validateRequired=function(id, skipErrSummary)
{
var isRequired;
var propSpan=document.getElementById(id+"_propSpan");
if(propSpan)
{
isRequired=propSpan.getAttribute("required");
}
isValid=(!isRequired||isRequired=="false");
if(!isValid)
{
var msgId=jsCBDgetErrMsgId(id);
jsCBDdisplayError(msgId, null, true);
if(!skipErrSummary)
{
jsCBDupdateErrSummary();
}
}
return isValid;
}


if(!window.cbd )
{
cbd={};
}
cbd.getYUI=function()
{
return cbd.YUI;
};
cbd.loader={};
cbd.loader.callbacks=[];
cbd.loader.modules={};
cbd.loader.currentRequires=[];
if(!cbd.page.basePageLoaded)
{
cbd.loader.pageReadyConditions=['LOADER', 'PAGE_LOAD'];
}
else
{
cbd.loader.pageReadyConditions=['LOADER'];
}
cbd.loader.loadRunning=false;
cbd.loader.pageReady=!RIA;
cbd.loader.pendingCallbacks=[];
cbd.loader.pendingRequires=[];
if(!window.loaderWebBase )
{
if(window.cbd.page._cbdContentDomain)
{
window.loaderWebBase=window.cbd.page._cbdContentDomain;
}
else
{
window.loaderWebBase='';
}
}
if(!window.loaderWebContextRoot){
window.loaderWebContextRoot=_cbdWebContextRoot;
}
var loader_cbd_path=_cbdGetDebugFlag('loader_cbd_path' );
if(loader_cbd_path!=='enabled'&&loader_cbd_path!=='' )
{
window.loaderWebBase=loader_cbd_path;
}
if(!window.yuiBase )
{
window.yuiBase=loaderWebBase+loaderWebContextRoot+'/yui/build/';
}
var loader_yui_path=_cbdGetDebugFlag('loader_yui_path' );
if(loader_yui_path!='enabled'&&loader_yui_path!='' )
{
yuiBase=loader_yui_path;
}
cbd.loader.initModules=function()
{
"use strict";
var loader=cbd.loader,
loadRollups,
i;
loader.addModule({
name:'cbdLayer',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/Layer.js'
});
loader.addModule({
name:'cbdInfoBox',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/InfoBox.js'
});
loader.addModule({
name:'cbdHLayer',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/HLayer.js'
});
loader.addModule({
name:'cbdNavBox',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/NavBox.js'
});
loader.addModule({
name:'cbdFlipper',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/Flipper.js'
});
loader.addModule({
name:'cbdSliderTab',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/SliderTab.js'
});
loader.addModule({
name:'cbdSelectOneMenu',
type:'js',
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/SelectOneMenu.js'
});
loader.addModule({
name:'cbdListGrid',
type:'js',
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/ListGrid.js'
});
loader.addModule({
name:'cbdListGridStyle',
type:'css',
fullpath:loaderWebBase+loaderWebContextRoot+'/stylesheet/listGrid.css'
});
loader.addModule({
name:'cbdHLayerStyle',
type:'css',
fullpath:loaderWebBase+loaderWebContextRoot+'/stylesheet/hLayer.css'
});
loader.addModule({
name:'cbdFloatHeads',
type:'js',
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/floatHeads.js'
});
loader.addModule({
name:'cbdSlider',
type:'js',
requires:['resize','slider'],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/Slider.js'
});
loader.addModule({
name:'cbdCalendar',
type:'js',
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/Calendar.js'
});
loader.addModule({
name:'cbdSelectListComp',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/SelectListComp.js'
});
loader.addModule({
name:'cbdCalendarStyle',
type:'css',
fullpath:loaderWebBase+loaderWebContextRoot+'/stylesheet/calendar.css'
});
loader.addModule({
name:'cbdNGCalendarStyle',
type:'css',
fullpath:loaderWebBase+loaderWebContextRoot+'/stylesheet/calendar-ng.css'
});
loader.addModule({
name:'cbdFundBox',
type:'js',
requires:['dd-drop', 'dd-constrain'],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/fundBox.js'
});
loader.addModule({
name:'cbdExtLockGrid',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/extjs/examples/ux/LockingGridView.js'
});
loader.addModule({
name:'cbdExtLockGridCSS',
type:'css',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/extjs/examples/ux/css/LockingGridView.css'
});
loader.addModule({
name:'cbdCharts',
type:'js',
requires:['cbdChartsRender','cbdPlsAdapter'],
fullpath:cbd.page._cbdCommonPath+'charts/charting.js'
});
loader.addModule({
name:'cbdChartsRender',
type:'js',
requires:['cbdPlsAdapter'],
fullpath:cbd.page._cbdCommonPath+'charts/ChartRenderer.js'
});
loader.addModule({
name:'cbdSimpleCharts',
type:'js',
requires:['cbdCharts','cbdPlsAdapter'],
fullpath:cbd.page._cbdCommonPath+'charts/simpleCharts.js'
});
loader.addModule({
name:'cbdComplexCharts',
type:'js',
requires:['cbdCharts'],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/complexCharts.js'
});
loader.addModule({
name:'cbdToolTip',
type:'js',
requires:[],
fullpath:cbd.page._cbdCommonPath+'charts/ToolTip.js'
});
loader.addModule({
name:'excanvas',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/excanvas/excanvas-min.js'
});
loader.addModule({
name:'cbdPaginator',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/Paginator.js'
});
loader.addModule({
name:'cbdCarousel',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/carousel.js'
});
loader.addModule({
name:'cbdCarouselPE',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/carouselPE.js'
});
loader.addModule({
name:'cbdContentExpander',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/ContentExpander.js'
});
loader.addModule({
name:'cbdResponsiveImage',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/ResponsiveImage.js'
});
loader.addModule({
name:'cbdTreeView',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/TreeView.js'
});
loader.addModule({
name:'cbdLeftNav',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/LeftNav.js'
});
loader.addModule({
name:'cbdLinkBar',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/LinkBar.js'
});
loader.addModule({
name:'cbdCommandLinkBar',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/CommandLinkBar.js'
});
loader.addModule({
name:'cbdAlertBox',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/AlertBox.js'
});
loader.addModule({
name:'cbdSideTab',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/SideTab.js'
});
loader.addModule({
name:'cbdAccordion',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/Accordion.js'
});
loader.addModule({
name:'cbdNineBoxFilter',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/NineBoxFilter.js'
});
loader.addModule({
name:'cbdFlyoutContainer',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/FlyoutContainer.js'
});
loader.addModule({
name:'cbdTabBox',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/TabBox.js'
});
loader.addModule({
name:'cbdMenuPlugin',
type:'js',
requires:['node', 'classnamemanager', 'plugin', 'event-focus', 'event-touch'],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/menuPlugin.js'
});
loader.addModule({
name:'cbdGHMenuPlugin',
type:'js',
requires:['cbdMenuPlugin'],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/GHMenuPlugin.js'
});
loader.addModule({
name:'cbdHistory',
type:'js',
requires:['history-hash'],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/history.js'
});
loader.addModule({
name:'cbdVideo',
type:'js',
requires:['cbdFlashVideo', 'cbdHtmlVideo', 'cbdMediaCSS'],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/Video.js'
});
loader.addModule({
name:'cbdFlashVideo',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/FlashVideo.js'
});
loader.addModule({
name:'cbdHtmlVideo',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/HtmlVideo.js'
});
loader.addModule({
name:'cbdMediaCSS',
type:'css',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/stylesheet/mediaPlayer.css'
});
loader.addModule({
name:'cbdAudio',
type:'js',
requires:['cbdMediaCSS'],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/Audio.js'
});
loader.addModule({
name:'cbdAdjustablePanel',
type:'js',
requires:[],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/adjustablePanel.js'
});
loader.addModule({
name:'RIA',
type:'js',
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/ria.js'
});
loader.addModule({
name:'AJAX',
type:'js',
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/ajaxFunctions.js'
});
loader.addModule({
name:'RIAStyle',
type:'css',
fullpath:loaderWebBase+loaderWebContextRoot+'/stylesheet/RIA.css'
});
loader.addModule({
name:'RIAStyleHostedApp',
type:'css',
fullpath:loaderWebBase+loaderWebContextRoot+'/stylesheet/RIA1.css'
});
loader.addModule({
name:'VGIStyleHostedApp',
type:'css',
fullpath:loaderWebBase+loaderWebContextRoot+'/stylesheet/VGI1.css'
});
loader.addModule({
name:'VG',
type:'js',
requires:['event', 'node'],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/vg.js'
});
loader.addModule({
name:'FORMCHECK',
type:'js',
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/FormCheck.js'
});
loader.addModule({
name:'cbdDebug',
type:'js',
requires:['tabview', 'logger', 'autocomplete'],
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/debug.js'
});
loadRollups=_cbdIsEnabled('loader_rollups' );
cbd.loader.rollupFiles=['cbdTabBox', 'cbdLayer', 'cbdInfoBox', 'cbdSelectOneMenu', 'cbdCalendar', 'cbdSliderTab', 'cbdSelectListComp', 'cbdTreeView', 'cbdLeftNav', 'cbdNavBox', 'cbdLinkBar', 'cbdAlertBox', 'cbdSideTab', 'cbdAccordion', 'cbdNineBoxFilter', 'cbdAdjustablePanel'];
cbd.loader.rollupVideoFiles=['cbdHtmlVideo', 'cbdFlashVideo', 'cbdVideo'];
cbd.loader.rollupChartingFiles=['cbdCharts', 'cbdChartsRender', 'cbdSimpleCharts', 'cbdToolTip'];
cbd.loader.rollupFilesHash=[];
for(i=0;i < loader.rollupFiles.length;i++)
{
loader.rollupFilesHash[loader.rollupFiles[i]]=true;
}
cbd.loader.rollupChartingFilesHash=[];
for(i=0;i < loader.rollupChartingFiles.length;i++)
{
loader.rollupChartingFilesHash[loader.rollupChartingFiles[i]]=true;
}
if(loadRollups )
{
loader.addModule({
name:'cbdAllComp',
type:'js',
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/all.js',
supersedes:cbd.loader.rollupFiles,
rollup:1
});
loader.addModule({
name:'cbdAllVideo',
type:'js',
fullpath:loaderWebBase+loaderWebContextRoot+'/javascript/comp/allVideo.js',
supersedes:cbd.loader.rollupVideoFiles,
rollup:1
});
loader.addModule({
name:'cbdAllCharts',
type:'js',
fullpath:cbd.page._cbdCommonPath+'rollup/allCharts.js',
supersedes:cbd.loader.rollupChartingFiles,
rollup:1
});
}
if(!cbd.getYUI())
{
if(!window.YUI)
{
loader.requestYUIFallback();
}
else
{
loader.initYUI();
}
}
}
cbd.loader.insertDynamicScript=function(id, src, callback)
{
var scriptBlock=document.createElement("script");
scriptBlock.setAttribute("id", id);
scriptBlock.setAttribute("type", "text/javascript");
if(ie)
{
scriptBlock.onreadystatechange=function()
{
var rs=this.readyState;
if('loaded'===rs||'complete'===rs)
{
scriptBlock.onreadystatechange=null;
callback();
}
};
}
else
{
scriptBlock.onload=callback;
}
scriptBlock.setAttribute("src", src);
document.getElementsByTagName('head')[0].appendChild(scriptBlock);
}
cbd.loader.requestYUIFallback=function()
{
var origSrc,
origScript=document.getElementById("yuiBaseModules");
if(origScript)
{
origSrc=origScript.getAttribute("src");
}
var newSrc=origSrc.replace(cbd.page._cbdYuiComboBase, cbd.page._cbdYuiComboBaseBackup);
cbd.loader.insertDynamicScript("yuiBaseModulesFallback", newSrc, cbd.loader.fallBackLoaded);
}
cbd.loader.fallBackLoaded=function()
{
cbd.loader.initYUI();
cbd.loader.load();
}
cbd.loader.getYUIConfig=function()
{
var filterExt=window.cbd.page._cbdYuiFilterExt,
logExcludes={},
fallback=document.getElementById("yuiBaseModulesFallback"),
comboBasePath=fallback?cbd.page._cbdYuiComboBaseBackup:cbd.page._cbdYuiComboBase;
if(filterExt!=="")
{
filterExt="min";
logExcludes={yui:true};
}
var config={
filter:filterExt,
allowRollup:true,
throwFail:false,
onFailure:cbd.loader.onFailure,
modules:cbd.loader.modules,
lang:"",
skin:{
overrides:{
"node-menunav":[],
"slider":[]
}
},
logExclude:logExcludes,
combine:true,
comboBase:comboBasePath,
root:cbd.page._cbdYuiRoot
}
return config;
}
cbd.loader.initYUI=function()
{
"use strict";
var config=cbd.loader.getYUIConfig();
cbd.YUI=YUI(config).use("*");
};
cbd.loader.addModule=function(fileInfo)
{
var mod={},
YUI=cbd.getYUI();
if(typeof cbd.page._plsVersionQueryStr=="undefined"||cbd.page._plsVersionQueryStr=="?")
{
var currentTime=new Date();
cbd.page._plsVersionQueryStr='?'+currentTime.getFullYear()+currentTime.getMonth()+currentTime.getDate()+'|'+currentTime.getHours()+currentTime.getMinutes()+currentTime.getSeconds();
}
fileInfo.fullpath+=cbd.page._plsVersionQueryStr;
cbd.loader.modules[fileInfo.name]=fileInfo;
if(YUI)
{
mod[fileInfo.name]=fileInfo;
YUI.applyConfig({modules:mod});
}
}
cbd.loader.isPageReady=function()
{
return cbd.loader.pageReady;
}
cbd.loader.checkLoadEvent=function(loadEvent)
{
var eventFinished=true,
conditions=cbd.loader.pageReadyConditions,
i=conditions.length;
while(i--)
{
if(conditions[i]===loadEvent)
{
eventFinished=false;
break;
}
}
return eventFinished;
}
cbd.loader.waitForEvent=function(loadEvent)
{
cbd.loader.pageReadyConditions.push(loadEvent);
}
cbd.loader.notifyReady=function(loadEvent)
{
var pageReadyConditions=cbd.loader.pageReadyConditions,
length=pageReadyConditions.length,
i;
if(length!==0)
{
for(i=0;i < pageReadyConditions.length;++i)
{
if(pageReadyConditions[i]==loadEvent)
{
pageReadyConditions.splice(i, 1);
break;
}
}
if(pageReadyConditions.length===0)
{
cbd.loader.pageReady=true;
cbd.loader.onSucessCallback();
if(RIA&&!cbd.page.basePageLoaded)
{
vg.html._fireCustomEvent(vg.event.PAGE_READY, window);
}
}
}
}
cbd.loader.onSuccess=function()
{
if(cbd.loader.isPageReady())
{
cbd.loader.onSucessCallback();
}
else
{
cbd.loader.notifyReady("LOADER");
}
}
cbd.loader.onSucessCallback=function()
{
setTimeout(cbd.loader.onSuccessFinish, 1 );
var callbacks=cbd.loader.callbacks;
while(callbacks.length > 0 )
{
var func=callbacks.shift();
vg.util.execFunc(func);
}
}
cbd.loader.onSuccessFinish=function()
{
var i;
if(!cbd)
{
return;
}
if(cbd.loader.callbacks.length > 0 )
{
cbd.loader.onSucessCallback();
}
else
{
cbd.loader.callbacks=[];
cbd.loader.loadRunning=false;
if(cbd.loader.pendingCallbacks.length > 0
||cbd.loader.pendingRequires.length > 0 )
{
for(i=0;i < cbd.loader.pendingRequires.length;i++)
{
cbd.loader.require(cbd.loader.pendingRequires[i]);
}
cbd.loader.callbacks=cbd.loader.pendingCallbacks;
cbd.loader.pendingCallbacks=[];
cbd.loader.pendingRequires=[];
cbd.loader.load();
}
}
}
cbd.loader.onFailure=function(e )
{
console.error('cbd.loader error:'+e.msg );
}
cbd.loader.loadAndExec=function(req, func )
{
var _execOnPageReady=function _execOnPageReady()
{
if(cbd.loader.isPageReady())
{
func.call();
}
else
{
cbd.loader.addCallback(func);
cbd.loader.load();
}
}
var YUI=cbd.getYUI();
if(YUI)
{
YUI.use(req, _execOnPageReady);
}
else
{
cbd.loader.require(req);
cbd.loader.addCallback(_execOnPageReady);
cbd.loader.load();
}
}
cbd.loader.require=function(mod )
{
var i;
if(mod instanceof Array )
{
for(i=0;i < mod.length;i++)
{
cbd.loader.require(mod[i]);
}
}
else
{
if(cbd.loader.loadRunning )
{
cbd.loader.pendingRequires.push(mod );
}
else
{
cbd.loader.currentRequires.push(mod );
}
}
}
cbd.loader.addCallback=function(f )
{
if(cbd.loader.loadRunning )
{
cbd.loader.pendingCallbacks.push(f );
}
else
{
cbd.loader.callbacks.push(f );
}
}
cbd.loader.load=function()
{
var YUI=cbd.getYUI(),
requestedMods=[],
curRequires=cbd.loader.currentRequires,
i=curRequires.length,
opt;
if(YUI&&!cbd.loader.loadRunning)
{
cbd.loader.loadRunning=true;
while(i-- )
{
opt=curRequires[i];
requestedMods[i]=opt;
}
curRequires=[];
cbd.loader.currentRequires=[];
if(requestedMods.length > 0)
{
if(typeof(requestedMods[requestedMods.length-1])!="function" )
{
requestedMods.push(cbd.loader.onSuccess);
}
YUI.use.apply(YUI, requestedMods);
}
else
{
cbd.loader.onSuccess();
}
}
}
cbd.loader.initModules();
cbd.testNSFunc=function(){
_debug("log", "Hosting-App cbd object");
};


YUI.add('cbdMenuPlugin', function(Y){
var UA=Y.UA,
later=Y.later,
getClassName=Y.ClassNameManager.getClassName,
AUTO_SUBMENU_DISPLAY="autoSubmenuDisplay",
MOUSEOUT_HIDE_DELAY="mouseOutHideDelay",
getClassName=Y.ClassNameManager.getClassName,
later=Y.later,
HOVER_INTENT_TIME=45,
MENU="menu",
MENUITEM="menuitem",
HIDDEN="hidden",
PARENT_NODE="parentNode",
CHILDREN="children",
OFFSET_HEIGHT="offsetHeight",
OFFSET_WIDTH="offsetWidth",
PX="px",
ID="id",
PERIOD=".",
HANDLED_MOUSEOUT="handledMouseOut",
HANDLED_MOUSEOVER="handledMouseOver",
ACTIVE="active",
LABEL="label",
LOWERCASE_A="a",
MOUSEDOWN="mousedown",
KEYDOWN="keydown",
CLICK="click",
EMPTY_STRING="",
FIRST_OF_TYPE="first-of-type",
ROLE="role",
PRESENTATION="presentation",
DESCENDANTS="descendants",
UI="UI",
USE_ARIA="useARIA",
ARIA_HIDDEN="aria-hidden",
CONTENT="content",
HOST="host",
CSS_MENU=getClassName(MENU),
CSS_MENU_HIDDEN=getClassName(MENU, HIDDEN),
CSS_MENUITEM=getClassName(MENUITEM),
CSS_MENU_LABEL=getClassName(MENU, LABEL),
CSS_MENU_LABEL_MENUVISIBLE=getClassName(MENU, LABEL,(MENU+"visible")),
MENU_TOGGLE_SELECTOR=(PERIOD+getClassName(MENU, "toggle")),
MENU_CONTENT_SELECTOR=PERIOD+getClassName(MENU, "content"),
STANDARD_QUERY=">"+MENU_CONTENT_SELECTOR+">ul>li>a",
Lang=Y.Lang,
UA=Y.UA;
AUTO_SUBMENU_DISPLAY="autoSubmenuDisplay",
MOUSEOUT_HIDE_DELAY="mouseOutHideDelay",
CSS_MENU=getClassName(MENU),
CSS_MENU_HIDDEN=getClassName(MENU, HIDDEN),
CSS_MENU_HORIZONTAL=getClassName(MENU, "horizontal"),
CSS_MENU_LABEL=getClassName(MENU, LABEL),
CSS_MENU_LABEL_ACTIVE=getClassName(MENU, LABEL, ACTIVE),
CSS_MENU_LABEL_MENUVISIBLE=getClassName(MENU, LABEL,(MENU+"visible")),
CSS_MENUITEM=getClassName(MENUITEM),
CSS_MENUITEM_ACTIVE=getClassName(MENUITEM, ACTIVE),
CSS_MENUITEM_HIGHLIGHTED="setSitePrefBGC",
MENU_SELECTOR=PERIOD+CSS_MENU,
MENU_TOGGLE_SELECTOR=(PERIOD+getClassName(MENU, "toggle")),
MENU_CONTENT_SELECTOR=PERIOD+getClassName(MENU, CONTENT),
MENUITEM_SELECTOR=PERIOD+CSS_MENUITEM,
MENU_LABEL_SELECTOR=PERIOD+CSS_MENU_LABEL,
MENU_CURRENT_LABEL_SELECTOR=PERIOD+"vg-menuLabelSpanScrollInner",
STANDARD_QUERY=">"+MENU_CONTENT_SELECTOR+">ul>li>a",
EXTENDED_QUERY=">"+MENU_CONTENT_SELECTOR+">ul>li>"+MENU_LABEL_SELECTOR+">a:first-child";
var getPreviousSibling=function(node){
var oPrevious=node.previous(),
oChildren;
if(!oPrevious){
oChildren=node.get(PARENT_NODE).get(CHILDREN);
oPrevious=oChildren.item(oChildren.size() - 1);
}
return oPrevious;
};
var getNextSibling=function(node){
var oNext=node.next();
if(!oNext){
oNext=node.get(PARENT_NODE).get(CHILDREN).item(0);
}
return oNext;
};
var isAnchor=function(node){
var bReturnVal=false;
if(node){
bReturnVal=node.get("nodeName").toLowerCase()===LOWERCASE_A;
}
return bReturnVal;
};
var isMenuItem=function(node){
return node.hasClass(CSS_MENUITEM);
};
var isMenuLabel=function(node){
return node.hasClass(CSS_MENU_LABEL)||node.get(PARENT_NODE).hasClass(CSS_MENU_LABEL);
};
var isHorizontalMenu=function(menu)
{
return menu.hasClass("yui3-menu-horizontal");
};
var hasVisibleSubmenu=function(menuLabel){
return menuLabel.hasClass(CSS_MENU_LABEL_MENUVISIBLE);
};
var getItemAnchor=function(node){
return isAnchor(node)?node:node.one(LOWERCASE_A);
};
var getNodeWithClass=function(node, className, searchAncestors){
var oItem;
if(node){
if(node.hasClass(className)){
oItem=node;
}
if(!oItem&&searchAncestors){
oItem=node.ancestor((PERIOD+className));
}
}
return oItem;
};
var getParentMenu=function(node){
return node.ancestor(MENU_SELECTOR);
};
var getMenu=function(node, searchAncestors){
return getNodeWithClass(node, CSS_MENU, searchAncestors);
};
var getMenuItem=function(node, searchAncestors){
var oItem;
if(node){
oItem=getNodeWithClass(node, CSS_MENUITEM, searchAncestors);
}
return oItem;
};
var getMenuLabel=function(node, searchAncestors){
var oItem;
if(node){
if(searchAncestors){
oItem=getNodeWithClass(node, CSS_MENU_LABEL, searchAncestors);
}
else{
oItem=getNodeWithClass(node, CSS_MENU_LABEL)||
node.one((PERIOD+CSS_MENU_LABEL));
}
}
return oItem;
};
var getItem=function(node, searchAncestors){
var oItem;
if(node){
oItem=getMenuItem(node, searchAncestors)||
getMenuLabel(node, searchAncestors);
}
return oItem;
};
var getFirstItem=function(menu){
return getItem(menu.one("li"));
};
var getFirstEnabledItem=function(menu){
var item=menu.one("a[href]");
if(!item.hasClass(PERIOD+CSS_MENU_LABEL))
{
return item.ancestor("li."+CSS_MENUITEM);
}
return item;
};
var getActiveClass=function(node){
return isMenuItem(node)?CSS_MENUITEM_ACTIVE:CSS_MENU_LABEL_ACTIVE;
};
var handleMouseOverForNode=function(node, target){
return node&&!node[HANDLED_MOUSEOVER]&&
(node.compareTo(target)||node.contains(target));
};
var handleMouseOutForNode=function(node, relatedTarget){
return node&&!node[HANDLED_MOUSEOUT]&&
(!node.compareTo(relatedTarget)&&!node.contains(relatedTarget));
};
function MenuBarPlugin(config)
{
MenuBarPlugin.superclass.constructor.apply(this, arguments);
}
MenuBarPlugin.NAME="menuBarPlugin";
MenuBarPlugin.NS="menuBarPlugin";
MenuBarPlugin.SHIM_TEMPLATE_TITLE="Menu Stacking Shim";
MenuBarPlugin.SHIM_TEMPLATE='<iframe frameborder="0" tabindex="-1" class="'+
getClassName("shim")+
'" title="'+MenuBarPlugin.SHIM_TEMPLATE_TITLE+
'" src="javascript:false;"></iframe>';
MenuBarPlugin.ATTRS={
minscrollheight:
{
value:85,
writeOnce:true
},
orientation:
{
value:null,
writeOnce:true
},
alignment:
{
value:null,
writeOnce:true
},
mouseOutExtAreaHideDelay:
{
value:null,
writeOnce:true
},
addScrollRegions:
{
value:false,
writeOnce:true
},
openOnFocus:
{
value:false,
writeOnce:true
},
labelWidth:
{
value:null,
writeOnce:true
},
closeOnScroll:
{
value:true,
writeOnce:true
},
closeOnClick:
{
value:true,
writeOnce:false
},
hoverIntent:
{
value:false,
writeOnce:true
},
useARIA:{
value:true,
writeOnce:true,
lazyAdd:false,
setter:function(value){
var oMenu=this.get(HOST),
oMenuLabel,
oMenuToggle,
oSubmenu,
sID;
if(value){
oMenu.set(ROLE, MENU);
oMenu.all("ul,li,"+MENU_CONTENT_SELECTOR).set(ROLE, PRESENTATION);
oMenu.all((PERIOD+getClassName(MENUITEM, CONTENT))).set(ROLE, MENUITEM);
oMenu.all((PERIOD+CSS_MENU_LABEL)).each(function(node){
oMenuLabel=node;
oMenuToggle=node.one(MENU_TOGGLE_SELECTOR);
if(oMenuToggle){
oMenuToggle.set(ROLE, PRESENTATION);
oMenuLabel=oMenuToggle.previous();
}
oMenuLabel.set(ROLE, MENUITEM);
oMenuLabel.set("aria-haspopup", true);
oSubmenu=node.next();
if(oSubmenu){
oSubmenu.set(ROLE, MENU);
oMenuLabel=oSubmenu.previous();
oMenuToggle=oMenuLabel.one(MENU_TOGGLE_SELECTOR);
if(oMenuToggle){
oMenuLabel=oMenuToggle;
}
sID=Y.stamp(oMenuLabel);
if(!oMenuLabel.get(ID)){
oMenuLabel.set(ID, sID);
}
oSubmenu.set("aria-labelledby", sID);
oSubmenu.set(ARIA_HIDDEN, true);
}
});
}
}
},
autoSubmenuDisplay:{
value:true,
writeOnce:false
},
submenuShowDelay:{
value:250,
writeOnce:false
},
submenuHideDelay:{
value:250,
writeOnce:true
},
mouseOutHideDelay:{
value:0,
writeOnce:true
},
collision:{
value:"flip",
writeOnce:true
}
};
Y.extend(MenuBarPlugin, Y.Plugin.Base,{
_rootMenu:null,
_activeItem:null,
_activeMenu:null,
_hasFocus:false,
_blockMouseEvent:false,
_movingToSubmenu:false,
_lastMouseXY:{x:0, y:0},
_currentMouseXY:{x:0, y:0},
_hoverIntentOn:false,
_hoverIntentTimer:null,
_menuWithHover:null,
_showSubmenuTimer:null,
_hideAllSubmenusTimer:null,
_firstItem:null,
_highlightedMenuItem:null,
initializer:function(config){
var menuNav=this,
oRootMenu=this.get(HOST),
aHandlers=[],
oDoc;
if(oRootMenu){
menuNav._rootMenu=oRootMenu;
oRootMenu.all("ul:first-child").addClass(FIRST_OF_TYPE);
oRootMenu.all(MENU_SELECTOR).addClass(CSS_MENU_HIDDEN);
oDoc=oRootMenu.get("ownerDocument");
aHandlers.push(oRootMenu.on("mouseover", menuNav._onMouseOver, menuNav));
aHandlers.push(oRootMenu.on("mouseout", menuNav._onMouseOut, menuNav));
aHandlers.push(oRootMenu.on("mousemove", menuNav._onMouseMove, menuNav));
aHandlers.push(oRootMenu.on(MOUSEDOWN, menuNav._toggleSubmenuDisplay, menuNav));
aHandlers.push(Y.on("key", menuNav._toggleSubmenuDisplay, oRootMenu, "down:13", menuNav));
aHandlers.push(oRootMenu.on(CLICK, menuNav._toggleSubmenuDisplay, menuNav));
aHandlers.push(oRootMenu.on("keypress", menuNav._onKeyPress, menuNav));
aHandlers.push(oRootMenu.on(KEYDOWN, menuNav._onKeyDown, menuNav));
aHandlers.push(oRootMenu.on("focus", menuNav._onMenuFocus, menuNav));
oRootMenu.all(MENUITEM_SELECTOR).each(function(node){
var label=getMenuLabel(node);
if(label)
{
if(label.getAttribute("navigational")==="false")
{
node.on(CLICK, menuNav._onMenuItemClick, menuNav);
}
}
});
if(cbd.browser.isTouchScreen)
{
aHandlers.push(oDoc.on("touchstart" , menuNav._onDocMouseDown, menuNav));
}
else
{
aHandlers.push(oDoc.on(MOUSEDOWN, menuNav._onDocMouseDown, menuNav));
}
this._eventHandlers=aHandlers;
if(this.get("addScrollRegions"))
{
this.addScrollRegion(oRootMenu);
}
if(cbd.browser.isTouchScreen&&cbd.page.isNextGen)
{
var scrollRegion=vg.html.getElements(oRootMenu,{tagName:'div', attrName:'class', attrValue:'scrollRegion'})[0];
if(scrollRegion&&vg.html.isFixedHeight(scrollRegion))
{
vg.touchScreen._makeNodeScrollable(scrollRegion.getAttribute("id"));
}
}
if(this.get("labelWidth") )
{
this.label=oRootMenu.one(".yui3-menu-label");
this.labelSpanInner=oRootMenu.one(MENU_CURRENT_LABEL_SELECTOR).getDOMNode();
this.label.on('mouseover', function(event){menuNav._labelMouseOver(event)});
this.label.on('mouseout', function(event){menuNav._animateText(event)});
}
if(config.initEvent)
{
this._lazyInit(config.initEvent);
}
}
},
destructor:function(){
var aHandlers=this._eventHandlers;
if(aHandlers){
Y.Array.each(aHandlers, function(handle){
handle.detach();
});
this._eventHandlers=null;
}
},
_isRoot:function(menu){
return this._rootMenu.compareTo(menu);
},
_getTopmostSubmenu:function(menu){
var menuNav=this,
oMenu=getParentMenu(menu),
returnVal;
if(!oMenu){
returnVal=menu;
}
else if(menuNav._isRoot(oMenu)){
returnVal=menu;
}
else{
returnVal=menuNav._getTopmostSubmenu(oMenu);
}
return returnVal;
},
_clearActiveItem:function(){
var menuNav=this,
oActiveItem=menuNav._activeItem;
if(oActiveItem){
oActiveItem.removeClass(getActiveClass(oActiveItem));
}
menuNav._activeItem=null;
},
_setActiveItem:function(item){
var menuNav=this;
menuNav._clearActiveItem();
if(item&&(item.one("a[href]")||item.get("tagName").toLowerCase()=="a")){
item.addClass(getActiveClass(item));
menuNav._activeItem=item;
}
},
_focusItem:function(item){
var menuNav=this,
oMenu,
oItem;
if(item&&menuNav._hasFocus){
oMenu=getParentMenu(item);
oItem=getItemAnchor(item);
if(oMenu&&!oMenu.compareTo(menuNav._activeMenu)){
menuNav._activeMenu=oMenu;
}
if(oItem)
{
oItem.focus();
}
}
},
_highlightCurrentItem:function(menu, subMenu){
var option=subMenu.one(MENUITEM_SELECTOR),
optValue="",
label,
menuValue=menu._rootMenu.getAttribute("value"),
focusFirstItem=true;;
if(menuValue)
{
while(option)
{
label=getMenuLabel(option);
optValue=label.getAttribute("value");
if(optValue===menuValue)
{
menu._focusItem(option);
menu._setActiveItem(option);
focusFirstItem=false;
option=false;
}
else
{
option=option.next();
}
}
}
if(focusFirstItem)
{
menu._focusItem(getFirstItem(subMenu));
menu._setActiveItem(getFirstItem(subMenu));
}
},
_onMenuFocus:function(event){
var menuNav=this,
oActiveItem=menuNav._activeItem,
oTarget=event.target,
oMenu,
item=getItem(oTarget, true);
if(menuNav._rootMenu.contains(oTarget)){
oMenu=getParentMenu(oTarget);
if(menuNav._hasFocus){
if(!menuNav._activeMenu.compareTo(oMenu)){
menuNav._activeMenu=oMenu;
}
if(!oActiveItem||!oActiveItem.compareTo(item))
{
menuNav._setActiveItem(item);
}
}
else{
menuNav._hasFocus=true;
if(item){
menuNav._setActiveItem(item);
menuNav._activeMenu=oMenu;
}
}
if(isHorizontalMenu(oMenu)&&this.get("openOnFocus"))
{
this._hideAllSubmenus(this._rootMenu);
this._setActiveItem(item);
var oSubmenu=item.next();
if(oSubmenu)
{
this._showMenu(oSubmenu);
}
}
}
},
_executeOnChangeJs:function(menuNav){
var rootMenu=menuNav._rootMenu,
onChangeJs=rootMenu.getAttribute('onchangejs');
if(onChangeJs!=null)
{
vg.comp._execEventHandler(onChangeJs, rootMenu);
}
},
_onMenuItemClick:function(event){
var menuNav=this,
rootMenu=menuNav._rootMenu,
target=event.target.getDOMNode(),
newValue=target.getAttribute("value");
oldValue=rootMenu.getAttribute("value"),
selectedDifferentValue=newValue!==oldValue;
menuNav._hideAllSubmenus(rootMenu, true);
if(selectedDifferentValue)
{
rootMenu.setAttribute("value", newValue);
rootMenu.one(MENU_CURRENT_LABEL_SELECTOR).getDOMNode().innerHTML=target.innerHTML;
menuNav._focusItem(getMenuItem(event.target, true));
menuNav._setActiveItem(getMenuItem(event.target, true));
menuNav._executeOnChangeJs(menuNav);
}
},
addScrollRegion:function(menu)
{
var topScrollBarHTML="<div class=\"hd topscrollbar\"></div>",
bottomScrollBarHTML="<div class=\"ft bottomscrollbar\"></div>",
controller=this,
menuNode=menu.all('.yui3-menu'),
menuNodeLen=menuNode.size(),
contentNode,
contentNodeLen=0,
contentNodeParent,
i=0,
j=0,
topScrollBar,
bottomScrollBar,
scrollTriggerEvent="mouseover",
stopScrollTriggerEvent="mouseout";
for(i=0;i < menuNodeLen;i++)
{
contentNode=menuNode.item(i).all('.yui3-menu-content');
contentNodeLen=contentNode.size();
for(j=0;j < contentNodeLen;j++)
{
contentNodeParent=contentNode.item(j).get('parentNode');
contentNodeParent.prepend(topScrollBarHTML);
contentNodeParent.append(bottomScrollBarHTML);
topScrollBar=contentNodeParent.one('.hd');
bottomScrollBar=contentNodeParent.one('.ft');
if(cbd.browser.isTouchScreen)
{
scrollTriggerEvent="touchstart";
stopScrollTriggerEvent="touchend";
}
topScrollBar.on(scrollTriggerEvent, function(e){controller.scrollContent(e.target, -2)});
topScrollBar.on(stopScrollTriggerEvent, function(e){controller.clearScrollTimer()});
bottomScrollBar.on(scrollTriggerEvent, function(e){controller.scrollContent(e.target, 2)});
bottomScrollBar.on(stopScrollTriggerEvent, function(e){controller.clearScrollTimer();});
}
}
},
_lazyInit:function(event)
{
if(!event)
{
return;
}
var evtTarget=Y.one(jsCBDgetEventNode(event));
if(event.type.toLowerCase()==="mouseover" )
{
event=new Y.DOMEventFacade(event, evtTarget);
this._onMouseOver(event );
}
},
clearScrollTimer:function(e)
{
if(this.scrollTimer)
{
clearInterval(this.scrollTimer);
}
},
_checkExtArea:function(subMenu, event)
{
if(subMenu!=null)
{
var menuPos=subMenu.get("region");
var mouse=vg.util.getMousePos(event);
var endOfMenuOnX=menuPos.left+menuPos.width;
var endOfMenuOnY=menuPos.top+menuPos.height;
var endOfExtentionAreaY=endOfMenuOnY+50;
var inXExtArea=(menuPos.left <=mouse.x)&&(mouse.x <=endOfMenuOnX);
var inYExtArea=(endOfMenuOnY <=mouse.y)&&(mouse.y <=endOfExtentionAreaY);
if(inXExtArea&&inYExtArea)
{
return true;
}
}
return false;
},
scrollContent:function(target, offset)
{
var scrollRegion=target.next('.yui3-menu-content')||target.previous('.yui3-menu-content');
this.scrollTimer=setInterval(
function scrollDown()
{
scrollRegion.set('scrollTop',scrollRegion.get('scrollTop')+offset);
},
20 );
},
openMenu:function(closeTimer, menuItem)
{
var menu=getMenuLabel(this._rootMenu, false);
if(menuItem!==null&&(typeof menuItem!=="undefined"))
{
this._highlightedMenuItem=cbd.getYUI().one("#"+menuItem);
this._highlightedMenuItem.addClass(CSS_MENUITEM_HIGHLIGHTED);
}
this._showMenu(menu.next());
if(closeTimer!==null&&(typeof closeTimer!=="undefined"))
{
this._hideAllSubmenusTimer=later(closeTimer, this, this._hideAllSubmenus, this._rootMenu);;
}
},
_showMenu:function(menu)
{
if(!menu.hasClass(CSS_MENU_HIDDEN))
{
return;
}
if(this.get("closeOnScroll")&&vg.Menu.selectedMenu!=this)
{
if(vg.Menu.selectedMenu)
{
vg.Menu.selectedMenu._blur(true);
}
vg.Menu.selectedMenu=this;
}
var subMenuContent=menu.one('.yui3-menu-content'),
menuIFrame=menu.one('iframe'),
header=menu.one('.hd'),
footer=menu.one('.ft'),
scrollRegions=header&&footer,
scrollRegionSize=0,
defaultMenuWidth=subMenuContent.get(OFFSET_WIDTH);
if(scrollRegions)
{
header.setStyle('display', 'none');
footer.setStyle('display', 'none');
}
subMenuContent.setStyles({height:EMPTY_STRING, width:EMPTY_STRING});
menu.setStyles({height:EMPTY_STRING});
var availHeight=vg.window.getAvailableScreenHeight(),
leftScroll=_cbdGetScrollLeft(),
availWidth=vg.window.getAvailableScreenWidth()+leftScroll,
winScroll=Y.DOM.docScrollY(),
minscrollheight=this.get("minscrollheight"),
menuHeight=subMenuContent.get(OFFSET_HEIGHT),
menuWidth=subMenuContent.get(OFFSET_WIDTH),
oParentMenu=getParentMenu(menu),
oRootMenu=menu._rootMenu,
oLI=menu.get(PARENT_NODE),
aXY=oLI.getXY(),
aHeight=oLI.get(OFFSET_HEIGHT),
aWidth=oLI.get(OFFSET_WIDTH),
spaceAbove=aXY[1]- winScroll,
spaceBelow=availHeight - spaceAbove - aHeight,
spaceLeft=aXY[0]- leftScroll+aWidth,
spaceRight=availWidth - aXY[0],
orientation=this.get("orientation"),
alignment=this.get("alignment"),
newMenuHeight=menuHeight,
menuContentHeight=menuHeight,
menuContentWidth=menuWidth;
if(alignment===null)
{
if(spaceRight < defaultMenuWidth&&spaceRight < spaceLeft)
{
alignment="right";
}
else
{
alignment="left";
}
}
if(defaultMenuWidth > menuContentWidth )
{
menuContentWidth=defaultMenuWidth;
}
if(orientation===null )
{
if(spaceBelow < menuHeight&&spaceBelow < spaceAbove)
{
orientation="top";
}
else
{
orientation="bottom";
}
}
if(orientation==="bottom"&&spaceBelow < menuHeight)
{
newMenuHeight=spaceBelow;
}
else if(orientation==="top"&&spaceAbove < menuHeight )
{
newMenuHeight=spaceAbove;
}
if(newMenuHeight < menuHeight&&newMenuHeight >=minscrollheight)
{
if(scrollRegions)
{
header.setStyles({display:'block', width:(menuContentWidth+PX)});
footer.setStyles({display:'block', width:(menuContentWidth+PX)});
scrollRegionSize=header.get(OFFSET_HEIGHT)+footer.get(OFFSET_HEIGHT);
}
newMenuHeight -=10;
menuContentHeight=newMenuHeight - scrollRegionSize;
}
subMenuContent.setStyles({height:(menuContentHeight+PX), width:(menuContentWidth+PX)});
if(menuIFrame)
{
menuIFrame.get(PARENT_NODE).setStyles({height:((menuContentHeight+scrollRegionSize)+PX), width:(menuContentWidth+PX)});
menuIFrame.setStyles({height:((menuContentHeight+scrollRegionSize)+PX), width:(menuContentWidth+PX)});
}
aXY[1]=(orientation==="top")?aXY[1]- newMenuHeight+1:aXY[1]+aHeight - 1;
var xPos=(alignment==="right" )?aXY[0]+aWidth - menuContentWidth:aXY[0];
if(this.get("collision")==="fit")
{
var containerYUI=cbd.getYUI().one("#main");
if(containerYUI)
{
var containerX=containerYUI.getXY()[0];
var containerWidth=containerYUI.get(OFFSET_WIDTH);
if(alignment==="left"&&(containerX+containerWidth - aXY[0]< menuContentWidth))
{
xPos=containerX+containerWidth - menuContentWidth;
}
else if(alignment==="right"&&(aXY[0]+aWidth - containerX < menuContentWidth))
{
xPos=containerX;
}
}
}
aXY[0]=xPos;
menu.setXY(aXY);
if(this.get(USE_ARIA))
{
menu.set(ARIA_HIDDEN, false);
}
if(UA.ie===6&&!menu.hasIFrameShim){
menu.appendChild(Y.Node.create(MenuBarPlugin.SHIM_TEMPLATE));
menu.hasIFrameShim=true;
}
menu.previous().addClass(CSS_MENU_LABEL_MENUVISIBLE);
menu.removeClass(CSS_MENU_HIDDEN);
},
_hideMenu:function(menu, activateAndFocusLabel)
{
if(vg.Menu.selectedMenu===this )
{
vg.Menu.selectedMenu=null;
}
var menuNav=this,
oLabel=menu.previous(),
oActiveItem;
oLabel.removeClass(CSS_MENU_LABEL_MENUVISIBLE);
if(activateAndFocusLabel){
menuNav._focusItem(oLabel);
menuNav._setActiveItem(oLabel);
}
oActiveItem=menu.one((PERIOD+CSS_MENUITEM_ACTIVE));
if(oActiveItem){
oActiveItem.removeClass(CSS_MENUITEM_ACTIVE);
}
menu.setStyles({left:EMPTY_STRING, top:EMPTY_STRING});
menu.addClass(CSS_MENU_HIDDEN);
if(menuNav.get(USE_ARIA)){
menu.set(ARIA_HIDDEN, true);
}
if(this._highlightedMenuItem!==null)
{
this._highlightedMenuItem.removeClass(CSS_MENUITEM_HIGHLIGHTED);
this._highlightedMenuItem=null;
}
},
_hideAllSubmenus:function(menu){
var menuNav=this;
menu.all(MENU_SELECTOR).each(Y.bind(function(submenuNode){
menuNav._hideMenu(submenuNode);
}, menuNav));
},
_cancelShowSubmenuTimer:function(){
var menuNav=this,
oShowSubmenuTimer=menuNav._showSubmenuTimer;
if(oShowSubmenuTimer){
oShowSubmenuTimer.cancel();
menuNav._showSubmenuTimer=null;
}
},
_cancelHoverIntent:function(){
var menuNav=this,
hoverIntentTimer=menuNav._hoverIntentTimer;
if(hoverIntentTimer){
menuNav._hoverIntentOn=false;
menuNav._menuWithHover=null;
menuNav._currentMouseXY={x:0, y:0};
menuNav._lastMouseXY={x:0, y:0};
hoverIntentTimer.cancel();
menuNav._hoverIntentTimer=null;
}
},
_onMenuMouseOver:function(menu, event){
var menuNav=this,
oHideAllSubmenusTimer=menuNav._hideAllSubmenusTimer;
if(oHideAllSubmenusTimer){
oHideAllSubmenusTimer.cancel();
menuNav._hideAllSubmenusTimer=null;
}
menuNav._cancelHoverIntent();
if(menu&&!menu.compareTo(menuNav._activeMenu)){
menuNav._activeMenu=menu;
}
if(menuNav._movingToSubmenu&&isHorizontalMenu(menu)){
menuNav._movingToSubmenu=false;
}
},
_onMenuMouseOut:function(menu, event)
{
var menuNav=this,
oActiveMenu=menuNav._activeMenu,
oRelatedTarget=event.relatedTarget,
oActiveItem=menuNav._activeItem,
oParentMenu,
oMenu,
delay=menuNav.get(MOUSEOUT_HIDE_DELAY),
extDelay=menuNav.get("mouseOutExtAreaHideDelay");
autoSubMenuDisplay=menuNav.get("autoSubmenuDisplay");
if(autoSubMenuDisplay&&oActiveMenu&&!oActiveMenu.contains(oRelatedTarget))
{
oParentMenu=getParentMenu(oActiveMenu);
if(oParentMenu&&!oParentMenu.contains(oRelatedTarget))
{
if(extDelay&&this._checkExtArea(oActiveMenu, event))
{
delay=extDelay;
}
menuNav._cancelShowSubmenuTimer();
menuNav._hideAllSubmenusTimer=later(delay, menuNav, menuNav._hideAllSubmenus, menuNav._rootMenu);
}
}
else
{
if(oActiveItem)
{
oMenu=getParentMenu(oActiveItem);
if(!menuNav._isRoot(oMenu))
{
menuNav._focusItem(oMenu.previous());
}
}
}
},
_onMenuLabelMouseOut:function(menuLabel, event){
var menuNav=this,
bOpenOnHover=menuNav.get("autoSubmenuDisplay"),
bHasHoverIntent=menuNav.get('hoverIntent');
oRelatedTarget=event.relatedTarget,
oSubmenu=menuLabel.next(),
bHasVisibleSubmenu=hasVisibleSubmenu(menuLabel),
bHoverIntentOn=menuNav._hoverIntentOn,
oTarget=event.target,
oMenu=getMenu(oTarget, true);
menuNav._clearActiveItem();
if(bOpenOnHover){
if(!menuNav._movingToSubmenu&&oSubmenu&&(!oRelatedTarget||
(oRelatedTarget&&
!oSubmenu.contains(oRelatedTarget)&&
!oRelatedTarget.compareTo(oSubmenu)))){
var hideMenu=function(submenu)
{
menuNav._cancelHoverIntent();
menuNav._cancelShowSubmenuTimer();
menuNav._hideMenu(submenu);
};
if(bHasHoverIntent&&bHasVisibleSubmenu )
{
if(!bHoverIntentOn){
menuNav._hoverIntentOn=true;
menuNav._hoverIntentTimer=later(HOVER_INTENT_TIME, menuNav, menuNav._findHoverIntent,[oMenu, oSubmenu], true );
}
}
else
{
hideMenu(oSubmenu);
}
}
}
},
_findHoverIntent:function(menu, oSubmenu )
{
var menuNav=this,
oPotentialActiveMenu=menuNav._menuWithHover,
hideMenu=function(submenu ){
menuNav._cancelHoverIntent();
menuNav._cancelShowSubmenuTimer();
menuNav._hideMenu(submenu);
};
if(isHorizontalMenu(menu) )
{
menuNav._movingToSubmenu=menuNav._currentMouseXY.y > menuNav._lastMouseXY.y;
}
else
{
menuNav._movingToSubmenu=menuNav._lastMouseXY.x <=menuNav._currentMouseXY.x;
}
menuNav._lastMouseXY={x:menuNav._currentMouseXY.x, y:menuNav._currentMouseXY.y};
if(!menuNav._movingToSubmenu )
{
if(oPotentialActiveMenu )
{
menuNav._focusItem(oPotentialActiveMenu);
menuNav._setActiveItem(oPotentialActiveMenu);
menuNav._cancelHoverIntent();
menuNav._showSubmenu(0, oPotentialActiveMenu);
}
else
{
menuNav._clearActiveItem();
hideMenu(oSubmenu);
}
}
},
_onMenuLabelMouseOver:function(menuLabel, event){
var menuNav=this,
oActiveMenu=menuNav._activeMenu,
bIsRoot=menuNav._isRoot(oActiveMenu),
bUseAutoSubmenuDisplay=
(menuNav.get(AUTO_SUBMENU_DISPLAY)&&bIsRoot||!bIsRoot),
submenuShowDelay=menuNav.get("submenuShowDelay");
if(menuNav._hoverIntentOn )
{
menuNav._menuWithHover=menuLabel;
}
else
{
menuNav._focusItem(menuLabel);
menuNav._setActiveItem(menuLabel);
if(bUseAutoSubmenuDisplay){
menuNav._showSubmenu(submenuShowDelay, menuLabel);
}
}
},
_showSubmenu:function(delay, menuLabel){
var menuNav=this,
oActiveMenu=menuNav._activeMenu;
menuNav._cancelShowSubmenuTimer();
if(!hasVisibleSubmenu(menuLabel)){
menuNav._hideAllSubmenus(oActiveMenu);
oSubmenu=menuLabel.next();
if(oSubmenu){
menuNav._showSubmenuTimer=later(delay, menuNav, menuNav._showMenu, oSubmenu);
}
}
},
_onMenuItemMouseOver:function(menuItem, event){
var menuNav=this,
oActiveMenu=menuNav._activeMenu,
bIsRoot=menuNav._isRoot(oActiveMenu),
bUseAutoSubmenuDisplay=
(menuNav.get(AUTO_SUBMENU_DISPLAY)&&bIsRoot||!bIsRoot);
menuNav._focusItem(menuItem);
menuNav._setActiveItem(menuItem);
if(bUseAutoSubmenuDisplay&&!menuNav._movingToSubmenu){
menuNav._hideAllSubmenus(oActiveMenu);
}
},
_onMenuItemMouseOut:function(menuItem, event){
this._clearActiveItem();
},
_labelMouseOver:function()
{
clearTimeout(this.mouseOutTimeOut);
var THIS=this;
this.mouseOverTimeOut=setTimeout(function()
{
var textWidth=vg.html.getObjWidth(THIS.labelSpanInner);
var labelSize=THIS.get("labelWidth").replace("px","") - 24;
if(labelSize < textWidth)
{
THIS.diff=labelSize - textWidth - 13;
if(THIS.diff!=THIS.label._node.style.left)
{
var animTime=9;
var dur=(animTime*THIS.diff)*-1;
THIS.animHover=vg.smil.animateText(THIS.labelSpanInner, 0, THIS.diff , dur);
}
}
}, 300);
},
_animateText:function(event)
{
clearTimeout(this.mouseOverTimeOut);
var THIS=this;
this.mouseOutTimeOut=setTimeout(function()
{
if(THIS.animHover)
{
THIS.animHover.stop();
}
if(THIS.labelSpanInner.style.left.replace("px","") < 0)
{
vg.smil.animateText(THIS.labelSpanInner, THIS.diff, 0, 150);
}
}, 300);
},
_onArrowKeys:function(event){
var menuNav=this,
oActiveMenu=menuNav._activeMenu,
oRootMenu=menuNav._rootMenu,
oTarget=event.target,
bPreventDefault=false,
nKeyCode=event.keyCode,
isMenuLabelNode=isMenuLabel(oTarget),
oLI=isMenuLabelNode?oTarget.ancestor('li'):oActiveMenu.get(PARENT_NODE),
oSubmenu=isMenuLabelNode?oTarget.next():oActiveMenu,
newMenu,
newLI,
newAnchor;
if(nKeyCode==37||nKeyCode==39)
{
var goLeft=nKeyCode==37;
newLI=goLeft?oLI.previous():oLI.next();
if(newLI)
{
if(oSubmenu)
{
menuNav._hideMenu(oSubmenu);
}
newAnchor=getItem(newLI);
newMenu=newAnchor.next();
if(newMenu)
{
menuNav._showMenu(newMenu);
menuNav._focusItem(getFirstEnabledItem(newMenu));
menuNav._setActiveItem(getFirstEnabledItem(newMenu));
}
else{
menuNav._focusItem(newAnchor);
menuNav._setActiveItem(newAnchor);
}
}
bPreventDefault=true;
}
else if(nKeyCode==40||nKeyCode==38)
{
var goUp=nKeyCode==38;
if(isMenuLabelNode){
menuNav._hideAllSubmenus(oActiveMenu);
if(oSubmenu){
menuNav._showMenu(oSubmenu);
menuNav._focusItem(getFirstEnabledItem(oSubmenu));
menuNav._setActiveItem(getFirstEnabledItem(oSubmenu));
}
}
else
{
newMenu=getParentMenu(oTarget);
allMenuItems=newMenu.all("a[href]");
var curIndex=allMenuItems.indexOf(oTarget);
var newIndex=goUp?curIndex - 1:curIndex+1;
if(newIndex < 0)
{
newIndex=allMenuItems.size() - 1;
}
else if(newIndex > allMenuItems.size() - 1)
{
newIndex=0;
}
newAnchor=getItem(allMenuItems.item(newIndex), true)
menuNav._focusItem(newAnchor);
menuNav._setActiveItem(newAnchor);
}
bPreventDefault=true;
}
if(bPreventDefault){
event.preventDefault();
}
},
_onMouseMove:function(event){
var menuNav=this;
menuNav._currentMouseXY={x:event.pageX, y:event.pageY};
},
_onMouseOver:function(event){
var menuNav=this,
oTarget,
oMenu,
oMenuLabel,
oParentMenu,
oMenuItem;
if(menuNav._blockMouseEvent){
menuNav._blockMouseEvent=false;
}
else{
oTarget=event.target;
oMenu=getMenu(oTarget, true);
oMenuLabel=getMenuLabel(oTarget, true);
oMenuItem=getMenuItem(oTarget, true);
if(handleMouseOverForNode(oMenu, oTarget)){
menuNav._onMenuMouseOver(oMenu, event);
oMenu[HANDLED_MOUSEOVER]=true;
oMenu[HANDLED_MOUSEOUT]=false;
oParentMenu=getParentMenu(oMenu);
if(oParentMenu){
oParentMenu[HANDLED_MOUSEOUT]=true;
oParentMenu[HANDLED_MOUSEOVER]=false;
}
}
if(handleMouseOverForNode(oMenuLabel, oTarget)){
menuNav._onMenuLabelMouseOver(oMenuLabel, event);
oMenuLabel[HANDLED_MOUSEOVER]=true;
oMenuLabel[HANDLED_MOUSEOUT]=false;
}
if(handleMouseOverForNode(oMenuItem, oTarget)){
menuNav._onMenuItemMouseOver(oMenuItem, event);
oMenuItem[HANDLED_MOUSEOVER]=true;
oMenuItem[HANDLED_MOUSEOUT]=false;
}
}
},
_onMouseOut:function(event){
var menuNav=this,
oActiveMenu=menuNav._activeMenu,
bMovingToSubmenu=false,
oTarget,
oRelatedTarget,
oMenu,
oMenuLabel,
oSubmenu,
oMenuItem;
oTarget=event.target;
oRelatedTarget=event.relatedTarget;
oMenu=getMenu(oTarget, true);
oMenuLabel=getMenuLabel(oTarget, true);
oMenuItem=getMenuItem(oTarget, true);
if(handleMouseOutForNode(oMenuLabel, oRelatedTarget))
{
menuNav._onMenuLabelMouseOut(oMenuLabel, event);
oMenuLabel[HANDLED_MOUSEOUT]=true;
oMenuLabel[HANDLED_MOUSEOVER]=false;
}
if(handleMouseOutForNode(oMenuItem, oRelatedTarget))
{
menuNav._onMenuItemMouseOut(oMenuItem, event);
oMenuItem[HANDLED_MOUSEOUT]=true;
oMenuItem[HANDLED_MOUSEOVER]=false;
}
if(oMenuLabel){
oSubmenu=oMenuLabel.next();
if(oSubmenu&&oRelatedTarget&&
(oRelatedTarget.compareTo(oSubmenu)||
oSubmenu.contains(oRelatedTarget))){
bMovingToSubmenu=true;
}
}
if(handleMouseOutForNode(oMenu, oRelatedTarget)||bMovingToSubmenu){
menuNav._onMenuMouseOut(oMenu, event);
oMenu[HANDLED_MOUSEOUT]=true;
oMenu[HANDLED_MOUSEOVER]=false;
}
},
_toggleSubmenuDisplay:function(event)
{
var menuNav=this,
oTarget=event.target,
oMenuLabel=getMenuLabel(oTarget, true),
sType=event.type,
oAnchor,
sHref,
nHashPos;
if(oMenuLabel)
{
oAnchor=isAnchor(oTarget)?oTarget:oTarget.ancestor(isAnchor);
if(oAnchor){
if(cbd.browser.isTouchScreen||((sType!=MOUSEDOWN||sType!=CLICK)&&this.get("closeOnClick")))
{
sHref=oAnchor.getAttribute("href", 2);
nHashPos=sHref.indexOf("#");
oAnchor.setAttribute("href", sHref.substring(nHashPos));
this._yuiToggleSubmenuDisplay(event);
}
}
}
},
_yuiToggleSubmenuDisplay:function(event){
var menuNav=this,
oTarget=event.target,
oMenuLabel=getMenuLabel(oTarget, true),
oMenuLabelText=oTarget._node.innerHTML,
sType=event.type,
oAnchor,
oSubmenu,
sHref,
nHashPos,
nLen,
sId;
if(oMenuLabel){
oAnchor=isAnchor(oTarget)?oTarget:oTarget.ancestor(isAnchor);
if(oAnchor){
sHref=oAnchor.getAttribute("href", 2);
nHashPos=sHref.indexOf("#");
nLen=sHref.length;
if(nHashPos===0&&nLen > 1){
sId=sHref.substr(1, nLen);
oSubmenu=oMenuLabel.next();
if(oSubmenu&&(oSubmenu.get(ID)===sId)){
if(sType===MOUSEDOWN||sType===KEYDOWN){
if((UA.opera||UA.gecko||UA.ie)&&sType===KEYDOWN&&!menuNav._preventClickHandle){
menuNav._preventClickHandle=menuNav._rootMenu.on("click", function(event){
event.preventDefault();
menuNav._preventClickHandle.detach();
menuNav._preventClickHandle=null;
});
}
if(sType==MOUSEDOWN){
event.preventDefault();
event.stopImmediatePropagation();
menuNav._hasFocus=true;
}
if(menuNav._isRoot(getParentMenu(oTarget))){
if(hasVisibleSubmenu(oMenuLabel)){
menuNav._hideMenu(oSubmenu);
menuNav._focusItem(oMenuLabel);
menuNav._setActiveItem(oMenuLabel);
}
else{
menuNav._hideAllSubmenus(menuNav._rootMenu);
menuNav._showMenu(oSubmenu);
menuNav._highlightCurrentItem(menuNav, oSubmenu, oMenuLabelText);
}
}
else{
if(menuNav._activeItem==oMenuLabel){
menuNav._showMenu(oSubmenu);
menuNav._highlightCurrentItem(menuNav, oSubmenu, oMenuLabelText);
}
else{
if(!oMenuLabel._clickHandle){
oMenuLabel._clickHandle=oMenuLabel.on("click", function(){
menuNav._hideAllSubmenus(menuNav._rootMenu);
menuNav._hasFocus=false;
menuNav._clearActiveItem();
oMenuLabel._clickHandle.detach();
oMenuLabel._clickHandle=null;
});
}
}
}
}
if(sType===CLICK){
event.preventDefault();
}
}
}
}
}
},
_onKeyPress:function(event){
switch(event.keyCode){
case 37:
case 38:
case 39:
case 40:
event.preventDefault();
break;
}
},
_onKeyDown:function(event){
var menuNav=this,
oActiveItem=menuNav._activeItem,
oTarget=event.target,
oActiveMenu=getParentMenu(oTarget),
oSubmenu;
if(oActiveMenu){
menuNav._activeMenu=oActiveMenu;
if(event.keyCode >=37&&event.keyCode <=40)
{
menuNav._onArrowKeys(event);
}
if(event.keyCode===27){
if(!menuNav._isRoot(oActiveMenu)){
if(UA.opera){
later(0, menuNav, function(){
menuNav._hideMenu(oActiveMenu, true);
});
}
else{
menuNav._hideMenu(oActiveMenu, true);
}
event.stopPropagation();
menuNav._blockMouseEvent=UA.gecko?true:false;
}
else if(oActiveItem){
if(isMenuLabel(oActiveItem)&&
hasVisibleSubmenu(oActiveItem)){
oSubmenu=oActiveItem.next();
if(oSubmenu){
menuNav._hideMenu(oSubmenu);
}
}
else{
menuNav._clearActiveItem();
menuNav._hasFocus=false;
}
}
}
else if(event.keyCode===9 )
{
var allLIs=oActiveMenu.all("li");
if(!allLIs||!allLIs.size())
{
return;
}
var shiftTabFromFirstItem=event.shiftKey&&menuNav._isRoot(oActiveMenu)&&allLIs.shift().contains(oTarget),
tabFromLastItem=!event.shiftKey&&allLIs.pop().contains(oTarget);
if(shiftTabFromFirstItem||tabFromLastItem)
{
menuNav._blur(menuNav.get("openOnFocus"));
}
}
}
},
_onDocMouseDown:function(event){
var menuNav=this,
oRoot=menuNav._rootMenu,
oTarget=event.target;
if(!(oRoot.compareTo(oTarget)||oRoot.contains(oTarget))){
menuNav._hideAllSubmenus(oRoot);
menuNav._hasFocus=false;
menuNav._clearActiveItem();
}
},
_blur:function(closeMenu)
{
var menuNav=this,
oActiveMenu=menuNav._activeMenu;
if(closeMenu&&!menuNav._isRoot(oActiveMenu))
{
menuNav._hideMenu(oActiveMenu);
menuNav._activeMenu=menuNav._rootMenu;
}
menuNav._clearActiveItem();
menuNav._hasFocus=false;
}
});
Y.namespace('Plugin');
Y.Plugin.MenuBarPlugin=MenuBarPlugin;
MenuBarPlugin.prototype._getMenuItems=function(menuId )
{
"use strict";
return vg.html.getElements(vg.html.getElement(menuId+"subMenu"),{tagName:'li'}, function(node){return vg.html.hasStyle('yui3-menuitem',node)});
};
MenuBarPlugin.prototype._toggle=function(menuId, index, disableMenuItem )
{
"use strict";
var disabledInternalMenuItemStyle='disabled-internal-menuitem',
internalMenuItemStyle='internal-menuitem',
disabledStyle='disabled',
hasStyle=vg.html.hasStyle,
menuItems=this._getMenuItems(menuId),
menuItem=menuItems[index],
menuItemLabel=vg.html.getElements(menuItem,{tagName:'a', attrName:'role', attrValue:'menuitem'})[0],
onclick=menuItem.getAttribute('onclick')||"return false",
dataOnClick=menuItem.getAttribute('dataOnClick')||"return false",
disabled=hasStyle(disabledStyle, menuItem)||hasStyle(disabledInternalMenuItemStyle, menuItem),
isInternal=hasStyle(internalMenuItemStyle, menuItem)||hasStyle(disabledInternalMenuItemStyle, menuItem),
doToggle=true;
if(typeof disableMenuItem!=='undefined' )
{
if(disabled===disableMenuItem)
{
doToggle=false;
}
disabled=!disableMenuItem;
}
if(doToggle)
{
if(disabled )
{
if(isInternal )
{
jsCBDdeleteStyle(menuItem, disabledInternalMenuItemStyle);
jsCBDaddStyle(menuItem, internalMenuItemStyle);
}
else
{
jsCBDdeleteStyle(menuItem, disabledStyle);
}
menuItem.setAttribute('onclick',dataOnClick );
menuItem.removeAttribute('dataOnClick');
menuItemLabel.removeAttribute('tabindex');
}
else
{
if(isInternal )
{
jsCBDdeleteStyle(menuItem, internalMenuItemStyle);
jsCBDaddStyle(menuItem, disabledInternalMenuItemStyle);
}
else
{
jsCBDaddStyle(menuItem, disabledStyle);
}
menuItem.setAttribute('dataOnClick',onclick );
menuItem.setAttribute('onclick','return false');
menuItemLabel.setAttribute('tabindex', "-1");
}
}
};
MenuBarPlugin.prototype._updateMenuItem=function(menuId, index, value )
{
"use strict";
var menuItems=this._getMenuItems(menuId),
menuItem=menuItems[index],
menuItemLabel=vg.html.getElements(menuItem,{tagName:'a', attrName:'role', attrValue:'menuitem'})[0];
menuItemLabel.innerHTML=value;
};
}, '3.4.0' ,{requires:['node', 'classnamemanager', 'plugin', 'event-focus']});


YUI.add('cbdGHMenuPlugin', function(Y){
"use strict";
function GHMenuBarPlugin(config)
{
GHMenuBarPlugin.superclass.constructor.apply(this, arguments);
}
GHMenuBarPlugin.NAME="GHMenuBarPlugin";
GHMenuBarPlugin.NS="GHMenuBarPlugin";
var ghCurrentId="gh-current",
cssClasses={
GH_ARROW:"x-ghArrow",
MENU_CONTENT:"yui3-menu-content",
PROMINENT_LINK:"ghProminentLink",
PROMINENT_LINK_ROW:"cbdGHRow",
SILO_ITEM:"x-ghSiloItem",
SILO_ITEM_HAS_SUB_MENU:"yui3-menuitem-hassubmenu",
SILO_ITEM_LINK:"x-ghSiloItemLink",
SILO_ITEM_OPEN:"x-ghSiloItemOpen",
SILO_ITEM_SUB_MENU:"x-ghSiloItemSubMenu"
},
selectors={
CURRENT_SILO_SELECTOR:"#"+ghCurrentId,
MENU_CONTENT_SELECTOR:"."+cssClasses.MENU_CONTENT,
PROMINENT_LINK_ROW_SELECTOR:"."+cssClasses.PROMINENT_LINK_ROW,
PROMINENT_LINK_SELECTOR:"."+cssClasses.PROMINENT_LINK,
SILO_ITEM_SELECTOR:"."+cssClasses.SILO_ITEM,
SILO_ITEM_SUB_MENU_OPEN_SELECTOR:"."+cssClasses.SILO_ITEM_OPEN+" ."+cssClasses.SILO_ITEM_SUB_MENU,
SILO_ITEM_SUB_MENU_SELECTOR:"."+cssClasses.SILO_ITEM_SUB_MENU
};
Y.extend(GHMenuBarPlugin, Y.Plugin.MenuBarPlugin,
{
initializer:function(config)
{
var THIS=this;
this._toggleResponsiveMenus();
cbdcommon.gh.init();
if(cbd.page.isResponsive===true)
{
cbd.getYUI().one(window).on('resize', function(e)
{
var ghMenus=vg.comp.getController(cbd.gh.GH_FIRST_NAV_ID);
if(ghMenus)
{
if(cbdcommon.screen.isMediaQuerySizeLarge())
{
THIS._enableMenu(ghMenus);
}
THIS._toggleResponsiveMenus();
}
});
}
},
destructor:function()
{
var eHandlers=this._ghMenuHandlers;
if(eHandlers)
{
Y.Array.each(eHandlers, function(handle)
{
handle.detach();
});
this._ghMenuHandlers=null;
}
},
_enableMenu:function()
{
var menuBar=this._rootMenu,
THIS=this,
eHandlers=[];
eHandlers.push(menuBar.on('mouseover', function(event){THIS._onMouseOver(event);}));
eHandlers.push(menuBar.on('mouseout', function(event){THIS._onMouseOut(event);}));
eHandlers.push(menuBar.on('mousemove', function(event){THIS._onMouseMove(event);}));
eHandlers.push(menuBar.on('mousedown', function(event){THIS._toggleSubmenuDisplay(event);}));
eHandlers.push(menuBar.on('click', function(event){THIS._toggleSubmenuDisplay(event);}));
eHandlers.push(menuBar.on('keypress', function(event){THIS._onKeyPress(event);}));
eHandlers.push(menuBar.on('keydown', function(event){THIS._onKeyDown(event);}));
eHandlers.push(menuBar.on('keypress', function(event){THIS._toggleSubmenuDisplay(event);}));
eHandlers.push(menuBar.on('focusin', function(event){THIS._onMenuFocus(event);}));
if(cbdcommon.support.isTouchEnabled)
{
eHandlers.push(cbd.getYUI().one('body').on('touchstart', function(event){THIS._onDocMouseDown(event);}));
}
else
{
eHandlers.push(cbd.getYUI().one('body').on('mousedown', function(event){THIS._onDocMouseDown(event);}));
}
this._ghMenuHandlers=eHandlers;
},
_disableMenu:function()
{
this._rootMenu.detach();
},
_resetRespEvents:function()
{
var THIS=this,
menu=this._rootMenu,
isRespSize=cbdcommon.screen.isMediaQuerySize('s,m');
menu.detach("click");
if(isRespSize )
{
menu.on("click", function(event){THIS._toggleSilo(event);});
}
},
_fixDisplayPropertyOnSubMenus:function()
{
var menu=this._rootMenu,
isRespSize=cbdcommon.screen.isMediaQuerySize('s,m'),
itemSelector=isRespSize?selectors.SILO_ITEM_SUB_MENU_OPEN_SELECTOR:selectors.SILO_ITEM_SUB_MENU_SELECTOR,
displayProp=isRespSize?"block":"",
siloItemSubMenus=menu.all(itemSelector);
if(siloItemSubMenus )
{
siloItemSubMenus.setStyle("display", displayProp);
if(!isRespSize )
{
siloItemSubMenus.setStyle("height", "");
}
}
},
_switchProminentLinkLocation:function()
{
var	menu=this._rootMenu,
isRespSize=cbdcommon.screen.isMediaQuerySize('s,m'),
prominentLinks=menu.all(selectors.PROMINENT_LINK_SELECTOR),
prominentLinkIndex,
prominentLinkGHRow,
prominentLinkGHRowParent,
prominentLinkGHRowParentFirstChild,
prominentLinkIsFirstChild,
shouldSwapPosition;
if(prominentLinks)
{
prominentLinkIndex=prominentLinks.size();
while(prominentLinkIndex--)
{
prominentLinkGHRow=prominentLinks.item(prominentLinkIndex).ancestor(selectors.PROMINENT_LINK_ROW_SELECTOR);
prominentLinkGHRowParent=prominentLinkGHRow.ancestor();
prominentLinkGHRowParentFirstChild=prominentLinkGHRowParent.one(selectors.PROMINENT_LINK_ROW_SELECTOR);
prominentLinkIsFirstChild=(prominentLinkGHRowParentFirstChild===prominentLinkGHRow);
shouldSwapPosition=(isRespSize&&!prominentLinkIsFirstChild )||(!isRespSize&&prominentLinkIsFirstChild);
if(shouldSwapPosition)
{
prominentLinkGHRow.swap(prominentLinkGHRow.siblings().item(0));
}
}
}
},
_toggleResponsiveMenus:function()
{
var subMenuContent;
if(cbd.page.isResponsive)
{
if(cbdcommon.screen.isMediaQuerySize('l'))
{
this._enableMenu();
}
else
{
subMenuContent=this._rootMenu.all(selectors.MENU_CONTENT_SELECTOR);
subMenuContent.setStyles({height:"100%", width:"100%"});
this._disableMenu();
}
this._resetRespEvents();
this._fixDisplayPropertyOnSubMenus();
this._switchProminentLinkLocation();
}
},
_toggleSilo:function(event)
{
var Y=cbd.getYUI(),
targetEl=Y.one(event.target),
clickedElWasSiloLink=targetEl.hasClass(cssClasses.SILO_ITEM_LINK)||targetEl.hasClass(cssClasses.GH_ARROW),
siloItemClicked=targetEl.ancestor(selectors.SILO_ITEM_SELECTOR),
isExpandableSiloItem=clickedElWasSiloLink&&siloItemClicked.hasClass(cssClasses.SILO_ITEM_HAS_SUB_MENU),
openClass,
isMenuOpen,
siloItemSubMenu,
animationConfig;
if(isExpandableSiloItem )
{
event.preventDefault();
openClass=cssClasses.SILO_ITEM_OPEN;
isMenuOpen=siloItemClicked.hasClass(openClass);
if(isMenuOpen)
{
siloItemClicked.removeClass(openClass);
}
else
{
siloItemClicked.addClass(openClass);
}
siloItemSubMenu=siloItemClicked.one(selectors.SILO_ITEM_SUB_MENU_SELECTOR);
animationConfig={
node:siloItemSubMenu,
speed:cbdcommon.gh.RESPONSIVE_SILO_ANIMATION_SPEED,
easing:'linear',
isOpening:!isMenuOpen,
isRespGHSiloToggle:true
};
vg.smil.slideToggle(animationConfig);
}
}
});
Y.namespace('Plugin');
Y.Plugin.GHMenuBarPlugin=GHMenuBarPlugin;
}, '3.4.0' ,{requires:['menuBarPlugin']});


(function(cbdcommon)
{
"use strict";
var getSearchOpt=function(tag, id )
{
var opts={tagName:tag};
if(id )
{
opts.attrName='id';
opts.attrValue=id;
}
return opts;
},
getClassFunc=function(cssClass )
{
return function(elem){return vg.html.hasStyle(cssClass, elem);};
},
MOUSE_LEAVE_EVENT='mouseleave',
toolTipInstances={},
shouldUseYuiEvent=function(eventName )
{
var isMouseLeaveEvent=eventName.indexOf(MOUSE_LEAVE_EVENT) > -1,
supportsMouseLeaveEvent=isMouseLeaveEvent?cbd.adapter.isEventSupported(MOUSE_LEAVE_EVENT):false;
return isMouseLeaveEvent&&!supportsMouseLeaveEvent;
};
cbd.adapter=
{
isEventSupported:function(eventName )
{
var element=document.createElement('div'),
isSupported=false;
eventName='on'+eventName;
isSupported=eventName in element;
if(!isSupported )
{
element.setAttribute(eventName, function(){return true;});
isSupported=typeof element[eventName]==='function';
}
element=null;
return isSupported;
},
getEventName:function(genericName)
{
var specificEvents={
ended:"CBD_ended",
error:"CBD_error",
play:"CBD_play",
playing:"CBD_playing",
canplay:"CBD_canplay",
loadedmetadata:"CBD_loadedmetadata",
timeupdate:"CBD_timeupdate",
progress:"CBD_progress",
waiting:"CBD_waiting",
GESTURE_MOVE:vg.event.GSTR_MOVE,
START_DRAG:vg.event.GSTR_DRAG_START,
END_DRAG:vg.event.GSTR_DRAG_END,
BROWSER_RESIZE_START:vg.event.BROWSER_RESIZE_START,
BROWSER_RESIZE_END:vg.event.BROWSER_RESIZE_END,
BREAK_POINT_CHANGE:vg.event.BREAK_POINT_CHANGE,
HOVER_START:vg.event.GSTR_HOVERSTART,
HOVER_END:vg.event.GSTR_HOVEREND
};
return specificEvents[genericName];
},
isNextGen:function()
{
return cbd.page.isNextGen;
},
isResponsive:function()
{
return cbd.page.isResponsive;
},
inheritPrototype:function(child, parent )
{
vg.comp.inheritPrototype(child, parent);
},
copy:function(node )
{
return vg.util.copyJsonOptions(node );
},
handleEachItem:function(list, handler)
{
cbd.getYUI().each(list, function(item){
if(typeof handler==='function')
{
handler(item);
}
});
},
deepAttach:function(defaults, options )
{
vg.util.deepAttachOptions(defaults, options );
},
attach:function(defaults, options )
{
vg.util.attachJsonOptions(defaults, options );
},
getAncestor:function(opts)
{
var searchOpts=getSearchOpt(opts.tag, opts.id ),
findClass;
if(opts.cssClass )
{
findClass=getClassFunc(opts.cssClass);
}
return vg.html.findAncestor(opts.node, searchOpts, findClass );
},
getElement:function(opts )
{
var searchOpts=getSearchOpt(opts.tag, opts.id ),
findClass;
if(opts.cssClass )
{
findClass=getClassFunc(opts.cssClass);
}
return vg.html.getElements(opts.node, searchOpts, findClass )[0];
},
getElementBySelector:function(selector)
{
var yuiNode=cbd.getYUI().one(selector);
if(yuiNode )
{
return yuiNode.getDOMNode();
}
return false;
},
getElementsBySelector:function(selector)
{
return cbd.getYUI().all(selector);
},
getElements:function(opts )
{
var searchOpts=getSearchOpt(opts.tag ),
findClass;
if(opts.cssClass )
{
findClass=getClassFunc(opts.cssClass);
}
return vg.html.getElements(opts.node, searchOpts, findClass );
},
hasChildren:function(selector )
{
var yuiNode=cbd.getYUI().one(selector);
if(yuiNode )
{
return yuiNode.hasChildNodes();
}
return false;
},
addClass:function(element, className)
{
var node=cbd.getYUI().one(element);
if(node)
{
node.addClass(className);
}
},
removeClass:function(element, className)
{
var node=cbd.getYUI().one(element);
if(node)
{
node.removeClass(className);
}
},
hasClass:function(element, className)
{
var node=cbd.getYUI().one(element);
if(node)
{
return node.hasClass(className);
}
return false;
},
setStyle:function(element, property, value)
{
var node=cbd.getYUI().one(element);
if(node)
{
node.setStyle(property, value);
}
},
getStyle:function(element, property)
{
var node=cbd.getYUI().one(element);
if(node)
{
return node.getStyle(property);
}
},
setStyleOnNodeList:function(nodeList, property, value)
{
nodeList.setStyle(property, value);
},
getNodeListLength:function(nodeList)
{
return nodeList.size();
},
getNodeListItem:function(nodeList, index)
{
return nodeList.item(index);
},
setStyles:function(element, jsonListOfStyles)
{
var node=cbd.getYUI().one(element);
if(node)
{
node.setStyles(jsonListOfStyles);
}
},
getAttribute:function(element, attribute)
{
var node=cbd.getYUI().one(element);
if(node)
{
return node.getAttribute(attribute);
}
},
getAttributeAsBoolean:function(element, attribute)
{
var node=cbd.getYUI().one(element),
attrib;
if(node)
{
attrib=node.getAttribute(attribute);
if(attrib )
{
return attrib.toString().toLowerCase()==="true";
}
}
return false;
},
setAttribute:function(element, attribute, value)
{
var node=cbd.getYUI().one(element);
if(node)
{
node.setAttribute(attribute, value);
}
},
append:function(element, html)
{
return cbd.getYUI().one(element).append(html);
},
getSiblings:function(opts )
{
return vg.html.getSiblings(opts.node,{tagName:opts.tag}, "+");
},
getWidth:function(node )
{
var yuiNode=cbd.getYUI().one(node);
if(yuiNode )
{
return vg.html.getObjWidth(yuiNode.getDOMNode());
}
else
{
return 0;
}
},
getHeight:function(node )
{
var yuiNode=cbd.getYUI().one(node);
if(yuiNode)
{
return vg.html.getObjHeight(yuiNode.getDOMNode());
}
else
{
return 0;
}
},
getSize:function(node )
{
return vg.html.getObjSizeInHiddenAncestor(node );
},
getViewportHeight:function()
{
return cbd.getYUI().one(document.body).get("winHeight");
},
getViewportWidth:function()
{
return cbd.getYUI().one(document.body).get("winWidth");
},
addEventListener:function(opts)
{
var controller=opts.controller,
eventName=opts.event;
if(controller )
{
vg.html.addEventListenerMethod(opts.node, eventName, controller, opts.func, opts.id, null, null, true, shouldUseYuiEvent(eventName) );
}
else
{
vg.html.addEventListener(opts.node, eventName, opts.func, opts.id, null, null, true, shouldUseYuiEvent(eventName) );
}
},
removeEventListener:function(opts)
{
vg.html.removeEventListenerById(opts.node, opts.id, true, shouldUseYuiEvent(opts.event));
},
fireEvent:function(opts)
{
var node=opts.node;
vg.html._fireCustomEvent(opts.event, node,{"target":node});
},
onReady:function(func )
{
vg.util.execOnPageReady(func );
},
getEventPosition:function(event)
{
return vg.event.getPosition(event);
},
getRelativeEventPos:function(event, node )
{
return vg.event.getPositionRelativeToElem(event, node);
},
getController:function(id)
{
return vg.comp.getController(id);
},
setController:function(comp, id )
{
comp.base=vg.Controller;
comp.base(id, id , true);
},
formatNumber:function(field, precision, removeLeadingZero )
{
jsCBDformatNumber(field, precision, undefined, undefined, removeLeadingZero);
},
loadJS:function(cbdJSName, callback )
{
cbd.loader.require(cbdJSName);
cbd.loader.addCallback(callback);
cbd.loader.load();
},
toggle:function(nodeId)
{
jsCBDtoggle(nodeId);
},
toggleEachItem:function(state, item)
{
item.toggleView(state);
},
parseJSON:function(stringToParse)
{
var jsonObj;
cbd.getYUI().use("json-parse", function(Y){
jsonObj=Y.JSON.parse(stringToParse);
});
return jsonObj;
},
getPosition:function(node)
{
return vg.html.getObjXY(node, false);
},
isLayerSupported:function()
{
return RIA;
},
getContent:function(url, callback)
{
jsCBDgetContent(url, callback);
}
};
}());

