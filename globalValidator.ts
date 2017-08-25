import { FormControl } from "@angular/forms/src/forms";

export class GlobalValidator {

    static mailFormat(control: FormControl): ValidationResult {
        console.log("email" + control.value);
        var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
            return { "incorrectMailFormat": true };
        }

        return null;
    }

    /// This function is specific for my-date-picker only.
    /// and will validate valid date time format.
    static dateTimeAndRequiredFormat(control: FormControl): ValidationResult {
          console.log("date"+ control.value.formatted);// new Date(dateString)
                
        var DATETIME_REGEXP = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/;
        if (control.value != "" && control.value != null && control.value.formatted != "")
            var matches = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/.exec(control.value.formatted);        
        if (matches == null) return { "incorrectDateFormat": true };
        // + is used for converting string to numbers
        let d: number = +matches[2];
        let m: number = +matches[1];
        m = m - 1;
        let y: number = + matches[3];
        var validDate;
        var composedDate = new Date(y, m, d);
        if (composedDate.getDate() != d ||
            composedDate.getMonth() != m ||
            composedDate.getFullYear() != y)
            return { "incorrectDateFormat": true };

        return null;
    }

}

interface ValidationResult {
    [key: string]: boolean;
}