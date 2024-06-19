create database app;

\c app

create schema if not exists houzfy;

create table if not exists houzfy.account (
account_id uuid primary key,
 name text not null,
 email text not null,
 cpf text not null
 );

 create table if not exists houzfy.property (
property_id uuid primary key,
 title text not null,
 price text not null,
 purpose text not null
 category text not null,
 created_at timestamp
 );

 ALTER TABLE houzfy.property                                                         
ADD COLUMN description TEXT,
ADD COLUMN address VARCHAR(255),
ADD COLUMN number VARCHAR(50),
ADD COLUMN neighborhood VARCHAR(255),
ADD COLUMN city VARCHAR(255),
ADD COLUMN state VARCHAR(255),
ADD COLUMN zip_code VARCHAR(20),
ADD COLUMN total_area NUMERIC,
ADD COLUMN built_area NUMERIC,
ADD COLUMN bedrooms INTEGER,
ADD COLUMN bathrooms INTEGER,
ADD COLUMN suites INTEGER,
ADD COLUMN parking_spaces INTEGER,
ADD COLUMN pool BOOLEAN,
ADD COLUMN gym BOOLEAN,
ADD COLUMN elevator BOOLEAN,
ADD COLUMN pets_allowed BOOLEAN,
ADD COLUMN barbecue_area BOOLEAN,
ADD COLUMN security_24h BOOLEAN,
ADD COLUMN furnished BOOLEAN,
ADD COLUMN others TEXT;

 CREATE TABLE IF NOT EXISTS leads (
  lead_id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  property_id UUID,
  created_at TIMESTAMP
);