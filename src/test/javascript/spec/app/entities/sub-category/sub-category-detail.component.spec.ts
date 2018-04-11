/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StockkeepingunitTestModule } from '../../../test.module';
import { SubCategoryDetailComponent } from '../../../../../../main/webapp/app/entities/sub-category/sub-category-detail.component';
import { SubCategoryService } from '../../../../../../main/webapp/app/entities/sub-category/sub-category.service';
import { SubCategory } from '../../../../../../main/webapp/app/entities/sub-category/sub-category.model';

describe('Component Tests', () => {

    describe('SubCategory Management Detail Component', () => {
        let comp: SubCategoryDetailComponent;
        let fixture: ComponentFixture<SubCategoryDetailComponent>;
        let service: SubCategoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockkeepingunitTestModule],
                declarations: [SubCategoryDetailComponent],
                providers: [
                    SubCategoryService
                ]
            })
            .overrideTemplate(SubCategoryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubCategoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubCategoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SubCategory(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.subCategory).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
