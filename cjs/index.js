var _=Object.create;var T=Object.defineProperty,q=Object.defineProperties,z=Object.getOwnPropertyDescriptor,G=Object.getOwnPropertyDescriptors,I=Object.getOwnPropertyNames,C=Object.getOwnPropertySymbols,J=Object.getPrototypeOf,S=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var O=(r,e,o)=>e in r?T(r,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[e]=o,p=(r,e)=>{for(var o in e||(e={}))S.call(e,o)&&O(r,o,e[o]);if(C)for(var o of C(e))E.call(e,o)&&O(r,o,e[o]);return r},L=(r,e)=>q(r,G(e)),R=r=>T(r,"__esModule",{value:!0});var v=(r,e)=>{var o={};for(var n in r)S.call(r,n)&&e.indexOf(n)<0&&(o[n]=r[n]);if(r!=null&&C)for(var n of C(r))e.indexOf(n)<0&&E.call(r,n)&&(o[n]=r[n]);return o};var Q=(r,e)=>{for(var o in e)T(r,o,{get:e[o],enumerable:!0})},w=(r,e,o,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of I(e))!S.call(r,s)&&(o||s!=="default")&&T(r,s,{get:()=>e[s],enumerable:!(n=z(e,s))||n.enumerable});return r},U=(r,e)=>w(R(T(r!=null?_(J(r)):{},"default",!e&&r&&r.__esModule?{get:()=>r.default,enumerable:!0}:{value:r,enumerable:!0})),r),W=(r=>(e,o)=>r&&r.get(e)||(o=w(R({}),e,1),r&&r.set(e,o),o))(typeof WeakMap!="undefined"?new WeakMap:0);var y=(r,e,o)=>new Promise((n,s)=>{var t=i=>{try{f(o.next(i))}catch(d){s(d)}},a=i=>{try{f(o.throw(i))}catch(d){s(d)}},f=i=>i.done?n(i.value):Promise.resolve(i.value).then(t,a);f((o=o.apply(r,e)).next())});var ar={};Q(ar,{ErrorMessage:()=>Z,Field:()=>$,FieldHOC:()=>rr,LessForm:()=>or,useField:()=>m,useFieldByContext:()=>Y,useFields:()=>nr,useFieldsByContext:()=>D,useForm:()=>sr});var u=U(require("react"));var F=require("react"),K=require("react-ob");var j=require("react"),g=(0,j.createContext)(void 0);var V={abortEarly:!1};function A(r){return!!r._blacklist}function B(r,e,o){return y(this,null,function*(){let n={};if(o)try{yield r.validateAt(o,e,V)}catch(s){s&&s.errors&&s.errors[0]&&(n[o]=s.errors[0])}else{let s=Object.keys(e);for(let t of s)try{yield r.validateAt(t,e,V)}catch(a){a&&a.errors&&a.errors[0]&&(n[t]=a.errors[0])}}return n})}function P(r,e){let o={};return Object.keys(r.touched).forEach(n=>{if(r.touched[n]){let s=e[n];s!==void 0&&(o[n]=s)}}),o}function h(r,e){return y(this,null,function*(){if(r.validate){let o=yield Promise.resolve(r.validate(r.val,e));Object.assign(r.errors,P(r,o))}else if(r.validateSchema){if(A(r.validateSchema)){let o=yield B(r.validateSchema,r.val,e);Object.assign(r.errors,P(r,o))}else if(r.validateSchema.isSoke){let o=r.validateSchema.validate(r.val,e);Object.assign(r.errors,P(r,o))}}r.next()})}var X={name:"",value:"",error:"",onChange:r=>{},onBlur:r=>{}};function Y(r,e,o){if(!r)return X;let n=(0,K.useObserver)(r,t=>o?o=="error"?[r.errors[e]]:[t[e]]:[t[e],r.errors[e]]);(0,F.useEffect)(()=>{r.val[e]&&s.onChange(r.val[e])},[]);let s={name:e,value:n[e]==null?"":n[e],error:typeof r.errors[e]=="undefined"?"":r.errors[e],onBlur:t=>{t.persist&&t.persist(),r.touched[e]||(r.touched[e]=!0,s.onChange(n[e]))},onChange:t=>{r.touched[e]||(r.touched[e]=!0);let a=typeof t,f;if(a==="undefined")f="";else if(a==="object"&&(t.currentTarget||t.target)){let l=t.currentTarget||t.target,c=l.type;if(c==="checkbox"||c==="radio")f=!!l.checked;else if(l.multiple){let k=l.options,b=[];for(var i=0,d=k.length;i<d;i++)k[i].selected&&b.push(k[i].value);f=b}else f=l.value}else f=t;r.val[e]=f,r.handleChange&&(r.val=r.handleChange(r.val,e)),h(r,e)}};return s}function m(r,e){let o=(0,F.useContext)(g);return Y(o,r,e)}function Z({name:r}){let e=m(r,"error");return u.createElement(u.Fragment,null,e.error)}function $({name:r,children:e,loadType:o}){let n=m(r,o);return e(n)}function rr(r){return function(t){var a=t,{name:o,loadType:n}=a,s=v(a,["name","loadType"]);if(o){let f=m(o,n);return u.createElement(r,p(p({},f),s))}return u.createElement(r,p({},s))}}var er=g.Provider;function or(s){var t=s,{children:r,onSubmit:e,value:o}=t,n=v(t,["children","onSubmit","value"]);return u.createElement(er,{value:o},u.createElement("form",p({onSubmit:a=>{a.preventDefault(),e&&e(a)}},n),r))}var M=require("react"),H=require("react-ob");var tr={names:[],values:{},errors:{},onChange:(r,e)=>{},keepValues:r=>{}};function D(r,e,o){if(!r)return tr;(0,H.useObserver)(r,t=>{let a=[];return o?o=="error"?(e.forEach(f=>{a.push(r.errors[f])}),a):(e.forEach(f=>{a.push(t[f])}),a):(e.forEach(f=>{a.push(t[f]),a.push(r.errors[f])}),a)});let n={},s={};return e.forEach(t=>{n[t]=r.val[t],s[t]=r.errors[t]||""}),{names:e,values:n,errors:s,onChange:(t,a)=>{r.val[t]=a,r.next()},keepValues:r.keepValues}}function nr(r,e){let o=(0,M.useContext)(g);return D(o,r,e)}var x=require("react"),N=require("react-ob");function sr({initialValues:r,initErrors:e,validate:o,validateSchema:n,handleChange:s}){let t=(0,x.useRef)((0,N.CreateObserver)(r));return(0,x.useMemo)(()=>{let a=Object.keys(r),f={};return a.forEach(i=>{f[i]=!1}),t.current=L(p({},t.current),{validate:o,errors:e||{},fields:a,touched:f,validateSchema:n,findFirstError:()=>{let i=t.current.validateSchema;if(i.isSoke)return i.firstError(t.current.errors);let d=t.current.fields,l="";return d.forEach(c=>{!l&&t.current.errors[c]&&(l=t.current.errors[c])}),l},validateAll:()=>y(this,null,function*(){let i=t.current.validateSchema;return i.isSoke?i.schemaKeys.forEach(d=>{t.current.touched[d]=!0}):t.current.fields.forEach(l=>{t.current.touched[l]=!0}),yield h(t.current),t.current.findFirstError()}),validateKey:i=>y(this,null,function*(){return t.current.touched[i]=!0,yield h(t.current,i),t.current.errors[i]}),keepValues:i=>{let d=i||t.current.fields,l={};return d.forEach(c=>{l[c]=t.current.val[c]}),l},handleChange:s}),t.current},[])}module.exports=W(ar);
