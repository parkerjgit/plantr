const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/plantr');

module.exports = db;

const Gardener = db.define('gardener', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

const Plot = db.define('plot', {
  size: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shaded: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

const Vegetable = db.define('vegetable', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false
  },
  planted_on: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

Plot.belongsTo(Gardener);
Gardener.hasOne(Plot);
Vegetable.belongsToMany(Plot, { through: 'vegetable_plot' });
Plot.belongsToMany(Vegetable, { through: 'vegetable_plot' });
Gardener.belongsTo(Vegetable, { as: 'favorite_vegetable' })
