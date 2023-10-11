import inquirer from 'inquirer';
import { SVG, registerWindow } from '@svgdotjs/svg.js';

const fs = require('fs');
const inquirer = require('inquirer');
const { SVG, registerWindow } = require('@svgdotjs/svg.js');

// Initialize SVG.js
registerWindow(global, global.document);

// Create an SVG canvas
const canvas = SVG().size(400, 200);

inquirer.prompt([
  {
    type: 'list',
    name: 'shape',
    message: 'Select a shape for your logo:',
    choices: ['Circle', 'Square', 'Triangle'],
  },
  {
    type: 'input',
    name: 'text',
    message: 'Enter the text for your logo:',
  },
  {
    type: 'input',
    name: 'color',
    message: 'Enter a color (e.g., #FF5733):',
  },
]).then((answers) => {
  // Create the selected shape with the provided color
  const shape = canvas.select('body').ellipse(100, 100);

  if (answers.shape === 'Square') {
    shape.rect(100, 100);
  } else if (answers.shape === 'Triangle') {
    shape.polygon('50,0 100,100 0,100');
  }

  shape.fill(answers.color);
  shape.text(answers.text).move(10, 10).font({ size: 20 });

  // Save the SVG to a file
  fs.writeFileSync('logo.svg', canvas.svg());
  console.log('Logo saved as logo.svg');
});
