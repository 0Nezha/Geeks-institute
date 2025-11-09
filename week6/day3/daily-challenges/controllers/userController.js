const bcrypt = require('bcrypt');
const db = require('../config/db');
const User = require('../models/userModel');
const Hash = require('../models/hashModel');

// ✅ REGISTER (inscription avec transaction)
const register = async (req, res) => {
  const { email, username, first_name, last_name, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.transaction(async (trx) => {
      await trx('users').insert({ email, username, first_name, last_name });
      await trx('hashpwd').insert({ username, password: hashedPassword });
    });

    res.status(201).json({ message: '✅ User registered successfully' });
  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// 🔑 LOGIN (authentification)
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Hash.getPasswordByUsername(username);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: 'Invalid password' });

    res.json({ message: '✅ Login successful' });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
};

// 📋 GET ALL USERS
const getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error('❌ Error fetching users:', err);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

// 🔍 GET USER BY ID
const getUserById = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('❌ Error fetching user:', err);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

// ✏️ UPDATE USER
const updateUser = async (req, res) => {
  try {
    const updated = await User.updateUser(req.params.id, req.body);
    if (!updated.length) return res.status(404).json({ message: 'User not found' });
    res.json({ message: '✅ User updated successfully', user: updated[0] });
  } catch (err) {
    console.error('❌ Error updating user:', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// 🗑️ DELETE USER
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: '🗑️ User deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = {
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
