import axios from 'axios'
import fs from 'node:fs'
import path from 'node:path'
import { Agent } from 'node:https'
import env from '#start/env'

const filename = new URL(import.meta.url).pathname
const dirname = path.dirname(filename)

export class EfiPayAuthService {
  private token: string | null = null
  private clientId = env.get('CLIENT_ID')
  private clientSecret = env.get('CLIENT_SECRET')
  private certPath = path.resolve(dirname, '../certificate/certificate.p12')

  async authenticatePix(): Promise<string> {
    if (!this.token) {
      try {
        const cert = fs.readFileSync(this.certPath)
        const response = await axios.post(
          'https://pix-h.api.efipay.com.br/oauth/token',
          {
            grant_type: 'client_credentials',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
            },
            httpsAgent: new Agent({
              pfx: cert,
              passphrase: '',
            }),
          }
        )

        this.token = response.data.access_token
      } catch (error) {
        throw new Error(`Failed to authenticate with EfiPay: ${error.message}`)
      }
    }

    return this.token!
  }

  async authenticateEfi(): Promise<string> {
    if (!this.token) {
      try {
        const response = await axios.post(
          'https://cobrancas-h.api.efipay.com.br/v1/authorize',
          {
            grant_type: 'client_credentials',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
            },
          }
        )

        this.token = response.data.access_token
      } catch (error) {
        throw new Error(`Failed to authenticate with EfiPay: ${error.message}`)
      }
    }

    return this.token!
  }
}
