import express from 'express';
import expressJwt from 'express-jwt';
import Photo from '../models/photo.model';

const apiRouter = express.Router();

const router = (models) => {
        const {Photo, Message} = models;

        apiRouter.route('/photos')
            .get((req, res) => {
                Photo.getPhotos().then(
                    (photos) => res.json(photos)
                );
            });

        apiRouter.route('/photo/:id')
            .get((req, res) => {
            Photo.getPhotoById(req.params.id).then((photo) => {
                if (photo.length === 0) {
                    res.status(404).json({
                        message: 'Photo not found.'
                    });
                }
                res.json(photo);
            })
        });

        apiRouter.route('/photo/:id/message')
            .post((req, res) => {
                console.log(req.body);
                Message.create({
                    photoId: req.params.id,
                    text: req.body.text,
                    userId: req.user._id
                }).then((result) => {
                    res.json(result);
                })
            });

        apiRouter.route('/photo/:id/messages')
            .get((req, res) => {
                Message.getPhotoMessages(req.params.id).then((result) => {
                    res.json(result);
                });
            });

        return apiRouter;
    }

export default router;
