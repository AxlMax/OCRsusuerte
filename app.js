require("dotenv").config()

const express    = require("express");
const bodyParser = require("body-parser");
const cors       = require('cors')
const request    = require('./utils/request/service')
const controller = require('./controller/controller')
const multer     = require('multer');

const app = express();
const upload = multer();

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(cors({origin:true,credentials: true}))

app.get('/', upload.single('image') ,(req, res) => {

    const typeTicket = request.Query(req,'typeTicket')

    const imageBuffer = req.file.buffer;
    const base64Image = imageBuffer.toString('base64');
  
    controller.textDetection(
        base64Image,
        typeTicket, 
        res
    )
  })

app.listen(process.env.PORT, () => {
    console.log("app running on port " + process.env.PORT)
})