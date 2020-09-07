const activitiesURL = "http://localhost:3000/api/v1/activities";

const myLatLng = { lat: 47.6205, lng: -122.3493 };

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,

    center: myLatLng,
  });
  const geocoder = new google.maps.Geocoder();
  document.getElementById("submit").addEventListener("click", () => {
    debugger;
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  const address = document.getElementById("address").value;
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      resultsMap.setCenter(results[0].geometry.location);
      new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

function fetchActivities() {
  fetch(activitiesURL)
    .then((response) => response.json())
    .then((activities) =>
      activities.forEach((activity) => combineAddresses(activity))
    );
}

function combineAddresses(activity) {
  const {
    name,
    address,
    city,
    state,
    zipcode,
    description,
    image,
    category,
    comments,
  } = activity;

  const fullAddress = address + ", " + city;
  createMarkers(activity, fullAddress);

  // need to geocode addresses so pass these into a geocoder basically.
}

function createMarkers(activity, fullAddress) {
  console.log(activity);
  console.log(fullAddress);
}

fetchActivities();
