const router = require('express').Router();
const { validationCreateMovie, validationDeleteMovie } = require('../middlewares/validations');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validationCreateMovie, createMovie);
router.delete('/:_id', validationDeleteMovie, deleteMovie);

module.exports = router;
