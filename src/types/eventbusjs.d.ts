declare module 'eventbusjs' {
  interface EventBus {
    addEventListener(eventType: string, listener: (event: any) => void): void;
    dispatch(eventType: string, data: any): void;
  }

  const EventBus: EventBus;
  export default EventBus;
}