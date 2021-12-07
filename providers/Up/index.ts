import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * A list of supported unpoly headers
 */
const UNPOLY_HEADERS = [
  'X-Up-Accept-Layer',
  'X-Up-Clear-Cache',
  'X-Up-Context',
  'X-Up-Dismiss-Layer',
  'X-Up-Events',
  'X-Up-Fail-Context',
  'X-Up-Fail-Mode',
  'X-Up-Fail-Target',
  'X-Up-Location',
  'X-Up-Method',
  'X-Up-Mode',
  'X-Up-Reload-From-Time',
  'X-Up-Target',
  'X-Full-Reload',
]

export default class Up {
  /**
   * The headers to set on the response or flash messages in case of redirect
   */
  private headers: Record<string, string> = {}

  /**
   * Converts the unpoly header name to flash messages key
   */
  private headerToFlashKey(header: string) {
    return header.replace('X-', '').toLowerCase()
  }

  /**
   * Returns the value of an unpoly header. Giving priority to the
   * flash messages
   */
  private getProperty(header: string): string {
    return this.ctx.session.flashMessages.get(
      this.headerToFlashKey(header),
      this.ctx.request.header(header)
    )
  }

  /**
   * Set the unpoly response header
   */
  private setProperty(header: string, value: string): void {
    this.headers[header] = value
  }

  /**
   * Set unpoly headers as flash messages
   */
  private setHeadersAsFlashMessages(headers: Record<string, string>) {
    Object.keys(headers).forEach((header) => {
      this.ctx.session.flash(this.headerToFlashKey(header), headers[header])
    })
  }

  /**
   * Set unpoly headers as response headers
   */
  private setHeadersAsResponse(headers: Record<string, string>) {
    Object.keys(headers).forEach((header) => {
      this.ctx.response.header(header, headers[header])
    })
  }

  constructor(private ctx: HttpContextContract) {}

  /**
   * Commit response
   */
  public commit() {
    const headers = Object.assign(
      UNPOLY_HEADERS.reduce((result, header) => {
        const value = this.ctx.session.flashMessages.get(this.headerToFlashKey(header))
        if (value) {
          result[header] = value
        }
        return result
      }, {}),
      this.headers
    )

    if (this.ctx.response.getHeader('Location')) {
      this.setHeadersAsFlashMessages(headers)
    } else {
      this.setHeadersAsResponse(headers)
    }
  }

  public getLayer() {
    return this.getProperty('X-Up-Accept-Layer')
  }

  public getCache() {
    return this.getProperty('X-Up-Clear-Cache')
  }

  public getContext() {
    return this.getProperty('X-Up-Context')
  }

  public getDismissLayer() {
    return this.getProperty('X-Up-Dismiss-Layer')
  }

  public getEvents() {
    return this.getProperty('X-Up-Events')
  }

  public getFailContext() {
    return this.getProperty('X-Up-Fail-Context')
  }

  public getFailMode() {
    return this.getProperty('X-Up-Fail-Mode')
  }

  public getFailTarget() {
    return this.getProperty('X-Up-Fail-Target')
  }

  public getLocation() {
    return this.getProperty('X-Up-Location')
  }

  public getMethod() {
    return this.getProperty('X-Up-Method')
  }

  public getMode() {
    return this.getProperty('X-Up-Mode')
  }

  public getReloadFromTime() {
    return this.getProperty('X-Up-Reload-From-Time')
  }

  public getTarget() {
    return this.getProperty('X-Up-Target') || 'body'
  }

  public targetIncludes(selector: string): boolean {
    const target = this.getTarget()
      .split(',')
      .map((value) => value.trim())
    return target.includes('body') ? true : target.includes(selector)
  }

  public getTitle() {
    return this.getProperty('X-Up-Title')
  }

  public getValidate() {
    return this.getProperty('X-Up-Validate')
  }

  public getVersion() {
    return this.getProperty('X-Up-Version')
  }

  public setLayer(value: string) {
    return this.setProperty('X-Up-Accept-Layer', value)
  }

  public setCache(value: string) {
    return this.setProperty('X-Up-Clear-Cache', value)
  }

  public setContext(value: string) {
    return this.setProperty('X-Up-Context', value)
  }

  public setDismissLayer(value: string) {
    return this.setProperty('X-Up-Dismiss-Layer', value)
  }

  public setEvents(value: string) {
    return this.setProperty('X-Up-Events', value)
  }

  public setFailContext(value: string) {
    return this.setProperty('X-Up-Fail-Context', value)
  }

  public setFailMode(value: string) {
    return this.setProperty('X-Up-Fail-Mode', value)
  }

  public setFailTarget(value: string) {
    return this.setProperty('X-Up-Fail-Target', value)
  }

  public setLocation(value: string) {
    return this.setProperty('X-Up-Location', value)
  }

  public setMethod(value: string) {
    return this.setProperty('X-Up-Method', value)
  }

  public setMode(value: string) {
    return this.setProperty('X-Up-Mode', value)
  }

  public setReloadFromTime(value: string) {
    return this.setProperty('X-Up-Reload-From-Time', value)
  }

  public setTarget(value: string) {
    return this.setProperty('X-Up-Target', value)
  }

  public setTitle(value: string) {
    return this.setProperty('X-Up-Title', value)
  }

  public setValidate(value: string) {
    return this.setProperty('X-Up-Validate', value)
  }

  public setVersion(value: string) {
    return this.setProperty('X-Up-Version', value)
  }

  public fullReload() {
    return this.setProperty('X-Full-Reload', 'true')
  }
}
