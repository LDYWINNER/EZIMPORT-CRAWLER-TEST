import * as functions from "firebase-functions/v1";
import OpleCrawler from "./crawlers/ople-crawler";
import "dotenv/config";

export const helloWorld = functions
  .region("asia-northeast3")
  .https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
  });

export const startOpleCrawler = functions
  .region("asia-northeast3")
  .runWith({
    memory: "2GB",
    timeoutSeconds: 120,
  })
  .https.onRequest(async (request, response) => {
    functions.logger.info("Start Crawler", { structuredData: true });
    const crawler = new OpleCrawler();
    await crawler.start();
    response.send("End Crawler");
  });

// 한국 시간으로 매일 3시에 실행: scheduler 는 에뮬레이터로 테스트 불가
export const scheduleFunctionCronTab = functions
  .region("asia-northeast3")
  .runWith({
    memory: "2GB",
    timeoutSeconds: 120,
  })
  .pubsub.schedule("0 3 * * *")
  .timeZone("Asia/Seoul")
  .onRun(async () => {
    functions.logger.info("Start Crawler", { structuredData: true });
    const crawler = new OpleCrawler();
    await crawler.start();
    return null;
  });
