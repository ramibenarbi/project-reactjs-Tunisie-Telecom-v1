import firebase from "../config/Firebase";

export const idgetit = async () => {
  var x = [];
  await firebase
    .firestore()
    .collection("reclamation")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        x.push(doc.data());
      });
    });

  return x.length;
};
