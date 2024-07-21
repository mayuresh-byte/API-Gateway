import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('SERVICE_A') private readonly clientServiceA: ClientProxy,
    @Inject('SERVICE_B') private readonly clientServiceB: ClientProxy,
  ) { }

  pingServiceA() {
    const startTs = Date.now();
    return this.clientServiceA.send({cmd: 'ping'}, {}).pipe(
      map((message: string) => ({ message, duration: Date.now() - startTs })),
    );
  }

  pingServiceB() {
    const startTs = Date.now();
    return this.clientServiceA.send({cmd: 'ping'}, {}).pipe(
      map((message: string) => ({ message, duration: Date.now() - startTs })),
    );
  }
}
