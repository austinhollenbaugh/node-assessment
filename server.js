var express = require('express');
var bodyParser = require('body-parser');
var users = require('./users.json');

var app = module.exports = express();

app.use(bodyParser.json());

var controller = require('./controller.js');

app.get('/api/users', controller.getUsers);
app.get('/api/users/:type', controller.filterByPrivilege);
app.get('/api/users:id', controller.getOneUser);
// app.post('/api/users', controller.createUser);
app.post('/api/users/:type', controller.createUser);
app.put('/api/users/language/:id', controller.changeLang);
app.put('/api/users/forums/:id', controller.addToForums);
app.delete('/api/users/forums/:id', controller.removeForum);
// app.put('/books/:id', booksController.update);
// app.post('/books', booksController.create);
// app.delete('/books/:id', booksController.destroy);

app.listen(3000, function() {
  console.log('listening on port 3000...');
});
