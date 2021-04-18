!function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function s(t){t.forEach(e)}function a(t){return"function"==typeof t}function l(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function o(t,e){t.appendChild(e)}function c(t,e,n){t.insertBefore(e,n||null)}function r(t){t.parentNode.removeChild(t)}function i(t){return document.createElement(t)}function f(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function u(t){return document.createTextNode(t)}function d(){return u(" ")}function p(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function v(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function m(t,e,n){t.setAttributeNS("http://www.w3.org/1999/xlink",e,n)}function h(t,e,n){t.classList[n?"add":"remove"](e)}let g;function $(t){g=t}const b=[],y=[],w=[],k=[],x=Promise.resolve();let _=!1;function E(t){w.push(t)}let M=!1;const A=new Set;function S(){if(!M){M=!0;do{for(let t=0;t<b.length;t+=1){const e=b[t];$(e),L(e.$$)}for($(null),b.length=0;y.length;)y.pop()();for(let t=0;t<w.length;t+=1){const e=w[t];A.has(e)||(A.add(e),e())}w.length=0}while(b.length);for(;k.length;)k.pop()();_=!1,M=!1,A.clear()}}function L(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(E)}}const N=new Set;let j;function q(t,e){t&&t.i&&(N.delete(t),t.i(e))}function C(t,e,n,s){if(t&&t.o){if(N.has(t))return;N.add(t),j.c.push((()=>{N.delete(t),s&&(n&&t.d(1),s())})),t.o(e)}}function O(t){t&&t.c()}function B(t,n,l,o){const{fragment:c,on_mount:r,on_destroy:i,after_update:f}=t.$$;c&&c.m(n,l),o||E((()=>{const n=r.map(e).filter(a);i?i.push(...n):s(n),t.$$.on_mount=[]})),f.forEach(E)}function T(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function W(t,e){-1===t.$$.dirty[0]&&(b.push(t),_||(_=!0,x.then(S)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function z(e,a,l,o,c,i,f=[-1]){const u=g;$(e);const d=e.$$={fragment:null,ctx:null,props:i,update:t,not_equal:c,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:a.context||[]),callbacks:n(),dirty:f,skip_bound:!1};let p=!1;if(d.ctx=l?l(e,a.props||{},((t,n,...s)=>{const a=s.length?s[0]:n;return d.ctx&&c(d.ctx[t],d.ctx[t]=a)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](a),p&&W(e,t)),n})):[],d.update(),p=!0,s(d.before_update),d.fragment=!!o&&o(d.ctx),a.target){if(a.hydrate){const t=function(t){return Array.from(t.childNodes)}(a.target);d.fragment&&d.fragment.l(t),t.forEach(r)}else d.fragment&&d.fragment.c();a.intro&&q(e.$$.fragment),B(e,a.target,a.anchor,a.customElement),S()}$(u)}class H{$destroy(){T(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function P(e){let n,s,a;return{c(){n=f("svg"),s=f("use"),m(s,"xlink:href",a=`/my/frontend/bundle.svg#${e[0]}`),v(n,"class","inline-svg-icon svelte-12xj3l5")},m(t,e){c(t,n,e),o(n,s)},p(t,[e]){1&e&&a!==(a=`/my/frontend/bundle.svg#${t[0]}`)&&m(s,"xlink:href",a)},i:t,o:t,d(t){t&&r(n)}}}function D(t,e,n){let{name:s}=e;return t.$$set=t=>{"name"in t&&n(0,s=t.name)},[s]}class F extends H{constructor(t){super(),z(this,t,D,P,l,{name:0})}}function G(t,e,n){const s=t.slice();return s[3]=e[n].icon,s[4]=e[n].label,s}function I(t){let e,n,s,a,l,f,m,g,$,b=t[4]+"";function y(){return t[2](t[3])}return n=new F({props:{name:t[3]}}),{c(){e=i("div"),O(n.$$.fragment),s=d(),a=i("span"),l=u(b),f=d(),v(a,"class","svelte-15kn6cr"),v(e,"class","item "+t[3]+" svelte-15kn6cr"),h(e,"active",t[0]===t[3])},m(t,r){c(t,e,r),B(n,e,null),o(e,s),o(e,a),o(a,l),o(e,f),m=!0,g||($=p(e,"click",y),g=!0)},p(n,s){t=n,3&s&&h(e,"active",t[0]===t[3])},i(t){m||(q(n.$$.fragment,t),m=!0)},o(t){C(n.$$.fragment,t),m=!1},d(t){t&&r(e),T(n),g=!1,$()}}}function J(t){let e,n,a=t[1],l=[];for(let e=0;e<a.length;e+=1)l[e]=I(G(t,a,e));const o=t=>C(l[t],1,1,(()=>{l[t]=null}));return{c(){e=i("div");for(let t=0;t<l.length;t+=1)l[t].c();v(e,"class","header svelte-15kn6cr")},m(t,s){c(t,e,s);for(let t=0;t<l.length;t+=1)l[t].m(e,null);n=!0},p(t,[n]){if(3&n){let c;for(a=t[1],c=0;c<a.length;c+=1){const s=G(t,a,c);l[c]?(l[c].p(s,n),q(l[c],1)):(l[c]=I(s),l[c].c(),q(l[c],1),l[c].m(e,null))}for(j={r:0,c:[],p:j},c=a.length;c<l.length;c+=1)o(c);j.r||s(j.c),j=j.p}},i(t){if(!n){for(let t=0;t<a.length;t+=1)q(l[t]);n=!0}},o(t){l=l.filter(Boolean);for(let t=0;t<l.length;t+=1)C(l[t]);n=!1},d(t){t&&r(e),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(l,t)}}}function K(t,e,n){let{active:s="map"}=e;return t.$$set=t=>{"active"in t&&n(0,s=t.active)},[s,[{icon:"map",label:"Карта"},{icon:"collection",label:"Коллекция"},{icon:"bag",label:"Инвентарь"},{icon:"achivment",label:"Достижения"}],t=>{n(0,s=t)}]}class Q extends H{constructor(t){super(),z(this,t,K,J,l,{active:0})}}function R(e){let n,s,a,l,f,u;return{c(){n=i("div"),s=i("ol"),s.innerHTML='<li class="die-item svelte-1vafsb4" data-side="1"><span class="dot svelte-1vafsb4"></span></li> \n\t\t<li class="die-item svelte-1vafsb4" data-side="2"><span class="dot svelte-1vafsb4"></span> \n\t\t\t<span class="dot svelte-1vafsb4"></span></li> \n\t\t<li class="die-item svelte-1vafsb4" data-side="3"><span class="dot svelte-1vafsb4"></span> \n\t\t\t<span class="dot svelte-1vafsb4"></span> \n\t\t\t<span class="dot svelte-1vafsb4"></span></li> \n\t\t<li class="die-item svelte-1vafsb4" data-side="4"><span class="dot svelte-1vafsb4"></span> \n\t\t\t<span class="dot svelte-1vafsb4"></span> \n\t\t\t<span class="dot svelte-1vafsb4"></span> \n\t\t\t<span class="dot svelte-1vafsb4"></span></li> \n\t\t<li class="die-item svelte-1vafsb4" data-side="5"><span class="dot svelte-1vafsb4"></span> \n\t\t\t<span class="dot svelte-1vafsb4"></span> \n\t\t\t<span class="dot svelte-1vafsb4"></span> \n\t\t\t<span class="dot svelte-1vafsb4"></span> \n\t\t\t<span class="dot svelte-1vafsb4"></span></li> \n\t\t<li class="die-item svelte-1vafsb4" data-side="6"><span class="dot svelte-1vafsb4"></span> \n\t\t\t<span class="dot svelte-1vafsb4"></span> \n\t\t\t<span class="dot svelte-1vafsb4"></span> \n\t\t\t<span class="dot svelte-1vafsb4"></span> \n\t\t\t<span class="dot svelte-1vafsb4"></span> \n\t\t\t<span class="dot svelte-1vafsb4"></span></li>',a=d(),l=i("button"),l.textContent="Вращать",v(s,"class","die-list roll svelte-1vafsb4"),v(l,"class","svelte-1vafsb4"),v(n,"class","dice svelte-1vafsb4")},m(t,e){c(t,n,e),o(n,s),o(n,a),o(n,l),f||(u=p(l,"click",U),f=!0)},p:t,i:t,o:t,d(t){t&&r(n),f=!1,u()}}}function U(){[...document.querySelectorAll(".die-list")].forEach((t=>{var e,n;!function(t){t.classList.toggle("roll")}(t),t.dataset.roll=(e=1,n=6,e=Math.ceil(e),n=Math.floor(n),Math.floor(Math.random()*(n-e+1))+e)}))}class V extends H{constructor(t){super(),z(this,t,null,R,l,{})}}function X(e){let n,s,a,l,f,u,p,m;return f=new Q({props:{active:Y}}),p=new V({}),{c(){n=i("link"),s=i("link"),a=d(),l=i("main"),O(f.$$.fragment),u=d(),O(p.$$.fragment),v(n,"rel","preconnect"),v(n,"href","https://fonts.gstatic.com"),v(s,"href","https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap"),v(s,"rel","stylesheet"),v(l,"class","svelte-z0uk09")},m(t,e){o(document.head,n),o(document.head,s),c(t,a,e),c(t,l,e),B(f,l,null),o(l,u),B(p,l,null),m=!0},p:t,i(t){m||(q(f.$$.fragment,t),q(p.$$.fragment,t),m=!0)},o(t){C(f.$$.fragment,t),C(p.$$.fragment,t),m=!1},d(t){r(n),r(s),t&&r(a),t&&r(l),T(f),T(p)}}}let Y="map";class Z extends H{constructor(t){super(),z(this,t,null,X,l,{})}}window.initWalker=t=>new Z({target:document.querySelector("#walker"),props:t}),window.initWalker()}();
//# sourceMappingURL=bundle.js.map