import { client } from "../database/mongodb_connect";

export async function getCityData(cityName: any) {
  try {
    await client.connect();
	await client.db("admin").command({ ping: 1 });

	console.log('connected')

    const cityData = await client.db("test").collection("citycodes").findOne({ name: cityName });
	if(cityData == null){
		return cityData
	}else{
		return {message: `${cityName} not found`}	
	}
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
	console.log('disconnected')
  }
}