import { Injectable, NotFoundException } from '@nestjs/common';
import { ITask, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schema/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}
  private tasks: ITask[] = [];

  async getAllTasks(): Promise<ITask[]> {
    return this.taskModel.find();
  }

  async getFilteredTasks(filterDto: GetTaskFilterDto): Promise<ITask[]> {
    const { status, search } = filterDto;
    let tasks = await this.getAllTasks();
    console.log('taskstasks', tasks);
    if (status) {
      tasks = await this.taskModel.find({ status: status });
    }

    if (search) {
      tasks = await this.taskModel.find({
        $or: [
          { title: { $regex: search } },
          { description: { $regex: search } },
        ],
      });
    }
    return tasks;
  }
  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found!!!');
    }
    return task;
  }

  async deleteTaskById(id: string): Promise<void> {
    await this.taskModel.deleteOne({ _id: id });
  }

  async createTeasks(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task: Task = {
      title,
      description: description,
      status: TaskStatus.OPEN,
    };

    const response = await this.taskModel.create(task);

    return response;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.taskModel.findByIdAndUpdate(
      id,
      { status: status },
      { new: true },
    );
    return task;
  }
}
