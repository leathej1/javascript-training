class CallingCard {
	constructor (cardRate, balanceInDollars) {
		this.cardRate = cardRate
		this.balanceInDollars = balanceInDollars
	}
  
	addDollars(dollarsToAdd) {		
		this.balanceInDollars += dollarsToAdd * 1
		this.balanceInMinutes = Math.floor((dollarsToAdd * 100) / this.cardRate) * 1
		this.getRemainingMinutes()
		this.getRemainingFunds()
		return this.balanceInMinutes    
	}
  
	useMinutes(minutesToUse) {
	this.balanceInMinutes -= minutesToUse
	if (this.balanceInMinutes < 0) {
		this.balanceInMinutes = 0
	  }
		getRemainingMinutes()
	}
	
	getRemainingMinutes() {
		this.balanceInMinutes = Math.floor((this.balanceInDollars * 100) / this.cardRate) * 1
		console.log('Remaining minutes: ', this.balanceInMinutes, 'min')
		document.getElementById('remaining-minutes-text').innerHTML = "Remaining minutes: " + this.balanceInMinutes + " min"
		return this.balanceInMinutes
	}
  
	getRemainingFunds() {
		console.log('Current balance: $', this.balanceInDollars)
		document.getElementById('remaining-funds-text').innerHTML = "Current balance: $" + this.balanceInDollars
		return this.balanceInDollars
	}
  }