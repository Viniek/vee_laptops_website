import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
const prisma = new PrismaClient();
dotenv.config();


export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.users.findMany({
            select: {
                id:true,
                firstName: true, 
                lastName: true,  
                email: true,
               role:true
            }
        });
        if (users.length === 0) {
            res.status(404).json({ message: "No users found." });
        } else {
             return res.status(200).json({ success:true, data: users });
        }
    } catch (error) {
        console.error(error.message);
       return  res.status(500).json({ message: "An error occurred while fetching users."});
    }
}


export const getSingleUser=async (req,res)=>{
    const{id}=req.params;
    try {
        const user= await prisma.users.findFirst({where:{id:id}});
        if(!user){
          return  res.status(404).json({message:"Oops!User not found..."})
        }
        res.status(200).json({success:true, data:user,message:"user fetched successfully"})
    } catch (error) {
      console.log(error.message);
       return res.status(500).json({message:"Oops!An error Occured..."})
       
    }
}

export async function CreateUser(req,res){
    const {firstName,lastName,email, password,role}=req.body;
    const hashedPassword= bcrypt.hashSync(password,10)
    try {
     const users=await prisma.users.create({
         data:{
             firstName,
             lastName,
             email, 
             password:hashedPassword,
             role
         }
     
     })
     res.status(200).json({success:true,data:users,message:"user created successfully.."})
    } catch (error) {
     res.status(500).json({message:"Oops!Error while creating user..."})
     console.log(error.message);
    }
}

export const deleteUser=async (req, res) =>{
    const { id } = req.params;
    try {
       
      const UserExist = await prisma.users.findFirst({ where: { id:id } });
      if (!UserExist) {
        return res.status(400).json({ message: "Oops!User not found..." });
      }
      await prisma.users.delete({ where: { id: id} });
      res.status(200).json({ message: "User deleted successfully..." });
    } catch (error) {
      console.log(error.message);
     return res.status(500).json({  message: "Internal server error!" });
    }
  }

  export const UpdateUser=async(req, res)=> {
    const { id } = req.params;
    const { firstName,lastName,email, password,role } = req.body;
    console.log(req.body);
    try {
      const UserExist = await prisma.users.findFirst({ where: { id: id } });
      if (!UserExist) {
        return res.status(400).json({ success: false, message: "User not found" });
      }
      const data = {};
      if (firstName !== undefined) data.firstName = firstName;
      if (lastName !== undefined) data.lastName = lastName;
      if (email!== undefined) data.email = email;
      if (password!== undefined) data.password = password;
      if (role !== undefined) data.role = role;
  
      const updatedUser= await prisma.users.update({
        where: { id: id },
        data: data,
      });
      res.status(200).json({ success: true, message: "User updated", data: updatedUser });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, message: "Internal server error!" });
    }
  }

  export async function loginUser(req, res) {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await prisma.users.findFirst({
        where: { email },
      });
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Compare the provided password with the hashed password
      const passwordMatch = bcrypt.compareSync(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ success: false, message: 'Wrong email or password' });
      }
  
      // Create JWT payload
      const payload = {
        id: user.id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role:user.role,
      };
  
      // Sign the token
      const token = jwt.sign(payload, process.env.JWT_SECRET);
  
      console.log(token);
  
      // Set the token in an HTTP-only cookie
      res.cookie('access_token', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', // Set to true in production
        // sameSite: 'Strict', // Adjust as needed
      });
  
      res.status(200).json({ success: true, data: payload });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }