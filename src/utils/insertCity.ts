import { client } from '../database/mongodb_connect';

export async function insertCity(cityName: any, cityCode: any) {
    try {
        await client.connect();
        await client.db('admin').command({ ping: 1 });

        await client
            .db('test')
            .collection('citycodes')
			.insertOne({ name: cityName, IATA: cityCode });
		return {message:`City ${cityName} inserted into the database successfully`}
    } catch (error) {
        console.error(`Inserting Error : ${error}`);
    } finally {
        await client.close();
    }
}
