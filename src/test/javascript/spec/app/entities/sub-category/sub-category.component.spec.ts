/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StockkeepingunitTestModule } from '../../../test.module';
import { SubCategoryComponent } from '../../../../../../main/webapp/app/entities/sub-category/sub-category.component';
import { SubCategoryService } from '../../../../../../main/webapp/app/entities/sub-category/sub-category.service';
import { SubCategory } from '../../../../../../main/webapp/app/entities/sub-category/sub-category.model';

describe('Component Tests', () => {

    describe('SubCategory Management Component', () => {
        let comp: SubCategoryComponent;
        let fixture: ComponentFixture<SubCategoryComponent>;
        let service: SubCategoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockkeepingunitTestModule],
                declarations: [SubCategoryComponent],
                providers: [
                    SubCategoryService
                ]
            })
            .overrideTemplate(SubCategoryComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubCategoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubCategoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SubCategory(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.subCategories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
