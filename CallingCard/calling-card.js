class CallingCard {
	constructor (cardRate, balanceInDollars) {
		this.cardRate = cardRate
		this.balanceInDollars = 0
	}
  
	addDollars(dollarsToAdd) {		
		this.balanceInDollars += dollarsToAdd * 1
		this.balanceInMinutes = Math.floor((dollarsToAdd * 100) / this.cardRate) * 1
		this.getRemainingMinutes()
		this.getRemainingFunds()
		document.getElementById('remaining-minutes-text').innerHTML = this.balanceInMinutes
		//dollarsToAdd = 0
		return this.balanceInMinutes    
	}
  
	useMinutes(minutesToUse) {
	this.balanceInMinutes -= minutesToUse
	if (this.balanceInMinutes < 0) {
		this.balanceInMinutes = 0
	  }
		getRemainingMinutes()
	}
  
	getRemainingFunds() {
		console.log('Current funds balance: $', this.balanceInDollars)
		document.getElementById('remaining-funds-text').innerHTML = this.balanceInDollars
		return this.balanceInDollars
	}

	getRemainingMinutes() {
		this.balanceInMinutes = Math.floor((this.balanceInDollars * 100) / this.cardRate) * 1
		console.log('Your remaining minutes: ', this.balanceInMinutes, 'min')
		document.getElementById('remaining-minutes-text').innerHTML = this.balanceInMinutes
		return this.balanceInMinutes
	}
  }