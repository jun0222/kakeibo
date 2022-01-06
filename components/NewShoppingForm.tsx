import { useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios";


export default function NewShoppingForm() {
    function formatDate(dt) {
        var y = dt.getFullYear();
        var m = ('00' + (dt.getMonth()+1)).slice(-2);
        var d = ('00' + dt.getDate()).slice(-2);
        return (y + '/' + m + '/' + d);
    }
    const today = formatDate(new Date());

    const [form, update] = useState({
        date: today,
        type: "",
        shop: "",
        product: "",
        price: 0,
        userId: "1"
    });

    const saveShopping = async (ev: React.FormEvent<HTMLFormElement>) => {
        await axios.post('/api/shopping', {
            params: form
        })
    };

    return (
        <>
            <div className="flex items-center min-h-screen bg-black">
                <div className="container mx-auto">
                <div className="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
                    <div className="text-center">
                    <h1
                        className="my-3 text-3xl font-semibold text-gray-700"
                    >
                        家計簿登録
                    </h1>
                    </div>
                    <div className="m-7">
                    <form onSubmit={saveShopping}>

                        {/* 日付（2021/01/01とか） */}
                        <div className="mb-6">
                        <label
                            htmlFor="date"
                            className="block mb-2 text-sm text-gray-600"
                        >
                            日付
                        </label>
                        <input
                            value={form.date}
                            onChange={(e) => update({ ...form, date: e.target.value })}
                            placeholder="今日の日付をstateから持ってくる"
                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        />
                        </div>

                        {/* 分類（食費とか） */}
                        <div className="mb-6">
                        <label
                            htmlFor="type"
                            className="block mb-2 text-sm text-gray-600"
                        >
                            分類
                        </label>
                        <input
                            value={form.type}
                            onChange={(e) => update({ ...form, type: e.target.value })}
                            placeholder="食費"
                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        />
                        </div>

                        {/* 店舗（ヨーカドーとか） */}
                        <div className="mb-6">
                        <label
                            htmlFor="shop"
                            className="text-sm text-gray-600"
                        >
                            店舗
                        </label>
                        <input
                            value={form.shop}
                            onChange={(e) => update({ ...form, shop: e.target.value })}
                            placeholder="八百屋サンプル"
                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        />
                        </div>

                        {/* 品物（食材とか） */}
                        <div className="mb-6">
                        <label
                            htmlFor="product"
                            className="block mb-2 text-sm text-gray-600"
                        >
                            品物
                        </label>
                        <input
                            value={form.product}
                            onChange={(e) => update({ ...form, product: e.target.value })}
                            placeholder="食材"
                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        />
                        </div>

                        {/* 金額（600とか） */}
                        <div className="mb-6">
                        <label
                            htmlFor="price"
                            className="block mb-2 text-sm text-gray-600"
                        >
                            金額
                        </label>
                        <input
                            value={form.price}
                            onChange={(e) => update({ ...form, price: Number(e.target.value) })}
                            placeholder="600"
                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        />
                        </div>

                        {/* userId、一旦"test-user"で登録。current_user_idを入れる様にする。 */}
                        <div className="mb-6">
                        <input
                            value={form.userId}
                            onChange={(e) => update({ ...form, userId: e.target.value })}
                            type="hidden"
                            placeholder="600"
                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        />
                        </div>

                        {/* 送信ボタン */}
                        <div className="mb-6">
                        <button
                            type="submit"
                            className="w-full px-3 py-4 font-bold text-white bg-green-500 rounded-md focus:bg-green-600 focus:outline-none"
                        >
                            送信する
                        </button>
                        </div>

                    </form>
                    </div>
                </div>
                </div>
            </div>
        </>
        )
}