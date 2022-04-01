const Movies = require('../models/movies');
const NotFoundError = require('../errors/not-found-error');
const CastError = require('../errors/cast-error');
const ForbiddenError = require('../errors/forbidden-error');

const getMovies = (req, res, next) => Movies.find({})
  .orFail(new NotFoundError('Фильмы не найдены'))
  .then((movies) => res.status(200).send(movies))
  .catch(next);

const createMovie = (req, res, next) => {
  const { name, _id } = req.user;
  const {
    country, director, duration, year, description, image, trailerLink,
    thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: { name, _id },
  })
    .then((m) => Movies.findById(m._id)
      .populate('owner', 'name'))
    .then((movies) => res.status(201).send(movies))
    .catch(next);
};

const deleteMovie = (req, res, next) => Movies.findById(req.params._id)
  .orFail(new NotFoundError('Фильм не найден'))
  .then((movie) => {
    if (movie.owner._id.toString() !== req.user._id.toString()) {
      throw new ForbiddenError('Нельзя удалить не свой фильм');
    } else {
      return movie.remove()
        .then(() => res.status(200).send({ message: 'Фильм удалён' }));
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new CastError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  });

module.exports = { getMovies, createMovie, deleteMovie };
