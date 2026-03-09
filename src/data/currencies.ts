export interface Currency {
    code: string;
    name: string;
}

export const currencies: Currency[] = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'SGD', name: 'Singapore Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'MYR', name: 'Malaysian Ringgit' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'CNY', name: 'Chinese Yuan' },
];

export interface CurrencyPair {
    from: string;
    to: string;
}

export const commonCurrencyPairs = [
    { from: 'USD', to: 'EUR' },
    { from: 'EUR', to: 'USD' },
    { from: 'USD', to: 'GBP' },
    { from: 'GBP', to: 'USD' },
    { from: 'USD', to: 'INR' },
    { from: 'INR', to: 'USD' },
    { from: 'EUR', to: 'GBP' },
    { from: 'GBP', to: 'EUR' },
];
