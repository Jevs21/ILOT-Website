import{h as s,k as u,s as d,c as r,m as l,b as g,d as f,S as m,J as S,t as h}from"./index-6b2834f3.js";import{g as v,a as x,c as p,b as i}from"./StackRowCentered-a217af4a.js";const C=s();function z(e){return x("MuiSvgIcon",e)}v("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const y=h("<title></title>",2),I=p()({name:"MuiSvgIcon",selfPropNames:["children","classes","color","fontSize","htmlColor","inheritViewBox","shapeRendering","titleAccess","viewBox"],propDefaults:({set:e})=>{const t=u(C);return e({component:"svg",color:"inherit",get fontSize(){return t?.fontSize??"medium"},inheritViewBox:!1,viewBox:"0 0 24 24"})},utilityClass:z,slotClasses:e=>({root:["root",e.color!=="inherit"&&`color${i(e.color)}`,`fontSize${i(e.fontSize)}`]})}),w=d("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.color!=="inherit"&&t[`color${i(o.color)}`],t[`fontSize${i(o.fontSize)}`]]}})(({theme:e,ownerState:t})=>({userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:"currentColor",flexShrink:0,transition:e.transitions?.create?.("fill",{duration:e.transitions?.duration?.shorter}),fontSize:{inherit:"inherit",small:e.typography?.pxToRem?.(20)||"1.25rem",medium:e.typography?.pxToRem?.(24)||"1.5rem",large:e.typography?.pxToRem?.(35)||"2.1875"}[t.fontSize],color:e.palette?.[t.color]?.main??{action:e.palette?.action?.active,disabled:e.palette?.action?.disabled,inherit:void 0}[t.color]})),$=I.component(function({allProps:t,props:o,otherProps:n,classes:a}){return r(w,l({get["aria-hidden"](){return o.titleAccess?void 0:!0},get role(){return o.titleAccess?"img":void 0},get viewBox(){return o.inheritViewBox?void 0:o.viewBox}},{focusable:"false"},{get color(){return o.htmlColor}},n,{get class(){return g(a.root,n.class)},ownerState:t,get children(){return[f(()=>o.children),r(m,{get when(){return!!o.titleAccess},get children(){const c=y.cloneNode(!0);return S(c,()=>o.titleAccess),c}})]}}))});function R(e,t){return n=>r($,l({"data-testid":`${t}Icon`},n,{children:e}))}export{R as c};