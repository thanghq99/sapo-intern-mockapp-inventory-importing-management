package com.sapo.storemanagement.utils;

import java.text.Normalizer;
import java.util.regex.Pattern;

public class NormalizeCharacter {
    public static String removeAccent(String s) {

        String temp = Normalizer.normalize(s, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(temp).replaceAll("");
    }

    public char getFirstChar(String string) {
        return string.charAt(0);
    }
}
