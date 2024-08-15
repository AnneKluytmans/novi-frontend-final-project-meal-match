function isQueryValid(query) {
    const re = /^(?!,)(?!.*,,)[a-zA-Z\s]+(,[a-zA-Z\s]+)*$/;
    return re.test(query.trim()) || "Input may only contain letters, commas, and spaces. " +
        "Avoid multiple commas, commas at the start/end, or empty ingredients.";
}

export default isQueryValid;