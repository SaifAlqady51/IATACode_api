import express, { Request, Response, Application } from 'express';
import helmet from 'helmet';
import { citiesList } from './TopThousandCity';
import {getAllCities} from './utils/getAllCities';
import { getCityData } from './utils/getCityData';
import getIATACityCode from './utils/getIATACityCode';
import { insertCity } from './utils/insertCity';
import cors from 'cors';

const listOfCities = citiesList.slice(900, 1000);
const app: Application = express();
app.use(helmet());
app.use(express.json())
app.use(cors({origin: '*'}))

app.get('/', (_req: Request, res: Response) => {
    res.json({ message: 'hello world' });
});

let modifiedList:string[] = []

app.get('/get/all', async(_req:Request,res:Response) => {
	for(let city of listOfCities){
		const existedcity = await getAllCities(city)
		if(existedcity !== null){
			modifiedList.push(existedcity?.name)
			console.log(`adding city ${city} to modifiedList`)
			console.log(modifiedList)
		}
		else{
			console.log(`city ${city} does not exist in database`)

		}
	}
	res.send('don')
})

// get city IATA code from database
app.get('/get', async (req: Request, res: Response) => {
    const { cityName } = req.query;
    if (cityName) {
        const city = await getCityData(cityName);
        if (city) {
            res.json(city);
        }
    } else {
        res.json({
            message:
                'make sure that your url is in the form of get/?cityName={cityname}',
        });
    }
});

app.post('/upload', async (_req: Request, _res: Response) => {
    for (let cityName of listOfCities) {
        const cityCode = await getIATACityCode(cityName);
        if (cityCode) {
            await insertCity(cityName, cityCode);
            console.log(`city ${cityName} inserted into database`);
        } else {
            console.log(`city code for ${cityName} not available`);
        }
    }
});
app.post('/upload/single', async (req: Request, res: Response) => {
    const { cityName, cityCode } = req.query;
    if (cityName && cityCode) {
        await insertCity(cityName, cityCode);
    } else {
        res.send(
            'make sure that the url in this form => /upload/single/?cityName={}&cityCode={}',
        );
    }
});

let port: number = 5555;

app.listen(port, () => {
    console.log(`connected successfully to ${port}`);
});

export default app;
