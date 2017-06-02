import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let sensors = [
      {name: 'NombreSensor 1', location: [0.623669, 41.598650],
    temperature: 30.1, humidity: 18.1},
      {name: 'NombreSensor 2', location: [0.625674, 41.598177], 
    temperature: 30.2, humidity: 18.2},
      {name: 'NombreSensor 3', location: [0.625267, 41.596560],
    temperature: 30.3, humidity: 18.3},
      {name: 'NombreSensor 4', location: [0.622728, 41.597093],
    temperature: 30.4, humidity: 18.4}
    ];
    return {sensors};
  }
}