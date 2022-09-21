
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * @abstract Store
 * @property private estado
 */
export abstract class Store<T> {

    private state: BehaviorSubject<T>;

    constructor(state: T) {
        this.state = new BehaviorSubject(state);
    }


    /**
     * @method value
     * retorna el valor actual
     */
    get value(): T {
        return this.state.getValue();
    }

    /**
     * @method value$
     * retorna el permite observar el estado
     */
    get value$(): Observable<T> {
        return this.state.asObservable();
    }

    /**
     * @method dispatch
     * Cambia el estado de store
     * @param nextState T
     */
    protected dispatch(nextState: T): void {
        this.state.next(nextState);
    }
}
