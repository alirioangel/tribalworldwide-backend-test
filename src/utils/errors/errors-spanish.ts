export const ErrorsSpanish = {
  UserEmailAlreadyExists:
    'El correo electrónico ingresado ya esta en uso. Por favor, ingrese otro correo electrónico y vuelva intentarlo',
  LocaleValueInvalid:
    'Se ha ingresado un valor invalido para el query "locale". Los valores permitidos son "en" y "es"',
  AuthorizationHeaderNotFound:
    'El header "authorization" no esta definido. Por favor, agrega el header "authorization" a la petición y vuelva a intentarlo',
  AuthorizationHeaderBadFormed:
    'El header "authorization" no cuenta con el formato correcto.' +
    ' Por favor, usa el formato "bearer token" para el header "authorization" y vuelva a intentarlo',
  BadJwtToken:
    'El JSON Web Token utilizado no es valido. Por favor, ingrese uno valido y vuelva a intentarlo',
  UserNotFound:
    'El usuario no existe. Por favor, use otro usuario y vuelva a intentarlo',
  UnauthorizedUser: 'Este usuario no tiene permisos para acceder a esta ruta',
  ExpiredToken: 'Su sesión ha caducado. Por favor, vuelva a iniciar sesión',
  MoviesIDError: 'El Id ingresado no es correcto. Por favor, verifique la peticion',
  WrongCredentials:
    'Correo electrónico o contraseña incorrectos. Por favor, ingrese las credenciales correctas y vuelva a intentarlo',
};
