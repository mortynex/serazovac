var ie=Object.defineProperty,re=Object.defineProperties;var ce=Object.getOwnPropertyDescriptors;var J=Object.getOwnPropertySymbols;var ue=Object.prototype.hasOwnProperty,he=Object.prototype.propertyIsEnumerable;var E=(l,e,t)=>e in l?ie(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t,U=(l,e)=>{for(var t in e||(e={}))ue.call(e,t)&&E(l,t,e[t]);if(J)for(var t of J(e))he.call(e,t)&&E(l,t,e[t]);return l},W=(l,e)=>re(l,ce(e));var j=(l,e,t)=>(E(l,typeof e!="symbol"?e+"":e,t),t);import{c as fe,r as de,S as N,i as O,s as L,e as h,t as pe,a as A,b as r,d as ve,f as x,g as b,h as c,j as me,k as Y,l as M,m as z,n as S,o as ye,p as ge,q as le,u as ke,v as ee,w as _e,x as ze,y as se,z as ne,A as be,B as F,C as I,D as we,E as H,F as V,G as T,H as je}from"./vendor.fd6d4128.js";const Pe=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerpolicy&&(n.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?n.credentials="include":a.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=t(a);fetch(a.href,n)}};Pe();const Se=l=>{const{width:e,height:t}=getComputedStyle(l);return{width:parseFloat(e),height:parseFloat(t)}},Be=l=>{l=[...l];for(let e=l.length-1;e>0;e--){const t=Math.floor(Math.random()*(e+1));oe(l,e,t)}return l},oe=(l,e,t)=>{[l[e],l[t]]=[l[t],l[e]]},Q="platnoContext___";class Ae{constructor(){j(this,"poslouchaci",new Map)}ziskejPoslouchace(e){var t;return(t=this.poslouchaci.get(e))!=null?t:[]}rozesli(e,...t){const s=this.ziskejPoslouchace(e);for(const a of s)a(...t)}poslouchej(e,t){const s=this.ziskejPoslouchace(e);s.push(t),this.poslouchaci.set(e,s)}}class xe{*serad(e){e=[...e];let t=0,s=!1,a=!1;for(;s===!1;){const n=t+1,o=e[n];if(!o){a===!1?s=!0:(t=0,a=!1);continue}const{poradi:i}=o,{poradi:u}=e[t];u>i&&([e[t],e[n]]=[e[n],e[t]],a=!0,yield e),t++}return yield e,e}}function*Re(l,e,t){console.log({zacatek:e,konec:t});const s=l[Math.floor((e+t)/2)].poradi;let a=e-1,n=t+1;for(;;){do a+=1;while(l[a].poradi<s);do n-=1;while(l[n].poradi>s);if(a>=n)return n;oe(l,n,a),l[n].zvyrazneny=!0,l[a].zvyrazneny=!0,yield l,l[n].zvyrazneny=!1,l[a].zvyrazneny=!1}}class $e{*serad(e,t,s){if(t===void 0&&(t=0),s===void 0&&(s=e.length-1),t<0||s<0||t>=s){yield e;return}let a;const n=Re(e,t,s);for(;;){const{value:o,done:i}=n.next();if(i){a=o;break}else yield o}console.log("broke out"),yield*this.serad(e,t,a),yield*this.serad(e,a+1,s)}}const Ce={QuickSort:new $e,BubbleSort:new xe};class Me extends Ae{constructor(e){super();j(this,"ctx");j(this,"bloky",[]);j(this,"sirkaBloku",5);j(this,"listAlgoritmu",Ce);j(this,"aktualniAlgoritmus");j(this,"serazuje",!1);j(this,"aktualniSerazovac");j(this,"aktualniRychlost",2);this.canvas=e,this.ctx=e.getContext("2d"),this.kalibruj(),this.zmenAlgortimus("BubbleSort"),this.udelejBloky(),this.vykresli(),this.rozesli("pripraven")}kalibruj(){const{width:e,height:t}=Se(this.canvas.parentElement),s=window.devicePixelRatio||1;this.canvas.width=Math.floor(e)*s,this.canvas.height=Math.floor(t)*s,this.ctx.scale(s,s)}get sirka(){const e=window.devicePixelRatio||1;return this.canvas.width/e}get vyska(){const e=window.devicePixelRatio||1;return this.canvas.height/e}vygenerujBloky(){const e=Math.floor(this.sirka/this.sirkaBloku),t=Math.floor(this.vyska/e),s=fe.createRainbow(e);this.bloky=Array(e).fill(null).map((a,n)=>({vyska:n*t,poradi:n,barva:de(s[n]),zvyrazneny:!1}))}zamichejBloky(){this.bloky=Be(this.bloky)}vykresli(){console.log("vykresluju"),this.ctx.clearRect(0,0,this.sirka,this.vyska);let e=0;for(let{vyska:t,barva:s,zvyrazneny:a}of this.bloky){this.ctx.fillStyle=a?"#ff007f":s,t=a?this.vyska:t;const n=e*this.sirkaBloku,o=this.vyska-t,i=this.sirkaBloku;this.ctx.fillRect(n,o,i,t),e++}}get algoritmy(){return Object.keys(this.listAlgoritmu)}get algoritmus(){return this.aktualniAlgoritmus}serazuj(e,t){let s=!1,a;for(let n=0;n<this.aktualniRychlost;n++){const{value:o,done:i}=e.next();o&&(a=o),i===!0&&(s=!0)}if(s)return!1;this.bloky=a,this.vykresli(),t()}zmenAlgortimus(e){this.aktualniAlgoritmus=e,this.updatujSerazovac(),this.rozesli("zmenaAlgoritmu",e)}zastavSerazovani(){this.serazuje=!1,this.rozesli("zastaveni")}pokracujVSerazovani(){this.serazuje=!0,this.rozesli("pokracovani")}zastav(){this.zastavSerazovani(),this.vycistiBloky()}resetuj(){this.udelejBloky(),this.zastav()}pokracuj(){this.pokracujVSerazovani();const e=()=>{this.serazuje!==!1&&this.serazuj(this.aktualniSerazovac,()=>{requestAnimationFrame(e)})};requestAnimationFrame(e)}updatujSerazovac(){this.vycistiBloky(),this.aktualniSerazovac=this.listAlgoritmu[this.aktualniAlgoritmus].serad(this.bloky)}vycistiBloky(){this.bloky=this.bloky.map(e=>W(U({},e),{zvyrazneny:!1})),this.vykresli()}udelejBloky(){this.vygenerujBloky(),this.zamichejBloky(),this.updatujSerazovac()}get rychlost(){return this.aktualniRychlost}zmenRychlost(e){this.aktualniRychlost=e,this.rozesli("zmenaRychlosti",e)}zmenSirkuBloku(e){this.sirkaBloku=e,this.udelejBloky(),this.rozesli("zmenaSirkuBloku",e)}}function te(l,e,t){const s=l.slice();return s[13]=e[t],s}function ae(l){let e,t=l[13]+"",s,a;return{c(){e=h("option"),s=pe(t),e.__value=a=l[13],e.value=e.__value},m(n,o){A(n,e,o),r(e,s)},p(n,o){o&1&&t!==(t=n[13]+"")&&ve(s,t),o&1&&a!==(a=n[13])&&(e.__value=a,e.value=e.__value)},d(n){n&&x(e)}}}function Ne(l){let e,t,s,a,n,o,i,u,d,f,m,R,g,p,_,P,G,w,K,q,C,D,X,$=l[0],k=[];for(let v=0;v<$.length;v+=1)k[v]=ae(te(l,$,v));return{c(){e=h("div"),t=h("div"),s=b(),a=h("div"),n=h("div"),o=h("label"),o.textContent="Algoritmus",i=b(),u=h("select");for(let v=0;v<k.length;v+=1)k[v].c();d=b(),f=h("div"),m=h("label"),m.textContent="Rychlost",R=b(),g=h("input"),p=b(),_=h("div"),P=h("label"),P.textContent="Sirka Bloku",G=b(),w=h("input"),K=b(),q=h("div"),c(t,"class","bg-gray-200 flex row gap-2"),c(o,"for",""),c(u,"name","algoritmy"),l[2]===void 0&&me(()=>l[8].call(u)),c(m,"for",""),c(g,"type","range"),c(g,"max","50"),c(g,"min","1"),c(P,"for",""),c(w,"type","range"),c(w,"max","40"),c(w,"min","2"),c(a,"class","h-10 flex row gap-2"),c(q,"class","bg-gray-200 h-10"),c(e,"class",C="w-full h-full flex flex-row justify-between items-center p-8 "+(l[1]?"":"hidden"))},m(v,B){A(v,e,B),r(e,t),r(e,s),r(e,a),r(a,n),r(n,o),r(n,i),r(n,u);for(let y=0;y<k.length;y+=1)k[y].m(u,null);Y(u,l[2]),r(a,d),r(a,f),r(f,m),r(f,R),r(f,g),M(g,l[3]),r(a,p),r(a,_),r(_,P),r(_,G),r(_,w),M(w,l[4]),r(e,K),r(e,q),D||(X=[z(u,"change",l[8]),z(u,"change",l[5]),z(g,"change",l[6]),z(g,"change",l[9]),z(g,"input",l[9]),z(w,"change",l[7]),z(w,"change",l[10]),z(w,"input",l[10])],D=!0)},p(v,[B]){if(B&1){$=v[0];let y;for(y=0;y<$.length;y+=1){const Z=te(v,$,y);k[y]?k[y].p(Z,B):(k[y]=ae(Z),k[y].c(),k[y].m(u,null))}for(;y<k.length;y+=1)k[y].d(1);k.length=$.length}B&5&&Y(u,v[2]),B&8&&M(g,v[3]),B&16&&M(w,v[4]),B&2&&C!==(C="w-full h-full flex flex-row justify-between items-center p-8 "+(v[1]?"":"hidden"))&&c(e,"class",C)},i:S,o:S,d(v){v&&x(e),ye(k,v),D=!1,ge(X)}}}function Oe(l,e,t){let s=[],a,n,o,i;le(Q)(P=>{t(1,a=P),d()});const d=()=>{t(0,s=a.algoritmy),t(2,n=a.algoritmus),t(3,o=a.rychlost)},f=()=>{a.zmenAlgortimus(n)},m=()=>{a.zmenRychlost(o)},R=()=>{a.zmenSirkuBloku(i)};function g(){n=ke(this),t(2,n),t(0,s)}function p(){o=ee(this.value),t(3,o)}function _(){i=ee(this.value),t(4,i)}return[s,a,n,o,i,f,m,R,g,p,_]}class Le extends N{constructor(e){super();O(this,e,Oe,Ne,L,{})}}function qe(l){let e,t,s,a;return{c(){e=h("div"),t=h("canvas"),c(e,"class","w-full h-full overflow-hidden")},m(n,o){A(n,e,o),r(e,t),l[3](t),s||(a=z(window,"resize",l[1]),s=!0)},p:S,i:S,o:S,d(n){n&&x(e),l[3](null),s=!1,a()}}}function De(l,e,t){let s,{platno:a}=e;const n=_e();ze(()=>{t(2,a=new Me(s)),n("nacteni")});const o=()=>{a.kalibruj(),a.resetuj()};function i(u){se[u?"unshift":"push"](()=>{s=u,t(0,s)})}return l.$$set=u=>{"platno"in u&&t(2,a=u.platno)},[s,o,a,i]}class Ee extends N{constructor(e){super();O(this,e,De,qe,L,{platno:2})}}var Fe="/serazovac/assets/pozastav_ikona.94c8c34b.svg",Ie="/serazovac/assets/zacni_ikona.8a6998f1.svg";function He(l){let e,t,s,a;return{c(){e=h("img"),ne(e.src,t=Ie)||c(e,"src",t),c(e,"alt",""),c(e,"class","cursor-pointer")},m(n,o){A(n,e,o),s||(a=z(e,"click",l[2]),s=!0)},p:S,d(n){n&&x(e),s=!1,a()}}}function Ve(l){let e,t,s,a;return{c(){e=h("img"),ne(e.src,t=Fe)||c(e,"src",t),c(e,"alt",""),c(e,"class","cursor-pointer")},m(n,o){A(n,e,o),s||(a=z(e,"click",l[1]),s=!0)},p:S,d(n){n&&x(e),s=!1,a()}}}function Te(l){let e,t,s,a,n,o;function i(f,m){return f[0]?Ve:He}let u=i(l),d=u(l);return{c(){e=h("div"),t=h("div"),s=b(),a=h("div"),d.c(),n=b(),o=h("div"),c(t,"class","bg-gray-200 flex row gap-2"),c(a,"class","h-10 flex row gap-2"),c(o,"class","bg-gray-200 h-10"),c(e,"class","w-full h-full flex flex-row justify-between items-center p-8")},m(f,m){A(f,e,m),r(e,t),r(e,s),r(e,a),d.m(a,null),r(e,n),r(e,o)},p(f,[m]){u===(u=i(f))&&d?d.p(f,m):(d.d(1),d=u(f),d&&(d.c(),d.m(a,null)))},i:S,o:S,d(f){f&&x(e),d.d()}}}function Qe(l,e,t){let s=!1,a;return le(Q)(u=>{a=u,a.poslouchej("zastaveni",()=>{t(0,s=!1)}),a.poslouchej("pokracovani",()=>{t(0,s=!0)})}),[s,()=>{a.zastav()},()=>{a.pokracuj()}]}class Ge extends N{constructor(e){super();O(this,e,Qe,Te,L,{})}}function Ke(l){let e,t,s,a,n,o,i,u,d,f,m;s=new Le({});function R(p){l[2](p)}let g={};return l[0]!==void 0&&(g.platno=l[0]),o=new Ee({props:g}),se.push(()=>be(o,"platno",R)),o.$on("nacteni",l[1]),f=new Ge({}),{c(){e=h("main"),t=h("div"),F(s.$$.fragment),a=b(),n=h("div"),F(o.$$.fragment),u=b(),d=h("div"),F(f.$$.fragment),c(t,"class","w-full h-[4.5em] border-b-2 border-gray-200"),c(n,"class","w-full flex-grow"),c(d,"class","w-full h-[4.5em] border-t-2 border-gray-200"),c(e,"class","w-screen h-screen flex flex-col")},m(p,_){A(p,e,_),r(e,t),I(s,t,null),r(e,a),r(e,n),I(o,n,null),r(e,u),r(e,d),I(f,d,null),m=!0},p(p,[_]){const P={};!i&&_&1&&(i=!0,P.platno=p[0],we(()=>i=!1)),o.$set(P)},i(p){m||(H(s.$$.fragment,p),H(o.$$.fragment,p),H(f.$$.fragment,p),m=!0)},o(p){V(s.$$.fragment,p),V(o.$$.fragment,p),V(f.$$.fragment,p),m=!1},d(p){p&&x(e),T(s),T(o),T(f)}}}function Xe(l,e,t){let s;const a=()=>{n.forEach(i=>{i(s)})},n=[];je(Q,i=>{n.push(i)});function o(i){s=i,t(0,s)}return[s,a,o]}class Ze extends N{constructor(e){super();O(this,e,Xe,Ke,L,{})}}new Ze({target:document.getElementById("app")});