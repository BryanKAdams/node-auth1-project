const router = require("express").Router();

const Users = require("../dbModel/dbModel");

const {restricted} = require('../auth/restricted-middleware')
router.use(restricted)

router.get('/', (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => res.status(500).send(err))

});



module.exports = router;
