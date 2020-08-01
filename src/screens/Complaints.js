import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import * as service from "../services/TreatServices";
import NavBarAdmin from "../components/NavBarAdmin";
import * as serve from "../services/id";
const Complaints = () => {
  let data = service.displayarray();
  let id = serve.idgetit();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    id.then((value) => {
      setIdx(value + 1);
    });
  }, []);
  let datax = [{ code: "code", libelle: "libelle", quantite: 1 }];
  const [state, setState] = useState({
    columns: [
      { title: "ID", field: "id" },
      { title: "Email", field: "email" },

      { title: "Probleme de Core", field: "core" },
      { title: "Probleme d'Energie", field: "energie" },
      { title: "Probleme d'Environnement", field: "environnement" },
      { title: "Probleme de Securite", field: "securite" },
      { title: "Description", field: "description" },
      { title: "Traité", field: "traite" },
      { title: "Materiel utilise", field: "lotderechange" },

      { title: "ImageUrl", field: "imageUrl" },
      { title: "Date", field: "daterec" },
      { title: "Temps", field: "timerec" },
    ],
    data,
  });
  const [visible, setvisible] = useState(true);
  const click = () => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        setState((prevState) => {
          const data = [...prevState.data];
          data.push(datax);

          return { ...prevState, data };
        });
      }, 600);
    });
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        setState((prevState) => {
          const data = [...prevState.data];
          data.splice(data.indexOf(datax), 1);

          return { ...prevState, data };
        });
      }, 600);
    });
    setvisible(!visible);
  };
  return (
    <div>
      <NavBarAdmin />
      {visible ? (
        <button className="buttonss" onClick={click}>
          Cliquez ici pour voir la liste des reclamations, s'il vous plaît!
        </button>
      ) : (
        <MaterialTable
          title="La liste des reclamations"
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.push(newData);
                    service.addComp(newData, idx);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      service.updateComp(newData, oldData);
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),

            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    service.deleteComp(oldData);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
        />
      )}
    </div>
  );
};
export default Complaints;
