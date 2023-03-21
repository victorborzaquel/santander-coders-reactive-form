const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

const $on = (target, event, callback) => {
  target.addEventListener(event, callback);
}
