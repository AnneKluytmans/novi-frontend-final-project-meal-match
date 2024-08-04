function abbreviateIngredientUnit(unit) {
    switch (unit) {
        case 'tablespoon':
        case 'tablespoons':
            return 'tbsp';
        case 'teaspoon':
        case 'teaspoons':
            return 'tsp';
        case 'ounce':
        case 'ounces':
            return 'oz';
        case 'pound':
        case 'pounds':
            return 'lb';
        case 'gram':
        case 'grams':
            return 'g';
        case 'kilogram':
        case 'kilograms':
            return 'kg';
        case 'milliliter':
        case 'milliliters':
            return 'ml';
        case 'liter':
        case 'liters':
            return 'l';
        default:
            return unit;
    }
}

export default abbreviateIngredientUnit;