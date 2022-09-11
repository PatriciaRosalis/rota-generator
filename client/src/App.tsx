import { useEffect, useState } from "react";
import { Table } from "./components/Tables";
import "./App.css";

type Day = Engineers[];
type Engineers = {
  firstName: string;
  totalShifts: number;
  id: number;
};

function App() {
  const [engineers, setEngineers] = useState<Day[]>();
  const [activeTab, setActiveTab] = useState("week-one");

  const getAllEngineers = async () => {
    try {
      const res = await fetch("http://localhost:5000/rota");
      const data = await res.json();
      setEngineers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllEngineers();
  }, []);

  if (!engineers) {
    return <h1>Loading...</h1>;
  }

  //Divide the enginners[] in 2 weeks
  const half = Math.ceil(engineers.length / 2);
  const firstWeek = engineers.slice(0, half);
  const secondWeek = engineers.slice(half);

  const handleTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="Home-container">
      <nav>
        <h1>Rota Generator</h1>
        <button onClick={getAllEngineers}>Generate New Enginners</button>
      </nav>

      <div className="tab-container">
        <div className="tab">
          <button
            className={activeTab === "week-one" ? "active" : ""}
            onClick={() => handleTab('week-one')}
          >
            This Week
          </button>
          <button
            className={activeTab === "week-two" ? "active" : ""}
            onClick={() => handleTab('week-two')}
          >
            Next Week
          </button>
        </div>
      </div>

      {activeTab === "week-one" ? (
        <Table week={firstWeek} title='week-one' />
      ) : (
        <Table week={secondWeek}  title='week-two' />
      )}
    </div>
  );
}

export default App;
