import isNotNumber from './utils/isNotNumber';

interface ArgumentValues {
    value1: number,
    value2: number,
}


const parseArguments = (args: string[]): ArgumentValues => {
	if (args.length < 3) throw new Error('Not enough arguments');
	if (args.length > 4) throw new Error('Too many arguments');
    

	if (isNotNumber(args[2]) || isNotNumber(args[3])) {
		throw new Error('Provided values were not numbers!');
	} else {
		return {
			value1: Number(args[2]),
			value2: Number(args[3])
		};
	}
};

const calculateBmi = (height: number, weight: number): string => {
	const bmi = weight / (Math.pow(height/100,2));

	let text: string;

	if(bmi < 18.5){
		text = 'Underweigth';
	} else if (bmi < 24.9) {
		text = 'Normal (healthy weight)';
	} else if (bmi < 29.9) {
		text = 'Overweight';
	} else {
		text = 'Obese';
	}

	return text;
};

const bmiCalculatorCLI = () => {
	try {
		const { value1, value2 } = parseArguments(process.argv);
		const result = calculateBmi(value1, value2);
		console.log(result);
	} catch (error: unknown) {
		let errorMessage = 'Something bad happened.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		console.log(errorMessage);
	}
};

const bmiCalculator = (height: number, weight: number) => {
	try {
		const result = calculateBmi(height, weight);
		return result;
	} catch (error: unknown) {
		let errorMessage = 'Something bad happened.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		return errorMessage;
	}
};

if(process.argv.length > 2) {
	console.log('Executing CLI Bmi calculator.');
	bmiCalculatorCLI;
}

export default bmiCalculator;