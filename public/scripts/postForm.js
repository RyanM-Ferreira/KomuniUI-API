const form = document.getElementById('postForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    const userId = parseInt(document.getElementById('userId').value);
    const titulo = document.getElementById('titulo').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const conteudo = document.getElementById('conteudo').value.trim();
    const data = document.getElementById('data').value;
    const adicional = document.getElementById('adicional').value.trim();
    const localizacao = document.getElementById('localizacao').value.trim();

    const post = {
        title: titulo,
        type: tipo,
        content: conteudo,
        userId: userId,
        description: descricao || null,
        date: data || null,
        place: localizacao || null
    };

    try {
        const response = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzOSwiZW1haWwiOiJlbWFpbEBkb21pbmlvLmNvbSIsImlhdCI6MTc1MDc3OTY4NiwiZXhwIjoxNzUwNzgzMjg2fQ.3SnBQiAd55BJdhzVxCbhRFZEEmUkcpIxgU-QWgEaWZA' // ⚠️ Trocar pelo token real
            },
            body: JSON.stringify(post)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Post criado com sucesso!');
            console.log(data);
            form.reset();
        } else {
            alert(`Erro: ${data.erro?.message || 'Sei lá, irmaõ. Algum erro aí'}`);
            console.error(data);
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao enviar o post. Verifique o console.');
    }
});