!function(){function t(t,n){var i;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(i=function(t,n){if(!t)return;if("string"==typeof t)return e(t,n);var i=Object.prototype.toString.call(t).slice(8,-1);"Object"===i&&t.constructor&&(i=t.constructor.name);if("Map"===i||"Set"===i)return Array.from(t);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return e(t,n)}(t))||n&&t&&"number"==typeof t.length){i&&(t=i);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,s=!0,u=!1;return{s:function(){i=t[Symbol.iterator]()},n:function(){var t=i.next();return s=t.done,t},e:function(t){u=!0,a=t},f:function(){try{s||null==i.return||i.return()}finally{if(u)throw a}}}}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{"HFx+":function(e,r,o){"use strict";o.r(r),o.d(r,"EditModule",(function(){return J}));var a=o("ofXK"),s=o("tyNb"),u=o("mrSG"),l=o("quSY"),c=o("iA2r"),f=o("D//C"),b=o("RtbK"),h=o.n(b),m=o("nCUg"),d=o("fXoL"),p=o("c3AT"),v=o("sYmb"),g=o("3Pt+"),y=o("wLEN"),C=o("bTqV"),w=o("NFeN"),S=o("+0xr"),k=o("qFsG");function x(t,e){if(1&t){var n=d.Ub();d.Tb(0,"button",12),d.ac("click",(function(){return d.sc(n),d.ec().fillWithPreviousData()})),d.Tb(1,"mat-icon"),d.Dc(2,"edit"),d.Sb(),d.Dc(3," Fill with data from the previous entry "),d.Sb()}}function D(t,e){1&t&&d.Ob(0,"mat-header-cell")}function T(t,e){if(1&t&&(d.Tb(0,"div",25),d.Ob(1,"input",26),d.Sb()),2&t){var n=d.ec().index,i=d.ec().index,r=d.ec(),o=r.$implicit,a=r.index,s=d.ec(2);d.Bb(1),d.kc("formControl",s.inputForm.get("values").get(o.id).controls[s.isInputCell(a,n,i)])}}function I(t,e){if(1&t&&(d.Tb(0,"div",27),d.Dc(1),d.Sb()),2&t){var n=d.ec().$implicit,i=d.ec().$implicit;d.Bb(1),d.Fc(" ",n[i]," ")}}var O=function(t){return{tableLabel:t}};function B(t,e){if(1&t&&(d.Tb(0,"td",22),d.Bc(1,T,2,1,"div",23),d.Bc(2,I,2,1,"ng-template",null,24,d.Cc),d.Sb()),2&t){var n=e.index,i=d.qc(3),r=d.ec().index,o=d.ec().index,a=d.ec(2);d.kc("ngClass",d.oc(3,O,a.isLabelCell(o,n,r))),d.Bb(1),d.kc("ngIf",!1!==a.isInputCell(o,n,r))("ngIfElse",i)}}function R(t,e){1&t&&(d.Rb(0,19),d.Bc(1,D,1,0,"mat-header-cell",20),d.Bc(2,B,4,5,"td",21),d.Qb()),2&t&&d.lc("matColumnDef",e.$implicit)}function F(t,e){1&t&&d.Ob(0,"tr",28)}function L(t,e){1&t&&d.Ob(0,"tr",29)}function N(t,e){if(1&t&&(d.Tb(0,"div",1),d.Tb(1,"p"),d.Dc(2),d.Sb(),d.Tb(3,"table",15),d.Bc(4,R,3,1,"ng-container",16),d.Bc(5,F,1,0,"tr",17),d.Bc(6,L,1,0,"tr",18),d.Sb(),d.Sb()),2&t){var n=e.$implicit,i=e.index,r=d.ec(2);d.Bb(2),d.Ec(r.form.elements[i].name),d.Bb(1),d.kc("dataSource",n.value)("formArrayName",n.id),d.Bb(1),d.kc("ngForOf",n.displayedColumns),d.Bb(1),d.kc("matHeaderRowDef",n.displayedColumns),d.Bb(1),d.kc("matRowDefColumns",n.displayedColumns)}}function P(t,e){if(1&t&&(d.Tb(0,"div",13),d.Bc(1,N,7,6,"div",14),d.Sb()),2&t){var n=d.ec();d.kc("formGroup",n.inputForm.get("values")),d.Bb(1),d.kc("ngForOf",n.tables)}}function _(t,e){if(1&t){var n=d.Ub();d.Tb(0,"button",30),d.ac("click",(function(){return d.sc(n),d.ec().deleteInput()})),d.Tb(1,"mat-icon"),d.Dc(2,"clear"),d.Sb(),d.Dc(3),d.fc(4,"translate"),d.Sb()}2&t&&(d.Bb(3),d.Fc(" ",d.gc(4,1,"Delete")," "))}var j,M,E,A=[{path:"**",component:(j=function(){function e(t,i,r,o,a,s,u){n(this,e),this.route=t,this.projectService=i,this.translateService=r,this.datepipe=o,this.fb=a,this.inputService=s,this.router=u,this.subscription=new l.a,this.site=new f.a({name:""}),this.form=new c.a({name:""}),this.firstDate="",this.lastDate="",this.tables=[]}var r,o,a;return r=e,(o=[{key:"ngOnInit",value:function(){var t=this;this.subscription.add(this.projectService.openedProject.subscribe((function(e){t.project=e,t.updateData()}))),this.subscription.add(this.route.params.subscribe((function(e){t.formId=e.formId,t.siteId=e.siteId,t.timeSlotDate=e.timeSlot,t.updateData()})))}},{key:"updateData",value:function(){return Object(u.b)(this,void 0,void 0,regeneratorRuntime.mark((function t(){var e,n,i,r=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.project&&(this.formId&&(this.form=this.project.forms.find((function(t){return t.id===r.formId}))),this.siteId&&(this.site=this.project.entities.find((function(t){return t.id===r.siteId}))),this.timeSlotDate&&this.form)&&(this.timeSlot=new h.a(this.timeSlotDate),e={weekday:"long",year:"numeric",month:"long",day:"numeric",timeZone:"UTC"},this.firstDate=this.timeSlot.firstDate.toLocaleDateString(this.currentLang,e),this.lastDate=this.timeSlot.lastDate.toLocaleDateString(this.currentLang,e),this.previousTimeSlot=this.timeSlot.previous(),n=this.previousTimeSlot.value,this.inputService.get(this.project.id,this.site.id,this.form.id,n).then((function(t){t&&t.length>0&&void 0!==(t=t.find((function(t){return t.period===n})))&&(r.previousInput=new m.a(t))}))),!(this.project&&this.form&&this.timeSlotDate)){t.next=6;break}return t.next=4,this.getInput();case 4:(i=t.sent)&&i.length>0&&void 0!==(i=i.find((function(t){return t.period===r.timeSlotDate})))&&(this.input=new m.a(i)),this.createForm(),this.createTable(),this.updateTotals(this.inputForm.value),this.inputForm.valueChanges.subscribe((function(t){r.convertToNumber(t),r.updateTotals(t)}));case 6:case"end":return t.stop()}}),t,this)})))}},{key:"createForm",value:function(){var e,n={},i=t(this.form.elements);try{for(i.s();!(e=i.n()).done;){var r=e.value;n[r.id]=this.fb.array(this.input&&this.input.values&&this.input.values[r.id]?this.input.values[r.id]:Array.from({length:this.countInputCells(r)},(function(t,e){return 0})))}}catch(a){i.e(a)}finally{i.f()}var o={_id:this.input&&this.input.id?this.input.id:"input:".concat(this.project.id,":").concat(this.form.id,":").concat(this.site.id,":").concat(this.timeSlotDate),entity:this.site.id,form:this.form.id,period:this.timeSlotDate,project:this.project.id,rev:this.input&&this.input.rev?this.input.rev:null,values:this.fb.group(n)};this.inputForm=this.fb.group(o)}},{key:"convertToNumber",value:function(e){var n,i=t(this.form.elements);try{for(i.s();!(n=i.n()).done;){var r=n.value;e.values[r.id]=e.values[r.id].map((function(t){return+t}))}}catch(o){i.e(o)}finally{i.f()}}},{key:"updateTotals",value:function(t){for(var e=0;e<this.tables.length;e+=1){var n=this.tables[e],i=void 0,r=void 0,o=0;for(i=n.cols.length;i<n.numberRows-1;i+=1){var a=0;for(r=0;r<n.numberCols;r+=1){var s=this.isInputCell(e,i,r);!1!==s&&(a+=t.values[n.id][s])}n.value[i][n.numberCols-1]=a,o+=a}for(n.value[n.numberRows-1][n.numberCols-1]=o,o=0,r=n.rows.length;r<n.numberCols-1;r+=1){var u=0;for(i=0;i<n.numberRows;i+=1){var l=this.isInputCell(e,i,r);!1!==l&&(u+=+t.values[n.id][l])}n.value[n.numberRows-1][r]=u,o+=u}0!==o&&(n.value[n.numberRows-1][n.numberCols-1]=o)}}},{key:"createTable",value:function(){var e,n=t(this.form.elements);try{for(n.s();!(e=n.n()).done;){var i=e.value,r=[],o=[];this.numberCols=0,this.numberRows=0;var a=0;for(a=0;a<i.distribution;a+=1)o.push(i.partitions[a]),0===this.numberRows&&(this.numberRows=1),this.numberRows*=i.partitions[a].elements.length;for(a=i.distribution;a<i.partitions.length;a+=1)r.push(i.partitions[a]),0===this.numberCols&&(this.numberCols=1),this.numberCols*=i.partitions[a].elements.length;for(this.numberRows=this.numberRows+r.length+1,this.numberCols=this.numberCols+o.length+1,this.table=[],a=0;a<this.numberRows;a+=1){this.table.push([]);for(var s=0;s<this.numberCols;s+=1)this.table[a].push(a<r.length||s<o.length?"":0)}this.fillCollumnLabels(o,r),this.fillRowLabels(o,r),this.fillTotalLabels(o,r);for(var u=[],l=0;l<this.numberCols;l+=1)u.push(l.toString());this.tables.push({id:i.id,value:this.table,cols:r,rows:o,numberCols:this.numberCols,numberRows:this.numberRows,displayedColumns:u})}}catch(c){n.e(c)}finally{n.f()}}},{key:"fillTotalLabels",value:function(t,e){if(e.length>0)for(var n=this.numberCols-1,i=0;i<e.length;i+=1)this.table[i][n]="Total";if(t.length>0)for(var r=this.numberRows-1,o=0;o<t.length;o+=1)this.table[r][o]="Total"}},{key:"fillRowLabels",value:function(t,e){this.x=e.length,this.y=0,this.fillCurrentRowLabel(t,e,0)}},{key:"fillCurrentRowLabel",value:function(e,n,i){if(!(i>=e.length))if(i!==e.length-1){var r,o=t(e[i].elements);try{for(o.s();!(r=o.n()).done;){var a=r.value;this.table[this.x][this.y]=a.name,this.y+=1,this.fillCurrentRowLabel(e,n,i+1),this.y-=1}}catch(c){o.e(c)}finally{o.f()}}else{var s,u=t(e[i].elements);try{for(u.s();!(s=u.n()).done;){var l=s.value;this.table[this.x][this.y]=l.name,this.x+=1}}catch(c){u.e(c)}finally{u.f()}}}},{key:"fillCollumnLabels",value:function(t,e){this.x=0,this.y=t.length,this.fillCurrentColLabel(t,e,0)}},{key:"fillCurrentColLabel",value:function(e,n,i){if(!(i>=n.length))if(i!==n.length-1){var r,o=t(n[i].elements);try{for(o.s();!(r=o.n()).done;){var a=r.value;this.table[this.x][this.y]=a.name,this.x+=1,this.fillCurrentColLabel(e,n,i+1),this.x-=1}}catch(c){o.e(c)}finally{o.f()}}else{var s,u=t(n[i].elements);try{for(u.s();!(s=u.n()).done;){var l=s.value;this.table[this.x][this.y]=l.name,this.y+=1}}catch(c){u.e(c)}finally{u.f()}}}},{key:"countInputCells",value:function(t){var e=[],n=[],i=1,r=1,o=0;for(o=0;o<t.distribution;o+=1)e.push(t.partitions[o]),i*=t.partitions[o].elements.length;for(o=t.distribution;o<t.partitions.length;o+=1)n.push(t.partitions[o]),r*=t.partitions[o].elements.length;return r*i}},{key:"isLabelCell",value:function(t,e,n){return e<this.tables[t].cols.length||n<this.tables[t].rows.length}},{key:"isInputCell",value:function(t,e,n){var i=this.tables[t].rows,r=this.tables[t].cols,o=this.tables[t].numberRows,a=this.tables[t].numberCols;if(e>=r.length&&(0===i.length||e<o-1)&&n>=i.length&&(0===r.length||n<a-1)){r.length;var s=a-i.length-1;return 0===r.length&&(s+=1),i.length,(e-=r.length)*s+(n-i.length)}return!1}},{key:"fillWithPreviousData",value:function(){if(this.previousInput){var e,n=t(this.form.elements);try{for(n.s();!(e=n.n()).done;){var i=e.value;this.previousInput&&this.previousInput.values&&this.previousInput.values[i.id]&&this.inputForm.get("values").get(i.id).setValue(this.previousInput.values[i.id])}}catch(r){n.e(r)}finally{n.f()}}}},{key:"saveInput",value:function(){return Object(u.b)(this,void 0,void 0,regeneratorRuntime.mark((function t(){var e,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=new m.a(this.inputForm.value),t.next=3,this.inputService.save(e);case 3:(n=t.sent)&&(this.input=new m.a(n),this.inputForm.get("rev").setValue(this.input.rev));case 5:case"end":return t.stop()}}),t,this)})))}},{key:"deleteInput",value:function(){return Object(u.b)(this,void 0,void 0,regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=new m.a(this.inputForm.value),t.next=3,this.inputService.delete(e);case 3:this.router.navigate(["./../../../"],{relativeTo:this.route});case 4:case"end":return t.stop()}}),t,this)})))}},{key:"getInput",value:function(){return Object(u.b)(this,void 0,void 0,regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.inputService.get(this.project.id,this.site.id,this.form.id,this.timeSlotDate);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t,this)})))}},{key:"resetInput",value:function(){this.inputForm.get("values").setValue(this.input.values)}},{key:"ngOnDestroy",value:function(){this.subscription.unsubscribe()}},{key:"currentLang",get:function(){return this.translateService.currentLang?this.translateService.currentLang:this.translateService.defaultLang}},{key:"canBeSaved",get:function(){return!this.input||!(!this.inputForm||!this.input)&&JSON.stringify(this.inputForm.get("values").value)!==JSON.stringify(this.input.values)}},{key:"inputHasModification",get:function(){return!(!this.inputForm||!this.input)&&JSON.stringify(this.inputForm.get("values").value)!==JSON.stringify(this.input.values)}}])&&i(r.prototype,o),a&&i(r,a),e}(),j.\u0275fac=function(t){return new(t||j)(d.Nb(s.a),d.Nb(p.a),d.Nb(v.d),d.Nb(a.e),d.Nb(g.f),d.Nb(y.a),d.Nb(s.b))},j.\u0275cmp=d.Hb({type:j,selectors:[["app-edit"]],decls:40,vars:31,consts:[[1,"mdm-title"],[1,"mdm-section"],[1,"info"],[1,"info-title"],[1,"info-value"],[1,"title"],["mat-stroked-button","","class","mdm-button small-button fill-button",3,"click",4,"ngIf"],[3,"formGroup",4,"ngIf"],[1,"save-actions"],["mat-stroked-button","",1,"mdm-button","primary",3,"disabled","click"],["mat-stroked-button","",1,"mdm-button",3,"disabled","click"],["mat-stroked-button","","class","mdm-button warn",3,"click",4,"ngIf"],["mat-stroked-button","",1,"mdm-button","small-button","fill-button",3,"click"],[3,"formGroup"],["class","mdm-section",4,"ngFor","ngForOf"],["mat-table","",1,"mdm-table","input-table",3,"dataSource","formArrayName"],[3,"matColumnDef",4,"ngFor","ngForOf"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],[3,"matColumnDef"],[4,"matHeaderCellDef"],["mat-cell","","class","input-td",3,"ngClass",4,"matCellDef"],["mat-cell","",1,"input-td",3,"ngClass"],["class","input-div",4,"ngIf","ngIfElse"],["elseBlock",""],[1,"input-div"],["matInput","",3,"formControl"],[1,"table-value"],["mat-header-row",""],["mat-row",""],["mat-stroked-button","",1,"mdm-button","warn",3,"click"]],template:function(t,e){1&t&&(d.Tb(0,"div",0),d.Dc(1),d.fc(2,"translate"),d.Sb(),d.Tb(3,"div",1),d.Tb(4,"div",2),d.Tb(5,"b",3),d.Dc(6),d.fc(7,"translate"),d.Sb(),d.Tb(8,"div",4),d.Dc(9),d.Sb(),d.Sb(),d.Tb(10,"div",2),d.Tb(11,"b",3),d.Dc(12),d.fc(13,"translate"),d.Sb(),d.Tb(14,"div",4),d.Dc(15),d.Sb(),d.Sb(),d.Tb(16,"div",2),d.Tb(17,"b",3),d.Dc(18),d.fc(19,"translate"),d.Sb(),d.Tb(20,"div",4),d.Dc(21),d.Sb(),d.Sb(),d.Sb(),d.Tb(22,"div",5),d.Bc(23,x,4,0,"button",6),d.Tb(24,"div",0),d.Dc(25),d.fc(26,"translate"),d.Sb(),d.Sb(),d.Bc(27,P,2,2,"div",7),d.Tb(28,"div",8),d.Tb(29,"button",9),d.ac("click",(function(){return e.saveInput()})),d.Tb(30,"mat-icon"),d.Dc(31,"save"),d.Sb(),d.Dc(32),d.fc(33,"translate"),d.Sb(),d.Tb(34,"button",10),d.ac("click",(function(){return e.resetInput()})),d.Tb(35,"mat-icon"),d.Dc(36,"replay"),d.Sb(),d.Dc(37),d.fc(38,"translate"),d.Sb(),d.Bc(39,_,5,3,"button",11),d.Sb()),2&t&&(d.Bb(1),d.Ec(d.gc(2,17,"GeneralInformations")),d.Bb(5),d.Ec(d.gc(7,19,"Name")),d.Bb(3),d.Ec(e.form?e.form.name:""),d.Bb(3),d.Ec(d.gc(13,21,"CollectionSites")),d.Bb(3),d.Ec(e.site?e.site.name:""),d.Bb(3),d.Ec(d.gc(19,23,"CoveredPeriod")),d.Bb(3),d.Hc("",e.timeSlot?e.timeSlot.humanizeValue(e.currentLang):""," (",e.firstDate," - ",e.lastDate,")"),d.Bb(2),d.kc("ngIf",e.previousInput),d.Bb(2),d.Fc(" ",d.gc(26,25,"Data")," "),d.Bb(2),d.kc("ngIf",e.inputForm&&e.tables),d.Bb(2),d.kc("disabled",!e.canBeSaved),d.Bb(3),d.Fc(" ",d.gc(33,27,"Save")," "),d.Bb(2),d.kc("disabled",!e.canBeSaved),d.Bb(3),d.Fc(" ",d.gc(38,29,"Reset changes")," "),d.Bb(2),d.kc("ngIf",e.input))},directives:[a.l,C.a,w.a,g.s,g.k,a.k,S.n,g.e,S.k,S.m,S.c,S.i,S.b,S.h,S.a,a.j,k.b,g.c,g.r,g.h,S.j,S.l],pipes:[v.c],styles:['@font-face{font-family:Neutra-Text;src:url(/assets/fonts/Neutra-Text_32171.ttf) format("truetype")}@font-face{font-family:Neutra-Text;src:url(/assets/fonts/Neutra-Text-Bold_32106.ttf) format("truetype");font-weight:700}@font-face{font-family:Neutra-Text-Light;src:url(/assets/fonts/Neutra-Text-Light_32131.ttf) format("truetype")}@font-face{font-family:Neutra-Text-Light-Demi;src:url(/assets/fonts/Neutra-Text-Light-Demi_32117.ttf) format("truetype")}.mdm-section[_ngcontent-%COMP%]{margin-top:34px;padding:16px;background-color:#fafafa;box-shadow:0 4px 8px 0 rgba(0,0,0,.04)!important;border-radius:4px}.mdm-section[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]{display:flex;padding-bottom:10px}.mdm-section[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .info-title[_ngcontent-%COMP%]{width:20%;text-align:right}.mdm-section[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .info-value[_ngcontent-%COMP%]{padding-left:20px;width:80%}.title[_ngcontent-%COMP%]{width:100%}.title[_ngcontent-%COMP%]   .fill-button[_ngcontent-%COMP%]{float:right}.save-actions[_ngcontent-%COMP%]{position:fixed;bottom:0;right:0;background-color:#fff;width:calc(100% - 250px);box-sizing:border-box;padding:12px 16px;box-shadow:0 1px 6px 0 rgba(0,0,0,.1)}@media screen and (max-width:1023px){.save-actions[_ngcontent-%COMP%]{width:100%}}.save-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-right:8px}.save-actions[_ngcontent-%COMP%]   button.warn[_ngcontent-%COMP%]{background-color:#f44336;color:#fff}.save-actions[_ngcontent-%COMP%]   button.primary[_ngcontent-%COMP%]{background-color:#337ab7;color:#fff}.save-actions[_ngcontent-%COMP%]   button.primary.mat-stroked-button.mat-button-disabled.mat-button-disabled[_ngcontent-%COMP%]{opacity:.65}']}),j)}],G=((M=function t(){n(this,t)}).\u0275mod=d.Lb({type:M}),M.\u0275inj=d.Kb({factory:function(t){return new(t||M)},imports:[[s.f.forChild(A)],s.f]}),M),H=o("kmnG"),J=((E=function t(){n(this,t)}).\u0275mod=d.Lb({type:E}),E.\u0275inj=d.Kb({factory:function(t){return new(t||E)},imports:[[a.c,G,g.m,v.b,S.p,C.b,H.d,w.b,k.c,g.w]]}),E)}}])}();