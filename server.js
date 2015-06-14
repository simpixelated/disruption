var requirejs = require('requirejs');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require,
    baseUrl: './public/scripts'
});

requirejs(['express'],
function (express, startups, actions) {

    var app = express();
    app.use(express.static('public'));

    app.get('/', function (request, response) {
        response.sendfile('./public/index.html');
    });
     
    app.listen(3000);
});