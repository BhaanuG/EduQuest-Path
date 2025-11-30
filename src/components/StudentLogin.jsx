import * as React from "react";
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, LogIn, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { CaptchaAuthenticator } from "./CaptchaAuthenticator";
import { authenticateStudent } from "./StudentData";

export function StudentLogin({ onLogin, onBack }) {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authenticatorCode, setAuthenticatorCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const captchaRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      // Validate authenticator code
      if (!authenticatorCode || authenticatorCode.length !== 6 || !/^\d+$/.test(authenticatorCode)) {
        setError("Please enter a valid 6-digit authenticator code.");
        setIsLoading(false);
        return;
      }
      const student = authenticateStudent(rollNo, password);
      if (student) {
        onLogin(student);
        // Navigate to the requested redirect (if any) or the student's dashboard
        const redirectTo = (location && location.state && location.state.from) || `/${student.rollNo}/dashboard`;
        navigate(redirectTo);
      } else {
        setError("Invalid roll number or password. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        background:
          "linear-gradient(to bottom right, #0f1922 0%, #1a2332 25%, #1e2a3a 50%, #1a3333 75%, #1e3a3a 100%)",
      }}
    >
      <div className="max-w-md w-full animate-fade-in">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-slate-300 hover:text-white hover:bg-slate-800/50 animate-slide-in-left"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portal Selection
        </Button>

        <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-700/50 shadow-2xl shadow-black/50 animate-scale-in">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-green-500/30 animate-bounce-in">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <div className="animate-slide-up">
              <CardTitle className="text-2xl text-white">Student Portal</CardTitle>
              <CardDescription className="text-slate-300 mt-2">
                Enter your roll number and password to access your account
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rollNo" className="text-white">
                  Roll Number
                </Label>
                <Input
                  id="rollNo"
                  name="rollNo"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your roll number (e.g., 1000030001)"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  className="bg-slate-950/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-950/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/50 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-slate-400" /> : <Eye className="h-4 w-4 text-slate-400" />}
                  </Button>
                </div>
              </div>

              <CaptchaAuthenticator
                onCodeChange={setAuthenticatorCode}
                userInput={authenticatorCode}
              />

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-cyan-600/30 transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center space-y-2">
              <p className="text-xs text-slate-400">
                Having trouble? Contact{' '}
                <a href="mailto:support@eduquest.edu" className="text-cyan-400 hover:text-cyan-300 hover:underline">
                  IT Support
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}