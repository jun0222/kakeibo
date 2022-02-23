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

    // 今月の1日平均食費利用額
    // →上記の「今月の食費利用額」を今月の日数（Dateライブラリ利用？）で割る、
    // 割ったものを今月すでに経過した日数でかける。

    // 経過日数=今の日数として平均を出して、Math.ceilで小数点を丸めている
    const foodExpensesPaidAverage = Math.ceil(foodExpensesPaidThisMonth / nowDate.getDate());
    const foodExpensesPaidAverageMessage = `1日平均`+foodExpensesPaidAverage+`円だよ`

    // 今月の利用外食費
    // →「今月の食費利用額」と同様の方法で取得するが、
    // 店舗に該当するカラムが外食のものだけで絞る。
    const eatingOutPaidThisMonth = shoppings.map(
        item => item.shop === "外食" && item.price
    ).reduce(
        (prev, curr) => prev + curr, 0
    );
    const eatingOutPaidThisMonthMessage = `うち外食費は`+eatingOutPaidThisMonth+`円`

    // 今月の食費全体に占める外食費の割合
    // →「今月の利用外食費」/ 「今月の食費利用額」 * 100
    const foodCostRatio =  Math.ceil(eatingOutPaidThisMonth / foodExpensesPaidThisMonth * 100);
    const foodCostRatioMessage = `外食費は全体の`+foodCostRatio+`%だよ`

    // apiを叩いたら返すjsonを整形
    res.status(200).json({ 
        botMessages: {
            // この辺りの変数名も無駄な情報が多いのでコメントや階層をうまく使ってスマートにする
            foodExpensesPaidThisMonthMessage,
            foodExpensesPaidAverageMessage,
            eatingOutPaidThisMonthMessage,
            foodCostRatioMessage
        }
    })
}
