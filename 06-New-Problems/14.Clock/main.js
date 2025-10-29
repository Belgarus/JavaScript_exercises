const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Time (HH:MM): ', (time) => {
    const [hours, minutes] = time.split(':');
    
    console.log(`Alarm set for ${time}`);
    
    const check = setInterval(() => {
        const now = new Date();
        if (now.getHours() == hours && now.getMinutes() == minutes) {
            console.log('\n🔔 ALARM!!!');
            clearInterval(check);
            rl.close();
        }
    }, 1000);
});