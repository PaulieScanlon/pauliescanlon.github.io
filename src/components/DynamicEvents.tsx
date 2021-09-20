import { FunctionalComponent, useEffect, useState } from 'react';

import EventCard from './EventCard';

interface Props {
  /** The GitHub user name */
  username: string;
  /** The amount of results to display */
  results: number;
}

const DynamicEvents: FunctionalComponent<Props> = ({
  username,
  results = 6
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState(null);

  const getEvents = async () => {
    const response = await fetch(
      'https://paulieapi.gatsbyjs.io/api/get-github-events',
      {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          results: results
        })
      }
    );
    const data = await response.json();
    setEvents(data.events);
    setIsLoading(false);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <h2>DynamicEvents | @{username}</h2>
      <pre>https://paulieapi.gatsbyjs.io/api/get-github-events</pre>
      <div className="card-grid">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {events.map((event, index) => {
              const { type, actor, created_at, repo, payload } = event;
              return (
                <EventCard
                  key={index}
                  type={type}
                  date={created_at}
                  login={actor.login}
                  repo={repo}
                  commits={payload.commits}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default DynamicEvents;
