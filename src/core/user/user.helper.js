import is from 'is_js';

import {getCurrentState} from '../../store';

export const isUserDefined = () => {
    let {user} = getCurrentState();
    return is.not.undefined(user.login) && is.not.empty(user.login);
};
