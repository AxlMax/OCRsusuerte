const visionApi  = require('@google-cloud/vision');
const textStructurer = require('./textStructurerClasses');

/**
 * 
 * @param {String} ticketName nombre del ticket 
 * @param {String} typeTicket tipo de ticket
 * 
*/

function textDetection(ticketName, typeTicket, res){

    const client = new visionApi.ImageAnnotatorClient({
        keyFilename:"./controller/ocr-susuerte-service-credentials.json"
    });

    client.textDetection(ticketName)
    .then(
        textObject => {            
            const fullText = textObject[0].fullTextAnnotation.text.split('\n')

            console.log(textObject)
            console.log(fullText)

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
        err      => console.log(err)
    )
}

module.exports = {textDetection}
