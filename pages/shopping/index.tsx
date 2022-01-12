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
} from 'chart.js'

import { Line } from 'react-chartjs-2'  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
export default () => {
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

    const labels = ["1 月", "2 月", "3 月", "4 月", "5 月", "6 月"];
    const graphData = {
        labels: labels,
        datasets: [
            {
            label: "A社",
            data: [65, 59, 60, 81, 56, 55],
            borderColor: "rgb(75, 192, 192)",
            },
            {
            label: "B社",
            data: [60, 55, 57, 61, 75, 50],
            borderColor: "rgb(75, 100, 192)",
            },
        ],
    };
    
    const options: {} = {
        maintainAspectRatio: false,
    };
    
    const divStyle: React.CSSProperties = {
        marginLeft: "auto",
        marginRight: "auto",
        margin: "10px",
        width: "500px",
    };

    return (
        <>
            <div className="App" style={divStyle}>
                <Line
                    height={300}
                    width={300}
                    data={graphData}
                    options={options}
                    id="chart-key"
                />
            </div>
            <select
                value={filterYYYY}
                onChange={(e) => {setFilterYYYY(e.target.value)}}
            >
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
            </select>

            <select
                value={filterMM}
                onChange={(e) => {setFilterMM(e.target.value)}}
            >
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
            </select>

            {shoppingAll.map(shopping => {
                return(
                    <>
                        { filterYYYYMM === Moment(shopping.date).format('YYYY-MM') && <div key={shopping.id}>{Moment(shopping.date).format('YYYY-MM-DD')}, {shopping.price}, {shopping.product}, {shopping.shop}</div>}
                    </>
                )
            })}
        </>
    )
}