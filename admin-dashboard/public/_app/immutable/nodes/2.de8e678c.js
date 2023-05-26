import{S as Eu,i as Tu,s as Iu,k as P,a as ut,q as tt,l as F,c as ht,m as $,r as et,h as N,n as K,J as Su,b as Wt,G as T,H as Xn,o as Cu,K as Au,u as ie,L as Du}from"../chunks/index.e1be4839.js";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ko=function(e){const t=[];let n=0;for(let s=0;s<e.length;s++){let r=e.charCodeAt(s);r<128?t[n++]=r:r<2048?(t[n++]=r>>6|192,t[n++]=r&63|128):(r&64512)===55296&&s+1<e.length&&(e.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(e.charCodeAt(++s)&1023),t[n++]=r>>18|240,t[n++]=r>>12&63|128,t[n++]=r>>6&63|128,t[n++]=r&63|128):(t[n++]=r>>12|224,t[n++]=r>>6&63|128,t[n++]=r&63|128)}return t},_u=function(e){const t=[];let n=0,s=0;for(;n<e.length;){const r=e[n++];if(r<128)t[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=e[n++];t[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=e[n++],o=e[n++],a=e[n++],c=((r&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;t[s++]=String.fromCharCode(55296+(c>>10)),t[s++]=String.fromCharCode(56320+(c&1023))}else{const i=e[n++],o=e[n++];t[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return t.join("")},Go={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<e.length;r+=3){const i=e[r],o=r+1<e.length,a=o?e[r+1]:0,c=r+2<e.length,u=c?e[r+2]:0,h=i>>2,l=(i&3)<<4|a>>4;let f=(a&15)<<2|u>>6,d=u&63;c||(d=64,o||(f=64)),s.push(n[h],n[l],n[f],n[d])}return s.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(Ko(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):_u(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<e.length;){const i=n[e.charAt(r++)],a=r<e.length?n[e.charAt(r)]:0;++r;const u=r<e.length?n[e.charAt(r)]:64;++r;const l=r<e.length?n[e.charAt(r)]:64;if(++r,i==null||a==null||u==null||l==null)throw new bu;const f=i<<2|a>>4;if(s.push(f),u!==64){const d=a<<4&240|u>>2;if(s.push(d),l!==64){const m=u<<6&192|l;s.push(m)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class bu extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ku=function(e){const t=Ko(e);return Go.encodeByteArray(t,!0)},Jn=function(e){return ku(e).replace(/\./g,"")},Nu=function(e){try{return Go.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ru(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xu=()=>Ru().__FIREBASE_DEFAULTS__,Mu=()=>{if(typeof process>"u"||typeof process.env>"u")return;const e={}.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},Ou=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=e&&Nu(e[1]);return t&&JSON.parse(t)},Qo=()=>{try{return xu()||Mu()||Ou()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},Lu=e=>{var t,n;return(n=(t=Qo())===null||t===void 0?void 0:t.emulatorHosts)===null||n===void 0?void 0:n[e]},Pu=e=>{const t=Lu(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const s=parseInt(t.substring(n+1),10);return t[0]==="["?[t.substring(1,n-1),s]:[t.substring(0,n),s]},Wo=()=>{var e;return(e=Qo())===null||e===void 0?void 0:e.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fu{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,s))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vu(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=t||"demo-project",r=e.iat||0,i=e.sub||e.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},e),a="";return[Jn(JSON.stringify(n)),Jn(JSON.stringify(o)),a].join(".")}function Uu(){try{return typeof indexedDB=="object"}catch{return!1}}function Bu(){return new Promise((e,t)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),e(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var i;t(((i=r.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){t(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $u="FirebaseError";class Be extends Error{constructor(t,n,s){super(n),this.code=t,this.customData=s,this.name=$u,Object.setPrototypeOf(this,Be.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Yo.prototype.create)}}class Yo{constructor(t,n,s){this.service=t,this.serviceName=n,this.errors=s}create(t,...n){const s=n[0]||{},r=`${this.service}/${t}`,i=this.errors[t],o=i?ju(i,s):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new Be(r,a,s)}}function ju(e,t){return e.replace(qu,(n,s)=>{const r=t[s];return r!=null?String(r):`<${s}?>`})}const qu=/\{\$([^}]+)}/g;function ur(e,t){if(e===t)return!0;const n=Object.keys(e),s=Object.keys(t);for(const r of n){if(!s.includes(r))return!1;const i=e[r],o=t[r];if(Vi(i)&&Vi(o)){if(!ur(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function Vi(e){return e!==null&&typeof e=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Re(e){return e&&e._delegate?e._delegate:e}class hn{constructor(t,n,s){this.name=t,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oe="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zu{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const s=new Fu;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){var n;const s=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(n=t==null?void 0:t.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Ku(t))try{this.getOrInitializeService({instanceIdentifier:oe})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(t=oe){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=oe){return this.instances.has(t)}getOptions(t=oe){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:n={}}=t,s=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);s===a&&o.resolve(r)}return r}onInit(t,n){var s;const r=this.normalizeInstanceIdentifier(n),i=(s=this.onInitCallbacks.get(r))!==null&&s!==void 0?s:new Set;i.add(t),this.onInitCallbacks.set(r,i);const o=this.instances.get(r);return o&&t(o,r),()=>{i.delete(t)}}invokeOnInitCallbacks(t,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let s=this.instances.get(t);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Hu(t),options:n}),this.instances.set(t,s),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(s,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,s)}catch{}return s||null}normalizeInstanceIdentifier(t=oe){return this.component?this.component.multipleInstances?t:oe:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Hu(e){return e===oe?void 0:e}function Ku(e){return e.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gu{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const n=new zu(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var O;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(O||(O={}));const Qu={debug:O.DEBUG,verbose:O.VERBOSE,info:O.INFO,warn:O.WARN,error:O.ERROR,silent:O.SILENT},Wu=O.INFO,Yu={[O.DEBUG]:"log",[O.VERBOSE]:"log",[O.INFO]:"info",[O.WARN]:"warn",[O.ERROR]:"error"},Xu=(e,t,...n)=>{if(t<e.logLevel)return;const s=new Date().toISOString(),r=Yu[t];if(r)console[r](`[${s}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Xo{constructor(t){this.name=t,this._logLevel=Wu,this._logHandler=Xu,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in O))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Qu[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,O.DEBUG,...t),this._logHandler(this,O.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,O.VERBOSE,...t),this._logHandler(this,O.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,O.INFO,...t),this._logHandler(this,O.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,O.WARN,...t),this._logHandler(this,O.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,O.ERROR,...t),this._logHandler(this,O.ERROR,...t)}}const Ju=(e,t)=>t.some(n=>e instanceof n);let Ui,Bi;function Zu(){return Ui||(Ui=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function th(){return Bi||(Bi=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Jo=new WeakMap,hr=new WeakMap,Zo=new WeakMap,Ks=new WeakMap,Br=new WeakMap;function eh(e){const t=new Promise((n,s)=>{const r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",o)},i=()=>{n(Yt(e.result)),r()},o=()=>{s(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",o)});return t.then(n=>{n instanceof IDBCursor&&Jo.set(n,e)}).catch(()=>{}),Br.set(t,e),t}function nh(e){if(hr.has(e))return;const t=new Promise((n,s)=>{const r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",o),e.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",o),e.addEventListener("abort",o)});hr.set(e,t)}let lr={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return hr.get(e);if(t==="objectStoreNames")return e.objectStoreNames||Zo.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Yt(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function sh(e){lr=e(lr)}function rh(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){const s=e.call(Gs(this),t,...n);return Zo.set(s,t.sort?t.sort():[t]),Yt(s)}:th().includes(e)?function(...t){return e.apply(Gs(this),t),Yt(Jo.get(this))}:function(...t){return Yt(e.apply(Gs(this),t))}}function ih(e){return typeof e=="function"?rh(e):(e instanceof IDBTransaction&&nh(e),Ju(e,Zu())?new Proxy(e,lr):e)}function Yt(e){if(e instanceof IDBRequest)return eh(e);if(Ks.has(e))return Ks.get(e);const t=ih(e);return t!==e&&(Ks.set(e,t),Br.set(t,e)),t}const Gs=e=>Br.get(e);function oh(e,t,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(e,t),a=Yt(o);return s&&o.addEventListener("upgradeneeded",c=>{s(Yt(o.result),c.oldVersion,c.newVersion,Yt(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),r&&c.addEventListener("versionchange",u=>r(u.oldVersion,u.newVersion,u))}).catch(()=>{}),a}const ah=["get","getKey","getAll","getAllKeys","count"],ch=["put","add","delete","clear"],Qs=new Map;function $i(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(Qs.get(t))return Qs.get(t);const n=t.replace(/FromIndex$/,""),s=t!==n,r=ch.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||ah.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,r?"readwrite":"readonly");let u=c.store;return s&&(u=u.index(a.shift())),(await Promise.all([u[n](...a),r&&c.done]))[0]};return Qs.set(t,i),i}sh(e=>({...e,get:(t,n,s)=>$i(t,n)||e.get(t,n,s),has:(t,n)=>!!$i(t,n)||e.has(t,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uh{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(hh(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function hh(e){const t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}const dr="@firebase/app",ji="0.9.10";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const de=new Xo("@firebase/app"),lh="@firebase/app-compat",dh="@firebase/analytics-compat",fh="@firebase/analytics",gh="@firebase/app-check-compat",ph="@firebase/app-check",mh="@firebase/auth",yh="@firebase/auth-compat",vh="@firebase/database",wh="@firebase/database-compat",Eh="@firebase/functions",Th="@firebase/functions-compat",Ih="@firebase/installations",Sh="@firebase/installations-compat",Ch="@firebase/messaging",Ah="@firebase/messaging-compat",Dh="@firebase/performance",_h="@firebase/performance-compat",bh="@firebase/remote-config",kh="@firebase/remote-config-compat",Nh="@firebase/storage",Rh="@firebase/storage-compat",xh="@firebase/firestore",Mh="@firebase/firestore-compat",Oh="firebase",Lh="9.22.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fr="[DEFAULT]",Ph={[dr]:"fire-core",[lh]:"fire-core-compat",[fh]:"fire-analytics",[dh]:"fire-analytics-compat",[ph]:"fire-app-check",[gh]:"fire-app-check-compat",[mh]:"fire-auth",[yh]:"fire-auth-compat",[vh]:"fire-rtdb",[wh]:"fire-rtdb-compat",[Eh]:"fire-fn",[Th]:"fire-fn-compat",[Ih]:"fire-iid",[Sh]:"fire-iid-compat",[Ch]:"fire-fcm",[Ah]:"fire-fcm-compat",[Dh]:"fire-perf",[_h]:"fire-perf-compat",[bh]:"fire-rc",[kh]:"fire-rc-compat",[Nh]:"fire-gcs",[Rh]:"fire-gcs-compat",[xh]:"fire-fst",[Mh]:"fire-fst-compat","fire-js":"fire-js",[Oh]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zn=new Map,gr=new Map;function Fh(e,t){try{e.container.addComponent(t)}catch(n){de.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function ts(e){const t=e.name;if(gr.has(t))return de.debug(`There were multiple attempts to register component ${t}.`),!1;gr.set(t,e);for(const n of Zn.values())Fh(n,e);return!0}function Vh(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uh={["no-app"]:"No Firebase App '{$appName}' has been created - call initializeApp() first",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["no-options"]:"Need to provide options, when not being deployed to hosting via source.",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["idb-open"]:"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",["idb-get"]:"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",["idb-set"]:"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",["idb-delete"]:"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},Xt=new Yo("app","Firebase",Uh);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bh{constructor(t,n,s){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new hn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Xt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $h=Lh;function ta(e,t={}){let n=e;typeof t!="object"&&(t={name:t});const s=Object.assign({name:fr,automaticDataCollectionEnabled:!1},t),r=s.name;if(typeof r!="string"||!r)throw Xt.create("bad-app-name",{appName:String(r)});if(n||(n=Wo()),!n)throw Xt.create("no-options");const i=Zn.get(r);if(i){if(ur(n,i.options)&&ur(s,i.config))return i;throw Xt.create("duplicate-app",{appName:r})}const o=new Gu(r);for(const c of gr.values())o.addComponent(c);const a=new Bh(n,s,o);return Zn.set(r,a),a}function jh(e=fr){const t=Zn.get(e);if(!t&&e===fr&&Wo())return ta();if(!t)throw Xt.create("no-app",{appName:e});return t}function sn(e,t,n){var s;let r=(s=Ph[e])!==null&&s!==void 0?s:e;n&&(r+=`-${n}`);const i=r.match(/\s|\//),o=t.match(/\s|\//);if(i||o){const a=[`Unable to register library "${r}" with version "${t}":`];i&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),de.warn(a.join(" "));return}ts(new hn(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qh="firebase-heartbeat-database",zh=1,ln="firebase-heartbeat-store";let Ws=null;function ea(){return Ws||(Ws=oh(qh,zh,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(ln)}}}).catch(e=>{throw Xt.create("idb-open",{originalErrorMessage:e.message})})),Ws}async function Hh(e){try{return await(await ea()).transaction(ln).objectStore(ln).get(na(e))}catch(t){if(t instanceof Be)de.warn(t.message);else{const n=Xt.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});de.warn(n.message)}}}async function qi(e,t){try{const s=(await ea()).transaction(ln,"readwrite");await s.objectStore(ln).put(t,na(e)),await s.done}catch(n){if(n instanceof Be)de.warn(n.message);else{const s=Xt.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});de.warn(s.message)}}}function na(e){return`${e.name}!${e.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kh=1024,Gh=30*24*60*60*1e3;class Qh{constructor(t){this.container=t,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Yh(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=zi();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(r=>r.date===s)))return this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(r=>{const i=new Date(r.date).valueOf();return Date.now()-i<=Gh}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const t=zi(),{heartbeatsToSend:n,unsentEntries:s}=Wh(this._heartbeatsCache.heartbeats),r=Jn(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}}function zi(){return new Date().toISOString().substring(0,10)}function Wh(e,t=Kh){const n=[];let s=e.slice();for(const r of e){const i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),Hi(n)>t){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),Hi(n)>t){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class Yh{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Uu()?Bu().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await Hh(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(t){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return qi(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return qi(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function Hi(e){return Jn(JSON.stringify({version:2,heartbeats:e})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xh(e){ts(new hn("platform-logger",t=>new uh(t),"PRIVATE")),ts(new hn("heartbeat",t=>new Qh(t),"PRIVATE")),sn(dr,ji,e),sn(dr,ji,"esm2017"),sn("fire-js","")}Xh("");var Jh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},y,$r=$r||{},A=Jh||self;function es(){}function ws(e){var t=typeof e;return t=t!="object"?t:e?Array.isArray(e)?"array":t:"null",t=="array"||t=="object"&&typeof e.length=="number"}function Sn(e){var t=typeof e;return t=="object"&&e!=null||t=="function"}function Zh(e){return Object.prototype.hasOwnProperty.call(e,Ys)&&e[Ys]||(e[Ys]=++tl)}var Ys="closure_uid_"+(1e9*Math.random()>>>0),tl=0;function el(e,t,n){return e.call.apply(e.bind,arguments)}function nl(e,t,n){if(!e)throw Error();if(2<arguments.length){var s=Array.prototype.slice.call(arguments,2);return function(){var r=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(r,s),e.apply(t,r)}}return function(){return e.apply(t,arguments)}}function yt(e,t,n){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?yt=el:yt=nl,yt.apply(null,arguments)}function Vn(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var s=n.slice();return s.push.apply(s,arguments),e.apply(this,s)}}function at(e,t){function n(){}n.prototype=t.prototype,e.$=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.ac=function(s,r,i){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return t.prototype[r].apply(s,o)}}function ne(){this.s=this.s,this.o=this.o}var sl=0;ne.prototype.s=!1;ne.prototype.ra=function(){!this.s&&(this.s=!0,this.N(),sl!=0)&&Zh(this)};ne.prototype.N=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const sa=Array.prototype.indexOf?function(e,t){return Array.prototype.indexOf.call(e,t,void 0)}:function(e,t){if(typeof e=="string")return typeof t!="string"||t.length!=1?-1:e.indexOf(t,0);for(let n=0;n<e.length;n++)if(n in e&&e[n]===t)return n;return-1};function jr(e){const t=e.length;if(0<t){const n=Array(t);for(let s=0;s<t;s++)n[s]=e[s];return n}return[]}function Ki(e,t){for(let n=1;n<arguments.length;n++){const s=arguments[n];if(ws(s)){const r=e.length||0,i=s.length||0;e.length=r+i;for(let o=0;o<i;o++)e[r+o]=s[o]}else e.push(s)}}function vt(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}vt.prototype.h=function(){this.defaultPrevented=!0};var rl=function(){if(!A.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{A.addEventListener("test",es,t),A.removeEventListener("test",es,t)}catch{}return e}();function ns(e){return/^[\s\xa0]*$/.test(e)}var Gi=String.prototype.trim?function(e){return e.trim()}:function(e){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(e)[1]};function Xs(e,t){return e<t?-1:e>t?1:0}function Es(){var e=A.navigator;return e&&(e=e.userAgent)?e:""}function Pt(e){return Es().indexOf(e)!=-1}function qr(e){return qr[" "](e),e}qr[" "]=es;function ra(e,t,n){return Object.prototype.hasOwnProperty.call(e,t)?e[t]:e[t]=n(t)}var il=Pt("Opera"),xe=Pt("Trident")||Pt("MSIE"),ia=Pt("Edge"),pr=ia||xe,oa=Pt("Gecko")&&!(Es().toLowerCase().indexOf("webkit")!=-1&&!Pt("Edge"))&&!(Pt("Trident")||Pt("MSIE"))&&!Pt("Edge"),ol=Es().toLowerCase().indexOf("webkit")!=-1&&!Pt("Edge");function aa(){var e=A.document;return e?e.documentMode:void 0}var ss;t:{var Js="",Zs=function(){var e=Es();if(oa)return/rv:([^\);]+)(\)|;)/.exec(e);if(ia)return/Edge\/([\d\.]+)/.exec(e);if(xe)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(e);if(ol)return/WebKit\/(\S+)/.exec(e);if(il)return/(?:Version)[ \/]?(\S+)/.exec(e)}();if(Zs&&(Js=Zs?Zs[1]:""),xe){var tr=aa();if(tr!=null&&tr>parseFloat(Js)){ss=String(tr);break t}}ss=Js}var al={};function cl(){return ra(al,9,function(){let e=0;const t=Gi(String(ss)).split("."),n=Gi("9").split("."),s=Math.max(t.length,n.length);for(let o=0;e==0&&o<s;o++){var r=t[o]||"",i=n[o]||"";do{if(r=/(\d*)(\D*)(.*)/.exec(r)||["","","",""],i=/(\d*)(\D*)(.*)/.exec(i)||["","","",""],r[0].length==0&&i[0].length==0)break;e=Xs(r[1].length==0?0:parseInt(r[1],10),i[1].length==0?0:parseInt(i[1],10))||Xs(r[2].length==0,i[2].length==0)||Xs(r[2],i[2]),r=r[3],i=i[3]}while(e==0)}return 0<=e})}var mr;if(A.document&&xe){var Qi=aa();mr=Qi||parseInt(ss,10)||void 0}else mr=void 0;var ul=mr;function dn(e,t){if(vt.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var n=this.type=e.type,s=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if(oa){t:{try{qr(t.nodeName);var r=!0;break t}catch{}r=!1}r||(t=null)}}else n=="mouseover"?t=e.fromElement:n=="mouseout"&&(t=e.toElement);this.relatedTarget=t,s?(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0):(this.clientX=e.clientX!==void 0?e.clientX:e.pageX,this.clientY=e.clientY!==void 0?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType=typeof e.pointerType=="string"?e.pointerType:hl[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&dn.$.h.call(this)}}at(dn,vt);var hl={2:"touch",3:"pen",4:"mouse"};dn.prototype.h=function(){dn.$.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var Cn="closure_listenable_"+(1e6*Math.random()|0),ll=0;function dl(e,t,n,s,r){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!s,this.la=r,this.key=++ll,this.fa=this.ia=!1}function Ts(e){e.fa=!0,e.listener=null,e.proxy=null,e.src=null,e.la=null}function zr(e,t,n){for(const s in e)t.call(n,e[s],s,e)}function ca(e){const t={};for(const n in e)t[n]=e[n];return t}const Wi="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function ua(e,t){let n,s;for(let r=1;r<arguments.length;r++){s=arguments[r];for(n in s)e[n]=s[n];for(let i=0;i<Wi.length;i++)n=Wi[i],Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n])}}function Is(e){this.src=e,this.g={},this.h=0}Is.prototype.add=function(e,t,n,s,r){var i=e.toString();e=this.g[i],e||(e=this.g[i]=[],this.h++);var o=vr(e,t,s,r);return-1<o?(t=e[o],n||(t.ia=!1)):(t=new dl(t,this.src,i,!!s,r),t.ia=n,e.push(t)),t};function yr(e,t){var n=t.type;if(n in e.g){var s=e.g[n],r=sa(s,t),i;(i=0<=r)&&Array.prototype.splice.call(s,r,1),i&&(Ts(t),e.g[n].length==0&&(delete e.g[n],e.h--))}}function vr(e,t,n,s){for(var r=0;r<e.length;++r){var i=e[r];if(!i.fa&&i.listener==t&&i.capture==!!n&&i.la==s)return r}return-1}var Hr="closure_lm_"+(1e6*Math.random()|0),er={};function ha(e,t,n,s,r){if(s&&s.once)return da(e,t,n,s,r);if(Array.isArray(t)){for(var i=0;i<t.length;i++)ha(e,t[i],n,s,r);return null}return n=Qr(n),e&&e[Cn]?e.O(t,n,Sn(s)?!!s.capture:!!s,r):la(e,t,n,!1,s,r)}function la(e,t,n,s,r,i){if(!t)throw Error("Invalid event type");var o=Sn(r)?!!r.capture:!!r,a=Gr(e);if(a||(e[Hr]=a=new Is(e)),n=a.add(t,n,s,o,i),n.proxy)return n;if(s=fl(),n.proxy=s,s.src=e,s.listener=n,e.addEventListener)rl||(r=o),r===void 0&&(r=!1),e.addEventListener(t.toString(),s,r);else if(e.attachEvent)e.attachEvent(ga(t.toString()),s);else if(e.addListener&&e.removeListener)e.addListener(s);else throw Error("addEventListener and attachEvent are unavailable.");return n}function fl(){function e(n){return t.call(e.src,e.listener,n)}const t=gl;return e}function da(e,t,n,s,r){if(Array.isArray(t)){for(var i=0;i<t.length;i++)da(e,t[i],n,s,r);return null}return n=Qr(n),e&&e[Cn]?e.P(t,n,Sn(s)?!!s.capture:!!s,r):la(e,t,n,!0,s,r)}function fa(e,t,n,s,r){if(Array.isArray(t))for(var i=0;i<t.length;i++)fa(e,t[i],n,s,r);else s=Sn(s)?!!s.capture:!!s,n=Qr(n),e&&e[Cn]?(e=e.i,t=String(t).toString(),t in e.g&&(i=e.g[t],n=vr(i,n,s,r),-1<n&&(Ts(i[n]),Array.prototype.splice.call(i,n,1),i.length==0&&(delete e.g[t],e.h--)))):e&&(e=Gr(e))&&(t=e.g[t.toString()],e=-1,t&&(e=vr(t,n,s,r)),(n=-1<e?t[e]:null)&&Kr(n))}function Kr(e){if(typeof e!="number"&&e&&!e.fa){var t=e.src;if(t&&t[Cn])yr(t.i,e);else{var n=e.type,s=e.proxy;t.removeEventListener?t.removeEventListener(n,s,e.capture):t.detachEvent?t.detachEvent(ga(n),s):t.addListener&&t.removeListener&&t.removeListener(s),(n=Gr(t))?(yr(n,e),n.h==0&&(n.src=null,t[Hr]=null)):Ts(e)}}}function ga(e){return e in er?er[e]:er[e]="on"+e}function gl(e,t){if(e.fa)e=!0;else{t=new dn(t,this);var n=e.listener,s=e.la||e.src;e.ia&&Kr(e),e=n.call(s,t)}return e}function Gr(e){return e=e[Hr],e instanceof Is?e:null}var nr="__closure_events_fn_"+(1e9*Math.random()>>>0);function Qr(e){return typeof e=="function"?e:(e[nr]||(e[nr]=function(t){return e.handleEvent(t)}),e[nr])}function ot(){ne.call(this),this.i=new Is(this),this.S=this,this.J=null}at(ot,ne);ot.prototype[Cn]=!0;ot.prototype.removeEventListener=function(e,t,n,s){fa(this,e,t,n,s)};function dt(e,t){var n,s=e.J;if(s)for(n=[];s;s=s.J)n.push(s);if(e=e.S,s=t.type||t,typeof t=="string")t=new vt(t,e);else if(t instanceof vt)t.target=t.target||e;else{var r=t;t=new vt(s,e),ua(t,r)}if(r=!0,n)for(var i=n.length-1;0<=i;i--){var o=t.g=n[i];r=Un(o,s,!0,t)&&r}if(o=t.g=e,r=Un(o,s,!0,t)&&r,r=Un(o,s,!1,t)&&r,n)for(i=0;i<n.length;i++)o=t.g=n[i],r=Un(o,s,!1,t)&&r}ot.prototype.N=function(){if(ot.$.N.call(this),this.i){var e=this.i,t;for(t in e.g){for(var n=e.g[t],s=0;s<n.length;s++)Ts(n[s]);delete e.g[t],e.h--}}this.J=null};ot.prototype.O=function(e,t,n,s){return this.i.add(String(e),t,!1,n,s)};ot.prototype.P=function(e,t,n,s){return this.i.add(String(e),t,!0,n,s)};function Un(e,t,n,s){if(t=e.i.g[String(t)],!t)return!0;t=t.concat();for(var r=!0,i=0;i<t.length;++i){var o=t[i];if(o&&!o.fa&&o.capture==n){var a=o.listener,c=o.la||o.src;o.ia&&yr(e.i,o),r=a.call(c,s)!==!1&&r}}return r&&!s.defaultPrevented}var Wr=A.JSON.stringify;function pl(){var e=ya;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}class ml{constructor(){this.h=this.g=null}add(t,n){const s=pa.get();s.set(t,n),this.h?this.h.next=s:this.g=s,this.h=s}}var pa=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new yl,e=>e.reset());class yl{constructor(){this.next=this.g=this.h=null}set(t,n){this.h=t,this.g=n,this.next=null}reset(){this.next=this.g=this.h=null}}function vl(e){A.setTimeout(()=>{throw e},0)}function ma(e,t){wr||wl(),Er||(wr(),Er=!0),ya.add(e,t)}var wr;function wl(){var e=A.Promise.resolve(void 0);wr=function(){e.then(El)}}var Er=!1,ya=new ml;function El(){for(var e;e=pl();){try{e.h.call(e.g)}catch(n){vl(n)}var t=pa;t.j(e),100>t.h&&(t.h++,e.next=t.g,t.g=e)}Er=!1}function Ss(e,t){ot.call(this),this.h=e||1,this.g=t||A,this.j=yt(this.qb,this),this.l=Date.now()}at(Ss,ot);y=Ss.prototype;y.ga=!1;y.T=null;y.qb=function(){if(this.ga){var e=Date.now()-this.l;0<e&&e<.8*this.h?this.T=this.g.setTimeout(this.j,this.h-e):(this.T&&(this.g.clearTimeout(this.T),this.T=null),dt(this,"tick"),this.ga&&(Yr(this),this.start()))}};y.start=function(){this.ga=!0,this.T||(this.T=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function Yr(e){e.ga=!1,e.T&&(e.g.clearTimeout(e.T),e.T=null)}y.N=function(){Ss.$.N.call(this),Yr(this),delete this.g};function Xr(e,t,n){if(typeof e=="function")n&&(e=yt(e,n));else if(e&&typeof e.handleEvent=="function")e=yt(e.handleEvent,e);else throw Error("Invalid listener argument");return 2147483647<Number(t)?-1:A.setTimeout(e,t||0)}function va(e){e.g=Xr(()=>{e.g=null,e.i&&(e.i=!1,va(e))},e.j);const t=e.h;e.h=null,e.m.apply(null,t)}class Tl extends ne{constructor(t,n){super(),this.m=t,this.j=n,this.h=null,this.i=!1,this.g=null}l(t){this.h=arguments,this.g?this.i=!0:va(this)}N(){super.N(),this.g&&(A.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function fn(e){ne.call(this),this.h=e,this.g={}}at(fn,ne);var Yi=[];function wa(e,t,n,s){Array.isArray(n)||(n&&(Yi[0]=n.toString()),n=Yi);for(var r=0;r<n.length;r++){var i=ha(t,n[r],s||e.handleEvent,!1,e.h||e);if(!i)break;e.g[i.key]=i}}function Ea(e){zr(e.g,function(t,n){this.g.hasOwnProperty(n)&&Kr(t)},e),e.g={}}fn.prototype.N=function(){fn.$.N.call(this),Ea(this)};fn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function Cs(){this.g=!0}Cs.prototype.Ea=function(){this.g=!1};function Il(e,t,n,s,r,i){e.info(function(){if(e.g)if(i)for(var o="",a=i.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var h=u[0];u=u[1];var l=h.split("_");o=2<=l.length&&l[1]=="type"?o+(h+"="+u+"&"):o+(h+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+s+") [attempt "+r+"]: "+t+`
`+n+`
`+o})}function Sl(e,t,n,s,r,i,o){e.info(function(){return"XMLHTTP RESP ("+s+") [ attempt "+r+"]: "+t+`
`+n+`
`+i+" "+o})}function Ae(e,t,n,s){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+Al(e,n)+(s?" "+s:"")})}function Cl(e,t){e.info(function(){return"TIMEOUT: "+t})}Cs.prototype.info=function(){};function Al(e,t){if(!e.g)return t;if(!t)return null;try{var n=JSON.parse(t);if(n){for(e=0;e<n.length;e++)if(Array.isArray(n[e])){var s=n[e];if(!(2>s.length)){var r=s[1];if(Array.isArray(r)&&!(1>r.length)){var i=r[0];if(i!="noop"&&i!="stop"&&i!="close")for(var o=1;o<r.length;o++)r[o]=""}}}}return Wr(n)}catch{return t}}var me={},Xi=null;function As(){return Xi=Xi||new ot}me.Ta="serverreachability";function Ta(e){vt.call(this,me.Ta,e)}at(Ta,vt);function gn(e){const t=As();dt(t,new Ta(t))}me.STAT_EVENT="statevent";function Ia(e,t){vt.call(this,me.STAT_EVENT,e),this.stat=t}at(Ia,vt);function Tt(e){const t=As();dt(t,new Ia(t,e))}me.Ua="timingevent";function Sa(e,t){vt.call(this,me.Ua,e),this.size=t}at(Sa,vt);function An(e,t){if(typeof e!="function")throw Error("Fn must not be null and must be a function");return A.setTimeout(function(){e()},t)}var Ds={NO_ERROR:0,rb:1,Eb:2,Db:3,yb:4,Cb:5,Fb:6,Qa:7,TIMEOUT:8,Ib:9},Ca={wb:"complete",Sb:"success",Ra:"error",Qa:"abort",Kb:"ready",Lb:"readystatechange",TIMEOUT:"timeout",Gb:"incrementaldata",Jb:"progress",zb:"downloadprogress",$b:"uploadprogress"};function Jr(){}Jr.prototype.h=null;function Ji(e){return e.h||(e.h=e.i())}function Aa(){}var Dn={OPEN:"a",vb:"b",Ra:"c",Hb:"d"};function Zr(){vt.call(this,"d")}at(Zr,vt);function ti(){vt.call(this,"c")}at(ti,vt);var Tr;function _s(){}at(_s,Jr);_s.prototype.g=function(){return new XMLHttpRequest};_s.prototype.i=function(){return{}};Tr=new _s;function _n(e,t,n,s){this.l=e,this.j=t,this.m=n,this.W=s||1,this.U=new fn(this),this.P=Dl,e=pr?125:void 0,this.V=new Ss(e),this.I=null,this.i=!1,this.s=this.A=this.v=this.L=this.G=this.Y=this.B=null,this.F=[],this.g=null,this.C=0,this.o=this.u=null,this.aa=-1,this.J=!1,this.O=0,this.M=null,this.ca=this.K=this.ba=this.S=!1,this.h=new Da}function Da(){this.i=null,this.g="",this.h=!1}var Dl=45e3,Ir={},rs={};y=_n.prototype;y.setTimeout=function(e){this.P=e};function Sr(e,t,n){e.L=1,e.v=ks(zt(t)),e.s=n,e.S=!0,_a(e,null)}function _a(e,t){e.G=Date.now(),bn(e),e.A=zt(e.v);var n=e.A,s=e.W;Array.isArray(s)||(s=[String(s)]),La(n.i,"t",s),e.C=0,n=e.l.I,e.h=new Da,e.g=nc(e.l,n?t:null,!e.s),0<e.O&&(e.M=new Tl(yt(e.Pa,e,e.g),e.O)),wa(e.U,e.g,"readystatechange",e.nb),t=e.I?ca(e.I):{},e.s?(e.u||(e.u="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ha(e.A,e.u,e.s,t)):(e.u="GET",e.g.ha(e.A,e.u,null,t)),gn(),Il(e.j,e.u,e.A,e.m,e.W,e.s)}y.nb=function(e){e=e.target;const t=this.M;t&&$t(e)==3?t.l():this.Pa(e)};y.Pa=function(e){try{if(e==this.g)t:{const h=$t(this.g);var t=this.g.Ia();const l=this.g.da();if(!(3>h)&&(h!=3||pr||this.g&&(this.h.h||this.g.ja()||no(this.g)))){this.J||h!=4||t==7||(t==8||0>=l?gn(3):gn(2)),bs(this);var n=this.g.da();this.aa=n;e:if(ba(this)){var s=no(this.g);e="";var r=s.length,i=$t(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){ae(this),rn(this);var o="";break e}this.h.i=new A.TextDecoder}for(t=0;t<r;t++)this.h.h=!0,e+=this.h.i.decode(s[t],{stream:i&&t==r-1});s.splice(0,r),this.h.g+=e,this.C=0,o=this.h.g}else o=this.g.ja();if(this.i=n==200,Sl(this.j,this.u,this.A,this.m,this.W,h,n),this.i){if(this.ba&&!this.K){e:{if(this.g){var a,c=this.g;if((a=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!ns(a)){var u=a;break e}}u=null}if(n=u)Ae(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Cr(this,n);else{this.i=!1,this.o=3,Tt(12),ae(this),rn(this);break t}}this.S?(ka(this,h,o),pr&&this.i&&h==3&&(wa(this.U,this.V,"tick",this.mb),this.V.start())):(Ae(this.j,this.m,o,null),Cr(this,o)),h==4&&ae(this),this.i&&!this.J&&(h==4?Ja(this.l,this):(this.i=!1,bn(this)))}else n==400&&0<o.indexOf("Unknown SID")?(this.o=3,Tt(12)):(this.o=0,Tt(13)),ae(this),rn(this)}}}catch{}finally{}};function ba(e){return e.g?e.u=="GET"&&e.L!=2&&e.l.Ha:!1}function ka(e,t,n){let s=!0,r;for(;!e.J&&e.C<n.length;)if(r=_l(e,n),r==rs){t==4&&(e.o=4,Tt(14),s=!1),Ae(e.j,e.m,null,"[Incomplete Response]");break}else if(r==Ir){e.o=4,Tt(15),Ae(e.j,e.m,n,"[Invalid Chunk]"),s=!1;break}else Ae(e.j,e.m,r,null),Cr(e,r);ba(e)&&r!=rs&&r!=Ir&&(e.h.g="",e.C=0),t!=4||n.length!=0||e.h.h||(e.o=1,Tt(16),s=!1),e.i=e.i&&s,s?0<n.length&&!e.ca&&(e.ca=!0,t=e.l,t.g==e&&t.ca&&!t.L&&(t.j.info("Great, no buffering proxy detected. Bytes received: "+n.length),ai(t),t.L=!0,Tt(11))):(Ae(e.j,e.m,n,"[Invalid Chunked Response]"),ae(e),rn(e))}y.mb=function(){if(this.g){var e=$t(this.g),t=this.g.ja();this.C<t.length&&(bs(this),ka(this,e,t),this.i&&e!=4&&bn(this))}};function _l(e,t){var n=e.C,s=t.indexOf(`
`,n);return s==-1?rs:(n=Number(t.substring(n,s)),isNaN(n)?Ir:(s+=1,s+n>t.length?rs:(t=t.substr(s,n),e.C=s+n,t)))}y.cancel=function(){this.J=!0,ae(this)};function bn(e){e.Y=Date.now()+e.P,Na(e,e.P)}function Na(e,t){if(e.B!=null)throw Error("WatchDog timer not null");e.B=An(yt(e.lb,e),t)}function bs(e){e.B&&(A.clearTimeout(e.B),e.B=null)}y.lb=function(){this.B=null;const e=Date.now();0<=e-this.Y?(Cl(this.j,this.A),this.L!=2&&(gn(),Tt(17)),ae(this),this.o=2,rn(this)):Na(this,this.Y-e)};function rn(e){e.l.H==0||e.J||Ja(e.l,e)}function ae(e){bs(e);var t=e.M;t&&typeof t.ra=="function"&&t.ra(),e.M=null,Yr(e.V),Ea(e.U),e.g&&(t=e.g,e.g=null,t.abort(),t.ra())}function Cr(e,t){try{var n=e.l;if(n.H!=0&&(n.g==e||Ar(n.h,e))){if(!e.K&&Ar(n.h,e)&&n.H==3){try{var s=n.Ja.g.parse(t)}catch{s=null}if(Array.isArray(s)&&s.length==3){var r=s;if(r[0]==0){t:if(!n.u){if(n.g)if(n.g.G+3e3<e.G)as(n),xs(n);else break t;oi(n),Tt(18)}}else n.Fa=r[1],0<n.Fa-n.V&&37500>r[2]&&n.M&&n.A==0&&!n.v&&(n.v=An(yt(n.ib,n),6e3));if(1>=Va(n.h)&&n.na){try{n.na()}catch{}n.na=void 0}}else ce(n,11)}else if((e.K||n.g==e)&&as(n),!ns(t))for(r=n.Ja.g.parse(t),t=0;t<r.length;t++){let u=r[t];if(n.V=u[0],u=u[1],n.H==2)if(u[0]=="c"){n.J=u[1],n.oa=u[2];const h=u[3];h!=null&&(n.qa=h,n.j.info("VER="+n.qa));const l=u[4];l!=null&&(n.Ga=l,n.j.info("SVER="+n.Ga));const f=u[5];f!=null&&typeof f=="number"&&0<f&&(s=1.5*f,n.K=s,n.j.info("backChannelRequestTimeoutMs_="+s)),s=n;const d=e.g;if(d){const m=d.g?d.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(m){var i=s.h;i.g||m.indexOf("spdy")==-1&&m.indexOf("quic")==-1&&m.indexOf("h2")==-1||(i.j=i.l,i.g=new Set,i.h&&(ei(i,i.h),i.h=null))}if(s.F){const v=d.g?d.g.getResponseHeader("X-HTTP-Session-Id"):null;v&&(s.Da=v,G(s.G,s.F,v))}}n.H=3,n.l&&n.l.Ba(),n.ca&&(n.S=Date.now()-e.G,n.j.info("Handshake RTT: "+n.S+"ms")),s=n;var o=e;if(s.wa=ec(s,s.I?s.oa:null,s.Y),o.K){Ua(s.h,o);var a=o,c=s.K;c&&a.setTimeout(c),a.B&&(bs(a),bn(a)),s.g=o}else Ya(s);0<n.i.length&&Ms(n)}else u[0]!="stop"&&u[0]!="close"||ce(n,7);else n.H==3&&(u[0]=="stop"||u[0]=="close"?u[0]=="stop"?ce(n,7):ii(n):u[0]!="noop"&&n.l&&n.l.Aa(u),n.A=0)}}gn(4)}catch{}}function bl(e){if(e.Z&&typeof e.Z=="function")return e.Z();if(typeof Map<"u"&&e instanceof Map||typeof Set<"u"&&e instanceof Set)return Array.from(e.values());if(typeof e=="string")return e.split("");if(ws(e)){for(var t=[],n=e.length,s=0;s<n;s++)t.push(e[s]);return t}t=[],n=0;for(s in e)t[n++]=e[s];return t}function kl(e){if(e.sa&&typeof e.sa=="function")return e.sa();if(!e.Z||typeof e.Z!="function"){if(typeof Map<"u"&&e instanceof Map)return Array.from(e.keys());if(!(typeof Set<"u"&&e instanceof Set)){if(ws(e)||typeof e=="string"){var t=[];e=e.length;for(var n=0;n<e;n++)t.push(n);return t}t=[],n=0;for(const s in e)t[n++]=s;return t}}}function Ra(e,t){if(e.forEach&&typeof e.forEach=="function")e.forEach(t,void 0);else if(ws(e)||typeof e=="string")Array.prototype.forEach.call(e,t,void 0);else for(var n=kl(e),s=bl(e),r=s.length,i=0;i<r;i++)t.call(void 0,s[i],n&&n[i],e)}var xa=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Nl(e,t){if(e){e=e.split("&");for(var n=0;n<e.length;n++){var s=e[n].indexOf("="),r=null;if(0<=s){var i=e[n].substring(0,s);r=e[n].substring(s+1)}else i=e[n];t(i,r?decodeURIComponent(r.replace(/\+/g," ")):"")}}}function he(e,t){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,e instanceof he){this.h=t!==void 0?t:e.h,is(this,e.j),this.s=e.s,this.g=e.g,os(this,e.m),this.l=e.l,t=e.i;var n=new pn;n.i=t.i,t.g&&(n.g=new Map(t.g),n.h=t.h),Zi(this,n),this.o=e.o}else e&&(n=String(e).match(xa))?(this.h=!!t,is(this,n[1]||"",!0),this.s=Je(n[2]||""),this.g=Je(n[3]||"",!0),os(this,n[4]),this.l=Je(n[5]||"",!0),Zi(this,n[6]||"",!0),this.o=Je(n[7]||"")):(this.h=!!t,this.i=new pn(null,this.h))}he.prototype.toString=function(){var e=[],t=this.j;t&&e.push(Ze(t,to,!0),":");var n=this.g;return(n||t=="file")&&(e.push("//"),(t=this.s)&&e.push(Ze(t,to,!0),"@"),e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n=this.m,n!=null&&e.push(":",String(n))),(n=this.l)&&(this.g&&n.charAt(0)!="/"&&e.push("/"),e.push(Ze(n,n.charAt(0)=="/"?Ml:xl,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.o)&&e.push("#",Ze(n,Ll)),e.join("")};function zt(e){return new he(e)}function is(e,t,n){e.j=n?Je(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function os(e,t){if(t){if(t=Number(t),isNaN(t)||0>t)throw Error("Bad port number "+t);e.m=t}else e.m=null}function Zi(e,t,n){t instanceof pn?(e.i=t,Pl(e.i,e.h)):(n||(t=Ze(t,Ol)),e.i=new pn(t,e.h))}function G(e,t,n){e.i.set(t,n)}function ks(e){return G(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function Je(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function Ze(e,t,n){return typeof e=="string"?(e=encodeURI(e).replace(t,Rl),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function Rl(e){return e=e.charCodeAt(0),"%"+(e>>4&15).toString(16)+(e&15).toString(16)}var to=/[#\/\?@]/g,xl=/[#\?:]/g,Ml=/[#\?]/g,Ol=/[#\?@]/g,Ll=/#/g;function pn(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function se(e){e.g||(e.g=new Map,e.h=0,e.i&&Nl(e.i,function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)}))}y=pn.prototype;y.add=function(e,t){se(this),this.i=null,e=$e(this,e);var n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this};function Ma(e,t){se(e),t=$e(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function Oa(e,t){return se(e),t=$e(e,t),e.g.has(t)}y.forEach=function(e,t){se(this),this.g.forEach(function(n,s){n.forEach(function(r){e.call(t,r,s,this)},this)},this)};y.sa=function(){se(this);const e=Array.from(this.g.values()),t=Array.from(this.g.keys()),n=[];for(let s=0;s<t.length;s++){const r=e[s];for(let i=0;i<r.length;i++)n.push(t[s])}return n};y.Z=function(e){se(this);let t=[];if(typeof e=="string")Oa(this,e)&&(t=t.concat(this.g.get($e(this,e))));else{e=Array.from(this.g.values());for(let n=0;n<e.length;n++)t=t.concat(e[n])}return t};y.set=function(e,t){return se(this),this.i=null,e=$e(this,e),Oa(this,e)&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this};y.get=function(e,t){return e?(e=this.Z(e),0<e.length?String(e[0]):t):t};function La(e,t,n){Ma(e,t),0<n.length&&(e.i=null,e.g.set($e(e,t),jr(n)),e.h+=n.length)}y.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],t=Array.from(this.g.keys());for(var n=0;n<t.length;n++){var s=t[n];const i=encodeURIComponent(String(s)),o=this.Z(s);for(s=0;s<o.length;s++){var r=i;o[s]!==""&&(r+="="+encodeURIComponent(String(o[s]))),e.push(r)}}return this.i=e.join("&")};function $e(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function Pl(e,t){t&&!e.j&&(se(e),e.i=null,e.g.forEach(function(n,s){var r=s.toLowerCase();s!=r&&(Ma(this,s),La(this,r,n))},e)),e.j=t}var Fl=class{constructor(e,t){this.h=e,this.g=t}};function Pa(e){this.l=e||Vl,A.PerformanceNavigationTiming?(e=A.performance.getEntriesByType("navigation"),e=0<e.length&&(e[0].nextHopProtocol=="hq"||e[0].nextHopProtocol=="h2")):e=!!(A.g&&A.g.Ka&&A.g.Ka()&&A.g.Ka().ec),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var Vl=10;function Fa(e){return e.h?!0:e.g?e.g.size>=e.j:!1}function Va(e){return e.h?1:e.g?e.g.size:0}function Ar(e,t){return e.h?e.h==t:e.g?e.g.has(t):!1}function ei(e,t){e.g?e.g.add(t):e.h=t}function Ua(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}Pa.prototype.cancel=function(){if(this.i=Ba(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const e of this.g.values())e.cancel();this.g.clear()}};function Ba(e){if(e.h!=null)return e.i.concat(e.h.F);if(e.g!=null&&e.g.size!==0){let t=e.i;for(const n of e.g.values())t=t.concat(n.F);return t}return jr(e.i)}function ni(){}ni.prototype.stringify=function(e){return A.JSON.stringify(e,void 0)};ni.prototype.parse=function(e){return A.JSON.parse(e,void 0)};function Ul(){this.g=new ni}function Bl(e,t,n){const s=n||"";try{Ra(e,function(r,i){let o=r;Sn(r)&&(o=Wr(r)),t.push(s+i+"="+encodeURIComponent(o))})}catch(r){throw t.push(s+"type="+encodeURIComponent("_badmap")),r}}function $l(e,t){const n=new Cs;if(A.Image){const s=new Image;s.onload=Vn(Bn,n,s,"TestLoadImage: loaded",!0,t),s.onerror=Vn(Bn,n,s,"TestLoadImage: error",!1,t),s.onabort=Vn(Bn,n,s,"TestLoadImage: abort",!1,t),s.ontimeout=Vn(Bn,n,s,"TestLoadImage: timeout",!1,t),A.setTimeout(function(){s.ontimeout&&s.ontimeout()},1e4),s.src=e}else t(!1)}function Bn(e,t,n,s,r){try{t.onload=null,t.onerror=null,t.onabort=null,t.ontimeout=null,r(s)}catch{}}function kn(e){this.l=e.fc||null,this.j=e.ob||!1}at(kn,Jr);kn.prototype.g=function(){return new Ns(this.l,this.j)};kn.prototype.i=function(e){return function(){return e}}({});function Ns(e,t){ot.call(this),this.F=e,this.u=t,this.m=void 0,this.readyState=si,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}at(Ns,ot);var si=0;y=Ns.prototype;y.open=function(e,t){if(this.readyState!=si)throw this.abort(),Error("Error reopening a connection");this.C=e,this.B=t,this.readyState=1,mn(this)};y.send=function(e){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const t={headers:this.v,method:this.C,credentials:this.m,cache:void 0};e&&(t.body=e),(this.F||A).fetch(new Request(this.B,t)).then(this.$a.bind(this),this.ka.bind(this))};y.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Nn(this)),this.readyState=si};y.$a=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,mn(this)),this.g&&(this.readyState=3,mn(this),this.g)))if(this.responseType==="arraybuffer")e.arrayBuffer().then(this.Ya.bind(this),this.ka.bind(this));else if(typeof A.ReadableStream<"u"&&"body"in e){if(this.j=e.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;$a(this)}else e.text().then(this.Za.bind(this),this.ka.bind(this))};function $a(e){e.j.read().then(e.Xa.bind(e)).catch(e.ka.bind(e))}y.Xa=function(e){if(this.g){if(this.u&&e.value)this.response.push(e.value);else if(!this.u){var t=e.value?e.value:new Uint8Array(0);(t=this.A.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?Nn(this):mn(this),this.readyState==3&&$a(this)}};y.Za=function(e){this.g&&(this.response=this.responseText=e,Nn(this))};y.Ya=function(e){this.g&&(this.response=e,Nn(this))};y.ka=function(){this.g&&Nn(this)};function Nn(e){e.readyState=4,e.l=null,e.j=null,e.A=null,mn(e)}y.setRequestHeader=function(e,t){this.v.append(e,t)};y.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""};y.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join(`\r
`)};function mn(e){e.onreadystatechange&&e.onreadystatechange.call(e)}Object.defineProperty(Ns.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(e){this.m=e?"include":"same-origin"}});var jl=A.JSON.parse;function Y(e){ot.call(this),this.headers=new Map,this.u=e||null,this.h=!1,this.C=this.g=null,this.I="",this.m=0,this.j="",this.l=this.G=this.v=this.F=!1,this.B=0,this.A=null,this.K=ja,this.L=this.M=!1}at(Y,ot);var ja="",ql=/^https?$/i,zl=["POST","PUT"];y=Y.prototype;y.Oa=function(e){this.M=e};y.ha=function(e,t,n,s){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.I+"; newUri="+e);t=t?t.toUpperCase():"GET",this.I=e,this.j="",this.m=0,this.F=!1,this.h=!0,this.g=this.u?this.u.g():Tr.g(),this.C=this.u?Ji(this.u):Ji(Tr),this.g.onreadystatechange=yt(this.La,this);try{this.G=!0,this.g.open(t,String(e),!0),this.G=!1}catch(i){eo(this,i);return}if(e=n||"",n=new Map(this.headers),s)if(Object.getPrototypeOf(s)===Object.prototype)for(var r in s)n.set(r,s[r]);else if(typeof s.keys=="function"&&typeof s.get=="function")for(const i of s.keys())n.set(i,s.get(i));else throw Error("Unknown input type for opt_headers: "+String(s));s=Array.from(n.keys()).find(i=>i.toLowerCase()=="content-type"),r=A.FormData&&e instanceof A.FormData,!(0<=sa(zl,t))||s||r||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[i,o]of n)this.g.setRequestHeader(i,o);this.K&&(this.g.responseType=this.K),"withCredentials"in this.g&&this.g.withCredentials!==this.M&&(this.g.withCredentials=this.M);try{Ha(this),0<this.B&&((this.L=Hl(this.g))?(this.g.timeout=this.B,this.g.ontimeout=yt(this.ua,this)):this.A=Xr(this.ua,this.B,this)),this.v=!0,this.g.send(e),this.v=!1}catch(i){eo(this,i)}};function Hl(e){return xe&&cl()&&typeof e.timeout=="number"&&e.ontimeout!==void 0}y.ua=function(){typeof $r<"u"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,dt(this,"timeout"),this.abort(8))};function eo(e,t){e.h=!1,e.g&&(e.l=!0,e.g.abort(),e.l=!1),e.j=t,e.m=5,qa(e),Rs(e)}function qa(e){e.F||(e.F=!0,dt(e,"complete"),dt(e,"error"))}y.abort=function(e){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=e||7,dt(this,"complete"),dt(this,"abort"),Rs(this))};y.N=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),Rs(this,!0)),Y.$.N.call(this)};y.La=function(){this.s||(this.G||this.v||this.l?za(this):this.kb())};y.kb=function(){za(this)};function za(e){if(e.h&&typeof $r<"u"&&(!e.C[1]||$t(e)!=4||e.da()!=2)){if(e.v&&$t(e)==4)Xr(e.La,0,e);else if(dt(e,"readystatechange"),$t(e)==4){e.h=!1;try{const a=e.da();t:switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break t;default:t=!1}var n;if(!(n=t)){var s;if(s=a===0){var r=String(e.I).match(xa)[1]||null;if(!r&&A.self&&A.self.location){var i=A.self.location.protocol;r=i.substr(0,i.length-1)}s=!ql.test(r?r.toLowerCase():"")}n=s}if(n)dt(e,"complete"),dt(e,"success");else{e.m=6;try{var o=2<$t(e)?e.g.statusText:""}catch{o=""}e.j=o+" ["+e.da()+"]",qa(e)}}finally{Rs(e)}}}}function Rs(e,t){if(e.g){Ha(e);const n=e.g,s=e.C[0]?es:null;e.g=null,e.C=null,t||dt(e,"ready");try{n.onreadystatechange=s}catch{}}}function Ha(e){e.g&&e.L&&(e.g.ontimeout=null),e.A&&(A.clearTimeout(e.A),e.A=null)}function $t(e){return e.g?e.g.readyState:0}y.da=function(){try{return 2<$t(this)?this.g.status:-1}catch{return-1}};y.ja=function(){try{return this.g?this.g.responseText:""}catch{return""}};y.Wa=function(e){if(this.g){var t=this.g.responseText;return e&&t.indexOf(e)==0&&(t=t.substring(e.length)),jl(t)}};function no(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.K){case ja:case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch{return null}}y.Ia=function(){return this.m};y.Sa=function(){return typeof this.j=="string"?this.j:String(this.j)};function Ka(e){let t="";return zr(e,function(n,s){t+=s,t+=":",t+=n,t+=`\r
`}),t}function ri(e,t,n){t:{for(s in n){var s=!1;break t}s=!0}s||(n=Ka(n),typeof e=="string"?n!=null&&encodeURIComponent(String(n)):G(e,t,n))}function Ye(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function Ga(e){this.Ga=0,this.i=[],this.j=new Cs,this.oa=this.wa=this.G=this.Y=this.g=this.Da=this.F=this.ma=this.o=this.U=this.s=null,this.fb=this.W=0,this.cb=Ye("failFast",!1,e),this.M=this.v=this.u=this.m=this.l=null,this.aa=!0,this.ta=this.Fa=this.V=-1,this.ba=this.A=this.C=0,this.ab=Ye("baseRetryDelayMs",5e3,e),this.hb=Ye("retryDelaySeedMs",1e4,e),this.eb=Ye("forwardChannelMaxRetries",2,e),this.xa=Ye("forwardChannelRequestTimeoutMs",2e4,e),this.va=e&&e.xmlHttpFactory||void 0,this.Ha=e&&e.dc||!1,this.K=void 0,this.I=e&&e.supportsCrossDomainXhr||!1,this.J="",this.h=new Pa(e&&e.concurrentRequestLimit),this.Ja=new Ul,this.P=e&&e.fastHandshake||!1,this.O=e&&e.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.bb=e&&e.bc||!1,e&&e.Ea&&this.j.Ea(),e&&e.forceLongPolling&&(this.aa=!1),this.ca=!this.P&&this.aa&&e&&e.detectBufferingProxy||!1,this.na=void 0,this.S=0,this.L=!1,this.pa=this.B=null}y=Ga.prototype;y.qa=8;y.H=1;function ii(e){if(Qa(e),e.H==3){var t=e.W++,n=zt(e.G);G(n,"SID",e.J),G(n,"RID",t),G(n,"TYPE","terminate"),Rn(e,n),t=new _n(e,e.j,t,void 0),t.L=2,t.v=ks(zt(n)),n=!1,A.navigator&&A.navigator.sendBeacon&&(n=A.navigator.sendBeacon(t.v.toString(),"")),!n&&A.Image&&(new Image().src=t.v,n=!0),n||(t.g=nc(t.l,null),t.g.ha(t.v)),t.G=Date.now(),bn(t)}tc(e)}function xs(e){e.g&&(ai(e),e.g.cancel(),e.g=null)}function Qa(e){xs(e),e.u&&(A.clearTimeout(e.u),e.u=null),as(e),e.h.cancel(),e.m&&(typeof e.m=="number"&&A.clearTimeout(e.m),e.m=null)}function Ms(e){Fa(e.h)||e.m||(e.m=!0,ma(e.Na,e),e.C=0)}function Kl(e,t){return Va(e.h)>=e.h.j-(e.m?1:0)?!1:e.m?(e.i=t.F.concat(e.i),!0):e.H==1||e.H==2||e.C>=(e.cb?0:e.eb)?!1:(e.m=An(yt(e.Na,e,t),Za(e,e.C)),e.C++,!0)}y.Na=function(e){if(this.m)if(this.m=null,this.H==1){if(!e){this.W=Math.floor(1e5*Math.random()),e=this.W++;const r=new _n(this,this.j,e,void 0);let i=this.s;if(this.U&&(i?(i=ca(i),ua(i,this.U)):i=this.U),this.o!==null||this.O||(r.I=i,i=null),this.P)t:{for(var t=0,n=0;n<this.i.length;n++){e:{var s=this.i[n];if("__data__"in s.g&&(s=s.g.__data__,typeof s=="string")){s=s.length;break e}s=void 0}if(s===void 0)break;if(t+=s,4096<t){t=n;break t}if(t===4096||n===this.i.length-1){t=n+1;break t}}t=1e3}else t=1e3;t=Wa(this,r,t),n=zt(this.G),G(n,"RID",e),G(n,"CVER",22),this.F&&G(n,"X-HTTP-Session-Id",this.F),Rn(this,n),i&&(this.O?t="headers="+encodeURIComponent(String(Ka(i)))+"&"+t:this.o&&ri(n,this.o,i)),ei(this.h,r),this.bb&&G(n,"TYPE","init"),this.P?(G(n,"$req",t),G(n,"SID","null"),r.ba=!0,Sr(r,n,null)):Sr(r,n,t),this.H=2}}else this.H==3&&(e?so(this,e):this.i.length==0||Fa(this.h)||so(this))};function so(e,t){var n;t?n=t.m:n=e.W++;const s=zt(e.G);G(s,"SID",e.J),G(s,"RID",n),G(s,"AID",e.V),Rn(e,s),e.o&&e.s&&ri(s,e.o,e.s),n=new _n(e,e.j,n,e.C+1),e.o===null&&(n.I=e.s),t&&(e.i=t.F.concat(e.i)),t=Wa(e,n,1e3),n.setTimeout(Math.round(.5*e.xa)+Math.round(.5*e.xa*Math.random())),ei(e.h,n),Sr(n,s,t)}function Rn(e,t){e.ma&&zr(e.ma,function(n,s){G(t,s,n)}),e.l&&Ra({},function(n,s){G(t,s,n)})}function Wa(e,t,n){n=Math.min(e.i.length,n);var s=e.l?yt(e.l.Va,e.l,e):null;t:{var r=e.i;let i=-1;for(;;){const o=["count="+n];i==-1?0<n?(i=r[0].h,o.push("ofs="+i)):i=0:o.push("ofs="+i);let a=!0;for(let c=0;c<n;c++){let u=r[c].h;const h=r[c].g;if(u-=i,0>u)i=Math.max(0,r[c].h-100),a=!1;else try{Bl(h,o,"req"+u+"_")}catch{s&&s(h)}}if(a){s=o.join("&");break t}}}return e=e.i.splice(0,n),t.F=e,s}function Ya(e){e.g||e.u||(e.ba=1,ma(e.Ma,e),e.A=0)}function oi(e){return e.g||e.u||3<=e.A?!1:(e.ba++,e.u=An(yt(e.Ma,e),Za(e,e.A)),e.A++,!0)}y.Ma=function(){if(this.u=null,Xa(this),this.ca&&!(this.L||this.g==null||0>=this.S)){var e=2*this.S;this.j.info("BP detection timer enabled: "+e),this.B=An(yt(this.jb,this),e)}};y.jb=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.M=!1,this.L=!0,Tt(10),xs(this),Xa(this))};function ai(e){e.B!=null&&(A.clearTimeout(e.B),e.B=null)}function Xa(e){e.g=new _n(e,e.j,"rpc",e.ba),e.o===null&&(e.g.I=e.s),e.g.O=0;var t=zt(e.wa);G(t,"RID","rpc"),G(t,"SID",e.J),G(t,"CI",e.M?"0":"1"),G(t,"AID",e.V),G(t,"TYPE","xmlhttp"),Rn(e,t),e.o&&e.s&&ri(t,e.o,e.s),e.K&&e.g.setTimeout(e.K);var n=e.g;e=e.oa,n.L=1,n.v=ks(zt(t)),n.s=null,n.S=!0,_a(n,e)}y.ib=function(){this.v!=null&&(this.v=null,xs(this),oi(this),Tt(19))};function as(e){e.v!=null&&(A.clearTimeout(e.v),e.v=null)}function Ja(e,t){var n=null;if(e.g==t){as(e),ai(e),e.g=null;var s=2}else if(Ar(e.h,t))n=t.F,Ua(e.h,t),s=1;else return;if(e.H!=0){if(e.ta=t.aa,t.i)if(s==1){n=t.s?t.s.length:0,t=Date.now()-t.G;var r=e.C;s=As(),dt(s,new Sa(s,n)),Ms(e)}else Ya(e);else if(r=t.o,r==3||r==0&&0<e.ta||!(s==1&&Kl(e,t)||s==2&&oi(e)))switch(n&&0<n.length&&(t=e.h,t.i=t.i.concat(n)),r){case 1:ce(e,5);break;case 4:ce(e,10);break;case 3:ce(e,6);break;default:ce(e,2)}}}function Za(e,t){let n=e.ab+Math.floor(Math.random()*e.hb);return e.l||(n*=2),n*t}function ce(e,t){if(e.j.info("Error code "+t),t==2){var n=null;e.l&&(n=null);var s=yt(e.pb,e);n||(n=new he("//www.google.com/images/cleardot.gif"),A.location&&A.location.protocol=="http"||is(n,"https"),ks(n)),$l(n.toString(),s)}else Tt(2);e.H=0,e.l&&e.l.za(t),tc(e),Qa(e)}y.pb=function(e){e?(this.j.info("Successfully pinged google.com"),Tt(2)):(this.j.info("Failed to ping google.com"),Tt(1))};function tc(e){if(e.H=0,e.pa=[],e.l){const t=Ba(e.h);(t.length!=0||e.i.length!=0)&&(Ki(e.pa,t),Ki(e.pa,e.i),e.h.i.length=0,jr(e.i),e.i.length=0),e.l.ya()}}function ec(e,t,n){var s=n instanceof he?zt(n):new he(n,void 0);if(s.g!="")t&&(s.g=t+"."+s.g),os(s,s.m);else{var r=A.location;s=r.protocol,t=t?t+"."+r.hostname:r.hostname,r=+r.port;var i=new he(null,void 0);s&&is(i,s),t&&(i.g=t),r&&os(i,r),n&&(i.l=n),s=i}return n=e.F,t=e.Da,n&&t&&G(s,n,t),G(s,"VER",e.qa),Rn(e,s),s}function nc(e,t,n){if(t&&!e.I)throw Error("Can't create secondary domain capable XhrIo object.");return t=n&&e.Ha&&!e.va?new Y(new kn({ob:!0})):new Y(e.va),t.Oa(e.I),t}function sc(){}y=sc.prototype;y.Ba=function(){};y.Aa=function(){};y.za=function(){};y.ya=function(){};y.Va=function(){};function cs(){if(xe&&!(10<=Number(ul)))throw Error("Environmental error: no available transport.")}cs.prototype.g=function(e,t){return new kt(e,t)};function kt(e,t){ot.call(this),this.g=new Ga(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.s=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.Ca&&(e?e["X-WebChannel-Client-Profile"]=t.Ca:e={"X-WebChannel-Client-Profile":t.Ca}),this.g.U=e,(e=t&&t.cc)&&!ns(e)&&(this.g.o=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!ns(t)&&(this.g.F=t,e=this.h,e!==null&&t in e&&(e=this.h,t in e&&delete e[t])),this.j=new je(this)}at(kt,ot);kt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.I=!0);var e=this.g,t=this.l,n=this.h||void 0;Tt(0),e.Y=t,e.ma=n||{},e.M=e.aa,e.G=ec(e,null,e.Y),Ms(e)};kt.prototype.close=function(){ii(this.g)};kt.prototype.u=function(e){var t=this.g;if(typeof e=="string"){var n={};n.__data__=e,e=n}else this.v&&(n={},n.__data__=Wr(e),e=n);t.i.push(new Fl(t.fb++,e)),t.H==3&&Ms(t)};kt.prototype.N=function(){this.g.l=null,delete this.j,ii(this.g),delete this.g,kt.$.N.call(this)};function rc(e){Zr.call(this);var t=e.__sm__;if(t){t:{for(const n in t){e=n;break t}e=void 0}(this.i=e)&&(e=this.i,t=t!==null&&e in t?t[e]:void 0),this.data=t}else this.data=e}at(rc,Zr);function ic(){ti.call(this),this.status=1}at(ic,ti);function je(e){this.g=e}at(je,sc);je.prototype.Ba=function(){dt(this.g,"a")};je.prototype.Aa=function(e){dt(this.g,new rc(e))};je.prototype.za=function(e){dt(this.g,new ic)};je.prototype.ya=function(){dt(this.g,"b")};function Gl(){this.blockSize=-1}function Ot(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.m=Array(this.blockSize),this.i=this.h=0,this.reset()}at(Ot,Gl);Ot.prototype.reset=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.i=this.h=0};function sr(e,t,n){n||(n=0);var s=Array(16);if(typeof t=="string")for(var r=0;16>r;++r)s[r]=t.charCodeAt(n++)|t.charCodeAt(n++)<<8|t.charCodeAt(n++)<<16|t.charCodeAt(n++)<<24;else for(r=0;16>r;++r)s[r]=t[n++]|t[n++]<<8|t[n++]<<16|t[n++]<<24;t=e.g[0],n=e.g[1],r=e.g[2];var i=e.g[3],o=t+(i^n&(r^i))+s[0]+3614090360&4294967295;t=n+(o<<7&4294967295|o>>>25),o=i+(r^t&(n^r))+s[1]+3905402710&4294967295,i=t+(o<<12&4294967295|o>>>20),o=r+(n^i&(t^n))+s[2]+606105819&4294967295,r=i+(o<<17&4294967295|o>>>15),o=n+(t^r&(i^t))+s[3]+3250441966&4294967295,n=r+(o<<22&4294967295|o>>>10),o=t+(i^n&(r^i))+s[4]+4118548399&4294967295,t=n+(o<<7&4294967295|o>>>25),o=i+(r^t&(n^r))+s[5]+1200080426&4294967295,i=t+(o<<12&4294967295|o>>>20),o=r+(n^i&(t^n))+s[6]+2821735955&4294967295,r=i+(o<<17&4294967295|o>>>15),o=n+(t^r&(i^t))+s[7]+4249261313&4294967295,n=r+(o<<22&4294967295|o>>>10),o=t+(i^n&(r^i))+s[8]+1770035416&4294967295,t=n+(o<<7&4294967295|o>>>25),o=i+(r^t&(n^r))+s[9]+2336552879&4294967295,i=t+(o<<12&4294967295|o>>>20),o=r+(n^i&(t^n))+s[10]+4294925233&4294967295,r=i+(o<<17&4294967295|o>>>15),o=n+(t^r&(i^t))+s[11]+2304563134&4294967295,n=r+(o<<22&4294967295|o>>>10),o=t+(i^n&(r^i))+s[12]+1804603682&4294967295,t=n+(o<<7&4294967295|o>>>25),o=i+(r^t&(n^r))+s[13]+4254626195&4294967295,i=t+(o<<12&4294967295|o>>>20),o=r+(n^i&(t^n))+s[14]+2792965006&4294967295,r=i+(o<<17&4294967295|o>>>15),o=n+(t^r&(i^t))+s[15]+1236535329&4294967295,n=r+(o<<22&4294967295|o>>>10),o=t+(r^i&(n^r))+s[1]+4129170786&4294967295,t=n+(o<<5&4294967295|o>>>27),o=i+(n^r&(t^n))+s[6]+3225465664&4294967295,i=t+(o<<9&4294967295|o>>>23),o=r+(t^n&(i^t))+s[11]+643717713&4294967295,r=i+(o<<14&4294967295|o>>>18),o=n+(i^t&(r^i))+s[0]+3921069994&4294967295,n=r+(o<<20&4294967295|o>>>12),o=t+(r^i&(n^r))+s[5]+3593408605&4294967295,t=n+(o<<5&4294967295|o>>>27),o=i+(n^r&(t^n))+s[10]+38016083&4294967295,i=t+(o<<9&4294967295|o>>>23),o=r+(t^n&(i^t))+s[15]+3634488961&4294967295,r=i+(o<<14&4294967295|o>>>18),o=n+(i^t&(r^i))+s[4]+3889429448&4294967295,n=r+(o<<20&4294967295|o>>>12),o=t+(r^i&(n^r))+s[9]+568446438&4294967295,t=n+(o<<5&4294967295|o>>>27),o=i+(n^r&(t^n))+s[14]+3275163606&4294967295,i=t+(o<<9&4294967295|o>>>23),o=r+(t^n&(i^t))+s[3]+4107603335&4294967295,r=i+(o<<14&4294967295|o>>>18),o=n+(i^t&(r^i))+s[8]+1163531501&4294967295,n=r+(o<<20&4294967295|o>>>12),o=t+(r^i&(n^r))+s[13]+2850285829&4294967295,t=n+(o<<5&4294967295|o>>>27),o=i+(n^r&(t^n))+s[2]+4243563512&4294967295,i=t+(o<<9&4294967295|o>>>23),o=r+(t^n&(i^t))+s[7]+1735328473&4294967295,r=i+(o<<14&4294967295|o>>>18),o=n+(i^t&(r^i))+s[12]+2368359562&4294967295,n=r+(o<<20&4294967295|o>>>12),o=t+(n^r^i)+s[5]+4294588738&4294967295,t=n+(o<<4&4294967295|o>>>28),o=i+(t^n^r)+s[8]+2272392833&4294967295,i=t+(o<<11&4294967295|o>>>21),o=r+(i^t^n)+s[11]+1839030562&4294967295,r=i+(o<<16&4294967295|o>>>16),o=n+(r^i^t)+s[14]+4259657740&4294967295,n=r+(o<<23&4294967295|o>>>9),o=t+(n^r^i)+s[1]+2763975236&4294967295,t=n+(o<<4&4294967295|o>>>28),o=i+(t^n^r)+s[4]+1272893353&4294967295,i=t+(o<<11&4294967295|o>>>21),o=r+(i^t^n)+s[7]+4139469664&4294967295,r=i+(o<<16&4294967295|o>>>16),o=n+(r^i^t)+s[10]+3200236656&4294967295,n=r+(o<<23&4294967295|o>>>9),o=t+(n^r^i)+s[13]+681279174&4294967295,t=n+(o<<4&4294967295|o>>>28),o=i+(t^n^r)+s[0]+3936430074&4294967295,i=t+(o<<11&4294967295|o>>>21),o=r+(i^t^n)+s[3]+3572445317&4294967295,r=i+(o<<16&4294967295|o>>>16),o=n+(r^i^t)+s[6]+76029189&4294967295,n=r+(o<<23&4294967295|o>>>9),o=t+(n^r^i)+s[9]+3654602809&4294967295,t=n+(o<<4&4294967295|o>>>28),o=i+(t^n^r)+s[12]+3873151461&4294967295,i=t+(o<<11&4294967295|o>>>21),o=r+(i^t^n)+s[15]+530742520&4294967295,r=i+(o<<16&4294967295|o>>>16),o=n+(r^i^t)+s[2]+3299628645&4294967295,n=r+(o<<23&4294967295|o>>>9),o=t+(r^(n|~i))+s[0]+4096336452&4294967295,t=n+(o<<6&4294967295|o>>>26),o=i+(n^(t|~r))+s[7]+1126891415&4294967295,i=t+(o<<10&4294967295|o>>>22),o=r+(t^(i|~n))+s[14]+2878612391&4294967295,r=i+(o<<15&4294967295|o>>>17),o=n+(i^(r|~t))+s[5]+4237533241&4294967295,n=r+(o<<21&4294967295|o>>>11),o=t+(r^(n|~i))+s[12]+1700485571&4294967295,t=n+(o<<6&4294967295|o>>>26),o=i+(n^(t|~r))+s[3]+2399980690&4294967295,i=t+(o<<10&4294967295|o>>>22),o=r+(t^(i|~n))+s[10]+4293915773&4294967295,r=i+(o<<15&4294967295|o>>>17),o=n+(i^(r|~t))+s[1]+2240044497&4294967295,n=r+(o<<21&4294967295|o>>>11),o=t+(r^(n|~i))+s[8]+1873313359&4294967295,t=n+(o<<6&4294967295|o>>>26),o=i+(n^(t|~r))+s[15]+4264355552&4294967295,i=t+(o<<10&4294967295|o>>>22),o=r+(t^(i|~n))+s[6]+2734768916&4294967295,r=i+(o<<15&4294967295|o>>>17),o=n+(i^(r|~t))+s[13]+1309151649&4294967295,n=r+(o<<21&4294967295|o>>>11),o=t+(r^(n|~i))+s[4]+4149444226&4294967295,t=n+(o<<6&4294967295|o>>>26),o=i+(n^(t|~r))+s[11]+3174756917&4294967295,i=t+(o<<10&4294967295|o>>>22),o=r+(t^(i|~n))+s[2]+718787259&4294967295,r=i+(o<<15&4294967295|o>>>17),o=n+(i^(r|~t))+s[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(r+(o<<21&4294967295|o>>>11))&4294967295,e.g[2]=e.g[2]+r&4294967295,e.g[3]=e.g[3]+i&4294967295}Ot.prototype.j=function(e,t){t===void 0&&(t=e.length);for(var n=t-this.blockSize,s=this.m,r=this.h,i=0;i<t;){if(r==0)for(;i<=n;)sr(this,e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(s[r++]=e.charCodeAt(i++),r==this.blockSize){sr(this,s),r=0;break}}else for(;i<t;)if(s[r++]=e[i++],r==this.blockSize){sr(this,s),r=0;break}}this.h=r,this.i+=t};Ot.prototype.l=function(){var e=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;var n=8*this.i;for(t=e.length-8;t<e.length;++t)e[t]=n&255,n/=256;for(this.j(e),e=Array(16),t=n=0;4>t;++t)for(var s=0;32>s;s+=8)e[n++]=this.g[t]>>>s&255;return e};function L(e,t){this.h=t;for(var n=[],s=!0,r=e.length-1;0<=r;r--){var i=e[r]|0;s&&i==t||(n[r]=i,s=!1)}this.g=n}var Ql={};function ci(e){return-128<=e&&128>e?ra(Ql,e,function(t){return new L([t|0],0>t?-1:0)}):new L([e|0],0>e?-1:0)}function Ft(e){if(isNaN(e)||!isFinite(e))return De;if(0>e)return lt(Ft(-e));for(var t=[],n=1,s=0;e>=n;s++)t[s]=e/n|0,n*=Dr;return new L(t,0)}function oc(e,t){if(e.length==0)throw Error("number format error: empty string");if(t=t||10,2>t||36<t)throw Error("radix out of range: "+t);if(e.charAt(0)=="-")return lt(oc(e.substring(1),t));if(0<=e.indexOf("-"))throw Error('number format error: interior "-" character');for(var n=Ft(Math.pow(t,8)),s=De,r=0;r<e.length;r+=8){var i=Math.min(8,e.length-r),o=parseInt(e.substring(r,r+i),t);8>i?(i=Ft(Math.pow(t,i)),s=s.R(i).add(Ft(o))):(s=s.R(n),s=s.add(Ft(o)))}return s}var Dr=4294967296,De=ci(0),_r=ci(1),ro=ci(16777216);y=L.prototype;y.ea=function(){if(Nt(this))return-lt(this).ea();for(var e=0,t=1,n=0;n<this.g.length;n++){var s=this.D(n);e+=(0<=s?s:Dr+s)*t,t*=Dr}return e};y.toString=function(e){if(e=e||10,2>e||36<e)throw Error("radix out of range: "+e);if(jt(this))return"0";if(Nt(this))return"-"+lt(this).toString(e);for(var t=Ft(Math.pow(e,6)),n=this,s="";;){var r=hs(n,t).g;n=us(n,r.R(t));var i=((0<n.g.length?n.g[0]:n.h)>>>0).toString(e);if(n=r,jt(n))return i+s;for(;6>i.length;)i="0"+i;s=i+s}};y.D=function(e){return 0>e?0:e<this.g.length?this.g[e]:this.h};function jt(e){if(e.h!=0)return!1;for(var t=0;t<e.g.length;t++)if(e.g[t]!=0)return!1;return!0}function Nt(e){return e.h==-1}y.X=function(e){return e=us(this,e),Nt(e)?-1:jt(e)?0:1};function lt(e){for(var t=e.g.length,n=[],s=0;s<t;s++)n[s]=~e.g[s];return new L(n,~e.h).add(_r)}y.abs=function(){return Nt(this)?lt(this):this};y.add=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],s=0,r=0;r<=t;r++){var i=s+(this.D(r)&65535)+(e.D(r)&65535),o=(i>>>16)+(this.D(r)>>>16)+(e.D(r)>>>16);s=o>>>16,i&=65535,o&=65535,n[r]=o<<16|i}return new L(n,n[n.length-1]&-2147483648?-1:0)};function us(e,t){return e.add(lt(t))}y.R=function(e){if(jt(this)||jt(e))return De;if(Nt(this))return Nt(e)?lt(this).R(lt(e)):lt(lt(this).R(e));if(Nt(e))return lt(this.R(lt(e)));if(0>this.X(ro)&&0>e.X(ro))return Ft(this.ea()*e.ea());for(var t=this.g.length+e.g.length,n=[],s=0;s<2*t;s++)n[s]=0;for(s=0;s<this.g.length;s++)for(var r=0;r<e.g.length;r++){var i=this.D(s)>>>16,o=this.D(s)&65535,a=e.D(r)>>>16,c=e.D(r)&65535;n[2*s+2*r]+=o*c,$n(n,2*s+2*r),n[2*s+2*r+1]+=i*c,$n(n,2*s+2*r+1),n[2*s+2*r+1]+=o*a,$n(n,2*s+2*r+1),n[2*s+2*r+2]+=i*a,$n(n,2*s+2*r+2)}for(s=0;s<t;s++)n[s]=n[2*s+1]<<16|n[2*s];for(s=t;s<2*t;s++)n[s]=0;return new L(n,0)};function $n(e,t){for(;(e[t]&65535)!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function Xe(e,t){this.g=e,this.h=t}function hs(e,t){if(jt(t))throw Error("division by zero");if(jt(e))return new Xe(De,De);if(Nt(e))return t=hs(lt(e),t),new Xe(lt(t.g),lt(t.h));if(Nt(t))return t=hs(e,lt(t)),new Xe(lt(t.g),t.h);if(30<e.g.length){if(Nt(e)||Nt(t))throw Error("slowDivide_ only works with positive integers.");for(var n=_r,s=t;0>=s.X(e);)n=io(n),s=io(s);var r=Ie(n,1),i=Ie(s,1);for(s=Ie(s,2),n=Ie(n,2);!jt(s);){var o=i.add(s);0>=o.X(e)&&(r=r.add(n),i=o),s=Ie(s,1),n=Ie(n,1)}return t=us(e,r.R(t)),new Xe(r,t)}for(r=De;0<=e.X(t);){for(n=Math.max(1,Math.floor(e.ea()/t.ea())),s=Math.ceil(Math.log(n)/Math.LN2),s=48>=s?1:Math.pow(2,s-48),i=Ft(n),o=i.R(t);Nt(o)||0<o.X(e);)n-=s,i=Ft(n),o=i.R(t);jt(i)&&(i=_r),r=r.add(i),e=us(e,o)}return new Xe(r,e)}y.gb=function(e){return hs(this,e).h};y.and=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],s=0;s<t;s++)n[s]=this.D(s)&e.D(s);return new L(n,this.h&e.h)};y.or=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],s=0;s<t;s++)n[s]=this.D(s)|e.D(s);return new L(n,this.h|e.h)};y.xor=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],s=0;s<t;s++)n[s]=this.D(s)^e.D(s);return new L(n,this.h^e.h)};function io(e){for(var t=e.g.length+1,n=[],s=0;s<t;s++)n[s]=e.D(s)<<1|e.D(s-1)>>>31;return new L(n,e.h)}function Ie(e,t){var n=t>>5;t%=32;for(var s=e.g.length-n,r=[],i=0;i<s;i++)r[i]=0<t?e.D(i+n)>>>t|e.D(i+n+1)<<32-t:e.D(i+n);return new L(r,e.h)}cs.prototype.createWebChannel=cs.prototype.g;kt.prototype.send=kt.prototype.u;kt.prototype.open=kt.prototype.m;kt.prototype.close=kt.prototype.close;Ds.NO_ERROR=0;Ds.TIMEOUT=8;Ds.HTTP_ERROR=6;Ca.COMPLETE="complete";Aa.EventType=Dn;Dn.OPEN="a";Dn.CLOSE="b";Dn.ERROR="c";Dn.MESSAGE="d";ot.prototype.listen=ot.prototype.O;Y.prototype.listenOnce=Y.prototype.P;Y.prototype.getLastError=Y.prototype.Sa;Y.prototype.getLastErrorCode=Y.prototype.Ia;Y.prototype.getStatus=Y.prototype.da;Y.prototype.getResponseJson=Y.prototype.Wa;Y.prototype.getResponseText=Y.prototype.ja;Y.prototype.send=Y.prototype.ha;Y.prototype.setWithCredentials=Y.prototype.Oa;Ot.prototype.digest=Ot.prototype.l;Ot.prototype.reset=Ot.prototype.reset;Ot.prototype.update=Ot.prototype.j;L.prototype.add=L.prototype.add;L.prototype.multiply=L.prototype.R;L.prototype.modulo=L.prototype.gb;L.prototype.compare=L.prototype.X;L.prototype.toNumber=L.prototype.ea;L.prototype.toString=L.prototype.toString;L.prototype.getBits=L.prototype.D;L.fromNumber=Ft;L.fromString=oc;var Wl=function(){return new cs},Yl=function(){return As()},rr=Ds,Xl=Ca,Jl=me,oo={xb:0,Ab:1,Bb:2,Ub:3,Zb:4,Wb:5,Xb:6,Vb:7,Tb:8,Yb:9,PROXY:10,NOPROXY:11,Rb:12,Nb:13,Ob:14,Mb:15,Pb:16,Qb:17,tb:18,sb:19,ub:20},Zl=kn,jn=Aa,td=Y,ed=Ot,_e=L;const ao="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}gt.UNAUTHENTICATED=new gt(null),gt.GOOGLE_CREDENTIALS=new gt("google-credentials-uid"),gt.FIRST_PARTY=new gt("first-party-uid"),gt.MOCK_USER=new gt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qe="9.22.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fe=new Xo("@firebase/firestore");function co(){return fe.logLevel}function E(e,...t){if(fe.logLevel<=O.DEBUG){const n=t.map(ui);fe.debug(`Firestore (${qe}): ${e}`,...n)}}function Ht(e,...t){if(fe.logLevel<=O.ERROR){const n=t.map(ui);fe.error(`Firestore (${qe}): ${e}`,...n)}}function Me(e,...t){if(fe.logLevel<=O.WARN){const n=t.map(ui);fe.warn(`Firestore (${qe}): ${e}`,...n)}}function ui(e){if(typeof e=="string")return e;try{return t=e,JSON.stringify(t)}catch{return e}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C(e="Unexpected state"){const t=`FIRESTORE (${qe}) INTERNAL ASSERTION FAILED: `+e;throw Ht(t),new Error(t)}function j(e,t){e||C()}function _(e,t){return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class I extends Be{constructor(t,n){super(t,n),this.code=t,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(){this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(t,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class nd{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,n){t.enqueueRetryable(()=>n(gt.UNAUTHENTICATED))}shutdown(){}}class sd{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,n){this.changeListener=n,t.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class rd{constructor(t){this.t=t,this.currentUser=gt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,n){let s=this.i;const r=c=>this.i!==s?(s=this.i,n(c)):Promise.resolve();let i=new le;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new le,t.enqueueRetryable(()=>r(this.currentUser))};const o=()=>{const c=i;t.enqueueRetryable(async()=>{await c.promise,await r(this.currentUser)})},a=c=>{E("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(c=>a(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?a(c):(E("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new le)}},0),o()}getToken(){const t=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(s=>this.i!==t?(E("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(j(typeof s.accessToken=="string"),new ac(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const t=this.auth&&this.auth.getUid();return j(t===null||typeof t=="string"),new gt(t)}}class id{constructor(t,n,s){this.h=t,this.l=n,this.m=s,this.type="FirstParty",this.user=gt.FIRST_PARTY,this.g=new Map}p(){return this.m?this.m():null}get headers(){this.g.set("X-Goog-AuthUser",this.h);const t=this.p();return t&&this.g.set("Authorization",t),this.l&&this.g.set("X-Goog-Iam-Authorization-Token",this.l),this.g}}class od{constructor(t,n,s){this.h=t,this.l=n,this.m=s}getToken(){return Promise.resolve(new id(this.h,this.l,this.m))}start(t,n){t.enqueueRetryable(()=>n(gt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ad{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class cd{constructor(t){this.I=t,this.forceRefresh=!1,this.appCheck=null,this.T=null}start(t,n){const s=i=>{i.error!=null&&E("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.T;return this.T=i.token,E("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable(()=>s(i))};const r=i=>{E("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.appCheck.addTokenListener(this.o)};this.I.onInit(i=>r(i)),setTimeout(()=>{if(!this.appCheck){const i=this.I.getImmediate({optional:!0});i?r(i):E("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(n=>n?(j(typeof n.token=="string"),this.T=n.token,new ad(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ud(e){const t=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(n);else for(let s=0;s<e;s++)n[s]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cc{static A(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/t.length)*t.length;let s="";for(;s.length<20;){const r=ud(40);for(let i=0;i<r.length;++i)s.length<20&&r[i]<n&&(s+=t.charAt(r[i]%t.length))}return s}}function R(e,t){return e<t?-1:e>t?1:0}function Oe(e,t,n){return e.length===t.length&&e.every((s,r)=>n(s,t[r]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(t,n){if(this.seconds=t,this.nanoseconds=n,n<0)throw new I(g.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new I(g.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(t<-62135596800)throw new I(g.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new I(g.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return rt.fromMillis(Date.now())}static fromDate(t){return rt.fromMillis(t.getTime())}static fromMillis(t){const n=Math.floor(t/1e3),s=Math.floor(1e6*(t-1e3*n));return new rt(n,s)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?R(this.nanoseconds,t.nanoseconds):R(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D{constructor(t){this.timestamp=t}static fromTimestamp(t){return new D(t)}static min(){return new D(new rt(0,0))}static max(){return new D(new rt(253402300799,999999999))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(t,n,s){n===void 0?n=0:n>t.length&&C(),s===void 0?s=t.length-n:s>t.length-n&&C(),this.segments=t,this.offset=n,this.len=s}get length(){return this.len}isEqual(t){return yn.comparator(this,t)===0}child(t){const n=this.segments.slice(this.offset,this.limit());return t instanceof yn?t.forEach(s=>{n.push(s)}):n.push(t),this.construct(n)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==t.get(n))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==t.get(n))return!1;return!0}forEach(t){for(let n=this.offset,s=this.limit();n<s;n++)t(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,n){const s=Math.min(t.length,n.length);for(let r=0;r<s;r++){const i=t.get(r),o=n.get(r);if(i<o)return-1;if(i>o)return 1}return t.length<n.length?-1:t.length>n.length?1:0}}class Q extends yn{construct(t,n,s){return new Q(t,n,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...t){const n=[];for(const s of t){if(s.indexOf("//")>=0)throw new I(g.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);n.push(...s.split("/").filter(r=>r.length>0))}return new Q(n)}static emptyPath(){return new Q([])}}const hd=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class mt extends yn{construct(t,n,s){return new mt(t,n,s)}static isValidIdentifier(t){return hd.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),mt.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new mt(["__name__"])}static fromServerFormat(t){const n=[];let s="",r=0;const i=()=>{if(s.length===0)throw new I(g.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(s),s=""};let o=!1;for(;r<t.length;){const a=t[r];if(a==="\\"){if(r+1===t.length)throw new I(g.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const c=t[r+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new I(g.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);s+=c,r+=2}else a==="`"?(o=!o,r++):a!=="."||o?(s+=a,r++):(i(),r++)}if(i(),o)throw new I(g.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new mt(n)}static emptyPath(){return new mt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(t){this.path=t}static fromPath(t){return new S(Q.fromString(t))}static fromName(t){return new S(Q.fromString(t).popFirst(5))}static empty(){return new S(Q.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Q.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,n){return Q.comparator(t.path,n.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new S(new Q(t.slice()))}}function ld(e,t){const n=e.toTimestamp().seconds,s=e.toTimestamp().nanoseconds+1,r=D.fromTimestamp(s===1e9?new rt(n+1,0):new rt(n,s));return new Zt(r,S.empty(),t)}function dd(e){return new Zt(e.readTime,e.key,-1)}class Zt{constructor(t,n,s){this.readTime=t,this.documentKey=n,this.largestBatchId=s}static min(){return new Zt(D.min(),S.empty(),-1)}static max(){return new Zt(D.max(),S.empty(),-1)}}function fd(e,t){let n=e.readTime.compareTo(t.readTime);return n!==0?n:(n=S.comparator(e.documentKey,t.documentKey),n!==0?n:R(e.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gd="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class pd{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xn(e){if(e.code!==g.FAILED_PRECONDITION||e.message!==gd)throw e;E("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(t){return this.next(void 0,t)}next(t,n){return this.callbackAttached&&C(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(t,this.result):new p((s,r)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(s,r)},this.catchCallback=i=>{this.wrapFailure(n,i).next(s,r)}})}toPromise(){return new Promise((t,n)=>{this.next(t,n)})}wrapUserFunction(t){try{const n=t();return n instanceof p?n:p.resolve(n)}catch(n){return p.reject(n)}}wrapSuccess(t,n){return t?this.wrapUserFunction(()=>t(n)):p.resolve(n)}wrapFailure(t,n){return t?this.wrapUserFunction(()=>t(n)):p.reject(n)}static resolve(t){return new p((n,s)=>{n(t)})}static reject(t){return new p((n,s)=>{s(t)})}static waitFor(t){return new p((n,s)=>{let r=0,i=0,o=!1;t.forEach(a=>{++r,a.next(()=>{++i,o&&i===r&&n()},c=>s(c))}),o=!0,i===r&&n()})}static or(t){let n=p.resolve(!1);for(const s of t)n=n.next(r=>r?p.resolve(r):s());return n}static forEach(t,n){const s=[];return t.forEach((r,i)=>{s.push(n.call(this,r,i))}),this.waitFor(s)}static mapArray(t,n){return new p((s,r)=>{const i=t.length,o=new Array(i);let a=0;for(let c=0;c<i;c++){const u=c;n(t[u]).next(h=>{o[u]=h,++a,a===i&&s(o)},h=>r(h))}})}static doWhile(t,n){return new p((s,r)=>{const i=()=>{t()===!0?n().next(()=>{i()},r):s()};i()})}}function Mn(e){return e.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(t,n){this.previousValue=t,n&&(n.sequenceNumberHandler=s=>this.ot(s),this.ut=s=>n.writeSequenceNumber(s))}ot(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ut&&this.ut(t),t}}hi.ct=-1;function Os(e){return e==null}function ls(e){return e===0&&1/e==-1/0}function md(e){return typeof e=="number"&&Number.isInteger(e)&&!ls(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uo(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function ze(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function uc(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{constructor(t,n){this.comparator=t,this.root=n||ct.EMPTY}insert(t,n){return new W(this.comparator,this.root.insert(t,n,this.comparator).copy(null,null,ct.BLACK,null,null))}remove(t){return new W(this.comparator,this.root.remove(t,this.comparator).copy(null,null,ct.BLACK,null,null))}get(t){let n=this.root;for(;!n.isEmpty();){const s=this.comparator(t,n.key);if(s===0)return n.value;s<0?n=n.left:s>0&&(n=n.right)}return null}indexOf(t){let n=0,s=this.root;for(;!s.isEmpty();){const r=this.comparator(t,s.key);if(r===0)return n+s.left.size;r<0?s=s.left:(n+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((n,s)=>(t(n,s),!1))}toString(){const t=[];return this.inorderTraversal((n,s)=>(t.push(`${n}:${s}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new qn(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new qn(this.root,t,this.comparator,!1)}getReverseIterator(){return new qn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new qn(this.root,t,this.comparator,!0)}}class qn{constructor(t,n,s,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=n?s(t.key,n):1,n&&r&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const n={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class ct{constructor(t,n,s,r,i){this.key=t,this.value=n,this.color=s??ct.RED,this.left=r??ct.EMPTY,this.right=i??ct.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,n,s,r,i){return new ct(t??this.key,n??this.value,s??this.color,r??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,n,s){let r=this;const i=s(t,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(t,n,s),null):i===0?r.copy(null,n,null,null,null):r.copy(null,null,null,null,r.right.insert(t,n,s)),r.fixUp()}removeMin(){if(this.left.isEmpty())return ct.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,n){let s,r=this;if(n(t,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(t,n),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),n(t,r.key)===0){if(r.right.isEmpty())return ct.EMPTY;s=r.right.min(),r=r.copy(s.key,s.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(t,n))}return r.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,ct.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,ct.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,n)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw C();const t=this.left.check();if(t!==this.right.check())throw C();return t+(this.isRed()?0:1)}}ct.EMPTY=null,ct.RED=!0,ct.BLACK=!1;ct.EMPTY=new class{constructor(){this.size=0}get key(){throw C()}get value(){throw C()}get color(){throw C()}get left(){throw C()}get right(){throw C()}copy(e,t,n,s,r){return this}insert(e,t,n){return new ct(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(t){this.comparator=t,this.data=new W(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((n,s)=>(t(n),!1))}forEachInRange(t,n){const s=this.data.getIteratorFrom(t[0]);for(;s.hasNext();){const r=s.getNext();if(this.comparator(r.key,t[1])>=0)return;n(r.key)}}forEachWhile(t,n){let s;for(s=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();s.hasNext();)if(!t(s.getNext().key))return}firstAfterOrEqual(t){const n=this.data.getIteratorFrom(t);return n.hasNext()?n.getNext().key:null}getIterator(){return new ho(this.data.getIterator())}getIteratorFrom(t){return new ho(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let n=this;return n.size<t.size&&(n=t,t=this),t.forEach(s=>{n=n.add(s)}),n}isEqual(t){if(!(t instanceof wt)||this.size!==t.size)return!1;const n=this.data.getIterator(),s=t.data.getIterator();for(;n.hasNext();){const r=n.getNext().key,i=s.getNext().key;if(this.comparator(r,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(n=>{t.push(n)}),t}toString(){const t=[];return this.forEach(n=>t.push(n)),"SortedSet("+t.toString()+")"}copy(t){const n=new wt(this.comparator);return n.data=t,n}}class ho{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(t){this.fields=t,t.sort(mt.comparator)}static empty(){return new Mt([])}unionWith(t){let n=new wt(mt.comparator);for(const s of this.fields)n=n.add(s);for(const s of t)n=n.add(s);return new Mt(n.toArray())}covers(t){for(const n of this.fields)if(n.isPrefixOf(t))return!0;return!1}isEqual(t){return Oe(this.fields,t.fields,(n,s)=>n.isEqual(s))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(t){this.binaryString=t}static fromBase64String(t){const n=function(s){try{return atob(s)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new hc("Invalid base64 string: "+r):r}}(t);return new Et(n)}static fromUint8Array(t){const n=function(s){let r="";for(let i=0;i<s.length;++i)r+=String.fromCharCode(s[i]);return r}(t);return new Et(n)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return t=this.binaryString,btoa(t);var t}toUint8Array(){return function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return R(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Et.EMPTY_BYTE_STRING=new Et("");const yd=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function te(e){if(j(!!e),typeof e=="string"){let t=0;const n=yd.exec(e);if(j(!!n),n[1]){let r=n[1];r=(r+"000000000").substr(0,9),t=Number(r)}const s=new Date(e);return{seconds:Math.floor(s.getTime()/1e3),nanos:t}}return{seconds:nt(e.seconds),nanos:nt(e.nanos)}}function nt(e){return typeof e=="number"?e:typeof e=="string"?Number(e):0}function ge(e){return typeof e=="string"?Et.fromBase64String(e):Et.fromUint8Array(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function li(e){var t,n;return((n=(((t=e==null?void 0:e.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function di(e){const t=e.mapValue.fields.__previous_value__;return li(t)?di(t):t}function vn(e){const t=te(e.mapValue.fields.__local_write_time__.timestampValue);return new rt(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vd{constructor(t,n,s,r,i,o,a,c,u){this.databaseId=t,this.appId=n,this.persistenceKey=s,this.host=r,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=u}}class wn{constructor(t,n){this.projectId=t,this.database=n||"(default)"}static empty(){return new wn("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(t){return t instanceof wn&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zn={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function pe(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?li(e)?4:wd(e)?9007199254740991:10:C()}function Ut(e,t){if(e===t)return!0;const n=pe(e);if(n!==pe(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return vn(e).isEqual(vn(t));case 3:return function(s,r){if(typeof s.timestampValue=="string"&&typeof r.timestampValue=="string"&&s.timestampValue.length===r.timestampValue.length)return s.timestampValue===r.timestampValue;const i=te(s.timestampValue),o=te(r.timestampValue);return i.seconds===o.seconds&&i.nanos===o.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return function(s,r){return ge(s.bytesValue).isEqual(ge(r.bytesValue))}(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return function(s,r){return nt(s.geoPointValue.latitude)===nt(r.geoPointValue.latitude)&&nt(s.geoPointValue.longitude)===nt(r.geoPointValue.longitude)}(e,t);case 2:return function(s,r){if("integerValue"in s&&"integerValue"in r)return nt(s.integerValue)===nt(r.integerValue);if("doubleValue"in s&&"doubleValue"in r){const i=nt(s.doubleValue),o=nt(r.doubleValue);return i===o?ls(i)===ls(o):isNaN(i)&&isNaN(o)}return!1}(e,t);case 9:return Oe(e.arrayValue.values||[],t.arrayValue.values||[],Ut);case 10:return function(s,r){const i=s.mapValue.fields||{},o=r.mapValue.fields||{};if(uo(i)!==uo(o))return!1;for(const a in i)if(i.hasOwnProperty(a)&&(o[a]===void 0||!Ut(i[a],o[a])))return!1;return!0}(e,t);default:return C()}}function En(e,t){return(e.values||[]).find(n=>Ut(n,t))!==void 0}function Le(e,t){if(e===t)return 0;const n=pe(e),s=pe(t);if(n!==s)return R(n,s);switch(n){case 0:case 9007199254740991:return 0;case 1:return R(e.booleanValue,t.booleanValue);case 2:return function(r,i){const o=nt(r.integerValue||r.doubleValue),a=nt(i.integerValue||i.doubleValue);return o<a?-1:o>a?1:o===a?0:isNaN(o)?isNaN(a)?0:-1:1}(e,t);case 3:return lo(e.timestampValue,t.timestampValue);case 4:return lo(vn(e),vn(t));case 5:return R(e.stringValue,t.stringValue);case 6:return function(r,i){const o=ge(r),a=ge(i);return o.compareTo(a)}(e.bytesValue,t.bytesValue);case 7:return function(r,i){const o=r.split("/"),a=i.split("/");for(let c=0;c<o.length&&c<a.length;c++){const u=R(o[c],a[c]);if(u!==0)return u}return R(o.length,a.length)}(e.referenceValue,t.referenceValue);case 8:return function(r,i){const o=R(nt(r.latitude),nt(i.latitude));return o!==0?o:R(nt(r.longitude),nt(i.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return function(r,i){const o=r.values||[],a=i.values||[];for(let c=0;c<o.length&&c<a.length;++c){const u=Le(o[c],a[c]);if(u)return u}return R(o.length,a.length)}(e.arrayValue,t.arrayValue);case 10:return function(r,i){if(r===zn.mapValue&&i===zn.mapValue)return 0;if(r===zn.mapValue)return 1;if(i===zn.mapValue)return-1;const o=r.fields||{},a=Object.keys(o),c=i.fields||{},u=Object.keys(c);a.sort(),u.sort();for(let h=0;h<a.length&&h<u.length;++h){const l=R(a[h],u[h]);if(l!==0)return l;const f=Le(o[a[h]],c[u[h]]);if(f!==0)return f}return R(a.length,u.length)}(e.mapValue,t.mapValue);default:throw C()}}function lo(e,t){if(typeof e=="string"&&typeof t=="string"&&e.length===t.length)return R(e,t);const n=te(e),s=te(t),r=R(n.seconds,s.seconds);return r!==0?r:R(n.nanos,s.nanos)}function Pe(e){return br(e)}function br(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(s){const r=te(s);return`time(${r.seconds},${r.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?ge(e.bytesValue).toBase64():"referenceValue"in e?(n=e.referenceValue,S.fromName(n).toString()):"geoPointValue"in e?`geo(${(t=e.geoPointValue).latitude},${t.longitude})`:"arrayValue"in e?function(s){let r="[",i=!0;for(const o of s.values||[])i?i=!1:r+=",",r+=br(o);return r+"]"}(e.arrayValue):"mapValue"in e?function(s){const r=Object.keys(s.fields||{}).sort();let i="{",o=!0;for(const a of r)o?o=!1:i+=",",i+=`${a}:${br(s.fields[a])}`;return i+"}"}(e.mapValue):C();var t,n}function kr(e){return!!e&&"integerValue"in e}function fi(e){return!!e&&"arrayValue"in e}function fo(e){return!!e&&"nullValue"in e}function go(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function Gn(e){return!!e&&"mapValue"in e}function on(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&typeof e.timestampValue=="object")return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){const t={mapValue:{fields:{}}};return ze(e.mapValue.fields,(n,s)=>t.mapValue.fields[n]=on(s)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=on(e.arrayValue.values[n]);return t}return Object.assign({},e)}function wd(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(t){this.value=t}static empty(){return new Rt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let n=this.value;for(let s=0;s<t.length-1;++s)if(n=(n.mapValue.fields||{})[t.get(s)],!Gn(n))return null;return n=(n.mapValue.fields||{})[t.lastSegment()],n||null}}set(t,n){this.getFieldsMap(t.popLast())[t.lastSegment()]=on(n)}setAll(t){let n=mt.emptyPath(),s={},r=[];t.forEach((o,a)=>{if(!n.isImmediateParentOf(a)){const c=this.getFieldsMap(n);this.applyChanges(c,s,r),s={},r=[],n=a.popLast()}o?s[a.lastSegment()]=on(o):r.push(a.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,s,r)}delete(t){const n=this.field(t.popLast());Gn(n)&&n.mapValue.fields&&delete n.mapValue.fields[t.lastSegment()]}isEqual(t){return Ut(this.value,t.value)}getFieldsMap(t){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let s=0;s<t.length;++s){let r=n.mapValue.fields[t.get(s)];Gn(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},n.mapValue.fields[t.get(s)]=r),n=r}return n.mapValue.fields}applyChanges(t,n,s){ze(n,(r,i)=>t[r]=i);for(const r of s)delete t[r]}clone(){return new Rt(on(this.value))}}function lc(e){const t=[];return ze(e.fields,(n,s)=>{const r=new mt([n]);if(Gn(s)){const i=lc(s.mapValue).fields;if(i.length===0)t.push(r);else for(const o of i)t.push(r.child(o))}else t.push(r)}),new Mt(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(t,n,s,r,i,o,a){this.key=t,this.documentType=n,this.version=s,this.readTime=r,this.createTime=i,this.data=o,this.documentState=a}static newInvalidDocument(t){return new pt(t,0,D.min(),D.min(),D.min(),Rt.empty(),0)}static newFoundDocument(t,n,s,r){return new pt(t,1,n,D.min(),s,r,0)}static newNoDocument(t,n){return new pt(t,2,n,D.min(),D.min(),Rt.empty(),0)}static newUnknownDocument(t,n){return new pt(t,3,n,D.min(),D.min(),Rt.empty(),2)}convertToFoundDocument(t,n){return!this.createTime.isEqual(D.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Rt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Rt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=D.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof pt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new pt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds{constructor(t,n){this.position=t,this.inclusive=n}}function po(e,t,n){let s=0;for(let r=0;r<e.position.length;r++){const i=t[r],o=e.position[r];if(i.field.isKeyField()?s=S.comparator(S.fromName(o.referenceValue),n.key):s=Le(o,n.data.field(i.field)),i.dir==="desc"&&(s*=-1),s!==0)break}return s}function mo(e,t){if(e===null)return t===null;if(t===null||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!Ut(e.position[n],t.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an{constructor(t,n="asc"){this.field=t,this.dir=n}}function Ed(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc{}class st extends dc{constructor(t,n,s){super(),this.field=t,this.op=n,this.value=s}static create(t,n,s){return t.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(t,n,s):new Id(t,n,s):n==="array-contains"?new Ad(t,s):n==="in"?new Dd(t,s):n==="not-in"?new _d(t,s):n==="array-contains-any"?new bd(t,s):new st(t,n,s)}static createKeyFieldInFilter(t,n,s){return n==="in"?new Sd(t,s):new Cd(t,s)}matches(t){const n=t.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(Le(n,this.value)):n!==null&&pe(this.value)===pe(n)&&this.matchesComparison(Le(n,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return C()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}getFirstInequalityField(){return this.isInequality()?this.field:null}}class Bt extends dc{constructor(t,n){super(),this.filters=t,this.op=n,this.lt=null}static create(t,n){return new Bt(t,n)}matches(t){return fc(this)?this.filters.find(n=>!n.matches(t))===void 0:this.filters.find(n=>n.matches(t))!==void 0}getFlattenedFilters(){return this.lt!==null||(this.lt=this.filters.reduce((t,n)=>t.concat(n.getFlattenedFilters()),[])),this.lt}getFilters(){return Object.assign([],this.filters)}getFirstInequalityField(){const t=this.ft(n=>n.isInequality());return t!==null?t.field:null}ft(t){for(const n of this.getFlattenedFilters())if(t(n))return n;return null}}function fc(e){return e.op==="and"}function gc(e){return Td(e)&&fc(e)}function Td(e){for(const t of e.filters)if(t instanceof Bt)return!1;return!0}function Nr(e){if(e instanceof st)return e.field.canonicalString()+e.op.toString()+Pe(e.value);if(gc(e))return e.filters.map(t=>Nr(t)).join(",");{const t=e.filters.map(n=>Nr(n)).join(",");return`${e.op}(${t})`}}function pc(e,t){return e instanceof st?function(n,s){return s instanceof st&&n.op===s.op&&n.field.isEqual(s.field)&&Ut(n.value,s.value)}(e,t):e instanceof Bt?function(n,s){return s instanceof Bt&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce((r,i,o)=>r&&pc(i,s.filters[o]),!0):!1}(e,t):void C()}function mc(e){return e instanceof st?function(t){return`${t.field.canonicalString()} ${t.op} ${Pe(t.value)}`}(e):e instanceof Bt?function(t){return t.op.toString()+" {"+t.getFilters().map(mc).join(" ,")+"}"}(e):"Filter"}class Id extends st{constructor(t,n,s){super(t,n,s),this.key=S.fromName(s.referenceValue)}matches(t){const n=S.comparator(t.key,this.key);return this.matchesComparison(n)}}class Sd extends st{constructor(t,n){super(t,"in",n),this.keys=yc("in",n)}matches(t){return this.keys.some(n=>n.isEqual(t.key))}}class Cd extends st{constructor(t,n){super(t,"not-in",n),this.keys=yc("not-in",n)}matches(t){return!this.keys.some(n=>n.isEqual(t.key))}}function yc(e,t){var n;return(((n=t.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(s=>S.fromName(s.referenceValue))}class Ad extends st{constructor(t,n){super(t,"array-contains",n)}matches(t){const n=t.data.field(this.field);return fi(n)&&En(n.arrayValue,this.value)}}class Dd extends st{constructor(t,n){super(t,"in",n)}matches(t){const n=t.data.field(this.field);return n!==null&&En(this.value.arrayValue,n)}}class _d extends st{constructor(t,n){super(t,"not-in",n)}matches(t){if(En(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=t.data.field(this.field);return n!==null&&!En(this.value.arrayValue,n)}}class bd extends st{constructor(t,n){super(t,"array-contains-any",n)}matches(t){const n=t.data.field(this.field);return!(!fi(n)||!n.arrayValue.values)&&n.arrayValue.values.some(s=>En(this.value.arrayValue,s))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kd{constructor(t,n=null,s=[],r=[],i=null,o=null,a=null){this.path=t,this.collectionGroup=n,this.orderBy=s,this.filters=r,this.limit=i,this.startAt=o,this.endAt=a,this.dt=null}}function yo(e,t=null,n=[],s=[],r=null,i=null,o=null){return new kd(e,t,n,s,r,i,o)}function gi(e){const t=_(e);if(t.dt===null){let n=t.path.canonicalString();t.collectionGroup!==null&&(n+="|cg:"+t.collectionGroup),n+="|f:",n+=t.filters.map(s=>Nr(s)).join(","),n+="|ob:",n+=t.orderBy.map(s=>function(r){return r.field.canonicalString()+r.dir}(s)).join(","),Os(t.limit)||(n+="|l:",n+=t.limit),t.startAt&&(n+="|lb:",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map(s=>Pe(s)).join(",")),t.endAt&&(n+="|ub:",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map(s=>Pe(s)).join(",")),t.dt=n}return t.dt}function pi(e,t){if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!Ed(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!pc(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!mo(e.startAt,t.startAt)&&mo(e.endAt,t.endAt)}function Rr(e){return S.isDocumentKey(e.path)&&e.collectionGroup===null&&e.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ls{constructor(t,n=null,s=[],r=[],i=null,o="F",a=null,c=null){this.path=t,this.collectionGroup=n,this.explicitOrderBy=s,this.filters=r,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=c,this.wt=null,this._t=null,this.startAt,this.endAt}}function Nd(e,t,n,s,r,i,o,a){return new Ls(e,t,n,s,r,i,o,a)}function mi(e){return new Ls(e)}function vo(e){return e.filters.length===0&&e.limit===null&&e.startAt==null&&e.endAt==null&&(e.explicitOrderBy.length===0||e.explicitOrderBy.length===1&&e.explicitOrderBy[0].field.isKeyField())}function Rd(e){return e.explicitOrderBy.length>0?e.explicitOrderBy[0].field:null}function xd(e){for(const t of e.filters){const n=t.getFirstInequalityField();if(n!==null)return n}return null}function Md(e){return e.collectionGroup!==null}function be(e){const t=_(e);if(t.wt===null){t.wt=[];const n=xd(t),s=Rd(t);if(n!==null&&s===null)n.isKeyField()||t.wt.push(new an(n)),t.wt.push(new an(mt.keyField(),"asc"));else{let r=!1;for(const i of t.explicitOrderBy)t.wt.push(i),i.field.isKeyField()&&(r=!0);if(!r){const i=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";t.wt.push(new an(mt.keyField(),i))}}}return t.wt}function Kt(e){const t=_(e);if(!t._t)if(t.limitType==="F")t._t=yo(t.path,t.collectionGroup,be(t),t.filters,t.limit,t.startAt,t.endAt);else{const n=[];for(const i of be(t)){const o=i.dir==="desc"?"asc":"desc";n.push(new an(i.field,o))}const s=t.endAt?new ds(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new ds(t.startAt.position,t.startAt.inclusive):null;t._t=yo(t.path,t.collectionGroup,n,t.filters,t.limit,s,r)}return t._t}function xr(e,t,n){return new Ls(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function Ps(e,t){return pi(Kt(e),Kt(t))&&e.limitType===t.limitType}function vc(e){return`${gi(Kt(e))}|lt:${e.limitType}`}function Mr(e){return`Query(target=${function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(s=>mc(s)).join(", ")}]`),Os(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(s=>function(r){return`${r.field.canonicalString()} (${r.dir})`}(s)).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map(s=>Pe(s)).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map(s=>Pe(s)).join(",")),`Target(${n})`}(Kt(e))}; limitType=${e.limitType})`}function Fs(e,t){return t.isFoundDocument()&&function(n,s){const r=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(r):S.isDocumentKey(n.path)?n.path.isEqual(r):n.path.isImmediateParentOf(r)}(e,t)&&function(n,s){for(const r of be(n))if(!r.field.isKeyField()&&s.data.field(r.field)===null)return!1;return!0}(e,t)&&function(n,s){for(const r of n.filters)if(!r.matches(s))return!1;return!0}(e,t)&&function(n,s){return!(n.startAt&&!function(r,i,o){const a=po(r,i,o);return r.inclusive?a<=0:a<0}(n.startAt,be(n),s)||n.endAt&&!function(r,i,o){const a=po(r,i,o);return r.inclusive?a>=0:a>0}(n.endAt,be(n),s))}(e,t)}function Od(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function wc(e){return(t,n)=>{let s=!1;for(const r of be(e)){const i=Ld(r,t,n);if(i!==0)return i;s=s||r.field.isKeyField()}return 0}}function Ld(e,t,n){const s=e.field.isKeyField()?S.comparator(t.key,n.key):function(r,i,o){const a=i.data.field(r),c=o.data.field(r);return a!==null&&c!==null?Le(a,c):C()}(e.field,t,n);switch(e.dir){case"asc":return s;case"desc":return-1*s;default:return C()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(t,n){this.mapKeyFn=t,this.equalsFn=n,this.inner={},this.innerSize=0}get(t){const n=this.mapKeyFn(t),s=this.inner[n];if(s!==void 0){for(const[r,i]of s)if(this.equalsFn(r,t))return i}}has(t){return this.get(t)!==void 0}set(t,n){const s=this.mapKeyFn(t),r=this.inner[s];if(r===void 0)return this.inner[s]=[[t,n]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],t))return void(r[i]=[t,n]);r.push([t,n]),this.innerSize++}delete(t){const n=this.mapKeyFn(t),s=this.inner[n];if(s===void 0)return!1;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],t))return s.length===1?delete this.inner[n]:s.splice(r,1),this.innerSize--,!0;return!1}forEach(t){ze(this.inner,(n,s)=>{for(const[r,i]of s)t(r,i)})}isEmpty(){return uc(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pd=new W(S.comparator);function Gt(){return Pd}const Ec=new W(S.comparator);function tn(...e){let t=Ec;for(const n of e)t=t.insert(n.key,n);return t}function Tc(e){let t=Ec;return e.forEach((n,s)=>t=t.insert(n,s.overlayedDocument)),t}function ue(){return cn()}function Ic(){return cn()}function cn(){return new He(e=>e.toString(),(e,t)=>e.isEqual(t))}const Fd=new W(S.comparator),Vd=new wt(S.comparator);function b(...e){let t=Vd;for(const n of e)t=t.add(n);return t}const Ud=new wt(R);function Bd(){return Ud}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sc(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ls(t)?"-0":t}}function Cc(e){return{integerValue:""+e}}function $d(e,t){return md(t)?Cc(t):Sc(e,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs{constructor(){this._=void 0}}function jd(e,t,n){return e instanceof fs?function(s,r){const i={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return r&&li(r)&&(r=di(r)),r&&(i.fields.__previous_value__=r),{mapValue:i}}(n,t):e instanceof Tn?Dc(e,t):e instanceof In?_c(e,t):function(s,r){const i=Ac(s,r),o=wo(i)+wo(s.gt);return kr(i)&&kr(s.gt)?Cc(o):Sc(s.serializer,o)}(e,t)}function qd(e,t,n){return e instanceof Tn?Dc(e,t):e instanceof In?_c(e,t):n}function Ac(e,t){return e instanceof gs?kr(n=t)||function(s){return!!s&&"doubleValue"in s}(n)?t:{integerValue:0}:null;var n}class fs extends Vs{}class Tn extends Vs{constructor(t){super(),this.elements=t}}function Dc(e,t){const n=bc(t);for(const s of e.elements)n.some(r=>Ut(r,s))||n.push(s);return{arrayValue:{values:n}}}class In extends Vs{constructor(t){super(),this.elements=t}}function _c(e,t){let n=bc(t);for(const s of e.elements)n=n.filter(r=>!Ut(r,s));return{arrayValue:{values:n}}}class gs extends Vs{constructor(t,n){super(),this.serializer=t,this.gt=n}}function wo(e){return nt(e.integerValue||e.doubleValue)}function bc(e){return fi(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}function zd(e,t){return e.field.isEqual(t.field)&&function(n,s){return n instanceof Tn&&s instanceof Tn||n instanceof In&&s instanceof In?Oe(n.elements,s.elements,Ut):n instanceof gs&&s instanceof gs?Ut(n.gt,s.gt):n instanceof fs&&s instanceof fs}(e.transform,t.transform)}class Hd{constructor(t,n){this.version=t,this.transformResults=n}}class qt{constructor(t,n){this.updateTime=t,this.exists=n}static none(){return new qt}static exists(t){return new qt(void 0,t)}static updateTime(t){return new qt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Qn(e,t){return e.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(e.updateTime):e.exists===void 0||e.exists===t.isFoundDocument()}class Us{}function kc(e,t){if(!e.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return e.isNoDocument()?new Rc(e.key,qt.none()):new On(e.key,e.data,qt.none());{const n=e.data,s=Rt.empty();let r=new wt(mt.comparator);for(let i of t.fields)if(!r.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?s.delete(i):s.set(i,o),r=r.add(i)}return new ye(e.key,s,new Mt(r.toArray()),qt.none())}}function Kd(e,t,n){e instanceof On?function(s,r,i){const o=s.value.clone(),a=To(s.fieldTransforms,r,i.transformResults);o.setAll(a),r.convertToFoundDocument(i.version,o).setHasCommittedMutations()}(e,t,n):e instanceof ye?function(s,r,i){if(!Qn(s.precondition,r))return void r.convertToUnknownDocument(i.version);const o=To(s.fieldTransforms,r,i.transformResults),a=r.data;a.setAll(Nc(s)),a.setAll(o),r.convertToFoundDocument(i.version,a).setHasCommittedMutations()}(e,t,n):function(s,r,i){r.convertToNoDocument(i.version).setHasCommittedMutations()}(0,t,n)}function un(e,t,n,s){return e instanceof On?function(r,i,o,a){if(!Qn(r.precondition,i))return o;const c=r.value.clone(),u=Io(r.fieldTransforms,a,i);return c.setAll(u),i.convertToFoundDocument(i.version,c).setHasLocalMutations(),null}(e,t,n,s):e instanceof ye?function(r,i,o,a){if(!Qn(r.precondition,i))return o;const c=Io(r.fieldTransforms,a,i),u=i.data;return u.setAll(Nc(r)),u.setAll(c),i.convertToFoundDocument(i.version,u).setHasLocalMutations(),o===null?null:o.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map(h=>h.field))}(e,t,n,s):function(r,i,o){return Qn(r.precondition,i)?(i.convertToNoDocument(i.version).setHasLocalMutations(),null):o}(e,t,n)}function Gd(e,t){let n=null;for(const s of e.fieldTransforms){const r=t.data.field(s.field),i=Ac(s.transform,r||null);i!=null&&(n===null&&(n=Rt.empty()),n.set(s.field,i))}return n||null}function Eo(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&Oe(n,s,(r,i)=>zd(r,i))}(e.fieldTransforms,t.fieldTransforms)&&(e.type===0?e.value.isEqual(t.value):e.type!==1||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class On extends Us{constructor(t,n,s,r=[]){super(),this.key=t,this.value=n,this.precondition=s,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class ye extends Us{constructor(t,n,s,r,i=[]){super(),this.key=t,this.data=n,this.fieldMask=s,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Nc(e){const t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const s=e.data.field(n);t.set(n,s)}}),t}function To(e,t,n){const s=new Map;j(e.length===n.length);for(let r=0;r<n.length;r++){const i=e[r],o=i.transform,a=t.data.field(i.field);s.set(i.field,qd(o,a,n[r]))}return s}function Io(e,t,n){const s=new Map;for(const r of e){const i=r.transform,o=n.data.field(r.field);s.set(r.field,jd(i,o,t))}return s}class Rc extends Us{constructor(t,n){super(),this.key=t,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Qd extends Us{constructor(t,n){super(),this.key=t,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{constructor(t,n,s,r){this.batchId=t,this.localWriteTime=n,this.baseMutations=s,this.mutations=r}applyToRemoteDocument(t,n){const s=n.mutationResults;for(let r=0;r<this.mutations.length;r++){const i=this.mutations[r];i.key.isEqual(t.key)&&Kd(i,t,s[r])}}applyToLocalView(t,n){for(const s of this.baseMutations)s.key.isEqual(t.key)&&(n=un(s,t,n,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(t.key)&&(n=un(s,t,n,this.localWriteTime));return n}applyToLocalDocumentSet(t,n){const s=Ic();return this.mutations.forEach(r=>{const i=t.get(r.key),o=i.overlayedDocument;let a=this.applyToLocalView(o,i.mutatedFields);a=n.has(r.key)?null:a;const c=kc(o,a);c!==null&&s.set(r.key,c),o.isValidDocument()||o.convertToNoDocument(D.min())}),s}keys(){return this.mutations.reduce((t,n)=>t.add(n.key),b())}isEqual(t){return this.batchId===t.batchId&&Oe(this.mutations,t.mutations,(n,s)=>Eo(n,s))&&Oe(this.baseMutations,t.baseMutations,(n,s)=>Eo(n,s))}}class yi{constructor(t,n,s,r){this.batch=t,this.commitVersion=n,this.mutationResults=s,this.docVersions=r}static from(t,n,s){j(t.mutations.length===s.length);let r=Fd;const i=t.mutations;for(let o=0;o<i.length;o++)r=r.insert(i[o].key,s[o].version);return new yi(t,n,s,r)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yd{constructor(t,n){this.largestBatchId=t,this.mutation=n}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xd{constructor(t,n){this.count=t,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Z,k;function Jd(e){switch(e){default:return C();case g.CANCELLED:case g.UNKNOWN:case g.DEADLINE_EXCEEDED:case g.RESOURCE_EXHAUSTED:case g.INTERNAL:case g.UNAVAILABLE:case g.UNAUTHENTICATED:return!1;case g.INVALID_ARGUMENT:case g.NOT_FOUND:case g.ALREADY_EXISTS:case g.PERMISSION_DENIED:case g.FAILED_PRECONDITION:case g.ABORTED:case g.OUT_OF_RANGE:case g.UNIMPLEMENTED:case g.DATA_LOSS:return!0}}function xc(e){if(e===void 0)return Ht("GRPC error has no .code"),g.UNKNOWN;switch(e){case Z.OK:return g.OK;case Z.CANCELLED:return g.CANCELLED;case Z.UNKNOWN:return g.UNKNOWN;case Z.DEADLINE_EXCEEDED:return g.DEADLINE_EXCEEDED;case Z.RESOURCE_EXHAUSTED:return g.RESOURCE_EXHAUSTED;case Z.INTERNAL:return g.INTERNAL;case Z.UNAVAILABLE:return g.UNAVAILABLE;case Z.UNAUTHENTICATED:return g.UNAUTHENTICATED;case Z.INVALID_ARGUMENT:return g.INVALID_ARGUMENT;case Z.NOT_FOUND:return g.NOT_FOUND;case Z.ALREADY_EXISTS:return g.ALREADY_EXISTS;case Z.PERMISSION_DENIED:return g.PERMISSION_DENIED;case Z.FAILED_PRECONDITION:return g.FAILED_PRECONDITION;case Z.ABORTED:return g.ABORTED;case Z.OUT_OF_RANGE:return g.OUT_OF_RANGE;case Z.UNIMPLEMENTED:return g.UNIMPLEMENTED;case Z.DATA_LOSS:return g.DATA_LOSS;default:return C()}}(k=Z||(Z={}))[k.OK=0]="OK",k[k.CANCELLED=1]="CANCELLED",k[k.UNKNOWN=2]="UNKNOWN",k[k.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",k[k.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",k[k.NOT_FOUND=5]="NOT_FOUND",k[k.ALREADY_EXISTS=6]="ALREADY_EXISTS",k[k.PERMISSION_DENIED=7]="PERMISSION_DENIED",k[k.UNAUTHENTICATED=16]="UNAUTHENTICATED",k[k.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",k[k.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",k[k.ABORTED=10]="ABORTED",k[k.OUT_OF_RANGE=11]="OUT_OF_RANGE",k[k.UNIMPLEMENTED=12]="UNIMPLEMENTED",k[k.INTERNAL=13]="INTERNAL",k[k.UNAVAILABLE=14]="UNAVAILABLE",k[k.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(){this.onExistenceFilterMismatchCallbacks=new Map}static get instance(){return Hn}static getOrCreateInstance(){return Hn===null&&(Hn=new vi),Hn}onExistenceFilterMismatch(t){const n=Symbol();return this.onExistenceFilterMismatchCallbacks.set(n,t),()=>this.onExistenceFilterMismatchCallbacks.delete(n)}notifyOnExistenceFilterMismatch(t){this.onExistenceFilterMismatchCallbacks.forEach(n=>n(t))}}let Hn=null;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zd(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tf=new _e([4294967295,4294967295],0);function So(e){const t=Zd().encode(e),n=new ed;return n.update(t),new Uint8Array(n.digest())}function Co(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),s=t.getUint32(4,!0),r=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new _e([n,s],0),new _e([r,i],0)]}class wi{constructor(t,n,s){if(this.bitmap=t,this.padding=n,this.hashCount=s,n<0||n>=8)throw new en(`Invalid padding: ${n}`);if(s<0)throw new en(`Invalid hash count: ${s}`);if(t.length>0&&this.hashCount===0)throw new en(`Invalid hash count: ${s}`);if(t.length===0&&n!==0)throw new en(`Invalid padding when bitmap length is 0: ${n}`);this.It=8*t.length-n,this.Tt=_e.fromNumber(this.It)}Et(t,n,s){let r=t.add(n.multiply(_e.fromNumber(s)));return r.compare(tf)===1&&(r=new _e([r.getBits(0),r.getBits(1)],0)),r.modulo(this.Tt).toNumber()}At(t){return(this.bitmap[Math.floor(t/8)]&1<<t%8)!=0}vt(t){if(this.It===0)return!1;const n=So(t),[s,r]=Co(n);for(let i=0;i<this.hashCount;i++){const o=this.Et(s,r,i);if(!this.At(o))return!1}return!0}static create(t,n,s){const r=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),o=new wi(i,r,n);return s.forEach(a=>o.insert(a)),o}insert(t){if(this.It===0)return;const n=So(t),[s,r]=Co(n);for(let i=0;i<this.hashCount;i++){const o=this.Et(s,r,i);this.Rt(o)}}Rt(t){const n=Math.floor(t/8),s=t%8;this.bitmap[n]|=1<<s}}class en extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(t,n,s,r,i){this.snapshotVersion=t,this.targetChanges=n,this.targetMismatches=s,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,n,s){const r=new Map;return r.set(t,Ln.createSynthesizedTargetChangeForCurrentChange(t,n,s)),new Bs(D.min(),r,new W(R),Gt(),b())}}class Ln{constructor(t,n,s,r,i){this.resumeToken=t,this.current=n,this.addedDocuments=s,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,n,s){return new Ln(s,n,b(),b(),b())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn{constructor(t,n,s,r){this.Pt=t,this.removedTargetIds=n,this.key=s,this.bt=r}}class Mc{constructor(t,n){this.targetId=t,this.Vt=n}}class Oc{constructor(t,n,s=Et.EMPTY_BYTE_STRING,r=null){this.state=t,this.targetIds=n,this.resumeToken=s,this.cause=r}}class Ao{constructor(){this.St=0,this.Dt=_o(),this.Ct=Et.EMPTY_BYTE_STRING,this.xt=!1,this.Nt=!0}get current(){return this.xt}get resumeToken(){return this.Ct}get kt(){return this.St!==0}get Mt(){return this.Nt}$t(t){t.approximateByteSize()>0&&(this.Nt=!0,this.Ct=t)}Ot(){let t=b(),n=b(),s=b();return this.Dt.forEach((r,i)=>{switch(i){case 0:t=t.add(r);break;case 2:n=n.add(r);break;case 1:s=s.add(r);break;default:C()}}),new Ln(this.Ct,this.xt,t,n,s)}Ft(){this.Nt=!1,this.Dt=_o()}Bt(t,n){this.Nt=!0,this.Dt=this.Dt.insert(t,n)}Lt(t){this.Nt=!0,this.Dt=this.Dt.remove(t)}qt(){this.St+=1}Ut(){this.St-=1}Kt(){this.Nt=!0,this.xt=!0}}class ef{constructor(t){this.Gt=t,this.Qt=new Map,this.jt=Gt(),this.zt=Do(),this.Wt=new W(R)}Ht(t){for(const n of t.Pt)t.bt&&t.bt.isFoundDocument()?this.Jt(n,t.bt):this.Yt(n,t.key,t.bt);for(const n of t.removedTargetIds)this.Yt(n,t.key,t.bt)}Xt(t){this.forEachTarget(t,n=>{const s=this.Zt(n);switch(t.state){case 0:this.te(n)&&s.$t(t.resumeToken);break;case 1:s.Ut(),s.kt||s.Ft(),s.$t(t.resumeToken);break;case 2:s.Ut(),s.kt||this.removeTarget(n);break;case 3:this.te(n)&&(s.Kt(),s.$t(t.resumeToken));break;case 4:this.te(n)&&(this.ee(n),s.$t(t.resumeToken));break;default:C()}})}forEachTarget(t,n){t.targetIds.length>0?t.targetIds.forEach(n):this.Qt.forEach((s,r)=>{this.te(r)&&n(r)})}ne(t){var n;const s=t.targetId,r=t.Vt.count,i=this.se(s);if(i){const o=i.target;if(Rr(o))if(r===0){const a=new S(o.path);this.Yt(s,a,pt.newNoDocument(a,D.min()))}else j(r===1);else{const a=this.ie(s);if(a!==r){const c=this.re(t,a);if(c!==0){this.ee(s);const u=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Wt=this.Wt.insert(s,u)}(n=vi.instance)===null||n===void 0||n.notifyOnExistenceFilterMismatch(function(u,h,l){var f,d,m,v,w,x;const V={localCacheCount:h,existenceFilterCount:l.count},U=l.unchangedNames;return U&&(V.bloomFilter={applied:u===0,hashCount:(f=U==null?void 0:U.hashCount)!==null&&f!==void 0?f:0,bitmapLength:(v=(m=(d=U==null?void 0:U.bits)===null||d===void 0?void 0:d.bitmap)===null||m===void 0?void 0:m.length)!==null&&v!==void 0?v:0,padding:(x=(w=U==null?void 0:U.bits)===null||w===void 0?void 0:w.padding)!==null&&x!==void 0?x:0}),V}(c,a,t.Vt))}}}}re(t,n){const{unchangedNames:s,count:r}=t.Vt;if(!s||!s.bits)return 1;const{bits:{bitmap:i="",padding:o=0},hashCount:a=0}=s;let c,u;try{c=ge(i).toUint8Array()}catch(h){if(h instanceof hc)return Me("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),1;throw h}try{u=new wi(c,o,a)}catch(h){return Me(h instanceof en?"BloomFilter error: ":"Applying bloom filter failed: ",h),1}return u.It===0?1:r!==n-this.oe(t.targetId,u)?2:0}oe(t,n){const s=this.Gt.getRemoteKeysForTarget(t);let r=0;return s.forEach(i=>{const o=this.Gt.ue(),a=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;n.vt(a)||(this.Yt(t,i,null),r++)}),r}ce(t){const n=new Map;this.Qt.forEach((i,o)=>{const a=this.se(o);if(a){if(i.current&&Rr(a.target)){const c=new S(a.target.path);this.jt.get(c)!==null||this.ae(o,c)||this.Yt(o,c,pt.newNoDocument(c,t))}i.Mt&&(n.set(o,i.Ot()),i.Ft())}});let s=b();this.zt.forEach((i,o)=>{let a=!0;o.forEachWhile(c=>{const u=this.se(c);return!u||u.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)}),a&&(s=s.add(i))}),this.jt.forEach((i,o)=>o.setReadTime(t));const r=new Bs(t,n,this.Wt,this.jt,s);return this.jt=Gt(),this.zt=Do(),this.Wt=new W(R),r}Jt(t,n){if(!this.te(t))return;const s=this.ae(t,n.key)?2:0;this.Zt(t).Bt(n.key,s),this.jt=this.jt.insert(n.key,n),this.zt=this.zt.insert(n.key,this.he(n.key).add(t))}Yt(t,n,s){if(!this.te(t))return;const r=this.Zt(t);this.ae(t,n)?r.Bt(n,1):r.Lt(n),this.zt=this.zt.insert(n,this.he(n).delete(t)),s&&(this.jt=this.jt.insert(n,s))}removeTarget(t){this.Qt.delete(t)}ie(t){const n=this.Zt(t).Ot();return this.Gt.getRemoteKeysForTarget(t).size+n.addedDocuments.size-n.removedDocuments.size}qt(t){this.Zt(t).qt()}Zt(t){let n=this.Qt.get(t);return n||(n=new Ao,this.Qt.set(t,n)),n}he(t){let n=this.zt.get(t);return n||(n=new wt(R),this.zt=this.zt.insert(t,n)),n}te(t){const n=this.se(t)!==null;return n||E("WatchChangeAggregator","Detected inactive target",t),n}se(t){const n=this.Qt.get(t);return n&&n.kt?null:this.Gt.le(t)}ee(t){this.Qt.set(t,new Ao),this.Gt.getRemoteKeysForTarget(t).forEach(n=>{this.Yt(t,n,null)})}ae(t,n){return this.Gt.getRemoteKeysForTarget(t).has(n)}}function Do(){return new W(S.comparator)}function _o(){return new W(S.comparator)}const nf=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),sf=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),rf=(()=>({and:"AND",or:"OR"}))();class of{constructor(t,n){this.databaseId=t,this.useProto3Json=n}}function Or(e,t){return e.useProto3Json||Os(t)?t:{value:t}}function ps(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Lc(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function af(e,t){return ps(e,t.toTimestamp())}function Vt(e){return j(!!e),D.fromTimestamp(function(t){const n=te(t);return new rt(n.seconds,n.nanos)}(e))}function Ei(e,t){return function(n){return new Q(["projects",n.projectId,"databases",n.database])}(e).child("documents").child(t).canonicalString()}function Pc(e){const t=Q.fromString(e);return j(Bc(t)),t}function Lr(e,t){return Ei(e.databaseId,t.path)}function ir(e,t){const n=Pc(t);if(n.get(1)!==e.databaseId.projectId)throw new I(g.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new I(g.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new S(Fc(n))}function Pr(e,t){return Ei(e.databaseId,t)}function cf(e){const t=Pc(e);return t.length===4?Q.emptyPath():Fc(t)}function Fr(e){return new Q(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function Fc(e){return j(e.length>4&&e.get(4)==="documents"),e.popFirst(5)}function bo(e,t,n){return{name:Lr(e,t),fields:n.value.mapValue.fields}}function uf(e,t){let n;if("targetChange"in t){t.targetChange;const s=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:C()}(t.targetChange.targetChangeType||"NO_CHANGE"),r=t.targetChange.targetIds||[],i=function(c,u){return c.useProto3Json?(j(u===void 0||typeof u=="string"),Et.fromBase64String(u||"")):(j(u===void 0||u instanceof Uint8Array),Et.fromUint8Array(u||new Uint8Array))}(e,t.targetChange.resumeToken),o=t.targetChange.cause,a=o&&function(c){const u=c.code===void 0?g.UNKNOWN:xc(c.code);return new I(u,c.message||"")}(o);n=new Oc(s,r,i,a||null)}else if("documentChange"in t){t.documentChange;const s=t.documentChange;s.document,s.document.name,s.document.updateTime;const r=ir(e,s.document.name),i=Vt(s.document.updateTime),o=s.document.createTime?Vt(s.document.createTime):D.min(),a=new Rt({mapValue:{fields:s.document.fields}}),c=pt.newFoundDocument(r,i,o,a),u=s.targetIds||[],h=s.removedTargetIds||[];n=new Wn(u,h,c.key,c)}else if("documentDelete"in t){t.documentDelete;const s=t.documentDelete;s.document;const r=ir(e,s.document),i=s.readTime?Vt(s.readTime):D.min(),o=pt.newNoDocument(r,i),a=s.removedTargetIds||[];n=new Wn([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const s=t.documentRemove;s.document;const r=ir(e,s.document),i=s.removedTargetIds||[];n=new Wn([],i,r,null)}else{if(!("filter"in t))return C();{t.filter;const s=t.filter;s.targetId;const{count:r=0,unchangedNames:i}=s,o=new Xd(r,i),a=s.targetId;n=new Mc(a,o)}}return n}function hf(e,t){let n;if(t instanceof On)n={update:bo(e,t.key,t.value)};else if(t instanceof Rc)n={delete:Lr(e,t.key)};else if(t instanceof ye)n={update:bo(e,t.key,t.data),updateMask:wf(t.fieldMask)};else{if(!(t instanceof Qd))return C();n={verify:Lr(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(s=>function(r,i){const o=i.transform;if(o instanceof fs)return{fieldPath:i.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(o instanceof Tn)return{fieldPath:i.field.canonicalString(),appendMissingElements:{values:o.elements}};if(o instanceof In)return{fieldPath:i.field.canonicalString(),removeAllFromArray:{values:o.elements}};if(o instanceof gs)return{fieldPath:i.field.canonicalString(),increment:o.gt};throw C()}(0,s))),t.precondition.isNone||(n.currentDocument=function(s,r){return r.updateTime!==void 0?{updateTime:af(s,r.updateTime)}:r.exists!==void 0?{exists:r.exists}:C()}(e,t.precondition)),n}function lf(e,t){return e&&e.length>0?(j(t!==void 0),e.map(n=>function(s,r){let i=s.updateTime?Vt(s.updateTime):Vt(r);return i.isEqual(D.min())&&(i=Vt(r)),new Hd(i,s.transformResults||[])}(n,t))):[]}function df(e,t){return{documents:[Pr(e,t.path)]}}function ff(e,t){const n={structuredQuery:{}},s=t.path;t.collectionGroup!==null?(n.parent=Pr(e,s),n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(n.parent=Pr(e,s.popLast()),n.structuredQuery.from=[{collectionId:s.lastSegment()}]);const r=function(c){if(c.length!==0)return Uc(Bt.create(c,"and"))}(t.filters);r&&(n.structuredQuery.where=r);const i=function(c){if(c.length!==0)return c.map(u=>function(h){return{field:Se(h.field),direction:mf(h.dir)}}(u))}(t.orderBy);i&&(n.structuredQuery.orderBy=i);const o=Or(e,t.limit);var a;return o!==null&&(n.structuredQuery.limit=o),t.startAt&&(n.structuredQuery.startAt={before:(a=t.startAt).inclusive,values:a.position}),t.endAt&&(n.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(t.endAt)),n}function gf(e){let t=cf(e.parent);const n=e.structuredQuery,s=n.from?n.from.length:0;let r=null;if(s>0){j(s===1);const h=n.from[0];h.allDescendants?r=h.collectionId:t=t.child(h.collectionId)}let i=[];n.where&&(i=function(h){const l=Vc(h);return l instanceof Bt&&gc(l)?l.getFilters():[l]}(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(h=>function(l){return new an(Ce(l.field),function(f){switch(f){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(l.direction))}(h)));let a=null;n.limit&&(a=function(h){let l;return l=typeof h=="object"?h.value:h,Os(l)?null:l}(n.limit));let c=null;n.startAt&&(c=function(h){const l=!!h.before,f=h.values||[];return new ds(f,l)}(n.startAt));let u=null;return n.endAt&&(u=function(h){const l=!h.before,f=h.values||[];return new ds(f,l)}(n.endAt)),Nd(t,r,o,i,a,"F",c,u)}function pf(e,t){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return C()}}(t.purpose);return n==null?null:{"goog-listen-tags":n}}function Vc(e){return e.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=Ce(t.unaryFilter.field);return st.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=Ce(t.unaryFilter.field);return st.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Ce(t.unaryFilter.field);return st.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=Ce(t.unaryFilter.field);return st.create(i,"!=",{nullValue:"NULL_VALUE"});default:return C()}}(e):e.fieldFilter!==void 0?function(t){return st.create(Ce(t.fieldFilter.field),function(n){switch(n){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return C()}}(t.fieldFilter.op),t.fieldFilter.value)}(e):e.compositeFilter!==void 0?function(t){return Bt.create(t.compositeFilter.filters.map(n=>Vc(n)),function(n){switch(n){case"AND":return"and";case"OR":return"or";default:return C()}}(t.compositeFilter.op))}(e):C()}function mf(e){return nf[e]}function yf(e){return sf[e]}function vf(e){return rf[e]}function Se(e){return{fieldPath:e.canonicalString()}}function Ce(e){return mt.fromServerFormat(e.fieldPath)}function Uc(e){return e instanceof st?function(t){if(t.op==="=="){if(go(t.value))return{unaryFilter:{field:Se(t.field),op:"IS_NAN"}};if(fo(t.value))return{unaryFilter:{field:Se(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(go(t.value))return{unaryFilter:{field:Se(t.field),op:"IS_NOT_NAN"}};if(fo(t.value))return{unaryFilter:{field:Se(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Se(t.field),op:yf(t.op),value:t.value}}}(e):e instanceof Bt?function(t){const n=t.getFilters().map(s=>Uc(s));return n.length===1?n[0]:{compositeFilter:{op:vf(t.op),filters:n}}}(e):C()}function wf(e){const t=[];return e.fields.forEach(n=>t.push(n.canonicalString())),{fieldPaths:t}}function Bc(e){return e.length>=4&&e.get(0)==="projects"&&e.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt{constructor(t,n,s,r,i=D.min(),o=D.min(),a=Et.EMPTY_BYTE_STRING,c=null){this.target=t,this.targetId=n,this.purpose=s,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=c}withSequenceNumber(t){return new Qt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,n){return new Qt(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Qt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Qt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ef{constructor(t){this.fe=t}}function Tf(e){const t=gf({parent:e.parent,structuredQuery:e.structuredQuery});return e.limitType==="LAST"?xr(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class If{constructor(){this.rn=new Sf}addToCollectionParentIndex(t,n){return this.rn.add(n),p.resolve()}getCollectionParents(t,n){return p.resolve(this.rn.getEntries(n))}addFieldIndex(t,n){return p.resolve()}deleteFieldIndex(t,n){return p.resolve()}getDocumentsMatchingTarget(t,n){return p.resolve(null)}getIndexType(t,n){return p.resolve(0)}getFieldIndexes(t,n){return p.resolve([])}getNextCollectionGroupToUpdate(t){return p.resolve(null)}getMinOffset(t,n){return p.resolve(Zt.min())}getMinOffsetFromCollectionGroup(t,n){return p.resolve(Zt.min())}updateCollectionGroup(t,n,s){return p.resolve()}updateIndexEntries(t,n){return p.resolve()}}class Sf{constructor(){this.index={}}add(t){const n=t.lastSegment(),s=t.popLast(),r=this.index[n]||new wt(Q.comparator),i=!r.has(s);return this.index[n]=r.add(s),i}has(t){const n=t.lastSegment(),s=t.popLast(),r=this.index[n];return r&&r.has(s)}getEntries(t){return(this.index[t]||new wt(Q.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(t){this.Nn=t}next(){return this.Nn+=2,this.Nn}static kn(){return new Fe(0)}static Mn(){return new Fe(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cf{constructor(){this.changes=new He(t=>t.toString(),(t,n)=>t.isEqual(n)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,n){this.assertNotApplied(),this.changes.set(t,pt.newInvalidDocument(t).setReadTime(n))}getEntry(t,n){this.assertNotApplied();const s=this.changes.get(n);return s!==void 0?p.resolve(s):this.getFromCache(t,n)}getEntries(t,n){return this.getAllFromCache(t,n)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Af{constructor(t,n){this.overlayedDocument=t,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Df{constructor(t,n,s,r){this.remoteDocumentCache=t,this.mutationQueue=n,this.documentOverlayCache=s,this.indexManager=r}getDocument(t,n){let s=null;return this.documentOverlayCache.getOverlay(t,n).next(r=>(s=r,this.remoteDocumentCache.getEntry(t,n))).next(r=>(s!==null&&un(s.mutation,r,Mt.empty(),rt.now()),r))}getDocuments(t,n){return this.remoteDocumentCache.getEntries(t,n).next(s=>this.getLocalViewOfDocuments(t,s,b()).next(()=>s))}getLocalViewOfDocuments(t,n,s=b()){const r=ue();return this.populateOverlays(t,r,n).next(()=>this.computeViews(t,n,r,s).next(i=>{let o=tn();return i.forEach((a,c)=>{o=o.insert(a,c.overlayedDocument)}),o}))}getOverlayedDocuments(t,n){const s=ue();return this.populateOverlays(t,s,n).next(()=>this.computeViews(t,n,s,b()))}populateOverlays(t,n,s){const r=[];return s.forEach(i=>{n.has(i)||r.push(i)}),this.documentOverlayCache.getOverlays(t,r).next(i=>{i.forEach((o,a)=>{n.set(o,a)})})}computeViews(t,n,s,r){let i=Gt();const o=cn(),a=cn();return n.forEach((c,u)=>{const h=s.get(u.key);r.has(u.key)&&(h===void 0||h.mutation instanceof ye)?i=i.insert(u.key,u):h!==void 0?(o.set(u.key,h.mutation.getFieldMask()),un(h.mutation,u,h.mutation.getFieldMask(),rt.now())):o.set(u.key,Mt.empty())}),this.recalculateAndSaveOverlays(t,i).next(c=>(c.forEach((u,h)=>o.set(u,h)),n.forEach((u,h)=>{var l;return a.set(u,new Af(h,(l=o.get(u))!==null&&l!==void 0?l:null))}),a))}recalculateAndSaveOverlays(t,n){const s=cn();let r=new W((o,a)=>o-a),i=b();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,n).next(o=>{for(const a of o)a.keys().forEach(c=>{const u=n.get(c);if(u===null)return;let h=s.get(c)||Mt.empty();h=a.applyToLocalView(u,h),s.set(c,h);const l=(r.get(a.batchId)||b()).add(c);r=r.insert(a.batchId,l)})}).next(()=>{const o=[],a=r.getReverseIterator();for(;a.hasNext();){const c=a.getNext(),u=c.key,h=c.value,l=Ic();h.forEach(f=>{if(!i.has(f)){const d=kc(n.get(f),s.get(f));d!==null&&l.set(f,d),i=i.add(f)}}),o.push(this.documentOverlayCache.saveOverlays(t,u,l))}return p.waitFor(o)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(t,n){return this.remoteDocumentCache.getEntries(t,n).next(s=>this.recalculateAndSaveOverlays(t,s))}getDocumentsMatchingQuery(t,n,s){return function(r){return S.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(t,n.path):Md(n)?this.getDocumentsMatchingCollectionGroupQuery(t,n,s):this.getDocumentsMatchingCollectionQuery(t,n,s)}getNextDocuments(t,n,s,r){return this.remoteDocumentCache.getAllFromCollectionGroup(t,n,s,r).next(i=>{const o=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,n,s.largestBatchId,r-i.size):p.resolve(ue());let a=-1,c=i;return o.next(u=>p.forEach(u,(h,l)=>(a<l.largestBatchId&&(a=l.largestBatchId),i.get(h)?p.resolve():this.remoteDocumentCache.getEntry(t,h).next(f=>{c=c.insert(h,f)}))).next(()=>this.populateOverlays(t,u,i)).next(()=>this.computeViews(t,c,u,b())).next(h=>({batchId:a,changes:Tc(h)})))})}getDocumentsMatchingDocumentQuery(t,n){return this.getDocument(t,new S(n)).next(s=>{let r=tn();return s.isFoundDocument()&&(r=r.insert(s.key,s)),r})}getDocumentsMatchingCollectionGroupQuery(t,n,s){const r=n.collectionGroup;let i=tn();return this.indexManager.getCollectionParents(t,r).next(o=>p.forEach(o,a=>{const c=function(u,h){return new Ls(h,null,u.explicitOrderBy.slice(),u.filters.slice(),u.limit,u.limitType,u.startAt,u.endAt)}(n,a.child(r));return this.getDocumentsMatchingCollectionQuery(t,c,s).next(u=>{u.forEach((h,l)=>{i=i.insert(h,l)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(t,n,s){let r;return this.documentOverlayCache.getOverlaysForCollection(t,n.path,s.largestBatchId).next(i=>(r=i,this.remoteDocumentCache.getDocumentsMatchingQuery(t,n,s,r))).next(i=>{r.forEach((a,c)=>{const u=c.getKey();i.get(u)===null&&(i=i.insert(u,pt.newInvalidDocument(u)))});let o=tn();return i.forEach((a,c)=>{const u=r.get(a);u!==void 0&&un(u.mutation,c,Mt.empty(),rt.now()),Fs(n,c)&&(o=o.insert(a,c))}),o})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _f{constructor(t){this.serializer=t,this.cs=new Map,this.hs=new Map}getBundleMetadata(t,n){return p.resolve(this.cs.get(n))}saveBundleMetadata(t,n){var s;return this.cs.set(n.id,{id:(s=n).id,version:s.version,createTime:Vt(s.createTime)}),p.resolve()}getNamedQuery(t,n){return p.resolve(this.hs.get(n))}saveNamedQuery(t,n){return this.hs.set(n.name,function(s){return{name:s.name,query:Tf(s.bundledQuery),readTime:Vt(s.readTime)}}(n)),p.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bf{constructor(){this.overlays=new W(S.comparator),this.ls=new Map}getOverlay(t,n){return p.resolve(this.overlays.get(n))}getOverlays(t,n){const s=ue();return p.forEach(n,r=>this.getOverlay(t,r).next(i=>{i!==null&&s.set(r,i)})).next(()=>s)}saveOverlays(t,n,s){return s.forEach((r,i)=>{this.we(t,n,i)}),p.resolve()}removeOverlaysForBatchId(t,n,s){const r=this.ls.get(s);return r!==void 0&&(r.forEach(i=>this.overlays=this.overlays.remove(i)),this.ls.delete(s)),p.resolve()}getOverlaysForCollection(t,n,s){const r=ue(),i=n.length+1,o=new S(n.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const c=a.getNext().value,u=c.getKey();if(!n.isPrefixOf(u.path))break;u.path.length===i&&c.largestBatchId>s&&r.set(c.getKey(),c)}return p.resolve(r)}getOverlaysForCollectionGroup(t,n,s,r){let i=new W((u,h)=>u-h);const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===n&&u.largestBatchId>s){let h=i.get(u.largestBatchId);h===null&&(h=ue(),i=i.insert(u.largestBatchId,h)),h.set(u.getKey(),u)}}const a=ue(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((u,h)=>a.set(u,h)),!(a.size()>=r)););return p.resolve(a)}we(t,n,s){const r=this.overlays.get(s.key);if(r!==null){const o=this.ls.get(r.largestBatchId).delete(s.key);this.ls.set(r.largestBatchId,o)}this.overlays=this.overlays.insert(s.key,new Yd(n,s));let i=this.ls.get(n);i===void 0&&(i=b(),this.ls.set(n,i)),this.ls.set(n,i.add(s.key))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti{constructor(){this.fs=new wt(it.ds),this.ws=new wt(it._s)}isEmpty(){return this.fs.isEmpty()}addReference(t,n){const s=new it(t,n);this.fs=this.fs.add(s),this.ws=this.ws.add(s)}gs(t,n){t.forEach(s=>this.addReference(s,n))}removeReference(t,n){this.ys(new it(t,n))}ps(t,n){t.forEach(s=>this.removeReference(s,n))}Is(t){const n=new S(new Q([])),s=new it(n,t),r=new it(n,t+1),i=[];return this.ws.forEachInRange([s,r],o=>{this.ys(o),i.push(o.key)}),i}Ts(){this.fs.forEach(t=>this.ys(t))}ys(t){this.fs=this.fs.delete(t),this.ws=this.ws.delete(t)}Es(t){const n=new S(new Q([])),s=new it(n,t),r=new it(n,t+1);let i=b();return this.ws.forEachInRange([s,r],o=>{i=i.add(o.key)}),i}containsKey(t){const n=new it(t,0),s=this.fs.firstAfterOrEqual(n);return s!==null&&t.isEqual(s.key)}}class it{constructor(t,n){this.key=t,this.As=n}static ds(t,n){return S.comparator(t.key,n.key)||R(t.As,n.As)}static _s(t,n){return R(t.As,n.As)||S.comparator(t.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kf{constructor(t,n){this.indexManager=t,this.referenceDelegate=n,this.mutationQueue=[],this.vs=1,this.Rs=new wt(it.ds)}checkEmpty(t){return p.resolve(this.mutationQueue.length===0)}addMutationBatch(t,n,s,r){const i=this.vs;this.vs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Wd(i,n,s,r);this.mutationQueue.push(o);for(const a of r)this.Rs=this.Rs.add(new it(a.key,i)),this.indexManager.addToCollectionParentIndex(t,a.key.path.popLast());return p.resolve(o)}lookupMutationBatch(t,n){return p.resolve(this.Ps(n))}getNextMutationBatchAfterBatchId(t,n){const s=n+1,r=this.bs(s),i=r<0?0:r;return p.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return p.resolve(this.mutationQueue.length===0?-1:this.vs-1)}getAllMutationBatches(t){return p.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,n){const s=new it(n,0),r=new it(n,Number.POSITIVE_INFINITY),i=[];return this.Rs.forEachInRange([s,r],o=>{const a=this.Ps(o.As);i.push(a)}),p.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,n){let s=new wt(R);return n.forEach(r=>{const i=new it(r,0),o=new it(r,Number.POSITIVE_INFINITY);this.Rs.forEachInRange([i,o],a=>{s=s.add(a.As)})}),p.resolve(this.Vs(s))}getAllMutationBatchesAffectingQuery(t,n){const s=n.path,r=s.length+1;let i=s;S.isDocumentKey(i)||(i=i.child(""));const o=new it(new S(i),0);let a=new wt(R);return this.Rs.forEachWhile(c=>{const u=c.key.path;return!!s.isPrefixOf(u)&&(u.length===r&&(a=a.add(c.As)),!0)},o),p.resolve(this.Vs(a))}Vs(t){const n=[];return t.forEach(s=>{const r=this.Ps(s);r!==null&&n.push(r)}),n}removeMutationBatch(t,n){j(this.Ss(n.batchId,"removed")===0),this.mutationQueue.shift();let s=this.Rs;return p.forEach(n.mutations,r=>{const i=new it(r.key,n.batchId);return s=s.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,r.key)}).next(()=>{this.Rs=s})}Cn(t){}containsKey(t,n){const s=new it(n,0),r=this.Rs.firstAfterOrEqual(s);return p.resolve(n.isEqual(r&&r.key))}performConsistencyCheck(t){return this.mutationQueue.length,p.resolve()}Ss(t,n){return this.bs(t)}bs(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Ps(t){const n=this.bs(t);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nf{constructor(t){this.Ds=t,this.docs=new W(S.comparator),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,n){const s=n.key,r=this.docs.get(s),i=r?r.size:0,o=this.Ds(n);return this.docs=this.docs.insert(s,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(t,s.path.popLast())}removeEntry(t){const n=this.docs.get(t);n&&(this.docs=this.docs.remove(t),this.size-=n.size)}getEntry(t,n){const s=this.docs.get(n);return p.resolve(s?s.document.mutableCopy():pt.newInvalidDocument(n))}getEntries(t,n){let s=Gt();return n.forEach(r=>{const i=this.docs.get(r);s=s.insert(r,i?i.document.mutableCopy():pt.newInvalidDocument(r))}),p.resolve(s)}getDocumentsMatchingQuery(t,n,s,r){let i=Gt();const o=n.path,a=new S(o.child("")),c=this.docs.getIteratorFrom(a);for(;c.hasNext();){const{key:u,value:{document:h}}=c.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||fd(dd(h),s)<=0||(r.has(h.key)||Fs(n,h))&&(i=i.insert(h.key,h.mutableCopy()))}return p.resolve(i)}getAllFromCollectionGroup(t,n,s,r){C()}Cs(t,n){return p.forEach(this.docs,s=>n(s))}newChangeBuffer(t){return new Rf(this)}getSize(t){return p.resolve(this.size)}}class Rf extends Cf{constructor(t){super(),this.os=t}applyChanges(t){const n=[];return this.changes.forEach((s,r)=>{r.isValidDocument()?n.push(this.os.addEntry(t,r)):this.os.removeEntry(s)}),p.waitFor(n)}getFromCache(t,n){return this.os.getEntry(t,n)}getAllFromCache(t,n){return this.os.getEntries(t,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xf{constructor(t){this.persistence=t,this.xs=new He(n=>gi(n),pi),this.lastRemoteSnapshotVersion=D.min(),this.highestTargetId=0,this.Ns=0,this.ks=new Ti,this.targetCount=0,this.Ms=Fe.kn()}forEachTarget(t,n){return this.xs.forEach((s,r)=>n(r)),p.resolve()}getLastRemoteSnapshotVersion(t){return p.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return p.resolve(this.Ns)}allocateTargetId(t){return this.highestTargetId=this.Ms.next(),p.resolve(this.highestTargetId)}setTargetsMetadata(t,n,s){return s&&(this.lastRemoteSnapshotVersion=s),n>this.Ns&&(this.Ns=n),p.resolve()}Fn(t){this.xs.set(t.target,t);const n=t.targetId;n>this.highestTargetId&&(this.Ms=new Fe(n),this.highestTargetId=n),t.sequenceNumber>this.Ns&&(this.Ns=t.sequenceNumber)}addTargetData(t,n){return this.Fn(n),this.targetCount+=1,p.resolve()}updateTargetData(t,n){return this.Fn(n),p.resolve()}removeTargetData(t,n){return this.xs.delete(n.target),this.ks.Is(n.targetId),this.targetCount-=1,p.resolve()}removeTargets(t,n,s){let r=0;const i=[];return this.xs.forEach((o,a)=>{a.sequenceNumber<=n&&s.get(a.targetId)===null&&(this.xs.delete(o),i.push(this.removeMatchingKeysForTargetId(t,a.targetId)),r++)}),p.waitFor(i).next(()=>r)}getTargetCount(t){return p.resolve(this.targetCount)}getTargetData(t,n){const s=this.xs.get(n)||null;return p.resolve(s)}addMatchingKeys(t,n,s){return this.ks.gs(n,s),p.resolve()}removeMatchingKeys(t,n,s){this.ks.ps(n,s);const r=this.persistence.referenceDelegate,i=[];return r&&n.forEach(o=>{i.push(r.markPotentiallyOrphaned(t,o))}),p.waitFor(i)}removeMatchingKeysForTargetId(t,n){return this.ks.Is(n),p.resolve()}getMatchingKeysForTargetId(t,n){const s=this.ks.Es(n);return p.resolve(s)}containsKey(t,n){return p.resolve(this.ks.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mf{constructor(t,n){this.$s={},this.overlays={},this.Os=new hi(0),this.Fs=!1,this.Fs=!0,this.referenceDelegate=t(this),this.Bs=new xf(this),this.indexManager=new If,this.remoteDocumentCache=function(s){return new Nf(s)}(s=>this.referenceDelegate.Ls(s)),this.serializer=new Ef(n),this.qs=new _f(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Fs=!1,Promise.resolve()}get started(){return this.Fs}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let n=this.overlays[t.toKey()];return n||(n=new bf,this.overlays[t.toKey()]=n),n}getMutationQueue(t,n){let s=this.$s[t.toKey()];return s||(s=new kf(n,this.referenceDelegate),this.$s[t.toKey()]=s),s}getTargetCache(){return this.Bs}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.qs}runTransaction(t,n,s){E("MemoryPersistence","Starting transaction:",t);const r=new Of(this.Os.next());return this.referenceDelegate.Us(),s(r).next(i=>this.referenceDelegate.Ks(r).next(()=>i)).toPromise().then(i=>(r.raiseOnCommittedEvent(),i))}Gs(t,n){return p.or(Object.values(this.$s).map(s=>()=>s.containsKey(t,n)))}}class Of extends pd{constructor(t){super(),this.currentSequenceNumber=t}}class Ii{constructor(t){this.persistence=t,this.Qs=new Ti,this.js=null}static zs(t){return new Ii(t)}get Ws(){if(this.js)return this.js;throw C()}addReference(t,n,s){return this.Qs.addReference(s,n),this.Ws.delete(s.toString()),p.resolve()}removeReference(t,n,s){return this.Qs.removeReference(s,n),this.Ws.add(s.toString()),p.resolve()}markPotentiallyOrphaned(t,n){return this.Ws.add(n.toString()),p.resolve()}removeTarget(t,n){this.Qs.Is(n.targetId).forEach(r=>this.Ws.add(r.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(t,n.targetId).next(r=>{r.forEach(i=>this.Ws.add(i.toString()))}).next(()=>s.removeTargetData(t,n))}Us(){this.js=new Set}Ks(t){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return p.forEach(this.Ws,s=>{const r=S.fromPath(s);return this.Hs(t,r).next(i=>{i||n.removeEntry(r,D.min())})}).next(()=>(this.js=null,n.apply(t)))}updateLimboDocument(t,n){return this.Hs(t,n).next(s=>{s?this.Ws.delete(n.toString()):this.Ws.add(n.toString())})}Ls(t){return 0}Hs(t,n){return p.or([()=>p.resolve(this.Qs.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(t,n),()=>this.persistence.Gs(t,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si{constructor(t,n,s,r){this.targetId=t,this.fromCache=n,this.Fi=s,this.Bi=r}static Li(t,n){let s=b(),r=b();for(const i of n.docChanges)switch(i.type){case 0:s=s.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new Si(t,n.fromCache,s,r)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lf{constructor(){this.qi=!1}initialize(t,n){this.Ui=t,this.indexManager=n,this.qi=!0}getDocumentsMatchingQuery(t,n,s,r){return this.Ki(t,n).next(i=>i||this.Gi(t,n,r,s)).next(i=>i||this.Qi(t,n))}Ki(t,n){if(vo(n))return p.resolve(null);let s=Kt(n);return this.indexManager.getIndexType(t,s).next(r=>r===0?null:(n.limit!==null&&r===1&&(n=xr(n,null,"F"),s=Kt(n)),this.indexManager.getDocumentsMatchingTarget(t,s).next(i=>{const o=b(...i);return this.Ui.getDocuments(t,o).next(a=>this.indexManager.getMinOffset(t,s).next(c=>{const u=this.ji(n,a);return this.zi(n,u,o,c.readTime)?this.Ki(t,xr(n,null,"F")):this.Wi(t,u,n,c)}))})))}Gi(t,n,s,r){return vo(n)||r.isEqual(D.min())?this.Qi(t,n):this.Ui.getDocuments(t,s).next(i=>{const o=this.ji(n,i);return this.zi(n,o,s,r)?this.Qi(t,n):(co()<=O.DEBUG&&E("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Mr(n)),this.Wi(t,o,n,ld(r,-1)))})}ji(t,n){let s=new wt(wc(t));return n.forEach((r,i)=>{Fs(t,i)&&(s=s.add(i))}),s}zi(t,n,s,r){if(t.limit===null)return!1;if(s.size!==n.size)return!0;const i=t.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Qi(t,n){return co()<=O.DEBUG&&E("QueryEngine","Using full collection scan to execute query:",Mr(n)),this.Ui.getDocumentsMatchingQuery(t,n,Zt.min())}Wi(t,n,s,r){return this.Ui.getDocumentsMatchingQuery(t,s,r).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pf{constructor(t,n,s,r){this.persistence=t,this.Hi=n,this.serializer=r,this.Ji=new W(R),this.Yi=new He(i=>gi(i),pi),this.Xi=new Map,this.Zi=t.getRemoteDocumentCache(),this.Bs=t.getTargetCache(),this.qs=t.getBundleCache(),this.tr(s)}tr(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Df(this.Zi,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Zi.setIndexManager(this.indexManager),this.Hi.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>t.collect(n,this.Ji))}}function Ff(e,t,n,s){return new Pf(e,t,n,s)}async function $c(e,t){const n=_(e);return await n.persistence.runTransaction("Handle user change","readonly",s=>{let r;return n.mutationQueue.getAllMutationBatches(s).next(i=>(r=i,n.tr(t),n.mutationQueue.getAllMutationBatches(s))).next(i=>{const o=[],a=[];let c=b();for(const u of r){o.push(u.batchId);for(const h of u.mutations)c=c.add(h.key)}for(const u of i){a.push(u.batchId);for(const h of u.mutations)c=c.add(h.key)}return n.localDocuments.getDocuments(s,c).next(u=>({er:u,removedBatchIds:o,addedBatchIds:a}))})})}function Vf(e,t){const n=_(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const r=t.batch.keys(),i=n.Zi.newChangeBuffer({trackRemovals:!0});return function(o,a,c,u){const h=c.batch,l=h.keys();let f=p.resolve();return l.forEach(d=>{f=f.next(()=>u.getEntry(a,d)).next(m=>{const v=c.docVersions.get(d);j(v!==null),m.version.compareTo(v)<0&&(h.applyToRemoteDocument(m,c),m.isValidDocument()&&(m.setReadTime(c.commitVersion),u.addEntry(m)))})}),f.next(()=>o.mutationQueue.removeMutationBatch(a,h))}(n,s,t,i).next(()=>i.apply(s)).next(()=>n.mutationQueue.performConsistencyCheck(s)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(s,r,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,function(o){let a=b();for(let c=0;c<o.mutationResults.length;++c)o.mutationResults[c].transformResults.length>0&&(a=a.add(o.batch.mutations[c].key));return a}(t))).next(()=>n.localDocuments.getDocuments(s,r))})}function jc(e){const t=_(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",n=>t.Bs.getLastRemoteSnapshotVersion(n))}function Uf(e,t){const n=_(e),s=t.snapshotVersion;let r=n.Ji;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.Zi.newChangeBuffer({trackRemovals:!0});r=n.Ji;const a=[];t.targetChanges.forEach((h,l)=>{const f=r.get(l);if(!f)return;a.push(n.Bs.removeMatchingKeys(i,h.removedDocuments,l).next(()=>n.Bs.addMatchingKeys(i,h.addedDocuments,l)));let d=f.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(l)!==null?d=d.withResumeToken(Et.EMPTY_BYTE_STRING,D.min()).withLastLimboFreeSnapshotVersion(D.min()):h.resumeToken.approximateByteSize()>0&&(d=d.withResumeToken(h.resumeToken,s)),r=r.insert(l,d),function(m,v,w){return m.resumeToken.approximateByteSize()===0||v.snapshotVersion.toMicroseconds()-m.snapshotVersion.toMicroseconds()>=3e8?!0:w.addedDocuments.size+w.modifiedDocuments.size+w.removedDocuments.size>0}(f,d,h)&&a.push(n.Bs.updateTargetData(i,d))});let c=Gt(),u=b();if(t.documentUpdates.forEach(h=>{t.resolvedLimboDocuments.has(h)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(i,h))}),a.push(Bf(i,o,t.documentUpdates).next(h=>{c=h.nr,u=h.sr})),!s.isEqual(D.min())){const h=n.Bs.getLastRemoteSnapshotVersion(i).next(l=>n.Bs.setTargetsMetadata(i,i.currentSequenceNumber,s));a.push(h)}return p.waitFor(a).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,c,u)).next(()=>c)}).then(i=>(n.Ji=r,i))}function Bf(e,t,n){let s=b(),r=b();return n.forEach(i=>s=s.add(i)),t.getEntries(e,s).next(i=>{let o=Gt();return n.forEach((a,c)=>{const u=i.get(a);c.isFoundDocument()!==u.isFoundDocument()&&(r=r.add(a)),c.isNoDocument()&&c.version.isEqual(D.min())?(t.removeEntry(a,c.readTime),o=o.insert(a,c)):!u.isValidDocument()||c.version.compareTo(u.version)>0||c.version.compareTo(u.version)===0&&u.hasPendingWrites?(t.addEntry(c),o=o.insert(a,c)):E("LocalStore","Ignoring outdated watch update for ",a,". Current version:",u.version," Watch version:",c.version)}),{nr:o,sr:r}})}function $f(e,t){const n=_(e);return n.persistence.runTransaction("Get next mutation batch","readonly",s=>(t===void 0&&(t=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(s,t)))}function jf(e,t){const n=_(e);return n.persistence.runTransaction("Allocate target","readwrite",s=>{let r;return n.Bs.getTargetData(s,t).next(i=>i?(r=i,p.resolve(r)):n.Bs.allocateTargetId(s).next(o=>(r=new Qt(t,o,"TargetPurposeListen",s.currentSequenceNumber),n.Bs.addTargetData(s,r).next(()=>r))))}).then(s=>{const r=n.Ji.get(s.targetId);return(r===null||s.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.Ji=n.Ji.insert(s.targetId,s),n.Yi.set(t,s.targetId)),s})}async function Vr(e,t,n){const s=_(e),r=s.Ji.get(t),i=n?"readwrite":"readwrite-primary";try{n||await s.persistence.runTransaction("Release target",i,o=>s.persistence.referenceDelegate.removeTarget(o,r))}catch(o){if(!Mn(o))throw o;E("LocalStore",`Failed to update sequence numbers for target ${t}: ${o}`)}s.Ji=s.Ji.remove(t),s.Yi.delete(r.target)}function ko(e,t,n){const s=_(e);let r=D.min(),i=b();return s.persistence.runTransaction("Execute query","readonly",o=>function(a,c,u){const h=_(a),l=h.Yi.get(u);return l!==void 0?p.resolve(h.Ji.get(l)):h.Bs.getTargetData(c,u)}(s,o,Kt(t)).next(a=>{if(a)return r=a.lastLimboFreeSnapshotVersion,s.Bs.getMatchingKeysForTargetId(o,a.targetId).next(c=>{i=c})}).next(()=>s.Hi.getDocumentsMatchingQuery(o,t,n?r:D.min(),n?i:b())).next(a=>(qf(s,Od(t),a),{documents:a,ir:i})))}function qf(e,t,n){let s=e.Xi.get(t)||D.min();n.forEach((r,i)=>{i.readTime.compareTo(s)>0&&(s=i.readTime)}),e.Xi.set(t,s)}class No{constructor(){this.activeTargetIds=Bd()}lr(t){this.activeTargetIds=this.activeTargetIds.add(t)}dr(t){this.activeTargetIds=this.activeTargetIds.delete(t)}hr(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class zf{constructor(){this.Hr=new No,this.Jr={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,n,s){}addLocalQueryTarget(t){return this.Hr.lr(t),this.Jr[t]||"not-current"}updateQueryState(t,n,s){this.Jr[t]=n}removeLocalQueryTarget(t){this.Hr.dr(t)}isLocalQueryTarget(t){return this.Hr.activeTargetIds.has(t)}clearQueryState(t){delete this.Jr[t]}getAllActiveQueryTargets(){return this.Hr.activeTargetIds}isActiveQueryTarget(t){return this.Hr.activeTargetIds.has(t)}start(){return this.Hr=new No,Promise.resolve()}handleUserChange(t,n,s){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hf{Yr(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro{constructor(){this.Xr=()=>this.Zr(),this.eo=()=>this.no(),this.so=[],this.io()}Yr(t){this.so.push(t)}shutdown(){window.removeEventListener("online",this.Xr),window.removeEventListener("offline",this.eo)}io(){window.addEventListener("online",this.Xr),window.addEventListener("offline",this.eo)}Zr(){E("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.so)t(0)}no(){E("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.so)t(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Kn=null;function or(){return Kn===null?Kn=268435456+Math.round(2147483648*Math.random()):Kn++,"0x"+Kn.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kf={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gf{constructor(t){this.ro=t.ro,this.oo=t.oo}uo(t){this.co=t}ao(t){this.ho=t}onMessage(t){this.lo=t}close(){this.oo()}send(t){this.ro(t)}fo(){this.co()}wo(t){this.ho(t)}_o(t){this.lo(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ft="WebChannelConnection";class Qf extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const n=t.ssl?"https":"http";this.mo=n+"://"+t.host,this.yo="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}get po(){return!1}Io(t,n,s,r,i){const o=or(),a=this.To(t,n);E("RestConnection",`Sending RPC '${t}' ${o}:`,a,s);const c={};return this.Eo(c,r,i),this.Ao(t,a,c,s).then(u=>(E("RestConnection",`Received RPC '${t}' ${o}: `,u),u),u=>{throw Me("RestConnection",`RPC '${t}' ${o} failed with error: `,u,"url: ",a,"request:",s),u})}vo(t,n,s,r,i,o){return this.Io(t,n,s,r,i)}Eo(t,n,s){t["X-Goog-Api-Client"]="gl-js/ fire/"+qe,t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((r,i)=>t[i]=r),s&&s.headers.forEach((r,i)=>t[i]=r)}To(t,n){const s=Kf[t];return`${this.mo}/v1/${n}:${s}`}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Ao(t,n,s,r){const i=or();return new Promise((o,a)=>{const c=new td;c.setWithCredentials(!0),c.listenOnce(Xl.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case rr.NO_ERROR:const h=c.getResponseJson();E(ft,`XHR for RPC '${t}' ${i} received:`,JSON.stringify(h)),o(h);break;case rr.TIMEOUT:E(ft,`RPC '${t}' ${i} timed out`),a(new I(g.DEADLINE_EXCEEDED,"Request time out"));break;case rr.HTTP_ERROR:const l=c.getStatus();if(E(ft,`RPC '${t}' ${i} failed with status:`,l,"response text:",c.getResponseText()),l>0){let f=c.getResponseJson();Array.isArray(f)&&(f=f[0]);const d=f==null?void 0:f.error;if(d&&d.status&&d.message){const m=function(v){const w=v.toLowerCase().replace(/_/g,"-");return Object.values(g).indexOf(w)>=0?w:g.UNKNOWN}(d.status);a(new I(m,d.message))}else a(new I(g.UNKNOWN,"Server responded with status "+c.getStatus()))}else a(new I(g.UNAVAILABLE,"Connection failed."));break;default:C()}}finally{E(ft,`RPC '${t}' ${i} completed.`)}});const u=JSON.stringify(r);E(ft,`RPC '${t}' ${i} sending request:`,r),c.send(n,"POST",u,s,15)})}Ro(t,n,s){const r=or(),i=[this.mo,"/","google.firestore.v1.Firestore","/",t,"/channel"],o=Wl(),a=Yl(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.xmlHttpFactory=new Zl({})),this.Eo(c.initMessageHeaders,n,s),c.encodeInitMessageHeaders=!0;const h=i.join("");E(ft,`Creating RPC '${t}' stream ${r}: ${h}`,c);const l=o.createWebChannel(h,c);let f=!1,d=!1;const m=new Gf({ro:w=>{d?E(ft,`Not sending because RPC '${t}' stream ${r} is closed:`,w):(f||(E(ft,`Opening RPC '${t}' stream ${r} transport.`),l.open(),f=!0),E(ft,`RPC '${t}' stream ${r} sending:`,w),l.send(w))},oo:()=>l.close()}),v=(w,x,V)=>{w.listen(x,U=>{try{V(U)}catch(J){setTimeout(()=>{throw J},0)}})};return v(l,jn.EventType.OPEN,()=>{d||E(ft,`RPC '${t}' stream ${r} transport opened.`)}),v(l,jn.EventType.CLOSE,()=>{d||(d=!0,E(ft,`RPC '${t}' stream ${r} transport closed`),m.wo())}),v(l,jn.EventType.ERROR,w=>{d||(d=!0,Me(ft,`RPC '${t}' stream ${r} transport errored:`,w),m.wo(new I(g.UNAVAILABLE,"The operation could not be completed")))}),v(l,jn.EventType.MESSAGE,w=>{var x;if(!d){const V=w.data[0];j(!!V);const U=V,J=U.error||((x=U[0])===null||x===void 0?void 0:x.error);if(J){E(ft,`RPC '${t}' stream ${r} received error:`,J);const Dt=J.status;let It=function(xt){const St=Z[xt];if(St!==void 0)return xc(St)}(Dt),_t=J.message;It===void 0&&(It=g.INTERNAL,_t="Unknown error status: "+Dt+" with message "+J.message),d=!0,m.wo(new I(It,_t)),l.close()}else E(ft,`RPC '${t}' stream ${r} received:`,V),m._o(V)}}),v(a,Jl.STAT_EVENT,w=>{w.stat===oo.PROXY?E(ft,`RPC '${t}' stream ${r} detected buffering proxy`):w.stat===oo.NOPROXY&&E(ft,`RPC '${t}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{m.fo()},0),m}}function ar(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $s(e){return new of(e,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qc{constructor(t,n,s=1e3,r=1.5,i=6e4){this.ii=t,this.timerId=n,this.Po=s,this.bo=r,this.Vo=i,this.So=0,this.Do=null,this.Co=Date.now(),this.reset()}reset(){this.So=0}xo(){this.So=this.Vo}No(t){this.cancel();const n=Math.floor(this.So+this.ko()),s=Math.max(0,Date.now()-this.Co),r=Math.max(0,n-s);r>0&&E("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.So} ms, delay with jitter: ${n} ms, last attempt: ${s} ms ago)`),this.Do=this.ii.enqueueAfterDelay(this.timerId,r,()=>(this.Co=Date.now(),t())),this.So*=this.bo,this.So<this.Po&&(this.So=this.Po),this.So>this.Vo&&(this.So=this.Vo)}Mo(){this.Do!==null&&(this.Do.skipDelay(),this.Do=null)}cancel(){this.Do!==null&&(this.Do.cancel(),this.Do=null)}ko(){return(Math.random()-.5)*this.So}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zc{constructor(t,n,s,r,i,o,a,c){this.ii=t,this.$o=s,this.Oo=r,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.Fo=0,this.Bo=null,this.Lo=null,this.stream=null,this.qo=new qc(t,n)}Uo(){return this.state===1||this.state===5||this.Ko()}Ko(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.Go()}async stop(){this.Uo()&&await this.close(0)}Qo(){this.state=0,this.qo.reset()}jo(){this.Ko()&&this.Bo===null&&(this.Bo=this.ii.enqueueAfterDelay(this.$o,6e4,()=>this.zo()))}Wo(t){this.Ho(),this.stream.send(t)}async zo(){if(this.Ko())return this.close(0)}Ho(){this.Bo&&(this.Bo.cancel(),this.Bo=null)}Jo(){this.Lo&&(this.Lo.cancel(),this.Lo=null)}async close(t,n){this.Ho(),this.Jo(),this.qo.cancel(),this.Fo++,t!==4?this.qo.reset():n&&n.code===g.RESOURCE_EXHAUSTED?(Ht(n.toString()),Ht("Using maximum backoff delay to prevent overloading the backend."),this.qo.xo()):n&&n.code===g.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Yo(),this.stream.close(),this.stream=null),this.state=t,await this.listener.ao(n)}Yo(){}auth(){this.state=1;const t=this.Xo(this.Fo),n=this.Fo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,r])=>{this.Fo===n&&this.Zo(s,r)},s=>{t(()=>{const r=new I(g.UNKNOWN,"Fetching auth token failed: "+s.message);return this.tu(r)})})}Zo(t,n){const s=this.Xo(this.Fo);this.stream=this.eu(t,n),this.stream.uo(()=>{s(()=>(this.state=2,this.Lo=this.ii.enqueueAfterDelay(this.Oo,1e4,()=>(this.Ko()&&(this.state=3),Promise.resolve())),this.listener.uo()))}),this.stream.ao(r=>{s(()=>this.tu(r))}),this.stream.onMessage(r=>{s(()=>this.onMessage(r))})}Go(){this.state=5,this.qo.No(async()=>{this.state=0,this.start()})}tu(t){return E("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}Xo(t){return n=>{this.ii.enqueueAndForget(()=>this.Fo===t?n():(E("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Wf extends zc{constructor(t,n,s,r,i,o){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,s,r,o),this.serializer=i}eu(t,n){return this.connection.Ro("Listen",t,n)}onMessage(t){this.qo.reset();const n=uf(this.serializer,t),s=function(r){if(!("targetChange"in r))return D.min();const i=r.targetChange;return i.targetIds&&i.targetIds.length?D.min():i.readTime?Vt(i.readTime):D.min()}(t);return this.listener.nu(n,s)}su(t){const n={};n.database=Fr(this.serializer),n.addTarget=function(r,i){let o;const a=i.target;if(o=Rr(a)?{documents:df(r,a)}:{query:ff(r,a)},o.targetId=i.targetId,i.resumeToken.approximateByteSize()>0){o.resumeToken=Lc(r,i.resumeToken);const c=Or(r,i.expectedCount);c!==null&&(o.expectedCount=c)}else if(i.snapshotVersion.compareTo(D.min())>0){o.readTime=ps(r,i.snapshotVersion.toTimestamp());const c=Or(r,i.expectedCount);c!==null&&(o.expectedCount=c)}return o}(this.serializer,t);const s=pf(this.serializer,t);s&&(n.labels=s),this.Wo(n)}iu(t){const n={};n.database=Fr(this.serializer),n.removeTarget=t,this.Wo(n)}}class Yf extends zc{constructor(t,n,s,r,i,o){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,s,r,o),this.serializer=i,this.ru=!1}get ou(){return this.ru}start(){this.ru=!1,this.lastStreamToken=void 0,super.start()}Yo(){this.ru&&this.uu([])}eu(t,n){return this.connection.Ro("Write",t,n)}onMessage(t){if(j(!!t.streamToken),this.lastStreamToken=t.streamToken,this.ru){this.qo.reset();const n=lf(t.writeResults,t.commitTime),s=Vt(t.commitTime);return this.listener.cu(s,n)}return j(!t.writeResults||t.writeResults.length===0),this.ru=!0,this.listener.au()}hu(){const t={};t.database=Fr(this.serializer),this.Wo(t)}uu(t){const n={streamToken:this.lastStreamToken,writes:t.map(s=>hf(this.serializer,s))};this.Wo(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xf extends class{}{constructor(t,n,s,r){super(),this.authCredentials=t,this.appCheckCredentials=n,this.connection=s,this.serializer=r,this.lu=!1}fu(){if(this.lu)throw new I(g.FAILED_PRECONDITION,"The client has already been terminated.")}Io(t,n,s){return this.fu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,i])=>this.connection.Io(t,n,s,r,i)).catch(r=>{throw r.name==="FirebaseError"?(r.code===g.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new I(g.UNKNOWN,r.toString())})}vo(t,n,s,r){return this.fu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.vo(t,n,s,i,o,r)).catch(i=>{throw i.name==="FirebaseError"?(i.code===g.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new I(g.UNKNOWN,i.toString())})}terminate(){this.lu=!0}}class Jf{constructor(t,n){this.asyncQueue=t,this.onlineStateHandler=n,this.state="Unknown",this.wu=0,this._u=null,this.mu=!0}gu(){this.wu===0&&(this.yu("Unknown"),this._u=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._u=null,this.pu("Backend didn't respond within 10 seconds."),this.yu("Offline"),Promise.resolve())))}Iu(t){this.state==="Online"?this.yu("Unknown"):(this.wu++,this.wu>=1&&(this.Tu(),this.pu(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.yu("Offline")))}set(t){this.Tu(),this.wu=0,t==="Online"&&(this.mu=!1),this.yu(t)}yu(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}pu(t){const n=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.mu?(Ht(n),this.mu=!1):E("OnlineStateTracker",n)}Tu(){this._u!==null&&(this._u.cancel(),this._u=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zf{constructor(t,n,s,r,i){this.localStore=t,this.datastore=n,this.asyncQueue=s,this.remoteSyncer={},this.Eu=[],this.Au=new Map,this.vu=new Set,this.Ru=[],this.Pu=i,this.Pu.Yr(o=>{s.enqueueAndForget(async()=>{ve(this)&&(E("RemoteStore","Restarting streams for network reachability change."),await async function(a){const c=_(a);c.vu.add(4),await Pn(c),c.bu.set("Unknown"),c.vu.delete(4),await js(c)}(this))})}),this.bu=new Jf(s,r)}}async function js(e){if(ve(e))for(const t of e.Ru)await t(!0)}async function Pn(e){for(const t of e.Ru)await t(!1)}function Hc(e,t){const n=_(e);n.Au.has(t.targetId)||(n.Au.set(t.targetId,t),Di(n)?Ai(n):Ke(n).Ko()&&Ci(n,t))}function Kc(e,t){const n=_(e),s=Ke(n);n.Au.delete(t),s.Ko()&&Gc(n,t),n.Au.size===0&&(s.Ko()?s.jo():ve(n)&&n.bu.set("Unknown"))}function Ci(e,t){if(e.Vu.qt(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(D.min())>0){const n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}Ke(e).su(t)}function Gc(e,t){e.Vu.qt(t),Ke(e).iu(t)}function Ai(e){e.Vu=new ef({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),le:t=>e.Au.get(t)||null,ue:()=>e.datastore.serializer.databaseId}),Ke(e).start(),e.bu.gu()}function Di(e){return ve(e)&&!Ke(e).Uo()&&e.Au.size>0}function ve(e){return _(e).vu.size===0}function Qc(e){e.Vu=void 0}async function tg(e){e.Au.forEach((t,n)=>{Ci(e,t)})}async function eg(e,t){Qc(e),Di(e)?(e.bu.Iu(t),Ai(e)):e.bu.set("Unknown")}async function ng(e,t,n){if(e.bu.set("Online"),t instanceof Oc&&t.state===2&&t.cause)try{await async function(s,r){const i=r.cause;for(const o of r.targetIds)s.Au.has(o)&&(await s.remoteSyncer.rejectListen(o,i),s.Au.delete(o),s.Vu.removeTarget(o))}(e,t)}catch(s){E("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),s),await ms(e,s)}else if(t instanceof Wn?e.Vu.Ht(t):t instanceof Mc?e.Vu.ne(t):e.Vu.Xt(t),!n.isEqual(D.min()))try{const s=await jc(e.localStore);n.compareTo(s)>=0&&await function(r,i){const o=r.Vu.ce(i);return o.targetChanges.forEach((a,c)=>{if(a.resumeToken.approximateByteSize()>0){const u=r.Au.get(c);u&&r.Au.set(c,u.withResumeToken(a.resumeToken,i))}}),o.targetMismatches.forEach((a,c)=>{const u=r.Au.get(a);if(!u)return;r.Au.set(a,u.withResumeToken(Et.EMPTY_BYTE_STRING,u.snapshotVersion)),Gc(r,a);const h=new Qt(u.target,a,c,u.sequenceNumber);Ci(r,h)}),r.remoteSyncer.applyRemoteEvent(o)}(e,n)}catch(s){E("RemoteStore","Failed to raise snapshot:",s),await ms(e,s)}}async function ms(e,t,n){if(!Mn(t))throw t;e.vu.add(1),await Pn(e),e.bu.set("Offline"),n||(n=()=>jc(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{E("RemoteStore","Retrying IndexedDB access"),await n(),e.vu.delete(1),await js(e)})}function Wc(e,t){return t().catch(n=>ms(e,n,t))}async function qs(e){const t=_(e),n=ee(t);let s=t.Eu.length>0?t.Eu[t.Eu.length-1].batchId:-1;for(;sg(t);)try{const r=await $f(t.localStore,s);if(r===null){t.Eu.length===0&&n.jo();break}s=r.batchId,rg(t,r)}catch(r){await ms(t,r)}Yc(t)&&Xc(t)}function sg(e){return ve(e)&&e.Eu.length<10}function rg(e,t){e.Eu.push(t);const n=ee(e);n.Ko()&&n.ou&&n.uu(t.mutations)}function Yc(e){return ve(e)&&!ee(e).Uo()&&e.Eu.length>0}function Xc(e){ee(e).start()}async function ig(e){ee(e).hu()}async function og(e){const t=ee(e);for(const n of e.Eu)t.uu(n.mutations)}async function ag(e,t,n){const s=e.Eu.shift(),r=yi.from(s,t,n);await Wc(e,()=>e.remoteSyncer.applySuccessfulWrite(r)),await qs(e)}async function cg(e,t){t&&ee(e).ou&&await async function(n,s){if(r=s.code,Jd(r)&&r!==g.ABORTED){const i=n.Eu.shift();ee(n).Qo(),await Wc(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s)),await qs(n)}var r}(e,t),Yc(e)&&Xc(e)}async function xo(e,t){const n=_(e);n.asyncQueue.verifyOperationInProgress(),E("RemoteStore","RemoteStore received new credentials");const s=ve(n);n.vu.add(3),await Pn(n),s&&n.bu.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.vu.delete(3),await js(n)}async function ug(e,t){const n=_(e);t?(n.vu.delete(2),await js(n)):t||(n.vu.add(2),await Pn(n),n.bu.set("Unknown"))}function Ke(e){return e.Su||(e.Su=function(t,n,s){const r=_(t);return r.fu(),new Wf(n,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)}(e.datastore,e.asyncQueue,{uo:tg.bind(null,e),ao:eg.bind(null,e),nu:ng.bind(null,e)}),e.Ru.push(async t=>{t?(e.Su.Qo(),Di(e)?Ai(e):e.bu.set("Unknown")):(await e.Su.stop(),Qc(e))})),e.Su}function ee(e){return e.Du||(e.Du=function(t,n,s){const r=_(t);return r.fu(),new Yf(n,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)}(e.datastore,e.asyncQueue,{uo:ig.bind(null,e),ao:cg.bind(null,e),au:og.bind(null,e),cu:ag.bind(null,e)}),e.Ru.push(async t=>{t?(e.Du.Qo(),await qs(e)):(await e.Du.stop(),e.Eu.length>0&&(E("RemoteStore",`Stopping write stream with ${e.Eu.length} pending writes`),e.Eu=[]))})),e.Du}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _i{constructor(t,n,s,r,i){this.asyncQueue=t,this.timerId=n,this.targetTimeMs=s,this.op=r,this.removalCallback=i,this.deferred=new le,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}static createAndSchedule(t,n,s,r,i){const o=Date.now()+s,a=new _i(t,n,o,r,i);return a.start(s),a}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new I(g.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function bi(e,t){if(Ht("AsyncQueue",`${t}: ${e}`),Mn(e))return new I(g.UNAVAILABLE,`${t}: ${e}`);throw e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(t){this.comparator=t?(n,s)=>t(n,s)||S.comparator(n.key,s.key):(n,s)=>S.comparator(n.key,s.key),this.keyedMap=tn(),this.sortedSet=new W(this.comparator)}static emptySet(t){return new ke(t.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const n=this.keyedMap.get(t);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((n,s)=>(t(n),!1))}add(t){const n=this.delete(t.key);return n.copy(n.keyedMap.insert(t.key,t),n.sortedSet.insert(t,null))}delete(t){const n=this.get(t);return n?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(n)):this}isEqual(t){if(!(t instanceof ke)||this.size!==t.size)return!1;const n=this.sortedSet.getIterator(),s=t.sortedSet.getIterator();for(;n.hasNext();){const r=n.getNext().key,i=s.getNext().key;if(!r.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach(n=>{t.push(n.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,n){const s=new ke;return s.comparator=this.comparator,s.keyedMap=t,s.sortedSet=n,s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mo{constructor(){this.Cu=new W(S.comparator)}track(t){const n=t.doc.key,s=this.Cu.get(n);s?t.type!==0&&s.type===3?this.Cu=this.Cu.insert(n,t):t.type===3&&s.type!==1?this.Cu=this.Cu.insert(n,{type:s.type,doc:t.doc}):t.type===2&&s.type===2?this.Cu=this.Cu.insert(n,{type:2,doc:t.doc}):t.type===2&&s.type===0?this.Cu=this.Cu.insert(n,{type:0,doc:t.doc}):t.type===1&&s.type===0?this.Cu=this.Cu.remove(n):t.type===1&&s.type===2?this.Cu=this.Cu.insert(n,{type:1,doc:s.doc}):t.type===0&&s.type===1?this.Cu=this.Cu.insert(n,{type:2,doc:t.doc}):C():this.Cu=this.Cu.insert(n,t)}xu(){const t=[];return this.Cu.inorderTraversal((n,s)=>{t.push(s)}),t}}class Ve{constructor(t,n,s,r,i,o,a,c,u){this.query=t,this.docs=n,this.oldDocs=s,this.docChanges=r,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=u}static fromInitialDocuments(t,n,s,r,i){const o=[];return n.forEach(a=>{o.push({type:0,doc:a})}),new Ve(t,n,ke.emptySet(n),o,s,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Ps(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const n=this.docChanges,s=t.docChanges;if(n.length!==s.length)return!1;for(let r=0;r<n.length;r++)if(n[r].type!==s[r].type||!n[r].doc.isEqual(s[r].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hg{constructor(){this.Nu=void 0,this.listeners=[]}}class lg{constructor(){this.queries=new He(t=>vc(t),Ps),this.onlineState="Unknown",this.ku=new Set}}async function dg(e,t){const n=_(e),s=t.query;let r=!1,i=n.queries.get(s);if(i||(r=!0,i=new hg),r)try{i.Nu=await n.onListen(s)}catch(o){const a=bi(o,`Initialization of query '${Mr(t.query)}' failed`);return void t.onError(a)}n.queries.set(s,i),i.listeners.push(t),t.Mu(n.onlineState),i.Nu&&t.$u(i.Nu)&&ki(n)}async function fg(e,t){const n=_(e),s=t.query;let r=!1;const i=n.queries.get(s);if(i){const o=i.listeners.indexOf(t);o>=0&&(i.listeners.splice(o,1),r=i.listeners.length===0)}if(r)return n.queries.delete(s),n.onUnlisten(s)}function gg(e,t){const n=_(e);let s=!1;for(const r of t){const i=r.query,o=n.queries.get(i);if(o){for(const a of o.listeners)a.$u(r)&&(s=!0);o.Nu=r}}s&&ki(n)}function pg(e,t,n){const s=_(e),r=s.queries.get(t);if(r)for(const i of r.listeners)i.onError(n);s.queries.delete(t)}function ki(e){e.ku.forEach(t=>{t.next()})}class mg{constructor(t,n,s){this.query=t,this.Ou=n,this.Fu=!1,this.Bu=null,this.onlineState="Unknown",this.options=s||{}}$u(t){if(!this.options.includeMetadataChanges){const s=[];for(const r of t.docChanges)r.type!==3&&s.push(r);t=new Ve(t.query,t.docs,t.oldDocs,s,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let n=!1;return this.Fu?this.Lu(t)&&(this.Ou.next(t),n=!0):this.qu(t,this.onlineState)&&(this.Uu(t),n=!0),this.Bu=t,n}onError(t){this.Ou.error(t)}Mu(t){this.onlineState=t;let n=!1;return this.Bu&&!this.Fu&&this.qu(this.Bu,t)&&(this.Uu(this.Bu),n=!0),n}qu(t,n){if(!t.fromCache)return!0;const s=n!=="Offline";return(!this.options.Ku||!s)&&(!t.docs.isEmpty()||t.hasCachedResults||n==="Offline")}Lu(t){if(t.docChanges.length>0)return!0;const n=this.Bu&&this.Bu.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}Uu(t){t=Ve.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Fu=!0,this.Ou.next(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jc{constructor(t){this.key=t}}class Zc{constructor(t){this.key=t}}class yg{constructor(t,n){this.query=t,this.Yu=n,this.Xu=null,this.hasCachedResults=!1,this.current=!1,this.Zu=b(),this.mutatedKeys=b(),this.tc=wc(t),this.ec=new ke(this.tc)}get nc(){return this.Yu}sc(t,n){const s=n?n.ic:new Mo,r=n?n.ec:this.ec;let i=n?n.mutatedKeys:this.mutatedKeys,o=r,a=!1;const c=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,u=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(t.inorderTraversal((h,l)=>{const f=r.get(h),d=Fs(this.query,l)?l:null,m=!!f&&this.mutatedKeys.has(f.key),v=!!d&&(d.hasLocalMutations||this.mutatedKeys.has(d.key)&&d.hasCommittedMutations);let w=!1;f&&d?f.data.isEqual(d.data)?m!==v&&(s.track({type:3,doc:d}),w=!0):this.rc(f,d)||(s.track({type:2,doc:d}),w=!0,(c&&this.tc(d,c)>0||u&&this.tc(d,u)<0)&&(a=!0)):!f&&d?(s.track({type:0,doc:d}),w=!0):f&&!d&&(s.track({type:1,doc:f}),w=!0,(c||u)&&(a=!0)),w&&(d?(o=o.add(d),i=v?i.add(h):i.delete(h)):(o=o.delete(h),i=i.delete(h)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const h=this.query.limitType==="F"?o.last():o.first();o=o.delete(h.key),i=i.delete(h.key),s.track({type:1,doc:h})}return{ec:o,ic:s,zi:a,mutatedKeys:i}}rc(t,n){return t.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(t,n,s){const r=this.ec;this.ec=t.ec,this.mutatedKeys=t.mutatedKeys;const i=t.ic.xu();i.sort((u,h)=>function(l,f){const d=m=>{switch(m){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return C()}};return d(l)-d(f)}(u.type,h.type)||this.tc(u.doc,h.doc)),this.oc(s);const o=n?this.uc():[],a=this.Zu.size===0&&this.current?1:0,c=a!==this.Xu;return this.Xu=a,i.length!==0||c?{snapshot:new Ve(this.query,t.ec,r,i,t.mutatedKeys,a===0,c,!1,!!s&&s.resumeToken.approximateByteSize()>0),cc:o}:{cc:o}}Mu(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({ec:this.ec,ic:new Mo,mutatedKeys:this.mutatedKeys,zi:!1},!1)):{cc:[]}}ac(t){return!this.Yu.has(t)&&!!this.ec.has(t)&&!this.ec.get(t).hasLocalMutations}oc(t){t&&(t.addedDocuments.forEach(n=>this.Yu=this.Yu.add(n)),t.modifiedDocuments.forEach(n=>{}),t.removedDocuments.forEach(n=>this.Yu=this.Yu.delete(n)),this.current=t.current)}uc(){if(!this.current)return[];const t=this.Zu;this.Zu=b(),this.ec.forEach(s=>{this.ac(s.key)&&(this.Zu=this.Zu.add(s.key))});const n=[];return t.forEach(s=>{this.Zu.has(s)||n.push(new Zc(s))}),this.Zu.forEach(s=>{t.has(s)||n.push(new Jc(s))}),n}hc(t){this.Yu=t.ir,this.Zu=b();const n=this.sc(t.documents);return this.applyChanges(n,!0)}lc(){return Ve.fromInitialDocuments(this.query,this.ec,this.mutatedKeys,this.Xu===0,this.hasCachedResults)}}class vg{constructor(t,n,s){this.query=t,this.targetId=n,this.view=s}}class wg{constructor(t){this.key=t,this.fc=!1}}class Eg{constructor(t,n,s,r,i,o){this.localStore=t,this.remoteStore=n,this.eventManager=s,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.dc={},this.wc=new He(a=>vc(a),Ps),this._c=new Map,this.mc=new Set,this.gc=new W(S.comparator),this.yc=new Map,this.Ic=new Ti,this.Tc={},this.Ec=new Map,this.Ac=Fe.Mn(),this.onlineState="Unknown",this.vc=void 0}get isPrimaryClient(){return this.vc===!0}}async function Tg(e,t){const n=Rg(e);let s,r;const i=n.wc.get(t);if(i)s=i.targetId,n.sharedClientState.addLocalQueryTarget(s),r=i.view.lc();else{const o=await jf(n.localStore,Kt(t)),a=n.sharedClientState.addLocalQueryTarget(o.targetId);s=o.targetId,r=await Ig(n,t,s,a==="current",o.resumeToken),n.isPrimaryClient&&Hc(n.remoteStore,o)}return r}async function Ig(e,t,n,s,r){e.Rc=(l,f,d)=>async function(m,v,w,x){let V=v.view.sc(w);V.zi&&(V=await ko(m.localStore,v.query,!1).then(({documents:Dt})=>v.view.sc(Dt,V)));const U=x&&x.targetChanges.get(v.targetId),J=v.view.applyChanges(V,m.isPrimaryClient,U);return Lo(m,v.targetId,J.cc),J.snapshot}(e,l,f,d);const i=await ko(e.localStore,t,!0),o=new yg(t,i.ir),a=o.sc(i.documents),c=Ln.createSynthesizedTargetChangeForCurrentChange(n,s&&e.onlineState!=="Offline",r),u=o.applyChanges(a,e.isPrimaryClient,c);Lo(e,n,u.cc);const h=new vg(t,n,o);return e.wc.set(t,h),e._c.has(n)?e._c.get(n).push(t):e._c.set(n,[t]),u.snapshot}async function Sg(e,t){const n=_(e),s=n.wc.get(t),r=n._c.get(s.targetId);if(r.length>1)return n._c.set(s.targetId,r.filter(i=>!Ps(i,t))),void n.wc.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await Vr(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),Kc(n.remoteStore,s.targetId),Ur(n,s.targetId)}).catch(xn)):(Ur(n,s.targetId),await Vr(n.localStore,s.targetId,!0))}async function Cg(e,t,n){const s=xg(e);try{const r=await function(i,o){const a=_(i),c=rt.now(),u=o.reduce((f,d)=>f.add(d.key),b());let h,l;return a.persistence.runTransaction("Locally write mutations","readwrite",f=>{let d=Gt(),m=b();return a.Zi.getEntries(f,u).next(v=>{d=v,d.forEach((w,x)=>{x.isValidDocument()||(m=m.add(w))})}).next(()=>a.localDocuments.getOverlayedDocuments(f,d)).next(v=>{h=v;const w=[];for(const x of o){const V=Gd(x,h.get(x.key).overlayedDocument);V!=null&&w.push(new ye(x.key,V,lc(V.value.mapValue),qt.exists(!0)))}return a.mutationQueue.addMutationBatch(f,c,w,o)}).next(v=>{l=v;const w=v.applyToLocalDocumentSet(h,m);return a.documentOverlayCache.saveOverlays(f,v.batchId,w)})}).then(()=>({batchId:l.batchId,changes:Tc(h)}))}(s.localStore,t);s.sharedClientState.addPendingMutation(r.batchId),function(i,o,a){let c=i.Tc[i.currentUser.toKey()];c||(c=new W(R)),c=c.insert(o,a),i.Tc[i.currentUser.toKey()]=c}(s,r.batchId,n),await Fn(s,r.changes),await qs(s.remoteStore)}catch(r){const i=bi(r,"Failed to persist write");n.reject(i)}}async function tu(e,t){const n=_(e);try{const s=await Uf(n.localStore,t);t.targetChanges.forEach((r,i)=>{const o=n.yc.get(i);o&&(j(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1),r.addedDocuments.size>0?o.fc=!0:r.modifiedDocuments.size>0?j(o.fc):r.removedDocuments.size>0&&(j(o.fc),o.fc=!1))}),await Fn(n,s,t)}catch(s){await xn(s)}}function Oo(e,t,n){const s=_(e);if(s.isPrimaryClient&&n===0||!s.isPrimaryClient&&n===1){const r=[];s.wc.forEach((i,o)=>{const a=o.view.Mu(t);a.snapshot&&r.push(a.snapshot)}),function(i,o){const a=_(i);a.onlineState=o;let c=!1;a.queries.forEach((u,h)=>{for(const l of h.listeners)l.Mu(o)&&(c=!0)}),c&&ki(a)}(s.eventManager,t),r.length&&s.dc.nu(r),s.onlineState=t,s.isPrimaryClient&&s.sharedClientState.setOnlineState(t)}}async function Ag(e,t,n){const s=_(e);s.sharedClientState.updateQueryState(t,"rejected",n);const r=s.yc.get(t),i=r&&r.key;if(i){let o=new W(S.comparator);o=o.insert(i,pt.newNoDocument(i,D.min()));const a=b().add(i),c=new Bs(D.min(),new Map,new W(R),o,a);await tu(s,c),s.gc=s.gc.remove(i),s.yc.delete(t),Ni(s)}else await Vr(s.localStore,t,!1).then(()=>Ur(s,t,n)).catch(xn)}async function Dg(e,t){const n=_(e),s=t.batch.batchId;try{const r=await Vf(n.localStore,t);nu(n,s,null),eu(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await Fn(n,r)}catch(r){await xn(r)}}async function _g(e,t,n){const s=_(e);try{const r=await function(i,o){const a=_(i);return a.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let u;return a.mutationQueue.lookupMutationBatch(c,o).next(h=>(j(h!==null),u=h.keys(),a.mutationQueue.removeMutationBatch(c,h))).next(()=>a.mutationQueue.performConsistencyCheck(c)).next(()=>a.documentOverlayCache.removeOverlaysForBatchId(c,u,o)).next(()=>a.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,u)).next(()=>a.localDocuments.getDocuments(c,u))})}(s.localStore,t);nu(s,t,n),eu(s,t),s.sharedClientState.updateMutationState(t,"rejected",n),await Fn(s,r)}catch(r){await xn(r)}}function eu(e,t){(e.Ec.get(t)||[]).forEach(n=>{n.resolve()}),e.Ec.delete(t)}function nu(e,t,n){const s=_(e);let r=s.Tc[s.currentUser.toKey()];if(r){const i=r.get(t);i&&(n?i.reject(n):i.resolve(),r=r.remove(t)),s.Tc[s.currentUser.toKey()]=r}}function Ur(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const s of e._c.get(t))e.wc.delete(s),n&&e.dc.Pc(s,n);e._c.delete(t),e.isPrimaryClient&&e.Ic.Is(t).forEach(s=>{e.Ic.containsKey(s)||su(e,s)})}function su(e,t){e.mc.delete(t.path.canonicalString());const n=e.gc.get(t);n!==null&&(Kc(e.remoteStore,n),e.gc=e.gc.remove(t),e.yc.delete(n),Ni(e))}function Lo(e,t,n){for(const s of n)s instanceof Jc?(e.Ic.addReference(s.key,t),bg(e,s)):s instanceof Zc?(E("SyncEngine","Document no longer in limbo: "+s.key),e.Ic.removeReference(s.key,t),e.Ic.containsKey(s.key)||su(e,s.key)):C()}function bg(e,t){const n=t.key,s=n.path.canonicalString();e.gc.get(n)||e.mc.has(s)||(E("SyncEngine","New document in limbo: "+n),e.mc.add(s),Ni(e))}function Ni(e){for(;e.mc.size>0&&e.gc.size<e.maxConcurrentLimboResolutions;){const t=e.mc.values().next().value;e.mc.delete(t);const n=new S(Q.fromString(t)),s=e.Ac.next();e.yc.set(s,new wg(n)),e.gc=e.gc.insert(n,s),Hc(e.remoteStore,new Qt(Kt(mi(n.path)),s,"TargetPurposeLimboResolution",hi.ct))}}async function Fn(e,t,n){const s=_(e),r=[],i=[],o=[];s.wc.isEmpty()||(s.wc.forEach((a,c)=>{o.push(s.Rc(c,t,n).then(u=>{if((u||n)&&s.isPrimaryClient&&s.sharedClientState.updateQueryState(c.targetId,u!=null&&u.fromCache?"not-current":"current"),u){r.push(u);const h=Si.Li(c.targetId,u);i.push(h)}}))}),await Promise.all(o),s.dc.nu(r),await async function(a,c){const u=_(a);try{await u.persistence.runTransaction("notifyLocalViewChanges","readwrite",h=>p.forEach(c,l=>p.forEach(l.Fi,f=>u.persistence.referenceDelegate.addReference(h,l.targetId,f)).next(()=>p.forEach(l.Bi,f=>u.persistence.referenceDelegate.removeReference(h,l.targetId,f)))))}catch(h){if(!Mn(h))throw h;E("LocalStore","Failed to update sequence numbers: "+h)}for(const h of c){const l=h.targetId;if(!h.fromCache){const f=u.Ji.get(l),d=f.snapshotVersion,m=f.withLastLimboFreeSnapshotVersion(d);u.Ji=u.Ji.insert(l,m)}}}(s.localStore,i))}async function kg(e,t){const n=_(e);if(!n.currentUser.isEqual(t)){E("SyncEngine","User change. New user:",t.toKey());const s=await $c(n.localStore,t);n.currentUser=t,function(r,i){r.Ec.forEach(o=>{o.forEach(a=>{a.reject(new I(g.CANCELLED,i))})}),r.Ec.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(t,s.removedBatchIds,s.addedBatchIds),await Fn(n,s.er)}}function Ng(e,t){const n=_(e),s=n.yc.get(t);if(s&&s.fc)return b().add(s.key);{let r=b();const i=n._c.get(t);if(!i)return r;for(const o of i){const a=n.wc.get(o);r=r.unionWith(a.view.nc)}return r}}function Rg(e){const t=_(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=tu.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Ng.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Ag.bind(null,t),t.dc.nu=gg.bind(null,t.eventManager),t.dc.Pc=pg.bind(null,t.eventManager),t}function xg(e){const t=_(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Dg.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=_g.bind(null,t),t}class Po{constructor(){this.synchronizeTabs=!1}async initialize(t){this.serializer=$s(t.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(t),this.persistence=this.createPersistence(t),await this.persistence.start(),this.localStore=this.createLocalStore(t),this.gcScheduler=this.createGarbageCollectionScheduler(t,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(t,this.localStore)}createGarbageCollectionScheduler(t,n){return null}createIndexBackfillerScheduler(t,n){return null}createLocalStore(t){return Ff(this.persistence,new Lf,t.initialUser,this.serializer)}createPersistence(t){return new Mf(Ii.zs,this.serializer)}createSharedClientState(t){return new zf}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class Mg{async initialize(t,n){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>Oo(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=kg.bind(null,this.syncEngine),await ug(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return new lg}createDatastore(t){const n=$s(t.databaseInfo.databaseId),s=(r=t.databaseInfo,new Qf(r));var r;return function(i,o,a,c){return new Xf(i,o,a,c)}(t.authCredentials,t.appCheckCredentials,s,n)}createRemoteStore(t){return n=this.localStore,s=this.datastore,r=t.asyncQueue,i=a=>Oo(this.syncEngine,a,0),o=Ro.D()?new Ro:new Hf,new Zf(n,s,r,i,o);var n,s,r,i,o}createSyncEngine(t,n){return function(s,r,i,o,a,c,u){const h=new Eg(s,r,i,o,a,c);return u&&(h.vc=!0),h}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,n)}terminate(){return async function(t){const n=_(t);E("RemoteStore","RemoteStore shutting down."),n.vu.add(5),await Pn(n),n.Pu.shutdown(),n.bu.set("Unknown")}(this.remoteStore)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Og{constructor(t){this.observer=t,this.muted=!1}next(t){this.observer.next&&this.Sc(this.observer.next,t)}error(t){this.observer.error?this.Sc(this.observer.error,t):Ht("Uncaught Error in snapshot listener:",t.toString())}Dc(){this.muted=!0}Sc(t,n){this.muted||setTimeout(()=>{this.muted||t(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lg{constructor(t,n,s,r){this.authCredentials=t,this.appCheckCredentials=n,this.asyncQueue=s,this.databaseInfo=r,this.user=gt.UNAUTHENTICATED,this.clientId=cc.A(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(s,async i=>{E("FirestoreClient","Received user=",i.uid),await this.authCredentialListener(i),this.user=i}),this.appCheckCredentials.start(s,i=>(E("FirestoreClient","Received new app check token=",i),this.appCheckCredentialListener(i,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new I(g.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const t=new le;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(n){const s=bi(n,"Failed to shutdown persistence");t.reject(s)}}),t.promise}}async function cr(e,t){e.asyncQueue.verifyOperationInProgress(),E("FirestoreClient","Initializing OfflineComponentProvider");const n=await e.getConfiguration();await t.initialize(n);let s=n.initialUser;e.setCredentialChangeListener(async r=>{s.isEqual(r)||(await $c(t.localStore,r),s=r)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function Fo(e,t){e.asyncQueue.verifyOperationInProgress();const n=await Fg(e);E("FirestoreClient","Initializing OnlineComponentProvider");const s=await e.getConfiguration();await t.initialize(n,s),e.setCredentialChangeListener(r=>xo(t.remoteStore,r)),e.setAppCheckTokenChangeListener((r,i)=>xo(t.remoteStore,i)),e._onlineComponents=t}function Pg(e){return e.name==="FirebaseError"?e.code===g.FAILED_PRECONDITION||e.code===g.UNIMPLEMENTED:!(typeof DOMException<"u"&&e instanceof DOMException)||e.code===22||e.code===20||e.code===11}async function Fg(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){E("FirestoreClient","Using user provided OfflineComponentProvider");try{await cr(e,e._uninitializedComponentsProvider._offline)}catch(t){const n=t;if(!Pg(n))throw n;Me("Error using user provided cache. Falling back to memory cache: "+n),await cr(e,new Po)}}else E("FirestoreClient","Using default OfflineComponentProvider"),await cr(e,new Po);return e._offlineComponents}async function ru(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(E("FirestoreClient","Using user provided OnlineComponentProvider"),await Fo(e,e._uninitializedComponentsProvider._online)):(E("FirestoreClient","Using default OnlineComponentProvider"),await Fo(e,new Mg))),e._onlineComponents}function Vg(e){return ru(e).then(t=>t.syncEngine)}async function Vo(e){const t=await ru(e),n=t.eventManager;return n.onListen=Tg.bind(null,t.syncEngine),n.onUnlisten=Sg.bind(null,t.syncEngine),n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iu(e){const t={};return e.timeoutSeconds!==void 0&&(t.timeoutSeconds=e.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uo=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ou(e,t,n){if(!n)throw new I(g.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function Ug(e,t,n,s){if(t===!0&&s===!0)throw new I(g.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function Bo(e){if(!S.isDocumentKey(e))throw new I(g.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function $o(e){if(S.isDocumentKey(e))throw new I(g.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function Ri(e){if(e===void 0)return"undefined";if(e===null)return"null";if(typeof e=="string")return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if(typeof e=="number"||typeof e=="boolean")return""+e;if(typeof e=="object"){if(e instanceof Array)return"an array";{const t=function(n){return n.constructor?n.constructor.name:null}(e);return t?`a custom ${t} object`:"an object"}}return typeof e=="function"?"a function":C()}function Ne(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new I(g.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Ri(e);throw new I(g.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jo{constructor(t){var n,s;if(t.host===void 0){if(t.ssl!==void 0)throw new I(g.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=(n=t.ssl)===null||n===void 0||n;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.cache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new I(g.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Ug("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=iu((s=t.experimentalLongPollingOptions)!==null&&s!==void 0?s:{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new I(g.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new I(g.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new I(g.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(n=this.experimentalLongPollingOptions,s=t.experimentalLongPollingOptions,n.timeoutSeconds===s.timeoutSeconds)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams;var n,s}}class zs{constructor(t,n,s,r){this._authCredentials=t,this._appCheckCredentials=n,this._databaseId=s,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new jo({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new I(g.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(t){if(this._settingsFrozen)throw new I(g.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new jo(t),t.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new nd;switch(n.type){case"firstParty":return new od(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new I(g.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const n=Uo.get(t);n&&(E("ComponentProvider","Removing Datastore"),Uo.delete(t),n.terminate())}(this),Promise.resolve()}}function Bg(e,t,n,s={}){var r;const i=(e=Ne(e,zs))._getSettings();if(i.host!=="firestore.googleapis.com"&&i.host!==t&&Me("Host has been set in both settings() and useEmulator(), emulator host will be used"),e._setSettings(Object.assign(Object.assign({},i),{host:`${t}:${n}`,ssl:!1})),s.mockUserToken){let o,a;if(typeof s.mockUserToken=="string")o=s.mockUserToken,a=gt.MOCK_USER;else{o=Vu(s.mockUserToken,(r=e._app)===null||r===void 0?void 0:r.options.projectId);const c=s.mockUserToken.sub||s.mockUserToken.user_id;if(!c)throw new I(g.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");a=new gt(c)}e._authCredentials=new sd(new ac(o,a))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(t,n,s){this.converter=n,this._key=s,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Jt(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new bt(this.firestore,t,this._key)}}class Hs{constructor(t,n,s){this.converter=n,this._query=s,this.type="query",this.firestore=t}withConverter(t){return new Hs(this.firestore,t,this._query)}}class Jt extends Hs{constructor(t,n,s){super(t,n,mi(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new bt(this.firestore,null,new S(t))}withConverter(t){return new Jt(this.firestore,t,this._path)}}function $g(e,t,...n){if(e=Re(e),ou("collection","path",t),e instanceof zs){const s=Q.fromString(t,...n);return $o(s),new Jt(e,null,s)}{if(!(e instanceof bt||e instanceof Jt))throw new I(g.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=e._path.child(Q.fromString(t,...n));return $o(s),new Jt(e.firestore,null,s)}}function jg(e,t,...n){if(e=Re(e),arguments.length===1&&(t=cc.A()),ou("doc","path",t),e instanceof zs){const s=Q.fromString(t,...n);return Bo(s),new bt(e,null,new S(s))}{if(!(e instanceof bt||e instanceof Jt))throw new I(g.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=e._path.child(Q.fromString(t,...n));return Bo(s),new bt(e.firestore,e instanceof Jt?e.converter:null,new S(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qg{constructor(){this.Gc=Promise.resolve(),this.Qc=[],this.jc=!1,this.zc=[],this.Wc=null,this.Hc=!1,this.Jc=!1,this.Yc=[],this.qo=new qc(this,"async_queue_retry"),this.Xc=()=>{const n=ar();n&&E("AsyncQueue","Visibility state changed to "+n.visibilityState),this.qo.Mo()};const t=ar();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Xc)}get isShuttingDown(){return this.jc}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Zc(),this.ta(t)}enterRestrictedMode(t){if(!this.jc){this.jc=!0,this.Jc=t||!1;const n=ar();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Xc)}}enqueue(t){if(this.Zc(),this.jc)return new Promise(()=>{});const n=new le;return this.ta(()=>this.jc&&this.Jc?Promise.resolve():(t().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Qc.push(t),this.ea()))}async ea(){if(this.Qc.length!==0){try{await this.Qc[0](),this.Qc.shift(),this.qo.reset()}catch(t){if(!Mn(t))throw t;E("AsyncQueue","Operation failed with retryable error: "+t)}this.Qc.length>0&&this.qo.No(()=>this.ea())}}ta(t){const n=this.Gc.then(()=>(this.Hc=!0,t().catch(s=>{this.Wc=s,this.Hc=!1;const r=function(i){let o=i.message||"";return i.stack&&(o=i.stack.includes(i.message)?i.stack:i.message+`
`+i.stack),o}(s);throw Ht("INTERNAL UNHANDLED ERROR: ",r),s}).then(s=>(this.Hc=!1,s))));return this.Gc=n,n}enqueueAfterDelay(t,n,s){this.Zc(),this.Yc.indexOf(t)>-1&&(n=0);const r=_i.createAndSchedule(this,t,n,s,i=>this.na(i));return this.zc.push(r),r}Zc(){this.Wc&&C()}verifyOperationInProgress(){}async sa(){let t;do t=this.Gc,await t;while(t!==this.Gc)}ia(t){for(const n of this.zc)if(n.timerId===t)return!0;return!1}ra(t){return this.sa().then(()=>{this.zc.sort((n,s)=>n.targetTimeMs-s.targetTimeMs);for(const n of this.zc)if(n.skipDelay(),t!=="all"&&n.timerId===t)break;return this.sa()})}oa(t){this.Yc.push(t)}na(t){const n=this.zc.indexOf(t);this.zc.splice(n,1)}}function qo(e){return function(t,n){if(typeof t!="object"||t===null)return!1;const s=t;for(const r of n)if(r in s&&typeof s[r]=="function")return!0;return!1}(e,["next","error","complete"])}class ys extends zs{constructor(t,n,s,r){super(t,n,s,r),this.type="firestore",this._queue=new qg,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||cu(this),this._firestoreClient.terminate()}}function zg(e,t){const n=typeof e=="object"?e:jh(),s=typeof e=="string"?e:t||"(default)",r=Vh(n,"firestore").getImmediate({identifier:s});if(!r._initialized){const i=Pu("firestore");i&&Bg(r,...i)}return r}function au(e){return e._firestoreClient||cu(e),e._firestoreClient.verifyNotTerminated(),e._firestoreClient}function cu(e){var t,n,s;const r=e._freezeSettings(),i=function(o,a,c,u){return new vd(o,a,c,u.host,u.ssl,u.experimentalForceLongPolling,u.experimentalAutoDetectLongPolling,iu(u.experimentalLongPollingOptions),u.useFetchStreams)}(e._databaseId,((t=e._app)===null||t===void 0?void 0:t.options.appId)||"",e._persistenceKey,r);e._firestoreClient=new Lg(e._authCredentials,e._appCheckCredentials,e._queue,i),!((n=r.cache)===null||n===void 0)&&n._offlineComponentProvider&&(!((s=r.cache)===null||s===void 0)&&s._onlineComponentProvider)&&(e._firestoreClient._uninitializedComponentsProvider={_offlineKind:r.cache.kind,_offline:r.cache._offlineComponentProvider,_online:r.cache._onlineComponentProvider})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Ue(Et.fromBase64String(t))}catch(n){throw new I(g.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(t){return new Ue(Et.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xi{constructor(...t){for(let n=0;n<t.length;++n)if(t[n].length===0)throw new I(g.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new mt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uu{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(t,n){if(!isFinite(t)||t<-90||t>90)throw new I(g.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(n)||n<-180||n>180)throw new I(g.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=t,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return R(this._lat,t._lat)||R(this._long,t._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hg=/^__.*__$/;class Kg{constructor(t,n,s){this.data=t,this.fieldMask=n,this.fieldTransforms=s}toMutation(t,n){return this.fieldMask!==null?new ye(t,this.data,this.fieldMask,n,this.fieldTransforms):new On(t,this.data,n,this.fieldTransforms)}}function hu(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw C()}}class Oi{constructor(t,n,s,r,i,o){this.settings=t,this.databaseId=n,this.serializer=s,this.ignoreUndefinedProperties=r,i===void 0&&this.ua(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get ca(){return this.settings.ca}aa(t){return new Oi(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ha(t){var n;const s=(n=this.path)===null||n===void 0?void 0:n.child(t),r=this.aa({path:s,la:!1});return r.fa(t),r}da(t){var n;const s=(n=this.path)===null||n===void 0?void 0:n.child(t),r=this.aa({path:s,la:!1});return r.ua(),r}wa(t){return this.aa({path:void 0,la:!0})}_a(t){return vs(t,this.settings.methodName,this.settings.ma||!1,this.path,this.settings.ga)}contains(t){return this.fieldMask.find(n=>t.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>t.isPrefixOf(n.field))!==void 0}ua(){if(this.path)for(let t=0;t<this.path.length;t++)this.fa(this.path.get(t))}fa(t){if(t.length===0)throw this._a("Document fields must not be empty");if(hu(this.ca)&&Hg.test(t))throw this._a('Document fields cannot begin and end with "__"')}}class Gg{constructor(t,n,s){this.databaseId=t,this.ignoreUndefinedProperties=n,this.serializer=s||$s(t)}ya(t,n,s,r=!1){return new Oi({ca:t,methodName:n,ga:s,path:mt.emptyPath(),la:!1,ma:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Qg(e){const t=e._freezeSettings(),n=$s(e._databaseId);return new Gg(e._databaseId,!!t.ignoreUndefinedProperties,n)}function Wg(e,t,n,s,r,i={}){const o=e.ya(i.merge||i.mergeFields?2:0,t,n,r);gu("Data must be an object, but it was:",o,s);const a=du(s,o);let c,u;if(i.merge)c=new Mt(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const h=[];for(const l of i.mergeFields){const f=Yg(t,l,n);if(!o.contains(f))throw new I(g.INVALID_ARGUMENT,`Field '${f}' is specified in your field mask but missing from your input data.`);Jg(h,f)||h.push(f)}c=new Mt(h),u=o.fieldTransforms.filter(l=>c.covers(l.field))}else c=null,u=o.fieldTransforms;return new Kg(new Rt(a),c,u)}function lu(e,t){if(fu(e=Re(e)))return gu("Unsupported field value:",t,e),du(e,t);if(e instanceof uu)return function(n,s){if(!hu(s.ca))throw s._a(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s._a(`${n._methodName}() is not currently supported inside arrays`);const r=n._toFieldTransform(s);r&&s.fieldTransforms.push(r)}(e,t),null;if(e===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.la&&t.ca!==4)throw t._a("Nested arrays are not supported");return function(n,s){const r=[];let i=0;for(const o of n){let a=lu(o,s.wa(i));a==null&&(a={nullValue:"NULL_VALUE"}),r.push(a),i++}return{arrayValue:{values:r}}}(e,t)}return function(n,s){if((n=Re(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return $d(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const r=rt.fromDate(n);return{timestampValue:ps(s.serializer,r)}}if(n instanceof rt){const r=new rt(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:ps(s.serializer,r)}}if(n instanceof Mi)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Ue)return{bytesValue:Lc(s.serializer,n._byteString)};if(n instanceof bt){const r=s.databaseId,i=n.firestore._databaseId;if(!i.isEqual(r))throw s._a(`Document reference is for database ${i.projectId}/${i.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:Ei(n.firestore._databaseId||s.databaseId,n._key.path)}}throw s._a(`Unsupported field value: ${Ri(n)}`)}(e,t)}function du(e,t){const n={};return uc(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):ze(e,(s,r)=>{const i=lu(r,t.ha(s));i!=null&&(n[s]=i)}),{mapValue:{fields:n}}}function fu(e){return!(typeof e!="object"||e===null||e instanceof Array||e instanceof Date||e instanceof rt||e instanceof Mi||e instanceof Ue||e instanceof bt||e instanceof uu)}function gu(e,t,n){if(!fu(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const s=Ri(n);throw s==="an object"?t._a(e+" a custom object"):t._a(e+" "+s)}}function Yg(e,t,n){if((t=Re(t))instanceof xi)return t._internalPath;if(typeof t=="string")return pu(e,t);throw vs("Field path arguments must be of type string or ",e,!1,void 0,n)}const Xg=new RegExp("[~\\*/\\[\\]]");function pu(e,t,n){if(t.search(Xg)>=0)throw vs(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new xi(...t.split("."))._internalPath}catch{throw vs(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function vs(e,t,n,s,r){const i=s&&!s.isEmpty(),o=r!==void 0;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${s}`),o&&(c+=` in document ${r}`),c+=")"),new I(g.INVALID_ARGUMENT,a+e+c)}function Jg(e,t){return e.some(n=>n.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu{constructor(t,n,s,r,i){this._firestore=t,this._userDataWriter=n,this._key=s,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new bt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Zg(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const n=this._document.data.field(yu("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n)}}}class Zg extends mu{data(){return super.data()}}function yu(e,t){return typeof t=="string"?pu(e,t):t instanceof xi?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tp(e){if(e.limitType==="L"&&e.explicitOrderBy.length===0)throw new I(g.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ep{convertValue(t,n="none"){switch(pe(t)){case 0:return null;case 1:return t.booleanValue;case 2:return nt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,n);case 5:return t.stringValue;case 6:return this.convertBytes(ge(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,n);case 10:return this.convertObject(t.mapValue,n);default:throw C()}}convertObject(t,n){return this.convertObjectMap(t.fields,n)}convertObjectMap(t,n="none"){const s={};return ze(t,(r,i)=>{s[r]=this.convertValue(i,n)}),s}convertGeoPoint(t){return new Mi(nt(t.latitude),nt(t.longitude))}convertArray(t,n){return(t.values||[]).map(s=>this.convertValue(s,n))}convertServerTimestamp(t,n){switch(n){case"previous":const s=di(t);return s==null?null:this.convertValue(s,n);case"estimate":return this.convertTimestamp(vn(t));default:return null}}convertTimestamp(t){const n=te(t);return new rt(n.seconds,n.nanos)}convertDocumentKey(t,n){const s=Q.fromString(t);j(Bc(s));const r=new wn(s.get(1),s.get(3)),i=new S(s.popFirst(5));return r.isEqual(n)||Ht(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function np(e,t,n){let s;return s=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn{constructor(t,n){this.hasPendingWrites=t,this.fromCache=n}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class vu extends mu{constructor(t,n,s,r,i,o){super(t,n,s,r,o),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const n=new Yn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,n={}){if(this._document){const s=this._document.data.field(yu("DocumentSnapshot.get",t));if(s!==null)return this._userDataWriter.convertValue(s,n.serverTimestamps)}}}class Yn extends vu{data(t={}){return super.data(t)}}class sp{constructor(t,n,s,r){this._firestore=t,this._userDataWriter=n,this._snapshot=r,this.metadata=new nn(r.hasPendingWrites,r.fromCache),this.query=s}get docs(){const t=[];return this.forEach(n=>t.push(n)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,n){this._snapshot.docs.forEach(s=>{t.call(n,new Yn(this._firestore,this._userDataWriter,s.key,s,new nn(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const n=!!t.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new I(g.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,r){if(s._snapshot.oldDocs.isEmpty()){let i=0;return s._snapshot.docChanges.map(o=>{const a=new Yn(s._firestore,s._userDataWriter,o.doc.key,o.doc,new nn(s._snapshot.mutatedKeys.has(o.doc.key),s._snapshot.fromCache),s.query.converter);return o.doc,{type:"added",doc:a,oldIndex:-1,newIndex:i++}})}{let i=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(o=>r||o.type!==3).map(o=>{const a=new Yn(s._firestore,s._userDataWriter,o.doc.key,o.doc,new nn(s._snapshot.mutatedKeys.has(o.doc.key),s._snapshot.fromCache),s.query.converter);let c=-1,u=-1;return o.type!==0&&(c=i.indexOf(o.doc.key),i=i.delete(o.doc.key)),o.type!==1&&(i=i.add(o.doc),u=i.indexOf(o.doc.key)),{type:rp(o.type),doc:a,oldIndex:c,newIndex:u}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function rp(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return C()}}class wu extends ep{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ue(t)}convertReference(t){const n=this.convertDocumentKey(t,this.firestore._databaseId);return new bt(this.firestore,null,n)}}function ip(e,t,n){e=Ne(e,bt);const s=Ne(e.firestore,ys),r=np(e.converter,t,n);return ap(s,[Wg(Qg(s),"setDoc",e._key,r,e.converter!==null,n).toMutation(e._key,qt.none())])}function op(e,...t){var n,s,r;e=Re(e);let i={includeMetadataChanges:!1},o=0;typeof t[o]!="object"||qo(t[o])||(i=t[o],o++);const a={includeMetadataChanges:i.includeMetadataChanges};if(qo(t[o])){const l=t[o];t[o]=(n=l.next)===null||n===void 0?void 0:n.bind(l),t[o+1]=(s=l.error)===null||s===void 0?void 0:s.bind(l),t[o+2]=(r=l.complete)===null||r===void 0?void 0:r.bind(l)}let c,u,h;if(e instanceof bt)u=Ne(e.firestore,ys),h=mi(e._key.path),c={next:l=>{t[o]&&t[o](cp(u,e,l))},error:t[o+1],complete:t[o+2]};else{const l=Ne(e,Hs);u=Ne(l.firestore,ys),h=l._query;const f=new wu(u);c={next:d=>{t[o]&&t[o](new sp(u,f,l,d))},error:t[o+1],complete:t[o+2]},tp(e._query)}return function(l,f,d,m){const v=new Og(m),w=new mg(f,v,d);return l.asyncQueue.enqueueAndForget(async()=>dg(await Vo(l),w)),()=>{v.Dc(),l.asyncQueue.enqueueAndForget(async()=>fg(await Vo(l),w))}}(au(u),h,a,c)}function ap(e,t){return function(n,s){const r=new le;return n.asyncQueue.enqueueAndForget(async()=>Cg(await Vg(n),s,r)),r.promise}(au(e),t)}function cp(e,t,n){const s=n.docs.get(t._key),r=new wu(e);return new vu(e,r,t._key,s,new nn(n.hasPendingWrites,n.fromCache),t.converter)}(function(e,t=!0){(function(n){qe=n})($h),ts(new hn("firestore",(n,{instanceIdentifier:s,options:r})=>{const i=n.getProvider("app").getImmediate(),o=new ys(new rd(n.getProvider("auth-internal")),new cd(n.getProvider("app-check-internal")),function(a,c){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new I(g.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new wn(a.options.projectId,c)}(i,s),i);return r=Object.assign({useFetchStreams:t},r),o._setSettings(r),o},"PUBLIC").setMultipleInstances(!0)),sn(ao,"3.12.0",e),sn(ao,"3.12.0","esm2017")})();const up=""+new URL("../assets/fitconnect-logo.14c34cd8.png",import.meta.url).href;function zo(e,t,n){const s=e.slice();return s[7]=t[n],s}function hp(e){let t,n;return{c(){t=P("p"),n=tt("No emergencies found.")},l(s){t=F(s,"P",{});var r=$(t);n=et(r,"No emergencies found."),r.forEach(N)},m(s,r){Wt(s,t,r),T(t,n)},p:Xn,d(s){s&&N(t)}}}function lp(e){let t,n,s,r,i,o,a,c,u,h,l,f,d,m,v,w,x,V,U,J,Dt,It,_t,xt,St,Lt=e[0],q=[];for(let z=0;z<Lt.length;z+=1)q[z]=Ho(zo(e,Lt,z));return{c(){t=P("table"),n=P("thead"),s=P("tr"),r=P("th"),i=tt("Emergency ID"),o=ut(),a=P("th"),c=tt("User Name"),u=ut(),h=P("th"),l=tt("Reason"),f=ut(),d=P("th"),m=tt("Location"),v=ut(),w=P("th"),x=tt("Timestamp"),V=ut(),U=P("th"),J=tt("Status"),Dt=ut(),It=P("th"),_t=tt("Actions"),xt=ut(),St=P("tbody");for(let z=0;z<q.length;z+=1)q[z].c();this.h()},l(z){t=F(z,"TABLE",{class:!0});var Ct=$(t);n=F(Ct,"THEAD",{});var H=$(n);s=F(H,"TR",{});var B=$(s);r=F(B,"TH",{class:!0});var we=$(r);i=et(we,"Emergency ID"),we.forEach(N),o=ht(B),a=F(B,"TH",{class:!0});var Ge=$(a);c=et(Ge,"User Name"),Ge.forEach(N),u=ht(B),h=F(B,"TH",{class:!0});var re=$(h);l=et(re,"Reason"),re.forEach(N),f=ht(B),d=F(B,"TH",{class:!0});var At=$(d);m=et(At,"Location"),At.forEach(N),v=ht(B),w=F(B,"TH",{class:!0});var X=$(w);x=et(X,"Timestamp"),X.forEach(N),V=ht(B),U=F(B,"TH",{class:!0});var M=$(U);J=et(M,"Status"),M.forEach(N),Dt=ht(B),It=F(B,"TH",{class:!0});var Qe=$(It);_t=et(Qe,"Actions"),Qe.forEach(N),B.forEach(N),H.forEach(N),xt=ht(Ct),St=F(Ct,"TBODY",{});var We=$(St);for(let Ee=0;Ee<q.length;Ee+=1)q[Ee].l(We);We.forEach(N),Ct.forEach(N),this.h()},h(){K(r,"class","svelte-18qr2hd"),K(a,"class","svelte-18qr2hd"),K(h,"class","svelte-18qr2hd"),K(d,"class","svelte-18qr2hd"),K(w,"class","svelte-18qr2hd"),K(U,"class","svelte-18qr2hd"),K(It,"class","svelte-18qr2hd"),K(t,"class","svelte-18qr2hd")},m(z,Ct){Wt(z,t,Ct),T(t,n),T(n,s),T(s,r),T(r,i),T(s,o),T(s,a),T(a,c),T(s,u),T(s,h),T(h,l),T(s,f),T(s,d),T(d,m),T(s,v),T(s,w),T(w,x),T(s,V),T(s,U),T(U,J),T(s,Dt),T(s,It),T(It,_t),T(t,xt),T(t,St);for(let H=0;H<q.length;H+=1)q[H]&&q[H].m(St,null)},p(z,Ct){if(Ct&3){Lt=z[0];let H;for(H=0;H<Lt.length;H+=1){const B=zo(z,Lt,H);q[H]?q[H].p(B,Ct):(q[H]=Ho(B),q[H].c(),q[H].m(St,null))}for(;H<q.length;H+=1)q[H].d(1);q.length=Lt.length}},d(z){z&&N(t),Au(q,z)}}}function dp(e){let t,n;return{c(){t=P("p"),n=tt("No action available")},l(s){t=F(s,"P",{});var r=$(t);n=et(r,"No action available"),r.forEach(N)},m(s,r){Wt(s,t,r),T(t,n)},p:Xn,d(s){s&&N(t)}}}function fp(e){let t,n,s,r;function i(){return e[2](e[7])}return{c(){t=P("button"),n=tt("Approve"),this.h()},l(o){t=F(o,"BUTTON",{class:!0});var a=$(t);n=et(a,"Approve"),a.forEach(N),this.h()},h(){K(t,"class","svelte-18qr2hd")},m(o,a){Wt(o,t,a),T(t,n),s||(r=Du(t,"click",i),s=!0)},p(o,a){e=o},d(o){o&&N(t),s=!1,r()}}}function Ho(e){let t,n,s=e[7].id.slice(0,8)+"",r,i,o,a=e[7].userName+"",c,u,h,l=e[7].reason+"",f,d,m,v,w=e[7].location.latitude.toFixed(2)+"",x,V,U,J=e[7].location.longitude.toFixed(2)+"",Dt,It,_t,xt=e[7].timestamp.toDate().toLocaleString()+"",St,Lt,q,z=e[7].status+"",Ct,H,B,we;function Ge(X,M){return X[7].status==="PENDING"?fp:dp}let re=Ge(e),At=re(e);return{c(){t=P("tr"),n=P("td"),r=tt(s),i=ut(),o=P("td"),c=tt(a),u=ut(),h=P("td"),f=tt(l),d=ut(),m=P("td"),v=tt("Lat. "),x=tt(w),V=P("br"),U=tt(`
							Lon. `),Dt=tt(J),It=ut(),_t=P("td"),St=tt(xt),Lt=ut(),q=P("td"),Ct=tt(z),H=ut(),B=P("td"),At.c(),we=ut(),this.h()},l(X){t=F(X,"TR",{});var M=$(t);n=F(M,"TD",{class:!0});var Qe=$(n);r=et(Qe,s),Qe.forEach(N),i=ht(M),o=F(M,"TD",{class:!0});var We=$(o);c=et(We,a),We.forEach(N),u=ht(M),h=F(M,"TD",{class:!0});var Ee=$(h);f=et(Ee,l),Ee.forEach(N),d=ht(M),m=F(M,"TD",{class:!0});var Te=$(m);v=et(Te,"Lat. "),x=et(Te,w),V=F(Te,"BR",{}),U=et(Te,`
							Lon. `),Dt=et(Te,J),Te.forEach(N),It=ht(M),_t=F(M,"TD",{class:!0});var Li=$(_t);St=et(Li,xt),Li.forEach(N),Lt=ht(M),q=F(M,"TD",{class:!0});var Pi=$(q);Ct=et(Pi,z),Pi.forEach(N),H=ht(M),B=F(M,"TD",{class:!0});var Fi=$(B);At.l(Fi),Fi.forEach(N),we=ht(M),M.forEach(N),this.h()},h(){K(n,"class","svelte-18qr2hd"),K(o,"class","svelte-18qr2hd"),K(h,"class","svelte-18qr2hd"),K(m,"class","svelte-18qr2hd"),K(_t,"class","svelte-18qr2hd"),K(q,"class","svelte-18qr2hd"),K(B,"class","actions svelte-18qr2hd")},m(X,M){Wt(X,t,M),T(t,n),T(n,r),T(t,i),T(t,o),T(o,c),T(t,u),T(t,h),T(h,f),T(t,d),T(t,m),T(m,v),T(m,x),T(m,V),T(m,U),T(m,Dt),T(t,It),T(t,_t),T(_t,St),T(t,Lt),T(t,q),T(q,Ct),T(t,H),T(t,B),At.m(B,null),T(t,we)},p(X,M){M&1&&s!==(s=X[7].id.slice(0,8)+"")&&ie(r,s),M&1&&a!==(a=X[7].userName+"")&&ie(c,a),M&1&&l!==(l=X[7].reason+"")&&ie(f,l),M&1&&w!==(w=X[7].location.latitude.toFixed(2)+"")&&ie(x,w),M&1&&J!==(J=X[7].location.longitude.toFixed(2)+"")&&ie(Dt,J),M&1&&xt!==(xt=X[7].timestamp.toDate().toLocaleString()+"")&&ie(St,xt),M&1&&z!==(z=X[7].status+"")&&ie(Ct,z),re===(re=Ge(X))&&At?At.p(X,M):(At.d(1),At=re(X),At&&(At.c(),At.m(B,null)))},d(X){X&&N(t),At.d()}}}function gp(e){let t,n,s,r,i,o,a,c,u,h;function l(m,v){return m[0].length>0?lp:hp}let f=l(e),d=f(e);return{c(){t=P("link"),n=ut(),s=P("div"),r=P("div"),i=P("img"),a=ut(),c=P("h1"),u=tt("FitConnect Emergencies"),h=ut(),d.c(),this.h()},l(m){t=F(m,"LINK",{rel:!0,href:!0}),n=ht(m),s=F(m,"DIV",{class:!0});var v=$(s);r=F(v,"DIV",{class:!0});var w=$(r);i=F(w,"IMG",{src:!0,alt:!0,class:!0}),a=ht(w),c=F(w,"H1",{class:!0});var x=$(c);u=et(x,"FitConnect Emergencies"),x.forEach(N),w.forEach(N),h=ht(v),d.l(v),v.forEach(N),this.h()},h(){K(t,"rel","stylesheet"),K(t,"href","https://fonts.googleapis.com/css?family=Roboto"),Su(i.src,o=up)||K(i,"src",o),K(i,"alt","FitConnect Logo"),K(i,"class","logo svelte-18qr2hd"),K(c,"class","title svelte-18qr2hd"),K(r,"class","header svelte-18qr2hd"),K(s,"class","container svelte-18qr2hd")},m(m,v){Wt(m,t,v),Wt(m,n,v),Wt(m,s,v),T(s,r),T(r,i),T(r,a),T(r,c),T(c,u),T(s,h),d.m(s,null)},p(m,[v]){f===(f=l(m))&&d?d.p(m,v):(d.d(1),d=f(m),d&&(d.c(),d.m(s,null)))},i:Xn,o:Xn,d(m){m&&N(t),m&&N(n),m&&N(s),d.d()}}}function pp(e,t,n){const r=ta({apiKey:"AIzaSyCB9PXVoKwQnOpSnuhQgHvMzkSb_BNCqyg",authDomain:"fitconnect-be78b.firebaseapp.com",projectId:"fitconnect-be78b",storageBucket:"fitconnect-be78b.appspot.com",messagingSenderId:"169795872766",appId:"1:169795872766:web:cf3a969e64724e021202af",measurementId:"G-EPGVXR12QD"}),i=zg(r);let o=[];const a=op($g(i,"emergencies"),h=>{n(0,o=[]),h.forEach(l=>{o.push({id:l.id,...l.data()})}),console.log("Current emergencies: ",o)});Cu(()=>()=>{a()});async function c(h){await ip(jg(i,"emergencies",h),{...o.find(l=>l.id===h),status:"APPROVED"})}return[o,c,h=>c(h.id)]}class yp extends Eu{constructor(t){super(),Tu(this,t,pp,gp,Iu,{})}}export{yp as component};
