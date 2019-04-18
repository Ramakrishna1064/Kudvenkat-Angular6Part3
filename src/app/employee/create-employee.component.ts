import { ISkill } from './../model/ISkill';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';
import { EmailConfirmEmailValidator } from '../shared/custom.email.confirm.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';
import { IEmployee } from '../model/IEmployee ';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  // This FormGroup contains fullName and Email form controls
  employeeForm: FormGroup;
  employee: IEmployee;

  formErrors = {
    'fullName': '',
    'email': '',
    'confirmEmail': '',
    'emailGroup': '',
    'phone': ''
  };

  // This object contains all the validation messages for this form
  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 10 characters.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Invali email Id',
      'emailDomain': 'Email domain should be ensis.com'
    },
    'confirmEmail': {
      'required': 'Confirm Email is required',
    },
    'emailGroup': {
      'emailConfirmEmailValidator': 'Email and confirm email must be same',
    },
    'phone': {
      'required': 'Phone number is required.',
      'minlength': 'Phone number must be 5 characters'
    }
  };

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private employeeService: EmployeeService, private navigateRoute: Router) {
  }
  // Initialise the FormGroup with the 2 FormControls we need.
  // ngOnInit ensures the FormGroup and it's form controls are
  // created when the component is initialised
  ngOnInit() {

    //Get parameters
    this.route.paramMap.subscribe(params => {
      const empId = +params.get('id');
      console.log('final id is--->' + empId);
      if(empId!=null && empId!=0){
      this.getEmployee(empId);
      }
    });

    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference: ['email'],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email, CustomValidators.emailDomain("ensis.com")]],
        confirmEmail: ['', [Validators.required]]
      }, { validator: EmailConfirmEmailValidator.emailConfirmEmailValidator }),
      phone: ['',],
      skills: this.fb.array([
        this.addSkillFormGroup()
      ])

    });

    // this.employeeForm.valueChanges.subscribe(value => {
    //   console.log(JSON.stringify(value));
    // })

    // this.employeeForm.get('fullName').valueChanges.subscribe(value => {
    //   console.log(value);
    // })

    this.employeeForm.valueChanges.subscribe(value => {
      this.logValidationErrorMessages(this.employeeForm);
    })

    this.employeeForm.get('contactPreference').valueChanges.subscribe((value: string) => {
      this.onContactPrefernceChange(value);
    });
  }

  onLoadDataClick(): void {
    //Set value property have to set all fields with our missing
    this.employeeForm.patchValue({
      fullName: 'Pragim Technologies',
      contactPreference: 'phone',
      phone: '8008824731',
      emailGroup: {
        email: 'ram@ensis.com',
        confirmEmail: 'ram@ensis.cm',
      }
    })
  }

  getAllKeyAndValues(): void {
    // this.logValidationErrorMessages(this.employeeForm);
    //console.log(this.formErrors);
    this.logKeyValuePairs(this.employeeForm);
  }

  onContactPrefernceChange(selectedValue: string) {
    const phoneFormControl = this.employeeForm.get('phone');
    if (selectedValue === 'phone') {
      phoneFormControl.setValidators([Validators.required, Validators.minLength(5)]);
    } else {
      phoneFormControl.clearValidators();
    }
    phoneFormControl.updateValueAndValidity();
  }


  /**
   * addSkillButtonClick
   */
  addSkillButtonClick(): void {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }

  /**
   * removeSkillButtonClick
   * @param skillGroupIndex 
   */
  removeSkillButtonClick(skillGroupIndex: number): void {
    const skillsFormArray = <FormArray>this.employeeForm.get('skills');
    skillsFormArray.removeAt(skillGroupIndex);
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();
  }

  /**
   * addSkillFormGroup
   */
  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', [Validators.required]],
      experienceInYears: ['', [Validators.required]],
      proficiency: ['', [Validators.required]]
    });
  }


  /**
   * logValidationErrorMessages
   * @param group 
   */
  logValidationErrorMessages(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstarctControler = group.get(key);
      this.formErrors[key] = '';
      //abstarctControler.markAsDirty();

      if (key === 'phone') {
        if (abstarctControler && abstarctControler.errors) {
          const message = this.validationMessages[key];
          for (const errorKey in abstarctControler.errors) {
            //console.log(abstarctControler.errors);
            this.formErrors[key] += message[errorKey] + ' ';
          }
        }

      } else {
        if (abstarctControler && !abstarctControler.valid &&
          (abstarctControler.touched || abstarctControler.dirty || abstarctControler.value !== '')) {
          const message = this.validationMessages[key];
          for (const errorKey in abstarctControler.errors) {
            this.formErrors[key] += message[errorKey] + ' ';
          }
        }
      }

      if (abstarctControler instanceof FormGroup) {
        this.logValidationErrorMessages(abstarctControler);
      }

    });
  }


  logKeyValuePairs(group: FormGroup): void {

    //this.employeeForm.get('fullName').disable();
    Object.keys(group.controls).forEach((key: string) => {
      // if(key==='fullName'){
      //   group.get(key).disable();
      // }
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logKeyValuePairs(abstractControl);
        //We can disable all controles
        //abstractControl.disable();
      } else {
        console.log("Key--->" + key + "---->Value-->" + abstractControl.value);
        //We can disable all controles
        // abstractControl.disable();
      }
    });
  }

  loadInsideFormArrayData(): void {
    const FormArray1 = new FormArray([
      new FormControl('Ramakrishna', Validators.required),
      new FormGroup({
        country: new FormControl('', Validators.required)
      }),
      new FormArray([])
    ])
    for (const control of FormArray1.controls) {
      if (control instanceof FormControl) {
        console.log('control is FormControl');
      }
      if (control instanceof FormGroup) {
        console.log('control is FormGroup');
      }
      if (control instanceof FormArray) {
        console.log('control is FormArray');
      }
    }

    const formArray2 = this.fb.array([
      new FormControl('John', Validators.required),
      new FormControl('IT', Validators.required),
    ]);


    const formArray3 = this.fb.array([
      new FormControl('John', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('', Validators.required),
    ]);

    console.log(formArray2.value);
    console.log(formArray3.value);
  }

  /*********************ADD EMPLOYEE DETAILS*************************/

  

  /*********************EDIT EMPLOYEE DETAILS*************************/

  /**
   * getEmployee
   * @param id 
   */
  getEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe(
      (employee: IEmployee) => {
        this.employee = employee;
        this.editEmployee(employee)
      },
      (error: any) => {
        console.log('Error occured')
      });
  }

  /**
   * editEmployee
   * @param employee 
   */
  editEmployee(employee: IEmployee) {
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      contactPreference: employee.contactPreference,
      phone: employee.phone,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email,
      }
    })
    this.employeeForm.setControl("skills", this.setExistingSkillset(employee.skills));
  }

  /**
   * setExistingSkillset
   * @param skillSet 
   */
  setExistingSkillset(skillSet: ISkill[]): FormArray {
    const formArray = new FormArray([]);
    skillSet.forEach(s => {
      formArray.push(this.fb.group({
        skillName: s.skillName,
        experienceInYears: s.experienceInYears,
        proficiency: s.proficiency
      }));
    });
    return formArray
  }

  /**
   * onSubmit
   */
  onSubmit(): void {
    this.mapFormValuesToEmployeeModel();
    this.employeeService.updateEmployee(this.employee).subscribe(
      () => this.navigateRoute.navigate(['/employee']),
      (error: any) => console.log('error occured')
    );
  }

  /**
   * mapFormValuesToEmployeeModel
   */
  mapFormValuesToEmployeeModel() {
    this.employee.fullName = this.employeeForm.value.fullName;
    this.employee.contactPreference = this.employeeForm.value.contactPreference;
    this.employee.email = this.employeeForm.value.emailGroup.email;
    this.employee.phone = this.employeeForm.value.phone;
    this.employee.skills = this.employeeForm.value.skills;
  }

  /*********************DELETE EMPLOYEE DETAILS*************************/


}



/**************Normal cusatom  validators*****************/
/**
 * emailDomainValidations
 * @param control 
 */
// function emailDomainError(control: AbstractControl): { [key: string]: any } | null {
//   const email: string = control.value;
//   const domain: string = email.substring(email.lastIndexOf("@") + 1);
//   console.log("--->" + control.value.emailDomainValidations);
//   if (email === '' || domain === "karvy.com") {
//     return null;
//   } else {
//     return { "emailDomainError": true };
//   }
// }


/**************emailDomainValidations  validators*****************/
/**
 * emailDomainValidations
 * @param control 
 */
/*function emailDomain(domainName: string) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email: string = control.value;
    const domain: string = email.substring(email.lastIndexOf("@") + 1);
    console.log("--->" + control.value.emailDomainValidations);
    if (email === '' || domain === domainName) {
      return null;
    } else {
      return { "emailDomain": true };
    }
  };
}*/


/*function matchEmails(group: AbstractControl): { [key: string]: any } | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');
  if (emailControl.value === confirmEmailControl.value || confirmEmailControl.pristine) {
    return null;
  } else {
    return { 'matchEmails': true };
  }
}*/
