import React from 'react';
export default class PluginConfetti extends React.Component {
  componentDidMount(){
    var frame = (function(){
        //对requestAnimationFrame做兼容性处理，当浏览器不支持requestAnimationFrame时，用setTimeout代替
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (cb) {
          window.setTimeout(cb, 1000 / 60);
        };
    }());
  
    //定义默认参数
    var defaults = {
      particleCount: 50,  //碎屑数量
      angle: 90,          //角度
      spread: 45,         //伸展
      startVelocity: 45,  //开始速度
      decay: 0.9,         //衰减
      ticks: 200,         //
      x: 0.5,
      y: 0.5,
      zIndex: 1000,
      colors: [
        '#26ccff',
        '#a25afd',
        '#ff5e7e',
        '#88ff5a',
        '#fcff42',
        '#ffa62d',
        '#ff36ff'
      ]
    };
  
    var animationObj;
  
    function noop() {}
  
    // create a promise if it exists, otherwise, just
    // call the function directly
    //将一个函数变成promise实例
    function promise(func) {
      if (module.exports.Promise) {
        return new module.exports.Promise(func);
      }
  //兼容性处理
      func(noop, noop);
  
      return null;
    }
  
    //用第二个参数处理第一个参数
    function convert(val, transform) {
      return transform ? transform(val) : val;
    }
  
    //判断指定值是否为null或undefined
    function isOk(val) {
      return !(val === null || val === undefined);
    }
  
    //用指定方法处理指定对象中指定属性名对应的属性值
    function prop(options, name, transform) {
      return convert(
        options && isOk(options[name]) ? options[name] : defaults[name],
        transform
      );
    }
  
    //将十六进制的数字转化为十进制，从字符串中提取
    function toDecimal(str) {
      return parseInt(str, 16);
      //parseInt ①没有第二个参数时，提取数字，②第一个参数的进制与第二参数所表示的相同，转化为十进制， ③第一参数的进制与第二参数所表示不一致，转化为第二参数所表示的进制数
    }
  
    //
    function hexToRgb(str) {
      var val = String(str).replace(/[^0-9a-f]/gi, '');
  
      if (val.length < 6) {
          val = val[0]+val[0]+val[1]+val[1]+val[2]+val[2];
      }
  
      //substring包前不包后（下标）
      return {
        r: toDecimal(val.substring(0,2)),
        g: toDecimal(val.substring(2,4)),
        b: toDecimal(val.substring(4,6))
      };
    }
  
    function getOrigin(options) {
      var origin = prop(options, 'origin', Object);
      origin.x = prop(origin, 'x', Number);
      origin.y = prop(origin, 'y', Number);
  
      return origin;
    }
  
    //给指定的canvas设置宽高
    function setCanvasSize(canvas) {
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight;
    }
  
    //给canvas设置样式
    function getCanvas(zIndex) {
      var canvas = document.createElement('canvas');
  
      setCanvasSize(canvas);
  
      canvas.style.position = 'fixed';
      canvas.style.top = '0px';
      canvas.style.left = '0px';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = zIndex;
      canvas.className = 'receive-award-canvas'
      return canvas;
    }
  
    //根据传入的参照生成一套画碎屑的参数
    function randomPhysics(opts) {
      var radAngle = opts.angle * (Math.PI / 180);
      var radSpread = opts.spread * (Math.PI / 180);
  
      return {
        x: opts.x,
        y: opts.y,
        wobble: Math.random() * 10,
        velocity: (opts.startVelocity * 0.5) + (Math.random() * opts.startVelocity),
        angle2D: -radAngle + ((0.5 * radSpread) - (Math.random() * radSpread)),
        tiltAngle: Math.random() * Math.PI,
        color: hexToRgb(opts.color),
        tick: 0,
        totalTicks: opts.ticks,
        decay: opts.decay,
        random: Math.random() + 5,
        tiltSin: 0,
        tiltCos: 0,
        wobbleX: 0,
        wobbleY: 0
      };
    }
  
    function updateFetti(context, fetti) {
      fetti.x += Math.cos(fetti.angle2D) * fetti.velocity;
      fetti.y += Math.sin(fetti.angle2D) * fetti.velocity + 3; // + gravity
      fetti.wobble += 0.1;
      fetti.velocity *= fetti.decay;
      fetti.tiltAngle += 0.1;
      fetti.tiltSin = Math.sin(fetti.tiltAngle);
      fetti.tiltCos = Math.cos(fetti.tiltAngle);
      fetti.random = Math.random() + 5;
      fetti.wobbleX = fetti.x + (10 * Math.cos(fetti.wobble));
      fetti.wobbleY = fetti.y + (10 * Math.sin(fetti.wobble));
  
      var progress = (fetti.tick++) / fetti.totalTicks;
  
      var x1 = fetti.x + (fetti.random * fetti.tiltCos);
      var y1 = fetti.y + (fetti.random * fetti.tiltSin);
      var x2 = fetti.wobbleX + (fetti.random * fetti.tiltCos);
      var y2 = fetti.wobbleY + (fetti.random * fetti.tiltSin);
  
      context.fillStyle = 'rgba(' + fetti.color.r + ', ' + fetti.color.g + ', ' + fetti.color.b + ', ' + (1 - progress) + ')';
      context.beginPath();
  
      context.moveTo(Math.floor(fetti.x), Math.floor(fetti.y));
      context.lineTo(Math.floor(fetti.wobbleX), Math.floor(y1));
      context.lineTo(Math.floor(x2), Math.floor(y2));
      context.lineTo(Math.floor(x1), Math.floor(fetti.wobbleY));
  
      context.closePath();
      context.fill();
  
      return fetti.tick < fetti.totalTicks;
    }
  
    function animate(canvas, fettis, done) {
      var animatingFettis = fettis.slice();
      var context = canvas.getContext('2d');
      var width = canvas.width;
      var height = canvas.height;
  
      function onResize() {
        // don't actually query the size here, since this
        // can execute frequently and rapidly
        width = height = null;
      }
  
      var prom = promise(function (resolve) {
        function update() {
          if (!width && !height) {
            setCanvasSize(canvas);
            width = canvas.width;
            height = canvas.height;
          }
  
          context.clearRect(0, 0, width, height);
  
          animatingFettis = animatingFettis.filter(function (fetti) {
            return updateFetti(context, fetti);
          });
  
          if (animatingFettis.length) {
            frame(update);
          } else {
            window.removeEventListener('resize', onResize);
  
            done();
            resolve();
          }
        }
  
        frame(update);
      });
  
      window.addEventListener('resize', onResize, false);
  
      return {
        addFettis: function (fettis) {
          animatingFettis = animatingFettis.concat(fettis);
  
          return prom;
        },
        canvas: canvas,
        promise: prom
      };
    }
  
    //生成纸屑的函数
    function confetti(options) {
      var particleCount = prop(options, 'particleCount', Math.floor);
      var angle = prop(options, 'angle', Number);
      var spread = prop(options, 'spread', Number);
      var startVelocity = prop(options, 'startVelocity', Number);
      var decay = prop(options, 'decay', Number);
      var colors = prop(options, 'colors');
      var ticks = prop(options, 'ticks', Number);
      var zIndex = prop(options, 'zIndex', Number);
      var origin = getOrigin(options);
  
      var temp = particleCount;
      var fettis = [];
      var canvas = animationObj ? animationObj.canvas : getCanvas(zIndex);
  
      var startX = canvas.width * origin.x;
      var startY = canvas.height * origin.y;
  
      while (temp--) {
        fettis.push(
          randomPhysics({
            x: startX,
            y: startY,
            angle: angle,
            spread: spread,
            startVelocity: startVelocity,
            color: colors[temp % colors.length],
            ticks: ticks,
            decay: decay
          })
        );
      }
  
      // if we have a previous canvas already animating,
      // add to it
      if (animationObj) {
        return animationObj.addFettis(fettis);
      }
  
      document.body.appendChild(canvas);
  
      animationObj = animate(canvas, fettis, function () {
        animationObj = null;
        document.body.removeChild(canvas);
      });
  
      return animationObj.promise;
    }  
    var end = Date.now() + (5 * 1000);

    (function frame() {
      // 调用传入响应参数即可。
        confetti({   
            decay: 1,
            ticks: 200,          
            particleCount: 1,
            startVelocity: 0,
            origin: {
                x: Math.random(), 
                y: Math.random() - 0.2
            },   
            colors:[
              '#F16865',
            ] 
        });
        confetti({ 
            decay: 1,
            ticks: 200,          
            particleCount: 1,
            startVelocity: 0,
            origin: {
                x: Math.random(), 
                y: Math.random() - 0.2
            },   
            colors:[
              '#EFC079'
            ] 
        });
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());        
  }
  render(){
    return(
      <div></div>
    )
  }
}