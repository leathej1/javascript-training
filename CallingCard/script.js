document.addEventListener('DOMContentLoaded', function () {

    let card = new CallingCard(20, 2)
    let phone = new CellPhone(card)
    card.calculateRemaingMinutes()
    card.getRemainingMinutes()
    card.getRemainingFunds()

    // Start call button event listener
    var startCall = document.getElementById('start-call-button')
    startCall.addEventListener('click', function (event) {
        event.preventDefault()
        var newPhoneNumber = document.getElementById('phone-number-input').value
        phone.startCall(newPhoneNumber)
    })

    // End call button event listener 
    var endCall = document.getElementById('end-call-button')
    endCall.addEventListener('click', function (event) {
        event.preventDefault()
        phone.endCall()        
        card.getRemainingMinutes()
        card.getRemainingFunds()
    })

    // Add funds button event listener
    var addFunds = document.getElementById('add-funds-button')
    addFunds.addEventListener('click', function (event) {
        event.preventDefault()
        var fundsToAdd = document.getElementById('funds-input').value
        console.log('Adding $', fundsToAdd)
        card.addDollars(fundsToAdd)
    })

    // Clear history button event listener
    var historyClearButton = document.getElementById('clear-history-button')
    historyClearButton.addEventListener('click', function (event) {
        document.getElementById('call-history-list').innerHTML = ""
    })
})