
(function(cbd, adapter)
{
'use strict';
var CHART_CONTAINER_CLASS='chartContainer',
SCROLL_CONTAINER_CLASS='scrollContainer',
TOOLTIP_MARKER_CONTAINER_CLASS='tooltipMarkerContainer',
SCROLL_INDICATOR_CLASS='scrollIndicator',
LEFT_INDICATOR_CLASS='leftScrollIndicator',
RIGHT_INDICATOR_CLASS='rightScrollIndicator',
HIDE_INDICATOR_CLASS='hideIndicator',
YAXIS_LABEL_DIV_ID='YAxisLabels',
DUAL_AXIS_LABEL_DIV_ID='DualAxisLabels',
DUAL_AXIS_TITLE_DIV_ID='dualAxisTitle',
AOD_LABEL_DIV_ID='aod',
DRAG_START_EVENT_ID='CHART_ON_DRAG_START',
DRAG_END_EVENT_ID='CHART_ON_DRAG_END',
TOOLTIP_EVENT_ID='TOOLTIP_EVENT_ID',
TOOLTIP_TOUCH_DRAG_EVENT_ID='TOOLTIP_TOUCH_DRAG_EVENT_ID',
TOOLTIP_TOUCH_LEAVE_EVENT_ID='TOOLTIP_TOUCH_LEAVE_EVENT_ID',
TOOLTIP_TOUCH_MOVE_EVENT_ID='TOOLTIP_TOUCH_MOVE_EVENT_ID',
TOOLTIP_MOUSE_LEAVE_EVENT_ID='TOOLTIP_MOUSE_LEAVE_EVENT_ID',
TOOLTIP_EXT_CLICK_EVENT_ID='TOOLTIP_EXT_CLICK_EVENT_ID',
TOOLTIP_EXT_SCROLL_EVENT_ID='TOOLTIP_EXT_SCROLL_EVENT_ID',
isTouchEnabled=!!('ontouchstart' in window),
isIEAnyVersion=(document.all)?true:false,
hasDuplicateCanvasBug=function()
{
return window.navigator.userAgent.indexOf('AppleWebKit/534.30') >=0;
},
repaintElement=function(elem)
{
setTimeout(function(){
if(elem)
{
elem.style.overflow='visible';
}
}, 0);
},
preventDefault=function(event)
{
if(event.preventDefault)
{
event.preventDefault();
}
else
{
event.returnValue=false;
}
},
isOutsideScrollDiv=function(divId, chartType, barType)
{
var isOutside=false;
if(chartType==='pieChart')
{
isOutside=true;
}
else if(divId===YAXIS_LABEL_DIV_ID||divId===DUAL_AXIS_LABEL_DIV_ID||divId===DUAL_AXIS_TITLE_DIV_ID)
{
isOutside=true;
}
else if(divId===AOD_LABEL_DIV_ID)
{
isOutside=true;
}
else if(divId.indexOf('legend') >=0)
{
isOutside=true;
}
else if(divId==='_error')
{
isOutside=true;
}
else if(barType==='point'||barType==='range')
{
isOutside=true;
}
return isOutside;
},
isOnRightSide=function(divId, position)
{
var onRight=false;
if(divId==='legend'&&position==='right')
{
onRight=true;
}
else if(divId===DUAL_AXIS_LABEL_DIV_ID)
{
onRight=true;
}
else if(divId===DUAL_AXIS_TITLE_DIV_ID)
{
onRight=true;
}
return onRight;
},
initializeExcanvasChildren=function(canvas)
{
var children=canvas.childNodes,
canvasWidth=canvas.width,
canvasHeight=canvas.height,
childIndex=children.length,
childNode;
while(childIndex--)
{
childNode=children[childIndex];
childNode.style.width=canvasWidth;
childNode.style.height=canvasHeight;
}
},
shouldChartScroll=function(controller)
{
var shouldScroll=false,
canvasWidth=adapter.getWidth(controller.canvas),
yAxisLabelWidth=controller.canvasOffset.left,
dualAxisLabelWidth=controller.canvasOffset.right,
chartWidth=yAxisLabelWidth+canvasWidth+dualAxisLabelWidth;
if(controller.availableContainerWidth > 0)
{
shouldScroll=controller.availableContainerWidth < chartWidth;
}
return shouldScroll;
},
setScrollContainerWidth=function(controller)
{
var scrollContainer=adapter.getAncestor({node:controller.canvas, tag:'div', cssClass:SCROLL_CONTAINER_CLASS}),
yAxisLabelWidth=controller.canvasOffset.left,
dualAxisLabelWidth=controller.canvasOffset.right,
calculateScrollWidth=controller.availableContainerWidth - yAxisLabelWidth - dualAxisLabelWidth;
if(calculateScrollWidth < 0)
{
scrollContainer.style.width='';
}
else
{
scrollContainer.style.width=calculateScrollWidth+'px';
}
},
divideHexColor=function(hexString, decimal)
{
var hex=parseInt(hexString, 16),
calculation=hex/decimal,
value=calculation > 255?255:calculation,
rounded=Math.round(value),
newString=rounded.toString(16);
while(newString.length < 2)
{
newString='0'+newString;
}
return newString;
},
getLighterColor=function(color, reduceBy)
{
var fraction=reduceBy||(5/8),
colorWithoutHash=color.replace('#', ''),
colorLength=colorWithoutHash.length,
red,
green,
blue;
if(colorLength===3)
{
red=colorWithoutHash.substring(0,1);
red+=red;
green=colorWithoutHash.substring(1,2);
green+=green;
blue=colorWithoutHash.substring(2,3);
blue+=blue;
}
else if(colorLength===6)
{
red=colorWithoutHash.substring(0,2);
green=colorWithoutHash.substring(2,4);
blue=colorWithoutHash.substring(4,6);
}
red=divideHexColor(red, fraction);
green=divideHexColor(green, fraction);
blue=divideHexColor(blue, fraction);
return '#'+red+green+blue;
},
getRadialGradientFill=function(ctx, color, gradient, xCenter, yCenter, radius)
{
var fill;
if(gradient)
{
fill=ctx.createRadialGradient(xCenter, yCenter, 0, xCenter, yCenter, radius);
fill.addColorStop(1, color);
if(gradient===true)
{
gradient=getLighterColor(color);
}
fill.addColorStop(0, gradient);
}
return fill;
};
cbd.ChartRenderer=function(id, parentId, chartType)
{
this.xFrame=0;
this.yFrame=0;
this.units=10;
this.bkclr='white';
this.lineclr='black';
this.linewidth=1;
this.linedotted=false;
this.labels={};
this.parentId=parentId;
this.id=id;
this.canvas=this._getCanvas();
this.alphablend=1.0;
this.chartType=chartType;
this.tooltipMarkerIndex=undefined;
this.isScrollingChart=false;
var chartContainer,
parentNode,
elemCanvas;
if(!this.canvas)
{
parentNode=document.getElementById(this.parentId);
if(parentNode)
{
chartContainer=document.createElement('div');
parentNode.appendChild(chartContainer);
elemCanvas=document.createElement('canvas');
elemCanvas.id=id;
this.canvas=elemCanvas;
chartContainer.appendChild(elemCanvas);
chartContainer=this.addChartStructure(this.chartType);
}
else
{
window.console.error('Cannot create canvas without target node' );
}
}
else
{
chartContainer=adapter.getAncestor({node:this.canvas, tag:'div', cssClass:'chartContainer'});
if(!chartContainer)
{
chartContainer=this.addChartStructure(this.chartType);
}
}
};
cbd.ChartRenderer.prototype=
{
_setDefVal:function(val,defval)
{
return(val!=null?val:defval);
},
_transformValue:function(value)
{
return value - this.canvasOffset.left;
},
_initDefaults:function()
{
this.hFrame=this.getHeight();
this.wFrame=this.getWidth();
this.xCenter=this.wFrame/2;
this.yCenter=this.hFrame/2;
this.radius=(Math.min(this.wFrame,this.hFrame)/2);
},
_getCanvas:function()
{
if(!this.canvas )
{
var parent=document.getElementById(this.parentId),
element;
if(parent)
{
return adapter.getElement({node:document.getElementById(this.id), tag:'canvas'});
}
else
{
element=document.getElementById(this.id);
return element;
}
}
return this.canvas;
},
_getContext:function()
{
var usingExcanvas=window.G_vmlCanvasManager,
canvas=this._getCanvas(),
context;
if(usingExcanvas&&!canvas.context_)
{
context=canvas.getContext('2d');
initializeExcanvasChildren(canvas);
}
else
{
context=canvas.getContext('2d');
}
return context;
},
_drawLine:function(xStart,yStart,xEnd,yEnd,linecolor,linewidth)
{
var ctx=this._getContext();
ctx.strokeStyle=linecolor;
ctx.lineWidth=linewidth;
if(linewidth%2)
{
xStart=Math.round(xStart)+0.5;
yStart=Math.round(yStart)+0.5;
xEnd=Math.round(xEnd)+0.5;
yEnd=Math.round(yEnd)+0.5;
}
ctx.beginPath();
ctx.moveTo(xStart,yStart);
ctx.lineTo(xEnd,yEnd);
ctx.stroke();
ctx.closePath();
},
_fillPattern:function(xStart,yEnd,width,height,patternClr)
{
var patternWidth=6,
yStart,
xEnd,
curY,
curX,
lineWidth,
lastY,
isAboveHeight,
isPastWidth,
x1, y1, x2, y2;
if(height < 0 )
{
yStart=yEnd - 1;
yEnd=yEnd+height+1;
}
else
{
yStart=yEnd+height - 1;
yEnd+=1;
}
xEnd=xStart+width - 2;
xStart+=1;
curY=yStart - patternWidth;
curX=xStart+patternWidth;
lineWidth=patternWidth/3;
lastY=yEnd -(width - 1);
while(curY > lastY)
{
isAboveHeight=curY < yEnd;
isPastWidth=curX > xEnd;
x1=isAboveHeight?xStart+(yEnd-curY):xStart;
y1=isAboveHeight?yEnd:curY;
x2=isPastWidth?xEnd:curX;
y2=isPastWidth?yStart -(curX-xEnd):yStart;
this._drawLine(x1,y1,x2,y2,patternClr,lineWidth);
curY -=patternWidth;
curX+=patternWidth;
}
},
initialize:function(id, width, canvasOffset, height, cssClass)
{
var usingExcanvas=window.G_vmlCanvasManager,
elemCanvas=this._getCanvas(),
canvasContainer,
chartContainer,
scrollContainer;
canvasContainer=elemCanvas.parentNode;
chartContainer=adapter.getAncestor({node:elemCanvas, tag:'div', cssClass:CHART_CONTAINER_CLASS});
scrollContainer=adapter.getAncestor({node:elemCanvas, tag:'div', cssClass:SCROLL_CONTAINER_CLASS});
this.availableContainerWidth=adapter.getWidth(chartContainer);
if(cssClass)
{
chartContainer.className=cssClass+' chartContainer';
}
else
{
chartContainer.className='chartContainer';
}
if(chartContainer.style.cssText.toLowerCase().indexOf('width') < 0 )
{
width=parseInt(width, 10);
chartContainer.style.cssText='width:'+(width+canvasOffset.left)+'px;height:'+height+'px;';
}
canvasContainer.style.lineHeight=0;
elemCanvas.removeAttribute('style');
elemCanvas.width=width.toString();
elemCanvas.height=height.toString();
if(usingExcanvas)
{
initializeExcanvasChildren(elemCanvas);
}
if(scrollContainer)
{
scrollContainer.style.left=canvasOffset.left+'px';
}
if(hasDuplicateCanvasBug())
{
repaintElement();
}
this.canvas=elemCanvas;
this.chartContainer=chartContainer;
this.scrollContainer=scrollContainer;
this.canvasOffset=canvasOffset;
if(window.G_vmlCanvasManager)
{
if(!document.namespaces.g_vml_)
{
G_vmlCanvasManager.init_(document);
}
else if(this.canvas.tagName.toUpperCase()==='CANVAS')
{
window.G_vmlCanvasManager.initElement(this.canvas);
}
this.isExcanvas=true;
}
this._initDefaults();
},
setError:function(set)
{
var chartContainer=this.chartContainer;
if(this.chartContainer)
{
if(set)
{
chartContainer.className+=' error';
}
else
{
chartContainer.className=chartContainer.className.replace(' error', '');
}
}
},
addChartStructure:function(chartType)
{
var chartContainer=this.canvas.parentNode,
canvasContainer=document.createElement('div'),
scrollContainer,
container;
adapter.addClass(chartContainer, 'chartContainer '+chartType);
canvasContainer.appendChild(this.canvas);
if(chartType==='gridChart')
{
scrollContainer=document.createElement('div');
adapter.addClass(scrollContainer, 'scrollContainer');
scrollContainer.appendChild(canvasContainer);
container=scrollContainer;
}
else
{
container=canvasContainer;
}
chartContainer.appendChild(container);
return chartContainer;
},
enableScrolling:function()
{
var canvasElement=this.canvas,
chartContainer=adapter.getAncestor({node:canvasElement, tag:'div', cssClass:CHART_CONTAINER_CLASS}),
scrollContainer=adapter.getAncestor({node:canvasElement, tag:'div', cssClass:SCROLL_CONTAINER_CLASS}),
canvasWidth=adapter.getWidth(canvasElement),
yAxisLabelWidth=this.canvasOffset.left,
shouldScroll=shouldChartScroll(this),
scrollIndicatorDivs,
i;
if(shouldScroll)
{
adapter.addClass(scrollContainer, 'scroll');
this.scrollData=this.scrollData||{};
setScrollContainerWidth(this);
adapter.addEventListener({node:scrollContainer, event:adapter.getEventName('START_DRAG'), controller:this, func:'onDragStart' , id:DRAG_START_EVENT_ID});
adapter.addEventListener({node:scrollContainer, event:adapter.getEventName('END_DRAG'), controller:this, func:'onDragEnd' , id:DRAG_END_EVENT_ID});
scrollIndicatorDivs=adapter.getElements({node:chartContainer, tag:'div', cssClass:SCROLL_INDICATOR_CLASS});
if(scrollIndicatorDivs.length===0)
{
this._createScrollIndicators(chartContainer, yAxisLabelWidth);
}
this.scrollData.leftScrollIndicator=adapter.getElement({node:this.chartContainer, tag:'div', cssClass:LEFT_INDICATOR_CLASS});
this.scrollData.rightScrollIndicator=adapter.getElement({node:this.chartContainer, tag:'div', cssClass:RIGHT_INDICATOR_CLASS});
this._toggleScrollIndicators();
this.isScrollingChart=true;
}
else
{
adapter.removeClass(scrollContainer, 'scroll');
scrollContainer.style.width=canvasWidth+'px';
scrollIndicatorDivs=adapter.getElements({node:chartContainer, tag:'div', cssClass:SCROLL_INDICATOR_CLASS});
i=scrollIndicatorDivs.length;
while(i--)
{
adapter.addClass(scrollIndicatorDivs[i], HIDE_INDICATOR_CLASS);
}
}
},
_createScrollIndicators:function(chartContainer, yAxisLabelWidth)
{
var leftScrollIndicator,
rightScrollIndicator,
chartHeight=this.hFrame+'px';
leftScrollIndicator=document.createElement('div');
adapter.addClass(leftScrollIndicator, SCROLL_INDICATOR_CLASS+' '+LEFT_INDICATOR_CLASS);
leftScrollIndicator.style.height=chartHeight;
leftScrollIndicator.style.left=yAxisLabelWidth+'px';
chartContainer.appendChild(leftScrollIndicator);
rightScrollIndicator=document.createElement('div');
adapter.addClass(rightScrollIndicator, SCROLL_INDICATOR_CLASS+' '+RIGHT_INDICATOR_CLASS);
rightScrollIndicator.style.height=chartHeight;
rightScrollIndicator.style.right=this.canvasOffset.right+'px';
chartContainer.appendChild(rightScrollIndicator);
},
_toggleScrollIndicators:function()
{
var scrollContainer=this.scrollContainer,
leftScrollIndicator=this.scrollData.leftScrollIndicator,
rightScrollIndicator=this.scrollData.rightScrollIndicator,
scrollMax=scrollContainer.scrollWidth - scrollContainer.clientWidth,
scrollPosition=scrollContainer.scrollLeft;
if(scrollPosition > 0)
{
adapter.removeClass(leftScrollIndicator, HIDE_INDICATOR_CLASS);
}
else
{
adapter.addClass(leftScrollIndicator, HIDE_INDICATOR_CLASS);
}
if(scrollPosition < scrollMax)
{
adapter.removeClass(rightScrollIndicator, HIDE_INDICATOR_CLASS);
}
else
{
adapter.addClass(rightScrollIndicator, HIDE_INDICATOR_CLASS);
}
},
onDragStart:function(event)
{
var scrollData=this.scrollData,
touchStart=adapter.getEventPosition(event);
scrollData.touchstartX=touchStart.x;
scrollData.touchstartY=touchStart.y;
scrollData.dragHorizontal=false;
scrollData.previousXPosition=touchStart.x;
adapter.addEventListener({node:this.scrollContainer, event:adapter.getEventName('GESTURE_MOVE'), controller:this, func:'onDragMove' , id:'CHART_ON_DRAG_MOVE'});
},
onDragMove:function(event)
{
var scrollData=this.scrollData,
scrollContainer=this.scrollContainer,
currentPosition=adapter.getEventPosition(event),
currentXPosition=currentPosition.x,
currentYPosition=currentPosition.y,
distanceX=Math.abs(currentXPosition - scrollData.touchstartX),
distanceY=Math.abs(currentYPosition - scrollData.touchstartY),
gestureThreshold=15,
scrollDistance;
if(distanceX < gestureThreshold&&distanceY < gestureThreshold)
{
scrollData.dragHorizontal=distanceX > distanceY;
}
if(scrollData.dragHorizontal)
{
preventDefault(event);
scrollDistance=scrollData.previousXPosition - currentXPosition;
scrollContainer.scrollLeft+=scrollDistance;
scrollData.previousXPosition=currentXPosition;
this._toggleScrollIndicators();
}
},
onDragEnd:function(event)
{
adapter.removeEventListener({node:this.scrollContainer, event:adapter.getEventName('GESTURE_MOVE'), id:'CHART_ON_DRAG_MOVE'});
},
adjustValueForScrolling:function(value)
{
return this._transformValue(value) - this.scrollContainer.scrollLeft;
},
setOptions:function(opts)
{
if(opts)
{
adapter.attach(this, opts );
}
},
getHeight:function()
{
return this._getCanvas().height;
},
getWidth:function()
{
return this._getCanvas().width;
},
getEventPosition:function(ev)
{
var virtualEventPosition,
canvasEventPosition,
containerEventPosition=adapter.getRelativeEventPos(ev, this.chartContainer);
if(this.scrollContainer&&adapter.getWidth(this.scrollContainer)===0)
{
setScrollContainerWidth(this);
}
if(containerEventPosition.x < this.canvasOffset.left)
{
virtualEventPosition=containerEventPosition;
}
else if(this.scrollContainer&&(containerEventPosition.x > this.canvasOffset.left+adapter.getWidth(this.scrollContainer)) )
{
containerEventPosition.x+=this.getWidth();
virtualEventPosition=containerEventPosition;
}
else
{
canvasEventPosition=adapter.getRelativeEventPos(ev, this._getCanvas());
canvasEventPosition.x+=this.canvasOffset.left;
virtualEventPosition=canvasEventPosition;
}
return virtualEventPosition;
},
getChartBoundary:function(minPix, maxPix)
{
var boundary={};
boundary.bottom=minPix.y;
boundary.left=minPix.x;
boundary.top=maxPix.y+1;
boundary.right=boundary.left+this.scrollContainer.clientWidth;
return boundary;
},
drawRect:function(opts)
{
var xStart=this._setDefVal(opts.xStart,this.xFrame),
width=this._setDefVal(opts.width,this.wFrame),
yStart=this._setDefVal(opts.yStart,this.yFrame),
height=this._setDefVal(opts.height,this.hFrame),
bkcolor=this._setDefVal(opts.bkcolor,this.bkcolor),
bordercolor=this._setDefVal(opts.bordercolor,null),
borderwidth=this._setDefVal(opts.borderwidth,1),
ctx=this._getContext();
xStart=this._transformValue(xStart);
ctx.beginPath();
ctx.fillStyle=bkcolor;
ctx.lineWidth=borderwidth;
ctx.fillRect(xStart,yStart,width,height);
ctx.closePath();
if(bordercolor!=null)
{
this._drawLine(xStart,yStart,xStart+width,yStart,bordercolor,borderwidth);
this._drawLine(xStart+width,yStart,xStart+width,yStart+height,bordercolor,borderwidth);
this._drawLine(xStart+width,yStart+height,xStart,yStart+height,bordercolor,borderwidth);
this._drawLine(xStart,yStart+height,xStart,yStart,bordercolor,borderwidth);
}
},
drawHorizBar:function(opts)
{
var ctx=this._getContext(),
xStart=this._setDefVal(opts.xStart,0),
yStart=this._setDefVal(opts.yStart,0),
width=this._setDefVal(opts.width,0),
height=this._setDefVal(opts.height,0),
barclr=this._setDefVal(opts.clr,'green');
xStart=this._transformValue(xStart);
ctx.beginPath();
ctx.fillStyle=barclr;
ctx.fillRect(xStart,yStart-height,width,height);
ctx.closePath();
},
drawVertBar:function(opts)
{
var ctx=this._getContext(),
xStart=Math.floor(this._setDefVal(opts.xStart,0)+this.xFrame),
yStart=this._setDefVal(opts.yStart,0),
width=this._setDefVal(opts.width,0),
height=this._setDefVal(opts.height,10),
barclr=this._setDefVal(opts.clr,'green'),
borderclr=this._setDefVal(opts.borderclr,''),
patternClr,
xEnd,
yEnd;
xStart=this._transformValue(xStart);
if(barclr.pattern)
{
patternClr=barclr.pattern[1];
barclr=barclr.pattern[0];
}
ctx.beginPath();
ctx.fillStyle=barclr;
xEnd=xStart+width;
yEnd=yStart-height;
ctx.fillRect(xStart,yEnd,width,height);
if(borderclr)
{
this._drawLine(xStart,yStart,xStart,yEnd,borderclr,1);
this._drawLine(xEnd,yStart,xEnd,yEnd,borderclr,1);
}
if(patternClr&&height > 0&&width > 0)
{
this._fillPattern(xStart,yEnd,width,height,patternClr);
}
ctx.closePath();
},
drawDottedGridLine:function(opts)
{
var xStart=this._setDefVal(opts.xStart, 0)/100*this.wFrame,
yStart=this._setDefVal(opts.yStart, 0)/100*this.hFrame,
xEnd=this._setDefVal(opts.xEnd, 100)/100*this.wFrame,
yEnd=this._setDefVal(opts.yEnd, 100)/100*this.hFrame,
color=this._setDefVal(opts.color, '#CCC'),
lineWidth=this._setDefVal(opts.lineWidth, 1),
dashSize=this._setDefVal(opts.dashSize,[3, 2]),
lineDashOffset=this._setDefVal(opts.lineOffset, 2),
ctx=this._getContext(),
temp=ctx.lineDashOffset;
ctx.lineDashOffset=lineDashOffset;
switch(opts.orientation)
{
case 'vertical':
yStart+=10;
yEnd -=30;
break;
case 'horizontal':
default:
break;
}
if(ctx.setLineDash)
{
ctx.setLineDash(dashSize);
this._drawLine(xStart, yStart, xEnd, yEnd, color, lineWidth);
ctx.setLineDash([]);
}
else
{
this._drawDottedLineHelper({
xStart:xStart,
yStart:yStart,
xEnd:xEnd,
yEnd:yEnd,
dashArray:dashSize,
color:color,
lineWidth:lineWidth
});
}
ctx.lineDashOffset=temp;
},
_drawDottedLineHelper:function(opts){
var ctx=this._getContext(),
x=opts.xStart,
y=opts.yStart,
x2=opts.xEnd,
y2=opts.yEnd,
dashArray=opts.dashArray,
color=opts.color,
lineWidth=opts.lineWidth,
dx=(x2-x),
dy=(y2-y),
slope=dx?dy/dx:1e15,
distRemaining=Math.sqrt(dx*dx+dy*dy ),
dashIndex=0,
draw=true, dashLength=0.001,
dashCount, xStep;
if(!dashArray){
dashArray=[3,2];
}
dashCount=dashArray.length;
ctx.strokeStyle=color;
ctx.lineWidth=lineWidth;
ctx.beginPath();
ctx.moveTo(x, y);
while(distRemaining>=0.1){
dashLength=dashArray[dashIndex++%dashCount];
if(dashLength > distRemaining){
dashLength=distRemaining;
}
xStep=Math.sqrt(dashLength*dashLength/(1+slope*slope) );
if(dx<0){
xStep=-xStep;
}
x+=xStep;
y+=slope*xStep;
ctx[draw?'lineTo':'moveTo'](x,y);
distRemaining -=dashLength;
draw=!draw;
}
ctx.stroke();
ctx.closePath();
},
drawGrid:function(opts)
{
var ctx=this._getContext(),
gridbkclr=this._setDefVal(opts.bkclr,'gray'),
gridlinedotted=this._setDefVal(opts.linedotted,false),
gridlineclr=this._setDefVal(opts.lineclr,'black'),
gridhoriz=opts.horiz,
gridlinewidth=this._setDefVal(opts.linewidth,1),
gridvert=opts.vert,
i;
ctx.strokeStyle=gridbkclr;
ctx.lineWidth=gridlinewidth;
ctx.beginPath();
ctx.fillStyle=this.bkclr;
ctx.fillRect(0,0,this.getWidth(),this.getHeight());
ctx.closePath();
ctx.beginPath();
ctx.fillStyle=gridbkclr;
ctx.fillRect(this.xFrame,this.yFrame,this.wFrame,this.hFrame);
ctx.closePath();
if(gridvert)
{
for(i=this.wBar;i < this.wFrame+this.xFrame;i+=this.wBar)
{
this.drawGridLine({xStart:i+this.xFrame,xEnd:i+this.xFrame,yStart:this.yFrame,yEnd:this.hFrame,
lineclr:gridlineclr,linewidth:gridlinewidth,linedotted:gridlinedotted});
}
}
if(gridhoriz)
{
for(i=this.hFrame;i > this.yFrame;i -=this.wBar)
{
this.drawGridLine({xStart:this.xFrame,xEnd:this.wFrame,yStart:i+this.yFrame,yEnd:i+this.yFrame,
lineclr:gridlineclr,linewidth:gridlinewidth,linedotted:gridlinedotted});
}
}
},
drawGridXAxis:function(opts)
{
var xStart=this._setDefVal(opts.xStart,0),
xEnd=this._setDefVal(opts.xEnd,this.wFrame),
y=this._setDefVal(opts.y,this.hFrame),
linecolor=this._setDefVal(opts.lineclr,this.lineclr),
linewidth=this._setDefVal(opts.linewidth,this.linewidth);
xStart=this._transformValue(xStart);
xEnd=this._transformValue(xEnd);
this._drawLine(xStart,y,xEnd,y,linecolor,linewidth);
},
drawGridYAxis:function(opts)
{
var yStart=this._setDefVal(opts.yStart,0),
yEnd=this._setDefVal(opts.yEnd,this.hFrame),
x=this._setDefVal(opts.x,this.wFrame),
linecolor=this._setDefVal(opts.lineclr,this.lineclr),
linewidth=this._setDefVal(opts.linewidth,this.linewidth);
x=this._transformValue(x);
this._drawLine(x,yStart,x,yEnd,linecolor,linewidth);
},
drawGridLine:function(opts)
{
var xStart=this._setDefVal(opts.xStart,0),
xEnd=this._setDefVal(opts.xEnd,0),
yStart=this._setDefVal(opts.yStart,0),
yEnd=this._setDefVal(opts.yEnd,0),
linedotted=this._setDefVal(opts.linedotted,false),
linecolor=this._setDefVal(opts.lineclr,this.lineclr),
linewidth=this._setDefVal(opts.linewidth,1),
isHoriz=(xStart!==xEnd),
j;
xStart=this._transformValue(xStart);
xEnd=this._transformValue(xEnd);
if(isHoriz)
{
for(j=xStart;j < xEnd;j+=(linedotted?2:xEnd))
{
this._drawLine(j,yStart,(linedotted?j+1:xEnd),yStart,linecolor,linewidth);
}
}
else
{
for(j=yStart;j < yEnd;j+=(linedotted?2:yEnd))
{
this._drawLine(xStart,j,xStart,(linedotted?j+1:yEnd),linecolor,linewidth);
}
}
},
drawTick:function(opts)
{
var xStart=this._setDefVal(opts.xStart,0),
xEnd=this._setDefVal(opts.xEnd,this.wFrame),
yStart=this._setDefVal(opts.yStart,0),
yEnd=this._setDefVal(opts.yEnd,this.hFrame),
linecolor=this._setDefVal(opts.lineclr,this.lineclr),
linewidth=this._setDefVal(opts.linewidth,this.linewidth);
xStart=this._transformValue(xStart);
xEnd=this._transformValue(xEnd);
this._drawLine(xStart,yStart,xEnd,yEnd,linecolor,linewidth);
},
drawPieBorder:function(opts)
{
var radius=this._setDefVal(opts.radius,this.radius),
xCenter=this._setDefVal(opts.xCenter,this.xCenter),
yCenter=this._setDefVal(opts.yCenter,this.yCenter),
bkcolor=this._setDefVal(opts.bkclr,this.bkclr),
linecolor=this._setDefVal(opts.lineclr,this.lineclr),
linewidth=this._setDefVal(opts.linewidth,this.linewidth),
gradient=this._setDefVal(opts.gradient, null),
gradientColor,
ctx=this._getContext();
ctx.beginPath();
ctx.arc(xCenter,yCenter,radius,0,Math.PI*2,true);
ctx.closePath();
ctx.lineWidth=linewidth;
gradientColor=getRadialGradientFill(ctx, bkcolor, gradient, xCenter, yCenter, radius);
ctx.fillStyle=gradientColor||bkcolor;
ctx.strokeStyle=linecolor;
ctx.stroke();
ctx.fill();
},
drawPieSlice:function(opts)
{
var radius=this._setDefVal(opts.radius,this.radius),
xCenter=this._setDefVal(opts.xCenter,this.xCenter),
yCenter=this._setDefVal(opts.yCenter,this.yCenter),
color=this._setDefVal(opts.clr,this.bkclr),
gradient=this._setDefVal(opts.gradient, null),
gradientColor,
linecolor=this._setDefVal(opts.lineclr,this.lineclr),
linewidth=this._setDefVal(opts.linewidth,this.linewidth),
degBegin=this._setDefVal(opts.degBegin,0),
degEnd=this._setDefVal(opts.degEnd,120),
ccWise=this._setDefVal(opts.counterClockwise,false),
beg, end, radBegin, radEnd, ctx, linex, liney;
if(ccWise)
{
beg=degBegin;
end=degEnd;
degBegin=360-end;
degEnd=360-beg;
}
radBegin=(degBegin+270)*Math.PI/180;
radEnd=(degEnd+270)*Math.PI/180;
radius -=(linewidth/2);
ctx=this._getContext();
ctx.beginPath();
ctx.moveTo(xCenter,yCenter);
ctx.lineWidth=0;
ctx.arc(
xCenter,
yCenter,
radius,
radBegin,
radEnd,
false
);
ctx.closePath();
gradientColor=getRadialGradientFill(ctx, color, gradient, xCenter, yCenter, radius);
ctx.fillStyle=gradientColor||color;
ctx.fill();
if(linewidth > 0)
{
ctx.strokeStyle=linecolor;
ctx.lineWidth=linewidth;
linex=xCenter+(radius*Math.cos(radEnd));
liney=yCenter+(radius*Math.sin(radEnd));
ctx.moveTo(xCenter,yCenter);
ctx.lineTo(linex,liney);
ctx.stroke();
}
},
drawArc:function(opts)
{
var radius=this._setDefVal(opts.radius,this.innerRadius),
xCenter=this._setDefVal(opts.xCenter,this.xCenter),
yCenter=this._setDefVal(opts.yCenter,this.yCenter),
color=this._setDefVal(opts.fillColor,this.bkclr),
lineWidth=this._setDefVal(opts.lineWidth, 0),
degBegin=this._setDefVal(opts.degBegin,0),
degEnd=this._setDefVal(opts.degEnd,360),
radBegin=(degBegin)*Math.PI/180,
radEnd=(degEnd)*Math.PI/180,
ctx=this._getContext();
xCenter=this._transformValue(xCenter);
ctx.beginPath();
ctx.moveTo(xCenter,yCenter);
ctx.lineWidth=lineWidth;
ctx.arc(
xCenter,
yCenter,
radius,
radBegin,
radEnd/2,
false
);
ctx.arc(
xCenter,
yCenter,
radius,
radEnd/2,
radEnd,
false
);
ctx.closePath();
ctx.fillStyle=color;
ctx.fill();
},
drawBox:function(opts)
{
var diagonalLength=this._setDefVal(opts.diagonalLength, this.diagonalLength),
xCenter=this._setDefVal(opts.xCenter, this.xCenter),
yCenter=this._setDefVal(opts.yCenter, this.yCenter),
lineColor=this._setDefVal(opts.lineColor, this.lineclr),
lineWidth=this._setDefVal(opts.lineWidth, this.linewidth),
fillColor=this._setDefVal(opts.fillColor, this.bkclr),
ctx=this._getContext(),
radius=diagonalLength/2;
xCenter=this._transformValue(xCenter);
ctx.beginPath();
ctx.moveTo(xCenter, yCenter+radius);
ctx.lineTo(xCenter+radius, yCenter);
ctx.lineTo(xCenter, yCenter - radius);
ctx.lineTo(xCenter - radius, yCenter);
ctx.lineWidth=lineWidth;
ctx.strokeStyle=lineColor;
ctx.fillStyle=fillColor;
ctx.closePath();
ctx.fill();
ctx.stroke();
},
drawLineSegment:function(opts)
{
var xStart=this._setDefVal(opts.xStart,0),
yStart=this._setDefVal(opts.yStart,0),
xEnd=this._setDefVal(opts.xEnd,100),
yEnd=this._setDefVal(opts.yEnd,100),
yFill=this._setDefVal(opts.yFill,this.hFrame),
linecolor=this._setDefVal(opts.lineclr,this.lineclr),
linewidth=this._setDefVal(opts.linewidth,this.linewidth),
fillclr=this._setDefVal(opts.fillclr,this.fillclr),
alphablend=this._setDefVal(opts.alphablend,this.alphablend),
ctx=this._getContext();
if(fillclr)
{
ctx.beginPath();
ctx.save();
ctx.globalAlpha=alphablend;
ctx.strokeStyle=fillclr;
ctx.fillStyle=fillclr;
ctx.moveTo(xStart,yStart);
ctx.lineTo(xEnd,yEnd);
ctx.lineTo(xEnd,yFill);
ctx.lineTo(xStart,yFill);
ctx.lineTo(xStart,yStart);
ctx.closePath();
ctx.fill();
ctx.restore();
}
ctx.strokeStyle=linecolor;
ctx.lineWidth=linewidth;
ctx.beginPath();
ctx.moveTo(xStart,yStart);
ctx.lineTo(xEnd,yEnd);
ctx.stroke();
ctx.closePath();
},
drawContinuousLine:function(opts)
{
var i,
xStart=[],
yStart=[],
xEnd=[],
yEnd=[],
yFill=this._setDefVal(opts.yFill,this.hFrame),
linecolor=this._setDefVal(opts.lineclr,this.lineclr),
linewidth=this._setDefVal(opts.linewidth,this.linewidth),
fillclr=this._setDefVal(opts.fillclr,this.fillclr),
neglinecolor=this._setDefVal(opts.neglineclr,this.lineclr),
negfillclr=this._setDefVal(opts.negfillclr,this.fillclr),
alphablend=this._setDefVal(opts.alphablend,this.alphablend),
ctx=this._getContext(),
canvas,
gradient,
xIntercept,
crossesOrigin,
usingExcanvas=this.isExcanvas,
xStartLength=opts.xStart.length;
if(fillclr)
{
ctx.save();
ctx.globalAlpha=alphablend;
ctx.strokeStyle=fillclr;
if(opts.gradient.top!==''&&opts.gradient.middle!==''&&opts.gradient.bottom!=='')
{
canvas=this._getCanvas();
gradient=ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0.1,opts.gradient.top);
gradient.addColorStop(0.2,opts.gradient.middle);
gradient.addColorStop(1,opts.gradient.bottom);
fillclr=gradient;
}
ctx.fillStyle=fillclr;
ctx.beginPath();
for(i=0;i < xStartLength;i++)
{
xStart=this._setDefVal(opts.xStart[i],0);
yStart=this._setDefVal(opts.yStart[i],0);
xEnd=this._setDefVal(opts.xEnd[i],100);
yEnd=this._setDefVal(opts.yEnd[i],100);
xStart=this._transformValue(xStart);
xEnd=this._transformValue(xEnd);
ctx.fillStyle=(yStart > yFill)?negfillclr:fillclr;
crossesOrigin=(yStart > yFill&&yEnd <=yFill)||(yStart <=yFill&&yEnd > yFill);
if(crossesOrigin)
{
xIntercept=this._calculateXIntercept({x:xStart, y:yStart},{x:xEnd, y:yEnd}, yFill);
ctx.moveTo(xStart,yStart);
ctx.lineTo(xIntercept,yFill);
ctx.lineTo(xStart,yFill);
ctx.lineTo(xStart, yStart);
ctx.closePath();
ctx.fill();
ctx.fillStyle=(yStart <=yFill)?negfillclr:fillclr;
xStart=xIntercept;
yStart=yFill;
ctx.beginPath();
}
ctx.moveTo(xStart,yStart);
ctx.lineTo(xEnd,yEnd);
ctx.lineTo(xEnd,yFill);
ctx.lineTo(xStart,yFill);
ctx.lineTo(xStart,yStart);
}
ctx.closePath();
ctx.fill();
ctx.restore();
}
ctx.strokeStyle=linecolor;
ctx.lineWidth=linewidth;
if(usingExcanvas)
{
ctx.beginPath();
}
for(i=0;i < xStartLength;i++)
{
xStart=this._setDefVal(opts.xStart[i],0);
yStart=this._setDefVal(opts.yStart[i],0);
xEnd=this._setDefVal(opts.xEnd[i],100);
yEnd=this._setDefVal(opts.yEnd[i],100);
xStart=this._transformValue(xStart);
xEnd=this._transformValue(xEnd);
if(!usingExcanvas)
{
ctx.beginPath();
}
ctx.strokeStyle=(yStart > yFill)?neglinecolor:linecolor;
crossesOrigin=(yStart > yFill&&yEnd <=yFill)||(yStart <=yFill&&yEnd > yFill);
if(crossesOrigin)
{
ctx.moveTo(xStart,yStart);
xIntercept=this._calculateXIntercept({x:xStart, y:yStart},{x:xEnd, y:yEnd}, yFill);
xIntercept=Math.round(xIntercept);
ctx.lineTo(xIntercept,yFill);
ctx.stroke();
ctx.closePath();
ctx.strokeStyle=(yStart <=yFill)?neglinecolor:linecolor;
xStart=xIntercept;
yStart=yFill;
ctx.beginPath();
}
ctx.moveTo(xStart,yStart);
ctx.lineTo(xEnd,yEnd);
ctx.stroke();
if(!usingExcanvas)
{
ctx.closePath();
}
}
if(usingExcanvas)
{
ctx.closePath();
}
},
_calculateXIntercept:function(start, end, y)
{
var m=(end.y - start.y)/(end.x - start.x),
b=start.y -(m*start.x);
return(y-b)/m;
},
drawDashedLineSegment:function(opts)
{
var xStart=this._setDefVal(opts.xStart,0),
yStart=this._setDefVal(opts.yStart,0),
xEnd=this._setDefVal(opts.xEnd,100),
yEnd=this._setDefVal(opts.yEnd,100),
gap=this._setDefVal(opts.gap,2),
dashLength=this._setDefVal(opts.dashLength,2),
linecolor=this._setDefVal(opts.lineclr,this.lineclr),
linewidth=this._setDefVal(opts.linewidth,this.linewidth),
ctx=this._getContext(),
lineLength, deltax, deltay, segments, segLength, cx, cy, radians, n;
xStart=this._transformValue(xStart);
xEnd=this._transformValue(xEnd);
if(linewidth % 2===1&&yEnd - yStart===0)
{
yEnd -=0.5;
yStart -=0.5;
}
segLength=dashLength+gap;
deltax=xEnd - xStart;
deltay=yEnd - yStart;
lineLength=Math.sqrt((deltax*deltax)+(deltay*deltay));
segments=Math.floor(Math.abs(lineLength/segLength));
radians=Math.atan2(deltay, deltax);
cx=xStart+0.5;
cy=yStart;
deltax=Math.cos(radians)*segLength;
deltay=Math.sin(radians)*segLength;
ctx.beginPath();
ctx.strokeStyle=linecolor;
ctx.lineWidth=linewidth;
for(n=0;n < segments;n++)
{
ctx.moveTo(cx,cy);
ctx.lineTo(cx+Math.cos(radians)*dashLength, cy+Math.sin(radians)*dashLength );
cx+=deltax;
cy+=deltay;
}
ctx.moveTo(cx,cy);
lineLength=Math.sqrt((xEnd-cx)*(xEnd-cx)+(yEnd-cy)*(yEnd-cy) );
if(lineLength > dashLength)
{
ctx.lineTo(cx+Math.cos(radians)*dashLength, cy+Math.sin(radians)*dashLength);
}
else if(lineLength > 0)
{
ctx.lineTo(cx+Math.cos(radians)*lineLength, cy+Math.sin(radians)*lineLength);
}
ctx.moveTo(xEnd,yEnd);
ctx.stroke();
ctx.closePath();
},
drawCrossHair:function(opts)
{
var xStart=this._setDefVal(opts.x1Start),
xEnd=this._setDefVal(opts.x1End),
yStart=this._setDefVal(opts.y1Start),
yEnd=this._setDefVal(opts.y1End),
lineColor=this._setDefVal(opts.lineColor, this.lineclr),
lineWidth=this._setDefVal(opts.lineWidth, this.linewidth),
paramSet1,
paramSet2;
paramSet1={xStart:xStart, xEnd:xEnd, yStart:yStart, yEnd:yEnd, lineclr:lineColor, linewidth:lineWidth};
this.drawDashedLineSegment(paramSet1);
xStart=this._setDefVal(opts.x2Start);
xEnd=this._setDefVal(opts.x2End);
yStart=this._setDefVal(opts.y2Start);
yEnd=this._setDefVal(opts.y2End);
paramSet2={xStart:xStart, xEnd:xEnd, yStart:yStart, yEnd:yEnd, lineclr:lineColor, linewidth:lineWidth};
this.drawDashedLineSegment(paramSet2);
},
clearChart:function()
{
var canvas=this._getCanvas();
canvas.height=0;
canvas.width=0;
},
addLabel:function(opts, divId)
{
var text=this._setDefVal(opts.text,'(empty label)'),
textalign=this._setDefVal(opts.align,null),
x=this._setDefVal(opts.x,0),
y=this._setDefVal(opts.y,0),
h=this._setDefVal(opts.h,null),
w=this._setDefVal(opts.w,null),
isBold=this._setDefVal(opts.bold,false),
cssClass=this._setDefVal(opts.cssClass,' '),
backgroundColor=this._setDefVal(opts.backgroundColor,null),
opacity=this._setDefVal(opts.opacity,null),
outsideScrollDiv=isOutsideScrollDiv(divId, this.chartType, opts.barType),
onRightSide=isOnRightSide(divId, opts.position);
if(!outsideScrollDiv)
{
x=this._transformValue(x);
}
else if(onRightSide&&shouldChartScroll(this))
{
x=this.availableContainerWidth - this.canvasOffset.right+6;
}
if(!this.labels[divId])
{
this.resetUndrawnLabels(divId);
}
this.labels[divId]+='<div style=\"position:absolute;left:'+x+'px;'+
'top:'+y+'px;'+
(w?'width:'+w+'px;':'')+
(h?'height:'+h+'px;':'')+
(textalign?'text-align:'+textalign+';':'')+
(backgroundColor?'background-color:'+backgroundColor+';':'')+
(opacity?'-moz-opacity:'+opacity+';-webkit-opacity:'+opacity+';opacity:'+opacity+';':'')+
(isBold?'font-weight:bold;':'')+'\" class="'+cssClass+'">'+text+'</div>';
},
drawOriginBar:function(opts, divId)
{
var x=this._setDefVal(opts.x,0),
y=this._setDefVal(opts.y,0),
h=this._setDefVal(opts.h,null),
w=this._setDefVal(opts.w,null),
backgroundColor=this._setDefVal(opts.backgroundColor,null),
opacity=this._setDefVal(opts.opacity,null),
borderColor=this._setDefVal(opts.borderColor,null),
borderWidth=this._setDefVal(opts.borderWidth,0),
cssClass=this._setDefVal(opts.cssClass,' '),
originBarElem=document.getElementById(this.id+divId),
firstInnerDiv=originBarElem?originBarElem.firstChild:null;
x=this._transformValue(x);
w=w - x;
if(firstInnerDiv)
{
firstInnerDiv.style.width=w+'px';
}
else
{
if(!this.labels[divId])
{
this.resetUndrawnLabels(divId);
}
this.labels[divId]+='<div style=\"position:absolute;'+
'left:'+x+'px;'+
'top:'+y+'px;'+
(w?'width:'+w+'px;':'')+
(h?'height:'+h+'px;':'')+
(borderColor?'border-right:'+borderWidth+'px solid '+borderColor+';':'')+'\" >'+
'<div style=\"'+
(backgroundColor?'background-color:'+backgroundColor+';':'')+
(opacity?'-moz-opacity:'+opacity+';-webkit-opacity:'+opacity+';opacity:'+opacity+';':'')+
'\" class="'+cssClass+'">'+
'</div>'+
'</div>';
}
},
drawLabels:function(divId, index)
{
var divLabels=this._getLabelDiv(divId),
chartContainer,
scrollContainer,
chartType, labelDivString, i;
if(!divLabels)
{
chartContainer=this.chartContainer;
if(!chartContainer)
{
chartContainer=cbd.adapter.getAncestor({node:this.canvas, tag:'div', cssClass:'chartContainer'});
}
if(!this.chartType)
{
chartType=adapter.hasClass(chartContainer, 'pieChart')?'pieChart':'gridChart';
this.chartType=chartType;
}
scrollContainer=adapter.getElement({node:chartContainer, tag:'div', cssClass:SCROLL_CONTAINER_CLASS});
divLabels=document.createElement('div');
divLabels.id=this.id+divId;
divLabels.className=this.getDivIdClass(divId);
if(isOutsideScrollDiv(divId, this.chartType))
{
chartContainer.appendChild(divLabels);
}
else
{
scrollContainer.appendChild(divLabels);
}
}
if(divId&&this.labels[divId])
{
divLabels.innerHTML+=this.labels[divId];
this.resetUndrawnLabels(divId);
}
else if(!divId )
{
labelDivString='';
for(i=0;i < this.labels.length;i++)
{
labelDivString+=this.labels[i];
this.resetUndrawnLabels(divId);
}
if(labelDivString )
{
divLabels.innerHTML+=labelDivString;
}
}
this._addMarkerTargetClass(divLabels, index);
},
_addMarkerTargetClass:function(divLabels, index)
{
var substitute;
if(!isNaN(this.tooltipMarkerIndex))
{
substitute=divLabels.className.indexOf(TOOLTIP_MARKER_CONTAINER_CLASS+this.tooltipMarkerIndex);
if(substitute!==-1)
{
divLabels.className=divLabels.className.substring(0, substitute - 1);
}
}
if(!isNaN(index))
{
divLabels.className+=" "+TOOLTIP_MARKER_CONTAINER_CLASS+index;
this.tooltipMarkerIndex=index;
}
},
drawInlineLabelsAndLegends:function(opts, labelPositionArray)
{
var divLabels,
parentNode=this.chartContainer,
h=this._setDefVal(opts.h,null),
w=this._setDefVal(opts.w,null),
isBold=this._setDefVal(opts.bold,false),
textalign=this._setDefVal(opts.align,null),
cssClass=this._setDefVal(opts.cssClass,' '),
i;
for(i=0;i < labelPositionArray.length;i++)
{
divLabels=document.createElement('div');
divLabels.id=this.id+labelPositionArray[i].label;
divLabels.className=cbd.charting.getDivIdClass('legend');
parentNode.appendChild(divLabels);
divLabels.innerHTML='<div style=\"align:center;position:absolute;left:'+labelPositionArray[i].x+'px;'+
'top:'+labelPositionArray[i].y+'px;'+
(w?'width:'+w+'px;':'')+
(h?'height:'+h+'px;':'')+
(textalign?'text-align:'+textalign+';':'')+
(isBold?'font-weight:bold;':'')+
'\" class="'+cssClass+'">'+labelPositionArray[i].label+'</div>';
}
},
drawLegendIcon:function(opts)
{
var parentNode=this.chartContainer,
divLegendIcon,
cssClass=this._setDefVal(opts.cssClass, ' '),
label=this._setDefVal(opts.label, ' ');
divLegendIcon=document.createElement('div');
divLegendIcon.id=this.id+'legendicon'+label;
divLegendIcon.className=cssClass;
parentNode.appendChild(divLegendIcon);
},
clearLabels:function(divId, keepUnrendered)
{
var canvas=this._getCanvas(),
parentNode=this.chartContainer,
labelDivs,
labelNode,
divLabels,
length,
i;
if(canvas&&!parentNode)
{
parentNode=adapter.getAncestor({node:canvas, tag:'div', cssClass:CHART_CONTAINER_CLASS});
}
if(!divId)
{
if(canvas&&canvas.parentNode)
{
labelDivs=adapter.getElements({node:parentNode, tag:'div', cssClass:'labelContainer'});
length=labelDivs.length;
for(i=0;i < length;i++)
{
labelNode=labelDivs[i];
labelNode.parentNode.removeChild(labelNode);
}
}
if(!keepUnrendered )
{
this.labels={};
}
}
else
{
divLabels=this._getLabelDiv(divId);
if(divLabels)
{
divLabels.parentNode.removeChild(divLabels);
}
if(!keepUnrendered )
{
this.resetUndrawnLabels(divId);
}
}
},
resetUndrawnLabels:function(divId)
{
this.labels[divId]='';
},
_getLabelDiv:function(divId)
{
return adapter.getElement({node:this.chartContainer, tag:'div', id:this.id+divId});
},
_addRangeBarTouchEvent:function()
{
var controller=this,
controllerId=controller.id,
rangeBar=adapter.getElement({node:controller.chartContainer, cssClass:'rangeBar', tag:'div'});
controller.rangeBar=rangeBar||false;
if(controller.rangeBar )
{
adapter.addEventListener(
{
node:controller.rangeBar,
event:'touchmove',
controller:adapter.getController(controllerId),
func:'_handleToolTipDrag',
id:controllerId+TOOLTIP_TOUCH_DRAG_EVENT_ID
});
}
},
createToolTip:function(config)
{
var controller=this;
adapter.loadJS('cbdToolTip',function()
{
var controllerId=controller.id,
controllerObj=adapter.getController(controllerId),
toolTipConfig=config.toolTipConfig,
hasLeader=toolTipConfig.type!=='fixed'&&toolTipConfig.hideLeader!==true,
useIndividualToolTip=toolTipConfig.type==='individual',
toolTipId=controllerId+'toolTip',
chartContainer=controller.chartContainer,
chartContainerWidth=chartContainer.offsetWidth,
toolTipOpts={id:toolTipId, location:{}, orientation:toolTipConfig.orientation, leader:hasLeader, boundary:toolTipConfig.boundary, individual:useIndividualToolTip},
scrollElem=window,
wrapDiv;
controller.addLabel({text:''}, 'toolTip');
controller.drawLabels('toolTip');
toolTipOpts.contentNode=document.getElementById(toolTipId).lastChild;
controller.toolTipOpts=toolTipOpts;
controller.toolTip=new cbd.ToolTip({
id:toolTipOpts.id, location:[toolTipOpts.location],
orientation:toolTipOpts.orientation, contentNode:toolTipOpts.contentNode,
leader:toolTipOpts.leader, boundary:toolTipOpts.boundary,
closeOnMouseOut:null, chartContainerWidth:chartContainerWidth,
individual:toolTipOpts.individual, count:config.toolTipCount
});
if(isTouchEnabled)
{
adapter.addEventListener({node:chartContainer, event:'touchstart', controller:controllerObj, func:'_handleToolTip',     id:controllerId+TOOLTIP_EVENT_ID});
adapter.addEventListener({node:chartContainer, event:'touchmove',  controller:controllerObj, func:'_handleToolTipDrag', id:controllerId+TOOLTIP_TOUCH_MOVE_EVENT_ID});
adapter.addEventListener({node:chartContainer, event:'touchleave', controller:controllerObj, func:'_handleToolTipDrag', id:controllerId+TOOLTIP_TOUCH_LEAVE_EVENT_ID});
adapter.addEventListener({node:document.body, event:'click', controller:controllerObj, func:'_handleToolTipDrag', id:controllerId+TOOLTIP_EXT_CLICK_EVENT_ID});
if(isIEAnyVersion)
{
wrapDiv=document.getElementById('wrapDiv');
if(wrapDiv){
scrollElem=wrapDiv;
}
}
adapter.addEventListener({node:scrollElem, event:'scroll', controller:controllerObj, func:'_handleToolTipDrag', id:controllerId+TOOLTIP_EXT_SCROLL_EVENT_ID});
controller._addRangeBarTouchEvent();
}
else
{
adapter.addEventListener({node:chartContainer, event:'mousemove',  controller:controllerObj, func:'_handleToolTip', id:controllerId+TOOLTIP_EVENT_ID});
adapter.addEventListener({node:chartContainer, event:'mouseleave', controller:controllerObj, func:'_handleToolTip', id:controllerId+TOOLTIP_MOUSE_LEAVE_EVENT_ID});
adapter.addEventListener({node:document.body, event:'click', controller:controllerObj, func:'_handleToolTip', id:controllerId+TOOLTIP_EXT_CLICK_EVENT_ID});
if(isIEAnyVersion)
{
wrapDiv=document.getElementById('wrapDiv');
if(wrapDiv){
scrollElem=wrapDiv;
}
}
adapter.addEventListener({node:scrollElem, event:'scroll', controller:controllerObj, func:'_handleToolTip', id:controllerId+TOOLTIP_EXT_SCROLL_EVENT_ID});
}
});
},
openToolTip:function(config)
{
var controller=this,
innerHtml=config.innerHtml,
locations=config.location,
position=config.position,
index=config.index,
orientation=config.orientation,
openFunction=function(){
var toolTip=controller.toolTip,
bar=adapter.getElement({node:controller.chartContainer, cssClass:'rangeBar', tag:'div'}),
offset=bar?parseInt(bar.style.width, 10)/2:0;
if(!(toolTip.closeOnMouseOut&&toolTip.isOver ) )
{
toolTip.setOrientation(position);
toolTip.setLocation(locations);
toolTip.open(index);
toolTip.update(innerHtml);
if(position!=='top'&&orientation==='horizontal'&&toolTip.isNotWithinContainerBounds())
{
if(position==='right')
{
adapter.handleEachItem(locations, function(pos)
{
pos.x -=offset;
});
}
else
{
adapter.handleEachItem(locations, function(pos)
{
pos.x+=offset;
});
}
position='top';
openFunction();
}
}
};
if(locations)
{
adapter.handleEachItem(locations, function(pos){
pos.x=controller._transformValue(pos.x);
});
}
if(this.toolTipOpts )
{
openFunction();
}
else
{
adapter.onReady(openFunction);
}
},
closeToolTip:function(index)
{
if(this.toolTipOpts)
{
this.toolTip.close(index);
}
},
clearRect:function(opts)
{
var xStart,
yStart,
width,
height,
ctx,
loadingIndicatorElem=document.getElementById(this.id+'LoadingIndicator');
if(loadingIndicatorElem)
{
loadingIndicatorElem.style.display='none';
}
if(this.canvas.getContext)
{
xStart=this._setDefVal(opts.xStart,this.xFrame);
yStart=this._setDefVal(opts.yStart,this.yFrame);
width=this._setDefVal(opts.width,this.wFrame);
height=this._setDefVal(opts.height,this.hFrame);
ctx=this._getContext();
ctx.clearRect(xStart,yStart,width, height);
}
},
getDivIdClass:function(divId)
{
return 'labelContainer customChart'+divId;
},
destroy:function()
{
var controller=this,
controllerId=controller.id,
chartContainer=controller.chartContainer,
scrollElem=window,
wrapDiv;
if(isIEAnyVersion)
{
wrapDiv=document.getElementById('wrapDiv');
if(wrapDiv){
scrollElem=wrapDiv;
}
}
if(isTouchEnabled)
{
adapter.removeEventListener({node:chartContainer, event:'touchstart', id:controllerId+TOOLTIP_EVENT_ID});
adapter.removeEventListener({node:chartContainer, event:'touchmove',  id:controllerId+TOOLTIP_TOUCH_MOVE_EVENT_ID});
adapter.removeEventListener({node:chartContainer, event:'touchleave', id:controllerId+TOOLTIP_TOUCH_LEAVE_EVENT_ID});
adapter.removeEventListener({node:chartContainer, event:'touchleave', id:controllerId+TOOLTIP_TOUCH_LEAVE_EVENT_ID});
adapter.removeEventListener({node:document.body, event:'click', id:controllerId+TOOLTIP_EXT_CLICK_EVENT_ID});
adapter.removeEventListener({node:scrollElem, event:'scroll', id:controllerId+TOOLTIP_EXT_SCROLL_EVENT_ID});
if(controller.rangeBar )
{
adapter.removeEventListener({node:controller.rangeBar, event:'touchmove', id:controllerId+TOOLTIP_TOUCH_DRAG_EVENT_ID});
}
}
else
{
adapter.removeEventListener({node:chartContainer, event:'mousemove',  id:controllerId+TOOLTIP_EVENT_ID});
adapter.removeEventListener({node:chartContainer, event:'mouseleave', id:controllerId+TOOLTIP_MOUSE_LEAVE_EVENT_ID});
adapter.removeEventListener({node:document.body, event:'click', id:controllerId+TOOLTIP_EXT_CLICK_EVENT_ID});
adapter.removeEventListener({node:scrollElem, event:'scroll', id:controllerId+TOOLTIP_EXT_SCROLL_EVENT_ID});
}
}
};
}(cbd, cbd.adapter));
(function(ieQuirksMode)
{
cbd.charting=cbd.charting||{};
if(window.vg )
{
vg.charting=cbd.charting;
}
cbd.charting.buildCanvasChartFromFlash=function(id, opt)
{
'use strict';
var chart,
config=vg.util.copyJsonOptions(_cbdGetChartConfig(opt.chart)),
ChartObj;
cbd.charting._parseUrlParams(opt, config);
if(config.chartObj)
{
ChartObj=eval(config.chartObj);
chart=new ChartObj(id, config);
}
else
{
chart=new cbd.charting.Chart(id, config);
}
chart.loadData(opt.values, opt.loadType);
};
cbd.charting.showError=function(id, errorText, errorCss, errorCoords, dontClear)
{
'use strict';
var comp=cbd.adapter.getController(id);
if(comp)
{
comp.showError(errorText, errorCss, errorCoords, dontClear);
}
};
cbd.charting.openToolTipAt=function(id, index)
{
'use strict';
var comp=cbd.adapter.getController(id);
if(comp)
{
comp.openToolTipAtIndex(index);
}
};
cbd.charting.getGridInfo=function(id)
{
'use strict';
var comp=cbd.adapter.getController(id),
grid;
if(comp)
{
grid=comp.grid;
return{margins:grid.margins};
}
};
cbd.charting.redraw=function(id, data)
{
'use strict';
var comp=cbd.adapter.getController(id);
if(comp)
{
if(data)
{
comp.update(data);
}
else
{
comp.redraw();
}
}
};
cbd.charting.isCursorOverChart=function(id, event)
{
'use strict';
var comp=cbd.adapter.getController(id),
chartContainer=comp.renderer.chartContainer,
pos=cbd.adapter.getRelativeEventPos(event, chartContainer),
width=chartContainer.offsetWidth,
height=chartContainer.offsetHeight;
return(pos.x >=0&&pos.x <=width&&pos.y >=0&&pos.y <=height);
};
cbd.charting.xAxisLabelDivId='XAxisLabels';
cbd.charting.yAxisLabelDivId='YAxisLabels';
cbd.charting.dualAxisLabelDivId='DualAxisLabels';
cbd.charting.dualAxisTitleDivId='dualAxisTitle';
cbd.charting.errorDivId='_error';
cbd.charting.defaultError='This information is temporarily unavailable.';
cbd.charting.errorCss='chartError';
cbd.charting.infoErrorCss='chartInfoError';
cbd.charting.months=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
cbd.charting.colors=['#5190CD', '#FFCF01', '#9E1B34', '#AFBC22', '#00446A', '#7C4199', '#764200', '#00788A', '#F58025'];
cbd.charting.defaultPieColors=cbd.adapter.isNextGen()?['#96151D', '#005293', '#69923A', '#999999']:['#9E1B34', '#0065A4', '#5C8727', '#FFFFFF'];
cbd.charting.FATAL_ERROR='fatalError';
cbd.charting.NON_FATAL_ERROR='nonFatalError';
cbd.charting.TOOL_TIP_DIV_ID='ToolTipMarker';
cbd.charting.MIN_DIST_BETWEEN_LABELS=MIN_DIST_BETWEEN_LABELS=50;
cbd.charting.MIN_YEAR_COUNT=MIN_YEAR_COUNT=24;
cbd.charting._parseXMLData=function(req, error, caller)
{
'use strict';
var schema=caller.config.schema,
result, data, errCode, xmlDoc=null;
if(error||!req||!req.responseXML)
{
errCode='FAILED_REQUEST';
}
if(!schema)
{
errCode='NO_SCHEMA';
}
if(req)
{
xmlDoc=req.responseXML;
}
if(schema&&xmlDoc&&xmlDoc.childNodes&&xmlDoc.childNodes.length)
{
if(schema.xpath)
{
result=cbd.charting._parseXMLDataXPath(xmlDoc, schema);
}
else
{
result=cbd.charting._parseXMLDataByTagName(xmlDoc, schema);
}
data=result.data;
errCode=result.errCode;
}
caller.update(data, errCode, this.url);
};
cbd.charting._parseXMLDataXPath=function(xmlDoc, schema)
{
'use strict';
var data={}, errCode;
data.series=[];
errCode=cbd.charting._getXmlDataErrorCode(xmlDoc, schema);
cbd.charting._getXmlData(xmlDoc, schema,data);
cbd.charting._addXmlDataLabels(xmlDoc, schema,data);
cbd.charting._addXmlDataSeries(xmlDoc, schema,data);
return{data:data, errCode:errCode};
};
cbd.charting._getXmlDataErrorCode=function(xmlDoc, schema)
{
'use strict';
var errCode;
if(!schema.errorNode)
{
schema.errorNode='//error/@code|//error/text()';
}
errCode=vg.XML._xPathSelect(xmlDoc, xmlDoc, schema.errorNode, true);
if(errCode&&errCode.length===0)
{
errCode=null;
}
};
cbd.charting._getXmlData=function(xmlDoc, schema ,data)
{
'use strict';
var schemaMeta=schema.meta, currentSchemaMeta, metaNode, k;
for(k in schemaMeta)
{
currentSchemaMeta=schemaMeta[k];
if(currentSchemaMeta&&currentSchemaMeta.path&&currentSchemaMeta.name)
{
metaNode=vg.XML._xPathSelect(xmlDoc, xmlDoc, currentSchemaMeta.path, true);
if(metaNode)
{
data[currentSchemaMeta.name]=metaNode;
}
}
}
};
cbd.charting._addXmlDataLabels=function(xmlDoc, schema,data)
{
'use strict';
if(schema.labelPt&&schema.labelPt!=='')
{
data.labels={};
data.labels.xAxis=vg.XML._xPathSelect(xmlDoc, xmlDoc, schema.labelPt, true);
}
};
cbd.charting._addXmlDataSeries=function(xmlDoc, schema, data)
{
'use strict';
var xmlList , i, series, attribs, seriesNode ,colors, index, xmlListLength,
xPathSelect=vg.XML._xPathSelect;
xmlList=(schema.seriesNode)?xPathSelect(xmlDoc, xmlDoc, schema.seriesNode):[];
xmlListLength=xmlList.length;
for(i=0;i< xmlListLength;i++)
{
series={};
series.data=[];
attribs={};
seriesNode=xmlList[i];
if(seriesNode.attributes.length > 0)
{
series.attribs=cbd.charting._getXMLAttribsFromItems(seriesNode.attributes);
}
if(schema.dataPt&&schema.dataPt!=='')
{
series.data=xPathSelect(xmlDoc, seriesNode, schema.dataPt, true);
}
if(schema.ttLabelPt&&schema.ttLabelPt!=='')
{
series.ttLabels=xPathSelect(xmlDoc, seriesNode, schema.ttLabelPt, true);
}
if(schema.seriesLabelPt&&schema.seriesLabelPt!=='')
{
series.labels=xPathSelect(xmlDoc, seriesNode, schema.seriesLabelPt, true);
}
if(schema.colorPt&&schema.colorPt!=='')
{
colors=xPathSelect(xmlDoc, seriesNode, schema.colorPt, true);
for(index in colors )
{
colors[index]='#'+colors[index];
}
series.colors=colors;
}
data.series.push(series);
}
};
cbd.charting._getXMLAttribsFromItems=function(nodeAttribs)
{
'use strict';
var attribs={},
i,
length=nodeAttribs.length;
for(i=0;i < length;i++)
{
attribs[nodeAttribs.item(i).name]=nodeAttribs.item(i).value;
}
return attribs;
};
cbd.charting._parseXMLDataByTagName=function(xmlDoc, schema)
{
var data={},
errCode,
errorList=[],
i,
j,
errNode,
errCodeNode,
k,
metaNode;
data.series=[];
if(!schema.errorNode)
{
schema.errorNode='error';
}
errorList=xmlDoc.getElementsByTagName(schema.errorNode);
if(errorList.length > 0)
{
for(i=0;i < errorList.length;i++)
{
errNode=errorList.item(j);
errCodeNode=errNode.attributes.getNamedItem('code');
if(!errCodeNode)
{
errCode=errNode.text||errNode.textContent;
}
else
{
errCode=errCodeNode.nodeValue;
}
}
}
for(k in schema.meta)
{
metaNode=xmlDoc.getElementsByTagName(schema.meta[k]);
if(metaNode&&metaNode.item(0))
{
metaNode=metaNode.item(0);
data[metaNode.tagName]=metaNode.text||metaNode.textContent;
}
}
var key=schema.dataPt,
xmlList=(schema.seriesNode)?xmlDoc.getElementsByTagName(schema.seriesNode):[],
series,
seriesNode,
dataNodes,
dataNode,
j,
dataVal;
for(i=0;i< xmlList.length;i++)
{
series={};
series.data=[];
seriesNode=xmlList.item(i);
if(seriesNode.attributes.length > 0)
{
series.attribs=cbd.charting._getXMLAttribsFromItems(seriesNode.attributes);
}
if(key&&key!='')
{
dataNodes=seriesNode.getElementsByTagName(key);
for(j=0;j < dataNodes.length;j++)
{
dataNode=dataNodes.item(j);
if(dataNode)
{
if(dataNode.attributes.length > 0)
{
series.data.push(cbd.charting._getXMLAttribsFromItems(dataNode.attributes));
}
else
{
dataVal=dataNode.text||dataNode.textContent;
series.data.push(parseFloat(dataVal));
}
}
}
}
data.series.push(series);
}
return{data:data, errCode:errCode};
};
cbd.charting._parseUrlParams=function(opt, config)
{
var index, labels, colors,
values=opt.values,
labelsArray=[],
colorsArray=[],
labelsParam='labels=',
colorsParam='colors=',
tooltipsParam='tooltips=',
validColor, i, tooltips;
if(!config.series )
{
config.series={};
}
index=values.indexOf(labelsParam);
if(index!=-1)
{
labels=values.substring(index+labelsParam.length);
labels=labels.substring(0, labels.indexOf('&'));
labelsArray=labels.split(',');
if(config.chartType=='pie' )
{
config.series.labels=labelsArray;
}
else
{
if(!config.grid)
{
config.grid={};
}
if(!config.grid.xAxis)
{
config.grid.xAxis={};
}
config.grid.xAxis.labels=labelsArray;
}
}
if(!config.series.colors )
{
index=values.indexOf(colorsParam);
if(index!=-1)
{
validColor=false;
colors=values.substring(index+colorsParam.length);
if(colors.indexOf('&')!=-1)
{
colors=colors.substring(0, colors.indexOf('&'));
}
colorsArray=colors.split(',');
for(i in colorsArray)
{
if(colorsArray[i]!=''&&colorsArray[i]!=null&&colorsArray[i]!='null')
{
validColor=true;
if(colorsArray[i].indexOf('#')==-1)
{
colorsArray[i]='#'+colorsArray[i];
}
}
}
if(validColor)
{
config.series.colors=colorsArray;
}
}
}
index=values.indexOf(tooltipsParam);
if(index!=-1)
{
tooltips=values.substring(index+tooltipsParam.length);
if(tooltips )
{
if(!config.toolTip)
{
config.toolTip={};
}
if(!config.toolTip.header)
{
config.toolTip.header={};
}
config.toolTip.header.value=tooltips.split(',');
}
}
config.w=opt.width;
config.h=opt.height;
if(opt.chart )
{
config.chartName=opt.chart.substring(0,opt.chart.indexOf('.swf'));
}
config.parent=opt.parent;
config.path=(opt.path!=FLASH_CHARTS_PATH)?opt.path:null;
return config;
};
cbd.charting._formatLabel=function(val, format, precision, removeLeadingZero)
{
var labelText=val,
field;
if(val instanceof Date)
{
labelText=cbd.charting._formatDate(labelText, format);
}
else
{
labelText=String(labelText);
val=parseFloat(labelText);
if(isNaN(val)||format==='unit')
{
field={value:labelText};
}
else
{
if(isNaN(precision))
{
precision=2;
}
labelText=new Number(labelText);
field={value:String(labelText.toFixed(precision))};
cbd.adapter.formatNumber(field, precision, removeLeadingZero);
}
if(format&&format!=='unit')
{
if(format==='dollar')
{
if(field.value.charAt(0)==='-' )
{
labelText='&ndash;$'+field.value.substring(1);
}
else
{
labelText='$'+field.value;
}
}
else if(format==='percent' )
{
if(field.value.charAt(0)==='-' )
{
labelText='&ndash;'+field.value.substring(1)+'%';
}
else
{
labelText=field.value+'%';
}
}
else if(format==='number' )
{
if(field.value.charAt(0)==='-' )
{
labelText='&ndash;'+field.value.substring(1);
}
else
{
labelText=field.value;
}
}
else
{
labelText=format.replace('%s', field.value);
}
}
else
{
labelText=field.value;
}
}
return labelText;
};
cbd.charting._getDivHtml=function(innerHtml, cssClass)
{
return '<div class="'+cssClass+'">'+innerHtml+'</div>';
};
cbd.charting._estimateMaxWidth=function(id, innerHtml, cssClass)
{
return cbd.charting._estimateDimensions(id, innerHtml, cssClass).w;
};
cbd.charting._estimateMaxHeight=function(id, innerHtml, cssClass)
{
return cbd.charting._estimateDimensions(id, innerHtml, cssClass).h;
};
cbd.charting._estimateDimensions=function(id, innerHtml, cssClass)
{
var node=document.getElementById(id),
chartContainer=cbd.adapter.getAncestor({node:node, tag:'div', cssClass:'chartContainer'}),
dummyDiv,
dummyContainer,
dimensions;
dummyDiv=document.createElement('div');
dummyDiv.className=cbd.charting.getDivIdClass(cssClass);
dummyDiv.innerHTML=innerHtml;
dummyContainer=document.createElement('div');
dummyContainer.style.position='absolute';
dummyContainer.style.top='-10000px';
dummyContainer.style.left='-10000px';
dummyContainer.id='dummyContainer';
dummyContainer.className=chartContainer.className;
dummyContainer.appendChild(dummyDiv);
document.body.appendChild(dummyContainer);
dimensions={w:cbd.adapter.getWidth(dummyDiv),h:cbd.adapter.getHeight(dummyDiv)};
document.body.removeChild(dummyContainer);
return dimensions;
};
cbd.charting.getDivIdClass=function(divId)
{
return 'labelContainer customChart'+divId;
};
cbd.charting._formatDate=function(dateVal, format)
{
var labelText=new String(format);
if(format)
{
labelText=labelText.replace('%Y', new String(dateVal.getFullYear()).substring(2));
labelText=labelText.replace('%y', dateVal.getFullYear());
labelText=labelText.replace('%M', cbd.charting.months[dateVal.getMonth()]);
labelText=labelText.replace('%m', dateVal.getMonth()+1);
labelText=labelText.replace('%d', dateVal.getDate());
}
else
{
labelText=cbd.charting.months[dateVal.getMonth()]+dateVal.getFullYear();
}
return labelText;
};
cbd.charting._formatDisplayField=function(layout, format, data, precision)
{
var percent, value, label, legendFields, title, layoutData;
legendFields=layout.slice(0);
if(!isNaN(data.value))
{
value=cbd.charting._formatLabel(data.value, format, precision);
}
if(!isNaN(data.percent))
{
percent=cbd.charting._formatLabel(data.percent, 'percent', precision);
}
if(!isNaN(data.layoutData))
{
layoutData=cbd.charting._formatLabel(data.layoutData, null, precision);
}
label=data.label;
title=data.title;
for(var i=0;i<legendFields.length;i++)
{
if(value)
{
legendFields[i]=legendFields[i].replace('%value', value);
}
if(percent)
{
legendFields[i]=legendFields[i].replace('%percent', percent);
}
if(label)
{
legendFields[i]=legendFields[i].replace('%label', label);
}
if(layoutData!=undefined)
{
legendFields[i]=legendFields[i].replace('%layoutData', layoutData);
}
if(title)
{
legendFields[i]=legendFields[i].replace('%title', title);
}
}
return legendFields;
};
cbd.charting._getPrecision=function(delta, defaultPrecision)
{
var log10delta=Math.log(delta )/Math.log(10);
var ceil_log10delta=Math.ceil(log10delta);
var precision;
if(log10delta < 0 )
{
if(Number((ceil_log10delta - log10delta).toFixed(6))==0  )
{
precision=Math.abs(log10delta);
}
else
{
precision=Math.abs(ceil_log10delta - 1.0);
}
}
else
{
precision=defaultPrecision;
}
return precision;
};
}(window.ieQuirksMode));
(function(cbdcommonScreen, ieQuirksMode)
{
var getMediaQuerySize=function()
{
var mediaQuerySize='large';
if(cbdcommonScreen)
{
mediaQuerySize=cbdcommonScreen.getMediaQuerySize();
}
return mediaQuerySize;
};
cbd.charting.Chart=function(id, config )
{
'use strict';
this.initialize(id, config);
};
cbd.charting.Chart.prototype=
{
initialize:function(id, config)
{
'use strict';
var chartType=(config.chartType==='pie')?'pieChart':'gridChart',
chartCSS,
adapter=cbd.adapter,
respConfig=config.respConfig,
renderer;
this.originalConfig=config;
this.id=id;
if(config.chartName==null||config.chartName==='')
{
chartCSS=chartType;
}
else
{
chartCSS=config.chartName+' '+chartType;
}
this.chartCSS=chartCSS;
renderer=new cbd.ChartRenderer(id, config.parent, chartType);
this.renderer=renderer;
this._configureWidthAndHeight(id, config);
if(chartType==='pieChart')
{
this.renderer.initialize(id, this.width,{left:0, right:0}, this.height, chartCSS);
}
adapter.setController(this, id);
this.config={};
if(chartType==='gridChart')
{
this.config.margins={left:'auto', top:5, right:'auto', bottom:30};
}
adapter.deepAttach(this.config, config);
if(respConfig)
{
adapter.deepAttach(this.config, respConfig[getMediaQuerySize()]);
}
if(chartType==='gridChart')
{
this.createGrid(this.config);
}
},
getGrid:function()
{
return this.grid;
},
clear:function()
{
'use strict';
var opts={};
opts.xStart=this.x;
opts.yStart=this.y;
opts.width=this.w||this.width;
opts.height=this.h||this.height;
this.renderer.clearRect(opts );
this.renderer.setError(false);
this.renderer.clearLabels();
},
createGrid:function()
{
if(!this.config.grid)
{
this.config.grid={};
}
var grid=this.config.grid,
config=this.config;
grid.margins=config.margins;
this.grid=new cbd.charting.Grid(this.renderer, grid, this.height);
},
_configureWidthAndHeight:function(id, config )
{
'use strict';
var canvas,
container,
canvasWidth,
canvasHeight,
clearChart,
adapter=cbd.adapter,
controller=this;
if(config.w )
{
this.width=config.w;
}
else
{
canvas=document.getElementById(id);
container=adapter.getAncestor({node:canvas, tag:'div', cssClass:'chartContainer'});
if(config.grid&&config.grid.w)
{
canvasWidth=config.grid.w;
}
else
{
canvasWidth=adapter.getWidth(container);
}
this.width=canvasWidth||this.getPixelsStyle(container.style.width);
}
if(config.h )
{
this.height=config.h;
}
else
{
if(!canvas||!container )
{
canvas=document.getElementById(id);
container=adapter.getAncestor({node:canvas, cssClass:'chartContainer'});
}
canvasHeight=adapter.getHeight(container);
this.height=canvasHeight||this.getPixelsStyle(container.style.height);
}
if(container&&adapter.isResponsive()&&(container.style.height.indexOf('%') > 0||container.style.width.indexOf('%') > 0 ))
{
this.contnrW=container.offsetWidth;
this.contnrH=container.offsetHeight;
clearChart=function()
{
var	renderer=controller.renderer,
chartContainer=renderer?renderer.chartContainer:null,
scrollContainer=renderer?renderer.scrollContainer:null;
if(!scrollContainer||(!chartContainer||
(chartContainer.offsetWidth!==controller.contnrW||
chartContainer.offsetHeight!==controller.contnrH)	) )
{
controller.clear();
renderer.clearChart();
}
if(scrollContainer&&chartContainer)
{
chartContainer.style.overflow='hidden';
scrollContainer.style.width='0px';
}
};
adapter.addEventListener({node:window, event:adapter.getEventName('BROWSER_RESIZE_START'), func:clearChart, id:id+'Clear'});
adapter.addEventListener({node:window, event:adapter.getEventName('BROWSER_RESIZE_END'), func:'redraw', controller:this, id:id+'Redraw'});
}
},
getPixelsStyle:function(obj)
{
if(typeof obj==='string')
{
obj=obj.replace('px', '');
}
return isNaN(obj)?0:obj;
},
loadData:function(values, loadType)
{
this.loadType=loadType;
var data={},
seriesArray=[],
url, index, endIndex, valuesParam, valuesString, i, urlParam;
if(loadType=='URL'&&typeof(values)=='string')
{
valuesParam='values=';
index=values.indexOf(valuesParam);
if(index!=-1)
{
endIndex=values.indexOf('&', index) > -1?values.indexOf('&', index):values.length;
valuesString=values.substring(index+valuesParam.length, endIndex);
seriesArray=valuesString.split(',');
data.series=[];
for(i in seriesArray )
{
seriesArray[i]=seriesArray[i].split('@');
}
data.series.push({data:seriesArray, chartType:this.config.chartType});
}
this.update(data);
}
else if(loadType=='XML')
{
urlParam='url=';
index=values.indexOf(urlParam);
if(index!=-1)
{
endIndex=values.indexOf('&') > -1?values.indexOf('&'):values.length;
url=unescape(values.substring(index+urlParam.length, endIndex));
jsCBDgetContent(url, cbd.charting._parseXMLData, this);
}
}
return data;
},
setMaxAndMin:function()
{
var grid=this.grid,
xAxis=grid.xAxis,
yAxis=grid.yAxis,
seriesArray=this.series,
seriesLength=seriesArray.length;
xAxis.noPts=0;
for(var i=0;i< seriesLength;i++)
{
var series=seriesArray[i];
var obj=series.getMaxMinValues();
if(obj!=null )
{
if(yAxis.min > obj.min.y)
{
yAxis.min=obj.min.y;
}
if(yAxis.max < obj.max.y)
{
yAxis.max=obj.max.y;
}
if(xAxis.min > obj.min.x)
{
xAxis.min=obj.min.x;
}
if(xAxis.max < obj.max.x)
{
xAxis.max=obj.max.x;
}
if(xAxis.noPts < series.data.length)
{
xAxis.noPts=series.data.length;
}
}
}
var gridConfig=this.config.grid;
if(gridConfig)
{
var yConfig=gridConfig.yAxis;
if(yConfig)
{
this._initializeMaxAndMin(yAxis, yConfig);
}
var xConfig=gridConfig.xAxis;
if(xConfig)
{
this._initializeMaxAndMin(xAxis, xConfig);
}
}
if(yAxis.max==yAxis.min)
{
yAxis.max+=5;
yAxis.min -=5;
}
if(xAxis.max===0){
xAxis.max=5;
}
xAxis.range=(xAxis.max - xAxis.min).toFixed(6);
yAxis.range=(yAxis.max - yAxis.min).toFixed(6);
},
_initializeMaxAndMin:function(axis, configAxis)
{
if(!isNaN(configAxis.min))
{
axis.min=configAxis.min;
}
if(!isNaN(configAxis.max))
{
axis.max=configAxis.max;
}
},
setRange:function(range)
{
if(range)
{
range=new String(range);
if(range.toLowerCase()=='ytd'&&this.grid.endDate)
{
this.range=this.grid.endDate.getMonth()+1;
}
else if(range.indexOf(',') > -1)
{
this.parseCustomRange(range);
}
else if(this.grid.xAxis.unit==='unit')
{
this.range=range;
}
else
{
this.range=parseFloat(range)*12;
}
}
},
parseCustomRange:function(rangeString)
{
var grid=this.grid,
gridStartDate,
gridEndDate=grid.endDate,
dateArray=rangeString.split(','),
endDate;
if(gridEndDate)
{
dateArray[0]=dateArray[0].split('/');
dateArray[1]=dateArray[1].split('/');
gridStartDate=new Date(dateArray[0][1], dateArray[0][0], 0);
endDate=new Date(dateArray[1][1], dateArray[1][0], 0);
gridEndDate=(gridEndDate < endDate)?gridEndDate:endDate;
this.range=(gridEndDate.getYear() - gridStartDate.getYear())*12+(gridEndDate.getMonth() - gridStartDate.getMonth());
}
else
{
this.range=Math.ceil(Math.abs(dateArray[0]- dateArray[1]));
}
},
setEndDate:function(aod)
{
if(aod)
{
if(aod.indexOf('/') > -1)
{
this.grid.endDate=new Date(aod);
}
else
{
var year=parseInt(aod.substr(4), 10);
if(year < 100)
{
year+=year > 50?1900:2000;
}
this.grid.endDate=new Date(year, parseFloat(aod.substr(0,2))-1, parseFloat(aod.substr(2,2)) );
}
}
},
redraw:function()
{
var renderer,
chartContainer,
scrollContainer;
this._destroy();
this.initialize(this.renderer.id, this.originalConfig);
if(this.redrawData)
{
this.update(this.redrawData, this.redrawError, this.redrawURL );
}
renderer=this.renderer;
chartContainer=renderer?renderer.chartContainer:null;
scrollContainer=renderer?renderer.scrollContainer:null;
if(scrollContainer&&chartContainer)
{
chartContainer.style.overflow='';
this.contnrW=chartContainer.offsetWidth;
this.contnrH=chartContainer.offsetHeight;
}
},
update:function(data, error, url)
{
this.redrawData=data;
this.redrawError=error;
this.redrawURL=url;
if(this.width > 0)
{
if(data&&data.series&&data.series.length > 0)
{
this._update(data);
}
else if(!error)
{
error='NO_DATA';
}
if(error)
{
this.processErrorCode(error, this.url);
}
}
},
_update:function(data)
{
'use strict';
this.clear();
var grid=this.grid,
config=this.config,
processDataFunc,
error,
series,
seriesLength,
i;
if(grid)
{
grid.initGrid();
}
if(this.config.processDataFunc )
{
processDataFunc=eval(config.processDataFunc);
this.data=processDataFunc(data);
}
else
{
this.data=this.processData(data);
}
this.createSeries(this.data, config);
if(grid)
{
this.setMaxAndMin();
error=this.checkGridErrors(this.data);
if(error)
{
this.showError(this.errorText, this.errorCss, this.errorCoords);
return;
}
else
{
this._renderGridAndSeries();
}
}
else
{
series=this.series;
seriesLength=series.length;
error=false;
for(i=0;i< seriesLength;i++)
{
error=series[i].checkAndHandleErrors();
if(!error)
{
series[i].draw();
}
else
{
if(error===cbd.charting.FATAL_ERROR)
{
return;
}
}
}
}
if(config.legend )
{
this.drawLegend();
this._adjustContainerForLegend();
}
if(config.aod)
{
this.addAsOfDate();
}
if(config.toolTip )
{
this.buildToolTip();
}
if(config.onRender)
{
config.onRender(this.contentNode);
}
},
_adjustContainerForLegend:function()
{
'use strict';
var container=this.renderer.chartContainer,
containerPos=cbd.adapter.getPosition(container),
containerBottom=containerPos.y+cbd.adapter.getHeight(container),
legend=cbd.adapter.getElement({cssClass:'chartLegend', node:container, tag:'div'}),
diff='',
legendPos, legendBottom;
if(legend)
{
legendPos=cbd.adapter.getPosition(legend);
legendBottom=legendPos.y+cbd.adapter.getHeight(legend);
if(legendBottom > containerBottom)
{
diff=legendBottom - containerBottom+'px';
}
}
cbd.adapter.setStyle(container, 'margin-bottom', diff);
},
_renderGridAndSeries:function()
{
'use strict';
var config=this.config,
grid=this.grid,
chartCSS=this.chartCSS||'gridChart',
chartAttributes={
height:this.height,
width:this.width,
contentNode:this.contentNode,
chartCSS:chartCSS
};
grid.setUpGrid(chartAttributes);
grid.drawBackGround();
grid.drawTitles();
if(config.grid.drawOnTop)
{
this.drawSeries();
}
grid.drawGrid();
grid.drawXAxis();
grid.drawYAxis();
if(!config.grid.drawOnTop)
{
this.drawSeries();
}
grid.renderAxisLabels();
this.renderer.enableScrolling();
},
updateAttr:function(key, value)
{
if(key=='url'||key=='values')
{
var newVal=key+'='+value;
this.loadData(newVal, this.loadType, this.config.chartType);
}
},
processData:function(data)
{
this.asOfDate=data.aod;
if(this.grid)
{
this.setEndDate(data.aod);
this.setRange(data.range);
if(data.labels&&data.labels.xAxis)
{
this.grid.xAxis.labels=data.labels.xAxis;
}
}
return data;
},
checkGridErrors:function(data)
{
var error=false;
if(data['range']&&(isNaN(this.range)||this.range <=0) )
{
error=true;
}
if(!(this.grid.xAxis.noPts > 0&&this.grid.xAxis.range > 0&&this.grid.yAxis.range > 0))
{
error=true;
}
return error;
},
createSeries:function(data, config)
{
this.series=[];
var seriesData=data.series,
seriesLength=seriesData.length;
for(var i=0;i < seriesLength;i++)
{
var dataArray=seriesData[i].data;
if(this.range&&dataArray.length > this.range+1)
{
seriesData[i].data=dataArray.slice(dataArray.length - this.range - 1);
}
this.registerSeries(seriesData[i], config);
}
},
registerSeries:function(seriesData, config)
{
'use strict';
var series,
grid=this.grid,
configSeries=config.series,
renderer=this.renderer,
seriesLength=this.series.length,
chartType=seriesData.chartType?seriesData.chartType:config.chartType;
if(!configSeries)
{
configSeries={};
}
if(!configSeries.colors)
{
configSeries.colors=cbd.charting.colors.slice(0);
}
switch(chartType)
{
case 'pie':
series=new cbd.charting.Pie(renderer, config.margins, seriesData, configSeries, seriesLength);
this.lastRegisteredPie=series;
break;
case 'pieWeight':
series=new cbd.charting.PieWeight(renderer, config.margins, seriesData, configSeries, seriesLength, this.lastRegisteredPie);
break;
case 'line':
series=new cbd.charting.Line(renderer, grid, seriesData, configSeries, seriesLength);
break;
case 'dashedLine':
series=new cbd.charting.DashedLine(renderer, grid, seriesData, configSeries, seriesLength);
break;
case 'verticalBar':
series=new cbd.charting.VerticalBar(renderer, grid, seriesData, configSeries, seriesLength);
break;
case 'stackedBar':
series=new cbd.charting.StackedBar(renderer, grid, seriesData, configSeries, seriesLength);
break;
case 'horizontalBar':
series=new cbd.charting.HorizontalBar(renderer, grid, seriesData, configSeries, seriesLength);
break;
case 'scatterPlot':
series=new cbd.charting.ScatterPlot(renderer, grid, seriesData, configSeries, seriesLength);
break;
}
this.series.push(series);
},
drawSeries:function()
{
var series=this.series,
seriesLength=this.series.length;
for(var i=0;i< seriesLength;i++)
{
series[i].draw();
}
},
getLegendEntries:function()
{
var entries=[],
legendConfig=this.config.legend,
format=legendConfig.format,
layout=legendConfig.layout,
precision=legendConfig.precision,
series=this.series,
seriesLength=series.length;
for(var i=0;i < seriesLength;i++)
{
var seriesEntries=series[i].getLegendEntries(layout, format, precision);
if(seriesEntries)
{
entries=entries.concat(seriesEntries );
}
}
return entries;
},
drawLegend:function()
{
var legendConfig=this.config.legend,
position=legendConfig.pos||'bottom',
positionClass=(legendConfig.pos==='right')?'legendPosRight':'legendPosBottom',
alignmentClass=(legendConfig.align==='horizontal')?'legendAlignHorizontal':'legendAlignVertical',
legendHtml='<table class=\"'+positionClass+' '+alignmentClass+'\" ',
legendEntries=this.getLegendEntries(),
legendPx=this.getLegendPos(legendConfig),
opts;
legendHtml=legendHtml+'style=\"'+this.getMarginStyles(legendConfig.margins)+'\">';
if(legendEntries.length > 0)
{
legendHtml+=this._buildHtmlRows(legendEntries, legendConfig, legendConfig.header, legendConfig.footer);
legendHtml+='</table>';
opts={text:legendHtml, x:legendPx.x, y:legendPx.y, align:'left', cssClass:'chartLegend', position:position};
this.renderer.addLabel(opts, 'legend');
this.renderer.drawLabels('legend');
}
},
getMarginStyles:function(margins)
{
'use strict';
var style='',
margin;
if(margins)
{
for(margin in margins)
{
style=style+'margin-'+margin+':'+margins[margin]+'px;';
}
}
return style;
},
buildToolTip:function()
{
'use strict';
var toolTip=this.config.toolTip,
grid=this.grid,
maxPix=grid&&grid.getMaxPix(),
minPix=grid&&grid.getMinPix();
if(grid)
{
toolTip.boundary=this.renderer.getChartBoundary(minPix, maxPix);
if(toolTip.type==='fixed')
{
toolTip.boundary.left -=grid.margins.left;
toolTip.boundary.right -=grid.margins.left;
}
}
this.renderer.createToolTip({toolTipConfig:toolTip, toolTipCount:this.series.length});
this.toolTipSeries=this._getOrderedSeries('toolTipOrder');
if(!isNaN(toolTip.defaultIndex) )
{
this.openToolTipAtIndex(toolTip.defaultIndex);
}
},
_getOrderedSeries:function(orderAttr)
{
var toolTipSeries=[],
series=this.series,
seriesLength=series.length;
for(var i=0;i < seriesLength;i++)
{
if(isNaN(series[i][orderAttr]) )
{
return series;
}
else
{
toolTipSeries[series[i][orderAttr]]=series[i];
}
}
return toolTipSeries;
},
_buildHtmlRows:function(entries, config, header, footer, index)
{
var rowsHtml='',
numberOfRows=entries.length,
numberOfColumns=entries[0].fields.length+1,
layout=config.layout;
if(header )
{
rowsHtml+=this._buildHtmlTableRegion(numberOfColumns, header, index);
}
rowsHtml+='<tr class=\"chartRow0\">';
for(var i=0;i < numberOfRows;i++)
{
var legendCell=entries[i],
cellFields=legendCell.fields,
numOfFields=cellFields.length;
if(!config||(i!=0&&config.align!='horizontal') )
{
var rowStyle='chartRow'+i;
if(i==numberOfRows-1 )
{
rowStyle='lastRow '+rowStyle;
}
rowsHtml+='</tr><tr class=\"'+rowStyle+'\">';
}
if(config.showKey==undefined||config.showKey )
{
var colorDiv=this.buildLegendKey(legendCell.color);
rowsHtml+='<td class=\"chartInfoKeyTD\">'+colorDiv+'</td>';
}
for(var j=0;j < numOfFields;j++)
{
var cellStyle='chartInfoLabel label'+j;
if(layout&&layout[j]==='%percent')
{
cellStyle+=' percentLabel';
}
rowsHtml+='<td class=\"'+cellStyle+'\">'+cellFields[j]+'</td>';
}
}
rowsHtml+='</tr>';
if(footer )
{
rowsHtml+=this._buildHtmlTableRegion(numberOfColumns, footer, index);
}
return rowsHtml;
},
getLegendPos:function(legendConfig)
{
var x,
y,
pie,
grid=this.grid;
if(!grid)
{
pie=this.series[0];
}
if(legendConfig&&legendConfig.x&&legendConfig.y)
{
x=parseFloat(legendConfig.x);
y=parseFloat(legendConfig.y);
}
else if(legendConfig&&legendConfig.pos==='right' )
{
if(!grid&&pie)
{
x=pie.center.x+pie.radius;
y=pie.center.y - pie.radius;
}
else
{
x=grid.x+grid.w;
y=grid.margins.top;
}
}
else
{
if(grid)
{
x=grid.margins.left;
y=grid.y+grid.h+grid.xAxis.tickLength;
}
else if(pie)
{
y=pie.center.y+pie.radius;
x=pie.center.x - pie.radius;
}
}
return{x:x, y:y};
},
getCircleFormatValue:function(val)
{
'use strict';
if(val >=360)
{
return val % 360;
}
else
{
return val;
}
},
buildLegendKey:function(key)
{
var colorDiv='',
dimensions,
diameter,
style;
if(key instanceof Object )
{
if(key.pattern==='dashed')
{
colorDiv+='<div class=\"chartInfoKey\"><div class=\"chartDashedKey\" style=\"border-color:'+key.color+';\"/>';
}
else if(key.pattern==='diamond')
{
diameter=key.radius*2;
dimensions=Math.sqrt(Math.pow(diameter, 2)/2);
if(ieQuirksMode)
{
style='border:'+key.strokeWidth+'px solid '+key.strokeColor+';'+
'background-color:'+key.color;
}
else
{
style='border:'+key.strokeWidth+'px solid '+key.strokeColor+';'+
'width:'+dimensions+'px;height:'+dimensions+'px;'+
'background-color:'+key.color;
}
colorDiv+='<div class=\"chartDiamondKey chartInfoKey\" style=\"'+style+'\"/>';
}
else if(key.pattern==='circle')
{
diameter=key.radius*2;
if(ieQuirksMode)
{
style='background-color:'+key.color+';';
}
else
{
style='background-color:'+key.color+';'+'width:'+diameter+'px;height:'+diameter+'px;';
}
colorDiv+='<div class=\"chartCircleKey chartInfoKey\" style=\"'+style+
'\"/>';
}
}
else
{
colorDiv+='<div class=\"chartInfoKey\" style=\"background-color:'+key+';\">';
}
colorDiv+='&nbsp;</div>';
return colorDiv;
},
addAsOfDate:function()
{
var date=this.asOfDate;
if(this.config.aod.format&&date instanceof Date)
{
date=cbd.charting._formatDate(date, this.config.aod.format);
}
var aodDiv='<div class=\"chartAOD\">'+date+'</div>';
var pos=this.positionAsOfDate(this.config.aod);
var opts={text:aodDiv, x:pos.x, y:pos.y, w:pos.w, align:pos.align, cssClass:'chartAOD'};
this.renderer.addLabel(opts, 'aod');
this.renderer.drawLabels('aod');
},
positionAsOfDate:function(config)
{
var pos={x:10, y:0, w:this.width - 10 - this.config.margins.right};
if(config.pos=='left')
{
pos.align='left';
}
else
{
pos.align='right';
}
return pos;
},
renderLabels:function(divId)
{
this.renderer.drawLabels(divId);
},
_handleToolTip:function(ev)
{
var eventPos=this.renderer.getEventPosition(ev);
this.touchStartPos=eventPos;
this.openToolTipAt(eventPos);
},
_handleToolTipDrag:function(ev)
{
var eventPos=this.renderer.getEventPosition(ev),
touchStartX=this.touchStartPos.x,
touchStartY=this.touchStartPos.y,
currentXPosition=eventPos.x,
currentYPosition=eventPos.y,
distanceX=Math.abs(currentXPosition - touchStartX),
distanceY=Math.abs(currentYPosition - touchStartY),
gestureThreshold=15,
dragHorizontal=true;
if((!this.renderer.isScrollingChart)&&(distanceX > distanceY))
{
ev.preventDefault();
}
if(distanceX < gestureThreshold&&distanceY < gestureThreshold)
{
dragHorizontal=distanceX > distanceY;
}
if(dragHorizontal )
{
this.openToolTipAt(eventPos);
}
},
openToolTipAt:function(pix)
{
var toolTipConfig=this.config.toolTip,
config={data:[], pos:null},
ttLength=this.toolTipSeries.length, seriesConfig,
i;
for(i=0;i < ttLength;i++)
{
seriesConfig=this.toolTipSeries[i].getToolTipConfig(pix, toolTipConfig);
this._setupToolTipConfig(seriesConfig, config, toolTipConfig.type);
}
this._buildHoverState(config, toolTipConfig);
},
openToolTipAtIndex:function(index)
{
var toolTipConfig=this.config.toolTip,
config={data:[], pos:null},
ttLength=this.toolTipSeries.length, seriesConfig, i;
for(i=0;i < ttLength;i++)
{
seriesConfig=this.toolTipSeries[i].getToolTipConfigByIndex(index, toolTipConfig);
this._setupToolTipConfig(seriesConfig, config, toolTipConfig.type);
}
this._buildHoverState(config, toolTipConfig);
},
_hasToolTipChanged:function(config, toolTipConfig)
{
var prevConfig=toolTipConfig.currentConfig;
if(!prevConfig )
{
return true;
}
var hasPosChanged;
if(prevConfig.pos&&config.pos )
{
hasPosChanged=prevConfig.pos[0].x!==config.pos[0].x||prevConfig.pos[0].y!==config.pos[0].y;
}
else if(!prevConfig.pos&&!config.pos )
{
hasPosChanged=false;
}
else
{
hasPosChanged=true;
}
return	hasPosChanged||
prevConfig.index!==config.index||
prevConfig.orientation!==config.orientation;
},
_setupToolTipConfig:function(seriesConfig, config, type )
{
var adapter=cbd.adapter;
if(seriesConfig )
{
config.data=config.data.concat(seriesConfig.data);
if(!config.pos)
{
config.pos=[];
}
if(type==='individual')
{
config.crosses=false;
adapter.handleEachItem(config.pos, function(pos){
if(pos.y===seriesConfig.pos.y)
{
config.crosses=true;
}
});
config.pos.push(seriesConfig.pos);
}
else if(config.pos[0]===undefined||seriesConfig.pos&&seriesConfig.pos.y < config.pos[0].y )
{
config.pos[0]=seriesConfig.pos;
}
config.orientation=seriesConfig.orientation;
config.header=seriesConfig.header;
config.footer=seriesConfig.footer;
config.index=seriesConfig.index;
}
},
_buildHoverState:function(seriesConfig, toolTipConfig)
{
var callbackJSON, afterCallback;
if(this._hasToolTipChanged(seriesConfig, toolTipConfig) )
{
toolTipConfig.currentConfig=seriesConfig;
callbackJSON=toolTipConfig.callback;
if(callbackJSON&&callbackJSON.before )
{
callbackJSON.before(seriesConfig);
}
this._buildToolTip(seriesConfig, toolTipConfig );
this._drawHoverIndicators(seriesConfig, toolTipConfig );
if(callbackJSON )
{
afterCallback=callbackJSON.after?callbackJSON.after:callbackJSON;
if(typeof afterCallback==='function' )
{
afterCallback(seriesConfig);
}
}
}
else
{
this.renderer.resetUndrawnLabels(cbd.charting.TOOL_TIP_DIV_ID);
}
},
_buildIndividualToolTipContent:function(data, config, header, footer, index)
{
var innerHtml='<table>';
innerHtml+=this._buildHtmlRows(data, config, header, footer, index);
innerHtml+='</table>';
return innerHtml
},
_buildToolTipContent:function(series, config, header, footer, index)
{
var content=[], data=series.data, length=data.length, i;
if(config.type!=='individual'||config.pos||series.crosses)
{
content.push(this._buildIndividualToolTipContent(data, config, header, footer, index));
}
else
{
for(i=0;i < length;i++)
{
content.push(this._buildIndividualToolTipContent([data[i]], config, header, footer, index));
}
}
return content;
},
_buildToolTip:function(seriesConfig, toolTipConfig)
{
var ttPos=toolTipConfig.pos,
index=seriesConfig.index,
position;
if(toolTipConfig.show!=false&&!isNaN(index) )
{
position=seriesConfig.pos;
if(toolTipConfig.type==='fixed' )
{
position=null;
}
else
{
if(toolTipConfig.bar==='range')
{
if(!isNaN(toolTipConfig.dataIndex))
{
position[0].x=this.grid.getPix({x:toolTipConfig.dataIndex,y:0}).x;
}
if(seriesConfig.orientation==='right')
{
toolTipConfig.barWidth=toolTipConfig.barWidth||this._getRangeBarWidth();
position[0].x+=toolTipConfig.barWidth;
}
}
if(ttPos)
{
position[0].y=ttPos.y||position[0].y;
position[0].x=ttPos.x?this.grid.getPix({x:ttPos.x,y:0}).x:position[0].x;
}
}
this.renderer.openToolTip(
{
innerHtml:this._buildToolTipContent(seriesConfig, toolTipConfig, seriesConfig.header, seriesConfig.footer, index),
location:position,
position:seriesConfig.orientation,
index:Math.floor(index),
orientation:toolTipConfig.orientation
});
}
else if(!toolTipConfig.persistent )
{
this.renderer.closeToolTip(Math.floor(index));
this.renderer.clearLabels(cbd.charting.TOOL_TIP_DIV_ID, true);
}
},
_buildHtmlTableRegion:function(numberOfColumns, region, index)
{
'use strict';
var regionText=region.value,
style=region.cssClass||'chartToolTipTitle chartTableTitle',
html='<tr><td colspan="'+numberOfColumns+'" class="'+style+'">',
displayDate,
endDate;
if(regionText.indexOf('%date') > -1 )
{
displayDate=this.grid.getAxisDate(index);
endDate=this.grid.endDate;
if(endDate&&(displayDate.getTime() > endDate.getTime()))
{
displayDate=endDate;
}
displayDate=cbd.charting._formatDate(displayDate, region.format);
regionText=regionText.replace('%date', displayDate);
}
html+=regionText;
html+='</td></tr>';
return html;
},
_drawHoverIndicators:function(seriesConfig, toolTipConfig)
{
var barType=toolTipConfig.bar,
index=seriesConfig.index;
if(!isNaN(index) )
{
if(toolTipConfig.bar )
{
this._addToolTipBar(seriesConfig.pos[0], toolTipConfig);
}
if(barType!=='origin')
{
this.renderer.clearLabels(cbd.charting.TOOL_TIP_DIV_ID, true);
}
this.renderer.drawLabels(cbd.charting.TOOL_TIP_DIV_ID, Math.floor(index));
}
},
_addToolTipBar:function(point, toolTipConfig )
{
var grid=this.grid,
max=grid.getMaxPix(),
min=grid.getMinPix(),
barType=toolTipConfig.bar,
colors=toolTipConfig.barColors,
cssClass='rangeBar',
borderWidth=toolTipConfig.barBorderWidth,
hexColor=null,
backgroundColor=null,
opacity=null,
borderColor=null,
dataIndex=toolTipConfig.dataIndex,
x, w, opts;
colors=colors||[];
if(barType==='point' )
{
x=point.x-1;
w=3;
}
else if(barType==='range' )
{
w=toolTipConfig.barWith||this._getRangeBarWidth();
if(!isNaN(dataIndex))
{
x=grid.getPix({x:toolTipConfig.dataIndex,y:0}).x - this.grid.margins.left;
}
else
{
x=point.x;
}
hexColor=(colors.length > 0)?colors[0]:null;
}
else if(barType==='origin')
{
x=min.x;
w=point.x+1;
cssClass='originBar';
hexColor=(colors.length > 0)?colors[0]:null;
borderColor=(colors.length > 1)?colors[1]:hexColor;
}
if(!ieQuirksMode&&hexColor)
{
if(/^#[0-9A-Fa-f]{6}$/.test(hexColor))
{
backgroundColor='rgba('+['0x'+hexColor[1]+hexColor[2]|0, '0x'+hexColor[3]+hexColor[4]|0, '0x'+hexColor[5]+hexColor[6]|0]+', 0.3)';
}
else if(/^#[0-9A-Fa-f]{3}$/.test(hexColor))
{
backgroundColor='rgba('+['0x'+hexColor[1]+hexColor[1]|0, '0x'+hexColor[2]+hexColor[2]|0, '0x'+hexColor[3]+hexColor[3]|0]+', 0.3)';
}
else
{
backgroundColor=hexColor;
opacity=0.3;
}
}
if(ieQuirksMode)
{
backgroundColor=null;
}
opts={
x:x,
y:max.y,
w:w,
h:min.y-max.y,
text:'&nbsp',
cssClass:cssClass,
barType:barType,
backgroundColor:backgroundColor,
borderColor:borderColor,
borderWidth:borderWidth,
opacity:opacity
};
if(barType==='origin' )
{
this.renderer.drawOriginBar(opts, cbd.charting.TOOL_TIP_DIV_ID);
}
else
{
this.renderer.addLabel(opts, cbd.charting.TOOL_TIP_DIV_ID);
}
},
_getRangeBarWidth:function()
{
var grid=this.grid,
min=grid.getMinPix(),
point1=grid.getPix({x:1,y:0});
return point1.x - min.x;
},
processErrorCode:function(errCode)
{
if(this.config.chartType=='pie')
{
var pie=new cbd.charting.Pie(this.renderer,{}, this.config.series, 0);
pie.renderError();
return;
}
this.showError(this.errorText, this.errorCss, this.errorCoords);
},
clearErrors:function()
{
this.renderer.clearLabels(cbd.charting.errorDivId);
},
showError:function(errorText, errorCss, errorCoords, dontClear)
{
this.clearErrors();
this.renderer.setError(true);
if(!dontClear)
{
this.clear();
}
if(!errorText)
{
errorText=cbd.charting.defaultError;
}
if(!errorCss)
{
errorCss=this.errorCss;
}
if(!errorCss)
{
errorCss=cbd.charting.errorCss;
}
var canvasW=parseFloat(this.width);
var canvasH=parseFloat(this.height);
if(!errorCoords)
{
errorCoords={};
errorCoords.w=253;
if(canvasW < errorCoords.w)
{
errorCoords.w=canvasW - 10;
}
errorCoords.h=40;
}
if(isNaN(errorCoords.y)||errorCoords.y==null)
{
errorCoords.y=canvasH/2-errorCoords.h/2;
}
if(isNaN(errorCoords.x)||errorCoords.y==null)
{
errorCoords.x=canvasW/2-errorCoords.w/2;
}
var opts={text:errorText, w:errorCoords.w, x:errorCoords.x, y:errorCoords.y, cssClass:errorCss};
this.renderer.addLabel(opts, cbd.charting.errorDivId);
this.renderLabels(cbd.charting.errorDivId);
},
_destroy:function()
{
var id=this.id,
i,
adapter=cbd.adapter;
adapter.removeEventListener({node:window, id:id+'Clear', event:adapter.getEventName('BROWSER_RESIZE_START')});
adapter.removeEventListener({node:window, id:id+'Redraw', event:adapter.getEventName('BROWSER_RESIZE_END')});
for(i in this.series)
{
if(this.series.hasOwnProperty(i))
{
this.series[i].destroy();
}
}
this.renderer.destroy();
}
};
}(window.cbdcommon&&cbdcommon.screen, window.ieQuirksMode));
(function(ieQuirksMode){
cbd.charting.Grid=function(renderer, opt, height)
{
opt.x=opt.margins.left;
opt.y=opt.margins.top;
opt.h=opt.h||height;
opt.h -=(opt.margins.top+opt.margins.bottom);
this.renderer=renderer;
this.id=renderer.id;
this.labelsCss='chartLabel';
this.titleCss='chartTitle';
this.config=opt;
};
cbd.charting.Grid.defaultGrid={drawOnTop:false, gridLineColor:'#CCCCCC', bgColor:'white', borderColor:null, borderSize:1, gridBgColor:'white', lineOffset:0};
cbd.charting.Grid.defaultGrid.xAxis={axis:'x', max:Number.NEGATIVE_INFINITY, min:Number.POSITIVE_INFINITY, origin:0, intervals:-1, delta:null, ticksOnAxis:'min', showGrid:true, showOrigin:true, originColor:'#999999', showAxis:true, axisColor:'#CCCCCC', showTicks:true, showLabels:true, firstTickOffset:0, labelPos:'tickmark', labels:[], tickLength:3, labelInterval:1, _labelPosOffset:4};
cbd.charting.Grid.defaultGrid.yAxis={axis:'y', max:Number.NEGATIVE_INFINITY, min:Number.POSITIVE_INFINITY, origin:0, intervals:-1, minIntervals:3, maxIntervals:4, delta:null, showGrid:false, showOrigin:false, originColor:'#999999', showAxis:true, axisColor:'#CCCCCC', showTicks:true, showLabels:true, firstTickOffset:0, labelPos:'tickmark', tickLength:3, formatFirstAndLast:true};
cbd.charting.Grid.prototype=
{
initGrid:function()
{
cbd.adapter.deepAttach(this, cbd.charting.Grid.defaultGrid );
cbd.adapter.deepAttach(this, this.config );
this.maxp=null;
this.minp=null;
this.originP=null;
},
setUpGrid:function(chartAttributes)
{
var margins=this.margins;
this.setUpYAxis();
if(margins.left==='auto')
{
this.calculateLeftMargin();
}
if(margins.right==='auto')
{
this.calculateRightMargin();
}
this.calculateLeftPadding();
this.padding.right=1;
if(!this.w)
{
boxWidth=chartAttributes.width - margins.left - margins.right;
this.w=boxWidth - this.padding.left - this.padding.right;
}
else
{
boxWidth=parseInt(this.w, 10)+this.padding.left+this.padding.right;
}
this.setUpXAxis();
this.renderer.initialize(chartAttributes.contentNode, boxWidth,{left:margins.left, right:margins.right}, chartAttributes.height, chartAttributes.chartCSS);
},
setUpYAxis:function()
{
var yAxis=this.yAxis,
intervals;
if(yAxis.delta )
{
intervals=(yAxis.max - yAxis.min)/yAxis.delta;
yAxis.intervals=intervals.toFixed(6);
}
else
{
if(yAxis.intervals < 0)
{
this.calculateDelta(yAxis, this.h);
}
else
{
yAxis.delta=Math.abs(yAxis.max - yAxis.min)/yAxis.intervals;
}
}
if(this.dualAxis )
{
this.initDualAxis();
}
},
setUpXAxis:function()
{
var xAxis=this.xAxis,
month,
year,
endOfNextMonth,
lastDayOfNextMonth,
nextMonth;
if(this.hasTimeType(xAxis))
{
if(this.endDate&&!this.startDate)
{
if(xAxis.type=='timeRange' )
{
month=this.endDate.getMonth();
year=this.endDate.getFullYear();
nextMonth=(month===11)?0:month+1;
if(month===11)
{
year=year+1;
}
endOfNextMonth=new Date(year, nextMonth+1, 0);
lastDayOfNextMonth=endOfNextMonth.getDate();
if(this.endDate.getDate() > lastDayOfNextMonth)
{
this.endDate=endOfNextMonth;
}
else
{
this.endDate.setMonth(this.endDate.getMonth()+1);
}
}
this.startDate=this.getFirstPointFromEndDate(this.endDate, xAxis.range - Math.ceil(this.lineOffset));
}
}
if(this.xAxis.showAllLabels&&xAxis.labels&&xAxis.labels.length > 0)
{
xAxis.intervals=xAxis.labels.length;
xAxis.max=Math.ceil(xAxis.max/xAxis.intervals)*xAxis.intervals;
xAxis.range=xAxis.max - xAxis.min;
}
if(xAxis.delta )
{
var intervals=(xAxis.max - xAxis.min)/xAxis.delta;
xAxis.intervals=intervals.toFixed(6);
}
else
{
if(xAxis.intervals > -1)
{
xAxis.delta=Math.abs(xAxis.max - xAxis.min)/xAxis.intervals;
}
else if(this.hasTimeType(xAxis))
{
this.configTimeSeries(xAxis);
}
else
{
this.calculateDelta(xAxis, this.w);
}
}
},
configTimeSeries:function(axis)
{
'use strict';
var range=parseInt(axis.range, 10),
isPrime=this.isPrime(range),
remainder;
if(!axis.labelInterval)
{
axis.labelInterval=1;
}
if(!axis.maxTicks||axis.maxTicks < 1)
{
axis.maxTicks=Math.floor(this.w/MIN_DIST_BETWEEN_LABELS);
}
axis.delta=axis.maxTicks!==0?Math.ceil(Math.abs(axis.max - axis.min)/axis.maxTicks):range;
if(!isPrime&&axis.forceEndLabels!==false)
{
while(range % axis.delta!==0)
{
axis.delta++;
}
}
axis.intervals=Math.floor((axis.max - axis.min)/axis.delta);
if(axis.delta!==range&&(this.w <=axis.forceToTwoLabelsWidth||this.hasLessThanThreeLabels(axis, isPrime)))
{
axis.delta=range;
axis.intervals=1;
}
if(this.startDate&&axis.unit==='month'&&this.isYearOnlyFormat(axis)&&range > MIN_YEAR_COUNT&&axis.delta!==range)
{
remainder=(this.startDate.getMonth()) % 12;
axis.firstTickOffset=(remainder)?(Math.abs(12 - remainder)):0;
axis.delta=12;
axis.intervals=Math.floor((axis.max - axis.min)/axis.delta);
}
},
hasLessThanThreeLabels:function(axis, isPrime)
{
return isPrime&&axis.intervals < 2;
},
isPrime:function(num)
{
'use strict';
var i, result=true,
currentNum=parseInt(Math.sqrt(num), 10);
if(num<2)
{
result=false;
}
for(i=2;result&&i<=currentNum;i++)
{
if(num % i===0)
{
result=false;
break;
}
}
return result;
},
hasTimeType:function(axis)
{
return axis.type=='time'||axis.type=='timeRange';
},
isYearOnlyFormat:function(axis)
{
var format=axis.format;
if(format )
{
return(format.toLowerCase().indexOf('%m')==-1&&format.toLowerCase().indexOf('%y') > -1);
}
return false;
},
getFirstPointFromEndDate:function(endPt,range)
{
var f={month:0, year:0};
f.month=endPt.getMonth() - range%12;
f.year=endPt.getFullYear() - Math.floor(range/12);
if(f.month < 0)
{
f.year -=1;
f.month+=12;
}
var start=new Date(f.year, f.month, endPt.getDate());
if(start.getMonth()!=f.month)
{
start=new Date(f.year, f.month+1, 0);
}
return start;
},
calculateDelta:function(obj, size)
{
var realMax=obj.max;
var realMin=obj.min;
var log10Distance=Math.log(obj.range)/Math.log(10);
obj.delta=Math.pow(10, Math.ceil(log10Distance)-1);
obj.range=Math.abs(realMax - realMin);
if(obj.range <=0)
{
obj.max+=10;
}
var numOfIntervals=Math.round(obj.range/obj.delta);
var hasBeenHalved=false;
if(numOfIntervals < obj.minIntervals )
{
obj.delta/=2;
hasBeenHalved=true;
}
else if(numOfIntervals > obj.maxIntervals )
{
obj.delta*=2;
}
this.calculateMaxAndMinFromDelta(obj);
numOfIntervals=Math.round(obj.range/obj.delta);
var deltaPx=size/numOfIntervals;
if(deltaPx < 25 )
{
obj.delta=hasBeenHalved?obj.delta*2:obj.delta*2.5;
obj.max=realMax;
obj.min=realMin;
this.calculateMaxAndMinFromDelta(obj);
}
},
calculateMaxAndMinFromDelta:function(obj)
{
if(isNaN(obj.precision))
{
obj.precision=cbd.charting._getPrecision(obj.delta, 0);
}
var maxIndex=Math.ceil(obj.max/obj.delta);
var minIndex=Math.floor(obj.min/obj.delta);
obj.min=minIndex*obj.delta;
obj.max=obj.min+(maxIndex - minIndex)*obj.delta;
var intervals=(obj.max - obj.min)/obj.delta;
obj.intervals=intervals.toFixed(6);
obj.range=obj.max - obj.min;
},
calculateLeftMargin:function()
{
'use strict';
var titleWidth=this.measureTitle(this.yAxis),
labelWidth=this.measureLabels(),
gridOffset=labelWidth,
yAxis=this.yAxis;
this.x=labelWidth;
if(yAxis.titlePosition!=='top')
{
this.x+=titleWidth;
gridOffset+=titleWidth;
}
this.margins.left=gridOffset;
return this.x;
},
calculateLeftPadding:function()
{
'use strict';
var padding=0,
yAxis=this.yAxis;
if(yAxis.showTicks)
{
padding=yAxis.tickLength;
}
this.padding={};
this.padding.left=padding;
this.x+=padding;
return padding;
},
calculateRightMargin:function()
{
var rightMargin,
titleWidth,
labelWidth;
if(this.dualAxis )
{
titleWidth=this.measureTitle(this.dualAxis);
labelWidth=this.measureLabels(true);
rightMargin=labelWidth+this.dualAxis.tickLength+titleWidth;
}
else
{
rightMargin=15;
}
this.margins.right=rightMargin;
return rightMargin;
},
measureTitle:function(axis)
{
'use strict';
var titleWidth=0,
text,
size,
IE9_ROUNDING_BUFFER=1;
if(axis.title )
{
text=cbd.charting._getDivHtml(axis.title, this.getAxisTitleCSS(axis) );
size=cbd.charting._estimateDimensions(this.id, text, cbd.charting.yAxisLabelDivId);
if(axis.verticalTitle )
{
titleWidth=size.h;
if(ieQuirksMode )
{
titleWidth -=5;
}
}
else
{
titleWidth=size.w;
}
}
return titleWidth+IE9_ROUNDING_BUFFER;
},
measureLabels:function(isDualAxis )
{
var dummyLabels=[],
yAxis=this.yAxis,
axis=yAxis,
val=yAxis.min,
tickIndex=0,
text;
if(isDualAxis )
{
axis=this.dualAxis;
}
while(val <=yAxis.max)
{
if(axis.labels&&axis.labels.length > 0)
{
text=(axis.labels[tickIndex]!==undefined)?axis.labels[tickIndex]:'';
}
else
{
text=this.formatLabel(val, axis, tickIndex);
}
text=cbd.charting._getDivHtml(text, this.labelsCss);
dummyLabels.push(text);
val+=yAxis.delta;
tickIndex++;
}
return cbd.charting._estimateMaxWidth(this.id, dummyLabels.join(''), cbd.charting.yAxisLabelDivId);
},
getOriginPx:function()
{
if(!this.originP)
{
var yAxis=this.yAxis;
var xAxis=this.xAxis;
var originX=xAxis.min > xAxis.origin?xAxis.min:xAxis.origin;
var originY=yAxis.min > yAxis.origin?yAxis.min:yAxis.origin;
this.originP=this.getPix({x:originX,y:originY});
}
return this.originP;
},
getMaxPix:function()
{
if(!this.maxp)
{
this.maxp=this.getPix({x:this.xAxis.max, y:this.yAxis.max});
}
return this.maxp;
},
getMinPix:function()
{
if(!this.minp)
{
this.minp=this.getPix({x:this.xAxis.min, y:this.yAxis.min});
}
return this.minp;
},
getPix:function(val)
{
var pix={},
xAxis=this.xAxis,
yAxis=this.yAxis;
pix.x=(val.x - xAxis.min)/(xAxis.max - xAxis.min)*this.w+this.x;
pix.y=(this.h -(val.y - yAxis.min)/(yAxis.max - yAxis.min)*this.h)+this.y;
pix.x=Math.round(pix.x);
pix.y=Math.round(pix.y);
return pix;
},
getVal:function(pix)
{
var val={};
var xAxis=this.xAxis;
var yAxis=this.yAxis;
val.x=(pix.x - this.x)*(xAxis.max - xAxis.min)/this.w+xAxis.min;
val.y=-(pix.y - this.y - this.h)*(yAxis.max - yAxis.min)/this.h - yAxis.min;
return val;
},
drawTitles:function()
{
var maxPx, minPx, xPos, yPos, opts;
if(this.yAxis.title )
{
this.drawYAxisTitle(this.yAxis, cbd.charting.yAxisLabelDivId, 0);
}
if(this.xAxis.title )
{
maxPx=this.getMaxPix();
minPx=this.getMinPix();
xPos=(maxPx.x-minPx.x)/2;
yPos=minPx.y+22;
if(this.xAxis.titlePosition==='left')
{
xPos=minPx.x;
}
opts={text:this.xAxis.title, x:xPos, y:yPos, cssClass:this.titleCss};
this.renderer.addLabel(opts, cbd.charting.xAxisLabelDivId);
}
if(this.dualAxis&&this.dualAxis.title )
{
maxPx=this.getMaxPix();
xPos=maxPx.x+12;
this.drawYAxisTitle(this.dualAxis, cbd.charting.dualAxisTitleDivId, xPos);
this.renderer.drawLabels(cbd.charting.dualAxisTitleDivId);
}
},
drawYAxisTitle:function(axis, divId, xPos)
{
var maxPx=this.getMaxPix();
var minPx=this.getMinPix();
var text=cbd.charting._getDivHtml(axis.title, this.getAxisTitleCSS(axis));
var dimensions=cbd.charting._estimateDimensions(this.id, text, cbd.charting.yAxisLabelDivId);
var _h=dimensions.h;
var verticalOffset=-_h/2;
if(axis.verticalTitle )
{
if(ieQuirksMode )
{
verticalOffset=-dimensions.w/2;
}
else
{
verticalOffset=dimensions.w/2;
}
}
var yPos=(maxPx.y-minPx.y)/2+minPx.y+verticalOffset;
var xPos;
if(axis.titlePosition==='top')
{
xPos=minPx.x;
yPos=maxPx.y - 15;
}
var titleCss=this.getAxisTitleCSS(axis);
var opts={text:axis.title, x:xPos, y:yPos, w:dimensions.w, h:dimensions.h, cssClass:titleCss};
this.renderer.addLabel(opts, divId);
},
getAxisTitleCSS:function(axis)
{
var css=this.titleCss;
if(axis.verticalTitle )
{
if(ieQuirksMode )
{
css+=' ieQuirksVerticalText';
}
else
{
css+=' verticalText';
}
}
return css;
},
drawBackGround:function()
{
var opts={bkcolor:this.gridBgColor, bordercolor:this.borderColor, borderwidth:this.borderSize};
opts.xStart=this.x;
opts.yStart=this.y;
opts.width=this.w;
opts.height=this.h;
this.renderer.drawRect(opts);
},
drawGrid:function()
{
var start=this.getMinPix();
var end=this.getMaxPix();
var xAxis=this.xAxis;
var yAxis=this.yAxis;
var xIncrPix=xAxis.delta/xAxis.range*this.w;
var yIncrPix=yAxis.delta/yAxis.range*this.h;
var firstXOffset=xAxis.firstTickOffset/xAxis.range*this.w;
var posX=start.x+firstXOffset;
var posY=start.y;
var gridIndex=0;
var gridAtCounter=0;
while(Math.round(posY) >=end.y)
{
if(xAxis.gridAt==undefined||xAxis.gridAt[gridAtCounter]==gridIndex )
{
gridAtCounter++;
this.drawGridLines({x:start.x, y:posY}, 'x');
}
posY-=yIncrPix;
gridIndex++;
}
gridIndex=0;
gridAtCounter=0;
while(Math.round(posX) <=end.x)
{
if(yAxis.gridAt==undefined||yAxis.gridAt[gridAtCounter]==gridIndex )
{
gridAtCounter++;
this.drawGridLines({x:posX, y:start.y}, 'y');
}
posX+=xIncrPix;
gridIndex++;
}
},
initDualAxis:function()
{
this.dualAxis.axis='dualAxis';
this.dualAxis.intervals=this.yAxis.intervals;
this.dualAxis.tickLength=this.dualAxis.tickLength?this.dualAxis.tickLength:0;
},
drawXAxis:function()
{
var axis=this.xAxis,
start=this.getMinPix(),
end=this.getMaxPix(),
origin=this.getOriginPx(),
max, yPos, height, incrPix, firstOffset, val, pos, tickY,
tickColor, labelOffset, tickIndex, isLastTick, text, labelX,
labelRemainder;
if(axis.showOrigin)
{
this.renderer.drawGridXAxis({lineclr:axis.originColor, xStart:start.x, xEnd:end.x, y:origin.y});
}
if(axis.showAxis)
{
max=axis.ticksOnAxis==='max';
yPos=max?end.y:start.y;
height=max?this.margins.top:this.margins.bottom;
if(axis.backgroundColor)
{
var yStart=max?0:start.y;
var opts={width:end.x-start.x+1, xStart:start.x, yStart:yStart, height:height, bkcolor:axis.backgroundColor};
this.renderer.drawRect(opts);
}
if(axis.border)
{
this.drawXAxisBorder(axis, yPos, height, start, end);
}
this.renderer.drawGridXAxis({lineclr:axis.axisColor, xStart:start.x, xEnd:end.x, y:yPos});
}
incrPix=axis.delta/axis.range*this.w;
firstOffset=axis.firstTickOffset/axis.range*this.w;
val=axis.min+axis.firstTickOffset;
pos=start.x+firstOffset;
if(axis.ticksOnAxis )
{
tickY=axis.ticksOnAxis=='max'?end.y:start.y;
}
else
{
tickY=origin.y;
}
tickColor=axis.ticksOnAxis?axis.axisColor:axis.originColor;
labelOffset=axis.firstLabelOffset?axis.firstLabelOffset:0;
tickIndex=0;
while(val <=axis.max)
{
isLastTick=tickIndex==axis.intervals;
if(pos >=start.x&&!(axis.showLastTick!=true&&axis.type=='timeRange'&&isLastTick) )
{
this.drawTick({x:pos, y:tickY}, axis, tickColor);
labelRemainder=(tickIndex-labelOffset)%axis.labelInterval;
if(axis.showLabels&&labelRemainder==0 )
{
text=val;
if(this.hasTimeType(axis))
{
text=this.getAxisDate(val);
}
labelX=pos;
if(axis.labelPos=='midinterval')
{
labelX=pos+incrPix/2;
}
this.createLabel(axis, text,{x:labelX, y:start.y}, tickIndex, isLastTick);
}
}
pos+=incrPix;
val+=axis.delta;
tickIndex+=axis.unit==='unit'?axis.delta:1;
}
},
drawXAxisBorder:function(axis, yPos, height, start, end)
{
var opts, firstCorner, secondCorner;
var max=axis.ticksOnAxis==='max';
yPos=max?yPos - height+1:yPos;
var xTopLeft=start.x;
var topLeftCorner={xPos:xTopLeft, yPos:yPos};
var topRightCorner={xPos:end.x, yPos:yPos};
var bottomLeftCorner={xPos:xTopLeft, yPos:(yPos+height - 1)};
var bottomRightCorner={xPos:end.x, yPos:(yPos+height - 1)};
for(var position in axis.border)
{
if(position==='top')
{
firstCorner=topLeftCorner;
secondCorner=topRightCorner;
}
else if(position==='bottom')
{
firstCorner=bottomLeftCorner;
secondCorner=bottomRightCorner;
}
else if(position==='left')
{
firstCorner=topLeftCorner;
secondCorner=bottomLeftCorner;
}
else if(position==='right')
{
firstCorner=topRightCorner;
secondCorner=bottomRightCorner;
}
else
{
continue;
}
opts={xStart:firstCorner.xPos, xEnd:secondCorner.xPos, yStart:firstCorner.yPos, yEnd:secondCorner.yPos, linewidth:1, lineclr:axis.axisColor};
this.renderer.drawGridLine(opts);
}
},
getAxisDate:function(val)
{
var year=parseInt(this.startDate.getFullYear()+Math.floor((this.startDate.getMonth()+val)/12), 10),
month=(this.startDate.getMonth()+val)%12,
day=new Date(year, month+1, 1);
day=new Date(day-1).getDate();
return new Date(year, month, day);
},
drawYAxis:function()
{
var start=this.getMinPix();
var end=this.getMaxPix();
var axis=this.yAxis;
var origin=this.getOriginPx();
if(axis.showOrigin)
{
this.renderer.drawGridYAxis({lineclr:axis.originColor, yStart:start.y, yEnd:end.y, x:origin.x});
}
if(axis.showAxis)
{
this.renderer.drawGridYAxis({lineclr:axis.axisColor, yStart:start.y, yEnd:end.y, x:start.x});
}
var incrPix=axis.delta/axis.range*this.h;
var pos=start.y;
var val=axis.min;
var tickIndex=0;
while(Math.round(pos) >=end.y)
{
this.drawTick({x:start.x, y:pos}, axis, axis.axisColor);
if(axis.showLabels )
{
this.createLabel(axis, val,{x:start.x, y:pos}, tickIndex);
}
if(this.dualAxis&&this.dualAxis.showLabels!=false )
{
var dualVal=this.getDualAxisVal(val);
this.createLabel(this.dualAxis, dualVal,{x:end.x, y:pos}, tickIndex);
}
pos-=incrPix;
val+=axis.delta;
tickIndex++;
}
},
getDualAxisVal:function(val)
{
var dualVal=val;
if(this.dualAxis.format=='percent' )
{
var origin=this.yAxis.origin;
var total=origin==0?100:origin;
dualVal=100*(val-origin)/total;
}
return dualVal;
},
drawGridLines:function(pos, axis)
{
var gridOpts={linedotted:this[axis+'Axis'].dottedLine, lineclr:this.gridLineColor, linewidth:1, xStart:pos.x, yStart:pos.y};
if(axis=='y'&&this.yAxis.showGrid)
{
gridOpts.xEnd=pos.x;
gridOpts.yStart=pos.y - this.h;
gridOpts.yEnd=pos.y;
}
else if(axis=='x'&&this.xAxis.showGrid)
{
gridOpts.xEnd=pos.x+this.w;
gridOpts.yEnd=pos.y;
}
this.renderer.drawGridLine(gridOpts);
},
drawTick:function(pos, axis, color)
{
var tickOpts={lineclr:color, linewidth:1, xStart:pos.x, yStart:pos.y};
if(axis.axis=='x'&&axis.showTicks)
{
tickOpts.xEnd=pos.x;
if(axis.ticksOnAxis=='max' )
{
tickOpts.yEnd=pos.y - axis.tickLength;
}
else
{
tickOpts.yEnd=pos.y+axis.tickLength;
}
this.renderer.drawTick(tickOpts);
}
else if(axis.axis=='y'&&axis.showTicks)
{
tickOpts.xEnd=pos.x - axis.tickLength;
tickOpts.yEnd=pos.y;
this.renderer.drawTick(tickOpts);
}
},
formatLabel:function(val, axis, tickIndex)
{
var labelText='';
if(axis.formatFirstAndLast )
{
labelText=this.formatFirstAndLast(val, axis, tickIndex);
}
else if(axis.formatFunc)
{
labelText=axis.formatFunc(val, axis, tickIndex);
}
else
{
var precision=this.getAxisPrecision(val, axis);
labelText=cbd.charting._formatLabel(val, axis.format, precision, true);
}
return labelText;
},
formatFirstAndLast:function(val, axis, tickIndex)
{
var labelText='',
formatLabelValue='',
isOrigin=(val===axis.origin),
precision=this.getAxisPrecision(val, axis);
if(tickIndex==0||tickIndex==axis.intervals||isOrigin )
{
if(axis.originLabel&&isOrigin)
{
formatLabelValue=axis.originLabel;
}
else
{
formatLabelValue=axis.format;
}
labelText=cbd.charting._formatLabel(val, formatLabelValue, precision, true);
}
else
{
labelText=cbd.charting._formatLabel(val, 'number', precision, true);
}
return labelText;
},
getAxisPrecision:function(val, axis)
{
var format=axis.format;
var precision=axis.precision;
var hasDecimals=val!=Math.round(val);
if(format=='dollar' )
{
if((hasDecimals&&precision==0)||precision==1)
{
return 2;
}
}
if(hasDecimals&&precision==0&&(format=='percent'||format=='number') )
{
var valAsString=val.toFixed(6)+'';
valAsString=valAsString.replace(/0*$/,'');
var dotIndex=valAsString.indexOf('.');
return valAsString.length - dotIndex - 1;
}
return precision;
},
createLabel:function(axis, text, pos, tickIndex, isLastTick)
{
var opts={},
divId,
labelCss;
if(axis.labels&&axis.labels.length > 0)
{
text=(axis.labels[tickIndex]!==undefined)?axis.labels[tickIndex]:'';
}
else
{
text=this.formatLabel(text, axis, tickIndex);
}
labelCss=this.labelsCss;
if(axis.cssClass )
{
labelCss+=' '+axis.cssClass;
}
opts.w=this.x;
opts.x=pos.x;
opts.y=pos.y;
opts.h=15;
opts.align='right';
opts.text=text;
opts.cssClass=labelCss;
opts.showLabel=true;
if(axis.axis==='x')
{
divId=cbd.charting.xAxisLabelDivId;
opts=this.createXaxisLabel(opts, pos, axis, tickIndex);
}
else if(axis.axis==='y')
{
divId=cbd.charting.yAxisLabelDivId;
opts=this.createYaxisLabel(opts, pos, axis);
}
else if(axis.axis==='dualAxis')
{
divId=cbd.charting.dualAxisLabelDivId;
opts.w=null;
opts.x=pos.x+6;
opts.y=pos.y - opts.h/2;
}
if(opts.showLabel)
{
this.renderer.addLabel(opts, divId);
}
},
createXaxisLabel:function(opts, pos, axis, tickIndex)
{
var _w=this.getLabelWidth(pos.x),
_y=pos.y+axis._labelPosOffset,
_x=pos.x - _w/2,
_align='center',
textWidth,
isContained;
if(axis.showTicks )
{
_y+=this.xAxis.tickLength;
}
if(axis.labelPos==='contained' )
{
if(tickIndex===0 )
{
_x=this.getMinPix().x;
_align='left';
}
else if((_x+_w) > this.getMaxPix().x )
{
_x=this.getMaxPix().x - _w;
_align='right';
}
}
else if(axis.labelPos==='leftaligned' )
{
_x=pos.x -(0.30*_w);
_y=pos.y+5;
_align='left';
}
else if(axis.labelPos.indexOf('rightaligned') >=0)
{
isContained=axis.labelPos.indexOf('contained') >=0;
_y=pos.y+5;
textWidth=cbd.charting._estimateMaxWidth(this.id, opts.text, cbd.charting.xAxisLabelDivId+' chartLabel');
if((textWidth+pos.x) > this.maxp.x)
{
if(textWidth+3 > _w/2||!isContained)
{
opts.showLabel=false;
}
else
{
_x=pos.x - _w;
_align='right';
}
}
else
{
_x=pos.x+3;
_align='left';
}
}
else if(axis.showTicks&&axis.labelPos==='midinterval' )
{
_y=pos.y+10;
}
opts.w=_w;
opts.y=_y;
opts.x=_x;
opts.align=_align;
return opts;
},
createYaxisLabel:function(opts, pos, axis)
{
var yAxis=this.yAxis,
_h=opts.h,
_w=opts.w,
_x=0,
_y=pos.y - _h/2,
_align=opts.align;
if(yAxis.showTicks)
{
_w -=yAxis.tickLength;
}
if(axis.labelPos==='inside')
{
_x+=_w;
_y=pos.y - _h;
_align='left';
}
opts.x=_x;
opts.y=_y;
opts.w=_w;
opts.align=_align;
return opts;
},
getLabelWidth:function(xPos)
{
'use strict';
var xAxis=this.xAxis,
widthAvailable=xAxis.delta*xAxis.labelInterval/xAxis.range*this.w,
maxX=this.getMaxPix().x,
minX=this.getMinPix().x,
margins=this.margins;
if(xAxis.labelPos==='tickmark' )
{
if(xPos+widthAvailable/2 > maxX+margins.right )
{
widthAvailable=margins.right*2;
}
else if(xPos - widthAvailable/2 < minX - margins.left )
{
widthAvailable=margins.left*2;
}
}
return widthAvailable;
},
renderAxisLabels:function()
{
'use strict';
var renderer=this.renderer;
renderer.drawLabels(cbd.charting.xAxisLabelDivId);
renderer.drawLabels(cbd.charting.yAxisLabelDivId);
if(this.dualAxis)
{
renderer.drawLabels(cbd.charting.dualAxisLabelDivId);
this.repositionDualAxis(renderer);
}
},
repositionDualAxis:function(renderer)
{
var getSizeFunc=cbd.adapter.getSize;
var dualLabels=renderer._getLabelDiv(cbd.charting.dualAxisLabelDivId).childNodes;
var dualAxisWidth=0;
for(var i=0;i < dualLabels.length;i++)
{
var labelWidth=dualLabels[i].offsetWidth;
if(labelWidth==0&&dualLabels[i].innerHTML )
{
labelWidth=getSizeFunc(dualLabels[i]).w;
}
if(labelWidth > dualAxisWidth)
{
dualAxisWidth=labelWidth;
}
}
var daTitle;
var titleLeft;
if(this.dualAxis.title)
{
daTitle=renderer._getLabelDiv(cbd.charting.dualAxisTitleDivId).childNodes[0];
titleLeft=daTitle.style.left;
titleLeft=titleLeft.substring(0, titleLeft.length-2);
}
for(var i=0;i < dualLabels.length;i++)
{
dualLabels[i].style.width=dualAxisWidth+'px';
}
if(daTitle)
{
daTitle.style.left=dualAxisWidth+1*titleLeft+'px';
}
}
};
}(window.ieQuirksMode));
cbd.charting.Series=function()
{
};
cbd.charting.Series.EmptyFunction=function(){};
cbd.charting.Series.prototype=
{
setConfigOptions:function(opt, seriesData)
{
cbd.adapter.deepAttach(this, opt );
cbd.adapter.deepAttach(this, seriesData );
},
setDefaults:function()
{
this.visible=true;
this.showLegend=true;
},
destroy:cbd.charting.Series.EmptyFunction,
checkAndHandleErrors:cbd.charting.Series.EmptyFunction,
draw:cbd.charting.Series.EmptyFunction,
getLegendEntries:cbd.charting.Series.EmptyFunction,
getMaxMinValues:cbd.charting.Series.EmptyFunction,
getToolTipConfig:function(eventPos, toolTipConfig)
{
var max=this.grid.getMaxPix(),
min=this.grid.getMinPix(),
val, index;
if(eventPos.x >=min.x&&eventPos.x <=max.x
&&eventPos.y >=max.y&&eventPos.y <=min.y )
{
val=this.grid.getVal(eventPos);
if(toolTipConfig.bar==="range" )
{
index=Math.ceil(val.x)-1;
}
else
{
index=Math.round(val.x);
}
return this.getToolTipConfigByIndex(index, toolTipConfig);
}
},
getConfigOrientation:function(position, type, defaultOrientation, series){
var orientation=defaultOrientation||"top",
adjustedPointX, chartBoundary,
max=series.grid.getMaxPix(),
min=series.grid.getMinPix();
if(type==="fixed")
{
if(position.x <(max.x-min.x)/2+min.x)
{
orientation="bottom-right";
}
else
{
orientation="bottom-left";
}
}
else if(orientation==="horizontal")
{
adjustedPointX=series.renderer.adjustValueForScrolling(position.x);
chartBoundary=series.renderer.getChartBoundary(min, max);
orientation=(adjustedPointX <(chartBoundary.right - chartBoundary.left)/2 )?'right':'left';
}
else if(!orientation.match(/^(right|left|top)$/))
{
orientation="top";
}
return orientation;
},
getToolTipPosition:function(toolTipConfig, index, series){
var configPoint=toolTipConfig.pos,
dataX=configPoint&&configPoint.x,
dataY=configPoint&&configPoint.y,
offset=!isNaN(series.lineOffset)?series.lineOffset:series.barOffset;
if(toolTipConfig.type!=="fixed"&&toolTipConfig.bar==="range")
{
dataX=dataX||((2*index+1)/2+offset);
dataY=dataY||parseFloat((series.data[index+1]-series.data[index])/2+series.data[index]);
}
else
{
dataX=dataX||(index+offset);
dataY=dataY||parseFloat(series.data[index]);
}
return series.grid.getPix({x:dataX, y:dataY});
},
getToolTipConfigByIndex:cbd.charting.Series.EmptyFunction
};
cbd.charting.Series.prototype._setupToolTipRegions=function(regionConfig, index)
{
var region;
if(regionConfig&&regionConfig.value )
{
region=cbd.adapter.copy(regionConfig );
if(regionConfig.value instanceof Array&&regionConfig.value[index]!=undefined )
{
region.value=regionConfig.value[index];
}
}
return region;
};
cbd.charting.Series.prototype._formatOptions=function(options, toolTipConfig, index)
{
var fields={},
formatData={},
xAxisLabels=options.xAxis&&options.xAxis.labels,
data=options.data,
title=options.title,
layoutData=options.layoutData,
sum=options.sum,
labels=options.labels;
if(toolTipConfig.layout )
{
fields.percent=sum > 0?parseFloat(data)/sum*100:0;
fields.value=data;
fields.title=title;
if(xAxisLabels&&xAxisLabels[index])
{
fields.label=xAxisLabels[index];
}
if(labels&&labels[index])
{
fields.label=labels[index];
}
if(layoutData&&!isNaN(layoutData[index]) )
{
fields.layoutData=layoutData[index];
}
formatData=cbd.charting._formatDisplayField(toolTipConfig.layout, toolTipConfig.format, fields, toolTipConfig.precision);
}
else
{
formatData=[cbd.charting._formatLabel(data, toolTipConfig.format, toolTipConfig.precision)];
}
return formatData;
};
cbd.charting.Line=function(renderer, grid, seriesData, opt, index)
{
this.setDefaults(renderer, grid);
cbd.charting.Series.prototype.setConfigOptions.apply(this,[opt, seriesData]);
if(opt.colors&&!this.strokeColor)
{
if(typeof(opt.colors)=="object")
{
this.strokeColor=opt.colors[index];
}
else
{
this.strokeColor=opt.colors;
}
}
if(opt.fillColors)
{
if(typeof(opt.fillColors)=="object")
{
this.fillColor=opt.fillColors[index];
}
else
{
this.fillColor=opt.fillColors;
}
}
};
cbd.adapter.inheritPrototype(cbd.charting.Line, cbd.charting.Series);
cbd.charting.Line.prototype.setDefaults=function(renderer, grid)
{
this.renderer=renderer;
this.grid=grid;
this.fillColor=null;
this.strokeWidth=2;
this.fillAlpha=0.2;
this.lineOffset=this.grid.lineOffset;
this.gradient={top:'', middle:'', bottom:''};
this.negFillColor=null;
this.negStrokeColor=null;
cbd.charting.Series.prototype.setDefaults.apply(this);
};
cbd.charting.Line.prototype.getMaxMinValues=function()
{
if(this.hide )
{
return null;
}
var maxY=Number.NEGATIVE_INFINITY;
var minY=Number.POSITIVE_INFINITY;
for(var i=0;i<this.data.length;i++)
{
this.data[i]=parseFloat(this.data[i]);
if(this.data[i]< minY)
{
minY=this.data[i];
}
if(this.data[i]> maxY)
{
maxY=this.data[i];
}
}
var maxX=this.data.length-1;
return{max:{x:maxX, y:maxY}, min:{x:0, y:minY}};
};
cbd.charting.Line.prototype.draw=function()
{
if(!this.hide )
{
var opts={linewidth:this.strokeWidth, lineclr:this.strokeColor, fillclr:this.fillColor, yFill:this.grid.getOriginPx().y, alphablend:this.fillAlpha, gradient:this.gradient};
opts.xStart=new Array();
opts.yStart=new Array();
opts.xEnd=new Array();
opts.yEnd=new Array();
opts.neglineclr=(this.negStrokeColor)?this.negStrokeColor:this.strokeColor;
opts.negfillclr=(this.negFillColor)?this.negFillColor:this.fillColor;
var dataLength=this.data.length;
var min=this.grid.getMinPix();
var max=this.grid.getMaxPix();
for(var i=0;i < dataLength;i++)
{
var dataX=i+this.lineOffset;
var dataY=parseFloat(this.data[i]);
var pt1=this.grid.getPix({x:dataX, y:dataY});
dataY=parseFloat(this.data[i+1]);
var pt2=this.grid.getPix({x:dataX+1, y:dataY});
if(pt1.x >=min.x&&pt1.y&&pt2.x <=max.x&&pt2.y)
{
opts.xStart.push(pt1.x);
opts.yStart.push(pt1.y);
opts.xEnd.push(pt2.x);
opts.yEnd.push(pt2.y);
}
}
this.renderer.drawContinuousLine(opts);
}
};
cbd.charting.Line.prototype.getLegendEntries=function()
{
return[{color:this.strokeColor, fields:this.legendData}];
};
cbd.charting.Line.prototype.getToolTipConfig=function(eventPos, toolTipConfig)
{
return cbd.charting.Series.prototype.getToolTipConfig.apply(this, arguments);
};
cbd.charting.Line.prototype.getToolTipConfigByIndex=function(index, toolTipConfig)
{
var dataIndex=Math.round(index - this.lineOffset),
point,
config
;
if(dataIndex < 0||isNaN(this.data[dataIndex]))
{
return;
}
toolTipConfig.dataIndex=dataIndex;
point=this.getToolTipPosition(toolTipConfig, dataIndex, this);
config=this._getToolTipData(dataIndex, toolTipConfig);
if(!this.hide)
{
config.pos=point;
}
if(toolTipConfig.indicator==="block")
{
cbd.charting._addToolTipIndicator(point, this.strokeColor, this.grid, this.renderer);
}
config.orientation=this.getConfigOrientation(point, toolTipConfig.type, toolTipConfig.orientation, this);
return config;
};
cbd.charting.Line.prototype._getToolTipData=function(i, toolTipConfig)
{
var header,
data,
xAxis=this.grid.xAxis,
yAxisOrigin,
total,
dualAxisData;
data=this._formatOptions({'data':this.data[i], 'title':this.title, 'xAxis':xAxis, 'xAxisLabels':xAxis.labels, 'layoutData':this.layoutData}, toolTipConfig, i);
header=this._setupToolTipRegions(toolTipConfig.header, i);
footer=this._setupToolTipRegions(toolTipConfig.footer, i);
if(toolTipConfig.dualAxisFormat&&this.grid.dualAxis&&this.grid.dualAxis.format=="percent" )
{
yAxisOrigin=this.grid.yAxis.origin;
total=yAxisOrigin==0?100:yAxisOrigin;
dualAxisData=(this.data[i]-yAxisOrigin)/total*100;
dualAxisData=cbd.charting._formatLabel(dualAxisData, toolTipConfig.dualAxisFormat, toolTipConfig.dualAxisPrecision);
data.push(dualAxisData);
}
return{header:header, footer:footer, data:[{color:this.strokeColor, fields:data}], index:i+this.lineOffset};
};
cbd.charting._addToolTipIndicator=function(point, color, grid, renderer )
{
var max=grid.getMaxPix();
var min=grid.getMinPix();
var opts={
x:point.x-2,
y:point.y-2,
w:5,
h:5,
text:"<div style=\"width:100%;height:100%;background-color:"+color+"\">&nbsp</div>",
cssClass:"indicator"
};
renderer.addLabel(opts, cbd.charting.TOOL_TIP_DIV_ID);
};
cbd.charting.ScatterPlot=function(renderer, grid, seriesData, opt, index)
{
this.setDefaults(renderer, grid);
cbd.charting.Series.prototype.setConfigOptions.apply(this,[opt, seriesData]);
};
cbd.adapter.inheritPrototype(cbd.charting.ScatterPlot, cbd.charting.Series);
cbd.charting.ScatterPlot.prototype.setDefaults=function(renderer, grid)
{
this.renderer=renderer;
this.grid=grid;
this.center={x:renderer.xCenter, y:renderer.yCenter};
this.strokeWidth=1;
cbd.charting.Series.prototype.setDefaults.apply(this);
};
cbd.charting.ScatterPlot.prototype.getMaxMinValues=function()
{
var maxY=this.grid.yAxis.origin,
minY=this.grid.yAxis.origin,
maxX=this.grid.xAxis.origin,
minX=this.grid.xAxis.origin,
data=this.data,
dataIndex=data.length;
while(dataIndex--)
{
data[dataIndex][0]=parseFloat(data[dataIndex][0]);
data[dataIndex][1]=parseFloat(data[dataIndex][1]);
if(data[dataIndex][1]< minY)
{
minY=data[dataIndex][1];
}
if(data[dataIndex][1]> maxY)
{
maxY=data[dataIndex][1];
}
if(data[dataIndex][0]< minX)
{
minX=data[dataIndex][0];
}
if(data[dataIndex][0]> maxX)
{
maxX=data[dataIndex][0];
}
}
return{min:{x:minX, y:minY}, max:{x:maxX, y:maxY}};
};
cbd.charting.ScatterPlot.prototype.draw=function()
{
var x,
y,
opts,
data=this.data,
dataLength=data.length,
pixels,
diagonalLength,
radius,
maxPix=this.grid.getMaxPix(),
minPix=this.grid.getMinPix(),
crosshairParams;
while(dataLength--)
{
x=parseFloat(data[dataLength][0]);
y=parseFloat(data[dataLength][1]);
pixels=this.grid.getPix({x:x, y:y});
opts={radius:this.radius, lineWidth:this.strokeWidth, fillColor:this.color, lineColor:this.strokeColor, xCenter:pixels.x, yCenter:pixels.y};
opts.diagonalLength=this.radius*2;
if(this.crosshairs)
{
crosshairParams={lineColor:this.strokeColor, lineWidth:1, x1Start:minPix.x, x1End:maxPix.x,
y1Start:opts.yCenter, y1End:opts.yCenter, x2Start:opts.xCenter, x2End:opts.xCenter,
y2Start:minPix.y, y2End:maxPix.y};
this.renderer.drawCrossHair(crosshairParams);
}
if(this.shape==="diamond"){
this.renderer.drawBox(opts);
}
else
{
this.renderer.drawArc(opts);
}
}
};
cbd.charting.ScatterPlot.prototype.getLegendEntries=function()
{
var pattern={
pattern:this.shape,
color:this.color,
radius:this.radius,
strokeColor:this.strokeColor,
strokeWidth:this.strokeWidth
};
return[{color:pattern, fields:[this.label]}];
};
cbd.charting.DashedLine=function(renderer, grid, seriesData, opt, index)
{
this.setDefaults(renderer,grid);
cbd.charting.Series.prototype.setConfigOptions.apply(this,[opt, seriesData]);
};
cbd.adapter.inheritPrototype(cbd.charting.DashedLine, cbd.charting.Series);
cbd.charting.DashedLine.prototype.setDefaults=function(renderer, grid)
{
this.renderer=renderer;
this.grid=grid;
this.strokeColor='#9E1B34';
this.fillColor=null;
this.strokeWidth=1;
this.gap=2;
this.dashLength=2;
cbd.charting.Series.prototype.setDefaults.apply(this);
};
cbd.charting.DashedLine.prototype.getMaxMinValues=function()
{
var maxY=Number.NEGATIVE_INFINITY;
var minY=Number.POSITIVE_INFINITY;
var maxX=Number.NEGATIVE_INFINITY;
var minX=Number.POSITIVE_INFINITY;
if(typeof(this.data)!=Array)
{
this.data=new Array(this.data);
}
for(var i=0;i<this.data.length;i++)
{
if(!isNaN(this.data[i]))
{
this.data[i]={y:parseFloat(this.data[i])};
}
var dataPt=this.data[i];
if(dataPt)
{
if(dataPt.y < minY)
{
minY=dataPt.y;
}
if(dataPt.y > maxY)
{
maxY=dataPt.y;
}
if(dataPt.x < minX)
{
minY=dataPt.y;
}
if(dataPt.x > maxX)
{
maxX=dataPt.x;
}
}
}
return{max:{x:maxX, y:maxY}, min:{x:minX, y:minY}};
};
cbd.charting.DashedLine.prototype.draw=function()
{
var opts={linewidth:this.strokeWidth, lineclr:this.strokeColor, gap:this.gap, dashLength:this.dashLength};
if(this.data.length==1)
{
this.data[1]={x:this.data[0].x, y:this.data[0].y};
if(isNaN(this.data[0].x))
{
this.data[0].x=this.grid.xAxis.min;
this.data[1].x=this.grid.xAxis.max;
}
}
for(var i=0;i < this.data.length-1;i++)
{
var dataX=parseFloat(this.data[i].x);
var dataY=parseFloat(this.data[i].y);
var dataX2=parseFloat(this.data[i+1].x);
var dataY2=parseFloat(this.data[i+1].y);
if(dataX >=this.grid.xAxis.min&&dataX2 <=this.grid.xAxis.max)
{
var pt1=this.grid.getPix({x:dataX, y:dataY});
var pt2=this.grid.getPix({x:dataX2, y:dataY2});
if(pt1.x&&pt1.y&&pt2.x&&pt2.y)
{
opts.xStart=pt1.x;
opts.yStart=pt1.y;
opts.xEnd=pt2.x;
opts.yEnd=pt2.y;
this.renderer.drawDashedLineSegment(opts);
}
}
}
};
cbd.charting.DashedLine.prototype.getLegendEntries=function()
{
return[{color:{pattern:'dashed', color:this.strokeColor}, fields:this.legendData}];
};
cbd.charting.Pie=function(renderer, margins, seriesData, opt, index)
{
var colors=opt.colors,
center=opt.center,
xAvailableSpace=renderer.wFrame,
yAvailableSpace=renderer.hFrame;
this.setDefaults(renderer);
cbd.charting.Series.prototype.setConfigOptions.apply(this,[opt, seriesData]);
if(!opt.radius&&!center&&margins )
{
if(!isNaN(margins.top) )
{
this.center.y+=margins.top/2;
yAvailableSpace -=margins.top;
}
if(!isNaN(margins.right) )
{
this.center.x -=margins.right/2;
xAvailableSpace -=margins.right;
}
if(!isNaN(margins.bottom) )
{
this.center.y -=margins.bottom/2;
yAvailableSpace -=margins.bottom;
}
if(!isNaN(margins.left) )
{
this.center.x+=margins.left/2;
xAvailableSpace -=margins.left;
}
this.radius=(yAvailableSpace > xAvailableSpace)?xAvailableSpace/2:yAvailableSpace/2;
}
cbd.charting.Series.prototype.setConfigOptions.apply(this,[opt, seriesData]);
if(seriesData&&seriesData.colors)
this.colors=seriesData.colors;
this.renderer.setOptions({linewidth:this.strokeWidth, lineclr:this.strokeColor,bkclr:this.bgColor,radius:this.radius,xCenter:this.center.x,yCenter:this.center.y});
};
cbd.adapter.inheritPrototype(cbd.charting.Pie, cbd.charting.Series);
cbd.charting.Pie.prototype.setDefaults=function(renderer)
{
this.renderer=renderer;
this.colors=cbd.charting.defaultPieColors;
this.radius=renderer.radius;
this.center={x:renderer.xCenter, y:renderer.yCenter};
this.strokeColor=cbd.adapter.isNextGen?'#FFFFFF':'#CCCCCC';
this.bgColor='white';
this.gradients=null;
this.counterClockwise=false;
this.labelsCss="pieChartLabel";
this.sum=0;
this.strokeWidth=1;
this.showError=false;
this.showLabels=false;
this.disabledColor="#E6E6E6";
this.startDegree=0;
if(cbd.adapter.isNextGen)
{
this.showError=true;
this.errorText="Data<br/>Unavailable";
this.zeroSumError="No<br/>Assets";
this.errorCss=this.zeroSumCss="chartDataUnavailable";
}
cbd.charting.Series.prototype.setDefaults.apply(this);
};
cbd.charting.Pie.prototype.checkAndHandleErrors=function()
{
var sum=this.getSum(this.data);
if(!sum)
{
var zeroSum=sum===0;
this.renderError(zeroSum);
if(zeroSum)
{
return cbd.charting.NON_FATAL_ERROR;
}
return cbd.charting.FATAL_ERROR;
}
return false;
};
cbd.charting.Pie.prototype.draw=function()
{
this.sum=this.getSum(this.data);
var sum=this.sum,
val,
degree,
i=0,
curRotation=this.startDegree,
data=this.data,
dataLength=data.length,
slices=[],
slice,
curRotationRadians=0,
radian=0,
gradients=this.gradients,
gradientColor,
donut=this.donut,
donutBackground,
donutRadius;
for(i=0;i < dataLength;i++)
{
slice={};
val=parseFloat(data[i]);
degree=(val/sum)*360;
radian=val/sum;
if(gradients)
{
gradientColor=gradients[i]||true;
}
if(degree==360)
{
this.renderer.drawPieBorder({bkclr:this.colors[i], radius:this.radius, gradient:gradientColor});
}
else if(degree > 0)
{
this.renderer.drawPieSlice({counterClockwise:this.counterClockwise, degBegin:curRotation, degEnd:curRotation+degree, clr:this.colors[i], radius:this.radius, gradient:gradientColor, linewidth:this.strokeWidth});
}
slice.startAngle=2*Math.PI*curRotationRadians;
slice.endAngle=2*Math.PI*(curRotationRadians+radian);
slice.middleAngle=(slice.endAngle - slice.startAngle)/2+slice.startAngle;
slices.push(slice);
if(this.showLabels&&this.labels)
{
this.drawLabel(this.labels[i], slice.middleAngle);
}
curRotationRadians+=radian;
curRotation+=degree;
}
this.slices=slices;
this.renderer.drawLabels('PieLabels');
if(donut)
{
donutBackground=donut.fillColor||'#FFF';
donutRadius=donut.radius||this.radius/2;
if(donut.strokeWidth)
{
donutRadius -=donut.strokeWidth/2;
this.renderer.drawPieBorder({bkclr:"#FFF", radius:donutRadius, lineclr:donut.strokeColor, linewidth:donut.strokeWidth});
}
this.renderer.drawPieSlice({counterClockwise:this.counterClockwise, degBegin:180, degEnd:360, clr:donutBackground, lineclr:donutBackground, radius:(donutRadius)});
this.renderer.drawPieSlice({counterClockwise:this.counterClockwise, degBegin:0, degEnd:180, clr:donutBackground, lineclr:donutBackground, radius:(donutRadius)});
}
};
cbd.charting.Pie.prototype.drawLabel=function(label, angle)
{
var DISTANCE_FROM_PIE=5,
distance=this.radius+DISTANCE_FROM_PIE,
centerX=this.center.x,
centerY=this.center.y,
zeroDegreePosition=(-.5*Math.PI)+(this.startDegree*Math.PI/180),
sinValue=Math.round(Math.sin(angle+zeroDegreePosition)*1000)/1000,
cosValue=Math.round(Math.cos(angle+zeroDegreePosition)*1000)/1000,
x=Math.round(centerX+(distance*cosValue)),
y=Math.round(centerY+(distance*sinValue)),
dimensions=cbd.charting._estimateDimensions(this.renderer.id, label, " "+this.labelsCss);
x+=(dimensions.w*(cosValue-1))/2;
y+=(dimensions.h*(sinValue-1))/2;
this.renderer.addLabel({
text:label,
x:x,
y:y,
cssClass:this.labelsCss
}, 'PieLabels');
};
cbd.charting.Pie.prototype.renderError=function(isZeroSum)
{
var id=this.renderer.id;
if(this.showError)
{
if(isZeroSum&&this.zeroSumError)
{
this.zeroSumCoords=this.getErrorCoords(this.zeroSumCoords);
cbd.charting.showError(id, this.zeroSumError, this.zeroSumCss, this.zeroSumCoords, true);
}
else
{
this.errorCoords=this.getErrorCoords(this.errorCoords);
cbd.charting.showError(id, this.errorText, this.errorCss, this.errorCoords, true);
}
}
this.drawDisabledPie();
};
cbd.charting.Pie.prototype.getErrorCoords=function(errorCoords)
{
if(cbd.adapter.isNextGen&&!errorCoords)
{
errorCoords={w:this.radius*2, h:34};
errorCoords.y=this.center.y - errorCoords.h/2;
errorCoords.x=this.center.x - errorCoords.w/2;
}
return errorCoords;
};
cbd.charting.Pie.prototype.drawDisabledPie=function()
{
if(cbd.adapter.isNextGen)
{
var isZero=false;
var sum=this.getSum(this.data);
if(sum!=null)
{
isZero=!sum;
if(isZero)
{
var prevColors=this.colors,
data=this.data;
}
}
this.data=["33.33","33.33","33.33"];
this.colors=["#B3B3B3", "#D9D9D9", "#CCCCCC"];
this.draw();
if(isZero)
{
this.data=data;
this.colors=prevColors;
}
}
else
{
this.renderer.drawPieBorder({bkclr:this.disabledColor});
}
};
cbd.charting.Pie.prototype.getSum=function(data)
{
var sum=0,
valsValid=true,
length=data.length;
for(var i=0;i < length;i++)
{
var val=parseFloat(data[i]);
if(!isNaN(val)&&val!=null)
{
sum+=val;
}
else
{
valsValid=false;
}
}
return valsValid?sum:null;
};
cbd.charting.Pie.prototype.getLegendEntries=function(layout, format, precision)
{
var legendEntry=[],
fields=this.legendData,
sum=this.sum;
if(!isNaN(sum)&&sum!=null&&this.showLegend)
{
if(fields&&fields.length)
{
for(var i=0;i < fields.length;i++)
{
legendEntry[i]={color:this.colors[i], fields:fields[i]};
}
}
else
{
for(var i=0;i< this.data.length;i++)
{
fields={};
fields.percent=sum > 0?parseFloat(this.data[i])/sum*100:0;
fields.value=this.data[i];
if(this.labels&&this.labels[i])
{
fields.label=this.labels[i];
}
if(layout)
{
fields=cbd.charting._formatDisplayField(layout,format, fields, precision);
}
else
{
fields=[cbd.charting._formatLabel(fields.value,format, precision)]
}
legendEntry[i]={color:this.colors[i], fields:fields};
}
}
}
return legendEntry;
};
cbd.charting.Pie.prototype.getToolTipConfig=function(hoverPos, toolTipConfig)
{
var centerX=this.center.x,
centerY=this.center.y,
radius=this.radius,
startRadian=this.startDegree*(Math.PI/180),
zeroDegreePosition=(-.5*Math.PI)+startRadian,
hoverAngle=0,
sliceStartAngle=0,
sliceEndAngle=0,
sliceIndex=0,
i=0,
slice,
slices=this.slices,
slicesLen=slices.length,
middleAngle=0,
middleSliceX=0,
middleSliceY=0,
sliceCenterX=0,
sliceCenterY=0,
toolTipObj;
if(this.isPointInPie(hoverPos.x, hoverPos.y))
{
hoverAngle=Math.atan2((hoverPos.y - centerY),(hoverPos.x - centerX) ) - zeroDegreePosition;
if(hoverAngle < 0 )
{
hoverAngle=2*Math.PI+hoverAngle;
}
for(i=0;i < slicesLen;i++)
{
slice=slices[i];
sliceStartAngle=slice.startAngle;
sliceEndAngle=slice.endAngle;
if(hoverAngle >=sliceStartAngle&&hoverAngle <=sliceEndAngle )
{
sliceIndex=i;
middleAngle=slice.middleAngle;
middleSliceX=centerX+(radius*Math.cos(middleAngle+zeroDegreePosition));
middleSliceY=centerY+(radius*Math.sin(middleAngle+zeroDegreePosition));
sliceCenterX=Math.round((centerX+middleSliceX)/2 );
sliceCenterY=Math.round((centerY+middleSliceY)/2 );
break;
}
}
toolTipObj=this.getToolTipConfigByIndex(sliceIndex, toolTipConfig, sliceCenterX, sliceCenterY);
}
return toolTipObj;
};
cbd.charting.Pie.prototype.getToolTipConfigByIndex=function(index, toolTipConfig, toolTipX, toolTipY)
{
var sum=this.sum,
config={},
data=[],
colors=this.colors;
config.data=[];
config.header=this._setupToolTipRegions(toolTipConfig.header, index);
config.footer=this._setupToolTipRegions(toolTipConfig.footer, index);
config.index=index;
config.orientation=toolTipConfig.orientation&&toolTipConfig.orientation.match(/^(right|left|top)$/)?toolTipConfig.orientation:'top';
config.pos={};
config.pos.x=toolTipX;
config.pos.y=toolTipY;
data=this._formatOptions({'data':this.data[index], 'sum':this.sum, 'labels':this.labels, 'title':this.title, 'layoutData':this.layoutData}, toolTipConfig, index);
config.data.push({'color':colors[index], 'fields':data});
return config;
};
cbd.charting.Pie.prototype.isPointInPie=function(mouseX, mouseY)
{
var centerX=this.center.x,
centerY=this.center.y,
radius=this.radius,
distX=mouseX - centerX,
distY=mouseY - centerY,
dist=Math.sqrt(distX*distX+distY*distY),
inPie=false;
if(dist <=radius)
{
inPie=true;
}
return inPie;
};
cbd.charting.PieWeight=function(renderer, margins, seriesData, opt, index, thePie)
{
this.pie=thePie;
this.setDefaults(renderer);
cbd.charting.Series.prototype.setConfigOptions.apply(this,[opt, seriesData]);
};
cbd.adapter.inheritPrototype(cbd.charting.PieWeight, cbd.charting.Series);
cbd.charting.PieWeight.prototype.setDefaults=function(renderer)
{
this.renderer=renderer;
this.center=this.pie.center;
this.radius=5;
this.strokeWidth=1;
this.shape="circle";
cbd.charting.Series.prototype.setDefaults.apply(this);
};
cbd.charting.PieWeight.prototype.draw=function()
{
'use strict';
var pie=this.pie,
radius=pie.donut?pie.radius/2:pie.radius,
coordinateX,
coordinateY,
x=this.center.x,
y=this.center.y,
sum=0,
data=this.data,
dataLength=data.length;
for(var i=0;i < dataLength;i++)
{
sum+=data[i];
}
coordinateX=x+this.calculateCoordinate("x", data, radius, sum||1);
coordinateY=y+this.calculateCoordinate("y", data, radius, sum||1);
if(this.shape==="diamond")
{
this.renderer.drawBox({diagonalLength:this.radius*2, lineColor:this.strokeColor||this.color, fillColor:this.color, lineWidth:this.strokeWidth, xCenter:coordinateX, yCenter:coordinateY});
}
else
{
this.renderer.drawArc({radius:this.radius, fillColor:this.color, xCenter:coordinateX, yCenter:coordinateY, lineWidth:this.strokeWidth});
}
};
cbd.charting.PieWeight.prototype.calculateCoordinate=function(axis, data, radius, sum)
{
'use strict';
var coordinate=0,
direction=this.pie.slices,
zeroDegreePosition=(this.pie.startDegree*Math.PI/180)+(-.5*Math.PI),
RADIUS_MAGNITUDE=radius/sum,
pieSlice,
pieSliceCenterAngle,
trigFunction=(axis==="y")?"sin":"cos";
for(var i=0;i < data.length;i++)
{
pieSlice=direction[i];
pieSliceCenterAngle=pieSlice.middleAngle+zeroDegreePosition;
coordinate+=(data[i]*RADIUS_MAGNITUDE*Math[trigFunction](pieSliceCenterAngle));
}
return coordinate;
};
cbd.charting.PieWeight.prototype.getLegendEntries=function()
{
var entries=[];
if(this.showLegend)
{
pattern={
pattern:this.shape,
color:this.color,
radius:this.radius,
strokeColor:this.strokeColor,
strokeWidth:this.strokeWidth
};
entries=[{color:pattern, fields:[this.label]}]
}
return entries;
};
cbd.charting.Bar=function(renderer, grid, seriesData, opt, index)
{
this.setDefaults(renderer, grid);
cbd.charting.Series.prototype.setConfigOptions.apply(this,[opt, seriesData]);
if(opt.colors)
{
if(typeof(opt.colors[0])=="object")
{
this.colors=opt.colors[index];
}
else
{
this.colors=opt.colors;
}
}
if(this.animate)
{
this.setupBarAnimation();
}
};
cbd.adapter.inheritPrototype(cbd.charting.Bar, cbd.charting.Series);
cbd.charting.Bar.seriesLabelDivId='_divBarLabels';
cbd.charting.Bar.prototype.setDefaults=function(renderer, grid)
{
this.renderer=renderer;
this.grid=grid;
this.labelsCss="barChartLabel";
this.showLabels=true;
this.showNull=true;
this.bars=[];
this.borderColor='#FFFFFF';
this.barOffset=0;
this.colors=['#5190CD','#FFAA01'];
cbd.charting.Series.prototype.setDefaults.apply(this);
};
cbd.charting.Bar.prototype.getMaxMinValues=function()
{
};
cbd.charting.Bar.prototype.draw=function()
{
if(this.animate)
{
this.animateBar();
}
this.setOptions();
this.bars=[];
var origin=this.grid.getOriginPx();
var opts={height:0, width:this.intervalWidth/2, xStart:origin.x, yStart:origin.y, clr:'', borderclr:this.borderColor};
this.drawBars(opts);
if(this.showLabels )
{
this.renderer.drawLabels(cbd.charting.Bar.seriesLabelDivId);
}
else
{
this.renderer.clearLabels(cbd.charting.Bar.seriesLabelDivId);
}
};
cbd.charting.Bar.prototype.setOptions=function()
{
var grid=this.grid;
var pxMax=grid.getMaxPix();
var pxMin=grid.getMinPix();
this.height=pxMax.y - pxMin.y;
this.width=pxMax.x - pxMin.x;
this.barDelta=this.barDelta?this.barDelta:grid.xAxis.delta;
this.intervalWidth=this.width/grid.xAxis.max;
this.renderer.setOptions({x:0,y:0,h:this.height,w:this.width,units:10,bkclr:'white'});
};
cbd.charting.Bar.prototype.drawBars=function()
{
};
cbd.charting.Bar.prototype.drawLabels=function()
{
};
cbd.charting.Bar.prototype.setupBarAnimation=function()
{
this.animate.frameCount=0;
this.animate.finalData=new Object();
this.animate.finalData=cbd.adapter.copy(this.data );
if(this.animate.hideLabels )
{
this.showLabels=false;
}
};
cbd.charting.Bar.prototype.animateBar=function()
{
var animateConfig=this.animate;
var heightPercentage=animateConfig.frameCount/animateConfig.frames;
var continueAnimating=heightPercentage < 1;
var originPos=this.grid.yAxis.origin;
var data=this.data;
var dataSize=data.length;
for(var i=0;i < dataSize;i++)
{
var subData=data[i];
var subDataSize=subData.length;
for(var j=0;j < subDataSize;j++)
{
if(!isNaN(subData[j]) )
{
subData[j]=animateConfig.finalData[i][j]*heightPercentage+originPos;
}
}
}
if(this.showLabels)
{
this.renderer.clearLabels(cbd.charting.Bar.seriesLabelDivId);
}
if(continueAnimating )
{
animateConfig.frameCount++;
var THIS=this;
this.animationTimeoutId=setTimeout(function(){THIS.draw();}, animateConfig.time);
}
else
{
if(animateConfig.hideLabels)
{
this.showLabels=true;
}
if(animateConfig.afterAnim)
{
animateConfig.afterAnim(this);
}
}
};
cbd.charting.Bar.prototype.destroy=function(){
clearTimeout(this.animationTimeoutId);
};
cbd.charting.Bar.prototype.getLegendEntries=function()
{
var legendEntry=new Array(this.legendData.length);
for(var i=0;i < this.legendData.length;i++)
{
if(this.chartType==="stackedBar")
{
legendEntry[(this.legendData.length)-(parseInt(i)+1)]={color:this.colors[i], fields:this.legendData[i]};
}
else
{
legendEntry[i]={color:this.colors[i], fields:this.legendData[i]};
}
}
return legendEntry;
};
cbd.charting.Bar.prototype.getToolTipConfig=function(eventPos, toolTipConfig)
{
return cbd.charting.Series.prototype.getToolTipConfig.apply(this, arguments);
};
cbd.charting.Bar.prototype.getToolTipConfigByIndex=function(index, toolTipConfig)
{
'use strict';
var configPoint=toolTipConfig.pos,
dataX=configPoint&&configPoint.x,
dataY=configPoint&&configPoint.y, numberOfBars,
pos, j=0, header, footer, orientation, data=[], temp=[];
index=Math.round(index/this.barDelta);
if(!this.bars[index]||!this.bars[index][0])
{
return;
}
dataX=dataX?configPoint.x:this.bars[index][0].x1;
dataY=dataY?configPoint.y:this.bars[index][0].y2;
pos={x:dataX, y:dataY};
numberOfBars=this.bars[index].length;
if(toolTipConfig.bar==='range')
{
toolTipConfig.dataIndex=index;
}
for(j=0;j < numberOfBars;j++)
{
temp=[];
temp=this._formatOptions({'data':this.data[index][j], 'title':this.title, 'xAxis':this.grid.xAxis, 'layoutData':this.layoutData}, toolTipConfig, j);
data.push({color:this.bars[index][j].color, fields:temp});
}
header=this._setupToolTipRegions(toolTipConfig.header, index);
footer=this._setupToolTipRegions(toolTipConfig.footer, index);
orientation=this.getConfigOrientation(pos, toolTipConfig.type, toolTipConfig.orientation, this);
return{header:header, footer:footer, pos:pos, data:data, orientation:orientation, index:index+this.barOffset};
};
cbd.charting.VerticalBar=function(renderer, grid, data, opt, index)
{
cbd.charting.Bar.call(this, renderer, grid, data, opt, index);
};
cbd.adapter.inheritPrototype(cbd.charting.VerticalBar, cbd.charting.Bar);
cbd.charting.VerticalBar.prototype.getMaxMinValues=function()
{
var max=this.grid.yAxis.origin;
var min=this.grid.yAxis.origin;
for(var i=0;i<this.data.length;i++)
{
for(var j=0;j < this.data[i].length;j++)
{
this.data[i][j]=parseFloat(this.data[i][j]);
if(this.data[i][j]< min)
{
min=this.data[i][j];
}
if(this.data[i][j]> max)
{
max=this.data[i][j];
}
}
}
if(min < 0&&this.showLabels )
{
this.grid.xAxis._labelPosOffset=8;
}
return{min:{x:0, y:min}, max:{x:this.data.length, y:max}};
};
cbd.charting.VerticalBar.prototype.drawBars=function(opts)
{
var grid=this.grid,
origin=grid.getOriginPx(),
min=grid.getMinPix(),
zeroPix=grid.getPix({x:0, y:0}),
yOriginOffset=origin.y - zeroPix.y,
gutterWidth,
xAxis=grid.xAxis,
data=this.data,
dataSize=data.length,
i, j,
centerAlign=this.barOffset==='center',
percentWidth=typeof this.barWidth==='string'&&this.barWidth.indexOf('%') >=0,
totalBarWidth,
widthPerBar,
subSeries,
subSeriesLength,
seriesBars,
columnData,
pxPos, xPos,
labelOpts,
text,
tickOffset=xAxis.firstTickOffset < 1?xAxis.firstTickOffset:0;
if(!this.negativeColors)
{
this.negativeColors=this.colors;
}
if(percentWidth)
{
totalBarWidth=this.barWidth.substring(0, this.barWidth.indexOf('%'));
totalBarWidth=parseInt(totalBarWidth, 10)*0.01;
}
else if(this.barWidth)
{
totalBarWidth=this.barWidth/this.intervalWidth;
}
for(i=0;i < dataSize;i++)
{
subSeries=data[i];
subSeriesLength=subSeries.length;
if(this.barWidth)
{
widthPerBar=totalBarWidth/subSeriesLength;
}
else
{
widthPerBar=1/(subSeriesLength+1);
totalBarWidth=widthPerBar*subSeriesLength;
}
opts.width=Math.floor(this.intervalWidth*widthPerBar);
if(centerAlign)
{
this.barOffset=(1 - totalBarWidth)/2;
}
seriesBars=[];
for(j=0;j < subSeriesLength;j++)
{
columnData=subSeries[j];
if(this.barWidth)
{
pxPos=grid.getPix({x:i*this.barDelta+tickOffset+this.barOffset, y:columnData});
pxPos.x=Math.round(pxPos.x+(j*opts.width));
}
else
{
xPos=(j+tickOffset)/(subSeriesLength+1)+this.barDelta*i+this.barOffset;
pxPos=grid.getPix({x:xPos,y:columnData});
}
opts.xStart=pxPos.x;
opts.height=isNaN(pxPos.y)?0:(origin.y - pxPos.y);
opts.clr=columnData < 0?this.negativeColors[j]:this.colors[j];
this.renderer.drawVertBar(opts);
if(this.showLabels )
{
if(!gutterWidth )
{
gutterWidth=pxPos.x - min.x;
}
labelOpts={text:columnData, w:opts.width, x:opts.xStart, y:pxPos.y, h:10, align:'center', cssClass:this.labelsCss};
this.showLabels=this.drawLabels(labelOpts, j, subSeriesLength, gutterWidth);
}
if(isNaN(pxPos.y) )
{
text="N/A";
}
else
{
text=cbd.charting._formatLabel(columnData, this.format, xAxis.precision);
}
seriesBars.push({x1:opts.xStart, x2:opts.xStart+opts.width, y1:opts.yStart, y2:opts.yStart-opts.height, color:opts.clr, data:text});
}
this.bars.push(seriesBars);
}
this.drawDottedGridLines();
};
cbd.charting.VerticalBar.prototype.drawDottedGridLines=function(opts)
{
var dottedLineIndex, xPos;
for(dottedLineIndex in this.dottedGridLines)
{
xPos=this.dottedGridLines[dottedLineIndex];
opts={
xStart:xPos,
xEnd:xPos,
orientation:'vertical'
};
this.renderer.drawDottedGridLine(opts);
}
};
cbd.charting.VerticalBar.prototype.drawLabels=function(opts, colIndex, numOfCols, spaceBetween)
{
var origin=this.grid.getOriginPx();
if(isNaN(opts.y) )
{
if(!this.showNull)
{
return true;
}
opts.text='N/A';
opts.y=origin.y - 13;
}
else
{
opts.y+=opts.text < 0?3:-15;
opts.text=cbd.charting._formatLabel(opts.text, this.format, this.grid.xAxis.precision);
}
if(numOfCols > 1 )
{
if(colIndex==0  )
{
opts.w+=spaceBetween;
opts.align="right";
opts.x -=spaceBetween;
}
else if(colIndex==numOfCols-1 )
{
opts.w+=spaceBetween;
opts.align="left";
}
}
var labelDiv=cbd.charting._getDivHtml(opts.text, this.labelsCss);
this.renderer.addLabel(opts, cbd.charting.Bar.seriesLabelDivId);
return cbd.charting._estimateMaxWidth(this.renderer.id, labelDiv) <=opts.w;
};
cbd.charting.StackedBar=function(renderer, grid, data, opt, index)
{
cbd.charting.Bar.call(this, renderer, grid, data, opt, index);
};
cbd.adapter.inheritPrototype(cbd.charting.StackedBar, cbd.charting.Bar);
cbd.charting.StackedBar.prototype.getMaxMinValues=function()
{
var max=0;
var min=0;
for(var i=0;i<this.data.length;i++)
{
var height=0;
for(var j=0;j<this.data[i].length;j++)
{
this.data[i][j]=parseFloat(this.data[i][j]);
if(!isNaN(this.data[i][j]) )
{
height+=this.data[i][j];
}
}
if(height < min)
{
min=height;
}
if(height > max)
{
max=height;
}
}
return{min:{x:0, y:min}, max:{x:this.data.length, y:max}};
};
cbd.charting.StackedBar.prototype.drawBars=function(opts)
{
var origin=this.grid.getOriginPx(),
grid=this.grid,
xAxis=grid.xAxis,
data=this.data,
dataSize=data.length,
subSeries, subSeriesLength, columnData, xPos, pxPos,
offset=xAxis.firstTickOffset+this.barOffset,
i,
sumOfData,
barTopLabel,
showLabel,
seriesBars,
showLabelsAsTotal,
j,
labelOpts,
drawLabels;
for(i=0;i<dataSize;i++)
{
opts.yStart=origin.y;
subSeries=data[i];
subSeriesLength=subSeries.length;
opts.width=this.barWidth?this.barWidth:Math.floor(this.intervalWidth/2);
sumOfData=0;
barTopLabel="";
showLabel=false;
seriesBars=[];
showLabelsAsTotal=false;
if(this.showLabels&&this.showLabelsAsTotal)
{
showLabelsAsTotal=true;
}
for(j=0;j < subSeriesLength;j++)
{
columnData=subSeries[j];
sumOfData+=subSeries[j];
if(j!=(subSeriesLength - 1) )
{
showLabel=false;
}
else
{
showLabel=true;
}
barTopLabel=sumOfData;
pxPos=grid.getPix({x:i*this.barDelta+offset,y:columnData});
opts.xStart=pxPos.x-opts.width/2;
opts.height=isNaN(pxPos.y)?0:origin.y - pxPos.y;
if(this.colors[i]instanceof Array)
{
opts.clr=this.colors[i][j];
}
else
{
opts.clr=this.colors[j];
}
this.renderer.drawVertBar(opts);
if(showLabel)
{
labelOpts={text:barTopLabel, w:opts.width, x:opts.xStart, y:opts.yStart - opts.height, h:10, align:'center', cssClass:this.labelsCss};
drawLabels=this.drawLabels(labelOpts, j, this.data[i].length, this.intervalWidth/2);
this.showLabels=this.showLabels&&drawLabels;
}
opts.yStart -=opts.height;
seriesBars.push({x1:opts.xStart, x2:opts.xStart+opts.width, y1:opts.yStart, y2:opts.yStart-opts.height, color:opts.clr, data:columnData});
}
this.bars.push(seriesBars);
}
};
cbd.charting.StackedBar.prototype.drawLabels=function(opts, colIndex, numOfCols, spaceBetween)
{
opts.y -=15;
if(isNaN(opts.text) )
{
opts.text='N/A';
}
if(this.labelFormat )
{
opts.text=this.labelFormat(opts.text, colIndex);
}
else
{
opts.text=cbd.charting._formatLabel(opts.text, this.format, this.grid.xAxis.precision);
}
var labelDiv=cbd.charting._getDivHtml(opts.text, this.labelsCss);
this.renderer.addLabel(opts, cbd.charting.Bar.seriesLabelDivId);
return cbd.charting._estimateMaxWidth(this.renderer.id, labelDiv) <=opts.w;
};
cbd.charting.StackedBar.prototype.getToolTipConfig=function(eventPos, toolTipConfig)
{
var max=this.grid.getMaxPix();
var min=this.grid.getMinPix();
if(eventPos.x >=min.x&&eventPos.x <=max.x
&&eventPos.y >=max.y&&eventPos.y <=min.y )
{
var val=this.grid.getVal(eventPos);
var index;
var xVal=Math.floor(val.x);
var barWidthRatio=this.bars.length/(this.bars.length*2);
var offset=this.grid.xAxis.firstTickOffset -(barWidthRatio/2);
if(val.x >=(xVal+offset)&&val.x <=(xVal+(offset+barWidthRatio)))
{
index=xVal;
}
return this.getToolTipConfigByIndex(index, toolTipConfig);
}
};
cbd.charting.StackedBar.prototype.getToolTipConfigByIndex=function(index, toolTipConfig)
{
'use strict';
var configPoint=toolTipConfig.pos,
j=0,
dataX=configPoint&&configPoint.x,
dataY=configPoint&&configPoint.y,
pos, barsLength,
data=[],
header, footer, orientation, bars, value;
index=Math.round(index/this.barDelta)-this.barOffset;
if(!this.bars[index]||!this.bars[index][0])
{
return;
}
dataX=dataX||this.bars[index][0].x1;
dataY=dataY||this.bars[index][(this.bars[index].length - 1)].y1;
pos={x:dataX, y:dataY};
barsLength=this.bars[index].length;
for(j=0;j < barsLength;j++)
{
bars=this.bars[index][(barsLength -(j+1))];
value=cbd.charting._formatLabel(bars.data, toolTipConfig.format, this.grid.xAxis.precision);
data.push({color:bars.color, fields:[value]});
}
header=this._setupToolTipRegions(toolTipConfig.header, index);
footer=this._setupToolTipRegions(toolTipConfig.footer, index);
orientation=this.getConfigOrientation(pos, toolTipConfig.type, toolTipConfig.orientation, this);
return{header:header, footer:footer, pos:pos, data:data, orientation:orientation, index:index+this.barOffset};
};
cbd.charting.HorizontalBar=function(renderer, grid, data, opt, index)
{
cbd.charting.Bar.call(this, renderer, grid, data, opt, index);
};
cbd.adapter.inheritPrototype(cbd.charting.HorizontalBar, cbd.charting.Bar);
cbd.charting.HorizontalBar.prototype.getMaxMinValues=function()
{
var data=this.getDataBoundary();
return{min:{x:data.min, y:0}, max:{x:data.max, y:this.data.length}};
};
cbd.charting.Bar.prototype.getDataBoundary=function()
{
var max=this.grid.yAxis.origin,
min=this.grid.yAxis.origin,
dataSize=this.data.length,
data,subDataSize,i,j;
for(i=0;i<dataSize;i++)
{
subDataSize=this.data[i].length;
for(j=0;j < subDataSize;j++)
{
this.data[i][j]=parseFloat(this.data[i][j]);
data=this.data[i][j];
if(data < min)
{
min=data;
}
if(data > max)
{
max=data;
}
}
}
if(min < 0&&this.showLabels )
{
this.grid.xAxis._labelPosOffset=8;
}
return{min:min, max:max};
};
cbd.charting.HorizontalBar.prototype.drawBars=function(opts)
{
var grid=this.grid,
origin=grid.getOriginPx(),
min=grid.getMinPix(),
zeroPix=grid.getPix({x:0, y:0}),
yOriginOffset=origin.y - zeroPix.y,
xAxis=grid.xAxis ,
yAxis=grid.yAxis,
data=this.data,
dataSize=data.length,
XOFFSET=5 ,NEGATIVEXOFFSET=-20,labelOpts,text,gutterWidth,
subSeries,subSeriesLength,seriesBars,columnData,pxPos,i,j,yPos;
if(!this.negativeColors )
{
this.negativeColors=this.colors;
}
for(i=0;i < dataSize;i++)
{
subSeries=data[i];
subSeriesLength=subSeries.length;
opts.height=this.barWidth||Math.floor(this.intervalWidth/(subSeriesLength+1));
seriesBars=[];
for(j=0;j < subSeriesLength;j++)
{
columnData=subSeries[j];
if(this.barWidth)
{
pxPos=grid.getPix({y:i*this.barDelta+yAxis.firstTickOffset+this.barOffset,x:columnData});
pxPos.y=Math.round(pxPos.y -(j-(subSeriesLength-1)/2)*opts.height);
}
else
{
yPos=(j+yAxis.firstTickOffset)/(subSeriesLength+1)+this.barDelta*i+this.barOffset;
pxPos=grid.getPix({y:yPos,x:columnData});
}
opts.width=pxPos.x - origin.x;
opts.xStart=origin.x;
opts.yStart=pxPos.y;
opts.clr=columnData < 0?this.negativeColors[j]:this.colors[j];
this.renderer.drawHorizBar(opts);
if(this.showLabels )
{
if(!gutterWidth )
{
gutterWidth=pxPos.x - min.x;
}
labelOpts={text:columnData,  x:opts.xStart+opts.width, y:pxPos.y-opts.height, h:opts.height, align:'center', cssClass:this.labelsCss};
labelOpts.x+=opts.width >=0?XOFFSET:NEGATIVEXOFFSET;
this.drawLabels(labelOpts, j, subSeriesLength, gutterWidth);
}
if(isNaN(pxPos.x) )
{
text="N/A";
}
else
{
text=cbd.charting._formatLabel(columnData, this.format, xAxis.precision);
}
seriesBars.push({x1:opts.xStart, x2:opts.xStart+opts.width, y1:opts.yStart, y2:opts.yStart-opts.height, color:opts.clr, data:text});
}
this.bars.push(seriesBars);
}
};
cbd.charting.HorizontalBar.prototype.drawLabels=function(opts, colIndex, numOfCols, spaceBetween)
{
var origin=this.grid.getOriginPx(),labelDiv;
if(isNaN(opts.x) )
{
if(!this.showNull)
{
return true;
}
opts.text='N/A';
opts.x=origin.x+15;
opts.y+=5;
}
else
{
opts.text=cbd.charting._formatLabel(opts.text, this.format, this.grid.xAxis.precision);
}
labelDiv=cbd.charting._getDivHtml(opts.text, this.labelsCss);
this.renderer.addLabel(opts, cbd.charting.Bar.seriesLabelDivId);
};
cbd.charting.HorizontalBar.prototype.setOptions=function()
{
var grid=this.grid,
pxMax=grid.getMaxPix(),
pxMin=grid.getMinPix();
this.height=pxMax.y - pxMin.y;
this.width=pxMax.x - pxMin.x;
this.barDelta=this.barDelta||grid.yAxis.delta;
this.intervalWidth=-(this.height/grid.yAxis.max);
this.renderer.setOptions({x:0,y:0,h:this.height,w:this.width,units:10,bkclr:'white'});
};
(function(cbd)
{
'use strict';
var LEADER_HEIGHT=11,
LEADER_WIDTH=20,
TOOLTIP_CONTAINER='tooltipContainer';
cbd.ToolTip=function(config)
{
var THIS=this,
handleMouseOver=function()
{
THIS._mouseOutOrOverFlag=true;
THIS.hasHover=true;
},
handleMouseOut=function()
{
var closeMenuFunc=function(){
if(!THIS._mouseOutOrOverFlag)
{
THIS.hasHover=false;
if(config.closeOnMouseOut )
{
THIS.close();
}
}
};
setTimeout(closeMenuFunc, 0);
},
adapter=cbd.adapter;
this.viewNode=document.getElementById(config.id);
this.loc=config.location;
this.orientation=config.orientation;
this.hasLeader=config.leader===undefined||config.leader;
this.boundary=config.boundary;
this.individual=config.individual;
this.closeOnMouseOut=config.closeOnMouseOut;
this.id=config.id;
this.tooltipIndex=undefined;
this.chartContainerWidth=config.chartContainerWidth||0;
this.content=config.contentNode;
this.count=config.count;
this.hasHover=false;
this._mouseOutOrOverFlag=false;
adapter.addEventListener({node:this.viewNode, event:adapter.getEventName("HOVER_START"), func:handleMouseOver});
adapter.addEventListener({node:this.viewNode, event:adapter.getEventName("HOVER_END"), func:handleMouseOut});
if(this.individual)
{
this._buildToolTips(this.count);
}
else
{
this._buildToolTip();
}
};
cbd.ToolTip.prototype=
{
open:function(index)
{
this.viewNode.style.display='inline';
this._updateToolTipContainerTarget(index);
},
_updateToolTipContainerTarget:function(index)
{
var substitute;
if(!isNaN(this.tooltipIndex))
{
substitute=this.viewNode.className.indexOf(TOOLTIP_CONTAINER+this.tooltipIndex);
if(substitute!==-1)
{
this.viewNode.className=this.viewNode.className.substring(0, substitute - 1);
}
}
if(!isNaN(index)&&this.viewNode.className.indexOf(TOOLTIP_CONTAINER+index)===-1)
{
this.viewNode.className+=" "+TOOLTIP_CONTAINER+index;
this.tooltipIndex=index;
}
},
close:function(index)
{
this.viewNode.style.display='none';
this._updateToolTipContainerTarget(index);
},
setLocation:function(location)
{
this.loc=location;
},
update:function(content)
{
var ttPos, toolTipDiv, toolTipContainer, leader,
nodeListLength=this.viewNode.children.length,
adapter=cbd.adapter,
length=content.length,
index;
for(index=0;index < length;index++)
{
this.viewNode.childNodes[index].style.display='';
if(!(this.closeOnMouseOut&&this.hasHover))
{
toolTipContainer=this._getToolTipDiv(index);
toolTipDiv=this._getToolTip(index);
toolTipDiv.innerHTML=content[index];
if(this.hasLeader)
{
toolTipContainer.replaceChild(this._createToolTipLeader(), this._getToolTipLeader(index));
leader=this._getToolTipLeader(index);
if(this.orientation==="left")
{
adapter.addClass(leader, 'xLdrRgt');
}
else if(this.orientation==="right")
{
adapter.addClass(leader, 'xLdrLft');
}
else
{
adapter.addClass(leader, 'xLdrBot');
}
}
if(this.loc&&this.loc[index])
{
ttPos=this._getPosByLoc(toolTipDiv, index);
}
else if(this.boundary)
{
toolTipDiv.style.left=0;
toolTipDiv.style.top=0;
ttPos=this._getPosByBoundary(toolTipDiv);
}
toolTipDiv.style.left=ttPos.x+'px';
toolTipDiv.style.top=ttPos.y+'px';
}
}
for(index;index < nodeListLength;index++)
{
toolTipContainer=this._getToolTipDiv(index);
if(toolTipContainer)
{
toolTipContainer.style.display='none';
}
}
},
isNotWithinContainerBounds:function()
{
var i, isNot=false, length=this.count;
for(i=0;i < length;i++)
{
if(this._isNotWithinContainerBoundHelper(i))
{
isNot=true;
}
}
return isNot;
},
_isNotWithinContainerBoundHelper:function(index)
{
var boundary=this.boundary,
orientation=this.orientation,
toolTipDiv=this._getToolTip(index),
xLoc=toolTipDiv?parseInt(toolTipDiv.style.left, 10):false;
return boundary&&xLoc!==false&&
((orientation==='right'&&boundary.right <(xLoc+toolTipDiv.offsetWidth+LEADER_WIDTH))
||(orientation==='left'&&-boundary.left > xLoc));
},
_setToolTipWidth:function(toolTip, offsetWidth)
{
var IE9_ROUNDING_BUFFER=1;
toolTip.style.width=offsetWidth+IE9_ROUNDING_BUFFER+'px';
},
_getPosByLoc:function(toolTipDiv, index)
{
var ttPos,
ldrPos,
toolTipLdr,
boundaryRightPadding,
location=this.loc[index],
boundaryLeft=this.boundary?this.boundary.left:0,
boundaryRight=this.boundary?this.boundary.right:0;
boundaryRightPadding=Math.max(0,(this.chartContainerWidth - boundaryRight));
toolTipDiv.style.width="";
if(this.orientation==='left')
{
toolTipLdr=this._getToolTipLeader(index);
ldrPos={x:location.x - LEADER_HEIGHT ,
y:location.y - LEADER_WIDTH/2};
if(toolTipLdr)
{
toolTipLdr.style.left=ldrPos.x+'px';
toolTipLdr.style.top=ldrPos.y+'px';
}
ttPos={x:location.x - toolTipDiv.offsetWidth - LEADER_HEIGHT+1,
y:location.y - toolTipDiv.offsetHeight/2};
this._setToolTipWidth(toolTipDiv, toolTipDiv.offsetWidth);
}
else if(this.orientation==='right')
{
toolTipLdr=this._getToolTipLeader(index);
ldrPos={x:location.x, y:location.y - LEADER_WIDTH/2};
if(toolTipLdr)
{
toolTipLdr.style.left=ldrPos.x+'px';
toolTipLdr.style.top=ldrPos.y+'px';
}
ttPos={x:location.x+LEADER_HEIGHT,
y:location.y - toolTipDiv.offsetHeight/2};
this._setToolTipWidth(toolTipDiv, toolTipDiv.offsetWidth);
}
else if(this.orientation==='top')
{
toolTipLdr=this._getToolTipLeader(index);
ldrPos={x:location.x - LEADER_WIDTH/2,
y:location.y - LEADER_HEIGHT};
if(toolTipLdr)
{
toolTipLdr.style.left=ldrPos.x+'px';
toolTipLdr.style.top=ldrPos.y+'px';
}
ttPos={x:location.x - toolTipDiv.offsetWidth/2,
y:location.y - LEADER_HEIGHT - toolTipDiv.offsetHeight+1};
if(location.x - toolTipDiv.offsetWidth/2 < -boundaryLeft)
{
ttPos.x=-boundaryLeft;
}
else if((location.x+toolTipDiv.offsetWidth/2) >(boundaryRight+boundaryRightPadding-boundaryLeft))
{
ttPos.x=(boundaryRight+boundaryRightPadding-boundaryLeft)- toolTipDiv.offsetWidth;
}
this._setToolTipWidth(toolTipDiv, toolTipDiv.offsetWidth);
}
else
{
ttPos={x:location.x, y:location.y};
}
if(this.boundary)
{
this._adjustPosBasedOnBoundary(toolTipDiv, ttPos, ldrPos);
}
return ttPos;
},
_getPosByBoundary:function(toolTipDiv)
{
var margin=9,
boundary=this.boundary,
ttPos={x:0, y:0};
if(this.orientation.indexOf('left') > -1 )
{
ttPos.x=boundary.left+margin;
}
else if(this.orientation.indexOf('right') > -1 )
{
ttPos.x=boundary.right - toolTipDiv.offsetWidth - margin;
}
else
{
ttPos.x=boundary.left+(boundary.right - boundary.left)/2 - toolTipDiv.offsetWidth/2;
}
if(this.orientation.indexOf('top') > -1 )
{
ttPos.y=boundary.top+margin;
}
else if(this.orientation.indexOf('bottom') > -1 )
{
ttPos.y=boundary.bottom - toolTipDiv.offsetHeight - margin;
}
else
{
ttPos.y=boundary.top+(boundary.bottom - boundary.top)/2 - toolTipDiv.offsetHeight/2;
}
return ttPos;
},
_adjustPosBasedOnBoundary:function(toolTipDiv, toolTipPos, leaderPos)
{
var boundary=this.boundary,
orientation=this.orientation,
bottomOfLeader,
topOfLeader;
if(orientation==="right"||orientation==="left" )
{
if(boundary.bottom <(toolTipPos.y+toolTipDiv.offsetHeight) )
{
bottomOfLeader=leaderPos.y+LEADER_WIDTH+4;
if(boundary.bottom < bottomOfLeader )
{
toolTipPos.y=bottomOfLeader - toolTipDiv.offsetHeight;
}
else
{
toolTipPos.y=boundary.bottom - toolTipDiv.offsetHeight;
}
}
if(boundary.top > toolTipPos.y )
{
topOfLeader=leaderPos.y - 4;
if(boundary.top > topOfLeader )
{
toolTipPos.y=topOfLeader;
}
else
{
toolTipPos.y=boundary.top;
}
}
}
},
setOrientation:function(pos)
{
this.orientation=pos;
},
_buildToolTip:function()
{
this._buildToolTips(1);
},
_buildToolTips:function(listSize)
{
var i;
this.close();
for(i=listSize - 1;i >=0;i--)
{
if(!this._getToolTipDiv(i))
{
this.viewNode.appendChild(this._createToolTipDiv(i));
}
}
this.viewNode.removeChild(this.content);
},
_createToolTipDiv:function(index)
{
var toolTipDiv=document.createElement('div');
toolTipDiv.appendChild(this._createToolTip());
if(this.hasLeader)
{
toolTipDiv.appendChild(this._createToolTipLeader());
}
cbd.adapter.addClass(toolTipDiv, 'toolTip'+index);
return toolTipDiv;
},
_getToolTipDiv:function(index)
{
return cbd.adapter.getElement({node:this.viewNode, cssClass:'toolTip'+index, tag:'div'});
},
_createToolTip:function()
{
var toolTip=document.createElement('div').appendChild(this.content.cloneNode(true));
cbd.adapter.addClass(toolTip, 'toolTip');
return toolTip;
},
_getToolTip:function(index)
{
return cbd.adapter.getElement({node:this._getToolTipDiv(index), cssClass:'toolTip', tag:'div'});
},
_createToolTipLeader:function()
{
var leader=document.createElement('div');
cbd.adapter.addClass(leader, 'leader');
return leader;
},
_getToolTipLeader:function(index)
{
return cbd.adapter.getElement({node:this._getToolTipDiv(index), cssClass:'leader', tag:'div'});
}
};
}(cbd));

