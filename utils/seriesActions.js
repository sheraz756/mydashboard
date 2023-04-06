import axios from "axios";
import baseUrl from "./baseUrl";
import cookie from "js-cookie";
import catchErrors from '../utils/catchErrors';




const Axios = axios.create({
    baseURL: `${baseUrl}/series`,
    headers: { Authorization: cookie.get('token') }
});


export const deleteSeries = async (id, setShowToster, router) => {
    try {
        await Axios.delete(`/${id}`);
        setShowToster(true);
        router.reload();
    } catch (error) {
        alert(catchErrors(error));
    }
}


export const updateSeries = async (seriesData, id, setShowToster, router) => {
    try {
        await Axios.put(`/${id}`, { seriesData });
        setShowToster(true);
        router.push('/series');
    } catch (error) {
        alert(catchErrors(error));
    }
}