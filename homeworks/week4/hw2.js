/* eslint-disable no-plusplus, no-use-before-define, no-shadow, object-shorthand,
camelcase, prefer-destructuring, function-paren-newline, comma-dangle */
const request = require('request');

const argv = process.argv;

function start() {
  if (!argv[3]) {
    request.get('https://lidemy-book-store.herokuapp.com/books?_limit=20',
      (error, response, body) => {
        const content = JSON.parse(body);
        for (let i = 0; i < content.length; i++) {
          console.log(`${content[i].id} ${content[i].name}`);
        }
      }
    );
    return;
  }

  if (argv[4]) {
    const input_id = argv[argv.length - 2];
    const input_name = argv[argv.length - 1];
    request.patch(`https://lidemy-book-store.herokuapp.com/books/${input_id}`,
      {
        form: { name: input_name }
      }
    );
    console.log(`你已將 id = ${input_id} 的書名更改成 ${input_name}！`);
    return;
  }

  const input_method = argv[argv.length - 2];
  const input_id = argv[argv.length - 1];

  switch (input_method) {
    case 'read':
      doRead(input_id);
      break;
    case 'delete':
      doDelete(input_id);
      break;
    case 'create':
      doCreate(input_id);
      break;
    default:
      console.log('輸入內容有誤喔！請再試一次。');
  }

  function doRead(id) {
    request.get(`https://lidemy-book-store.herokuapp.com/books/${id}`,
      (error, response, body) => {
        const content = JSON.parse(body);
        console.log(content.name);
      }
    );
  }

  function doDelete(id) {
    request.delete(`https://lidemy-book-store.herokuapp.com/books/${id}`,
      () => {
        console.log(`你已將 id = ${id} 的書成功刪除囉！`);
      }
    );
  }

  function doCreate(name) {
    request.post('https://lidemy-book-store.herokuapp.com/books',
      {
        form: { name: name }
      }
    );
    console.log(`已成功新增 ${name}！`);
  }
}

start();
