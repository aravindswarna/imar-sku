/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StockkeepingunitTestModule } from '../../../test.module';
import { SubCategoryDialogComponent } from '../../../../../../main/webapp/app/entities/sub-category/sub-category-dialog.component';
import { SubCategoryService } from '../../../../../../main/webapp/app/entities/sub-category/sub-category.service';
import { SubCategory } from '../../../../../../main/webapp/app/entities/sub-category/sub-category.model';
import { CategoryService } from '../../../../../../main/webapp/app/entities/category';

describe('Component Tests', () => {

    describe('SubCategory Management Dialog Component', () => {
        let comp: SubCategoryDialogComponent;
        let fixture: ComponentFixture<SubCategoryDialogComponent>;
        let service: SubCategoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockkeepingunitTestModule],
                declarations: [SubCategoryDialogComponent],
                providers: [
                    CategoryService,
                    SubCategoryService
                ]
            })
            .overrideTemplate(SubCategoryDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubCategoryDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubCategoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SubCategory(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.subCategory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'subCategoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SubCategory();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.subCategory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'subCategoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
