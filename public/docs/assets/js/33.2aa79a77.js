(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{394:function(e,t,r){"use strict";r.r(t);var l={name:"DemoViewer",props:{value:{type:String,default:""},user:{type:String,default:"artur_arseniev"},width:{type:String,default:"100%"},height:{type:String,default:"300"},darkcode:{type:Boolean,default:!1},show:{type:Boolean,default:!1}},computed:{src(){const{value:e,user:t,darkcode:r,show:l}=this;return`//jsfiddle.net/${t}/${e}/embedded/${l?"result,js,html,css":"js,html,css,result"}${r?"/dark/?menuColor=fff&fontColor=333&accentColor=e67891":""}`}}},s=r(14),o=Object(s.a)(l,(function(){return(0,this._self._c)("iframe",{attrs:{width:this.width,height:this.height,src:this.src,allowfullscreen:"allowfullscreen",frameborder:"0"}})}),[],!1,null,null,null);t.default=o.exports}}]);