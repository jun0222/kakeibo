// ここにlinebotで必要なデータを返すapiを書く。
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {

    // 今月の食費利用額
    // →今月はDate newなど？で取得し、
    // 　DBから取得した今月のshoppingのprice合計値を出す。

    // 今月のYYYYとDDを取得
    const nowDate = new Date()
    const toYear = nowDate.getFullYear().toString();
    const toMonth = nowDate.getMonth() + 1;
    const toMonthZeroPadding =  ( '00' + toMonth ).slice( -2 );

    const shoppings = await prisma.shopping.findMany({
        where: {
            userId: "jundev63@gmail.com", // ハードコーディングしているので、該当ユーザーのメールアドレスを使うようにするLINE連携画面が必要？

            // 月初,月末がうまく取れなかったので今月の01日〜31日を取得
            date: {
                gte: new Date(toYear+`-`+toMonthZeroPadding+`-01`),
                lt:  new Date(toYear+`-`+toMonthZeroPadding+`-31`)
            }
        }
    });

    // shoppingsの各objのpriceを合計する
    const foodExpensesPaidThisMonth = shoppings.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
    const foodExpensesPaidThisMonthMessage = `今月の食費利用額は`+foodExpensesPaidThisMonth+`円だよ` // バッククオート文字列の中で変数を使うようにする

    // apiを叩いたら返すjsonを整形
    res.status(200).json({ 
        botMessages: {
            foodExpensesPaidThisMonthMessage: foodExpensesPaidThisMonthMessage
        }
    })
}
