const { Movie, Genre, User, Cast, sequelize } = require("../models");
const slug = require("slug");

class ControllerMovies {
  static async fetchAllMovies(req, res, next) {
    const t = await sequelize.transaction();
    try {
      let data = await Movie.findAll(
        {
          include: [Genre, Cast],
        },
        { transaction: t }
      );
      await t.commit();
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      await t.rollback();
      next(err);
    }
  }
  static async fetchOneMovie(req, res, next) {
    try {
      let { id } = req.params;
      const data = await Movie.findByPk(id, {
        include: [Genre, Cast],
      });
      if (!data) {
        throw { name: "Not_Found" };
      }
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async postNewMovie(req, res, next) {
    const t = await sequelize.transaction();
    try {
      let { title, synopsis, trailerUrl, imgUrl, rating, genreId, userMongoId, cast } =
        req.body;
      let newMovie = await Movie.create(
        {
          title,
          slug: slug(title),
          synopsis,
          trailerUrl,
          imgUrl,
          rating,
          genreId,
          // userId: req.user.id,
          userMongoId
        },
        { transaction: t }
      );
      const castInput = cast.map(el => {
        return {movieId: newMovie.id, name: el.name, profilePict: el.profilePict}
      })  
      let createCast = await Cast.bulkCreate(castInput, { transaction: t });
      await t.commit();
      res.status(201).json({ message: "New movie added" });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
  static async deleteMovie(req, res, next) {
    // const t = await sequelize.transaction();
    try {
      let data = await Movie.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!data) {
        throw { name: "Not_Found" };
      }
      // await t.commit();
      res.status(200).json({ message: "Delete movie success" });
    } catch (err) {
      // await t.rollback();
      next(err);
    }
  }
  static async editMovie(req, res, next) {
    const t = await sequelize.transaction();
    let { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
    let movieId = req.params.id;
    try {
      let singleMovie = await Movie.findByPk(movieId);
      if (!singleMovie) {
        throw { name: "Not_Found" };
      }
      let data = await Movie.update(
        {
          title,
          slug: slug(title),
          synopsis,
          trailerUrl,
          imgUrl,
          rating,
          genreId,
        },
        {
          where: {
            id: movieId,
          },
          returning: true,
        }
      );
      if (!data) {
        throw { name: "Not_Found" };
      }
      await t.commit();
      res.status(201).json({message: 'Edit movie success'});
    } catch (err) {
      await t.rollback();
      console.log(err);
      next(err);
    }
  }
}

module.exports = ControllerMovies;
