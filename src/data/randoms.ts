export interface RandomGenerator {
    slug: string;
    name: string;
    description: string;
    type: 'string' | 'number' | 'color' | 'country' | 'movie';
}

const randoms: RandomGenerator[] = [
    {
        slug: 'country',
        name: 'Random Country',
        description: 'Generate a random country from a list of all nations in the world. Useful for geography games or travel ideas.',
        type: 'country',
    },
    {
        slug: 'number',
        name: 'Random Number',
        description: 'Generate a random number within a specified range. Perfect for lotteries, games, or statistical sampling.',
        type: 'number',
    },
    {
        slug: 'color',
        name: 'Random Color',
        description: 'Generate a random HEX or RGB color code for design inspiration or CSS styling.',
        type: 'color',
    },
    {
        slug: 'movie',
        name: 'Random Movie',
        description: 'Generate a random popular movie to watch when you can\'t decide what to pick.',
        type: 'movie',
    }
];

export default randoms;
