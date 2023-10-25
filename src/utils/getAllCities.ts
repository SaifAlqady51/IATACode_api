import { client, run, disconnect } from '../database/mongodb_connect';

export async function getAllCities(city:any) {
    try {
        await run();

        const allCities = await client
            .db('test')
			.collection('citycodes').findOne({name:city});

        return allCities;
    } catch (error) {
        console.error(error);
    } finally {
        await disconnect();
    }
}
