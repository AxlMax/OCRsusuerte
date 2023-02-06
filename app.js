require("dotenv").config();

const express    = require("express");
const bodyParser = require("body-parser");
const cors       = require('cors');
const request    = require('./utils/request/service');
const controller = require('./controller/controller');
const multer     = require('multer');

const colors     = require("colors");
colors.enable();

const app = express();
const upload = multer();

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cors({origin:true,credentials: true}));

app.get('/', upload.single('image') ,(req, res) => {

    const typeTicket = request.Query(req,'typeTicket');

    const imageBuffer = req.file.buffer;
    const base64Image = imageBuffer.toString('base64');

    if(process.env.LOG === 'true'){
        console.log(colors.yellow(`[QUERY] ${typeTicket}`))
    }
  
    controller.textDetection(
        base64Image,
        typeTicket, 
        res
    )
  });

app.listen(process.env.PORT, () => {
    console.log(colors.green("[OK] app running on port " + process.env.PORT))
});