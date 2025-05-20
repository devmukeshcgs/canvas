import RGL from './RGL';
import FxS1 from './FxS1';

class Intro {
    constructor(initializer) {
        const appContext = _A;
        appContext.introducing = true;

        // Reset the loading screen
        R.T(R.G.id("load-no").children[0], 0, 0);

        // Initialize transition effects
        this.introEffects = new FxS1();

        // Initialize the scene with the provided initializer function
        initializer((callback) => {
            appContext.rgl = new RGL();
            appContext.rgl.load(() => {
                this.onLoadComplete();
            });
        });
    }

    // Callback invoked after resources are loaded
    onLoadComplete() {
        const appContext = _A;

        // Run intro sequence and initialize components
        appContext.rgl.intro();
        appContext.engine.intro();
        appContext.engine.init();
        appContext.engine.load.intro();

        // Start main application functionality
        appContext.rgl.run();
        appContext.engine.run();

        // Trigger any intro-specific effects
        this.introEffects.run();
    }
}

export default Intro; 