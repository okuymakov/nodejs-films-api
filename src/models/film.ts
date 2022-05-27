import mongoose, {ObjectId, Schema } from "mongoose";
export interface IFilm {
    _id?: ObjectId;
    name: string; 
    country: string; 
    genres: string[]; 
    directors: string[];
    scenario: string[];
    producers: string[];
    оperators: string[];
    composers: string[];
    budget: number;
    boxOffice: number;
    ageRate: number;
    runtime: number;
    releaseDate: Date;
    src: string;
}


const FilmSchema: Schema = new Schema({
    name: String,
    country: String,
    genres: [String],
    directors: [String],
    scenario: [String],
    producers: [String],
    оperators: [String],
    composers: [String],
    budget: Number,
    boxOffice: Number,
    ageRate: Number,
    runtime: Number,
    releaseDate: {type: Date},
    src: String
  });

export default mongoose.model<IFilm>('Film', FilmSchema,'Films');
