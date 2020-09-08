/* eslint-disable no-plusplus, no-use-before-define, no-shadow, function-paren-newline,
comma-dangle, prefer-destructuring, no-alert, no-continue, camelcase, no-undef,
no-restricted-syntax, arrow-parens, quote-props, arrow-parens, import/prefer-default-export */

export function init(options) {
  const siteKey = options.siteKey;
  const apiUrl = options.apiUrl;
  const containerElement = $(options.containerSelector);
  let currentId = null;
  const LoadMoreButtonHtml = getLoadMoreButton(siteKey);
  const formTemplate = getFormTemplate(siteKey);
  const load_more_selector = `.${siteKey}_load_more`;
  const add_comment_form_selector = `.${siteKey}_add_comment_form`;
  const comments_selector = `.${siteKey}_comments`;
  containerElement.append(formTemplate);
  getComment();

  $(comments_selector).on('click', load_more_selector, () => {
    $(load_more_selector).hide();

    $.ajax({
      type: 'GET',
      url: `${apiUrl}/comment.php?siteKey=${siteKey}&before=${currentId}`,
      success: (data) => {
        if (!data.ok) {
          alert(data.message);
          return;
        }
        currentId = data.discussion[data.discussion.length - 1].id;

        const comments = data.discussion;
        for (const comment of comments) {
          appendCommentToDOM($(comments_selector), comment, false);
        }
        if (currentId > 1) {
          $(comments_selector).append(LoadMoreButtonHtml);
        }
      }
    });
  });

  $(add_comment_form_selector).submit(e => {
    e.preventDefault();
    const newComment = {
      'siteKey': siteKey,
      'nickname': $(`input[name=${siteKey}_nickname]`).val(),
      'content': $(`textarea[name=${siteKey}_content]`).val()
    };

    $.ajax({
      type: 'POST',
      url: `${apiUrl}/add_comment.php`,
      data: newComment
    }).done((data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      $(`input[name=${siteKey}_nickname]`).val('');
      $(`textarea[name=${siteKey}_content]`).val('');
      appendCommentToDOM($(comments_selector), newComment, true);
    });
  });

  function getComment() {
    $.ajax({
      type: 'GET',
      url: `${apiUrl}/comment.php?siteKey=${siteKey}`,
      success: (data) => {
        if (!data.ok) {
          alert(data.message);
          return;
        }
        currentId = data.discussion[data.discussion.length - 1].id;

        const comments = data.discussion;
        for (const comment of comments) {
          appendCommentToDOM($(comments_selector), comment, false);
        }
        if (currentId > 1) {
          $(comments_selector).append(LoadMoreButtonHtml);
        }
      }
    });
  }

  function appendCommentToDOM(container, comment, isPrepend) {
    const contentHTML = `
      <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" style="opacity: 1;">
        <div class="toast-header">
          <span class="rounded mr-2 bg-info" style="width: 15px; height: 15px;"></span>
          <strong class="mr-auto">${escape(comment.nickname)}</strong>
        </div>
        <div class="toast-body">
          ${escape(comment.content)}
        </div>
      </div>
    `;
    if (isPrepend) {
      container.prepend(contentHTML);
    } else {
      container.append(contentHTML);
    }
  }

  function getFormTemplate(prefix) {
    return `
      <div>
        <form class="${prefix}_add_comment_form" method="post">
          <div class="container">
            <div class="row">
              <div class="input-group mb-3 mt-5 col-4">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-info text-white shadow-sm" id="basic-addon1">暱稱</span>
                </div>
                <input type="text" name="${prefix}_nickname" class="form-control border-info shadow-sm" aria-label="Username" aria-describedby="basic-addon1">
              </div>
            </div>
            <div class="row">
              <div class="input-group col-10">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-info text-white shadow-sm">留言</span>
                </div>
                <textarea name="${prefix}_content" class="form-control border-info shadow-sm" aria-label="With textarea"></textarea>
              </div>
              <div class="col-2">
                <input type="submit" class="btn btn-info mt-3 shadow-sm"/>
              </div>
            </div>
            <hr class="mt-5 mb-5 bg-info">
          </div>
        </form>
        <div class="${prefix}_comments container">
        </div>
      </div>
    `;
  }

  function getLoadMoreButton(prefix) {
    return `<button class='${prefix}_load_more btn btn-info'>載入更多</button>`;
  }
}

function escape(string) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match) => (map[match]));
}
