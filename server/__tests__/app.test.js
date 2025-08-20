// app.test.js

const { Cosmetic, Ingredient, loadPage_productList } = require("../../app/app.js");

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve("<div>Mocked HTML</div>")
  })
);

describe("Cosmetic class", () => {
  test("should create Cosmetic object with default values", () => {
    const c = new Cosmetic("Cream", "http://example.com");
    expect(c.name).toBe("Cream");
    expect(c.link).toBe("http://example.com");
    expect(c.imageUrl).toBe("");
    expect(c.ingredients).toEqual([]);
  });

  test("should add ingredients", () => {
    const c = new Cosmetic("Cream", "http://example.com");
    c.addIngredients(["Water", "Glycerin"]);
    expect(c.ingredients).toEqual(["Water", "Glycerin"]);
  });
});

describe("Ingredient class", () => {
  test("should create Ingredient object", () => {
    const ing = new Ingredient("Water");
    expect(ing.name).toBe("Water");
    expect(ing.categories).toEqual([]);
  });

  test("should add category", () => {
    const ing = new Ingredient("Glycerin");
    ing.addCategory("Moisturizer");
    expect(ing.categories).toContain("Moisturizer");
  });
});

describe("loadPage_productList", () => {
  test("should fetch HTML and return it", async () => {
    const html = await loadPage_productList(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/fetch-html?page=1");
    expect(html).toBe("<div>Mocked HTML</div>");
  });

  test("should handle fetch error", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("Network error"));
    await expect(loadPage_productList(2)).resolves.toBeUndefined();
  });
});
