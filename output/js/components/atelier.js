window.Components = window.Components || {}

window.Components.atelier = {
  renderThread: function (item, selectedId) {
    return `
      <button
        type="button"
        class="atelier__thread"
        data-id="${item.id}"
        aria-pressed="${selectedId === item.id}"
      >
        <i
          class="atelier__thread-swatch"
          style="background: ${item.wash}; box-shadow: inset 0 0 0 3px ${item.accent}"
        ></i>
        ${item.label}
      </button>
    `
  },

  renderResult: function (result) {
    return `
      <div class="atelier__poster-field" aria-hidden="true"></div>
      <div class="atelier__poster-copy">
        <p class="kicker">Результат</p>
        <h2 class="atelier__poster-title">${result.title}</h2>
        <p>${result.text}</p>
      </div>
    `
  },
}
