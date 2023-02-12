// Event listener to toggle displaying the comment box
const postArea = document.querySelectorAll('.postContainer');
postArea.forEach(postContainer => {
  postContainer.addEventListener('click', function() {
    const comment = this.querySelector('.commentContainer');
    comment.classList.remove('hidden');
    comment.classList.add('commentboxStyle');
  });
});

const commentArea = document.querySelectorAll('.commentContainer');
commentArea.forEach(commentContainer => {
  commentContainer.addEventListener('submit', async event => {
    event.preventDefault();

    const input = commentContainer.querySelector('input');
    const comment = input.value.trim();
    const postId = commentContainer.querySelector('button').dataset.postid;

    if (comment.length) {
        try {
          const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ comment, post_id: postId }),
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
            document.location.replace('/');
          } else {
            throw new Error('Failed to comment');
          }
        } catch (error) {
          console.error(error);
          alert('Failed to comment');
        }
      }
    });
  });