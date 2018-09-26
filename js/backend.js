'use strict';
(function () {
  // var requestInfo = {
  //   load: {
  //     URL: 'https://js.dump.academy/kekstagram/data',
  //     type: 'GET',
  //   },
  //   upload: {
  //     URL: 'https://js.dump.academy/kekstagram',
  //     type: 'POST',
  //   }
  // };
  // for (var key in requestInfo) {
  //   window[key] = function (onLoad, onError, data) {
  //
  //     var xhr = new XMLHttpRequest();
  //     xhr.responseType = 'json';
  //
  //     xhr.open(requestInfo[key].type, requestInfo[key].URL);
  //     xhr.timeout = 10000;
  //     xhr.addEventListener('load', function () {
  //       if (xhr.status === 200) {
  //         onLoad(xhr.response);
  //       } else {
  //         onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
  //       }
  //     });
  //
  //     xhr.addEventListener('error', function () {
  //       onError('Произошла ошибка соединения');
  //     });
  //     xhr.addEventListener('timeout', function () {
  //       onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  //     });
  //     if (data) {
  //       xhr.send(data);
  //     }
  //   };
  // }


  window.load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/kekstagram/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);
    xhr.timeout = 10000;
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.send();
  };
  window.upload = function (data, onLoad, onError) {
    window.loadMessages.onLoadMessage(true);
    var URL = 'https://js.dump.academy/kekstagram';
    var xhr = new XMLHttpRequest();

    xhr.responceType = 'multipart/form-data';
    xhr.open('POST', URL);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.send(data);
  };
})();
