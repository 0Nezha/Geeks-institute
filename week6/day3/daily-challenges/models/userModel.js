const db = require('../config/db');

const getAllUsers = () => db('users').select('*');
const getUserById = (id) => db('users').where({ id }).first();
const createUser = (userData) => db('users').insert(userData).returning('*');
const updateUser = (id, data) => db('users').where({ id }).update(data).returning('*');
const deleteUser = (id) => db('users').where({ id }).del();

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
