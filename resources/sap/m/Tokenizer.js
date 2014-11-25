/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.Tokenizer");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.Tokenizer",{metadata:{library:"sap.m",properties:{"editable":{type:"boolean",group:"Misc",defaultValue:true},"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},"visible":{type:"boolean",group:"Appearance",defaultValue:true}},defaultAggregation:"tokens",aggregations:{"tokens":{type:"sap.m.Token",multiple:true,singularName:"token"}},events:{"tokenChange":{}}}});sap.m.Tokenizer.M_EVENTS={'tokenChange':'tokenChange'};sap.m.Tokenizer.prototype._bDoScrollViaLibrary=!sap.ui.Device.system.desktop;sap.m.Tokenizer.prototype._bDoScrollWin8=sap.ui.Device.os.windows&&sap.ui.Device.os.version===8;sap.m.Tokenizer.prototype._bDoTouchScroll=sap.m.Tokenizer.prototype._bDoScrollViaLibrary||sap.m.Tokenizer.prototype._bDoScrollWin8;
sap.m.Tokenizer.prototype.init=function(){this._bScrollToEndIsActive=false;this._aTokenValidators=[];if(this._bDoScrollViaLibrary){jQuery.sap.require("sap.ui.core.delegate.ScrollEnablement");var i=this.getId()+"-scrollContainer";var _;if(sap.ui.Device.os.android&&sap.ui.Device.os.version<4.4&&!sap.ui.Device.browser.chrome){_=true}else{_=false}this._oScroller=new sap.ui.core.delegate.ScrollEnablement(this,i,{horizontal:true,vertical:false,nonTouchScrolling:_})}else if(this._bDoScrollWin8){this.addStyleClass("sapMTokenizerWin8")}};
sap.m.Tokenizer.prototype.getScrollDelegate=function(){return this._oScroller};
sap.m.Tokenizer.prototype.scrollToEnd=function(){if(!this._bScrollToEndIsActive){this._bScrollToEndIsActive=true;var t=this;var d=this.getDomRef();if(d){this._sResizeHandlerId=sap.ui.core.ResizeHandler.register(d,function(){t._doScrollToEnd()})}}this._doScrollToEnd()};
sap.m.Tokenizer.prototype.setPixelWidth=function(n){var l=null;var $=null;var t=this;if(this.getTokens().length>0){l=this.getTokens()[this.getTokens().length-1];$=l.$();if($){$.removeAttr("style")}}var s=null;s=function(){this.$().removeAttr("style");this.detachSelect(s);t.scrollToEnd()};if($){var w=$.width();if(!l.getSelected()&&n<w){$.outerWidth(n,true);$.css("overflow","hidden");$.css("text-overflow","ellipsis");$.css("white-space","nowrap");l.attachSelect(s)}else{l.detachSelect(s)}this.scrollToEnd()}this.$().css("width",n+"px");if(this._oScroller){this._oScroller.refresh()}};
sap.m.Tokenizer.prototype._doScrollToEnd=function(){var t=this.getDomRef();if(!t){return}var $=this.$();var s=$.find(".sapMTokenizerScrollContainer")[0];$[0].scrollLeft=s.scrollWidth};
sap.m.Tokenizer.prototype.scrollToStart=function(){this._deactivateScrollToEnd();var t=this.getDomRef();if(!t){return}var m=jQuery(t);m[0].scrollLeft=0};
sap.m.Tokenizer.prototype._deactivateScrollToEnd=function(){this._deregisterResizeHandler();this._bScrollToEndIsActive=false};
sap.m.Tokenizer.prototype.getScrollWidth=function(){return this.$().children(".sapMTokenizerScrollContainer")[0].scrollWidth};
sap.m.Tokenizer.prototype.onAfterRendering=function(){if(sap.ui.core.Control.prototype.onAfterRendering){sap.ui.core.Control.prototype.onAfterRendering.apply(this,arguments)}if(this._bScrollToEndIsActive){var t=this;this._sResizeHandlerId=sap.ui.core.ResizeHandler.register(this.getDomRef(),function(){t._doScrollToEnd()})}};
sap.m.Tokenizer.prototype.saptabnext=function(e){this.selectAllTokens(false)};
sap.m.Tokenizer.prototype.onkeydown=function(e){if(e.which===jQuery.sap.KeyCodes.TAB){this.selectAllTokens(false)}};
sap.m.Tokenizer.prototype.onsapbackspace=function(e){if(this.getSelectedTokens().length===0){this.onsapprevious(e)}else if(this.getEditable()){this.removeSelectedTokens()}e.preventDefault();e.stopPropagation()};
sap.m.Tokenizer.prototype.onsapdelete=function(e){if(this.getEditable()){this.removeSelectedTokens()}};
sap.m.Tokenizer.prototype.onsapnext=function(e){if(e.which===jQuery.sap.KeyCodes.ARROW_DOWN){return}var l=this.getTokens().length;if(l===0){return}this.selectAllTokens(false);var f=jQuery(document.activeElement).control()[0];if(f===this){return}var i=f?this.getTokens().indexOf(f):-1;if(i<l-1){this.getTokens()[i+1].setSelected(true);e.preventDefault()}else if(i===l-1){this.scrollToEnd();return}this._deactivateScrollToEnd();e.setMarked()};
sap.m.Tokenizer.prototype.onsapprevious=function(e){if(e.which===jQuery.sap.KeyCodes.ARROW_UP){return}if(this.getSelectedTokens().length===this.getTokens().length){return}if(this.getTokens().length===0){return}var f=sap.ui.getCore().byId(jQuery(document.activeElement).attr("id"));var i=f?this.getTokens().indexOf(f):-1;if(i>0){this.getTokens()[i-1].setSelected(true)}else if(i===-1){this.getTokens()[this.getTokens().length-1].setSelected(true)}this._deactivateScrollToEnd()};
sap.m.Tokenizer.prototype.addValidator=function(v){if(typeof(v)==="function"){this._aTokenValidators.push(v)}};
sap.m.Tokenizer.prototype.removeValidator=function(v){var i=this._aTokenValidators.indexOf(v);if(i!==-1){this._aTokenValidators.splice(i,1)}};
sap.m.Tokenizer.prototype.removeAllValidators=function(){this._aTokenValidators=[]};
sap.m.Tokenizer.prototype._validateToken=function(p,v){var t=p.text;var T=p.token;var V=p.validationCallback;var s=p.suggestionObject;var i,a,l;if(!v){v=this._aTokenValidators}l=v.length;if(l===0){if(!T&&V){V(false)}return T}for(i=0;i<l;i++){a=v[i];T=a({text:t,suggestedToken:T,suggestionObject:s,asyncCallback:this._getAsyncValidationCallback(v,i,t,s,V)});if(!T){if(V){V(false)}return null}if(T===sap.m.Tokenizer.WaitForAsyncValidation){return null}}return T};
sap.m.Tokenizer.prototype._getAsyncValidationCallback=function(v,V,i,s,f){var t=this;return function(T){if(T){v=v.slice(V+1);T=t._validateToken({text:i,token:T,suggestionObject:s,validationCallback:f},v);t._addUniqueToken(T,f)}else{if(f){f(false)}}}};
sap.m.Tokenizer.prototype.addValidateToken=function(p){var t=this._validateToken(p);this._addUniqueToken(t,p.validationCallback)};
sap.m.Tokenizer.prototype._addUniqueToken=function(t,v){if(!t){return}if(v){v(true)}var a=this._tokenExists(t);if(a){return}this.addToken(t);this.fireTokenChange({addedTokens:[t],removedTokens:[],type:sap.m.Tokenizer.TokenChangeType.TokensChanged})};
sap.m.Tokenizer.prototype._tokenExists=function(t){var a=this.getTokens();if(!(a&&a.length)){return false}var k=t.getKey();if(!k){return false}var l=a.length;for(var i=0;i<l;i++){var c=a[i];var b=c.getKey();if(b===k){return true}}return false};
sap.m.Tokenizer.prototype.addToken=function(t,s){this.addAggregation("tokens",t,s);t.attachDelete(this._onDeleteToken,this);t.attachPress(this._onTokenPress,this);t.setEditable(this.getEditable());this.scrollToEnd();this.fireTokenChange({token:t,type:sap.m.Tokenizer.TokenChangeType.Added})};
sap.m.Tokenizer.prototype.removeToken=function(t){t=this.removeAggregation("tokens",t);if(t){t.detachDelete(this._onDeleteToken,this);t.detachPress(this._onTokenPress,this)}this.scrollToEnd();this.fireTokenChange({token:t,type:sap.m.Tokenizer.TokenChangeType.Removed});return t};
sap.m.Tokenizer.prototype.setTokens=function(t){var o=this.getTokens();this.removeAllTokens(false);var i;for(i=0;i<t.length;i++){this.addToken(t[i],true)}this.invalidate();this.rerender();this.scrollToEnd();this.fireTokenChange({addedTokens:t,removedTokens:o,type:sap.m.Tokenizer.TokenChangeType.TokensChanged})};
sap.m.Tokenizer.prototype.removeAllTokens=function(f){var i,l,t,a;a=this.getTokens();l=a.length;for(i=0;i<l;i++){t=a[i];t.detachDelete(this._onDeleteToken,this);t.detachPress(this._onTokenPress,this)}this.removeAllAggregation("tokens");if(typeof(f)==="boolean"&&!f){return}this.fireTokenChange({addedTokens:[],removedTokens:a,type:sap.m.Tokenizer.TokenChangeType.TokensChanged});this.fireTokenChange({tokens:a,type:sap.m.Tokenizer.TokenChangeType.RemovedAll})};
sap.m.Tokenizer.prototype.removeSelectedTokens=function(){var t=this.getSelectedTokens();var a,i,l;l=t.length;if(l===0){return this}for(i=0;i<l;i++){a=t[i];this.removeToken(a)}this.scrollToEnd();this.fireTokenChange({addedTokens:[],removedTokens:t,type:sap.m.Tokenizer.TokenChangeType.TokensChanged});return this};
sap.m.Tokenizer.prototype.selectAllTokens=function(s){if(s===undefined){s=true}var t=this.getTokens();var a,i,l;l=t.length;for(i=0;i<l;i++){a=t[i];a.setSelected(s,true)}return this};
sap.m.Tokenizer.prototype.getSelectedTokens=function(){var s=[];var i,l,t,a;a=this.getTokens();l=a.length;for(i=0;i<l;i++){t=a[i];if(t.getSelected()){s.push(t)}}return s};
sap.m.Tokenizer.prototype._onDeleteToken=function(e){var t=e.getParameter("token");if(t){this.removeToken(t);this.fireTokenChange({addedTokens:[],removedTokens:[t],type:sap.m.Tokenizer.TokenChangeType.TokensChanged})}};
sap.m.Tokenizer.prototype._onTokenPress=function(e){var s=e.oSource;s.setSelected(true)};
sap.m.Tokenizer.prototype.setEditable=function(e){this.setProperty("editable",e);var t=this.getTokens();var l=t.length;for(var i=0;i<l;i++){var c=t[i];c.setEditable(e)}return this};
sap.m.Tokenizer.prototype.setWidth=function(w){this.setProperty("width",w,true);this.$().css("width",this.getWidth());return this};
sap.m.Tokenizer.prototype.onsaphome=function(e){this.scrollToStart()};
sap.m.Tokenizer.prototype.onsapend=function(e){this.scrollToEnd()};
sap.m.Tokenizer.prototype.exit=function(){this._deregisterResizeHandler()};
sap.m.Tokenizer.prototype._deregisterResizeHandler=function(){if(this._sResizeHandlerId){sap.ui.core.ResizeHandler.deregister(this._sResizeHandlerId);delete this._sResizeHandlerId}};
sap.m.Tokenizer.TokenChangeType={Added:"added",Removed:"removed",RemovedAll:"removedAll",TokensChanged:"tokensChanged"};sap.m.Tokenizer.WaitForAsyncValidation="sap.m.Tokenizer.WaitForAsyncValidation";
