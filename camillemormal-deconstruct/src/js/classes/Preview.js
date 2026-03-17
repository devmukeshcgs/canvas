class Preview {
  init() {
    this.url = _A.route.new.url;
    this.leftWrapper = R.G.id("a-l-w");
    this.leftContent = R.G.id("a-l");
    this.previewElement = R.G.id("a-lp");
    this.resize();
  }

  resize() {
    const state = _A;
    const windowHeight = state.win.h;

    // Reset positions before calculating new dimensions
    R.T(this.leftWrapper, 0, 0, "px");
    R.T(this.previewElement, 0, 0, "px");

    const leftContentHeight = this.leftContent.offsetHeight;
    const leftContentTop = this.leftContent.getBoundingClientRect().top;

    // Calculate visible area of left content
    this.leftVisibleArea =
      windowHeight < leftContentTop + leftContentHeight
        ? windowHeight - leftContentTop // If content extends beyond viewport
        : leftContentHeight; // If all content fits in viewport

    // Calculate maximum scroll values
    this.maxScrollContent = leftContentHeight - this.leftVisibleArea;
    this.maxScrollPreview =
      this.leftVisibleArea - this.previewElement.offsetHeight;
  }

  loop() {
    const state = _A;
    const currentScroll = state.e.s._[this.url].curr;
    const maxScroll = state.e.s.max;

    // Calculate scroll positions
    const contentScrollPos = R.Remap(
      0,
      maxScroll,
      0,
      this.maxScrollContent,
      currentScroll
    );
    const previewScrollPos = R.Remap(
      0,
      maxScroll,
      0,
      this.maxScrollPreview,
      currentScroll
    );

    // Apply transformations
    R.T(this.leftWrapper, 0, -R.R(contentScrollPos), "px");
    R.T(this.previewElement, 0, R.R(previewScrollPos), "px");
  }
}
export default Preview;
