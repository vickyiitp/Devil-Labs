import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera & WebGL Renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Root Group
    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    // ==========================================
    // MEANINGFUL 3D AI ARCHITECTURE SYSTEM
    // ==========================================

    // A. CENTRAL AI NEURAL CORE (Representing Devil Labs Autonomous Intelligence)
    const coreGeo = new THREE.OctahedronGeometry(2.2, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      roughness: 0.15,
      metalness: 0.85,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.6,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sceneGroup.add(coreMesh);

    // Inner Glowing Core Light
    const coreLight = new THREE.PointLight(0xa78bfa, 6, 25);
    coreMesh.add(coreLight);

    // Hardened Security Wireframe Shell (System Isolation & Security)
    const shellGeo = new THREE.IcosahedronGeometry(3.6, 1);
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    sceneGroup.add(shellMesh);

    // B. SATELLITE PILLAR NODES (Representing the 4 Pillars of Devil Labs)
    // 1. Multi-Agent AI Systems (Violet)
    // 2. Full-Stack Web Architecture (Cyan)
    // 3. Cloud DevOps & VPS (Amber)
    // 4. RAG & Real-Time Data Pipelines (Rose)

    const satelliteData = [
      { color: 0x8b5cf6, pos: new THREE.Vector3(-8, 4, -2), name: 'AI Swarms' },
      { color: 0x38bdf8, pos: new THREE.Vector3(8, 3, -1), name: 'Full-Stack Web' },
      { color: 0xf59e0b, pos: new THREE.Vector3(-7, -4, 1), name: 'DevOps & VPS' },
      { color: 0xf43f5e, pos: new THREE.Vector3(7, -5, -2), name: 'RAG Data Core' },
    ];

    const satelliteMeshes: THREE.Mesh[] = [];
    const connectionLines: THREE.Line[] = [];
    const dataPackets: THREE.Mesh[] = [];

    satelliteData.forEach((node) => {
      // Node Mesh
      const nodeGeo = new THREE.DodecahedronGeometry(0.8);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.5,
        roughness: 0.2,
        metalness: 0.8,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(node.pos);
      sceneGroup.add(nodeMesh);
      satelliteMeshes.push(nodeMesh);

      // Synapse Laser Line Connection to Central AI Core
      const linePoints = [new THREE.Vector3(0, 0, 0), node.pos];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
      const lineMat = new THREE.LineBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.35,
      });
      const connectionLine = new THREE.Line(lineGeo, lineMat);
      sceneGroup.add(connectionLine);
      connectionLines.push(connectionLine);

      // Active Data Packet (Light Spheres traveling back & forth)
      const packetGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const packetMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
      });
      const packetMesh = new THREE.Mesh(packetGeo, packetMat);
      sceneGroup.add(packetMesh);
      dataPackets.push(packetMesh);
    });

    // C. BACKGROUND NEURAL DUST / SYNAPSE FIELD
    const particleCount = 600;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x8b5cf6);
    const c2 = new THREE.Color(0x38bdf8);
    const c3 = new THREE.Color(0xf43f5e);

    for (let i = 0; i < particleCount; i++) {
      const radius = 10 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = Math.random() > 0.6 ? c1 : (Math.random() > 0.3 ? c2 : c3);
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particleField = new THREE.Points(particleGeo, particleMat);
    sceneGroup.add(particleField);

    // D. LIGHTING SETUP
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x8b5cf6, 2.5);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 2);
    dirLight2.position.set(-10, -15, -10);
    scene.add(dirLight2);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Window Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // 1. Central Core Rotation & Breathing Pulse
      coreMesh.rotation.y = elapsedTime * 0.4;
      coreMesh.rotation.x = elapsedTime * 0.2;

      const pulseScale = 1 + Math.sin(elapsedTime * 2.5) * 0.08;
      coreMesh.scale.set(pulseScale, pulseScale, pulseScale);

      // 2. Shell Counter-Rotation
      shellMesh.rotation.y = -elapsedTime * 0.2;
      shellMesh.rotation.z = elapsedTime * 0.15;

      // 3. Satellite Node Orbiting & Rotation
      satelliteMeshes.forEach((mesh, index) => {
        mesh.rotation.x = elapsedTime * 0.8;
        mesh.rotation.y = elapsedTime * 0.6;

        // Floating Bobbing effect
        mesh.position.y = satelliteData[index].pos.y + Math.sin(elapsedTime * 1.5 + index) * 0.4;

        // Update Connection Line End Position
        const positionsAttr = connectionLines[index].geometry.attributes.position as THREE.BufferAttribute;
        positionsAttr.setXYZ(1, mesh.position.x, mesh.position.y, mesh.position.z);
        positionsAttr.needsUpdate = true;

        // Animate Data Packet Traveling Along Synapse Line
        const progress = (Math.sin(elapsedTime * 2 + index * 1.2) + 1) / 2; // 0 to 1
        dataPackets[index].position.lerpVectors(new THREE.Vector3(0, 0, 0), mesh.position, progress);
      });

      // 4. Particle Field Rotation
      particleField.rotation.y = elapsedTime * 0.03;

      // 5. Mouse Parallax Motion
      targetRotationY += (mouseX * 0.35 - targetRotationY) * 0.05;
      targetRotationX += (-mouseY * 0.35 - targetRotationX) * 0.05;

      sceneGroup.rotation.y = targetRotationY;
      sceneGroup.rotation.x = targetRotationX;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup Resources
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      coreGeo.dispose();
      coreMat.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.85 }}
    />
  );
}
