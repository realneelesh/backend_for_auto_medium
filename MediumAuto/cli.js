#!/usr/bin/env node

const { exec } = require('child_process');
const commander = require('commander');
 

  commander
  .command('listtitles')
  .description('takes comma separated list of titles and stores them in an array')
  .action(() => { 
      const titles = require('./inputs/titles.json');
      console.log(titles);
  });

  commander
  .command('listblogs')
  .description('takes comma separated list of titles and stores them in an array')
  .action(() => { 
  console.log("gggg");

      const blogs = require('./blogs.json');
      console.log(blogs);
});

commander
.command('publish')
.description('Takes the login link and starts to publish blogs')
.action((link) => { 
    exec('npx cypress open', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
});


commander
  .command('generateblogs')
  .description('takes comma separated list of titles and stores them in an array')
  .action(() => {
    exec('node fetchContent.js', (error, stdout, stderr) => {
        if (error) {
        console.error(`exec error: ${error}`);
        return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
  });

commander.parse(process.argv);