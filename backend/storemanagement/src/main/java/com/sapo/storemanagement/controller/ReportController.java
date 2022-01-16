package com.sapo.storemanagement.controller;

import com.sapo.storemanagement.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Year;
import java.util.List;

@RestController
@RequestMapping("/report")
public class ReportController {
    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/total-orders")
    public List<Long> totalOrderEachMonth(@RequestParam(name = "year", required = false) Integer year) {
        if(year == null) {
            year = Year.now().getValue();
        }
        return reportService.totalOrderOneMonthInYear(year);
    }

    @GetMapping("/total-supplied-quantity")
    public List<Long> totalSuppliedQuantityEachMonth(@RequestParam(name = "year", required = false) Integer year) {
        if(year == null) {
            year = Year.now().getValue();
        }
        return reportService.totalSuppliedQuantityOneMonthInYear(year);
    }
}
