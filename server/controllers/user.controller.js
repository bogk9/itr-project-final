const User = require("../database/models/User");
const findQuery = require('objection-find');
const Collection = require("../database/models/Collection");
const Item = require("../database/models/Item");
const Comment = require("../database/models/Comment")
const Field = require("../database/models/Field");
const Topic = require("../database/models/Topic");
const Tag = require("../database/models/Tag");
const ItemTag = require("../database/models/ItemTag");
const FieldData = require("../database/models/FieldData");
const knex = require('../database/config/database')
const { body, validationResult } = require('express-validator');


const CollectionItem = require("../database/models/CollectionItem");
const { query } = require("../database/models/user");
const ItemLike = require("../database/models/ItemLike");
const secret_key = "test";


exports.getUserList = async (req, res) => {
  const users = await User.query();
  res.send(users);
}

exports.search = async (req, res) => {
  if(req.query.type){
    findAll(req.query.id, req.query.keyword)
    .then(result => result.flat().filter(item => item.type == req.query.type))
    .then(filtered => res.send(filtered))
  }
  else{
    findAll(req.query.id, req.query.keyword)
    .then(result => res.send(result.flat(1)))
  }
}

exports.getUserCollections = async (req, res) => {
  const userCollections = await Collection.query()
  .select('id', 'name', 'description', 'img_url', 'topic_id', 'user_id')
  .where('user_id', '=', req.userId)
  .orderBy('name');
  res.send(userCollections);
}

exports.getCollectionItems = async (req, res) => {
  let items = [];
  if(req.query.type && req.query.id){
    let fetchedRecords = [];
    if (req.query.type == "comment"){fetchedRecords = await Comment.query().where('id', '=', req.query.id)}
    else if(req.query.type == "item") {fetchedRecords = [{item_id: req.query.id}]}
    else if (req.query.type == "tag"){fetchedRecords = await ItemTag.query().where('tag_id', '=', req.query.id)}
    items = Item.query().findByIds(fetchedRecords.map(item => item.item_id));
  }
  else if(req.query.type) items = Item.query().orderBy('id', 'desc').limit(16)
  else if(req.query.id) items = CollectionItem.query()
  .select('item_id as id', 'it.name as name', 'it.img_url as img_url', 'it.user_id as user_id')
  .innerJoin('items as it', 'it.id', 'item_id')
  .where('collection_id', '=', req.query.id);
  let result = await items
  .withGraphFetched('item_tags.[tag]')
  .withGraphFetched('field_data.[field]')
  .withGraphFetched('comments')
  .withGraphFetched('likes')
  res.send(result);
}

exports.getAvailableFields = async (req, res) => {
  const fields = await Field.query()
  .select('id', 'type', 'name')
  .where('collection_id', '=', req.query.id);
  res.send(fields);
}

exports.getTopics = async (req, res) => {
  const topics = await Topic.query();
  res.send(topics);
}

exports.getTags = async (req, res) => {
  const tags = await Tag.query()
  res.send(tags);
}

exports.getTagsChart = async (req, res) => {
  const chart = await ItemTag.query().select('tag_id', 't.name as value', knex.raw('COUNT(*) as count'))
  .innerJoin('tags as t', 'tag_id', 't.id')
  .groupBy('tag_id');
  res.send(chart);
}

exports.getItemData = async (req, res) => {
  const item = await Item.query().findOne({id: req.query.id})
  .withGraphFetched('item_tags.[tag]')
  .withGraphFetched('field_data.[field]')

  res.send(item);
}

exports.changeUserStatus = (req, res) => {
  var targets = req.query.id ? [].concat(req.query.id) : [];
  User.query()
   .findByIds(targets)
   .patch({ "role": req.query.role })
   .then(() => {res.send({message: "success" });})
};

exports.addLike = (req, res) => {
  let obj = {item_id: req.body.item_id, user_id: req.userId};
  ItemLike.query()
  .findOne(obj)
  .then(result => {
    if(!result) return ItemLike.query().insert(obj);
    return ItemLike.query().delete().where('item_id', '=', req.body.item_id).where('user_id','=',req.userId);
  })
  .then(() => ItemLike.query().where('item_id', '=', req.body.item_id))
  .then((result) => res.send(result))
}

exports.deleteUser = (req, res) => {
  var targets = req.query.id ? [].concat(req.query.id) : [];
  User.query()
   .findByIds(targets)
   .delete()
   .then(() => {res.send({message: "success" });})
};

exports.deleteCollection = (req, res) => {
  var targets = req.query.id ? [].concat(req.query.id) : [];
  Collection.query()
   .findByIds(targets)
   .delete()
   .then(() => {res.send({message: "success" });})
};

exports.deleteItem = (req, res) => {
  CollectionItem.query().delete().where('item_id', '=', req.query.id)
  .then(() => res.send({message: "success"}))
};

exports.addComment = (req, res) => {
  Comment.query().insertAndFetch({value: req.body.value, item_id: req.body.item_id, user_id: req.userId, date: new Date()})
  .then((ins) => console.log(ins))
  .catch(err => res.status(400).json({message: err}));

}

exports.getComments = (req, res) => {
  Comment.query().where({item_id: req.query.item_id})
  .then(result => res.send(result))
  .catch(err => res.status(400).json({message: err}));
}

exports.addCollection = (req, res) => {
  const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }
  const collection = {
    name: req.body.name,
    description: req.body.description,
    img_url: `${process.env.AWS_URL}/${req.img_key}`,
    user_id: req.userId,
    topic_id: req.body.topic_id,
  };

  const extras = JSON.parse(req.body.additionalFields) 
  
  Collection.query().insertAndFetch(collection)
  .then(coll => {
    return coll;
  })
  .then(coll => {return extras.map(extra => {return {collection_id: coll.id, type: extra.type, name: extra.name}});})
  .then((extras) => Field.query().insertGraph(extras))
  .then(() => res.send({ message: "Collection has been added successfully!" }))
  .catch(error => console.log("Error: " + error))
};

exports.addItem = (req, res) => {
  let newItem = {
    name: req.body.name,
    img_url: `${process.env.AWS_URL}/${req.img_key}`,
    user_id: req.userId
  }
  let extras = JSON.parse(req.body.extraFields);
  Item.query().insertAndFetch(newItem)
  .then(item => { // insert item
    newItem["id"] = item.id;
    return item;
  })
  .then(() => { // add item fields data
    let fieldData = [];
    for (const [key, value] of Object.entries(extras)) {
      fieldData.push({field_id: parseInt(key), item_id: parseInt(newItem.id), value: value})
    }
    return FieldData.query().insertGraph(fieldData);
  })
  .then(() => { // connect item with collection
    return CollectionItem.query().insert({collection_id: parseInt(req.body.collection_id), item_id: parseInt(newItem.id)})
  })
  .then(() => { // add tags
    let tags = JSON.parse(req.body.tags);
    addTags(tags, newItem.id);
  })
  .then(() => res.send({message: "success"}))
  .catch(err => res.status(400).json({ message: "internal error" }))
}

exports.editItem = async (req, res, next) => {
  let extras = JSON.parse(req.body.extraFields);
  Item.query()
  .patch({ name: req.body.name, ...(req.img_key && {img_url: `${process.env.AWS_URL}/${req.img_key}`})})
  .findById(req.body.id)
  .then(() => {
    for (const [key, value] of Object.entries(extras)) {
      FieldData.query().update({value: value})
      .where('item_id', '=', req.body.id)
      .where('field_id', '=', parseInt(key))
    }
    return;
  })
  .then(() => ItemTag.query().delete().where('item_id', '=', req.body.id))
  .then(() => addTags(JSON.parse(req.body.tags), req.body.id))
  .then(result => res.send({message: "success"})
  )
}

var findAll = (id, keyword) => {
  const idKey = id ? "id" : "id:gt";
  const promises = [
  findQuery(Collection).allow('id', 'name').build({"name:like": `%${keyword || ''}%`, [idKey]: id || 0}, Collection.query().select('id', 'name', 'description as text', knex.raw('? as ??', ['collection', 'type']))),
  findQuery(Item).allow('id', 'name').build({"name:like": `%${keyword || ''}%`, [idKey]: id || 0}, Item.query().select('id', 'name', knex.raw('? as ??', ['', 'text']) , knex.raw('? as ??', ['item', 'type']))),
  findQuery(Comment).allow('id', 'value').build({"value:like": `%${keyword || ''}%`, [idKey]: id || 0}, Comment.query().select('id as id', knex.raw('? as ??', ['', 'name']), 'value as text', knex.raw('? as ??', ['comment', 'type']))),
  findQuery(Tag).allow('id', 'name').build({"name:like": `%${keyword || ''}%`, [idKey]: id || 0}, Tag.query().select('id as id', knex.raw('? as ??', ['', 'name']), 'name as text', knex.raw('? as ??', ['tag', 'type']))),
  ]
  return Promise.all(promises);
}

var addTags = (tags, item_id) => {
  for(let tag of tags){
    Tag.query().findOne({name: tag.text})
    .then(entry => {
      if(!entry) return Tag.query().insertAndFetch({name: tag.text});
      return entry;
    })
    .then(entry => {
      return ItemTag.query().insert({tag_id: entry.id, item_id: item_id})
    })
  }
}

exports.findAll = findAll;


