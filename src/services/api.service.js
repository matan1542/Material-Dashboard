const axios = require("axios").default;

export const apiService = {
    getStock
}

async function getStock() {
    const url = 'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2020-06-01/2020-06-17?apiKey=v4oMLDDoJQ0T4x7OdWE48io87E6NzUwV';
    try {
        const res = await axios.get(url)
        return res.data.results
    }
    catch(err){
        console.error(err,'Error at api rapid');
    }
}
