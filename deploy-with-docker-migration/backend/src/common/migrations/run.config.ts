import { ConnectionOptions } from 'typeorm';
import * as path from 'path';

const typeormConfig: ConnectionOptions = {
  type: 'mysql',
  host: 'my_database', // 마이그레이션 대상(프로덕션서버)
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'myproject',
  migrations: [path.join(__dirname, '../../../dist/common/migrations/*.js')], // yarn build를 해줘야 *.entity.js 파일이 생성됨
  // migrations: [path.join(__dirname, '../../../dist/common/migrations/*.js')],
};

export default typeormConfig;
