!function(){function t(e,n){return(t=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(e,n)}function e(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var a,r=o(t);if(e){var i=o(this).constructor;a=Reflect.construct(r,arguments,i)}else a=r.apply(this,arguments);return n(this,a)}}function n(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function o(t){return(o=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function a(t){return function(t){if(Array.isArray(t))return r(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}function i(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function c(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{"0B1/":function(n,o,r){"use strict";r.r(o),r.d(o,"ProjectsModule",(function(){return vt}));var i,u,l,d,b,g,f,h=r("ofXK"),m=r("3Pt+"),p=r("bTqV"),v=r("8LU1"),y=r("0EQZ"),k=r("fXoL"),_=r("FKr1"),S=r("u47x"),T=["button"],w=["*"],j=new k.s("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS"),x=new k.s("MatButtonToggleGroup"),C={provide:m.p,useExisting:Object(k.V)((function(){return D})),multi:!0},O=0,B=function t(e,n){s(this,t),this.source=e,this.value=n},D=((i=function(){function t(e,n){s(this,t),this._changeDetector=e,this._vertical=!1,this._multiple=!1,this._disabled=!1,this._controlValueAccessorChangeFn=function(){},this._onTouched=function(){},this._name="mat-button-toggle-group-"+O++,this.valueChange=new k.o,this.change=new k.o,this.appearance=n&&n.appearance?n.appearance:"standard"}return c(t,[{key:"ngOnInit",value:function(){this._selectionModel=new y.c(this.multiple,void 0,!1)}},{key:"ngAfterContentInit",value:function(){var t;(t=this._selectionModel).select.apply(t,a(this._buttonToggles.filter((function(t){return t.checked}))))}},{key:"writeValue",value:function(t){this.value=t,this._changeDetector.markForCheck()}},{key:"registerOnChange",value:function(t){this._controlValueAccessorChangeFn=t}},{key:"registerOnTouched",value:function(t){this._onTouched=t}},{key:"setDisabledState",value:function(t){this.disabled=t}},{key:"_emitChangeEvent",value:function(){var t=this.selected,e=Array.isArray(t)?t[t.length-1]:t,n=new B(e,this.value);this._controlValueAccessorChangeFn(n.value),this.change.emit(n)}},{key:"_syncButtonToggle",value:function(t,e){var n=this,o=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];this.multiple||!this.selected||t.checked||(this.selected.checked=!1),this._selectionModel?e?this._selectionModel.select(t):this._selectionModel.deselect(t):a=!0,a?Promise.resolve().then((function(){return n._updateModelValue(o)})):this._updateModelValue(o)}},{key:"_isSelected",value:function(t){return this._selectionModel&&this._selectionModel.isSelected(t)}},{key:"_isPrechecked",value:function(t){return void 0!==this._rawValue&&(this.multiple&&Array.isArray(this._rawValue)?this._rawValue.some((function(e){return null!=t.value&&e===t.value})):t.value===this._rawValue)}},{key:"_setSelectionByValue",value:function(t){var e=this;this._rawValue=t,this._buttonToggles&&(this.multiple&&t?(Array.isArray(t),this._clearSelection(),t.forEach((function(t){return e._selectValue(t)}))):(this._clearSelection(),this._selectValue(t)))}},{key:"_clearSelection",value:function(){this._selectionModel.clear(),this._buttonToggles.forEach((function(t){return t.checked=!1}))}},{key:"_selectValue",value:function(t){var e=this._buttonToggles.find((function(e){return null!=e.value&&e.value===t}));e&&(e.checked=!0,this._selectionModel.select(e))}},{key:"_updateModelValue",value:function(t){t&&this._emitChangeEvent(),this.valueChange.emit(this.value)}},{key:"name",get:function(){return this._name},set:function(t){var e=this;this._name=t,this._buttonToggles&&this._buttonToggles.forEach((function(t){t.name=e._name,t._markForCheck()}))}},{key:"vertical",get:function(){return this._vertical},set:function(t){this._vertical=Object(v.c)(t)}},{key:"value",get:function(){var t=this._selectionModel?this._selectionModel.selected:[];return this.multiple?t.map((function(t){return t.value})):t[0]?t[0].value:void 0},set:function(t){this._setSelectionByValue(t),this.valueChange.emit(this.value)}},{key:"selected",get:function(){var t=this._selectionModel?this._selectionModel.selected:[];return this.multiple?t:t[0]||null}},{key:"multiple",get:function(){return this._multiple},set:function(t){this._multiple=Object(v.c)(t)}},{key:"disabled",get:function(){return this._disabled},set:function(t){this._disabled=Object(v.c)(t),this._buttonToggles&&this._buttonToggles.forEach((function(t){return t._markForCheck()}))}}]),t}()).\u0275fac=function(t){return new(t||i)(k.Nb(k.h),k.Nb(j,8))},i.\u0275dir=k.Ib({type:i,selectors:[["mat-button-toggle-group"]],contentQueries:function(t,e,n){var o;1&t&&k.Gb(n,P,!0),2&t&&k.pc(o=k.bc())&&(e._buttonToggles=o)},hostAttrs:["role","group",1,"mat-button-toggle-group"],hostVars:5,hostBindings:function(t,e){2&t&&(k.Cb("aria-disabled",e.disabled),k.Fb("mat-button-toggle-vertical",e.vertical)("mat-button-toggle-group-appearance-standard","standard"===e.appearance))},inputs:{appearance:"appearance",name:"name",vertical:"vertical",value:"value",multiple:"multiple",disabled:"disabled"},outputs:{valueChange:"valueChange",change:"change"},exportAs:["matButtonToggleGroup"],features:[k.Ab([C,{provide:x,useExisting:i}])]}),i),M=Object(_.u)((function t(){s(this,t)})),P=((l=function(n){!function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&t(e,n)}(a,n);var o=e(a);function a(t,e,n,r,i,c){var u;s(this,a),(u=o.call(this))._changeDetectorRef=e,u._elementRef=n,u._focusMonitor=r,u._isSingleSelector=!1,u._checked=!1,u.ariaLabelledby=null,u._disabled=!1,u.change=new k.o;var l=Number(i);return u.tabIndex=l||0===l?l:null,u.buttonToggleGroup=t,u.appearance=c&&c.appearance?c.appearance:"standard",u}return c(a,[{key:"ngOnInit",value:function(){var t=this.buttonToggleGroup;this._isSingleSelector=t&&!t.multiple,this.id=this.id||"mat-button-toggle-"+O++,this._isSingleSelector&&(this.name=t.name),t&&(t._isPrechecked(this)?this.checked=!0:t._isSelected(this)!==this._checked&&t._syncButtonToggle(this,this._checked))}},{key:"ngAfterViewInit",value:function(){this._focusMonitor.monitor(this._elementRef,!0)}},{key:"ngOnDestroy",value:function(){var t=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),t&&t._isSelected(this)&&t._syncButtonToggle(this,!1,!1,!0)}},{key:"focus",value:function(t){this._buttonElement.nativeElement.focus(t)}},{key:"_onButtonClick",value:function(){var t=!!this._isSingleSelector||!this._checked;t!==this._checked&&(this._checked=t,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,!0),this.buttonToggleGroup._onTouched())),this.change.emit(new B(this,this.value))}},{key:"_markForCheck",value:function(){this._changeDetectorRef.markForCheck()}},{key:"buttonId",get:function(){return this.id+"-button"}},{key:"appearance",get:function(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance},set:function(t){this._appearance=t}},{key:"checked",get:function(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked},set:function(t){var e=Object(v.c)(t);e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck())}},{key:"disabled",get:function(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled},set:function(t){this._disabled=Object(v.c)(t)}}]),a}(M)).\u0275fac=function(t){return new(t||l)(k.Nb(x,8),k.Nb(k.h),k.Nb(k.l),k.Nb(S.h),k.Yb("tabindex"),k.Nb(j,8))},l.\u0275cmp=k.Hb({type:l,selectors:[["mat-button-toggle"]],viewQuery:function(t,e){var n;1&t&&k.Ic(T,!0),2&t&&k.pc(n=k.bc())&&(e._buttonElement=n.first)},hostAttrs:[1,"mat-button-toggle"],hostVars:11,hostBindings:function(t,e){1&t&&k.ac("focus",(function(){return e.focus()})),2&t&&(k.Cb("tabindex",-1)("id",e.id)("name",null),k.Fb("mat-button-toggle-standalone",!e.buttonToggleGroup)("mat-button-toggle-checked",e.checked)("mat-button-toggle-disabled",e.disabled)("mat-button-toggle-appearance-standard","standard"===e.appearance))},inputs:{disableRipple:"disableRipple",ariaLabelledby:["aria-labelledby","ariaLabelledby"],tabIndex:"tabIndex",appearance:"appearance",checked:"checked",disabled:"disabled",id:"id",name:"name",ariaLabel:["aria-label","ariaLabel"],value:"value"},outputs:{change:"change"},exportAs:["matButtonToggle"],features:[k.yb],ngContentSelectors:w,decls:6,vars:9,consts:[["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"id","disabled","click"],["button",""],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"]],template:function(t,e){if(1&t&&(k.jc(),k.Tb(0,"button",0,1),k.ac("click",(function(){return e._onButtonClick()})),k.Tb(2,"div",2),k.ic(3),k.Sb(),k.Sb(),k.Ob(4,"div",3),k.Ob(5,"div",4)),2&t){var n=k.qc(1);k.kc("id",e.buttonId)("disabled",e.disabled||null),k.Cb("tabindex",e.disabled?-1:e.tabIndex)("aria-pressed",e.checked)("name",e.name||null)("aria-label",e.ariaLabel)("aria-labelledby",e.ariaLabelledby),k.Bb(5),k.kc("matRippleTrigger",n)("matRippleDisabled",e.disableRipple||e.disabled)}},directives:[_.o],styles:[".mat-button-toggle-standalone,.mat-button-toggle-group{position:relative;display:inline-flex;flex-direction:row;white-space:nowrap;overflow:hidden;border-radius:2px;-webkit-tap-highlight-color:transparent}.cdk-high-contrast-active .mat-button-toggle-standalone,.cdk-high-contrast-active .mat-button-toggle-group{outline:solid 1px}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,.mat-button-toggle-group-appearance-standard{border-radius:4px}.cdk-high-contrast-active .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,.cdk-high-contrast-active .mat-button-toggle-group-appearance-standard{outline:0}.mat-button-toggle-vertical{flex-direction:column}.mat-button-toggle-vertical .mat-button-toggle-label-content{display:block}.mat-button-toggle{white-space:nowrap;position:relative}.mat-button-toggle .mat-icon svg{vertical-align:top}.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay{opacity:1}.cdk-high-contrast-active .mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay{opacity:.5}.mat-button-toggle-appearance-standard:not(.mat-button-toggle-disabled):hover .mat-button-toggle-focus-overlay{opacity:.04}.mat-button-toggle-appearance-standard.cdk-keyboard-focused:not(.mat-button-toggle-disabled) .mat-button-toggle-focus-overlay{opacity:.12}.cdk-high-contrast-active .mat-button-toggle-appearance-standard.cdk-keyboard-focused:not(.mat-button-toggle-disabled) .mat-button-toggle-focus-overlay{opacity:.5}@media(hover: none){.mat-button-toggle-appearance-standard:not(.mat-button-toggle-disabled):hover .mat-button-toggle-focus-overlay{display:none}}.mat-button-toggle-label-content{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:inline-block;line-height:36px;padding:0 16px;position:relative}.mat-button-toggle-appearance-standard .mat-button-toggle-label-content{padding:0 12px}.mat-button-toggle-label-content>*{vertical-align:middle}.mat-button-toggle-focus-overlay{border-radius:inherit;pointer-events:none;opacity:0;top:0;left:0;right:0;bottom:0;position:absolute}.mat-button-toggle-checked .mat-button-toggle-focus-overlay{border-bottom:solid 36px}.cdk-high-contrast-active .mat-button-toggle-checked .mat-button-toggle-focus-overlay{opacity:.5;height:0}.cdk-high-contrast-active .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay{border-bottom:solid 500px}.mat-button-toggle .mat-button-toggle-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-button-toggle-button{border:0;background:none;color:inherit;padding:0;margin:0;font:inherit;outline:none;width:100%;cursor:pointer}.mat-button-toggle-disabled .mat-button-toggle-button{cursor:default}.mat-button-toggle-button::-moz-focus-inner{border:0}\n"],encapsulation:2,changeDetection:0}),l),F=((u=function t(){s(this,t)}).\u0275mod=k.Lb({type:u}),u.\u0275inj=k.Kb({factory:function(t){return new(t||u)},imports:[[_.h,_.p],_.h]}),u),A=r("kmnG"),I=r("qFsG"),N=r("d3UM"),E=r("sYmb"),L=r("Wp6s"),R=r("A5z7"),G=r("NFeN"),V=r("STbY"),U=r("tyNb"),K=r("0IaG"),z=((b=function t(){s(this,t)}).\u0275mod=k.Lb({type:b}),b.\u0275inj=k.Kb({factory:function(t){return new(t||b)},imports:[[h.c,E.b,L.g,p.b,K.f,R.d,G.b,V.b,U.f]]}),b),H=((d=function t(){s(this,t)}).\u0275mod=k.Lb({type:d}),d.\u0275inj=k.Kb({factory:function(t){return new(t||d)},imports:[[h.c,m.m,E.b,I.c,G.b,A.d]]}),d),Q=r("7Cbv"),$=r("O3o7"),q=r("Tj/N"),X=r("c3AT"),Y=r("lGQG"),J=((g=function(){function t(){s(this,t),this.search=new k.o}return c(t,[{key:"ngOnInit",value:function(){}},{key:"onSearch",value:function(t){this.search.emit(t)}}]),t}()).\u0275fac=function(t){return new(t||g)},g.\u0275cmp=k.Hb({type:g,selectors:[["app-searchbar"]],outputs:{search:"search"},decls:7,vars:7,consts:[["appearance","outline",1,"mdm-form-field","searchbar"],["svgIcon","search","matPrefix",""],["type","text","matInput","",3,"placeholder","ngModel","ngModelChange"]],template:function(t,e){1&t&&(k.Tb(0,"mat-form-field",0),k.Tb(1,"mat-label"),k.Dc(2),k.fc(3,"translate"),k.Sb(),k.Ob(4,"mat-icon",1),k.Tb(5,"input",2),k.ac("ngModelChange",(function(t){return e.searchText=t}))("ngModelChange",(function(t){return e.onSearch(t)})),k.fc(6,"translate"),k.Sb(),k.Sb()),2&t&&(k.Bb(2),k.Ec(k.gc(3,3,"Search")),k.Bb(3),k.lc("placeholder",k.gc(6,5,"Search")),k.kc("ngModel",e.searchText))},directives:[A.b,A.f,G.a,A.g,I.b,m.c,m.r,m.u],pipes:[E.c],styles:[".searchbar[_ngcontent-%COMP%]{display:block}"]}),g),W=r("mrSG"),Z=((f=function(){function t(e){s(this,t),this.dialogRef=e}return c(t,[{key:"ngOnInit",value:function(){}},{key:"onSubmit",value:function(){this.dialogRef.close(!0)}}]),t}()).\u0275fac=function(t){return new(t||f)(k.Nb(K.g))},f.\u0275cmp=k.Hb({type:f,selectors:[["app-clone-project-modal"]],decls:16,vars:12,consts:[["mat-icon-button","","mat-dialog-close","",1,"dialog-close"],["mat-dialog-title",""],["align","end"],["mat-stroked-button","","mat-dialog-close","",1,"mdm-button"],["mat-flat-button","","color","primary",1,"mdm-button",3,"click"]],template:function(t,e){1&t&&(k.Tb(0,"button",0),k.Tb(1,"mat-icon"),k.Dc(2,"close"),k.Sb(),k.Sb(),k.Tb(3,"h2",1),k.Dc(4),k.fc(5,"translate"),k.Sb(),k.Tb(6,"p"),k.Dc(7),k.fc(8,"translate"),k.Sb(),k.Tb(9,"mat-dialog-actions",2),k.Tb(10,"button",3),k.Dc(11),k.fc(12,"translate"),k.Sb(),k.Tb(13,"button",4),k.ac("click",(function(){return e.onSubmit()})),k.Dc(14),k.fc(15,"translate"),k.Sb(),k.Sb()),2&t&&(k.Bb(4),k.Ec(k.gc(5,4,"CloneProject")),k.Bb(3),k.Ec(k.gc(8,6,"CloneProjectInfo")),k.Bb(4),k.Ec(k.gc(12,8,"Cancel")),k.Bb(3),k.Ec(k.gc(15,10,"Confirm")))},directives:[p.a,K.d,G.a,K.h,K.c],pipes:[E.c],styles:[""]}),f);function tt(t,e){if(1&t&&(k.Tb(0,"div"),k.Dc(1),k.Sb()),2&t){var n=e.$implicit,o=k.ec();k.Bb(1),k.Ec(n.shortName[o.currentLang])}}function et(t,e){if(1&t){var n=k.Ub();k.Rb(0),k.Tb(1,"button",13),k.ac("click",(function(){return k.sc(n),k.ec().onOpen()})),k.Dc(2),k.fc(3,"translate"),k.Sb(),k.Tb(4,"button",14),k.Tb(5,"mat-icon"),k.Dc(6,"expand_more"),k.Sb(),k.Sb(),k.Qb()}if(2&t){k.ec();var o=k.qc(44);k.Bb(2),k.Ec(k.gc(3,2,"Open")),k.Bb(2),k.kc("matMenuTriggerFor",o)}}function nt(t,e){if(1&t){var n=k.Ub();k.Rb(0),k.Tb(1,"button",13),k.ac("click",(function(){return k.sc(n),k.ec().onRestore()})),k.Tb(2,"mat-icon"),k.Dc(3,"restore"),k.Sb(),k.Dc(4),k.fc(5,"translate"),k.Sb(),k.Qb()}2&t&&(k.Bb(4),k.Ec(k.gc(5,1,"Restore")))}function ot(t,e){if(1&t){var n=k.Ub();k.Tb(0,"button",15),k.ac("click",(function(){return k.sc(n),k.ec().onClone()})),k.Tb(1,"mat-icon"),k.Dc(2,"content_copy"),k.Sb(),k.Tb(3,"span"),k.Dc(4),k.fc(5,"translate"),k.Sb(),k.Sb()}2&t&&(k.Bb(4),k.Ec(k.gc(5,1,"Clone")))}function at(t,e){if(1&t){var n=k.Ub();k.Tb(0,"button",15),k.ac("click",(function(){return k.sc(n),k.ec().onDelete()})),k.Tb(1,"mat-icon"),k.Dc(2,"delete"),k.Sb(),k.Tb(3,"span"),k.Dc(4),k.fc(5,"translate"),k.Sb(),k.Sb()}2&t&&(k.Bb(4),k.Ec(k.gc(5,1,"Delete")))}var rt,it=((rt=function(){function t(e,n,o,a,r){s(this,t),this.translateService=e,this.projectService=n,this.authService=o,this.router=a,this.dialog=r,this.delete=new k.o,this.restore=new k.o,this.clone=new k.o,this.getProjects=new k.o}return c(t,[{key:"ngOnInit",value:function(){var t=this;this.authService.currentUser.subscribe((function(e){t.currentUser=new q.a(e),t.projectOwner=t.project.users.filter((function(e){return e.id===t.currentUser.id})).length>0}))}},{key:"onOpen",value:function(){return Object(W.b)(this,void 0,void 0,regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:this.projectService.get(this.project.id).then((function(){e.router.navigate(["/project",e.project.id])}));case 1:case"end":return t.stop()}}),t,this)})))}},{key:"onDelete",value:function(){this.delete.emit(this.project)}},{key:"onRestore",value:function(){this.restore.emit(this.project)}},{key:"onClone",value:function(){var t=this;this.dialog.open(Z).afterClosed().subscribe((function(e){e&&t.clone.emit(t.project)}))}},{key:"projectCardAvatar",value:function(){if(this.project.users.length>0)return this.projectOwner?"person":localStorage.getItem("user::"+this.currentUser.id+"favorite"+this.project.id)?"star":"star_border"}},{key:"toggleFavourite",value:function(){this.projectOwner||(this.getProjects.emit(),localStorage.getItem("user::"+this.currentUser.id+"favorite"+this.project.id)?localStorage.removeItem("user::"+this.currentUser.id+"favorite"+this.project.id):localStorage.setItem("user::"+this.currentUser.id+"favorite"+this.project.id,"true"))}},{key:"currentLang",get:function(){return this.translateService.currentLang?this.translateService.currentLang:this.translateService.defaultLang}}]),t}()).\u0275fac=function(t){return new(t||rt)(k.Nb(E.d),k.Nb(X.a),k.Nb(Y.a),k.Nb(U.b),k.Nb(K.b))},rt.\u0275cmp=k.Hb({type:rt,selectors:[["app-project"]],inputs:{project:"project"},outputs:{delete:"delete",restore:"restore",clone:"clone",getProjects:"getProjects"},decls:47,vars:40,consts:[[1,"card-header"],["mat-card-avatar","",1,"project-country"],[3,"click"],[1,"project-status"],["color","accent","selected",""],[1,"card-info"],[1,"card-info-title"],[1,"card-info-value"],[4,"ngFor","ngForOf"],["align","end",1,"mdm-button-group"],[4,"ngIf"],["menu","matMenu"],["mat-menu-item","",3,"click",4,"ngIf"],["mat-stroked-button","",1,"mdm-button",3,"click"],["mat-stroked-button","","mat-icon-button","",1,"mdm-button",3,"matMenuTriggerFor"],["mat-menu-item","",3,"click"]],template:function(t,e){1&t&&(k.Tb(0,"mat-card"),k.Tb(1,"mat-card-header",0),k.Tb(2,"div",1),k.Tb(3,"mat-icon",2),k.ac("click",(function(){return e.toggleFavourite()})),k.Dc(4),k.Sb(),k.Sb(),k.Tb(5,"mat-card-title"),k.Dc(6),k.Sb(),k.Tb(7,"mat-chip-list",3),k.Tb(8,"mat-chip",4),k.Dc(9),k.fc(10,"translate"),k.Sb(),k.Sb(),k.Sb(),k.Tb(11,"mat-card-content"),k.Tb(12,"div",5),k.Tb(13,"div",6),k.Dc(14),k.fc(15,"translate"),k.Sb(),k.Tb(16,"div",7),k.Dc(17),k.Sb(),k.Sb(),k.Tb(18,"div",5),k.Tb(19,"div",6),k.Dc(20),k.fc(21,"translate"),k.Sb(),k.Tb(22,"div",7),k.Dc(23),k.fc(24,"date"),k.fc(25,"date"),k.Sb(),k.Sb(),k.Tb(26,"div",5),k.Tb(27,"div",6),k.Dc(28),k.fc(29,"translate"),k.Sb(),k.Tb(30,"div",7),k.Bc(31,tt,2,1,"div",8),k.Sb(),k.Sb(),k.Tb(32,"div",5),k.Tb(33,"div",6),k.Dc(34),k.fc(35,"translate"),k.Sb(),k.Tb(36,"div",7),k.Dc(37),k.fc(38,"date"),k.fc(39,"translate"),k.Sb(),k.Sb(),k.Sb(),k.Tb(40,"mat-card-actions",9),k.Bc(41,et,7,4,"ng-container",10),k.Bc(42,nt,6,3,"ng-container",10),k.Sb(),k.Sb(),k.Tb(43,"mat-menu",null,11),k.Bc(45,ot,6,3,"button",12),k.Bc(46,at,6,3,"button",12),k.Sb()),2&t&&(k.Bb(3),k.Db(e.projectOwner?"icon-default":"icon-button"),k.Bb(1),k.Ec(e.projectCardAvatar()),k.Bb(2),k.Fc(" ",e.project.country," "),k.Bb(3),k.Ec(k.gc(10,19,e.project.status)),k.Bb(5),k.Ec(k.gc(15,21,"Name")),k.Bb(3),k.Ec(e.project.name),k.Bb(3),k.Ec(k.gc(21,23,"Date")),k.Bb(3),k.Gc("",k.hc(24,25,e.project.start,"mediumDate")," - ",k.hc(25,28,e.project.end,"mediumDate"),""),k.Bb(5),k.Ec(k.gc(29,31,"Thematics")),k.Bb(3),k.kc("ngForOf",e.project.themes),k.Bb(3),k.Ec(k.gc(35,33,"LastEntry")),k.Bb(3),k.Ec(e.project.inputDate?k.hc(38,35,e.project.inputDate,"mediumDate"):k.gc(39,38,"None")),k.Bb(4),k.kc("ngIf",e.project.active),k.Bb(1),k.kc("ngIf",!e.project.active),k.Bb(3),k.kc("ngIf",e.project.active),k.Bb(1),k.kc("ngIf",e.project.active))},directives:[L.a,L.e,L.c,G.a,L.h,R.b,R.a,L.d,h.k,L.b,h.l,V.d,p.a,V.c,V.a],pipes:[E.c,h.e],styles:[".card-header[_ngcontent-%COMP%]   .project-country[_ngcontent-%COMP%]{height:24px;width:24px}.card-header[_ngcontent-%COMP%]   .project-country[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%}.card-header[_ngcontent-%COMP%]   .project-status[_ngcontent-%COMP%]{margin-left:auto}.card-info[_ngcontent-%COMP%]{flex-direction:row}.icon-button[_ngcontent-%COMP%]{cursor:pointer}.icon-default[_ngcontent-%COMP%]{cursor:default}"]}),rt),ct=["allSelected"];function st(t,e){if(1&t){var n=k.Ub();k.Tb(0,"mat-option",17),k.ac("click",(function(){return k.sc(n),k.ec().onToggleCountry()})),k.Dc(1),k.Sb()}if(2&t){var o=e.$implicit;k.kc("value",o),k.Bb(1),k.Ec(o)}}function ut(t,e){if(1&t&&(k.Tb(0,"mat-button-toggle",18),k.Dc(1),k.fc(2,"translate"),k.Sb()),2&t){var n=e.$implicit;k.kc("value",n.value),k.Bb(1),k.Ec(k.gc(2,2,n.text))}}function lt(t,e){if(1&t){var n=k.Ub();k.Tb(0,"app-project",19),k.ac("getProjects",(function(){return k.sc(n),k.ec().getProjects()}))("delete",(function(t){return k.sc(n),k.ec().onDelete(t)}))("restore",(function(t){return k.sc(n),k.ec().onRestore(t)}))("clone",(function(t){return k.sc(n),k.ec().onClone(t)})),k.Sb()}2&t&&k.kc("project",e.$implicit)}var dt,bt,gt,ft,ht=[{path:"",component:(dt=function(){function t(e,n,o,a,r){s(this,t),this.fb=e,this.projectService=n,this.translateService=o,this.authService=a,this.router=r,this.countries=[],this.statuses=[{text:"OngoingPlural",value:"Ongoing"},{text:"FinishedPlural",value:"Finished"},{text:"DeletedPlural",value:"Deleted"}]}return c(t,[{key:"ngOnInit",value:function(){var t=this;this.filtersForm=this.fb.group({search:"",countries:[[]],themes:[[]],statuses:[["Ongoing"]]}),this.getProjects(),this.filtersForm.valueChanges.subscribe((function(){t.onFilterChange()})),this.authService.currentUser.subscribe((function(e){t.currentUser=new q.a(e)}))}},{key:"getProjects",value:function(){var t=this;this.projectService.list().then((function(e){return t.allProjects=e,t.countries=a(new Set(e.map((function(t){return t.country})))),t.filtersForm.controls.countries.setValue(t.countries.concat(["0"])),t.projects.sort((function(e,n){return e.users.find((function(e){return t.isOwner(e)}))||n.users.find((function(e){return t.isOwner(e)}))?e.users.find((function(e){return t.isOwner(e)}))&&n.users.find((function(e){return t.isOwner(e)}))?e.country.localeCompare(n.country):e.users.find((function(e){return t.isOwner(e)}))?-1:1:localStorage.getItem("user::"+t.currentUser.id+"favorite"+e.id)?localStorage.getItem("user::"+t.currentUser.id+"favorite"+n.id)?e.country.localeCompare(n.country):-1:1}))}))}},{key:"onCreate",value:function(){var t=new $.a;t.id="project:"+Object(Q.a)();var e=new q.a({type:"internal",role:"owner",id:this.currentUser.id});t.users.push(e),this.projectService.create(t),this.router.navigate(["/project",t.id])}},{key:"onDelete",value:function(t){var e=this;this.projectService.delete(t.id).then((function(){e.getProjects()}))}},{key:"onRestore",value:function(t){var e=this;this.projectService.restore(t.id).then((function(){e.getProjects()}))}},{key:"onClone",value:function(t){var e=this;this.projectService.clone(t.id).then((function(){e.getProjects()}))}},{key:"onToggleCountry",value:function(){this.allSelected.selected?this.allSelected.deselect():this.filtersForm.value.countries.length===this.countries.length&&this.allSelected.select()}},{key:"onToggleAllCountries",value:function(){this.filtersForm.controls.countries.setValue(this.allSelected.selected?[].concat(a(this.countries),["0"]):[])}},{key:"onSearch",value:function(t){this.filtersForm.controls.search.setValue(t)}},{key:"onFilterChange",value:function(){var t=this.filterByText(this.allProjects);t=this.filterByCountries(t),t=this.filterByStatuses(t),this.projects=t}},{key:"filterByText",value:function(t){var e=this,n=this.filtersForm.value.search.toLowerCase();return t.filter((function(t){return t.name.toLowerCase().includes(n)||t.country.toLowerCase().includes(n)||t.themes.find((function(t){return t.shortName[e.currentLang].toLowerCase().includes(n)}))}))}},{key:"filterByCountries",value:function(t){var e=this.filtersForm.value.countries;return e.length>0?t.filter((function(t){return e.includes(t.country)})):[]}},{key:"filterByStatuses",value:function(t){var e=[],n=this.filtersForm.value.statuses;return n.includes("Ongoing")&&(e=e.concat(t.filter((function(t){return"Ongoing"===t.status})))),n.includes("Finished")&&(e=e.concat(t.filter((function(t){return"Finished"===t.status})))),n.includes("Deleted")&&(e=e.concat(t.filter((function(t){return"Deleted"===t.status})))),e}},{key:"isOwner",value:function(t){return"owner"===t.role&&t.id===this.currentUser.id}},{key:"currentLang",get:function(){return this.translateService.currentLang?this.translateService.currentLang:this.translateService.defaultLang}}]),t}(),dt.\u0275fac=function(t){return new(t||dt)(k.Nb(m.f),k.Nb(X.a),k.Nb(E.d),k.Nb(Y.a),k.Nb(U.b))},dt.\u0275cmp=k.Hb({type:dt,selectors:[["app-projects"]],viewQuery:function(t,e){var n;1&t&&k.Ic(ct,!0),2&t&&k.pc(n=k.bc())&&(e.allSelected=n.first)},decls:30,vars:17,consts:[[1,"full-page"],[1,"mdm-title"],[1,"actions",3,"formGroup"],[1,"actions-group"],[1,"action"],["appearance","outline",1,"mdm-form-field"],["formControlName","countries","multiple",""],["value","0",3,"click"],["allSelected",""],[3,"value","click",4,"ngFor","ngForOf"],["formControlName","statuses","multiple",""],[3,"value",4,"ngFor","ngForOf"],[3,"search"],["mat-raised-button","","color","primary",3,"click"],["svgIcon","add-folder"],[1,"mdm-cards"],["class","mdm-card",3,"project","getProjects","delete","restore","clone",4,"ngFor","ngForOf"],[3,"value","click"],[3,"value"],[1,"mdm-card",3,"project","getProjects","delete","restore","clone"]],template:function(t,e){1&t&&(k.Tb(0,"div",0),k.Tb(1,"div",1),k.Dc(2),k.fc(3,"translate"),k.Sb(),k.Tb(4,"div",2),k.Tb(5,"div",3),k.Tb(6,"div",4),k.Tb(7,"mat-form-field",5),k.Tb(8,"mat-label"),k.Dc(9),k.fc(10,"translate"),k.Sb(),k.Tb(11,"mat-select",6),k.Tb(12,"mat-option",7,8),k.ac("click",(function(){return e.onToggleAllCountries()})),k.Dc(14),k.fc(15,"translate"),k.Sb(),k.Bc(16,st,2,2,"mat-option",9),k.Sb(),k.Sb(),k.Sb(),k.Tb(17,"div",4),k.Tb(18,"mat-button-toggle-group",10),k.Bc(19,ut,3,4,"mat-button-toggle",11),k.Sb(),k.Sb(),k.Sb(),k.Tb(20,"div",3),k.Tb(21,"div",4),k.Tb(22,"app-searchbar",12),k.ac("search",(function(t){return e.onSearch(t)})),k.Sb(),k.Sb(),k.Tb(23,"div",4),k.Tb(24,"button",13),k.ac("click",(function(){return e.onCreate()})),k.Ob(25,"mat-icon",14),k.Dc(26),k.fc(27,"translate"),k.Sb(),k.Sb(),k.Sb(),k.Sb(),k.Tb(28,"div",15),k.Bc(29,lt,1,1,"app-project",16),k.Sb(),k.Sb()),2&t&&(k.Bb(2),k.Ec(k.gc(3,9,"Projects")),k.Bb(2),k.kc("formGroup",e.filtersForm),k.Bb(5),k.Ec(k.gc(10,11,"Countries")),k.Bb(5),k.Gc("",k.gc(15,13,"AllCountries")," (",e.countries.length,")"),k.Bb(2),k.kc("ngForOf",e.countries),k.Bb(3),k.kc("ngForOf",e.statuses),k.Bb(7),k.Fc(" ",k.gc(27,15,"CreateNewProject")," "),k.Bb(3),k.kc("ngForOf",e.projects))},directives:[m.s,m.k,A.b,A.f,N.a,m.r,m.i,_.m,h.k,D,J,p.a,G.a,P,it],pipes:[E.c],styles:['@font-face{font-family:Neutra-Text;src:url(/assets/fonts/Neutra-Text_32171.ttf) format("truetype")}@font-face{font-family:Neutra-Text;src:url(/assets/fonts/Neutra-Text-Bold_32106.ttf) format("truetype");font-weight:700}@font-face{font-family:Neutra-Text-Light;src:url(/assets/fonts/Neutra-Text-Light_32131.ttf) format("truetype")}@font-face{font-family:Neutra-Text-Light-Demi;src:url(/assets/fonts/Neutra-Text-Light-Demi_32117.ttf) format("truetype")}.actions[_ngcontent-%COMP%]{justify-content:space-between;margin-top:24px}.actions[_ngcontent-%COMP%], .actions[_ngcontent-%COMP%]   .actions-group[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap}@media screen and (min-width:600px){.actions[_ngcontent-%COMP%]   .actions-group[_ngcontent-%COMP%]{flex:1}.actions[_ngcontent-%COMP%]   .actions-group[_ngcontent-%COMP%]:first-child   .action[_ngcontent-%COMP%]:not(:last-child){margin-right:16px}.actions[_ngcontent-%COMP%]   .actions-group[_ngcontent-%COMP%]:last-child{justify-content:flex-end}.actions[_ngcontent-%COMP%]   .actions-group[_ngcontent-%COMP%]:last-child   .action[_ngcontent-%COMP%]:not(:first-child){margin-left:16px}}@media screen and (max-width:599px){.actions[_ngcontent-%COMP%]   .actions-group[_ngcontent-%COMP%]{width:100%;justify-content:space-between}.actions[_ngcontent-%COMP%]   .actions-group[_ngcontent-%COMP%]:first-child{margin-bottom:24px}}']}),dt)}],mt=((ft=function t(){s(this,t)}).\u0275mod=k.Lb({type:ft}),ft.\u0275inj=k.Kb({factory:function(t){return new(t||ft)},imports:[[U.f.forChild(ht)],U.f]}),ft),pt=((gt=function t(){s(this,t)}).\u0275mod=k.Lb({type:gt}),gt.\u0275inj=k.Kb({factory:function(t){return new(t||gt)},imports:[[h.c,E.b,p.b,G.b,A.d,K.f]]}),gt),vt=((bt=function t(){s(this,t)}).\u0275mod=k.Lb({type:bt}),bt.\u0275inj=k.Kb({factory:function(t){return new(t||bt)},imports:[[h.c,pt,E.b,mt,m.m,m.w,N.b,I.c,A.d,G.b,p.b,F,H,z]]}),bt)},Wp6s:function(t,e,n){"use strict";n.d(e,"a",(function(){return m})),n.d(e,"b",(function(){return g})),n.d(e,"c",(function(){return h})),n.d(e,"d",(function(){return d})),n.d(e,"e",(function(){return p})),n.d(e,"f",(function(){return f})),n.d(e,"g",(function(){return v})),n.d(e,"h",(function(){return b}));var o=n("R1ws"),a=n("FKr1"),r=n("fXoL"),i=["*",[["mat-card-footer"]]],c=["*","mat-card-footer"],u=[[["","mat-card-avatar",""],["","matCardAvatar",""]],[["mat-card-title"],["mat-card-subtitle"],["","mat-card-title",""],["","mat-card-subtitle",""],["","matCardTitle",""],["","matCardSubtitle",""]],"*"],l=["[mat-card-avatar], [matCardAvatar]","mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]","*"],d=function(){var t=function t(){s(this,t)};return t.\u0275fac=function(e){return new(e||t)},t.\u0275dir=r.Ib({type:t,selectors:[["mat-card-content"],["","mat-card-content",""],["","matCardContent",""]],hostAttrs:[1,"mat-card-content"]}),t}(),b=function(){var t=function t(){s(this,t)};return t.\u0275fac=function(e){return new(e||t)},t.\u0275dir=r.Ib({type:t,selectors:[["mat-card-title"],["","mat-card-title",""],["","matCardTitle",""]],hostAttrs:[1,"mat-card-title"]}),t}(),g=function(){var t=function t(){s(this,t),this.align="start"};return t.\u0275fac=function(e){return new(e||t)},t.\u0275dir=r.Ib({type:t,selectors:[["mat-card-actions"]],hostAttrs:[1,"mat-card-actions"],hostVars:2,hostBindings:function(t,e){2&t&&r.Fb("mat-card-actions-align-end","end"===e.align)},inputs:{align:"align"},exportAs:["matCardActions"]}),t}(),f=function(){var t=function t(){s(this,t)};return t.\u0275fac=function(e){return new(e||t)},t.\u0275dir=r.Ib({type:t,selectors:[["","mat-card-image",""],["","matCardImage",""]],hostAttrs:[1,"mat-card-image"]}),t}(),h=function(){var t=function t(){s(this,t)};return t.\u0275fac=function(e){return new(e||t)},t.\u0275dir=r.Ib({type:t,selectors:[["","mat-card-avatar",""],["","matCardAvatar",""]],hostAttrs:[1,"mat-card-avatar"]}),t}(),m=function(){var t=function t(e){s(this,t),this._animationMode=e};return t.\u0275fac=function(e){return new(e||t)(r.Nb(o.a,8))},t.\u0275cmp=r.Hb({type:t,selectors:[["mat-card"]],hostAttrs:[1,"mat-card","mat-focus-indicator"],hostVars:2,hostBindings:function(t,e){2&t&&r.Fb("_mat-animation-noopable","NoopAnimations"===e._animationMode)},exportAs:["matCard"],ngContentSelectors:c,decls:2,vars:0,template:function(t,e){1&t&&(r.jc(i),r.ic(0),r.ic(1,1))},styles:[".mat-card{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:block;position:relative;padding:16px;border-radius:4px}._mat-animation-noopable.mat-card{transition:none;animation:none}.mat-card .mat-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .mat-card .mat-divider-horizontal{left:auto;right:0}.mat-card .mat-divider-horizontal.mat-divider-inset{position:static;margin:0}[dir=rtl] .mat-card .mat-divider-horizontal.mat-divider-inset{margin-right:0}.cdk-high-contrast-active .mat-card{outline:solid 1px}.mat-card-actions,.mat-card-subtitle,.mat-card-content{display:block;margin-bottom:16px}.mat-card-title{display:block;margin-bottom:8px}.mat-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.mat-card-actions-align-end{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px}.mat-card-footer{display:block;margin:0 -16px -16px -16px}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button,.mat-card-actions .mat-stroked-button{margin:0 8px}.mat-card-header{display:flex;flex-direction:row}.mat-card-header .mat-card-title{margin-bottom:12px}.mat-card-header-text{margin:0 16px}.mat-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-card-title-group{display:flex;justify-content:space-between}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-title-group>.mat-card-xl-image{margin:-8px 0 8px}@media(max-width: 599px){.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}}.mat-card>:first-child,.mat-card-content>:first-child{margin-top:0}.mat-card>:last-child:not(.mat-card-footer),.mat-card-content>:last-child:not(.mat-card-footer){margin-bottom:0}.mat-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.mat-card>.mat-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.mat-card-actions .mat-button:first-child,.mat-card-actions .mat-raised-button:first-child,.mat-card-actions .mat-stroked-button:first-child{margin-left:0;margin-right:0}.mat-card-title:not(:first-child),.mat-card-subtitle:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child){margin-top:-8px}.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}\n"],encapsulation:2,changeDetection:0}),t}(),p=function(){var t=function t(){s(this,t)};return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=r.Hb({type:t,selectors:[["mat-card-header"]],hostAttrs:[1,"mat-card-header"],ngContentSelectors:l,decls:4,vars:0,consts:[[1,"mat-card-header-text"]],template:function(t,e){1&t&&(r.jc(u),r.ic(0),r.Tb(1,"div",0),r.ic(2,1),r.Sb(),r.ic(3,2))},encapsulation:2,changeDetection:0}),t}(),v=function(){var t=function t(){s(this,t)};return t.\u0275mod=r.Lb({type:t}),t.\u0275inj=r.Kb({factory:function(e){return new(e||t)},imports:[[a.h],a.h]}),t}()}}])}();