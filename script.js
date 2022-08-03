const canvas = document.getElementById('pad')
const submit = document.getElementById('go')
const status1 = document.getElementById('status')
const result = document.getElementById('result')
canvas.width = 224;
canvas.height = 224;

var ctx = canvas.getContext('2d')
ctx.lineCap = "round";
ctx.lineWidth = 10
ctx.strokeStyle = 'white';
var prev_x,prev_y,cur_x,cur_y;


var drawing = false;
canvas.addEventListener('click',(e)=>{
    console.log(e.clientX - canvas.getBoundingClientRect().left,e.clientY - canvas.getBoundingClientRect().top)
})
canvas.addEventListener('mousedown',(e)=>{
    drawing = true;
    prev_x = e.clientX - canvas.getBoundingClientRect().left
    prev_y = e.clientY - canvas.getBoundingClientRect().top
})
canvas.addEventListener('mouseup',()=>{
    drawing = false;
})
canvas.addEventListener('mousemove',(e)=>{
    if(drawing == true){
        cur_x = e.clientX - canvas.getBoundingClientRect().left
        cur_y = e.clientY - canvas.getBoundingClientRect().top
        ctx.beginPath()
        ctx.moveTo(prev_x,prev_y)
        ctx.lineTo(cur_x,cur_y)
        ctx.stroke()
        prev_x = cur_x
        prev_y = cur_y
    }
})
canvas.addEventListener('mouseout',()=>{
    drawing = false;
})
var data;
submit.onclick = ()=>{
    var url = canvas.toDataURL('image/jpeg')
    console.log(url)
    status1.textContent = 'Predicting...'
    fetch('http://127.0.0.1:5000/',{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: url })
    }
    ).then((respose)=>{return respose.json()}).then((data)=>{result.textContent = data.prediction})
    status1.textContent = ''
}