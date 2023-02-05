const express    = require("express");
const bodyParser = require("body-parser");
const cors       = require('cors')
const request    = require('./utils/request/service')
const controller = require('./controller/controller')


const app = express();

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(cors({origin:true,credentials: true}))

app.get('/', (req, res) => {

    const typeTicket = request.Query(req,'typeTicket')

    controller.textDetection(
        './ticket-example/ticket2.jpg',
        typeTicket, 
        res
    )
  })
  
app.listen(3000, () => {
    console.log("app running on port " + 3000)
})