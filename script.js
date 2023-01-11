// Fetch the latest COVID-19 statistics from a public API
const apiUrl = 'https://api.covid19api.com/summary';
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Update the total case and death counts
    document.getElementById('total-cases').innerHTML = data.Global.TotalConfirmed;
    document.getElementById('total-deaths').innerHTML = data.Global.TotalDeaths;
    // Add a row to the cases by country table for each country
    data.Countries.forEach(country => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${country.Country}</td>
        <td>${country.TotalConfirmed}</td>
        <td>${country.TotalDeaths}</td>
        <td>${Math.round((country.TotalDeaths/country.TotalConfirmed)*100)}%</td>
        `;
      document.getElementById('cases-by-country').appendChild(row);
    });
  })
  // Error Handling with div card
  .catch(error => {
    const errorCard = document.createElement('div');
    errorCard.classList.add('error-card');
    errorCard.innerHTML = `
      <p>An error occurred while fetching COVID-19 data:</p>
      <pre>${error.message}</pre>
      <p>Please try again in a few moments.</p>
    `;
    document.body.appendChild(errorCard);
  });
