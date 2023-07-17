// Make a GET request to retrieve booking dates by user ID
/*var jsonData;

function getBookingDatesByUserID(userID) {
    return fetch(`http://localhost:8050/booking_dates/user/${userID}`)
      .then(response => response.json())
      .then(data => {
        // Display the JSON response in a neat way
        //const bookingDatesDiv = document.getElementById("booking-dates");
        //bookingDatesDiv.innerHTML = JSON.stringify(data, null, 2);
        console.log(data);
  
        // Return the data
        return data;
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  // Function to create a booking element with button
function createBookingElement(booking) {
    const bookingElement = document.createElement("div");
    bookingElement.className = "booking";
  
    const bookingDetails = document.createElement("div");
    bookingDetails.className = "booking-details";
    bookingDetails.textContent = JSON.stringify(booking);
  
    const bookingButton = document.createElement("button");
    bookingButton.className = "booking-button";
    bookingButton.textContent = "Cancel Booking";
    // Add event listener to the button
    bookingButton.addEventListener("click", function() {
      cancelBooking(booking.id);
    });
  
    bookingElement.appendChild(bookingDetails);
    bookingElement.appendChild(bookingButton);
  
    return bookingElement;
  }
  
  function cancelBooking(bookingId) {
    // Perform reservation logic here
    deleteBooking(bookingId)
      .then(() => {
        return updateBookingDate(bookingId);
      })
      .then(() => {
        console.log("Booking cancelled successfully.");
        // Refresh or redirect to another page if needed
        getBookingDatesByUserID(userID);
        window.location.href = "my_reservations.html";
        // ...
      })
      .catch(error => {
        console.error("Booking cancellation failed:", error);
      })
  }
  
  // Function to delete a booking
  function deleteBooking(bookingId) {
    return fetch(`http://localhost:8050/bookings/${bookingId}`, {
      method: 'DELETE'
    });
  }
  
  // Function to update a booking date
  function updateBookingDate(bookingId) {
    return fetch(`http://localhost:8050/booking_dates/${bookingId}`, {
      method: 'PUT'
    });
  }
  
  // Display the booking elements on the page
  function displayBookings(jsonData) {
    const bookingDatesDiv = document.getElementById("booking-dates");
  
    jsonData.forEach(function(booking) {
      const bookingElement = createBookingElement(booking);
      bookingDatesDiv.appendChild(bookingElement);
    });
  }
  
// Call the API endpoint with a specific user ID
const userID = 5; // Replace with the desired user ID
getBookingDatesByUserID(userID)
  .then(data => {
    // Use the returned data
    displayBookings(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });  
*/
//////////////// MY NEW TEST

var jsonData;
token = localStorage.getItem("token")
const headers = {
  'Content-Type': 'application/json',
  'Authorization': "Bearer "+ token,
};
function getBookingDatesByUserID(userID) {
    return fetch(`http://localhost:8050/api/bookings/${userID}`, {headers})
      .then(response => response.json())
      .then(data => {
        console.log(data);
  
        // Return the data
        return data;
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  // Function to create a booking element with button
function createBookingElement(booking) {
    const bookingElement = document.createElement("div");
    bookingElement.className = "booking";
  
    const bookingDetails = document.createElement("div");
    bookingDetails.className = "booking-details";
    bookingDetails.textContent = JSON.stringify(booking);
  
    const bookingButton = document.createElement("button");
    bookingButton.className = "booking-button";
    bookingButton.textContent = "Cancel Booking";
    // Add event listener to the button
    bookingButton.addEventListener("click", function() {
      cancelBooking(booking.booking_date_id);
    });
  
    bookingElement.appendChild(bookingDetails);
    bookingElement.appendChild(bookingButton);
  
    return bookingElement;
  }
  
  function cancelBooking(bookingId) {
    // Perform reservation logic here
    deleteBooking(bookingId)
      .then(() => {
        return updateBookingDate(bookingId);
      })
      .then(() => {
        console.log("Booking cancelled successfully.");
        // Refresh or redirect to another page if needed
        getBookingDatesByUserID(userID);
        window.location.href = "my_reservations.html";
        // ...
      })
      .catch(error => {
        console.error("Booking cancellation failed:", error);
      })
  }
  
  // Function to delete a booking
  function deleteBooking(bookingId) {
    return fetch(`http://localhost:8050/api/bookings/${bookingId}`, {
      method: 'DELETE'
    , headers: {
      "Content-Type": "application/json",
      "Authorization" : "Bearer " + token
    }});
  }
  
  // Function to update a booking date
  function updateBookingDate(bookingId) {
    return fetch(`http://localhost:8050/api/booking_dates/${bookingId}`, {
      method: 'PUT',
      headers
    });
  }
  
  // Display the booking elements on the page
  function displayBookings(jsonData) {
    const bookingDatesDiv = document.getElementById("booking-dates");
  
    jsonData.forEach(function(booking) {
      const bookingElement = createBookingElement(booking);
      bookingDatesDiv.appendChild(bookingElement);
    });
  }
  
// Call the API endpoint with a specific user ID
token = localStorage.getItem('token');
const userID = localStorage.getItem(token); // Replace with the desired user ID
getBookingDatesByUserID(userID)
  .then(data => {
    // Use the returned data
    displayBookings(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });  