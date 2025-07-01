const postsContainer = document.getElementById('postsContainer');

async function loadPosts() {
    try {
        const response = await fetch('http://localhost:3000/posts'); // <- Rota API
        const posts = await response.json();

        postsContainer.innerHTML = '';

        posts.forEach(post => {
            const postHTML = `
                <div class="post-card" onclick="window.location.href='/posts/${post.postId}'">
                    <div class="post-header">
                        <div>
                            <b>O(a) usuário(a) ${post.userId}</b> está anunciando um <b>[${post.type}]</b>
                        </div>
                    </div>

                    <div class="post-content">
                        <p><b>${post.title}</b></p>
                        <p>${post.description != null ? post.description : ""}</p>
                    </div>
                    
                    <div class="post-content">
                        <p>${post.content}</p>
                    </div>

                    <div class="post-footer">
                        <div class="post-actions">
                            <a href="/posts/${post.postId}">Comentários</a>
                            <a href="#">Compartilhar</a>
                        </div>
                    </div>
                </div>
            `;

            postsContainer.insertAdjacentHTML('beforeend', postHTML);
        });

    } catch (error) {
        console.error('Erro ao carregar posts:', error);
        postsContainer.innerHTML = `<p>Erro ao carregar os posts.</p>`;
    }
}

loadPosts();
