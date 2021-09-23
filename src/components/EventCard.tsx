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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="grid gap-y-2">
        <div>
          <div className="grid gap-x-2 auto-1fr">
            <ChipIcon className="h-5 w-5 text-red-400" />
            <h4>
              <b>Event:</b>
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
        <div>
          <p>
            <b>User:</b> @{login}
          </p>
          <a href={`${baseUrl}/${repo.name}`} target="_blank" rel="noopener">
            <b>Repo:</b> {repo.name}
          </a>
        </div>
        <div>
          {Array.isArray(commits) ? (
            <>
              <div className="grid gap-x-2 auto-1fr">
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
                        rel="noopener"
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
