const { exec } = require('child_process');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Import the 'fs' module

const corsOptions = {
  origin: '*'
};


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  
});

app.get('/generateblogs', (req, res) => {
    exec('node fetchContent.js', (error, stdout, stderr) => {
        if (error) {
        console.error(`exec error: ${error}`);
        res.error('500');
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.send({
            status: 200,
            stdout: stdout,
            stderr: stderr
        });
    });
});

app.get('/publish', (req, res) => {
    exec('npx cypress open', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            res.error('500');
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.send({
            status: 200,
            stdout: stdout,
            stderr: stderr
        });
    });
});

app.post('/settitles', (req, res) => {
    fs.writeFile('./inputs/titles.json', JSON.stringify(req.body.titles), (err) => {
        if (err) {
        console.error(err);
        res.error({
            status: 500,
            message: 'failure'
        });
        } else {
            res.send({
                status: 200,
                message: 'success'
            });
        }
    })
});

app.post('/setloginlink', (req, res) => {
    fs.writeFile('./inputs/login_link.json', JSON.stringify(req.body), (err) => {
        if (err) {
        console.error(err);
        res.error({
            status: 500,
            message: 'failure'
        });
        } else {
            res.send({
                status: 200,
                message: 'success'
            });
        }
    })
});

app.get('/contact', (req, res) => {
  res.send('This is the contact page');
});

app.listen(9000, () => {
  console.log('Server is listening on port 9000');
});
