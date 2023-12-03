const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/members', (req, res) => {
  // Simulated API response for development
  const sampleData = [
    {
      "id": "1",
      "name": "Aaron Miles",
      "email": "aaron@mailinator.com",
      "role": "member"
    },
    {
      "id": "2",
      "name": "Aishwarya Naik",
      "email": "aishwarya@mailinator.com",
      "role": "member"
    },
    {
      "id": "3",
      "name": "Arvind Kumar",
      "email": "arvind@mailinator.com",
      "role": "admin"
    }
  ];

  res.json(sampleData);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
