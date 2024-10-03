const { userModel } = require('../database/db');
const jsonwebtoken = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function signup(req, res) {
  try {
    const { username, password, displayName } = req.body;

    const checkuser = await userModel.findOne({ username });

    if (checkuser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedpassword = await bcrypt.hash(password, 10); // Increase salt rounds to 10 for better security
    const user = new userModel({
      displayName,
      username,
      password: hashedpassword,
    });

    await user.save();

    const token = jsonwebtoken.sign({ _id: user._id }, process.env.USER_SECRET);

    res.status(200).json({
      message: "User created!",
      _id: user._id,
      user,
      token,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
}

async function signin(req, res) {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const correctpassword = await bcrypt.compare(password, user.password);

    if (!correctpassword) {
      return res.status(400).json({ message: `Wrong Password` });
    }

    const token = jsonwebtoken.sign({ _id: user._id }, process.env.USER_SECRET);

    res.status(200).json({
      token,
      user,
      _id: user._id,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
}

async function UpdatePassword(req, res) {
  const userId = req.userId;
  try {
    const { password, newpassword } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "You are not authorized" });
    }

    const correctpassword = await bcrypt.compare(password, user.password);

    if (!correctpassword) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const newhashedpassword = await bcrypt.hash(newpassword, 10);

    user.password = newhashedpassword;

    await user.save();

    res.status(200).json({ message: "User updated" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
}

async function getInfo(req, res) {
  const userId = req.userId;
  try {
    const user = await userModel.findById(userId);

    if (!user) return res.status(400).json({ message: "You are not allowed" });

    res.status(200).json({ message: "You can proceed further", user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  signup,
  signin,
  getInfo,
  UpdatePassword,
};
