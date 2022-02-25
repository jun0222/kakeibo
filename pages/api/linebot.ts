// LINEbot用API -> 現状は食費関連メッセージのapiとして実装している。個人で設定可能にする
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {

    // 計算用の日付
    const nowDate = new Date(); // 今日
    const nowMonthFirst = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1); // 月初の日付
    const nowMonthLast = new Date(nowDate.getFullYear(), nowDate.getMonth()+1, 0); // 月末の日付

    // 今月のshoppingを取得
    const shoppings = await prisma.shopping.findMany({
        where: {
            userId: "demo-mode", // ハードコーディングしているので、該当ユーザーのメールアドレスを使うようにするLINE連携画面が必要？userIdのテーブルを分けたい。
            date: {
                gte: nowMonthFirst,
                lt:  nowMonthLast
            }
        }
    });

    // 今月の食費利用額
    const costSumNum = shoppings.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
    const costSum = `今月の食費利用額は`+costSumNum+`円だよ` // バッククオート文字列の中で変数を使うようにする

    // 食費の1日平均
    const contAveNum = Math.ceil(costSumNum / nowDate.getDate());
    const contAve = `1日平均`+contAveNum+`円だよ`

    // 今月の利用外食費
    const outCostSumNum = shoppings.map(
        item => item.shop === "外食" && item.price
    ).reduce(
        (prev, curr) => prev + curr, 0
    );
    const outCostSum = `うち外食費は`+outCostSumNum+`円`

    // 外食費率
    const costRatioNum =  Math.ceil(outCostSumNum / costSumNum * 100);
    const costRatio = `外食費は全体の`+costRatioNum+`%だよ`

    // 食費予想額
    const costPaceNum = Math.ceil(contAveNum * nowMonthLast.getDate())
    const costPace = `今月の食費予想額は`+costPaceNum+`円だよ`

    // apiを叩いたら返すjsonを整形
    res.status(200).json({ 
        msgs: {
            costSum,
            contAve,
            outCostSum,
            costRatio,
            costPace
        }
    })
}
