function addComment() {
  const backgroundInput = document.getElementById('backgroundInput');
  const userLocationInput = document.getElementById('userLocationInput');
  const commentInput = document.getElementById('commentInput');
  const userLocation = userLocationInput.value.trim();
  const commentText = commentInput.value.trim();
  const loggedInUser = localStorage.getItem('loggedInUser') || 'New Comment';
  const profileImage = getUserProfileImage(loggedInUser);

  if (backgroundInput.files && backgroundInput.files[0] && userLocation && commentText) {
      const reader = new FileReader();
      reader.onload = function (e) {
          const newComment = {
              background: e.target.result,
              location: userLocation,
              text: commentText,
              timestamp: Date.now(),
              createdByLoggedInUser: true,
              header: loggedInUser,
              profileImage: profileImage
          };

          let comments = JSON.parse(localStorage.getItem('bicolcomments')) || [];
          comments.push(newComment);
          localStorage.setItem('bicolcomments', JSON.stringify(comments));

          createSlide(newComment);

          backgroundInput.value = '';
          userLocationInput.value = '';
          commentInput.value = '';
          showSlide(currentIndex);

          showNotification("You added a comment.", 'blue'); // Added notification
      };
      reader.readAsDataURL(backgroundInput.files[0]);
  }
}

function saveEditComment() {
  const backgroundInput = document.getElementById('backgroundInput');
  const userLocationInput = document.getElementById('userLocationInput');
  const commentInput = document.getElementById('commentInput');
  const commentText = commentInput.value.trim();
  const userLocation = userLocationInput.value.trim();
  const timestamp = backgroundInput.dataset.timestamp;
  const loggedInUser = localStorage.getItem('loggedInUser') || 'New Comment';
  const profileImage = getUserProfileImage(loggedInUser);

  if (userLocation && commentText && timestamp) {
      let comments = JSON.parse(localStorage.getItem('bicolcomments')) || [];
      const commentIndex = comments.findIndex(c => c.timestamp == timestamp);

      if (commentIndex !== -1) {
          if (backgroundInput.files && backgroundInput.files[0]) {
              const reader = new FileReader();
              reader.onload = function (e) {
                  comments[commentIndex].background = e.target.result;
                  comments[commentIndex].location = userLocation;
                  comments[commentIndex].text = commentText;
                  comments[commentIndex].header = loggedInUser;
                  comments[commentIndex].profileImage = profileImage;
                  localStorage.setItem('bicolcomments', JSON.stringify(comments));
                  loadComments();
                  showNotification("You edited a comment.", 'blue'); // Added notification
              };
              reader.readAsDataURL(backgroundInput.files[0]);
          } else {
              comments[commentIndex].location = userLocation;
              comments[commentIndex].text = commentText;
              comments[commentIndex].header = loggedInUser;
              comments[commentIndex].profileImage = profileImage;
              localStorage.setItem('bicolcomments', JSON.stringify(comments));
              loadComments();
              showNotification("You edited a comment.", 'blue'); // Added notification
          }
      }

      backgroundInput.value = '';
      userLocationInput.value = '';
      commentInput.value = '';
      delete backgroundInput.dataset.timestamp;
  }
}

function deleteComment(timestamp) {
  let comments = JSON.parse(localStorage.getItem('bicolcomments')) || [];
  comments = comments.filter(comment => comment.timestamp !== timestamp);
  localStorage.setItem('bicolcomments', JSON.stringify(comments));
  loadComments();
  showNotification("You deleted a comment.", 'red'); // Added notification
}

