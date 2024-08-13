import axios from 'axios'
import fs from 'node:fs'
import path from 'node:path'
import { Agent } from 'node:https'
import { EfiPayAuthService } from './auth_service.ts'
const filename = new URL(import.meta.url).pathname
const dirname = path.dirname(filename)
const certPath = path.resolve(dirname, '../certificate/certificate.p12')
const cert = fs.readFileSync(certPath)

const BASE_URL = 'https://pix-h.api.efipay.com.br/v2'

const httpsAgent = new Agent({
  pfx: cert,
  passphrase: '',
})
const efiPayAuthService = new EfiPayAuthService()
export const getQrCode = async (locId: string) => {
  try {
    const token = await efiPayAuthService.authenticatePix()
    const response = await axios.get(`${BASE_URL}/loc/${locId}/qrcode`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      httpsAgent,
    })
    return response.data
  } catch (error) {
    throw new Error(`Failed to get QR code: ${error.message}`)
  }
}

export const createImmediateCharge = async (data: {
  calendario: { expiracao: number }
  devedor: { cpf: string; nome: string }
  valor: { original: string }
  chave: string
}) => {
  try {
    const token = await efiPayAuthService.authenticatePix()
    const response = await axios.post(`${BASE_URL}/cob`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      httpsAgent,
    })
    return response.data
  } catch (error) {
    throw new Error(`Failed to create immediate charge: ${error.message}`)
  }
}

export const checkBillingPix = async (txid: string) => {
  try {
    const token = await efiPayAuthService.authenticatePix()
    const response = await axios.get(`${BASE_URL}/cob/${txid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      httpsAgent,
    })
    return response.data
  } catch (error) {
    throw new Error(`Failed to get QR code: ${error.message}`)
  }
}
