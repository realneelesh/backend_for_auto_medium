const http = require('http');
const fs = require('fs');
const cors = require('cors');
const {spawn} = require('child_process');
const port = 3001;

const requestHandler = (request, response) => {
  let body = [];
  fs.unlink('image.png', (err) => {
    if (err) {
        throw err;
    }
  });
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', async () => {
    body = Buffer.concat(body).toString();
    let image = body.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (image) {
      let buffer = new Buffer.from(image[2], 'base64');

      // jpeg and png are allowed, jpeg extention converted to png here, png stays png
      await fs.writeFileSync(`image.png`, buffer);

      const python = spawn('python3', ['script.py']);

       // collect data from script
      python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        response.end(data);
      });
    } else {
      response.end('Invalid image format');
    }
  });
};

const server = http.createServer((req, res) => {
    cors()(req, res, () => {
      requestHandler(req, res);
    });
  })

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});