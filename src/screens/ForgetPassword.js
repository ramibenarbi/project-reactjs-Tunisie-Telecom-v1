import React, { useCallback, useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import * as service from "../services/Authservices";

const ForgetPassword = () => {
  const history = useHistory();

  return (
    <div className="divlogin">
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Le courriel est invalide")
            .required("Ajouter votre Email !"),
        })}
        onSubmit={(values) => {
          service.resetpassword(values, history);
        }}
        render={({ errors, status, touched }) => (
          <Form class="modal-content animate">
            <label id="label">Changer votre mot de passe : </label>

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
                placeholder="Ecrire ton E-mail ..."
              />

              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div id="registrebutton">
              <br />
              <button type="submit" className="btn btn-primary mr-2">
                Rechercher
              </button>
              &nbsp;
              <Link to="/">
                <button type="submit" className="btn btn-primary mr-2">
                  Précédent
                </button>
              </Link>
            </div>
            <div className="form-group">
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

export default ForgetPassword;
