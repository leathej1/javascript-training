class CellPhone extends CallingCard {
    constructor(card, balanceInMinutes, balanceInDollars) {
        super(card, balanceInMinutes, balanceInDollars)
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
        if (phoneNumber * 1 > 1000000000) {
            var formattedPhoneNumber = this.formatPhoneNumber(phoneNumber)
            console.log('Number', formattedPhoneNumber, 'meets requirements')            
        } else {
            console.log('Number', phoneNumber, 'does not meet requirements')
        }        
        if (this.balanceInMinutes > 0) {
            this.currCall.phoneNumber = phoneNumber
            this.currCall.callLength = 0
            this.currCall.wasCutOff = false
            super.createListItem(formattedPhoneNumber)
            console.log('Starting call...')
        } else {
            console.log('Insufficient funds')
            return
        }
    }

    endCall() {
        if (this.phoneNumber == null) {
            console.log('No calls are currently active')
        } else {
            //this.prevCalls.push(this.currCall)
            super.useMinutes(1)
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
