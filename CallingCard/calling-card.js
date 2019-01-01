class CallingCard {
	constructor(cardRate, balanceInMinutes, balanceInDollars) {
		this.cardRate = cardRate
		this.balanceInMinutes = 0
		this.balanceInDollars = 0
	}

	calculateRemaingMinutes() {
		this.balanceInMinutes = Math.floor((this.balanceInDollars * 100) / this.cardRate) * 1
		return this.balanceInMinutes
	}

	calculateRemaingDollars() {
		this.balanceInDollars = Math.floor((this.balanceInMinutes * this.cardRate) * 1)
		return this.balanceInDollars
	}

	addDollars(dollarsToAdd) {
		this.balanceInDollars += dollarsToAdd * 1
		this.calculateRemaingMinutes()
		this.getRemainingMinutes()
		this.getRemainingFunds()
	}

	useMinutes(minutesToUse) {
		this.balanceInMinutes -= minutesToUse
		if (this.balanceInMinutes < 0) {
			this.balanceInMinutes = 0
		}
	}

	getRemainingMinutes() {
		console.log('Remaining minutes: ', this.balanceInMinutes, 'min')
		document.getElementById('remaining-minutes-text').innerHTML = "Remaining minutes: " + this.balanceInMinutes + " min"
		return this.balanceInMinutes
	}

	getRemainingFunds() {
		this.balanceInDollars = (this.balanceInMinutes * this.cardRate) / 100
		console.log('Current balance: $', this.balanceInDollars)
		document.getElementById('remaining-funds-text').innerHTML = "Current balance: $" + this.balanceInDollars
		return this.balanceInDollars
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
        console.log('New call: ', callHistoryText)
        var callHistoryList = document.getElementById('call-history-list')
        callHistoryList.appendChild(newCallHistoryItem)
    }
}