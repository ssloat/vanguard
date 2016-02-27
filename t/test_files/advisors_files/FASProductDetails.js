var params;
var date;
var close;
var priceopen;
var high;
var low;
var volume;
var chartType;
var chartTypeForPremium
var fundType;
var fund2Date;
var fund2Close;
var fund2Open;
var fund2High;
var fund2Low;
var fund2Volume;
var isTwoFunds = false;
var premiumDate;
var marketPrice;
var nav;
var premiumDiscountPercentage;


function jsOnEnterGrowthFSTool(event)	{		
	var key;	
	if(window.event) {
		key = window.event.keyCode;
	} else if (event) {
		key = event.which;
	}
	if (key == 13) {
		jsCBDhideASDropDown();
		jsCBDtriggerEventOnNode('performanceForm:autoSuggestGrowthInputHiddenButton','click');
		return false;
	}
	return true;
}


function jsGrowthAutoSuggestFindSelect(event) {
	jsCBDtriggerEventOnNode('performanceForm:autoSuggestGrowthInputHiddenButton','click');
}

function openProspectusLink(target){
	window.open(target);
}

function jsRemoveGrowthComparisonFund() {
	document.getElementById('performanceForm:performanceCostAnalysisTabBox:AutoSuggestGrowthInputId').value = '';
	jsCBDtriggerEventOnNode('performanceForm:autoSuggestGrowthInputHiddenButton','click');
	return false;
}

function jsRemoveErrorGrowthComparisonFund() {
	document.getElementById('performanceForm:performanceCostAnalysisTabBox:ErrorMsg:AutoSuggestGrowthInputId').value = '';
	jsCBDtriggerEventOnNode('performanceForm:autoSuggestGrowthInputHiddenButton','click');
	return false;
}

function setDefaultBasicReturnsRadioButtons() {
	if (document.getElementById('performanceForm:viewAs:0') ) {
		document.getElementById('performanceForm:viewAs:0').checked=true;
	}
	if (document.getElementById('performanceForm:viewAs:1') ) {
		document.getElementById('performanceForm:viewAs:1').checked=false;
	} 
	if (document.getElementById('performanceForm:viewAs:2') ) {
		document.getElementById('performanceForm:viewAs:2').checked=false;
	}
}	


function setDefaultOverviewTotalReturnsRadioButtons() {
	if (document.getElementById('overviewForm:overviewViewAs:0') ) {
		document.getElementById('overviewForm:overviewViewAs:0').checked=true;
	}
	if (document.getElementById('overviewForm:overviewViewAs:1') ) {
		document.getElementById('overviewForm:overviewViewAs:1').checked=false;
	}
}

function jsGoToAnchor() {
    var url = window.location.href;
    var commentaryIndex = url.indexOf("commentary=true");
    if(commentaryIndex > -1) {
        window.location.hash = "commentary";
    }
    var perfRankingIndex = url.indexOf("performanceRanking=true");
    if(perfRankingIndex > -1){
    	window.location.hash = "costAnalysis";
    }
}

function findHoldingAutoSuggest(id,value,label) {
	jsCBDhideASDropDown();
	params = 'holding='+label;
	if(value != null) {
		var values = value.split(':');
		params += '&isin='+values[0]+'&orgId='+values[1];
	}
	jsCBDupdateComponent({compIds:'portfolioForm:findHoldingHiddenInputContainer', callback:findHoldingAutoSuggestCallback, params:params});
}

function findHoldingAutoSuggestCallback(compId,html) {
	if(ALL_COMPS_PROCESSED == compId){
		var hiddenInput = document.getElementById('portfolioForm:findHoldingHiddenInput');
		if(hiddenInput != null && hiddenInput.value == 'true') {
			jsCBDopenLayer({layerId:'findHoldingLayerForm:findHoldingLayer', contentURL:'%s/site/advisor/investments/productDetails/portfolio/FindHoldingLayer.xhtml?'+params});
		}
	}
}

function enterPressed(event) {
	var key;
	if(window.event) {
		key=window.event.keyCode;
	} else if (event) {
		key = event.which;
	}
	if (key == 13) { // enter key
		return true;
	}
	return false;
}

function findHoldingEnter(elem,event) {
	if(enterPressed(event)) {
		// capitalize entry
		elem.value = elem.value.toUpperCase();
		findHoldingAutoSuggest(elem.id,null,elem.value);
	}
}

function addLiteratureEnter(id,elem,event) {
	if(enterPressed(event)) {
		jsCBDtriggerEventOnNode(document.getElementById(id+'Button'),'click');
	}
}

function jsPriceAutoSuggestFindSelect(event) {
	jsCBDtriggerEventOnNode('priceForm:autoSuggestPriceInputHiddenButton','click');
}

function jsOnEnterPriceFSTool(event)	{	

	var key;
	if(window.event) {
		key = window.event.keyCode;
	} else if (event) {
		key = event.which;
	}
	if (key == 13) {
		jsCBDtriggerEventOnNode('priceForm:autoSuggestPriceInputHiddenButton','click');
		return false;
	}
	return true;
}

function jsRemovePriceComparisonFund() {
       var priceInputErrMsg = document.getElementById('priceForm:priceTabBox:ErrorMsg:AutoSuggestPriceInputId');
       if(priceInputErrMsg != null) {
		  priceInputErrMsg.value = '';
    	}else{
    	  document.getElementById('priceForm:priceTabBox:AutoSuggestPriceInputId').value = '';
    	}
	jsCBDtriggerEventOnNode('priceForm:autoSuggestPriceInputHiddenButton','click');
	return false;
}

function parsePriceInfoForChart(){
	var longString = document.getElementById('priceForm:priceTabBox:allData').value.split("!");
	if(longString != ""){
		var fund1 = longString[0].split("+");
		var fund2 = longString[1].split("+");
		var test = fund1[1].split("*");
		fundType = fund1[0]; //ETF or MF
		
		
		var dateArray;
		var closeArray;
		var openArray;
		var highArray;
		var lowArray;
		var volumeArray;
		
		if(test[0] == "LastTimes"){//CURRENT CHART SHOULD BE BUILT
			chartType = "current";
			
			dateArray = fund1[1].split("*");	
			if(fund1[2] != null && fund1[3] != null){	
				closeArray = fund1[2].split("*");		
				volumeArray = fund1[3].split("*");
			
				date = dateArray[1].split("|");	
				close = closeArray[1].split("|");
				volume = volumeArray[1].split("|");
			}
		}else if(test[0] == "Dates"){//MONTHLY CHART SHOULD BE BUILT
			chartType = "monthly";
			dateArray = fund1[1].split("*");
			closeArray = fund1[2].split("*");
			openArray = fund1[3].split("*");
			highArray = fund1[4].split("*");
			lowArray = fund1[5].split("*");
			volumeArray = fund1[6].split("*");
			
			date = dateArray[1].split("|");	
			close = closeArray[1].split("|");	
			priceopen = openArray[1].split("|");	
			high = highArray[1].split("|");	
			low = lowArray[1].split("|");	
			volume = volumeArray[1].split("|");
		}
		
		if(fund2[0] != "empty"){
			parseSecondFundData(fund2,test[0]);
			isTwoFunds = true;
		}else{
			isTwoFunds = false;
		}
		
		if(fundType == "ETF"){
				document.getElementById('priceForm:priceTabBox:dateText').innerHTML = date[date.length-1];
				
				if(chartType == "current"){
					document.getElementById('priceForm:priceTabBox:closeCurrentText').innerHTML = close[close.length-1];
					document.getElementById('priceForm:priceTabBox:volumeCurrentText').innerHTML = volume[volume.length-1];
				}else{
					document.getElementById('priceForm:priceTabBox:closeMonthText').innerHTML = close[close.length-1];
					document.getElementById('priceForm:priceTabBox:volumeMonthText').innerHTML = volume[volume.length-1];
					document.getElementById('priceForm:priceTabBox:openText').innerHTML = priceopen[priceopen.length-1];
					document.getElementById('priceForm:priceTabBox:highText').innerHTML = high[high.length-1];
					document.getElementById('priceForm:priceTabBox:lowText').innerHTML = low[low.length-1];
				}
			}else if(chartType == "current" && fundType == "MF"){
				document.getElementById('priceForm:priceTabBox:dateText').innerHTML = date[date.length-1];
				document.getElementById('priceForm:priceTabBox:navText').innerHTML = close[close.length-1];	
			}
		if(isTwoFunds){
				if(fundType == "ETF"){	
					document.getElementById('priceForm:priceTabBox:closeCompareText').innerHTML = fund2Close[fund2Close.length-1];
					document.getElementById('priceForm:priceTabBox:volumeCompareText').innerHTML = fund2Volume[fund2Volume.length-1];
				
					if(chartType != "current"){
	                    document.getElementById('priceForm:priceTabBox:openCompareText').innerHTML = fund2Open[fund2Open.length-1];		
						document.getElementById('priceForm:priceTabBox:highCompareText').innerHTML = fund2High[fund2High.length-1];
						document.getElementById('priceForm:priceTabBox:lowCompareText').innerHTML = fund2Low[fund2Low.length-1];
					}
				}else if(chartType == "current" && fundType == "MF"){
					document.getElementById('priceForm:priceTabBox:navCompareText').innerHTML = fund2Close[fund2Close.length-1];	
				}
		}
	}		
}

function parseSecondFundData(fund2, test){
var dateArray2;
var closeArray2;
var openArray2;
var highArray2;
var lowArray2;
var volumeArray2;
	
	if(test == "LastTimes"){//CURRENT CHART SHOULD BE BUILT
		dateArray2 = fund2[0].split("*");
		closeArray2 = fund2[1].split("*");
		volumeArray2 = fund2[2].split("*");
		
		fund2Date = dateArray2[1].split("|");	
		fund2Close = closeArray2[1].split("|");
		fund2Volume = volumeArray2[1].split("|");
	}else if(test == "Dates"){//MONTHLY CHART SHOULD BE BUILT
		dateArray2 = fund2[0].split("*");
		closeArray2 = fund2[1].split("*");
		openArray2 = fund2[2].split("*");
		highArray2 = fund2[3].split("*");
		lowArray2 = fund2[4].split("*");
		volumeArray2 = fund2[5].split("*");
		
		fund2Date = dateArray2[1].split("|");	
		fund2Close = closeArray2[1].split("|");	
		fund2Open = openArray2[1].split("|");	
		fund2High = highArray2[1].split("|");	
		fund2Low = lowArray2[1].split("|");	
		fund2Volume = volumeArray2[1].split("|");
	}

}


synchPriceChart = function(config){
	if(config.index != undefined){
		var index = config.index;
		
		if(fundType == "ETF"){
			document.getElementById('priceForm:priceTabBox:dateText').innerHTML = date[index];
			
			if(chartType == "current"){
				document.getElementById('priceForm:priceTabBox:closeCurrentText').innerHTML = close[index];
				document.getElementById('priceForm:priceTabBox:volumeCurrentText').innerHTML = volume[index];
			}else{
				document.getElementById('priceForm:priceTabBox:closeMonthText').innerHTML = close[index];
				document.getElementById('priceForm:priceTabBox:volumeMonthText').innerHTML = volume[index];
				document.getElementById('priceForm:priceTabBox:openText').innerHTML = priceopen[index];
				document.getElementById('priceForm:priceTabBox:highText').innerHTML = high[index];
				document.getElementById('priceForm:priceTabBox:lowText').innerHTML = low[index];
			}
		}else if(chartType == "current" && fundType == "MF"){
			document.getElementById('priceForm:priceTabBox:dateText').innerHTML = date[index];
			document.getElementById('priceForm:priceTabBox:navText').innerHTML = close[index];	
		}
		
		if(isTwoFunds){
			if(fundType == "ETF"){	
				document.getElementById('priceForm:priceTabBox:closeCompareText').innerHTML = fund2Close[index];
				document.getElementById('priceForm:priceTabBox:volumeCompareText').innerHTML = fund2Volume[index];
			
				if(chartType != "current"){
                    document.getElementById('priceForm:priceTabBox:openCompareText').innerHTML = fund2Open[index];		
					document.getElementById('priceForm:priceTabBox:highCompareText').innerHTML = fund2High[index];
					document.getElementById('priceForm:priceTabBox:lowCompareText').innerHTML = fund2Low[index];
				}
			}else if(chartType == "current" && fundType == "MF"){
				document.getElementById('priceForm:priceTabBox:navCompareText').innerHTML = fund2Close[index];	
			}
		
		}
		
		
	}
	synchChart(config, 'priceForm:priceTabBox:priceBarChart');
}

synchVolumeChart = function(config)
{
	synchChart(config, 'priceForm:priceTabBox:priceLineChart');
}

premiumDiscountLine = function(config){
if(config.index != undefined){
		var index = config.index;	
			
			if(chartTypeForPremium == "current"){
				document.getElementById('priceForm:priceTabBox:premiumDateText').innerHTML = premiumDate[index];
				document.getElementById('priceForm:priceTabBox:marketPriceText').innerHTML = marketPrice[index];
				document.getElementById('priceForm:priceTabBox:premiumNavText').innerHTML = nav[index];
				document.getElementById('priceForm:priceTabBox:premiumDiscountPercentageText').innerHTML = premiumDiscountPercentage[index];
			}else{
				document.getElementById('priceForm:priceTabBox:premiumDateText').innerHTML = premiumDate[index];
				document.getElementById('priceForm:priceTabBox:marketPriceText').innerHTML = marketPrice[index];
				document.getElementById('priceForm:priceTabBox:premiumNavText').innerHTML = nav[index];
				document.getElementById('priceForm:priceTabBox:premiumDiscountPercentageText').innerHTML = premiumDiscountPercentage[index];
			}
		}
	synchChart(config, 'priceForm:priceTabBox:premiumDiscountBarChart');
}

premiumDiscountBar = function(config)
{
	synchChart(config, 'priceForm:priceTabBox:premiumDiscountLineChart');
}

function parsePremiumInfoForChart(){
    var longString = document.getElementById('priceForm:priceTabBox:allPremiumData').value.split("!");
	if(longString != ""){
		var fund1 = longString[0].split("+");	
		var test = fund1[1].split("*");
		fundType = fund1[0]; //ETF or MF
		
		var premiumDateArray;
		var marketPriceArray;
		var navArray;
		var premiumDiscountPercentageArray;
			
			if(test[0] == "PremiumDates"){//Current
				chartTypeForPremium = "current";
				premiumDateArray = fund1[1].split("*");		
				if(fund1[2] != null && fund1[3] != null && fund1[4] != null){
					marketPriceArray = fund1[2].split("*");		
					navArray = fund1[3].split("*");			
					premiumDiscountPercentageArray = fund1[4].split("*");
						
				premiumDate = premiumDateArray[1].split("|");		
				marketPrice = marketPriceArray[1].split("|");		
				nav = navArray[1].split("|");		
				premiumDiscountPercentage = premiumDiscountPercentageArray[1].split("|");
			}				
			
		}else if(test[0] == "PremiumQuarterDates"){//Quarterly and Year Chart
			chartTypeForPremium = "monthly";
			premiumDateArray = fund1[1].split("*");
			marketPriceArray = fund1[2].split("*");
			navArray = fund1[3].split("*");
			premiumDiscountPercentageArray = fund1[4].split("*");
			
			premiumDate = premiumDateArray[1].split("|");		
			marketPrice = marketPriceArray[1].split("|");		
			nav = navArray[1].split("|");		
			premiumDiscountPercentage = premiumDiscountPercentageArray[1].split("|");				
		}	
	}
	
}


var chartCurrentIndex = 0;
synchChart = function(config, id)
{
	if( config.index != chartCurrentIndex )
	{
		chartCurrentIndex = config.index;
		vg.charting.openToolTipAt(id, chartCurrentIndex);
	}
}

function sendFASCKUsageForPDFs(fundId, link, title, lit, isSecureIWEUser, isInternalUser){
	var urlValue = link;
	var isSecure = isSecureIWEUser;
	var isInternal = isInternalUser;
    if (isInternal == "false" && urlValue != "null" && lit == "lit"){
	  if (isSecure == "true"){
	    jsCBDgetContent('/VGApp/iip/site/advisorsec/monitor/FASUserMonitor?title='+title+'&url='+urlValue+'&lit=lit',jsCallback, this, true );
	  }else{
	    jsCBDgetContent('/VGApp/iip/site/advisor/monitor/FASUserMonitor?title='+title+'&url='+urlValue+'&lit=lit',jsCallback, this, true );	
	  }
	}
}
function sendIAMCKUsageForPDFs(fundId, link, pdfType, isSecureIWEUser, isInternalUser){
	var urlValue = link;
	var isSecure = isSecureIWEUser;
	var isInternal = isInternalUser;
    if (isInternal == "false" && urlValue != "null"){
	  if (isSecure == "true"){
	    jsCBDgetContent('/VGApp/iip/site/institutionalsec/monitor/IAMUserMonitor?fundId='+fundId+'&pdfType='+pdfType+'&url='+urlValue,jsCallback, this, true );
	  }else{
	    jsCBDgetContent('/VGApp/iip/site/institutional/monitor/IAMUserMonitor?fundId='+fundId+'&pdfType='+pdfType+'&url='+urlValue,jsCallback, this, true );	
	  }
   	}
}
function jsCallback(){}
function isExport(){
	var url = document.URL;
	var start = url.indexOf("export=");

	if(start != -1){
		var secondPart = url.substring(url.indexOf("&export=true")+12);	                          
		url = url.substring(0,url.indexOf("&export=true"));
		var urlWithRemovedParam = url+secondPart;
		var finalURL = urlWithRemovedParam+"&exportFile=true";
		
		jsCBDgoToUrl(finalURL);
	}
}

function getCommandLinkIds(commandLinkBarId) {
    var ctrl = vg.comp.getController( vg.html.getElement(commandLinkBarId) );
    var linkIds = new Array();
    ctrl.respMenuItems.forEach(function(elm) {
        linkIds.push( vg.html.getElement(elm.id.substr(5)) ); // remove "comp-"
    });
    return linkIds;
}
// Calls the onclick method of the CommandLink associated with the SOM selection
function updateCommandLinkBarFromSom(clbId,somId) {
	var linkIds = getCommandLinkIds(clbId);
	var somValInt = parseInt( jsCBDgetSelectOneMenuValue(somId) );
	linkIds[somValInt].onclick();
}

// Performance > Total Returns
// Change functions to update small controls
function updateTotalReturnsTable(callingElm,callbackFn) {
	jsCBDupdateComponent({compIds:'performanceForm:totalReturnsTable',caller:callingElm,callback:callbackFn});
}
function resetSummaryControlsSml() {
	jsCBDsetSelectOneMenuValue('performanceForm:viewAsSOM','quarterEndPreTax');
	resetSummaryDatesSml();
}

function updatePerformanceRankingContainer(callingElm, callbackFn){
	jsCBDupdateComponent({compIds:'performanceForm:performanceCostAnalysisTabBox:PerformanceRankingContainer',caller:callingElm,callback:callbackFn});
}
					
function resetSummaryDatesSml() {
	if(vg.html.getElement('performanceForm:quarterSelectOneMenuSmall') && INIT_QUARTEREND_DATE) {
		jsCBDsetSelectOneMenuValue('performanceForm:quarterSelectOneMenuSmall',INIT_QUARTEREND_DATE);
	}
	if(vg.html.getElement('performanceForm:monthSelectOneMenuSmall') && INIT_MONTHEND_DATE) {	
		jsCBDsetSelectOneMenuValue('performanceForm:monthSelectOneMenuSmall',INIT_MONTHEND_DATE);
	}
}
function resetQuarterlyControlsSml() {
	if(vg.html.getElement('performanceForm:navMktToggleSOM')) {
		jsCBDsetSelectOneMenuValue('performanceForm:navMktToggleSOM','nav');
	}
}