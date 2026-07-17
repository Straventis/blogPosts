module.exports = function () {
  // This runs at build time, not at page load, so it reflects the exact
  // moment GitHub Actions last built and deployed the site, the real
  // answer to "did my change actually go live."
  return new Date().toISOString();
};
