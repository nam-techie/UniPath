package com.unipath.scholarship.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.unipath.program.entity.Program;

@Document(collection = "program_scholarships")
public class ProgramScholarship {

    @Id
    private String id;
    @DBRef
    private Program program;
    @DBRef
    private Scholarship scholarship;
}
