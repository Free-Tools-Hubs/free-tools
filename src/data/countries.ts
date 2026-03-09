export interface Country {
    slug: string;
    name: string;
    capital: string;
    region: string;
    population: string;
    currency: string;
    languages: string[];
    description: string;
    callingCode: string;
}

const countries: Country[] = [
    {
        slug: "sri-lanka",
        name: "Sri Lanka",
        capital: "Sri Jayawardenepura Kotte",
        region: "South Asia",
        population: "22 million",
        currency: "Sri Lankan Rupee (LKR)",
        languages: ["Sinhala", "Tamil"],
        callingCode: "+94",
        description:
            "Sri Lanka is an island nation in South Asia known for its biodiversity, tea plantations, and ancient Buddhist heritage."
    },
    {
        slug: "india",
        name: "India",
        capital: "New Delhi",
        region: "South Asia",
        population: "1.43 billion",
        currency: "Indian Rupee (INR)",
        languages: ["Hindi", "English"],
        callingCode: "+91",
        description:
            "India is the world's most populous country with a rich cultural history, diverse languages, and rapidly growing economy."
    },
    {
        slug: "japan",
        name: "Japan",
        capital: "Tokyo",
        region: "East Asia",
        population: "125 million",
        currency: "Japanese Yen (JPY)",
        languages: ["Japanese"],
        callingCode: "+81",
        description:
            "Japan blends traditional culture with cutting-edge technology and is famous for its cuisine, anime, and innovation."
    },
    {
        slug: "china",
        name: "China",
        capital: "Beijing",
        region: "East Asia",
        population: "1.41 billion",
        currency: "Renminbi (CNY)",
        languages: ["Mandarin Chinese"],
        callingCode: "+86",
        description:
            "China is one of the world's oldest civilizations and the second-largest economy globally."
    },
    {
        slug: "south-korea",
        name: "South Korea",
        capital: "Seoul",
        region: "East Asia",
        population: "52 million",
        currency: "South Korean Won (KRW)",
        languages: ["Korean"],
        callingCode: "+82",
        description:
            "South Korea is known for technology companies, K-pop culture, and strong economic development."
    },
    {
        slug: "thailand",
        name: "Thailand",
        capital: "Bangkok",
        region: "Southeast Asia",
        population: "71 million",
        currency: "Thai Baht (THB)",
        languages: ["Thai"],
        callingCode: "+66",
        description:
            "Thailand is famous for tropical beaches, ornate temples, and vibrant street food culture."
    },
    {
        slug: "indonesia",
        name: "Indonesia",
        capital: "Jakarta",
        region: "Southeast Asia",
        population: "277 million",
        currency: "Indonesian Rupiah (IDR)",
        languages: ["Indonesian"],
        callingCode: "+62",
        description:
            "Indonesia is the world's largest archipelago nation with thousands of islands and rich biodiversity."
    },
    {
        slug: "australia",
        name: "Australia",
        capital: "Canberra",
        region: "Oceania",
        population: "26 million",
        currency: "Australian Dollar (AUD)",
        languages: ["English"],
        callingCode: "+61",
        description:
            "Australia is known for unique wildlife, beautiful coastlines, and major cities like Sydney and Melbourne."
    },
    {
        slug: "new-zealand",
        name: "New Zealand",
        capital: "Wellington",
        region: "Oceania",
        population: "5 million",
        currency: "New Zealand Dollar (NZD)",
        languages: ["English", "Māori"],
        callingCode: "+64",
        description:
            "New Zealand is famous for dramatic landscapes, Maori culture, and outdoor adventure tourism."
    },
    {
        slug: "united-states",
        name: "United States",
        capital: "Washington, D.C.",
        region: "North America",
        population: "331 million",
        currency: "United States Dollar (USD)",
        languages: ["English"],
        callingCode: "+1",
        description:
            "The United States is a global superpower with diverse landscapes and the largest economy in the world."
    },
    {
        slug: "canada",
        name: "Canada",
        capital: "Ottawa",
        region: "North America",
        population: "40 million",
        currency: "Canadian Dollar (CAD)",
        languages: ["English", "French"],
        callingCode: "+1",
        description:
            "Canada is the second-largest country by land area and is known for its natural beauty and multicultural society."
    },
    {
        slug: "mexico",
        name: "Mexico",
        capital: "Mexico City",
        region: "North America",
        population: "129 million",
        currency: "Mexican Peso (MXN)",
        languages: ["Spanish"],
        callingCode: "+52",
        description:
            "Mexico is known for its ancient civilizations, cuisine, and vibrant cultural traditions."
    },
    {
        slug: "brazil",
        name: "Brazil",
        capital: "Brasília",
        region: "South America",
        population: "214 million",
        currency: "Brazilian Real (BRL)",
        languages: ["Portuguese"],
        callingCode: "+55",
        description:
            "Brazil is the largest country in South America and home to the Amazon rainforest."
    },
    {
        slug: "argentina",
        name: "Argentina",
        capital: "Buenos Aires",
        region: "South America",
        population: "45 million",
        currency: "Argentine Peso (ARS)",
        languages: ["Spanish"],
        callingCode: "+54",
        description:
            "Argentina is famous for tango, football culture, and the Andes mountains."
    },
    {
        slug: "chile",
        name: "Chile",
        capital: "Santiago",
        region: "South America",
        population: "19 million",
        currency: "Chilean Peso (CLP)",
        languages: ["Spanish"],
        callingCode: "+56",
        description:
            "Chile is a long, narrow country stretching along South America's western edge with diverse landscapes."
    },
    {
        slug: "united-kingdom",
        name: "United Kingdom",
        capital: "London",
        region: "Europe",
        population: "67 million",
        currency: "Pound Sterling (GBP)",
        languages: ["English"],
        callingCode: "+44",
        description:
            "The UK includes England, Scotland, Wales, and Northern Ireland and has played a major role in world history."
    },
    {
        slug: "france",
        name: "France",
        capital: "Paris",
        region: "Europe",
        population: "65 million",
        currency: "Euro (EUR)",
        languages: ["French"],
        callingCode: "+33",
        description:
            "France is famous for art, cuisine, fashion, and historical landmarks."
    },
    {
        slug: "germany",
        name: "Germany",
        capital: "Berlin",
        region: "Europe",
        population: "84 million",
        currency: "Euro (EUR)",
        languages: ["German"],
        callingCode: "+49",
        description:
            "Germany has Europe's largest economy and is known for engineering and manufacturing."
    },
    {
        slug: "italy",
        name: "Italy",
        capital: "Rome",
        region: "Europe",
        population: "59 million",
        currency: "Euro (EUR)",
        languages: ["Italian"],
        callingCode: "+39",
        description:
            "Italy is home to ancient Roman ruins, Renaissance art, and globally loved cuisine."
    },
    {
        slug: "spain",
        name: "Spain",
        capital: "Madrid",
        region: "Europe",
        population: "47 million",
        currency: "Euro (EUR)",
        languages: ["Spanish"],
        callingCode: "+34",
        description:
            "Spain is famous for flamenco, Mediterranean beaches, and historic cities."
    },
    {
        slug: "netherlands",
        name: "Netherlands",
        capital: "Amsterdam",
        region: "Europe",
        population: "17 million",
        currency: "Euro (EUR)",
        languages: ["Dutch"],
        callingCode: "+31",
        description:
            "The Netherlands is known for canals, windmills, cycling culture, and tulip fields."
    },
    {
        slug: "sweden",
        name: "Sweden",
        capital: "Stockholm",
        region: "Europe",
        population: "10 million",
        currency: "Swedish Krona (SEK)",
        languages: ["Swedish"],
        callingCode: "+46",
        description:
            "Sweden is known for high living standards, design, and innovation."
    },
    {
        slug: "norway",
        name: "Norway",
        capital: "Oslo",
        region: "Europe",
        population: "5.5 million",
        currency: "Norwegian Krone (NOK)",
        languages: ["Norwegian"],
        callingCode: "+47",
        description:
            "Norway is famous for fjords, northern lights, and strong welfare systems."
    },
    {
        slug: "finland",
        name: "Finland",
        capital: "Helsinki",
        region: "Europe",
        population: "5.6 million",
        currency: "Euro (EUR)",
        languages: ["Finnish", "Swedish"],
        callingCode: "+358",
        description:
            "Finland is known for forests, lakes, saunas, and a strong education system."
    },
    {
        slug: "turkey",
        name: "Turkey",
        capital: "Ankara",
        region: "West Asia",
        population: "85 million",
        currency: "Turkish Lira (TRY)",
        languages: ["Turkish"],
        callingCode: "+90",
        description:
            "Turkey sits between Europe and Asia and has a long history dating back to ancient civilizations."
    },
    {
        slug: "saudi-arabia",
        name: "Saudi Arabia",
        capital: "Riyadh",
        region: "Middle East",
        population: "36 million",
        currency: "Saudi Riyal (SAR)",
        languages: ["Arabic"],
        callingCode: "+966",
        description:
            "Saudi Arabia is known for vast deserts and as the birthplace of Islam."
    },
    {
        slug: "united-arab-emirates",
        name: "United Arab Emirates",
        capital: "Abu Dhabi",
        region: "Middle East",
        population: "10 million",
        currency: "UAE Dirham (AED)",
        languages: ["Arabic"],
        callingCode: "+971",
        description:
            "The UAE is known for modern cities like Dubai and strong global trade connections."
    },
    {
        slug: "south-africa",
        name: "South Africa",
        capital: "Pretoria",
        region: "Africa",
        population: "60 million",
        currency: "South African Rand (ZAR)",
        languages: ["Zulu", "Xhosa", "Afrikaans", "English"],
        callingCode: "+27",
        description:
            "South Africa has diverse cultures, wildlife reserves, and a complex political history."
    },
    {
        slug: "egypt",
        name: "Egypt",
        capital: "Cairo",
        region: "North Africa",
        population: "110 million",
        currency: "Egyptian Pound (EGP)",
        languages: ["Arabic"],
        callingCode: "+20",
        description:
            "Egypt is home to ancient pyramids, the Nile River, and one of the world's earliest civilizations."
    },
    {
        slug: "kenya",
        name: "Kenya",
        capital: "Nairobi",
        region: "East Africa",
        population: "55 million",
        currency: "Kenyan Shilling (KES)",
        languages: ["Swahili", "English"],
        callingCode: "+254",
        description:
            "Kenya is famous for wildlife safaris, the Great Rift Valley, and rich cultural diversity."
    },
    {
        slug: "pakistan",
        name: "Pakistan",
        capital: "Islamabad",
        region: "South Asia",
        population: "240 million",
        currency: "Pakistani Rupee (PKR)",
        languages: ["Urdu", "English"],
        callingCode: "+92",
        description:
            "Pakistan is a South Asian country with diverse landscapes ranging from mountains to deserts and a rich cultural history."
    },
    {
        slug: "bangladesh",
        name: "Bangladesh",
        capital: "Dhaka",
        region: "South Asia",
        population: "170 million",
        currency: "Bangladeshi Taka (BDT)",
        languages: ["Bengali"],
        callingCode: "+880",
        description:
            "Bangladesh is known for its river networks, vibrant textile industry, and dense population."
    },
    {
        slug: "nepal",
        name: "Nepal",
        capital: "Kathmandu",
        region: "South Asia",
        population: "30 million",
        currency: "Nepalese Rupee (NPR)",
        languages: ["Nepali"],
        callingCode: "+977",
        description:
            "Nepal is home to Mount Everest and known for Himalayan landscapes and rich spiritual traditions."
    },
    {
        slug: "malaysia",
        name: "Malaysia",
        capital: "Kuala Lumpur",
        region: "Southeast Asia",
        population: "34 million",
        currency: "Malaysian Ringgit (MYR)",
        languages: ["Malay"],
        callingCode: "+60",
        description:
            "Malaysia is known for tropical rainforests, multicultural society, and modern cities."
    },
    {
        slug: "singapore",
        name: "Singapore",
        capital: "Singapore",
        region: "Southeast Asia",
        population: "6 million",
        currency: "Singapore Dollar (SGD)",
        languages: ["English", "Malay", "Mandarin", "Tamil"],
        callingCode: "+65",
        description:
            "Singapore is a global financial hub known for its clean cityscape and modern infrastructure."
    },
    {
        slug: "vietnam",
        name: "Vietnam",
        capital: "Hanoi",
        region: "Southeast Asia",
        population: "98 million",
        currency: "Vietnamese Dong (VND)",
        languages: ["Vietnamese"],
        callingCode: "+84",
        description:
            "Vietnam is known for its rich history, cuisine, and beautiful landscapes including Ha Long Bay."
    },
    {
        slug: "philippines",
        name: "Philippines",
        capital: "Manila",
        region: "Southeast Asia",
        population: "113 million",
        currency: "Philippine Peso (PHP)",
        languages: ["Filipino", "English"],
        callingCode: "+63",
        description:
            "The Philippines is an archipelago with more than 7,000 islands known for beaches and vibrant culture."
    },
    {
        slug: "mongolia",
        name: "Mongolia",
        capital: "Ulaanbaatar",
        region: "East Asia",
        population: "3.4 million",
        currency: "Mongolian Tögrög (MNT)",
        languages: ["Mongolian"],
        callingCode: "+976",
        description:
            "Mongolia is famous for vast steppes, nomadic culture, and the legacy of Genghis Khan."
    },
    {
        slug: "kazakhstan",
        name: "Kazakhstan",
        capital: "Astana",
        region: "Central Asia",
        population: "19 million",
        currency: "Kazakhstani Tenge (KZT)",
        languages: ["Kazakh", "Russian"],
        callingCode: "+7",
        description:
            "Kazakhstan is the largest landlocked country in the world with vast steppes and rich natural resources."
    },
    {
        slug: "uzbekistan",
        name: "Uzbekistan",
        capital: "Tashkent",
        region: "Central Asia",
        population: "36 million",
        currency: "Uzbekistani Som (UZS)",
        languages: ["Uzbek"],
        callingCode: "+998",
        description:
            "Uzbekistan is famous for Silk Road cities such as Samarkand and Bukhara."
    },
    {
        slug: "greece",
        name: "Greece",
        capital: "Athens",
        region: "Europe",
        population: "10 million",
        currency: "Euro (EUR)",
        languages: ["Greek"],
        callingCode: "+30",
        description:
            "Greece is considered the cradle of Western civilization and known for ancient ruins and islands."
    },
    {
        slug: "portugal",
        name: "Portugal",
        capital: "Lisbon",
        region: "Europe",
        population: "10 million",
        currency: "Euro (EUR)",
        languages: ["Portuguese"],
        callingCode: "+351",
        description:
            "Portugal is known for its maritime history, scenic coastlines, and historic cities."
    },
    {
        slug: "switzerland",
        name: "Switzerland",
        capital: "Bern",
        region: "Europe",
        population: "8.7 million",
        currency: "Swiss Franc (CHF)",
        languages: ["German", "French", "Italian"],
        callingCode: "+41",
        description:
            "Switzerland is known for the Alps, banking industry, and high quality of life."
    },
    {
        slug: "austria",
        name: "Austria",
        capital: "Vienna",
        region: "Europe",
        population: "9 million",
        currency: "Euro (EUR)",
        languages: ["German"],
        callingCode: "+43",
        description:
            "Austria is famous for classical music heritage and Alpine scenery."
    },
    {
        slug: "poland",
        name: "Poland",
        capital: "Warsaw",
        region: "Europe",
        population: "38 million",
        currency: "Polish Zloty (PLN)",
        languages: ["Polish"],
        callingCode: "+48",
        description:
            "Poland has a rich history and is one of the fastest-growing economies in Europe."
    },
    {
        slug: "ukraine",
        name: "Ukraine",
        capital: "Kyiv",
        region: "Europe",
        population: "36 million",
        currency: "Ukrainian Hryvnia (UAH)",
        languages: ["Ukrainian"],
        callingCode: "+380",
        description:
            "Ukraine is one of the largest countries in Europe with fertile agricultural land."
    },
    {
        slug: "colombia",
        name: "Colombia",
        capital: "Bogotá",
        region: "South America",
        population: "52 million",
        currency: "Colombian Peso (COP)",
        languages: ["Spanish"],
        callingCode: "+57",
        description:
            "Colombia is known for coffee production, biodiversity, and vibrant culture."
    },
    {
        slug: "peru",
        name: "Peru",
        capital: "Lima",
        region: "South America",
        population: "34 million",
        currency: "Peruvian Sol (PEN)",
        languages: ["Spanish", "Quechua"],
        callingCode: "+51",
        description:
            "Peru is home to Machu Picchu and the ancient Inca civilization."
    },
    {
        slug: "venezuela",
        name: "Venezuela",
        capital: "Caracas",
        region: "South America",
        population: "28 million",
        currency: "Venezuelan Bolívar (VES)",
        languages: ["Spanish"],
        callingCode: "+58",
        description:
            "Venezuela has vast oil reserves and natural attractions such as Angel Falls."
    },
    {
        slug: "ecuador",
        name: "Ecuador",
        capital: "Quito",
        region: "South America",
        population: "18 million",
        currency: "United States Dollar (USD)",
        languages: ["Spanish"],
        callingCode: "+593",
        description:
            "Ecuador straddles the equator and includes the famous Galápagos Islands."
    },
    {
        slug: "morocco",
        name: "Morocco",
        capital: "Rabat",
        region: "North Africa",
        population: "37 million",
        currency: "Moroccan Dirham (MAD)",
        languages: ["Arabic", "Berber"],
        callingCode: "+212",
        description:
            "Morocco blends Arab, Berber, and European influences and is known for markets and deserts."
    },
    {
        slug: "ethiopia",
        name: "Ethiopia",
        capital: "Addis Ababa",
        region: "East Africa",
        population: "123 million",
        currency: "Ethiopian Birr (ETB)",
        languages: ["Amharic"],
        callingCode: "+251",
        description:
            "Ethiopia has one of the oldest histories in Africa and diverse cultures."
    },
    {
        slug: "tanzania",
        name: "Tanzania",
        capital: "Dodoma",
        region: "East Africa",
        population: "65 million",
        currency: "Tanzanian Shilling (TZS)",
        languages: ["Swahili", "English"],
        callingCode: "+255",
        description:
            "Tanzania is home to Mount Kilimanjaro and Serengeti National Park."
    },
    {
        slug: "uganda",
        name: "Uganda",
        capital: "Kampala",
        region: "East Africa",
        population: "49 million",
        currency: "Ugandan Shilling (UGX)",
        languages: ["English", "Swahili"],
        callingCode: "+256",
        description:
            "Uganda is known as the 'Pearl of Africa' due to its lush landscapes and wildlife."
    },
    {
        slug: "ghana",
        name: "Ghana",
        capital: "Accra",
        region: "West Africa",
        population: "34 million",
        currency: "Ghanaian Cedi (GHS)",
        languages: ["English"],
        callingCode: "+233",
        description:
            "Ghana is known for its rich cultural heritage, gold resources, and stable democracy."
    },
    {
        slug: "nigeria",
        name: "Nigeria",
        capital: "Abuja",
        region: "West Africa",
        population: "223 million",
        currency: "Nigerian Naira (NGN)",
        languages: ["English"],
        callingCode: "+234",
        description:
            "Nigeria is the most populous country in Africa and a major economic power in the region."
    },
    {
        slug: "iraq",
        name: "Iraq",
        capital: "Baghdad",
        region: "Middle East",
        population: "43 million",
        currency: "Iraqi Dinar (IQD)",
        languages: ["Arabic", "Kurdish"],
        callingCode: "+964",
        description:
            "Iraq is home to ancient Mesopotamian civilizations such as Babylon and Sumer."
    },
    {
        slug: "iran",
        name: "Iran",
        capital: "Tehran",
        region: "Middle East",
        population: "88 million",
        currency: "Iranian Rial (IRR)",
        languages: ["Persian"],
        callingCode: "+98",
        description:
            "Iran has a long Persian history, rich culture, and significant geopolitical influence."
    },
    {
        slug: "qatar",
        name: "Qatar",
        capital: "Doha",
        region: "Middle East",
        population: "3 million",
        currency: "Qatari Riyal (QAR)",
        languages: ["Arabic"],
        callingCode: "+974",
        description:
            "Qatar is a wealthy Gulf nation known for natural gas reserves and modern architecture."
    },
    {
        slug: "kuwait",
        name: "Kuwait",
        capital: "Kuwait City",
        region: "Middle East",
        population: "4.5 million",
        currency: "Kuwaiti Dinar (KWD)",
        languages: ["Arabic"],
        callingCode: "+965",
        description:
            "Kuwait is known for its oil wealth and strategic location in the Persian Gulf."
    }
];

export default countries;
