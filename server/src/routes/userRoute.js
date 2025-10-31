import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Create a new user
router.post("/", async (req, res) => {
  const { name, lastname, email } = req.body; 
    try {
    const user = await prisma.user.create({
      data: { name, lastname, email },
    });
    res.status(201).json({success:true,user});
  } catch (error) {
    console.error('Error creating user:', { error: error.message, stack: error.stack });
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({success:true,users});
  } catch (error) {
    console.error('Error fetching all users:', { error: error.message, stack: error.stack });
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Get a user by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
    try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (user) {
      res.status(200).json({success:true,user});
    } else {
      res.status(404).json({ error: "User not found" });
    }
    } catch (error) {
    console.error('Error fetching user by ID:', { id, error: error.message, stack: error.stack });
    res.status(500).json({ error: "Failed to fetch user" });
    }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
    await prisma.user.delete({
      where: { id },
    });
    //send success status with success message
    res.status(204).json({success:true,message: "User deleted successfully" });
  } catch (error) {
    console.error('Error deleting user:', { id, error: error.message, stack: error.stack });
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Update a user by ID
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, lastname, email } = req.body;

    try {
    const user = await prisma.user.update({
        where: {id},
        data: { name, lastname, email},
    });
    res.status(200).json({success:true,user});
    } catch (error) {
    console.error('Error updating user:', { id, error: error.message, stack: error.stack });
    res.status(500).json({ error: "Failed to update user" });
}
});


export default router;