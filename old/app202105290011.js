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
    let flagTimer = 1;
    let countStage = 1;
    let timeArray = [1000,2000,3000,4000,5000];
    let targetTime;

    // Stats.js  https://github.com/mrdoob/stats.js/
    let stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);

    window.addEventListener('load', () => {
        let startTime;
        let endTime;

        // INITIALIZE 処理
        // canvas初期化
        cu = new CanvasUtil(document.getElementById('canvas'));
        cu.matchSize();
        cu.setSize(400,800);
        //cu.clear();
        
        cu.drawText30('時間計測ゲーム', 100, 200, 1000, 'black');
        cu.drawText30('どこかをタッチして!', 100, 300, 1000, 'black');

        // INPUT処理
        window.addEventListener('click', (eve) => {
            // タイマー処理
            if (flagTimer == 1) {
                targetTime = timeArray[Math.floor(Math.random() * timeArray.length)];
                cu.clear();
                cu.drawText30(countStage+'回目', 150, 150, 1000, 'black');
                cu.drawText30('どこかをタッチでスタート', 10, 220, 1000, 'black');
                cu.drawText60(targetTime/1000, 10, 400, 1000, 'black');
                cu.drawText30('秒後にもう一度タッチして!', 10, 450, 1000, 'black');
                flagTimer = 2;
            } else if (flagTimer == 2) {
                // 計測開始
                startTime = new Date();
                flagTimer = 3;
                render();
            } else if (flagTimer == 3) {
                // 計測終了
                cancelAnimationFrame(callbackID);
                lapsedTime = endTime - startTime;
                resultTime1 = lapsedTime / 1000;
                resultTime2 = (targetTime - lapsedTime) / 1000 * -1;
                resultScore = 1000 - Math.abs(targetTime - lapsedTime);
                if (resultScore < 0){
                    resultScore = 0;
                }
                result1 = '経過時間 ' + resultTime1 + ' 秒';
                result2 = '誤差 ' + resultTime2 + ' 秒';
                result3 = '得点 ' + resultScore + ' 点';
                cu.drawText40(result1, 10, 250, 1000, 'black');
                cu.drawText40(result2, 10, 300, 1000, 'black');
                cu.drawText40(result3, 10, 350, 1000, 'black');
                countStage++;
                if (countStage == 4){
                    flagTimer = 9;
                } else {
                    flagTimer = 1;
                }
            } else if (flagTimer == 9) {
                cu.clear();
                cu.drawText40('ゲームクリア！', 50, 300, 1000, 'black');
                flagTimer = 0;
            } else if (flagTimer == 0) {
                cu.clear();
                cu.drawText30('時間計測ゲーム', 100, 200, 1000, 'black');
                cu.drawText30('touch any area', 100, 250, 1000, 'black');
                flagTimer = 1;
                countStage = 1;
            }
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

        // UPDATE, DRAW 処理
        function render(){
            // 画面をクリア            
            cu.clear();
            // 時刻を更新
            endTime = new Date();
            cu.drawText(startTime.getSeconds(), 50, 70, 1000, 'gray');
            cu.drawText(startTime.getMilliseconds(), 50, 100, 1000, 'gray');
            cu.drawText(endTime.getSeconds(), 50, 130, 1000, 'gray');
            cu.drawText(endTime.getMilliseconds(), 50, 160, 1000, 'gray');
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
            
            // 画面更新
            if (flagTimer) {
                stats.update();
            } else {
                stats.end();
            }
            callbackID = requestAnimationFrame(render);
        }
    }, false);
})();