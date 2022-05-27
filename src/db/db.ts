import { ObjectID } from "bson";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

import Film, { IFilm } from "../models/film";
import FilmReview, { IFilmReview } from "../models/filmReview";

export async function getFilms(genres: string[], countries: string[], years: string[][]): Promise<Array<IFilm>> {
    let filterWasApplied = genres.length || countries.length || years.length;
    return await Film.find({
        $or: [
            {
                genres: !filterWasApplied ? { $in: [/^/] } :
                    { $in: genres.map(el => { return new RegExp('^' + el, 'i'); }) }
            },
            {
                country: !filterWasApplied ? { $in: [/^/] } :
                    { $in: countries.map(el => { return new RegExp('^' + el, 'i'); }) }
            },
            ...!filterWasApplied ? [{ releaseDate: { $gte: new Date(0) } }] : years.map(el => {
                return {
                    releaseDate: { $gte: new Date(el[0]), $lt: new Date(el[1]) },
                };
            })]
        ,
    })
        .catch((error: Error) => {
            throw error;
        });
}
export async function getFilmById(id: string): Promise<IFilm> {
    return await Film.findById({
        _id: new ObjectId(id)
    })
        .catch((error: Error) => {
            throw error;
        });
}

export async function addFilm(film: IFilm): Promise<IFilm> {
    return await Film.create(film)
        .then((data: IFilm) => {
            return data;
        })
        .catch((error: Error) => {
            mongoose.disconnect();
            throw error;
        });
}

export async function deleteFilm(id: string) {
    await Film.deleteOne({ _id: new ObjectId(id) }).catch((error: Error) => {
        throw error;
    });
}

export async function getFilmReviews(filmId: string): Promise<Array<IFilmReview>> {
    return await FilmReview.find({
        filmId: new ObjectID(filmId)
    }).catch((error: Error) => {
        throw error;
    });
}

export async function addFilmReview(review: IFilmReview): Promise<IFilmReview> {
    return await FilmReview.create(review)
        .then((data: IFilmReview) => {
            return data;
        })
        .catch((error: Error) => {
            mongoose.disconnect();
            throw error;
        });
}
export async function deleteFilmReview(id: string) {
    await FilmReview.deleteOne({ _id: new ObjectId(id) }).catch((error: Error) => {
        throw error;
    });
}


