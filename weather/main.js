document.getElementById('cityForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
  
    // Get the value of the input field
    var cityInput = document.getElementById('cityInput').value;
  
    // Update the city name on the page
    document.getElementById('city').textContent = cityInput;
  
    // Clear the input field
    document.getElementById('cityInput').value = '';
  });
  