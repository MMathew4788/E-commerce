# E-commerce Project Readme

This is an e-commerce project that includes both the frontend and backend code for the website. The frontend code is located in the frontend folder, which is located in the root directory. The backend code is located in the root directory.

## Getting Started

To get started with the project, clone the repository to your local machine

Once you have cloned the repository, navigate to the root directory and create a file named .env with the following content:

`PORT=8080`<br>
`MONGO_URL=your-mongo-db-url`<br>
`JWT_SECRET=your-jwt-secret-key`<br>

Replace your-mongo-db-url with the URL of your MongoDB database, and replace your-jwt-secret-key with your own secret key.

Then, navigate to the frontend folder and create a file named .env with the following content:

`REACT_APP_API=http://localhost:8080`

This will allow the frontend code to make requests to the backend code at http://localhost:8080

After creating the .env files, run the following command in the root directory to install the dependencies for the backend code:

`npm install`

Then, navigate to the frontend folder using the command

`cd frontend`

Run the following command to install the dependencies for the frontend code:

`npm install`

## Dependencies

The project has the following dependencies:

#### Frontend Dependencies:

- react
- react-dom
- react-router-dom
- axios
- antd
- react-spinner

#### Backend Dependencies:

- bcrypt
- concurrently
- cors
- dotenv
- express
- express-formidable
- jsonwebtoken
- mongoose
- morgan
- slugify
- nodemon
- colors

## Running the App

To run the app, navigate to the root directory and run the following command:

`npm run dev`<br>
This will start the development server for the backend code and the frontend code. The app will open in your default browser.
