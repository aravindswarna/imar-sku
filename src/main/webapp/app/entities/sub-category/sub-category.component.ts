import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SubCategory } from './sub-category.model';
import { SubCategoryService } from './sub-category.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-sub-category',
    templateUrl: './sub-category.component.html'
})
export class SubCategoryComponent implements OnInit, OnDestroy {
subCategories: SubCategory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private subCategoryService: SubCategoryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.subCategoryService.query().subscribe(
            (res: HttpResponse<SubCategory[]>) => {
                this.subCategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSubCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SubCategory) {
        return item.id;
    }
    registerChangeInSubCategories() {
        this.eventSubscriber = this.eventManager.subscribe('subCategoryListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
