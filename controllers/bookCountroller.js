const { Book } = require("../models/Book")
const { v4: uuidv4 } = require('uuid');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs')


// parse application/json
//app.use(bodyParser.json())

const bookController = {
    getAll: (req, res) => {

        let limitProduct = req.query.limit;

        Book.find()
            .limit(limitProduct)
            .populate("writer")
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    getById: (req, res) => {
        let id = req.params.id

        Book.findById(id).populate("writer")
            .then(data => {
                if (data)
                    res.json(data)
                else
                    res.status(404).json({});
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    add: (req, res) => {
        let file = req.files.photo;

        //file daki uzantıyı (.jpeg, .png)
        let ext = file.name.substring(file.name.lastIndexOf('.'));
    
        //dışarıdan gelen file SAVE edeceğim. Save path ayarlıyorum
        let path = __dirname + '/images/' + uuidv4() + ext;
    
        file.mv(path, function (err) {
    
            if (!err)
                res.send('UPLOADED!');
            else
                res.status(500).json(err);
    
        })
    
        let book = new Book({
            name: req.body.name,
            description: req.body.description,
            writer: req.body.writer,
            imgPath:path
        })

        book.save()

        res.json(book)
    },
   
    delete: (req, res) => {
        let id = req.params.id;

        Book.findByIdAndDelete(id)
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}


module.exports = {
    bookController
}
