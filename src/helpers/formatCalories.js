function formatCalories(calories) {
    const roundedCalories = Math.round(calories);
    return `${roundedCalories} kCal`;
}

export default formatCalories;