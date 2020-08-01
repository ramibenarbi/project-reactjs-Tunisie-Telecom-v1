import React, { useEffect, useState } from "react";
import { Formik, FieldArray } from "formik";
import "../App.css";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom";
import NavBarTechnicien from "./NavBarTechnicien";
import { Form, Select, Textarea, DropZone, SubmitBtn } from "react-formik-ui";
import * as service from "../services/Complaintservices";
import * as serve from "../services/id";
const Addcomplaint = () => {
  const history = useHistory();
  let id = serve.idgetit();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    id.then((value) => {
      setIdx(value + 1);
    });
  }, []);

  const data = {
    core: [
      { value: "probleme de traffic", label: "probleme de traffic" },
      {
        value: "Autre",
        label: "Autre",
      },
    ],
    environnement: [
      {
        value: "haute temperature > 35°C",
        label: " haute temperature > 35°C",
      },
      {
        value: "Autre",
        label: "Autre",
      },
    ],
    securité: [
      {
        value: "probleme de camera de surveillance",
        label: "probleme de camera de surveillance",
      },
      {
        value: "Autre",
        label: "Autre",
      },
    ],
    energie: [
      { value: " coupure de Steg", label: " coupure de Steg" },
      {
        value: " Probleme du groupe electrogene",
        label: " Probleme du groupe electrogene",
      },
      { value: "defaillance alimentation", label: "defaillance alimentation" },
      {
        value: "Probleme de batterie accumulateur",
        label: "Probleme de batterie accumulateur",
      },
      {
        value: "Autre",
        label: "Autre",
      },
    ],
  };
  const buttonStyle = {
    cursor: "pointer",
    margin: "7px 3px 0px",
  };
  const onSubmit = (data) => {
    service.addComplaints(data, history, idx);
  };

  const getSchema2 = () => {
    return yup.object().shape({
      localisation: yup.string().required("Ajouter la localisation").nullable(),
      Description: yup
        .string()
        .required("ajouter les  informations concernant le probleme "),
    });
  };

  return (
    <div>
      <div className="sendcomplaint">
        <div class="modal-content animate">
          <Formik
            initialValues={{
              localisation: "",
              problemdecore: [],
              problemenergie: [],

              problemenvironnement: [],
              problemesecurite: [],
              Description: "",
              files2: [],
            }}
            validationSchema={getSchema2}
            onSubmit={onSubmit}
          >
            {({ values }) => (
              <Form mode="themed">
                <fieldset>
                  <legend id="label">Envoyer une reclamation</legend>

                  <Select
                    name="localisation"
                    label="Localisation"
                    placeholder="Choisir la localisation"
                    options={[
                      {
                        value: "Centrale Kairouan centre",
                        label: "Centrale Kairouan centre",
                      },
                      {
                        value: "Centrale Bouhajla",
                        label: "Centrale bouhajla",
                      },
                      {
                        value: "Centrale Hajeb layoun",
                        label: "Centrale Hajeb layoun",
                      },
                      { value: "Centrale Sbikha", label: "Centrale Sbikha" },
                    ]}
                    required
                  />

                  <FieldArray
                    name="typeproblems1"
                    render={(arrayHelpers) => (
                      <div>
                        {values.typeproblems1 &&
                        values.typeproblems1.length > 0 ? (
                          values.typeproblems1.map((problem, index) => (
                            <div
                              key={index}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Select
                                name={`problemdecore.${index}`}
                                label={`problemdecore ${index + 1}`}
                                options={data["core"]}
                                placeholder="Choisir la localisation"
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
                            {/* show this when user has removed all friends from the list */}
                            Ajouter un problème de core
                          </button>
                        )}
                        <div></div>
                      </div>
                    )}
                  />

                  <FieldArray
                    name="typeproblems2"
                    render={(arrayHelpers) => (
                      <div>
                        {values.typeproblems2 &&
                        values.typeproblems2.length > 0 ? (
                          values.typeproblems2.map((problem, index) => (
                            <div
                              key={index}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Select
                                name={`problemenergie.${index}`}
                                label={`problemenergie ${index + 1}`}
                                options={data["energie"]}
                                placeholder="Choisir la localisation"
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
                            {/* show this when user has removed all friends from the list */}
                            Ajouter un problème d'energie
                          </button>
                        )}
                        <div></div>
                      </div>
                    )}
                  />
                  <FieldArray
                    name="typeproblems3"
                    render={(arrayHelpers) => (
                      <div>
                        {values.typeproblems3 &&
                        values.typeproblems3.length > 0 ? (
                          values.typeproblems3.map((problem, index) => (
                            <div
                              key={index}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Select
                                name={`problemenvironnement.${index}`}
                                label={`probleme d'environnement ${index + 1}`}
                                options={data["environnement"]}
                                placeholder="Choisir la localisation"
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
                            {/* show this when user has removed all friends from the list */}
                            Ajouter un problème d'environnement
                          </button>
                        )}
                        <div></div>
                      </div>
                    )}
                  />
                  <FieldArray
                    name="typeproblems4"
                    render={(arrayHelpers) => (
                      <div>
                        {values.typeproblems4 &&
                        values.typeproblems4.length > 0 ? (
                          values.typeproblems4.map((problem, index) => (
                            <div
                              key={index}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Select
                                name={`problemesecurite.${index}`}
                                label={`probleme de securite ${index + 1}`}
                                options={data["securité"]}
                                placeholder="Choisir la localisation"
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
                            {/* show this when user has removed all friends from the list */}
                            Ajouter un problème de securite
                          </button>
                        )}
                        <div></div>
                      </div>
                    )}
                  />
                  <br />
                  <DropZone
                    multiple={false}
                    name="files2"
                    label="Téléchargement de fichier"
                    placeholder="Essayez de déposer quelques fichiers ici ou cliquez pour sélectionner les fichiers à télécharger."
                  />
                  <div style={{ padding: "0 10px" }}>
                    <Textarea
                      name="Description"
                      label="Description"
                      placeholder="Ecrire votre description"
                      required
                    />
                    <div id="sendcomplainbutton">
                      <SubmitBtn />
                    </div>
                  </div>
                </fieldset>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default Addcomplaint;
