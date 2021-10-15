function validation(data) {
  const errors = { error: false, message: "" };
  if (data.userid.length < 4 || data.userid.length > 12) {
    errors.error = true;
    errors.message = "userid length  longer than 4 and shorter than 12";
  }

  if (data.password.length < 4 || data.password.length > 12) {
    errors.error = true;
    errors.message = "password length  longer than 6 and shorter than 14";
  }

  // if (data.title.length < 10 || data.password.length > 20) {
  //   errors.error = true;
  //   errors.message = "title length  longer than 10 and shorter than 20";
  // }

  // if (data.content.length < 20 || data.content.length > 200) {
  //   errors.error = true;
  //   errors.message = "conent length  longer than 20 and shorter than 200";
  // }

  return errors;
}

export default validation;
