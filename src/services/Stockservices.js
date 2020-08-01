import firebase from "../config/Firebase";
export const addStock = (values, history) => {
  firebase
    .firestore()
    .collection("stock")
    .doc(values.code)
    .set(values)
    .catch(function (error) {
      alert("erreur!! réessayer");
    });
};
export const updateStock = (newvalues, oldvalues) => {
  deleteStock(oldvalues);
  addStock(newvalues);
};
export const deleteStock = (values) => {
  firebase
    .firestore()
    .collection("stock")
    .doc(values.code)
    .delete()

    .catch(function (error) {
      alert("erreur!! réessayer");
    });
};

export const displayarray = () => {
  var x = [];
  firebase
    .firestore()
    .collection("stock")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        x.push(doc.data());
      });
    });

  return x;
};
