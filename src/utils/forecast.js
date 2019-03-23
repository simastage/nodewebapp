const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/659bc552890bd8ea0e1948b8ac45d8d4/' + lat + ',' + long
    request( { url, json:true }, (error, { body } ) => {
        if(error) {
            callback('Cannot reach weather service')
             } else if (body.error) {
                callback('Invalid Location Data')
            } else {
            callback(undefined, {
                
                data : 'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.'
            })
        }
    })

 }

 module.exports = forecast