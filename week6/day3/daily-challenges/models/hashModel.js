const db = require('../config/db');

const addHashedPassword = (data) => db('hashpwd').insert(data);
const getPasswordByUsername = (username) => db('hashpwd').where({ username }).first();

module.exports = { addHashedPassword, getPasswordByUsername };
