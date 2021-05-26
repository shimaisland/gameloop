/*

*/
(() => {
/* 即時関数（名前空間の代わり）+ アロー関数（制限付きfunction）
即時関数
https://qiita.com/katsukii/items/cfe9fd968ba0db603b1e
通常の関数とアロー関数の違い
https://qiita.com/suin/items/a44825d253d023e31e4d
*/
    const GAME_FPS = 30;
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

    //add Stats.js  https://github.com/mrdoob/stats.js/
    var stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);

    var flagTimer;

    window.addEventListener('load', () => {
        // canvas初期化
        cu = new CanvasUtil(document.getElementById('canvas'));
        //cu.matchSize();
        cu.setSize();
        cu.clear();

        // 文字出力
        cu.drawText(50, 200, 1000, 'red', 'タッチでスタート<br>3秒後にもう一度タッチしてね');

        var startTime;
        var endTime;
        

        window.addEventListener('click', (eve) => {            
            
            // タイマー処理
            if (!flagTimer) {
                // 計測開始
                startTime = new Date();
                endTime = new Date();
                flagTimer = true;
                //cancelAnimationFrame(callbackID);
                render();
            } else {
                // 計測終了
                endTime = new Date();
                flagTimer = false;
                cancelAnimationFrame(callbackID);
            }

            console.log(startTime);
            console.log(endTime - startTime);
            //console.log(flagTimer);

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


        //render();
        //callbackID = requestAnimationFrame(render);

        /*
        if (flagTimer) {
            //render();
            console.log('ok');
        } else {
            cancelAnimationFrame(callbackID);
            console.log('ng');
        }
        */

        function render(){
            // 画面をクリア            
            cu.clear();
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
            //stats.update();
            
            // 画面更新
            //console.log(flagTimer);
            if (flagTimer) {
                stats.update();
                //requestAnimationFrame(render);
                //console.log('start');
            } else {
                stats.end();
                //stats.update();
                //cancelAnimationFrame(render);
                //console.log('stop');
                //stats.update();
                //console.log('stop');
            }
            callbackID = requestAnimationFrame(render);
        }
    }, false);
})();