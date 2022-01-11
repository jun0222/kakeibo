import axios from "axios";
import { useEffect, useState } from "react";
import Moment from 'moment';

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

    return (
        <>
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