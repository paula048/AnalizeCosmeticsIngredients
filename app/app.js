var HTML_TEXT = "";


function loadPage_productList(page) {
    return fetch(`http://localhost:3000/fetch-html?page=${page}`)
        .then(response => response.text())
        .then(html => {
            HTML_TEXT = html;

            console.log("TEST?: GET Page ... baby\nRequest:\n" + HTML_TEXT)
                                                                        // ------------- Print test Log below, make error
            //console.log("\n samo Response !!!!!!: \n" + response)
            //console.log("\n Response !!!!!!: \n" + response.text())
            return HTML_TEXT; // Ensure the promise resolves with the HTML text
        })
        .catch(error => {
            console.error('Error fetching HTML:', error);
        });
}



class Cosmetic {
    constructor(name, link, imageUrl="") {
        this.name = name;
        this.link = link;
        this.ingredients = [];
        this.imageUrl = imageUrl;
    }
    addIngredients(ingredients) {
        this.ingredients = ingredients;
    }
}

class Ingredient {
    constructor(name) {
        this.name = name;
        this.categories = [];
    }
    addCategory(category) {
        this.categories.push(category);
    }
}


module.exports = { Cosmetic, Ingredient, loadPage_productList };



