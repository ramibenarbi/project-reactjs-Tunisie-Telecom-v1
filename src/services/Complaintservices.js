import firebase from "../config/Firebase";
import * as serve from "../services/id";
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
        (error) => {},
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
                  alert("erreur");
                });
              data.Description = "";
              data.localisation = "";
              history.push("/SendComplaint");
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
        alert("erreur");
      });
    data.Description = "";
    data.localisation = "";
    history.push("/SendComplaint");
  }
};
