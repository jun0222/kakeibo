import axios from "axios";
import { useEffect, useState } from "react";
import Moment from 'moment';

export default () => {
    const [shoppingAll, setShoppingAll] = useState([]);
    Moment.locale('ja');

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('/api/shopping');
            setShoppingAll(response.data);
            return response;
        }
        fetchData();
    },[])

    return (
        <>
            <div>
                {
                    shoppingAll.map(shopping => {
                        return(
                            <div key={shopping.id}>{Moment(shopping.date).format('YYYY-MM-DD')}, {shopping.price}, {shopping.product}, {shopping.shop}</div>
                        )
                    })
                }
            </div>
        </>
    )
}