function welcomeDescription(name: string) {
  return `سلام, ${name}
خیلی خوش اومدی `;
}
const botStartFailureMessage =
  'باعرض پوزش ربات در حال حاضر قادر به پاسخگویی نمی باشد.';

const startGameMessage = 'شروع بازی 👋';
const telegramChannelMessage = 'کانال تلکرام🔊';
const helpMessage = 'راهنما🚦';

const rateLimitMessage = 'شما ریت لیمیت شده اید';
module.exports.welcomeDescription = welcomeDescription;
module.exports.botStartFailureMessage = botStartFailureMessage;
module.exports.startGameMessage = startGameMessage;
module.exports.telegramChannelMessage = telegramChannelMessage;
module.exports.helpMessage = helpMessage;
module.exports.rateLimitMessage = rateLimitMessage;
