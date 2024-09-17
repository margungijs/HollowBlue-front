export const noSymbol = (input) => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/g;
    return regex.test(input);
}

export const lengthCheck = (input) => {
    return input.length < 8;
}

export const emailCheck = (input) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return !regex.test(input)
}

export const passwords = (password, confirm) => {
    return password === confirm;
}

export const empty = (input) => {
    return input.trim() === "";
};

export const touched = (input, error) => {
    for (const key in input) {
        if (Object.hasOwnProperty.call(input, key)) {
            if(input[key] === ""){
                error[key] = "Field cannot be empty"
            }
        }
    }
}

export const errorCheck = (input) => {
    const errorValues = [];
    for (const key in input) {
        if (Object.hasOwnProperty.call(input, key)) {
            errorValues.push(input[key] !== "");
        }
    }
    return errorValues.includes(true);
};
