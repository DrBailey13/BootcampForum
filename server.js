let express = require('express');

let PORT = process.env.PORT || 8080;

let app = express();

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
let exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Serve static content for the app from the 'public' directory in the application directory.
//app.use(express.static('public'));

// Import routes and give the server access to them.
//const routes = require('./routes/api-routes')
const routes = express.Router()
require('./routes/api-routes.js')(routes)

app.use('/*', routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log('Server listening on: http://localhost:' + PORT);
});

