package org.inganji.TerraSustain.service;

import org.inganji.TerraSustain.model.DTO.ReportCreation;
import org.inganji.TerraSustain.model.Report;

public interface ReportService {
    ReportCreation createReport(Report report);
}
