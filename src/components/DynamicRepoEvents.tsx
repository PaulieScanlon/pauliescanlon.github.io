import { FunctionalComponent, useEffect, useState } from 'react';
import { TerminalIcon } from '@heroicons/react/solid';

import EventCard from './EventCard';
import Loading from './Loading';

interface Props {
  /** The GitHub user name */
  username: string;
  /** The GitHub repository name */
  repoName: string;
  /** The amount of results to display */
  results?: number;
}

const DynamicRepoEvents: FunctionalComponent<Props> = ({
  username,
  repoName,
  results = 50
}) => {
  const [isEventsLoading, setIsEventsLoading] = useState(true);
  const [events, setEvents] = useState(null);
  const [isRepoLoading, setIsRepoLoading] = useState(true);
  const [repo, setRepo] = useState(null);

  const getEvents = async () => {
    const repoResponse = await fetch(
      'https://paulieapi.gatsbyjs.io/api/get-github-repo',
      {
        method: 'POST',
        body: JSON.stringify({
          owner: username,
          repo: repoName
        })
      }
    );

    const repoData = await repoResponse.json();
    setRepo(repoData.repo);
    setIsRepoLoading(false);

    const eventsResponse = await fetch(
      'https://paulieapi.gatsbyjs.io/api/get-github-repo-events',
      {
        method: 'POST',
        body: JSON.stringify({
          owner: username,
          repo: repoName,
          results: results
        })
      }
    );
    const eventsData = await eventsResponse.json();
    setEvents(eventsData.events);
    setIsEventsLoading(false);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <section
      className={`bg-white rounded-lg shadow-lg p-6 mb-10 ${repoName}-bg`}
    >
      {isRepoLoading ? (
        <Loading textClass="text-white" />
      ) : (
        <div className="grid auto-1fr items-center gap-2 mb-6">
          <img
            src={repo.owner.avatar_url}
            alt={`${repo.owner.login}-profile-image`}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full ring-white bg-white"
          />
          <div>
            <h2 className={`font-bold text-1xl sm:text-2xl ${repoName}-text`}>
              {repo.full_name}
            </h2>
            <p className={`text-gray-500 font-light ${repoName}-text`}>
              {repo.description}
            </p>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener"
              className={`${repoName}-text`}
            >
              {repo.html_url}
            </a>
          </div>
        </div>
      )}
      <div className="grid auto-1fr">
        <TerminalIcon className="h-5 w-5 text-white mt-0.5" />
        <h3 className={`mb-4 pl-1 ${repoName}-text`}>
          <b>Dynaimc Repo Events</b>
        </h3>
      </div>
      <article className="bg-secondary rounded-lg shadow-inner py-0.5">
        <div className="grid gap-6 p-6 overflow-auto h-96">
          {isEventsLoading ? (
            <Loading textClass="text-black" />
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
      </article>
    </section>
  );
};

export default DynamicRepoEvents;
