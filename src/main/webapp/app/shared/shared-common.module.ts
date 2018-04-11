import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';

import {
    StockkeepingunitSharedLibsModule,
    JhiAlertComponent,
    JhiAlertErrorComponent
} from './';

@NgModule({
    imports: [
        StockkeepingunitSharedLibsModule
    ],
    declarations: [
        JhiAlertComponent,
        JhiAlertErrorComponent
    ],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
    ],
    exports: [
        StockkeepingunitSharedLibsModule,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class StockkeepingunitSharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
