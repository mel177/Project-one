// --------------------------------------------------------------------- <variables>
var cuisines = [];





// --------------------------------------------------------------------- <reset cuisines>
function resetCuisines() {

    cuisines = [ // Complete cuisine list
        {
            label: "American",
            code: "flags/us",
            cid: 1,
            active: false
        },
        {
            label: "Mexican",
            code: "flags/mx",
            cid: 73,
            active: false
        },        
        {
            label: "Sandwich",
            code: "_sw",
            cid: 304,
            active: false
        },
        {
            label: "Fast Food",
            code: "French Fries",
            cid: 40,
            active: true
        },
        {
            label: "Chinese",
            code: "Rice Bowl",
            cid: 25,
            active: true
        },
        {
            label: "Tea & Coffee",
            code: "Cafe",
            cid: 161,
            active: true
        },
        {
            label: "Cuban",
            code: "flags/cu",
            cid: 153,
            active: false
        },
        {
            label: "Ice Cream",
            code: "Banana Split",
            cid: 223,
            active: false
        },
        {
            label: "Indian",
            code: "flags/in",
            cid: 148,
            active: false
        },
        {
            label: "Sushi",
            code: "Sushi",
            cid: 177,
            active: true
        },
        {
            label: "Seafood",
            code: "Prawn",
            cid: 83,
            active: true
        },
        {
            label: "Steak",
            code: "Steak",
            cid: 141,
            active: true
        },
        {
            label: "Drinks Only",
            code: "Cocktail",
            cid: 268,
            active: false
        },
        {
            label: "Donuts",
            code: "Cinnamon Roll",
            cid: 959,
            active: false
        },
        {
            label: "French",
            code: "flags/fr",
            cid: 45,
            active: false
        },
        {
            label: "Greek",
            code: "flags/gr",
            cid: 156,
            active: false
        },        
        {
            label: "Jewish",
            code: "flags/il",
            cid: 45,
            active: false
        },
        {
            label: "Italian",
            code: "flags/it",
            cid: 55,
            active: false
        },                
        {
            label: "Japanese",
            code: "flags/jp",
            cid: 60,
            active: false
        },       
        {
            label: "Kebab",
            code: "Kebab",
            cid: 178,
            active: false
        },
        {
            label: "Korean",
            code: "flags/kr",
            cid: 67,
            active: false
        },
        {
            label: "Lebanse",
            code: "flags/lb",
            cid: 66,
            active: false
        },
        {
            label: "Pizza",
            code: "Pizza",
            cid: 82,
            active: false
        },
    ]
    // Draw shortcut icons
    $('.navbar').append(`<img class="icon" src="assets/img/favicons/favicon-96x96.png" id="FüdMeh">`);    
    for (let i = 0; i < cuisines.length; i++) {
        if (cuisines[i].active === true) {
            $('.navbar').append(`<div class="flag pl-2 pt-2" data-active="active" id="${cuisines[i].code}"><img class="icon mr-2" data-fav-id="${cuisines[i].code}" alt="${cuisines[i].label}" data-label="${cuisines[i].label}" data-search="${cuisines[i].search}" src="assets/img/icons/${cuisines[i].code}.png"></div>`)
        }
    }
}