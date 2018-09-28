document.addEventListener('DOMContentLoaded', function() {
  const yourUUID = '8c0bf933-f709-43dc-9830-325a3c5b9e20';
  const imageURL = `https://randopic.herokuapp.com/images/${yourUUID}`;
  let imageId = 879;
  const likeURL = `https://randopic.herokuapp.com/likes/`;
  const commentsURL = `https://randopic.herokuapp.com/comments/`;

  const likeButton = document.querySelector('#like_button');
  const commentForm = document.querySelector('#comment_form');
  const comments = document.querySelector('#comments');

  init();

  function init() {
    fetch(imageURL).then(res => res.json()).then(renderInfo);
  }

  function renderInfo(imgObject) {
    let image = document.querySelector('#image');
    let name = document.querySelector('#name');
    let likes = document.querySelector('#likes');
    image.src = imgObject.url;
    name.innerText = imgObject.name;
    likes.innerText = imgObject.like_count;
    imgObject.comments.forEach(comment => renderComment(comment.content));
  }

  function renderComment(commentText) {
    const li = document.createElement('li');
    li.innerText = commentText;
    comments.append(li);
  }

  likeButton.addEventListener('click', () => {
    numLikes = parseInt(event.target.previousElementSibling.firstElementChild.innerText) + 1;
    event.target.previousElementSibling.firstElementChild.innerText = numLikes;
    updateLikes(numLikes);
  });

  commentForm.addEventListener('submit', () => {
    event.preventDefault();
    const comments = document.querySelector('#comments');
    const newComment = event.target.children[0].value;
    renderComment(newComment);
    addComment(newComment);
  });

  function updateLikes(numLikes) {
    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: imageId})
    });
  }

  function addComment(newComment) {
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: imageId, content: newComment})
    });
  }
});
