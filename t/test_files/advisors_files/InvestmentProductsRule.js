/**
 * Implementation strategy to mimic that of server-side IWEFundClassification scheme for client-side
 * sorting/grouping by asset classification. Each object has a code, description, hasChildren indicator,
 * and a boolean function to determine if a fund is a type of this classification based on the business rules.
 */
var AssetClassification = {
	'US_STOCK' : {
		code: 100,
		description: function (){
			return getHeaderContent("US_STOCK_HEAD", 'US Stock');
		},
		hasChildren: true,
		rule: function(product) {
			var classification = product.profile.industryClassification.subClassification[0].code;
			var midClass = product.profile.industryClassification.subClassification[1].code;
			var equityStyleBoxCode = product.profile.equity9StyleBbox.code;
			return (!AssetClassification.INSURANCE.rule(product) && classification == "00000001" && midClass == "00000002" && equityStyleBoxCode != 'NOTAPPL');
		}
	},
	'INT_STOCK' : {
		code: 200,
		description: function (){
			return getHeaderContent("INT_STOCK_HEAD", 'International Stock');
		},
		hasChildren: true,
		rule: function(product) {
			var classification = product.profile.industryClassification.subClassification[0].code;
			var midClass = product.profile.industryClassification.subClassification[1].code;
			return (!AssetClassification.INSURANCE.rule(product) && classification == "00000001" && midClass == "00000013");
		}
	},
	'SECTOR_SPECIALTY' : {
		code: 300,
		description: function (){
			return getHeaderContent("SECTOR_HEAD", 'Sector/Specialty');
		},
		hasChildren: false,
		rule: function(product) {
			var classification = product.profile.industryClassification.subClassification[0].code;
			var midClass = product.profile.industryClassification.subClassification[1].code;
			return (!AssetClassification.INSURANCE.rule(product) && classification == "00000001" && !(AssetClassification.US_STOCK.rule(product) || AssetClassification.INT_STOCK.rule(product)));
		}
	},
	'US_BOND' : {
		code: 400,
		description: function (){
			return getHeaderContent("US_BOND_HEAD", 'US Bond');
		},
		hasChildren: true,
		rule: function(product) {
			var classification = product.profile.industryClassification.subClassification[0].code;
			var isGlbBnd = product.profile.isGlbBnd;
			return (!AssetClassification.INSURANCE.rule(product) && classification == "00000029" && !isGlbBnd);
		}
	},
	'INT_BOND' : {
		code: 500,
		description: function (){
			return getHeaderContent("INT_BOND_HEAD", 'International Bond');
		},
		hasChildren: false,
		rule: function(product) {
			var classification = product.profile.industryClassification.subClassification[0].code;
			var isGlbBnd = product.profile.isGlbBnd;
			return (!AssetClassification.INSURANCE.rule(product) && classification == "00000029" && isGlbBnd);
		}
	},
	'BALANCED' : {
		code: 600,
		description: function (){
			return getHeaderContent("BALANCED_HEAD", 'Balanced');
		},
		hasChildren: true,
		rule: function(product) {
			var classification = product.profile.industryClassification.subClassification[0].code;
			return (!AssetClassification.INSURANCE.rule(product) && classification == "00000025");
		}
	},
	'MONEY_MARKET' : {
		code: 700,
		description: function (){
			return getHeaderContent("MONEY_MARKET_HEAD", 'Money Market');
		},
		hasChildren: true,
		rule: function(product) {
			var classification = product.profile.industryClassification.subClassification[0].code;
			return (!AssetClassification.INSURANCE.rule(product) && classification == "00000046");
		}
	},
	'INSURANCE' : {
		code: 800,
		description: function (){
			return getHeaderContent("INSURANCE_HEAD", 'Insurance');
		},
		hasChildren: false,
		rule: function(product) {
			var classification = product.profile.issueType.subType[1].code;
			return (classification == "110");
		}
	},
	'OTHER' : {
		code: 1000,
		description: 'Other',
		hasChildren: false,
		rule: function(product) {
			return false;
		}
	}
};


/**
 * Implementation strategy to mimic that of server-side IWEFundClassification scheme for client-side
 * sorting/grouping by sub-asset classification. Each object has a code, description and a boolean
 * function to determine if a fund is a type of this classification based on the business rules.
 */
var SubAssetClassification = {
	'US_STOCK_LARGE' : {
		code: 110,
		description: function (){
			return getHeaderContent("US_STOCK_LARGE_HEAD", 'Large-cap');
		},
		rule: function(product) {
			var classification = product.profile.industryClassification.subClassification[2].code;
			var equityStyleBoxType = product.profile.equity9StyleBbox.code;
			var allowedClass = createFilterRegEx(["00000003","00000004","00000005"]);
			var allowedStyleBoxes = createFilterRegEx(["7","8","9"]);
			return (AssetClassification.US_STOCK.rule(product) && (allowedClass.test(classification) || allowedStyleBoxes.test(equityStyleBoxType)));
		}
	},
	'US_STOCK_MID' : {
		code: 120,
		description: function (){
			return getHeaderContent("US_STOCK_MID_HEAD", 'Mid-cap');
		},
		rule: function(product) {
			var classification = product.profile.industryClassification.subClassification[2].code;
			var equityStyleBoxType = product.profile.equity9StyleBbox.code;
			var allowedClass = createFilterRegEx(["00000006","00000007","00000008"]);
			var allowedStyleBoxes = createFilterRegEx(["4","5","6"]);
			return (AssetClassification.US_STOCK.rule(product) && (allowedClass.test(classification) || allowedStyleBoxes.test(equityStyleBoxType)));
		}
	},
	'US_STOCK_SMALL' : {
		code: 130,
		description: function (){
			return getHeaderContent("US_STOCK_SMALL_HEAD", 'Small-cap');
		},
		rule: function(product) {
			var classification = product.profile.industryClassification.subClassification[2].code;
			var equityStyleBoxType = product.profile.equity9StyleBbox.code;
			var allowedClass = createFilterRegEx(["00000009","00000010","00000011"]);
			var allowedStyleBoxes = createFilterRegEx(["1","2","3"]);
			return (AssetClassification.US_STOCK.rule(product) && (allowedClass.test(classification) || allowedStyleBoxes.test(equityStyleBoxType)));
		}
	},	
	'US_STOCK_VALUE' : {
		code: 140,
		description: function (){
			return getHeaderContent("US_STOCK_VALUE_HEAD", 'Value-style');
		},
		rule: function(product) {
			var classification = product.profile.industryClassification.subClassification[2].code;
			var equityStyleBoxType = product.profile.equity9StyleBbox.code;
			var allowedClass = createFilterRegEx(["00000005","00000008","00000011","00000066","00000069"]);
			var allowedStyleBoxes = createFilterRegEx(["1","4","7"]);
			return (AssetClassification.US_STOCK.rule(product) && (allowedClass.test(classification) || allowedStyleBoxes.test(equityStyleBoxType)));
		}
	},
	'US_STOCK_BLEND' : {
		code: 150,
		description: function (){
			return getHeaderContent("US_STOCK_BLEND_HEAD", 'Blend-style');
		},
		rule: function(product) {
			var classification = product.profile.industryClassification.subClassification[2].code;
			var equityStyleBoxType = product.profile.equity9StyleBbox.code;
			var allowedClass = createFilterRegEx(["00000004","00000007","00000010","00000067","00000014","00000015","00000017","00000018","00000099"]);
			var allowedStyleBoxes = createFilterRegEx(["2","5","8"]);
			return (AssetClassification.US_STOCK.rule(product) && (allowedClass.test(classification) || allowedStyleBoxes.test(equityStyleBoxType)));
		}
	},
	'US_STOCK_GROWTH' : {
		code: 150,
		description: function (){
			return getHeaderContent("US_STOCK_GROWTH_HEAD", 'Growth-style');
		},
		rule: function(product) {
			var classification = product.profile.industryClassification.subClassification[2].code;
			var equityStyleBoxType = product.profile.equity9StyleBbox.code;
			var allowedClass = createFilterRegEx(["00000003","00000006","00000009","00000068","00000070"]);
			var allowedStyleBoxes = createFilterRegEx(["3","6","9"]);
			return (AssetClassification.US_STOCK.rule(product) && (allowedClass.test(classification) || allowedStyleBoxes.test(equityStyleBoxType)));
		}
	},
	'INTL_STOCK_INTERNATIONAL' : {
		code: 210,
		description: function (){
			return getHeaderContent("INT_STOCK_INTERNATIONAL_HEAD", 'International');
		},
		rule: function(product) {
			var lowClass = product.profile.industryClassification.subClassification[2].code;
			var allowedLowClassRegex = createFilterRegEx(["00000018"]);
			return (AssetClassification.INT_STOCK.rule(product) && !allowedLowClassRegex.test(lowClass));
		}
	},
	'INTL_STOCK_GLOBAL' : {
		code: 220,
		description: function (){
			return getHeaderContent("INT_STOCK_GLOBAL_HEAD", 'Global');
		},
		rule: function(product) {
			//var isGlobal = product.profile.isGlobal;
			var lowClass = product.profile.industryClassification.subClassification[2].code;
			var allowedLowClassRegex = createFilterRegEx(["00000018"]);
			return (AssetClassification.INT_STOCK.rule(product) && allowedLowClassRegex.test(lowClass));
		}
	},	
	'SECTOR_SPECIALTY' : AssetClassification['SECTOR_SPECIALTY'],
	'US_BOND_TRSRY_AGENCY' : {
		code: 410,
		description: function (){
			return getHeaderContent("US_BOND_TRSRY_AGENCY_HEAD", 'Treasury/Agency');
		},
		rule: function(product) {
			var fixedIncomeStyleBox = product.profile.fixedIncome9StyleBox.code;
			var isGlbBnd = product.profile.isGlbBnd;
			var allowedStyleValues = createFilterRegEx(["7","8","9"]);
			var isNotTaxExempt = isNotTaxExemptBond(product);
			return (AssetClassification.US_BOND.rule(product) && (allowedStyleValues.test(fixedIncomeStyleBox) && !isGlbBnd && isNotTaxExempt));
		}
	},
	'US_BOND_INV_GRADE' : {
		code: 420,
		description: function (){
			return getHeaderContent("US_BOND_INV_GRADE_HEAD", 'Treasury/Agency');
		},
		rule: function(product) {
			var fixedIncomeStyleBox = product.profile.fixedIncome9StyleBox.code;
			var isGlbBnd = product.profile.isGlbBnd;
			var allowedStyleValues = createFilterRegEx(["4","5","6"]);
			var isNotTaxExempt = isNotTaxExemptBond(product);
			return (AssetClassification.US_BOND.rule(product) && (allowedStyleValues.test(fixedIncomeStyleBox) && !isGlbBnd && isNotTaxExempt));
		}
	},
	'US_BOND_BELOW_INV_GRADE' : {
		code: 430,
		description: function (){
			return getHeaderContent("US_BOND_BELOW_INV_GRADE_HEAD", 'Below investment grade');
		},
		rule: function(product) {
			var fixedIncomeStyleBox = product.profile.fixedIncome9StyleBox.code;
			var isGlbBnd = product.profile.isGlbBnd;
			var allowedStyleValues = createFilterRegEx(["1","2","3"]);
			var isNotTaxExempt = isNotTaxExemptBond(product);
			return (AssetClassification.US_BOND.rule(product) && (allowedStyleValues.test(fixedIncomeStyleBox) && !isGlbBnd && isNotTaxExempt));
		}
	},
	'US_BOND_NATIONAL_MUNI' : {
		code: 440,
		description: function (){
			return getHeaderContent("US_BOND_NATIONAL_MUNI_HEAD", 'National muni');
		},
		rule: function(product) {
			var classification = product.profile.industryClassification.subClassification[1].code;
			var lowClassification = product.profile.industryClassification.subClassification[2].code;
			var isNationalTaxExempt = product.profile.isNationalTaxExempt;
			var allowedClassificationValues = createFilterRegEx(["00000038"]);
			var allowedLowClassificationValues = createFilterRegEx(["00000040","00000042","00000039"]);
			return (AssetClassification.US_BOND.rule(product) && ((allowedClassificationValues.test(classification) && isNationalTaxExempt) || allowedLowClassificationValues.test(lowClassification)));
		}
	},
	'US_BOND_STATE_MUNI' : {
		code: 450,
		description: function (){
			return getHeaderContent("US_BOND_STATE_MUNI_HEAD", 'State muni');
		},
		rule: function(product) {
			var classification = product.profile.industryClassification.subClassification[1].code;
			var isNationalTaxExempt = product.profile.isNationalTaxExempt;
			var allowedClassificationValues = createFilterRegEx(["00000038"]);
			return (AssetClassification.US_BOND.rule(product) && (allowedClassificationValues.test(classification) && !isNationalTaxExempt));
		}
	},
	'US_BOND_MUNICIPAL' : {
		// state muni or national muni
		code: 460,
		description: function (){
			return getHeaderContent("US_BOND_MUNICIPAL_HEAD", 'municipal');
		},
		rule: function(product) {
			return SubAssetClassification['US_BOND_NATIONAL_MUNI'].rule(product) || SubAssetClassification['US_BOND_STATE_MUNI'].rule(product);
		}
	},
	'US_BOND_SHORT' : {
		code: 470,
		description: function (){
			return getHeaderContent("US_BOND_SHORT_HEAD", 'short duration');
		},
		rule: function(product) {
			var nineBoxStyle = product.profile.fixedIncome9StyleBox.code;
			var allowedNineBoxStyles = createFilterRegEx(["1","4","7"]);
			return (AssetClassification.US_BOND.rule(product) && allowedNineBoxStyles.test(nineBoxStyle));
		}
	},
	'US_BOND_INTERMEDIATE' : {
		code: 480,
		description: function (){
			return getHeaderContent("US_BOND_INTERMEDIATE_HEAD", 'intermediate duration');
		},
		rule: function(product) {
			var nineBoxStyle = product.profile.fixedIncome9StyleBox.code;
			var allowedNineBoxStyles = createFilterRegEx(["2","5","8"]);
			return (AssetClassification.US_BOND.rule(product) && allowedNineBoxStyles.test(nineBoxStyle));
		}
	},
	'US_BOND_LONG' : {
		code: 490,
		description: function (){
			return getHeaderContent("US_BOND_LONG_HEAD", 'long duration');
		},
		rule: function(product) {
			var nineBoxStyle = product.profile.fixedIncome9StyleBox.code;
			var allowedNineBoxStyles = createFilterRegEx(["3","6","9"]);
			return (AssetClassification.US_BOND.rule(product) && allowedNineBoxStyles.test(nineBoxStyle));
		}
	},
	'INT_BOND' : AssetClassification['INT_BOND'],
	'BALANCED_TRADITIONAL' : {
		code: 610,
		description: function (){
			return getHeaderContent("BALANCED_TRADITIONAL_HEAD", 'Traditional');
		},
		rule: function(product) {
			var isLifeStrategy = product.profile.isLifeStrategy;
			var isMangagedPayoutFund = product.profile.isManagedPayoutFund;
			var isTargetRetirement = product.profile.isTrgRt;
			
			
			var tickerName= product.profile.ticker.toUpperCase()+'';
			var targetTickerNames='VIRTX,VITVX,VITWX,VRIVX,VTTWX,VITFX,VIRSX,VITLX,VTRLX,VIVLX,VILVX,VITRX'+'';
			var flagCheck = targetTickerNames.indexOf(tickerName)>-1;
			var longNm=product.profile.longNm.toUpperCase();
			var checkForInstitutional=longNm.indexOf('INSTITUTIONAL TARGET RETIREMENT')>-1;
			return (AssetClassification.BALANCED.rule(product) && (!isLifeStrategy && !isMangagedPayoutFund && !isTargetRetirement && !flagCheck && !checkForInstitutional));
		}
	},
	'BALANCED_TARGET_RISK' : {
		code: 620,
		description: function (){
			return getHeaderContent("BALANCED_TARGET_RISK_HEAD", 'Target risk');
		},
		rule: function(product) {
			var isLifeStrategy = product.profile.isLifeStrategy;
			return (AssetClassification.BALANCED.rule(product) && isLifeStrategy);
		}
	},
	'BALANCED_TARGET_DATE' : {
		code: 630,
		description: function (){
			return getHeaderContent("BALANCED_TARGET_DATE_HEAD", 'Target date');
		},
		rule: function(product) {
			var isTargetRetirement = product.profile.isTrgRt;
			var tickerName= product.profile.ticker.toUpperCase()+'';
			var targetTickerNames='VIRTX,VITVX,VITWX,VRIVX,VTTWX,VITFX,VIRSX,VITLX,VTRLX,VIVLX,VILVX,VITRX'+'';
			var flagCheck = targetTickerNames.indexOf(tickerName)>-1;
			var longNm=product.profile.longNm.toUpperCase()+'';
			var checkForInstitutional=longNm.indexOf('INSTITUTIONAL TARGET RETIREMENT')>-1;
			return (AssetClassification.BALANCED.rule(product) && (isTargetRetirement || flagCheck ||checkForInstitutional));
		}
	},
	'BALANCED_MANAGED_PAYOUT' : {
		code: 640,
		description: function (){
			return getHeaderContent("BALANCED_MANAGED_PAYOUT_HEAD", 'Managed payout');
		},
		rule: function(product) {
			var isMangagedPayoutFund = product.profile.isManagedPayoutFund;
			return (AssetClassification.BALANCED.rule(product) && isMangagedPayoutFund);
		}
	},
	'MONEY_MARKET_TAXABLE' : {
		code: 710,
		description: function (){
			return getHeaderContent("MONEY_MARKET_TAXABLE_HEAD", 'Taxable');
		},
		rule: function(product) {
			var lowClassification = product.profile.industryClassification.subClassification[2].code;
			var allowedLowClassificationValues = createFilterRegEx(["00000048"]);
			return (AssetClassification.MONEY_MARKET.rule(product) && allowedLowClassificationValues.test(lowClassification));
		}
	},
	'MONEY_MARKET_NATIONAL_MUNI' : {
		code: 720,
		description: function (){
			return getHeaderContent("MONEY_MARKET_NATIONAL_MUNI_HEAD", 'National muni');
		},
		rule: function(product) {
			var lowClassification = product.profile.industryClassification.subClassification[2].code;
			var allowedLowClassificationValues = createFilterRegEx(["00000050"]);
			return (AssetClassification.MONEY_MARKET.rule(product) && allowedLowClassificationValues.test(lowClassification));
		}
	},
	'MONEY_MARKET_STATE_MUNI' : {
		code: 730,
		description: function (){
			return getHeaderContent("MONEY_MARKET_STATE_MUNI_HEAD", 'State muni');
		},
		rule: function(product) {
			var lowClassification = product.profile.industryClassification.subClassification[2].code;
			var allowedLowClassificationValues = createFilterRegEx(["00000051"]);
			return (AssetClassification.MONEY_MARKET.rule(product) && allowedLowClassificationValues.test(lowClassification));
		}
	},
	'INSURANCE' : AssetClassification['INSURANCE']
};


/**
 * Creates the regular expression of the pattern to test
 *
 * @param array of pattern objects
 */
function createFilterRegEx(pattern) {
	return new RegExp('(?:'+(pattern.join('|'))+')', 'i');
}

/**
 * Test if a product is not a tax-exmpt bond fund
 *
 * @param product - fund to test
 * @return boolean indicator of whether a fund is not a tax-exempt bond
 */
var isNotTaxExemptBond = function(product) {
	var midClass = product.profile.industryClassification.subClassification[1].code;
	var taxExemptClass = createFilterRegEx(["00000038"]);
	return !(taxExemptClass.test(midClass));
}


/**
 * Funtion to test the product against the SubAssetClassification objects
 * until a match is found. If no match is found, it returns the default
 * AssetClassification.OTHER type. (OTHER WILL NOT ACTUALLY BE USED FOR SUB-GROUPING)
 *
 * @param product - fund product to test against
 * @return the sub-asset classification object for the current fund product
 */
function getSubAssetClassificationCode(product) {
	var classObj;
	for (var key in SubAssetClassification) {
		classObj = SubAssetClassification[key];
		try {
			if (classObj.rule(product)) {
				return key;
			}
		} catch (e) {continue;}
	}
	throw "Unable to assign Sub Asset Classification";
}

