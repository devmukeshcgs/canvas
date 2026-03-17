export default function Router(url) {
    const app = _A;
    const page = app.config.routes[url].page;
    const next = app.route.new;
    const prev = app.route.old;

    app.route.old = next;
    app.route.new = { url, page };

    // Ensure scroll state exists for the new route immediately.
    // Some page modules read `_A.e.s._[url].curr` during transitions.
    if (app.e?.s?.ensureUrl) app.e.s.ensureUrl(url);

    app.is[next.page] = false;
    app.is[page] = true;

    if (prev.page) app.was[prev.page] = false;
    app.was[next.page] = true;
}

