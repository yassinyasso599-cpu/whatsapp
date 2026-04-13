const socket = io(); // الربط بالسيرفر
const sendBtn = document.getElementById('sendBtn');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.getElementById('messageContainer');

// 1. استقبال الرسائل من السيرفر (من الناس التانية)
socket.on('message_from_server', (msg) => {
    addMessageToUI(msg, 'received');
});

// 2. وظيفة الإرسال
function sendMessage() {
    const text = messageInput.value.trim();
    if (text !== "") {
        // إرسال للسيرفر
        socket.emit('message_from_client', text);
        
        // إظهارها عندي أنا كمان
        addMessageToUI(text, 'sent');
        messageInput.value = "";
    }
}

function addMessageToUI(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.textContent = text;
    messageContainer.appendChild(messageDiv);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

sendBtn.addEventListener('click', sendMessage);
