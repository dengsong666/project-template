import { CacheModule } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';

export default CacheModule.registerAsync({
  isGlobal: true,
  useFactory: async () => ({
    store: await redisStore({
      socket: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
      ttl: 5,
      password: process.env.REDIS_PASSWORD,
    }),
    ttl: 5,
    max: 10,
  }),
});
