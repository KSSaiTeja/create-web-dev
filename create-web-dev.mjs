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
        <title>Hello World Interactive</title>
    </head>
    <body>
        <div class="container">
            <h1 id="message">Hello, World!</h1>
            <button id="changeMessage">Change Message</button>
        </div>
        <script src="index.js"></script>
    </body>
    </html>
    
`;

    fs.writeFileSync(path.join(projectDirectory, 'index.html'), htmlContent);

    // Create style.css
    const cssContent = `
    body {
        font-family: Arial, sans-serif;
        background-color: #f2f2f2;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
    }
    
    .container {
        text-align: center;
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
    
    h1 {
        color: #333;
        font-size: 24px;
        margin: 10px 0;
    }
    
    button {
        background-color: #007BFF;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }
    
    button:hover {
        background-color: #0056b3;
    }
    
`;

    fs.writeFileSync(path.join(projectDirectory, 'style.css'), cssContent);

    // Create index.js
    const jsContent = `
    const messageElement = document.getElementById("message");
    const changeMessageButton = document.getElementById("changeMessage");
    changeMessageButton.addEventListener("click", () => {
    const newMessage = prompt("Enter a new message:");
    if (newMessage) {
        messageElement.textContent = newMessage;
    }
});
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
