
const telegramApi = require('node-telegram-bot-api');

const token = '6868659728:AAG3Ir5EMC97V4Hu3A27OSk65NXqELyJJyw';

const bot = new telegramApi(token, {polling: true})

const allowedUsers = [
    {
        firstName: 'Nazar Yaremchuk',
        userName: 'N_Yaremchuk'
    },
    {
        firstName: 'Алєся Яремчук',
        userName: ''
    },
    {
        firstName: 'Nazar Yaremchuk',
        userName: 'BogdanYaremchuk'
    }
]

const options = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Побачити графік', callback_data: '1'}],
            [{text: 'Взнати де ти задіяний найближчого зібрання', callback_data: '2'}],
            [{text: 'Ще щось взнати', callback_data: '3'}],
            [{text: 'Додаткова інформація', callback_data: '4'}]
        ]
    })
}

const start = () => {
    
    bot.setMyCommands([
        {command: '/start', description: 'Початкове привітання'},
        {command: '/info', description: 'Що може цей бот'}
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        const firstName = msg.chat.first_name;
        const userName = msg.chat.username;

        if(allowedUsers.find(el => el.firstName === firstName )) {
            if (text === '/start') {
                console.log(msg);
                // await bot.sendPhoto(chatId, './stickers/Kaleb.png')
                await bot.sendSticker(chatId, './stickers/caleb_01.png');
                return bot.sendMessage(chatId, ` ${firstName}  Вітаємо в боті 'Служби привокзальний! Натисни /info щоб побачити що цей бот вміє.' `);
                
            }
        
            if (text === '/info') {
                
                return bot.sendMessage(chatId, `${firstName} Ти можеш скористатись такими командами... `, options);
                
                
            }
    
            return bot.sendMessage(chatId, 'Я тебе не розумію 🙄, спробуй ще раз!')
        } else {
            console.log(msg);
            return bot.sendMessage(chatId, 'У вас немає доступу до цього бота, будь ласка зверніться до адміністратора.')
        }
    
        
        
    })

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        console.log(msg);
    })
}


start();