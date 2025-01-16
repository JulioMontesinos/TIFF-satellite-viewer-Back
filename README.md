# TIFF Satellite Viewer - Backend

This is the backend service for the TIFF Satellite Viewer application. It provides the API and data management functionalities required to support the frontend. To see the full functionality of the project, this backend must be used in conjunction with the frontend part of the application.

## Purpose

The backend handles:

  - Managing shapes (e.g., rectangles and polygons) on the map.
  - Storing and retrieving shape data from a database or mock data.
  - Securing access through token-based authentication.

_____________

## Features

  - Shape Management API: Create, update, delete, and retrieve shapes.
  - Authentication: Protects API endpoints with token-based authentication.
  - Data Storage: Supports MongoDB for persistent data or mock data for testing.

_____________

## Setup

  1. Clone this repository and navigate to the project folder.
  2. Install dependencies:

    npm install

  3. Create a .env file using .env.example as a template.
  4. Start the server:

    npm run dev

For a complete experience, ensure the frontend is also set up and running. Together, the frontend and backend provide a seamless application for managing and visualizing shapes on maps.
