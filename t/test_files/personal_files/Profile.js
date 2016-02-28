var cumulativeReturnTitle = "Historical Returns";
var tabBoxId = formName + ":vanguardFundTabBox";
var legalHiddenFieldId = "prForm:selectedFund";
var legalHiddenFundChanged = "prForm:fundChanged";
var hiddenFundId = formName + ":hiddenFundId";
var feeminId = tabBoxId + ":tab3";
var standardizedreturnsId = tabBoxId + ":tab1";
var portmgrId = tabBoxId + ":tab2";
var FUNDS_PP_FIRST_TIME_PH = true;
var FUNDS_PP_FIRST_TIME_G10K = true;
var prevItemId = "";

var isPEClient = "Yes";
var profileOVCount = 0;
var profilePPCount = 0;
var profilePMCount = 0;
var profileFMCount = 0;
var profileDSCount = 0;
var profileRNCount = 0;
var profileCMCount = 0;
var profileRBCount = 0;
var profilePRCount = 0;
var FUND_PROFILE_PE_CLIENT = "IsPEClient";
var FUND_PROFILE_COUNT = "FundProfileCount";
var fundCompareAccessed = "false";
var FUND_COMPARE_ACCESSED = "FundCompareAccessed";
var TAB_OV = "Overview";
var TAB_PP = "PricePerformance";
var TAB_PM = "PortfolioManagement";
var TAB_DS = "Distrbution";
var TAB_FM = "FeeMinimum";
var TAB_RN = "ReviewNews";
var TAB_CM = "Cumulative";
var TAB_RB = "RiskBar";
var TAB_PR = "ProspectusReports";
var originalTab = "0";
var strDCSUdateURI = "/us/funds/vanguard/profile/end";

function handleProfileLoad()
{
	originalTab = jsFundsGetOriginalTab();
	jsFundShowTabs();
	
	var tabObj = vg.util.createNameValObj('tab',  jsCBDgetSelectedTabIndex(tabBoxId));
	cbd.history.init(tabObj, buildTitle(), profileHistory);
	//cbd.history.setDefaultState('tab', jsCBDgetSelectedTabIndex(tabBoxId), buildTitle());
	//cbd.history.addCallback(profileHistory);
	countTabSeleceted();
	jsCBDtoggle(formName+":BUTTON_DIV2",true);
}


function buildTitle()
{
	var selectedTab = jsCBDgetSelectedTabIndex(tabBoxId);
	var tabName = tabNames[selectedTab];
	if (selectedTab == "1")
	{
		var history = cbd.history.getHistoryFromUrl();
		if(history!==undefined&&history.tab!==undefined&&history.tab=="1a")
    	{
    		tabName = cumulativeReturnTitle;
    	}
	}	
	var title = "Vanguard - " + titleName + " - " + tabName;
	return title;
}


function profileHistory( hist )
{
	if (hist.tab != undefined)
	{
		var tab = hist.tab;
		if (tab == "1a")
		{
			tab = "1";
		}
		var currentTab = jsCBDgetSelectedTabIndex(tabBoxId);
		if (hist.tab!=currentTab)
		{
			jsCBDselectTabBoxItem(tabBoxId + ":tab" + tab);
		}
		
		if (hist.tab == "1") {
			showPricePerformancePage();
		} else if (hist.tab == "1a") {
			showCumulativeReturnsPage();
		} else if (hist.tab == "2") {
			showPortfolioManagementPage();
		}
		
		jsCBDtoggle(formName+":tabDiv",true);
	}		
}

function handleTabSwitch()
{	   
	addHistoryItem();
	var selectedTab = jsCBDgetSelectedTabIndex(tabBoxId);
	if (selectedTab == "1") {
		showPricePerformancePage();
	} else if (selectedTab == "2") {
		showPortfolioManagementPage();
	}
	countTabSeleceted();
}
function countTabSeleceted()
{	   
	var selectedTab = jsCBDgetSelectedTabIndex(tabBoxId);
	if (selectedTab=="0")
	{
	   jsWurFundDetails("OV");	
	}
	else if (selectedTab=="1")
	{
	   jsWurFundDetails("PP");	
	}
	else if (selectedTab=="2")
	{
	   jsWurFundDetails("PM");	
	}
	else if (selectedTab=="3")
	{
	   jsWurFundDetails("FM");	
	}
	else if (selectedTab=="4")
	{
	   jsWurFundDetails("DS");	
	}
	else if (selectedTab=="5")
	{
	   jsWurFundDetails("RN");	
	}	
}


function jsGetHiddenField(id) {
    var elem = document.getElementById(id);
    return elem;
}

function gotoSelectedFundPrcPerfTab()
{
	var selectedTab = jsCBDgetSelectedTabIndex(tabBoxId);
     var history = cbd.history.getHistoryFromUrl();
     
    if (selectedTab=="1") {
        var newFund = jsGetHiddenField(legalHiddenFundChanged);
        if (newFund.value=="N") {
            jsCBDcloseLayer('legalInfo');
            if (history.tab =="1a")
            {
              var elem = jsGetHiddenField(legalHiddenFieldId);           
              var url = jsCBDgetContextRoot()+"funds/performance?FundId=" + elem.value + "&FundIntExt=INT";                       
              jsCBDgoToUrl(url);
            } 
        } else {
            var elem = jsGetHiddenField(legalHiddenFieldId);
            var url = jsCBDgetContextRoot()+"funds/performance?FundId=" + elem.value + "&FundIntExt=INT";
            jsCBDcloseLayer('legalInfo');
            jsCBDgoToUrl(url);
        }
    } else {
        jsCBDcloseLayer('legalInfo');
        jsCBDselectTabBoxItem(standardizedreturnsId);
        window.scrollTo(0,0);
        addHistoryItem();
    }
}

function gotoFeeMinTab()
{
    jsCBDselectTabBoxItem(feeminId);
    jsCBDcloseLayer('legalInfo');
    addHistoryItem();
}

function gotoStandardizedReturnsTab()
{
    var elem = jsGetHiddenField(hiddenFundId);
    var url = jsCBDgetContextRoot()+"funds/performance?FundId=" + elem.value + "&FundIntExt=INT";
    jsCBDgoToUrl(url);
}

function gotoPortMgrTab()
{
    jsCBDselectTabBoxItem(portmgrId);
    addHistoryItem();
}

function addHistoryItem()
{
	var selectedTab = jsCBDgetSelectedTabIndex(tabBoxId);
	cbd.history.add('tab',selectedTab,buildTitle());
}

var QTR_END_LINK="endLinkForm:endLink0";
var MTH_END_LINK="endLinkForm:endLink1";

function selectLink(id) {
	var qtrEndLink = document.getElementById(QTR_END_LINK);
	var mthEndLink = document.getElementById(MTH_END_LINK);
	if (id == QTR_END_LINK) {
		
		jsCBDtoggleLink(mthEndLink,true);
		jsCBDtoggleLink(qtrEndLink,false,'disabled-text bold');
		var qtrArrow = document.getElementById("QtrArrow");
		var MthArrow = document.getElementById("MthArrow");
		qtrArrow.style.display="";
		MthArrow.style.display="none";
	}
	if (id == MTH_END_LINK) {
		jsCBDtoggleLink(qtrEndLink,true);
		jsCBDtoggleLink(mthEndLink,false,'disabled-text bold');
		var qtrArrow = document.getElementById("QtrArrow");
		var MthArrow = document.getElementById("MthArrow");
		qtrArrow.style.display="none";
		MthArrow.style.display="";
	}
}

var byChart=true;
var byTable=false;
var byQuarterEnd=true;
var byMonthEnd=false;

var QTR_END_CHART="qtrEndChart";
var MTH_END_CHART="mthEndChart";
var QTR_END_TABLE="qtrEndTable";
var MTH_END_TABLE="mthEndTable";

var divIds = new Array(QTR_END_CHART,QTR_END_TABLE,MTH_END_CHART,MTH_END_TABLE);

function showDiv(divId) {
	var currentDiv = null;
	for (var i=0; i < divIds.length; i++) {
		currentDiv = divIds[i];
		if (currentDiv == divId) {
			jsCBDtoggle(currentDiv,true);  // show the specified div
		} else {
			jsCBDtoggle(currentDiv,false); // hide all other div's
		}
	}
}

function showQuarterEnd() {
	byQuarterEnd=true; byMonthEnd=false;
	selectLink(QTR_END_LINK);
	
	if (byChart) {
		showDiv(QTR_END_CHART);
	} else {
		showDiv(QTR_END_TABLE);
	} 
}

function showMonthEnd() {
	byQuarterEnd=false; byMonthEnd=true; 
	selectLink(MTH_END_LINK);
		
	if (byChart) {
		showDiv(MTH_END_CHART);
	} else {
		showDiv(MTH_END_TABLE);
	} 
}

function showChart() { 
	byChart=true; byTable=false;
		
	if (byQuarterEnd) {
		showDiv(QTR_END_CHART);
	} else {
		showDiv(MTH_END_CHART);
	}
}

function showTable() {
	byChart=false; byTable=true; 
	
	if (byQuarterEnd) {
		showDiv(QTR_END_TABLE);
	} else {
		showDiv(MTH_END_TABLE);
	}
}

function hideByG10kChart() { 
		jsCBDtoggle("byG10kChart",true);
		jsCBDtoggle("byPriceChart",false);
}

function hideByPriceChart() { 
		jsCBDtoggle("byG10kChart",false);
		jsCBDtoggle("byPriceChart",true);
}

function hideByCumulativeReturnsPage() { 
		showPricePerformancePage();
		addHistoryItem();
}

function showPortfolioManagementPage () {
	if (typeof(buildComHTML5PieChart) != 'undefined') {
		buildComHTML5PieChart();
	} else if (typeof(buildHTML5PieChart) != 'undefined') {
		buildHTML5PieChart(false);
	}
}

function showPricePerformancePage()
{
	jsCBDtoggle("byCumulativeReturns",false);
	jsCBDtoggle("byPriceAndPerformance",true);
	if (typeof(setupEtsAnalysisChart) != 'undefined') {
		setupEtsAnalysisChart();
	}
}

function showCumulativeReturnsPage()
{
	jsCBDtoggle("byCumulativeReturns",true);
	jsCBDtoggle("byPriceAndPerformance",false);
	jsWurFundDetails("CM");
}

function hideByPriceAndPerformancePage() { 
		showCumulativeReturnsPage();
		var title = "Vanguard - " + titleName + " - " + cumulativeReturnTitle;
		cbd.history.add('tab',"1a",title);
		//(ie) ? vg.html.getElement('byCumulativeReturns').scrollTop='0' :  window.scrollTo(0,0);
		//(ie) ? vg.html.getElement(title).scrollTop='0' :  window.scrollTo(0,0);
        window.scrollTo(0,0);
}
function jsGoToNewPage(url) {
    jsCBDgoToUrl(jsCBDgetContextRoot() + url);
}

function jsContactUs() {
    onContactUs('');
}

function jsOpenShortList()
{
    var url = baseURL;
		
	if (!isSafari1Or2())
	{
        jsCBDgoToUrl(url);
    } 
    else 
    {
	        alert("Vanguard® Funds Short List is not currently available for your browser");
    }
} 

function isSafari1Or2(){
    var userAgent = navigator.userAgent;
	if(userAgent.indexOf("Safari/4")!=-1||userAgent.indexOf("Safari/3")!=-1||userAgent.indexOf("Safari/1")!=-1||userAgent.indexOf("Safari/85")!=-1)
	{
        return true;
    }
	else
	{
        return false;
    }
}

function isSafari(){
    var maker=navigator.vendor;
	alert(maker);
	var pattern=new RegExp("apple","i");
	return pattern.test(maker);
}

function selectRangeForPriceHistory(containerId,link,state,classStyle,fundId, range)
{  
    
	var url = jsCBDgetContextRoot()+"FundsPriceHistoryChart?CHART_ID1="+fundId+"%26"+"Range="+range+"%26Compare=None%26ChartId2=null%26FundIntExt=null%26Ticker=null";
	var rangeDiv = document.getElementById(containerId);
	
	var linkArray = vg.html.getElements(rangeDiv, { tagName:'a', attrName:null, attrValue:null }, null );
	for (i=0; i<linkArray.length; i++ )
	{
		jsCBDtoggleLink(linkArray[i],true,classStyle);
	}
	jsCBDtoggleLink(link,false,classStyle);
    jsCBDupdateChart('market_summary_compare','url', url);	
	

}

function selectRangeForG10k(containerId,link,state,classStyle, range, chart)
{  
    
	var rangeDiv = document.getElementById(containerId);
	
	var linkArray = vg.html.getElements(rangeDiv, { tagName:'a', attrName:null, attrValue:null }, null );
	for (i=0; i<linkArray.length; i++ )
	{
		jsCBDtoggleLink(linkArray[i],true,classStyle);
	}
	jsCBDtoggleLink(link,false,classStyle);
    jsCBDupdateFlash(chart, "rangeHandler", range); 	
	

}
function priceHistoryRangeDisable(containerId,link,state,classStyle)
{	   
	var rangeDiv = document.getElementById(containerId);	
	
	var linkArray = vg.html.getElements(rangeDiv, { tagName:'a', attrName:null, attrValue:null }, null );
	
	for (i=0; i<linkArray.length; i++ )
	{			
		jsCBDtoggleLink(linkArray[i],true,classStyle);
	}
	
	jsCBDtoggleLink(link,false,classStyle);    
	
}

function g10kRangeDisable(containerId,link,state,classStyle)
{	
	var rangeDiv = document.getElementById(containerId);	
	
	var linkArray = vg.html.getElements(rangeDiv, { tagName:'a', attrName:null, attrValue:null }, null );
	
	for (i=0; i<linkArray.length; i++ )
	{			
		jsCBDtoggleLink(linkArray[i],true,classStyle);
	}
		
	jsCBDtoggleLink(link,false,classStyle);    
	
}


function enablePriceHistoryLinks()
{
	if(document.getElementById('priceHistoryForm:phcom1') != null)
    {
		jsCBDtoggleLink(document.getElementById('priceHistoryForm:phcom1'), true);
	}
	if(document.getElementById('priceHistoryForm:phcom2') != null)
    {
		jsCBDtoggleLink(document.getElementById('priceHistoryForm:phcom2'), true);
	}
	if(document.getElementById('priceHistoryForm:phcom3') != null)
    {
		jsCBDtoggleLink(document.getElementById('priceHistoryForm:phcom3'), true);
	}
	if(document.getElementById('priceHistoryForm:phcom4') != null)
    {
		jsCBDtoggleLink(document.getElementById('priceHistoryForm:phcom4'), true);
	}
	if(document.getElementById('priceHistoryForm:phcom5') != null)
    {
		jsCBDtoggleLink(document.getElementById('priceHistoryForm:phcom5'), true);
	}
	if(document.getElementById('priceHistoryForm:phcom6') != null)
    {
		jsCBDtoggleLink(document.getElementById('priceHistoryForm:phcom6'), true);
	}
	if(document.getElementById('priceHistoryForm:phcom7') != null)
    {
		jsCBDtoggleLink(document.getElementById('priceHistoryForm:phcom7'), false);
	}

}




function priceHistory10yrRangeDisable(id)
{  
	//enable all the links
    enablePriceHistoryLinks();
   	//disable the one that was just clicked
	jsCBDtoggleLink(id,false,'disabled-text bold');


	/*var span = document.getElementById(id);
		var p=span.firstChild;
		while (p.nodeType!=1)
		  {
		  p=p.nextSibling;
		  }
		var a=p.firstChild;
		while (a.nodeType!=1)
		  {
		  a=a.nextSibling;
		  }		 
		return a;  */
}

function enable10KLinks()
{
	if(document.getElementById('growth10kform:g10com1') != null)
    {
		jsCBDtoggleLink(document.getElementById('growth10kform:g10com1'), true);
	}
	if(document.getElementById('growth10kform:g10com2') != null)
    {
		jsCBDtoggleLink(document.getElementById('growth10kform:g10com2'), true);
	}
	if(document.getElementById('growth10kform:g10com3') != null)
    {
		jsCBDtoggleLink(document.getElementById('growth10kform:g10com3'), true);
	}
	if(document.getElementById('growth10kform:g10com4') != null)
    {
		jsCBDtoggleLink(document.getElementById('growth10kform:g10com4'), true);
	}
}
	




function g10k10yrRangeDisable(id)
{  
	//enable all the links
    enable10KLinks();
   	//disable the one that was just clicked
	jsCBDtoggleLink(id,false,'disabled-text bold');
	/*var span = document.getElementById(id);
		var p=span.firstChild;
		
		while (p.nodeType!=1)
		  {		  
		  p=p.nextSibling;
		  
		  }
		var a=p.firstChild;
		
		while (a.nodeType!=1)
		  {
		  a=a.nextSibling;
		  }
		   
		return a; */
}
function priceHistory10yrRangeDisableFirstTime()
{   
                               
	if (FUNDS_PP_FIRST_TIME_PH) {
            //var defaultDisabledLinkA = priceHistory10yrRangeDisable("10yr");           
            //priceHistoryRangeDisable('phDiv2', defaultDisabledLinkA, false, 'disabled-text bold');
			enablePriceHistoryLinks();	
            FUNDS_PP_FIRST_TIME_PH = false;            
       }
}

function g10k10yrRangeDisableFirstTime()
{   
                                 
	if (FUNDS_PP_FIRST_TIME_G10K) {
            var defaultDisabledLinkA = g10k10yrRangeDisable("10yr");
			//var defaultDisabledLinkA = g10k10yrRangeDisable('growth10kform:g10com4');
            priceHistoryRangeDisable('phDiv1', defaultDisabledLinkA, false, 'disabled-text bold');
            FUNDS_PP_FIRST_TIME_G10K = false;
       }
}

function isTooManyEmails(id)
{
 var temp = document.getElementById(id);
 var s= temp.value;
 
 var email=s.split(',');
 if(email.length > 5)
   { 
   	jsCBDsetErrMessage(jsCBDgetErrMsgId(id,"MORE_THAN_FIVE"), true);
   	return false;
   }
   
   return true;
}


function jsValidateSenderEmail(id)
{
	
	var senderEmail = document.getElementById(id);
	var value = senderEmail.value;
	
	var isVG = isVanguardEmail(value);
	
	if (isVG)
     	{
    	jsCBDsetErrMessage(jsCBDgetErrMsgId(id,"VANGUARD_EMAIL"), true);
		
    	return false;
   		}
	
	return true;
}
function isVanguardEmail(eml)	
	{
		eml = trim(eml);
		seml = eml.substring(eml.indexOf('@')+1,eml.length);
		if (seml == "vanguard.com")
		{
			return true;
		}	
		else 
		{
			return false;
		}
	}

function messageLimitInput()
{
        var commentMessage = document.getElementById("commentForm:commentMessageInput");
        if (commentMessage.value.length > 500) {
            commentMessage.value = commentMessage.value.substring(0,500);
        }
}
function setCommentLayerInputs()
{		
	
		if(document.getElementById("commentForm:commentMessageInput").value != ""){
		jsCBDselectDeckCard('commentForm:messageDeck', 1);

        document.getElementById("subContentForm:commentSubjectInput").value = document.getElementById("commentForm:commentSubjectInput").value;
        document.getElementById("subContentForm:commentMessageInput").value = document.getElementById("commentForm:commentMessageInput").value;
        document.getElementById("subContentForm:commentWarningMsg").value = "false";
        //reset the value
        document.getElementById("commentForm:commentSubjectInput").value = '';
        document.getElementById("commentForm:commentMessageInput").value = '';
    
        jsCBDupdateComponent('subContentForm',document.getElementById("subContentForm"),null,null,null,'charset=UTF-8',true);
        setTimeout("pauseAndClose('toolbarForm:commentLayer')",4000);
        }
   
}

function commentCancelAction(){
	
	document.getElementById("subContentForm:commentWarningMsg").value = "false";
	jsCBDupdateComponent('subContentForm', this, null, null, null, null, true);
	
}
function loadNewFund(value)
{		
	jsCBDupdateFlash('g10k_sl1', "addFundHandler", value);
}


function handleCustomFlash(chart, start, end) {
	flash = document.getElementById(chart);
	box1 = document.getElementById(start);
	box2 = document.getElementById(end);
	
	val = box1.value + "," + box2.value;
	updateFlash(chart, val);
}

function selectItem(value, label, id)
    {               
		loadNewFund(value);
        
        return true;
    }


function changeToDefault(id)
    {     
       jsCBDresetAutoSuggest(id);
    }

function disableLinkOnPageLoad(){

	if(document.getElementById('growth10kform:g10com1') != null)
    {
		jsCBDtoggleLink(document.getElementById('growth10kform:g10com1'), true);
	}
	if(document.getElementById('growth10kform:g10com2') != null)
    {
		jsCBDtoggleLink(document.getElementById('growth10kform:g10com2'), true);
	}
	if(document.getElementById('growth10kform:g10com3') != null)
    {
		jsCBDtoggleLink(document.getElementById('growth10kform:g10com3'), true);
	}
	if(document.getElementById('growth10kform:g10com4') != null)
    {
		jsCBDtoggleLink(document.getElementById('growth10kform:g10com4'), false);

	}
}

function disable10yrG10K() 
{   
	//var defaultDisabledLinkB = g10k10yrRangeDisable("10yrG10k");
	//g10kRangeDisable('phDiv1', defaultDisabledLinkB, false, 'disabled-text bold');
	disableLinkOnPageLoad();
    refereshMKTPriceClicked();    
	var history = cbd.history.getHistoryFromUrl();
	if(history!==undefined&&history.tab!==undefined)
    {
    	var historyTab = history.tab;
    	if (historyTab == "1") {
    		showPricePerformancePage();
    	} else {
    		showCumulativeReturnsPage();
    	}
    }
        
}
function displayBenchmark()
{   
     var selectedBenchmark = jsCBDgetSelectOneMenuValue('selectOneMenuForm:selectOneMenu');
     var selectedBenchmarkName = jsCBDgetSelectOneMenuLabel('selectOneMenuForm:selectOneMenu');
     var chart = "g10k_sl1";
     jsCBDupdateFlash(chart, "benchmarkHandler", selectedBenchmark);
     
     jsCBDsetSelectOneMenuValue('selectOneMenuForm:selectOneMenu', 'SO');
 }
 function displayPEBenchmark()
{   
     var selectedBenchmark = jsCBDgetSelectOneMenuValue('autoSuggestFormPE:selectOneMenu');
     var selectedBenchmarkName = jsCBDgetSelectOneMenuLabel('autoSuggestFormPE:selectOneMenu');
     var chart = "g10k_sl1";
     jsCBDupdateFlash(chart, "benchmarkHandler", selectedBenchmark);
     
     jsCBDsetSelectOneMenuValue('autoSuggestFormPE:selectOneMenu', 'SO');
 }
 
function jsOpenLegalLayer()
{
    var fundId = jsGetHiddenField(hiddenFundId).value;
    var url = jsCBDGetLayerContentUrl('legalInfo');
	
    pos = url.indexOf('?');
	if(pos < 0) {
		url = url+"?OrigFundId="+fundId;
	} else {
		url = url.substring(0,pos)+"?OrigFundId="+fundId;
    }
    
    if (!retailSite)
    {

         if(fundIntExt==null){
         fundIntExt="INT";
         }
         if(fundPlanId!=null){
	       url = url + "&APP=PE"+"&FundIntExt="+fundIntExt+"&SelectedPlanId="+fundPlanId+"&FundId="+fundId;
        }

    	 else{
           url = url + "&APP=PE"+"&FundIntExt="+fundIntExt+"&FundId="+fundId;
         }
    }

    jsCBDSetLayerContentUrl('legalInfo', url);
	jsCBDopenLayer('legalInfo');
}

function jsViewLegal(fundId)
{
    var url = jsCBDGetLayerContentUrl('legalInfo');
	
    pos = url.indexOf('?');
	if(pos < 0)
	{
		url = url+"?FundId="+fundId;
	} else {
		url = url.substring(0,pos)+"?FundId="+fundId;
    }

	jsCBDSetLayerContentUrl('legalInfo', url);
	jsCBDopenLayer('legalInfo');
}
 function jsBuySelectedFunds()
{	
    var fundId = jsGetHiddenField(hiddenFundId).value;
	
    var qry = "";
			
	qry = jsParamLocationString("", "FundProfile");
    qry += "&FundId=" + fundId;
	
	if (isLoggedOn)
	{
		window.location = jsCBDgetContextRoot() + "PurchaseActivity"+qry;
	}
	else
	{
		window.location = jsCBDgetContextRoot() + "OpenAccountController"+qry;
	}
}

function jsParamLocationString(params, location)
{
	if(params == "")
	{
		params = params + "?";
	}
	else
	{
		params = params + "&";
	}
	
	params = params + "Location=" + location;
	params += "&FundsDisplay=true";
	return params;
}

function jsWurFundDetails(tabName)
{
	jsAddOvWurTag(tabName);
}

function jsWurFundTabDetails(tabName)
{
	if(tabName == "OV")
	{
		profileOVCount=(profileOVCount*1)+1;
	}
	else if(tabName == "PP")
	{
		profilePPCount=(profilePPCount*1)+1;
	}
	else if(tabName == "PM")
	{
		profilePMCount=(profilePMCount*1)+1;
	}
    else if(tabName == "DS")
	{
		profileDSCount=(profileDSCount*1)+1;
	}
	else if(tabName == "FM")
	{
		profileFMCount=(profileFMCount*1)+1;
	}
	else if(tabName == "RN")
	{
		profileRNCount=(profileRNCount*1)+1;
	}
	else if(tabName == "CM")
	{
		profileCMCount=(profileCMCount*1)+1;		
	}
	else if(tabName == "RB")
	{
		profileRBCount=(profileRBCount*1)+1;
	}
	else if(tabName == "PR")
	{
		profilePRCount=(profilePRCount*1)+1;		
	}
}

function jsAddOvWurTag(tabName)
{
	jsWurFundTabDetails(tabName);
}

function jsFPOnUnLoad()
{	
	jsFPWriteMetaTags();

	updateFPURI();
}

function jsFPWriteMetaTags(fundId)
{	
	jsCBDAddMetaTag(FUND_PROFILE_COUNT+"-"+TAB_OV , profileOVCount);
	jsCBDAddMetaTag(FUND_PROFILE_COUNT+"-"+TAB_PP , profilePPCount);
	jsCBDAddMetaTag(FUND_PROFILE_COUNT+"-"+TAB_PM , profilePMCount);
	jsCBDAddMetaTag(FUND_PROFILE_COUNT+"-"+TAB_FM , profileFMCount);
	jsCBDAddMetaTag(FUND_PROFILE_COUNT+"-"+TAB_DS , profileDSCount);
	jsCBDAddMetaTag(FUND_PROFILE_COUNT+"-"+TAB_RN , profileRNCount);
	jsCBDAddMetaTag(FUND_PROFILE_COUNT+"-"+TAB_CM , profileCMCount);
	jsCBDAddMetaTag(FUND_PROFILE_COUNT+"-"+TAB_RB , profileRBCount);
	
	var isInstClient=jsCheckForInstClient(); 
	 if (isInstClient == "PE")
	 {
		jsCBDAddMetaTag( FUND_PROFILE_PE_CLIENT , isPEClient);
	 }
	else
	 {
		jsCBDAddMetaTag(FUND_PROFILE_COUNT+"-"+TAB_PR , profilePRCount);
	 }
}
function updateFPURI()
{
	jsCBDupdateDcsUri(strDCSUdateURI);
}

function jsOpenRiskLayer()
{
	jsCBDopenLayer('riskbarInfo');
	jsWurFundDetails("RB");
}

function jsOpenProspectReportLayer(fundId)
{	
	var url = jsCBDGetLayerContentUrl('prosRpt');
	if(url.indexOf('fundId') != -1)
		url = url.substring(0,url.indexOf("?"));
		
	url = url + "?fundId="+fundId;
	jsCBDSetLayerContentUrl('prosRpt',url);
	jsCBDopenLayer('prosRpt');
	jsWurFundDetails("PR");
}
function jsHistTabSameAsOrigTab()
{
	var history = cbd.history.getHistoryFromUrl();
	if(history!==undefined&&history.tab!==undefined)
    {
    	var historyTab = history.tab;
    	if (historyTab!=originalTab)
        {
        	return false;	
        }          		
	}
	return true;
}
function jsCheckForInstClient()
{  
	var history = cbd.history.getHistoryFromUrl();
	var instTab ="";
	if(history!==undefined&&history.tab!==undefined)
    {
    	var historyTab = history.tab;
    	var instQuery = "&APP=";       
    	var instTabIndex = location.href.indexOf(instQuery);
    	if (instTabIndex!=-1)
        {         	
          instTab = location.href.charAt(instTabIndex+instQuery.length) +location.href.charAt(instTabIndex+instQuery.length+1);
	    }
	 }   
    return instTab;
}

function jsFundShowTabs()
{
	if (jsHistTabSameAsOrigTab())
	{
		jsCBDselectTabBoxItem(tabBoxId + ":tab" + originalTab);		
		jsCBDtoggle(formName+":tabDiv",true);
	}
}

function jsFundsGetOriginalTab()
{
	var origTab = "0";
	var tabQuery = "?tab=";
   	var origTabIndex = location.href.indexOf(tabQuery);
    if (origTabIndex!=-1)
    {
    	origTab = location.href.charAt(origTabIndex+tabQuery.length); 
    }
    else
    {
    	var url = document.URL.toUpperCase();
    	if (urlContains(url,"SNAPSHOT")|| urlContains(url,"OPTIONS") || urlContains(url,"PROSPECTUS"))
    	{
    		origTab = 0;
    	}
    	else if (urlContains(url,"PERFORMANCE")||urlContains(url,"HISTORICALRETURNS")||urlContains(url,"PRICEHISTORY")||urlContains(url,"FUNDS52WEEKHIGHLOW"))
    	{
    		origTab = 1;
    	}
    	else if (urlContains(url,"WHOSHOULDINVEST")||urlContains(url,"MANAGEMENT")||urlContains(url,"RISK")||urlContains(url,"HOLDINGS"))
    	{
    		origTab = 2;
    	}
    	else if (urlContains(url,"FEES"))
    	{
    		origTab = 3;
    	}
    	else if (urlContains(url,"DISTRIBUTIONS"))
    	{
    		origTab = 4;
    	}
    	else if (urlContains(url,"NEWS"))
    	{
    		origTab = 5;
    	}
    }
    return origTab;
}

function urlContains(url,str)
{
	return url.indexOf(str)!=-1; 
}

function longHoldingsClicked()
{
	jsCBDtoggle("longPort",true);
	jsCBDtoggle("shortPort",false);
}

function shortHoldingsClicked()
{
	jsCBDtoggle("shortPort",true);
	jsCBDtoggle("longPort",false);
}

function refereshMKTPriceClicked()
{
    if(document.getElementById('AfterTaxForm:link0') != null)
    {
        jsCBDexecCmdLink('AfterTaxForm:link0');

    }
    if(document.getElementById('HistoricalQtrlyForm:qtrlylink3') != null)
    {
        jsCBDexecCmdLink('HistoricalQtrlyForm:qtrlylink3');

    }
      
}

function jsReadTranscript(url) {
	jsClearOldVideos();
	jsCBDcloseLayer('videoLayer');
	var contextRoot = "/us";
	// remove '.jsp' from the URL the 
	url = url.substring(0, url.length - 4);
	// Replace "freshness" with "insights" in the URL
	url = url.replace("freshness", "insights");
	
    jsCBDgoToUrl(contextRoot+url);
}


function jsClearOldVideos() {
	jsCBDclearLayer('videoLayer');	
}

// get canvas context, determine radius and center
function buildComHTML5PieChart(usePassedColors){

	$('.html5PieChart').each(function() {	

		canvasContainer = $(this);
		if (canvasContainer == null || canvasContainer.length == 0) {	
			return;
		}

		usePassedColors = (usePassedColors) ? usePassedColors : (canvasContainer.attr("usePassedColors") == 'true');
		useDataLink = canvasContainer.attr("dataurl");
		$.ajax({
			type: "GET",
			url: useDataLink,
			dataType: "xml",
			success: function(xml) {
				var useData = [], useLabels = [];
				var fundlistType; 
				var $xml = $(xml);
				var fl = $xml.find("data");
				var passColors = [];
				fl.each(function(){
					var $this = $(this);
					useData.push(parseFloat($this.attr("value")));
					useLabels.push($this.attr("label"));
					if (usePassedColors) {	
						passColors.push('#' + $this.attr("color"));
					}
				});
				//start building canvases after data is received
		
				canvasContainer.each(function () {
				
					var canvasTag = $(this).find('canvas');
					if (canvasTag == null || canvasTag.length == 0) {
						return;
					}
					var canvasID = canvasTag.get(0);
					var legendID = $(this).find('div[id^=legend]');
					
					var ctx = canvasID.getContext('2d');
					ctx.strokeStyle = "#000";
					ctx.lineHeight = ctx.lineWidth = 2;
					var canvas_size = [canvasID.width-(ctx.lineWidth*2), canvasID.height-(ctx.lineHeight*2)];
					var radius = Math.min(canvas_size[0], canvas_size[1]) / 2;
					var center = [(canvas_size[0]/2)+ctx.lineWidth, (canvas_size[1]/2)+ctx.lineHeight];
					var total = 0;
					var sofar = 0; // keep track of progress
					
					for(var i=0; i<useData.length; i++){
						total += useData[i];
					}
					
					var hasValue = checkDataValuesExist(useData);
					if(!hasValue){
						 passColors = ["#CCC"];
						 ctx.beginPath();
						  ctx.arc(center[0], center[1], radius, 0, 2 * Math.PI, false);
						  ctx.fillStyle = '#CCC';
						  ctx.fill();
						  ctx.closePath();
					}else{
						if(passColors.length == 0){
							 passColors = ["#5190CD","#FFCF01","#9E1B34","#AFBC22","#00446A", "#7C4199"];	
						}
					}
					
					var useHTML = '<table class="mydata" width="200px">'
					
					for (var i = 0; i<useData.length; i++) {
					 	//if(!(useData[i] == 0 && hasValue)){
							var thisvalue = useData[i] / total;
						 
							ctx.beginPath();
							ctx.moveTo(center[0], center[1]); // center of the pie
							ctx.arc(  // draw next arc
								center[0],
								center[1],
								radius,
								Math.PI * (- 0.5 + 2 * sofar), // -0.5 sets set the start to be top
								Math.PI * (- 0.5 + 2 * (sofar + thisvalue)),
								false
							);
							
							ctx.lineTo(center[0], center[1]); // line back to the center
							//ctx.stroke();
							ctx.closePath();
							if(passColors.length == useData.length){
								ctx.fillStyle = passColors[i]; 
							}else{
								ctx.fillStyle = passColors[i%passColors.length];
							}
							ctx.fill();
						 
							sofar += thisvalue; // increment progress tracker
							
							useHTML += '<tr><th><div id="'+useLabels[i].replace(" ", "")+'Legend'+i+'" style="height: 12px; width: 12px;">&nbsp;</div></th><td class="chartInfoLabel percentLabel">&nbsp;&nbsp;<b>'+toFixed((useData[i] / total)*100, 2)+'%</b></td><td class="chartInfoLabel">'+useLabels[i]+'</td></tr>';
							
						//}
					}
					useHTML += '</table>';
					legendID.html(useHTML);
					for(var i= 0; i<useData.length; i++){
						//if(!(useData[i] == 0 && hasValue)){
							var legendCvsId = '#' + useLabels[i].replace(" ", "")+'Legend'+i;
							var legendCvs = $(this).find(legendCvsId);
							if (legendCvs == null || legendCvs.length == 0) {
								continue;
							}

							if(passColors.length == useData.length){
								legendCvs.css("background-color", passColors[i]); 
							}else{
								legendCvs.css("background-color", passColors[i%passColors.length]); 
							}// color
						//}
					
					}
				});
			}
		});
	});
}

function checkDataValuesExist(useData){
	for(var i=0; i<useData.length; i++){
		if(useData[i] != 0) return true;
	}
	return false;
};

function toFixed(value, precision) {
    var precision = precision || 0,
    neg = value < 0,
    power = Math.pow(10, precision),
    value = Math.round(value * power),
    integral = String((neg ? Math.ceil : Math.floor)(value / power)),
    fraction = String((neg ? -value : value) % power),
    padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');

    return precision ? integral + '.' +  padding + fraction : integral;
    
}