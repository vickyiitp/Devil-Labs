import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PerformanceTier } from '../lib/performanceDetector';

interface InteractiveLabCanvasProps {
  sceneStep: number;
  performanceTier: PerformanceTier;
}

export default function InteractiveLabCanvas({ sceneStep, performanceTier }: InteractiveLabCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || performanceTier === 'STATIC') return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.035);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 10);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // =========================================================
    // 3D LAB WORKSTATION & ENVIRONMENT GEOMETRY
    // =========================================================

    // A. Engineering Desk Surface
    const deskGeo = new THREE.BoxGeometry(16, 0.4, 8);
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x0f0f14,
      roughness: 0.8,
      metalness: 0.2,
    });
    const deskMesh = new THREE.Mesh(deskGeo, deskMat);
    deskMesh.position.set(0, -2.2, 0);
    rootGroup.add(deskMesh);

    // B. Developer Monitor Frame
    const monitorScreenGeo = new THREE.PlaneGeometry(8, 4.5);
    const monitorScreenMat = new THREE.MeshBasicMaterial({
      color: 0x1e1b4b, // Deep purple monitor glow
    });
    const monitorScreen = new THREE.Mesh(monitorScreenGeo, monitorScreenMat);
    monitorScreen.position.set(0, 0.8, -1);
    rootGroup.add(monitorScreen);

    const monitorBezelGeo = new THREE.BoxGeometry(8.4, 4.9, 0.2);
    const monitorBezelMat = new THREE.MeshStandardMaterial({
      color: 0x050508,
      roughness: 0.5,
      metalness: 0.9,
    });
    const monitorBezel = new THREE.Mesh(monitorBezelGeo, monitorBezelMat);
    monitorBezel.position.set(0, 0.8, -1.15);
    rootGroup.add(monitorBezel);

    // Monitor Stand
    const standGeo = new THREE.CylinderGeometry(0.3, 0.4, 2, 16);
    const standMat = new THREE.MeshStandardMaterial({ color: 0x121218, metalness: 0.9 });
    const standMesh = new THREE.Mesh(standGeo, standMat);
    standMesh.position.set(0, -1.2, -1.2);
    rootGroup.add(standMesh);

    // Keyboard Silhouette
    const kbGeo = new THREE.BoxGeometry(4.2, 0.1, 1.4);
    const kbMat = new THREE.MeshStandardMaterial({ color: 0x181820, roughness: 0.7 });
    const kbMesh = new THREE.Mesh(kbGeo, kbMat);
    kbMesh.position.set(0, -1.95, 2.5);
    rootGroup.add(kbMesh);

    // =========================================================
    // THE LIFECYCLE 3D CANDLE & PROCEDURAL FLAME
    // =========================================================

    const candleGroup = new THREE.Group();
    candleGroup.position.set(4.8, -1.9, 1.8);
    rootGroup.add(candleGroup);

    // Wax Body (Height reduces across scenes)
    const waxGeo = new THREE.CylinderGeometry(0.35, 0.4, 1.8, 24);
    const waxMat = new THREE.MeshStandardMaterial({
      color: 0xede9fe,
      roughness: 0.4,
      emissive: 0x3b0764,
      emissiveIntensity: 0.1,
    });
    const waxMesh = new THREE.Mesh(waxGeo, waxMat);
    waxMesh.position.y = 0.9;
    candleGroup.add(waxMesh);

    // Candle Wick
    const wickGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8);
    const wickMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const wickMesh = new THREE.Mesh(wickGeo, wickMat);
    wickMesh.position.y = 1.95;
    candleGroup.add(wickMesh);

    // 3D Procedural Candle Flame Shader / Mesh
    const flameGeo = new THREE.ConeGeometry(0.16, 0.5, 16);
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b, // Warm Amber flame
      transparent: true,
      opacity: 0.9,
    });
    const flameMesh = new THREE.Mesh(flameGeo, flameMat);
    flameMesh.position.y = 2.25;
    candleGroup.add(flameMesh);

    // Candle Light Glow
    const candleLight = new THREE.PointLight(0xf59e0b, 2.5, 12);
    candleLight.position.y = 2.2;
    candleGroup.add(candleLight);

    // =========================================================
    // 3D ARCHITECTURE NODES & DATA STREAM PARTICLES (SCENE 04 - 06)
    // =========================================================

    const archGroup = new THREE.Group();
    archGroup.position.set(0, 0.8, 1);
    rootGroup.add(archGroup);

    const archNodesData = [
      { name: 'Client', pos: new THREE.Vector3(-4.5, 1.5, 0), color: 0xa78bfa },
      { name: 'Website', pos: new THREE.Vector3(-3, 0, 0), color: 0x38bdf8 },
      { name: 'Database', pos: new THREE.Vector3(-1, 1.2, 0), color: 0x34d399 },
      { name: 'CRM', pos: new THREE.Vector3(1, -0.8, 0), color: 0xf59e0b },
      { name: 'Automation', pos: new THREE.Vector3(3, 1, 0), color: 0xf43f5e },
      { name: 'Cloud', pos: new THREE.Vector3(4.8, -0.5, 0), color: 0xc084fc },
    ];

    const archNodes: THREE.Mesh[] = [];
    archNodesData.forEach((node) => {
      const nodeGeo = new THREE.IcosahedronGeometry(0.35, 1);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.6,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(node.pos);
      archGroup.add(nodeMesh);
      archNodes.push(nodeMesh);
    });

    // Connecting Energy Beams
    const beamPoints: THREE.Vector3[] = archNodesData.map((n) => n.pos);
    const beamGeo = new THREE.BufferGeometry().setFromPoints(beamPoints);
    const beamMat = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.6,
    });
    const beamLine = new THREE.Line(beamGeo, beamMat);
    archGroup.add(beamLine);

    // Dust & Ambient Code Particles
    const particleCount = performanceTier === 'ULTRA' ? 600 : (performanceTier === 'BALANCED' ? 300 : 100);
    const pPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 20;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const pSystem = new THREE.Points(pGeo, pMat);
    rootGroup.add(pSystem);

    // Ambient & Accent Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const monitorGlowLight = new THREE.PointLight(0x7c3aed, 3, 15);
    monitorGlowLight.position.set(0, 1, 0);
    scene.add(monitorGlowLight);

    const morningLight = new THREE.DirectionalLight(0xfef08a, 0); // Morning Sun (Scene 08 / 09)
    morningLight.position.set(-10, 10, 10);
    scene.add(morningLight);

    // Mouse Interaction for Flame Flickering & Camera Tilt
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // 1. Flame Flickering & Cursor Reactivity
      const flicker = Math.sin(elapsedTime * 15) * 0.05 + Math.cos(elapsedTime * 23) * 0.03;
      flameMesh.scale.set(1 + flicker + Math.abs(mouseX) * 0.2, 1 + flicker * 1.5, 1 + flicker);
      flameMesh.rotation.z = mouseX * 0.25;
      candleLight.intensity = Math.max(0, (2.5 + flicker * 2) * (sceneStep >= 8 ? (9 - sceneStep) * 0.3 : 1));

      // 2. Candle Height Lifecycle Reduction across scenes
      // Scene 1: 100% -> Scene 8: 30% -> Scene 9: Morning Light / Candle Extinguished
      const targetScaleY = Math.max(0.15, 1 - (sceneStep - 1) * 0.1);
      waxMesh.scale.y += (targetScaleY - waxMesh.scale.y) * 0.05;

      if (sceneStep >= 9) {
        flameMesh.visible = false; // Extinguished in morning light
        morningLight.intensity += (2.5 - morningLight.intensity) * 0.03;
      } else {
        flameMesh.visible = true;
        morningLight.intensity += (0 - morningLight.intensity) * 0.05;
      }

      // 3. Architecture Group Visibility (Scenes 4 - 6)
      if (sceneStep >= 4 && sceneStep <= 7) {
        archGroup.visible = true;
        archGroup.rotation.y = elapsedTime * 0.3;
        archNodes.forEach((n, i) => {
          n.rotation.y = elapsedTime * 1.2;
          n.position.y = archNodesData[i].pos.y + Math.sin(elapsedTime * 2 + i) * 0.2;
        });
      } else {
        archGroup.visible = false;
      }

      // 4. Particle System Floating
      pSystem.rotation.y = elapsedTime * 0.03;

      // 5. Camera Motion Parallax
      camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.05;
      camera.position.y += (1.2 - mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0.2, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      deskGeo.dispose();
      deskMat.dispose();
      monitorScreenGeo.dispose();
      monitorScreenMat.dispose();
      waxGeo.dispose();
      waxMat.dispose();
      flameGeo.dispose();
      flameMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, [sceneStep, performanceTier]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
}
