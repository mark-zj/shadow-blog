import{x as X,a1 as G,y as Y,ar as Se,a7 as Z,as as re,z as ee,ac as be,C as Ce,at as de,ae as T,J as m,B as le,P as xe,au as ae,G as Ie,L as ve,a as i,av as te,V as w,aw as Ve,ax as Pe,a8 as fe,a9 as pe,ad as he,af as ze,ah as L,ai as Q,ay as ne,a2 as Ae,a3 as we,a4 as Ee,az as _e,a5 as Re,aA as Fe,a6 as Te,aB as Ge,ab as Be,aC as Oe,aD as De,aE as Me,ao as Le,aF as We,aG as He,aa as qe,aH as Ke,aI as Ne,N as se,aJ as $e,aK as Je,aL as Ue,aM as W,aN as je,F as ie,q as oe}from"./index-oaeS58Yr.js";function Qe(e){let{selectedElement:n,containerElement:t,isRtl:u,isHorizontal:o}=e;const y=B(o,t),c=ye(o,u,t),k=B(o,n),v=ke(o,n),g=k*.4;return c>v?v-g:c+y<v+k?v-y+k+g:c}function Xe(e){let{selectedElement:n,containerElement:t,isHorizontal:u}=e;const o=B(u,t),y=ke(u,n),c=B(u,n);return y-o/2+c/2}function ce(e,n){const t=e?"scrollWidth":"scrollHeight";return(n==null?void 0:n[t])||0}function Ye(e,n){const t=e?"clientWidth":"clientHeight";return(n==null?void 0:n[t])||0}function ye(e,n,t){if(!t)return 0;const{scrollLeft:u,offsetWidth:o,scrollWidth:y}=t;return e?n?y-o+u:u:t.scrollTop}function B(e,n){const t=e?"offsetWidth":"offsetHeight";return(n==null?void 0:n[t])||0}function ke(e,n){const t=e?"offsetLeft":"offsetTop";return(n==null?void 0:n[t])||0}const Ze=Symbol.for("vuetify:v-slide-group"),me=X({centerActive:Boolean,direction:{type:String,default:"horizontal"},symbol:{type:null,default:Ze},nextIcon:{type:G,default:"$next"},prevIcon:{type:G,default:"$prev"},showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["always","desktop","mobile"].includes(e)},...Y(),...Se({mobile:null}),...Z(),...re({selectedClass:"v-slide-group-item--active"})},"VSlideGroup"),ue=ee()({name:"VSlideGroup",props:me(),emits:{"update:modelValue":e=>!0},setup(e,n){let{slots:t}=n;const{isRtl:u}=be(),{displayClasses:o,mobile:y}=Ce(e),c=de(e,e.symbol),k=T(!1),v=T(0),g=T(0),x=T(0),d=m(()=>e.direction==="horizontal"),{resizeRef:f,contentRect:E}=le(),{resizeRef:p,contentRect:V}=le(),s=xe(),S=m(()=>({container:f.el,duration:200,easing:"easeOutQuart"})),H=m(()=>c.selected.value.length?c.items.value.findIndex(l=>l.id===c.selected.value[0]):-1),b=m(()=>c.selected.value.length?c.items.value.findIndex(l=>l.id===c.selected.value[c.selected.value.length-1]):-1);if(ae){let l=-1;Ie(()=>[c.selected.value,E.value,V.value,d.value],()=>{cancelAnimationFrame(l),l=requestAnimationFrame(()=>{if(E.value&&V.value){const a=d.value?"width":"height";g.value=E.value[a],x.value=V.value[a],k.value=g.value+1<x.value}if(H.value>=0&&p.el){const a=p.el.children[b.value];_(a,e.centerActive)}})})}const P=T(!1);function _(l,a){let r=0;a?r=Xe({containerElement:f.el,isHorizontal:d.value,selectedElement:l}):r=Qe({containerElement:f.el,isHorizontal:d.value,isRtl:u.value,selectedElement:l}),O(r)}function O(l){if(!ae||!f.el)return;const a=B(d.value,f.el),r=ye(d.value,u.value,f.el);if(!(ce(d.value,f.el)<=a||Math.abs(l-r)<16)){if(d.value&&u.value&&f.el){const{scrollWidth:M,offsetWidth:j}=f.el;l=M-j-l}d.value?s.horizontal(l,S.value):s(l,S.value)}}function h(l){const{scrollTop:a,scrollLeft:r}=l.target;v.value=d.value?r:a}function I(l){if(P.value=!0,!(!k.value||!p.el)){for(const a of l.composedPath())for(const r of p.el.children)if(r===a){_(r);return}}}function q(l){P.value=!1}let R=!1;function D(l){var a;!R&&!P.value&&!(l.relatedTarget&&((a=p.el)!=null&&a.contains(l.relatedTarget)))&&C(),R=!1}function F(){R=!0}function K(l){if(!p.el)return;function a(r){l.preventDefault(),C(r)}d.value?l.key==="ArrowRight"?a(u.value?"prev":"next"):l.key==="ArrowLeft"&&a(u.value?"next":"prev"):l.key==="ArrowDown"?a("next"):l.key==="ArrowUp"&&a("prev"),l.key==="Home"?a("first"):l.key==="End"&&a("last")}function C(l){var r,A;if(!p.el)return;let a;if(!l)a=Ve(p.el)[0];else if(l==="next"){if(a=(r=p.el.querySelector(":focus"))==null?void 0:r.nextElementSibling,!a)return C("first")}else if(l==="prev"){if(a=(A=p.el.querySelector(":focus"))==null?void 0:A.previousElementSibling,!a)return C("last")}else l==="first"?a=p.el.firstElementChild:l==="last"&&(a=p.el.lastElementChild);a&&a.focus({preventScroll:!0})}function z(l){const a=d.value&&u.value?-1:1,r=(l==="prev"?-a:a)*g.value;let A=v.value+r;if(d.value&&u.value&&f.el){const{scrollWidth:M,offsetWidth:j}=f.el;A+=M-j}O(A)}const N=m(()=>({next:c.next,prev:c.prev,select:c.select,isSelected:c.isSelected})),$=m(()=>{switch(e.showArrows){case"always":return!0;case"desktop":return!y.value;case!0:return k.value||Math.abs(v.value)>0;case"mobile":return y.value||k.value||Math.abs(v.value)>0;default:return!y.value&&(k.value||Math.abs(v.value)>0)}}),J=m(()=>Math.abs(v.value)>1),U=m(()=>{if(!f.value)return!1;const l=ce(d.value,f.el),a=Ye(d.value,f.el);return l-a-Math.abs(v.value)>1});return ve(()=>i(e.tag,{class:["v-slide-group",{"v-slide-group--vertical":!d.value,"v-slide-group--has-affixes":$.value,"v-slide-group--is-overflowing":k.value},o.value,e.class],style:e.style,tabindex:P.value||c.selected.value.length?-1:0,onFocus:D},{default:()=>{var l,a,r;return[$.value&&i("div",{key:"prev",class:["v-slide-group__prev",{"v-slide-group__prev--disabled":!J.value}],onMousedown:F,onClick:()=>J.value&&z("prev")},[((l=t.prev)==null?void 0:l.call(t,N.value))??i(te,null,{default:()=>[i(w,{icon:u.value?e.nextIcon:e.prevIcon},null)]})]),i("div",{key:"container",ref:f,class:"v-slide-group__container",onScroll:h},[i("div",{ref:p,class:"v-slide-group__content",onFocusin:I,onFocusout:q,onKeydown:K},[(a=t.default)==null?void 0:a.call(t,N.value)])]),$.value&&i("div",{key:"next",class:["v-slide-group__next",{"v-slide-group__next--disabled":!U.value}],onMousedown:F,onClick:()=>U.value&&z("next")},[((r=t.next)==null?void 0:r.call(t,N.value))??i(te,null,{default:()=>[i(w,{icon:u.value?e.prevIcon:e.nextIcon},null)]})])]}})),{selected:c.selected,scrollTo:z,scrollOffset:v,focus:C,hasPrev:J,hasNext:U}}}),ge=Symbol.for("vuetify:v-chip-group"),el=X({column:Boolean,filter:Boolean,valueComparator:{type:Function,default:Pe},...me(),...Y(),...re({selectedClass:"v-chip--selected"}),...Z(),...fe(),...pe({variant:"tonal"})},"VChipGroup"),tl=ee()({name:"VChipGroup",props:el(),emits:{"update:modelValue":e=>!0},setup(e,n){let{slots:t}=n;const{themeClasses:u}=he(e),{isSelected:o,select:y,next:c,prev:k,selected:v}=de(e,ge);return ze({VChip:{color:L(e,"color"),disabled:L(e,"disabled"),filter:L(e,"filter"),variant:L(e,"variant")}}),ve(()=>{const g=ue.filterProps(e);return i(ue,Q(g,{class:["v-chip-group",{"v-chip-group--column":e.column},u.value,e.class],style:e.style}),{default:()=>{var x;return[(x=t.default)==null?void 0:x.call(t,{isSelected:o,select:y,next:c,prev:k,selected:v.value})]}})}),{}}}),ll=X({activeClass:String,appendAvatar:String,appendIcon:G,closable:Boolean,closeIcon:{type:G,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:G,ripple:{type:[Boolean,Object],default:!0},text:String,modelValue:{type:Boolean,default:!0},onClick:ne(),onClickOnce:ne(),...Ae(),...Y(),...we(),...Ee(),..._e(),...Re(),...Fe(),...Te(),...Z({tag:"span"}),...fe(),...pe({variant:"tonal"})},"VChip"),nl=ee()({name:"VChip",directives:{Ripple:Ge},props:ll(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,n){let{attrs:t,emit:u,slots:o}=n;const{t:y}=Be(),{borderClasses:c}=Oe(e),{colorClasses:k,colorStyles:v,variantClasses:g}=De(e),{densityClasses:x}=Me(e),{elevationClasses:d}=Le(e),{roundedClasses:f}=We(e),{sizeClasses:E}=He(e),{themeClasses:p}=he(e),V=qe(e,"modelValue"),s=Ke(e,ge,!1),S=Ne(e,t),H=m(()=>e.link!==!1&&S.isLink.value),b=m(()=>!e.disabled&&e.link!==!1&&(!!s||e.link||S.isClickable.value)),P=m(()=>({"aria-label":y(e.closeLabel),onClick(h){h.preventDefault(),h.stopPropagation(),V.value=!1,u("click:close",h)}}));function _(h){var I;u("click",h),b.value&&((I=S.navigate)==null||I.call(S,h),s==null||s.toggle())}function O(h){(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),_(h))}return()=>{const h=S.isLink.value?"a":e.tag,I=!!(e.appendIcon||e.appendAvatar),q=!!(I||o.append),R=!!(o.close||e.closable),D=!!(o.filter||e.filter)&&s,F=!!(e.prependIcon||e.prependAvatar),K=!!(F||o.prepend),C=!s||s.isSelected.value;return V.value&&se(i(h,Q({class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":b.value,"v-chip--filter":D,"v-chip--pill":e.pill},p.value,c.value,C?k.value:void 0,x.value,d.value,f.value,E.value,g.value,s==null?void 0:s.selectedClass.value,e.class],style:[C?v.value:void 0,e.style],disabled:e.disabled||void 0,draggable:e.draggable,tabindex:b.value?0:void 0,onClick:_,onKeydown:b.value&&!H.value&&O},S.linkProps),{default:()=>{var z;return[Je(b.value,"v-chip"),D&&i(Ue,{key:"filter"},{default:()=>[se(i("div",{class:"v-chip__filter"},[o.filter?i(W,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},o.filter):i(w,{key:"filter-icon",icon:e.filterIcon},null)]),[[je,s.isSelected.value]])]}),K&&i("div",{key:"prepend",class:"v-chip__prepend"},[o.prepend?i(W,{key:"prepend-defaults",disabled:!F,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},o.prepend):i(ie,null,[e.prependIcon&&i(w,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&i(oe,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),i("div",{class:"v-chip__content","data-no-activator":""},[((z=o.default)==null?void 0:z.call(o,{isSelected:s==null?void 0:s.isSelected.value,selectedClass:s==null?void 0:s.selectedClass.value,select:s==null?void 0:s.select,toggle:s==null?void 0:s.toggle,value:s==null?void 0:s.value.value,disabled:e.disabled}))??e.text]),q&&i("div",{key:"append",class:"v-chip__append"},[o.append?i(W,{key:"append-defaults",disabled:!I,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},o.append):i(ie,null,[e.appendIcon&&i(w,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&i(oe,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),R&&i("button",Q({key:"close",class:"v-chip__close",type:"button","data-testid":"close-chip"},P.value),[o.close?i(W,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},o.close):i(w,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}}),[[$e("ripple"),b.value&&e.ripple,null]])}}});export{tl as V,nl as a};