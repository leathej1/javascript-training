document.addEventListener('DOMContentLoaded', function() {

    let card = new CallingCard(20, 2)

    card.addDollars(2)

    // Target the phone number field
    var dialer = document.getElementById('button-start')

    // Add click event listener for button
    dialer.addEventListener('click', function(event) {

        // Prevent the page from reloading
        event.preventDefault()

        // Target the phone number value field
        var newPhoneNumber = document.getElementById('phone-number-input')

        // Create a list item for the call history
        createListItem(newPhoneNumber.value)
    })

    // Target the add funds field
    var funder = document.getElementById('button-add-funds')

    // Add click event handler for add funds button
    funder.addEventListener('click', function(event) {
        
        // Prevent the page from reloading
        event.preventDefault()

        // Target the funds value field
        var fundsToAdd = document.getElementById('funds-input').value

        // Log the value that we are adding
        console.log('Adding $', fundsToAdd)

        // Call the function to add the funds
        card.addDollars(fundsToAdd)
    })

    // Clear call history on button submit
    var historyClearButton = document.getElementById('clear-history-button')

    // Listen for button push
    historyClearButton.addEventListener('click', function(event) {            
        
        // Clear the call history list
        document.getElementById('call-history-list').innerHTML = ""
    })

    function createListItem(callHistoryText) {
        // Create a new list item element
        var newCallHistoryItem = document.createElement('li')

        // Add the call to the call history
        newCallHistoryItem.innerText = callHistoryText

        // Log the new callnumber
        console.log('New call: ', callHistoryText)
        
        // Target the call history list
        var callHistoryList = document.getElementById('call-history-list')

        // Add a new li for the new call history item
        callHistoryList.appendChild(newCallHistoryItem)
    }
})