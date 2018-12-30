class CallingCard {
	constructor(cardRate, balanceInDollars) {
		this.cardRate = cardRate
		this.balanceInDollars = balanceInDollars
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
		return this.balanceInMinutes
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
		this.balanceInDollars = this.balanceInDollars.toFixed(2)
		console.log('Current balance: $', this.balanceInDollars)
		document.getElementById('remaining-funds-text').innerHTML = "Current balance: $" + this.balanceInDollars
		return this.balanceInDollars
	}
}