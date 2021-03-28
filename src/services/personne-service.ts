import Personne from "../models/personne";
import PERSONNES from "../models/mock-personne";
  
export default class PersonneService {
  
  static personnes:Personne[] = PERSONNES;
  
  static isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
  
  static getPersonnes(): Promise<Personne[]> {
    if(this.isDev) {
      return fetch('http://localhost:3001/personnes')
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }
  
    return new Promise(resolve => {
      resolve(this.personnes);
    });
  }
  
  static getPersonne(id: number): Promise<Personne|null> {
    if(this.isDev) {
      return fetch(`http://localhost:3001/personnes/${id}`)
      .then(response => response.json())
      .then(data => this.isEmpty(data) ? null : data)
      .catch(error => this.handleError(error));
    }
  
    return new Promise(resolve => {    
      resolve(this.personnes.find(personne => id === personne.id)!);
    }); 
  }
  static updatePersonne(personne: Personne): Promise<Personne> {
    if(this.isDev) {
      return fetch(`http://localhost:3001/personnes/${personne.id}`, {
        method: 'PUT',
        body: JSON.stringify(personne),
        headers: { 'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }
  
    return new Promise(resolve => {
      const { id } = personne;
      const index = this.personnes.findIndex(personne => personne.id === id);
      this.personnes[index] = personne;
      resolve(personne);
    }); 
  }
  
  static deletePersonne(personne: Personne): Promise<{}> {
    if(this.isDev) {
      return fetch(`http://localhost:3001/personnes/${personne.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }
  
    return new Promise(resolve => {    
      const { id } = personne;
      this.personnes = this.personnes.filter(personne => personne.id !== id);
      resolve({});
    }); 
  }
  
  static addPersonne(personne: Personne): Promise<Personne> {
    personne.dateDeNaissance = new Date(personne.dateDeNaissance);
  
    if(this.isDev) {
      return fetch(`http://localhost:3001/personnes`, {
        method: 'POST',
        body: JSON.stringify(personne),
        headers: { 'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }
  
    return new Promise(resolve => {    
      this.personnes.push(personne);
      resolve(personne);
    }); 
  }
  
  static searchPersonne(term: string): Promise<Personne[]> {
    if(this.isDev) {
      return fetch(`http://localhost:3001/personnes?q=${term}`)
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }
  
    return new Promise(resolve => {    
      const results = this.personnes.filter(personne => personne.nom.includes(term));
      resolve(results);
    });
  
  }
  
  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }
  
  static handleError(error: Error): void {
    console.error(error);
  }
}