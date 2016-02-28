var yaxisArray = ["&gt;100","75-100","50-74.9","25-49.9","0-24.9","NAV","0-24.9","25-49.9","50-74.9","75-100","&gt;100"];
var xaxisArray = ["0","5","10","15","20","25","30","35","40","45","50","55","60","65","70","75","80","85","90"];
var xaxis2Array = ["0","10","20","30","40","50","60","70","80","90","100","110","120","130","140","150","160","170","180"];
var xaxis3Array = ["0","15","30","45","60","75","90","105","120","135","150","165","180","195","210","225","240","255","270"];
var xaxis4Array = ["0","20","40","60","80","100","120","140","160","180","200","220","240","260","280","300","320","340","360"];
var largestValues = [{largest:90, useChart:xaxisArray}, {largest:180, useChart:xaxis2Array}, {largest:270, useChart:xaxis3Array}, {largest:360, useChart:xaxis4Array}];
var etfsAnalysisValuesArray;
function setupEtsAnalysisChart() {
	var etfsAnalysisValues = $('#ets-analysis-values').attr("value");
	if (null == etfsAnalysisValues) return;
	etfsAnalysisValuesArray = etfsAnalysisValues.split(",");
	for(var i=0; i< etfsAnalysisValuesArray.length; i++){
		etfsAnalysisValuesArray[i] = etfsAnalysisValuesArray[i].split("@");
	}

	$(".ets-analysis-tophalf .ets-analysis-col-container:first").css("border-left","1px solid");
	$(".ets-analysis-bottomhalf .ets-analysis-col-container:first").css("border-left","1px solid");
	$(".ets-analysis-x:first").css("border-top","1px solid");
	$(".ets-analysis-y:first").css("border-left","none");
	$(".ets-analysis-y:first").css("width","10px");
	$(".ets-analysis-y span:first").css("left","-3px");
	$(".ets-analysis-y:last").css("border-top","none");
	$(".ets-analysis-bar-tooltip2 div:first-child").css("width","16px").css("height","16px");
	
	displayValues();
	
	var etsAnalysisBarTooltip1 = $(".ets-analysis-bar-tooltip1")
	etsAnalysisBarTooltip1.hide();
	var etsAnalysisBar = $(".ets-analysis-bar");
	etsAnalysisBar.mouseover(function(){
		
		$(this).children(".ets-analysis-bar-tooltip1").show();
	}).mouseout(function(){
		
		$(this).children(".ets-analysis-bar-tooltip1").hide();
	});
}

function getMaxValue(arr){
	var maxVal = 0;
	for(i = 0; i<arr.length; i++){
		var evalVal = parseInt(arr[i][0]) ;
		if(evalVal > maxVal) maxVal = evalVal;
	}
	return maxVal;
}

$(window).resize(function() {
	resizeBars();
});

function displayValues(){
	var values = etfsAnalysisValuesArray;
	values = values.reverse();
	useValues = xaxisArray;
	var firstData = false;
	var htmlVal;
	var maxValue = getMaxValue(values);
	var maxValueSmall = parseInt(xaxisArray[xaxisArray.length-1]);
	
	for(var i=0; i<largestValues.length; i++){
		if(maxValue < largestValues[i].largest) {
			useValues = largestValues[i].useChart
			break;
		}
	}
	//if(maxValue > maxValueSmall)useValues = xaxis2Array;
	
	if ($(".ets-analysis-bars-container").find('.ets-analysis-bar').length >= values.length) {
		return;
	}
	
	for(i = 0; i<useValues.length; i++){
		$(".ets-analysis-y:nth-child("+(i+2)+") span").text(useValues[i]);
	}
	
	for(i = 0; i<values.length; i++){
		
			var newWidth;
			if(i< values.length/2){
				//parseInt($(".ets-analysis-bottomhalf").css("width").replace("px", ""))
				htmlVal = "<div><div id='ets-bar"+i+"-id' class='ets-bar1 ets-analysis-bar'><div id='ets-tooltip"+i+"' class='ets-analysis-bar-tooltip1'><div class='ets-analysis-bar-tooltip2'><div class='ets-bar1'></div><div><span></span>%</div></div></div></div><div class='ets-clear-both'></div></div>";
				$(".ets-analysis-bars-container").append(htmlVal)
				newWidth = values[i][0] * (($(".ets-analysis-tophalf").width())/parseInt(useValues[useValues.length-1]));
				$("#ets-bar"+i+"-id").css("width", newWidth);
				$("#ets-tooltip"+i+" span").text(values[i][1]);
				$("#ets-tooltip"+i).css("left", newWidth-20);
				if(i == ((values.length/2)-1)){
					 $(".ets-analysis-bars-container").append("<div><div id='ets-barBlank-id' class='ets-bar1 ets-analysis-bar'><div id='ets-tooltipBlank' class='ets-analysis-bar-tooltip1'><div class='ets-analysis-bar-tooltip2'><div class='ets-bar1'></div><div><span></span>%</div></div></div></div><div class='ets-clear-both'></div></div>");
					 $("#ets-barBlank-id").css("width", 0);
				}
			}else{
				htmlVal = "<div><div id='ets-bar"+i+"-id' class='ets-bar2 ets-analysis-bar' madeUpVar='todds value'><div id='ets-tooltip"+i+"' class='ets-analysis-bar-tooltip1'><div class='ets-analysis-bar-tooltip2'><div class='ets-bar2'></div><div><span></span>%</div></div></div></div><div class='ets-clear-both'></div></div>";
				$(".ets-analysis-bars-container").append(htmlVal)
				newWidth = values[i][0] * (($(".ets-analysis-tophalf").width())/parseInt(useValues[useValues.length-1]));
				$("#ets-bar"+i+"-id").css("width", newWidth);
				$("#ets-tooltip"+i+" span").text(values[i][1]);
				$("#ets-tooltip"+i).css("left", newWidth-20);
			}
		
	}
}
function resizeBars(){
	var newWidth;
	if(etfsAnalysisValuesArray){
		for(var i= 0; i<etfsAnalysisValuesArray.length; i++){
			newWidth = etfsAnalysisValuesArray[i][0] * (($(".ets-analysis-tophalf").width())/parseInt(useValues[useValues.length-1]));
				$("#ets-bar"+i+"-id").css("width", newWidth);
				$("#ets-tooltip"+i).css("left", newWidth-20);
				
				if(i == ((etfsAnalysisValuesArray.length/2)-1)){
					 $("#ets-barBlank-id").css("width", 0);
				}
		}
	}
}