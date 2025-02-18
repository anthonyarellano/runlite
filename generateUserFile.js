const fs = require('fs');
const path = require('path');

// Generate a random file name using a timestamp and random string
const generateFileName = () => `user-file-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.json`;

// Path to the file to be created
const filePath = path.resolve(__dirname, generateFileName());

// Function to generate a new shoe object
const generateShoe = (id) => ({
    id: id.toString(),
    name: `Shoe Model ${id}`,
    distance: Math.floor(Math.random() * 100), // Random distance between 0 and 99
    createdAt: new Date().toISOString(),
});

// Function to create a new file with shoes
const createFile = () => {
    try {
        // Generate shoe objects
        const shoes = [];
        for (let i = 0; i < 5; i++) {
            const newShoeId = `shoe-${Date.now()}-${i}`;
            shoes.push(generateShoe(newShoeId));
        }

        // Prepare initial content for the file
        const initialContent = {
            name: "Leto Atriedes II",
            metricType: "mi",
            shoes: shoes, // Add shoes
            runs: []
        };

        // Write the file
        fs.writeFileSync(filePath, JSON.stringify(initialContent, null, 2), 'utf8');
        console.log(`File created successfully at: ${filePath}`);
    } catch (error) {
        console.error('Error creating file with shoes:', error);
    }
};

createFile();
