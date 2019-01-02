class CallingCard {
	constructor(cardRate) {
		this.cardRate = cardRate
		this.balanceInMinutes = 0
		this.balanceInDollars = 0
	}

	calculateRemaingMinutes() {
		this.balanceInMinutes = Math.floor((this.balanceInDollars * 100) / this.cardRate) * 1
		return this.balanceInMinutes.toFixed(2)
	}

	calculateRemaingDollars() {
		this.balanceInDollars = Math.floor((this.balanceInMinutes * this.cardRate) * 1)
		return this.balanceInDollars.toFixed(2)
	}

	addDollars(dollarsToAdd) {
		this.balanceInDollars += dollarsToAdd * 1
		console.log('Adding $', dollarsToAdd)
		this.calculateRemaingMinutes()
		this.getRemainingMinutes()
		this.getRemainingFunds()
	}

	getRemainingMinutes() {
		if (this.balanceInMinutes !== 1) {
			console.log('Remaining time: ', this.balanceInMinutes.toFixed(2), 'minutes')
			document.getElementById('remaining-minutes-text').innerHTML = "Remaining time: " + this.balanceInMinutes.toFixed(2) + " minutes"
		} else {
			console.log('Remaining time: ', this.balanceInMinutes.toFixed(2), 'minute')
			document.getElementById('remaining-minutes-text').innerHTML = "Remaining time: " + this.balanceInMinutes.toFixed(2) + " minute"
		}
		return this.balanceInMinutes
	}

	getRemainingFunds() {
		this.balanceInDollars = ((this.balanceInMinutes * this.cardRate) / 100).toFixed(2)
		console.log('Current balance: $', this.balanceInDollars)
		document.getElementById('remaining-funds-text').innerHTML = "Current balance: $" + this.balanceInDollars
		return this.balanceInDollars
	}
}