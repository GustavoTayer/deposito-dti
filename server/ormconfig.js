module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5431,
  username: 'postgres',
  password: 123,
  database: 'deposito',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
