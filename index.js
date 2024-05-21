const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); 

let isMentorAssigned = false;

app.get('/api/role', (req, res) => {
    if (!isMentorAssigned) {
        isMentorAssigned = true;
        res.json({ role: 'mentor' });
    } else {
        res.json({ role: 'student' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});





