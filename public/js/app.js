const weatherForm = document.querySelector('form');
const search = document.getElementById('address');
const forecastPara = document.getElementById('forecast');
const locationPara = document.getElementById('location');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    if(location === '' || location === undefined) {
        console.log("You must provide a location");
    }
    else {
        fetch('/weather?address='+encodeURIComponent(location))
        .then((response) => {
            response.json()
            .then((data) => {
                if(data.error) {
                    console.log(data.error);
                }
                else {
                    console.log(data);
                    forecastPara.textContent = "Forecast:- " + data.forecast;
                    locationPara.textContent = "Location:- " + data.location;
                }
            });
        });
    }
});
