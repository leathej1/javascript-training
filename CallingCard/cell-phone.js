class CellPhone extends CallingCard {
    constructor(card, balanceInMinutes, balanceInDollars) {
        super(balanceInMinutes, balanceInDollars)
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

    startCall(phoneNumber) {
        if (this.remainingMinutes < 1) {
            console.log('Insufficient funds')
        } else {
            this.currCall.phoneNumber = phoneNumber
            this.currCall.callLength = 0
            this.currCall.wasCutOff = false
            console.log('Starting call...')
        }
    }

    endCall() {
        if (this.currCall.phoneNumber == null) {
            console.log('No calls are currently active')
        } else {
            //this.prevCalls.push(this.currCall)
            // super.useMinutes(1)
            // super.getRemainingMinutes()
            // super.getRemainingFunds()
            document.getElementById('phone-number-input').value = ""
            console.log('Ending call...')
        }
    }

    tick() {
        this.currCall.callLength++
        this.remainingMinutes--
        console.log('Tick')
        if (this.remainingMinutes === 0) {
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

        return historyString.slice(0, historyString.length - 1)
    }
}
