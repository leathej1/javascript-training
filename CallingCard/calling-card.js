class CallingCard {
	constructor(cardRate) {
		this.cardRate = cardRate
		this.balanceInMinutes = 0
		this.balanceInDollars = 0
	}

	// Calculates the remaining minutes based on card fund balance and rate
	calculateRemaingMinutes() {
		this.balanceInMinutes = Math.floor(this.balanceInDollars / this.cardRate * 100)
		return this.balanceInMinutes.toFixed(2)
	}

	// Calculated the remaining funds based on card minutes balance and rate
	calculateRemaingDollars() {
		this.balanceInDollars = this.balanceInMinutes * this.cardRate / 100
		return this.balanceInDollars.toFixed(2)
	}

	// Checks for a valid dollar amount then adds funds and recalculates
	addDollars(dollarsToAdd) {
		if (dollarsToAdd !== '' && dollarsToAdd !== '0') {
			this.balanceInDollars += dollarsToAdd * 1
			console.log('Adding $' + dollarsToAdd)
			this.calculateRemaingMinutes()
			this.getRemainingMinutes()
			this.getRemainingFunds()
			document.getElementById('funds-input').value = ""
		} else {
			console.log('No fund value supplied')
		}
	}

	// Sets the remaining minutes value on the page
	getRemainingMinutes() {
		if (this.balanceInMinutes !== 1) {
			console.log('Remaining time: ', this.balanceInMinutes.toFixed(2), 'minutes')
			document.getElementById('remaining-minutes-text').innerHTML = "Remaining time: " + this.balanceInMinutes.toFixed(2) + " minutes"
		} else {
			console.log('Remaining time: ', this.balanceInMinutes.toFixed(2), 'minute')
			document.getElementById('remaining-minutes-text').innerHTML = "Remaining time: " + this.balanceInMinutes.toFixed(2) + " minute"
		}
	}

	// Sets the remaining funds value on the page
	getRemainingFunds() {
		this.calculateRemaingDollars()
		console.log('Current balance: $', this.balanceInDollars.toFixed(2))
		document.getElementById('remaining-funds-text').innerHTML = "Current balance: $" + this.balanceInDollars.toFixed(2)
	}
}