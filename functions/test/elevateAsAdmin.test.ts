import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import * as admin from "firebase-admin";
import * as functionsTest from "firebase-functions-test";
import * as sinon from "sinon";
import { elevateAsAdmin } from "../src/index";

const test = functionsTest();
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
    const wrapped = test.wrap(elevateAsAdmin);
    const res: Error = await wrapped({
      data: { uid: "", isAdmin: false },
    });
    expect(res.message).toBe("User not found");
  });

  it("skips setting claim if not admin", async () => {
    authStub.get(() => () => ({
      getUser: sinon.fake.resolves({
        uid: "test-uid",
      }),
    }));
    const wrapped = test.wrap(elevateAsAdmin);
    const res: Error = await wrapped({
      data: { uid: "test-uid", isAdmin: true },
    });
    expect(res.message).toBe("Role set error");
  });

  it("skips setting claim if not need", async () => {
    authStub.get(() => () => ({
      getUser: sinon.fake.resolves({
        uid: "test-uid",
        customClaims: { admin: false },
      }),
    }));
    const wrapped = test.wrap(elevateAsAdmin);
    const res: Response = await wrapped({
      data: { uid: "test-uid", isAdmin: false },
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
    const wrapped = test.wrap(elevateAsAdmin);
    const res: Response = await wrapped({
      data: { uid: "test-uid", isAdmin: true },
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
    const wrapped = test.wrap(elevateAsAdmin);
    const res: Error = await wrapped({
      data: { uid: "test-uid", isAdmin: true },
    });
    expect(res.message).toBe("Role set error");
  });

  afterAll(() => {
    authStub.restore();
    adminStub.restore();
    test.cleanup();
  });
});
