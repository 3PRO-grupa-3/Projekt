const schedule = require('node-schedule');

const topic = "testowe";
const message = "przypominam o oplaceniu zaleglych zbiorek!!!";

(async () => {
    const fetch = (await import('node-fetch')).default;

    schedule.scheduleJob('3 11 * * *', () => {
        fetch(`https://ntfy.sh/${topic}`, {
          method: 'POST',
          body: message,
          headers: {
            'Title': 'Przypomnienie o zbiorce',
            'Priority': '5',
            'Tags': 'rotating_light,rotating_light,rotating_light',
            'Click': 'https://www.youtube.com/watch?v=QMy14rGmpFI&t=101s'
        }
        })
          .then(response => {
            if (response.ok) {
              console.log("udalo sie");
            } else {
              console.error("Failed to send notification:", response.statusText);
            }
          })
          .catch(error => {
            console.error("Error sending notification:", error);
          });
      });
      
      console.log("udalo sie");
  })();