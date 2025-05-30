import { Test, TestingModule } from '@nestjs/testing';
import { CoursesCategoriesController } from './courses-categories.controller';

describe('CoursesCategoriesController', () => {
  let controller: CoursesCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesCategoriesController],
    }).compile();

    controller = module.get<CoursesCategoriesController>(CoursesCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
