import { PrismaClient } from "@prisma/client";
import { response } from "express";
const prisma = new PrismaClient();

export async function createProduct(request, response) {
  const { productName, productPrice, productDescription, productImage } = request.body;

  // Basic validation (You can enhance this based on your requirements)
  if (!productName || !productPrice || !productDescription || !productImage) {
    return response.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const newProduct = await prisma.products.create({
      data: {
        productName,
        productPrice,
        productDescription,
        productImage,
      },
    });
    response.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    response.status(500).json({ success: false, message: "There was an error when creating a product" });
  }
}
export const getAllProducts=async (req,res)=>{ 
  try {
    const products=await prisma.products.findMany();
    if(!products){
      res.status(404).json({message:"oops!product not found.."})
    }else{
      res.status(200).json(products)
    }
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({message:"Oops!an error occured..."})
    console.log(error.message);
  }
}

export async function DeleteProduct(req, res){
  const {id} = req.params;
try {
  const productExist = await prisma.products.findFirst({where:{id:id}})
  if(!productExist){
    return res.status(400).json({success:false, message:"Product not found"})
  }
  await prisma.products.delete({where:{id:id}})
  return res.status(200).json({success:true, message:"product deleted"})
  
} catch (error) {
  
  console.log(error.message);
  return response.status(500).json({success:false, message:"Internal server error!"})
}
}

export async function getOneProduct(req, res){
  const {id} = req.params;
  try {
    const OneProduct = await prisma.products.findFirst({where:{id:id}});
    if(!OneProduct){
      return response.status(400).json({success:false, message:"product not found"})
    }
    return res.status(200).json({success:true, data:OneProduct})
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({success:false, message:"Internal server error!"})
    
  }
}

export async function updateProduct(req, res){
  const {id} = req.params;
  const {productName, productPrice, productDescription,productImage,productsRemaining} =req.body;
  console.log(req.body);
  try {
    const ProductExists = await prisma.products.findFirst({where:{id}})
    if(!ProductExists){
      return res.status(400).json({success:false, message:"product not found"})
    }
    const data ={};
    if(productName !== undefined)data.productName = productName;
    if(productPrice !== undefined)data.productPrice = productPrice;
    if(productDescription !== undefined)data.productDescription = productDescription;
    if(productImage !== undefined)data.productImage = productImage;
    if(productsRemaining !== undefined)data.productsRemaining = productsRemaining;

    const updateProduct = await prisma.products.update({
      where:{id:id},
      data:data
    });
    return response.status(200).json({success:true, message:"product pdated", data:updateProduct})

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({success:false, message:"Internal server error!"})
  }
}