<template>
    <div id="background-design" :class="{ 'h-screen': height === 'screen' }" :style="{height: height + 'px'}"></div>
</template>
<script>
export default {
    name: 'backgroundDesign',
    props: {
        height: {
            // 背景高度
            type: String,
            default: '400',
        },
        count: {
            // 粒子数量 取值范围：2-100
            type: Number,
            default: 8,
        },
        size_min: {
            // 粒子尺寸范围-最小值 取值范围：1-1500
            type: Number,
            default: 1100,
        },
        size_max: {
            // 粒子尺寸范围-最大值 取值范围：1-1500
            type: Number,
            default: 1300,
        },
        size_pulse: {
            // 粒子变化速度 取值范围：0-2(可以是小数)
            type: Number,
            default: 0.3,
        },
        speed_x_min: {
            // 粒子在X轴上的移动速度最小值 取值范围：0-5(可以是小数)
            type: Number,
            default: 0.1,
        },
        speed_x_max: {
            // 粒子在X轴上的移动速度最大值 取值范围：0-5(可以是小数)
            type: Number,
            default: 0.3,
        },
        speed_y_min: {
            // 粒子在Y轴上的移动速度最小值 取值范围：0-5(可以是小数)
            type: Number,
            default: 0.1,
        },
        speed_y_max: {
            // 粒子在Y轴上的移动速度最大值 取值范围：0-5(可以是小数)
            type: Number,
            default: 0.3,
        },
        colors_background: {
            // 背景颜色
            type: String,
            default: '#9147c6',
        },
        colors_particles: {
            // 粒子可取颜色，可多个，最少一个
            type: Array,
            default: () => ['#80b2ff', '#ffa845', '#f95e6b', '#ac75d4'],
        },
        blending: {
            // 混合模式 取值范围 ”none“，”overlay“，”screen“，“lighten”
            type: String,
            default: 'overlay',
        },
        opacity_center: {
            // 粒子中心透明度 取值范围：0-1(可以是小数)
            type: Number,
            default: 0.5,
        },
        opacity_edge: {
            // 粒子边缘透明度 取值范围：0-1(可以是小数)
            type: Number,
            default: 0.1,
        },
        skew: {
            // 背景倾斜角度 取值范围 -3 - 3(可以是小数)
            type: Number,
            default: -2,
        },
        shapes: {
            // 粒子形状，三种形状，可多选 “c”:圆形， “s”：矩形， “t”：三角形
            type: Array,
            default: () => ['c'],
        },
    },
    mounted() {
        let ocustom_options = {
            count: this.count,
            size: {
                min: this.size_min,
                max: this.size_max,
                pulse: this.size_pulse,
            },
            speed: {
                x: {
                    min: this.speed_x_min,
                    max: this.speed_x_max,
                },
                y: {
                    min: this.speed_y_min,
                    max: this.speed_y_max,
                },
            },
            colors: {
                background: this.colors_background,
                particles: this.colors_particles,
            },
            blending: this.blending,
            opacity: {
                center: this.opacity_center,
                edge: this.opacity_edge,
            },
            skew: this.height === 'screen' ? 0 : this.skew,
            shapes: this.shapes,
        };
        new BackgroundDesign(ocustom_options);
    },
};

var BackgroundDesign = (function() {
    let that = null;
    function BackgroundDesign(ocustom_options) {
        this.options = {
            count: ocustom_options.count,
            size: {
                min: ocustom_options.size.min,
                max: ocustom_options.size.max,
                pulse: ocustom_options.size.pulse,
            },
            speed: {
                x: {
                    min: ocustom_options.speed.x.min,
                    max: ocustom_options.speed.x.max,
                },
                y: {
                    min: ocustom_options.speed.y.min,
                    max: ocustom_options.speed.y.max,
                },
            },
            colors: {
                background: ocustom_options.colors.background,
                particles: ocustom_options.colors.particles,
            },
            blending: ocustom_options.blending,
            opacity: {
                center: ocustom_options.opacity.center,
                edge: ocustom_options.opacity.edge,
            },
            skew: ocustom_options.skew,
            shapes: ocustom_options.shapes,
        };
        this.init();
    }

    BackgroundDesign.prototype.init = function() {
        this.c = document.createElement('canvas');
        this.x = this.c.getContext('2d');
        this.c.setAttribute('id', 'finisher-canvas');
        this.el = document.getElementById('background-design');
        this.el.appendChild(this.c);

        this.o = this.options;
        this.bc = hexToRgb(this.o.colors.background);
        this.particles = [];
        that = this;
        this.resize();
        this.createParticles();
        window.requestAnimationFrame(animate.bind());

        var tm = void 0;
        window.addEventListener('resize', function() {
            clearTimeout(tm);
            tm = setTimeout(that.resize.bind(), 150);
            false;
        });
    };

    BackgroundDesign.prototype.resize = function() {
        var el = that.el;
        that.o.c = {
            w: el.clientWidth,
            h: el.clientHeight,
        };
        that.c.width = that.o.c.w;
        that.c.height = that.o.c.h;
        var offset = getOppositeSide(that.o.skew, that.o.c.w / 2);
        var transform = 'skewY(' + that.o.skew + 'deg) translateY(-' + offset + 'px)';
        that.c.setAttribute('style', 'position:absolute;z-index:1;top:0;left:0;right:0;bottom:0;-webkit-transform:' + transform + ';transform:' + transform + ';outline: 1px solid transparent;background-color:rgba(' + that.bc.r + ',' + that.bc.g + ',' + that.bc.b + ',1);');
    };

    BackgroundDesign.prototype.createParticles = function() {
        var curColor = 0;
        this.particles = [];
        this.o.ac = window.innerWidth < 600 && this.o.count > 5 ? Math.round(this.o.count / 2) : this.o.count;
        for (var i = 0; i < this.o.ac; i++) {
            var quadrant = i % 4;
            var item = new FinisherParticle(this.o.colors.particles[curColor], quadrant, this.o);
            if (++curColor >= this.o.colors.particles.length) {
                curColor = 0;
            }
            this.particles[i] = item;
        }
    };

    function animate() {
        window.requestAnimationFrame(animate.bind());
        that.x.clearRect(0, 0, that.o.c.w, that.o.c.h);
        for (var i = 0; i < that.o.ac; i++) {
            var item = that.particles[i];
            item.animate(that.x, that.o.c.w, that.o.c.h);
        }
    }

    return BackgroundDesign;
})();

var FinisherParticle = (function() {
    function FinisherParticle(hex, quadrant, options) {
        this.o = options;
        this.r = hexToRgb(hex);
        this.d = this.getRandomDir();
        this.h = this.getRandomShape();
        this.s = Math.abs(this.getNrFromRange(this.o.size));
        this.setRandomPositionGivenQuadrant(quadrant);
        this.vx = this.getNrFromRange(this.o.speed.x) * this.getRandomDir();
        this.vy = this.getNrFromRange(this.o.speed.y) * this.getRandomDir();
    }

    FinisherParticle.prototype.setRandomPositionGivenQuadrant = function(quadrant) {
        var position = this.getRandomPositionInQuadrant();
        if (quadrant === 3) {
            this.x = position.x + position.halfWidth;
            this.y = position.y;
            return;
        }
        if (quadrant === 2) {
            this.x = position.x;
            this.y = position.y + position.halfHeight;
            return;
        }
        if (quadrant === 1) {
            this.x = position.x + position.halfWidth;
            this.y = position.y + position.halfHeight;
            return;
        }
        this.x = position.x;
        this.y = position.y;
    };

    FinisherParticle.prototype.getRandomPositionInQuadrant = function() {
        var halfWidth = this.o.c.w / 2;
        var halfHeight = this.o.c.h / 2;
        return {
            x: Math.random() * halfWidth,
            y: Math.random() * halfHeight,
            halfHeight: halfHeight,
            halfWidth: halfWidth,
        };
    };

    FinisherParticle.prototype.getNrFromRange = function(range) {
        if (range.min === range.max) {
            return range.min;
        }
        var diff = range.max - range.min;
        return Math.random() * diff + range.min;
    };

    FinisherParticle.prototype.getRandomDir = function() {
        return Math.random() > 0.5 ? 1 : -1;
    };

    FinisherParticle.prototype.getRandomShape = function() {
        return this.o.shapes[Math.floor(Math.random() * this.o.shapes.length)];
    };

    FinisherParticle.prototype.getRgba = function(rgb, a) {
        return 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + a + ')';
    };

    FinisherParticle.prototype.animate = function(ctx, width, height) {
        if (this.o.size.pulse) {
            this.s += this.o.size.pulse * this.d;
            if (this.s > this.o.size.max || this.s < this.o.size.min) {
                this.d *= -1;
            }
            this.s = Math.abs(this.s);
        }
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) {
            this.vx *= -1;
            this.x += 1;
        } else if (this.x > width) {
            this.vx *= -1;
            this.x -= 1;
        }
        if (this.y < 0) {
            this.vy *= -1;
            this.y += 1;
        } else if (this.y > height) {
            this.vy *= -1;
            this.y -= 1;
        }
        ctx.beginPath();
        if (this.o.blending && this.o.blending !== 'none') {
            ctx.globalCompositeOperation = this.o.blending;
        }
        var c1 = this.getRgba(this.r, this.o.opacity.center);
        var c2 = this.getRgba(this.r, this.o.opacity.edge);
        var gradientEndRadius = this.h === 'c' ? this.s / 2 : this.h === 't' ? this.s * 0.577 : this.h === 's' ? this.s * 0.707 : this.s;
        var g = ctx.createRadialGradient(this.x, this.y, 0.01, this.x, this.y, gradientEndRadius);
        g.addColorStop(0, c1);
        g.addColorStop(1, c2);
        ctx.fillStyle = g;
        var halfSize = Math.abs(this.s / 2);
        if (this.h === 'c') {
            ctx.arc(this.x, this.y, halfSize, 0, 6.283185, false); // pi * 2
        }
        if (this.h === 's') {
            var l = this.x - halfSize;
            var r = this.x + halfSize;
            var t = this.y - halfSize;
            var b = this.y + halfSize;
            ctx.moveTo(l, b);
            ctx.lineTo(r, b);
            ctx.lineTo(r, t);
            ctx.lineTo(l, t);
        }
        if (this.h === 't') {
            var baseToCenter = getOppositeSide(30, halfSize);
            var baseY = this.y + baseToCenter;
            ctx.moveTo(this.x - halfSize, baseY);
            ctx.lineTo(this.x + halfSize, baseY);
            ctx.lineTo(this.x, this.y - baseToCenter * 2);
        }
        ctx.closePath();
        ctx.fill();
    };

    return FinisherParticle;
})();

function hexToRgb(hex) {
    var c = void 0;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return {
            r: (c >> 16) & 255,
            g: (c >> 8) & 255,
            b: c & 255,
        };
    }
    return { r: 0, g: 0, b: 0 };
}

function getOppositeSide(angle, side) {
    var tan = Math.tan(Math.abs(angle) * 0.017453); // pi / 180
    return Math.ceil(side * tan);
}
</script>
<style scoped lang="less"></style>
