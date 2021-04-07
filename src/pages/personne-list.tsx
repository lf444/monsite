import  React, { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PersonneCard from "../components/personne-card";
import Personne from "../models/personne";
import PersonneService from '../services/personne-service';
import PersonneSearch from '../components/personne-search';

const PersonneList: FunctionComponent = () => {
  const [personnes, setPersonnes] = useState<Personne[]>([]);

  useEffect(() => {
    PersonneService.getPersonnes().then(personnes => setPersonnes(personnes))
  }, []);
  
  return (
    <div>
      <h1 className="center">Liste de personne</h1>
      <div className="container">
        <div className="row">
          <PersonneSearch/>
          {personnes.map((personne) => (
            <PersonneCard key={personne.id} personne={personne}/>
          ))}
        </div>
        <Link className="btn-floating btn-large waves-effect waves-light red z-depht-3"
        style={{position:'fixed',bottom:'25px',right:'25px'}}
        to="/personne/add"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>

    </div>
  );
};

export default PersonneList;
