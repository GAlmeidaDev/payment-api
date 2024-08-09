import type { HttpContext } from '@adonisjs/core/http'
import { getQrCode, createCob, createImmediateCharge } from '../services/pix_service.ts'

export default class PixController {
  async getQrCode({ params, response }: HttpContext) {
    const { id } = params
    try {
      const qrCodeData = await getQrCode(id)
      return response.json(qrCodeData)
    } catch (error) {
      return response.status(500).json({ message: 'Error getting QR code', error: error.message })
    }
  }

  async createCob({ request, response }: HttpContext) {
    const tipoCob = request.input('tipoCob')
    try {
      const cobData = await createCob(tipoCob)
      return response.json(cobData)
    } catch (error) {
      return response.status(500).json({ message: 'Error creating cob', error: error.message })
    }
  }
  async create({ request, response }: HttpContext) {
    const requestData = request.only(['calendario', 'devedor', 'valor', 'chave'])

    try {
      const charge = await createImmediateCharge(requestData)
      return response.status(201).json(charge)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }
}
