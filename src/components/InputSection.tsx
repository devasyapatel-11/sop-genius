import { useState, useRef, useCallback } from "react";
import { Upload, FileText } from "lucide-react";

const SAMPLE_SOP = `STANDARD OPERATING PROCEDURE

Title: Customer Refund Processing
Department: Customer Support
Version: 1.2

PURPOSE:
This SOP outlines the step-by-step process for handling customer refund requests to ensure consistency, accuracy, and customer satisfaction.

SCOPE:
Applies to all Customer Support Agents handling refund requests via email, chat, or phone.

PROCEDURE:

Step 1 — Verify Customer Identity
Log into the CRM system. Search the customer by email or order number. Confirm name and last 4 digits of payment method match.

Step 2 — Review the Refund Request
Check the date of purchase. Confirm it falls within the 30-day refund window. Review reason provided by customer. Flag requests older than 30 days for supervisor approval.

Step 3 — Check Product Condition
For physical products: confirm whether item was returned.
For digital products: check if downloaded or activated.
Fully activated digital products are non-refundable unless there is a technical defect.

Step 4 — Process the Refund
Navigate to Orders > Refunds in the CRM. Enter refund amount. Select refund reason from dropdown. Click Submit Refund. Refunds process within 5–7 business days to original payment method.

Step 5 — Communicate to Customer
Send the standard refund confirmation email template. Include the expected refund timeframe. Log the interaction in the CRM under the customer account.

Step 6 — Escalation
If refund is over $500, flag for manager review before processing. If customer is disputing fraud, transfer to the Fraud and Disputes team immediately.

COMPLIANCE:
All refunds must be logged. Agents processing more than 20 refunds per day must notify their team lead.`;

interface InputSectionProps {
  onGenerate: (text: string, jobRole: string) => void;
  isLoading: boolean;
}

const InputSection = ({ onGenerate, isLoading }: InputSectionProps) => {
  const [activeTab, setActiveTab] = useState<"paste" | "upload">("paste");
  const [sopText, setSopText] = useState(SAMPLE_SOP);
  const [jobRole, setJobRole] = useState("");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePdfUpload = useCallback(async (file: File) => {
    try {
      setFileName(file.name);
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
      setActiveTab("paste");
    } catch {
      setError("Failed to read PDF. Please try pasting the text instead.");
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file?.type === "application/pdf") handlePdfUpload(file);
    },
    [handlePdfUpload]
  );

  const handleSubmit = () => {
    if (!sopText.trim()) {
      setError("Please paste or upload an SOP first");
      return;
    }
    setError("");
    onGenerate(sopText, jobRole);
  };

  return (
    <div className="warm-card p-6">
      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-secondary rounded-lg p-1 w-fit">
        {(["paste", "upload"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
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

      {/* Tab content */}
      {activeTab === "paste" ? (
        <div>
          <textarea
            value={sopText}
            onChange={(e) => {
              setSopText(e.target.value);
              setError("");
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
          type="text"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          placeholder="e.g. Customer Support Agent"
          className="w-full warm-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none"
        />
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
  );
};

export default InputSection;
