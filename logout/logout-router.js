const router = require("express").Router();

const Users = require("../dbModel/dbModel");

router.get("/", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.json({ message: "you could not log out" });
      } else {
        res.status(200).json({
          message: "bye, thanks for logging out"
        });
      }
    });
  } else {
      res.status(200).json({message: `You aren't even logged in`})
  }
});

module.exports = router;
