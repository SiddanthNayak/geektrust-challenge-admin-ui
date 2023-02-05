import axios from "axios";
import { BASE_URL, STATUS_SUCCESS } from "./Constants";

export const getUser = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/adminui-problem/members.json`)
        if (response.status === STATUS_SUCCESS) {
            return response.data
        }
    }
    catch (error) {
        return error
    }
}