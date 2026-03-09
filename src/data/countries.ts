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
    },
    {
        slug: "afghanistan",
        name: "Afghanistan",
        capital: "Kabul",
        region: "South Asia",
        population: "42 million",
        currency: "Afghan Afghani (AFN)",
        languages: ["Pashto", "Dari"],
        callingCode: "+93",
        description: "Afghanistan is a landlocked country in Central Asia known for its rugged mountains and rich historical heritage along the Silk Road."
    },
    {
        slug: "albania",
        name: "Albania",
        capital: "Tirana",
        region: "Europe",
        population: "2.8 million",
        currency: "Albanian Lek (ALL)",
        languages: ["Albanian"],
        callingCode: "+355",
        description: "Albania is a Balkan nation with a stunning Adriatic coastline, ancient history, and emerging tourism."
    },
    {
        slug: "algeria",
        name: "Algeria",
        capital: "Algiers",
        region: "North Africa",
        population: "46 million",
        currency: "Algerian Dinar (DZD)",
        languages: ["Arabic", "Berber"],
        callingCode: "+213",
        description: "Algeria is the largest country in Africa by land area, known for its Sahara Desert landscapes and Mediterranean coast."
    },
    {
        slug: "andorra",
        name: "Andorra",
        capital: "Andorra la Vella",
        region: "Europe",
        population: "80,000",
        currency: "Euro (EUR)",
        languages: ["Catalan"],
        callingCode: "+376",
        description: "Andorra is a small principality in the Pyrenees mountains, famous for skiing, shopping, and tax advantages."
    },
    {
        slug: "angola",
        name: "Angola",
        capital: "Luanda",
        region: "Central Africa",
        population: "37 million",
        currency: "Angolan Kwanza (AOA)",
        languages: ["Portuguese"],
        callingCode: "+244",
        description: "Angola is rich in natural resources like oil and diamonds, with diverse ecosystems from rainforests to deserts."
    },
    {
        slug: "antigua-and-barbuda",
        name: "Antigua and Barbuda",
        capital: "Saint John's",
        region: "Caribbean",
        population: "100,000",
        currency: "East Caribbean Dollar (XCD)",
        languages: ["English"],
        callingCode: "+1-268",
        description: "Antigua and Barbuda is a twin-island Caribbean nation known for its beaches and sailing culture."
    },
    {
        slug: "armenia",
        name: "Armenia",
        capital: "Yerevan",
        region: "West Asia",
        population: "2.8 million",
        currency: "Armenian Dram (AMD)",
        languages: ["Armenian"],
        callingCode: "+374",
        description: "Armenia is an ancient nation in the Caucasus with deep Christian heritage and mountainous terrain."
    },
    {
        slug: "azerbaijan",
        name: "Azerbaijan",
        capital: "Baku",
        region: "West Asia",
        population: "10 million",
        currency: "Azerbaijani Manat (AZN)",
        languages: ["Azerbaijani"],
        callingCode: "+994",
        description: "Azerbaijan straddles Europe and Asia, known for its oil wealth and the futuristic capital Baku."
    },
    {
        slug: "bahamas",
        name: "Bahamas",
        capital: "Nassau",
        region: "Caribbean",
        population: "400,000",
        currency: "Bahamian Dollar (BSD)",
        languages: ["English"],
        callingCode: "+1-242",
        description: "The Bahamas is an archipelago famous for crystal-clear waters, coral reefs, and luxury tourism."
    },
    {
        slug: "bahrain",
        name: "Bahrain",
        capital: "Manama",
        region: "Middle East",
        population: "1.5 million",
        currency: "Bahraini Dinar (BHD)",
        languages: ["Arabic"],
        callingCode: "+973",
        description: "Bahrain is a small island nation in the Persian Gulf known for its financial sector and Formula 1 racing."
    },
    {
        slug: "barbados",
        name: "Barbados",
        capital: "Bridgetown",
        region: "Caribbean",
        population: "280,000",
        currency: "Barbadian Dollar (BBD)",
        languages: ["English"],
        callingCode: "+1-246",
        description: "Barbados is a vibrant Caribbean island known for cricket, rum, and beautiful beaches."
    },
    {
        slug: "belarus",
        name: "Belarus",
        capital: "Minsk",
        region: "Europe",
        population: "9.2 million",
        currency: "Belarusian Ruble (BYN)",
        languages: ["Belarusian", "Russian"],
        callingCode: "+375",
        description: "Belarus is an Eastern European country with vast forests and a strong industrial base."
    },
    {
        slug: "belgium",
        name: "Belgium",
        capital: "Brussels",
        region: "Europe",
        population: "12 million",
        currency: "Euro (EUR)",
        languages: ["Dutch", "French", "German"],
        callingCode: "+32",
        description: "Belgium is the heart of the European Union, famous for chocolate, beer, and medieval cities."
    },
    {
        slug: "belize",
        name: "Belize",
        capital: "Belmopan",
        region: "Central America",
        population: "400,000",
        currency: "Belize Dollar (BZD)",
        languages: ["English"],
        callingCode: "+501",
        description: "Belize is known for its barrier reef, Mayan ruins, and lush jungles in Central America."
    },
    {
        slug: "benin",
        name: "Benin",
        capital: "Porto-Novo",
        region: "West Africa",
        population: "13 million",
        currency: "West African CFA Franc (XOF)",
        languages: ["French"],
        callingCode: "+229",
        description: "Benin is a West African nation with a rich Voodoo heritage and coastal attractions."
    },
    {
        slug: "bhutan",
        name: "Bhutan",
        capital: "Thimphu",
        region: "South Asia",
        population: "780,000",
        currency: "Bhutanese Ngultrum (BTN)",
        languages: ["Dzongkha"],
        callingCode: "+975",
        description: "Bhutan is a Himalayan kingdom famous for measuring Gross National Happiness and stunning monasteries."
    },
    {
        slug: "bolivia",
        name: "Bolivia",
        capital: "Sucre (constitutional), La Paz (seat of government)",
        region: "South America",
        population: "12 million",
        currency: "Bolivian Boliviano (BOB)",
        languages: ["Spanish", "Quechua", "Aymara"],
        callingCode: "+591",
        description: "Bolivia is a landlocked Andean nation with salt flats, indigenous cultures, and high-altitude cities."
    },
    {
        slug: "bosnia-and-herzegovina",
        name: "Bosnia and Herzegovina",
        capital: "Sarajevo",
        region: "Europe",
        population: "3.2 million",
        currency: "Bosnia and Herzegovina Convertible Mark (BAM)",
        languages: ["Bosnian", "Croatian", "Serbian"],
        callingCode: "+387",
        description: "Bosnia and Herzegovina features Ottoman and Austro-Hungarian architecture and dramatic landscapes."
    },
    {
        slug: "botswana",
        name: "Botswana",
        capital: "Gaborone",
        region: "Southern Africa",
        population: "2.6 million",
        currency: "Botswana Pula (BWP)",
        languages: ["English", "Tswana"],
        callingCode: "+267",
        description: "Botswana is known for the Okavango Delta, diamond mining, and stable governance."
    },
    {
        slug: "brunei",
        name: "Brunei",
        capital: "Bandar Seri Begawan",
        region: "Southeast Asia",
        population: "450,000",
        currency: "Brunei Dollar (BND)",
        languages: ["Malay"],
        callingCode: "+673",
        description: "Brunei is a small, wealthy sultanate on Borneo known for oil wealth and Islamic heritage."
    },
    {
        slug: "bulgaria",
        name: "Bulgaria",
        capital: "Sofia",
        region: "Europe",
        population: "6.4 million",
        currency: "Bulgarian Lev (BGN)",
        languages: ["Bulgarian"],
        callingCode: "+359",
        description: "Bulgaria offers Black Sea beaches, ancient Thracian sites, and rose valleys."
    },
    {
        slug: "burkina-faso",
        name: "Burkina Faso",
        capital: "Ouagadougou",
        region: "West Africa",
        population: "23 million",
        currency: "West African CFA Franc (XOF)",
        languages: ["French"],
        callingCode: "+226",
        description: "Burkina Faso is known for its vibrant arts scene and Sahelian landscapes."
    },
    {
        slug: "burundi",
        name: "Burundi",
        capital: "Gitega",
        region: "East Africa",
        population: "13 million",
        currency: "Burundian Franc (BIF)",
        languages: ["Kirundi", "French", "English"],
        callingCode: "+257",
        description: "Burundi is a landlocked East African nation with Lake Tanganyika and hilly terrain."
    },
    {
        slug: "cabo-verde",
        name: "Cabo Verde",
        capital: "Praia",
        region: "West Africa",
        population: "600,000",
        currency: "Cape Verdean Escudo (CVE)",
        languages: ["Portuguese"],
        callingCode: "+238",
        description: "Cabo Verde is an Atlantic archipelago known for music, beaches, and volcanic islands."
    },
    {
        slug: "cambodia",
        name: "Cambodia",
        capital: "Phnom Penh",
        region: "Southeast Asia",
        population: "17 million",
        currency: "Cambodian Riel (KHR)",
        languages: ["Khmer"],
        callingCode: "+855",
        description: "Cambodia is home to the ancient Angkor Wat temple complex and vibrant markets."
    },
    {
        slug: "cameroon",
        name: "Cameroon",
        capital: "Yaoundé",
        region: "Central Africa",
        population: "28 million",
        currency: "Central African CFA Franc (XAF)",
        languages: ["English", "French"],
        callingCode: "+237",
        description: "Cameroon is diverse, with rainforests, savannas, and the active Mount Cameroon volcano."
    },
    {
        slug: "central-african-republic",
        name: "Central African Republic",
        capital: "Bangui",
        region: "Central Africa",
        population: "5.5 million",
        currency: "Central African CFA Franc (XAF)",
        languages: ["French", "Sango"],
        callingCode: "+236",
        description: "The Central African Republic features vast rainforests and rich biodiversity."
    },
    {
        slug: "chad",
        name: "Chad",
        capital: "N'Djamena",
        region: "Central Africa",
        population: "18 million",
        currency: "Central African CFA Franc (XAF)",
        languages: ["French", "Arabic"],
        callingCode: "+235",
        description: "Chad spans the Sahara and Sahel, with Lake Chad as a vital water source."
    },
    {
        slug: "comoros",
        name: "Comoros",
        capital: "Moroni",
        region: "East Africa",
        population: "850,000",
        currency: "Comorian Franc (KMF)",
        languages: ["Comorian", "Arabic", "French"],
        callingCode: "+269",
        description: "Comoros is a volcanic archipelago in the Indian Ocean known for its spice production."
    },
    {
        slug: "congo-brazzaville",
        name: "Congo",
        capital: "Brazzaville",
        region: "Central Africa",
        population: "6 million",
        currency: "Central African CFA Franc (XAF)",
        languages: ["French"],
        callingCode: "+242",
        description: "The Republic of the Congo features dense rainforests and the Congo River."
    },
    {
        slug: "congo-kinshasa",
        name: "Democratic Republic of the Congo",
        capital: "Kinshasa",
        region: "Central Africa",
        population: "102 million",
        currency: "Congolese Franc (CDF)",
        languages: ["French"],
        callingCode: "+243",
        description: "The DRC is the second-largest country in Africa, rich in minerals and home to the Congo Basin rainforest."
    },
    {
        slug: "costa-rica",
        name: "Costa Rica",
        capital: "San José",
        region: "Central America",
        population: "5.2 million",
        currency: "Costa Rican Colón (CRC)",
        languages: ["Spanish"],
        callingCode: "+506",
        description: "Costa Rica is renowned for biodiversity, eco-tourism, and no standing army."
    },
    {
        slug: "cote-divoire",
        name: "Côte d'Ivoire",
        capital: "Yamoussoukro",
        region: "West Africa",
        population: "29 million",
        currency: "West African CFA Franc (XOF)",
        languages: ["French"],
        callingCode: "+225",
        description: "Côte d'Ivoire is a major cocoa producer with vibrant markets and beaches."
    },
    {
        slug: "croatia",
        name: "Croatia",
        capital: "Zagreb",
        region: "Europe",
        population: "3.8 million",
        currency: "Euro (EUR)",
        languages: ["Croatian"],
        callingCode: "+385",
        description: "Croatia boasts Adriatic coastlines, historic Dubrovnik, and islands."
    },
    {
        slug: "cuba",
        name: "Cuba",
        capital: "Havana",
        region: "Caribbean",
        population: "11 million",
        currency: "Cuban Peso (CUP)",
        languages: ["Spanish"],
        callingCode: "+53",
        description: "Cuba is known for classic cars, cigars, revolutionary history, and music."
    },
    {
        slug: "cyprus",
        name: "Cyprus",
        capital: "Nicosia",
        region: "Europe",
        population: "1.3 million",
        currency: "Euro (EUR)",
        languages: ["Greek", "Turkish"],
        callingCode: "+357",
        description: "Cyprus is an island nation divided since 1974, with ancient sites and beaches."
    },
    {
        slug: "czechia",
        name: "Czechia",
        capital: "Prague",
        region: "Europe",
        population: "10.5 million",
        currency: "Czech Koruna (CZK)",
        languages: ["Czech"],
        callingCode: "+420",
        description: "Czechia features fairy-tale Prague, castles, and world-famous beer."
    },
    {
        slug: "denmark",
        name: "Denmark",
        capital: "Copenhagen",
        region: "Europe",
        population: "5.9 million",
        currency: "Danish Krone (DKK)",
        languages: ["Danish"],
        callingCode: "+45",
        description: "Denmark is known for hygge, design, cycling culture, and the Little Mermaid."
    },
    {
        slug: "djibouti",
        name: "Djibouti",
        capital: "Djibouti",
        region: "East Africa",
        population: "1.1 million",
        currency: "Djiboutian Franc (DJF)",
        languages: ["French", "Arabic"],
        callingCode: "+253",
        description: "Djibouti is a strategic Horn of Africa nation with volcanic landscapes and ports."
    },
    {
        slug: "dominica",
        name: "Dominica",
        capital: "Roseau",
        region: "Caribbean",
        population: "72,000",
        currency: "East Caribbean Dollar (XCD)",
        languages: ["English"],
        callingCode: "+1-767",
        description: "Dominica is the 'Nature Isle' with rainforests, hot springs, and whale watching."
    },
    {
        slug: "dominican-republic",
        name: "Dominican Republic",
        capital: "Santo Domingo",
        region: "Caribbean",
        population: "11 million",
        currency: "Dominican Peso (DOP)",
        languages: ["Spanish"],
        callingCode: "+1-809",
        description: "The Dominican Republic shares Hispaniola with Haiti and offers beaches and merengue music."
    },
    {
        slug: "east-timor",
        name: "Timor-Leste",
        capital: "Dili",
        region: "Southeast Asia",
        population: "1.4 million",
        currency: "United States Dollar (USD)",
        languages: ["Tetum", "Portuguese"],
        callingCode: "+670",
        description: "Timor-Leste is a young Southeast Asian nation with beautiful coasts and mountains."
    },
    {
        slug: "el-salvador",
        name: "El Salvador",
        capital: "San Salvador",
        region: "Central America",
        population: "6.5 million",
        currency: "United States Dollar (USD)",
        languages: ["Spanish"],
        callingCode: "+503",
        description: "El Salvador is known for volcanoes, surfing beaches, and pupusas."
    },
    {
        slug: "equatorial-guinea",
        name: "Equatorial Guinea",
        capital: "Malabo",
        region: "Central Africa",
        population: "1.7 million",
        currency: "Central African CFA Franc (XAF)",
        languages: ["Spanish", "French", "Portuguese"],
        callingCode: "+240",
        description: "Equatorial Guinea is oil-rich with rainforests and islands like Bioko."
    },
    {
        slug: "eritrea",
        name: "Eritrea",
        capital: "Asmara",
        region: "East Africa",
        population: "3.7 million",
        currency: "Eritrean Nakfa (ERN)",
        languages: ["Tigrinya", "Arabic", "English"],
        callingCode: "+291",
        description: "Eritrea features Art Deco architecture in Asmara and Red Sea coastlines."
    },
    {
        slug: "estonia",
        name: "Estonia",
        capital: "Tallinn",
        region: "Europe",
        population: "1.3 million",
        currency: "Euro (EUR)",
        languages: ["Estonian"],
        callingCode: "+372",
        description: "Estonia is a digital leader with medieval Tallinn and vast forests."
    },
    {
        slug: "eswatini",
        name: "Eswatini",
        capital: "Mbabane (administrative), Lobamba (legislative)",
        region: "Southern Africa",
        population: "1.2 million",
        currency: "Swazi Lilangeni (SZL)",
        languages: ["Swazi", "English"],
        callingCode: "+268",
        description: "Eswatini is a small monarchy known for wildlife reserves and traditional ceremonies."
    },
    {
        slug: "fiji",
        name: "Fiji",
        capital: "Suva",
        region: "Oceania",
        population: "930,000",
        currency: "Fijian Dollar (FJD)",
        languages: ["English", "Fijian", "Fiji Hindi"],
        callingCode: "+679",
        description: "Fiji is a Pacific island nation famous for coral reefs and friendly culture."
    },
    {
        slug: "gabon",
        name: "Gabon",
        capital: "Libreville",
        region: "Central Africa",
        population: "2.4 million",
        currency: "Central African CFA Franc (XAF)",
        languages: ["French"],
        callingCode: "+241",
        description: "Gabon has pristine rainforests and is a leader in African conservation."
    },
    {
        slug: "gambia",
        name: "Gambia",
        capital: "Banjul",
        region: "West Africa",
        population: "2.7 million",
        currency: "Gambian Dalasi (GMD)",
        languages: ["English"],
        callingCode: "+220",
        description: "The Gambia is a narrow river nation surrounded by Senegal, known for birdlife."
    },
    {
        slug: "georgia",
        name: "Georgia",
        capital: "Tbilisi",
        region: "West Asia",
        population: "3.7 million",
        currency: "Georgian Lari (GEL)",
        languages: ["Georgian"],
        callingCode: "+995",
        description: "Georgia bridges Europe and Asia with ancient wine culture and Caucasus mountains."
    },
    {
        slug: "grenada",
        name: "Grenada",
        capital: "St. George's",
        region: "Caribbean",
        population: "125,000",
        currency: "East Caribbean Dollar (XCD)",
        languages: ["English"],
        callingCode: "+1-473",
        description: "Grenada is the 'Spice Isle' famous for nutmeg and beautiful bays."
    },
    {
        slug: "guatemala",
        name: "Guatemala",
        capital: "Guatemala City",
        region: "Central America",
        population: "18 million",
        currency: "Guatemalan Quetzal (GTQ)",
        languages: ["Spanish"],
        callingCode: "+502",
        description: "Guatemala features Mayan ruins, volcanoes, and colorful indigenous markets."
    },
    {
        slug: "guinea",
        name: "Guinea",
        capital: "Conakry",
        region: "West Africa",
        population: "14 million",
        currency: "Guinean Franc (GNF)",
        languages: ["French"],
        callingCode: "+224",
        description: "Guinea is rich in bauxite with coastal plains and Fouta Djallon highlands."
    },
    {
        slug: "guinea-bissau",
        name: "Guinea-Bissau",
        capital: "Bissau",
        region: "West Africa",
        population: "2.2 million",
        currency: "West African CFA Franc (XOF)",
        languages: ["Portuguese"],
        callingCode: "+245",
        description: "Guinea-Bissau has mangrove forests, islands, and a history of independence struggle."
    },
    {
        slug: "guyana",
        name: "Guyana",
        capital: "Georgetown",
        region: "South America",
        population: "810,000",
        currency: "Guyanese Dollar (GYD)",
        languages: ["English"],
        callingCode: "+592",
        description: "Guyana features the Amazon rainforest, Kaieteur Falls, and diverse wildlife."
    },
    {
        slug: "haiti",
        name: "Haiti",
        capital: "Port-au-Prince",
        region: "Caribbean",
        population: "11.5 million",
        currency: "Haitian Gourde (HTG)",
        languages: ["French", "Haitian Creole"],
        callingCode: "+509",
        description: "Haiti shares Hispaniola with the Dominican Republic and has a rich revolutionary history."
    },
    {
        slug: "honduras",
        name: "Honduras",
        capital: "Tegucigalpa",
        region: "Central America",
        population: "10.5 million",
        currency: "Honduran Lempira (HNL)",
        languages: ["Spanish"],
        callingCode: "+504",
        description: "Honduras is known for Mayan ruins, coral reefs, and coffee production."
    },
    {
        slug: "hungary",
        name: "Hungary",
        capital: "Budapest",
        region: "Europe",
        population: "9.6 million",
        currency: "Hungarian Forint (HUF)",
        languages: ["Hungarian"],
        callingCode: "+36",
        description: "Hungary features thermal baths, the Danube, and historic Budapest."
    },
    {
        slug: "iceland",
        name: "Iceland",
        capital: "Reykjavík",
        region: "Europe",
        population: "380,000",
        currency: "Icelandic Króna (ISK)",
        languages: ["Icelandic"],
        callingCode: "+354",
        description: "Iceland is known for volcanoes, geysers, northern lights, and geothermal energy."
    },
    {
        slug: "ireland",
        name: "Ireland",
        capital: "Dublin",
        region: "Europe",
        population: "5.3 million",
        currency: "Euro (EUR)",
        languages: ["English", "Irish"],
        callingCode: "+353",
        description: "Ireland is famous for green landscapes, pubs, literature, and Celtic heritage."
    },
    {
        slug: "israel",
        name: "Israel",
        capital: "Jerusalem",
        region: "Middle East",
        population: "9.8 million",
        currency: "Israeli New Shekel (ILS)",
        languages: ["Hebrew", "Arabic"],
        callingCode: "+972",
        description: "Israel is a Middle Eastern nation with ancient holy sites and modern innovation."
    },
    {
        slug: "jamaica",
        name: "Jamaica",
        capital: "Kingston",
        region: "Caribbean",
        population: "2.8 million",
        currency: "Jamaican Dollar (JMD)",
        languages: ["English"],
        callingCode: "+1-876",
        description: "Jamaica is renowned for reggae, Bob Marley, beaches, and jerk cuisine."
    },
    {
        slug: "jordan",
        name: "Jordan",
        capital: "Amman",
        region: "Middle East",
        population: "11 million",
        currency: "Jordanian Dinar (JOD)",
        languages: ["Arabic"],
        callingCode: "+962",
        description: "Jordan features Petra, the Dead Sea, and Wadi Rum desert landscapes."
    },
    {
        slug: "kiribati",
        name: "Kiribati",
        capital: "Tarawa",
        region: "Oceania",
        population: "130,000",
        currency: "Australian Dollar (AUD)",
        languages: ["English", "Gilbertese"],
        callingCode: "+686",
        description: "Kiribati is a Pacific island nation vulnerable to climate change with atolls and lagoons."
    },
    {
        slug: "kosovo",
        name: "Kosovo",
        capital: "Pristina",
        region: "Europe",
        population: "1.8 million",
        currency: "Euro (EUR)",
        languages: ["Albanian", "Serbian"],
        callingCode: "+383",
        description: "Kosovo is a partially recognized Balkan state with rich history and mountains."
    },
    {
        slug: "kyrgyzstan",
        name: "Kyrgyzstan",
        capital: "Bishkek",
        region: "Central Asia",
        population: "7 million",
        currency: "Kyrgystani Som (KGS)",
        languages: ["Kyrgyz", "Russian"],
        callingCode: "+996",
        description: "Kyrgyzstan features Tian Shan mountains, Issyk-Kul Lake, and nomadic traditions."
    },
    {
        slug: "latvia",
        name: "Latvia",
        capital: "Riga",
        region: "Europe",
        population: "1.8 million",
        currency: "Euro (EUR)",
        languages: ["Latvian"],
        callingCode: "+371",
        description: "Latvia has Art Nouveau architecture in Riga and Baltic Sea coastlines."
    },
    {
        slug: "lebanon",
        name: "Lebanon",
        capital: "Beirut",
        region: "Middle East",
        population: "5.3 million",
        currency: "Lebanese Pound (LBP)",
        languages: ["Arabic"],
        callingCode: "+961",
        description: "Lebanon blends Mediterranean culture, ancient ruins, and vibrant Beirut."
    },
    {
        slug: "lesotho",
        name: "Lesotho",
        capital: "Maseru",
        region: "Southern Africa",
        population: "2.3 million",
        currency: "Lesotho Loti (LSL)",
        languages: ["Sesotho", "English"],
        callingCode: "+266",
        description: "Lesotho is a mountainous kingdom completely surrounded by South Africa."
    },
    {
        slug: "liberia",
        name: "Liberia",
        capital: "Monrovia",
        region: "West Africa",
        population: "5.4 million",
        currency: "Liberian Dollar (LRD)",
        languages: ["English"],
        callingCode: "+231",
        description: "Liberia was founded by freed American slaves and has Atlantic coastlines."
    },
    {
        slug: "libya",
        name: "Libya",
        capital: "Tripoli",
        region: "North Africa",
        population: "7 million",
        currency: "Libyan Dinar (LYD)",
        languages: ["Arabic"],
        callingCode: "+218",
        description: "Libya features vast Sahara Desert and ancient Roman ruins."
    },
    {
        slug: "liechtenstein",
        name: "Liechtenstein",
        capital: "Vaduz",
        region: "Europe",
        population: "40,000",
        currency: "Swiss Franc (CHF)",
        languages: ["German"],
        callingCode: "+423",
        description: "Liechtenstein is a tiny Alpine principality known for castles and low taxes."
    },
    {
        slug: "lithuania",
        name: "Lithuania",
        capital: "Vilnius",
        region: "Europe",
        population: "2.8 million",
        currency: "Euro (EUR)",
        languages: ["Lithuanian"],
        callingCode: "+370",
        description: "Lithuania has historic Vilnius and Baltic Sea beaches."
    },
    {
        slug: "luxembourg",
        name: "Luxembourg",
        capital: "Luxembourg City",
        region: "Europe",
        population: "660,000",
        currency: "Euro (EUR)",
        languages: ["Luxembourgish", "French", "German"],
        callingCode: "+352",
        description: "Luxembourg is a wealthy financial hub with medieval fortifications."
    },
    {
        slug: "madagascar",
        name: "Madagascar",
        capital: "Antananarivo",
        region: "East Africa",
        population: "30 million",
        currency: "Malagasy Ariary (MGA)",
        languages: ["Malagasy", "French"],
        callingCode: "+261",
        description: "Madagascar is an island with unique biodiversity, including lemurs."
    },
    {
        slug: "malawi",
        name: "Malawi",
        capital: "Lilongwe",
        region: "East Africa",
        population: "21 million",
        currency: "Malawian Kwacha (MWK)",
        languages: ["English", "Chichewa"],
        callingCode: "+265",
        description: "Malawi is known as the 'Warm Heart of Africa' with Lake Malawi."
    },
    {
        slug: "maldives",
        name: "Maldives",
        capital: "Malé",
        region: "South Asia",
        population: "520,000",
        currency: "Maldivian Rufiyaa (MVR)",
        languages: ["Dhivehi"],
        callingCode: "+960",
        description: "The Maldives is a tropical paradise of atolls famous for overwater bungalows."
    },
    {
        slug: "mali",
        name: "Mali",
        capital: "Bamako",
        region: "West Africa",
        population: "23 million",
        currency: "West African CFA Franc (XOF)",
        languages: ["French"],
        callingCode: "+223",
        description: "Mali features Timbuktu and the ancient Dogon cliffs."
    },
    {
        slug: "malta",
        name: "Malta",
        capital: "Valletta",
        region: "Europe",
        population: "540,000",
        currency: "Euro (EUR)",
        languages: ["Maltese", "English"],
        callingCode: "+356",
        description: "Malta is a Mediterranean archipelago with ancient temples and history."
    },
    {
        slug: "marshall-islands",
        name: "Marshall Islands",
        capital: "Majuro",
        region: "Oceania",
        population: "42,000",
        currency: "United States Dollar (USD)",
        languages: ["English", "Marshallese"],
        callingCode: "+692",
        description: "The Marshall Islands are Pacific atolls known for WWII history and Bikini Atoll."
    },
    {
        slug: "mauritania",
        name: "Mauritania",
        capital: "Nouakchott",
        region: "West Africa",
        population: "4.9 million",
        currency: "Mauritanian Ouguiya (MRU)",
        languages: ["Arabic"],
        callingCode: "+222",
        description: "Mauritania spans Sahara Desert with ancient caravan cities."
    },
    {
        slug: "mauritius",
        name: "Mauritius",
        capital: "Port Louis",
        region: "East Africa",
        population: "1.3 million",
        currency: "Mauritian Rupee (MUR)",
        languages: ["English"],
        callingCode: "+230",
        description: "Mauritius is an Indian Ocean island known for beaches and Creole culture."
    },
    {
        slug: "micronesia",
        name: "Micronesia",
        capital: "Palikir",
        region: "Oceania",
        population: "115,000",
        currency: "United States Dollar (USD)",
        languages: ["English"],
        callingCode: "+691",
        description: "The Federated States of Micronesia feature coral atolls and WWII wrecks."
    },
    {
        slug: "moldova",
        name: "Moldova",
        capital: "Chișinău",
        region: "Europe",
        population: "2.5 million",
        currency: "Moldovan Leu (MDL)",
        languages: ["Romanian"],
        callingCode: "+373",
        description: "Moldova is known for wine production and rural landscapes."
    },
    {
        slug: "monaco",
        name: "Monaco",
        capital: "Monaco",
        region: "Europe",
        population: "40,000",
        currency: "Euro (EUR)",
        languages: ["French"],
        callingCode: "+377",
        description: "Monaco is a tiny principality famous for casinos, Grand Prix, and luxury."
    },
    {
        slug: "montenegro",
        name: "Montenegro",
        capital: "Podgorica",
        region: "Europe",
        population: "620,000",
        currency: "Euro (EUR)",
        languages: ["Montenegrin"],
        callingCode: "+382",
        description: "Montenegro has Adriatic coast, Bay of Kotor, and rugged mountains."
    },
    {
        slug: "mozambique",
        name: "Mozambique",
        capital: "Maputo",
        region: "East Africa",
        population: "34 million",
        currency: "Mozambican Metical (MZN)",
        languages: ["Portuguese"],
        callingCode: "+258",
        description: "Mozambique features Indian Ocean beaches and Bazaruto Archipelago."
    },
    {
        slug: "myanmar",
        name: "Myanmar",
        capital: "Naypyidaw",
        region: "Southeast Asia",
        population: "54 million",
        currency: "Myanmar Kyat (MMK)",
        languages: ["Burmese"],
        callingCode: "+95",
        description: "Myanmar is known for pagodas, Bagan temples, and Inle Lake."
    },
    {
        slug: "namibia",
        name: "Namibia",
        capital: "Windhoek",
        region: "Southern Africa",
        population: "2.6 million",
        currency: "Namibian Dollar (NAD)",
        languages: ["English"],
        callingCode: "+264",
        description: "Namibia features Etosha National Park, Namib Desert dunes, and Skeleton Coast."
    },
    {
        slug: "nauru",
        name: "Nauru",
        capital: "Yaren",
        region: "Oceania",
        population: "13,000",
        currency: "Australian Dollar (AUD)",
        languages: ["English", "Nauruan"],
        callingCode: "+674",
        description: "Nauru is a tiny Pacific island once rich in phosphate, now facing challenges."
    },
    {
        slug: "nicaragua",
        name: "Nicaragua",
        capital: "Managua",
        region: "Central America",
        population: "7 million",
        currency: "Nicaraguan Córdoba (NIO)",
        languages: ["Spanish"],
        callingCode: "+505",
        description: "Nicaragua has volcanoes, lakes, and colonial Granada."
    },
    {
        slug: "niger",
        name: "Niger",
        capital: "Niamey",
        region: "West Africa",
        population: "27 million",
        currency: "West African CFA Franc (XOF)",
        languages: ["French"],
        callingCode: "+227",
        description: "Niger is mostly Sahara with the Niger River and ancient Agadez."
    },
    {
        slug: "north-korea",
        name: "North Korea",
        capital: "Pyongyang",
        region: "East Asia",
        population: "26 million",
        currency: "North Korean Won (KPW)",
        languages: ["Korean"],
        callingCode: "+850",
        description: "North Korea is a reclusive nation with monumental architecture in Pyongyang."
    },
    {
        slug: "north-macedonia",
        name: "North Macedonia",
        capital: "Skopje",
        region: "Europe",
        population: "2 million",
        currency: "Macedonian Denar (MKD)",
        languages: ["Macedonian"],
        callingCode: "+389",
        description: "North Macedonia features lakes, mountains, and historic Ohrid."
    },
    {
        slug: "oman",
        name: "Oman",
        capital: "Muscat",
        region: "Middle East",
        population: "4.6 million",
        currency: "Omani Rial (OMR)",
        languages: ["Arabic"],
        callingCode: "+968",
        description: "Oman is known for frankincense, forts, and dramatic wadis."
    },
    {
        slug: "palau",
        name: "Palau",
        capital: "Ngerulmud",
        region: "Oceania",
        population: "18,000",
        currency: "United States Dollar (USD)",
        languages: ["English", "Palauan"],
        callingCode: "+680",
        description: "Palau features jellyfish lake and world-class diving."
    },
    {
        slug: "palestine",
        name: "Palestine",
        capital: "Ramallah (de facto), East Jerusalem (claimed)",
        region: "Middle East",
        population: "5.5 million",
        currency: "Israeli New Shekel (ILS), Jordanian Dinar (JOD)",
        languages: ["Arabic"],
        callingCode: "+970",
        description: "Palestine includes historic sites in the West Bank and Gaza Strip."
    },
    {
        slug: "panama",
        name: "Panama",
        capital: "Panama City",
        region: "Central America",
        population: "4.5 million",
        currency: "Panamanian Balboa (PAB), United States Dollar (USD)",
        languages: ["Spanish"],
        callingCode: "+507",
        description: "Panama is famous for the Panama Canal connecting oceans."
    },
    {
        slug: "papua-new-guinea",
        name: "Papua New Guinea",
        capital: "Port Moresby",
        region: "Oceania",
        population: "10 million",
        currency: "Papua New Guinean Kina (PGK)",
        languages: ["English", "Tok Pisin", "Hiri Motu"],
        callingCode: "+675",
        description: "Papua New Guinea has incredible cultural diversity and rainforests."
    },
    {
        slug: "paraguay",
        name: "Paraguay",
        capital: "Asunción",
        region: "South America",
        population: "6.8 million",
        currency: "Paraguayan Guarani (PYG)",
        languages: ["Spanish", "Guaraní"],
        callingCode: "+595",
        description: "Paraguay features the Itaipu Dam and bilingual culture."
    },
    {
        slug: "romania",
        name: "Romania",
        capital: "Bucharest",
        region: "Europe",
        population: "19 million",
        currency: "Romanian Leu (RON)",
        languages: ["Romanian"],
        callingCode: "+40",
        description: "Romania has Transylvania castles, Carpathian mountains, and painted monasteries."
    },
    {
        slug: "russia",
        name: "Russia",
        capital: "Moscow",
        region: "Europe",
        population: "144 million",
        currency: "Russian Ruble (RUB)",
        languages: ["Russian"],
        callingCode: "+7",
        description: "Russia is the world's largest country spanning Europe and Asia with rich history."
    },
    {
        slug: "rwanda",
        name: "Rwanda",
        capital: "Kigali",
        region: "East Africa",
        population: "14 million",
        currency: "Rwandan Franc (RWF)",
        languages: ["Kinyarwanda", "English", "French"],
        callingCode: "+250",
        description: "Rwanda is known for mountain gorillas and rapid post-genocide recovery."
    },
    {
        slug: "saint-kitts-and-nevis",
        name: "Saint Kitts and Nevis",
        capital: "Basseterre",
        region: "Caribbean",
        population: "48,000",
        currency: "East Caribbean Dollar (XCD)",
        languages: ["English"],
        callingCode: "+1-869",
        description: "Saint Kitts and Nevis are small Caribbean islands with colonial forts."
    },
    {
        slug: "saint-lucia",
        name: "Saint Lucia",
        capital: "Castries",
        region: "Caribbean",
        population: "180,000",
        currency: "East Caribbean Dollar (XCD)",
        languages: ["English"],
        callingCode: "+1-758",
        description: "Saint Lucia features Pitons mountains and volcanic beaches."
    },
    {
        slug: "saint-vincent-and-the-grenadines",
        name: "Saint Vincent and the Grenadines",
        capital: "Kingstown",
        region: "Caribbean",
        population: "110,000",
        currency: "East Caribbean Dollar (XCD)",
        languages: ["English"],
        callingCode: "+1-784",
        description: "Saint Vincent and the Grenadines offer yachting and Tobago Cays."
    },
    {
        slug: "samoa",
        name: "Samoa",
        capital: "Apia",
        region: "Oceania",
        population: "220,000",
        currency: "Samoan Tālā (WST)",
        languages: ["Samoan", "English"],
        callingCode: "+685",
        description: "Samoa is known for Polynesian culture and Upolu island beauty."
    },
    {
        slug: "san-marino",
        name: "San Marino",
        capital: "San Marino",
        region: "Europe",
        population: "34,000",
        currency: "Euro (EUR)",
        languages: ["Italian"],
        callingCode: "+378",
        description: "San Marino is one of the world's oldest republics, enclaved in Italy."
    },
    {
        slug: "sao-tome-and-principe",
        name: "São Tomé and Príncipe",
        capital: "São Tomé",
        region: "Central Africa",
        population: "230,000",
        currency: "São Tomé and Príncipe Dobra (STN)",
        languages: ["Portuguese"],
        callingCode: "+239",
        description: "São Tomé and Príncipe are equatorial islands with cocoa plantations."
    },
    {
        slug: "senegal",
        name: "Senegal",
        capital: "Dakar",
        region: "West Africa",
        population: "18 million",
        currency: "West African CFA Franc (XOF)",
        languages: ["French"],
        callingCode: "+221",
        description: "Senegal features vibrant music, Gorée Island, and the Pink Lake."
    },
    {
        slug: "serbia",
        name: "Serbia",
        capital: "Belgrade",
        region: "Europe",
        population: "6.6 million",
        currency: "Serbian Dinar (RSD)",
        languages: ["Serbian"],
        callingCode: "+381",
        description: "Serbia has Belgrade's nightlife and Danube River scenery."
    },
    {
        slug: "seychelles",
        name: "Seychelles",
        capital: "Victoria",
        region: "East Africa",
        population: "100,000",
        currency: "Seychellois Rupee (SCR)",
        languages: ["Seselwa Creole", "English", "French"],
        callingCode: "+248",
        description: "Seychelles is an Indian Ocean paradise with granite boulders and rare birds."
    },
    {
        slug: "sierra-leone",
        name: "Sierra Leone",
        capital: "Freetown",
        region: "West Africa",
        population: "8.6 million",
        currency: "Sierra Leonean Leone (SLL)",
        languages: ["English"],
        callingCode: "+232",
        description: "Sierra Leone is recovering with beaches and diamond resources."
    },
    {
        slug: "slovakia",
        name: "Slovakia",
        capital: "Bratislava",
        region: "Europe",
        population: "5.4 million",
        currency: "Euro (EUR)",
        languages: ["Slovak"],
        callingCode: "+421",
        description: "Slovakia features High Tatras mountains and castles."
    },
    {
        slug: "slovenia",
        name: "Slovenia",
        capital: "Ljubljana",
        region: "Europe",
        population: "2.1 million",
        currency: "Euro (EUR)",
        languages: ["Slovene"],
        callingCode: "+386",
        description: "Slovenia has Lake Bled, caves, and Julian Alps."
    },
    {
        slug: "solomon-islands",
        name: "Solomon Islands",
        capital: "Honiara",
        region: "Oceania",
        population: "730,000",
        currency: "Solomon Islands Dollar (SBD)",
        languages: ["English"],
        callingCode: "+677",
        description: "Solomon Islands feature WWII sites and coral diversity."
    },
    {
        slug: "somalia",
        name: "Somalia",
        capital: "Mogadishu",
        region: "East Africa",
        population: "18 million",
        currency: "Somali Shilling (SOS)",
        languages: ["Somali", "Arabic"],
        callingCode: "+252",
        description: "Somalia has long coastlines and ancient trade history."
    },
    {
        slug: "south-sudan",
        name: "South Sudan",
        capital: "Juba",
        region: "East Africa",
        population: "11 million",
        currency: "South Sudanese Pound (SSP)",
        languages: ["English"],
        callingCode: "+211",
        description: "South Sudan is the world's newest nation with Nile River wetlands."
    },
    {
        slug: "sudan",
        name: "Sudan",
        capital: "Khartoum",
        region: "North Africa",
        population: "48 million",
        currency: "Sudanese Pound (SDG)",
        languages: ["Arabic", "English"],
        callingCode: "+249",
        description: "Sudan features pyramids at Meroë and the Nile confluence."
    },
    {
        slug: "suriname",
        name: "Suriname",
        capital: "Paramaribo",
        region: "South America",
        population: "620,000",
        currency: "Surinamese Dollar (SRD)",
        languages: ["Dutch"],
        callingCode: "+597",
        description: "Suriname has Amazon rainforest and multicultural society."
    },
    {
        slug: "syria",
        name: "Syria",
        capital: "Damascus",
        region: "Middle East",
        population: "23 million",
        currency: "Syrian Pound (SYP)",
        languages: ["Arabic"],
        callingCode: "+963",
        description: "Syria has ancient cities like Damascus and historic sites (many affected by conflict)."
    },
    {
        slug: "taiwan",
        name: "Taiwan",
        capital: "Taipei",
        region: "East Asia",
        population: "23 million",
        currency: "New Taiwan Dollar (TWD)",
        languages: ["Mandarin Chinese"],
        callingCode: "+886",
        description: "Taiwan is a vibrant democracy with mountains, night markets, and tech industry."
    },
    {
        slug: "tajikistan",
        name: "Tajikistan",
        capital: "Dushanbe",
        region: "Central Asia",
        population: "10 million",
        currency: "Tajikistani Somoni (TJS)",
        languages: ["Tajik"],
        callingCode: "+992",
        description: "Tajikistan features Pamir Mountains and Persian-influenced culture."
    },
    {
        slug: "tonga",
        name: "Tonga",
        capital: "Nuku'alofa",
        region: "Oceania",
        population: "107,000",
        currency: "Tongan Pa'anga (TOP)",
        languages: ["English", "Tongan"],
        callingCode: "+676",
        description: "Tonga is a Polynesian kingdom with whale watching and ancient tombs."
    },
    {
        slug: "trinidad-and-tobago",
        name: "Trinidad and Tobago",
        capital: "Port of Spain",
        region: "Caribbean",
        population: "1.5 million",
        currency: "Trinidad and Tobago Dollar (TTD)",
        languages: ["English"],
        callingCode: "+1-868",
        description: "Trinidad and Tobago is famous for Carnival and calypso music."
    },
    {
        slug: "tunisia",
        name: "Tunisia",
        capital: "Tunis",
        region: "North Africa",
        population: "12 million",
        currency: "Tunisian Dinar (TND)",
        languages: ["Arabic"],
        callingCode: "+216",
        description: "Tunisia features Carthage ruins, Sahara oases, and Mediterranean coast."
    },
    {
        slug: "turkmenistan",
        name: "Turkmenistan",
        capital: "Ashgabat",
        region: "Central Asia",
        population: "6.5 million",
        currency: "Turkmenistani Manat (TMT)",
        languages: ["Turkmen"],
        callingCode: "+993",
        description: "Turkmenistan is known for marble-clad Ashgabat and ancient Silk Road sites."
    },
    {
        slug: "tuvalu",
        name: "Tuvalu",
        capital: "Funafuti",
        region: "Oceania",
        population: "12,000",
        currency: "Australian Dollar (AUD)",
        languages: ["English", "Tuvaluan"],
        callingCode: "+688",
        description: "Tuvalu is a small Pacific nation of atolls facing rising seas."
    },
    {
        slug: "vanuatu",
        name: "Vanuatu",
        capital: "Port Vila",
        region: "Oceania",
        population: "320,000",
        currency: "Vanuatu Vatu (VUV)",
        languages: ["Bislama", "English", "French"],
        callingCode: "+678",
        description: "Vanuatu features volcanoes, blue holes, and WWII wrecks."
    },
    {
        slug: "vatican-city",
        name: "Vatican City",
        capital: "Vatican City",
        region: "Europe",
        population: "800",
        currency: "Euro (EUR)",
        languages: ["Italian", "Latin"],
        callingCode: "+39",
        description: "Vatican City is the world's smallest country, home to the Pope and St. Peter's Basilica."
    },
    {
        slug: "yemen",
        name: "Yemen",
        capital: "Sana'a",
        region: "Middle East",
        population: "34 million",
        currency: "Yemeni Rial (YER)",
        languages: ["Arabic"],
        callingCode: "+967",
        description: "Yemen features ancient architecture in Sana'a and Socotra Island biodiversity."
    },
    {
        slug: "zambia",
        name: "Zambia",
        capital: "Lusaka",
        region: "East Africa",
        population: "20 million",
        currency: "Zambian Kwacha (ZMW)",
        languages: ["English"],
        callingCode: "+260",
        description: "Zambia is home to Victoria Falls and vast wildlife areas."
    },
    {
        slug: "zimbabwe",
        name: "Zimbabwe",
        capital: "Harare",
        region: "Southern Africa",
        population: "16 million",
        currency: "Zimbabwean Dollar (ZWL), US Dollar (USD)",
        languages: ["English", "Shona", "Ndebele"],
        callingCode: "+263",
        description: "Zimbabwe features Victoria Falls, Great Zimbabwe ruins, and safari parks."
    }
];

export default countries;
