var content = window.SiteContent
var atelier = window.Components.atelier
var epochId = ''
var forceId = ''
var woven = false

var epochSlot = document.getElementById('epoch-slot')
var forceSlot = document.getElementById('force-slot')
var epochValue = document.getElementById('epoch-value')
var forceValue = document.getElementById('force-value')
var epochTray = document.getElementById('epoch-tray')
var forceTray = document.getElementById('force-tray')
var weaveBtn = document.getElementById('weave-btn')
var resetBtn = document.getElementById('reset-btn')
var resultMount = document.getElementById('atelier-result')

function findPiece(list, id) {
  return list.find(function (item) {
    return item.id === id
  })
}

function renderTray(mount, items, selectedId, onPick) {
  if (!mount) return

  mount.innerHTML = items
    .map(function (item) {
      return atelier.renderThread(item, selectedId)
    })
    .join('')

  mount.querySelectorAll('.atelier__thread').forEach(function (btn) {
    btn.addEventListener('click', function () {
      onPick(btn.getAttribute('data-id'))
    })
  })
}

function updateSlots() {
  if (!epochSlot || !forceSlot || !weaveBtn || !resetBtn || !resultMount) return

  var epoch = findPiece(content.epochs, epochId)
  var force = findPiece(content.forces, forceId)

  epochValue.textContent = epoch ? epoch.label : 'Порожньо'
  forceValue.textContent = force ? force.label : 'Порожньо'
  epochSlot.classList.toggle('atelier__slot--filled', Boolean(epoch))
  forceSlot.classList.toggle('atelier__slot--filled', Boolean(force))

  var epochSwatch = epochSlot.querySelector('.atelier__slot-swatch')
  var forceSwatch = forceSlot.querySelector('.atelier__slot-swatch')
  if (epochSwatch) epochSwatch.remove()
  if (forceSwatch) forceSwatch.remove()

  if (epoch) {
    var e = document.createElement('i')
    e.className = 'atelier__slot-swatch'
    e.style.background = epoch.wash
    epochSlot.appendChild(e)
  }
  if (force) {
    var f = document.createElement('i')
    f.className = 'atelier__slot-swatch'
    f.style.background = force.accent
    forceSlot.appendChild(f)
  }

  weaveBtn.disabled = !(epoch && force) || woven
  weaveBtn.textContent = woven ? 'Готово' : 'Зіткати'
  resetBtn.hidden = !(epoch || force)

  if (woven && epoch && force) {
    var result = content.blend(epoch, force)
    resultMount.hidden = false
    resultMount.style.setProperty('--a', epoch.wash)
    resultMount.style.setProperty('--b', force.wash)
    resultMount.style.setProperty('--accent', force.accent)
    resultMount.innerHTML = atelier.renderResult(result)
  } else {
    resultMount.hidden = true
    resultMount.innerHTML = ''
  }
}

function chooseEpoch(id) {
  epochId = epochId === id ? '' : id
  woven = false
  renderTray(epochTray, content.epochs, epochId, chooseEpoch)
  updateSlots()
}

function chooseForce(id) {
  forceId = forceId === id ? '' : id
  woven = false
  renderTray(forceTray, content.forces, forceId, chooseForce)
  updateSlots()
}

if (epochTray && forceTray) {
  epochSlot.addEventListener('click', function () {
    epochId = ''
    woven = false
    renderTray(epochTray, content.epochs, epochId, chooseEpoch)
    updateSlots()
  })

  forceSlot.addEventListener('click', function () {
    forceId = ''
    woven = false
    renderTray(forceTray, content.forces, forceId, chooseForce)
    updateSlots()
  })

  weaveBtn.addEventListener('click', function () {
    if (!epochId || !forceId || woven) return
    woven = true
    updateSlots()
  })

  resetBtn.addEventListener('click', function () {
    epochId = ''
    forceId = ''
    woven = false
    renderTray(epochTray, content.epochs, epochId, chooseEpoch)
    renderTray(forceTray, content.forces, forceId, chooseForce)
    updateSlots()
  })

  renderTray(epochTray, content.epochs, epochId, chooseEpoch)
  renderTray(forceTray, content.forces, forceId, chooseForce)
  updateSlots()
}
