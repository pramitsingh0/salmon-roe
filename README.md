# Anime Freak

Welcome to the AnimeFreak Social Media Site project! This project is a full-stack web application focused on creating a social media platform for anime enthusiasts. Users can sign up, log in, and interact with posts and comments related to anime. This README provides an overview of the project, its features, and instructions for running and deploying the application.

Deployed at: https://animefreak.onrender.com

## Features

- User Authentication: Users can sign up for an account, log in securely, and log out when done. The passwords are encrypted using bcrypt for enhanced security.
- User Avatar Upload: Users have the option to upload their own avatars, which are securely stored and associated with their profiles.
- JSON Web Tokens: The application utilizes JSON Web Tokens (JWT) for authentication on the server, ensuring secure and authenticated user sessions.
- CRUD Operations: The application supports Create, Read, Update, and Delete (CRUD) operations for Users, Posts, and Comments, leveraging MongoDB as the database for efficient data management.
- Image Compression: The sharp npm package is utilized to compress uploaded images in both posts and user avatars, optimizing storage utilization and improving application performance.
- File Upload: Multer middleware is used to process multipart/form-data, enabling seamless file uploads for user avatars and post images.
- Firebase Storage Integration: Firebase storage is integrated within the server infrastructure to efficiently store the uploaded and compressed image files.
- React Frontend: The frontend is built using React.js, providing a seamless and interactive user experience.
- State Management: Redux Toolkit is employed for efficient state management across the application, improving scalability and performance.
- Routing: React Router is utilized for effective route management, enabling smooth navigation within the application.
- HTTP Requests: Axios is used for sending requests to the server, facilitating seamless communication between the frontend and backend.
- Material UI: The Material UI library is employed to create a visually appealing and responsive theme throughout the web application, ensuring a user-friendly experience across various screen sizes.

## Installation and Setup

To run the Anime Social Media Site locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd anime-social-media-site`
3. Install the dependencies: `npm install`
4. Set up environment variables:
   - Create a `.env` file in the project's root directory.
   - Define the required environment variables, such as database connection details, Firebase credentials, etc.
5. Start the server: `npm start`
6. Open a new terminal window.
7. Navigate to the client directory: `cd client`
8. Install the client dependencies: `npm install`
9. Start the client: `npm start`
10. Access the application by visiting `http://localhost:5173` in your web browser.

## Deployment

To deploy the Anime Social Media Site to a live server, follow these steps:

1. Set up a hosting environment or platform (e.g., Heroku, AWS, etc.).
2. Configure the necessary environment variables for the production environment.
3. Build the client code: `npm run build`
4. Start the server in production mode: `npm run start:prod`

## Contributing

Contributions to the Anime Social Media Site project are welcome! If you'd like to contribute, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request outlining your changes.

## License

This project is licensed under the MIT
