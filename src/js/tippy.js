const tip = tippy('[title]')

tippy.browser.onUserInputChange = type => {
  const method = type === 'touch' ? 'disable' : 'enable'
  for (const tooltip of tip.tooltips) {
    tooltip[method]()
  }
}

window.addEventListener('scroll', () => {
  for (const popper of document.querySelectorAll('.tippy-popper')) {
    const instance = popper._tippy

    if (instance.state.visible) {
      instance.popperInstance.disableEventListeners()
      instance.hide()
    }
  }
});

const template = document.querySelector('#template')
const initialText = template.textContent

const imageTip = tippy('.image-pop', {
  // animation: 'shift-toward',
  // arrow: true,
  html: '#template',
  placement: 'top',
  onShow() {
    // `this` inside callbacks refers to the popper element
    const content = this.querySelector('.tippy-content')

    if (imageTip.loading || content.innerHTML !== initialText) return

    imageTip.loading = true

    fetch('/dist/img/colorrun.jpg').then(resp => resp.blob()).then(blob => {
      const url = URL.createObjectURL(blob)
      content.innerHTML = `<img width="550" src="${url}">`
      imageTip.loading = false
    }).catch(e => {
      content.innerHTML = 'Loading failed'
      imageTip.loading = false
    })
  },
  onHidden() {
    const content = this.querySelector('.tippy-content')
    content.innerHTML = initialText
  },
  // prevent tooltip from displaying over button
  popperOptions: {
    modifiers: {
      preventOverflow: {
        enabled: false
      },
      hide: {
        enabled: false
      }
    }
  }
})
