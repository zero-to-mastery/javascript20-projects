// game canvas
const c = document.getElementById('canvas');
const ctx = c.getContext('2d');

// remove pause button's event on spacebarPressed
window.addEventListener('keydown', (event) => event.keyCode === 32 ? event.preventDefault() : null);

// general params
const netWidth = 4;
const paddleWidth = 10;
const paddleHeight = 100;
const font = 'franchise';
let onButtonPressed = false;
let isGameover = false;
let isNewGame = false;
let winningScore = 7;

// keyboard params
let arrow = {
    up: false,
    down: false
}
let spacebarPressed = false;

// net
const net = {
    x: (c.width - netWidth) / 2,
    y: 0,
    width: 4,
    color: 'white'
}

// player object
const player = {
    x: 10,
    y: (c.height - paddleHeight) / 2,
    speed: 8,
    score: 0
}

// ai object
const ai = {
    x: c.width - 20,
    y: (c.height - paddleHeight) / 2,
    score: 0
}

// ball
const ball = {
    // the default location of the ball is in player's position
    x: player.x + 20,
    y: c.height / 2,
    radius: 10,
    speed: 7,
    velocityX: 3,
    velocityY: 3,
}

// gif
const gifLeft = {
    x: 0,
    y: 0
}

const gifRight = {
    x: 0,
    y: 0
}

// FUNCTIONS
// pause the game
pause = () => onButtonPressed = !onButtonPressed;

// background
drawBackground = () => {
    // draw the background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, c.width, c.height)
}

// net
drawNet = () => {
    for (let i = 0; i <= c.height; i += 15) {
        ctx.fillStyle = net.color;
        ctx.fillRect(net.x, i, net.width, 10)
    }
}

// score
drawScore = (score, x, y) => {
    ctx.font = `60px ${font}`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(score, x, y)
}

// paddles
drawPaddle = (x, y) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, 10, 100)
}

// load images
const ballImg = new Image();
ballImg.src = './imgs/ricardo.jpg';

// ball
drawBall = (x, y, radius) => {
    ctx.save();
    ctx.fillStye = 'red';
    ctx.beginPath();
    ctx.arc(x, y, radius + 1, 0, Math.PI * 2)
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.closePath();
    ctx.clip();
    // draw ricardo
    ctx.drawImage(ballImg, x - 30, y - 25, 60, 60);
    ctx.restore();
}

// pause sign
drawPause = () => {
    ctx.font = `10em ${font}`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('PAUSED', c.width / 2, c.height / 2);
}

// gameover
drawGameover = () => {
    if (isGameover) {
        // draw the background
        ctx.fillStyle = 'rgb(88, 85, 85)';
        ctx.fillRect(30, c.height / 4, c.width - 60, c.height - c.height / 3);
        // draw the title
        ctx.font = `6em ${font}`;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        // to see who scores winningScore
        winner = player.score === winningScore ? 'YOU WIN' : 'COMPUTER WINS';
        ctx.fillText(winner, c.width / 2, c.height / 2);
        ctx.font = `3em ${font}`;
        ctx.fillText('CLICK THE BUTTON BELOW', c.width / 2, c.height / 2 + 100);
        ctx.fillText('TO START A NEW GAME', c.width / 2, c.height / 2 + 150);
        // make the old pause button into the restart button
        button = document.getElementById('button');
        button.setAttribute('onclick', 'restart()');
        button.textContent = 'NEW GAME';
    }
}

// check gameover
checkGameover = () => {
    if (player.score === winningScore || ai.score === winningScore) {
        isGameover = true;
    }
}

// detect ball collisions
collision = (paddle, ball) => {
    paddle.top = paddle.y;
    paddle.bottom = paddle.y + paddleHeight;
    paddle.right = paddle.x + paddleWidth;
    paddle.left = paddle.x;

    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.right = ball.x + ball.radius;
    ball.left = ball.x - ball.radius;

    return ball.left < paddle.right && ball.top < paddle.bottom && ball.x > paddle.left && ball.bottom > paddle.top;
}

// move paddles
movePaddles = () => {
    //move player
    if (arrow.up && player.y >= 0) {
        player.y -= player.speed;
    } else if (arrow.down && player.y + paddleHeight <= c.height) {
        player.y += player.speed;
    }
    // move ai
    if (ball.x >= c.width / 4 && ai.y >= 0 && ai.y + paddleHeight <= c.height) {
        ai.y += (ball.y - (ai.y + paddleHeight / 2)) * 0.13;
        // when ai paadle hits the top or bottom
    } else if (ai.y <= 0) {
        ai.y += 1;
    } else if (ai.y + paddleHeight >= c.height) {
        ai.y += -1;
    }
}

// pause or restart the game when player hits enter button
window.addEventListener('keydown', (event) => {
    event.keyCode === 13 && !isGameover ? pause()
        : event.keyCode === 13 && isGameover
            ? restart() : null;
});
const enter = document.getElementById('button');
enter.addEventListener('keydown', (event) => event.keyCode === 13 ? pause() : null);



render = () => {
    // draw background
    drawBackground();
    // when the game is paused, show pause imgae
    if (onButtonPressed) { drawPause() }
    // net
    drawNet();
    // player's score
    drawScore(player.score, c.width / 4, c.height / 5);
    // ai's score
    drawScore(ai.score, c.width * 3 / 4, c.height / 5);
    // player's paddle
    drawPaddle(player.x, player.y);
    // ai's paddle
    drawPaddle(ai.x, ai.y);
    // ball
    drawBall(ball.x, ball.y, ball.radius, ball.color);
    // when the game is over, show gameover
    if (isGameover) { return drawGameover() }
}

// update function, to update positions of everything
update = () => {
    // handle all keybaord events
    onKeyDownChange = (event) => {
        switch (event.keyCode) {
            case 38:
                arrow.up = true;
                break;
            case 40:
                arrow.down = true;
                break;
            case 32:
                if (!onButtonPressed) {
                    spacebarPressed = true;
                    break;
                }
        }
    }

    onKeyUpChange = (event) => {
        switch (event.keyCode) {
            case 38:
                arrow.up = false;
                break;
            case 40:
                arrow.down = false;
                break;
        }
    }

    if (!spacebarPressed) {
        // hit the ball when it's player's position
        window.addEventListener('keydown', onKeyDownChange);
        window.addEventListener('keyup', onKeyUpChange);
        // the player holds the ball while able to move
        movePaddles();
        ball.x = player.x + 20;
        ball.y = player.y + paddleHeight / 2;

        // the ball will start off at straight line
        ball.velocityX = 7;
        ball.velocityY = 0;
    } else {
        // move paddles
        movePaddles();

        // check when the ball hits the walls
        if (ball.y + ball.radius >= c.height || ball.y - ball.radius <= 0) {
            ball.velocityY *= -1;
        }

        //when player wins
        if (ball.x > c.width) {
            player.score++;
            reset();
        }

        // when ai wins
        if (ball.x < 0) {
            ai.score++;
            reset();
        }

        // check is the game over
        checkGameover();

        // move the ball
        ball.x += ball.velocityX;
        ball.y += ball.velocityY;

        // collision detection of paddles
        let paddle = ball.x < c.width / 2 ? player : ai;
        let angle = 0;

        // if ball hits a paddle 
        if (collision(paddle, ball)) {
            // default angle is 0
            // when it hits the top of the paddle
            if (ball.y < paddle.y + paddleHeight / 2) {
                // -1 * Math.PI / 4 = -45deg
                angle = -1 * Math.PI / 4;
            } else if (ball.y > paddle.y + paddleHeight / 2) {
                angle = Math.PI / 4;
            } else { }

            ball.velocityX = (paddle === player ? 1 : -1) * ball.speed * Math.cos(angle);
            ball.velocityY = ball.speed * Math.sin(angle);

            ball.speed += 1;
        }
    }
}

// reset the game when anyone scores
reset = () => {
    ball.speed = 7;

    // let the player hold the ball
    spacebarPressed = false;
}

// restart a new game when the game is over
restart = () => {
    // change the restart button back to pause button
    isGameover = false;
    button = document.getElementById('button');
    button.setAttribute('onclick', 'pause()');
    button.textContent = "PAUSE/RESUME";
    // restore paddles abd scores
    player.y = (c.height - paddleHeight) / 2;
    player.score = 0;
    ai.y = (c.height - paddleHeight) / 2;
    ai.score = 0;
    gameLoop();
}

gameLoop = () => {
    !onButtonPressed
        ? (
            render(),
            update()
        )
        : (
            render()
        )
    !isGameover ?
        window.requestAnimationFrame(gameLoop)
        : render();
}

gameLoop();