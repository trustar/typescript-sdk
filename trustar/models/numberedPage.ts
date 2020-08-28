export class NumberedPage<T> {

    items?: Array<T>;
    pageNumber?: number;
    pageSize?: number;
    totalElements?: number;
    hasNext?: boolean;

    constructor({items, pageNumber, pageSize, totalElements, hasNext}: {items?: Array<T>,
        pageNumber?: number, pageSize?: number, totalElements?: number, hasNext?: boolean} = {}) {

            this.items = items;
            this.pageNumber = pageNumber;
            this.pageSize = pageSize;
            this.totalElements = totalElements;
            this.hasNext = hasNext;

        }

        getTotalPages() {
            if (this.totalElements == undefined || this.pageSize == undefined) {
                return
            } 
            return Math.ceil(this.totalElements / this.pageSize)
        }

        hasMorePages() {
            if (!(this.hasNext == undefined)) {
                return this.hasNext
            }
            let totalPages = this.getTotalPages();
            if (this.pageSize == undefined || totalPages == undefined) {
                return
            }
            return this.pageNumber + 1 < totalPages
        }
}