const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory "database"
let todos = [
    { id: 1, task: 'Implement DevSecOps pipeline', completed: false },
    { id: 2, task: 'Write comprehensive README', completed: true },
];

// Routes
app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get('/healthz', (req, res) => {
    res.status(200).send('OK');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // For testing
