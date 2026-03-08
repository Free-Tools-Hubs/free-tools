const conversions = [
    { slug: 'kg-to-lb', fromUnit: 'kg', toUnit: 'lb', fromName: 'Kilograms', toName: 'Pounds', ratio: 2.20462, category: 'weight' },
    { slug: 'lb-to-kg', fromUnit: 'lb', toUnit: 'kg', fromName: 'Pounds', toName: 'Kilograms', ratio: 0.453592, category: 'weight' },
    { slug: 'meters-to-feet', fromUnit: 'm', toUnit: 'ft', fromName: 'Meters', toName: 'Feet', ratio: 3.28084, category: 'length' },
    { slug: 'feet-to-meters', fromUnit: 'ft', toUnit: 'm', fromName: 'Feet', toName: 'Meters', ratio: 0.3048, category: 'length' },
    { slug: 'km-to-miles', fromUnit: 'km', toUnit: 'mi', fromName: 'Kilometers', toName: 'Miles', ratio: 0.621371, category: 'length' },
];

export default conversions;
