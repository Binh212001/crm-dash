import { Request } from "express";
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import axios from "axios";
import multer from "multer";
import { Observable, from, map, switchMap } from "rxjs";

export interface BunnyUploadRes {
  storename: string;
  filename: string;
  url: string;
}

@Injectable()
export class BunnyUploadInterceptor implements NestInterceptor {
  private readonly multerInstance: any;

  constructor(
    private readonly storageZone = "crm-dash",
    private readonly apiKey = "38adf11e-738d-4e10-99e92f22ce14-4637-4534"
  ) {
    this.multerInstance = multer({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 20 * 1024 * 1024,
      },
    }).array("files");
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    return new Observable((observer) => {
      this.multerInstance(req, res, (err: any) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(req);
          observer.complete();
        }
      });
    }).pipe(
      switchMap(() => {
        const files: Express.Multer.File[] = req.files;

        if (!files || files.length === 0) {
          return next.handle(); // No files, proceed as usual
        }

        // Create upload tasks for each file
        const uploadTasks = files.map((file) => {
          const fileName = `${Date.now()}-${file.originalname}`;
          const uploadUrl = `https://crm-dash.b-cdn.net/${fileName}`;

          return from(
            axios.put(uploadUrl, file.buffer, {
              headers: {
                AccessKey: this.apiKey,
                "Content-Type": "application/octet-stream",
              },
            })
          ).pipe(
            map(
              () =>
                ({
                  storename: this.storageZone,
                  filename: fileName,
                  url: uploadUrl,
                } as BunnyUploadRes)
            )
          );
        });

        return from(
          Promise.all(uploadTasks.map((obs) => obs.toPromise()))
        ).pipe(
          map((uploadResponses: BunnyUploadRes[]) => {
            req.bunnyFile = uploadResponses;
            return req;
          }),
          switchMap(() => next.handle())
        );
      })
    );
  }
}
