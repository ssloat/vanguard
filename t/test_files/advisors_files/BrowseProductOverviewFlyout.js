
var DEFAULT_RULE = {
					rule: function(product) {
								return true;
							}
				   },
	assetClassDef = DEFAULT_RULE,
	subAssetClassDef = DEFAULT_RULE,
	FIND_PORTNUM_REGEX = new RegExp('(:[0-9]+)'),
	FIX_NAME_REGEX = new RegExp('(?:vanguard|shares)', 'ig'),
	UNDERSCORE_REGEX = new RegExp('/| ','g'), // symbols ('/') or space
	subAssetClassRuleMap = {
								'US_STOCK_LARGE' : 'US_STOCK_LARGE' ,
								'US_STOCK_MID' : 'US_STOCK_MID' ,
								'US_STOCK_SMALL' : 'US_STOCK_SMALL' ,
								'US_STOCK_VALUE' : 'US_STOCK_VALUE' ,
								'US_STOCK_BLEND' : 'US_STOCK_BLEND' ,
								'US_STOCK_GROWTH' : 'US_STOCK_GROWTH' ,
								'US_STOCK_SECTOR_SPECIALTY' : 'SECTOR_SPECIALTY' ,
								
								'INT_STOCK_INTERNATIONAL' : 'INTL_STOCK_INTERNATIONAL' ,
								'INT_STOCK_GLOBAL' : 'INTL_STOCK_GLOBAL' ,
								
								'US_BOND_SHORT' : 'US_BOND_SHORT' ,
								'US_BOND_INTERMEDIATE' : 'US_BOND_INTERMEDIATE' ,
								'US_BOND_LONG' : 'US_BOND_LONG' ,
								'US_BOND_TREASURY_AGENCY' : 'US_BOND_TRSRY_AGENCY' ,
								'US_BOND_INVESTMENT_GRADE' : 'US_BOND_INV_GRADE' ,
								'US_BOND_BELOW_INVESTMENT_GRADE' : 'US_BOND_BELOW_INV_GRADE' ,
								'US_BOND_MUNICIPAL' : 'US_BOND_MUNICIPAL' ,
								
								'INT_BOND_ALL' : 'INT_BOND' ,
								
								'BALANCED_TRADITIONAL' : 'BALANCED_TRADITIONAL' ,
								'BALANCED_TARGET_RISK' : 'BALANCED_TARGET_RISK' ,
								'BALANCED_TARGET_DATE' : 'BALANCED_TARGET_DATE' ,
								'BALANCED_MANAGED_PAYOUT' : 'BALANCED_MANAGED_PAYOUT' ,
								
								'MONEY_MARKET_TAXABLE' : 'MONEY_MARKET_TAXABLE' ,
								'MONEY_MARKET_NATIONAL' : 'MONEY_MARKET_NATIONAL_MUNI' ,
								'MONEY_MARKET_STATE' : 'MONEY_MARKET_STATE_MUNI'
							},
		fundsUnavailable = false,
		productOverviewUrl,
		fundsListBlock;
		

(function(angular) { 
var myAppModule = angular.module('Flyout',["ngResource"]);
		myAppModule.controller('FlyoutController',function($scope,subAssetFac,FrapiService) {

			var productTypeVar = null;
			var productFundIdVar = null;
			var holdClassifications = null;
			var parAssetClass=null;
			var parSubAssetClass=null;

			loadData = function(){
				
				$scope.holdAssestClasses=null;
				$scope.holdSubAssestClasses=null;
				$scope.holdProductType=null;
				$scope.holdProductFundId=null;
				
				productFundIdVar = document.getElementById('productFundID').value;
				productTypeVar = document.getElementById('productTypeId').value;
				var assetClassVar = document.getElementById('productAssetClassId').value;
				var subAssetClassVar = document.getElementById('productSubAssetClassId').value;

				if(null == assetClassVar || "" == assetClassVar || null == subAssetClassVar || "" == subAssetClassVar){
					holdClassifications = getAssetAndSubAssetClassification(productFundIdVar);
					assetClassVar = holdClassifications[0];
					subAssetClassVar = holdClassifications[1];
				}
				
				if(assetClassVar=="US_STOCK"){
					$scope.holdAssestClasses={name:"U.S.Stock", productType:['etf','fund','fund,etf'],acDataRuler:'US_STOCK'};
				}else if(assetClassVar=="INT_STOCK"){
					$scope.holdAssestClasses={name:"International Stock", productType:['etf','fund','fund,etf'],acDataRuler:'INT_STOCK'};
				}else if(assetClassVar=="US_BOND"){
					$scope.holdAssestClasses={name:"U.S.Bond", productType:['etf','fund','fund,etf'],acDataRuler:'US_BOND'};
				}else if(assetClassVar=="INT_BOND"){
					$scope.holdAssestClasses={name:"International Bond", productType:['etf','fund','fund,etf'],acDataRuler:'INT_BOND'};
				}else if(assetClassVar=="BALANCED"){
					$scope.holdAssestClasses={name:"Balanced", productType:['fund','fund,etf'],acDataRuler:'BALANCED'};
				}else if(assetClassVar=="MONEY_MARKET"){
					$scope.holdAssestClasses={name:"Money Market", productType:['fund','fund,etf'],acDataRuler:'MONEY_MARKET'};
				}
				$scope.holdSubAssestClasses=subAssetClassVar;
				if(null == productTypeVar || "" == productTypeVar){
					var product = getProductOnFundId(productFundIdVar);
					productTypeVar = product.profile.pdtTyp;
				}
				$scope.holdProductType=productTypeVar;
				$scope.holdProductFundId=productFundIdVar;
			}
			
				
				var LevelConst = {pt:0,ac:1,sac:2};
				 $scope.allFunds = FrapiService.get({pt: "fund,etf"}); 
				 $scope.AssetClass =[{name:"U.S.Stock", productType:['etf','fund','fund,etf'],acDataRuler:'US_STOCK'},
										{name:"International Stock", productType:['etf','fund','fund,etf'],acDataRuler:'INT_STOCK'},
										{name:"U.S.Bond", productType:['etf','fund','fund,etf'],acDataRuler:'US_BOND'},
										{name:"International Bond", productType:['etf','fund','fund,etf'],acDataRuler:'INT_BOND'},
										{name:"Balanced", productType:['fund','fund,etf'],acDataRuler:'BALANCED'},
										{name:"Money Market", productType:['fund','fund,etf'],acDataRuler:'MONEY_MARKET'}];
				 
										
					  // set the ProductType value on click and on load of the page
				  	$scope.setProductType = function(prodType){
				  		if($scope.productType!= prodType){
					  		$scope.productType= prodType;
					  		setDefaults(LevelConst.pt);
					  		getData(prodType);
				  		}
				  	}
				  	
				  	$scope.onClickProductType = function(prodType){
				  		$scope.holdProductType= prodType;
				  		$scope.holdAssestClasses={name:"U.S.Stock", productType:['etf','fund','fund,etf'],acDataRuler:'US_STOCK'};
				  		$scope.holdSubAssestClasses='Large';
				  		$scope.showHomeFlyOutData("false");
				  	}

				  // set the ProductType value on click and on load of the page
				  	$scope.showHomeFlyOutData = function(callLoadData){
				  		if(!fundsListBlock) {
							fundsListBlock = $('.fundsListBlock')[0];
						}
				  		fundsListBlock.scrollTop = 0;
				  		if(callLoadData == "true"){
					  		loadData();
				  		}
				  		if($scope.holdAssestClasses != null && $scope.holdSubAssestClasses != null && $scope.holdProductType != null){
				  			$scope.setProductType($scope.holdProductType);
					  		$scope.setAssetClassForBop($scope.holdAssestClasses,$scope.holdSubAssestClasses);
							$scope.sac=$scope.holdSubAssestClasses;
							$scope.assetClass=$scope.holdAssestClasses;
							$scope.holdProductFundId=productFundIdVar;
							if($scope.holdProductType=="etf"){
								$('.etfBtn').css({"color":"#FFF","background-color":"#96151D"});
								$('.mutualBtn').css({"color":"black","background-color":"#F1F0EC"});
								$('.AllBtn').css({"color":"black","background-color":"#F1F0EC"});
							}else if($scope.holdProductType=="fund"){
								$('.mutualBtn').css({"color":"#FFF","background-color":"#96151D"});
								$('.etfBtn').css({"color":"black","background-color":"#F1F0EC"});
								$('.AllBtn').css({"color":"black","background-color":"#F1F0EC"});
							} else{
								$('.AllBtn').css({"color":"#FFF","background-color":"#96151D"});
								$('.etfBtn').css({"color":"black","background-color":"#F1F0EC"});
								$('.mutualBtn').css({"color":"black","background-color":"#F1F0EC"});
							}
				  		}
				  		$scope.$apply();
			  		};
				  	
				  	// set the defaults to required one
				  	function setDefaults(level) {
				  		 try{
								switch(level) {
									case undefined : 		$scope.productType='etf';
									case LevelConst.pt :	$scope.assetClass=null;
									case LevelConst.ac :	setDefaultSubAssetClass();
															$scope.sac=$scope.subAssetClasses[0];
								}
						 }catch(e){}
						}
					
					// display the list of assetClasses based on product					
					$scope.getAssetClass = function(assetClass,productType){
						for(var i=0; i< assetClass.productType.length;i++)
					      {
					         if(assetClass.productType[i]==productType){
					        	 return true;
					         }
					       }
					    	return false;
					}

					// set the assetClass dataRuler to display the funds 
					$scope.setAssetClassForBop = function(assetClass,subAssetClass){
						if($scope.assetClass != assetClass){
							fundsListBlock.scrollTop = 0;
						}
						$scope.assetClass = assetClass;
						setDefaults(LevelConst.ac);
						$scope.setSubAssetClass(subAssetClass);
						$('.flyoutContainer').css({"border-right":"solid 1px #948775","padding-right":"4px"});
						assetClassDef = AssetClassification[$scope.assetClass.acDataRuler];
							if(!assetClassDef) {
								assetClassDef = DEFAULT_RULE;
							}
					} 

					// set the assetClass dataRuler to display the funds 
					$scope.setAssetClass = function(assetClass){
						if($scope.assetClass != assetClass){
							fundsListBlock.scrollTop = 0;
						}
						$scope.assetClass = assetClass;
						setDefaults(LevelConst.ac);
						$scope.setSubAssetClass($scope.sac);
						$('.flyoutContainer').css({"border-right":"solid 1px #948775","padding-right":"4px"});
						assetClassDef = AssetClassification[$scope.assetClass.acDataRuler];
							if(!assetClassDef) {
								assetClassDef = DEFAULT_RULE;
							}
					} 
					 
					// set the subassetClass dataRuler to display the funds 
					$scope.setSubAssetClass = function(subAssetClass){
						if($scope.sac != subAssetClass){
					  		fundsListBlock.scrollTop = 0;
					  	}
						$scope.sac = subAssetClass;
					  	setDefaults(LevelConst.sac);
					  	// getting selected ruler
					  	var key = $scope.assetClass.acDataRuler + '_' + $scope.sac.replace(UNDERSCORE_REGEX,'_').toUpperCase();
					  	parAssetClass=$scope.assetClass.acDataRuler;
					  	parSubAssetClass=$scope.sac;
					  	subAssetClassDef = SubAssetClassification[subAssetClassRuleMap[key]];
					  	if(!subAssetClassDef) {
					  		subAssetClassDef = DEFAULT_RULE;
					  	}
					  	// special case for SECTOR_SPECIALTY
					  	if(key == 'US_STOCK_SECTOR_SPECIALTY' ) {
					  		assetClassDef = DEFAULT_RULE;
					  	}
					}

					// set the css Class depending on the element we hover on
					$scope.changeStyleOnHover = function(element){
						if($scope.sac === element){
							return "onHoverSubAssetClass";
						}else if($scope.assetClass === element){
							return "onHoverAssetClass";
						}
						else{ return "";}
					}
					
					$scope.changeStyleForAssetClass = function(element){
						if($scope.assetClass.name == element.name){
							return "active";
						}
						else{ return "";}
					}
					
					$scope.changeStyleForFunds = function(){
						if($scope.holdProductFundId === this.fund.profile.portId){
							return true;
						}
						else{ return false;}
					}

					$scope.openFundDetailPage = function(fundId) {
						if(!productOverviewUrl) {
							productOverviewUrl = document.getElementById('productOverviewUrl').value;
						}
						jsCBDgoToUrl(productOverviewUrl+fundId+"&assetClass="+parAssetClass+"&subAssetClass="+parSubAssetClass+"&productType="+$scope.productType);
					}
					
					// set the default subasset classes when we hover on assetClass
					setDefaultSubAssetClass = function(){
							subAssetFac.setSubAssetClass($scope.assetClass,$scope.productType);
							$scope.subAssetClasses = subAssetFac.getSubAssetClass();
						}
						
					//gets the data from Frapi	
					getData = function (productType) {
						$scope.funds = FrapiService.get({pt: productType});
						}
					
				    }).provider("FrapiService",function() {
								// add escape char before port num
								var serviceUrl = document.getElementById('resourceUrl').value;
								serviceUrl = serviceUrl.replace(FIND_PORTNUM_REGEX,'\\$1');
								this.$get = ["$resource", function ($resource) {
									return $resource(serviceUrl, undefined, {
								            get: {method: "JSONP", isArray: false},
				                			query: {method: "JSONP", isArray: false}
				            			});
				            	}];
					}).filter('filterFunds',function() {
							var func = function(input) {
								if(input){
									fundListToReturn=[];
									$.merge(fundListToReturn,$.grep(input, function(item,ind) {
									return filterFund(item);}));
								}
								var j;
								var object; 
								for (j = fundListToReturn.length -1; j < fundListToReturn.length; j++) {
									object = fundListToReturn[j].profile;
									if (object.targetRetirementProgramName=="TARGET RETIREMENT FUND"){
										fundListToReturn.reverse();
									}
								}
								return fundListToReturn;
							}
							return func;
					}).filter('trimFundName',function() {
							var func = function (nm) {
								return nm.replace(FIX_NAME_REGEX,'');;
							};
							return func;
					}).factory('subAssetFac',function(){
							 var subAssetService ={};
					         subAssetService.SubAssetClass = [{name:"U.S.Stock", subAssetType:['Large','Mid','Small','Value','Blend','Growth','Sector/Specialty']},
															  {name:"International Stock", subAssetType:['International','Global']},
															  {name:"U.S.Bond"},
															  {name:"International Bond", subAssetType:['All']},
															  {name:"Balanced", subAssetType:['Traditional','Target Risk','Target Date','Managed Payout']},
															  {name:"Money Market", subAssetType:['Taxable','National','State']}];
							
							subAssetService.setSubAssetClass = function(assetClass,productType){
							var subAssetClass = subAssetService.SubAssetClass ;
								subAssetService.sacIndex = -1;
								for(var i=0 ; assetClass && subAssetClass.length ;i++){
									if(assetClass.name === subAssetClass[i].name)
										{
										   if(assetClass.name === 'U.S.Bond') {
										   		if(productType ==='etf'){
										   			subAssetClass[i].subAssetType =['Short','Intermediate','Long','Treasury/Agency','Investment grade'];
										   		}
										   		else{
										   			subAssetClass[i].subAssetType =['Short','Intermediate','Long','Treasury/Agency','Investment grade','Below Investment Grade','Municipal'];
										   		} 
										   }
										   subAssetService.sacIndex = i;
										   break;
										 }
								}
							}
							subAssetService.getSubAssetClass = function(){ 
							   if(subAssetService.sacIndex >= 0){
							   		return subAssetService.SubAssetClass[subAssetService.sacIndex].subAssetType;
							  	}
							  	else{
							  		return null;
							  	}
							}
							return subAssetService;
				 }).directive('uiHoverintentIn', ['$timeout', function ($timeout) {
						return {
					            restrict: 'A',
					            link: function (scope, element, attributes) {
					                var hoverIntentPromise;
					                element.bind('mouseover', triggerDelayedEvent);
					                element.bind('mouseleave', cancelDelayedEvent);
					                 
					                /*** Triggers the eventHandler after the specified delay, or the default delay.   
					                 * Cancels the existing pending trigger (if any).
					                 */
					                function triggerDelayedEvent(event) {
					                    cancelDelayedEvent();
					                    var delay = scope.$eval(attributes.uiHoverintentDelay);
					                    if (delay === undefined) {
					                        delay = 300;
					                    }
					                    hoverIntentPromise = $timeout(function () {
					                        scope.$eval(attributes.uiHoverintentIn, {
					                            $event: event
					                        });
					                    }, delay);
					                } /*** Cancels the triggering the event.         */
					                function cancelDelayedEvent() {
					                    $timeout.cancel(hoverIntentPromise);
					                }
					            }
					        };
					    }
					]).directive('uiHoverintentOut', ['$timeout', function ($timeout) {
						return {
					            restrict: 'A',
					            link: function (scope, element, attributes) {
					                var hoverIntentPromise;
					                element.bind('mouseover', cancelDelayedEvent);
					                element.bind('mouseleave', triggerDelayedEvent);
					                 
					                /*** Triggers the eventHandler after the specified delay, or the default delay.   
					                 * Cancels the existing pending trigger (if any).
					                 */
					                function triggerDelayedEvent(event) {
					                    cancelDelayedEvent();
					                    var delay = scope.$eval(attributes.uiHoverintentDelay);
					                    if (delay === undefined) {
					                        delay = 300;
					                    }
					                    hoverIntentPromise = $timeout(function () {
					                        scope.$eval(attributes.uiHoverintentOut, {
					                            $event: event
					                        });
					                    }, delay);
					                } /*** Cancels the triggering the event.         */
					                function cancelDelayedEvent() {
					                    $timeout.cancel(hoverIntentPromise);
					                }
					            }
					        };
					    }
					]);
  
	var fundListToReturn;	
 	filterFund = function (fund) {
						try {
							if(isInShareClassProgression(fund) && subAssetClassDef.rule(fund)) {
								if(fund.profile.cusip=='921939609')
								{return false;}
								return true;
							}	
						} catch(e) {} 
						return false;
					}
 	
	function getAssetAndSubAssetClassification(fundId){

		var assetClass = "US_STOCK";
		var subAssetClass = "US_STOCK_LARGE";

		var product = getProductOnFundId(fundId);
		var key = getSubAssetClassificationCode(product);
		
		if(AssetClassification.US_STOCK.rule(product)){
			assetClass = "US_STOCK";
		} else if(AssetClassification.INT_STOCK.rule(product)){
			assetClass = "INT_STOCK";
		} else if(AssetClassification.SECTOR_SPECIALTY.rule(product)){
			assetClass = "SECTOR_SPECIALTY";
		} else if(AssetClassification.US_BOND.rule(product)){
			assetClass = "US_BOND";
		} else if(AssetClassification.INT_BOND.rule(product)){
			assetClass = "INT_BOND";
		} else if(AssetClassification.BALANCED.rule(product)){
			assetClass = "BALANCED";
		} else if(AssetClassification.MONEY_MARKET.rule(product)){
			assetClass = "MONEY_MARKET";
		} else if(AssetClassification.INSURANCE.rule(product)){
			assetClass = "INSURANCE";
		}

		if(key == "US_STOCK_VALUE"){
			subAssetClass = "Value";
		} else if(key == "US_STOCK_MID"){
			subAssetClass = "Mid";
		} else if(key == "US_STOCK_BLEND"){
			subAssetClass = "Blend";
		} else if(key == "US_STOCK_LARGE"){
			subAssetClass = "Large";
		} else if(key == "US_STOCK_SMALL"){
			subAssetClass = "Small";
		} else if(key == "US_STOCK_GROWTH"){
			subAssetClass = "Growth";
		} else if(assetClass == "SECTOR_SPECIALTY"){
			assetClass = "US_STOCK";
			subAssetClass = "Sector/Specialty";
		} else if(key == "INTL_STOCK_INTERNATIONAL"){
			subAssetClass = "International";
		} else if(key == "INTL_STOCK_GLOBAL"){
			subAssetClass = "Global";
		} else if(key == "US_BOND_INV_GRADE"){
			subAssetClass = "Investment grade";
		} else if(key == "US_BOND_TRSRY_AGENCY"){
			subAssetClass = "Treasury/Agency";
		} else if(key == "US_BOND_BELOW_INV_GRADE"){
			subAssetClass = "Below Investment Grade";
		} else if(key == "US_BOND_NATIONAL_MUNI"){
			subAssetClass = "Municipal";
		} else if(key == "US_BOND_STATE_MUNI"){
			subAssetClass = "Municipal";
		} else if(key == "US_BOND_MUNICIPAL"){
			subAssetClass = "Municipal";
		} else if(key == "US_BOND_SHORT"){
			subAssetClass = "Short";
		} else if(key == "US_BOND_INTERMEDIATE"){
			subAssetClass = "Intermediate";
		} else if(key == "US_BOND_LONG"){
			subAssetClass = "Long";
		} else if(assetClass == "INT_BOND"){
			subAssetClass = "All";
		} else if(key == "BALANCED_TRADITIONAL"){
			subAssetClass = "Traditional";
		} else if(key == "BALANCED_TARGET_RISK"){
			subAssetClass = "Target Risk";
		} else if(key == "BALANCED_TARGET_DATE"){
			subAssetClass = "Target Date";
		} else if(key == "BALANCED_MANAGED_PAYOUT"){
			subAssetClass = "Managed Payout";
		} else if(key == "MONEY_MARKET_TAXABLE"){
			subAssetClass = "Taxable";
		} else if(key == "MONEY_MARKET_NATIONAL_MUNI"){
			subAssetClass = "National";
		} else if(key == "MONEY_MARKET_STATE_MUNI"){
			subAssetClass = "State";
		}
		
		return [assetClass, subAssetClass];
	}
	
	function getProductOnFundId(fundId){
		var funds = angular.element(document.getElementById("FlyoutController")).scope().allFunds;
		var i = funds.fund.length - 1;
		var poid = -1;
		
		while(i > -1){
			if(funds.fund[i].profile.portId === fundId)
			{
				poid = i;
				break;
			}
			i--;
		}
		return funds.fund[poid];
	}
					
	function isInShareClassProgression(product) {
		var shareClass = product.profile.shareClass,
			 relatedShareClasses = product.profile.relatedShareClasses,
			 pattern = [],
			 regex;
	
		if (shareClass == 'VIPER' || shareClass == 'ADMIRAL') {
			return true;
		} 
		
		var length = (relatedShareClasses && relatedShareClasses.fundKey) ? (relatedShareClasses.fundKey.length ? relatedShareClasses.fundKey.length : 0 ) : 0;
		if (length == 0) {
			return true;
		}
	
		for (var i = 0; i < length; i++) {
			var fundKeyPattern = relatedShareClasses.fundKey[i].pattern ? relatedShareClasses.fundKey[i].pattern : '';
			if(fundKeyPattern == 'IIP' || fundKeyPattern == '') {
				pattern.push(relatedShareClasses.fundKey[i].shareClass);
			}
		}	
		if (pattern.length == 0) {
			return true;
		}
		regex = createFilterRegEx(pattern);
		
		if (shareClass == 'SIGNAL' && (!regex.test('ADMIRAL'))) {
			return true;
		}
		
		if (shareClass == 'INVESTOR' && (!regex.test('ADMIRAL')  && !regex.test('SIGNAL'))) {
			return true;
		}
		
		if (shareClass == 'INSTL' && (!regex.test('INVESTOR') && !regex.test('ADMIRAL') && !regex.test('SIGNAL'))) {
			return true;
		}
		
		if (shareClass == 'INSTLPLS' && (!regex.test('INVESTOR') && !regex.test('ADMIRAL') && !regex.test('INSTL') && !regex.test('SIGNAL'))) {
			return true;
		}
		return false;
	}
})(angular);

function jsOnEnterSearchTickerSmall(e,obj, label, tableLoadQuery) {
	var element = document.getElementById("autoSuggestErrorBoxSmall");
	element.className = element.className.replace(/(?:^|\s)errorBox(?!\S)/g,"");
		if(label == this.defaultText){
			this.viewNode.value = this.defaultText;
		}
		else if(obj && label !== "INVALID"){
			jsCBDremoveValidator("fasSearchFormSmall:tickerSearchInputSmall", "jsTickerValidate");
			jsCBDLogWebUsageEvent('FlyoutSelection',obj.value);
			var val = this.highlightedNodes[0].getAttribute("value");
			if(val.indexOf("javascript") > -1){
				eval(val.replace("javascript:",""));
			}
			else
			{
				jsCBDgoToUrl('/VGApp/iip/site/advisor/fund/'+arguments[2]);
			}
		}
		else if(tableLoadQuery.toUpperCase() == "VVIF"){
			if(window.event.keyCode == 13){
				jsCBDgoToUrl("/VGApp/iip/site/advisor/investments/aggregateviews?productType=product_if");
			}
		}
		else{
			this.viewNode.value = tableLoadQuery;
		}
		
}

function jsOnEnterSearchTickerKeyDownSmall(e,obj) {
	var element = document.getElementById("autoSuggestErrorBoxSmall");
	element.className = element.className.replace(/(?:^|\s)errorBox(?!\S)/g,"");
	if(window.event.keyCode == 13){
		var input = trim(document.getElementById("fasSearchFormSmall:tickerSearchInputSmall").value);
		if(isEmpty(input)){
			//error handling goes here
			element.className += " errorBox"
		} else {
			if(input.toUpperCase() == "VVIF"){
				jsCBDgoToUrl("/VGApp/iip/site/advisor/investments/aggregateviews?productType=product_if");
			}
			else if(jsTickerValidator(input)){ //new ticker validator goes here
				jsCBDLogWebUsageEvent('homeProductSearchTicker',input);
				jsCBDgoToUrl('/VGApp/iip/site/advisor/fund/'+input);
			}
			else{
				//run name validator (automatically sends on successful find
				jsNameValidator(input)
				//must be in error, open error stuff
				element.className += " errorBox"
			}
		}
	}
}

function jsOnEnterSearchTicker(e,obj, label, tableLoadQuery) {
	var element = document.getElementById("autoSuggestErrorBox");
	element.className = element.className.replace(/(?:^|\s)errorBox(?!\S)/g,"");
		if(label == this.defaultText){
			this.viewNode.value = this.defaultText;
		}
		else if(obj && label !== "INVALID"){
			jsCBDremoveValidator("fasSearchForm:tickerSearchInput", "jsTickerValidate");
			jsCBDLogWebUsageEvent('FlyoutSelection',tableLoadQuery);
			var val = this.highlightedNodes[0].getAttribute("value");
			if(val.indexOf("javascript") > -1){
				eval(val.replace("javascript:",""));
			}
			else
			{
				jsCBDgoToUrl('/VGApp/iip/site/advisor/fund/'+arguments[2]);
			}
		}
		else if(tableLoadQuery.toUpperCase() == "VVIF"){
			if(window.event.keyCode == 13){
				jsCBDgoToUrl("/VGApp/iip/site/advisor/investments/aggregateviews?productType=product_if");
			}
		}
		else{
			this.viewNode.value = tableLoadQuery;
		}
		
}

function jsOnEnterSearchTickerKeyDown(e,obj) {
	var element = document.getElementById("autoSuggestErrorBox");
	element.className = element.className.replace(/(?:^|\s)errorBox(?!\S)/g,"");
	if(window.event.keyCode == 13){
		var input = trim(document.getElementById("fasSearchForm:tickerSearchInput").value);
		if(isEmpty(input)){
			//error handling goes here
			element.className += " errorBox"
		} else {
			if(input.toUpperCase() == "VVIF"){
				jsCBDgoToUrl("/VGApp/iip/site/advisor/investments/aggregateviews?productType=product_if");
			}
			else if(jsTickerValidator(input)){ //new ticker validator goes here
				jsCBDLogWebUsageEvent('homeProductSearchTicker',input);
				jsCBDgoToUrl('/VGApp/iip/site/advisor/fund/'+input);
			}
			else{
				//run name validator (automatically sends on successful find
				jsNameValidator(input)
				//must be in error, open error stuff
				element.className += " errorBox"
			}
		}
	}
}



function jsTickerValidator(ticker){
	var funds = angular.element(document.getElementById("FlyoutController")).scope().allFunds;
	var i = funds.fund.length - 1;
	var upTicker = ticker.toUpperCase();
	while(i > -1){
		if(funds.fund[i].profile.ticker === upTicker)
		{
			return true;
		}
		i--;
	}
	return false;
}

function jsNameValidator(name){
	var funds = angular.element(document.getElementById("FlyoutController")).scope().allFunds;
	var i = funds.fund.length - 1;
	var upName = name.toUpperCase();
	while(i > -1){
		var fundName = funds.fund[i].profile.longNm.toUpperCase();
		if(fundName === upName)
		{
			jsCBDgoToUrl('/VGApp/iip/site/advisor/fund/'+funds.fund[i].profile.ticker);
		}
		else if(fundName.replace("VANGUARD","").trim() === upName)
		{
			jsCBDgoToUrl('/VGApp/iip/site/advisor/fund/'+funds.fund[i].profile.ticker);
		}
		else if(fundName.replace("VANGUARD","").replace("SHARES","").trim() === upName)
		{
			jsCBDgoToUrl('/VGApp/iip/site/advisor/fund/'+funds.fund[i].profile.ticker);
		}
		i--;
	}
	return false;
}

$(function(){
	/* Vanguard products ----> ETF's, Mutual Funds, All */
	var currentBtnCss = {
			backgroundColor : '#96151D',
			color 			: '#FFF'
		},
		 
		otherBtnCss = {
		    backgroundColor : '#F1F0EC',
			color 			: 'black'
		},
		
		flyout = function(buttonClass) {
			var $productSelected = $(buttonClass);
				$productSelected.css(currentBtnCss);
				$productSelected.siblings('div').css(otherBtnCss);
		};
		   
	$('.etfBtn').click(function(){
		flyout('.etfBtn');
	}); 
	
	$('.mutualBtn').click(function(){
		flyout('.mutualBtn');
	}); 
	
	$('.AllBtn').click(function(){
		flyout('.AllBtn');
	}); 
	
});

function reloadTheFlyout(){
	angular.element(document.getElementById("FlyoutController")).scope().showHomeFlyOutData("true");
}

var myflag = false;
var clickFlag = false;


function jsFASopenPersistentLayer(id,link)
  {	
	if(!jsCBDisLayerOpen(id)){
		angular.element(document.getElementById("FlyoutController")).scope().showHomeFlyOutData("true");
		jsCBDopenLayer(id);		
		vg.html.openDisableDiv('productDetailScrim');
		vg.html.openDisableDiv('shareClassesScrim');
		setTimeout('elementFocus()', 300);
		jsFASOpenMouseLeave(id,link);
	}
	else{
		jsCBDcloseLayer(id);
    	vg.html.closeAllDisableDivs();
	}
	jsTouchEventsPersistence(id,link);
  }

$("html").click(function(e){    
    	if(jsCBDisLayerOpen("fasCustomPersistLayer")){
    		if(e.target.id !== "fasCustomPersistLayer" && !$(e.target).parents("#fasCustomPersistLayer").size() && e.target.id !== "BrowseOurProductsButtonInput"){
    			jsCBDcloseLayer("fasCustomPersistLayer");
    	    	vg.html.closeAllDisableDivs();
    		}
        }    
});
	 
  function elementFocus(){
      var li = $(".fundsListBlock li.highlightFund");
      var div = $(".fundsListBlock"); 
      	      if(li.offset() !=null && li.offset().top > 480){	    	 
	      div.animate({
	          scrollTop : li.offset().top - div.offset().top + div.scrollTop()
	      });
	      }  
  };       
  
  function jsFASOpenMouseLeave(id,link){
           $("#fasCustomPersistLayer").mouseleave(function(){         
               vg.ElementPersistance.mouseLinkEnter(id, link, 'fixedbottom' );
           });
  }
	  
 function jsTouchEventsPersistence(id,link){
	 var didTouchMoveHappen= false;
	  document.body.addEventListener('touchmove',function(e){
		  didTouchMoveHappen = true; 
		  if(jsCBDisLayerOpen(id)){
			  vg.html.openDisableDiv('productDetailScrim');
	          vg.html.openDisableDiv('shareClassesScrim'); 
	          vg.ElementPersistance.mouseLinkEnter(id, link, 'bottomRight' );
		  }
		  else{
			  vg.html.closeAllDisableDivs();
		  }
		  e.stopPropagation();
      });
	  
	  document.body.addEventListener('touchend',function(e){
		  if(!didTouchMoveHappen){
			  if(jsCBDisLayerOpen(id)){
				  if(e.target.id !== "fasCustomPersistLayer" && !$(e.target).parents("#fasCustomPersistLayer").size() && e.target.id !== "BrowseOurProductsButtonInput"){
					  jsCBDcloseLayer("fasCustomPersistLayer");
					  vg.html.closeAllDisableDivs();
				  }
			  }
		  }
		  else{
			  didTouchMoveHappen=false;
		  }
		  e.stopPropagation();
      });
 }
  