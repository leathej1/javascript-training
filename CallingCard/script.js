document.addEventListener('DOMContentLoaded', function() {

    let card = new CallingCard(20, 2)

    let phone = new CellPhone(card)

    card.calculateRemaingMinutes()
    
    card.getRemainingMinutes()
    
    card.getRemainingFunds()

    // Target the phone number field
    var startCall = document.getElementById('start-call-button')

    // Add click event listener for start call button
    startCall.addEventListener('click', function() {

        // Prevent the page from reloading
        event.preventDefault()

        // Target the phone number value field
        var newPhoneNumber = document.getElementById('phone-number-input').value        
        
        // Format the phone number with regex for display purposes
        var formattedPhoneNumber = formatPhoneNumber(newPhoneNumber)

        phone.startCall(formattedPhoneNumber)

        phone.remainingMinutes = card.getRemainingMinutes()

        // Create a list item for the call history
        if (newPhoneNumber * 1 > 1000000000) {
            console.log('Number', formattedPhoneNumber, 'meets requirements')
            createListItem(formattedPhoneNumber)
        } else {
            console.log('Number', newPhoneNumber, 'does not meet requirements')
        }  

    // Target the end call button   
    var endCall = document.getElementById('end-call-button')

    // Add a click listener for the end call button
    endCall.addEventListener('click', function() {       
                
        // Prevent the page from reloading
        event.preventDefault()

        phone.endCall()

        card.useMinutes(1)
    })

    // Target the add funds field
    var funder = document.getElementById('add-funds-button')

    // Add click event handler for add funds button
    funder.addEventListener('click', function() {
        
        // Prevent the page from reloading
        event.preventDefault()

        // Target the funds value field
        var fundsToAdd = document.getElementById('funds-input').value

        // Log the value that we are adding
        console.log('Adding $', fundsToAdd)

        // Call the function to add the funds
        card.addDollars(fundsToAdd)
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
    
    // Clear call history on button submit
    var historyClearButton = document.getElementById('clear-history-button')

    // Listen for button push
    historyClearButton.addEventListener('click', function() {            
        
        // Clear the call history list
        document.getElementById('call-history-list').innerHTML = ""
    })

    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return null
      }
    })
})