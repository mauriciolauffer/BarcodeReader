/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Filter','sap/ui/model/Sorter','sap/ui/model/Filter','sap/ui/core/format/DateFormat'],function(q,O,S,F,D){"use strict";var a=function(){};a.createSortParams=function(s){var b;if(!s||s.length==0){return}b="$orderby=";for(var i=0;i<s.length;i++){var o=s[i];if(o instanceof S){b+=o.sPath;b+=o.bDescending?"%20desc":"%20asc";b+=","}}b=b.slice(0,-1);return b};a.createFilterParams=function(f,m,e){if(!f||f.length==0){return}return"$filter="+this._createFilterParams(f,m,e)};a._createFilterParams=function(f,m,e){var s;if(!f||f.length==0){return}var o={},b=0,c,s="",d=0,M,t=this;q.each(f,function(j,g){if(g.sPath){c=o[g.sPath];if(!c){c=o[g.sPath]=[];b++}}else{c=o["__multiFilter"];if(!c){c=o["__multiFilter"]=[];b++}}c.push(g)});q.each(o,function(p,c){if(c.length>1){s+='('}q.each(c,function(i,g){if(g instanceof O){if(g.aValues.length>1){s+='('}q.each(g.aValues,function(i,h){if(i>0){if(g.bAND){s+="%20and%20"}else{s+="%20or%20"}}s=t._createFilterSegment(g.sPath,m,e,h.operator,h.value1,h.value2,s)});if(g.aValues.length>1){s+=')'}}else if(g._bMultiFilter){s+=t._resolveMultiFilter(g,m,e)}else{s=t._createFilterSegment(g.sPath,m,e,g.sOperator,g.oValue1,g.oValue2,s)}if(i<c.length-1){s+="%20or%20"}});if(c.length>1){s+=')'}if(d<b-1){s+="%20and%20"}d++});return s};a._createUrlParamsArray=function(p){var u,t=q.type(p),P;if(t==="array"){return p}u=[];if(t==="object"){P=q.sap.encodeURLParameters(p);if(P){u.push(P)}}else if(t==="string"){if(p){u.push(p)}}return u};a._resolveMultiFilter=function(m,M,e){var t=this,f=m.aFilters,s="";if(f){s+="(";q.each(f,function(i,o){var l=false;if(o._bMultiFilter){s+=t._resolveMultiFilter(o,M,e)}else if(o.sPath){s+=t._createFilterSegment(o.sPath,M,e,o.sOperator,o.oValue1,o.oValue2,"")}if(i<(f.length-1)){if(m.bAnd){s+="%20and%20"}else{s+="%20or%20"}}});s+=")"}return s};a._createFilterSegment=function(p,m,e,o,v,V,f){var P,t;if(e){P=m._getPropertyMetadata(e,p);t=P&&P.type;}if(t){v=this.formatValue(v,t);V=(V!=null)?this.formatValue(V,t):null}else{}if(v){v=q.sap.encodeURL(String(v))}if(V){V=q.sap.encodeURL(String(V))}switch(o){case"EQ":case"NE":case"GT":case"GE":case"LT":case"LE":f+=p+"%20"+o.toLowerCase()+"%20"+v;break;case"BT":f+="("+p+"%20ge%20"+v+"%20and%20"+p+"%20le%20"+V+")";break;case"Contains":f+="substringof("+v+","+p+")";break;case"StartsWith":f+="startswith("+p+","+v+")";break;case"EndsWith":f+="endswith("+p+","+v+")";break;default:f+="true"}return f};a.formatValue=function(v,t){if(!this.oDateTimeFormat){this.oDateTimeFormat=D.getDateInstance({pattern:"'datetime'''yyyy-MM-dd'T'HH:mm:ss''"});this.oDateTimeOffsetFormat=D.getDateInstance({pattern:"'datetimeoffset'''yyyy-MM-dd'T'HH:mm:ss'Z'''"});this.oTimeFormat=D.getTimeInstance({pattern:"'time'''HH:mm:ss''"})}if(v===null||v===undefined){return"null"}var V;switch(t){case"Edm.String":V="'"+String(v).replace(/'/g,"''")+"'";break;case"Edm.Time":V="time'"+v+"'";break;case"Edm.DateTime":V=this.oDateTimeFormat.format(new Date(v),true);break;case"Edm.DateTimeOffset":V=this.oDateTimeOffsetFormat.format(new Date(v),true);break;case"Edm.Guid":V="guid'"+v+"'";break;case"Edm.Decimal":V=v+"M";break;case"Edm.Int64":V=v+"L";break;case"Edm.Single":V=v+"f";break;case"Edm.Binary":V="binary'"+v+"'";break;default:V=new String(v);break}return V};return a},true);
