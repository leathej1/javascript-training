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
        var formattedPhoneNumber = formatPhoneNumber(newPhoneNumber)
        phone.startCall(formattedPhoneNumber)

        // Create a list item for the call history
        if (newPhoneNumber * 1 > 1000000000) {
            console.log('Number', formattedPhoneNumber, 'meets requirements')
            createListItem(formattedPhoneNumber)
        } else {
            console.log('Number', newPhoneNumber, 'does not meet requirements')
        }
    })

    // End call button event listener 
    var endCall = document.getElementById('end-call-button')
    endCall.addEventListener('click', function (event) {
        event.preventDefault()
        phone.endCall()
        card.useMinutes(1)
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

    // Format phone number
    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return null
    }

    // Create history list item
    function createListItem(callHistoryText) {
        var newCallHistoryItem = document.createElement('li')
        newCallHistoryItem.innerText = callHistoryText
        console.log('New call: ', callHistoryText)
        var callHistoryList = document.getElementById('call-history-list')
        callHistoryList.appendChild(newCallHistoryItem)
    }
})