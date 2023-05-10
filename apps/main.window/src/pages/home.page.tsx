import { gameListenerApi } from "../api";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export const HomePage = () => {
  const [logs, setLogs] = useState<{ e: string; data: any; ts: Date }[]>([]);
  const pushLog = (log: { e: string; data: any }) => {
    setLogs((p) => p.concat({ ...log, ts: new Date() }));
  };
  useEffect(() => {
    const removeGameListener = gameListenerApi.onNewEvent((_, log) => {
      console.log(log);
      pushLog(log);
    });
    return removeGameListener;
  }, []);
  return (
    <div>
      <Helmet title="Event Listener" />

      <table>
        <thead>
          <tr>
            <th>event name</th>
            <th>event timestamp</th>
            <th>event data</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i}>
              <td>{log.e}</td>
              <td>{log.ts.toLocaleTimeString()}</td>
              <td>
                <pre>{JSON.stringify(log.data, null, 2)}</pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
