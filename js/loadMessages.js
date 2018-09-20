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
      var successInner = document.querySelector('.success__inner');
      var onSuccessMessageClick = function (evt) {
        if (evt.target !== successInner && evt.target !== button) {
          errorMessage.removeEventListener('click', onSuccessMessageClick);
          window.loadMessages.deleteSuccessMessage();
          window.form.imgUploadForm.reset();
        }

      };
      var onDocumentPressEsc = function (evt) {
        if (evt.keyCode === window.util.ESC_KEYCODE) {
          window.loadMessages.deleteSuccessMessage();
          window.form.imgUploadForm.reset();
          document.removeEventListener('keyup', onDocumentPressEsc);
        }
      };
      document.addEventListener('keyup', onDocumentPressEsc);

      successMessage.addEventListener('click', onSuccessMessageClick);


      var onButtonClick = function () {
        errorMessage.removeEventListener('click', onSuccessMessageClick);
        window.loadMessages.deleteSuccessMessage();
        window.form.imgUploadForm.reset();

        document.removeEventListener('keyup', onDocumentPressEsc);
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
      var errorInner = document.querySelector('.error__inner');
      var onErrorMessageClick = function (evt) {
        if (evt.target !== errorInner && evt.target !== errorButtonTryAgain && evt.target !== errorButtonApplyAnotherFile) {
          errorMessage.removeEventListener('click', onErrorMessageClick);
          window.loadMessages.deleteErrorMessage();
          window.form.imgUploadForm.reset();
        }
      };
      errorMessage.addEventListener('click', onErrorMessageClick);

      var onDocumentPressEsc = function (evt) {
        if (evt.keyCode === window.util.ESC_KEYCODE) {
          window.loadMessages.deleteErrorMessage();
          window.form.imgUploadForm.reset();
          document.removeEventListener('keyup', onDocumentPressEsc);
        }
      };
      document.addEventListener('keyup', onDocumentPressEsc);


      var onButtonTryAgainClick = function () {
        errorButtonTryAgain.removeEventListener('click', onButtonTryAgainClick);
        errorMessage.removeEventListener('click', onErrorMessageClick);
        document.removeEventListener('keyup', onDocumentPressEsc);
        window.loadMessages.deleteErrorMessage();
        window.util.showElements(window.form.imgUploadOverlay);

      };

      errorButtonTryAgain.addEventListener('click', onButtonTryAgainClick);

      var onErrorButtonApplyAnotherFileClick = function () {
        errorButtonApplyAnotherFile.removeEventListener('click', onErrorButtonApplyAnotherFileClick);
        errorMessage.removeEventListener('click', onErrorMessageClick);
        document.removeEventListener('keyup', onDocumentPressEsc);
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
