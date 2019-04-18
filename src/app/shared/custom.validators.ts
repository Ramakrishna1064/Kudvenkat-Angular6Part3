import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  static emailDomain(domainName: string) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email: string = control.value;
      if (email.lastIndexOf('@') != -1) {
        const domain = email.substring(email.lastIndexOf('@') + 1);
        if ((domain.length == 0 || domain === domainName)) {
          return null;
        } else {
          return { 'emailDomain': true };
        }
      } else {
        return null;
      }
    };
  }
}
