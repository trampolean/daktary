// Create a router
const router = new Router()

router.route(':owner/:repo/blob/:branch/:path(.*)', function () {
  this.currentRoute = 'blob'
  this.injectLayout = injectLayoutViewer
})
router.route(':owner/:repo/tree/:branch/:path(.*)?', function () {
  this.currentRoute = 'tree'
  this.injectLayout = injectLayoutRepos
})
router.route(':owner/:repo', function () {
  this.currentRoute = 'repo'
})
