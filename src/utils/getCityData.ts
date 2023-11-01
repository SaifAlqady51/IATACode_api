import { client, run, disconnect } from '../database/mongodb_connect';

export async function getCityIATACode(cityName: any) {
    try {
        // start mongodb connection
        await run();

        const cityData = await client
            .db('test')
            .collection('citycodes')
            .findOne({ name: cityName });
        if (cityData == null) {
            return { message: `${cityName} not found` };
        } else {
            return { cityName: cityData.name, IATA: cityData.IATA };
        }
    } catch (error) {
        console.error(error);
    } finally {
        // end mongodb connectiong
        await disconnect();
    }
}

export async function getCityName(cityCode: any) {
    try {
        // start mongodb connection
        await run();

        const cityData = await client
            .db('test')
            .collection('citycodes')
            .findOne({ IATA: cityCode });
        if (cityData == null) {
            return { message: `${cityCode} not found` };
        } else {
            return { cityName: cityData.name, IATA: cityData.IATA };
        }
    } catch (error) {
        console.error(error);
    } finally {
        // end mongodb connectiong
        await disconnect();
    }
}
