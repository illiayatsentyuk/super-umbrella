window.Components = window.Components || {}

window.Components.worldPage = {
  renderMissing: function () {
    var site = window.Site
    return `
      <section class="section world-page world-page--missing">
        <div class="wrap world-page__missing">
          <p class="kicker">Не знайдено</p>
          <h1 class="world-page__missing-title">Цього світу в галереї немає</h1>
          <a class="btn" href="${site.href('worlds.html')}">До галереї</a>
        </div>
      </section>
    `
  },

  render: function (world, previous, next, numberLabel) {
    var site = window.Site
    var threads = world.threads
      .map(function (thread) {
        return `<li class="world-page__thread">${thread}</li>`
      })
      .join('')

    return `
      <section class="section world-page">
        <div class="wrap world-page__layout">
          <figure class="placeholder">
            <div class="placeholder__media">
              <img
                class="placeholder__image"
                src="${site.asset(world.image)}"
                alt="${world.alt}"
                width="800"
                height="600"
              >
            </div>
          </figure>
          <div class="world-page__copy">
            <p class="kicker">${numberLabel}</p>
            <h1 class="world-page__title">${world.title}</h1>
            <p class="lead world-page__lead">${world.story}</p>
            <ul class="world-page__threads">${threads}</ul>
            <p class="world-page__quiet">${world.text}</p>
            <div class="world-page__pager">
              <a class="world-page__pager-link" href="${site.worldHref(previous.id)}">← ${previous.title}</a>
              <a class="world-page__pager-link" href="${site.worldHref(next.id)}">${next.title} →</a>
            </div>
            <a class="world-page__back" href="${site.href('worlds.html')}">Усі світи</a>
          </div>
        </div>
      </section>
    `
  },
}
