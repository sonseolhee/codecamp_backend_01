import { ConnectionOptions } from 'typeorm';
import * as path from 'path';

const typeormConfig: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost', // 비교 대상(개발서버 등)
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'myproject',
  entities: [
    path.join(__dirname, '../../../dist/apis/**/entities/*.entity.js'), // yarn build를 해줘야 *.entity.js 파일이 생성되며, 테이블 변경을 감지함(.ts는 사용 불가)
  ],
  cli: { migrationsDir: 'src/common/migrations' },
};

export default typeormConfig;
