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
            //let x = eve.clientX - window.innerWidth / 2;
            //let y = eve.clientY - window.innerHeight / 2;
            let x = enemy.x - eve.clientX;
            let y = enemy.y - eve.clientY;
            let normal = Vector.calcNormal(x, y);
            //console.log(normal);
            //cu.strokeLine(eve.clientX, eve.clientY, window.innerWidth, window.innerHeight);
            //cu.strokeLine(eve.clientX, eve.clientY, eve.clientX+normal.x,eve.clientY+normal.y, 2, CIRCLE_COLOR);
            //balls.push(new Ball(
            balls.push(new Line(
                eve.clientX,
                eve.clientY,
                normal.x * 1,
                normal.y * 1,
                LINE_SPEED
            ));
        }, false);

        balls = [];

        var Game = {};
        Game.fps = 30;
        Game.run = function() {
            
            //enemy.x = enemy.x - 0.1;
            balls.map((ball) => {
                let pos = ball.getPosition();
                let x = pos.x - pos.oldx;
                let y = pos.y - pos.oldy;
                let normal = Vector.calcNormal(x, y);
                //ball.setVelocity(normal.x,normal.y);
                ball.move();
            });

            cu.clear();
            balls.map((ball) => {
                let p = ball.getPosition();
                //console.log(p);
                //cu.fillCircle(p.x, p.y, CIRCLE_RADIUS, CIRCLE_COLOR);
                cu.strokeLine(p.x, p.y, p.oldx, p.oldy, 5, CIRCLE_COLOR);
                let velocity = ball.getVelocity();
            });
            // ステータスを更新
            stats.update();
        }

        setInterval(Game.run, 1000 / Game.fps);

    }, false);

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