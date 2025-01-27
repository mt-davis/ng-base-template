const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all users with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', role, isActive } = req.query;
    const offset = (page - 1) * limit;

    let query = db('users').select('*');

    // Apply filters if provided
    if (search) {
      query = query.where(builder => {
        builder.where('firstName', 'like', `%${search}%`)
          .orWhere('lastName', 'like', `%${search}%`)
          .orWhere('email', 'like', `%${search}%`);
      });
    }

    if (role) {
      query = query.where('role', role);
    }

    if (isActive !== undefined) {
      query = query.where('isActive', isActive === 'true');
    }

    // Get total count for pagination
    const totalQuery = query.clone().count('* as count').first();

    // Order by ID if createdAt is not available
    query = query.limit(limit).offset(offset).orderBy('id', 'desc');

    const [users, total] = await Promise.all([query, totalQuery]);

    res.json({
      users,
      pagination: {
        total: total.count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total.count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get single user
router.get('/:id', async (req, res) => {
  try {
    const user = await db('users')
      .where('id', req.params.id)
      .first();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Create user
router.post('/', async (req, res) => {
  try {
    const { email, firstName, lastName, role = 'user', isActive = true } = req.body;

    // Validate required fields
    if (!email || !firstName || !lastName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if email already exists
    const existingUser = await db('users').where('email', email).first();
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const [user] = await db('users')
      .insert({
        email,
        firstName,
        lastName,
        role,
        isActive
      })
      .returning('*');

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { email, firstName, lastName, role, isActive } = req.body;
    const userId = req.params.id;

    // Check if user exists
    const existingUser = await db('users').where('id', userId).first();
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check email uniqueness if email is being updated
    if (email && email !== existingUser.email) {
      const emailExists = await db('users')
        .where('email', email)
        .whereNot('id', userId)
        .first();
      if (emailExists) {
        return res.status(409).json({ error: 'Email already exists' });
      }
    }

    const [updatedUser] = await db('users')
      .where('id', userId)
      .update({
        email: email || existingUser.email,
        firstName: firstName || existingUser.firstName,
        lastName: lastName || existingUser.lastName,
        role: role || existingUser.role,
        isActive: isActive !== undefined ? isActive : existingUser.isActive
      })
      .returning('*');

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const user = await db('users').where('id', userId).first();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await db('users').where('id', userId).delete();

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router; 