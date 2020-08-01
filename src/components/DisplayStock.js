import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import * as service from "../services/Stockservices";
const Displaystock = () => {
  let data = service.displayarray();
  let datax = [{ code: "sdfs", libelle: "sfsdf", quantite: 50 }];
  const [state, setState] = useState({
    columns: [
      { title: "code", field: "code" },
      { title: "libelle", field: "libelle" },
      { title: "quantite", field: "quantite", type: "numeric" },
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
      {visible ? (
        <button className="buttonss" onClick={click}>
          Cliquez ici pour voir le lot de rechange , s'il vous plaît!
        </button>
      ) : (
        <MaterialTable
          title="Le stock"
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
                    service.addStock(newData);
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
                      service.updateStock(newData, oldData);
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
                    service.deleteStock(oldData);
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
export default Displaystock;
