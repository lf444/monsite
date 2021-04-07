import React, { FunctionComponent } from "react";
import "./personne-card.css";
import { jsPDF } from "jspdf";
import { Button, Paper } from "@material-ui/core";
import formatDate from "../helpers/format-date";
import Personne from "../models/personne";

type Props = {
  //form: HTMLElement |Element;
  personne : Personne
};

const PrinterComponent: FunctionComponent<Props> = ({personne }) => {
  const print = (): any => {
    let y = document.getElementById("test");
    const pdf = new jsPDF("p", "mm", "a4");
    if (y) {
      pdf.html(y, {
        callback: function (pdf) {
          pdf.save("test.pdf");
        },
      });
    }
  };

  return (

    <div>
    <Paper
    className="col s6 m4"
    id="test"
    >
     <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <p>{personne.nom}</p>
            <p>{personne.prenom}</p>
            <p>{personne.ville}</p>
            <p> 
              <small>{formatDate(personne.dateDeNaissance)}</small>
            </p>
          </div>
        </div>
      </div>
      </Paper>
      <div>
        <Button onClick={() => print()}>CLIQUER ICI </Button>
      </div>
      </div>
  
  );
};

export default PrinterComponent;
