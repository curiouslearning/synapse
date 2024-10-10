# Synapse MVP 

## Project Overview

This project implements a switcher logic for educational assessments content based on iFrames. It is built using Next.js and incorporates Next-Auth for authentication and Firebase Admin for database access.

## Features

- Content switching using iFrames based on scores
- Redirections outside of iFrames based on scores
- User authentication with Next-Auth
- Firebase Admin integration for database operations
- API endpoints for managing flows (add, delete, get)
- Dashboard for signed-in users to manage app flows

## Tech Stack

- Next.js
- Next-Auth
- Firebase Admin
- React

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run the development server: `npm run dev`

## Authentication

This project uses Next-Auth for user authentication. Ensure you have properly configured your authentication providers in the Next-Auth setup.

## Database Operations

Firebase Admin is used for database access. The following API endpoints are available:

- `POST /api/flows`: Add a new flow
- `DELETE /api/flows/:id`: Delete a flow
- `GET /api/flows`: Retrieve all flows

## Dashboard

The dashboard allows authenticated users to manage app flows. Users can view, add, edit, and delete flows from this interface.

## Contributing

## Contributing

We welcome forks of this project. However, please note that we are not currently accepting pull requests from contributors outside of our organization. Feel free to use and modify the code for your own purposes in accordance with the license.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.

## TODO

- Implement unit tests
- Add more detailed documentation
- Enhance error handling and logging
