var users = require('./users.json');

module.exports = {
  getUsers: function (req, res, next) {
    if (req.query.language) {
      // console.log(req.query);
      var language = req.query.language;
      var langArr = [];
      for (var i = 0; i < users.length; i++) {
        if (users[i].language === language) {
          langArr.push(users[i]);
        }
      }
      res.status(200).send(langArr);
    } else {
      res.status(200).send(users);
    }
  },
  filterByPrivilege: function (req, res, next) {
    var type = req.params.type;
    var typeArr = [];
    for (var i = 0; i < users.length; i++) {
      if (users[i].type === type) {
        typeArr.push(users[i]);
      }
    }
    res.status(200).send(typeArr);
  },
  createUser: function (req, res, next) {
    var newUser = req.body;
    if (req.params.type) {
      var type = req.params.type;
      newUser.type = type;
    }
    users.push(newUser);
    res.status(200).send(newUser);
  },
  changeLang: function (req, res, next) {
    var id = req.params.id;
    var lang = req.body.language;
    for (var i = 0; i < users.length; i++) {
      if (i === id - 1) {
        users[i].language = lang;
        var updatedUser = users[i];
      }
    }
    res.status(200).send(updatedUser);
  },
  addToForums: function (req, res, next) {
    var id = req.params.id;
    var newForum = req.body.add;
    for (var i = 0; i < users.length; i++) {
      if (i === id - 1) {
        console.log('hit1');
        users[i].favorites.push(newForum);
        var updatedUser = users[i];
      }
    }
    res.status(200).send(updatedUser);
  },
  removeForum: function (req, res, next) {
    console.log('hit1');
    var id = req.params.id;
    var forum = req.query;
    for (var i = 0; i < users.length; i++) {
      if (i === id - 1) {
        for (var j = 0; j < users[i].favorites.length; j++) {
          if (users[i].favorites[j] === forum) {
            console.log('hit2');
            users[i].favorites.splice(j, 1, j--);
            var updatedUser = users[i];
          }
        }
      }
    }
    res.status(200).send(updatedUser);
  },
  getOneUser: function (req, res, next) {
    var id = req.params.id;
    for (var i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        res.status(200).send(users[i]);
      } else if (!users[i]) {
        res.status(404).send();
      }
    }
  }

  // createAdmin: function (req, res, next) {
  //   var newUser
  // }
};
