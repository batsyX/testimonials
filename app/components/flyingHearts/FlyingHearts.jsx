"use client"
import React, { useEffect } from 'react';

const FlyingHearts = () => {
  useEffect(() => {
    const container = document.getElementById('animate');
    const emoji = [ '🍷', '💖', '🐷', '🔥', '😁', '😱',  '👏', ];
    const circles = [];

    function addCircle(delay, range, color) {
      setTimeout(() => {
        const c = new Circle(
          range[0] + Math.random() * range[1],
          80 + Math.random() * 4,
          color,
          {
            x: -0.15 + Math.random() * 0.3,
            y: 1 + Math.random() * 1,
          },
          range
        );
        circles.push(c);
      }, delay);
    }

    function Circle(x, y, c, v, range) {
      this.x = x;
      this.y = y;
      this.color = c;
      this.v = v;
      this.range = range;
      this.element = document.createElement('span');
      this.element.style.opacity = 0;
      this.element.style.position = 'absolute';
      this.element.style.fontSize = '26px';
      this.element.style.color = `hsl(${Math.random() * 360 | 0}, 80%, 50%)`;
      this.element.innerHTML = c;
      container.appendChild(this.element);

      this.update = () => {
        if (this.y > 800) {
          this.y = 80 + Math.random() * 4;
          this.x = this.range[0] + Math.random() * this.range[1];
        }
        this.y += this.v.y;
        this.x += this.v.x;
        this.element.style.opacity = 1;
        this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
      };
    }

    for (let i = 0; i < 7; i++) {
      addCircle(i * 150, [10 + 0, 300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 + 0, -300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 - 200, -300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 + 200, 300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 - 400, -300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 + 400, 300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 - 600, -300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 + 600, 300], emoji[Math.floor(Math.random() * emoji.length)]);
    }

    function animate() {
      for (const circle of circles) {
        circle.update();
      }
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div className="overflow-hidden ">
      <div id="container" className="absolute top-[-100px] left-0 h-[calc(100vh+100px)] w-full overflow-hidden select-none">
        <div id="animate" className="relative w-5 mx-auto"></div>
      </div>      
    </div>
  );
};

export default FlyingHearts;
