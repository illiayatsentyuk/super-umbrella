window.Components = window.Components || {}

window.Components.principles = {
  renderItem: function (item, index) {
    return `
      <li class="principles__item" data-reveal style="--d: ${index * 80}ms">
        <span class="principles__index">${item.index}</span>
        <h3 class="principles__title">${item.title}</h3>
        <p class="principles__text">${item.text}</p>
      </li>
    `
  },

  render: function (mountId) {
    var mount = document.getElementById(mountId || 'principles-list')
    if (!mount) return

    mount.innerHTML = window.SiteContent.principles
      .map(window.Components.principles.renderItem)
      .join('')
  },
}
