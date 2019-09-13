const express = require('express');
const app = express();
const compression = require('compression');

app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}




app.get('/cute-animals.json', (req, res) => {
    res.json([
        {
            name: 'wombat',
            cutenessScore: 'super'
        },
        {
            name: 'giraffe',
            cutenessScore: 'extremely'
        },
        {
            name: 'mouse',
            cutenessScore: 'extraordinarily'

        }
    ]);
});














app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
