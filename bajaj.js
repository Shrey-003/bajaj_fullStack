const express = require('express');
const app = express();

app.use(express.json());

const user_id = "shreygoel_30012003";
const DOB = "30-01-2003";
const EMAIL = "shreygoel30012003@gmail.com";
const ROLL_NUMBER = "22BCE3021";

function alternateCaps(str) {
    return str
        .split('')
        .map((ch, i) => i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase())
        .join('');
}

app.post('/bfhl', (req, res) => {
    try {
        let data = req.body.data || [];
        let even_numbers = [];
        let odd_numbers = [];
        let alphabets = [];
        let special_characters = [];
        let sum = 0;
        let alphaChars = [];

        data.forEach(item => {
            let s = String(item);
            if (/^\d+$/.test(s)) {
                if (parseInt(s) % 2 === 0) {
                    even_numbers.push(s);
                } else {
                    odd_numbers.push(s);
                }
                sum += parseInt(s);
            } else if (/^[a-zA-Z]+$/.test(s)) {
                alphabets.push(s.toUpperCase());
                alphaChars.push(...s);
            } else {
                special_characters.push(s);
            }
        });

        let concat_raw = alphaChars.reverse().join('');
        let concat_string = alternateCaps(concat_raw);

        res.status(200).json({
            is_success: true,
            user_id: `${FULL_NAME}_${DOB}`,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: sum.toString(),
            concat_string
        });
    } catch (error) {
        res.status(400).json({
            is_success: false,
            user_id: `${FULL_NAME}_${DOB}`,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            odd_numbers: [],
            even_numbers: [],
            alphabets: [],
            special_characters: [],
            sum: "0",
            concat_string: ""
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
