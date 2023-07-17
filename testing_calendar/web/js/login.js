document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8050/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Login successful
                var response = JSON.parse(xhr.responseText);
                var role = response.role;

                localStorage.setItem('token', response.token);
                localStorage.setItem(response.token, response.id);

                if (role === 'ADMIN') {
                    window.location.href = 'booking_dates_calendar.html';
                } else if (role === 'USER') {
                    window.location.href = 'user_calendar.html';
                } else {
                    console.error('Invalid role:', role);
                }
            } else {
                // Login failed
                console.error('Error:', xhr.status);
            }
        };
        xhr.onerror = function() {
            console.error('Network Error');
        };
        xhr.send(JSON.stringify({ username: username, password: password }));
    });
});