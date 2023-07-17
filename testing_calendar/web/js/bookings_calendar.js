/*// Create a new XMLHttpRequest object
const xhr = new XMLHttpRequest();
// Configure the request
xhr.open('GET', 'http://localhost:8050/booking_dates_picked', true);
// Set headers (optional)
xhr.setRequestHeader('Content-Type', 'application/json');
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
            modifiedObj.name = "price: " + obj.price;
            modifiedObj.date = obj.booking_date;
            modifiedObj.type = "event";

            return modifiedObj;
        });
        console.log('Modified:', modifiedData);

        // Call a function to initialize the calendar with modifiedData
        initializeCalendar(modifiedData);
    } 
    else if(xhr.status === 204){
        $(document).ready(function() {
            $('#calendar').evoCalendar({
                'todayHighlight' : true
            })
        })
    }
    else {
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
            theme: "Default",
            'todayHighlight' : true,
            calendarEvents: [
                ...data, // Spread the modifiedData array here
            ]
        });
    });
}

$("#calendar").on('selectEvent', function(event, activeEvent) {
    console.log(this);
    console.log(activeEvent);
    deleteElement();
    var deletedId = activeEvent['id']

    // Find the container element with the class 'calendar-events'
    var container = document.querySelector('.calendar-events');

    // Create a new button element
    var newButton = document.createElement('button');
    newButton.textContent = 'Cancel Reservations';
    newButton.classList.add('custom-button');

    // Add a click event handler to send the delete request
    newButton.addEventListener('click', function() {
    var bookingId = deletedId; // Replace with the actual booking ID
    var deleteUrl = 'http://localhost:8050/bookings/' + bookingId;
    var updateUrl = 'http://localhost:8050/booking_dates/' + bookingId;

    var deleteXhr = new XMLHttpRequest();
    deleteXhr.open('DELETE', deleteUrl, true);
    deleteXhr.setRequestHeader('Content-Type', 'application/json');
    deleteXhr.onload = function() {
        if (deleteXhr.status === 204) {
            // DELETE request was successful
            console.log('Booking deleted successfully');

            var updateXhr = new XMLHttpRequest();
            updateXhr.open('PUT', updateUrl, true);
            updateXhr.setRequestHeader('Content-Type', 'application/json');
            updateXhr.onload = function() {
                if (updateXhr.status === 204) {
                    // PUT request was successful
                    console.log('Booking updated successfully');
                    location.reload();
                } else {
                    // PUT request failed
                    console.error('Error:', updateXhr.status);
                }
            };
            updateXhr.onerror = function() {
                console.error('Network Error');
            };
            updateXhr.send();
        } else {
            // DELETE request failed
            console.error('Error:', deleteXhr.status);
        }
    };
    deleteXhr.onerror = function() {
        console.error('Network Error');
    };
    deleteXhr.send();
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
*/
///////////////////////////////////////////////////
/// Alternative Test:
token = localStorage.getItem("token");
const xhr = new XMLHttpRequest();
// Configure the request
xhr.open('GET', 'http://localhost:8050/api/bookings', true);
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
        const excludedProperties = ['booking_date_id','booking_date', 'price', 'should_confirm', 'should_pay', 'is_picked', 'user_id', 'is_cancelled', 'is_confirmed', 'is_paid'];

        // Iterate over the objects and create a new JSON with extra properties
        const modifiedData = responseData.map(obj => {
            // Create a copy of the object using object destructuring
            let modifiedObj = { ...obj };

            // Delete the excluded properties from the copied object
            excludedProperties.forEach(prop => delete modifiedObj[prop]);

            // Add extra properties to the modified object
            modifiedObj.id = obj.booking_date_id;
            modifiedObj.name = "price: " + obj.price;
            modifiedObj.date = obj.booking_date;
            modifiedObj.type = "event";

            return modifiedObj;
        });
        console.log('Modified:', modifiedData);

        // Call a function to initialize the calendar with modifiedData
        initializeCalendar(modifiedData);
    } 
    else if(xhr.status === 204){
        $(document).ready(function() {
            $('#calendar').evoCalendar({
                'todayHighlight' : true
            })
        })
    }
    else {
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
            theme: "Default",
            'todayHighlight' : true,
            calendarEvents: [
                ...data, // Spread the modifiedData array here
            ]
        });
    });
}

$("#calendar").on('selectEvent', function(event, activeEvent) {
    console.log(this);
    console.log(activeEvent);
    deleteElement();
    var deletedId = activeEvent['id']

    // Find the container element with the class 'calendar-events'
    var container = document.querySelector('.calendar-events');

    // Create a new button element
    var newButton = document.createElement('button');
    newButton.textContent = 'Cancel Reservations';
    newButton.classList.add('custom-button');

    // Add a click event handler to send the delete request
    newButton.addEventListener('click', function() {
    var bookingId = deletedId; // Replace with the actual booking ID
    var deleteUrl = 'http://localhost:8050/api/bookings/' + bookingId;
    var updateUrl = 'http://localhost:8050/api/booking_dates/' + bookingId;

    var deleteXhr = new XMLHttpRequest();
    deleteXhr.open('DELETE', deleteUrl, true);
    deleteXhr.setRequestHeader('Content-Type', 'application/json');
    deleteXhr.setRequestHeader('Authorization', 'Bearer ' + token);
    deleteXhr.onload = function() {
        if (deleteXhr.status === 204) {
            // DELETE request was successful
            console.log('Booking deleted successfully');

            var updateXhr = new XMLHttpRequest();
            updateXhr.open('PUT', updateUrl, true);
            updateXhr.setRequestHeader('Content-Type', 'application/json');
            updateXhr.setRequestHeader('Authorization', 'Bearer ' + token);
            updateXhr.onload = function() {
                if (updateXhr.status === 204) {
                    // PUT request was successful
                    console.log('Booking updated successfully');
                    location.reload();
                } else {
                    // PUT request failed
                    console.error('Error:', updateXhr.status);
                }
            };
            updateXhr.onerror = function() {
                console.error('Network Error');
            };
            updateXhr.send();
        } else {
            // DELETE request failed
            console.error('Error:', deleteXhr.status);
        }
    };
    deleteXhr.onerror = function() {
        console.error('Network Error');
    };
    deleteXhr.send();
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
