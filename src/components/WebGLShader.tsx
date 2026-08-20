'use client';

import React, { useEffect, useRef } from 'react';

interface WebGLShaderProps {
  type?: 'elemental' | 'fire'; // elemental: ANIMATION_3, fire: ANIMATION_4
  className?: string;
  opacity?: number;
}

export const WebGLShader: React.FC<WebGLShaderProps> = ({
  type = 'elemental',
  className = 'absolute inset-0 w-full h-full pointer-events-none',
  opacity = 0.8,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animFrameId: number;

    const gl = canvas.getContext('webgl') || (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    if (!gl) return;

    function syncSize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor((canvas.clientWidth || 1280) * dpr);
      const h = Math.floor((canvas.clientHeight || 720) * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Shader 1 (Elemental) vs Shader 2 (Fire / Transformation)
    const fsElemental = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;

      void main() {
        vec2 uv = v_texCoord;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= u_resolution.x / u_resolution.y;

        float t = u_time * 0.45;
        
        // Smooth flowing noise-like movement
        float f = 0.0;
        f += 0.5000 * sin(p.x * 2.0 + t + sin(p.y * 3.0 + t));
        f += 0.2500 * sin(p.y * 4.0 - t + sin(p.x * 2.0 + t));
        
        // Elemental blend: Blue (Water/Space), Purple (Air), Lavender
        vec3 col1 = vec3(0.06, 0.09, 0.16); // Deep Navy
        vec3 col2 = vec3(0.39, 0.40, 0.95); // Indigo
        vec3 col3 = vec3(0.88, 0.91, 1.0);  // Lavender
        
        vec3 color = mix(col1, col2, 0.5 + 0.5 * sin(f + t));
        color = mix(color, col3, 0.3 * cos(p.y * 2.0 + f));
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const fsFire = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;

      void main() {
        vec2 uv = v_texCoord;
        float t = u_time * 0.35;
        
        vec2 p = (uv * 2.0 - 1.0);
        p.x *= u_resolution.x / u_resolution.y;
        
        float f = 0.0;
        for(float i = 1.0; i < 4.0; i++) {
          p += vec2(0.3 / i * sin(i * p.y + t + 0.3 * i), 0.4 / i * sin(i * p.x + t + 0.5 * i));
          f += 0.5 / i * sin(i * p.x + p.y + t);
        }
        
        // Warm, transformational tones: Gold, Amber, Deep Purple
        vec3 color = mix(vec3(0.35, 0.11, 0.53), vec3(0.95, 0.55, 0.1), 0.5 + 0.5 * sin(f + t));
        color = mix(color, vec3(1.0, 0.88, 0.6), 0.25 * cos(p.y * 3.0));
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const fsSource = type === 'fire' ? fsFire : fsElemental;

    function createShader(glCtx: WebGLRenderingContext, sType: number, source: string) {
      const shader = glCtx.createShader(sType);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertShader = createShader(gl, gl.VERTEX_SHADER, vs);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertShader || !fragShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse = { x: nx * canvas.width, y: ny * canvas.height };
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    function render(t: number) {
      if (!gl || !canvas) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animFrameId = requestAnimationFrame(render);
    }

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [type]);

  return (
    <div className={className} style={{ opacity }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
};
