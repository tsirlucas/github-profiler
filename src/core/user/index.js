import {map} from 'rxjs/add/operator/map';
import {of} from 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';
import {mergeMap} from 'rxjs/add/operator/mergeMap';
import {forkJoin} from 'rxjs/add/observable/forkJoin';
import {concatMap} from 'rxjs/add/operator/concatMap';
import {catch as gotcha} from 'rxjs/add/operator/catch';
import {finally as final} from 'rxjs/add/operator/finally';

export {concatMap, forkJoin, map, final, gotcha, of, Observable, mergeMap};
