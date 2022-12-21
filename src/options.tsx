import "./style.css";
import React, { PropsWithChildren, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { defaultTemplate1, defaultTemplate2 } from "./template";
import { Button } from "./Button";

const FormGroup: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="space-y-2">{children}</div>;
};

const Options = () => {
  const [template1, setTemplate1] = useState<string>("");
  const [template2, setTemplate2] = useState<string>("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    chrome.storage.sync.get(
      {
        template1: defaultTemplate1,
        template2: defaultTemplate2,
      },
      (items) => {
        setTemplate1(items.template1);
        setTemplate2(items.template2);
      }
    );
  }, []);

  const saveOptions = () => {
    // Saves options to chrome.storage.sync.
    chrome.storage.sync.set(
      {
        template1,
        template2,
      },
      () => {
        // Update status to let user know options were saved.
        setStatus("Options saved.");
        const id = setTimeout(() => {
          setStatus("");
        }, 1000);
        return () => clearTimeout(id);
      }
    );
  };

  const resetOptions = () => {
    chrome.storage.sync.set(
      {
        template1: defaultTemplate1,
        template2: defaultTemplate2,
      },
      () => {
        setTemplate1(defaultTemplate1);
        setTemplate2(defaultTemplate2);
        // Update status to let user know options were saved.
        setStatus("Options reset.");
        const id = setTimeout(() => {
          setStatus("");
        }, 1000);
        return () => clearTimeout(id);
      }
    );
  };

  return (
    <div className="p-4 w-[800px]">
      <div className="w-full space-y-2">
        <FormGroup>
          <div>
            <label>Template1</label>
          </div>
          <div>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-double focus:shadow-outline"
              rows={10}
              value={template1}
              onChange={(event) => setTemplate1(event.target.value)}
            />
          </div>
        </FormGroup>
        <FormGroup>
          <div>
            <label>Template2</label>
          </div>
          <div>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-double focus:shadow-outline"
              rows={10}
              value={template2}
              onChange={(event) => setTemplate2(event.target.value)}
            />
          </div>
        </FormGroup>
        <div className="flex flex-row justify-between">
          <Button variant="secondary" onClick={resetOptions}>
            Reset
          </Button>
          <Button variant="primary" onClick={saveOptions}>
            Save
          </Button>
        </div>
        <div>{status}</div>
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
