import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState<String>("Fabien");

  return (
    <div className="App">
      <p>hello {name} !</p>
    </div>
  );
}

export default App;
