import React, { useState } from 'react';
import { Search, MessageCircle, Mail, Phone, ChevronDown, ChevronUp, User, CreditCard, Shield, TrendingUp, FileText, ExternalLink, HelpCircle } from 'lucide-react';
import Button from './Button';
import Card from './Card';
import { useTranslation } from '../services/LanguageContext';

const SupportView: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const topics = [
    { icon: User, title: t.support.topics.account.title, description: t.support.topics.account.desc },
    { icon: TrendingUp, title: t.support.topics.trading.title, description: t.support.topics.trading.desc },
    { icon: CreditCard, title: t.support.topics.deposits.title, description: t.support.topics.deposits.desc },
    { icon: Shield, title: t.support.topics.security.title, description: t.support.topics.security.desc },
  ];

  const faqs = [
    {
      question: t.support.faqs.withdrawals.question,
      answer: t.support.faqs.withdrawals.answer
    },
    {
      question: t.support.faqs.fees.question,
      answer: t.support.faqs.fees.answer
    },
    {
      question: t.support.faqs.identity.question,
      answer: t.support.faqs.identity.answer
    },
    {
      question: t.support.faqs.safety.question,
      answer: t.support.faqs.safety.answer
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
          <h1 className="text-3xl font-bold text-white mb-4">{t.support.title}</h1>
          <p className="text-slate-300 mb-8">{t.support.subtitle}</p>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder={t.support.searchPlaceholder} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white text-slate-900 rounded-2xl py-4 pl-12 pr-4 shadow-xl focus:ring-4 focus:ring-blue-500/30 focus:outline-none text-lg"
            />
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-6">{t.support.browseByTopic}</h2>
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
           <h2 className="text-xl font-bold text-slate-900">{t.support.faqsTitle}</h2>
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
                    <h4 className="font-bold text-slate-900">{t.support.documentation}</h4>
                    <p className="text-sm text-slate-500">{t.support.docDesc}</p>
                 </div>
              </div>
              <Button variant="outline" size="sm">
                 {t.support.visitDocs} <ExternalLink size={14} className="ml-2" />
              </Button>
           </div>
        </div>

        {/* Contact Sidebar */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none">
             <div className="flex items-center gap-3 mb-6">
               <HelpCircle size={24} className="text-blue-200" />
               <h3 className="text-lg font-bold">{t.support.needMoreHelp}</h3>
             </div>
             <p className="text-blue-100 text-sm mb-6 leading-relaxed">
               {t.support.supportAvailability}
             </p>
             
             <div className="space-y-3">
               <button className="w-full bg-white text-blue-700 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 shadow-lg">
                 <MessageCircle size={18} /> {t.support.startChat}
               </button>
               <button className="w-full bg-blue-800/50 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 border border-blue-500/30">
                 <Phone size={18} /> {t.support.requestCall}
               </button>
               <button className="w-full bg-blue-800/50 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 border border-blue-500/30">
                 <Mail size={18} /> {t.support.emailSupport}
               </button>
             </div>
          </Card>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 text-center">
             <h4 className="font-bold text-slate-900 mb-2">{t.support.status}</h4>
             <div className="flex items-center justify-center gap-2 mb-4">
               <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
               <span className="text-sm font-medium text-emerald-600">{t.support.systemsOperational}</span>
             </div>
             <div className="text-xs text-slate-400">
               {t.stockDetail.pricesDelayed}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportView;