const inquirer = require('inquirer');
const fs = require('fs')
const { generateSvg } = require('./lib/generateSvg');
const { makeShape } = require('./lib/makeShape');

// Prompt the user for input
inquirer
  .prompt([
    { type: 'input', name: 'logoName', message: 'Please enter text (max 3 letters)' },
    { type: 'input', name: 'textColour', message: 'Enter text color' },
    { type: 'input', name: 'logoColour', message: 'Enter background color' },
    { type: 'list', name: 'logoShape', message: 'Choose logo shape', choices: ['triangle', 'circle', 'square'] },
  ])
  .then((data) => {
    const svgPath = './dist/logo.svg';

    // Create the final logo shape based on user input
    const finalLogo = makeShape(data);

    // Generate the SVG logo and write it to a file
    fs.writeFile(svgPath, generateSvg(finalLogo), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Generated logo.svg');
      }
    });
  })
  .catch((err) => console.error(err));

  