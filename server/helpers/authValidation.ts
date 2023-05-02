const validEmail = (email: string) => {
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    return isValidEmail;
}
const validPassword = (password: string) => {
    const isValidPassword = /^(?=.*\w).{6,60}$/.test(password);
    return isValidPassword;
}
const validName = (name: string) => {
    const isValidName = /^[a-zA-Z0-9_-]{3,20}$/.test(name);
    return isValidName;
}

export {
    validEmail,
    validPassword,
    validName
}