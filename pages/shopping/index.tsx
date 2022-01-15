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

    useEffect(() => {
        // 買い物データ取得
        async function fetchData() {
            const response = await axios.get('/api/shopping');
            setShoppingAll(response.data);
            return response;
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
    const divStyle: React.CSSProperties = {
        margin: "10px auto",
        width: "500px",
    };
    const shoppingFieldStyle: React.CSSProperties = {
        margin: "10px auto",
        width: "800px",
    };


    return (
        <>
            <div className="container mx-auto">
                <div className="App" style={divStyle}>
                    <Pie data={data} />
                </div>
                <div>
                    <div className="w-3/4 mx-auto">
                        <div className="text-right">
                            <select
                                value={filterYYYY}
                                onChange={(e) => {setFilterYYYY(e.target.value)}}
                                className="w-1/4 p-4"
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
                                className="w-1/4 p-4"
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
                            <th className="border border-gray-500 w-1/4 px-4 py-2">日付</th>
                            <th className="border border-gray-500 w-1/4 px-4 py-2">金額</th>
                            <th className="border border-gray-500 w-1/4 px-4 py-2">品名</th>
                            <th className="border border-gray-500 w-1/4 px-4 py-2">店舗</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shoppingAll.map(shopping => {
                                return(
                                    <>
                                        { filterYYYYMM === Moment(shopping.date).format('YYYY-MM') &&
                                        <tr key={shopping.id}>
                                            <td className="border border-gray-500 px-4 py-2">{Moment(shopping.date).format('YYYY-MM-DD')}</td>
                                            <td className="border border-gray-500 px-4 py-2">{shopping.price}</td>
                                            <td className="border border-gray-500 px-4 py-2">{shopping.product}</td>
                                            <td className="border border-gray-500 px-4 py-2">{shopping.shop}</td>
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