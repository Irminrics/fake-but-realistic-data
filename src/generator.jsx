// Checklist
// Blank (Done)
// Blank (Done)
// Boolean (Done)
// Colour (Done)
// Custom List
// Dataset Column
// Datetime 
// Frequency (Done)
// GUID (Done)
// Hex Colour (Done)! Hashtag causing problems
// ISBN (Done)
// MongoDB ObjectID
// Nato Phonetic
// Number (Done)
// Paragraphs (Done)
// Password (Done)! Hashtag causing problems
// Password Hash (Done)
// Row Number (Done)
// Sentences
// Sequence
// Short Hex Colour (Done)! Hashtag causing problems
// Time
// ULID
// Words


// Function to generate a random overseas address
export function generateRandomAddress() {
    // Sample overseas addresses
    const addresses = [
        "123 Main Street Springfield IL 62701 USA",
        "456 Elm Street Manchester NH 03101 USA",
        "789 Oak Street Portland OR 97201 USA",
        "321 Maple Avenue Toronto ON M5H 1T1 Canada",
        "654 Pine Street Vancouver BC V6B 1H2 Canada",
        "987 Cedar Street London W1J 6BD United Kingdom",
        "246 Birch Street Paris 75001 France",
        "135 Walnut Avenue Berlin 10115 Germany",
        "864 Willow Street Sydney NSW 2000 Australia",
        "975 Spruce Street Melbourne VIC 3000 Australia",
        "531 Oak Lane Tokyo 100-0001 Japan",
        "258 Pine Road Seoul 04522 South Korea",
        "741 Cedar Drive Beijing 100000 China",
        "852 Elm Boulevard Shanghai 200000 China",
        "369 Birch Court Rome 00184 Italy",
        "753 Maple Way Madrid 28001 Spain",
        "147 Elm Street Amsterdam 1012 NP Netherlands",
        "369 Pine Street Moscow 119017 Russia",
        "258 Oak Lane Rio de Janeiro - RJ 20040-020 Brazil",
        "753 Walnut Avenue Buenos Aires C1002 Argentina",
        "951 Maple Drive Cape Town 8001 South Africa",
        "357 Cedar Court Cairo 11511 Egypt",
        "852 Birch Boulevard Istanbul 34437 Turkey",
        "147 Pine Road Dubai - United Arab Emirates",
        "369 Cedar Way Riyadh 12242 Saudi Arabia",
        "753 Oak Lane Mumbai Maharashtra 400001 India",
        "951 Walnut Avenue Singapore 049145",
        "357 Elm Street Kuala Lumpur 50088 Malaysia",
        "852 Maple Drive Bangkok 10110 Thailand",
        "147 Cedar Court Jakarta 12950 Indonesia",
        "369 Birch Boulevard Manila Metro Manila 1004 Philippines",
        "753 Pine Road Ho Chi Minh City 700000 Vietnam",
        "951 Oak Lane Sydney NSW 2000 Australia",
        "357 Walnut Avenue Auckland 1010 New Zealand",
        "852 Spruce Street Santiago Región Metropolitana Chile",
        "147 Elm Boulevard Bogotá Bogota 110311 Colombia",
        "369 Maple Way Lima 15088 Peru",
        "753 Cedar Drive Caracas 1050 Venezuela",
        "951 Birch Court San José San José Province Costa Rica",
        "357 Pine Street Mexico City CDMX Mexico",
        "852 Oak Lane Buenos Aires Buenos Aires Province Argentina",
        "147 Walnut Avenue Panama City Panama",
        "369 Spruce Street San Juan San Juan Puerto Rico",
        "753 Elm Boulevard Santiago Santiago Metropolitan Region Chile",
        "951 Maple Drive Montevideo 11000 Uruguay",
        "357 Cedar Court La Paz Bolivia",
        "852 Pine Road Quito Pichincha Ecuador",
        "147 Oak Lane Guatemala City Guatemala",
    ];
    // Return a random address from the list
    return addresses[Math.floor(Math.random() * addresses.length)];
}


// Function to generate a random color name
export function generateRandomColorName() {
    // Sample color names
    const colorNames = [
        'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Black', 'White', 'Gray', 'Brown',
        'Cyan', 'Magenta', 'Lime', 'Teal', 'Indigo', 'Turquoise', 'Violet', 'Maroon', 'Navy', 'Olive',
        'Fuchsia', 'Silver', 'Gold', 'Beige', 'Azure', 'Coral', 'Crimson', 'Khaki', 'Lavender', 'Lemon',
        'Peach', 'Ruby', 'Salmon', 'Sapphire', 'Sienna', 'Tan', 'Tangerine', 'Terra Cotta', 'Thistle',
        'Tomato', 'Wheat', 'Cerulean', 'Chartreuse', 'Cinnamon', 'Ebony', 'Emerald', 'Ivory', 'Jade'
    ];
    // Return a random color name from the list
    return colorNames[Math.floor(Math.random() * colorNames.length)];
}


// Function to generate a random frequency
export function generateRandomFrequency() {
    // Sample frequencies
    const frequencies = ['Never', 'Once', 'Seldom', 'Often', 'Daily', 'Weekly', 'Monthly', 'Yearly'];
    // Return a random frequency from the list
    return frequencies[Math.floor(Math.random() * frequencies.length)];
}


// Function to generate a random GUID
export function generateRandomGUID() {
    // Generate a random GUID
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


// Function to generate a random color
export function generateRandomHexColor() {
    // Generate a random hex color
    return Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}


// Function to generate a random ISBN number
export function generateRandomISBN() {
    // Generate a random ISBN number
    return Math.floor(Math.random() * 1000000000) + '-' + Math.floor(Math.random() * 10);
}

/**
 * Function to generate a random number within a specified range
 * @param {number} min - The minimum value for the random number (inclusive)
 * @param {number} max - The maximum value for the random number (exclusive)
 * @param {number} decimals - The number of decimal places for the random number
 * @returns {number} - A random number within the specified range
 */
export function generateRandomNumber(min, max, decimals) {
    // Generate a random number within the specified range
    let randomNumber = Math.random() * (max - min) + min;

    // Round the random number to the specified number of decimal places
    if (decimals !== undefined && decimals >= 0) {
        const factor = Math.pow(10, decimals);
        randomNumber = Math.round(randomNumber * factor) / factor;
    }

    return randomNumber;
}

// Function to generate a random password
export function generateRandomPassword(length, minUppercase, minLowercase, minNumbers, minSymbols) {
    // Define the character sets for the password
    const charset = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+[]{}|;:,.<>?'
    };

    // Create a character set for the password based on the minimum requirements
    let passwordCharset = '';
    if (minUppercase > 0) passwordCharset += charset.uppercase;
    if (minLowercase > 0) passwordCharset += charset.lowercase;
    if (minNumbers > 0) passwordCharset += charset.numbers;
    if (minSymbols > 0) passwordCharset += charset.symbols;

    // If any character set is required, but not provided, return an empty string
    if (passwordCharset === '') return '';

    // Generate a password with the minimum requirements
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * passwordCharset.length);
        password += passwordCharset.charAt(randomIndex);
    }

    // Check if the generated password meets the minimum requirements
    const regexUppercase = /[A-Z]/g;
    const regexLowercase = /[a-z]/g;
    const regexNumbers = /[0-9]/g;
    const regexSymbols = /[!@$%^&*()_+[\]{}|<>?]/g;

    const uppercaseMatches = password.match(regexUppercase) || [];
    const lowercaseMatches = password.match(regexLowercase) || [];
    const numbersMatches = password.match(regexNumbers) || [];
    const symbolsMatches = password.match(regexSymbols) || [];

    // If any requirement is not met, recursively call the function again until it meets the requirements
    if (uppercaseMatches.length < minUppercase || lowercaseMatches.length < minLowercase || numbersMatches.length < minNumbers || symbolsMatches.length < minSymbols) {
        return generateRandomPassword(length, minUppercase, minLowercase, minNumbers, minSymbols);
    }

    return password;
}


// Function to generate a random password hash
export function generateRandomPasswordHash() {
    // Generate a random password hash
    return '$2b$10$' + Math.random().toString(36).substring(2);
}


// Function to generate random paragraphs
export function generateRandomParagraphs(atLeast, atMost) {
    // Sample paragraphs
    const paragraphs = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
        'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
        'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
        'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
        'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
        'Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
        'Et harum quidem rerum facilis est et expedita distinctio.',
        'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit'
    ];
    
    // Generate a random number of paragraphs within the specified range
    const numParagraphs = atLeast + Math.floor(Math.random() * (atMost - atLeast + 1));
    // Return the specified number of paragraphs
    return paragraphs.slice(0, numParagraphs).join(' ');
}


// Function to generate a random short hex color
export function generateRandomShortHexColor() {
    // Generate a random short hex color
    const colorCode = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    // Include the hashtag in the color code
    return colorCode.substring(0, 3);
}

