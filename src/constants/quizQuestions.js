// Array with the questions of Meal Match's recipe quiz
const quizQuestions = [
    {
        question: "What's the occasion for your culinary journey today?",
        param: "dishType",
        answerOptions: [
            {
                value: ["Bread", "Cereals", "Pancake"],
                title: "Sunrise breakfast escapade 🥐",
                subtitle: "Rise and shine in a relaxing sunny breakfast paradise"
            },
            {
                value: ["Biscuits and cookies", "Drinks", "Side dish", "Starter"],
                title: "Delightful snack stopover 🍿",
                subtitle: "Make a pit stop for delightful snacks that’ll keep you smiling all day long"
            },
            {
                value: ["Salad", "Sandwiches", "Side dish", "Preserve"],
                title: "Picnic lunch adventure 🥪",
                subtitle: "Pack your bags for a fresh and fabulous dish, perfect for a midday escape"
            },
            {
                value: ["Biscuits and cookies", "Sweets", "Desserts", "Pancake"],
                title: "Sweet dessert wonderland 🍰",
                subtitle: "Step into a whimsical world full of sugary delights"
            },
            {
                value: ["Main course", "Condiments and sauces"],
                title: "Main dish expedition 🍝",
                subtitle: "Embark on a bold adventure with a main dish that’ll satisfy any explorer"
            },
            {
                value: ["Salad", "Side dish", "Soup", "Starter"],
                title: "Tasting platter tour 🥟",
                subtitle: "Take a flavorful journey with small plates perfect for starters and sharing"
            },
        ]
    },
    {
        question: "If your taste buds could travel, where would they go?",
        param: "cuisineType",
        answerOptions: [
            {
                value: "Mediterranean",
                title: "A Mediterranean escape 🍝",
                subtitle: "Longing for Mediterranean flavors like Greek or Italian"
            },
            {
                value: "Mexican",
                title: "A fiesta of Mexican flavors 🌮",
                subtitle: "Craving bold Mexican dishes with spicy flavors"
            },
            {
                value: "Asian",
                title: "A taste of Asian fusion 🍣",
                subtitle: "Exploring a mix of Asian cuisines like Japanese, Chinese, or Thai"
            },
            {
                value: "Middle Eastern",
                title: "A Middle Eastern feast 🥘",
                subtitle: "Interested in Middle Eastern dishes like Lebanese or Moroccan"
            },
            {
                value: "American",
                title: "Craving American comfort 🍔",
                subtitle: "Wanting hearty American classics like bagels or burgers"
            },
            {
                value: null,
                title: "Surprise me 🌍",
                subtitle: "Open to any cuisine, surprise me with a delicious recipe"
            },
        ]
    },
    {
        question: "What's your culinary mood tonight?",
        param: "calories",
        answerOptions: [
            {
                value: "300-1500",
                title: "Craving comfort and warmth 🧸",
                subtitle: "I need a warm, comforting dish that feels like a cozy hug to lift my spirits"
            },
            {
                value: "400-800",
                title: "In the mood for family and fun 👭",
                subtitle: "Looking forward to a family-friendly meal that brings joy to the table"
            },
            {
                value: "1-1000",
                title: "Ready for adventure 🚀",
                subtitle: "I'm ready to explore bold new flavors and spicy delights"
            },
            {
                value: "400-1000",
                title: "It’s party time 🎉",
                subtitle: "I need fun, shareable dishes to get everyone in a party vibe"
            },
            {
                value: "100-400",
                title: "Very busy and on-the-go ⚡",
                subtitle: "With a packed schedule, I need a quick, energizing dish to keep me going"
            },
            {
                value: "200-800",
                title: "Romantic date night 🌹",
                subtitle: "Looking for elegant, romantic dishes to make the night unforgettable"
            },
        ]
    },
    {
        question: "Which quirky ingredient would you skip?",
        param: "excluded",
        answerOptions: [
            {
                value: "olive",
                title: "Olives 🫒",
                subtitle: "Avoid the olive orchestra, no surprise serenades with every bite"
            },
            {
                value: "banana",
                title: "Banana 🍌",
                subtitle: "Skip bananas, no slippery slides on my plate"
            },
            {
                value: "garlic",
                title: "Garlic 🧄",
                subtitle: "Leaf the garlic out, we're saying no to breath that could clear a room"
            },
            {
                value: "peanut butter",
                title: "Peanut butter 🥜",
                subtitle: "Avoid peanut butter, those sticky situations could leave us in a nutty mess"
            },
            {
                value: "chili pepper",
                title: "Chili pepper 🌶️",
                subtitle: "Bypass the chili pepper calamity, keeping the heat levels just right"
            },
            {
                value: null,
                title: "Adventurous appetite 🚀",
                subtitle: "No limits, from anchovies to licorice, bring on the wild culinary journey"
            },
        ]
    },
    {
        question: "What music genre best fits your cooking style?",
        param: "time",
        answerOptions: [
            {
                value: "30-60",
                title: "Jazz & Jams 🎷",
                subtitle: "Smooth and spontaneous, suited for a cook between 30 and 60 minutes"
            },
            {
                value: "1-15",
                title: "Techno Tempo ⚡",
                subtitle: "Fast-paced beats, just right for real quick recipes"
            },
            {
                value: "45-120",
                title: "Classical Crescendo 🎻",
                subtitle: "A classical tune for a long and leisurely cooking session"
            },
            {
                value: "15-45",
                title: "Pop Perfection 🎤",
                subtitle: "Catchy and reliable, perfect for a mid-length cook"
            },
            {
                value: "1-30",
                title: "Rock 'n' Roll Rhythm 🎸",
                subtitle: "Bold and energetic, ideal for meals cooked within 30 minutes"
            },
            {
                value: "1-120",
                title: "Reggae Relaxation 🌴",
                subtitle: "Chill and laid-back, great for any cooking time"
            },
        ]
    },
    {
        question: "What matches your dietary parameter today?",
        param: "health",
        answerOptions: [
            {
                value: null,
                title: "No limits, anything goes 🌈",
                subtitle: "From sushi to decadent pasta, explore without boundaries"
            },
            {
                value: "pescatarian",
                title: "Pescatarian exploration 🐠",
                subtitle: "From salmon fillet to shrimp, let your taste buds dance"
            },
            {
                value: ["vegetarian", "vegan"],
                title: "Plant-powered paradise 🌿",
                subtitle: "From buddha bowls to veggie burgers, nature's flavors take center stage"
            },
            {
                value: ["gluten-free", "dairy-free", "tree-nut-free", "peanut-free"],
                title: "Allergy-free heaven 🤧",
                subtitle: "Gluten-free pasta to dairy-free desserts, enjoy allergy-free"
            },
            {
                value: "low-sugar",
                title: "Calorie-conscious wonderland ☁️",
                subtitle: "From vibrant salads to wholesome, light and delicious bowls"
            },
            {
                value: "paleo",
                title: "Protein-packed Oasis 🏋️‍♂️",
                subtitle: "From steaks to powerpacked smoothies, indulge in high-protein meals"
            },
        ]
    },
];

export default quizQuestions;