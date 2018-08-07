const { Gardener, Plot, Vegetable, db } = require('./models')

// const vege = (name, color, planted_on) => {
//   return Vegetable.create({ name, color, planted_on })
// }

const vegeFactory = () => {
  const res = [];
  const names = ['onion', 'romain', 'greenleaf', 'carrot', 'rubarb', 'peas', 'tomato', 'lettuce', 'scallop'];
  const colors = ['red', 'green', 'blue', 'orange'];
  const make = (() => {
    return function() {
      return Vegetable.create({
        name: names.pop(),
        color: colors[Math.floor(Math.random() * colors.length)],
        planted_on: Date.now()
      })
    }
  })();
  while (names.length > 0) {
    res.push(make());
  }
  return res;
}

const gardenerFactory = (veges) => {
  const res = [];
  const names = ['Bob', 'Rick', 'Don', 'Joe', 'Jerry', 'Marry', 'Jane', 'Lucy', 'Berry', 'Hal', 'Sid'];
  const make = (() => {
    return function() {
      return Gardener.create({
        name: names.pop(),
        age: Math.ceil(Math.random()*90)+10,
        favoriteVegetableId: veges[Math.floor(Math.random() * veges.length)].id
      })
    }
  })();
  while(names.length > 0) {
    res.push(make());
  }
  return res;
}

const plotFactory = (gardeners) => {
  const res = [];
  var cnt = gardeners.length;
  const make = (() => {
    return function() {
      return Plot.create({
        size: Math.round(Math.random()*900)+100,
        shaded: [true, false][Math.floor(Math.random()*2)],
        gardenerId: gardeners[--cnt].id,
      })
    }
  })();
  while (cnt)
    res.push(make());
  }
  return res;
}


db.sync({ force: true })                                                      // create tables
  .then(() => Promise.all(vegeFactory(5)))                                    // seed veges
  .then((veges) => Promise.all(gardenerFactory(veges)))                       // seed gardeners
  .then((gardeners) => Promise.all(plotFactory(gardeners)))                   // seed plots
  .then((plots) => Promise.all([Plot.findAll(), Vegetable.findAll()]))
  .then(([plots, veges]) => {
    plots.forEach(plot => {
      plot.addVegetables(veges.filter((_) => Math.round(Math.random()*10)%2)) // plant veges
    })
  })
  .catch(err => {
    console.log('Connection failed')
    console.log('DB ERROR ', err)
  })
  .finally(() => {
    // db.close()
  })
