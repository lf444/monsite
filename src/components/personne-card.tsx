import { FunctionComponent, useState } from "react";
import Personne from "../models/personne";
import "./personne-card.css";
import formatDate from '../helpers/format-date';
import {useHistory} from 'react-router-dom';

type Props = {
  personne: Personne;
  borderColor?: string;
};

const PersonneCard: FunctionComponent<Props> = ({
  personne,
  borderColor = "#009688",
}) => {
  const [color, setColor] = useState<string>();
  const history = useHistory();

  const showBorder = () => {
    setColor(borderColor);
  };

  const hideBorder = () => {
    setColor("#f5f5f5");
  };
  const goToPersonne=(id:number)=>{
    history.push(`/personnes/${id}`);
  }


  return (
    <div
      className="col s6 m4"
      onClick={()=>goToPersonne(personne.id)}
      onMouseEnter={showBorder}
      onMouseLeave={hideBorder}
    >
      <div className="card horizontal" style={{ borderColor: color }}>
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
    </div>
  );
};

export default PersonneCard;
