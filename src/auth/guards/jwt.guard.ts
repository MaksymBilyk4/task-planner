import { AuthGuard } from '@nestjs/passport'
import { AuthService } from '../auth.service'

export class JwtAuthGuard extends AuthGuard("jwt") {
	constructor(
		private readonly authService: AuthService
	) {
		super()
	}
}