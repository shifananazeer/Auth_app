import express from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

import { errorHandler } from '../utils/error.js'; 

export const adminLogin = async(req, res , next) => {
    const { email, password } = req.body;
    try {
        // Check if the user exists and is an admin
        const user = await User.findOne({ email });
        if (!user || !user.isAdmin) {
            return next(errorHandler(401, 'Access denied. Admin only.'));
        }

        // Verify the password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
          return next(errorHandler(400, 'Invalid credentials.'));
        }

        // Create a JWT token with admin privileges
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token in a cookie
        res.cookie('admin_token', token, { 
            httpOnly: true, 
            maxAge: 3600000, // 1 hour
            secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
            sameSite: 'strict' 
        })
        .status(200).json({ message: 'Login successful', user });
   } catch (error) {
     next(errorHandler(500, 'Server error'));
   }
};


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json(users); 
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users.' });
    }
};


export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body; 

    try {
        const user = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        next(errorHandler(500, 'Server error'));
    }
};


export const editPage  = async (req, res) => {
    const { id } = req.params; 
    try {
        
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}


export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id); 
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(errorHandler(500, 'Server error'));
    }
}


// adminController.js
export const createUser = async (req, res) => {
    try {
        const { username, email, password, profilePicture, isAdmin } = req.body;

        // Validate the incoming data
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Optionally, check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const newUser = new User({
            username,
            email,
            password, // Ensure you hash this password before saving in production
            profilePicture,
            isAdmin,
        });

        await newUser.save();
        res.status(201).json(newUser); // Respond with the created user
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Failed to create user", error: error.message });
    }
};