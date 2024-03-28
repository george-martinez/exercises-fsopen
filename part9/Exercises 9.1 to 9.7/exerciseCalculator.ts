import isNotNumber from "./utils/isNotNumber";

interface Result { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}

interface ArgumentValues {
    parsedTrainingHours: number[],
    parsedTargetHour: number,
}

const parseArguments = (args: string[]): ArgumentValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    let parsedTrainingHours: number[] = []
    let parsedTargetHour: number
    
    if(isNotNumber(args[2])) {
        throw new Error('Provided values must be numbers.');
    } else {
        parsedTargetHour = Number(args[2])
    }


    for(let i = 3; i < args.length; i++) {
        if(isNotNumber(args[i])) {
            throw new Error('Provided values must be numbers.');
        } else {
            parsedTrainingHours.push(Number(args[i]))
        }
    }

    return {
        parsedTrainingHours,
        parsedTargetHour
    }
}

function calculateRating(targetHours: number, hoursMet: number): number {
    const percentageMet: number = (hoursMet / targetHours) * 100;
    const limit1: number = 85;
    const limit2: number = 97;

    if (percentageMet < limit1) {
        return 1; // Rating 1: Poor
    } else if (percentageMet < limit2) {
        return 2; // Rating 2: Fair
    } else {
        return 3; // Rating 3: Good
    }
}

const getRatingDescription = (rating: number) : string => {
    let ratingDescription: string;

    switch (rating) {
        case 1: ratingDescription = 'too bad';
            break;
        case 2: ratingDescription = 'not too bad, keep training';
            break;
        case 3: ratingDescription = 'good! You met the target. Keep doing it like that';
            break;
        default: ratingDescription = 'rating out of range';
            break;
    }

    return ratingDescription;
}


function calculateExercises (hoursArr: number[], target: number): Result {
    const periodLength = hoursArr.length;

    const trainingDays = hoursArr.filter(hour => hour > 0).length;

    const totalTrainingHours = hoursArr.reduce((a, b) => a + b, 0);
    
    const average = totalTrainingHours / periodLength;
    
    const success = (target - average) < 0;

    const rating = calculateRating(target, average);

    const ratingDescription = getRatingDescription(rating);

    const result = {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }

    return result;
}

try {
    const { parsedTrainingHours, parsedTargetHour } = parseArguments(process.argv);
    const result = calculateExercises(parsedTrainingHours, parsedTargetHour);
    console.log(result)
  } catch (error: unknown) {
        let errorMessage = 'Something bad happened.'
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

export default {}