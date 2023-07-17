token = localStorage.getItem("token");

// Create a new XMLHttpRequest object
const xhr = new XMLHttpRequest();
// Configure the request
xhr.open('GET', 'http://localhost:8050/api/booking_dates', true);
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
        const excludedProperties = ['booking_date', 'price', 'should_confirm', 'should_pay', 'is_picked', 'user_id'];

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
            theme: "Midnight Blue",
            'todayHighlight' : true,
            calendarEvents: [
                ...data // Spread the modifiedData array here
            ]
        });
    });
}

$("#calendar").on('selectEvent', function(event, activeEvent) {
    console.log("Miao aw event");
    console.log(this);
    //console.log(event);
    console.log(activeEvent);
    deleteElement();
    var deletedId = activeEvent['id']

    // Find the container element with the class 'calendar-events'
    var container = document.querySelector('.calendar-events');

    // Create a new button element
    var newButton = document.createElement('button');
    newButton.textContent = 'Delete';
    newButton.classList.add('custom-button');

    // Add a click event handler to send the delete request
    newButton.addEventListener('click', function() {
        var bookingId = deletedId; // Replace with the actual booking ID
        var deleteUrl = 'http://localhost:8050/api/booking_dates/' + bookingId;

        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', deleteUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        xhr.onload = function() {
            if (xhr.status === 204) {
            // Request was successful
            console.log('Booking deleted successfully');
            location.reload()
            } else {
            // Request failed
            console.error('Error:', xhr.status);
            }
        };
        xhr.onerror = function() {
            console.error('Network Error');
        };
        xhr.send();
    });

    // Append the new button to the container
    container.appendChild(newButton);
});
function deleteElement() {
const element = document.querySelector('.custom-button');
if (element) {
    element.remove();
}
}