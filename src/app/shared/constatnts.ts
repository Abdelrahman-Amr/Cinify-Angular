
export class Constants {

  /* Validation Regex */
  public static readonly ENGLISH_CHARACTERS = '^[a-zA-Z ]+$';
  public static readonly ARABIC_CHARACTERS = '^[\\u0621-\\u064A ]+$';
  public static readonly DIGITS_ONLY_14 = '^[0-9]{14}$';
  public static readonly DIGITS_ONLY_11 = '^[01][0-9]{10}$';
  public static readonly FLOAT_NUMBERS = '^([0-9]*[.])?[0-9]+$';
  public static readonly DIGITS_ONLY = '^\\d+$';
  public static readonly ENGLISH_CHARACTERS_AND_DIGITS = '^[a-zA-Z0-9 ]+$';
  public static readonly ENGLISH_CHARACTERS_AND_DIGITS_AND_DASH = '^[a-zA-Z0-9- ]*$';

public static readonly EMAIL = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

}
