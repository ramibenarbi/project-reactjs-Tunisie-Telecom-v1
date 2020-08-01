import React, { useEffect, useState } from "react";
import { Formik, FieldArray } from "formik";
import "../App.css";
import * as yup from "yup";
import * as serve from "../services/TreatServices";
import NavBarAdmin from "../components/NavBarAdmin";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  Select,
  Textarea,
  DropZone,
  SubmitBtn,
  Input,
} from "react-formik-ui";

const TreatComplaints = () => {
  const history = useHistory();
  let code = serve.getcode();
  const [codex, setcodex] = useState([]);

  useEffect(() => {
    code.then((value) => {
      setcodex(value);
    });
  }, []);
  const buttonStyle = {
    cursor: "pointer",
    margin: "7px 3px 0px",
  };
  const onSubmit = (data) => {
    serve.treatStock(data, history);
  };

  const getSchema2 = () => {
    return yup.object().shape({
      id: yup
        .number()
        .required("Ajouter l'Id de reclamation a traiter ")
        .min(1, "verifier cet ID")
        .nullable(),
    });
  };

  return (
    <div>
      <NavBarAdmin />
      <div className="divlogin">
        <div class="modal-content animate">
          <Formik
            initialValues={{
              id: "",
              lotderechange: [],
              quantite: [],
            }}
            validationSchema={getSchema2}
            onSubmit={onSubmit}
          >
            {({ values }) => (
              <Form mode="themed">
                <legend id="label">Traiter la reclamation</legend>

                <Input
                  name="id"
                  label="Ecrire l'ID de votre reclamation a traiter..."
                />
                <fieldset>
                  <FieldArray
                    name="materiels"
                    render={(arrayHelpers) => (
                      <div>
                        {values.materiels && values.materiels.length > 0 ? (
                          values.materiels.map((materiel, index) => (
                            <div
                              key={index}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Select
                                name={`lotderechange.${index}`}
                                label={`Lot de rechange ${index + 1}`}
                                options={codex}
                                placeholder="Choisir le lot de rechange"
                              />
                              <Input
                                name={`quantite.${index}`}
                                label="Ecrire la quantite..."
                              />
                              <div>
                                <button
                                  style={buttonStyle}
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                >
                                  -
                                </button>
                                <button
                                  style={buttonStyle}
                                  type="button"
                                  onClick={() => arrayHelpers.insert(index)} // insert an empty string at a position
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <button
                            type="button"
                            onClick={() => arrayHelpers.push("")}
                          >
                            Envoie de materiel avec l'equipe de maintenance
                          </button>
                        )}
                        <div></div>
                      </div>
                    )}
                  />

                  <SubmitBtn />
                </fieldset>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default TreatComplaints;
