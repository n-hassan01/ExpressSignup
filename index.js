const express = require('express');
const cors = require('cors');
const signupService = require('./controllers/signupService');

const app = express();

app.use(express.json());
app.use(cors());

// routing middleware
app.use('/signup', signupService);

// error handling middleware
app.use((req, res, next) => {
    next('Requested url not found!');
});

app.use((err, req, res, next) => {
    if (err.message) {
        res.status(500).send(err.message);
    } else {
        res.status(500).send('Server side error!');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
