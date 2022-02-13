// https://qiita.com/chimame/items/e97883fd46b67529d59f jestの文法
// https://zenn.dev/dozo/articles/0091f1a3e790d6 typescript jest importエラーの対処法

import { PrismaClient } from "@prisma/client";
import axios from "axios";
const prisma = new PrismaClient();

describe('Shopping.tsのapiテスト', () => {
    // todo:getも作る
    // todo:postも作る
    it('deleteが正しく動作する', () => {
        // 最初はベタ書きでとりあえず動かす。
        const res = async () => {
            await axios.delete('/api/shopping', {
                id: "d3219c49-31db-40c8-af6f-b162b5e3855e"
            })
        };
        expect(res).toBeTruthy();
    });
});