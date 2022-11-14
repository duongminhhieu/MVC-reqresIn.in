const express = require('express')
const path = require('path');
const bodyParser = require("body-parser");
const exphbs = require('express-handlebars');
const personRouter = require('./routers/personRouter')
// port number
const port = process.env.PORT || 3030;


// init application
const app = express()

// parser du lieu
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Set dung tai nguyen he thong
app.use(express.static(path.join(__dirname + '/public')));


// cau hinh handlebars
app.engine('hbs', exphbs.engine({
    extname:'hbs',
    defaultLayout:'main.hbs',
    layoutsDir: 'views/layouts'
}));
app.set('view engine', 'hbs');

app.use('/', personRouter);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode | 500;
    res.status(statusCode);
    res.send(err.message)
});


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});