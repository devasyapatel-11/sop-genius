import { useState, useRef, useEffect } from "react";
import { Upload, FileText } from "lucide-react";
import Toast from "./Toast";

// Detailed SOP content
const REFUND_SOP = `STANDARD OPERATING PROCEDURE

Title: Customer Refund and Return Processing
Document ID: CS-SOP-003
Department: Customer Support
Version: 2.4
Effective Date: January 1, 2025
Approved By: Head of Customer Experience

1. PURPOSE

This SOP outlines the complete process for 
handling customer refund and return requests 
across all channels including email, live chat, 
phone, and social media. The objective is to 
ensure every refund request is handled accurately, 
fairly, and efficiently while maintaining high 
levels of customer satisfaction and minimizing 
financial risk to the organization.

A well-handled refund builds long-term customer 
trust. A poorly handled one leads to chargebacks, 
negative reviews, and customer churn. Every agent 
must follow this process without exception.

2. SCOPE

This SOP applies to:
- All full-time and part-time Customer Support Agents
- Team Leads handling escalated refund cases
- Quality Analysts reviewing refund interactions
- Temporary or contract agents after completion
  of refund processing training

This SOP does NOT apply to:
- Wholesale or B2B refund requests
- Warranty claims
- Subscription cancellations

3. DEFINITIONS

CRM: Customer Relationship Management system
used to manage all customer interactions
and transaction records.

Refund Window: The period within which a customer
is eligible to request a refund. Standard window
is 30 days from date of purchase.

Chargeback: A forced reversal of a transaction
initiated by the customer through their bank.
Chargebacks carry financial penalties.

RMA: Return Merchandise Authorization. A unique
code issued to customers who need to physically
return a product before the refund is processed.

Fraud Flag: An internal tag applied to accounts
suspected of abusing the refund policy.

4. RESPONSIBILITIES

Customer Support Agent:
- Handle all inbound refund requests
- Verify customer identity before any action
- Process eligible refunds within same business day
- Document every interaction in CRM
- Escalate cases that exceed authority limits

Team Lead:
- Approve refunds between $500 and $2000
- Handle all escalated or disputed cases
- Review flagged accounts for fraud patterns
- Provide daily refund summary report to manager

Finance Team:
- Process approved refunds in payment system
- Reconcile refund transactions weekly
- Flag anomalies to Customer Support Manager

5. PROCEDURE

PHASE 1 — RECEIVING THE REQUEST

Step 1.1 — Acknowledge the Request
Respond to the customer within 2 hours of
receiving a refund request. Use the standard
acknowledgment template in the CRM template library.
The acknowledgment must include:
- Confirmation that the request was received
- Expected resolution timeframe of 1 business day
- Reference ticket number for tracking
- Agent name and direct contact

Do not make any commitments about refund approval
at this stage. Simply confirm receipt.

Step 1.2 — Log the Request in CRM
Create a new case in the CRM under the category
Refund Request. Fill in:
- Customer full name and email
- Order number
- Product name and quantity
- Reason for refund as stated by customer
- Channel of request (email, chat, phone)
- Date and time of request
- Assigned agent name

Set case priority based on order value:
- Under $100: Low priority
- $100 to $500: Medium priority
- Above $500: High priority, notify team lead

PHASE 2 — VERIFICATION

Step 2.1 — Verify Customer Identity
Log into CRM and locate the customer account
using their email address or order number.
Confirm the following match exactly:
- Full name on account
- Last 4 digits of payment method used
- Billing address or registered email

If identity cannot be verified, do not proceed.
Send the identity verification template to the
customer requesting confirmation. Place the
case on hold for up to 48 hours. If no response
received in 48 hours, close the case with the
unverified identity closure template.

Step 2.2 — Verify Order Details
Check the order record in CRM and confirm:
- Order number exists and belongs to this customer
- Order status is Delivered or Completed
- Purchase date falls within the 30-day refund window
- Product matches what the customer is claiming

If order is outside the 30-day window, do not
reject immediately. Document the case and escalate
to team lead for exception review.

Step 2.3 — Check for Previous Refund History
Review the customer's refund history in CRM.
If the customer has received more than 3 refunds
in the past 12 months, flag the case for fraud
review before proceeding. Do not inform the
customer of the flag. Notify team lead privately.

PHASE 3 — ELIGIBILITY ASSESSMENT

Step 3.1 — Assess Physical Product Returns
For physical products, confirm:
- Whether the item has been returned or not
- If not returned, issue RMA code and instruct
  customer to ship item back within 7 days
- If returned, check warehouse confirmation
  of receipt before processing refund
- Inspect condition report from warehouse team
- Items returned in damaged or used condition
  may qualify for partial refund only

Step 3.2 — Assess Digital Product Refunds
For digital products such as software, downloads,
or online courses, check the following:
- Whether the product was downloaded or activated
- If not downloaded or activated, full refund eligible
- If downloaded but not activated, case-by-case review
- If fully activated, refund is not eligible unless
  a verified technical defect is documented
- Technical defects must be reported within 7 days
  of purchase to qualify

Step 3.3 — Assess Service Refunds
For services such as consultations or subscriptions:
- Check whether service was delivered or consumed
- If service not yet delivered, full refund eligible
- If service partially delivered, pro-rata refund
  calculation required
- Submit calculation to finance team for approval
  before communicating amount to customer

PHASE 4 — PROCESSING

Step 4.1 — Process Eligible Refund
For approved refunds within agent authority limit:
Navigate to Orders section in CRM.
Select the relevant order.
Click on Initiate Refund.
Enter the exact refund amount.
Select the refund reason from dropdown:
  - Customer Changed Mind
  - Product Not as Described
  - Technical Defect
  - Item Not Received
  - Duplicate Order
  - Other (requires written justification)
Add internal notes explaining the decision.
Click Submit Refund.
Refund will reflect in 5 to 7 business days
to the original payment method.

Step 4.2 — Handle Partial Refunds
For partial refunds, clearly document:
- Original order amount
- Approved refund amount
- Reason for partial rather than full refund
Partial refunds require team lead sign-off
regardless of amount.

PHASE 5 — COMMUNICATION

Step 5.1 — Notify Customer of Approval
Send the refund approval template from CRM.
The message must include:
- Confirmed refund amount
- Expected timeframe of 5 to 7 business days
- Reference to original order number
- Instruction to contact support if not received
  within 10 business days

Step 5.2 — Notify Customer of Rejection
If refund is not eligible, send the rejection
template. The message must include:
- Clear reason for rejection referencing policy
- Alternative resolution options if available
- Escalation path if customer disagrees
Never use confrontational or accusatory language
when rejecting a refund request.

PHASE 6 — ESCALATION

Step 6.1 — When to Escalate
Escalate to team lead immediately if:
- Refund amount exceeds $500
- Customer is threatening legal action
- Customer mentions filing a chargeback
- Fraud indicators are present
- Customer is abusive or threatening
- Case involves a VIP or high-value account

Step 6.2 — Fraud Escalation
If fraud is suspected, do NOT process any refund.
Do NOT inform the customer of the suspicion.
Tag the account with Fraud Review in CRM.
Notify the Fraud and Risk team via internal ticket.
Await their assessment before taking any action.

6. COMPLIANCE AND DOCUMENTATION

All refund cases must be fully documented in CRM
before closing, including all communication,
decisions, and approvals.
Refund data is reviewed weekly by the Quality team.
Agents processing more than 15 refunds per day
must notify their team lead.
Any deviation from this SOP requires written
approval from the Customer Support Manager.
Monthly audit of refund patterns is conducted
by the Finance and Risk teams.`;

const ONBOARDING_SOP = `STANDARD OPERATING PROCEDURE

Title: New Employee Onboarding and Induction
Document ID: HR-SOP-001
Department: Human Resources
Version: 3.1
Effective Date: January 1, 2025
Approved By: Chief Human Resources Officer

1. PURPOSE

This SOP defines the complete end-to-end process
for onboarding new employees from the point of
offer acceptance through the completion of the
90-day probation period. The goal is to ensure
every new hire experiences a structured, warm,
and productive onboarding journey that accelerates
their integration into the team and organization.

Research consistently shows that employees who
experience a structured onboarding process are
significantly more likely to remain with the
organization beyond their first year. This SOP
exists to protect that outcome.

2. SCOPE

Applies to:
- All permanent full-time employees
- Part-time employees working 20+ hours per week
- Contract employees on assignments of 3+ months
- Internal transfers from other departments

Does not apply to:
- Daily wage workers
- Freelancers or independent consultants
- Interns on programs shorter than 4 weeks

3. RESPONSIBILITIES

HR Manager:
- Own the overall onboarding process
- Prepare all documentation before joining date
- Conduct 30, 60, and 90 day check-ins
- Maintain onboarding records in HRMS

Hiring Manager:
- Prepare team for new employee arrival
- Assign a buddy or mentor
- Define and communicate 30-day goals on Day 1
- Conduct weekly 1-on-1 during first month

IT Department:
- Set up laptop, email, and all system access
- Complete setup at least 1 day before joining
- Conduct IT orientation on Day 1
- Provide help desk contact details

Finance Department:
- Collect bank and tax details for payroll setup
- Explain salary structure and benefits
- Ensure statutory compliance forms submitted
  within 7 days of joining

4. PROCEDURE

PHASE 1 — PRE JOINING (1 week before joining)

Step 1.1 — Issue Offer Documentation
HR sends the formal offer letter via email
within 24 hours of verbal offer acceptance.
The email package must include:
- Signed offer letter in PDF format
- Complete list of documents required on Day 1
- Joining date, time, and exact reporting location
- Name and contact number of HR point of contact
- Link to the digital pre-joining information form
- Employee handbook and code of conduct document
- Parking and transport information if applicable

Step 1.2 — Collect Pre-Joining Information
New employee must complete the digital pre-joining
form within 3 days of receiving the offer letter.
The form captures:
- Full legal name and personal contact details
- Permanent and current residential address
- Emergency contact name, relationship, and number
- Educational qualification details
- Previous employment history for last 5 years
- Bank account number, IFSC code, and bank name
- PAN card number for tax purposes
- Aadhaar number for identity compliance
- Preferred laptop operating system
- Any disability or special accommodation needs
- T-shirt size for welcome kit

Step 1.3 — Raise IT Setup Request
HR must raise the IT provisioning ticket
at least 5 working days before the joining date.
The ticket must specify:
- Employee full legal name
- Designation and department
- Name of reporting manager
- Complete list of software required
  (provided by hiring manager within 2 days)
- System access level: standard, admin, or restricted
- Whether remote access or VPN is required
- Mobile device requirement if applicable

IT must confirm completion 1 day before joining.
If IT cannot complete on time, HR must be
notified to arrange a temporary workstation.
No employee should arrive to no equipment.

Step 1.4 — Workspace and Facilities Preparation
The Facilities team must ensure by Day 1:
- Desk and chair assigned, cleaned, and labeled
- Access card programmed and ready at reception
- Parking slot allocated if applicable
- Welcome kit prepared and placed on desk
  (company branded notebook, pen, ID card holder,
  welcome letter signed by CEO or HR head,
  company merchandise if available)
- Name card placed on desk if open office

Step 1.5 — Buddy Assignment
Hiring manager selects and briefs the buddy
at least 3 days before new employee joins.
Buddy eligibility criteria:
- Minimum 1 year tenure in the organization
- Voluntarily willing to take on the role
- Available for regular check-ins in first 2 weeks
- Works in same or closely adjacent team
- Has good standing performance record

Hiring manager briefs buddy on:
- New employee's name, role, and background
- Key areas where they may need support
- Expected check-in frequency and format
- Escalation path if concerns arise

PHASE 2 — DAY 1

Step 2.1 — Reception and Welcome
HR representative greets new employee at the
building reception by 9:15 AM. Never leave a
new employee waiting alone at reception.
Escort to the HR onboarding room by 9:30 AM.

Welcome session agenda 9:30 AM to 11:00 AM:
- Welcome address by HR Manager (15 minutes)
- Company history, mission, vision, and values
  presentation (20 minutes)
- Organizational chart walkthrough (15 minutes)
- Benefits, leave policy, and HR processes (30 minutes)
- Open Q&A session (10 minutes)

Step 2.2 — Original Document Collection
HR collects and verifies original documents:
- Secondary school certificate (10th grade)
- Higher secondary certificate (12th grade)
- All degree and post-graduation certificates
- Previous employment offer letters
- Relieving or experience letters from all employers
- Last 3 months salary slips from most recent employer
- Government photo ID (Aadhaar, Passport, or Voter ID)
- 2 recent passport size photographs
- Cancelled cheque or bank passbook front page

All originals must be photocopied and returned
to the employee on the same day without exception.
Store copies securely in the employee's HR file.

Step 2.3 — IT Orientation
IT team conducts 1 hour orientation session:
- Laptop handover with signed asset acknowledgment form
- Email account activation and first login
- Password policy explanation and mandatory reset
- VPN setup and remote access configuration
- Installation of all required software
- Overview of IT security and acceptable use policy
- Introduction to help desk ticketing system
- Emergency IT contact and response time expectations

Step 2.4 — Office Orientation Tour
HR or buddy conducts 30-minute office tour:
- Cafeteria location and operating hours
- All meeting room locations and booking process
- Printer, scanner, and stationery locations
- First aid kits and emergency exits
- Fire evacuation assembly point
- HR, Finance, and IT team locations
- Prayer room, wellness room if available
- Visitor management process

Step 2.5 — Team Introduction and Role Briefing
Hiring manager introduces new employee to:
- All immediate team members individually
- Key cross-functional stakeholders
- Senior leadership if available and appropriate

Hiring manager conducts 90-minute role briefing:
- Detailed team structure and each person's role
- Current projects, priorities, and deadlines
- All tools, platforms, and communication channels
- Meeting cadence and communication norms
- Documentation and reporting expectations
- Clear 30-day goals with measurable outcomes

PHASE 3 — FIRST WEEK

Step 3.1 — Mandatory Compliance Training
New employee must complete within first 5 days:
- Code of Conduct and Business Ethics (45 minutes)
- Prevention of Sexual Harassment POSH (60 minutes)
- Data Privacy and Information Security (45 minutes)
- Health, Safety, and Environment Awareness (30 minutes)
- Anti-Bribery and Anti-Corruption Policy (30 minutes)

HR tracks completion daily via LMS portal.
Reminder sent if not completed by Day 4.
Non-completion by Day 7 escalated to hiring manager
and noted in probation performance record.

Step 3.2 — Role Specific Training Plan
Hiring manager creates and shares a structured
training plan with HR by end of Day 2 covering:
- Product or service knowledge modules
- Key internal systems and tools with guided practice
- Internal workflow and process documentation
- Reporting templates and documentation standards
- Introduction to key clients or accounts if applicable

New employee must sign acknowledgment of the plan.
Progress reviewed at end of Week 1 by hiring manager.

Step 3.3 — Finance and Payroll Induction
Finance schedules 30-minute session covering:
- Complete CTC breakup and take-home calculation
- Investment declaration process and deadlines
- Expense reimbursement claim process and portal
- Payroll processing dates and cut-off deadlines
- Leave encashment and travel allowance policies

PHASE 4 — 30/60/90 DAY REVIEWS

Step 4.1 — 30 Day Review
HR conducts 30-minute structured check-in:
- Overall comfort and experience rating
- Role clarity and expectation alignment
- Training completion status
- Any blockers, concerns, or support needed
- Feedback on onboarding process itself

Hiring manager conducts separate performance review:
- Assessment of 30-day goals achievement
- Identification of strengths observed so far
- Areas requiring additional support or training
- Revised goals for next 30 days

Step 4.2 — 60 Day Review
HR sends digital survey to new employee:
- Onboarding satisfaction score 1 to 5
- Most helpful aspects of the onboarding experience
- Gaps or areas for improvement
- Overall organizational culture experience score

Hiring manager conducts mid-probation review:
- Formal performance assessment against goals
- Clear communication of current probation standing
- Identification of training or mentoring needs

Step 4.3 — 90 Day Probation Completion
HR initiates confirmation process:
- Hiring manager submits formal performance form
- HR reviews attendance and compliance records
- Skip-level manager provides input
- HR issues confirmation letter within 7 days

If performance is unsatisfactory:
- HR and hiring manager meet employee jointly
- Extend probation 30 to 60 days with written notice
- Set specific measurable improvement targets
- Weekly check-ins mandatory during extension
- If still unsatisfactory, initiate separation process

5. COMPLIANCE

All onboarding checklists must be completed
and uploaded to HRMS within 7 days of joining.
Quarterly audit of onboarding compliance conducted
by HR Operations team.
Non-compliance reported to CHRO within 15 days.`;

const QC_SOP = `STANDARD OPERATING PROCEDURE

Title: Product Quality Control and Inspection Process
Document ID: MFG-SOP-005
Department: Manufacturing and Quality Assurance
Version: 1.8
Effective Date: January 1, 2025
Approved By: Head of Quality Assurance

1. PURPOSE

This SOP defines the complete quality control
and inspection process for all finished goods
prior to packaging and shipment to customers
or distribution centers. The purpose is to
ensure every product that leaves the facility
meets the defined quality standards, is free
from defects, and complies with all applicable
regulatory and safety requirements.

Product quality failures result in customer
returns, reputational damage, regulatory penalties,
and significant financial loss. This SOP exists
to prevent those outcomes through rigorous and
consistent inspection at every stage.

2. SCOPE

Applies to:
- All QC Inspectors on the production floor
- QC Supervisors overseeing inspection teams
- Production team leads responsible for batch handover
- Warehouse staff involved in pre-shipment checks

Does not apply to:
- Raw material incoming inspection (refer MFG-SOP-001)
- In-process quality checks (refer MFG-SOP-003)
- Customer return inspection (refer MFG-SOP-008)

3. DEFINITIONS

Batch: A defined quantity of product manufactured
in a single production run under the same conditions.

Tolerance Range: The acceptable deviation from
the specified dimension or measurement. Default
tolerance is plus or minus 0.5mm unless product
specification sheet states otherwise.

AQL: Acceptable Quality Level. The maximum
defect rate considered acceptable for a batch.
Standard AQL is 1.5 percent for critical defects
and 4.0 percent for minor defects.

NCR: Non-Conformance Report. A formal document
raised when a product or batch fails to meet
the specified quality standards.

RTV: Return to Vendor. An instruction issued
when a defect is traced back to a supplied
component or raw material.

Hold Tag: A physical label affixed to a unit
or batch that prevents it from moving forward
in the production or shipment process.

4. RESPONSIBILITIES

QC Inspector:
- Conduct all inspection stages as per this SOP
- Record all findings accurately in QC log
- Reject non-conforming units immediately
- Raise NCR for any batch failing AQL threshold
- Never pass a unit with a critical defect

QC Supervisor:
- Oversee inspection team and ensure SOP compliance
- Review and sign all NCRs
- Communicate batch hold decisions to production
- Escalate recurring defect patterns to engineering

Production Team Lead:
- Ensure batch documentation is complete before handover
- Coordinate rework or rejection disposition
- Attend NCR review meetings

Quality Manager:
- Review weekly quality performance data
- Approve disposition decisions for held batches
- Lead root cause analysis for critical failures
- Report monthly quality metrics to management

5. PROCEDURE

PHASE 1 — PRE-INSPECTION PREPARATION

Step 1.1 — Prepare and Validate Inspection Area
Before beginning any inspection shift:
Verify the inspection table surface is clean,
scratch-free, and adequately lit (minimum 500 lux).
Check that all measuring instruments are
present, undamaged, and within calibration date.
Calibration sticker must show current month and year.
If any instrument is past calibration date,
remove from service immediately and raise a
calibration request ticket.
Required instruments for standard inspection:
- Digital vernier calipers (resolution 0.01mm)
- Go and no-go gauges per product specification
- Torque screwdriver if fasteners involved
- Visual inspection light box for cosmetic checks
- Weighing scale calibrated to 0.1 gram resolution

Sign the inspection area readiness checklist
before accepting any product batch.

Step 1.2 — Review Product Specification Sheet
Before inspecting any batch, retrieve the current
approved product specification sheet from the
QMS document portal. Confirm revision number
matches the production order specification.
Review all critical to quality parameters including:
- Dimensional tolerances for all measured features
- Surface finish and cosmetic acceptance criteria
- Functional performance requirements
- Labeling and packaging requirements
- Regulatory markings required if applicable
Never rely on memory or previous version specs.
Always use the current approved specification.

PHASE 2 — BATCH RECEIPT AND DOCUMENTATION

Step 2.1 — Receive and Verify Batch Documentation
Production team lead presents batch to QC with:
- Batch traveler document with production order number
- In-process inspection records completed and signed
- Material traceability certificates if required
- Count of total units produced in the batch

QC Inspector verifies:
- Batch number on traveler matches production order
- All in-process sign-offs are complete
- No open holds or quality flags from production
- Total unit count matches what is presented

If documentation is incomplete, reject the
batch handover and return to production.
Do not begin inspection on undocumented batches.
Log the rejection in the QC daily activity log.

Step 2.2 — Determine Sample Size
Calculate inspection sample size using AQL table:
- Batch size 2 to 150 units: inspect 20 percent
  minimum 5 units
- Batch size 151 to 500 units: inspect 15 percent
  minimum 30 units
- Batch size 501 to 1200 units: inspect 10 percent
  minimum 75 units
- Batch size above 1200 units: inspect 8 percent
  minimum 120 units

Select samples randomly from across the batch.
Do not cherry pick or allow production staff
to select the samples on your behalf.
Document sample size and selection method in QC log.

PHASE 3 — INSPECTION STAGES

Step 3.1 — Visual and Cosmetic Inspection
Inspect each sample unit under the light box:
Examine all external surfaces systematically
using a defined inspection sequence:
top, bottom, front, back, left side, right side.
Check for the following defect categories:

Critical Defects (automatic rejection):
- Cracks or fractures in structural components
- Missing components or sub-assemblies
- Incorrect or missing regulatory markings
- Safety hazard condition of any kind

Major Defects (record and assess against AQL):
- Surface scratches deeper than 0.2mm
- Dents or deformation visible from 500mm distance
- Discoloration covering more than 5 percent surface
- Incomplete assembly visible from exterior

Minor Defects (record but do not reject for these alone):
- Faint surface marks not visible from 500mm
- Minor packaging scuffs
- Slight color variation within accepted shade range

Tag each rejected unit immediately with a
red rejection label. Place in the rejection bin.
Never mix rejected units back with the batch.

Step 3.2 — Dimensional Inspection
Using calibrated measuring instruments, measure
all critical dimensions specified on the product
specification sheet. For each measurement:
- Record nominal value from specification
- Record actual measured value
- Calculate deviation from nominal
- Compare to specified tolerance range
- Record pass or fail for each dimension

Any unit with a single critical dimension
outside tolerance must be rejected immediately.
If more than 10 percent of sampled units fail
any single dimension, place entire batch on hold.
Raise NCR immediately and notify QC supervisor.

Step 3.3 — Weight and Volume Check
Weigh each sampled unit on calibrated scale.
Compare to nominal weight on specification sheet.
Acceptable weight variation is plus or minus
2 percent of nominal weight unless otherwise stated.
For liquid fill products, verify fill volume
using graduated measuring equipment.
Units outside weight or fill tolerance: reject.
Record all measurements in QC dimensional log.

Step 3.4 — Functional and Performance Testing
For products with functional requirements,
conduct the standard functional test sequence:

Power-on test: apply rated power and verify
unit powers on within specified time.
Operational test: operate all controls, switches,
buttons, ports, and indicators per test script.
Performance test: verify output parameters
meet specification (speed, force, output level).
Endurance test if required: run unit for
specified duration and verify no degradation.
Safety test: verify all safety features activate
correctly under simulated trigger conditions.

Document pass or fail result for each test step.
Any functional failure is a critical defect.
Reject unit immediately and raise NCR.

Step 3.5 — Label and Packaging Verification
Verify labels on each sampled unit:
- All required text present and legible
- Regulatory marks correct and properly positioned
- Batch number and date code correctly printed
- Barcode scans correctly to correct product code
- No label misalignment exceeding 2mm

Verify packaging integrity:
- Packaging undamaged and properly sealed
- Correct insert materials present
- Shipping label if pre-applied is correct

PHASE 4 — DISPOSITION AND REPORTING

Step 4.1 — Pass Decision
If batch passes all inspection stages
within AQL limits:
- Sign and stamp the batch traveler as QC Passed
- Enter pass result in QC management system
- Release batch for packaging or shipment
- Retain inspection records for 3 years minimum

Step 4.2 — Fail Decision and NCR
If batch fails at any inspection stage:
- Place entire batch on hold immediately
- Affix Hold tags to all batch containers
- Raise NCR in QMS within 1 hour of decision
- NCR must include: batch number, defect description,
  quantity affected, inspection stage failed,
  sample evidence photographs if possible
- Notify QC supervisor and production team lead
- Do not release batch until disposition approved

Step 4.3 — Disposition Options
QC Supervisor and Quality Manager determine:
- Sort and Rework: 100 percent inspection of full
  batch, rework defective units, re-inspect
- Scrap: reject entire batch, record financial loss
- Use As Is with Deviation: only for minor defects
  with written customer approval on file
- Return to Vendor: if defect traced to supplied
  component, initiate RTV process

Step 4.4 — Daily QC Report
At end of each shift QC Inspector submits:
- Total batches inspected
- Total units inspected
- Total units rejected and rejection rate
- Types of defects found with frequency count
- NCRs raised during shift
- Any instruments removed from service
Submit report to QC Supervisor by end of shift.

6. COMPLIANCE

All inspection records must be retained minimum 3 years.
QC instruments must be calibrated per schedule.
Monthly quality performance review held with management.
Any SOP deviation requires written Quality Manager approval.
Annual external audit of QC process by certification body.`;

interface InputSectionProps {
  onGenerate: (text: string, jobRole: string) => void;
  isLoading: boolean;
}

const InputSection = ({ onGenerate, isLoading }: InputSectionProps) => {
  const [activeTab, setActiveTab] = useState<"paste" | "upload">("paste");
  const [sopText, setSopText] = useState(""); // Empty on page load
  const [jobRole, setJobRole] = useState("");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [autoDetectedRole, setAutoDetectedRole] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedSOP, setSelectedSOP] = useState("Select a sample SOP...");
  const [showLoadedBadge, setShowLoadedBadge] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle dropdown selection
  const handleSOPSelection = (value: string) => {
    let sopContent = "";
    let autoRole = "";

    switch (value) {
      case "Customer Refund Processing":
        sopContent = REFUND_SOP;
        autoRole = "Customer Support Agent";
        break;
      case "Employee Onboarding Process":
        sopContent = ONBOARDING_SOP;
        autoRole = "HR Manager";
        break;
      case "Quality Control Inspection":
        sopContent = QC_SOP;
        autoRole = "QC Inspector";
        break;
      default:
        return;
    }

    // Load SOP silently into textarea
    setSopText(sopContent);
    
    // Auto fill job role field
    setJobRole(autoRole);
    setAutoDetectedRole(true);
    
    // Show "Loaded!" badge
    setShowLoadedBadge(true);
    setTimeout(() => setShowLoadedBadge(false), 2000);
    
    // Keep the selected option in dropdown (don't reset)
    setSelectedSOP(value);
    
    // Focus textarea and scroll to top
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.scrollTop = 0; // Scroll to top
      }
    }, 100);
  };

  // Auto-detect job role from text
  const detectJobRole = (text: string) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes("customer support") || lowerText.includes("agent") || lowerText.includes("representative")) {
      return "Customer Support Agent";
    }
    if (lowerText.includes("engineer") || lowerText.includes("developer") || lowerText.includes("technical")) {
      return "Technical Staff";
    }
    if (lowerText.includes("manager") || lowerText.includes("supervisor") || lowerText.includes("lead")) {
      return "Team Manager";
    }
    if (lowerText.includes("nurse") || lowerText.includes("doctor") || lowerText.includes("medical") || lowerText.includes("patient") || lowerText.includes("clinical")) {
      return "Healthcare Staff";
    }
    if (lowerText.includes("finance") || lowerText.includes("accounts") || lowerText.includes("payroll") || lowerText.includes("invoice")) {
      return "Finance Team";
    }
    if (lowerText.includes("quality") || lowerText.includes("inspection") || lowerText.includes("qc") || lowerText.includes("manufacturing")) {
      return "QC Inspector";
    }
    
    return "";
  };

  // Auto-generate when PDF is uploaded
  const handlePdfUpload = async (file: File) => {
    setFileName(file.name);
    setError("");
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        // Preserve document structure: detect line breaks via Y-position changes
        const items = content.items as any[];
        let lastY: number | null = null;
        let pageText = "";
        for (const item of items) {
          if (lastY !== null && Math.abs(item.transform[5] - lastY) > 2) {
            // Y position changed — new line
            pageText += "\n";
          } else if (pageText.length > 0 && !pageText.endsWith(" ") && !pageText.endsWith("\n")) {
            pageText += " ";
          }
          pageText += item.str;
          lastY = item.transform[5];
        }
        text += pageText.trim() + "\n\n";
      }
      setSopText(text.trim());
      
      // Auto-detect job role
      const detectedRole = detectJobRole(text);
      if (detectedRole) {
        setJobRole(detectedRole);
        setAutoDetectedRole(true);
      }
      
      // Show toast and auto-generate
      setToastMessage("PDF detected — generating training content...");
      setShowToast(true);
      
      setTimeout(() => {
        onGenerate(text, detectedRole);
      }, 1000);
      
    } catch (error) {
      setError("Failed to process PDF. Please try again.");
    }
  };

  // Auto-detect job role when text changes
  useEffect(() => {
    if (sopText.trim() && !autoDetectedRole) {
      const detectedRole = detectJobRole(sopText);
      if (detectedRole && !jobRole) {
        setJobRole(detectedRole);
        setAutoDetectedRole(true);
      }
    }
  }, [sopText, jobRole, autoDetectedRole]);

  // Clear job role when switching tabs
  useEffect(() => {
    setJobRole("");
    setAutoDetectedRole(false);
    if (activeTab !== "upload") {
      setFileName("");
    }
  }, [activeTab]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      handlePdfUpload(file);
    } else {
      setError("Please upload a PDF file");
    }
  };

  const handleSubmit = () => {
    // Clear any existing error
    setError("");
    
    // Check which tab is active and validate accordingly
    if (activeTab === "paste") {
      // For paste tab: check if textarea has content
      if (!sopText.trim()) {
        setError("Please paste your SOP text first");
        return;
      }
    } else if (activeTab === "upload") {
      // For upload tab: check if PDF has been uploaded
      if (!fileName) {
        setError("Please upload a PDF file first");
        return;
      }
      // Also ensure we have extracted text from the PDF
      if (!sopText.trim()) {
        setError("PDF processing failed. Please upload the PDF again.");
        return;
      }
    }
    
    // If validation passes, proceed with generation
    onGenerate(sopText, jobRole);
  };

  return (
    <>
      <div className="warm-card p-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-secondary rounded-lg p-1 w-fit">
          {(["paste", "upload"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                // Clear job role and auto-detection when switching tabs
                setJobRole("");
                setAutoDetectedRole(false);
                // Clear any existing error messages when switching tabs
                setError("");
                // Also clear filename when switching away from upload tab
                if (tab !== "upload") {
                  setFileName("");
                }
              }}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab
                  ? "warm-primary-btn"
                  : "warm-secondary-btn"
              }`}
            >
              {tab === "paste" ? "Paste Text" : "Upload PDF"}
            </button>
          ))}
        </div>

        {/* Sample SOP Dropdown - Only show on Paste Text tab */}
        {activeTab === "paste" && (
          <div className="mb-4">
            <label className="text-sm font-medium block mb-2" style={{ color: "#7A5C30", fontSize: "13px" }}>
              Try a sample SOP
            </label>
            <div className="flex items-center gap-2">
              <select
                value={selectedSOP}
                onChange={(e) => handleSOPSelection(e.target.value)}
                className="px-3 py-2 text-sm font-medium cursor-pointer transition-colors focus:outline-none"
                style={{
                  background: "#FFFDF0",
                  border: "1.5px solid #C8832A",
                  borderRadius: "8px",
                  padding: "8px 14px",
                  fontSize: "13px",
                  color: "#3D2B0E",
                  width: "fit-content",
                  minWidth: "220px"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#C8832A";
                  e.target.style.outline = "none";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#C8832A";
                }}
              >
                <option value="Select a sample SOP..." disabled>
                  Select a sample SOP...
                </option>
                <option value="Customer Refund Processing">
                  Customer Refund Processing
                </option>
                <option value="Employee Onboarding Process">
                  Employee Onboarding Process
                </option>
                <option value="Quality Control Inspection">
                  Quality Control Inspection
                </option>
              </select>
              
              {/* Loaded Badge */}
              {showLoadedBadge && (
                <span
                  className="text-xs font-medium animate-fade-in-up"
                  style={{
                    background: "#22C55E",
                    color: "white",
                    borderRadius: "20px",
                    padding: "3px 10px",
                    fontSize: "12px"
                  }}
                >
                  Loaded!
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tab content */}
        {activeTab === "paste" ? (
          <div>
            <textarea
              ref={textareaRef}
              value={sopText}
              onChange={(e) => {
                setSopText(e.target.value);
                setError("");
                setAutoDetectedRole(false); // Reset auto-detection when user manually types
              }}
              placeholder="Paste your SOP document here..."
              className="w-full h-64 warm-input p-4 text-sm placeholder:text-muted-foreground resize-none focus:outline-none leading-relaxed"
            />
            <p className="text-xs text-muted-foreground mt-1 text-right">
              {sopText.length} characters
            </p>
          </div>
        ) : (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className="h-48 warm-upload-zone rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors"
          >
            {fileName ? (
              <>
                <FileText className="w-8 h-8 text-primary" />
                <p className="text-sm text-foreground font-medium">{fileName}</p>
                <p className="text-xs text-muted-foreground">PDF loaded — switch to Paste Text to review</p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-primary" />
                <p className="text-sm text-muted-foreground font-medium">Drop your PDF here or click to browse</p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handlePdfUpload(file);
              }}
            />
          </div>
        )}

        {/* Job role */}
        <div className="mt-5">
          <label className="text-sm text-muted-foreground block mb-2 font-medium">
            Job role this SOP is for (optional)
          </label>
          <input
            key={activeTab} // Force re-render when tab changes
            type="text"
            value={jobRole}
            onChange={(e) => {
              setJobRole(e.target.value);
              setAutoDetectedRole(false); // Reset auto-detection when user manually changes
            }}
            placeholder="e.g. Customer Support Agent"
            className="w-full warm-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none"
          />
          {autoDetectedRole && (
            <p className="text-xs mt-1" style={{ color: "#C8832A" }}>
              Auto-detected from your SOP
            </p>
          )}
        </div>

        {/* Error */}
        {error && <p className="text-sm text-destructive mt-3 font-medium">{error}</p>}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="mt-6 w-full warm-primary-btn font-medium py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate Training Content →
        </button>
      </div>
      
      <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
    </>
  );
};

export default InputSection;
