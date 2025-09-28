-- Daily Challenge: Items and Orders
-- 1/2:
CREATE TABLE product_orders (
    id SERIAL PRIMARY KEY,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT,  -- each order belongs to one user
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL, -- price column
    order_id INT, -- each item belongs to one order
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES product_orders(id) ON DELETE CASCADE
);

-- 3:
CREATE OR REPLACE FUNCTION get_order_total(orderId INT)
RETURNS NUMERIC AS $$
    SELECT COALESCE(SUM(price), 0)
    FROM items
    WHERE order_id = orderId;
$$ LANGUAGE SQL;

-- 4:
-- 1:
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- 2:
CREATE OR REPLACE FUNCTION get_user_order_total(userId INT, orderId INT)
RETURNS NUMERIC AS $$
    SELECT COALESCE(SUM(i.price), 0)
    FROM items i
    JOIN product_orders o ON i.order_id = o.id
    WHERE o.id = orderId AND o.user_id = userId;
$$ LANGUAGE SQL;


SELECT get_order_total(1);
SELECT get_user_order_total(1, 2);  -- total for order 2 of user 1

