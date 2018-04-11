import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SubCategory } from './sub-category.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SubCategory>;

@Injectable()
export class SubCategoryService {

    private resourceUrl =  SERVER_API_URL + 'api/sub-categories';

    constructor(private http: HttpClient) { }

    create(subCategory: SubCategory): Observable<EntityResponseType> {
        const copy = this.convert(subCategory);
        return this.http.post<SubCategory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(subCategory: SubCategory): Observable<EntityResponseType> {
        const copy = this.convert(subCategory);
        return this.http.put<SubCategory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SubCategory>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SubCategory[]>> {
        const options = createRequestOption(req);
        return this.http.get<SubCategory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SubCategory[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SubCategory = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SubCategory[]>): HttpResponse<SubCategory[]> {
        const jsonResponse: SubCategory[] = res.body;
        const body: SubCategory[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SubCategory.
     */
    private convertItemFromServer(subCategory: SubCategory): SubCategory {
        const copy: SubCategory = Object.assign({}, subCategory);
        return copy;
    }

    /**
     * Convert a SubCategory to a JSON which can be sent to the server.
     */
    private convert(subCategory: SubCategory): SubCategory {
        const copy: SubCategory = Object.assign({}, subCategory);
        return copy;
    }
}
