
// --------------------------------------------------------------------- <variables>
// Init Firebase
var map, infoWindow;
var config = {
    apiKey: "AIzaSyCjw3ZOOzTjEiAs4FX0yVvnevh06UwoeMs",
    authDomain: "fudmeh.firebaseapp.com",
    databaseURL: "https://fudmeh.firebaseio.com",
    projectId: "fudmeh",
    storageBucket: "",
    messagingSenderId: "426120982640"
};
firebase.initializeApp(config);
var database = firebase.database(); // Create a variable to reference the database

//  Create variables for latitude and longitude
let lat = "";
let lon = "";

// data object to store click location info
var data = {
    sender: null,
    timestamp: null,
    lat: null,
    lng: null
  };


// --------------------------------------------------------------------- <firebase>
//  Pull users lat and longitude from firebase
database.ref('location').on('value', function (snapshot) {
    lat = snapshot.val().lat;
    lon = snapshot.val().lng;

    //  Create variable holding the search url including parameters
    let queryURL = "https://developers.zomato.com/api/v2.1/search?lat=" + lat + "&lon=" + lon + "&cuisines=chinese&radius=10&sort=real_distance&count=25";

    //  AJAX call to Zomato
    $.ajax({
        url: queryURL,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'user-key': 'faf6b95bf12c6d16066378598f219943'
        }
    }).then(function (response) {
        //  Calling the zomato JSON information manipulation
        zomato(response);
    })

    //  Create function to handle zomato JSON
    function zomato(x) {
        //  Console log the zomato JSON to manipulate
        console.log(x);

        //  Iterate through the JSON retrived from zomato
        //  Push zomato JSON to firebase
        for (var i = 0; i < x.results_shown; i++) {
            database.ref('fuudMeh').push({
                name: x.restaurants[i].restaurant.name,
                img: x.restaurants[i].restaurant.photos_url,
                url: x.restaurants[i].restaurant.url,
                location: x.restaurants[i].restaurant.location,
                id: x.restaurants[i].restaurant.id,
                cuisines: x.restaurants[i].restaurant.cuisines
            })

            var restaurant = {
                category: x.restaurants[i].restaurant.cuisines,
                lat: x.restaurants[i].restaurant.location.latitude,
                lng: x.restaurants[i].restaurant.location.longitude,
                object: {
                    name: x.restaurants[i].restaurant.name,
                    address: x.restaurants[i].restaurant.location.address,
                    suburb: x.restaurants[i].restaurant.location.locality,
                    postcode: x.restaurants[i].restaurant.location.zipcode,
                    url: x.restaurants[i].restaurant.url,
                    map: x.restaurants[i].restaurant.location.address
                }
            }
        }
        console.log(restaurant)
    }
});


// --------------------------------------------------------------------- <map>
function initMap(lat, lng) {
    if (lat == null || lng ==null) {
        lat = '29.7325483';
        lng = '-95.5512395';
    }
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: lat, // default location Norris Conference Center
            lng: lng
        },
        zoom: 15
    });
    infoWindow = new google.maps.InfoWindow;

    // <click listener>
    map.addListener('click', function(e) {
        data.lat = e.latLng.lat();
        data.lng = e.latLng.lng();
        console.log(`you clicked at lat:${data.lat}, lng:${data.lng}` )
        // ------------------------------------------------------------------- need to do something with location of click
        initMap(data.lat, data.lng)
    });

    // Try HTML5 geolocation. ------------------------------------------------ need to rember allow location choice
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            database.ref('location').set({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () { 
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
} 


