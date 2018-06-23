// --------------------------------------------------------------------- <variables>
var cuisines = [];

// --------------------------------------------------------------------- <countries>
function resetCuisines() {

    cuisines = [{
        label: "Afghanistan",
        search: "afghanistan",
        code: "af",
        active: false
    },
    {
        label: "Albania",
        search: "albanian",
        code: "al",
        active: false
    },
    {
        label: "Algeria",
        search: "algerian",
        code: "dz",
        active: false
    },
    {
        label: "Andorra",
        search: "andorran",
        code: "ad",
        active: false
    },
    {
        label: "Angola",
        search: "angolan",
        code: "ao",
        active: false
    },
    {
        label: "Antigua and Barbuda",
        search: "antiguan and barbudan",
        code: "ag",
        active: false
    },
    {
        label: "Argentina",
        search: "argentinian",
        code: "ar",
        active: false
    },
    {
        label: "Armenia",
        search: "armenian",
        code: "am",
        active: false
    },
    {
        label: "Australia",
        search: "australian",
        code: "au",
        active: false
    },
    {
        label: "Austria",
        search: "austrian",
        code: "at",
        active: false
    },
    {
        label: "Azerbaijan",
        search: "azerbaijan",
        code: "az",
        active: false
    },
    {
        label: "Bahamas",
        search: "bahamas",
        code: "bs",
        active: false
    },
    {
        label: "Bahrain",
        search: "bahrainian",
        code: "bh",
        active: false
    },
    {
        label: "Bangladesh",
        search: "bangladesh",
        code: "bd",
        active: false
    },
    {
        label: "Barbados",
        search: "barbados",
        code: "bb",
        active: false
    },
    {
        label: "Belarus",
        search: "belarus",
        code: "by",
        active: false
    },
    {
        label: "Belgium",
        search: "belgium",
        code: "be",
        active: false
    },
    {
        label: "Belize",
        search: "belize",
        code: "bz",
        active: false
    },
    {
        label: "Benin",
        search: "benin",
        code: "bj",
        active: false
    },
    {
        label: "Bhutan",
        search: "bhutan",
        code: "bt",
        active: false
    },
    {
        label: "Bolivia",
        search: "bolivian",
        code: "bo",
        active: false
    },
    {
        label: "Bosnia and Herzegovina",
        search: "bosnian and herzegovina",
        code: "ba",
        active: false
    },
    {
        label: "Botswana",
        search: "botswanan",
        code: "bw",
        active: false
    },
    {
        label: "Brazil",
        search: "brazilian",
        code: "br",
        active: false
    },
    {
        label: "Brunei",
        search: "brunei",
        code: "bn",
        active: false
    },
    {
        label: "Bulgaria",
        search: "bulgarian",
        code: "bg",
        active: false
    },
    {
        label: "Burkina Faso",
        search: "burkina faso",
        code: "bf",
        active: false
    },
    {
        label: "Burundi",
        search: "burundi",
        code: "bi",
        active: false
    },
    {
        label: "Cambodia",
        search: "cambodian",
        code: "kh",
        active: false
    },
    {
        label: "Cameroon",
        search: "cameroon",
        code: "cm",
        active: false
    },
    {
        label: "Canada",
        search: "canadian",
        code: "ca",
        active: false
    },
    {
        label: "Cape Verde",
        search: "cape verde",
        code: "cv",
        active: false
    },
    {
        label: "Central African Republic",
        search: "central african republic",
        code: "cf",
        active: false
    },
    {
        label: "Chad",
        search: "chad",
        code: "td",
        active: false
    },
    {
        label: "Chile",
        search: "chilean",
        code: "cl",
        active: false
    },
    {
        label: "Colombia",
        search: "colombian",
        code: "co",
        active: false
    },
    {
        label: "Comoros",
        search: "comoros",
        code: "km",
        active: false
    },
    {
        label: "Costa Rica",
        search: "costa rican",
        code: "cr",
        active: false
    },
    {
        label: "Cote d'Ivoire",
        search: "cote d'ivoire",
        code: "ci",
        active: false
    },
    {
        label: "Croatia",
        search: "croatian",
        code: "hr",
        active: false
    },
    {
        label: "Cuba",
        search: "cuban",
        code: "cu",
        active: false
    },
    {
        label: "Cyprus",
        search: "cyprus",
        code: "cy",
        active: false
    },
    {
        label: "Czech Republic",
        search: "czech republic",
        code: "cz",
        active: false
    },
    {
        label: "Democratic Republic of the Congo",
        search: "democratic republic of the congo",
        code: "cd",
        active: false
    },
    {
        label: "Denmark",
        search: "denmark",
        code: "dk",
        active: false
    },
    {
        label: "Djibouti",
        search: "djibouti",
        code: "dj",
        active: false
    },
    {
        label: "Dominica",
        search: "dominica",
        code: "dm",
        active: false
    },
    {
        label: "Dominican Republic",
        search: "dominican republic",
        code: "do",
        active: false
    },
    {
        label: "East Timor",
        search: "east timor",
        code: "tl",
        active: false
    },
    {
        label: "Ecuador",
        search: "ecuador",
        code: "ec",
        active: false
    },
    {
        label: "Egyptian",
        search: "egyptian",
        code: "eg",
        active: false
    },
    {
        label: "El Salvador",
        search: "el salvadorian",
        code: "sv",
        active: false
    },
    {
        label: "Equatorial Guinea",
        search: "equatorial guinea",
        code: "gq",
        active: false
    },
    {
        label: "Eritrea",
        search: "eritrean",
        code: "er",
        active: false
    },
    {
        label: "Estonia",
        search: "estonian",
        code: "ee",
        active: false
    },
    {
        label: "Ethiopia",
        search: "ethiopian",
        code: "et",
        active: false
    },
    {
        label: "Fiji",
        search: "fiji",
        code: "fj",
        active: false
    },
    {
        label: "Finland",
        search: "finlandian",
        code: "fi",
        active: false
    },
    {
        label: "France",
        search: "french",
        code: "fr",
        active: true
    },
    {
        label: "Gabon",
        search: "gabon",
        code: "ga",
        active: false
    },
    {
        label: "Gambia",
        search: "gambia",
        code: "gm",
        active: false
    },
    {
        label: "Georgia",
        search: "georgia",
        code: "ge",
        active: false
    },
    {
        label: "Germany",
        search: "german",
        code: "de",
        active: false
    },
    {
        label: "Ghana",
        search: "ghana",
        code: "gh",
        active: false
    },
    {
        label: "Greece",
        search: "greek",
        code: "gr",
        active: false
    },
    {
        label: "Grenada",
        search: "grenada",
        code: "gd",
        active: false
    },
    {
        label: "Guatemala",
        search: "guatemala",
        code: "gt",
        active: false
    },
    {
        label: "Guinea",
        search: "guinea",
        code: "gn",
        active: false
    },
    {
        label: "Guinea-Bissau",
        search: "guinea-bissau",
        code: "gw",
        active: false
    },
    {
        label: "Guyana",
        search: "guyana",
        code: "gy",
        active: false
    },
    {
        label: "Haiti",
        search: "haiti",
        code: "ht",
        active: false
    },
    {
        label: "Honduras",
        search: "honduras",
        code: "hn",
        active: false
    },
    {
        label: "Hungary",
        search: "hungary",
        code: "hu",
        active: false
    },
    {
        label: "Iceland",
        search: "iceland",
        code: "is",
        active: false
    },
    {
        label: "India",
        search: "indian",
        code: "in",
        active: true
    },
    {
        label: "Indonesia",
        search: "indonesian",
        code: "id",
        active: false
    },
    {
        label: "Iran",
        search: "iranian",
        code: "ir",
        active: false
    },
    {
        label: "Iraq",
        search: "iraqi",
        code: "iq",
        active: false
    },
    {
        label: "Ireland",
        search: "irish",
        code: "ie",
        active: false
    },
    {
        label: "Israel",
        search: "israel",
        code: "il",
        active: false
    },
    {
        label: "Italy",
        search: "italian",
        code: "it",
        active: true
    },
    {
        label: "Jamaica",
        search: "jamaican",
        code: "jm",
        active: false
    },
    {
        label: "Japan",
        search: "japanese",
        code: "jp",
        active: true
    },
    {
        label: "Jordan",
        search: "jordan",
        code: "jo",
        active: false
    },
    {
        label: "Kazakhstan",
        search: "kazakhstan",
        code: "kz",
        active: false
    },
    {
        label: "Kenya",
        search: "kenya",
        code: "ke",
        active: false
    },
    {
        label: "Kiribati",
        search: "kiribati",
        code: "ki",
        active: false
    },
    {
        label: "Kosovo",
        search: "kosovo",
        code: "ks",
        active: false
    },
    {
        label: "Kuwait",
        search: "kuwait",
        code: "kw",
        active: false
    },
    {
        label: "Kyrgyzstan",
        search: "kyrgyzstan",
        code: "kg",
        active: false
    },
    {
        label: "Laos",
        search: "laos",
        code: "la",
        active: false
    },
    {
        label: "Latvia",
        search: "latvia",
        code: "lv",
        active: false
    },
    {
        label: "Lebanon",
        search: "lebanese",
        code: "lb",
        active: false
    },
    {
        label: "Lesotho",
        search: "lesotho",
        code: "ls",
        active: false
    },
    {
        label: "Liberia",
        search: "liberia",
        code: "lr",
        active: false
    },
    {
        label: "Libya",
        search: "libya",
        code: "ly",
        active: false
    },
    {
        label: "Liechtenstein",
        search: "liechtenstein",
        code: "li",
        active: false
    },
    {
        label: "Lithuania",
        search: "lithuania",
        code: "lt",
        active: false
    },
    {
        label: "Luxembourg",
        search: "luxembourg",
        code: "lu",
        active: false
    },
    {
        label: "Macedonia",
        search: "macedonia",
        code: "mk",
        active: false
    },
    {
        label: "Madagascar",
        search: "madagascar",
        code: "mg",
        active: false
    },
    {
        label: "Malawi",
        search: "malawi",
        code: "mw",
        active: false
    },
    {
        label: "Malaysia",
        search: "malaysia",
        code: "my",
        active: false
    },
    {
        label: "Maldives",
        search: "maldives",
        code: "mv",
        active: false
    },
    {
        label: "Mali",
        search: "mali",
        code: "ml",
        active: false
    },
    {
        label: "Malta",
        search: "malta",
        code: "mt",
        active: false
    },
    {
        label: "Marshall Islands",
        search: "marshall islands",
        code: "mh",
        active: false
    },
    {
        label: "Mauritania",
        search: "mauritania",
        code: "mr",
        active: false
    },
    {
        label: "Mauritius",
        search: "mauritius",
        code: "mu",
        active: false
    },
    {
        label: "Mexico",
        search: "mexican",
        code: "mx",
        active: true
    },
    {
        label: "Micronesia",
        search: "micronesia",
        code: "fm",
        active: false
    },
    {
        label: "Moldova",
        search: "moldova",
        code: "md",
        active: false
    },
    {
        label: "Monaco",
        search: "monaco",
        code: "mc",
        active: false
    },
    {
        label: "Mongolia",
        search: "mongolian",
        code: "mn",
        active: false
    },
    {
        label: "Montenegro",
        search: "montenegro",
        code: "me",
        active: false
    },
    {
        label: "Morocco",
        search: "morocco",
        code: "ma",
        active: false
    },
    {
        label: "Mozambique",
        search: "mozambique",
        code: "mz",
        active: false
    },
    {
        label: "Myanmar",
        search: "myanmar",
        code: "mm",
        active: false
    },
    {
        label: "Namibia",
        search: "namibia",
        code: "na",
        active: false
    },
    {
        label: "Nauru",
        search: "nauru",
        code: "nr",
        active: false
    },
    {
        label: "Nepal",
        search: "nepal",
        code: "np",
        active: false
    },
    {
        label: "Netherlands",
        search: "netherlands",
        code: "nl",
        active: false
    },
    {
        label: "New Zealand",
        search: "new zealand",
        code: "nz",
        active: false
    },
    {
        label: "Nicaragua",
        search: "nicaragua",
        code: "ni",
        active: false
    },
    {
        label: "Niger",
        search: "niger",
        code: "ne",
        active: false
    },
    {
        label: "Nigeria",
        search: "nigerian",
        code: "ng",
        active: false
    },
    {
        label: "North Korea",
        search: "north korean",
        code: "kp",
        active: false
    },
    {
        label: "Norway",
        search: "norway",
        code: "no",
        active: false
    },
    {
        label: "Oman",
        search: "oman",
        code: "om",
        active: false
    },
    {
        label: "Pakistan",
        search: "pakistan",
        code: "pk",
        active: false
    },
    {
        label: "Palau",
        search: "palau",
        code: "pw",
        active: false
    },
    {
        label: "Panama",
        search: "panama",
        code: "pa",
        active: false
    },
    {
        label: "Papua New Guinea",
        search: "papua new guinea",
        code: "pg",
        active: false
    },
    {
        label: "Paraguay",
        search: "paraguay",
        code: "py",
        active: false
    },
    {
        label: "China",
        search: "chinese",
        code: "cn",
        active: true
    },
    {
        label: "Peru",
        search: "peru",
        code: "pe",
        active: false
    },
    {
        label: "Philippines",
        search: "philippines",
        code: "ph",
        active: false
    },
    {
        label: "Poland",
        search: "polish",
        code: "pl",
        active: false
    },
    {
        label: "Portugal",
        search: "portugal",
        code: "pt",
        active: false
    },
    {
        label: "Qatar",
        search: "qatar",
        code: "qa",
        active: false
    },
    {
        label: "Republic of China",
        search: "taiwanese",
        code: "tw",
        active: false
    },
    {
        label: "Republic of the Congo",
        search: "republic of the congo",
        code: "cg",
        active: false
    },
    {
        label: "Romania",
        search: "romania",
        code: "ro",
        active: false
    },
    {
        label: "Russia",
        search: "russian",
        code: "ru",
        active: false
    },
    {
        label: "Rwanda",
        search: "rwanda",
        code: "rw",
        active: false
    },
    {
        label: "Saint Kitts and Nevis",
        search: "saint kitts and nevis",
        code: "kn",
        active: false
    },
    {
        label: "Saint Lucia",
        search: "saint lucia",
        code: "lc",
        active: false
    },
    {
        label: "Saint Vincent and the Grenadines",
        search: "saint vincent and the grenadines",
        code: "vc",
        active: false
    },
    {
        label: "Samoa",
        search: "samoa",
        code: "ws",
        active: false
    },
    {
        label: "San Marino",
        search: "san marino",
        code: "sm",
        active: false
    },
    {
        label: "Sao Tome and Principe",
        search: "sao tome and principe",
        code: "st",
        active: false
    },
    {
        label: "Saudi Arabia",
        search: "saudi arabia",
        code: "sa",
        active: false
    },
    {
        label: "Senegal",
        search: "senegal",
        code: "sn",
        active: false
    },
    {
        label: "Serbia",
        search: "serbia",
        code: "rs",
        active: false
    },
    {
        label: "Seychelles",
        search: "seychelles",
        code: "sc",
        active: false
    },
    {
        label: "Sierra Leone",
        search: "sierra leone",
        code: "sl",
        active: false
    },
    {
        label: "Singapore",
        search: "singapore",
        code: "sg",
        active: false
    },
    {
        label: "Slovakia",
        search: "slovakia",
        code: "sk",
        active: false
    },
    {
        label: "Slovenia",
        search: "slovenia",
        code: "si",
        active: false
    },
    {
        label: "Solomon Islands",
        search: "solomon islands",
        code: "sb",
        active: false
    },
    {
        label: "Somalia",
        search: "somalia",
        code: "so",
        active: false
    },
    {
        label: "South Africa",
        search: "south africa",
        code: "za",
        active: false
    },
    {
        label: "South Korea",
        search: "korean",
        code: "kr",
        active: false
    },
    {
        label: "Spain",
        search: "spain",
        code: "es",
        active: false
    },
    {
        label: "Sri Lanka",
        search: "sri lanka",
        code: "lk",
        active: false
    },
    {
        label: "Sudan",
        search: "sudan",
        code: "sd",
        active: false
    },
    {
        label: "Suriname",
        search: "suriname",
        code: "sr",
        active: false
    },
    {
        label: "Swaziland",
        search: "swaziland",
        code: "sz",
        active: false
    },
    {
        label: "Sweden",
        search: "swedish",
        code: "se",
        active: false
    },
    {
        label: "Switzerland",
        search: "swiss",
        code: "ch",
        active: false
    },
    {
        label: "Syria",
        search: "syria",
        code: "sy",
        active: false
    },
    {
        label: "Tajikistan",
        search: "tajikistan",
        code: "tj",
        active: false
    },
    {
        label: "Tanzania",
        search: "tanzania",
        code: "tz",
        active: false
    },
    {
        label: "Thailand",
        search: "thai",
        code: "th",
        active: false
    },
    {
        label: "Togo",
        search: "togo",
        code: "tg",
        active: false
    },
    {
        label: "Tonga",
        search: "tonga",
        code: "to",
        active: false
    },
    {
        label: "Trinidad and Tobago",
        search: "trinidad and tobago",
        code: "tt",
        active: false
    },
    {
        label: "Tunisia",
        search: "tunisia",
        code: "tn",
        active: false
    },
    {
        label: "Turkey",
        search: "turish",
        code: "tr",
        active: false
    },
    {
        label: "Turkmenistan",
        search: "turkmenistan",
        code: "tm",
        active: false
    },
    {
        label: "Tuvalu",
        search: "tuvalu",
        code: "tv",
        active: false
    },
    {
        label: "Uganda",
        search: "uganda",
        code: "ug",
        active: false
    },
    {
        label: "Ukraine",
        search: "ukraine",
        code: "ua",
        active: false
    },
    {
        label: "United Arab Emirates",
        search: "united arab emirates",
        code: "ae",
        active: false
    },
    {
        label: "United Kingdom",
        search: "brittish",
        code: "gb",
        active: true
    },
    {
        label: "United States",
        search: "american",
        code: "us",
        active: true
    },
    {
        label: "Uruguay",
        search: "uruguay",
        code: "uy",
        active: false
    },
    {
        label: "Uzbekistan",
        search: "uzbekistan",
        code: "uz",
        active: false
    },
    {
        label: "Vanuatu",
        search: "vanuatu",
        code: "vu",
        active: false
    },
    {
        label: "Vatican City",
        search: "vatican city",
        code: "va",
        active: false
    },
    {
        label: "Venezuela",
        search: "venezuela",
        code: "ve",
        active: false
    },
    {
        label: "Vietnam",
        search: "vietnamese",
        code: "vn",
        active: true
    },
    {
        label: "Western Sahara",
        search: "western sahara",
        code: "eh",
        active: false
    },
    {
        label: "Yemen",
        search: "yemen",
        code: "ye",
        active: false
    },
    {
        label: "Zambia",
        search: "zambia",
        code: "zm",
        active: false
    },
    {
        label: "Zimbabwe",
        search: "zimbabwe",
        code: "zw",
        active: false
    }

    ]

}