const algoliasearch = require('algoliasearch')
const client = algoliasearch('TL13X0C6TX', '682576a5f9da94254313a61dc3e67076');
const index = client.initIndex('test_index');
const searchSuggestionIndex = client.initIndex('test_index_query_suggestions')
const controller = require('../controllers/user.controller');

var update = () => {
    controller.findAll("", "")
    .then(results => results.flat())
    .then(results => results.map(item => {return {...item, objectID: `${item.type}${item.id}`}}))
    .then(results => {index.saveObjects(results, { autoGenerateObjectIDIfNotExist: true }); searchSuggestionIndex.saveObjects(results, { autoGenerateObjectIDIfNotExist: true })})
}

const init = () => {
    setInterval(update, 30000);
}
module.exports = init;

