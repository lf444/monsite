import React, { FunctionComponent, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import Personne from "../models/personne";
import PersonneForm from "../components/personne-form";
import PersonneService from '../services/personne-service';
import Loader from "../components/loader";

type Params = { id: string };

const PersonneEdit: FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  const [personne, setPersonne] = useState<Personne | null>(null);

  useEffect(() => {
    PersonneService.getPersonne(+match.params.id).then(personne => setPersonne(personne));
  }, [match.params.id]);

  return (
    <div>
      {personne ? (
        <div className="row">
          <h2 className="header center">Éditer </h2>
          <PersonneForm personne={personne} isEditForm={true}></PersonneForm>
        </div>
      ) : (
        <h4 className="center"><Loader/></h4>
      )}
    </div>
  );
};

export default PersonneEdit;
