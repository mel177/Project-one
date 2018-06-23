// --------------------------------------------------------------------- <variables>
var favActive = false;
var setFav = false;
// --------------------------------------------------------------------- <init>
resetCuisines();
hideFlags();

// --------------------------------------------------------------------- <restore defaults>
function restoreDefaults() {
    setFav = true;
    console.log("Default button was clicked")
    hideFlags();
    resetCuisines();
    drawFlags();
    setFav = false;
}

// --------------------------------------------------------------------- <save favorites>
function addFavorite() {

    let id = $(this).attr('id')

    console.log(id)
}


function toggleActive() {
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
    setFav = false;
 }


// --------------------------------------------------------------------- <show/edit favorites>
function drawFlags() {
    $('#map').hide();
    if (favActive == false || setFav == true) {
        favActive = true;
        $('.jumbotron').show();
        $('.favorites').append(`<h2>Favorites</h2>`);
        for (let i = 0; i < cuisines.length; i++) {
            if (cuisines[i].active === true) {
                active = "active";
                $('.favorites').append(`<div class="flag ${active} pl-2 pt-2" data-active="${active}" id="${cuisines[i].code}"><img class="icon mr-2" data-fav-id="${cuisines[i].code}" alt="${cuisines[i].label}" data-label="${cuisines[i].label}" data-search="${cuisines[i].search}" src="assets/img/icons/${cuisines[i].code}.png">${cuisines[i].label}</div>`)
            } else {
                active = "inactive";
            }
                    $('.flags').append(`<div class="flag ${active} pl-2 pt-2" data-active="${active}" id="${cuisines[i].code}"><img class="icon" alt="${cuisines[i].label}" data-label="${cuisines[i].label}" data-search="${cuisines[i].search}" src="assets/img/icons/${cuisines[i].code}.png"></div>`)
        }
        $('.buttons').html(`
        <div class="btn-group"><button type="button" class="btn btn-success text-white" id="save">Save</div>
        <div class="btn-group"><button type="button" class="btn btn-warning text-dark" id="reset">Default</div>
        <div class="btn-group"><button type="button" class="btn btn-danger text-warning" id="fudmeh">FüdMeh!</div>
        `);
        console.log(favActive);
    } else {
        hideFlags();
        favActive = false;
        console.log(favActive);
        $('#map').show();
    }
}

// --------------------------------------------------------------------- <save favorites>
function saveFavorites() {
    console.log("Saving favorites to database")
    // Save user favorites to database
}


// --------------------------------------------------------------------- <hideFlags>
function hideFlags() {
    $('.favorites').empty();
    $('.flags').empty();
    $('.buttons').empty();
    $('.jumbotron').hide();
}

// --------------------------------------------------------------------- <click listeners>
$(document).on("click", '#reset', restoreDefaults);
$(document).on("click", '#save', saveFavorites);
$(document).on("click", '.flag', toggleActive);
$(document).on("click", '.fav-nav', drawFlags);
