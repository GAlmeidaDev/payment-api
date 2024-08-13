import type { HttpContext } from '@adonisjs/core/http'
import { EfiPayService } from '../services/efi_pay_service.ts'

export default class EfiPayController {
  async createCharge({ request, response }: HttpContext) {
    const items = request.input('items')

    try {
      const chargeData = await EfiPayService.createCharge(items)
      return response.json(chargeData)
    } catch (error) {
      return response.status(500).json({ message: 'Error creating charge', error: error.message })
    }
  }

  async processPayment({ params, request, response }: HttpContext) {
    const { id } = params
    const paymentData = request.input('payment')

    try {
      const paymentResult = await EfiPayService.processPayment(id, paymentData)
      return response.json(paymentResult)
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Error processing payment', error: error.message })
    }
  }
  async checkPayment({ params, response }: HttpContext) {
    const { chargeId } = params
    try {
      const chargeData = await EfiPayService.checkPayment(chargeId)
      return response.json(chargeData)
    } catch (error) {
      return response.status(500).json({ message: 'Error creating charge', error: error.message })
    }
  }
}
