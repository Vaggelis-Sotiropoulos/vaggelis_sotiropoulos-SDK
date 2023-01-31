import Quote from './quote';

export default interface QuoteList {
    docs: Quote[];
    total: number;
    limit: number;
    offset: number;
    page?: number;
    pages?: number;
}
