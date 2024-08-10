import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCartProducts = async (req, res) => {   
    try {
        const cartProducts = await prisma.cart.findMany();

        if (!cartProducts.length) {
            return res.status(404).json({ success: false, message: "No cart Products found..." });
        } else {
            return res.status(200).json({ success: true, message: "Products fetched successfully...", data: cartProducts });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error while fetching products..." });
    }
};

export const getSingleCartProduct=async (req,res)=>{
    const {id}=req.params;
    try {
        const cartProducts=await prisma.cart.findFirst({where:{id:id}})
    if(!cartProducts.length){
        return res.status(404).json({success:false,message:"Cart Product not found..."})
    }
    else{
        res.status(200).json({success:true,message:"Cart Product fetched successfully...",data:cartProducts})
    }
    } catch (error) {
        res.status(500).json({success:false,message:"An error Ocured while fetching cart product.Try again later..."})
    }
}

export
