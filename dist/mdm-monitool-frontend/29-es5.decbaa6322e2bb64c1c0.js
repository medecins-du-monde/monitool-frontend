!function(){function t(t,n){var a;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(a=function(t,n){if(!t)return;if("string"==typeof t)return e(t,n);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return e(t,n)}(t))||n&&t&&"number"==typeof t.length){a&&(t=a);var r=0,i=function(){};return{s:i,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,u=!1;return{s:function(){a=t[Symbol.iterator]()},n:function(){var t=a.next();return c=t.done,t},e:function(t){u=!0,o=t},f:function(){try{c||null==a.return||a.return()}finally{if(u)throw o}}}}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{"5ncX":function(e,r,i){"use strict";i.r(r),i.d(r,"InputsModule",(function(){return $}));var o=i("ofXK"),c=i("tyNb"),u=i("mrSG"),s=i("quSY"),l=i("RtbK"),f=i.n(l),m=i("IXMC"),b=i("fXoL"),d=i("c3AT"),h=i("sYmb"),p=i("wLEN"),v=i("bTqV"),g=i("NFeN"),D=i("+0xr");function y(t,e){if(1&t&&(b.Tb(0,"span"),b.Dc(1),b.Sb()),2&t){var n=b.ec();b.Bb(1),b.Fc('"',n.form.name,'"')}}function S(t,e){if(1&t&&(b.Tb(0,"th",14),b.Dc(1),b.fc(2,"translate"),b.Sb()),2&t){var n=b.ec().$implicit;b.Bb(1),b.Ec(b.gc(2,1,n))}}function k(t,e){if(1&t&&(b.Tb(0,"div"),b.Dc(1),b.Sb()),2&t){var n=b.ec().$implicit,a=b.ec().$implicit;b.Bb(1),b.Ec(n[a])}}function w(t,e){if(1&t&&(b.Tb(0,"div"),b.Tb(1,"button",19),b.Dc(2),b.fc(3,"translate"),b.Sb(),b.Sb()),2&t){var n=b.ec(2).$implicit,a=b.ec().$implicit;b.Bb(1),b.kc("routerLink",n[a].routerLink),b.Bb(1),b.Ec(b.gc(3,2,"Create"))}}function C(t,e){if(1&t&&(b.Tb(0,"button",20),b.Dc(1),b.fc(2,"translate"),b.Sb()),2&t){var n=b.ec(2).$implicit,a=b.ec().$implicit;b.kc("routerLink",n[a].routerLink),b.Bb(1),b.Gc("",b.gc(2,3,"Edit")," (",n[a].value,"%)")}}function B(t,e){if(1&t&&(b.Bc(0,w,4,4,"div",16),b.Bc(1,C,3,5,"ng-template",null,18,b.Cc)),2&t){var n=b.qc(2),a=b.ec().$implicit,r=b.ec().$implicit;b.kc("ngIf",-1===a[r].value)("ngIfElse",n)}}function O(t,e){if(1&t&&(b.Tb(0,"td",15),b.Bc(1,k,2,1,"div",16),b.Bc(2,B,3,2,"ng-template",null,17,b.Cc),b.Sb()),2&t){var n=b.qc(3),a=b.ec().$implicit;b.lc("id",a),b.Bb(1),b.kc("ngIf","Date"===a)("ngIfElse",n)}}function I(t,e){1&t&&(b.Rb(0,11),b.Bc(1,S,3,3,"th",12),b.Bc(2,O,4,3,"td",13),b.Qb()),2&t&&b.lc("matColumnDef",e.$implicit)}function L(t,e){if(1&t){var n=b.Ub();b.Tb(0,"button",23),b.ac("click",(function(){return b.sc(n),b.ec(2).seeOlderDates()})),b.Dc(1),b.fc(2,"translate"),b.Sb()}2&t&&(b.Bb(1),b.Ec(b.gc(2,1,"SeeOlderDates")))}function T(t,e){if(1&t&&(b.Tb(0,"td",21),b.Bc(1,L,3,3,"ng-template",22),b.Sb()),2&t){var n=b.ec();b.Cb("colspan",n.displayedColumns.length),b.Bb(1),b.kc("ngIf",n.seeOlderDatesFlag)}}function P(t,e){1&t&&b.Ob(0,"tr",24)}function j(t,e){1&t&&b.Ob(0,"tr",25)}function M(t,e){1&t&&b.Ob(0,"tr",26)}var _,F,V,E=function(){return["expandedDates"]},x=[{path:"**",component:(_=function(){function e(t,a,r,i,o){n(this,e),this.route=t,this.projectService=a,this.translateService=r,this.datepipe=i,this.inputService=o,this.displayedColumns=[],this.dataSource=[],this.seeOlderDatesFlag=!0,this.sites=[],this.subscription=new s.a}var r,i,o;return r=e,(i=[{key:"ngOnInit",value:function(){var t=this;this.subscription.add(this.projectService.openedProject.subscribe((function(e){t.project=e,t.updateData()}))),this.subscription.add(this.route.params.subscribe((function(e){t.formId=e.formId,t.updateData()})))}},{key:"updateData",value:function(){return Object(u.b)(this,void 0,void 0,regeneratorRuntime.mark((function e(){var n,a,r,i,o,c,u,s,l,b,d,h,p,v=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.formId&&this.project&&(this.form=this.project.forms.find((function(t){return t.id===v.formId})),this.sites=this.form?this.form.entities:[],this.displayedColumns=["Date"].concat(this.sites.map((function(t){return t.name})))),this.thisYearDates=[],this.allDates=[],this.form)if((n=new Date)>this.form.end&&(n=this.form.end),a=n.getFullYear().toString(),r=f.a.fromDate(n,m.a[this.form.periodicity]),i=f.a.fromDate(this.form.start,m.a[this.form.periodicity]),r===i)this.thisYearDates=[{humanValue:r.humanizeValue(this.currentLang),value:r.value}],this.allDates=[{humanValue:r.humanizeValue(this.currentLang),value:r.value}];else{for(;r!==i;)a===r.value.slice(0,4)&&this.thisYearDates.push({humanValue:r.humanizeValue(this.currentLang),value:r.value}),this.allDates.push({humanValue:r.humanizeValue(this.currentLang),value:r.value}),r=r.previous();a===r.value.slice(0,4)&&this.thisYearDates.push({humanValue:r.humanizeValue(this.currentLang),value:r.value}),this.allDates.push({humanValue:r.humanizeValue(this.currentLang),value:r.value})}if(!this.project||!this.form){e.next=9;break}return e.next=4,this.inputService.list(this.project.id,this.formId);case 4:this.inputProgress=e.sent,o="input:".concat(this.project.id,":").concat(this.formId),c=[],u=t(this.thisYearDates);try{for(u.s();!(s=u.n()).done;){l=s.value,b={Date:l.humanValue},d=t(this.sites);try{for(d.s();!(h=d.n()).done;)p=h.value,b[p.name]="".concat(o,":").concat(p.id,":").concat(l.value)in this.inputProgress?{value:100*this.inputProgress["".concat(o,":").concat(p.id,":").concat(l.value)],routerLink:"./edit/".concat(p.id,"/").concat(l.value)}:{value:-1,routerLink:"./edit/".concat(p.id,"/").concat(l.value)}}catch(g){d.e(g)}finally{d.f()}c.push(b)}}catch(g){u.e(g)}finally{u.f()}this.dataSource=c;case 9:case"end":return e.stop()}}),e,this)})))}},{key:"seeOlderDates",value:function(){var e,n="input:".concat(this.project.id,":").concat(this.formId),a=[],r=t(this.allDates);try{for(r.s();!(e=r.n()).done;){var i,o=e.value,c={Date:o.humanValue},u=t(this.sites);try{for(u.s();!(i=u.n()).done;){var s=i.value;c[s.name]="".concat(n,":").concat(s.id,":").concat(o.value)in this.inputProgress?{value:100*this.inputProgress["".concat(n,":").concat(s.id,":").concat(o.value)],routerLink:"./edit/".concat(s.id,"/").concat(o.value)}:{value:-1,routerLink:"./edit/".concat(s.id,"/").concat(o.value)}}}catch(l){u.e(l)}finally{u.f()}a.push(c)}}catch(l){r.e(l)}finally{r.f()}this.dataSource=a,this.seeOlderDatesFlag=!1}},{key:"ngOnDestroy",value:function(){this.subscription.unsubscribe()}},{key:"currentLang",get:function(){return this.translateService.currentLang?this.translateService.currentLang:this.translateService.defaultLang}}])&&a(r.prototype,i),o&&a(r,o),e}(),_.\u0275fac=function(t){return new(t||_)(b.Nb(c.a),b.Nb(d.a),b.Nb(h.d),b.Nb(o.e),b.Nb(p.a))},_.\u0275cmp=b.Hb({type:_,selectors:[["app-inputs"]],decls:28,vars:16,consts:[[1,"info-section","blue"],[1,"info-buttons"],["mat-stroked-button","",1,"mdm-button"],[4,"ngIf"],["mat-table","",1,"mdm-table",3,"dataSource"],[3,"matColumnDef",4,"ngFor","ngForOf"],["matColumnDef","expandedDates"],["mat-footer-cell","","class","expand-row",4,"matFooterCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-footer-row","",4,"matFooterRowDef"],[3,"matColumnDef"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",3,"id",4,"matCellDef"],["mat-header-cell",""],["mat-cell","",3,"id"],[4,"ngIf","ngIfElse"],["elseBlock",""],["elseBlock2",""],["mat-stroked-button","",1,"mdm-button","small-button","create-button",3,"routerLink"],["mat-stroked-button","",1,"mdm-button","small-button",3,"routerLink"],["mat-footer-cell","",1,"expand-row"],[3,"ngIf"],["mat-stroked-button","",1,"mdm-button","small-button",3,"click"],["mat-header-row",""],["mat-row",""],["mat-footer-row",""]],template:function(t,e){1&t&&(b.Tb(0,"div",0),b.Tb(1,"div",1),b.Tb(2,"button",2),b.Tb(3,"mat-icon"),b.Dc(4,"insert_drive_file"),b.Sb(),b.Dc(5,"Download PDF (portrait)"),b.Sb(),b.Tb(6,"button",2),b.Tb(7,"mat-icon"),b.Dc(8,"note"),b.Sb(),b.Dc(9,"Download PDF (landscape)"),b.Sb(),b.Sb(),b.Tb(10,"span"),b.Tb(11,"p"),b.Dc(12),b.fc(13,"translate"),b.Bc(14,y,2,1,"span",3),b.Sb(),b.Tb(15,"p"),b.Dc(16),b.fc(17,"translate"),b.Sb(),b.Tb(18,"p"),b.Dc(19),b.fc(20,"translate"),b.Sb(),b.Sb(),b.Sb(),b.Tb(21,"table",4),b.Bc(22,I,3,1,"ng-container",5),b.Rb(23,6),b.Bc(24,T,2,2,"td",7),b.Qb(),b.Bc(25,P,1,0,"tr",8),b.Bc(26,j,1,0,"tr",9),b.Bc(27,M,1,0,"tr",10),b.Sb()),2&t&&(b.Bb(12),b.Fc("",b.gc(13,9,"InputsInfo.0")," "),b.Bb(2),b.kc("ngIf",e.form),b.Bb(2),b.Ec(b.gc(17,11,"InputsInfo.1")),b.Bb(3),b.Ec(b.gc(20,13,"InputsInfo.2")),b.Bb(2),b.kc("dataSource",e.dataSource),b.Bb(1),b.kc("ngForOf",e.displayedColumns),b.Bb(3),b.kc("matHeaderRowDef",e.displayedColumns),b.Bb(1),b.kc("matRowDefColumns",e.displayedColumns),b.Bb(1),b.kc("matFooterRowDef",b.nc(15,E)))},directives:[v.a,g.a,o.l,D.n,o.k,D.c,D.e,D.k,D.m,D.g,D.i,D.b,D.h,D.a,c.c,D.d,D.j,D.l,D.f],pipes:[h.c],styles:[".mdm-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], .mdm-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{text-align:center}.mdm-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{height:100%;padding:4px}.mdm-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:not(.expand-row)   button[_ngcontent-%COMP%]{width:100%}.create-button[_ngcontent-%COMP%]{color:#fff;background-color:#31708f;border-color:#31708f!important}"]}),_)}],R=((V=function t(){n(this,t)}).\u0275mod=b.Lb({type:V}),V.\u0275inj=b.Kb({factory:function(t){return new(t||V)},imports:[[c.f.forChild(x)],c.f]}),V),$=((F=function t(){n(this,t)}).\u0275mod=b.Lb({type:F}),F.\u0275inj=b.Kb({factory:function(t){return new(t||F)},imports:[[o.c,R,h.b,D.p,v.b,g.b]]}),F)}}])}();