import firebase from "../config/Firebase";
export const addUser = (values) => {
  firebase.firestore().collection("users").add(values);
};

export const signout = (history) => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
      history.push("/");
    })
    .catch(function (error) {
      // An error happened.
    });
};

export const resetpassword = (values, history) => {
  firebase
    .auth()
    .sendPasswordResetEmail(values.email)
    .then(function () {
      // Email sent.

      alert(
        `Nous avons envoyé un lien pour changer votre mot de passe à votre email : ${values.email}`
      );
      history.push("/");
    })
    .catch(function (error) {
      // An error happened.
      document.getElementById("p1").innerHTML = error.message;
    });
};

export const register = (values, history) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then((response) => {
      addUser(values);
      history.push("/");
    })
    .catch(function (error) {
      document.getElementById("px").innerHTML = "Cet e-mail est déjà pris";
    });
};
export const readdata = (values, history) => {
  firebase
    .firestore()
    .collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().email === values.email) {
          if (doc.data().work === "technicien") {
            history.push("/SendComplaint");
          } else {
            history.push("/FctAdmin");
          }
        }
      });
    });
};
export const Login = (values, history) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(values.email, values.password)
    .then(function (response) {
      readdata(values, history);
    })
    .catch(function (error) {
      document.getElementById("p1").innerHTML =
        "email incorrecte ou mot de passe incorrect";
    });
};
