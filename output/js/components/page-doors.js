window.Components = window.Components || {}

window.Components.pageDoors = {
  renderItem: function (door, index) {
    var site = window.Site
    return `
      <li class="page-doors__item" data-reveal style="--d: ${index * 80}ms">
        <a class="page-doors__link page-doors__link--${door.tone}" href="${site.href(door.href)}">
          <span class="page-doors__index">${door.index}</span>
          <strong class="page-doors__title">${door.title}</strong>
          <p class="page-doors__text">${door.text}</p>
        </a>
      </li>
    `
  },

  render: function (mountId) {
    var mount = document.getElementById(mountId || 'page-doors-list')
    if (!mount) return

    mount.innerHTML = window.SiteContent.doors
      .map(window.Components.pageDoors.renderItem)
      .join('')
  },
}
