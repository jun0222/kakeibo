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
    const [shoppingAll, setShoppingAll] = useState([]);
    const [filterYYYY, setFilterYYYY] = useState(Moment(new Date()).format('YYYY'));
    const [filterMM, setFilterMM] = useState(Moment(new Date()).format('MM'));
    const [filterYYYYMM, setFilterYYYYMM] = useState("");
    Moment.locale('ja');

    function getKindShop (shoppingData, date) {
        const thisDateItems = shoppingData.filter(item => {
            return Moment(item.date).format('YYYY-MM') === Moment(date).format('YYYY-MM')
        })
        const shopArray = thisDateItems.map((item) => item.shop);
        const shopKindArray = [...new Set(shopArray)]
        return shopKindArray;
    }

    // keyとvalueが一致するから、こっちだけのが良いかも。price高い順に並び替えもやろう。
    function getKindPrice (shoppingData, date) {
        const thisDateItems = shoppingData.filter(item => {
            return Moment(item.date).format('YYYY-MM') === Moment(date).format('YYYY-MM')
        })

        // const shopAndPriceArray = thisDateItems.map((item) =>  item.shop, item.price);
        // console.log(thisDateItems)
        // まずshopのvalueが同じものだけでグループ化するshopのvalueをキーにして、priceがvalueの新しい連想配列を作る
        // それをreturnして、グラフに当て込む
        // 次に

        const priceKindArray = {};
        thisDateItems.forEach((item) => {
            for (const [key, value] of Object.entries(item)) {
                priceKindArray[key] = 
                priceKindArray[key] === undefined 
                priceKindArray[key] + value
            }
        })
        return priceKindArray;

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

    useEffect(() => {
        // 買い物データ取得
        async function fetchData() {
            const response = await axios.get('/api/shopping');

            // dbからとったshoppingデータ
            const shoppingData = response.data;

            // shoppingデータからshopping.shopの種類を取得
            const shopKindArray = getKindShop(shoppingData, filterYYYY+"-"+filterMM)

            // shoppingデータからshopping.priceを取得 種類ごとの合計金額
            const priceKindArray = getKindPrice(shoppingData, filterYYYY+"-"+filterMM)
            console.log(priceKindArray)

            // shoppingデータに合計金額を追加
            const sumShoppingData = getSumShopping(shoppingData, filterYYYY+"-"+filterMM);
            shoppingData.push(sumShoppingData)

            // domにデータを反映
            setShoppingAll(shoppingData)
        }
        fetchData();

        // 日付フィルター
        const filter = filterYYYY + "-" + filterMM;
        setFilterYYYYMM(filter)
    },[filterYYYY, filterMM])
    const data = {
        labels: ['イトーヨーカドー', '業務スーパー', '外食'],
        datasets: [
            {
                data: [60,30,10],
                backgroundColor: ["#4169e1","#ff1493","#FFCE56"],
                hoverBackgroundColor:  ["#36A2EB","#FF6384","#FFCE56"],
                borderColor: ["transparent","transparent","transparent"]
            }
        ]
    } 

    return (
        <>
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