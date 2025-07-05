export function Router(t) {
    var e = _A
      , i = e.config.routes[t].page
      , s = e.route.new
      , r = e.route.old;
    e.route.old = s,
    e.route.new = {
        url: t,
        page: i
    },
    e.is[s.page] = !1,
    e.is[i] = !0,
    r.page && (e.was[r.page] = !1),
    e.was[s.page] = !0
}