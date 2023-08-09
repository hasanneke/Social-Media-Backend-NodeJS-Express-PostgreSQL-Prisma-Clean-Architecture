# Zima Blue Social Media App

## Description

This is a social media backend app built using Node.js, Express, Prisma, and PostgreSQL. The app allows users to post and comment on various topics, fostering a vibrant community.

## Features

- User registration and authentication using JSON Web Tokens (JWT).
- Create, read, update, and delete posts.
- Comment on posts and reply to comments.
- Like and react to posts and comments. 
- Real-time updates using WebSockets. (coming soon)

## Backend Setup

1. Clone the repository.

2. Install the required dependencies by running the following command inside the Node.js project directory:
   npm install

4. Create a `.env` file in the root of the Node.js project and add the following configurations:
   DATABASE_URL=your_postgres_connection_string_here
   JWT_SECRET=your_jwt_secret_here
   -- Replace `your_postgres_connection_string_here` with your PostgreSQL database connection URL and `your_jwt_secret_here` with your desired JWT secret for authentication.

5. Migrate the database schema using Prisma by running the following command:
   -- npx prisma migrate dev

6. Start the Node.js server:
   -- npm start

The app should now be running on your device/emulator.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).



