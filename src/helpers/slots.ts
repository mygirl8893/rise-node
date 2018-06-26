import { inject, injectable } from 'inversify';
import { ISlots } from '../ioc/interfaces/helpers/ISlots';
import { Symbols } from '../ioc/symbols';
import constantsType from './constants';

/**
 * Helper for to calculate slots from epoch time and vice-versa
 */
@injectable()
export class Slots implements ISlots {
  @inject(Symbols.helpers.constants)
  private constants: typeof constantsType;

  /**
   * Active delegates
   */
  public get delegates() {
    return this.constants.activeDelegates;
  }

  /**
   * Slot interval in seconds
   */
  private get interval() {
    return this.constants.blockTime;
  }

  /**
   * Calculates time since epoch.
   */
  public getTime(time: number = Date.now()) {
    const t = this.constants.epochTime.getTime();
    return Math.floor((time - t) / 1000);
  }

  /**
   * Calculates slot number from epoch time
   */
  public getSlotNumber(epochTime: number = this.getTime()) {
    return Math.floor(epochTime / this.interval);
  }

  /**
   * Calculates time from a slot number
   */
  public getSlotTime(slot: number) {
    return slot * this.interval;
  }

  /**
   * Basically adds the given slot number with the number of forging delegates
   */
  public getLastSlot(nextSlot: number) {
    return nextSlot + this.delegates;
  }

}
