/**
 * @author SkyCodr (aka: Dulan Sudasinghe)
 * @description Show/render error messages if opt-in.
 */

import { ERRORS, LogicErrors } from '@fixtures';
import { FC } from 'react';

import '@assets/index.css';

type ErrorProps = { errors: LogicErrors[] };

/**
 * Renders the given validation errors as a styled list. The `trd-error-list*`
 * classes are the public styling hooks - override them in your own CSS to
 * customize the look.
 */
const Errors: FC<ErrorProps> = ({ errors }) => (
  <ol className="trd-error-list my-3 list-none space-y-1.5 rounded-lg border border-red-200 bg-red-50 p-4 shadow-sm">
    {errors.map((error, index) => (
      <li className="trd-error-list__item flex items-start gap-2" key={`${error}-${index}`}>
        <svg
          className="trd-error-list__icon mt-0.5 h-4 w-4 shrink-0 text-red-500"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            clipRule="evenodd"
          />
        </svg>
        <i className="trd-error-list__item--text not-italic text-sm leading-5 text-red-700">{ERRORS[error]}</i>
      </li>
    ))}
  </ol>
);

export default Errors;
