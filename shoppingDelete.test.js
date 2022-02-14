// https://qiita.com/chimame/items/e97883fd46b67529d59f jestの文法
// https://zenn.dev/dozo/articles/0091f1a3e790d6 typescript jest importエラーの対処法

import axios from "axios";

describe('Shopping.tsのapiテスト', () => {
    // todo:getも作る
    // todo:postも作る
    it('deleteが正しく動作する', () => {
        // 最初はベタ書きでとりあえず動かす。
        const res = async () => {
            await axios.delete('/api/shopping', {
                params: {
                    id: "bda65fac-c09b-4146-b69e-fe764dc44574"
                }
            })
        };
        expect(res).toBeTruthy();
    });
});