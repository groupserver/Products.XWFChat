/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/

/*
	This is a compiled version of Dojo, built for deployment and not for
	development. To get an editable version, please visit:

		http://dojotoolkit.org

	for documentation and information on getting the source.
*/

if(typeof dojo=="undefined"){
var dj_global=this;
var dj_currentContext=this;
function dj_undef(_1,_2){
return (typeof (_2||dj_currentContext)[_1]=="undefined");
}
if(dj_undef("djConfig",this)){
var djConfig={};
}
if(dj_undef("dojo",this)){
var dojo={};
}
dojo.global=function(){
return dj_currentContext;
};
dojo.locale=djConfig.locale;
dojo.version={major:0,minor:0,patch:0,flag:"dev",revision:Number("$Rev: 5297 $".match(/[0-9]+/)[0]),toString:function(){
with(dojo.version){
return major+"."+minor+"."+patch+flag+" ("+revision+")";
}
}};
dojo.evalProp=function(_3,_4,_5){
if((!_4)||(!_3)){
return undefined;
}
if(!dj_undef(_3,_4)){
return _4[_3];
}
return (_5?(_4[_3]={}):undefined);
};
dojo.parseObjPath=function(_6,_7,_8){
var _9=(_7||dojo.global());
var _a=_6.split(".");
var _b=_a.pop();
for(var i=0,l=_a.length;i<l&&_9;i++){
_9=dojo.evalProp(_a[i],_9,_8);
}
return {obj:_9,prop:_b};
};
dojo.evalObjPath=function(_d,_e){
if(typeof _d!="string"){
return dojo.global();
}
if(_d.indexOf(".")==-1){
return dojo.evalProp(_d,dojo.global(),_e);
}
var _f=dojo.parseObjPath(_d,dojo.global(),_e);
if(_f){
return dojo.evalProp(_f.prop,_f.obj,_e);
}
return null;
};
dojo.errorToString=function(_10){
if(!dj_undef("message",_10)){
return _10.message;
}else{
if(!dj_undef("description",_10)){
return _10.description;
}else{
return _10;
}
}
};
dojo.raise=function(_11,_12){
if(_12){
_11=_11+": "+dojo.errorToString(_12);
}
try{
dojo.hostenv.println("FATAL: "+_11);
}
catch(e){
}
throw Error(_11);
};
dojo.debug=function(){
};
dojo.debugShallow=function(obj){
};
dojo.profile={start:function(){
},end:function(){
},stop:function(){
},dump:function(){
}};
function dj_eval(_14){
return dj_global.eval?dj_global.eval(_14):eval(_14);
}
dojo.unimplemented=function(_15,_16){
var _17="'"+_15+"' not implemented";
if(_16!=null){
_17+=" "+_16;
}
dojo.raise(_17);
};
dojo.deprecated=function(_18,_19,_1a){
var _1b="DEPRECATED: "+_18;
if(_19){
_1b+=" "+_19;
}
if(_1a){
_1b+=" -- will be removed in version: "+_1a;
}
dojo.debug(_1b);
};
dojo.render=(function(){
function vscaffold(_1c,_1d){
var tmp={capable:false,support:{builtin:false,plugin:false},prefixes:_1c};
for(var i=0;i<_1d.length;i++){
tmp[_1d[i]]=false;
}
return tmp;
}
return {name:"",ver:dojo.version,os:{win:false,linux:false,osx:false},html:vscaffold(["html"],["ie","opera","khtml","safari","moz"]),svg:vscaffold(["svg"],["corel","adobe","batik"]),vml:vscaffold(["vml"],["ie"]),swf:vscaffold(["Swf","Flash","Mm"],["mm"]),swt:vscaffold(["Swt"],["ibm"])};
})();
dojo.hostenv=(function(){
var _20={isDebug:false,allowQueryConfig:false,baseScriptUri:"",baseRelativePath:"",libraryScriptUri:"",iePreventClobber:false,ieClobberMinimal:true,preventBackButtonFix:true,searchIds:[],parseWidgets:true};
if(typeof djConfig=="undefined"){
djConfig=_20;
}else{
for(var _21 in _20){
if(typeof djConfig[_21]=="undefined"){
djConfig[_21]=_20[_21];
}
}
}
return {name_:"(unset)",version_:"(unset)",getName:function(){
return this.name_;
},getVersion:function(){
return this.version_;
},getText:function(uri){
dojo.unimplemented("getText","uri="+uri);
}};
})();
dojo.hostenv.getBaseScriptUri=function(){
if(djConfig.baseScriptUri.length){
return djConfig.baseScriptUri;
}
var uri=new String(djConfig.libraryScriptUri||djConfig.baseRelativePath);
if(!uri){
dojo.raise("Nothing returned by getLibraryScriptUri(): "+uri);
}
var _24=uri.lastIndexOf("/");
djConfig.baseScriptUri=djConfig.baseRelativePath;
return djConfig.baseScriptUri;
};
(function(){
var _25={pkgFileName:"package",loading_modules_:{},loaded_modules_:{},addedToLoadingCount:[],removedFromLoadingCount:[],inFlightCount:0,modulePrefixes_:{dojo:{name:"dojo",value:"src"}},setModulePrefix:function(_26,_27){
this.modulePrefixes_[_26]={name:_26,value:_27};
},getModulePrefix:function(_28){
var mp=this.modulePrefixes_;
if((mp[_28])&&(mp[_28]["name"])){
return mp[_28].value;
}
return _28;
},getTextStack:[],loadUriStack:[],loadedUris:[],post_load_:false,modulesLoadedListeners:[],unloadListeners:[],loadNotifying:false};
for(var _2a in _25){
dojo.hostenv[_2a]=_25[_2a];
}
})();
dojo.hostenv.loadPath=function(_2b,_2c,cb){
var uri;
if((_2b.charAt(0)=="/")||(_2b.match(/^\w+:/))){
uri=_2b;
}else{
uri=this.getBaseScriptUri()+_2b;
}
if(djConfig.cacheBust&&dojo.render.html.capable){
uri+="?"+String(djConfig.cacheBust).replace(/\W+/g,"");
}
try{
return ((!_2c)?this.loadUri(uri,cb):this.loadUriAndCheck(uri,_2c,cb));
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.hostenv.loadUri=function(uri,cb){
if(this.loadedUris[uri]){
return 1;
}
var _31=this.getText(uri,null,true);
if(_31==null){
return 0;
}
this.loadedUris[uri]=true;
if(cb){
_31="("+_31+")";
}
var _32=dj_eval(_31);
if(cb){
cb(_32);
}
return 1;
};
dojo.hostenv.loadUriAndCheck=function(uri,_34,cb){
var ok=true;
try{
ok=this.loadUri(uri,cb);
}
catch(e){
dojo.debug("failed loading ",uri," with error: ",e);
}
return ((ok)&&(this.findModule(_34,false)))?true:false;
};
dojo.loaded=function(){
};
dojo.unloaded=function(){
};
dojo.hostenv.loaded=function(){
this.loadNotifying=true;
this.post_load_=true;
var mll=this.modulesLoadedListeners;
for(var x=0;x<mll.length;x++){
mll[x]();
}
this.modulesLoadedListeners=[];
this.loadNotifying=false;
dojo.loaded();
};
dojo.hostenv.unloaded=function(){
var mll=this.unloadListeners;
while(mll.length){
(mll.pop())();
}
dojo.unloaded();
};
dojo.addOnLoad=function(obj,_3b){
var dh=dojo.hostenv;
if(arguments.length==1){
dh.modulesLoadedListeners.push(obj);
}else{
if(arguments.length>1){
dh.modulesLoadedListeners.push(function(){
obj[_3b]();
});
}
}
if(dh.post_load_&&dh.inFlightCount==0&&!dh.loadNotifying){
dh.callLoaded();
}
};
dojo.addOnUnload=function(obj,_3e){
var dh=dojo.hostenv;
if(arguments.length==1){
dh.unloadListeners.push(obj);
}else{
if(arguments.length>1){
dh.unloadListeners.push(function(){
obj[_3e]();
});
}
}
};
dojo.hostenv.modulesLoaded=function(){
if(this.post_load_){
return;
}
if((this.loadUriStack.length==0)&&(this.getTextStack.length==0)){
if(this.inFlightCount>0){
dojo.debug("files still in flight!");
return;
}
dojo.hostenv.callLoaded();
}
};
dojo.hostenv.callLoaded=function(){
if(typeof setTimeout=="object"){
setTimeout("dojo.hostenv.loaded();",0);
}else{
dojo.hostenv.loaded();
}
};
dojo.hostenv.getModuleSymbols=function(_40){
var _41=_40.split(".");
for(var i=_41.length-1;i>0;i--){
var _43=_41.slice(0,i).join(".");
var _44=this.getModulePrefix(_43);
if(_44!=_43){
_41.splice(0,i,_44);
break;
}
}
return _41;
};
dojo._namespaces={};
(function(){
var _45={};
var _46={};
dojo.getNamespace=function(_47){
if(!dojo._namespaces[_47]&&!_46[_47]){
function inArray(arr,_49){
if(arr){
if(!(arr instanceof Array)){
arr=[arr];
}
for(var i=0;i<arr.length;i++){
if(arr[i]==_49){
return true;
}
}
}
}
if(inArray(djConfig.excludeNamespace,_47)){
return false;
}
var _4b=djConfig.includeNamespace;
if((_47!="dojo")&&_4b&&!inArray(_4b,_47)){
return false;
}
var req=dojo.require;
if(!_45[_47]){
_45[_47]=true;
if(_47=="dojo"){
dojo.require("dojo.namespaces.dojo");
}else{
var _4d=dojo.getNamespace("_dojoNamespaces");
_4d.load(_47,null,true);
}
_45[_47]=false;
if(!dojo._namespaces[_47]){
_46[_47]=true;
}
}
}
return dojo._namespaces[_47];
};
})();
dojo.hostenv._global_omit_module_check=false;
dojo.hostenv.loadModule=function(_4e,_4f,_50){
if(!_4e){
return;
}
_50=this._global_omit_module_check||_50;
var _51=this.findModule(_4e,false);
if(_51){
return _51;
}
if(dj_undef(_4e,this.loading_modules_)){
this.addedToLoadingCount.push(_4e);
}
this.loading_modules_[_4e]=1;
var _52=_4e.replace(/\./g,"/")+".js";
var _53=_4e.split(".");
dojo.getNamespace(_53[0]);
var _54=this.getModuleSymbols(_4e);
var _55=((_54[0].charAt(0)!="/")&&(!_54[0].match(/^\w+:/)));
var _56=_54[_54.length-1];
if(_56=="*"){
_4e=(_53.slice(0,-1)).join(".");
while(_54.length){
_54.pop();
_54.push(this.pkgFileName);
_52=_54.join("/")+".js";
if(_55&&(_52.charAt(0)=="/")){
_52=_52.slice(1);
}
ok=this.loadPath(_52,((!_50)?_4e:null));
if(ok){
break;
}
_54.pop();
}
}else{
_52=_54.join("/")+".js";
_4e=_53.join(".");
var ok=this.loadPath(_52,((!_50)?_4e:null));
if((!ok)&&(!_4f)){
_54.pop();
while(_54.length){
_52=_54.join("/")+".js";
ok=this.loadPath(_52,((!_50)?_4e:null));
if(ok){
break;
}
_54.pop();
_52=_54.join("/")+"/"+this.pkgFileName+".js";
if(_55&&(_52.charAt(0)=="/")){
_52=_52.slice(1);
}
ok=this.loadPath(_52,((!_50)?_4e:null));
if(ok){
break;
}
}
}
if((!ok)&&(!_50)){
dojo.raise("Could not load '"+_4e+"'; last tried '"+_52+"'");
}
}
if(!_50&&!this["isXDomain"]){
_51=this.findModule(_4e,false);
if(!_51){
dojo.raise("symbol '"+_4e+"' is not defined after loading '"+_52+"'");
}
}
return _51;
};
dojo.hostenv.startPackage=function(_58){
var _59=(new String(_58)).toString();
var _5a=_59;
var _5b=_58.split(/\./);
if(_5b[_5b.length-1]=="*"){
_5b.pop();
_5a=_5b.join(".");
}
var _5c=dojo.evalObjPath(_5a.toString(),true);
this.loaded_modules_[_59]=_5c;
this.loaded_modules_[_5a]=_5c;
return _5c;
};
dojo.hostenv.findModule=function(_5d,_5e){
var lmn=String(_5d).toString();
if(this.loaded_modules_[lmn]){
return this.loaded_modules_[lmn];
}
if(_5e){
dojo.raise("no loaded module named '"+_5d+"'");
}
return null;
};
dojo.kwCompoundRequire=function(_60){
var _61=_60["common"]||[];
var _62=(_60[dojo.hostenv.name_])?_61.concat(_60[dojo.hostenv.name_]||[]):_61.concat(_60["default"]||[]);
for(var x=0;x<_62.length;x++){
var _64=_62[x];
if(_64.constructor==Array){
dojo.hostenv.loadModule.apply(dojo.hostenv,_64);
}else{
dojo.hostenv.loadModule(_64);
}
}
};
dojo.require=function(){
dojo.hostenv.loadModule.apply(dojo.hostenv,arguments);
};
dojo.requireIf=function(){
if((arguments[0]===true)||(arguments[0]=="common")||(arguments[0]&&dojo.render[arguments[0]].capable)){
var _65=[];
for(var i=1;i<arguments.length;i++){
_65.push(arguments[i]);
}
dojo.require.apply(dojo,_65);
}
};
dojo.requireAfterIf=dojo.requireIf;
dojo.provide=function(){
return dojo.hostenv.startPackage.apply(dojo.hostenv,arguments);
};
dojo.registerModulePath=function(_67,_68){
return dojo.hostenv.setModulePrefix(_67,_68);
};
dojo.setModulePrefix=function(_69,_6a){
dojo.deprecated("dojo.setModulePrefix","replaced by dojo.registerModulePath","0.5");
return dojo.registerModulePath(_69,_6a);
};
dojo.exists=function(obj,_6c){
var p=_6c.split(".");
for(var i=0;i<p.length;i++){
if(!(obj[p[i]])){
return false;
}
obj=obj[p[i]];
}
return true;
};
}
if(typeof window=="undefined"){
dojo.raise("no window object");
}
(function(){
if(djConfig.allowQueryConfig){
var _6f=document.location.toString();
var _70=_6f.split("?",2);
if(_70.length>1){
var _71=_70[1];
var _72=_71.split("&");
for(var x in _72){
var sp=_72[x].split("=");
if((sp[0].length>9)&&(sp[0].substr(0,9)=="djConfig.")){
var opt=sp[0].substr(9);
try{
djConfig[opt]=eval(sp[1]);
}
catch(e){
djConfig[opt]=sp[1];
}
}
}
}
}
if(((djConfig["baseScriptUri"]=="")||(djConfig["baseRelativePath"]==""))&&(document&&document.getElementsByTagName)){
var _76=document.getElementsByTagName("script");
var _77=/(package|dojo|bootstrap1)\.js([\?\.]|$)/i;
for(var i=0;i<_76.length;i++){
var src=_76[i].getAttribute("src");
if(!src){
continue;
}
var m=src.match(_77);
if(m){
var _7b=src.substring(0,m.index);
if(src.indexOf("bootstrap1")>-1){
_7b+="../";
}
if(!this["djConfig"]){
djConfig={};
}
if(djConfig["baseScriptUri"]==""){
djConfig["baseScriptUri"]=_7b;
}
if(djConfig["baseRelativePath"]==""){
djConfig["baseRelativePath"]=_7b;
}
break;
}
}
}
var dr=dojo.render;
var drh=dojo.render.html;
var drs=dojo.render.svg;
var dua=(drh.UA=navigator.userAgent);
var dav=(drh.AV=navigator.appVersion);
var t=true;
var f=false;
drh.capable=t;
drh.support.builtin=t;
dr.ver=parseFloat(drh.AV);
dr.os.mac=dav.indexOf("Macintosh")>=0;
dr.os.win=dav.indexOf("Windows")>=0;
dr.os.linux=dav.indexOf("X11")>=0;
drh.opera=dua.indexOf("Opera")>=0;
drh.khtml=(dav.indexOf("Konqueror")>=0)||(dav.indexOf("Safari")>=0);
drh.safari=dav.indexOf("Safari")>=0;
var _83=dua.indexOf("Gecko");
drh.mozilla=drh.moz=(_83>=0)&&(!drh.khtml);
if(drh.mozilla){
drh.geckoVersion=dua.substring(_83+6,_83+14);
}
drh.ie=(document.all)&&(!drh.opera);
drh.ie50=drh.ie&&dav.indexOf("MSIE 5.0")>=0;
drh.ie55=drh.ie&&dav.indexOf("MSIE 5.5")>=0;
drh.ie60=drh.ie&&dav.indexOf("MSIE 6.0")>=0;
drh.ie70=drh.ie&&dav.indexOf("MSIE 7.0")>=0;
var cm=document["compatMode"];
drh.quirks=(cm=="BackCompat")||(cm=="QuirksMode")||drh.ie55||drh.ie50;
dojo.locale=dojo.locale||(drh.ie?navigator.userLanguage:navigator.language).toLowerCase();
dr.vml.capable=drh.ie;
drs.capable=f;
drs.support.plugin=f;
drs.support.builtin=f;
var _85=window["document"];
var tdi=_85["implementation"];
if((tdi)&&(tdi["hasFeature"])&&(tdi.hasFeature("org.w3c.dom.svg","1.0"))){
drs.capable=t;
drs.support.builtin=t;
drs.support.plugin=f;
}
if(drh.safari){
var tmp=dua.split("AppleWebKit/")[1];
var ver=parseFloat(tmp.split(" ")[0]);
if(ver>=420){
drs.capable=t;
drs.support.builtin=t;
drs.support.plugin=f;
}
}
})();
dojo.hostenv.startPackage("dojo.hostenv");
dojo.render.name=dojo.hostenv.name_="browser";
dojo.hostenv.searchIds=[];
dojo.hostenv._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];
dojo.hostenv.getXmlhttpObject=function(){
var _89=null;
var _8a=null;
try{
_89=new XMLHttpRequest();
}
catch(e){
}
if(!_89){
for(var i=0;i<3;++i){
var _8c=dojo.hostenv._XMLHTTP_PROGIDS[i];
try{
_89=new ActiveXObject(_8c);
}
catch(e){
_8a=e;
}
if(_89){
dojo.hostenv._XMLHTTP_PROGIDS=[_8c];
break;
}
}
}
if(!_89){
return dojo.raise("XMLHTTP not available",_8a);
}
return _89;
};
dojo.hostenv._blockAsync=false;
dojo.hostenv.getText=function(uri,_8e,_8f){
if(!_8e){
this._blockAsync=true;
}
var _90=this.getXmlhttpObject();
function isDocumentOk(_91){
var _92=_91["status"];
return Boolean((!_92)||((200<=_92)&&(300>_92))||(_92==304));
}
if(_8e){
var _93=this,timer=null,gbl=dojo.global();
var xhr=dojo.evalObjPath("dojo.io.XMLHTTPTransport");
_90.onreadystatechange=function(){
if(timer){
gbl.clearTimeout(timer);
timer=null;
}
if(_93._blockAsync||(xhr&&xhr._blockAsync)){
timer=gbl.setTimeout(function(){
_90.onreadystatechange.apply(this);
},10);
}else{
if(4==_90.readyState){
if(isDocumentOk(_90)){
_8e(_90.responseText);
}
}
}
};
}
_90.open("GET",uri,_8e?true:false);
try{
_90.send(null);
if(_8e){
return null;
}
if(!isDocumentOk(_90)){
var err=Error("Unable to load "+uri+" status:"+_90.status);
err.status=_90.status;
err.responseText=_90.responseText;
throw err;
}
}
catch(e){
this._blockAsync=false;
if((_8f)&&(!_8e)){
return null;
}else{
throw e;
}
}
this._blockAsync=false;
return _90.responseText;
};
dojo.hostenv.defaultDebugContainerId="dojoDebug";
dojo.hostenv._println_buffer=[];
dojo.hostenv._println_safe=false;
dojo.hostenv.println=function(_96){
if(!dojo.hostenv._println_safe){
dojo.hostenv._println_buffer.push(_96);
}else{
try{
var _97=document.getElementById(djConfig.debugContainerId?djConfig.debugContainerId:dojo.hostenv.defaultDebugContainerId);
if(!_97){
_97=dojo.body();
}
var div=document.createElement("div");
div.appendChild(document.createTextNode(_96));
_97.appendChild(div);
}
catch(e){
try{
document.write("<div>"+_96+"</div>");
}
catch(e2){
window.status=_96;
}
}
}
};
dojo.addOnLoad(function(){
dojo.hostenv._println_safe=true;
while(dojo.hostenv._println_buffer.length>0){
dojo.hostenv.println(dojo.hostenv._println_buffer.shift());
}
});
function dj_addNodeEvtHdlr(_99,_9a,fp,_9c){
var _9d=_99["on"+_9a]||function(){
};
_99["on"+_9a]=function(){
fp.apply(_99,arguments);
_9d.apply(_99,arguments);
};
return true;
}
dj_addNodeEvtHdlr(window,"load",function(){
if(arguments.callee.initialized){
return;
}
arguments.callee.initialized=true;
var _9e=function(){
if(dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
};
if(dojo.hostenv.inFlightCount==0){
_9e();
dojo.hostenv.modulesLoaded();
}else{
dojo.addOnLoad(_9e);
}
});
dj_addNodeEvtHdlr(window,"unload",function(){
dojo.hostenv.unloaded();
});
dojo.hostenv.makeWidgets=function(){
var _9f=[];
if(djConfig.searchIds&&djConfig.searchIds.length>0){
_9f=_9f.concat(djConfig.searchIds);
}
if(dojo.hostenv.searchIds&&dojo.hostenv.searchIds.length>0){
_9f=_9f.concat(dojo.hostenv.searchIds);
}
if((djConfig.parseWidgets)||(_9f.length>0)){
if(dojo.evalObjPath("dojo.widget.Parse")){
var _a0=new dojo.xml.Parse();
if(_9f.length>0){
for(var x=0;x<_9f.length;x++){
var _a2=document.getElementById(_9f[x]);
if(!_a2){
continue;
}
var _a3=_a0.parseElement(_a2,null,true);
dojo.widget.getParser().createComponents(_a3);
}
}else{
if(djConfig.parseWidgets){
var _a3=_a0.parseElement(dojo.body(),null,true);
dojo.widget.getParser().createComponents(_a3);
}
}
}
}
};
dojo.addOnLoad(function(){
if(!dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
});
try{
if(dojo.render.html.ie){
document.namespaces.add("v","urn:schemas-microsoft-com:vml");
document.createStyleSheet().addRule("v\\:*","behavior:url(#default#VML)");
}
}
catch(e){
}
dojo.hostenv.writeIncludes=function(){
};
if(!dj_undef("document",this)){
dj_currentDocument=this.document;
}
dojo.doc=function(){
return dj_currentDocument;
};
dojo.body=function(){
return dojo.doc().body||dojo.doc().getElementsByTagName("body")[0];
};
dojo.byId=function(id,doc){
if(id&&((typeof id=="string")||(id instanceof String))){
return (doc||dojo.doc()).getElementById(id);
}
return id;
};
dojo.setContext=function(_a6,_a7){
dj_currentContext=_a6;
dj_currentDocument=_a7;
};
dojo.withGlobal=function(_a8,_a9,_aa,_ab){
var _ac;
var _ad=dj_currentContext;
var _ae=dj_currentDocument;
try{
dojo.setContext(_a8,_a8.document);
if(_aa&&((typeof _a9=="string")||(_a9 instanceof String))){
_a9=_aa[_a9];
}
_ac=(_aa?_a9.apply(_aa,_ab):_a9());
}
finally{
dojo.setContext(_ad,_ae);
}
return _ac;
};
dojo.withDoc=function(_af,_b0,_b1,_b2){
var _b3;
var _b4=dj_currentDocument;
try{
dj_currentDocument=_af;
if(_b1&&((typeof _b0=="string")||(_b0 instanceof String))){
_b0=_b1[_b0];
}
_b3=(_b1?_b0.apply(_b1,_b2):_b0());
}
finally{
dj_currentDocument=_b4;
}
return _b3;
};
(function(){
if(typeof dj_usingBootstrap!="undefined"){
return;
}
var _b5=false;
var _b6=false;
var _b7=false;
if((typeof this["load"]=="function")&&((typeof this["Packages"]=="function")||(typeof this["Packages"]=="object"))){
_b5=true;
}else{
if(typeof this["load"]=="function"){
_b6=true;
}else{
if(window.widget){
_b7=true;
}
}
}
var _b8=[];
if((this["djConfig"])&&((djConfig["isDebug"])||(djConfig["debugAtAllCosts"]))){
_b8.push("debug.js");
}
if((this["djConfig"])&&(djConfig["debugAtAllCosts"])&&(!_b5)&&(!_b7)){
_b8.push("browser_debug.js");
}
if((this["djConfig"])&&(djConfig["compat"])){
_b8.push("compat/"+djConfig["compat"]+".js");
}
var _b9=djConfig["baseScriptUri"];
if((this["djConfig"])&&(djConfig["baseLoaderUri"])){
_b9=djConfig["baseLoaderUri"];
}
for(var x=0;x<_b8.length;x++){
var _bb=_b9+"src/"+_b8[x];
if(_b5||_b6){
load(_bb);
}else{
try{
document.write("<scr"+"ipt type='text/javascript' src='"+_bb+"'></scr"+"ipt>");
}
catch(e){
var _bc=document.createElement("script");
_bc.src=_bb;
document.getElementsByTagName("head")[0].appendChild(_bc);
}
}
}
})();
dojo.normalizeLocale=function(_bd){
return _bd?_bd.toLowerCase():dojo.locale;
};
dojo.searchLocalePath=function(_be,_bf,_c0){
_be=dojo.normalizeLocale(_be);
var _c1=_be.split("-");
var _c2=[];
for(var i=_c1.length;i>0;i--){
_c2.push(_c1.slice(0,i).join("-"));
}
_c2.push(false);
if(_bf){
_c2.reverse();
}
for(var j=_c2.length-1;j>=0;j--){
var loc=_c2[j]||"ROOT";
var _c6=_c0(loc);
if(_c6){
break;
}
}
};
dojo.requireLocalization=function(_c7,_c8,_c9){
var _ca=[_c7,"_nls",_c8].join(".");
var _cb=dojo.hostenv.startPackage(_ca);
dojo.hostenv.loaded_modules_[_ca]=_cb;
if(!dj_undef("dj_localesBuilt",dj_global)&&dojo.hostenv.loaded_modules_[_ca]){
_c9=dojo.normalizeLocale(_c9);
for(var i=0;i<dj_localesBuilt.length;i++){
if(dj_localesBuilt[i]==_c9){
return;
}
}
}
var _cd=dojo.hostenv.getModuleSymbols(_c7);
var _ce=_cd.concat("nls").join("/");
var _cf=false;
dojo.searchLocalePath(_c9,false,function(loc){
var pkg=_ca+"."+loc;
var _d2=false;
if(!dojo.hostenv.findModule(pkg)){
dojo.hostenv.loaded_modules_[pkg]=null;
var _d3=[_ce];
if(loc!="ROOT"){
_d3.push(loc);
}
_d3.push(_c8);
var _d4=_d3.join("/")+".js";
_d2=dojo.hostenv.loadPath(_d4,null,function(_d5){
var _d6=function(){
};
_d6.prototype=_cf;
_cb[loc]=new _d6();
for(var j in _d5){
_cb[loc][j]=_d5[j];
}
});
}else{
_d2=true;
}
if(_d2&&_cb[loc]){
_cf=_cb[loc];
}
});
};
(function(){
function preload(_d8){
if(!dj_undef("dj_localesGenerated",dj_global)){
dojo.setModulePrefix("nls","nls");
_d8=dojo.normalizeLocale(_d8);
dojo.searchLocalePath(_d8,true,function(loc){
for(var i=0;i<dj_localesGenerated.length;i++){
if(dj_localesGenerated[i]==loc){
dojo.require("nls.dojo_"+loc);
return true;
}
}
return false;
});
}
}
preload(dojo.locale);
var _db=djConfig.extraLocale;
if(_db){
if(!_db instanceof Array){
_db=[_db];
}
for(var i=0;i<_db.length;i++){
preload(_db[i]);
}
var req=dojo.requireLocalization;
dojo.requireLocalization=function(m,b,_e0){
req(m,b,_e0);
if(_e0){
return;
}
for(var i=0;i<_db.length;i++){
req(m,b,_db[i]);
}
};
}
})();
dojo.provide("dojo.namespace");
dojo.Namespace=function(_e2,_e3,_e4,_e5){
this.root=_e2;
this.location=_e3;
this.nsPrefix=_e4;
this.resolver=_e5;
dojo.setModulePrefix(_e4,_e3);
};
dojo.Namespace.prototype._loaded={};
dojo.Namespace.prototype._failedloaded={};
dojo.Namespace.prototype.load=function(_e6,_e7,_e8){
if(this.resolver){
var _e9=this.resolver(_e6,_e7);
if(_e9&&!this._loaded[_e9]&&!this._failedloaded[_e9]){
var req=dojo.require;
req(_e9,false,true);
if(dojo.hostenv.findModule(_e9,false)){
this._loaded[_e9]=true;
}else{
if(!_e8){
dojo.raise("symbol '"+_e9+"' is not defined after loading via namespace '"+this.nsPrefix+"'");
}
this._failedloaded[_e9]=true;
}
}
if(this._loaded[_e9]){
return true;
}
}
return false;
};
dojo.defineNamespace=function(_eb,_ec,_ed,_ee,_ef){
if(dojo._namespaces[_eb]){
return;
}
var ns=new dojo.Namespace(_eb,_ec,_ed,_ee);
dojo._namespaces[_eb]=ns;
if(_ed){
dojo._namespaces[_ed]=ns;
}
if(_ef){
dojo.widget.manager.registerWidgetPackage(_ef);
}
};
if(!djConfig.nsRepository){
djConfig.nsRepository="./src/namespaces";
}
dojo.defineNamespace("_dojoNamespaces",djConfig.nsRepository,"_dojoNamespaces",function(_f1){
return "_dojoNamespaces."+_f1.toLowerCase();
});
dojo.findNamespaceForWidget=function(_f2){
dojo.deprecated("dojo.findNamespaceForWidget","Widget ["+_f2+"] not defined for a namespace"+", so searching all namespaces. Developers should specify namespaces for all non-Dojo widgets","0.5");
_f2=_f2.toLowerCase();
for(var x in dojo._namespaces){
if(dojo._namespaces[x].load(_f2,null,true)){
return dojo._namespaces[x];
}
}
};
dojo.provide("dojo.namespaces.dojo");
(function(){
var map={html:{"accordioncontainer":"dojo.widget.AccordionContainer","treerpccontroller":"dojo.widget.TreeRPCController","accordionpane":"dojo.widget.AccordionPane","button":"dojo.widget.Button","chart":"dojo.widget.Chart","checkbox":"dojo.widget.Checkbox","civicrmdatepicker":"dojo.widget.CiviCrmDatePicker","colorpalette":"dojo.widget.ColorPalette","combobox":"dojo.widget.ComboBox","combobutton":"dojo.widget.Button","contentpane":"dojo.widget.ContentPane","contextmenu":"dojo.widget.ContextMenu","datepicker":"dojo.widget.DatePicker","debugconsole":"dojo.widget.DebugConsole","dialog":"dojo.widget.Dialog","docpane":"dojo.widget.DocPane","dropdownbutton":"dojo.widget.Button","dropdowndatepicker":"dojo.widget.DropdownDatePicker","editor2":"dojo.widget.Editor2","editor2toolbar":"dojo.widget.Editor2Toolbar","editor":"dojo.widget.Editor","editortree":"dojo.widget.EditorTree","editortreecontextmenu":"dojo.widget.EditorTreeContextMenu","editortreenode":"dojo.widget.EditorTreeNode","fisheyelist":"dojo.widget.FisheyeList","editortreecontroller":"dojo.widget.EditorTreeController","googlemap":"dojo.widget.GoogleMap","editortreeselector":"dojo.widget.EditorTreeSelector","floatingpane":"dojo.widget.FloatingPane","hslcolorpicker":"dojo.widget.HslColorPicker","inlineeditbox":"dojo.widget.InlineEditBox","layoutcontainer":"dojo.widget.LayoutContainer","linkpane":"dojo.widget.LinkPane","manager":"dojo.widget.Manager","popupcontainer":"dojo.widget.Menu2","popupmenu2":"dojo.widget.Menu2","menuitem2":"dojo.widget.Menu2","menuseparator2":"dojo.widget.Menu2","menubar2":"dojo.widget.Menu2","menubaritem2":"dojo.widget.Menu2","monthlyCalendar":"dojo.widget.MonthlyCalendar","richtext":"dojo.widget.RichText","remotetabcontroller":"dojo.widget.RemoteTabController","resizehandle":"dojo.widget.ResizeHandle","resizabletextarea":"dojo.widget.ResizableTextarea","select":"dojo.widget.Select","slideshow":"dojo.widget.SlideShow","sortabletable":"dojo.widget.SortableTable","splitcontainer":"dojo.widget.SplitContainer","svgbutton":"dojo.widget.SvgButton","tabcontainer":"dojo.widget.TabContainer","taskbar":"dojo.widget.TaskBar","timepicker":"dojo.widget.TimePicker","titlepane":"dojo.widget.TitlePane","toaster":"dojo.widget.Toaster","toggler":"dojo.widget.Toggler","toolbar":"dojo.widget.Toolbar","tooltip":"dojo.widget.Tooltip","tree":"dojo.widget.Tree","treebasiccontroller":"dojo.widget.TreeBasicController","treecontextmenu":"dojo.widget.TreeContextMenu","treeselector":"dojo.widget.TreeSelector","treecontrollerextension":"dojo.widget.TreeControllerExtension","treenode":"dojo.widget.TreeNode","validate":"dojo.widget.validate","treeloadingcontroller":"dojo.widget.TreeLoadingController","widget":"dojo.widget.Widget","wizard":"dojo.widget.Wizard","yahoomap":"dojo.widget.YahooMap"},svg:{"chart":"dojo.widget.svg.Chart","hslcolorpicker":"dojo.widget.svg.HslColorPicker"},vml:{"chart":"dojo.widget.vml.Chart"}};
function dojoNamespaceResolver(_f5,_f6){
if(!_f6){
_f6="html";
}
if(!map[_f6]){
return null;
}
return map[_f6][_f5];
}
dojo.defineNamespace("dojo","src","dojo",dojoNamespaceResolver);
dojo.addDojoNamespaceMapping=function(_f7,_f8){
map[_f7]=_f8;
};
})();
dojo.provide("dojo.string.common");
dojo.string.trim=function(str,wh){
if(!str.replace){
return str;
}
if(!str.length){
return str;
}
var re=(wh>0)?(/^\s+/):(wh<0)?(/\s+$/):(/^\s+|\s+$/g);
return str.replace(re,"");
};
dojo.string.trimStart=function(str){
return dojo.string.trim(str,1);
};
dojo.string.trimEnd=function(str){
return dojo.string.trim(str,-1);
};
dojo.string.repeat=function(str,_ff,_100){
var out="";
for(var i=0;i<_ff;i++){
out+=str;
if(_100&&i<_ff-1){
out+=_100;
}
}
return out;
};
dojo.string.pad=function(str,len,c,dir){
var out=String(str);
if(!c){
c="0";
}
if(!dir){
dir=1;
}
while(out.length<len){
if(dir>0){
out=c+out;
}else{
out+=c;
}
}
return out;
};
dojo.string.padLeft=function(str,len,c){
return dojo.string.pad(str,len,c,1);
};
dojo.string.padRight=function(str,len,c){
return dojo.string.pad(str,len,c,-1);
};
dojo.provide("dojo.string");
dojo.provide("dojo.lang.common");
dojo.lang.inherits=function(_10e,_10f){
if(typeof _10f!="function"){
dojo.raise("dojo.inherits: superclass argument ["+_10f+"] must be a function (subclass: ["+_10e+"']");
}
_10e.prototype=new _10f();
_10e.prototype.constructor=_10e;
_10e.superclass=_10f.prototype;
_10e["super"]=_10f.prototype;
};
dojo.lang._mixin=function(obj,_111){
var tobj={};
for(var x in _111){
if((typeof tobj[x]=="undefined")||(tobj[x]!=_111[x])){
obj[x]=_111[x];
}
}
if(dojo.render.html.ie&&(typeof (_111["toString"])=="function")&&(_111["toString"]!=obj["toString"])&&(_111["toString"]!=tobj["toString"])){
obj.toString=_111.toString;
}
return obj;
};
dojo.lang.mixin=function(obj,_115){
for(var i=1,l=arguments.length;i<l;i++){
dojo.lang._mixin(obj,arguments[i]);
}
return obj;
};
dojo.lang.extend=function(_117,_118){
for(var i=1,l=arguments.length;i<l;i++){
dojo.lang._mixin(_117.prototype,arguments[i]);
}
return _117;
};
dojo.inherits=dojo.lang.inherits;
dojo.mixin=dojo.lang.mixin;
dojo.extend=dojo.lang.extend;
dojo.lang.find=function(_11a,_11b,_11c,_11d){
if(!dojo.lang.isArrayLike(_11a)&&dojo.lang.isArrayLike(_11b)){
dojo.deprecated("dojo.lang.find(value, array)","use dojo.lang.find(array, value) instead","0.5");
var temp=_11a;
_11a=_11b;
_11b=temp;
}
var _11f=dojo.lang.isString(_11a);
if(_11f){
_11a=_11a.split("");
}
if(_11d){
var step=-1;
var i=_11a.length-1;
var end=-1;
}else{
var step=1;
var i=0;
var end=_11a.length;
}
if(_11c){
while(i!=end){
if(_11a[i]===_11b){
return i;
}
i+=step;
}
}else{
while(i!=end){
if(_11a[i]==_11b){
return i;
}
i+=step;
}
}
return -1;
};
dojo.lang.indexOf=dojo.lang.find;
dojo.lang.findLast=function(_123,_124,_125){
return dojo.lang.find(_123,_124,_125,true);
};
dojo.lang.lastIndexOf=dojo.lang.findLast;
dojo.lang.inArray=function(_126,_127){
return dojo.lang.find(_126,_127)>-1;
};
dojo.lang.isObject=function(it){
if(typeof it=="undefined"){
return false;
}
return (typeof it=="object"||it===null||dojo.lang.isArray(it)||dojo.lang.isFunction(it));
};
dojo.lang.isArray=function(it){
return (it instanceof Array||typeof it=="array");
};
dojo.lang.isArrayLike=function(it){
if((!it)||(dojo.lang.isUndefined(it))){
return false;
}
if(dojo.lang.isString(it)){
return false;
}
if(dojo.lang.isFunction(it)){
return false;
}
if(dojo.lang.isArray(it)){
return true;
}
if((it.tagName)&&(it.tagName.toLowerCase()=="form")){
return false;
}
if(dojo.lang.isNumber(it.length)&&isFinite(it.length)){
return true;
}
return false;
};
dojo.lang.isFunction=function(it){
if(!it){
return false;
}
return (it instanceof Function||typeof it=="function");
};
dojo.lang.isString=function(it){
return (it instanceof String||typeof it=="string");
};
dojo.lang.isAlien=function(it){
if(!it){
return false;
}
return !dojo.lang.isFunction()&&/\{\s*\[native code\]\s*\}/.test(String(it));
};
dojo.lang.isBoolean=function(it){
return (it instanceof Boolean||typeof it=="boolean");
};
dojo.lang.isNumber=function(it){
return (it instanceof Number||typeof it=="number");
};
dojo.lang.isUndefined=function(it){
return ((it==undefined)&&(typeof it=="undefined"));
};
dojo.provide("dojo.lang.extras");
dojo.lang.setTimeout=function(func,_132){
var _133=window,argsStart=2;
if(!dojo.lang.isFunction(func)){
_133=func;
func=_132;
_132=arguments[2];
argsStart++;
}
if(dojo.lang.isString(func)){
func=_133[func];
}
var args=[];
for(var i=argsStart;i<arguments.length;i++){
args.push(arguments[i]);
}
return dojo.global().setTimeout(function(){
func.apply(_133,args);
},_132);
};
dojo.lang.clearTimeout=function(_136){
dojo.global().clearTimeout(_136);
};
dojo.lang.getNameInObj=function(ns,item){
if(!ns){
ns=dj_global;
}
for(var x in ns){
if(ns[x]===item){
return new String(x);
}
}
return null;
};
dojo.lang.shallowCopy=function(obj,deep){
var i,ret;
if(obj===null){
return null;
}
if(dojo.lang.isObject(obj)){
ret=new obj.constructor();
for(i in obj){
if(dojo.lang.isUndefined(ret[i])){
ret[i]=deep?dojo.lang.shallowCopy(obj[i],deep):obj[i];
}
}
}else{
if(dojo.lang.isArray(obj)){
ret=[];
for(i=0;i<obj.length;i++){
ret[i]=deep?dojo.lang.shallowCopy(obj[i],deep):obj[i];
}
}else{
ret=obj;
}
}
return ret;
};
dojo.lang.firstValued=function(){
for(var i=0;i<arguments.length;i++){
if(typeof arguments[i]!="undefined"){
return arguments[i];
}
}
return undefined;
};
dojo.lang.getObjPathValue=function(_13e,_13f,_140){
with(dojo.parseObjPath(_13e,_13f,_140)){
return dojo.evalProp(prop,obj,_140);
}
};
dojo.lang.setObjPathValue=function(_141,_142,_143,_144){
if(arguments.length<4){
_144=true;
}
with(dojo.parseObjPath(_141,_143,_144)){
if(obj&&(_144||(prop in obj))){
obj[prop]=_142;
}
}
};
dojo.provide("dojo.io");
dojo.io.transports=[];
dojo.io.hdlrFuncNames=["load","error","timeout"];
dojo.io.Request=function(url,_146,_147,_148){
if((arguments.length==1)&&(arguments[0].constructor==Object)){
this.fromKwArgs(arguments[0]);
}else{
this.url=url;
if(_146){
this.mimetype=_146;
}
if(_147){
this.transport=_147;
}
if(arguments.length>=4){
this.changeUrl=_148;
}
}
};
dojo.lang.extend(dojo.io.Request,{url:"",mimetype:"text/plain",method:"GET",content:undefined,transport:undefined,changeUrl:undefined,formNode:undefined,sync:false,bindSuccess:false,useCache:false,preventCache:false,load:function(type,data,evt){
},error:function(type,_14d){
},timeout:function(type){
},handle:function(){
},timeoutSeconds:0,abort:function(){
},fromKwArgs:function(_14f){
if(_14f["url"]){
_14f.url=_14f.url.toString();
}
if(_14f["formNode"]){
_14f.formNode=dojo.byId(_14f.formNode);
}
if(!_14f["method"]&&_14f["formNode"]&&_14f["formNode"].method){
_14f.method=_14f["formNode"].method;
}
if(!_14f["handle"]&&_14f["handler"]){
_14f.handle=_14f.handler;
}
if(!_14f["load"]&&_14f["loaded"]){
_14f.load=_14f.loaded;
}
if(!_14f["changeUrl"]&&_14f["changeURL"]){
_14f.changeUrl=_14f.changeURL;
}
_14f.encoding=dojo.lang.firstValued(_14f["encoding"],djConfig["bindEncoding"],"");
_14f.sendTransport=dojo.lang.firstValued(_14f["sendTransport"],djConfig["ioSendTransport"],false);
var _150=dojo.lang.isFunction;
for(var x=0;x<dojo.io.hdlrFuncNames.length;x++){
var fn=dojo.io.hdlrFuncNames[x];
if(_14f[fn]&&_150(_14f[fn])){
continue;
}
if(_14f["handle"]&&_150(_14f["handle"])){
_14f[fn]=_14f.handle;
}
}
dojo.lang.mixin(this,_14f);
}});
dojo.io.Error=function(msg,type,num){
this.message=msg;
this.type=type||"unknown";
this.number=num||0;
};
dojo.io.transports.addTransport=function(name){
this.push(name);
this[name]=dojo.io[name];
};
dojo.io.bind=function(_157){
if(!(_157 instanceof dojo.io.Request)){
try{
_157=new dojo.io.Request(_157);
}
catch(e){
dojo.debug(e);
}
}
var _158="";
if(_157["transport"]){
_158=_157["transport"];
if(!this[_158]){
return _157;
}
}else{
for(var x=0;x<dojo.io.transports.length;x++){
var tmp=dojo.io.transports[x];
if((this[tmp])&&(this[tmp].canHandle(_157))){
_158=tmp;
}
}
if(_158==""){
return _157;
}
}
this[_158].bind(_157);
_157.bindSuccess=true;
return _157;
};
dojo.io.queueBind=function(_15b){
if(!(_15b instanceof dojo.io.Request)){
try{
_15b=new dojo.io.Request(_15b);
}
catch(e){
dojo.debug(e);
}
}
var _15c=_15b.load;
_15b.load=function(){
dojo.io._queueBindInFlight=false;
var ret=_15c.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
var _15e=_15b.error;
_15b.error=function(){
dojo.io._queueBindInFlight=false;
var ret=_15e.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
dojo.io._bindQueue.push(_15b);
dojo.io._dispatchNextQueueBind();
return _15b;
};
dojo.io._dispatchNextQueueBind=function(){
if(!dojo.io._queueBindInFlight){
dojo.io._queueBindInFlight=true;
if(dojo.io._bindQueue.length>0){
dojo.io.bind(dojo.io._bindQueue.shift());
}else{
dojo.io._queueBindInFlight=false;
}
}
};
dojo.io._bindQueue=[];
dojo.io._queueBindInFlight=false;
dojo.io.argsFromMap=function(map,_161,last){
var enc=/utf/i.test(_161||"")?encodeURIComponent:dojo.string.encodeAscii;
var _164=[];
var _165=new Object();
for(var name in map){
var _167=function(elt){
var val=enc(name)+"="+enc(elt);
_164[(last==name)?"push":"unshift"](val);
};
if(!_165[name]){
var _16a=map[name];
if(dojo.lang.isArray(_16a)){
dojo.lang.forEach(_16a,_167);
}else{
_167(_16a);
}
}
}
return _164.join("&");
};
dojo.io.setIFrameSrc=function(_16b,src,_16d){
try{
var r=dojo.render.html;
if(!_16d){
if(r.safari){
_16b.location=src;
}else{
frames[_16b.name].location=src;
}
}else{
var idoc;
if(r.ie){
idoc=_16b.contentWindow.document;
}else{
if(r.safari){
idoc=_16b.document;
}else{
idoc=_16b.contentWindow;
}
}
if(!idoc){
_16b.location=src;
return;
}else{
idoc.location.replace(src);
}
}
}
catch(e){
dojo.debug(e);
dojo.debug("setIFrameSrc: "+e);
}
};
dojo.provide("dojo.lang.array");
dojo.lang.has=function(obj,name){
try{
return (typeof obj[name]!="undefined");
}
catch(e){
return false;
}
};
dojo.lang.isEmpty=function(obj){
if(dojo.lang.isObject(obj)){
var tmp={};
var _174=0;
for(var x in obj){
if(obj[x]&&(!tmp[x])){
_174++;
break;
}
}
return (_174==0);
}else{
if(dojo.lang.isArrayLike(obj)||dojo.lang.isString(obj)){
return obj.length==0;
}
}
};
dojo.lang.map=function(arr,obj,_178){
var _179=dojo.lang.isString(arr);
if(_179){
arr=arr.split("");
}
if(dojo.lang.isFunction(obj)&&(!_178)){
_178=obj;
obj=dj_global;
}else{
if(dojo.lang.isFunction(obj)&&_178){
var _17a=obj;
obj=_178;
_178=_17a;
}
}
if(Array.map){
var _17b=Array.map(arr,_178,obj);
}else{
var _17b=[];
for(var i=0;i<arr.length;++i){
_17b.push(_178.call(obj,arr[i]));
}
}
if(_179){
return _17b.join("");
}else{
return _17b;
}
};
dojo.lang.reduce=function(arr,_17e,obj,_180){
var _181=_17e;
var ob=obj?obj:dj_global;
dojo.lang.map(arr,function(val){
_181=_180.call(ob,_181,val);
});
return _181;
};
dojo.lang.forEach=function(_184,_185,_186){
if(dojo.lang.isString(_184)){
_184=_184.split("");
}
if(Array.forEach){
Array.forEach(_184,_185,_186);
}else{
if(!_186){
_186=dj_global;
}
for(var i=0,l=_184.length;i<l;i++){
_185.call(_186,_184[i],i,_184);
}
}
};
dojo.lang._everyOrSome=function(_188,arr,_18a,_18b){
if(dojo.lang.isString(arr)){
arr=arr.split("");
}
if(Array.every){
return Array[(_188)?"every":"some"](arr,_18a,_18b);
}else{
if(!_18b){
_18b=dj_global;
}
for(var i=0,l=arr.length;i<l;i++){
var _18d=_18a.call(_18b,arr[i],i,arr);
if((_188)&&(!_18d)){
return false;
}else{
if((!_188)&&(_18d)){
return true;
}
}
}
return (_188)?true:false;
}
};
dojo.lang.every=function(arr,_18f,_190){
return this._everyOrSome(true,arr,_18f,_190);
};
dojo.lang.some=function(arr,_192,_193){
return this._everyOrSome(false,arr,_192,_193);
};
dojo.lang.filter=function(arr,_195,_196){
var _197=dojo.lang.isString(arr);
if(_197){
arr=arr.split("");
}
if(Array.filter){
var _198=Array.filter(arr,_195,_196);
}else{
if(!_196){
if(arguments.length>=3){
dojo.raise("thisObject doesn't exist!");
}
_196=dj_global;
}
var _198=[];
for(var i=0;i<arr.length;i++){
if(_195.call(_196,arr[i],i,arr)){
_198.push(arr[i]);
}
}
}
if(_197){
return _198.join("");
}else{
return _198;
}
};
dojo.lang.unnest=function(){
var out=[];
for(var i=0;i<arguments.length;i++){
if(dojo.lang.isArrayLike(arguments[i])){
var add=dojo.lang.unnest.apply(this,arguments[i]);
out=out.concat(add);
}else{
out.push(arguments[i]);
}
}
return out;
};
dojo.lang.toArray=function(_19d,_19e){
var _19f=[];
for(var i=_19e||0;i<_19d.length;i++){
_19f.push(_19d[i]);
}
return _19f;
};
dojo.provide("dojo.lang.func");
dojo.lang.hitch=function(_1a1,_1a2){
var fcn=(dojo.lang.isString(_1a2)?_1a1[_1a2]:_1a2)||function(){
};
return function(){
return fcn.apply(_1a1,arguments);
};
};
dojo.lang.anonCtr=0;
dojo.lang.anon={};
dojo.lang.nameAnonFunc=function(_1a4,_1a5,_1a6){
var nso=(_1a5||dojo.lang.anon);
if((_1a6)||((dj_global["djConfig"])&&(djConfig["slowAnonFuncLookups"]==true))){
for(var x in nso){
try{
if(nso[x]===_1a4){
return x;
}
}
catch(e){
}
}
}
var ret="__"+dojo.lang.anonCtr++;
while(typeof nso[ret]!="undefined"){
ret="__"+dojo.lang.anonCtr++;
}
nso[ret]=_1a4;
return ret;
};
dojo.lang.forward=function(_1aa){
return function(){
return this[_1aa].apply(this,arguments);
};
};
dojo.lang.curry=function(ns,func){
var _1ad=[];
ns=ns||dj_global;
if(dojo.lang.isString(func)){
func=ns[func];
}
for(var x=2;x<arguments.length;x++){
_1ad.push(arguments[x]);
}
var _1af=(func["__preJoinArity"]||func.length)-_1ad.length;
function gather(_1b0,_1b1,_1b2){
var _1b3=_1b2;
var _1b4=_1b1.slice(0);
for(var x=0;x<_1b0.length;x++){
_1b4.push(_1b0[x]);
}
_1b2=_1b2-_1b0.length;
if(_1b2<=0){
var res=func.apply(ns,_1b4);
_1b2=_1b3;
return res;
}else{
return function(){
return gather(arguments,_1b4,_1b2);
};
}
}
return gather([],_1ad,_1af);
};
dojo.lang.curryArguments=function(ns,func,args,_1ba){
var _1bb=[];
var x=_1ba||0;
for(x=_1ba;x<args.length;x++){
_1bb.push(args[x]);
}
return dojo.lang.curry.apply(dojo.lang,[ns,func].concat(_1bb));
};
dojo.lang.tryThese=function(){
for(var x=0;x<arguments.length;x++){
try{
if(typeof arguments[x]=="function"){
var ret=(arguments[x]());
if(ret){
return ret;
}
}
}
catch(e){
dojo.debug(e);
}
}
};
dojo.lang.delayThese=function(farr,cb,_1c1,_1c2){
if(!farr.length){
if(typeof _1c2=="function"){
_1c2();
}
return;
}
if((typeof _1c1=="undefined")&&(typeof cb=="number")){
_1c1=cb;
cb=function(){
};
}else{
if(!cb){
cb=function(){
};
if(!_1c1){
_1c1=0;
}
}
}
setTimeout(function(){
(farr.shift())();
cb();
dojo.lang.delayThese(farr,cb,_1c1,_1c2);
},_1c1);
};
dojo.provide("dojo.string.extras");
dojo.string.substituteParams=function(_1c3,hash){
var map=(typeof hash=="object")?hash:dojo.lang.toArray(arguments,1);
return _1c3.replace(/\%\{(\w+)\}/g,function(_1c6,key){
if(typeof (map[key])!="undefined"&&map[key]!=null){
return map[key];
}
dojo.raise("Substitution not found: "+key);
});
};
dojo.string.capitalize=function(str){
if(!dojo.lang.isString(str)){
return "";
}
if(arguments.length==0){
str=this;
}
var _1c9=str.split(" ");
for(var i=0;i<_1c9.length;i++){
_1c9[i]=_1c9[i].charAt(0).toUpperCase()+_1c9[i].substring(1);
}
return _1c9.join(" ");
};
dojo.string.isBlank=function(str){
if(!dojo.lang.isString(str)){
return true;
}
return (dojo.string.trim(str).length==0);
};
dojo.string.encodeAscii=function(str){
if(!dojo.lang.isString(str)){
return str;
}
var ret="";
var _1ce=escape(str);
var _1cf,re=/%u([0-9A-F]{4})/i;
while((_1cf=_1ce.match(re))){
var num=Number("0x"+_1cf[1]);
var _1d1=escape("&#"+num+";");
ret+=_1ce.substring(0,_1cf.index)+_1d1;
_1ce=_1ce.substring(_1cf.index+_1cf[0].length);
}
ret+=_1ce.replace(/\+/g,"%2B");
return ret;
};
dojo.string.escape=function(type,str){
var args=dojo.lang.toArray(arguments,1);
switch(type.toLowerCase()){
case "xml":
case "html":
case "xhtml":
return dojo.string.escapeXml.apply(this,args);
case "sql":
return dojo.string.escapeSql.apply(this,args);
case "regexp":
case "regex":
return dojo.string.escapeRegExp.apply(this,args);
case "javascript":
case "jscript":
case "js":
return dojo.string.escapeJavaScript.apply(this,args);
case "ascii":
return dojo.string.encodeAscii.apply(this,args);
default:
return str;
}
};
dojo.string.escapeXml=function(str,_1d6){
str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!_1d6){
str=str.replace(/'/gm,"&#39;");
}
return str;
};
dojo.string.escapeSql=function(str){
return str.replace(/'/gm,"''");
};
dojo.string.escapeRegExp=function(str){
return str.replace(/\\/gm,"\\\\").replace(/([\f\b\n\t\r[\^$|?*+(){}])/gm,"\\$1");
};
dojo.string.escapeJavaScript=function(str){
return str.replace(/(["'\f\b\n\t\r])/gm,"\\$1");
};
dojo.string.escapeString=function(str){
return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
dojo.string.summary=function(str,len){
if(!len||str.length<=len){
return str;
}else{
return str.substring(0,len).replace(/\.+$/,"")+"...";
}
};
dojo.string.endsWith=function(str,end,_1df){
if(_1df){
str=str.toLowerCase();
end=end.toLowerCase();
}
if((str.length-end.length)<0){
return false;
}
return str.lastIndexOf(end)==str.length-end.length;
};
dojo.string.endsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.endsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.startsWith=function(str,_1e3,_1e4){
if(_1e4){
str=str.toLowerCase();
_1e3=_1e3.toLowerCase();
}
return str.indexOf(_1e3)==0;
};
dojo.string.startsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.startsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.has=function(str){
for(var i=1;i<arguments.length;i++){
if(str.indexOf(arguments[i])>-1){
return true;
}
}
return false;
};
dojo.string.normalizeNewlines=function(text,_1ea){
if(_1ea=="\n"){
text=text.replace(/\r\n/g,"\n");
text=text.replace(/\r/g,"\n");
}else{
if(_1ea=="\r"){
text=text.replace(/\r\n/g,"\r");
text=text.replace(/\n/g,"\r");
}else{
text=text.replace(/([^\r])\n/g,"$1\r\n");
text=text.replace(/\r([^\n])/g,"\r\n$1");
}
}
return text;
};
dojo.string.splitEscaped=function(str,_1ec){
var _1ed=[];
for(var i=0,prevcomma=0;i<str.length;i++){
if(str.charAt(i)=="\\"){
i++;
continue;
}
if(str.charAt(i)==_1ec){
_1ed.push(str.substring(prevcomma,i));
prevcomma=i+1;
}
}
_1ed.push(str.substr(prevcomma));
return _1ed;
};
dojo.provide("dojo.dom");
dojo.dom.ELEMENT_NODE=1;
dojo.dom.ATTRIBUTE_NODE=2;
dojo.dom.TEXT_NODE=3;
dojo.dom.CDATA_SECTION_NODE=4;
dojo.dom.ENTITY_REFERENCE_NODE=5;
dojo.dom.ENTITY_NODE=6;
dojo.dom.PROCESSING_INSTRUCTION_NODE=7;
dojo.dom.COMMENT_NODE=8;
dojo.dom.DOCUMENT_NODE=9;
dojo.dom.DOCUMENT_TYPE_NODE=10;
dojo.dom.DOCUMENT_FRAGMENT_NODE=11;
dojo.dom.NOTATION_NODE=12;
dojo.dom.dojoml="http://www.dojotoolkit.org/2004/dojoml";
dojo.dom.xmlns={svg:"http://www.w3.org/2000/svg",smil:"http://www.w3.org/2001/SMIL20/",mml:"http://www.w3.org/1998/Math/MathML",cml:"http://www.xml-cml.org",xlink:"http://www.w3.org/1999/xlink",xhtml:"http://www.w3.org/1999/xhtml",xul:"http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",xbl:"http://www.mozilla.org/xbl",fo:"http://www.w3.org/1999/XSL/Format",xsl:"http://www.w3.org/1999/XSL/Transform",xslt:"http://www.w3.org/1999/XSL/Transform",xi:"http://www.w3.org/2001/XInclude",xforms:"http://www.w3.org/2002/01/xforms",saxon:"http://icl.com/saxon",xalan:"http://xml.apache.org/xslt",xsd:"http://www.w3.org/2001/XMLSchema",dt:"http://www.w3.org/2001/XMLSchema-datatypes",xsi:"http://www.w3.org/2001/XMLSchema-instance",rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",rdfs:"http://www.w3.org/2000/01/rdf-schema#",dc:"http://purl.org/dc/elements/1.1/",dcq:"http://purl.org/dc/qualifiers/1.0","soap-env":"http://schemas.xmlsoap.org/soap/envelope/",wsdl:"http://schemas.xmlsoap.org/wsdl/",AdobeExtensions:"http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"};
dojo.dom.isNode=function(wh){
if(typeof Element=="function"){
try{
return wh instanceof Element;
}
catch(E){
}
}else{
return wh&&!isNaN(wh.nodeType);
}
};
dojo.dom.getUniqueId=function(){
var _1f0=dojo.doc();
do{
var id="dj_unique_"+(++arguments.callee._idIncrement);
}while(_1f0.getElementById(id));
return id;
};
dojo.dom.getUniqueId._idIncrement=0;
dojo.dom.firstElement=dojo.dom.getFirstChildElement=function(_1f2,_1f3){
var node=_1f2.firstChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.nextSibling;
}
if(_1f3&&node&&node.tagName&&node.tagName.toLowerCase()!=_1f3.toLowerCase()){
node=dojo.dom.nextElement(node,_1f3);
}
return node;
};
dojo.dom.lastElement=dojo.dom.getLastChildElement=function(_1f5,_1f6){
var node=_1f5.lastChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.previousSibling;
}
if(_1f6&&node&&node.tagName&&node.tagName.toLowerCase()!=_1f6.toLowerCase()){
node=dojo.dom.prevElement(node,_1f6);
}
return node;
};
dojo.dom.nextElement=dojo.dom.getNextSiblingElement=function(node,_1f9){
if(!node){
return null;
}
do{
node=node.nextSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_1f9&&_1f9.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.nextElement(node,_1f9);
}
return node;
};
dojo.dom.prevElement=dojo.dom.getPreviousSiblingElement=function(node,_1fb){
if(!node){
return null;
}
if(_1fb){
_1fb=_1fb.toLowerCase();
}
do{
node=node.previousSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_1fb&&_1fb.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.prevElement(node,_1fb);
}
return node;
};
dojo.dom.moveChildren=function(_1fc,_1fd,trim){
var _1ff=0;
if(trim){
while(_1fc.hasChildNodes()&&_1fc.firstChild.nodeType==dojo.dom.TEXT_NODE){
_1fc.removeChild(_1fc.firstChild);
}
while(_1fc.hasChildNodes()&&_1fc.lastChild.nodeType==dojo.dom.TEXT_NODE){
_1fc.removeChild(_1fc.lastChild);
}
}
while(_1fc.hasChildNodes()){
_1fd.appendChild(_1fc.firstChild);
_1ff++;
}
return _1ff;
};
dojo.dom.copyChildren=function(_200,_201,trim){
var _203=_200.cloneNode(true);
return this.moveChildren(_203,_201,trim);
};
dojo.dom.removeChildren=function(node){
var _205=node.childNodes.length;
while(node.hasChildNodes()){
node.removeChild(node.firstChild);
}
return _205;
};
dojo.dom.replaceChildren=function(node,_207){
dojo.dom.removeChildren(node);
node.appendChild(_207);
};
dojo.dom.removeNode=function(node){
if(node&&node.parentNode){
return node.parentNode.removeChild(node);
}
};
dojo.dom.getAncestors=function(node,_20a,_20b){
var _20c=[];
var _20d=(_20a&&(_20a instanceof Function||typeof _20a=="function"));
while(node){
if(!_20d||_20a(node)){
_20c.push(node);
}
if(_20b&&_20c.length>0){
return _20c[0];
}
node=node.parentNode;
}
if(_20b){
return null;
}
return _20c;
};
dojo.dom.getAncestorsByTag=function(node,tag,_210){
tag=tag.toLowerCase();
return dojo.dom.getAncestors(node,function(el){
return ((el.tagName)&&(el.tagName.toLowerCase()==tag));
},_210);
};
dojo.dom.getFirstAncestorByTag=function(node,tag){
return dojo.dom.getAncestorsByTag(node,tag,true);
};
dojo.dom.isDescendantOf=function(node,_215,_216){
if(_216&&node){
node=node.parentNode;
}
while(node){
if(node==_215){
return true;
}
node=node.parentNode;
}
return false;
};
dojo.dom.innerXML=function(node){
if(node.innerXML){
return node.innerXML;
}else{
if(node.xml){
return node.xml;
}else{
if(typeof XMLSerializer!="undefined"){
return (new XMLSerializer()).serializeToString(node);
}
}
}
};
dojo.dom.createDocument=function(){
var doc=null;
var _219=dojo.doc();
if(!dj_undef("ActiveXObject")){
var _21a=["MSXML2","Microsoft","MSXML","MSXML3"];
for(var i=0;i<_21a.length;i++){
try{
doc=new ActiveXObject(_21a[i]+".XMLDOM");
}
catch(e){
}
if(doc){
break;
}
}
}else{
if((_219.implementation)&&(_219.implementation.createDocument)){
doc=_219.implementation.createDocument("","",null);
}
}
return doc;
};
dojo.dom.createDocumentFromText=function(str,_21d){
if(!_21d){
_21d="text/xml";
}
if(!dj_undef("DOMParser")){
var _21e=new DOMParser();
return _21e.parseFromString(str,_21d);
}else{
if(!dj_undef("ActiveXObject")){
var _21f=dojo.dom.createDocument();
if(_21f){
_21f.async=false;
_21f.loadXML(str);
return _21f;
}else{
dojo.debug("toXml didn't work?");
}
}else{
var _220=dojo.doc();
if(_220.createElement){
var tmp=_220.createElement("xml");
tmp.innerHTML=str;
if(_220.implementation&&_220.implementation.createDocument){
var _222=_220.implementation.createDocument("foo","",null);
for(var i=0;i<tmp.childNodes.length;i++){
_222.importNode(tmp.childNodes.item(i),true);
}
return _222;
}
return ((tmp.document)&&(tmp.document.firstChild?tmp.document.firstChild:tmp));
}
}
}
return null;
};
dojo.dom.prependChild=function(node,_225){
if(_225.firstChild){
_225.insertBefore(node,_225.firstChild);
}else{
_225.appendChild(node);
}
return true;
};
dojo.dom.insertBefore=function(node,ref,_228){
if(_228!=true&&(node===ref||node.nextSibling===ref)){
return false;
}
var _229=ref.parentNode;
_229.insertBefore(node,ref);
return true;
};
dojo.dom.insertAfter=function(node,ref,_22c){
var pn=ref.parentNode;
if(ref==pn.lastChild){
if((_22c!=true)&&(node===ref)){
return false;
}
pn.appendChild(node);
}else{
return this.insertBefore(node,ref.nextSibling,_22c);
}
return true;
};
dojo.dom.insertAtPosition=function(node,ref,_230){
if((!node)||(!ref)||(!_230)){
return false;
}
switch(_230.toLowerCase()){
case "before":
return dojo.dom.insertBefore(node,ref);
case "after":
return dojo.dom.insertAfter(node,ref);
case "first":
if(ref.firstChild){
return dojo.dom.insertBefore(node,ref.firstChild);
}else{
ref.appendChild(node);
return true;
}
break;
default:
ref.appendChild(node);
return true;
}
};
dojo.dom.insertAtIndex=function(node,_232,_233){
var _234=_232.childNodes;
if(!_234.length){
_232.appendChild(node);
return true;
}
var _235=null;
for(var i=0;i<_234.length;i++){
var _237=_234.item(i)["getAttribute"]?parseInt(_234.item(i).getAttribute("dojoinsertionindex")):-1;
if(_237<_233){
_235=_234.item(i);
}
}
if(_235){
return dojo.dom.insertAfter(node,_235);
}else{
return dojo.dom.insertBefore(node,_234.item(0));
}
};
dojo.dom.textContent=function(node,text){
if(arguments.length>1){
var _23a=dojo.doc();
dojo.dom.replaceChildren(node,_23a.createTextNode(text));
return text;
}else{
if(node.textContent!=undefined){
return node.textContent;
}
var _23b="";
if(node==null){
return _23b;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
_23b+=dojo.dom.textContent(node.childNodes[i]);
break;
case 3:
case 2:
case 4:
_23b+=node.childNodes[i].nodeValue;
break;
default:
break;
}
}
return _23b;
}
};
dojo.dom.hasParent=function(node){
return node&&node.parentNode&&dojo.dom.isNode(node.parentNode);
};
dojo.dom.isTag=function(node){
if(node&&node.tagName){
for(var i=1;i<arguments.length;i++){
if(node.tagName==String(arguments[i])){
return String(arguments[i]);
}
}
}
return "";
};
dojo.dom.setAttributeNS=function(elem,_241,_242,_243){
if(elem==null||((elem==undefined)&&(typeof elem=="undefined"))){
dojo.raise("No element given to dojo.dom.setAttributeNS");
}
if(!((elem.setAttributeNS==undefined)&&(typeof elem.setAttributeNS=="undefined"))){
elem.setAttributeNS(_241,_242,_243);
}else{
var _244=elem.ownerDocument;
var _245=_244.createNode(2,_242,_241);
_245.nodeValue=_243;
elem.setAttributeNode(_245);
}
};
dojo.provide("dojo.undo.browser");
try{
if((!djConfig["preventBackButtonFix"])&&(!dojo.hostenv.post_load_)){
document.write("<iframe style='border: 0px; width: 1px; height: 1px; position: absolute; bottom: 0px; right: 0px; visibility: visible;' name='djhistory' id='djhistory' src='"+(dojo.hostenv.getBaseScriptUri()+"iframe_history.html")+"'></iframe>");
}
}
catch(e){
}
if(dojo.render.html.opera){
dojo.debug("Opera is not supported with dojo.undo.browser, so back/forward detection will not work.");
}
dojo.undo.browser={initialHref:window.location.href,initialHash:window.location.hash,moveForward:false,historyStack:[],forwardStack:[],historyIframe:null,bookmarkAnchor:null,locationTimer:null,setInitialState:function(args){
this.initialState={"url":this.initialHref,"kwArgs":args,"urlHash":this.initialHash};
},addToHistory:function(args){
var hash=null;
if(!this.historyIframe){
this.historyIframe=window.frames["djhistory"];
}
if(!this.bookmarkAnchor){
this.bookmarkAnchor=document.createElement("a");
dojo.body().appendChild(this.bookmarkAnchor);
this.bookmarkAnchor.style.display="none";
}
if((!args["changeUrl"])||(dojo.render.html.ie)){
var url=dojo.hostenv.getBaseScriptUri()+"iframe_history.html?"+(new Date()).getTime();
this.moveForward=true;
dojo.io.setIFrameSrc(this.historyIframe,url,false);
}
if(args["changeUrl"]){
this.changingUrl=true;
hash="#"+((args["changeUrl"]!==true)?args["changeUrl"]:(new Date()).getTime());
setTimeout("window.location.href = '"+hash+"'; dojo.undo.browser.changingUrl = false;",1);
this.bookmarkAnchor.href=hash;
if(dojo.render.html.ie){
var _24a=args["back"]||args["backButton"]||args["handle"];
var tcb=function(_24c){
if(window.location.hash!=""){
setTimeout("window.location.href = '"+hash+"';",1);
}
_24a.apply(this,[_24c]);
};
if(args["back"]){
args.back=tcb;
}else{
if(args["backButton"]){
args.backButton=tcb;
}else{
if(args["handle"]){
args.handle=tcb;
}
}
}
this.forwardStack=[];
var _24d=args["forward"]||args["forwardButton"]||args["handle"];
var tfw=function(_24f){
if(window.location.hash!=""){
window.location.href=hash;
}
if(_24d){
_24d.apply(this,[_24f]);
}
};
if(args["forward"]){
args.forward=tfw;
}else{
if(args["forwardButton"]){
args.forwardButton=tfw;
}else{
if(args["handle"]){
args.handle=tfw;
}
}
}
}else{
if(dojo.render.html.moz){
if(!this.locationTimer){
this.locationTimer=setInterval("dojo.undo.browser.checkLocation();",200);
}
}
}
}
this.historyStack.push({"url":url,"kwArgs":args,"urlHash":hash});
},checkLocation:function(){
if(!this.changingUrl){
var hsl=this.historyStack.length;
if((window.location.hash==this.initialHash||window.location.href==this.initialHref)&&(hsl==1)){
this.handleBackButton();
return;
}
if(this.forwardStack.length>0){
if(this.forwardStack[this.forwardStack.length-1].urlHash==window.location.hash){
this.handleForwardButton();
return;
}
}
if((hsl>=2)&&(this.historyStack[hsl-2])){
if(this.historyStack[hsl-2].urlHash==window.location.hash){
this.handleBackButton();
return;
}
}
}
},iframeLoaded:function(evt,_252){
if(!dojo.render.html.opera){
var _253=this._getUrlQuery(_252.href);
if(_253==null){
if(this.historyStack.length==1){
this.handleBackButton();
}
return;
}
if(this.moveForward){
this.moveForward=false;
return;
}
if(this.historyStack.length>=2&&_253==this._getUrlQuery(this.historyStack[this.historyStack.length-2].url)){
this.handleBackButton();
}else{
if(this.forwardStack.length>0&&_253==this._getUrlQuery(this.forwardStack[this.forwardStack.length-1].url)){
this.handleForwardButton();
}
}
}
},handleBackButton:function(){
var _254=this.historyStack.pop();
if(!_254){
return;
}
var last=this.historyStack[this.historyStack.length-1];
if(!last&&this.historyStack.length==0){
last=this.initialState;
}
if(last){
if(last.kwArgs["back"]){
last.kwArgs["back"]();
}else{
if(last.kwArgs["backButton"]){
last.kwArgs["backButton"]();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("back");
}
}
}
}
this.forwardStack.push(_254);
},handleForwardButton:function(){
var last=this.forwardStack.pop();
if(!last){
return;
}
if(last.kwArgs["forward"]){
last.kwArgs.forward();
}else{
if(last.kwArgs["forwardButton"]){
last.kwArgs.forwardButton();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("forward");
}
}
}
this.historyStack.push(last);
},_getUrlQuery:function(url){
var _258=url.split("?");
if(_258.length<2){
return null;
}else{
return _258[1];
}
}};
dojo.provide("dojo.io.BrowserIO");
dojo.io.checkChildrenForFile=function(node){
var _25a=false;
var _25b=node.getElementsByTagName("input");
dojo.lang.forEach(_25b,function(_25c){
if(_25a){
return;
}
if(_25c.getAttribute("type")=="file"){
_25a=true;
}
});
return _25a;
};
dojo.io.formHasFile=function(_25d){
return dojo.io.checkChildrenForFile(_25d);
};
dojo.io.updateNode=function(node,_25f){
node=dojo.byId(node);
var args=_25f;
if(dojo.lang.isString(_25f)){
args={url:_25f};
}
args.mimetype="text/html";
args.load=function(t,d,e){
while(node.firstChild){
if(dojo["event"]){
try{
dojo.event.browser.clean(node.firstChild);
}
catch(e){
}
}
node.removeChild(node.firstChild);
}
node.innerHTML=d;
};
dojo.io.bind(args);
};
dojo.io.formFilter=function(node){
var type=(node.type||"").toLowerCase();
return !node.disabled&&node.name&&!dojo.lang.inArray(["file","submit","image","reset","button"],type);
};
dojo.io.encodeForm=function(_266,_267,_268){
if((!_266)||(!_266.tagName)||(!_266.tagName.toLowerCase()=="form")){
dojo.raise("Attempted to encode a non-form element.");
}
if(!_268){
_268=dojo.io.formFilter;
}
var enc=/utf/i.test(_267||"")?encodeURIComponent:dojo.string.encodeAscii;
var _26a=[];
for(var i=0;i<_266.elements.length;i++){
var elm=_266.elements[i];
if(!elm||elm.tagName.toLowerCase()=="fieldset"||!_268(elm)){
continue;
}
var name=enc(elm.name);
var type=elm.type.toLowerCase();
if(type=="select-multiple"){
for(var j=0;j<elm.options.length;j++){
if(elm.options[j].selected){
_26a.push(name+"="+enc(elm.options[j].value));
}
}
}else{
if(dojo.lang.inArray(["radio","checkbox"],type)){
if(elm.checked){
_26a.push(name+"="+enc(elm.value));
}
}else{
_26a.push(name+"="+enc(elm.value));
}
}
}
var _270=_266.getElementsByTagName("input");
for(var i=0;i<_270.length;i++){
var _271=_270[i];
if(_271.type.toLowerCase()=="image"&&_271.form==_266&&_268(_271)){
var name=enc(_271.name);
_26a.push(name+"="+enc(_271.value));
_26a.push(name+".x=0");
_26a.push(name+".y=0");
}
}
return _26a.join("&")+"&";
};
dojo.io.FormBind=function(args){
this.bindArgs={};
if(args&&args.formNode){
this.init(args);
}else{
if(args){
this.init({formNode:args});
}
}
};
dojo.lang.extend(dojo.io.FormBind,{form:null,bindArgs:null,clickedButton:null,init:function(args){
var form=dojo.byId(args.formNode);
if(!form||!form.tagName||form.tagName.toLowerCase()!="form"){
throw new Error("FormBind: Couldn't apply, invalid form");
}else{
if(this.form==form){
return;
}else{
if(this.form){
throw new Error("FormBind: Already applied to a form");
}
}
}
dojo.lang.mixin(this.bindArgs,args);
this.form=form;
this.connect(form,"onsubmit","submit");
for(var i=0;i<form.elements.length;i++){
var node=form.elements[i];
if(node&&node.type&&dojo.lang.inArray(["submit","button"],node.type.toLowerCase())){
this.connect(node,"onclick","click");
}
}
var _277=form.getElementsByTagName("input");
for(var i=0;i<_277.length;i++){
var _278=_277[i];
if(_278.type.toLowerCase()=="image"&&_278.form==form){
this.connect(_278,"onclick","click");
}
}
},onSubmit:function(form){
return true;
},submit:function(e){
e.preventDefault();
if(this.onSubmit(this.form)){
dojo.io.bind(dojo.lang.mixin(this.bindArgs,{formFilter:dojo.lang.hitch(this,"formFilter")}));
}
},click:function(e){
var node=e.currentTarget;
if(node.disabled){
return;
}
this.clickedButton=node;
},formFilter:function(node){
var type=(node.type||"").toLowerCase();
var _27f=false;
if(node.disabled||!node.name){
_27f=false;
}else{
if(dojo.lang.inArray(["submit","button","image"],type)){
if(!this.clickedButton){
this.clickedButton=node;
}
_27f=node==this.clickedButton;
}else{
_27f=!dojo.lang.inArray(["file","submit","reset","button"],type);
}
}
return _27f;
},connect:function(_280,_281,_282){
if(dojo.evalObjPath("dojo.event.connect")){
dojo.event.connect(_280,_281,this,_282);
}else{
var fcn=dojo.lang.hitch(this,_282);
_280[_281]=function(e){
if(!e){
e=window.event;
}
if(!e.currentTarget){
e.currentTarget=e.srcElement;
}
if(!e.preventDefault){
e.preventDefault=function(){
window.event.returnValue=false;
};
}
fcn(e);
};
}
}});
dojo.io.XMLHTTPTransport=new function(){
var _285=this;
var _286={};
this.useCache=false;
this.preventCache=false;
function getCacheKey(url,_288,_289){
return url+"|"+_288+"|"+_289.toLowerCase();
}
function addToCache(url,_28b,_28c,http){
_286[getCacheKey(url,_28b,_28c)]=http;
}
function getFromCache(url,_28f,_290){
return _286[getCacheKey(url,_28f,_290)];
}
this.clearCache=function(){
_286={};
};
function doLoad(_291,http,url,_294,_295){
if(((http.status>=200)&&(http.status<300))||(http.status==304)||(location.protocol=="file:"&&(http.status==0||http.status==undefined))||(location.protocol=="chrome:"&&(http.status==0||http.status==undefined))){
var ret;
if(_291.method.toLowerCase()=="head"){
var _297=http.getAllResponseHeaders();
ret={};
ret.toString=function(){
return _297;
};
var _298=_297.split(/[\r\n]+/g);
for(var i=0;i<_298.length;i++){
var pair=_298[i].match(/^([^:]+)\s*:\s*(.+)$/i);
if(pair){
ret[pair[1]]=pair[2];
}
}
}else{
if(_291.mimetype=="text/javascript"){
try{
ret=dj_eval(http.responseText);
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=null;
}
}else{
if(_291.mimetype=="text/json"){
try{
ret=dj_eval("("+http.responseText+")");
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=false;
}
}else{
if((_291.mimetype=="application/xml")||(_291.mimetype=="text/xml")){
ret=http.responseXML;
if(!ret||typeof ret=="string"||!http.getResponseHeader("Content-Type")){
ret=dojo.dom.createDocumentFromText(http.responseText);
}
}else{
ret=http.responseText;
}
}
}
}
if(_295){
addToCache(url,_294,_291.method,http);
}
_291[(typeof _291.load=="function")?"load":"handle"]("load",ret,http,_291);
}else{
var _29b=new dojo.io.Error("XMLHttpTransport Error: "+http.status+" "+http.statusText);
_291[(typeof _291.error=="function")?"error":"handle"]("error",_29b,http,_291);
}
}
function setHeaders(http,_29d){
if(_29d["headers"]){
for(var _29e in _29d["headers"]){
if(_29e.toLowerCase()=="content-type"&&!_29d["contentType"]){
_29d["contentType"]=_29d["headers"][_29e];
}else{
http.setRequestHeader(_29e,_29d["headers"][_29e]);
}
}
}
}
this.inFlight=[];
this.inFlightTimer=null;
this.startWatchingInFlight=function(){
if(!this.inFlightTimer){
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
}
};
this.watchInFlight=function(){
var now=null;
if(!dojo.hostenv._blockAsync&&!_285._blockAsync){
for(var x=this.inFlight.length-1;x>=0;x--){
var tif=this.inFlight[x];
if(!tif||tif.http._aborted||!tif.http.readyState){
this.inFlight.splice(x,1);
continue;
}
if(4==tif.http.readyState){
this.inFlight.splice(x,1);
doLoad(tif.req,tif.http,tif.url,tif.query,tif.useCache);
}else{
if(tif.startTime){
if(!now){
now=(new Date()).getTime();
}
if(tif.startTime+(tif.req.timeoutSeconds*1000)<now){
if(typeof tif.http.abort=="function"){
tif.http.abort();
}
this.inFlight.splice(x,1);
tif.req[(typeof tif.req.timeout=="function")?"timeout":"handle"]("timeout",null,tif.http,tif.req);
}
}
}
}
}
clearTimeout(this.inFlightTimer);
if(this.inFlight.length==0){
this.inFlightTimer=null;
return;
}
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
};
var _2a2=dojo.hostenv.getXmlhttpObject()?true:false;
this.canHandle=function(_2a3){
return _2a2&&dojo.lang.inArray(["text/plain","text/html","application/xml","text/xml","text/javascript","text/json"],(_2a3["mimetype"].toLowerCase()||""))&&!(_2a3["formNode"]&&dojo.io.formHasFile(_2a3["formNode"]));
};
this.multipartBoundary="45309FFF-BD65-4d50-99C9-36986896A96F";
this.bind=function(_2a4){
if(!_2a4["url"]){
if(!_2a4["formNode"]&&(_2a4["backButton"]||_2a4["back"]||_2a4["changeUrl"]||_2a4["watchForURL"])&&(!djConfig.preventBackButtonFix)){
dojo.deprecated("Using dojo.io.XMLHTTPTransport.bind() to add to browser history without doing an IO request","Use dojo.undo.browser.addToHistory() instead.","0.4");
dojo.undo.browser.addToHistory(_2a4);
return true;
}
}
var url=_2a4.url;
var _2a6="";
if(_2a4["formNode"]){
var ta=_2a4.formNode.getAttribute("action");
if((ta)&&(!_2a4["url"])){
url=ta;
}
var tp=_2a4.formNode.getAttribute("method");
if((tp)&&(!_2a4["method"])){
_2a4.method=tp;
}
_2a6+=dojo.io.encodeForm(_2a4.formNode,_2a4.encoding,_2a4["formFilter"]);
}
if(url.indexOf("#")>-1){
dojo.debug("Warning: dojo.io.bind: stripping hash values from url:",url);
url=url.split("#")[0];
}
if(_2a4["file"]){
_2a4.method="post";
}
if(!_2a4["method"]){
_2a4.method="get";
}
if(_2a4.method.toLowerCase()=="get"){
_2a4.multipart=false;
}else{
if(_2a4["file"]){
_2a4.multipart=true;
}else{
if(!_2a4["multipart"]){
_2a4.multipart=false;
}
}
}
if(_2a4["backButton"]||_2a4["back"]||_2a4["changeUrl"]){
dojo.undo.browser.addToHistory(_2a4);
}
var _2a9=_2a4["content"]||{};
if(_2a4.sendTransport){
_2a9["dojo.transport"]="xmlhttp";
}
do{
if(_2a4.postContent){
_2a6=_2a4.postContent;
break;
}
if(_2a9){
_2a6+=dojo.io.argsFromMap(_2a9,_2a4.encoding);
}
if(_2a4.method.toLowerCase()=="get"||!_2a4.multipart){
break;
}
var t=[];
if(_2a6.length){
var q=_2a6.split("&");
for(var i=0;i<q.length;++i){
if(q[i].length){
var p=q[i].split("=");
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+p[0]+"\"","",p[1]);
}
}
}
if(_2a4.file){
if(dojo.lang.isArray(_2a4.file)){
for(var i=0;i<_2a4.file.length;++i){
var o=_2a4.file[i];
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}else{
var o=_2a4.file;
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}
if(t.length){
t.push("--"+this.multipartBoundary+"--","");
_2a6=t.join("\r\n");
}
}while(false);
var _2af=_2a4["sync"]?false:true;
var _2b0=_2a4["preventCache"]||(this.preventCache==true&&_2a4["preventCache"]!=false);
var _2b1=_2a4["useCache"]==true||(this.useCache==true&&_2a4["useCache"]!=false);
if(!_2b0&&_2b1){
var _2b2=getFromCache(url,_2a6,_2a4.method);
if(_2b2){
doLoad(_2a4,_2b2,url,_2a6,false);
return;
}
}
var http=dojo.hostenv.getXmlhttpObject(_2a4);
var _2b4=false;
if(_2af){
var _2b5=this.inFlight.push({"req":_2a4,"http":http,"url":url,"query":_2a6,"useCache":_2b1,"startTime":_2a4.timeoutSeconds?(new Date()).getTime():0});
this.startWatchingInFlight();
}else{
_285._blockAsync=true;
}
if(_2a4.method.toLowerCase()=="post"){
http.open("POST",url,_2af);
setHeaders(http,_2a4);
http.setRequestHeader("Content-Type",_2a4.multipart?("multipart/form-data; boundary="+this.multipartBoundary):(_2a4.contentType||"application/x-www-form-urlencoded"));
try{
http.send(_2a6);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_2a4,{status:404},url,_2a6,_2b1);
}
}else{
var _2b6=url;
if(_2a6!=""){
_2b6+=(_2b6.indexOf("?")>-1?"&":"?")+_2a6;
}
if(_2b0){
_2b6+=(dojo.string.endsWithAny(_2b6,"?","&")?"":(_2b6.indexOf("?")>-1?"&":"?"))+"dojo.preventCache="+new Date().valueOf();
}
http.open(_2a4.method.toUpperCase(),_2b6,_2af);
setHeaders(http,_2a4);
try{
http.send(null);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_2a4,{status:404},url,_2a6,_2b1);
}
}
if(!_2af){
doLoad(_2a4,http,url,_2a6,_2b1);
_285._blockAsync=false;
}
_2a4.abort=function(){
try{
http._aborted=true;
}
catch(e){
}
return http.abort();
};
return;
};
dojo.io.transports.addTransport("XMLHTTPTransport");
};
dojo.provide("dojo.io.cookie");
dojo.io.cookie.setCookie=function(name,_2b8,days,path,_2bb,_2bc){
var _2bd=-1;
if(typeof days=="number"&&days>=0){
var d=new Date();
d.setTime(d.getTime()+(days*24*60*60*1000));
_2bd=d.toGMTString();
}
_2b8=escape(_2b8);
document.cookie=name+"="+_2b8+";"+(_2bd!=-1?" expires="+_2bd+";":"")+(path?"path="+path:"")+(_2bb?"; domain="+_2bb:"")+(_2bc?"; secure":"");
};
dojo.io.cookie.set=dojo.io.cookie.setCookie;
dojo.io.cookie.getCookie=function(name){
var idx=document.cookie.lastIndexOf(name+"=");
if(idx==-1){
return null;
}
var _2c1=document.cookie.substring(idx+name.length+1);
var end=_2c1.indexOf(";");
if(end==-1){
end=_2c1.length;
}
_2c1=_2c1.substring(0,end);
_2c1=unescape(_2c1);
return _2c1;
};
dojo.io.cookie.get=dojo.io.cookie.getCookie;
dojo.io.cookie.deleteCookie=function(name){
dojo.io.cookie.setCookie(name,"-",0);
};
dojo.io.cookie.setObjectCookie=function(name,obj,days,path,_2c8,_2c9,_2ca){
if(arguments.length==5){
_2ca=_2c8;
_2c8=null;
_2c9=null;
}
var _2cb=[],cookie,value="";
if(!_2ca){
cookie=dojo.io.cookie.getObjectCookie(name);
}
if(days>=0){
if(!cookie){
cookie={};
}
for(var prop in obj){
if(prop==null){
delete cookie[prop];
}else{
if(typeof obj[prop]=="string"||typeof obj[prop]=="number"){
cookie[prop]=obj[prop];
}
}
}
prop=null;
for(var prop in cookie){
_2cb.push(escape(prop)+"="+escape(cookie[prop]));
}
value=_2cb.join("&");
}
dojo.io.cookie.setCookie(name,value,days,path,_2c8,_2c9);
};
dojo.io.cookie.getObjectCookie=function(name){
var _2ce=null,cookie=dojo.io.cookie.getCookie(name);
if(cookie){
_2ce={};
var _2cf=cookie.split("&");
for(var i=0;i<_2cf.length;i++){
var pair=_2cf[i].split("=");
var _2d2=pair[1];
if(isNaN(_2d2)){
_2d2=unescape(pair[1]);
}
_2ce[unescape(pair[0])]=_2d2;
}
}
return _2ce;
};
dojo.io.cookie.isSupported=function(){
if(typeof navigator.cookieEnabled!="boolean"){
dojo.io.cookie.setCookie("__TestingYourBrowserForCookieSupport__","CookiesAllowed",90,null);
var _2d3=dojo.io.cookie.getCookie("__TestingYourBrowserForCookieSupport__");
navigator.cookieEnabled=(_2d3=="CookiesAllowed");
if(navigator.cookieEnabled){
this.deleteCookie("__TestingYourBrowserForCookieSupport__");
}
}
return navigator.cookieEnabled;
};
if(!dojo.io.cookies){
dojo.io.cookies=dojo.io.cookie;
}
dojo.provide("dojo.io.*");
dojo.provide("dojo.date");
dojo.date.setDayOfYear=function(_2d4,_2d5){
_2d4.setMonth(0);
_2d4.setDate(_2d5);
return _2d4;
};
dojo.date.getDayOfYear=function(_2d6){
var _2d7=new Date(_2d6.getFullYear(),0,1);
return Math.floor((_2d6.getTime()-_2d7.getTime())/86400000);
};
dojo.date.setWeekOfYear=function(_2d8,week,_2da){
if(arguments.length==1){
_2da=0;
}
dojo.unimplemented("dojo.date.setWeekOfYear");
};
dojo.date.getWeekOfYear=function(_2db,_2dc){
if(arguments.length==1){
_2dc=0;
}
var _2dd=new Date(_2db.getFullYear(),0,1);
var day=_2dd.getDay();
_2dd.setDate(_2dd.getDate()-day+_2dc-(day>_2dc?7:0));
return Math.floor((_2db.getTime()-_2dd.getTime())/604800000);
};
dojo.date.setIsoWeekOfYear=function(_2df,week,_2e1){
if(arguments.length==1){
_2e1=1;
}
dojo.unimplemented("dojo.date.setIsoWeekOfYear");
};
dojo.date.getIsoWeekOfYear=function(_2e2,_2e3){
if(arguments.length==1){
_2e3=1;
}
dojo.unimplemented("dojo.date.getIsoWeekOfYear");
};
dojo.date.setIso8601=function(_2e4,_2e5){
var _2e6=(_2e5.indexOf("T")==-1)?_2e5.split(" "):_2e5.split("T");
dojo.date.setIso8601Date(_2e4,_2e6[0]);
if(_2e6.length==2){
dojo.date.setIso8601Time(_2e4,_2e6[1]);
}
return _2e4;
};
dojo.date.fromIso8601=function(_2e7){
return dojo.date.setIso8601(new Date(0,0),_2e7);
};
dojo.date.setIso8601Date=function(_2e8,_2e9){
var _2ea="^([0-9]{4})((-?([0-9]{2})(-?([0-9]{2}))?)|"+"(-?([0-9]{3}))|(-?W([0-9]{2})(-?([1-7]))?))?$";
var d=_2e9.match(new RegExp(_2ea));
if(!d){
dojo.debug("invalid date string: "+_2e9);
return false;
}
var year=d[1];
var _2ed=d[4];
var date=d[6];
var _2ef=d[8];
var week=d[10];
var _2f1=(d[12])?d[12]:1;
_2e8.setYear(year);
if(_2ef){
dojo.date.setDayOfYear(_2e8,Number(_2ef));
}else{
if(week){
_2e8.setMonth(0);
_2e8.setDate(1);
var gd=_2e8.getDay();
var day=(gd)?gd:7;
var _2f4=Number(_2f1)+(7*Number(week));
if(day<=4){
_2e8.setDate(_2f4+1-day);
}else{
_2e8.setDate(_2f4+8-day);
}
}else{
if(_2ed){
_2e8.setDate(1);
_2e8.setMonth(_2ed-1);
}
if(date){
_2e8.setDate(date);
}
}
}
return _2e8;
};
dojo.date.fromIso8601Date=function(_2f5){
return dojo.date.setIso8601Date(new Date(0,0),_2f5);
};
dojo.date.setIso8601Time=function(_2f6,_2f7){
var _2f8="Z|(([-+])([0-9]{2})(:?([0-9]{2}))?)$";
var d=_2f7.match(new RegExp(_2f8));
var _2fa=0;
if(d){
if(d[0]!="Z"){
_2fa=(Number(d[3])*60)+Number(d[5]);
_2fa*=((d[2]=="-")?1:-1);
}
_2fa-=_2f6.getTimezoneOffset();
_2f7=_2f7.substr(0,_2f7.length-d[0].length);
}
var _2fb="^([0-9]{2})(:?([0-9]{2})(:?([0-9]{2})(.([0-9]+))?)?)?$";
var d=_2f7.match(new RegExp(_2fb));
if(!d){
dojo.debug("invalid time string: "+_2f7);
return false;
}
var _2fc=d[1];
var mins=Number((d[3])?d[3]:0);
var secs=(d[5])?d[5]:0;
var ms=d[7]?(Number("0."+d[7])*1000):0;
_2f6.setHours(_2fc);
_2f6.setMinutes(mins);
_2f6.setSeconds(secs);
_2f6.setMilliseconds(ms);
if(_2fa!=0){
_2f6.setTime(_2f6.getTime()+_2fa*60000);
}
return _2f6;
};
dojo.date.fromIso8601Time=function(_300){
return dojo.date.setIso8601Time(new Date(0,0),_300);
};
dojo.date.shortTimezones=["IDLW","BET","HST","MART","AKST","PST","MST","CST","EST","AST","NFT","BST","FST","AT","GMT","CET","EET","MSK","IRT","GST","AFT","AGTT","IST","NPT","ALMT","MMT","JT","AWST","JST","ACST","AEST","LHST","VUT","NFT","NZT","CHAST","PHOT","LINT"];
dojo.date.timezoneOffsets=[-720,-660,-600,-570,-540,-480,-420,-360,-300,-240,-210,-180,-120,-60,0,60,120,180,210,240,270,300,330,345,360,390,420,480,540,570,600,630,660,690,720,765,780,840];
dojo.date.months=["January","February","March","April","May","June","July","August","September","October","November","December"];
dojo.date.shortMonths=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
dojo.date.days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
dojo.date.shortDays=["Sun","Mon","Tues","Wed","Thur","Fri","Sat"];
dojo.date.getDaysInMonth=function(_301){
var _302=_301.getMonth();
var days=[31,28,31,30,31,30,31,31,30,31,30,31];
if(_302==1&&dojo.date.isLeapYear(_301)){
return 29;
}else{
return days[_302];
}
};
dojo.date.isLeapYear=function(_304){
var year=_304.getFullYear();
return (year%400==0)?true:(year%100==0)?false:(year%4==0)?true:false;
};
dojo.date.getDayName=function(_306){
return dojo.date.days[_306.getDay()];
};
dojo.date.getDayShortName=function(_307){
return dojo.date.shortDays[_307.getDay()];
};
dojo.date.getMonthName=function(_308){
return dojo.date.months[_308.getMonth()];
};
dojo.date.getMonthShortName=function(_309){
return dojo.date.shortMonths[_309.getMonth()];
};
dojo.date.getTimezoneName=function(_30a){
var _30b=-(_30a.getTimezoneOffset());
for(var i=0;i<dojo.date.timezoneOffsets.length;i++){
if(dojo.date.timezoneOffsets[i]==_30b){
return dojo.date.shortTimezones[i];
}
}
function $(s){
s=String(s);
while(s.length<2){
s="0"+s;
}
return s;
}
return (_30b<0?"-":"+")+$(Math.floor(Math.abs(_30b)/60))+":"+$(Math.abs(_30b)%60);
};
dojo.date.getOrdinal=function(_30e){
var date=_30e.getDate();
if(date%100!=11&&date%10==1){
return "st";
}else{
if(date%100!=12&&date%10==2){
return "nd";
}else{
if(date%100!=13&&date%10==3){
return "rd";
}else{
return "th";
}
}
}
};
dojo.date.format=dojo.date.strftime=function(_310,_311){
var _312=null;
function _(s,n){
s=String(s);
n=(n||2)-s.length;
while(n-->0){
s=(_312==null?"0":_312)+s;
}
return s;
}
function $(_315){
switch(_315){
case "a":
return dojo.date.getDayShortName(_310);
break;
case "A":
return dojo.date.getDayName(_310);
break;
case "b":
case "h":
return dojo.date.getMonthShortName(_310);
break;
case "B":
return dojo.date.getMonthName(_310);
break;
case "c":
return _310.toLocaleString();
break;
case "C":
return _(Math.floor(_310.getFullYear()/100));
break;
case "d":
return _(_310.getDate());
break;
case "D":
return $("m")+"/"+$("d")+"/"+$("y");
break;
case "e":
if(_312==null){
_312=" ";
}
return _(_310.getDate(),2);
break;
case "f":
if(_312==null){
_312=" ";
}
return _(_310.getMonth()+1,2);
break;
case "g":
break;
case "G":
break;
case "F":
return $("Y")+"-"+$("m")+"-"+$("d");
break;
case "H":
return _(_310.getHours());
break;
case "I":
return _(_310.getHours()%12||12);
break;
case "j":
return _(dojo.date.getDayOfYear(_310),3);
break;
case "m":
return _(_310.getMonth()+1);
break;
case "M":
return _(_310.getMinutes());
break;
case "n":
return "\n";
break;
case "p":
return _310.getHours()<12?"am":"pm";
break;
case "r":
return $("I")+":"+$("M")+":"+$("S")+" "+$("p");
break;
case "R":
return $("H")+":"+$("M");
break;
case "S":
return _(_310.getSeconds());
break;
case "t":
return "\t";
break;
case "T":
return $("H")+":"+$("M")+":"+$("S");
break;
case "u":
return String(_310.getDay()||7);
break;
case "U":
return _(dojo.date.getWeekOfYear(_310));
break;
case "V":
return _(dojo.date.getIsoWeekOfYear(_310));
break;
case "W":
return _(dojo.date.getWeekOfYear(_310,1));
break;
case "w":
return String(_310.getDay());
break;
case "x":
break;
case "X":
break;
case "y":
return _(_310.getFullYear()%100);
break;
case "Y":
return String(_310.getFullYear());
break;
case "z":
var _316=_310.getTimezoneOffset();
return (_316>0?"-":"+")+_(Math.floor(Math.abs(_316)/60))+":"+_(Math.abs(_316)%60);
break;
case "Z":
return dojo.date.getTimezoneName(_310);
break;
case "%":
return "%";
break;
}
}
var _317="";
var i=0,index=0,switchCase;
while((index=_311.indexOf("%",i))!=-1){
_317+=_311.substring(i,index++);
switch(_311.charAt(index++)){
case "_":
_312=" ";
break;
case "-":
_312="";
break;
case "0":
_312="0";
break;
case "^":
switchCase="upper";
break;
case "#":
switchCase="swap";
break;
default:
_312=null;
index--;
break;
}
var _319=$(_311.charAt(index++));
if(switchCase=="upper"||(switchCase=="swap"&&/[a-z]/.test(_319))){
_319=_319.toUpperCase();
}else{
if(switchCase=="swap"&&!/[a-z]/.test(_319)){
_319=_319.toLowerCase();
}
}
var _31a=null;
_317+=_319;
i=index;
}
_317+=_311.substring(i);
return _317;
};
dojo.date.compareTypes={DATE:1,TIME:2};
dojo.date.compare=function(_31b,_31c,_31d){
var dA=_31b;
var dB=_31c||new Date();
var now=new Date();
var opt=_31d||(dojo.date.compareTypes.DATE|dojo.date.compareTypes.TIME);
var d1=new Date(((opt&dojo.date.compareTypes.DATE)?(dA.getFullYear()):now.getFullYear()),((opt&dojo.date.compareTypes.DATE)?(dA.getMonth()):now.getMonth()),((opt&dojo.date.compareTypes.DATE)?(dA.getDate()):now.getDate()),((opt&dojo.date.compareTypes.TIME)?(dA.getHours()):0),((opt&dojo.date.compareTypes.TIME)?(dA.getMinutes()):0),((opt&dojo.date.compareTypes.TIME)?(dA.getSeconds()):0));
var d2=new Date(((opt&dojo.date.compareTypes.DATE)?(dB.getFullYear()):now.getFullYear()),((opt&dojo.date.compareTypes.DATE)?(dB.getMonth()):now.getMonth()),((opt&dojo.date.compareTypes.DATE)?(dB.getDate()):now.getDate()),((opt&dojo.date.compareTypes.TIME)?(dB.getHours()):0),((opt&dojo.date.compareTypes.TIME)?(dB.getMinutes()):0),((opt&dojo.date.compareTypes.TIME)?(dB.getSeconds()):0));
if(d1.valueOf()>d2.valueOf()){
return 1;
}
if(d1.valueOf()<d2.valueOf()){
return -1;
}
return 0;
};
dojo.date.dateParts={YEAR:0,MONTH:1,DAY:2,HOUR:3,MINUTE:4,SECOND:5,MILLISECOND:6};
dojo.date.add=function(d,unit,_326){
var n=(_326)?_326:1;
var v;
switch(unit){
case dojo.date.dateParts.YEAR:
v=new Date(d.getFullYear()+n,d.getMonth(),d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds(),d.getMilliseconds());
break;
case dojo.date.dateParts.MONTH:
v=new Date(d.getFullYear(),d.getMonth()+n,d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds(),d.getMilliseconds());
break;
case dojo.date.dateParts.HOUR:
v=new Date(d.getFullYear(),d.getMonth(),d.getDate(),d.getHours()+n,d.getMinutes(),d.getSeconds(),d.getMilliseconds());
break;
case dojo.date.dateParts.MINUTE:
v=new Date(d.getFullYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes()+n,d.getSeconds(),d.getMilliseconds());
break;
case dojo.date.dateParts.SECOND:
v=new Date(d.getFullYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds()+n,d.getMilliseconds());
break;
case dojo.date.dateParts.MILLISECOND:
v=new Date(d.getFullYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds(),d.getMilliseconds()+n);
break;
default:
v=new Date(d.getFullYear(),d.getMonth(),d.getDate()+n,d.getHours(),d.getMinutes(),d.getSeconds(),d.getMilliseconds());
}
return v;
};
dojo.date.toRelativeString=function(date){
var now=new Date();
var diff=(now-date)/1000;
var end=" ago";
var _32d=false;
if(diff<0){
_32d=true;
end=" from now";
diff=-diff;
}
if(diff<60){
diff=Math.round(diff);
return diff+" second"+(diff==1?"":"s")+end;
}
if(diff<60*60){
diff=Math.round(diff/60);
return diff+" minute"+(diff==1?"":"s")+end;
}
if(diff<60*60*24){
diff=Math.round(diff/3600);
return diff+" hour"+(diff==1?"":"s")+end;
}
if(diff<60*60*24*7){
diff=Math.round(diff/(3600*24));
if(diff==1){
return _32d?"Tomorrow":"Yesterday";
}else{
return diff+" days"+end;
}
}
return dojo.date.toShortDateString(date);
};
dojo.date.toSql=function(date,_32f){
return dojo.date.format(date,"%F"+!_32f?" %T":"");
};
dojo.date.fromSql=function(_330){
var _331=_330.split(/[\- :]/g);
while(_331.length<6){
_331.push(0);
}
return new Date(_331[0],(parseInt(_331[1],10)-1),_331[2],_331[3],_331[4],_331[5]);
};
dojo.provide("dojo.xml.Parse");
dojo.xml.Parse=function(){
function getDojoTagName(node){
var _333=node.tagName;
if(dojo.render.html.capable&&dojo.render.html.ie&&node.scopeName!="HTML"){
_333=node.scopeName+":"+_333;
}
if(_333.substr(0,5).toLowerCase()=="dojo:"){
return _333.toLowerCase();
}
if(_333.substr(0,4).toLowerCase()=="dojo"){
return "dojo:"+_333.substring(4).toLowerCase();
}
var djt=node.getAttribute("dojoType")||node.getAttribute("dojotype");
if(djt){
if(djt.indexOf(":")<0){
djt="dojo:"+djt;
}
return djt.toLowerCase();
}
if(node.getAttributeNS&&node.getAttributeNS(dojo.dom.dojoml,"type")){
return "dojo:"+node.getAttributeNS(dojo.dom.dojoml,"type").toLowerCase();
}
try{
djt=node.getAttribute("dojo:type");
}
catch(e){
}
if(djt){
return "dojo:"+djt.toLowerCase();
}
if(!dj_global["djConfig"]||!djConfig["ignoreClassNames"]){
var _335=node.className||node.getAttribute("class");
if(_335&&_335.indexOf&&_335.indexOf("dojo-")!=-1){
var _336=_335.split(" ");
for(var x=0;x<_336.length;x++){
if(_336[x].length>5&&_336[x].indexOf("dojo-")>=0){
return "dojo:"+_336[x].substr(5).toLowerCase();
}
}
}
}
return _333.toLowerCase();
}
this.parseElement=function(node,_339,_33a,_33b){
var _33c={};
if(node.tagName&&node.tagName.indexOf("/")==0){
return null;
}
var _33d=getDojoTagName(node);
_33c[_33d]=[];
if(_33d.substr(0,4).toLowerCase()=="dojo"){
_33c.namespace="dojo";
}else{
var pos=_33d.indexOf(":");
if(pos>0){
_33c.namespace=_33d.substring(0,pos);
}
}
var _33f=false;
if(!_33a){
_33f=true;
}else{
if(_33c.namespace&&dojo.getNamespace(_33c.namespace)){
_33f=true;
}else{
if(dojo.widget.tags[_33d]){
dojo.deprecated("dojo.xml.Parse.parseElement","Widgets should be placed in a defined namespace","0.5");
_33f=true;
}
}
}
if(_33f){
var _340=this.parseAttributes(node);
for(var attr in _340){
if((!_33c[_33d][attr])||(typeof _33c[_33d][attr]!="array")){
_33c[_33d][attr]=[];
}
_33c[_33d][attr].push(_340[attr]);
}
_33c[_33d].nodeRef=node;
_33c.tagName=_33d;
_33c.index=_33b||0;
}
var _342=0;
for(var i=0;i<node.childNodes.length;i++){
var tcn=node.childNodes.item(i);
switch(tcn.nodeType){
case dojo.dom.ELEMENT_NODE:
_342++;
var ctn=getDojoTagName(tcn);
if(!_33c[ctn]){
_33c[ctn]=[];
}
_33c[ctn].push(this.parseElement(tcn,true,_33a,_342));
if((tcn.childNodes.length==1)&&(tcn.childNodes.item(0).nodeType==dojo.dom.TEXT_NODE)){
_33c[ctn][_33c[ctn].length-1].value=tcn.childNodes.item(0).nodeValue;
}
break;
case dojo.dom.TEXT_NODE:
if(node.childNodes.length==1){
_33c[_33d].push({value:node.childNodes.item(0).nodeValue});
}
break;
default:
break;
}
}
return _33c;
};
this.parseAttributes=function(node){
var _347={};
var atts=node.attributes;
var _349,i=0;
while((_349=atts[i++])){
if((dojo.render.html.capable)&&(dojo.render.html.ie)){
if(!_349){
continue;
}
if((typeof _349=="object")&&(typeof _349.nodeValue=="undefined")||(_349.nodeValue==null)||(_349.nodeValue=="")){
continue;
}
}
var nn=_349.nodeName.split(":");
nn=(nn.length==2)?nn[1]:_349.nodeName;
_347[nn]={value:_349.nodeValue};
}
return _347;
};
};
dojo.provide("dojo.lang.declare");
dojo.lang.declare=function(_34b,_34c,init,_34e){
if((dojo.lang.isFunction(_34e))||((!_34e)&&(!dojo.lang.isFunction(init)))){
var temp=_34e;
_34e=init;
init=temp;
}
var _350=[];
if(dojo.lang.isArray(_34c)){
_350=_34c;
_34c=_350.shift();
}
if(!init){
init=dojo.evalObjPath(_34b,false);
if((init)&&(!dojo.lang.isFunction(init))){
init=null;
}
}
var ctor=dojo.lang.declare._makeConstructor();
var scp=(_34c?_34c.prototype:null);
if(scp){
scp.prototyping=true;
ctor.prototype=new _34c();
scp.prototyping=false;
}
ctor.superclass=scp;
ctor.mixins=_350;
for(var i=0,l=_350.length;i<l;i++){
dojo.lang.extend(ctor,_350[i].prototype);
}
ctor.prototype.initializer=null;
ctor.prototype.declaredClass=_34b;
if(dojo.lang.isArray(_34e)){
dojo.lang.extend.apply(dojo.lang,[ctor].concat(_34e));
}else{
dojo.lang.extend(ctor,(_34e)||{});
}
dojo.lang.extend(ctor,dojo.lang.declare.base);
ctor.prototype.constructor=ctor;
ctor.prototype.initializer=(ctor.prototype.initializer)||(init)||(function(){
});
dojo.lang.setObjPathValue(_34b,ctor,null,true);
return ctor;
};
dojo.lang.declare._makeConstructor=function(){
return function(){
var self=this._getPropContext();
var s=self.constructor.superclass;
if((s)&&(s.constructor)){
if(s.constructor==arguments.callee){
this.inherited("constructor",arguments);
}else{
this._inherited(s,"constructor",arguments);
}
}
var m=(self.constructor.mixins)||([]);
for(var i=0,l=m.length;i<l;i++){
(((m[i].prototype)&&(m[i].prototype.initializer))||(m[i])).apply(this,arguments);
}
if((!this.prototyping)&&(self.initializer)){
self.initializer.apply(this,arguments);
}
};
};
dojo.lang.declare.base={_getPropContext:function(){
return (this.___proto||this);
},_inherited:function(_358,_359,args){
var _35b,stack=this.___proto;
this.___proto=_358;
try{
_35b=_358[_359].apply(this,(args||[]));
}
catch(e){
throw e;
}
finally{
this.___proto=stack;
}
return _35b;
},inheritedFrom:function(ctor,prop,args){
var p=((ctor)&&(ctor.prototype)&&(ctor.prototype[prop]));
return (dojo.lang.isFunction(p)?p.apply(this,(args||[])):p);
},inherited:function(prop,args){
var p=this._getPropContext();
do{
if((!p.constructor)||(!p.constructor.superclass)){
return;
}
p=p.constructor.superclass;
}while(!(prop in p));
return (dojo.lang.isFunction(p[prop])?this._inherited(p,prop,args):p[prop]);
}};
dojo.declare=dojo.lang.declare;
dojo.provide("dojo.event");
dojo.event=new function(){
this.canTimeout=dojo.lang.isFunction(dj_global["setTimeout"])||dojo.lang.isAlien(dj_global["setTimeout"]);
function interpolateArgs(args,_364){
var dl=dojo.lang;
var ao={srcObj:dj_global,srcFunc:null,adviceObj:dj_global,adviceFunc:null,aroundObj:null,aroundFunc:null,adviceType:(args.length>2)?args[0]:"after",precedence:"last",once:false,delay:null,rate:0,adviceMsg:false};
switch(args.length){
case 0:
return;
case 1:
return;
case 2:
ao.srcFunc=args[0];
ao.adviceFunc=args[1];
break;
case 3:
if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isString(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((dl.isString(args[1]))&&(dl.isString(args[2]))){
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isFunction(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
var _367=dl.nameAnonFunc(args[2],ao.adviceObj,_364);
ao.adviceFunc=_367;
}else{
if((dl.isFunction(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))){
ao.adviceType="after";
ao.srcObj=dj_global;
var _367=dl.nameAnonFunc(args[0],ao.srcObj,_364);
ao.srcFunc=_367;
ao.adviceObj=args[1];
ao.adviceFunc=args[2];
}
}
}
}
break;
case 4:
if((dl.isObject(args[0]))&&(dl.isObject(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isString(args[1]))&&(dl.isObject(args[2]))){
ao.adviceType=args[0];
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isFunction(args[1]))&&(dl.isObject(args[2]))){
ao.adviceType=args[0];
ao.srcObj=dj_global;
var _367=dl.nameAnonFunc(args[1],dj_global,_364);
ao.srcFunc=_367;
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))&&(dl.isFunction(args[3]))){
ao.srcObj=args[1];
ao.srcFunc=args[2];
var _367=dl.nameAnonFunc(args[3],dj_global,_364);
ao.adviceObj=dj_global;
ao.adviceFunc=_367;
}else{
if(dl.isObject(args[1])){
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=dj_global;
ao.adviceFunc=args[3];
}else{
if(dl.isObject(args[2])){
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
ao.srcObj=ao.adviceObj=ao.aroundObj=dj_global;
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
ao.aroundFunc=args[3];
}
}
}
}
}
}
break;
case 6:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundFunc=args[5];
ao.aroundObj=dj_global;
break;
default:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundObj=args[5];
ao.aroundFunc=args[6];
ao.once=args[7];
ao.delay=args[8];
ao.rate=args[9];
ao.adviceMsg=args[10];
break;
}
if(dl.isFunction(ao.aroundFunc)){
var _367=dl.nameAnonFunc(ao.aroundFunc,ao.aroundObj,_364);
ao.aroundFunc=_367;
}
if(dl.isFunction(ao.srcFunc)){
ao.srcFunc=dl.getNameInObj(ao.srcObj,ao.srcFunc);
}
if(dl.isFunction(ao.adviceFunc)){
ao.adviceFunc=dl.getNameInObj(ao.adviceObj,ao.adviceFunc);
}
if((ao.aroundObj)&&(dl.isFunction(ao.aroundFunc))){
ao.aroundFunc=dl.getNameInObj(ao.aroundObj,ao.aroundFunc);
}
if(!ao.srcObj){
dojo.raise("bad srcObj for srcFunc: "+ao.srcFunc);
}
if(!ao.adviceObj){
dojo.raise("bad adviceObj for adviceFunc: "+ao.adviceFunc);
}
if(!ao.adviceFunc){
dojo.debug("bad adviceFunc for srcFunc: "+ao.srcFunc);
dojo.debugShallow(ao);
}
return ao;
}
this.connect=function(){
if(arguments.length==1){
var ao=arguments[0];
}else{
var ao=interpolateArgs(arguments,true);
}
if(dojo.lang.isArray(ao.srcObj)&&ao.srcObj!=""){
var _369={};
for(var x in ao){
_369[x]=ao[x];
}
var mjps=[];
dojo.lang.forEach(ao.srcObj,function(src){
if((dojo.render.html.capable)&&(dojo.lang.isString(src))){
src=dojo.byId(src);
}
_369.srcObj=src;
mjps.push(dojo.event.connect.call(dojo.event,_369));
});
return mjps;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc);
if(ao.adviceFunc){
var mjp2=dojo.event.MethodJoinPoint.getForMethod(ao.adviceObj,ao.adviceFunc);
}
mjp.kwAddAdvice(ao);
return mjp;
};
this.log=function(a1,a2){
var _371;
if((arguments.length==1)&&(typeof a1=="object")){
_371=a1;
}else{
_371={srcObj:a1,srcFunc:a2};
}
_371.adviceFunc=function(){
var _372=[];
for(var x=0;x<arguments.length;x++){
_372.push(arguments[x]);
}
dojo.debug("("+_371.srcObj+")."+_371.srcFunc,":",_372.join(", "));
};
this.kwConnect(_371);
};
this.connectBefore=function(){
var args=["before"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectAround=function(){
var args=["around"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectOnce=function(){
var ao=interpolateArgs(arguments,true);
ao.once=true;
return this.connect(ao);
};
this._kwConnectImpl=function(_379,_37a){
var fn=(_37a)?"disconnect":"connect";
if(typeof _379["srcFunc"]=="function"){
_379.srcObj=_379["srcObj"]||dj_global;
var _37c=dojo.lang.nameAnonFunc(_379.srcFunc,_379.srcObj,true);
_379.srcFunc=_37c;
}
if(typeof _379["adviceFunc"]=="function"){
_379.adviceObj=_379["adviceObj"]||dj_global;
var _37c=dojo.lang.nameAnonFunc(_379.adviceFunc,_379.adviceObj,true);
_379.adviceFunc=_37c;
}
return dojo.event[fn]((_379["type"]||_379["adviceType"]||"after"),_379["srcObj"]||dj_global,_379["srcFunc"],_379["adviceObj"]||_379["targetObj"]||dj_global,_379["adviceFunc"]||_379["targetFunc"],_379["aroundObj"],_379["aroundFunc"],_379["once"],_379["delay"],_379["rate"],_379["adviceMsg"]||false);
};
this.kwConnect=function(_37d){
return this._kwConnectImpl(_37d,false);
};
this.disconnect=function(){
var ao=interpolateArgs(arguments,true);
if(!ao.adviceFunc){
return;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc);
return mjp.removeAdvice(ao.adviceObj,ao.adviceFunc,ao.adviceType,ao.once);
};
this.kwDisconnect=function(_380){
return this._kwConnectImpl(_380,true);
};
};
dojo.event.MethodInvocation=function(_381,obj,args){
this.jp_=_381;
this.object=obj;
this.args=[];
for(var x=0;x<args.length;x++){
this.args[x]=args[x];
}
this.around_index=-1;
};
dojo.event.MethodInvocation.prototype.proceed=function(){
this.around_index++;
if(this.around_index>=this.jp_.around.length){
return this.jp_.object[this.jp_.methodname].apply(this.jp_.object,this.args);
}else{
var ti=this.jp_.around[this.around_index];
var mobj=ti[0]||dj_global;
var meth=ti[1];
return mobj[meth].call(mobj,this);
}
};
dojo.event.MethodJoinPoint=function(obj,_389){
this.object=obj||dj_global;
this.methodname=_389;
this.methodfunc=this.object[_389];
this.before=[];
this.after=[];
this.around=[];
};
dojo.event.MethodJoinPoint.getForMethod=function(obj,_38b){
if(!obj){
obj=dj_global;
}
if(!obj[_38b]){
obj[_38b]=function(){
};
if(!obj[_38b]){
dojo.raise("Cannot set do-nothing method on that object "+_38b);
}
}else{
if((!dojo.lang.isFunction(obj[_38b]))&&(!dojo.lang.isAlien(obj[_38b]))){
return null;
}
}
var _38c=_38b+"$joinpoint";
var _38d=_38b+"$joinpoint$method";
var _38e=obj[_38c];
if(!_38e){
var _38f=false;
if(dojo.event["browser"]){
if((obj["attachEvent"])||(obj["nodeType"])||(obj["addEventListener"])){
_38f=true;
dojo.event.browser.addClobberNodeAttrs(obj,[_38c,_38d,_38b]);
}
}
var _390=obj[_38b].length;
obj[_38d]=obj[_38b];
_38e=obj[_38c]=new dojo.event.MethodJoinPoint(obj,_38d);
obj[_38b]=function(){
var args=[];
if((_38f)&&(!arguments.length)){
var evt=null;
try{
if(obj.ownerDocument){
evt=obj.ownerDocument.parentWindow.event;
}else{
if(obj.documentElement){
evt=obj.documentElement.ownerDocument.parentWindow.event;
}else{
if(obj.event){
evt=obj.event;
}else{
evt=window.event;
}
}
}
}
catch(e){
evt=window.event;
}
if(evt){
args.push(dojo.event.browser.fixEvent(evt,this));
}
}else{
for(var x=0;x<arguments.length;x++){
if((x==0)&&(_38f)&&(dojo.event.browser.isEvent(arguments[x]))){
args.push(dojo.event.browser.fixEvent(arguments[x],this));
}else{
args.push(arguments[x]);
}
}
}
return _38e.run.apply(_38e,args);
};
obj[_38b].__preJoinArity=_390;
}
return _38e;
};
dojo.lang.extend(dojo.event.MethodJoinPoint,{unintercept:function(){
this.object[this.methodname]=this.methodfunc;
this.before=[];
this.after=[];
this.around=[];
},disconnect:dojo.lang.forward("unintercept"),run:function(){
var obj=this.object||dj_global;
var args=arguments;
var _396=[];
for(var x=0;x<args.length;x++){
_396[x]=args[x];
}
var _398=function(marr){
if(!marr){
dojo.debug("Null argument to unrollAdvice()");
return;
}
var _39a=marr[0]||dj_global;
var _39b=marr[1];
if(!_39a[_39b]){
dojo.raise("function \""+_39b+"\" does not exist on \""+_39a+"\"");
}
var _39c=marr[2]||dj_global;
var _39d=marr[3];
var msg=marr[6];
var _39f;
var to={args:[],jp_:this,object:obj,proceed:function(){
return _39a[_39b].apply(_39a,to.args);
}};
to.args=_396;
var _3a1=parseInt(marr[4]);
var _3a2=((!isNaN(_3a1))&&(marr[4]!==null)&&(typeof marr[4]!="undefined"));
if(marr[5]){
var rate=parseInt(marr[5]);
var cur=new Date();
var _3a5=false;
if((marr["last"])&&((cur-marr.last)<=rate)){
if(dojo.event.canTimeout){
if(marr["delayTimer"]){
clearTimeout(marr.delayTimer);
}
var tod=parseInt(rate*2);
var mcpy=dojo.lang.shallowCopy(marr);
marr.delayTimer=setTimeout(function(){
mcpy[5]=0;
_398(mcpy);
},tod);
}
return;
}else{
marr.last=cur;
}
}
if(_39d){
_39c[_39d].call(_39c,to);
}else{
if((_3a2)&&((dojo.render.html)||(dojo.render.svg))){
dj_global["setTimeout"](function(){
if(msg){
_39a[_39b].call(_39a,to);
}else{
_39a[_39b].apply(_39a,args);
}
},_3a1);
}else{
if(msg){
_39a[_39b].call(_39a,to);
}else{
_39a[_39b].apply(_39a,args);
}
}
}
};
if(this.before.length>0){
dojo.lang.forEach(this.before.concat(new Array()),_398);
}
var _3a8;
if(this.around.length>0){
var mi=new dojo.event.MethodInvocation(this,obj,args);
_3a8=mi.proceed();
}else{
if(this.methodfunc){
_3a8=this.object[this.methodname].apply(this.object,args);
}
}
if(this.after.length>0){
dojo.lang.forEach(this.after.concat(new Array()),_398);
}
return (this.methodfunc)?_3a8:null;
},getArr:function(kind){
var arr=this.after;
if((typeof kind=="string")&&(kind.indexOf("before")!=-1)){
arr=this.before;
}else{
if(kind=="around"){
arr=this.around;
}
}
return arr;
},kwAddAdvice:function(args){
this.addAdvice(args["adviceObj"],args["adviceFunc"],args["aroundObj"],args["aroundFunc"],args["adviceType"],args["precedence"],args["once"],args["delay"],args["rate"],args["adviceMsg"]);
},addAdvice:function(_3ad,_3ae,_3af,_3b0,_3b1,_3b2,once,_3b4,rate,_3b6){
var arr=this.getArr(_3b1);
if(!arr){
dojo.raise("bad this: "+this);
}
var ao=[_3ad,_3ae,_3af,_3b0,_3b4,rate,_3b6];
if(once){
if(this.hasAdvice(_3ad,_3ae,_3b1,arr)>=0){
return;
}
}
if(_3b2=="first"){
arr.unshift(ao);
}else{
arr.push(ao);
}
},hasAdvice:function(_3b9,_3ba,_3bb,arr){
if(!arr){
arr=this.getArr(_3bb);
}
var ind=-1;
for(var x=0;x<arr.length;x++){
var aao=(typeof _3ba=="object")?(new String(_3ba)).toString():_3ba;
var a1o=(typeof arr[x][1]=="object")?(new String(arr[x][1])).toString():arr[x][1];
if((arr[x][0]==_3b9)&&(a1o==aao)){
ind=x;
}
}
return ind;
},removeAdvice:function(_3c1,_3c2,_3c3,once){
var arr=this.getArr(_3c3);
var ind=this.hasAdvice(_3c1,_3c2,_3c3,arr);
if(ind==-1){
return false;
}
while(ind!=-1){
arr.splice(ind,1);
if(once){
break;
}
ind=this.hasAdvice(_3c1,_3c2,_3c3,arr);
}
return true;
}});
dojo.provide("dojo.event.topic");
dojo.event.topic=new function(){
this.topics={};
this.getTopic=function(_3c7){
if(!this.topics[_3c7]){
this.topics[_3c7]=new this.TopicImpl(_3c7);
}
return this.topics[_3c7];
};
this.registerPublisher=function(_3c8,obj,_3ca){
var _3c8=this.getTopic(_3c8);
_3c8.registerPublisher(obj,_3ca);
};
this.subscribe=function(_3cb,obj,_3cd){
var _3cb=this.getTopic(_3cb);
_3cb.subscribe(obj,_3cd);
};
this.unsubscribe=function(_3ce,obj,_3d0){
var _3ce=this.getTopic(_3ce);
_3ce.unsubscribe(obj,_3d0);
};
this.destroy=function(_3d1){
this.getTopic(_3d1).destroy();
delete this.topics[_3d1];
};
this.publishApply=function(_3d2,args){
var _3d2=this.getTopic(_3d2);
_3d2.sendMessage.apply(_3d2,args);
};
this.publish=function(_3d4,_3d5){
var _3d4=this.getTopic(_3d4);
var args=[];
for(var x=1;x<arguments.length;x++){
args.push(arguments[x]);
}
_3d4.sendMessage.apply(_3d4,args);
};
};
dojo.event.topic.TopicImpl=function(_3d8){
this.topicName=_3d8;
this.subscribe=function(_3d9,_3da){
var tf=_3da||_3d9;
var to=(!_3da)?dj_global:_3d9;
dojo.event.kwConnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
};
this.unsubscribe=function(_3dd,_3de){
var tf=(!_3de)?_3dd:_3de;
var to=(!_3de)?null:_3dd;
dojo.event.kwDisconnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
};
this.destroy=function(){
dojo.event.MethodJoinPoint.getForMethod(this,"sendMessage").disconnect();
};
this.registerPublisher=function(_3e1,_3e2){
dojo.event.connect(_3e1,_3e2,this,"sendMessage");
};
this.sendMessage=function(_3e3){
};
};
dojo.provide("dojo.event.browser");
dojo._ie_clobber=new function(){
this.clobberNodes=[];
function nukeProp(node,prop){
try{
node[prop]=null;
}
catch(e){
}
try{
delete node[prop];
}
catch(e){
}
try{
node.removeAttribute(prop);
}
catch(e){
}
}
this.clobber=function(_3e6){
var na;
var tna;
if(_3e6){
tna=_3e6.all||_3e6.getElementsByTagName("*");
na=[_3e6];
for(var x=0;x<tna.length;x++){
if(tna[x]["__doClobber__"]){
na.push(tna[x]);
}
}
}else{
try{
window.onload=null;
}
catch(e){
}
na=(this.clobberNodes.length)?this.clobberNodes:document.all;
}
tna=null;
var _3ea={};
for(var i=na.length-1;i>=0;i=i-1){
var el=na[i];
if(el["__clobberAttrs__"]){
for(var j=0;j<el.__clobberAttrs__.length;j++){
nukeProp(el,el.__clobberAttrs__[j]);
}
nukeProp(el,"__clobberAttrs__");
nukeProp(el,"__doClobber__");
}
}
na=null;
};
};
if(dojo.render.html.ie){
dojo.addOnUnload(function(){
dojo._ie_clobber.clobber();
try{
if((dojo["widget"])&&(dojo.widget["manager"])){
dojo.widget.manager.destroyAll();
}
}
catch(e){
}
try{
window.onload=null;
}
catch(e){
}
try{
window.onunload=null;
}
catch(e){
}
dojo._ie_clobber.clobberNodes=[];
});
}
dojo.event.browser=new function(){
var _3ee=0;
this.clean=function(node){
if(dojo.render.html.ie){
dojo._ie_clobber.clobber(node);
}
};
this.addClobberNode=function(node){
if(!dojo.render.html.ie){
return;
}
if(!node["__doClobber__"]){
node.__doClobber__=true;
dojo._ie_clobber.clobberNodes.push(node);
node.__clobberAttrs__=[];
}
};
this.addClobberNodeAttrs=function(node,_3f2){
if(!dojo.render.html.ie){
return;
}
this.addClobberNode(node);
for(var x=0;x<_3f2.length;x++){
node.__clobberAttrs__.push(_3f2[x]);
}
};
this.removeListener=function(node,_3f5,fp,_3f7){
if(!_3f7){
var _3f7=false;
}
_3f5=_3f5.toLowerCase();
if(_3f5.substr(0,2)=="on"){
_3f5=_3f5.substr(2);
}
if(node.removeEventListener){
node.removeEventListener(_3f5,fp,_3f7);
}
};
this.addListener=function(node,_3f9,fp,_3fb,_3fc){
if(!node){
return;
}
if(!_3fb){
var _3fb=false;
}
_3f9=_3f9.toLowerCase();
if(_3f9.substr(0,2)!="on"){
_3f9="on"+_3f9;
}
if(!_3fc){
var _3fd=function(evt){
if(!evt){
evt=window.event;
}
var ret=fp(dojo.event.browser.fixEvent(evt,this));
if(_3fb){
dojo.event.browser.stopEvent(evt);
}
return ret;
};
}else{
_3fd=fp;
}
if(node.addEventListener){
node.addEventListener(_3f9.substr(2),_3fd,_3fb);
return _3fd;
}else{
if(typeof node[_3f9]=="function"){
var _400=node[_3f9];
node[_3f9]=function(e){
_400(e);
return _3fd(e);
};
}else{
node[_3f9]=_3fd;
}
if(dojo.render.html.ie){
this.addClobberNodeAttrs(node,[_3f9]);
}
return _3fd;
}
};
this.isEvent=function(obj){
return (typeof obj!="undefined")&&(typeof Event!="undefined")&&(obj.eventPhase);
};
this.currentEvent=null;
this.callListener=function(_403,_404){
if(typeof _403!="function"){
dojo.raise("listener not a function: "+_403);
}
dojo.event.browser.currentEvent.currentTarget=_404;
return _403.call(_404,dojo.event.browser.currentEvent);
};
this.stopPropagation=function(){
dojo.event.browser.currentEvent.cancelBubble=true;
};
this.preventDefault=function(){
dojo.event.browser.currentEvent.returnValue=false;
};
this.keys={KEY_BACKSPACE:8,KEY_TAB:9,KEY_ENTER:13,KEY_SHIFT:16,KEY_CTRL:17,KEY_ALT:18,KEY_PAUSE:19,KEY_CAPS_LOCK:20,KEY_ESCAPE:27,KEY_SPACE:32,KEY_PAGE_UP:33,KEY_PAGE_DOWN:34,KEY_END:35,KEY_HOME:36,KEY_LEFT_ARROW:37,KEY_UP_ARROW:38,KEY_RIGHT_ARROW:39,KEY_DOWN_ARROW:40,KEY_INSERT:45,KEY_DELETE:46,KEY_LEFT_WINDOW:91,KEY_RIGHT_WINDOW:92,KEY_SELECT:93,KEY_F1:112,KEY_F2:113,KEY_F3:114,KEY_F4:115,KEY_F5:116,KEY_F6:117,KEY_F7:118,KEY_F8:119,KEY_F9:120,KEY_F10:121,KEY_F11:122,KEY_F12:123,KEY_NUM_LOCK:144,KEY_SCROLL_LOCK:145};
this.revKeys=[];
for(var key in this.keys){
this.revKeys[this.keys[key]]=key;
}
this.fixEvent=function(evt,_407){
if(!evt){
if(window["event"]){
evt=window.event;
}
}
if((evt["type"])&&(evt["type"].indexOf("key")==0)){
evt.keys=this.revKeys;
for(var key in this.keys){
evt[key]=this.keys[key];
}
if((dojo.render.html.ie)&&(evt["type"]=="keypress")){
evt.charCode=evt.keyCode;
}
}
if(dojo.render.html.ie){
if(!evt.target){
evt.target=evt.srcElement;
}
if(!evt.currentTarget){
evt.currentTarget=(_407?_407:evt.srcElement);
}
if(!evt.layerX){
evt.layerX=evt.offsetX;
}
if(!evt.layerY){
evt.layerY=evt.offsetY;
}
var doc=(evt.srcElement&&evt.srcElement.ownerDocument)?evt.srcElement.ownerDocument:document;
var _40a=((dojo.render.html.ie55)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;
if(!evt.pageX){
evt.pageX=evt.clientX+(_40a.scrollLeft||0);
}
if(!evt.pageY){
evt.pageY=evt.clientY+(_40a.scrollTop||0);
}
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
this.currentEvent=evt;
evt.callListener=this.callListener;
evt.stopPropagation=this.stopPropagation;
evt.preventDefault=this.preventDefault;
}
return evt;
};
this.stopEvent=function(ev){
if(window.event){
ev.returnValue=false;
ev.cancelBubble=true;
}else{
ev.preventDefault();
ev.stopPropagation();
}
};
};
dojo.provide("dojo.event.*");
dojo.provide("dojo.widget.Manager");
dojo.widget.manager=new function(){
this.widgets=[];
this.widgetIds=[];
this.topWidgets={};
var _40c={};
var _40d=[];
this.getUniqueId=function(_40e){
return _40e+"_"+(_40c[_40e]!=undefined?++_40c[_40e]:_40c[_40e]=0);
};
this.add=function(_40f){
this.widgets.push(_40f);
if(!_40f.extraArgs["id"]){
_40f.extraArgs["id"]=_40f.extraArgs["ID"];
}
if(_40f.widgetId==""){
if(_40f["id"]){
_40f.widgetId=_40f["id"];
}else{
if(_40f.extraArgs["id"]){
_40f.widgetId=_40f.extraArgs["id"];
}else{
_40f.widgetId=this.getUniqueId(_40f.widgetType);
}
}
}
if(this.widgetIds[_40f.widgetId]){
dojo.debug("widget ID collision on ID: "+_40f.widgetId);
}
this.widgetIds[_40f.widgetId]=_40f;
};
this.destroyAll=function(){
for(var x=this.widgets.length-1;x>=0;x--){
try{
this.widgets[x].destroy(true);
delete this.widgets[x];
}
catch(e){
}
}
};
this.remove=function(_411){
if(dojo.lang.isNumber(_411)){
var tw=this.widgets[_411].widgetId;
delete this.widgetIds[tw];
this.widgets.splice(_411,1);
}else{
this.removeById(_411);
}
};
this.removeById=function(id){
if(!dojo.lang.isString(id)){
id=id["widgetId"];
if(!id){
dojo.debug("invalid widget or id passed to removeById");
return;
}
}
for(var i=0;i<this.widgets.length;i++){
if(this.widgets[i].widgetId==id){
this.remove(i);
break;
}
}
};
this.getWidgetById=function(id){
if(dojo.lang.isString(id)){
return this.widgetIds[id];
}
return id;
};
this.getWidgetsByType=function(type){
var lt=type.toLowerCase();
var ret=[];
dojo.lang.forEach(this.widgets,function(x){
if(x.widgetType.toLowerCase()==lt){
ret.push(x);
}
});
return ret;
};
this.getWidgetsByFilter=function(_41a,_41b){
var ret=[];
dojo.lang.every(this.widgets,function(x){
if(_41a(x)){
ret.push(x);
if(_41b){
return false;
}
}
return true;
});
return (_41b?ret[0]:ret);
};
this.getAllWidgets=function(){
return this.widgets.concat();
};
this.getWidgetByNode=function(node){
var w=this.getAllWidgets();
node=dojo.byId(node);
for(var i=0;i<w.length;i++){
if(w[i].domNode==node){
return w[i];
}
}
return null;
};
this.byId=this.getWidgetById;
this.byType=this.getWidgetsByType;
this.byFilter=this.getWidgetsByFilter;
this.byNode=this.getWidgetByNode;
var _421={};
var _422=["dojo.widget"];
for(var i=0;i<_422.length;i++){
_422[_422[i]]=true;
}
this.registerWidgetPackage=function(_424){
if(!_422[_424]){
_422[_424]=true;
_422.push(_424);
}
};
this.getWidgetPackageList=function(){
return dojo.lang.map(_422,function(elt){
return (elt!==true?elt:undefined);
});
};
this.getImplementation=function(_426,_427,_428,ns){
var impl=this.getImplementationName(_426,ns);
if(impl){
var ret=_427?new impl(ctor):new impl();
return ret;
}
};
this.getImplementationName=function(_42c,ns){
if(!ns){
ns="dojo";
}
var _42e=_42c.toLowerCase();
if(!_421[ns]){
_421[ns]={};
}
var impl=_421[ns][_42e];
if(impl){
return impl;
}
var _430=dojo.getNamespace(ns);
if(_430){
_430.load(_42c);
}
if(!_40d.length){
for(var _431 in dojo.render){
if(dojo.render[_431]["capable"]===true){
var _432=dojo.render[_431].prefixes;
for(var i=0;i<_432.length;i++){
_40d.push(_432[i].toLowerCase());
}
}
}
_40d.push("");
}
var _434=null;
var _435=false;
for(var _436=0;_436<2;_436++){
for(var i=0;i<_422.length;i++){
var _437=dojo.evalObjPath(_422[i]);
if(!_437){
continue;
}
var pos=_422[i].indexOf(".");
if(pos>-1){
var n=_422[i].substring(0,pos);
if(n!=ns){
if(_436==0){
continue;
}
if(!_435){
_435=true;
dojo.deprecated("dojo.widget.Manager.getImplementationName","Wrong namespace ("+ns+") specified. Developers should specify correct namespaces for all non-Dojo widgets","0.5");
}
}
}
for(var j=0;j<_40d.length;j++){
if(!_437[_40d[j]]){
continue;
}
for(var _43b in _437[_40d[j]]){
if(_43b.toLowerCase()!=_42e){
continue;
}
_421[ns][_42e]=_437[_40d[j]][_43b];
return _421[ns][_42e];
}
}
for(var j=0;j<_40d.length;j++){
for(var _43b in _437){
if(_43b.toLowerCase()!=(_40d[j]+_42e)&&_43b.toLowerCase()!=_42e){
continue;
}
_421[ns][_42e]=_437[_43b];
return _421[ns][_42e];
}
}
}
var _43c=dojo.findNamespaceForWidget(_42e);
if(_43c){
ns=_43c.nsPrefix;
if(!_421[ns]){
_421[ns]={};
}
}
}
throw new Error("Could not locate \""+_42c+"\" class");
};
this.resizing=false;
this.onWindowResized=function(){
if(this.resizing){
return;
}
try{
this.resizing=true;
for(var id in this.topWidgets){
var _43e=this.topWidgets[id];
if(_43e.checkSize){
_43e.checkSize();
}
}
}
catch(e){
}
finally{
this.resizing=false;
}
};
if(typeof window!="undefined"){
dojo.addOnLoad(this,"onWindowResized");
dojo.event.connect(window,"onresize",this,"onWindowResized");
}
};
(function(){
var dw=dojo.widget;
var dwm=dw.manager;
var h=dojo.lang.curry(dojo.lang,"hitch",dwm);
var g=function(_443,_444){
dw[(_444||_443)]=h(_443);
};
g("add","addWidget");
g("destroyAll","destroyAllWidgets");
g("remove","removeWidget");
g("removeById","removeWidgetById");
g("getWidgetById");
g("getWidgetById","byId");
g("getWidgetsByType");
g("getWidgetsByFilter");
g("getWidgetsByType","byType");
g("getWidgetsByFilter","byFilter");
g("getWidgetByNode","byNode");
dw.all=function(n){
var _446=dwm.getAllWidgets.apply(dwm,arguments);
if(arguments.length>0){
return _446[n];
}
return _446;
};
g("registerWidgetPackage");
g("getImplementation","getWidgetImplementation");
g("getImplementationName","getWidgetImplementationName");
dw.widgets=dwm.widgets;
dw.widgetIds=dwm.widgetIds;
dw.root=dwm.root;
})();
dojo.provide("dojo.widget.Widget");
dojo.provide("dojo.widget.tags");
dojo.declare("dojo.widget.Widget",null,function(){
this.children=[];
this.extraArgs={};
},{parent:null,isTopLevel:false,isModal:false,isEnabled:true,isHidden:false,isContainer:false,widgetId:"",widgetType:"Widget",namespace:"dojo",toString:function(){
return "[Widget "+this.widgetType+", "+(this.widgetId||"NO ID")+"]";
},repr:function(){
return this.toString();
},enable:function(){
this.isEnabled=true;
},disable:function(){
this.isEnabled=false;
},hide:function(){
this.isHidden=true;
},show:function(){
this.isHidden=false;
},onResized:function(){
this.notifyChildrenOfResize();
},notifyChildrenOfResize:function(){
for(var i=0;i<this.children.length;i++){
var _448=this.children[i];
if(_448.onResized){
_448.onResized();
}
}
},create:function(args,_44a,_44b,_44c){
if(_44c){
this.namespace=_44c;
}
this.satisfyPropertySets(args,_44a,_44b);
this.mixInProperties(args,_44a,_44b);
this.postMixInProperties(args,_44a,_44b);
dojo.widget.manager.add(this);
this.buildRendering(args,_44a,_44b);
this.initialize(args,_44a,_44b);
this.postInitialize(args,_44a,_44b);
this.postCreate(args,_44a,_44b);
return this;
},destroy:function(_44d){
this.destroyChildren();
this.uninitialize();
this.destroyRendering(_44d);
dojo.widget.manager.removeById(this.widgetId);
},destroyChildren:function(){
var _44e;
var i=0;
while(this.children.length>i){
var _44e=this.children[i];
if(_44e instanceof dojo.widget.Widget){
this.removeChild(_44e);
_44e.destroy();
continue;
}
i++;
}
},getChildrenOfType:function(type,_451){
var ret=[];
var _453=dojo.lang.isFunction(type);
if(!_453){
type=type.toLowerCase();
}
for(var x=0;x<this.children.length;x++){
if(_453){
if(this.children[x] instanceof type){
ret.push(this.children[x]);
}
}else{
if(this.children[x].widgetType.toLowerCase()==type){
ret.push(this.children[x]);
}
}
if(_451){
ret=ret.concat(this.children[x].getChildrenOfType(type,_451));
}
}
return ret;
},getDescendants:function(){
var _455=[];
var _456=[this];
var elem;
while((elem=_456.pop())){
_455.push(elem);
if(elem.children){
dojo.lang.forEach(elem.children,function(elem){
_456.push(elem);
});
}
}
return _455;
},isFirstNode:function(){
return this===this.parent.children[0];
},isLastNode:function(){
return this===this.parent.children[this.parent.children.length-1];
},satisfyPropertySets:function(args){
return args;
},mixInProperties:function(args,frag){
if((args["fastMixIn"])||(frag["fastMixIn"])){
for(var x in args){
this[x]=args[x];
}
return;
}
var _45d;
var _45e=dojo.widget.lcArgsCache[this.widgetType];
if(_45e==null){
_45e={};
for(var y in this){
_45e[((new String(y)).toLowerCase())]=y;
}
dojo.widget.lcArgsCache[this.widgetType]=_45e;
}
var _460={};
for(var x in args){
if(!this[x]){
var y=_45e[(new String(x)).toLowerCase()];
if(y){
args[y]=args[x];
x=y;
}
}
if(_460[x]){
continue;
}
_460[x]=true;
if((typeof this[x])!=(typeof _45d)){
if(typeof args[x]!="string"){
this[x]=args[x];
}else{
if(dojo.lang.isString(this[x])){
this[x]=args[x];
}else{
if(dojo.lang.isNumber(this[x])){
this[x]=new Number(args[x]);
}else{
if(dojo.lang.isBoolean(this[x])){
this[x]=(args[x].toLowerCase()=="false")?false:true;
}else{
if(dojo.lang.isFunction(this[x])){
if(args[x].search(/[^\w\.]+/i)==-1){
this[x]=dojo.evalObjPath(args[x],false);
}else{
var tn=dojo.lang.nameAnonFunc(new Function(args[x]),this);
dojo.event.connect(this,x,this,tn);
}
}else{
if(dojo.lang.isArray(this[x])){
this[x]=args[x].split(";");
}else{
if(this[x] instanceof Date){
this[x]=new Date(Number(args[x]));
}else{
if(typeof this[x]=="object"){
if(this[x] instanceof dojo.uri.Uri){
this[x]=args[x];
}else{
var _462=args[x].split(";");
for(var y=0;y<_462.length;y++){
var si=_462[y].indexOf(":");
if((si!=-1)&&(_462[y].length>si)){
this[x][_462[y].substr(0,si).replace(/^\s+|\s+$/g,"")]=_462[y].substr(si+1);
}
}
}
}else{
this[x]=args[x];
}
}
}
}
}
}
}
}
}else{
this.extraArgs[x.toLowerCase()]=args[x];
}
}
},postMixInProperties:function(){
},initialize:function(args,frag){
return false;
},postInitialize:function(args,frag){
return false;
},postCreate:function(args,frag){
return false;
},uninitialize:function(){
return false;
},buildRendering:function(){
dojo.unimplemented("dojo.widget.Widget.buildRendering, on "+this.toString()+", ");
return false;
},destroyRendering:function(){
dojo.unimplemented("dojo.widget.Widget.destroyRendering");
return false;
},cleanUp:function(){
dojo.unimplemented("dojo.widget.Widget.cleanUp");
return false;
},addedTo:function(_46a){
},addChild:function(_46b){
dojo.unimplemented("dojo.widget.Widget.addChild");
return false;
},removeChild:function(_46c){
for(var x=0;x<this.children.length;x++){
if(this.children[x]===_46c){
this.children.splice(x,1);
break;
}
}
return _46c;
},resize:function(_46e,_46f){
this.setWidth(_46e);
this.setHeight(_46f);
},setWidth:function(_470){
if((typeof _470=="string")&&(_470.substr(-1)=="%")){
this.setPercentageWidth(_470);
}else{
this.setNativeWidth(_470);
}
},setHeight:function(_471){
if((typeof _471=="string")&&(_471.substr(-1)=="%")){
this.setPercentageHeight(_471);
}else{
this.setNativeHeight(_471);
}
},setPercentageHeight:function(_472){
return false;
},setNativeHeight:function(_473){
return false;
},setPercentageWidth:function(_474){
return false;
},setNativeWidth:function(_475){
return false;
},getPreviousSibling:function(){
var idx=this.getParentIndex();
if(idx<=0){
return null;
}
return this.parent.children[idx-1];
},getSiblings:function(){
return this.parent.children;
},getParentIndex:function(){
return dojo.lang.indexOf(this.parent.children,this,true);
},getNextSibling:function(){
var idx=this.getParentIndex();
if(idx==this.parent.children.length-1){
return null;
}
if(idx<0){
return null;
}
return this.parent.children[idx+1];
}});
dojo.widget.lcArgsCache={};
dojo.widget.tags={};
dojo.widget.tags.addParseTreeHandler=function(type){
var _479=type.toLowerCase();
this[_479]=function(_47a,_47b,_47c,_47d,_47e){
var _47f=_479;
dojo.profile.start(_47f);
var n=dojo.widget.buildWidgetFromParseTree(_479,_47a,_47b,_47c,_47d,_47e);
dojo.profile.end(_47f);
return n;
};
};
dojo.widget.tags.addParseTreeHandler("dojo:widget");
dojo.widget.tags["dojo:propertyset"]=function(_481,_482,_483){
var _484=_482.parseProperties(_481["dojo:propertyset"]);
};
dojo.widget.tags["dojo:connect"]=function(_485,_486,_487){
var _488=_486.parseProperties(_485["dojo:connect"]);
};
dojo.widget.buildWidgetFromParseTree=function(type,frag,_48b,_48c,_48d,_48e){
var _48f=type.split(":");
_48f=(_48f.length==2)?_48f[1]:type;
var _490=_48e||_48b.parseProperties(frag[frag.namespace+":"+_48f]);
var _491=dojo.widget.manager.getImplementation(_48f,null,null,frag.namespace);
if(!_491){
throw new Error("cannot find \""+_48f+"\" widget");
}else{
if(!_491.create){
throw new Error("\""+_48f+"\" widget object does not appear to implement *Widget");
}
}
_490["dojoinsertionindex"]=_48d;
var ret=_491.create(_490,frag,_48c,frag.namespace);
return ret;
};
dojo.widget.defineWidget=function(_493,_494,_495,init,_497){
if(dojo.lang.isString(arguments[3])){
dojo.widget._defineWidget(arguments[0],arguments[3],arguments[1],arguments[4],arguments[2]);
}else{
var args=[arguments[0]],p=3;
if(dojo.lang.isString(arguments[1])){
args.push(arguments[1],arguments[2]);
}else{
args.push("",arguments[1]);
p=2;
}
if(dojo.lang.isFunction(arguments[p])){
args.push(arguments[p],arguments[p+1]);
}else{
args.push(null,arguments[p]);
}
dojo.widget._defineWidget.apply(this,args);
}
};
dojo.widget.defineWidget.renderers="html|svg|vml";
dojo.widget._defineWidget=function(_499,_49a,_49b,init,_49d){
var _49e=_499.split(".");
var type=_49e.pop();
var regx="\\.("+(_49a?_49a+"|":"")+dojo.widget.defineWidget.renderers+")\\.";
var r=_499.search(new RegExp(regx));
_49e=(r<0?_49e.join("."):_499.substr(0,r));
dojo.widget.manager.registerWidgetPackage(_49e);
var pos=_49e.indexOf(".");
var _4a3=(pos>-1)?_49e.substring(0,pos):_49e;
dojo.widget.tags.addParseTreeHandler(_4a3+":"+type.toLowerCase());
if(_4a3!="dojo"){
dojo.widget.tags.addParseTreeHandler("dojo:"+type.toLowerCase());
}
_49d=(_49d)||{};
_49d.widgetType=type;
if((!init)&&(_49d["classConstructor"])){
init=_49d.classConstructor;
delete _49d.classConstructor;
}
dojo.declare(_499,_49b,init,_49d);
};
dojo.provide("dojo.widget.Parse");
dojo.widget.Parse=function(_4a4){
this.propertySetsList=[];
this.fragment=_4a4;
this.createComponents=function(frag,_4a6){
var _4a7=[];
var _4a8=false;
try{
if((frag)&&(frag["tagName"])&&(frag!=frag["nodeRef"])){
var _4a9=dojo.widget.tags;
var tna=String(frag["tagName"]).split(";");
for(var x=0;x<tna.length;x++){
var ltn=(tna[x].replace(/^\s+|\s+$/g,"")).toLowerCase();
var pos=ltn.indexOf(":");
var _4ae=(pos>0)?ltn.substring(0,pos):null;
if(!_4a9[ltn]&&dojo.getNamespace&&dojo.lang.isString(ltn)&&pos>0){
var ns=dojo.getNamespace(_4ae);
var _4b0=ltn.substring(pos+1,ltn.length);
var _4b1=null;
var _4b2=frag[ltn]["dojoDomain"]||frag[ltn]["dojodomain"];
if(_4b2){
_4b1=_4b2[0].value;
}
if(ns){
ns.load(_4b0,_4b1);
}
}
if(!_4a9[ltn]){
dojo.deprecated("dojo.widget.Parse.createComponents","Widget not defined for  namespace"+_4ae+", so searching all namespaces. Developers should specify namespaces for all non-Dojo widgets","0.5");
var _4b3=dojo.findNamespaceForWidget(_4b0);
if(_4b3){
ltn=_4b3.nsPrefix+":"+(ltn.indexOf(":")>0?ltn.substring(ltn.indexOf(":")+1):ltn);
}
}
if(_4a9[ltn]){
_4a8=true;
frag.tagName=ltn;
var ret=_4a9[ltn](frag,this,_4a6,frag["index"]);
_4a7.push(ret);
}else{
if(dojo.lang.isString(ltn)&&_4ae&&dojo._namespaces[_4ae]){
dojo.debug("no tag handler registered for type: ",ltn);
}
}
}
}
}
catch(e){
dojo.debug("dojo.widget.Parse: error:",e);
}
if(!_4a8){
_4a7=_4a7.concat(this.createSubComponents(frag,_4a6));
}
return _4a7;
};
this.createSubComponents=function(_4b5,_4b6){
var frag,comps=[];
for(var item in _4b5){
frag=_4b5[item];
if((frag)&&(typeof frag=="object")&&(frag!=_4b5.nodeRef)&&(frag!=_4b5["tagName"])){
comps=comps.concat(this.createComponents(frag,_4b6));
}
}
return comps;
};
this.parsePropertySets=function(_4b9){
return [];
var _4ba=[];
for(var item in _4b9){
if((_4b9[item]["tagName"]=="dojo:propertyset")){
_4ba.push(_4b9[item]);
}
}
this.propertySetsList.push(_4ba);
return _4ba;
};
this.parseProperties=function(_4bc){
var _4bd={};
for(var item in _4bc){
if((_4bc[item]==_4bc["tagName"])||(_4bc[item]==_4bc.nodeRef)){
}else{
if((_4bc[item]["tagName"])&&(dojo.widget.tags[_4bc[item].tagName.toLowerCase()])){
}else{
if((_4bc[item][0])&&(_4bc[item][0].value!="")&&(_4bc[item][0].value!=null)){
try{
if(item.toLowerCase()=="dataprovider"){
var _4bf=this;
this.getDataProvider(_4bf,_4bc[item][0].value);
_4bd.dataProvider=this.dataProvider;
}
_4bd[item]=_4bc[item][0].value;
var _4c0=this.parseProperties(_4bc[item]);
for(var _4c1 in _4c0){
_4bd[_4c1]=_4c0[_4c1];
}
}
catch(e){
dojo.debug(e);
}
}
}
}
}
return _4bd;
};
this.getDataProvider=function(_4c2,_4c3){
dojo.io.bind({url:_4c3,load:function(type,_4c5){
if(type=="load"){
_4c2.dataProvider=_4c5;
}
},mimetype:"text/javascript",sync:true});
};
this.getPropertySetById=function(_4c6){
for(var x=0;x<this.propertySetsList.length;x++){
if(_4c6==this.propertySetsList[x]["id"][0].value){
return this.propertySetsList[x];
}
}
return "";
};
this.getPropertySetsByType=function(_4c8){
var _4c9=[];
for(var x=0;x<this.propertySetsList.length;x++){
var cpl=this.propertySetsList[x];
var cpcc=cpl["componentClass"]||cpl["componentType"]||null;
var _4cd=this.propertySetsList[x]["id"][0].value;
if((cpcc)&&(_4cd==cpcc[0].value)){
_4c9.push(cpl);
}
}
return _4c9;
};
this.getPropertySets=function(_4ce){
var ppl="dojo:propertyproviderlist";
var _4d0=[];
var _4d1=_4ce["tagName"];
if(_4ce[ppl]){
var _4d2=_4ce[ppl].value.split(" ");
for(var _4d3 in _4d2){
if((_4d3.indexOf("..")==-1)&&(_4d3.indexOf("://")==-1)){
var _4d4=this.getPropertySetById(_4d3);
if(_4d4!=""){
_4d0.push(_4d4);
}
}else{
}
}
}
return (this.getPropertySetsByType(_4d1)).concat(_4d0);
};
this.createComponentFromScript=function(_4d5,_4d6,_4d7,_4d8){
if(!_4d8){
_4d8="dojo";
}
var ltn=_4d8+":"+_4d6.toLowerCase();
var _4da=dojo.widget.tags;
if(!_4da[ltn]&&dojo.getNamespace&&dojo.lang.isString(ltn)){
var ns=dojo.getNamespace(_4d8);
if(ns){
ns.load(_4d6);
}
}
if(!_4da[ltn]){
dojo.deprecated("dojo.widget.Parse.createComponentFromScript","Widget not defined for namespace"+_4d8+", so searching all namespaces. Developers should specify namespaces for all non-Dojo widgets","0.5");
var _4dc=dojo.findNamespaceForWidget(_4d6.toLowerCase());
if(_4dc){
var _4dd=_4dc.nsPrefix+":"+(ltn.indexOf(":")>0?ltn.substring(ltn.indexOf(":")+1):ltn);
_4d7[_4dd]=_4d7[ltn];
_4d7.namespace=_4dc.nsPrefix;
ltn=_4dd;
}
}
if(_4da[ltn]){
_4d7.fastMixIn=true;
var ret=[dojo.widget.buildWidgetFromParseTree(ltn,_4d7,this,null,null,_4d7)];
return ret;
}else{
dojo.debug("no tag handler registered for type: ",ltn);
}
};
};
dojo.widget._parser_collection={"dojo":new dojo.widget.Parse()};
dojo.widget.getParser=function(name){
if(!name){
name="dojo";
}
if(!this._parser_collection[name]){
this._parser_collection[name]=new dojo.widget.Parse();
}
return this._parser_collection[name];
};
dojo.widget.createWidget=function(name,_4e1,_4e2,_4e3){
var _4e4=false;
var _4e5=(typeof name=="string");
if(_4e5){
var pos=name.indexOf(":");
var _4e7=(pos>-1)?name.substring(0,pos):"dojo";
if(pos>-1){
name=name.substring(pos+1);
}
var _4e8=name.toLowerCase();
var _4e9=_4e7+":"+_4e8;
_4e4=(dojo.byId(name)&&(!dojo.widget.tags[_4e9]));
}
if((arguments.length==1)&&((_4e4)||(!_4e5))){
var xp=new dojo.xml.Parse();
var tn=(_4e4)?dojo.byId(name):name;
return dojo.widget.getParser().createComponents(xp.parseElement(tn,null,true))[0];
}
function fromScript(_4ec,name,_4ee,_4ef){
_4ee[_4e9]={dojotype:[{value:_4e8}],nodeRef:_4ec,fastMixIn:true};
_4ee.namespace=_4ef;
return dojo.widget.getParser().createComponentFromScript(_4ec,name,_4ee,_4ef);
}
_4e1=_4e1||{};
var _4f0=false;
var tn=null;
var h=dojo.render.html.capable;
if(h){
tn=document.createElement("span");
}
if(!_4e2){
_4f0=true;
_4e2=tn;
if(h){
dojo.body().appendChild(_4e2);
}
}else{
if(_4e3){
dojo.dom.insertAtPosition(tn,_4e2,_4e3);
}else{
tn=_4e2;
}
}
var _4f2=fromScript(tn,name.toLowerCase(),_4e1,_4e7);
if(!_4f2||!_4f2[0]||typeof _4f2[0].widgetType=="undefined"){
throw new Error("createWidget: Creation of \""+name+"\" widget failed.");
}
if(_4f0){
if(_4f2[0].domNode.parentNode){
_4f2[0].domNode.parentNode.removeChild(_4f2[0].domNode);
}
}
return _4f2[0];
};
dojo.provide("dojo.html.style");
dojo.html.getClass=function(node){
node=dojo.byId(node);
if(!node){
return "";
}
var cs="";
if(node.className){
cs=node.className;
}else{
if(dojo.html.hasAttribute(node,"class")){
cs=dojo.html.getAttribute(node,"class");
}
}
return cs.replace(/^\s+|\s+$/g,"");
};
dojo.html.getClasses=function(node){
var c=dojo.html.getClass(node);
return (c=="")?[]:c.split(/\s+/g);
};
dojo.html.hasClass=function(node,_4f8){
return (new RegExp("(^|\\s+)"+_4f8+"(\\s+|$)")).test(dojo.html.getClass(node));
};
dojo.html.prependClass=function(node,_4fa){
_4fa+=" "+dojo.html.getClass(node);
return dojo.html.setClass(node,_4fa);
};
dojo.html.addClass=function(node,_4fc){
if(dojo.html.hasClass(node,_4fc)){
return false;
}
_4fc=(dojo.html.getClass(node)+" "+_4fc).replace(/^\s+|\s+$/g,"");
return dojo.html.setClass(node,_4fc);
};
dojo.html.setClass=function(node,_4fe){
node=dojo.byId(node);
var cs=new String(_4fe);
try{
if(typeof node.className=="string"){
node.className=cs;
}else{
if(node.setAttribute){
node.setAttribute("class",_4fe);
node.className=cs;
}else{
return false;
}
}
}
catch(e){
dojo.debug("dojo.html.setClass() failed",e);
}
return true;
};
dojo.html.removeClass=function(node,_501,_502){
try{
if(!_502){
var _503=dojo.html.getClass(node).replace(new RegExp("(^|\\s+)"+_501+"(\\s+|$)"),"$1$2");
}else{
var _503=dojo.html.getClass(node).replace(_501,"");
}
dojo.html.setClass(node,_503);
}
catch(e){
dojo.debug("dojo.html.removeClass() failed",e);
}
return true;
};
dojo.html.replaceClass=function(node,_505,_506){
dojo.html.removeClass(node,_506);
dojo.html.addClass(node,_505);
};
dojo.html.classMatchType={ContainsAll:0,ContainsAny:1,IsOnly:2};
dojo.html.getElementsByClass=function(_507,_508,_509,_50a,_50b){
var _50c=dojo.doc();
_508=dojo.byId(_508)||_50c;
var _50d=_507.split(/\s+/g);
var _50e=[];
if(_50a!=1&&_50a!=2){
_50a=0;
}
var _50f=new RegExp("(\\s|^)(("+_50d.join(")|(")+"))(\\s|$)");
var _510=_50d.join(" ").length;
var _511=[];
if(!_50b&&_50c.evaluate){
var _512=".//"+(_509||"*")+"[contains(";
if(_50a!=dojo.html.classMatchType.ContainsAny){
_512+="concat(' ',@class,' '), ' "+_50d.join(" ') and contains(concat(' ',@class,' '), ' ")+" ')";
if(_50a==2){
_512+=" and string-length(@class)="+_510+"]";
}else{
_512+="]";
}
}else{
_512+="concat(' ',@class,' '), ' "+_50d.join(" ') or contains(concat(' ',@class,' '), ' ")+" ')]";
}
var _513=_50c.evaluate(_512,_508,null,XPathResult.ANY_TYPE,null);
var _514=_513.iterateNext();
while(_514){
try{
_511.push(_514);
_514=_513.iterateNext();
}
catch(e){
break;
}
}
return _511;
}else{
if(!_509){
_509="*";
}
_511=_508.getElementsByTagName(_509);
var node,i=0;
outer:
while(node=_511[i++]){
var _516=dojo.html.getClasses(node);
if(_516.length==0){
continue outer;
}
var _517=0;
for(var j=0;j<_516.length;j++){
if(_50f.test(_516[j])){
if(_50a==dojo.html.classMatchType.ContainsAny){
_50e.push(node);
continue outer;
}else{
_517++;
}
}else{
if(_50a==dojo.html.classMatchType.IsOnly){
continue outer;
}
}
}
if(_517==_50d.length){
if((_50a==dojo.html.classMatchType.IsOnly)&&(_517==_516.length)){
_50e.push(node);
}else{
if(_50a==dojo.html.classMatchType.ContainsAll){
_50e.push(node);
}
}
}
}
return _50e;
}
};
dojo.html.getElementsByClassName=dojo.html.getElementsByClass;
dojo.html.toCamelCase=function(_519){
var arr=_519.split("-"),cc=arr[0];
for(var i=1;i<arr.length;i++){
cc+=arr[i].charAt(0).toUpperCase()+arr[i].substring(1);
}
return cc;
};
dojo.html.toSelectorCase=function(_51c){
return _51c.replace(/([A-Z])/g,"-$1").toLowerCase();
};
dojo.html.getComputedStyle=function(node,_51e,_51f){
node=dojo.byId(node);
var _51e=dojo.html.toSelectorCase(_51e);
var _520=dojo.html.toCamelCase(_51e);
if(!node||!node.style){
return _51f;
}else{
if(document.defaultView&&dojo.dom.isDescendantOf(node,node.ownerDocument)){
try{
var cs=document.defaultView.getComputedStyle(node,"");
if(cs){
return cs.getPropertyValue(_51e);
}
}
catch(e){
if(node.style.getPropertyValue){
return node.style.getPropertyValue(_51e);
}else{
return _51f;
}
}
}else{
if(node.currentStyle){
return node.currentStyle[_520];
}
}
}
if(node.style.getPropertyValue){
return node.style.getPropertyValue(_51e);
}else{
return _51f;
}
};
dojo.html.getStyleProperty=function(node,_523){
node=dojo.byId(node);
return (node&&node.style?node.style[dojo.html.toCamelCase(_523)]:undefined);
};
dojo.html.getStyle=function(node,_525){
var _526=dojo.html.getStyleProperty(node,_525);
return (_526?_526:dojo.html.getComputedStyle(node,_525));
};
dojo.html.setStyle=function(node,_528,_529){
node=dojo.byId(node);
if(node&&node.style){
var _52a=dojo.html.toCamelCase(_528);
node.style[_52a]=_529;
}
};
dojo.html.setStyleText=function(_52b,text){
try{
_52b.style.cssText=text;
}
catch(e){
_52b.setAttribute("style",text);
}
};
dojo.html.copyStyle=function(_52d,_52e){
if(!_52e.style.cssText){
_52d.setAttribute("style",_52e.getAttribute("style"));
}else{
_52d.style.cssText=_52e.style.cssText;
}
dojo.html.addClass(_52d,dojo.html.getClass(_52e));
};
dojo.html.getUnitValue=function(node,_530,_531){
var s=dojo.html.getComputedStyle(node,_530);
if((!s)||((s=="auto")&&(_531))){
return {value:0,units:"px"};
}
var _533=s.match(/(\-?[\d.]+)([a-z%]*)/i);
if(!_533){
return dojo.html.getUnitValue.bad;
}
return {value:Number(_533[1]),units:_533[2].toLowerCase()};
};
dojo.html.getUnitValue.bad={value:NaN,units:""};
dojo.html.getPixelValue=function(node,_535,_536){
var _537=dojo.html.getUnitValue(node,_535,_536);
if(isNaN(_537.value)){
return 0;
}
if((_537.value)&&(_537.units!="px")){
return NaN;
}
return _537.value;
};
dojo.html.setPositivePixelValue=function(node,_539,_53a){
if(isNaN(_53a)){
return false;
}
node.style[_539]=Math.max(0,_53a)+"px";
return true;
};
dojo.html.styleSheet=null;
dojo.html.insertCssRule=function(_53b,_53c,_53d){
if(!dojo.html.styleSheet){
if(document.createStyleSheet){
dojo.html.styleSheet=document.createStyleSheet();
}else{
if(document.styleSheets[0]){
dojo.html.styleSheet=document.styleSheets[0];
}else{
return null;
}
}
}
if(arguments.length<3){
if(dojo.html.styleSheet.cssRules){
_53d=dojo.html.styleSheet.cssRules.length;
}else{
if(dojo.html.styleSheet.rules){
_53d=dojo.html.styleSheet.rules.length;
}else{
return null;
}
}
}
if(dojo.html.styleSheet.insertRule){
var rule=_53b+" { "+_53c+" }";
return dojo.html.styleSheet.insertRule(rule,_53d);
}else{
if(dojo.html.styleSheet.addRule){
return dojo.html.styleSheet.addRule(_53b,_53c,_53d);
}else{
return null;
}
}
};
dojo.html.removeCssRule=function(_53f){
if(!dojo.html.styleSheet){
dojo.debug("no stylesheet defined for removing rules");
return false;
}
if(dojo.html.render.ie){
if(!_53f){
_53f=dojo.html.styleSheet.rules.length;
dojo.html.styleSheet.removeRule(_53f);
}
}else{
if(document.styleSheets[0]){
if(!_53f){
_53f=dojo.html.styleSheet.cssRules.length;
}
dojo.html.styleSheet.deleteRule(_53f);
}
}
return true;
};
dojo.html._insertedCssFiles=[];
dojo.html.insertCssFile=function(URI,doc,_542){
if(!URI){
return;
}
if(!doc){
doc=document;
}
var _543=dojo.hostenv.getText(URI);
_543=dojo.html.fixPathsInCssText(_543,URI);
if(_542){
var idx=-1,node,ent=dojo.html._insertedCssFiles;
for(var i=0;i<ent.length;i++){
if((ent[i].doc==doc)&&(ent[i].cssText==_543)){
idx=i;
node=ent[i].nodeRef;
break;
}
}
if(node){
var _546=doc.getElementsByTagName("style");
for(var i=0;i<_546.length;i++){
if(_546[i]==node){
return;
}
}
dojo.html._insertedCssFiles.shift(idx,1);
}
}
var _547=dojo.html.insertCssText(_543);
dojo.html._insertedCssFiles.push({"doc":doc,"cssText":_543,"nodeRef":_547});
if(_547&&djConfig.isDebug){
_547.setAttribute("dbgHref",URI);
}
return _547;
};
dojo.html.insertCssText=function(_548,doc,URI){
if(!_548){
return;
}
if(!doc){
doc=document;
}
if(URI){
_548=dojo.html.fixPathsInCssText(_548,URI);
}
var _54b=doc.createElement("style");
_54b.setAttribute("type","text/css");
var head=doc.getElementsByTagName("head")[0];
if(!head){
dojo.debug("No head tag in document, aborting styles");
return;
}else{
head.appendChild(_54b);
}
if(_54b.styleSheet){
_54b.styleSheet.cssText=_548;
}else{
var _54d=doc.createTextNode(_548);
_54b.appendChild(_54d);
}
return _54b;
};
dojo.html.fixPathsInCssText=function(_54e,URI){
if(!_54e||!URI){
return;
}
var _550,str="",url="";
var _551=/url\(\s*([\t\s\w()\/.\\'"-:#=&?]+)\s*\)/;
var _552=/(file|https?|ftps?):\/\//;
var _553=/^[\s]*(['"]?)([\w()\/.\\'"-:#=&?]*)\1[\s]*?$/;
while(_550=_551.exec(_54e)){
url=_550[1].replace(_553,"$2");
if(!_552.exec(url)){
url=(new dojo.uri.Uri(URI,url).toString());
}
str+=_54e.substring(0,_550.index)+"url("+url+")";
_54e=_54e.substr(_550.index+_550[0].length);
}
return str+_54e;
};
dojo.html.setActiveStyleSheet=function(_554){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")){
a.disabled=true;
if(a.getAttribute("title")==_554){
a.disabled=false;
}
}
}
};
dojo.html.getActiveStyleSheet=function(){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")&&!a.disabled){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.getPreferredStyleSheet=function(){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("rel").indexOf("alt")==-1&&a.getAttribute("title")){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.applyBrowserClass=function(node){
with(dojo.render.html){
var _559={b_ie:ie,b_ie55:ie55,b_ie6:ie60,b_ie7:ie70,b_iequirks:ie&&quirks,b_opera:opera,b_khtml:khtml,b_safari:safari,b_gecko:mozilla};
}
for(var p in _559){
if(_559[p]){
dojo.html.addClass(node,p);
return;
}
}
};
dojo.provide("dojo.uri.Uri");
dojo.uri=new function(){
this.dojoUri=function(uri){
return new dojo.uri.Uri(dojo.hostenv.getBaseScriptUri(),uri);
};
this.nsUri=function(_55c,uri){
var ns=dojo.getNamespace(_55c);
if(!ns){
return null;
}
var loc=ns.location;
if(loc.lastIndexOf("/")!=loc.length-1){
loc+="/";
}
return new dojo.uri.Uri(dojo.hostenv.getBaseScriptUri()+loc,uri);
};
this.Uri=function(){
var uri=arguments[0];
for(var i=1;i<arguments.length;i++){
if(!arguments[i]){
continue;
}
var _562=new dojo.uri.Uri(arguments[i].toString());
var _563=new dojo.uri.Uri(uri.toString());
if(_562.path==""&&_562.scheme==null&&_562.authority==null&&_562.query==null){
if(_562.fragment!=null){
_563.fragment=_562.fragment;
}
_562=_563;
}else{
if(_562.scheme==null){
_562.scheme=_563.scheme;
if(_562.authority==null){
_562.authority=_563.authority;
if(_562.path.charAt(0)!="/"){
var path=_563.path.substring(0,_563.path.lastIndexOf("/")+1)+_562.path;
var segs=path.split("/");
for(var j=0;j<segs.length;j++){
if(segs[j]=="."){
if(j==segs.length-1){
segs[j]="";
}else{
segs.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&segs[0]=="")&&segs[j]==".."&&segs[j-1]!=".."){
if(j==segs.length-1){
segs.splice(j,1);
segs[j-1]="";
}else{
segs.splice(j-1,2);
j-=2;
}
}
}
}
_562.path=segs.join("/");
}
}
}
}
uri="";
if(_562.scheme!=null){
uri+=_562.scheme+":";
}
if(_562.authority!=null){
uri+="//"+_562.authority;
}
uri+=_562.path;
if(_562.query!=null){
uri+="?"+_562.query;
}
if(_562.fragment!=null){
uri+="#"+_562.fragment;
}
}
this.uri=uri.toString();
var _567="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$";
var r=this.uri.match(new RegExp(_567));
this.scheme=r[2]||(r[1]?"":null);
this.authority=r[4]||(r[3]?"":null);
this.path=r[5];
this.query=r[7]||(r[6]?"":null);
this.fragment=r[9]||(r[8]?"":null);
if(this.authority!=null){
_567="^((([^:]+:)?([^@]+))@)?([^:]*)(:([0-9]+))?$";
r=this.authority.match(new RegExp(_567));
this.user=r[3]||null;
this.password=r[4]||null;
this.host=r[5];
this.port=r[7]||null;
}
this.toString=function(){
return this.uri;
};
};
};
dojo.provide("dojo.uri.*");
dojo.provide("dojo.widget.DomWidget");
dojo.widget._cssFiles={};
dojo.widget._cssStrings={};
dojo.widget._templateCache={};
dojo.widget.defaultStrings={dojoRoot:dojo.hostenv.getBaseScriptUri(),baseScriptUri:dojo.hostenv.getBaseScriptUri()};
dojo.widget.buildFromTemplate=function(){
dojo.lang.forward("fillFromTemplateCache");
};
dojo.widget.fillFromTemplateCache=function(obj,_56a,_56b,_56c){
var _56d=_56a||obj.templatePath;
if(_56d&&!(_56d instanceof dojo.uri.Uri)){
_56d=dojo.uri.dojoUri(_56d);
dojo.deprecated("templatePath should be of type dojo.uri.Uri",null,"0.4");
}
var _56e=dojo.widget._templateCache;
if(!obj["widgetType"]){
do{
var _56f="__dummyTemplate__"+dojo.widget._templateCache.dummyCount++;
}while(_56e[_56f]);
obj.widgetType=_56f;
}
var wt=obj.widgetType;
var ts=_56e[wt];
if(!ts){
_56e[wt]={"string":null,"node":null};
if(_56c){
ts={};
}else{
ts=_56e[wt];
}
}
if((!obj.templateString)&&(!_56c)){
obj.templateString=_56b||ts["string"];
}
if((!obj.templateNode)&&(!_56c)){
obj.templateNode=ts["node"];
}
if((!obj.templateNode)&&(!obj.templateString)&&(_56d)){
var _572=dojo.hostenv.getText(_56d);
if(_572){
_572=_572.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _573=_572.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_573){
_572=_573[1];
}
}else{
_572="";
}
obj.templateString=_572;
if(!_56c){
_56e[wt]["string"]=_572;
}
}
if((!ts["string"])&&(!_56c)){
ts.string=obj.templateString;
}
};
dojo.widget._templateCache.dummyCount=0;
dojo.widget.attachProperties=["dojoAttachPoint","id"];
dojo.widget.eventAttachProperty="dojoAttachEvent";
dojo.widget.onBuildProperty="dojoOnBuild";
dojo.widget.waiNames=["waiRole","waiState"];
dojo.widget.wai={waiRole:{name:"waiRole",namespace:"http://www.w3.org/TR/xhtml2",alias:"x2",prefix:"wairole:"},waiState:{name:"waiState",namespace:"http://www.w3.org/2005/07/aaa",alias:"aaa",prefix:""},setAttr:function(node,ns,attr,_577){
if(dojo.render.html.ie){
node.setAttribute(this[ns].alias+":"+attr,this[ns].prefix+_577);
}else{
node.setAttributeNS(this[ns].namespace,attr,this[ns].prefix+_577);
}
},getAttr:function(node,ns,attr){
if(dojo.render.html.ie){
return node.getAttribute(this[ns].alias+":"+attr);
}else{
return node.getAttributeNS(this[ns].namespace,attr);
}
}};
dojo.widget.attachTemplateNodes=function(_57b,_57c,_57d){
var _57e=dojo.dom.ELEMENT_NODE;
function trim(str){
return str.replace(/^\s+|\s+$/g,"");
}
if(!_57b){
_57b=_57c.domNode;
}
if(_57b.nodeType!=_57e){
return;
}
var _580=_57b.all||_57b.getElementsByTagName("*");
var _581=_57c;
for(var x=-1;x<_580.length;x++){
var _583=(x==-1)?_57b:_580[x];
var _584=[];
for(var y=0;y<this.attachProperties.length;y++){
var _586=_583.getAttribute(this.attachProperties[y]);
if(_586){
_584=_586.split(";");
for(var z=0;z<_584.length;z++){
if(dojo.lang.isArray(_57c[_584[z]])){
_57c[_584[z]].push(_583);
}else{
_57c[_584[z]]=_583;
}
}
break;
}
}
var _588=_583.getAttribute(this.templateProperty);
if(_588){
_57c[_588]=_583;
}
dojo.lang.forEach(dojo.widget.waiNames,function(name){
var wai=dojo.widget.wai[name];
var val=_583.getAttribute(wai.name);
if(val){
if(val.indexOf("-")==-1){
dojo.widget.wai.setAttr(_583,wai.name,"role",val);
}else{
var _58c=val.split("-");
dojo.widget.wai.setAttr(_583,wai.name,_58c[0],_58c[1]);
}
}
},this);
var _58d=_583.getAttribute(this.eventAttachProperty);
if(_58d){
var evts=_58d.split(";");
for(var y=0;y<evts.length;y++){
if((!evts[y])||(!evts[y].length)){
continue;
}
var _58f=null;
var tevt=trim(evts[y]);
if(evts[y].indexOf(":")>=0){
var _591=tevt.split(":");
tevt=trim(_591[0]);
_58f=trim(_591[1]);
}
if(!_58f){
_58f=tevt;
}
var tf=function(){
var ntf=new String(_58f);
return function(evt){
if(_581[ntf]){
_581[ntf](dojo.event.browser.fixEvent(evt,this));
}
};
}();
dojo.event.browser.addListener(_583,tevt,tf,false,true);
}
}
for(var y=0;y<_57d.length;y++){
var _595=_583.getAttribute(_57d[y]);
if((_595)&&(_595.length)){
var _58f=null;
var _596=_57d[y].substr(4);
_58f=trim(_595);
var _597=[_58f];
if(_58f.indexOf(";")>=0){
_597=dojo.lang.map(_58f.split(";"),trim);
}
for(var z=0;z<_597.length;z++){
if(!_597[z].length){
continue;
}
var tf=function(){
var ntf=new String(_597[z]);
return function(evt){
if(_581[ntf]){
_581[ntf](dojo.event.browser.fixEvent(evt,this));
}
};
}();
dojo.event.browser.addListener(_583,_596,tf,false,true);
}
}
}
var _59a=_583.getAttribute(this.onBuildProperty);
if(_59a){
eval("var node = baseNode; var widget = targetObj; "+_59a);
}
}
};
dojo.widget.getDojoEventsFromStr=function(str){
var re=/(dojoOn([a-z]+)(\s?))=/gi;
var evts=str?str.match(re)||[]:[];
var ret=[];
var lem={};
for(var x=0;x<evts.length;x++){
if(evts[x].legth<1){
continue;
}
var cm=evts[x].replace(/\s/,"");
cm=(cm.slice(0,cm.length-1));
if(!lem[cm]){
lem[cm]=true;
ret.push(cm);
}
}
return ret;
};
dojo.declare("dojo.widget.DomWidget",dojo.widget.Widget,function(){
if((arguments.length>0)&&(typeof arguments[0]=="object")){
this.create(arguments[0]);
}
},{templateNode:null,templateString:null,templateCssString:null,preventClobber:false,domNode:null,containerNode:null,addChild:function(_5a2,_5a3,pos,ref,_5a6){
if(!this.isContainer){
dojo.debug("dojo.widget.DomWidget.addChild() attempted on non-container widget");
return null;
}else{
if(_5a6==undefined){
_5a6=this.children.length;
}
this.addWidgetAsDirectChild(_5a2,_5a3,pos,ref,_5a6);
this.registerChild(_5a2,_5a6);
}
return _5a2;
},addWidgetAsDirectChild:function(_5a7,_5a8,pos,ref,_5ab){
if((!this.containerNode)&&(!_5a8)){
this.containerNode=this.domNode;
}
var cn=(_5a8)?_5a8:this.containerNode;
if(!pos){
pos="after";
}
if(!ref){
if(!cn){
cn=dojo.body();
}
ref=cn.lastChild;
}
if(!_5ab){
_5ab=0;
}
_5a7.domNode.setAttribute("dojoinsertionindex",_5ab);
if(!ref){
cn.appendChild(_5a7.domNode);
}else{
if(pos=="insertAtIndex"){
dojo.dom.insertAtIndex(_5a7.domNode,ref.parentNode,_5ab);
}else{
if((pos=="after")&&(ref===cn.lastChild)){
cn.appendChild(_5a7.domNode);
}else{
dojo.dom.insertAtPosition(_5a7.domNode,cn,pos);
}
}
}
},registerChild:function(_5ad,_5ae){
_5ad.dojoInsertionIndex=_5ae;
var idx=-1;
for(var i=0;i<this.children.length;i++){
if(this.children[i].dojoInsertionIndex<_5ae){
idx=i;
}
}
this.children.splice(idx+1,0,_5ad);
_5ad.parent=this;
_5ad.addedTo(this,idx+1);
delete dojo.widget.manager.topWidgets[_5ad.widgetId];
},removeChild:function(_5b1){
dojo.dom.removeNode(_5b1.domNode);
return dojo.widget.DomWidget.superclass.removeChild.call(this,_5b1);
},getFragNodeRef:function(frag){
if(!frag||!frag[this.namespace+":"+this.widgetType.toLowerCase()]){
dojo.raise("Error: no frag for widget type "+this.widgetType+" with namespace "+this.namespace+", id "+this.widgetId+" (maybe a widget has set it's type incorrectly)");
}
return frag?frag[this.namespace+":"+this.widgetType.toLowerCase()]["nodeRef"]:null;
},postInitialize:function(args,frag,_5b5){
var _5b6=this.getFragNodeRef(frag);
if(_5b5&&(_5b5.snarfChildDomOutput||!_5b6)){
_5b5.addWidgetAsDirectChild(this,"","insertAtIndex","",args["dojoinsertionindex"],_5b6);
}else{
if(_5b6){
if(this.domNode&&(this.domNode!==_5b6)){
var _5b7=_5b6.parentNode.replaceChild(this.domNode,_5b6);
}
}
}
if(_5b5){
_5b5.registerChild(this,args.dojoinsertionindex);
}else{
dojo.widget.manager.topWidgets[this.widgetId]=this;
}
if(this.isContainer&&!frag["dojoDontFollow"]){
var _5b8=dojo.widget.getParser();
_5b8.createSubComponents(frag,this);
}
},buildRendering:function(args,frag){
var ts=dojo.widget._templateCache[this.widgetType];
if(args["templatecsspath"]){
args["templateCssPath"]=args["templatecsspath"];
}
var _5bc=args["templateCssPath"]||this.templateCssPath;
if(_5bc&&!(_5bc instanceof dojo.uri.Uri)){
_5bc=dojo.uri.dojoUri(_5bc);
dojo.deprecated("templateCssPath should be of type dojo.uri.Uri",null,"0.4");
}
if(_5bc&&!dojo.widget._cssFiles[_5bc.toString()]){
if((!this.templateCssString)&&(_5bc)){
this.templateCssString=dojo.hostenv.getText(_5bc);
this.templateCssPath=null;
}
dojo.widget._cssFiles[_5bc.toString()]=true;
}
if((this["templateCssString"])&&(!this.templateCssString["loaded"])){
dojo.html.insertCssText(this.templateCssString,null,_5bc);
if(!this.templateCssString){
this.templateCssString="";
}
this.templateCssString.loaded=true;
}
if((!this.preventClobber)&&((this.templatePath)||(this.templateNode)||((this["templateString"])&&(this.templateString.length))||((typeof ts!="undefined")&&((ts["string"])||(ts["node"]))))){
this.buildFromTemplate(args,frag);
}else{
this.domNode=this.getFragNodeRef(frag);
}
this.fillInTemplate(args,frag);
},buildFromTemplate:function(args,frag){
var _5bf=false;
if(args["templatepath"]){
_5bf=true;
args["templatePath"]=args["templatepath"];
}
dojo.widget.fillFromTemplateCache(this,args["templatePath"],null,_5bf);
var ts=dojo.widget._templateCache[this.widgetType];
if((ts)&&(!_5bf)){
if(!this.templateString.length){
this.templateString=ts["string"];
}
if(!this.templateNode){
this.templateNode=ts["node"];
}
}
var _5c1=false;
var node=null;
var tstr=this.templateString;
if((!this.templateNode)&&(this.templateString)){
_5c1=this.templateString.match(/\$\{([^\}]+)\}/g);
if(_5c1){
var hash=this.strings||{};
for(var key in dojo.widget.defaultStrings){
if(dojo.lang.isUndefined(hash[key])){
hash[key]=dojo.widget.defaultStrings[key];
}
}
for(var i=0;i<_5c1.length;i++){
var key=_5c1[i];
key=key.substring(2,key.length-1);
var kval=(key.substring(0,5)=="this.")?dojo.lang.getObjPathValue(key.substring(5),this):hash[key];
var _5c8;
if((kval)||(dojo.lang.isString(kval))){
_5c8=(dojo.lang.isFunction(kval))?kval.call(this,key,this.templateString):kval;
tstr=tstr.replace(_5c1[i],_5c8);
}
}
}else{
this.templateNode=this.createNodesFromText(this.templateString,true)[0];
if(!_5bf){
ts.node=this.templateNode;
}
}
}
if((!this.templateNode)&&(!_5c1)){
dojo.debug("DomWidget.buildFromTemplate: could not create template");
return false;
}else{
if(!_5c1){
node=this.templateNode.cloneNode(true);
if(!node){
return false;
}
}else{
node=this.createNodesFromText(tstr,true)[0];
}
}
this.domNode=node;
this.attachTemplateNodes(this.domNode,this);
if(this.isContainer&&this.containerNode){
var src=this.getFragNodeRef(frag);
if(src){
dojo.dom.moveChildren(src,this.containerNode);
}
}
},attachTemplateNodes:function(_5ca,_5cb){
if(!_5cb){
_5cb=this;
}
return dojo.widget.attachTemplateNodes(_5ca,_5cb,dojo.widget.getDojoEventsFromStr(this.templateString));
},fillInTemplate:function(){
},destroyRendering:function(){
try{
delete this.domNode;
}
catch(e){
}
},cleanUp:function(){
},getContainerHeight:function(){
dojo.unimplemented("dojo.widget.DomWidget.getContainerHeight");
},getContainerWidth:function(){
dojo.unimplemented("dojo.widget.DomWidget.getContainerWidth");
},createNodesFromText:function(){
dojo.unimplemented("dojo.widget.DomWidget.createNodesFromText");
}});
dojo.provide("dojo.html.common");
dojo.lang.mixin(dojo.html,dojo.dom);
dojo.html.body=function(){
dojo.deprecated("dojo.html.body() moved to dojo.body()","0.5");
return dojo.body();
};
dojo.html.getEventTarget=function(evt){
if(!evt){
evt=dojo.global().event||{};
}
var t=(evt.srcElement?evt.srcElement:(evt.target?evt.target:null));
while((t)&&(t.nodeType!=1)){
t=t.parentNode;
}
return t;
};
dojo.html.getViewport=function(){
var _5ce=dojo.global();
var _5cf=dojo.doc();
var w=0;
var h=0;
if(dojo.render.html.mozilla){
w=_5cf.documentElement.clientWidth;
h=_5ce.innerHeight;
}else{
if(!dojo.render.html.opera&&_5ce.innerWidth){
w=_5ce.innerWidth;
h=_5ce.innerHeight;
}else{
if(!dojo.render.html.opera&&dojo.exists(_5cf,"documentElement.clientWidth")){
var w2=_5cf.documentElement.clientWidth;
if(!w||w2&&w2<w){
w=w2;
}
h=_5cf.documentElement.clientHeight;
}else{
if(dojo.body().clientWidth){
w=dojo.body().clientWidth;
h=dojo.body().clientHeight;
}
}
}
}
return {width:w,height:h};
};
dojo.html.getScroll=function(){
var _5d3=dojo.global();
var _5d4=dojo.doc();
var top=_5d3.pageYOffset||_5d4.documentElement.scrollTop||dojo.body().scrollTop||0;
var left=_5d3.pageXOffset||_5d4.documentElement.scrollLeft||dojo.body().scrollLeft||0;
return {top:top,left:left,offset:{x:left,y:top}};
};
dojo.html.getParentByType=function(node,type){
var _5d9=dojo.doc();
var _5da=dojo.byId(node);
type=type.toLowerCase();
while((_5da)&&(_5da.nodeName.toLowerCase()!=type)){
if(_5da==(_5d9["body"]||_5d9["documentElement"])){
return null;
}
_5da=_5da.parentNode;
}
return _5da;
};
dojo.html.getAttribute=function(node,attr){
node=dojo.byId(node);
if((!node)||(!node.getAttribute)){
return null;
}
var ta=typeof attr=="string"?attr:new String(attr);
var v=node.getAttribute(ta.toUpperCase());
if((v)&&(typeof v=="string")&&(v!="")){
return v;
}
if(v&&v.value){
return v.value;
}
if((node.getAttributeNode)&&(node.getAttributeNode(ta))){
return (node.getAttributeNode(ta)).value;
}else{
if(node.getAttribute(ta)){
return node.getAttribute(ta);
}else{
if(node.getAttribute(ta.toLowerCase())){
return node.getAttribute(ta.toLowerCase());
}
}
}
return null;
};
dojo.html.hasAttribute=function(node,attr){
return dojo.html.getAttribute(dojo.byId(node),attr)?true:false;
};
dojo.html.getCursorPosition=function(e){
e=e||dojo.global().event;
var _5e2={x:0,y:0};
if(e.pageX||e.pageY){
_5e2.x=e.pageX;
_5e2.y=e.pageY;
}else{
var de=dojo.doc().documentElement;
var db=dojo.body();
_5e2.x=e.clientX+((de||db)["scrollLeft"])-((de||db)["clientLeft"]);
_5e2.y=e.clientY+((de||db)["scrollTop"])-((de||db)["clientTop"]);
}
return _5e2;
};
dojo.html.isTag=function(node){
node=dojo.byId(node);
if(node&&node.tagName){
for(var i=1;i<arguments.length;i++){
if(node.tagName.toLowerCase()==String(arguments[i]).toLowerCase()){
return String(arguments[i]).toLowerCase();
}
}
}
return "";
};
if(dojo.render.html.ie){
if(window.location.href.substr(0,6).toLowerCase()!="https:"){
(function(){
var _5e7=dojo.doc().createElement("script");
_5e7.src="javascript:'dojo.html.createExternalElement=function(doc, tag){ return doc.createElement(tag); }'";
dojo.doc().getElementsByTagName("head")[0].appendChild(_5e7);
})();
}
}else{
dojo.html.createExternalElement=function(doc,tag){
return doc.createElement(tag);
};
}
dojo.html._callDeprecated=function(_5ea,_5eb,args,_5ed,_5ee){
dojo.deprecated("dojo.html."+_5ea,"replaced by dojo.html."+_5eb+"("+(_5ed?"node, {"+_5ed+": "+_5ed+"}":"")+")"+(_5ee?"."+_5ee:""),"0.5");
var _5ef=[];
if(_5ed){
var _5f0={};
_5f0[_5ed]=args[1];
_5ef.push(args[0]);
_5ef.push(_5f0);
}else{
_5ef=args;
}
var ret=dojo.html[_5eb].apply(dojo.html,args);
if(_5ee){
return ret[_5ee];
}else{
return ret;
}
};
dojo.html.getViewportWidth=function(){
return dojo.html._callDeprecated("getViewportWidth","getViewport",arguments,null,"width");
};
dojo.html.getViewportHeight=function(){
return dojo.html._callDeprecated("getViewportHeight","getViewport",arguments,null,"height");
};
dojo.html.getViewportSize=function(){
return dojo.html._callDeprecated("getViewportSize","getViewport",arguments);
};
dojo.html.getScrollTop=function(){
return dojo.html._callDeprecated("getScrollTop","getScroll",arguments,null,"top");
};
dojo.html.getScrollLeft=function(){
return dojo.html._callDeprecated("getScrollLeft","getScroll",arguments,null,"left");
};
dojo.html.getScrollOffset=function(){
return dojo.html._callDeprecated("getScrollOffset","getScroll",arguments,null,"offset");
};
dojo.provide("dojo.html.display");
dojo.html._toggle=function(node,_5f3,_5f4){
node=dojo.byId(node);
_5f4(node,!_5f3(node));
return _5f3(node);
};
dojo.html.show=function(node){
node=dojo.byId(node);
if(dojo.html.getStyleProperty(node,"display")=="none"){
dojo.html.setStyle(node,"display",(node.dojoDisplayCache||""));
node.dojoDisplayCache=undefined;
}
};
dojo.html.hide=function(node){
node=dojo.byId(node);
if(typeof node["dojoDisplayCache"]=="undefined"){
var d=dojo.html.getStyleProperty(node,"display");
if(d!="none"){
node.dojoDisplayCache=d;
}
}
dojo.html.setStyle(node,"display","none");
};
dojo.html.setShowing=function(node,_5f9){
dojo.html[(_5f9?"show":"hide")](node);
};
dojo.html.isShowing=function(node){
return (dojo.html.getStyleProperty(node,"display")!="none");
};
dojo.html.toggleShowing=function(node){
return dojo.html._toggle(node,dojo.html.isShowing,dojo.html.setShowing);
};
dojo.html.displayMap={tr:"",td:"",th:"",img:"inline",span:"inline",input:"inline",button:"inline"};
dojo.html.suggestDisplayByTagName=function(node){
node=dojo.byId(node);
if(node&&node.tagName){
var tag=node.tagName.toLowerCase();
return (tag in dojo.html.displayMap?dojo.html.displayMap[tag]:"block");
}
};
dojo.html.setDisplay=function(node,_5ff){
dojo.html.setStyle(node,"display",((_5ff instanceof String||typeof _5ff=="string")?_5ff:(_5ff?dojo.html.suggestDisplayByTagName(node):"none")));
};
dojo.html.isDisplayed=function(node){
return (dojo.html.getComputedStyle(node,"display")!="none");
};
dojo.html.toggleDisplay=function(node){
return dojo.html._toggle(node,dojo.html.isDisplayed,dojo.html.setDisplay);
};
dojo.html.setVisibility=function(node,_603){
dojo.html.setStyle(node,"visibility",((_603 instanceof String||typeof _603=="string")?_603:(_603?"visible":"hidden")));
};
dojo.html.isVisible=function(node){
return (dojo.html.getComputedStyle(node,"visibility")!="hidden");
};
dojo.html.toggleVisibility=function(node){
return dojo.html._toggle(node,dojo.html.isVisible,dojo.html.setVisibility);
};
dojo.html.setOpacity=function(node,_607,_608){
node=dojo.byId(node);
var h=dojo.render.html;
if(!_608){
if(_607>=1){
if(h.ie){
dojo.html.clearOpacity(node);
return;
}else{
_607=0.999999;
}
}else{
if(_607<0){
_607=0;
}
}
}
if(h.ie){
if(node.nodeName.toLowerCase()=="tr"){
var tds=node.getElementsByTagName("td");
for(var x=0;x<tds.length;x++){
tds[x].style.filter="Alpha(Opacity="+_607*100+")";
}
}
node.style.filter="Alpha(Opacity="+_607*100+")";
}else{
if(h.moz){
node.style.opacity=_607;
node.style.MozOpacity=_607;
}else{
if(h.safari){
node.style.opacity=_607;
node.style.KhtmlOpacity=_607;
}else{
node.style.opacity=_607;
}
}
}
};
dojo.html.clearOpacity=function clearOpacity(node){
node=dojo.byId(node);
var ns=node.style;
var h=dojo.render.html;
if(h.ie){
try{
if(node.filters&&node.filters.alpha){
ns.filter="";
}
}
catch(e){
}
}else{
if(h.moz){
ns.opacity=1;
ns.MozOpacity=1;
}else{
if(h.safari){
ns.opacity=1;
ns.KhtmlOpacity=1;
}else{
ns.opacity=1;
}
}
}
};
dojo.html.getOpacity=function getOpacity(node){
node=dojo.byId(node);
var h=dojo.render.html;
if(h.ie){
var opac=(node.filters&&node.filters.alpha&&typeof node.filters.alpha.opacity=="number"?node.filters.alpha.opacity:100)/100;
}else{
var opac=node.style.opacity||node.style.MozOpacity||node.style.KhtmlOpacity||1;
}
return opac>=0.999999?1:Number(opac);
};
dojo.provide("dojo.html.layout");
dojo.html.sumAncestorProperties=function(node,prop){
node=dojo.byId(node);
if(!node){
return 0;
}
var _614=0;
while(node){
if(dojo.html.getComputedStyle(node,"position")=="fixed"){
return 0;
}
var val=node[prop];
if(val){
_614+=val-0;
if(node==dojo.body()){
break;
}
}
node=node.parentNode;
}
return _614;
};
dojo.html.setStyleAttributes=function(node,_617){
node=dojo.byId(node);
var _618=_617.replace(/(;)?\s*$/,"").split(";");
for(var i=0;i<_618.length;i++){
var _61a=_618[i].split(":");
var name=_61a[0].replace(/\s*$/,"").replace(/^\s*/,"").toLowerCase();
var _61c=_61a[1].replace(/\s*$/,"").replace(/^\s*/,"");
switch(name){
case "opacity":
dojo.html.setOpacity(node,_61c);
break;
case "content-height":
dojo.html.setContentBox(node,{height:_61c});
break;
case "content-width":
dojo.html.setContentBox(node,{width:_61c});
break;
case "outer-height":
dojo.html.setMarginBox(node,{height:_61c});
break;
case "outer-width":
dojo.html.setMarginBox(node,{width:_61c});
break;
default:
node.style[dojo.html.toCamelCase(name)]=_61c;
}
}
};
dojo.html.boxSizing={MARGIN_BOX:"margin-box",BORDER_BOX:"border-box",PADDING_BOX:"padding-box",CONTENT_BOX:"content-box"};
dojo.html.getAbsolutePosition=dojo.html.abs=function(node,_61e,_61f){
node=dojo.byId(node,node.ownerDocument);
var ret={x:0,y:0};
var bs=dojo.html.boxSizing;
if(!_61f){
_61f=bs.CONTENT_BOX;
}
var _622=2;
var _623;
switch(_61f){
case bs.MARGIN_BOX:
_623=3;
break;
case bs.BORDER_BOX:
_623=2;
break;
case bs.PADDING_BOX:
default:
_623=1;
break;
case bs.CONTENT_BOX:
_623=0;
break;
}
var h=dojo.render.html;
var db=document["body"]||document["documentElement"];
if(h.ie){
with(node.getBoundingClientRect()){
ret.x=left-2;
ret.y=top-2;
}
}else{
if(document.getBoxObjectFor){
_622=1;
try{
var bo=document.getBoxObjectFor(node);
ret.x=bo.x-dojo.html.sumAncestorProperties(node,"scrollLeft");
ret.y=bo.y-dojo.html.sumAncestorProperties(node,"scrollTop");
}
catch(e){
}
}else{
if(node["offsetParent"]){
var _627;
if((h.safari)&&(node.style.getPropertyValue("position")=="absolute")&&(node.parentNode==db)){
_627=db;
}else{
_627=db.parentNode;
}
if(node.parentNode!=db){
var nd=node;
if(dojo.render.html.opera){
nd=db;
}
ret.x-=dojo.html.sumAncestorProperties(nd,"scrollLeft");
ret.y-=dojo.html.sumAncestorProperties(nd,"scrollTop");
}
var _629=node;
do{
var n=_629["offsetLeft"];
if(!h.opera||n>0){
ret.x+=isNaN(n)?0:n;
}
var m=_629["offsetTop"];
ret.y+=isNaN(m)?0:m;
_629=_629.offsetParent;
}while((_629!=_627)&&(_629!=null));
}else{
if(node["x"]&&node["y"]){
ret.x+=isNaN(node.x)?0:node.x;
ret.y+=isNaN(node.y)?0:node.y;
}
}
}
}
if(_61e){
var _62c=dojo.html.getScroll();
ret.y+=_62c.top;
ret.x+=_62c.left;
}
var _62d=[dojo.html.getPaddingExtent,dojo.html.getBorderExtent,dojo.html.getMarginExtent];
if(_622>_623){
for(var i=_623;i<_622;++i){
ret.y+=_62d[i](node,"top");
ret.x+=_62d[i](node,"left");
}
}else{
if(_622<_623){
for(var i=_623;i>_622;--i){
ret.y-=_62d[i-1](node,"top");
ret.x-=_62d[i-1](node,"left");
}
}
}
ret.top=ret.y;
ret.left=ret.x;
return ret;
};
dojo.html.isPositionAbsolute=function(node){
return (dojo.html.getComputedStyle(node,"position")=="absolute");
};
dojo.html._sumPixelValues=function(node,_631,_632){
var _633=0;
for(var x=0;x<_631.length;x++){
_633+=dojo.html.getPixelValue(node,_631[x],_632);
}
return _633;
};
dojo.html.getMargin=function(node){
return {width:dojo.html._sumPixelValues(node,["margin-left","margin-right"],(dojo.html.getComputedStyle(node,"position")=="absolute")),height:dojo.html._sumPixelValues(node,["margin-top","margin-bottom"],(dojo.html.getComputedStyle(node,"position")=="absolute"))};
};
dojo.html.getBorder=function(node){
return {width:dojo.html.getBorderExtent(node,"left")+dojo.html.getBorderExtent(node,"right"),height:dojo.html.getBorderExtent(node,"top")+dojo.html.getBorderExtent(node,"bottom")};
};
dojo.html.getBorderExtent=function(node,side){
return (dojo.html.getStyle(node,"border-"+side+"-style")=="none"?0:dojo.html.getPixelValue(node,"border-"+side+"-width"));
};
dojo.html.getMarginExtent=function(node,side){
return dojo.html._sumPixelValues(node,["margin-"+side],dojo.html.isPositionAbsolute(node));
};
dojo.html.getPaddingExtent=function(node,side){
return dojo.html._sumPixelValues(node,["padding-"+side],true);
};
dojo.html.getPadding=function(node){
return {width:dojo.html._sumPixelValues(node,["padding-left","padding-right"],true),height:dojo.html._sumPixelValues(node,["padding-top","padding-bottom"],true)};
};
dojo.html.getPadBorder=function(node){
var pad=dojo.html.getPadding(node);
var _640=dojo.html.getBorder(node);
return {width:pad.width+_640.width,height:pad.height+_640.height};
};
dojo.html.getBoxSizing=function(node){
var h=dojo.render.html;
var bs=dojo.html.boxSizing;
if((h.ie)||(h.opera)){
var cm=document["compatMode"];
if((cm=="BackCompat")||(cm=="QuirksMode")){
return bs.BORDER_BOX;
}else{
return bs.CONTENT_BOX;
}
}else{
if(arguments.length==0){
node=document.documentElement;
}
var _645=dojo.html.getStyle(node,"-moz-box-sizing");
if(!_645){
_645=dojo.html.getStyle(node,"box-sizing");
}
return (_645?_645:bs.CONTENT_BOX);
}
};
dojo.html.isBorderBox=function(node){
return (dojo.html.getBoxSizing(node)==dojo.html.boxSizing.BORDER_BOX);
};
dojo.html.getBorderBox=function(node){
node=dojo.byId(node);
return {width:node.offsetWidth,height:node.offsetHeight};
};
dojo.html.getPaddingBox=function(node){
var box=dojo.html.getBorderBox(node);
var _64a=dojo.html.getBorder(node);
return {width:box.width-_64a.width,height:box.height-_64a.height};
};
dojo.html.getContentBox=function(node){
node=dojo.byId(node);
var _64c=dojo.html.getPadBorder(node);
return {width:node.offsetWidth-_64c.width,height:node.offsetHeight-_64c.height};
};
dojo.html.setContentBox=function(node,args){
node=dojo.byId(node);
var _64f=0;
var _650=0;
var isbb=dojo.html.isBorderBox(node);
var _652=(isbb?dojo.html.getPadBorder(node):{width:0,height:0});
var ret={};
if(typeof args.width!=undefined){
_64f=args.width+_652.width;
ret.width=dojo.html.setPositivePixelValue(node,"width",_64f);
}
if(typeof args.height!=undefined){
_650=args.height+_652.height;
ret.height=dojo.html.setPositivePixelValue(node,"height",_650);
}
return ret;
};
dojo.html.getMarginBox=function(node){
var _655=dojo.html.getBorderBox(node);
var _656=dojo.html.getMargin(node);
return {width:_655.width+_656.width,height:_655.height+_656.height};
};
dojo.html.setMarginBox=function(node,args){
node=dojo.byId(node);
var _659=0;
var _65a=0;
var isbb=dojo.html.isBorderBox(node);
var _65c=(!isbb?dojo.html.getPadBorder(node):{width:0,height:0});
var _65d=dojo.html.getMargin(node);
var ret={};
if(typeof args.width!=undefined){
_659=args.width-_65c.width;
_659-=_65d.width;
ret.width=dojo.html.setPositivePixelValue(node,"width",_659);
}
if(typeof args.height!=undefined){
_65a=args.height-_65c.height;
_65a-=_65d.height;
ret.height=dojo.html.setPositivePixelValue(node,"height",_65a);
}
return ret;
};
dojo.html.getElementBox=function(node,type){
var bs=dojo.html.boxSizing;
switch(type){
case bs.MARGIN_BOX:
return dojo.html.getMarginBox(node);
case bs.BORDER_BOX:
return dojo.html.getBorderBox(node);
case bs.PADDING_BOX:
return dojo.html.getPaddingBox(node);
case bs.CONTENT_BOX:
default:
return dojo.html.getContentBox(node);
}
};
dojo.html.toCoordinateObject=dojo.html.toCoordinateArray=function(_662,_663){
if(_662 instanceof Array||typeof _662=="array"){
dojo.deprecated("dojo.html.toCoordinateArray","use dojo.html.toCoordinateObject({left: , top: , width: , height: }) instead","0.5");
while(_662.length<4){
_662.push(0);
}
while(_662.length>4){
_662.pop();
}
var ret={left:_662[0],top:_662[1],width:_662[2],height:_662[3]};
}else{
if(!_662.nodeType&&!(_662 instanceof String||typeof _662=="string")&&("width" in _662||"height" in _662||"left" in _662||"x" in _662||"top" in _662||"y" in _662)){
var ret={left:_662.left||_662.x||0,top:_662.top||_662.y||0,width:_662.width||0,height:_662.height||0};
}else{
var node=dojo.byId(_662);
var pos=dojo.html.abs(node,_663);
var _667=dojo.html.getMarginBox(node);
var ret={left:pos.left,top:pos.top,width:_667.width,height:_667.height};
}
}
ret.x=ret.left;
ret.y=ret.top;
return ret;
};
dojo.html.setMarginBoxWidth=dojo.html.setOuterWidth=function(node,_669){
return dojo.html._callDeprecated("setMarginBoxWidth","setMarginBox",arguments,"width");
};
dojo.html.setMarginBoxHeight=dojo.html.setOuterHeight=function(){
return dojo.html._callDeprecated("setMarginBoxHeight","setMarginBox",arguments,"height");
};
dojo.html.getMarginBoxWidth=dojo.html.getOuterWidth=function(){
return dojo.html._callDeprecated("getMarginBoxWidth","getMarginBox",arguments,null,"width");
};
dojo.html.getMarginBoxHeight=dojo.html.getOuterHeight=function(){
return dojo.html._callDeprecated("getMarginBoxHeight","getMarginBox",arguments,null,"height");
};
dojo.html.getTotalOffset=function(node,type,_66c){
return dojo.html._callDeprecated("getTotalOffset","getAbsolutePosition",arguments,null,type);
};
dojo.html.getAbsoluteX=function(node,_66e){
return dojo.html._callDeprecated("getAbsoluteX","getAbsolutePosition",arguments,null,"x");
};
dojo.html.getAbsoluteY=function(node,_670){
return dojo.html._callDeprecated("getAbsoluteY","getAbsolutePosition",arguments,null,"y");
};
dojo.html.totalOffsetLeft=function(node,_672){
return dojo.html._callDeprecated("totalOffsetLeft","getAbsolutePosition",arguments,null,"left");
};
dojo.html.totalOffsetTop=function(node,_674){
return dojo.html._callDeprecated("totalOffsetTop","getAbsolutePosition",arguments,null,"top");
};
dojo.html.getMarginWidth=function(node){
return dojo.html._callDeprecated("getMarginWidth","getMargin",arguments,null,"width");
};
dojo.html.getMarginHeight=function(node){
return dojo.html._callDeprecated("getMarginHeight","getMargin",arguments,null,"height");
};
dojo.html.getBorderWidth=function(node){
return dojo.html._callDeprecated("getBorderWidth","getBorder",arguments,null,"width");
};
dojo.html.getBorderHeight=function(node){
return dojo.html._callDeprecated("getBorderHeight","getBorder",arguments,null,"height");
};
dojo.html.getPaddingWidth=function(node){
return dojo.html._callDeprecated("getPaddingWidth","getPadding",arguments,null,"width");
};
dojo.html.getPaddingHeight=function(node){
return dojo.html._callDeprecated("getPaddingHeight","getPadding",arguments,null,"height");
};
dojo.html.getPadBorderWidth=function(node){
return dojo.html._callDeprecated("getPadBorderWidth","getPadBorder",arguments,null,"width");
};
dojo.html.getPadBorderHeight=function(node){
return dojo.html._callDeprecated("getPadBorderHeight","getPadBorder",arguments,null,"height");
};
dojo.html.getBorderBoxWidth=dojo.html.getInnerWidth=function(){
return dojo.html._callDeprecated("getBorderBoxWidth","getBorderBox",arguments,null,"width");
};
dojo.html.getBorderBoxHeight=dojo.html.getInnerHeight=function(){
return dojo.html._callDeprecated("getBorderBoxHeight","getBorderBox",arguments,null,"height");
};
dojo.html.getContentBoxWidth=dojo.html.getContentWidth=function(){
return dojo.html._callDeprecated("getContentBoxWidth","getContentBox",arguments,null,"width");
};
dojo.html.getContentBoxHeight=dojo.html.getContentHeight=function(){
return dojo.html._callDeprecated("getContentBoxHeight","getContentBox",arguments,null,"height");
};
dojo.html.setContentBoxWidth=dojo.html.setContentWidth=function(node,_67e){
return dojo.html._callDeprecated("setContentBoxWidth","setContentBox",arguments,"width");
};
dojo.html.setContentBoxHeight=dojo.html.setContentHeight=function(node,_680){
return dojo.html._callDeprecated("setContentBoxHeight","setContentBox",arguments,"height");
};
dojo.provide("dojo.html.util");
dojo.html.getElementWindow=function(_681){
return dojo.html.getDocumentWindow(_681.ownerDocument);
};
dojo.html.getDocumentWindow=function(doc){
if(dojo.render.html.safari&&!doc._parentWindow){
var fix=function(win){
win.document._parentWindow=win;
for(var i=0;i<win.frames.length;i++){
fix(win.frames[i]);
}
};
fix(window.top);
}
if(dojo.render.html.ie&&window!==document.parentWindow&&!doc._parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
}
return doc._parentWindow||doc.parentWindow||doc.defaultView;
};
dojo.html.gravity=function(node,e){
node=dojo.byId(node);
var _688=dojo.html.getCursorPosition(e);
with(dojo.html){
var _689=getAbsolutePosition(node,true);
var bb=getBorderBox(node);
var _68b=_689.x+(bb.width/2);
var _68c=_689.y+(bb.height/2);
}
with(dojo.html.gravity){
return ((_688.x<_68b?WEST:EAST)|(_688.y<_68c?NORTH:SOUTH));
}
};
dojo.html.gravity.NORTH=1;
dojo.html.gravity.SOUTH=1<<1;
dojo.html.gravity.EAST=1<<2;
dojo.html.gravity.WEST=1<<3;
dojo.html.overElement=function(_68d,e){
_68d=dojo.byId(_68d);
var _68f=dojo.html.getCursorPosition(e);
with(dojo.html){
var bb=getBorderBox(_68d);
var _691=getAbsolutePosition(_68d,true);
var top=_691.y;
var _693=top+bb.height;
var left=_691.x;
var _695=left+bb.width;
}
return (_68f.x>=left&&_68f.x<=_695&&_68f.y>=top&&_68f.y<=_693);
};
dojo.html.renderedTextContent=function(node){
node=dojo.byId(node);
var _697="";
if(node==null){
return _697;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
var _699="unknown";
try{
_699=dojo.html.getStyle(node.childNodes[i],"display");
}
catch(E){
}
switch(_699){
case "block":
case "list-item":
case "run-in":
case "table":
case "table-row-group":
case "table-header-group":
case "table-footer-group":
case "table-row":
case "table-column-group":
case "table-column":
case "table-cell":
case "table-caption":
_697+="\n";
_697+=dojo.html.renderedTextContent(node.childNodes[i]);
_697+="\n";
break;
case "none":
break;
default:
if(node.childNodes[i].tagName&&node.childNodes[i].tagName.toLowerCase()=="br"){
_697+="\n";
}else{
_697+=dojo.html.renderedTextContent(node.childNodes[i]);
}
break;
}
break;
case 3:
case 2:
case 4:
var text=node.childNodes[i].nodeValue;
var _69b="unknown";
try{
_69b=dojo.html.getStyle(node,"text-transform");
}
catch(E){
}
switch(_69b){
case "capitalize":
var _69c=text.split(" ");
for(var i=0;i<_69c.length;i++){
_69c[i]=_69c[i].charAt(0).toUpperCase()+_69c[i].substring(1);
}
text=_69c.join(" ");
break;
case "uppercase":
text=text.toUpperCase();
break;
case "lowercase":
text=text.toLowerCase();
break;
default:
break;
}
switch(_69b){
case "nowrap":
break;
case "pre-wrap":
break;
case "pre-line":
break;
case "pre":
break;
default:
text=text.replace(/\s+/," ");
if(/\s$/.test(_697)){
text.replace(/^\s/,"");
}
break;
}
_697+=text;
break;
default:
break;
}
}
return _697;
};
dojo.html.createNodesFromText=function(txt,trim){
if(trim){
txt=txt.replace(/^\s+|\s+$/g,"");
}
var tn=dojo.doc().createElement("div");
tn.style.visibility="hidden";
dojo.body().appendChild(tn);
var _6a0="none";
if((/^<t[dh][\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table><tbody><tr>"+txt+"</tr></tbody></table>";
_6a0="cell";
}else{
if((/^<tr[\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table><tbody>"+txt+"</tbody></table>";
_6a0="row";
}else{
if((/^<(thead|tbody|tfoot)[\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table>"+txt+"</table>";
_6a0="section";
}
}
}
tn.innerHTML=txt;
if(tn["normalize"]){
tn.normalize();
}
var _6a1=null;
switch(_6a0){
case "cell":
_6a1=tn.getElementsByTagName("tr")[0];
break;
case "row":
_6a1=tn.getElementsByTagName("tbody")[0];
break;
case "section":
_6a1=tn.getElementsByTagName("table")[0];
break;
default:
_6a1=tn;
break;
}
var _6a2=[];
for(var x=0;x<_6a1.childNodes.length;x++){
_6a2.push(_6a1.childNodes[x].cloneNode(true));
}
tn.style.display="none";
dojo.body().removeChild(tn);
return _6a2;
};
dojo.html.placeOnScreen=function(node,_6a5,_6a6,_6a7,_6a8,_6a9,_6aa){
if(_6a5 instanceof Array||typeof _6a5=="array"){
_6aa=_6a9;
_6a9=_6a8;
_6a8=_6a7;
_6a7=_6a6;
_6a6=_6a5[1];
_6a5=_6a5[0];
}
if(_6a9 instanceof String||typeof _6a9=="string"){
_6a9=_6a9.split(",");
}
if(!isNaN(_6a7)){
_6a7=[Number(_6a7),Number(_6a7)];
}else{
if(!(_6a7 instanceof Array||typeof _6a7=="array")){
_6a7=[0,0];
}
}
var _6ab=dojo.html.getScroll().offset;
var view=dojo.html.getViewport();
node=dojo.byId(node);
var _6ad=node.style.display;
node.style.display="";
var bb=dojo.html.getBorderBox(node);
var w=bb.width;
var h=bb.height;
node.style.display=_6ad;
if(!(_6a9 instanceof Array||typeof _6a9=="array")){
_6a9=["TL"];
}
var _6b1,besty,bestDistance=Infinity;
for(var _6b2=0;_6b2<_6a9.length;++_6b2){
var _6b3=_6a9[_6b2];
var _6b4=true;
var tryX=_6a5-(_6b3.charAt(1)=="L"?0:w)+_6a7[0]*(_6b3.charAt(1)=="L"?1:-1);
var tryY=_6a6-(_6b3.charAt(0)=="T"?0:h)+_6a7[1]*(_6b3.charAt(0)=="T"?1:-1);
if(_6a8){
tryX-=_6ab.x;
tryY-=_6ab.y;
}
var x=tryX+w;
if(x>view.width){
x=view.width-w;
_6b4=false;
}else{
x=tryX;
}
x=Math.max(_6a7[0],x)+_6ab.x;
var y=tryY+h;
if(y>view.height){
y=view.height-h;
_6b4=false;
}else{
y=tryY;
}
y=Math.max(_6a7[1],y)+_6ab.y;
if(_6b4){
_6b1=x;
besty=y;
bestDistance=0;
break;
}else{
var dist=Math.pow(x-tryX-_6ab.x,2)+Math.pow(y-tryY-_6ab.y,2);
if(bestDistance>dist){
bestDistance=dist;
_6b1=x;
besty=y;
}
}
}
if(!_6aa){
node.style.left=_6b1+"px";
node.style.top=besty+"px";
}
return {left:_6b1,top:besty,x:_6b1,y:besty,dist:bestDistance};
};
dojo.html.placeOnScreenPoint=function(node,_6bb,_6bc,_6bd,_6be){
dojo.deprecated("dojo.html.placeOnScreenPoint","use dojo.html.placeOnScreen() instead","0.5");
return dojo.html.placeOnScreen(node,_6bb,_6bc,_6bd,_6be,["TL","TR","BL","BR"]);
};
dojo.html.placeOnScreenAroundElement=function(node,_6c0,_6c1,_6c2,_6c3,_6c4){
var best,bestDistance=Infinity;
_6c0=dojo.byId(_6c0);
var _6c6=_6c0.style.display;
_6c0.style.display="";
var mb=dojo.html.getElementBox(_6c0,_6c2);
var _6c8=mb.width;
var _6c9=mb.height;
var _6ca=dojo.html.getAbsolutePosition(_6c0,true,_6c2);
_6c0.style.display=_6c6;
for(var _6cb in _6c3){
var pos,desiredX,desiredY;
var _6cd=_6c3[_6cb];
desiredX=_6ca.x+(_6cb.charAt(1)=="L"?0:_6c8);
desiredY=_6ca.y+(_6cb.charAt(0)=="T"?0:_6c9);
pos=dojo.html.placeOnScreen(node,desiredX,desiredY,_6c1,true,_6cd,true);
if(pos.dist==0){
best=pos;
break;
}else{
if(bestDistance>pos.dist){
bestDistance=pos.dist;
best=pos;
}
}
}
if(!_6c4){
node.style.left=best.left+"px";
node.style.top=best.top+"px";
}
return best;
};
dojo.html.scrollIntoView=function(node){
if(!node){
return;
}
if(dojo.render.html.ie){
if(dojo.html.getBorderBox(node.parentNode).height<node.parentNode.scrollHeight){
node.scrollIntoView(false);
}
}else{
if(dojo.render.html.mozilla){
node.scrollIntoView(false);
}else{
var _6cf=node.parentNode;
var _6d0=_6cf.scrollTop+dojo.html.getBorderBox(_6cf).height;
var _6d1=node.offsetTop+dojo.html.getMarginBox(node).height;
if(_6d0<_6d1){
_6cf.scrollTop+=(_6d1-_6d0);
}else{
if(_6cf.scrollTop>node.offsetTop){
_6cf.scrollTop-=(_6cf.scrollTop-node.offsetTop);
}
}
}
}
};
dojo.provide("dojo.lfx.Animation");
dojo.provide("dojo.lfx.Line");
dojo.lfx.Line=function(_6d2,end){
this.start=_6d2;
this.end=end;
if(dojo.lang.isArray(_6d2)){
var diff=[];
dojo.lang.forEach(this.start,function(s,i){
diff[i]=this.end[i]-s;
},this);
this.getValue=function(n){
var res=[];
dojo.lang.forEach(this.start,function(s,i){
res[i]=(diff[i]*n)+s;
},this);
return res;
};
}else{
var diff=end-_6d2;
this.getValue=function(n){
return (diff*n)+this.start;
};
}
};
dojo.lfx.easeDefault=function(n){
if(dojo.render.html.khtml){
return (parseFloat("0.5")+((Math.sin((n+parseFloat("1.5"))*Math.PI))/2));
}else{
return (0.5+((Math.sin((n+1.5)*Math.PI))/2));
dojo.debug(ret);
}
};
dojo.lfx.easeIn=function(n){
return Math.pow(n,3);
};
dojo.lfx.easeOut=function(n){
return (1-Math.pow(1-n,3));
};
dojo.lfx.easeInOut=function(n){
return ((3*Math.pow(n,2))-(2*Math.pow(n,3)));
};
dojo.lfx.IAnimation=function(){
};
dojo.lang.extend(dojo.lfx.IAnimation,{curve:null,duration:1000,easing:null,repeatCount:0,rate:25,handler:null,beforeBegin:null,onBegin:null,onAnimate:null,onEnd:null,onPlay:null,onPause:null,onStop:null,play:null,pause:null,stop:null,connect:function(evt,_6e1,_6e2){
if(!_6e2){
_6e2=_6e1;
_6e1=this;
}
_6e2=dojo.lang.hitch(_6e1,_6e2);
var _6e3=this[evt]||function(){
};
this[evt]=function(){
var ret=_6e3.apply(this,arguments);
_6e2.apply(this,arguments);
return ret;
};
return this;
},fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,(args||[]));
}
return this;
},repeat:function(_6e7){
this.repeatCount=_6e7;
return this;
},_active:false,_paused:false});
dojo.lfx.Animation=function(_6e8,_6e9,_6ea,_6eb,_6ec,rate){
dojo.lfx.IAnimation.call(this);
if(dojo.lang.isNumber(_6e8)||(!_6e8&&_6e9.getValue)){
rate=_6ec;
_6ec=_6eb;
_6eb=_6ea;
_6ea=_6e9;
_6e9=_6e8;
_6e8=null;
}else{
if(_6e8.getValue||dojo.lang.isArray(_6e8)){
rate=_6eb;
_6ec=_6ea;
_6eb=_6e9;
_6ea=_6e8;
_6e9=null;
_6e8=null;
}
}
if(dojo.lang.isArray(_6ea)){
this.curve=new dojo.lfx.Line(_6ea[0],_6ea[1]);
}else{
this.curve=_6ea;
}
if(_6e9!=null&&_6e9>0){
this.duration=_6e9;
}
if(_6ec){
this.repeatCount=_6ec;
}
if(rate){
this.rate=rate;
}
if(_6e8){
dojo.lang.forEach(["handler","beforeBegin","onBegin","onEnd","onPlay","onStop","onAnimate"],function(item){
if(_6e8[item]){
this.connect(item,_6e8[item]);
}
},this);
}
if(_6eb&&dojo.lang.isFunction(_6eb)){
this.easing=_6eb;
}
};
dojo.inherits(dojo.lfx.Animation,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Animation,{_startTime:null,_endTime:null,_timer:null,_percent:0,_startRepeatCount:0,play:function(_6ef,_6f0){
if(_6f0){
clearTimeout(this._timer);
this._active=false;
this._paused=false;
this._percent=0;
}else{
if(this._active&&!this._paused){
return this;
}
}
this.fire("handler",["beforeBegin"]);
this.fire("beforeBegin");
if(_6ef>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_6f0);
}),_6ef);
return this;
}
this._startTime=new Date().valueOf();
if(this._paused){
this._startTime-=(this.duration*this._percent/100);
}
this._endTime=this._startTime+this.duration;
this._active=true;
this._paused=false;
var step=this._percent/100;
var _6f2=this.curve.getValue(step);
if(this._percent==0){
if(!this._startRepeatCount){
this._startRepeatCount=this.repeatCount;
}
this.fire("handler",["begin",_6f2]);
this.fire("onBegin",[_6f2]);
}
this.fire("handler",["play",_6f2]);
this.fire("onPlay",[_6f2]);
this._cycle();
return this;
},pause:function(){
clearTimeout(this._timer);
if(!this._active){
return this;
}
this._paused=true;
var _6f3=this.curve.getValue(this._percent/100);
this.fire("handler",["pause",_6f3]);
this.fire("onPause",[_6f3]);
return this;
},gotoPercent:function(pct,_6f5){
clearTimeout(this._timer);
this._active=true;
this._paused=true;
this._percent=pct;
if(_6f5){
this.play();
}
return this;
},stop:function(_6f6){
clearTimeout(this._timer);
var step=this._percent/100;
if(_6f6){
step=1;
}
var _6f8=this.curve.getValue(step);
this.fire("handler",["stop",_6f8]);
this.fire("onStop",[_6f8]);
this._active=false;
this._paused=false;
return this;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}else{
return "stopped";
}
return this;
},_cycle:function(){
clearTimeout(this._timer);
if(this._active){
var curr=new Date().valueOf();
var step=(curr-this._startTime)/(this._endTime-this._startTime);
if(step>=1){
step=1;
this._percent=100;
}else{
this._percent=step*100;
}
if((this.easing)&&(dojo.lang.isFunction(this.easing))){
step=this.easing(step);
}
var _6fb=this.curve.getValue(step);
this.fire("handler",["animate",_6fb]);
this.fire("onAnimate",[_6fb]);
if(step<1){
this._timer=setTimeout(dojo.lang.hitch(this,"_cycle"),this.rate);
}else{
this._active=false;
this.fire("handler",["end"]);
this.fire("onEnd");
if(this.repeatCount>0){
this.repeatCount--;
this.play(null,true);
}else{
if(this.repeatCount==-1){
this.play(null,true);
}else{
if(this._startRepeatCount){
this.repeatCount=this._startRepeatCount;
this._startRepeatCount=0;
}
}
}
}
}
return this;
}});
dojo.lfx.Combine=function(){
dojo.lfx.IAnimation.call(this);
this._anims=[];
this._animsEnded=0;
var _6fc=arguments;
if(_6fc.length==1&&(dojo.lang.isArray(_6fc[0])||dojo.lang.isArrayLike(_6fc[0]))){
_6fc=_6fc[0];
}
dojo.lang.forEach(_6fc,function(anim){
this._anims.push(anim);
anim.connect("onEnd",dojo.lang.hitch(this,"_onAnimsEnded"));
},this);
};
dojo.inherits(dojo.lfx.Combine,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Combine,{_animsEnded:0,play:function(_6fe,_6ff){
if(!this._anims.length){
return this;
}
this.fire("beforeBegin");
if(_6fe>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_6ff);
}),_6fe);
return this;
}
if(_6ff||this._anims[0].percent==0){
this.fire("onBegin");
}
this.fire("onPlay");
this._animsCall("play",null,_6ff);
return this;
},pause:function(){
this.fire("onPause");
this._animsCall("pause");
return this;
},stop:function(_700){
this.fire("onStop");
this._animsCall("stop",_700);
return this;
},_onAnimsEnded:function(){
this._animsEnded++;
if(this._animsEnded>=this._anims.length){
this.fire("onEnd");
}
return this;
},_animsCall:function(_701){
var args=[];
if(arguments.length>1){
for(var i=1;i<arguments.length;i++){
args.push(arguments[i]);
}
}
var _704=this;
dojo.lang.forEach(this._anims,function(anim){
anim[_701](args);
},_704);
return this;
}});
dojo.lfx.Chain=function(){
dojo.lfx.IAnimation.call(this);
this._anims=[];
this._currAnim=-1;
var _706=arguments;
if(_706.length==1&&(dojo.lang.isArray(_706[0])||dojo.lang.isArrayLike(_706[0]))){
_706=_706[0];
}
var _707=this;
dojo.lang.forEach(_706,function(anim,i,_70a){
this._anims.push(anim);
if(i<_70a.length-1){
anim.connect("onEnd",dojo.lang.hitch(this,"_playNext"));
}else{
anim.connect("onEnd",dojo.lang.hitch(this,function(){
this.fire("onEnd");
}));
}
},this);
};
dojo.inherits(dojo.lfx.Chain,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Chain,{_currAnim:-1,play:function(_70b,_70c){
if(!this._anims.length){
return this;
}
if(_70c||!this._anims[this._currAnim]){
this._currAnim=0;
}
var _70d=this._anims[this._currAnim];
this.fire("beforeBegin");
if(_70b>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_70c);
}),_70b);
return this;
}
if(_70d){
if(this._currAnim==0){
this.fire("handler",["begin",this._currAnim]);
this.fire("onBegin",[this._currAnim]);
}
this.fire("onPlay",[this._currAnim]);
_70d.play(null,_70c);
}
return this;
},pause:function(){
if(this._anims[this._currAnim]){
this._anims[this._currAnim].pause();
this.fire("onPause",[this._currAnim]);
}
return this;
},playPause:function(){
if(this._anims.length==0){
return this;
}
if(this._currAnim==-1){
this._currAnim=0;
}
var _70e=this._anims[this._currAnim];
if(_70e){
if(!_70e._active||_70e._paused){
this.play();
}else{
this.pause();
}
}
return this;
},stop:function(){
var _70f=this._anims[this._currAnim];
if(_70f){
_70f.stop();
this.fire("onStop",[this._currAnim]);
}
return _70f;
},_playNext:function(){
if(this._currAnim==-1||this._anims.length==0){
return this;
}
this._currAnim++;
if(this._anims[this._currAnim]){
this._anims[this._currAnim].play(null,true);
}
return this;
}});
dojo.lfx.combine=function(){
var _710=arguments;
if(dojo.lang.isArray(arguments[0])){
_710=arguments[0];
}
if(_710.length==1){
return _710[0];
}
return new dojo.lfx.Combine(_710);
};
dojo.lfx.chain=function(){
var _711=arguments;
if(dojo.lang.isArray(arguments[0])){
_711=arguments[0];
}
if(_711.length==1){
return _711[0];
}
return new dojo.lfx.Chain(_711);
};
dojo.provide("dojo.graphics.color");
dojo.graphics.color.Color=function(r,g,b,a){
if(dojo.lang.isArray(r)){
this.r=r[0];
this.g=r[1];
this.b=r[2];
this.a=r[3]||1;
}else{
if(dojo.lang.isString(r)){
var rgb=dojo.graphics.color.extractRGB(r);
this.r=rgb[0];
this.g=rgb[1];
this.b=rgb[2];
this.a=g||1;
}else{
if(r instanceof dojo.graphics.color.Color){
this.r=r.r;
this.b=r.b;
this.g=r.g;
this.a=r.a;
}else{
this.r=r;
this.g=g;
this.b=b;
this.a=a;
}
}
}
};
dojo.graphics.color.Color.fromArray=function(arr){
return new dojo.graphics.color.Color(arr[0],arr[1],arr[2],arr[3]);
};
dojo.lang.extend(dojo.graphics.color.Color,{toRgb:function(_718){
if(_718){
return this.toRgba();
}else{
return [this.r,this.g,this.b];
}
},toRgba:function(){
return [this.r,this.g,this.b,this.a];
},toHex:function(){
return dojo.graphics.color.rgb2hex(this.toRgb());
},toCss:function(){
return "rgb("+this.toRgb().join()+")";
},toString:function(){
return this.toHex();
},blend:function(_719,_71a){
return dojo.graphics.color.blend(this.toRgb(),new dojo.graphics.color.Color(_719).toRgb(),_71a);
}});
dojo.graphics.color.named={white:[255,255,255],black:[0,0,0],red:[255,0,0],green:[0,255,0],blue:[0,0,255],navy:[0,0,128],gray:[128,128,128],silver:[192,192,192]};
dojo.graphics.color.blend=function(a,b,_71d){
if(typeof a=="string"){
return dojo.graphics.color.blendHex(a,b,_71d);
}
if(!_71d){
_71d=0;
}else{
if(_71d>1){
_71d=1;
}else{
if(_71d<-1){
_71d=-1;
}
}
}
var c=new Array(3);
for(var i=0;i<3;i++){
var half=Math.abs(a[i]-b[i])/2;
c[i]=Math.floor(Math.min(a[i],b[i])+half+(half*_71d));
}
return c;
};
dojo.graphics.color.blendHex=function(a,b,_723){
return dojo.graphics.color.rgb2hex(dojo.graphics.color.blend(dojo.graphics.color.hex2rgb(a),dojo.graphics.color.hex2rgb(b),_723));
};
dojo.graphics.color.extractRGB=function(_724){
var hex="0123456789abcdef";
_724=_724.toLowerCase();
if(_724.indexOf("rgb")==0){
var _726=_724.match(/rgba*\((\d+), *(\d+), *(\d+)/i);
var ret=_726.splice(1,3);
return ret;
}else{
var _728=dojo.graphics.color.hex2rgb(_724);
if(_728){
return _728;
}else{
return dojo.graphics.color.named[_724]||[255,255,255];
}
}
};
dojo.graphics.color.hex2rgb=function(hex){
var _72a="0123456789ABCDEF";
var rgb=new Array(3);
if(hex.indexOf("#")==0){
hex=hex.substring(1);
}
hex=hex.toUpperCase();
if(hex.replace(new RegExp("["+_72a+"]","g"),"")!=""){
return null;
}
if(hex.length==3){
rgb[0]=hex.charAt(0)+hex.charAt(0);
rgb[1]=hex.charAt(1)+hex.charAt(1);
rgb[2]=hex.charAt(2)+hex.charAt(2);
}else{
rgb[0]=hex.substring(0,2);
rgb[1]=hex.substring(2,4);
rgb[2]=hex.substring(4);
}
for(var i=0;i<rgb.length;i++){
rgb[i]=_72a.indexOf(rgb[i].charAt(0))*16+_72a.indexOf(rgb[i].charAt(1));
}
return rgb;
};
dojo.graphics.color.rgb2hex=function(r,g,b){
if(dojo.lang.isArray(r)){
g=r[1]||0;
b=r[2]||0;
r=r[0]||0;
}
var ret=dojo.lang.map([r,g,b],function(x){
x=new Number(x);
var s=x.toString(16);
while(s.length<2){
s="0"+s;
}
return s;
});
ret.unshift("#");
return ret.join("");
};
dojo.provide("dojo.html.color");
dojo.html.getBackgroundColor=function(node){
node=dojo.byId(node);
var _734;
do{
_734=dojo.html.getStyle(node,"background-color");
if(_734.toLowerCase()=="rgba(0, 0, 0, 0)"){
_734="transparent";
}
if(node==document.getElementsByTagName("body")[0]){
node=null;
break;
}
node=node.parentNode;
}while(node&&dojo.lang.inArray(["transparent",""],_734));
if(_734=="transparent"){
_734=[255,255,255,0];
}else{
_734=dojo.graphics.color.extractRGB(_734);
}
return _734;
};
dojo.provide("dojo.lfx.html");
dojo.lfx.html._byId=function(_735){
if(!_735){
return [];
}
if(dojo.lang.isArrayLike(_735)){
if(!_735.alreadyChecked){
var n=[];
dojo.lang.forEach(_735,function(node){
n.push(dojo.byId(node));
});
n.alreadyChecked=true;
return n;
}else{
return _735;
}
}else{
var n=[];
n.push(dojo.byId(_735));
n.alreadyChecked=true;
return n;
}
};
dojo.lfx.html.propertyAnimation=function(_738,_739,_73a,_73b,_73c){
_738=dojo.lfx.html._byId(_738);
var _73d={"propertyMap":_739,"nodes":_738,"duration":_73a,"easing":_73b||dojo.lfx.easeDefault};
var _73e=function(args){
if(args.nodes.length==1){
var pm=args.propertyMap;
if(!dojo.lang.isArray(args.propertyMap)){
var parr=[];
for(var _742 in pm){
pm[_742].property=_742;
parr.push(pm[_742]);
}
pm=args.propertyMap=parr;
}
dojo.lang.forEach(pm,function(prop){
if(dj_undef("start",prop)){
if(prop.property!="opacity"){
prop.start=parseInt(dojo.html.getComputedStyle(args.nodes[0],prop.property));
}else{
prop.start=dojo.html.getOpacity(args.nodes[0]);
}
}
});
}
};
var _744=function(_745){
var _746=[];
dojo.lang.forEach(_745,function(c){
_746.push(Math.round(c));
});
return _746;
};
var _748=function(n,_74a){
n=dojo.byId(n);
if(!n||!n.style){
return;
}
for(var s in _74a){
if(s=="opacity"){
dojo.html.setOpacity(n,_74a[s]);
}else{
n.style[s]=_74a[s];
}
}
};
var _74c=function(_74d){
this._properties=_74d;
this.diffs=new Array(_74d.length);
dojo.lang.forEach(_74d,function(prop,i){
if(dojo.lang.isFunction(prop.start)){
prop.start=prop.start(prop,i);
}
if(dojo.lang.isFunction(prop.end)){
prop.end=prop.end(prop,i);
}
if(dojo.lang.isArray(prop.start)){
this.diffs[i]=null;
}else{
if(prop.start instanceof dojo.graphics.color.Color){
prop.startRgb=prop.start.toRgb();
prop.endRgb=prop.end.toRgb();
}else{
this.diffs[i]=prop.end-prop.start;
}
}
},this);
this.getValue=function(n){
var ret={};
dojo.lang.forEach(this._properties,function(prop,i){
var _754=null;
if(dojo.lang.isArray(prop.start)){
}else{
if(prop.start instanceof dojo.graphics.color.Color){
_754=(prop.units||"rgb")+"(";
for(var j=0;j<prop.startRgb.length;j++){
_754+=Math.round(((prop.endRgb[j]-prop.startRgb[j])*n)+prop.startRgb[j])+(j<prop.startRgb.length-1?",":"");
}
_754+=")";
}else{
_754=((this.diffs[i])*n)+prop.start+(prop.property!="opacity"?prop.units||"px":"");
}
}
ret[dojo.html.toCamelCase(prop.property)]=_754;
},this);
return ret;
};
};
var anim=new dojo.lfx.Animation({beforeBegin:function(){
_73e(_73d);
anim.curve=new _74c(_73d.propertyMap);
},onAnimate:function(_757){
dojo.lang.forEach(_73d.nodes,function(node){
_748(node,_757);
});
}},_73d.duration,null,_73d.easing);
if(_73c){
for(var x in _73c){
if(dojo.lang.isFunction(_73c[x])){
anim.connect(x,anim,_73c[x]);
}
}
}
return anim;
};
dojo.lfx.html._makeFadeable=function(_75a){
var _75b=function(node){
if(dojo.render.html.ie){
if((node.style.zoom.length==0)&&(dojo.html.getStyle(node,"zoom")=="normal")){
node.style.zoom="1";
}
if((node.style.width.length==0)&&(dojo.html.getStyle(node,"width")=="auto")){
node.style.width="auto";
}
}
};
if(dojo.lang.isArrayLike(_75a)){
dojo.lang.forEach(_75a,_75b);
}else{
_75b(_75a);
}
};
dojo.lfx.html.fade=function(_75d,_75e,_75f,_760,_761){
_75d=dojo.lfx.html._byId(_75d);
var _762={property:"opacity"};
if(!dj_undef("start",_75e)){
_762.start=_75e.start;
}else{
_762.start=function(){
return dojo.html.getOpacity(_75d[0]);
};
}
if(!dj_undef("end",_75e)){
_762.end=_75e.end;
}else{
dojo.raise("dojo.lfx.html.fade needs an end value");
}
var anim=dojo.lfx.propertyAnimation(_75d,[_762],_75f,_760);
anim.connect("beforeBegin",function(){
dojo.lfx.html._makeFadeable(_75d);
});
if(_761){
anim.connect("onEnd",function(){
_761(_75d,anim);
});
}
return anim;
};
dojo.lfx.html.fadeIn=function(_764,_765,_766,_767){
return dojo.lfx.html.fade(_764,{end:1},_765,_766,_767);
};
dojo.lfx.html.fadeOut=function(_768,_769,_76a,_76b){
return dojo.lfx.html.fade(_768,{end:0},_769,_76a,_76b);
};
dojo.lfx.html.fadeShow=function(_76c,_76d,_76e,_76f){
_76c=dojo.lfx.html._byId(_76c);
dojo.lang.forEach(_76c,function(node){
dojo.html.setOpacity(node,0);
});
var anim=dojo.lfx.html.fadeIn(_76c,_76d,_76e,_76f);
anim.connect("beforeBegin",function(){
if(dojo.lang.isArrayLike(_76c)){
dojo.lang.forEach(_76c,dojo.html.show);
}else{
dojo.html.show(_76c);
}
});
return anim;
};
dojo.lfx.html.fadeHide=function(_772,_773,_774,_775){
var anim=dojo.lfx.html.fadeOut(_772,_773,_774,function(){
if(dojo.lang.isArrayLike(_772)){
dojo.lang.forEach(_772,dojo.html.hide);
}else{
dojo.html.hide(_772);
}
if(_775){
_775(_772,anim);
}
});
return anim;
};
dojo.lfx.html.wipeIn=function(_777,_778,_779,_77a){
_777=dojo.lfx.html._byId(_777);
var _77b=[];
dojo.lang.forEach(_777,function(node){
var _77d={overflow:null};
var anim=dojo.lfx.propertyAnimation(node,{"height":{start:0,end:function(){
return node.scrollHeight;
}}},_778,_779);
anim.connect("beforeBegin",function(){
_77d.overflow=dojo.html.getStyle(node,"overflow");
with(node.style){
if(_77d.overflow=="visible"){
overflow="hidden";
}
visibility="visible";
height="0px";
}
dojo.html.show(node);
});
anim.connect("onEnd",function(){
with(node.style){
overflow=_77d.overflow;
height="";
visibility="visible";
}
if(_77a){
_77a(node,anim);
}
});
_77b.push(anim);
});
return dojo.lfx.combine(_77b);
};
dojo.lfx.html.wipeOut=function(_77f,_780,_781,_782){
_77f=dojo.lfx.html._byId(_77f);
var _783=[];
dojo.lang.forEach(_77f,function(node){
var _785={overflow:null};
var anim=dojo.lfx.propertyAnimation(node,{"height":{start:function(){
return dojo.html.getContentBox(node).height;
},end:0}},_780,_781,{"beforeBegin":function(){
_785.overflow=dojo.html.getStyle(node,"overflow");
if(_785.overflow=="visible"){
node.style.overflow="hidden";
}
node.style.visibility="visible";
dojo.html.show(node);
},"onEnd":function(){
with(node.style){
overflow=_785.overflow;
visibility="hidden";
height="";
}
if(_782){
_782(node,anim);
}
}});
_783.push(anim);
});
return dojo.lfx.combine(_783);
};
dojo.lfx.html.slideTo=function(_787,_788,_789,_78a,_78b){
_787=dojo.lfx.html._byId(_787);
var _78c=[];
var _78d=dojo.html.getComputedStyle;
if(dojo.lang.isArray(_788)){
dojo.deprecated("dojo.lfx.html.slideTo(node, array)","use dojo.lfx.html.slideTo(node, {top: value, left: value});","0.5");
_788={top:_788[0],left:_788[1]};
}
dojo.lang.forEach(_787,function(node){
var top=null;
var left=null;
var init=(function(){
var _792=node;
return function(){
var pos=_78d(_792,"position");
top=(pos=="absolute"?node.offsetTop:parseInt(_78d(node,"top"))||0);
left=(pos=="absolute"?node.offsetLeft:parseInt(_78d(node,"left"))||0);
if(!dojo.lang.inArray(["absolute","relative"],pos)){
var ret=dojo.html.abs(_792,true);
dojo.html.setStyleAttributes(_792,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
top=ret.y;
left=ret.x;
}
};
})();
init();
var anim=dojo.lfx.propertyAnimation(node,{"top":{start:top,end:(_788.top||0)},"left":{start:left,end:(_788.left||0)}},_789,_78a,{"beforeBegin":init});
if(_78b){
anim.connect("onEnd",function(){
_78b(_787,anim);
});
}
_78c.push(anim);
});
return dojo.lfx.combine(_78c);
};
dojo.lfx.html.slideBy=function(_796,_797,_798,_799,_79a){
_796=dojo.lfx.html._byId(_796);
var _79b=[];
var _79c=dojo.html.getComputedStyle;
if(dojo.lang.isArray(_797)){
dojo.deprecated("dojo.lfx.html.slideBy(node, array)","use dojo.lfx.html.slideBy(node, {top: value, left: value});","0.5");
_797={top:_797[0],left:_797[1]};
}
dojo.lang.forEach(_796,function(node){
var top=null;
var left=null;
var init=(function(){
var _7a1=node;
return function(){
var pos=_79c(_7a1,"position");
top=(pos=="absolute"?node.offsetTop:parseInt(_79c(node,"top"))||0);
left=(pos=="absolute"?node.offsetLeft:parseInt(_79c(node,"left"))||0);
if(!dojo.lang.inArray(["absolute","relative"],pos)){
var ret=dojo.html.abs(_7a1,true);
dojo.html.setStyleAttributes(_7a1,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
top=ret.y;
left=ret.x;
}
};
})();
init();
var anim=dojo.lfx.propertyAnimation(node,{"top":{start:top,end:top+(_797.top||0)},"left":{start:left,end:left+(_797.left||0)}},_798,_799).connect("beforeBegin",init);
if(_79a){
anim.connect("onEnd",function(){
_79a(_796,anim);
});
}
_79b.push(anim);
});
return dojo.lfx.combine(_79b);
};
dojo.lfx.html.explode=function(_7a5,_7a6,_7a7,_7a8,_7a9){
var h=dojo.html;
_7a5=dojo.byId(_7a5);
_7a6=dojo.byId(_7a6);
var _7ab=h.toCoordinateObject(_7a5,true);
var _7ac=document.createElement("div");
h.copyStyle(_7ac,_7a6);
with(_7ac.style){
position="absolute";
display="none";
}
dojo.body().appendChild(_7ac);
with(_7a6.style){
visibility="hidden";
display="block";
}
var _7ad=h.toCoordinateObject(_7a6,true);
_7ac.style.backgroundColor=h.getStyle(_7a6,"background-color").toLowerCase();
with(_7a6.style){
display="none";
visibility="visible";
}
var _7ae={opacity:{start:0.5,end:1}};
dojo.lang.forEach(["height","width","top","left"],function(type){
_7ae[type]={start:_7ab[type],end:_7ad[type]};
});
var anim=new dojo.lfx.propertyAnimation(_7ac,_7ae,_7a7,_7a8,{"beforeBegin":function(){
h.setDisplay(_7ac,"block");
},"onEnd":function(){
h.setDisplay(_7a6,"block");
_7ac.parentNode.removeChild(_7ac);
}});
if(_7a9){
anim.connect("onEnd",function(){
_7a9(_7a6,anim);
});
}
return anim;
};
dojo.lfx.html.implode=function(_7b1,end,_7b3,_7b4,_7b5){
var h=dojo.html;
_7b1=dojo.byId(_7b1);
end=dojo.byId(end);
var _7b7=dojo.html.toCoordinateObject(_7b1,true);
var _7b8=dojo.html.toCoordinateObject(end,true);
var _7b9=document.createElement("div");
dojo.html.copyStyle(_7b9,_7b1);
dojo.html.setOpacity(_7b9,0.3);
with(_7b9.style){
position="absolute";
display="none";
backgroundColor=h.getStyle(_7b1,"background-color").toLowerCase();
}
dojo.body().appendChild(_7b9);
var _7ba={opacity:{start:1,end:0.5}};
dojo.lang.forEach(["height","width","top","left"],function(type){
_7ba[type]={start:_7b7[type],end:_7b8[type]};
});
var anim=new dojo.lfx.propertyAnimation(_7b9,_7ba,_7b3,_7b4,{"beforeBegin":function(){
dojo.html.hide(_7b1);
dojo.html.show(_7b9);
},"onEnd":function(){
_7b9.parentNode.removeChild(_7b9);
}});
if(_7b5){
anim.connect("onEnd",function(){
_7b5(_7b1,anim);
});
}
return anim;
};
dojo.lfx.html.highlight=function(_7bd,_7be,_7bf,_7c0,_7c1){
_7bd=dojo.lfx.html._byId(_7bd);
var _7c2=[];
dojo.lang.forEach(_7bd,function(node){
var _7c4=dojo.html.getBackgroundColor(node);
var bg=dojo.html.getStyle(node,"background-color").toLowerCase();
var _7c6=dojo.html.getStyle(node,"background-image");
var _7c7=(bg=="transparent"||bg=="rgba(0, 0, 0, 0)");
while(_7c4.length>3){
_7c4.pop();
}
var rgb=new dojo.graphics.color.Color(_7be);
var _7c9=new dojo.graphics.color.Color(_7c4);
var anim=dojo.lfx.propertyAnimation(node,{"background-color":{start:rgb,end:_7c9}},_7bf,_7c0,{"beforeBegin":function(){
if(_7c6){
node.style.backgroundImage="none";
}
node.style.backgroundColor="rgb("+rgb.toRgb().join(",")+")";
},"onEnd":function(){
if(_7c6){
node.style.backgroundImage=_7c6;
}
if(_7c7){
node.style.backgroundColor="transparent";
}
if(_7c1){
_7c1(node,anim);
}
}});
_7c2.push(anim);
});
return dojo.lfx.combine(_7c2);
};
dojo.lfx.html.unhighlight=function(_7cb,_7cc,_7cd,_7ce,_7cf){
_7cb=dojo.lfx.html._byId(_7cb);
var _7d0=[];
dojo.lang.forEach(_7cb,function(node){
var _7d2=new dojo.graphics.color.Color(dojo.html.getBackgroundColor(node));
var rgb=new dojo.graphics.color.Color(_7cc);
var _7d4=dojo.html.getStyle(node,"background-image");
var anim=dojo.lfx.propertyAnimation(node,{"background-color":{start:_7d2,end:rgb}},_7cd,_7ce,{"beforeBegin":function(){
if(_7d4){
node.style.backgroundImage="none";
}
node.style.backgroundColor="rgb("+_7d2.toRgb().join(",")+")";
},"onEnd":function(){
if(_7cf){
_7cf(node,anim);
}
}});
_7d0.push(anim);
});
return dojo.lfx.combine(_7d0);
};
dojo.lang.mixin(dojo.lfx,dojo.lfx.html);
dojo.provide("dojo.lfx.*");
dojo.provide("dojo.lfx.toggle");
dojo.lfx.toggle.plain={show:function(node,_7d7,_7d8,_7d9){
dojo.html.show(node);
if(dojo.lang.isFunction(_7d9)){
_7d9();
}
},hide:function(node,_7db,_7dc,_7dd){
dojo.html.hide(node);
if(dojo.lang.isFunction(_7dd)){
_7dd();
}
}};
dojo.lfx.toggle.fade={show:function(node,_7df,_7e0,_7e1){
dojo.lfx.fadeShow(node,_7df,_7e0,_7e1).play();
},hide:function(node,_7e3,_7e4,_7e5){
dojo.lfx.fadeHide(node,_7e3,_7e4,_7e5).play();
}};
dojo.lfx.toggle.wipe={show:function(node,_7e7,_7e8,_7e9){
dojo.lfx.wipeIn(node,_7e7,_7e8,_7e9).play();
},hide:function(node,_7eb,_7ec,_7ed){
dojo.lfx.wipeOut(node,_7eb,_7ec,_7ed).play();
}};
dojo.lfx.toggle.explode={show:function(node,_7ef,_7f0,_7f1,_7f2){
dojo.lfx.explode(_7f2||{x:0,y:0,width:0,height:0},node,_7ef,_7f0,_7f1).play();
},hide:function(node,_7f4,_7f5,_7f6,_7f7){
dojo.lfx.implode(node,_7f7||{x:0,y:0,width:0,height:0},_7f4,_7f5,_7f6).play();
}};
dojo.provide("dojo.widget.HtmlWidget");
dojo.declare("dojo.widget.HtmlWidget",dojo.widget.DomWidget,{widgetType:"HtmlWidget",templateCssPath:null,templatePath:null,lang:"",toggle:"plain",toggleDuration:150,animationInProgress:false,initialize:function(args,frag){
},postMixInProperties:function(args,frag){
if(this.lang===""){
this.lang=null;
}
this.toggleObj=dojo.lfx.toggle[this.toggle.toLowerCase()]||dojo.lfx.toggle.plain;
},getContainerHeight:function(){
dojo.unimplemented("dojo.widget.HtmlWidget.getContainerHeight");
},getContainerWidth:function(){
return this.parent.domNode.offsetWidth;
},setNativeHeight:function(_7fc){
var ch=this.getContainerHeight();
},createNodesFromText:function(txt,wrap){
return dojo.html.createNodesFromText(txt,wrap);
},destroyRendering:function(_800){
try{
if(!_800&&this.domNode){
dojo.event.browser.clean(this.domNode);
}
this.domNode.parentNode.removeChild(this.domNode);
delete this.domNode;
}
catch(e){
}
},isShowing:function(){
return dojo.html.isShowing(this.domNode);
},toggleShowing:function(){
if(this.isHidden){
this.show();
}else{
this.hide();
}
},show:function(){
this.animationInProgress=true;
this.isHidden=false;
this.toggleObj.show(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onShow),this.explodeSrc);
},onShow:function(){
this.animationInProgress=false;
this.checkSize();
},hide:function(){
this.animationInProgress=true;
this.isHidden=true;
this.toggleObj.hide(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onHide),this.explodeSrc);
},onHide:function(){
this.animationInProgress=false;
},_isResized:function(w,h){
if(!this.isShowing()){
return false;
}
var wh=dojo.html.getMarginBox(this.domNode);
var _804=w||wh.width;
var _805=h||wh.height;
if(this.width==_804&&this.height==_805){
return false;
}
this.width=_804;
this.height=_805;
return true;
},checkSize:function(){
if(!this._isResized()){
return;
}
this.onResized();
},resizeTo:function(w,h){
if(!this._isResized(w,h)){
return;
}
dojo.html.setMarginBox(this.domNode,{width:w,height:h});
this.onResized();
},resizeSoon:function(){
if(this.isShowing()){
dojo.lang.setTimeout(this,this.onResized,0);
}
},onResized:function(){
dojo.lang.forEach(this.children,function(_808){
if(_808.checkSize){
_808.checkSize();
}
});
}});
dojo.provide("dojo.widget.*");
dojo.provide("dojo.widget.ContentPane");
dojo.widget.defineWidget("dojo.widget.ContentPane",dojo.widget.HtmlWidget,function(){
this._styleNodes=[];
this._onLoadStack=[];
this._onUnLoadStack=[];
this._callOnUnLoad=false;
this.scriptScope;
this._ioBindObj;
this.bindArgs={};
},{isContainer:true,adjustPaths:true,href:"",extractContent:true,parseContent:true,cacheContent:true,preload:false,refreshOnShow:false,handler:"",executeScripts:false,postCreate:function(args,frag,_80b){
if(this.handler!==""){
this.setHandler(this.handler);
}
if(this.isShowing()||this.preload){
this.loadContents();
}
},show:function(){
if(this.refreshOnShow){
this.refresh();
}else{
this.loadContents();
}
dojo.widget.ContentPane.superclass.show.call(this);
},refresh:function(){
this.isLoaded=false;
this.loadContents();
},loadContents:function(){
if(this.isLoaded){
return;
}
if(dojo.lang.isFunction(this.handler)){
this._runHandler();
}else{
if(this.href!=""){
this._downloadExternalContent(this.href,this.cacheContent&&!this.refreshOnShow);
}else{
this.isLoaded=true;
}
}
},setUrl:function(url){
this.href=url;
this.isLoaded=false;
if(this.preload||this.isShowing()){
this.loadContents();
}
},abort:function(){
var bind=this._ioBindObj;
if(!bind||!bind.abort){
return;
}
bind.abort();
delete this._ioBindObj;
},_downloadExternalContent:function(url,_80f){
this.abort();
this._handleDefaults("Loading...","onDownloadStart");
var self=this;
this._ioBindObj=dojo.io.bind(this._cacheSetting({url:url,mimetype:"text/html",load:function(type,data,xhr){
self.onDownloadEnd.call(self,url,data);
},error:function(type,err,xhr){
var e={responseText:xhr.responseText,status:xhr.status,statusText:xhr.statusText,responseHeaders:xhr.getAllResponseHeaders(),_text:"Error loading '"+url+"' ("+xhr.status+" "+xhr.statusText+")"};
self._handleDefaults.call(self,e,"onDownloadError");
self.onLoad();
}},_80f));
},_cacheSetting:function(_818,_819){
for(var x in this.bindArgs){
if(dojo.lang.isUndefined(_818[x])){
_818[x]=this.bindArgs[x];
}
}
if(dojo.lang.isUndefined(_818.useCache)){
_818.useCache=_819;
}
if(dojo.lang.isUndefined(_818.preventCache)){
_818.preventCache=!_819;
}
if(dojo.lang.isUndefined(_818.mimetype)){
_818.mimetype="text/html";
}
return _818;
},onLoad:function(e){
this._runStack("_onLoadStack");
this.isLoaded=true;
},onUnLoad:function(e){
this._runStack("_onUnLoadStack");
delete this.scriptScope;
},_runStack:function(_81d){
var st=this[_81d];
var err="";
var _820=this.scriptScope||window;
for(var i=0;i<st.length;i++){
try{
st[i].call(_820);
}
catch(e){
err+="\n"+st[i]+" failed: "+e.description;
}
}
this[_81d]=[];
if(err.length){
var name=(_81d=="_onLoadStack")?"addOnLoad":"addOnUnLoad";
this._handleDefaults(name+" failure\n "+err,"onExecError",true);
}
},addOnLoad:function(obj,func){
this._pushOnStack(this._onLoadStack,obj,func);
},addOnUnLoad:function(obj,func){
this._pushOnStack(this._onUnLoadStack,obj,func);
},_pushOnStack:function(_827,obj,func){
if(typeof func=="undefined"){
_827.push(obj);
}else{
_827.push(function(){
obj[func]();
});
}
},destroy:function(){
this.onUnLoad();
dojo.widget.ContentPane.superclass.destroy.call(this);
},onExecError:function(e){
},onContentError:function(e){
},onDownloadError:function(e){
},onDownloadStart:function(e){
},onDownloadEnd:function(url,data){
data=this.splitAndFixPaths(data,url);
this.setContent(data);
},_handleDefaults:function(e,_831,_832){
if(!_831){
_831="onContentError";
}
if(dojo.lang.isString(e)){
e={_text:e};
}
if(!e._text){
e._text=e.toString();
}
e.toString=function(){
return this._text;
};
if(typeof e.returnValue!="boolean"){
e.returnValue=true;
}
if(typeof e.preventDefault!="function"){
e.preventDefault=function(){
this.returnValue=false;
};
}
this[_831](e);
if(e.returnValue){
if(_832){
alert(e.toString());
}else{
if(this._callOnUnLoad){
this.onUnLoad();
}
this._callOnUnLoad=false;
this._setContent(e.toString());
}
}
},splitAndFixPaths:function(s,url){
var _835=[],scripts=[],tmp=[];
var _836=[],requires=[],attr=[],styles=[];
var str="",path="",fix="",tagFix="",tag="",origPath="";
if(!url){
url="./";
}
if(s){
var _838=/<title[^>]*>([\s\S]*?)<\/title>/i;
while(_836=_838.exec(s)){
_835.push(_836[1]);
s=s.substring(0,_836.index)+s.substr(_836.index+_836[0].length);
}
if(this.adjustPaths){
var _839=/<[a-z][a-z0-9]*[^>]*\s(?:(?:src|href|style)=[^>])+[^>]*>/i;
var _83a=/\s(src|href|style)=(['"]?)([\w()\[\]\/.,\\'"-:;#=&?\s@]+?)\2/i;
var _83b=/^(?:[#]|(?:(?:https?|ftps?|file|javascript|mailto|news):))/;
while(tag=_839.exec(s)){
str+=s.substring(0,tag.index);
s=s.substring((tag.index+tag[0].length),s.length);
tag=tag[0];
tagFix="";
while(attr=_83a.exec(tag)){
path="";
origPath=attr[3];
switch(attr[1].toLowerCase()){
case "src":
case "href":
if(_83b.exec(origPath)){
path=origPath;
}else{
path=(new dojo.uri.Uri(url,origPath).toString());
}
break;
case "style":
path=dojo.html.fixPathsInCssText(origPath,url);
break;
default:
path=origPath;
}
fix=" "+attr[1]+"="+attr[2]+path+attr[2];
tagFix+=tag.substring(0,attr.index)+fix;
tag=tag.substring((attr.index+attr[0].length),tag.length);
}
str+=tagFix+tag;
}
s=str+s;
}
_838=/(?:<(style)[^>]*>([\s\S]*?)<\/style>|<link ([^>]*rel=['"]?stylesheet['"]?[^>]*)>)/i;
while(_836=_838.exec(s)){
if(_836[1]&&_836[1].toLowerCase()=="style"){
styles.push(dojo.html.fixPathsInCssText(_836[2],url));
}else{
if(attr=_836[3].match(/href=(['"]?)([^'">]*)\1/i)){
styles.push({path:attr[2]});
}
}
s=s.substring(0,_836.index)+s.substr(_836.index+_836[0].length);
}
var _838=/<script([^>]*)>([\s\S]*?)<\/script>/i;
var _83c=/src=(['"]?)([^"']*)\1/i;
var _83d=/.*(\bdojo\b\.js(?:\.uncompressed\.js)?)$/;
var _83e=/(?:var )?\bdjConfig\b(?:[\s]*=[\s]*\{[^}]+\}|\.[\w]*[\s]*=[\s]*[^;\n]*)?;?|dojo\.hostenv\.writeIncludes\(\s*\);?/g;
var _83f=/dojo\.(?:(?:require(?:After)?(?:If)?)|(?:widget\.(?:manager\.)?registerWidgetPackage)|(?:(?:hostenv\.)?setModulePrefix)|defineNamespace)\((['"]).*?\1\)\s*;?/;
while(_836=_838.exec(s)){
if(this.executeScripts&&_836[1]){
if(attr=_83c.exec(_836[1])){
if(_83d.exec(attr[2])){
dojo.debug("Security note! inhibit:"+attr[2]+" from  beeing loaded again.");
}else{
scripts.push({path:attr[2]});
}
}
}
if(_836[2]){
var sc=_836[2].replace(_83e,"");
if(!sc){
continue;
}
while(tmp=_83f.exec(sc)){
requires.push(tmp[0]);
sc=sc.substring(0,tmp.index)+sc.substr(tmp.index+tmp[0].length);
}
if(this.executeScripts){
scripts.push(sc);
}
}
s=s.substr(0,_836.index)+s.substr(_836.index+_836[0].length);
}
if(this.extractContent){
_836=s.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_836){
s=_836[1];
}
}
if(this.executeScripts){
var _838=/(<[a-zA-Z][a-zA-Z0-9]*\s[^>]*\S=(['"])[^>]*[^\.\]])scriptScope([^>]*>)/;
str="";
while(tag=_838.exec(s)){
tmp=((tag[2]=="'")?"\"":"'");
str+=s.substring(0,tag.index);
s=s.substr(tag.index).replace(_838,"$1dojo.widget.byId("+tmp+this.widgetId+tmp+").scriptScope$3");
}
s=str+s;
}
}
return {"xml":s,"styles":styles,"titles":_835,"requires":requires,"scripts":scripts,"url":url};
},_setContent:function(cont){
this.destroyChildren();
for(var i=0;i<this._styleNodes.length;i++){
if(this._styleNodes[i]&&this._styleNodes[i].parentNode){
this._styleNodes[i].parentNode.removeChild(this._styleNodes[i]);
}
}
this._styleNodes=[];
var node=this.containerNode||this.domNode;
while(node.firstChild){
try{
dojo.event.browser.clean(node.firstChild);
}
catch(e){
}
node.removeChild(node.firstChild);
}
try{
if(typeof cont!="string"){
node.innerHTML="";
node.appendChild(cont);
}else{
node.innerHTML=cont;
}
}
catch(e){
e._text="Could'nt load content:"+e.description;
this._handleDefaults(e,"onContentError");
}
},setContent:function(data){
this.abort();
if(this._callOnUnLoad){
this.onUnLoad();
}
this._callOnUnLoad=true;
if(!data||dojo.html.isNode(data)){
this._setContent(data);
this.onResized();
this.onLoad();
}else{
if(!data.xml){
this.href="";
data=this.splitAndFixPaths(data);
}
this._setContent(data.xml);
for(var i=0;i<data.styles.length;i++){
if(data.styles[i].path){
this._styleNodes.push(dojo.html.insertCssFile(data.styles[i].path));
}else{
this._styleNodes.push(dojo.html.insertCssText(data.styles[i]));
}
}
if(this.parseContent){
for(var i=0;i<data.requires.length;i++){
try{
eval(data.requires[i]);
}
catch(e){
e._text="Error in packageloading calls, "+e.description;
this._handleDefaults(e,"onContentError",true);
}
}
}
var _846=this;
function asyncParse(){
if(_846.executeScripts){
_846._executeScripts(data.scripts);
}
if(_846.parseContent){
var node=_846.containerNode||_846.domNode;
var _848=new dojo.xml.Parse();
var frag=_848.parseElement(node,null,true);
dojo.widget.getParser().createSubComponents(frag,_846);
}
_846.onResized();
_846.onLoad();
}
if(dojo.hostenv.isXDomain&&data.requires.length){
dojo.addOnLoad(asyncParse);
}else{
asyncParse();
}
}
},setHandler:function(_84a){
var fcn=dojo.lang.isFunction(_84a)?_84a:window[_84a];
if(!dojo.lang.isFunction(fcn)){
this._handleDefaults("Unable to set handler, '"+_84a+"' not a function.","onExecError",true);
return;
}
this.handler=function(){
return fcn.apply(this,arguments);
};
},_runHandler:function(){
var ret=true;
if(dojo.lang.isFunction(this.handler)){
this.handler(this,this.domNode);
ret=false;
}
this.onLoad();
return ret;
},_executeScripts:function(_84d){
var self=this;
var tmp="",code="";
for(var i=0;i<_84d.length;i++){
if(_84d[i].path){
dojo.io.bind(this._cacheSetting({"url":_84d[i].path,"load":function(type,_852){
dojo.lang.hitch(self,tmp=_852);
},"error":function(type,_854){
_854._text=type+" downloading remote script";
self._handleDefaults.call(self,_854,"onExecError",true);
},"mimetype":"text/plain","sync":true},this.cacheContent));
code+=tmp;
}else{
code+=_84d[i];
}
}
try{
delete this.scriptScope;
this.scriptScope=new (new Function("_container_",code+"; return this;"))(self);
}
catch(e){
e._text="Error running scripts from content:\n"+e.description;
this._handleDefaults(e,"onExecError",true);
}
}});
dojo.provide("dojo.html.selection");
dojo.html.selectionType={NONE:0,TEXT:1,CONTROL:2};
dojo.html.clearSelection=function(){
var _855=dojo.global();
var _856=dojo.doc();
try{
if(_855["getSelection"]){
if(dojo.render.html.safari){
_855.getSelection().collapse();
}else{
_855.getSelection().removeAllRanges();
}
}else{
if(_856.selection){
if(_856.selection.empty){
_856.selection.empty();
}else{
if(_856.selection.clear){
_856.selection.clear();
}
}
}
}
return true;
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.html.disableSelection=function(_857){
_857=dojo.byId(_857)||dojo.body();
var h=dojo.render.html;
if(h.mozilla){
_857.style.MozUserSelect="none";
}else{
if(h.safari){
_857.style.KhtmlUserSelect="none";
}else{
if(h.ie){
_857.unselectable="on";
}else{
return false;
}
}
}
return true;
};
dojo.html.enableSelection=function(_859){
_859=dojo.byId(_859)||dojo.body();
var h=dojo.render.html;
if(h.mozilla){
_859.style.MozUserSelect="";
}else{
if(h.safari){
_859.style.KhtmlUserSelect="";
}else{
if(h.ie){
_859.unselectable="off";
}else{
return false;
}
}
}
return true;
};
dojo.html.selectElement=function(_85b){
var _85c=dojo.global();
var _85d=dojo.doc();
_85b=dojo.byId(_85b);
if(_85d.selection&&dojo.body().createTextRange){
var _85e=dojo.body().createTextRange();
_85e.moveToElementText(_85b);
_85e.select();
}else{
if(_85c["getSelection"]){
var _85f=_85c.getSelection();
if(_85f["selectAllChildren"]){
_85f.selectAllChildren(_85b);
}
}
}
};
dojo.html.selectInputText=function(_860){
var _861=dojo.global();
var _862=dojo.doc();
_860=dojo.byId(_860);
if(_862.selection&&dojo.body().createTextRange){
var _863=_860.createTextRange();
_863.moveStart("character",0);
_863.moveEnd("character",_860.value.length);
_863.select();
}else{
if(_861["getSelection"]){
var _864=_861.getSelection();
_860.setSelectionRange(0,_860.value.length);
}
}
_860.focus();
};
dojo.html.isSelectionCollapsed=function(){
var _865=dojo.global();
var _866=dojo.doc();
if(_866["selection"]){
return _866.selection.createRange().text=="";
}else{
if(_865["getSelection"]){
var _867=_865.getSelection();
if(dojo.lang.isString(_867)){
return _867=="";
}else{
return _867.isCollapsed;
}
}
}
};
dojo.lang.mixin(dojo.html.selection,{getType:function(){
if(dojo.doc().selection){
return dojo.html.selectionType[dojo.doc().selection.type.toUpperCase()];
}else{
var _868=dojo.html.selectionType.TEXT;
var oSel;
try{
oSel=dojo.global().getSelection();
}
catch(e){
}
if(oSel&&oSel.rangeCount==1){
var _86a=oSel.getRangeAt(0);
if(_86a.startContainer==_86a.endContainer&&(_86a.endOffset-_86a.startOffset)==1&&_86a.startContainer.nodeType!=dojo.dom.TEXT_NODE){
_868=dojo.html.selectionType.CONTROL;
}
}
return _868;
}
},getSelectedElement:function(){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
if(dojo.doc().selection){
var _86b=dojo.doc().selection.createRange();
if(_86b&&_86b.item){
return dojo.doc().selection.createRange().item(0);
}
}else{
var _86c=dojo.global().getSelection();
return _86c.anchorNode.childNodes[_86c.anchorOffset];
}
}
},getParentElement:function(){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
var p=dojo.html.selection.getSelectedElement();
if(p){
return p.parentNode;
}
}else{
if(dojo.doc().selection){
return dojo.doc().selection.createRange().parentElement();
}else{
var _86e=dojo.global().getSelection();
if(_86e){
var node=_86e.anchorNode;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.parentNode;
}
return node;
}
}
}
},hasAncestorElement:function(_870){
return (dojo.html.selection.getAncestorElement.apply(this,arguments)!=null);
},getAncestorElement:function(_871){
var node=dojo.html.selection.getSelectedElement()||dojo.html.selection.getParentElement();
while(node){
if(dojo.html.selection.isTag(node,arguments).length>0){
return node;
}
node=node.parentNode;
}
return null;
},isTag:function(node,tags){
if(node&&node.tagName){
for(var i=0;i<tags.length;i++){
if(node.tagName.toLowerCase()==String(tags[i]).toLowerCase()){
return String(tags[i]).toLowerCase();
}
}
}
return "";
},selectElement:function(_876){
var _877=dojo.global();
var _878=dojo.doc();
_876=dojo.byId(_876);
if(_878.selection&&dojo.body().createTextRange){
try{
var _879=dojo.body().createControlRange();
_879.addElement(_876);
_879.select();
}
catch(e){
dojo.html.selection.selectElementChildren(_876);
}
}else{
if(_877["getSelection"]){
var _87a=_877.getSelection();
if(_87a["removeAllRanges"]){
var _879=_878.createRange();
_879.selectNode(_876);
_87a.removeAllRanges();
_87a.addRange(_879);
}
}
}
},selectElementChildren:function(_87b){
var _87c=dojo.global();
var _87d=dojo.doc();
_87b=dojo.byId(_87b);
if(_87d.selection&&dojo.body().createTextRange){
var _87e=dojo.body().createTextRange();
_87e.moveToElementText(_87b);
_87e.select();
}else{
if(_87c["getSelection"]){
var _87f=_87c.getSelection();
if(_87f["selectAllChildren"]){
_87f.selectAllChildren(_87b);
}
}
}
},collapse:function(_880){
if(dojo.global().getSelection){
var _881=dojo.global().getSelection();
if(_881.removeAllRanges){
if(_880){
_881.collapseToStart();
}else{
_881.collapseToEnd();
}
}else{
}
}else{
if(dojo.doc().selection){
var _882=dojo.doc().selection.createRange();
_882.collapse(_880);
_882.select();
}
}
},remove:function(){
if(dojo.doc().selection){
var _883=dojo.doc().selection;
if(_883.type.toUpperCase()!="NONE"){
_883.clear();
}
return _883;
}else{
var _883=dojo.global().getSelection();
for(var i=0;i<_883.rangeCount;i++){
_883.getRangeAt(i).deleteContents();
}
return _883;
}
}});
dojo.provide("dojo.html.iframe");
dojo.html.iframeContentWindow=function(_885){
var win=dojo.html.getDocumentWindow(dojo.html.iframeContentDocument(_885))||dojo.html.iframeContentDocument(_885).__parent__||(_885.name&&document.frames[_885.name])||null;
return win;
};
dojo.html.iframeContentDocument=function(_887){
var doc=_887.contentDocument||((_887.contentWindow)&&(_887.contentWindow.document))||((_887.name)&&(document.frames[_887.name])&&(document.frames[_887.name].document))||null;
return doc;
};
dojo.html.BackgroundIframe=function(node){
if(dojo.render.html.ie55||dojo.render.html.ie60){
var html="<iframe "+"style='position: absolute; left: 0px; top: 0px; width: 100%; height: 100%;"+"z-index: -1; filter:Alpha(Opacity=\"0\");' "+">";
this.iframe=dojo.doc().createElement(html);
this.iframe.tabIndex=-1;
if(node){
node.appendChild(this.iframe);
this.domNode=node;
}else{
dojo.body().appendChild(this.iframe);
this.iframe.style.display="none";
}
}
};
dojo.lang.extend(dojo.html.BackgroundIframe,{iframe:null,onResized:function(){
if(this.iframe&&this.domNode&&this.domNode.parentNode){
var _88b=dojo.html.getMarginBox(this.domNode);
if(_88b.width==0||_88b.height==0){
dojo.lang.setTimeout(this,this.onResized,100);
return;
}
with(this.iframe.style){
width=_88b.width+"px";
height=_88b.height+"px";
}
}
},size:function(node){
if(!this.iframe){
return;
}
var _88d=dojo.html.toCoordinateObject(node,true);
with(this.iframe.style){
width=_88d.width+"px";
height=_88d.height+"px";
left=_88d.left+"px";
top=_88d.top+"px";
}
},setZIndex:function(node){
if(!this.iframe){
return;
}
if(dojo.dom.isNode(node)){
this.iframe.style.zIndex=dojo.html.getStyle(node,"z-index")-1;
}else{
if(!isNaN(node)){
this.iframe.style.zIndex=node;
}
}
},show:function(){
if(!this.iframe){
return;
}
this.iframe.style.display="block";
},hide:function(){
if(!this.iframe){
return;
}
this.iframe.style.display="none";
},remove:function(){
dojo.dom.removeNode(this.iframe);
}});
dojo.provide("dojo.widget.PopupContainer");
dojo.provide("dojo.widget.Menu2");
dojo.provide("dojo.widget.PopupMenu2");
dojo.provide("dojo.widget.MenuItem2");
dojo.provide("dojo.widget.MenuBar2");
dojo.declare("dojo.widget.PopupContainerBase",null,function(){
this.queueOnAnimationFinish=[];
},{isContainer:true,templateString:"<div dojoAttachPoint=\"containerNode\" style=\"display:none;position:absolute;\" class=\"dojoPopupContainer\" tabindex=\"-1\"></div>",snarfChildDomOutput:true,isShowingNow:false,currentSubpopup:null,beginZIndex:1000,parentPopup:null,popupIndex:0,aroundBox:dojo.html.boxSizing.BORDER_BOX,processKey:function(evt){
return false;
},applyPopupBasicStyle:function(){
with(this.domNode.style){
display="none";
position="absolute";
}
},aboutToShow:function(){
},open:function(x,y,_892,_893,_894,_895){
if(this.isShowingNow){
return;
}
this.aboutToShow();
if(this.animationInProgress){
this.queueOnAnimationFinish.push(this.open,arguments);
return;
}
var _896=false,node,aroundOrient;
if(typeof x=="object"){
node=x;
aroundOrient=_893;
_893=_892;
_892=y;
_896=true;
}
dojo.body().appendChild(this.domNode);
_893=_893||_892["domNode"]||[];
var _897=null;
this.isTopLevel=true;
while(_892){
if(_892!==this&&(_892 instanceof dojo.widget.PopupContainer||_892.applyPopupBasicStyle!=undefined)){
_897=_892;
this.isTopLevel=false;
_897.setOpenedSubpopup(this);
break;
}
_892=_892.parent;
}
this.parentPopup=_897;
this.popupIndex=_897?_897.popupIndex+1:1;
if(this.isTopLevel){
var _898=_893 instanceof Array?null:_893;
dojo.widget.PopupManager.opened(this,_898);
}
if(_893 instanceof Array){
_893={left:_893[0],top:_893[1],width:0,height:0};
}
with(this.domNode.style){
display="";
zIndex=this.beginZIndex+this.popupIndex;
}
if(_896){
this.move(node,_895,aroundOrient);
}else{
this.move(x,y,_895,_894);
}
this.domNode.style.display="none";
this.explodeSrc=_893;
this.show();
this.isShowingNow=true;
},move:function(x,y,_89b,_89c){
var _89d=(typeof x=="object");
if(_89d){
var _89e=_89b;
var node=x;
_89b=y;
if(!_89e){
_89e={"BL":"TL","TL":"BL"};
}
dojo.html.placeOnScreenAroundElement(this.domNode,node,_89b,this.aroundBox,_89e);
}else{
if(!_89c){
_89c="TL,TR,BL,BR";
}
dojo.html.placeOnScreen(this.domNode,x,y,_89b,true,_89c);
}
},close:function(){
if(this.animationInProgress){
this.queueOnAnimationFinish.push(this.close,[]);
return;
}
this.closeSubpopup();
this.hide();
if(this.bgIframe){
this.bgIframe.hide();
this.bgIframe.size({left:0,top:0,width:0,height:0});
}
if(this.isTopLevel){
dojo.widget.PopupManager.closed(this);
}
this.isShowingNow=false;
},closeAll:function(){
if(this.parentPopup){
this.parentPopup.closeAll();
}else{
this.close();
}
},setOpenedSubpopup:function(_8a0){
this.currentSubpopup=_8a0;
},closeSubpopup:function(){
if(this.currentSubpopup==null){
return;
}
this.currentSubpopup.close();
this.currentSubpopup=null;
},onShow:function(){
this.inherited("onShow");
this.openedSize={w:this.domNode.style.width,h:this.domNode.style.height};
if(dojo.render.html.ie){
if(!this.bgIframe){
this.bgIframe=new dojo.html.BackgroundIframe();
this.bgIframe.setZIndex(this.domNode);
}
this.bgIframe.size(this.domNode);
this.bgIframe.show();
}
this.processQueue();
},processQueue:function(){
if(!this.queueOnAnimationFinish.length){
return;
}
var func=this.queueOnAnimationFinish.shift();
var args=this.queueOnAnimationFinish.shift();
func.apply(this,args);
},onHide:function(){
dojo.widget.HtmlWidget.prototype.onHide.call(this);
if(this.openedSize){
with(this.domNode.style){
width=this.openedSize.w;
height=this.openedSize.h;
}
}
this.processQueue();
}});
dojo.widget.defineWidget("dojo.widget.PopupContainer",[dojo.widget.HtmlWidget,dojo.widget.PopupContainerBase],{});
dojo.widget.defineWidget("dojo.widget.PopupMenu2",dojo.widget.PopupContainer,function(){
this.targetNodeIds=[];
this.eventNames={open:""};
},{templateCssString:"",currentSubmenuTrigger:null,eventNaming:"default",templateString:"<table class=\"dojoPopupMenu2\" border=0 cellspacing=0 cellpadding=0 style=\"display: none;\"><tbody dojoAttachPoint=\"containerNode\"></tbody></table>",templateCssString:"\n.dojoPopupMenu2 {\n	position: absolute;\n	border: 1px solid #7298d0;\n	background:#a9ccfe url(images/soriaMenuBg.gif) repeat-x bottom left !important;\n	padding: 1px;\n	margin-top: 1px;\n	margin-bottom: 1px;\n}\n\n.dojoMenuItem2{\n	white-space: nowrap;\n	font: menu;\n	margin: 0;\n}\n\n.dojoMenuItem2Hover {\n	background-color: #D2E4FD;\n	cursor:pointer;\n	cursor:hand;\n}\n\n.dojoMenuItem2Icon {\n	position: relative;\n	background-position: center center;\n	background-repeat: no-repeat;\n	width: 16px;\n	height: 16px;\n}\n\n.dojoMenuItem2Label {\n	position: relative;\n	vertical-align: middle;\n}\n\n/* main label text */\n.dojoMenuItem2Label {\n	position: relative;\n	vertical-align: middle;\n}\n\n.dojoMenuItem2Accel {\n	position: relative;\n	vertical-align: middle;\n}\n\n.dojoMenuItem2Disabled .dojoMenuItem2Label,\n.dojoMenuItem2Disabled .dojoMenuItem2Accel {\n	color: #607a9e;\n}\n\n.dojoMenuItem2Submenu {\n	position: relative;\n	background-position: center center;\n	background-repeat: no-repeat;\n	background-image: url(images/submenu_off.gif);\n	width: 5px;\n	height: 9px;\n}\n.dojoMenuItem2Hover .dojoMenuItem2Submenu {\n	background-image: url(images/submenu_on.gif);\n}\n\n.dojoMenuSeparator2 {\n	font-size: 1px;\n	margin: 0;\n}\n\n.dojoMenuSeparator2Top {\n	height: 50%;\n	border-bottom: 1px solid #7996c1;\n	margin: 0px 2px;\n	font-size: 1px;\n}\n\n.dojoMenuSeparator2Bottom {\n	height: 50%;\n	border-top: 1px solid #e3eeff;\n	margin: 0px 2px;\n	font-size: 1px;\n}\n\n.dojoMenuBar2 {\n	/*position: relative;*/\n	background:#a9ccfe url(images/soriaBarBg.gif) repeat-x bottom left;\n	border-bottom:1px solid #405067;\n	border-top:1px solid #708bb3;\n}\n\n.dojoMenuBar2Client {\n	padding: 1px;\n}\n\n.dojoMenuBarItem2 {\n	white-space: nowrap;\n	font: menu;\n	margin: 0;\n	position: relative;\n	vertical-align: middle;\n	z-index: 1;\n	padding: 3px 8px;\n}\n\n.dojoMenuBarItem2 span {\n	margin: 0;\n	position: relative;\n	z-index: 2;\n	cursor:pointer;\n	cursor:hand;\n}\n\n.dojoMenuBarItem2 span span {\n	position: absolute;\n	display: none;\n	left: 1px;\n	top: 1px;\n	z-index: -2;\n}\n\n.dojoMenuBarItem2Hover {\n	background-color:#d2e4fd;\n}\n\n.dojoMenuBarItem2Disabled span {\n	color: #4f6582;\n}\n\n.dojoMenuBarItem2Disabled span span {\n	display: block;\n}\n\n.dojoMenuBarItem2Hover span span,\n.dojoMenuBarItem2Hover span span {\n	display: none;\n}\n",templateCssPath:dojo.uri.dojoUri("src/widget/templates/Menu2.css"),submenuDelay:500,submenuOverlap:5,contextMenuForWindow:false,openEvent:null,_highlighted_option:null,initialize:function(args,frag){
if(this.eventNaming=="default"){
for(var _8a5 in this.eventNames){
this.eventNames[_8a5]=this.widgetId+"/"+_8a5;
}
}
},postCreate:function(){
if(this.contextMenuForWindow){
var doc=dojo.body();
this.bindDomNode(doc);
}else{
if(this.targetNodeIds.length>0){
dojo.lang.forEach(this.targetNodeIds,this.bindDomNode,this);
}
}
this.subscribeSubitemsOnOpen();
},subscribeSubitemsOnOpen:function(){
var _8a7=this.getChildrenOfType(dojo.widget.MenuItem2);
for(var i=0;i<_8a7.length;i++){
dojo.event.topic.subscribe(this.eventNames.open,_8a7[i],"menuOpen");
}
},getTopOpenEvent:function(){
var menu=this;
while(menu.parentPopup){
menu=menu.parentPopup;
}
return menu.openEvent;
},bindDomNode:function(node){
node=dojo.byId(node);
var win=dojo.html.getElementWindow(node);
if(dojo.html.isTag(node,"iframe")=="iframe"){
win=dojo.html.iframeContentWindow(node);
node=dojo.withGlobal(win,dojo.body);
}
dojo.widget.Menu2.OperaAndKonqFixer.fixNode(node);
dojo.event.kwConnect({srcObj:node,srcFunc:"oncontextmenu",targetObj:this,targetFunc:"onOpen",once:true});
if(dojo.render.html.moz&&win.document.designMode.toLowerCase()=="on"){
dojo.event.browser.addListener(node,"contextmenu",dojo.lang.hitch(this,"onOpen"));
}
dojo.widget.PopupManager.registerWin(win);
},unBindDomNode:function(_8ac){
var node=dojo.byId(_8ac);
dojo.event.kwDisconnect({srcObj:node,srcFunc:"oncontextmenu",targetObj:this,targetFunc:"onOpen",once:true});
dojo.widget.Menu2.OperaAndKonqFixer.cleanNode(node);
},moveToNext:function(evt){
this.highlightOption(1);
return true;
},moveToPrevious:function(evt){
this.highlightOption(-1);
return true;
},moveToParentMenu:function(evt){
if(this._highlighted_option&&this.parentPopup){
if(evt._menu2UpKeyProcessed){
return true;
}else{
this._highlighted_option.onUnhover();
this.closeSubpopup();
evt._menu2UpKeyProcessed=true;
}
}
return false;
},moveToChildMenu:function(evt){
if(this._highlighted_option&&this._highlighted_option.submenuId){
this._highlighted_option._onClick(true);
return true;
}
return false;
},selectCurrentItem:function(evt){
if(this._highlighted_option){
this._highlighted_option._onClick();
return true;
}
return false;
},processKey:function(evt){
if(evt.ctrlKey||evt.altKey){
return false;
}
var _8b4=evt.keyCode;
var rval=false;
var k=dojo.event.browser.keys;
var _8b4=evt.keyCode;
if(_8b4==0&&evt.charCode==k.KEY_SPACE){
_8b4=k.KEY_SPACE;
}
switch(_8b4){
case k.KEY_DOWN_ARROW:
rval=this.moveToNext(evt);
break;
case k.KEY_UP_ARROW:
rval=this.moveToPrevious(evt);
break;
case k.KEY_RIGHT_ARROW:
rval=this.moveToChildMenu(evt);
break;
case k.KEY_LEFT_ARROW:
rval=this.moveToParentMenu(evt);
break;
case k.KEY_SPACE:
case k.KEY_ENTER:
if(rval=this.selectCurrentItem(evt)){
break;
}
case k.KEY_ESCAPE:
dojo.widget.PopupManager.currentMenu.close();
rval=true;
break;
}
return rval;
},findValidItem:function(dir,_8b8){
if(_8b8){
_8b8=dir>0?_8b8.getNextSibling():_8b8.getPreviousSibling();
}
for(var i=0;i<this.children.length;++i){
if(!_8b8){
_8b8=dir>0?this.children[0]:this.children[this.children.length-1];
}
if(_8b8.onHover&&_8b8.isShowing()){
return _8b8;
}
_8b8=dir>0?_8b8.getNextSibling():_8b8.getPreviousSibling();
}
},highlightOption:function(dir){
var item;
if((!this._highlighted_option)){
item=this.findValidItem(dir);
}else{
item=this.findValidItem(dir,this._highlighted_option);
}
if(item){
if(this._highlighted_option){
this._highlighted_option.onUnhover();
}
item.onHover();
dojo.html.scrollIntoView(item.domNode);
}
},onItemClick:function(item){
},close:function(){
if(this.animationInProgress){
dojo.widget.PopupMenu2.superclass.close.call(this);
return;
}
if(this._highlighted_option){
this._highlighted_option.onUnhover();
}
dojo.widget.PopupMenu2.superclass.close.call(this);
},closeSubpopup:function(){
if(this.currentSubpopup==null){
return;
}
this.currentSubpopup.close();
this.currentSubpopup=null;
this.currentSubmenuTrigger.is_open=false;
this.currentSubmenuTrigger.closedSubmenu();
this.currentSubmenuTrigger=null;
},openSubmenu:function(_8bd,_8be){
var _8bf=dojo.html.getAbsolutePosition(_8be.domNode,true);
var _8c0=dojo.html.getMarginBox(this.domNode).width;
var x=_8bf.x+_8c0-this.submenuOverlap;
var y=_8bf.y;
_8bd.open(x,y,this,_8be.domNode);
this.currentSubmenuTrigger=_8be;
this.currentSubmenuTrigger.is_open=true;
},onOpen:function(e){
this.openEvent=e;
var x=e.pageX,y=e.pageY;
var win=dojo.html.getElementWindow(e.target);
var _8c6=win.frameElement;
if(_8c6){
var cood=dojo.html.getAbsolutePosition(_8c6,true);
x+=cood.x-dojo.withGlobal(win,dojo.html.getScroll).left;
y+=cood.y-dojo.withGlobal(win,dojo.html.getScroll).top;
}
this.open(x,y,null,[x,y]);
e.preventDefault();
e.stopPropagation();
}});
dojo.widget.defineWidget("dojo.widget.MenuItem2",dojo.widget.HtmlWidget,function(){
this.eventNames={engage:""};
},{templateString:"<tr class=\"dojoMenuItem2\" dojoAttachEvent=\"onMouseOver: onHover; onMouseOut: onUnhover; onClick: _onClick;\">"+"<td><div class=\"${this.iconClass}\" style=\"${this.iconStyle}\"></div></td>"+"<td class=\"dojoMenuItem2Label\">${this.caption}</td>"+"<td class=\"dojoMenuItem2Accel\">${this.accelKey}</td>"+"<td><div class=\"dojoMenuItem2Submenu\" style=\"display:${this.arrowDisplay};\"></div></td>"+"</tr>",is_hovering:false,hover_timer:null,is_open:false,topPosition:0,caption:"Untitled",accelKey:"",iconSrc:"",iconClass:"dojoMenuItem2Icon",submenuId:"",disabled:false,eventNaming:"default",highlightClass:"dojoMenuItem2Hover",postMixInProperties:function(){
this.iconStyle="";
if(this.iconSrc){
if((this.iconSrc.toLowerCase().substring(this.iconSrc.length-4)==".png")&&(dojo.render.html.ie)&&(!dojo.render.html.ie70)){
this.iconStyle="filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this.iconSrc+"', sizingMethod='image')";
}else{
this.iconStyle="background-image: url("+this.iconSrc+")";
}
}
this.arrowDisplay=this.submenuId?"block":"none";
dojo.widget.MenuItem2.superclass.postMixInProperties.apply(this,arguments);
},fillInTemplate:function(){
dojo.html.disableSelection(this.domNode);
if(this.disabled){
this.setDisabled(true);
}
if(this.eventNaming=="default"){
for(var _8c8 in this.eventNames){
this.eventNames[_8c8]=this.widgetId+"/"+_8c8;
}
}
},onHover:function(){
this.onUnhover();
if(this.is_hovering){
return;
}
if(this.is_open){
return;
}
if(this.parent._highlighted_option){
this.parent._highlighted_option.onUnhover();
}
this.parent.closeSubpopup();
this.parent._highlighted_option=this;
dojo.widget.PopupManager.setFocusedMenu(this.parent);
this.highlightItem();
if(this.is_hovering){
this.stopSubmenuTimer();
}
this.is_hovering=true;
this.startSubmenuTimer();
},onUnhover:function(){
if(!this.is_open){
this.unhighlightItem();
}
this.is_hovering=false;
this.parent._highlighted_option=null;
if(this.parent.parentPopup){
dojo.widget.PopupManager.setFocusedMenu(this.parent.parentPopup);
}
this.stopSubmenuTimer();
},_onClick:function(_8c9){
var _8ca=false;
if(this.disabled){
return false;
}
if(this.submenuId){
if(!this.is_open){
this.stopSubmenuTimer();
this.openSubmenu();
}
_8ca=true;
}else{
this.parent.closeAll();
}
if(!_8ca){
this.onUnhover();
}
this.onClick();
dojo.event.topic.publish(this.eventNames.engage,this);
if(_8ca&&_8c9){
dojo.widget.getWidgetById(this.submenuId).highlightOption(1);
}
return;
},onClick:function(){
this.parent.onItemClick(this);
},highlightItem:function(){
dojo.html.addClass(this.domNode,this.highlightClass);
},unhighlightItem:function(){
dojo.html.removeClass(this.domNode,this.highlightClass);
},startSubmenuTimer:function(){
this.stopSubmenuTimer();
if(this.disabled){
return;
}
var self=this;
var _8cc=function(){
return function(){
self.openSubmenu();
};
}();
this.hover_timer=dojo.lang.setTimeout(_8cc,this.parent.submenuDelay);
},stopSubmenuTimer:function(){
if(this.hover_timer){
dojo.lang.clearTimeout(this.hover_timer);
this.hover_timer=null;
}
},openSubmenu:function(){
this.parent.closeSubpopup();
var _8cd=dojo.widget.getWidgetById(this.submenuId);
if(_8cd){
this.parent.openSubmenu(_8cd,this);
}
},closedSubmenu:function(){
this.onUnhover();
},setDisabled:function(_8ce){
this.disabled=_8ce;
if(this.disabled){
dojo.html.addClass(this.domNode,"dojoMenuItem2Disabled");
}else{
dojo.html.removeClass(this.domNode,"dojoMenuItem2Disabled");
}
},enable:function(){
this.setDisabled(false);
},disable:function(){
this.setDisabled(true);
},menuOpen:function(_8cf){
}});
dojo.widget.defineWidget("dojo.widget.MenuSeparator2",dojo.widget.HtmlWidget,{templateString:"<tr class=\"dojoMenuSeparator2\"><td colspan=4>"+"<div class=\"dojoMenuSeparator2Top\"></div>"+"<div class=\"dojoMenuSeparator2Bottom\"></div>"+"</td></tr>",postCreate:function(){
dojo.html.disableSelection(this.domNode);
}});
dojo.widget.PopupManager=new function(){
this.currentMenu=null;
this.currentButton=null;
this.currentFocusMenu=null;
this.focusNode=null;
this.registeredWindows=[];
this._keyEventName=dojo.doc().createEvent?"onkeypress":"onkeydown";
this.registerWin=function(win){
if(!win.__PopupManagerRegistered){
dojo.event.connect(win.document,"onmousedown",this,"onClick");
dojo.event.connect(win,"onscroll",this,"onClick");
dojo.event.connect(win.document,this._keyEventName,this,"onKeyPress");
win.__PopupManagerRegistered=true;
this.registeredWindows.push(win);
}
};
this.registerAllWindows=function(_8d1){
if(!_8d1){
_8d1=dojo.html.getDocumentWindow(window.top.document);
}
this.registerWin(_8d1);
for(var i=0;i<_8d1.frames.length;i++){
var win=dojo.html.getDocumentWindow(_8d1.frames[i].document);
if(win){
this.registerAllWindows(win);
}
}
};
dojo.addOnLoad(this,"registerAllWindows");
this.closed=function(menu){
if(this.currentMenu==menu){
this.currentMenu=null;
this.currentButton=null;
this.currentFocusMenu=null;
}
};
this.opened=function(menu,_8d6){
if(menu==this.currentMenu){
return;
}
if(this.currentMenu){
this.currentMenu.close();
}
this.currentMenu=menu;
this.currentFocusMenu=menu;
this.currentButton=_8d6;
};
this.setFocusedMenu=function(menu){
this.currentFocusMenu=menu;
};
this.onKeyPress=function(e){
if(!this.currentMenu||!this.currentMenu.isShowingNow){
return;
}
var m=this.currentFocusMenu;
while(m){
if(m.processKey(e)){
e.preventDefault();
e.stopPropagation();
break;
}
m=m.parentPopup;
}
},this.onClick=function(e){
if(!this.currentMenu){
return;
}
var _8db=dojo.html.getScroll().offset;
var m=this.currentMenu;
while(m){
if(dojo.html.overElement(m.domNode,e)||dojo.html.isDescendantOf(e.target,m.domNode)){
return;
}
m=m.currentSubpopup;
}
if(this.currentButton&&dojo.html.overElement(this.currentButton,e)){
return;
}
this.currentMenu.close();
};
};
dojo.widget.Menu2.OperaAndKonqFixer=new function(){
var _8dd=true;
var _8de=false;
if(!dojo.lang.isFunction(dojo.doc().oncontextmenu)){
dojo.doc().oncontextmenu=function(){
_8dd=false;
_8de=true;
};
}
if(dojo.doc().createEvent){
try{
var e=dojo.doc().createEvent("MouseEvents");
e.initMouseEvent("contextmenu",1,1,dojo.global(),1,0,0,0,0,0,0,0,0,0,null);
dojo.doc().dispatchEvent(e);
}
catch(e){
}
}else{
_8dd=false;
}
if(_8de){
delete dojo.doc().oncontextmenu;
}
this.fixNode=function(node){
if(_8dd){
if(!dojo.lang.isFunction(node.oncontextmenu)){
node.oncontextmenu=function(e){
};
}
if(dojo.render.html.opera){
node._menufixer_opera=function(e){
if(e.ctrlKey){
this.oncontextmenu(e);
}
};
dojo.event.connect(node,"onclick",node,"_menufixer_opera");
}else{
node._menufixer_konq=function(e){
if(e.button==2){
e.preventDefault();
this.oncontextmenu(e);
}
};
dojo.event.connect(node,"onmousedown",node,"_menufixer_konq");
}
}
};
this.cleanNode=function(node){
if(_8dd){
if(node._menufixer_opera){
dojo.event.disconnect(node,"onclick",node,"_menufixer_opera");
delete node._menufixer_opera;
}else{
if(node._menufixer_konq){
dojo.event.disconnect(node,"onmousedown",node,"_menufixer_konq");
delete node._menufixer_konq;
}
}
if(node.oncontextmenu){
delete node.oncontextmenu;
}
}
};
};
dojo.widget.defineWidget("dojo.widget.MenuBar2",dojo.widget.PopupMenu2,{menuOverlap:2,templateString:"<div class=\"dojoMenuBar2\"><table class=\"dojoMenuBar2Client\"><tr dojoAttachPoint=\"containerNode\"></tr></table></div>",close:function(){
if(this._highlighted_option){
this._highlighted_option.onUnhover();
}
this.closeSubpopup();
},processKey:function(evt){
if(evt.ctrlKey||evt.altKey){
return false;
}
var _8e6=evt.keyCode;
var rval=false;
var k=dojo.event.browser.keys;
switch(_8e6){
case k.KEY_DOWN_ARROW:
rval=this.moveToChildMenu(evt);
break;
case k.KEY_UP_ARROW:
rval=this.moveToParentMenu(evt);
break;
case k.KEY_RIGHT_ARROW:
rval=this.moveToNext(evt);
break;
case k.KEY_LEFT_ARROW:
rval=this.moveToPrevious(evt);
break;
default:
rval=this.inherited("processKey",evt);
break;
}
return rval;
},postCreate:function(){
this.inherited("postCreate");
dojo.widget.PopupManager.opened(this);
this.isShowingNow=true;
},openSubmenu:function(_8e9,_8ea){
var _8eb=dojo.html.getAbsolutePosition(_8ea.domNode,true);
var _8ec=dojo.html.getAbsolutePosition(this.domNode,true);
var _8ed=dojo.html.getBorderBox(this.domNode).height;
var x=_8eb.x;
var y=_8ec.y+_8ed-this.menuOverlap;
_8e9.open(x,y,this,_8ea.domNode);
this.currentSubmenuTrigger=_8ea;
this.currentSubmenuTrigger.is_open=true;
}});
dojo.widget.defineWidget("dojo.widget.MenuBarItem2",dojo.widget.MenuItem2,{templateString:"<td class=\"dojoMenuBarItem2\" dojoAttachEvent=\"onMouseOver: onHover; onMouseOut: onUnhover; onClick: _onClick;\">"+"<span><span>${this.caption}</span>${this.caption}</span>"+"</td>",highlightClass:"dojoMenuBarItem2Hover",setDisabled:function(_8f0){
this.disabled=_8f0;
if(this.disabled){
dojo.html.addClass(this.domNode,"dojoMenuBarItem2Disabled");
}else{
dojo.html.removeClass(this.domNode,"dojoMenuBarItem2Disabled");
}
}});
dojo.provide("dojo.widget.Tooltip");
dojo.widget.defineWidget("dojo.widget.Tooltip",[dojo.widget.ContentPane,dojo.widget.PopupContainerBase],{isContainer:true,caption:"",showDelay:500,hideDelay:100,connectId:"",templateCssString:".dojoTooltip {\n	border: solid black 1px;\n	background: beige;\n	color: black;\n	position: absolute;\n	font-size: small;\n	padding: 2px 2px 2px 2px;\n	z-index: 10;\n	display: block;\n}\n",templateCssPath:dojo.uri.dojoUri("src/widget/templates/TooltipTemplate.css"),connectNode:null,fillInTemplate:function(args,frag){
if(this.caption!=""){
this.domNode.appendChild(document.createTextNode(this.caption));
}
this.connectNode=dojo.byId(this.connectId);
dojo.widget.Tooltip.superclass.fillInTemplate.call(this,args,frag);
this.addOnLoad(this,"_LoadedContent");
dojo.html.addClass(this.domNode,"dojoTooltip");
var _8f3=this.getFragNodeRef(frag);
dojo.html.copyStyle(this.domNode,_8f3);
this.applyPopupBasicStyle();
},postCreate:function(args,frag){
dojo.event.connect(this.connectNode,"onmouseover",this,"onMouseOver");
dojo.widget.Tooltip.superclass.postCreate.call(this,args,frag);
},onMouseOver:function(e){
this.mouse={x:e.pageX,y:e.pageY};
if(!this.showTimer){
this.showTimer=setTimeout(dojo.lang.hitch(this,"open"),this.showDelay);
dojo.event.connect(document.documentElement,"onmousemove",this,"onMouseMove");
}
},onMouseMove:function(e){
this.mouse={x:e.pageX,y:e.pageY};
if(dojo.html.overElement(this.connectNode,e)||dojo.html.overElement(this.domNode,e)){
if(this.hideTimer){
clearTimeout(this.hideTimer);
delete this.hideTimer;
}
}else{
if(this.showTimer){
clearTimeout(this.showTimer);
delete this.showTimer;
}
if(this.isShowingNow&&!this.hideTimer){
this.hideTimer=setTimeout(dojo.lang.hitch(this,"close"),this.hideDelay);
}
}
},open:function(){
if(this.isShowingNow){
return;
}
dojo.widget.PopupContainerBase.prototype.open.call(this,this.mouse.x,this.mouse.y,null,[this.mouse.x,this.mouse.y],"TL,TR,BL,BR",[10,15]);
},close:function(){
if(this.isShowingNow){
if(this.showTimer){
clearTimeout(this.showTimer);
delete this.showTimer;
}
if(this.hideTimer){
clearTimeout(this.hideTimer);
delete this.hideTimer;
}
dojo.event.disconnect(document.documentElement,"onmousemove",this,"onMouseMove");
dojo.widget.PopupContainerBase.prototype.close.call(this);
}
},position:function(){
this.move(this.mouse.x,this.mouse.y,[10,15],"TL,TR,BL,BR");
},_LoadedContent:function(){
if(this.isShowingNow){
this.position();
}
},checkSize:function(){
}});

