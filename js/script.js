const hours = document.querySelector('.hours')
const minutes = document.querySelector('.minutes')
const hour = document.querySelector('.h')
const minute = document.querySelector('.m')
const second = document.querySelector('.s')

function watch() {
    let time = new Date,
    h = time.getHours() * 30,
    m = time.getMinutes() * 6,
    s = time.getSeconds() * 6
    
    hour.style.transform = `rotate(${h}deg)`
    minute.style.transform = `rotate(${m}deg)`
    second.style.transform = `rotate(${s}deg)`

    time.getHours() < 10 ? hours.innerHTML = '0' + time.getHours() :  hours.innerHTML = time.getHours()
    time.getMinutes() < 10 ? minutes.innerHTML = '0' + time.getMinutes() :  minutes.innerHTML = time.getMinutes()

    setTimeout(() => {
        watch()
    }, 1000);
}
watch()


const tabHead = document.querySelectorAll('.tabsItem'),
      tabBody = document.querySelectorAll('.tabsContentItem')

for (let i = 0; i < tabHead.length; i++) {
    tabHead[i].addEventListener('click', function (e) {
        e.preventDefault()
        for (let x = 0; x < tabHead.length; x++) {
            tabHead[x].classList.remove('active')
            tabBody[x].classList.remove('active')
        }
        addActive(this,tabBody[i])
    })
    
}

function addActive(a,b) {
    a.classList.add('active')
    b.classList.add('active')
}

// sekundomer

const stopWatchHour = document.querySelector('.stopwatch__hours'),
      stopWatchMin = document.querySelector('.stopwatch__minutes'),
      stopWatchSec = document.querySelector('.stopwatch__seconds'),
      stopWatchBtn = document.querySelector('.stopwatch__btn'),
      stopWatchSpan = document.querySelector('.tabsLink__span'),
      stopWatchAudio = document.querySelector('#stopWatchAudio');


stopWatchBtn.addEventListener('click', function () {
    if (this.innerHTML == 'start') {
        stopWatchBtn.innerHTML = 'stop'
        stopWatchSpan.classList.add('active')
        interval = setInterval(() => {
            stopWatch()
            stopWatchAudio.play()
        }, 1000);


    }else if (this.innerHTML == 'stop') {
        stopWatchBtn.innerHTML = 'clear'
        stopWatchSpan.classList.remove('active')
        stopWatchSpan.classList.add('active_clear')
        clearInterval(interval)


    }else if (this.innerHTML == 'clear') {
        stopWatchBtn.innerHTML = 'start'
        stopWatchSpan.classList.remove('active_clear')
        stopWatchSec.innerHTML = 0
        stopWatchMin.innerHTML = 0
        stopWatchHour.innerHTML = 0
        hisob = 0

    }
})

let hisob = 0
function stopWatch() {
    hisob++
    if (hisob <= 59) {
        stopWatchSec.innerHTML = hisob
    }else if (hisob > 59) {
        hisob = 0
        stopWatchSec.innerHTML = hisob
        stopWatchMin.innerHTML++
    }
    if (stopWatchMin.innerHTML > 59) {
        stopWatchMin.innerHTML = 0
        stopWatchHour.innerHTML++
    }
}

// calculator

const calcScreen = document.querySelector('.calc__screen-out'),
      calcBtns = Array.from(document.querySelectorAll('.calc__btn'));

calcBtns.map((btn)=>{
    btn.addEventListener('click', function (e) {
        let answer = e.target.innerHTML
        Size()
        if (answer == 'ac') clear()
        else if (answer == 'ce') del()
        else if (answer == '+/-') PlusorMinus()
        else if(answer == '√') squareRoot()
        else if(answer == '=') equal()
        else length(answer)
    })
})

function Size() {
    if (calcScreen.innerHTML.length >= 20) calcScreen.style.fontSize = '20px'
    else if (calcScreen.innerHTML.length >= 12) calcScreen.style.fontSize = '30px'
    else if (calcScreen.innerHTML.length < 12) calcScreen.style.fontSize = '40px'
}

function clear() {
    calcScreen.innerHTML = ''
}
function del() {
    calcScreen.innerHTML = calcScreen.innerHTML.slice(0,-1)
}
function squareRoot() {
    calcScreen.innerHTML = Math.sqrt(calcScreen.innerHTML)
    Size()
}
function equal() {
    calcScreen.innerHTML = eval(calcScreen.innerHTML)
    Size()
}
function PlusorMinus() {
    calcScreen.innerHTML = parseFloat(calcScreen.innerHTML) * -1
}
function length(answer) {
    calcScreen.innerHTML.length >= 32 ? calcScreen.innerHTML = calcScreen.innerHTML : calcScreen.innerHTML += answer
}

// timer

const timerHour = document.querySelector('.timer__hours'),
      timerMin = document.querySelector('.timer__minutes'),
      timerSec = document.querySelector('.timer__seconds'),
      timerSet = document.querySelector('.timer__set'),
      timerClear = document.querySelector('.timer__clear'),
      timerBtns = Array.from(document.querySelectorAll('.timer__btn, .timer__set, .timer__clear')),
      timerAudio = document.querySelector('#timerAudio');

timerBtns.map(btn =>{
    btn.addEventListener('click', function (e) {
        let click = e.target.innerHTML
        press(click)
    })
})

function press(click) {
    if(click.toUpperCase() == "PLAY") {
        timerSet.innerHTML = 'PAUSE'
        interval = setInterval(() => {
            timer()
        }, 1000);
    }else if(click.toUpperCase() == "PAUSE") {
        timerSet.innerHTML = 'PLAY'
        clearInterval(interval)
        timerAudio.pause()
    }else if (click.toUpperCase() == "CLEAR") {
        hisob = ''
        timerSec.innerHTML = ''
        timerMin.innerHTML = ''
        timerHour.innerHTML = ''
        clearInterval(interval)
        timerSet.innerHTML = 'PLAY'
        timerAudio.pause()
    }else{
        if (timerSec.innerHTML.length < 2) {
            let check = timerSec.innerHTML += click
            Check(check)
        }else if (timerSec.innerHTML.length >= 2 && timerMin.innerHTML.length < 2) {
            timerMin.innerHTML += click
        }else if (timerMin.innerHTML.length >= 2 && timerHour.innerHTML.length < 2) {
            timerHour.innerHTML += click
        }
    }
}

let son = 0
function Check(check) {
    son = check
}

function timer() {
    if (son > 0) {
        son--
        timerSec.innerHTML = son
    }else if (son == 0) {
        if (timerMin.innerHTML > 0) {
            timerMin.innerHTML--
            son = 59
            timerSec.innerHTML = son
        } else {
            if (timerHour.innerHTML > 0) {
                timerHour.innerHTML--
                timerMin.innerHTML = 59
                son = 59
                timerSec.innerHTML = son
            }else{
                if (timerMin.innerHTML > 0) {
                    timerMin.innerHTML--
                    son = 59
                    timerSec.innerHTML = son
                }else{
                    hisob = ''
                    timerSec.innerHTML = ''
                    timerMin.innerHTML = ''
                    timerHour.innerHTML = ''
                    clearInterval(interval)
                    timerAudio.play()
                }
            }
        }
    }
}