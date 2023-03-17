module.exports = function (timesheet, hourRate) {
    let sum = 0;
    let login = [];
    let logOut = [];
    let hourRater = hourRate;
    
    timesheet.forEach(element => {
       if(element[0] == 'login') login.push(element);
       if(element[0] == 'logout') logOut.push(element);
    });

    login.forEach( element => {
        hourRater = hourRate;
        logOut.forEach( element2 => {
            workTime = (element2[1] - element[1])  / 1000 / 60 / 60;
            if (workTime > 12) return 0;
            workHour = new Date(element[1]).toString().split(' ')[4].split(':')[0]
            workHourS = new Date(element2[1]).toUTCString().split(' ')[4].split(':')[0];
            if (+workHour >= 8 && +workHourS <= 18) hourRater = (hourRater / 100) * 100;
            if (+workHour >= 18 && +workHourS <= 23) hourRater = (hourRater / 100) * 150;
            if (+workHour >= 23 && +workHourS <= 8) hourRater = (hourRater / 100) * 200;
            return sum += (workTime * hourRater);
        });
        return sum;
    });
    return sum.toFixed(2);
}
