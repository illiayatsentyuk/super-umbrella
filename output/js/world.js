var content = window.SiteContent
var worlds = content.worlds
var worldId = document.body.dataset.worldId
var mount = document.getElementById('world-mount')
var index = worlds.findIndex(function (item) {
  return item.id === worldId
})

if (!mount) {
  // no mount on this page
} else if (index < 0) {
  document.title = 'Світ, Мікс світів'
  mount.innerHTML = window.Components.worldPage.renderMissing()
} else {
  var world = worlds[index]
  var previous = worlds[(index - 1 + worlds.length) % worlds.length]
  var next = worlds[(index + 1) % worlds.length]
  var numberLabel = `${String(index + 1).padStart(2, '0')} / ${String(worlds.length).padStart(2, '0')}`

  document.title = `${world.title}, Мікс світів`
  mount.innerHTML = window.Components.worldPage.render(world, previous, next, numberLabel)
}
