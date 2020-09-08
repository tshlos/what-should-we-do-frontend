const commentsURL = 'http://localhost:3000/api/v1/comments';
const modal = document.getElementById('myModal');
const commentInput = modal.querySelector('comment-value');

function listComments(cardContainer, activity) {
    const btn = document.createElement('button');
    btn.className = 'infocard';
    btn.textContent = 'Open Card';
    cardContainer.append(btn);

    btn.addEventListener('click', function (e) {
        openCard(activity);
    });
}


function openCard(activity) {
    modal.style.display = "block";
    const closeModal = modal.querySelector(".close");
    closeModal.onclick = function() {
        modal.style.display = "none";
    }
    const name = modal.querySelector('.name');
    name.textContent = activity.name;
    const category = modal.querySelector('.category');
    category.textContent = activity.category;
    const image = modal.querySelector('.image');
    image.src = activity.image;
    const address = modal.querySelector('.address');
    address.textContent = `${activity.address}, ${activity.city}, ${activity.state}`;
    const comments = modal.querySelector('.comments');

    createComment(activity);
    displayComments(activity);
}

function displayComments(comments) {
    return comments.forEach(comment => {
        const commentList = document.createElement('li');
        const deleteBtn = document.createElement('button');
    });
}

async function sendComment(activityId, content) {
    const newComment = {
        activity_id: activityId,
        content: content
    };
    const response = await fetch(commentsURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
    });
}

function createComment(activity) {

    const commentForm = document.querySelector('.comment-form');
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const commentValue = e.target["comment-value"].value;
        commentForm.comment.value = '';
        
        sendComment(activity.id, commentValue);
    }) 
}










