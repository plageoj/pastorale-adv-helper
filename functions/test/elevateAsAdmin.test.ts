import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import * as admin from "firebase-admin";
import functionsTest from "firebase-functions-test";
import * as sinon from "sinon";
import { elevateAsAdmin } from "../src/index";
import { Request } from "firebase-functions/https";

const { wrap, cleanup } = functionsTest();
type Response = { ok: boolean; set: boolean; uid: string };

describe("elevateAsAdmin", () => {
  let adminStub: sinon.SinonStub;
  let authStub: sinon.SinonStub;

  beforeAll(() => {
    adminStub = sinon.stub(admin, "initializeApp");
    authStub = sinon.stub(admin, "auth");
  });

  it("does nothing for empty user", async () => {
    authStub.get(() => () => ({
      getUser: sinon.fake.resolves(false),
    }));
    const wrapped = wrap(elevateAsAdmin);
    const res: Error = await wrapped({
      data: { uid: "", isAdmin: false },
      acceptsStreaming: false,
      rawRequest: {} as unknown as Request, // TODO: Remove this cast when upgrading firebase-functions-test
    });
    expect(res.message).toBe("User not found");
  });

  it("skips setting claim if not admin", async () => {
    authStub.get(() => () => ({
      getUser: sinon.fake.resolves({
        uid: "test-uid",
      }),
    }));
    const wrapped = wrap(elevateAsAdmin);
    const res: Error = await wrapped({
      data: { uid: "test-uid", isAdmin: true },
      acceptsStreaming: false,
      rawRequest: {} as unknown as Request, // TODO: Remove this cast when upgrading firebase-functions-test
    });
    expect(res.message).toBe(
      "Role set error - auth.setCustomUserClaims is not a function"
    );
  });

  it("skips setting claim if not need", async () => {
    authStub.get(() => () => ({
      getUser: sinon.fake.resolves({
        uid: "test-uid",
        customClaims: { admin: false },
      }),
    }));
    const wrapped = wrap(elevateAsAdmin);
    const res: Response = await wrapped({
      data: { uid: "test-uid", isAdmin: false },
      acceptsStreaming: false,
      rawRequest: {} as unknown as Request, // TODO: Remove this cast when upgrading firebase-functions-test
    });
    expect(res.ok).toBeTruthy();
    expect(res.set).toBeFalsy();
  });

  it("sets claim", async () => {
    authStub.get(() => () => ({
      getUser: sinon.fake.resolves({
        uid: "test-uid",
        customClaims: { admin: false },
      }),
      setCustomUserClaims: sinon.fake.resolves(true),
    }));
    const wrapped = wrap(elevateAsAdmin);
    const res: Response = await wrapped({
      data: { uid: "test-uid", isAdmin: true },
      acceptsStreaming: false,
      rawRequest: {} as unknown as Request, // TODO: Remove this cast when upgrading firebase-functions-test
    });
    expect(res.ok).toBeTruthy();
    expect(res.set).toBeTruthy();
  });

  it("fails if it can't set claim", async () => {
    authStub.get(() => () => ({
      getUser: sinon.fake.resolves({
        uid: "test-uid",
        customClaims: { admin: false },
      }),
      setCustomUserClaims: sinon.fake.rejects(true),
    }));
    const wrapped = wrap(elevateAsAdmin);
    const res: Error = await wrapped({
      data: { uid: "test-uid", isAdmin: true },
      acceptsStreaming: false,
      rawRequest: {} as unknown as Request, // TODO: Remove this cast when upgrading firebase-functions-test
    });
    expect(res.message).toBe("Role set error - true");
  });

  afterAll(() => {
    authStub.restore();
    adminStub.restore();
    cleanup();
  });
});
