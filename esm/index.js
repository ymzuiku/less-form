var M=Object.defineProperty,B=Object.defineProperties;var L=Object.getOwnPropertyDescriptors;var p=Object.getOwnPropertySymbols;var b=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable;var S=(r,e,t)=>e in r?M(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,l=(r,e)=>{for(var t in e||(e={}))b.call(e,t)&&S(r,t,e[t]);if(p)for(var t of p(e))x.call(e,t)&&S(r,t,e[t]);return r},O=(r,e)=>B(r,L(e));var F=(r,e)=>{var t={};for(var o in r)b.call(r,o)&&e.indexOf(o)<0&&(t[o]=r[o]);if(r!=null&&p)for(var o of p(r))e.indexOf(o)<0&&x.call(r,o)&&(t[o]=r[o]);return t};var y=(r,e,t)=>new Promise((o,n)=>{var a=f=>{try{s(t.next(f))}catch(c){n(c)}},i=f=>{try{s(t.throw(f))}catch(c){n(c)}},s=f=>f.done?o(f.value):Promise.resolve(f.value).then(a,i);s((t=t.apply(r,e)).next())});import*as u from"react";import{useContext as Q,useEffect as U}from"react";import"react";import{useEffect as V,useMemo as sr,useRef as N,useState as Y}from"react";var z=Object.defineProperty,P=Object.getOwnPropertySymbols,_=Object.prototype.hasOwnProperty,H=Object.prototype.propertyIsEnumerable,E=(r,e,t)=>e in r?z(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,I=(r,e)=>{for(var t in e||(e={}))_.call(e,t)&&E(r,t,e[t]);if(P)for(var t of P(e))H.call(e,t)&&E(r,t,e[t]);return r},$=typeof Element!="undefined",q=typeof Map=="function",D=typeof Set=="function",G=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function d(r,e){if(r===e)return!0;if(r&&e&&typeof r=="object"&&typeof e=="object"){if(r.constructor!==e.constructor)return!1;let t,o,n;if(Array.isArray(r)){if(t=r.length,t!=e.length)return!1;for(o=t;o--!==0;)if(!d(r[o],e[o]))return!1;return!0}let a;if(q&&r instanceof Map&&e instanceof Map){if(r.size!==e.size)return!1;for(a=r.entries();!(o=a.next()).done;)if(!e.has(o.value[0]))return!1;for(a=r.entries();!(o=a.next()).done;)if(!d(o.value[1],e.get(o.value[0])))return!1;return!0}if(D&&r instanceof Set&&e instanceof Set){if(r.size!==e.size)return!1;for(a=r.entries();!(o=a.next()).done;)if(!e.has(o.value[0]))return!1;return!0}if(G&&ArrayBuffer.isView(r)&&ArrayBuffer.isView(e)){if(t=r.length,t!=e.length)return!1;for(o=t;o--!==0;)if(r[o]!==e[o])return!1;return!0}if(r.constructor===RegExp)return r.source===e.source&&r.flags===e.flags;if(r.valueOf!==Object.prototype.valueOf)return r.valueOf()===e.valueOf();if(r.toString!==Object.prototype.toString)return r.toString()===e.toString();if(n=Object.keys(r),t=n.length,t!==Object.keys(e).length)return!1;for(o=t;o--!==0;)if(!Object.prototype.hasOwnProperty.call(e,n[o]))return!1;if($&&r instanceof Element)return!1;for(o=t;o--!==0;)if(!((n[o]==="_owner"||n[o]==="__v"||n[o]==="__o")&&r.$$typeof)&&!d(r[n[o]],e[n[o]]))return!1;return!0}return r!==r&&e!==e}function J(r,e){try{return d(r,e)}catch(t){if((t.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw t}}function k(r,e){let[t,o]=Y(r.val),n=N(e(r.val));return V(()=>{let a=()=>{let i=e(r.val),s=!J(i,n.current);n.current=i,s&&o(I({},r.val))};return r.subscribs.add(a),()=>{r.subscribs.delete(a)}},[]),t}function w(r){let e=new Set,t={subscribs:e,next:o=>{o?Promise.resolve(o(t.val)).then(()=>{e.forEach(n=>n())}):e.forEach(n=>n())},val:r};return t}import{createContext as K}from"react";var m=K(void 0);var j={abortEarly:!1};function A(r,e,t){return y(this,null,function*(){let o={};if(t)try{yield r.validateAt(t,e,j)}catch(n){n&&n.errors&&n.errors[0]&&(o[t]=n.errors[0])}else{let n=Object.keys(e);for(let a of n)try{yield r.validateAt(a,e,j)}catch(i){i&&i.errors&&i.errors[0]&&(o[a]=i.errors[0])}}return o})}function R(r,e){if(r.entryCheckAll)return e;let t={};return Object.keys(r.touched).forEach(o=>{r.touched[o]&&(t[o]=e[o])}),t}function g(r,e){return y(this,null,function*(){if(r.validate){let t=yield Promise.resolve(r.validate(r.val,e));r.errors=R(r,t),r.next()}else if(r.validateSchema){let t=yield A(r.validateSchema,r.val,e);r.errors=R(r,t),r.next()}else r.next()})}var W={name:"",value:"",error:"",onChange:r=>{},onBlur:r=>{}};function X(r,e,t){if(!r)return W;let o=k(r,a=>t?t=="error"?[r.errors[e]]:[a[e]]:[a[e],r.errors[e]]);U(()=>{r.val[e]&&n.onChange(r.val[e])},[]);let n={name:e,value:o[e]==null?"":o[e],error:typeof r.errors[e]=="undefined"?"":r.errors[e],onBlur:a=>{a.persist&&a.persist(),r.touched[e]||(r.touched[e]=!0,n.onChange(o[e]))},onChange:a=>{r.touched[e]||(r.touched[e]=!0);let i=typeof a,s;if(i==="undefined")s="";else if(i==="object"&&a.currentTarget){let C=a.currentTarget.type;if(C==="checkbox"||C==="radio")s=!!a.currentTarget.checked;else if(a.currentTarget.multiple){let v=a.currentTarget.options,T=[];for(var f=0,c=v.length;f<c;f++)v[f].selected&&T.push(v[f].value);s=T}else s=a.currentTarget.value}else s=a;r.val[e]=s,r.handleChange&&(r.val=r.handleChange(r.val,e)),g(r,e)}};return n}function h(r,e){let t=Q(m);return X(t,r,e)}function Tr({name:r}){let e=h(r,"error");return u.createElement(u.Fragment,null,e.error)}function Sr(t){var o=t,{name:r}=o,e=F(o,["name"]);let n=h(r);return u.createElement("input",l({name:r,value:n.value,onChange:n.onChange,onBlur:n.onBlur},e))}var Z=m.Provider;function Pr(r){return u.createElement(Z,l({},r))}import{useEffect as rr,useMemo as er,useRef as tr}from"react";function Rr({initialValues:r,initErrors:e,validate:t,entryCheckAll:o,validateSchema:n,handleChange:a}){let i=tr(w(r));return rr(()=>{o&&g(i.current)},[]),er(()=>{let s={};return Object.keys(r).forEach(f=>{s[f]=!1}),i.current=O(l({},i.current),{validate:t,errors:e||{},touched:s,entryCheckAll:!!o,validateSchema:n,handleChange:a}),i.current},[])}export{Tr as ErrorMessage,Sr as Field,Pr as LessForm,h as useField,X as useFieldByContext,Rr as useForm,A as validateYupSchema};
