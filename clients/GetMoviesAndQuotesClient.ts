import fetch from "node-fetch";
import MoviesList from "../models/movieslist";
import QuoteList from "../models/quotelist";
import MovieException from "./utils/MovieException";

class GetMoviesAndQuotesClient {
    token: string
    
    constructor(token: string) {
        this.token = token
    }

    async getAllMovies(): Promise<MoviesList | MovieException> {
        try {
            const response = await fetch('https://the-one-api.dev/v2/movie', {
                headers: {'Authorization': `Bearer ${this.token}`}
            });
            const json = await response.json();
            return json as MoviesList;
        } catch(_) {
            return new MovieException("Movie lookup failed")
        }
    }

    async getMovie(name: string): Promise<MoviesList | MovieException> {
        try {
            const response = await fetch('https://the-one-api.dev/v2/movie', {
                body: `name=${name}`,
                headers: {'Authorization': `Bearer ${this.token}`}
            });
            const json = await response.json();
            return json as MoviesList;
        } catch(_) {
            return new MovieException("Movie lookup failed")
        }
    }

    async getCharacterQuotesFromMovie(movieName: string, characterName: string): Promise<QuoteList | MovieException> {
        try {
            const movie: MoviesList = await this.getMovie(movieName) as MoviesList;
            const response = await fetch(`https://the-one-api.dev/v2/movie/${movie.docs[0]?._id}/quote`, {
                body: `character=${characterName}`,
                headers: {'Authorization': `Bearer ${this.token}`}
            });
            const json = await response.json();
            return json as QuoteList;
        } catch(_) {
            return new MovieException("Movie lookup failed")
        }
    }
}
