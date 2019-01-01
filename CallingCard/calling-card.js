class CallingCard {
	constructor(cardRate) {
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
}