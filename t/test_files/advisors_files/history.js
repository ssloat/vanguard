
cbd.getYUI().use("history-hash", function(YUI){
cbd.history=
{
stateKeeper:new YUI.HistoryHash(),
data:{},
initData:{},
HISTORY:"hist",
title:{}
};
cbd.history.init=function(attribute, title, callback )
{
var history=cbd.history;
history.callback=callback;
var bookmarkedState=cbd.history.stateKeeper.get();
if(vg.util.isJSONEmpty(bookmarkedState) )
{
bookmarkedState=cbd.history.stateKeeper._initialState;
if(vg.util.isJSONEmpty(bookmarkedState) )
{
history._addData(attribute );
}
}
else
{
var oldState=history.stateKeeper.get(cbd.history.HISTORY);
if(oldState )
{
bookmarkedState=cbd.history._deserialize(oldState);
history.stateKeeper.replace(bookmarkedState,{merge:false});
}
history.data=vg.util.copyJsonOptions(bookmarkedState);
title=document.title;
}
history.initData=vg.util.copyJsonOptions(history.data);
history._callback({newVal:bookmarkedState, changed:bookmarkedState}, true);
history._storePageTitle(title );
}
cbd.history.add=function(attribute, value, title, callback )
{
var history=cbd.history;
history._addData(attribute, value );
if(callback )
{
if(!history.callbacks )
{
history.callbacks={};
}
history.callbacks[attribute]=callback;
}
history.executeHistoryNavigate(title);
}
cbd.history.addMany=function(nameValArr, title )
{
var history=cbd.history;
history._addData(nameValArr );
history.executeHistoryNavigate(title);
}
cbd.history.addModule=function(key, initValue, callback )
{
var history=cbd.history;
history.data[key]=initValue;
history.initData[key]=initValue;
if(!history.callbacks )
{
history.callbacks={};
}
history.callbacks[key]=callback;
}
cbd.history.executeHistoryNavigate=function(title)
{
cbd.history.stateKeeper.add(cbd.history.data,{merge:false});
cbd.history._storePageTitle(title );
jsCBDsetPageTitle(title, true);
}
cbd.history.remove=function(attribute )
{
delete cbd.history.data[attribute];
}
cbd.history.clear=function()
{
cbd.history.data={};
}
cbd.history.getHistoryFromUrl=function()
{
var bookmarkedState=cbd.history.stateKeeper.get();
if(vg.util.isJSONEmpty(bookmarkedState) )
{
bookmarkedState=cbd.history.stateKeeper._initialState;
if(vg.util.isJSONEmpty(bookmarkedState) )
{
return;
}
}
return bookmarkedState;
}
cbd.history._addData=function(attribute, value )
{
var name, val;
if(attribute instanceof Array)
{
for(var i=0;i < attribute.length;i++)
{
name=cbd.history._validate(attribute[i].name);
val=cbd.history._validate(attribute[i].value);
cbd.history.data[name]=val;
}
}
else if(attribute instanceof Object)
{
name=cbd.history._validate(attribute.name);
val=cbd.history._validate(attribute.value);
cbd.history.data[name]=val;
}
else if(attribute!==null )
{
name=cbd.history._validate(attribute);
val=cbd.history._validate(value);
cbd.history.data[name]=val;
}
}
cbd.history._callback=function(e, onLoad)
{
if(vg.util.isJSONEmpty(e.newVal) )
{
cbd.history.data=vg.util.copyJsonOptions(cbd.history.initData);
}
else
{
cbd.history.data=vg.util.copyJsonOptions(e.newVal);
}
if(cbd.history.callbacks )
{
var data=cbd.history.data;
for(var module in cbd.history.data )
{
if(data[module]!=e.prevVal[module])
{
cbd.history.callbacks[module](module, data[module],{newVal:data, prevVal:e.prevVal, changed:e.changed});
}
}
}
if(cbd.history.callback )
{
cbd.history.callback.call(this, cbd.history.data, onLoad);
}
cbd.history._setPageTitle();
}
cbd.history._storePageTitle=function(title)
{
var key=cbd.history._getKeyForTitle();
cbd.history.title[key]=title;
}
cbd.history._getKeyForTitle=function()
{
var keyPortions=[];
for(var value in cbd.history.data)
{
keyPortions.push(cbd.history.data[value]);
}
return keyPortions.join('_' );
}
cbd.history._setPageTitle=function()
{
var key=cbd.history._getKeyForTitle();
var title=cbd.history.title[key];
if(title!=null||title!==undefined)
{
jsCBDsetPageTitle(title, true);
}
}
cbd.history._validate=function(str)
{
str=str.toString();
return str.replace(/[^a-zA-Z0-9:_]*/g, "");
}
cbd.history._deserialize=function(data )
{
var items=data.split('::' );
var dataObj={};
for(var i in items )
{
var item=items[i];
var parts=item.split(':' );
var name=parts[0];
var val=parts[1];
dataObj[name]=val;
}
return dataObj;
}
cbd.history.init(null, document.title );
YUI.on('history:change',cbd.history._callback);
});

