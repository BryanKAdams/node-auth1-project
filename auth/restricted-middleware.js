const bcrypt = require("bcryptjs");
const Users = require("../dbModel/dbModel");
module.exports = {
  restricted
};

function restricted(req, res, next) {
  const { username, password } = req.headers;
  if (req.session && req.session.user) {
    // Users.findBy({ username })
    //   .first()
    //   .then(user => {
    //     if (user && bcrypt.compareSync(password, user.password)) {
          next();
        // } else {
        //   res.status(401).json({ message: "Invalid Credentials" });
        // }
      // }).catch(err => {
      //   res.status(500).json(error);
      // });
  } else {
    res.status(401).json({ message: "You shall not pass!" });
  }
}
