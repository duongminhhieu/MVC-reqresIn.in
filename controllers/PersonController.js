const handlePerson = require('../models/handlePerson');
const hbsH = require('../helpers/hbs_helpers');
const fs = require('fs');
const { sumCurrentIndex } = require('../helpers/hbs_helpers');

class PersonController {

    //GET/home
    async home(req, res, next) {

        try {

            const page = req.query.page || 1;
            const persons = await handlePerson.getAllFromPage(page);
            res.render('home', {
                prevPage: parseInt(page) - 1,
                nextPage: parseInt(page) + 1,
                persons: persons,
                active: { one: page == 1, two: page == 2, three: page == 3, four: page == 4,
                         five: page == 5, six: page == 6, seven: page == 7, eight: page == 8, nine: page == 9, next: page > 9 }
            });
        }
        catch (error) {
            next(error);
        }
    }


    // GET/user/:id
    async showUser(req, res, next) {
        try {

            const id = req.params.id;

            const person = await handlePerson.getUserById(id);
            res.render('infoUser', {
                person: person,
                fullName: hbsH.fullName(person),
                upperEmail: hbsH.upperEmail(person),
            });

        }
        catch (error) {
            next(error);
        }
    }

    // GET/addUser
    addUser(req, res, next) {
        res.render('addUser');
    }


    //POST/store
    store(req, res, next) {

        try {

            const formData = req.body;
            handlePerson.saveData(formData);
            res.redirect('/')
        }
        catch (error) {
            next(error);
        }
    }

    // GET/:id/edit
    async editUser(req, res, next) {
        try {

            const id = req.params.id;
            const person = await handlePerson.getUserById(id);

            res.render('edit', { person: person })
        }
        catch (error) {
            next(error);
        }
    }

    // PUT/update
    update(req, res, next) {
        try {

            const id = req.params.id;
            const formData = req.body;
            formData.id = parseInt(id);

            handlePerson.updateData(formData);

            res.redirect('back')
        }
        catch (error) {
            next(error);
        }
    }

    // DELETE/:id/delete
    delete(req, res, next) {
        try {          
            const id = req.params.id;
            
            handlePerson.deleteData(parseInt(id));
            res.redirect('back')
        }
        catch (error) {
            next(error);
        }
    }


    // GET/search
    async search(req, res, next) {
        try {

            const searchKey = req.query.searchKey;

            const persons = await handlePerson.searchByName(searchKey);

            res.render('search', {
                search_key: searchKey,
                persons: persons
            });

        }
        catch (error) {
            next(error);
        }
    }


    // GET/all
    notFoundPage(req, res, next){
        try {

            res.status(404).send('<h1>Error: 404! Page not found</h1>');

        }
        catch (error) {
            next(error);
        }

    }

    // GET/allusers
    async allUsers(req, res, next){
        try {

            const persons = await handlePerson.getAll();
            res.render('allUsers', {
                persons: persons,
            });
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new PersonController();
