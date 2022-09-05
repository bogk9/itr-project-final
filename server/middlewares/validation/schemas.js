const {body, checkSchema, validationResult} = require('express-validator');
const User = require('../../database/models/user');
const Item = require('../../database/models/item');
const Topic = require('../../database/models/topic');

const registrationSchema = {
    username: {
        custom: {
            options: value => {
                return User.query().findOne({
                    username: value
                }).then(user => {
                    if (user) {
                        return Promise.reject('Username already in use')
                    }
                })
            }
        },
        isAlphanumeric: true,
        isLength: {
            errorMessage: 'Usernames should be at least 3 chars long',
            options: { min: 3, max: 15 },
        },
    },
    password: {
        isLength: {
            errorMessage: 'Password should be at least 3 chars long',
            options: { min: 3, max: 15 },
        },
    },
}

const loginSchema = {
    username: {
        isAlphanumeric: true,
        isLength: {
            errorMessage: 'Provided username is too short.',
            options: { min: 3, max: 15 },
        },
    },
    password: {
        isLength: {
            errorMessage: 'Provided password is to short.',
            options: { min: 3, max: 15 },
        },
    },
}

const itemSchema = {
    name: {
        isAlphanumeric: true,
        isLength: {
            errorMessage: 'Provided name is too short.',
            options: { min: 3, max: 100 },
        },
    }
}

const likeSchema = {
    item_id: {
        notEmpty: true
    },
}

const commentSchema = {
    value: {
        notEmpty: true,
        isLength: {
            errorMessage: 'Provided name is too short.',
            options: { min: 3, max: 100 },
        },
    },
    item_id:{
        notEmpty: true,
        custom: {
            options: value => {
                return Item.query().findOne({
                    id: value
                }).then(result => {
                    if (result) {
                        return Promise.reject('Item does not exist.')
                    }
                })
            }
        },
    }
}

const collectionSchema = {
    name: {
        notEmpty: true,
        isLength: {
            errorMessage: 'Name has wrong length.',
            options: { min: 2, max: 100 },
        },
    },
    description: {
        notEmpty: true,
        isLength: {
            errorMessage: 'Name has wrong length.',
            options: { min: 1, max: 500 },
        },
    },
    topic_id: {
        notEmpty: true,
        isLength: {
            errorMessage: 'Topic ID wrong.',
            options: {max: 4},
        },
        custom: {
            options: value => {
                return Topic.query().findOne({
                    id: value
                }).then(topic => {
                    if (!topic) {
                        return Promise.reject('Wrong topic.')
                    }
                })
            }
        },
    },
    additionalFields: {
        isJSON: {
            errorMessage: "Wrong additional fields format."
        },
        custom: 
            {options: fields => {

                for(let field of JSON.parse(fields)){
                    if(!field.type || !field.name) return Promise.reject("Extra fields error.")
                    if(!['string','boolean','multiline','integer','date'].includes(field.type)) return Promise.reject("Extra field err.")
                }
                return Promise.resolve();
            }}

    }
}

module.exports = {registrationSchema, loginSchema, collectionSchema, itemSchema, commentSchema, likeSchema};

