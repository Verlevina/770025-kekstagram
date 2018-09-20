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


  window.loadMessages = {

    onLoadMessage: function () {
      window.loadMessages.addMessage(message);
    },
    deleteOnLoadMessage: function () {
      this.deleteMessage(message);
    },
    onLoadSuccessMessage: function () {
      window.loadMessages.addMessage(successMessage);
      var button = successMessage.querySelector('button');
      var onButtonClick = function () {
        window.loadMessages.deleteSuccessMessage();
        button.removeEventListener('click', onButtonClick);
      };
      button.addEventListener('click', onButtonClick);
    },
    deleteSuccessMessage: function () {
      this.deleteMessage(successMessage);
    },
    onLoadErrorMessage: function () {
      window.loadMessages.addMessage(errorMessage);
      var errorButtonTryAgain = errorMessage.querySelector('button:first-child');
      var errorButtonApplyAnotherFile = errorMessage.querySelector('button:last-child');
      var onButtonTryAgainClick = function () {
        errorButtonTryAgain.removeEventListener('click', onButtonTryAgainClick);
        window.loadMessages.deleteErrorMessage();
        window.util.showElements(window.form.imgUploadOverlay);

      };

      errorButtonTryAgain.addEventListener('click', onButtonTryAgainClick);
      var onErrorButtonApplyAnotherFileClick = function () {
        errorButtonApplyAnotherFile.removeEventListener('click', onErrorButtonApplyAnotherFileClick);
        window.loadMessages.deleteErrorMessage();
        window.form.imgUploadForm.reset();

      };
      errorButtonApplyAnotherFile.addEventListener('click', onErrorButtonApplyAnotherFileClick);
    },

    deleteErrorMessage: function () {
      this.deleteMessage(errorMessage);
    },
    deleteMessage: function (currentMessage) {
      main.removeChild(currentMessage);
    },
    addMessage: function (currentMessage) {
      main.appendChild(currentMessage);
    }
  };
}());
