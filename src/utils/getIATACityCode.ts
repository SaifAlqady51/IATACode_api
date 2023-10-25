import axios from 'axios';

const getIATACityCode = async (city: string) => {
    try {
        const URL = `https://airlabs.co/api/v9/suggest?q=${city}&api_key=0fd37a08-93d3-42b4-854f-756d93c86488`;
        const IATACodeResponse = await axios.get(URL);
        const cityCode = IATACodeResponse.data.response.cities[0].city_code;
        return cityCode;
    } catch (error) {
        console.error(error);
    }
};

export default getIATACityCode;
