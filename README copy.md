# credit-card-luhn-validation

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Description

credit-card-luhn-validation is a comprehensive web application developed in response to the challenge set by Project Broadcast. The primary objective was to craft a fully responsive website where a user is able to enter a credit card number into a React based UI where the validation logic is handled by an express powered api, providing users with a dynamic and user-friendly experience.

This project was bundled with [create-turbo](https://turbo.build/repo/docs/getting-started/create-new).

Frontend deployed by [Vercel](https://vercel.com/)
Backend deployed by [Render](https://render.com)

## Table of Contents

- [Demo](#demo)
- [Project Structure Front](#frontend-project-structure)
- [Project Structure Back](#backend-project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment variables Front](#frontend-environment-variables)
  - [Environment variables Back](#backend-environment-variables)
- [Tech Stack](#stack)
- [Api documentation](#api-documentation)
- [Usage](#usage)
- [Future Improvements](#future-improvements)
- [Walkthrough](#walkthrough)

## Demo

You can see a live demo of [credit-card-luhn-validation here!](https://credit-card-luhn-validation-frontend.vercel.app/).

## Frontend Project Structure

- `src/app` code base for app;
- `src/components` components isolated with their styling;
- `src/components/ui` shadcn components to use;
- `src/context` context for flobal state management;
- `src/hooks` hook for handling snackbar data state;
- `src/mocks` mocks credit card;
- `src/models` credit card model;
- `src/services` cardServices for async operations;
- `src/utils` utils cn file;
- `src/utils/validators` validators used;
- `src/utils/masks` masks used;

## Backend Project Structure

- `src/__tests__` tests for app routes;
- `src/controllers` controller class to handle route actions;
- `src/middlewares` middleware used on validation route;
- `src/schemas` schema used by Mongoose to create the Card Model;
- `src/routes.ts` exports all the project used routes;
- `src/utils` logger and luhn's validation function;
- `src/app.ts` app class initializing middlewares, database and routes;
- `src/index.ts` starts the server;

## Features

- **Responsive Design**: Implemented a fully responsive layout.

- **3D Animated Card**: card was animated with pure css using preserve 3D.

- **Card Validation**: Express powered api routes that validates provided credit card using luhn alghorithm.

- **Card List Database**: Implemented database that can save and delete accepted cards.

## Stack

- `UI`: [React 18](https://reactjs.org/)
- `frontend`: a [Vite](https://vitejs.dev/) single page app
- `backend`: an [Express](https://expressjs.com/) server
- `State Control`: [Context](https://legacy.reactjs.org/docs/context.html) for global state
- `Styling`: [Tailwindcss](https://tailwindcss.com/) and [Shadcn-ui](https://ui.shadcn.com/) powered by [Radixui](https://www.radix-ui.com/)
- `HTTP Client`: [Axios](https://github.com/axios/axios)
- `Icons`: [lucide-react](https://lucide.dev/guide/packages/lucide-react)
- `Testing`: [Jest](https://jestjs.io/)
- `Database`: [MongoDB](https://www.mongodb.com/)
- `Object Data Modeling`: [Mongoose](https://mongoosejs.com/docs/index.html)
- `scripts`: Jest and ESLint configurations
- `packages/typescript-config`: tsconfig.json's used throughout the monorepo
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Getting Started

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/guiduck/credit-card-luhn-validation.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   ### Frontend Environment Variables

4. **Create a `.env` File:**

   - Create a file named `.env.local`(or .env.production for production environment) in your project's root folder.

5. **Define Environment Variables:**

   - In the `.env.[environment]` file, define your environment variables in the following format:

     ```
     VARIABLE_NAME=variable_value
     ```

   Replace `VARIABLE_NAME` with the name of your variable and `variable_value` with the actual value you want to set.

6. **Example:**

   - local:

   ```plaintext
   VITE_API_URL=http://localhost:5001/
   ```

   - production:

   ```plaintext
   VITE_API_URL=https://credit-card-luhn-validation.onrender.com/
   ```

   ### Backend Environment Variables

   #### **Create a `.env` File:**

   - Create a file named `.env` in your project's root folder.

   - In the `.env` file, define your environment variables:

   ```plaintext
    PORT=5001
    DB_URL=mongodb+srv://guiduck02:654321kcudiug@cardfactory.qpluamv.mongodb.net/?retryWrites=true&w=majority
   ```

### API Documentation

#### Validation

- The endoint "api/cards" is used to create(if validation is successful), list and delete the cards.

#### Endpoints

- **validate and create**
  - POST /api/cards
    - Payload
    ```json
       {
           "holder": string,
           "creditCardNumber": string,
           "expires": string,
           "cvc": string
       }
    ```
    - Success Response
    ```json
       {
           success: boolean,
           data: card object,
           message: string,
       }
    ```
    - Error Response
    ```json
       {
           error: string,
       }
    ```
- **list cards**
  - GET /api/cards
    - Success Response
    ```json
       {
          data: [cards object]
       }
    ```
    - Error Response
    ```json
       {
          error: string
       }
    ```
- **delete cards**
  - DELETE /api/cards
    - Success Response
    ```json
       {
          success: boolean,
          message: string
       }
    ```
    - Error Response
    ```json
       {
          error: string
       }
    ```

## Usage

Visit [http://localhost:3000](http://localhost:3000) to explore the application. Type in the credit card input, interact with the card animation, and experience the real-time data updates through the database.

Visit [http://localhost:5001](http://localhost:5001) to explore the backend api.

## Future improvements

While developing checkout page, I am primarly focused on enhancing user experience and functionality:

- **UI:** the ui was designed very carefully, but while developing I had many ideas and little time to explore.

- **Input Validation:** All frontend validations are being handled manually, it would be preferable to use a lib(react-hook-form or formik).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
