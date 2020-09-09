const commentsURL = 'http://localhost:3000/api/v1/comments';
const modal = document.getElementById('myModal');
const commentInput = modal.querySelector('.comment-value');
const commentList = document.createElement('ul');

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
    modal.style.display = 'block';
    const closeModal = modal.querySelector('.close');
    closeModal.onclick = function() {
        // commentList.innerHTML = '';
        modal.style.display = 'none';
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
    displayComments(activity.comments);
}

function displayComments(comments) {
    commentInput.append(commentList);

    comments.forEach(comment => {

        const listItem = document.createElement('li');
        // commentList.id = `comment-${comment.id}`;
        commentList.id = comment.id;

        const span = document.createElement('span');
        span.innerText = comment.content;
        listItem.append(span);

        const deleteBtn = document.createElement('button');
        deleteBtn.dataset.id = comment.id;
        deleteBtn.innerText = '\u00D7';
0
        listItem.innerText = comment.content;
        listItem.append(deleteBtn);
        commentList.append(listItem);

        
        // commentList.innerHTML += `<li>${comment.content}</li>`;
        // commentList.innerHTML += `<li>${comment.content} <button class="delete-btn">&times;</button> </li>`;
    });
}
listenToDeleteBtn();

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
    // const deleteBtn = document.createElement('button');
    // deleteBtn.innerText = '\u00D7';

    const commentForm = document.querySelector('.comment-form');
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const commentValue = e.target["comment-value"].value;
        commentList.innerHTML += `<li>${commentValue} <button>x</button></li>`;

        commentForm.comment.value = '';
        sendComment(activity.id, commentValue);
    }) 
}

function listenToDeleteBtn() {
const commentContainer = document.getElementById("myModal")
commentContainer.addEventListener('click', function(e) {
    if (e.target === 'BUTTON') {
        debugger
        console.log(e);
        const btnID = parseInt(e.target.dataset.id);
        e.target.parentElement.remove();
        deleteComment(btnID);}
    })
}

async function deleteComment(btnID) {
    return fetch(`${commentsURL}/${btnID}`, {
        method: 'DELETE'
    })
}





