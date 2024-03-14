export const basicInputTypes = [
    {
        name: 'Address Line',
        description: 'Room, Apt, Floor, Suite or PO box number',
        options: []
    },
    {
        name: 'Binomial Distribution',
        description: 'Generates numbers based on a binomial distribution with a specific probability of success',
        options: []
    },
    {
        name: 'Blank',
        description: 'Always generates a null value',
        options: []
    },
    {
        name: 'Boolean',
        description: 'True or false values',
        options: []
    },
    {
        name: 'Colour',
        description: 'Red, Blue, Black',
        options: []
    },
    {
        name: 'Custom List',
        description: 'Picks items randomly or sequentially from a custom list of values',
        options: ['custom-list-dropdown']
    },
    {
        name: 'Dataset Column',
        description: 'Pick records randomly or sequentially from one of my datasets',
        options: []
    },
    {
        name: 'Datetime',
        description: '13/03/2024 3.13.2024 13-Mar-2024',
        options: ['date-time-picker']
    },
    {
        name: 'Encrypt',
        description: 'Simulates encrypted text',
        options: []
    },
    {
        name: 'Exponential Distribution',
        description: 'Generates numbers based on a exponential distribution with a specific λ rate',
        options: ['exponential-lambda-text']
    },
    {
        name: 'Frequency',
        description: 'Never, Once, Seldom, Often, Daily, Weekly, Monthly, Yearly',
        options: []
    },
    {
        name: 'Geometric Distribution',
        description: 'Generates numbers based on a geometric distribution with a specific probability of success',
        options: ['success-probability-text']
    },
    {
        name: 'GUID',
        description: '36 characters hex guid ddee19bc-84fd-4627-897c-dec7c8010977',
        options: []
    },
    {
        name: 'Hex Colour',
        description: '#142a0b',
        options: []
    },
    {
        name: 'ISBN',
        description: '574398570-7',
        options: []
    },
    {
        name: 'MongoDB ObjectID',
        description: 'Globally unique identifiers for MongoDB objects',
        options: []
    },
    {
        name: 'Nato Phonetic',
        description: 'Whiskey, Alpha, Bravo',
        options: []
    },
    {
        name: 'Normal Distribution',
        description: 'Generates random numbers in a normal distribution using the Box-Muller algorithm',
        options: ['mean-text', 'stddev-text', 'decimals-text']
    },
    {
        name: 'Number',
        description: '0.25, 5.2, 1000',
        options: ['min-num-text', 'max-num-text', 'decimals-text']
    },
    {
        name: 'Paragraphs',
        description: 'Choose randmly from lorem ipsum',
        options: ['at-least-text', 'at-most-text']
    },
    {
        name: 'Password',
        description: 'Generate passwords with customisable requirements',
        options: ['password-options']
    },
    {
        name: 'Password Hash',
        description: 'The bcrypt hash of a randomly generated password',
        options: []
    },
    {
        name: 'Poisson Distribution',
        description: 'Generates numbers based on a Poisson distribution with a specific mean value',
        options: ['mean-text']
    },
    {
        name: 'Row Number',
        description: '1, 2, 3',
        options: []
    },
    {
        name: 'Sentences',
        description: 'Choose randomly from lorem ipsum',
        options: ['at-least-text', 'at-most-text']
    },
    {
        name: 'Sequence',
        description: 'Generates a sequence of numbers with adjustable step and repeat options',
        options: ['start-at-text', 'step-text', 'repeat-text', 'restart-at-text']
    },
    {
        name: 'Short Hex Colour',
        description: '#14b',
        options: []
    },
    {
        name: 'Time',
        description: '3:30 PM, 15:30',
        options: ['time-picker']
    },
    {
        name: 'ULID',
        description: 'Universally Unique Lexicographically-sortable Identifier',
        options: []
    },
    {
        name: 'Words',
        description: 'Chosen randomly from lorem ipsum',
        options: ['at-least-text', 'at-most-text']
    },
];
