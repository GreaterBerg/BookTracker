# BookTracker

<img width="798" height="819" alt="image" src="https://github.com/user-attachments/assets/77b48de3-1936-49a2-a8b5-9f27a52b21ee" />


A book tracking web application built with React and TypeScript.

The project is currently in active development. I use it to practice building a more feature-rich frontend application and working with modern tools for server state, authentication, database interaction, and UI development.

## Current Features

* User authentication
* Create, read, update and delete books
* Book status tracking
* Pagination
* Search
* User-specific data
* Loading and error states
* Responsive UI

## Tech Stack

* React
* TypeScript
* React Router
* TanStack Query
* Supabase
* Tailwind CSS
* shadcn/ui
* Vite

<img width="1420" height="878" alt="image" src="https://github.com/user-attachments/assets/d8784b0a-09fd-488e-94cd-719a96928a26" />


## Architecture

The application is built around several main areas:

```text
src/
├── components/    # Reusable UI components
├── context/       # Global application context
├── hooks/         # Custom React hooks
├── lib/           # Shared utilities and configuration
├── pages/         # Application pages
├── router/        # Routing
├── types/         # TypeScript types
└── ...
```

The project uses **TanStack Query** for server state and data fetching, while authentication is handled through **Supabase**.

## Goals

The main goal of the project is to gain practical experience with:

* TypeScript in a real application
* Server-state management with TanStack Query
* Authentication and database interaction with Supabase
* CRUD operations
* Client-side routing
* Reusable React components and hooks
* Form handling and validation
* Testing
* Building and deploying a frontend application

## Development Status

🚧 **Work in progress**

The application is still being developed. Some parts of the architecture, TypeScript types, error handling, testing, and UI are subject to change as the project evolves.

## Planned Improvements

* Improve TypeScript coverage and remove remaining `any` usages
* Improve error handling
* Add more comprehensive tests
* Refine application architecture
* Improve accessibility
* Further improve UI/UX
* Add additional book-related features

## Running Locally

### Requirements

* Node.js
* npm

### Installation

```bash id="j0l1k4"
git clone https://github.com/GreaterBerg/BookTracker.git
cd BookTracker
npm install
```

### Development

```bash id="u5j8q0"
npm run dev
```

The application will be available at the local development URL provided by Vite.
