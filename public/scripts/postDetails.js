const postContainer = document.getElementById('postDetail');
const commentsContainer = document.getElementById('commentsContainer');

async function loadPostDetails() {
    try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
        const post = await response.json();

        postContainer.innerHTML = `
            <div class="postDetailCard">
                <div class="header">
                    <h2>${post.title}</h2>
                    <div class="type">[${post.type}]</div>
                </div>

                <p><b>Uploader:</b> ${post.userID}</p>
                <p><b>Descrição:</b> ${post.description || "Sem descrição"}</p>
                <p>${post.content}</p>

                <div class="info">
                    <div>
                        <label>Data:</label>
                        <input type="text" value="${post.date || 'Sem data'}" disabled>
                    </div>
                    <div>
                        <label>Local:</label>
                        <input type="text" value="${post.place || 'Sem endereço'}" disabled>
                    </div>
                </div>

                <div class="footer">
                    <button onclick="history.back()">Voltar</button>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Erro ao carregar post:', error);
        postContainer.innerHTML = "<p>Erro ao carregar post.</p>";
    }
}
async function loadComments() {
    try {
        const response = await fetch(`http://localhost:3000/comments/post/${postId}`);
        const comments = await response.json();

        if (comments.length === 0) {
            commentsContainer.innerHTML = `<p>Sem comentários ainda.</p>`;
            return;
        }

        commentsContainer.innerHTML = `
            <div class="comments-container">
                <h2>Comentários</h2>
                ${comments.map(comment => `
                    <div class="comment-card">
                        <div class="user-info">
                            <div class="profile-pic"></div>
                            <div><b>${comment.userId}</b></div>
                        </div>
                        <p>${comment.content}</p>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (error) {
        console.error('Erro ao carregar comentários:', error);
        commentsContainer.innerHTML = "<p>Erro ao carregar comentários.</p>";
    }
}

async function sendComment() {
    const commentInput = document.getElementById('commentInput');
    const content = commentInput.value.trim();

    if (!content) {
        alert('Digite um comentário antes de enviar!');
        return;
    }

    const newComment = {
        content: content,
        userId: 139, // ! Trocar depois para usuário logado
        postId: postId,
        date: new Date().toISOString().split('T')[0]
    };

    try {
        const response = await fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        });

        if (response.ok) {
            commentInput.value = '';
            loadComments();
        } else {
            const err = await response.json();
            alert(`Erro: ${err.error || 'Erro ao enviar comentário'}`);
        }
    } catch (error) {
        console.error('Erro ao enviar comentário:', error);
        alert('Erro ao enviar comentário');
    }
}

loadPostDetails();
loadComments();