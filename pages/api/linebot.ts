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
    const costSum = shoppings.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
    const costSumMsg = `今月の食費利用額は`+costSum+`円だよ` // バッククオート文字列の中で変数を使うようにする

    // 食費の1日平均
    const contAve = Math.ceil(costSum / nowDate.getDate());
    const contAveMsg = `1日平均`+contAve+`円だよ`

    // 今月の利用外食費
    const outCostSum = shoppings.map(
        item => item.shop === "外食" && item.price
    ).reduce(
        (prev, curr) => prev + curr, 0
    );
    const outCostSumMsg = `うち外食費は`+outCostSum+`円`

    // 外食費率
    const costRatio =  Math.ceil(outCostSum / costSum * 100);
    const costRatioMsg = `外食費は全体の`+costRatio+`%だよ`

    // 食費予想額
    const costPace = Math.ceil(contAve * nowMonthLast.getDate())
    const costPaceMsg = `今月の食費予想額は`+costPace+`円だよ`

    // apiを叩いたら返すjsonを整形
    res.status(200).json({ 
        msgs: {
            // 全部にMsgがついていて冗長なので連想配列を使う？
            costSumMsg,
            contAveMsg,
            outCostSumMsg,
            costRatioMsg,
            costPaceMsg
        }
    })
}
