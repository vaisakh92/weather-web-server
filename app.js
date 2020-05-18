console.log("client side JS file loaded")

const weather_form = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')



weather_form.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    messageOne.textContent = 'Loading'

    const loc = search.value
    const url = 'http://localhost:3000/weather?address='+loc
    fetch(url).then((response) =>{
        response.json().then((data) =>{
            console.log(data)
            if(data.err)
            messageOne.textContent = data.err
            else
            {
                messageOne.textContent = data.summary
                messageTwo.textContent = "Temparature " + data.temp
            }      
        })
    })
})