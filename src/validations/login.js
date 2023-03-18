export const emailValidation = (data) => {
    console.log(data)
    let errors = {};
    if (!data?.email) {
        errors.email = "Email is required"
    }
    else if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email)) {
        errors.email = 'Please Enter valid email'
    }
    return errors;
}