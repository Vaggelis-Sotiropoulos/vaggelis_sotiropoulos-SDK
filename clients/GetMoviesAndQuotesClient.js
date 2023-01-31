"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const MovieException_1 = __importDefault(require("./utils/MovieException"));
class GetMoviesAndQuotesClient {
    constructor(token) {
        this.token = token;
    }
    getAllMovies() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield (0, node_fetch_1.default)('https://the-one-api.dev/v2/movie', {
                    headers: { 'Authorization': `Bearer ${this.token}` }
                });
                const json = yield response.json();
                return json;
            }
            catch (_) {
                return new MovieException_1.default("Movie lookup failed");
            }
        });
    }
    getMovie(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield (0, node_fetch_1.default)('https://the-one-api.dev/v2/movie', {
                    body: `name=${name}`,
                    headers: { 'Authorization': `Bearer ${this.token}` }
                });
                const json = yield response.json();
                return json;
            }
            catch (_) {
                return new MovieException_1.default("Movie lookup failed");
            }
        });
    }
    getCharacterQuotesFromMovie(movieName, characterName) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movie = yield this.getMovie(movieName);
                const response = yield (0, node_fetch_1.default)(`https://the-one-api.dev/v2/movie/${(_a = movie.docs[0]) === null || _a === void 0 ? void 0 : _a._id}/quote`, {
                    body: `character=${characterName}`,
                    headers: { 'Authorization': `Bearer ${this.token}` }
                });
                const json = yield response.json();
                return json;
            }
            catch (_) {
                return new MovieException_1.default("Movie lookup failed");
            }
        });
    }
}
