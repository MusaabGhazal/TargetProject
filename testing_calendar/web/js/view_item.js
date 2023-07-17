// Retrieve the stored JSON data from local storage
var jsonData = localStorage.getItem('jsonData');

// Parse the JSON string to a JavaScript object
var data = JSON.parse(jsonData);

var reserveButton = document.querySelector(".book-button");
if (data.everyYear === false) {
    reserveButton.classList.remove("disabled");
}

// Display the data on the HTML page
var jsonElement = document.getElementById('json-data');
jsonElement.textContent = JSON.stringify(data, null, 2);

//userId = 5;
token = localStorage.getItem('token');
userId = localStorage.getItem(token);
bookingDateId = data.id;

console.log(userId);
console.log(bookingDateId);

var jsonData = {
    user_id: parseInt(userId),
    booking_date_id: bookingDateId,
    is_paid: false,
  };

  var url = "http://localhost:8050/api/bookings";

  var bookButton = document.querySelector(".book-button");
  bookButton.addEventListener("click", booker);
  
  const params = new URLSearchParams();
  params.append('prod_id', data.prod_id);

  var payButton = document.querySelector(".pay-button");
  payButton.addEventListener("click", function () {
    if (!payButton.classList.contains("disabled")) {
     
    handle=  async ()=>{
      const res = await fetch('http://localhost:8050/api/payment?' + params.toString() , {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : "Bearer " + token,
        },
      })
      const body = await res.json()
      window.location.href = body.url;
    }
    handle()
  } 
  });

  function booker(){
    if (!bookButton.classList.contains("disabled")) {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : "Bearer " + token
        },
        body: JSON.stringify(jsonData)
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
              body: JSON.stringify(jsonData)
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
    }
  }