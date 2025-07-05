const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from your project folder
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API route to handle your Contact Me form
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  const newMessage = {
    name,
    email,
    message,
    date: new Date().toISOString()
  };

  const filePath = path.join(__dirname, 'messages.json');
  let messages = [];

  if (fs.existsSync(filePath)) {
    messages = JSON.parse(fs.readFileSync(filePath));
  }

  messages.push(newMessage);

  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
