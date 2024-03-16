import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-yet";

export default CacheModule.registerAsync({
  isGlobal: true,
  useFactory: async () => ({
    store: await redisStore({
      socket: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
      database: 0,
      ttl: 30 * 1000,
      // password: process.env.REDIS_PASSWORD,
    }),
    max: 10,
  }),
});
