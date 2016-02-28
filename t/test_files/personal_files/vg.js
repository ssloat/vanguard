
if(!window.vg )
{
vg={};
}
vg.html={};
vg.comp={};
vg.util={};
vg.window={};
vg.smil={};
vg.validation={};
vg.button={};
vg.expRow={};
vg.resultsRow={};
vg.string={};
vg.ageBand={};
vg.listGrid={};
vg.procNav={};
vg.ajax={};
vg.textZoom={};
vg.textZoomNG={};
vg.textZoomNG.TEXT_ZOOM_CONTENT_CLASS="textZoomContent";
vg.textZoomNG.ZOOM_COOKIE="s:";
vg.textZoomNG.COOKIE_VALUES={"A-size1":"1", "A-size2":"2", "A-size3":"3"};
vg.event={};
(function(vg)
{
var BROWSER_SYNTH_RESIZE="BROWSER_SYNTH_RESIZE",
_windowResizeTimeout=null,
_currentBreakPoint,
_startBreakPoint,
_fireCustomSyntheticEvent=function(node, event, data)
{
var syntheticEvent=node.cbdCustomEvents[event];
if(syntheticEvent)
{
data.customType=event;
syntheticEvent.fire(data);
}
};
vg.event.DOM_CHANGE="CBD_DOM_CHANGE";
vg.event.GEO_CHANGE="CBD_GEO_CHANGE";
vg.event.DISP_CHANGE="CBD_DISP_CHANGE";
vg.event.PAGE_READY="CBD_PAGE_READY";
vg.event.LAYER_REPOSITION="CBD_LAYER_REPOSITION";
vg.event.LAYER_OPEN="CBD_LAYER_OPEN";
vg.event.LAYER_CLOSE="CBD_LAYER_CLOSE";
vg.event.TEXT_ZOOM_CLICK="CBD_TEXT_ZOOM_CLICK";
vg.event.LAYER_CONTENT_LOAD="CBD_LAYER_CONTENT_LOAD";
vg.event.POPULATOR_CONTENT_LOAD="CBD_POPULATOR_CONTENT_LOAD";
vg.event.CAROUSEL_ITEM_SELECT="CBD_CAROUSEL_ITEM_SELECT";
vg.event.DATA_TABLE_STRUCTURE_CHANGE="CBD_DATA_TABLE_STRUCTURE_CHANGE";
vg.event.FILTER_NAV_UPDATED="CBD_FILTER_NAV_UPDATED";
vg.event.FILTER_NAV_CLEAR="CBD_FILTER_NAV_CLEAR";
vg.event.FILTER_NAV_OPEN="CBD_FILTER_NAV_OPEN";
vg.event.ELEMENT_DISABLED="CBD_ELEMENT_DISABLED";
vg.event.BROWSER_RESIZE_END="CBD_SYNTH_BROWSER_RESIZE_END";
vg.event.BROWSER_RESIZE_START="CBD_SYNTH_BROWSER_RESIZE_START";
vg.event.BREAK_POINT_CHANGE="CBD_SYNTH_BREAK_POINT_CHANGE";
vg.event.CBD_GLOBAL_HEADER_CLICK="CBD_GLOBAL_HEADER_CLICK";
vg.event.CBD_GLOBAL_HEADER_SEARCH="CBD_GLOBAL_HEADER_SEARCH";
vg.event.CUSTOM_EVENTS=[];
vg.event.GSTR_DRAG_START="CBD_SYNTH_GSTR_DRAG_START";
vg.event.GSTR_DRAG_MOVE="CBD_SYNTH_GSTR_DRAG_MOVE";
vg.event.GSTR_DRAG_END="CBD_SYNTH_GSTR_DRAG_END";
vg.event.GSTR_FLICK="CBD_SYNTH_GSTR_FLICK";
vg.event.GSTR_MOVE="CBD_SYNTH_GSTR_MOVE";
vg.event.GSTR_HOVEREND="CBD_SYNTH_GSTR_HOVEREND";
vg.event.GSTR_HOVERSTART="CBD_SYNTH_GSTR_HOVERSTART";
vg.event.GSTR_CUSTOM_Y_SCROLL="CBD_SYNTH_GSTR_CUSTOM_Y_SCROLL";
vg.event.GSTR_CUSTOM_Y_SCROLL_END="CBD_SYNTH_GSTR_CUSTOM_Y_SCROLL_END";
vg.event.GSTR_DOWNSTART="CBD_SYNTH_GSTR_DOWNSTART";
vg.event.GSTR_CLICKEND="CBD_SYNTH_GSTR_CLICKEND";
vg.event.CLOSE_CBD_CANCEL_LAYER="CBD_CLOSE_CANCEL_LAYER";
vg.event.TABBOX_ITEM_SELECTED_ANIMATION="CBD_TABBOX_ITEM_SELECTED_ANIMATION";
vg.event.BrowserResizeEvent=
{
on:function()
{
_currentBreakPoint=cbdcommon.screen.getMediaQuerySize();
vg.html.addEventListenerMethod(window, 'resize', this, "_handleResize", BROWSER_SYNTH_RESIZE);
},
_handleResize:function(event)
{
var breakPoint=cbdcommon.screen.getMediaQuerySize(),
controller=this,
resizeEvent={
event:event,
breakPoint:breakPoint,
previousBreakPoint:_currentBreakPoint
};
if(breakPoint!==_currentBreakPoint)
{
_fireCustomSyntheticEvent(this.node, vg.event.BREAK_POINT_CHANGE, resizeEvent);
_currentBreakPoint=breakPoint;
}
if(_windowResizeTimeout===null )
{
_fireCustomSyntheticEvent(this.node, vg.event.BROWSER_RESIZE_START, resizeEvent);
_startBreakPoint=resizeEvent.previousBreakPoint;
}
clearTimeout(_windowResizeTimeout);
_windowResizeTimeout=setTimeout(function()
{
_windowResizeTimeout=null;
resizeEvent.previousBreakPoint=_startBreakPoint;
_fireCustomSyntheticEvent(controller.node, vg.event.BROWSER_RESIZE_END, resizeEvent);
}, 100);
},
detach:function(node)
{
vg.html.removeEventListenerById(window, BROWSER_SYNTH_RESIZE);
}
};
vg.event.DragGesture=
{
on:function(node)
{
if(cbd.browser.isTouchScreen)
{
vg.html.addEventListenerMethod(node, 'touchstart', this, "_handleGesture", "DRAG_GSTR_TOUCHSTART");
}
else
{
vg.html.addEventListenerMethod(node, 'mousedown', this, "_handleGesture", "DRAG_GSTR_MOUSEDOWN");
}
},
_handleGesture:function(event)
{
var touch,
controller=this,
startEvent={},
gestureValid=true,
_handleGestureProgress,
_handleGestureEnd;
_handleGestureProgress=function(event)
{
var moveEvt=event,
moveSub;
if(moveEvt.touches)
{
controller.normalizeTouchEvent(moveEvt, moveEvt.touches[0]);
}
moveEvt.start=startEvent;
moveEvt.customType=vg.event.GSTR_DRAG_MOVE;
moveSub=controller.node.cbdCustomEvents[vg.event.GSTR_DRAG_MOVE];
if(moveSub)
{
moveSub.fire(moveEvt);
}
};
_handleGestureEnd=function(event)
{
var valid=gestureValid,
endEvent;
if(valid)
{
if(event.changedTouches)
{
if(event.changedTouches.length===1&&event.touches.length===0)
{
valid=true;
controller.normalizeTouchEvent(event, event.changedTouches[0]);
}
else
{
valid=false;
}
}
if(valid)
{
event.customType=vg.event.GSTR_DRAG_END;
event.start=startEvent;
endEvent=controller.node.cbdCustomEvents[vg.event.GSTR_DRAG_END];
if(endEvent)
{
endEvent.fire(event);
}
startEvent=null;
if(cbd.browser.isTouchScreen)
{
vg.html.removeEventListener(document, 'touchmove', _handleGestureProgress, "DRAG_GSTR_TOUCHMOVE");
vg.html.removeEventListener(document, 'touchend', _handleGestureEnd, "DRAG_GSTR_TOUCHEND");
}
else
{
vg.html.removeEventListener(document, 'mousemove', _handleGestureProgress, "DRAG_GSTR_MOUSEMOVE");
vg.html.removeEventListener(document, 'mouseup', _handleGestureEnd, "DRAG_GSTR_MOUSEUP");
}
}
}
};
if(event.touches)
{
gestureValid=(event.touches.length===1);
controller.normalizeTouchEvent(event, event.touches[0]);
touch=true;
}
else
{
controller.normalizeMouseEvent(event);
gestureValid=(event.buttons===1);
}
if(gestureValid)
{
event.customType=controller.type;
vg.util.attachJsonOptions(startEvent, event);
if(touch)
{
vg.html.addEventListener(document, 'touchmove', _handleGestureProgress, "DRAG_GSTR_TOUCHMOVE");
vg.html.addEventListener(document, 'touchend', _handleGestureEnd, "DRAG_GSTR_TOUCHEND");
}
else
{
vg.html.addEventListener(document, 'mousemove', _handleGestureProgress, "DRAG_GSTR_MOUSEMOVE");
vg.html.addEventListener(document, 'mouseup', _handleGestureEnd, "DRAG_GSTR_MOUSEUP");
}
controller.fire(event);
}
},
detach:function(node)
{
if(cbd.browser.isTouchScreen)
{
vg.html.removeEventListenerById(document, "DRAG_GSTR_TOUCHMOVE");
vg.html.removeEventListenerById(document, "DRAG_GSTR_TOUCHEND");
vg.html.removeEventListenerById(node, "DRAG_GSTR_TOUCHSTART");
}
else
{
vg.html.removeEventListenerById(document, "DRAG_GSTR_MOUSEMOVE");
vg.html.removeEventListenerById(document, "DRAG_GSTR_MOUSEUP");
vg.html.removeEventListenerById(node, "DRAG_GSTR_MOUSEDOWN");
}
}
};
vg.event.DragMoveGesture={};
vg.event.DragEndGesture={};
vg.event.HoverStartGesture=
{
on:function(node)
{
if(cbd.browser.isTouchScreen)
{
vg.html.addEventListenerMethod(node, 'touchstart', this, "_handleGesture", "HOVERSTART_GSTR_TOUCHSTART");
}
else
{
vg.html.addEventListenerMethod(node, 'mouseover', this, "_handleGesture", "HOVERSTART_GSTR_MOUSEOVER");
}
},
_handleGesture:function(event)
{
if(event.touches)
{
if(event.touches.length===1)
{
this.normalizeTouchEvent(event, event.touches[0]);
}
else
{
return;
}
}
event.customType=this.type;
this.fire(event);
},
detach:function(node)
{
if(cbd.browser.isTouchScreen)
{
vg.html.removeEventListenerById(node, "HOVERSTART_GSTR_TOUCHSTART");
}
else
{
vg.html.removeEventListenerById(node, "HOVERSTART_GSTR_MOUSEOVER");
}
}
};
vg.event.MoveGesture=
{
on:function(node)
{
if(cbd.browser.isTouchScreen)
{
vg.html.addEventListenerMethod(node, 'touchmove', this, "_handleGestureProgress", "MOVE_GSTR_TOUCHMOVE");
}
else
{
vg.html.addEventListenerMethod(node, 'mousemove', this, "_handleGestureProgress", "MOVE_GSTR_MOUSEMOVE");
}
},
_handleGestureProgress:function(event)
{
if(event.changedTouches)
{
this.normalizeTouchEvent(event, event.changedTouches[0]);
}
event.customType=this.type;
this.fire(event);
},
detach:function(node)
{
if(cbd.browser.isTouchScreen)
{
vg.html.removeEventListenerById(node, "MOVE_GSTR_TOUCHMOVE");
}
else
{
vg.html.removeEventListenerById(node, "MOVE_GSTR_MOUSEMOVE");
}
}
};
vg.event.HoverEndGesture=
{
on:function(node)
{
if(cbd.browser.isTouchScreen)
{
vg.html.addEventListenerMethod(node, 'touchend', this, "_handleGesture", "HOVEREND_GSTR_TOUCHEND");
}
else
{
vg.html.addEventListenerMethod(node, 'mouseout', this, "_handleGesture", "HOVEREND_GSTR_MOUSEOUT");
}
},
_handleGesture:function(event)
{
if(event.changedTouches)
{
if(event.changedTouches.length===1&&event.touches.length===0)
{
this.normalizeTouchEvent(event, event.changedTouches[0]);
}
else
{
return;
}
}
event.customType=this.type;
this.fire(event);
},
detach:function(node)
{
if(cbd.browser.isTouchScreen)
{
vg.html.removeEventListenerById(node, "HOVEREND_GSTR_TOUCHEND");
}
else
{
vg.html.removeEventListenerById(node, "HOVEREND_GSTR_MOUSEOUT");
}
}
};
vg.event.FlickGesture=
{
on:function(node)
{
vg.html.addEventListenerMethod(node, 'touchstart', this, "_handleGesture", "FLICK_GSTR_TOUCHSTART");
vg.html.addEventListenerMethod(node, 'mousedown', this, "_handleGesture", "FLICK_GSTR_MOUSEDOWN");
},
applyFilter:function(filter, eventData)
{
var flickData=eventData.flick,
prop;
if(!flickData)
{
return false;
}
if(filter&&filter.axis)
{
flickData.axis=filter.axis;
prop=(filter.axis==='x')?'clientX':'clientY';
flickData.distance=eventData[prop]- flickData.start[prop];
flickData.velocity=(flickData.time!==0)?flickData.distance/flickData.time:0;
}
if(!isNaN(filter.minDistance)&&filter.minDistance > Math.abs(flickData.distance))
{
return false;
}
if(!isNaN(filter.minVelocity)&&filter.minVelocity > Math.abs(flickData.velocity))
{
return false;
}
return true;
},
_handleGesture:function(event)
{
var startEvent={},
controller=this,
gestureValid=true,
valid=true,
touch=false,
_handleGestureProgress,
_handleGestureEnd;
_handleGestureProgress=function(event)
{
if(startEvent&&startEvent.flick)
{
startEvent.flick.time=new Date().getTime();
}
vg.html.removeEventListener(document, 'touchmove', _handleGestureProgress, "FLICK_GSTR_TOUCHMOVE");
vg.html.removeEventListener(document, 'mousemove', _handleGestureProgress, "FLICK_GSTR_MOUSEMOVE");
};
_handleGestureEnd=function(event)
{
var xyDistance,
time,
velocity,
distance,
touch,
evt=event,
endEvent={},
endTime=new Date().getTime();
valid=gestureValid;
if(valid)
{
if(event.changedTouches)
{
if(event.changedTouches.length===1&&event.touches.length===0)
{
controller.normalizeTouchEvent(event, event.changedTouches[0]);
touch=true;
}
else
{
valid=false;
}
}
if(valid)
{
endEvent=event;
xyDistance={x:endEvent.clientX - startEvent.clientX, y:endEvent.clientY - startEvent.clientY};
distance=(Math.abs(xyDistance.x) >=Math.abs(xyDistance.y))?xyDistance.x:xyDistance.y;
endEvent.customType=controller.type;
time=endTime - startEvent.flick.time;
endEvent.flick=
{
time:time,
start:startEvent,
distance:distance,
velocity:(time!==0)?distance/time:0
};
if(touch)
{
vg.html.removeEventListener(document, 'touchmove', _handleGestureProgress, "FLICK_GSTR_TOUCHMOVE");
vg.html.removeEventListener(document, 'touchend', _handleGestureEnd, "FLICK_GSTR_TOUCHEND");
}
else
{
vg.html.removeEventListener(document, 'mousemove', _handleGestureProgress, "FLICK_GSTR_MOUSEMOVE");
vg.html.removeEventListener(document, 'mouseup', _handleGestureEnd, "FLICK_GSTR_MOUSEUP");
}
controller.fire(endEvent);
startEvent=null;
}
}
};
if(event.touches)
{
gestureValid=(event.touches.length===1);
controller.normalizeTouchEvent(event, event.touches[0]);
touch=true;
}
else
{
controller.normalizeMouseEvent(event);
gestureValid=(event.buttons===1);
}
if(gestureValid)
{
vg.html.stopEventPropagation(event);
vg.html.preventDefault(event);
vg.util.attachJsonOptions(startEvent, event);
startEvent.flick={time:new Date().getTime()};
if(touch)
{
vg.html.addEventListener(document, 'touchmove', _handleGestureProgress, "FLICK_GSTR_TOUCHSMOVE");
vg.html.addEventListener(document, 'touchend', _handleGestureEnd, "FLICK_GSTR_TOUCHEND");
}
else
{
vg.html.addEventListener(document, 'mousemove', _handleGestureProgress, "FLICK_GSTR_MOUSEMOVE");
vg.html.addEventListener(document, 'mouseup', _handleGestureEnd, "FLICK_GSTR_MOUSEUP");
}
}
},
detach:function(node)
{
vg.html.removeEventListenerById(node, "FLICK_GSTR_MOUSEDOWN");
vg.html.removeEventListenerById(document, "FLICK_GSTR_MOUSEMOVE");
vg.html.removeEventListenerById(document, "FLICK_GSTR_MOUSEUP");
vg.html.removeEventListenerById(node, "FLICK_GSTR_TOUCHSTART");
vg.html.removeEventListenerById(document, "FLICK_GSTR_TOUCHMOVE");
vg.html.removeEventListenerById(document, "FLICK_GSTR_TOUCHEND");
}
};
vg.event.CustomYSCrollGesture=
{
on:function(node)
{
if(cbd.browser.isTouchScreen)
{
vg.html.addEventListenerMethod(node, 'touchstart', this, "_handleGesture", "CUSTOM_Y_SCROLL_GSTR_TOUCHSTART");
}
},
_handleGesture:function(event)
{
var touch, controller=this,
startEvent={},
gstrValid=true,
validMoveGesture=true,
movingEngaged=false,
startDistBetweenTouches=0,
firstMoveOccured=false,
startPos=0,
isZoomThreshold=5,
_handleGestureProgress,
_handleGestureEnd,
initialX,
initialY,
isVerticalScroll=false,
firstTouch;
_handleGestureProgress=function(event)
{
var moveEvt=event,
newDist,
diff,
moveSub,
moveEventTouches=moveEvt.touches,
firstTouch,
secondTouch,
newX,
newY,
horizontalMovement,
verticalMovement;
validMoveGesture=((event.touches.length===1)||(event.touches.length===2) );
if(moveEventTouches)
{
firstTouch=moveEventTouches[0];
if((moveEventTouches.length===2)&&!movingEngaged)
{
if(!firstMoveOccured)
{
validMoveGesture=false;
}
else
{
newDist=vg.event.getDistBetweenTouches(firstTouch, moveEventTouches[1]);
diff=Math.abs(newDist - startDistBetweenTouches);
if(diff > isZoomThreshold)
{
validMoveGesture=false;
}
}
firstMoveOccured=true;
}
newX=firstTouch.clientX;
newY=firstTouch.clientY;
horizontalMovement=Math.abs(initialX - newX);
verticalMovement=Math.abs(initialY - newY);
isVerticalScroll=(horizontalMovement <=verticalMovement);
}
if(validMoveGesture&&isVerticalScroll)
{
if(moveEvt.changedTouches)
{
controller.normalizeTouchEvent(moveEvt, firstTouch);
}
moveEvt.start=startEvent;
moveEvt.customType=vg.event.GSTR_CUSTOM_Y_SCROLL;
moveSub=controller.node.cbdCustomEvents[vg.event.GSTR_CUSTOM_Y_SCROLL];
if(moveSub)
{
moveSub.fire(moveEvt);
movingEngaged=true;
}
}
};
_handleGestureEnd=function(event)
{
var validEndMove=gstrValid&&movingEngaged,
endEvent;
if(validEndMove)
{
if(event.changedTouches)
{
if(event.changedTouches.length===1&&event.touches.length===0)
{
validEndMove=true;
controller.normalizeTouchEvent(event, event.changedTouches[0]);
}
else
{
validEndMove=false;
}
}
if(validEndMove)
{
event.customType=vg.event.GSTR_CUSTOM_Y_SCROLL_END;
event.start=startEvent;
endEvent=controller.node.cbdCustomEvents[vg.event.GSTR_CUSTOM_Y_SCROLL_END];
if(endEvent)
{
endEvent.fire(event);
}
startEvent=null;
if(cbd.browser.isTouchScreen)
{
vg.html.removeEventListener(controller.node, 'touchmove', _handleGestureProgress, "CUSTOM_Y_SCROLL_GSTR_TOUCHMOVE");
vg.html.removeEventListener(document, 'touchend', _handleGestureEnd, "CUSTOM_Y_SCROLL_GSTR_TOUCHEND");
}
}
}
};
if(event.touches)
{
gstrValid=((event.touches.length===1&&event.changedTouches.length===1)
||(event.touches.length===2&&event.changedTouches.length===1)
||(event.touches.length===2&&event.changedTouches.length===2) );
controller.normalizeTouchEvent(event, event.touches[0]);
touch=true;
}
if(gstrValid===true)
{
event.customType=controller.type;
startEvent=event;
if(touch)
{
firstTouch=event.touches[0];
startPos=firstTouch.clientX;
if((event.touches.length===2&&event.changedTouches.length===1)
||(event.touches.length===2&&event.changedTouches.length===2) )
{
startDistBetweenTouches=vg.event.getDistBetweenTouches(firstTouch, event.touches[1]);
}
initialX=firstTouch.clientX;
initialY=firstTouch.clientY;
vg.html.removeEventListenerById(controller.node, "CUSTOM_Y_SCROLL_GSTR_TOUCHMOVE");
vg.html.removeEventListenerById(document, "CUSTOM_Y_SCROLL_GSTR_TOUCHEND");
vg.html.addEventListener(controller.node, 'touchmove', _handleGestureProgress, "CUSTOM_Y_SCROLL_GSTR_TOUCHMOVE");
vg.html.addEventListener(document, 'touchend', _handleGestureEnd, "CUSTOM_Y_SCROLL_GSTR_TOUCHEND");
}
}
},
detach:function(node)
{
if(cbd.browser.isTouchScreen)
{
vg.html.removeEventListenerById(node, "CUSTOM_Y_SCROLL_GSTR_TOUCHSTART");
vg.html.removeEventListenerById(node, "CUSTOM_Y_SCROLL_GSTR_TOUCHMOVE");
vg.html.removeEventListenerById(document, "CUSTOM_Y_SCROLL_GSTR_TOUCHEND");
}
}
};
vg.event.DownStartGesture=
{
on:function(node)
{
if(cbd.browser.isTouchScreen)
{
vg.html.addEventListenerMethod(node, 'touchstart', this, "_handleGesture", "DOWNSTART_GSTR_TOUCHSTART");
}
else
{
vg.html.addEventListenerMethod(node, 'mousedown', this, "_handleGesture", "DOWNSTART_GSTR_MOUSEDOWN");
}
},
_handleGesture:function(event)
{
if(event.touches)
{
this.normalizeTouchEvent(event, event.touches[0]);
}
event.customType=this.type;
this.fire(event);
},
detach:function(node)
{
if(cbd.browser.isTouchScreen)
{
vg.html.removeEventListenerById(node, "DOWNSTART_GSTR_TOUCHSTART");
}
else
{
vg.html.removeEventListenerById(node, "DOWNSTART_GSTR_MOUSEDOWN");
}
}
};
vg.event.ClickEndGesture=
{
on:function(node)
{
if(cbd.browser.isTouchScreen)
{
vg.html.addEventListenerMethod(node, 'touchend', this, "_handleGesture", "CUSTM_GSTR_TOUCHEND");
}
else
{
vg.html.addEventListenerMethod(node, 'click', this, "_handleGesture", "CUSTM_GSTR_CLICK");
}
},
_handleGesture:function(event)
{
event.customType=this.type;
this.fire(event);
},
detach:function(node)
{
if(cbd.browser.isTouchScreen)
{
vg.html.removeEventListenerById(node, "CUSTM_GSTR_TOUCHCLICK");
}
else
{
vg.html.removeEventListenerById(node, "CUSTM_GSTR_CLICK");
}
}
};
vg.event.CustomYSCrollEndGesture={};
vg.event.SYNTH_EVENTS=
{
CBD_SYNTH_BROWSER_RESIZE_START:vg.event.BrowserResizeEvent,
CBD_SYNTH_BROWSER_RESIZE_END:vg.event.BrowserResizeEvent,
CBD_SYNTH_BREAK_POINT_CHANGE:vg.event.BrowserResizeEvent,
CBD_SYNTH_GSTR_DRAG_START:vg.event.DragGesture,
CBD_SYNTH_GSTR_DRAG_MOVE:vg.event.DragMoveGesture,
CBD_SYNTH_GSTR_DRAG_END:vg.event.DragEndGesture,
CBD_SYNTH_GSTR_FLICK:vg.event.FlickGesture,
CBD_SYNTH_GSTR_MOVE:vg.event.MoveGesture,
CBD_SYNTH_GSTR_HOVEREND:vg.event.HoverEndGesture,
CBD_SYNTH_GSTR_HOVERSTART:vg.event.HoverStartGesture,
CBD_SYNTH_GSTR_CUSTOM_Y_SCROLL:vg.event.CustomYSCrollGesture,
CBD_SYNTH_GSTR_CUSTOM_Y_SCROLL_END:vg.event.CustomYSCrollEndGesture,
CBD_SYNTH_GSTR_DOWNSTART:vg.event.DownStartGesture,
CBD_SYNTH_GSTR_CLICKEND:vg.event.ClickEndGesture
};
vg.event.SyntheticEvent=function(eventType, node)
{
this.initialize(eventType, node);
};
vg.event.SyntheticEvent.prototype=
{
initialize:function(eventType, node)
{
this.node=node;
this.type=eventType;
this.listeners=[];
if(node)
{
vg.util.attachJsonOptions(this, vg.event.SYNTH_EVENTS[eventType]);
}
},
on:function(){},
detach:function(){},
subscribe:function(func)
{
if(this.listeners.length===0)
{
this.on(this.node, this);
}
this.listeners.push(func);
},
unsubscribe:function(func)
{
var length=this.listeners.length,
foundIndex=-1,
i;
for(i=0;i < length;i++)
{
if(this.listeners[i]===func)
{
foundIndex=i;
break;
}
}
if(foundIndex > -1)
{
this.listeners.splice(foundIndex, 1);
if(this.listeners.length===0)
{
this.detach(this.node);
}
}
},
fire:function(eventData)
{
var listener,
filter,
length=this.listeners.length,
i;
for(i=0;i < length;i++)
{
listener=this.listeners[i];
filter=listener.filter;
if(!filter||this.applyFilter(filter, eventData))
{
listener.call(this.node, eventData);
}
}
},
applyFilter:function(filter, eventData)
{
return true;
},
normalizeTouchEvent:function(event, touchInfo)
{
event.pageX=touchInfo.pageX;
event.pageY=touchInfo.pageY;
event.screenX=touchInfo.screenX;
event.screenY=touchInfo.screenY;
event.clientX=touchInfo.clientX;
event.clientY=touchInfo.clientY;
event.target=event.target||touchInfo.target;
event.currentTarget=event.currentTarget||touchInfo.currentTarget;
},
normalizeMouseEvent:function(event)
{
event.buttons=event.buttons||event.which||event.button;
}
};
vg.event.isWithinNodes=function(event, boundaryNodes)
{
if(boundaryNodes)
{
var pageX=0,
pageY=0,
eventPos=vg.event.getPosition(event),
i,
boundaryNodesLength,
node,
boundary;
if(eventPos.x)
{
pageX=eventPos.x;
pageY=eventPos.y;
}
boundaryNodesLength=boundaryNodes.length;
for(i=0;i < boundaryNodesLength;i++)
{
node=vg.html.getElement(boundaryNodes[i]);
boundary=vg.html.findBoundary(node);
if((pageX >=boundary.left&&pageX < boundary.right)&&(pageY < boundary.bottom&&pageY >=boundary.top))
{
return true;
}
}
}
return false;
};
vg.event.getPosition=function(e)
{
var eventPos={};
if(window.ieQuirksMode)
{
eventPos.x=e.clientX+window._cbdGetScrollLeft();
eventPos.y=e.clientY+window._cbdGetScrollTop();
}
else if(e.changedTouches)
{
eventPos.x=e.changedTouches[0].pageX;
eventPos.y=e.changedTouches[0].pageY;
}
else
{
eventPos.x=e.pageX;
eventPos.y=e.pageY;
}
return eventPos;
};
vg.event.getPositionRelativeToElem=function(e, elem)
{
var elemPos=vg.html.getObjXY(elem),
eventPos=vg.event.getPosition(e);
eventPos.x -=elemPos.x;
eventPos.y -=elemPos.y;
return eventPos;
};
vg.event.getDistBetweenTouches=function(touch1, touch2)
{
var touch1ClientY=touch1.clientY,
touch1ClientX=touch1.clientX,
touch2ClientY=touch2.clientY,
touch2ClientX=touch2.clientX,
dist=Math.round(Math.sqrt(Math.pow((touch2ClientX - touch1ClientX), 2)+Math.pow((touch2ClientY - touch1ClientY), 2) ) );
return dist;
};
}(vg));
vg.touchScreen={};
vg.touchScreen.oneFinger=new Object();
vg.delayedEvents=0;
vg.html.ELEMENT_NODE="1";
vg.wu=new Object();
var CBD_GLOBAL_INFO_BOX='NON_BB_GLOBAL_INFO_BOX',
CBD_DYNAMIC_CSS='dynmCSS',
CBD_DYNAMIC_CSS_ID='dynmCSSDiv',
CBD_WRAP_DIV_ID='wrapDiv';
vg.comp.floatingHeadPrefix=floatingHeadPrefix='floatingTableHeader-';
if(!window._cbdLooseFuncs)
{
_cbdLooseFuncs={};
}
vg.QueryString=function(readOnLoad)
{
this.arg=new Array;
if(readOnLoad!=false)
{
this.read();
}
};
vg.QueryString.prototype=
{
get:function(sName)
{
return this.arg[sName];
},
read:function(sUrl)
{
var aArgsTemp,
aTemp,
sQuery,
i;
if(sUrl)
{
sQuery=sUrl.substr(sUrl.lastIndexOf("?")+1, sUrl.length);
}
else
{
sQuery=window.location.search.substr(1, window.location.search.length);
}
if(sQuery.length < 1)
{
return;
}
aArgsTemp=sQuery.split("&");
for(i=0;i < aArgsTemp.length;i++)
{
aTemp=aArgsTemp[i].split("=");
this.arg[aTemp[0]]=aTemp[1];
}
}
};
vg.position=new Object();
if(cbd.page.isNextGen)
{
vg.position.LEADER_OFFSET=18;
vg.position.LEADER_WIDTH=20;
vg.position.LEADER_HEIGHT=11;
vg.position.LINK_OFFSET=6;
vg.position.SHADOW_OFFSET=0;
vg.position.LDR_IMAGE_XOFFSET=0;
vg.position.MIN_LINK_WIDTH=vg.position.LEADER_WIDTH+vg.position.LEADER_OFFSET;
}
else
{
vg.position.LEADER_OFFSET=15;
vg.position.LEADER_WIDTH=32;
vg.position.LEADER_HEIGHT=11;
vg.position.LINK_OFFSET=0;
vg.position.SHADOW_OFFSET=(ie6)?0:6;
vg.position.MIN_LINK_WIDTH=vg.position.LEADER_WIDTH;
vg.position.LDR_IMAGE_XOFFSET=(ie6)?2:4;
}
var LEADER_OFFSET=vg.position.LEADER_OFFSET;
var LEADER_WIDTH=vg.position.LEADER_WIDTH;
var LEADER_HEIGHT=vg.position.LEADER_HEIGHT;
var LINK_OFFSET=vg.position.LINK_OFFSET;
var SHADOW_OFFSET=vg.position.SHADOW_OFFSET;
var LDR_IMAGE_XOFFSET=vg.position.LDR_IMAGE_XOFFSET;
var MIN_LINK_WIDTH=vg.position.MIN_LINK_WIDTH;
vg.position._ne=function(elem, target)
{
elem.viewNode.x=target.x+target.w;
elem.viewNode.y=target.y - elem.h;
elem.leaderId=null;
};
vg.position._se=function(elem, target)
{
elem.viewNode.x=target.x+target.w;
elem.viewNode.y=target.y+target.h;
elem.leaderId=null;
};
vg.position._sw=function(elem, target)
{
elem.viewNode.x=target.x - elem.w;
elem.viewNode.y=target.y+target.h;
elem.leaderId=null;
};
vg.position._nw=function(elem, target)
{
elem.viewNode.x=target.x - elem.w;
elem.viewNode.y=target.y - elem.h;
elem.leaderId=null;
};
vg.position._right=function(elem, target, eventPos)
{
elem.viewNode.x=target.x+target.w;
elem.viewNode.y=target.y+target.h/2 - elem.h/2;
if(elem.hasLeader)
{
elem.ldrLoc="xLdrLft";
_cbdAddLeader(elem, target, eventPos);
elem.ldrOffSetX=((ie)?10:11 );
}
};
vg.position._top=function(elem, target, eventPos)
{
elem.viewNode.x=target.x+target.w/2 - elem.w/2+vg.position.LDR_IMAGE_XOFFSET;
elem.viewNode.y=target.y - elem.h+vg.position.SHADOW_OFFSET;
if(elem.hasLeader)
{
elem.ldrLoc="xLdrBot";
_cbdAddLeader(elem, target, eventPos);
elem.ldrOffSetY=-1*vg.position.LEADER_HEIGHT;
}
};
vg.position._left=function(elem, target, eventPos)
{
elem.viewNode.x=target.x - elem.w;
elem.viewNode.y=target.y+target.h/2 - elem.h/2;
if(elem.hasLeader)
{
elem.ldrLoc="xLdrRgt";
_cbdAddLeader(elem, target, eventPos);
elem.ldrOffSetX=-1*vg.position.LEADER_HEIGHT;
}
};
vg.position._bottom=function(elem, target, eventPos)
{
elem.viewNode.x=target.x+target.w/2 - elem.w/2+vg.position.LDR_IMAGE_XOFFSET;
elem.viewNode.y=target.y+target.h;
if(elem.hasLeader)
{
elem.ldrLoc="xLdrTop";
_cbdAddLeader(elem, target, eventPos);
elem.ldrOffSetY=11;
}
};
vg.position._topLeft=function(elem, target, eventPos)
{
elem.viewNode.x=target.x;
elem.viewNode.y=target.y - elem.h;
elem.x=elem.viewNode.x;
if(elem.hasLeader)
{
if(vg.position.MIN_LINK_WIDTH >=target.w)
{
elem.viewNode.x=elem.viewNode.x+target.w/2 - vg.position.LEADER_OFFSET - vg.position.LEADER_WIDTH/2;
}
elem.viewNode.y=elem.viewNode.y+vg.position.SHADOW_OFFSET;
elem.x=elem.viewNode.x;
elem.y=elem.viewNode.y;
elem.ldrLoc="xLdrBot";
var ldrData=_cbdAddLeader(elem, target, eventPos);
elem.ldrOffSetY=-1*vg.position.LEADER_HEIGHT;
var ldrDiv=document.getElementById(elem.leaderId);
ldrDiv.style.left=elem.x+vg.position.LEADER_OFFSET+"px";
ldrDiv.style.top=ldrData.elem.y+vg.position.SHADOW_OFFSET+"px";
}
};
vg.position._topRight=function(elem, target, eventPos)
{
elem.viewNode.x=target.x+target.w - elem.w;
elem.x=elem.viewNode.x;
elem.viewNode.y=target.y - elem.h;
if(elem.hasLeader)
{
if(vg.position.MIN_LINK_WIDTH >=target.w)
{
elem.viewNode.x=elem.viewNode.x - target.w/2+vg.position.LEADER_OFFSET+vg.position.LEADER_WIDTH/2;
}
elem.viewNode.y=elem.viewNode.y+vg.position.SHADOW_OFFSET;
elem.x=elem.viewNode.x;
elem.y=elem.viewNode.y;
elem.ldrLoc="xLdrBot";
var ldrData=_cbdAddLeader(elem, target, eventPos);
elem.ldrOffSetY=-1*vg.position.LEADER_HEIGHT;
ldrDiv=document.getElementById(elem.leaderId);
ldrDiv.style.left=elem.x+elem.w - vg.position.LEADER_WIDTH - vg.position.LEADER_OFFSET+"px";
ldrDiv.style.top=ldrData.elem.y+vg.position.SHADOW_OFFSET+"px";
}
};
vg.position._fixedBottom=function(elem, target, eventPos)
{
elem.x=target.x;
elem.y=target.y+target.h;
var offsetBox=(elem.x>=12?12:0);
var offsetLeader=(target.w/2);
elem.x=elem.x-offsetBox;
_cbdCreateLeader(elem.id, 'xLdrTop', eventPos);
elem.ldrOffSetY=11;
elem.viewNode.x=elem.x;
elem.viewNode.y=elem.y;
ldrDiv=document.getElementById(elem.leaderId);
ldrDiv.style.left=elem.x+offsetLeader+"px";
ldrDiv.style.top=elem.y+"px";
};
vg.position._bottomLeft=function(elem, target, eventPos)
{
elem.viewNode.x=target.x;
elem.viewNode.y=target.y+target.h;
elem.x=elem.viewNode.x;
if(elem.hasLeader)
{
if(vg.position.MIN_LINK_WIDTH >=target.w)
{
elem.viewNode.x=elem.viewNode.x+target.w/2 - vg.position.LEADER_OFFSET - vg.position.LEADER_WIDTH/2;
}
elem.x=elem.viewNode.x;
elem.ldrLoc="xLdrTop";
_cbdAddLeader(elem, target, eventPos);
elem.ldrOffSetY=11;
ldrDiv=document.getElementById(elem.leaderId);
ldrDiv.style.left=elem.x+vg.position.LEADER_OFFSET+"px";
elem.viewNode.x=elem.x;
}
};
vg.position._bottomRight=function(elem, target, eventPos)
{
elem.viewNode.x=target.x+target.w - elem.w;
elem.viewNode.y=target.y+target.h;
if(elem.hasLeader)
{
if(vg.position.MIN_LINK_WIDTH >=target.w)
{
elem.viewNode.x=elem.viewNode.x - target.w/2+vg.position.LEADER_OFFSET+vg.position.LEADER_WIDTH/2;
}
elem.x=elem.viewNode.x;
elem.ldrLoc="xLdrTop";
var ldrData=_cbdAddLeader(elem, target, eventPos);
elem.ldrOffSetY=11;
ldrDiv=document.getElementById(elem.leaderId);
ldrDiv.style.left=elem.x+elem.w - vg.position.LEADER_WIDTH - vg.position.LEADER_OFFSET+"px";
}
};
vg.position._upperLeft=function(elem, target, eventPos)
{
elem.viewNode.x=target.x - elem.w;
elem.viewNode.y=target.y;
if(elem.hasLeader)
{
elem.ldrLoc="xLdrRgt";
_cbdAddLeader(elem, target, eventPos);
elem.viewNode.y=target.y - vg.position.LEADER_OFFSET;
elem.ldrOffSetX=-1*vg.position.LEADER_HEIGHT;
}
};
vg.position._lowerLeft=function(elem, target, eventPos)
{
elem.viewNode.x=target.x - elem.w;
elem.viewNode.y=target.y;
if(elem.hasLeader)
{
elem.ldrLoc="xLdrRgt";
_cbdAddLeader(elem, target, eventPos);
elem.viewNode.y=target.y - elem.h+vg.position.LEADER_OFFSET+vg.position.LEADER_WIDTH;
elem.ldrOffSetX=-1*vg.position.LEADER_HEIGHT;
}
};
vg.position._upperRight=function(elem, target, eventPos)
{
elem.viewNode.x=target.x+target.w;
elem.viewNode.y=target.y;
if(elem.hasLeader)
{
elem.ldrLoc="xLdrLft";
_cbdAddLeader(elem, target, eventPos);
elem.viewNode.y=target.y - vg.position.LEADER_OFFSET;
elem.ldrOffSetX=vg.position.LEADER_HEIGHT;
}
};
vg.position._lowerRight=function(elem, target, eventPos)
{
elem.viewNode.x=target.x+target.w;
elem.viewNode.y=target.y;
if(elem.hasLeader)
{
elem.ldrLoc="xLdrLft";
_cbdAddLeader(elem, target, eventPos);
elem.viewNode.y=target.y - elem.h+vg.position.LEADER_OFFSET+vg.position.LEADER_WIDTH;
elem.ldrOffSetX=vg.position.LEADER_HEIGHT;
}
};
_cbdAddLeader=function(elem, target, eventPos)
{
_cbdCreateLeader(elem.id, elem.ldrLoc);
return vg.html.position({elementNode:elem.leaderId, targetNode:target.viewNode, dispLoc:elem.dispLoc, infobox:elem.infobox, eventPos:eventPos});
};
vg.position.positions={
AUTO:"auto",
TOP:"top",
RIGHT:"right",
LEFT:"left",
BOTTOM:"bottom",
TOP_LEFT:"topleft",
TOP_RIGHT:"topright",
BOTTOM_LEFT:"bottomleft",
UPPER_LEFT:"upperleft",
LOWER_LEFT:"lowerleft",
UPPER_RIGHT:"upperright",
LOWER_RIGHT:"lowerright",
FIXED_BOTTOM:"fixedbottom",
BOTTOM_RIGHT:"bottomright",
NE:"ne",
SE:"se",
SW:"sw",
NW:"nw"
};
vg.position.infobox={
MIN_WIDTH:vg.constants.COL_2_WIDTH,
MAX_WIDTH:vg.constants.COL_4_WIDTH,
MAX_ERR_WIDTH:vg.constants.COL_5_WIDTH
};
vg.position._enforceInfoBoxMaxWidth=function(elem)
{
"use strict";
var origWidth=elem.w,
infoBox=vg.position.infobox,
maxWidth=elem.isErrInfoBox?infoBox.MAX_ERR_WIDTH:infoBox.MAX_WIDTH;
elem.w=(origWidth > maxWidth)?maxWidth:origWidth;
};
vg.position._isPosHorizLeft=function(dispLoc)
{
"use strict";
var position=vg.position.positions;
return(dispLoc===position.LEFT||dispLoc===position.UPPER_LEFT||dispLoc===position.LOWER_LEFT );
};
vg.position._isPosVertLeft=function(dispLoc)
{
"use strict";
var position=vg.position.positions;
return(dispLoc===position.BOTTOM_RIGHT||dispLoc===position.TOP_RIGHT );
};
vg.position._isPositionedLeft=function(dispLoc)
{
"use strict";
return(vg.position._isPosHorizLeft(dispLoc)||vg.position._isPosVertLeft(dispLoc) );
};
vg.position._isPosHorizRight=function(dispLoc)
{
"use strict";
var position=vg.position.positions;
return(dispLoc===position.RIGHT||dispLoc===position.UPPER_RIGHT||dispLoc===position.LOWER_RIGHT );
};
vg.position._isPosVertRight=function(dispLoc)
{
"use strict";
var position=vg.position.positions;
return(dispLoc===position.BOTTOM_LEFT||dispLoc===position.TOP_LEFT );
};
vg.position._isPositionedRight=function(dispLoc)
{
"use strict";
return(vg.position._isPosHorizRight(dispLoc)||vg.position._isPosVertRight(dispLoc) );
};
vg.position._isPositionedTop=function(dispLoc)
{
"use strict";
var position=vg.position.positions;
return(dispLoc===position.TOP||dispLoc===position.TOP_LEFT||dispLoc===position.TOP_RIGHT );
};
vg.position._isPositionedBottom=function(dispLoc)
{
"use strict";
var position=vg.position.positions;
return(dispLoc===position.BOTTOM||dispLoc===position.BOTTOM_LEFT||dispLoc===position.BOTTOM_RIGHT );
};
vg.position._adjustInfoBoxWidthForViewport=function(elem, target)
{
"use strict";
var origWidth=elem.w,
dispLoc=elem.dispLoc,
position=vg.position,
minWidth=position.infobox.MIN_WIDTH,
horizPxAvail=position._getAvailHorizSpace(elem, target, dispLoc),
leftPxAvail=horizPxAvail.left,
rightPxAvail=horizPxAvail.right,
isAuto=(dispLoc===position.positions.AUTO ),
isLeft=position._isPositionedLeft(dispLoc),
isRight=position._isPositionedRight(dispLoc),
spaceOnLeft=(leftPxAvail  >=origWidth ),
spaceOnRight=(rightPxAvail >=origWidth ),
spaceOnLeftMin=(leftPxAvail  >=minWidth ),
spaceOnRightMin=(rightPxAvail >=minWidth ),
hasHorizSpace=(spaceOnLeft||spaceOnRight ),
newWidth,
posAboveBelow,
centerPositionWidth,
halfTargetWidth,
leftPxAvailForCenterPosWidth,
rightPxAvailForCenterPosWidth;
if((isLeft&&spaceOnLeft )||(isRight&&spaceOnRight )||(isAuto&&hasHorizSpace ) )
{
newWidth=origWidth;
}
else if((isLeft&&!spaceOnLeft )&&(spaceOnLeftMin ) )
{
newWidth=leftPxAvail;
}
else if((isRight&&!spaceOnRight )&&(spaceOnRightMin ) )
{
newWidth=rightPxAvail;
}
else if(isAuto )
{
if(rightPxAvail >=leftPxAvail )
{
newWidth=rightPxAvail;
}
else
{
newWidth=leftPxAvail;
}
vg.html.setWidth(elem.viewNode, newWidth+"px");
vg.html._setDimensions(elem);
posAboveBelow=vg.position._getVerticalSpace(elem, target);
if(!(posAboveBelow.positionAbove||posAboveBelow.positionBelow))
{
halfTargetWidth=target.w/2;
leftPxAvailForCenterPosWidth=leftPxAvail - halfTargetWidth;
rightPxAvailForCenterPosWidth=rightPxAvail - halfTargetWidth;
centerPositionWidth=(leftPxAvailForCenterPosWidth < rightPxAvailForCenterPosWidth)?
leftPxAvailForCenterPosWidth*2:rightPxAvailForCenterPosWidth*2;
if(centerPositionWidth < minWidth )
{
centerPositionWidth=minWidth;
}
else if(vg.position.infobox.MAX_WIDTH < centerPositionWidth )
{
centerPositionWidth=vg.position.infobox.MAX_WIDTH;
}
elem.w=centerPositionWidth;
vg.html.setWidth(elem.viewNode, elem.w+"px");
vg.html._setDimensions(elem);
posAboveBelow=vg.position._getVerticalSpace(elem, target);
if(posAboveBelow.positionAbove||posAboveBelow.positionBelow)
{
newWidth=centerPositionWidth;
}
}
}
else
{
newWidth=origWidth;
}
elem.w=newWidth;
};
vg.position._updateDispLocForViewport=function(elem, target)
{
"use strict";
var dispLoc=elem.dispLoc,
iBoxWidth=elem.w,
position=vg.position,
minWidth=position.infobox.MIN_WIDTH,
isLeft=position._isPositionedLeft(dispLoc),
isRight=position._isPositionedRight(dispLoc),
isTop=position._isPositionedTop(dispLoc),
isBottom=position._isPositionedBottom(dispLoc),
horizPxAvail=position._getAvailHorizSpace(elem, target, dispLoc),
leftPxAvail=horizPxAvail.left,
rightPxAvail=horizPxAvail.right,
spaceOnLeft=(leftPxAvail  >=iBoxWidth )||(leftPxAvail  >=minWidth ),
spaceOnRight=(rightPxAvail >=iBoxWidth )||(rightPxAvail >=minWidth ),
verticalData=position._getVerticalSpace(elem, target),
spaceAbove=verticalData.positionAbove,
spaceBelow=verticalData.positionBelow;
if((isLeft&&!spaceOnLeft )||(isRight&&!spaceOnRight )||(isTop&&!spaceAbove )||(isBottom&&!spaceBelow ) )
{
dispLoc=position.positions.AUTO;
}
elem.dispLoc=dispLoc;
};
vg.position._adjustNgInfoBoxes=function(elem, target)
{
"use strict";
vg.position._enforceInfoBoxMaxWidth(elem);
vg.position._updateDispLocForViewport(elem, target);
vg.position._adjustInfoBoxWidthForViewport(elem, target);
vg.html.setWidth(elem.viewNode, elem.w+"px");
vg.html._setDimensions(elem);
};
vg.position._isValidDispLoc=function(dispLoc)
{
"use strict";
var position=vg.position.positions;
switch(dispLoc)
{
case position.AUTO:
case position.TOP:
case position.RIGHT:
case position.LEFT:
case position.BOTTOM:
case position.TOP_LEFT:
case position.TOP_RIGHT:
case position.BOTTOM_LEFT:
case position.UPPER_LEFT:
case position.LOWER_LEFT:
case position.UPPER_RIGHT:
case position.LOWER_RIGHT:
case position.FIXED_BOTTOM:
case position.BOTTOM_RIGHT:
case position.NE:
case position.SE:
case position.SW:
case position.NW:
return true;
break;
}
return false;
};
vg.position._getNextGen12GridMarginSize=function(screenWidth, scrollLeft)
{
"use strict";
var totalScreenWidth=scrollLeft+screenWidth,
mainDivWidth=vg.constants.GRID_MAIN_WIDTH,
mainDivLeft=document.getElementById("main").offsetLeft,
mainDivRight=mainDivLeft+mainDivWidth,
mainDivMarginVisible=screenWidth > mainDivWidth,
mainDivMarginLeftVisible=mainDivMarginVisible&&(mainDivLeft > scrollLeft ),
mainDivMarginRightVisible=mainDivMarginVisible&&(mainDivRight < totalScreenWidth ),
mainDivMarginLeftPixels=mainDivMarginLeftVisible?mainDivLeft:0,
mainDivMarginRightPixels=mainDivMarginRightVisible?(totalScreenWidth - mainDivRight ):0,
mainDivMarginPixels={left:mainDivMarginLeftPixels, right:mainDivMarginRightPixels};
return mainDivMarginPixels;
};
vg.position._getAvailHorizSpace=function(elem, target, dispLoc)
{
"use strict";
var isInfoBox=elem.infobox&&(elem.id.indexOf("ldr_")!==0 ),
scrollLeft=_cbdGetScrollLeft(),
screenWidth=vg.window.getAvailableScreenWidth(),
isLeft=vg.position._isPosHorizLeft(dispLoc),
isRight=vg.position._isPosHorizRight(dispLoc),
isLorR=isInfoBox&&(isLeft||isRight ),
ldrOffset=isLorR?vg.position.LEADER_HEIGHT:0,
targetOffsetLft=isLorR?0:target.w,
targetOffsetRgt=isLorR?(-1*(target.w+ldrOffset ) ):target.w,
leftPxAvail=(target.x - scrollLeft - ldrOffset )+targetOffsetLft,
rightPxAvail=(screenWidth - leftPxAvail - ldrOffset )+targetOffsetRgt,
mainDivMarginSize;
if(cbd.page.isNextGen)
{
mainDivMarginSize=vg.position._getNextGen12GridMarginSize(screenWidth, scrollLeft);
leftPxAvail  -=mainDivMarginSize.left;
rightPxAvail -=mainDivMarginSize.right;
}
return{left:leftPxAvail, right:rightPxAvail};
};
vg.position._getVerticalSpace=function(elem, target)
{
"use strict";
var spaceAboveTrigger=target.y_body - _cbdGetBodyScrollTop(),
spaceBelowTrigger=vg.window.getAvailableScreenHeight() -(spaceAboveTrigger+target.h),
viewNode=elem.viewNode,
jsController=viewNode.jsController,
heightOfDisplayObj,
positionAbove,
positionBelow;
if(viewNode&&
jsController&&
(typeof jsController.initHeight!=='undefined')&&
(jsController.initHeight!==null)&&
(jsController.initHeight!=='undefined')
)
{
heightOfDisplayObj=jsController.initHeight;
}
else
{
heightOfDisplayObj=elem.h;
}
if(elem.hasLeader)
{
heightOfDisplayObj=heightOfDisplayObj+26;
}
positionAbove=(spaceAboveTrigger >=heightOfDisplayObj );
positionBelow=(spaceBelowTrigger >=heightOfDisplayObj );
return{positionAbove:positionAbove, positionBelow:positionBelow};
};
vg.position._getVertDispLoc=function(elem, target, defaultTop)
{
"use strict";
var verticalData=vg.position._getVerticalSpace(elem, target),
positionAbove=verticalData.positionAbove,
positionBelow=verticalData.positionBelow,
position=vg.position.positions,
bottomPos=position.BOTTOM,
topPos=position.TOP,
dispLoc;
if(elem.isErrInfoBox)
{
dispLoc=positionBelow?bottomPos:topPos;
}
else
{
if((defaultTop&&(positionAbove||!positionBelow))||(positionAbove&&!positionBelow))
{
dispLoc=topPos;
}
else
{
dispLoc=bottomPos;
}
}
return dispLoc;
};
vg.position._getFinalDispLoc=function(elem, target, dispLoc, horizPos)
{
"use strict";
var horizPxAvail=vg.position._getAvailHorizSpace(elem, target, dispLoc),
spaceOnLeft=horizPxAvail.left >=elem.w,
spaceOnRight=horizPxAvail.right >=elem.w,
position=vg.position.positions,
leftPos=position.LEFT,
rightPos=position.RIGHT,
spaceRightOfTarget=horizPxAvail.left - target.w/2,
spaceLeftOfTarget=horizPxAvail.right - target.w/2,
isInfoBox=elem.infobox&&(elem.id.indexOf("ldr_")!==0 );
if(spaceOnLeft&&spaceOnRight&&horizPos )
{
dispLoc=dispLoc+horizPos;
}
else if(spaceOnRight )
{
dispLoc=dispLoc+leftPos;
}
else if(spaceOnLeft )
{
dispLoc=dispLoc+rightPos;
}
else if(!(isInfoBox&&(spaceRightOfTarget >=elem.w/2&&spaceLeftOfTarget >=elem.w/2)))
{
dispLoc=dispLoc+leftPos;
}
return dispLoc;
};
vg.position._auto=function(params)
{
"use strict";
var elem=params.elem,
horizPos=params.horizPos,
target=params.target,
defaultTop=params.defaultTop,
dispLoc=null;
dispLoc=vg.position._getVertDispLoc(elem, target, defaultTop);
dispLoc=vg.position._getFinalDispLoc(elem, target, dispLoc, horizPos);
elem.dispLoc=dispLoc;
return dispLoc;
};
vg.html.isAncestor=function(container, node)
{
return cbd.getYUI().DOM.contains(container,node);
};
vg.html._isAncestorOfRelativeContainer=function(container, node)
{
'use strict';
return(container&&
cbdcommon.util.getComputedStylePropertyValue(container, "position")==="relative"&&
vg.html.isAncestor(container,node)
);
};
vg.html.toggleCheckBoxInputs=function(aParentContainerId, checked, enabledOnly)
{
var e=document.getElementById(aParentContainerId);
if(e)
{
var aInputArray=e.getElementsByTagName('input');
if(aInputArray)
{
var len=aInputArray.length,
i;
for(i=0;i < len;i++)
{
var aInput=aInputArray[i];
if(aInput&&aInput.type==="checkbox")
{
if(enabledOnly&&aInput.disabled)
{
continue;
}
else
{
aInput.checked=checked;
}
}
}
}
}
};
vg.html.isElement=function(node)
{
return node.nodeType==vg.html.ELEMENT_NODE;
};
vg.html._setDimensions=function(obj)
{
var objXY=cbd.getYUI().one(obj.viewNode).getXY(),
prop=vg.html.getObjSize(obj.viewNode, obj.isErrInfoBox);
obj.x=Math.round(objXY[0]);
obj.y=Math.round(objXY[1]);
obj.y_body=obj.y;
obj.h=prop.h;
obj.w=prop.w;
};
vg.html.getXMLNodeText=function(xmlNode)
{
var text="";
if(ieQuirksMode){
text=xmlNode.text;
}
else{
text=xmlNode.textContent;
}
return text;
};
vg.html.disableRightClickMenu=function(obj)
{
obj.oncontextmenu=function(){return false};
};
(function()
{
var	hasOffsetRectInsteadOfClientRectBug,
getRectPosition=function(rectangle)
{
var scrollLeft=window._cbdGetScrollLeft(),
scrollTop=window._cbdGetScrollTop(),
rectPos={
top:rectangle.top,
right:rectangle.right,
bottom:rectangle.bottom,
left:rectangle.left,
height:rectangle.height,
width:rectangle.width
},
bodyRect;
if(hasOffsetRectInsteadOfClientRectBug===undefined&&!ieQuirksMode )
{
if(scrollTop > 0)
{
bodyRect=document.getElementsByTagName("body")[0].getClientRects();
hasOffsetRectInsteadOfClientRectBug=(bodyRect&&bodyRect[0].top===0);
}
else if(scrollLeft > 0)
{
bodyRect=document.getElementsByTagName("body")[0].getClientRects();
hasOffsetRectInsteadOfClientRectBug=(bodyRect&&bodyRect[0].left===0);
}
}
if(hasOffsetRectInsteadOfClientRectBug)
{
rectPos.top -=scrollTop;
rectPos.right -=scrollLeft;
rectPos.bottom -=scrollTop;
rectPos.left -=scrollLeft;
}
return rectPos;
};
vg.html._getWrappingInfoBoxTargetDimensions=function(target, targetNode, eventPos)
{
var	targetNodeRects=targetNode.getClientRects(),
numberOfRects=targetNodeRects.length,
i,
pageX=0,
pageY=0,
eventPos,
targetRect,
scrollTop=_cbdGetScrollTop(),
scrollLeft=_cbdGetScrollLeft(),
targetScrollTop=(ieQuirksMode&&CBD_FLOATING_HEAD)?0:scrollTop;
if(targetNode.nodeName.toLowerCase()==='a'&&targetNodeRects!==null&&numberOfRects > 1)
{
if(eventPos.x&&eventPos.y)
{
pageX=eventPos.x - scrollLeft;
pageY=eventPos.y - scrollTop;
}
targetRect=getRectPosition(targetNodeRects[0]);
for(i=0;i < numberOfRects;i++)
{
rect=getRectPosition(targetNodeRects[i]);
if((pageX >=rect.left&&pageX <=rect.right)&&(pageY <=rect.bottom&&pageY >=rect.top))
{
targetRect=rect;
break;
}
}
target.x=targetRect.left+scrollLeft;
target.y=targetRect.top+targetScrollTop;
target.y_body=target.y;
target.h=(typeof targetRect.height==='undefined')?targetRect.bottom - targetRect.top:targetRect.height;
target.w=(typeof targetRect.width==='undefined')?targetRect.right - targetRect.left:targetRect.width;
}
};
}());
vg.html.position=function(elementNode, targetNode, dispLoc, infobox, leader, horzPos, eventPos)
{
"use strict";
var globalInfoBox,
parent,
newDiv,
cssContainer,
cssContainerClass,
target={},
elem={},
elemViewNode,
dpData={},
ances,
isLeader,
isNextGen=cbd.page.isNextGen,
isNgInfoBox,
isInfoBoxNotLdr,
position=vg.position.positions,
autoPos=position.AUTO,
mainDiv;
if(elementNode.elementNode)
{
targetNode=elementNode.targetNode;
dispLoc=elementNode.dispLoc;
infobox=elementNode.infobox;
leader=elementNode.leader;
horzPos=elementNode.horzPos;
eventPos=elementNode.eventPos;
elementNode=elementNode.elementNode;
}
infobox=infobox||false;
dispLoc=dispLoc?dispLoc.toLowerCase():autoPos;
dispLoc=vg.position._isValidDispLoc(dispLoc)?dispLoc:autoPos;
if(infobox)
{
globalInfoBox=vg.html.getElement(CBD_GLOBAL_INFO_BOX);
parent=globalInfoBox.parentNode;
if(!parent.getAttribute(CBD_DYNAMIC_CSS))
{
newDiv=document.createElement("div");
newDiv.setAttribute('id',CBD_DYNAMIC_CSS_ID);
newDiv.setAttribute(CBD_DYNAMIC_CSS,'true');
parent.removeChild(globalInfoBox);
newDiv.appendChild(globalInfoBox);
parent.appendChild(newDiv);
parent=newDiv;
}
vg.html._getWrappingInfoBoxTargetDimensions(target, targetNode, eventPos);
cssContainer=vg.html._cbdGetCSSContainer(targetNode);
cssContainerClass=cssContainer.className.replace('vg0','');
vg.html.setStyle(cssContainerClass, parent);
}
target.viewNode=vg.html.getElement(targetNode);
if(typeof target.x==="undefined"||typeof target.y==="undefined"||typeof target.w==="undefined"||typeof target.h==="undefined")
{
vg.html._setDimensions(target);
}
elemViewNode=vg.html.getElement(elementNode);
if(!cbd.page.isResponsiveCapable)
{
target.y+=_cbdGetScrollOffset(elemViewNode);
target.x+=_cbdGetScrollOffsetLeft(elemViewNode);
}
elem.viewNode=elemViewNode;
elem.id=elem.viewNode.getAttribute('id');
elem.dispLoc=dispLoc;
elem.hasLeader=leader;
elem.leaderId=null;
elem.infobox=infobox;
elem.isErrInfoBox=(elem.id===FORM_FIELD_INFO);
isLeader=(elem.id.indexOf("ldr_")===0);
isInfoBoxNotLdr=(infobox&&!isLeader);
isNgInfoBox=(isNextGen&&isInfoBoxNotLdr);
if(isInfoBoxNotLdr)
{
vg.html.setLeft(elem.viewNode, 0);
vg.html.setObjTop(elem.viewNode, 0);
if(elem.isErrInfoBox)
{
vg.html.setWidth(elem.viewNode, autoPos);
}
}
vg.html._setDimensions(elem);
if(elem.hasLeader)
{
elem.leaderId="ldr_"+elem.id;
elem.ldrOffSetY=0;
elem.ldrOffSetX=0;
}
if(isNgInfoBox)
{
vg.position._adjustNgInfoBoxes(elem, target);
dispLoc=elem.dispLoc;
}
if(dispLoc===autoPos)
{
dispLoc=vg.position._auto({
elem:elem,
horizPos:horzPos,
target:target,
defaultTop:infobox
});
}
dpData.elem=elem;
dpData.target=target;
switch(dispLoc)
{
case position.TOP:
vg.position._top(elem, target, eventPos);
break;
case position.RIGHT:
vg.position._right(elem, target, eventPos);
break;
case position.LEFT:
vg.position._left(elem, target, eventPos);
break;
case position.BOTTOM:
vg.position._bottom(elem, target, eventPos);
break;
case position.TOP_LEFT:
vg.position._topLeft(elem, target, eventPos);
break;
case position.TOP_RIGHT:
vg.position._topRight(elem, target, eventPos);
break;
case position.BOTTOM_LEFT:
vg.position._bottomLeft(elem, target, eventPos);
break;
case position.UPPER_LEFT:
vg.position._upperLeft(elem, target, eventPos);
break;
case position.LOWER_LEFT:
vg.position._lowerLeft(elem, target, eventPos);
break;
case position.UPPER_RIGHT:
vg.position._upperRight(elem, target, eventPos);
break;
case position.LOWER_RIGHT:
vg.position._lowerRight(elem, target, eventPos);
break;
case position.FIXED_BOTTOM:
vg.position._fixedBottom(elem, target, eventPos);
break;
case position.BOTTOM_RIGHT:
vg.position._bottomRight(elem, target, eventPos);
break;
case position.NE:
vg.position._ne(elem, target);
break;
case position.SE:
vg.position._se(elem, target);
break;
case position.SW:
vg.position._sw(elem, target);
break;
case position.NW:
vg.position._nw(elem, target);
break;
}
elem.viewNode.style.position="absolute";
elem.x=parseInt(elem.viewNode.x, 10);
elem.y=parseInt(elem.viewNode.y, 10);
elem.ldrOffSetX=dpData.elem.ldrOffSetX;
elem.ldrOffSetY=dpData.elem.ldrOffSetY;
if(!isNaN(elem.ldrOffSetX))
{
elem.x+=elem.ldrOffSetX;
}
if(!isNaN(elem.ldrOffSetY))
{
elem.y+=elem.ldrOffSetY;
}
mainDiv=document.getElementById("main");
if(vg.html._isAncestorOfRelativeContainer(mainDiv, elemViewNode))
{
elem.y -=vg.html.getObjY(mainDiv, false);
}
if(position.FIXED_BOTTOM!==dispLoc.toLowerCase())
{
vg.html.setLeft(elem.viewNode, elem.x);
vg.html.setObjTop(elem.viewNode, elem.y);
}
dpData.elem.dispLoc=dispLoc;
dpData.elem=elem;
dpData.target=target;
return dpData;
};
vg.html.getNodeText=function(node)
{
var ret='';
for(var i=0;i < node.childNodes.length;i++)
{
if(node.childNodes[i].nodeType==3)
{
ret+=node.childNodes[i].nodeValue+' ';
}
}
return ret;
}
vg.html.getFirstChild=function(node)
{
var chNode=(vg.html.getElement(node)!=null)?vg.html.getElement(node).firstChild:null;
while(chNode!=null&&(chNode.nodeType!=1||chNode.tagName.toLowerCase()=='script' ) )
{
chNode=chNode.nextSibling;
}
return chNode;
}
vg.html.getFormElements=function(form)
{
var formElements=new Array();
vg.util.concat(formElements, form.getElementsByTagName('input'));
vg.util.concat(formElements, form.getElementsByTagName('select'));
vg.util.concat(formElements, form.getElementsByTagName('textarea'));
return formElements;
}
vg.html.addEventListenerMethod=function(node, eventType, obj, method, listenerId, filter, cfg, suppressMouseEventConversion, useYuiEvent )
{
vg.html.addEventListener(node, eventType,
function _callListenerMethod()
{
var args=Array.prototype.slice.call(arguments );
obj[method].apply(obj, args );
},
listenerId, filter, cfg, suppressMouseEventConversion, useYuiEvent );
};
vg.html.addEventListener=function(node, eventType, func, listenerId, filter, cfg, suppressMouseEventConversion, useYuiEvent)
{
'use strict';
var yuiNode=false;
node=vg.html.getElement(node);
if(listenerId!=null)
{
listenerId=vg.html._adjustListenerId(listenerId);
if(node&&(node!=window))
{
if(node[listenerId]!=null)
{
return;
}
else
{
node[listenerId]={eventType:eventType, func:func};
}
}
else
{
if(window.document[listenerId]!=null)
{
return;
}
else
{
window.document[listenerId]={eventType:eventType, func:func};
}
}
}
if(node)
{
if(!node.eventCounter)
{
node.eventCounter={};
}
if(node.eventCounter[eventType])
{
node.eventCounter[eventType]++;
}
else
{
node.eventCounter[eventType]=1;
}
}
if(eventType.indexOf('CBD_') >=0||eventType.indexOf('cbd-') >=0)
{
vg.html._addCustomEventListener(node, eventType, func, filter, cfg);
}
else if(node)
{
eventType=vg.html.getEventName(eventType, false, suppressMouseEventConversion);
if(useYuiEvent )
{
yuiNode=cbd.getYUI().one(node );
}
if(yuiNode )
{
yuiNode.on(eventType, func);
}
else
{
if(node.addEventListener)
{
node.addEventListener(eventType, func, false);
}
else
{
if(cbd.isSuppressQuirksMode&&eventType.indexOf('on')==-1 )
{
eventType='on'+eventType;
}
node.attachEvent(eventType, func);
}
}
}
else if(console)
{
if(console.error)
{
console.error('Attempted to attach '+eventType+' listener to null object.');
}
if(console.trace)
{
console.trace();
}
}
};
vg.html.removeEventListener=function(node, eventType, func, listenerId, suppressMouseEventConversion, useYuiEvent)
{
var yuiNode=false;
if(eventType.indexOf('CBD_') >=0||eventType.indexOf('cbd-') >=0 )
{
vg.html._removeCustomEventListener(node, eventType, func);
}
else if(node )
{
eventType=vg.html.getEventName(eventType, false, suppressMouseEventConversion);
if(useYuiEvent )
{
yuiNode=cbd.getYUI().one(node );
}
if(yuiNode )
{
yuiNode.detach(eventType, func);
}
else
{
if(node.removeEventListener)
{
node.removeEventListener(eventType, func, false);
}
else if(node.detachEvent)
{
node.detachEvent(eventType, func);
}
}
}
if(listenerId!=null)
{
listenerId=vg.html._adjustListenerId(listenerId);
if(node&&(node!=window))
{
node[listenerId]=null;
}
else
{
window.document[listenerId]=null;
}
}
if(node)
{
if(node.eventCounter&&node.eventCounter[eventType]> 0)
{
node.eventCounter[eventType]--;
}
}
}
vg.html.removeEventListenerById=function(node, listenerId, suppressMouseEventConversion, useYuiEvent)
{
var listenerObj;
var listenerIdAdjusted=vg.html._adjustListenerId(listenerId);
if(node&&(node!=window))
{
listenerObj=node[listenerIdAdjusted];
}
else
{
listenerObj=window.document[listenerIdAdjusted];
}
if(!listenerObj)
{
return;
}
vg.html.removeEventListener(node, listenerObj.eventType, listenerObj.func, listenerId, suppressMouseEventConversion, useYuiEvent);
};
vg.html._adjustListenerId=function(listenerId)
{
listenerId+='_listener';
listenerId=listenerId.replace(/:/g, '_');
return listenerId;
}
vg.html.hasEventListeners=function(node, eventType)
{
return(node.eventCounter!=null&&
node.eventCounter[eventType]!=null&&
node.eventCounter[eventType]> 0);
};
vg.html.getEventName=function(eventName, omitOn, suppressMouseEventConversion)
{
if(!ie&&!suppressMouseEventConversion )
{
if(eventName==='mouseenter')
{
eventName='mouseover';
}
else if(eventName==='mouseleave')
{
eventName='mouseout';
}
}
return ieQuirksMode&&!omitOn?'on'+eventName:eventName;
};
vg.html._addCustomEventListener=function(node, eventType, func, filter, cfg)
{
var event=null,
globalEvent=vg.event.CUSTOM_EVENTS[eventType];
if(globalEvent==null)
{
globalEvent=vg.html._createCustomEvent(eventType);
vg.event.CUSTOM_EVENTS[eventType]=globalEvent;
}
if(filter)
{
func.filter=filter;
}
if(cfg)
{
func.cfg=cfg;
}
if(node )
{
if(vg.event.CUSTOM_EVENTS[eventType].nodeListeners)
{
vg.event.CUSTOM_EVENTS[eventType].nodeListeners++;
}
else
{
vg.event.CUSTOM_EVENTS[eventType].nodeListeners=1;
}
if(!node.cbdCustomEvents )
{
node.cbdCustomEvents={};
}
event=node.cbdCustomEvents[eventType];
if(event==null )
{
event=vg.html._createCustomEvent(eventType, node);
node.cbdCustomEvents[eventType]=event;
}
}
vg.html._subscribe(eventType, event, node, func);
};
vg.html._subscribe=function(eventType, event, node, func)
{
var YUI=cbd.getYUI();
if(node)
{
if(eventType.indexOf("CBD_SYNTH_") >=0)
{
event.subscribe(func);
}
else if(node==window)
{
YUI.Global.on(eventType, func);
}
else
{
YUI.one(node).on(eventType, func);
}
}
else
{
YUI.Global.on(eventType, func);
}
}
vg.html._removeCustomEventListener=function(node, eventType, func)
{
var event, YUI=cbd.getYUI();
var globalEvent=vg.event.CUSTOM_EVENTS[eventType];
if(globalEvent )
{
if(node&&node.cbdCustomEvents&&node.cbdCustomEvents[eventType])
{
if(globalEvent.nodeListeners > 0)
{
globalEvent.nodeListeners--;
}
event=node.cbdCustomEvents[eventType];
if(event&&eventType.indexOf("CBD_SYNTH_") >=0)
{
event.unsubscribe(func);
}
else if(node===window)
{
YUI.Global.detach(eventType, func);
}
else
{
YUI.one(node).detach(eventType, func);
}
}
else
{
YUI.Global.detach(eventType, func);
}
}
};
vg.html._createCustomEvent=function(eventType, node)
{
if(eventType.indexOf("CBD_SYNTH_") >=0)
{
return new vg.event.SyntheticEvent(eventType, node);
}
var YUI=cbd.getYUI();
return new YUI.CustomEvent(eventType);
}
vg.html._fireCustomEvent=function(eventType, targetElement, eventData, skipGlobal )
{
targetElement=vg.html.getElement(targetElement );
var YUI=cbd.getYUI();
var nodeEvent=null;
if(targetElement
&&targetElement.cbdCustomEvents
&&targetElement.cbdCustomEvents[eventType])
{
nodeEvent=targetElement.cbdCustomEvents[eventType];
}
if(eventData==null)
{
eventData={};
}
eventData.targetElement=targetElement;
if(nodeEvent )
{
cbd.getYUI().one(targetElement).fire(eventType, eventData);
}
var globalEvent=vg.event.CUSTOM_EVENTS[eventType];
if(targetElement&&targetElement!=window&&
globalEvent&&globalEvent.nodeListeners!=null&&globalEvent.nodeListeners > 0 )
{
var parentContainer=vg.html.findAncestor(targetElement,{}, vg.comp._isContainer );
if(parentContainer )
{
vg.html._fireCustomEvent(eventType, parentContainer, eventData, true );
}
}
if(globalEvent&&!skipGlobal)
{
if(!eventData) eventData={};
eventData.global=true;
cbd.getYUI().Global.fire(eventType, eventData);
}
}
vg.html.setDisabledAttr=function(node, value)
{
(ie)?node.disabled=value:node.setAttribute('disabled', value);
}
vg.html.getDisabledAttr=function(node)
{
return String((ie)?node.disabled:node.getAttribute('disabled'));
}
vg.html.disableTextSelect=function(node)
{
(ie)?node.onselectstart=function(){return false;}:node.style.MozUserSelect="none";
}
vg.html.getReadOnlyAttr=function(elem)
{
elem=vg.html.getElement(elem);
return elem.getAttribute('readonly');
}
vg.html.setStyle=function(className, node )
{
node.className=className;
}
vg.html.addStyle=function(className, node)
{
jsCBDaddStyle(node, className);
}
vg.html.removeStyle=function(className, node)
{
jsCBDdeleteStyle(node, className);
}
vg.html.hasStyle=function(classname, node )
{
if(node.className)
{
var arr=node.className.split(" " );
for(var i=0;i < arr.length;i++)
{
if(arr[i]==classname )
{
return true;
}
}
}
return false;
}
vg.html.hasFocus=function(node)
{
return document.activeElement==node;
}
vg.html.listStyles=function(node )
{
return node.className.split(" " );
}
vg.html.addOrRemoveStyle=function(className, node, add)
{
(add)?jsCBDaddStyle(node, className):jsCBDdeleteStyle(node, className);
}
vg.html.addOrRemoveStyleFromNodes=function(className, nodes, add)
{
for(var i=0;i < nodes.length;i++)
{
vg.html.addOrRemoveStyle(className, nodes[i], add);
}
}
vg.html.replaceClass=function(node, oldClass, newClass)
{
jsCBDdeleteStyle(node, oldClass);
jsCBDaddStyle(node, newClass);
}
vg.html.replaceClassOnNodes=function(nodes, oldClass, newClass)
{
for(var i=0;i < nodes.length;i++)
{
vg.html.replaceClass(nodes[i], oldClass, newClass);
}
}
vg.html.setCursorStyle=function(elem, style)
{
elem.style.cursor=style;
}
vg.html.setPadding=function(node, padding)
{
node.style.padding=padding;
}
vg.html.setHeight=function(node, height)
{
node.style.height=height;
}
vg.html.setWidth=function(node, width)
{
node.style.width=width;
}
vg.html.setLeft=function(node, left)
{
node.style.left=left+"px";
}
vg.html.setOpacity=function(node, opacity, adjustZoom)
{
if(typeof adjustZoom=="undefined")
{
adjustZoom=false;
}
if(node.style.opacity===undefined)
{
if(!node.currentStyle.hasLayout)
{
node.style.zoom="1";
}
if(adjustZoom){node.style.zoom="0.9999";}
if(opacity!=null)
{
opacity=parseFloat(opacity)*100;
node.style.filter='alpha(opacity='+opacity+')';
}
else
{
node.style.filter=null;
}
}
else
{
node.style.opacity=opacity;
}
}
vg.html.getObjPadding=function(obj)
{
var domElement=vg.html.getElement(obj );
var pad={};
pad.left=parseInt(jsCBDGetComputedStylePropertyValue(domElement, "padding-left"));
pad.right=parseInt(jsCBDGetComputedStylePropertyValue(domElement, "padding-right"));
pad.top=parseInt(jsCBDGetComputedStylePropertyValue(domElement, "padding-top"));
pad.bottom=parseInt(jsCBDGetComputedStylePropertyValue(domElement, "padding-bottom"));
return pad;
}
vg.html.getObjHeight=function(obj, displayType)
{
var obj2=vg.html.getElement(obj ),
isHidden=obj2.style.display=='none',
ret=0;
if(isHidden)
{
obj2.style.display=(typeof displayType==='undefined')?'inline':displayType;
ret=obj2.offsetHeight;
obj2.style.display='none';
}
else
{
ret=obj2.offsetHeight;
}
return ret;
};
vg.html.getWidthOfHiddenElem=function(object, fullWidth)
{
"use strict";
var element=vg.html.getElement(object),
originalPosition=element.style.position,
originalDisplay=element.style.display,
originalWidth=element.style.width,
originalTop=element.style.top,
originalLeft=element.style.left,
contentWidth;
element.style.position="relative";
vg.html.setObjTop(element, -5000);
vg.html.setLeft(element, -5000);
element.style.display="block";
if(fullWidth)
{
element.style.width="100%";
}
contentWidth=element.offsetWidth;
element.style.display=originalDisplay;
element.style.position=originalPosition;
element.style.top=originalTop;
element.style.left=originalLeft;
if(fullWidth)
{
element.style.width=originalWidth;
}
return contentWidth;
};
vg.html.getHeightOfHiddenElem=function(object, fullHeight)
{
"use strict";
var element=vg.html.getElement(object),
originalPosition=element.style.position,
originalDisplay=element.style.display,
originalHeight=element.style.height,
originalTop=element.style.top,
originalLeft=element.style.left,
contentHeight;
element.style.position="relative";
vg.html.setObjTop(element, -5000);
vg.html.setLeft(element, -5000);
element.style.display="block";
if(fullHeight)
{
element.style.height="100%";
}
contentHeight=element.offsetHeight;
element.style.display=originalDisplay;
element.style.position=originalPosition;
element.style.top=originalTop;
element.style.left=originalLeft;
if(fullHeight)
{
element.style.height=originalHeight;
}
return contentHeight;
};
vg.html.getSpanObjHeight=function(obj)
{
var spanElement=vg.html.getElement(obj),
displayProperty=spanElement.style.display,
inlineDisplayValue=displayProperty||'',
spanHeight=0;
if(ie )
{
displayProperty='inline';
}
else if(firefox )
{
displayProperty='block';
}
else
{
displayProperty='inline-block';
}
spanHeight=spanElement.offsetHeight;
displayProperty=inlineDisplayValue;
return spanHeight;
};
vg.html.getObjWidth=function(obj, useComputedStyle)
{
var obj2=vg.html.getElement(obj ),
isHidden=obj2.style.display=='none',
ret=0;
if(isHidden)
{
obj2.style.display='inline';
ret=obj2.offsetWidth;
obj2.style.display='none';
}
else if(useComputedStyle)
{
ret=Math.ceil(jsCBDGetComputedStylePropertyValue(obj2, 'width').replace('px',''));
ret=(isNaN(ret))?obj2.offsetWidth:ret;
}
else
{
ret=obj2.offsetWidth;
}
return ret;
};
vg.html.getObjClientWidth=function(obj)
{
var obj2=vg.html.getElement(obj );
var isHidden=obj2.style.display=='none';
var ret=0;
if(isHidden )
{
obj2.style.display='inline';
ret=obj2.clientWidth;
obj2.style.display='none';
}
else
{
ret=obj2.clientWidth;
}
return ret;
}
vg.html.getObjSizePosition=function(obj, useComputedStyleWidth)
{
var objData=new Array();
objData.x=vg.html.getObjX(obj);
objData.y=vg.html.getObjY(obj);
var objSize=vg.html.getObjSize(obj, useComputedStyleWidth);
objData.h=objSize.h;
objData.w=objSize.w;
return objData;
}
vg.comp.TEMP_VISIBLE_CLASS=TEMP_VISIBLE_CLASS="tempVisible";
vg.html.getObjSizeInHiddenAncestor=function(obj)
{
var objData={};
var currentNode=obj;
var currentNodeStyle;
var styleValueRegex=/none/;
while(currentNode.getAttribute("id")!="body")
{
currentNodeStyle=jsCBDGetComputedStylePropertyValue(currentNode, "display");
if(currentNodeStyle!=null)
{
if(styleValueRegex.test(currentNodeStyle))
{
vg.html.addStyle(vg.comp.TEMP_VISIBLE_CLASS, currentNode);
objData.h=vg.html.getObjHeight(obj);
objData.w=vg.html.getObjWidth(obj);
vg.html.removeStyle(vg.comp.TEMP_VISIBLE_CLASS, currentNode);
return objData;
}
}
currentNode=vg.html._getParentNode(currentNode);
}
return{};
}
vg.html.findFirstHiddenAncestor=function(obj)
{
var currentNode=obj,
currentNodeStyle,
styleValueRegex=/none/;
while(currentNode.getAttribute("id")!="body")
{
currentNodeStyle=jsCBDGetComputedStylePropertyValue(currentNode, "display");
if(currentNodeStyle!=null)
{
if(styleValueRegex.test(currentNodeStyle))
{
return currentNode;
}
}
currentNode=vg.html._getParentNode(currentNode);
}
return null;
}
vg.html.isFixedHeight=function(node)
{
var isFixedHeight=false;
var node2=vg.html.getElement(node);
var node2Style=node2.style;
var node2Height;
if(node2Style!=null)
{
node2Height=node2Style.height;
if(node2Height!=""&&node2Height!="100%"&&node2Height!="auto")
{
isFixedHeight=true;
}
}
return isFixedHeight;
}
vg.html.isFixedWidth=function(node)
{
var isFixedWidth=false;
node=vg.html.getElement(node);
var nodeStyle=node.style;
var nodeWidth;
if(nodeStyle!=null)
{
nodeWidth=nodeStyle.width;
if(nodeWidth!=""&&nodeWidth!="100%"&&nodeWidth!="auto")
{
isFixedWidth=true;
}
}
return isFixedWidth;
}
vg.html.getObjX=function(obj, yui )
{
if(yui)
{
return cbd.getYUI().DOM.getX(obj);
}
var x=0;
while(obj!=null )
{
x+=obj.offsetLeft;
obj=obj.offsetParent;
}
return x;
}
vg.html.getObjY=function(obj, yui)
{
if(yui)
{
return cbd.getYUI().DOM.getY(obj);
}
var y=0;
while(obj!=null )
{
y+=obj.offsetTop;
obj=obj.offsetParent;
}
return y;
}
vg.html.getObjXY=function(obj, outsideWrapDiv )
{
var yuiXYpos=cbd.getYUI().DOM.getXY(obj);
var posObj={x:yuiXYpos[0], y:yuiXYpos[1]};
if(ieQuirksMode&&!outsideWrapDiv )
{
var wrapDiv=document.getElementById(CBD_WRAP_DIV_ID);
if(wrapDiv )
{
posObj.y+=wrapDiv.scrollTop;
posObj.x+=wrapDiv.scrollLeft;
}
}
return posObj;
}
vg.html.findBoundary=function(node)
{
var boundaryLeft, boundaryRight, boundaryTop, boundaryBottom, width=0, height=0;
var offsetXY=vg.html.getObjXY(node);
width=node.offsetWidth;
height=node.offsetHeight;
boundaryLeft=offsetXY.x;
boundaryRight=boundaryLeft+width;
boundaryTop=offsetXY.y;
boundaryBottom=boundaryTop+height;
return{left:boundaryLeft, right:boundaryRight, top:boundaryTop, bottom:boundaryBottom};
}
vg.html.setObjTop=function(obj, value )
{
obj.style.top=value+"px";
}
vg.html.scrollToPosition=function(node,posX,posY)
{
var el=vg.html.getElement(node);
if(posX!=null) el.scrollLeft=parseInt(posX.toString().replace("px",""));
if(posY!=null) el.scrollTop=parseInt(posY.toString().replace("px",""));
}
vg.html.scrollIntoView=function(container, elem, elemHeight, elemY, amimate, scrollspeed)
{
var containerStartY=vg.html.getObjY(container)+container.scrollTop;
var containerHeight=container.scrollHeight;
var containerViewHeight=vg.html.getObjHeight(container);
var containerEndY=containerStartY+containerViewHeight;
if(elemHeight==null)
{
elemHeight=vg.html.getObjHeight(elem);
}
if(elemY==null)
{
elemY=vg.html.getObjY(elem);
}
var newScrollTop=container.scrollTop;
if(containerEndY < elemY+elemHeight)
{
newScrollTop=container.scrollTop+elemY - containerEndY+elemHeight;
}
else if(containerStartY > elemY - elemHeight)
{
newScrollTop=container.scrollTop -(containerStartY - elemY);
}
if(amimate)
{
var distance=Math.abs(newScrollTop - container.scrollTop);
var duration=1000;
var attributes={scroll:{to:[0, newScrollTop]}};
if(!scrollspeed) scrollspeed=3;
if(distance > 0&&scrollspeed > 0)
{
duration=Math.round(distance/scrollspeed);
}
if(container.anim)
{
container.anim.stop();
}
container.anim=vg.smil.animateElement({target:container, attr:attributes, duration:duration, scrollAnimation:true});
}
else
{
container.scrollTop=newScrollTop;
}
}
vg.html.scrollToElement=function(node, offset)
{
var pos=vg.html.getObjY(vg.html.getElement(node)) - offset;
vg.html.scrollPageVertical(pos);
}
vg.html.animateVerticalScrollToElement=function(options)
{
'use strict';
var target=options.node&&vg.html.getElement(options.node),
currentPosition=window.pageYOffset||document.body.scrollTop,
finalPosition=vg.html.getObjY(target) -(options.offset||0),
heightToScroll=Math.abs(finalPosition - currentPosition),
durationOfScroll=options.durationOfScroll||0.5,
upOrDown=finalPosition > currentPosition?1:-1,
FRAME_RATE=1000/60,
interval=parseFloat(heightToScroll/(durationOfScroll*1000)*FRAME_RATE),
id=setInterval(function(){
currentPosition+=upOrDown*interval;
if((upOrDown===-1&&currentPosition <=finalPosition)
||(upOrDown===1&&currentPosition >=finalPosition))
{
vg.html.scrollPageVertical(finalPosition);
clearInterval(id);
}
else
{
vg.html.scrollPageVertical(currentPosition);
}
}, FRAME_RATE);
};
vg.html._hasVerticalScrollBar=function(node)
{
return node.clientHeight < node.scrollHeight;
}
vg.html.getElement=function(target)
{
if(typeof(target)=="string")
{
return document.getElementById(target);
}
return target;
}
vg.html.findAncestor=function(node, oFilter, check, stopFilter)
{
return _cbdFindAncestor(node, oFilter, check, stopFilter);
}
vg.html.getSibling=function(node, oFilter, direction)
{
var siblingAccessor=(direction=="-"?'previousSibling':'nextSibling');
for(node=node[siblingAccessor];node!=null;node=node[siblingAccessor])
{
if(_cbdCheckNodeAttrs(node, oFilter))
{
return node;
}
}
return null;
}
vg.html.getSiblings=function(node, oFilter, direction)
{
var siblings=new Array();
var siblingAccessor=(direction=="-"?'previousSibling':'nextSibling');
for(node=node[siblingAccessor];node!=null;node=node[siblingAccessor])
{
if(_cbdCheckNodeAttrs(node, oFilter))
{
siblings.push(node);
}
}
return siblings;
}
vg.html.getElementsRec=function(ret, depth, context, oFilter, check, map )
{
if(!context||depth==0 )
{
return;
}
for(var i=0;i < context.childNodes.length;++i)
{
var node=context.childNodes[i];
if(!(node instanceof String ) )
{
var flag=true;
flag&=_cbdCheckNodeAttrs(node, oFilter );
if(flag&&check )
{
flag&=check(node );
}
if(flag )
{
if(map)
{
ret.push(map(node));
}
else
{
ret.push(node );
}
}
vg.html.getElementsRec(ret, depth - 1, node, oFilter, check, map );
}
}
}
vg.html.getElements=function(context, oFilter, check, map )
{
var elements=[],
tagName=oFilter.tagName,
elemsByClass,
node;
if(!tagName&&oFilter.attrName=='class'&&oFilter.attrValue)
{
if(context )
{
node=cbd.getYUI().one(context);
}
else
{
node=cbd.getYUI().one(document);
}
elemsByClass=node.all("."+oFilter.attrValue);
return elemsByClass.getDOMNodes();
}
if(!context )
{
return elements;
}
if(oFilter.maxDepth!==undefined&&oFilter.maxDepth > 0 )
{
var ret=[];
vg.html.getElementsRec(ret, oFilter.maxDepth, context, oFilter, check, map );
return ret;
}
var nodes=vg.util.toArray(context.getElementsByTagName(tagName));
var nodesLength=nodes.length;
oFilter.tagName=null;
for(var i=0;i < nodesLength;i++)
{
var node=nodes[i];
var flag=true;
flag&=_cbdCheckNodeAttrs(node, oFilter );
if(flag&&check )
{
flag&=check(node );
}
if(flag )
{
if(map)
{
elements.push(map(node));
}
else
{
elements.push(node );
}
}
}
return elements;
}
vg.html.getFirstElementMatch=function(context, check, ancestorCheck)
{
if(!context||!check)
{
return;
}
if(check(context))
{
return context;
}
else
{
var childNodes=vg.util.toArray(context.childNodes);
var numChildren=childNodes.length;
var node=null;
for(var i=0;i < numChildren;i++)
{
var child=childNodes[i];
if(vg.html.isElement(child)&&(!ancestorCheck||(ancestorCheck&&ancestorCheck(child))))
{
node=vg.html.getFirstElementMatch(child, check, ancestorCheck );
if(node)
{
return node;
}
}
}
}
return false;
}
vg.html.findParentComponent=function(context, type )
{
var ret=null;
var search=true;
var node=vg.html.getElement(context );
while(!ret&&search )
{
if(node )
{
var matches=node.jsController!==undefined;
if(type )
{
matches=matches&&node.jsController instanceof type;
}
if(matches )
{
ret=node;
}
else
{
node=vg.html._getParentNode(node);
}
}
else
{
search=false;
}
}
return ret;
}
vg.html._getParentNode=function(node)
{
var assocParentId=node.getAttribute?node.getAttribute("associatedParentId"):null;
return assocParentId?document.getElementById(assocParentId):node.parentNode;
}
vg.html.stopEventPropagation=function(event)
{
if(event.stopPropagation)
{
event.stopPropagation();
}
else if(ie)
{
event.cancelBubble=true;
}
}
vg.html.preventDefault=function(event)
{
if(event.preventDefault)
{
event.preventDefault();
}
else
{
event.returnValue=false;
}
}
vg.html.disableCopyPaste=function(event)
{
var event=jsCBDgetEvent(event);
var keyCode=event.keyCode;
if(event.ctrlKey&&(keyCode==67||keyCode==65||keyCode==86||keyCode==88 )||event.shiftKey&&keyCode==45)
{
vg.html.preventDefault(event);
}
}
vg.html.isElementInView=function(elem)
{
if(elem==null)
return false;
var yPos=vg.html.getObjSizePosition(elem).y;
var scrollTop=_cbdGetScrollTop();
var winHeight=jsCBDgetScreenHeight();
var yHeight=elem.offsetHeight;
return((scrollTop < yPos)&&(yPos+yHeight+30 < scrollTop+winHeight));
}
vg.html.getSelection=function(input)
{
var obj={start:null, end:null};
input=vg.html.getElement(input );
if(!input) return;
if(input.setSelectionRange)
{
obj.start=input.selectionStart;
obj.end=input.selectionEnd;
}
else if(input.createTextRange)
{
try
{
input.focus();
}
catch(err)
{
return obj;
}
var range=document.selection.createRange().duplicate();
var s=0;var e=0;
while(range.moveStart("character", -1)!=0 ) s++;
while(range.moveEnd("character", -1)!=0 ) e++;
obj.start=s;
obj.end=e;
}
return obj;
}
vg.html.setSelection=function(input, start, end)
{
input=vg.html.getElement(input );
if(!input||start==null||end==null) return;
if(input.setSelectionRange)
{
input.setSelectionRange(start, end);
}
else if(input.createTextRange)
{
var range=input.createTextRange();
range.collapse(true);
range.moveEnd('character', end);
range.moveStart('character', start);
range.select();
}
try
{
input.focus();
}
catch(err)
{
}
}
vg.html.getContainerInputs=function(context, ret)
{
if(context.childNodes.length  < 0)
{
return;
}
var name=context.nodeName;
if(vg.html.isInput(context))
{
ret.push(context );
}
else
{
for(var i=0;i < context.childNodes.length;++i)
{
if(vg.html.isInput(context))
{
ret.push(context );
return;
}
var node=context.childNodes[i];
vg.html.getContainerInputs(node, ret );
}
}
}
vg.html.isInput=function(context)
{
var name=context.nodeName;
if(context.type!='hidden'&&
!context.disabled&&
(name=='INPUT'||name=='SELECT'||name=='TEXTAREA'||name=='A' ))
{
return true;
}
return false;
}
vg.html.isTextInput=function(context)
{
var type=context.type;
if(type==null||type=='text'||type=='')
{
return true;
}
return false;
}
vg.html.isHiddenInput=function(context)
{
var tagName=context.tagName;
if(tagName&&tagName.toLowerCase()=="input"&&context.getAttribute("type")=="hidden")
{
return true;
}
return false;
}
vg.html.scrollPageVertical=function(yPos)
{
vg.html.scrollPage(null, yPos);
}
vg.html.scrollPage=function(xPos, yPos)
{
var wrapDiv=document.getElementById(CBD_WRAP_DIV_ID);
if(wrapDiv)
{
if(xPos)
{
wrapDiv.scrollLeft=xPos;
}
wrapDiv.scrollTop=yPos;
}
else
{
if(!xPos)
{
xPos=0;
}
window.scrollTo(xPos, yPos);
}
}
vg.html.getCompViewNode=function(node)
{
var containerNode=_cbdFindAncestor(node,{tagName:"span", attrName:"cmp", attrValue:"true"});
var viewNodeId=containerNode.id.replace("comp-","");
return  document.getElementById(viewNodeId);
}
vg.html.getCompSkin=function(node)
{
return vg.html._getComponentMataSpan(node, "skin");
}
vg.html.getCompType=function(node)
{
return vg.html._getComponentMataSpan(node, "type");
}
vg.html.getCompState=function(node)
{
return vg.html._getComponentMataSpan(node, "state");
}
vg.html._getComponentMataSpan=function(node, name)
{
return _cbdFindAncestor(node,{tagName:"span", attrName:"name", attrValue:name}, null,{tagName:"span", attrName:"cmp", attrValue:"true"});
}
vg.conf=function()
{
this.options={};
this.optionNames=[];
}
vg.conf.prototype.add=function(name, value )
{
if(!this.options[name])
{
this.optionNames.push(name );
}
this.options[name]=value;
return this;
}
vg.conf.prototype.setOptions=function(obj )
{
for(var i=0;i < this.optionNames.length;i++)
{
var name=this.optionNames[i];
obj[name]=this.options[name];
}
}
vg.util.toArray=function(items)
{
try{
return Array.prototype.slice.call(items);
}catch(ex){
var i=0,
len=items.length,
result=Array(len);
while(i<len){
result[i]=items[i];
i++;
}
}
return result;
}
vg.util._removeIEfilterProp=function(element)
{
if(ie)
{
element.style.removeAttribute('filter');
}
}
vg.util.loadJavaScriptFile=function(file, contentDomain)
{
var filePath=file+plsVersionQueryStr;
if(contentDomain)
{
var contDomain=(cbd.page_cbdContentDomain)?cbd.page_cbdContentDomain:jsContDomain;
filePath=contDomain+filePath;
}
jsCBDloadScript(filePath);
}
vg.util.getMousePos=function(e)
{
var mouse={};
mouse.x=e.clientX+_cbdGetScrollLeft();
mouse.y=e.clientY+_cbdGetScrollTop();
return mouse;
}
vg.util.getMousePosRelativeToElem=function(ev, elem)
{
var elemPos=vg.html.getObjXY(elem);
var mousePos=vg.util.getMousePos(ev);
mousePos.x -=elemPos.x;
mousePos.y -=elemPos.y;
return mousePos;
}
vg.util.testNSFunc=function(){
_debug("log", "Hosting-App vg object");
}
vg.util.setTimeout=function(func, timeDelay){
vg.delayedEvents++;
return setTimeout(function(){vg.util.execFunc(func);vg.delayedEvents--;}, timeDelay);
}
vg.util.execFunc=function(func, args)
{
return _cbdExecuteFunc(func, args);
}
vg.util.disableTextSelection=function(event)
{
var event=jsCBDgetEvent(event );
if(ie)
{
event.returnValue=false;
}
else
{
el.style['-moz-user-select']='none';
}
}
vg.util.getHTMLbodyHeight=function()
{
var wDiv=vg.html.getElement(CBD_WRAP_DIV_ID);
if(wDiv!=null)
{
return(wDiv.clientHeight >=wDiv.scrollHeight)?wDiv.clientHeight+'px':wDiv.scrollHeight+'px';
}
return cbd.getYUI().DOM.docHeight()+'px';
}
vg.util.getHTMLbodyWidth=function()
{
var elem=vg.html.getElement(CBD_WRAP_DIV_ID);
if(elem)
{
return elem.scrollWidth+'px';
}
return(ie)?document.body.scrollWidth+'px':document.documentElement.scrollWidth+'px';
}
vg.util.hasScrollBar=function(elem)
{
return(elem.clientHeight < elem.scrollHeight);
}
vg.util.hasHorizScrollBar=function(elem)
{
return(elem.clientWidth < elem.scrollWidth);
}
vg.util.getHTMLbodyScrollTop=function()
{
var wDiv=vg.html.getElement(CBD_WRAP_DIV_ID);
if(wDiv!=null)
{
return(wDiv.scrollTop);
}
return document.body.scrollTop;
}
vg.util.setHTMLbodyScrollTop=function(scrollTopPos)
{
var wDiv=vg.html.getElement(CBD_WRAP_DIV_ID);
if(wDiv!=null)
{
wDiv.scrollTop=scrollTopPos;
}
else
{
document.body.scrollTop=scrollTopPos;
}
}
vg.util.removeTags=function(s)
{
return String(s).replace(/<\/?[^>]+>/gi, "");
}
vg.util.concat=function(array1, array2)
{
for(var i=0;i < array2.length;i++)
{
array1.push(array2[i]);
}
}
vg.util.isEmpty=function(s){
return(!isEmpty(s))?(s.replace(/\s/g,'')==''):true;
}
vg.util.isJSONEmpty=function(json)
{
for(var attr in json )
{
return false;
}
return true;
}
vg.util.hasAttribute=function(elem, attrName){
return!(vg.util.isEmpty(elem.getAttribute(checkAttrName(attrName, elem))));
}
vg.util.execOnPageReady=function(func)
{
if(RIA)
{
cbd.loader.addCallback(func);
cbd.loader.load();
}
else
{
if(window._cbdNonRiaPageReady)
{
func();
}
else
{
vg.html.addEventListener(window, 'load', function(){
window._cbdNonRiaPageReady=true;
func();
});
}
}
}
vg.util.checkConditionsAndExecute=function(conditions, func, trials)
{
_cbdCheckConditionsAndExecute(conditions, func, trials);
}
vg.util.isDefined=function(variable)
{
return(typeof variable!='undefined');
}
vg.util.throwException=function(methodName, error)
{
throw("Method name:"+methodName+";Error:"+error);
}
vg.util.attachJsonOptions=function(obj, opts )
{
for(var i in opts )
{
var opt=opts[i];
obj[i]=opt;
}
}
vg.util.deepAttachOptions=function(obj, opts )
{
for(var i in opts )
{
var opt=opts[i];
if(opt instanceof Array)
{
if(!(obj[i]instanceof Array))
{
obj[i]=new Array();
}
vg.util.deepAttachOptions(obj[i], opt);
}
else if(opt instanceof Object&&!(opt instanceof Function))
{
if(!(obj[i]instanceof Object))
{
obj[i]=new Object();
}
vg.util.deepAttachOptions(obj[i], opt);
}
else
{
obj[i]=opt;
}
}
}
vg.util.updateCSRFToken=function(token)
{
if(!token)
{
return;
}
var tokenInput,
inputList=vg.util.toArray(document.getElementsByName("ANTI_CSRF_TOKEN")),
inputListLength=inputList.length;
for(var i=0;i < inputListLength;i++)
{
tokenInput=inputList[i];
if(vg.html.isHiddenInput(tokenInput))
{
tokenInput.value=token;
}
}
}
vg.comp.inheritPrototype=function(Child, Parent)
{
var EmptyFunc=function(){};
EmptyFunc.prototype=Parent.prototype;
Child.prototype=new EmptyFunc();
}
vg.util.copyJsonOptions=function(opts )
{
var obj;
if(opts instanceof Array )
{
obj=new Array();
}
else
{
obj=new Object();
}
for(var i in opts )
{
if(opts[i]instanceof Object)
{
obj[i]=vg.util.copyJsonOptions(opts[i]);
}
else
{
obj[i]=opts[i];
}
}
return obj;
}
vg.util.createNameValObj=function(name, value )
{
return{name:name, value:value};
}
vg.util.buildBooleanTable=function(data )
{
var table=[];
for(var i=0;i < data.length;i++)
{
var row=data[i];
var bools=row[0];
var val=row[1];
var arr=table;
for(var j=0;j < bools.length;j++)
{
var flag=bools[j];
var idx=(flag?1:0 );
if(arr[idx]==null )
{
if(j+1==bools.length )
{
arr[idx]=val;
}
else
{
arr[idx]=[];
}
}
arr=arr[idx];
}
}
return table;
}
vg.util.getBooleanTableValue=function(table, bools )
{
var ptr=table;
for(var i=0;i < bools.length;i++)
{
ptr=ptr[bools[i]?1:0];
}
return ptr;
}
vg.util._convertToString=function(obj)
{
var type=typeof(obj);
if(type=="string")
{
var delim=obj.indexOf("'") < 0?"'":"\"";
obj=obj.replace(/\n/g, ' ');
return delim+obj+delim;
}
else if(type!="object")
{
return obj;
}
str="";
if(obj instanceof Array)
{
str="[";
for(var i=0;i < obj.length;++i)
{
if(i > 0)
{
str+=",";
}
str+=vg.util._convertToString(obj[i]);
}
str+="]";
}
else if(type=="object")
{
str="{";
var i=0;
for(var p in obj)
{
if(i++> 0)
{
str+=",";
}
var propName=p.replace(/\./g, '_');
str+=(propName+":");
str+=vg.util._convertToString(obj[p]);
}
str+="}";
}
return str;
}
vg.util._isRelativeUrl=function(url)
{
return url.indexOf(":/") < 0&&url.indexOf('/')==0;
}
vg.window.getAvailableScreenHeight=function()
{
var wrapDiv=vg.html.getElement(CBD_WRAP_DIV_ID),
availableScreenHeight;
if(wrapDiv)
{
availableScreenHeight=wrapDiv.clientHeight;
}
else if(cbdcommon.support.isAddressBarIndcludedInWindowHeight())
{
availableScreenHeight=window.innerHeight;
}
else
{
availableScreenHeight=cbd.adapter.getViewportHeight();
}
return availableScreenHeight;
}
vg.window.getAvailableScreenWidth=function()
{
var wrapDiv=vg.html.getElement(CBD_WRAP_DIV_ID);
if(wrapDiv)
{
return wrapDiv.clientWidth;
}
return cbd.adapter.getViewportWidth();
}
vg.string.startsWith=function(str, c)
{
return str.charAt(0)==c;
}
vg.string.startsWithStr=function(str, strToMatch)
{
return(str.match("^"+strToMatch)==strToMatch);
}
vg.smil.isLoaded=function()
{
return cbd.getYUI()&&cbd.getYUI().Anim;
}
vg.smil.convertUnits=function(t )
{
var res=vg.smil.convertUnits.re.exec(t );
var ret=1;
if(res!=null )
{
if(res[1]=="-" )
{
ret=-1;
}
ret*=parseInt(res[2]);
if(res[3]=="s" )
{
ret*=1000;
}
}
return ret;
}
vg.smil.convertUnits.re=new RegExp("([\\+\\-]?)(\\d+)(ms|s|\\%)?" );
vg.smil.EASE_IN="easeIn";
vg.smil.CBD_ANIMATION_CLOSE=CBD_ANIMATION_CLOSE="close";
vg.smil.CBD_ANIMATION_OPEN=CBD_ANIMATION_OPEN="open";
vg.smil.CBD_ANIMATION_FADE_IN=CBD_ANIMATION_FADE_IN="fadein";
vg.smil.getEasing=function(easingStr)
{
return cbd.getYUI().Easing[easingStr];
}
vg.smil.Animation=function(target, attr, duration, beginTime, frompoint, topoint, bypoint, funcFinished, easeIn, colorAnimation, motionAnimation, scrollAnimation, easing, disableGeoChangedEvent)
{
if(target.target!=null)
{
var params=target;
target=params.target;
attr=params.attr;
duration=params.duration;
beginTime=params.beginTime;
frompoint=params.frompoint;
topoint=params.topoint;
bypoint=params.bypoint;
funcFinished=params.funcFinished;
easeIn=params.easeIn;
colorAnimation=params.colorAnimation;
motionAnimation=params.motionAnimation;
scrollAnimation=params.scrollAnimation;
easing=params.easing;
disableGeoChangedEvent=params.disableGeoChangedEvent;
}
this.duration=duration;
this.beginTime=beginTime;
this.attributes={from:{}, to:{}, by:{}};
this.stopped=false;
this.ready=false;
this.colorAnimation=colorAnimation;
this.motionAnimation=motionAnimation;
this.scrollAnimation=scrollAnimation;
var attrProps;
if(!easing&&easeIn)
{
easing=vg.smil.EASE_IN;
}
if(typeof(attr )=='string' )
{
if(frompoint!==undefined&&frompoint!=null ){this.attributes.from[attr]=frompoint}
if(topoint!==undefined&&topoint!=null ){this.attributes.to[attr]=topoint}
if(bypoint!==undefined&&bypoint!=null ){this.attributes.by[attr]=bypoint}
}
else if(typeof(attr )=='object'&&(!vg.util.isDefined(attr.from)&&!vg.util.isDefined(attr.to)&&!vg.util.isDefined(attr.by) ) )
{
for(var i in attr )
{
attrProps=attr[i];
if(!attrProps) continue;
attrProps.unit=attrProps.unit||"";
if(attrProps.to!==undefined)
{
this.attributes.to[i]=attrProps.to+attrProps.unit;
}
if(attrProps.from!==undefined)
{
this.attributes.from[i]=attrProps.from+attrProps.unit;
}
if(attrProps.by!==undefined)
{
this.attributes.by[i]=attrProps.by+attrProps.unit;
}
}
}
else
{
this.attributes=attr;
}
if(colorAnimation&&vg.util.isJSONEmpty(this.attributes.from))
{
for(var i in this.attributes.to)
{
if(i.toLowerCase().indexOf("color") > -1&&cbd.getYUI().one(target).getComputedStyle(i).toLowerCase()==="transparent")
{
this.attributes.from[i]="rgb(255, 255, 255)";
}
}
}
var THIS=this;
cbd.loader.loadAndExec('anim', function(){THIS.init(vg.html.getElement(target), THIS.attributes, funcFinished, easing, disableGeoChangedEvent);}, true );
}
vg.smil.Animation.prototype.init=function(target, attr, funcFinished, easing, disableGeoChangedEvent)
{
if(typeof(easing)=='string')
{
easing=vg.smil.getEasing(easing);
}
var YUI=cbd.getYUI();
this.anim=new YUI.Anim({
node:target,
from:attr.from,
to:attr.to,
by:attr.by,
easing:easing,
duration:this.duration/1000
});
if(!this.colorAnimation&&!disableGeoChangedEvent)
{
var targetElement=vg.html.getElement(target );
this.addOnFinish(function smil_geo_change(){vg.html._fireCustomEvent(vg.event.GEO_CHANGE, targetElement );});
}
if(funcFinished )
{
this.addOnFinish(funcFinished );
}
this.ready=true;
this.anim.run();
}
vg.smil.Animation.prototype.timeElapsed=function()
{
return new Date().getTime() - this.anim.get("startTime");
}
vg.smil.Animation.prototype.stop=function()
{
this.stopped=true;
this.anim.stop(false );
}
vg.smil.Animation.prototype.start=function()
{
var THIS=this;
setTimeout(
function vg_smil_start_timeout()
{
vg.util.checkConditionsAndExecute(
function vg_smil_check_anim_loaded()
{
return THIS.ready;
},
function vg_smil_start()
{
THIS.anim.animate();
}
);
}, THIS.beginTime );
}
vg.smil.Animation.prototype.duringAnimation=function(func )
{
var THIS=this;
this.anim.on("tween",  function anim_onTween(){if(!THIS.stopped ){func();}});
}
vg.smil.Animation.prototype.addOnFinish=function(func )
{
var THIS=this;
this.anim.on("end",
function anim_onComplete()
{
if(!THIS.stopped )
{
func();
}
}
);
}
vg.smil.Animation.prototype.setEase=function(name )
{
var easing=cbd.getYUI().Easing[name];
if(easing )
{
this.anim.method=easing;
}
}
vg.smil.animateElement=function(element, attr, duration, beginTime, frompoint, topoint, bypoint, funcFinished, easeIn, colorAnimation, motionAnimation, scrollAnimation, easing, disableGeoChangedEvent)
{
var anim=new vg.smil.Animation(element, attr, duration, beginTime, frompoint, topoint, bypoint, funcFinished, easeIn, colorAnimation, motionAnimation, scrollAnimation, easing, disableGeoChangedEvent);
return anim;
}
vg.smil.animateText=function(textNode, frompoint, topoint, duration)
{
var attributes={left:{from:frompoint, to:topoint}};
return vg.smil.animateElement({target:textNode, attr:attributes, duration:duration});
}
vg.smil.cbdFadeIn=function(node, time, callback)
{
jsCBDtoggleElement(node, true);
vg.smil.animateElement(node, 'opacity', time, 0, 0, 1, null, callback);
}
vg.smil.cbdFadeOut=function(node, time, callback)
{
vg.smil.animateElement(node, 'opacity', time, 0, 1, 0, null,
function()
{
vg.html.setOpacity(node,1);
jsCBDtoggleElement(node, false);
if(callback!=undefined)
{
callback();
}
});
};
vg.smil.slideToggle=function(config)
{
"use strict";
var node=config.node,
domNode=node.getDOMNode(),
isOpening=config.isOpening,
duration=config.duration,
speed=config.speed,
easing=config.easing,
nodeHeight,
fromHeight,
toHeight,
isRespGHSiloToggle=config.isRespGHSiloToggle||false,
callBackFunction=config.callBackFunction;
node.setStyle("display","block");
nodeHeight=vg.html.getObjHeight(domNode);
fromHeight=isOpening?0:nodeHeight;
toHeight=isOpening?nodeHeight:0;
if(speed)
{
duration=Math.abs(fromHeight-toHeight)/speed;
}
node.setStyle("height", isOpening?"0px":"");
vg.smil.animateElement({
target:domNode,
attr:{height:{from:fromHeight, to:toHeight,	unit:"px"}},
duration:duration,
easing:easing,
funcFinished:
function(){
if(isRespGHSiloToggle&&!isOpening){
node.setStyles({height:"" , display:""});
}
if(typeof config.callBackFunction==="function")
{
callBackFunction();
}
}
});
};
vg.MouseManager=function(config)
{
vg.util.attachJsonOptions(this, config);
this.inElement=false;
vg.html.addEventListenerMethod(this.element, 'mouseleave', this, 'mouseLeave' );
vg.html.addEventListenerMethod(this.element, 'mouseenter', this, 'mouseEnter' );
}
vg.MouseManager.prototype.mouseEnter=function(e)
{
this.inElement=true;
var controller=this;
var event=jsCBDgetEvent(e, true);
if(this.mouseEnterTimer!=null)
{
clearTimeout(this.mouseEnterTimer);
}
this.mouseEnterTimer=setTimeout(function()
{
controller.checkMouseIn(event);
},
10);
}
vg.MouseManager.prototype.mouseLeave=function(e)
{
this.inElement=false;
var controller=this;
var event=jsCBDgetEvent(e, true);
if(this.mouseLeaveTimer!=null)
{
clearTimeout(this.mouseLeaveTimer);
}
this.mouseLeaveTimer=setTimeout(function()
{
controller.checkMouseOut(event);
},
100);
}
vg.MouseManager.prototype.checkMouseIn=function(e)
{
if(this.inElement)
{
this.onMouseEnter(e);
}
}
vg.MouseManager.prototype.checkMouseOut=function(e)
{
if(!this.inElement)
{
this.onMouseLeave(e);
}
}
vg.ElementPersistance=function(obj )
{
vg.util.attachJsonOptions(this, obj );
this.onlink=false;
this.openflag=false;
this.pendingTimeouts=[];
this.inLayer=false;
this.globalDiv.persistObj=this;
vg.html.addEventListenerMethod(this.globalDiv, 'mouseleave', this, 'globalOut' );
vg.html.addEventListenerMethod(this.globalDiv, 'mouseenter', this, 'globalIn' );
}
vg.ElementPersistance.openInstance;
vg.ElementPersistance.mouseLinkEnter=function(id, link, targetPosition)
{
var THIS=document.getElementById(id ).persistObj;
if(THIS!=null)
{
if(THIS.setTarget )
{
THIS.setTarget(link.getAttribute('id' ) );
}
var controller=THIS.controller;
if(targetPosition&&controller)
{
controller.targetPosition=targetPosition;
}
THIS.id=id;
if(cbd.browser.isTouchScreen&&!vg.html.hasEventListeners(link, 'touchend'))
{
THIS.linkMouseoverFunction=link.onmouseover;
THIS.linkMouseoutFunction=link.onmouseout;
link.onmouseout=null;
link.onmouseover=null;
THIS.originalHref=link.href;
link.href='javascript:void(0)';
vg.html.addEventListener(link, 'touchend', function(){
vg.ElementPersistance._touchEnd(THIS, id, link, targetPosition);
});
THIS.linkIn();
}
else
{
THIS.linkIn();
}
}
}
vg.ElementPersistance.mouseLinkLeave=function(id )
{
var THIS=document.getElementById(id ).persistObj;
if(THIS!=null)
{
THIS.linkOut();
}
}
vg.ElementPersistance._touchEnd=function(persistObj, id, link, targetPosition)
{
var args;
if(persistObj.openflag)
{
args=[];
persistObj.linkMouseoutFunction.apply(link, args);
if((persistObj.originalHref.indexOf('javascript') > -1)&&persistObj.originalHref.indexOf('void(0)')===-1 )
{
eval(persistObj.originalHref.replace(/return false;?$/g,''));
}
else if(persistObj.originalHref.indexOf('#') < 0)
{
jsCBDgoToUrl(persistObj.originalHref);
}
}
else
{
args=[id, link, targetPosition];
persistObj.linkMouseoverFunction.apply(link, args);
}
}
vg.ElementPersistance.prototype.addLinkNode=function(node )
{
node=vg.html.getElement(node );
vg.html.addEventListenerMethod(node, 'mouseenter', this, 'linkIn' );
vg.html.addEventListenerMethod(node, 'mouseleave', this, 'linkOut' );
}
vg.ElementPersistance.prototype.linkIn=function(e )
{
this.onlink=true;
this.clearTimeouts();
if(this.openflag )
{
var cont=vg.comp.getController(this.id);
if(cont!=null&&cont.isUrlChanged)
{
cont.loadContent();
}
else if(this.repositionFunc )
{
this.repositionFunc();
}
}
else
{
this.delayThenOpen(e);
}
}
vg.ElementPersistance.prototype.delayThenOpen=function(e )
{
var THIS=this;
var event=e;
var openTimeout=cbd.page.isNextGen?250:500;
this.pendingTimeouts.push(setTimeout(function()
{
var instance=vg.ElementPersistance.openInstance;
if(instance&&instance!=THIS)
{
instance.clearTimeouts();
instance.checkClose();
}
vg.ElementPersistance.openInstance=THIS;
THIS.openflag=true;
THIS.openFunc(event );
}, openTimeout ) );
}
vg.ElementPersistance.prototype.linkOut=function(e )
{
this.onlink=false;
this.clearTimeouts();
this.delayThenClose();
}
vg.ElementPersistance.prototype.delayThenClose=function()
{
var THIS=this;
var closeTimeout=cbd.page.isNextGen?500:200;
this.pendingTimeouts.push(setTimeout(function(){THIS.checkClose();}, closeTimeout ) );
}
vg.ElementPersistance.prototype.globalOut=function(e )
{
if(cbd.page.isNextGen&&this.withinBoundaries(e))
{
return;
}
this.inLayer=false;
this.clearTimeouts();
this.delayThenClose();
}
vg.ElementPersistance.prototype.withinBoundaries=function(e)
{
var eventPos=vg.util.getMousePos(e);
var divProp=this.globalDiv.style;
var left=parseFloat(divProp.left);
var top=parseFloat(divProp.top);
var width=parseFloat(divProp.width);
var height=parseFloat(divProp.height);
if(eventPos.x > left&&eventPos.x <(left+width)
&&eventPos.y > top&&eventPos.y <(top+height))
{
return true;
}
return false;
}
vg.ElementPersistance.prototype.globalIn=function(e )
{
this.inLayer=true;
}
vg.ElementPersistance.prototype.checkClose=function()
{
if(!this.onlink&&this.inLayer==false )
{
this.openflag=false;
this.closeFunc();
}
}
vg.ElementPersistance.prototype.clearTimeouts=function()
{
for(var i=0;i < this.pendingTimeouts.length;i++)
{
clearTimeout(this.pendingTimeouts[i]);
}
this.pendingTimeouts=[];
}
vg.comp._isCompReady=function(target)
{
return vg.comp._hasController(target);
}
vg.comp._hasController=function(node, type )
{
if(!node )
{
return false;
}
node=vg.html.getElement(node );
if(!node )
{
return false;
}
var isDefined=typeof(node.jsController )!='undefined';
if(type )
{
return isDefined&&(node.jsController instanceof type);
}
return isDefined;
}
vg.comp._isContainer=function(node )
{
if(!node )
{
return false;
}
node=vg.html.getElement(node );
var isDefined=typeof(node.jsController )!='undefined';
if(!isDefined )
{
return false;
}
var isContainer=false;
isContainer=isContainer||(window.NavBox&&node.jsController instanceof NavBox );
isContainer=isContainer||(vg.Layer&&node.jsController instanceof vg.Layer );
isContainer=isContainer||(window.SideTab&&node.jsController instanceof SideTab );
isContainer=isContainer||(window.Deck&&node.jsController instanceof Deck );
isContainer=isContainer||(window.AccordionItem&&node.jsController instanceof AccordionItem );
isContainer=isContainer||(window.cbd.DeckPlayer&&node.jsController instanceof cbd.DeckPlayer );
isContainer=isContainer||(window.vg.Div&&node.jsController instanceof vg.Div );
isContainer=isContainer||(window.vg.Container&&node.jsController instanceof vg.Container );
return isContainer;
}
vg.comp.findController=function(target, startFromParent)
{
var node=vg.html.getElement(target);
if(startFromParent)
{
node=node.parentNode;
}
var jsController;
do
{
jsController=vg.comp.getController(node);
if(jsController!=null)
{
return jsController;
}
node=vg.html._getParentNode(node);
}while(node!=null);
}
vg.comp.callMethod=function(target, methodName, args)
{
var controller=vg.comp.getController(target);
controller[methodName].call(controller, args);
}
vg.comp.applyMethod=function(target, methodName, args, compType)
{
if(args==undefined)
{
args=[];
}
var controller=vg.comp.getController(target, compType);
controller[methodName].apply(controller, args);
}
vg.comp._execEventHandler=function(attrValue, node)
{
var thisRef=node;
var pattern=/([\,\:\s\(]{1})this([\,\s\.\)]{1})/g;
attrValue=attrValue.replace(pattern,"$1thisRef$2");
attrValue=attrValue.replace(/return false;?$/g,'');
return eval(attrValue);
}
vg.comp.findHiddenComponents=function(base )
{
var inputs=new Array;
var spans=base.getElementsByTagName('span' );
for(var i=0;i < spans.length;i++)
{
inputs.push(spans[i]);
}
var divs=base.getElementsByTagName('div' );
for(var i=0;i < divs.length;i++)
{
inputs.push(divs[i]);
}
return inputs;
}
vg.comp.repaintSubComponents=function(base )
{
var inputs=vg.comp.findHiddenComponents(base );
for(var i=0;i < inputs.length;i++)
{
var node=inputs[i];
var height=node.style.height;
node.style.height='1px';
node.style.height=height;
}
}
vg.comp.getController=function(target, compType)
{
var viewNode=vg.html.getElement(target);
if(viewNode==null)
{
return null;
}
if(!viewNode.jsControllers)
{
return null;
}
return viewNode.jsControllers[compType!=null?compType:"D"];
}
vg.comp._removeController=function(target, compType)
{
var viewNode=vg.html.getElement(target);
if(viewNode!=null&&viewNode.jsControllers)
{
delete viewNode.jsControllers[compType!=null?compType:"D"];
if(viewNode.jsController)
{
viewNode.jsController=null;
}
}
}
vg.comp.getContentNode=function(target)
{
return vg.comp.getController(target).contentNode;
}
vg.comp._hideAllItems=function(items)
{
var length=items.length;
for(var i=0;i < length;i++)
{
jsCBDtoggleElement(items[i].viewNode, false);
}
}
vg.comp._registeredComps=new Array();
vg.comp._registerComponent=function(compName)
{
vg.comp._registeredComps[compName.toLowerCase()]=true;
}
vg.comp._isCompRegistered=function(compName)
{
return vg.comp._registeredComps[compName.toLowerCase()];
}
vg.comp._configureHiddenItems=function(node)
{
vg.comp._configureSlider(node);
}
vg.comp._configureSlider=function(node)
{
var oSliders=vg.html.getElements(node,{tagName:'div', attrName:'class', attrValue:'vgSlider'});
var sliderController;
for(var i=0;oSliders!=null&&i < oSliders.length;i++)
{
var slider=vg.html.getElements(oSliders[i],{tagName:'input'});
sliderController=vg.comp.getController(slider[0]);
if(sliderController!=null)
{
if(cbd.loader.isPageReady())
{
sliderController.show();
}
else
{
vg.util.execOnPageReady(function(){sliderController.show();});
}
}
}
}
vg.comp.isCompLoaded=function(name )
{
return window[name]!=null;
}
vg.comp.getButtonFromNode=function(node)
{
var buttonNode=vg.html.findAncestor(node,{tagName:"span", attrName:"type", attrValue:"button"});
return buttonNode;
}
vg.comp.trackCommandComponent=function(comp)
{
_trackSubmitButton(comp);
}
vg.comp.isCommandComp=function(element)
{
return _cbdIsButton(element)||vg.comp.isCommandLink(element)||vg.comp.isActionable(element);
}
vg.comp.isCommandLink=function(element)
{
return element.getAttribute&&(element.getAttribute("comp")=="CommandLink");
}
vg.comp.isActionable=function(element)
{
return element.getAttribute&&(element.getAttribute("actionable")=="true");
}
vg.comp.trackCommandComp=function(formId, value)
{
_cbdSetButtonHiddenInput(formId, value);
}
vg.comp.initFloodlightFrame=function()
{
if(vg.comp._floodFrameSrc)
{
var floodFrame=document.createElement('iframe');
floodFrame.height=1;
floodFrame.width=1;
floodFrame.id='floodIframe';
floodFrame.frameborder=0;
floodFrame.src=vg.comp._floodFrameSrc;
document.getElementById('floodDiv').appendChild(floodFrame);
}
}
vg.comp.destroy=function(target)
{
vg.comp._destroyComp(target);
var spans=target.getElementsByTagName('span');
var size=spans.length;
for(var i=0;i < size;i++)
{
vg.comp._destroyComp(spans[i]);
}
}
vg.comp._destroyComp=function(elem)
{
if(elem!=null)
{
var viewNode=elem.viewNode?elem.viewNode:elem;
var controllers=viewNode.jsControllers;
if(controllers!=null)
{
for(j in controllers)
{
if(controllers[j]._destroy!=null)
{
controllers[j]._destroy();
}
}
}
}
}
vg.comp.contentUpdated=function(target)
{
vg.comp._contentUpdated(target);
}
vg.comp._contentUpdated=function(target)
{
var cont=vg.comp.getController(target);
if(cont!=null&&cont._contentUpdated!=null)
{
cont._contentUpdated();
}
if(window.openLayers!=null&&window.openLayers.length!=0)
{
var layer=vg.html.findAncestor(target,{tagName:'span', attrName:'type', attrValue:'Layer'});
cont=vg.comp.getController(vg.html.getFirstChild(layer));
if(cont!=null&&cont._contentUpdated!=null)
{
cont._contentUpdated();
}
}
}
vg.comp._setInternal=function(target)
{
var parentContainer=vg.html.findAncestor(target,{tagName:'div', attrName:'class', attrValue:/ng-layer/});
var firstChild=vg.html.getFirstChild(parentContainer);
var cont=vg.comp.getController(parentContainer);
if(cont!=null)
{
if(window._cbdIsInternal==true)
{
cont._setInternal(true);
window._cbdIsInternal=null;
}
else if(!vg.html.hasStyle('intCmp',firstChild))
{
cont._setInternal(false);
}
}
}
vg.comp.setInternalFlag=function()
{
window._cbdIsInternal=true;
}
vg.comp.getComponentIds=function(context, compType, check)
{
if(vg.constants)
{
var getElementId=function(element){return element.id.replace(vg.constants.COMP_ID_PFX,"");};
return vg.html.getElements(context,
{tagName:"span", attrName:"type", attrValue:compType},
(check)?function(element){
return check(getElementId(element));
}:
null,
function(element){
return getElementId(element);
}
);
}
}
vg.comp.getCompViewNodes=function(context, compType, check)
{
return vg.html.getElements(context,{tagName:"span", attrName:"type", attrValue:compType}, check, vg.html.getFirstChild);
}
vg.comp.getSelectedInputLabels=function(context, id)
{
var check=function(element){
var attrs=element.attributes;
return(attrs['name'].value==id)&&element.checked;
}
var map=function(element){
var attrs=element.attributes;
return attrs['label'].value;
}
return vg.html.getElements(context,{tagName:'input'}, check, map);
}
vg.comp.editableHeader={};
vg.comp.editableHeader.CHARACTER_TEXT_TABLE=':CharacterTextTable';
vg.comp.toggleHeaderTextArea=function(textArea, toggleHeaderTextArea)
{
if(typeof toggleHeaderTextArea==='undefined')
{
toggleHeaderTextArea=textArea.editable;
}
if(toggleHeaderTextArea===true)
{
vg.comp.setTextAreaUneditable(textArea);
}
else
{
vg.comp.setTextAreaEditable(textArea);
}
};
vg.comp.setTextAreaUneditable=function(textArea)
{
var textAreaDiv=null,
textAreaTbl=null;
textArea=vg.html.getElement(textArea);
if(vg.validation.validateElement(textArea, false, false))
{
textAreaDiv=vg.html.getElements(textArea.parentElement,{tagName:'div', attrName:'class', attrValue:'headerDiv'});
textAreaTbl=document.getElementById(textArea.getAttribute('id')+vg.comp.editableHeader.CHARACTER_TEXT_TABLE);
if(textArea.style.display!=='none')
{
vg.comp.adjustHeightToText(textArea);
}
if(textAreaTbl!==null)
{
textAreaDiv=vg.html.getElements(textAreaTbl.parentElement,{tagName:'div', attrName:'class', attrValue:'headerDiv'});
textAreaTbl.style.display='none';
}
textAreaDiv[0].innerHTML=textArea.value;
textAreaDiv[0].style.display='';
textArea.style.display='none';
textArea.editable=false;
vg.html.removeEventListenerById(window, textArea.getAttribute("id")+"_adjustHeightToText");
}
};
vg.comp.setTextAreaEditable=function(textArea)
{
var textAreaDiv=null,
textAreaTbl=null;
textArea=vg.html.getElement(textArea);
textAreaDiv=vg.html.getElements(textArea.parentElement,{tagName:'div', attrName:'class', attrValue:'headerDiv'});
textAreaTbl=document.getElementById(textArea.getAttribute('id')+vg.comp.editableHeader.CHARACTER_TEXT_TABLE);
if(textAreaTbl!==null)
{
textAreaTbl.style.display='';
textAreaDiv=vg.html.getElements(textAreaTbl.parentElement,{tagName:'div', attrName:'class', attrValue:'headerDiv'});
}
vg.comp.adjustHeightToText(textArea);
textArea.style.display='';
textAreaDiv[0].style.display='none';
textArea.editable=true;
vg.html.addEventListener(window, vg.event.BROWSER_RESIZE_END, function()
{
vg.comp.adjustHeightToText(textArea);
},
textArea.getAttribute('id')+'_adjustHeightToText'
);
};
vg.comp.adjustHeightToText=function(textArea)
{
var currentHeight=vg.html.getObjHeight(textArea),
scrollHeight=0,
totalHeight=0,
isDisplayed=true;
if(textArea.style.display==='none')
{
textArea.style.display='';
isDisplayed=false;
}
textArea.style.height='auto';
scrollHeight=textArea.scrollHeight;
totalHeight=scrollHeight;
if(scrollHeight < 1)
{
totalHeight=currentHeight;
}
if(!isDisplayed)
{
textArea.style.display='none';
}
textArea.style.height=totalHeight+'px';
};
vg.comp.jsCommandsMap={};
vg.comp._execJsCommand=function(component)
{
var jsCommand=vg.comp.jsCommandsMap[component.id].jsCommand,
rtnVal=false;
if(jsCommand)
{
jsCommand="(function(event){"+jsCommand+"}(vg.comp.jsCommandsMap['"+component.id+"'].currentClickEvent))";
rtnVal=vg.comp._execEventHandler(jsCommand, component);
}
return rtnVal===true;
}
vg.Controller=function(viewNodeId, contentNode, jsTransient, compType)
{
var viewNodeCompId,
parentCompSpanNode;
if(viewNodeId.viewNodeId!==null&&(typeof viewNodeId.viewNodeId!=="undefined"))
{
contentNode=viewNodeId.contentNode;
jsTransient=viewNodeId.jsTransient;
compType=viewNodeId.compType;
viewNodeId=viewNodeId.viewNodeId;
}
this.viewNode=vg.html._getElementWithIdPrefixes(viewNodeId);
if(!this.viewNode )
{
if(jsTransient)
{
return;
}
else
{
window.console.error("Invalid viewNode id="+viewNodeId);
return;
}
}
viewNodeCompId="comp-"+viewNodeId;
parentCompSpanNode=vg.html.findAncestor(this.viewNode,{tagName:"span", attrName:"id", attrValue:viewNodeCompId});
if(parentCompSpanNode)
{
parentCompSpanNode.viewNode=this.viewNode;
}
this.contentNode=contentNode;
if(this.viewNode&&!this.viewNode.jsControllers)
{
this.viewNode.jsControllers=[];
}
if(compType)
{
this.viewNode.jsControllers[compType]=this;
}
else
{
this.viewNode.jsControllers.D=this;
this.viewNode.jsController=this.viewNode.jsControllers.D;
}
};
vg.comp.getCompSpan=function(compId)
{
var comp=vg.html.getElement(compId),
compSpan=null;
if(comp)
{
compId=compId.getAttribute('id');
compSpan=document.getElementById(vg.constants.COMP_ID_PFX+compId);
}
return compSpan;
};
vg.Controller.prototype=
{
getController:function()
{
return this.jsController;
},
getViewNode:function()
{
return this.viewNode;
},
setStatusFromHistory:function(status )
{
}
}
vg.button.BUTTON_DEFAULT_STYLE=BUTTON_DEFAULT_STYLE="default";
vg.button.BUTTON_HIGHLIGHT_STYLE=BUTTON_HIGHLIGHT_STYLE="hover";
vg.button.BUTTON_ACTIVE=BUTTON_ACTIVE="press";
vg.button.BUTTON_INPUT_CLASS=BUTTON_INPUT_CLASS="btn";
vg.button._getSpan=function(button)
{
return vg.html.getFirstChild(vg.html.getElement(button));
}
vg.button._mouseInOut=function(selected, button)
{
var isDisabled=vg.button._isDisabled(button),
span=vg.button._getSpan(button);
if(selected&&!isDisabled)
{
vg.html.replaceClass(span, vg.button.BUTTON_DEFAULT_STYLE, vg.button.BUTTON_HIGHLIGHT_STYLE);
}
else
{
jsCBDdeleteStyle(span, vg.button.BUTTON_ACTIVE);
if(!isDisabled)
{
vg.html.replaceClass(span, vg.button.BUTTON_HIGHLIGHT_STYLE, vg.button.BUTTON_DEFAULT_STYLE);
}
}
}
vg.button._isDisabled=function(button)
{
var buttonChildren=vg.html.getElements(button,{tagName:'input', attrName:'class'}, function(input){return vg.html.hasStyle(vg.button.BUTTON_INPUT_CLASS, input);});
var buttonInput=buttonChildren[0];
var disabled='false';
if(buttonInput)
{
disabled=buttonInput.getAttribute('disabledBtn');
}
return(disabled=='true'||disabled=='disabled');
}
vg.button._select=function(selected, button, event)
{
var key=jsCBDgetKey(jsCBDgetEvent(event));
var isDisabled=vg.button._isDisabled(button);
if((key==9||key==16)&&!isDisabled)
{
selected=false;
}
var span=vg.button._getSpan(button);
if(selected)
{
jsCBDaddStyle(span, vg.button.BUTTON_ACTIVE);
if(!isDisabled)
{
vg.html.replaceClass(span, vg.button.BUTTON_HIGHLIGHT_STYLE, vg.button.BUTTON_DEFAULT_STYLE);
}
}
else
{
jsCBDdeleteStyle(span, vg.button.BUTTON_ACTIVE);
}
}
vg.button._focus=function(button)
{
var span=vg.button._getSpan(button);
}
vg.button._blur=function(button)
{
var span=vg.button._getSpan(button);
jsCBDdeleteStyle(span, vg.button.BUTTON_ACTIVE);
}
vg.button._disable=function(button, state)
{
var disableValue=(state)?"disabled":"false";
var span=vg.button._getSpan(button);
if(!button.getAttribute("intDisabledCobrowsable") )
{
(state)?jsCBDaddStyle(span, "disabled"):jsCBDdeleteStyle(span, "disabled");
}
var oldClass=null;
var newClass=null;
var elem=vg.html.getFirstChild(span);
if(!cbd.page.isNextGen)
{
elem=vg.html.getFirstChild(elem);
}
oldClass=(state)?'default':'disabled';
newClass=(state)?'disabled':'default';
vg.html.replaceClass(elem, oldClass, newClass);
var buttonChildren=vg.html.getElements(button,{tagName:'input', attrName:'class'}, function(input){return vg.html.hasStyle(vg.button.BUTTON_INPUT_CLASS, input);});
var buttonInput=buttonChildren[0];
(state)?buttonInput.setAttribute("disabledBtn", disableValue):buttonInput.removeAttribute("disabledBtn");
var inpId=button.getAttribute('id');
jsCBDcreateHiddenInput(inpId, state, inpId, button.parentNode);
if(cbd.page.isNextGen)
{
if(state)
{
buttonInput.setAttribute("tabindex", "-1");
}
else
{
var initialTabindex=buttonInput.getAttribute('initialtabindex');
if(!vg.util.isEmpty(initialTabindex) )
{
buttonInput.setAttribute("tabindex", initialTabindex);
}
else
{
buttonInput.removeAttribute("tabindex");
}
}
}
}
vg.button._handleClick=function(event, button, suppressErrorLayer)
{
var onClickAttr,
thisRef,
jsCommandsMap;
if(vg.button._isDisabled(button))
{
return false;
}
if(button&&button.tagName&&button.getAttribute("intdisabledcobrowsable")==='true')
{
return false;
}
event=jsCBDgetEvent(event);
jsCommandsMap=vg.comp.jsCommandsMap[button.id];
if(jsCommandsMap)
{
jsCommandsMap.currentClickEvent=event;
}
onClickAttr=button.getAttribute('clickJs');
thisRef=button;
if(onClickAttr!==null)
{
vg.comp._execEventHandler(onClickAttr, thisRef);
}
if(!button.getAttribute('blockSubmit'))
{
vg.button._submit(button, suppressErrorLayer);
}
}
vg.button._keyPress=function(e, button)
{
button=vg.html.getElement(button);
e=jsCBDgetEvent(e);
var key=jsCBDgetKey(e);
if(key==9 )
{
var span=vg.html.getFirstChild(vg.button._getSpan(button));
jsCBDdeleteStyle(span, vg.button.BUTTON_ACTIVE);
}
else if(key==13 )
{
vg.button._select(true, button);
}
}
vg.button.setFocus=function(button)
{
var button=vg.html.getElement(button);
var input=button.getElementsByTagName("input");
input[0].focus();
}
vg.button._submit=function(button, suppressErrorLayer)
{
var onSubmit=button.getAttribute('onSubmit');
var showMsg=button.getAttribute('showWaitMsgOnSubmit');
var immediate=button.getAttribute('immediate');
var disableWT=button.getAttribute('wtCallDisabled');
if(onSubmit==null||eval(onSubmit))
{
if(immediate)
{
vg.validation.submitParentForm(button, showMsg, disableWT);
}
else
{
vg.validation.validateAndSubmitParentForm(button, showMsg, disableWT, suppressErrorLayer);
}
}
}
vg.button.triggerClick=function(target )
{
var button=vg.html.getElement(target);
if(!vg.button._isDisabled(button))
{
jsCBDtriggerEventOnNode(target, 'click');
}
}
vg.touchScreen.SCROLL_CONTAINER_CLASS=SCROLL_CONTAINER_CLASS="tScrn-ScrollingDivContainer";
vg.touchScreen.SCROLL_EL_CLASS=SCROLL_EL_CLASS="tScrn-ScrollingDiv";
vg.touchScreen.SCROLLBAR_TACK_CLASS=SCROLLBAR_TACK_CLASS="scrollbarTrack";
vg.touchScreen.SCROLLBAR_CLASS=SCROLLBAR_CLASS="scrollbar";
vg.touchScreen.SCROLLING_EL_ID_SFX=SCROLLING_EL_ID_SFX="_scrollingEl";
vg.touchScreen.SCROLLBAR_TRACK_ID_SFX=SCROLLBAR_TRACK_ID_SFX="_scrollbarTrack";
vg.touchScreen.SCROLLBAR_ID_SFX=SCROLLBAR_ID_SFX="_scrollbar";
vg.touchScreen._isCustomScrollContainer=function(container)
{
"use strict";
return(container&&vg.html.hasStyle(vg.touchScreen.SCROLL_EL_CLASS, container));
};
vg.touchScreen._makeNodeScrollable=function(id)
{
var scrollContainer=document.getElementById(id);
if(!cbd.browser.isTouchScreen||scrollContainer==null)
{
return;
}
var scrollContainerFirstChild=vg.html.getFirstChild(scrollContainer);
if(vg.touchScreen._isCustomScrollContainer(scrollContainerFirstChild))
{
vg.touchScreen._setScrollingElementsProperties(id);
}
else
{
vg.touchScreen._renderScrollingElements(id);
}
}
vg.touchScreen._renderScrollingElements=function(id)
{
var scrollContainer=document.getElementById(id);
var addStyle=vg.html.addStyle;
var touchScreenNS=vg.touchScreen;
var scrollingEl=document.createElement("div");
scrollingEl.setAttribute("id", id+touchScreenNS.SCROLLING_EL_ID_SFX);
addStyle(touchScreenNS.SCROLL_EL_CLASS, scrollingEl);
var scrollbarTrack=document.createElement("div");
scrollbarTrack.setAttribute("id", id+touchScreenNS.SCROLLBAR_TRACK_ID_SFX);
addStyle(touchScreenNS.SCROLLBAR_TACK_CLASS, scrollbarTrack);
var scrollbar=document.createElement("div");
scrollbar.setAttribute("id", id+touchScreenNS.SCROLLBAR_ID_SFX);
addStyle(touchScreenNS.SCROLLBAR_CLASS, scrollbar);
scrollbarTrack.appendChild(scrollbar);
var scrollContainerParent=vg.html._getParentNode(scrollContainer);
var scrollContainerSiblings=scrollContainerParent.childNodes;
var siblingsLength=scrollContainerSiblings.length;
var lastSibling=scrollContainerSiblings[siblingsLength-1];
var nextSibling=null;
if(siblingsLength > 1&&scrollContainer!=lastSibling)
{
for(var i=0;i < siblingsLength;i++)
{
if(scrollContainerSiblings[i]==scrollContainer)
{
nextSibling=scrollContainerSiblings[i+1];
break;
}
}
}
scrollContainerParent.removeChild(scrollContainer);
var scrollContainerChildren=scrollContainer.childNodes;
while(scrollContainerChildren.length > 0)
{
var node=scrollContainerChildren[0];
scrollContainer.removeChild(node);
scrollingEl.appendChild(node);
}
scrollContainer.appendChild(scrollingEl);
scrollContainer.appendChild(scrollbarTrack);
if(nextSibling)
{
scrollContainerParent.insertBefore(scrollContainer, nextSibling);
}
else
{
scrollContainerParent.appendChild(scrollContainer);
}
vg.touchScreen._setScrollingElementsProperties(id);
}
vg.touchScreen._setScrollingElementsProperties=function(id)
{
var touchScreenNS=vg.touchScreen;
var scrollContainer=document.getElementById(id);
var scrollingEl=document.getElementById(id+touchScreenNS.SCROLLING_EL_ID_SFX);
var scrollbarTrack=document.getElementById(id+touchScreenNS.SCROLLBAR_TRACK_ID_SFX);
var scrollbar=document.getElementById(id+touchScreenNS.SCROLLBAR_ID_SFX);
var scrollElementHeights=touchScreenNS.oneFinger._getScrollingElementsHeights(scrollContainer, scrollingEl, scrollbarTrack, scrollbar);
var h_scrollContainer=scrollElementHeights.scrollContainer;
var h_scrollingEl=scrollElementHeights.scrollingEl;
var h_scrollbarTrack=scrollElementHeights.scrollbarTrack;
var h_scrollbar=scrollElementHeights.scrollbar;
if(h_scrollingEl > h_scrollContainer)
{
if(!vg.html.hasStyle(touchScreenNS.SCROLL_CONTAINER_CLASS, scrollContainer))
{
vg.html.addStyle(touchScreenNS.SCROLL_CONTAINER_CLASS, scrollContainer);
}
var scrollingElTopPos=parseInt(scrollingEl.style.top);
var offset=h_scrollContainer - h_scrollingEl;
if(scrollingElTopPos < offset)
{
vg.html.setObjTop(scrollingEl, offset);
}
vg.html.setHeight(scrollbarTrack, h_scrollbarTrack+"px");
vg.html.setHeight(scrollbar, h_scrollbar+"px");
var scrollbarNewPos=Math.round((h_scrollContainer/h_scrollingEl)*scrollingElTopPos*-1);
vg.html.setObjTop(scrollbar, scrollbarNewPos);
vg.html.addEventListener(scrollingEl, vg.event.GSTR_CUSTOM_Y_SCROLL,  touchScreenNS.customScrollY.customScrollTouchMove, "_customScrollMove");
vg.html.addEventListener(scrollingEl, vg.event.GSTR_CUSTOM_Y_SCROLL_END,  touchScreenNS.customScrollY.customScrollTouchEnd, "_customScrollEnd");
}
else
{
if(vg.html.hasStyle(touchScreenNS.SCROLL_CONTAINER_CLASS, scrollContainer))
{
vg.html.removeStyle(touchScreenNS.SCROLL_CONTAINER_CLASS, scrollContainer);
vg.html.setObjTop(scrollingEl, "0");
vg.html.removeEventListenerById(scrollingEl, "_customScrollMove");
vg.html.removeEventListenerById(scrollingEl, "_customScrollEnd");
}
}
}
vg.touchScreen.oneFinger._getScrollingElementsHeights=function(scrollContainer, scrollingEl, scrollbarTrack, scrollbar)
{
var scrollElemsHeights=new Array();
scrollElemsHeights.scrollContainer=0;
scrollElemsHeights.scrollingEl=0;
scrollElemsHeights.scrollbarTrack=0;
scrollElemsHeights.scrollbar=0;
if(scrollContainer)
{
var scrollContainerStyleHeight=scrollContainer.style.height;
if(scrollContainerStyleHeight)
{
scrollElemsHeights.scrollContainer=parseInt(scrollContainerStyleHeight);
}
else
{
scrollElemsHeights.scrollContainer=vg.html.getObjHeight(scrollContainer);
if(scrollElemsHeights.scrollContainer==0)
{
scrollElemsHeights.scrollContainer=vg.html.getObjSizeInHiddenAncestor(scrollContainer).h;
}
}
}
if(scrollingEl)
{
scrollElemsHeights.scrollingEl=vg.html.getObjHeight(scrollingEl);
if(scrollElemsHeights.scrollingEl==0)
{
scrollElemsHeights.scrollingEl=vg.html.getObjSizeInHiddenAncestor(scrollingEl).h;
}
}
if(scrollbarTrack)
{
scrollElemsHeights.scrollbarTrack=scrollElemsHeights.scrollContainer;
}
if(scrollbar)
{
scrollElemsHeights.scrollbar=Math.round((scrollElemsHeights.scrollContainer/scrollElemsHeights.scrollingEl)*scrollElemsHeights.scrollContainer);
}
return scrollElemsHeights;
}
vg.touchScreen.customScrollY=
{
scrollingEl:null,
scrollContainer:null,
scrollbar:null,
scrollElementHeights:null,
h_scrollContainer:null,
h_scrollingEl:null,
h_scrollbar:null,
offsets:null,
origin:null,
originTime:null,
step:null,
startPos:null,
speed:null,
distance:null,
min:null,
max:null,
newPos:null,
containerToScrollingElRatio:null,
scrollbarMin:null,
scrollbarMax:null,
firstTouchMove:true,
customScrollMove:function(config)
{
"use strict";
var customScrollY=vg.touchScreen.customScrollY,
maxScroll=true;
if(config)
{
customScrollY.initScrollingProperties(null,config.scrollContainer);
if(config.newMax)
{
customScrollY.newPos=customScrollY.max=config.newMax;
}
else
{
customScrollY.newPos=(config.targetYPos < customScrollY.max)?customScrollY.max:config.targetYPos;
}
if(customScrollY.newPos <=customScrollY.min&&customScrollY.newPos >=customScrollY.max)
{
vg.html.setObjTop(customScrollY.scrollingEl, customScrollY.newPos);
customScrollY.moveScrollbar(customScrollY.newPos,maxScroll);
}
}
},
customScrollTouchMove:function(event)
{
var touchEvent=event,
customScrollY=vg.touchScreen.customScrollY;
if(customScrollY.firstTouchMove===true)
{
customScrollY.initScrollingProperties(touchEvent);
customScrollY.firstTouchMove=false;
}
touchEvent.preventDefault();
var currentPos=vg.event.getPosition(touchEvent).y;
customScrollY.newPos=(currentPos - customScrollY.origin)+customScrollY.offsets[1];
if(customScrollY.newPos <=customScrollY.min&&customScrollY.newPos >=customScrollY.max)
{
vg.html.setObjTop(customScrollY.scrollingEl, customScrollY.newPos);
customScrollY.moveScrollbar(customScrollY.newPos);
vg.comp.closeAllMenusAndCalendars(event);
}
},
customScrollTouchEnd:function(event)
{
var touchEvent=event,
customScrollY=vg.touchScreen.customScrollY;
customScrollY.startPos=customScrollY.scrollingEl.offsetTop;
var end=vg.event.getPosition(touchEvent).y,
endTime=new Date().getTime(),
dist=end - customScrollY.origin,
time=endTime - customScrollY.originTime;
customScrollY.speed=(cbdcommon.screen.isMediaQuerySizeSmall()?2:1)*dist/(time/1000);
if(Math.abs(dist) > 5)
{
scroll=setInterval(customScrollY.finishScroll,customScrollY.step);
}
customScrollY.firstTouchMove=true;
},
initScrollingProperties:function(event, scrollEl)
{
var touchEvent=event;
if(touchEvent)
{
vg.html.stopEventPropagation(touchEvent);
}
var customScrollY=vg.touchScreen.customScrollY;
customScrollY.scrollingEl=(touchEvent&&touchEvent.currentTarget)?touchEvent.currentTarget:scrollEl
customScrollY.scrollContainer=customScrollY.scrollingEl.parentNode;
customScrollY.scrollbar=document.getElementById(customScrollY.scrollContainer.id+vg.touchScreen.SCROLLBAR_ID_SFX);
customScrollY.scrollElementHeights=vg.touchScreen.oneFinger._getScrollingElementsHeights(customScrollY.scrollContainer, customScrollY.scrollingEl, null, customScrollY.scrollbar);
customScrollY.h_scrollContainer=customScrollY.scrollElementHeights.scrollContainer;
customScrollY.h_scrollingEl=customScrollY.scrollElementHeights.scrollingEl;
customScrollY.h_scrollbar=customScrollY.scrollElementHeights.scrollbar;
if(customScrollY.h_scrollContainer >=customScrollY.h_scrollingEl)
{
return;
}
customScrollY.offsets=[customScrollY.scrollingEl.offsetLeft,customScrollY.scrollingEl.offsetTop];
customScrollY.origin=(touchEvent)?vg.event.getPosition(touchEvent).y:0;
customScrollY.originTime=new Date().getTime();
customScrollY.step=50;
customScrollY.distance=0;
customScrollY.min=2;
customScrollY.max=- customScrollY.h_scrollingEl+customScrollY.scrollContainer.offsetHeight;
clearInterval(scroll);
customScrollY.containerToScrollingElRatio=customScrollY.h_scrollContainer/customScrollY.h_scrollingEl;
customScrollY.scrollbarMin=customScrollY.min;
customScrollY.scrollbarMax=customScrollY.h_scrollContainer - customScrollY.h_scrollbar - 2;
},
moveScrollbar:function(newPosition, checkRange)
{
"use strict;"
var customScrollY=vg.touchScreen.customScrollY,
scrollbarNewPos=Math.round(customScrollY.containerToScrollingElRatio*newPosition*-1);
if(scrollbarNewPos >=customScrollY.scrollbarMin&&scrollbarNewPos <=customScrollY.scrollbarMax)
{
vg.html.setObjTop(customScrollY.scrollbar, scrollbarNewPos);
}
else if(checkRange)
{
if(scrollbarNewPos > customScrollY.scrollbarMax)
{
scrollbarNewPos=customScrollY.scrollbarMax;
}
else
{
scrollbarNewPos=customScrollY.scrollbarMin;
}
}
},
finishScroll:function()
{
var customScrollY=vg.touchScreen.customScrollY;
customScrollY.distance+=Math.round(customScrollY.speed*(customScrollY.step/1000))
customScrollY.newPos=customScrollY.startPos+customScrollY.distance;
if(customScrollY.newPos > customScrollY.min||customScrollY.newPos < customScrollY.max)
{
clearInterval(scroll);
return;
}
vg.html.setObjTop(customScrollY.scrollingEl, customScrollY.newPos);
customScrollY.moveScrollbar(customScrollY.newPos);
customScrollY.speed=.85*customScrollY.speed;
if(Math.abs(customScrollY.speed) < 10)
{
customScrollY.speed=0;
clearInterval(scroll);
}
}
}
vg.touchScreen._getTouchEvent=function(e)
{
var touchEvent=e;
return touchEvent;
}
jsCBDgetSelectedDeckCardIndex=function(deckId)
{
return vg.comp.getController(deckId).selectedIndex;
}
var PREV=-1;
var NEXT=999;
jsCBDselectDeckCard=function(deckId, cardIdx, wrap, wasSwiped)
{
if(cardIdx!=PREV&&cardIdx!=NEXT )
{
vg.comp.callMethod(deckId, 'setWasSwiped', wasSwiped);
vg.comp.callMethod(deckId, 'select',[cardIdx]);
return;
}
else
{
wrap=(wrap==null)?true:wrap;
var deck=vg.comp.getController(deckId);
deck.setWasSwiped(wasSwiped);
var args={};
args.totalCards=deck.items.length - 1;
cardIdx=(cardIdx==NEXT)?1:cardIdx;
var toCard=deck.selectedIndex+cardIdx;
toCard=(toCard > args.totalCards||toCard < 0 )?deck.selectedIndex:toCard;
if(!wrap&&(deck.selectedIndex!=args.totalCards||deck.selectedIndex!=0) )
{
deck.select(toCard );
}
else
{
if(deck.selectedIndex==0&&cardIdx < 0)
{
deck.select(deck.items.length -1);
}
else if(deck.selectedIndex==args.totalCards&&cardIdx > 0)
{
deck.select(0);
}
else
{
deck.select(toCard );
}
}
args.curCard=deck.selectedIndex;
}
vg.comp._configureHiddenItems(document.getElementById(deckId));
if(args) return args;
}
jsCBDloadCardContent=function(cardId, callback)
{
cbd.Navigator.userCallback=callback;
vg.comp.getController(cardId).loadCardContent();
}
jsCBDsetDeckCardContentUrl=function(cardId, url)
{
var deckCard=document.getElementById(cardId);
deckCard.setAttribute("url", url);
}
Deck=function(id, adjustZoom, transDur, lastCardTransDur)
{
var newPosition, controller, isNextGenLocal;
this.base=vg.Controller;
this.base(id, null);
this.items=new Array();
this.id=id;
this.selectedIndex=this.viewNode.getAttribute('selectedcardidx');
this.transType=this.viewNode.getAttribute('transitiontype');
this.lastCardTransType=this.viewNode.getAttribute('lastCardTransitiontype');
this.wasSwiped=false;
this.lastCardTransDur=lastCardTransDur;
this.tempTransType=null;
this.tempTransDur=null;
this.hasCarouselType=(this.viewNode.getAttribute('carouselType')!=null)?true:false;
this.carouselType=this.viewNode.getAttribute('carouselType');
this.slider=vg.html.getFirstChild(this.viewNode);
this.height=this.viewNode.getAttribute('height');
this.isAnimated="true"==this.viewNode.getAttribute('transition');
this.afterInit=false;
this.isAdjustZoom=adjustZoom;
this.transDur=transDur;
this.deckParentController=null;
this._setTransitions();
if(this.vertSlide||this.horizSlide)
{
this._setTransDur(.3);
}
else
{
if(cbd.page.isNextGen)
{
if(this.fadeInOut)
{
this._setTransDur(.25);
}
else
{
this._setTransDur(.5);
}
}
else
{
this._setTransDur(1.5);
}
}
this.easingStr=this.viewNode.getAttribute('easing');
this.PREVIOUS="Previous";
this.PREVIOUS_DISABLED="Previous disabled";
this.NEXT="Next";
this.NEXT_DISABLED="Next disabled";
if(this.selectedIndex!=null&&this.horizSlide)
{
newPosition=-(this.selectedIndex*100);
this.slider.style.left=newPosition+"%";
}
controller=this;
if(this.hasCarouselType) vg.util.execOnPageReady(function(){controller._getCarouselControllers();});
if(this.easingStr)
{
vg.util.execOnPageReady(function(){controller.easing=vg.smil.getEasing(controller.easingStr);});
}
}
Deck.prototype=
{
select:function(cardIdx)
{
if(this.selectedIndex==cardIdx)
{
return;
}
if(cbd.page.isNextGen&&this.isAnimated&&this.fadeInOut )
{
this.items[this.selectedIndex].fadeTo(cardIdx);
}
else
{
this._transitionTo(cardIdx);
}
},
_setTransitions:function()
{
this.fadeInOut=this.transType=="NONE"||this.transType=="CBD_FADE_IN_OUT_DECK";
this.vertSlide=this.transType=="CBD_VERT_SLIDE";
this.horizSlide=this.transType=="CBD_HORIZ_SLIDE";
this.horizFadeSlide=this.transType=="CBD_HORIZ_FADE_SLIDE";
},
setWasSwiped:function(wasSwiped)
{
this.wasSwiped=wasSwiped;
},
_transitionTo:function(cardIdx)
{
this._swapTransitionProperties(cardIdx);
if(!this.horizSlide&&!this.vertSlide&&!this.horizFadeSlide)
{
vg.comp._hideAllItems(this.items);
}
var selectedCard=this.items[cardIdx];
var selectedNode=selectedCard.viewNode;
if(this.isAnimated&&this.fadeInOut)
{
vg.html.setOpacity(selectedNode, '0', this.isAdjustZoom);
}
jsCBDtoggleElement(selectedNode, true);
this.setSelectedCard(vg.comp.getController(selectedNode));
cbd.StateKeeper._setState(this.viewNode.getAttribute('id'), cardIdx, true);
selectedCard.loadCardContent();
selectedCard.animate();
},
_swapTransitionProperties:function(cardIdx)
{
var cardCount=this.items.length,
lastCard=this.selectedIndex==cardCount-1;
if(!this._isLastCard())
{
if(this.tempTransType)
{
this.transType=this.tempTransType;
this.tempTransType=null;
}
if(this.tempTransDur)
{
this.transDur=this.tempTransDur;
this.tempTransDur=null;
}
}
else if(cardIdx==0&&!this.wasSwiped)
{
if(this.lastCardTransType)
{
this.tempTransType=this.transType;
this.transType=this.lastCardTransType;
}
if(this.lastCardTransDur)
{
this.tempTransDur=this.transDur;
this.transDur=this.lastCardTransDur*1000;
}
}
this._setTransitions();
},
_setHeight:function()
{
if(this.afterInit)
{
var curHeight=this.viewNode.style.height;
this.viewNode.style.height="auto";
var toHeight=this.items[this.selectedIndex].viewNode.scrollHeight;
this.viewNode.style.height=curHeight;
var attributes={height:{to:toHeight}};
vg.smil.animateElement({target:this.viewNode, attr:attributes, duration:150, easeIn:false});
}
else
{
var setCardPosition=-(this.selectedIndex*100);
this.slider.style.top=setCardPosition+"%";
vg.html.setHeight(this.viewNode, this.items[this.selectedIndex].viewNode.scrollHeight+"px");
this.afterInit=true;
}
},
addItem:function(controller)
{
var length=this.items.length;
this.items[length]=controller;
controller.index=length;
},
setSelectedCard:function(controller)
{
this.selectedIndex=controller.index;
},
_getCarouselControllers:function()
{
var controller=this;
this._carContLft=document.getElementById(this.id+"_carLft");
this._carContRgt=document.getElementById(this.id+"_carRgt");
vg.html.addEventListener(this._carContLft, 'click', function(){controller._triggerCarousel('left');});
vg.html.addEventListener(this._carContRgt, 'click', function(){controller._triggerCarousel('right');});
this._configCarousel();
},
_triggerCarousel:function(dir)
{
jsCBDselectDeckCard(this.id,(dir=='left')?PREV:NEXT, false);
this._configCarousel();
},
_configCarousel:function()
{
vg.html.removeStyle("carDisabled", this._carContLft);
vg.html.removeStyle("carDisabled", this._carContRgt);
this._setAltText(this._carContLft, this.PREVIOUS);
this._setAltText(this._carContRgt, this.NEXT);
if(this.selectedIndex==0||this.items.length==1)
{
vg.html.addStyle("carDisabled", this._carContLft);
this._setAltText(this._carContLft, this.PREVIOUS_DISABLED);
}
if(this.selectedIndex==this.items.length-1||this.items.length==1)
{
vg.html.addStyle("carDisabled", this._carContRgt);
this._setAltText(this._carContRgt, this.NEXT_DISABLED);
}
},
_setAltText:function(obj,altText)
{
if(obj.tagName!="img")
{
var imgObj=obj.getElementsByTagName('img')[0];
imgObj.setAttribute("alt",altText);
}
else
{
obj.setAttribute("alt",altText);
}
},
_setTransDur:function(defaultTransDur)
{
if(this.transDur==null||this.transDur==''||isNaN(this.transDur))
{
this.transDur=defaultTransDur;
}
else
{
this.transDur=parseFloat(this.transDur);
}
this.transDur=this.transDur*1000;
},
_fadeIn:function(nextCardIdx)
{
this._transitionTo(nextCardIdx);
},
_updateDeckParentComponent:function()
{
var deckParentController=this.deckParentController;
if(deckParentController==null)
{
var deckParentComponent=vg.html.findParentComponent(vg.html._getParentNode(this.viewNode));
if(deckParentComponent)
{
deckParentController=vg.comp.getController(deckParentComponent.id);
}
}
if(deckParentController&&deckParentController._updateScrollingProperties)
{
deckParentController._updateScrollingProperties();
}
},
_isFirstCard:function()
{
return(this.selectedIndex==0);
},
_isLastCard:function()
{
return(this.selectedIndex==this.items.length-1);
},
_isFirstOrLastCard:function()
{
return(this._isFirstCard()||this._isLastCard());
}
}
DeckItem=function(id, selected)
{
this.base=vg.Controller;
var contentNode=document.getElementById(id);
this.base(id, contentNode, true);
this.selected=selected;
this.id=id;
this.onTransCallback=null;
this.deckContr=vg.comp.findController(contentNode, true);
this.deckContr.addItem(this);
var contr=this;
this.onTransCallback=(cbd.page.isNextGen)?function(){contr._finishFadeInOut();}:null;
if(this.selected)
{
if(this.deckContr.vertSlide)
{
this.viewNode.style.overflow="auto";
}
this.deckContr.setSelectedCard(this);
this.loadCardContent(true);
}
}
DeckItem.prototype=
{
setCardContHeight:function()
{
this.contHeight=this.viewNode.scrollHeight;
},
isAnimated:function()
{
return this.deckContr.isAnimated;
},
animate:function()
{
var contentNode=this.contentNode;
if(this.deckContr.isAnimated)
{
if(this.deckContr.horizSlide)
{
this._horizSlide();
}
else if(this.deckContr.vertSlide)
{
this._vertSlide();
}
else if(this.deckContr.horizFadeSlide)
{
this._horizFadeSlide();
}
else
{
this._fadeInOut();
}
}
},
fadeTo:function(nextCard)
{
var deckController=this.deckContr;
this._fadeOut(function(){deckController._fadeIn(nextCard);});
},
_vertSlide:function()
{
var newPosition=-(this.deckContr.selectedIndex*100);
var currentPosition=parseInt(this.deckContr.slider.style.top);
if(!currentPosition)
{
currentPosition=0;
}
var attributes={top:{from:currentPosition, to:newPosition, unit:"%"}};
var THIS=this;
var afterAnim=function()
{
if(THIS.deckContr.height=="auto")
{
THIS.deckContr._setHeight();
}
else
{
THIS.deckContr.items[THIS.deckContr.selectedIndex].viewNode.style.overflow="auto";
}
if(THIS.deckContr.selectedIndex!=0)
{
THIS.deckContr.items[THIS.deckContr.selectedIndex-1].viewNode.style.visibility="hidden";
}
}
var numOfItems=this.deckContr.items.length;
for(var i=0;i < numOfItems;i++)
{
this.deckContr.items[i].viewNode.style.overflow="hidden";
this.deckContr.items[i].viewNode.style.visibility="visible";
}
vg.smil.animateElement({target:this.deckContr.slider, attr:attributes, duration:this.deckContr.transDur, funcFinished:afterAnim, easing:this.deckContr.easing});
},
_horizSlide:function()
{
var newPosition=-(this.deckContr.selectedIndex*100);
var currentPosition=parseInt(this.deckContr.slider.style.left);
if(!currentPosition)
{
currentPosition=0;
}
var attributes={left:{from:currentPosition, to:newPosition, unit:"%"}};
this.horizSlideAnim=vg.smil.animateElement({target:this.deckContr.slider, attr:attributes, duration:this.deckContr.transDur, easing:this.deckContr.easing});
},
_horizFadeSlide:function()
{
var controller=this.deckContr
slider=controller.slider,
transDur=controller.transDur/2;
callback=function()
{
vg.html.setOpacity(slider, '0', controller.isAdjustZoom);
var newPosition=-(controller.selectedIndex*100);
slider.style.left=newPosition+"%";
vg.smil.cbdFadeIn(slider, transDur, null);
};
vg.smil.cbdFadeOut(slider, transDur, callback);
},
_fadeInOut:function(fadeOut, callBack)
{
this._hideBackground();
vg.html.setOpacity(this.viewNode, '0', this.deckContr.isAdjustZoom);
vg.smil.animateElement(this.viewNode,'opacity',this.deckContr.transDur,0,0,1,null, this.onTransCallback);
},
_fadeOut:function(callBack)
{
this._hideBackground();
vg.smil.animateElement(this.viewNode,'opacity',this.deckContr.transDur,0,1,0,null, callBack);
},
_hideBackground:function()
{
var bColor=this.viewNode.style.backgroundColor;
if(bColor==null||bColor=="")
{
this.viewNode.style.backgroundColor="#FFF";
}
},
_finishFadeInOut:function()
{
if(ie8)
{
this.viewNode.style.filter="none";
}
},
loadCardContent:function(init)
{
var contentNode=this.contentNode;
var contentUrl=contentNode.getAttribute('url');
var contr=this;
var deckContr=this.deckContr;
var performAnimation=function(){
if(!deckContr.afterInit&&(deckContr.horizSlide||deckContr.vertSlide))
{
contr.animate();
}
};
if(contentUrl==null||contentUrl=="")
{
if(init!=true)
{
Populator._execute(contentNode, performAnimation);
}
else
{
performAnimation();
}
}
else
{
if(contentUrl.indexOf('javascript:')==0)
{
var js=contentUrl.substring('javascript:'.length);
eval(js);
performAnimation();
}
else
{
jsCBDloadContent(contentUrl, this.id, 'replaceChildren', performAnimation);
}
}
vg.comp._configureSlider(contentNode);
this.handleSelectTable();
deckContr._updateDeckParentComponent();
},
handleSelectTable:function()
{
var nodes=vg.html.getElements(this.contentNode,{tagName:'TH',attrName:'class'});
if(nodes!=null)
{
for(var i=0;nodes!=null&&i < nodes.length;i++)
{
if(nodes[i].className!=null&&nodes[i].className.indexOf(SelectTable.SELECT_ALL_BEHAVIOR) >=0)
{
var controller=vg.comp.findController(nodes[i]);
if(controller)
{
controller.show();
}
break;
}
}
}
}
}
RollOverMenu=function(id, autoplay)
{
this.base=vg.Controller;
this.base(id, null);
this.items=new Array();
this.defaultCard;
var controller=this;
this.autoplay='false';
var defaultCardAttr=this.viewNode.getAttribute('defaultCard');
this.defaultCard=(defaultCardAttr==null)?null:parseInt(defaultCardAttr);
if(autoplay=='true')
{
this.autoplay='true';
setTimeout(function(){controller._autoplayRMDeck(1);}, 3000);
}
}
RollOverMenu.ROLLOVER_HIGHLIGHT_STYLE2=ROLLOVER_HIGHLIGHT_STYLE2="roDeck-sel2";
RollOverMenu.ROLLOVER_HIGHLIGHT_STYLE=ROLLOVER_HIGHLIGHT_STYLE="roDeck-sel";
RollOverMenu.prototype=
{
addItem:function(controller)
{
var length=this.items.length;
this.items[length]=controller;
controller.index=length;
},
_autoplayRMDeck:function(count)
{
var controller=this;
if(count < controller.items.length&&controller.autoplay=='true')
{
var menuItem=this.items[count];
var mouseTarget=menuItem.viewNode.getAttribute('mouseTarget');
if(mouseTarget!=null){
RollOverMenuItem.cbdSelectRMItem(menuItem, mouseTarget);
}
var itemCount=++count;
setTimeout(function(){controller._autoplayRMDeck(itemCount);}, 3000);
if(itemCount==controller.items.length)
{
var menuItem=controller.items[0];
var mouseTarget=menuItem.viewNode.getAttribute('mouseTarget');
setTimeout(function(){RollOverMenuItem.cbdSelectRMItem(menuItem, mouseTarget);}, 3000);
}
}
}
}
RollOverMenuItem=function(id, deckChangeMode)
{
this.base=vg.Controller;
this.base(id, null);
this.deckChangeMode=deckChangeMode.toLowerCase();
this.isMouseEnter=null;
var parentController=vg.comp.findController(this.viewNode, true);
parentController.addItem(this);
var controller=this;
vg.html.addEventListener(this.viewNode, 'click', function(){controller.click();});
vg.html.addEventListener(this.viewNode, 'mouseenter', function(e){controller.highlight();controller.recordEvent(e, 'mouseenter');});
vg.html.addEventListener(this.viewNode, 'mouseleave', function(e){controller.mouseLeave();controller.recordEvent(e, 'mouseleave');});
}
RollOverMenuItem.prototype=
{
recordEvent:function(e, eventName)
{
e=jsCBDgetEvent(e);
e.isRiaEvent=false;
},
highlight:function()
{
var parentController=vg.comp.findController(this.viewNode, true);
if(this.deckChangeMode=="onmouseover")
{
parentController.autoplay='false';
}
this.isMouseEnter='true';
this.select();
},
click:function()
{
var id=this.viewNode.getAttribute('id');
var parentController=vg.comp.findController(this.viewNode, true);
parentController.selected=true;
if(this.deckChangeMode=="onclick"||this.deckChangeMode=="onclick_2" )
{
var menuItem=vg.comp.getController(id);
var parentController=vg.comp.findController(this.viewNode, true);
vg.html.addOrRemoveStyleFromNodes(RollOverMenu.ROLLOVER_HIGHLIGHT_STYLE2, parentController.items, false);
jsCBDaddStyle(menuItem, RollOverMenu.ROLLOVER_HIGHLIGHT_STYLE2);
var clickTarget=this.viewNode.getAttribute('clickTarget');
eval(clickTarget);
}
if(this.deckChangeMode=="onmouseover")
{
RollOverMenuItem.cbdDoRMonclick(id);
var mouseTarget=this.viewNode.getAttribute('mouseTarget');
eval(mouseTarget);
}
},
select:function()
{
var id=this.viewNode.getAttribute('id');
setTimeout("RollOverMenuItem.cbdDoRMmouseEnter('"+id+"')" , 150 );
},
mouseLeave:function()
{
this.isMouseEnter=false;
if(this.deckChangeMode=="onmouseover")
{
var id=this.viewNode.getAttribute('id');
setTimeout("RollOverMenuItem.cbdDoRMmouseLeave('"+id+"')" , 150 );
}
}
}
RollOverMenuItem.cbdSelectRMItem=function(menuItem, jsTarget)
{
var parentController=vg.comp.findController(menuItem.viewNode, true);
vg.html.addOrRemoveStyleFromNodes(RollOverMenu.ROLLOVER_HIGHLIGHT_STYLE, parentController.items, false);
jsCBDaddStyle(menuItem, RollOverMenu.ROLLOVER_HIGHLIGHT_STYLE);
if(jsTarget!=null)
{
eval(jsTarget);
}
}
RollOverMenuItem.cbdDoRMmouseEnter=function(menuItemId)
{
var menuItem=vg.comp.getController(menuItemId);
var isMouseEnter=menuItem.isMouseEnter;
if(isMouseEnter=='true'||isMouseEnter=='autoPlay')
{
var mouseTarget=menuItem.viewNode.getAttribute('mouseTarget');
_cbdClosePrevSelectOneMenu();
RollOverMenuItem.cbdSelectRMItem(menuItem, mouseTarget);
}
}
RollOverMenuItem.cbdDoRMmouseLeave=function(menuItemId)
{
var menuItem=vg.comp.getController(menuItemId);
var parentController=vg.comp.findController(menuItem.viewNode, true);
var menuItems=parentController.items;
var defaultCardAttr=parentController.defaultCard;
var size=menuItems.length;
var mouseState='false';
var mouseEnter=null;
for(var i=1;i < size;i++)
{
mouseEnter=menuItems[i].isMouseEnter;
if(mouseEnter=='true') mouseState='true';
}
if(!isEmpty(defaultCardAttr))
{
defaultCardAttr=parseInt(defaultCardAttr);
if(defaultCardAttr >=0&&defaultCardAttr < size&&mouseState=='false')
{
for(var i=1;i < size;i++)
{
if(menuItems[i].viewNode.getAttribute('idx')==defaultCardAttr)
defaultCardAttr=i;
}
var menuItem=menuItems[defaultCardAttr];
var mouseTarget=menuItem.viewNode.getAttribute('mouseTarget');
RollOverMenuItem.cbdSelectRMItem(menuItem, mouseTarget);
if(parentController.selected)
{
vg.html.addOrRemoveStyleFromNodes(RollOverMenu.ROLLOVER_HIGHLIGHT_STYLE2, parentController.items, false);
jsCBDaddStyle(menuItem, RollOverMenu.ROLLOVER_HIGHLIGHT_STYLE2);
}
}
}
}
RollOverMenuItem.cbdDoRMonclick=function(menuItemId)
{
var menuItem=vg.comp.getController(menuItemId);
var menuItemNo=menuItem.viewNode.getAttribute('idx');
var parentController=vg.comp.findController(menuItem.viewNode, true);
var defaultCard=parentController.defaultCard;
if(!isEmpty(defaultCard))
{
parentController.defaultCard=menuItemNo;
}
vg.html.addOrRemoveStyleFromNodes(RollOverMenu.ROLLOVER_HIGHLIGHT_STYLE2, parentController.items, false);
jsCBDaddStyle(menuItem, RollOverMenu.ROLLOVER_HIGHLIGHT_STYLE2);
}
jsCBDselectRMItem=function(menuItemId)
{
var menuItem=vg.comp.getController(menuItemId);
var parentController=vg.comp.findController(menuItem.viewNode, true);
parentController.autoplay='false';
var menuItem=vg.comp.getController(menuItemId);
var jsTarget=menuItem.viewNode.getAttribute('mouseTarget');
if(jsTarget==null)
{
jsTarget=menuItem.viewNode.getAttribute('clickTarget');
}
RollOverMenuItem.cbdSelectRMItem(menuItem, jsTarget);
RollOverMenuItem.cbdDoRMonclick(menuItemId);
}
jsCBDmouseOverRMItem=function(menuItemId)
{
var menuItem=vg.comp.getController(menuItemId);
var parentController=vg.comp.findController(menuItem.viewNode, true);
parentController.autoplay='false';
var menuItem=vg.comp.getController(menuItemId);
var mouseTarget=menuItem.viewNode.getAttribute('mouseTarget');
RollOverMenuItem.cbdSelectRMItem(menuItem, mouseTarget);
}
vg.util.isIE7ZoomedInOut=function()
{
if(ie7)
{
if(self.document.body.parentElement.offsetWidth!=self.document.body.offsetWidth)
{
return true;
}
}
return false;
}
vg.comp.HIGHLIGHT_STYLE=HIGHLIGHT_STYLE="callout";
CheckBox=function(id, row, cell)
{
this.base=vg.Controller;
this.id=id;
this.base(id, null);
this.highlightObj=vg.html.findAncestor(this.viewNode,{tagName:(row)?'TR':'TD'});
var controller=this;
vg.html.addEventListener(this.viewNode, 'click', function(){controller.select()});
this.select();
}
CheckBox.prototype=
{
select:function()
{
if(this.viewNode.checked)
{
this.highlight();
}
else
{
this.unhighlight();
}
},
highlight:function()
{
jsCBDaddStyle(this.highlightObj, vg.comp.HIGHLIGHT_STYLE);
},
unhighlight:function()
{
jsCBDdeleteStyle(this.highlightObj, vg.comp.HIGHLIGHT_STYLE);
}
}
RadioButton=function(id, group, row, cell)
{
this.base=vg.Controller;
this.id=id;
this.group=group;
this.base(id, null);
this.highlightObj=vg.html.findAncestor(this.viewNode,{tagName:(row)?'TR':'TD'});
var controller=this;
vg.html.addEventListener(this.viewNode, 'click', function(){controller.select()});
this.select();
}
RadioButton.prototype=
{
select:function()
{
var results=vg.validation.getTargetInputs(this.group);
for(var i=0;i < results.length;i++)
{
if(results[i].jsController)
{
if(results[i].checked)
{
results[i].jsController.highlight();
}
else
{
results[i].jsController.unhighlight();
}
}
}
},
highlight:function()
{
jsCBDaddStyle(this.highlightObj, vg.comp.HIGHLIGHT_STYLE);
},
unhighlight:function()
{
jsCBDdeleteStyle(this.highlightObj, vg.comp.HIGHLIGHT_STYLE);
}
}
RadioButton.setSelectOneRadioValue=function(id, value)
{
var radioComp=document.getElementById(id);
if(radioComp.getAttribute("type")==="radioGroup")
{
radioComp=radioComp.parentNode;
}
if(radioComp!=null)
{
var options=radioComp.getElementsByTagName('input'),
length=options.length;
for(var i=0;i < length;i++)
{
var option=options[i];
if(option.value==value)
{
option.checked=true;
break;
}
}
}
}
RadioButton.getSelectOneRadioValue=function(id)
{
"use strict";
var radioComp=document.getElementById(id),
options,
index;
if(radioComp.getAttribute("type")==="radioGroup")
{
radioComp=radioComp.parentNode;
}
if(radioComp!==null)
{
options=radioComp.getElementsByTagName('input');
index=options.length;
while(index--)
{
if(options[index].checked===true)
{
return options[index].value;
}
}
}
};
vg.expRow._hasExpandedRow=false;
vg.expRow.colImg=cbd.page._cbdImagePath+"icons/nav_flipperopen.gif";
vg.expRow.expImg=cbd.page._cbdImagePath+"icons/nav_flipperclosed.gif";
vg.expRow._toggleFlipperImage=function(node, show)
{
node.setAttribute("src", show?vg.expRow.colImg:vg.expRow.expImg);
}
vg.expRow._loadUrl=function(node, location)
{
var parentTr=vg.html.findAncestor(node,{tagName:'tr'});
var rowNumber=vg.html.getSiblings(parentTr,{tagName:'tr'}, '-').length+1;
var table=vg.html.findAncestor(node,{tagName:'table'});
var tableId=table.getAttribute('id');
var url=node.getAttribute('expandUrl');
var alwaysLoad=node.getAttribute('alwaysLoad')=="true";
var loaded=node.getAttribute('loaded')=="true";
if(alwaysLoad||!loaded)
{
jsCBDloadContent(url, location, 'replaceChildren', null, tableId+rowNumber);
if(!loaded)
{
node.setAttribute('loaded', 'true');
}
}
}
vg.expRow._createRow=function(node)
{
var parentTr=vg.html.findAncestor(node,{tagName:'tr'});
var nextRow=vg.html.getSibling(parentTr,{tagName:'tr'}, '+');
var colspan=vg.html.getElements(parentTr,{tagName:'td'}).length;
var newDiv=document.createElement("div");
var newTd=document.createElement("td");
newTd.setAttribute("colSpan", colspan);
newTd.appendChild(newDiv);
var newTr=document.createElement("tr");
newTr.setAttribute("type", "detailRow");
newTr.appendChild(newTd);
if(nextRow!=null)
{
parentTr.parentNode.insertBefore(newTr, nextRow);
}
else
{
parentTr.parentNode.appendChild(newTr);
}
var expandedType=node.getAttribute("expandedType");
if(expandedType=='ROW_INFO')
{
vg.html.addStyle("infoMsg", newTr);
vg.html.addStyle("nr", newTd);
newTd.setAttribute("align", "left");
vg.html.addStyle("msgInfo", newDiv);
}
else if(expandedType=='ROW_WARN')
{
vg.html.addStyle("warnMsg", newTr);
vg.html.addStyle("nr", newTd);
newTd.setAttribute("align", "left");
vg.html.addStyle("msgWarn", newDiv);
}
}
vg.expRow._toggleExpandableRow=function(node, open, highlight)
{
var parentTr=vg.html.findAncestor(node,{tagName:'tr'});
var nextRow=vg.html.getSibling(parentTr,{tagName:'tr'}, '+');
var hasNewRow=nextRow!=null&&nextRow.getAttribute("type")=="detailRow";
var expandedType=node.getAttribute("expandedType");
var url=node.getAttribute("expandUrl");
var message=node.getAttribute("expandedRowMessage");
if(!hasNewRow)
{
vg.expRow._createRow(node);
}
var newTr=vg.html.getSibling(parentTr,{tagName:'tr'}, '+');
var newTd=vg.html.getElements(newTr,{tagName:"td"})[0];
var newDiv=vg.html.getElements(newTd,{tagName:"div"})[0];
var show=(!jsCBDisVisibleElement(newTr)||!hasNewRow);
if(open!=null)
{
show=open;
}
jsCBDtoggleElement(newTr, show);
if(highlight)
{
vg.html.addOrRemoveStyle("flipperRowOpen", parentTr, show);
vg.html.addOrRemoveStyle("flipperRowClosed", parentTr,!show);
}
if(!isEmpty(message))
{
if(message.charAt(0)=='#')
{
var messageId=removeChars(message, '#');
var contentDiv=document.getElementById(messageId);
newDiv.innerHTML=contentDiv.innerHTML;
}
else
{
jsCBDsetElementInnerHtml(newDiv, '<div>'+message+'</div>');
}
}
else if(url.charAt(0)=='#')
{
url=removeChars(url, '#');
var contentDiv=document.getElementById(url);
var content=contentDiv.innerHTML;
jsCBDsetElementInnerHtml(newDiv, '<div>'+content+'</div>');
}
else
{
vg.expRow._loadUrl(node, newDiv);
}
if('ROW_DETAIL'==expandedType)
{
vg.expRow._toggleFlipperImage(node, show);
}
else if('ROW_INFO'==expandedType)
{
vg.html.addOrRemoveStyle("infoInd", parentTr, show);
vg.html.addOrRemoveStyle("infoMsg", newTr, show);
}
else
{
vg.html.addOrRemoveStyle("warnInd", parentTr, show);
vg.html.addOrRemoveStyle("warnMsg", newTr, show);
}
}
vg.expRow._openAllExpandedRows=function(tableId)
{
var searchNode=tableId?document.getElementById(tableId):document;
var expandedRows=vg.html.getElements(searchNode,{tagName:'img', attrName:'expanded', attrValue:'true'});
var rowsLength=expandedRows.length;
for(var i=0;i < rowsLength;i++)
{
vg.expRow._toggleExpandableRow(expandedRows[i], true);
}
}
vg.resultsRow._mouseEnter=function(node)
{
var attributes={backgroundColor:{to:'#E6EDF1'}};
vg.smil.animateElement({target:node, attr:attributes, duration:250, colorAnimation:true});
}
vg.resultsRow._mouseLeave=function(node)
{
var attributes={backgroundColor:{to:'#FFFFFF'}};
vg.smil.animateElement({target:node, attr:attributes, duration:350, colorAnimation:true});
}
NavDeck=function(id)
{
this.base=vg.Controller;
this.base(id, null);
this.state=this.viewNode.getAttribute("state");
this.id=this.viewNode.getAttribute("id");
this.isAnimationEnabled=(this.viewNode.getAttribute("transition")==='true');
this.isTypeTab=this.viewNode.getAttribute('type')=='tab';
this.curTab=0;
this.onTransCallback=null;
this.nodes={};
this.nodes['cbdProcNav']=document.getElementById('CBD_PROCESS_NAV'+this.id);
this.nodes['cbdNavDeck']=document.getElementById('CBD_NAV_DECK'+this.id);
this.nodes['rbscrolldiv']=vg.html.getElements(this.nodes['cbdNavDeck'],{tagName:'div', attrName:'class', attrValue:'roundBoxScrollDiv'}, null )[0];
if(!this.isInitState())
{
var navDeck=this;
vg.html.addEventListener(window, 'load', function(){navDeck.executeCustomTransition()});
}
cbd.Navigator.deckId=id.split('_navDeck',1);
}
NavDeck.prototype=
{
executeCustomTransition:function()
{
var transFunction=this.viewNode.getAttribute("initialTransition");
if(transFunction!=null){eval(transFunction);}
},
startNav:function()
{
var procNavHolder=this.nodes['cbdProcNav'];
var boxNavDeck=vg.html.findAncestor(procNavHolder,{tagName:'div'}, function(node){return node.className&&node.className.indexOf("webReg") >=0;});
if(this.isInitState())
{
this.executeCustomTransition();
vg.html.replaceClass(this.viewNode, boxNavDeck?"initial":"OAinitial", boxNavDeck?"inProgress":"");
this.state='inProgress';
}
},
isInitState:function()
{
return this.state=='init';
}
}
NavDeck.tabAnimation=function(navDeck, isAnimationEnabled)
{
this.navDeck=navDeck;
this.navDeckNode=document.getElementById(navDeck.id);
this.navDeckTransDur="500";
this.navDeckInitTransDur="350";
this.isAnimationEnabled=isAnimationEnabled
}
NavDeck.tabAnimation.prototype=
{
isDeckCurrent:function()
{
return(navDeck.curTab==navDeck.curServerSideTab);
},
doTransition:function(initialDeckLoadCompleted)
{
if((!this.isDeckCurrent())&&initialDeckLoadCompleted)
{
this._doTransition(true);
navDeck.curTab=navDeck.curServerSideTab;
}
},
_doTransition:function(doYUIEaseIn)
{
if(!this.isAnimationEnabled) return;
var fromWidth=this._getAnimFromWidth();
var toWidth=vg.html.getObjWidth(navDeck.nodes['cbdNavDeck']);
var toHeight=vg.html.getObjHeight(navDeck.nodes['cbdNavDeck']);
if(navDeck.transDir=="left")
{
vg.html.addStyle("floatRight", navDeck.nodes['cbdNavDeck']);
}
jsCBDtoggleVisibility(navDeck.nodes['rbscrolldiv'], false);
jsCBDtoggleElement(navDeck.nodes['rbscrolldiv'], false);
var THIS=this;
var afterAnim=function(){THIS._onTransComplete()};
var attributes={width:{from:fromWidth, to:toWidth}, height:{from:0, to:toHeight}}
vg.smil.animateElement({target:navDeck.nodes['cbdNavDeck'], attr:attributes, duration:this.navDeckTransDur, funcFinished:afterAnim, easeIn:doYUIEaseIn});
},
_onTransComplete:function()
{
navDeck.nodes['cbdNavDeck'].style.width="100%";
vg.html.removeStyle("floatRight", navDeck.nodes['cbdNavDeck']);
setTimeout(function()
{
jsCBDtoggleElement(navDeck.nodes['rbscrolldiv'], true);
jsCBDtoggleVisibility(navDeck.nodes['rbscrolldiv'], true);
navDeck.nodes['cbdNavDeck'].style.height="auto";
if(navDeck.onTransCallback!=null) navDeck.onTransCallback(cbd.Navigator.cardId);
}, 50 );
},
_getAnimFromWidth:function()
{
if(navDeck.totalTabs%2 > 0 )
{
navDeck.transDir=(navDeck.curServerSideTab <=Math.floor(navDeck.totalTabs/2)+1)?"right":"left";
}
else
{
navDeck.transDir=(navDeck.curServerSideTab <=navDeck.totalTabs/2)?"right":"left";
}
navDeck.navTabs=vg.html.getElements(navDeck.nodes['cbdProcNav'],{tagName:'div', attrName:'class', attrValue:'navTabItem'}, null );
var procNavGeoData=vg.html.getObjSizePosition(navDeck.nodes['cbdProcNav']);
var tabGeoData=vg.html.getObjSizePosition(navDeck.navTabs[navDeck.curServerSideTab-1]);
return(navDeck.transDir=="right")?tabGeoData.x+tabGeoData.w - procNavGeoData.x+4:procNavGeoData.x+procNavGeoData.w - tabGeoData.x - 4;
},
_doInitialTrans:function(transDiv1,transDiv2,fadeInDur)
{
jsCBDtoggleElement(transDiv1, false);
jsCBDtoggleElement(transDiv2, true);
if(this.isAnimationEnabled)
{
this._doInitialTransAnimation(transDiv1,transDiv2,fadeInDur);
}
else
{
jsCBDtoggleVisibility(transDiv2, true);
}
},
_doInitialTransAnimation:function(transDiv1,transDiv2,fadeInDur)
{
vg.html.setOpacity(transDiv2, 0.0);
jsCBDtoggleVisibility(transDiv2, true);
var attributes={opacity:{to:1}};
vg.smil.animateElement({target:transDiv2, attr:attributes, duration:fadeInDur});
var attributes={paddingTop:{from:100, to:0}}
vg.smil.animateElement({target:this.navDeckNode, attr:attributes, duration:this.navDeckInitTransDur, easeIn:false});
vg.html.replaceClass(this.navDeck, "OAinitial","");
navDeck.curTab=navDeck.curServerSideTab;
this._doTransition(false);
},
_doReverseTransPhase1:function(transDiv1,transDiv2)
{
var fromWidth=this._getAnimFromWidth();
var toWidth=vg.html.getObjWidth(navDeck.nodes['cbdNavDeck']);
var toHeight=vg.html.getObjHeight(navDeck.nodes['cbdNavDeck']);
if(navDeck.transDir=="left")
{
vg.html.addStyle("floatRight", navDeck.nodes['cbdNavDeck']);
}
var attr1={height:{from:toHeight, to:0}}
vg.smil.animateElement({target:navDeck.nodes['cbdNavDeck'], attr:attr1, duration:this.navDeckTransDur, easeIn:false});
jsCBDtoggleVisibility(navDeck.nodes['rbscrolldiv'], false);
jsCBDtoggleElement(navDeck.nodes['rbscrolldiv'], false);
var THIS=this;
var afterAnim=function(){THIS._doReverseTransPhase2(transDiv1,transDiv2)};
var attr2={paddingTop:{from:0, to:100}}
vg.smil.animateElement({target:this.navDeckNode, attr:attr2, duration:this.navDeckInitTransDur, funcFinished:afterAnim, easeIn:false});
var attr3={opacity:{to:0}};
vg.smil.animateElement({target:transDiv2, attr:attr3, duration:this.navDeckTransDur, easeIn:false});
},
_doReverseTransPhase2:function(transDiv1,transDiv2)
{
jsCBDtoggleElement(transDiv2, false);
jsCBDtoggleElement(transDiv1, true);
vg.html.setOpacity(transDiv1, 0.0);
jsCBDtoggleVisibility(transDiv2, false);
var THIS=this;
var afterAnim=function(){THIS._onReverseTransComplete(transDiv1,transDiv2)};
var attributes={opacity:{to:1}};
vg.smil.animateElement({target:transDiv1, attr:attributes, duration:this.navDeckTransDur, funcFinished:afterAnim, easeIn:false});
},
_onReverseTransComplete:function(transDiv1,transDiv2)
{
navDeck.nodes['cbdNavDeck'].style.width="100%";
navDeck.nodes['cbdNavDeck'].style.height="100%";
jsCBDtoggleVisibility(navDeck.nodes['rbscrolldiv'], true);
jsCBDtoggleElement(navDeck.nodes['rbscrolldiv'], true);
vg.html.setOpacity(navDeck.nodes['rbscrolldiv'], 1.0);
vg.html.removeStyle("floatRight", navDeck.nodes['cbdNavDeck']);
}
}
jsCBDshowNavDeck=function(navDeckId,transDiv1Id,transDiv2Id,initTransDur,transDur)
{
var transDiv1=document.getElementById(transDiv1Id);
var transDiv2=document.getElementById(transDiv2Id);
var navDeck=vg.comp.getController(navDeckId+"_navDeck");
navDeck.animType.navDeckInitTransDur=(initTransDur!=null)?initTransDur:navDeck.animType.navDeckInitTransDur;
navDeck.animType.navDeckTransDur=(transDur!=null)?transDur:navDeck.animType.navDeckTransDur;
jsCBDtoggleElement(navDeck.nodes['rbscrolldiv'], true);
var initTransPhase=function(){navDeck.animType._doInitialTrans(transDiv1,transDiv2,navDeck.animType.navDeckInitTransDur)};
if(navDeck.viewNode.getAttribute("transition")==='true')
{
var attributes={opacity:{to:0}};
vg.smil.animateElement({target:transDiv1, attr:attributes, duration:navDeck.animType.navDeckInitTransDur, funcFinished:initTransPhase, easeIn:false});
}
else
{
jsCBDtoggleVisibility(transDiv1, false);
initTransPhase();
}
}
jsCBDhideNavDeck=function(navDeckId,transDiv1Id,transDiv2Id)
{
var transDiv1=document.getElementById(transDiv1Id);
var transDiv2=document.getElementById(transDiv2Id);
var navDeck=vg.comp.getController(navDeckId+"_navDeck");
var reverseTransPhase1=function(){navDeck.animType._doReverseTransPhase1(transDiv1,transDiv2)};
var attributes={opacity:{to:0}};
vg.smil.animateElement({target:navDeck.nodes['rbscrolldiv'], attr:attributes, duration:navDeck.animType.navDeckInitTransDur, funcFinished:reverseTransPhase1, easeIn:false});
}
vg.validation.validateAndSubmitParentForm=function(caller, showWaitMsg, disableWT, suppressErrorLayer)
{
var form=_cbdGetParentForm(caller);
var isValid=vg.validation.validateAndSubmitForm(form, caller, showWaitMsg, disableWT, suppressErrorLayer);
return isValid;
}
vg.validation.submitParentForm=function(caller, showWaitMsg, disableWT)
{
var form=_cbdGetParentForm(caller);
vg.validation.submitForm(form, caller, showWaitMsg, disableWT);
}
vg.validation.validateAndSubmitForm=function(form, submitBtn, showWaitMsg, disableWT, suppressErrorLayer)
{
var isValid=vg.validation.validateForm(form, null, suppressErrorLayer);
if(isValid )
{
vg.validation.submitForm(form, submitBtn, showWaitMsg, disableWT);
}
return isValid;
}
vg.validation.submitForm=function(form, caller, showWaitMsg, disableWT)
{
if(form.tagName=='DIV')
{
var newForm=document.createElement("form");
var formParent=form.parentNode;
newForm.setAttribute('enctype', form.getAttribute('enctype'));
newForm.setAttribute('action', form.getAttribute('action'));
newForm.setAttribute('method', form.getAttribute('method'));
newForm.setAttribute('id', form.getAttribute('id'));
newForm.setAttribute('name', form.getAttribute('name'));
if(ie)
{
newForm.innerHTML=form.innerHTML;
}
else
{
while(vg.html.getFirstChild(form))
{
var node=vg.html.getFirstChild(form);
form.removeChild(node);
newForm.appendChild(node);
}
}
formParent.removeChild(form);
formParent.appendChild(newForm);
form=newForm;
}
_cbdDisableNestedForm(form, true);
if(vg.comp.isCommandComp(caller))
{
caller=document.getElementById(caller.id);
vg.comp.trackCommandComponent(caller);
_cbdDisableSubmitButton();
}
var formElements=vg.html.retrieveInputsWithDefaultValues(form);
vg.html.clearInputDefaultValues(formElements);
form.submit();
var formId=form.getAttribute('id');
_cbdSetButtonHiddenInput(formId, "");
vg.html.resetInputDefaultValues(formElements);
if(showWaitMsg=='true')
{
jsCBDtoggle('main', false);
jsCBDtoggle('msgOnSubmit', true);
}
}
vg.validation.validateFormById=function(formId, suppressErr, suppressErrorLayer)
{
return vg.validation.validateForm(document.getElementById(formId), suppressErr, suppressErrorLayer);
}
vg.validation.suppressErrorLayer=function(flag)
{
vg.validation.isSuppressErrorLayer=flag;
}
vg.validation.validateForm=function(form, suppressErr, suppressErrorLayer)
{
var isFormValid=true;
var firstInvalidElem=null;
var formId=form.getAttribute("id");
vg.validation.clearValidationObserverErrors(formId);
var skipErrSummary=!(document.getElementById("errSummary")||document.getElementById("errSummary_span"));
var elements=vg.html.getFormElements(form);
for(var i=0;i < elements.length;++i)
{
isFormValid=vg.validation.validateElement(elements[i], true, skipErrSummary)&&isFormValid;
if(!isFormValid&&firstInvalidElem==null)
{
firstInvalidElem=elements[i];
}
}
elements=vg.validation.getCalculatedElems(form);
for(var i=0;i < elements.length;++i)
{
isFormValid=vg.validation.validateElement(elements[i], true, skipErrSummary)&&isFormValid;
if(!isFormValid&&firstInvalidElem==null)
{
firstInvalidElem=elements[i];
}
}
if(suppressErr)
return isFormValid;
if(!isFormValid)
{
if(firstInvalidElem!=null)
{
vg.validation.registerFirstInvalidElem(firstInvalidElem);
}
if(!suppressErrorLayer&&!vg.validation.isSuppressErrorLayer)
{
var customErrorLayerId=form.getAttribute("customErrorLayerId");
vg.validation.openErrorLayer(customErrorLayerId);
}
}
vg.validation.triggerValidationObservers(formId);
return isFormValid;
}
vg.validation.triggerValidationObservers=function(formId)
{
var valObserverArrays=null;
if(formId)
{
valObserverArrays=new Object();
valObserverArrays[formId]=vg.validation._valObservers[formId];
}
else
{
valObserverArrays=vg.validation._valObservers;
}
for(j in valObserverArrays)
{
var valObservers=valObserverArrays[j];
if(!isEmpty(valObservers) )
{
var valObsLength=valObservers.length;
for(var i=0;i < valObsLength;i++)
{
var node=document.getElementById(valObservers[i]);
if(node)
{
var controller=vg.comp.findController(node, false);
if(controller)
{
controller._triggerValidationObserver(vg.html.getElement(valObservers[i]) );
}
}
}
}
}
vg.validation.valObserversTimeOut=null;
}
vg.validation.clearValidationObserverErrors=function(formId)
{
var valObservers=vg.validation._valObservers[formId];
if(!isEmpty(valObservers) )
{
var valObsLength=valObservers.length;
for(var i=0;i < valObsLength;i++)
{
var validationObserverNode=document.getElementById(valObservers[i]);
if(validationObserverNode)
{
validationObserverNode.errorInputs=null;
}
}
}
}
vg.validation.getCalculatedElems=function(context)
{
return vg.html.getElements(context,{tagName:'span', attrName:'type', attrValue:'CALCULATED'});
}
vg.validation.validateElementById=function(input)
{
var compInput=vg.html.getElement(input);
var elements=vg.html.getFormElements(compInput);
var isInputValid=true;
for(var i=0;i < elements.length;++i)
{
isInputValid=vg.validation.validateElement(elements[i], true)&&isInputValid;
}
return isInputValid;
}
vg.validation.validateElement=function(input, isSubmit, skipErrSummary)
{
if(!vg.validation.isValidateClientSide(input))
{
return true;
}
var inputType=input.getAttribute('type');
if(inputType=='button'||inputType=='hidden')
{
return true;
}
var id=input.getAttribute('name');
if(id==null)
{
id=input.getAttribute('id');
}
var isValid;
var isInputGroup=vg.validation.isInputGroup(input);
var isDispersedInputGroup=vg.validation.isDispersedInputGroup(input);
var isDirty=input.dirty;
if(!isSubmit&&!isDirty&&(vg.validation.isEmptyInput(input)||input.value=='none'||isInputGroup))
{
isValid=true;
}
else
{
var isFirstInput=input.getAttribute('firstInput')=='true';
if(isSubmit&&isDispersedInputGroup&&!isFirstInput)
{
return true;
}
else
{
var hasDefaultText=vg.html.inputHasDefaultText(input);
if(hasDefaultText)
{
isValid=validateRequired(id, skipErrSummary);
}
else
{
isValid=jsCBDvalidateById(id, isSubmit, true, skipErrSummary);
}
}
}
var methodToCall=isValid?
vg.validation.setValid:vg.validation.setInvalid;
var isStateChanged=(isValid!=vg.validation.isValid(input));
if(isStateChanged)
{
if((!isSubmit&&isInputGroup)||isDispersedInputGroup)
{
var targetInputs=vg.validation.getTargetInputs(input.name);
for(var i=0;i < targetInputs.length;++i)
{
methodToCall.call(this, targetInputs[i]);
}
}
else
{
methodToCall.call(this, input);
}
}
vg.validation._notifyValidationObserver(input, isValid);
return isValid;
}
vg.validation.isValid=function(input)
{
return(input.valid==null||input.valid==true)
}
vg.validation.setValid=function(input)
{
"use strict";
var inputElm=vg.html.getElement(input),
cellTarget=null,
name="",
errorManagerController=null;
inputElm.valid=true;
cellTarget=vg.validation.getCellTarget(inputElm);
if(cellTarget!==null)
{
jsCBDdeleteStyle(cellTarget, "err");
vg.html.removeEventListener(cellTarget, 'mouseenter', vg.validation.showErrEvt, "error_in");
vg.html.removeEventListener(cellTarget, 'mouseleave', vg.validation.hideErrEvt, "error_out");
if(cbd.browser.isTouchScreen)
{
vg.html.removeEventListenerById(window, "INPUT_ORIENTATIONCHANGE_"+input.id);
}
vg.validation.hideErr(false);
}
if(cbd.page.isNextGen)
{
name=inputElm.name||inputElm.id;
errorManagerController=vg.comp.getController(name, vg.ErrorManager.TYPE);
if(errorManagerController!==null)
{
errorManagerController.updateErrorStatus(false);
}
}
};
vg.validation.setInvalid=function(input)
{
"use strict";
var lastTwoDigitsOfID="",
cellTarget=null,
name="";
input.valid=false;
input.dirty=true;
if(window.isWtLogInputErrors)
{
lastTwoDigitsOfID=input.id.substr(input.id.length - 2);
if(!vg.validation.isInputGroup(input)||(vg.validation.isInputGroup(input)&&lastTwoDigitsOfID===":0"))
{
jsCBDSendDCSTagsThenClear("DCSext.CBDerr", input.id);
}
}
cellTarget=vg.validation.getCellTarget(input);
cellTarget.childInput=input;
jsCBDaddStyle(cellTarget, "err");
cellTarget.setAttribute('errTd', 'true');
vg.html.addEventListener(cellTarget, 'mouseenter', vg.validation.showErrEvt, "error_in");
vg.html.addEventListener(cellTarget, 'mouseleave', vg.validation.hideErrEvt, "error_out");
if(cbd.page.isNextGen)
{
name=input.name?input.name:input.id;
vg.comp.getController(name,vg.ErrorManager.TYPE).updateErrorStatus(true);
if(cbd.browser.isTouchScreen)
{
vg.html.addEventListener(window, vg.event.BROWSER_RESIZE_END, function(e){
if(vg.ErrorManager.currentErrorInputId===input.id&&input.valid===false)
{
vg.validation.hideErr();
vg.validation.showErr(input);
}
}, "INPUT_BROWSER_RESIZE_END_"+input.id);
}
}
};
vg.validation._valObservers=new Object();
vg.validation.pageHasValObservers=false;
vg.validation._notifyValidationObserver=function(input, isValid)
{
if(!vg.validation.pageHasValObservers)
{
return;
}
var validationObserverNode=vg.html.findAncestor(input,{attrName:'validationObserver'});
if(validationObserverNode&&validationObserverNode.getAttribute('validationObserver')=='true')
{
var validationObserverId=validationObserverNode.getAttribute("id");
var formId=_cbdGetParentForm(validationObserverNode).getAttribute("id");
var valObservers=vg.validation._valObservers[formId];
var alreadyInArray=false;
if(valObservers)
{
var valObsLength=valObservers.length;
for(var i=0;i < valObsLength&&!alreadyInArray;i++)
{
if(validationObserverId==valObservers[i])
{
alreadyInArray=true;
}
}
}
else
{
vg.validation._valObservers[formId]=new Array();
valObservers=vg.validation._valObservers[formId];
}
if(!alreadyInArray)
{
valObservers[valObservers.length]=validationObserverId;
}
var controller=vg.comp.findController(validationObserverNode, false);
if(controller)
{
controller._updateValidationObserverErrors(input, validationObserverNode,!isValid);
}
else
{
var viewNodeId=vg.html.getCompViewNode(validationObserverNode).id;
if(viewNodeId )
{
if(!window.observerInputList )
{
observerInputList=new Array();
}
if(!observerInputList[viewNodeId])
{
observerInputList.push(viewNodeId);
observerInputList[viewNodeId]=new Array();
}
observerInputList[viewNodeId].push({input:input, node:validationObserverNode, valid:isValid});
}
}
}
}
vg.validation.errMouseenter=function(elem)
{
return function(e){
if(vg.validation.findTargetInput(e).id==elem.id)
{
vg.validation.showErr(e);
}
};
}
vg.validation.showErrEvt=function(e)
{
"use strict";
var input=vg.validation.findTargetInput(e),
cellTarget=null;
if(input)
{
cellTarget=vg.validation.getCellTarget(input, e);
vg.validation.showErr(input, cellTarget);
}
};
vg.validation.hideErrEvt=function(e)
{
vg.validation.hideErr(false);
}
vg.validation.showErr=function(input, cellTarget, errorFromServer)
{
"use strict";
input=vg.html.getElement(input);
if(input===null||input.valid)
{
return;
}
if(!cellTarget)
{
cellTarget=vg.validation.getCellTarget(input);
}
if(cellTarget.offsetHeight&&cellTarget.offsetHeight===0)
{
return;
}
var errLayer=document.getElementById(FORM_FIELD_INFO),
errLayerContents=document.getElementById("form-field-info-contents"),
errorMessageIFrame=document.getElementById("rderr_iframe_cover"),
position=vg.position.positions,
dispLoc=position.AUTO,
visibleErrorLayer,
name,
errLayerController;
errLayerContents.innerHTML=vg.validation.getErrMsg(input);
clearTimeout(vg.validation.blurErrTimeout);
jsCBDtoggleElement(errLayer, true);
if(errorMessageIFrame)
{
visibleErrorLayer=vg.html.getFirstChild(errLayer);
if(visibleErrorLayer)
{
vg.html.setHeight(errorMessageIFrame, visibleErrorLayer.clientHeight+1+"px" );
vg.html.setWidth(errorMessageIFrame, visibleErrorLayer.clientWidth+"px" );
}
}
if(cbd.page.isNextGen)
{
name=input.name;
errLayerController=vg.comp.getController(name,vg.ErrorManager.TYPE);
if(errLayerController)
{
dispLoc=errLayerController.getErrMsgPos();
}
vg.html.position({elementNode:errLayer, targetNode:cellTarget, dispLoc:dispLoc, horzPos:position.LEFT, hasLeader:true, infobox:true, leader:true});
jsCBDtoggle("ldr_form-field-info", true);
if(errorMessageIFrame)
{
vg.html.setHeight(errorMessageIFrame, errLayer.clientHeight+"px");
vg.html.setWidth(errorMessageIFrame, errLayer.clientWidth+"px");
}
if(errorFromServer)
{
errLayer.errorFromServer=true;
}
vg.ErrorManager.currentErrorInputId=input.id;
}
else
{
vg.html.position({elementNode:errLayer, targetNode:cellTarget, dispLoc:dispLoc, horzPos:position.LEFT});
}
};
vg.validation.hideErr=function(fade)
{
"use strict";
var errorLayerId=FORM_FIELD_INFO,
errorLayerLeaderId="ldr_form-field-info",
errorLayer;
if(cbd.page.isNextGen)
{
errorLayer=document.getElementById(errorLayerId);
if(fade)
{
vg.smil.cbdFadeOut(errorLayer, 250);
vg.smil.cbdFadeOut(document.getElementById(errorLayerLeaderId), 250);
}
else
{
jsCBDtoggle(errorLayerId, false);
jsCBDtoggle(errorLayerLeaderId, false);
}
errorLayer.errorFromServer=false;
vg.ErrorManager.currentErrorInputId=null;
}
else
{
jsCBDtoggle(errorLayerId, false);
}
clearTimeout(vg.validation.blurErrTimeout);
};
vg.validation.findTargetInput=function(e)
{
var eNode=jsCBDgetEventNode(e);
var tdTarget;
if(eNode.getAttribute('errTd')!=null )
{
tdTarget=eNode;
}
else
{
tdTarget=vg.html.findAncestor(eNode,
{tagName:'td', attrName:'errTd', attrValue:'true'});
}
return tdTarget?tdTarget.childInput:null;
}
var errorMessageBullet=cbd.page.isNextGen?"&#8226;":"&bull;";
vg.validation.setErrorMessageBullet=function(bulletCode)
{
errorMessageBullet=bulletCode;
}
vg.validation.getErrMsg=function(input)
{
var errMsg=input.infomsg;
if(!isEmpty(errMsg))
{
return errMsg;
}
var context=input;
var parent=input.parentNode;
if(parent.getAttribute("type")=="INPUT_DESC")
{
context=parent;
}
else if(vg.validation.isDispersedInputGroup(input))
{
context=document.getElementById(input.getAttribute('name'));
}
var errElem=vg.html.getSibling(context,{attrName:'type', attrValue:'ERR_DESC'}, "-");
if(errElem!=null)
{
var errListItemId=errElem.getAttribute('errListMsgId');
var errListItem=document.getElementById(errListItemId);
return errListItem.innerHTML;
}
return "ERROR MSG NOT FOUND";
}
vg.validation.isValidateClientSide=function(input)
{
var inputContainer=input;
if(vg.validation.isDispersedInputGroup(input))
{
inputContainer=document.getElementById(input.getAttribute('name'));
if(inputContainer==null)
{
var error="The dispersed input group "+input.getAttribute('name')+
" for "+input.getAttribute('id')+" is not on the page.";
vg.util.throwException("vg.validation.isValidateClientSide", error);
}
}
else if(vg.validation.isInputGroup(input))
{
inputContainer=vg.html.findAncestor(input,{tagName:'td'});
}
if(vg.validation.isOffForElement(inputContainer))
{
return false;
}
var form=_cbdGetParentForm(inputContainer );
if(vg.validation.isOffForElement(form))
{
return false;
}
return true;
}
vg.validation.isOffForElement=function(e)
{
var cssClass=(e!=null?e.className:null);
return(!isEmpty(cssClass)&&cssClass.indexOf('jsValOff') >=0);
}
vg.validation.isDispersedInputGroup=function(input)
{
return input.getAttribute('radiogroup')=='true';
}
vg.validation.getCellTarget=function(input, e)
{
"use strict";
var cellTarget=null,
eventNode=null;
if(e!==null)
{
eventNode=jsCBDgetEventNode(e);
if(eventNode.getAttribute('errTd')!==null)
{
cellTarget=eventNode;
}
}
if(!cellTarget)
{
vg.validation.getCellTarget(input);
}
return cellTarget;
};
vg.validation.getCellTarget=function(input)
{
"use strict";
var cellTarget=null,
isDispersedInputGroup=null,
compSpan=null,
contextNode=null,
tdNode=null,
thNode=null;
if(input)
{
isDispersedInputGroup=vg.validation.isDispersedInputGroup(input);
compSpan=document.getElementById(vg.constants.COMP_ID_PFX+input.name);
contextNode=compSpan&&!isDispersedInputGroup?compSpan:input;
cellTarget=vg.html.findAncestor(contextNode,{tagName:'td'}, null,{tagName:'table'});
if(!cellTarget)
{
cellTarget=vg.html.findAncestor(contextNode,{tagName:'th'}, null,{tagName:'table'});
}
}
return cellTarget;
};
vg.validation.getStyleTarget=function(input)
{
if(vg.validation.isInputGroup(input))
{
var sib=vg.html.getSibling(input,{tagName:'label'});
if(sib!=null) return sib;
return vg.html.findAncestor(input,{tagName:'label'});
}
else
{
return input;
}
}
vg.validation.isInputGroup=function(input)
{
var inputType=input.getAttribute('type');
return(inputType=='radio'||inputType=='checkbox');
}
vg.validation.closeErrLayer=function(id)
{
var closeLayerId=(id)?id:"errFormLayer";
jsCBDcloseLayer(closeLayerId);
var firstInvalidElem=vg.validation.firstInvalidElem;
var isInView=vg.html.isElementInView(firstInvalidElem);
if(cbd.page.isNextGen)
{
if(!vg.Layer.hasOpenLayer())
{
window.scrollTo(0,0);
}
}
else if(firstInvalidElem!=null&&!isInView)
{
var yPos=vg.html.getObjSizePosition(firstInvalidElem).y;
vg.html.scrollPageVertical(yPos);
}
jsCBDpreventSelectListBleedThru(false);
}
vg.validation.openErrorLayer=function(customErrorLayerId)
{
vg.validation.hideErr(false);
vg.util.execOnPageReady(function(){vg.validation.setupErrLayer(customErrorLayerId);});
}
vg.validation.openErrorLayerFinish=function(errLayerId)
{
vg.comp.closeMenusAndCalendars();
jsCBDopenLayer(errLayerId);
jsCBDpreventSelectListBleedThru(false);
}
vg.validation.setupErrLayer=function(customErrLayerId)
{
var node=(customErrLayerId)?document.getElementById(customErrLayerId ):document.getElementById('errFormLayer');
if(node)
{
vg.validation.openErrorLayerFinish(node.id);
}
else if(customErrLayerId&&!node)
{
vg.util.throwException("vg.validation.setupErrLayer", "Custom error layer not found in DOM. Check custom error layer Id:"+customErrLayerId);
}
else
{
var errLayerJsp=cbd.page.isNextGen?'ErrorLayerNG.jsf':'ErrorLayer.jsf';
jsCBDloadContent(jsCBDgetContextRoot()+'com/vanguard/util/cbd/data/jsp/'+errLayerJsp,
'formErrLayer', 'replaceChildren', function(){
vg.validation.openErrorLayerFinish('errFormLayer');
});
}
}
vg.validation.isFirstError=function()
{
return vg.validation.firstInvalidElem==null;
}
vg.validation.registerFirstInvalidElem=function(firstInvalidElem)
{
vg.validation.firstInvalidElem=firstInvalidElem;
}
vg.validation.setRiaError=function(msg_id, state, init, ajaxVal, dispErr)
{
var nextGenVar=cbd.page.isNextGen;
var msg_ids=msg_id.split(" ");
var errText="";
var first=true;
var inputId, bulletCode;
var multipleErrors=(msg_ids.length >1);
if(nextGenVar&&multipleErrors)
{
errText="<dl class='unordered'>";
}
for(var i=0;i < msg_ids.length;i++)
{
var errMsg=document.getElementById(msg_ids[i]);
inputId=msg_ids[i].replace(/:[a-zA-Z0-9-_]*$/, "" );
if(errMsg!=null)
{
if(!nextGenVar)
{
if(!first)errText+="<br/>";
first=false;
}
var msgText=errMsg.getAttribute("text");
jsCBDAddErrorMetaTag(state, inputId);
bulletCode=(isEmpty(errorMessageBullet)||!multipleErrors)?"":errorMessageBullet;
if(!(cbd.page.isNextGen&&isEmpty(bulletCode)) )
{
bulletCode+="&nbsp;";
}
if(nextGenVar)
{
if(multipleErrors)
{
errText+="<dt>"+bulletCode+"</dt><dd>"+msgText+"</dd>";
}
else
{
errText+="<p class='inline'>"+msgText+"</p>";
}
}
else
{
errText+=bulletCode+msgText;
}
}
}
if(nextGenVar&&multipleErrors)
{
errText+="</dl>";
}
var input=document.getElementById(inputId);
var targetInputs=vg.validation.getTargetInputs(inputId);
for(var i=0;i < targetInputs.length;++i)
{
targetInputs[i].infomsg=errText;
}
if(init)
{
var methodToCall=state?vg.validation.setInvalid:vg.validation.setValid;
for(var i=0;i < targetInputs.length;++i)
{
methodToCall.call(this, targetInputs[i]);
}
vg.validation._notifyValidationObserver(input,!state);
if(!ajaxVal&&vg.validation.isFirstError())
{
vg.validation.registerFirstInvalidElem(input);
if(!vg.validation.isSuppressErrorLayer )
{
vg.validation.openErrorLayer();
}
}
if(ajaxVal&&dispErr&&cbd.page.isNextGen&&state)
{
vg.validation.showErr(targetInputs[0], null, true);
var dur=vg.comp.getController(inputId, vg.ErrorManager.TYPE).getErrMsgDur();
vg.validation.blurErrTimeout=setTimeout(function(){vg.validation.hideErr(true);}, dur );
}
if(!vg.validation.valObserversTimeOut)
{
vg.validation.valObserversTimeOut=setTimeout(function delayedTriggerValObservers(){vg.validation.triggerValidationObservers();}, 200);
}
}
}
vg.validation.getTargetInputs=function(inputId)
{
var input=document.getElementById(inputId);
if("radioGroup"==input.getAttribute("type")||
"true"==input.getAttribute("radiogroup"))
{
return _cbdGetElementsByName('input', inputId)
}
else if(_cbdIsRiaSelectOneMenu(input))
{
return vg.html.getElements(input,{tagName:'input', attrName:'name', attrValue:inputId});
}
else
{
if(input.nodeName.toUpperCase()=="TABLE")
{
return input.getElementsByTagName('input');
}
else
{
return[input];
}
}
}
vg.validation.focus=function(input)
{
if(_cbdIsRiaSelectOneMenu(input))
{
input=vg.comp.getController(input).valueInput;
}
var parent=input.parentNode;
var formatFunc=parent.getAttribute('b:format');
if(formatFunc!=null)
{
_setAutoFormat(input.getAttribute("name"), eval(formatFunc), true);
input.prevVal=input.value;
}
if(cbd.page.isNextGen&&(input.valid==false))
{
vg.validation.showErr(input);
}
}
vg.validation.formatTypingTimeout=null;
vg.validation.autoFormat=function(key, func, value, inputId)
{
value=trim(value);
var delayAutoFormat=(/^0+/.test(value))?1500:250;
clearTimeout(vg.validation.formatTypingTimeout);
vg.validation.formatTypingTimeout=setTimeout(
function()
{
var input=document.getElementById(inputId);
if(input)
{
func.dataSource=input;
func(key);
}
}, delayAutoFormat);
vg.validation.blurErrTimeout=null;
}
vg.validation._autoFormatInput=function(input)
{
var formatFunc=input.parentNode.getAttribute('b:format');
var func=eval(formatFunc);
if(func)
{
func.dataSource=input;
func(null);
}
}
vg.validation.blur=function(input)
{
if(_cbdIsRiaSelectOneMenu(input))
{
input=vg.comp.getController(input).valueInput;
}
var parent=input.parentNode;
if(!parent)
{
return;
}
var styleTarget=vg.validation.getStyleTarget(input);
if(styleTarget==null)
{
return;
}
vg.validation._autoFormatInput(input);
vg.validation.procErr(input);
var formatFunc=parent.getAttribute('b:format');
if(formatFunc!=null)
{
_setAutoFormat(input.getAttribute("name"), formatFunc, false);
}
if(vg.util.isDefined(input.prevVal)&&input.prevVal!=input.value)
{
if(input.onchange!=null)
{
input.onchange();
}
}
}
vg.validation.procErr=function(input)
{
var isValid=vg.validation.validateElement(input);
if(cbd.page.isNextGen&&!isValid)
{
vg.validation.showErr(input);
clearTimeout(vg.validation.blurErrTimeout);
var dur=vg.comp.getController(input.name,vg.ErrorManager.TYPE).getErrMsgDur();
vg.validation.blurErrTimeout=setTimeout(function(){vg.validation.hideErr(true);}, dur );
}
}
vg.validation.change=function(input)
{
if(vg.util.isDefined(input.prevVal))
{
input.prevVal=input.value;
}
}
vg.validation.keydown=function(input, event)
{
input.prevValue=input.value;
}
vg.validation.keyup=function(input, event)
{
var key=jsCBDgetKey(jsCBDgetEvent(event));
var isTabKey=key==9;
var isShiftKey=key==16;
if(isTabKey||isShiftKey)
{
return;
}
var valueChanged=input.value!=input.prevValue;
if(cbd.page.isNextGen&&(input.valid==false)&&valueChanged)
{
vg.validation.hideErr();
}
}
vg.validation.textareafocus=function(textarea)
{
return;
}
vg.validation.textareablur=function(textarea)
{
return;
}
vg.validation.initDefaultText=function(id, defaultText)
{
var input=vg.html.getElement(id);
if(input)
{
input.defaultText=defaultText;
if(isEmpty(input.value))
{
input.value=defaultText;
jsCBDaddStyle(input, cbd.gh.ASINPUT_NOFOCUS_CLASS);
}
else
{
jsCBDaddStyle(input, cbd.gh.ASINPUT_FOCUS_CLASS);
}
}
}
vg.validation.containsError=function(id)
{
return vg.html.getElements(document.getElementById(id),{tagName:'TD', attrName:'errtd', attrValue:'true'}).length > 0;
}
vg.validation.initTextArea=function(id)
{
var textArea=document.getElementById(id),
headerDiv=document.getElementById(id+'_headerDiv');
vg.html.addEventListener(headerDiv, 'click', function()
{
vg.comp.toggleHeaderTextArea(textArea, false);
textArea.focus();
},
id+'_onclickToggle'
);
vg.html.addEventListener(textArea, 'blur', function()
{
vg.comp.toggleHeaderTextArea(textArea, true);
},
id+'_onblurToggle'
);
}
vg.html.retrieveInputsWithDefaultValues=function(form)
{
var formElements=vg.html.getElements(form,{tagName:'input'}, function(input){return!isEmpty(input.defaultText);});
var formTextAreas=vg.html.getElements(form,{tagName:'textarea'}, function(input){return!isEmpty(input.defaultText);});
formElements=formElements.concat(formTextAreas);
return formElements;
}
vg.html.clearInputDefaultValues=function(formElements)
{
var formElementsLength=formElements.length;
for(var i=0;i < formElementsLength;i++)
{
var inputElement=formElements[i];
if(vg.html.inputHasDefaultText(inputElement) )
{
inputElement.value="";
}
}
return formElements;
}
vg.html.resetInputDefaultValues=function(defaultTextInputs)
{
var defaultTextInputsLength=defaultTextInputs.length;
for(var i=0;i < defaultTextInputsLength;i++)
{
var inputElement=defaultTextInputs[i];
if(inputElement.value==="")
{
inputElement.value=inputElement.defaultText;
}
}
}
vg.html.inputHasDefaultText=function(input)
{
return((input.value==input.defaultText)&&vg.html.hasStyle(cbd.gh.ASINPUT_NOFOCUS_CLASS,input) );
}
vg.validation.isEmptyInput=function(input)
{
return vg.html.inputHasDefaultText(input)||isEmpty(input.value);
}
SelectTable=function(id, isHighlightRow, type, selectionPersist)
{
this.base=vg.Controller;
this.base(id, null);
this.isHighlightRow=isHighlightRow;
this.type=type;
this.selectionPersist=selectionPersist;
var skinElements=vg.html.getElements(vg.html.getElement('comp-'+id),{tagName:'span', attrName:'name', attrValue:'skin'});
this.skin=skinElements[0]?skinElements[0].className:null;
this.addListeners(this.viewNode.getElementsByTagName('TH'));
this.addListeners(this.viewNode.getElementsByTagName('TD'));
var controller=vg.comp.getController(id);
vg.html.addEventListener(this.viewNode, 'show', function(e){controller.show(e)});
if((this.type=="9box"&&!cbd.page.isNextGen)||this.skin==SelectTable.NINEBOX_SKIN2_CLASS)
{
this.addRoundedCorners();
}
else
{
this.show(this.viewNode);
}
}
SelectTable.PREFIX_BEHAVIOR=PREFIX_BEHAVIOR="selTblBeh";
SelectTable.COL_HEAD_BEHAVIOR=COL_HEAD_BEHAVIOR="selTblBehColHd";
SelectTable.ROW_HEAD_BEHAVIOR=ROW_HEAD_BEHAVIOR="selTblBehRowHd";
SelectTable.SELECT_ALL_BEHAVIOR=SELECT_ALL_BEHAVIOR="selTblBehSelAll";
SelectTable.DATA_CELL_BEHAVIOR=DATA_CELL_BEHAVIOR="selTblBehCell";
SelectTable.NINEBOX_SKIN2_CLASS=NINEBOX_SKIN2_CLASS="selTable-9box-skin2";
SelectTable.prototype.addRoundedCorners_d1=function()
{
var tds=this.viewNode.getElementsByTagName("td");
var tdTypes=new Array('topLft','topRgt','botLft','botRgt');
for(i=0;i < tds.length;i++)
{
var node=tds[i];
for(j=0;j < tdTypes.length;j++)
{
if(node.className.indexOf(tdTypes[j]) >=0)
{
var divO=document.createElement("div");
var divI=document.createElement("div");
vg.html.addStyle("corner", divO);
vg.html.addStyle(tdTypes[j], divI);
divO.innerHTML=node.innerHTML;
node.innerHTML=""
divO.appendChild(divI);
node.appendChild(divO);
}
}
}
}
SelectTable.prototype.addListeners=function(items)
{
var controller=vg.comp.getController(this.viewNode.getAttribute('id'));
for(i=0;i < items.length;i++)
{
var node=items[i];
var readonly=node.getAttribute("readonly");
readonly=readonly!=null&&readonly;
if(node.className!=null&&node.className.indexOf(SelectTable.PREFIX_BEHAVIOR) >=0&&!readonly)
{
vg.html.addEventListener(node, 'mouseenter', function(e){controller.mouseEnter(e)});
vg.html.addEventListener(node, 'mouseleave', function(e){controller.mouseLeave(e)});
if(this.selectionPersist)
{
vg.html.addEventListener(node, 'click', function(e){controller.dispatchEvent(e,true)});
}
}
}
}
SelectTable.prototype.countPreceding=function(parent, context, tag)
{
var count=0;
var nodes=parent.getElementsByTagName(tag);
for(var i=0;i < nodes.length;i++)
{
if(nodes[i]==context)
break;
count++;
}
return(count);
}
SelectTable.prototype.isValidColumn=function(node, currCol, col, keepheader)
{
if(node.tagName==null||node.className==null)
{
return;
}
if(node.tagName!='TD'&&(node.tagName=='TH'&&!keepheader))
return(false);
if(node.className.indexOf(SelectTable.PREFIX_BEHAVIOR) < 0)
return(false);
if(col >=0)
{
var colspan=node.getAttribute('colspan');
if(colspan!=null&&colspan!='1')
return(false);
if(currCol!=col)
return(false);
}
return(true);
}
SelectTable.prototype.extractRows=function(row, col, keepheader)
{
var nodes=new Array();
var colIndex=0;
var rowNodes=this.viewNode.getElementsByTagName('TR');
for(var i=0;i < rowNodes.length;i++)
{
if(row >=0&&i!=row)
{
continue;
}
var colNodes=rowNodes[i].childNodes;
var colCounter=1;
for(var j=0;j < colNodes.length;j++)
{
var node=colNodes[j];
if(this.isValidColumn(node,colCounter,col,keepheader))
{
nodes[nodes.length]=node;
}
if(node.tagName=='TD'||(node.tagName=='TH'&&keepheader))
{
colCounter++;
}
}
if(row >=0)
{
break;
}
}
return(nodes);
}
SelectTable.prototype.clearAll=function(isClick)
{
var nodes=this.viewNode.getElementsByTagName('TD');
var node, selected;
var nodeLength=nodes.length;
for(var i=0;i < nodeLength;i++)
{
node=nodes[i];
selected=node.getAttribute('selected')==='true';
if(isClick||!selected)
{
vg.html.addOrRemoveStyle('TableCell-sel', node, false);
if(isClick)
{
node.setAttribute('selected',false);
}
}
}
var nodes=this.viewNode.getElementsByTagName('TH');
nodeLength=nodes.length;
for(var i=0;i < nodeLength;i++)
{
node=nodes[i];
selected=node.getAttribute('selected')==='true';
if(isClick||!selected)
{
vg.html.addOrRemoveStyle('TableHeadCell-sel', node,false);
if(isClick)
{
node.setAttribute('selected',false);
}
}
}
}
SelectTable.prototype._addSelectedClass=function(nodes, isClick, className)
{
var node;
var nodeLength=nodes.length;
for(var i=0;i < nodeLength;i++)
{
node=nodes[i];
vg.html.addOrRemoveStyle(className, node, true);
if(isClick)
{
node.setAttribute('selected','true');
}
}
}
SelectTable.prototype.findFirstSelectAllHeader=function()
{
var nodes=this.viewNode.getElementsByTagName('TH');
for(var i=0;i < nodes.length;i++)
{
var node=nodes[i];
if(node.className!=null&&node.className.indexOf(SelectTable.SELECT_ALL_BEHAVIOR) >=0)
{
return(node);
}
}
return(null);
}
SelectTable.prototype.addRoundedCorners=function()
{
var tds=this.viewNode.getElementsByTagName("td");
var tdTypes=new Array('topLft','topRgt','botLft','botRgt');
for(i=0;i < tds.length;i++)
{
var node=tds[i];
var cornerDivArray=new Array();
var divO=document.createElement("div");
vg.html.addStyle("nineBox", divO);
for(j=0;j < tdTypes.length;j++)
{
if(node.className.indexOf(tdTypes[j]) >=0)
{
var divI=document.createElement("div");
vg.html.addStyle(tdTypes[j]+"El", divI);
cornerDivArray.push(divI);
}
}
for(k=0;k < cornerDivArray.length;k++)
{
divO.appendChild(cornerDivArray[k]);
}
var span=document.createElement("span");
span.innerHTML=node.innerHTML;
node.innerHTML="";
divO.appendChild(span);
node.appendChild(divO);
}
}
SelectTable.prototype.methHighlightColumn=function(context, isClick)
{
var colPos=this.countPreceding(context.parentNode,context,context.tagName);
var nodes=this.extractRows(-1,colPos,false);
this._addSelectedClass(nodes, isClick, 'TableCell-sel');
this._addSelectedClass(new Array(context), isClick, 'TableHeadCell-sel');
}
SelectTable.prototype.methHighlightRow=function(context, isClick)
{
if(this.isHighlightRow)
{
var rowPos=this.countPreceding(this.viewNode,context.parentNode,'TR');
var nodes=this.extractRows(rowPos,-1,false);
this._addSelectedClass(nodes, isClick, 'TableCell-sel');
}
this._addSelectedClass(new Array(context), isClick, 'TableHeadCell-sel');
}
SelectTable.prototype.methHighlightAll=function(context, isClick)
{
var nodes=this.extractRows(-1,-1,false);
this._addSelectedClass(nodes, isClick, 'TableCell-sel');
this._addSelectedClass(new Array(context), isClick, 'TableHeadCell-sel');
}
SelectTable.prototype.methHighlightHeaders=function(context, isClick)
{
var rowPos=this.countPreceding(this.viewNode,context.parentNode,'TR');
var nodes=this.extractRows(rowPos,-1,true);
if(nodes[0]!=null&&nodes[0].className!=null&&nodes[0].className.indexOf(SelectTable.ROW_HEAD_BEHAVIOR) >=0)
{
this._addSelectedClass(new Array(nodes[0]), isClick, 'TableHeadCell-sel');
}
var colspan=context.getAttribute('colspan');
if(colspan==null||colspan=='1')
{
nodes=this.viewNode.getElementsByTagName('TH');
var colPos=this.countPreceding(context.parentNode,context,context.tagName)+1;
if(nodes[colPos]!=null&&nodes[colPos].className!=null&&nodes[colPos].className.indexOf(SelectTable.COL_HEAD_BEHAVIOR) >=0)
{
this._addSelectedClass(new Array(nodes[colPos]), isClick, 'TableHeadCell-sel');
}
}
}
SelectTable.prototype.methHighlightCell=function(context, isClick)
{
this._addSelectedClass(new Array(context), isClick, 'TableCell-sel');
}
SelectTable.prototype.behvSelectTableColHead=function(context, isEnter, isClick)
{
this.clearAll(isClick);
if(isEnter)
{
this.methHighlightColumn(context, isClick);
}
}
SelectTable.prototype.behvSelectTableRowHead=function(context, isEnter, isClick)
{
this.clearAll(isClick);
if(isEnter)
{
this.methHighlightRow(context, isClick);
}
}
SelectTable.prototype.behvSelectAll=function(context, isEnter, isClick)
{
this.clearAll(isClick);
if(isEnter)
{
this.methHighlightAll(context, isClick);
}
}
SelectTable.prototype.behvSelectTableCell=function(context, isEnter, isClick)
{
this.clearAll(isClick);
if(isEnter)
{
this.methHighlightCell(context, isClick);
this.methHighlightHeaders(context, isClick);
}
}
SelectTable.prototype.dispatchEvent=function(e, isEnter)
{
var evtNode=jsCBDgetEventNode(e);
if(evtNode.className==null||evtNode.className==""||(evtNode.className.indexOf(SelectTable.PREFIX_BEHAVIOR) <0))
{
while(evtNode.nodeName!='TBODY'&&
(evtNode.className!=null&&evtNode.className.indexOf(SelectTable.PREFIX_BEHAVIOR) <0))
{
evtNode=evtNode.parentNode;
}
if(evtNode.className==null) return;
}
var isClick=e.type==="click";
if(evtNode.className.indexOf(SelectTable.COL_HEAD_BEHAVIOR) >=0)
{
this.behvSelectTableColHead(evtNode, isEnter, isClick);
}
else if(evtNode.className.indexOf(SelectTable.ROW_HEAD_BEHAVIOR) >=0)
{
this.behvSelectTableRowHead(evtNode, isEnter, isClick);
}
else if(evtNode.className.indexOf(SelectTable.SELECT_ALL_BEHAVIOR) >=0)
{
this.behvSelectAll(evtNode, isEnter, isClick);
}
else if(evtNode.className.indexOf(SelectTable.DATA_CELL_BEHAVIOR) >=0)
{
this.behvSelectTableCell(evtNode, isEnter, isClick);
}
}
SelectTable.prototype.mouseEnter=function(e)
{
this.dispatchEvent(e,true);
}
SelectTable.prototype.mouseLeave=function(e)
{
var evt=jsCBDgetEvent(e);
var evtNode=jsCBDgetEventNode(e);
var toNode=evt.relatedTarget||evt.toElement;
while(!isEmpty(toNode)&&toNode!=evtNode&&toNode.nodeName!='BODY')
{
toNode=toNode.parentNode;
if(toNode==evtNode) return;
}
this.dispatchEvent(e,false);
}
SelectTable.prototype.show=function(e)
{
var node=this.findFirstSelectAllHeader();
if(node!=null)
{
this.behvSelectAll(node,true);
}
}
vg.ageBand.HOVER='hover';
vg.ageBand.SELECTED='selected';
vg.ageBand.DEFAULT='default';
vg.ageBand.HIDE='ageBandHide';
vg.ageBand.allDefaultState=true;
vg.ageBand.inAgeBar=false;
vg.ageBand.selectedItem=null;
vg.ageBand.reset=function()
{
vg.ageBand.allDefaultState=true;
vg.ageBand.inAgeBar=false;
vg.ageBand.selectedItem=null;
}
vg.ageBand._mouseOver=function(obj, id)
{
if(vg.ageBand.allDefaultState)
{
vg.ageBand.inAgeBar=true;
vg.html.removeStyle(vg.ageBand.DEFAULT, obj);
vg.ageBand._itemHover(obj);
vg.ageBand._selectBand(id);
}
else
{
if(!vg.html.hasStyle(vg.ageBand.SELECTED, obj) )
{
vg.ageBand._itemHover(obj);
if(vg.ageBand.selectedItem)
{
vg.html.addStyle(vg.ageBand.HIDE, vg.ageBand.selectedItem);
}
}
}
}
vg.ageBand._mouseOut=function(obj, id)
{
if(vg.ageBand.allDefaultState)
{
vg.ageBand.inAgeBar=false;
vg.html.removeStyle(vg.ageBand.HOVER, obj);
vg.html.addStyle(vg.ageBand.DEFAULT, obj);
var items=vg.html.getElements(document.getElementById(id),{tagName:'div', attrName:'class', attrValue:''});
setTimeout(function()
{
if(!vg.ageBand.inAgeBar)
{
for(var i=0;i < items.length;i++)
{
items[i].className=vg.ageBand.DEFAULT;
}
}
}, 50 );
}
else
{
if(!vg.html.hasStyle(vg.ageBand.SELECTED, obj) )
{
vg.html.removeStyle(vg.ageBand.HOVER, obj);
if(vg.ageBand.selectedItem)
{
vg.html.removeStyle(vg.ageBand.HIDE, vg.ageBand.selectedItem);
}
}
}
}
vg.ageBand._onClick=function(obj, id, event)
{
var items=vg.html.getElements(document.getElementById(id),{tagName:'div', attrName:'class'}, function(node){return vg.html.hasStyle(vg.ageBand.SELECTED, node)});
for(var i=0;i < items.length;i++)
{
items[i].className="";
}
obj.className=vg.ageBand.SELECTED;
vg.ageBand.selectedItem=obj;
vg.ageBand._selectBand(id);
vg.ageBand.allDefaultState=false;
}
vg.ageBand._selectBand=function(id)
{
var items=vg.html.getElements(document.getElementById(id),{tagName:'div', attrName:'class', attrValue:vg.ageBand.DEFAULT});
for(var i=0;i < items.length;i++)
{
items[i].className="";
}
}
vg.ageBand._itemHover=function(obj)
{
vg.html.addStyle(vg.ageBand.HOVER, obj);
vg.ageBand._positionFloatingLabel(obj);
}
vg.ageBand._positionFloatingLabel=function(obj)
{
var floatingLabel=vg.html.getElements(obj,{tagName:'div', attrName:'class', attrValue:'floatLabel'})[0];
if(floatingLabel!=null&&!floatingLabel.isPositioned )
{
var container=vg.html.getSibling(floatingLabel,{tagName:'div', attrName:'class', attrValue:'container'}, "-");
var arrow=vg.html.getElements(container,{tagName:'div', attrName:'class', attrValue:'arrow'})[0];
var floatingLabelData=vg.html.getObjSizePosition(floatingLabel);
var arrowData=vg.html.getObjSizePosition(arrow);
var arrowCenter=arrowData.x+arrowData.w/2;
var leftLoc=arrowCenter - floatingLabelData.w/2
floatingLabel.style.left=leftLoc+"px";
floatingLabel.isPositioned=true;
}
}
Populator=function(cfg )
{
vg.util.attachJsonOptions(this, cfg );
var parent=document.getElementById(this.parentId);
parent.populator=this;
this.populatorLoaded=false;
if(this.execOnLoad&&!this.inline)
{
Populator._execute(parent);
}
if((typeof(cbd.page.isResponsive)!=="undefined"&&cbd.page.isResponsive)&&!window.ieQuirksMode)
{
if(this.reloadOnBreakPointChange)
{
vg.html.addEventListener(window, vg.event.BREAK_POINT_CHANGE, function(e)
{
Populator._reloadSubPage(parent);
});
}
}
}
Populator._reloadSubPage=function(obj)
{
var type=obj.populator.type;
obj.populator.type='always';
if(obj.populator.usePleaseWait)
{
obj.innerHTML=obj.populator.loadingIndicatorHTML;
}
Populator._execute(obj);
obj.populator.type=type;
}
Populator.exists=function(obj)
{
return obj.populator!=null;
}
Populator._copy=function(source, target)
{
target.populator=source.populator;
}
Populator._execute=function(obj, callBack, index)
{
var populator ,url;
if(Populator.exists(obj)&&(!jsCBDisPopulatorLoaded(obj)||obj.populator.type=='always'))
{
populator=obj.populator;
if(populator.inline)
{
Populator._loadInlineContent(obj, callBack);
}
else
{
url=populator.populatorUrl;
if(typeof(cbd.page.isResponsive)!=="undefined"&&cbd.page.isResponsive)
{
var	hasParams=url.match(/\?/g),
separator=(hasParams&&hasParams.length >=1)?"&":"?";
url=url+separator+"cbdBreakPoint="+cbdcommon.screen.getMediaQuerySize();
}
function _callback()
{
if(populator.onLoad)
{
cbd.loader.addCallback(obj.populator.onLoad);
}
vg.html._fireCustomEvent(vg.event.DOM_CHANGE, obj );
if(index)
{
vg.html._fireCustomEvent(vg.event.POPULATOR_CONTENT_LOAD, obj, index );
}
if(callBack )
{
callBack.apply(window, arguments );
}
}
if(ie)
{
jsCBDloadContent(url, obj, 'replaceChildren', _callback );
}
else
{
vg.util.execOnPageReady
(
function()
{
jsCBDloadContent(url, obj, 'replaceChildren', _callback );
}
);
}
}
obj.populator.populatorLoaded=true;
}
else
{
if(index)
{
vg.html._fireCustomEvent(vg.event.POPULATOR_CONTENT_LOAD, obj, index );
}
}
}
Populator._loadInlineContent=function(obj, callBack)
{
var xmpTag=obj.getElementsByTagName("xmp");
_callback=callBack;
vg.util.execOnPageReady(function populatorLoad(){
jsCBDsetElementInnerHtml(obj, xmpTag[0].innerHTML, null);
if(callBack!=null)
{
setTimeout(function(){callBack()}, 50);
}
vg.html._fireCustomEvent(vg.event.DOM_CHANGE, obj );
});
}
Populator._remove=function(obj)
{
obj.populator=null;
}
jsCBDisPopulatorLoaded=function(parentId)
{
var parent=vg.html.getElement(parentId);
if(Populator.exists(parent))
{
return parent.populator.populatorLoaded;
}
}
RoundBox=function(id, fromColor, toColor)
{
this.base=vg.Controller;
this.base(id, null, true);
this.id=id;
this.inState=false;
this.fromColor=fromColor;
this.toColor=toColor;
this.HTMLElement=vg.html.getElement(this.id).getElementsByTagName('table')[0];
var controller=this;
this.mouseManager=new vg.MouseManager(
{
element:document.getElementById(this.id),
onMouseEnter:function(){controller.enterRoundBox()},
onMouseLeave:function(){controller.leaveRoundBox()}
}
);
vg.html.addEventListener(this.viewNode, 'click', function(e){controller.clickRoundBox(e)});
}
RoundBox.prototype=
{
clickRoundBox:function(e)
{
if(this.inState==false&&
jsCBDgetEventNode(e).tagName.toLowerCase()!='a'&&
jsCBDgetEventNode(e).tagName.toLowerCase()!='select'&&
jsCBDgetEventNode(e).tagName.toLowerCase()!='input')
{
eval(this.viewNode.getAttribute('clickJs'));
}
},
enterRoundBox:function()
{
vg.smil.animateElement(this.HTMLElement, 'backgroundColor', 200, 0, null, this.toColor, null, null, null, true);
},
leaveRoundBox:function()
{
vg.smil.animateElement(this.HTMLElement, 'backgroundColor', 200, 0, null, this.fromColor, null, null, null, true);
}
}
var DISABLE_DIV_CONTAINER="CBD_DISABLE_DIV_CONTAINER";
vg.html.openDisableDiv=function(coveredEl,opac,layerId,layerDelay,layerResize,waitCursor,opacColor,loadingIndicator)
{
if(coveredEl.coveredEl!=null)
{
opac=coveredEl.opac;
layerId=coveredEl.layerId;
layerDelay=coveredEl.layerDelay;
layerResize=coveredEl.layerResize;
waitCursor=coveredEl.waitCursor;
opacColor=coveredEl.opacColor;
coveredEl=coveredEl.coveredEl;
}
var controller=vg.html._getDisDivController(coveredEl);
if(controller&&controller.disDiv&&controller.disDiv.parentNode)
{
controller.openDisableModalDiv(opac,layerId,layerDelay,layerResize,waitCursor,opacColor);
}
else
{
if(cbd.page.isNextGen)
{
new Scrim(coveredEl,opac,layerId,layerDelay,layerResize,waitCursor,opacColor,loadingIndicator)
}
else
{
new DisableModalDiv(coveredEl,opac,layerId,layerDelay,layerResize,waitCursor,opacColor);
}
}
}
vg.html.isDisableDivOpen=function(coveredEl)
{
var controller=vg.html._getDisDivController(coveredEl);
if(controller&&controller.disDiv&&controller.disDiv.parentNode)
{
return jsCBDisVisibleElement(controller.disDiv,false);
}
return false;
}
vg.html.closeDisableDiv=function(coveredEl)
{
var controller=vg.html._getDisDivController(coveredEl);
if(controller)
{
controller.closeDisableModalDiv();
}
}
vg.html.closeAllDisableDivs=function()
{
var disDivCont=document.getElementById(DISABLE_DIV_CONTAINER);
if(!disDivCont) return;
for(var i=0;i<disDivCont.divArray.length;i++)
{
var controller=disDivCont.divArray[i].controller;
controller.closeDisableModalDiv();
}
}
vg.html._resizeDisableDivs=function()
{
var disDivCont=document.getElementById(DISABLE_DIV_CONTAINER);
if(!disDivCont) return;
for(var i=0;i<disDivCont.divArray.length;i++)
{
var controller=disDivCont.divArray[i].controller;
controller.positionSizeDisableModalDiv();
if(controller.layerState)
{
controller.positionSizeDisableLayer();
}
}
}
vg.html._getDisDivController=function(coveredEl)
{
var disDivCont=document.getElementById(DISABLE_DIV_CONTAINER);
var coveredElem=(vg.html.getElement(coveredEl).id )?vg.html.getElement(coveredEl).id:vg.html.getElement(coveredEl);
if(disDivCont&&disDivCont.divArray)
{
for(var i=0;i<disDivCont.divArray.length;i++)
{
if(disDivCont.divArray[i].coveredEl==coveredElem)
return disDivCont.divArray[i].controller;
}
}
return null;
}
DisableModalDiv=function(coveredEl,opac,layerId,layerDelay,layerResize,waitCursor,opacColor)
{
this.base=vg.Controller;
this.base(coveredEl, null);
this.defaultColor='#FFFFFF';
this.defaultOpac=0.75;
this.defaultToWait=true;
this.layer=null;
this.minWidthDiv=null;
this.opacColor=opacColor;
this.coveredEl=(vg.html.getElement(coveredEl).id)?vg.html.getElement(coveredEl).id:vg.html.getElement(coveredEl);
this.createDisableModalDiv(coveredEl);
this.openDisableModalDiv(opac,layerId,layerDelay,layerResize,waitCursor,opacColor);
}
DisableModalDiv._removeOrphanNodes=function()
{
var disDivCont=document.getElementById(DISABLE_DIV_CONTAINER);
if(!disDivCont||!disDivCont.divArray)
{
return;
}
var divArray=disDivCont.divArray;
for(var i=divArray.length-1;i>=0;i--)
{
var disableDiv=divArray[i];
if(disableDiv!=null)
{
var contr=disableDiv.controller;
var divLayer=contr.layer;
var layerScrollDiv=divLayer?vg.Layer.getScrollDiv(divLayer.id):null;
var disDivParent=contr.disDiv.parentNode;
var triggerElem=vg.html.getElement(disableDiv.coveredEl);
if(!triggerElem||
!triggerElem.parentNode||
!disDivParent||
(divLayer&&layerScrollDiv!=disDivParent))
{
if(disDivParent)
{
disDivParent.removeChild(contr.disDiv);
}
divArray.splice(i, 1);
}
}
}
}
DisableModalDiv.prototype=
{
createDisableModalDiv:function(coveredEl)
{
var disDivCont=document.getElementById(DISABLE_DIV_CONTAINER);
var parentLayerId, parentLayer, parentLayerContr;
var controller=this;
if(!disDivCont)
{
var disDivCont=document.createElement('div');
disDivCont.setAttribute("id",DISABLE_DIV_CONTAINER);
document.getElementById('main').appendChild(disDivCont);
}
var disDiv=this.constructDisabledDiv();
var parentLayerSpan=vg.html.findAncestor(vg.html.getElement(coveredEl),{tagName:"span", attrName:"type", attrValue:"Layer"});
if(parentLayerSpan)
{
parentLayerId=parentLayerSpan.getAttribute('id').substr(5);
parentLayer=document.getElementById(parentLayerId);
parentLayerContr=vg.comp.getController(parentLayer);
}
if(parentLayer&&parentLayerContr)
{
var layerScrollDiv=vg.Layer.getScrollDiv(parentLayerId);
var minWidthDiv=vg.html.getElements(parentLayer,{tagName:'div', attrName:'name', attrValue:'min-width'})[0];
if(minWidthDiv)
{
var minWidthDivParent=minWidthDiv.parentNode;
if(layerScrollDiv&&minWidthDivParent!=layerScrollDiv)
{
layerScrollDiv.appendChild(minWidthDiv);
}
}
if(layerScrollDiv)
{
layerScrollDiv.appendChild(disDiv );
vg.html.addEventListener(null, vg.event.LAYER_REPOSITION, function(e){controller.positionSizeDisableModalDiv()});
vg.html.addEventListener(null, vg.event.LAYER_OPEN, function(e){controller.positionSizeDisableModalDiv()});
}
}
else
{
disDivCont.appendChild(disDiv );
}
if(!disDivCont.divArray )
{
disDivCont.divArray=new Array();
}
disDivCont.divArray.push({coveredEl:this.coveredEl, controller:this});
this.layer=parentLayer;
this.minWidthDiv=minWidthDiv;
this.disDiv=disDiv;
this.setDisDivOpacity(this.defaultOpac);
return disDiv;
},
constructDisabledDiv:function()
{
var disDiv=document.createElement('div');
disDiv.style.display="none";
disDiv.style.zIndex="120";
disDiv.style.background=(this.opacColor)?this.opacColor:"#FFFFFF";
disDiv.style.position="absolute";
return disDiv;
},
openDisableModalDiv:function(opac,layerId,layerDelay,layerResize,waitCursor,opacColor)
{
var coveredEl=vg.html.getElement(this.coveredEl);
var pos=this.positionSizeDisableModalDiv();
if(this.loadingIndicator&&cbd.page.isNextGen)
{
this._positionLoadingIndicator();
}
jsCBDtoggleElement(this.disDiv, true);
this.setDisDivOpacity(opac);
waitCursor=(waitCursor!=null)?waitCursor:this.defaultToWait;
if(waitCursor)
this.disDiv.style.cursor="wait";
if(ie&&CBD_FLOATING_HEAD)
{
coveredEl.setAttribute('covered','true');
vg.html._fireCustomEvent(vg.event.ELEMENT_DISABLED, coveredEl );
}
if(layerId!=null)
{
this.layerId=layerId;
this.layerDelay=(layerDelay!=null)?layerDelay:"5";
this.layerResize=(layerResize!=null)?layerResize:true;
this.layerState=true;
this.waitCursor=waitCursor;
this.positionSizeDisableLayer();
this.openDisableLayer();
}
vg.html.toggleInputTabIndex(coveredEl, true);
},
closeDisableModalDiv:function()
{
jsCBDtoggleElement(this.disDiv, false);
var coveredEl=vg.html.getElement(this.coveredEl);
if(coveredEl&&ie&&CBD_FLOATING_HEAD)
{
coveredEl.setAttribute('covered','false');
vg.html._fireCustomEvent(vg.event.ELEMENT_DISABLED, coveredEl );
}
vg.html.toggleInputTabIndex(coveredEl, false);
this.layerState=false;
clearTimeout(this.t);
if(this.layerId)
{
jsCBDcloseLayer(this.layerId);
}
this.disDiv.style.cursor="auto";
},
setDisDivOpacity:function(opac)
{
this.opac=(opac==null)?this.defaultOpac:opac;
vg.html.setOpacity(this.disDiv,this.opac);
},
positionSizeDisableModalDiv:function()
{
var coveredEl=vg.html.getElement(this.coveredEl);
var layerDiv=this.layer;
var pos=vg.html.getObjXY(coveredEl);
var size=vg.html.getObjSize(coveredEl);
pos.w=size.w;
pos.h=size.h;
var disDiv=this.disDiv;
if(!layerDiv&&disDiv )
{
disDiv.style.left=pos.x -1+"px";
disDiv.style.top=pos.y - 1+"px";
vg.html.setWidth(disDiv,pos.w+2+"px");
vg.html.setHeight(disDiv,pos.h+2+"px");
}
else if(layerDiv&&disDiv&&this.minWidthDiv)
{
if(ie)
{
var offsetObj=coveredEl;
var topOffset=0;
var leftOffset=0;
while(offsetObj&&offsetObj!=this.disDiv.parentNode)
{
topOffset+=offsetObj.offsetTop;
leftOffset+=offsetObj.offsetLeft;
offsetObj=offsetObj.offsetParent;
}
this.disDiv.style.left=leftOffset+"px";
this.disDiv.style.top=topOffset+"px";
this.disDiv.style.position="absolute";
}
else
{
this.disDiv.style.left=coveredEl.offsetLeft - this.minWidthDiv.offsetLeft+"px";
this.disDiv.style.top=coveredEl.offsetTop - this.minWidthDiv.offsetTop - 1+"px";
this.disDiv.style.position="relative";
}
vg.html.setWidth(this.disDiv,pos.w+2+"px");
vg.html.setHeight(this.disDiv,pos.h+2+"px");
}
disDiv.pos=pos;
return pos;
},
positionSizeDisableLayer:function()
{
vg.comp._lazyLoadComp(this.layerId);
var layer=vg.comp.getController(document.getElementById(this.layerId));
var disDiv=this.disDiv;
if(this.layerResize)
{
var w,h
h=.5*disDiv.pos.h;
h=(h > "200")?"200":(h < "150")?"150":h;
w=2*h;
w=(w > "400")?"400":(w < "300")?"300":(w > .8*disDiv.pos.w)?.8*disDiv.pos.w:w;
layer.width=w+"px";
layer.height=h+"px";
layer.positionLeft=disDiv.pos.x+(disDiv.pos.w-w)/2;
layer.initSize();
}
layer.reposition();
layer.outerDiv.style.width="100%";
if(this.waitCursor)
{
layer.outerDiv.style.cursor='wait';
}
},
openDisableLayer:function()
{
var controller=this;
this.t=setTimeout(function()
{
if(controller.layerState)
{
jsCBDopenLayer(controller.layerId);
}
}, parseFloat(controller.layerDelay)*1000 );
},
_positionLoadingIndicator:function()
{
var coveredEl=this.coveredEl;
var loadIndicatorDiv=this.loadIndicatorDiv;
var loadingIndicatorHeight=this.loadingIndicatorHeight;
var loadingIndicatorWidth=this.loadingIndicatorWidth;
var bodyScrollTop=_cbdGetScrollTop();
var scrollLeft=_cbdGetScrollLeft();
var screenHeight=jsCBDgetScreenHeight();
var screenWidth=jsCBDgetScreenWidth();
var scrimWidth=vg.html.getObjWidth(coveredEl);
var scrimHeight=vg.html.getObjHeight(coveredEl);
var scrimYPosTop=vg.html.getObjY(document.getElementById(coveredEl));
var scrimYPosBottom=scrimYPosTop+scrimHeight;
var scrimXPosLeft=vg.html.getObjXY(document.getElementById(coveredEl)).x;
var scrimXPosRight=scrimXPosLeft+scrimWidth;
var screenYPosTop=bodyScrollTop;
var screenYPosBottom=bodyScrollTop+screenHeight;
var screenXPosLeft=scrollLeft;
var screenXPosRight=scrollLeft+screenWidth;
var topOfScrimInView=((scrimYPosTop >=screenYPosTop)&&(scrimYPosTop <=screenYPosBottom));
var bottomOfScrimInView=((scrimYPosBottom <=screenYPosBottom)&&(scrimYPosBottom >=screenYPosTop));
var leftOfScrimInView=((scrimXPosLeft >=screenXPosLeft)&&(scrimXPosLeft <=screenXPosRight));
var rightOfScrimInView=((screenXPosRight >=screenXPosLeft)&&(scrimXPosRight <=screenXPosRight));
var loadIndYPos;
var loadIndXPos;
if((scrimYPosTop < screenYPosTop)&&(scrimYPosBottom > screenYPosBottom) )
{
loadIndYPos=parseInt((screenHeight - loadingIndicatorHeight)/2+(bodyScrollTop - scrimYPosTop));
}
else if(!bottomOfScrimInView&&topOfScrimInView)
{
loadIndYPos=parseInt((screenHeight -(scrimYPosTop - bodyScrollTop) - loadingIndicatorHeight)/2);
}
else if(!topOfScrimInView&&bottomOfScrimInView)
{
loadIndYPos=parseInt(((scrimYPosBottom - bodyScrollTop - loadingIndicatorHeight)/2)+(bodyScrollTop - scrimYPosTop));
}
else
{
loadIndYPos=parseInt((scrimHeight - loadingIndicatorHeight)/2);
}
if((scrimXPosLeft < screenXPosLeft)&&(scrimXPosRight > screenXPosRight) )
{
loadIndXPos=parseInt((screenWidth - loadingIndicatorWidth)/2+(scrollLeft - scrimXPosLeft));
}
else if(!rightOfScrimInView&&leftOfScrimInView)
{
loadIndXPos=parseInt((screenWidth -(scrimXPosLeft - scrollLeft) - loadingIndicatorWidth)/2);
}
else if(!leftOfScrimInView&&rightOfScrimInView)
{
loadIndXPos=parseInt(((scrimXPosRight - scrollLeft - loadingIndicatorWidth)/2)+(scrollLeft - scrimXPosLeft));
}
else
{
loadIndXPos=parseInt((scrimWidth - loadingIndicatorWidth)/2);
}
vg.html.setObjTop(loadIndicatorDiv, loadIndYPos);
vg.html.setLeft(loadIndicatorDiv, loadIndXPos);
loadIndicatorDiv.style.display="block";
}
}
Scrim=function(coveredEl,opac,layerId,layerDelay,layerResize,waitCursor,opacColor,loadingIndicator)
{
var COMP_TYPE="scrim";
this.base=vg.Controller;
this.base({viewNodeId:coveredEl,compType:COMP_TYPE});
this.compType=COMP_TYPE;
this.defaultColor='#FFFFFF';
this.defaultToWait=false;
this.defaultOpac=0.65;
this.layer=null;
this.minWidthDiv=null;
this.opacColor=opacColor;
this.loadingIndicatorWidth=36;
this.loadingIndicatorHeight=36;
this.loadingIndicator=loadingIndicator;
this.coveredEl=(vg.html.getElement(coveredEl).id)?vg.html.getElement(coveredEl).id:vg.html.getElement(coveredEl);
this.createDisableModalDiv(coveredEl);
this.openDisableModalDiv(opac,layerId,layerDelay,layerResize,waitCursor,opacColor);
}
var EmptyFunc=function(){};
EmptyFunc.prototype=DisableModalDiv.prototype;
Scrim.prototype=new EmptyFunc();
Scrim.prototype.constructDisabledDiv=function()
{
"use strict";
var disDiv=document.createElement('div'),
disDivChild=document.createElement('div'),
targetElement=vg.html.getElement(this.coveredEl);
disDiv.style.display="none";
disDiv.style.fontSize="0px";
disDiv.style.zIndex="120";
disDiv.style.position="absolute";
disDivChild.style.background=(this.opacColor)?this.opacColor:this.defaultColor;
disDivChild.style.position="absolute";
disDiv.appendChild(disDivChild);
if(this.loadingIndicator)
{
this.loadIndicatorDiv=document.createElement('div');
vg.html.setStyle("loadIndicator", this.loadIndicatorDiv);
disDiv.appendChild(this.loadIndicatorDiv);
}
return disDiv;
}
Scrim.prototype.positionSizeDisableModalDiv=function()
{
'use strict';
var coveredEl=vg.html.getElement(this.coveredEl),
layerDiv=this.layer,
pos=vg.html.getObjXY(coveredEl),
size=vg.html.getObjSize(coveredEl),
disDiv=this.disDiv;
pos.w=size.w;
pos.h=size.h;
if(!layerDiv&&disDiv )
{
this._setXYPosition(pos.x - 1, pos.y - 1);
vg.html.setWidth(disDiv.firstChild,pos.w+1+"px");
vg.html.setHeight(disDiv.firstChild,pos.h+2+"px");
}
else if(layerDiv&&disDiv&&this.minWidthDiv)
{
this.disDiv.firstChild.style.left=coveredEl.offsetLeft - this.minWidthDiv.offsetLeft+"px";
this.disDiv.style.top=coveredEl.offsetTop - this.minWidthDiv.offsetTop - 1+"px";
this.disDiv.style.position="relative";
vg.html.setWidth(this.disDiv.firstChild,pos.w+"px");
vg.html.setHeight(this.disDiv.firstChild,pos.h+"px");
}
disDiv.pos=pos;
return pos;
};
Scrim.prototype._setXYPosition=function(xPosOfCoveredEl, yPosOfCoveredEl)
{
'use strict';
var mainDiv=document.getElementById("main"),
coveredEl=vg.html.getElement(this.coveredEl);
if(vg.html._isAncestorOfRelativeContainer(mainDiv, coveredEl))
{
xPosOfCoveredEl -=vg.html.getObjX(mainDiv, false);
yPosOfCoveredEl -=vg.html.getObjY(mainDiv, false);
}
this.disDiv.style.top=yPosOfCoveredEl+"px";
this.disDiv.style.left=xPosOfCoveredEl+"px";
};
Scrim.prototype.setDisDivOpacity=function(opac)
{
if(this.disDiv.style.position=="relative")
{
this.disDiv.style.zoom="1";
}
this.opac=(opac==null)?this.defaultOpac:opac;
vg.html.setOpacity(this.disDiv.firstChild,this.opac);
}
_cbdGlobalObjects=new Array("cbd","vg", "chatPopup", "errCount", "pageLevelErrors", "allValidators", "_flashCharts", "flyoutArray", "FOCArray","Deck","DeckItem","RolloverMenu","RolloverMenuItem","SideTab","SideTabItem","CheckBox","InfoBox","RadioButton","NineBoxFilter","NavDeck","FlyoutContainer","AutoSuggest","SelectList","SelectTable","Populator","TabBox","RoundBox","DisableModalDiv","SelectOneMenu", "_cbdLooseFuncs");
if(!window._cbdNamespaceBackup )
{
_cbdNamespaceBackup={};
}
vg.util.loadClientSideComp=function(config)
{
if(!config) return;
var loader=cbd.loader;
if(config.module )
{
loader.require(config.module);
}
if(config.callback )
{
loader.addCallback(config.callback);
}
if(config.module||config.callback)
{
loader.load();
}
}
vg.util.loadJSIntoNS=function(load)
{
var _isJSfunctionsLoaded=function()
{
return(window.jsfunctionsLoaded);
}
var _cbdLoadLoader=function()
{
cbd.page.basePageLoaded=true;
jsCBDloadScript(load.server+window.loaderWebContextRoot+'/javascript/loader.js' );
_cbdCheckConditionsAndExecute(_isCBDLoaderDefined, _cbdLoadCoreFiles);
}
var _cbdLoadCoreFiles=function()
{
cbd.loader.require("RIA");
cbd.loader.require('AJAX');
cbd.loader.require('VG');
cbd.loader.require('FORMCHECK');
if(load.jsFiles)
{
var length=load.jsFiles.length;
for(var index=0;index < length;index++)
{
cbd.loader.addModule({
name:load.jsFiles[index],
type:'js',
fullpath:load.server+window.loaderWebContextRoot+load.jsFiles[index]
});
cbd.loader.require(load.jsFiles[index]);
}
}
cbd.loader.addCallback(function(){vg.util.execFunc(load.callback)});
cbd.loader.load();
}
var _cbdloadJSIntoNS=function(){
if(!(load.server)||(load.server==null))
{
load.server="";
}
_cbdSaveOriginalNamespace();
if(load.contextRoot!=null)
{
_cbdContextRoot=load.contextRoot;
}
window.jsfunctionsLoaded=false;
window.loaderWebBase=load.server;
if(load.webContextRoot)
{
window.loaderWebContextRoot=load.webContextRoot;
}
else
{
window.loaderWebContextRoot='/web'
}
jsCBDloadScript(load.server+window.loaderWebContextRoot+'/javascript/jsfunctions.js');
_cbdCheckConditionsAndExecute(_isJSfunctionsLoaded,_cbdLoadLoader);
}
_cbdCheckConditionsAndExecute(_cbdAreDelayedEventsFinished, _cbdloadJSIntoNS)
}
_cbdSaveOriginalNamespace=function()
{
for(var prop in window)
{
if(prop.indexOf('jsCBD')==0||prop.indexOf('_cbd')==0)
{
_cbdNamespaceBackup[prop]=window[prop];
}
}
for(i=0;i < _cbdGlobalObjects.length;i++)
{
_cbdNamespaceBackup[_cbdGlobalObjects[i]]=window[_cbdGlobalObjects[i]];
if(window[_cbdGlobalObjects[i]]instanceof Array)
{
window[_cbdGlobalObjects[i]]=new Array();
}
else
{
window[_cbdGlobalObjects[i]]=null;
}
}
}
vg.util.Map=function()
{
this.objArray=new Array();
}
vg.util.Map.prototype=
{
put:function(key, val)
{
this.objArray[key]=val;
},
get:function(key)
{
return this.objArray[key];
}
}
vg.comp._lazyLoadComp=function(id, requiredModule, event)
{
if(!vg.comp._hasController(id))
{
var script=vg.html._getElementWithIdPrefixes(id+"_script");
if(script!=null)
{
if(requiredModule)
{
cbd.loader.loadAndExec(requiredModule, function evalScript(){eval(script.innerHTML);}, true);
}
else
{
eval(script.innerHTML);
}
}
}
}
vg.util.restoreOriginalNS=function(func)
{
var _restore=function()
{
vg.html._cbdCopyProperties(_cbdNamespaceBackup._cbdLooseFuncs, window);
vg.html._cbdCopyProperties(_cbdNamespaceBackup, window);
vg.util.execFunc(func);
}
_cbdCheckConditionsAndExecute(_cbdAreDelayedEventsFinished, _restore)
}
vg.html._cbdCopyProperties=function(sourceNode, destinationNode)
{
for(var prop in sourceNode)
{
destinationNode[prop]=sourceNode[prop];
}
}
vg.html._cbdGetCSSContainer=function(targetNode)
{
return cssContainer=vg.html.findAncestor(targetNode,{},
function(node)
{
return vg.html.hasStyle("vg0", node)||vg.html.hasStyle("vg1", node);
}
);
}
HeightSyncCallout=function(tbId,clId)
{
this.base=vg.Controller;
this.tabbox=vg.html.getElement(tbId);
this.callout=vg.html.getElement(clId);
this.tabDiv=this.tabbox.getElementsByTagName('div')[0];
this.roundBox=this.tabbox.getElementsByTagName('table')[0];
this.scrollDiv=vg.html.getElements(this.roundBox,{tagName:'div', attrName:'class', attrValue:'roundBoxScrollDiv'})[0];
var controller=this;
vg.html.addEventListener(this.tabbox, 'click', function(e){controller.adjustHeight(e)});
vg.html.addEventListener(null, vg.event.GEO_CHANGE, function(e, args){controller.adjustHeight(e,args)});
vg.html.addEventListener(null, vg.event.DOM_CHANGE, function(e, args){controller.adjustHeight(e,args)});
vg.html.addEventListener(window, 'resize', function(e, args){controller.adjustHeight(e,args);});
this.adjustHeight();
}
HeightSyncCallout.prototype=
{
adjustHeight:function()
{
vg.html.setHeight(this.roundBox,(ie)?"100%":"auto");
vg.html.setHeight(this.scrollDiv,(ie)?"":"auto");
vg.html.setHeight(this.callout,(ie)?"100%":"auto");
var tabboxHeight=vg.html.getObjHeight(this.tabbox);
var tabDivHeight=vg.html.getObjHeight(this.tabDiv);
var scrollDivHeight=vg.html.getObjHeight(this.scrollDiv.parentNode);
var calloutHeight=vg.html.getObjHeight(this.callout);
if(tabboxHeight > calloutHeight )
{
vg.html.setHeight(this.callout,tabboxHeight+"px")
}
else
{
vg.html.setHeight(this.scrollDiv,calloutHeight-tabDivHeight+"px");
}
}
}
vg.Menu=function(cfg)
{
vg.util.attachJsonOptions(this, cfg);
this.base=vg.Controller;
this.base(this.id, null);
this.menuBar=null;
var THIS=this;
var init_menus=function()
{
var YUI=cbd.getYUI();
var menuBar=YUI.one(document.getElementById(THIS.id));
THIS.menuBar=menuBar.plug(YUI.Plugin.MenuBarPlugin, cfg);
};
cbd.loader.loadAndExec('cbdMenuPlugin', init_menus);
}
vg.Menu.selectedMenu=null;
vg.Menu.setLabel=function(id, text)
{
vg.html.getElement(id+"_labelSpanInner").innerHTML=text;
}
vg.Menu._setValue=function(menuId, value)
{
"use strict";
vg.comp._lazyLoadComp(menuId);
var options=vg.html.getElements(vg.html.getElement(menuId+"subMenu"),{tagName:'a', attrName:'role', attrValue:'menuitem'}),
optionsLength=options.length,
i=0,
option;
for(i=0;i < optionsLength;i++)
{
option=options[i];
if(option.getAttribute("value")===value.toString())
{
jsCBDtriggerEventOnNode(option.getAttribute("id"), "click");
}
}
}
vg.Menu._getValue=function(menuId)
{
return vg.html.getElement(menuId).getAttribute("value");
}
vg.Menu._closeMenu=function(e, closeOnInsideMenuClick)
{
var openMenuNav=vg.Menu.selectedMenu,
openRootMenu=openMenuNav?openMenuNav._rootMenu:null,
eNode=jsCBDgetEventNode(e),
clickedInsideMenu;
if(openMenuNav!==null)
{
if(e.type==='scroll')
{
if(!cbd.browser.isTouchScreen)
{
openMenuNav._hideAllSubmenus(openRootMenu);
}
}
else if(eNode!==null)
{
clickedInsideMenu=openRootMenu.compareTo(eNode)||openRootMenu.contains(eNode);
if(!clickedInsideMenu||closeOnInsideMenuClick)
{
openMenuNav._hideAllSubmenus(openRootMenu);
}
}
}
}
vg.Menu.closeMenu=function(event, closeOnInsideMenuClick)
{
if(vg.Menu)
{
vg.Menu._closeMenu(event, closeOnInsideMenuClick);
}
}
vg.Menu.prototype=
{
_destroy:function()
{
if(this.menuBar )
{
this.menuBar.destroy();
}
}
}
vg.GHMenu=function(cfg)
{
vg.util.attachJsonOptions(this, cfg);
this.base=vg.Controller;
this.base(this.id, null);
this.menuBar=null;
var THIS=this;
var init_menus=function()
{
var YUI=cbd.getYUI();
var menuBar=YUI.one(document.getElementById(THIS.id));
if(!vg.GHMenu.disableYUImenu)
{
THIS.menuBar=menuBar.plug(YUI.Plugin.GHMenuBarPlugin, cfg);
}
};
cbd.loader.loadAndExec('cbdGHMenuPlugin', init_menus);
}
vg.GHMenu.prototype=
{
_destroy:function()
{
if(this.menuBar )
{
this.menuBar.destroy();
}
}
};
(function(vg, htmlNamespace, cbd, cbdcommon)
{
vg.DataTable=function(id, respCfg, largeRespCfg, scrollDivContainerPos)
{
var THIS=this,
Y=cbd.getYUI();
this.base=vg.Controller;
this.base(id, null);
this.id=id;
this.respCfg=respCfg||{};
this.largeRespCfg=largeRespCfg||{};
this.YUIViewNode=Y.one(this.viewNode);
this.lastSize=null;
this.currentSize=null;
this.currentRowHeadWidth=null;
this.rowHeadCols=this._getRowHeadCols();
this.scrollDivContainerPos=scrollDivContainerPos;
this._toggleRespMarkup();
this._addDataTableListeners();
};
vg.DataTable.initialization=function(id)
{
vg.comp._lazyLoadComp(id);
};
vg.DataTable.refreshRespMarkup=function(id)
{
if(cbd.page.isResponsiveCapable===true)
{
var node=htmlNamespace.getElement(id),
nodeController=vg.comp.getController(node);
if(nodeController)
{
nodeController._toggleRespMarkup();
}
}
};
vg.DataTable.updateTableOnSort=function(linkId, dataTableId)
{
var dataTable=htmlNamespace.getElement(dataTableId),
linkNode=document.getElementById(linkId),
scrollLeftPos="scrollLeftPos=",
scrollLeftPosValue=0,
divContainer;
divContainer=vg.html.getElements(dataTable,{tagName:'', attrName:'class', attrValue:'dataTableScrollCnt'})[0];
if(divContainer)
{
scrollLeftPosValue=divContainer.scrollLeft;
}
jsCBDupdateComponent(dataTableId, linkNode, null, scrollLeftPos+scrollLeftPosValue);
};
vg.DataTable._toggleScrollIndicators=function(dataTableId, respDataTableCnt)
{
"use strict";
var dataTable=htmlNamespace.getElement(dataTableId),
dataTableController=vg.comp.getController(dataTable),
Y=cbd.getYUI(),
dataTableCntYUINode=Y.one(respDataTableCnt);
dataTableController._changeScrollIndicator(dataTableCntYUINode);
};
vg.DataTable.prototype={
cssClasses:{
RESP_SCROLL_SML:'respScrollOnSml',
RESP_SCROLL_MED:'respScrollOnMed',
RESP_DRAG_SCROLL_AREA_SML:'respDragScrollAreaOnSml',
RESP_DRAG_SCROLL_AREA_MED:'respDragScrollAreaOnMed',
RESP_DRAG_SCROLL_AREA_LRG:'respDragScrollAreaOnLrg',
DRAGGABLE_SCROLL_AREA:'draggableScrollArea',
RESP_CONDENSE_SML:'respCondenseOnSml',
RESP_CONDENSE_MED:'respCondenseOnMed',
ROW_HEAD:'respDataTableRH',
CONTENT:'respDataTableCnt',
CONDENSE:'respDataTableCondense',
START_ITEM:'respStartItem',
END_ITEM:'respEndItem',
ITEM:'respItem',
SUB_DATA_TABLE:'subDataTable',
SCROLL_TD:'scrollTD',
DATA_TABLE_SCROLL_CNT:'dataTableScrollCnt'
},
constants:{
INDICATOR_SHOWN:'indicatorShown',
SCROLL_LEFT:'scrollLeft',
SCROLL_WIDTH:'scrollWidth',
OFFSET_WIDTH:'offsetWidth',
OFFSET_HEIGHT:'offsetHeight',
LEFT:'left',
HEIGHT:'height'
},
selectors:{
INDICATOR_LEFT_SIDE:'indicatorLeftSide',
INDICATOR_RIGHT_SIDE:'indicatorRightSide',
ARROW_LEFT_SIDE:'arrowLeftSide',
ARROW_RIGHT_SIDE:'arrowRightSide',
ARROW_TR:'arrowTR'
},
tagsToClone:[
{
"name":"input",
"attributes":[
{"name":"jsControllers", "copyIfUndefined":false},
{"name":"valid", "copyIfUndefined":true},
{"name":"infomsg", "copyIfUndefined":true},
{"name":"defaultText", "copyIfUndefined":true},
{"name":"checked", "copyIfUndefined":true}
]
},
{
"name":"label",
"attributes":[
{"name":"jsController", "copyIfUndefined":false},
{"name":"jsControllers", "copyIfUndefined":false}
]
}
],
_addDataTableListeners:function()
{
var THIS=this;
htmlNamespace.addEventListener(window, vg.event.BROWSER_RESIZE_END, function(e){
if(e.breakPoint!==e.previousBreakPoint)
{
THIS._toggleRespMarkup({"currentBP":e.breakPoint, "previousBP":e.previousBreakPoint}, vg.event.BREAK_POINT_CHANGE);
}
else
{
THIS._toggleRespMarkup({"currentBP":e.breakPoint, "previousBP":e.previousBreakPoint}, e.customType);
}
}, "respDataTable"+this.id);
},
_toggleRespMarkup:function(sizes, eventType)
{var smallCfg=this.respCfg.small,
smallHeaderWidth=(smallCfg&&smallCfg.options&&smallCfg.options.rowHeadWidth)||
(smallCfg&&smallCfg.scrollOptions&&smallCfg.scrollOptions.rowHeadWidth),
mediumCfg=this.respCfg.medium,
mediumHeaderWidth=(mediumCfg&&mediumCfg.options&&mediumCfg.options.rowHeadWidth)||
(mediumCfg&&mediumCfg.scrollOptions&&mediumCfg.scrollOptions.rowHeadWidth),
largeCfg=this.largeRespCfg.large,
largeHeaderWidth=(largeCfg&&largeCfg.options&&largeCfg.options.rowHeadWidth)||
(largeCfg&&largeCfg.scrollOptions&&largeCfg.scrollOptions.rowHeadWidth),
markupType=this._getRespMarkupType();
this.lastSize=(sizes&&sizes.previousBP)||this.currentSize;
this.currentSize=(sizes&&sizes.currentBP)||cbdcommon.screen.getMediaQuerySize();
if(this.currentSize===undefined)
{
this.currentSize='large';
}
if(this.currentSize===cbdcommon.screen.mediaQuerySmall )
{
this.currentRowHeadWidth=smallHeaderWidth;
}
else if(this.currentSize===cbdcommon.screen.mediaQueryMedium)
{
this.currentRowHeadWidth=mediumHeaderWidth;
}
else if(this.currentSize===cbdcommon.screen.mediaQueryLarge)
{
this.currentRowHeadWidth=largeHeaderWidth;
}
else
{
this.currentRowHeadWidth=null;
}
this._changeMarkup(markupType, eventType);
},
_changeMarkup:function(markupType, eventType)
{
var currentSize=this.currentSize;
if(currentSize===cbdcommon.screen.mediaQuerySmall)
{
this._changeMarkupSmall(markupType, eventType);
}
else if(currentSize===cbdcommon.screen.mediaQueryMedium)
{
this._changeMarkupMedium(markupType, eventType);
}
else if(currentSize===cbdcommon.screen.mediaQueryLarge)
{
this._changeMarkupLarge(markupType, eventType);
}
},
_changeMarkupSmall:function(markupType, eventType)
{
var nodeParent=this.YUIViewNode.get('parentNode'),
currentRowHeadWidth=this.currentRowHeadWidth;
if(eventType==='CBD_SYNTH_BROWSER_RESIZE_END')
{
switch(markupType)
{
case 'scroll':
if(nodeParent.hasClass('respScrollOnSml'))
{
this._resizeRespMarkupScroll();
}
break;
}
}
else
{
switch(markupType)
{
case 'condense':
if(nodeParent.hasClass('respCondenseOnSml'))
{
this._renderRespMarkupCondense(currentRowHeadWidth);
}
else
{
this._hideRespMarkupCondense();
}
break;
case 'scroll':
if(nodeParent.hasClass('respScrollOnSml'))
{
this._hideRespMarkupScroll();
this._renderRespMarkupScroll(currentRowHeadWidth);
}
else
{
this._hideRespMarkupScroll();
}
break;
}
}
},
_changeMarkupMedium:function(markupType, eventType)
{
var nodeParent=this.YUIViewNode.get('parentNode'),
currentRowHeadWidth=this.currentRowHeadWidth;
if(eventType==='CBD_SYNTH_BROWSER_RESIZE_END')
{
switch(markupType)
{
case 'scroll':
if(nodeParent.hasClass('respScrollOnMed'))
{
this._resizeRespMarkupScroll();
}
break;
}
}
else
{
switch(markupType)
{
case 'condense':
if(nodeParent.hasClass('respCondenseOnMed'))
{
this._renderRespMarkupCondense(currentRowHeadWidth);
}
else
{
this._hideRespMarkupCondense();
}
break;
case 'scroll':
if(nodeParent.hasClass('respScrollOnMed'))
{
this._hideRespMarkupScroll();
this._renderRespMarkupScroll(currentRowHeadWidth);
}
else
{
this._hideRespMarkupScroll();
}
break;
}
}
},
_changeMarkupLarge:function(markupType, eventType)
{
var nodeParent=this.YUIViewNode.get('parentNode');
if(eventType==='CBD_SYNTH_BROWSER_RESIZE_END')
{
switch(markupType)
{
case 'scroll':
if(nodeParent.hasClass('scrollableDataTable')||nodeParent.hasClass('respScrollOnLrg'))
{
this._resizeRespMarkupScroll();
}
break;
}
}
else
{
switch(markupType)
{
case 'condense':
this._hideRespMarkupCondense();
break;
case 'scroll':
if(nodeParent.hasClass('scrollableDataTable')||nodeParent.hasClass('respScrollOnLrg'))
{
this._hideRespMarkupScroll();
this._renderRespMarkupScroll();
}
else
{
this._hideRespMarkupScroll();
}
break;
}
}
},
_renderRespMarkupCondense:function()
{
var YUIViewNode=this.YUIViewNode,
cssClasses=this.cssClasses,
contentTbody=YUIViewNode.one('.'+cssClasses.CONTENT),
condenseTbody=YUIViewNode.one('.'+cssClasses.CONDENSE),
condenseTbodyTRs=null,
condenseTbodyTRsLen=0,
condenseTbodyTR=null,
tableHeaderItems=[],
contentNodeClone=null,
contentNodeCloneTRs=null,
contentNodeCloneTRsLen=0,
contentNodeCloneItems=null,
contentNodeCloneTDs=null,
contentNodeCloneTHs=null,
convertContentNodeCloneTRs=null,
convertCondenseTbodyTRs=null,
trIndex=0,
cloneAttrTracker=this._generateCloneAttrTracker(),
attrToBeCopied=null,
YUIObj=cbd.getYUI();
if(condenseTbody===null)
{
contentNodeClone=contentTbody.cloneNode(true);
attrToBeCopied=this._generateAttrToBeCopied({"tBody":contentTbody});
condenseTbody=this._setUpCondenseTbody(contentNodeClone);
condenseTbodyTRs=htmlNamespace.getElements(condenseTbody.getDOMNode(),{tagName:'tr', maxDepth:1});
contentNodeCloneTRs=htmlNamespace.getElements(contentNodeClone.getDOMNode(),{tagName:'tr', maxDepth:1});
contentNodeCloneTRsLen=contentNodeCloneTRs.length;
for(trIndex=0;trIndex < contentNodeCloneTRsLen;trIndex++)
{
condenseTbodyTR=YUIObj.one(condenseTbodyTRs[trIndex]);
convertContentNodeCloneTRs=YUIObj.one(contentNodeCloneTRs[trIndex]);
if(trIndex===0)
{
cloneAttrTracker=this._condenseHeaderItems({"cloneAttrTracker":cloneAttrTracker, "attrToBeCopied":attrToBeCopied, "contentTR":convertContentNodeCloneTRs, "headerItems":tableHeaderItems, "condenseTbody":condenseTbody});
}
else
{
cloneAttrTracker=this._condenseNonHeaderItems({"cloneAttrTracker":cloneAttrTracker, "attrToBeCopied":attrToBeCopied, "contentTR":convertContentNodeCloneTRs, "headerItems":tableHeaderItems, "condenseTbodyRow":condenseTbodyTR, "condenseTbody":condenseTbody});
}
condenseTbodyTR.remove();
}
contentNodeClone.remove();
YUIViewNode.prepend(condenseTbody);
contentTbody.remove();
}
else
{
if(this.currentSize!==this.lastSize)
{
condenseTbodyTRs=htmlNamespace.getElements(condenseTbody.getDOMNode(),{tagName:'tr', maxDepth:1});
condenseTbodyTRsLen=condenseTbodyTRs.length;
for(trIndex=0;trIndex < condenseTbodyTRsLen;trIndex++)
{
if(trIndex > 0)
{
convertCondenseTbodyTRs=YUIObj.one(condenseTbodyTRs[trIndex]);
contentNodeCloneItems=convertCondenseTbodyTRs.get('children');
this._setTableElementWidths(contentNodeCloneItems.item(0), contentNodeCloneItems.item(1));
}
}
}
}
},
_condenseHeaderItems:function(params)
{
var contentNodeCloneItems=null,
contentNodeCloneItemsLen=0,
contentNodeCloneTDs=null,
contentNodeCloneTHs=null,
stripContentNodeCloneItem=null,
index=0;
params.contentTR.toggleView();
params.cloneAttrTracker=this._applyAttrToBeCopied(params.contentTR, params);
params.condenseTbody.append(params.contentTR);
contentNodeCloneItems=params.contentTR.get('children');
contentNodeCloneItemsLen=contentNodeCloneItems.size();
for(index=0;index < contentNodeCloneItemsLen;index++)
{
stripContentNodeCloneItem=this._stripHeader(contentNodeCloneItems.item(index).cloneNode(true));
params.headerItems.push(stripContentNodeCloneItem.get('outerHTML'));
}
return params.cloneAttrTracker;
},
_condenseNonHeaderItems:function(params)
{
var Y=cbd.getYUI(),
contentNodeCloneTDs=null,
contentNodeCloneTDsLen=0,
condenseTbodyTRClone=null,
convertTDYUINode=null,
tableHeaderYUINode=null,
cssClasses=this.cssClasses,
START_ITEM=cssClasses.START_ITEM,
ITEM=cssClasses.ITEM,
END_ITEM=cssClasses.END_ITEM,
tdIndex=0;
contentNodeCloneTDs=htmlNamespace.getElements(params.contentTR.getDOMNode(),{tagName:'td', maxDepth:1});
contentNodeCloneTDsLen=contentNodeCloneTDs.length;
for(tdIndex=0;tdIndex < contentNodeCloneTDsLen;tdIndex++)
{
condenseTbodyTRClone=params.condenseTbodyRow.cloneNode(true);
convertTDYUINode=Y.one(contentNodeCloneTDs[tdIndex]);
if(tdIndex===0)
{
condenseTbodyTRClone.addClass(START_ITEM);
}
else if(tdIndex===(contentNodeCloneTDsLen - 1) )
{
condenseTbodyTRClone.addClass(END_ITEM);
}
condenseTbodyTRClone.addClass(ITEM);
tableHeaderYUINode=Y.Node.create(params.headerItems[tdIndex]);
this._setTableElementWidths(tableHeaderYUINode, convertTDYUINode);
params.cloneAttrTracker=this._applyAttrToBeCopied(convertTDYUINode, params);
condenseTbodyTRClone.append(tableHeaderYUINode);
condenseTbodyTRClone.append(convertTDYUINode);
params.condenseTbody.append(condenseTbodyTRClone);
}
return params.cloneAttrTracker;
},
_hideRespMarkupCondense:function()
{
var YUIViewNode=this.YUIViewNode,
cssClasses=this.cssClasses,
contentTbody=YUIViewNode.one('.'+cssClasses.CONTENT),
condenseTbody=YUIViewNode.one('.'+cssClasses.CONDENSE),
condenseNodeClone=null,
condenseNodeCloneTRs=null,
condenseNodeCloneTRsLen=0,
trIndex=0,
cloneAttrTracker=this._generateCloneAttrTracker(),
attrToBeCopied=null,
convertcondenseNodeCloneTRs=null,
YUIObj=cbd.getYUI();
cloneAttrTracker.contentCurrentRow=-1;
if(contentTbody===null)
{
attrToBeCopied=this._generateAttrToBeCopied({"tBody":condenseTbody});
contentTbody=condenseTbody.cloneNode(true);
contentTbody.removeClass(cssClasses.CONDENSE);
contentTbody.addClass(cssClasses.CONTENT);
contentTbody.getDOMNode().innerHTML='';
condenseNodeClone=condenseTbody.cloneNode(true);
condenseNodeCloneTRs=htmlNamespace.getElements(condenseNodeClone.getDOMNode(),{tagName:'tr', maxDepth:1});
condenseNodeCloneTRsLen=condenseNodeCloneTRs.length;
for(trIndex=0;trIndex < condenseNodeCloneTRsLen;trIndex++)
{
convertcondenseNodeCloneTRs=YUIObj.one(condenseNodeCloneTRs[trIndex]);
cloneAttrTracker=this._uncondenseItems({"index":trIndex, "cloneAttrTracker":cloneAttrTracker, "attrToBeCopied":attrToBeCopied, "condenseTRs":condenseNodeCloneTRs , "condenseTR":convertcondenseNodeCloneTRs, "contentTbody":contentTbody});
}
condenseNodeClone.remove();
YUIViewNode.prepend(contentTbody);
condenseTbody.remove();
}
},
_uncondenseItems:function(params)
{
var condenseNodeCloneTHs=null,
condenseNodeCloneTDs=null,
condenseNodeCloneItems=null,
condenseNodeCloneItemsLen=0,
condenseTR=params.condenseTR,
condenseTRs=params.condenseTRs,
cssClasses=this.cssClasses,
START_ITEM=cssClasses.START_ITEM,
ITEM=cssClasses.ITEM,
END_ITEM=cssClasses.END_ITEM,
index=0,
YUIcontentCurrentRow=null,
YUIObj=cbd.getYUI();
if(condenseTR.hasClass(START_ITEM))
{
condenseTR.removeClass(START_ITEM);
condenseTR.removeClass(ITEM);
params.cloneAttrTracker.contentCurrentRow=params.index;
}
condenseNodeCloneItems=condenseTR.get('children');
condenseNodeCloneItemsLen=condenseNodeCloneItems.size();
YUIcontentCurrentRow=YUIObj.one(condenseTRs[params.cloneAttrTracker.contentCurrentRow]);
if(params.cloneAttrTracker.contentCurrentRow >=0)
{
for(index=0;index < condenseNodeCloneItemsLen;index++)
{
if(index > 0)
{
condenseNodeCloneItems.item(index).setStyle('width', '');
params.cloneAttrTracker=this._applyAttrToBeCopied(condenseNodeCloneItems.item(index), params);
YUIcontentCurrentRow.append(condenseNodeCloneItems.item(index));
}
else
{
condenseNodeCloneItems.item(index).remove();
}
}
}
else
{
condenseTR.toggleView();
for(index=0;index < condenseNodeCloneItemsLen;index++)
{
params.cloneAttrTracker=this._applyAttrToBeCopied(condenseNodeCloneItems.item(index), params);
}
params.contentTbody.append(condenseTR);
}
if(condenseTR.hasClass(END_ITEM))
{
params.contentTbody.append(YUIcontentCurrentRow);
}
return params.cloneAttrTracker;
},
_renderRespMarkupScroll:function()
{
var Y=cbd.getYUI(),
cssClasses=this.cssClasses,
YUIViewNode=this.YUIViewNode,
rowHeadCols=this.rowHeadCols[this.currentSize].rowHeadCols - 1,
contentTbody=YUIViewNode.one('.'+cssClasses.CONTENT),
contentTbodyAttr=contentTbody.get('attributes'),
rowHeadDiv=YUIViewNode.one('.'+cssClasses.ROW_HEAD),
scrollStructure=null,
contentNodeTRs=[],
contentNodeClone=null,
contentNodeCloneTRs=[],
contentNodeCloneTRsLen=0,
rowHeadTableNode=null,
cntTableNode=null,
convertContentNodeCloneTRs=[],
convertContentNodeTRs=[],
contentNodeCloneItems=null,
contentNodeItems=null,
trIndex=0,
contentNodeItemsLen,
tdIndex,
contentNodeItem,
markupChanged=false;
if(rowHeadDiv===null)
{
contentNodeTRs=vg.html.getElements(contentTbody.getDOMNode(),{tagName:'tr', maxDepth:2});
contentNodeClone=contentTbody.cloneNode(true);
contentNodeCloneTRs=vg.html.getElements(contentNodeClone.getDOMNode(),{tagName:'tr', maxDepth:2});
contentNodeCloneTRsLen=contentNodeCloneTRs.length;
for(trIndex=0;trIndex < contentNodeCloneTRsLen;trIndex++)
{
convertContentNodeCloneTRs=Y.one(contentNodeCloneTRs[trIndex]);
convertContentNodeCloneTRs.get('childNodes').remove();
convertContentNodeTRs=Y.one(contentNodeTRs[trIndex]);
contentNodeItems=convertContentNodeTRs.get('children');
for(tdIndex=0;tdIndex <=rowHeadCols;tdIndex++)
{
contentNodeItem=contentNodeItems.item(tdIndex).remove();
convertContentNodeCloneTRs.append(contentNodeItem);
}
}
scrollStructure=this._createScrollStructure({"rowHeadTRs":contentNodeCloneTRs, "contentTRs":contentNodeTRs, "contentTbody":contentTbody});
YUIViewNode.get('childNodes').remove();
YUIViewNode.appendChild(scrollStructure);
if(this._hasScrollIndicator()&&!ieQuirksMode)
{
this._addScrollIndicators();
}
this._addScrollContentDragListeners();
markupChanged=true;
}
this._resizeRespMarkupScroll();
if(this.scrollDivContainerPos)
{
divContainer=vg.html.getElements(scrollStructure,{tagName:'', attrName:'class', attrValue:cssClasses.DATA_TABLE_SCROLL_CNT})[0];
if(divContainer)
{
divContainer.scrollLeft=this.scrollDivContainerPos;
}
}
if(markupChanged)
{
vg.html._fireCustomEvent(vg.event.DATA_TABLE_STRUCTURE_CHANGE, this.viewNode);
}
},
_createScrollStructure:function(params)
{
var Y=cbd.getYUI(),
cssClasses=this.cssClasses,
YUIViewNode=this.YUIViewNode,
contentTbody=params.contentTbody,
contentTbodyAttr=contentTbody.get('attributes'),
tableDivCnt=null,
tableCnt=this._createBaseTable(),
tableTbodyCnt=document.createElement('tbody'),
tableDivRowHead=document.createElement('div'),
tableRowHead=this._createBaseTable(),
tableTbodyRowHead=document.createElement('tbody'),
rowHeadTableNode=null,
cntTableNode=null,
scrollTableTbody=document.createElement('tbody'),
scrollTableTR=document.createElement('tr'),
scrollTableRowHeadTD=document.createElement('td'),
scrollTableContentTD=document.createElement('td');
tableRowHead.appendChild(tableTbodyRowHead);
rowHeadTableNode=Y.Node(tableTbodyRowHead);
rowHeadTableNode.appendChild(params.rowHeadTRs);
tableCnt.appendChild(tableTbodyCnt);
cntTableNode=Y.Node(tableTbodyCnt);
cntTableNode.appendChild(params.contentTRs);
tableDivRowHead.className=cssClasses.ROW_HEAD;
tableDivCnt=this._newElement({'elementType':'div', 'attrList':contentTbodyAttr});
tableRowHead.className=cssClasses.SUB_DATA_TABLE;
tableCnt.className=cssClasses.SUB_DATA_TABLE;
if(ieQuirksMode)
{
tableCnt.style.cssText='margin-bottom:'+cbdcommon.support.scrollbarWidth+';';
}
tableDivRowHead.appendChild(tableRowHead);
tableDivCnt.appendChild(tableCnt);
scrollTableRowHeadTD.appendChild(tableDivRowHead);
scrollTableRowHeadTD.className=cssClasses.SCROLL_TD;
scrollTableContentTD.appendChild(tableDivCnt);
scrollTableContentTD.className=cssClasses.SCROLL_TD;
this._setTableElementWidths(scrollTableRowHeadTD, scrollTableContentTD);
scrollTableTR.appendChild(scrollTableRowHeadTD);
scrollTableTR.appendChild(scrollTableContentTD);
scrollTableTbody.appendChild(scrollTableTR);
return scrollTableTbody;
},
_createBaseTable:function()
{
var table=document.createElement('table');
table.setAttribute('border', '0');
table.setAttribute('cellPadding', '0');
table.setAttribute('cellSpacing', '0');
return table;
},
_resizeRespMarkupScroll:function()
{
var YUIViewNode=this.YUIViewNode,
cssClasses=this.cssClasses,
contentDivId="",
contentDiv=YUIViewNode.one('.'+cssClasses.CONTENT),
rowHeadDiv=YUIViewNode.one('.'+cssClasses.ROW_HEAD),
contentTD=contentDiv.get('parentNode'),
rowHeadTD=rowHeadDiv.get('parentNode');
this._setTableElementWidths(rowHeadTD, contentTD);
this._configureHeights(contentDiv, rowHeadDiv);
if(this._hasScrollIndicator()&&!ieQuirksMode )
{
contentDivId=contentDiv.get('id');
this._changeScrollIndicator(contentDiv);
this._setScrollIndicatorPOS({"contentDiv":contentDiv});
this._addScrollEventListener(contentDivId);
}
},
_hideRespMarkupScroll:function()
{
var YUIObj=cbd.getYUI(),
YUIViewNode=this.YUIViewNode,
cssClasses=this.cssClasses,
scrollDiv=null,
scrollDivAttr=[],
i=0,
tableTbody=null,
tableTbodyNode=null,
contentDiv=YUIViewNode.one('.'+cssClasses.CONTENT),
contentDivAttr=contentDiv.get('attributes'),
rowHeadDiv=YUIViewNode.one('.'+cssClasses.ROW_HEAD),
contentTRs=[],
contentTRsLen=0,
rowHeadTRs=[],
contentItem=[],
contentItems=[],
contentItemsLen=0,
index=0;
if(rowHeadDiv!==null)
{
contentTRs=htmlNamespace.getElements(contentDiv.getDOMNode(),{tagName:'tr', maxDepth:3});
rowHeadTRs=htmlNamespace.getElements(rowHeadDiv.getDOMNode(),{tagName:'tr', maxDepth:3});
tableTbody=this._newElement({'elementType':'tbody', 'attrList':contentDivAttr});
tableTbodyNode=YUIObj.Node(tableTbody);
tableTbodyNode.appendChild(contentTRs);
contentTRsLen=contentTRs.length;
for(i=0;i < contentTRsLen;i++)
{
contentItem=YUIObj.one(contentTRs[i]).get('firstChild');
contentItems=YUIObj.one(rowHeadTRs[i]).get('children');
contentItemsLen=contentItems.size();
for(index=0;index < contentItemsLen;index++)
{
contentItem.insert(contentItems.item(index), 'before');
}
}
YUIViewNode.get('childNodes').remove();
YUIViewNode.appendChild(tableTbody);
this._resetOriginalTableRowsHeights();
vg.html._fireCustomEvent(vg.event.DATA_TABLE_STRUCTURE_CHANGE, this.viewNode);
}
},
_resetOriginalTableRowsHeights:function()
{
var table=this.viewNode,
rows=htmlNamespace.getElements(table,{tagName:'tr'}),
rowsLength=rows.length;
while(rowsLength--)
{
this._clearHeight(rows[rowsLength]);
}
},
_isSimpleDataTable:function()
{
return this.YUIViewNode.hasClass("simpleDataTable");
},
_isContentTable:function()
{
return this.YUIViewNode.hasClass("bcm2ContTable");
},
_newElement:function(params)
{
var element=document.createElement(params.elementType),
i=params.attrList.size();
while(i--)
{
if(params.attrList.item(i).get('name')!=='style')
{
if(params.attrList.item(i).get('name')==='class')
{
element.className=params.attrList.item(i).get('nodeValue');
}
else
{
element.setAttribute(params.attrList.item(i).get('name'), params.attrList.item(i).get('nodeValue'));
}
}
}
return element;
},
_getRowHeadCols:function()
{
var smallCfg=this.respCfg.small,
smallOptions=smallCfg&&smallCfg.scrollOptions,
smallRowHeadCols=smallOptions&&smallOptions.rowHeadCols,
mediumCfg=this.respCfg.medium,
mediumOptions=mediumCfg&&mediumCfg.scrollOptions,
mediumRowHeadCols=mediumOptions&&mediumOptions.rowHeadCols,
largeCfg=this.largeRespCfg.large,
largeOptions=largeCfg&&largeCfg.scrollOptions,
largeRowHeadCols=largeOptions&&largeOptions.rowHeadCols;
if(!smallRowHeadCols)
{
smallRowHeadCols="1";
}
if(!mediumRowHeadCols)
{
mediumRowHeadCols="1";
}
if(!largeRowHeadCols )
{
largeRowHeadCols="1";
}
return{"small":{"rowHeadCols":smallRowHeadCols}, "medium":{"rowHeadCols":mediumRowHeadCols}, "large":{"rowHeadCols":largeRowHeadCols}};
},
_addScrollIndicators:function()
{
var cssClasses=this.cssClasses,
selectors=this.selectors,
YUIViewNode=this.YUIViewNode,
YUIScrollingTable=YUIViewNode.one('.respDataTableCnt'),
scrollHeight=YUIScrollingTable.get('scrollHeight'),
contentDiv=YUIViewNode.one('.'+cssClasses.CONTENT).get('parentNode');
contentDiv.appendChild('<table class="arrowLeftSide"><tr class="arrowTR"><td class="arrowTD"><span class="arrowImgLeft"></span></td></tr></table>');
contentDiv.appendChild('<table class="arrowRightSide"><tr class="arrowTR"><td class="arrowTD"><span class="arrowImgRight"></span></td></tr></table>');
contentDiv.appendChild('<div style="height:'+scrollHeight+'px;" class="indicatorLeftSide"></div>');
contentDiv.appendChild('<div style="height:'+scrollHeight+'px;" class="indicatorRightSide"></div>');
},
_setScrollIndicatorPOS:function(params)
{
var YUIViewNode=this.YUIViewNode,
constants=this.constants,
selectors=this.selectors,
headTbody=params.headTbody,
contentDiv=params.contentDiv,
contentDivTRs=htmlNamespace.getElements(contentDiv.getDOMNode(),{tagName:'tr', maxDepth:3}),
contentDivTRsLen=contentDivTRs.length,
contentDivTR=null,
contentDivTRheight=0,
leftArrow=YUIViewNode.one('.'+selectors.ARROW_LEFT_SIDE),
leftArrowTR=leftArrow.one('.'+selectors.ARROW_TR),
rightArrow=YUIViewNode.one('.'+selectors.ARROW_RIGHT_SIDE),
rightArrowTR=rightArrow.one('.'+selectors.ARROW_TR),
YUIObj=cbd.getYUI(),
i=0;
for(i=0;i < contentDivTRsLen;i++)
{
contentDivTR=YUIObj.one(contentDivTRs[i]);
contentDivTRheight+=contentDivTR.get(constants.OFFSET_HEIGHT);
if(!contentDivTR.hasClass('headerNextTR') )
{
break;
}
}
leftArrow.setStyle(constants.HEIGHT,(contentDivTRheight - 2) );
leftArrowTR.setStyle(constants.HEIGHT, contentDivTRheight );
rightArrow.setStyle(constants.HEIGHT,(contentDivTRheight - 2) );
rightArrowTR.setStyle(constants.HEIGHT, contentDivTRheight );
},
_addScrollContentDragListeners:function()
{
var parentNode=this.YUIViewNode.get("parentNode"),
shouldDragOnRespSmall=parentNode.hasClass(this.cssClasses.RESP_DRAG_SCROLL_AREA_SML)&&this.currentSize===cbdcommon.screen.mediaQuerySmall,
shouldDragOnRespMedium=parentNode.hasClass(this.cssClasses.RESP_DRAG_SCROLL_AREA_MED)&&this.currentSize===cbdcommon.screen.mediaQueryMedium,
shouldDragOnRespLarge=parentNode.hasClass(this.cssClasses.RESP_DRAG_SCROLL_AREA_LRG)&&this.currentSize===cbdcommon.screen.mediaQueryLarge,
shouldDragOnNonResp=parentNode.hasClass(this.cssClasses.DRAGGABLE_SCROLL_AREA)&&this.currentSize===cbdcommon.screen.mediaQueryLarge,
contentDiv;
if(shouldDragOnRespSmall||shouldDragOnRespMedium||shouldDragOnRespLarge||shouldDragOnNonResp)
{
contentDiv=this.YUIViewNode.one('.'+this.cssClasses.CONTENT).getDOMNode();
htmlNamespace.addEventListenerMethod(contentDiv, "mousedown", this, "_onScrollContentMouseDown");
htmlNamespace.addEventListenerMethod(contentDiv, "mouseup", this, "_onScrollContentMouseUp");
htmlNamespace.addEventListenerMethod(contentDiv, "mouseout", this, "_onScrollContentMouseOut");
htmlNamespace.addEventListenerMethod(contentDiv, "selectstart", this, "_onScrollContentSelectStart");
}
},
_onScrollContentMouseDown:function(event)
{
var contentDiv=this.YUIViewNode.one('.'+this.cssClasses.CONTENT).getDOMNode();
this.previousX=vg.event.getPosition(event).x;
htmlNamespace.addEventListenerMethod(contentDiv, "mousemove", this, "_onScrollContentMouseMove", "DATA_TABLE_SCROLL_CONTENT_MOUSE_MOVE_LISTENER");
},
_onScrollContentMouseMove:function(event)
{
var currentX=vg.event.getPosition(event).x,
scrollDistance=this.previousX - currentX,
contentDiv=this.YUIViewNode.one('.'+this.cssClasses.CONTENT).getDOMNode();
contentDiv.scrollLeft+=scrollDistance;
this.previousX=currentX;
},
_onScrollContentMouseUp:function(event)
{
var contentDiv=this.YUIViewNode.one('.'+this.cssClasses.CONTENT).getDOMNode();
htmlNamespace.removeEventListenerById(contentDiv, "DATA_TABLE_SCROLL_CONTENT_MOUSE_MOVE_LISTENER");
},
_onScrollContentMouseOut:function(event)
{
var contentDiv=this.YUIViewNode.one('.'+this.cssClasses.CONTENT).getDOMNode(),
isWithinContentDiv=vg.event.isWithinNodes(event,[contentDiv]);
if(isWithinContentDiv===false)
{
htmlNamespace.removeEventListenerById(contentDiv, "DATA_TABLE_SCROLL_CONTENT_MOUSE_MOVE_LISTENER");
}
},
_onScrollContentSelectStart:function(event)
{
htmlNamespace.preventDefault(event);
},
_removeRespMarkupScroll:function()
{
var YUIViewNode=this.YUIViewNode,
cssClasses=this.cssClasses,
selectors=this.selectors,
rowHeadTbody=YUIViewNode.one('.'+cssClasses.ROW_HEAD),
indicatorLeftSide=YUIViewNode.one('.'+selectors.INDICATOR_LEFT_SIDE),
indicatorRightSide=YUIViewNode.one('.'+selectors.INDICATOR_RIGHT_SIDE),
arrowLeftSide=YUIViewNode.one('.'+selectors.ARROW_LEFT_SIDE),
arrowRightSide=YUIViewNode.one('.'+selectors.ARROW_RIGHT_SIDE);
if(rowHeadTbody!==null)
{
rowHeadTbody.remove();
}
if(indicatorLeftSide!==null)
{
indicatorLeftSide.remove();
}
if(indicatorRightSide!==null)
{
indicatorRightSide.remove();
}
if(arrowLeftSide!==null)
{
arrowLeftSide.remove();
}
if(arrowRightSide!==null)
{
arrowRightSide.remove();
}
},
_hasScrollIndicator:function()
{
var smallCfg=this.respCfg.small,
smallCfgOptions=smallCfg&&smallCfg.scrollOptions,
hasSmallScrollIndicator=smallCfgOptions&&smallCfgOptions.scrollIndicator,
mediumCfg=this.respCfg.medium,
mediumCfgOptions=mediumCfg&&mediumCfg.scrollOptions,
hasMediumScrollIndicator=mediumCfgOptions&&mediumCfgOptions.scrollIndicator,
largeCfg=this.largeRespCfg.large,
largeCfgOptions=largeCfg&&largeCfg.scrollOptions,
haslargeScrollIndicator=largeCfgOptions&&largeCfgOptions.scrollIndicator,
hasScrollIndicator=false;
if(hasSmallScrollIndicator||hasMediumScrollIndicator||haslargeScrollIndicator)
{
hasScrollIndicator=true;
}
return hasScrollIndicator;
},
_addScrollEventListener:function(tbodyId)
{
var THIS=this,
Y=cbd.getYUI();
htmlNamespace.addEventListener(tbodyId, 'scroll', function(e){
THIS._changeScrollIndicator(Y.one(document.getElementById(tbodyId) ));
}, "respDataTableScroll"+this.id);
},
_changeScrollIndicator:function(contentDiv)
{
var cbdYUI=cbd.getYUI(),
constants=this.constants,
selectors=this.selectors,
table=cbdYUI.one(contentDiv.get('parentNode') ),
tbody=cbdYUI.one(contentDiv ),
scrollLeft=tbody.get(constants.SCROLL_LEFT),
scrollWidth=tbody.get(constants.SCROLL_WIDTH),
offsetWidth=tbody.get(constants.OFFSET_WIDTH),
leftSide=table.one('.'+selectors.INDICATOR_LEFT_SIDE),
rightSide=table.one('.'+selectors.INDICATOR_RIGHT_SIDE),
leftArrow=table.one('.'+selectors.ARROW_LEFT_SIDE),
rightArrow=table.one('.'+selectors.ARROW_RIGHT_SIDE);
if((scrollWidth - offsetWidth)===0 )
{
leftArrow.removeClass(constants.INDICATOR_SHOWN);
leftSide.removeClass(constants.INDICATOR_SHOWN);
rightArrow.removeClass(constants.INDICATOR_SHOWN);
rightSide.removeClass(constants.INDICATOR_SHOWN);
}
else if(scrollLeft===(scrollWidth - offsetWidth) )
{
leftArrow.addClass(constants.INDICATOR_SHOWN);
leftSide.addClass(constants.INDICATOR_SHOWN);
rightArrow.removeClass(constants.INDICATOR_SHOWN);
rightSide.removeClass(constants.INDICATOR_SHOWN);
}
else if(scrollLeft===0)
{
leftArrow.removeClass(constants.INDICATOR_SHOWN);
leftSide.removeClass(constants.INDICATOR_SHOWN);
rightArrow.addClass(constants.INDICATOR_SHOWN);
rightSide.addClass(constants.INDICATOR_SHOWN);
}
else
{
leftArrow.addClass(constants.INDICATOR_SHOWN);
leftSide.addClass(constants.INDICATOR_SHOWN);
rightArrow.addClass(constants.INDICATOR_SHOWN);
rightSide.addClass(constants.INDICATOR_SHOWN);
}
},
_getRespMarkupType:function()
{
var scrollOnSml=this.respCfg.small&&this.respCfg.small.scroll,
scrollOnMed=this.respCfg.medium&&this.respCfg.medium.scroll,
condenseOnSml=this.respCfg.small&&this.respCfg.small.condense,
condenseOnMed=this.respCfg.medium&&this.respCfg.medium.condense,
scrollOnLrg=this.largeRespCfg.large&&this.largeRespCfg.large.scroll,
markupType=null;
if((typeof condenseOnSml==='boolean'&&condenseOnSml===true)||(typeof condenseOnMed==='boolean'&&condenseOnMed===true))
{
markupType='condense';
}
else if((typeof scrollOnSml==='boolean'&&scrollOnSml===true)||(typeof scrollOnMed==='boolean'&&scrollOnMed===true)||(typeof scrollOnLrg==='boolean'&&scrollOnLrg===true))
{
markupType='scroll';
}
return markupType;
},
_stripHeader:function(nodeTD)
{
nodeTD.removeAttribute('width');
nodeTD.removeClass('subHead');
return nodeTD;
},
_configureHeights:function(contentTbody, rowHeadTbody)
{
var contentTbodyEls=contentTbody&&htmlNamespace.getElements(contentTbody.getDOMNode(),{tagName:'tr', maxDepth:3}),
rowHeadTbodyEls=rowHeadTbody&&htmlNamespace.getElements(rowHeadTbody.getDOMNode(),{tagName:'tr', maxDepth:3}),
heightArys={};
heightArys=this._retrieveHeights(contentTbodyEls, rowHeadTbodyEls);
if(ieQuirksMode)
{
ieQuirksTDArray=this._retrieveElementsIEquirks([{"arrayName":"contentTDs", "array":contentTbodyEls},{"arrayName":"rowHeadTDs", "array":rowHeadTbodyEls}]);
rowHeadTbodyEls=ieQuirksTDArray.rowHeadTDs;
contentTbodyEls=ieQuirksTDArray.contentTDs;
}
this._setHeights({"contentTbody":contentTbody, "rowHeadTbody":rowHeadTbody, "contentTbodyTRs":contentTbodyEls, "rowHeadTbodyTRs":rowHeadTbodyEls, "heightArys":heightArys});
},
_retrieveHeights:function(contentTbodyTRs, rowHeadTbodyTRs)
{
var i=0,
trLength=contentTbodyTRs.length,
contentTbodyTR,
rowHeadTbodyTR,
contentTbodyTRheight,
rowHeadTbodyTRheight,
heightArys={};
heightArys.contentTRs=[];
heightArys.rowHeadTRs=[];
for(i=0;i < trLength;i++)
{
contentTbodyTR=contentTbodyTRs[i];
rowHeadTbodyTR=rowHeadTbodyTRs[i];
this._clearHeights(rowHeadTbodyTR, contentTbodyTR);
contentTbodyTRheight=contentTbodyTR.offsetHeight+1;
rowHeadTbodyTRheight=rowHeadTbodyTR.offsetHeight+1;
heightArys.contentTRs.push(contentTbodyTRheight);
heightArys.rowHeadTRs.push(rowHeadTbodyTRheight);
}
return heightArys;
},
_retrieveElementsIEquirks:function(rowsObj)
{
var rowsObjLen=rowsObj.length,
contentLen=0,
rows=[],
i=0,
tdArrays={},
td=null,
th=null,
arrayName=null;
for(k=0;k < rowsObjLen;k++)
{
arrayName=rowsObj[k].arrayName;
tdArrays[arrayName]=[];
rows=rowsObj[k].array;
contentLen=rows.length;
for(i=0;i < contentLen;i++)
{
td=htmlNamespace.getElements(rows[i],{tagName:'td', maxDepth:1})[0];
th=htmlNamespace.getElements(rows[i],{tagName:'th', maxDepth:1})[0];
if(typeof td==='object')
{
tdArrays[arrayName][i]=td;
}
else
{
tdArrays[arrayName][i]=th;
}
}
}
return tdArrays;
},
_setHeights:function(params)
{
var contentTbodyTR=null,
rowHeadTbodyTR=null,
i=params.contentTbodyTRs.length,
rowHeight=0,
trLength=params.contentTbodyTRs.length,
contentTbodyDOMNode=null,
rowHeadTbodyDOMNode=null,
contentTbodyParent=null,
rowHeadTbodyParent=null,
contentHeight=0,
rowHeadHeight=0;
contentTbodyDOMNode=params.contentTbody.getDOMNode();
rowHeadTbodyDOMNode=params.rowHeadTbody.getDOMNode();
contentTbodyParent=params.contentTbody.getDOMNode().parentNode;
rowHeadTbodyParent=params.rowHeadTbody.getDOMNode().parentNode;
contentTbodyParent.removeChild(params.contentTbody.getDOMNode());
rowHeadTbodyParent.removeChild(params.rowHeadTbody.getDOMNode());
for(i=0;i < trLength;i++)
{
rowHeight=0;
contentTbodyTR=params.contentTbodyTRs[i];
rowHeadTbodyTR=params.rowHeadTbodyTRs[i];
if((this._rowContainsColHeads(contentTbodyTR)||this._cellIsAColHead(contentTbodyTR))
&&!(this._isSimpleDataTable()||this._isContentTable()))
{
continue;
}
contentHeight=params.heightArys.contentTRs[i];
rowHeadHeight=params.heightArys.rowHeadTRs[i];
if(contentHeight > rowHeadHeight )
{
rowHeight=contentHeight+'px';
}
else if(rowHeadHeight > contentHeight )
{
rowHeight=rowHeadHeight+'px';
}
if(rowHeight!==0 )
{
contentTbodyTR.style.height=rowHeight;
rowHeadTbodyTR.style.height=rowHeight;
}
}
contentTbodyParent.insertBefore(contentTbodyDOMNode, contentTbodyParent.firstChild);
rowHeadTbodyParent.insertBefore(rowHeadTbodyDOMNode, rowHeadTbodyParent.firstChild);
},
_rowContainsColHeads:function(row)
{
var colHeads=htmlNamespace.getElements(row,{tagName:'th', maxDepth:1});
return(colHeads.length > 0);
},
_cellIsAColHead:function(cell)
{
return(cell)?(cell.tagName.toLowerCase()==="th"):false;
},
_setTableElementWidths:function(tableElement1, tableElement2)
{
var numPattern=/\d+/g,
percentPattern=/%/g,
pxPattern=/px/g,
numMatch=this.currentRowHeadWidth&&this.currentRowHeadWidth.match(numPattern),
percentMatch=this.currentRowHeadWidth&&this.currentRowHeadWidth.match(percentPattern),
pxMatch=this.currentRowHeadWidth&&this.currentRowHeadWidth.match(pxPattern);
if(tableElement1.getDOMNode )
{
tableElement1=tableElement1.getDOMNode();
}
if(tableElement2.getDOMNode )
{
tableElement2=tableElement2.getDOMNode();
}
if(this.rowHeadCols[this.currentSize].rowHeadCols==="0")
{
tableElement1.style.width='0%';
tableElement2.style.width='100%';
}
else if((percentMatch!==null)&&(typeof percentMatch==='object')&&(percentMatch[0]==='%') )
{
tableElement1.style.width=this.currentRowHeadWidth;
tableElement2.style.width=(100 - parseInt(numMatch[0], 10))+percentMatch[0];
}
else if((pxMatch!==null)&&(typeof pxMatch==='object')&&(pxMatch[0]==='px') )
{
tableElement1.style.width=this.currentRowHeadWidth;
}
else
{
tableElement1.style.width='25%';
tableElement2.style.width='75%';
}
},
_setUpCondenseTbody:function(contentTbody)
{
var cssClasses=this.cssClasses,
condenseTbody=null,
condenseTbodyTRs=null,
condenseTbodyTRsLen=0,
condenseTbodyTDs=null,
condenseTbodyTDsLen=0,
trIndex=0,
tdIndex=0,
YUIObj=cbd.getYUI();
condenseTbody=contentTbody.cloneNode(true);
condenseTbody.removeClass(cssClasses.CONTENT);
condenseTbody.addClass(cssClasses.CONDENSE);
condenseTbodyTRs=htmlNamespace.getElements(condenseTbody.getDOMNode(),{tagName:'tr', maxDepth:1});
condenseTbodyTRsLen=condenseTbodyTRs.length;
for(trIndex=0;trIndex < condenseTbodyTRsLen;trIndex++)
{
if(trIndex!==0)
{
condenseTbodyTDs=htmlNamespace.getElements(condenseTbodyTRs[trIndex],{tagName:'td', maxDepth:1});
condenseTbodyTDsLen=condenseTbodyTDs.length;
for(tdIndex=0;tdIndex < condenseTbodyTDsLen;tdIndex++)
{
YUIObj.one(condenseTbodyTDs[tdIndex]).remove();
}
}
}
return condenseTbody;
},
_generateCloneAttrTracker:function()
{
var cloneAttrTracker={},
tags=this.tagsToClone,
tagsLen=tags&&tags.length,
i=0;
for(i=0;i < tagsLen;i++)
{
cloneAttrTracker[tags[i].name]=0;
}
return cloneAttrTracker;
},
_generateAttrToBeCopied:function(params)
{
var attrToBeCopied={},
tBody=params.tBody,
tag={},
tags=this.tagsToClone,
tagsLen=tags&&tags.length,
tagsName=null,
tagItem=null,
i=0,
j=0,
k=0,
nodes=null,
nodesLen=0,
node=null,
nodeAttribute=null,
attribute=null,
attributeLen=0,
attributeItem=null,
attributeName=null,
attributeCopyIfUndefined=false;
for(i=0;i < tagsLen;i++)
{
tagItem=tags[i];
tagsName=tagItem.name;
tag=attrToBeCopied[tagsName]={};
nodes=tBody.all(tagsName);
nodesLen=nodes.size();
for(j=0;j < nodesLen;j++)
{
node=nodes.item(j);
attributeLen=tagItem.attributes.length;
for(k=0;k < attributeLen;k++)
{
attributeItem=tagItem.attributes[k];
attributeName=attributeItem.name;
attributeCopyIfUndefined=attributeItem.copyIfUndefined;
if(!tag.hasOwnProperty(attributeName))
{
attribute=tag[attributeName]=[];
}
else
{
attribute=attribute=tag[attributeName];
}
nodeAttribute=node.get(attributeName);
if((attributeCopyIfUndefined===true)||nodeAttribute)
{
attribute.push(nodeAttribute );
}
}
}
}
return attrToBeCopied;
},
_applyAttrToBeCopied:function(element, params)
{
var tags=this.tagsToClone,
tagsLen=tags&&tags.length,
tagsName=null,
tagItem=null,
i=0,
j=0,
k=0,
node=null,
nodes=null,
nodesLen=0,
nodeAttributeLen=0,
attributeName=null;
for(i=0;i < tagsLen;i++)
{
tagItem=tags[i];
tagsName=tagItem.name;
nodes=element.all(tagsName);
nodesLen=nodes.size();
nodeAttributeLen=tagItem.attributes.length;
for(j=0;j < nodesLen;j++)
{
node=nodes.get('node')[j]._node;
for(k=0;k < nodeAttributeLen;k++)
{
attributeName=tagItem.attributes[k].name;
node[attributeName]=params.attrToBeCopied[tagsName][attributeName][params.cloneAttrTracker[tagsName]];
}
params.cloneAttrTracker[tagsName]++;
}
}
return params.cloneAttrTracker;
},
_clearTbodyWidths:function(tbodyArray)
{
var index=0,
tbodyArrayLen=tbodyArray.length;
for(index=0;index < tbodyArrayLen;index++)
{
tbodyArray[index].setStyle('width', '');
}
},
_clearHeights:function(rowHeadTbodyTR, contentTbodyTR)
{
var rowHeadSubHeads=null,
rowHeadSubHeadsLen=0,
contentSubHeads=null,
contentSubHeadsLen=0,
i=0;
if(ieQuirksMode)
{
this._clearHeightsIEquirks([rowHeadTbodyTR, contentTbodyTR]);
}
else
{
rowHeadSubHeads=htmlNamespace.getElements(rowHeadTbodyTR,{tagName:'div', attrName:'class', attrValue:'subHeadTitle'});
rowHeadSubHeadsLen=rowHeadSubHeads.length;
contentSubHeads=htmlNamespace.getElements(contentTbodyTR,{tagName:'div', attrName:'class', attrValue:'subHeadTitle'});
contentSubHeadsLen=contentSubHeads.length;
i=0;
this._clearHeight(contentTbodyTR);
this._clearHeight(rowHeadTbodyTR);
for(i=0;i < rowHeadSubHeadsLen;i++)
{
this._clearHeight(rowHeadSubHeads[i]);
}
for(i=0;i < contentSubHeadsLen;i++)
{
this._clearHeight(contentSubHeads[i]);
}
}
},
_clearHeightsIEquirks:function(rows)
{
var td=null,
th=null,
cell=null,
amtOfRows=rows.length;
while(amtOfRows--)
{
td=htmlNamespace.getElements(rows[amtOfRows],{tagName:'td', maxDepth:1})[0];
th=htmlNamespace.getElements(rows[amtOfRows],{tagName:'th', maxDepth:1})[0];
if(typeof td==='object')
{
cell=td;
}
else
{
cell=th;
}
this._clearHeight(cell);
}
},
_clearHeight:function(element)
{
if(element.style.height)
{
element.style.height='';
}
},
_destroy:function()
{
htmlNamespace.removeEventListenerById(window, "respDataTable"+this.id);
}
};
}(vg, vg.html, cbd, cbdcommon));
vg._removeFilter=function(fBarId, fId, onremove)
{
var fBarInput=document.getElementById(fBarId+"_x");
fBarInput.value=fId;
if(onremove!=null)
{
onremove(fBarId, fId);
}
};
vg.util.WINDOW_DATA_PFX=WINDOW_DATA_PFX="__s";
vg.util.WINDOW_DATA_SFX=WINDOW_DATA_SFX="__e";
vg.util._addWindowData=function(name, value)
{
if(window.name.indexOf(vg.util.WINDOW_DATA_PFX) >=0)
{
vg.util._getAndRemoveWindowData(name);
}
window.name=window.name+vg.util.WINDOW_DATA_PFX+name+value+vg.util.WINDOW_DATA_SFX+name;
}
vg.util._getAndRemoveWindowData=function(name)
{
var p="(.*)";
var regex=new RegExp(vg.util.WINDOW_DATA_PFX+name+p+vg.util.WINDOW_DATA_SFX+name);
var windowData=regex.exec(window.name);
if(windowData!=null)
{
window.name=window.name.replace(regex, "");
return windowData[1];
}
return null;
}
vg.wu.WU=WU="WU";
vg.wu.trackLink=function(link)
{
cbdcommon.wu.trackLink(link);
}
vg.wu.captureReferrerLink=function()
{
var linkLocationTrackInfo=vg.util._getAndRemoveWindowData(vg.wu.WU);
if(!isEmpty(linkLocationTrackInfo))
{
var linkLocationInfoArray=linkLocationTrackInfo.split(":");
jsCBDAddMetaTag('Link', linkLocationInfoArray[0]);
jsCBDAddMetaTag('LinkLocation',(linkLocationInfoArray.length==2)?linkLocationInfoArray[1]:"");
}
}
vg.wu._addMetaTagsForStrt=function()
{
var pagePerformance=cbd.pagePerformance;
var pageRendered=(pagePerformance.pageRendered - pagePerformance.headStart);
var pageResponsive=(pagePerformance.pageResponsive - pagePerformance.headStart);
var serverTime=pagePerformance.serverTime;
jsCBDAddMetaTag('strt.clntRendered', vg.wu._formatStrtTime(pageRendered));
jsCBDAddMetaTag('strt.clntResponsive', vg.wu._formatStrtTime(pageResponsive));
jsCBDAddMetaTag('strt.server', vg.wu._formatStrtTime(serverTime));
jsCBDAddMetaTag('strt.total', vg.wu._formatStrtTime(serverTime+pageResponsive));
}
vg.wu._formatStrtTime=function(timeInMs)
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
}
vg.wu._logSPISndURLChg=true;
vg.wu.setLogSPISndURLChg=function(logSPISndURLChg)
{
vg.wu._logSPISndURLChg=logSPISndURLChg;
}
vg.wu.isLogSPISndURLChg=function()
{
return vg.wu._logSPISndURLChg;
}
vg.wu._logSPIFirstPage=false;
vg.wu.setLogSPIFirstPage=function(logPage)
{
vg.wu._logSPIFirstPage=logPage;
}
vg.wu.isLogSPIFirstPage=function()
{
return vg.wu._logSPIFirstPage;
}
vg.Label=function(options)
{
this.id=options.id
this.haveError=new Array();
this.base=vg.Controller;
this.base(this.id, null);
}
vg.Label.prototype=
{
updateStatus:function(cid,error)
{
if(error)
{
if(!this._contains(cid))
{
this.haveError.push(cid);
}
}
else
{
if(this._contains(cid))
{
var idx=this._getIndex(cid);
if(idx!=-1)
{
this.haveError.splice(idx,1);
}
}
}
this._updateErrorStatus();
},
_getIndex:function(cid)
{
for(var i=0;i<this.haveError.length;i++)
{
if(cid==this.haveError[i])
{
return i;
}
}
return -1;
},
_contains:function(item)
{
for(var i=0;i<this.haveError.length;i++)
{
if(item==this.haveError[i])
{
return true;
}
}
return false;
},
_updateErrorStatus:function()
{
var self=document.getElementById(this.id);
if(this.haveError.length>0)
{
jsCBDaddStyle(self,"err");
}
else
{
jsCBDdeleteStyle(self,"err");
}
}
}
vg.ErrorManager=function(options)
{
this.id=options.id;
this.labelIds=options.labelIds;
this.errMsgDur=options.errMsgDur?options.errMsgDur:3000;
this.errMsgPos=options.errMsgPos?options.errMsgPos:"auto";
if(this.errMsgPos=="bottom")
{
this.errMsgPos="bottomLeft";
}
else if(this.errMsgPos=="top")
{
this.errMsgPos="topLeft";
}
this.errMsgs=options.errMsgs;
this.activeErrorMsg=options.activeErrorMsg;
this.errorProneType=options.errorProneType;
this.base=vg.Controller;
this.base(this.id, null, null, vg.ErrorManager.TYPE);
}
vg.ErrorManager.TYPE="errorManager";
vg.ErrorManager.currentErrorInputId;
vg.ErrorManager.prototype=
{
getLabelIds:function(){return this.labelIds;},
getErrMsgDur:function(){return this.errMsgDur;},
getErrMsgPos:function(){return this.errMsgPos;},
getErrMsgContent:function(id)
{
return this.errMsgs[id];
},
updateErrorStatus:function(status)
{
this._flagLabels(status);
},
_flagLabels:function(status)
{
var labels=this.getLabelIds();
if(labels&&labels.length>0)
{
for(var i=0;i<labels.length;i++)
{
vg.comp.getController(labels[i]).updateStatus(this.id,status);
}
}
}
}
vg.Div=function(id)
{
this.base=vg.Controller;
this.base(id, null);
vg.html.removeStyle("cbdTempMarginDiv", document.getElementById(id));
if(cbd.browser.isTouchScreen&&vg.html.isFixedHeight(this.viewNode))
{
vg.touchScreen._makeNodeScrollable(id);
vg.html.addEventListener(this.viewNode, vg.event.GEO_CHANGE, function(){vg.touchScreen._makeNodeScrollable(id);});
}
if(vg.html.isFixedHeight(this.viewNode)||vg.html.isFixedWidth(this.viewNode))
{
vg.html.addEventListener(this.viewNode, 'scroll' , function(evt)
{
vg.comp.closeAllMenusAndCalendars(evt);
}
);
}
}
vg.comp.closeAllMenusAndCalendars=function(event)
{
"use strict";
jsCBDcloseSelectOneMenu(event);
if(vg.Menu)
{
vg.Menu._closeMenu(event);
}
if(vg.Calendar)
{
vg.Calendar.closeCalendar(jsCBDgetEventNode(event), event.type);
}
vg.validation.hideErr(false);
};
vg.comp.closeMenusAndCalendars=function()
{
"use strict";
var openMenuNav=null,
openRootMenu,
calendarComp,
calendar;
if(vg.comp.isCompLoaded('SelectOneMenu'))
{
_cbdClosePrevSelectOneMenu();
}
if(vg.Menu)
{
openMenuNav=vg.Menu.selectedMenu;
if(openMenuNav!==null)
{
openRootMenu=openMenuNav?openMenuNav._rootMenu:null;
openMenuNav._hideAllSubmenus(openRootMenu);
}
}
if(vg.Calendar&&vg.Calendar.OPEN_LAYER_ID!=="")
{
calendarComp=vg.html.getElement(vg.Calendar.OPEN_LAYER_ID);
calendar=vg.comp.getController(calendarComp);
calendar._closeCalendarLayer();
}
};
vg.comp.initializeContentExpander=function(id, contentWidth)
{
"use strict";
cbd.loader.require("cbdContentExpander");
cbd.loader.addCallback(
function initContentExpander()
{
var contentExpander=new vg.ContentExpander({"id":id, "contentWidth":contentWidth});
}
);
cbd.loader.load();
};
vg.comp.addEventListenersForStylesToButton=function(button)
{
var addPressClass=function(){jsCBDaddStyle(button, "press");},
removePressClass=function(){jsCBDdeleteStyle(button, "press");};
vg.html.addEventListener(button, "mousedown", addPressClass);
vg.html.addEventListener(button, "keydown", addPressClass);
vg.html.addEventListener(button, "keyup", removePressClass);
vg.html.addEventListener(button, "blur", removePressClass);
vg.html.addEventListener(button, "mouseup", removePressClass);
};
vg.comp.initWebAnalytics=function()
{
if(wtActive)
{
vg.wu.captureReferrerLink();
vg.wu._addMetaTagsForStrt();
jsCBDdcsTag();
jsCBDclearLogonMetaTag();
}
if(cbdWebAnalytics)
{
cbdWebAnalytics.initAdobeAnalytics();
}
};
vg.Container=function(id)
{
this.base=vg.Controller;
this.base(id, null);
if(cbd.browser.isTouchScreen&&vg.html.isFixedHeight(this.viewNode))
{
vg.touchScreen._makeNodeScrollable(id);
vg.html.addEventListener(this.viewNode, vg.event.GEO_CHANGE, function(){vg.touchScreen._makeNodeScrollable(id);});
}
}
var InfoBoxFactory=null;
CompManager=function()
{
}
CompManager.prototype=
{
_setCompConfig:function(id, compType, e)
{
if("INFOBOX"==compType)
{
var THIS=this;
function configureInfoBoxFactory()
{
var config=THIS._retrieveConfig(id);
InfoBoxFactory._configure(config, e);
}
if(InfoBoxFactory==null)
{
cbd.loader.loadAndExec('cbdInfoBox',
function createInfoBoxFactory()
{
InfoBoxFactory=new InfoBox(null, null, null, null, null, null, null, true);
configureInfoBoxFactory();
vg.html.addEventListener(document.body, 'touchstart', function(e){InfoBox.close()});
},
true);
}
else
{
configureInfoBoxFactory();
}
}
},
_retrieveConfig:function(id)
{
id=vg.html._getFullyQualifiedId(id)
var comp=vg.html.getElement(id);
if(comp!=null&&comp.conf!=null)
{
return comp.conf;
}
else
{
comp.conf=eval('('+comp.getAttribute("config")+')');
comp.conf.id=id;
return comp.conf;
}
}
}
var compManager=new CompManager();
vg.GridCompScrim=function(gridId)
{
var gridComp=vg.html.getElement(gridId);
var gridCompScrim=vg.html.getElement(gridId+"_gridCompScrim");
if(gridComp&&gridCompScrim)
{
if(ie&&CBD_FLOATING_HEAD)
{
gridComp.setAttribute('covered','true');
vg.html._fireCustomEvent(vg.event.ELEMENT_DISABLED, gridComp );
}
vg.html.toggleInputTabIndex(gridComp, true);
}
}
vg.html.openGridCompScrim=function(gridId)
{
var scrimDiv=vg.html.getElement(gridId+"_gridCompScrim");
var gridComp=vg.html.getElement(gridId);
var scrimWrapperDiv=vg.html.getElement(gridId+"_gridCompScrimWrapper");
if(scrimDiv&&gridComp&&scrimWrapperDiv)
{
scrimWrapperDiv.style.position="relative";
jsCBDtoggleElement(scrimDiv, true);
if(ie&&CBD_FLOATING_HEAD)
{
gridComp.setAttribute('covered','true');
vg.html._fireCustomEvent(vg.event.ELEMENT_DISABLED, gridComp );
}
vg.html.toggleInputTabIndex(gridComp, true);
}
}
vg.html.closeGridCompScrim=function(gridId)
{
var scrimDiv=vg.html.getElement(gridId+"_gridCompScrim");
var gridComp=vg.html.getElement(gridId);
var scrimWrapperDiv=vg.html.getElement(gridId+"_gridCompScrimWrapper");
if(scrimDiv&&gridComp&&scrimWrapperDiv)
{
jsCBDtoggleElement(scrimDiv, false);
scrimWrapperDiv.style.position="static";
vg.html.toggleInputTabIndex(gridComp, false);
if(ie&&CBD_FLOATING_HEAD)
{
gridComp.setAttribute('covered','false');
vg.html._fireCustomEvent(vg.event.ELEMENT_DISABLED, gridComp );
}
}
}
vg.html.closeAllGridCompScrims=function()
{
var gridComps=vg.html.getElements(document.getElementById('main'),{tagName:'div', attrName:'class', attrValue:'grid-ScrimWrapper'}, null, function(element){return element.parentNode;});
var gridCompsLength=gridComps.length;
for(var i=0;i < gridCompsLength;i++)
{
var scrimDiv=vg.html.getElements(gridComps[i],{tagName:'div', attrName:'class', attrValue:'grid-Scrim'})[0];
if(!scrimDiv.style.display!="none")
{
vg.html.closeGridCompScrim(gridComps[i].id);
}
}
}
vg.html.getTabableInputs=function(node)
{
var container=vg.html.getElement(node);
if(container)
{
var inputs=new Array();
_cbdConcat(inputs, container.getElementsByTagName('input'));
_cbdConcat(inputs, container.getElementsByTagName('select'));
_cbdConcat(inputs, container.getElementsByTagName('a'));
_cbdConcat(inputs, container.getElementsByTagName('img'));
_cbdConcat(inputs, container.getElementsByTagName('textarea'));
return inputs;
}
return null;
}
vg.html.toggleInputTabIndex=function(node, disableTabIndex)
{
var containerNode=vg.html.getElement(node);
var cacheTabIndex;
if(containerNode)
{
var inputs=vg.html.getTabableInputs(containerNode);
var inputsLength=inputs.length;
for(var i=0;i< inputsLength;i++)
{
var currentInput=inputs[i];
if(disableTabIndex)
{
cacheTabIndex=currentInput.tabIndex;
if(cacheTabIndex > 0)
{
currentInput.setAttribute("cacheTabIndex", cacheTabIndex);
}
currentInput.tabIndex=-1;
}
else
{
cacheTabIndex=currentInput.getAttribute('cacheTabIndex');
if(cacheTabIndex)
{
currentInput.tabIndex=cacheTabIndex;
}
else if(currentInput.tabIndex=="-1")
{
currentInput.tabIndex=0;
}
}
}
}
}
vg.html._idPrefixes=new Array();
vg.html._getElementWithIdPrefixes=function(id)
{
var idPrefix;
var length=vg.html._idPrefixes.length;
var node=vg.html.getElement(id)
for(var i=0;!node&&i < length;i++)
{
idPrefix=vg.html._idPrefixes[i];
node=vg.html.getElement(idPrefix+id);
}
return node;
}
vg.html._getFullyQualifiedId=function(id)
{
var element=vg.html._getElementWithIdPrefixes(id);
return element?element.id:id;
}
vg.html.getObjSize=function(obj, useComputedStyleWidth)
{
var objData={w:vg.html.getObjWidth(obj, useComputedStyleWidth)};
objData.h=(obj&&obj.tagName.toLowerCase()=="span")?vg.html.getSpanObjHeight(obj):vg.html.getObjHeight(obj);
objData.w=vg.html.getObjWidth(obj, useComputedStyleWidth);
return objData;
}
vg.table=new Object();
vg.table.toggleAllTableFlippers=function(tableId, state)
{
var table=vg.html.getElement(tableId);
var flippers=vg.html.getElements(table,{tagName:'tr', attrName:'flipperId'});
var size=flippers.length;
for(var i=0;i < size;i++)
{
var flipper=flippers[i];
var id=flipper.getAttribute("flipperId");
jsCBDtoggleFlipper(id, state, false, id+":state", null);
}
}
vg.procNav.click=function(deckId, index){
try{
var pn=document.getElementById("CBD_PROCESS_NAV"+deckId+"_navDeck");
if(pn){
var pnSteps=vg.html.getElements(pn,
{tagName:'td', attrName:'class', attrValue:/completed/});
if(pnSteps){
var pnStepsIdx=pnSteps[index];
if(pnStepsIdx){
var onclk=pnStepsIdx.getAttribute("onclick");
if(onclk){
if(onclk instanceof Function){
onclk();
}else{
eval(onclk);
}
}
}
}
}
}catch(err){
}
}
vg.procNav._sendMetaTags=function(html){
try{
var metaTags=html.split("{\"cbdMetaTags\":[{");
if(metaTags&&metaTags.length > 1){
metaTags=metaTags[1].split("}]}");
if(metaTags&&metaTags.length > 0){
metaTags=metaTags[0].split(",");
if(metaTags&&metaTags.length > 0){
for(var i=1;i<metaTags.length;i++){
var metaTag=metaTags[i].split(":");
if(metaTag.length > 1){
jsCBDAddMetaTag(metaTag[0].replace(/\"/g,""),
metaTag[1].replace(/\"/g,""));
}
}
jsCBDupdateDcsUri(
metaTags[0].split(":")[1].replace(/\"/g,""));
}
}
}
}catch(err){
}
}
vg.textZoom._resize=function(aLink, contentIds, fontClass, textZoomId)
{
var A_SIZE1="default";
var A_SIZE2="A-size2";
var A_SIZE3="A-size3";
var content_Ids=contentIds.split(",");
var textZoomElement=document.getElementById(textZoomId);
var selectedFontClass=null;
if(textZoomElement.selectedSizeClass )
{
selectedFontClass=textZoomElement.selectedSizeClass;
}
var defaultFont=fontClass==A_SIZE1;
for(var i=0;i < content_Ids.length;i++)
{
content_Ids[i]=trim(content_Ids[i]);
if(selectedFontClass)
{
vg.html.removeStyle(textZoomElement.selectedSizeClass, vg.html.getElement(content_Ids[i]));
}
if(!defaultFont)
{
vg.html.addStyle(fontClass, vg.html.getElement(content_Ids[i]));
}
}
textZoomElement.selectedSizeClass=defaultFont?null:fontClass;
jsCBDtoggleLink(aLink, true, "A-selected", textZoomId, true);
}
vg.textZoomNG._resize=function(aLink, fontClass, onLoadSizeClass)
{
var textZoomElement=vg.html.findAncestor(aLink,{}, function(node){return vg.html.hasStyle("A-size", node)});
if(!textZoomElement.currentSizeClass)
{
textZoomElement.currentSizeClass=onLoadSizeClass;
}
var sizeNode=vg.html.getElement("body");
vg.html.removeStyle(textZoomElement.currentSizeClass, sizeNode);
var triggeredFontClass=fontClass;
if(fontClass=="A-sizeAll")
{
if(textZoomElement.currentSizeClass=="A-size1")
{
triggeredFontClass="A-size2"
}
else if(textZoomElement.currentSizeClass=="A-size2")
{
triggeredFontClass="A-size3"
}
else
{
triggeredFontClass="A-size1"
}
}
vg.html.addStyle(triggeredFontClass, sizeNode);
var currentSizeTrigger=vg.html.getElements(textZoomElement,{tagName:'span'}, function(node){return vg.html.hasStyle(textZoomElement.currentSizeClass, node)})[0];
var selectedClass="A-selected";
jsCBDdeleteStyle(currentSizeTrigger, selectedClass);
vg.html._fireCustomEvent(vg.event.TEXT_ZOOM_CLICK,null,{textZoomId:textZoomElement.id});
var selectedSizeTrigger=vg.html.getElements(textZoomElement,{tagName:'span'}, function(node){return vg.html.hasStyle(triggeredFontClass, node)})[0];
jsCBDaddStyle(selectedSizeTrigger, selectedClass);
textZoomElement.currentSizeClass=triggeredFontClass;
var cookieValue=vg.textZoomNG.COOKIE_VALUES[triggeredFontClass]||"1";
jsCBDsetConfigInfo(vg.textZoomNG.ZOOM_COOKIE, cookieValue );
}
vg.textZoomNG._resizeNodeOutsideOfZoomContent=function(nodeOutsideOfZoomContent, nodeInsideOfZoomContent)
{
if(cbd.page.isNextGen&&(nodeInsideOfZoomContent.textZoom===true||vg.html.findAncestor(nodeInsideOfZoomContent,{}, function(node){return vg.html.hasStyle(vg.textZoomNG.TEXT_ZOOM_CONTENT_CLASS, node)})))
{
jsCBDaddStyle(nodeOutsideOfZoomContent, vg.textZoomNG.TEXT_ZOOM_CONTENT_CLASS);
nodeInsideOfZoomContent.textZoom=true;
}
}
vg.html.getBorderWidth=function(domElement, style)
{
var propValue=parseInt(jsCBDGetComputedStylePropertyValue(domElement, style), 10);
if(isNaN(propValue))
{
propValue=0;
}
return propValue;
}
vg.XML={};
vg.XML.parseXML=function(url, xpath, tags, callback)
{
"use strict";
var params={"xpath":xpath ,"callback":callback, "tags":tags};
jsCBDgetContent(url, function(request,error,caller){vg.XML._parseXMLData(request,error,caller,params);},this);
};
vg.XML._parseXMLData=function(req, error, caller, params)
{
"use strict";
var xmlDoc,xmlData;
if(req)
{
xmlDoc=req.responseXML;
}
xmlData=vg.XML._parseXMLDataXPath(xmlDoc, params.xpath, params.tags);
params.callback(xmlData);
};
vg.XML._parseXMLDataXPath=function(xmlDoc, xpath, tags)
{
"use strict";
var xmlData={},
tagVal;
for(tagVal in tags)
{
xmlData[tagVal]=vg.XML._xPathSelect(xmlDoc, xmlDoc, xpath, tags[tagVal], true);
}
return xmlData;
};
vg.XML._xPathSelect=function(xmlDoc, contextNode, xpath, tag, returnValue)
{
var nodes, node, item, items, currentItem, length, i, j;
var result=new Array();
if(ie)
{
nodes=contextNode.selectNodes(xpath);
for(i=0;i<nodes.length;i++)
{
item=returnValue?'':null;
length=nodes[i].childNodes.length - 1;
for(j=length;j >=0;j--)
{
currentItem=nodes[i].childNodes[j];
if(currentItem.nodeName===tag)
{
item=returnValue?currentItem.text:currentItem;
break;
}
}
result.push(item);
}
}
else
{
result=new Array();
nodes=xmlDoc.evaluate(xpath, contextNode, null, XPathResult.ANY_TYPE,null);
node=nodes.iterateNext();
while(node)
{
items=node.getElementsByTagName(tag);
if(items&&items.length > 0)
{
item=returnValue?(items[0].textContent||''):items[0];
}
else
{
item=returnValue?'':null;
}
result.push(item);
node=nodes.iterateNext();
}
}
return result;
};
vg._initOnLoad=function()
{
"use strict";
if(cbd.adapter)
{
cbdcommon.init();
}
if(cbd.YUI)
{
cbd.gh.initGH();
cbdcommon.comp._initGlobalFooter();
cbdcommon.comp._initSuperFooter();
vg.javascriptAdapter.attachListeners();
}
else if(window.console)
{
console.log("vg.javascriptAdapter.attachListeners() not called because cbd.YUI does not exist.");
}
vg.html.addEventListener(window, "CBD_OPEN_IDLE_LAYER" , vg._openIdleLayer, "CBD_OPEN_IDLE_LAYER");
vg.html.addEventListener(window, "CBD_CLOSE_IDLE_LAYER" , vg._closeIdleLayer, "CBD_CLOSE_IDLE_LAYER");
};
vg._closeIdleLayer=function()
{
jsCBDcloseLayer("cbdIdleWarningLayerForm:cbdIdleWarningLayer");
};
vg._openIdleLayer=function()
{
"use strict";
var idleLayerNode=document.getElementById("cbdIdleWarningLayerForm:cbdIdleWarningLayer"),
url,
urlParams,
idleLayerUrl;
if(idleLayerNode)
{
jsCBDopenLayer(idleLayerNode.id);
}
else
{
url=(cbd.page.isNextGen)?"/com/vanguard/util/cbd/data/idleTimer/idleWarningLayerNG.xhtml":
"/com/vanguard/util/cbd/data/idleTimer/idleWarningLayerOG.xhtml";
urlParams="?responsive="+cbd.page.isResponsive;
idleLayerUrl=jsCBDgetContextRoot()+cbd.page._viewContext+url+urlParams;
jsCBDloadContent(idleLayerUrl,
"cbdIdleLayerContainer",
"replaceChildren",
function(){
jsCBDopenLayer("cbdIdleWarningLayerForm:cbdIdleWarningLayer");
});
}
};
(function(document,vg){
'use strict';
vg.input={};
vg.input.cssClasses={
inputContainerClass:"txtInputContainer",
inputClearTextIconClass:"clearTextIcon"
}
vg.input.initClearTextIcon=function(inputId)
{
var input=document.getElementById(inputId),
clearTextIcon=vg.input._getClearTextIcon(input);
if(clearTextIcon)
{
vg.html.addEventListener(input, 'keyup', function(event){
vg.input.toggleClearInputIcon(event, input);
}, "INPUT_KEYDOWN_CLEAR_TEXT");
vg.html.addEventListener(clearTextIcon, 'click', function(event){
vg.input.clearInputValue(input);
_setCaretPosition(input,0);
vg.input.toggleClearInputIcon(event, input);
}, "INPUT_CLEAR_TEXT_ICON_CLICK");
}
};
vg.input.toggleClearInputIcon=function(event, input)
{
var inputValue=input.value;
if(inputValue.length > 0)
{
vg.input._toggleClearInputIcon(input, true);
}
else
{
vg.input._toggleClearInputIcon(input, false);
}
};
vg.input.clearInputValue=function(input)
{
input.value='';
};
vg.input._toggleClearInputIcon=function(input, show)
{
var clearTextIcon=vg.input._getClearTextIcon(input);
if(clearTextIcon)
{
jsCBDtoggleElement(clearTextIcon, show);
}
};
vg.input._getInputContainer=function(input)
{
'use strict';
return vg.html.findAncestor(input,{tagName:'span', attrName:'class', attrValue:vg.input.cssClasses.inputContainerClass});
};
vg.input._getClearTextIcon=function(input)
{
'use strict';
var inputContainer=vg.input._getInputContainer(input),
clearTextIcon=vg.html.getElements(inputContainer,{tagName:'div', attrName:'class', attrValue:vg.input.cssClasses.inputClearTextIconClass});
return(clearTextIcon.length > 0)?clearTextIcon[0]:null;
};
}(document,vg));
vg.util.execOnPageReady(vg._initOnLoad);
(function(vg, cbd)
{
"use strict";
var COMMON_PARAMETERS=
{
'null':null,
'true':true,
'false':false
},
REGEX_PATTERNS=
{
JAVASCRIPT_COLON:new RegExp("^(\\s*)javascript(\\s*):(\\s*)", "i"),
RETURN_FALSE:new RegExp("(?=[^\\\"'])*(\\s*)return(\\s+)false(?:[^\\\"'])*", "i"),
FUNCTION_PARTS_REGEX:new RegExp("^([\\w\\.]+)\\s*\\((.*)\\)$"),
VALIDATE_FUNCTION_CALL:new RegExp("^(\\s*[\\w\\$]+)(\\.[\\w\\$]+)*\\s*\\((.*)\\)\\s*$"),
IS_DIGIT:new RegExp("^\\d+(\\.\\d+)?$"),
BRACES_SURROUND:new RegExp("^\\{.*\\}$"),
QUOTES_SURROUND:new RegExp("^['\"].*['\"]$"),
BEGIN_OR_END_QUOTES:new RegExp("^['\"]|['\"]$", "g"),
NO_QUOTE_OR_BRACE_SURROUND:new RegExp("^[^'\"\\{]|[^'\"\\}]$"),
NATIVE_CODE:new RegExp("\\[native code\\]", "i"),
BEGIN_DATA_DASH_VG_DASH:new RegExp("^data\\-vg\\-", "i"),
BEGIN_VG:new RegExp("^vg", "i")
},
RESOLVED_NAMESPACES={},
EMPTY_STRING="",
FUNCTION_DELIMITER=";",
PARAMETER_DELIMITER=",",
NAMESPACE_DELIMITER=".",
logError=function(message)
{
if(message&&console&&console.error)
{
console.error(message);
}
},
preventDefaultAction=function(jsExpression, href, event)
{
if(event.type==="click")
{
if(href!==undefined&&(href.length===0||href==="#"))
{
vg.html.preventDefault(event);
}
}
if(REGEX_PATTERNS.RETURN_FALSE.test(jsExpression))
{
vg.html.preventDefault(event);
}
},
executeJsExpression=function(jsExpression, event)
{
var	tokens,
numOfTokens=0,
token,
prevToken=EMPTY_STRING,
index,
functionObject,
functionParts,
functionName,
functionParameters;
if(jsExpression)
{
jsExpression=jsExpression.replace(REGEX_PATTERNS.JAVASCRIPT_COLON, EMPTY_STRING);
jsExpression=jsExpression.replace(REGEX_PATTERNS.RETURN_FALSE, EMPTY_STRING);
jsExpression=trim(jsExpression);
tokens=jsExpression.split(FUNCTION_DELIMITER);
numOfTokens=tokens.length;
}
for(index=0;index < numOfTokens;index++)
{
token=prevToken;
token=(token===EMPTY_STRING)?token:token+FUNCTION_DELIMITER;
token=token+trim(tokens[index]);
if(vg._javascriptAdapter.isValidFunctionCall(token))
{
prevToken=EMPTY_STRING;
functionParts=REGEX_PATTERNS.FUNCTION_PARTS_REGEX.exec(token);
functionName=functionParts[1];
functionParameters=functionParts[2];
functionObject=vg._javascriptAdapter.retrieveWindowObject(functionName);
if(functionObject)
{
functionParameters=vg._javascriptAdapter.getValidFunctionParameters(functionParameters, event);
if(functionParameters)
{
functionObject.apply(null, functionParameters);
}
}
}
else
{
prevToken=token;
}
}
if(prevToken!==EMPTY_STRING)
{
logError("Invalid function syntax found:"+prevToken);
}
},
eventHandler=function(event)
{
var eventNode=vg._javascriptAdapter.retrieveDataVgEventNode(event),
attrName="data-vg-"+event.type,
dataVgAttribute=eventNode.attributes[attrName],
jsExpression=dataVgAttribute.value,
hrefAttr,
hrefValue;
hrefValue=eventNode.getAttribute('href', 2);
if(ieQuirksMode)
{
if(hasHrefAttributeInMarkup(eventNode))
{
hrefAttr=hrefValue;
}
}
else
{
if(hrefValue!==null)
{
hrefAttr=hrefValue;
}
}
preventDefaultAction(jsExpression, hrefAttr, event);
executeJsExpression(jsExpression, event);
},
hasHrefAttributeInMarkup=function(eventNode)
{
var innerHTML=eventNode.innerHTML,
outerHTML=eventNode.outerHTML,
innerHTMLIndex,
searchString,
result;
innerHTMLIndex=outerHTML.indexOf(innerHTML);
searchString=outerHTML.slice(0, innerHTMLIndex);
return searchString.indexOf('href=') > -1;
},
attachListener=function(element, eventType, jsExpression)
{
if(eventType==="immediate")
{
executeJsExpression(jsExpression);
}
else
{
vg.html.addEventListener(element, eventType, eventHandler);
}
},
parseJson=function(jsonString)
{
var convertedParameter,
YUI=cbd.getYUI();
try
{
if(YUI)
{
convertedParameter=jsonString.replace(/'/ig, '"');
convertedParameter=YUI.JSON.parse(convertedParameter);
}
}
catch(exception)
{
convertedParameter=undefined;
logError("Error parsing JSON:"+exception.message);
}
return convertedParameter;
},
processDataVgEventAttributes=function(dataVgElement)
{
if(dataVgElement.dataset)
{
processDataVgEventAttributes=function(dataVgElement)
{
var attributes=dataVgElement.dataset,
attributeName,
jsExpression,
eventType;
for(attributeName in attributes)
{
if(attributeName!=="vgHandler"&&REGEX_PATTERNS.BEGIN_VG.test(attributeName))
{
jsExpression=attributes[attributeName];
eventType=attributeName.replace(REGEX_PATTERNS.BEGIN_VG, "").toLowerCase();
attachListener(dataVgElement, eventType, jsExpression);
}
}
};
}
else
{
processDataVgEventAttributes=function(dataVgElement)
{
var attributes=dataVgElement.attributes,
attributeIndex=attributes.length,
attribute,
attributeName,
jsExpression,
eventType;
while(attributeIndex--)
{
attribute=attributes[attributeIndex];
attributeName=attribute.name;
if(attributeName!=="data-vg-handler"&&REGEX_PATTERNS.BEGIN_DATA_DASH_VG_DASH.test(attributeName))
{
jsExpression=attribute.value;
eventType=attributeName.replace(REGEX_PATTERNS.BEGIN_DATA_DASH_VG_DASH, EMPTY_STRING);
eventType=eventType.toLowerCase();
attachListener(dataVgElement, eventType, jsExpression);
}
}
};
}
processDataVgEventAttributes(dataVgElement);
};
vg._javascriptAdapter={
retrieveDataVgElements:function(target)
{
var YUI,
dataVgHandlerAttribute="[data-vg-handler='true']",
targetElement,
dataVgElements=[];
if(target)
{
if(typeof(target)==='string')
{
targetElement=document.getElementById(target);
}
else{
targetElement=target;
}
}
else
{
targetElement=document.body;
}
YUI=cbd.getYUI();
if(YUI)
{
dataVgElements=YUI.one(targetElement).all(dataVgHandlerAttribute).getDOMNodes();
}
return dataVgElements;
},
isValidFunctionCall:function(functionCall)
{
return REGEX_PATTERNS.VALIDATE_FUNCTION_CALL.test(functionCall);
},
retrieveWindowObject:function(target)
{
var endOfNamespaceIndex=-1,
namespace,
objectName,
nameSpaceParts,
nameSpaceLength,
nameSpacePart,
scope,
index,
targetObject,
resolvedNamespaceKey,
cachedNamespace;
if(target)
{
endOfNamespaceIndex=target.lastIndexOf(NAMESPACE_DELIMITER);
objectName=target;
scope=window;
}
if(endOfNamespaceIndex > -1)
{
namespace=target.substring(0, endOfNamespaceIndex);
objectName=target.substring(endOfNamespaceIndex+1);
cachedNamespace=RESOLVED_NAMESPACES[namespace];
if(cachedNamespace)
{
scope=cachedNamespace;
}
else
{
nameSpaceParts=namespace.split(NAMESPACE_DELIMITER);
nameSpaceLength=nameSpaceParts.length;
for(index=0;index < nameSpaceLength;index++)
{
nameSpacePart=nameSpaceParts[index];
scope=scope[nameSpacePart];
if(scope)
{
resolvedNamespaceKey=(index > 0)?resolvedNamespaceKey+NAMESPACE_DELIMITER:EMPTY_STRING;
resolvedNamespaceKey=resolvedNamespaceKey+nameSpacePart;
RESOLVED_NAMESPACES[resolvedNamespaceKey]=scope;
}
else
{
logError("Undefined namespace \""+nameSpacePart+"\" in "+target);
break;
}
}
}
}
if(scope)
{
targetObject=scope[objectName];
if(targetObject&&REGEX_PATTERNS.NATIVE_CODE.test(targetObject))
{
targetObject=null;
logError("Attempt to execute native code");
}
}
return targetObject;
},
getValidFunctionParameters:function(functionParameters, event)
{
var tokens,
numOfTokens=0,
prevToken=EMPTY_STRING,
token,
convertedParameter,
validFunctionParameters=[],
index;
if(functionParameters)
{
tokens=functionParameters.split(PARAMETER_DELIMITER);
numOfTokens=tokens.length;
}
for(index=0;index < numOfTokens;index++)
{
token=prevToken;
token=(token===EMPTY_STRING)?token:token+PARAMETER_DELIMITER;
token=token+trim(tokens[index]);
convertedParameter=vg._javascriptAdapter.validateAndConvertParameter(token, event);
if(convertedParameter!==undefined)
{
validFunctionParameters.push(convertedParameter);
prevToken=EMPTY_STRING;
}
else
{
prevToken=token;
}
}
if(prevToken!==EMPTY_STRING)
{
validFunctionParameters=[];
logError("Invalid parameter(s) found:"+prevToken);
}
return validFunctionParameters;
},
validateAndConvertParameter:function(functionParameter, event)
{
var convertedParameter,
YUI;
if(COMMON_PARAMETERS[functionParameter]!==undefined)
{
convertedParameter=COMMON_PARAMETERS[functionParameter];
}
else if(functionParameter==="event")
{
convertedParameter=event;
}
else if(functionParameter==="this")
{
convertedParameter=(event)?vg._javascriptAdapter.retrieveDataVgEventNode(event):undefined;
}
else if(REGEX_PATTERNS.IS_DIGIT.test(functionParameter))
{
convertedParameter=Number(functionParameter);
}
else if(REGEX_PATTERNS.BRACES_SURROUND.test(functionParameter))
{
convertedParameter=parseJson(functionParameter);
}
else if(REGEX_PATTERNS.QUOTES_SURROUND.test(functionParameter))
{
convertedParameter=functionParameter.replace(REGEX_PATTERNS.BEGIN_OR_END_QUOTES, EMPTY_STRING);
}
else if(REGEX_PATTERNS.NO_QUOTE_OR_BRACE_SURROUND.test(functionParameter))
{
convertedParameter=vg._javascriptAdapter.retrieveWindowObject(functionParameter);
}
return convertedParameter;
},
retrieveDataVgEventNode:function(event)
{
var eventNode=jsCBDgetEventNode(event),
attrName='data-vg-'+event.type,
dataVgAttribute=eventNode.attributes[attrName];
if(dataVgAttribute===undefined)
{
eventNode=vg.html.findAncestor(eventNode,{attrName:attrName});
}
return eventNode;
}
};
vg.javascriptAdapter={
attachListeners:function(target)
{
var dataVgElements=vg._javascriptAdapter.retrieveDataVgElements(target),
dataVgElementIndex=dataVgElements.length,
dataVgElement;
while(dataVgElementIndex--)
{
dataVgElement=dataVgElements[dataVgElementIndex];
processDataVgEventAttributes(dataVgElement);
}
}
};
}(vg, cbd));
vg.Menu.toggle=function(menuId, index, disableMenuItem)
{
"use strict";
var menuBarPlugin=vg.comp.getController(menuId).menuBar.menuBarPlugin;
menuBarPlugin._toggle(menuId, index, disableMenuItem );
}
vg.Menu.updateMenuItem=function(menuId, index, value)
{
"use strict";
var menuBarPlugin=vg.comp.getController(menuId).menuBar.menuBarPlugin;
menuBarPlugin._updateMenuItem(menuId, index, value );
};
vg.ajax._jsonp=function(obj)
{
"use strict";
cbd.getYUI().use("jsonp", "jsonp-url", function(Y)
{
Y.jsonp(obj.url, obj.config);
});
};
(function(document,vg){
'use strict';
vg.textArea={};
vg.textArea.initialize=function(id)
{
var textArea=document.getElementById(id),
maxlength=0;
if(textArea&&vg.util.hasAttribute(textArea, 'maxlength'))
{
maxlength=parseInt(textArea.getAttribute('maxlength'), 10);
}
if(maxlength < 0)
{
textArea.removeAttribute('maxlength');
}
};
}(document,vg));


TabBox=function(id, showError, config, transDuration, orientation)
{
"use strict";
var itemsWrapper=null,
THIS,
func,
i,
observerInput,
controller;
this.base=vg.Controller;
this.base(id, null);
this.id=id;
this.domChangedTimeout=null;
if(config&&(config.respConfig||config.respConfigItems) )
{
this.respConfig=config.respConfig;
this.respConfigItems=config.respConfigItems;
}
else
{
this.respConfig=config;
}
this.hasRespDropdown=false;
this.hasRespExpandCollapse=false;
this.initOpenStateSmall=false;
this.initOpenStateMedium=false;
this.tabType=this.viewNode.getAttribute(TabBox.constants.TAB_TYPE_ATTR);
this.hasSideTabContent=this.viewNode.getAttribute(TabBox.constants.HAS_SIDE_TAB_CONTENT_ATTR);
this._setRespConfigFlags();
itemsWrapper=vg.html.getElements(this.viewNode,{tagName:'div', attrName:'id', attrValue:this.viewNode.getAttribute("id")+'_tabBoxItemContainer'})[0];
this.tabBoxItems=vg.html.getElements(itemsWrapper,{tagName:'div', maxDepth:1}, function(node){return vg.html.hasStyle(TabBox.constants.CONTENT_ITEM_CLASS,node)});
if(showError)
{
vg.validation.pageHasValObservers=true;
}
this.tabsDiv=vg.html.getElements(this.viewNode,{tagName:'div', attrName:'class', attrValue:TabBox.constants.TABBOX_CLASS})[0];
if(this.tabsDiv==null)
{
this.tabsDiv=vg.html.getElements(this.viewNode,{tagName:'div', attrName:'class', attrValue:TabBox.constants.TABBOX_INTERNAL_CLASS})[0];
}
this.isSubhead=false;
if(this.tabsDiv==null)
{
this.tabsDiv=vg.html.getElements(this.viewNode,{tagName:'div', attrName:'class', attrValue:TabBox.constants.SUBHEAD_CLASS})[0];
if(this.tabsDiv==null)
{
this.tabsDiv=vg.html.getElements(this.viewNode,{tagName:'div', attrName:'class', attrValue:TabBox.constants.SUBHEAD_INTERNAL_CLASS})[0];
}
if(this.tabsDiv!=null)
{
this.isSubhead=true;
this.parentItem=document.getElementById(this.id.substring(0, this.id.lastIndexOf(":")+1)+this.tabsDiv.getAttribute(TabBox.constants.PARENT_ITEM_ATTR ));
this.parentTabBox=document.getElementById(this.id.substring(0, this.id.lastIndexOf(":")));
}
}
this.tabsList=vg.html.getElements(this.tabsDiv,{tagName:'ul', attrName:'class', attrValue:TabBox.constants.TAB_ITEMS_CLASS})[0];
this.tabs=vg.html.getElements(this.tabsList,{tagName:'li'});
if(this.hasSideTabContent=='true')
{
this.sideTabContentLeftTD=document.getElementById(this.id+'_tabboxSideContentTD1');
THIS=this;
func=function(){THIS._setTabTD_width(THIS.tabsList);};
vg.util.execOnPageReady(func);
}
if(window.observerInputList&&observerInputList[id])
{
for(i=0;i < observerInputList[id].length;i++)
{
observerInput=observerInputList[id][i];
this._updateValidationObserverErrors(observerInput.input, observerInput.node,!observerInput.valid);
}
observerInputList[id]=null;
}
if(cbd.browser.isTouchScreen&&cbd.page.isNextGen)
{
this._addTouchScrolling();
}
this._createDropdownReferences();
this._addListenersForDropdown();
this._addListenersForExpandCollapse();
this._addLoadingIndicator();
this.transdur=transDuration!==null?(transDuration*1000):null;
if(this.transdur===null&&this.hasRespDropdown===true)
{
this.transdur=600;
}
this._setOpenStates();
if(TabBox.constants.ORIENTATION_LEFT===orientation)
{
controller=this;
vg.util.execOnPageReady(function(){controller.fixTabHeight();});
}
};
TabBox.constants=
{
MODE_ATTR:"mode",
MODE_CURRENT:"current",
MODE_DISABLED:"disabled",
MODE_SELECTED:"selected",
HAS_SIDE_TAB_CONTENT_ATTR:"hassidetabcontent",
INTERNAL_ATTR:"internal",
PARENT_ITEM_ATTR:"parentitem",
TAB_TYPE_ATTR:"tabtype",
ORIENTATION_LEFT:"left",
CONTENT_ITEM_CLASS:"cntItem",
RESP_DISPLAY_NONE_CLASS:"dispNone",
RESP_DROPDOWN_BADGE_CLASS:"dropdownBadgeIcon",
RESP_DROPDOWN_LABEL_CLASS:"dropdownLabel",
RESP_TAB_CLASS:"respTab",
SUBHEAD_CLASS:"subhead",
SUBHEAD_INTERNAL_CLASS:"int-subhead",
TAB_DISABLED_CLASS:"disabled",
TAB_ITEMS_CLASS:"tabItems",
TAB_LABEL_CLASS:"tabLabel",
TAB_SELECTED_CLASS:"current",
TAB_SELECTED_ERR_CLASS:"current-err",
TAB_SELECTED_INTERNAL_CLASS:"int-current",
TAB_UNSELECTED_CLASS:"unselected",
TAB_UNSELECTED_ERR_CLASS:"unselected-err",
TAB_UNSELECTED_INTERNAL_CLASS:"int-unselected",
TABBOX_CLASS:"tabbox",
TABBOX_INTERNAL_CLASS:"int-tabbox",
OPEN_CLASS:"open",
TABBOX_HEIGHT_CALC_CLASS:"tabBoxHeightCalc"
};
TabBox.truthTable=vg.util.buildBooleanTable([
[[true,  true,  true], TabBox.constants.TAB_SELECTED_ERR_CLASS],
[[true,  true, false], TabBox.constants.TAB_SELECTED_ERR_CLASS],
[[true, false,  true], TabBox.constants.TAB_UNSELECTED_ERR_CLASS],
[[true, false, false], TabBox.constants.TAB_UNSELECTED_ERR_CLASS],
[[false,  true,  true], TabBox.constants.TAB_SELECTED_INTERNAL_CLASS],
[[false,  true, false], TabBox.constants.TAB_SELECTED_CLASS],
[[false, false,  true], TabBox.constants.TAB_UNSELECTED_INTERNAL_CLASS],
[[false, false, false], TabBox.constants.TAB_UNSELECTED_CLASS]
]);
TabBox.prototype=
{
fixTabHeight:function()
{
"use strict";
var	tabContHeight=0,
minHeight=0,
itemsLength=this.tabs.length,
adapter=cbd.adapter,
item,
i,
iHeight;
for(i=0;i < itemsLength;i++)
{
item=this.tabs[i];
if(!adapter.hasClass(item, "header"))
{
iHeight=vg.html.getObjHeight(item);
minHeight=(iHeight > minHeight)?iHeight:minHeight;
}
}
for(i=0;i < itemsLength;i++)
{
item=this.tabs[i];
if(!adapter.hasClass(item, "header"))
{
if(ieQuirksMode)
{
vg.html.setHeight(item, minHeight+"px");
}
else
{
item.style.minHeight=minHeight+"px";
}
}
}
},
_setRespConfigFlags:function()
{
var respConfig=this.respConfig;
if(respConfig)
{
if((respConfig.small&&respConfig.small.showAsDropdown===true)||(respConfig.medium&&respConfig.medium.showAsDropdown===true) )
{
this.hasRespDropdown=true;
}
if((respConfig.small&&respConfig.small.showAsExpandCollapse===true)||(respConfig.medium&&respConfig.medium.showAsExpandCollapse===true) )
{
this.hasRespExpandCollapse=true;
}
}
},
_updateValidationObserverErrors:function(input, tabBoxItemNode, isError)
{
if(!tabBoxItemNode.errorInputs)
{
tabBoxItemNode.errorInputs=[];
}
var	inputId=input.getAttribute("id"),
errorInputIdx=-1,
i,
foundInArray;
for(i=0;i < tabBoxItemNode.errorInputs.length&&(errorInputIdx < 0);i++)
{
if(inputId==tabBoxItemNode.errorInputs[i])
{
errorInputIdx=i;
}
}
foundInArray=errorInputIdx >=0;
if(isError&&!foundInArray )
{
tabBoxItemNode.errorInputs[tabBoxItemNode.errorInputs.length]=inputId;
}
else if(!isError&&foundInArray )
{
tabBoxItemNode.errorInputs.splice(errorInputIdx, 1);
}
},
_triggerValidationObserver:function(tabBoxItemNode)
{
var tabIndex,
parentTabIndex,
parentTab,
i,
tab,
errorInputsLength,
hasErrors,
isSelected,
isDisabled,
itemErrorInputs,
parentController,
tabBoxItemsLength=this.tabBoxItems.length,
constants=TabBox.constants,
currentMode=constants.MODE_CURRENT,
disabledMode=constants.MODE_DISABLED,
selectedMode=constants.MODE_SELECTED,
modeAttribute=constants.MODE_ATTR,
tabMode;
for(i=0;i < tabBoxItemsLength&&!tabIndex;i++)
{
if(this.tabBoxItems[i]==tabBoxItemNode)
{
tabIndex=i;
}
}
if(this.isSubhead)
{
tabIndex*=2;
parentController=vg.comp.getController(this.parentTabBox);
for(i=0;i < parentController.tabBoxItems.length&&!parentTabIndex;i++)
{
if(parentController.tabBoxItems[i]==this.parentItem)
{
parentTabIndex=i;
}
}
}
tab=this.tabs[tabIndex];
if(parentTabIndex!=undefined)
{
parentTab=parentController.tabs[parentTabIndex];
}
errorInputsLength=tabBoxItemNode.errorInputs?tabBoxItemNode.errorInputs.length:0;
hasErrors=errorInputsLength > 0;
tabMode=tab.getAttribute(modeAttribute );
isSelected=(tabMode==selectedMode )||(tabMode==currentMode );
isDisabled=(tabMode==disabledMode );
if(isDisabled)
{
tab.className=constants.TAB_DISABLED_CLASS;
}
else
{
tab.className=this._setTabStyles({"tabNode":tab, "itemNode":tabBoxItemNode, "isSelected":isSelected});
}
if(parentTab)
{
tabMode=parentTab.getAttribute(modeAttribute );
isSelected=(tabMode==selectedMode )||(tabMode==currentMode );
isDisabled=(tabMode==disabledMode );
this.parentItem.errorInputs=[];
for(i=0;i < tabBoxItemsLength;i++)
{
itemErrorInputs=this.tabBoxItems[i].errorInputs;
if(itemErrorInputs&&itemErrorInputs.length > 0)
{
this.parentItem.errorInputs=this.parentItem.errorInputs.concat(itemErrorInputs);
}
}
if(isDisabled)
{
parentTab.className=constants.TAB_DISABLED_CLASS;
}
else
{
parentTab.className=this._setTabStyles({"tabNode":parentTab, "itemNode":this.parentItem, "isSelected":isSelected});
}
}
},
_setTabStyles:function(params)
{
var tabNode=params.tabNode,
itemNode=params.itemNode,
isSelected=params.isSelected,
errorInputsLength=itemNode.errorInputs?itemNode.errorInputs.length:0,
hasErrors=errorInputsLength > 0,
classToAdd=vg.util.getBooleanTableValue(TabBox.truthTable,
[hasErrors, isSelected, itemNode.getAttribute(TabBox.constants.INTERNAL_ATTR )==='true']),
classToRemove=vg.util.getBooleanTableValue(TabBox.truthTable,
[hasErrors,!isSelected, itemNode.getAttribute(TabBox.constants.INTERNAL_ATTR )==='true']);
jsCBDdeleteStyle(tabNode, classToRemove);
jsCBDaddStyle(tabNode, classToAdd);
return tabNode.className;
},
_getSelectedTabIndex:function()
{
var	tabsExcludingSpacers=this._getTabsExcludingSpacers(),
tabsExcludingSpacersLength=tabsExcludingSpacers.length,
i;
for(i=0;i < tabsExcludingSpacersLength;i++)
{
if(tabsExcludingSpacers[i].getAttribute(TabBox.constants.MODE_ATTR )==TabBox.constants.MODE_CURRENT )
{
return i;
}
}
return null;
},
_getTabsExcludingSpacers:function()
{
return vg.html.getElements(this.tabsList,{tagName:'li',attrName:'class', attrValue:/[^spacer]/});
},
_setTabDivBorder:function(selectedIndex)
{
var	tab=this.tabBoxItems[selectedIndex],
isInternal=tab.getAttribute(TabBox.constants.INTERNAL_ATTR )=='true';
if(!this.isSubhead)
{
if(isInternal)
{
vg.html.replaceClass(this.tabsDiv, this.tabsDiv.className, TabBox.constants.TABBOX_INTERNAL_CLASS);
}
else
{
vg.html.replaceClass(this.tabsDiv, this.tabsDiv.className, TabBox.constants.TABBOX_CLASS);
}
}
},
_setTabTD_width:function()
{
var tabsUL=vg.html.getElement(this.tabsList ),
width=0,
i,
isResponsive=this.hasRespDropdown||this.hasRespExpandCollapse;
width+=this._getTabWidth(tabsUL, false);
for(i=0;i < this.tabs.length;i++)
{
width+=this._getTabWidth(this.tabs[i],true);
}
width+=20;
if(!isResponsive)
{
this.sideTabContentLeftTD.style.width=width+'px';
this.tabsDiv.style.width=width+'px';
}
},
_getTabWidth:function(node,getTotalObjWidth)
{
var node2=vg.html.getElement(node ),
contentWidth=vg.html.getObjWidth(node2),
widthParms,
boxWidth,
prop,
val;
getTotalObjWidth=(getTotalObjWidth==null)?true:getTotalObjWidth;
widthParms=['margin-left', 'margin-right', 'border-left-width', 'border-right-width', 'padding-left', 'padding-right'];
boxWidth=0;
for(prop in widthParms)
{
val=parseInt(jsCBDGetComputedStylePropertyValue(node2, widthParms[prop]).replace("px",""), 10  );
if(val > 0)
{
boxWidth+=val;
}
}
return(getTotalObjWidth)?contentWidth+boxWidth:boxWidth;
},
_addTouchScrolling:function()
{
var selectedTabBoxItem=this.tabBoxItems[this._getSelectedTabIndex()],
tabboxItem,
h_tabItem,
tabBoxItemsLength,
i;
if(selectedTabBoxItem&&vg.html.isFixedHeight(selectedTabBoxItem))
{
vg.touchScreen._makeNodeScrollable(selectedTabBoxItem.getAttribute('id'));
}
tabBoxItemsLength=this.tabBoxItems.length
for(i=0;i < tabBoxItemsLength;i++)
{
tabboxItem=this.tabBoxItems[i];
h_tabItem;
if(tabboxItem)
{
h_tabItem=tabboxItem.style.height;
}
if(tabboxItem&&h_tabItem!="100%"&&h_tabItem!="")
{
vg.html.addEventListenerMethod(tabboxItem, vg.event.DOM_CHANGE, this, '_handleDomChange' );
}
}
},
_addLoadingIndicator:function()
{
var selectedTabBoxItem=this.tabBoxItems[this._getSelectedTabIndex()],
tabboxItem,
h_tabItem,
tabBoxItemsLength,
i;
tabBoxItemsLength=this.tabBoxItems.length
for(i=0;i < tabBoxItemsLength;i++)
{
tabboxItem=this.tabBoxItems[i];
vg.html.addEventListenerMethod(tabboxItem, vg.event.POPULATOR_CONTENT_LOAD, this, '_handlePopContLoad' );
}
},
_handleDomChange:function()
{
if(cbd.browser.isTouchScreen&&isNextGen)
{
clearTimeout(this.domChangedTimeout);
var SELF=this;
this.domChangedTimeout=setTimeout(
function()
{
var selectedTabBoxItem=SELF.tabBoxItems[SELF._getSelectedTabIndex()];
vg.touchScreen._makeNodeScrollable(selectedTabBoxItem.getAttribute('id'));
}, 100);
}
},
_handlePopContLoad:function(tabIndex)
{
"use strict";
var tabBoxItem=this.tabBoxItems[tabIndex],
respListOfLabels=vg.html.getElements(tabBoxItem.parentNode,
{tagName:'div', maxDepth:1}, function(node){return vg.html.hasStyle("respTab",node);}),
respItem=respListOfLabels[tabIndex];
_cbdShowLoadingIndicator(respItem, false);
},
_createDropdownReferences:function()
{
if(this.hasRespDropdown==true)
{
this.dropdownLink=vg.html.getElements(this.tabsDiv,{tagName:'a'})[0];
this.dropdownLinkLabel=vg.html.getElements(this.dropdownLink,{tagName:'span', attrName:'class', attrValue:TabBox.constants.RESP_DROPDOWN_LABEL_CLASS})[0];
this.dropdownLinkBadgeSpan=vg.html.getElements(this.dropdownLink,{tagName:'span'}, function(node){return vg.html.hasStyle(TabBox.constants.RESP_DROPDOWN_BADGE_CLASS,node)})[0];
this.dropdownOpen=false;
}
},
_updateDropdownLabel:function()
{
if(this.hasRespDropdown==true)
{
var selectedTab=cbd.getYUI().one(this.tabs[this._getSelectedTabIndex()]).one('.tabLabel'),
selectedTabHtml=selectedTab.getDOMNode().innerHTML,
selectedTabBadge=selectedTab.one('.badgeIcon'),
selectedTabBadgeClass=selectedTabBadge?selectedTabBadge.getAttribute("class"):TabBox.constants.RESP_DISPLAY_NONE_CLASS,
selectedTabText=selectedTabBadge?selectedTabHtml.replace(selectedTabBadge.getDOMNode().outerHTML,''):selectedTabHtml;
this.dropdownLinkLabel.innerHTML=selectedTabText;
this.dropdownLinkBadgeSpan.setAttribute("class", selectedTabBadgeClass);
}
},
_addListenersForDropdown:function()
{
var THIS=this;
if(this.hasRespDropdown===true)
{
vg.html.addEventListenerMethod(this.tabsDiv, 'click', this, '_toggleDropdown', this.id+'_dropdownClickListener');
vg.html.addEventListener(window, vg.event.BROWSER_RESIZE_END, function(e){
THIS._closeDropdownOnResize(e);
}, this.id+"_dropdownResizeListener");
}
},
_addListenersForExpandCollapse:function()
{
var THIS=this;
if(this.hasRespExpandCollapse===true)
{
vg.html.addEventListener(window, vg.event.BREAK_POINT_CHANGE, function(e){
THIS._resetExpandCollapseOnBreakPointChange(e);
}, this.id+"_expandcollapseBreakPointListener");
}
},
_toggleDropdown:function()
{
if(cbdcommon.screen.isMediaQuerySizeSmall())
{
if(this.dropdownOpen)
{
this._closeDropdown();
}
else
{
this._openDropdown();
}
this.dropdownOpen=!this.dropdownOpen;
}
},
_closeDropdown:function()
{
var THIS=this;
this._animateDropdown(vg.html.getObjHeight(this.tabsList), 0, function(){
jsCBDdeleteStyle(THIS.tabsDiv, TabBox.constants.OPEN_CLASS);
});
},
_closeDropdownNoDelay:function()
{
vg.html.setHeight(this.tabsList, 0);
this.dropdownOpen=false;
},
_closeDropdownOnResize:function(event)
{
if(!cbdcommon.screen.isMediaQuerySizeSmall())
{
if(this.dropdownOpen)
{
this._closeDropdownNoDelay();
}
if(this.tabsList.style.height==="0px")
{
this.tabsList.style.height='';
}
}
},
_resetExpandCollapseOnBreakPointChange:function(event)
{
var screenSize=cbdcommon.screen.getMediaQuerySize(),
tabBoxNode=null,
tabs=null,
respTabs=null,
tabItems=null,
tabsLen=null,
respConfig=this.respConfig,
respConfigSml=respConfig&&respConfig.small,
respConfigSmlExpCol=respConfigSml&&respConfigSml.showAsExpandCollapse,
respConfigMed=respConfig&&respConfig.medium,
respConfigMedExpCol=respConfigMed&&respConfigMed.showAsExpandCollapse,
i=0;
if((screenSize===cbdcommon.screen.mediaQuerySmall&&respConfigSmlExpCol!==true)||
(screenSize===cbdcommon.screen.mediaQueryMedium&&respConfigMedExpCol!==true)||
(screenSize===cbdcommon.screen.mediaQueryLarge) )
{
tabBoxNode=document.getElementById(this.id);
tabs=vg.html.getElements(tabBoxNode,{tagName:'li', maxDepth:4});
respTabs=vg.html.getElements(tabBoxNode,{tagName:'div', maxDepth:3}, function(node){return vg.html.hasStyle(TabBox.constants.RESP_TAB_CLASS,node)});
tabItems=vg.html.getElements(tabBoxNode,{tagName:'div', maxDepth:3}, function(node){return vg.html.hasStyle(TabBox.constants.CONTENT_ITEM_CLASS,node)});
tabsLen=tabs.length;
for(i=0;i < tabsLen;i++)
{
if(vg.html.hasStyle(TabBox.constants.TAB_SELECTED_CLASS, tabs[i]))
{
cbd.adapter.removeClass(respTabs[i], TabBox.constants.TAB_UNSELECTED_CLASS);
cbd.adapter.addClass(respTabs[i], TabBox.constants.TAB_SELECTED_CLASS);
cbd.adapter.setStyle(tabItems[i], 'display', '');
}
else
{
cbd.adapter.removeClass(respTabs[i], TabBox.constants.TAB_SELECTED_CLASS);
cbd.adapter.addClass(respTabs[i], TabBox.constants.TAB_UNSELECTED_CLASS);
cbd.adapter.setStyle(tabItems[i], 'display', 'none');
}
}
}
this._setOpenStates();
},
_openDropdown:function()
{
var tabsList=this.tabsList,
fullDropdownHeight=0;
jsCBDaddStyle(tabsList, TabBox.constants.TABBOX_HEIGHT_CALC_CLASS);
fullDropdownHeight=vg.html.getObjHeight(tabsList);
jsCBDdeleteStyle(tabsList, TabBox.constants.TABBOX_HEIGHT_CALC_CLASS);
jsCBDaddStyle(this.tabsDiv, TabBox.constants.OPEN_CLASS);
this._animateDropdown(0, fullDropdownHeight, null);
},
_animateDropdown:function(fromHeight, toHeight, callBackFunc)
{
"use strict";
var THIS=this,
time=this.transdur;
if(time===0)
{
vg.html.setHeight(THIS.tabsList, toHeight+'px');
}
else
{
vg.smil.animateElement(this.tabsList, 'height', time, 0, fromHeight, toHeight, null, callBackFunc);
}
},
_destroy:function()
{
vg.html.removeEventListenerById(window, this.id+"_dropdownResizeListener");
vg.html.removeEventListenerById(window, this.id+"_expandcollapseBreakPointListener");
},
_setOpenStates:function()
{
var	respConfigItems=this.respConfigItems,
screenSize=cbdcommon.screen.getMediaQuerySize(),
respSmall=(screenSize===cbdcommon.screen.mediaQuerySmall),
respMedium=(screenSize===cbdcommon.screen.mediaQueryMedium)
tabBoxNode=null;
tabItems=null,
i=0,
respConfigItem=null,
itemOpenState=null,
initAction=false;
if(this.respConfigItems&&(
(respSmall&&!this.initOpenStateSmall)||(respMedium&&!this.initOpenStateMedium) ))
{
tabBoxNode=document.getElementById(this.id);
tabItems=vg.html.getElements(tabBoxNode,{tagName:'div', maxDepth:3},	function(node){
return vg.html.hasStyle(TabBox.constants.CONTENT_ITEM_CLASS,node)});
for(;i < tabItems.length;i++)
{
respConfigItem=this.respConfigItems[i];
if(respConfigItem)
{
itemOpenState=(respConfigItem.small&&respSmall)?respConfigItem.small.openState:
((respConfigItem.medium&&respMedium)?respConfigItem.medium.openState:null);
if(itemOpenState===true||itemOpenState===false)
{
initAction=true;
if(itemOpenState===true?
tabItems[i].style.display==='none':tabItems[i].style.display!=='none')
{
this._toggleTabBoxItem(tabItems[i].id, i);
}
}
}
}
if(initAction)
{
if(respSmall)
{
this.initOpenStateSmall=true;
}
else
{
this.initOpenStateMedium=true;
}
}
}
},
_toggleTabBoxItem:function(tabItemId, index)
{
var tabBoxIdStr=tabItemId.substring(0, tabItemId.lastIndexOf(":")),
tabBoxItemNode=vg.html.getElement(tabItemId),
respTabNode=null,
TABBOX_ITEM_LINK="_tabBoxItemLink",
RESP_LINK="_respLink";
respTabNode=tabBoxIdStr+TABBOX_ITEM_LINK+index+RESP_LINK;
respTabNode=vg.html.getElement(respTabNode).parentNode;
if(tabBoxItemNode.style.display=='none')
{
_cbdAddCollapseImageTabBoxTab(respTabNode);
}
else
{
_cbdAddExpandImageTabBoxTab(respTabNode);
}
_cbdSlideToggleTabBoxItem(tabBoxItemNode);
}
};
TabBox.setTabBoxItemLabel=function(id, index, label)
{
var tabBoxItem=document.getElementById(id+"_tabBoxItemLink"+index);
if(tabBoxItem&&tabBoxItem.innerHTML)
{
tabBoxItem.innerHTML=label;
}
};


AutoSuggest=function(id, numCharsToTrigger, labelColumn, tableUrl, onSelect,
onValueChange, maxRowsBeforeScroll, position,
defaultText, fieldIDToHide, onBlurJS, displayAsCombo,
triggerChangeOnBlur, selectableCellSpans, onInputEnter,
containerClass, disablePositioning, ignoreDefaultTextCheckOnCharCount,
resultsTableId, restUrl, restCallback, respConfig )
{
var dropdownHolder,
asThickBorderTd,
controller,
wrapDiv,
newSize;
this.base=vg.Controller;
this.base(id, null);
this.highlightedNodes=null;
dropdownHolder=vg.html.getSibling(this.viewNode,{tagName:'span', attrName:'class', attrValue:AutoSuggest.AUTO_SUGGEST_COMP_CLASS}, "+");
this.dropdown=vg.html.getFirstChild(dropdownHolder);
this.insideFloatingHead=false;
if(vg.html.findAncestor(this.viewNode,{tagName:'tr', attrName:'floathead', attrValue:'true'}))
{
this.insideFloatingHead=true;
}
if(!this.dropdown&&id.indexOf(vg.comp.floatingHeadPrefix)==0)
{
this.dropdown=this._copyFloatingProtoDropdown(id, dropdownHolder);
}
this.tableContainer=vg.html.getFirstChild(vg.html.getFirstChild(this.dropdown));
this.labelInput=this.viewNode;
this.valueInput=vg.html.getSibling(this.labelInput,{tagName:'input'}, "+");
this.clearIcon=cbd.getYUI().one(this.labelInput).next('.x-ghClearIcon');
this.containerClass=containerClass;
if(this.containerClass!=="" )
{
cbd.adapter.addClass(this.dropdown, this.containerClass);
}
this.numCharsToTrigger=numCharsToTrigger;
this.labelColumn=labelColumn;
this.tableUrl=tableUrl;
this.onSelect=onSelect;
this.onInputEnter=onInputEnter;
this.onValueChange=onValueChange;
this.maxRowsBeforeScroll=maxRowsBeforeScroll > 0?maxRowsBeforeScroll:null;
this.position=position;
this.defaultText=defaultText;
this.fieldIDToHide=fieldIDToHide;
this.triggerChangeOnBlur=triggerChangeOnBlur;
this.selectableCellSpans=selectableCellSpans;
this.currentCellCol=0;
this.cursor;
this.onBlurJS=(onBlurJS==''?null:onBlurJS);
this.disablePositioning=disablePositioning;
this.ignoreDefaultTextCheckOnCharCount=ignoreDefaultTextCheckOnCharCount;
this.resultsTableId=resultsTableId;
this.respConfig=respConfig;
this.dropdownPadding=12;
this.dropdownBorder=2;
this.restUrl=restUrl;
this.restCallback=restCallback;
this.displayAsCombo=displayAsCombo;
this.isStatic=displayAsCombo;
this.isSuggestionsOpen=false;
this.isTabPressed=false;
this.isDropDownClicked=false;
this.isRowClicked=false;
this.oldLabelInputValue=this.labelInput.value;
if(this._isHybrid()&&this._hasEnoughChars())
{
this.isStatic=false;
}
this._initRespConfig();
this._saveInlineWidth();
this._setRespWidth();
this.labelInput.setAttribute("autocomplete", "off");
if(isEmpty(this.labelInput.value)&&this.defaultText)
{
this.labelInput.value=this.defaultText;
vg.html.replaceClass(this.viewNode, cbd.gh.ASINPUT_FOCUS_CLASS, cbd.gh.ASINPUT_NOFOCUS_CLASS);
}
asThickBorderTd=vg.html.findAncestor(this.viewNode,{tagName:"td", attrName:"class"}, function(input){return vg.html.hasStyle("layoutTopBorder", input);});
if(asThickBorderTd)
{
this.viewNode.inLayoutTopBorderTd=true;
}
this.loading=false;
this.scroll=false;
controller=this;
vg.html.addEventListener(this.labelInput, 'click',		function(e){controller._inputClick(e);});
vg.html.addEventListener(this.labelInput, 'blur',		function(e){controller._onBlurAction(e);});
vg.html.addEventListener(this.labelInput, 'keyup',		function(e){controller._keyup(e);});
vg.html.addEventListener(this.labelInput, 'keydown',	function(e){controller._keydown(e);});
vg.html.addEventListener(this.dropdown, 'mousedown',	function(e){controller._ddMouseDown(e);});
vg.html.addEventListener(this.dropdown, 'mouseup',		function(e){controller._ddMouseUp(e);});
if(cbd.page.isResponsiveCapable===true )
{
vg.html.addEventListener(window, vg.event.BREAK_POINT_CHANGE, function(e, newSize){controller._setRespWidth(e.breakPoint);});
}
wrapDiv=document.getElementById('wrapDiv');
if(ie&&wrapDiv)
{
vg.html.addEventListener(wrapDiv, 'scroll' , function(){controller.hideSuggestions();});
}
else if(this.insideFloatingHead)
{
vg.html.addEventListener(window, 'scroll' , function(){controller.hideSuggestions();});
}
this._addRowListeners();
vg.util.execOnPageReady(function(){controller._createAutoSugCont();});
};
AutoSuggest.AUTO_SUGGEST_SELECTED=AUTO_SUGGEST_SELECTED='selected';
AutoSuggest.AUTO_SUGGEST_COMP_CLASS=AUTO_SUGGEST_COMP_CLASS='comp-shdwBox';
AutoSuggest.AUTO_SUGGEST_DROPDOWN_CLASS=AUTO_SUGGEST_DROPDOWN_CLASS='shdwBox';
AutoSuggest.AUTO_SUGGEST_DROPDOWN_SUFFIX=AUTO_SUGGEST_DROPDOWN_SUFFIX='ShdwBox';
AutoSuggest.AUTO_SUGGEST_DISABLED=AUTO_SUGGEST_DISABLED='disabled';
AutoSuggest.AUTO_SUGGEST_CONTAINER=AUTO_SUGGEST_CONTAINER='AUTO_SUGGEST_CONTAINER';
AutoSuggest.AS_SELECT_ITEM_EVENT=AS_SELECT_ITEM_EVENT='AutoSuggestSelectItem';
AutoSuggest.CLEAR_ICON_HIDDEN_CLASS='x-ghClearIconHidden';
var _cbdSelectedAutoSuggest;
AutoSuggest.prototype=
{
_triggerChangeEventOnBlur:function(){
return((this.labelInput.value!=this.oldLabelInputValue)&&(this.triggerChangeOnBlur));
},
_onBlurAction:function(e)
{
if(!this.isRowClicked&&this.isDropDownClicked)
{
this.labelInput.focus();
this.isDropDownClicked=false;
return;
}
this._resetDefaultText(e);
if(this.isTabPressed||!this.isSuggestionsOpen)
{
this._blur(e);
}
if(this.isRowClicked)
{
this.labelInput.focus();
this.isRowClicked=false;
}
if(this._triggerChangeEventOnBlur()){
this._executeValueChange();
}
this.oldLabelInputValue=this.labelInput.value;
},
_copyFloatingProtoDropdown:function(id, dropdownHolder)
{
var asCont=document.getElementById(AutoSuggest.AUTO_SUGGEST_CONTAINER),
origId,
origDropdown,
newDropdown;
if(asCont)
{
this._removeASDropdown(id+AutoSuggest.AUTO_SUGGEST_DROPDOWN_SUFFIX);
origId=id.replace(vg.comp.floatingHeadPrefix, '');
origDropdown=vg.html.getElements(asCont,{tagName:'div', attrName:'associatedParentId', attrValue:origId});
newDropdown=null;
if(origDropdown[0])
{
newDropdown=origDropdown[0].cloneNode(true);
newDropdown.id=vg.comp.floatingHeadPrefix+id;
dropdownHolder.appendChild(newDropdown);
}
return newDropdown;
}
return null;
},
_createAutoSugCont:function()
{
var asCont,
mainElement,
cssContainer,
id;
if(document.getElementById(AutoSuggest.AUTO_SUGGEST_CONTAINER))
{
asCont=document.getElementById(AutoSuggest.AUTO_SUGGEST_CONTAINER);
}
else
{
asCont=document.createElement('div');
asCont.setAttribute("id", AutoSuggest.AUTO_SUGGEST_CONTAINER);
mainElement=document.getElementById('body');
if(!mainElement)
{
mainElement=document.getElementById('cbd-main');
}
cssContainer=vg.html._cbdGetCSSContainer(this.viewNode);
cssContainer.appendChild(asCont);
}
this.dropdown.setAttribute("associatedParentId", this.viewNode.getAttribute('id'));
id=this.viewNode.getAttribute('id')+AutoSuggest.AUTO_SUGGEST_DROPDOWN_SUFFIX;
this._removeASDropdown(id);
asCont.appendChild(this.dropdown);
this.dropdown.style.zIndex="999";
},
_removeASDropdown:function(id)
{
var asCont=document.getElementById(AutoSuggest.AUTO_SUGGEST_CONTAINER),
i=0;
if(asCont&&document.getElementById(id))
{
for(i=0;i < asCont.childNodes.length;i++)
{
if(id==asCont.childNodes[i].getAttribute('id') )
{
asCont.removeChild(asCont.childNodes[i]);
}
}
}
},
_inputClick:function(e)
{
this.isTabPressed=false;
if(this.defaultText)
{
_cbdClearInputDefaultText(this.labelInput, this.defaultText, e);
}
this._showOrHideSuggestions(null, true);
cbd.adapter.fireEvent({
event:cbdcommon.gh.events.AutoSuggest.INPUT_CLICK_END,
node:this.labelInput
});
},
_ddMouseDown:function(e)
{
this.isDropDownClicked=true;
},
_ddMouseUp:function(e)
{
this.isDropDownClicked=false;
},
_resetDefaultText:function(e)
{
if(this.defaultText)
{
_cbdSetInputDefaultText(this.labelInput, this.defaultText);
}
},
_blur:function(e)
{
if(!this.disablePositioning )
{
this.hideSuggestions();
}
if(this.onBlurJS!=null)
{
vg.comp._execEventHandler(this.onBlurJS, this.viewNode);
}
},
_rowClick:function(e)
{
this.isRowClicked=true;
this.highlightedNodes=this._getSelectedEl(e);
this._selectRow(e);
},
_selectRow:function(e)
{
var rowInfo=this._getRowInfo(this.highlightedNodes);
if(rowInfo.value!="cbdDisabled"&&this.onSelect(rowInfo.value, rowInfo.label, this.viewNode.getAttribute("id")) )
{
this._setInputValues(rowInfo);
this.oldLabelInputValue=this.labelInput.value;
if(this._isHybrid())
{
this.isStatic=false;
}
this.hideSuggestions();
this.labelInput.focus();
}
},
_setInputValues:function(rowInfo, skipChange)
{
this.labelInput.value=vg.util.removeTags(rowInfo.label);
this.valueInput.value=vg.util.removeTags(rowInfo.value);
if(this.onValueChange!=null&&!skipChange)
{
this._executeValueChange();
}
},
_executeValueChange:function()
{
this.onValueChange(this.viewNode.getAttribute('id'), this.valueInput.value, this.labelInput.value, this.tableLoadQuery);
},
_getRowInfo:function(rowCells)
{
var row=vg.html.findAncestor(rowCells[0],{tagName:'tr'}),
rowInfo={label:""},
labelCell,
labelAttr,
valAttr;
rowInfo.label=row.getAttribute("label");
labelCell=rowCells[this.labelColumn];
if(labelCell&&!rowInfo.label)
{
labelAttr=labelCell.getAttribute("label");
if(labelAttr)
{
rowInfo.label=labelAttr;
}
else if(labelCell.innerText)
{
rowInfo.label=labelCell.innerText;
}
else if(labelCell.textContent)
{
rowInfo.label=labelCell.textContent;
}
}
rowInfo.value=row.getAttribute("value");
valAttr=labelCell?labelCell.getAttribute("value"):null;
if(valAttr&&!rowInfo.value)
{
rowInfo.value=valAttr;
}
return rowInfo;
},
_rowMouseOver:function(e)
{
this._addSelectedStyle(e);
},
_rowMouseOut:function(e)
{
this._removeSelectedStyle(e);
},
_keydown:function(e)
{
var key=jsCBDgetKey(jsCBDgetEvent(e));
if(key==9)
{
this.isTabPressed=true;
}
},
_keyup:function(e)
{
var key=jsCBDgetKey(jsCBDgetEvent(e)),
oldRow,
newRow,
nextRow,
prevRow,
spanIndex,
selectedCells,
selectedCell,
rowInfo,
optHeight,
optionY,
controller;
if(key==40||key==38||key==13||key==9||(this.selectableCellSpans&&(key==37||key==39)) )
{
if(jsCBDisVisibleElement(this.dropdown) )
{
if(key==9)
{
vg.html.stopEventPropagation(e);
}
else if(key==13)
{
if(this.highlightedNodes)
{
this._selectRow(e);
}
else if(typeof this.onInputEnter==="function")
{
this.onInputEnter(this.labelInput.value);
}
}
else if(key==40||key==38||key==37||key==39 )
{
vg.html.stopEventPropagation(e);
if(this.highlightedNodes&&this.highlightedNodes[0])
{
oldRow=this.highlightedNodes[0].parentNode;
this._removeSelectedStyle(this._getRowsCells(oldRow));
}
if(!oldRow)
{
newRow=this._getSuggestTableRows()[0];
}
else if(key==40 )
{
nextRow=vg.html.getSibling(oldRow,{tagName:"tr"}, "+");
newRow=nextRow?nextRow:oldRow;
}
else if(key==38 )
{
prevRow=vg.html.getSibling(oldRow,{tagName:"tr"}, "-");
newRow=prevRow?prevRow:oldRow;
}
else
{
newRow=oldRow;
spanIndex=this._getCellSpanIndex(this.currentCellCol);
spanIndex+=(key==39)?1:-1;
if(this.selectableCellSpans[spanIndex])
{
this.currentCellCol=this._getFirstCellOfSpan(spanIndex);
}
}
if(newRow )
{
selectedCells=this._getRowsCells(newRow);
if(this.selectableCellSpans )
{
selectedCell=selectedCells[this.currentCellCol]?selectedCells[this.currentCellCol]:selectedCells[0];
selectedCells=this._getSelectedEl(selectedCell);
}
rowInfo=this._getRowInfo(selectedCells);
this._setInputValues(rowInfo, true);
this._addSelectedStyle(selectedCells);
optHeight=vg.html.getObjHeight(newRow);
optionY=(optHeight*newRow.getAttribute('index'))+vg.html.getObjY(this.tableContainer);
vg.html.scrollIntoView(this.tableContainer, newRow, optHeight, optionY);
}
}
}
else if(key==13&&typeof this.onInputEnter==="function")
{
this.onInputEnter(this.labelInput.value);
}
}
else
{
controller=this;
clearTimeout(this.typingTimeout);
this.typingTimeout=setTimeout(function()
{
controller.valueInput.value="";
controller._showOrHideSuggestions(true);
}, 250);
}
this._toggleClearIcon();
},
_isHybrid:function()
{
return this.displayAsCombo&&!isEmpty(this.tableUrl);
},
_showOrHideSuggestions:function(searchForValue, inputClicked, comboClicked)
{
if(this._isHybrid())
{
if(!(inputClicked||comboClicked))
{
if(this._hasEnoughChars()&&this.isStatic)
{
this.isStatic=false;
}
else if(!this._hasEnoughChars()&&!this.isStatic)
{
this.isStatic=true;
this._getTable(null,"");
return;
}
}
}
if(comboClicked||(this.isStatic&&!this._isHybrid())||this._hasEnoughChars())
{
this.loadTable(null, searchForValue);
}
else
{
this.hideSuggestions();
}
},
loadTable:function(addlParams, searchForValue)
{
var controller=this;
if(this.isStatic)
{
if(controller._getSuggestTableRows().length > 0 )
{
controller._dropdownCreator();
}
else
{
controller.hideSuggestions();
}
return;
}
else if(!this._hasEnoughChars())
{
controller.hideSuggestions();
return;
}
controller._getTable(addlParams, searchForValue);
},
_getTable:function(addlParams, searchForValue)
{
var controller=this,
showDDFunc,
resultsTable,
resultsTableCompSpan,
resultsTableCompSpanId,
copiedResultsTableCompSpan,
copiedResultsTable,
jsonpConfig,
jsonpRequest;
if(controller.loading)
{
controller.pendingReq=true;
controller.addlParams=addlParams;
controller.searchForValue=searchForValue;
}
else
{
this.loading=true;
showDDFunc=function()
{
controller.loading=false;
if(controller._getSuggestTableRows().length > 0 )
{
controller._addRowListeners();
controller._dropdownCreator();
if(controller._isHybrid()&&!controller._hasEnoughChars())
{
controller.hideSuggestions();
}
}
else
{
controller.hideSuggestions();
}
if(controller.pendingReq)
{
controller.loadTable(controller.addlParams, controller.searchForValue);
controller.pendingReq=false;
}
controller.labelInput.focus();
};
if(this.resultsTableId)
{
resultsTable=document.getElementById(this.resultsTableId);
}
if(!resultsTable&&!isEmpty(this.tableUrl))
{
this.suggestionLoader=jsCBDloadContent(
this._getUrlWithParameters(addlParams),
this.tableContainer, 'replaceChildren',	showDDFunc	);
}
else if(resultsTable)
{
resultsTableCompSpan=vg.comp.getCompSpan(resultsTable);
resultsTableCompSpanId=resultsTableCompSpan.getAttribute("id");
this.tableContainer.innerHTML=resultsTableCompSpan.outerHTML;
copiedResultsTableCompSpan=this._getSuggestTableCompSpan();
copiedResultsTableCompSpan.setAttribute("id", resultsTableCompSpanId+"_"+this.viewNode.id);
copiedResultsTable=this._getSuggestTable();
copiedResultsTable.setAttribute("id", this.resultsTableId+"_"+this.viewNode.id);
showDDFunc();
}
else if(this.isJSONPSearch())
{
jsonpConfig={
on:
{
success:function(data)
{controller._invokeJSONPCallback(data);
controller._addDataTableStyles();
showDDFunc();
}
}
};
jsonpRequest={
url:this._getUrlWithParameters(addlParams),
config:jsonpConfig
};
vg.ajax._jsonp(jsonpRequest);
}
}
},
_addDataTableStyles:function()
{
"use strict";
var table=this._getSuggestTable();
if(table)
{
vg.html.addStyle("dataTable", table);
vg.html.addStyle("pad", table);
vg.html.addStyle("noBotPad", table);
table.cellPadding=0;
table.cellSpacing=0;
}
},
_invokeJSONPCallback:function(data)
{
"use strict";
var callbackFunction=cbdcommon.util.getObjectReference(this.restCallback);
if(callbackFunction)
{
this.tableContainer.innerHTML=callbackFunction(data);
}
},
isJSONPSearch:function()
{
"use strict";
return(this.restUrl&&this.restCallback);
},
_setDropdownDimensions:function()
{
cbd.adapter.fireEvent({
event:cbdcommon.gh.events.AutoSuggest.SET_DIMENSIONS_START,
node:this.dropdown
});
if(!this.disablePositioning )
{
this._setDropdownWidth();
this._setDropdownHeight();
}
},
_dropdownCreator:function()
{
this.showSuggestions();
this._setDropdownDimensions();
this._setDropdownPosition();
},
_getUrlWithParameters:function(addlParams)
{
var value=this._getSearchedValue(),
url;
this.tableLoadQuery=value;
value=encodeURIComponent(value);
if(this.isJSONPSearch())
{
url=jsCBDaddQueryStringParam(this.restUrl, "query", value);
}
else
{
url=jsCBDaddQueryStringParam(this.tableUrl, "cbdASId", this.viewNode.getAttribute("id"));
url=jsCBDaddQueryStringParam(url, "cbdASValue", value);
}
if(!isEmpty(addlParams))
{
url+="&"+addlParams;
}
return url;
},
_getSearchedValue:function()
{
var value=this.labelInput.value.replace(/[\%]/g, " ");
if(this.labelInput.value==this.labelInput.defaultText)
{
value="";
}
return value;
},
showSuggestions:function()
{
cbd.adapter.fireEvent({
event:cbdcommon.gh.events.AutoSuggest.SHOW_SUGGESTIONS_START,
node:this.labelInput
});
this.isSuggestionsOpen=true;
this.dropdown.style.display="block";
_cbdSelectedAutoSuggest=this;
this._preventBleedThru(this.fieldIDToHide, true);
},
hideSuggestions:function()
{
cbd.adapter.fireEvent({
event:cbdcommon.gh.events.AutoSuggest.HIDE_SUGGESTIONS_START,
node:this.labelInput
});
this._cancelSuggestions();
this.dropdown.style.display="none";
_cbdSelectedAutoSuggest=null;
if(this.highlightedNodes)
{
this._removeSelectedStyle(this.highlightedNodes);
this.currentCellCol=0;
}
this._preventBleedThru(this.fieldIDToHide, false);
this.isSuggestionsOpen=false;
},
_cancelSuggestions:function()
{
clearTimeout(this.typingTimeout);
if(this.suggestionLoader)
{
this.suggestionLoader.abort();
this.loading=false;
}
},
_preventBleedThru:function(elemIDs, isHideElem)
{
if(ie6_proper||ie5)
{
if(elemIDs==null||elemIDs=="" )
{
return;
}
var list=elemIDs.split(","),
listLength=list.length,
x=0,
id;
for(x=0;x < listLength;x++)
{
id=list[x];
if(isHideElem)
{
jsCBDsetVisibility(id,false);
}
else
{
jsCBDsetVisibility(id,true);
}
}
}
},
_hasEnoughChars:function()
{
var inputValueNotEqualToDefaultText=(this.labelInput.value!=this.defaultText),
inputLengthGreateEqualToCharsToTrigger=(this.labelInput.value.length >=this.numCharsToTrigger);
return((inputValueNotEqualToDefaultText||this.ignoreDefaultTextCheckOnCharCount)&&inputLengthGreateEqualToCharsToTrigger);
},
_addSelectedStyle:function(e)
{
this._addOrRemoveSelectedStyle(e, true);
},
_removeSelectedStyle:function(e)
{
this._addOrRemoveSelectedStyle(e, false);
},
_addOrRemoveSelectedStyle:function(e, addOrRemove)
{
var selectedEls=e.length?e:this._getSelectedEl(e),
selectedEl,
length,
i;
if(addOrRemove)
{
if(this.highlightedNodes)
{
length=this.highlightedNodes.length;
for(i=0;i < length;i++)
{
selectedEl=this.highlightedNodes[i];
vg.html.removeStyle(AutoSuggest.AUTO_SUGGEST_SELECTED, selectedEl);
}
}
this.highlightedNodes=selectedEls;
}
else if(this.highlightedNodes===selectedEls)
{
this.highlightedNodes=null;
}
length=selectedEls.length;
for(i=0;i < length;i++)
{
selectedEl=selectedEls[i];
vg.html.addOrRemoveStyle(AutoSuggest.AUTO_SUGGEST_SELECTED, selectedEl, addOrRemove);
}
},
_getSelectedEl:function(e)
{
var eNode=e.tagName?e:jsCBDgetEventNode(e),
selectedRow;
if(this.selectableCellSpans )
{
return this._getSelectedCells(eNode);
}
selectedRow=vg.html.findAncestor(eNode,{tagName:'tr'});
return this._getRowsCells(selectedRow);
},
_getRowsCells:function(row)
{
return vg.html.getElements(row,{tagName:'td'});
},
_getSelectedCells:function(node)
{
var selectedCells=[],
selectedCell=(node.tagName.toLowerCase()=='td')?node:vg.html.findAncestor(node,{tagName:'td'}),
cellSiblings=vg.html.getElements(selectedCell.parentNode,{tagName:'td'}),
cellIndex=0,
selectedIndex=selectedCell.cellIndex,
spanOfCells,
i, j;
for(i=0;i < this.selectableCellSpans.length;i++)
{
spanOfCells=this.selectableCellSpans[i];
if(selectedIndex < spanOfCells+cellIndex )
{
this.currentCellCol=cellIndex;
for(j=cellIndex;j < cellIndex+spanOfCells;j++)
{
if(cellSiblings[j])
{
selectedCells.push(cellSiblings[j]);
}
}
return selectedCells;
}
cellIndex+=spanOfCells;
}
return selectedCells;
},
_getCellSpanIndex:function(column)
{
var cellIndex=0,
spanOfCells,
i;
for(i=0;i < this.selectableCellSpans.length;i++)
{
spanOfCells=this.selectableCellSpans[i];
if(column < spanOfCells+cellIndex )
{
return i;
}
cellIndex+=spanOfCells;
}
return 0;
},
_getFirstCellOfSpan:function(spanIndex)
{
var column=0,
i;
if(this.selectableCellSpans[spanIndex])
{
for(i=0;i < spanIndex;i++)
{
column+=this.selectableCellSpans[i];
}
return column;
}
return 0;
},
_initRespConfig:function()
{
if(this.respConfig )
{
this.respConfig.small=this.respConfig.small||{};
this.respConfig.medium=this.respConfig.medium||{};
this.respConfig.large=this.respConfig.large||{};
this.respConfig.inline=this.respConfig.inline||{};
}
},
_setRespWidth:function(size)
{
if(this.respConfig )
{
if(!size)
{
size=cbdcommon.screen.getMediaQuerySize();
}
if(this.respConfig[size].inputWidth )
{
this.labelInput.style.width=this.respConfig[size].inputWidth;
}
else{
if(this.respConfig.inline.inputWidth )
{
this.labelInput.style.width=this.respConfig.inline.inputWidth;
}
else{
this.labelInput.style.width="";
}
}
}
},
_saveInlineWidth:function()
{
if(this.respConfig&&this.labelInput.style.width )
{
this.respConfig.inline.inputWidth=this.labelInput.style.width;
}
},
_setDropdownWidth:function()
{
var table=this._getSuggestTable(),
padding=this.dropdownPadding,
tableWidth,
breakpoint,
newWidth;
if(table)
{
vg.html.setWidth(this.dropdown, 'auto');
tableWidth=vg.html.getObjWidth(table);
if(tableWidth&&tableWidth > 0)
{
tableWidth+=(padding+this.dropdownBorder );
vg.html.setWidth(this.dropdown, tableWidth+'px');
if(cbd.page.isResponsiveCapable===true&&this.respConfig )
{
breakpoint=cbdcommon.screen.getMediaQuerySize();
if(this.respConfig[breakpoint].dropdownWidth )
{
newWidth=((jsCBDgetScreenWidth()*this.respConfig[breakpoint].dropdownWidth.replace('%',''))/100) -(padding*2)+'px';
vg.html.setWidth(this.dropdown, newWidth );
}
}
}
}
},
_setDropdownHeight:function()
{
var table=this._getSuggestTable(),
tableHeight,
rows,
numRowsDisplayed,
i=0,
displayHeight=0,
dropDownWidth,
widthAdjustedForVerticalScroll,
dropDownContentDiv,
paddingTop,
paddingBottom;
if(table)
{
tableHeight=vg.html.getObjHeight(table);
rows=vg.html.getElements(table,{tagName:'tr'});
numRowsDisplayed=rows.length;
if(this.maxRowsBeforeScroll&&rows.length > this.maxRowsBeforeScroll)
{
numRowsDisplayed=this.maxRowsBeforeScroll;
}
for(i=0;i < numRowsDisplayed;i++)
{
displayHeight+=vg.html.getObjHeight(rows[i]);
}
if(tableHeight > displayHeight)
{
this.tableContainer.style.overflowY="auto";
this.scroll=true;
}
else
{
if(tableHeight < displayHeight)
{
displayHeight=tableHeight;
}
this.scroll=false;
}
vg.html.setHeight(this.tableContainer, displayHeight+"px");
if(ieQuirksMode)
{
vg.html.setHeight(this.dropdown,(displayHeight - 8)+"px");
}
dropDownWidth=vg.html.getObjWidth(this.dropdown);
if(this.scroll||safari||(!cbd.page.isNextGen&&firefox))
{
widthAdjustedForVerticalScroll=(dropDownWidth+cbdcommon.support.scrollbarWidth)+"px";
vg.html.setWidth(this.dropdown, widthAdjustedForVerticalScroll);
}
}
},
_setDropdownPosition:function()
{
if(!this.disablePositioning )
{
this.position=(this.position!="left")?"right":"left";
vg.html.position({elementNode:this.dropdown, targetNode:this.viewNode, dispLoc:"auto", horzPos:this.position});
}
},
_addRowListeners:function(e)
{
var controller=this,
rows=this._getSuggestTableRows(),
cells,
i;
for(i=0;i < rows.length;i++)
{
cells=this._getRowsCells(rows[i]);
if(this._getRowInfo(cells).value!="cbdDisabled")
{
vg.html.addEventListener(rows[i], 'mouseover',	function(e){controller._rowMouseOver(e);});
vg.html.addEventListener(rows[i], 'mouseout',	function(e){controller._rowMouseOut(e);});
vg.html.addEventListener(rows[i], 'mousedown',	function(e){controller._rowClick(e);});
}
}
},
_getSuggestTable:function()
{
var container=(this.isJSONPSearch())?this.tableContainer:this._getSuggestTableCompSpan();
return vg.html.getElements(container,{tagName:'table'})[0];
},
_getSuggestTableCompSpan:function()
{
return vg.html.getElements(this.dropdown,{tagName:'span', attrName:'type', attrValue:'DataTable'})[0];
},
_getSuggestTableRows:function()
{
return vg.html.getElements(this._getSuggestTable(),{tagName:'tr'});
},
_resetValue:function()
{
this.labelInput.value="";
this.valueInput.value="";
},
_hideClearIcon:function()
{
var cbdAdapter=cbd.adapter,
clearIconHiddenClass=AutoSuggest.CLEAR_ICON_HIDDEN_CLASS;
cbdAdapter.addClass(this.clearIcon,		clearIconHiddenClass);
cbdAdapter.addClass(this.labelInput,	clearIconHiddenClass);
},
_showClearIcon:function()
{
var cbdAdapter=cbd.adapter,
clearIconHiddenClass=AutoSuggest.CLEAR_ICON_HIDDEN_CLASS;
cbdAdapter.removeClass(this.clearIcon,	clearIconHiddenClass);
cbdAdapter.removeClass(this.labelInput,	clearIconHiddenClass);
},
_toggleClearIcon:function()
{
if(this.labelInput.value.length > 0 )
{
this._showClearIcon();
}
else
{
this._hideClearIcon();
}
},
_resetValueAndFocus:function()
{
this._resetValue();
this.labelInput.focus();
this._hideClearIcon();
if(this.disablePositioning )
{
this.hideSuggestions();
}
},
reset:function()
{
this._resetValue();
this._hideClearIcon();
this._resetDefaultText();
if(this.disablePositioning )
{
this.hideSuggestions();
}
}
};
AutoSuggest._allowKeyPress=function(element, event)
{
var as=vg.comp.getController(element);
if(as.highlightedNodes)
{
return jsCBDblockEnterKey(event);
}
};
AutoSuggest._showHideSuggestions=function(autoSuggestId, event)
{
var element=document.getElementById(autoSuggestId),
as=vg.comp.getController(element);
as.labelInput.focus();
as._showOrHideSuggestions(null, null, true);
};
jsCBDloadAutoSuggestTable=function(autoSuggestId, params)
{
var autoSuggest=vg.comp.getController(autoSuggestId);
if(autoSuggest)
{
autoSuggest.loadTable(params);
}
};
jsCBDcloseAutoSuggest=function(e)
{
if(_cbdSelectedAutoSuggest!=null)
{
if(e.type=='scroll')
{
_cbdSelectedAutoSuggest._blur();
}
else
{
var eNode=jsCBDgetEventNode(e),
clickedOnDropdown,
clickedInsideInput,
clickedInsideDropdown,
isScrollEvent;
if(eNode!=null)
{
clickedOnDropdown=eNode.className&&(eNode.className==AutoSuggest.AUTO_SUGGEST_DROPDOWN_CLASS);
clickedInsideInput=eNode.getAttribute('id')&&(eNode.getAttribute('id')==_cbdSelectedAutoSuggest.viewNode.getAttribute('id'));
clickedInsideDropdown=vg.html.findAncestor(eNode,{tagName:'div', attrName:'class', attrValue:AutoSuggest.AUTO_SUGGEST_DROPDOWN_CLASS})!=null;
isScrollEvent=_cbdIsScrollEvent(eNode.scrollTop, eNode.scrollLeft);
if(!clickedInsideInput&&!clickedInsideDropdown&&!clickedOnDropdown&&eNode.tagName!="HTML"&&!isScrollEvent)
{
_cbdSelectedAutoSuggest._blur();
}
}
}
}
};
jsCBDhideASDropDown=function(target )
{
var controller;
if(target ){
controller=vg.comp.getController(target);
}
else if(_cbdSelectedAutoSuggest ){
controller=_cbdSelectedAutoSuggest;
}
else
{
target=vg.html.getElements(document.getElementById('body'),{tagName:'input'}, function(node){return vg.html.hasStyle(ASINPUT_FOCUS_CLASS, node);})[0];
controller=vg.comp.getController(target);
}
if(controller ){
controller.hideSuggestions();
}
};
jsCBDresetAutoSuggest=function(id)
{
var autoSuggest=vg.comp.findController(id, false);
if(autoSuggest)
{
autoSuggest.reset();
}
};
jsCBDgetAutoSuggestSelection=function()
{
var activeElement=document.activeElement,
parentNode,
cursorInfo=null;
if(!activeElement)
{
return null;
}
parentNode=activeElement.parentNode;
if(!parentNode)
{
return null;
}
if(parentNode.getAttribute("type")==="AutoSuggestInput")
{
cursorInfo=vg.html.getSelection(activeElement);
cursorInfo.activeElement=activeElement;
}
return cursorInfo;
};
jsCBDsetAutoSuggestSelection=function(cursorInfo)
{
if(cursorInfo instanceof Object&&(typeof cursorInfo.start=='number')&&(typeof cursorInfo.end=='number')&&cursorInfo.activeElement)
{
vg.html.setSelection(cursorInfo.activeElement, cursorInfo.start, cursorInfo.end);
}
};
jsCBDsetAutoSuggestTableUrl=function(id, table )
{
var autoSuggest=vg.comp.findController(id, false);
if(autoSuggest)
{
autoSuggest.tableUrl=table;
}
};

