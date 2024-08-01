const express = require('express');
const app = express();

app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    res.send(`<h1>Hello there, ${username}!</h1>`);
});

app.get('/roll/:number', (req, res) => {
    const numberParam = req.params.number;
    const number = parseInt(numberParam, 10);

    if (isNaN(number)) {
        return res.send('<h1>You must specify a number.</h1>');
    }


    const rollResult = Math.floor(Math.random() * (number + 1));
    res.send(`<h1>You rolled a ${rollResult}.</h1>`);
});

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);

    if (isNaN(index) || index < 0 || index >= collectibles.length) {
        return res.send('<h1>This item is not yet in stock. Check back soon!</h1>');
    }

    const item = collectibles[index];
    res.send(`<h1>So, you want the ${item.name}? For ${item.price}, it can be yours!</h1>`);
});

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    let filteredShoes = shoes;
    const minPrice = parseFloat(req.query['min-price']);
    const maxPrice = parseFloat(req.query['max-price']);
    const type = req.query.type;

    if (!isNaN(minPrice)) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    }

    if (!isNaN(maxPrice)) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    }

    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    }
    res.json(filteredShoes);
});


app.get('/home', (req, res) => {
    res.send('<h1>Home Page</h1>');
});


app.listen(3000, () => {
    console.log('Listening on port 3000');
});