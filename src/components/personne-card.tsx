import React, { FunctionComponent, useState } from "react";
import Personne from "../models/personne";
import "./personne-card.css";
import { useHistory } from "react-router-dom";
import PrinterComponent from "./printer-component";
import formatDate from "../helpers/format-date";
import { Paper } from "@material-ui/core";
import Loader from "./loader";

type Props = {
  personne: Personne;
  borderColor?: string;
};

const PersonneCard: FunctionComponent<Props> = ({
  personne,
  borderColor = "#009688",
}):JSX.Element => {
  const [color, setColor] = useState<string>();

  const history = useHistory();
  // eslint-disable-next-line
  const showBorder = () => {
    setColor(borderColor);
  };
  // eslint-disable-next-line
  const hideBorder = () => {
    setColor("#f5f5f5");
  };
  // eslint-disable-next-line
  const goToPersonne = (id: number) => {
    history.push(`/personnes/${id}`);
  };
  // eslint-disable-next-line

  return (
    <div>
      <Paper className="col s6 m4" id="test">
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
        <PrinterComponent Template={<Loader/>}/>
      </div>
    </div>
  );
};

export default PersonneCard;
