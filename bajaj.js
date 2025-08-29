// api/bfhl.js

function alternateCaps(str) {
  return str
    .split('')
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join('');
}

const USER_ID = "shreygoel_30012003";
const EMAIL = "shreygoel30012003@gmail.com";
const ROLL_NUMBER = "22BCE3021";

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = Array.isArray(req.body?.data) ? req.body.data : [];

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    const alphaChars = [];

    data.forEach((item) => {
      const s = String(item);
      if (/^\d+$/.test(s)) {
        const n = parseInt(s, 10);
        (n % 2 === 0 ? even_numbers : odd_numbers).push(s);
        sum += n;
      } else if (/^[a-zA-Z]+$/.test(s)) {
        alphabets.push(s.toUpperCase());
        alphaChars.push(...s);
      } else {
        special_characters.push(s);
      }
    });

    const concat_raw = alphaChars.reverse().join('');
    const concat_string = alternateCaps(concat_raw);

    return res.status(200).json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string,
    });
  } catch (err) {
    return res.status(400).json({
      is_success: false,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: "",
    });
  }
}
