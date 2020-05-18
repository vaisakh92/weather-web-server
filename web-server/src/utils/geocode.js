const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmFpc2FraDkyIiwiYSI6ImNrN2l6ZXdrbDAxOGszZm83bTZ6MHM5anQifQ.7xmy3q3Wq9_hEvhLZLa2SQ'
    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback('Unable to connect to Location Services',undefined)
        }
        else if(response.body.features.length == 0)
        {
            callback('Unable to find location check Later',undefined)
        }
        else
        {
            callback(undefined,{
            latitude: response.body.features[0].geometry.coordinates[0],
            longitude: response.body.features[0].geometry.coordinates[1],
            location: response.body.features[0].place_name
            })
        }    
    })
}


module.exports = geocode