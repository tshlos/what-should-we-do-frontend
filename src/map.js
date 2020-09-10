const MapsKey = config.GOOGLE_API_KEY;
loadApiSource();
const myLatLng = { lat: 47.6205, lng: -122.3493 };
let map;
// load the Google Maps API
function loadApiSource() {
  const headElement = document.querySelector("head");
  const scriptTag = document.createElement("script");
  // keeps API out of git via interprolation
  scriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${MapsKey}&callback=initMap`;
  headElement.append(scriptTag);
}
initMap();
// fetchActivitiesForMarkers();
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
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      resultsMap.setCenter(results[0].geometry.location);
      new google.maps.Marker({
        map: resultsMap,
        icon: `icons/person-icon.png`,
        position: results[0].geometry.location,
        animation: google.maps.Animation.Drop,
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}
// function fetchActivitiesForMarkers() {
//   fetch(activitiesURL)
//     .then((response) => response.json())
//     .then((activities) =>
//       activities.forEach((activity) => addMarkers(activity))
//     );
// }
function addMarkers(activity) {
  const iconBase = `icons/`;
  const image = `${iconBase}${activity.category}-icon.png`;
  var marker = new google.maps.Marker({
    map: map,
    draggable: false,
    animation: google.maps.Animation.Drop,
    position: { lat: activity.latitude, lng: activity.longitude },
    icon: image,
    title: activity.name,
    id: activity.id,
  });

  marker.addListener("click", function () {
    map.setZoom(15);
    map.panTo(marker.getPosition());
  });
}

function listenforMarkerClick() {
  marker.addListener("click", function () {
    map.setZoom(15);
    map.panTo(marker.getPosition());
  });
}

// function panMarker(event) {
//   debugger;

//   console.log(event);
// }
