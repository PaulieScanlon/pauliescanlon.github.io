import { FunctionalComponent } from 'react';
// @ts-ignore
import Styles from './EventCard.module.css';

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
    <div className={`${Styles.card} ${Styles[type]}`}>
      <div className={Styles.cardBody}>
        <h4 className={Styles.cardHeading}>Event: {type}</h4>
        <small>{`${new Date(date).toLocaleDateString()} @${new Date(
          date
        ).toLocaleTimeString()}`}</small>
        <p>User: @{login}</p>
        <a
          href={`${baseUrl}/${repo.name}`}
          target="_blank"
          rel="noopener"
        >{`Repo: ${baseUrl}/${repo.name}`}</a>
        {Array.isArray(commits) ? (
          <>
            <p>Commits</p>
            <ul className={Styles.list}>
              {commits.map((commit, index) => (
                <li key={index}>
                  <a
                    href={`${baseUrl}/${repo.name}/commit/${commit.sha}`}
                    target="_blank"
                    rel="noopener"
                  >{`message: ${commit.message}`}</a>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default EventCard;
