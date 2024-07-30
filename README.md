# Deel Salary Insights

This project is a coding challenge for Deel, demonstrating skills in development and test automation using Playwright with TypeScript. The repository includes automated tests for salary insights functionalities, ensuring the quality and reliability of the application.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- Automated tests using Playwright and TypeScript.
- Tests for various functionalities related to salary insights.
- Comprehensive coverage of UI components and interactions.
- Integration with CI/CD pipelines for automated testing. (WIP)

## Project Structure
```
The repository is organized as follows:
deel-salary-insights/
│
├── tests/                     # Directory for Playwright tests
│   ├── e2e/                   # End-to-end test files
│   │   ├── salaryInsights.spec.ts    # Sample test file
│   │   └── …
│   ├── pages/                 # Page Object Model files
│   │   ├── salaryInsights.page.ts      # Example page file
│   │   └── …
├── playwright.config.ts       # Playwright configuration file
├── package.json               # Project dependencies and scripts
└── README.md                  # Project documentation
```

## Installation

To set up the project locally, follow these steps:

### Prerequisites

Ensure you have the following installed:

- Node.js (version 14 or higher)
- npm (Node package manager)

### Clone the Repository

```bash
git clone https://github.com/adelstrinidad/deel-salary-insights.git
cd deel-salary-insights
```

### Install Dependencies
```bash
npm install
```

### Running Tests

After installing the dependencies, you can run the automated tests using Playwright.

### Running All Tests

To run all tests, use the following command:
```bash
npm run test
```

### Viewing Test Results

Playwright provides a built-in test reporter. You can view the results in the terminal after running the tests. For a more detailed report, you can use:
```bash
npm run report
```

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Contact

If you have any questions or suggestions, feel free to contact:

	•	Adels Trinidad: adelquis.trinidad@gmail.com
