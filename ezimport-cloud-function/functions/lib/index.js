"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleFunctionCronTab = exports.startOpleCrawler = exports.helloWorld = void 0;
const functions = require("firebase-functions/v1");
const ople_crawler_1 = require("./crawlers/ople-crawler");
require("dotenv/config");
exports.helloWorld = functions
    .region("asia-northeast3")
    .https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});
exports.startOpleCrawler = functions
    .region("asia-northeast3")
    .runWith({
    memory: "2GB",
    timeoutSeconds: 120,
})
    .https.onRequest(async (request, response) => {
    functions.logger.info("Start Crawler", { structuredData: true });
    const crawler = new ople_crawler_1.default();
    await crawler.start();
    response.send("End Crawler");
});
// 한국 시간으로 매일 3시에 실행: scheduler 는 에뮬레이터로 테스트 불가
exports.scheduleFunctionCronTab = functions
    .region("asia-northeast3")
    .runWith({
    memory: "2GB",
    timeoutSeconds: 120,
})
    .pubsub.schedule("* 3 * * *")
    .timeZone("Asia/Seoul")
    .onRun(async () => {
    functions.logger.info("Start Crawler", { structuredData: true });
    const crawler = new ople_crawler_1.default();
    await crawler.start();
    return null;
});
//# sourceMappingURL=index.js.map