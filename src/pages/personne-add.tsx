import { FunctionComponent, useState } from "react";
import Personne from "../models/personne";
import PersonneForm from "../components/personne-form";

const PersonneAdd: FunctionComponent=()=>{
  const [id] = useState<number>(new Date().getTime());
  const [personne] = useState<Personne>(new Personne(id,"","",new Date(),"",[]));

  return(
    <div className="row">
      <h2 className="header center">Ajouter</h2>
      <PersonneForm personne={personne} isEditForm={false}></PersonneForm>
    </div>
  )
}

export default PersonneAdd;
