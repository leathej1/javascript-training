class CellPhone {
    constructor(card) {
        this.card = card
        this.remainingMinutes = card.balanceInMinutes
        this.reminingFunds = card.balanceInDollars
        this.startTime = ''
        this.endTime = ''
        this.isTalking = false
        this.usedTime = 0
        this.currCall = {
            callLength: 0,
            phoneNumber: '',
            wasCutOff: false
        }
        this.prevCalls = []
    }

    // Set a status message and color on the page
    updateStatus(statusMessage, color) {
        document.getElementById('status').innerHTML = statusMessage
        document.getElementById('status').style.color = color
    }

    // Perform a check of the phone number and start the call and timer
    startCall(phoneNumber) {
        if (this.isTalking === true) {
            console.log('Call already in progress')
            return
        }
        var cleanPhoneNumber = phoneNumber.replace(/\D/g, '')
        if (cleanPhoneNumber.length === 10 && cleanPhoneNumber > 1000000000 * 1) {
            var formattedPhoneNumber = this.formatPhoneNumber(cleanPhoneNumber)
            console.log('Number', formattedPhoneNumber, 'meets requirements')
        } else {
            console.log('Number', phoneNumber, 'does not meet requirements')
            return
        }
        if (this.card.balanceInMinutes > 0) {
            this.currCall.phoneNumber = cleanPhoneNumber
            this.currCall.callLength = 0
            this.currCall.wasCutOff = false
            this.isTalking = true
            this.startTimer()
            this.updateStatus('Call in progress', 'red')
            document.getElementById('phone-number-input').value = formattedPhoneNumber
        } else {
            console.log('Insufficient funds')
            this.wasCutOff = true
            return
        }
    }

    // Capture the start time of the call
    startTimer() {
        this.startTime = new Date()
        var formattedStart = this.startTime.toLocaleString()
        console.log('Starting call at ' + formattedStart)
    }

    // Check if a call is active then ends the call and log the history
    endCall() {
        if (this.currCall.phoneNumber == null) {
            console.log('No calls are currently active')
        } else {
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

    // Capture the end time of the call and calculates the time used
    endTimer() {
        this.endTime = new Date()
        var formattedEnd = this.endTime.toLocaleString()
        var usedTime = (this.endTime.getTime() - this.startTime.getTime()) / 60000
        console.log('Ending call at ' + formattedEnd)
        console.log('Call length:', usedTime.toFixed(2), 'minutes')
        this.card.balanceInMinutes = (this.card.balanceInMinutes - usedTime.toFixed(2))
        if (this.card.balanceInMinutes === 0) {
            this.card.balanceInMinutes = 0
            this.currCall.wasCutOff = true
            this.card.endCall()
        }
        return usedTime
    }

    // Update the page with new data
    updatePage() {
        this.card.getRemainingMinutes()
        this.card.getRemainingFunds()
    }

    // Format the phone number
    formatPhoneNumber(phoneNumber) {
        var match = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/)
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
}
