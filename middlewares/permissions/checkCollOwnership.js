const Collection = require("../../database/models/collection");

const checkCollOwnership = (req, res, next) => {
    if(req.userRole == "2") next()

    Collection.query().findOne({id: req.query.id})
    .then(result => {
        if(!result) res.status(403).json({message: "No such collection."})
        if(result.user_id == req.userId) next()
        else res.status(403).json({message: "You do not own this collection."})
    })
    
}
module.exports = checkCollOwnership;