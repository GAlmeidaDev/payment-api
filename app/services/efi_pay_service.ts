import axios from 'axios'
import { EfiPayAuthService } from './auth_service.ts'

const BASE_URL = 'https://cobrancas-h.api.efipay.com.br/v1/charge'
const efiPayAuthService = new EfiPayAuthService()
export class EfiPayService {
  static async createCharge(items: Array<{ name: string; value: number; amount: number }>) {
    try {
      const token = await efiPayAuthService.authenticateEfi()
      const response = await axios.post(
        `${BASE_URL}`,
        { items },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (error) {
      throw new Error(`Failed to create charge: ${error.message}`)
    }
  }

  static async processPayment(chargeId: string, paymentData: any) {
    try {
      const token = await efiPayAuthService.authenticateEfi()
      const response = await axios.post(
        `${BASE_URL}/${chargeId}/pay`,
        { payment: paymentData },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      return response.data
    } catch (error) {
      console.log(error, '<===')
      throw new Error(`Failed to process payment: ${error.message}`)
    }
  }

  static async checkPayment(chargeId: string) {
    try {
      const token = await efiPayAuthService.authenticateEfi()
      const response = await axios.get(`${BASE_URL}/${chargeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      throw new Error(`Failed to process payment: ${error.message}`)
    }
  }
}
