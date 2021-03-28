import React, { FunctionComponent, useState } from "react";
import Personne from "../models/personne";
import { useHistory } from "react-router-dom";
import PersonneService from "../services/personne-service";

type Props = {
  personne: Personne;
  isEditForm:boolean;
};

type Field = {
  value?: any;
  error?: string;
  isValid?: boolean;
};

type Form = {
  nom: Field;
  prenom: Field;
  ville: Field;
  ennemies: Field;
};

const PersonneForm: FunctionComponent<Props> = ({ personne,isEditForm }) => {
  const [form, setForm] = useState<Form>({
    nom: { value: personne.nom, isValid: true },
    prenom: { value: personne.prenom, isValid: true },
    ville: { value: personne.ville, isValid: true },
    ennemies: { value: personne.ennemies, isValid: true },
  });

  const ennemies: string[] = [
    "Chacal",
    "Agony",
    "Boomerang",
    "Apocalypse",
    "Benzema",
  ];

  const history = useHistory();

  const hasEnnemie = (ennemie: string): boolean => {
    return form.ennemies.value.includes(ennemie);
  };

  const selectEnnemie = (
    ennemie: string,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const checked = e.target.checked;
    let newField: Field;

    if (checked) {
      // Si l'utilisateur coche  à l'ajoute à la liste

      const newEnnemies: string[] = form.ennemies.value.concat([ennemie]);
      newField = { value: newEnnemies };
    } else {
      // Si l'utilisateur décoche on le retire de la liste
      const newEnnemies: string[] = form.ennemies.value.filter(
        (currentEnnemie: string) => currentEnnemie !== ennemie
      );
      newField = { value: newEnnemies };
    }

    setForm({ ...form, ...{ types: newField } });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue } };
    setForm({ ...form, ...newField });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      personne.nom = form.nom.value;
      personne.prenom = form.prenom.value;
      personne.ville = form.ville.value;
      personne.ennemies = form.ennemies.value;

      if(isEditForm){
      PersonneService.updatePersonne(personne).then(() =>
        history.push(`/personnes/${personne.id}`)
      );
    }else{
        PersonneService.addPersonne(personne).then(() =>
        history.push(`/personnes`))
      }
    }
  };
  // eslint-disable-next-line
  const isAddForm=():boolean =>{
    return !isEditForm;
  }

  const validateForm = () => {
    let newForm: Form = form;
    //Validator url

    // Validator nom
    if (!/^[a-zA-Zàéè ]{3,25}$/.test(form.nom.value)) {
      const errorMsg: string = "Le nom est requis (1-25).";
      const newField: Field = {
        value: form.nom.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ nom: newField } };
    } else {
      const newField: Field = {
        value: form.nom.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ nom: newField } };
    }

    // Validator prenom
    if (!/^[a-zA-Zàéè ]{3,25}$/.test(form.prenom.value)) {
      const errorMsg: string = "Le prenom est requis (1-25).";
      const newField: Field = {
        value: form.prenom.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ prenom: newField } };
    } else {
      const newField: Field = {
        value: form.prenom.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ prenom: newField } };
    }

    // Validator ville
    if (!/^[a-zA-Zàéè ]{3,50}$/.test(form.ville.value)) {
      const errorMsg: string = "Le nom de la ville est requise (1-50).";
      const newField: Field = {
        value: form.ville.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ ville: newField } };
    } else {
      const newField: Field = {
        value: form.ville.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ ville: newField } };
    }

    setForm(newForm);
    return (
      newForm.nom.isValid && newForm.prenom.isValid && newForm.ville.isValid
    );
  };

  const isTypesValid = (ennemie: string): boolean => {
    // Cas n°1: La personne a un seul ennemie, qui correspond a l'ennemie passé en paramètre.
    // Dans ce cas on revoie false, car l'utilisateur ne doit pas pouvoir décoché
    if (form.ennemies.value.length === 1 && hasEnnemie(ennemie)) {
      return false;
    }

    // Cas n°1: La personne a au moins 3 ennemie.
    // Dans ce cas il faut empêcher à l'utilisateur de cocher un nouveau type, mais pas de décocher les ennemie existants.
    if (form.ennemies.value.length >= 3 && !hasEnnemie(ennemie)) {
      return false;
    }

    return true;
  };

  const deletePersonne = () =>{
    PersonneService.deletePersonne(personne).then(()=> history.push(`/personnes`));
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            <span className="btn-floating halfway-fab waves-effect waves-light">
              <i onClick={()=> deletePersonne()}  className="material-icons"> X </i>
            </span>
            <div className="card-stacked">
              <div className="card-content">
                <div className="form-group">
                  <label htmlFor="nom">Nom</label>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    className="form-control"
                    value={form.nom.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {form.nom.error && (
                    <div className="card-panel red accent-1">
                      {form.nom.error}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="prenom">Prenom</label>
                  <input
                    id="prenom"
                    name="prenom"
                    type="text"
                    className="form-control"
                    value={form.prenom.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {form.prenom.error && (
                    <div className="card-panel red accent-1">
                      {form.prenom.error}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="ville">Ville</label>
                  <input
                    id="ville"
                    type="text"
                    name="ville"
                    className="form-control"
                    value={form.ville.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {form.ville.error && (
                    <div className="card-panel red accent-1">
                      {form.ville.error}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Ennemies</label>
                  {ennemies.map((ennemie) => (
                    <div key={ennemie} style={{ marginBottom: "10px" }}>
                      <label>
                        <input
                          id={ennemie}
                          name="ennemies"
                          type="checkbox"
                          className="filled-in"
                          value={ennemie}
                          checked={hasEnnemie(ennemie)}
                          disabled={!isTypesValid(ennemie)}
                          onChange={(e) => selectEnnemie(ennemie, e)}
                        ></input>
                        <span>
                          <p className={ennemie}>{ennemie}</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                <button type="submit" className="btn">
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PersonneForm;
