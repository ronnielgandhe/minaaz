import { useEffect, useRef } from 'react';

export default function DiamondParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let scrollSpeed = 0;
    let lastScrollY = window.scrollY;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleScroll = () => {
      scrollSpeed = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    class Particle {
      constructor(initial = false) {
        this.reset(initial);
      }

      reset(initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : -20;
        this.size = Math.random() * 5 + 2;
        this.speedY = Math.random() * 0.8 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.opacity = 0;
        this.maxOpacity = Math.random() * 0.35 + 0.08;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.type = Math.random() > 0.4 ? 'diamond' : 'sparkle';
        this.twinkle = Math.random() * Math.PI * 2;
        this.twinkleSpeed = Math.random() * 0.03 + 0.01;
        this.drift = Math.random() * Math.PI * 2;
        this.driftSpeed = Math.random() * 0.003 + 0.001;
        this.fadeIn = true;
      }

      update() {
        const boost = Math.min(scrollSpeed * 0.15, 5);
        this.y += this.speedY + boost;
        this.drift += this.driftSpeed;
        this.x += this.speedX + Math.sin(this.drift) * 0.2;
        this.rotation += this.rotationSpeed;
        this.twinkle += this.twinkleSpeed;

        if (this.fadeIn) {
          this.opacity = Math.min(this.opacity + 0.01, this.maxOpacity);
          if (this.opacity >= this.maxOpacity) this.fadeIn = false;
        }

        this.opacity = this.maxOpacity * (0.5 + 0.5 * Math.sin(this.twinkle));

        if (this.y > canvas.height + 30) this.reset(false);
      }

      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        if (this.type === 'diamond') {
          const s = this.size;
          ctx.beginPath();
          ctx.moveTo(0, -s * 1.4);
          ctx.lineTo(s * 0.8, 0);
          ctx.lineTo(0, s * 0.7);
          ctx.lineTo(-s * 0.8, 0);
          ctx.closePath();

          const grad = ctx.createLinearGradient(-s, -s, s, s);
          grad.addColorStop(0, 'rgba(201, 169, 110, 0.9)');
          grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
          grad.addColorStop(1, 'rgba(201, 169, 110, 0.7)');
          ctx.fillStyle = grad;
          ctx.fill();

          // Facet line
          ctx.beginPath();
          ctx.moveTo(-s * 0.8, 0);
          ctx.lineTo(s * 0.8, 0);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        } else {
          const s = this.size * 0.7;
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI) / 2;
            const ox = Math.cos(angle) * s * 1.5;
            const oy = Math.sin(angle) * s * 1.5;
            const ia = angle + Math.PI / 4;
            const ix = Math.cos(ia) * s * 0.25;
            const iy = Math.sin(ia) * s * 0.25;
            if (i === 0) ctx.moveTo(ox, oy);
            else ctx.lineTo(ox, oy);
            ctx.lineTo(ix, iy);
          }
          ctx.closePath();
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.fill();

          ctx.shadowColor = 'rgba(201, 169, 110, 0.6)';
          ctx.shadowBlur = s * 3;
          ctx.fill();
        }

        ctx.restore();
      }
    }

    const count = Math.min(Math.floor(window.innerWidth / 25), 55);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(true));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (scrollSpeed > 8 && particles.length < 90) {
        for (let i = 0; i < Math.min(Math.floor(scrollSpeed / 10), 3); i++) {
          particles.push(new Particle(false));
        }
      }

      if (scrollSpeed < 2 && particles.length > count) {
        particles.pop();
      }

      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      scrollSpeed *= 0.94;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[2] pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
