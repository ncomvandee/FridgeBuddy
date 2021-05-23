db = db.getSiblingDB('fridge')
db.createCollection('users')
usersCollection = db.getCollection("users")
usersCollection.remove({})
usersCollection.insert(
{
	userId: "apple123",
	password: "test123.",
	email: "apple123@gmail.com",
	firstName: "Ruifeng",
	lastName: "Wang",
	isPremium: false,
	favoriteList: ["1", "3"],
	recentlyView: ["1", "3"]
}
)
usersCollection.insert(
{
	userId: "borhans23",
	password: "thinka147!",
	email: "test222@gmail.com",
	firstName: "Sam",
	lastName: "Borhan",
	isPremium: true,
	favoriteList: [],
	recentlyView: ["2"]
}
)
usersCollection.insert(
{
	userId: "ken4747",
	password: "Homeworks54@",
	email: "kentheman@gmail.com",
	firstName: "Ken",
	lastName: "Comvandee",
	isPremium: false,
	favoriteList: [],
	recentlyView: []
}
)
db.createCollection('recipes')
recipesCollection = db.getCollection("recipes")
recipesCollection.remove({})
recipesCollection.insert(
{
	recipeId: "1",
	recipeName: "Egg Scramble",
	description: "Scrumbled scrambled eggs",
	instruction: ["Whisk eggs, salt and pepper in small bowl. Melt butter in non-stick skillet over medium heat.", "Pour in egg mixture and reduce heat to medium-low. As eggs begin to set, gently move spatula across bottom and side of skillet to form large, soft curds.", "Cook until eggs are thickened and no visible liquid egg remains, but the eggs are not dry."],
	ingredientList: ["egg", "salt", "pepper"],
	reviewList: ["1", "2"],
	recipeImage: "https://media.eggs.ca/assets/RecipePhotos/_resampled/FillWyIxMjgwIiwiNzIwIl0/Simple-Scrambled-Eggs.jpg",
	videoLink: "PUP7U5vTMM0",
	avgRate: 4,
	viewers: 57
}
)
recipesCollection.insert(
{
	recipeId: "2",
	recipeName: "Beef Stew",
	description: "Beef taking a shower in a stew",
	instruction: ["Combine the flour and pepper in a bowl, add the beef and toss to coat well. Heat 3 teaspoons of the oil in a large pot. Add the beef a few pieces at a time; do not overcrowd. Cook, turning the pieces until beef is browned on all sides, about 5 minutes per batch; add more oil as needed between batches.", "Remove the beef from the pot and add the vinegar and wine. Cook over medium-high heat, scraping the pan with a wooden spoon to loosen any browned bits. Add the beef, beef broth and bay leaves. Bring to a boil, then reduce to a slow simmer.", "Cover and cook, skimming broth from time to time, until the beef is tender, about 1 1/2 hours. Add the onions and carrots and simmer, covered, for 10 minutes. Add the potatoes and simmer until vegetables are tender, about 30 minutes more. Add broth or water if the stew is dry. Season with salt and pepper to taste. Ladle among 4 bowls and serve."],
	ingredientList: ["flour", "pepper", "beef", "oil", "red wine", "carrot", "potato", "salt"],
	reviewList: ["3"],
	recipeImage: "https://static01.nyt.com/images/2021/01/15/dining/15COOKING-OLD-BEEF-STEW2/15COOKING-OLD-BEEF-STEW2-articleLarge-v2.jpg",
	videoLink: "gg8qQTrb9lk",
	avgRate: 3,
	viewers: 102
}
)
recipesCollection.insert(
{
	recipeId: "3",
	recipeName: "Oven-Baked Salmon",
	description: "Salmon swimming in the oven",
	instruction: ["Preheat the oven to 450 degrees F.", "Season salmon with salt and pepper. Place salmon, skin side down, on a non-stick baking sheet or in a non-stick pan with an oven-proof handle. Bake until salmon is cooked through, about 12 to 15 minutes. Serve with the Toasted Almond Parsley Salad and squash, if desired.", "Mince the shallot and add to a small bowl. Pour the vinegar over the shallots and add a pinch of salt. Let sit for 30 minutes.", "Roughly chop the capers, parsley and almonds and add to the shallots. Add the olive oil, tasting as you go. Mix again and adjust the seasonings."],
	ingredientList: ["Salmon", "Salt", "Pepper"],
	reviewList: [],
	recipeImage: "https://cafedelites.com/wp-content/uploads/2018/03/Sheet-Pan-Baked-Salmon-Potatoes-Asparagus-3.jpg",
	videoLink: "FQQpIUaSqY0",
	avgRate: 5.0,
	viewers: 1
}
)
db.createCollection('reviews')
reviewsCollection = db.getCollection("reviews")
reviewsCollection.remove({})
reviewsCollection.insert(
{
	reviewId: "1",
	comment: "Awesome!!!!",
	writer: "1",
	date: "04-07-2021",
	rate: 4
}
)
reviewsCollection.insert(
{
	reviewId: "2",
	comment: "Bad bad bad. Food for dog",
	writer: "2",
	date: "03-22-2021",
	rate: 1
}
)
reviewsCollection.insert(
{
	reviewId: "3",
	comment: "I want to cook this!!!!",
	writer: "3",
	date: "05-02-2021",
	rate: 5
}
)