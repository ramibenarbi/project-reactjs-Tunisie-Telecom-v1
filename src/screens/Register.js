import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import * as service from "../services/Authservices";
import "../App.css";
const Register = () => {
  const history = useHistory();
  return (
    <div className="di">
      <Formik
        initialValues={{
          work: "technicien",
          firstname: "",
          lastname: "",
          cin: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object().shape({
          work: Yup.string().required(),
          firstname: Yup.string().required("Quel est votre nom ?"),
          lastname: Yup.string().required("Quel est votre prenom ?"),

          cin: Yup.string()
            .length(8, "votre numéro de CIN est erroné")

            .matches(
              /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
              "votre numéro de CIN est erroné "
            )
            .required("Ajouter Votre numero de CIN "),
          email: Yup.string()
            .email("Le courriel est invalide")
            .required("Ajouter votre Email !"),

          password: Yup.string()
            .min(6, "Le mot de passe doit être au moins de 6 caractères")
            .max(12, "Le mot de passe ne doit pas dépasser 12 caractères")
            .required("Ajouter votre mot de passe !"),
          confirmPassword: Yup.string()
            .oneOf(
              [Yup.ref("password"), null],
              "les mots de passe doivent correspondre"
            )
            .required("Confirmer votre mot de passe !"),
        })}
        onSubmit={(values) => {
          delete values.confirmPassword;

          service.register(values, history);
        }}
        render={({ errors, status, touched }) => (
          <Form class="modal-content animate">
            <label id="label">Créer un compte</label>

            <Field
              name="work"
              render={({ field }) => (
                <>
                  <div className="radio-item">
                    <input
                      {...field}
                      id="admin"
                      value="administrateur"
                      checked={field.value === "administrateur"}
                      name="work"
                      type="radio"
                    />
                    <label htmlFor="admin">Administrateur</label>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <input
                      {...field}
                      id="tech"
                      checked
                      value="technicien"
                      name="work"
                      type="radio"
                    />
                    <label htmlFor="tech">Technicien</label>
                  </div>
                </>
              )}
            />

            {/* Nom */}
            <div id="left">
              <br />
              <label htmlFor="firstname">Nom</label>
              <Field
                name="firstname"
                type="text"
                className={
                  "form-control" +
                  (errors.firstname && touched.firstname ? " is-invalid" : "")
                }
                placeholder="Ecrire ton nom..."
              />
              <ErrorMessage
                name="firstname"
                component="div"
                className="invalid-feedback"
              />
            </div>
            {/* preNom */}
            <div id="left">
              <br />
              <label htmlFor="lastname">Prénom</label>
              <Field
                name="lastname"
                type="text"
                className={
                  "form-control" +
                  (errors.lastname && touched.lastname ? " is-invalid" : "")
                }
                placeholder="Ecrire ton prénom ..."
              />
              <ErrorMessage
                name="lastname"
                component="div"
                className="invalid-feedback"
              />
            </div>
            {/* Cin */}
            <div id="left">
              <br />
              <label id="p" htmlFor="cin">
                CIN
              </label>
              <Field
                name="cin"
                type="text"
                className={
                  "form-control" +
                  (errors.cin && touched.cin ? " is-invalid" : "")
                }
                placeholder="Ecrire ton numero de Cin ..."
              />
              <ErrorMessage
                name="cin"
                component="div"
                className="invalid-feedback"
              />
            </div>
            {/* email */}
            <div id="left">
              <br />
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                type="text"
                className={
                  "form-control" +
                  (errors.email && touched.email ? " is-invalid" : "")
                }
                placeholder="Ecrire ton E-mail ..."
              />
              <small className="crimson" id="px">
                {" "}
              </small>
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>
            {/* password */}
            <div id="left">
              <br />
              <label htmlFor="password">Mot de passe</label>
              <Field
                name="password"
                type="password"
                className={
                  "form-control" +
                  (errors.password && touched.password ? " is-invalid" : "")
                }
                placeholder="Ecrire ton mot de passe ..."
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>
            {/* confirme password*/}
            <div id="left">
              <br />
              <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <Field
                name="confirmPassword"
                type="password"
                className={
                  "form-control" +
                  (errors.confirmPassword && touched.confirmPassword
                    ? " is-invalid"
                    : "")
                }
                placeholder="Confirmer votre mot de passe ..."
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div>
              <br />

              <button
                id="registrebutton"
                type="submit"
                className="btn btn-primary mr-2"
              >
                Inscription
              </button>

              <Link to="/">
                <small id="right">Avez vous déjà un compte ?</small>
              </Link>
            </div>
          </Form>
        )}
      />
    </div>
  );
};

export default Register;
