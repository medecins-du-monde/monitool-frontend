!function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function e(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{"1p7F":function(t,n,c){"use strict";c.r(n),c.d(n,"LogicalFramesModule",(function(){return vt}));var o,a,r,s,l,b,d=c("ofXK"),m=c("bTqV"),u=c("NFeN"),f=c("sYmb"),p=c("3Pt+"),g=c("A5z7"),v=c("FKr1"),h=c("iadO"),S=c("7EHt"),T=c("kmnG"),k=c("qFsG"),F=c("d3UM"),D=c("YjUb"),y=c("0IaG"),B=c("+0xr"),I=c("fXoL"),w=((l=function t(){i(this,t)}).\u0275mod=I.Lb({type:l}),l.\u0275inj=I.Kb({factory:function(t){return new(t||l)},imports:[[d.c,f.b,p.m,p.w,m.b,u.b,B.p,T.d,F.b,y.f,k.c,g.d,h.c,v.k]]}),l),O=((s=function t(){i(this,t)}).\u0275mod=I.Lb({type:s}),s.\u0275inj=I.Kb({factory:function(t){return new(t||s)},imports:[[d.c,f.b,p.m,p.w,k.c,m.b,u.b,T.d,w,D.a]]}),s),E=((r=function t(){i(this,t)}).\u0275mod=I.Lb({type:r}),r.\u0275inj=I.Kb({factory:function(t){return new(t||r)},imports:[[d.c,f.b,p.m,p.w,k.c,m.b,u.b,T.d,S.b,O,w,D.a]]}),r),A=((a=function t(){i(this,t)}).\u0275mod=I.Lb({type:a}),a.\u0275inj=I.Kb({factory:function(t){return new(t||a)},imports:[[d.c,f.b,p.m,p.w,k.c,m.b,u.b,T.d,S.b,E,w,D.a]]}),a),x=((o=function t(){i(this,t)}).\u0275mod=I.Lb({type:o}),o.\u0275inj=I.Kb({factory:function(t){return new(t||o)},imports:[[d.c,f.b,p.m,p.w,k.c,u.b,F.b,g.d,T.d,h.c,v.k,m.b,S.b,A,w,D.a]]}),o),N=c("Wp6s"),j=c("STbY"),C=c("tyNb"),P=((b=function t(){i(this,t)}).\u0275mod=I.Lb({type:b}),b.\u0275inj=I.Kb({factory:function(t){return new(t||b)},imports:[[d.c,f.b,N.g,m.b,j.b,C.f,u.b]]}),b),L=c("y3MZ"),G=c("c3AT"),R=c("AytR");function U(t,e){if(1&t&&(I.Tb(0,"div"),I.Dc(1),I.Sb()),2&t){var i=e.$implicit;I.Bb(1),I.Ec(i.name)}}var _,M=((_=function(){function t(e){i(this,t),this.translateService=e,this.clone=new I.o,this.edit=new I.o,this.delete=new I.o}return e(t,[{key:"ngOnInit",value:function(){}},{key:"onClone",value:function(){this.clone.emit(this.logicalFrame)}},{key:"onEdit",value:function(){this.edit.emit(this.logicalFrame)}},{key:"onDelete",value:function(){this.delete.emit(this.logicalFrame)}},{key:"currentLang",get:function(){return this.translateService.currentLang?this.translateService.currentLang:this.translateService.defaultLang}},{key:"landscapePdfUrl",get:function(){return"".concat(R.a.API_URL,"/resources/project/").concat(this.project.id,"/logical-frame/").concat(this.logicalFrame.id,".pdf?orientation=landscape&language=").concat(this.currentLang)}},{key:"portraitPdfUrl",get:function(){return"".concat(R.a.API_URL,"/resources/project/").concat(this.project.id,"/logical-frame/").concat(this.logicalFrame.id,".pdf?orientation=portrait&language=").concat(this.currentLang)}}]),t}()).\u0275fac=function(t){return new(t||_)(I.Nb(f.d))},_.\u0275cmp=I.Hb({type:_,selectors:[["app-logical-frame"]],inputs:{logicalFrame:"logicalFrame",project:"project"},outputs:{clone:"clone",edit:"edit",delete:"delete"},decls:53,vars:40,consts:[[1,"card-header"],[1,"card-info"],[1,"card-info-title"],[1,"card-info-value"],[4,"ngFor","ngForOf"],["align","end",1,"mdm-button-group"],["mat-stroked-button","",1,"mdm-button",3,"click"],["mat-stroked-button","","mat-icon-button","",1,"mdm-button",3,"matMenuTriggerFor"],["menu","matMenu"],["mat-menu-item","",3,"click"],["mat-menu-item","","target","_blank",3,"href"]],template:function(t,e){if(1&t&&(I.Tb(0,"mat-card"),I.Tb(1,"mat-card-header",0),I.Dc(2),I.Sb(),I.Tb(3,"mat-card-content"),I.Tb(4,"div",1),I.Tb(5,"div",2),I.Dc(6),I.fc(7,"translate"),I.Sb(),I.Tb(8,"div",3),I.Dc(9),I.fc(10,"date"),I.fc(11,"date"),I.Sb(),I.Sb(),I.Tb(12,"div",1),I.Tb(13,"div",2),I.Dc(14),I.fc(15,"translate"),I.Sb(),I.Tb(16,"div",3),I.Bc(17,U,2,1,"div",4),I.Sb(),I.Sb(),I.Sb(),I.Tb(18,"mat-card-actions",5),I.Tb(19,"button",6),I.ac("click",(function(){return e.onEdit()})),I.Dc(20),I.fc(21,"translate"),I.Sb(),I.Tb(22,"button",7),I.Tb(23,"mat-icon"),I.Dc(24,"expand_more"),I.Sb(),I.Sb(),I.Sb(),I.Sb(),I.Tb(25,"mat-menu",null,8),I.Tb(27,"button",9),I.ac("click",(function(){return e.onClone()})),I.Tb(28,"mat-icon"),I.Dc(29,"content_copy"),I.Sb(),I.Tb(30,"span"),I.Dc(31),I.fc(32,"translate"),I.Sb(),I.Sb(),I.Tb(33,"a",10),I.Tb(34,"mat-icon"),I.Dc(35,"insert_drive_file"),I.Sb(),I.Tb(36,"span"),I.Dc(37),I.fc(38,"translate"),I.fc(39,"translate"),I.Sb(),I.Sb(),I.Tb(40,"a",10),I.Tb(41,"mat-icon"),I.Dc(42,"note"),I.Sb(),I.Tb(43,"span"),I.Dc(44),I.fc(45,"translate"),I.fc(46,"translate"),I.Sb(),I.Sb(),I.Tb(47,"button",9),I.ac("click",(function(){return e.onDelete()})),I.Tb(48,"mat-icon"),I.Dc(49,"delete"),I.Sb(),I.Tb(50,"span"),I.Dc(51),I.fc(52,"translate"),I.Sb(),I.Sb(),I.Sb()),2&t){var i=I.qc(26);I.Bb(2),I.Ec(e.logicalFrame.name),I.Bb(4),I.Ec(I.gc(7,16,"Date")),I.Bb(3),I.Gc(" ",e.logicalFrame.start?e.logicalFrame.start:I.hc(10,18,e.project.start,"mediumDate")," - ",e.logicalFrame.end?e.logicalFrame.end:I.hc(11,21,e.project.end,"mediumDate"),""),I.Bb(5),I.Ec(I.gc(15,24,"CollectionSites")),I.Bb(3),I.kc("ngForOf",e.logicalFrame.entities),I.Bb(3),I.Ec(I.gc(21,26,"Edit")),I.Bb(2),I.kc("matMenuTriggerFor",i),I.Bb(9),I.Ec(I.gc(32,28,"Clone")),I.Bb(2),I.kc("href",e.portraitPdfUrl,I.uc),I.Bb(4),I.Gc("",I.gc(38,30,"Download")," PDF ( ",I.gc(39,32,"Portrait")," )"),I.Bb(3),I.kc("href",e.landscapePdfUrl,I.uc),I.Bb(4),I.Gc("",I.gc(45,34,"Download")," PDF ( ",I.gc(46,36,"Landscape")," )"),I.Bb(7),I.Ec(I.gc(52,38,"Delete"))}},directives:[N.a,N.e,N.d,d.k,N.b,m.a,j.c,u.a,j.d,j.a],pipes:[f.c,d.e],styles:[""]}),_),$=c("LvDl"),K=c("QlGT"),H=c("hPXr"),Q=c("XEzf");function q(t,e){if(1&t){var i=I.Ub();I.Rb(0,10),I.Tb(1,"app-extra-indicator",11),I.ac("edit",(function(){I.sc(i);var t=e.$implicit,n=e.index;return I.ec().onEditIndicator(t,n)}))("delete",(function(){I.sc(i);var t=e.index;return I.ec().onDeleteIndicator(t)})),I.Sb(),I.Qb()}if(2&t){var n=e.$implicit;I.Bb(1),I.kc("extraIndicator",n.value)}}var z,X=((z=function(){function t(e){i(this,t),this.dialog=e}return e(t,[{key:"ngOnInit",value:function(){}},{key:"onAddNewIndicator",value:function(){var t=H.a.newIndicator();this.openDialog(t,!0)}},{key:"onEditIndicator",value:function(t,e){this.openDialog(H.a.newIndicator(t.value),!1,e)}},{key:"onDeleteIndicator",value:function(t){this.indicators.removeAt(t)}},{key:"openDialog",value:function(t,e,i){var n=this;this.dialog.open(K.a,{data:{indicator:t,forms:this.forms}}).afterClosed().subscribe((function(t){t&&(e?n.indicators.push(t.indicator):null!==i&&n.indicators.setControl(i,t.indicator))}))}},{key:"indicators",get:function(){return this.activityForm.controls.indicators}}]),t}()).\u0275fac=function(t){return new(t||z)(I.Nb(y.b))},z.\u0275cmp=I.Hb({type:z,selectors:[["app-activity-edit"]],inputs:{activityForm:"activityForm",forms:"forms"},decls:20,vars:14,consts:[[3,"formGroup"],[1,"mdm-form-group"],[1,"mdm-form-label"],["appearance","outline",1,"mdm-form-field"],["matInput","","formControlName","description",3,"placeholder"],[1,"mdm-section"],["formArrayName","indicators",1,"indicators-list"],[1,"mdm-cards"],["class","mdm-card",4,"ngFor","ngForOf"],["mat-stroked-button","",1,"mdm-button",3,"click"],[1,"mdm-card"],[1,"mdm-card",3,"extraIndicator","edit","delete"]],template:function(t,e){1&t&&(I.Tb(0,"div",0),I.Tb(1,"div",1),I.Tb(2,"div",2),I.Dc(3),I.fc(4,"translate"),I.Sb(),I.Tb(5,"mat-form-field",3),I.Ob(6,"input",4),I.fc(7,"translate"),I.Sb(),I.Sb(),I.Tb(8,"div",5),I.Tb(9,"div",2),I.Dc(10),I.fc(11,"translate"),I.Sb(),I.Tb(12,"div",6),I.Tb(13,"div",7),I.Bc(14,q,2,1,"ng-container",8),I.Sb(),I.Tb(15,"button",9),I.ac("click",(function(){return e.onAddNewIndicator()})),I.Tb(16,"mat-icon"),I.Dc(17,"add"),I.Sb(),I.Dc(18),I.fc(19,"translate"),I.Sb(),I.Sb(),I.Sb(),I.Sb()),2&t&&(I.kc("formGroup",e.activityForm),I.Bb(3),I.Ec(I.gc(4,6,"Activity")),I.Bb(3),I.lc("placeholder",I.gc(7,8,"Activity")),I.Bb(4),I.Ec(I.gc(11,10,"Indicators")),I.Bb(4),I.kc("ngForOf",e.indicators.controls),I.Bb(4),I.Ec(I.gc(19,12,"AddIndicator")))},directives:[p.s,p.k,T.b,k.b,p.c,p.r,p.i,p.e,d.k,m.a,u.a,Q.a],pipes:[f.c],styles:[""]}),z);function Y(t,e){if(1&t){var i=I.Ub();I.Rb(0,13),I.Tb(1,"app-extra-indicator",14),I.ac("edit",(function(){I.sc(i);var t=e.$implicit,n=e.index;return I.ec().onEditIndicator(t,n)}))("delete",(function(){I.sc(i);var t=e.index;return I.ec().onDeleteIndicator(t)})),I.Sb(),I.Qb()}if(2&t){var n=e.$implicit;I.Bb(1),I.kc("extraIndicator",n.value)}}function J(t,e){if(1&t){var i=I.Ub();I.Rb(0),I.Tb(1,"mat-expansion-panel",15),I.Tb(2,"mat-expansion-panel-header"),I.Tb(3,"mat-panel-title"),I.Dc(4),I.Sb(),I.Tb(5,"mat-panel-description"),I.Tb(6,"button",10),I.ac("click",(function(){I.sc(i);var t=e.index;return I.ec().onRemoveActivity(t)})),I.Tb(7,"mat-icon"),I.Dc(8,"delete"),I.Sb(),I.Dc(9),I.fc(10,"translate"),I.Sb(),I.Sb(),I.Sb(),I.Ob(11,"app-activity-edit",16),I.Sb(),I.Qb()}if(2&t){var n=e.$implicit,c=e.index,o=I.ec();I.Bb(1),I.kc("formGroupName",c),I.Bb(3),I.Gc("Activity ",c+1,": ",n.value.description,""),I.Bb(5),I.Ec(I.gc(10,6,"RemoveActivity")),I.Bb(2),I.kc("activityForm",n)("forms",o.forms)}}var V,W=((V=function(){function t(e,n){i(this,t),this.dialog=e,this.fb=n}return e(t,[{key:"ngOnInit",value:function(){}},{key:"onAddNewActivity",value:function(){this.activities.push(H.a.newActivity())}},{key:"onRemoveActivity",value:function(t){this.activities.removeAt(t)}},{key:"onAddNewIndicator",value:function(){var t=H.a.newIndicator();this.openDialog(t,!0)}},{key:"onEditIndicator",value:function(t,e){this.openDialog(H.a.newIndicator(t.value),!1,e)}},{key:"onDeleteIndicator",value:function(t){this.indicators.removeAt(t)}},{key:"openDialog",value:function(t,e,i){var n=this;this.dialog.open(K.a,{data:{indicator:t,forms:this.forms}}).afterClosed().subscribe((function(t){t&&(e?n.indicators.push(t.indicator):null!==i&&n.indicators.setControl(i,t.indicator))}))}},{key:"activities",get:function(){return this.outputForm.controls.activities}},{key:"indicators",get:function(){return this.outputForm.controls.indicators}}]),t}()).\u0275fac=function(t){return new(t||V)(I.Nb(y.b),I.Nb(p.f))},V.\u0275cmp=I.Hb({type:V,selectors:[["app-output-edit"]],inputs:{outputForm:"outputForm",forms:"forms"},decls:34,vars:24,consts:[[3,"formGroup"],[1,"mdm-form-group"],[1,"mdm-form-label"],["appearance","outline",1,"mdm-form-field"],["matInput","","formControlName","description",3,"placeholder"],["matInput","","formControlName","assumptions",3,"placeholder"],[1,"mdm-section"],["formArrayName","indicators",1,"indicators-list"],[1,"mdm-cards"],["class","mdm-card",4,"ngFor","ngForOf"],["mat-stroked-button","",1,"mdm-button",3,"click"],["formArrayName","activities"],[4,"ngFor","ngForOf"],[1,"mdm-card"],[1,"mdm-card",3,"extraIndicator","edit","delete"],[3,"formGroupName"],[3,"activityForm","forms"]],template:function(t,e){1&t&&(I.Tb(0,"div",0),I.Tb(1,"div",1),I.Tb(2,"div",2),I.Dc(3),I.fc(4,"translate"),I.Sb(),I.Tb(5,"mat-form-field",3),I.Ob(6,"input",4),I.fc(7,"translate"),I.Sb(),I.Sb(),I.Tb(8,"div",1),I.Tb(9,"div",2),I.Dc(10),I.fc(11,"translate"),I.Sb(),I.Tb(12,"mat-form-field",3),I.Ob(13,"input",5),I.fc(14,"translate"),I.Sb(),I.Sb(),I.Tb(15,"div",6),I.Tb(16,"div",2),I.Dc(17),I.fc(18,"translate"),I.Sb(),I.Tb(19,"div",7),I.Tb(20,"div",8),I.Bc(21,Y,2,1,"ng-container",9),I.Sb(),I.Tb(22,"button",10),I.ac("click",(function(){return e.onAddNewIndicator()})),I.Tb(23,"mat-icon"),I.Dc(24,"add"),I.Sb(),I.Dc(25),I.fc(26,"translate"),I.Sb(),I.Sb(),I.Sb(),I.Tb(27,"mat-accordion",11),I.Bc(28,J,12,8,"ng-container",12),I.Sb(),I.Tb(29,"button",10),I.ac("click",(function(){return e.onAddNewActivity()})),I.Tb(30,"mat-icon"),I.Dc(31,"add"),I.Sb(),I.Dc(32),I.fc(33,"translate"),I.Sb(),I.Sb()),2&t&&(I.kc("formGroup",e.outputForm),I.Bb(3),I.Ec(I.gc(4,10,"Result")),I.Bb(3),I.lc("placeholder",I.gc(7,12,"Description")),I.Bb(4),I.Ec(I.gc(11,14,"Assumptions")),I.Bb(3),I.lc("placeholder",I.gc(14,16,"Assumptions")),I.Bb(4),I.Ec(I.gc(18,18,"Indicators")),I.Bb(4),I.kc("ngForOf",e.indicators.controls),I.Bb(4),I.Ec(I.gc(26,20,"AddIndicator")),I.Bb(3),I.kc("ngForOf",e.activities.controls),I.Bb(4),I.Ec(I.gc(33,22,"AddActivity")))},directives:[p.s,p.k,T.b,k.b,p.c,p.r,p.i,p.e,d.k,m.a,u.a,S.a,Q.a,S.c,p.l,S.e,S.f,S.d,X],pipes:[f.c],styles:[".mat-expansion-panel[_ngcontent-%COMP%]{margin:20px 0!important}"]}),V);function Z(t,e){if(1&t){var i=I.Ub();I.Rb(0,13),I.Tb(1,"app-extra-indicator",14),I.ac("edit",(function(){I.sc(i);var t=e.$implicit,n=e.index;return I.ec().onEditIndicator(t,n)}))("delete",(function(){I.sc(i);var t=e.index;return I.ec().onDeleteIndicator(t)})),I.Sb(),I.Qb()}if(2&t){var n=e.$implicit;I.Bb(1),I.kc("extraIndicator",n.value)}}function tt(t,e){if(1&t){var i=I.Ub();I.Rb(0),I.Tb(1,"mat-expansion-panel",15),I.Tb(2,"mat-expansion-panel-header"),I.Tb(3,"mat-panel-title"),I.Dc(4),I.Sb(),I.Tb(5,"mat-panel-description"),I.Tb(6,"button",10),I.ac("click",(function(){I.sc(i);var t=e.index;return I.ec().onRemoveOutput(t)})),I.Tb(7,"mat-icon"),I.Dc(8,"delete"),I.Sb(),I.Dc(9),I.fc(10,"translate"),I.Sb(),I.Sb(),I.Sb(),I.Ob(11,"app-output-edit",16),I.Sb(),I.Qb()}if(2&t){var n=e.$implicit,c=e.index,o=I.ec();I.Bb(1),I.kc("formGroupName",c),I.Bb(3),I.Gc("Result ",c+1,": ",n.value.description,""),I.Bb(5),I.Ec(I.gc(10,6,"RemoveOutput")),I.Bb(2),I.kc("outputForm",n)("forms",o.forms)}}var et,it=((et=function(){function t(e){i(this,t),this.dialog=e,this.edit=new I.o}return e(t,[{key:"ngOnInit",value:function(){}},{key:"onAddNewOutput",value:function(){this.outputs.push(H.a.newOutput())}},{key:"onRemoveOutput",value:function(t){this.outputs.removeAt(t)}},{key:"onAddNewIndicator",value:function(){this.openDialog(H.a.newIndicator(),!0)}},{key:"onEditIndicator",value:function(t,e){this.openDialog(H.a.newIndicator(t.value),!1,e)}},{key:"onDeleteIndicator",value:function(t){this.indicators.removeAt(t)}},{key:"openDialog",value:function(t,e,i){var n=this;this.dialog.open(K.a,{data:{indicator:t,forms:this.forms}}).afterClosed().subscribe((function(t){t&&(e?n.indicators.push(t.indicator):null!==i&&n.indicators.setControl(i,t.indicator))}))}},{key:"outputs",get:function(){return this.purposeForm.controls.outputs}},{key:"indicators",get:function(){return this.purposeForm.controls.indicators}}]),t}()).\u0275fac=function(t){return new(t||et)(I.Nb(y.b))},et.\u0275cmp=I.Hb({type:et,selectors:[["app-purpose-edit"]],inputs:{purposeForm:"purposeForm",forms:"forms"},outputs:{edit:"edit"},decls:34,vars:24,consts:[[3,"formGroup"],[1,"mdm-form-group"],[1,"mdm-form-label"],["appearance","outline",1,"mdm-form-field"],["matInput","","formControlName","description",3,"placeholder"],["matInput","","formControlName","assumptions",3,"placeholder"],[1,"mdm-section"],["formArrayName","indicators",1,"indicators-list"],[1,"mdm-cards"],["class","mdm-card",4,"ngFor","ngForOf"],["mat-stroked-button","",1,"mdm-button",3,"click"],["formArrayName","outputs"],[4,"ngFor","ngForOf"],[1,"mdm-card"],[1,"mdm-card",3,"extraIndicator","edit","delete"],[3,"formGroupName"],[3,"outputForm","forms"]],template:function(t,e){1&t&&(I.Tb(0,"div",0),I.Tb(1,"div",1),I.Tb(2,"div",2),I.Dc(3),I.fc(4,"translate"),I.Sb(),I.Tb(5,"mat-form-field",3),I.Ob(6,"input",4),I.fc(7,"translate"),I.Sb(),I.Sb(),I.Tb(8,"div",1),I.Tb(9,"div",2),I.Dc(10),I.fc(11,"translate"),I.Sb(),I.Tb(12,"mat-form-field",3),I.Ob(13,"input",5),I.fc(14,"translate"),I.Sb(),I.Sb(),I.Tb(15,"div",6),I.Tb(16,"div",2),I.Dc(17),I.fc(18,"translate"),I.Sb(),I.Tb(19,"div",7),I.Tb(20,"div",8),I.Bc(21,Z,2,1,"ng-container",9),I.Sb(),I.Tb(22,"button",10),I.ac("click",(function(){return e.onAddNewIndicator()})),I.Tb(23,"mat-icon"),I.Dc(24,"add"),I.Sb(),I.Dc(25),I.fc(26,"translate"),I.Sb(),I.Sb(),I.Sb(),I.Tb(27,"mat-accordion",11),I.Bc(28,tt,12,8,"ng-container",12),I.Sb(),I.Tb(29,"button",10),I.ac("click",(function(){return e.onAddNewOutput()})),I.Tb(30,"mat-icon"),I.Dc(31,"add"),I.Sb(),I.Dc(32),I.fc(33,"translate"),I.Sb(),I.Sb()),2&t&&(I.kc("formGroup",e.purposeForm),I.Bb(3),I.Ec(I.gc(4,10,"SpecificObjective")),I.Bb(3),I.lc("placeholder",I.gc(7,12,"Description")),I.Bb(4),I.Ec(I.gc(11,14,"Assumptions")),I.Bb(3),I.lc("placeholder",I.gc(14,16,"Assumptions")),I.Bb(4),I.Ec(I.gc(18,18,"Indicators")),I.Bb(4),I.kc("ngForOf",e.indicators.controls),I.Bb(4),I.Ec(I.gc(26,20,"AddIndicator")),I.Bb(3),I.kc("ngForOf",e.outputs.controls),I.Bb(4),I.Ec(I.gc(33,22,"AddOutput")))},directives:[p.s,p.k,T.b,k.b,p.c,p.r,p.i,p.e,d.k,m.a,u.a,S.a,Q.a,S.c,p.l,S.e,S.f,S.d,W],pipes:[f.c],styles:[".mat-accordion[_ngcontent-%COMP%]{padding-top:20px}.mat-expansion-panel[_ngcontent-%COMP%]{margin:20px 0!important}"]}),et);function nt(t,e){if(1&t){var i=I.Ub();I.Tb(0,"mat-chip",23),I.ac("removed",(function(){I.sc(i);var t=e.$implicit;return I.ec().onEntityRemoved(t)})),I.Dc(1),I.Tb(2,"mat-icon",24),I.Dc(3,"cancel"),I.Sb(),I.Sb()}if(2&t){var n=e.$implicit;I.kc("removable",!0),I.Bb(1),I.Fc(" ",n.name," ")}}function ct(t,e){if(1&t&&(I.Tb(0,"mat-option",25),I.Dc(1),I.Sb()),2&t){var i=e.$implicit;I.kc("value",i),I.Bb(1),I.Fc("",i.name," ")}}function ot(t,e){if(1&t){var i=I.Ub();I.Rb(0,26),I.Tb(1,"app-extra-indicator",27),I.ac("edit",(function(){I.sc(i);var t=e.$implicit,n=e.index;return I.ec().onEditIndicator(t,n)}))("delete",(function(){I.sc(i);var t=e.index;return I.ec().onDeleteIndicator(t)})),I.Sb(),I.Qb()}if(2&t){var n=e.$implicit;I.Bb(1),I.kc("extraIndicator",n.value)}}function at(t,e){if(1&t){var i=I.Ub();I.Rb(0),I.Tb(1,"mat-expansion-panel",28),I.Tb(2,"mat-expansion-panel-header"),I.Tb(3,"mat-panel-title"),I.Dc(4),I.Sb(),I.Tb(5,"mat-panel-description"),I.Tb(6,"button",19),I.ac("click",(function(){I.sc(i);var t=e.index;return I.ec().onRemovePurpose(t)})),I.Tb(7,"mat-icon"),I.Dc(8,"delete"),I.Sb(),I.Dc(9),I.fc(10,"translate"),I.Sb(),I.Sb(),I.Sb(),I.Tb(11,"app-purpose-edit",29),I.ac("edit",(function(t){I.sc(i);var n=e.index;return I.ec().onEditPurpose(t,n)})),I.Sb(),I.Sb(),I.Qb()}if(2&t){var n=e.$implicit,c=e.index,o=I.ec();I.Bb(1),I.kc("formGroupName",c),I.Bb(3),I.Gc("Specific objective ",c+1,": ",n.value.description,""),I.Bb(5),I.Ec(I.gc(10,6,"RemovePurpose")),I.Bb(2),I.kc("purposeForm",n)("forms",o.forms)}}var rt,st=((rt=function(){function t(e,n){i(this,t),this.fb=e,this.dialog=n,this.edit=new I.o}return e(t,[{key:"ngOnInit",value:function(){this.setForm()}},{key:"ngOnChanges",value:function(){this.setForm()}},{key:"setForm",value:function(){var t=this;this.logicalFrameForm=this.fb.group({id:[this.logicalFrame.id],name:[this.logicalFrame.name,p.x.required],entities:[this.entities.filter((function(e){return t.logicalFrame.entities.map((function(t){return t.id})).includes(e.id)})),p.x.required],start:[this.logicalFrame.start],end:[this.logicalFrame.end],goal:[this.logicalFrame.goal],indicators:this.fb.array(this.logicalFrame.indicators.map((function(t){return H.a.newIndicator(t)}))),purposes:this.fb.array(this.logicalFrame.purposes.map((function(t){return H.a.newPurpose(t)})))}),this.logicalFrameForm.valueChanges.subscribe((function(e){t.edit.emit(t.logicalFrame.deserialize(e))}))}},{key:"onEntityRemoved",value:function(t){this.logicalFrameForm.controls.entities.setValue(this.logicalFrameForm.controls.entities.value.filter((function(e){return e.id!==t.id})))}},{key:"onAddNewPurpose",value:function(){this.purposes.push(H.a.newPurpose())}},{key:"onEditPurpose",value:function(t,e){this.purposes.setControl(e,$.cloneDeep(H.a.newPurpose(t)))}},{key:"onRemovePurpose",value:function(t){this.purposes.removeAt(t)}},{key:"onAddNewIndicator",value:function(){this.openDialog(H.a.newIndicator(),!0)}},{key:"onEditIndicator",value:function(t,e){this.openDialog(H.a.newIndicator(t.value),!1,e)}},{key:"onDeleteIndicator",value:function(t){this.indicators.removeAt(t)}},{key:"openDialog",value:function(t,e,i){var n=this;this.dialog.open(K.a,{data:{indicator:t,forms:this.forms}}).afterClosed().subscribe((function(t){t&&(e?n.indicators.push(t.indicator):null!==i&&n.indicators.setControl(i,t.indicator))}))}},{key:"selectedEntities",get:function(){return this.logicalFrameForm.controls.entities.value}},{key:"purposes",get:function(){return this.logicalFrameForm.controls.purposes}},{key:"indicators",get:function(){return this.logicalFrameForm.controls.indicators}}]),t}()).\u0275fac=function(t){return new(t||rt)(I.Nb(p.f),I.Nb(y.b))},rt.\u0275cmp=I.Hb({type:rt,selectors:[["app-logical-frame-edit"]],inputs:{forms:"forms",entities:"entities",logicalFrame:"logicalFrame"},outputs:{edit:"edit"},features:[I.zb],decls:101,vars:65,consts:[[1,"mdm-section"],[1,"mdm-title"],[1,"mdm-form",3,"formGroup"],[1,"mdm-form-group"],[1,"mdm-form-label"],["appearance","outline",1,"mdm-form-field"],["matInput","","formControlName","name",3,"placeholder"],["formControlName","entities","multiple","",3,"placeholder"],[3,"removable","removed",4,"ngFor","ngForOf"],[3,"value",4,"ngFor","ngForOf"],["matInput","","formControlName","start",3,"matDatepicker","placeholder"],["matSuffix","",3,"for"],["startPicker",""],["matInput","","formControlName","end",3,"matDatepicker","placeholder"],["endPicker",""],["matInput","","formControlName","goal",3,"placeholder"],["formArrayName","indicators",1,"indicators-list"],[1,"mdm-cards"],["class","mdm-card",4,"ngFor","ngForOf"],["mat-stroked-button","",1,"mdm-button",3,"click"],[3,"formGroup"],["formArrayName","purposes"],[4,"ngFor","ngForOf"],[3,"removable","removed"],["matChipRemove",""],[3,"value"],[1,"mdm-card"],[1,"mdm-card",3,"extraIndicator","edit","delete"],[3,"formGroupName"],[3,"purposeForm","forms","edit"]],template:function(t,e){if(1&t&&(I.Tb(0,"div",0),I.Tb(1,"div",1),I.Dc(2,"General informations"),I.Sb(),I.Tb(3,"div",2),I.Tb(4,"div",3),I.Tb(5,"div",4),I.Dc(6),I.fc(7,"translate"),I.Sb(),I.Tb(8,"mat-form-field",5),I.Ob(9,"input",6),I.fc(10,"translate"),I.Tb(11,"mat-hint"),I.Tb(12,"mat-icon"),I.Dc(13,"info"),I.Sb(),I.Dc(14),I.fc(15,"translate"),I.Sb(),I.Sb(),I.Sb(),I.Tb(16,"div",3),I.Tb(17,"div",4),I.Dc(18),I.fc(19,"translate"),I.Sb(),I.Tb(20,"mat-form-field",5),I.Tb(21,"mat-select",7),I.fc(22,"translate"),I.Tb(23,"mat-select-trigger"),I.Tb(24,"mat-chip-list"),I.Bc(25,nt,4,2,"mat-chip",8),I.Sb(),I.Sb(),I.Bc(26,ct,2,2,"mat-option",9),I.Sb(),I.Tb(27,"mat-hint"),I.Tb(28,"mat-icon"),I.Dc(29,"info"),I.Sb(),I.Dc(30),I.fc(31,"translate"),I.Sb(),I.Sb(),I.Sb(),I.Tb(32,"div",3),I.Tb(33,"div",4),I.Dc(34),I.fc(35,"translate"),I.Sb(),I.Tb(36,"mat-form-field",5),I.Ob(37,"input",10),I.fc(38,"translate"),I.Ob(39,"mat-datepicker-toggle",11),I.Ob(40,"mat-datepicker",null,12),I.Tb(42,"mat-hint"),I.Tb(43,"mat-icon"),I.Dc(44,"info"),I.Sb(),I.Dc(45),I.fc(46,"translate"),I.Sb(),I.Sb(),I.Sb(),I.Tb(47,"div",3),I.Tb(48,"div",4),I.Dc(49),I.fc(50,"translate"),I.Sb(),I.Tb(51,"mat-form-field",5),I.Ob(52,"input",13),I.fc(53,"translate"),I.Ob(54,"mat-datepicker-toggle",11),I.Ob(55,"mat-datepicker",null,14),I.Tb(57,"mat-hint"),I.Tb(58,"mat-icon"),I.Dc(59,"info"),I.Sb(),I.Dc(60),I.fc(61,"translate"),I.Sb(),I.Sb(),I.Sb(),I.Sb(),I.Sb(),I.Tb(62,"div",0),I.Tb(63,"div",1),I.Dc(64,"General objective"),I.Sb(),I.Tb(65,"div",2),I.Tb(66,"div",3),I.Tb(67,"div",4),I.Dc(68),I.fc(69,"translate"),I.Sb(),I.Tb(70,"mat-form-field",5),I.Ob(71,"input",15),I.fc(72,"translate"),I.Tb(73,"mat-hint"),I.Tb(74,"mat-icon"),I.Dc(75,"info"),I.Sb(),I.Dc(76),I.fc(77,"translate"),I.Sb(),I.Sb(),I.Sb(),I.Tb(78,"div",0),I.Tb(79,"div",4),I.Dc(80),I.fc(81,"translate"),I.Sb(),I.Tb(82,"div",16),I.Tb(83,"div",17),I.Bc(84,ot,2,1,"ng-container",18),I.Sb(),I.Tb(85,"button",19),I.ac("click",(function(){return e.onAddNewIndicator()})),I.Tb(86,"mat-icon"),I.Dc(87,"add"),I.Sb(),I.Dc(88),I.fc(89,"translate"),I.Sb(),I.Sb(),I.Sb(),I.Sb(),I.Sb(),I.Tb(90,"div",0),I.Tb(91,"div",1),I.Dc(92,"Specific objective"),I.Sb(),I.Tb(93,"div",20),I.Tb(94,"mat-accordion",21),I.Bc(95,at,12,8,"ng-container",22),I.Sb(),I.Sb(),I.Sb(),I.Tb(96,"button",19),I.ac("click",(function(){return e.onAddNewPurpose()})),I.Tb(97,"mat-icon"),I.Dc(98,"add"),I.Sb(),I.Dc(99),I.fc(100,"translate"),I.Sb()),2&t){var i=I.qc(41),n=I.qc(56);I.Bb(3),I.kc("formGroup",e.logicalFrameForm),I.Bb(3),I.Ec(I.gc(7,29,"Name")),I.Bb(3),I.lc("placeholder",I.gc(10,31,"Name")),I.Bb(5),I.Fc("",I.gc(15,33,"Tooltip.BasicsEdition.Name")," "),I.Bb(4),I.Ec(I.gc(19,35,"CollectionSites")),I.Bb(3),I.lc("placeholder",I.gc(22,37,"CollectionSites")),I.Bb(4),I.kc("ngForOf",e.selectedEntities),I.Bb(1),I.kc("ngForOf",e.entities),I.Bb(4),I.Fc("",I.gc(31,39,"CollectionSites-Hint")," "),I.Bb(4),I.Ec(I.gc(35,41,"SpecificStartDate")),I.Bb(3),I.lc("placeholder",I.gc(38,43,"StartDate")),I.kc("matDatepicker",i),I.Bb(2),I.kc("for",i),I.Bb(6),I.Fc("",I.gc(46,45,"specific-date-start")," "),I.Bb(4),I.Ec(I.gc(50,47,"SpecificEndDate")),I.Bb(3),I.lc("placeholder",I.gc(53,49,"EndDate")),I.kc("matDatepicker",n),I.Bb(2),I.kc("for",n),I.Bb(6),I.Fc("",I.gc(61,51,"specific-date-end")," "),I.Bb(5),I.kc("formGroup",e.logicalFrameForm),I.Bb(3),I.Ec(I.gc(69,53,"GeneralObjective")),I.Bb(3),I.lc("placeholder",I.gc(72,55,"GeneralObjective")),I.Bb(5),I.Fc("",I.gc(77,57,"GeneralObjective-Hint")," "),I.Bb(4),I.Ec(I.gc(81,59,"Indicators")),I.Bb(4),I.kc("ngForOf",e.indicators.controls),I.Bb(4),I.Ec(I.gc(89,61,"AddIndicator")),I.Bb(5),I.kc("formGroup",e.logicalFrameForm),I.Bb(2),I.kc("ngForOf",e.purposes.controls),I.Bb(4),I.Ec(I.gc(100,63,"AddPurpose"))}},directives:[p.s,p.k,T.b,k.b,p.c,p.r,p.i,T.e,u.a,F.a,F.c,g.b,d.k,h.b,h.d,T.h,h.a,p.e,m.a,S.a,g.a,g.c,v.m,Q.a,S.c,p.l,S.e,S.f,S.d,it],pipes:[f.c],styles:[".mat-expansion-panel-header-description[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-left:auto}.mat-expansion-panel[_ngcontent-%COMP%]{margin:16px 0}"]}),rt);function lt(t,e){if(1&t){var i=I.Ub();I.Tb(0,"app-logical-frame",6),I.ac("clone",(function(t){return I.sc(i),I.ec(2).onClone(t)}))("edit",(function(t){return I.sc(i),I.ec(2).onEdit(t)}))("delete",(function(t){return I.sc(i),I.ec(2).onDelete(t)})),I.Sb()}if(2&t){var n=e.$implicit,c=I.ec(2);I.kc("project",c.project)("logicalFrame",n)}}function bt(t,e){if(1&t){var i=I.Ub();I.Tb(0,"div",2),I.Tb(1,"div",3),I.Bc(2,lt,1,2,"app-logical-frame",4),I.Sb(),I.Tb(3,"button",5),I.ac("click",(function(){return I.sc(i),I.ec().onCreate()})),I.Tb(4,"mat-icon"),I.Dc(5,"add"),I.Sb(),I.Dc(6),I.fc(7,"translate"),I.Sb(),I.Sb()}if(2&t){var n=I.ec();I.Bb(2),I.kc("ngForOf",n.logicalFrames),I.Bb(4),I.Fc(" ",I.gc(7,2,"CreateLogicalFramework")," ")}}function dt(t,e){if(1&t){var i=I.Ub();I.Tb(0,"div",2),I.Tb(1,"app-logical-frame-edit",7),I.ac("edit",(function(t){return I.sc(i),I.ec().onEdit(t)})),I.Sb(),I.Sb()}if(2&t){var n=I.ec();I.Bb(1),I.kc("logicalFrame",n.currentLogicalFrame)("entities",n.entities)("forms",n.project.forms)}}var mt,ut,ft,pt=[{path:"",component:(mt=function(){function t(e){i(this,t),this.projectService=e,this.logicalFrames=[],this.edition=!1}return e(t,[{key:"ngOnInit",value:function(){var t=this;this.projectService.openedProject.subscribe((function(e){t.project=e,t.logicalFrames=e.logicalFrames,t.entities=e.entities,t.currentLogicalFrame&&(t.currentLogicalFrame=t.logicalFrames.find((function(e){return e.id===t.currentLogicalFrame.id})))}))}},{key:"onCreate",value:function(){this.currentLogicalFrame=new L.a,this.project.logicalFrames.push(this.currentLogicalFrame),this.projectService.project.next(this.project),this.edition=!0}},{key:"onClone",value:function(t){this.currentLogicalFrame=new L.a(t.serialize()),this.project.logicalFrames.push(this.currentLogicalFrame),this.projectService.project.next(this.project),this.edition=!0}},{key:"onEdit",value:function(t){this.edition=!0,this.currentLogicalFrame=t,this.projectService.project.next(this.project)}},{key:"onDelete",value:function(t){this.project.logicalFrames=this.project.logicalFrames.filter((function(e){return e.id!==t.id})),this.projectService.project.next(this.project)}}]),t}(),mt.\u0275fac=function(t){return new(t||mt)(I.Nb(G.a))},mt.\u0275cmp=I.Hb({type:mt,selectors:[["app-logical-frames"]],decls:9,vars:8,consts:[[1,"info-section","blue"],["class","mdm-section",4,"ngIf"],[1,"mdm-section"],[1,"mdm-cards"],["class","mdm-card",3,"project","logicalFrame","clone","edit","delete",4,"ngFor","ngForOf"],["mat-stroked-button","",1,"mdm-button",3,"click"],[1,"mdm-card",3,"project","logicalFrame","clone","edit","delete"],[3,"logicalFrame","entities","forms","edit"]],template:function(t,e){1&t&&(I.Tb(0,"div",0),I.Tb(1,"p"),I.Dc(2),I.fc(3,"translate"),I.Sb(),I.Tb(4,"p"),I.Dc(5),I.fc(6,"translate"),I.Sb(),I.Sb(),I.Bc(7,bt,8,4,"div",1),I.Bc(8,dt,2,3,"div",1)),2&t&&(I.Bb(2),I.Ec(I.gc(3,4,"LogicalFrameworksPageDescription.Line1")),I.Bb(3),I.Ec(I.gc(6,6,"LogicalFrameworksPageDescription.Line2")),I.Bb(2),I.kc("ngIf",!e.edition),I.Bb(1),I.kc("ngIf",e.edition))},directives:[d.l,d.k,m.a,u.a,M,st],pipes:[f.c],styles:[".cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:.2}.cdk-drag-animating[_ngcontent-%COMP%], .example-list.cdk-drop-list-dragging[_ngcontent-%COMP%]   .example-box[_ngcontent-%COMP%]:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}"]}),mt)}],gt=((ft=function t(){i(this,t)}).\u0275mod=I.Lb({type:ft}),ft.\u0275inj=I.Kb({factory:function(t){return new(t||ft)},imports:[[C.f.forChild(pt)],C.f]}),ft),vt=((ut=function t(){i(this,t)}).\u0275mod=I.Lb({type:ut}),ut.\u0275inj=I.Kb({factory:function(t){return new(t||ut)},imports:[[d.c,f.b,gt,P,x,m.b,u.b]]}),ut)}}])}();