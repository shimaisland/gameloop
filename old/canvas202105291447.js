/**
 * Canvasクラス
 * @class
 */
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
    setSize(x, y){
        this.canvas.width = x;
        this.canvas.height = y;
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
    drawButton(text, x, y, width, height, color, score){
        // テキスト表示
        this.ctx.font = "30px sans-serif";
        this.ctx.fillStyle = 'black';
        var textWidth = this.ctx.measureText( text ).width;
        this.ctx.fillText(text, (this.canvas.width - textWidth) / 2, y);
        // ボタン表示
        if(color != null){
            this.ctx.fillStyle = color;
            this.ctx.strokeStyle = 'black';
            this.ctx.globalAlpha = 0.2;
        }
        this.ctx.beginPath();
        this.ctx.rect((this.canvas.width - textWidth) / 2,
                           y - 50,
                           textWidth,
                           height);
        this.ctx.fill() ;
        this.ctx.stroke();
        /*
        this.canvas.addEventListener('click', (eve) => {
            return function ff(){
                var x = eve.clientX;
                var y = eve.clientY;
                if (this.ctx.isPointInPath(x, y)) {
                    const url = encodeURI("https://shimaisland.github.io/gameloop/");
                    window.open(`http://twitter.com/intent/tweet?text=経過時間当てゲームを${score}点でクリアした&hashtags=uneriE&url=${url}`);
                }
                
            }
        }, false);
        */
        this.canvas.addEventListener('click', tweetText.bind(this), false);
        this.ctx.closePath();
        //this.canvas.removeEventListener('click',tweetText.bind(this),false);
        this.ctx.globalAlpha = 1.0;

        function tweetText(eve){
            var x = eve.clientX;
            var y = eve.clientY;
            if (this.ctx.isPointInPath(x, y)) {
                const url = encodeURI("https://shimaisland.github.io/gameloop/");
                window.open(`http://twitter.com/intent/tweet?text=経過時間当てゲームを${score}点でクリアした&hashtags=uneriE&url=${url}`);
            }
            this.canvas.removeEventListener('click',tweetText.bind(this),false);
        }

        
    }
    
    drawText(text, x, y, width, color){
        // 色が指定されている場合はスタイルを設定する
        if(color != null){
            this.ctx.fillStyle = color;
        }
        this.ctx.font = "20px sans-serif";
        this.ctx.fillText(text, x, y, width);
    }
    drawText30(text, x, y, width, color){
        // 色が指定されている場合はスタイルを設定する
        if(color != null){
            this.ctx.fillStyle = color;
        }
        this.ctx.font = "30px sans-serif";
        var textWidth = this.ctx.measureText( text ).width;
        this.ctx.fillText(text, (this.canvas.width - textWidth) / 2, y);
    }
    drawText40(text, x, y, width, color){
        // 色が指定されている場合はスタイルを設定する
        if(color != null){
            this.ctx.fillStyle = color;
        }
        this.ctx.font = "40px sans-serif";
        var textWidth = this.ctx.measureText( text ).width
        this.ctx.fillText(text, (this.canvas.width - textWidth) / 2, y);
    }
    drawText60(text, x, y, width, color){
        // 色が指定されている場合はスタイルを設定する
        if(color != null){
            this.ctx.fillStyle = color;
        }
        this.ctx.font = "150px sans-serif";
        var textWidth = this.ctx.measureText( text ).width
        this.ctx.fillText(text, (this.canvas.width - textWidth) / 2, y);
    }
}