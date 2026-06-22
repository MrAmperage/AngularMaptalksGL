import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";

/*Базовый сервис для подписки на SSE */
@Injectable({ providedIn: "root" })
export default abstract class BaseEventSourceService<TicketType> {
  constructor(private HttpClient: HttpClient) {}
  protected abstract Url: string;
  protected abstract TicketUrl: string;
  protected Ticket: string | undefined;
  private EventSource!: EventSource;

  async GetEventSource() {
    if (this.EventSource === undefined) {
      if (this.Ticket === undefined) {
        const TicketResponse = await this.RequestTicket();
        this.Ticket = this.ResponseToTicket(TicketResponse);
      }
      this.EventSource = new EventSource(
        this.GenerateUrl(this.Url, this.Ticket!),
      );
    }
    return this.EventSource;
  }
  abstract ResponseToTicket(Response: TicketType): string;

  RequestTicket() {
    return lastValueFrom(this.HttpClient.get<TicketType>(this.TicketUrl));
  }

  abstract GenerateUrl(Url: string, Ticket: string): string;
}
