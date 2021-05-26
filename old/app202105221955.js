/*

*/
(() => {
/* 即時関数（名前空間の代わり）+ アロー関数（制限付きfunction）
即時関数
https://qiita.com/katsukii/items/cfe9fd968ba0db603b1e
通常の関数とアロー関数の違い
https://qiita.com/suin/items/a44825d253d023e31e4d
*/
    const CIRCLE_RADIUS = 20;
    const CIRCLE_SPEED = 5;
    const LINE_SPEED = 50;
    const CIRCLE_COLOR = 'rgba(255, 64, 0, 0.8)';

    const FIRE_MAX_LIFE = Ball.maxLife;
    const FIRE_COUNT = 15;
    const FIRE_RADIUS = 30;
    const FIRE_MIN_SPEED = 4;
    const FIRE_ADD_SPEED = 6;
    const FIRE_COLORS = [
        'rgba(255, 200,   0, 0.5)',
        'rgba(255,   0, 200, 0.5)',
        'rgba(200, 255,   0, 0.5)',
        'rgba(  0, 255, 200, 0.5)',
        'rgba(200,   0, 255, 0.5)',
        'rgba(  0, 200, 255, 0.5)'
    ];

    let cu;
    let balls;
    let startTime;
    let nowTime;
    //let Game = {};

    window.addEventListener('load', () => {
        // canvas初期化
        cu = new CanvasUtil(document.getElementById('canvas'));
        cu.matchSize();
        cu.clear();

        //add Stats.js  https://github.com/mrdoob/stats.js/
        var stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.right = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);

        var enemy = {};
        enemy.x = window.innerWidth / 2;
        enemy.y = 0;

        window.addEventListener('click', (eve) => {            

            //console.log(eve);

            // ランダムに色を決める
            let colorIndex = Math.floor(Math.random() * FIRE_COLORS.length);

            // 初期位置を決める
            let x = eve.clientX;
            let y = eve.clientY;

            // 初期位置に FIRE_COUNT 個の火花を生成する
            for(let i = 0; i < FIRE_COUNT; ++i){
                // ランダムに飛び散る方向を変える
                let rotatePower = Math.PI * 2 * Math.random();
                let vx = Math.cos(rotatePower);
                let vy = Math.sin(rotatePower);

                // ランダムに飛び散るスピードを変える
                let speedPower = FIRE_MIN_SPEED + Math.random() * FIRE_ADD_SPEED;

                // パラメータをもとにボールを生成
                balls.push(new Ball(
                    x,
                    y,
                    vx,
                    vy,
                    speedPower,
                    FIRE_COLORS[colorIndex]
                ));
            }
            
        }, false);

        balls = [];

        render();
        /*

        var Game = {};
        Game.fps = 30;
        Game.run = function() {
            // 画面をクリア            
            cu.clear();
            //cu.fillRect(0, 0, window.innerWidth, window.innerHeight, 'black');

            // 画面を更新
            // すべてのボールの位置を更新する
            balls.map((ball, index) => {
                // ボールを動かす
                ball.move();

                // ボールを描く
                let position = ball.getPosition();
                let life = ball.getLife() / FIRE_MAX_LIFE;
                let color = ball.getColor();
                cu.fillCircle(
                    position.x,
                    position.y,
                    life * FIRE_RADIUS,
                    color
                );

                // ボールのライフが無くなったら配列から削除する
                if(ball.getLife() === 0){
                    balls.splice(index, 1);
                }
            });

            // ステータスを更新
            stats.update();
        }

        setInterval(Game.run, 1000 / Game.fps);
        */
    }, false);

    function render(){
        //nowTime = Date.now() - startTime;

        // 背景は黒で塗りつぶす
        cu.clear();
        //cu.fillRect(0, 0, window.innerWidth, window.innerHeight, 'black');

        // すべてのボールの位置を更新する
        balls.map((ball, index) => {
            // ボールを動かす
            ball.move();

            // ボールを描く
            let position = ball.getPosition();
            let life = ball.getLife() / FIRE_MAX_LIFE;
            let color = ball.getColor();
            cu.fillCircle(
                position.x,
                position.y,
                life * FIRE_RADIUS,
                color
            );

            // ボールのライフが無くなったら配列から削除する
            if(ball.getLife() === 0){
                balls.splice(index, 1);
            }
        });

        //gui.text({count: balls.length});

        // ステータスを更新
        //stats.update();

        //requestAnimationFrame(render);
        setInterval(render, 1000 / 30);
    }

    class CanvasUtil {
        constructor(canvas){
            this.canvas = canvas;
            this.ctx = this.canvas.getContext('2d');
        }
        clear(){
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        matchSize(){
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        drawArc(x, y, radius, startAngle, endAngle, anticlockwise, lineWidth = 1, color){
            if(color != null){
                this.ctx.strokeStyle = color;
            }
            this.ctx.beginPath();
            this.ctx.lineWidth = lineWidth;
            this.ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)
            this.ctx.stroke();
        }
        strokeLine(x0, y0, x1, y1, lineWidth = 1, color){
            if(color != null){
                this.ctx.strokeStyle = color;
            }
            this.ctx.beginPath();
            this.ctx.lineWidth = lineWidth;
            this.ctx.moveTo(x0, y0);
            this.ctx.lineTo(x1, y1);
            this.ctx.closePath();
            this.ctx.stroke();
        }
        fillCircle(x, y, rad, color){
            if(color != null){
                this.ctx.fillStyle = color;
            }
            this.ctx.beginPath();
            this.ctx.arc(x, y, rad, 0, Math.PI * 2, false);
            this.ctx.closePath();
            this.ctx.fill();
        }
    }
})();