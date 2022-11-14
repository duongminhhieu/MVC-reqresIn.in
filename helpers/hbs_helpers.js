module.exports ={
    fullName: function(person) {
        return person.first_name + ' ' + person.last_name;
    },
    upperEmail: function(person) {
        return person.email.toUpperCase();
    },

}