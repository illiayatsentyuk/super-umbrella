document.documentElement.classList.add('js')

var page = document.body.dataset.page || 'home'
var base = document.body.dataset.base || './'

function asset(path) {
  return base + path.replace(/^\.\//, '')
}

function href(path) {
  return asset(path)
}

function bindHeader() {
  var header = document.getElementById('site-header')
  if (!header) return

  var btn = header.querySelector('.site-header__menu-btn')
  var nav = header.querySelector('.site-header__nav')
  var desktopQuery = window.matchMedia('(min-width: 861px)')
  var scrim = null

  function closeMenu() {
    header.classList.remove('site-header--open')
    if (nav) nav.classList.remove('site-header__nav--open')
    if (btn) {
      btn.setAttribute('aria-expanded', 'false')
      btn.textContent = 'Меню'
    }
    if (scrim) {
      scrim.remove()
      scrim = null
    }
    document.body.style.overflow = ''
  }

  function openMenu() {
    header.classList.add('site-header--open')
    if (nav) nav.classList.add('site-header__nav--open')
    if (btn) {
      btn.setAttribute('aria-expanded', 'true')
      btn.textContent = 'Закрити'
    }
    if (!scrim) {
      scrim = document.createElement('button')
      scrim.type = 'button'
      scrim.className = 'site-header__scrim'
      scrim.setAttribute('aria-label', 'Закрити меню')
      scrim.addEventListener('click', closeMenu)
      header.appendChild(scrim)
    }
    if (!desktopQuery.matches) document.body.style.overflow = 'hidden'
  }

  function onScroll() {
    header.classList.toggle('site-header--compact', window.scrollY > 12)
  }

  if (btn) {
    btn.addEventListener('click', function () {
      if (header.classList.contains('site-header--open')) closeMenu()
      else openMenu()
    })
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenu()
  })
  desktopQuery.addEventListener('change', function () {
    if (desktopQuery.matches) closeMenu()
  })
  onScroll()
}

function bindReveal() {
  var nodes = document.querySelectorAll('[data-reveal]')
  if (!('IntersectionObserver' in window)) {
    nodes.forEach(function (node) {
      node.classList.add('is-visible')
    })
    return
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    },
    { rootMargin: '0px 0px 20% 0px', threshold: 0 },
  )

  nodes.forEach(function (node) {
    var box = node.getBoundingClientRect()
    if (box.top < window.innerHeight * 0.96 && box.bottom > 0) {
      node.classList.add('is-visible')
      return
    }
    observer.observe(node)
  })
}

function bindSkip() {
  var skip = document.querySelector('.skip')
  if (!skip) return
  skip.addEventListener('click', function (event) {
    event.preventDefault()
    var main = document.getElementById('content')
    if (main) main.focus()
  })
}

window.Site = {
  asset: asset,
  href: href,
  base: base,
  page: page,
  bindReveal: bindReveal,
  worldHref: function (id) {
    return href(`svity/${id}.html`)
  },
  start: function () {
    bindHeader()
    bindSkip()
    setTimeout(bindReveal, 0)
  },
}
