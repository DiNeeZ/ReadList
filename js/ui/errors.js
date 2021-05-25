const sadIcon = require('../../images/sad.png');

export class Error {

  static showApiErrorMsg(err, el) {
    const errEl = `<li class="search__results-error error">${err}</li>`;

    el.innerHTML = errEl;
  }

  static showEmptyResultMsg(el) {
    el.innerHTML =
      `<li class="search__results-error error">
        <img src=${sadIcon} class="error__icon"/>
        <p class="error__text">Nothing Was Found</p>
      </li>`;
  }

}