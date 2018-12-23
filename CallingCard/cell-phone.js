class CellPhone {
    constructor(card) {
        this.card = card
        this.isTalking = false
        this.callLength = 0
        this.currCall = {
            callLength: 0,
            phoneNumber: '',
            wasCutOff: false
        }
        this.prevCalls = []
    }

    isTalking() {
        return this.currCall.callLength > 0 ? true : false
    }

    call(phoneNumber) {
        this.currCall.phoneNumber = phoneNumber
        this.currCall.callLength = 0
        this.currCall.wasCutOff = false
    }

    endCall() {
        this.prevCalls.push(this.currCall)
        this.currCall = {}
    }

    tick() {
        this.currCall.callLength++
        this.card.remainingMinutes--
        if(this.card.remainingMinutes === 0) {
            this.currCall.wasCutOff = true
            this.endCall()
        }
    }

    getHistory() {
        let historyString = ''

        this.prevCalls.forEach(call => {
            let { phoneNumber, callLength, wasCutOff } = call
            let pluralOrSingular = callLength !== 1 ? 'minutes' : 'minute'
            let wasCutOffYo = wasCutOff ? 'cut off at' : ''
            historyString += ` ${wasCutOffYo} ${phoneNumber} (${callLength} ${pluralOrSingular}),`
        })


        return historyString.slice(0, historyString.length-1)
    }
}
