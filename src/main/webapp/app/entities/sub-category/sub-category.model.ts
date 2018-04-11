import { BaseEntity } from './../../shared';

export class SubCategory implements BaseEntity {
    constructor(
        public id?: number,
        public subcategory?: string,
        public category?: BaseEntity,
    ) {
    }
}
