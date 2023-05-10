import { setupApi } from "../api";
import { useState } from "react";

export const SetupPage = () => {
  const [url, setUrl] = useState("");

  return (
    <div id="app">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setupApi.openGame(url);
        }}
      >
        <h3>Setup</h3>
        <div className="form_item">
          <input
            name="url"
            type="text"
            placeholder="http(s)://"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="form_item">
          <button type="submit">Go</button>
        </div>
      </form>
    </div>
  );
};
