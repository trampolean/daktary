window.addEventListener('hashchange', () => {
  const ghUrl = window.location.toString().split('#')[1]
  router.go(ghUrl)
})

window.addEventListener('load', () => {
  const ghUrl = window.location.toString().split('#')[1]
  router.go(ghUrl)
  if (router.isNoRoute()) {
    window.location = './404.html'
    window.location.reload(true)
  }
})
const template = new Template()
const layout = new Layout()
