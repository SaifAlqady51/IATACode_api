# API description

this api takes city name that containing airport and returns the IATA code for it

# how to use

Go to [https://iata-code-api.vercel.app](https://iata-code-api.vercel.app)

## Routes

### Getting city code form city Name

To get cityName form IATA code type path:
[https://iata-code-api.vercel.app/get?cityName={cityName}](https://iata-code-api.vercel.app/get?cityName={cityName})

Exapmle: [https://iata-code-api.vercel.app/get?cityName=Cairo](https://iata-code-api.vercel.app/get?cityName=Cairo)
### Getting city name from city code

To get IATA code from city Name type path: 
[https://iata-code-api.vercel.app/get?cityCode={cityCode}](https://iata-code-api.vercel.app/get?cityCode={cityCoded})

Example: 
[https://iata-code-api.vercel.app/get?cityCode=CAI](https://iata-code-api.vercel.app/get?cityCode={CAI})

### Adding data to database

To add data to database you have to type path in `POST` method: 

[https://iata-code-api.vercel.app/upload?cityName={cityName}&cityCode={cityCode}&api_key={api_key}](https://iata-code-api.vercel.app/upload?cityname={cityname}&cityCode={cityCode}&api_key={api_key})

Unfortunately, you cannot add data without api_key 
