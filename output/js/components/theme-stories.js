window.Components = window.Components || {}

window.Components.themeStories = {
  renderItem: function (world, index) {
    var site = window.Site
    return `
      <a class="theme__story" href="${site.worldHref(world.id)}" data-reveal style="--d: ${index * 80}ms">
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
        <div class="theme__story-copy">
          <h3 class="theme__story-title">${world.title}</h3>
          <p>${world.story}</p>
          <span class="theme__open">Відкрити</span>
        </div>
      </a>
    `
  },

  render: function (mountId) {
    var mount = document.getElementById(mountId || 'theme-stories')
    if (!mount) return

    mount.innerHTML = window.SiteContent.worlds
      .slice(0, 4)
      .map(window.Components.themeStories.renderItem)
      .join('')
  },
}
