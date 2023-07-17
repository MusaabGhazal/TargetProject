token = localStorage.getItem("token");
userId = localStorage.getItem(token);
console.log(userId);
document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var bookingDate = (document.getElementById("booking_date").value) + "T00:00:00Z";
    var price = parseFloat(document.getElementById("price").value);
    var shouldConfirm = document.getElementById("should_confirm").checked;
    var shouldPay = document.getElementById("should_pay").checked;
    var isPicked = false;
    //var userId = 1 //CHANGE IT TO NULL LATER ON
    // Edit : we might need to change it to the session id (current admin Id)
    //MUSAAB NOTE
    ///////////////
    //THIS IS ME 

    // Send the data to the backend using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8050/api/booking_dates");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert("Booking added successfully!");
                window.location.href = "booking_dates_calendar.html";
            } else {
                alert("Failed to add booking.");
            }
        }
    };

    var data = JSON.stringify({
        booking_date: bookingDate,
        price: price,
        should_confirm: shouldConfirm,
        should_pay: shouldPay,
        is_picked: isPicked,
        user_id: parseInt(userId)
    });

    xhr.send(data);
});