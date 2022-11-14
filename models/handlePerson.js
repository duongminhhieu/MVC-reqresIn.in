const pathDB = './config/db/data.json'

const fs = require('fs');

module.exports = {


    getAll: () => {

        return new Promise((resolve, reject) => {
            fs.readFile(pathDB, (err, data) => {

                var data = JSON.parse(data);

                if (err) reject(err);
                else resolve(data);
            })
        })

    },

    getAllFromPage: (page = 1) => {

        return new Promise((resolve, reject) => {
            fs.readFile(pathDB, (err, data) => {

                var data = JSON.parse(data);
                const SIZE = data.length;
                const PAGESIZE = 2;
                const first = page * PAGESIZE - 1;


                // Create data from page
                var newData = [];
                for (let i = first - 1; i < first + 1; i++) {
                    newData.push(data[i]);
                }

                if (err) reject(err);
                else resolve(newData);
            })
        })

    },

    getUserById: (id) => {
        return new Promise((resolve, reject) => {
            fs.readFile(pathDB, (err, data) => {

                var data = JSON.parse(data);

                newData = data.find(obj => obj.id == id);

                if (err) reject(err);
                else resolve(newData);
            })
        })
    },

    saveData: (formData) => {
        let usersjson = fs.readFileSync(pathDB, "utf-8");

        let users = JSON.parse(usersjson);

        formData.id = parseInt(users[users.length - 1].id) + 1; // create id from last item in array

        users.push(formData);
        usersjson = JSON.stringify(users);
        fs.writeFileSync(pathDB, usersjson, "utf-8");
    },

    updateData: (formData) => {
        let usersjson = fs.readFileSync(pathDB, "utf-8");
        let users = JSON.parse(usersjson); // get all userr from database

        let newUsers = users.map(obj => {
            if (obj.id === formData.id) {
                obj = Object.assign({}, formData); // copy data
            }
            return obj;
        })

        usersjson = JSON.stringify(newUsers);  // update and push data to database
        fs.writeFileSync(pathDB, usersjson, "utf-8");
    },

    deleteData: (id) => {
        let usersjson = fs.readFileSync(pathDB, "utf-8");
        let users = JSON.parse(usersjson); // get all userr from database

        const newUsers = users.filter(item => item.id !== id)

        usersjson = JSON.stringify(newUsers);  // update and push data to database
        fs.writeFileSync(pathDB, usersjson, "utf-8");
    },

    searchByName: (searchKey) => {
        return new Promise((resolve, reject) => {
            fs.readFile(pathDB, (err, data) => {

                var data = JSON.parse(data);

                searchKey = searchKey.toLowerCase();
                var newData = data.filter(function (obj) {
                    var fullName = obj.first_name.toLowerCase() + ' ' + obj.last_name.toLowerCase();
                    // tim trong ten co chuoi search_key lay indexOf, neu co thi chac chan > -1
                    return fullName.toLowerCase().indexOf(searchKey) > -1;
                });

                if (err) reject(err);
                else resolve(newData);
            })
        })

    }


}