import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetActiveEvents } from '@app/event/dto/getActiveEvents.dto';
import { FastifyRequest } from 'fastify';
import { AttendEventDto } from '@app/event/dto/attendEvent.dto';
import { EventService } from '@app/event/event.service';
@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('/active')
  @ApiOperation({ summary: 'Get all active events.' })
  @ApiOkResponse({
    type: () => GetActiveEvents,
  })
  getActiveEvents() {
    return this.eventService.getActiveEvents();
  }

  @Post('/attend')
  @ApiNoContentResponse()
  @ApiOperation({ summary: 'User Attends to an event.' })
  attendEvent(@Req() req: FastifyRequest, @Body() body: AttendEventDto) {
    return this.eventService.attendEvent(req.user.id, body);
  }
}
