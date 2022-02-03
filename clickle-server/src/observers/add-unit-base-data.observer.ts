import {
  lifeCycleObserver,
  LifeCycleObserver
} from '@loopback/core';
import {repository} from '@loopback/repository';
import {initialUnitBaseData} from '../data';
import {UnitBaseRepository} from '../repositories';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('AddData')
export class AddUnitBaseDataObserver implements LifeCycleObserver {

  constructor(
    @repository('UnitBaseRepository') private unitBaseRepository: UnitBaseRepository
  ) { }


  /**
   * This method will be invoked when the application initializes. It will be
   * called at most once for a given application instance.
   */
  async init(): Promise<void> {
    // Add your logic for init
  }

  /**
   * This method will be invoked when the application starts.
   */
  async start(): Promise<void> {
    // Add your logic for start
    this.unitBaseRepository.createAll(initialUnitBaseData);
  }

  /**
   * This method will be invoked when the application stops.
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }
}
