class CellPhone {
    constructor(card) {
        this.card = card
        this.remainingMinutes = card.balanceInMinutes
        this.reminingFunds = card.balanceInDollars
        this.startTime = ''
        this.endTime = ''
        this.isTalking = false
        this.callLength = 0
        this.currCall = {
            callLength: 0,
            phoneNumber: '',
            wasCutOff: false
        }
        this.prevCalls = []
    }

    updateStatus(statusMessage, color) {
        document.getElementById('status').innerHTML = statusMessage
        document.getElementById('status').style.color = color
    }

    isTalking() {
        return this.currCall.callLength > 0 ? true : false
    }

    startCall(phoneNumber) {
        if (this.isTalking === true) {
            console.log('Call already in progress')
            return
        }
        if (phoneNumber.length === 10 && phoneNumber > 1000000000 * 1) {
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
            this.isTalking = true
            this.startTimer()
            this.updateStatus('Call in progress', 'red')
            document.getElementById('phone-number-input').value = formattedPhoneNumber
        } else {
            console.log('Insufficient funds')
            return
        }
    }

    startTimer() {
        this.startTime = new Date()
        var formattedStart = this.startTime.toLocaleString()
        console.log('Starting call at', formattedStart)
    }

    endCall() {
        if (this.currCall.phoneNumber == null) {
            console.log('No calls are currently active')
        } else {
            //this.prevCalls.push(this.currCall)
            this.isTalking = false
            var currentPhoneNumber = document.getElementById('phone-number-input').value
            this.updateStatus('Call ended', 'green')
            var usedTime = this.endTimer()
            this.createListItem(currentPhoneNumber, usedTime)
            this.card.getRemainingMinutes()
            this.card.getRemainingFunds()
            this.currCall.phoneNumber = null
            document.getElementById('phone-number-input').value = ""
        }
    }

    endTimer() {
        this.endTime = new Date()
        var formattedEnd = this.endTime.toLocaleString()
        var usedTime = (this.endTime.getTime() - this.startTime.getTime()) / 60000
        console.log('Ending call at', formattedEnd)
        console.log('Call length:', usedTime.toFixed(2), 'minutes')
        this.card.balanceInMinutes = (this.card.balanceInMinutes - usedTime.toFixed(2))
        if (this.card.balanceInMinutes === 0) {
            this.currCall.wasCutOff = true
            this.card.endCall()
        }
        return usedTime
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
    createListItem(callHistoryText, usedTime) {
        var newCallHistoryItem = document.createElement('li')
        newCallHistoryItem.innerText = callHistoryText + ' : ' + usedTime.toFixed(2) + ' minutes'
        var callHistoryList = document.getElementById('call-history-list')
        callHistoryList.appendChild(newCallHistoryItem)
    }

    // // Decrement card time balance by a given amount
    // useMinutes(minutesToUse) {
    //     this.card.balanceInMinutes -= minutesToUse
    //     if (this.card.balanceInMinutes < 0) {
    //         this.card.balanceInMinutes = 0
    //     }
    // }
}
