document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("bookingForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const origin = document.getElementById("origin").value.toUpperCase();
    const destination = document
      .getElementById("destination")
      .value.toUpperCase();
    const departDate = document.getElementById("departDate").value;
    const returnDateInput = document.getElementById("returnDate");
    const returnDate = returnDateInput.value.trim() || "?";

    const apiUrl = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${origin}&destination=${destination}&departure_at=${departDate}&return_at=${returnDate}&unique=false&sorting=price&direct=false&cy=usd&limit=100&page=1&one_way=true&token=68c8d51767738a645284362284adb3f4`;

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Populate the table with the fetched data
        const flightDataBody = document.getElementById("flightDataBody");
        flightDataBody.innerHTML = ""; // Clear existing data

        if (data.success && data.data.length > 0) {
          data.data.forEach((flight) => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${flight.origin}</td>
              <td>${flight.destination}</td>
              <td>${flight.price}</td>
              <td>${flight.airline}</td>
              <td>${flight.flight_number}</td>
              <td>${flight.departure_at}</td>
              <td>${flight.return_at}</td>
              <td>${flight.transfers}</td>
            `;
            flightDataBody.appendChild(row);
          });

          // Show the modal with the table
          $("#flightDataModal").modal("show");
        } else {
          // Handle the case when no data is found
          alert("No flight data found for the selected criteria.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("An error occurred while fetching flight data.");
      });
  });
});
