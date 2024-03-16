import { Injectable } from "@nestjs/common";
import { Cron, Interval, SchedulerRegistry, Timeout } from "@nestjs/schedule";
import { logger } from "config/logger";
import { CronJob } from "cron";

@Injectable()
export class TaskService {
  constructor(private scheduler: SchedulerRegistry) {}
  @Cron("45 * * * * *")
  handleCron() {
    logger.debug("Called when the second is 45");
  }

  @Interval(10000)
  handleInterval() {
    logger.debug("Called every 10 seconds");
  }

  @Timeout(5000)
  handleTimeout() {
    logger.debug("Called once after 5 seconds");
  }

  addCronJob(name: string, seconds: string) {
    const job = new CronJob(`${seconds} * * * * *`, () =>
      logger.warn(`time (${seconds}) for job ${name} to run!`),
    );

    this.scheduler.addCronJob(name, job);
    job.start();

    logger.warn(`job ${name} added for each minute at ${seconds} seconds!`);
  }
  deleteCron(name: string) {
    this.scheduler.deleteCronJob(name);
    logger.warn(`job ${name} deleted!`);
  }
  getCrons() {
    // const jobs = this.scheduler.getCronJobs();
    // jobs.forEach((value, key, map) => {
    //   let next;
    //   try {
    //     next = value.nextDates().toLocaleString();
    //   } catch (e) {
    //     next = "error: next fire date is in the past!";
    //   }
    //   logger.log(`job: ${key} -> next: ${next}`);
    // });
  }
}
