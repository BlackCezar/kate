document.querySelector('.results .orders').style.height = document.querySelector('.cont').clientHeight - 32 - document.querySelector('.last').clientHeight - document.querySelector('.results h2').clientHeight - document.querySelector('.results .more').clientHeight;
console.log(document.querySelector('.cont').clientHeight - document.querySelector('.last').clientHeight);

document.querySelectorAll('.btn').forEach(el => {
    el.onclick = animateBtn; 
});
function animateBtn(event) {
    console.log(event);
    let circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.top = event.offsetY;
    circle.style.left = event.offsetX;
    event.target.appendChild(circle);
    setTimeout(()=> {
        circle.remove();
    }, 600)
}