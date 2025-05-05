import Fx from "./Fx";

class Mutation {
    constructor() {
        this.transitionEffects = new Fx();
    }

    // Handles the transition out
    out() {
        const context = _A;
        const currentState = context.is;
        const previousState = context.was;

        // Determine transition types
        this.isHeaderToWide = previousState.ho && currentState.wo;
        this.isWideToWide = previousState.wo && currentState.wo;
        this.isHeaderToAbout = previousState.ho && currentState.ab;

        // Deactivate current event listeners
        context.e.off();

        // Perform navigation updates
        if (currentState.ho || currentState.ab) {
            context.e.nav.active.up();
        }

        if (this.isHeaderToWide || this.isWideToWide || this.isHeaderToAbout) {
            if (this.isWideToWide) {
                context.e.wo.fxBack.hide({ mutation: true, delay: 0 }).play();
            }
            context.page.update();
        } else {
            if (previousState.wo) {
                context.e.wo.fxBack.hide({ mutation: true, delay: 0 }).play();
            }
            this.transitionEffects.fadeOut({
                callback: () => {
                    context.page.update();
                }
            });
        }
    }

    // Handles the transition in
    in() {
        const context = _A;

        if (this.isHeaderToWide || this.isWideToWide || this.isHeaderToAbout) {
            context.page.insertNew();
            context.e.init();
            this.transitionEffects.trigger();
        } else {
            context.page.removeOld();
            context.page.insertNew();
            context.e.init();
            this.transitionEffects.fadeIn();
        }
    }
}
export default Mutation;