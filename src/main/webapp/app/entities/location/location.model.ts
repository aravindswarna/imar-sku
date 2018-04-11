import { BaseEntity } from './../../shared';

export class Location implements BaseEntity {
    constructor(
        public id?: number,
        public locationName?: string,
        public departments?: BaseEntity[],
        public sku?: BaseEntity,
    ) {
    }
}
