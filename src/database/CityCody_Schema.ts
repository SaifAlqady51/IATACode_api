import mongoose, {InferSchemaType} from 'mongoose';

const CityCodeSchema = new mongoose.Schema({
	name: {type: String,unique:true},
	IATA: {type: String, unique:true}
})


type CityCode = InferSchemaType<typeof CityCodeSchema>
export const CityCodeModel = mongoose.model<CityCode>("cityCode", CityCodeSchema)
