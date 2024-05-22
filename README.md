# Complex_Pandas

#### Set-up instructions

Once you've cloned this workspace, run `yarn install` to install necessary dependencies.

From there, to run in development mode in the browser, run `npm start` in the parent `COMPLEX_PANDAS` directory.


#### Prettier Configuration

Contributing

 [Prettier](https://prettier.io/) for code formatting and [ESLint](https://eslint.org/) for linting. Please ensure your code adheres to these standards before submitting a pull request.

Our Prettier configuration is defined in the `prettier.config.js` file located in the root of the project. Here's a sample configuration:

```javascript
module.exports = {
  semi: true,
  trailingComma: "es5",
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
};

```

We primarily use VSCODE for development:

- Install Extensions for Prettier and ESLint


To check formatting: npm run prettier:check
To format code: npm run prettier:write

To lint code: npm run lint

Our goal is to be similiar to the AirBNB style guide:

https://airbnb.io/javascript/react/

#### Auth Sequence Diagrams

![Sign Up Auth Sequence Diagram](https://github.com/SahilGoel05/COMPLEX_PANDAS/assets/65931611/422b4072-13cf-407e-8815-89ee700c951c)
![Sign In Auth Sequence Diagram](https://github.com/SahilGoel05/COMPLEX_PANDAS/assets/65931611/b5fe2364-c883-496f-85d3-f72608dcd0f8)
