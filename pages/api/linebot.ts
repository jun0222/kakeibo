// ここにlinebotで必要なデータを返すapiを書く。
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const shoppings = await prisma.shopping.findMany({});
    res.status(200).json({ shoppingsAll: shoppings })
}
  