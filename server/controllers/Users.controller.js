import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllUsers=async (req,res)=>{
    const response=await WebGLShaderPrecisionFormat.users.getMany();
    try {
        if(!users){
            res.status(404).json("message:User not found...")
        }else{
            res.status(200).json({users})
        }
    } catch (error) {
        res.status(500).json("An error occured while fetching Users...")
    }
}