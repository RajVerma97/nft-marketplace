import * as THREE from 'three';
import {
  forwardRef,
  useRef,
  useMemo,
  useLayoutEffect,
  useImperativeHandle,
  ReactNode,
} from 'react';
import { invalidate } from '@react-three/fiber';

// Type for props
interface ReflectProps {
  children: ReactNode; // Accepts React children
  start?: [number, number, number]; // Start position
  end?: [number, number, number]; // End position
  bounce?: number; // Bounce count
  far?: number; // Ray length
}

// Type for the API object
interface ReflectApi {
  number: number;
  objects: THREE.Mesh[];
  hits: Map<
    string,
    { key: string; intersect: THREE.Intersection; stopped: boolean }
  >;
  start: THREE.Vector3;
  end: THREE.Vector3;
  raycaster: THREE.Raycaster;
  positions: Float32Array;
  setRay: (
    _start?: [number, number, number],
    _end?: [number, number, number]
  ) => void;
  update: () => number;
}

function isRayMesh(object: any): object is THREE.Mesh {
  return (
    object.isMesh && (object.onRayOver || object.onRayOut || object.onRayMove)
  );
}

function createEvent(
  api: ReflectApi,
  hit: any,
  intersect: THREE.Intersection,
  intersects: THREE.Intersection[]
) {
  return {
    api,
    object: intersect.object,
    position: intersect.point,
    direction: intersect.direction,
    reflect: intersect.reflect,
    normal: intersect.face?.normal,
    intersect,
    intersects,
    stopPropagation: () => (hit.stopped = true),
  };
}

export const Reflect = forwardRef<ReflectApi, ReflectProps>(
  (
    {
      children,
      start: _start = [0, 0, 0],
      end: _end = [0, 0, 0],
      bounce = 10,
      far = 100,
      ...props
    },
    fRef
  ) => {
    const scene = useRef<THREE.Group>(null);
    const vStart = new THREE.Vector3();
    const vEnd = new THREE.Vector3();
    const vDir = new THREE.Vector3();
    const vPos = new THREE.Vector3();

    let intersect: THREE.Intersection | null = null;
    let intersects: THREE.Intersection[] = [];

    const api: ReflectApi = useMemo(
      () => ({
        number: 0,
        objects: [],
        hits: new Map(),
        start: new THREE.Vector3(),
        end: new THREE.Vector3(),
        raycaster: new THREE.Raycaster(),
        positions: new Float32Array(
          Array.from({ length: (bounce + 10) * 3 }, () => 0)
        ),
        setRay: (
          _start: [number, number, number] = [0, 0, 0],
          _end: [number, number, number] = [0, 0, 0]
        ) => {
          api.start.set(..._start);
          api.end.set(..._end);
        },
        update: () => {
          api.number = 0;
          intersects = [];

          vStart.copy(api.start);
          vEnd.copy(api.end);
          vDir.subVectors(vEnd, vStart).normalize();
          vStart.toArray(api.positions, api.number++ * 3);

          while (true) {
            api.raycaster.set(vStart, vDir);
            intersect = api.raycaster.intersectObjects(api.objects, false)[0];

            console.log('Intersect:', intersect); // Debugging line

            if (api.number < bounce && intersect && intersect.face) {
              intersects.push(intersect);
              intersect.direction = vDir.clone();
              intersect.point.toArray(api.positions, api.number++ * 3);
              vDir.reflect(
                intersect.object
                  .localToWorld(intersect.face.normal)
                  .sub(intersect.object.getWorldPosition(vPos))
                  .normalize()
              );
              intersect.reflect = vDir.clone();
              vStart.copy(intersect.point);
            } else {
              vEnd
                .addVectors(vStart, vDir.multiplyScalar(far))
                .toArray(api.positions, api.number++ * 3);
              break;
            }
          }

          api.number = 1;

          api.hits.forEach((hit) => {
            if (
              !intersects.find((intersect) => intersect.object.uuid === hit.key)
            ) {
              api.hits.delete(hit.key);
              if (hit.intersect.object.onRayOut) {
                invalidate();
                hit.intersect.object.onRayOut(
                  createEvent(api, hit, hit.intersect, intersects)
                );
              }
            }
          });

          for (intersect of intersects) {
            api.number++;
            if (!api.hits.has(intersect.object.uuid)) {
              const hit = {
                key: intersect.object.uuid,
                intersect,
                stopped: false,
              };
              api.hits.set(intersect.object.uuid, hit);
              if (intersect.object.onRayOver) {
                invalidate();
                intersect.object.onRayOver(
                  createEvent(api, hit, intersect, intersects)
                );
              }
            }

            const hit = api.hits.get(intersect.object.uuid);
            if (intersect.object.onRayMove) {
              invalidate();
              intersect.object.onRayMove(
                createEvent(api, hit, intersect, intersects)
              );
            }

            if (hit.stopped) break;
            if (intersect === intersects[intersects.length - 1]) api.number++;
          }
          return Math.max(2, api.number);
        },
      }),
      [bounce, far]
    );

    useLayoutEffect(() => void api.setRay(_start, _end), [..._start, ..._end]);
    useImperativeHandle(fRef, () => api, [api]);

    useLayoutEffect(() => {
      api.objects = [];
      scene.current.traverse((object) => {
        if (isRayMesh(object)) api.objects.push(object);
      });
      scene.current.updateWorldMatrix(true, true);
    });

    return (
      <group ref={scene} {...props}>
        {children}
      </group>
    );
  }
);
