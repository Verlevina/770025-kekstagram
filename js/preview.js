'use strict';
(function () {
  var commentsLength = 5;
  var n = 1;
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  // Покажите элемент .big-picture, удалив у него класс .hidden и заполните его данными из первого элемента сгенерированного вами массива:

  window.createBigPicture = function (CURRENT_PHOTO, photos) {
    var socialComments = window.util.bigPicture.querySelector('.social__comments');
    var commentFragment = document.createDocumentFragment();
    var socialComment = socialComments.querySelector('.social__comment');
    // удаление шаблонных элементов

    window.util.deleteChildren(socialComments, false);
    window.util.bigPicture.querySelector('.big-picture__img').querySelector('img').setAttribute('src', photos[CURRENT_PHOTO].url);
    window.util.bigPicture.querySelector('.likes-count').textContent = photos[CURRENT_PHOTO].likes;
    window.util.bigPicture.querySelector('.comments-count').textContent = photos[CURRENT_PHOTO].comments.length;
    window.util.bigPicture.querySelector('.social__caption').textContent = window.data.getDescription();
    window.util.bigPicture.querySelector('.big-picture__cancel').addEventListener('click', function () {
      window.util.hideElements(window.util.bigPicture);
      document.addEventListener('keydown', window.util.onBigPictureEsc);
    });

    var addCommentFragment = function (numberOfComment) {
      var commentTemplate = socialComment.cloneNode(true);
      commentTemplate.querySelector('p').textContent = photos[CURRENT_PHOTO].comments[numberOfComment];
      commentTemplate.querySelector('img').setAttribute('src', window.data.getAvatarUrl());
      return commentTemplate;
    };
    for (var j = 0; j < commentsLength * n; j++) {
      if (photos[CURRENT_PHOTO].comments[j]) {
        commentFragment.appendChild(addCommentFragment(j));
      }
    }
    socialComments.appendChild(commentFragment);
  };

  // Спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader,
  // добавив им класс .visually-hidden.
  window.util.hideElements(socialCommentCount);
  window.util.hideElements(commentsLoader);
})();
