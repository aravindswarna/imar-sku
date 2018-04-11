import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SubCategory } from './sub-category.model';
import { SubCategoryPopupService } from './sub-category-popup.service';
import { SubCategoryService } from './sub-category.service';
import { Category, CategoryService } from '../category';

@Component({
    selector: 'jhi-sub-category-dialog',
    templateUrl: './sub-category-dialog.component.html'
})
export class SubCategoryDialogComponent implements OnInit {

    subCategory: SubCategory;
    isSaving: boolean;

    categories: Category[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private subCategoryService: SubCategoryService,
        private categoryService: CategoryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.categoryService.query()
            .subscribe((res: HttpResponse<Category[]>) => { this.categories = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.subCategory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.subCategoryService.update(this.subCategory));
        } else {
            this.subscribeToSaveResponse(
                this.subCategoryService.create(this.subCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SubCategory>>) {
        result.subscribe((res: HttpResponse<SubCategory>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SubCategory) {
        this.eventManager.broadcast({ name: 'subCategoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCategoryById(index: number, item: Category) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-sub-category-popup',
    template: ''
})
export class SubCategoryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subCategoryPopupService: SubCategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.subCategoryPopupService
                    .open(SubCategoryDialogComponent as Component, params['id']);
            } else {
                this.subCategoryPopupService
                    .open(SubCategoryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
