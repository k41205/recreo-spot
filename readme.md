# RecreoSpot

## Description

It's a full-stack web app developed for a Full-stack Development exam. It's been built using an hybrid architecture between MVC and API.

The backend stack is based on:

- Node.js with Hapi: to create a server and manage response/request exchanges between server and client.
- Firebase: I relied on Firestore SDK Admin technology to build the database.
- Joi: to validate payload requests, response objects, providing at the same time documentation for the API, along with Swagger.
- JWT: tokens provided through HTTP-only cookies, being not accessible via JavaScript running in the browser, therefore mitigating the risk of Cross-Site Scripting (XSS) attacks.
- Handlebars: as template engine for views server-side rendering.
- API: for future client implementions and already in some for CRUD operations.

The frontend stack is based on plain JavaScript and CSS, being this the base for a further project where will be built the same application with Svelte framework.

Developer tools used during the development:

- semantic-release in CI/DI with GitHub Actions to facilitate and automatize versioning and changelog.
- Mocha along with Chai to write Behaviour-driven development (BDD) tests.

### Admin View - Dashboard with analytics

![alt text](image.png)

### User View - Dashboard

![alt text](image-1.png)

## How it works

The app is reachable at this link: https://recreo-spot.onrender.com/

Disclaimer: This application is hosted on Render using a free plan. Please note that initial requests may experience delays of 50 seconds or more due to the hosting service's startup time.

For the login you can signup and create your own user or you can experience the app with these already created users:

- `admin@example.com` `root12`
- `mod@example.com` `root12`
- `user1@example.com` `123456`
- `user2@example.com` `123456`
- `user3@example.com` `123456`
