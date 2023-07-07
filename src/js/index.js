import Utils from './utils.js';
import API from './api.js';

const fromCurrencyOptions = document.querySelector('.from-currency select');
const toCurrencyOptions = document.querySelector('.to-currency select');
const fromAmount = document.querySelector('.from-amount input');
const fromResult = document.getElementById('from-result');
const toResult = document.getElementById('to-result');
const convertBtn = document.getElementById('convert-btn');
const swapBtn = document.getElementById('swap-btn');

class Converter {
    static async loadCountrySymbols() {
        const symbols = await API.fetchSymbols();
        Converter.showData(symbols);
    }

    static showData(symbols) {
        const symbolsOnly = Object.keys(symbols);
        let html = "";
        symbolsOnly.forEach(symbol => {
            html += `<option data-id="${symbol}"> ${symbol} </option>`;
        });

        fromCurrencyOptions.innerHTML = html;
        fromCurrencyOptions.querySelectorAll('option').forEach(option => {
            if (option.dataset.id == "USD") option.selected = 'selected';
        });

        toCurrencyOptions.innerHTML = html;
        toCurrencyOptions.querySelectorAll('option').forEach(option => {
            if (option.dataset.id == "EUR") option.selected = 'selected';
        });
    }

    static getConvertedData(from, to, amount) {
        API.convertCurrency(from, to, amount)
            .then(result => {
                Converter.displayConvertedData(from, to, amount, result);
            })
            .catch(error => {
                console.error(error);
            });
    }

    static displayConvertedData(fromCurrency, toCurrency, fromAmt, toAmt) {
        fromResult.innerHTML = `${fromAmt.toFixed(2)} ${fromCurrency}`;
        toResult.innerHTML = `${toAmt.toFixed(2)} ${toCurrency}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    Converter.loadCountrySymbols();
});

fromAmount.addEventListener('keyup', function() {
    Utils.validateAmount(this);
});

convertBtn.addEventListener('click', () => {
    const fromCurrency = fromCurrencyOptions.value;
    const toCurrency = toCurrencyOptions.value;
    const fromAmt = Number(fromAmount.value);
    if (fromAmt) {
        Converter.getConvertedData(fromCurrency, toCurrency, fromAmt);
    }
});

swapBtn.addEventListener('click', () => {
    const fromIndex = fromCurrencyOptions.selectedIndex;
    const toIndex = toCurrencyOptions.selectedIndex;
    fromCurrencyOptions.querySelectorAll('option')[toIndex].selected = 'selected';
    toCurrencyOptions.querySelectorAll('option')[fromIndex];
});