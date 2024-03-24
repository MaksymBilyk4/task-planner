import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common'
import { PomodoroService } from './pomodoro.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { PomodoroRoundDto, PomodoroSessionDto } from './dto/pomodoro.dto'

@Controller('user/timer')
export class PomodoroController {
	constructor(private readonly pomodoroService: PomodoroService) {
	}

	@Get('today')
	@Auth()
	async getTodaySession(@CurrentUser('id') userId: string) {
		return this.pomodoroService.getTodaySession(userId)
	};

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async create(@CurrentUser('id') userId: string) {
		return this.pomodoroService.create(userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('round/:id')
	@Auth()
	async updateRound(@Body() dto: PomodoroRoundDto, @Param('id') roundId: string) {
		return this.pomodoroService.updateRound(dto, roundId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async updateSession(
		@Body() dto: PomodoroSessionDto,
		@Param('id') sessionId: string,
		@CurrentUser('id') userId: string) {
		return this.pomodoroService.update(dto, sessionId, userId)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@Param('id') sessionId: string, @CurrentUser('id') userId: string) {
		return this.pomodoroService.delete(sessionId, userId)
	}

}
