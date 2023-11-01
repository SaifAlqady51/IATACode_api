import express, { Request, Response, Application } from 'express';
import helmet from 'helmet';
import { getCityIATACode, getCityName } from './utils/getCityData';
import { insertCity } from './utils/insertCity';
import cors from 'cors';

const app: Application = express();
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/', (_req: Request, res: Response) => {
    res.json({ message: 'hello world' });
});

// get city IATA code from database
app.get('/get', async (req: Request, res: Response) => {
    const { cityName, IATACode } = req.query;
    if (IATACode) {
        const cityData = await getCityName(IATACode);
        if (IATACode) {
            res.json(cityData);
        }
    }
    if (cityName) {
        const cityData = await getCityIATACode(cityName);
        if (cityData) {
            res.json(cityData);
        }
    } else if(!IATACode && !cityName) {
        res.json({
            message:
                'make sure that your url is in the form of get/?cityName={cityname} or get/?IATACode={IATA}',
        });
    }
	res.end()
});

app.post('/upload/single', async (req: Request, res: Response) => {
    const { cityName, cityCode, api_key } = req.query;
    if (api_key !== process.env.API_KEY) {
        if (cityName && cityCode) {
            await insertCity(cityName, cityCode);
        } else {
            res.json({
                message:
                    'make sure that the url in this form => /upload/single/?cityName={}&cityCode={}',
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
