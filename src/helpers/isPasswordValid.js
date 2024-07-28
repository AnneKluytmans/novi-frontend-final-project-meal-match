function isPasswordValid(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+><])[A-Za-z\d@$!%*?&#+><]{8,}$/;
    return re.test(password) || "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character (@$!%*?&#+><), and be at least 8 characters long";
}

export default isPasswordValid;