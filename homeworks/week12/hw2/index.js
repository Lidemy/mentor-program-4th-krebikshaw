/* eslint-disable no-plusplus, no-use-before-define, no-shadow, function-paren-newline,
comma-dangle, prefer-destructuring, no-alert, no-continue, camelcase, dot-notation,
no-undef, eqeqeq, no-unused-vars, class-methods-use-this */

$('.create_todo').keydown((e) => {
  if (e.keyCode === 13 && e.target.value !== '') {
    todo.createTodo(e.target.value.trim());
    $('.create_todo').val('');
  }
  todo.calc();
  todo.render();
});

$('.list').on('click', 'span.switch', (e) => {
  const target = e.target.offsetParent.attributes[0].value;
  todo.switchTodo(target);
  todo.calc();
  todo.render();
});

$('.list').on('click', '.text', (e) => {
  const target = e.target.offsetParent.attributes[0].value;
  const value = e.target.innerText;
  todo.updateTodo(target, value);
});

$('.list').on('click', '.btn_delete', (e) => {
  const target = e.target.attributes[2].value;
  todo.deleteTodo(target);
  todo.calc();
  todo.render();
});

$('.filters').click((e) => {
  $('.list').html('');
  $('.selected').removeClass('selected');
  const target = e.target.text;
  if (target === 'All') {
    todo.showAllTodo();
    $('.showAll').addClass('selected');
  }
  if (target === 'Active') {
    todo.showActiveTodo();
    $('.showActive').addClass('selected');
  }
  if (target === 'Completed') {
    todo.showCompletedTodo();
    $('.showCompleted').addClass('selected');
  }
});

$('.clear_completed').click((e) => {
  todo.clearCompleted();
});

function escape(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getUrlVars() {
  const vars = {};
  const parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
    vars[key] = value;
  });
  return vars;
}

class TodoList {
  constructor(id) {
    this.id = id;
    this.cb_id = 1;
    this.countAll = 0;
    this.countActive = 0;
    this.countComplete = 0;
    this.filterKind = 'showAll';
    this.todoRepository = [{
      cb_id: 0,
      content: 'new todo',
      status: 'active'
    }];
    this.init(this.id);
  }

  init(id) {
    if (id) {
      this.checkId(id);
      this.getTodoById(id);
    }
    this.showAllTodo();
  }

  checkId(id) {
    // 檢查是否為合理的 id
    console.log(id);
  }

  getTodoById(id) {
    // 串 api 取得資料，並且把 countAll, countActive, countComplete 都設定好
    console.log(id);
  }

  createTodo(str) {
    if (!str) return;
    this.todoRepository.push({
      cb_id: this.cb_id,
      content: str,
      status: 'active'
    });
    this.showTodo(this.cb_id, str, 'active');
    this.cb_id++;
  }

  showTodo(id, content, status) {
    if (!content) return;
    if (status == 'active') {
      $('.list').append(`
      <li id="${id}">
        <div class="view">
          <input type="checkbox" id="cb_${id}"/>
          <label for="cb_${id}"><span class="switch"></span></label>
          <p class="text">${escape(content)}</p>
          <input type="button" class="btn_delete" data-value="${id}">
        </div>
      </li>
    `);
    }
    if (status == 'completed') {
      $('.list').append(`
      <li id="${id}">
        <div class="view">
          <input type="checkbox" id="cb_${id}" class="checked"/>
          <label for="cb_${id}"><span class="switch checked"></span></label>
          <p class="text checked">${escape(content)}</p>
          <input type="button" class="btn_delete" data-value="${id}">
        </div>
      </li>
    `);
    }
  }

  showAllTodo() {
    for (let i = 0; i < this.todoRepository.length; i++) {
      const item = this.todoRepository[i];
      this.showTodo(item.cb_id, item.content, item.status);
    }
    this.calc();
    this.filterKind = 'showAll';
  }

  showActiveTodo() {
    for (let i = 0; i < this.todoRepository.length; i++) {
      const item = this.todoRepository[i];
      if (item.status == 'active') {
        this.showTodo(item.cb_id, item.content, item.status);
      }
    }
    this.calc();
    this.filterKind = 'showActive';
  }

  showCompletedTodo() {
    for (let i = 0; i < this.todoRepository.length; i++) {
      const item = this.todoRepository[i];
      if (item.status == 'completed') {
        this.showTodo(item.cb_id, item.content, item.status);
      }
    }
    this.calc();
    this.filterKind = 'showCompleted';
  }

  render() {
    const temp_todo = [];
    const length = this.todoRepository.length;
    let num = 0;
    for (let i = 0; i < length; i++) {
      temp_todo.push({
        cb_id: num,
        content: this.todoRepository[i].content,
        status: this.todoRepository[i].status
      });
      num++;
    }
    this.todoRepository = temp_todo;
    this.cb_id = this.todoRepository.length;

    $('.list').html('');
    if (this.filterKind === 'showAll') {
      todo.showAllTodo();
    }
    if (this.filterKind === 'showActive') {
      todo.showActiveTodo();
    }
    if (this.filterKind === 'showCompleted') {
      todo.showCompletedTodo();
    }
    console.log(this.todoRepository);
  }

  switchTodo(id) {
    if (!id) return;
    for (let i = 0; i < this.todoRepository.length; i++) {
      const item = this.todoRepository[i];
      if (item.cb_id == id) {
        item.status = item.status === 'active' ? 'completed' : 'active';
      }
    }
    $(`#cb_${id}, #cb_${id} + label span, #cb_${id} ~ p`).toggleClass('checked');
  }

  updateTodo(id, value) {
    if (!id || !value) return;
    $(`#${id}`).html(`
      <div class="view">
        <input type="checkbox" id="cb_${id}"/>
        <label for="cb_${id}"><span class="switch"></span></label>
        <input type="text" class="update" value="${value}"/>
        <input type="button" class="btn_delete" data-value="${id}">
      </div>
    `);
    $(`#${id} .update`).keydown((e) => {
      if (e.keyCode === 13 && e.target.value !== '') {
        $(`#${id}`).html(`
          <div class="view">
            <input type="checkbox" id="cb_${id}"/>
            <label for="cb_${id}"><span class="switch"></span></label>
            <p class="text">${escape(e.target.value.trim())}</p>
            <input type="button" class="btn_delete" data-value="${id}">
          </div>
        `);
        for (let i = 0; i < this.todoRepository.length; i++) {
          const item = this.todoRepository[i];
          if (item.cb_id == id) {
            item.content = e.target.value.trim();
            item.status = 'active';
          }
        }
      }
    });
  }

  deleteTodo(id) {
    if (!id) return;
    for (let i = 0; i < this.todoRepository.length; i++) {
      if (this.todoRepository[i].cb_id == id) {
        this.todoRepository.splice(i, 1);
      }
    }
    $(`#${id}`).remove();
  }

  clearCompleted() {
    const temp_todo = [];
    const length = this.todoRepository.length;
    for (let i = 0; i < length; i++) {
      if (this.todoRepository[i].status === 'active') {
        temp_todo.push(this.todoRepository[i]);
      }
    }
    this.todoRepository = temp_todo;
    this.calc();
    this.render();
  }

  calc() {
    let temp_all = 0;
    let temp_active = 0;
    let temp_completed = 0;
    for (let i = 0; i < this.todoRepository.length; i++) {
      if (this.todoRepository[i].status === 'active') {
        temp_active++;
      }
      if (this.todoRepository[i].status === 'completed') {
        temp_completed++;
      }
      temp_all++;
    }
    this.countAll = temp_all;
    this.countActive = temp_active;
    this.countComplete = temp_completed;
    $('.todo_count strong').text(`${this.countActive}`);
  }
}
const todo = new TodoList(getUrlVars()['id']);

/*
每一次重建 todoRep 都把 cb_xx 序號重設，cb__xx 不用存進後端
從後端把資料拿過來時，再重新給一次 cb_xx 編號
*/
