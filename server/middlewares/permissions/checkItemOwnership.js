
const Item = require("../../database/models/item");
let checkItemOwnership = (req, res, next) => {
    if(req.userRole == "2") next()

    Item.query().findOne({id: req.query.id})
    .then(result => {
        if(!result) res.status(403).json({message: "No such item."})
        if(result.user_id == req.userId) next()
        else res.status(403).json({message: "You do not own this item."})
    })
}

module.exports = checkItemOwnership;