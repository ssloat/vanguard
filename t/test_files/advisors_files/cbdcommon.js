
(function()
{
"use strict";
var cbdcommon=window.cbdcommon||{};
window.cbdcommon=cbdcommon;
cbdcommon.init=function()
{
cbdcommon.support.init();
cbdcommon.screen.addZoomListenersForIOS(cbd.adapter.isResponsive());
if(cbdcommon.idleTimer&&cbdcommon.idleTimer.isEnabled())
{
cbdcommon.idleTimer.initIdleTimer();
}
};
}());
(function(cbdcommon)
{
"use strict";
var supportNamespace=null,
navigator=window.navigator,
userAgent=navigator.userAgent,
platform=navigator.platform,
browser={
ie:!!window.ActiveXObject,
windows:platform?/Win/.test(platform):false
},
_OVERFLOW_CLASSES_MAP=
{
overflow:{
'true':'overflowSupported',
'false':'overflowNotSupported'
},
overflowScrolling:{
'true':'overflowScrollingSupported',
'false':'overflowScrollingNotSupported'
}
},
_OVERFLOW_SCROLLING_PROPERTY="overflowScrolling",
_FIX_ANIMATION_FLICKER_CLASS="fixAnimationFlicker",
_BROWSER_SCROLLBAR_CLASS="browserHasScrollbars",
_ANDROID_NATIVE_CLASS="androidNativeBrowser",
_setOverflowSupport=function()
{
var supported=true,
cssClass;
if(browser.shouldCheckOverflow&&!browser.isOverflowScrollingSupported )
{
supported=false;
if(browser.isiOSSafari&&(browser.iOSVersion > 4 ) )
{
supported=true;
}
}
cssClass=_OVERFLOW_CLASSES_MAP.overflow[supported];
cbd.adapter.addClass(document.body, cssClass);
browser.isOverflowSupported=supported;
},
_setOverflowScrollingSupport=function()
{
var isiOSLessThan6=browser.isiOSSafari&&(browser.iOSVersion < 6 ),
supportsCssProperty=cbdcommon.support.hasStyle(_OVERFLOW_SCROLLING_PROPERTY),
supported=supportsCssProperty&&!isiOSLessThan6,
cssClass=_OVERFLOW_CLASSES_MAP.overflowScrolling[supported];
cbd.adapter.addClass(document.body, cssClass);
browser.isOverflowScrollingSupported=supported;
},
_setOverflowInfo=function()
{
browser.shouldCheckOverflow=(
(browser.isiOSSafari )||
(browser.isAndroid&&browser.androidVersion&&browser.androidVersion < 3 )
);
_setOverflowScrollingSupport();
_setOverflowSupport();
cbdcommon.support.isOverflowSupported=browser.isOverflowSupported;
},
_setIOSInfo=function(UAString)
{
browser.isIOSDevice=!!(
UAString.match(/iPhone/i)||
UAString.match(/iPad/i)||
UAString.match(/iPod/i)
);
cbdcommon.support.hasiOSZoomBug=browser.isIOSDevice;
cbdcommon.support.hasiOSLayerBug=browser.isIOSDevice;
},
_setAndroidVersion=function(UAString)
{
var androidVersNumRegex=/Android.*?\;/i,
androidVersNumStr,
androidVersNum;
if(browser.isAndroid )
{
androidVersNumStr=androidVersNumRegex.exec(UAString);
if(androidVersNumStr)
{
androidVersNum=androidVersNumStr[0].replace("Android","").replace(" ","").replace(";","");
browser.androidVersion=parseInt(androidVersNum,10);
}
}
},
_setiOSVersion=function(UAString)
{
var iOSVersNumRegex=/OS.*?like/i,
iOSVersNumStr,
iOSVersNum;
if(browser.isIOSDevice )
{
iOSVersNumStr=iOSVersNumRegex.exec(UAString);
if(iOSVersNumStr)
{
iOSVersNum=iOSVersNumStr[0].replace("OS","").replace("like","").replace(" ","");
browser.iOSVersion=parseInt(iOSVersNum,10);
}
}
},
_setAnimationFlickerInfo=function()
{
if(browser.isiOSSafari&&(browser.iOSVersion > 5 ) )
{
cbd.adapter.addClass(document.body, _FIX_ANIMATION_FLICKER_CLASS);
}
},
_getBrowserScrollBarWidth=function()
{
var cbdAdapter=cbd.adapter,
divTag="div",
outerScrollBarContainer=document.createElement(divTag),
outerScrollBarContainerId="outerScrollBarContainer",
innerScrollBarContainer=document.createElement(divTag),
innerScrollBarContainerId="innerScrollBarContainer",
body=document.body,
outerWidth,
innerWidth,
scrollBarWidth;
outerScrollBarContainer.id=outerScrollBarContainerId;
innerScrollBarContainer.id=innerScrollBarContainerId;
outerScrollBarContainer.appendChild(innerScrollBarContainer);
body.appendChild(outerScrollBarContainer);
outerScrollBarContainer=document.getElementById(outerScrollBarContainerId);
outerWidth=outerScrollBarContainer.offsetWidth;
innerWidth=document.getElementById(innerScrollBarContainerId).clientWidth;
scrollBarWidth=outerWidth - innerWidth;
body.removeChild(outerScrollBarContainer);
return scrollBarWidth;
},
_setScrollbarInfo=function()
{
browser.scrollBarWidth=_getBrowserScrollBarWidth();
if(browser.scrollBarWidth > 0 )
{
cbd.adapter.addClass(document.body, _BROWSER_SCROLLBAR_CLASS);
}
cbdcommon.support.scrollbarWidth=browser.scrollBarWidth;
},
_setAndroidNativeClass=function()
{
if(browser.isAndroidNative )
{
cbd.adapter.addClass(document.body, _ANDROID_NATIVE_CLASS );
}
},
browserIsAndroidLessThan4=function()
{
return parseInt((/android(\d+)/.exec(userAgent.toLowerCase())||[])[1], 10) < 4;
},
returnTrue=function()
{
return true;
},
returnFalse=function()
{
return false;
};
supportNamespace=cbdcommon.support=cbdcommon.support||{};
supportNamespace.isTouchEnabled=!!('ontouchstart' in window);
supportNamespace.hasiOSZoomBug=false;
supportNamespace.hasiOSLayerBug=false;
supportNamespace.isOverflowSupported=true;
supportNamespace.scrollbarWidth=0;
supportNamespace.supportsPinchAndZoom=supportNamespace.isTouchEnabled;
supportNamespace.OVERFLOW_SCROLLING_CLASS="overflowScrollingTouch";
supportNamespace.flashRequiresClassId=browser.ie&&browser.windows;
supportNamespace.hasStyle=function(cssStyle)
{
var supported=false,
vendorPrefixes=['Moz', 'Webkit', 'ms', 'O'],
numPrefixes=vendorPrefixes.length,
styles=supportNamespace._getCSSStyleDeclarations(),
i=0,
prefixedCss;
if(typeof styles[cssStyle]!=='undefined')
{
supported=true;
}
else
{
cssStyle=cssStyle.slice(0,1).toUpperCase()+cssStyle.slice(1);
for(i;i < numPrefixes;i++)
{
prefixedCss=vendorPrefixes[i]+cssStyle;
if(typeof styles[prefixedCss]!=='undefined')
{
supported=true;
break;
}
}
}
return supported;
};
supportNamespace.init=function()
{
var UAString=navigator.userAgent;
_setIOSInfo(UAString);
browser.isAndroid=!!(UAString.match(/Android/i));
browser.isChrome=!!(UAString.match(/Chrome/i));
browser.isiOSChrome=!!(UAString.match(/CriOS/i));
browser.isSafari=!!(UAString.match(/Safari/i))&&(!browser.isChrome&&!browser.isiOSChrome );
browser.isAndroidNative=(browser.isAndroid&&browser.isSafari );
browser.isiOSSafari=(browser.isIOSDevice&&browser.isSafari );
_setAndroidVersion(UAString);
_setiOSVersion(UAString);
_setOverflowInfo();
_setAnimationFlickerInfo();
_setScrollbarInfo();
_setAndroidNativeClass();
};
supportNamespace._getCSSStyleDeclarations=function()
{
return document.body.style;
};
supportNamespace.isHTML5HistorySupported=function()
{
var supportsHistory=typeof(window.history)!=="undefined"
&&typeof(window.history.pushState)!=="undefined"
&&!browserIsAndroidLessThan4();
if(supportsHistory)
{
supportNamespace.isHTML5HistorySupported=returnTrue;
}
else
{
supportNamespace.isHTML5HistorySupported=returnFalse;
}
return supportsHistory;
};
supportNamespace.isAddressBarIndcludedInWindowHeight=function()
{
var windowHeightIncludesAddressBar=browser.isIOSDevice;
if(windowHeightIncludesAddressBar)
{
supportNamespace.isAddressBarIndcludedInWindowHeight=returnTrue;
}
else
{
supportNamespace.isAddressBarIndcludedInWindowHeight=returnFalse;
}
return windowHeightIncludesAddressBar;
};
}(cbdcommon));
(function()
{
"use strict";
var cbdcommon=window.cbdcommon||{};
window.cbdcommon=cbdcommon;
cbdcommon.constants=cbdcommon.constants||{};
cbdcommon.constants.CBD_MODAL_POP="cbdModalWin";
}());
(function(cbdcommonSupport)
{
"use strict";
var cbdcommon=window.cbdcommon||{};
window.cbdcommon=cbdcommon;
cbdcommon.screen=cbdcommon.screen||{};
cbdcommon.screen.breakPoint=null;
cbdcommon.screen.mediaQueryNoSupport='nomediaquerysupport';
cbdcommon.screen.mediaQuerySmall='small';
cbdcommon.screen.mediaQueryMedium='medium';
cbdcommon.screen.mediaQueryLarge='large';
cbdcommon.screen.mediaQuerySizes=[cbdcommon.screen.mediaQueryNoSupport, cbdcommon.screen.mediaQuerySmall, cbdcommon.screen.mediaQueryMedium, cbdcommon.screen.mediaQueryLarge];
cbdcommon.screen.mediaQuerySizesShort={
"s":cbdcommon.screen.mediaQuerySmall,
"m":cbdcommon.screen.mediaQueryMedium,
"l":cbdcommon.screen.mediaQueryLarge
};
cbdcommon.screen.getMediaQuerySize=function()
{
var	breakPtDiv=document.getElementById("breakpoint"),
breakPointNode,
medQuerVal;
if(!breakPtDiv )
{
breakPointNode=document.createElement("div");
breakPointNode.setAttribute("id", "breakpoint");
cbd.adapter.append(document.body, breakPointNode);
breakPtDiv=document.getElementById("breakpoint");
}
if(window.getComputedStyle)
{
medQuerVal=window.getComputedStyle(breakPtDiv, null).getPropertyValue('width').replace(/"/ig,'').replace('px','');
return cbdcommon.screen.mediaQuerySizes[Math.round(medQuerVal)];
}
else
{
return cbdcommon.screen.mediaQueryLarge;
}
};
cbdcommon.screen.isMediaQuerySizeSmall=function()
{
return(cbdcommon.screen.getMediaQuerySize()===cbdcommon.screen.mediaQuerySmall);
};
cbdcommon.screen.isMediaQuerySizeMedium=function()
{
return(cbdcommon.screen.getMediaQuerySize()===cbdcommon.screen.mediaQueryMedium);
};
cbdcommon.screen.isMediaQuerySizeLarge=function()
{
return(cbdcommon.screen.getMediaQuerySize()===cbdcommon.screen.mediaQueryLarge);
};
cbdcommon.screen.isQuirksModeBrowser=function()
{
return document.body.className.indexOf("qmb") > -1;
};
cbdcommon.screen.isMediaQuerySize=function(sizesToCheck)
{
var commonScreen=cbdcommon.screen,
shortMediaQuerySizes=commonScreen.mediaQuerySizesShort,
currentMediaQuery=commonScreen.getMediaQuerySize(),
sizes=sizesToCheck.split(","),
numSizes=sizes.length,
returnValue=false,
sizeToCheck,
i;
for(i=0;i<numSizes;i++)
{
sizeToCheck=shortMediaQuerySizes[sizes[i].toLowerCase()];
if(sizeToCheck&&(currentMediaQuery===sizeToCheck ) )
{
returnValue=true;
}
}
return returnValue;
};
cbdcommon.screen.addZoomListenersForIOS=function(isResponsive)
{
var eventConfig;
if(cbdcommonSupport.hasiOSZoomBug&&isResponsive===true)
{
cbdcommon.screen.setViewportMetaContent({width:"device-width", initScale:1, minScale:1, maxScale:1});
eventConfig={node:window,
event:"orientationchange",
func:function()
{
cbdcommon.screen.setViewportMetaContent({width:"device-width", initScale:1, minScale:1, maxScale:1});
}
};
cbd.adapter.addEventListener(eventConfig);
eventConfig={node:document,
event:"gesturestart",
func:function()
{
cbdcommon.screen.setViewportMetaContent({width:"device-width", initScale:1, minScale:0.25, maxScale:5});
}
};
cbd.adapter.addEventListener(eventConfig);
}
};
cbdcommon.screen.setViewportMetaContent=function(config)
{
var width=config.width||"device-width",
initScale=config.initScale||1,
minScale=config.minScale||0.25,
maxScale=config.maxScale||5,
meta=document.querySelectorAll('meta[name=viewport]');
if(meta.length > 0)
{
meta[0].content="initial-scale="+initScale+", minimum-scale="+minScale+", maximum-scale="+maxScale+", width="+width;
}
};
cbdcommon.screen.getMetaTag=function(tagName)
{
var metaTags=document.getElementsByTagName("meta"),
size=metaTags.length,
metaTag=null,
i,
metaTagNode,
metaTagName;
for(i=0;i < size;i++)
{
metaTagNode=metaTags[i];
metaTagName=metaTagNode.getAttribute("name");
if(metaTagName===tagName)
{
metaTag=metaTagNode;
}
}
return metaTag;
};
}(cbdcommon.support));
(function(cbdcommon, cbdcommonScreen)
{
"use strict";
var previousWindowWidth=window.innerWidth,
previousWindowHeight=window.innerHeight,
windowHasResized=function()
{
var hasResized=false,
cbdAdapter=cbd.adapter,
width=window.innerWidth,
height=window.innerHeight;
if(width!==previousWindowWidth||height!==previousWindowHeight)
{
hasResized=true;
previousWindowWidth=width;
previousWindowHeight=height;
}
return hasResized;
};
cbdcommon.event=cbdcommon.event||{};
cbdcommon.event.browserResizeHandler=function(event)
{
var eventNS=cbdcommon.event,
newBreakPoint,
mediaQuery=cbdcommonScreen.getMediaQuerySize();
if(windowHasResized())
{
if(eventNS.windowResizeTimeout===undefined )
{
cbd.adapter.fireEvent({event:"CBD_BROWSER_RESIZE_START"});
}
clearTimeout(cbdcommon.event.windowResizeTimeout);
eventNS.windowResizeTimeout=setTimeout(function()
{
delete eventNS.windowResizeTimeout;
cbd.adapter.fireEvent({event:"CBD_BROWSER_RESIZE_END"});
newBreakPoint=cbdcommonScreen.getMediaQuerySize();
if(newBreakPoint!==cbdcommonScreen.breakPoint)
{
cbd.adapter.fireEvent({event:"CBD_BREAK_POINT_CHANGE"});
cbdcommonScreen.breakPoint=newBreakPoint;
}
}, 100);
}
};
cbdcommon.event.preventDefault=function(event)
{
if(event.preventDefault)
{
event.preventDefault();
}
else
{
event.returnValue=false;
}
};
}(cbdcommon, cbdcommon.screen));
(function()
{
"use strict";
var cbdcommon=window.cbdcommon||{};
window.cbdcommon=cbdcommon;
cbdcommon.string=cbdcommon.string||{};
cbdcommon.string.startsWith=function(str, strToMatch)
{
return(str.match("^"+strToMatch)==strToMatch);
};
cbdcommon.string.isEmpty=function(s)
{
return(!s||typeof(s)!=="string"||!s.length );
};
cbdcommon.string.stripHTMLComments=function(str)
{
return str.replace(/<!--(.*?)-->/gm, "");
};
cbdcommon.string.removeTags=function(s)
{
return String(s).replace(/<\/?[^>]+>/gi, "");
};
}());
(function()
{
"use strict";
var cbdcommon=window.cbdcommon||{};
window.cbdcommon=cbdcommon;
cbdcommon.url=cbdcommon.url||{};
cbdcommon.url.navigate=function(url, win, addWebUsage)
{
var curUrl=window.location.href,
start,
end,
queryStr,
poundPos=curUrl.indexOf("#");
if(poundPos > -1 )
{
curUrl=curUrl.substring(0, poundPos);
}
url=cbdcommon.url.addQueryStringParam(url, null, cbdcommon.url.getGHQueryStr(), false, true);
if(url.charAt(0)=='#')
{
url=cbdcommon.url.stripServerName(curUrl)+url;
}
if(addWebUsage )
{
start=curUrl.lastIndexOf("/")+1;
queryStr=curUrl.indexOf("?");
end=queryStr >=0?queryStr:curUrl.length;
url=cbdcommon.url.addQueryStringParam(url, "origin", curUrl.substring(start, end) );
}
win=(win!=null?win:self);
win.top.location=cbdcommon.url.concatUrl(url);
};
cbdcommon.url._isRelativeUrl=function(url)
{
return url.indexOf(":/") < 0&&url.indexOf('/')==0;
};
cbdcommon.url.addQueryStringParam=function(url, param, value, encode, skipEmpty)
{
if(cbdcommon.string.isEmpty(value)&&skipEmpty)
{
return url;
}
var ampersand=encode?"%26":"&",
anchPos=url.indexOf("#"),
anch="";
if(anchPos==0)
{
return url;
}
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
};
cbdcommon.url.stripServerName=function(url)
{
if(!cbdcommon.url._isRelativeUrl(url) )
{
url=url.substring(url.indexOf("/",8));
}
return url;
};
cbdcommon.url.getGHQueryStr=function()
{
var app=cbdcommon.url.getQueryValue("APP"),
qstr="";
if(cbdcommon.string.isEmpty(app))
{
return null;
}
qstr=cbdcommon.url.copyParam(qstr, "APP");
qstr=cbdcommon.url.copyParam(qstr, "crossover");
qstr=cbdcommon.url.copyParam(qstr, "dbOnly");
qstr=cbdcommon.url.copyParam(qstr, "SelectedPlanId");
qstr=cbdcommon.url.copyParam(qstr, "CALLHANDLER");
return qstr.substring(1);
};
cbdcommon.url.isJavascript=function(s)
{
return cbdcommon.string.startsWith(s, "javascript:");
};
cbdcommon.url.copyParam=function(queryStr, param)
{
return cbdcommon.url.addQueryStringParam(queryStr, param, cbdcommon.url.getQueryValue(param), false, true);
};
cbdcommon.url.concatUrl=function(url)
{
if(cbdcommon.url._isRelativeUrl(url))
{
if(!cbdcommon.url.prefix&&cbd.url.prefix)
{
cbdcommon.url.prefix=cbd.url.prefix;
}
url=cbdcommon.url.prefix+url;
}
return url;
};
cbdcommon.url.getQueryValue=function(attribute)
{
var myQstr=unescape(location.search.substring(1)),
attrArray=myQstr.split("&"),
attrKeyVal=[],
i;
for(i=0;i < attrArray.length;i++)
{
attrKeyVal=attrArray[i].split("=");
if(attrKeyVal[0].toUpperCase()==attribute.toUpperCase())
{
return attrKeyVal[1];
}
}
};
cbdcommon.url.openPopUp=function(config)
{
var menubar=config.menubar,
toolbar=config.toolbar,
location=config.location,
status=config.status,
directories=config.directories,
copyhistory=config.copyhistory,
toolbars={menubar:menubar, toolbar:toolbar},
scrollbars=(config.scroll)?"yes":"no",
resizable=(config.resize)?"yes":"no",
windowWidth=(screen.width - config.width)/2,
windowHeight=(screen.height - config.height - cbdcommon.url.getToolbarHeight(toolbars) )/2,
windowConfigStr="scrollbars="+scrollbars+",resizable="+resizable+",width="+config.width+",height="+config.height+",top="+config.topLoc+",left="+config.leftLoc,
url=config.url;
if(menubar)
{
windowConfigStr+=",menubar";
}
if(toolbar)
{
windowConfigStr+=",toolbar";
}
if(location)
{
windowConfigStr+=",location";
}
if(status)
{
windowConfigStr+=",status";
}
if(directories)
{
windowConfigStr+=",directories";
}
if(copyhistory)
{
windowConfigStr+=",copyhistory";
}
url=cbdcommon.url.concatUrl(url);
return window.open(url, config.windowName, windowConfigStr);
};
cbdcommon.url.getToolbarHeight=function(windowFeatures)
{
var height=0;
if(windowFeatures.menubar)
{
height+=60;
}
if(windowFeatures.toolbar)
{
height+=60;
}
return height;
},
cbdcommon.url.isURL=function(url)
{
return url.length > 0&&url.indexOf('javascript:') < 0&&url.indexOf('void(') < 0&&url.indexOf('#') < 0;
};
}());
(function(cbdcommon)
{
"use strict";
var idleTimer={},
initialized=false,
warningThreshold,
expireThreshold,
CBD_CLOSE_IDLE_LAYER_EVENT="CBD_CLOSE_IDLE_LAYER",
CBD_OPEN_IDLE_LAYER_EVENT="CBD_OPEN_IDLE_LAYER",
CBD_PAGE_IDLE_WARNING_EVENT="CBD_PAGE_IDLE_WARNING",
EventTimer=function(cfg)
{
this.active=false;
this.eventName=cfg.eventName;
this.node=cfg.node;
this.timeout=cfg.timeout;
this.timeoutId=undefined;
},
getIdleTimerConfigurationFromCookie=function()
{
var idleTimerCookieValue=cbdcommon.cookie.getCookie("CBDIdleTimer");
return(idleTimerCookieValue)?idleTimerCookieValue.split("|"):[];
},
closeWarningLayer=function()
{
if(cbd.adapter.isLayerSupported())
{
cbd.adapter.fireEvent({event:CBD_CLOSE_IDLE_LAYER_EVENT, node:window});
}
},
getLogoffURL=function()
{
var metaTag=document.getElementById('cbdSiteIdleTimerEnabled');
return metaTag.getAttribute('data-logoff-url');
},
getResetURL=function()
{
var metaTag=document.getElementById('cbdSiteIdleTimerEnabled');
return metaTag.getAttribute('data-reset-url');
},
navigateToLogoffPage=function()
{
setTimeout(function(){
cbdcommon.url.navigate(getLogoffURL());
}, 2000);
},
getLastServerTime=function()
{
var lastServerTime=getIdleTimerConfigurationFromCookie()[0];
return(lastServerTime)?parseInt(lastServerTime, 10):null;
},
isExtendedSessionUser=function()
{
return getIdleTimerConfigurationFromCookie()[1]==="true";
},
getWarningThreshold=function()
{
var warning=getIdleTimerConfigurationFromCookie()[2];
return(warning)?Math.round(parseFloat(warning)*60000):null;
},
getExpireThreshold=function()
{
var expire=getIdleTimerConfigurationFromCookie()[3],
warning=getWarningThreshold();
return(expire&&warning)?Math.round((parseFloat(expire)*60000) - warning):null;
},
getAdditionalTimeForWarningTimerToRun=function(currentTime)
{
var additionalTimeForWarningTimerToRun,
lastServerTime,
timeSinceLastReset;
lastServerTime=getLastServerTime();
timeSinceLastReset=currentTime - lastServerTime;
additionalTimeForWarningTimerToRun=getWarningThreshold() - timeSinceLastReset;
return additionalTimeForWarningTimerToRun;
},
getTimeUntilExpiration=function(currentTime)
{
var additionalTimeForWarningTimerToRun=getAdditionalTimeForWarningTimerToRun(currentTime);
return additionalTimeForWarningTimerToRun+getExpireThreshold();
},
isUserLoggedOff=function(currentTime)
{
return getTimeUntilExpiration(currentTime) <=0;
},
restartWarningTimer=function(currentTime, additionalTimeForWarningTimerToRun)
{
idleTimer.warningTimerStart=currentTime;
idleTimer.warningTimer.timeout=additionalTimeForWarningTimerToRun;
idleTimer.warningTimer.start();
},
setTimerThresholds=function()
{
var lastServerTime=getLastServerTime();
if(lastServerTime)
{
warningThreshold=getWarningThreshold();
expireThreshold=getExpireThreshold();
warningThreshold=(warningThreshold > 0)?warningThreshold:0;
expireThreshold=(expireThreshold > 0)?expireThreshold:0;
}
},
expireHandler=function()
{
var currentTime=idleTimer.expireTimerStart+expireThreshold,
additionalTimeForWarningTimerToRun;
closeWarningLayer();
if(isUserLoggedOff(currentTime))
{
navigateToLogoffPage();
}
else
{
additionalTimeForWarningTimerToRun=getAdditionalTimeForWarningTimerToRun(currentTime);
restartWarningTimer(currentTime, additionalTimeForWarningTimerToRun);
}
},
initExpire=function()
{
expireThreshold=getExpireThreshold();
idleTimer.expireTimer=new EventTimer({
timeout:expireThreshold,
eventName:"CBD_PAGE_IDLE",
node:window
});
idleTimer.expireTimer.start();
var eventConfig={
node:window,
event:"CBD_PAGE_IDLE",
func:expireHandler,
id:"CBD_PAGE_IDLE_EXPIRE"
};
cbd.adapter.addEventListener(eventConfig);
},
warningHandler=function()
{
var currentTime=idleTimer.warningTimerStart+idleTimer.warningTimer.timeout,
additionalTimeForWarningTimerToRun;
additionalTimeForWarningTimerToRun=getAdditionalTimeForWarningTimerToRun(currentTime);
if(additionalTimeForWarningTimerToRun > 0)
{
restartWarningTimer(currentTime, additionalTimeForWarningTimerToRun);
}
else
{
idleTimer.expireTimerStart=currentTime;
initExpire();
if(cbd.adapter.isLayerSupported())
{
cbd.adapter.fireEvent({event:CBD_OPEN_IDLE_LAYER_EVENT, node:window});
}
}
},
initWarningTimer=function()
{
var eventConfig;
idleTimer.warningTimerStart=getLastServerTime();
idleTimer.warningTimer=new EventTimer({
timeout:warningThreshold,
eventName:CBD_PAGE_IDLE_WARNING_EVENT,
node:window
});
idleTimer.warningTimer.start();
eventConfig={
node:window,
event:CBD_PAGE_IDLE_WARNING_EVENT,
func:warningHandler,
id:CBD_PAGE_IDLE_WARNING_EVENT
};
cbd.adapter.addEventListener(eventConfig);
};
EventTimer.prototype=
{
start:function()
{
this.active=true;
var THIS=this;
this.timeoutId=setTimeout(function(){THIS.fireEvent(THIS.eventName, THIS.node);}, this.timeout);
},
stop:function()
{
this.active=false;
this.clear();
},
clear:function()
{
clearTimeout(this.timeoutId);
},
reset:function()
{
this.clear();
var THIS=this;
this.timeoutId=setTimeout(function(){THIS.fireEvent(THIS.eventName, THIS.node);}, this.timeout);
},
fireEvent:function(event, node)
{
cbd.adapter.fireEvent({event:event, node:node});
}
};
window.cbdcommon=cbdcommon;
cbdcommon.idleTimer=cbdcommon.idleTimer||{};
cbdcommon.idleTimer.isEnabled=function()
{
return document.getElementById("cbdSiteIdleTimerEnabled")!==null;
};
cbdcommon.idleTimer.isExtendedSessionUser=function()
{
return isExtendedSessionUser();
};
cbdcommon.idleTimer.reset=function()
{
var idleTimerResetURL=getResetURL(),
cookieResetCallback=function(){
var lastServerTime=getLastServerTime();
if(lastServerTime)
{
restartWarningTimer(lastServerTime, getWarningThreshold());
}
};
closeWarningLayer();
if(!isExtendedSessionUser())
{
idleTimer.expireTimer.stop();
cbd.adapter.getContent(idleTimerResetURL, cookieResetCallback);
}
};
cbdcommon.idleTimer.initIdleTimer=function()
{
if(!initialized&&getIdleTimerConfigurationFromCookie().length===4)
{
initialized=true;
setTimerThresholds();
if((typeof warningThreshold==="number"&&warningThreshold >=0)&&(typeof expireThreshold==="number"&&expireThreshold >=0))
{
initWarningTimer();
}
}
};
}(cbdcommon));
(function()
{
"use strict";
var cbdcommon=window.cbdcommon||{};
window.cbdcommon=cbdcommon;
cbdcommon.wu={};
cbdcommon.wu.observables;
cbdcommon.wu.CBD_OBSERVABLES="cbd_observables";
cbdcommon.wu.WU="WU";
cbdcommon.wu.observe=function()
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
cbdcommon.wu.addOrAppendMetaTag(wu.CBD_OBSERVABLES, wuData+isChecked);
}
}
else if(type=='button'||type=='submit'||type=='CommandButton')
{
cbdcommon.wu.addOrAppendMetaTag(wu.CBD_OBSERVABLES, wuData);
}
}
cbdcommon.wu.dcsTag();
};
cbdcommon.wu.addOrAppendMetaTag=function(name, value)
{
var tag=cbdcommon.screen.getMetaTag("DCSext."+name);
if(tag!=null)
{
cbdcommon.wu.appendValueToTag(tag, value);
}
else
{
cbdcommon.wu.addMetaTag(name, value);
}
};
cbdcommon.wu.addMetaTag=function(name, value)
{
var dcsExtName=cbdcommon.string.startsWith(name, "WT.")?name:"DCSext."+name;
var elem=cbdcommon.screen.getMetaTag(dcsExtName);
if(!elem)
{
elem=document.createElement("meta");
document.getElementsByTagName("head")[0].appendChild(elem);
elem.name=dcsExtName;
}
elem.content=value;
cbdcommon.wu._cbdProcessDCSVal(dcsExtName, value);
};
cbdcommon.wu.updateMetaTag=function(name, value)
{
var elem=cbdcommon.screen.getMetaTag(name);
if(elem!=null)
{
elem.content=value;
cbdcommon.wu._cbdProcessDCSVal(name, value);
}
};
cbdcommon.wu.clearMetaTag=function(name)
{
var dcsName=cbdcommon.string.startsWith(name, "WT.")?name:"DCSext."+name;
var metaTagNode=cbdcommon.screen.getMetaTag(dcsName);
if(metaTagNode)
{
metaTagNode.content="";
cbdcommon.wu._cbdClearDCSVal(dcsName);
}
};
cbdcommon.wu.updateDcsUri=function(uri)
{
if(wtActive)
{
_tag.dcsMeta();
dcsMultiTrack('DCS.dcsuri', uri);
}
};
cbdcommon.wu.calldcsMultiTrack=function()
{
if(wtActive)
{
dcsMultiTrack.apply(this, arguments);
}
};
cbdcommon.wu.calldcsMultiTrackWithMeta=function()
{
if(wtActive)
{
dcsMultiTrack.apply(this, arguments);
}
};
cbdcommon.wu.sendDCSTagsThenClear=function()
{
var argLen=arguments.length;
if(argLen % 2!=0)
{
return;
}
cbdcommon.wu.calldcsMultiTrack.apply(this, arguments);
for(var x=0;x < argLen;x+=2)
{
cbdcommon.wu._cbdClearDCSVal(arguments[x]);
}
};
cbdcommon.wu.addErrorMetaTag=function(state, value)
{
if(state)
{
var errorMetaTag=cbdcommon.screen.getMetaTag("DCSext.error");
if(errorMetaTag!=null)
{
cbdcommon.wu.appendValueToTag(errorMetaTag, value);
}
else
{
cbdcommon.wu.addMetaTag("error", value);
}
}
};
cbdcommon.wu.appendValueToTag=function(metaTag, value, delimiter)
{
var contentAttrTxt=metaTag.getAttribute("content");
var separator=(typeof(delimiter)!="undefined")?delimiter:"::";
if(contentAttrTxt!=null)
{
contentAttrTxt+=separator+value;
metaTag.removeAttribute("content");
metaTag.setAttribute("content", contentAttrTxt);
cbdcommon.wu._cbdProcessDCSVal(metaTag.getAttribute("name"), contentAttrTxt);
}
};
cbdcommon.wu.getMetaTags=function()
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
};
cbdcommon.wu.dcsTag=function()
{
if(wtActive)
{
_tag.dcsCollect();
}
};
cbdcommon.wu.trackLink=function(link)
{
var linkLocation=cbdcommon.screen.getMetaTag("DCSext.pageid"),
cont="";
if(cbdcommon.string.isEmpty(link) )
{
link="";
}
if(linkLocation)
{
cont=linkLocation.content;
}
cbdcommon.util._addWindowData(cbdcommon.wu.WU, link+':'+cont);
};
cbdcommon.wu.logWebUsageEvent=function(name, value, cleanup)
{
cbdcommon.wu.addMetaTag(name, value);
cbdcommon.wu.dcsTag();
if(cleanup)
{
cbdcommon.wu.clearMetaTag(name);
}
};
cbdcommon.wu.logActionEvent=function(compName, compValue)
{
cbdcommon.wu._cbdLogActionEvent(compName+compValue);
};
cbdcommon.wu.logCompActionEvent=function(comp)
{
var wuData=comp.getAttribute("wuData");
cbdcommon.wu._cbdLogActionEvent(wuData!=null?wuData:"" );
};
cbdcommon.wu._cbdLogActionEvent=function(value)
{
cbdcommon.wu.calldcsMultiTrack('DCS.dcsuri', window.location.pathname+".ev", "DCSext.cbd_action", value);
cbdcommon.wu._cbdClearDCSVal("cbd_action");
};
cbdcommon.wu._cbdClearDCSVal=function(aKey)
{
cbdcommon.wu._cbdProcessDCSVal(aKey, "");
};
cbdcommon.wu._cbdProcessDCSVal=function(aKey, newValue)
{
var index="";
if(!wtActive) return;
if(cbdcommon.string.startsWith(aKey, "WT."))
{
index=aKey.substr(3);
if(index in _tag.WT||newValue!=="")
{
_tag.WT[index]=newValue;
}
}
else if(cbdcommon.string.startsWith(aKey, "DCS."))
{
index=aKey.substr(4);
if(index in _tag.DCS||newValue!=="")
{
_tag.DCS[index]=newValue;
}
}
else if(cbdcommon.string.startsWith(aKey, "DCSext."))
{
index=aKey.substr(7);
if(index in _tag.DCSext||newValue!=="")
{
_tag.DCSext[index]=newValue;
}
}
};
cbdcommon.wu.logLinkEvent=function(evt)
{
if(wtActive)
{
_tag.dcsDownload(evt);
}
};
cbdcommon.wu.logDownloadEvent=function(evt)
{
if(wtActive)
{
_tag.dcsDownload(evt);
}
};
cbdcommon.wu.wurPulldown=function(pDown)
{
cbdcommon.wu.logActionEvent('PullDown:'+pDown.id+":", pDown.value);
};
cbdcommon.wu.captureReferrerLink=function()
{
var linkLocationTrackInfo=cbdcommon.util._getAndRemoveWindowData(cbdcommon.wu.WU);
if(!cbdcommon.string.isEmpty(linkLocationTrackInfo))
{
var linkLocationInfoArray=linkLocationTrackInfo.split(":");
cbdcommon.wu.addMetaTag('Link', linkLocationInfoArray[0]);
cbdcommon.wu.addMetaTag('LinkLocation',(linkLocationInfoArray.length==2)?linkLocationInfoArray[1]:"");
}
};
cbdcommon.wu._addMetaTagsForStrt=function()
{
var performance=cbd.pagePerformance;
if(performance )
{
var pageRendered=(performance.pageRendered - performance.headStart),
pageResponsive=(performance.pageResponsive - performance.headStart),
serverTime=performance.serverTime;
cbdcommon.wu.addMetaTag('strt.clntRendered', cbdcommon.wu._formatStrtTime(pageRendered));
cbdcommon.wu.addMetaTag('strt.clntResponsive', cbdcommon.wu._formatStrtTime(pageResponsive));
cbdcommon.wu.addMetaTag('strt.server', cbdcommon.wu._formatStrtTime(serverTime));
cbdcommon.wu.addMetaTag('strt.total', cbdcommon.wu._formatStrtTime(serverTime+pageResponsive));
}
};
cbdcommon.wu._formatStrtTime=function(timeInMs)
{
if(timeInMs&&!isNaN(timeInMs))
{
var timeInSec=(timeInMs/1000).toString();
var decimalIdx=timeInSec.indexOf('.');
if(decimalIdx >=0&&(timeInSec.length - decimalIdx) > 3)
{
timeInSec=timeInSec.substring(0, decimalIdx+3);
}
return timeInSec
}
return "";
};
cbdcommon.wu.clearLogonMetaTag=function()
{
var head=document.getElementsByTagName('head')[0];
var metaArray=head.getElementsByTagName('meta');
for(var i=0;i < metaArray.length;i++)
{
if(metaArray[i].name=="WT.z_lv1"&&metaArray[i].content=="1")
{
metaArray[i].content="";
}
}
if(_tag.WT["z_lv1"])
{
_tag.WT["z_lv1"]="";
}
};
}());
(function()
{
"use strict";
var cbdcommon=window.cbdcommon||{};
window.cbdcommon=cbdcommon;
cbdcommon.floodlight=cbdcommon.floodlight||{};
cbdcommon.floodlight.initFloodlightFrame=function()
{
var floodFrame=document.getElementById("floodIframe");
if(floodFrame)
{
if(cbdcommon.comp&&cbdcommon.comp._floodFrameSrc)
{
floodFrame.src=cbdcommon.comp._floodFrameSrc;
}
else if(cbdcommon.floodlight._floodFrameSrc)
{
floodFrame.src=cbdcommon.floodlight._floodFrameSrc;
}
}
};
}());
(function()
{
"use strict";
var cbdcommon=window.cbdcommon||{},
appBuildId;
window.cbdcommon=cbdcommon;
cbdcommon.util=cbdcommon.util||{};
cbdcommon.util.WINDOW_DATA_PFX=window.WINDOW_DATA_PFX="__s";
cbdcommon.util.WINDOW_DATA_SFX=window.WINDOW_DATA_SFX="__e";
cbdcommon.util._addWindowData=function(name, value)
{
if(window.name.indexOf(cbdcommon.util.WINDOW_DATA_PFX) >=0)
{
cbdcommon.util._getAndRemoveWindowData(name);
}
window.name=window.name+cbdcommon.util.WINDOW_DATA_PFX+name+value+cbdcommon.util.WINDOW_DATA_SFX+name;
};
cbdcommon.util._getAndRemoveWindowData=function(name)
{
var p="(.*)",
regex=new RegExp(cbdcommon.util.WINDOW_DATA_PFX+name+p+cbdcommon.util.WINDOW_DATA_SFX+name),
windowData=regex.exec(window.name);
if(windowData!=null)
{
window.name=window.name.replace(regex, "");
return windowData[1];
}
return null;
};
cbdcommon.util.isNodeInput=function(context)
{
var name=context.nodeName;
if(context.type!='hidden'&&
!context.disabled&&
(name=='INPUT'||name=='SELECT'||name=='TEXTAREA'||name=='A' ))
{
return true;
}
return false;
};
cbdcommon.util.preventDoubleClick=function(node)
{
var currOnClick=node.getAttribute('onclick'),
thisNode=node;
node.setAttribute('clickJs', currOnClick);
node.onclick=function(){return false;};
setTimeout(function(){thisNode.setAttribute('onclick', thisNode.getAttribute('clickJs'));}, 1000 );
};
cbdcommon.util.getIEPropertyName=function(propertyName)
{
var props=propertyName.split('-'),
iePropName=props[0],
i=1,
prop,
firstChar;
for(i=1;i<props.length;i++)
{
prop=props[i];
firstChar=prop.charAt(0);
iePropName+=prop.replace(firstChar, firstChar.toUpperCase() );
}
return iePropName;
};
cbdcommon.util.getComputedStylePropertyValue=function(domElement, propertyName)
{
if(domElement.currentStyle&&ieQuirksMode)
{
return domElement.currentStyle[cbdcommon.util.getIEPropertyName(propertyName)];
}
else if(window.getComputedStyle)
{
return document.defaultView.getComputedStyle(domElement, null).getPropertyValue(propertyName);
}
};
cbdcommon.util.getCssBoxModelWidthOnly=function(node, side)
{
var BORDER_LEFT_WIDTH="border-left-width",
BORDER_RIGHT_WIDTH="border-right-width",
MARGIN_LEFT="margin-left",
MARGIN_RIGHT="margin-right",
PADDING_LEFT="padding-left",
PADDING_RIGHT="padding-right",
properties=[BORDER_LEFT_WIDTH, BORDER_RIGHT_WIDTH, MARGIN_LEFT, MARGIN_RIGHT, PADDING_LEFT, PADDING_RIGHT],
i=0,
propertiesLength=properties.length,
propertyValue="",
width=0;
if(side==="left")
{
properties=[BORDER_LEFT_WIDTH, MARGIN_LEFT, PADDING_LEFT];
}
if(side==="right")
{
properties=[BORDER_RIGHT_WIDTH, MARGIN_RIGHT, PADDING_RIGHT];
}
for(i=0;i < propertiesLength;i++)
{
propertyValue=cbdcommon.util.getComputedStylePropertyValue(node, properties[i]);
if(!cbdcommon.string.isEmpty(propertyValue))
{
width=width+parseInt(propertyValue.toString().replace("px",""), 10);
}
}
return width;
};
cbdcommon.util.hasFocus=function(node )
{
"use strict";
return document.activeElement===node;
};
cbdcommon.util.hasActiveElement=function(nodes )
{
"use strict";
var length=nodes.length,
hasActiveElment=false,
i;
for(i=0;i<length;i++)
{
if(cbdcommon.util.hasFocus(nodes[i]) )
{
hasActiveElment=true;
break;
}
}
return hasActiveElment;
};
cbdcommon.util.supportSVG=function()
{
return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
};
cbdcommon.util.updateImgTags=function()
{
var allImg=document.getElementsByTagName('img'),
allImgLen=allImg.length,
currentImg=null,
scrValue='',
i=0;
if(cbdcommon.util.supportSVG())
{
for(i=0;i < allImgLen;i++)
{
currentImg=allImg[i];
if(currentImg.attributes['data-svg-src'])
{
scrValue=currentImg.attributes['data-svg-src'].value;
currentImg.src=scrValue;
}
else if(currentImg.attributes['data-src'])
{
scrValue=currentImg.attributes['data-src'].value;
currentImg.src=scrValue;
}
}
}
else
{
for(i=0;i < allImgLen;i++)
{
currentImg=allImg[i];
if(currentImg.attributes['data-src'])
{
scrValue=currentImg.attributes['data-src'].value;
currentImg.src=scrValue;
}
}
}
};
cbdcommon.util.getObjectReference=function(objectName)
{
var namespaceArr=objectName.split("."),
namespaceArrLen=namespaceArr.length,
objectReference=window,
i;
for(i=0;i < namespaceArrLen;i++)
{
objectReference=objectReference[namespaceArr[i]];
if(!objectReference)
{
break;
}
}
return objectReference;
};
cbdcommon.util._getAppBuildId=function()
{
var metaTag;
if(typeof appBuildId==='undefined')
{
metaTag=cbdcommon.screen.getMetaTag("cbd.applicationBuildId");
appBuildId=(metaTag)?metaTag.content:"";
}
return appBuildId;
};
cbdcommon.util.getFileReference=function(file)
{
var fileReference="";
if(!cbdcommon.string.isEmpty(file))
{
fileReference=file+"?"+cbdcommon.util._getAppBuildId();
}
return fileReference;
};
}());
(function()
{
"use strict";
var cbdcommon=window.cbdcommon||{};
window.cbdcommon=cbdcommon;
cbdcommon.comp=cbdcommon.comp||{};
cbdcommon.comp._initGlobalFooter=function()
{
var threadIdDiv=document.getElementById("_cbdThread"),
clickHandler=function(e){
cbd.adapter.toggle('threadId');
},
globalFooter=cbd.adapter.getElements({node:document, tag:'div',cssClass:'gblFoot'})[0],
gfLinks=cbd.adapter.getElements({node:globalFooter, tag:'a'}),
addGFOnClickListeners=function(link)
{
cbd.adapter.addEventListener({
node:link,
event:'click',
controller:null,
func:function(){cbd.adapter.fireEvent({event:'CBD_GlOBAL_FOOTER_CLICK'});}
});
},
i,
numberOfGFLinks=gfLinks.length;
if(threadIdDiv!==null)
{
cbd.adapter.addEventListener({
node:threadIdDiv,
event:'click',
controller:null,
func:clickHandler
});
}
for(i=0;i< numberOfGFLinks;i++)
{
addGFOnClickListeners(gfLinks[i]);
}
cbdcommon.opinionLabs.initialize();
};
cbdcommon.comp._initSuperFooter=function()
{
var superFooter=document.getElementById('sFooter'),
sfLinks=cbd.adapter.getElements({node:superFooter, tag:'a'}),
numberOfLinks,
i,
addListenerToSFLink=function(link)
{
cbd.adapter.addEventListener({
node:link,
event:'click',
controller:null,
func:function(){cbdcommon.util.preventDoubleClick(link);cbd.adapter.fireEvent({event:'CBD_SUPER_FOOTER_CLICK'});}
});
};
numberOfLinks=sfLinks.length;
if(numberOfLinks&&numberOfLinks > 0)
{
for(i=0;i < numberOfLinks;i++)
{
addListenerToSFLink(sfLinks[i]);
}
}
};
}());
(function()
{
var cbdcommon=window.cbdcommon||{},
cbdConfig=window.cbdConfig||{};
window.cbdcommon=cbdcommon;
window.cbdConfig=cbdConfig;
}());
var custom_var,_sp='%3A\\/\\/',_rp="%3A//",_poE=0.0, _poX=0.0,_sH=screen.height,_d=document,_w=window,_ht=escape(_w.location.href),_hr=_d.referrer,_tm=(new Date()).getTime(),_kp=0,_sW=screen.width;
function TLGetCookie(c_name){
if(document.cookie.length > 0)
{
var c_start=document.cookie.indexOf(c_name+"=");
if(c_start!=-1){
c_start=c_start+c_name.length+1;
var c_end=document.cookie.indexOf(";", c_start);
if(c_end==-1) c_end=document.cookie.length;
return unescape(document.cookie.substring(c_start, c_end));
}
}
return ""
};
function _fC(_u){
var _aT=_sp+',\\/,\\.,-,_,'+_rp+',%2F,%2E,%2D,%5F';
var _aA=_aT.split(',');
for(var _iI=0;_iI<5;_iI++)
{
eval('_u=_u.replace(/'+_aA[_iI]+'/g,_aA[_iI+5])')
}
return _u
};
function O_LC(useServlet){
tleaf_cv=TLGetCookie('TLTSID')+'|';
var url,
opLabContextRoot;
if(useServlet)
{
url="/opinionLab";
opLabContextRoot=cbdConfig.opLabContextRoot;
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
};
(function(){
"use strict";
cbdcommon.opinionLabs={};
cbdcommon.opinionLabs.initialize=function()
{
"use strict";
var feedbackLink=document.getElementById("globalFooterFeedback"),
eventSetup,
opLabsMetaTag,
opLabsMetaTagValue,
useServlet;
if(feedbackLink)
{
opLabsMetaTag=cbdcommon.screen.getMetaTag("opLabs.useServlet");
opLabsMetaTagValue=(opLabsMetaTag!==null&&(typeof opLabsMetaTag!=="undefined"))?opLabsMetaTag.content:"";
useServlet=(opLabsMetaTagValue==="true");
eventSetup={
node:feedbackLink,
event:"click",
func:function()
{
O_LC(useServlet);
}
};
cbd.adapter.addEventListener(eventSetup);
_fPe();
}
};
}());
(function()
{
"use strict";
var cbdcommon=window.cbdcommon||{};
window.cbdcommon=cbdcommon;
cbdcommon.cookie=cbdcommon.cookie||{};
cbdcommon.cookie.CONFIG="_vgi_config";
cbdcommon.cookie.getCookie=function(name)
{
var result=null,
myCook=" "+document.cookie+";",
search=" "+name+"=",
start=myCook.indexOf(search),
end;
if(start!=-1)
{
start+=search.length;
end=myCook.indexOf(";", start);
result=unescape(myCook.substring(start, end));
}
return result;
};
cbdcommon.cookie.setCookie=function(name, value, expires, path, domain)
{
var expStr=((expires==null)?"":(";expires="+expires.toGMTString())),
pathStr=((path==null)?"":(";path="+path)),
domainStr=((domain==null)?"":(";domain="+domain));
document.cookie=name+"="+escape(value)+expStr+pathStr+domainStr;
};
cbdcommon.cookie.setConfigInfo=function(app, val)
{
var configCookie=cbdcommon.cookie.CONFIG,
currVal=cbdcommon.cookie.getCookie(configCookie ),
newVal,
pos;
val=(val+"").charAt(0);
if(currVal===null||currVal.length==0)
{
currVal="";
}
pos=currVal.indexOf(app);
if(pos >=0)
{
pos+=app.length;
newVal=currVal.substring(0, pos)+val+currVal.substring(pos+1, currVal.length);
}
else
{
newVal=currVal+app+val+";";
}
cbdcommon.cookie.setCookie(configCookie, newVal, new Date((new Date()).getTime()+2*365*24*60*60*1000), "/", ".vanguard.com");
};
cbdcommon.cookie.getConfigInfoValue=function(app)
{
var val=cbdcommon.cookie.getCookie(cbdcommon.cookie.CONFIG),
pos;
if(val===null||val.length==0)
{
return null;
}
pos=val.indexOf(app);
return(pos < 0)?null:val.charAt(pos+app.length);
};
}());
(function()
{
"use strict";
var cbdcommon=window.cbdcommon||{},
_constants={
RESPONSIVE_GH_OPEN_ANIMATION_SPEED:500,
RESP_GH_SIDEBAR_WIDTH:300,
RESP_GH_MENU_BTN_WIDTH:55,
RESP_GH_UTIL_BAR_HEIGHT:44,
BLOCK:"block",
CLICK:"click",
DISPLAY:"display",
DATA_CBD_COMPATTR:"data-cbd-compattrs",
LEFT:"left",
EMPTY_STR:"",
HEIGHT:"height",
HIDDEN:"hidden",
ID:"id",
INPUT_ID:"inputId",
MEDIUM:"m",
MEDIUM_OR_LARGE:"m,l",
OVERFLOW:"overflow",
PIXELS:"px",
RESP_ICON_SEARCH_OPEN:"respIconSearchOpen",
RESP_SIDEBAR_SEARCH_OPEN:"respSideBarSearchOpen",
RESP_RESIZE_END_EVENT_ID:"respGhBrowserResizeEndEvent",
SMALL:"s",
SMALL_OR_MEDIUM:"s,m",
WIDTH:"width",
FOCUS:"focus",
BLUR:"blur",
ONKEYDOWN:"keydown",
RESP_GH_USERID:"_cbdghInputUserId",
RESP_GH_PASSWORDID:"_cbdghInputPasswordId-blocked",
RESP_GH_USERNAME:"User name",
RESP_GH_PASSWORD:"Password",
RESP_GH_USERNAME_TYPE:"text",
RESP_GH_PASSWORD_TYPE:"password"
},
_classes={
GH_AS_OUTER_DIV:"globalHeaderAutoSuggest",
GH_OPEN:"ghOpen",
GH_CANCEL_BTN:"x-ghCancelButton",
GH_CLEAR_ICON:"x-ghClearIcon",
RESP_GH_CANCEL_BTN_SHOWN:"x-ghCancelButtonShown",
RESP_SIDEBAR_SEARCH_BOX:"x-ghAsSidebarSearch",
RESP_SILO_ITEM_OPEN:"x-ghSiloItemOpen",
RESP_GH_AS_CONTAINER:"x-ghAsContainerResp",
RESP_GH_AS_CONTAINER_RIGHT:"x-ghAsContainerAlignRgt",
RESP_GH_SEARCH_BOX:"x-ghSearchBoxResp",
RESP_GH_ICON_SEARCH_OPEN:"x-ghIconSearchRespOpen",
RESP_GH_AS_SUPPRESS_HUNDRED_PCT_DD_HEIGHT:"x-ghAsSuppressHundredPctRespDDHeight"
},
_selectors={
BODY:"body",
VG0_DIV:".vg0",
CBD_MAIN:"#cbdMain",
MAIN_DIV:"#main",
SUPER_FOOTER:"#sFooter",
GLOBAL_FOOTER:".gblFoot",
GH:"#gh",
GH_CURRENT:"#gh-current",
GH_CURRENT_SUB_MENU:"#gh-current .x-ghSiloItemSubMenu",
GH_FIRST_NAV:"#ghFirstNav",
GH_MAIN_NAV:"#ghMainNav",
GH_SEARCH_BOX:".x-ghSearchBox",
GH_UTIL_BAR:".x-ghUtilBar",
RESP_GH_AS_CONTAINER:".x-ghAsContainerResp",
RESP_GH_SCROLL_DIV:".x-ghScrollDivResp",
RESP_GH_NO_SCROLL_DIV:".x-ghNoScrollDiv",
RESP_SIDEBAR_SEARCH_BOX:".x-ghAsSidebarSearch",
RESP_SEARCH_ICON:".x-ghUtilBar .x-ghSearchButtonResp",
RESP_GH_USER_NAME:".x-ghUserNameResp",
RESP_GH_PASSWORD:".x-ghPasswordResp",
RESP_GH_LOGON_CHECKBOX:".x-ghCheckBoxResp",
RESP_GH_LOGON_BUTTON:"#_cbdlogonButtonInput",
LOG_OFF_UTIL_LINKS:'#_cbdLogOff, #_cbdLogOnOff, #gh #ghUtilLinks a.x-ghUtilLinkResp[title="Log off"], #gh #ghUtilLinks a[title="Log off"]'
},
_noScrollDivHeight=null,
_getNoScrollDivHeight=function()
{
if(_noScrollDivHeight===null )
{
var noScrollDivHasChildren=cbd.adapter.hasChildren(_selectors.RESP_GH_NO_SCROLL_DIV);
if(noScrollDivHasChildren )
{
_noScrollDivHeight=_constants.RESP_GH_UTIL_BAR_HEIGHT;
}
else
{
_noScrollDivHeight=0;
}
}
return _noScrollDivHeight;
},
_addPixelSuffix=function(valueToFix)
{
var PIXELS=_constants.PIXELS,
EMPTY_STR=_constants.EMPTY_STR,
newValue=(valueToFix).toString().replace(PIXELS, EMPTY_STR)+PIXELS;
return newValue;
},
_setOverflow=function()
{
var cbdAdapter=cbd.adapter,
BODY=_selectors.BODY,
HEIGHT=_constants.HEIGHT,
HIDDEN=_constants.HIDDEN,
OVERFLOW=_constants.OVERFLOW,
VG0_DIV=_selectors.VG0_DIV;
cbdAdapter.setStyle(BODY,		OVERFLOW,	HIDDEN);
cbdAdapter.setStyle(VG0_DIV,	OVERFLOW,	HIDDEN);
cbdAdapter.setStyle(VG0_DIV,	HEIGHT,		cbdAdapter.getViewportHeight());
},
_clearOverflow=function()
{
var cbdAdapter=cbd.adapter,
BODY=_selectors.BODY,
HEIGHT=_constants.HEIGHT,
EMPTY_STR=_constants.EMPTY_STR,
OVERFLOW=_constants.OVERFLOW,
VG0_DIV=_selectors.VG0_DIV;
cbdAdapter.setStyle(BODY,		OVERFLOW,	EMPTY_STR);
cbdAdapter.setStyle(VG0_DIV,	OVERFLOW,	EMPTY_STR);
cbdAdapter.setStyle(VG0_DIV, 	HEIGHT,		EMPTY_STR);
},
_isRespGhAutoSuggest=function(autoSuggestElem)
{
var cbdAdapter=cbd.adapter;
return	cbdAdapter.hasClass(autoSuggestElem, _classes.RESP_GH_AS_CONTAINER)||
cbdAdapter.hasClass(autoSuggestElem, _classes.RESP_GH_SEARCH_BOX);
},
_isRespGhAutoSuggestClearIcon=function(element)
{
return cbd.adapter.hasClass(element, _classes.GH_CLEAR_ICON);
},
_isRespGhAutoSuggestCancelBtn=function(element)
{
return cbd.adapter.hasClass(element, _classes.GH_CANCEL_BTN);
},
_isRespGhAutoSuggestResultsContainer=function(element)
{
return cbd.adapter.getAncestor({
node:element,
cssClass:_classes.RESP_GH_AS_CONTAINER
});
},
_isRespGhSidebarSearch=function(autoSuggestInput)
{
return cbd.adapter.hasClass(autoSuggestInput, _classes.RESP_SIDEBAR_SEARCH_BOX);
},
_isSidebarSearchOpen=function()
{
return cbd.adapter.getAttributeAsBoolean(_selectors.GH, _constants.RESP_SIDEBAR_SEARCH_OPEN);
},
_isIconSearchOpen=function()
{
return cbd.adapter.getAttributeAsBoolean(_selectors.GH, _constants.RESP_ICON_SEARCH_OPEN);
},
_setSideBarWidth=function(sideBarWidth)
{
var cbdAdapter=cbd.adapter,
WIDTH=_constants.WIDTH;
cbdAdapter.setStyle(_selectors.RESP_GH_NO_SCROLL_DIV,	WIDTH,	sideBarWidth);
cbdAdapter.setStyle(_selectors.GH_MAIN_NAV,				WIDTH,	sideBarWidth);
},
_setMainAreaLeftPosition=function(leftPosition)
{
var cbdAdapter=cbd.adapter,
LEFT=_constants.LEFT;
cbdAdapter.setStyle(_selectors.CBD_MAIN,		LEFT, leftPosition);
cbdAdapter.setStyle(_selectors.MAIN_DIV,		LEFT, leftPosition);
cbdAdapter.setStyle(_selectors.SUPER_FOOTER,	LEFT, leftPosition);
cbdAdapter.setStyle(_selectors.GLOBAL_FOOTER,	LEFT, leftPosition);
cbdAdapter.setStyle(_selectors.GH_UTIL_BAR,		LEFT, leftPosition);
},
_setRespIconSearchOpenAttribute=function(attributeValue)
{
cbd.adapter.setAttribute(_selectors.GH, _constants.RESP_ICON_SEARCH_OPEN, attributeValue);
},
_setRespSideBarOpenAttribute=function(attributeValue)
{
cbd.adapter.setAttribute(_selectors.GH, _constants.RESP_SIDEBAR_SEARCH_OPEN, attributeValue);
},
_calculateRespGhSideBarWidth=function()
{
var cbdAdapter=cbd.adapter,
viewportWidth=cbdAdapter.getViewportWidth(),
sideBarDefaultWidth=_constants.RESP_GH_SIDEBAR_WIDTH,
menuBtnWidth=_constants.RESP_GH_MENU_BTN_WIDTH,
minViewportWidth=sideBarDefaultWidth+menuBtnWidth,
useCalculatedWidth=viewportWidth < minViewportWidth,
calculatedWidth=viewportWidth - menuBtnWidth,
sideBarWidth=_addPixelSuffix(useCalculatedWidth?calculatedWidth:sideBarDefaultWidth);
return sideBarWidth;
},
_resetRespSidebarForAutoSuggest=function()
{
var newWidth=_calculateRespGhSideBarWidth();
_setSideBarWidth(newWidth);
_setMainAreaLeftPosition(newWidth);
_setRespSideBarOpenAttribute(false);
},
_adjustRespSidebarForAutoSuggest=function()
{
var viewportWidth=_addPixelSuffix(cbd.adapter.getViewportWidth());
_setSideBarWidth(viewportWidth);
_setMainAreaLeftPosition(viewportWidth);
_setRespSideBarOpenAttribute(true);
},
_setRespGhScrollDivHeight=function()
{
var cbdAdapter=cbd.adapter,
isRespSize=cbdcommon.screen.isMediaQuerySize(_constants.SMALL_OR_MEDIUM),
EMPTY_STR=_constants.EMPTY_STR,
newHeight=EMPTY_STR,
viewportHeight,
noScrollHeight;
if(isRespSize&&cbdcommon.support.isOverflowSupported )
{
viewportHeight=cbdAdapter.getViewportHeight();
noScrollHeight=_getNoScrollDivHeight();
newHeight=_addPixelSuffix(viewportHeight - noScrollHeight);
}
cbdAdapter.setStyle(_selectors.RESP_GH_SCROLL_DIV, _constants.HEIGHT, newHeight);
},
_setRespGhScrollDivWidth=function()
{
var EMPTY_STR=_constants.EMPTY_STR,
screenNS=cbdcommon.screen,
newWidth,
sidebarSearchOpen,
shouldResetSidebarSearch,
shouldAdjustSidebarSearch;
if(cbdcommon.gh.isRespMenuOpen())
{
newWidth=_calculateRespGhSideBarWidth();
sidebarSearchOpen=_isSidebarSearchOpen();
shouldResetSidebarSearch=sidebarSearchOpen&&screenNS.isMediaQuerySize(_constants.MEDIUM_OR_LARGE);
shouldAdjustSidebarSearch=sidebarSearchOpen&&screenNS.isMediaQuerySize(_constants.SMALL);
if(!sidebarSearchOpen )
{
_setSideBarWidth(newWidth);
_setMainAreaLeftPosition(newWidth);
}
else if(shouldAdjustSidebarSearch )
{
_adjustRespSidebarForAutoSuggest();
}
else if(shouldResetSidebarSearch )
{
_resetRespSidebarForAutoSuggest();
}
}
else
{
_setSideBarWidth(EMPTY_STR);
_setMainAreaLeftPosition(EMPTY_STR);
}
},
_setRespGhScrollDivDimensions=function()
{
_setRespGhScrollDivWidth();
_setRespGhScrollDivHeight();
},
_openResponsiveMenuTimeoutFunction=function()
{
var cbdAdapter=cbd.adapter,
supportNS=cbdcommon.support;
if(supportNS.isOverflowSupported )
{
cbdAdapter.addClass(_selectors.RESP_GH_SCROLL_DIV, supportNS.OVERFLOW_SCROLLING_CLASS);
}
cbdAdapter.fireEvent({event:cbdcommon.gh.events.OPEN_END});
},
_openResponsiveCurrentSilo=function()
{
var cbdAdapter=cbd.adapter;
cbdAdapter.addClass(_selectors.GH_CURRENT, _classes.RESP_SILO_ITEM_OPEN);
cbdAdapter.setStyle(_selectors.GH_CURRENT_SUB_MENU, _constants.DISPLAY, _constants.BLOCK);
},
_closeResponsiveMenuTimeoutFunction=function()
{
var cbdAdapter=cbd.adapter,
supportNS=cbdcommon.support;
cbdAdapter.setStyle(_selectors.GH_FIRST_NAV, _constants.DISPLAY, _constants.EMPTY_STR);
cbdAdapter.removeClass(_selectors.RESP_GH_SCROLL_DIV, supportNS.OVERFLOW_SCROLLING_CLASS);
if(supportNS.isOverflowSupported )
{
_clearOverflow();
}
cbdAdapter.fireEvent({event:cbdcommon.gh.events.CLOSE_END});
},
_setRespAutoSuggestHeight=function(autoSuggestDropdown)
{
var cbdAdapter=cbd.adapter,
dropdownHeight=cbdcommon.support.isOverflowSupported?
_addPixelSuffix(cbdAdapter.getViewportHeight() - _constants.RESP_GH_UTIL_BAR_HEIGHT ):
_constants.EMPTY_STR,
suppressHundredPctRespDDHeight=autoSuggestDropdown.getAttribute("class").indexOf(_classes.RESP_GH_AS_SUPPRESS_HUNDRED_PCT_DD_HEIGHT) > 0;
if(suppressHundredPctRespDDHeight!==true)
{
cbdAdapter.setStyle(autoSuggestDropdown, _constants.HEIGHT, dropdownHeight);
}
},
_clearIconSearchOnResize=function()
{
if(_isIconSearchOpen()&&cbdcommon.screen.isMediaQuerySize(_constants.MEDIUM_OR_LARGE) )
{
_setRespIconSearchOpenAttribute(false);
cbd.adapter.removeClass(_selectors.GH_UTIL_BAR, _classes.RESP_GH_ICON_SEARCH_OPEN);
}
},
_getOpenRespResultsDropdownId=function()
{
var cbdAdapter=cbd.adapter,
dropdowns=cbdAdapter.getElementsBySelector(_selectors.RESP_GH_AS_CONTAINER),
numDropdowns=cbdAdapter.getNodeListLength(dropdowns),
currentItem,
currentItemDisplay,
i;
for(i=0;i < numDropdowns;i++)
{
currentItem=cbdAdapter.getNodeListItem(dropdowns, i);
currentItemDisplay=cbdAdapter.getStyle(currentItem, _constants.DISPLAY);
if(currentItemDisplay===_constants.BLOCK )
{
return "#"+cbdAdapter.getAttribute(currentItem, _constants.ID);
}
}
return false;
},
_adjustRespResultsDropdownOnResize=function(shouldAdjustSearch)
{
var cbdAdapter=cbd.adapter,
isRespSize=cbdcommon.screen.isMediaQuerySize(_constants.SMALL_OR_MEDIUM),
openDropdown=_getOpenRespResultsDropdownId(),
isUtilBarSearch,
isSmallSize;
if(openDropdown )
{
if(isRespSize )
{
_setRespAutoSuggestHeight(openDropdown);
isUtilBarSearch=cbdAdapter.hasClass(openDropdown, _classes.RESP_GH_AS_CONTAINER_RIGHT);
isSmallSize=cbdcommon.screen.isMediaQuerySize(_constants.SMALL);
if(isSmallSize )
{
if(isUtilBarSearch )
{
_setRespIconSearchOpenAttribute(true);
cbdAdapter.addClass(_selectors.GH_UTIL_BAR, _classes.RESP_GH_ICON_SEARCH_OPEN);
}
else
{
_adjustRespSidebarForAutoSuggest();
}
}
}
else
{
cbdAdapter.setStyle(openDropdown, _constants.DISPLAY, _constants.EMPTY_STR);
}
}
},
_shouldAdjustSidebarSearch=function(autoSuggestInput)
{
return	_isRespGhSidebarSearch(autoSuggestInput)&&
cbdcommon.screen.isMediaQuerySize(_constants.SMALL)&&
cbdcommon.gh.isRespMenuOpen();
},
_getGhAsOuterDiv=function(autoSuggestInput)
{
return	cbd.adapter.getAncestor({
node:autoSuggestInput,
cssClass:_classes.GH_AS_OUTER_DIV
});
},
_showCancelBtn=function(autoSuggestInput)
{
cbd.adapter.addClass(_getGhAsOuterDiv(autoSuggestInput), _classes.RESP_GH_CANCEL_BTN_SHOWN);
},
_hideCancelBtn=function(autoSuggestInput)
{
cbd.adapter.removeClass(_getGhAsOuterDiv(autoSuggestInput), _classes.RESP_GH_CANCEL_BTN_SHOWN);
},
_closeGhAutoSuggestOnBodyClick=function(eventArgs)
{
var targetElem=eventArgs.target,
cbdAdapter=cbd.adapter,
isMediumSize=cbdcommon.screen.isMediaQuerySize(_constants.MEDIUM),
isRespGhSearchElem;
if(isMediumSize )
{
isRespGhSearchElem=_isRespGhAutoSuggest(targetElem)||
_isRespGhAutoSuggestClearIcon(targetElem)||
_isRespGhAutoSuggestCancelBtn(targetElem)||
_isRespGhAutoSuggestResultsContainer(targetElem);
if(!isRespGhSearchElem )
{
cbdAdapter.setStyleOnNodeList(
cbdAdapter.getElementsBySelector(_selectors.RESP_GH_AS_CONTAINER),
_constants.DISPLAY,
_constants.EMPTY_STR
);
if(cbdcommon.support.isOverflowSupported&&!cbdcommon.gh.isRespMenuOpen() )
{
_clearOverflow();
}
}
}
},
_searchBtnRespClick=function(eventArgs)
{
var cbdAdapter=cbd.adapter,
searchButton=eventArgs.target,
autoSuggestId=cbdAdapter.getAttribute(searchButton, _constants.INPUT_ID),
autoSuggestInput=cbdAdapter.getElementBySelector("#"+autoSuggestId),
shouldSetOverflow=cbdcommon.support.isOverflowSupported&&
cbdcommon.screen.isMediaQuerySize(_constants.SMALL_OR_MEDIUM);
_setRespIconSearchOpenAttribute(true);
if(shouldSetOverflow )
{
_setOverflow();
}
_showCancelBtn(autoSuggestInput);
cbdAdapter.addClass(_selectors.GH_UTIL_BAR, _classes.RESP_GH_ICON_SEARCH_OPEN);
autoSuggestInput.focus();
autoSuggestInput.value=_constants.EMPTY_STR;
},
_hideAutoSuggestResults=function(eventArgs)
{
var autoSuggestInput=eventArgs.target,
shouldClearOverflow;
if(_isRespGhAutoSuggest(autoSuggestInput) )
{
shouldClearOverflow=cbdcommon.support.isOverflowSupported&&
cbdcommon.screen.isMediaQuerySize(_constants.SMALL_OR_MEDIUM)&&
!cbdcommon.gh.isRespMenuOpen()&&
!_isIconSearchOpen();
if(shouldClearOverflow )
{
_clearOverflow();
}
}
},
_showAutoSuggestResults=function(eventArgs)
{
var autoSuggestInput=eventArgs.target,
shouldSetOverflow;
if(_isRespGhAutoSuggest(autoSuggestInput) )
{
shouldSetOverflow=cbdcommon.support.isOverflowSupported&&
cbdcommon.screen.isMediaQuerySize(_constants.SMALL_OR_MEDIUM);
if(shouldSetOverflow )
{
_setOverflow();
}
}
},
_onAutoSuggestInputClick=function(eventArgs)
{
var autoSuggestInput=eventArgs.target;
if(_isRespGhAutoSuggest(autoSuggestInput) )
{
_showCancelBtn(autoSuggestInput);
if(_shouldAdjustSidebarSearch(autoSuggestInput) )
{
_adjustRespSidebarForAutoSuggest();
}
}
},
_setAutoSuggestResultsDropdownDimensions=function(eventArgs)
{
var autoSuggestDropdown=eventArgs.target;
if(_isRespGhAutoSuggest(autoSuggestDropdown) )
{
_setRespAutoSuggestHeight(autoSuggestDropdown);
}
},
_cleanupSidebarSearchOnRespGhClose=function()
{
var cbdAdapter=cbd.adapter,
sidebarSearch=cbdAdapter.getElementBySelector(_selectors.RESP_SIDEBAR_SEARCH_BOX),
EMPTY_STR=_constants.EMPTY_STR,
sidebarSearchValue,
sidebarSearchCompAttrStr,
sidebarSearchCompAttr,
sidebarSearchDefaultText,
shouldHideCancelButton;
if(sidebarSearch )
{
sidebarSearchValue=sidebarSearch.value;
sidebarSearchCompAttrStr=cbdAdapter.getAttribute(sidebarSearch, _constants.DATA_CBD_COMPATTR);
sidebarSearchCompAttr=cbdAdapter.parseJSON(sidebarSearchCompAttrStr);
sidebarSearchDefaultText=sidebarSearchCompAttr?sidebarSearchCompAttr.defaultText:EMPTY_STR;
shouldHideCancelButton=(sidebarSearchValue===sidebarSearchDefaultText )||
(sidebarSearchValue===EMPTY_STR );
if(shouldHideCancelButton )
{
_hideCancelBtn(sidebarSearch);
}
}
},
_respGhOnBrowserResizeEnd=function()
{
var cbdAdapter=cbd.adapter,
isRespSize=cbdcommon.screen.isMediaQuerySize(_constants.SMALL_OR_MEDIUM),
isOverflowSupported=cbdcommon.support.isOverflowSupported;
_setRespGhScrollDivDimensions();
_clearIconSearchOnResize();
_adjustRespResultsDropdownOnResize();
if(isRespSize )
{
cbdAdapter.setStyle(_selectors.VG0_DIV, _constants.HEIGHT, cbdAdapter.getViewportHeight());
}
else if(isOverflowSupported )
{
_clearOverflow();
}
};
window.cbdcommon=cbdcommon;
cbdcommon.gh=cbdcommon.gh||{};
cbdcommon.gh.RESPONSIVE_SILO_ANIMATION_SPEED=1.5;
cbdcommon.gh.events={
OPEN_START:"cbd-globalHeader:open:start",
OPEN_END:"cbd-globalHeader:open:end",
CLOSE_START:"cbd-globalHeader:close:start",
CLOSE_END:"cbd-globalHeader:close:end",
CLICK:"cbd-globalHeader:click",
SEARCH:"cbd-globalHeader:search",
AutoSuggest:{
INPUT_CLICK_END:"cbd-autoSuggest:inputClick:end",
SET_DIMENSIONS_START:"cbd-autoSuggest:setDropdownDimensions:start",
SHOW_SUGGESTIONS_START:"cbd-autoSuggest:showSuggestions:start",
HIDE_SUGGESTIONS_START:"cbd-autoSuggest:hideSuggestions:start"
}
};
cbdcommon.gh.init=function()
{
var cbdAdapter=cbd.adapter;
cbdAdapter.addEventListener({
node:window,
event:cbdAdapter.getEventName("BROWSER_RESIZE_END"),
func:_respGhOnBrowserResizeEnd,
id:_constants.RESP_RESIZE_END_EVENT_ID
});
};
cbdcommon.gh.toggleResponsiveMenu=function()
{
var commonGh=cbdcommon.gh;
if(commonGh.isRespMenuOpen())
{
commonGh.closeResponsiveMenu();
}
else
{
commonGh.openResponsiveMenu();
}
};
cbdcommon.gh.toggleLogOff=function(state)
{
cbd.adapter.getElementsBySelector(_selectors.LOG_OFF_UTIL_LINKS).each(function(index, item){
cbd.adapter.toggleEachItem(state, index, item);
});
};
cbdcommon.gh.openResponsiveMenu=function()
{
var cbdAdapter=cbd.adapter;
cbdAdapter.fireEvent({event:cbdcommon.gh.events.OPEN_START});
cbdAdapter.setStyle(_selectors.GH_FIRST_NAV, _constants.DISPLAY, _constants.BLOCK);
cbdAdapter.addClass(_selectors.BODY, _classes.GH_OPEN);
_openResponsiveCurrentSilo();
if(cbdcommon.support.isOverflowSupported )
{
_setOverflow();
}
_setRespGhScrollDivDimensions();
setTimeout(function(){
_openResponsiveMenuTimeoutFunction();
}, _constants.RESPONSIVE_GH_OPEN_ANIMATION_SPEED);
};
cbdcommon.gh.closeResponsiveMenu=function()
{
var cbdAdapter=cbd.adapter,
EMPTY_STR=_constants.EMPTY_STR;
cbdAdapter.fireEvent({event:cbdcommon.gh.events.CLOSE_START});
cbdAdapter.removeClass(_selectors.BODY, _classes.GH_OPEN);
_setSideBarWidth(EMPTY_STR);
_setMainAreaLeftPosition(EMPTY_STR);
setTimeout(function(){
_closeResponsiveMenuTimeoutFunction();
}, _constants.RESPONSIVE_GH_OPEN_ANIMATION_SPEED);
};
cbdcommon.gh.isRespMenuOpen=function()
{
return cbd.adapter.hasClass(_selectors.BODY, _classes.GH_OPEN);
};
cbdcommon.gh.autoSuggest=cbdcommon.gh.autoSuggest||{};
cbdcommon.gh.autoSuggest.init=function()
{
var cbdAdapter=cbd.adapter,
GH=_selectors.GH,
commonGhEvents=cbdcommon.gh.events,
commonGhAutoSuggEvents=commonGhEvents.AutoSuggest,
searchBoxes=cbdAdapter.getElementsBySelector(_selectors.GH_SEARCH_BOX),
numSearchBoxes=cbdAdapter.getNodeListLength(searchBoxes),
searchIcon;
if(numSearchBoxes > 0)
{
_setRespSideBarOpenAttribute(false);
_setRespIconSearchOpenAttribute(false);
cbdAdapter.addEventListener({
node:window,
event:commonGhAutoSuggEvents.INPUT_CLICK_END,
func:_onAutoSuggestInputClick
});
cbdAdapter.addEventListener({
node:window,
event:commonGhAutoSuggEvents.SET_DIMENSIONS_START,
func:_setAutoSuggestResultsDropdownDimensions
});
cbdAdapter.addEventListener({
node:window,
event:commonGhAutoSuggEvents.SHOW_SUGGESTIONS_START,
func:_showAutoSuggestResults
});
cbdAdapter.addEventListener({
node:window,
event:commonGhAutoSuggEvents.HIDE_SUGGESTIONS_START,
func:_hideAutoSuggestResults
});
searchIcon=cbdAdapter.getElementBySelector(_selectors.RESP_SEARCH_ICON);
if(searchIcon )
{
cbdAdapter.addEventListener({
node:searchIcon,
event:_constants.CLICK,
func:_searchBtnRespClick
});
}
cbd.adapter.addEventListener({
node:window,
event:commonGhEvents.CLOSE_END,
func:_cleanupSidebarSearchOnRespGhClose
});
cbd.adapter.addEventListener({
node:document.body,
event:_constants.CLICK,
func:_closeGhAutoSuggestOnBodyClick
});
}
};
cbdcommon.gh.autoSuggest.cancelBtnClick=function(autoSuggestInput)
{
if(_shouldAdjustSidebarSearch(autoSuggestInput) )
{
_resetRespSidebarForAutoSuggest();
}
_hideCancelBtn(autoSuggestInput);
if(_isIconSearchOpen())
{
cbd.adapter.removeClass(_selectors.GH_UTIL_BAR, _classes.RESP_GH_ICON_SEARCH_OPEN);
_setRespIconSearchOpenAttribute(false);
}
};
cbdcommon.gh.logon=cbdcommon.gh.logon||{};
cbdcommon.gh.logon.init=function()
{
var cbdAdapter=cbd.adapter,
commonGhLogOn=cbdcommon.gh.logon,
onclick=_constants.CLICK,
onkeydown=_constants.ONKEYDOWN,
respGhLogonCheckbox=cbdAdapter.getElementBySelector(_selectors.RESP_GH_LOGON_CHECKBOX),
respGhLogonButton=cbdAdapter.getElementBySelector(_selectors.RESP_GH_LOGON_BUTTON),
respGhPassword=cbdAdapter.getElementBySelector(_selectors.RESP_GH_PASSWORD);
commonGhLogOn._checkPlaceholder();
if(respGhLogonCheckbox)
{
cbdAdapter.addEventListener({
node:respGhLogonCheckbox,
event:onclick,
func:commonGhLogOn._cbdUpdateRememberMeAttr
});
}
if(respGhLogonButton)
{
cbdAdapter.addEventListener({
node:respGhLogonButton,
event:onclick,
func:commonGhLogOn._submitRespGhFormOnClick
});
}
if(respGhPassword)
{
cbdAdapter.addEventListener({
node:respGhPassword,
event:onkeydown,
func:commonGhLogOn._submitRespGhFormOnEnter
});
}
};
cbdcommon.gh.logon._checkPlaceholder=function()
{
"use strict";
var respLogOnUserName=document.getElementById("_cbdghInputUserId"),
respLogOnPassWord=document.getElementById(_constants.RESP_GH_PASSWORDID),
respLogOnUserNameplaceHolder,
respLogOnPasswordplaceHolder,
cbdAdapter=cbd.adapter;
if(respLogOnUserName&&respLogOnPassWord )
{
respLogOnUserNameplaceHolder=respLogOnUserName.placeholder;
respLogOnPasswordplaceHolder=respLogOnPassWord.placeholder;
if(respLogOnUserNameplaceHolder)
{
cbdAdapter.addClass(respLogOnUserName, "x-ghRespAddColor");
cbdAdapter.addClass(respLogOnPassWord, "x-ghRespAddColor");
}
else
{
respLogOnUserName.value="User name";
respLogOnPassWord.value="Password";
respLogOnUserName.type="text";
respLogOnPassWord.type="text";
cbdcommon.gh.logon._addEventListeners();
}
}
};
cbdcommon.gh.logon._addEventListeners=function()
{
var cbdAdapter=cbd.adapter,
commonGh=cbdcommon.gh,
commonGhLogOn=commonGh.logon,
respGhUserName=_selectors.RESP_GH_USER_NAME,
respGhPassWord=_selectors.RESP_GH_PASSWORD,
onfocus=_constants.FOCUS,
onblur=_constants.BLUR,
onclick=_constants.CLICK,
respGhUserNameElem=cbdAdapter.getElementBySelector(respGhUserName),
respGhPassWordElem=cbdAdapter.getElementBySelector(respGhPassWord);
cbdAdapter.addEventListener({
node:respGhUserNameElem,
event:onfocus,
func:commonGhLogOn._clearRespGhLogOn
});
cbdAdapter.addEventListener({
node:respGhUserNameElem,
event:onblur,
func:commonGhLogOn._onBlurRespGhLogOn
});
cbdAdapter.addEventListener({
node:respGhPassWordElem,
event:onfocus,
func:commonGhLogOn._clearRespGhLogOn
});
cbdAdapter.addEventListener({
node:respGhPassWordElem,
event:onblur,
func:commonGhLogOn._onBlurRespGhLogOn
});
};
cbdcommon.gh.logon._clearRespGhLogOn=function(eventArgs)
{
var targetElement=eventArgs.currentTarget,
_undefined=_constants.UNDEFINED,
_username=_constants.RESP_GH_USERNAME,
_password=_constants.RESP_GH_PASSWORD,
targetElementValue=targetElement.value,
cbdAdapter=cbd.adapter;
if(typeof(targetElement.placeholder===_undefined)&&(targetElementValue.length > 0) )
{
if(targetElementValue===_username)
{
targetElement.value='';
}
if(targetElementValue===_password)
{
targetElement.value='';
targetElement.type=_password;
}
}
cbdAdapter.addClass(targetElement, "x-ghRespAddColor");
};
cbdcommon.gh.logon._onBlurRespGhLogOn=function(eventArgs )
{
var targetElement=eventArgs.currentTarget,
_userName=_constants.RESP_GH_USERNAME,
_passWord=_constants.RESP_GH_PASSWORD,
_userNameType=_constants.RESP_GH_USERNAME_TYPE,
_passWordType=_constants.RESP_GH_PASSWORD_TYPE,
targetElementValue=targetElement.value;
if(typeof(targetElement.placeholder===_constants.UNDEFINED)&&(targetElementValue.length===0))
{
if((targetElementValue===_constants.EMPTY_STR)&&(targetElement.type===_userNameType))
{
targetElement.value=_userName;
targetElement.type=_userNameType;
}
if((targetElementValue===_constants.EMPTY_STR)&&(targetElement.type===_passWordType))
{
targetElement.type=_userNameType;
targetElement.value=_passWord;
}
}
cbdcommon.gh.logon._ghRespLogOnRemoveStyle(targetElement,"x-ghRespAddColor");
};
cbdcommon.gh.logon._ghRespLogOnRemoveStyle=function(targetElement, respCssClass )
{
var userName="User name",
passWord="Password",
targetElementValue=targetElement.value,
cbdAdapter=cbd.adapter;
if((targetElementValue===_constants.EMPTY_STR)||(targetElementValue===userName))
{
cbdAdapter.addClass(targetElement, respCssClass);
}
if((targetElementValue===_constants.EMPTY_STR)||(targetElementValue===passWord))
{
cbdAdapter.addClass(targetElement, respCssClass);
}
};
cbdcommon.gh.logon._submitRespGhFormOnClick=function(eventArgs)
{
var cbdcommonLogon=cbdcommon.gh.logon,
strWebUsagePage='FASHome';
cbdcommonLogon._submitRespGhForm(strWebUsagePage);
};
cbdcommon.gh.logon._submitRespGhFormOnEnter=function(eventArgs)
{
var key,
cbdcommonLogon=cbdcommon.gh.logon,
windowEvent=window.eventArgs,
strWebUsagePage='FASHome';
if(windowEvent)
{
key=windowEvent.keyCode;
}
else
{
key=eventArgs.which;
}
if(key===13)
{
cbdcommonLogon._submitRespGhForm(strWebUsagePage);
}
};
cbdcommon.gh.logon._respGHLogOnValidate=function()
{
var respGHLoginUserName=document.getElementById('_cbdghInputUserId'),
respGHLoginPassword=document.getElementById(_constants.RESP_GH_PASSWORDID),
isEmptyString=cbdcommon.string.isEmpty;
if(respGHLoginUserName!==null||respGHLoginPassword!==null)
{
if(!isEmptyString(respGHLoginUserName.value)||!isEmptyString(respGHLoginPassword.value))
{
return true;
}
}
return false;
};
cbdcommon.gh.logon._submitRespGhForm=function(strWebUsagePage)
{
var cbdcommonLogon=cbdcommon.gh.logon,
webUsage=cbdcommon.wu;
cbdcommonLogon._cbdUpdateRememberMeAttr();
if(cbdcommonLogon._respGHLogOnValidate())
{
webUsage.addMetaTag('pageid', strWebUsagePage);
webUsage.dcsTag();
document.forms['_cbdRespGHLoginForm'].submit();
}
};
cbdcommon.gh.logon._cbdUpdateRememberMeAttr=function()
{
var cbdcommonLogOn=cbdcommon.gh.logon,
targetURL=document.getElementById('_cbdtarget'),
targetURLValue=targetURL.value,
checkBoxRememberMe=document.getElementById('_cbdCheckBoxRememberMe'),
targetURLValue=unescape(targetURLValue),
strSeperator=cbdcommonLogOn._checkQuestMark(targetURLValue),
webUsage=cbdcommon.wu;
if(checkBoxRememberMe!==null)
{
if(checkBoxRememberMe.checked===true )
{
webUsage.addMetaTag('WT.rememberMe', 'Yes', 'cleanup');
targetURLValue=cbdcommonLogOn._updateTargetURLRememberAttr(targetURLValue, "rm_attr=off", "rm_attr=on", strSeperator);
}
else
{
webUsage.addMetaTag('WT.rememberMe', 'No', 'cleanup');
targetURLValue=cbdcommonLogOn._updateTargetURLRememberAttr(targetURLValue, "rm_attr=on", "rm_attr=off", strSeperator);
}
}
targetURL.value=targetURLValue;
};
cbdcommon.gh.logon._checkQuestMark=function(strTargetUrl)
{
if(strTargetUrl.indexOf('?')===-1)
{
return '?';
}
else
{
return '&';
}
};
cbdcommon.gh.logon._updateTargetURLRememberAttr=function(strTargetUrl,strCurrentRememberMeAttr,strReplaceRemmberMeAttr,strSeparator)
{
if(strTargetUrl.indexOf("rm_attr")===-1)
{
strTargetUrl=strTargetUrl+strSeparator+strReplaceRemmberMeAttr;
}
else
{
strTargetUrl=strTargetUrl.replace(strCurrentRememberMeAttr,strReplaceRemmberMeAttr);
}
return strTargetUrl;
};
}());
(function()
{
'use strict';
window.cbdWebAnalytics=window.cbdWebAnalytics||{};
var getObjectFromElementJSON=function(id)
{
var node=document.getElementById(id),
object={};
if(node)
{
try
{
if(cbd&&cbd.adapter)
{
object=cbd.adapter.parseJSON(node.innerHTML);
}
else
{
object=JSON.parse(node.innerHTML);
}
}
catch(exception)
{
object={};
}
}
return object;
},
isWebAnalyticsEnabled=function()
{
var node=document.getElementById('cbdcommon-webAnalytics');
return(node)?true:false;
},
handlePresetEvents=function(events)
{
var index=0;
if(events instanceof Array)
{
if(window.adobeAnalyticsImpl)
{
index=events.length;
while(index--)
{
adobeAnalyticsImpl.addEvent(events[index]);
}
}
}
},
handlePresets=function(helperObj)
{
var presets=helperObj?helperObj.webAnalyticsPresets:{},
adobeAnalyticsImpl=window.adobeAnalyticsImpl,
reset=false,
events, data;
if(presets)
{
events=presets.events;
data=presets.properties;
reset=presets.resetSession||false;
handlePresetEvents(events);
if(adobeAnalyticsImpl)
{
if(reset)
{
adobeAnalyticsImpl.resetSession();
}
adobeAnalyticsImpl.updateProperties(data);
}
}
},
getMetaTagContent=function(name)
{
var metaTag=cbdcommon.screen.getMetaTag(name);
return(metaTag)?metaTag.content:'';
},
updatePageNameFromMetaTags=function(pageName)
{
pageName.country=getMetaTagContent('WebAnalytics.country')||pageName.country;
pageName.language=getMetaTagContent('WebAnalytics.language')||pageName.language;
pageName.platform=getMetaTagContent('WebAnalytics.platform')||pageName.platform;
pageName.section=getMetaTagContent('WebAnalytics.contentGroup')||'';
pageName.subSection=getMetaTagContent('WebAnalytics.contentSubGroup')||'';
pageName.siteIdentifier=getMetaTagContent('WebAnalytics.siteId')||pageName.siteIdentifier;
pageName.pageNotFound=getMetaTagContent('WebAnalytics.errorPage')==='404';
pageName.pageId=pageName.pageId||'';
pageName.pageId=getMetaTagContent('WebAnalytics.pageName')||pageName.pageId;
return pageName;
},
getViewNameFromUrl=function(url)
{
var name=url.substring(url.lastIndexOf('/')+1),
indexOfDot=name.lastIndexOf('.');
return name.slice(0, indexOfDot);
},
deepMerge=function(target, source)
{
var property='',
value=null;
for(property in source)
{
if(source.hasOwnProperty(property))
{
value=source[property];
if(value&&Object.prototype.toString.call(value)==='[object Object]')
{
target[property]=target[property]||{};
deepMerge(target[property], value);
}
else
{
target[property]=target[property]||'';
value=value||target[property];
target[property]=value;
}
}
}
},
fireCustomEvent=function(eventName, node)
{
var event={};
try{
cbd.adapter.fireEvent({event:eventName, node:node});
}catch(err){
}
};
cbdWebAnalytics.flags=
{
pageNameModified:false,
performAutoTrack:true
};
cbdWebAnalytics.initAdobeAnalytics=function()
{
var helperObj={},
enabled=isWebAnalyticsEnabled(),
flags=cbdWebAnalytics.flags,
adobeAnalyticsImpl=window.adobeAnalyticsImpl,
pageName,
webAnalytics;
if(enabled)
{
webAnalytics=getObjectFromElementJSON('cbdcommon-webAnalytics');
webAnalytics.visitor_data=webAnalytics.visitor_data||{};
webAnalytics.page_data=webAnalytics.page_data||{};
webAnalytics.event_data=webAnalytics.event_data||{};
webAnalytics.customVars=webAnalytics.customVars||{};
webAnalytics.dfaConfig=webAnalytics.dfaConfig||{};
deepMerge(window.webAnalytics, webAnalytics);
helperObj=getObjectFromElementJSON('cbdcommon-webAnalyticsHelper');
if(adobeAnalyticsImpl)
{
handlePresets(helperObj);
pageName=helperObj.pageName||{};
pageName=updatePageNameFromMetaTags(pageName);
adobeAnalyticsImpl.updateProperties(pageName);
fireCustomEvent('CBD_ADOBE_ANALYTICS_PRE_TRACK', document);
if(flags.performAutoTrack===true)
{
adobeAnalyticsImpl.track();
}
flags.performAutoTrack=true;
}
}
};
cbdWebAnalytics.trackSPIChange=function(url)
{
var enabled=isWebAnalyticsEnabled(),
flags=cbdWebAnalytics.flags,
adobeAnalyticsImpl=window.adobeAnalyticsImpl,
pageName='',
props={};
if(enabled)
{
if(adobeAnalyticsImpl)
{
pageName=adobeAnalyticsImpl.getProperty('pageName');
if(pageName)
{
adobeAnalyticsImpl.utils.writeCookie(pageName, 's_prev_pn', 0);
adobeAnalyticsImpl.updateProperties({});
}
fireCustomEvent('CBD_WEBANALYTICS_SPI_CHANGE', document);
if(url&&!flags.pageNameModified)
{
props.url=url;
props.pageId=getMetaTagContent('WebAnalytics.pageName')||'';
props.subViewId=(props.pageId)?getViewNameFromUrl(url):'';
}
adobeAnalyticsImpl.updateProperties(props);
if(flags.performAutoTrack===true)
{
adobeAnalyticsImpl.track();
}
}
flags.pageNameModified=false;
flags.performAutoTrack=true;
}
};
}());
(function()
{
'use strict';
var getMetaTagContent=function(name)
{
var metaTag=cbdcommon.screen.getMetaTag(name);
return(metaTag)?metaTag.content:'';
};
window.cbdWebAnalytics=window.cbdWebAnalytics||{};
cbdWebAnalytics.apis=
{
updateVisitorProperty:function(key, value)
{
var obj={};
obj[key]=value;
this.updateVisitorProperties(obj);
},
updateVisitorProperties:function(properties)
{
var webAnalytics=window.webAnalytics,
props={}, visitor_data=null, key=null;
if(webAnalytics&&webAnalytics.visitor_data)
{
visitor_data=webAnalytics.visitor_data;
for(key in properties)
{
if(properties.hasOwnProperty(key)&&visitor_data.hasOwnProperty(key))
{
props[key]=properties[key];
}
}
}
else
{
props=properties;
}
if(window.adobeAnalyticsImpl)
{
adobeAnalyticsImpl.updateProperties(props);
}
},
trackLink:function(linkType, linkName, overrides, doneAction)
{
var _overrides=overrides||null,
callback=doneAction||null,
link=
{
type:linkType,
name:linkName,
overrides:_overrides,
callback:callback
};
if(window.adobeAnalyticsImpl)
{
adobeAnalyticsImpl.trackLink(link);
}
},
track:function()
{
if(window.adobeAnalyticsImpl)
{
adobeAnalyticsImpl.track();
}
},
updatePageNameFromMetaTags:function()
{
var pageName=
{
country:getMetaTagContent('WebAnalytics.country')||'us',
language:getMetaTagContent('WebAnalytics.language')||'en',
platform:getMetaTagContent('WebAnalytics.platform')||'web',
section:getMetaTagContent('WebAnalytics.contentGroup'),
siteIdentifier:getMetaTagContent('WebAnalytics.siteId'),
subSection:getMetaTagContent('WebAnalytics.contentSubGroup'),
pageId:getMetaTagContent('WebAnalytics.pageName')
};
if(window.adobeAnalyticsImpl)
{
adobeAnalyticsImpl.updateProperties(pageName);
cbdWebAnalytics.flags.pageNameModified=true;
}
},
updatePageNameFromUrl:function(url)
{
if(window.adobeAnalyticsImpl)
{
adobeAnalyticsImpl.updateProperties({url:url, pageId:'', domain:''});
cbdWebAnalytics.flags.pageNameModified=true;
}
},
appendToPageId:function(subViewId)
{
if(window.adobeAnalyticsImpl)
{
adobeAnalyticsImpl.updateProperties({subViewId:subViewId});
cbdWebAnalytics.flags.pageNameModified=true;
}
},
setSection:function(section)
{
if(window.adobeAnalyticsImpl)
{
adobeAnalyticsImpl.updateProperties({section:section});
cbdWebAnalytics.flags.pageNameModified=true;
}
},
setSubSection:function(subSection)
{
if(window.adobeAnalyticsImpl)
{
adobeAnalyticsImpl.updateProperties({subSection:subSection});
cbdWebAnalytics.flags.pageNameModified=true;
}
},
setErrorPage:function(isError)
{
if(window.adobeAnalyticsImpl)
{
adobeAnalyticsImpl.updateProperties({pageNotFound:isError});
}
},
addEvent:function(name, count, vars)
{
if(window.adobeAnalyticsImpl)
{
adobeAnalyticsImpl.addEvent({name:name, count:count, vars:vars});
}
},
updateProperty:function(name, value)
{
var data={};
data[name]=value;
if(window.adobeAnalyticsImpl)
{
adobeAnalyticsImpl.updateProperties(data);
}
},
suppressInitialTrack:function()
{
var flags=cbdWebAnalytics.flags;
flags.performAutoTrack=false;
},
suppressSPIAutoTrack:function()
{
var flags=cbdWebAnalytics.flags;
flags.performAutoTrack=false;
},
setPageId:function(pageId)
{
if(window.adobeAnalyticsImpl)
{
adobeAnalyticsImpl.updateProperties({pageId:pageId});
cbdWebAnalytics.flags.pageNameModified=true;
}
}
};
}());

