import express from "express";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import films from "./routes/films"
import reviews from "./routes/reviews"

const app = express();

dotenv.config({ path: __dirname+'/.env' });
const port = process.env.PORT || 5000;

mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions)
    .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/films', films);
app.use('/films/reviews', reviews);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});