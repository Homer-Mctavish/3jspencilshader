import * as THREE from 'three'
import fragmentShader from './fragment.glsl?raw'
import vertexShader from './vertex.glsl?raw'

export class PencilLinesMaterial extends THREE.ShaderMaterial {
	constructor() {
		super({
			uniforms: {
				tDiffuse: { value: null },
				uNormals: { value: null },
				uTexture: { value: null },
				uResolution: {
					value: new THREE.Vector2(1, 1)
				}
			},
			fragmentShader: fragmentShader,
			vertexShader: vertexShader
		})
	}
}
