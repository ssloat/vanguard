
CommandLinkBar=function(cfg)
{
"use strict";
vg.util.attachJsonOptions(this, cfg);
this.base=vg.Controller;
var THIS=this;
this.base(THIS.clientId, null);
this.id=THIS.clientId;
this.isAjaxRequest=THIS.isAjaxRequest;
var controller=this;
vg.util.execOnPageReady(function(){controller.initCommandLinkBar();});
};
CommandLinkBar.prototype=
{
initCommandLinkBar:function()
{
"use strict";
var respConfig=this.respConfig;
if(respConfig)
{
this._initiateRespDropDownCommandLinkBar();
}
},
_initiateRespDropDownCommandLinkBar:function(){
"use strict";
var respConfigSml=this.respConfig.small,
respConfigMed=this.respConfig.medium,
viewNode, showAsDropDown, showAsDropdownSml,
showAsDropdownMed;
if(respConfigSml)
{
showAsDropdownSml=respConfigSml.showAsDropdown;
if(showAsDropdownSml)
{
showAsDropDown=showAsDropdownSml;
}
}
if(respConfigMed)
{
showAsDropdownMed=respConfigMed.showAsDropdown;
if(showAsDropdownMed)
{
showAsDropDown=showAsDropdownMed;
}
}
if(showAsDropDown )
{
viewNode=this.viewNode;
this.respDropdownLabel=vg.html.getElements(viewNode,{tagName:'span', attrName:'class', attrValue:'respCLBarDropdownLabel'})[0];
this.respMenu=vg.html.getElements(viewNode,{tagName:'span', attrName:'class', attrValue:'respCLBarMenu'})[0];
this.respMenuItems=vg.html.getElements(this.respMenu,{tagName:'span', attrName:'class', attrValue:'comp-CommandLink'});
this._createRespDropdownReferences();
this._addRespListenersForDropdown();
this._setRespWidth();
}
},
_createRespDropdownReferences:function()
{
"use strict";
this.dropdownOpen=false;
},
_updateRespDropdownLabel:function(e)
{
"use strict";
this._updateRespDropdownElement(e);
var showAsDropDown=this.hasShowAsDropDown();
if(showAsDropDown)
{
this._toggleRespDropdown();
}
},
_updateRespDropdownElement:function(e)
{
"use strict";
var selectedItem=e.currentTarget, innerText=selectedItem.innerText;
if(innerText)
{
this.respDropdownLabel.children[0].innerHTML=innerText;
}
else
{
this.respDropdownLabel.children[0].innerHTML=selectedItem.textContent;
}
},
hasShowAsDropDown:function()
{
"use strict";
var mediaQuerySize=cbdcommon.screen.getMediaQuerySize(), showAsDropDown=false;
var respConfigMediaQuerySize=this.respConfig[mediaQuerySize];
if(respConfigMediaQuerySize)
{
showAsDropDown=respConfigMediaQuerySize.showAsDropdown;
}
return showAsDropDown;
},
_addRespListenersForDropdown:function()
{
"use strict";
vg.html.addEventListenerMethod(this.respDropdownLabel, 'click', this, '_toggleRespDropdown');
if(!cbdcommon.screen.isMediaQuerySizeLarge())
{
this._addRespEventListenersForLinkBarItems();
}
vg.html.addEventListenerMethod(window, vg.event.BROWSER_RESIZE_END, this, '_handleResizeEnd',"_handleResizeEnd"+this.id);
},
_addRespEventListenersForLinkBarItems:function()
{
"use strict";
var respMenuItems=this.respMenuItems;
var respMenuItemsLength=this.respMenuItems.length,commandLinkfirstChild;
for(var i=0;i < respMenuItemsLength;i++){
commandLinkfirstChild=respMenuItems[i].children[0];
var hasdisabledStyle=vg.html.hasStyle('disabled-text',commandLinkfirstChild);
var currentElement=vg.html.getElements(commandLinkfirstChild,{attrName:'class', attrValue:'current'})[0];
var enabledItem=!(hasdisabledStyle&&!currentElement);
if(enabledItem)
{
vg.html.addEventListenerMethod(respMenuItems[i].firstChild, 'click', this, '_updateRespDropdownLabel',"_updateRespDropdownLabel"+i+this.id );
}
}
},
_removeRespEventListenersForLinkBarItems:function()
{
"use strict";
var respMenuItems=this.respMenuItems;
var respMenuItemsLength=this.respMenuItems.length;
for(var i=0;i < respMenuItemsLength;i++){
vg.html.removeEventListenerById(respMenuItems[i].firstChild, "_updateRespDropdownLabel"+i+this.id);
}
},
_toggleRespDropdown:function()
{
"use strict";
if(cbdcommon.screen.isMediaQuerySizeSmall()||cbdcommon.screen.isMediaQuerySizeMedium())
{
if(this.dropdownOpen)
{
this._closeRespDropdown();
}
else
{
this.respMenu.style.height="auto";
this._openRespDropdown();
}
this.dropdownOpen=!this.dropdownOpen;
}
},
_closeRespDropdown:function()
{
"use strict";
this._animateRespDropdown(vg.html.getObjHeight(this.respMenu), 0, 'close');
},
_handleResizeEnd:function(event)
{
"use strict";
if(!this.hasShowAsDropDown()&&this.dropdownOpen)
{
this._closeRespDropdown();
this.dropdownOpen=false;
vg.html.removeStyle("respMenuOpen", this.respMenu);
this.respMenu.style.borderBottom='0px';
}
this._setRespWidth();
this._updateRespLinkBarItemsListeners(event);
},
_updateRespLinkBarItemsListeners:function(event)
{
"use strict";
if(cbdcommon.screen.isMediaQuerySizeLarge())
{
this._removeRespEventListenersForLinkBarItems();
}
else
{
this._addRespEventListenersForLinkBarItems();
}
},
_setRespWidth:function()
{
"use strict";
var mediaQuerySize=cbdcommon.screen.getMediaQuerySize(), respConfigMediaQuerySize=this.respConfig[mediaQuerySize],
viewNodeStyle=this.viewNode.style;
if(respConfigMediaQuerySize&&respConfigMediaQuerySize.width)
{
viewNodeStyle.width=respConfigMediaQuerySize.width;
}
else
{
viewNodeStyle.width="";
}
},
_openRespDropdown:function()
{
"use strict";
var	respMenuHeight=vg.html.getObjHeight(this.respMenu),
fullDropdownHeight=respMenuHeight;
this._animateRespDropdown(0, fullDropdownHeight, 'open');
},
_animateRespDropdown:function(fromHeight, toHeight, mode)
{
"use strict";
var THIS=this, isLargeScreen=cbdcommon.screen.isMediaQuerySizeLarge(), easingMethod="eastBothStrong", attributes, afterAnim,
transDur=400;
if(!this.hasShowAsDropDown()&&this.dropdownOpen)
{
transDur=1;
}
if(mode==='open'&&!isLargeScreen)
{
this.respMenu.style.height=fromHeight;
vg.html.addStyle("respMenuOpen",this.respMenu);
}
attributes={height:{from:fromHeight, to:toHeight}};
afterAnim=function()
{
if(mode==='close'&&!isLargeScreen)
{
vg.html.removeStyle("respMenuOpen",THIS.respMenu);
THIS.respMenu.style.height="auto";
}
};
vg.smil.animateElement({target:this.respMenu, attr:attributes, duration:transDur, funcFinished:afterAnim, easeIn:true});
}
};
CommandLinkBar.setValue=function(id, value, runClick)
{
var controller=vg.comp.getController(id);
if(controller)
{
if(controller.respMenuItems){
controller.selectedLink=parseInt(value);
if(runClick){
controller.respMenuItems[parseInt(value)].getElementsByTagName("a")[0].click();
}
}
else
{
controller.selectedLink=parseInt(value);
if(runClick){
respMenuItems=vg.html.getElements(this.respMenu,{tagName:'span',attrName:'class',attrValue:'comp-CommandLink'});
respMenuItems[parseInt(value)].getElementsByTagName("a")[0].click();
}
}
}
};

