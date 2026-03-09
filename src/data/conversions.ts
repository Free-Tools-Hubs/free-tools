const conversions = [
    // WEIGHT
    { slug: "kg-to-lb", fromUnit: "kg", toUnit: "lb", fromName: "Kilograms", toName: "Pounds", ratio: 2.20462, category: "weight" },
    { slug: "g-to-oz", fromUnit: "g", toUnit: "oz", fromName: "Grams", toName: "Ounces", ratio: 0.035274, category: "weight" },
    { slug: "lb-to-oz", fromUnit: "lb", toUnit: "oz", fromName: "Pounds", toName: "Ounces", ratio: 16, category: "weight" },

    // LENGTH
    { slug: "m-to-ft", fromUnit: "m", toUnit: "ft", fromName: "Meters", toName: "Feet", ratio: 3.28084, category: "length" },
    { slug: "km-to-mi", fromUnit: "km", toUnit: "mi", fromName: "Kilometers", toName: "Miles", ratio: 0.621371, category: "length" },
    { slug: "in-to-cm", fromUnit: "in", toUnit: "cm", fromName: "Inches", toName: "Centimeters", ratio: 2.54, category: "length" },
    { slug: "mm-to-in", fromUnit: "mm", toUnit: "in", fromName: "Millimeters", toName: "Inches", ratio: 0.0393701, category: "length" },

    // AREA
    { slug: "m2-to-ft2", fromUnit: "m²", toUnit: "ft²", fromName: "Square Meters", toName: "Square Feet", ratio: 10.7639, category: "area" },

    // VOLUME
    { slug: "l-to-gal", fromUnit: "L", toUnit: "gal", fromName: "Liters", toName: "Gallons", ratio: 0.264172, category: "volume" },
    { slug: "m3-to-ft3", fromUnit: "m³", toUnit: "ft³", fromName: "Cubic Meters", toName: "Cubic Feet", ratio: 35.3147, category: "volume" },

    // SPEED
    { slug: "kmh-to-mph", fromUnit: "km/h", toUnit: "mph", fromName: "Kilometers per Hour", toName: "Miles per Hour", ratio: 0.621371, category: "speed" },
    { slug: "kn-to-mph", fromUnit: "kn", toUnit: "mph", fromName: "Knots", toName: "Miles per Hour", ratio: 1.15078, category: "speed" },

    // PRESSURE
    { slug: "psi-to-bar", fromUnit: "psi", toUnit: "bar", fromName: "PSI", toName: "Bar", ratio: 0.0689476, category: "pressure" },
    { slug: "psi-to-pa", fromUnit: "psi", toUnit: "Pa", fromName: "PSI", toName: "Pascal", ratio: 6894.76, category: "pressure" },

    // POWER
    { slug: "w-to-kw", fromUnit: "W", toUnit: "kW", fromName: "Watts", toName: "Kilowatts", ratio: 0.001, category: "power" },

    // ENERGY
    { slug: "j-to-kj", fromUnit: "J", toUnit: "kJ", fromName: "Joules", toName: "Kilojoules", ratio: 0.001, category: "energy" },

    // FORCE
    { slug: "n-to-lbf", fromUnit: "N", toUnit: "lbf", fromName: "Newton", toName: "Pound-force", ratio: 0.224809, category: "force" },
    { slug: "n-to-dyn", fromUnit: "N", toUnit: "dyn", fromName: "Newton", toName: "Dyne", ratio: 100000, category: "force" },

    // TORQUE
    { slug: "nm-to-ftlb", fromUnit: "Nm", toUnit: "ft-lb", fromName: "Newton-meter", toName: "Foot-pound", ratio: 0.737562, category: "torque" },

    // TEMPERATURE (special formulas)
    { slug: "c-to-f", fromUnit: "°C", toUnit: "°F", fromName: "Celsius", toName: "Fahrenheit", ratio: 9 / 5, offset: 32, category: "temperature" },
    { slug: "c-to-k", fromUnit: "°C", toUnit: "K", fromName: "Celsius", toName: "Kelvin", ratio: 1, offset: 273.15, category: "temperature" },
    { slug: "f-to-r", fromUnit: "°F", toUnit: "°R", fromName: "Fahrenheit", toName: "Rankine", ratio: 1, offset: 459.67, category: "temperature" },

    // FREQUENCY
    { slug: "hz-to-khz", fromUnit: "Hz", toUnit: "kHz", fromName: "Hertz", toName: "Kilohertz", ratio: 0.001, category: "frequency" },

    // DATA RATE
    { slug: "mbps-to-kbps", fromUnit: "Mbps", toUnit: "kbps", fromName: "Megabits per second", toName: "Kilobits per second", ratio: 1000, category: "data-rate" },
    { slug: "gbps-to-mbps", fromUnit: "Gbps", toUnit: "Mbps", fromName: "Gigabits per second", toName: "Megabits per second", ratio: 1000, category: "data-rate" },

    // DATA SIZE
    { slug: "b-to-kb", fromUnit: "B", toUnit: "KB", fromName: "Bytes", toName: "Kilobytes", ratio: 0.001, category: "data" },
    { slug: "kb-to-mb", fromUnit: "KB", toUnit: "MB", fromName: "Kilobytes", toName: "Megabytes", ratio: 0.001, category: "data" },
    { slug: "mb-to-gb", fromUnit: "MB", toUnit: "GB", fromName: "Megabytes", toName: "Gigabytes", ratio: 0.001, category: "data" },
    { slug: "gb-to-tb", fromUnit: "GB", toUnit: "TB", fromName: "Gigabytes", toName: "Terabytes", ratio: 0.001, category: "data" },
    { slug: "tb-to-pb", fromUnit: "TB", toUnit: "PB", fromName: "Terabytes", toName: "Petabytes", ratio: 0.001, category: "data" },
    { slug: "pb-to-eb", fromUnit: "PB", toUnit: "EB", fromName: "Petabytes", toName: "Exabytes", ratio: 0.001, category: "data" }
];

export default conversions;
