'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">mdm-monitool-frontend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ActionProjectModalModule.html" data-type="entity-link" >ActionProjectModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ActionProjectModalModule-b5d6572c248b83d3bfc5376a58ae9778a11f1a8f07cd35bb6a84606271140957f528a7dee58f13ce940fff50fa432261749b0d99121d6cb90a71c6015f4df0da"' : 'data-bs-target="#xs-components-links-module-ActionProjectModalModule-b5d6572c248b83d3bfc5376a58ae9778a11f1a8f07cd35bb6a84606271140957f528a7dee58f13ce940fff50fa432261749b0d99121d6cb90a71c6015f4df0da"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ActionProjectModalModule-b5d6572c248b83d3bfc5376a58ae9778a11f1a8f07cd35bb6a84606271140957f528a7dee58f13ce940fff50fa432261749b0d99121d6cb90a71c6015f4df0da"' :
                                            'id="xs-components-links-module-ActionProjectModalModule-b5d6572c248b83d3bfc5376a58ae9778a11f1a8f07cd35bb6a84606271140957f528a7dee58f13ce940fff50fa432261749b0d99121d6cb90a71c6015f4df0da"' }>
                                            <li class="link">
                                                <a href="components/ActionProjectModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionProjectModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ActivityEditModule.html" data-type="entity-link" >ActivityEditModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ActivityEditModule-e9fe7cea2ac5fe09e8eb67af2bc034f8067b27a1b7424a3748cd37cb79b6744ebe8b01bf562d75492e15cf4a68c62c300d128a14cc206da03a10aace86a531b6"' : 'data-bs-target="#xs-components-links-module-ActivityEditModule-e9fe7cea2ac5fe09e8eb67af2bc034f8067b27a1b7424a3748cd37cb79b6744ebe8b01bf562d75492e15cf4a68c62c300d128a14cc206da03a10aace86a531b6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ActivityEditModule-e9fe7cea2ac5fe09e8eb67af2bc034f8067b27a1b7424a3748cd37cb79b6744ebe8b01bf562d75492e15cf4a68c62c300d128a14cc206da03a10aace86a531b6"' :
                                            'id="xs-components-links-module-ActivityEditModule-e9fe7cea2ac5fe09e8eb67af2bc034f8067b27a1b7424a3748cd37cb79b6744ebe8b01bf562d75492e15cf4a68c62c300d128a14cc206da03a10aace86a531b6"' }>
                                            <li class="link">
                                                <a href="components/ActivityEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActivityEditComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-22d12f3953a70580a5d310df4f16646a707aaddb027c096a5bbea246c7efe26b582f12a29b0864858c8135ae02fd42677d836c72fa7d142deda093b0e8924904"' : 'data-bs-target="#xs-components-links-module-AppModule-22d12f3953a70580a5d310df4f16646a707aaddb027c096a5bbea246c7efe26b582f12a29b0864858c8135ae02fd42677d836c72fa7d142deda093b0e8924904"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-22d12f3953a70580a5d310df4f16646a707aaddb027c096a5bbea246c7efe26b582f12a29b0864858c8135ae02fd42677d836c72fa7d142deda093b0e8924904"' :
                                            'id="xs-components-links-module-AppModule-22d12f3953a70580a5d310df4f16646a707aaddb027c096a5bbea246c7efe26b582f12a29b0864858c8135ae02fd42677d836c72fa7d142deda093b0e8924904"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BasicsModule.html" data-type="entity-link" >BasicsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-BasicsModule-1364ea221326668d3f5efc90a074cee867fd9e2124e955597ed601281ca8c6cf09a2bc36275a71c06d712bfe2c35ab1fab54bccb85e3bdf7aad638ea63f37814"' : 'data-bs-target="#xs-components-links-module-BasicsModule-1364ea221326668d3f5efc90a074cee867fd9e2124e955597ed601281ca8c6cf09a2bc36275a71c06d712bfe2c35ab1fab54bccb85e3bdf7aad638ea63f37814"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BasicsModule-1364ea221326668d3f5efc90a074cee867fd9e2124e955597ed601281ca8c6cf09a2bc36275a71c06d712bfe2c35ab1fab54bccb85e3bdf7aad638ea63f37814"' :
                                            'id="xs-components-links-module-BasicsModule-1364ea221326668d3f5efc90a074cee867fd9e2124e955597ed601281ca8c6cf09a2bc36275a71c06d712bfe2c35ab1fab54bccb85e3bdf7aad638ea63f37814"' }>
                                            <li class="link">
                                                <a href="components/BasicsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BasicsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BasicsRoutingModule.html" data-type="entity-link" >BasicsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BreadcrumbModule.html" data-type="entity-link" >BreadcrumbModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-BreadcrumbModule-ab7b48e1e10f9c24046df0a0bb0a3ea5a718fe4f4f2ffbe8718496c4bf36a865a0e86b32d96d0aea0b3232b49f54b5192336b4d605a96edddd76a4d6a80950ee"' : 'data-bs-target="#xs-components-links-module-BreadcrumbModule-ab7b48e1e10f9c24046df0a0bb0a3ea5a718fe4f4f2ffbe8718496c4bf36a865a0e86b32d96d0aea0b3232b49f54b5192336b4d605a96edddd76a4d6a80950ee"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BreadcrumbModule-ab7b48e1e10f9c24046df0a0bb0a3ea5a718fe4f4f2ffbe8718496c4bf36a865a0e86b32d96d0aea0b3232b49f54b5192336b4d605a96edddd76a4d6a80950ee"' :
                                            'id="xs-components-links-module-BreadcrumbModule-ab7b48e1e10f9c24046df0a0bb0a3ea5a718fe4f4f2ffbe8718496c4bf36a865a0e86b32d96d0aea0b3232b49f54b5192336b4d605a96edddd76a4d6a80950ee"' }>
                                            <li class="link">
                                                <a href="components/BreadcrumbComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BreadcrumbComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChartModule.html" data-type="entity-link" >ChartModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ChartModule-566256eb922835d367ea2facf4eb55062ae512bb2f3e09ec0933c73170495fa941019f07d925913fde2221c868d7e0ac7fa9171e823b5c1e288ecd17a0ce07ca"' : 'data-bs-target="#xs-components-links-module-ChartModule-566256eb922835d367ea2facf4eb55062ae512bb2f3e09ec0933c73170495fa941019f07d925913fde2221c868d7e0ac7fa9171e823b5c1e288ecd17a0ce07ca"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ChartModule-566256eb922835d367ea2facf4eb55062ae512bb2f3e09ec0933c73170495fa941019f07d925913fde2221c868d7e0ac7fa9171e823b5c1e288ecd17a0ce07ca"' :
                                            'id="xs-components-links-module-ChartModule-566256eb922835d367ea2facf4eb55062ae512bb2f3e09ec0933c73170495fa941019f07d925913fde2221c868d7e0ac7fa9171e823b5c1e288ecd17a0ce07ca"' }>
                                            <li class="link">
                                                <a href="components/ChartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DownloadModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DownloadModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CollectionSitesSelectorModule.html" data-type="entity-link" >CollectionSitesSelectorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CollectionSitesSelectorModule-ef0c775c31ae45c892f6065657c5731f556d32e015b7b8a48aa270801f1078c99455673c13250c413b2af9f274c9a962cb94dfac7276c34452e341653538877f"' : 'data-bs-target="#xs-components-links-module-CollectionSitesSelectorModule-ef0c775c31ae45c892f6065657c5731f556d32e015b7b8a48aa270801f1078c99455673c13250c413b2af9f274c9a962cb94dfac7276c34452e341653538877f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CollectionSitesSelectorModule-ef0c775c31ae45c892f6065657c5731f556d32e015b7b8a48aa270801f1078c99455673c13250c413b2af9f274c9a962cb94dfac7276c34452e341653538877f"' :
                                            'id="xs-components-links-module-CollectionSitesSelectorModule-ef0c775c31ae45c892f6065657c5731f556d32e015b7b8a48aa270801f1078c99455673c13250c413b2af9f274c9a962cb94dfac7276c34452e341653538877f"' }>
                                            <li class="link">
                                                <a href="components/CollectionSitesSelectorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CollectionSitesSelectorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommentedGraphsModule.html" data-type="entity-link" >CommentedGraphsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CommentedGraphsModule-fdb48bb0c6e9631c7b0d284048de91d7885744c428bec7a6553ded1879e267224a160539279af6fba16d5dfae2db0d37c72ff76cd95f5fbf40f351e352a99950"' : 'data-bs-target="#xs-components-links-module-CommentedGraphsModule-fdb48bb0c6e9631c7b0d284048de91d7885744c428bec7a6553ded1879e267224a160539279af6fba16d5dfae2db0d37c72ff76cd95f5fbf40f351e352a99950"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CommentedGraphsModule-fdb48bb0c6e9631c7b0d284048de91d7885744c428bec7a6553ded1879e267224a160539279af6fba16d5dfae2db0d37c72ff76cd95f5fbf40f351e352a99950"' :
                                            'id="xs-components-links-module-CommentedGraphsModule-fdb48bb0c6e9631c7b0d284048de91d7885744c428bec7a6553ded1879e267224a160539279af6fba16d5dfae2db0d37c72ff76cd95f5fbf40f351e352a99950"' }>
                                            <li class="link">
                                                <a href="components/CommentedGraphsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentedGraphsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogframesDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogframesDashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommentedGraphsRoutingModule.html" data-type="entity-link" >CommentedGraphsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CommentModalModule.html" data-type="entity-link" >CommentModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CommentModalModule-307a4d75c0d55febbc7d521a83e649cfef4dc1240a1f0878826ad7934d25fdf2a14fe61de5652193b87f7f8591bbc7a4935d730eaf6755749903985b76b79bca"' : 'data-bs-target="#xs-components-links-module-CommentModalModule-307a4d75c0d55febbc7d521a83e649cfef4dc1240a1f0878826ad7934d25fdf2a14fe61de5652193b87f7f8591bbc7a4935d730eaf6755749903985b76b79bca"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CommentModalModule-307a4d75c0d55febbc7d521a83e649cfef4dc1240a1f0878826ad7934d25fdf2a14fe61de5652193b87f7f8591bbc7a4935d730eaf6755749903985b76b79bca"' :
                                            'id="xs-components-links-module-CommentModalModule-307a4d75c0d55febbc7d521a83e649cfef4dc1240a1f0878826ad7934d25fdf2a14fe61de5652193b87f7f8591bbc7a4935d730eaf6755749903985b76b79bca"' }>
                                            <li class="link">
                                                <a href="components/CommentModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConfirmModalModule.html" data-type="entity-link" >ConfirmModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ConfirmModalModule-e5e0fd14cd0728dc0aafbf9152751b58721f8266a5c8ba8cdab329bda51e61f0a8712eab9f12aec45f8c9c1f82c76b2b048d65a4296c24beea8b7039e5ef494a"' : 'data-bs-target="#xs-components-links-module-ConfirmModalModule-e5e0fd14cd0728dc0aafbf9152751b58721f8266a5c8ba8cdab329bda51e61f0a8712eab9f12aec45f8c9c1f82c76b2b048d65a4296c24beea8b7039e5ef494a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ConfirmModalModule-e5e0fd14cd0728dc0aafbf9152751b58721f8266a5c8ba8cdab329bda51e61f0a8712eab9f12aec45f8c9c1f82c76b2b048d65a4296c24beea8b7039e5ef494a"' :
                                            'id="xs-components-links-module-ConfirmModalModule-e5e0fd14cd0728dc0aafbf9152751b58721f8266a5c8ba8cdab329bda51e61f0a8712eab9f12aec45f8c9c1f82c76b2b048d65a4296c24beea8b7039e5ef494a"' }>
                                            <li class="link">
                                                <a href="components/ConfirmModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CrossCuttingModule.html" data-type="entity-link" >CrossCuttingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CrossCuttingModule-837bd30b528f2e717b2877edb2adf9dba9a30221986ca40d48fd38dabf0eb89010a1de044cd387fd469b5d5e2da57fca08a8428a6ab1bc8bee58ef15c9638650"' : 'data-bs-target="#xs-components-links-module-CrossCuttingModule-837bd30b528f2e717b2877edb2adf9dba9a30221986ca40d48fd38dabf0eb89010a1de044cd387fd469b5d5e2da57fca08a8428a6ab1bc8bee58ef15c9638650"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CrossCuttingModule-837bd30b528f2e717b2877edb2adf9dba9a30221986ca40d48fd38dabf0eb89010a1de044cd387fd469b5d5e2da57fca08a8428a6ab1bc8bee58ef15c9638650"' :
                                            'id="xs-components-links-module-CrossCuttingModule-837bd30b528f2e717b2877edb2adf9dba9a30221986ca40d48fd38dabf0eb89010a1de044cd387fd469b5d5e2da57fca08a8428a6ab1bc8bee58ef15c9638650"' }>
                                            <li class="link">
                                                <a href="components/CrossCuttingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CrossCuttingComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CrossCuttingRoutingModule.html" data-type="entity-link" >CrossCuttingRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DataSourceEditModule.html" data-type="entity-link" >DataSourceEditModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DataSourceEditModule-6bb3f050114f0de19c10eeb5b7d04a528ed8ea2ff9e170ccc8cb3f55a5e93fbb838ec6aff7622136e440b76ce803f445bef407e9c351ab773ffa9219b03b3fe8"' : 'data-bs-target="#xs-components-links-module-DataSourceEditModule-6bb3f050114f0de19c10eeb5b7d04a528ed8ea2ff9e170ccc8cb3f55a5e93fbb838ec6aff7622136e440b76ce803f445bef407e9c351ab773ffa9219b03b3fe8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DataSourceEditModule-6bb3f050114f0de19c10eeb5b7d04a528ed8ea2ff9e170ccc8cb3f55a5e93fbb838ec6aff7622136e440b76ce803f445bef407e9c351ab773ffa9219b03b3fe8"' :
                                            'id="xs-components-links-module-DataSourceEditModule-6bb3f050114f0de19c10eeb5b7d04a528ed8ea2ff9e170ccc8cb3f55a5e93fbb838ec6aff7622136e440b76ce803f445bef407e9c351ab773ffa9219b03b3fe8"' }>
                                            <li class="link">
                                                <a href="components/DataSourceEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataSourceEditComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DataSourceModule.html" data-type="entity-link" >DataSourceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DataSourceModule-1ec24e99dfc9638b24facb56bbc891fc032753ceeb10db07e7a0933f845de4f718314841c54235eb928c3a4ad63ae6e6c86169d360d7dd0b75497c6d50c15283"' : 'data-bs-target="#xs-components-links-module-DataSourceModule-1ec24e99dfc9638b24facb56bbc891fc032753ceeb10db07e7a0933f845de4f718314841c54235eb928c3a4ad63ae6e6c86169d360d7dd0b75497c6d50c15283"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DataSourceModule-1ec24e99dfc9638b24facb56bbc891fc032753ceeb10db07e7a0933f845de4f718314841c54235eb928c3a4ad63ae6e6c86169d360d7dd0b75497c6d50c15283"' :
                                            'id="xs-components-links-module-DataSourceModule-1ec24e99dfc9638b24facb56bbc891fc032753ceeb10db07e7a0933f845de4f718314841c54235eb928c3a4ad63ae6e6c86169d360d7dd0b75497c6d50c15283"' }>
                                            <li class="link">
                                                <a href="components/DataSourceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataSourceComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DataSourceSelectorModule.html" data-type="entity-link" >DataSourceSelectorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DataSourceSelectorModule-c312c97021bc4fee6e9d6df8875760bbb77574dd26de463b7e559475ba4546344ccb27f339f210662b72074c4d63226d8de8789260b12a49c639fef14661b491"' : 'data-bs-target="#xs-components-links-module-DataSourceSelectorModule-c312c97021bc4fee6e9d6df8875760bbb77574dd26de463b7e559475ba4546344ccb27f339f210662b72074c4d63226d8de8789260b12a49c639fef14661b491"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DataSourceSelectorModule-c312c97021bc4fee6e9d6df8875760bbb77574dd26de463b7e559475ba4546344ccb27f339f210662b72074c4d63226d8de8789260b12a49c639fef14661b491"' :
                                            'id="xs-components-links-module-DataSourceSelectorModule-c312c97021bc4fee6e9d6df8875760bbb77574dd26de463b7e559475ba4546344ccb27f339f210662b72074c4d63226d8de8789260b12a49c639fef14661b491"' }>
                                            <li class="link">
                                                <a href="components/DataSourceSelectorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataSourceSelectorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DataSourcesListModule.html" data-type="entity-link" >DataSourcesListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DataSourcesListModule-1e414fb5bbb589446b4f84db25535dc0d305808c29c468408faedff3f8e31ee81b70bb32e23809006134d9c3ecfceafe27225ccae132c9e915bdac71082d7b28"' : 'data-bs-target="#xs-components-links-module-DataSourcesListModule-1e414fb5bbb589446b4f84db25535dc0d305808c29c468408faedff3f8e31ee81b70bb32e23809006134d9c3ecfceafe27225ccae132c9e915bdac71082d7b28"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DataSourcesListModule-1e414fb5bbb589446b4f84db25535dc0d305808c29c468408faedff3f8e31ee81b70bb32e23809006134d9c3ecfceafe27225ccae132c9e915bdac71082d7b28"' :
                                            'id="xs-components-links-module-DataSourcesListModule-1e414fb5bbb589446b4f84db25535dc0d305808c29c468408faedff3f8e31ee81b70bb32e23809006134d9c3ecfceafe27225ccae132c9e915bdac71082d7b28"' }>
                                            <li class="link">
                                                <a href="components/DataSourcesListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataSourcesListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DataSourcesModule.html" data-type="entity-link" >DataSourcesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DataSourcesModule-374d7306cae9cc9b974f517fbf9a2f68f80cb14a4de8cfb70795e563d0ec310f55a9bdb0c230382204cbc4c6411a495d94041fffd9f9a7e3f5db71234c5431aa"' : 'data-bs-target="#xs-components-links-module-DataSourcesModule-374d7306cae9cc9b974f517fbf9a2f68f80cb14a4de8cfb70795e563d0ec310f55a9bdb0c230382204cbc4c6411a495d94041fffd9f9a7e3f5db71234c5431aa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DataSourcesModule-374d7306cae9cc9b974f517fbf9a2f68f80cb14a4de8cfb70795e563d0ec310f55a9bdb0c230382204cbc4c6411a495d94041fffd9f9a7e3f5db71234c5431aa"' :
                                            'id="xs-components-links-module-DataSourcesModule-374d7306cae9cc9b974f517fbf9a2f68f80cb14a4de8cfb70795e563d0ec310f55a9bdb0c230382204cbc4c6411a495d94041fffd9f9a7e3f5db71234c5431aa"' }>
                                            <li class="link">
                                                <a href="components/DataSourcesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataSourcesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DataSourcesRoutingModule.html" data-type="entity-link" >DataSourcesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DeleteModalModule.html" data-type="entity-link" >DeleteModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DeleteModalModule-b4847e5d617c0cf63b0c73684399c18d5be30750ad489b17f2a609973b0ea3196cc6643ba3bea163ae8f031e27c985c63faf52f30033d41cb40af078c4d52cad"' : 'data-bs-target="#xs-components-links-module-DeleteModalModule-b4847e5d617c0cf63b0c73684399c18d5be30750ad489b17f2a609973b0ea3196cc6643ba3bea163ae8f031e27c985c63faf52f30033d41cb40af078c4d52cad"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DeleteModalModule-b4847e5d617c0cf63b0c73684399c18d5be30750ad489b17f2a609973b0ea3196cc6643ba3bea163ae8f031e27c985c63faf52f30033d41cb40af078c4d52cad"' :
                                            'id="xs-components-links-module-DeleteModalModule-b4847e5d617c0cf63b0c73684399c18d5be30750ad489b17f2a609973b0ea3196cc6643ba3bea163ae8f031e27c985c63faf52f30033d41cb40af078c4d52cad"' }>
                                            <li class="link">
                                                <a href="components/DeleteModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DownloadExcelPageRoutingModule.html" data-type="entity-link" >DownloadExcelPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EditModule.html" data-type="entity-link" >EditModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-EditModule-f14df799094bc43311daefe62d1e6e99aba1908b28973269d87763ffe6481ecb3ff0a3898d9bf94b3f208d1bcdfed79497915ecb3dfaa6c430dd7e9326097f38"' : 'data-bs-target="#xs-components-links-module-EditModule-f14df799094bc43311daefe62d1e6e99aba1908b28973269d87763ffe6481ecb3ff0a3898d9bf94b3f208d1bcdfed79497915ecb3dfaa6c430dd7e9326097f38"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EditModule-f14df799094bc43311daefe62d1e6e99aba1908b28973269d87763ffe6481ecb3ff0a3898d9bf94b3f208d1bcdfed79497915ecb3dfaa6c430dd7e9326097f38"' :
                                            'id="xs-components-links-module-EditModule-f14df799094bc43311daefe62d1e6e99aba1908b28973269d87763ffe6481ecb3ff0a3898d9bf94b3f208d1bcdfed79497915ecb3dfaa6c430dd7e9326097f38"' }>
                                            <li class="link">
                                                <a href="components/EditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EditRoutingModule.html" data-type="entity-link" >EditRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ExistingPartitionModalModule.html" data-type="entity-link" >ExistingPartitionModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ExistingPartitionModalModule-bf25acb84d65495783d6456c77e72eded337b75c0ca48d51f2d448cdab5d463822333dd815e0eefdbf9d8de342632180733da3a36e2fdec4dd666f4c6569776b"' : 'data-bs-target="#xs-components-links-module-ExistingPartitionModalModule-bf25acb84d65495783d6456c77e72eded337b75c0ca48d51f2d448cdab5d463822333dd815e0eefdbf9d8de342632180733da3a36e2fdec4dd666f4c6569776b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ExistingPartitionModalModule-bf25acb84d65495783d6456c77e72eded337b75c0ca48d51f2d448cdab5d463822333dd815e0eefdbf9d8de342632180733da3a36e2fdec4dd666f4c6569776b"' :
                                            'id="xs-components-links-module-ExistingPartitionModalModule-bf25acb84d65495783d6456c77e72eded337b75c0ca48d51f2d448cdab5d463822333dd815e0eefdbf9d8de342632180733da3a36e2fdec4dd666f4c6569776b"' }>
                                            <li class="link">
                                                <a href="components/ExistingPartitionModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExistingPartitionModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExtraIndicatorModule.html" data-type="entity-link" >ExtraIndicatorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ExtraIndicatorModule-95bb3509a1810eeaa99a02eb3f91800a4b41c57f8d85470b05992aad74d30fdf1982333c7229ab646ee525aa18d44518e802b56454c3ec71716c9d42f0acba36"' : 'data-bs-target="#xs-components-links-module-ExtraIndicatorModule-95bb3509a1810eeaa99a02eb3f91800a4b41c57f8d85470b05992aad74d30fdf1982333c7229ab646ee525aa18d44518e802b56454c3ec71716c9d42f0acba36"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ExtraIndicatorModule-95bb3509a1810eeaa99a02eb3f91800a4b41c57f8d85470b05992aad74d30fdf1982333c7229ab646ee525aa18d44518e802b56454c3ec71716c9d42f0acba36"' :
                                            'id="xs-components-links-module-ExtraIndicatorModule-95bb3509a1810eeaa99a02eb3f91800a4b41c57f8d85470b05992aad74d30fdf1982333c7229ab646ee525aa18d44518e802b56454c3ec71716c9d42f0acba36"' }>
                                            <li class="link">
                                                <a href="components/ExtraIndicatorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExtraIndicatorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExtraIndicatorsModule.html" data-type="entity-link" >ExtraIndicatorsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ExtraIndicatorsModule-f3c3b9a8123698c7fb5c3a0fda72b8ad43510c44283838e0ccc91b9e63b50887a236cf3a538fa2932d01cfaa2f6540eeb8a1ba36ea25161e9d751e767e465042"' : 'data-bs-target="#xs-components-links-module-ExtraIndicatorsModule-f3c3b9a8123698c7fb5c3a0fda72b8ad43510c44283838e0ccc91b9e63b50887a236cf3a538fa2932d01cfaa2f6540eeb8a1ba36ea25161e9d751e767e465042"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ExtraIndicatorsModule-f3c3b9a8123698c7fb5c3a0fda72b8ad43510c44283838e0ccc91b9e63b50887a236cf3a538fa2932d01cfaa2f6540eeb8a1ba36ea25161e9d751e767e465042"' :
                                            'id="xs-components-links-module-ExtraIndicatorsModule-f3c3b9a8123698c7fb5c3a0fda72b8ad43510c44283838e0ccc91b9e63b50887a236cf3a538fa2932d01cfaa2f6540eeb8a1ba36ea25161e9d751e767e465042"' }>
                                            <li class="link">
                                                <a href="components/ExtraIndicatorsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExtraIndicatorsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExtraIndicatorsRoutingModule.html" data-type="entity-link" >ExtraIndicatorsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FilterModule.html" data-type="entity-link" >FilterModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FilterModule-679eeabfe77ec73e5ece12e5092b90829b7314cac7d239f715ec075f9fcb4472d1fd59709c09a2d7c20ea8c8a26d2a777d1b8105dfcd63e08a78dd8793f18bc9"' : 'data-bs-target="#xs-components-links-module-FilterModule-679eeabfe77ec73e5ece12e5092b90829b7314cac7d239f715ec075f9fcb4472d1fd59709c09a2d7c20ea8c8a26d2a777d1b8105dfcd63e08a78dd8793f18bc9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FilterModule-679eeabfe77ec73e5ece12e5092b90829b7314cac7d239f715ec075f9fcb4472d1fd59709c09a2d7c20ea8c8a26d2a777d1b8105dfcd63e08a78dd8793f18bc9"' :
                                            'id="xs-components-links-module-FilterModule-679eeabfe77ec73e5ece12e5092b90829b7314cac7d239f715ec075f9fcb4472d1fd59709c09a2d7c20ea8c8a26d2a777d1b8105dfcd63e08a78dd8793f18bc9"' }>
                                            <li class="link">
                                                <a href="components/FilterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FormElementEditModule.html" data-type="entity-link" >FormElementEditModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FormElementEditModule-681828e038d2f38b940139b43f937162b9f2904d9b72ff0c16ffd061938d253aecfd67803661858b0c5cbf3227f69c4aae0c033285d5f95a8709a31810c821fd"' : 'data-bs-target="#xs-components-links-module-FormElementEditModule-681828e038d2f38b940139b43f937162b9f2904d9b72ff0c16ffd061938d253aecfd67803661858b0c5cbf3227f69c4aae0c033285d5f95a8709a31810c821fd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FormElementEditModule-681828e038d2f38b940139b43f937162b9f2904d9b72ff0c16ffd061938d253aecfd67803661858b0c5cbf3227f69c4aae0c033285d5f95a8709a31810c821fd"' :
                                            'id="xs-components-links-module-FormElementEditModule-681828e038d2f38b940139b43f937162b9f2904d9b72ff0c16ffd061938d253aecfd67803661858b0c5cbf3227f69c4aae0c033285d5f95a8709a31810c821fd"' }>
                                            <li class="link">
                                                <a href="components/FormElementEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormElementEditComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GeneralModule.html" data-type="entity-link" >GeneralModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-GeneralModule-844d46f06c77297ec9394bba364d1e916bbc1c1fcb964ed523eb6198982fdf1985e90ebf2c96594e70c0bcaa9fc9320c3b76e3945a5d3889448ca1b4b974380f"' : 'data-bs-target="#xs-components-links-module-GeneralModule-844d46f06c77297ec9394bba364d1e916bbc1c1fcb964ed523eb6198982fdf1985e90ebf2c96594e70c0bcaa9fc9320c3b76e3945a5d3889448ca1b4b974380f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GeneralModule-844d46f06c77297ec9394bba364d1e916bbc1c1fcb964ed523eb6198982fdf1985e90ebf2c96594e70c0bcaa9fc9320c3b76e3945a5d3889448ca1b4b974380f"' :
                                            'id="xs-components-links-module-GeneralModule-844d46f06c77297ec9394bba364d1e916bbc1c1fcb964ed523eb6198982fdf1985e90ebf2c96594e70c0bcaa9fc9320c3b76e3945a5d3889448ca1b4b974380f"' }>
                                            <li class="link">
                                                <a href="components/DownloadExcelPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DownloadExcelPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GeneralComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GeneralComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GeneralRoutingModule.html" data-type="entity-link" >GeneralRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HeaderModule.html" data-type="entity-link" >HeaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HeaderModule-fbd13d5f49cc41d64aa5dcb47acadb92f7c6d6d0cc223bf6625e3ef1e0d7e12c1c642cc6776835fc5934c0f0d89e92347415b21254b06d8b0f05a674cc1c9a5a"' : 'data-bs-target="#xs-components-links-module-HeaderModule-fbd13d5f49cc41d64aa5dcb47acadb92f7c6d6d0cc223bf6625e3ef1e0d7e12c1c642cc6776835fc5934c0f0d89e92347415b21254b06d8b0f05a674cc1c9a5a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HeaderModule-fbd13d5f49cc41d64aa5dcb47acadb92f7c6d6d0cc223bf6625e3ef1e0d7e12c1c642cc6776835fc5934c0f0d89e92347415b21254b06d8b0f05a674cc1c9a5a"' :
                                            'id="xs-components-links-module-HeaderModule-fbd13d5f49cc41d64aa5dcb47acadb92f7c6d6d0cc223bf6625e3ef1e0d7e12c1c642cc6776835fc5934c0f0d89e92347415b21254b06d8b0f05a674cc1c9a5a"' }>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HistoryModule.html" data-type="entity-link" >HistoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HistoryModule-3e13d18ff11e74158efac1d5dd0646fd6ea7b40decf18f12c611fd8c78ca5ce64406e9cf728c35dbd31df82ccef785f5fded2daf042ccfcddc22267fd107757a"' : 'data-bs-target="#xs-components-links-module-HistoryModule-3e13d18ff11e74158efac1d5dd0646fd6ea7b40decf18f12c611fd8c78ca5ce64406e9cf728c35dbd31df82ccef785f5fded2daf042ccfcddc22267fd107757a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HistoryModule-3e13d18ff11e74158efac1d5dd0646fd6ea7b40decf18f12c611fd8c78ca5ce64406e9cf728c35dbd31df82ccef785f5fded2daf042ccfcddc22267fd107757a"' :
                                            'id="xs-components-links-module-HistoryModule-3e13d18ff11e74158efac1d5dd0646fd6ea7b40decf18f12c611fd8c78ca5ce64406e9cf728c35dbd31df82ccef785f5fded2daf042ccfcddc22267fd107757a"' }>
                                            <li class="link">
                                                <a href="components/HistoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HistoryComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HistoryRoutingModule.html" data-type="entity-link" >HistoryRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeCardModule.html" data-type="entity-link" >HomeCardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomeCardModule-f10526fd17d3afccdd81a7ea460c9ea394f8b603f5c24673dc74ea8b8f58ce17869e74e7ebefe401697eef67946edc716263c7f09293989549c6a46dc8922822"' : 'data-bs-target="#xs-components-links-module-HomeCardModule-f10526fd17d3afccdd81a7ea460c9ea394f8b603f5c24673dc74ea8b8f58ce17869e74e7ebefe401697eef67946edc716263c7f09293989549c6a46dc8922822"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeCardModule-f10526fd17d3afccdd81a7ea460c9ea394f8b603f5c24673dc74ea8b8f58ce17869e74e7ebefe401697eef67946edc716263c7f09293989549c6a46dc8922822"' :
                                            'id="xs-components-links-module-HomeCardModule-f10526fd17d3afccdd81a7ea460c9ea394f8b603f5c24673dc74ea8b8f58ce17869e74e7ebefe401697eef67946edc716263c7f09293989549c6a46dc8922822"' }>
                                            <li class="link">
                                                <a href="components/HomeCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeCardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeIllustrationModule.html" data-type="entity-link" >HomeIllustrationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomeIllustrationModule-757940a69ba47de77d62cc9fe46eda0d05e7c96325ed76f8b4854118d877805bf644a5f3b43d1488b8a441adf667bf6e8e286db9947036d4c60cfb2e6e8fe095"' : 'data-bs-target="#xs-components-links-module-HomeIllustrationModule-757940a69ba47de77d62cc9fe46eda0d05e7c96325ed76f8b4854118d877805bf644a5f3b43d1488b8a441adf667bf6e8e286db9947036d4c60cfb2e6e8fe095"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeIllustrationModule-757940a69ba47de77d62cc9fe46eda0d05e7c96325ed76f8b4854118d877805bf644a5f3b43d1488b8a441adf667bf6e8e286db9947036d4c60cfb2e6e8fe095"' :
                                            'id="xs-components-links-module-HomeIllustrationModule-757940a69ba47de77d62cc9fe46eda0d05e7c96325ed76f8b4854118d877805bf644a5f3b43d1488b8a441adf667bf6e8e286db9947036d4c60cfb2e6e8fe095"' }>
                                            <li class="link">
                                                <a href="components/HomeIllustrationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeIllustrationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomeModule-4e51a0b4da94813e46a57d1ea52708e42126d090d9808a7820c800656e6140e4d1905d5136daef0c4108f3cbab62df8cdbacfe11137caa07e6dc708b6754668c"' : 'data-bs-target="#xs-components-links-module-HomeModule-4e51a0b4da94813e46a57d1ea52708e42126d090d9808a7820c800656e6140e4d1905d5136daef0c4108f3cbab62df8cdbacfe11137caa07e6dc708b6754668c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-4e51a0b4da94813e46a57d1ea52708e42126d090d9808a7820c800656e6140e4d1905d5136daef0c4108f3cbab62df8cdbacfe11137caa07e6dc708b6754668c"' :
                                            'id="xs-components-links-module-HomeModule-4e51a0b4da94813e46a57d1ea52708e42126d090d9808a7820c800656e6140e4d1905d5136daef0c4108f3cbab62df8cdbacfe11137caa07e6dc708b6754668c"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomeModule-946d35e6dcf04f5974d3ad0da73a70a82294353abc74b28d74644aa33e1012a53f8a95372da295a8cbf9dec6be644f9a661c70399c38290969ab6ba17de81681-1"' : 'data-bs-target="#xs-components-links-module-HomeModule-946d35e6dcf04f5974d3ad0da73a70a82294353abc74b28d74644aa33e1012a53f8a95372da295a8cbf9dec6be644f9a661c70399c38290969ab6ba17de81681-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-946d35e6dcf04f5974d3ad0da73a70a82294353abc74b28d74644aa33e1012a53f8a95372da295a8cbf9dec6be644f9a661c70399c38290969ab6ba17de81681-1"' :
                                            'id="xs-components-links-module-HomeModule-946d35e6dcf04f5974d3ad0da73a70a82294353abc74b28d74644aa33e1012a53f8a95372da295a8cbf9dec6be644f9a661c70399c38290969ab6ba17de81681-1"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent-1.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomeModule-6e4ae96c14cba4af6eddc71fce90838f4f04588bbe782efec48f6cf8fa794cd70185f0b01610de620cbe28550152b2b4be2586f2e82fe5b1f20f5a9f144d5182-2"' : 'data-bs-target="#xs-components-links-module-HomeModule-6e4ae96c14cba4af6eddc71fce90838f4f04588bbe782efec48f6cf8fa794cd70185f0b01610de620cbe28550152b2b4be2586f2e82fe5b1f20f5a9f144d5182-2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-6e4ae96c14cba4af6eddc71fce90838f4f04588bbe782efec48f6cf8fa794cd70185f0b01610de620cbe28550152b2b4be2586f2e82fe5b1f20f5a9f144d5182-2"' :
                                            'id="xs-components-links-module-HomeModule-6e4ae96c14cba4af6eddc71fce90838f4f04588bbe782efec48f6cf8fa794cd70185f0b01610de620cbe28550152b2b4be2586f2e82fe5b1f20f5a9f144d5182-2"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent-2.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomeModule-cee9119ec1df48b47f26ccf1b5da7078b0c5434aeeddb23ddbc96a5fd23c6daf81c1a901e9e04139d04f4de6fdefda59bde169ff6c7919e6fb5689b72f6fcfb8-3"' : 'data-bs-target="#xs-components-links-module-HomeModule-cee9119ec1df48b47f26ccf1b5da7078b0c5434aeeddb23ddbc96a5fd23c6daf81c1a901e9e04139d04f4de6fdefda59bde169ff6c7919e6fb5689b72f6fcfb8-3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-cee9119ec1df48b47f26ccf1b5da7078b0c5434aeeddb23ddbc96a5fd23c6daf81c1a901e9e04139d04f4de6fdefda59bde169ff6c7919e6fb5689b72f6fcfb8-3"' :
                                            'id="xs-components-links-module-HomeModule-cee9119ec1df48b47f26ccf1b5da7078b0c5434aeeddb23ddbc96a5fd23c6daf81c1a901e9e04139d04f4de6fdefda59bde169ff6c7919e6fb5689b72f6fcfb8-3"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent-3.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link" >HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link" >HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link" >HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link" >HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/IndicatorModalModule.html" data-type="entity-link" >IndicatorModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-IndicatorModalModule-f339fb610c03fe15618ac9802231a7b1e9e2d58075cd892d86e12588217949e9c33aa96d3d8e44aeeee6bb214962b0e2d069f829713d827db53545e87eb23e41"' : 'data-bs-target="#xs-components-links-module-IndicatorModalModule-f339fb610c03fe15618ac9802231a7b1e9e2d58075cd892d86e12588217949e9c33aa96d3d8e44aeeee6bb214962b0e2d069f829713d827db53545e87eb23e41"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-IndicatorModalModule-f339fb610c03fe15618ac9802231a7b1e9e2d58075cd892d86e12588217949e9c33aa96d3d8e44aeeee6bb214962b0e2d069f829713d827db53545e87eb23e41"' :
                                            'id="xs-components-links-module-IndicatorModalModule-f339fb610c03fe15618ac9802231a7b1e9e2d58075cd892d86e12588217949e9c33aa96d3d8e44aeeee6bb214962b0e2d069f829713d827db53545e87eb23e41"' }>
                                            <li class="link">
                                                <a href="components/IndicatorModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IndicatorModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/IndicatorModalModule.html" data-type="entity-link" >IndicatorModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-IndicatorModalModule-aac7b7d24dbe8a5262f73dd6847512a14eef392ce9c3631f35e3a238b255307ca6f10b9d5ad277a4f95f59b579a306b8bc904362baf36ead3b6cc22196f0736e-1"' : 'data-bs-target="#xs-components-links-module-IndicatorModalModule-aac7b7d24dbe8a5262f73dd6847512a14eef392ce9c3631f35e3a238b255307ca6f10b9d5ad277a4f95f59b579a306b8bc904362baf36ead3b6cc22196f0736e-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-IndicatorModalModule-aac7b7d24dbe8a5262f73dd6847512a14eef392ce9c3631f35e3a238b255307ca6f10b9d5ad277a4f95f59b579a306b8bc904362baf36ead3b6cc22196f0736e-1"' :
                                            'id="xs-components-links-module-IndicatorModalModule-aac7b7d24dbe8a5262f73dd6847512a14eef392ce9c3631f35e3a238b255307ca6f10b9d5ad277a4f95f59b579a306b8bc904362baf36ead3b6cc22196f0736e-1"' }>
                                            <li class="link">
                                                <a href="components/IndicatorModalComponent-1.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IndicatorModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/IndicatorModule.html" data-type="entity-link" >IndicatorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-IndicatorModule-3582fc1939379109288f95d82aa0b9dc0d500d0fc48f7931ed7b4de8957d77ce53dfceebaa0e0ff5a749b039131d3bca9a2dfc1c12835da4747a84fcfa33e9b4"' : 'data-bs-target="#xs-components-links-module-IndicatorModule-3582fc1939379109288f95d82aa0b9dc0d500d0fc48f7931ed7b4de8957d77ce53dfceebaa0e0ff5a749b039131d3bca9a2dfc1c12835da4747a84fcfa33e9b4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-IndicatorModule-3582fc1939379109288f95d82aa0b9dc0d500d0fc48f7931ed7b4de8957d77ce53dfceebaa0e0ff5a749b039131d3bca9a2dfc1c12835da4747a84fcfa33e9b4"' :
                                            'id="xs-components-links-module-IndicatorModule-3582fc1939379109288f95d82aa0b9dc0d500d0fc48f7931ed7b4de8957d77ce53dfceebaa0e0ff5a749b039131d3bca9a2dfc1c12835da4747a84fcfa33e9b4"' }>
                                            <li class="link">
                                                <a href="components/IndicatorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IndicatorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/IndicatorModule.html" data-type="entity-link" >IndicatorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-IndicatorModule-29dcbfc05ebe69c1634d7a1a006784d4bad0c9e1fc3d4c70d6110c8b20f6885e78352316fbbea7c5f4b8545f1d08bc62c3032b21c31a5c813e85e91f872ab03e-1"' : 'data-bs-target="#xs-components-links-module-IndicatorModule-29dcbfc05ebe69c1634d7a1a006784d4bad0c9e1fc3d4c70d6110c8b20f6885e78352316fbbea7c5f4b8545f1d08bc62c3032b21c31a5c813e85e91f872ab03e-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-IndicatorModule-29dcbfc05ebe69c1634d7a1a006784d4bad0c9e1fc3d4c70d6110c8b20f6885e78352316fbbea7c5f4b8545f1d08bc62c3032b21c31a5c813e85e91f872ab03e-1"' :
                                            'id="xs-components-links-module-IndicatorModule-29dcbfc05ebe69c1634d7a1a006784d4bad0c9e1fc3d4c70d6110c8b20f6885e78352316fbbea7c5f4b8545f1d08bc62c3032b21c31a5c813e85e91f872ab03e-1"' }>
                                            <li class="link">
                                                <a href="components/IndicatorComponent-1.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IndicatorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/IndicatorsModule.html" data-type="entity-link" >IndicatorsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-IndicatorsModule-5870718297504b0b1240e49472514ab3b8a0f93fabdb70a34ef6e5b77c56b8add89316056eb2ba043e93e53209b878cd48fea4381339bbf7ebbf0d83e7db7f03"' : 'data-bs-target="#xs-components-links-module-IndicatorsModule-5870718297504b0b1240e49472514ab3b8a0f93fabdb70a34ef6e5b77c56b8add89316056eb2ba043e93e53209b878cd48fea4381339bbf7ebbf0d83e7db7f03"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-IndicatorsModule-5870718297504b0b1240e49472514ab3b8a0f93fabdb70a34ef6e5b77c56b8add89316056eb2ba043e93e53209b878cd48fea4381339bbf7ebbf0d83e7db7f03"' :
                                            'id="xs-components-links-module-IndicatorsModule-5870718297504b0b1240e49472514ab3b8a0f93fabdb70a34ef6e5b77c56b8add89316056eb2ba043e93e53209b878cd48fea4381339bbf7ebbf0d83e7db7f03"' }>
                                            <li class="link">
                                                <a href="components/IndicatorReportComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IndicatorReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IndicatorsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IndicatorsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/IndicatorsModule.html" data-type="entity-link" >IndicatorsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-IndicatorsModule-62caa8d2383ca078b4ae08d51dcce677148ef42a90490d8397530e585d8678ecc0f15940b2e215bef050a5483b33f2431bdd166500fe047ac395b06657c5d755-1"' : 'data-bs-target="#xs-components-links-module-IndicatorsModule-62caa8d2383ca078b4ae08d51dcce677148ef42a90490d8397530e585d8678ecc0f15940b2e215bef050a5483b33f2431bdd166500fe047ac395b06657c5d755-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-IndicatorsModule-62caa8d2383ca078b4ae08d51dcce677148ef42a90490d8397530e585d8678ecc0f15940b2e215bef050a5483b33f2431bdd166500fe047ac395b06657c5d755-1"' :
                                            'id="xs-components-links-module-IndicatorsModule-62caa8d2383ca078b4ae08d51dcce677148ef42a90490d8397530e585d8678ecc0f15940b2e215bef050a5483b33f2431bdd166500fe047ac395b06657c5d755-1"' }>
                                            <li class="link">
                                                <a href="components/IndicatorsComponent-1.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IndicatorsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/IndicatorsRoutingModule.html" data-type="entity-link" >IndicatorsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/IndicatorsRoutingModule.html" data-type="entity-link" >IndicatorsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/InformationsPanelModule.html" data-type="entity-link" >InformationsPanelModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-InformationsPanelModule-3a6081c713fa52e925b75af6087f7ca7f9e0a00e279d88ab9c13ddc4e05d56a59bcf88bbfc8c57fd734529b07ddc2ee8573bed8dabd308c00db05ba47d43dd79"' : 'data-bs-target="#xs-components-links-module-InformationsPanelModule-3a6081c713fa52e925b75af6087f7ca7f9e0a00e279d88ab9c13ddc4e05d56a59bcf88bbfc8c57fd734529b07ddc2ee8573bed8dabd308c00db05ba47d43dd79"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InformationsPanelModule-3a6081c713fa52e925b75af6087f7ca7f9e0a00e279d88ab9c13ddc4e05d56a59bcf88bbfc8c57fd734529b07ddc2ee8573bed8dabd308c00db05ba47d43dd79"' :
                                            'id="xs-components-links-module-InformationsPanelModule-3a6081c713fa52e925b75af6087f7ca7f9e0a00e279d88ab9c13ddc4e05d56a59bcf88bbfc8c57fd734529b07ddc2ee8573bed8dabd308c00db05ba47d43dd79"' }>
                                            <li class="link">
                                                <a href="components/InformationsPanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InformationsPanelComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InputModule.html" data-type="entity-link" >InputModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/InputRoutingModule.html" data-type="entity-link" >InputRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/InputsModule.html" data-type="entity-link" >InputsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-InputsModule-9e27c037fec9b4cee60d141dcf9f7f9025030beb0ec092cf55af3c776ffc2331f14fd80aa8f6a603076eb04650ca53bff3949511e7a5005c9e7fd313f0110110"' : 'data-bs-target="#xs-components-links-module-InputsModule-9e27c037fec9b4cee60d141dcf9f7f9025030beb0ec092cf55af3c776ffc2331f14fd80aa8f6a603076eb04650ca53bff3949511e7a5005c9e7fd313f0110110"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InputsModule-9e27c037fec9b4cee60d141dcf9f7f9025030beb0ec092cf55af3c776ffc2331f14fd80aa8f6a603076eb04650ca53bff3949511e7a5005c9e7fd313f0110110"' :
                                            'id="xs-components-links-module-InputsModule-9e27c037fec9b4cee60d141dcf9f7f9025030beb0ec092cf55af3c776ffc2331f14fd80aa8f6a603076eb04650ca53bff3949511e7a5005c9e7fd313f0110110"' }>
                                            <li class="link">
                                                <a href="components/InputsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InputsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InputsRoutingModule.html" data-type="entity-link" >InputsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoadingBarModule.html" data-type="entity-link" >LoadingBarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LoadingBarModule-741fb02f0a50e18427d5e8a3ea298e0799140623861fbd547d8ca4a34de9498c07c94b637dc0f4ca76c4bbe6b00724be6703ce48e84a6fa92427322e1b32058d"' : 'data-bs-target="#xs-components-links-module-LoadingBarModule-741fb02f0a50e18427d5e8a3ea298e0799140623861fbd547d8ca4a34de9498c07c94b637dc0f4ca76c4bbe6b00724be6703ce48e84a6fa92427322e1b32058d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoadingBarModule-741fb02f0a50e18427d5e8a3ea298e0799140623861fbd547d8ca4a34de9498c07c94b637dc0f4ca76c4bbe6b00724be6703ce48e84a6fa92427322e1b32058d"' :
                                            'id="xs-components-links-module-LoadingBarModule-741fb02f0a50e18427d5e8a3ea298e0799140623861fbd547d8ca4a34de9498c07c94b637dc0f4ca76c4bbe6b00724be6703ce48e84a6fa92427322e1b32058d"' }>
                                            <li class="link">
                                                <a href="components/LoadingBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoadingBarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LocalizedDatePipeModule.html" data-type="entity-link" >LocalizedDatePipeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-LocalizedDatePipeModule-bda726ddefcb8a8d1d49b9f48ede49b745d1a27cd7db31cc038f7239a0d5457a7820e1050efff894df581ea8063fdf8b44bb276df64b092a5d7a437721cd4730"' : 'data-bs-target="#xs-pipes-links-module-LocalizedDatePipeModule-bda726ddefcb8a8d1d49b9f48ede49b745d1a27cd7db31cc038f7239a0d5457a7820e1050efff894df581ea8063fdf8b44bb276df64b092a5d7a437721cd4730"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-LocalizedDatePipeModule-bda726ddefcb8a8d1d49b9f48ede49b745d1a27cd7db31cc038f7239a0d5457a7820e1050efff894df581ea8063fdf8b44bb276df64b092a5d7a437721cd4730"' :
                                            'id="xs-pipes-links-module-LocalizedDatePipeModule-bda726ddefcb8a8d1d49b9f48ede49b745d1a27cd7db31cc038f7239a0d5457a7820e1050efff894df581ea8063fdf8b44bb276df64b092a5d7a437721cd4730"' }>
                                            <li class="link">
                                                <a href="pipes/LocalizedDatePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalizedDatePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LogframesDashboardModule.html" data-type="entity-link" >LogframesDashboardModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LogframesDashboardRoutingModule.html" data-type="entity-link" >LogframesDashboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LogicalFrameEditModule.html" data-type="entity-link" >LogicalFrameEditModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LogicalFrameEditModule-776c010f1bf95e0f1a541d7e13328a552e672333e9b50b502e7461c9925607eb11f0c0395995bdfa53f20575791d6e091080249885eea13714a0f95a48a092fe"' : 'data-bs-target="#xs-components-links-module-LogicalFrameEditModule-776c010f1bf95e0f1a541d7e13328a552e672333e9b50b502e7461c9925607eb11f0c0395995bdfa53f20575791d6e091080249885eea13714a0f95a48a092fe"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LogicalFrameEditModule-776c010f1bf95e0f1a541d7e13328a552e672333e9b50b502e7461c9925607eb11f0c0395995bdfa53f20575791d6e091080249885eea13714a0f95a48a092fe"' :
                                            'id="xs-components-links-module-LogicalFrameEditModule-776c010f1bf95e0f1a541d7e13328a552e672333e9b50b502e7461c9925607eb11f0c0395995bdfa53f20575791d6e091080249885eea13714a0f95a48a092fe"' }>
                                            <li class="link">
                                                <a href="components/LogicalFrameEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogicalFrameEditComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LogicalFrameModule.html" data-type="entity-link" >LogicalFrameModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LogicalFrameModule-655de6cb09abeb790485686f0ffbccb293b4ad6c5dfee335b208b65b195614c4732a96be047bf66cd0543344c4c6f59e6e8edc30dda789e43ead4f3757815a0f"' : 'data-bs-target="#xs-components-links-module-LogicalFrameModule-655de6cb09abeb790485686f0ffbccb293b4ad6c5dfee335b208b65b195614c4732a96be047bf66cd0543344c4c6f59e6e8edc30dda789e43ead4f3757815a0f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LogicalFrameModule-655de6cb09abeb790485686f0ffbccb293b4ad6c5dfee335b208b65b195614c4732a96be047bf66cd0543344c4c6f59e6e8edc30dda789e43ead4f3757815a0f"' :
                                            'id="xs-components-links-module-LogicalFrameModule-655de6cb09abeb790485686f0ffbccb293b4ad6c5dfee335b208b65b195614c4732a96be047bf66cd0543344c4c6f59e6e8edc30dda789e43ead4f3757815a0f"' }>
                                            <li class="link">
                                                <a href="components/LogicalFrameComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogicalFrameComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LogicalFramesListModule.html" data-type="entity-link" >LogicalFramesListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LogicalFramesListModule-740d7023cb00ea531e5d7d758bca6c2e7bf2ed5b2bcdf18df29d7d037c41de6b37a36aa35dfa10539d2bc080631463cf3ace35b2232d5fc5a3a227eaf0720858"' : 'data-bs-target="#xs-components-links-module-LogicalFramesListModule-740d7023cb00ea531e5d7d758bca6c2e7bf2ed5b2bcdf18df29d7d037c41de6b37a36aa35dfa10539d2bc080631463cf3ace35b2232d5fc5a3a227eaf0720858"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LogicalFramesListModule-740d7023cb00ea531e5d7d758bca6c2e7bf2ed5b2bcdf18df29d7d037c41de6b37a36aa35dfa10539d2bc080631463cf3ace35b2232d5fc5a3a227eaf0720858"' :
                                            'id="xs-components-links-module-LogicalFramesListModule-740d7023cb00ea531e5d7d758bca6c2e7bf2ed5b2bcdf18df29d7d037c41de6b37a36aa35dfa10539d2bc080631463cf3ace35b2232d5fc5a3a227eaf0720858"' }>
                                            <li class="link">
                                                <a href="components/LogicalFramesListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogicalFramesListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LogicalFramesModule.html" data-type="entity-link" >LogicalFramesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LogicalFramesModule-db56b450df4eb3f9db26b765a02e4b25d7cce3da0cac3440cbc9b41003e24d73605a2f63947445e8f2884f3746631540007cfebb72db8455863fe7bc9465fb90"' : 'data-bs-target="#xs-components-links-module-LogicalFramesModule-db56b450df4eb3f9db26b765a02e4b25d7cce3da0cac3440cbc9b41003e24d73605a2f63947445e8f2884f3746631540007cfebb72db8455863fe7bc9465fb90"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LogicalFramesModule-db56b450df4eb3f9db26b765a02e4b25d7cce3da0cac3440cbc9b41003e24d73605a2f63947445e8f2884f3746631540007cfebb72db8455863fe7bc9465fb90"' :
                                            'id="xs-components-links-module-LogicalFramesModule-db56b450df4eb3f9db26b765a02e4b25d7cce3da0cac3440cbc9b41003e24d73605a2f63947445e8f2884f3746631540007cfebb72db8455863fe7bc9465fb90"' }>
                                            <li class="link">
                                                <a href="components/LogicalFramesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogicalFramesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LogicalFramesRoutingModule.html" data-type="entity-link" >LogicalFramesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link" >LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LoginModule-f98993fce9d15b30163bf6bb12c0410eaf3235db1ec91114456a0db4bad5bf62b3ee4657b6fa3d6a9df9726d2c18e902e35de8bae3c0f54737af30cdb6765b14"' : 'data-bs-target="#xs-components-links-module-LoginModule-f98993fce9d15b30163bf6bb12c0410eaf3235db1ec91114456a0db4bad5bf62b3ee4657b6fa3d6a9df9726d2c18e902e35de8bae3c0f54737af30cdb6765b14"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-f98993fce9d15b30163bf6bb12c0410eaf3235db1ec91114456a0db4bad5bf62b3ee4657b6fa3d6a9df9726d2c18e902e35de8bae3c0f54737af30cdb6765b14"' :
                                            'id="xs-components-links-module-LoginModule-f98993fce9d15b30163bf6bb12c0410eaf3235db1ec91114456a0db4bad5bf62b3ee4657b6fa3d6a9df9726d2c18e902e35de8bae3c0f54737af30cdb6765b14"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginRoutingModule.html" data-type="entity-link" >LoginRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ObjectGroupingModule.html" data-type="entity-link" >ObjectGroupingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ObjectGroupingModule-ef62f764d231c8d6983b1423b5077f1a3fdd226c8bbba2f6bd97e8342dc421ec7aff88712b011d8595cdda3e9d3c0d98abbade8f36479ff7232de39a3084cf5c"' : 'data-bs-target="#xs-components-links-module-ObjectGroupingModule-ef62f764d231c8d6983b1423b5077f1a3fdd226c8bbba2f6bd97e8342dc421ec7aff88712b011d8595cdda3e9d3c0d98abbade8f36479ff7232de39a3084cf5c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ObjectGroupingModule-ef62f764d231c8d6983b1423b5077f1a3fdd226c8bbba2f6bd97e8342dc421ec7aff88712b011d8595cdda3e9d3c0d98abbade8f36479ff7232de39a3084cf5c"' :
                                            'id="xs-components-links-module-ObjectGroupingModule-ef62f764d231c8d6983b1423b5077f1a3fdd226c8bbba2f6bd97e8342dc421ec7aff88712b011d8595cdda3e9d3c0d98abbade8f36479ff7232de39a3084cf5c"' }>
                                            <li class="link">
                                                <a href="components/ConfirmExportComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmExportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ObjectGroupingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ObjectGroupingComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OutputEditModule.html" data-type="entity-link" >OutputEditModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-OutputEditModule-08f1cba1483ed96231fbf6113607e72aea8a3f705993f1c63077fb0e9032e294a037c6d7b3933a4bcfa1f6d4aefa0593e5ae21c5931be9b4acacadab909321af"' : 'data-bs-target="#xs-components-links-module-OutputEditModule-08f1cba1483ed96231fbf6113607e72aea8a3f705993f1c63077fb0e9032e294a037c6d7b3933a4bcfa1f6d4aefa0593e5ae21c5931be9b4acacadab909321af"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OutputEditModule-08f1cba1483ed96231fbf6113607e72aea8a3f705993f1c63077fb0e9032e294a037c6d7b3933a4bcfa1f6d4aefa0593e5ae21c5931be9b4acacadab909321af"' :
                                            'id="xs-components-links-module-OutputEditModule-08f1cba1483ed96231fbf6113607e72aea8a3f705993f1c63077fb0e9032e294a037c6d7b3933a4bcfa1f6d4aefa0593e5ae21c5931be9b4acacadab909321af"' }>
                                            <li class="link">
                                                <a href="components/OutputEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OutputEditComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ParametersModule.html" data-type="entity-link" >ParametersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ParametersModule-7c95d36fb60a034c4d34a6a6f1fb36387e37d1b4d10cf3926de961acc36d0b9fe9cbc5303afaa44632d588febfdb6fc809c228d95527f3dc539806eb0d180198"' : 'data-bs-target="#xs-components-links-module-ParametersModule-7c95d36fb60a034c4d34a6a6f1fb36387e37d1b4d10cf3926de961acc36d0b9fe9cbc5303afaa44632d588febfdb6fc809c228d95527f3dc539806eb0d180198"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ParametersModule-7c95d36fb60a034c4d34a6a6f1fb36387e37d1b4d10cf3926de961acc36d0b9fe9cbc5303afaa44632d588febfdb6fc809c228d95527f3dc539806eb0d180198"' :
                                            'id="xs-components-links-module-ParametersModule-7c95d36fb60a034c4d34a6a6f1fb36387e37d1b4d10cf3926de961acc36d0b9fe9cbc5303afaa44632d588febfdb6fc809c228d95527f3dc539806eb0d180198"' }>
                                            <li class="link">
                                                <a href="components/ParametersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParametersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ParametersRoutingModule.html" data-type="entity-link" >ParametersRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PartitionModalModule.html" data-type="entity-link" >PartitionModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PartitionModalModule-9f2951afc308ec4f0a7c4a9dde8d9f5d1f8533c4fa9b574533d224fcedd3b1eea13b80390006aa2153c18a70d75c0e46799f0348beb4c37744d34706b0d8769c"' : 'data-bs-target="#xs-components-links-module-PartitionModalModule-9f2951afc308ec4f0a7c4a9dde8d9f5d1f8533c4fa9b574533d224fcedd3b1eea13b80390006aa2153c18a70d75c0e46799f0348beb4c37744d34706b0d8769c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PartitionModalModule-9f2951afc308ec4f0a7c4a9dde8d9f5d1f8533c4fa9b574533d224fcedd3b1eea13b80390006aa2153c18a70d75c0e46799f0348beb4c37744d34706b0d8769c"' :
                                            'id="xs-components-links-module-PartitionModalModule-9f2951afc308ec4f0a7c4a9dde8d9f5d1f8533c4fa9b574533d224fcedd3b1eea13b80390006aa2153c18a70d75c0e46799f0348beb4c37744d34706b0d8769c"' }>
                                            <li class="link">
                                                <a href="components/PartitionModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PartitionModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PersonalDashboardModule.html" data-type="entity-link" >PersonalDashboardModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PersonalDashboardRoutingModule.html" data-type="entity-link" >PersonalDashboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProgressBarModule.html" data-type="entity-link" >ProgressBarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProgressBarModule-605b046f881055e8325a4e40faf0b5d127d961decfd3ceeae2b4e8a32d426c693bde5b4fa8cbb16d3f36b9ec1c342acaee4a9b6505f3a4fb0d5b95a1785de003"' : 'data-bs-target="#xs-components-links-module-ProgressBarModule-605b046f881055e8325a4e40faf0b5d127d961decfd3ceeae2b4e8a32d426c693bde5b4fa8cbb16d3f36b9ec1c342acaee4a9b6505f3a4fb0d5b95a1785de003"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProgressBarModule-605b046f881055e8325a4e40faf0b5d127d961decfd3ceeae2b4e8a32d426c693bde5b4fa8cbb16d3f36b9ec1c342acaee4a9b6505f3a4fb0d5b95a1785de003"' :
                                            'id="xs-components-links-module-ProgressBarModule-605b046f881055e8325a4e40faf0b5d127d961decfd3ceeae2b4e8a32d426c693bde5b4fa8cbb16d3f36b9ec1c342acaee4a9b6505f3a4fb0d5b95a1785de003"' }>
                                            <li class="link">
                                                <a href="components/ProgressBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProgressBarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProgressBarTripleModule.html" data-type="entity-link" >ProgressBarTripleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProgressBarTripleModule-2c44d31f5d1bd5667e40d2a3e0a80ce1667da32810801ab6c09db2314ddc34e66f702a60642202d18d4fa1e46e23803609f2fcc37d3ed7eb14ccba6d971a6569"' : 'data-bs-target="#xs-components-links-module-ProgressBarTripleModule-2c44d31f5d1bd5667e40d2a3e0a80ce1667da32810801ab6c09db2314ddc34e66f702a60642202d18d4fa1e46e23803609f2fcc37d3ed7eb14ccba6d971a6569"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProgressBarTripleModule-2c44d31f5d1bd5667e40d2a3e0a80ce1667da32810801ab6c09db2314ddc34e66f702a60642202d18d4fa1e46e23803609f2fcc37d3ed7eb14ccba6d971a6569"' :
                                            'id="xs-components-links-module-ProgressBarTripleModule-2c44d31f5d1bd5667e40d2a3e0a80ce1667da32810801ab6c09db2314ddc34e66f702a60642202d18d4fa1e46e23803609f2fcc37d3ed7eb14ccba6d971a6569"' }>
                                            <li class="link">
                                                <a href="components/ProgressBarTripleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProgressBarTripleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProjectModule.html" data-type="entity-link" >ProjectModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProjectModule-90b77186c0cb4d1e2fc978d3f17ecd4d84f1899507200c31de320609b2a680efede6c4e7aa211ea59aa97f62c331f0921b5e976d192601987a74dba55d287771"' : 'data-bs-target="#xs-components-links-module-ProjectModule-90b77186c0cb4d1e2fc978d3f17ecd4d84f1899507200c31de320609b2a680efede6c4e7aa211ea59aa97f62c331f0921b5e976d192601987a74dba55d287771"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProjectModule-90b77186c0cb4d1e2fc978d3f17ecd4d84f1899507200c31de320609b2a680efede6c4e7aa211ea59aa97f62c331f0921b5e976d192601987a74dba55d287771"' :
                                            'id="xs-components-links-module-ProjectModule-90b77186c0cb4d1e2fc978d3f17ecd4d84f1899507200c31de320609b2a680efede6c4e7aa211ea59aa97f62c331f0921b5e976d192601987a74dba55d287771"' }>
                                            <li class="link">
                                                <a href="components/ProjectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProjectModule.html" data-type="entity-link" >ProjectModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProjectModule-c98e2f5f37785decaafa752eefda3328ab48a6779040ac9c8dd6bea20c8291e0840a89c915cbd7c19f82fdc86a355ef6d31490c86e77fff2d472ca5ac1e86b18-1"' : 'data-bs-target="#xs-components-links-module-ProjectModule-c98e2f5f37785decaafa752eefda3328ab48a6779040ac9c8dd6bea20c8291e0840a89c915cbd7c19f82fdc86a355ef6d31490c86e77fff2d472ca5ac1e86b18-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProjectModule-c98e2f5f37785decaafa752eefda3328ab48a6779040ac9c8dd6bea20c8291e0840a89c915cbd7c19f82fdc86a355ef6d31490c86e77fff2d472ca5ac1e86b18-1"' :
                                            'id="xs-components-links-module-ProjectModule-c98e2f5f37785decaafa752eefda3328ab48a6779040ac9c8dd6bea20c8291e0840a89c915cbd7c19f82fdc86a355ef6d31490c86e77fff2d472ca5ac1e86b18-1"' }>
                                            <li class="link">
                                                <a href="components/ProjectComponent-1.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProjectRoutingModule.html" data-type="entity-link" >ProjectRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProjectSaveModule.html" data-type="entity-link" >ProjectSaveModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProjectSaveModule-2113576305fc2757ee9b672d46b93c644377a4b9b181ad3dffc807ddb6d9a76706bc36b9b78395f2db7eb20ca5c26bb26af86d89aa77c4f13288e9a530c098c8"' : 'data-bs-target="#xs-components-links-module-ProjectSaveModule-2113576305fc2757ee9b672d46b93c644377a4b9b181ad3dffc807ddb6d9a76706bc36b9b78395f2db7eb20ca5c26bb26af86d89aa77c4f13288e9a530c098c8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProjectSaveModule-2113576305fc2757ee9b672d46b93c644377a4b9b181ad3dffc807ddb6d9a76706bc36b9b78395f2db7eb20ca5c26bb26af86d89aa77c4f13288e9a530c098c8"' :
                                            'id="xs-components-links-module-ProjectSaveModule-2113576305fc2757ee9b672d46b93c644377a4b9b181ad3dffc807ddb6d9a76706bc36b9b78395f2db7eb20ca5c26bb26af86d89aa77c4f13288e9a530c098c8"' }>
                                            <li class="link">
                                                <a href="components/ProjectSaveComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectSaveComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProjectsModule.html" data-type="entity-link" >ProjectsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProjectsModule-22244a41b6d1613dc5164ad67ba3b386e6d72cf2aae2f40ba02333d9a08b6b3c808f020b484694a209e34cccadb838914c84bfd0ce272f199c8f00d8892627f8"' : 'data-bs-target="#xs-components-links-module-ProjectsModule-22244a41b6d1613dc5164ad67ba3b386e6d72cf2aae2f40ba02333d9a08b6b3c808f020b484694a209e34cccadb838914c84bfd0ce272f199c8f00d8892627f8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProjectsModule-22244a41b6d1613dc5164ad67ba3b386e6d72cf2aae2f40ba02333d9a08b6b3c808f020b484694a209e34cccadb838914c84bfd0ce272f199c8f00d8892627f8"' :
                                            'id="xs-components-links-module-ProjectsModule-22244a41b6d1613dc5164ad67ba3b386e6d72cf2aae2f40ba02333d9a08b6b3c808f020b484694a209e34cccadb838914c84bfd0ce272f199c8f00d8892627f8"' }>
                                            <li class="link">
                                                <a href="components/ProjectsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProjectsRoutingModule.html" data-type="entity-link" >ProjectsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PurposeEditModule.html" data-type="entity-link" >PurposeEditModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PurposeEditModule-e74e84555f291f810f2ad790b6f60f3e90686df1dd4023ef73497f67f4830d6f58b2596d86ba34bde8019de3ece54248a03c90f2c88606dd12d68155138d63c4"' : 'data-bs-target="#xs-components-links-module-PurposeEditModule-e74e84555f291f810f2ad790b6f60f3e90686df1dd4023ef73497f67f4830d6f58b2596d86ba34bde8019de3ece54248a03c90f2c88606dd12d68155138d63c4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PurposeEditModule-e74e84555f291f810f2ad790b6f60f3e90686df1dd4023ef73497f67f4830d6f58b2596d86ba34bde8019de3ece54248a03c90f2c88606dd12d68155138d63c4"' :
                                            'id="xs-components-links-module-PurposeEditModule-e74e84555f291f810f2ad790b6f60f3e90686df1dd4023ef73497f67f4830d6f58b2596d86ba34bde8019de3ece54248a03c90f2c88606dd12d68155138d63c4"' }>
                                            <li class="link">
                                                <a href="components/PurposeEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PurposeEditComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RefreshSnackbarModule.html" data-type="entity-link" >RefreshSnackbarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RefreshSnackbarModule-b75eac04653c310a40eed49768ed02c77edd04745d143fa052f66f2d2d6470313b0f9555a13e3feb3cb62413139c27a6eff7442c262dd6a746053cb613ca5c97"' : 'data-bs-target="#xs-components-links-module-RefreshSnackbarModule-b75eac04653c310a40eed49768ed02c77edd04745d143fa052f66f2d2d6470313b0f9555a13e3feb3cb62413139c27a6eff7442c262dd6a746053cb613ca5c97"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RefreshSnackbarModule-b75eac04653c310a40eed49768ed02c77edd04745d143fa052f66f2d2d6470313b0f9555a13e3feb3cb62413139c27a6eff7442c262dd6a746053cb613ca5c97"' :
                                            'id="xs-components-links-module-RefreshSnackbarModule-b75eac04653c310a40eed49768ed02c77edd04745d143fa052f66f2d2d6470313b0f9555a13e3feb3cb62413139c27a6eff7442c262dd6a746053cb613ca5c97"' }>
                                            <li class="link">
                                                <a href="components/RefreshSnackbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RefreshSnackbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReportingMenuModule.html" data-type="entity-link" >ReportingMenuModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ReportingMenuModule-c7a8d41a3568a65cb5f39fe5393ef55aa0f6a808f9e2d2ed6c06dd0724a7dde931dde0fbbd88bdf3ec3cb5b6934ab3d695a3a3a2e13bf64b933eaa646e6cf270"' : 'data-bs-target="#xs-components-links-module-ReportingMenuModule-c7a8d41a3568a65cb5f39fe5393ef55aa0f6a808f9e2d2ed6c06dd0724a7dde931dde0fbbd88bdf3ec3cb5b6934ab3d695a3a3a2e13bf64b933eaa646e6cf270"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ReportingMenuModule-c7a8d41a3568a65cb5f39fe5393ef55aa0f6a808f9e2d2ed6c06dd0724a7dde931dde0fbbd88bdf3ec3cb5b6934ab3d695a3a3a2e13bf64b933eaa646e6cf270"' :
                                            'id="xs-components-links-module-ReportingMenuModule-c7a8d41a3568a65cb5f39fe5393ef55aa0f6a808f9e2d2ed6c06dd0724a7dde931dde0fbbd88bdf3ec3cb5b6934ab3d695a3a3a2e13bf64b933eaa646e6cf270"' }>
                                            <li class="link">
                                                <a href="components/ReportingMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportingMenuComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReportingModule.html" data-type="entity-link" >ReportingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ReportingModule-18f6df5e94108bb93cbe98aecfd65f19a263e9280c132a506c6e1b95e00bfe66bb1ea1e14cc8bad62532a4b8c0511c9e7eafbf52647a3991a247bbfe6805191d"' : 'data-bs-target="#xs-components-links-module-ReportingModule-18f6df5e94108bb93cbe98aecfd65f19a263e9280c132a506c6e1b95e00bfe66bb1ea1e14cc8bad62532a4b8c0511c9e7eafbf52647a3991a247bbfe6805191d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ReportingModule-18f6df5e94108bb93cbe98aecfd65f19a263e9280c132a506c6e1b95e00bfe66bb1ea1e14cc8bad62532a4b8c0511c9e7eafbf52647a3991a247bbfe6805191d"' :
                                            'id="xs-components-links-module-ReportingModule-18f6df5e94108bb93cbe98aecfd65f19a263e9280c132a506c6e1b95e00bfe66bb1ea1e14cc8bad62532a4b8c0511c9e7eafbf52647a3991a247bbfe6805191d"' }>
                                            <li class="link">
                                                <a href="components/PersonalDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersonalDashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReportingRoutingModule.html" data-type="entity-link" >ReportingRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ReportingTableModule.html" data-type="entity-link" >ReportingTableModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ReportingTableModule-87d68c5b21b2cb0436fc25efeeb09b1937c02868380a584988f98cc5e55585caadba4013b969242245083543146b22b15691f2eabd3876ea8cbd43f4906f3ae5"' : 'data-bs-target="#xs-components-links-module-ReportingTableModule-87d68c5b21b2cb0436fc25efeeb09b1937c02868380a584988f98cc5e55585caadba4013b969242245083543146b22b15691f2eabd3876ea8cbd43f4906f3ae5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ReportingTableModule-87d68c5b21b2cb0436fc25efeeb09b1937c02868380a584988f98cc5e55585caadba4013b969242245083543146b22b15691f2eabd3876ea8cbd43f4906f3ae5"' :
                                            'id="xs-components-links-module-ReportingTableModule-87d68c5b21b2cb0436fc25efeeb09b1937c02868380a584988f98cc5e55585caadba4013b969242245083543146b22b15691f2eabd3876ea8cbd43f4906f3ae5"' }>
                                            <li class="link">
                                                <a href="components/ReportingTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportingTableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReportTableColorPipeModule.html" data-type="entity-link" >ReportTableColorPipeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-ReportTableColorPipeModule-db467f1f80cb0e1d36956b224c1f872e3c347ca3f37dd77d554c385a1e26826f1248404e9665ec72bd047c2322825472af5e4993f36852110999c8b8242493ef"' : 'data-bs-target="#xs-pipes-links-module-ReportTableColorPipeModule-db467f1f80cb0e1d36956b224c1f872e3c347ca3f37dd77d554c385a1e26826f1248404e9665ec72bd047c2322825472af5e4993f36852110999c8b8242493ef"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-ReportTableColorPipeModule-db467f1f80cb0e1d36956b224c1f872e3c347ca3f37dd77d554c385a1e26826f1248404e9665ec72bd047c2322825472af5e4993f36852110999c8b8242493ef"' :
                                            'id="xs-pipes-links-module-ReportTableColorPipeModule-db467f1f80cb0e1d36956b224c1f872e3c347ca3f37dd77d554c385a1e26826f1248404e9665ec72bd047c2322825472af5e4993f36852110999c8b8242493ef"' }>
                                            <li class="link">
                                                <a href="pipes/ReportTableColorPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportTableColorPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReportTablePaddingPipeModule.html" data-type="entity-link" >ReportTablePaddingPipeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-ReportTablePaddingPipeModule-1051f44ab2aced2e0439e85be70e9b97543bf48750d5cbc5577f9a82b34c2108b319e86853b5d11fa52b12a94908c3082b25bc094c7162252bd4aa520aab6550"' : 'data-bs-target="#xs-pipes-links-module-ReportTablePaddingPipeModule-1051f44ab2aced2e0439e85be70e9b97543bf48750d5cbc5577f9a82b34c2108b319e86853b5d11fa52b12a94908c3082b25bc094c7162252bd4aa520aab6550"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-ReportTablePaddingPipeModule-1051f44ab2aced2e0439e85be70e9b97543bf48750d5cbc5577f9a82b34c2108b319e86853b5d11fa52b12a94908c3082b25bc094c7162252bd4aa520aab6550"' :
                                            'id="xs-pipes-links-module-ReportTablePaddingPipeModule-1051f44ab2aced2e0439e85be70e9b97543bf48750d5cbc5577f9a82b34c2108b319e86853b5d11fa52b12a94908c3082b25bc094c7162252bd4aa520aab6550"' }>
                                            <li class="link">
                                                <a href="pipes/ReportTablePaddingPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportTablePaddingPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReportTableTooltipPipeModule.html" data-type="entity-link" >ReportTableTooltipPipeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-ReportTableTooltipPipeModule-d84f619e01f0ad85340a865b7a86ef0b3f771f68a3391b76b72f1c0c904470229fee761ebc634678a55e8a5ab4542d61e9a080e43d8ffb3a2d046e693f1a688c"' : 'data-bs-target="#xs-pipes-links-module-ReportTableTooltipPipeModule-d84f619e01f0ad85340a865b7a86ef0b3f771f68a3391b76b72f1c0c904470229fee761ebc634678a55e8a5ab4542d61e9a080e43d8ffb3a2d046e693f1a688c"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-ReportTableTooltipPipeModule-d84f619e01f0ad85340a865b7a86ef0b3f771f68a3391b76b72f1c0c904470229fee761ebc634678a55e8a5ab4542d61e9a080e43d8ffb3a2d046e693f1a688c"' :
                                            'id="xs-pipes-links-module-ReportTableTooltipPipeModule-d84f619e01f0ad85340a865b7a86ef0b3f771f68a3391b76b72f1c0c904470229fee761ebc634678a55e8a5ab4542d61e9a080e43d8ffb3a2d046e693f1a688c"' }>
                                            <li class="link">
                                                <a href="pipes/ReportTableTooltipPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportTableTooltipPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RevisionSummaryModule.html" data-type="entity-link" >RevisionSummaryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RevisionSummaryModule-52d5761d1432ee3418f4d154d2d276f2b127d9de073212fc54f249d972a365b72364a9f9169e90a98d14c211fa0b96aa1bd3be2f04c75f60f7ce60106ff466f8"' : 'data-bs-target="#xs-components-links-module-RevisionSummaryModule-52d5761d1432ee3418f4d154d2d276f2b127d9de073212fc54f249d972a365b72364a9f9169e90a98d14c211fa0b96aa1bd3be2f04c75f60f7ce60106ff466f8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RevisionSummaryModule-52d5761d1432ee3418f4d154d2d276f2b127d9de073212fc54f249d972a365b72364a9f9169e90a98d14c211fa0b96aa1bd3be2f04c75f60f7ce60106ff466f8"' :
                                            'id="xs-components-links-module-RevisionSummaryModule-52d5761d1432ee3418f4d154d2d276f2b127d9de073212fc54f249d972a365b72364a9f9169e90a98d14c211fa0b96aa1bd3be2f04c75f60f7ce60106ff466f8"' }>
                                            <li class="link">
                                                <a href="components/RevisionSummaryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RevisionSummaryComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SearchbarModule.html" data-type="entity-link" >SearchbarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SearchbarModule-ca202578126269340fd10d3976e2b4b7755a57cfad513b40860f19d54b062806edd00a0785de4abe6c511de74b6d05522f585da85978532909ff42eaa72cebd6"' : 'data-bs-target="#xs-components-links-module-SearchbarModule-ca202578126269340fd10d3976e2b4b7755a57cfad513b40860f19d54b062806edd00a0785de4abe6c511de74b6d05522f585da85978532909ff42eaa72cebd6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SearchbarModule-ca202578126269340fd10d3976e2b4b7755a57cfad513b40860f19d54b062806edd00a0785de4abe6c511de74b6d05522f585da85978532909ff42eaa72cebd6"' :
                                            'id="xs-components-links-module-SearchbarModule-ca202578126269340fd10d3976e2b4b7755a57cfad513b40860f19d54b062806edd00a0785de4abe6c511de74b6d05522f585da85978532909ff42eaa72cebd6"' }>
                                            <li class="link">
                                                <a href="components/SearchbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SidenavModule.html" data-type="entity-link" >SidenavModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SidenavModule-6b6b3b2c2417745fca681575802b08c18bee140deb2a42738b0382c3f3d992114f5500a0a0b3afb80faa8069db170b937e804622ac95627bf10de5f3260cee90"' : 'data-bs-target="#xs-components-links-module-SidenavModule-6b6b3b2c2417745fca681575802b08c18bee140deb2a42738b0382c3f3d992114f5500a0a0b3afb80faa8069db170b937e804622ac95627bf10de5f3260cee90"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SidenavModule-6b6b3b2c2417745fca681575802b08c18bee140deb2a42738b0382c3f3d992114f5500a0a0b3afb80faa8069db170b937e804622ac95627bf10de5f3260cee90"' :
                                            'id="xs-components-links-module-SidenavModule-6b6b3b2c2417745fca681575802b08c18bee140deb2a42738b0382c3f3d992114f5500a0a0b3afb80faa8069db170b937e804622ac95627bf10de5f3260cee90"' }>
                                            <li class="link">
                                                <a href="components/SidenavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidenavComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SitesModule.html" data-type="entity-link" >SitesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SitesModule-90142f62497677c020430321d21f636c93549e278a90b51755a02a15cca204c91c31ba0e6d0d9b0d4ac0babc9677877b828c82f2cb613b64f332b4627506705d"' : 'data-bs-target="#xs-components-links-module-SitesModule-90142f62497677c020430321d21f636c93549e278a90b51755a02a15cca204c91c31ba0e6d0d9b0d4ac0babc9677877b828c82f2cb613b64f332b4627506705d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SitesModule-90142f62497677c020430321d21f636c93549e278a90b51755a02a15cca204c91c31ba0e6d0d9b0d4ac0babc9677877b828c82f2cb613b64f332b4627506705d"' :
                                            'id="xs-components-links-module-SitesModule-90142f62497677c020430321d21f636c93549e278a90b51755a02a15cca204c91c31ba0e6d0d9b0d4ac0babc9677877b828c82f2cb613b64f332b4627506705d"' }>
                                            <li class="link">
                                                <a href="components/SitesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SitesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SitesRoutingModule.html" data-type="entity-link" >SitesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StructureModule.html" data-type="entity-link" >StructureModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-StructureModule-db7448a12e76958bd5260314de2217501ad49414ee2a73b92179e938800e8aa204861303546a7e4e6981a5980a7d292032ab09dcb08f86d18fd66e4ef062b8d0"' : 'data-bs-target="#xs-components-links-module-StructureModule-db7448a12e76958bd5260314de2217501ad49414ee2a73b92179e938800e8aa204861303546a7e4e6981a5980a7d292032ab09dcb08f86d18fd66e4ef062b8d0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StructureModule-db7448a12e76958bd5260314de2217501ad49414ee2a73b92179e938800e8aa204861303546a7e4e6981a5980a7d292032ab09dcb08f86d18fd66e4ef062b8d0"' :
                                            'id="xs-components-links-module-StructureModule-db7448a12e76958bd5260314de2217501ad49414ee2a73b92179e938800e8aa204861303546a7e4e6981a5980a7d292032ab09dcb08f86d18fd66e4ef062b8d0"' }>
                                            <li class="link">
                                                <a href="components/StructureComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StructureComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StructureRoutingModule.html" data-type="entity-link" >StructureRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TableStructureModule.html" data-type="entity-link" >TableStructureModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TableStructureModule-7fd6c32fde012c44a566485c77ded82c1a2e5e224809161d350ffe1e9510659a24e236294d869591a58fdb6d2138f6b62bef87ee043e288b10e574eaaeca139c"' : 'data-bs-target="#xs-components-links-module-TableStructureModule-7fd6c32fde012c44a566485c77ded82c1a2e5e224809161d350ffe1e9510659a24e236294d869591a58fdb6d2138f6b62bef87ee043e288b10e574eaaeca139c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TableStructureModule-7fd6c32fde012c44a566485c77ded82c1a2e5e224809161d350ffe1e9510659a24e236294d869591a58fdb6d2138f6b62bef87ee043e288b10e574eaaeca139c"' :
                                            'id="xs-components-links-module-TableStructureModule-7fd6c32fde012c44a566485c77ded82c1a2e5e224809161d350ffe1e9510659a24e236294d869591a58fdb6d2138f6b62bef87ee043e288b10e574eaaeca139c"' }>
                                            <li class="link">
                                                <a href="components/TableStructureComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableStructureComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ThematicsModule.html" data-type="entity-link" >ThematicsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ThematicsModule-703e2177ef9205e22aa85db38dab19ad8c9963b1671acf021e154983835c3538b2f3838e81caddd2d018e2a43726db92063f46c16e49e06f6ba643d1ba948f23"' : 'data-bs-target="#xs-components-links-module-ThematicsModule-703e2177ef9205e22aa85db38dab19ad8c9963b1671acf021e154983835c3538b2f3838e81caddd2d018e2a43726db92063f46c16e49e06f6ba643d1ba948f23"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ThematicsModule-703e2177ef9205e22aa85db38dab19ad8c9963b1671acf021e154983835c3538b2f3838e81caddd2d018e2a43726db92063f46c16e49e06f6ba643d1ba948f23"' :
                                            'id="xs-components-links-module-ThematicsModule-703e2177ef9205e22aa85db38dab19ad8c9963b1671acf021e154983835c3538b2f3838e81caddd2d018e2a43726db92063f46c16e49e06f6ba643d1ba948f23"' }>
                                            <li class="link">
                                                <a href="components/ThematicsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ThematicsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ThematicsRoutingModule.html" data-type="entity-link" >ThematicsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ThemeModalModule.html" data-type="entity-link" >ThemeModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ThemeModalModule-b0fd86ce982bf8b0a23788e95e4cb011a52a7479b11cd1407fff23fb592005ef916c1365122a876406890ac783ba53508bf7d2232560b349163a49897ca98a31"' : 'data-bs-target="#xs-components-links-module-ThemeModalModule-b0fd86ce982bf8b0a23788e95e4cb011a52a7479b11cd1407fff23fb592005ef916c1365122a876406890ac783ba53508bf7d2232560b349163a49897ca98a31"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ThemeModalModule-b0fd86ce982bf8b0a23788e95e4cb011a52a7479b11cd1407fff23fb592005ef916c1365122a876406890ac783ba53508bf7d2232560b349163a49897ca98a31"' :
                                            'id="xs-components-links-module-ThemeModalModule-b0fd86ce982bf8b0a23788e95e4cb011a52a7479b11cd1407fff23fb592005ef916c1365122a876406890ac783ba53508bf7d2232560b349163a49897ca98a31"' }>
                                            <li class="link">
                                                <a href="components/ThemeModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ThemeModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ThemeModule.html" data-type="entity-link" >ThemeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ThemeModule-39bb0bdd7845b58d00d9099379c413384d82a056be98ca9eb392c854bca6e782911d5dc8dbb24a0e278c6f35932ab6026f34d5a796f36379bd188fd07fa8b852"' : 'data-bs-target="#xs-components-links-module-ThemeModule-39bb0bdd7845b58d00d9099379c413384d82a056be98ca9eb392c854bca6e782911d5dc8dbb24a0e278c6f35932ab6026f34d5a796f36379bd188fd07fa8b852"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ThemeModule-39bb0bdd7845b58d00d9099379c413384d82a056be98ca9eb392c854bca6e782911d5dc8dbb24a0e278c6f35932ab6026f34d5a796f36379bd188fd07fa8b852"' :
                                            'id="xs-components-links-module-ThemeModule-39bb0bdd7845b58d00d9099379c413384d82a056be98ca9eb392c854bca6e782911d5dc8dbb24a0e278c6f35932ab6026f34d5a796f36379bd188fd07fa8b852"' }>
                                            <li class="link">
                                                <a href="components/ThemeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ThemeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserFiltersModule.html" data-type="entity-link" >UserFiltersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UserFiltersModule-cee969d8697999363d8824668067132e43a109dd9bc146d53ad30c99e6b02c7cf6bfbaa671350e94592337cd223192922b5eca8024744281ec528c278424a10b"' : 'data-bs-target="#xs-components-links-module-UserFiltersModule-cee969d8697999363d8824668067132e43a109dd9bc146d53ad30c99e6b02c7cf6bfbaa671350e94592337cd223192922b5eca8024744281ec528c278424a10b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserFiltersModule-cee969d8697999363d8824668067132e43a109dd9bc146d53ad30c99e6b02c7cf6bfbaa671350e94592337cd223192922b5eca8024744281ec528c278424a10b"' :
                                            'id="xs-components-links-module-UserFiltersModule-cee969d8697999363d8824668067132e43a109dd9bc146d53ad30c99e6b02c7cf6bfbaa671350e94592337cd223192922b5eca8024744281ec528c278424a10b"' }>
                                            <li class="link">
                                                <a href="components/UserFiltersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserFiltersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModalModule.html" data-type="entity-link" >UserModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UserModalModule-920e888d9498fa7764d62ec5880b6be953adfa9d7143709491c62d9320d31ab01edbdac0f65a69d672cda2412878a9c59f097b550791a51da4d095a4c5903eff"' : 'data-bs-target="#xs-components-links-module-UserModalModule-920e888d9498fa7764d62ec5880b6be953adfa9d7143709491c62d9320d31ab01edbdac0f65a69d672cda2412878a9c59f097b550791a51da4d095a4c5903eff"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserModalModule-920e888d9498fa7764d62ec5880b6be953adfa9d7143709491c62d9320d31ab01edbdac0f65a69d672cda2412878a9c59f097b550791a51da4d095a4c5903eff"' :
                                            'id="xs-components-links-module-UserModalModule-920e888d9498fa7764d62ec5880b6be953adfa9d7143709491c62d9320d31ab01edbdac0f65a69d672cda2412878a9c59f097b550791a51da4d095a4c5903eff"' }>
                                            <li class="link">
                                                <a href="components/UserModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModalModule.html" data-type="entity-link" >UserModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UserModalModule-93c0968894380e1ae06ba1c2b8da539f61670fca8844b94f565ddfe340207d268798659f2fcdd1dac50552061d6416682c433be3b795922e34de1429c2418079-1"' : 'data-bs-target="#xs-components-links-module-UserModalModule-93c0968894380e1ae06ba1c2b8da539f61670fca8844b94f565ddfe340207d268798659f2fcdd1dac50552061d6416682c433be3b795922e34de1429c2418079-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserModalModule-93c0968894380e1ae06ba1c2b8da539f61670fca8844b94f565ddfe340207d268798659f2fcdd1dac50552061d6416682c433be3b795922e34de1429c2418079-1"' :
                                            'id="xs-components-links-module-UserModalModule-93c0968894380e1ae06ba1c2b8da539f61670fca8844b94f565ddfe340207d268798659f2fcdd1dac50552061d6416682c433be3b795922e34de1429c2418079-1"' }>
                                            <li class="link">
                                                <a href="components/UserModalComponent-1.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UserModule-0cb28c2adfb3ecfbd5234a70c5c620149fa101b77814e5261f92ace56e0ef24c0a970268ac066fc6a7a8942209640bf426a37a0073e5a978609834bd83230ba4"' : 'data-bs-target="#xs-components-links-module-UserModule-0cb28c2adfb3ecfbd5234a70c5c620149fa101b77814e5261f92ace56e0ef24c0a970268ac066fc6a7a8942209640bf426a37a0073e5a978609834bd83230ba4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserModule-0cb28c2adfb3ecfbd5234a70c5c620149fa101b77814e5261f92ace56e0ef24c0a970268ac066fc6a7a8942209640bf426a37a0073e5a978609834bd83230ba4"' :
                                            'id="xs-components-links-module-UserModule-0cb28c2adfb3ecfbd5234a70c5c620149fa101b77814e5261f92ace56e0ef24c0a970268ac066fc6a7a8942209640bf426a37a0073e5a978609834bd83230ba4"' }>
                                            <li class="link">
                                                <a href="components/UserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UserModule-be33e1b3b8d448590742634c6829d509f062da4626615089c2339a9dd2859b363e438f16d728572f0a7f024890b5282c058007f678562f54191cad3f8df84e5f-1"' : 'data-bs-target="#xs-components-links-module-UserModule-be33e1b3b8d448590742634c6829d509f062da4626615089c2339a9dd2859b363e438f16d728572f0a7f024890b5282c058007f678562f54191cad3f8df84e5f-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserModule-be33e1b3b8d448590742634c6829d509f062da4626615089c2339a9dd2859b363e438f16d728572f0a7f024890b5282c058007f678562f54191cad3f8df84e5f-1"' :
                                            'id="xs-components-links-module-UserModule-be33e1b3b8d448590742634c6829d509f062da4626615089c2339a9dd2859b363e438f16d728572f0a7f024890b5282c058007f678562f54191cad3f8df84e5f-1"' }>
                                            <li class="link">
                                                <a href="components/UserComponent-1.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UsersModule-6fd3a207fd1d576040d35f6a88e40e4913c0617a735247ad2fcf9c912d679207838f25ba710cb491943963c7ce9f0e9148a568393f69b3ece0b6429dec26cd59"' : 'data-bs-target="#xs-components-links-module-UsersModule-6fd3a207fd1d576040d35f6a88e40e4913c0617a735247ad2fcf9c912d679207838f25ba710cb491943963c7ce9f0e9148a568393f69b3ece0b6429dec26cd59"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersModule-6fd3a207fd1d576040d35f6a88e40e4913c0617a735247ad2fcf9c912d679207838f25ba710cb491943963c7ce9f0e9148a568393f69b3ece0b6429dec26cd59"' :
                                            'id="xs-components-links-module-UsersModule-6fd3a207fd1d576040d35f6a88e40e4913c0617a735247ad2fcf9c912d679207838f25ba710cb491943963c7ce9f0e9148a568393f69b3ece0b6429dec26cd59"' }>
                                            <li class="link">
                                                <a href="components/UsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UsersModule-04537b5c8048c74df7b10e7e07313f8c95ade069572dda8a8588768c441d92c1e606d788b65c4b84b95984d87e43a288348add657dec1a3570e5e9ef69863906-1"' : 'data-bs-target="#xs-components-links-module-UsersModule-04537b5c8048c74df7b10e7e07313f8c95ade069572dda8a8588768c441d92c1e606d788b65c4b84b95984d87e43a288348add657dec1a3570e5e9ef69863906-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersModule-04537b5c8048c74df7b10e7e07313f8c95ade069572dda8a8588768c441d92c1e606d788b65c4b84b95984d87e43a288348add657dec1a3570e5e9ef69863906-1"' :
                                            'id="xs-components-links-module-UsersModule-04537b5c8048c74df7b10e7e07313f8c95ade069572dda8a8588768c441d92c1e606d788b65c4b84b95984d87e43a288348add657dec1a3570e5e9ef69863906-1"' }>
                                            <li class="link">
                                                <a href="components/UsersComponent-1.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersRoutingModule.html" data-type="entity-link" >UsersRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersRoutingModule.html" data-type="entity-link" >UsersRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Activity.html" data-type="entity-link" >Activity</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatesHelper.html" data-type="entity-link" >DatesHelper</a>
                            </li>
                            <li class="link">
                                <a href="classes/Entity.html" data-type="entity-link" >Entity</a>
                            </li>
                            <li class="link">
                                <a href="classes/Form.html" data-type="entity-link" >Form</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormElement.html" data-type="entity-link" >FormElement</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormGroupBuilder.html" data-type="entity-link" >FormGroupBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/Group.html" data-type="entity-link" >Group</a>
                            </li>
                            <li class="link">
                                <a href="classes/Indicator.html" data-type="entity-link" >Indicator</a>
                            </li>
                            <li class="link">
                                <a href="classes/Input.html" data-type="entity-link" >Input</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogicalFrame.html" data-type="entity-link" >LogicalFrame</a>
                            </li>
                            <li class="link">
                                <a href="classes/MultiLanguage.html" data-type="entity-link" >MultiLanguage</a>
                            </li>
                            <li class="link">
                                <a href="classes/OutputElement.html" data-type="entity-link" >OutputElement</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginatorI18n.html" data-type="entity-link" >PaginatorI18n</a>
                            </li>
                            <li class="link">
                                <a href="classes/Partition.html" data-type="entity-link" >Partition</a>
                            </li>
                            <li class="link">
                                <a href="classes/PartitionElement.html" data-type="entity-link" >PartitionElement</a>
                            </li>
                            <li class="link">
                                <a href="classes/PartitionGroup.html" data-type="entity-link" >PartitionGroup</a>
                            </li>
                            <li class="link">
                                <a href="classes/Patch.html" data-type="entity-link" >Patch</a>
                            </li>
                            <li class="link">
                                <a href="classes/Project.html" data-type="entity-link" >Project</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProjectIndicator.html" data-type="entity-link" >ProjectIndicator</a>
                            </li>
                            <li class="link">
                                <a href="classes/Purpose.html" data-type="entity-link" >Purpose</a>
                            </li>
                            <li class="link">
                                <a href="classes/Revision.html" data-type="entity-link" >Revision</a>
                            </li>
                            <li class="link">
                                <a href="classes/Theme.html" data-type="entity-link" >Theme</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ApiService.html" data-type="entity-link" >ApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChartService.html" data-type="entity-link" >ChartService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommentService.html" data-type="entity-link" >CommentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConfigService.html" data-type="entity-link" >ConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DateService.html" data-type="entity-link" >DateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DownloadService.html" data-type="entity-link" >DownloadService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ForceTranslateService.html" data-type="entity-link" >ForceTranslateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IndicatorService.html" data-type="entity-link" >IndicatorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InputService.html" data-type="entity-link" >InputService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoadingService.html" data-type="entity-link" >LoadingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProjectService.html" data-type="entity-link" >ProjectService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReportingService.html" data-type="entity-link" >ReportingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SidenavService.html" data-type="entity-link" >SidenavService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeService.html" data-type="entity-link" >ThemeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/CustomHttpInterceptor.html" data-type="entity-link" >CustomHttpInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuardService.html" data-type="entity-link" >AuthGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/BasicsInfosGuard.html" data-type="entity-link" >BasicsInfosGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/PendingChangesGuard.html" data-type="entity-link" >PendingChangesGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/PermissionsGuard.html" data-type="entity-link" >PermissionsGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AddedIndicators.html" data-type="entity-link" >AddedIndicators</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BreadcrumbItem.html" data-type="entity-link" >BreadcrumbItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ComponentCanDeactivate.html" data-type="entity-link" >ComponentCanDeactivate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DateTimeFormatOptions.html" data-type="entity-link" >DateTimeFormatOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Deserializable.html" data-type="entity-link" >Deserializable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Filter.html" data-type="entity-link" >Filter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GroupTitle.html" data-type="entity-link" >GroupTitle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HintUserElement.html" data-type="entity-link" >HintUserElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InformationItem.html" data-type="entity-link" >InformationItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InfoRow.html" data-type="entity-link" >InfoRow</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProjectAction.html" data-type="entity-link" >ProjectAction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SectionTitle.html" data-type="entity-link" >SectionTitle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Sidenav.html" data-type="entity-link" >Sidenav</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SidenavGroup.html" data-type="entity-link" >SidenavGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SidenavItem.html" data-type="entity-link" >SidenavItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Task.html" data-type="entity-link" >Task</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Task-1.html" data-type="entity-link" >Task</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});