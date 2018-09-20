'use strict';
(function () {

  var main = document.querySelector('main');
  // сообщение о загрузке
  var loadMessageTemplate = document.querySelector('#messages')
    .content
    .querySelector('div');
  var message = loadMessageTemplate.cloneNode(true);
  // сообщение об успехе

  var loadSuccessMessageTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var successMessage = loadSuccessMessageTemplate.cloneNode(true);

  // сообщение об ошибке

  var loadErrorMessageTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var errorMessage = loadErrorMessageTemplate.cloneNode(true);

  var errorButtonTryAgain = errorMessage.querySelector('button:first-child');
  var ErrorButtonApplyAnotherFile = errorMessage.querySelector('button:last-child');


  window.loadMessages = {

    onLoadMessage: function () {
      window.loadMessages.addMessage(message);
    },
    deleteOnLoadMessage: function () {
      this.deleteMessage(message);
    },
    onLoadSuccessMessage: function () {
      window.loadMessages.addMessage(successMessage);
    },
    onLoadErrorMessage: function () {
      window.loadMessages.addMessage(errorMessage);
    },
    deleteMessage: function (currentMessage) {
      main.removeChild(currentMessage);
    },
    addMessage: function (currentMessage) {
      main.appendChild(currentMessage);
    }
  };
}());
