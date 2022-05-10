import * as admin from "firebase-admin";
import { https } from "firebase-functions";
import "source-map-support/register";

admin.initializeApp();

export const elevateAsAdmin = https.onCall(
  async ({ uid, isAdmin }: { uid: string; isAdmin: boolean }) => {
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
