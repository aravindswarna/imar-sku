import { BaseEntity } from './../../shared';

export class Sku implements BaseEntity {
    constructor(
        public id?: number,
        public skuDesc?: string,
        public locations?: BaseEntity[],
    ) {
    }
}
