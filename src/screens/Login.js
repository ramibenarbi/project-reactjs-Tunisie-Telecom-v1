import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import * as service from "../services/Authservices";

const Login = (props) => {
  const history = useHistory();
  return (
    <div className="divlogin">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Le courriel est invalide")
            .required("Ajouter votre Email !"),

          password: Yup.string()
            .min(6, "Le mot de passe doit être au moins de 6 caractères")
            .max(12, "Le mot de passe ne doit pas dépasser 12 caractères")
            .required("Ajouter votre mot de passe !"),
        })}
        onSubmit={(values) => {
          service.Login(values, history);
        }}
        render={({ errors, status, touched }) => (
          <Form class="modal-content animate">
            <label id="label">Login</label>

            {/* email */}
            <div id="left">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                type="text"
                className={
                  "form-control" +
                  (errors.email && touched.email ? " is-invalid" : "")
                }
                placeholder="Ecrire ton email..."
              />

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
                placeholder="Ecrire ton mot de passe..."
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div>
              <br />
              <button
                id="registrebutton"
                type="submit"
                onClick={props.handleLogin}
                className="btn btn-primary mr-2"
              >
                Login
              </button>

              <Link to="/Signup">
                <small id="right">vous n'avez pas encore de compte?</small>
              </Link>
            </div>
            <div id="left">
              <Link to="/ForgetPassword">
                <small>Mot de passe oublié ?</small>
              </Link>
            </div>
            <div>
              <small className="crimson" id="p1">
                {" "}
              </small>
            </div>
          </Form>
        )}
      />
    </div>
  );
};

export default Login;
