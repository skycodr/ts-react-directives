import { FC } from 'react';
import { ERRORS, LogicErrors } from '@fixtures';

import '@assets/index.css';

const Errors: FC<{ errors: LogicErrors[] }> = ({ errors }) => (
  <ol className="error-list">
    {errors.map((error, index) => (
      <li key={`${error}-${index}`}>{ERRORS[error]}</li>
    ))}
  </ol>
);

export default Errors;
