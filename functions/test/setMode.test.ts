import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import * as admin from "firebase-admin";
import * as functionsTest from "firebase-functions-test";
import { wrap } from "firebase-functions-test/lib/main";
import * as sinon from "sinon";
import { setMode } from "../src/index";

const test = functionsTest();

describe("setMode", () => {
  let adminStub: sinon.SinonStub;
  let configStub: sinon.SinonStub;

  beforeAll(() => {
    adminStub = sinon.stub(admin, "initializeApp");
    configStub = sinon.stub(admin, "remoteConfig");
  });

  it("does nothing if no auth provided", async () => {
    const wrapped = wrap(setMode);
    const res: Error = await wrapped({
      data: { mode: "mode" },
    });
    expect(res.message).toBe("Must be admin");
  });

  it("returns error if the user is not admin", async () => {
    const wrapped = wrap(setMode);
    const res: Error = await wrapped({
      data: { mode: "mode" },
      auth: { token: { admin: false } },
    });
    expect(res.message).toBe("Must be admin");
  });

  it("publishes template", async () => {
    const publishTemplate = sinon.fake.resolves({});
    configStub.get(() => () => ({
      getTemplate: sinon.fake.resolves({
        parameters: { mode: { defaultValue: { value: "" } } },
      }),
      publishTemplate,
    }));
    const wrapped = wrap(setMode);
    const res = await wrapped({
      data: { mode: "mode" },
      auth: { token: { admin: true } },
    });
    expect(publishTemplate.calledOnce).toBeTruthy();
    expect(res.ok).toBeTruthy();
    expect(res.mode).toBe("mode");
  });

  afterAll(() => {
    configStub.restore();
    adminStub.restore();
    test.cleanup();
  });
});
