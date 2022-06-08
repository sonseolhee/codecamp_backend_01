import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  // let appService: AppService;
  let appController: AppController;

  beforeEach(async () => {
    const appModule = await Test.createTestingModule({
      controllers: [AppController],
      // providers: [AppService], // 실제 AppService 안주고, 나만의 AppService 만들어서 주기
    })
      .useMocker((token) => {
        // 가짜 AppService 만들기(만들고 주입까지 해놓기)
        if (token === AppService) {
          return {
            getHello: jest.fn().mockReturnValue('Hello World!'), // () => 'Hello World!' 이방식도 됨
          };
        }
      })
      .compile();

    // appService = appModule.get<AppService>(AppService);
    appController = appModule.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('이 테스트의 결과는 Hello World 리턴해야됨!!!', () => {
      const result = appController.getHello();
      expect(result).toBe('Hello World!');
    });
  });
});
