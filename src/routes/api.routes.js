import express from 'express';
import Photo from '../models/photo.model';

const apiRouter = express.Router();

// /api
apiRouter.route('/photos')
    .get((req, res) => {
        Photo.run().then(
            (photos) => res.json(photos)
        );
    });

export default apiRouter;
