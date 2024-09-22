const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json()); // Parse JSON payloads

// POST Route (/bfhl)
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    // Find the highest lowercase alphabet
    const lowerCaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
    const highestLowercase = lowerCaseAlphabets.sort().reverse()[0] || '';

    // File handling (you'll need to handle Base64 decoding here)
    let fileValid = false;
    let fileMimeType = '';
    let fileSizeKb = 0;

    if (file_b64) {
        // Example file handling logic: In a real app, you should decode the file and check validity
        fileValid = true; // assuming it's valid
        fileMimeType = 'image/png'; // assuming MIME type
        fileSizeKb = 400; // assuming file size in KB
    }

    // Send the response
    res.json({
        is_success: true,
        user_id: 'your_name_ddmmyyyy',
        email: 'your_email@college.com',
        roll_number: 'your_roll_number',
        numbers,
        alphabets,
        highest_lowercase_alphabet: [highestLowercase],
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKb
    });
});

// GET Route (/bfhl)
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});