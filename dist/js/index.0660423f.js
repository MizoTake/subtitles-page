(function(e){function t(t){for(var r,a,l=t[0],s=t[1],u=t[2],d=0,f=[];d<l.length;d++)a=l[d],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&f.push(i[a][0]),i[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);c&&c(t);while(f.length)f.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,l=1;l<n.length;l++){var s=n[l];0!==i[s]&&(r=!1)}r&&(o.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},i={index:0},o=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var c=s;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("8a23"),i=n.n(r);i.a},"43bf":function(e,t,n){"use strict";var r=n("49db"),i=n.n(r);i.a},"49db":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{style:{width:e.windowWidth+"px",height:e.windowHeight+"px","background-color":e.colors.hex},attrs:{id:"app"},on:{click:e.onClick}},[n("ul",{staticClass:"subtitles",class:{blurContent:e.overlay},style:{"font-size":e.fontSize+"px","padding-bottom":e.windowHeight/2+"px",height:e.windowHeight/2+"px",color:e.fontColors.hex}},e._l(e.sliceText,(function(t,r){return n("li",{key:r,style:{"padding-top":e.listMargn+"px"}},[e._v(" "+e._s(t)+" ")])})),0),n("overlaySettings",e._b({ref:"overlaySettings",on:{disableOverlay:e.disableOverlayFromoverlaySettings,updateLineStrValue:e.updateLineStrValue,updateviewableArrayIndex:e.updateviewableArrayIndex,updateFontSize:e.updateFontSize,updateBackgroundColors:e.updateBackgroundColors,updateFontColors:e.updateFontColors,updateListMargin:e.updateListMargin}},"overlaySettings",{lineStrValue:e.lineStrValue,viewableArrayIndex:e.viewableArrayIndex,fontSize:e.fontSize,colors:e.colors,fontColors:e.fontColors,listMargn:e.listMargn},!1))],1)},o=[],a=(n("a630"),n("a15b"),n("d81d"),n("fb6a"),n("3ca3"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"screen"}},[e.overlay?n("div",{attrs:{id:"overlay"},on:{click:function(t){return t.target!==t.currentTarget?null:e.disableOverlay(t)}}},[n("ul",{staticClass:"settings",attrs:{id:"settings"},on:{click:function(t){return t.target!==t.currentTarget?null:e.disableOverlay(t)}}},[n("v-col",{staticClass:"gridView",attrs:{cols:"12"}},[n("v-row",{on:{click:function(t){return t.target!==t.currentTarget?null:e.disableOverlay(t)}}},[n("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[n("v-text-field",{attrs:{label:"一行あたりの文字数",value:e.lineStrValue},on:{change:e.updateLineStrValue}})],1),n("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[n("v-text-field",{attrs:{label:"表示する行数",value:e.viewableArrayIndex},on:{change:e.updateviewableArrayIndex}})],1),n("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[n("v-text-field",{attrs:{label:"フォントサイズ",value:e.fontSize},on:{change:e.updateFontSize}})],1),n("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[n("v-text-field",{attrs:{label:"行の間隔",value:e.listMargn},on:{change:e.updateListMargin}})],1)],1),n("v-row",{on:{click:function(t){return t.target!==t.currentTarget?null:e.disableOverlay(t)}}},[n("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[n("p",[e._v("背景色の変更")]),n("chrome-picker",{on:{input:e.updateBackgroundColors},model:{value:e.pickerColor,callback:function(t){e.pickerColor=t},expression:"pickerColor"}})],1),n("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[n("p",[e._v("文字色の変更")]),n("chrome-picker",{on:{input:e.updateFontColors},model:{value:e.fontPickerColor,callback:function(t){e.fontPickerColor=t},expression:"fontPickerColor"}})],1)],1)],1)],1)]):e._e()])}),l=[],s=n("c345"),u={props:["lineStrValue","viewableArrayIndex","fontSize","colors","fontColors","listMargn"],data:function(){return{overlay:!1,pickerColor:"#ffffff",fontPickerColor:"#ffffff"}},created:function(){this.pickerColor=this.colors,this.fontPickerColor=this.fontSize},components:{"chrome-picker":s["Chrome"]},methods:{enableOverlay:function(){this.overlay=!0},disableOverlay:function(){this.overlay=!1,this.$emit("disableOverlay")},updateLineStrValue:function(e){this.$emit("updateLineStrValue",e)},updateviewableArrayIndex:function(e){this.$emit("updateviewableArrayIndex",e)},updateFontSize:function(e){this.$emit("updateFontSize",e)},updateBackgroundColors:function(e){this.$emit("updateBackgroundColors",e)},updateFontColors:function(e){this.$emit("updateFontColors",e)},updateListMargin:function(e){this.$emit("updateListMargin",e)}}},c=u,d=(n("43bf"),n("2877")),f=n("6544"),p=n.n(f),v=n("62ad"),h=n("0fd9"),g=n("8654"),y=Object(d["a"])(c,a,l,!1,null,null,null),b=y.exports;p()(y,{VCol:v["a"],VRow:h["a"],VTextField:g["a"]});var w={name:"App",data:function(){return{speechRecognition:window.SpeechRecognition||window.webkitSpeechRecognition,windowWidth:window.innerWidth,windowHeight:window.innerHeight,isFirstStarted:!1,currentText:"",overlay:!1,overlaySettingsDisable:!1,lineStrValue:10,viewableArrayIndex:3,fontSize:48,colors:{hex:"#ffffff"},fontColors:{hex:"#000000"},listMargn:20}},computed:{sliceText:function(){for(var e=[],t=[],n=0;n<this.currentText.length;n+=this.lineStrValue)t.push(this.currentText.slice(n,n+this.lineStrValue));t.reverse();for(var r=0;r<this.viewableArrayIndex;r++)e.push(t[r]);return e.reverse()}},methods:{handleResize:function(){this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight;var e=this.$el.querySelector("#container");null!==e&&(e.scrollTop=this.windowHeight)},onClick:function(){this.overlaySettingsDisable?this.overlaySettingsDisable=!1:(this.overlay=!0,this.$refs.overlaySettings.enableOverlay())},disableOverlayFromoverlaySettings:function(){this.overlay=!1,this.overlaySettingsDisable=!0},updateLineStrValue:function(e){this.lineStrValue=parseInt(e)},updateviewableArrayIndex:function(e){this.viewableArrayIndex=parseInt(e)},updateFontSize:function(e){this.fontSize=parseInt(e)},updateBackgroundColors:function(e){this.colors=e},updateFontColors:function(e){this.fontColors=e},updateListMargin:function(e){this.listMargn=e},settingRecognition:function(){var e=this,t=new this.speechRecognition;t.lang="ja-JP",t.interimResults=!0,t.continuous=!0,t.addEventListener("start",(function(){e.isFirstStarted=!0})),t.addEventListener("result",(function(t){var n=Array.from(t.results).map((function(e){return e[0]})).map((function(e){return e.transcript}));e.currentText=n.join("。")})),t.addEventListener("end",(function(){e.isFirstStarted&&(t.start(),e.isFirstStarted=!1)})),t.start()}},mounted:function(){this.speechRecognition?(this.settingRecognition(),window.addEventListener("resize",this.handleResize)):alert("ChromeなどのSpeechRecognitionに対応したブラウザをお使いください。")},beforeDestroy:function(){window.removeEventListener("resize",this.handleResize)},components:{overlaySettings:b}},S=w,m=(n("034f"),Object(d["a"])(S,i,o,!1,null,null,null)),x=m.exports,C=n("f309");r["a"].use(C["a"]);var k=new C["a"]({}),O=n("f40c");r["a"].config.productionTip=!1,r["a"].use(O["a"]),new r["a"]({vuetify:k,render:function(e){return e(x)}}).$mount("#app")},"8a23":function(e,t,n){}});
//# sourceMappingURL=index.0660423f.js.map