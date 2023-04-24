# Blog Site (NodeJS, Express, MongoDB and NextJS)

## Introduction

This is a blog application built using NodeJS, Express, MongoDB and NextJS. It allows users to create and manage blog posts. Users can also view other posts that have been created by other users.

## Technologies Used

- NodeJS
- Express
- MongoDB
- NextJS

## Features

- User authentication and authorization using JSON Web Tokens (JWT)
- Create, read, update and delete (CRUD) blog posts
- View all blog posts by all users
- View a specific blog post and its details
- Pagination for blog post listing
- Search functionality to search for posts by title, author or content

## Installation and Setup

- Clone the project from the GitHub repository
- Install NodeJS and MongoDB on your system
- Create a `.env` file using the `.env.example` file as a template
- Run `npm install` to install all the required packages and dependencies
- Start the server using the command `npm run dev` for development or `npm start` for production

## Common Commands

- `docker system prune -a --volumes`: This command removes all stopped containers, unused volumes, and networks.
- `docker exec container npm install mongoose-sequence`: This command installs the `mongoose-sequence` package in the backend container.
`docker exec -it container sh`: This command opens a shell session in the backend container.
