const visionApi  = require('@google-cloud/vision');
const textStructurer = require('./textStructurerClasses');

/**
 * 
 * @param {String}  base64Image nombre del ticket 
 * @param {String} typeTicket tipo de ticket
 * 
*/

function textDetection( base64Image, typeTicket, res){

    const client = new visionApi.ImageAnnotatorClient({
        keyFilename: process.env.CREDENTIAL_FILE
    });

    const imageBuffer = Buffer.from(base64Image, 'base64');

    client.textDetection(imageBuffer)
    .then(
        textObject => {            
            const fullText = textObject[0].fullTextAnnotation.text.split('\n')

            if(process.env.LOG === 'true'){
                console.log(textObject)
                console.log(fullText)
            }

            var completeStructuredText = {}
            
            fullText.forEach(text => {
                if(text.search(":") > 0){

                    let structeredText

                    if(typeTicket === 'type1' ) structeredText = new textStructurer.type1(text, ":")

                    structeredText.structText()

                    structeredText.keys.forEach((key, index) => completeStructuredText[key] = structeredText.contents[index])
                }
            })

            res.send(completeStructuredText)
        }   
    ).catch(
        //err => res.status(400).send("error en servidor")
        err => console.log(err)
    )
}

module.exports = {textDetection}
