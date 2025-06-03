# Project Setup and Run Instructions

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed
- [Docker Compose](https://docs.docker.com/compose/) installed

## Running the Project

1. **Clone the repository:**
   ```sh
   git clone https://github.com/vladkunts/url-shortener
   cd url-shortener
   
2. **Build and start the Docker containers:**
   ```sh
    docker-compose up --build
    ```
   
3. **Access the application:**
   - Open your web browser and go to `http://localhost:3000` to access the application.
   - The backend API will be available at `http://localhost:5173`.

4. **Running Tests:**

   - To run tests inside the backend container:
   1. Open a shell in the backend container:
   ```sh
   docker-compose exec backend sh
   ```
   2. Inside the container, run:
   ```sh
   NODE_ENV=test npm test
   ```
   - Make sure the containers are running (`docker-compose up`).
   - Test results will be shown in the terminal.

4. **Stopping the application:**
   - To stop the application, run:
   ```sh
   docker-compose down
   ```