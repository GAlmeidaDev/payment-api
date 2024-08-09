import type { HttpContext } from '@adonisjs/core/http'
import { EfiPayAuthService } from '../services/auth_service.ts'

export default class EfiPayAuthController {
  private authService = new EfiPayAuthService()

  async getAuthTokenPix({ response }: HttpContext) {
    try {
      const token = await this.authService.authenticatePix()
      return response.json({ token })
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Failed to authenticate with EfiPay', error: error.message })
    }
  }

  async getAuthTokenEfi({ response }: HttpContext) {
    try {
      const token = await this.authService.authenticateEfi()
      return response.json({ token })
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Failed to authenticate with EfiPay', error: error.message })
    }
  }
}
