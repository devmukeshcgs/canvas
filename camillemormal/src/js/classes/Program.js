let ID = 1;

class Program {
  constructor(config) {
    const appState = _A.rgl;

    this.gl = appState.gl; // WebGL context
    this.renderer = appState.renderer; // Renderer reference
    this.uniforms = config.uniform || {}; // Uniform variables
    this.id = ID++; // Unique program ID

    // Create and initialize the WebGL program
    this.program = this.createProgram();
    this.initializeUniforms();

    // Set up the global projection matrix handler
    appState.uProjectionMatrix = (matrix) => {
      this.uniforms.projectionMatrix.value = matrix;
    };
  }

  /**
   * Creates and compiles the WebGL program.
   * @returns {WebGLProgram} Compiled WebGL program
   */
  createProgram() {
    const vertexShaderSource = `
            precision highp float;
            attribute vec2 position;
            attribute vec2 texCoord;
            varying vec2 vTexCoord;
            uniform vec2 resolution;
            uniform vec2 offset;
            uniform mat4 projectionMatrix;
            uniform mat4 modelMatrix;
            void main() {
                gl_Position = projectionMatrix * modelMatrix * vec4(position, 0, 1);
                vTexCoord = (texCoord - 0.5) / resolution + 0.5 + offset;
            }
        `;

    const fragmentShaderSource = `
            precision highp float;
            varying vec2 vTexCoord;
            uniform sampler2D texture;
            void main() {
                gl_FragColor = texture2D(texture, vTexCoord);
            }
        `;

    const vertexShader = this.createShader(
      vertexShaderSource,
      this.gl.VERTEX_SHADER
    );
    const fragmentShader = this.createShader(
      fragmentShaderSource,
      this.gl.FRAGMENT_SHADER
    );

    const program = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);

    // Clean up shaders after linking
    this.gl.deleteShader(vertexShader);
    this.gl.deleteShader(fragmentShader);

    return program;
  }

  /**
   * Compiles a WebGL shader from source code.
   * @param {string} source - Shader source code
   * @param {number} type - Shader type (VERTEX_SHADER or FRAGMENT_SHADER)
   * @returns {WebGLShader} Compiled shader
   */
  createShader(source, type) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    return shader;
  }

  /**
   * Initializes uniforms and their locations in the WebGL program.
   */
  initializeUniforms() {
    this.uniforms.projectionMatrix = { type: "Matrix4fv" };
    this.uniforms.modelMatrix = { type: "Matrix4fv" };

    this.updateUniformLocations();
  }

  /**
   * Updates uniform locations in the WebGL program.
   */
  updateUniformLocations() {
    for (const name in this.uniforms) {
      if (Object.prototype.hasOwnProperty.call(this.uniforms, name)) {
        const uniform = this.uniforms[name];
        uniform.location = this.gl.getUniformLocation(this.program, name);
      }
    }
  }

  /**
   * Sets all uniforms for the current WebGL program.
   */
  setUniforms() {
    for (const name in this.uniforms) {
      if (Object.prototype.hasOwnProperty.call(this.uniforms, name)) {
        const uniform = this.uniforms[name];
        const method = `uniform${uniform.type}`;

        if (uniform.type.startsWith("Matrix")) {
          this.gl[method](uniform.location, false, uniform.value);
        } else {
          this.gl[method](uniform.location, uniform.value);
        }
      }
    }
  }

  /**
   * Activates the program in the WebGL context.
   */
  use() {
    if (this.renderer.programCurrId !== this.id) {
      this.gl.useProgram(this.program);
      this.renderer.programCurrId = this.id;
    }
  }
}

export default Program;
