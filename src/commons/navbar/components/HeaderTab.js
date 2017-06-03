import {h} from 'preact';

import {dispatchChangeRoute} from '../../../core/router/router.service';

export default ({path, currentPath, label}) => (
    <a onClick={() => dispatchChangeRoute(path)}
       active={currentPath === path}
       className={`mdl-layout__tab ${currentPath === path ? 'mdl-layout__tab--active is-active' : ''}`}>{label}</a>
)
