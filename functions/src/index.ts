import * as admin from "firebase-admin";
import { https } from "firebase-functions/v2";
import "source-map-support/register";

admin.initializeApp();

export const elevateAsAdmin = https.onCall<{ uid: string; isAdmin: boolean }>(
  async ({ data }) => {
    const { uid, isAdmin } = data;
    const auth = admin.auth();
    const user = await auth.getUser(uid);
    if (!user) return new https.HttpsError("not-found", "User not found");

    if (user.customClaims?.admin === isAdmin)
      return { ok: true, set: false, uid };

    try {
      await auth.setCustomUserClaims(uid, { admin: isAdmin });
    } catch (e) {
      return new https.HttpsError("internal", "Role set error");
    }

    return { ok: true, set: true, uid };
  }
);

export const setMode = https.onCall<{ mode: string }>(
  async ({ data, auth }) => {
    const { mode } = data;
    if (auth?.token.admin !== true)
      return new https.HttpsError("permission-denied", "Must be admin");

    const config = admin.remoteConfig();
    const template = await config.getTemplate();
    template.parameters.mode.defaultValue = { value: mode };
    await config.publishTemplate(template);
    return { ok: true, mode };
  }
);
