import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockkeepingunitSharedModule } from '../../shared';
import {
    SkuService,
    SkuPopupService,
    SkuComponent,
    SkuDetailComponent,
    SkuDialogComponent,
    SkuPopupComponent,
    SkuDeletePopupComponent,
    SkuDeleteDialogComponent,
    skuRoute,
    skuPopupRoute,
} from './';

const ENTITY_STATES = [
    ...skuRoute,
    ...skuPopupRoute,
];

@NgModule({
    imports: [
        StockkeepingunitSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SkuComponent,
        SkuDetailComponent,
        SkuDialogComponent,
        SkuDeleteDialogComponent,
        SkuPopupComponent,
        SkuDeletePopupComponent,
    ],
    entryComponents: [
        SkuComponent,
        SkuDialogComponent,
        SkuPopupComponent,
        SkuDeleteDialogComponent,
        SkuDeletePopupComponent,
    ],
    providers: [
        SkuService,
        SkuPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockkeepingunitSkuModule {}
