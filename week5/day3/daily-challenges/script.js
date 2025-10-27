const form = document.querySelector("#converter-form");
const fromCurrencySelect = document.querySelector("#from-currency");
const toCurrencySelect = document.querySelector("#to-currency");
const amountInput = document.querySelector("#amount");
const resultDisplay = document.querySelector("#result");
const switchBtn = document.querySelector("#switch-button");
let apiKey = "b63a739cfcf8cbda17b8ee8c";

const getCurrencies = async () => {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/codes`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.supported_codes;
  } catch (error) {
    console.log("Error fetching currency codes:", error);
    return [];
  }
};

const populateCurrencyDropdowns = async () => {
  const currencies = await getCurrencies();

  currencies.forEach(([code, name]) => {
    const option1 = document.createElement("option");
    option1.value = code;
    option1.textContent = `${code} - ${name}`;
    fromCurrencySelect.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = code;
    option2.textContent = `${code} - ${name}`;
    toCurrencySelect.appendChild(option2);
  });
};

const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.conversion_result;
  } catch (error) {
    console.log("Error fetching exchange rates:", error);
    return 0;
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const amount = parseFloat(amountInput.value);
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;

  if (!amount || !fromCurrency || !toCurrency) {
    alert("Please fill in all fields.");
    return;
  }

  resultDisplay.textContent = "Converting...";

  const result = await convertCurrency(amount, fromCurrency, toCurrency);
  resultDisplay.textContent = `${result.toFixed(2)} ${toCurrency}`;
});

populateCurrencyDropdowns();


switchBtn.addEventListener("click", async () => {
  const fromValue = fromCurrencySelect.value;
  fromCurrencySelect.value = toCurrencySelect.value;
  toCurrencySelect.value = fromValue;

  const amount = parseFloat(amountInput.value);
  if (!amount || !fromCurrencySelect.value || !toCurrencySelect.value) {
    return;
  }

  resultDisplay.textContent = "Converting...";
  const result = await convertCurrency(
    amount,
    fromCurrencySelect.value,
    toCurrencySelect.value
  );
  resultDisplay.textContent = `${result.toFixed(2)} ${toCurrencySelect.value}`;
});
