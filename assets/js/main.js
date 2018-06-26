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

// --------------------------------------------------------------------- <variables>
var favActive = false;
var setFav = false;
var favCount = 0;

// --------------------------------------------------------------------- <init>
resetCuisines();
hideFlags();
drawShortcuts();



// --------------------------------------------------------------------- <save favorites>
function toggleFavorite() {
    hideFlags();
    let id = $(this).attr('id')
    console.log(id) // Melinh, please create function to toggle favorites on the map when one of a favorite icons is clicked. thanks, Tom
}

// --------------------------------------------------------------------- <save favorites>
function saveFavorites() {
    hideFlags(); 
    console.log("saved list" + searchArr)
}


function getFavCount() {
    favCount = 0;
    for(let i = 0; i < cuisines.length; i++){
        if (cuisines[i].active == true) {
            favCount++
        }
    }
    console.log(`favCount = ${favCount}`)
}


// --------------------------------------------------------------------- <restore defaults>
function restoreDefaults() {


    setFav = true;
    console.log("Default button was clicked")
    hideFlags();
    resetCuisines();
    drawFlags();
    drawShortcuts();
    setFav = false;
    getFavCount();
   
}


// --------------------------------------------------------------------- <get Fav Count>
function getFavCount() {
    favCount = 0;
    for (let i = 0; i < cuisines.length; i++) {
        if (cuisines[i].active == active) {
            favCount++
        }
    }
    // console.log(`favCount = ${favCount}`)
}

// --------------------------------------------------------------------- <draw shortcuts>
function drawShortcuts() {
    // Draw shortcut icons
    $('.navbar').empty();
    $('.navbar').append(`<img class="icon" src="assets/img/favicons/favicon-96x96.png" id="FüdMeh">`);
    for (let i = 0; i < cuisines.length; i++) {
        if (cuisines[i].active === true) {
            $('.navbar').append(`<div class="shortcut pl-2 pt-2" data-active="active" id="shortcut-${cuisines[i].code}" data-fav-id="${cuisines[i].cid}"><img class="icon mr-2"  alt="${cuisines[i].label}" data-label="${cuisines[i].label}" data-search="${cuisines[i].search}" src="assets/img/icons/${cuisines[i].code}.png" data-fav-id="${cuisines[i].cid}"></div>`)
        }
    }
}

// --------------------------------------------------------------------- <toggle active>
function toggleActive() {
    getFavCount();
            setFav = true;
            let country = $(this).attr('id')
            for (var i in cuisines) {
              if (cuisines[i].code == country) {
                  if ($(this).attr('data-active') == 'active') {
                    cuisines[i].active = false;
                    $('#messages').empty();
                  } else {
                    if (favCount >= 5){
                        $('#messages').empty();
                        $('#messages').append('<p>You have reached the 5 favorite limit!</p>');
                    } else {
                        cuisines[i].active = true;
                        $('#messages').empty();
                    }
                  }
                 break; //Stop this loop, we found it!
                 $('#messages').empty();
              }
            }
        $('.jumbotron').show();
        $('.foot').hide();
        hideFlags();
        drawFlags();
        drawShortcuts();
        getFavCount();
        setFav = false;
        
 }

// --------------------------------------------------------------------- <show/edit favorites>
function drawFlags() {
    
    console.log('draw flag')
    if (favActive == false || setFav == true) {
        favActive = true;
        $('.jumbotron').show();
        $('.foot').hide();
        for (let i = 0; i < cuisines.length; i++) {
            if (cuisines[i].active === true) {
                active = "active";
                $('.fav-picks').append(`<div class="flag ${active} pl-2 pt-2" data-active="${active}" id="${cuisines[i].code}"><img class="icon mr-2" data-fav-id="${cuisines[i].code}" alt="${cuisines[i].label}" data-label="${cuisines[i].label}" data-search="${cuisines[i].search}" src="assets/img/icons/${cuisines[i].code}.png">${cuisines[i].label}</div>`)
            } else {
                active = "inactive";
            }
            $('.flags').append(`<div class="flag legend ${active} pl-2 pt-2" data-active="${active}" id="${cuisines[i].code}"><img class="icon" alt="${cuisines[i].label}" data-label="${cuisines[i].label}" data-search="${cuisines[i].search}" src="assets/img/icons/${cuisines[i].code}.png"></div>`)
        }
        $('.buttons').html(`
        <div class="btn-group"><button type="button" class="btn btn-success text-white" id="save">Save</div>
        <div class="btn-group"><button type="button" class="btn btn-warning text-dark" id="reset">Default</div>
        `);
    } else {
        hideFlags();
        favActive = false;
        // $('#map').show();
    }
}

// --------------------------------------------------------------------- <hideFlags>
function hideFlags() {
    $('.fav-picks').empty();
    $('.flags').empty();
    $('.buttons').empty();
    $('.jumbotron').hide();
    $('.foot').show();
    $('.navbar').empty();
    drawShortcuts();
}

// --------------------------------------------------------------------- <click listeners>
//  Click event to place markers on map
$(document).off("click").on("click", ".shortcut .icon", setMarkers);
$("#lg3").on("click", deleteAllMarkers);

$(document).on("click", '#reset', restoreDefaults);
$(document).on("click", '#save', saveFavorites);
$(document).on("click", '.flag', toggleActive);
$(document).on("click", '#FüdMeh', drawFlags);
$(document).on("click", '.shortcut', toggleFavorite);

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


//  --------------------------------------------------------------------- 

function setMarkers() {
    //  clear the markers array
    deleteMarkers();

    //  Get the cid number from the selected button
    cid = parseInt($(this).attr('data-fav-id'));

    //  Check to see if these search params have already
    //  been set. disable if they have been
    //  Checking to see if array includes  id nuymber
    if (!searchArr.includes(cid)) {
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
function build() {
    
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
                    'user-key': '0ea13516979fc38c42e691a08aedc03e'
                }
            }).then(function (response) {
                //  Calling the zomato JSON information manipulation
                zomato(response);
            })

        });//closes out firebase


        //  Call the array posting method
        console.log(searchArr[i]);
        placeMarkers(searchArr[i]);
    }
}

function placeMarkers(x) {


    //  Loop through the restuarants pulled from firebase
    for (var i = 0; i < 5; i++) {

        database.ref('restaurant' + x + ":" + i).on('value', function (snapshot) {

          
            //  Pulling lat and longitude of restuarant from Firebase
            var myLatLng = snapshot.val().myLatLng;

           console.log(snapshot.val());
            //  Setting the inner text for popper
            var contentString = snapshot.val().name+"<br/><a target=_blank'' href='"+snapshot.val().url+"'>View</a>"+
                "<br/>Cuisines:"+ snapshot.val().cuisines+"<br/>";

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
                id: cid,
                //  userkey
                key: "",
                // give marker a price range
                currency: "$",
                // url to the restaurant for more info
                url: "https://www.zomato.com/houston/name",
                // latitude and longitude for each restaurant



            });

            // Push info to markers array for population
            markers.push(marker);

            //  creates listener for the click event of icon
            marker.addListener('click', function () {
                //  open the info window for selected icon
                infowindow.open(map, marker);
                calcRoute(myPosition, snapshot.val().myLatLng);
                //  closes out the popup after 5 seconds
                setTimeout(close, 3000);


                //  close the popups after an interval
                function close() {
                    infowindow.close(map, marker);
                }
            });


        })
    }
}

var directionsService;
var directionsDisplay;

function calcRoute(origin, destination) {
    if(directionsDisplay){
        directionsDisplay.setDirections({routes: []});
    }
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    
    var start = new google.maps.LatLng(origin.lat, origin.lng);
    var end = new google.maps.LatLng(destination.lat, destination.lng);
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(start);
    bounds.extend(end);
    map.fitBounds(bounds);
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            directionsDisplay.setMap(map);
        } else {
            alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
        }
    });
}


//  ---------------------------------------------------------------------

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

}
var myPosition;
//  ---------------------------------------------------------------------

//  Initializes the map
function initMap(lat, lng) {
    if (lat == null || lng == null) {
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

            lat = pos.lat;
            myPosition = pos;
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

//  ---------------------------------------------------------------------

//  Function removes duplicates from arrays
function duplicateArr(arr) {
    let unique_array = Array.from(new Set(arr))
    return unique_array
}

//  Handles errors
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
} 
