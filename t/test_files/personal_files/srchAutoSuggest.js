//Handle selections from autosuggest fields.
//Submit search for natural language and redirect for profile pages.
function processAutoSuggest(value, label, id)
{
	// If value is "http" redirect to profile page
	if (value.substring(0,5) == "https")
	{
		jsCBDgoToUrl(value.substring(7, value.length));
		return false;
	}
	else
	{
		//Set value into autosuggest input.
		document.getElementById(id).value = value;
		
		// Check if this is the Search Results page.
		if (document.getElementById('autoSuggestForm:autoSuggestTop') != null )
		{
			// Set query value into the autoSuggestTop which will be used for the search.
			document.getElementById('autoSuggestForm:autoSuggestTop').value = document.getElementById(id).value;
		}
		
		// Submit the form.
		if (document.getElementById('autoSuggestForm') != null)
		{
			document.getElementById('autoSuggestForm').submit();
		}
	}
	return value;
}

//Submit the autosuggest forms for targetted searches.
function submitAutoSuggestForm()
{
	// Submit the form.
	if (document.getElementById('autoSuggestForm') != null)
	{
		query = document.getElementById('targetedQuery');
		if (query != null)
		{
			if (validateQuery(query.value))
			{
				document.getElementById('autoSuggestForm').submit();
			}
			else
			{
				return false;
			}
		}
		else{
			query = document.getElementById('autoSuggestForm:targetedQuery');
			if(query!=null)
			{
				if(validateQuery(query.value))
				{
					category = document.getElementById('autoSuggestForm:targetedCategory').value;
					url=jsCBDgetContextRoot()+"JSP/UtilityBar/Search/SearchGlobalContent.jsf"; 
					url=jsCBDaddQueryStringParam(url, "targetedQuery", encodeURIComponent(query.value)); 
					url=jsCBDaddQueryStringParam(url, "targetedCategory", category);
					jsCBDgoToUrl(url, null, true);										
				}
				else{
					return false;
				}
			}
		}
	}
}

function validateQuery(query)
{
	var preFillText = new Array("Enter name or symbol", "Search all funds", "Search our funds", "Enter title or phrase");
	var charPattern = /[\w]/g;
	var wildPattern = /[\*\?]/g;	
	var numChars;
	var numWildCards;
	
	query = trim(query);
	
	//If the query is the pre-filled text, don't submit.
	for (i = 0; i < preFillText.length; i++)
    {
        if (query.toLowerCase() == preFillText[i].toLowerCase()) return false;
    }
	
	numChars = numMatches(query, charPattern);
	numWildCards = numMatches(query, wildPattern);
	
	//Make sure that there is either a character or a wildcard.
	if (numChars > 0 || numWildCards > 0) return true;
	return false;
}

//Return the number of pattern matches in a query
function numMatches(string, regexPattern)
{
	var numMatches = 0;
	matchQuery = string.match(regexPattern);
	if (matchQuery != null)
	{
		numMatches = matchQuery.length;
	}
	return numMatches;
}

//Trim whitespace from the beginning and end of the string.
function trim(stringToTrim)
{
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

//Allow a user to hit <enter> to submit a query from either the global header or search box.
function handleELFTargettedEnter()
{
	var VGC_SEARCH_INPUT = "vgc-searchInput",
		NAV_BAR_SEARCH_INPUT = "navBarSearchInput";
	elementId = jsCBDonEnter.eventNode.getAttribute('id');
	if (elementId == "_cbdSearchBox")
	{
		//document.getElementById('searchForm').submit();
		document.getElementById(elementId).blur();
		document.getElementById('_cbdSearchButton').click();
	}
	else if (elementId == "targetedQuery")
	{
		//submitAutoSuggestForm();
		document.getElementById(elementId).blur();
		document.getElementById('elfSearchButton').click();
	}
	else if (elementId !== null && (elementId.indexOf(VGC_SEARCH_INPUT) > -1 || elementId.indexOf(NAV_BAR_SEARCH_INPUT) > -1))
	{
		document.getElementById(elementId).blur();
		document.getElementById(VGC_SEARCH_INPUT).click();
	}
	else
	{
		jsCBDgoToUrl('/us/LiteratureRequest?FW_Activity=ManageOrdersActivity&step=start');
	}
}


//Used specifically for the Forms Search on the ELF Overview, Results, Prospectus and Reports pages
function processLitAutoSuggest(value, label, id)
{
	// If value is "http" redirect to profile page
	if (value.substring(0,5) == "https")
	{
		jsCBDgoToUrl(value.substring(7, value.length));
		return false;
	}
	else
	{
		document.getElementById(id).value = value; 
		
		query = document.getElementById('autoSuggestForm:targetedQuery');
		if(query!=null)
		{
			if(validateQuery(query.value))
			{
				category = document.getElementById('autoSuggestForm:targetedCategory').value;
				url=jsCBDgetContextRoot()+"JSP/UtilityBar/Search/SearchGlobalContent.jsf"; 
				url=jsCBDaddQueryStringParam(url, "targetedQuery", query.value); 
				url=jsCBDaddQueryStringParam(url, "targetedCategory", category);
				jsCBDgoToUrl(url, null, true);
			}
			else{
				return false;
			}
		}
	}
	return value;
}

function buildELFSearchResults(data)
{
	var html ="",
		i,
		results = data.results,
		length = results.length,
		elem;
	
	html = "<table><tbody>";
	
	for(i=0; i<length; i++)
	{
		elem =  results[i];
		if (elem.type === 'term') {
			html += "<tr index=\""+i+"\"><td nowrap=\"nowrap\" align=\"left\" class=\"nowrap nr\" value=\""+elem.term+"\">"+elem.term+"</td></tr>";
		}
	}
	 return html += "</tbody></table>";
}


function redirectUserToLogon(){
	url = String(self.location);
	contextRoot = jsCBDgetContextRoot();
	if (url.indexOf(contextRoot + "literature") > -1) {
		url=contextRoot + "SecureLiteratureRequest";
	}
	else {
		url = url.replace(contextRoot + "litfulfillment/", contextRoot + "litfulfillmentsec/");
	}
	jsCBDgoToUrl(url, null, true);
}
