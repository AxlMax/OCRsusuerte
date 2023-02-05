class type1 {

    constructor(text, splitWord){
        this.keys       = [text.substring(0,text.search(splitWord))]
        this.text       = text.substring(text.search(splitWord) + 1, text.length)
        this.splitWord  = splitWord
        this.contents   = []
    }

    canContinue() {

        if(this.keys.includes("HORA")) return false
        
        return this.text.search(this.splitWord) > 0 ? true : false
    }

    structText(){

        while(this.canContinue()){
            const [splittedText]       = this.text.split(this.splitWord)
            const SpaceSeparedTexts    = splittedText.split(" ")

            const newkey     = SpaceSeparedTexts.at(-1)
            const newContent = splittedText.substring(0, splittedText.length - newkey.length)

            this.contents.push(newContent)
            this.keys.push(newkey)
            this.reNewText()

        }
        
        this.contents.push(this.text)
    }

    reNewText(){
        this.text = this.text.substring(this.text.search(this.splitWord) + 1, this.text.length)
    }

}

module.exports = {type1}
