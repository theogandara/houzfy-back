CREATE DATABASE app;

\c app

CREATE SCHEMA IF NOT EXISTS houzfy;

CREATE TABLE IF NOT EXISTS houzfy.account (
    account_id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    cpf TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS houzfy.property (
    property_id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    purpose TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMP,
    description TEXT,
    address VARCHAR(255),
    number VARCHAR(50),
    neighborhood VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zip_code VARCHAR(20),
    total_area NUMERIC,
    built_area NUMERIC,
    bedrooms INTEGER,
    bathrooms INTEGER,
    suites INTEGER,
    parking_spaces INTEGER,
    pool BOOLEAN,
    gym BOOLEAN,
    elevator BOOLEAN,
    pets_allowed BOOLEAN,
    barbecue_area BOOLEAN,
    security_24h BOOLEAN,
    furnished BOOLEAN,
    others TEXT
);

CREATE TABLE IF NOT EXISTS houzfy.leads (
    lead_id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    property_id UUID,
    created_at TIMESTAMP
);