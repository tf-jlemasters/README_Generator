// Packages needed for this application
const inquirer = require("inquirer");
const fs = require('fs');
const axios = require("axios");
const generate = require('./utils/generateMarkdown');
// Array of questions for user input
const questions = [ {
    type: "input",
    name: "title",
    message: "Input your project title"
},
{
    type: "input",
    name: "description",
    message: "Provide your project's description"
},
{
    type: "input",
    name: "installation",
    message: "Provide the instructions for installation"
},
{
    type: "input",
    name: "usage",
    message: "Provide the project usage"
},

{
    type: "input",
    name: "licence",
    message: "Provide the project licence"
},
{
    type: "input",
    name: "contributing",
    message: "Please list all of those that contributed"
},
{
    type: "input",
    name: "test",
    message: "Please list the project tests"
},
{
    type: "input",
    name: "username",
    message: "Input your github user name"
},
{
    type: "input",
    name: "repo",
    message: "Input your repo link"
},
{
    type: "input",
    name: "email",
    message: "Input your GitHub email address"
},
];

// Function to write README file
function writeToFile(fileName, data) {}
inquirer
    .prompt(questions)
    .then(function(data){
        const queryUrl = `https://api.github.com/users/${data.username}`;

        axios.get(queryUrl).then(function(res) {
            
            const githubInfo = {
                githubImage: res.data.avatar_url,
                email: res.data.email,
                profile: res.data.html_url,
                name: res.data.name
            };
            
        fs.writeFile("README.md", generate(data, githubInfo), function(err) {
            if (err) {
            throw err;
            };
    
            console.log("New README file created with success!");
        });
        });

});

