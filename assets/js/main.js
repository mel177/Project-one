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
let lng = "";
let cid = "";
let searchArr = [];
var markers = [];

// data object to store click location info
var data = {
    sender: null,
    timestamp: null,
    lat: null,
    lng: null
  };


// --------------------------------------------------------------------- <map>
function initMap(lat, lng) {
    if (lat == null || lng ==null) {
        lat = 29.7560;
        lng = -95.3573;
    }
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: lat, // default location Norris Conference Center
            lng: lng
        },
        zoom: 15
    });
    infoWindow = new google.maps.InfoWindow;


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
            infoWindow.setContent('Your Location');
            infoWindow.open(map);

            map.setCenter(pos);
        }, function () { 
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    //  Click event to place markers on map
    $(".legend").off("click").on("click", setMarkers);
    $("#lg3").on("click", deleteAllMarkers);

   
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
} 

function zomato(x) {

    //  Iterate through the JSON retrived from zomato
    //  Push zomato JSON to firebase
    for (var i = 0; i < x.results_shown; i++) {
        //  Creates a restaurant variable to hold data sent to firebase
        var restaurant = {
            //  Saving the name of the restuarant
            name: x.restaurants[i].restaurant.name,
            //  Saving information regarding image size
            img: {
                url: x.restaurants[i].restaurant.photos_url
            },
            //  Saving the restaurant URL
            url: x.restaurants[i].restaurant.url,
            //  Saves the longitude and latitude of the restaurant
            //  Parse the string value into a float number
            myLatLng: {
                lat: parseFloat(x.restaurants[i].restaurant.location.latitude),
                lng: parseFloat(x.restaurants[i].restaurant.location.longitude)
            },
            //  Unique restaurant ID number from Zomato
            id: x.restaurants[i].restaurant.id,
            //  The cuisine identifier 
            cuisines: x.restaurants[i].restaurant.cuisines

        }   //  Closes the restaurant variable

        //  Push the data from Zomato to Firebase
        database.ref('restaurant' + cid + ":" + i).set(restaurant);

    }// Closes out the iterating for loop

}// Closes out the Zomato function

function placeMarkers(x) {


    //  Loop through the restuarants pulled from firebase
    for (var i = 0; i < 5; i++) {

        database.ref('restaurant' + x + ":" + i).on('value', function (snapshot) {

            //  Pulling lat and longitude of restuarant from Firebase
            var myLatLng = new google.maps.LatLng(snapshot.val().myLatLng.lat, snapshot.val().myLatLng.lng);

            //  Setting the inner text for popper
            var contentString = snapshot.val().name;

            //  Create a new info window when clicked
            var infowindow = new google.maps.InfoWindow({
                //  Inserts the content from content-string defined above
                content: contentString
            });


            //  Creates a new marker on the map
            var marker = new google.maps.Marker({
                //  Pulls the lat and long from declared variable
                position: myLatLng,
                //  Defines the map as the google.maps window
                map: map,
                //  Gives the popper a name
                title: snapshot.val().name, 
                //  Gives marker id
                id: cid
            });

            // Push info to markers array for population
            markers.push(marker);

            //  creates listener for the click event of icon
            marker.addListener('click', function () {
                //  open the info window for selected icon
                infowindow.open(map, marker);
                //  closes out the popup after 5 seconds
                setTimeout(close, 3000);


            //  close the popups after an interval
            function close() {
                infowindow.close(map, marker);
            }
            });

            
        }) 
    }
    console.log(markers);
}

function setMarkers() {
    //  clear the markers array
    deleteMarkers();

    //  Get the cid number from the selected button
    cid = parseInt($(this).attr('data-cid'));

    //  Check to see if these search params have already
    //  been set. disable if they have been
    //  Checking to see if array includes  id nuymber
    if(!searchArr.includes(cid)){
        //  if it doesn't, push data to search array
        searchArr.push(cid);
        //  then build the markers
        build();
        //  If there is a duplicate, we must remove, then splice out
    } else {
        //  first search for duplicates to catch all possible renditions
        duplicateArr(searchArr);   
        //  next get the index of the id number to splice from array 
        let index = searchArr.indexOf(cid);
        //  splice the duplicate from the array at it's index
        searchArr.splice(index, 1);
        //  then rebuild markers without the duplicate
        build();
    }
}

//  Build markers
function build(){
for (var i = 0; i < searchArr.length; i++) {
        //  Pull the lat/lon/lng from the firebase database
        database.ref('location').on('value', function (snapshot) {
            lat = snapshot.val().lat;
            lon = snapshot.val().lng;
            lng = lon;
            
            

            //  Create variable holding the search url including parameters
            let queryURL = "https://developers.zomato.com/api/v2.1/search?lat=" + lat + "&lon=" + lon + "&cuisines=" + searchArr[i] + "&radius=10&sort=real_distance&count=5";

            //  Create Ajax call
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

        });//closes out firebase
        
    
        //  Call the array posting method
        placeMarkers(searchArr[i]);
    }
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}

// Delete all markers in array and references
function deleteAllMarkers() {
    clearMarkers();
    markers = [];
    searchArr = [];
}

//  Function removes duplicates from arrays
function duplicateArr(arr) {
    let unique_array = Array.from(new Set(arr))
    return unique_array
}




