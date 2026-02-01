
import React, { useState } from 'react';
import { 
  User, Shield, Bell, Globe, Camera, Check, Lock, Mail, Smartphone, 
  AlertCircle, CheckCircle, Key, Wallet, FileText, Share2, Gift, 
  MessageSquare, Lightbulb, BookOpen, Trash2, MapPin, ChevronRight
} from 'lucide-react';
import Card from './Card';
import Button from './Button';
import WalletsView from './WalletsView';
import { Portfolio } from '../types';

interface SettingsViewProps {
  portfolio: Portfolio;
  onDeposit: (amount: number) => void;
  onWithdraw: (amount: number) => void;
}

type SettingsTab = 
  | 'PERSONAL' 
  | 'WALLETS' 
  | 'CONTACT' 
  | 'NOTIFICATIONS' 
  | 'SECURITY' 
  | 'REFERRAL' 
  | 'GIFT' 
  | 'MESSAGE' 
  | 'FEATURE' 
  | 'BASICS' 
  | 'LEGAL' 
  | 'CLOSE_ACCOUNT';

const SettingsView: React.FC<SettingsViewProps> = ({ portfolio, onDeposit, onWithdraw }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('PERSONAL');
  const [user, setUser] = useState({
    name: 'Barnabas Inyangsam',
    email: 'barnabas@tradepro.com',
    phone: '+1 (555) 123-4567',
    address: '123 Wall Street, New York, NY 10005',
    bio: 'Full-time trader & tech enthusiast.',
    twoFactor: true,
    marketingEmails: false,
    tradeAlerts: true
  });

  const tabs: { id: SettingsTab; label: string; icon: any }[] = [
    { id: 'PERSONAL', label: 'Personal Details', icon: User },
    { id: 'WALLETS', label: 'Cards and Bank Accounts', icon: Wallet },
    { id: 'CONTACT', label: 'Contact Details', icon: Mail },
    { id: 'NOTIFICATIONS', label: 'Notifications Settings', icon: Bell },
    { id: 'SECURITY', label: 'Security', icon: Shield },
    { id: 'REFERRAL', label: 'Refer to a friend', icon: Share2 },
    { id: 'GIFT', label: 'Buy or Redeem a Gift', icon: Gift },
    { id: 'MESSAGE', label: 'Send us a message', icon: MessageSquare },
    { id: 'FEATURE', label: 'Request a feature', icon: Lightbulb },
    { id: 'BASICS', label: 'Learn the basics', icon: BookOpen },
    { id: 'LEGAL', label: 'Legal Information', icon: FileText },
    { id: 'CLOSE_ACCOUNT', label: 'Close my account', icon: AlertCircle },
  ];

  const renderPersonalDetails = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-6">
        <div className="relative group cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover ring-4 ring-slate-100"
          />
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="text-white" size={24} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Profile Photo</h3>
          <p className="text-sm text-slate-500 mb-3">This will be displayed on your profile.</p>
          <div className="flex gap-3">
             <Button size="sm" variant="outline">Remove</Button>
             <Button size="sm">Change Photo</Button>
          </div>
        </div>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
          <input 
            type="text" 
            value={user.name}
            onChange={(e) => setUser({...user, name: e.target.value})}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Bio</label>
          <textarea 
            value={user.bio}
            onChange={(e) => setUser({...user, bio: e.target.value})}
            rows={3}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
        </div>
        <div className="md:col-span-2 pt-4 flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </form>
    </div>
  );

  const renderContactDetails = () => (
    <div className="space-y-6 animate-fade-in">
      <form className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="email" 
              value={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
          <div className="relative">
            <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="tel" 
              value={user.phone}
              onChange={(e) => setUser({...user, phone: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Physical Address</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 text-slate-400" size={18} />
            <textarea 
              value={user.address}
              onChange={(e) => setUser({...user, address: e.target.value})}
              rows={2}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>
        </div>
        <div className="pt-4 flex justify-end">
          <Button>Update Contact Info</Button>
        </div>
      </form>
    </div>
  );

  const renderReferral = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-md">
          <h3 className="text-2xl font-bold mb-2">Invite friends, get $50</h3>
          <p className="text-blue-100 mb-6">For every friend who joins and makes their first trade, you both get $50 in trading credits.</p>
          <div className="flex gap-2">
            <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 font-mono text-sm flex items-center justify-between">
              MIRACLE-B832
              <button className="text-xs font-bold uppercase tracking-wider hover:text-white transition-colors">Copy</button>
            </div>
            <Button className="bg-white text-blue-600 hover:bg-blue-50 border-none">
              <Share2 size={18} className="mr-2" /> Share
            </Button>
          </div>
        </div>
        <Share2 size={120} className="absolute -right-8 -bottom-8 text-white/10 rotate-12" />
      </div>

      <div className="space-y-4">
        <h4 className="font-bold text-slate-900">Your Referrals</h4>
        <Card className="p-8 text-center border-dashed">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={24} className="text-slate-300" />
          </div>
          <p className="text-slate-500 text-sm">You haven't referred any friends yet. Start sharing!</p>
        </Card>
      </div>
    </div>
  );

  const renderGift = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:border-blue-200 transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Gift size={24} />
          </div>
          <h4 className="font-bold text-slate-900 mb-1">Buy Gift Card</h4>
          <p className="text-sm text-slate-500 mb-4">Give the gift of investment to your loved ones.</p>
          <Button variant="outline" className="w-full">Purchase</Button>
        </Card>
        <Card className="hover:border-emerald-200 transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <CheckCircle size={24} />
          </div>
          <h4 className="font-bold text-slate-900 mb-1">Redeem Code</h4>
          <p className="text-sm text-slate-500 mb-4">Redeem your gift card or promotional code here.</p>
          <Button variant="outline" className="w-full">Redeem</Button>
        </Card>
      </div>
    </div>
  );

  const renderMessage = () => (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h4 className="font-bold text-slate-900">Contact Support</h4>
          <p className="text-sm text-slate-500">Typical response time: &lt; 2 hours</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Subject</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Account Inquiry</option>
              <option>Technical Issue</option>
              <option>Billing Question</option>
              <option>Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Message</label>
            <textarea 
              rows={4}
              placeholder="How can we help you today?"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>
          <Button className="w-full py-4">Send Message</Button>
        </div>
      </Card>
    </div>
  );

  const renderFeature = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center max-w-md mx-auto py-8">
        <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lightbulb size={40} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Have a great idea?</h3>
        <p className="text-slate-500 mb-8">We're always looking for ways to improve Miracle. Tell us what you'd like to see next!</p>
        <form className="space-y-4 text-left">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Feature Title</label>
            <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
            <textarea rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
          <Button className="w-full">Submit Request</Button>
        </form>
      </div>
    </div>
  );

  const renderBasics = () => (
    <div className="space-y-4 animate-fade-in">
      {[
        { title: 'Getting Started with Trading', duration: '5 min read', icon: BookOpen },
        { title: 'Understanding Market Orders', duration: '3 min read', icon: FileText },
        { title: 'How to Secure Your Account', duration: '4 min read', icon: Shield },
        { title: 'Managing Your Portfolio Pies', duration: '6 min read', icon: Wallet }
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between p-5 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <item.icon size={20} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-500">{item.duration}</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-600 transition-colors" />
        </div>
      ))}
      <div className="pt-4">
        <Button variant="outline" className="w-full">Visit Help Center</Button>
      </div>
    </div>
  );

  const renderLegal = () => (
    <div className="space-y-4 animate-fade-in">
      {[
        'Terms of Service',
        'Privacy Policy',
        'Cookie Policy',
        'Trading Disclosure',
        'GDPR Compliance',
        'Licenses'
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
          <span className="font-medium text-slate-700">{item}</span>
          <FileText size={18} className="text-slate-300 group-hover:text-slate-600 transition-colors" />
        </div>
      ))}
      <p className="text-xs text-slate-400 text-center pt-8">
        Miracle Trading Portfolio v2.4.0 (Build 2026.01.30)<br/>
        © 2026 Miracle Financial Inc.
      </p>
    </div>
  );

  const renderCloseAccount = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-xl">
            <AlertCircle size={24} />
          </div>
          <div>
            <h3 className="font-bold text-red-900 mb-1">Before you close your account</h3>
            <ul className="text-sm text-red-700 space-y-2 list-disc ml-4 mt-3">
              <li>Sell all your active holdings and positions</li>
              <li>Withdraw your remaining cash balance ($ {portfolio.cashBalance.toLocaleString()})</li>
              <li>Download your transaction history for tax purposes</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-slate-500 leading-relaxed">
          Closing your account is permanent and cannot be undone. All your data will be anonymized or deleted according to our data retention policy.
        </p>
        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <input type="checkbox" id="confirm-close" className="w-4 h-4 rounded text-red-600 focus:ring-red-500" />
          <label htmlFor="confirm-close" className="text-sm font-medium text-slate-700">
            I understand that this action is irreversible
          </label>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white border-none w-full py-4">
          <Trash2 size={18} className="mr-2" /> Close My Account Permanently
        </Button>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-8 animate-fade-in">
      {/* 2FA */}
      <div>
         <Card className="bg-slate-50 border-none">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <Shield size={24} />
                </div>
                <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-1">Two-Factor Authentication</h3>
                <p className="text-sm text-slate-500 mb-4">Add an extra layer of security to your account by requiring a code when logging in.</p>
                <div className="flex items-center gap-3">
                    <div 
                        onClick={() => setUser({...user, twoFactor: !user.twoFactor})}
                        className={`w-12 h-6 rounded-full cursor-pointer transition-colors relative ${user.twoFactor ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${user.twoFactor ? 'left-7' : 'left-1'}`}></div>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{user.twoFactor ? 'Enabled' : 'Disabled'}</span>
                </div>
                </div>
            </div>
         </Card>
      </div>

      {/* Account Recovery */}
      <div>
        <h3 className="font-bold text-slate-900 mb-4">Account Recovery</h3>
        <Card className="border-orange-100 bg-orange-50/30">
             <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                    <Key size={24} />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-1">Recovery Key</h3>
                    <p className="text-sm text-slate-500 mb-4">A recovery key provides access to your account if you lose your password and second factor devices. Keep it safe.</p>
                    <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">Generate New Key</Button>
                </div>
             </div>
        </Card>
      </div>

      {/* Password */}
      <div className="border-t border-slate-100 pt-8">
        <h3 className="font-bold text-slate-900 mb-6">Change Password</h3>
        <form className="max-w-md space-y-4">
           <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Current Password</label>
              <div className="relative">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                 <input type="password" placeholder="••••••••" className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-blue-500" />
              </div>
           </div>
           <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">New Password</label>
              <div className="relative">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                 <input type="password" placeholder="••••••••" className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-blue-500" />
              </div>
           </div>
           <div className="pt-2">
              <Button variant="outline">Update Password</Button>
           </div>
        </form>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6 animate-fade-in">
       {[
         { title: 'Trade Confirmations', desc: 'Receive emails when your orders are executed.', icon: Check, state: user.tradeAlerts },
         { title: 'Market Volatility Alerts', desc: 'Get notified when your watchlist assets move significantly.', icon: AlertCircle, state: true },
         { title: 'New Device Sign-in', desc: 'Security alert when your account is accessed from a new IP.', icon: Smartphone, state: true },
         { title: 'Marketing & Newsletter', desc: 'Receive product updates and weekly market recaps.', icon: Mail, state: user.marketingEmails }
       ].map((item, i) => (
         <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:border-slate-200 transition-colors">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center">
                  <item.icon size={20} />
               </div>
               <div>
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500">{item.desc}</p>
               </div>
            </div>
            <div 
              onClick={() => {}}
              className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors ${item.state ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${item.state ? 'left-7' : 'left-1'}`}></div>
            </div>
         </div>
       ))}
    </div>
  );



  return (
    <div className="flex flex-col md:flex-row h-full overflow-hidden bg-white animate-fade-in">
      {/* Settings Navigation */}
      <div className="w-full md:w-72 bg-slate-50/50 border-r border-slate-100 p-6 flex-shrink-0 overflow-y-auto">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Settings</h2>
        <p className="text-xs text-slate-500 mb-6">Manage your account preferences</p>
        
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-white shadow-sm text-blue-600 font-bold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 font-medium'}`}
            >
              <tab.icon size={18} />
              <span className="text-sm truncate">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {activeTab === 'WALLETS' ? (
           <div className="flex-1 overflow-hidden relative">
              <WalletsView portfolio={portfolio} onDeposit={onDeposit} onWithdraw={onWithdraw} />
           </div>
        ) : (
            <div className="flex-1 overflow-y-auto p-8 lg:p-12">
                <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">{tabs.find(t => t.id === activeTab)?.label}</h1>
                    <p className="text-slate-500">Update your {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} details here.</p>
                </div>
                
                {activeTab === 'PERSONAL' && renderPersonalDetails()}
                {activeTab === 'CONTACT' && renderContactDetails()}
                {activeTab === 'SECURITY' && renderSecurity()}
                {activeTab === 'NOTIFICATIONS' && renderNotifications()}
                {activeTab === 'REFERRAL' && renderReferral()}
                {activeTab === 'GIFT' && renderGift()}
                {activeTab === 'MESSAGE' && renderMessage()}
                {activeTab === 'FEATURE' && renderFeature()}
                {activeTab === 'BASICS' && renderBasics()}
                {activeTab === 'LEGAL' && renderLegal()}
                {activeTab === 'CLOSE_ACCOUNT' && renderCloseAccount()}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default SettingsView;
