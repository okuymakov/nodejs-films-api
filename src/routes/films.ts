import { Router } from 'express';
import * as db from '../db/db'

const router = Router();
router.get('/get', async (req, res) => {
    try {
        const { genres, countries, years } = req.query;

        const genresAsArray = (genres && genres !== 'undefined' ? (Array.isArray(genres) ? genres : [genres]) : []) as string[];
        const countriesAsArray = (countries && countries !== 'undefined' ? (Array.isArray(countries) ? countries : [countries]) : []) as string[];
        const yearsAsArray = (years && years !== 'undefined' ? (Array.isArray(years) ? years : [years]) : []) as string[];
        let resultYears: string[][] = [];
        yearsAsArray.forEach(el => {
            if (el.includes('-')) {
                resultYears.push([el.substring(0, el.indexOf('-')), el.substring(el.indexOf('-') + 1)])
            } else {
                resultYears.push([el, '' + (parseInt(el) + 1)]);
            }
        })
        let data = await db.getFilms(genresAsArray, countriesAsArray, resultYears);
        return res.status(200).send(data);
    }
    catch (e) {
        return res.status(500).send({message: "Films weren't received"});
    }
});

router.get('/getById', async (req, res) => {
    try {
        let data = await db.getFilmById(req.query.id as string);
        return res.status(200).send(data);
    }
    catch (e) {
        return res.status(500).send({message: "Film wasn't received"});
    }
});

router.post('/add', async (req, res) => {

    const { name, country, genres,
        directors, scenario, producers,
        оperators, composers, budget,
        boxOffice, ageRate, runtime,
        releaseDate, src } = req.body;

    let film = {
        name, country, genres,
        directors, scenario, producers,
        оperators, composers, budget,
        boxOffice, ageRate, runtime,
        releaseDate, src
    }

    try {
        let data = await db.addFilm(film);
        return res.status(200).send(data);
    }
    catch (e) {
        return res.status(500).send({message: "Film wasn't added"});
    }
});

router.delete('/delete', async (req, res) => {
    try {
        await db.deleteFilm(req.body.id)
        return res.status(200).send({message: "Film was deleted successfuly"});
    }
    catch (e) {
        return res.status(500).send({message: "Film wasn't deleted"});
    }
});
export default router;