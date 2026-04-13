const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: { origin: "*" } // عشان يسمح لأي حد يتصل
});

// لما مستخدم جديد يفتح التطبيق
io.on('connection', (socket) => {
    console.log('في مستخدم جديد دخل الشات الآن ✅');

    // استقبال الرسالة من مستخدم معين
    socket.on('message_from_client', (data) => {
        console.log('الرسالة المستلمة: ', data);
        
        // إرسال الرسالة فوراً لكل الناس التانية (المستقبلين)
        socket.broadcast.emit('message_from_server', data);
    });

    socket.on('disconnect', () => {
        console.log('مستخدم خرج من الشات ❌');
    });
});

// تشغيل السيرفر على بورت 3000
http.listen(3000, () => {
    console.log('السيرفر شغال على http://localhost:3000');
});