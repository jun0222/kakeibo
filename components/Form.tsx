import { useState } from "react"

export default function Form() {
    const [date, setDate] = useState("2021/01/02")
    const [type, setType] = useState("")
    const [shop, setShop] = useState("")
    const [product, setProduct] = useState("")
    const [price, setPrice] = useState("")
    const [userId, setUserId] = useState("test-user")

    const getInputTextForDate = (event) => setDate(event.target.value);
    const getInputTextForType = (event) => setType(event.target.value);
    const getInputTextForShop = (event) => setShop(event.target.value);
    const getInputTextForProduct = (event) => setProduct(event.target.value);
    const getInputTextForPrice = (event) => setPrice(event.target.value);
    const getInputTextForUserId = (event) => setUserId(event.target.value);

    const createShopping = () => {
        window.alert(date);
        window.alert(type);
        window.alert(shop);
        window.alert(product);
        window.alert(price);
        window.alert(userId);
    }

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
                <form>

                    {/* 日付（2021/01/01とか） */}
                    <div className="mb-6">
                    <label
                        htmlFor="date"
                        className="block mb-2 text-sm text-gray-600"
                    >
                        日付
                    </label>
                    <input
                        value={date}
                        onChange={getInputTextForDate}
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
                        value={type}
                        onChange={getInputTextForType}
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
                        value={shop}
                        onChange={getInputTextForShop}
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
                        value={product}
                        onChange={getInputTextForProduct}
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
                        value={price}
                        onChange={getInputTextForPrice}
                        placeholder="600"
                        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                    </div>

                    {/* userId、一旦"test-user"で登録。current_user_idを入れる様にする。 */}
                    <div className="mb-6">
                    <input
                        value={userId}
                        onChange={getInputTextForUserId}
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
                        onClick={createShopping}
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