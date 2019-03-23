const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Define custom paths
const publicdir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')


// Setup Handlebars engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static page server directory
app.use(express.static(publicdir))


//setup routes

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name: 'Terry Babb',
        content:'Welcome to my site!'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name: 'Terry Babb',
        content:'I am the web developer'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help Me!',
        name: 'Terry Babb',
        content:'Get some help here'
    })
})

app.get( '/weather', (req, res) => {
    if(!req.query.city) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

geocode(req.query.city, (error, { latitude, longitude, location} = {} ) => {
if( error ) {
    return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
        if(error) {
            return res.send({error})
        }

        res.send({
            forecast: forecastData,
            location,
            city: req.query.city
            })
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        msg:'Help article not found',
        name:'Terry Babb'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        msg:'Page not Found',
        name:'Terry Babb'
    })
})

// init server
app.listen(port, () => {
    console.log('Server is up on port' + port)
})