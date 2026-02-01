
import React, { useState, useEffect } from 'react';
import { 
    X, Check, Mail, User, ShieldCheck, Camera, ArrowRight, 
    ArrowLeft, Loader2, UploadCloud, AlertCircle, RefreshCw 
} from 'lucide-react';
import Button from './Button';

interface VerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCompleted: () => void; // Called when the user finishes all steps
}

type VerificationStep = 
    | 'OVERVIEW' 
    | 'EMAIL_SENT' 
    | 'EMAIL_RESEND_HELP'
    | 'CHANGE_EMAIL'
    | 'DOC_SELECT' 
    | 'UPLOAD_PASSPORT' 
    | 'UPLOAD_ID'
    | 'VERIFYING';

const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose, onCompleted }) => {
    const [step, setStep] = useState<VerificationStep>('OVERVIEW');
    const [emailVerified, setEmailVerified] = useState(false);
    const [idVerified, setIdVerified] = useState(false);
    const [fundsAdded, setFundsAdded] = useState(false); // Mock for third step
    const [loading, setLoading] = useState(false);
    const [fakeEmail, setFakeEmail] = useState('user@example.com');

    // Reset when opened
    useEffect(() => {
        if (isOpen && step === 'VERIFYING') {
            setStep('OVERVIEW');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // --- SUB-COMPONENTS for specific screens ---

    const OverviewScreen = () => (
        <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <div className="w-8"></div> {/* Spacer */}
                <h2 className="text-xl font-bold text-slate-900">Start investing now</h2>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                    <X size={24} />
                </button>
            </div>

            <div className="space-y-4">
                {/* 1. Account Setup (Email) */}
                <div className={`border rounded-2xl p-4 flex items-center justify-between transition-colors ${
                    emailVerified ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-slate-200'
                }`}>
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                             emailVerified ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                        }`}>
                            <User size={20} />
                        </div>
                        <div>
                            <div className="font-bold text-slate-900">Set up your account</div>
                            {!emailVerified && <div className="text-xs text-slate-500">Verify email to secure account</div>}
                        </div>
                    </div>
                    {emailVerified ? (
                        <Check size={20} className="text-emerald-500" />
                    ) : (
                        <Button variant="outline" size="sm" onClick={() => setStep('EMAIL_SENT')}>
                            Start
                        </Button>
                    )}
                </div>

                {/* 2. Identity Verification */}
                <div className={`border rounded-2xl p-4 flex items-center justify-between transition-colors ${
                    idVerified ? 'bg-emerald-50 border-emerald-100' : 
                    !emailVerified ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-200'
                }`}>
                    <div className="flex items-center gap-4">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                             idVerified ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                        }`}>
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <div className="font-bold text-slate-900">Verify your identity</div>
                            {!idVerified && <div className="text-xs text-slate-500">Required for trading</div>}
                        </div>
                    </div>
                    {idVerified ? (
                        <Check size={20} className="text-emerald-500" />
                    ) : (
                        <Button 
                            variant="outline" 
                            size="sm" 
                            disabled={!emailVerified}
                            onClick={() => setStep('DOC_SELECT')}
                        >
                            Verify
                        </Button>
                    )}
                </div>

                {/* 3. Add Funds (Mocked as final step) */}
                <div className={`border rounded-2xl p-4 flex items-center justify-between transition-colors ${
                    fundsAdded ? 'bg-emerald-50 border-emerald-100' : 
                    !idVerified ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-200'
                }`}>
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                             fundsAdded ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                        }`}>
                            <span className="font-bold text-lg">$</span>
                        </div>
                        <div>
                            <div className="font-bold text-slate-900">Add funds</div>
                            {!fundsAdded && <div className="text-xs text-slate-500">Deposit to start trading</div>}
                        </div>
                    </div>
                    {fundsAdded ? (
                        <Check size={20} className="text-emerald-500" />
                    ) : (
                        <Button 
                            variant="outline" 
                            size="sm" 
                            disabled={!idVerified}
                            onClick={() => {
                                setFundsAdded(true);
                                setTimeout(onCompleted, 500);
                            }}
                        >
                            Add
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );

    const EmailSentScreen = () => (
        <div className="p-8 text-center animate-fade-in">
             <div className="flex justify-between items-center mb-8 absolute top-6 left-6 right-6">
                <button onClick={() => setStep('OVERVIEW')} className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                    <ArrowLeft size={16} /> Back
                </button>
            </div>
            
            <div className="mt-8 mb-6 mx-auto w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <Mail size={32} />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">Set up your account</h3>
            <p className="text-sm text-slate-500 mb-8 max-w-xs mx-auto">
                We have sent an email to <span className="font-semibold text-slate-800">{fakeEmail}</span>
            </p>

            <Button 
                className="w-full mb-4 py-3" 
                onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                        setEmailVerified(true);
                        setStep('OVERVIEW');
                    }, 1500);
                }}
            >
                {loading ? <Loader2 className="animate-spin mx-auto" size={20}/> : 'Tap here once verified'}
            </Button>

            <div className="space-y-3">
                <button 
                    onClick={() => setStep('EMAIL_RESEND_HELP')}
                    className="block w-full text-xs font-semibold text-blue-600 hover:underline"
                >
                    I have not received the email
                </button>
                 <button 
                    onClick={() => setStep('CHANGE_EMAIL')}
                    className="block w-full text-xs font-semibold text-slate-400 hover:text-slate-600"
                >
                    Not my email address?
                </button>
            </div>
        </div>
    );

    const EmailResendHelpScreen = () => (
         <div className="p-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900">Didn't receive the email?</h3>
                <button onClick={() => setStep('EMAIL_SENT')} className="text-slate-400">
                    <X size={20} />
                </button>
            </div>
            
            <div className="space-y-4 mb-8">
                <div className="text-sm text-slate-500 font-medium">No worries - here is what you can do!</div>
                
                <div className="flex items-start gap-3 text-sm text-slate-600">
                    <div className="mt-0.5 min-w-[4px] h-[4px] bg-slate-400 rounded-full"></div>
                    <p>Check your spam/junk folder</p>
                </div>
                 <div className="flex items-start gap-3 text-sm text-slate-600">
                    <div className="mt-0.5 min-w-[4px] h-[4px] bg-slate-400 rounded-full"></div>
                    <p>Make sure your email address is correct</p>
                </div>
                 <div className="flex items-start gap-3 text-sm text-slate-600">
                    <div className="mt-0.5 min-w-[4px] h-[4px] bg-slate-400 rounded-full"></div>
                    <p>Still nothing? Tap resending the verification email</p>
                </div>
            </div>

            <Button className="w-full mb-4" onClick={() => setStep('EMAIL_SENT')}>
                Resend Email
            </Button>
            
            <div className="text-center">
                 <button className="text-xs font-semibold text-blue-600 hover:underline">Still having issues? Contact us</button>
            </div>
        </div>
    );

    const ChangeEmailScreen = () => (
        <div className="p-8 animate-fade-in text-center">
             <div className="flex justify-between items-center mb-8 absolute top-6 left-6 right-6">
                <button onClick={() => setStep('EMAIL_SENT')} className="text-slate-400 hover:text-slate-600">
                    <X size={20} />
                </button>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-2">Not your email address?</h3>
            <p className="text-sm text-slate-500 mb-6">
                You can update it and we'll send you a new verification mail.
            </p>

            <input 
                type="email" 
                value={fakeEmail}
                onChange={(e) => setFakeEmail(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 mb-6 focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-900"
            />

            <Button className="w-full" onClick={() => setStep('EMAIL_SENT')}>
                Update and send email
            </Button>
        </div>
    );

    const DocSelectScreen = () => (
        <div className="p-8 animate-fade-in">
             <div className="flex justify-between items-center mb-8">
                <button onClick={() => setStep('OVERVIEW')} className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                    <ArrowLeft size={16} /> Back
                </button>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">Verify your identity</h3>
            <p className="text-sm text-slate-500 mb-8">
                Choose the type of document you want to use for verification
            </p>

            <div className="space-y-3">
                <button 
                    onClick={() => setStep('UPLOAD_PASSPORT')}
                    className="w-full flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group text-left"
                >
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-blue-200 group-hover:text-blue-700">
                        <ShieldCheck size={20} />
                    </div>
                    <span className="font-semibold text-slate-700 group-hover:text-blue-800">Passport</span>
                </button>

                <button 
                    onClick={() => setStep('UPLOAD_ID')}
                    className="w-full flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group text-left"
                >
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-blue-200 group-hover:text-blue-700">
                        <User size={20} />
                    </div>
                    <span className="font-semibold text-slate-700 group-hover:text-blue-800">National ID/CCCD</span>
                </button>
            </div>
            
            <p className="mt-8 text-center text-[10px] text-blue-600 font-semibold bg-blue-50 py-2 rounded-lg">
                Your document must be valid and clearly visible
            </p>
        </div>
    );

    const UploadPassportScreen = () => (
         <div className="p-8 animate-fade-in">
             <div className="flex justify-between items-center mb-6">
                <button onClick={() => setStep('DOC_SELECT')} className="text-slate-400 hover:text-slate-600">
                   <ArrowLeft size={20} />
                </button>
                 <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Passport Verification</h3>
                 <div className="w-5"></div>
            </div>

            <div className="text-center mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Upload a clear photo of the main page</h3>
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl h-48 flex flex-col items-center justify-center text-slate-400 mb-6 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                    <Camera size={32} className="mb-2" />
                    <span className="text-xs font-semibold">Tap to upload or take photo</span>
                </div>

                <div className="text-left bg-slate-50 p-4 rounded-xl space-y-2">
                    <p className="text-xs font-bold text-slate-700 mb-2">Make sure:</p>
                    <ul className="text-xs text-slate-500 space-y-1 list-disc pl-4">
                        <li>All text is clearly visible</li>
                        <li>No reflection or blur</li>
                        <li>Document is not expired</li>
                    </ul>
                </div>
            </div>

            <Button 
                className="w-full" 
                onClick={() => {
                   setLoading(true);
                   setTimeout(() => {
                       setLoading(false);
                       setIdVerified(true);
                       setStep('OVERVIEW');
                   }, 2000);
                }}
            >
                {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Submit'}
            </Button>
        </div>
    );

     const UploadIDScreen = () => (
         <div className="p-8 animate-fade-in">
             <div className="flex justify-between items-center mb-6">
                <button onClick={() => setStep('DOC_SELECT')} className="text-slate-400 hover:text-slate-600">
                   <ArrowLeft size={20} />
                </button>
                 <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">National ID Verification</h3>
                 <div className="w-5"></div>
            </div>

            <div className="text-center mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Upload both sides of your National ID card</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl h-32 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                        <div className="text-[10px] font-bold uppercase mb-2">Frontside</div>
                        <Camera size={24} />
                    </div>
                    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl h-32 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                        <div className="text-[10px] font-bold uppercase mb-2">Backside</div>
                        <Camera size={24} />
                    </div>
                </div>

                <div className="text-left bg-slate-50 p-4 rounded-xl space-y-2">
                    <p className="text-xs font-bold text-slate-700 mb-2">Make sure:</p>
                    <ul className="text-xs text-slate-500 space-y-1 list-disc pl-4">
                        <li>All text is clear and visible</li>
                        <li>No reflections or blur</li>
                        <li>Document isn't expired</li>
                    </ul>
                </div>
            </div>

            <Button 
                className="w-full" 
                onClick={() => {
                   setLoading(true);
                   setTimeout(() => {
                       setLoading(false);
                       setIdVerified(true);
                       setStep('OVERVIEW');
                   }, 2000);
                }}
            >
                {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Submit'}
            </Button>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative min-h-[500px] flex flex-col">
                {step === 'OVERVIEW' && <OverviewScreen />}
                {step === 'EMAIL_SENT' && <EmailSentScreen />}
                {step === 'EMAIL_RESEND_HELP' && <EmailResendHelpScreen />}
                {step === 'CHANGE_EMAIL' && <ChangeEmailScreen />}
                {step === 'DOC_SELECT' && <DocSelectScreen />}
                {step === 'UPLOAD_PASSPORT' && <UploadPassportScreen />}
                {step === 'UPLOAD_ID' && <UploadIDScreen />}
            </div>
        </div>
    );
};

export default VerificationModal;
