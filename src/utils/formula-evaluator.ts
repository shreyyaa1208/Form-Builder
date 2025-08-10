// src/utils/formula-evaluator.ts

export const evaluateFormula = (formula: string, formData: any): any => {
    if (!formula) {
        return '';
    }

    // Replace field names (like 'firstName') in the formula with their values from formData
    let evaluatedFormula = formula;
    for (const key in formData) {
        if (Object.prototype.hasOwnProperty.call(formData, key)) {
            // Use a regex to replace whole word matches, ensuring we don't replace parts of other field names
            const regex = new RegExp(`'${key}'`, 'g');
            const value = formData[key] !== undefined ? formData[key] : '';
            evaluatedFormula = evaluatedFormula.replace(regex, `'${value}'`);
        }
    }

    // Try to use a safe eval to calculate the result
    try {
        // This simple approach supports string concatenation and basic arithmetic
        // E.g., "'Hello ' + 'World'" or "10 + 5"
        // Note: The formula string must have quotes around field names/strings for this to work
        return eval(evaluatedFormula);
    } catch (e) {
        console.error("Error evaluating derived formula:", e);
        return 'Error';
    }
};