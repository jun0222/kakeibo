import { useCountContext } from "../../components/DemoContext"
import { useSession, signIn, signOut } from "next-auth/react" // https://next-auth.js.org/
import axios from "axios";
import { useEffect, useState } from "react";
import Moment from 'moment';
import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import { Pie } from 'react-chartjs-2'
import SigninForm from "../../components/SigninForm";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
)
export default function ShoppingIndex () {
    const { demoMode, setDemoMode } = useCountContext();
    const [shoppingAll, setShoppingAll] = useState([]);
    const [filterYYYY, setFilterYYYY] = useState(Moment(new Date()).format('YYYY'));
    const [filterMM, setFilterMM] = useState(Moment(new Date()).format('MM'));
    const [filterYYYYMM, setFilterYYYYMM] = useState("");
    const [shopKindArray, setShopKindArray] = useState([]);
    const [priceKindArray, setPriceKindArray] = useState([]);
    Moment.locale('ja');
    const { data: session } = useSession()

    function getKindShop (shoppingData, date) {
        const thisDateItems = shoppingData.filter(item => {
            return Moment(item.date).format('YYYY-MM') === Moment(date).format('YYYY-MM')
        })
        const shopArray = thisDateItems.map((item) => item.shop);
        const shopKindArray = [...new Set(shopArray)] // tsエラー、直す。
        return shopKindArray;
    }

    // keyとvalueが一致するから、こっちだけのが良いかも。price高い順に並び替えもやろう。
    function getKindPrice (shoppingData, date) {
        const thisDateItems = shoppingData.filter(item => {
            return Moment(item.date).format('YYYY-MM') === Moment(date).format('YYYY-MM')
        })

        // やっぱり最初にkeyをshop, valueをpriceにした連想配列を作るべきだ。
        const shopArray = thisDateItems.map((item) =>  item.shop);
        const priceArray = thisDateItems.map((item) =>  item.price);

        // shopがキー、priceがvalueの配列を作ってreturnする
        const shopAndPriceArray = []
        for (let i = 0; i < shopArray.length; i++) {
            shopAndPriceArray.push(
                {
                    shop: shopArray[i],
                    price: priceArray[i]
                }
            )
        }
        const sumByShopArray = []
        shopAndPriceArray.forEach(item => {
            if(sumByShopArray[item.shop] === undefined){
                sumByShopArray[item.shop] = item.price
            } else {
                sumByShopArray[item.shop] += item.price
            }
        })

        return sumByShopArray;

    }

    function getSumShopping (items, date) {
        const thisDateItems = items.filter(item => {
            return Moment(item.date).format('YYYY-MM') === Moment(date).format('YYYY-MM')
        })
        const total = thisDateItems.reduce((sum, i) => sum + i.price, 0);
        const sumShoppingObj = {
            id: "-",
            date: date,
            price: total,
            product: "-",
            shop: "-",
            type: "",
            updatedAt: "",
            createdAt: "",
            userId: "合計"
        }
        return sumShoppingObj;
    }

    // useEffectが2回呼ばれるようになっているので、直す https://qiita.com/daishi/items/9b42f93c1d0e75febb92
    useEffect(() => {
        // 買い物データ取得
        async function fetchData() {
            if(demoMode){
                const response = await axios.get('/api/shopping',{
                    params: {
                        userId: "demo-mode"
                    }
                });
                // dbからとったshoppingデータ
                const shoppingData = response.data;

                // shoppingデータからshopping.shopの種類を取得
                const shopKindArray = getKindShop(shoppingData, filterYYYY+"-"+filterMM)
                setShopKindArray(shopKindArray)

                // shoppingデータからshopping.priceを取得 種類ごとの合計金額
                const priceKindArray = getKindPrice(shoppingData, filterYYYY+"-"+filterMM)
                setPriceKindArray(priceKindArray)
                // shoppingデータに合計金額を追加
                const sumShoppingData = getSumShopping(shoppingData, filterYYYY+"-"+filterMM);
                shoppingData.push(sumShoppingData)

                // domにデータを反映
                setShoppingAll(shoppingData)
            } else {
                const response = await axios.get('/api/shopping',{
                    params: {
                        userId: session.user.email
                    }
                });
                // dbからとったshoppingデータ
                const shoppingData = response.data;

                // shoppingデータからshopping.shopの種類を取得
                const shopKindArray = getKindShop(shoppingData, filterYYYY+"-"+filterMM)
                setShopKindArray(shopKindArray)

                // shoppingデータからshopping.priceを取得 種類ごとの合計金額
                const priceKindArray = getKindPrice(shoppingData, filterYYYY+"-"+filterMM)
                setPriceKindArray(priceKindArray)
                // shoppingデータに合計金額を追加
                const sumShoppingData = getSumShopping(shoppingData, filterYYYY+"-"+filterMM);
                shoppingData.push(sumShoppingData)

                // domにデータを反映
                setShoppingAll(shoppingData)
            }
        }
        fetchData();

        // 日付フィルター
        const filter = filterYYYY + "-" + filterMM;
        setFilterYYYYMM(filter)
    },[filterYYYY, filterMM])

    // shopごとの合計金額を出す
    const priceSumArray = []
    shopKindArray.forEach(item => {
        priceSumArray.push(priceKindArray[item])
    })
    console.log(shoppingAll)

    // グラフに各金額などを入れる、順番を金額大きい順に直す
    const data = {
        labels: shopKindArray,
        datasets: [
            {
                data: priceSumArray,
                backgroundColor: ["#4169e1","#ff1493","#FFCE56"],
                hoverBackgroundColor:  ["#36A2EB","#FF6384","#FFCE56"],
                borderColor: ["transparent","transparent","transparent"]
            }
        ]
    } 
    if (session  || demoMode) {
        return (
            <>
            <div>
                <p>
                    {demoMode && 
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded" onClick={() => setDemoMode(false)}>
                            demo exit
                        </button>
                    }
                </p>
            </div>
                <div className="container mx-auto">
                    <div className="App w-1/2 lg:w-1/3 mx-auto">
                        <Pie data={data} />
                    </div>
                    <div>
                        <div className="w-3/4 mx-auto">
                            <div className="text-right">
                                <select
                                    value={filterYYYY}
                                    onChange={(e) => {setFilterYYYY(e.target.value)}}
                                    className="sm:w-1/4 p-4"
                                >
                                    <option value="2021">2021年</option>
                                    <option value="2022">2022年</option>
                                    <option value="2023">2023年</option>
                                    <option value="2024">2024年</option>
                                    <option value="2025">2025年</option>
                                    <option value="2026">2026年</option>
                                    <option value="2027">2027年</option>
                                    <option value="2028">2028年</option>
                                    <option value="2029">2029年</option>
                                </select>

                                <select
                                    value={filterMM}
                                    onChange={(e) => {setFilterMM(e.target.value)}}
                                    className="sm:w-1/4 p-4"
                                >
                                    <option value="01">01月</option>
                                    <option value="02">02月</option>
                                    <option value="03">03月</option>
                                    <option value="04">04月</option>
                                    <option value="05">05月</option>
                                    <option value="06">06月</option>
                                    <option value="07">07月</option>
                                    <option value="08">08月</option>
                                    <option value="09">09月</option>
                                    <option value="10">10月</option>
                                    <option value="11">11月</option>
                                    <option value="12">12月</option>
                                </select>
                            </div>
                        </div>
                        <table className="table-fixed w-3/4 mx-auto">
                            <thead>
                                <tr>
                                <th className="border border-gray-500 w-1/4 sm:px-4 sm:py-2">日付</th>
                                <th className="border border-gray-500 w-1/4 sm:px-4 sm:py-2">金額</th>
                                <th className="border border-gray-500 w-1/4 sm:px-4 sm:py-2">品名</th>
                                <th className="border border-gray-500 w-1/4 sm:px-4 sm:py-2">店舗</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shoppingAll.map(shopping => {
                                    return(
                                        <>
                                            { filterYYYYMM === Moment(shopping.date).format('YYYY-MM') &&
                                            <tr key={shopping.id}>
                                                {   
                                                    shopping.userId === "合計" &&
                                                    <td className="border border-gray-500 p-1 sm:px-4 sm:py-2">{shopping.userId}</td>
                                                }
                                                {   
                                                    shopping.userId !== "合計" &&
                                                    <td className="border border-gray-500 p-1 sm:px-4 sm:py-2">{Moment(shopping.date).format('MM-DD')}</td>
                                                }
                                                <td className="border border-gray-500 p-1 sm:px-4 sm:py-2">{shopping.price}</td>
                                                <td className="border border-gray-500 p-1 sm:px-4 sm:py-2">{shopping.product}</td>
                                                <td className="border border-gray-500 p-1 sm:px-4 sm:py-2">{shopping.shop}</td>
                                            </tr>}
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>


            </>
        )
    }
    return (
        <>
            <SigninForm />
        </>
    )
}