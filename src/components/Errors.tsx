import { ERRORS, LogicErrors } from '@fixtures';
import { FC } from 'react';

import '@assets/index.css';

type ErrorProps = { errors: LogicErrors[] };

const Errors: FC<ErrorProps> = ({ errors }) => (
  <ol className="trd-error-list">
    {errors.map((error, index) => (
      <li className="trd-error-list__item" key={`${error}-${index}`}>
        <i className="trd-error-list__item--text">{ERRORS[error]}</i>
      </li>
    ))}
  </ol>
);

export default Errors;
