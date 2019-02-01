


var apiData = {};

apiData.clientId = 'GcxTlfOBwzbG4ivf7YMp9RZyMsIQI1dHEh4InF1ffEd8rWdi';
apiData.clientSecret = '9YhsHe3bkHzW9KqekNieWOI9ycgam75E9YqI9BQdLA7rtzlE';
apiData.userKey = 'NKV8AMJboHkqD25a';


// Hackaday API URLs:
apiData.apiKey = '?api_key=' + apiData.userKey;
apiData.apiUrl = 'https://api.hackaday.io/v1';


if (!apiData.userKey || !apiData.clientId || !apiData.clientSecret) {
    console.log('API credentials fault, killing node server process');
    process.exit();
}


// Create express HTTP server, port, request/response handler
var http = require('http'),
    express = require('express'),
    request = require('request'),
    app = express(),
    server = http.createServer(app),
    port = 3001;

server.listen(port);
console.log('Listening on port: ', port);


// Enable EJS templates
app.set('views', __dirname);
app.set('view engine', 'ejs');


// Set Express static file route for hosting js and css files
app.use('/static', express.static(__dirname + '/static'));


// Render index page at server-side
app.get('/', function(req, res) {
    res.render('index');
});


// API query projects
app.get('/projects', function(req, res) {
    var url = apiData.apiUrl + '/projects' + apiData.apiKey;

    request.get(url, function(error, response, body) {
        var bodyData = parseJSON(body);
        res.send(bodyData);
    });
});


// redirect illegal url visits
app.all('*', function(req, res) {
    res.redirect('/');
});


function parseJSON(value) {
    var parsed;
    try {
        parsed = JSON.parse(value);
    } catch (e) {
        console.log('Error parsing JSON: ', e, '\nInput: ', value);
    }
    return parsed || false;
}
