import { cache } from 'react';

export interface WeatherData {
    name: string;
    weather: Array<{ description: string; icon?: string; main?: string }>;
    main: { temp: number; feels_like: number; humidity: number };
    wind: { speed: number };
    sys: { country: string; sunrise: number; sunset: number };
}

/**
 * Fetch live weather data for a city from OpenWeatherMap.
 * Wrapped in React cache() to deduplicate requests across generateMetadata and Page execution.
 * Returns null if the city is not found or if the API request fails (no fabricated mock data).
 */
export const fetchWeatherData = cache(async (city: string): Promise<WeatherData | null> => {
    try {
        const apiKey = process.env.WEATHER_API_KEY || '5763f365b4263ba6bbc70affd7822d22';
        
        // Convert slug hyphens to spaces (e.g., 'kansas-city' -> 'kansas city') for OpenWeather API
        const queryCity = city.replace(/-/g, ' ').trim();
        if (!queryCity) return null;

        const encodedCity = encodeURIComponent(queryCity);
        let res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=metric&appid=${apiKey}`
        );

        // If not found with spaces, retry with original hyphenated query (e.g. Yuzhno-Sakhalinsk)
        if (!res.ok && res.status === 404 && queryCity !== city) {
            res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
            );
        }

        if (!res.ok) {
            if (res.status === 404) {
                return null;
            }
            console.warn(`Weather API returned status ${res.status} for city "${queryCity}"`);
            return null;
        }

        const data = await res.json();
        if (!data || !data.main || !data.weather || !data.weather.length) {
            return null;
        }

        return data as WeatherData;
    } catch (error) {
        console.error(`Error fetching weather data for "${city}":`, error);
        return null;
    }
});
