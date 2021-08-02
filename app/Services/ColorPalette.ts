/**
 * A simple class to abstract generating random colors from
 * a pre-selected color palette.
 */
class ColorPalette {
  public colors: string[] = [
    '#DFCFE7',
    '#BBE4E2',
    '#BDE6CA',
    '#FCC6C5',
    '#FCF2BC',
    '#FECBE4',
    '#E7E5E0',
  ]

  public getRandom() {
    return this.colors[Math.floor(Math.random() * this.colors.length)]
  }
}

export default new ColorPalette()
