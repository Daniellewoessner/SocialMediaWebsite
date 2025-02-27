import { Router } from 'express';
import { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser, 
    addFriend, 
    removeFriend 
} from '../../controllers/userControllers.js';

const router = Router();

// GET all users
router.get('/', getAllUsers);

// GET single user
router.get('/:id', getUserById);

// POST new user
router.post('/', createUser);

// PUT update user
router.put('/:id', updateUser);

// DELETE user
router.delete('/:id', deleteUser);

// POST add friend
router.post('/:userId/friends/:friendId', addFriend);

// DELETE remove friend
router.delete('/:userId/friends/:friendId', removeFriend);

export default router;