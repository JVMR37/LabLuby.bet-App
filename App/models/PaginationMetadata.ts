export default class PaginationMetadata {
  currentPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPage: number;
  lastPageUrl: string;
  nextPageUrl: string;
  perPage: number;
  previousPageUrl: string | null;
  total: number;

  constructor(
    current_page: number,
    first_page: number,
    first_page_url: string,
    last_page: number,
    last_page_url: string,
    next_page_url: string,
    per_page: number,
    previous_page_url: string | null,
    total: number
  ) {
    this.currentPage = current_page;
    this.firstPage = first_page;
    this.firstPageUrl = first_page_url;
    this.lastPage = last_page;
    this.lastPageUrl = last_page_url;
    this.nextPageUrl = next_page_url;
    this.perPage = per_page;
    this.previousPageUrl = previous_page_url;
    this.total = total;
  }

  public static fromJson(json: any): PaginationMetadata {
    return new PaginationMetadata(
      json.current_page,
      json.first_page,
      json.first_page_url,
      json.last_page,
      json.last_page_url,
      json.next_page_url,
      json.per_page,
      json.previous_page_url,
      json.total
    );
  }
}
