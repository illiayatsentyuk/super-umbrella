window.Components = window.Components || {}

window.Components.themePairs = {
  renderItem: function (pair, index) {
    return `
      <li class="theme__pair" data-reveal style="--d: ${index * 70}ms">
        <p class="theme__pair-line">
          <span>${pair.left}</span>
          <span class="theme__times" aria-hidden="true">×</span>
          <span>${pair.right}</span>
        </p>
        <p>${pair.note}</p>
      </li>
    `
  },

  render: function (mountId) {
    var mount = document.getElementById(mountId || 'theme-pairs')
    if (!mount) return

    mount.innerHTML = window.SiteContent.pairs
      .map(window.Components.themePairs.renderItem)
      .join('')
  },
}
