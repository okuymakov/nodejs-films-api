import { Router } from 'express';
import * as db from '../db/db'
const router = Router();

router.get('/get', async (req, res) => {
    try {
        let data = await db.getFilmReviews(req.query.filmId as string);
        return res.status(200).send(data);
    }
    catch (e) {
        return res.status(500).send({message: "Reviews weren't received"});
    }
});

router.post('/add', async (req, res) => {
    const { author, authorRole, text, rate, filmId } = req.body;
    let review = { author, authorRole, text, rate, filmId };
    try {
        let data = await db.addFilmReview(review);
        return res.status(200).send(data);
    }
    catch (e) {
        return res.status(500).send({message: "Review wasn't added"});
    }
});

router.delete('/delete', async (req, res) => {
    try {
        await db.deleteFilmReview(req.body.id)
        return res.status(200).send({message: "Review was deleted successfuly"});;
    }
    catch (e) {
        return res.status(500).send({message: "Review wasn't deleted"});
    }
});

export default router;