# Meal Match - Frontend Final Assignment

You can find the github repository [here](https://github.com/AnneKluytmans/novi-frontend-final-project-meal-match)

## Table of contents

- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Testusers](#test-users)
- [Acknowledgements](#acknowledgements)
- [Author](#author)

  <br>

## About The Project

This repository contains the frontend code for **Meal Match**, the final project for the frontend development module at 
Hogeschool Novi. Meal Match is a web application designed to help users find their perfect recipes based on their 
preferences, mood, dietary needs, available ingredients, and more.

![Meal Match Main Page](src/assets/home-page-screenshot.png)

### Features
- **Personalized Recipe Suggestions**: Get recipe recommendations tailored to your mood, diet and cooking time.
- **Ingredient Search**: Search recipes by ingredients.
- **Recipe Browsing**: Browse through a wide selection of recipes if you prefer to choose on your own.
- **Favorites**: Save your favorite recipes to your personal account for easy access in the future.


## Built with
HTML, CSS, JavaScript and React

## Getting Started

### Prerequisites

To run this application, you will need the following:
- Download and install [Node.js](https://nodejs.org/)
- Download and install the latest version of [npm](https://www.npmjs.com/) 
    ```npm install -g npm@latest```
- A runtime environment such as WebStorm or Visual Studio Code.

### API Variables

Meal Match uses the Edamam API, Novi Backend API, and EmailJS for its functionality. You will need to set the following 
environment variables in a `.env` file in the root of the project:

```env
# API variables:
VITE_API_KEY_AUTH=your-api-key-here
VITE_API_KEY_EDAMAM=your-api-key-here
VITE_API_ID_EDAMAM=your-app-id-here

# EmailJS variables:
VITE_EMAILJS_SERVICE_ID=your-service-id-here
VITE_EMAILJS_TEMPLATE_ID=your-template-id-here
VITE_EMAILJS_USER_ID=your-user-id-here
```

You can follow these links to create the needed API keys and App id's:
- Auth API key --> [Novi Backend](https://novi.datavortex.nl/)  
- Edamam API key and App id --> [Edamam API](https://developer.edamam.com/edamam-recipe-api)
- EmailJS id's --> [EmailJS](https://www.emailjs.com/)

Note:
- The examinator can find the original API keys and id's in the pdf document: functioneel ontwerp meal match, chapter 1. linkjes, .env en testgebruikers

## Installation

1. Clone the [meal-match repository](https://github.com/AnneKluytmans/novi-frontend-final-project-meal-match):
    ```
    git@github.com:AnneKluytmans/novi-frontend-final-project-meal-match.git
    ```
    or
    ```
    git clone https://github.com/AnneKluytmans/novi-frontend-final-project-meal-match.git
    ```
2. Install the dependencies:
    ```
    npm install
    ```
3. Create a .env file in the root of the project and add your API keys and App Id's as mentioned in the 
[API variables](#api-variables) section.

4. Run the project:
    ```
    npm run dev
    ```
5. Open the localhost link to view the application in the browser


## Available Scripts

You can run the following npm scripts:
- ```npm run dev``` Starts running the development server
- ```npm run build``` Builds the application for production to the build folder
- ```npm run lint``` Lints the project files using ESLint
- ```npm run preview``` Previews the production build locally

## Test Users
You can sign up with your own account or sign in using the credentials of the existing test users below:

1. Test user 1:
    - **Username**: testaccount1
    - **Password**: aR2?h59fS!f

2. Test user 2:
    - **Username**: testaccount2
    - **Password**: d1Lw@q4+D49Y1w3

3. Test user 3:
    - **Username**: testaccount3
    - **Password**: Aut3b90?#S

## Acknowledgements
- [Delicious NL](https://deliciousmagazine.nl/): Provided the food images on the home page.
- [EmailJS](https://www.emailjs.com/): Manages email functionality for the contact form of the application.
- [Novi Backand API](https://novi.datavortex.nl/): Handles authentication and other user related backend services.
- [Edamam API](https://developer.edamam.com/edamam-recipe-api): Provides all the recipe data.

  <img src="src/assets/icons/edamam-badge.svg" alt="EDAMAM API" width="150">

Special thanks to Hogeschool Novi for the lessons and support for the development of this project.


## Author
This project was developed by [Anne Kluytmans](https://github.com/AnneKluytmans), a Software Development student 
at [NOVI](https://www.novi.nl/).