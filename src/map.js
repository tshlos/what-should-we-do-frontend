const activitiesURL = "http://localhost:3000/api/v1/activities";
const myLatLng = { lat: 47.6205, lng: -122.3493 };
let map;
// const icons = {
//   coffee: {
//     icon: = 'assets/images/'coffee
//   }

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,

    center: myLatLng,
  });
  const geocoder = new google.maps.Geocoder();
  document.getElementById("submit").addEventListener("click", () => {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  const address = document.getElementById("address").value;
  geocoder.geocode(
    { address: address },
    (results, status) => {
      if (status === "OK") {
        resultsMap.setCenter(results[0].geometry.location);
        new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location,
          animation: google.maps.Animation.Drop,
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    }

    //probably call for fetch other markers here
  );
}

fetchActivities();

function fetchActivities() {
  fetch(activitiesURL)
    .then((response) => response.json())
    .then((activities) =>
      activities.forEach((activity) => addMarkers(activity))
    );
}

function addMarkers(activity) {
  debugger;
  let marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.Drop,
    position: { lat: activity.latitude, lng: activity.longitude },
    // const myLatLng = { lat: 47.6205, lng: -122.3493 };
    title: activity.name,
  });

  console.log(activity.latitude);
  console.log(activity.longitude);
  debugger;
  // need to geocode addresses so pass these into a geocoder basically.
}

// fetchActivities();
