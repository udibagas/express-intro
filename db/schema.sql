DROP TABLE IF EXISTS "Menus", "Categories";

CREATE TABLE IF NOT EXISTS "Categories" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Menus" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "CategoryId" INT NOT NULL REFERENCES "Categories" (id),
    "stock" INT NOT NULL,
    "price" INT NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);