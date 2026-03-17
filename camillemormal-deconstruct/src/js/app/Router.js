export default function Router(url) {
    const app = _A;
    const page = app.config.routes[url].page;
    const next = app.route.new;
    const prev = app.route.old;

    app.route.old = next;
    app.route.new = { url, page };

    app.is[next.page] = false;
    app.is[page] = true;

    if (prev.page) app.was[prev.page] = false;
    app.was[next.page] = true;
}

