const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//Express config
const pathDirectory = path.join(__dirname,'../public/')
const viewsPath = path.join(__dirname,"../templates/views/")
const partialsPath = path.join(__dirname,"../templates/partials/")

const app = express()

//setup static dorectory
app.use(express.static(pathDirectory))

//set up handlebar & view locaitons
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res) => {
    res.render('index',{
        title:"Weather",
        name:"Vaisakh K"
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:"About Me",
        name:"Vaisakh K"
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        message:"A message is a discrete unit of communication intended by the source for consumption by some recipient or group of recipients. A message may be delivered by various means, including courier, telegraphy, carrier pigeon and electronic bus. A message can be the content of a broadcast",
        title:"help",
        name:"Vaisakh"
    })
})
app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:"No search value "
        })
    }
   geocode(req.query.address,(error,data) => {
        if(error){
            return res.send({
                err:error
            })
        }
        forecast(data,(error,data) => {
            if(error)
            {
                return res.send({
                    err:error
                })
            }
            else
            {
                return res.send({
                    temp:data.temp,
                    precipitation:data.precipitation,
                    summary:data.summary
                })
                
            }
        })
   })
})

app.get("/products",(req,res)=>{
    if(!req.query.search)
    {
       return res.send({
            error:"No search value "
            
        })

    }
    console.log(req.query.search)
    res.send({
            products:[]
        })
})
app.get('/help/*',(req,res)=>{
    res.render('errors',{
        message:"Help Article not Found"
    })
})
app.get('*',(req,res)=>{
    res.render('errors',{
        message:"404 Error"
    })
})

app.listen(3000, () => {
    console.log('Server is Up on port 3000')
})