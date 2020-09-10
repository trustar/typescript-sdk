
export interface NumberedPageJSON<T> {
  items?: Array<T> | null;
  pageNumber?: number | null;
  pageSize?: number | null;
  totalElements?: number | null;
  hasNext?: boolean | null;
}

/**
 * Numbered page
 * @template T 
 */
export class NumberedPage<T> {

  items?: Array<T> | null;
  pageNumber?: number | null;
  pageSize?: number | null;
  totalElements?: number | null;
  hasNext?: boolean | null;

  constructor(numberedPage: NumberedPageJSON<T>) {

    this.items = numberedPage.items;
    this.pageNumber = numberedPage.pageNumber;
    this.pageSize = numberedPage.pageSize;
    this.totalElements = numberedPage.totalElements;
    this.hasNext = numberedPage.hasNext;

  }

  getTotalPages() {
    if (this.totalElements == undefined || this.pageSize == undefined || this.pageSize === 0) {
      return
    }
    return Math.ceil(this.totalElements / this.pageSize)
  }

  hasMorePages() {
    if (!(this.hasNext === undefined || this.hasNext === null)) {
      return this.hasNext
    }
    let totalPages = this.getTotalPages();
    if (this.pageNumber == undefined || this.pageSize == undefined || totalPages == undefined) {
      return
    }

    return this.pageNumber + 1 < totalPages
  }
}
