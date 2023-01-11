'use strict';
const slug = require('slug')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Movie.belongsTo(models.User, {foreignKey: 'userId'})
      Movie.hasMany(models.Cast, {foreignKey: 'movieId'})
      Movie.belongsTo(models.Genre, {foreignKey: 'genreId'})
      
    }
  }
  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Movie title is required'
        },
        notEmpty: {
          msg: 'Movie title is required'
        }
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Movie slug is required'
        },
        notEmpty: {
          msg: 'Movie slug is required'
        }
      }
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Synopsis is required'
        },
        notEmpty: {
          msg: 'Synopsis is required'
        }
      }
    },
    trailerUrl: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Rating is requred'
        },
        notEmpty: {
          msg: 'Rating is required'
        },
        min: {
          args: 1,
          msg: 'Minimum rating for a movie is 1'
        }
      }
    },
    genreId: DataTypes.INTEGER,
    // userId: DataTypes.INTEGER
    userMongoId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });
  Movie.beforeValidate((movie) => {
    movie.slug = slug(movie.title)
  })

  return Movie;
};