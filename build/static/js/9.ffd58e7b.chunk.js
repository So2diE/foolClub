(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{866:function(e,t,n){"use strict";function r(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}n.r(t);var a=n(48),o=n(0),i=n.n(o),l=n(202),c=n(43),s=n(785),p=(n(60),n(13)),d=n.n(p),u=n(103),m=n(6),f=n(145),g=n(9),y=n(21),x=n(8),b=n(327),h=n.n(b),E=n(3),v=(Object(x.withStyles)(function(e){return{buttonWrapper:{position:"relative",marginBottom:4*e.spacing.unit},button:{cursor:"pointer"},anchor:{backgroundColor:h.a[500],width:10,height:10,borderRadius:"50%",position:"absolute"},checked:{},typography:{margin:2*e.spacing.unit},icon:{height:"45px",cursor:"pointer"},root:{display:"flex","& >*":{display:"flex"}}}})(function(e){var t=Object(o.useState)(!1),n=Object(y.a)(t,2),r=n[0],a=n[1],l=Object(o.useState)(null),c=Object(y.a)(l,2),s=c[0],p=c[1],d=e.classes,u=e.popUp,m=e.title;return i.a.createElement("div",null,i.a.createElement("div",{className:d.button,onClick:function(e){p(e.currentTarget),a(!0)}},m),i.a.createElement(E.g,{open:r,anchorEl:s,anchorReference:"anchorEl",onClose:function(){return a(!1)},anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"}},u))}),n(10)),w=n(17),k=[{key:"nameAsc",element:i.a.createElement(w.a,{keyOfI18n:v.a.SHOP_SORT_NAME_ASC})},{key:"nameDes",element:i.a.createElement(w.a,{keyOfI18n:v.a.SHOP_SORT_NAME_DES})},{key:"priceAsc",element:i.a.createElement(w.a,{keyOfI18n:v.a.SHOP_SORT_PRICE_ASC})},{key:"priceDes",element:i.a.createElement(w.a,{keyOfI18n:v.a.SHOP_SORT_PRICE_DES})},{key:"clear",element:i.a.createElement(w.a,{keyOfI18n:v.a.SHOP_SORT_CLEAR})}],S=Object(l.a)({wrapper:{display:"flex",padding:"0 9%"},menu:{width:"25%"},menuHead:{display:"flex"},menuTitle:{flex:1,fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif",fontSize:19,fontWeight:400,padding:0,marginTop:0,backgroundColor:"transparent"},menuItem:{width:"100%",color:"#000",listStyle:"none",borderBottom:"1px solid rgb(169, 169, 169)",borderLeftWidth:0,borderRightWidth:0,borderTopWidth:0,textTransform:"uppercase",backgroundColor:"transparent",margin:0,cursor:"pointer",padding:10,textAlign:"left",fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif",fontSize:14,"&:hover":{backgroundColor:"#f4f4f4"}},menuTool:{display:"none",transform:"rotate(90deg)",padding:0,margin:"-18px 18px 0 0",borderWidth:0,width:25,height:60,cursor:"pointer",backgroundColor:"transparent"},opened:{transform:"rotate(90deg) !important"},categoryList:{listStyle:"none",padding:0,margin:0,"& > li:first-child > button":{borderTop:"1px solid rgb(169, 169, 169)"}},list:{width:"calc(75% - 35px)",marginLeft:35},topbar:{display:"flex",borderTop:"1px solid rgb(169, 169, 169)",borderBottom:"1px solid rgb(169, 169, 169)",padding:"5px 15px",alignItems:"center","& > div":{flex:1},"& > div:nth-child(2)":{flex:2.5}},modes:{"& > button":Object(a.a)({marginLeft:5,border:"1px solid #eee",backgroundColor:"transparent"},"border","none"),"& > button:first-child":{marginLeft:0}},icon:{padding:10,cursor:"pointer",alignItems:"center",border:"1px solid black"},status:{fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif",textAlign:"center"},sort:{fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif",textAlign:"right"},context:{display:"flex",flexWrap:"wrap"},item:{display:"flex",flexDirection:"column",width:"calc(33.3% - 50px)",backgroundColor:"transparent",flexBasis:"auto",margin:25,padding:"10px 15px",cursor:"pointer",border:"none",transition:"opacity 0.3s","&:hover":{opacity:.6}},media:{marginBottom:15,height:180,"& > img":{width:"100%",height:"100%",objectFit:"contain"}},name:{textAlign:"left",margin:"3px 0px 10px 0px",padding:0,fontSize:18,color:"#333"},price:{textAlign:"left",color:"#333"},tags:{padding:"10px 0px",textAlign:"left",fontSize:10,color:"#666",wordBreak:"break-word",textTransform:"uppercase"},rowItem:{display:"flex",flexDirection:"row",width:"calc(100% - 50px)",backgroundColor:"transparent",flexBasis:"auto",margin:25,flexWrap:"wrap",padding:"10px 15px",cursor:"pointer",border:"none",transition:"opacity 0.3s","&:hover":{opacity:.6}},rowItemInfo:{display:"flex",flexDirection:"column",padding:10,flexWrap:"wrap",minWidth:200,flex:2,alignItems:"flex-start",justifyContent:"center"},rowItemMedia:{flex:1,minWidth:180,marginBottom:15,height:180,"& > img":{width:"100%",height:"100%",objectFit:"contain"}},rowItemName:{textAlign:"left",margin:"3px 0px 5px 0px",padding:0,fontSize:18,color:"#333"},rowItemDescription:{textAlign:"left",color:"#666",fontSize:13},rowItemPrice:{textAlign:"left",margin:"3px 0px 5px 0px",color:"#333"},sortSelect:{position:"relative",display:"flex",justifyContent:"flex-end",minWidth:100,"& > div > button":{display:"block",cursor:"pointer",borderWidth:0,backgroundColor:"transparent",fontSize:14,"&:focus":{outline:0}}},sortOptions:{width:"100%",position:"absolute",display:"none",marginTop:35,padding:0,boxShadow:"0 3px 8px 3px rgba(92, 92, 92, 0.2)","&:before":{content:'""',position:"absolute",borderColor:"transparent transparent #f3f3f3",borderStyle:"solid",borderWidth:"10px 15px",top:-20,left:"calc(90% - 15px)"},"& > li":{listStyle:"none"},"& > li > button":{display:"block",width:"100%",borderWidth:0,backgroundColor:"#f3f3f3",cursor:"pointer",padding:"5px 0",fontSize:15,"&:focus":{outline:0}}},"@media (max-width: 600px)":{wrapper:{display:"block",padding:"0 5%"},menu:{width:"100%"},list:{width:"100%",marginLeft:0},topbar:{display:"none"},categoryList:{display:"none",marginBottom:20},menuTool:{display:"block",transform:"rotate(270deg)",paddingTop:45},item:{width:"calc(100% - 50px)"},name:{fontSize:14},rowItem:{alignItems:"center",justifyContent:"center"},rowItemDescription:{display:"none"}}});t.default=Object(c.b)(function(e){return{products:e.product.products,viewMode:e.product.viewMode,sort:e.product.sort,filter:e.product.filter}},function(e){return{changeViewMode:function(t){return e({type:m.n,payload:t})},editProductSort:function(t){return e({type:m.v,payload:{key:"sortBy",value:t}})},editProductFilter:function(t,n){return e({type:m.u,payload:{key:t,value:n}})},closeSortOptions:function(e){for(var t=e.target;t&&!/^sortSelect-/i.test(t.className);)t=t.parentNode;if(t){var n=Object.values(t.childNodes).filter(function(e){return/^sortOptions-/i.test(e.className)})[0];n&&(n.style.display=/^block$/i.test(n.style.display)?"none":"block")}}}})(function(e){var t=S(),n=r(e.products||[]);n=e.sort.sortBy&&e.sort.sortBy.length&&!/^clear$/.test(e.sort.sortBy)?n.sort(function(t,n){return/^nameAsc$/.test(e.sort.sortBy)?t.name>n.name:/^nameDes$/.test(e.sort.sortBy)?t.name<n.name:/^priceAsc$/.test(e.sort.sortBy)?t.price>n.price:/^priceDes$/.test(e.sort.sortBy)?t.price<n.price:void 0}):r(e.products||[]),e.filter.tag&&(n=n.filter(function(t){return t.tags.includes(e.filter.tag)}));var a=function(){return void 0==n?i.a.createElement(f.a,null):n.map(function(n,r){var a=(n.media||[]).filter(function(e){return/^(jpe?g|png|gif|bmp|mp4|qt|mov)$/i.test(e.ext)}),o=n.variants||[],l=[n.price].concat(n.variants.map(function(e){return e.price})).filter(function(e,t,n){return n.indexOf(e)==t}).sort(function(e,t){return e-t});return i.a.createElement("button",{key:r,type:"button",className:t.rowItem,onClick:function(){return Object(g.e)("/products/"+n.id,e.history)}},i.a.createElement("div",{className:t.rowItemMedia},i.a.createElement("img",{src:function(){var e="/notFound/not-found-image.jpg";return a.length&&a[0].url?e=a[0].url.replace(".cloud/",".cloud/380xAUTO/"):o.forEach(function(t){t.media.length>0&&"/notFound/not-found-image.jpg"==e&&(e=t.media[0].url)}),e}(),width:"100%"})),i.a.createElement("div",{className:t.rowItemInfo},i.a.createElement("div",{className:t.rowItemName},n.name),i.a.createElement("div",{className:t.rowItemPrice},l.length>1?i.a.createElement("span",null,i.a.createElement(s.a,{value:l[0],thousandSeparator:!0,prefix:"HK$",displayType:"text",renderText:function(e){return e}})," -\xa0",i.a.createElement(s.a,{value:l[l.length-1],thousandSeparator:!0,prefix:"HK$",displayType:"text",renderText:function(e){return e}})):i.a.createElement("span",null,i.a.createElement(s.a,{value:l[0],thousandSeparator:!0,prefix:"HK$",displayType:"text",renderText:function(e){return e}}))),(n.description||"").trim().length?i.a.createElement("div",{className:t.rowItemDescription},(n.description||"").length>80?n.description.substr(0,100)+"...":n.description):null,n.tags.length?i.a.createElement("div",{className:t.tags},"#",n.tags.join(" #")):null))})},o=function(){return void 0==n?i.a.createElement(f.a,null):n.map(function(n,r){var a=(n.media||[]).filter(function(e){return/^(jpe?g|png|gif|bmp|mp4|qt|mov)$/i.test(e.ext)}),o=n.variants||[],l=[n.price].concat(n.variants.map(function(e){return e.price})).filter(function(e,t,n){return n.indexOf(e)==t}).sort(function(e,t){return e-t});return i.a.createElement("button",{key:r,type:"button",className:t.item,onClick:function(){return Object(g.e)("/products/"+n.id,e.history)}},i.a.createElement("div",{className:t.media},i.a.createElement("img",{src:function(){var e="/notFound/not-found-image.jpg";return a.length&&a[0].url?e=a[0].url.replace(".cloud/",".cloud/380xAUTO/"):o.forEach(function(t){t.media.length>0&&"/notFound/not-found-image.jpg"==e&&(e=t.media[0].url)}),e}(),width:"100%"})),i.a.createElement("div",{className:t.name},n.name),i.a.createElement("div",{className:t.price},l.length>1?i.a.createElement("span",null,i.a.createElement(s.a,{value:l[0],thousandSeparator:!0,prefix:"HK$",displayType:"text",renderText:function(e){return e}})," -\xa0",i.a.createElement(s.a,{value:l[l.length-1],thousandSeparator:!0,prefix:"HK$",displayType:"text",renderText:function(e){return e}})):i.a.createElement("span",null,i.a.createElement(s.a,{value:l[0],thousandSeparator:!0,prefix:"HK$",displayType:"text",renderText:function(e){return e}}))),n.tags.length?i.a.createElement("div",{className:t.tags},"#",n.tags.join(" #")):null)})};return i.a.createElement("div",null,i.a.createElement(u.a,{title:i.a.createElement(w.a,{keyOfI18n:v.a.SHOP}),route:"home/shop"}),i.a.createElement("div",{className:t.wrapper},i.a.createElement("div",{className:t.menu},i.a.createElement("div",null,i.a.createElement("div",{className:t.menuHead},i.a.createElement("h3",{className:t.menuTitle},i.a.createElement(w.a,{keyOfI18n:v.a.FEED_CATEGORY})),i.a.createElement("button",{type:"button",className:d()(t.menuTool,"icon-play3"),onClick:function(e){var n=e.target,r=n.parentNode.nextSibling,a="none"==window.getComputedStyle(r).getPropertyValue("display")?"block":"none";r.style.display=a,n.classList[{none:"remove",block:"add"}[a]](t.opened),n.style["padding"+{none:"Top",block:"Bottom"}[a]]="45px",n.style["padding"+{none:"Bottom",block:"Top"}[a]]=0}})),i.a.createElement("ul",{className:t.categoryList},Object(g.c)(e.products||[]).map(function(n,r){return i.a.createElement("li",{key:r},i.a.createElement("button",{type:"button",className:t.menuItem,onClick:function(){e.editProductFilter("tag",n.value)}},n.label))})))),i.a.createElement("div",{className:t.list},i.a.createElement("div",{className:t.topbar},i.a.createElement("div",{className:t.modes},i.a.createElement("button",{type:"button",onClick:function(){return e.changeViewMode("form")},className:d()(t.icon,"icon-table")}),i.a.createElement("button",{type:"button",onClick:function(){return e.changeViewMode("list")},className:d()("icon-list",t.icon)})),i.a.createElement("div",{className:t.status}),i.a.createElement("div",{className:t.sortSelect},i.a.createElement("div",{style:{display:"flex",flexDirection:"row",alignItems:"center"}},e.sort.sortBy&&!/^clear$/.test(e.sort.sortBy)?k.filter(function(t){return t.key==e.sort.sortBy})[0].element:null,i.a.createElement("button",{type:"button",onClick:e.closeSortOptions,className:d()("icon-filter",t.icon)})),i.a.createElement("ul",{className:t.sortOptions},k.map(function(t){return i.a.createElement("li",null,i.a.createElement("button",{type:"button",onClick:function(n){e.editProductSort(t.key),e.closeSortOptions(n)}},t.element))})))),i.a.createElement("div",{className:t.context},/^form$/.test(e.viewMode)?o():a()))))})}}]);
//# sourceMappingURL=9.ffd58e7b.chunk.js.map