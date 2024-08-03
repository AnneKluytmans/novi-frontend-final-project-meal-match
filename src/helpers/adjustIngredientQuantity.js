function adjustIngredientQuantity(quantity, count, initialServings = 2) {
    const adjustedIngredientQuantity = (quantity * count) / initialServings;
    return Math.round(adjustedIngredientQuantity * 4) / 4; // Round to the nearest 0.25
}

export default adjustIngredientQuantity;