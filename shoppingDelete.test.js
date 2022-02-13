// https://qiita.com/chimame/items/e97883fd46b67529d59f jestの文法
// https://qiita.com/irico/items/0fa0cde39b1305c4b508 jestでimport文(es6)を使う方法 途中まで、jest: command not foundになっている
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