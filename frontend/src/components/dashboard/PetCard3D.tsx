import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

interface Pet {
  name: string;
  type: "cat" | "dog" | "capybara" | "monkey";
  level: number;
  happiness: number;
}

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const petRef = useRef<THREE.Group | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.set(0, 1, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
    });
    renderer.setSize(200, 200);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(5, 8, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    const petGroup = new THREE.Group();
    petRef.current = petGroup;

    const createPet = (petType: Pet["type"], happiness: number) => {
      const group = new THREE.Group();

      const happinessRatio = happiness / 100;
      let primaryColorHex: number;
      let accentColorHex: number;
      let muzzleColorHex: number;

      switch (petType) {
        case "cat":
          primaryColorHex = new THREE.Color()
            .setHSL(
              0.1,
              0.5 + happinessRatio * 0.2,
              0.6 + happinessRatio * 0.15
            )
            .getHex();
          accentColorHex = new THREE.Color().setHSL(0.05, 0.5, 0.7).getHex();
          muzzleColorHex = new THREE.Color(primaryColorHex)
            .offsetHSL(0, -0.05, 0.15)
            .getHex();
          break;
        case "dog":
          primaryColorHex = new THREE.Color()
            .setHSL(
              0.08,
              0.6 + happinessRatio * 0.2,
              0.55 + happinessRatio * 0.15
            )
            .getHex();
          accentColorHex = new THREE.Color().setHSL(0.06, 0.6, 0.65).getHex();
          muzzleColorHex = new THREE.Color(primaryColorHex)
            .offsetHSL(0, -0.05, 0.15)
            .getHex();
          break;
        default:
          primaryColorHex = 0x8b4513;
          accentColorHex = 0xffffff;
          muzzleColorHex = 0xffefd5;
      }

      const primaryMaterial = new THREE.MeshLambertMaterial({
        color: primaryColorHex,
      });
      const accentMaterial = new THREE.MeshLambertMaterial({
        color: accentColorHex,
      });
      const muzzleMaterial = new THREE.MeshLambertMaterial({
        color: muzzleColorHex,
      });
      const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0x222222 });
      const noseMaterial = new THREE.MeshLambertMaterial({ color: 0x543210 });

      const bodyGeometry = new THREE.SphereGeometry(1.1, 24, 24);
      bodyGeometry.scale(1.15, 0.9, 1);
      const body = new THREE.Mesh(bodyGeometry, primaryMaterial);
      body.position.y = 0;
      body.castShadow = true;
      group.add(body);

      const headGeometry = new THREE.SphereGeometry(1.0, 32, 32);
      const head = new THREE.Mesh(headGeometry, primaryMaterial);
      head.position.y = 1.1;
      head.castShadow = true;
      group.add(head);

      const muzzleGeometry = new THREE.SphereGeometry(0.45, 16, 16);
      muzzleGeometry.scale(1, 0.75, 0.8);
      const muzzle = new THREE.Mesh(muzzleGeometry, muzzleMaterial);
      muzzle.position.set(0, head.position.y - 0.2, 0.7);
      muzzle.castShadow = true;
      group.add(muzzle);

      const noseRadius = petType === "cat" ? 0.1 : 0.13;
      const noseGeometry = new THREE.SphereGeometry(noseRadius, 12, 12);
      const nose = new THREE.Mesh(noseGeometry, noseMaterial);
      nose.position.set(0, muzzle.position.y + 0.08, muzzle.position.z + 0.15);
      nose.castShadow = true;
      group.add(nose);

      const eyeGeometry = new THREE.SphereGeometry(0.22, 16, 16);
      const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      leftEye.position.set(-0.38, head.position.y + 0.1, 0.75);
      group.add(leftEye);

      const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      rightEye.position.set(0.38, head.position.y + 0.1, 0.75);
      group.add(rightEye);

      if (petType === "cat") {
        const earGeometry = new THREE.ConeGeometry(0.4, 0.8, 8);
        const leftEar = new THREE.Mesh(earGeometry, primaryMaterial);
        leftEar.position.set(-0.5, head.position.y + 0.7, 0.05);
        leftEar.rotation.z = 0.25;
        leftEar.rotation.y = -0.2;
        leftEar.castShadow = true;
        group.add(leftEar);

        const rightEar = new THREE.Mesh(earGeometry, primaryMaterial);
        rightEar.position.set(0.5, head.position.y + 0.7, 0.05);
        rightEar.rotation.z = -0.25;
        rightEar.rotation.y = 0.2;
        rightEar.castShadow = true;
        group.add(rightEar);

        const innerEarGeom = new THREE.ConeGeometry(0.25, 0.5, 8);
        const innerLeftEar = new THREE.Mesh(innerEarGeom, accentMaterial);
        innerLeftEar.position.set(
          leftEar.position.x,
          leftEar.position.y - 0.1,
          leftEar.position.z + 0.1
        );
        innerLeftEar.rotation.copy(leftEar.rotation);
        group.add(innerLeftEar);

        const innerRightEar = new THREE.Mesh(innerEarGeom, accentMaterial);
        innerRightEar.position.set(
          rightEar.position.x,
          rightEar.position.y - 0.1,
          rightEar.position.z + 0.1
        );
        innerRightEar.rotation.copy(rightEar.rotation);
        group.add(innerRightEar);

        const tailGeometry = new THREE.CapsuleGeometry(0.12, 1.0, 4, 12);
        const tail = new THREE.Mesh(tailGeometry, primaryMaterial);
        tail.position.set(0, body.position.y - 0.3, -0.9);
        tail.rotation.x = -0.6;
        tail.rotation.z = 0.3;
        tail.castShadow = true;
        group.add(tail);
      } else if (petType === "dog") {
        const earGeometry = new THREE.CapsuleGeometry(0.3, 0.7, 4, 12);
        const leftEar = new THREE.Mesh(earGeometry, accentMaterial);
        leftEar.position.set(-0.85, head.position.y + 0.3, 0.0);
        leftEar.rotation.set(0.4, 0.1, 1.2);
        leftEar.castShadow = true;
        group.add(leftEar);

        const rightEar = new THREE.Mesh(earGeometry, accentMaterial);
        rightEar.position.set(0.85, head.position.y + 0.3, 0.0);
        rightEar.rotation.set(0.4, -0.1, -1.2);
        rightEar.castShadow = true;
        group.add(rightEar);

        const tailGeometry = new THREE.CapsuleGeometry(0.2, 0.3, 4, 8);
        tailGeometry.rotateX(Math.PI / 2);
        const tail = new THREE.Mesh(tailGeometry, primaryMaterial);
        tail.position.set(0, body.position.y - 0.1, -1.0);
        tail.rotation.x = 0.8;
        tail.rotation.y = Math.sin(Date.now() * 0.005) * 0.3;
        tail.castShadow = true;
        group.add(tail);
      }

      group.scale.set(1.1, 1.1, 1.1);
      group.position.y = -0.3;

      return group;
    };

    const petMesh = createPet(pet.type, pet.happiness);
    petGroup.add(petMesh);
    scene.add(petGroup);

    let time = 0;
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      time += 0.01;

      if (petRef.current) {
        const breathScale = 1 + Math.sin(time * 2) * 0.03;
        petRef.current.scale.y = 1.1 * breathScale;

        const swayAmount = (pet.happiness / 100) * 0.08;
        petRef.current.rotation.z = Math.sin(time * 1.5) * swayAmount;

        if (isHovered) {
          petRef.current.position.y = -0.3 + Math.sin(time * 4) * 0.1;
          petRef.current.rotation.y += 0.02;
        } else {
          petRef.current.position.y = -0.3 + Math.sin(time * 2) * 0.03;
          petRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
        }

        if (isClicked) {
          const baseScale = 1.1;
          const clickWave = Math.sin(time * 16);
          const clickScaleFactor = 1.1 + clickWave * 0.1;
          petRef.current.scale.x = baseScale * clickScaleFactor;
          petRef.current.scale.z = baseScale * clickScaleFactor;
        } else {
          petRef.current.scale.x = 1.1 * breathScale;
          petRef.current.scale.z = 1.1 * breathScale;
        }

        if (pet.type === "dog" && petMesh.children) {
          const tail = petMesh.children.find(
            (child): child is THREE.Mesh =>
              child instanceof THREE.Mesh &&
              child.geometry instanceof THREE.CapsuleGeometry &&
              child.position.z < -0.5
          );
          if (tail) {
            tail.rotation.y = Math.sin(time * 5 + pet.happiness * 0.1) * 0.5;
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && rendererRef.current?.domElement) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [pet.type, pet.happiness, isHovered, isClicked]);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  const getHappinessColor = () => {
    const happiness = pet.happiness;
    if (happiness >= 80) return "from-green-400 to-emerald-400";
    if (happiness >= 60) return "from-yellow-400 to-orange-400";
    if (happiness >= 40) return "from-orange-400 to-red-400";
    return "from-red-400 to-pink-400";
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-gray-200/70 hover:shadow-xl transition-all duration-300">
      <div className="text-center">
        <div
          ref={mountRef}
          className="mx-auto mb-4 cursor-pointer transition-transform duration-300 hover:scale-105"
          style={{ width: "200px", height: "200px" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        />

        <h3 className="font-bold text-gray-800 text-2xl mb-1">{pet.name}</h3>
        <p className="text-sm text-gray-600 mb-4">Level {pet.level}</p>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span className="font-medium">Happiness</span>
            <span className="font-bold">{pet.happiness}%</span>
          </div>

          <div className="bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner border border-gray-300/30">
            <div
              className={`h-full bg-gradient-to-r ${getHappinessColor()} transition-all duration-700 rounded-full relative`}
              style={{ width: `${pet.happiness}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
            </div>
          </div>

          <div className="text-xs text-gray-500 mt-2">
            {pet.happiness >= 80 && "🌟 Extremely Happy!"}
            {pet.happiness >= 60 && pet.happiness < 80 && "😊 Pretty Happy"}
            {pet.happiness >= 40 && pet.happiness < 60 && "😐 Okay"}
            {pet.happiness < 40 && "😢 Needs Attention"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
