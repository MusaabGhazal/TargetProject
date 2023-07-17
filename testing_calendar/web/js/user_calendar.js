token = localStorage.getItem('token')
console.log(token);
// Create a new XMLHttpRequest object
const xhr = new XMLHttpRequest();
// Configure the request
xhr.open('GET', 'http://localhost:8050/api/booking_dates_available', true);
// Set headers (optional)
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Authorization', 'Bearer ' + token);
// Handle the response
xhr.onload = function() {
    if (xhr.status === 200) {
        // Request was successful
        const responseData = JSON.parse(xhr.responseText);
        console.log('Response:', responseData);

        // Define the properties to exclude
        //const excludedProperties = ['booking_date', 'price', 'should_confirm', 'should_pay', 'is_picked', 'user_id'];
        const excludedProperties = ['booking_date', 'price', 'should_confirm', 'is_picked', 'user_id'];
        // Iterate over the objects and create a new JSON with extra properties
        const modifiedData = responseData.map(obj => {
            // Create a copy of the object using object destructuring
            let modifiedObj = { ...obj };

            // Delete the excluded properties from the copied object
            excludedProperties.forEach(prop => delete modifiedObj[prop]);

            // Add extra properties to the modified object
            modifiedObj.name = "This is object with price: " + obj.price;
            modifiedObj.date = obj.booking_date;
            modifiedObj.type = "event";
            modifiedObj.everyYear = obj.should_pay; // this is an illegal way to pass should_pay

            return modifiedObj;
        });
        console.log('Modified:', modifiedData);

        // Call a function to initialize the calendar with modifiedData
        initializeCalendar(modifiedData);
    } else {
        // Request failed
        console.error('Error:', xhr.status);
    }
};
// Handle network errors
xhr.onerror = function() {
    console.error('Network Error');
};
// Send the request
xhr.send();

// Function to initialize the calendar with the provided data
function initializeCalendar(data) {
    $(document).ready(function() {
        $('#calendar').evoCalendar({
            theme: "Royal Navy",
            'todayHighlight' : true,
            calendarEvents: [
                ...data, // Spread the modifiedData array here
            ]
        });
    });
}

$("#calendar").on('selectEvent', function(event, activeEvent) {
    console.log("Miao aw event");
    console.log(this);
    console.log(activeEvent);
    redirectToDataPage(activeEvent);
});

function redirectToDataPage(jsonData) {
// Convert the JSON object to a string
var jsonString = JSON.stringify(jsonData, null, 2);

// Save the JSON string to local storage
localStorage.setItem('jsonData', jsonString);

// Redirect to the new page
window.location.href = 'view_item.html';
}