/* eslint-disable */
import React from "react";
import { useAnimals } from "./useAnimals";

export default function App() {
  const { error, isLoading, animals } = useAnimals();

  const triggerError = () => {
    triggerScenario("error");
  };

  const triggerEmpty = () => {
    triggerScenario("empty");
  };

  const triggerLoading = () => {
    triggerScenario("loading");
  };

  const triggerSuccess = () => {
    triggerScenario(null);
  };

  const triggerScenario = (scenario) => {
    const url = scenario ? `/?${scenario}=true` : "/";
    window.history.replaceState({}, "", url);
    window.location.reload();
  };

  const renderStatus = () => {
    // Loading
    if (isLoading) {
      return (
        <p>
          Loading, please wait...⌛️ (psst, don't bother waiting, it'll never
          resolve!)
        </p>
      );
    }

    // Error
    if (error && error.message) {
      return (
        <div>
          <p>
            😢 Error response: <code>{error.message}</code>
          </p>
        </div>
      );
    }

    // Empty
    if (animals && animals.length === 0) {
      return (
        <span>
          📭 Empty response: <code>{JSON.stringify(animals)}</code>
        </span>
      );
    }

    // Success
    if (animals && animals.length > 0) {
      return (
        <span>
          ✅ Successful response: <code>{JSON.stringify(animals)}</code>
        </span>
      );
    }

    return null;
  };

  return (
    <div className="App">
      <h1>Examples for mocking error, empty and loading states in MSW:</h1>

      {renderStatus()}

      <br />
      <br />
      <div>
        <button onClick={triggerError}>Trigger error</button>&nbsp;
        <button onClick={triggerEmpty}>Trigger empty</button>&nbsp;
        <button onClick={triggerLoading}>Trigger loading</button>&nbsp;
        <button onClick={triggerSuccess}>Trigger success</button>&nbsp;
      </div>
    </div>
  );
}
