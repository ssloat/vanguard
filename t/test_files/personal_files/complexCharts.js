
var EmptyFunc=function(){};
EmptyFunc.prototype=cbd.charting.Chart.prototype;
cbd.charting.EtfFees=function(id, config )
{
"use strict";
var chartColors=[[[{pattern:['#85B1DC','#F0F0F0']}],['#5190CD','#F0F0F0']]],
positionLabels=function(that)
{
var grid=that.grid,
xAxis=grid.xAxis,
yAxisMax=grid.yAxis.max,
renderer=that.renderer,
data=that.data,
axisHeight=grid.h,
origin=grid.getOriginPx(),
width=that.barWidth,
xAxisDelta=xAxis.delta,
xAxisFirstTickOffset=xAxis.firstTickOffset,
labelBuffer=3,
maxSpaceWithBreak=45,
maxSpaceNoBreak=16,
lineOffset=17,
extendedYouSaveWidth=100,
patternBar=data[0][0],
grayBar=data[1][1],
blueBar=data[1][0],
generateLabelOption=function(barData, index)
{
var pxPos=grid.getPix({x:index*xAxisDelta+xAxisFirstTickOffset}),
xStart=pxPos.x - width/2,
formattedText,
labelPosition,
labelOpts;
if(isNaN(barData))
{
formattedText='N/A';
labelPosition=Math.round(axisHeight);
}
else
{
formattedText=cbd.charting._formatLabel(barData,'dollar',0);
labelPosition=Math.round(axisHeight -(barData*axisHeight)/yAxisMax);
}
labelOpts={text:formattedText, w:width, x:xStart, y:labelPosition+labelBuffer, h:10, align:'center', cssClass:that.labelsCss};
return labelOpts;
},
labelOptsPattern=generateLabelOption(patternBar,0),
labelOptsBlue=generateLabelOption(blueBar,1),
labelOptsGray={},
addGrayBar=data[1].length===2,
positionDiff;
if(addGrayBar)
{
labelOptsGray=generateLabelOption(patternBar,1);
labelOptsGray.text="You save <b>"+cbd.charting._formatLabel(grayBar,'dollar',0)+"</b>";
}
positionDiff=labelOptsBlue.y - labelOptsGray.y;
if(positionDiff < maxSpaceNoBreak)
{
labelOptsGray.w=extendedYouSaveWidth;
labelOptsGray.x+=width/2 - extendedYouSaveWidth/2;
labelOptsBlue.y+=lineOffset;
}
else if(positionDiff < maxSpaceWithBreak)
{
labelOptsGray.w=extendedYouSaveWidth;
labelOptsGray.x+=width/2 - extendedYouSaveWidth/2;
}
else
{
labelOptsGray.y+=lineOffset;
}
renderer.addLabel(labelOptsPattern,'barLabels');
renderer.addLabel(labelOptsBlue,'barLabels');
if(addGrayBar)
{
renderer.addLabel(labelOptsGray,'barLabels');
}
renderer.drawLabels('barLabels');
};
this._configureWidthAndHeight(id, config);
this.renderer=new cbd.ChartRenderer(id, config.parent, 'gridChart');
this.renderer.initialize(id, config.w,{left:0, right:0}, config.h, 'etfFeesChart');
this.base=vg.Controller;
this.base(id, id , true);
this.config={chartType:'stackedBar',
series:{showLabels:false, barWidth:62, showNull:false, animate:{time:100, frames:5, afterAnim:positionLabels}, colors:chartColors},
margins:{left:"auto", right:10, top:20, bottom:0},
grid:{w:292, h:165, yAxis:{axisColor:'black', formatFirstAndLast:false, format:"dollar", maxIntervals:4, minIntervals:2, tickLength:5, tickColor:'black'}, xAxis:{showGrid:true, showTicks:false, delta:0.93, precision:0, firstTickOffset:0.47, labels:config.labels, tickLength:5, showAxis:false, showOrigin:true, originColor:'black'}}};
if(config.series&&config.series.colors)
{
delete config.series.colors;
}
vg.util.deepAttachOptions(this.config, config );
this.createGrid(this.config);
};
cbd.charting.EtfFees.prototype=new EmptyFunc();
cbd.charting.EtfFees.prototype.processData=function(data)
{
var dataPoints=data.series[0].data,
dataPoint0=dataPoints[0][0],
dataPoint1=dataPoints[1][0],
newDataPoint=dataPoint0-dataPoint1,
myChart;
if(newDataPoint>0)
{
dataPoints=[[dataPoint0],[dataPoint1,dataPoint0-dataPoint1]];
}
else
{
dataPoints=[[dataPoint0],[dataPoint1]];
}
myChart={chartType:'stackedBar',data:dataPoints,format:"dollar"};
return{series:[myChart]};
};
cbd.charting.AcctProgress=function(id, config )
{
"use strict";
cbd.charting.Chart.call(this,id,config);
this.grid.positiveYAxisTicks=0;
this.grid.negativeYAxisTicks=0;
this.grid.zeroYAxisTicks=0;
this.grid.noOfYAxisTicks=5;
this.grid.calculateDelta=cbd.charting.AcctProgress.calculateDelta;
this.grid.calculateYAxisTicks=cbd.charting.AcctProgress.calculateYAxisTicks;
this.grid.calculateYAxisDelta=cbd.charting.AcctProgress.calculateYAxisDelta;
};
cbd.charting.AcctProgress.prototype=new EmptyFunc();
cbd.charting.AcctProgress.calculateDelta=function(obj)
{
var originalMin=obj.min,
originalMax=obj.max,
distance, log10Distance, roundingDistance,
minNumEvaluator, newMin,
maxNumEvaluator, newMax, newDistance,
initialDelta, log10Delta, roundingDelta, newDelta;
if(originalMax - originalMin==0)
{
originalMin -=50;
originalMax+=50;
}
else if(Math.abs(originalMax - originalMin)==1){
originalMin -=1;
}
distance=Math.abs(originalMax - originalMin);
log10Distance=Math.log(distance)/Math.log(10);
log10Distance=distance < 100?Math.ceil(log10Distance):Math.floor(log10Distance);
roundingDistance=log10Distance==1?10:Math.pow(10, log10Distance - 1);
minNumEvaluator=(originalMin -(roundingDistance - 1))/roundingDistance;
newMin=minNumEvaluator > 0?Math.floor(minNumEvaluator)*roundingDistance:Math.ceil(minNumEvaluator)*roundingDistance;
maxNumEvaluator=(originalMax+(roundingDistance - 1))/roundingDistance;
newMax=maxNumEvaluator > 0?Math.floor(maxNumEvaluator)*roundingDistance:Math.ceil(maxNumEvaluator)*roundingDistance;
newDistance=Math.abs(newMax - newMin);
this.noOfYAxisTicks=this.calculateYAxisTicks(originalMin, originalMax, newMin, newMax);
initialDelta=this.calculateYAxisDelta(newMin, newMax, newDistance);
log10Delta=Math.log(initialDelta)/Math.log(10);
log10Delta=initialDelta < 100?Math.ceil(log10Delta):Math.floor(log10Delta);
roundingDelta=log10Delta==1?10:Math.pow(10, log10Delta - 1);
newDelta=Math.floor(((initialDelta+(roundingDelta - 1))/roundingDelta))*roundingDelta;
if(newMax > 0&&newMin < 0)
{
obj.min=0 -(newDelta*this.negativeYAxisTicks);
obj.max=newDelta*this.positiveYAxisTicks;
}
else if(newMin >=0)
{
obj.min=newMin;
if(obj.min==0)
{
obj.max=newDelta*this.positiveYAxisTicks;
}
else
{
obj.max=obj.min+(newDelta*(this.positiveYAxisTicks - 1));
}
}
else
{
obj.max=newMax;
if(obj.max==0)
{
obj.min=0 -(newDelta*this.negativeYAxisTicks);
}
else
{
obj.min=obj.max -(newDelta*(this.negativeYAxisTicks - 1));
}
}
obj.delta=newDelta;
obj.intervals=Math.abs(obj.max - obj.min)/obj.delta;
obj.range=(obj.max - obj.min);
};
cbd.charting.AcctProgress.calculateYAxisTicks=function(origMin, origMax, newMin, newMax)
{
if(newMax > 0&&newMin > 0)
{
this.positiveYAxisTicks=5;
this.negativeYAxisTicks=0;
this.zeroYAxisTicks=0;
}
else if(newMax < 0&&newMin < 0)
{
this.positiveYAxisTicks=0;
this.negativeYAxisTicks=5;
this.zeroYAxisTicks=0;
}
else
{
this.zeroYAxisTicks=1;
if(newMin==0&&newMax > 0)
{
this.positiveYAxisTicks=4;
this.negativeYAxisTicks=0;
}
else if(newMax==0&&newMin < 0)
{
this.positiveYAxisTicks=0;
this.negativeYAxisTicks=4;
}
else
{
if(origMax > Math.abs(origMin))
{
var X=(origMax*(this.noOfYAxisTicks - 1)*10)/(newMax - newMin);
this.positiveYAxisTicks=Math.floor((X+3)/10);
if(this.positiveYAxisTicks < 1){
this.positiveYAxisTicks=1;
}
this.negativeYAxisTicks=Math.floor((this.noOfYAxisTicks - this.positiveYAxisTicks) - 1);
if(this.negativeYAxisTicks < 1){
this.negativeYAxisTicks=1;
}
}
else
{
var X=(Math.abs(origMin)*(this.noOfYAxisTicks - 1)*10)/(newMax - newMin);
this.negativeYAxisTicks=Math.floor((X+3)/10);
if(this.negativeYAxisTicks < 1){
this.negativeYAxisTicks=1;
}
this.positiveYAxisTicks=Math.floor((this.noOfYAxisTicks - this.negativeYAxisTicks) - 1);
if(this.positiveYAxisTicks < 1){
this.positiveYAxisTicks=1;
}
}
}
}
return(this.positiveYAxisTicks+this.negativeYAxisTicks+this.zeroYAxisTicks);
};
cbd.charting.AcctProgress.calculateYAxisDelta=function(newMin, newMax, newDist)
{
var delta=0,
X, Y;
if(newMax > 0&&newMin < 0)
{
X=newMax/this.positiveYAxisTicks;
Y=0 -(X*this.negativeYAxisTicks);
delta=Y < newMin?X:newMin/this.negativeYAxisTicks;
}
else
{
if(newMax==0||newMin==0)
{
delta=newDist/(this.positiveYAxisTicks+this.negativeYAxisTicks);
}
else
{
delta=newDist/((this.positiveYAxisTicks+this.negativeYAxisTicks) - 1);
}
}
return Math.abs(delta);
};
cbd.charting.PriceHistory=function(id, config )
{
"use strict";
this._configureWidthAndHeight(id, config);
this.renderer=new cbd.ChartRenderer(id, config.parent, 'gridChart');
this.renderer.initialize(id, config.w,{left:0, right:0}, config.h, 'gridChart');
this.base=vg.Controller;
this.base(id, id , true);
this.config={chartType:'line',
legend:{pos:'bottom'},
aod:{pos:'left'},
schema:{meta:["aod", "dataRange", "chartType", "drawPrevCls"],
seriesNode:"priceHistory", dataPt:"ph", errorNode:'errCode'},
grid:{
xAxis:{ticksOnAxis:false, tickLength:5, showAxis:false, showOrigin:true, originColor:'black'},
yAxis:{axisColor:'black', maxIntervals:4, minIntervals:2, tickLength:5}
},
series:{lineOffset:0.5}};
this.config.margins={left:"auto", top:22, right:15, bottom:0};
vg.util.deepAttachOptions(this.config, config );
this.createGrid(this.config);
this.grid.getLabelWidth=this.getLabelWidth;
};
cbd.charting.PriceHistory.intraDayLabels=["","10AM","","12PM","","02PM","","04PM"];
cbd.charting.PriceHistory.prototype=new EmptyFunc();
cbd.charting.PriceHistory.noOfTicks={INTRA_DAY:8, ONE_WEEK:6, ONE_MONTH:5, THREE_MONTH:7, SIX_MONTH:7, ONE_YEAR:7, THREE_YEAR:7, FIVE_YEAR:6, TEN_YEAR:11};
cbd.charting.PriceHistory.sumChartNoOfTicks={INTRA_DAY:8, ONE_WEEK:6, ONE_MONTH:3, THREE_MONTH:3, SIX_MONTH:3, ONE_YEAR:3, THREE_YEAR:3, FIVE_YEAR:3, TEN_YEAR:3};
cbd.charting.PriceHistory.marketClosedError="The market is closed.";
cbd.charting.PriceHistory.pinkSheetError="Charts are not available for stocks listed in the Pink Sheets&reg;";
cbd.charting.PriceHistory.prototype.processErrorCode=function(errCode)
{
if(errCode=="MARKET_CLOSE"||errCode=="MARKET_PREOPEN_DAY_AFTER_CLOSE")
{
this.showError(cbd.charting.PriceHistory.marketClosedError, cbd.charting.infoErrorCss);
}
else if(errCode=="PINK_SHEET")
{
this.showError(cbd.charting.PriceHistory.pinkSheetError, cbd.charting.infoErrorCss);
}
else
{
this.showError();
}
};
cbd.charting.PriceHistory.prototype.processData=function(data)
{
"use strict";
var i, j, k, p, series,
maxLength=-1, yDiff,
dataRange=data.dataRange,
chartType=data.chartType,
xAxis=this.grid.xAxis,
yAxis=this.grid.yAxis,
size=data.series[0].data.length,
noOfTicks=(this.config.summary)?
cbd.charting.PriceHistory.sumChartNoOfTicks[data.dataRange]:cbd.charting.PriceHistory.noOfTicks[data.dataRange];
noOfTicks=(size < noOfTicks )?size:noOfTicks;
this.asOfDate=data.aod;
if(chartType==="c")
{
yAxis.title="%";
}
this._createLabels(noOfTicks, data);
xAxis.max=(data.dataRange==="INTRA_DAY")?85:size;
xAxis.intervals=noOfTicks-1;
if(dataRange==="ONE_WEEK")
{
xAxis.labelPos="midinterval";
}
i=data.series.length;
while(i--)
{
series=data.series[i];
if(!series.chartType)
{
series.chartType='line';
series.legendData=[series.attribs.ticker];
k=series.data.length;
while(k--)
{
p=parseFloat(series.data[k].p);
series.data[k]=p;
yAxis.min=(yAxis.min===null||p < yAxis.min)?p:yAxis.min;
yAxis.max=(yAxis.max===null||p > yAxis.max)?p:yAxis.max;
}
if(dataRange==="INTRA_DAY")
{
j=6;
while(j--)
{
series.data.unshift(null);
}
if(chartType==="ph"&&series.attribs.prevCls)
{
data.series.push({chartType:'dashedLine', legendData:["Previous close"], data:series.attribs.prevCls});
}
}
if(maxLength < series.data.length)
{
maxLength=series.data.length;
}
}
}
yDiff=Math.round(yAxis.max - yAxis.min);
switch(yDiff){
case 0:yAxis.precision=2;
break;
case 1:yAxis.precision=1;
break;
default:yAxis.precision=0;
}
this._addMissingPoints(maxLength, data.series);
return data;
};
cbd.charting.PriceHistory.prototype._addMissingPoints=function(length, series)
{
for(var i in series )
{
while(series[i].chartType=='line'&&series[i].data.length < length )
{
series[i].data.unshift(null);
}
}
}
cbd.charting.PriceHistory.prototype._createLabels=function(noOfTicks, data)
{
this.grid.xAxis.labels=new Array();
var size=data.series[0].data.length;
if(data.dataRange=="INTRA_DAY")
{
this.grid.xAxis.labels=cbd.charting.PriceHistory.intraDayLabels;
}
else if(this.config.summary)
{
this.grid.xAxis.labels=cbd.charting.PriceHistory._getSummaryLabels(noOfTicks, data.series[0].data, data.dataRange);
}
else
{
this.grid.xAxis.labels=cbd.charting.PriceHistory._getLabels(noOfTicks, data.series[0].data);
}
}
cbd.charting.PriceHistory._getSummaryLabels=function(numOfTicks, data, range)
{
var labels=new Array();
var size=data.length;
if(range=="ONE_WEEK")
{
for(var i=0;i <=size;i++)
{
if(i % 2==0 )
{
labels.push(data[i]["t"]);
}
else
{
labels.push("" );
}
}
}
else
{
labels.push(data[0]["t"]);
labels.push(data[Math.round(size/2)]["t"]);
labels.push(data[size-1]["t"]);
}
return labels;
}
cbd.charting.PriceHistory._getLabels=function(numOfTicks, data)
{
"use strict";
var size=data.length,
interval=Math.round(size/(numOfTicks-1) ),
i=0,
labels=new Array();
while(i < size)
{
if(labels.length < numOfTicks-1 )
{
labels.push(data[i]["t"]);
}
i+=interval;
}
labels.push("" );
return labels;
}
cbd.charting.PriceHistory.prototype.getLabelWidth=function()
{
return this.xAxis.delta/this.xAxis.range*this.w*2;
}
cbd.charting.G10K=function(id, config)
{
"use strict";
var colors=cbd.charting.colors,
numOfColors=colors.length,
loopIndex=numOfColors;
this._configureWidthAndHeight(id, config);
this.renderer=new cbd.ChartRenderer(id, config.parent, 'gridChart');
this.renderer.initialize(id, config.w,{left:0, right:0}, config.h, 'gridChart');
this.base=vg.Controller;
this.base(id, id , true);
this.config={chartType:'line',
aod:{pos:'left', format:'As of %m/%d/%y'},
legend:{pos:'left'},
schema:{meta:["aod"], seriesNode:"fund", dataPt:"v"},
grid:{w:285, h:190, lineOffset:0.5,
yAxis:{axisColor:'black', title:"$", maxIntervals:4, minIntervals:2, tickLength:5, tickColor:'black'},
xAxis:{type:"time", unit:"month", tickLength:5, showAxis:false, showOrigin:true, originColor:'black'}}
};
this.config.margins={left:70, top:35, right:0, bottom:0};
this.range=120;
this.errorPos={x:73, y:75};
if(config.series&&config.series.colors)
{
delete config.series.colors;
}
if(config.compare)
{
this.compare=true;
this.config.grid.h=230;
this.config.grid.w=550;
this.maxFunds=5;
this.errorPos={x:173, y:75};
}
else if(config.path)
{
this.shortList=true;
this.config.grid.h=160;
}
else
{
this.maxFunds=3;
this.benchMark=null;
this.generic=true;
}
this.addedFunds=[];
this.chartColors=[];
while(loopIndex--)
{
this.chartColors[loopIndex]={color:colors[loopIndex], used:false};
}
vg.util.deepAttachOptions(this.config, config );
this.createGrid(this.config);
this.grid.getLabelWidth=this.getLabelWidth;
};
cbd.charting.G10K.allRanges=[12, 36, 60, 120];
cbd.charting.G10K.maxFundError="You can compare only 3 funds at a time. Remove a fund before adding a new selection."
cbd.charting.G10K.maxFundCompareError="You can compare up to 5 funds or benchmarks. Remove a fund or benchmark before adding a new selection."
cbd.charting.G10K.lessThanYearInitError="We could not display data for one or more funds because it is less than 1 year old."
cbd.charting.G10K.lessThanYearError="We cannot display data because this fund is less than 1 year old.";
cbd.charting.G10K.lessThanMonthError="We cannot display data because this fund is less than 1 month old."
cbd.charting.G10K.loadingMsg="Please wait while we load your data...";
cbd.charting.G10K.removeLink=" <a href='#' onclick='cbd.charting.G10K.removeItem(\"%cid\", \"%fid\");return false;'>Remove</a> ";
cbd.charting.G10K.profileLinkStart="<a href='/us/funds/snapshot?FundIntExt=INT&FundId=";
cbd.charting.G10K.profileLinkEnd="</a> ";
cbd.charting.G10K.layerLink=" <a href='#' onclick='javascript:jsViewLegal(\"%fid\");return false;'>Performance&nbsp;&amp;&nbsp;fees</a></font>";
cbd.charting.G10K.removeItem=function(chartId, fid)
{
var controller=vg.comp.getController(chartId);
if(controller)
{
controller.onRemove(fid);
}
}
cbd.charting.G10K.prototype=new EmptyFunc();
cbd.charting.G10K.prototype.loadData=function(values, loadType, chartType)
{
if(!this.urlArray)
{
var valuesParam='values=';
var index=values.indexOf(valuesParam);
if(index!=-1)
{
var endIndex=values.indexOf('&') > -1?values.indexOf('&'):values.length;
var valuesString=values.substring(index+valuesParam.length, endIndex);
var valuesArray=valuesString.split("?")
this.urlArray=new Array();
this.url=valuesArray[0]+"?fid=";
this.benchUrl=this.url.replace("fid", "bid");
this.initLoad=true;
this.origData=new Object();
this.rangeData=new Object();
this.addedFunds=new Array();
var paramArray=valuesArray[1].split("%26");
for(var i in paramArray)
{
if(paramArray[i].toLowerCase().indexOf("fid") >=0 )
{
var fundArray=paramArray[i].split(",");
for(var k=1;k<fundArray.length;k++)
{
if(fundArray[k])
{
this.addUrl(this.url+fundArray[k],fundArray[k]);
}
}
}
if(paramArray[i].toLowerCase().indexOf("bid") >=0 )
{
var fundArray=paramArray[i].split(",");
for(var k=1;k<fundArray.length;k++)
{
if(fundArray[k])
{
this.addUrl(this.benchUrl+fundArray[k],fundArray[k]);
}
}
}
if(paramArray[i].toLowerCase().indexOf("yrrange") >=0 )
{
var yrrange=paramArray[i].split("=");
var range=parseInt(yrrange[1], 10);
this.range=range*12;
}
}
if(this.urlArray[0].url)
{
this.showError(cbd.charting.G10K.loadingMsg, cbd.charting.infoErrorCss,{w:300, h:45, x:this.errorPos.x, y:this.errorPos.y}, true);
jsCBDgetContent(this.urlArray[0].url, cbd.charting._parseXMLData, this);
}
}
}
}
cbd.charting.G10K.prototype.update=function(data, error, url)
{
if(data&&data.series.length > 0)
{
this.setEndDate(data["aod"]);
this.asOfDate=this.grid.endDate;
var attr=data.series[0].attribs;
if(this.generic&&attr.type=="b")
{
this.benchMark=attr.id;
}
else
{
this.addedFunds.push(attr.id);
}
this.processFund(attr.name, attr.id, attr.type, data.series[0].data, attr.endDate);
}
else
{
for(var i=this.urlArray.length-1;i>=0;i--)
{
if(this.urlArray[i].url==url)
{
this.urlArray.splice(i,1);
}
}
}
if(error)
{
this.processErrorCode(error, url);
}
var fundCount=(this.benchMark)?this.addedFunds.length+1:this.addedFunds.length;
if(fundCount < this.urlArray.length&&this.initLoad)
{
var nextFund=this.urlArray[fundCount];
jsCBDgetContent(nextFund.url, cbd.charting._parseXMLData, this);
}
if(fundCount >=this.urlArray.length)
{
this._update();
this.loadComplete();
}
}
cbd.charting.G10K.prototype.loadComplete=function()
{
this.initLoad=false;
this.showQueuedError();
}
cbd.charting.G10K.prototype.showQueuedError=function()
{
if(this.queuedError)
{
this.showError(this.queuedError.text, this.queuedError.css,{w:300, h:45, x:this.errorPos.x, y:this.errorPos.y}, true);
this.queuedError=null;
}
}
cbd.charting.G10K.prototype.getNextColor=function()
{
for(var i in this.chartColors)
{
if(!this.chartColors[i].used)
{
this.chartColors[i].used=true;
return this.chartColors[i].color;
}
}
return false;
}
cbd.charting.G10K.prototype.resetColor=function(clr)
{
for(var i in this.chartColors)
{
if(this.chartColors[i].color==clr)
{
this.chartColors[i].used=false;
break;
}
}
return false;
}
cbd.charting.G10K.prototype.processFund=function(name, fid, type, fundData, endDate)
{
var startingVal=10000;
var range;
fundData.reverse();
this.origData[fid]=new Object();
this.origData[fid].data=fundData;
this.origData[fid].legendData=[name];
this.origData[fid].type=type;
var profileLink=cbd.charting.G10K.profileLinkStart+fid+"'>"+name+cbd.charting.G10K.profileLinkEnd;
var removeLink=cbd.charting.G10K.removeLink.replace("%fid", fid);
removeLink=removeLink.replace("%cid", this.viewNode.id);
var layerLink=cbd.charting.G10K.layerLink.replace("%fid", fid);
this.origData[fid].color=this.getNextColor();
if(this.compare)
{
if(this.origData[fid].type=="f")
{
this.origData[fid].legendData=[profileLink];
}
}
else if(type=="b")
{
this.origData[fid].legendData=[name+"(Benchmark)|"+removeLink];
}
else if(this.generic&&fid!=this.urlArray[0].fid)
{
this.origData[fid].legendData=[profileLink+"|"+removeLink+"|"+layerLink];
}
this.rangeData[fid]=new Object();
var fundEndMonth=parseInt(String(endDate).substring(0, 2), 10) - 1;
var fundEndYear=parseInt(String(endDate).substring(2), 10);
fundEndYear+=fundEndYear > 50?1900:2000;
var fundOffset=(this.asOfDate.getMonth() - fundEndMonth)+12*(this.asOfDate.getFullYear() - fundEndYear);
for(var k in cbd.charting.G10K.allRanges)
{
range=cbd.charting.G10K.allRanges[k];
var priceData=new Array();
var percentData=fundData;
var percentIndex=percentData.length - range;
var priceIndex=0;
if(percentIndex<0)
{
percentIndex+=fundOffset;
while(percentIndex < 0)
{
priceData[priceIndex]=null;
priceIndex++;
percentIndex++;
}
}
priceData[priceIndex]=startingVal;
var numOfVals=(percentData.length < range)?percentData.length+1:range+1 - fundOffset;
for(var i=1;i < numOfVals;i++)
{
priceData[i+priceIndex]=priceData[i+priceIndex - 1]*(1+percentData[percentIndex+i-1]/100);
}
this.rangeData[fid][range]=priceData;
}
}
cbd.charting.G10K.prototype.processData=function(data)
{
var data=new Object();
data.series=new Array();
if(this.urlArray.length==0)
{
this.initLoad=false;
return data;
}
this.config.series.colors=new Array();
var fundCounter=0;
for(var i in this.urlArray)
{
var fid=this.urlArray[i].fid;
if(this.origData[fid])
{
data.series[fundCounter]=new Object();
data.series[fundCounter].legendData=[this.origData[fid].legendData];
data.series[fundCounter].data=this.rangeData[fid][this.range];
this.config.series.colors.push(this.origData[fid].color)
fundCounter++;
}
}
this.config.grid.xAxis.max=this.range+1;
if(this.range==12)
{
this.grid.xAxis.intervals=this.range+1;
this.grid.xAxis.labelPos="midinterval";
}
else
{
this.grid.xAxis.intervals=this.range/12;
this.grid.xAxis.labelPos="tickmark";
}
this.grid.xAxis.labels=this.getLabels();
return data;
}
cbd.charting.G10K.prototype.loadFund=function(url, fid)
{
if(this.origData[fid])
{
return;
}
this.addUrl(url, fid);
jsCBDgetContent(url, cbd.charting._parseXMLData, this);
}
cbd.charting.G10K.prototype.addUrl=function(url, fid)
{
var requested=false;
for(var i in this.urlArray)
{
if(this.urlArray[i].fid==fid)
{
requested=true;
}
}
if(!requested&&url)
{
this.urlArray.push({url:url, fid:fid});
}
}
cbd.charting.G10K.prototype.processErrorCode=function(errCode, url)
{
var error;
var errorCss;
if(errCode=="LESS_THAN_YEAR")
{
error=(this.compare&&this.initLoad)?cbd.charting.G10K.lessThanYearInitError:cbd.charting.G10K.lessThanYearError;
errorCss=cbd.charting.infoErrorCss;
}
else if(errCode=="LESS_THAN_MONTH")
{
error=cbd.charting.G10K.lessThanMonthError;
errorCss=cbd.charting.infoErrorCss;
}
if(error)
{
this.queuedError={text:error, css:errorCss};
}
}
cbd.charting.G10K.prototype.getLabelWidth=function()
{
return this.xAxis.delta/this.xAxis.range*this.w*2;
}
cbd.charting.G10K.prototype.getLabels=function()
{
var size, curYear;
var noOfYears=this.range/12;
var month=this.asOfDate.getMonth();
var firstYear=this.asOfDate.getFullYear() - noOfYears;
var labels=new Array();
if(this.range > 12)
{
size=noOfYears+(month==11?2:1);
for(var i=0;i < size;i++)
{
curYear=(firstYear+i).toString();
displayYear=curYear.substr(2);
if(noOfYears==10)
{
var labelText=this.shortList?curYear:cbd.charting.months[month]+" "+displayYear;
labels[i]=(i % 2==0)?labelText:"";
}
else
{
labels[i]=cbd.charting.months[month]+" "+displayYear;
}
}
}
else
{
size=13;
var year=this.asOfDate.getFullYear() - 1;
for(var i=0;i<size;i++)
{
displayYear=(year.toString()).substr(2);
labels[i]=(i % 3==0)?(cbd.charting.months[month]+" "+displayYear):"";
month=(month+1) % 12;
year+=(month % 12==0)?1:0;
}
}
return labels;
}
cbd.charting.G10K.prototype.SetVariable=function(keyvar, value)
{
if(keyvar=="rangeHandler")
{
this.onChangeRange(Number(value));
}
else if(keyvar=="addFundHandler")
{
this.onAddFund(value);
}
else if(keyvar=="benchmarkHandler")
{
this.onAddBenchmark(value);
}
else if(keyvar=="removeFundHandler"||keyvar=="removeBenchmarkHandler")
{
this.onRemove(value);
}
}
cbd.charting.G10K.prototype.onChangeRange=function(range)
{
if(!range||isNaN(range)||this.urlArray.length==0)
{
return;
}
this.range=range*12;
this._update();
}
cbd.charting.G10K.prototype.onRemove=function(fid)
{
if(this.origData[fid])
{
this.resetColor(this.origData[fid].color);
delete this.origData[fid];
delete this.rangeData[fid];
}
var delIndex;
for(var i in this.urlArray)
{
if(this.urlArray[i].fid==fid)
{
delIndex=i;
break;
}
}
if(delIndex)
{
this.urlArray.splice(delIndex, 1);
delIndex=null;
}
for(var i in this.addedFunds)
{
if(this.addedFunds[i]==fid)
{
delIndex=i;
break;
}
}
if(delIndex)
{
this.addedFunds.splice(delIndex, 1);
delIndex=null;
}
if(!this.compare&&this.benchMark==fid)
{
this.benchMark=null;
}
this._update();
}
cbd.charting.G10K.prototype.onAddFund=function(fid)
{
this.clearErrors();
if(!fid||isNaN(fid)||this.initLoad)
{
return;
}
if(this.origData[fid])
{
return;
}
if(this.addedFunds.length >=this.maxFunds)
{
var error=this.compare?cbd.charting.G10K.maxFundCompareError:cbd.charting.G10K.maxFundError;
this.showError(error, cbd.charting.infoErrorCss,{w:300, h:45, x:this.errorPos.x, y:this.errorPos.y}, true);
return;
}
this.loadFund(this.url+fid, fid);
}
cbd.charting.G10K.prototype.onAddBenchmark=function(fid)
{
this.clearErrors();
if(!fid||isNaN(fid)||this.initLoad)
{
return;
}
if(this.origData[fid])
{
return;
}
if(this.benchMark&&!this.compare)
{
this.onRemove(this.benchMark);
}
if(this.compare&&this.addedFunds.length >=this.maxFunds)
{
this.showError(cbd.charting.G10K.maxFundCompareError, cbd.charting.infoErrorCss,{w:300, h:45, x:this.errorPos.x, y:this.errorPos.y}, true);
return;
}
this.loadFund(this.benchUrl+fid, fid);
}
cbd.charting.BalanceTrend=function(id, config)
{
"use strict";
var labels=config.grid.xAxis.labels,
loopIndex,
label,
charting=cbd.charting,
BalanceTrend=charting.BalanceTrend;
if(labels)
{
loopIndex=labels.length;
while(loopIndex--)
{
label=labels[loopIndex];
if(label==="values")
{
this.performanceDataValuesIndex=loopIndex;
}
else if(label==="aod")
{
this.performanceDataDatesIndex=loopIndex;
}
}
}
delete(config.grid.xAxis.labels);
delete(config.series.colors);
this._configureWidthAndHeight(id, config);
this.renderer=new cbd.ChartRenderer(id, config.parent, 'gridChart');
this.renderer.initialize(id, config.w,{left:0, right:0}, config.h, 'balanceTrend');
this.base=vg.Controller;
this.base(id, id , true);
this.config={chartType:'line',
grid:{w:245, h:153,
yAxis:{format:"dollar", showAxis:false, showTicks:false, precision:0},
xAxis:{type:"time", maxTicks:7, unit:"month", axisColor:"#999999"}
},
series:{colors:['#000000'], fillColor:'#967D46'}};
this.processData=charting.processBalanceTrendData;
if(config.chartName==="balance_trend")
{
this.config.grid.w=327;
}
this.config.margins={left:"auto", top:26, right:15, bottom:15};
this.config.grid.xAxis.formatFunc=BalanceTrend.labelFormat;
this.range=120;
vg.util.deepAttachOptions(this.config, config);
this.createGrid(this.config);
this.grid.calculateDelta=BalanceTrend.calculateDelta;
this.grid.isYearOnlyFormat=BalanceTrend.isYearOnlyFormat;
};
cbd.charting.BalanceTrend.prototype=new EmptyFunc();
cbd.charting.BalanceTrend.labelFormat=function(val, axis, tickIndex)
{
var format=(axis.delta >=3)?"%y":"%M <br/> %y";
return cbd.charting._formatDate(val, format);
}
cbd.charting.BalanceTrend.isYearOnlyFormat=function(axis)
{
return(axis.delta >=3);
}
cbd.charting.BalanceTrend.calculateDelta=function(obj)
{
if((obj.max < 10&&obj.max > 0)||(obj.max==0&&obj.min==0))
{
obj.max=10;
}
if(obj.max <=0&&obj.min < 0)
{
obj.max=0;
}
if(obj.min > 0)
{
obj.min=0;
}
if(obj.min < 0&&obj.min > -10)
{
obj.min=-10;
}
var posTicks=2;
var negTicks=2;
var log10DistancePos=obj.max==0?0:Math.floor(Math.log(obj.max)/Math.log(10));
var log10DistanceNeg=obj.min==0?0:Math.floor(Math.log(Math.abs(obj.min))/Math.log(10));
var newmax=Math.ceil(obj.max/Math.pow(10, log10DistancePos));
var newmin=Math.floor(obj.min/Math.pow(10, log10DistanceNeg));
var max=newmax*Math.pow(10, log10DistancePos);
var min=newmin*Math.pow(10, log10DistanceNeg);
var delta;
if(obj.min < 0)
{
if(max > Math.abs(min))
{
if(newmax%3==0){
posTicks=3
}
else
{
posTicks=2;
}
delta=max/(posTicks);
min=Math.ceil(Math.abs(min)/delta)*delta*-1;
}
else
{
if(newmin%3==0){
negTicks=3
}
else
{
negTicks=2;
}
delta=min/negTicks;
max=Math.ceil(max/Math.abs(delta))*Math.abs(delta);
}
}
else
{
var noTicks=2;
for(var i=5;i>=3;i--)
{
if(newmax % i==0)
{
noTicks=i;
break;
}
}
delta=Math.abs(max - min)/noTicks;
}
obj.delta=Math.abs(delta);
obj.max=max;
obj.min=min;
obj.range=obj.max - obj.min;
obj.intervals=(obj.max - obj.min)/obj.delta;
}
cbd.charting.Performance=function(id, config)
{
"use strict";
var grid=config.grid,
xAxis=grid.xAxis,
header=config.toolTip.header,
charting=cbd.charting,
balanceTrend=charting.BalanceTrend;
this.performanceLabels=xAxis.labels;
delete(xAxis.labels);
this.performanceTitles=header.value;
header.value="%date";
grid.xAxis={type:'timeRange', unit:'month', formatFunc:balanceTrend.labelFormat, showAxis:true, axisColor:"#999999"};
this.processData=charting.processPerformanceData;
charting.Chart.call(this, id, config);
this.grid.calculateDelta=charting.performanceCalculateDelta;
this.grid.isYearOnlyFormat=balanceTrend.isYearOnlyFormat;
};
cbd.charting.Performance.labelFormat=function(val, axis, tickIndex)
{
var format=(axis.delta >=3)?"%y":"%M %y";
return cbd.charting._formatDate(val, format);
}
cbd.charting.processBalanceTrendData=function(data)
{
var seriesData=data.series[0].data;
var dates=seriesData[this.performanceDataDatesIndex];
data.aod=dates[dates.length-1];
data.series[0].data=seriesData[this.performanceDataValuesIndex];
this.setEndDate(data.aod);
this.setRange(data.range);
return data;
}
cbd.charting.processPerformanceData=function(data)
{
var seriesData=data.series[0].data;
data.series=[];
var labelsLength=this.performanceLabels.length;
for(var i=0;i < labelsLength;i++)
{
if(this.performanceLabels[i]=="dates" )
{
var dates=seriesData[i];
data.aod=dates[dates.length-1];
}
else if(this.performanceTitles[i])
{
var hide=this.performanceLabels[i]!="values";
data.series.push({title:unescape(this.performanceTitles[i]), data:seriesData[i], hide:hide, chartType:'line'});
}
}
this.setEndDate(data.aod);
this.setRange(data.range);
return data;
}
cbd.charting.performanceCalculateDelta=function(obj)
{
if((obj.max < 10&&obj.max > 0)||(obj.max==0&&obj.min==0))
{
obj.max=10;
}
if(obj.max <=0&&obj.min < 0)
{
obj.max=0;
}
if(obj.min > 0)
{
obj.min=0;
}
if(obj.min < 0&&obj.min > -10)
{
obj.min=-10;
}
var posTicks=2;
var negTicks=2;
var log10DistancePos=obj.max==0?0:Math.floor(Math.log(obj.max)/Math.log(10));
var log10DistanceNeg=obj.min==0?0:Math.floor(Math.log(Math.abs(obj.min))/Math.log(10));
var newmax=Math.ceil(obj.max/Math.pow(10, log10DistancePos));
var newmin=Math.floor(obj.min/Math.pow(10, log10DistanceNeg));
var max=newmax*Math.pow(10, log10DistancePos);
var min=newmin*Math.pow(10, log10DistanceNeg);
var delta;
var tickVal=max;
var tickValSig=newmax;
if(Math.abs(max) <Math.abs(min))
{
tickVal=min;
tickValSig=newmin;
}
var noTicks=2;
for(var i=5;i>=3;i--)
{
if(tickValSig*10 % i==0)
{
noTicks=i;
break;
}
}
delta=Math.abs(tickVal/(noTicks));
var sign=(min!=0)?min/Math.abs(min):1;
min=Math.ceil(Math.abs(min)/delta)*delta*sign;
max=Math.ceil(max/delta)*delta;
this.yAxis.delta=delta;
this.yAxis.min=min;
this.yAxis.max=max;
this.yAxis.intervals=(this.yAxis.max - this.yAxis.min)/this.yAxis.delta;
this.yAxis.range=this.yAxis.max - this.yAxis.min;
}
cbd.charting.Performance.prototype=new EmptyFunc();
cbd.charting.processTaxAndIncomeData=function(data)
{
var processedSeries=[]
var tiData=[[0,0],[0,0],[0,0],[0,0]];
var years=[[0],[0]];
for(var i in data.series )
{
tiData[0][i]=data.series[i].attribs.first;
tiData[1][i]=data.series[i].attribs.second;
tiData[2][i]=data.series[i].attribs.third;
tiData[3][i]=data.series[i].attribs.fourth;
years[i][0]=data.series[i].attribs.year;
}
data.series=[{data:tiData, legendData:years}];
return data;
}

