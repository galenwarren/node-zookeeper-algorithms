import { Observable } from 'rxjs';
import EventEmitter from 'events';

import {
  observeConnectedLeaderState,
  observeLeaderState
} from '../src/leader';

describe('observeConnectedLeaderState', () => {

  const clientStateEmitter = new EventEmitter();
  const clientState$ = Observable.fromEvent(clientStateEmitter, 'state');

  const handlers = {
    next: sandbox.stub(),
    error: sandbox.stub(),
    complete: sandbox.stub()
  };

  const client = {
    mkdirp: sandbox.stub().yields(),
    getChildren: sandbox.stub(),
  };

  it('should', async () => {

    const lockState$ = observeLockState(clientState$, '/test', 'client1');
    lockState$.subscribe(handlers.next, handlers.error, handlers.complete);

    client.getChildren.yieldsWith(null, []);

    clientStateEmitter.emit('state', { client, connected: true, readonly: false });

    handlers.next.should.have.been.calledOnce.calledWith();

  });

});
