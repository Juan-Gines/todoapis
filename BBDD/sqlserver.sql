IF NOT EXISTS (
    SELECT name 
    FROM sys.databases 
    WHERE name = N'basket'
)
CREATE DATABASE basket;
GO

USE basket;
GO

IF OBJECT_ID('products', 'U') IS NOT NULL 
DROP TABLE products;
GO

CREATE TABLE products (
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(100) NOT NULL,
    onbasket BIT NOT NULL DEFAULT 0
);
GO

INSERT INTO products (name) VALUES
    ('patatas'),
    ('judias');
GO

SELECT * FROM products;
GO
