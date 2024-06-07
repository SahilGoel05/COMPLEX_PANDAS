# Complex_Pandas

# Project Blurb:

Complex Pandas is the ultimate to-do list app designed to streamline your productivity. With Complex Pandas, you can easily create personalized notes, set priorities, and organize your tasks into distinct to-do lists. Whether you're juggling work projects, personal errands, or study schedules, Complex Pandas offers a seamless and intuitive interface to keep you on track and ahead of your goals.

# UI Protoype:

https://www.figma.com/proto/x7GG88k6zVWjODIiF4JjYm/TE2?page-id=0%3A1&node-id=108-160&viewport=66%2C20610%2C0.54&t=qt1gB1Y3I2shP7oF-1&scaling=scale-down&starting-point-node-id=108%3A160&show-proto-sidebar=1


# Set-up dev mode instructions

Once you've cloned this workspace, run `npm install --force` to install necessary dependencies. (Due to mish mash between trying to use `yarn` and `npm`, along with annoying peer dependencies that we couldn't figure out, this is the best way to go about setting up the repo. Not perfect, but it works :)

From there, to ensure everything is working, run in development mode in the browser with `npm start` in the parent `COMPLEX_PANDAS` directory.

# Prettier Configuration

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

## Documentation

- [UML Class Diagram](docs/UML_Class_Diagram.md)

# Auth Sequence Diagrams

![Sign Up Auth Sequence Diagram](https://github.com/SahilGoel05/COMPLEX_PANDAS/assets/65931611/422b4072-13cf-407e-8815-89ee700c951c)
![Sign In Auth Sequence Diagram](https://github.com/SahilGoel05/COMPLEX_PANDAS/assets/65931611/b5fe2364-c883-496f-85d3-f72608dcd0f8)
