let UserRepository = require("../database/repositories/user-repository");

function createUser(req, res) {
  const user = req.body;

  UserRepository.create(user)
    .then(newUser => {
      res.json(newUser);
    })
    .catch(errors => {
      res.status(500).json({
        errors
      });
    });
}

function getUsers(req, res) {
  UserRepository.get()
    .then(users => {
      res.json(users);
    })
    .catch(errors => {
      res.status(500).json({
        errors
      });
    });
}

module.exports.createUser = createUser;
module.exports.getUsers = getUsers;