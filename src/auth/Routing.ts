import express from 'express';
import { registerUser, userLogin, changePassword, deleteUser, getUser } from '../user/controller';
import { fetchUsers } from '../user/services';

const router = express.Router();

//Route for HomePage
router.get('/', (req, res) => {
  res.send('Welcome to My API!');
})

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', userLogin);

// Route for changing password
router.put('/forgotpassword', changePassword);

// Route for deleting a user
router.delete('/delete', deleteUser);

//Route for User Searching User
router.get('/user', getUser);
// Route for fetching users with pagination, sorting, etc.
router.get('/users', async (req, res) => {
  const { page = 1, limit = 3, sortBy = 'username', order = 'asc' } = req.query;

  try {
    const users = await fetchUsers(
      Number(page),     // Convert query string to number
      Number(limit),    // Convert query string to number
      String(sortBy),   // Ensure sortBy is a string
      order === 'asc' ? 'asc' : 'desc' // Ensure order is either 'asc' or 'desc'
    );
    res.json(users); // Send the retrieved users as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' }); // Error handling
  }
});

export default router;
