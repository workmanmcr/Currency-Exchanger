const API = {
    async fetchSymbols() {
        const API_URL = 'https://v6.exchangerate-api.com/v6/3033852632d029f7d83d1b00/latest/USD';
        const result = await fetch(API_URL);
        if (result.status !== 200) {
            return {};
        }
        const data = await result.json();
        return data.conversion_rates;
    },

    async convertCurrency(from, to, amount) {
        const API_URL = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
        const result = await fetch(API_URL);
        const data = await result.json();
        return data.result;
    },
};



export default API;