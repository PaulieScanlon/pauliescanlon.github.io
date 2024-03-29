import { FunctionalComponent } from 'react';
import { ChipIcon, ChatAltIcon } from '@heroicons/react/solid';

interface Props {
  /** The type event */
  type: string;
  /** Github user login name */
  login: string;
  /** The date the event occoured */
  date: string;
  /** The name of the repo */
  repo: any;
  /** The commit messages */
  commits: any | undefined;
}

const baseUrl = 'https://github.com';

const EventCard: FunctionalComponent<Props> = ({
  type,
  login,
  date,
  repo,
  commits
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="grid gap-y-2">
        <div>
          <div className="grid gap-x-2 sm:grid-cols-auto1fr">
            <ChipIcon className="h-5 w-5 text-red-400" />
            <h4 className="text-sm ml-1">
              <span className="font-bold">Event:</span>
              <span className={`ml-1 p-1 rounded-lg text-xs ${type}`}>
                {type}
              </span>
            </h4>
          </div>
          <small className="text-gray-500 font-light">
            {`${new Date(date).toLocaleDateString()} @${new Date(
              date
            ).toLocaleTimeString()}`}
          </small>
        </div>
        <div className="grid sm:grid-cols-auto1fr items-center gap-1">
          <b>User:</b>
          <p>@{login}</p>
        </div>
        <div className="grid sm:grid-cols-auto1fr items-center gap-1">
          <b>Repo:</b>
          <a
            className="text-xs underline break-all"
            href={`${baseUrl}/${repo.name}`}
            target="_blank"
            rel="noreferrer"
          >
            {repo.name}
          </a>
        </div>
        <div>
          {Array.isArray(commits) ? (
            <>
              <div className="grid gap-x-2 grid-cols-auto1fr">
                <ChatAltIcon className="h-5 w-5 text-red-400" />
                <p>
                  <b>Commits</b>
                </p>
              </div>
              <ul className="list-disc list-inside pl-3">
                {commits.map((commit, index) => (
                  <li key={index}>
                    <small className="text-gray-500 font-light">
                      <a
                        className="break-all"
                        href={`${baseUrl}/${repo.name}/commit/${commit.sha}`}
                        target="_blank"
                        rel="noreferrer"
                      >{`message: ${commit.message}`}</a>
                    </small>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
