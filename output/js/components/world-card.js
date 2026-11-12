window.Components = window.Components || {}

window.Components.worldCard = {
  renderItem: function (world, index) {
    var site = window.Site
    return `
      <li class="worlds-grid__item" data-reveal style="--d: ${index * 50}ms">
        <a class="world-card" href="${site.worldHref(world.id)}">
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
          <div class="world-card__body">
            <h3 class="world-card__title">${world.title}</h3>
            <p class="world-card__text">${world.text}</p>
          </div>
        </a>
      </li>
    `
  },

  renderList: function (mountId) {
    var mount = document.getElementById(mountId || 'worlds-list')
    if (!mount) return

    mount.innerHTML = window.SiteContent.worlds
      .map(window.Components.worldCard.renderItem)
      .join('')
  },
}
