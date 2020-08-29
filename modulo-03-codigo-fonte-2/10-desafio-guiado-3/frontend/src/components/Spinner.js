import React from 'react';
import css from './spinner.module.css';

export default function Spinner() {
  return (
    <div className={css.flexRow}>
      <div className="col s12 center">
        <div className="preloader-wrapper active">
          <div className="spinner-layer spinner-green-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
