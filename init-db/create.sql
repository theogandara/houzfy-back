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
 category text not null
 );