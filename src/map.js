const activitiesURL = "http://localhost:3000/api/v1/activities";
const myLatLng = { lat: 47.6205, lng: -122.3493 };
// const icons = {
//   coffee: {
//     icon: = 'assets/images/'coffee
//   }

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,

    center: myLatLng,
    const geocoder = new google.maps.Geocoder();
  });
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
          map: map,
          position: results[0].geometry.location,
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    }

    //probably call for fetch other markers here
  );
}

function fetchActivities() {
  fetch(activitiesURL)
    .then((response) => response.json())
    .then((activities) =>
      activities.forEach((activity) => combineAddresses(activity))
    );
}

// function combineAddresses(activity) {
//   const {
//     name,
//     address,
//     city,
//     state,
//     zipcode,
//     description,
//     image,
//     category,
//     comments,
//   } = activity;

//   const fullAddress = address + ", " + city;
//   getCoordinates(activity, fullAddress);

//   // need to geocode addresses so pass these into a geocoder basically.
// }

// function getCoordinates(activity, fullAddress) {
//   console.log(activity);
//   debugger;

//   console.log(fullAddress);

//   const addressGeocoder = new google.maps.Geocoder();
//   addressGeocoder.geocode(
//     {
//       address: fullAddress,
//     },
//     function (results) {
//       console.log(results[0].geometry.location); //LatLng
//     }
//   );
}

fetchActivities();
