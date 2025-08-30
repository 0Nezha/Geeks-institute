DROP TABLE IF EXISTS menu_items CASCADE;



CREATE TABLE IF NOT EXISTS menu_items (
item_id SERIAL PRIMARY KEY,
name VARCHAR(120) NOT NULL,
description TEXT,
category VARCHAR (50) NOT NULL,
rating NUMERIC(2,1) CHECK (rating >= 0 AND rating <= 10),
price INTEGER NOT NULL CHECK (price >= 0),
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


INSERT INTO menu_items (name, description, category, rating, price) 
VALUES ('Harira Soup','Traditional Moroccan soup', 'Appetizer', 8.5, 35),
       ('Chicken Tagine','With preserved lemons & olives', 'Main Course', 9.0, 100),
       ('Grilled Kebab','Mixed meat skewers', 'Main Course', 8.0, 140),
       ('Milk Pastilla','Crunchy phyllo dessert', 'Dessert', 7.5, 150),
       ('Zaalouk','Eggplant & tomato salad', 'Appetizer', 8.0, 60),
       ('Briouat','Sweet pastry with almond filling', 'Dessert', 9.0, 80),
       ('Baklava','Sweet pastry with nuts and honey', 'Dessert', 9.5, 60),
       ('Mint Tea','Traditional Moroccan mint tea', 'Beverage', 8.0, 20),
       ('Moroccan Salad','Fresh vegetable salad', 'Appetizer', 7.0, 250),
       ('Pistachio Baklava','Rich pastry with pistachios', 'Dessert', 9.0, 55),
       ('Fruits de mer et poisson','Seafood and fish platter', 'Seafood', 8.0, 600);


ALTER TABLE menu_items ADD COLUMN image_url VARCHAR(255);



UPDATE menu_items
SET image_url = 'https://tasteofmaroc.com/wp-content/uploads/2017/05/harira-2-moroccan-soup-picturepartners-bigstock.jpg'
WHERE item_id = 1;

UPDATE menu_items
SET image_url = 'https://www.venturists.net/wp-content/uploads/2016/04/tagine.chicken.prune_.lemon_.jpg'
WHERE item_id = 2;

UPDATE menu_items
SET image_url = 'https://www.licious.in/blog/wp-content/uploads/2020/12/Chicken-Kebab-750x750.jpg'
WHERE item_id = 3;

UPDATE menu_items
SET image_url = 'https://storage.googleapis.com/hizan-network-app.appspot.com/marrakechtricks/pastilla/milk%20pastilla.jpg'
WHERE item_id = 4;

UPDATE menu_items
SET image_url = 'https://img.passeportsante.net/1200x675/2024-09-30/zaalouk-marocaine.jpg'
WHERE item_id = 5;

UPDATE menu_items
SET image_url = 'https://images.squarespace-cdn.com/content/v1/54d4153ce4b00c0e483c13a6/1485332681299-3Q5C0ANB5EJD19IEYTFK/image-asset.jpeg'
WHERE item_id = 6;

UPDATE menu_items
SET image_url = 'https://realgreekrecipes.com/wp-content/uploads/2022/10/Recipe-For-Walnut-Baklava-With-Honey.jpg'
WHERE item_id = 7;

UPDATE menu_items
SET image_url = 'https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/D2E2521B-2690-44B5-8BD5-0BAD5C76EB37/Derivates/41b07817-2915-44d2-96f0-2f1852d64b16.jpg'
WHERE item_id = 8;

UPDATE menu_items
SET image_url = 'https://marocmama.com/wp-content/uploads/2024/09/MarocMama-Moroccan-Garden-Salad-4-scaled-720x720.jpg'
WHERE item_id = 9;

UPDATE menu_items
SET image_url = 'https://houseandhome.com/wp-content/uploads/2025/01/Feature_Turkish-Pistachio-Baklava.jpg'
WHERE item_id = 10;

UPDATE menu_items
SET image_url = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/d8/33/b5/que-diriez-vous-d-un.jpg'
WHERE item_id = 11;




DELETE FROM menu_items
WHERE image_url IS NULL;