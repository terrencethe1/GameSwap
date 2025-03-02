# GameSwap
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## User Story
As an avid gamer who enjoys physical media, I would like to be able to expand the number of video games that I can experience. I have limited funds, and I would like to be able to try out new games before I commit to purchasing them.
 

## Description   
GameSwap is a web-based software application that allows users to borrow video games from an extensive library of hand-selected games. The application uses a React frontend and an Express backend with a MongoDB database. GameSwap utilizes Apollo GraphQL to communicate between the frontend and the backend.

## Team
- Thida Phongsavath
- Terrence Johnson
- Michael Jandres
- Christopher Makousky
- Thomas Nielsen


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/terrencethe1/GameSwap.git
    cd GameSwap
    ```

2. Install dependencies for both client and server:
    ```sh
    npm run install
    ```

3. Create a `.env` file in the [server](http://_vscodecontentref_/0) directory and add your MongoDB URI and JWT secret key:
    ```env
    MONGODB_URI='your-mongodb-uri'
    JWT_SECRET_KEY='your-secret-key'
    RAWG_API_KEY='your-rawg-api-key'

4. Run build:
    ```sh
    npm run build

5. Seed the database:
    ```sh
    npm run seed

6. Start the server:
    ```sh
    npm run start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3001`.
2. Use the search bar to find games.
3. Sign up or log in to checkout your favorite games.
4. View the due dates for your borrowed games in the "Account" section.

## Features

- **Search Games**: Search for games in the Mongodb NoSQL database .
- **User Authentication**: Sign up and log in to checkout your favorite games.
- **Borrow Games**: Checkout games to your account. Due dates default to two weeks after the checkout button is pressed.
- **Responsive Design**: The application is fully responsive and works on all devices.


## Technologies

- **Frontend**: React, TypeScript, Apollo Client, React Router, Bootstrap,JWT
- **Backend**: Express, Apollo Server, MongoDB, Mongoose, JWT, TypeScript, Day.js
- **Testing**: Cypress
- **Build Tools**: Vite, Concurrently

## License

This project is licensed under the MIT License.

## Deployed Web Application   
https://gameswap.onrender.com/

![GameSwap](./images/screenshot1.png)<br><br>
![GameSwap](./images/screenshot2.png) <br><br>
![GameSwap](./images/screenshot3.png) 



