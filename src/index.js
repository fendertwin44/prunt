// Routes subdomains to their own folder in public/.
// dog.prunt.net/... -> public/dog/... (falls back to shared files like /style.css)
const SUBSITES = { dog: "/dog" };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const sub = url.hostname.split(".")[0];
    const prefix = SUBSITES[sub];
    if (prefix && url.hostname.split(".").length > 2) {
      const scoped = new URL(url);
      scoped.pathname = prefix + url.pathname;
      const res = await env.ASSETS.fetch(new Request(scoped, request));
      if (res.status !== 404) return res;
    }
    return env.ASSETS.fetch(request);
  },
};
