const {Movie, Cast, sequelize} = require('../models')


class ControllerCasts {
    static async fetchAllCasts(req, res, next) {
        const t = await sequelize.transaction();
        try {
            let data = await Cast.findAll({
                include: [Movie]
            }, {transaction: t})
            await t.commit();
            res.status(200).json(data)
        } catch (err) {
            await t.rollback()
            next(err)
        }
    }
    static async postNewCast(req, res, next) {
        const t = await sequelize.transaction();
        try {
            let { name, movieId, profilePict } = req.body;
            let data = await Cast.create({
              name, movieId, profilePict
            });
            await t.commit();
            res.status(201).json(data);
          } catch (err) {
            await t.rollback()
            next(err);
          }
    }
    static async editCast(req, res, next) {
        const t = await sequelize.transaction();
        let { name, movieId, profilePict } = req.body;
        let castId = req.params.id;
        try {
          let singleCast = await Cast.findByPk(castId);
          if (!singleCast) {
            throw { name: "Not_Found" };
          }
          let data = await Cast.update(
            {
              name,
              movieId,
              profilePict,
            },
            {
              where: {
                id: castId,
              },
              returning: true,
            }
          );
          if (!data) {
            throw { name: "Not_Found" };
          }
          await t.commit();
          res.status(201).json(data);
        } catch (err) {
          await t.rollback();
          next(err);
        }
      }
      static async fetchMovieCast (req, res, next) {
        try {
          let {id} = req.params
          const data = await Cast.findAll({
            where: {
              movieId: id
            }
          })
          if (!data) {
            throw { name: "Not_Found" }
          }
          res.status(200).json(data)
        } catch (err) {
          next(err)
        }
      }
      
}


module.exports = ControllerCasts