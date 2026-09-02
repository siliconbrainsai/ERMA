Act as a Senior Data Engineer, BI Architect, Python Developer, HR Analytics Expert, and Streamlit Dashboard Specialist.

I need to build a complete Enterprise Resource Management Analytics Dashboard using Python.

Dataset Source:
Excel file containing Employee, Project, Allocation, Skills, Billing, Revenue, Bench, BW, Location, Geography, Customer, Manager, Experience, Certification, Travel, Utilization, and Project information.

Columns available include:

Employee Information:
EMPLID, EMP_NAME, EMPLOYMENT_STATUS, EMAIL_ID, GENDER,
HIRE_DATE, BAND, JOB_CODE_DESCRIPTION,
TOTAL_EXPERIENCE, TECHM_EXPERIENCE,
CURRENT_LOCATION, CURRENT_COUNTRY,
BASE_LOCATION, BASE_COUNTRY

Organization Hierarchy:
EMPLOYEE_IBU,
EMPLOYEE_IBG,
EMPLOYEE_PRACTICE,
EMPLOYEE_SERVICE_LINE,
EMPLOYEE_BUSINESS_UNIT,
EMP_IBU_HEAD,
EMP_IBG_HEAD,
EMP_PRACTICE_HEAD

Project Information:
PROJECT_ID,
PROJECT_DESCRIPTION,
PROJECT_TYPE,
PROJECT_TECHNOLOGY,
PROJECT_PRICING_MODEL,
PROJECT_PRICING_TYPE,
PROJECT_MAIN_TYPE,
PROJECT_TYPE_DESC,
PRIMARY_PROJECT_ID

Resource Allocation:
ALLOCATION_PERCENTAGE,
TOTAL_ALLOC_PERC,
ALLOCATED_PROJECT_COUNT,
START_DATE,
END_DATE

Revenue & Billing:
BILLABLITY_STATUS,
REVENUE_STATUS,
REVISED_REVENUE_STATUS,
NON_BILLABLE_DETAILS

Bench / Pipeline:
BUSINESS_WAIT_AGE,
PIPELINE_AGEING_DAYS,
BW_STATUS,
BW_CATEGORY,
CUMM_BW_DAYS

Customer Information:
CUSTOMER_ID,
CUSTOMER_NAME,
CUSTOMER_GROUP,
VERTICAL_CUSTOMER,
SUB_VERTICAL_CUSTOMER

Manager Hierarchy:
SUPERVISOR_NAME,
PM_NAME,
SPM_NAME,
PROGRAM_MANAGER_NAME

Skills:
TECH_SKILL_1,
TECH_SKILL_2,
TECH_SKILL_3,
TECH_SKILL_4,
DOMAIN_SKILL_1,
DOMAIN_SKILL_2,
FUNCTIONAL_SKILL_1,
FUNCTIONAL_SKILL_2,
CERTIFICATION_SKILLS,
CERTIFICATION_NAME

Location & Geography:
CURRENT_COUNTRY,
CURRENT_LOCATION,
CURRENT_LOCATION_CITY,
BASE_COUNTRY,
BASE_LOCATION,
BASE_LOCATION_CITY,
CLUB_PROJECT_GEOGRAPHY

Travel:
TRAVEL_TO_LOCATION,
TRAVEL_BEGIN_DATE,
TRAVEL_END_DATE,
VISA_PERMIT_TYPE

Resignation / Attrition:
RESIGNED,
LAST_WORKING_DAY

=======================================================

BUILD THE PROJECT AS A COMPLETE PRODUCTION READY SOLUTION

=======================================================

PHASE 1 : DATA ENGINEERING

Perform:

1. Data Profiling
2. Data Cleaning
3. Missing Value Handling
4. Remove Duplicates
5. Date Conversion
6. Standardization
7. Data Type Corrections
8. Outlier Detection
9. KPI Calculations

Create reusable functions.

=======================================================

PHASE 2 : KPI CALCULATIONS

Create the following KPIs.

Resource KPIs

- Total Employees
- Active Employees
- Available Employees
- Billable Resources
- Non Billable Resources
- Revenue Generating Resources
- Total Projects
- Total Customers

Experience KPIs

- Average Experience
- Highest Experience
- Experience Distribution

Allocation KPIs

- Fully Allocated
- Over Allocated
- Under Allocated

Bench KPIs

- BW Employees
- Pipeline Employees
- BW Ageing
- Average Bench Days

Project KPIs

- Active Projects
- Completed Projects
- Project Distribution

Skills KPIs

- Top Skills
- Top Certifications
- Skill Gap Analysis

Attrition KPIs

- Active Employees
- Resigned Employees
- Attrition Percentage

=======================================================

PHASE 3 : DASHBOARD PAGES

Create Multi Page Streamlit Dashboard

Page 1
Executive Summary Dashboard

Show:

KPI Cards
Trend Charts
Revenue Overview
Resource Overview

=======================================================

Page 2
Resource Analytics Dashboard

Charts:

Available vs Allocated
Billable vs Non Billable
Onsite vs Offshore
Resource Distribution by IBU

=======================================================

Page 3
Skills Dashboard

Charts:

Top Skills
Skill Heatmap
Certification Analysis
Skill Distribution Treemap

=======================================================

Page 4
Project Dashboard

Charts:

Projects by Technology
Projects by Customer
Projects by Type
Project Resource Count

=======================================================

Page 5
Allocation Dashboard

Charts:

Allocation Percentage Heatmap
100% Allocation Analysis
Over Allocation Analysis
Under Allocation Analysis

=======================================================

Page 6
Bench / BW Dashboard

Charts:

BW Category
BW Status
Bench Ageing Distribution
Resource Release Forecast

=======================================================

Page 7
Geography Dashboard

Charts:

Country Wise Employees
City Wise Employees
Geographical Map
Location Distribution

=======================================================

Page 8
Manager Analytics Dashboard

Charts:

Supervisor Wise Resources
PM Wise Resources
Manager Utilization
Manager Bench Count

=======================================================

Page 9
Experience Dashboard

Charts:

Experience Histogram
Band vs Experience
Skill vs Experience

=======================================================

Page 10
Attrition Dashboard

Charts:

Resigned Employees
Attrition Trend
Location Wise Attrition
Practice Wise Attrition

=======================================================

PHASE 4 : VISUALIZATION

Use Plotly Only

Create:

Bar Charts
Horizontal Bars
Donut Charts
Pie Charts
Treemaps
Heatmaps
Sunburst Charts
Geographical Maps
KPI Cards
Gauge Charts

Use Corporate Theme:

Primary: #005BAC
Secondary: #00AEEF
Success: #28A745
Warning: #FFC107
Danger: #DC3545

=======================================================

PHASE 5 : PROJECT STRUCTURE

Generate complete folder structure

/project

├── app.py
├── requirements.txt
├── config.py
├── data/
├── assets/
├── pages/
│ ├── summary.py
│ ├── resources.py
│ ├── skills.py
│ ├── projects.py
│ ├── allocation.py
│ ├── bench.py
│ ├── geography.py
│ ├── manager.py
│ ├── experience.py
│ ├── attrition.py
│
├── utils/
│ ├── data_loader.py
│ ├── transformations.py
│ ├── kpi_calculations.py
│ ├── charts.py
│
└── README.md

=======================================================

PHASE 6 : ADVANCED FEATURES

Implement:

Dynamic Filters

- Country
- Location
- IBU
- IBG
- Project
- Technology
- Skill
- Customer

Date Filters

Drill Down Functionality

Export Dashboard Data

Download Excel

Download CSV

Dark Mode

User Authentication (Optional)

=======================================================

PHASE 7 : DEPLOYMENT

Generate:

requirements.txt

Dockerfile

Streamlit Deployment Steps

Azure Deployment Steps

GitHub Deployment Steps

=======================================================

PHASE 8 : DOCUMENTATION

Generate:

README.md

Architecture Diagram

Data Flow Diagram

Technical Documentation

Business Documentation

Interview Questions

Resume Description

=======================================================

PHASE 9 : ENTERPRISE INSIGHTS

Generate Advanced Analytics.

Predict:

Future Bench Resources
Resource Demand Forecast
Skill Demand Forecast
Attrition Prediction
Utilization Forecast

Use:

Pandas
NumPy
Scikit Learn
Streamlit
Plotly
Openpyxl

=======================================================

Output should contain:

1. Complete Code
2. Folder Structure
3. Reusable Functions
4. Dashboard Screens
5. Documentation
6. Deployment Instructions
7. Interview Questions
8. Resume Project Description
9. Enterprise Recommendations

Build everything as production-ready corporate project.


