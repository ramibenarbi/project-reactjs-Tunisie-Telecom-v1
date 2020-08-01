import firebase from "../config/Firebase";

export const displayarray = () => {
  var x = [];
  firebase
    .firestore()
    .collection("reclamation")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        x.push(doc.data());
      });
    });

  return x;
};
export const addComplaints = (data, history, idx) => {
  let core = "";
  let energie = "";
  let environnement = "";
  let securite = "";
  for (let i = 0; i < data.problemdecore.length; i++) {
    core = data.problemdecore[i] + " ," + core;
  }
  for (let j = 0; j < data.problemenergie.length; j++) {
    energie = data.problemenergie[j] + " ," + energie;
  }
  for (let d = 0; d < data.problemenvironnement.length; d++) {
    environnement = data.problemenvironnement[d] + " ," + environnement;
  }
  for (let c = 0; c < data.problemesecurite.length; c++) {
    securite = data.problemesecurite[c] + " ," + securite;
  }

  const finalsdata = {
    id: idx,
    daterec: `${new Date().getDate()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()}`,
    timerec: `${
      new Date().getHours() - 1
    }:${new Date().getMinutes()}:${new Date().getSeconds()}`,
    email: firebase.auth().currentUser.email,
    core: core,
    energie: energie,
    environnement: environnement,
    securite: securite,
    description: data.Description,
    traite: "non",
    lotderechange: "",
  };

  if (data.files2[0] !== undefined) {
    firebase
      .storage()
      .ref(`images/${data.files2[0].name}`)
      .put(data.files2[0])
      .on(
        "state_changed",
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              break;
          }
        },
        (error) => {
          alert("erreur!! réessayer");
        },
        function () {
          // Upload completed successfully, now we can get the download URL
          firebase
            .storage()
            .ref(`images/${data.files2[0].name}`)
            .put(data.files2[0])
            .snapshot.ref.getDownloadURL()
            .then(function (downloadURL) {
              finalsdata.imageUrl = downloadURL;
              firebase
                .firestore()
                .collection("reclamation")
                .add(finalsdata)
                .then(alert("votre reclamation a ete envoyé"))
                .catch((error) => {
                  alert("erreur!! réessayer");
                });
              data.Description = "";
              data.localisation = "";
              history.push("/SendComplaintAdmin");
            });
        }
      );
  } else {
    finalsdata.imageUrl = "";
    firebase
      .firestore()
      .collection("reclamation")
      .add(finalsdata)
      .then(alert("votre reclamation a ete envoyé"))
      .catch((error) => {
        alert("erreur!! réessayer");
      });
    data.Description = "";
    data.localisation = "";
    history.push("/SendComplaintAdmin");
  }
};

export const addComp = (values, idx) => {
  values.id = idx;
  firebase
    .firestore()
    .collection("reclamation")
    .add(values)

    .catch(function (error) {
      alert("erreur!! réessayer");
    });
};
export const updateComp = (newvalues, oldvalues) => {
  firebase
    .firestore()
    .collection("reclamation")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().id === oldvalues.id) {
          return firebase
            .firestore()
            .collection("reclamation")
            .doc(doc.id)
            .update(newvalues)

            .catch(function (error) {
              alert("erreur!! réessayer");
            });
        }
      });
    });
};

export const deleteComp = (values) => {
  firebase
    .firestore()
    .collection("reclamation")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().id === values.id) {
          firebase
            .firestore()
            .collection("reclamation")
            .doc(doc.id)
            .delete()

            .catch(function (error) {
              alert("erreur!! réessayer");
            });
        }
      });
    });
};

export const getcode = async () => {
  var x = [];
  let object = {};
  await firebase
    .firestore()
    .collection("stock")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        object = { value: doc.data().code, label: doc.data().code };
        x.push(object);
      });
    });

  return x;
};
export const treatcomplaint = (data, history) => {
  let lot = "";
  for (let i = 0; i < data.lotderechange.length; i++) {
    lot = data.quantite[i] + "*" + data.lotderechange[i] + "," + lot;
  }

  firebase
    .firestore()
    .collection("reclamation")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().id === parseInt(data.id)) {
          return firebase
            .firestore()
            .collection("reclamation")
            .doc(doc.id)
            .update({
              lotderechange: lot,
              traite: "oui",
            })
            .then(function () {
              data.id = "";
              history.push("/TreatComplaints");
            });
        }
      });
    });
};
export const treatStock = (data, history) => {
  firebase
    .firestore()
    .collection("stock")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        for (let i = 0; i < data.lotderechange.length; i++) {
          if (doc.data().code === data.lotderechange[i]) {
            if (doc.data().quantite > parseInt(data.quantite[i])) {
              return firebase
                .firestore()
                .collection("stock")
                .doc(doc.id)
                .update({
                  quantite: doc.data().quantite - parseInt(data.quantite[i]),
                })
                .then(function () {
                  treatcomplaint(data, history);
                  alert("La réclamation est traité avec succès!");
                })
                .catch(function (error) {
                  alert("Erreur lors de la traitement du  réclamation!");
                });
            } else {
              alert(
                `le stock ne contient pas cette quantite suffisament ${data.lotderechange[i]}`
              );
            }
          }
        }
      });
    });
};
