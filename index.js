// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load .env variables
console.log("🔍 SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("🔍 SUPABASE_KEY:", process.env.SUPABASE_KEY);

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);  

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());


app.get('/', (req, res) => { //serves landingpage.html first
  res.sendFile(__dirname + '/public/landingpage.html');
});

app.use(express.static('public')); // then serve index.html, landingpage.html and script.js
app.use(express.json());

// 🟡 Update the table name to 'questions2023'
app.get('/questions', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('questions2023')
      .select('*')
      .order('question_number', {ascending: true});
    

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch questions' });
    }

    res.json(data);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
