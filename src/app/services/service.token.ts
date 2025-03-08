import { InjectionToken } from "@angular/core";
import { IClientService } from "./api-client/clients/iclients.service";
import { ISankBarManagerService } from "./isnackbar-manager.service";
import { IDialogManagerService } from "./idialog-manager.service";
import { IScheduleServiceService } from "./api-client/schedules/ischedules.service";

export const SERVICES_TOKEN = {
  HTTP: {
    CLIENT: new InjectionToken<IClientService>("SERVICE_TOKEN.HTTP.CLIENT"),
    SCHEDULE: new InjectionToken<IScheduleServiceService>("SERVICE_TOKEN.HTTP.SCHEDULE"),
  },
  SNACKBAR: new InjectionToken<ISankBarManagerService>("SERVICE_TOKEN.SNACKBAR"),
  DIALOG: new InjectionToken<IDialogManagerService>("SERVICE_TOKEN.DIALOG")
}
