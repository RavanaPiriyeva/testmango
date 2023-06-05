const express = require('express');
const { bookController } = require('../controllers/bookCountroller');


const bookRoutes = express.Router();



bookRoutes.get('/', bookController.getAll)
bookRoutes.get('/:id', bookController.getById)
bookRoutes.delete('/:id', bookController.delete)
bookRoutes.post('/', bookController.add)


module.exports = {
    bookRoutes
}
