const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser')

module.exports = (app) => {
    app.use(express.json())
    app.use(cookieParser())
    app.use(express.urlencoded({extended:true}))
    //TODO: Setup the view engine
    app.engine('.hbs', handlebars({
        extname:'.hbs',
      
    partialsDir  :  'views/partials'
    
        
    }));
app.set('view engine', '.hbs');

    //TODO: Setup the body parser

    //TODO: Setup the static files
    app.use('/static', express.static('static'));

  

};