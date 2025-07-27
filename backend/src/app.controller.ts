import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth(): { status: string; timestamp: string } {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('test')
  getTest(): { message: string; routes: string[] } {
    return {
      message: 'Backend is working!',
      routes: [
        '/health',
        '/produit-standard',
        '/auth/login',
        '/auth/register',
        '/traduction'
      ]
    };
  }
}
