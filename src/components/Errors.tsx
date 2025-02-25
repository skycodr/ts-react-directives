import { FC } from 'react';
import { ERRORS, LogicErrors } from '@fixtures';

import '@assets/index.css';

type ErrorProps = { errors: LogicErrors[] };

const Errors: FC<ErrorProps> = ({ errors }) => (
  <ol className="trd-error-list">
    {errors.map((error, index) => (
      <li key={`${error}-${index}`}>{ERRORS[error]}</li>
    ))}
  </ol>
);

export default Errors;
