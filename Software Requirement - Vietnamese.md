# UniPath - Đặc tả yêu cầu phần mềm

> Tên dự án: UniPath  
> Loại sản phẩm: Nền tảng gợi ý trường đại học và chương trình học  
> Mục tiêu chính: Học sinh/sinh viên nhập hồ sơ học tập và nhận danh sách chương trình phù hợp  
> Người dùng chính: Học sinh, sinh viên Việt Nam và quản trị viên  
> Kiến trúc: Modular monolith backend + frontend tách riêng  
> Backend: Java 21, Spring Boot, Spring Security, Spring Data MongoDB, MongoDB  
> Frontend: Next.js, React, TailwindCSS, shadcn/ui  

---

# 1. Định hướng sản phẩm

## 1.1. Tầm nhìn sản phẩm

UniPath giúp học sinh, sinh viên Việt Nam tìm các trường và chương trình học phù hợp dựa trên hồ sơ học tập, điểm tiếng Anh, ngân sách, quốc gia mong muốn, ngành học mong muốn và nhu cầu học bổng.

Phiên bản đầu tiên cần tập trung vào luồng gợi ý đáng tin cậy, không cố xây một cơ sở dữ liệu giáo dục toàn cầu quá lớn.

## 1.2. Tiêu chí thành công của MVP

MVP được xem là thành công nếu chứng minh được các luồng sau:

1. Người dùng có thể đăng ký và đăng nhập.
2. Người dùng có thể nhập hồ sơ học tập và nguyện vọng du học.
3. Hệ thống có thể tìm kiếm và lọc chương trình học.
4. Hệ thống có thể gợi ý chương trình theo nhóm SAFE, MATCH, REACH.
5. Hệ thống giải thích được vì sao một chương trình được gợi ý.
6. Admin có thể quản lý dữ liệu giáo dục dùng cho gợi ý.

## 1.3. Phạm vi MVP

### Bắt buộc có

- Xác thực và phân quyền.
- Nhập hồ sơ học tập của student.
- Dữ liệu quốc gia.
- Dữ liệu trường đại học.
- Dữ liệu lĩnh vực/ngành học.
- Dữ liệu chương trình học.
- Dữ liệu yêu cầu đầu vào.
- Dữ liệu học phí và chi phí sinh hoạt.
- Dữ liệu học bổng.
- Recommendation engine dựa trên rule.
- Shortlist chương trình yêu thích.
- Admin CRUD cho dữ liệu cốt lõi.

### Nên có

- Ước tính chi phí đơn giản.
- Giải thích gợi ý bằng rule.
- URL nguồn dữ liệu và ngày kiểm tra gần nhất.
- Dashboard cơ bản cho admin quản lý dữ liệu.

### Không thuộc MVP

- AI chatbot.
- AI tạo roadmap.
- Dashboard cho phụ huynh.
- Dashboard cho counselor.
- Crawler tự động.
- Import CSV/Excel hàng loạt.
- Email reminder.
- Thanh toán.
- Mobile app.
- Bao phủ toàn bộ trường trên thế giới.

## 1.4. Phạm vi dữ liệu ban đầu

Nên bắt đầu nhỏ và có kiểm soát:

- Quốc gia: Canada, Australia, UK, Singapore, Japan.
- Trường: 30-50 trường.
- Chương trình: 100-300 chương trình.
- Học bổng: 30-100 học bổng.
- Ngành: Computer Science, Business, Engineering, Design, Finance, Hospitality, Health.

---

# 2. Vai trò người dùng

## 2.1. Student

Student là người dùng chính của hệ thống.

Student có thể:

- Đăng ký và đăng nhập.
- Tạo và cập nhật hồ sơ.
- Nhập GPA, điểm tiếng Anh, ngân sách, quốc gia mong muốn, ngành học mong muốn và bậc học muốn apply.
- Xem chương trình được gợi ý.
- Xem lý do chương trình được phân loại SAFE, MATCH hoặc REACH.
- Lưu chương trình vào shortlist.

## 2.2. Admin

Admin quản lý dữ liệu dùng bởi recommendation engine.

Admin có thể:

- Quản lý quốc gia.
- Quản lý trường đại học.
- Quản lý ngành học.
- Quản lý chương trình học.
- Quản lý yêu cầu đầu vào.
- Quản lý học phí.
- Quản lý chi phí sinh hoạt.
- Quản lý học bổng.

---

# 3. Luồng người dùng cốt lõi

## 3.1. Luồng gợi ý chương trình cho student

```text
Student đăng ký hoặc đăng nhập
-> Student tạo hồ sơ
-> Student chọn trạng thái học hiện tại
-> Student chọn bậc học muốn apply
-> Student nhập GPA và điểm tiếng Anh
-> Student chọn quốc gia mong muốn
-> Student chọn ngành học mong muốn
-> Student nhập ngân sách hằng năm
-> Student yêu cầu hệ thống gợi ý
-> Hệ thống lọc chương trình phù hợp
-> Hệ thống tính match score
-> Hệ thống phân loại SAFE, MATCH, REACH
-> Student xem lý do gợi ý
-> Student lưu chương trình quan tâm vào shortlist
```

## 3.2. Luồng quản lý dữ liệu của admin

```text
Admin đăng nhập
-> Admin tạo country và field of study
-> Admin tạo university
-> Admin tạo program
-> Admin thêm admission requirement
-> Admin thêm tuition fee và living cost
-> Admin thêm scholarship
-> Recommendation engine dùng dữ liệu đã xác minh
```

---

# 4. Phân loại applicant

UniPath không nên xem mọi student là một loại người dùng giống nhau. Học sinh cấp 3, sinh viên đại học và người đã học sau đại học có nhu cầu apply khác nhau.

## 4.1. Hai khái niệm quan trọng

```text
currentEducationStage: người dùng hiện đang ở đâu trong hành trình học tập
targetDegreeLevel: người dùng muốn apply bậc học nào
```

Ví dụ:

- Học sinh lớp 12 muốn apply Bachelor:
  - `currentEducationStage = HIGH_SCHOOL`
  - `targetDegreeLevel = BACHELOR`
- Sinh viên đã có bằng cử nhân muốn apply Master:
  - `currentEducationStage = UNDERGRADUATE`
  - `targetDegreeLevel = MASTER`
- Người đã có Master muốn apply PhD:
  - `currentEducationStage = POSTGRADUATE`
  - `targetDegreeLevel = PHD`

## 4.2. Nhóm High School -> Bachelor

Nhóm này thường quan tâm:

- Ngành học phù hợp.
- Quốc gia phù hợp.
- Trường phù hợp với GPA cấp 3.
- IELTS/TOEFL yêu cầu.
- SAT/ACT nếu cần.
- Học phí và chi phí sinh hoạt.
- Học bổng.
- Pathway hoặc foundation nếu chưa đủ điều kiện trực tiếp.

Dữ liệu cần nhập:

- GPA cấp 3.
- Thang GPA.
- Năm tốt nghiệp hoặc năm dự kiến tốt nghiệp.
- Điểm tiếng Anh.
- SAT/ACT nếu có.
- Ngành mong muốn.
- Quốc gia mong muốn.
- Ngân sách hằng năm.
- Nhu cầu học bổng.

## 4.3. Nhóm Undergraduate -> Master

Nhóm này không chỉ cần GPA mà còn cần kiểm tra độ phù hợp giữa ngành đã học và ngành muốn học.

Nhóm này thường quan tâm:

- Bachelor major có liên quan với chương trình Master không.
- GPA đại học có đủ không.
- Có cần GRE/GMAT không.
- Có cần kinh nghiệm làm việc không.
- Có cần portfolio không.
- Có hỗ trợ conversion Master không.
- Học phí, học bổng và cơ hội việc làm sau tốt nghiệp.

Dữ liệu cần nhập:

- Tên trường đại học đã học.
- Ngành đại học.
- Bằng đã có hoặc sắp có.
- GPA đại học.
- Thang GPA.
- Năm tốt nghiệp.
- Điểm tiếng Anh.
- GRE/GMAT nếu có.
- Kinh nghiệm làm việc.
- Portfolio nếu có.
- Ngành và quốc gia mong muốn.
- Ngân sách hằng năm.

## 4.4. Nhóm Postgraduate -> PhD

PhD không nên được gợi ý giống Bachelor hoặc Master coursework. Với PhD, yếu tố quan trọng là research fit, supervisor, funding và năng lực nghiên cứu.

Nhóm này thường quan tâm:

- Research area có phù hợp không.
- Có supervisor/lab phù hợp không.
- Có funding, scholarship hoặc stipend không.
- Có cần research proposal không.
- Có cần publication không.
- Có cần reference letters không.
- Yêu cầu tiếng Anh.

Dữ liệu cần nhập:

- Bằng cao nhất đã có.
- Ngành đã học.
- GPA của bằng liên quan nhất.
- Thesis title.
- Research interests.
- Publications nếu có.
- Kinh nghiệm nghiên cứu.
- Trạng thái research proposal.
- Từ khóa supervisor mong muốn.
- Nhu cầu funding.

Quyết định MVP:

- Bachelor và Master coursework là phạm vi chính.
- PhD được lưu hồ sơ và hỗ trợ đánh giá giới hạn.
- Không nên claim recommend PhD mạnh nếu chưa có dữ liệu supervisor, research area và funding.

---

# 5. Module chức năng

## 5.1. Auth Module

Mục đích: Xử lý đăng ký, đăng nhập, JWT authentication và phân quyền.

API:

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh-token
POST /api/v1/auth/logout
GET  /api/v1/auth/me
```

Ghi chú MVP:

- Forgot password có thể làm sau.
- Email verification có thể bật trong bản đầu nếu Auth đã sẵn sàng.

## 5.2. User Module

Mục đích: Lưu danh tính tài khoản và role.

API:

```http
GET /api/v1/users/me
GET /api/v1/admin/users
```

## 5.3. Student Profile Module

Mục đích: Lưu hồ sơ học tập và nguyện vọng apply của student.

API:

```http
GET  /api/v1/student-profiles/me
POST /api/v1/student-profiles
PUT  /api/v1/student-profiles/me

POST   /api/v1/student-profiles/me/test-scores
PUT    /api/v1/student-profiles/me/test-scores/{id}
DELETE /api/v1/student-profiles/me/test-scores/{id}
```

Field quan trọng:

- Current education stage.
- Target degree level.
- GPA value.
- GPA scale.
- Normalized GPA.
- Previous institution.
- Previous major.
- English test type.
- English test score.
- Preferred countries.
- Preferred fields.
- Yearly budget.
- Scholarship need.
- Work experience.
- Research interests.
- Research proposal status.

Quy tắc profile completeness:

- Bachelor recommendation cần: current stage, target degree, GPA, GPA scale, preferred field, budget, budget currency.
- Master recommendation cần: current stage, target degree, bachelor major, bachelor GPA, GPA scale, preferred field, budget, budget currency.
- PhD recommendation cần: current stage, target degree, research interests, highest previous degree, academic GPA, funding preference.

## 5.4. Education Data Module

Mục đích: Quản lý quốc gia, trường, ngành, chương trình, yêu cầu đầu vào, học phí và chi phí sinh hoạt.

Public API:

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

Admin API:

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

## 5.5. Scholarship Module

Mục đích: Lưu học bổng và liên kết học bổng với chương trình.

Public API:

```http
GET /api/v1/scholarships
GET /api/v1/scholarships/{id}
GET /api/v1/programs/{programId}/scholarships
```

Admin API:

```http
POST   /api/v1/admin/scholarships
PUT    /api/v1/admin/scholarships/{id}
DELETE /api/v1/admin/scholarships/{id}
POST   /api/v1/admin/programs/{programId}/scholarships/{scholarshipId}
DELETE /api/v1/admin/programs/{programId}/scholarships/{scholarshipId}
```

## 5.6. Recommendation Module

Mục đích: Tạo danh sách chương trình phù hợp từ hồ sơ student và dữ liệu giáo dục.

API:

```http
POST /api/v1/recommendations/generate
GET  /api/v1/recommendations/me
GET  /api/v1/recommendations/{id}
```

Output:

- Program.
- University.
- Country.
- Match score.
- Match category.
- Estimated yearly cost.
- Scholarship suggestions.
- Match reasons.

## 5.7. Shortlist Module

Mục đích: Cho student lưu chương trình quan tâm.

API:

```http
GET    /api/v1/shortlists/me
POST   /api/v1/shortlists
PUT    /api/v1/shortlists/{id}
DELETE /api/v1/shortlists/{id}
```

---

# 6. Recommendation Rules

## 6.1. Match Category

```text
SAFE:
- GPA và điểm tiếng Anh cao hơn rõ rệt so với yêu cầu
- Chi phí nằm trong ngân sách hoặc gần ngân sách

MATCH:
- Student đáp ứng phần lớn yêu cầu quan trọng
- Một số yếu tố có thể thấp hơn một chút nhưng vẫn hợp lý

REACH:
- Student thấp hơn một hoặc nhiều yêu cầu quan trọng
- Vẫn hiển thị vì có thể cải thiện hoặc có học bổng hỗ trợ
```

## 6.2. Scoring cho Bachelor và coursework thông thường

```text
Total Score = 100

GPA Match: 30
English Match: 20
Budget Match: 20
Field Preference Match: 15
Country Preference Match: 10
Scholarship Support: 5
```

## 6.3. Scoring cho Master coursework

```text
Total Score = 100

Previous GPA Match: 25
Major / prerequisite fit: 20
English Match: 20
Budget Match: 15
Field Preference Match: 10
Country Preference Match: 5
Work Experience / Portfolio / Test Support: 5
```

## 6.4. Scoring cho PhD/research degree

```text
Total Score = 100

Research fit: 30
Supervisor / research area availability: 20
Funding fit: 20
Academic record: 15
English Match: 10
Publication / research experience support: 5
```

Ghi chú: PhD chỉ nên dùng scoring này khi database đã có dữ liệu research area, supervisor và funding.

## 6.5. GPA Rule

```text
Nếu program không có minimum GPA:
  GPA score = 20

Nếu student GPA >= minimum GPA + 0.5:
  GPA score = 30

Nếu student GPA >= minimum GPA:
  GPA score = 24

Nếu student GPA thấp hơn minimum GPA trong khoảng 0.5:
  GPA score = 12

Nếu student GPA thấp hơn minimum GPA hơn 0.5:
  GPA score = 0
```

Tất cả GPA cần được chuẩn hóa về thang 4.0 trước khi chấm điểm.

## 6.6. English Rule

```text
Nếu program không có yêu cầu tiếng Anh:
  English score = 15

Nếu student đạt hoặc vượt yêu cầu:
  English score = 20

Nếu student thấp hơn nhẹ:
  English score = 10

Nếu student thấp hơn nhiều:
  English score = 0
```

Với IELTS, thấp hơn nhẹ nghĩa là thấp hơn 0.5 band.

## 6.7. Budget Rule

```text
estimatedYearlyCost = tuitionPerYear + livingCostPerYear

Nếu yearlyBudget >= estimatedYearlyCost:
  Budget score = 20

Nếu yearlyBudget >= 80% estimatedYearlyCost:
  Budget score = 12

Nếu yearlyBudget >= 60% estimatedYearlyCost:
  Budget score = 6

Ngược lại:
  Budget score = 0
```

Học bổng nên được hiển thị như hỗ trợ, nhưng MVP không nên tự trừ học bổng chưa chắc chắn khỏi chi phí.

## 6.8. Category Threshold

```text
SAFE: 80-100
MATCH: 60-79
REACH: 40-59
HIDDEN: dưới 40
```

MVP không nên hiển thị chương trình dưới 40 điểm trừ khi user chủ động muốn xem chương trình ít phù hợp.

## 6.9. Recommendation Explanation

Hệ thống dùng rule-based explanation, không dùng AI explanation trong MVP.

Ví dụ:

```text
Chương trình này là MATCH vì GPA của bạn đạt yêu cầu tối thiểu, IELTS thấp hơn preferred score 0.5 band, và chi phí hằng năm gần với ngân sách của bạn.
```

---

# 7. Data Model

## 7.1. Quan hệ entity tổng quan

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
StudentProfile 0-1 HighSchoolAcademicProfile
StudentProfile 0-1 UndergraduateAcademicProfile
StudentProfile 0-1 PostgraduateAcademicProfile
StudentProfile n-n Country through StudentPreferredCountry
StudentProfile n-n FieldOfStudy through StudentPreferredField

StudentProfile 1-n RecommendationResult
RecommendationResult 1-n RecommendationDetail
RecommendationDetail 1-n MatchReason
```

## 7.2. StudentProfile

Fields:

- id
- userId
- currentEducationStage
- gpaValue
- gpaScale
- normalizedGpa
- graduationYear
- highestCompletedDegreeLevel
- targetDegreeLevel
- targetProgramTrack
- yearlyBudgetAmount
- budgetCurrency
- scholarshipNeed
- careerGoal
- workExperienceMonths
- portfolioUrl
- researchInterests
- researchProposalStatus
- fundingNeed
- createdAt
- updatedAt

## 7.3. HighSchoolAcademicProfile

Fields:

- id
- studentProfileId
- schoolName
- curriculumType
- highSchoolGpa
- highSchoolGpaScale
- normalizedHighSchoolGpa
- predictedGraduationYear
- nationalExamScore
- academicAwards

## 7.4. UndergraduateAcademicProfile

Fields:

- id
- studentProfileId
- institutionName
- majorName
- degreeName
- gpaValue
- gpaScale
- normalizedGpa
- graduationYear
- workExperienceMonths
- portfolioUrl
- prerequisiteSummary

## 7.5. PostgraduateAcademicProfile

Fields:

- id
- studentProfileId
- institutionName
- majorName
- degreeName
- gpaValue
- gpaScale
- normalizedGpa
- graduationYear
- thesisTitle
- researchInterests
- publications
- researchExperienceMonths
- researchProposalStatus
- preferredSupervisorKeywords

## 7.6. StudentTestScore

Fields:

- id
- studentProfileId
- testType
- scoreValue
- maxScore
- testDate

Ví dụ:

- IELTS 6.5
- TOEFL 90
- SAT 1350
- GRE 320
- GMAT 680
- PTE 65

## 7.7. Program

Fields:

- id
- universityId
- fieldOfStudyId
- name
- degreeLevel
- programTrack
- studyMode
- durationMonths
- teachingLanguage
- programUrl
- description
- status

## 7.8. AdmissionRequirement

Fields:

- id
- programId
- minimumGpa
- gpaScale
- minimumIelts
- minimumToefl
- minimumSat
- minimumGre
- minimumGmat
- requiredPreviousDegreeLevel
- requiredPreviousFieldRelated
- minimumWorkExperienceMonths
- portfolioRequired
- interviewRequired
- researchProposalRequired
- supervisorAcceptanceRequired
- referenceLetterCount
- fundingProofRequired
- note
- sourceUrl
- lastCheckedAt

---

# 8. Enum chính

## 8.1. UserRole

```text
STUDENT
ADMIN
```

## 8.2. DegreeLevel

```text
BACHELOR
MASTER
PHD
DIPLOMA
CERTIFICATE
```

## 8.3. CurrentEducationStage

```text
HIGH_SCHOOL
UNDERGRADUATE
POSTGRADUATE
WORKING_PROFESSIONAL
```

## 8.4. ProgramTrack

```text
COURSEWORK
RESEARCH
CONVERSION
PATHWAY
PROFESSIONAL
```

## 8.5. ResearchProposalStatus

```text
NOT_STARTED
DRAFT
READY
SUBMITTED
```

## 8.6. TestType

```text
IELTS
TOEFL
SAT
ACT
GRE
GMAT
PTE
DUOLINGO
```

## 8.7. MatchCategory

```text
SAFE
MATCH
REACH
```

## 8.8. MatchReasonType

```text
GPA_MATCH
ENGLISH_MATCH
BUDGET_MATCH
FIELD_MATCH
COUNTRY_MATCH
SCHOLARSHIP_SUPPORT
```

---

# 9. Kế hoạch phát triển

## Phase 1: Backend Foundation

Mục tiêu: Backend Spring Boot chạy được.

Tasks:

- Cấu hình Maven project.
- Cấu hình application.yml.
- Tạo ApiResponse.
- Tạo GlobalExceptionHandler.
- Tạo enum cơ bản.
- Tạo health check API.

## Phase 2: Auth and User

Mục tiêu: User có thể đăng ký và đăng nhập.

Tasks:

- Tạo User entity.
- Tạo role enum.
- Cấu hình Spring Security.
- Implement JWT.
- Implement register và login API.

## Phase 3: Core Education Data

Mục tiêu: Có dữ liệu nền để recommendation hoạt động.

Tasks:

- Country CRUD.
- Living cost CRUD.
- Field of study CRUD.
- University CRUD.
- Program CRUD.
- Admission requirement CRUD.
- Tuition fee CRUD.

## Phase 4: Student Profile

Mục tiêu: Lưu hồ sơ học tập và nguyện vọng theo từng loại applicant.

Tasks:

- Student profile CRUD.
- Xử lý current education stage và target degree level.
- Lưu stage-specific academic profile.
- Test score CRUD.
- Preferred countries.
- Preferred fields.
- GPA normalization.
- Validate profile completeness theo target degree.
- Thêm field đặc thù cho Master: prerequisite, work experience, portfolio.
- Thêm field đặc thù cho PhD: research interests, proposal, publications, references, funding.

Deliverable:

- Student có thể hoàn thiện hồ sơ đúng với stage của mình.
- Bachelor và Master coursework profile dùng trực tiếp cho recommendation.
- PhD profile được lưu và đánh giá giới hạn cho tới khi hệ thống có data supervisor/research/funding.

## Phase 5: Recommendation Engine

Mục tiêu: Sinh danh sách chương trình SAFE, MATCH, REACH.

Tasks:

- Filter program theo degree, field, country.
- Tính GPA score.
- Tính English score.
- Tính budget score.
- Tính field và country preference score.
- Tính major/prerequisite fit cho Master.
- Tạo match reasons.
- Lưu recommendation result.

## Phase 6: Scholarship and Shortlist

Mục tiêu: Thêm học bổng và shortlist.

Tasks:

- Scholarship CRUD.
- Link program-scholarship.
- Gợi ý học bổng trong recommendation result.
- Shortlist CRUD.

## Phase 7: Frontend MVP

Mục tiêu: Xây UI tối thiểu cho recommendation flow.

Screens:

- Login.
- Register.
- Student profile form theo applicant stage.
- Program search.
- Recommendation result.
- Program detail.
- Shortlist.
- Admin data management.

---

# 10. Ghi chú kỹ thuật

## 10.1. Cần tránh ở giai đoạn đầu

- Không làm AI chatbot trước khi rule-based recommendation chạy tốt.
- Không làm crawler tự động trước khi admin CRUD ổn.
- Không hỗ trợ quá nhiều quốc gia ngay từ đầu.
- Không chỉ lưu học phí đã convert tiền tệ.
- Không recommend chỉ dựa vào ranking trường.
- Không recommend PhD như Bachelor/Master nếu chưa có dữ liệu supervisor và research fit.

## 10.2. Cần làm kỹ

- GPA normalization.
- English score comparison.
- Tuition và living cost estimation.
- Program-level recommendation.
- Match reason explanation.
- Master major/prerequisite fit.
- PhD research/funding fit khi mở rộng.
- Admin data quality.

## 10.3. Test ưu tiên

Backend tests nên tập trung vào:

- Auth service.
- GPA normalization.
- Recommendation scoring.
- Budget scoring.
- Program filtering.
- Profile completeness theo applicant stage.
- Shortlist ownership.

---

# 11. Kết luận

Lời hứa sản phẩm của UniPath MVP là:

```text
Student nhập hồ sơ -> hệ thống gợi ý chương trình phù hợp -> student hiểu vì sao được gợi ý.
```

Thiết kế profile cần đủ rộng để phục vụ ba nhóm:

- Học sinh cấp 3 apply Bachelor.
- Sinh viên hoặc người đã có Bachelor apply Master.
- Người đã học sau đại học apply PhD/research.

Tuy nhiên, phạm vi triển khai thực tế nên ưu tiên Bachelor và Master coursework trước. PhD nên được chuẩn bị trong data model nhưng không nên là lời hứa recommendation mạnh trong MVP nếu chưa có dữ liệu nghiên cứu, supervisor và funding.
