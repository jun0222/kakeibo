import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Data = {
    type: string;
    shop: string;
    product: "";
    price: number;
    userId: "";
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // if (req.method === "GET") {
    //     const shoppings = await prisma.shopping.findMany({
    //     orderBy: {
    //         createdAt: "desc",
    //     },
    //     });
    //     return res.status(200).json(shoppings);
    // }
    if (req.method === "GET") {
        // const { type, shop, product, price, userId } = JSON.parse(req.body) as Data;
        const createdShopping = await prisma.shopping.create({
            data: {
                type: "食費ああああああ。おおおおおおおおお？いけた？？？？？？？？？",
                shop: "ヨーカドー",
                product: "食材",
                price: 0,
                userId: "1"
            },
            });
            res.status(201).json(createdShopping);
        }
};

