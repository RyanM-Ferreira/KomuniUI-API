const userIdString = localStorage.getItem('userId');
const userId = userIdString ? JSON.parse(userIdString) : null;

const greetingElement = document.getElementById('greeting');

if (userId) {
    greetingElement.textContent = `Olá, usuário #${userId}!`;
} else {
    greetingElement.textContent = `Olá, visitante!`;
}
