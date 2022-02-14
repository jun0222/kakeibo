import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const userId = req.query.userId;
        if (typeof userId === "string"){
            const shoppings = await prisma.shopping.findMany({
                where: {
                    userId: userId,
                },
                orderBy: {
                    createdAt: "asc",
                },
            });
            return res.status(200).json(shoppings);
        }
    }
    if (req.method === "POST") {
        const params = req.body.params;
        const createdShopping = await prisma.shopping.create({
            data: {
                type: params.type,
                shop: params.shop,
                product: params.product,
                price: params.price,
                userId: params.userId
            },
            });
            res.status(201).json(createdShopping);
    }
    if (req.method === "DELETE") {
        const id = req.query.id;
        if (typeof id === "string"){
            const deletedShopping = await prisma.shopping.delete({
                where: {
                    id: id
                }
            })
            return res.status(204).json(deletedShopping);
        }
    }
};

