# Todo App

This is a todo app built with a monorepo architecture using Next.js for web, React Native for mobile, and NestJS for backend. It is a well-tested, dockerized application.

## Technologies Used
- **Backend**: NestJS
- **Web**: Next.js
- **Mobile**: React Native
- **Database**: PostgreSQL
- **Languages**: TypeScript, Node.js

## Getting Started

### Prerequisites
- Docker
- Docker Compose

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/rashadataf/todo-app.git
   cd todo-app
    ```

2. Install dependencies:
   ```sh
   yarn install
    ```

### Running the Development Environment
To start the development environment, run:
   ```
   docker-compose up dev
   ```
### Runing Tests
1. Start the test database:
   ```
   docker compose up test_db
   ```
2. Run the tests:
   ```
   yarn test
   ```
### Project Structure
- **apps/**: Contains the individual applications for web, mobile, and backend.
- **docs/**: Contains documentation and UML diagrams.
- **.github/workflows/**: Contains GitHub Actions workflows for CI/CD.

### Commands
- **Start Development:** `yarn dev`
- **Build:** `yarn build`
- **Lint:** `yarn lint`
- **Test:** `yarn test`
- **Start Specific Services:**
    - **Backend:** `yarn start:backend`
    - **Web:** `yarn start:web`
    - **Mobile (Android):** `yarn android`
    - **Mobile (iOS):** `yarn ios`
- `docker-compose.yml` **Overview**
    - **shared:** Shared services and configurations.
    - **web:** Web application container.
    - **backend:** Backend application container.
    - **mobile:** Mobile application container.
    - **dev:** Development environment container.
    - **prod:** Production environment container.
    - **db:** PostgreSQL database container.
    - **test_db:** PostgreSQL test database container.
- `package.json` **Scripts**
  - Development:
      - `dev:web`: Start web development server.
      - `dev:backend`: Start backend server.
      - `dev:mobile`: Start mobile development server.
      - `dev`: Start all development servers.
  - Build
    - `build:backend`: Build backend.
    - `build:web`: Build web.
    - `build:shared`: Build shared code.
    - `build`: Build all services.
- **Lint**
  - `lint`: Lint all codebases.
- **Test**
  - `test:backend`: Test backend services.
  - `test`: Test all services.

## Documentation

For detailed documentation and UML diagrams, refer to the [docs folder](docs/README.md).

## License

This project is licensed under the MIT License.