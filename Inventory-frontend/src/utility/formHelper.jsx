let EmailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

class FormHelper {
  isEmpty(value) {
    return value.length === 0;
  }

  isEmail(value) {
    return !EmailRegx.test(value);
  }

  isMobile(value) {
    return !MobileRegx.test(value);
  }
}

export const { isEmpty, isEmail, isMobile } = new FormHelper();
