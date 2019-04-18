import { AbstractControl } from '@angular/forms';
export class EmailConfirmEmailValidator {
  static emailConfirmEmailValidator(group: AbstractControl): { [key: string]: any | null } {
    const emailControl = group.get('email');
    const confirmEmailControl = group.get('confirmEmail');
    if (emailControl.value === confirmEmailControl.value ||
      (confirmEmailControl.pristine && confirmEmailControl.value === '')) {
      return null;
    } else {
      return { 'emailConfirmEmailValidator': true };
    }
  }
}
