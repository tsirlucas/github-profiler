import {store} from '../../store';
import {changeRoute} from './router.actions';

export const dispatchChangeRoute = path => store.dispatch(changeRoute(path));
