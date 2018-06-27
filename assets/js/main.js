// popovers Initialization
$(function () {
    $('[data-toggle="popover"]').popover()
})
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

// popovers Initialization
$(function () {
    $('[data-toggle="popover"]').popover()
})


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
    hideFlags();// Melinh, please create function to toggle favorites on the map when one of a favorite icons is clicked. thanks, Tom
}

// --------------------------------------------------------------------- <save favorites>
function saveFavorites() {
    hideFlags();
    let id = $(this).attr('id')
    console.log(id) // Benjamin, please create function to save favorite shortcuts to firebase, thanks, Tom    
    console.log("Saving favorites to database")
    // Save user favorites to database
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
            $('.navbar').append(`<div class="shortcut pl-2 pt-2" data-active="active" id="${cuisines[i].arr}" data-fav-id="${cuisines[i].arr}" data-trigger="hover" data-toggle="popover" data-placement="top" data-content="${cuisines[i].label}"><img class="icon mr-2"  alt="${cuisines[i].label}" data-label="${cuisines[i].label}" data-search="${cuisines[i].search}" src="assets/img/icons/${cuisines[i].code}.png" data-fav-id="${cuisines[i].arr}"></div>`)
        }
    }
}

// --------------------------------------------------------------------- <toggle active>
function toggleActive() {
    getFavCount();
    if (favCount >= 5) {
        $('.messages').empty();
        $('.messages').append('You have reached the 5 favorite limit!');
    } else {
        setFav = true;
        let country = $(this).attr('id')
        for (var i in cuisines) {
            if (cuisines[i].code == country) {
                if ($(this).attr('data-active') == 'active') {
                    cuisines[i].active = false;
                } else {
                    cuisines[i].active = true;
                }
                break; //Stop this loop, we found it!
            }
        }
        $('.jumbotron').show();
        hideFlags();
        drawFlags();
        drawShortcuts();
        getFavCount();
        setFav = false;
    }
}

// --------------------------------------------------------------------- <show/edit favorites>
function drawFlags() {
    // $('#map').hide();
    if (favActive == false || setFav == true) {
        favActive = true;
        $('.jumbotron').show();
        // $('.fav-picks').append(`<h2>Favorites</h2>`); // not enough room for this
        for (let i = 0; i < cuisines.length; i++) {
            if (cuisines[i].active === true) {
                active = "active";
                $('.fav-picks').append(`<div class="flag ${active} pl-2 pt-2" data-active="${active}" id="${cuisines[i].code}"><img class="icon mr-2" data-fav-id="${cuisines[i].arr}" alt="${cuisines[i].label}" data-label="${cuisines[i].label}" data-search="${cuisines[i].search}" src="assets/img/icons/${cuisines[i].code}.png">${cuisines[i].label}</div>`)
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
    $('.navbar').empty();
    drawShortcuts();
}

// --------------------------------------------------------------------- <click listeners>
//  Click event to place markers on map
$(document).off("click").on("click", ".shortcut .icon", setMarkers);
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
var myPosition = "";
var myLatLng = "";
let cuisineId = [];
let allRest = [];
let temp = [];
let searchArr = [];
var markers = [];
var directionsService = "";
var directionsDisplay = "";

// data object to store click location info
var data = {
    sender: null,
    timestamp: null,
    lat: null,
    lng: null
};




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

    for (var i = 0; i < cuisines.length; i++) {
        cuisineId.push(cuisines[i].cid)
    }


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

            for (var i = 0; i < cuisineId.length; i++) {

                let newLat = pos.lat.toFixed(3)
                let newLng = pos.lng.toFixed(3)

                //  Create variable holding the search url including parameters
                let queryURL = "https://developers.zomato.com/api/v2.1/search?lat=" + newLat + "&lon=" + newLng + "&cuisines=" + cuisineId[i] + "&radius=1000&sort=real_distance&count=5";

                //  Create Ajax call
                $.ajax({
                    url: queryURL,
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'user-key': '8257584214d5ad27bc8026723c0adcd0'
                    }
                }).then(function (response) {
                    //  Calling the zomato JSON information manipulation
                    zomato(response);
                })


            }


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



//  --------------------------------------------------------------------- 

function setMarkers() {

    let icon = $(this).attr('src');
    console.log(icon);


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
        build(icon);
        //  If there is a duplicate, we must remove, then splice out
    } else {
        //  first search for duplicates to catch all possible renditions
        duplicateArr(searchArr);
        //  next get the index of the id number to splice from array 
        let index = searchArr.indexOf(cid);
        //  splice the duplicate from the array at it's index
        searchArr.splice(index, 1);
        //  then rebuild markers without the duplicate
        build(icon);
    }
}

//  Build markers
function build(x) {

    for (var i = 0; i < searchArr.length; i++) {
        placeMarkers(searchArr[i], x);
    }
}

function placeMarkers(x, y) {


    //  Loop through the restuarants pulled from firebase
    for (var i = 0; i < 5; i++) {

        console.log(allRest[x][i].myLatLng)

        var myLatLng = new google.maps.LatLng(parseFloat(allRest[x][i].myLatLng.lat), parseFloat(allRest[x][i].myLatLng.lng));

        // myLatLng = allRest[x][i].myLatLng;


        //  Setting the inner text for popper
        var contentString = "<div>"+allRest[x][i].name + "<br/><a target=_blank'' href='" + allRest[x][i].url + "'>View</a>" + "<br/>Cuisines:" + allRest[x][i].cuisines + "<br/></div>";

        //  Create a new info window when clicked
        var infowindow = new google.maps.InfoWindow({
            //  Inserts the content from content-string defined above
            content: contentString
        });

        var icon = {
            url: y, // url
            scaledSize: new google.maps.Size(50, 30), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };

        //  Creates a new marker on the map
        var marker = new google.maps.Marker({
            //  Pulls the lat and long from declared variable
            position: myLatLng,
            //  Defines the map as the google.maps window
            map: map,
            //  Gives the popper a name
            title: x + "," + i,
            //  Gives marker id
            id: allRest[x][i].id,
            //  userkey
            key: "hello",
            // give marker a price range
            currency: "$",
            // url to the restaurant for more info
            url: allRest[x][i].url,
            // latitude and longitude for each restaurant
            icon: icon

        });

        // Push info to markers array for population
        markers.push(marker);
       
    }
    
}


function calcRoute(origin, destination) {
    if (directionsDisplay) {
        directionsDisplay.setDirections({ routes: [] });
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
    temp = [];

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
        temp.push(restaurant);

    }// Closes out the iterating for loop
    allRest.push(temp);

}

//  ---------------------------------------------------------------------

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

$(document).on('click', '.gmnoprint', function(){

    
    let arrIndex = $(this).attr('title');

    if(typeof arrIndex == 'undefined'){
        console.log("undefined")
    } else {
        

        console.log(arrIndex)
        let res = arrIndex.split(',');
        let indexOne = parseInt(res[0]);
        let indexTwo = parseInt(res[1]);
        let newIndex = allRest[indexOne][indexTwo];

        //  calculate the route to the new location
        calcRoute(myPosition, newIndex.myLatLng);

        var contentString = newIndex.name;


        //  access the item clicked and give an id
        let div = $('[title|="'+ arrIndex +'"]');
        div.append(`<div id="${arrIndex}">`)
        div.attr('z-index', 0).attr('data-toggle', 'popover').attr('data-placement','top').attr('data-trigger', 'focus').attr('data-content', 'contentString');

    }
})

$(document).on('click', '.popper', function(){
    let index = $(this).attr('title')
    console.log(index)
})