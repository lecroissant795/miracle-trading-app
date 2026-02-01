import React, { useState } from 'react';
import { Search, MessageCircle, Mail, Phone, ChevronDown, ChevronUp, User, CreditCard, Shield, TrendingUp, FileText, ExternalLink, HelpCircle } from 'lucide-react';
import Button from './Button';
import Card from './Card';

const SupportView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const topics = [
    { icon: User, title: 'Account Management', description: 'Profile, settings, & verification' },
    { icon: TrendingUp, title: 'Trading & Investing', description: 'Orders, charts, & execution' },
    { icon: CreditCard, title: 'Deposits & Withdrawals', description: 'Bank transfers, cards, & fees' },
    { icon: Shield, title: 'Security & Privacy', description: '2FA, password, & data protection' },
  ];

  const faqs = [
    {
      question: "How long do withdrawals take?",
      answer: "Withdrawals to bank accounts typically take 1-3 business days. Withdrawals to debit cards usually process instantly or within 30 minutes depending on your bank's processing times."
    },
    {
      question: "What are the trading fees?",
      answer: "We offer commission-free trading on stocks and ETFs. For options, there is a $0.65 fee per contract. Crypto trades carry a small spread fee of 0.5%."
    },
    {
      question: "How do I verify my identity?",
      answer: "Go to Settings > Account Verification. You'll need to upload a photo of your government-issued ID (Passport or Driver's License) and take a selfie for liveness check."
    },
    {
      question: "Is my money safe?",
      answer: "Yes. Your securities are SIPC protected up to $500,000 (including $250,000 for claims for cash). We also use bank-grade encryption to protect your personal data."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="p-8 h-full overflow-y-auto animate-fade-in space-y-10">
      
      {/* Hero Search Section */}
      <div className="bg-slate-900 rounded-3xl p-10 text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
           <div className="absolute top-[-50%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-[-50%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">How can we help you?</h1>
          <p className="text-slate-300 mb-8">Search our knowledge base or browse common topics below.</p>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search for answers (e.g. 'reset password', 'deposit limit')" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white text-slate-900 rounded-2xl py-4 pl-12 pr-4 shadow-xl focus:ring-4 focus:ring-blue-500/30 focus:outline-none text-lg"
            />
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-6">Browse by Topic</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all cursor-pointer group text-center md:text-left">
              <div className="w-14 h-14 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center mb-4 mx-auto md:mx-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <topic.icon size={28} />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">{topic.title}</h3>
              <p className="text-sm text-slate-500">{topic.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content: FAQs and Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* FAQ Section */}
        <div className="lg:col-span-2 space-y-6">
           <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
           <div className="space-y-4">
             {faqs.map((faq, index) => (
               <div key={index} className="bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all">
                 <button 
                   onClick={() => toggleFaq(index)}
                   className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
                 >
                   {faq.question}
                   {openFaqIndex === index ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                 </button>
                 {openFaqIndex === index && (
                   <div className="px-5 pb-5 text-slate-500 leading-relaxed text-sm animate-fade-in">
                     {faq.answer}
                   </div>
                 )}
               </div>
             ))}
           </div>
           
           <div className="mt-6 p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-white rounded-full shadow-sm text-blue-600">
                    <FileText size={24} />
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900">Documentation</h4>
                    <p className="text-sm text-slate-500">Read our detailed API docs and user guides</p>
                 </div>
              </div>
              <Button variant="outline" size="sm">
                 Visit Docs <ExternalLink size={14} className="ml-2" />
              </Button>
           </div>
        </div>

        {/* Contact Sidebar */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none">
             <div className="flex items-center gap-3 mb-6">
               <HelpCircle size={24} className="text-blue-200" />
               <h3 className="text-lg font-bold">Still need help?</h3>
             </div>
             <p className="text-blue-100 text-sm mb-6 leading-relaxed">
               Our support team is available 24/7 to assist you with any issues or questions.
             </p>
             
             <div className="space-y-3">
               <button className="w-full bg-white text-blue-700 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 shadow-lg">
                 <MessageCircle size={18} /> Start Live Chat
               </button>
               <button className="w-full bg-blue-800/50 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 border border-blue-500/30">
                 <Phone size={18} /> Request Call
               </button>
               <button className="w-full bg-blue-800/50 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 border border-blue-500/30">
                 <Mail size={18} /> Email Support
               </button>
             </div>
          </Card>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 text-center">
             <h4 className="font-bold text-slate-900 mb-2">System Status</h4>
             <div className="flex items-center justify-center gap-2 mb-4">
               <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
               <span className="text-sm font-medium text-emerald-600">All Systems Operational</span>
             </div>
             <div className="text-xs text-slate-400">
               Last updated: Just now
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportView;