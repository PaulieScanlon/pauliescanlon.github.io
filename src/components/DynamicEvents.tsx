import { FunctionalComponent, useEffect, useState } from 'react';

const DynamicEvents: FunctionalComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState(null);

  const getEvents = async () => {
    const response = await fetch(
      'https://paulieapi.gatsbyjs.io/api/get-github-events',
      {
        method: 'POST',
        body: JSON.stringify({
          username: 'GatsbyJs',
          results: 5
        })
      }
    );
    const data = await response.json();
    setIsLoading(false);
    setEvents(data.events);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <h2>DynamicEvents</h2>
      {isLoading ? (
        <div>Is loading</div>
      ) : (
        <pre
          style={{
            height: '200px',
            overflow: 'auto',
            backgroundColor: '#f7f7f7'
          }}
        >
          {JSON.stringify(events, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default DynamicEvents;
