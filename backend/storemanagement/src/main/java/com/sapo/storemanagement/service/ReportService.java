package com.sapo.storemanagement.service;

import java.util.List;

public interface ReportService {
    List<Long> totalOrderOneMonthInYear(int year);

    List<Long> totalSuppliedQuantityOneMonthInYear(int year);
}
