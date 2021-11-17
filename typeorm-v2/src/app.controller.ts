import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Employee } from './employees/employee.entity';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('seeder')
    async seedData(): Promise<void> {
        this.appService.seed();
        console.log('Seed Success!');
    }

    @Get('/:id')
    async getEmployeeById(@Param('id') id: number): Promise<Employee> {
        return this.appService.getEmployeeById(id);
    }

    @Get('/delete/:id')
    async deleteEmployeeById(@Param('id') id: number): Promise<void> {
        this.appService.deleteEmployee(id);
        console.log('Deleted');
    }
}
