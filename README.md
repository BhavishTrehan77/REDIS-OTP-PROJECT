# Redis OTP Authentication API

A backend project built with Node.js, Express.js, MongoDB, and Redis to implement OTP-based authentication. The project demonstrates how Redis can be used for temporary data storage, OTP expiration, and request rate limiting.

## Features

* User registration with OTP verification
* Generate and verify 6-digit OTP
* Store OTP in Redis with expiration (TTL)
* Prevent OTP spam using Redis rate limiting
* JWT generation after successful verification
* Layered backend architecture
* Email service integration for sending OTPs

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Redis
* ioredis
* JWT
* Nodemailer

## Project Structure

```text
Redis-OTP-Project
│
├── config
│   ├── db.js
│   ├── mail.js
│   └── redis.js
│
├── controllers
│   └── otp.controllers.js
│
├── helper
│   ├── jwt.helper.js
│   └── otp.helper.js
│
├── models
│   └── User.models.js
│
├── routes
│   └── otp.routes.js
│
├── services
│   └── otp.services.js
│
├── utils
│
├── .env
├── .gitignore
├── package.json
└── server.js
```

## Installation

Clone the repository

```bash
git clone https://github.com/BhavishTrehan77/REDIS-OTP-PROJECT.git
```

Move into the project directory

```bash
cd REDIS-OTP-PROJECT
```

Install dependencies

```bash
npm install
```

Start the Redis server

```bash
redis-server
```

Run the project

```bash
npm run dev
```

or

```bash
node server.js
```

## Environment Variables

Create a `.env` file in the root directory.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

REDIS_HOST=localhost
REDIS_PORT=6379

EMAIL=your_email
EMAIL_PASSWORD=your_email_password

JWT_SECRET=your_secret_key
```

## API Endpoints

### Send OTP

```http
POST /otp/send
```

Request

```json
{
  "email": "user@example.com"
}
```

### Verify OTP

```http
POST /otp/verify
```

Request

```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

## Redis Concepts Used

* Redis Strings
* TTL (Time To Live)
* EXPIRE
* INCR
* Rate Limiting
* Temporary Data Storage

## What I Learned

While building this project, I practiced:

* Connecting Node.js with Redis
* Storing temporary data using Redis
* Implementing OTP expiration with TTL
* Building rate limiting using Redis counters
* Organizing backend code using Controllers and Services
* Using JWT for authentication
* Sending OTP emails with Nodemailer

## Future Improvements

* Password reset using OTP
* Refresh Token authentication
* Docker support
* Unit testing with Jest
* API documentation using Swagger

## Author

**Bhavish Trehan**

GitHub: https://github.com/BhavishTrehan77
