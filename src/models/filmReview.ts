import mongoose, { ObjectId, Schema } from "mongoose";

export interface IFilmReview {
    _id?: ObjectId;
    author: string,
    authorRole: string,
    text: string,
    rate: number,
    filmId: ObjectId
}

const FilmReviewSchema: Schema = new Schema({
    author: String,
    authorRole: String,
    text: String,
    rate: Number,
    filmId: {type : mongoose.Schema.Types.ObjectId, ref: "Film"}
  });

export default mongoose.model<IFilmReview>('FilmReview', FilmReviewSchema,'Reviews');
