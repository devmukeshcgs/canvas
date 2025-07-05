import RGL from './RGL';
import FxS1 from './FxS1';

class Intro {
    constructor(initializer) {
        console.log("initializer", initializer);

        const appState = _A;
        appState.introducing = true;

        // Reset the loading screen
        R.T(R.G.id("load-no").children[0], 0, 0);

        // Initialize transition effects
        this.introEffects = new FxS1();

        // Initialize the scene with the provided initializer function
        initializer((callback) => {
            appState.rgl = new RGL();
            appState.rgl.load(() => {
                this.onLoadComplete();
            });
        });
    }

    // Callback invoked after resources are loaded
    onLoadComplete() {
        const appState = _A;

        // Run intro sequence and initialize components
        appState.rgl.intro();
        appState.engine.intro();
        appState.engine.init();
        appState.engine.load.intro();

        // Start main application functionality
        appState.rgl.run();
        appState.engine.run();

        // Trigger any intro-specific effects
        this.introEffects.run();
    }
}

export default Intro; 