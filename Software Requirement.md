# UniPath - Software Requirement Specification

> Project Name: UniPath  
> Product Type: University and program recommendation platform  
> Main Goal: Students enter their profile and receive suitable program recommendations  
> Primary Users: Vietnamese students, admins  
> Architecture: Modular monolith backend + separated frontend  
> Backend Stack: Java 21, Spring Boot, Spring Security, Spring Data MongoDB, MongoDB  
> Frontend Stack: Next.js, React, TailwindCSS, shadcn/ui  

---

# 1. Product Direction

## 1.1. Product Vision

UniPath helps Vietnamese high school students find suitable domestic universities and study programs based on their academic profile (GPA scale 10, high school graduation exam scores, competency assessment ĐGNL scores), English scores (IELTS/TOEFL), yearly budget (VND), preferred regions/provinces, preferred majors, and admission methods.

The first version should focus on reliable domestic recommendation logic, using a curated set of crawled domestic university data.

## 1.2. MVP Success Criteria

The MVP is successful if it can prove these flows:

1. A student can register and log in.
2. A student can enter academic profile (grades, scores, preferences).
3. The system can search and filter domestic universities and programs.
4. The system can recommend programs as SAFE, MATCH, or REACH based on domestic admission rules.
5. The system can explain why a program is recommended.
6. An admin can manage the education data used by recommendation.
7. A Python crawler can gather admission plans, tuition, and benchmarks from 30-50 key universities.

## 1.3. Reduced MVP Scope

The MVP should focus on only the features needed to make recommendation work correctly.

### Must Have

- Authentication and authorization
- Student profile input (GPA scale 10, ĐGNL HN/HCM scores, graduation exam scores by blocks, IELTS/TOEFL)
- Regional & Province data (North, Central, South, and key provinces/cities)
- University data (30-50 domestic universities)
- Field of study data (normalized using MOET Level IV educational catalog)
- Program data (100-300 programs: standard, high quality, advanced, English, joint programs)
- Admission requirement data (methods: THPT exam score, High school academic record/Học bạ, ĐGNL, and combined IELTS requirements)
- Tuition fee and living cost data (VND)
- Scholarship data ( entrance scholarships for top private/international universities in VN)
- Rule-based recommendation engine (calculating converted scores and probability of admission)
- Program shortlist
- Admin CRUD for core data
- Standalone Python Crawler to collect and structure admission data for 30-50 universities

### Should Have

- Simple cost estimation (TCO calculator with annual growth rate of 10-15%)
- Recommendation explanation based on rules
- Data source URL and last checked date
- Basic dashboard for admin data management

### Not In MVP

- AI chatbot
- AI-generated roadmap
- Parent dashboard
- Counselor dashboard
- Real-time automatic crawler integrated in backend (crawling is a standalone off-line step for MVP)
- Bulk CSV/Excel import
- Email reminders
- Payment system
- Mobile app
- Full national university coverage (243+ schools)

## 1.4. Initial Data Scope

Start small and curated.

- Target: Vietnam
- Regions: North (Bắc), Central (Trung), South (Nam)
- Key Cities/Provinces: Hà Nội, TP. Hồ Chí Minh, Đà Nẵng, Bình Dương, Cần Thơ
- Universities: 30-50 domestic universities (e.g. HCMUT, UEH, UET, FTU, NEU, HUST, UIT, etc.)
- Programs: 100-300 programs
- Scholarships: 10-30 entrance scholarships
- Fields: Classified by Level IV educational catalog of Vietnam (e.g., Công nghệ thông tin - 7480201, Kinh tế học - 7310101)


This is enough to test the product logic without drowning in data entry.

---

# 2. User Roles

## 2.1. Student

Student is the main user.

Student can:

- Register and log in
- Create and update profile
- Enter GPA (scale 10), high school graduation exam scores (by subject/block), ĐGNL scores, English scores (IELTS/TOEFL), budget (VND), target regions/provinces, target fields, and degree level
- View recommended programs
- View why each program is SAFE, MATCH, or REACH
- Save programs to shortlist

## 2.2. Admin

Admin manages the data used by the recommendation engine.

Admin can:

- Manage regions and provinces
- Manage universities
- Manage fields of study (Level IV)
- Manage programs
- Manage admission requirements (ĐGNL, THPT graduation blocks, IELTS conversion)
- Manage tuition fees
- Manage living costs
- Manage scholarships
- Trigger or upload crawled data from Python crawler

## 2.3. Future Roles

These roles are not needed in MVP:

- Parent
- Counselor

---

# 3. Core User Flow

## 3.1. Student Recommendation Flow

```text
Student registers or logs in
-> Student creates profile
-> Student enters GPA, high school exam scores by block, and ĐGNL scores
-> Student enters English test scores (IELTS/TOEFL)
-> Student selects degree level
-> Student selects preferred regions and provinces in Vietnam
-> Student selects preferred fields of study (Level IV)
-> Student enters yearly budget (VND)
-> Student requests recommendations
-> System filters eligible programs (using admission methods, region, and major)
-> System calculates match score using Converted Admission Score ($S_{admission}$)
-> System categorizes programs as SAFE, MATCH, or REACH
-> Student views recommendation explanation (including admission probability)
-> Student saves interesting programs to shortlist
```

## 3.2. Admin Data Flow

```text
Admin logs in
-> Admin creates regions, provinces, and fields of study
-> Admin triggers crawler or imports crawled JSON of universities, programs, tuition, and benchmarks
-> Admin verifies/edits crawled university and program data
-> Admin sets up specific admission requirements and IELTS conversion matrix
-> Admin adds scholarships
-> Student recommendation can use verified and crawled data
```

---

# 4. Functional Modules

## 4.1. Auth Module

Purpose: Handle account registration, login, JWT authentication, and role-based access.

APIs:

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh-token
POST /api/v1/auth/logout
GET  /api/v1/auth/me
```

MVP Notes:

- Forgot password can be added later.
- Email verification can be skipped in the first build.

## 4.2. User Module

Purpose: Store account identity and roles.

APIs:

```http
GET /api/v1/users/me
GET /api/v1/admin/users
```

## 4.3. Student Profile Module

Purpose: Store student academic data and preferences.

APIs:

```http
GET  /api/v1/student-profiles/me
POST /api/v1/student-profiles
PUT  /api/v1/student-profiles/me

POST   /api/v1/student-profiles/me/test-scores
PUT    /api/v1/student-profiles/me/test-scores/{id}
DELETE /api/v1/student-profiles/me/test-scores/{id}
```

Important fields:

- GPA value (Academic record scale 10)
- High school tier (Chuyên Quốc gia, Chuyên Tỉnh, Trường đại trà)
- High school graduation exam scores (subject scores: Math, Literature, English, Physics, Chemistry, Biology, History, Geography, Civic Education)
- ĐGNL score (ĐHQG-HCM scale 1200 or ĐHQG-HN scale 150)
- English test type (IELTS, TOEFL, PTE)
- English test score
- Degree level
- Preferred regions (North, Central, South)
- Preferred provinces/cities
- Preferred fields of study (Level IV codes)
- Yearly budget (VND)
- Scholarship need

## 4.4. Education Data Module

Purpose: Manage regions, provinces, universities, fields, programs, requirements, tuition fees, and living costs.

Public APIs:

```http
GET /api/v1/regions
GET /api/v1/provinces
GET /api/v1/fields-of-study
GET /api/v1/universities
GET /api/v1/universities/{id}
GET /api/v1/programs
GET /api/v1/programs/{id}
GET /api/v1/programs/{id}/requirements
GET /api/v1/programs/{id}/cost-estimation
```

Admin APIs:

```http
POST   /api/v1/admin/regions
PUT    /api/v1/admin/regions/{id}
DELETE /api/v1/admin/regions/{id}

POST   /api/v1/admin/provinces
PUT    /api/v1/admin/provinces/{id}
DELETE /api/v1/admin/provinces/{id}

POST   /api/v1/admin/fields-of-study
PUT    /api/v1/admin/fields-of-study/{id}
DELETE /api/v1/admin/fields-of-study/{id}

POST   /api/v1/admin/universities
PUT    /api/v1/admin/universities/{id}
DELETE /api/v1/admin/universities/{id}

POST   /api/v1/admin/programs
PUT    /api/v1/admin/programs/{id}
DELETE /api/v1/admin/programs/{id}

POST   /api/v1/admin/programs/{programId}/requirements
PUT    /api/v1/admin/admission-requirements/{id}
DELETE /api/v1/admin/admission-requirements/{id}

POST   /api/v1/admin/programs/{programId}/tuition-fees
PUT    /api/v1/admin/tuition-fees/{id}
DELETE /api/v1/admin/tuition-fees/{id}

POST   /api/v1/admin/crawler/upload
POST   /api/v1/admin/crawler/trigger
```

## 4.5. Scholarship Module

Purpose: Store scholarships and match them to programs and student profiles.

Public APIs:

```http
GET /api/v1/scholarships
GET /api/v1/scholarships/{id}
GET /api/v1/programs/{programId}/scholarships
```

Admin APIs:

```http
POST   /api/v1/admin/scholarships
PUT    /api/v1/admin/scholarships/{id}
DELETE /api/v1/admin/scholarships/{id}
POST   /api/v1/admin/programs/{programId}/scholarships/{scholarshipId}
DELETE /api/v1/admin/programs/{programId}/scholarships/{scholarshipId}
```

## 4.6. Recommendation Module

Purpose: Generate program recommendations from student profile and stored education data.

APIs:

```http
POST /api/v1/recommendations/generate
GET  /api/v1/recommendations/me
GET  /api/v1/recommendations/{id}
```

Output:

- Program
- University
- Province/City
- Region
- Match score
- Match category
- Converted Admission Score ($S_{admission}$)
- Estimated yearly cost (VND)
- Scholarship suggestions
- Match reasons (detailed scoring per method)

## 4.7. Shortlist Module

Purpose: Allow students to save programs they are interested in.

APIs:

```http
GET    /api/v1/shortlists/me
POST   /api/v1/shortlists
PUT    /api/v1/shortlists/{id}
DELETE /api/v1/shortlists/{id}
```

---

# 5. Recommendation Rules

## 5.1. Match Categories

```text
SAFE (80-100):
- Student's Converted Admission Score ($S_{admission}$) is clearly above the historical benchmark (at least 1.5 points on a 30-point scale or 50 points on a 1200-point scale).
- Yearly budget meets or exceeds estimated tuition and living costs in VND.

MATCH (60-79):
- Student's Converted Admission Score ($S_{admission}$) is equal to or slightly above the historical benchmark (within 1.5 points on a 30-point scale).
- Yearly budget is close to estimated tuition and living costs.

REACH (40-59):
- Student's Converted Admission Score ($S_{admission}$) is slightly below the historical benchmark (within 1.5 points on a 30-point scale).
- The program is still shown because the student might get admitted with improvement, or by using another admission method (e.g. combined IELTS).

HIDDEN (Below 40):
- Student's score is far below the historical benchmark, or yearly tuition far exceeds their budget. Hidden by default.
```

## 5.2. Scoring Weights

Since Vietnamese university admission is highly quantitative and split into multiple methods, we calculate the Match Score for each eligible admission method separately, then select the method with the highest score as the final match rating for that program.

```text
Total Score = 100

Academic Score Match ($S_{academic}$): 65
English Score Match ($S_{english}$): 15
Budget Score Match ($S_{budget}$): 20
```

## 5.3. Converted Admission Score ($S_{admission}$) Calculations

For a target program, we calculate $S_{admission}$ based on the method being evaluated:

### 1. High School Graduation Exam Method (Xét điểm thi tốt nghiệp THPT)
$$S_{admission} = Score_{Subject1} + Score_{Subject2} + Score_{Subject3} + PriorityScore + EnglishBonus$$
- Subject scores are based on the admission block (e.g. A00: Math + Physics + Chemistry; D01: Math + Literature + English).
- EnglishBonus is calculated using the university's custom IELTS/TOEFL conversion rules (e.g. IELTS 6.5 converted to 8.5 or 9.0 in English score).
- PriorityScore is determined by MOET's regional and priority group policies.

### 2. High School Academic Record Method (Xét học bạ THPT)
$$S_{admission} = Avg(Subject1) + Avg(Subject2) + Avg(Subject3) + PriorityScore$$
- Average subject scores are calculated from 5 semesters (Grade 10, Grade 11, and 1st semester of Grade 12) or all 6 semesters.
- Bonus points are awarded if the student attended a specialized/tier-1 high school.

### 3. Competency Assessment Method (Xét điểm ĐGNL)
- Scale ĐHQG-HCM: $S_{admission} = Score_{DGNL} + PriorityScore_{DGNL}$ (Max: 1200)
- Scale ĐHQG-HN: $S_{admission} = Score_{DGNL} + PriorityScore_{DGNL}$ (Max: 150)
- The score is compared against the program's historical ĐGNL benchmark.

## 5.4. Academic Score Match ($S_{academic}$) Rule (Weight: 65)

Comparing the student's $S_{admission}$ against the program's 3-year average historical benchmark ($S_{benchmark}$):

### For THPT/Học bạ Methods (Scale 30):
```text
If $S_{admission} >= S_{benchmark} + 1.5$:
  Academic score = 65

If $S_{admission} >= S_{benchmark}$:
  Academic score = 55

If $S_{admission} >= S_{benchmark} - 1.5$:
  Academic score = 30

If $S_{admission} < S_{benchmark} - 1.5$:
  Academic score = 0
```

### For ĐGNL Method (Scale 1200):
```text
If $S_{admission} >= S_{benchmark} + 60$:
  Academic score = 65

If $S_{admission} >= S_{benchmark}$:
  Academic score = 55

If $S_{admission} >= S_{benchmark} - 60$:
  Academic score = 30

If $S_{admission} < S_{benchmark} - 60$:
  Academic score = 0
```

## 5.5. English Score Match ($S_{english}$) Rule (Weight: 15)

English scores are matched against the program's minimum English or combined requirements:

```text
If program has no English requirement:
  English score = 15

If student meets or exceeds the required IELTS/TOEFL band:
  English score = 15

If student is 0.5 IELTS band below the requirement:
  English score = 8

If student is 1.0 or more IELTS bands below:
  English score = 0
```

## 5.6. Budget Score Match ($S_{budget}$) Rule (Weight: 20)

$$EstimatedYearlyCost = TuitionPerYear + LivingCostPerYear$$
All costs are calculated in VND. Living costs are determined by the university's host city.

```text
If YearlyBudget >= EstimatedYearlyCost:
  Budget score = 20

If YearlyBudget >= 80% of EstimatedYearlyCost:
  Budget score = 12

If YearlyBudget >= 60% of EstimatedYearlyCost:
  Budget score = 6

Otherwise:
  Budget score = 0
```

## 5.7. Recommendation Explanation

The system generates clear, rule-based explanations specifying the matching method, the student's calculated score versus the historical benchmark, and financial safety.

Example:
```text
Chương trình này là MATCH vì Điểm xét tuyển THPT quy đổi của bạn là 26.5 (đã cộng 1.0 điểm ưu tiên ngoại ngữ), cao hơn điểm chuẩn trung bình 3 năm qua là 26.2. Ngoài ra, tổng chi phí học tập và sinh hoạt ước tính tại TP.HCM (khoảng 55 triệu VNĐ/năm) nằm gọn trong ngân sách 60 triệu VNĐ/năm của gia đình bạn.
```

---

# 6. Data Model

## 6.1. Entity Relationship Overview

```text
User 1-1 StudentProfile
User 1-n SavedShortlist

Country 1-n Region
Region 1-n Province
Province 1-n University
Province 1-n LivingCost

University 1-n Program
FieldOfStudy 1-n Program

Program 1-n AdmissionRequirement
Program 1-n ProgramTuitionFee
Program n-n Scholarship through ProgramScholarship

StudentProfile 1-n StudentTestScore
StudentProfile 1-n StudentSubjectScore
StudentProfile n-n Country through StudentPreferredCountry
StudentProfile n-n Region through StudentPreferredRegion
StudentProfile n-n Province through StudentPreferredProvince
StudentProfile n-n FieldOfStudy through StudentPreferredField

StudentProfile 1-n RecommendationResult
RecommendationResult 1-n RecommendationDetail
RecommendationDetail 1-n MatchReason
```

## 6.2. User

Fields:

- id
- email
- passwordHash
- fullName
- role (STUDENT, ADMIN)
- status (ACTIVE, DISABLED)
- createdAt
- updatedAt

## 6.3. StudentProfile

Fields:

- id
- userId
- gpaValue (Average transcript GPA scale 10)
- highSchoolTier (TIER_1_SPECIALIZED, TIER_2_PROVINCIAL_SPECIALIZED, TIER_3_NORMAL)
- highSchoolName
- targetDegreeLevel (BACHELOR, DIPLOMA)
- yearlyBudgetAmount (VND / USD)
- budgetCurrency (VND / USD)
- priorityGroup (KV1, KV2-NT, KV2, KV3, UT_NHOM_1, UT_NHOM_2)
- scholarshipNeed
- careerGoal
- createdAt
- updatedAt

## 6.4. StudentTestScore

For general standard tests like IELTS, TOEFL, or competency assessments (ĐGNL).

Fields:

- id
- studentProfileId
- testType (IELTS, TOEFL, DGNL_HCM, DGNL_HN)
- scoreValue (e.g. 6.5 for IELTS, 850 for ĐGNL_HCM, 95 for ĐGNL_HN)
- testDate

## 6.5. StudentSubjectScore

For storing specific subject scores for high school graduation exams and academic transcript (Học bạ).

Fields:

- id
- studentProfileId
- subjectName (MATH, LITERATURE, ENGLISH, PHYSICS, CHEMISTRY, BIOLOGY, HISTORY, GEOGRAPHY, CIVIC_EDUCATION)
- transcriptScore (Học bạ GPA score - average of 5 or 6 semesters)
- graduationExamScore (Điểm thi tốt nghiệp THPT)

## 6.6. StudentPreferredCountry

Fields:

- id
- studentProfileId
- countryId

## 6.7. StudentPreferredProvince

Fields:

- id
- studentProfileId
- provinceId

## 6.8. StudentPreferredRegion

Fields:

- id
- studentProfileId
- regionId

## 6.9. Country

Fields:

- id
- name (e.g. Việt Nam, Canada, USA, Australia)
- code (e.g. VN, CA, US, AU)
- currencyCode (e.g. VND, CAD, USD, AUD)
- status (ACTIVE, INACTIVE)

## 6.10. Region

Fields:

- id
- countryId
- name (e.g. Bắc, Trung, Nam for VN; Ontario, British Columbia for CA)
- code (e.g. NORTH, CENTRAL, SOUTH)
- status (ACTIVE, INACTIVE)

## 6.11. Province

Fields:

- id
- regionId
- name (e.g. Hà Nội, TP. Hồ Chí Minh)
- code (e.g. HN, HCM)
- status (ACTIVE, INACTIVE)

## 6.12. LivingCost

Estimated living cost per year in major cities.

Fields:

- id
- countryId
- provinceId (optional, if within a country that supports provincial tiering)
- cityName
- minAmountPerYear
- maxAmountPerYear
- currencyCode (VND / USD / etc.)
- sourceUrl
- lastCheckedAt

## 6.13. University

Fields:

- id
- countryId
- provinceId (optional, if within a country that supports provincial tiering)
- name
- websiteUrl
- institutionType (PUBLIC, PRIVATE, INTERNATIONAL)
- ranking (Domestic ranking / Global ranking)
- description
- status (ACTIVE, INACTIVE)

## 6.14. FieldOfStudy

Normalized using the Level IV educational catalog of Vietnam (for VN) or global classifications like ISCED.

Fields:

- id
- parentId
- name
- fieldCode (7-digit code for VN, e.g., 7480201 for IT)
- description
- status

## 6.15. Program

Fields:

- id
- universityId
- fieldOfStudyId
- name (e.g., Công nghệ thông tin - Hệ đại trà)
- programType (STANDARD, HIGH_QUALITY, ADVANCED, ENGLISH_TAUGHT, JOINT_PROGRAM)
- degreeLevel (BACHELOR, DIPLOMA)
- studyMode (ON_CAMPUS, ONLINE, HYBRID)
- durationMonths
- teachingLanguage (VIETNAMESE, ENGLISH)
- programUrl
- description
- status

## 6.16. AdmissionRequirement

Stores criteria for multiple admission methods of a program.

Fields:

- id
- programId
- admissionMethod (THPT_EXAM, HOC_BA, DGNL, COMBINED_IELTS, DIRECT_ADMISSION)
- admissionBlock (e.g., A00, A01, D01, D07 for VN)
- minimumScore (e.g. minimum THPT score, ĐGNL score, or GPA score)
- minimumIelts (For combined admission method)
- portfolioRequired
- interviewRequired
- note
- sourceUrl
- lastCheckedAt

## 6.17. ProgramTuitionFee

Fields:

- id
- programId
- amount
- currencyCode (VND, USD, etc.)
- feePeriod (PER_YEAR, PER_SEMESTER, FULL_PROGRAM)
- studentType (DOMESTIC, INTERNATIONAL)
- sourceUrl
- lastCheckedAt

## 6.18. Scholarship

Entrance scholarships and corporate sponsorships for private/international universities.

Fields:

- id
- name
- providerName
- countryId
- provinceId (optional)
- universityId
- degreeLevel
- coverageType (FULL, PARTIAL, TUITION_ONLY, FIXED_AMOUNT)
- amount
- currencyCode (VND, USD, etc.)
- minimumGpa
- minimumIelts
- deadline
- description
- sourceUrl
- lastCheckedAt
- status

## 6.19. ProgramScholarship

Fields:

- id
- programId
- scholarshipId

## 6.20. RecommendationResult

Fields:

- id
- studentProfileId
- generatedAt
- totalProgramsConsidered
- note

## 6.21. RecommendationDetail

Fields:

- id
- recommendationResultId
- programId
- matchScore
- matchCategory (SAFE, MATCH, REACH)
- ConvertedAdmissionScore
- estimatedYearlyCost
- costCurrency (VND / USD)
- explanation

## 6.22. MatchReason

Fields:

- id
- recommendationDetailId
- reasonType (ACADEMIC_MATCH, ENGLISH_MATCH, BUDGET_MATCH, FIELD_MATCH, REGION_MATCH, SCHOLARSHIP_SUPPORT)
- score
- message

## 6.23. SavedShortlist

Fields:

- id
- userId
- programId
- status (SAVED, CONSIDERING, APPLYING, APPLIED, ACCEPTED, REJECTED)
- note
- createdAt
- updatedAt

---

# 7. Enum List

## 7.1. UserRole

```text
STUDENT
ADMIN
```

## 7.2. UserStatus

```text
ACTIVE
DISABLED
```

## 7.3. DegreeLevel

```text
BACHELOR
DIPLOMA
```

## 7.4. StudyMode

```text
ON_CAMPUS
ONLINE
HYBRID
```

## 7.5. InstitutionType

```text
PUBLIC
PRIVATE
INTERNATIONAL
```

## 7.6. RecordStatus

```text
ACTIVE
INACTIVE
DRAFT
```

## 7.7. TestType

```text
IELTS
TOEFL
DGNL_HCM
DGNL_HN
```

## 7.8. SubjectName

```text
MATH
LITERATURE
ENGLISH
PHYSICS
CHEMISTRY
BIOLOGY
HISTORY
GEOGRAPHY
CIVIC_EDUCATION
```

## 7.9. AdmissionMethod

```text
THPT_EXAM
HOC_BA
DGNL
COMBINED_IELTS
```

## 7.10. HighSchoolTier

```text
TIER_1_SPECIALIZED
TIER_2_PROVINCIAL_SPECIALIZED
TIER_3_NORMAL
```

## 7.11. PriorityGroup

```text
KV1
KV2_NT
KV2
KV3
UT_NHOM_1
UT_NHOM_2
```

## 7.12. ProgramType

```text
STANDARD
HIGH_QUALITY
ADVANCED
ENGLISH_TAUGHT
JOINT_PROGRAM
```

## 7.13. CurrencyCode

```text
VND
USD
```

## 7.14. FeePeriod

```text
PER_YEAR
PER_SEMESTER
FULL_PROGRAM
```

## 7.15. StudentType

```text
DOMESTIC
INTERNATIONAL
```

## 7.16. ScholarshipProviderType

```text
UNIVERSITY
GOVERNMENT
PRIVATE
ORGANIZATION
```

## 7.17. ScholarshipCoverageType

```text
FULL
PARTIAL
TUITION_ONLY
FIXED_AMOUNT
```

## 7.18. MatchCategory

```text
SAFE
MATCH
REACH
```

## 7.19. MatchReasonType

```text
ACADEMIC_MATCH
ENGLISH_MATCH
BUDGET_MATCH
FIELD_MATCH
REGION_MATCH
SCHOLARSHIP_SUPPORT
```

## 7.20. ShortlistStatus

```text
SAVED
CONSIDERING
APPLYING
APPLIED
ACCEPTED
REJECTED
```

---

# 8. Backend Package Structure

Use feature-first structure with layers inside each feature. This keeps related code close together while still preserving the familiar Controller, DTO, Entity, Repository, Service, and ServiceImpl pattern.

```text
com.unipath
|-- common
|   |-- constant
|   |-- enums
|   |-- exception
|   |-- response
|   |-- util
|   `-- validation
|-- config
|-- security
|   |-- jwt
|   |-- principal
|   `-- filter
|-- auth
|   |-- controller
|   |-- dto
|   |-- entity
|   |-- repository
|   `-- service
|       `-- impl
|-- user
|   |-- controller
|   |-- dto
|   |-- entity
|   |-- repository
|   `-- service
|       `-- impl
|-- profile
|   |-- controller
|   |-- dto
|   |-- entity
|   |-- mapper
|   |-- repository
|   `-- service
|       `-- impl
|-- country
|   |-- controller
|   |-- dto
|   |-- entity
|   |-- repository
|   `-- service
|       `-- impl
|-- fieldofstudy
|   |-- controller
|   |-- dto
|   |-- entity
|   |-- repository
|   `-- service
|       `-- impl
|-- university
|   |-- controller
|   |-- dto
|   |-- entity
|   |-- repository
|   `-- service
|       `-- impl
|-- program
|   |-- controller
|   |-- dto
|   |-- entity
|   |-- repository
|   `-- service
|       `-- impl
|-- admission
|   |-- controller
|   |-- dto
|   |-- entity
|   |-- repository
|   `-- service
|       `-- impl
|-- tuition
|   |-- controller
|   |-- dto
|   |-- entity
|   |-- repository
|   `-- service
|       `-- impl
|-- scholarship
|   |-- controller
|   |-- dto
|   |-- entity
|   |-- repository
|   `-- service
|       `-- impl
|-- recommendation
|   |-- controller
|   |-- dto
|   |-- engine
|   |-- entity
|   |-- repository
|   |-- rule
|   |-- reason
|   `-- service
|       `-- impl
|-- shortlist
|   |-- controller
|   |-- dto
|   |-- entity
|   |-- repository
|   `-- service
|       `-- impl
`-- admin
    |-- controller
    |-- dto
    `-- service
        `-- impl
```

Package rule:

- Each feature package should contain controller, dto, entity, repository, service when needed.
- Service interfaces stay in service.
- Service implementations stay in service.impl.
- The `country` package is repurposed to manage Regions and Provinces in Vietnam (mapping the `Region` and `Province` entities).
- Shared enums should stay in common.enums.
- Recommendation scoring logic should stay in recommendation.engine or recommendation.rule.
- The Python-based data crawler is kept completely standalone outside this backend package structure to maintain high speed and independence.
- Do not create packages for future scope until they are actually needed. AI advisor, real-time integrated crawler, and counselor dashboards are intentionally excluded from the initial code structure.

---

# 9. Repository Structure

```text
UniPath/
|-- BACKEND/
|   |-- src/
|   |   |-- main/
|   |   |   |-- java/com/unipath/
|   |   |   |   |-- common/
|   |   |   |   |-- config/
|   |   |   |   |-- security/
|   |   |   |   |-- auth/
|   |   |   |   |-- user/
|   |   |   |   |-- profile/
|   |   |   |   |-- country/
|   |   |   |   |-- fieldofstudy/
|   |   |   |   |-- university/
|   |   |   |   |-- program/
|   |   |   |   |-- admission/
|   |   |   |   |-- tuition/
|   |   |   |   |-- scholarship/
|   |   |   |   |-- recommendation/
|   |   |   |   |-- shortlist/
|   |   |   |   `-- admin/
|   |   |   `-- resources/
|   |   |       |-- application.yml
|   |   |       `-- application.yml
|   |   `-- test/java/com/unipath/
|   `-- pom.xml
|-- FRONTEND/
|   |-- public/
|   `-- src/
|       |-- app/
|       |-- components/
|       |-- features/
|       |-- hooks/
|       |-- lib/
|       |-- services/
|       |-- styles/
|       `-- types/
|-- pom.xml
|-- SWR.md
`-- .gitignore
```


## 9.1. Environment Variables

Backend environment variables should be defined from `BACKEND/.env.example` or directly in IntelliJ run configuration.

```text
MONGODB_URI=mongodb://localhost:27017/unipath
MONGODB_DATABASE=unipath
JWT_SECRET=change-this-to-a-long-random-secret-key-at-least-32-characters
GOOGLE_CLIENT_ID=
FRONTEND_VERIFY_SUCCESS_URL=http://localhost:3000/auth/verify-success
FRONTEND_VERIFY_FAILED_URL=http://localhost:3000/auth/verify-failed
```

For local development, MongoDB can run locally or through MongoDB Atlas. The backend reads MongoDB settings from environment variables.
---

# 10. API Response Standard

## 10.1. Success Response

```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {},
  "timestamp": "2026-05-17T10:30:00"
}
```

## 10.2. Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "gpaValue",
      "message": "GPA value must not be empty"
    }
  ],
  "timestamp": "2026-05-17T10:30:00"
}
```

## 10.3. Pagination Response

```json
{
  "success": true,
  "message": "Data fetched successfully",
  "data": {
    "items": [],
    "page": 0,
    "size": 20,
    "totalItems": 200,
    "totalPages": 10
  },
  "timestamp": "2026-05-17T10:30:00"
}
```

---

# 11. Development Plan

## Phase 1: Backend Foundation

Goal: Create a runnable Spring Boot backend.

Tasks:

- Configure Maven project
- Configure application.yml
- Create ApiResponse
- Create GlobalExceptionHandler
- Create base enums
- Create health check API

Deliverable:

- Backend can start successfully
- Basic API response format works

## Phase 2: Auth and User

Goal: Allow users to register and log in.

Tasks:

- Create User entity
- Create Role enum
- Configure Spring Security
- Implement JWT
- Implement register and login APIs

Deliverable:

- Student and admin accounts can log in

## Phase 3: Core Education Data

Goal: Build and ingest the data needed for recommendations.

Tasks:

- Region and Province CRUD
- Living cost CRUD per city/province (VND)
- Field of study CRUD (standardized to Level IV catalog)
- University CRUD
- Program CRUD (including program types: STANDARD, HIGH_QUALITY, etc.)
- Admission requirement CRUD (methods: THPT exam blocks, Academic Record/Học bạ, ĐGNL)
- Tuition fee CRUD (VND)
- Build standalone Python crawler for 30-50 universities
- Implement crawled data upload API (`/api/v1/admin/crawler/upload`)

Deliverable:

- Admin can trigger the crawler or upload JSON data to populate 30-50 universities and programs
- Student can search regions, provinces, universities, and programs

## Phase 4: Student Profile

Goal: Store student academic data and preferences.

Tasks:

- Student profile CRUD
- Test score CRUD (IELTS, TOEFL, ĐGNL_HCM, ĐGNL_HN)
- Subject score CRUD (grades for THPT subjects for Học bạ and exam blocks)
- Preferred regions and provinces
- Preferred fields of study
- High school tier identification (for priority points)

Deliverable:

- Student can complete their profile, including academic transcript, exam block grades, and ĐGNL scores

## Phase 5: Recommendation Engine

Goal: Generate SAFE, MATCH, and REACH programs based on domestic admission rules.

Tasks:

- Filter programs by degree, field, region, and province
- Calculate Converted Admission Score ($S_{admission}$) for applicable methods (THPT block, Học bạ average, ĐGNL, Combined IELTS)
- Match Converted Score against program's historical benchmarks to calculate Academic score (65 points max)
- Calculate English score (15 points max)
- Calculate budget score (20 points max, comparing total estimated cost in VND to budget)
- Select the highest match score among all methods candidate is eligible for
- Generate match reasons detailing calculations per method
- Save recommendation result

Deliverable:

- Student can generate recommendations and understand which admission method yields their best chance of admission (SAFE, MATCH, REACH)

## Phase 6: Scholarship and Shortlist

Goal: Add entrance scholarship support and allow students to save programs.

Tasks:

- Scholarship CRUD
- Program-scholarship linking
- Scholarship suggestions in recommendation result
- Shortlist CRUD

Deliverable:

- Student can view scholarship options and save programs to their shortlist

## Phase 7: Frontend MVP

Goal: Build the minimal UI for the recommendation flow.

Screens:

- Login
- Register
- Student profile form
- Program search
- Recommendation result
- Program detail
- Shortlist
- Admin data management

---

# 12. Technical Notes

## 12.1. What To Avoid Early

- Do not build AI chatbot before rule-based recommendation works.
- Do not build real-time automatic crawler integrated in the Spring Boot backend; use the offline standalone Python crawler for MVP and import via JSON.
- Do not support too many regions/provinces at the beginning; focus on major universities in Hà Nội and TP. HCM (30-50 schools) for MVP.
- Do not store only average benchmarks; keep separate historical benchmarks for THPT, Học bạ, and ĐGNL methods for the last 3 years.
- Do not recommend only by university reputation; base it strictly on Converted Admission Scores ($S_{admission}$) and financial safety.

## 12.2. What To Build Carefully

- Converted Admission Score ($S_{admission}$) calculations for multiple distinct admission methods.
- Dynamic IELTS/TOEFL score conversion rules (customized per university đề án).
- Tuition and living cost estimation (VND) with a 10-15% annual growth rate simulation (TCO calculator).
- High school tier mapping (identifying specialized high schools to apply correct priority points).
- Detailed, friendly match reason explanations in Vietnamese.
- Crawled data ingestion and admin verification interface to guarantee data quality.

## 12.3. Testing Priority

Backend tests should focus on:

- Auth service
- Converted Admission Score ($S_{admission}$) calculations for THPT, Học bạ, and ĐGNL methods
- Priority score calculations (based on Region and Priority Candidate Group)
- English conversion rules and IELTS bonus score integration
- Recommendation scoring and best-method selection logic
- Budget scoring and TCO calculation
- Program filtering by region/province/field
- Shortlist ownership

---

# 13. Final Recommendation

For UniPath MVP, the main product promise should be:

```text
Student enters profile (grades, ĐGNL, IELTS) -> system recommends suitable domestic programs -> student understands why.
```

Everything else should support that promise. If this flow is reliable, the project already has strong value even without AI chatbot, real-time integrated crawler, or parent dashboard.
