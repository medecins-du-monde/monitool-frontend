!function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function t(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{rRmd:function(e,o,n){"use strict";n.r(o),n.d(o,"HomeModule",(function(){return P}));var s,a,c=n("ofXK"),i=n("bTqV"),u=n("NFeN"),l=n("+0xr"),b=n("sYmb"),d=n("fXoL"),p=((s=function e(){r(this,e)}).\u0275mod=d.Lb({type:s}),s.\u0275inj=d.Kb({factory:function(e){return new(e||s)},imports:[[c.c]]}),s),f=n("tyNb"),g=n("n/J0"),m=n("c3AT"),k=function(e){return{width:e}},h=((a=function(){function e(){r(this,e),this.total=100}return t(e,[{key:"ngOnInit",value:function(){switch(this.progress=this.progress/this.total*100,!0){case this.progress>0:this.color="green";break;default:this.color="grey"}}}]),e}()).\u0275fac=function(e){return new(e||a)},a.\u0275cmp=d.Hb({type:a,selectors:[["app-progress-bar"]],inputs:{progress:"progress",total:"total"},decls:5,vars:7,consts:[[1,"progress-percentage"],[1,"progress-container"],[1,"progress",3,"ngStyle"]],template:function(e,t){1&e&&(d.Tb(0,"div"),d.Tb(1,"div",0),d.Dc(2),d.Sb(),d.Tb(3,"div",1),d.Ob(4,"div",2),d.Sb(),d.Sb()),2&e&&(d.Eb("progress-bar progress-bar-",t.color,""),d.Bb(2),d.Fc("",t.progress,"%"),d.Bb(2),d.kc("ngStyle",d.oc(5,k,t.progress+"%")))},directives:[c.m],styles:[".progress-bar[_ngcontent-%COMP%]{display:flex;align-items:center}.progress-bar[_ngcontent-%COMP%]   .progress-percentage[_ngcontent-%COMP%]{width:33px;margin-right:8px}.progress-bar[_ngcontent-%COMP%]   .progress-container[_ngcontent-%COMP%]{flex:1;height:6px;background-color:#d8d8d8;border-radius:3px}.progress-bar[_ngcontent-%COMP%]   .progress-container[_ngcontent-%COMP%]   .progress[_ngcontent-%COMP%]{height:100%;border-radius:3px}.progress-bar.progress-bar-grey[_ngcontent-%COMP%]{color:#d8d8d8}.progress-bar.progress-bar-green[_ngcontent-%COMP%]{color:#5cb85b}.progress-bar.progress-bar-green[_ngcontent-%COMP%]   .progress[_ngcontent-%COMP%]{background-color:#5cb85b}"]}),a);function w(e,t){1&e&&(d.Tb(0,"th",13),d.Dc(1),d.fc(2,"translate"),d.Sb()),2&e&&(d.Bb(1),d.Ec(d.gc(2,1,"Task")))}function T(e,t){if(1&e&&(d.Tb(0,"button",15),d.Ob(1,"mat-icon",16),d.Dc(2),d.Sb()),2&e){var r=d.ec().$implicit,o=d.ec();d.kc("routerLink",r.routerLink2),d.Bb(1),d.lc("svgIcon",r.buttonIcon2),d.Bb(1),d.Ec(r.buttonText2[o.currentLang])}}function x(e,t){if(1&e&&(d.Tb(0,"td",14),d.Tb(1,"span"),d.Dc(2),d.Sb(),d.Tb(3,"button",15),d.Ob(4,"mat-icon",16),d.Dc(5),d.Sb(),d.Tb(6,"span"),d.Dc(7),d.Sb(),d.Bc(8,T,3,3,"button",17),d.Sb()),2&e){var r=t.$implicit,o=d.ec();d.Bb(2),d.Ec(r.taskText1[o.currentLang]),d.Bb(1),d.kc("routerLink",r.routerLink1),d.Bb(1),d.lc("svgIcon",r.buttonIcon1),d.Bb(1),d.Ec(r.buttonText1[o.currentLang]),d.Bb(2),d.Ec(r.taskText2[o.currentLang]),d.Bb(1),d.kc("ngIf",""!==r.buttonText2[o.currentLang])}}function v(e,t){1&e&&(d.Tb(0,"th",13),d.Dc(1),d.fc(2,"translate"),d.Sb()),2&e&&(d.Bb(1),d.Ec(d.gc(2,1,"State")))}function y(e,t){if(1&e&&(d.Tb(0,"td",18),d.Ob(1,"app-progress-bar",19),d.Sb()),2&e){var r=t.$implicit;d.Bb(1),d.kc("progress",r.status)}}function S(e,t){1&e&&d.Ob(0,"tr",20)}function L(e,t){1&e&&d.Ob(0,"tr",21)}var B,I,j,D=[{path:"",component:(B=function(){function e(t,o){r(this,e),this.projectService=t,this.translateService=o,this.displayedColumns=["task","status"],this.historyLink=""}return t(e,[{key:"ngOnInit",value:function(){var e=this;this.projectService.openedProject.subscribe((function(t){var r=t.id;e.historyLink="/project/"+r+"/structure/history";var o=t.percentages;e.dataSource=[{taskText1:new g.a({en:"Fill up the ",es:"Rellene los ",fr:"Remplissez les "}),buttonIcon1:"database",buttonText1:new g.a({en:"Basics",es:"Datos de base",fr:"Donn\xe9es de base"}),taskText2:new g.a({en:" de su proyecto (pa\xeds, nombre, tem\xe1ticas, ...).\t",es:" de su proyecto (pa\xeds, nombre, tem\xe1ticas, ...).\t",fr:" de votre projet (pays, nom, th\xe9matiques, ...)."}),status:o.basics,buttonIcon2:"",buttonText2:new g.a,routerLink1:"/project/".concat(r,"/structure/basics"),routerLink2:""},{taskText1:new g.a({en:"Fill up the list of ",es:"Rellene la lista de ",fr:"Renseignez les "}),buttonIcon1:"location",buttonText1:new g.a({en:"Collection sites",es:"Lugares de colecta",fr:"Lieux de collecte"}),taskText2:new g.a({en:" on which your project will collect data.",es:" en los que su proyecto trabaja.",fr:" sur lesquels votre projet va travailler."}),status:o.sites,buttonIcon2:"",buttonText2:new g.a,routerLink1:"/project/".concat(r,"/structure/sites"),routerLink2:""},{taskText1:new g.a({en:"Fill up the logical framework of your reference project in ",es:"Rellene el marco l\xf3gico de su proyecto de referencia en ",fr:"Renseignez le cadre logique de r\xe9f\xe9rence de votre projet dans "}),buttonIcon1:"clipboard",buttonText1:new g.a({en:"Logical frameworks",es:"Marcos l\xf3gicos",fr:"Cadres logiques"}),taskText2:new g.a,status:o.logicalFrames,buttonIcon2:"",buttonText2:new g.a,routerLink1:"/project/".concat(r,"/structure/logical-frames"),routerLink2:""},{taskText1:new g.a({en:"If your project is founded by institutional donors and you need to track other ",es:"Si su proyecto esta financiado por fondos institucionales y que otros ",fr:"Si vous disposez de fonds institutionnels et que d'autres "}),buttonIcon1:"clipboard",buttonText1:new g.a({en:"Logical frameworks",es:"Marcos l\xf3gicos",fr:"Cadres logiques"}),taskText2:new g.a({en:" fill them up as well.",es:" seran usados en el mismo proyecto, agr\xe9guelos los tambien.",fr:" vont \xeatre utilis\xe9s sur le m\xeame projet, renseignez les \xe9galement."}),status:o.logicalFramesOther,buttonIcon2:"",buttonText2:new g.a,routerLink1:"/project/".concat(r,"/structure/logical-frames"),routerLink2:""},{taskText1:new g.a({en:"If you wish to track other indicators than those that are provided by your logical framework(s), add them in ",es:"Si tiene otros indicadores que desea rastrear fuera de su(s) marco(s) l\xf3gico(s), agr\xe9guelos en ",fr:"Si vous disposez d'autres indicateurs que vous d\xe9sirez suivre en dehors de votre (vos) cadre(s) logique(s), ajoutez les dans "}),buttonIcon1:"gauge",buttonText1:new g.a({en:"Extra indicators",es:"Indicadores adicionales",fr:"Indicateurs annex\xe9s"}),taskText2:new g.a,status:o.extraIndicators,buttonIcon2:"",buttonText2:new g.a,routerLink1:"/project/".concat(r,"/structure/extra-indicators"),routerLink2:""},{taskText1:new g.a({en:"Fill up the ",es:"Complete los ",fr:"Renseignez les "}),buttonIcon1:"folder",buttonText1:new g.a({en:"Data sources",es:"Fuentes de datos",fr:"Sources de donn\xe9es"}),taskText2:new g.a({en:" from which you plan to extract the data that will be necesary to compute your indicators. As you progress, update the formulas for calculating your indicators in ",es:" de donde extraer\xe1 los datos necesarios para calcular los indicadores de todos sus marcos l\xf3gicos. A medida que avance, actualice las f\xf3rmulas para calcular sus indicadores en ",fr:" dont vous allez extraire les donn\xe9es n\xe9cessaires au calculs des indicateurs de tous vos cadres logiques. \xc0 mesure de votre avancement, mettez \xe0 jour les formules de calcul de vos indicateurs dans "}),status:o.logicalFramesUpdate,buttonIcon2:"clipboard",buttonText2:new g.a({en:"Logical frameworks",es:"Marcos l\xf3gicos",fr:"Cadres logiques"}),routerLink1:"/project/".concat(r,"/structure/data-sources"),routerLink2:"/project/${projectId}/structure/logical-frames"},{taskText1:new g.a({en:"Perform the same task for ",es:"Realice la misma tarea para ",fr:"R\xe9alisez la m\xeame t\xe2che pour les "}),buttonIcon1:"gauge",buttonText1:new g.a({en:"Cross-cutting indicators",es:"Indicadores transversales",fr:"Indicateurs transversaux"}),taskText2:new g.a,status:o.crossCuttingUpdate,buttonIcon2:"",buttonText2:new g.a,routerLink1:"/project/".concat(r,"/structure/cross-cutting"),routerLink2:""},{taskText1:new g.a({en:"Perform the same task for ",es:"Realice la misma tarea para ",fr:"R\xe9alisez la m\xeame t\xe2che pour les "}),buttonIcon1:"gauge",buttonText1:new g.a({en:"Extra indicators",es:"Indicadores adicionales",fr:"Indicateurs annex\xe9s"}),taskText2:new g.a,status:o.extraIndicatorsUpdate,buttonIcon2:"",buttonText2:new g.a,routerLink1:"/project/".concat(r,"/structure/extra-indicators"),routerLink2:""}]}))}},{key:"currentLang",get:function(){return this.translateService.currentLang?this.translateService.currentLang:this.translateService.defaultLang}}]),e}(),B.\u0275fac=function(e){return new(e||B)(d.Nb(m.a),d.Nb(b.d))},B.\u0275cmp=d.Hb({type:B,selectors:[["app-home"]],decls:54,vars:43,consts:[[1,"info-section"],[1,"info-section","blue"],["mat-stroked-button","",1,"mdm-button"],["mat-stroked-button","",1,"mdm-button",3,"routerLink"],["svgIcon","history"],["mat-table","",1,"mdm-table",3,"dataSource"],["matColumnDef","task"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","","id","task",4,"matCellDef"],["matColumnDef","status"],["mat-cell","","id","status",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-header-cell",""],["mat-cell","","id","task"],["mat-stroked-button","",1,"mdm-button","small-button",3,"routerLink"],[3,"svgIcon"],["mat-stroked-button","","class","mdm-button small-button",3,"routerLink",4,"ngIf"],["mat-cell","","id","status"],[3,"progress"],["mat-header-row",""],["mat-row",""]],template:function(e,t){1&e&&(d.Tb(0,"div",0),d.Tb(1,"p"),d.Dc(2),d.fc(3,"translate"),d.Sb(),d.Tb(4,"p"),d.Dc(5),d.fc(6,"translate"),d.Sb(),d.Tb(7,"ul"),d.Tb(8,"li"),d.Dc(9),d.fc(10,"translate"),d.Sb(),d.Tb(11,"li"),d.Dc(12),d.fc(13,"translate"),d.Sb(),d.Tb(14,"li"),d.Dc(15),d.fc(16,"translate"),d.Sb(),d.Tb(17,"li"),d.Dc(18),d.fc(19,"translate"),d.Sb(),d.Sb(),d.Sb(),d.Tb(20,"div",1),d.Tb(21,"p"),d.Dc(22),d.fc(23,"translate"),d.Sb(),d.Sb(),d.Tb(24,"div",1),d.Tb(25,"p"),d.Dc(26),d.fc(27,"translate"),d.Tb(28,"button",2),d.Tb(29,"mat-icon"),d.Dc(30,"undo"),d.Sb(),d.Dc(31),d.fc(32,"translate"),d.Sb(),d.Dc(33),d.fc(34,"translate"),d.Sb(),d.Sb(),d.Tb(35,"div",1),d.Tb(36,"p"),d.Dc(37),d.fc(38,"translate"),d.Tb(39,"button",3),d.Ob(40,"mat-icon",4),d.Dc(41),d.fc(42,"translate"),d.Sb(),d.Dc(43),d.fc(44,"translate"),d.Sb(),d.Sb(),d.Tb(45,"table",5),d.Rb(46,6),d.Bc(47,w,3,3,"th",7),d.Bc(48,x,9,6,"td",8),d.Qb(),d.Rb(49,9),d.Bc(50,v,3,3,"th",7),d.Bc(51,y,2,1,"td",10),d.Qb(),d.Bc(52,S,1,0,"tr",11),d.Bc(53,L,1,0,"tr",12),d.Sb()),2&e&&(d.Bb(2),d.Ec(d.gc(3,17,"ProjectHomeInfo.0")),d.Bb(3),d.Ec(d.gc(6,19,"ProjectHomeInfo.1")),d.Bb(4),d.Ec(d.gc(10,21,"ProjectHomeInfo.2")),d.Bb(3),d.Ec(d.gc(13,23,"ProjectHomeInfo.3")),d.Bb(3),d.Ec(d.gc(16,25,"ProjectHomeInfo.4")),d.Bb(3),d.Ec(d.gc(19,27,"ProjectHomeInfo.5")),d.Bb(4),d.Ec(d.gc(23,29,"ProjectHomeBlueSection.0")),d.Bb(4),d.Ec(d.gc(27,31,"ProjectHomeBlueSection.1.0")),d.Bb(5),d.Ec(d.gc(32,33,"ResetChanges")),d.Bb(2),d.Ec(d.gc(34,35,"ProjectHomeBlueSection.1.1")),d.Bb(4),d.Ec(d.gc(38,37,"ProjectHomeBlueSection.2.0")),d.Bb(2),d.kc("routerLink",t.historyLink),d.Bb(2),d.Ec(d.gc(42,39,"History")),d.Bb(2),d.Ec(d.gc(44,41,"ProjectHomeBlueSection.2.1")),d.Bb(2),d.kc("dataSource",t.dataSource),d.Bb(7),d.kc("matHeaderRowDef",t.displayedColumns),d.Bb(1),d.kc("matRowDefColumns",t.displayedColumns))},directives:[i.a,u.a,f.c,l.n,l.c,l.i,l.b,l.k,l.m,l.h,l.a,c.l,h,l.j,l.l],pipes:[b.c],styles:["#status[_ngcontent-%COMP%]{width:30%}"]}),B)}],C=((j=function e(){r(this,e)}).\u0275mod=d.Lb({type:j}),j.\u0275inj=d.Kb({factory:function(e){return new(e||j)},imports:[[f.f.forChild(D)],f.f]}),j),P=((I=function e(){r(this,e)}).\u0275mod=d.Lb({type:I}),I.\u0275inj=d.Kb({factory:function(e){return new(e||I)},imports:[[c.c,b.b,C,l.p,i.b,u.b,p]]}),I)}}])}();