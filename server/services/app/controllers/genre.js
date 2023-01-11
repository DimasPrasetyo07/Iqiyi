const {Genre, sequelize} = require('../models')

class ControllerGenres {
    static async fetchAllGenre (req, res, next) {
        const t = await sequelize.transaction();
        try {
            let data = await Genre.findAll({transaction: t})
            await t.commit();
            res.status(200).json(data)
        } catch (err) {
            await t.rollback()
            next(err)
        }
    }
    static async fetchOneGenre (req, res, next) {
      try {
        let {id} = req.params
        const data = await Genre.findByPk(id)
        if (!data) {
          throw { name: "Not_Found" }
        }
        res.status(200).json(data)
      } catch (err) {
        next(err)
      }
    }
    
    static async postNewGenre (req, res, next) {
        const t = await sequelize.transaction();
        try {
            let { name } = req.body;
            let data = await Genre.create({
              name
            });
            await t.commit();
            res.status(201).json(data);
          } catch (err) {
            await t.rollback()
            next(err);
          }
    }
    static async editGenre(req,res,next){
      try {
        const {id} = req.params
        const {name} = req.body
        const data = await Genre.findByPk(id)
        if(!data){
          throw {name : 'Not_Found'}
        }
        await Genre.update({name},{
          where : {
            id
          }
        })
        res.status(200).json({message : 'Success update genre'})
      } catch (error) {
        next(error)
      }
    }

    static async deleteGenre (req, res, next) {
        // const t = await sequelize.transaction();
        console.log(req.params.id, '<<<<<<<<<<')
        try {
            let entity = await Genre.findByPk(req.params.id);
            if (!entity) {
              throw { name: "Not_Found" };
            }
            let data = await Genre.destroy({
              where: {
                id: req.params.id,
              },
            });
            if (!data) {
              throw { name: "Not_Found" };
            }
            // await t.commit();
            res.status(200).json(`${entity.name} success to delete`);
          } catch (err) {
            console.log(err)
            // await t.rollback()
            next(err);
          }
    }
}

module.exports = ControllerGenres