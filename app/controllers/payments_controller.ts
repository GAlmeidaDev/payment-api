import type { HttpContext } from '@adonisjs/core/http'

export default class PaymentsController {
  async method1({ response }: HttpContext) {
    return response.json({
      hello: 'world',
    })
  }
}
