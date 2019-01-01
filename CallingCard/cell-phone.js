class CellPhone {
    constructor(card) {
        this.card = card
        this.remainingMinutes = card.balanceInMinutes
        this.reminingFunds = card.balanceInDollars
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
        if (this.isTalking === true) {
            console.log('Call already in progress')
            return
        }
        if (phoneNumber * 1 > 1000000000) {
            var formattedPhoneNumber = this.formatPhoneNumber(phoneNumber)
            console.log('Number', formattedPhoneNumber, 'meets requirements')
        } else {
            console.log('Number', phoneNumber, 'does not meet requirements')
            return
        }
        if (this.card.balanceInMinutes > 0) {
            this.currCall.phoneNumber = phoneNumber
            this.currCall.callLength = 0
            this.currCall.wasCutOff = false
            this.createListItem(formattedPhoneNumber)
            console.log('Starting call...')
            this.isTalking = true
        } else {
            console.log('Insufficient funds')
            return
        }
    }

    endCall() {
        if (this.currCall.phoneNumber == null) {
            console.log('No calls are currently active')
        } else {
            //this.prevCalls.push(this.currCall)
            this.isTalking = false
            this.useMinutes(1)
            document.getElementById('phone-number-input').value = ""
            console.log('Ending call...')
            this.card.getRemainingMinutes()
            this.card.getRemainingFunds()
            this.currCall.phoneNumber = null
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

    // Format phone number
    formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return null
    }

    // Create history list item
    createListItem(callHistoryText) {
        var newCallHistoryItem = document.createElement('li')
        newCallHistoryItem.innerText = callHistoryText
        var callHistoryList = document.getElementById('call-history-list')
        callHistoryList.appendChild(newCallHistoryItem)
    }

    useMinutes(minutesToUse) {
        this.card.balanceInMinutes -= minutesToUse
        if (this.card.balanceInMinutes < 0) {
            this.card.balanceInMinutes = 0
        }
    }
}
