import powerCube from './powerCube'
import powerCubeX from './powerCubeX'
import powerCubeXtra from './powerCubeXtra'
import powerCubeTitan from './powerCubeTitan'
import powerCubeTitanX from './powerCubeTitanX'

// 3D models by key. A product opts in with `model3d: '<key>'` in its data.
//
// Each model describes the body (W × H × D in em, with optional bevelled
// corners c and extra height below it, floor), what is drawn on each face,
// any extra parts (wheels, castors, frames) and its labelled features.
export const models = {
  powercube: powerCube,
  'powercube-x': powerCubeX,
  'powercube-xtra': powerCubeXtra,
  'powercube-titan': powerCubeTitan,
  'powercube-titanx': powerCubeTitanX,
};

export function getModel(key) {
  return models[key] || powerCube;
}
