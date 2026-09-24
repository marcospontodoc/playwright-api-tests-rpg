# playwright-api-tests-rpg

# RPG API - Automated Tests

Automated API testing project for the **RPG API**, developed with **Playwright and TypeScript**.

The project validates API behavior and also performs direct database checks in PostgreSQL to ensure that API operations correctly affect the database.

## Technologies

* TypeScript
* Playwright
* PostgreSQL
* Node.js
* Faker.js
* Spring Boot API

## Project Structure

```text
playwright-api-tests-rpg/
│
├── api/
│   ├── CharacterApi.ts
│   └── PlayerApi.ts
│
├── builders/
│   ├── CharacterBuilder.ts
│   └── PlayerBuilder.ts
│
├── database/
│   └── DatabaseClient.ts
│
├── fixtures/
│   └── test.ts
│
├── models/
│   ├── Character.ts
│   └── Player.ts
│
├── tests/
│   ├── Character/
│   └── Player/
│
├── .env
├── package.json
└── playwright.config.ts
```

## Prerequisites

Before running the tests, you need to have the following installed:

* Node.js
* PostgreSQL
* Java 21
* Maven

You also need to have the **RPG API project** and its **PostgreSQL database** available locally.
https://github.com/marcospontodoc/RPG-API

### API and Database

This project does not contain the API itself. The tests communicate with the RPG API through HTTP requests and validate the resulting data directly in PostgreSQL.

Therefore, **the API and database must be running before executing the tests**.

The required environment is:

```text
Playwright Tests
       │
       │ HTTP Requests
       ▼
   RPG API
       │
       │ JDBC
       ▼
 PostgreSQL
```

Make sure that:

1. The PostgreSQL database is created and running.
2. The RPG API is configured to connect to the database.
3. The RPG API is running before starting the Playwright tests.

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Enter the project directory:

```bash
cd playwright-api-tests-rpg
```

Install the dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Environment Variables

Create a `.env` file with the PostgreSQL connection information:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=rpg_database
DB_USER=postgres
DB_PASSWORD=your_password
```

The values must match the PostgreSQL configuration used by the RPG API.

## Running the API

Before running the tests, start the RPG API.

From the API project directory:

```bash
mvn spring-boot:run
```

The API should be available at:

```text
http://localhost:8080
```

Keep the API running while executing the Playwright tests.

## Running the Tests

Run all tests:

```bash
npx playwright test
```

Run the tests with the browser UI:

```bash
npx playwright test --headed
```

Run a specific test file:

```bash
npx playwright test tests/Character/create-character.spec.ts
```

## Database Validation

In addition to validating HTTP responses, the tests query PostgreSQL directly using the `pg` library.

For example, after creating a character through the API, the test verifies that the character was actually persisted:

```sql
SELECT *
FROM character
WHERE id_character = $1;
```

This allows the tests to validate both:

* API response
* Database state

For negative scenarios, the tests also verify that invalid requests do not create records in the database.

## Test Coverage

The project includes API tests for resources such as:

### Players

* Create player with valid data
* Invalid email
* Empty email
* Empty name
* Duplicate email
* Database persistence validation

### Characters

* Create character with valid data
* Empty character name
* Non-existent class
* Invalid level
* Database persistence validation


## Test Reports

After running the tests, Playwright can generate an HTML report:

```bash
npx playwright show-report
```

The report provides information about:

* Passed tests
* Failed tests
* Execution time
* Test steps
* Errors
* Request/response information

## Purpose

The main goal of this project is to practice **API automation and database validation**, ensuring that API operations produce the expected results not only in their HTTP responses but also in the underlying PostgreSQL database.
