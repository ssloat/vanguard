var layerOpened = false;
var currentParamArrayString="";
var defaultBrowseParams=new Array();
defaultBrowseParams[0]="filAsset=stock&linkTabId=0&linkColId=0&linkRowId=0&urlId=4&fundTicker=";
defaultBrowseParams[1]="filAsset=bond&linkTabId=7&linkColId=0&linkRowId=0&urlId=4&fundTicker=";
defaultBrowseParams[2]="filAsset=balanced&linkTabId=1&linkRowAllId=0&linkRowId=0&urlId=1&fundTicker=";
defaultBrowseParams[3]="filAsset=money market&linkTabId=8&linkRowAllId=0&linkRowId=0&urlId=1&fundTicker=";

function jsUpdateWidget(obj,id,closeTray,isBrowseClicked,filUpdated,filAsset,fundTicker){

	jsCBDLogWebUsageEvent('widgetClicked', filAsset + ' heading', 'true');
	
	
	paramString = jsCreateParamString(filUpdated,filAsset,fundTicker);
	formId = jsCreateFormId(jsObjId(obj),id);
	if(closeTray==true && !isBrowseClicked){
		jsCBDcloseLayer("browseProductsLayerForm:browseProductsLayer");
		layerOpened = false;
	}
	if(isBrowseClicked){
		jsLoadDefaultProductsForAssetClass(formId,filAsset,fundTicker);
	}
	else {
		jsCBDupdateComponent({compIds:formId,params:paramString,caller:this,disableWaitMsg:true});
	}
}

function jsLoadDefaultProductsForAssetClass(formId,filAsset,fundTicker){
	if (filAsset=="stock"){
		paramString=defaultBrowseParams[0]+fundTicker;
	}
	else if (filAsset=="bond"){
		paramString=defaultBrowseParams[1]+fundTicker;
	}
	else if (filAsset=="balanced"){
		paramString=defaultBrowseParams[2]+fundTicker;
	}
	else if (filAsset=="money market"){
		paramString=defaultBrowseParams[3]+fundTicker;
	}
	currentParamArrayString=paramString;
	jsCBDupdateComponent({compIds:'browseProductsFormLayer', params:paramString, disableWaitMsg:true}); 
	
}

function jsCreateParamString(filUpdated,filAsset,fundTicker){
	paramString = 'filUpdated='+filUpdated+'&filAsset='+filAsset+'&fundTicker='+fundTicker;
	return paramString;
}

function jsCloseAndResetHomeWidget(obj, id){
	jsCBDcloseLayer('browseProductsLayerForm:browseProductsLayer');
	jsSwitchLayerOpenedFlag();
	jsResetHomeWidget(obj, id);
}

function jsResetHomeWidget(){
	assetHiddeninput=document.getElementById("currentAssetClassSelected");
	assetSelected = assetHiddeninput.value;
	jsCBDupdateComponent({compIds:'browseProductsForm',params:'filUpdated=filType&filType=all&filAsset='+ assetSelected +'&filStyle=true-false&filBenchmark=all&fundTicker=',caller:this,disableWaitMsg:true}); 
}

function jsResetLayerWidget(){
	assetHiddeninput=document.getElementById("currentAssetClassSelected");
	assetSelected = assetHiddeninput.value;
	jsCBDupdateComponent({compIds:'browseProductsFormLayer:browseProductsForm',params:'filUpdated=filType&filType=all&filAsset='+ assetSelected +'&filStyle=true-false&filBenchmark=all&fundTicker=',caller:this,disableWaitMsg:true}); 
}

function jsObjId(obj){
	if(obj){
		return obj.id;
	}
}

function jsCreateFormId(objId,id){
	var fullFormId= objId.substr(0,objId.indexOf(id));
	
	if (fullFormId==""){
		fullFormId= objId.substr(0,objId.indexOf(id+"_closeButton"));
	}
	
	if (endsWith(fullFormId, ":")){
		fullFormId = fullFormId.substring(0, fullFormId.length-1);
	}
	
	return fullFormId;
}

function endsWith(str, suffix) {
     return str.indexOf(suffix, str.length - suffix.length) !== -1; 
} 

function jsOpenProductsLayer(obj,linkId,strContentUrl,isBrowseClicked){
	objId = jsObjId(obj);
	formId = jsCreateFormId(objId,linkId);
	targetOpenLayerId = formId+":widgetContainer";
	layerId = "browseProductsLayerForm:browseProductsLayer";
	var urlParamArray = strContentUrl.split('?');
	currentParamArrayString= urlParamArray[1];
	if(layerOpened || isBrowseClicked) {
		if(isBrowseClicked){
			jsCBDupdateComponent({compIds:'browseProductsFormLayer:productsLayerForm', params:urlParamArray[1], disableWaitMsg:true});
		} else {
			if(urlParamArray[1]!=null) {
				jsCBDupdateComponent({compIds:'productsLayerForm',params:urlParamArray[1],  disableWaitMsg:true});
			}
		}
	} else {
		jsCBDopenLayer({layerId:layerId,targetId:targetOpenLayerId,position :'right',contentURL:strContentUrl});
		layerOpened = true;
	}	
}

function jsOpenBrowseProductsLayer(layerId,strContentUrl){
	jsCBDopenLayer({layerId:layerId,position :'bottom',contentURL:strContentUrl});
}


function jsSwitchLayerOpenedFlag(){
	layerOpened = false;
}

function jsCheckBoxesClicked(obj, id, indexedOrActive){
	formId = jsCreateFormId(jsObjId(obj),id);
	if (currentParamArrayString.length==0){
		currentParamArrayString=document.getElementById("paramArrayForBrowseProducts").value;
	}
	var submitParamArrayString=currentParamArrayString + "&filStyle=true";
	if (indexedOrActive=="indexed"){
		submitParamArrayString=submitParamArrayString + "&index=flip";
	}
	else if (indexedOrActive=="active"){
		submitParamArrayString=submitParamArrayString + "&active=flip";
	}
	 
	 jsCBDupdateComponent({compIds:formId,params:submitParamArrayString, disableWaitMsg:true}); 
}

function jsLogWebUsageAndGoToUrl(tagName, tagValue, destinationUrl){
		jsCBDLogWebUsageEvent(tagName,tagValue);
		jsCBDgoToUrl(destinationUrl);
}
	
function jsWURAlsoOfInterest(type,title,target) {
     	jsCBDAddMetaTag("PageArea",type);
		jsCBDAddMetaTag("LinkSelected",title);
		jsCBDdcsTag();
		jsCBDclearMetaTag("PageArea");
		jsCBDclearMetaTag("LinkSelected");
}

/* Processing search Ticker on client side */
function jsBrowseProdutsAutoSuggestTickerSelect(event) {
		/* Ticker url already given */
		if(this.isRowClicked){
			var selectedRow = this._getSelectedEl(0);
			if(selectedRow[0].getAttribute("value").indexOf("http") != -1){
				jsCBDgoToUrl(selectedRow[0].getAttribute("value").substr(7));
			}else if(this.valueInput.value.indexOf("javascript")){
				var str = selectedRow[0].getAttribute("value").split(";");
				eval(str[str.length-3]);
				eval(str[str.length-2]);
			}
		}else if(this.valueInput.value.indexOf("http") != -1){
			jsCBDgoToUrl(this.valueInput.value.substr(7));
		}else if(this.valueInput.value.indexOf("javascript") != -1){
			var str = this.valueInput.value.split(";");
			eval(str[str.length-3]);
			eval(str[str.length-2]);
		}else{
			jsCBDtriggerEventOnNode('fasSearchForm:tickerSearchButton','click');
		}
}	