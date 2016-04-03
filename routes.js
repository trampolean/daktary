router.route(':owner/:repo/blob/:branch/:path(.*)', function () {
  this.currentRoute = 'blob'
})
router.route(':owner/:repo/tree/:branch/:path(.*)?', function () {
  this.currentRoute = 'tree'
})
router.route(':owner/:repo', function () {
  this.currentRoute = 'repo'
})
