```markdown
# 🚲 EcoWheel

EcoWheel is a modern bike rental platform that enables users to easily rent, unlock, and manage bikes through a seamless digital experience. Designed to promote eco-friendly transportation, EcoWheel combines intuitive UI, robust backend services, and secure payment systems to provide hassle-free bike rentals.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User registration and login (including Google OAuth)
- Bike catalog browsing and selection
- Rental booking with time and location selection
- Secure payment integration via PayPal
- QR code generation to unlock rentals
- Email notifications for booking status and reminders
- Admin panel for managing bikes, bookings, and users
- Monitoring tools integrated for performance and uptime
- CI/CD pipelines for automated testing and deployments

---

## Tech Stack

### Front-End

- **React.js** – UI library
- **Chakra UI** – Component library for styling
- **Axios** – HTTP client for API communication
- **Swiper** – Carousel/slider for bike showcases
- **Vite + TypeScript** – Modern build tooling
- **React QR Code** – QR code generation

### Back-End

- **NestJS (TypeScript)** – Scalable backend framework
- **Prisma** – ORM for data modeling and database access
- **PostgreSQL** – Relational database
- **Swagger** – API documentation and testing
- **Nodemailer** – Email notification service
- **JWT & Passport** – Authentication frameworks
- **Google OAuth** – Social login support
- **PayPal API** – Payment gateway integration

### DevOps & Hosting

- **PM2** – Production process manager
- **NGINX** – Reverse proxy and load balancer
- **GitHub Actions** – CI/CD automation
- **Google Cloud & DigitalOcean** – Hosting providers
- **Datadog** – Monitoring and performance analytics

---

## Installation

### Prerequisites

- Node.js (v16+ recommended)
- Yarn or npm
- PostgreSQL database server
- PM2 (optional, for production)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/hasasn_ship/EcoWheel.git
   cd EcoWheel
   ```

2. **Install Yarn**

   ```bash
   npm install -g yarn
   ```

3. **Install dependencies**

   ```bash
   yarn install
   ```

4. **Configure Database**

   Create a PostgreSQL database named `ecowheel` and set user credentials:

   - Username: `postgres`
   - Password: `apple`

5. **Run Database Migrations and Seed Data**

   ```bash
   npx prisma generate --schema=./api/prisma/schema.prisma
   npx prisma db push --schema=./api/prisma/schema.prisma
   npx ts-node ./api/prisma/seeds
   ```

   Alternatively, run:

   ```bash
   npm run migrate
   ```

6. **Start Frontend**

   ```bash
   npm run front
   ```

7. **Launch Backend API**

   ```bash
   npm run server
   ```

8. **Run Admin Panel**

   ```bash
   npm run admin
   ```

---

## Usage

1. Visit the EcoWheel frontend and **sign up** or **log in**.
2. Browse available bikes and **choose your preferred bike**.
3. Select a pickup location and rental duration.
4. Complete your booking by making a payment via PayPal.
5. Receive an email with a **QR code** to unlock your bike.
6. Use the QR code at the bike station to unlock your bike.
7. Enjoy your ride! 🚴‍♂️
8. Return your bike to a designated location.
9. Extend your rental or cancel anytime through your account dashboard.

---

## Configuration

EcoWheel uses environment variables for configuration. Create `.env` files in the relevant directories ('`root`, `frontend/`, `api/`, `admin/`) with the following variables:

### Backend (`api/.env`)

```ini
DATABASE_URL=postgresql://postgres:apple@localhost:5432/ecowheel
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
EMAIL_HOST=smtp.your-email-provider.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### Frontend (`frontend/.env`)

```ini
REACT_APP_API_URL=http://localhost:4000/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_PAYPAL_CLIENT_ID=your_paypal_client_id
```

> **Note:** Replace placeholders with your actual credentials.

---

## Contributing

We welcome contributions from the community! To contribute to EcoWheel, please follow these steps:

1. Fork the repository.
2. Create a new branch with a descriptive name: `git checkout -b feature/hassan_ship`
3. Make your changes and commit with clear messages.
4. Ensure your code passes existing tests and add new tests if applicable.
5. Push your branch to your fork: `git push origin feature/hassan_ship`
6. Open a Pull Request against the main repository’s `main` branch.

### Code Guidelines

- Follow existing code style and conventions.
- Write clear, maintainable code with comments as necessary.
- Run linters and formatters prior to submitting PRs.

### Issues

- Report bugs or request features via GitHub Issues.
- Provide detailed descriptions and steps to reproduce bugs.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact & Support

For questions, bug reports, or feedback, please open an issue or contact the maintainers directly.

---

Thank you for contributing to EcoWheel – helping make urban mobility greener and easier! 🌿🚲
```# test
