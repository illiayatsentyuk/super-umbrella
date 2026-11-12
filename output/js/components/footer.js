window.Components = window.Components || {}

window.Components.footer = {
  render: function () {
    var mount = document.getElementById('site-footer')
    if (!mount) return

    var content = window.SiteContent
    var site = window.Site
    var links = content.nav
      .map(function (item) {
        return `
          <a class="site-footer__link" href="${site.href(item.href)}">${item.label}</a>
        `
      })
      .join('')

    mount.outerHTML = `
      <footer class="site-footer" id="site-footer">
        <div class="wrap site-footer__grid">
          <div>
            <p class="site-footer__title">${content.brand}</p>
            <p class="site-footer__year">${content.tagline}, ${content.year || '2026'}</p>
          </div>
          <nav class="site-footer__nav" aria-label="Розділи сторінки">
            ${links}
          </nav>
        </div>
      </footer>
    `
  },
}
