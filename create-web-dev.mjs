#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';

async function generateFiles(projectName) {
    // Determine the current directory
    const currentDirectory = process.cwd();

    // Create a directory for the project (use the provided name or a default)
    const projectDirectory = path.join(currentDirectory, projectName || 'my-web-project');
    fs.mkdirSync(projectDirectory, { recursive: true });

    // Create index.html
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>${projectName || 'Web Dev Start'}</title>
</head>
<body>
    <script src="index.js"></script>
</body>
</html>
`;

    fs.writeFileSync(path.join(projectDirectory, 'index.html'), htmlContent);

    // Create style.css
    const cssContent = `
/* Add your CSS styles here */
body {
    background-color: #f0f0f0;
}
`;

    fs.writeFileSync(path.join(projectDirectory, 'style.css'), cssContent);

    // Create index.js
    const jsContent = `
// Add your JavaScript code here
console.log('Hello from index.js');
`;

    fs.writeFileSync(path.join(projectDirectory, 'index.js'), jsContent);

    console.log(chalk.green.bold('Web development files created successfully'));
    console.log(chalk.italic.magentaBright(figlet.textSync(projectName || 'Web Dev Start')));
    
    console.log(chalk.greenBright(`To see the output run ${chalk.blueBright('index.html')} file`));
    console.log(chalk.greenBright('Enjoy coding!'));
}

// Prompt the user for the project name
inquirer
    .prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'Name of the project? (Press Enter for default): ',
        },
    ])
    .then((answers) => {
        generateFiles(answers.projectName);
    });
