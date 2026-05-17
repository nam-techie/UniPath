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

UniPath helps Vietnamese students find suitable universities and study programs based on their academic profile, English score, budget, preferred country, preferred major, and scholarship need.

The first version should focus on reliable recommendation logic, not on building a huge global education database.

## 1.2. MVP Success Criteria

The MVP is successful if it can prove these flows:

1. A student can register and log in.
2. A student can enter academic profile and study preferences.
3. The system can search and filter available programs.
4. The system can recommend programs as SAFE, MATCH, or REACH.
5. The system can explain why a program is recommended.
6. An admin can manage the education data used by recommendation.

## 1.3. Reduced MVP Scope

The MVP should focus on only the features needed to make recommendation work correctly.

### Must Have

- Authentication and authorization
- Student profile input
- Country data
- University data
- Field of study data
- Program data
- Admission requirement data
- Tuition fee and living cost data
- Scholarship data
- Rule-based recommendation engine
- Program shortlist
- Admin CRUD for core data

### Should Have

- Simple cost estimation
- Recommendation explanation based on rules
- Data source URL and last checked date
- Basic dashboard for admin data management

### Not In MVP

- AI chatbot
- AI-generated roadmap
- Parent dashboard
- Counselor dashboard
- Automatic crawler
- Bulk CSV/Excel import
- Email reminders
- Payment system
- Mobile app
- Full global university coverage

## 1.4. Initial Data Scope

Start small and curated.

- Countries: Canada, Australia, UK, Singapore, Japan
- Universities: 30-50
- Programs: 100-300
- Scholarships: 30-100
- Fields: Computer Science, Business, Engineering, Design, Finance, Hospitality, Health

This is enough to test the product logic without drowning in data entry.

---

# 2. User Roles

## 2.1. Student

Student is the main user.

Student can:

- Register and log in
- Create and update profile
- Enter GPA, English score, budget, target countries, target fields, and degree level
- View recommended programs
- View why each program is SAFE, MATCH, or REACH
- Save programs to shortlist

## 2.2. Admin

Admin manages the data used by the recommendation engine.

Admin can:

- Manage countries
- Manage universities
- Manage fields of study
- Manage programs
- Manage admission requirements
- Manage tuition fees
- Manage living costs
- Manage scholarships

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
-> Student enters GPA and English score
-> Student selects degree level
-> Student selects preferred countries
-> Student selects preferred fields of study
-> Student enters yearly budget
-> Student requests recommendations
-> System filters eligible programs
-> System calculates match score
-> System categorizes programs as SAFE, MATCH, or REACH
-> Student views recommendation explanation
-> Student saves interesting programs to shortlist
```

## 3.2. Admin Data Flow

```text
Admin logs in
-> Admin creates countries and fields of study
-> Admin creates universities
-> Admin creates programs
-> Admin adds admission requirements
-> Admin adds tuition fees and living costs
-> Admin adds scholarships
-> Student recommendation can use verified data
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

- GPA value
- GPA scale
- English test type
- English test score
- Degree level
- Preferred countries
- Preferred fields
- Yearly budget
- Scholarship need

## 4.4. Education Data Module

Purpose: Manage countries, universities, fields, programs, requirements, tuition fees, and living costs.

Public APIs:

```http
GET /api/v1/countries
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
POST   /api/v1/admin/countries
PUT    /api/v1/admin/countries/{id}
DELETE /api/v1/admin/countries/{id}

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
- Country
- Match score
- Match category
- Estimated yearly cost
- Scholarship suggestions
- Match reasons

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
SAFE:
- Student GPA and English score are clearly above requirements
- Estimated cost is within budget or close to budget

MATCH:
- Student meets most key requirements
- Some factors may be slightly below ideal but still reasonable

REACH:
- Student is below one or more important requirements
- Program is still shown because it may be possible with improvement or scholarship
```

## 5.2. Scoring Weights

```text
Total Score = 100

GPA Match: 30
English Match: 20
Budget Match: 20
Field Preference Match: 15
Country Preference Match: 10
Scholarship Support: 5
```

## 5.3. GPA Rule

```text
If program has no minimum GPA:
  GPA score = 20

If student GPA >= minimum GPA + 0.5:
  GPA score = 30

If student GPA >= minimum GPA:
  GPA score = 24

If student GPA is within 0.5 below minimum GPA:
  GPA score = 12

If student GPA is more than 0.5 below minimum GPA:
  GPA score = 0
```

All GPA values should be normalized to a 4.0 scale before scoring.

## 5.4. English Rule

```text
If program has no English requirement:
  English score = 15

If student meets or exceeds requirement:
  English score = 20

If student is slightly below requirement:
  English score = 10

If student is far below requirement:
  English score = 0
```

For IELTS, slightly below means 0.5 band below requirement.

## 5.5. Budget Rule

```text
estimatedYearlyCost = tuitionPerYear + livingCostPerYear

If yearlyBudget >= estimatedYearlyCost:
  Budget score = 20

If yearlyBudget >= 80% of estimatedYearlyCost:
  Budget score = 12

If yearlyBudget >= 60% of estimatedYearlyCost:
  Budget score = 6

Otherwise:
  Budget score = 0
```

Scholarships should be shown as support, but MVP should not subtract uncertain scholarship amounts from cost by default.

## 5.6. Category Threshold

```text
SAFE: 80-100
MATCH: 60-79
REACH: 40-59
HIDDEN: below 40
```

The MVP should not show programs below 40 unless the user explicitly asks to view low-fit programs.

## 5.7. Recommendation Explanation

The system should generate rule-based explanations, not AI explanations in MVP.

Example:

```text
This program is a MATCH because your GPA meets the minimum requirement, your IELTS score is 0.5 below the preferred score, and the estimated yearly cost is close to your budget.
```

---

# 6. Data Model

## 6.1. Entity Relationship Overview

```text
User 1-1 StudentProfile
User 1-n SavedShortlist

Country 1-n University
Country 1-n LivingCost

University 1-n Program
FieldOfStudy 1-n Program

Program 1-1 AdmissionRequirement
Program 1-n ProgramTuitionFee
Program n-n Scholarship through ProgramScholarship

StudentProfile 1-n StudentTestScore
StudentProfile n-n Country through StudentPreferredCountry
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
- role
- status
- createdAt
- updatedAt

## 6.3. StudentProfile

Fields:

- id
- userId
- gpaValue
- gpaScale
- normalizedGpa
- graduationYear
- targetDegreeLevel
- yearlyBudgetAmount
- budgetCurrency
- scholarshipNeed
- careerGoal
- createdAt
- updatedAt

## 6.4. StudentTestScore

Fields:

- id
- studentProfileId
- testType
- scoreValue
- maxScore
- testDate

Examples:

- IELTS 6.5
- TOEFL 90
- SAT 1350

## 6.5. StudentPreferredCountry

Fields:

- id
- studentProfileId
- countryId

## 6.6. StudentPreferredField

Fields:

- id
- studentProfileId
- fieldOfStudyId

## 6.7. Country

Fields:

- id
- name
- code
- currencyCode
- studyInfo
- visaDifficulty
- status

## 6.8. LivingCost

Fields:

- id
- countryId
- cityName
- minAmountPerYear
- maxAmountPerYear
- currencyCode
- sourceUrl
- lastCheckedAt

## 6.9. University

Fields:

- id
- countryId
- name
- city
- websiteUrl
- institutionType
- ranking
- description
- status

## 6.10. FieldOfStudy

Fields:

- id
- parentId
- name
- description
- status

## 6.11. Program

Fields:

- id
- universityId
- fieldOfStudyId
- name
- degreeLevel
- studyMode
- durationMonths
- teachingLanguage
- programUrl
- description
- status

## 6.12. AdmissionRequirement

Fields:

- id
- programId
- minimumGpa
- gpaScale
- minimumIelts
- minimumToefl
- minimumSat
- portfolioRequired
- interviewRequired
- note
- sourceUrl
- lastCheckedAt

## 6.13. ProgramTuitionFee

Fields:

- id
- programId
- amount
- currencyCode
- feePeriod
- studentType
- sourceUrl
- lastCheckedAt

Important rule:

- Store original currency and original amount.
- Convert currency only when displaying or estimating.

## 6.14. Scholarship

Fields:

- id
- name
- providerName
- providerType
- countryId
- universityId
- degreeLevel
- coverageType
- amount
- currencyCode
- minimumGpa
- minimumIelts
- deadline
- description
- sourceUrl
- lastCheckedAt
- status

## 6.15. ProgramScholarship

Fields:

- id
- programId
- scholarshipId

## 6.16. RecommendationResult

Fields:

- id
- studentProfileId
- generatedAt
- totalProgramsConsidered
- note

## 6.17. RecommendationDetail

Fields:

- id
- recommendationResultId
- programId
- matchScore
- matchCategory
- estimatedYearlyCost
- costCurrency
- explanation

## 6.18. MatchReason

Fields:

- id
- recommendationDetailId
- reasonType
- score
- message

Examples:

- GPA_MATCH
- ENGLISH_MATCH
- BUDGET_MATCH
- FIELD_MATCH
- COUNTRY_MATCH
- SCHOLARSHIP_SUPPORT

## 6.19. SavedShortlist

Fields:

- id
- userId
- programId
- status
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
MASTER
PHD
DIPLOMA
CERTIFICATE
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
SAT
ACT
```

## 7.8. CurrencyCode

```text
VND
USD
CAD
AUD
GBP
SGD
JPY
```

## 7.9. FeePeriod

```text
PER_YEAR
PER_SEMESTER
FULL_PROGRAM
```

## 7.10. StudentType

```text
INTERNATIONAL
DOMESTIC
```

## 7.11. ScholarshipProviderType

```text
UNIVERSITY
GOVERNMENT
PRIVATE
ORGANIZATION
```

## 7.12. ScholarshipCoverageType

```text
FULL
PARTIAL
TUITION_ONLY
LIVING_COST
FIXED_AMOUNT
```

## 7.13. MatchCategory

```text
SAFE
MATCH
REACH
```

## 7.14. MatchReasonType

```text
GPA_MATCH
ENGLISH_MATCH
BUDGET_MATCH
FIELD_MATCH
COUNTRY_MATCH
SCHOLARSHIP_SUPPORT
```

## 7.15. ShortlistStatus

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
- Shared enums should stay in common.enums.
- Recommendation scoring logic should stay in recommendation.engine or recommendation.rule.
- Do not create packages for future scope until they are actually needed. AI advisor, data ingestion, data source verification dashboard, and application task tracking are intentionally excluded from the initial code structure.

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

Goal: Build the data needed for recommendations.

Tasks:

- Country CRUD
- Living cost CRUD
- Field of study CRUD
- University CRUD
- Program CRUD
- Admission requirement CRUD
- Tuition fee CRUD

Deliverable:

- Admin can create enough education data for recommendations
- Student can search countries, universities, and programs

## Phase 4: Student Profile

Goal: Store student academic data and preferences.

Tasks:

- Student profile CRUD
- Test score CRUD
- Preferred countries
- Preferred fields
- GPA normalization

Deliverable:

- Student can complete recommendation profile

## Phase 5: Recommendation Engine

Goal: Generate SAFE, MATCH, and REACH programs.

Tasks:

- Filter programs by degree, field, and country
- Calculate GPA score
- Calculate English score
- Calculate budget score
- Calculate field and country preference score
- Generate match reasons
- Save recommendation result

Deliverable:

- Student can generate recommendations and understand why each program is suggested

## Phase 6: Scholarship and Shortlist

Goal: Add scholarship support and allow students to save programs.

Tasks:

- Scholarship CRUD
- Program-scholarship linking
- Scholarship suggestions in recommendation result
- Shortlist CRUD

Deliverable:

- Student can view scholarship options and save programs

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
- Do not build automatic crawler before admin CRUD works.
- Do not support too many countries at the beginning.
- Do not store only converted tuition values.
- Do not recommend only by university ranking.

## 12.2. What To Build Carefully

- GPA normalization
- English score comparison
- Tuition and living cost estimation
- Program-level recommendation
- Match reason explanation
- Admin data quality

## 12.3. Testing Priority

Backend tests should focus on:

- Auth service
- GPA normalization
- Recommendation scoring
- Budget scoring
- Program filtering
- Shortlist ownership

---

# 13. Final Recommendation

For UniPath MVP, the main product promise should be:

```text
Student enters profile -> system recommends suitable programs -> student understands why.
```

Everything else should support that promise. If this flow is reliable, the project already has strong value even without AI chatbot, crawler, parent dashboard, or counselor dashboard.
