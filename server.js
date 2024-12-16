const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router({});
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/api/execute', (req, res) => {
  const {code, language} = req.body;
  console.log(code);
  console.log(language);

  let output = '';
  let error = '';

  if (language === 'javascript') {
    try {
      eval(code);
      output = 'Hello, world! от JS';
    } catch (err) {
      error = `SyntaxError: ${err.message}`;
    }
  } else if (language == 'python') {
    try {
      console.log(5555);

      output = 'Hello, world! от python\n';

    } catch (err) {
      error = `SyntaxError: ${err.message}`;
    }
  } else {
    // Пример для других языков
    error = 'Language not supported';
  }

  // Возврат мокового ответа
  if (error) {
    res.jsonp({
      status: 'error',
      error: error,
    });
  } else {
    res.jsonp({
      status: 'success',
      output: output,
    });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});
