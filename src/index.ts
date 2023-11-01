import express, { Request, Response, Application } from 'express';
import helmet from 'helmet';
import { getCityIATACode, getCityName } from './utils/getCityData';
import { insertCity } from './utils/insertCity';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config()

const app: Application = express();
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/', (_req: Request, res: Response) => {
    res.json({ message: 'hello world' });
});

// get city IATA code from database
app.get('/get', async (req: Request, res: Response) => {
    const { cityName, cityCode } = req.query;
    if (cityCode) {
        const cityData = await getCityName(cityCode);
        if (cityData) {
            res.json(cityData);
        }
    }
    if (cityName) {
        const cityData = await getCityIATACode(cityName);
        if (cityData) {
            res.json(cityData);
        }
    } else if (!cityCode && !cityName) {
        res.json({
            message:
                'make sure that your url is in the form of get/?cityName={cityname} or get/?IATACode={IATA}',
        });
    }
    res.end();
});

app.post('/upload', async (req: Request, res: Response) => {
    const { cityName, cityCode, api_key } = req.query;
	console.log(process.env.API_KEY)
    if (api_key === process.env.API_KEY) {
        if (cityName && cityCode) {
			const insertedCity = await insertCity(cityName, cityCode);
			res.json(insertedCity)
        } else {
            res.json({
                message:
                    'make sure that the url in this form => /upload/single/?cityName={}&cityCode={}'
            });
        }
    } else {
        res.json({ message: 'you are not allowed to upload without api_key' });
    }
});

let port: number = 5555;

app.listen(port, () => {
    console.log(`connected successfully to ${port}`);
});

export default app;
