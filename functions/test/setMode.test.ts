import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import * as admin from "firebase-admin";
import functionsTest from "firebase-functions-test";
import { Request } from "firebase-functions/https";
import { AuthData } from "firebase-functions/tasks";
import * as sinon from "sinon";
import { setmode } from "../src/index";

const { wrap, cleanup } = functionsTest();

describe("setMode", () => {
  let adminStub: sinon.SinonStub;
  let configStub: sinon.SinonStub;

  beforeAll(() => {
    adminStub = sinon.stub(admin, "initializeApp");
    configStub = sinon.stub(admin, "remoteConfig");
  });

  it("does nothing if no auth provided", async () => {
    const wrapped = wrap(setmode);
    const res: Error = await wrapped({
      data: { mode: "mode" },
      acceptsStreaming: false,
      rawRequest: {} as unknown as Request, // TODO: Remove this cast when upgrading firebase-functions-test
    });
    expect(res.message).toBe("Must be admin");
  });

  it("returns error if the user is not admin", async () => {
    const wrapped = wrap(setmode);
    const res: Error = await wrapped({
      data: { mode: "mode" },
      auth: { token: { admin: false } } as unknown as AuthData,
      acceptsStreaming: false,
      rawRequest: {} as unknown as Request, // TODO: Remove this cast when upgrading firebase-functions-test
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
    const wrapped = wrap(setmode);
    const res = await wrapped({
      data: { mode: "mode" },
      auth: { token: { admin: true } } as unknown as AuthData,
      acceptsStreaming: false,
      rawRequest: {} as unknown as Request, // TODO: Remove this cast when upgrading firebase-functions-test
    });
    expect(publishTemplate.calledOnce).toBeTruthy();
    expect(res.ok).toBeTruthy();
    expect(res.mode).toBe("mode");
  });

  afterAll(() => {
    configStub.restore();
    adminStub.restore();
    cleanup();
  });
});
