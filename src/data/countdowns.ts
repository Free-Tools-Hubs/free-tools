export interface Countdown {
    slug: string;
    eventName: string;
    targetDateMethod: string; // 'current_year' | 'next_year' | 'fixed'
    month?: number; // 0-11
    date?: number;
    fixedDate?: string; // e.g. '2027-01-01'
    description: string;
}

const countdowns: Countdown[] = [
    {
        slug: 'christmas',
        eventName: 'Christmas',
        targetDateMethod: 'current_year',
        month: 11, // December
        date: 25,
        description: 'Countdown to Christmas Day, the annual Christian festival celebrating Christ\'s birth.'
    },
    {
        slug: 'new-year',
        eventName: 'New Year',
        targetDateMethod: 'next_year',
        month: 0, // January
        date: 1,
        description: 'Countdown to the start of the next calendar year.'
    },
    {
        slug: 'halloween',
        eventName: 'Halloween',
        targetDateMethod: 'current_year',
        month: 9, // October
        date: 31,
        description: 'Countdown to Halloween, the spooky holiday celebrated worldwide.'
    },
    {
        slug: 'valentines-day',
        eventName: 'Valentine\'s Day',
        targetDateMethod: 'current_year',
        month: 1, // February
        date: 14,
        description: 'Countdown to Valentine\'s Day, the day of love and romance.'
    },
    {
        slug: '2027',
        eventName: 'Year 2027',
        targetDateMethod: 'fixed',
        fixedDate: '2027-01-01T00:00:00',
        description: 'Countdown to the beginning of the year 2027.'
    },
    {
        slug: '2030',
        eventName: 'Year 2030',
        targetDateMethod: 'fixed',
        fixedDate: '2030-01-01T00:00:00',
        description: 'Countdown to the beginning of the year 2030.'
    }
];

export default countdowns;
