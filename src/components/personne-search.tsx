import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import Personne from '../models/personne';
import PersonneService from '../services/personne-service';

const PersonneSearch: FunctionComponent = () => {
 
  const [term, setTerm] = useState<string>('');
  const [personnes, setPersonnes] = useState<Personne[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setTerm(term);

    if(term.length <= 1) {
      setPersonnes([]);
      return;
    }

    PersonneService.searchPersonne(term).then(personnes => setPersonnes(personnes));
  }
 
  return (
    <div className="row"> 
    <div className="col s12 m6 offset-m3"> 
      <div className="card"> 
      <div className="card-content"> 
        <div className="input-field"> 
        <input type="text" placeholder="Rechercher un pokémon" value={term} onChange={e => handleInputChange(e)} /> 
        </div> 
        <div className='collection'>
        {personnes.map((personne) => (
          <Link key={personne.id} to={`/Personnes/${personne.id}`} className="collection-item">
            {personne.nom}
          </Link>
        ))}
        </div> 
      </div> 
      </div> 
    </div> 
    </div>
  );
}
 
export default PersonneSearch;