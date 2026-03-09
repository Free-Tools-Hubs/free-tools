export const times = [
    // US internal & North America
    { slug: 'est-to-pst', fromZone: 'America/New_York', toZone: 'America/Los_Angeles', fromName: 'EST', toName: 'PST' },
    { slug: 'pst-to-est', fromZone: 'America/Los_Angeles', toZone: 'America/New_York', fromName: 'PST', toName: 'EST' },
    { slug: 'cst-to-est', fromZone: 'America/Chicago', toZone: 'America/New_York', fromName: 'CST', toName: 'EST' },
    { slug: 'mst-to-pst', fromZone: 'America/Denver', toZone: 'America/Los_Angeles', fromName: 'MST', toName: 'PST' },
    { slug: 'est-to-cst', fromZone: 'America/New_York', toZone: 'America/Chicago', fromName: 'EST', toName: 'CST' },

    // US ↔ Europe
    { slug: 'est-to-london', fromZone: 'America/New_York', toZone: 'Europe/London', fromName: 'EST', toName: 'London' },
    { slug: 'pst-to-london', fromZone: 'America/Los_Angeles', toZone: 'Europe/London', fromName: 'PST', toName: 'London' },
    { slug: 'new-york-to-paris', fromZone: 'America/New_York', toZone: 'Europe/Paris', fromName: 'New York', toName: 'Paris' },
    { slug: 'chicago-to-berlin', fromZone: 'America/Chicago', toZone: 'Europe/Berlin', fromName: 'Chicago', toName: 'Berlin' },
    { slug: 'london-to-new-york', fromZone: 'Europe/London', toZone: 'America/New_York', fromName: 'London', toName: 'New York' },

    // Europe internal & CET
    { slug: 'cet-to-gmt', fromZone: 'Europe/Paris', toZone: 'Europe/London', fromName: 'CET', toName: 'GMT' },
    { slug: 'gmt-to-cet', fromZone: 'Europe/London', toZone: 'Europe/Paris', fromName: 'GMT', toName: 'CET' },
    { slug: 'london-to-moscow', fromZone: 'Europe/London', toZone: 'Europe/Moscow', fromName: 'London', toName: 'Moscow' },
    { slug: 'paris-to-istanbul', fromZone: 'Europe/Paris', toZone: 'Europe/Istanbul', fromName: 'Paris', toName: 'Istanbul' },

    // US ↔ Asia / India
    { slug: 'pst-to-ist', fromZone: 'America/Los_Angeles', toZone: 'Asia/Kolkata', fromName: 'PST', toName: 'IST' },
    { slug: 'est-to-ist', fromZone: 'America/New_York', toZone: 'Asia/Kolkata', fromName: 'EST', toName: 'IST' },
    { slug: 'ist-to-pst', fromZone: 'Asia/Kolkata', toZone: 'America/Los_Angeles', fromName: 'IST', toName: 'PST' },
    { slug: 'new-york-to-mumbai', fromZone: 'America/New_York', toZone: 'Asia/Kolkata', fromName: 'New York', toName: 'Mumbai' },

    // Asia / Japan / China
    { slug: 'japan-to-london', fromZone: 'Asia/Tokyo', toZone: 'Europe/London', fromName: 'JST', toName: 'London' },
    { slug: 'tokyo-to-new-york', fromZone: 'Asia/Tokyo', toZone: 'America/New_York', fromName: 'Tokyo', toName: 'New York' },
    { slug: 'pst-to-tokyo', fromZone: 'America/Los_Angeles', toZone: 'Asia/Tokyo', fromName: 'PST', toName: 'Tokyo' },
    { slug: 'beijing-to-london', fromZone: 'Asia/Shanghai', toZone: 'Europe/London', fromName: 'Beijing', toName: 'London' },
    { slug: 'singapore-to-sydney', fromZone: 'Asia/Singapore', toZone: 'Australia/Sydney', fromName: 'Singapore', toName: 'Sydney' },

    // Australia / Pacific
    { slug: 'sydney-to-london', fromZone: 'Australia/Sydney', toZone: 'Europe/London', fromName: 'Sydney', toName: 'London' },
    { slug: 'sydney-to-new-york', fromZone: 'Australia/Sydney', toZone: 'America/New_York', fromName: 'Sydney', toName: 'New York' },
    { slug: 'perth-to-sydney', fromZone: 'Australia/Perth', toZone: 'Australia/Sydney', fromName: 'Perth', toName: 'Sydney' },

    // Other popular global pairs
    { slug: 'gmt-to-ist', fromZone: 'Europe/London', toZone: 'Asia/Kolkata', fromName: 'GMT', toName: 'IST' },
    { slug: 'cet-to-pst', fromZone: 'Europe/Paris', toZone: 'America/Los_Angeles', fromName: 'CET', toName: 'PST' },
    { slug: 'dubai-to-london', fromZone: 'Asia/Dubai', toZone: 'Europe/London', fromName: 'Dubai', toName: 'London' },
    { slug: 'new-york-to-sao-paulo', fromZone: 'America/New_York', toZone: 'America/Sao_Paulo', fromName: 'New York', toName: 'São Paulo' },
    { slug: 'london-to-cape-town', fromZone: 'Europe/London', toZone: 'Africa/Johannesburg', fromName: 'London', toName: 'Cape Town' },
    { slug: 'paris-to-tokyo', fromZone: 'Europe/Paris', toZone: 'Asia/Tokyo', fromName: 'Paris', toName: 'Tokyo' },
    { slug: 'moscow-to-beijing', fromZone: 'Europe/Moscow', toZone: 'Asia/Shanghai', fromName: 'Moscow', toName: 'Beijing' },
    { slug: 'toronto-to-vancouver', fromZone: 'America/Toronto', toZone: 'America/Vancouver', fromName: 'Toronto', toName: 'Vancouver' },
    { slug: 'seoul-to-los-angeles', fromZone: 'Asia/Seoul', toZone: 'America/Los_Angeles', fromName: 'Seoul', toName: 'Los Angeles' },
];

export default times;
