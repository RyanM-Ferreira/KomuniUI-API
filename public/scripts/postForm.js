const form = document.getElementById('postForm');

const userIdRaw = localStorage.getItem('userId');
const userId = userIdRaw ? JSON.parse(userIdRaw) : null;

if (!userId) {
    alert('Usuário não autenticado. Faça login novamente.');
    window.location.href = '/login';
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Enviando post...');

    const tipo = document.querySelector('input[name="tipo"]:checked').value;
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
        userId: Number(userId),
        description: descricao || null,
        date: data || null,
        place: localizacao || null
    };

    try {
        console.log(localStorage.getItem('userId'));

        const response = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // se o backend exigir token
            },
            body: JSON.stringify(post)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Post criado com sucesso!');
            console.log(result);
            form.reset();
        } else {
            alert(`Erro: ${result.erro?.mensagem || 'Erro desconhecido'}`);
            console.error(result);
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao enviar o post. Veja o console.');
    }
});
