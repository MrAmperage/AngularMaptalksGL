import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";

@Injectable({ providedIn: "root" })
export default abstract class BaseDataStoreService<ResponseType> {
  constructor(private http: HttpClient) {}
  protected abstract Url: string;
  private Data: ResponseType | undefined;
  private RequestPromise?: Promise<ResponseType>;
  Request(): Promise<ResponseType> {
    if (this.Data) {
      return Promise.resolve(this.Data);
    }

    if (this.RequestPromise) {
      return this.RequestPromise;
    }

    this.RequestPromise = lastValueFrom(this.http.get<ResponseType>(this.Url))
      .then((Response) => {
        this.Data = Response;
        return Response;
      })
      .catch((Error) => {
        this.RequestPromise = undefined;
        throw Error;
      });

    return this.RequestPromise;
  }
}
