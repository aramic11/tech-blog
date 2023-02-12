let postIdForChanges;

// Show modify options when post container is clicked
const postContainers = document.querySelectorAll('.postContainer');
postContainers.forEach(postContainer => {
    postContainer.addEventListener('click', function () {
        const modify = this.querySelector('.modification');
        modify.classList.remove("hidden");
    });
});

// Handle form submissions
const form = document.querySelector('.card-body');
document.querySelector('.addBtn').addEventListener('click', function () {
    form.dataset.type = 'add';
    document.querySelector('.postsSection').classList.add('hidden');
    document.querySelector('.card').classList.remove("hidden");
});

const updatePosts = document.querySelectorAll('.updateBtn');
updatePosts.forEach(updateBtn => {
    updateBtn.addEventListener('click', function () {
        form.dataset.type = 'update';
        document.querySelector('.postsSection').classList.add('hidden');
        postIdForChanges = this.dataset.postid;
        const exisitingPost = document.querySelector(`h2[data-postid="${postIdForChanges}"]`).textContent;
        const exisitingContent = document.querySelector(`p[data-postid="${postIdForChanges}"]`).textContent;
        document.querySelector('.updateTitle').value = exisitingPost;
        document.querySelector('.updateContent').value = exisitingContent;
        document.querySelector('.card').classList.remove("hidden");     
    });
});

// Form to apply update
const handleAddPost = async () => {
    const title = form.querySelector('.updateTitle').value.trim();
    const content = form.querySelector('.updateContent').value.trim();
  
    const response = await fetch(`/api/posts/`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to add.');
    }
  };
  
  const handleUpdatePost = async (postId) => {
    const title = form.querySelector('.updateTitle').value.trim();
    const content = form.querySelector('.updateContent').value.trim();
  
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update.');
    }
  };
  
  const resetForm = () => {
    form.dataset.type = null;
    document.querySelector('.postsSection').classList.remove('hidden');
    document.querySelector('.card').classList.add("hidden");
    form.reset();
  };
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    if (form.dataset.type === 'add') {
      handleAddPost();
    } else if (form.dataset.type === 'update') {
      handleUpdatePost(postIdForChanges);
    }
  });

// Handle deletion of posts
const deletePosts = document.querySelectorAll('.deleteBtn');
deletePosts.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', async function (e) {
        e.preventDefault();
        const postId = this.dataset.postid;

        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete');
        }
    });
});

// Cancel button event listener
document.querySelector('.cancelBtn').addEventListener('click', function(){
    document.querySelector('.postsSection').classList.remove('hidden');
    document.querySelector('.card').classList.add("hidden");
})
