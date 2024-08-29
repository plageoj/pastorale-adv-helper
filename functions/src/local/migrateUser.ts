import { auth, firestore } from "firebase-admin";
import { applicationDefault, initializeApp } from "firebase-admin/app";

(async () => {
  initializeApp({
    credential: applicationDefault(),
  });

  const members = await firestore().collection("members").listDocuments();

  for (const member of members) {
    const doc = await member.get();
    const data = doc.data();

    if (!data) {
      continue;
    }

    const user = await auth().createUser({
      displayName: data.name,
      email: `b${data._studentNumber}@hiroshima-u.ac.jp`,
      password: data._studentNumber,
      emailVerified: true,
    });

    await member.set({
      uid: user.uid,
      studentNumber: data._studentNumber,
      name: data.name,
      job: data.job,
      currentAddress: data.currentAddress,
      isHomeInHiroshima: data.cbHiroshima,
      homeAddress: data.tempAddress,
      comment: data.comment,
      stores: data.stores,
      commute: [],
      isAdmin: false,
    });

    console.info(`Migrated user ${user.uid}`);
  }
})();
