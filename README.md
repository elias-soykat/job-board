# Job board api

## Project Setup Guide

This guide will help you get the project up and running on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (20 version recommended)
- [pnpm](https://pnpm.io/) (Install using `npm install -g pnpm`)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/elias-soykat/job-board
cd job-board
```

### 2. Set Up the Server

```bash
# Navigate to the server directory
cd server

# Create environment file from example
cp .env.example .env

# Install dependencies
pnpm install

# Start the development server
pnpm run dev
```

### 3. Set Up the Client

```bash
# Navigate to the client directory
cd ../client

# Create environment file from example
cp .env.example .env

# Install dependencies
pnpm install

# Start the development server
pnpm run dev
```

## Configuration

1. Open the `.env` file in the server and client directory
2. Update the environment variables as needed for your local setup

## Verifying the Setup

After completing the steps above:

1. The client should be running at `http://localhost:3000`
2. The server should be running at `http://localhost:5001`

## Common Issues

If you encounter any issues:

1. Make sure all dependencies are installed correctly
2. Verify that the `.env` file is properly configured
3. Check if the ports (3000 and 5001) are available on your machine
