let counter = 0;

function changeBackGround() {
    const imgs = [
        'url(../img/photo-c1.jpg)'
    ];
    if (counter === imgs.lengths) {
        counter = 0;
    }
    document.body.style.backgroundImage = imgs[counter];
    counter++;
}

setInterval(changeBackGround(), 7500);