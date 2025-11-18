package org.inganji.TerraSustain.controller;

import lombok.Data;
import org.inganji.TerraSustain.model.Report;
import org.inganji.TerraSustain.service.impl.ReportServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Data
@RestController
public class ReportController {
    @Autowired
    private ReportServiceImp service;
    @PostMapping("/citizen/add_Issue")
    public ResponseEntity<?> createReport(@RequestBody Report report) {
        service.createReport(report);
        return ResponseEntity.ok("Report issued successfully");
    }
    @PostMapping("/delete_report/{id}")
    public ResponseEntity<?> deleteReport(@PathVariable Long id) {
        service.deleteReport(id);
        return ResponseEntity.ok("Report deleted");
    }
}