!function(){function t(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}function r(t,r){for(var n=0;n<r.length;n++){var a=r[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function n(t,n,a){return n&&r(t.prototype,n),a&&r(t,a),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{"7Cbv":function(t,r,n){"use strict";var a="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),i=new Uint8Array(16);function e(){if(!a)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return a(i)}for(var c=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,o=function(t){return"string"==typeof t&&c.test(t)},s=[],d=0;d<256;++d)s.push((d+256).toString(16).substr(1));r.a=function(t,r,n){var a=(t=t||{}).random||(t.rng||e)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,r){n=n||0;for(var i=0;i<16;++i)r[n+i]=a[i];return r}return function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(s[t[r+0]]+s[t[r+1]]+s[t[r+2]]+s[t[r+3]]+"-"+s[t[r+4]]+s[t[r+5]]+"-"+s[t[r+6]]+s[t[r+7]]+"-"+s[t[r+8]]+s[t[r+9]]+"-"+s[t[r+10]]+s[t[r+11]]+s[t[r+12]]+s[t[r+13]]+s[t[r+14]]+s[t[r+15]]).toLowerCase();if(!o(n))throw TypeError("Stringified UUID is invalid");return n}(a)}},FNW4:function(r,a,i){"use strict";i.d(a,"a",(function(){return o}));var e=i("n/J0"),c=i("7Cbv"),o=function(){function r(n){t(this,r),this.type="theme",this.deserialize(n)}return n(r,[{key:"deserialize",value:function(t){return Object.assign(this,t),this.id=t&&t._id?t._id:"theme:"+Object(c.a)(),this.name=t&&t.name?new e.a(t.name):new e.a,this.shortName=t&&t.shortName?new e.a(t.shortName):new e.a,this.rev=t&&t._rev?t._rev:null,this}},{key:"serialize",value:function(){var t={_id:this.id,type:this.type,name:this.name,shortName:this.shortName};if(this.rev){var r={_rev:this.rev};return Object.assign(r,t),r}return t}}]),r}()},WPWp:function(r,a,i){"use strict";i.d(a,"a",(function(){return d}));var e=i("mrSG"),c=i("FNW4"),o=i("fXoL"),s=i("H+bZ"),d=function(){var r=function(){function r(n){t(this,r),this.apiService=n}return n(r,[{key:"list",value:function(){return Object(e.a)(this,void 0,void 0,regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.apiService.get("/resources/theme");case 2:return t.abrupt("return",t.sent.map((function(t){return new c.a(t)})));case 3:case"end":return t.stop()}}),t,this)})))}},{key:"save",value:function(t){return Object(e.a)(this,void 0,void 0,regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,this.apiService.put("/resources/theme/"+t.id,t.serialize());case 2:case"end":return r.stop()}}),r,this)})))}},{key:"delete",value:function(t){return Object(e.a)(this,void 0,void 0,regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,this.apiService.delete("/resources/theme/"+t);case 2:case"end":return r.stop()}}),r,this)})))}}]),r}();return r.\u0275fac=function(t){return new(t||r)(o.Xb(s.a))},r.\u0275prov=o.Jb({token:r,factory:r.\u0275fac,providedIn:"root"}),r}()},Wp6s:function(r,n,a){"use strict";a.d(n,"a",(function(){return b})),a.d(n,"b",(function(){return l})),a.d(n,"c",(function(){return h})),a.d(n,"d",(function(){return m})),a.d(n,"e",(function(){return g})),a.d(n,"f",(function(){return p})),a.d(n,"g",(function(){return v})),a.d(n,"h",(function(){return f}));var i=a("R1ws"),e=a("FKr1"),c=a("fXoL"),o=["*",[["mat-card-footer"]]],s=["*","mat-card-footer"],d=[[["","mat-card-avatar",""],["","matCardAvatar",""]],[["mat-card-title"],["mat-card-subtitle"],["","mat-card-title",""],["","mat-card-subtitle",""],["","matCardTitle",""],["","matCardSubtitle",""]],"*"],u=["[mat-card-avatar], [matCardAvatar]","mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]","*"],m=function(){var r=function r(){t(this,r)};return r.\u0275fac=function(t){return new(t||r)},r.\u0275dir=c.Ib({type:r,selectors:[["mat-card-content"],["","mat-card-content",""],["","matCardContent",""]],hostAttrs:[1,"mat-card-content"]}),r}(),f=function(){var r=function r(){t(this,r)};return r.\u0275fac=function(t){return new(t||r)},r.\u0275dir=c.Ib({type:r,selectors:[["mat-card-title"],["","mat-card-title",""],["","matCardTitle",""]],hostAttrs:[1,"mat-card-title"]}),r}(),l=function(){var r=function r(){t(this,r),this.align="start"};return r.\u0275fac=function(t){return new(t||r)},r.\u0275dir=c.Ib({type:r,selectors:[["mat-card-actions"]],hostAttrs:[1,"mat-card-actions"],hostVars:2,hostBindings:function(t,r){2&t&&c.Fb("mat-card-actions-align-end","end"===r.align)},inputs:{align:"align"},exportAs:["matCardActions"]}),r}(),p=function(){var r=function r(){t(this,r)};return r.\u0275fac=function(t){return new(t||r)},r.\u0275dir=c.Ib({type:r,selectors:[["","mat-card-image",""],["","matCardImage",""]],hostAttrs:[1,"mat-card-image"]}),r}(),h=function(){var r=function r(){t(this,r)};return r.\u0275fac=function(t){return new(t||r)},r.\u0275dir=c.Ib({type:r,selectors:[["","mat-card-avatar",""],["","matCardAvatar",""]],hostAttrs:[1,"mat-card-avatar"]}),r}(),b=function(){var r=function r(n){t(this,r),this._animationMode=n};return r.\u0275fac=function(t){return new(t||r)(c.Nb(i.a,8))},r.\u0275cmp=c.Hb({type:r,selectors:[["mat-card"]],hostAttrs:[1,"mat-card","mat-focus-indicator"],hostVars:2,hostBindings:function(t,r){2&t&&c.Fb("_mat-animation-noopable","NoopAnimations"===r._animationMode)},exportAs:["matCard"],ngContentSelectors:s,decls:2,vars:0,template:function(t,r){1&t&&(c.jc(o),c.ic(0),c.ic(1,1))},styles:[".mat-card{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:block;position:relative;padding:16px;border-radius:4px}._mat-animation-noopable.mat-card{transition:none;animation:none}.mat-card .mat-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .mat-card .mat-divider-horizontal{left:auto;right:0}.mat-card .mat-divider-horizontal.mat-divider-inset{position:static;margin:0}[dir=rtl] .mat-card .mat-divider-horizontal.mat-divider-inset{margin-right:0}.cdk-high-contrast-active .mat-card{outline:solid 1px}.mat-card-actions,.mat-card-subtitle,.mat-card-content{display:block;margin-bottom:16px}.mat-card-title{display:block;margin-bottom:8px}.mat-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.mat-card-actions-align-end{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px}.mat-card-footer{display:block;margin:0 -16px -16px -16px}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button,.mat-card-actions .mat-stroked-button{margin:0 8px}.mat-card-header{display:flex;flex-direction:row}.mat-card-header .mat-card-title{margin-bottom:12px}.mat-card-header-text{margin:0 16px}.mat-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-card-title-group{display:flex;justify-content:space-between}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-title-group>.mat-card-xl-image{margin:-8px 0 8px}@media(max-width: 599px){.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}}.mat-card>:first-child,.mat-card-content>:first-child{margin-top:0}.mat-card>:last-child:not(.mat-card-footer),.mat-card-content>:last-child:not(.mat-card-footer){margin-bottom:0}.mat-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.mat-card>.mat-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.mat-card-actions .mat-button:first-child,.mat-card-actions .mat-raised-button:first-child,.mat-card-actions .mat-stroked-button:first-child{margin-left:0;margin-right:0}.mat-card-title:not(:first-child),.mat-card-subtitle:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child){margin-top:-8px}.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}\n"],encapsulation:2,changeDetection:0}),r}(),g=function(){var r=function r(){t(this,r)};return r.\u0275fac=function(t){return new(t||r)},r.\u0275cmp=c.Hb({type:r,selectors:[["mat-card-header"]],hostAttrs:[1,"mat-card-header"],ngContentSelectors:u,decls:4,vars:0,consts:[[1,"mat-card-header-text"]],template:function(t,r){1&t&&(c.jc(d),c.ic(0),c.Tb(1,"div",0),c.ic(2,1),c.Sb(),c.ic(3,2))},encapsulation:2,changeDetection:0}),r}(),v=function(){var r=function r(){t(this,r)};return r.\u0275mod=c.Lb({type:r}),r.\u0275inj=c.Kb({factory:function(t){return new(t||r)},imports:[[e.h],e.h]}),r}()},f5xp:function(r,a,i){"use strict";i.r(a),i.d(a,"IndicatorsModule",(function(){return L}));var e,c=i("ofXK"),o=i("sYmb"),s=i("Wp6s"),d=i("bTqV"),u=i("tyNb"),m=i("fXoL"),f=((e=function r(){t(this,r)}).\u0275mod=m.Lb({type:e}),e.\u0275inj=m.Kb({factory:function(t){return new(t||e)},imports:[[c.c,o.b,s.g,d.b,u.f]]}),e),l=i("RTna");function p(t,r){if(1&t&&(m.Tb(0,"div"),m.Dc(1),m.Sb()),2&t){var n=r.$implicit,a=m.ec(2);m.Bb(1),m.Ec(n.shortName[a.currentLang])}}function h(t,r){if(1&t&&(m.Tb(0,"div",2),m.Tb(1,"div",3),m.Dc(2),m.fc(3,"translate"),m.Sb(),m.Tb(4,"div",4),m.Bc(5,p,2,1,"div",7),m.Sb(),m.Sb()),2&t){var n=m.ec();m.Bb(2),m.Ec(m.gc(3,2,"Thematics")),m.Bb(3),m.kc("ngForOf",n.indicator.themes)}}var b,g=((b=function(){function r(n){t(this,r),this.translateService=n}return n(r,[{key:"ngOnInit",value:function(){}},{key:"currentLang",get:function(){return this.translateService.currentLang?this.translateService.currentLang:this.translateService.defaultLang}}]),r}()).\u0275fac=function(t){return new(t||b)(m.Nb(o.d))},b.\u0275cmp=m.Hb({type:b,selectors:[["app-indicator"]],inputs:{indicator:"indicator"},decls:17,vars:11,consts:[[1,"card-header"],["class","card-info",4,"ngIf"],[1,"card-info"],[1,"card-info-title"],[1,"card-info-value"],["align","end"],["mat-stroked-button","",1,"mdm-button"],[4,"ngFor","ngForOf"]],template:function(t,r){1&t&&(m.Tb(0,"mat-card"),m.Tb(1,"mat-card-header",0),m.Tb(2,"mat-card-title"),m.Dc(3),m.Sb(),m.Sb(),m.Tb(4,"mat-card-content"),m.Bc(5,h,6,4,"div",1),m.Tb(6,"div",2),m.Tb(7,"div",3),m.Dc(8),m.fc(9,"translate"),m.Sb(),m.Tb(10,"div",4),m.Dc(11),m.fc(12,"translate"),m.Sb(),m.Sb(),m.Sb(),m.Tb(13,"mat-card-actions",5),m.Tb(14,"button",6),m.Dc(15),m.fc(16,"translate"),m.Sb(),m.Sb(),m.Sb()),2&t&&(m.Bb(3),m.Ec(r.indicator.name[r.currentLang]),m.Bb(2),m.kc("ngIf",r.indicator.themes.length>1),m.Bb(3),m.Ec(m.gc(9,5,"Description")),m.Bb(3),m.Ec(r.indicator.description[r.currentLang]?r.indicator.description[r.currentLang]:m.gc(12,7,"IndicatorMissingDescription")),m.Bb(4),m.Ec(m.gc(16,9,"SeeReport")))},directives:[s.a,s.e,s.h,s.d,c.l,s.b,d.a,c.k],pipes:[o.c],styles:[""]}),b);function v(t,r){1&t&&m.Ob(0,"app-indicator",6),2&t&&m.kc("indicator",r.$implicit)}function y(t,r){if(1&t&&(m.Tb(0,"div",2),m.Tb(1,"div",3),m.Dc(2),m.Sb(),m.Tb(3,"div",4),m.Bc(4,v,1,1,"app-indicator",5),m.Sb(),m.Sb()),2&t){var n=r.$implicit,a=m.ec();m.Bb(2),m.Ec(n.theme.name[a.currentLang]),m.Bb(2),m.kc("ngForOf",n.indicators)}}function x(t,r){1&t&&m.Ob(0,"app-indicator",6),2&t&&m.kc("indicator",r.$implicit)}var w,S,k,T=[{path:"",component:(w=function(){function r(n,a){t(this,r),this.translateService=n,this.indicatorService=a,this.indicators=[],this.groups=[],this.multiThemesIndicators=[]}return n(r,[{key:"ngOnInit",value:function(){var t=this;this.indicatorService.list().then((function(r){t.indicators=r,t.groups=[],t.multiThemesIndicators=[],t.indicators.forEach((function(r){if(r.multiThemes)t.multiThemesIndicators.push(r);else{var n=t.groups.find((function(t){return t.theme.id===r.themes[0].id}));n?n.indicators.push(r):t.groups.push({theme:r.themes[0],indicators:[r]})}}))}))}},{key:"currentLang",get:function(){return this.translateService.currentLang?this.translateService.currentLang:this.translateService.defaultLang}}]),r}(),w.\u0275fac=function(t){return new(t||w)(m.Nb(o.d),m.Nb(l.a))},w.\u0275cmp=m.Hb({type:w,selectors:[["app-indicators"]],decls:8,vars:5,consts:[[1,"full-page"],["class","mdm-section",4,"ngFor","ngForOf"],[1,"mdm-section"],[1,"mdm-title"],[1,"mdm-cards"],["class","mdm-card",3,"indicator",4,"ngFor","ngForOf"],[1,"mdm-card",3,"indicator"]],template:function(t,r){1&t&&(m.Tb(0,"div",0),m.Bc(1,y,5,2,"div",1),m.Tb(2,"div",2),m.Tb(3,"div",3),m.Dc(4),m.fc(5,"translate"),m.Sb(),m.Tb(6,"div",4),m.Bc(7,x,1,1,"app-indicator",5),m.Sb(),m.Sb(),m.Sb()),2&t&&(m.Bb(1),m.kc("ngForOf",r.groups),m.Bb(3),m.Ec(m.gc(5,3,"MultipleThematics")),m.Bb(3),m.kc("ngForOf",r.multiThemesIndicators))},directives:[c.k,g],pipes:[o.c],styles:[""]}),w)}],C=((k=function r(){t(this,r)}).\u0275mod=m.Lb({type:k}),k.\u0275inj=m.Kb({factory:function(t){return new(t||k)},imports:[[u.f.forChild(T)],u.f]}),k),L=((S=function r(){t(this,r)}).\u0275mod=m.Lb({type:S}),S.\u0275inj=m.Kb({factory:function(t){return new(t||S)},imports:[[c.c,o.b,C,f]]}),S)},"n/J0":function(r,a,i){"use strict";i.d(a,"a",(function(){return e}));var e=function(){function r(n){t(this,r),this.en="",this.fr="",this.es="",this.deserialize(n)}return n(r,[{key:"deserialize",value:function(t){return Object.assign(this,t),this}}]),r}()}}])}();