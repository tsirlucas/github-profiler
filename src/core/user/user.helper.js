import {getCurrentState} from '../../store';

export const isUserDefined = () => {
	const {user} = getCurrentState();
	return user.login && user.login.length > 0;
};
