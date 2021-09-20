import { FunctionalComponent } from 'react';
// @ts-ignore
import Styles from './EventCard.module.css';

interface Props {
  /** The type event */
  type: string;
  /** Github user login name */
  login: string;
  /** The name of the repo */
  name: string;
}

const baseUrl = 'https://github.com';

const EventCard: FunctionalComponent<Props> = ({ type, login, name }) => {
  return (
    <a
      className={`${Styles.card} ${Styles[type]}`}
      href={`${baseUrl}/${name}`}
      target="_blank"
      rel="noopener"
    >
      <div className={Styles.cardBody}>
        <h4 className={Styles.cardHeading}>{type}</h4>
        <p>{login}</p>
        <p className={Styles.cardUrl}>{`${baseUrl}/${name}`}</p>
      </div>
    </a>
  );
};

export default EventCard;
