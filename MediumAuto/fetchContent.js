
const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs'); // Import the 'fs' module


var blogs = [];

var titles = require('./inputs/titles.json');

var config = new Configuration({
  apiKey: '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'
});

var openai = new OpenAIApi(config);

var getContent = async (title) => {
  const res = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: title,
    max_tokens: 2000
  });
  console.log(res);
  return res;
}
  titles.map(title => {
    Promise.resolve(getContent(title)).then(res => {
      blogs.push({
        title: title,
        content: res.data.choices[0].text
      });
      if(blogs.length === titles.length){
        // Write the JSON data to a file
        fs.writeFile('blogs.json', JSON.stringify(blogs), (err) => {
            if (err) {
            console.error(err);
            } else {
            console.log('Data written to file successfully');
            }
        });
      }
    })
  }); 
