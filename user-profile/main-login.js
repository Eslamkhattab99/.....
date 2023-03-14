const slider = document.querySelector('.slider')

slider.style.cursor = '-webkit-grab'
slider.addEventListener('mousedown', () => slider.style.cursor = '-webkit-grabbing', true)
window.addEventListener('mouseup', () => slider.style.cursor = '-webkit-grab', true)

const sliderImpetus = new Impetus({
  source: slider,
  boundX: [0, slider.scrollWidth - slider.clientWidth],
  multiplier: - 1,
  update (x) {
    this.scrollLeft = x
  }
})