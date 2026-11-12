window.Components = window.Components || {}

window.Components.header = {
  render: function () {
    var mount = document.getElementById('site-header')
    if (!mount) return

    var content = window.SiteContent
    var site = window.Site
    var page = site.page
    var dark = content.darkPages.indexOf(page) !== -1
    var links = content.nav
      .map(function (item) {
        var current = item.id === page || (item.id === 'worlds' && page === 'world')
        return `
          <a class="site-header__link" href="${site.href(item.href)}"${current ? ' aria-current="page"' : ''}>
            ${item.label}
          </a>
        `
      })
      .join('')

    mount.outerHTML = `
      <header class="site-header${dark ? ' site-header--dark' : ''}" id="site-header">
        <div class="wrap site-header__bar">
          <a class="site-header__brand" href="${site.href('index.html')}">
            <span class="site-header__mark" aria-hidden="true"></span>
            <span class="site-header__brand-copy">
              <span class="site-header__brand-title">${content.brand}</span>
            </span>
          </a>
          <button type="button" class="site-header__menu-btn" aria-expanded="false" aria-controls="site-nav">
            Меню
          </button>
          <nav id="site-nav" class="site-header__nav">
            ${links}
          </nav>
        </div>
      </header>
    `
  },
}
