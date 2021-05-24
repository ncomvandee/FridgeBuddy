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

db.createCollection('ingredients')
ingredientsCollection = db.getCollection('ingredients')
ingredientsCollection.remove({})
ingredientsCollection.insert({
	ingredientName: ['Apple', 'Asparagus', 'Appricot',
					 'Beef', 'Broccolli', 'Begel', 'Banana', 'Bread crum', 'Beet root',
					'Carrot', 'Cat fish', 'Coconut', 'Coco powder', 'Chicken breast',
					'Donut',
					'Egg', 'Eggplant', 'Elephant',
					'Fish', 'Frig',
					'Goat Milk',
					'Potato',
					'Shrimp',
					'Water' ]
})




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
	reviewList: ["3", "4", "5", "6", "7", "8", "9", "10"],
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
	avgRate: 5,
	viewers: 1
}
)
recipesCollection.insert(
{
	recipeId: "4",
	recipeName: "Pad Thai",
	description: "Stir-fried rice noodle dish from Thailand",
	instruction: ["In a large pot of salted boiling water, cook noodles until al dente. Drain.", "In a small bowl, whisk together lime juice, brown sugar, fish sauce, soy sauce, and cayenne pepper. Set aside.", "In a large nonstick pan over medium-high heat, heat oil. Add bell pepper and cook until tender, about 4 minutes. Stir in garlic and cook until fragrant, about 1 minute more. Add the shrimp and season with salt and pepper. Cook until pink, about 2 minutes per side.", "Push the shrimp and vegetables to one side of the pan and pour in the egg. Scramble until just set then mix with the shrimp mixture. Add the cooked noodles and toss until combined. Pour in the lime juice mixture and toss until the noodles are coated.", "Garnish with green onions and roasted peanuts before serving."],
	ingredientList: ["Noodle", "Salt", "Shrimp", "Pepper", "Egg"],
	reviewList: ["11", "12", "13", "14"],
	recipeImage: "https://www.feastingathome.com/wp-content/uploads/2016/04/easy-authentic-pad-thai-recipe-100.jpg",
	videoLink: "dBSmCwUXZF0",
	avgRate: 5,
	viewers: 27
}
)
recipesCollection.insert(
{
	recipeId: "5",
	recipeName: "Bibimbap",
	description: "Best Korean rice dish",
	instruction: ["Put every vegetable and rice together", "Put salt, sugar, and gochujang then mix it"],
	ingredientList: ["Salt", "Gochujang", "Sugar", "Rice", "Carrot", "Mung bean sprout"],
	reviewList: ["15", "16", "17"],
	recipeImage: "https://mykoreankitchen.com/wp-content/uploads/2013/07/2-Korean-mixed-riceBibimbap.jpg",
	videoLink: "6QQ67F8y2b8",
	avgRate: 5,
	viewers: 15
}
)
recipesCollection.insert(
{
	recipeId: "6",
	recipeName: "Spaghetti",
	description: "Spaghetti is a long, thin, solid, cylindrical pasta",
	instruction: ["Boil water in a large pot. To make sure pasta doesn’t stick together, use at least 4 quarts of water for every pound of noodles.", "Salt the water with at least a tablespoon—more is fine. The salty water adds flavor to the pasta.", "Add pasta. Pour pasta into boiling water. Don’t break the pasta; it will soften up within 30 seconds and fit into the pot.", "Stir the pasta. As the pasta starts to cook, stir it well with the tongs so the noodles don’t stick to each other (or the pot).", "Test the pasta by tasting it. Follow the cooking time on the package, but always taste pasta before draining to make sure the texture is right. Pasta cooked properly should be al dente—a little chewy.", "Drain the pasta. Drain cooked pasta well in a colander. If serving hot, add sauce right away; if you’re making a pasta salad, run noodles under cold water to stop the cooking."],
	ingredientList: ["Salt", "Noodle", "Tomato Sauce"],
	reviewList: ["18"],
	recipeImage: "https://www.inspiredtaste.net/wp-content/uploads/2019/03/Spaghetti-with-Meat-Sauce-Recipe-3-1200.jpg",
	videoLink: "ErEy38dcCVg",
	avgRate: 5,
	viewers: 15
}
)
recipesCollection.insert(
{
	recipeId: "7",
	recipeName: "Cup Noodle",
	description: "Don't want to cook? Eat cup noodle",
	instruction: ["Boil water", "Put sauce in the noodle", "Pour water and wait for 3 minutes"],
	ingredientList: ["Cup Noodle"],
	reviewList: ["19", "20"],
	recipeImage: "https://mykoreankitchen.com/wp-content/uploads/2007/02/1.-How-to-make-Korean-instant-cup-noodles-500x375.jpg",
	videoLink: "bz0eKxeUH4g",
	avgRate: 3,
	viewers: 120
}
)
recipesCollection.insert(
{
	recipeId: "8",
	recipeName: "Sandwich",
	description: "Enjoy these toasted egg and cress club sandwiches as part of a summer family picnic. Skewer each sandwich with a sandwich pick and serve with crisps",
	instruction: ["Bring a pan of water to the boil and carefully lower in the eggs. Cook for 6 mins, then cool under running water until they can be peeled. Peel the eggs, then leave to cool completely.", "Mash or chop the eggs, then mix with 1½ tbsp mayonnaise and some seasoning, if you like. Toast the bread.", "Lay one slice of bread on a board. Butter it, then spread on three quarters of the egg and scatter over the cress. Add another slice of toast and gently spread on the remaining mayo. Add the tomato or lettuce and ham or cheese (or whichever combination you prefer). Dot the remaining egg over the top, spread gently, then top with the final piece of toast. Cut the crusts off if you like, then gently cut the sandwich into four quarters, being careful not to squash out the egg. Skewer each sandwich with a sandwich pick. Serve with crisps."],
	ingredientList: ["Egg", "Mayonnaise", "Bread", "Cress", "Ham"],
	reviewList: [],
	recipeImage: "https://image.shutterstock.com/image-photo/sandwich-ham-cheese-tomatoes-lettuce-260nw-1027873330.jpg",
	videoLink: "b8d0gpsXzEk",
	avgRate: 3,
	viewers: 44
}
)
recipesCollection.insert(
{
	recipeId: "9",
	recipeName: "Pancakes",
	description: "Learn a skill for life with our foolproof crêpe recipe that ensures perfect pancakes every time – elaborate flip optional",
	instruction: ["Put 100g plain flour, 2 large eggs, 300ml milk, 1 tbsp sunflower or vegetable oil and a pinch of salt into a bowl or large jug, then whisk to a smooth batter.", "Set aside for 30 mins to rest if you have time, or start cooking straight away.", "Set a medium frying pan or crêpe pan over a medium heat and carefully wipe it with some oiled kitchen paper.", "When hot, cook your pancakes for 1 min on each side until golden, keeping them warm in a low oven as you go.", "Serve with lemon wedges and caster sugar, or your favourite filling. Once cold, you can layer the pancakes between baking parchment, then wrap in cling film and freeze for up to 2 months."],
	ingredientList: ["Egg", "Plain Flour", "Milk"],
	reviewList: ["21", "22"],
	recipeImage: "https://images-gmi-pmc.edge-generalmills.com/df109202-f5dd-45a1-99b4-f10939afd509.jpg",
	videoLink: "FLd00Bx4tOk",
	avgRate: 4,
	viewers: 135
}
)
recipesCollection.insert(
{
	recipeId: "10",
	recipeName: "Oven-Fried Chicken Breasts",
	description: "Eat and exercise",
	instruction: ["Gather the ingredients.", "Heat the oven to 400 F/200 C.  Put the butter and olive oil in an 8- or 9-inch square baking pan (or a pan large enough to fit the chicken without crowding); place it in the oven to melt the butter. This should only take 1 to 2 minutes, so watch carefully to make sure it doesn't burn.", "When the butter in the pan is melted and sizzling, remove the pan from the oven.", "When the butter in the pan is melted and sizzling, remove the pan from the oven.", "Sprinkle with salt and freshly ground black pepper.", "Put the flour, garlic powder, and paprika in a bowl or pie plate. Stir to blend thoroughly.", "Dredge the chicken breasts in the flour mixture.", "Arrange them in the hot pan and return the pan to the oven. (Don't forget oven mitts!)", "Bake the chicken for 15 minutes.", "Carefully turn the chicken with a spatula and return to the oven for another 10 to 15 minutes. The chicken should register at least 165 F/73.9 C on a food thermometer in the thickest pieces.", "Serve with your choice of sides and enjoy."],
	ingredientList: ["Butter", "Plain Flour", "Milk", "Chicken Breat", "Salt", "Garlic Powder"],
	reviewList: ["23"],
	recipeImage: "https://www.thespruceeats.com/thmb/cOOUK0Du8cGP8cwmPJRViOCl3R4=/2490x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/simple-oven-fried-garlic-chicken-breasts-3058637-step-11-5c510fa746e0fb00014c39b3.jpg",
	videoLink: "XrIb4fGXRYQ",
	avgRate: 4,
	viewers: 71
}
)
recipesCollection.insert(
{
	recipeId: "11",
	recipeName: "Hot Water",
	description: "Good when you are sick",
	instruction: ["Boild it and drink it"],
	ingredientList: ["water"],
	reviewList: [],
	recipeImage: "https://thumbor.thedailymeal.com/PAHJHRbSHa5048uBChXJ_KECceM=/870x565/https://www.theactivetimes.com/sites/default/files/uploads/0/0-shutterstock_282501269_1.jpg",
	videoLink: "kieGBkOdyMU",
	avgRate: 4,
	viewers: 2020
}
)
recipesCollection.insert(
{
	recipeId: "12",
	recipeName: "Burger",
	description: "The Best Classic Burger Recipe - Perfectly seasoned juicy homemade hamburgers.",
	instruction: ["Preheat the grill to 375 degrees F (medium-high).", "In a large bowl, add the beef. Sprinkle evenly with the Worcestershire sauce, seasoning salt, garlic powder, and pepper. Use your hands to mix the ingredients until they are just combined.", "Divide the meat mixture into fourths. Take 1/4 of the meat mixture and use your hands to press it into the shape of a hamburger patty that is about 3/4 inch thick. Make an indention in the middle of the patty to prevent bulging in the center of the hamburger as it cooks. Repeat with the remaining meat mixture, making 4 hamburgers.", "Place the burgers on the grill. Cook 4-5 minutes on the first side. Flip the burgers over and cook an additional 4-5 minutes, until the burgers have reached the desired doneness.", "If adding cheese, lay a slice of cheese on each burger patty about 1 minute before taking the burgers off the grill, so the cheese has a chance to melt.", "Serve the burgers on hamburger buns with optional hamburger toppings."],
	ingredientList: ["Ground Beef", "Salt", "Pepper", "Cheese", "Bun", "Lettuce", "Tomato", "Onion"],
	reviewList: ["24", "25"],
	recipeImage: "https://www.thewholesomedish.com/wp-content/uploads/2019/04/The-Best-Classic-Hamburgers-2.jpg",
	videoLink: "L6yX6Oxy_J8",
	avgRate: 4,
	viewers: 220
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
reviewsCollection.insert(
{
	reviewId: "4",
	comment: "This is a decent recipe to cook",
	writer: "3",
	date: "05-23-2021",
	rate: 4
}
)
reviewsCollection.insert(
{
	reviewId: "5",
	comment: "This recipe is too difficult to make",
	writer: "1",
	date: "05-18-2021",
	rate: 2
}
)
reviewsCollection.insert(
{
	reviewId: "6",
	comment: "This recipe is horrible...",
	writer: "2",
	date: "05-12-2021",
	rate: 1
}
)
reviewsCollection.insert(
{
	reviewId: "7",
	comment: "Are you a human? You have God's Hand",
	writer: "2",
	date: "05-01-2021",
	rate: 5
}
)
reviewsCollection.insert(
{
	reviewId: "8",
	comment: "Food from hell",
	writer: "1",
	date: "04-01-2021",
	rate: 1
}
)
reviewsCollection.insert(
{
	reviewId: "9",
	comment: "Eatable",
	writer: "3",
	date: "04-07-2021",
	rate: 3
}
)
reviewsCollection.insert(
{
	reviewId: "10",
	comment: "Just ok",
	writer: "1",
	date: "04-17-2021",
	rate: 3
}
)
reviewsCollection.insert(
{
	reviewId: "11",
	comment: "Yes, Pad Thai should be with shrimp",
	writer: "1",
	date: "04-12-2021",
	rate: 5
}
)
reviewsCollection.insert(
{
	reviewId: "12",
	comment: "Delicious",
	writer: "2",
	date: "03-19-2021",
	rate: 5
}
)
reviewsCollection.insert(
{
	reviewId: "13",
	comment: "Pretty good",
	writer: "3",
	date: "03-01-2021",
	rate: 3
}
)
reviewsCollection.insert(
{
	reviewId: "14",
	comment: "Thai food! Why not",
	writer: "3",
	date: "03-15-2021",
	rate: 4
}
)
reviewsCollection.insert(
{
	reviewId: "15",
	comment: "Best Korean food",
	writer: "3",
	date: "03-17-2021",
	rate: 5
}
)
reviewsCollection.insert(
{
	reviewId: "16",
	comment: "Looks so healthy",
	writer: "2",
	date: "03-19-2021",
	rate: 4
}
)
reviewsCollection.insert(
{
	reviewId: "17",
	comment: "SOS, So delicious",
	writer: "1",
	date: "03-01-2021",
	rate: 5
}
)
reviewsCollection.insert(
{
	reviewId: "18",
	comment: "My favorite italian food",
	writer: "1",
	date: "03-04-2021",
	rate: 5
}
)
reviewsCollection.insert(
{
	reviewId: "19",
	comment: "Are you guys serious? Really? Just eat cup noode?",
	writer: "1",
	date: "03-14-2021",
	rate: 2
}
)
reviewsCollection.insert(
{
	reviewId: "20",
	comment: "I will just eat noodle",
	writer: "2",
	date: "04-14-2021",
	rate: 3
}
)
reviewsCollection.insert(
{
reviewId: "21",
comment: "Sunday meal",
writer: "2",
date: "04-17-2021",
rate: 4
}
)
reviewsCollection.insert(
{
	reviewId: "22",
	comment: "Always I will eat",
	writer: "1",
	date: "04-17-2021",
	rate: 5
}
)
reviewsCollection.insert(
{
	reviewId: "23",
	comment: "Exercise or Workout. Choose one",
	writer: "1",
	date: "04-19-2021",
	rate: 5
}
)
reviewsCollection.insert(
{
reviewId: "24",
comment: "American Burger is the best",
writer: "1",
date: "02-11-2021",
rate: 5
}
)
reviewsCollection.insert(
{
reviewId: "25",
comment: "Fat is my life",
writer: "2",
date: "01-19-2021",
rate: 5
}
)