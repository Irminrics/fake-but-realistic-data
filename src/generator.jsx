// Checklist
// Blank (Done)
// Binomial Distribution
// Blank (Done)
// Boolean (Done)
// Colour (Done)
// Custom List
// Dataset Column
// Datetime
// Encrypt
// Exponential Distribution
// Frequency
// Geometric Distribution
// GUID
// Hex Colour
// ISBN
// MongoDB ObjectID
// Nato Phonetic
// Normal Distribution
// Number
// Paragraphs
// Password
// Password Hash
// Poisson Distribution
// Row Number (Done)
// Sentences
// Sequence
// Short Hex Colour
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
