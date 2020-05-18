const request = require('request')

const forecast = (address,callback) =>{
    adr = address.longitude + ',' + address.latitude

    const url = 'https://api.darksky.net/forecast/5335254451b9b4c1358ad7d643e6c274/'+ adr
    console.log(url)
    request({url:url,json:true},(error,response) => {
        if(error)
        {
            callback("Unable to connect to Server!!",undefined)
        }
        else if(response.body.error)
        {
            callback("Unable to find Location!!!",undefined)
        }
        else
        {
            callback(undefined,{
                temp : response.body.currently.temperature,
                precipitation:response.body.currently.precipProbability,
                summary:response.body.daily.summary
            })
        }    
    })
}

module.exports = forecast