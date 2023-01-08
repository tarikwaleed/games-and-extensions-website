
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
const gravity=1.5;
class Player{
    constructor(){
        this.speed = 4;
        this.position = {
            x:100,
            y:100
        }
        // gravity
        this.velocity={
            x:0,
            y:0
        }
        this.width=70;
        this.height=150;
        this.image = spriteStandRight
        this.frames=0;
        this.sprite = {
            stand:{
                right:spriteStandRight,
                left:spriteStandLeft,
                cropWidth:177,
                width:66,
            },
            run:{
                right:spriteRunRight,
                left:spriteRunLeft,
                cropWidth:341,
                width:127.875,
            }
        }

        this.currentSprite = this.sprite.stand.right
        this.currentCropWidth = 177
    }

    draw(){
        // c.fillStyle = 'red';
        // c.fillRect(this.position.x,this.position.y,this.width,this.height);
        c.drawImage(this.currentSprite,this.currentCropWidth*this.frames,0,this.currentCropWidth,400
            ,this.position.x,this.position.y,this.width,this.height);
    }

    update(){
        this.frames++
        if (this.frames>59  && 
            (this.currentSprite ===  this.sprite.stand.right || this.currentSprite === this.sprite.stand.left)
            ) this.frames = 0;
        else if (this.frames>29  &&
            ( this.currentSprite ===  this.sprite.run.right || this.currentSprite === this.sprite.run.left )
            ) this.frames = 0;
        this.draw()
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity;
        // else this.velocity.y = 0
    }
}
// creating classes
class Platform{
    constructor({ x,y,image }){
        this.position = {
            x:x,
            y:y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw(){
        c.drawImage(this.image,this.position.x,this.position.y)
    }
}

class Object{
    constructor({ x,y,image }){
        this.position = {
            x:x,
            y:y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw(){
        c.drawImage(this.image,this.position.x,this.position.y)
    }
}
// end of classes
// images useed
function createImage(imageSrc){
    const  img = new Image
    img.src = imageSrc
    return img;
}
// const platform = new Image()
// platform.src = './assets/platform.png'
// const background = new Image()
// background.src = './assets/background.png'
// const hill = new Image()
// hill.src = './assets/hills.png'
var platformImage = createImage('/assets/Parkour/platform.png')
var backgroundImage = createImage('/assets/Parkour/background.png')
var hillImage = createImage('/assets/Parkour/hills.png')
var platformSmall = createImage('/assets/Parkour/platformSmallTall.png')
var spriteRunLeft = createImage('/assets/Parkour/spriteRunLeft.png')
var spriteRunRight = createImage('/assets/Parkour/spriteRunRight.png')
var spriteStandLeft = createImage('/assets/Parkour/spriteStandLeft.png')
var spriteStandRight = createImage('/assets/Parkour/spriteStandRight.png')
// end of images
// creating objects
var player = new Player();
var platforms = [];
var objects = [];
var lastKey;
// end of objects
const keys = {
    right:{
        pressed:false
    },
    left:{
        pressed:false
    }
}

let scrollOffset = 0
// initalize after losing
function init(){
player = new Player();
platforms = [
    // small platforms
    new Platform({x:platformImage.width * 4 + 300 -2 + platformImage.width - platformSmall.width,y:270,image:platformSmall}),
    new Platform({x:platformImage.width * 8 + 1000 -2 + platformImage.width - platformSmall.width,y:470,image:platformSmall}),
    new Platform({x:platformImage.width * 9 + 950 -2 + platformImage.width - platformSmall.width,y:470,image:platformSmall}),
    new Platform({x:platformImage.width * 10 + 900 -2 + platformImage.width - platformSmall.width,y:470,image:platformSmall}),

    // big platforms
    new Platform({x:-1,y:470,image:platformImage}),
    new Platform({x:platformImage.width - 3,y:470,image:platformImage}),
    // new Platform({x:platformImage.width - 3,y:200,image:platformImage}),
    new Platform({x:platformImage.width * 2 + 100,y:470,image:platformImage}),
    new Platform({x:platformImage.width * 3 + 300,y:470,image:platformImage}),
    new Platform({x:platformImage.width * 4 + 300 -2,y:470,image:platformImage}),
    new Platform({x:platformImage.width * 5 + 600 -2,y:470,image:platformImage}),
    new Platform({x:platformImage.width * 6 + 750 -2,y:200,image:platformImage}),
    new Platform({x:platformImage.width * 7 + 1000 -2,y:200,image:platformImage}),
    new Platform({x:platformImage.width * 11 + 1000 -2,y:200,image:platformImage}),
    new Platform({x:platformImage.width * 12 + 1270 -2,y:470,image:platformImage}),


];
objects = [
    new Object({x:-1,y:-1,image:backgroundImage}),
    new Object({x:-1,y:-1,image:hillImage})
]

scrollOffset = 0

}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'white';
    c.fillRect(0,0,canvas.width,canvas.height);

    objects.forEach((obj)=>{
        obj.draw()
    })
    platforms.forEach((platform) => {
        platform.draw();
    });
    player.update();
    if (keys.right.pressed && player.position.x < 400){
        player.velocity.x = player.speed;
    } else if ((keys.left.pressed && player.position.x > 100) 
    || keys.left.pressed && scrollOffset === 0 && player.position.x > 0){
        player.velocity.x = -player.speed;
    }else {
        player.velocity.x=0;

        if(keys.right.pressed){
            scrollOffset += player.speed
            platforms.forEach((platform) => {
                platform.position.x -= player.speed
            });
            objects.forEach((obj)=>{
                obj.position.x -= player.speed * 0.66
            })
        }else if (keys.left.pressed && scrollOffset > 0){
            scrollOffset -= player.speed
            platforms.forEach((platform) => {
                platform.position.x += player.speed
            });
            objects.forEach((obj)=>{
                obj.position.x += player.speed * 0.66
            })
        }
    }


    // platform collision detection
    platforms.forEach((platform) => {   
        if (player.position.y + player.height <= platform.position.y
            && player.position.y + player.height + player.velocity.y >= platform.position.y
            && player.position.x + player.width >= platform.position.x
            && player.position.x <= platform.position.x + platform.width){
            player.velocity.y=0;
        }
    })

// sprite switching positions
    if (keys.right.pressed && this.lastKey === 'right' && player.currentSprite !== player.sprite.run.right){
        player.frames = 1;
        player.currentSprite = player.sprite.run.right;
        player.currentCropWidth = player.sprite.run.cropWidth
        player.width = player.sprite.run.width
    }else if (keys.left.pressed && this.lastKey === 'left' && player.currentSprite !== player.sprite.run.left){
        player.currentSprite = player.sprite.run.left
        player.currentCropWidth = player.sprite.run.cropWidth
        player.width = player.sprite.run.width
    }else if (!keys.left.pressed && this.lastKey === 'left' && player.currentSprite !== player.sprite.stand.left){
        player.currentSprite = player.sprite.stand.left
        player.currentCropWidth = player.sprite.stand.cropWidth
        player.width = player.sprite.stand.width
    }
    else if (!keys.right.pressed && this.lastKey === 'right' && player.currentSprite !== player.sprite.stand.right){
        player.currentSprite = player.sprite.stand.right
        player.currentCropWidth = player.sprite.stand.cropWidth
        player.width = player.sprite.stand.width
    }

// win scenario
    if (scrollOffset > platformImage.width * 12 + 950 -2){
        alert('you win')
        init()
    }


// lose  scenario
    if (player.position.y > canvas.height){
        alert('you lose');
        init()
    }

}
init()
animate()

addEventListener('keydown',(event)=>{
    // console.log(event.keyCode);
    switch (event.keyCode) {
        case 65: 
            // console.log('left');
            keys.left.pressed = true
            lastKey = 'left'
            break;
        case 83: 
            // console.log('down');
            break;
        case 68: 
            // console.log('right');
            keys.right.pressed = true
            lastKey = 'right'
            break;
        case 87: 
            // console.log('up');
            player.velocity.y -= 30;
            break;
    }
    // console.log(keys.right.pressed)
});

addEventListener('keyup',(event)=>{
    // console.log(event.keyCode);
    switch (event.keyCode) {
        case 65: 
            // console.log('left');
            keys.left.pressed = false
            break;
        case 83: 
            // console.log('down');
            break;
        case 68: 
            // console.log('right');
            keys.right.pressed = false
            break;
        case 87: 
            // console.log('up');
            break;
    }
    // console.log(keys.right.pressed)

});

