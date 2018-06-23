/*

Copyright (c) 2015 Derek MacDonald

Permission to use, copy, modify, and/or distribute this software
for any purpose with or without fee is hereby granted, provided
that the above copyright notice and this permission notice appear
in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL
WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE
AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR
CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT,
NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

*/

// An odd one. This could be a strictly .json file however jQuery $.ajax() and
// $.getJSON() don't work locally (w/o running a HTTP server) due to browser
// security surrounding HTTP header 'Access-Control-Allow-Origin'.
//
// Ideally your data store is from a Wordpress database, consumed API, etc.
// so asynchronous event handling instead creates Google Maps markers.
var markers = [
	{
		category: 'chinese',
		lat: -37.75523099999999,
		lng: 145.000858,
		object: {
			name: 'KitCHANS Asian Cuisine',
			address: '837 High Street',
			suburb: 'Thornbury',
			state: 'VIC',
			postcode: '3071',
			url: 'http://www.kitchans.com.au/',
			map: '837 High Street, Thornbury, Victoria, Australia'
		}
	},
	{
		category: 'chinese',
		lat: -37.773935,
		lng: 144.96032100000002,
		object: {
			name: 'New World Chinese Restaurant',
			address: '2 Union Street',
			suburb: 'Brunswick',
			state: 'VIC',
			postcode: '3056',
			url: 'http://www.newworldchinese.com.au/',
			map: '2 Union Street, Brunswick, Victoria, Australia'
		}
	},
	{
		category: 'chinese',
		lat: -37.799552,
		lng: 144.97862099999998,
		object: {
			name: 'Rize BBQ Chinese Restaurant',
			address: '262 Brunswick Street',
			suburb: 'Fitzroy',
			state: 'VIC',
			postcode: '3065',
			url: 'http://rizechinesebbqrestaurant.com.au/',
			map: '262 Brunswick Street, Fitzroy, Victoria, Australia'
		}
	},
	{
		category: 'indian',
		lat: -37.756367,
		lng: 144.96437400000002,
		object: {
			name: 'Bilal Restaurant',
			address: '860 Sydney Road',
			suburb: 'Brunswick',
			state: 'VIC',
			postcode: '3056',
			url: 'http://www.bilalrestaurant.com.au/',
			map: '860 Sydney Road, Brunswick, Victoria, Australia'
		}
	},
	{
		category: 'indian',
		lat: -37.804554,
		lng: 144.96659799999998,
		object: {
			name: 'Carlton Curry House',
			address: '108 Lygon Street',
			suburb: 'Carlton',
			state: 'VIC',
			postcode: '3053',
			url: 'http://www.carltoncurryhouse.com.au/',
			map: '108 Lygon Street, Carlton, Victoria, Australia'
		}
	},
	{
		category: 'indian',
		lat: -37.788973,
		lng: 144.991222,
		object: {
			name: 'Diamond Indian Cuisine',
			address: '149 Queens Parade',
			suburb: 'Clifton Hill',
			state: 'VIC',
			postcode: '3068',
			url: 'http://diamondindiancuisine.com.au/',
			map: '149 Queens Parade, Clifton Hill, Victoria, Australia'
		}
	},
	{
		category: 'indian',
		lat: -37.798321,
		lng: 144.976222,
		object: {
			name: 'Fitz Curry Cafe',
			address: '44 Johnston Street',
			suburb: 'Fitzroy',
			state: 'VIC',
			postcode: '3065',
			url: 'http://www.fitzcurrycafe.com.au/',
			map: '44 Johnston Street, Fitzroy, Victoria, Australia'
		}
	},
	{
		category: 'indian',
		lat: -37.790113,
		lng: 144.97148900000002,
		object: {
			name: 'Ganesha',
			address: '643 Rathdowne Street',
			suburb: 'Carlton North',
			state: 'VIC',
			postcode: '3054',
			url: 'http://www.punjabicurrycafe.com/',
			map: '643 Rathdowne Street, Carlton North, Victoria, Australia'
		}
	},
	{
		category: 'indian',
		lat: -37.796983,
		lng: 144.968165,
		object: {
			name: 'Lahore Biryani House',
			address: '192 Elgin Street',
			suburb: 'Carlton',
			state: 'VIC',
			postcode: '3053',
			url: 'http://lahorebiryanihouse.com.au/',
			map: '192 Elgin Street, Carlton, Victoria, Australia'
		}
	},
	{
		category: 'indian',
		lat: -37.804441,
		lng: 144.96660099999997,
		object: {
			name: 'Lazzat On Lygon',
			address: '112 Lygon Street',
			suburb: 'Carlton',
			state: 'VIC',
			postcode: '3053',
			url: '',
			map: '112 Lygon Street, Carlton, Victoria, Australia'
		}
	},
	{
		category: 'indian',
		lat: -37.799664,
		lng: 144.9878,
		object: {
			name: 'Punjabi Curry Cafe',
			address: '87 Johnston Street',
			suburb: 'Collingwood',
			state: 'VIC',
			postcode: '3066',
			url: 'http://www.punjabicurrycafe.com/',
			map: '87 Johnston Street, Collingwood, Victoria, Australia'
		}
	},
	{
		category: 'indian',
		lat: -37.804036,
		lng: 144.966683,
		object: {
			name: 'Royale Fusion',
			address: '128-130 Lygon Street',
			suburb: 'Carlton',
			state: 'VIC',
			postcode: '3053',
			url: 'http://www.royalefusion.com.au/',
			map: '128-130 Lygon Street, Carlton, Victoria, Australia'
		}
	},
	{
		category: 'indian',
		lat: -37.80114,
		lng: 144.96716800000002,
		object: {
			name: 'Samrat Indian Restaurant',
			address: '258 Lygon Street',
			suburb: 'Carlton',
			state: 'VIC',
			postcode: '3053',
			url: '',
			map: '258 Lygon Street, Carlton, Victoria, Australia'
		}
	},
	{
		category: 'indian',
		lat: -37.789089,
		lng: 144.97687700000006,
		object: {
			name: 'Tandoor Indian Cuisine',
			address: '450-452 Nicholson Street',
			suburb: 'Fitzroy',
			state: 'VIC',
			postcode: '',
			url: 'http://tandoorindianfitzroynorth.com.au/',
			map: '450-452 Nicholson Street, Fitzroy North, Victoria, Australia'
		}
	},
	{
		category: 'japanese',
		lat: -37.773536,
		lng: 144.971633,
		object: {
			name: 'Kumo Izakaya',
			address: '152 Lygon Street',
			suburb: 'Brunswick East',
			state: 'VIC',
			postcode: '3057',
			url: 'http://kumoizakaya.com.au/',
			map: '152 Lygon Street, Brunswick East, Victoria, Australia'
		}
	},
	{
		category: 'japanese',
		lat: -37.777154,
		lng: 144.971232,
		object: {
			name: 'Matsumoto',
			address: '48 Lygon Street',
			suburb: 'Brunswick East',
			state: 'VIC',
			postcode: '3057',
			url: 'http://www.matsumoto.com.au/',
			map: '48 Lygon Street, Brunswick East, Victoria, Australia'
		}
	},
	{
		category: 'korean',
		lat: -37.8120485,
		lng: 144.96980159999998,
		object: {
			name: 'Donburi &amp; BBQ Korean &amp; Japanese',
			address: '4/108 Bourke Street',
			suburb: 'Melbourne',
			state: 'VIC',
			postcode: '3000',
			url: 'http://www.donburi.com.au/',
			map: '4/108 Bourke Street, Melbourne, Victoria, Australia'
		}
	},
	{
		category: 'sri-lankan',
		lat: -37.805359,
		lng: 144.99244799999997,
		object: {
			name: 'Lakmi Green Spice',
			address: '106 Hoddle Street',
			suburb: 'Abbotsford',
			state: 'VIC',
			postcode: '3067',
			url: 'http://www.lakmigreenspice.com.au/',
			map: '106 Hoddle Street, Abbotsford, Victoria, Australia'
		}
	},
	{
		category: 'thai',
		lat: -37.79913,
		lng: 144.98812599999997,
		object: {
			name: 'Authentic Thai Taste',
			address: '92-94 Johnston Street',
			suburb: 'Collingwood',
			state: 'VIC',
			postcode: '3066',
			url: 'http://www.thaitastecollingwood.com.au/',
			map: '92-94 Johnston Street, Collingwood, Victoria, Australia'
		}
	},
	{
		category: 'thai',
		lat: -37.763721,
		lng: 144.96290299999998,
		object: {
			name: 'Banna Thai Cuisine',
			address: '598 Sydney Road',
			suburb: 'Brunswick',
			state: 'VIC',
			postcode: '3056',
			url: 'http://www.bannathaicuisine.com.au/',
			map: '598 Sydney Road, Brunswick, Victoria, Australia'
		}
	},
	{
		category: 'thai',
		lat: -37.7984286,
		lng: 144.98409749999996,
		object: {
			name: 'BuuBBuB Thai',
			address: '353 Smith Street',
			suburb: 'Fitzroy',
			state: 'VIC',
			postcode: '3065',
			url: 'http://www.buubbub.com.au/',
			map: '353 Smith Street, Fitzroy, Victoria, Australia'
		}
	},
	{
		category: 'thai',
		lat: -37.797778,
		lng: 144.975645,
		object: {
			name: 'Chilli Lili',
			address: '15 Johnston Street',
			suburb: 'Fitzroy',
			state: 'VIC',
			postcode: '3065',
			url: 'http://www.chillilili.com.au',
			map: '15 Johnston Street, Fitzroy, Victoria, Australia'
		}
	},
	{
		category: 'thai',
		lat: -37.779417,
		lng: 144.987389,
		object: {
			name: 'Gler Thai Takeaway',
			address: '354 St Georges Road',
			suburb: 'Fitzroy North',
			state: 'VIC',
			postcode: '3068',
			url: 'http://www.glerthaitakeawayfitzroy.com.au/',
			map: '354 St Georges Road, Fitzroy North, Victoria, Australia'
		}
	},
	{
		category: 'thai',
		lat: -37.784055,
		lng: 144.97700699999996,
		object: {
			name: 'I Absolute Thai Restaurant &amp; Cafe',
			address: '651 Nicholson Street',
			suburb: 'Carlton North',
			state: 'VIC',
			postcode: '3054',
			url: 'http://www.iabsolutethai.com.au/',
			map: '651 Nicholson Street, Carlton North, Victoria, Australia'
		}
	},
	{
		category: 'thai',
		lat: -37.7983169,
		lng: 144.98412329999996,
		object: {
			name: 'Inter Thai',
			address: '357 Smith Street',
			suburb: 'Fitzroy',
			state: 'VIC',
			postcode: '3065',
			url: 'http://www.interthai.com.au/',
			map: '357 Smith Street, Fitzroy, Victoria, Australia'
		}
	},
	{
		category: 'thai',
		lat: -37.7834467,
		lng: 144.98373360000005,
		object: {
			name: 'Lai Thai Restaurant',
			address: '244 St Georges Road',
			suburb: 'Fitzroy North',
			state: 'VIC',
			postcode: '3068',
			url: 'http://laithaifitzroynorth.com.au/',
			map: '244 St Georges Road, Fitzroy North, Victoria, Australia'
		}
	},
	{
		category: 'thai',
		lat: -37.8030247,
		lng: 144.96676430000002,
		object: {
			name: 'Lemongrass Restaurant',
			address: '174-178 Lygon Street',
			suburb: 'Carlton',
			state: 'VIC',
			postcode: '3053',
			url: 'http://www.lemongrassrestaurant.com.au/',
			map: '174-178 Lygon Street, Carlton, Victoria, Australia'
		}
	},
	{
		category: 'thai',
		lat: -37.776303,
		lng: 144.96030799999994,
		object: {
			name: 'Noodle Hut',
			address: '59 Sydney Road',
			suburb: 'Brunswick',
			state: 'VIC',
			postcode: '3056',
			url: 'http://www.noodlehutbrunswick.com.au/',
			map: '59 Sydney Road, Brunswick, Victoria, Australia'
		}
	},
	{
		category: 'thai',
		lat: -37.7722151,
		lng: 144.94880309999996,
		object: {
			name: 'Noodle Hut',
			address: '12/190 Union Street',
			suburb: 'Brunswick West',
			state: 'VIC',
			postcode: '3055',
			url: 'http://www.noodlehut-brunswickwest.com.au/',
			map: '12/190 Union Street, Brunswick West, Victoria, Australia'
		}
	},
	{
		category: 'thai',
		lat: -37.7960459,
		lng: 144.97860730000002,
		object: {
			name: 'Patee Thai',
			address: '371-373 Brunswick Street',
			suburb: 'Fitzroy',
			state: 'VIC',
			postcode: '3065',
			url: 'http://www.pateethai.com.au/',
			map: '371-373 Brunswick Street, Fitzroy, Victoria, Australia'
		}
	},
	{
		category: 'thai',
		lat: -37.7725458,
		lng: 144.97165010000003,
		object: {
			name: 'Thai Dish Restaurant',
			address: '180 Lygon Street',
			suburb: 'Brunswick East',
			state: 'VIC',
			postcode: '3057',
			url: 'http://www.thaidishrestaurant.com.au/',
			map: '180 Lygon Street, Brunswick East, Victoria, Australia'
		}
	},
	{
		category: 'thai',
		lat: -37.800665,
		lng: 144.97778700000003,
		object: {
			name: 'Thai O\'cha',
			address: '223 Brunswick St',
			suburb: 'Fitzroy',
			state: 'VIC',
			postcode: '3065',
			url: 'http://www.thaiocha.net.au/',
			map: '223 Brunswick St, Fitzroy, Victoria, Australia'
		}
	},
	{
		category: 'thai',
		lat: -37.776202,
		lng: 144.97133699999995,
		object: {
			name: 'Thaila Thai House Restaurant',
			address: '82 Lygon Street',
			suburb: 'Brunswick East',
			state: 'VIC',
			postcode: '3057',
			url: 'https://plus.google.com/117586015138108968797/',
			map: '82 Lygon Street, Brunswick East, Victoria, Australia'
		}
	},
	{
		category: 'vietnamese',
		lat: -37.7881735,
		lng: 144.93002790000003,
		object: {
			name: 'Green Tea Vietnamese',
			address: '320 Racecourse Road',
			suburb: 'Flemington',
			state: 'VIC',
			postcode: '3031',
			url: 'http://www.greenteavietnamese.com.au/',
			map: '320 Racecourse Road, Flemington, Victoria, Australia'
		}
	},
	{
		category: 'vietnamese',
		lat: -37.8120485,
		lng: 144.96980159999998,
		object: {
			name: 'Pho Mee Pan Asian Cuisine',
			address: '1/108 Bourke Street',
			suburb: 'Melbourne',
			state: 'VIC',
			postcode: '3000',
			url: 'http://phomee.net.au/',
			map: '108 Bourke Street, Melbourne, Victoria, Australia'
		}
	},
	{
		category: 'vietnamese',
		lat: -37.8067097,
		lng: 144.9654713,
		object: {
			name: 'Soul Vietnamese Kitchen',
			address: '70 Victoria Street',
			suburb: 'Carlton',
			state: 'VIC',
			postcode: '3053',
			url: 'http://www.soulvietnamesekitchen.com.au/',
			map: '70 Victoria Street, Carlton, Victoria, Australia'
		}
	},
	{
		category: 'vietnamese',
		lat: -37.796274,
		lng: 144.97856950000005,
		object: {
			name: 'Viet Rose',
			address: '363 Brunswick Street',
			suburb: 'Fitzroy',
			state: 'VIC',
			postcode: '3065',
			url: 'http://www.vietrosefitzroy.com.au/',
			map: '363 Brunswick Street, Fitzroy, Victoria, Australia'
		}
	},
];