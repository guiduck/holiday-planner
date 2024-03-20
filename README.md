# holiday-planner

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Description

holiday-planner is a comprehensive web application developed in response to the challenge set by Buzzvel. The primary objective was to craft a fully responsive website where a user is able to manage its holiday plans through a React based UI where the validation logic is handled by NextJs powered api and server actions, providing users with a dynamic and user-friendly experience.

This project was bundled with [create-next-app](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Table of Contents

- [Project Structure Front](#frontend-project-structure)
- [Project Structure Back](#backend-project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Docker setup](#docker-setup)
  - [Installation](#installation)
  - [Prisma Setup](#prisma-setup)
  - [Environment variables Front](#frontend-environment-variables)
  - [Environment variables Back](#backend-environment-variables)
- [UI Documentation](#ui-documentation)
  - [Components](#components)
- [Tech Stack](#stack)
- [Api documentation](#api-documentation)
- [Usage](#usage)
- [Future Improvements](#future-improvements)
- [Walkthrough](#walkthrough)

## Frontend Project Structure

- `src/app` code base for app;
- `src/components` components isolated with their styling;
- `src/components/ui` shadcn components to use;
- `src/stores` zustand stores for global state management;
- `src/hooks` hook for handling device width;
- `src/mocks` mocks plans for storybook and testing;
- `src/models` plan model;
- `src/lib/utils` utils cn file;
- `src/utils/validators` validators used;
- `src/styles` global css file;

## Backend Project Structure

- `src/__tests__` tests for app routes;
- `src/app/api/plans` route actions for listing plans;
- `src/app/api/plan` route actions for creating, deleting and getting a plan;
- `src/lib/prisma` exports our Prisma client;
- `src/lib/actions` async operations;
- `src/index.ts` starts the server;
- `prisma/schema` our prisma schema for Plan DB;
- `prisma/migrations` [prisma](#prisma-setup) migrations generated;

## Features

- **Responsive Design**: Implemented a fully responsive layout.

- **Redimensionable dashboard**: Use the resize handle to customize our dashboard view.

- **PDF Viewer**: Using react-pdf to setup our pdf view to work with JSX. You can also download the file or open it in another page from the modal or the selectedPlan view.

- **Server Side Revalidation**: When any change is made to the database through creating, deleting or archiving, we send a revalidateTag("tag") to fetch again the list of plans from db.

- **Plan List Database**: Implemented database that can save and delete accepted plans.

- **Server Actions**: Implemented the use of those new server actions! we can get headers or cookies throught exporting server only functions and even importing from server components and passing down as props so client components can have data that was previously obtainable with the use of getServerSideProps context.

- **Error handling**: Errors are handled with the Alert component after getting an error from user iteraction.

## Stack

- `UI`: [React 18](https://reactjs.org/)
- `frontend`: a [NextJs v14.1.3](https://nextjs.org/docs) single page app
- `api routes`: an [NextJs](https://nextjs.org/docs/app/building-your-application/routing) server
- `State Control`: [Zustand](https://zustand-demo.pmnd.rs) for global state
- `Schema validation`: [Zod](https://zod.dev) validating data
- `PDF View`: [React-pdf](https://react-pdf.org) generating download links and pdf file
- `Styling`: [Tailwindcss](https://tailwindcss.com/) and [Shadcn-ui](https://ui.shadcn.com/) powered by [Radixui](https://www.radix-ui.com/)
- `HTTP Client`: [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- `Icons`: [lucide-react](https://lucide.dev/guide/packages/lucide-react)
- `Testing`: [Jest](https://jestjs.io/)
- `UI Documentation`: [Storybook](https://storybook.js.org/#document) documenting and components demo
- `Database`: [Postgresql](https://www.postgresql.org)
- `Object Relational Mapping`: [Prisma](https://www.prisma.io)
- `scripts`: Jest and ESLint configurations
- `packages/typescript-config`: tsconfig.json's used throughout the repo
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting

## Getting Started

### Docker Setup

1. **Docker setup:**

   First, you need to install Docker Desktop. You can download it from [here](https://www.docker.com/products/docker-desktop/).

2. **Check if it's working:**

   ```bash
   docker ps
   ```

   Lists the containers that are running on your host.

3. **run services:**

   ```bash
   docker compose up
   ```

   You can use the -d lag so it doesn't take up your terminal.

   ```bash
   docker compose up -d
   ```

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/guiduck/holiday-planner
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

### Prisma Setup

Before using prisma, we need to [set our DATABASE_URL.](#backend-environment-variables)

1. **Run migration:**

```bash
npx prisma migrate dev
```

2. **Choose a name for the migration:**

```bash
create-plan
```

It could be anything, Here I'm using create-plan.

### Frontend Environment Variables

3. **Create a `.env` File:**

   - Create a file named `.env`(or .env.production for production environment) in your project's root folder.

4. **Define Environment Variables:**

   - In the `.env.[environment]` file, define your environment variables in the following format:

   ```
   VARIABLE_NAME=variable_value
   ```

   Replace `VARIABLE_NAME` with the name of your variable and `variable_value` with the actual value you want to set.

5. **Example:**

   - local:

   ```plaintext
   NEXT_PUBLIC_URL_LOCAL=http://localhost:3000
   ```

   ### Backend Environment Variables

   #### **Create a `.env` File:**

   - Create a file named `.env` in your project's root folder.

   - In the `.env` file, define your environment variables:

   ```plaintext
    DATABASE_URL="postgresql://docker:docker@localhost:5432/plans?schema=public"
   ```

   Notice I'm using my docker-compose.yml file's _port_, _user_ and _paswword_. If you define other names, please update accordingly with your docker-compose file.

## UI Documentation

- please, first [install dependencies](#installation).

1. **Run storbook on port 6006:**

   ```bash
   npm run storybook
   ```

### Components

#### AddPlanPanel Component

Provides a UI panel for adding plans, with options for toggling between displaying the panel within a drawer or without one.

**Props:**

- `forDrawer` (boolean): Controls whether the panel is displayed within a drawer. Default is `true`.

#### Alert Component

Displays different types of alerts (neutral, error, success) with customizable messages.

**Props:**

- `type` (string): Type of alert. Options include "neutral", "error", and "success".
- `show` (boolean): Controls the visibility of the alert. Default is `true`.
- `message` (string): The message to be displayed in the alert.
- `time` (number): Duration in milliseconds for which the alert is displayed. Default is `50000`.

#### ModeToggle Component

A component for toggling between different themes.

**Props:**

- None

#### PlanCard Component

Displays information about a specific plan. Includes options for selecting/deselecting a plan.

**Props:**

- `plan` (object): Information about the plan to be displayed.
- `selectedPlan` (object): Information about the currently selected plan.
- `onSelectPlan` (function): Callback function triggered when a plan is selected.

**Example:**

```jsx
<PlanCard
  plan={mockedPlans[0]}
  selectedPlan={mockedPlans[0]}
  onSelectPlan={() => {}}
/>
```

#### PlanDisplay Component

Displays the main interface for managing plans. Includes options for adding a new plan, selecting an existing plan, and creating a new plan.

**Props:**

- `testId` (string): Test ID for the component.

#### PlanList Component

Displays a list of plans with options for selecting a plan.

**Props:**

- `selectedPlan` (object): Information about the currently selected plan.
- `onSelectPlan` (function): Callback function triggered when a plan is selected.
- `items` (array): An array of plan objects to be displayed in the list.

**Example:**

```jsx
<PlanList
  selectedPlan={mockedPlans[0]}
  onSelectPlan={() => {}}
  items={mockedPlans}
/>
```

#### PlanSelected Component

Displays detailed information about a selected plan, including date, title, locations, participants, and description. Provides options for viewing and downloading associated files.

**Props:**

- `dateFormated` (string): Formatted date to be displayed.
- `plan` (object): Information about the selected plan.
- `testId` (string): Test ID for the component.

**Example:**

```jsx
<PlanSelected
  dateFormated="2024-03-20"
  plan={{
    title: "Plan Title",
    date: "2024-03-20",
    locations: ["Location 1", "Location 2"],
    participants: ["Participant 1", "Participant 2"],
    description: "Plan description goes here.",
  }}
  testId="plan-selected"
/>
```

#### PlanView Component

Manages the view for plans, including a resizable panel for plan navigation and display.

**Props:**

- `defaultLayout` (array): Default layout sizes for the resizable panel group.
- `defaultCollapsed` (boolean): Specifies if the panel is collapsed by default.
- `navCollapsedSize` (number): Size of the collapsed panel.
- `currentDate` (string): Current date to filter plans by date.
- `plans` (array): An array of plan objects to be displayed.

**Example:**

```jsx
<PlanView
  defaultLayout={[50, 50]}
  defaultCollapsed={false}
  navCollapsedSize={200}
  currentDate="2024-03-20"
  plans={[]}
/>
```

#### Search Component

Allows users to search for specific items by entering a query.

**Props:**

- `onSearch` (function): Callback function triggered when a search query is entered.

**Example:**

```jsx
<Search onSearch={(query: string) => console.log("Search query:", query)} />
```

#### Spinner Component

Displays a loading spinner animation.

**Props:**

- None

**Example:**

```jsx
<Spinner />
```

### API Documentation

#### Validation

- The endoint "api/plans" is used to get all the plans list.

- The endoint "api/plan" is used to create a new plan, get a plan by Id and delete the plan by the given id.

#### Endpoints

- **validate and create**

  - POST /api/plan
    - Payload
    ```json
       {
           "title": string,
           "description": string,
           "date": string,
           "locations": string[]
           "participants": string[]
       }
    ```
    - Success Response
    ```json
       {
           data: plan object,
           message: string,
       }
    ```
    - Error Response
    ```json
       {
           data: Error,
           message: string,
       }
    ```

- **get plan**

  - GET /api/plan
    - Success Response
    ```json
       {
           data: {Plan object}
           message: string
       }
    ```
    - Error Response
    ```json
       {
           data: Error
           message: string,
       }
    ```

- **delete plans**

  - DELETE /api/plan
    - Success Response
    ```json
       {
           message: string
       }
    ```
    - Error Response
    ```json
       {
           data: Error
           message: string,
       }
    ```

- **list plans**

  - GET /api/plans
    - Success Response
    ```json
       {
           data: [plans object]
           message: string,
       }
    ```
    - Error Response
    ```json
       {
           data: Error
           message: string,
       }
    ```

## Usage

Visit [http://localhost:3000](http://localhost:3000) to explore the application. Type in your plans for the future, interact with the resizable dashboard, explore the mobile responsiveness with the drawer and experience the real-time data updates through the database.

In this project the frontend and the backend work together through the use of server actions and revalidating the data without the need of verbose or complex use of client side state management.

Visit [http://localhost:3000/api](http://localhost:3000/api) to explore the backend api.

## Future improvements

While developing the dashboard, I am primarly focused on enhancing user experience and functionality:

- **UI:** the ui was designed very carefully, but while developing I had many ideas and little time to explore.

- **Input Validation:** I want to try making the create plan form validation server side.

- **Server actions:** I think there are very strong use cases for the server actions that weren't fully exploited.

- **Skeletons:** Could only serve the PlanCard with its own Skeleton, but actually intended to use it everywhere.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
