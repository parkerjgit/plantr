const db = require('./models')

db.sync({ force: true })
  .then(() => {
    console.log('We\'re connected')
  })
  .catch(err => {
    console.log('Connection failed')
    console.log('DB ERROR ', err)
  })
  .finally(() => {
    db.close()
  })
