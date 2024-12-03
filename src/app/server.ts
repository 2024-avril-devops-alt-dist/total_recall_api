import { NextApiHandler } from "next";
import { createServer } from "http";
import next from "next";

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

export default async function createTestServer() {
  await app.prepare();
  return createServer((req, res) => {
    handle(req, res);
  });
}
