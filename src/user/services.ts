import { User, IUser } from './model';


export const findUserByUsername = async (username: string): Promise<IUser | null> => {
  return await User.findOne({ username });
};

// Function to create a user
export const createUser = async (userData: { username: string; email: string; password: string }) => {
  const newUser = new User(userData);
  return await newUser.save();
};

// Function to fetch users with pagination and sorting
export const fetchUsers = async (page: number, limit: number, sortBy: string, order: 'asc' | 'desc'):Promise<IUser[]|null> => {
  const skip = (page - 1) * limit; // Calculate number of documents to skip
  const sortOrder = order === 'asc' ? 1 : -1; // Convert 'asc'/'desc' to MongoDB sort order

  return await User.find()
    .sort({ [sortBy]: sortOrder }) // Sort based on the sortBy parameter
    .skip(skip) // Skip documents
    .limit(limit); // Limit the number of documents returned
};
