import { User } from '../Models/User.js';
import mongoose from 'mongoose';

// Controller methods for Users
export const getAllUsers = async (_req: any, res: { json: (arg0: any) => void; }) => {
    const allUsers = await User.find();
    res.json(allUsers);
};

export const getUserById = async (req: any, res: { json: (arg0: any) => void; }) => {
    const singleUser = await User.findById(req.params.id);
    res.json(singleUser);
};

export const createUser = async (req: any, res: { json: (arg0: any) => void; }) => {
    const newUser = await User.create(req.body);
    res.json(newUser);
};

export const updateUser = async (req: any, res: { json: (arg0: any) => void; }) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id, req.body, { new: true });
    res.json(updatedUser);
};

export const deleteUser = async (req: any, res: { json: (arg0: any) => void; }) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json(deletedUser);
};

export const addFriend = async (req: any, res: { json: (arg0: any) => void; status: (code: number) => any }) => {
    try {
        const user = await User.findById(req.params.userId);
        const friend = await User.findById(req.params.friendId);
        
        if (!user || !friend) {
            return res.status(404).json({ message: "User or friend not found" });
        }
        
        if (user.friends.includes(friend._id)) {
            return res.status(400).json({ message: "Already friends" });
        }
        
        user.friends.push(friend._id);
        
        friend.friends.push(user._id);
        
        await user.save();
        await friend.save();
        
        res.json(user);
    }
    catch (err) {     
        res.status(500).json(err);
    }
};

export const removeFriend = async (req: any, res: { json: (arg0: any) => void; }) => {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);
    if (user && friend) {
        user.friends = user.friends.filter((friendId: any) => friendId.toString() !== req.params.friendId);
        friend.friends = friend.friends.filter((userId: any) => userId.toString() !== req.params.userId);
        await user.save();
        await friend.save();
        res.json(user);
    }
};