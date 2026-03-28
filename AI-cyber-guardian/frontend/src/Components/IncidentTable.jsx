import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

import { getIncidents, setAuthToken } from "../services/api";

const IncidentTable = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getToken } = useAuth();

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const token = await getToken();
        setAuthToken(token); // 🔐 Attach token

        const response = await getIncidents();
        setIncidents(response.data);

      } catch (error) {
        console.error("Error fetching incidents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  if (loading) {
    return <p>Loading incidents...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <table border="1" cellPadding="10" width="100%">
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
          {incidents.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No incidents found
              </td>
            </tr>
          ) : (
            incidents.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.email_content}</td>
                <td>{item.risk_score}</td>
                <td>{item.threat_level}</td>
                <td>{item.department}</td>
                <td>
                  {new Date(item.created_at).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentTable;