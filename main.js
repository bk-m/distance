const zipStartInput = document.querySelector('#zipStartInput');
const zipEndInput = document.querySelector('#zipEndInput');
const startSpan = document.querySelector('#start');
const endSpan = document.querySelector('#end');
const distanceSpan = document.querySelector('#distance');

let startZip = null;
let endZip = null;

function getZipData(zip) {
    const baseUrl = 'https://zip-api.eu/api/v1/info/DE-';

    return fetch(`${baseUrl}${zip}`).then(function(response) {
            return response.json();
        }).catch((err) => {
            console.log('Fetch Error: ', err);
        });
}

function getDistanceData(zip1, zip2) {
    const url = `https://zip-api.eu/api/v1/distance/DE-${zip1}/DE-${zip2}`;

    return fetch(url).then(function(response) {
            return response.json();
        }).catch((err) => {
            console.log('Fetch Error: ', err);
        });
}

function updateDistanceSpan(distance, unit) {
    distanceSpan.innerHTML = `Distance: ${distance.toFixed(2)} ${unit} (straight-line)`;
}

zipStartInput.addEventListener("input", () => {
    const value = zipStartInput.value;
    if (value.match(/[0-9]{5}/)) {
        startZip = value;
        getZipData(value).then((resp) => {
            if (resp) {
                startSpan.innerHTML = `Start: ${resp.place_name}`;
                if (endZip) {
                    getDistanceData(value, endZip).then((resp2) => {
                        if (resp2) {
                            updateDistanceSpan(resp2.distance, resp2.unit)
                        }
                    });
                }
            }
        });
    }
});

zipEndInput.addEventListener("input", () => {
    const value = zipEndInput.value;
    if (value.match(/[0-9]{5}/)) {
        endZip = value;
        getZipData(value).then((resp) => {
            if (resp) {
                endSpan.innerHTML = `End: ${resp.place_name}`;
                if (startZip) {
                    getDistanceData(value, startZip).then((resp2) => {
                        if (resp2) {
                            updateDistanceSpan(resp2.distance, resp2.unit)
                        }
                    });
                }
            }
        });
    }
});