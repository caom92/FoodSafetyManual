export function getDatePickerConfig(lang: string): any {
  return (lang === 'es') ?
    {
      'closeOnSelect': true,
      'closeOnClear': false,
      'monthsFull': [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
        'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ],
      'monthsShort': [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep',
        'Oct', 'Nov', 'Dec'
      ],
      'weekdaysFull': [
        'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes',
        'Sábado'
      ],
      'weekdaysShort': [
        'Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'
      ],
      'weekdaysLetter': [
        'D', 'L', 'M', 'R', 'J', 'V', 'S'
      ],
      'today': 'Hoy',
      'clear': 'Borrar',
      'close': 'Cerrar',
      'format': 'dddd, dd mmmm, yyyy',
      'formatSubmit': 'yyyy-mm-dd',
      'selectYears': true,
      'selectMonths': true
    }
    : {
      'closeOnSelect': true,
      'closeOnClear': false,
      'format': 'dddd, dd mmmm, yyyy',
      'formatSubmit': 'yyyy-mm-dd',
      'selectYears': true,
      'selectMonths': true
    }
}