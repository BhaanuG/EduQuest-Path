import React, { useState, useEffect, forwardRef } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

// Pre-generated list of 80 authenticator codes for maximum variety
const AUTHENTICATOR_CODES = [
  "051075",
  "382941",
  "748265",
  "619354",
  "927403",
  "563892",
  "184726",
  "496318",
  "752681",
  "308567",
  "641829",
  "875234",
  "129465",
  "456798",
  "683421",
  "914567",
  "267845",
  "534982",
  "798346",
  "362841",
  "529167",
  "841956",
  "674382",
  "195847",
  "467129",
  "738291",
  "521346",
  "894765",
  "316724",
  "659284",
  "472856",
  "798134",
  "325847",
  "681429",
  "945267",
  "537891",
  "263748",
  "814567",
  "479283",
  "692514",
  "341789",
  "756839",
  "428716",
  "805234",
  "619872",
  "374856",
  "925481",
  "586291",
  "143762",
  "769248",
  "491837",
  "627485",
  "835642",
  "258947",
  "746519",
  "389156",
  "614293",
  "972468",
  "518734",
  "203876",
  "651849",
  "437921",
  "789265",
  "264718",
  "856493",
  "512687",
  "738492",
  "165384",
  "847629",
  "593276",
  "321654",
  "704892",
  "468157",
  "629743",
  "891427",
  "345768",
  "578214",
  "726893",
  "453198",
  "812569",
  "697431",
];

function getRandomCode() {
  return AUTHENTICATOR_CODES[Math.floor(Math.random() * AUTHENTICATOR_CODES.length)];
}

export const CaptchaAuthenticator = forwardRef(function CaptchaAuthenticator({ onCodeChange, userInput }, ref) {
  const [displayCode, setDisplayCode] = useState(getRandomCode());

  useEffect(() => {
    // Generate new code when component mounts
    setDisplayCode(getRandomCode());
  }, []);

  const handleRefresh = () => {
    const newCode = getRandomCode();
    setDisplayCode(newCode);
    onCodeChange(""); // Clear the input when refreshing
  };

  // Expose refresh method through ref
  React.useImperativeHandle(ref, () => ({
    refresh: handleRefresh,
  }));

  const isCorrect = userInput === displayCode && userInput.length === 6;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label htmlFor="authenticator-code" className="text-white text-sm font-medium">Verify Authenticator</label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 p-1 h-auto"
          title="Generate new authenticator code"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      {/* CAPTCHA-style display box */}
      <div className="relative bg-gradient-to-r from-slate-300 to-slate-100 p-4 rounded-lg border-2 border-slate-400 shadow-md">
        {/* Diagonal stripes background */}
        <div
          className="absolute inset-0 rounded-lg opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #64748b, #64748b 10px, transparent 10px, transparent 20px)",
          }}
        />

        {/* Code display */}
        <div className="relative flex items-center justify-center h-16">
          <span
            className="text-4xl font-bold text-slate-700 tracking-[0.3em] select-none"
            style={{
              fontFamily: "Courier New, monospace",
              letterSpacing: "0.2em",
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {displayCode}
          </span>
        </div>
      </div>

      {/* Input field with validation */}
      <div className="space-y-2">
        <input
          id="authenticator-code"
          name="authenticator-code"
          type="text"
          autoComplete="off"
          maxLength="6"
          placeholder="Enter the 6-digit code"
          value={userInput}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 6);
            onCodeChange(value);
          }}
          className={`w-full px-4 py-3 rounded-lg font-mono text-2xl text-center tracking-widest bg-slate-950/50 border-2 placeholder:text-slate-500 transition-all ${
            isCorrect
              ? "border-green-500 focus:border-green-400 focus:ring-2 focus:ring-green-500/50 text-green-400"
              : userInput.length === 6
              ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/50 text-red-400"
              : "border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 text-white"
          }`}
          required
        />
        <p className="text-xs text-slate-400">
          {isCorrect ? (
            <span className="text-green-400">✓ Code verified successfully</span>
          ) : userInput.length === 6 ? (
            <span className="text-red-400">✗ Incorrect code. Try again.</span>
          ) : (
            "Enter all 6 digits from the image above"
          )}
        </p>
      </div>
    </div>
  );
});

CaptchaAuthenticator.displayName = "CaptchaAuthenticator";
