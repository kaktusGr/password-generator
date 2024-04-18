const resultEl = document.getElementById('result');
const clipboardEl = document.getElementById('clipboard');
const generateEl = document.getElementById('generate');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol,
}

generateEl.addEventListener('click', () => {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;

	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
})

function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

	if (typesArr.length === 0) {
		return '';
	}

	for (let i = 0; i < length; i++) {
		let symbolSetI = Math.floor(Math.random() * typesArr.length);
		const funcName = Object.keys(typesArr[symbolSetI])[0];
		generatedPassword += randomFunc[funcName]();
	}

	const finalPassword = generatedPassword.slice(0, length);
	return finalPassword;
}

clipboardEl.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultEl.innerText;

	if (!password) { return };

	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();

	navigator.clipboard.writeText(password);

	textarea.remove();
	alert('Password copied to clipboard!');
})

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.';
	return symbols[Math.floor(Math.random() * symbols.length)];
}
