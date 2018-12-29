class CellPhone {
    constructor(card) {
        this.card = card
        this.isTalking = false
        this.callLength = 0
        this.remainingMinutes = this.remainingMinutes
        this.currCall = {
            callLength: 0,
            phoneNumber: this.formattedPhoneNumber,
            wasCutOff: false
        }
        this.prevCalls = []
    }

    isTalking() {
        return this.currCall.callLength > 0 ? true : false
    }

    startCall(phoneNumber) {
        this.currCall.phoneNumber = phoneNumber
        this.currCall.callLength = 0
        this.currCall.wasCutOff = false
        console.log('Starting call...')
    }

    endCall() {
        if (this.currCall.phoneNumber == '') {
            console.log('No calls are currently active')
        } else {
            this.prevCalls.push(this.currCall)
            this.currCall = {}
            console.log('Ending call...')
        }
    }

    tick() {
        this.currCall.callLength++
        this.remainingMinutes--
        console.log('Tick')
        if(this.remainingMinutes === 0) {
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
