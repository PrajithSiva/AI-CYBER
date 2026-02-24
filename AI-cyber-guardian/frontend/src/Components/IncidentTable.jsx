import { useEffect, useState } from "react";
import { getIncidents } from "../services/api";

const IncidentTable = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await getIncidents();
        setIncidents(response.data);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };

    fetchIncidents();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Incident Dashboard</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Risk Score</th>
            <th>Threat Level</th>
            <th>Department</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {incidents.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.email_content}</td>
              <td>{item.risk_score}</td>
              <td>{item.threat_level}</td>
              <td>{item.department}</td>
              <td>{new Date(item.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentTable;