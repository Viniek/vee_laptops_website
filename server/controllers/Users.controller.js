import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from'bcrypt'

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
            res.status(200).json({ users });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "An error occurred while fetching users.", error: error.message });
    }
}


export const getSingleUser=async (req,res)=>{
    const{id}=req.params;
    try {
        const users= await prisma.users.findFirst({where:{id:id}});
        if(!users){
            res.status(404).json({message:"Oops!User not found..."})
        }else{
            res.status(200).json(users)
        }
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message:"Oops!An error Occured..."})
        console.log(error.message);
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
     res.status(200).json(users)
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
      res.status(500).json({  message: "Internal server error!" });
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