package com.vinicius.membermanagement.validator;

public class CpfValidator {

    private CpfValidator() {}

    public static String clean(String cpf) {
        return cpf == null ? null : cpf.replaceAll("[^0-9]", "");
    }

    public static boolean isValid(String cpf) {
        String cleaned = clean(cpf);

        if (cleaned == null || cleaned.length() != 11) {
            return false;
        }

        // all same digits are invalid (e.g. 111.111.111-11)
        if (cleaned.chars().distinct().count() == 1) {
            return false;
        }

        int firstDigit = calculateDigit(cleaned, 10);
        int secondDigit = calculateDigit(cleaned, 11);

        return firstDigit == Character.getNumericValue(cleaned.charAt(9))
                && secondDigit == Character.getNumericValue(cleaned.charAt(10));
    }

    private static int calculateDigit(String cpf, int weight) {
        int sum = 0;
        for (int i = 0; i < weight - 1; i++) {
            sum += Character.getNumericValue(cpf.charAt(i)) * (weight - i);
        }
        int remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    }
}
