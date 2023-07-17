var jsonData = localStorage.getItem('jsonData');
var data = JSON.parse(jsonData);
token = localStorage.getItem('token');
userId = localStorage.getItem(token);
bookingDateId = data.id;

console.log(userId);
console.log(bookingDateId);

var url = "http://localhost:8050/api/bookings";

var jsonDataModified = {
    user_id: parseInt(userId),
    booking_date_id: bookingDateId,
    is_paid: true,
  };
  
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : "Bearer " + token
    },
    body: JSON.stringify(jsonDataModified)
  })
    .then(response => {
      if (response.ok) {
        console.log("Booking request sent successfully!");

        // Make PUT request to update booking date
        var putUrl = `http://localhost:8050/api/booking_dates/pick/${bookingDateId}`;
        window.location.href = "user_calendar.html";
        return fetch(putUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + token
          },
          body: JSON.stringify(jsonDataModified)
        });
      } else {
        throw new Error("Error sending booking request.");
      }
    })
    .then(response => {
      if (response.ok) {
        console.log("Booking date updated successfully!");
      } else {
        throw new Error("Error updating booking date.");
      }
    })
    .catch(error => {
      console.error(error);
    });