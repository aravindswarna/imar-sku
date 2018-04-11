import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { StockkeepingunitLocationModule } from './location/location.module';
import { StockkeepingunitDepartmentModule } from './department/department.module';
import { StockkeepingunitCategoryModule } from './category/category.module';
import { StockkeepingunitSubCategoryModule } from './sub-category/sub-category.module';
import { StockkeepingunitSkuModule } from './sku/sku.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        StockkeepingunitLocationModule,
        StockkeepingunitDepartmentModule,
        StockkeepingunitCategoryModule,
        StockkeepingunitSubCategoryModule,
        StockkeepingunitSkuModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockkeepingunitEntityModule {}
