!function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function n(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{"D3/3":function(e,t,n){"use strict";var o=Array.isArray,r=Object.keys,a=Object.prototype.hasOwnProperty;e.exports=function e(t,n){if(t===n)return!0;if(t&&n&&"object"==typeof t&&"object"==typeof n){var i,c,s,p=o(t),u=o(n);if(p&&u){if((c=t.length)!=n.length)return!1;for(i=c;0!=i--;)if(!e(t[i],n[i]))return!1;return!0}if(p!=u)return!1;var l=t instanceof Date,f=n instanceof Date;if(l!=f)return!1;if(l&&f)return t.getTime()==n.getTime();var d=t instanceof RegExp,h=n instanceof RegExp;if(d!=h)return!1;if(d&&h)return t.toString()==n.toString();var m=r(t);if((c=m.length)!==r(n).length)return!1;for(i=c;0!=i--;)if(!a.call(n,m[i]))return!1;for(i=c;0!=i--;)if(!e(t[s=m[i]],n[s]))return!1;return!0}return t!=t&&n!=n}},LxLq:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var o=n("D3/3"),r=n("YorD");t.JsonPatchError=r.PatchError,t.deepClone=r._deepClone;var a={add:function(e,t,n){return e[t]=this.value,{newDocument:n}},remove:function(e,t,n){var o=e[t];return delete e[t],{newDocument:n,removed:o}},replace:function(e,t,n){var o=e[t];return e[t]=this.value,{newDocument:n,removed:o}},move:function(e,t,n){var o=c(n,this.path);o&&(o=r._deepClone(o));var a=s(n,{op:"remove",path:this.from}).removed;return s(n,{op:"add",path:this.path,value:a}),{newDocument:n,removed:o}},copy:function(e,t,n){var o=c(n,this.from);return s(n,{op:"add",path:this.path,value:r._deepClone(o)}),{newDocument:n}},test:function(e,t,n){return{newDocument:n,test:o(e[t],this.value)}},_get:function(e,t,n){return this.value=e[t],{newDocument:n}}},i={add:function(e,t,n){return r.isInteger(t)?e.splice(t,0,this.value):e[t]=this.value,{newDocument:n,index:t}},remove:function(e,t,n){return{newDocument:n,removed:e.splice(t,1)[0]}},replace:function(e,t,n){var o=e[t];return e[t]=this.value,{newDocument:n,removed:o}},move:a.move,copy:a.copy,test:a.test,_get:a._get};function c(e,t){if(""==t)return e;var n={op:"_get",path:t};return s(e,n),n.value}function s(e,n,s,p,u,f){if(void 0===s&&(s=!1),void 0===p&&(p=!0),void 0===u&&(u=!0),void 0===f&&(f=0),s&&("function"==typeof s?s(n,0,e,n.path):l(n,0)),""===n.path){var d={newDocument:e};if("add"===n.op)return d.newDocument=n.value,d;if("replace"===n.op)return d.newDocument=n.value,d.removed=e,d;if("move"===n.op||"copy"===n.op)return d.newDocument=c(e,n.from),"move"===n.op&&(d.removed=e),d;if("test"===n.op){if(d.test=o(e,n.value),!1===d.test)throw new t.JsonPatchError("Test operation failed","TEST_OPERATION_FAILED",f,n,e);return d.newDocument=e,d}if("remove"===n.op)return d.removed=e,d.newDocument=null,d;if("_get"===n.op)return n.value=e,d;if(s)throw new t.JsonPatchError("Operation `op` property is not one of operations defined in RFC-6902","OPERATION_OP_INVALID",f,n,e);return d}p||(e=r._deepClone(e));var h=(n.path||"").split("/"),m=e,v=1,b=h.length,w=void 0,y=void 0,g=void 0;for(g="function"==typeof s?s:l;;){if(y=h[v],u&&"__proto__"==y)throw new TypeError("JSON-Patch: modifying `__proto__` prop is banned for security reasons, if this was on purpose, please set `banPrototypeModifications` flag false and pass it to this function. More info in fast-json-patch README");if(s&&void 0===w&&(void 0===m[y]?w=h.slice(0,v).join("/"):v==b-1&&(w=n.path),void 0!==w&&g(n,0,e,w)),v++,Array.isArray(m)){if("-"===y)y=m.length;else{if(s&&!r.isInteger(y))throw new t.JsonPatchError("Expected an unsigned base-10 integer value, making the new referenced value the array element with the zero-based index","OPERATION_PATH_ILLEGAL_ARRAY_INDEX",f,n,e);r.isInteger(y)&&(y=~~y)}if(v>=b){if(s&&"add"===n.op&&y>m.length)throw new t.JsonPatchError("The specified index MUST NOT be greater than the number of elements in the array","OPERATION_VALUE_OUT_OF_BOUNDS",f,n,e);if(!1===(d=i[n.op].call(n,m,y,e)).test)throw new t.JsonPatchError("Test operation failed","TEST_OPERATION_FAILED",f,n,e);return d}}else if(y&&-1!=y.indexOf("~")&&(y=r.unescapePathComponent(y)),v>=b){if(!1===(d=a[n.op].call(n,m,y,e)).test)throw new t.JsonPatchError("Test operation failed","TEST_OPERATION_FAILED",f,n,e);return d}m=m[y]}}function p(e,n,o,a,i){if(void 0===a&&(a=!0),void 0===i&&(i=!0),o&&!Array.isArray(n))throw new t.JsonPatchError("Patch sequence must be an array","SEQUENCE_NOT_AN_ARRAY");a||(e=r._deepClone(e));for(var c=new Array(n.length),p=0,u=n.length;p<u;p++)c[p]=s(e,n[p],o,!0,i,p),e=c[p].newDocument;return c.newDocument=e,c}function u(e,n,o){var r=s(e,n);if(!1===r.test)throw new t.JsonPatchError("Test operation failed","TEST_OPERATION_FAILED",o,n,e);return r.newDocument}function l(e,n,o,i){if("object"!=typeof e||null===e||Array.isArray(e))throw new t.JsonPatchError("Operation is not an object","OPERATION_NOT_AN_OBJECT",n,e,o);if(!a[e.op])throw new t.JsonPatchError("Operation `op` property is not one of operations defined in RFC-6902","OPERATION_OP_INVALID",n,e,o);if("string"!=typeof e.path)throw new t.JsonPatchError("Operation `path` property is not a string","OPERATION_PATH_INVALID",n,e,o);if(0!==e.path.indexOf("/")&&e.path.length>0)throw new t.JsonPatchError('Operation `path` property must start with "/"',"OPERATION_PATH_INVALID",n,e,o);if(("move"===e.op||"copy"===e.op)&&"string"!=typeof e.from)throw new t.JsonPatchError("Operation `from` property is not present (applicable in `move` and `copy` operations)","OPERATION_FROM_REQUIRED",n,e,o);if(("add"===e.op||"replace"===e.op||"test"===e.op)&&void 0===e.value)throw new t.JsonPatchError("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)","OPERATION_VALUE_REQUIRED",n,e,o);if(("add"===e.op||"replace"===e.op||"test"===e.op)&&r.hasUndefined(e.value))throw new t.JsonPatchError("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)","OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED",n,e,o);if(o)if("add"==e.op){var c=e.path.split("/").length,s=i.split("/").length;if(c!==s+1&&c!==s)throw new t.JsonPatchError("Cannot perform an `add` operation at the desired path","OPERATION_PATH_CANNOT_ADD",n,e,o)}else if("replace"===e.op||"remove"===e.op||"_get"===e.op){if(e.path!==i)throw new t.JsonPatchError("Cannot perform the operation at a path that does not exist","OPERATION_PATH_UNRESOLVABLE",n,e,o)}else if("move"===e.op||"copy"===e.op){var p=f([{op:"_get",path:e.from,value:void 0}],o);if(p&&"OPERATION_PATH_UNRESOLVABLE"===p.name)throw new t.JsonPatchError("Cannot perform the operation from a path that does not exist","OPERATION_FROM_UNRESOLVABLE",n,e,o)}}function f(e,n,o){try{if(!Array.isArray(e))throw new t.JsonPatchError("Patch sequence must be an array","SEQUENCE_NOT_AN_ARRAY");if(n)p(r._deepClone(n),r._deepClone(e),o||!0);else{o=o||l;for(var a=0;a<e.length;a++)o(e[a],a,n,void 0)}}catch(i){if(i instanceof t.JsonPatchError)return i;throw i}}t.getValueByPointer=c,t.applyOperation=s,t.applyPatch=p,t.applyReducer=u,t.validator=l,t.validate=f,t.default={JsonPatchError:t.JsonPatchError,deepClone:t.deepClone,getValueByPointer:c,applyOperation:s,applyPatch:p,applyReducer:u,validator:l,validate:f}},YorD:function(e,t){var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)});Object.defineProperty(t,"__esModule",{value:!0});var r=Object.prototype.hasOwnProperty;function a(e,t){return r.call(e,t)}function i(e){if(Array.isArray(e)){for(var t=new Array(e.length),n=0;n<t.length;n++)t[n]=""+n;return t}if(Object.keys)return Object.keys(e);for(var o in t=[],e)a(e,o)&&t.push(o);return t}function c(e){return-1===e.indexOf("/")&&-1===e.indexOf("~")?e:e.replace(/~/g,"~0").replace(/\//g,"~1")}function s(e,t){var n;for(var o in e)if(a(e,o)){if(e[o]===t)return c(o)+"/";if("object"==typeof e[o]&&""!=(n=s(e[o],t)))return c(o)+"/"+n}return""}function p(e,t){var n=[e];for(var o in t){var r="object"==typeof t[o]?JSON.stringify(t[o],null,2):t[o];void 0!==r&&n.push(o+": "+r)}return n.join("\n")}t.hasOwnProperty=a,t._objectKeys=i,t._deepClone=function(e){switch(typeof e){case"object":return JSON.parse(JSON.stringify(e));case"undefined":return null;default:return e}},t.isInteger=function(e){for(var t,n=0,o=e.length;n<o;){if(!((t=e.charCodeAt(n))>=48&&t<=57))return!1;n++}return!0},t.escapePathComponent=c,t.unescapePathComponent=function(e){return e.replace(/~1/g,"/").replace(/~0/g,"~")},t._getPathRecursive=s,t.getPath=function(e,t){if(e===t)return"/";var n=s(e,t);if(""===n)throw new Error("Object not found in root");return"/"+n},t.hasUndefined=function e(t){if(void 0===t)return!0;if(t)if(Array.isArray(t)){for(var n=0,o=t.length;n<o;n++)if(e(t[n]))return!0}else if("object"==typeof t){var r=i(t),a=r.length;for(n=0;n<a;n++)if(e(t[r[n]]))return!0}return!1};var u=function(e){function t(t,n,o,r,a){var i=this.constructor,c=e.call(this,p(t,{name:n,index:o,operation:r,tree:a}))||this;return c.name=n,c.index=o,c.operation=r,c.tree=a,Object.setPrototypeOf(c,i.prototype),c.message=p(t,{name:n,index:o,operation:r,tree:a}),c}return o(t,e),t}(Error);t.PatchError=u},gYkR:function(e,t,n){var o=this&&this.__assign||function(){return(o=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0});var r=n("YorD"),a=n("LxLq"),i=n("LxLq");t.applyOperation=i.applyOperation,t.applyPatch=i.applyPatch,t.applyReducer=i.applyReducer,t.getValueByPointer=i.getValueByPointer,t.validate=i.validate,t.validator=i.validator;var c=n("YorD");t.JsonPatchError=c.PatchError,t.deepClone=c._deepClone,t.escapePathComponent=c.escapePathComponent,t.unescapePathComponent=c.unescapePathComponent;var s=new WeakMap,p=function(e){this.observers=new Map,this.obj=e},u=function(e,t){this.callback=e,this.observer=t};function l(e,t){t.unobserve()}function f(e,t){var n,o=function(e){return s.get(e)}(e);if(o){var a=function(e,t){return e.observers.get(t)}(o,t);n=a&&a.observer}else o=new p(e),s.set(e,o);if(n)return n;if(n={},o.value=r._deepClone(e),t){n.callback=t,n.next=null;var i=function(){d(n)},c=function(){clearTimeout(n.next),n.next=setTimeout(i)};"undefined"!=typeof window&&(window.addEventListener("mouseup",c),window.addEventListener("keyup",c),window.addEventListener("mousedown",c),window.addEventListener("keydown",c),window.addEventListener("change",c))}return n.patches=[],n.object=e,n.unobserve=function(){d(n),clearTimeout(n.next),function(e,t){e.observers.delete(t.callback)}(o,n),"undefined"!=typeof window&&(window.removeEventListener("mouseup",c),window.removeEventListener("keyup",c),window.removeEventListener("mousedown",c),window.removeEventListener("keydown",c),window.removeEventListener("change",c))},o.observers.set(t,new u(t,n)),n}function d(e,t){void 0===t&&(t=!1);var n=s.get(e.object);h(n.value,e.object,e.patches,"",t),e.patches.length&&a.applyPatch(n.value,e.patches);var o=e.patches;return o.length>0&&(e.patches=[],e.callback&&e.callback(o)),o}function h(e,t,n,o,a){if(t!==e){"function"==typeof t.toJSON&&(t=t.toJSON());for(var i=r._objectKeys(t),c=r._objectKeys(e),s=!1,p=c.length-1;p>=0;p--){var u=e[f=c[p]];if(!r.hasOwnProperty(t,f)||void 0===t[f]&&void 0!==u&&!1===Array.isArray(t))Array.isArray(e)===Array.isArray(t)?(a&&n.push({op:"test",path:o+"/"+r.escapePathComponent(f),value:r._deepClone(u)}),n.push({op:"remove",path:o+"/"+r.escapePathComponent(f)}),s=!0):(a&&n.push({op:"test",path:o,value:e}),n.push({op:"replace",path:o,value:t}));else{var l=t[f];"object"==typeof u&&null!=u&&"object"==typeof l&&null!=l?h(u,l,n,o+"/"+r.escapePathComponent(f),a):u!==l&&(a&&n.push({op:"test",path:o+"/"+r.escapePathComponent(f),value:r._deepClone(u)}),n.push({op:"replace",path:o+"/"+r.escapePathComponent(f),value:r._deepClone(l)}))}}if(s||i.length!=c.length)for(p=0;p<i.length;p++){var f;r.hasOwnProperty(e,f=i[p])||void 0===t[f]||n.push({op:"add",path:o+"/"+r.escapePathComponent(f),value:r._deepClone(t[f])})}}}function m(e,t,n){void 0===n&&(n=!1);var o=[];return h(e,t,o,"",n),o}t.unobserve=l,t.observe=f,t.generate=d,t.compare=m;var v=n("LxLq"),b=n("YorD");t.default=o({},v,{unobserve:l,observe:f,generate:d,compare:m,JsonPatchError:b.PatchError,deepClone:r._deepClone,escapePathComponent:r.escapePathComponent,unescapePathComponent:b.unescapePathComponent})},z0vS:function(t,o,r){"use strict";r.r(o),r.d(o,"HistoryModule",(function(){return K}));var a=r("ofXK"),i=r("bTqV"),c=r("NFeN"),s=r("+0xr"),p=r("sYmb"),u=r("tyNb"),l=r("R0Ic"),f=r("O3o7"),d=r("gYkR"),h=r("LvDl"),m=r("iA2r"),v=r("fXoL"),b=r("c3AT");function w(e,t){if(1&e&&(v.Tb(0,"li"),v.Dc(1),v.fc(2,"translate"),v.Sb()),2&e){var n=t.$implicit;v.Bb(1),v.Ec(v.hc(2,1,n.translationKey,n))}}var y,g=((y=function(){function t(n){e(this,t),this.projectService=n,this.output=[],this.project=null}return n(t,[{key:"ngOnInit",value:function(){var e=this;this.projectService.openedProject.subscribe((function(t){e.project=t})),this.createDynamicRevisionText()}},{key:"createDynamicRevisionText",value:function(){var e=this,t=this.patchProject(this.index+1),n=this.patchProject(this.index);(n=d.applyPatch(n,this.revisions[this.index].backwards).newDocument).forms=n.forms.map((function(e){return new m.a(e)})),this.revision.forwards.forEach((function(o){var r,a=o,i=e.getTranslationKey(a);r=e.getTranslationData(a,0===e.index?n:t,n),i&&(r.translationKey=i,e.output.push(r)),(t=d.applyOperation(t,a).newDocument).forms=t.forms.map((function(e){return new m.a(e)}))}))}},{key:"getTranslationKey",value:function(e){var t=e.path.substring(1).replace(/\/\d+\//g,"_").replace(/\/[a-z]+:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\//,"_").replace(/\/\d+$/,"").replace(/\/[a-z]+:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,""),n=t.match(/^logicalFrames.*indicators(.*)$/);n&&(t="logicalFrames_indicators"+n[1]);var o=t.match("^(.*)_computation");return o?(t=o[1]+"_computation",t+="_replace"):t=t+"_"+e.op,"HistoryRevision."+t}},{key:"getTranslationData",value:function(e,t,n){for(var o=e.path.substring(1).replace(/\/\d+\//g,"_").replace(/\/\d+$/,""),r=e.path.split("/").slice(1),a={},i=t,c=1;c<r.length-1;c+=2){var s=r[c-1];i=i[s][r[c]],s="entities"===s?"entity":"elements"===s&&c<5?"variable":s.substring(0,s.length-1),a[s]=i}return"add"===e.op?a.item=e.value:"replace"===e.op?(a.after=e.value,a.before=t,r.forEach((function(e){return a.before=a.before[e]})),a.before instanceof Date&&(a.before=this.transformDate(a.before))):"remove"===e.op?(a.item=n,r.forEach((function(e){return a.item=a.item[e]}))):"move"===e.op&&(a.item=t,e.from.split("/").slice(1).forEach((function(e){return a.item=a.item[e]}))),a.item||(a.item=""),"add"!==e.op&&"remove"!==e.op||("users_dataSources"===o&&(a.item=t.forms.find((function(e){return e.id===a.item}))),["groups_members","forms_entities","users_entities","logicalFrames_entities"].includes(o)&&(a.item=t.entities.find((function(e){return e.id===a.item}))),"forms_elements_partitions_groups_members"===o&&(a.item=a.partition.elements.find((function(e){return e.id===a.item})))),a}},{key:"patchProject",value:function(e){for(var t=h.cloneDeep(this.project),n=0;n<e;n++)try{d.applyPatch(t,this.revisions[n].backwards)}catch(o){console.log("Error in reverting to datasource at Index ",n),console.log(o)}return t.forms=t.forms.map((function(e){return new m.a(e)})),t}},{key:"transformDate",value:function(e){return e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()}}]),t}()).\u0275fac=function(e){return new(e||y)(v.Nb(b.a))},y.\u0275cmp=v.Hb({type:y,selectors:[["app-revision-summary"]],inputs:{revision:"revision",revisions:"revisions",index:"index"},decls:2,vars:1,consts:[[4,"ngFor","ngForOf"]],template:function(e,t){1&e&&(v.Tb(0,"ul"),v.Bc(1,w,3,4,"li",0),v.Sb()),2&e&&(v.Bb(1),v.kc("ngForOf",t.output))},directives:[a.k],pipes:[p.c],styles:[""]}),y);function O(e,t){1&e&&(v.Tb(0,"th",16),v.Dc(1),v.fc(2,"translate"),v.fc(3,"translate"),v.Sb()),2&e&&(v.Bb(1),v.Gc("",v.gc(2,2,"Date")," & ",v.gc(3,4,"User"),""))}function _(e,t){if(1&e&&(v.Tb(0,"td",17),v.Tb(1,"p"),v.Dc(2),v.fc(3,"date"),v.Sb(),v.Tb(4,"p"),v.Dc(5),v.Sb(),v.Sb()),2&e){var n=t.$implicit;v.Bb(2),v.Ec(v.hc(3,2,n.time,"short")),v.Bb(3),v.Ec(n.username)}}function E(e,t){1&e&&(v.Tb(0,"th",16),v.Dc(1),v.fc(2,"translate"),v.Sb()),2&e&&(v.Bb(1),v.Ec(v.gc(2,1,"HistoryChanges")))}function P(e,t){if(1&e&&(v.Tb(0,"td",18),v.Ob(1,"app-revision-summary",19),v.Sb()),2&e){var n=t.$implicit,o=t.dataIndex,r=v.ec();v.Bb(1),v.kc("revision",n)("revisions",r.revisions)("index",o)}}function C(e,t){1&e&&(v.Tb(0,"span"),v.Dc(1),v.fc(2,"translate"),v.Sb()),2&e&&(v.Bb(1),v.Ec(v.gc(2,1,"EquivalentVersion")))}function D(e,t){if(1&e){var n=v.Ub();v.Tb(0,"button",25),v.ac("click",(function(){v.sc(n);var e=v.ec().dataIndex;return v.ec().onRevertClick(e)})),v.Dc(1),v.fc(2,"translate"),v.Sb()}2&e&&(v.Bb(1),v.Ec(v.gc(2,1,"RevertToVersion")))}function x(e,t){1&e&&(v.Tb(0,"div",26),v.Dc(1),v.fc(2,"translate"),v.Sb()),2&e&&(v.Bb(1),v.Ec(v.gc(2,1,"SaveConfirm")))}function T(e,t){if(1&e&&(v.Tb(0,"td",20),v.Tb(1,"div",21),v.Bc(2,C,3,3,"span",22),v.Bc(3,D,3,3,"button",23),v.Sb(),v.Bc(4,x,3,3,"div",24),v.Sb()),2&e){var n=t.$implicit,o=t.dataIndex,r=v.ec();v.Cb("colspan",r.displayedColumns.length),v.Bb(1),v.kc("@detailExpand",n==r.expandedElement?"expanded":"collapsed"),v.Bb(1),v.kc("ngIf",r.sameVersion(o)&&o!==r.saveConfirmElement),v.Bb(1),v.kc("ngIf",!r.sameVersion(o)&&o!==r.saveConfirmElement),v.Bb(1),v.kc("ngIf",o===r.saveConfirmElement)}}function A(e,t){if(1&e){var n=v.Ub();v.Tb(0,"button",25),v.ac("click",(function(){return v.sc(n),v.ec(2).onLoadMore()})),v.Dc(1),v.fc(2,"translate"),v.Sb()}2&e&&(v.Bb(1),v.Ec(v.gc(2,1,"LoadMoreRevisions")))}function j(e,t){if(1&e&&(v.Tb(0,"td",27),v.Bc(1,A,3,3,"button",23),v.Sb()),2&e){var n=v.ec();v.Cb("colspan",n.displayedColumns.length),v.Bb(1),v.kc("ngIf",n.showLoadMore)}}function R(e,t){if(1&e){var n=v.Ub();v.Tb(0,"tr",28),v.ac("mouseover",(function(){return v.sc(n),v.ec().mouseLeave()})),v.Sb()}}function k(e,t){if(1&e){var n=v.Ub();v.Tb(0,"tr",29),v.ac("mouseover",(function(){v.sc(n);var e=t.$implicit;return v.ec().mouseOver(e)})),v.Sb()}if(2&e){var o=t.$implicit,r=v.ec();v.Fb("example-expanded-row",r.expandedElement===o)}}function I(e,t){1&e&&v.Ob(0,"tr",30)}var N=function(e){return{"hidden-row":e}};function L(e,t){if(1&e&&v.Ob(0,"tr",31),2&e){var n=v.ec();v.kc("ngClass",v.oc(1,N,!n.showLoadMore))}}var S,B,J,M,F=function(){return["expandedDetail"]},U=function(){return["expandedRevisions"]},V=[{path:"",component:(S=function(){function t(n){e(this,t),this.projectService=n,this.displayedColumns=["date","changes"]}return n(t,[{key:"ngOnInit",value:function(){var e=this;this.projectService.openedProject.subscribe((function(t){e.showLoadMore=!0,e.projectId=t.id,e.project=t,e.offset=0,e.limit=10,t.id&&e.projectService.listRevisions(t.id,e.limit).then((function(t){e.revisions=t,e.showLoadMore=!(t.length<10)}))}))}},{key:"mouseOver",value:function(e){this.expandedElement=e}},{key:"sameVersion",value:function(e){var t=this.patchProject(e+1),n=Object(h.isEqual)(t,this.project);return this.isSameVersion=n,n}},{key:"mouseLeave",value:function(){this.expandedElement=null}},{key:"onLoadMore",value:function(){var e=this;this.limit+=10,this.projectService.listRevisions(this.projectId,this.limit).then((function(t){e.revisions=t,e.showLoadMore=!(t.length<10)}))}},{key:"patchProject",value:function(e){for(var t=this.project.copy(),n=0;n<e;n++)try{d.applyPatch(t,this.revisions[n].backwards)}catch(o){console.log("Error in reverting to datasource at Index ",n),console.log(o)}return t.forms=t.forms.map((function(e){return new m.a(e)})),t}},{key:"expand",value:function(e){return this.saveConfirmElement===e}},{key:"onRevertClick",value:function(e){this.saveConfirmElement=e;var t=this.patchProject(e+1);t.forms=t.forms.map((function(e){return new m.a(e)})),this.projectService.project.next(new f.a(t))}}]),t}(),S.\u0275fac=function(e){return new(e||S)(v.Nb(b.a))},S.\u0275cmp=v.Hb({type:S,selectors:[["app-history"]],decls:21,vars:13,consts:[[1,"info-section","blue"],[1,"mdm-title"],["mat-table","","multiTemplateDataRows","",1,"mdm-table","history-table",3,"dataSource","mouseleave"],["matColumnDef","date"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","","id","date",4,"matCellDef"],["matColumnDef","changes"],["mat-cell","","id","changes",4,"matCellDef"],["matColumnDef","expandedDetail"],["mat-cell","",4,"matCellDef"],["matColumnDef","expandedRevisions"],["mat-footer-cell","","class","expand-row",4,"matFooterCellDef"],["mat-header-row","",3,"mouseover",4,"matHeaderRowDef"],["mat-row","","class","example-element-row",3,"example-expanded-row","mouseover",4,"matRowDef","matRowDefColumns"],["mat-row","","class","example-detail-row",4,"matRowDef","matRowDefColumns"],["mat-footer-row","",3,"ngClass",4,"matFooterRowDef"],["mat-header-cell",""],["mat-cell","","id","date"],["mat-cell","","id","changes"],[3,"revision","revisions","index"],["mat-cell",""],[1,"example-element-detail"],[4,"ngIf"],["mat-stroked-button","","class","mdm-button small-button",3,"click",4,"ngIf"],["class","static-row",4,"ngIf"],["mat-stroked-button","",1,"mdm-button","small-button",3,"click"],[1,"static-row"],["mat-footer-cell","",1,"expand-row"],["mat-header-row","",3,"mouseover"],["mat-row","",1,"example-element-row",3,"mouseover"],["mat-row","",1,"example-detail-row"],["mat-footer-row","",3,"ngClass"]],template:function(e,t){1&e&&(v.Tb(0,"div",0),v.Dc(1),v.fc(2,"translate"),v.Sb(),v.Tb(3,"div",1),v.Dc(4),v.fc(5,"translate"),v.Sb(),v.Tb(6,"table",2),v.ac("mouseleave",(function(){return t.mouseLeave()})),v.Rb(7,3),v.Bc(8,O,4,6,"th",4),v.Bc(9,_,6,5,"td",5),v.Qb(),v.Rb(10,6),v.Bc(11,E,3,3,"th",4),v.Bc(12,P,2,3,"td",7),v.Qb(),v.Rb(13,8),v.Bc(14,T,5,5,"td",9),v.Qb(),v.Rb(15,10),v.Bc(16,j,2,2,"td",11),v.Qb(),v.Bc(17,R,1,0,"tr",12),v.Bc(18,k,1,2,"tr",13),v.Bc(19,I,1,0,"tr",14),v.Bc(20,L,1,3,"tr",15),v.Sb()),2&e&&(v.Bb(1),v.Ec(v.gc(2,7,"ProjectHistoryInfo")),v.Bb(3),v.Ec(v.gc(5,9,"History")),v.Bb(2),v.kc("dataSource",t.revisions),v.Bb(11),v.kc("matHeaderRowDef",t.displayedColumns),v.Bb(1),v.kc("matRowDefColumns",t.displayedColumns),v.Bb(1),v.kc("matRowDefColumns",v.nc(11,F)),v.Bb(1),v.kc("matFooterRowDef",v.nc(12,U)))},directives:[s.n,s.c,s.i,s.b,s.e,s.k,s.m,s.g,s.h,s.a,g,a.l,i.a,s.d,s.j,s.l,s.f,a.j],pipes:[p.c,a.e],styles:["#date[_ngcontent-%COMP%]{width:20%}#changes[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{margin:0}.expand-row[_ngcontent-%COMP%]{text-align:center}.hidden-row[_ngcontent-%COMP%]{display:none}tr.example-detail-row[_ngcontent-%COMP%]{height:0}tr.example-element-row[_ngcontent-%COMP%]:not(.example-expanded-row):hover{background:#f5f5f5}tr.example-element-row[_ngcontent-%COMP%]:not(.example-expanded-row):active{background:#efefef}.example-element-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border-bottom-width:1px}.example-element-detail[_ngcontent-%COMP%]{overflow:hidden;display:flex;padding:5px;justify-content:center}.mat-column-expandedDetail[_ngcontent-%COMP%]{padding-top:0!important;padding-bottom:0!important}.static-row[_ngcontent-%COMP%]{text-align:center;padding:10px 0 2px}"],data:{animation:[Object(l.n)("detailExpand",[Object(l.k)("collapsed",Object(l.l)({height:"0px",minHeight:"0",padding:"0px"})),Object(l.k)("expanded",Object(l.l)({height:"*"})),Object(l.m)("expanded <=> collapsed",Object(l.e)("225ms cubic-bezier(0.4, 0.0, 0.2, 1)"))])]}}),S)}],H=((M=function t(){e(this,t)}).\u0275mod=v.Lb({type:M}),M.\u0275inj=v.Kb({factory:function(e){return new(e||M)},imports:[[u.f.forChild(V)],u.f]}),M),Y=((J=function t(){e(this,t)}).\u0275mod=v.Lb({type:J}),J.\u0275inj=v.Kb({factory:function(e){return new(e||J)},imports:[[a.c,p.b]]}),J),K=((B=function t(){e(this,t)}).\u0275mod=v.Lb({type:B}),B.\u0275inj=v.Kb({factory:function(e){return new(e||B)},imports:[[a.c,p.b,H,s.p,i.b,c.b,Y]]}),B)}}])}();