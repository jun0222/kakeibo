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

    // ここで合計値を取得して、setShoppingAll(response.data);の最後に入れる
    function getSumShopping (items, date) {
        const total = items.reduce((sum, i) => sum + i.price, 0);
        const sumShoppingObj = {
            id: "-",
            date: date, // 日付も対応しないと完成しない。しかも表示上は合計にしたい。
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

            // shoppingデータの合計金額
            const sumShoppingData = getSumShopping(shoppingData, filterYYYY+"-"+filterMM);

            // shopping一つ一つのデータと合計金額を合わせた配列を作る
            shoppingData.push(sumShoppingData)

            // domにデータを反映
            setShoppingAll(shoppingData)

            // 合計値について、とりあえず表示だけはできたので、dateが適切に切り替わるようにする。
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