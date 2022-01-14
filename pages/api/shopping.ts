import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const shoppings = await prisma.shopping.findMany({
        orderBy: {
            createdAt: "asc",
        },
        });
        return res.status(200).json(shoppings);
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
};

