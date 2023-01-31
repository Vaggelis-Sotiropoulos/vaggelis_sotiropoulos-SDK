import Movie from './movie';

export default interface MoviesList {
    docs: Movie[];
    total: number;
    limit: number;
    offset: number;
    page?: number;
    pages?: number;
}
