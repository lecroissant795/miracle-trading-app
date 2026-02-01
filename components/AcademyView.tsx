import React from 'react';
import { BookOpen, PlayCircle, Clock, Star, TrendingUp, BarChart2, Check, Search, Plus } from 'lucide-react';
import Card from './Card';
import Button from './Button';

const AcademyView: React.FC = () => {
  const recommendedCourses = [
    {
      id: 1,
      title: "Stock Market Fundamentals",
      author: "Dr. Sarah Johnson",
      lessons: 12,
      duration: "2h 30m",
      rating: 4.9,
      students: "12k",
      progress: 45,
      image: "bg-gradient-to-br from-blue-500 to-indigo-600",
      icon: TrendingUp
    },
     {
      id: 2,
      title: "Technical Analysis Mastery",
      author: "Mark Cuban (Guest)",
      lessons: 24,
      duration: "5h 15m",
      rating: 4.8,
      students: "8.5k",
      progress: 0,
      image: "bg-gradient-to-br from-emerald-500 to-teal-600",
      icon: BarChart2
    }
  ];

  const recentLessons = [
    {
      id: 101,
      title: "Understanding Candlestick Patterns",
      category: "Technical Analysis",
      type: "Video",
      duration: "12 min",
      completed: true
    },
    {
      id: 102,
      title: "Risk Management Strategies",
      category: "Psychology",
      type: "Article",
      duration: "8 min read",
      completed: false
    },
    {
      id: 103,
      title: "How to Read a Balance Sheet",
      category: "Fundamental Analysis",
      type: "Video",
      duration: "18 min",
      completed: false
    }
  ];

  return (
    <div className="p-8 h-full overflow-y-auto animate-fade-in space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Miracle Academy</h2>
                <p className="text-slate-500">Master the markets with expert-led courses</p>
            </div>
             <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search courses..." 
                  className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
                />
            </div>
        </div>

        {/* Featured Hero */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-8 md:p-12 shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974765270-ca1258634369?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80')] bg-cover bg-center opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
            
            <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase mb-4">
                    <Star size={12} className="fill-blue-300" /> Featured Course
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Advanced Options Strategies</h1>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-xl">
                    Learn how to leverage volatility, hedge your portfolio, and generate consistent income using complex option spreads.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Button className="px-8 py-4 text-lg shadow-none">
                        <PlayCircle size={20} className="mr-2" /> Start Learning
                    </Button>
                    <button className="px-8 py-4 rounded-xl font-medium text-white hover:bg-white/10 transition-colors border border-white/10 flex items-center">
                        <Plus size={20} className="mr-2" /> Add to List
                    </button>
                </div>
            </div>
        </div>

        {/* Continue Learning */}
        <section>
            <div className="flex items-center justify-between mb-4">
                 <h3 className="text-xl font-bold text-slate-900">Continue Learning</h3>
                 <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedCourses.map(course => (
                    <div key={course.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex gap-5 group cursor-pointer">
                        <div className={`w-24 h-24 rounded-2xl flex-shrink-0 flex items-center justify-center text-white ${course.image}`}>
                            <course.icon size={32} />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h4 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{course.title}</h4>
                                <div className="text-sm text-slate-500 mb-2">{course.author}</div>
                                <div className="flex items-center gap-4 text-xs text-slate-400">
                                    <span className="flex items-center gap-1"><BookOpen size={14} /> {course.lessons} Lessons</span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
                                    <span className="flex items-center gap-1 text-amber-500 font-medium"><Star size={14} className="fill-amber-500" /> {course.rating}</span>
                                </div>
                            </div>
                            {course.progress > 0 ? (
                                <div className="mt-3">
                                    <div className="flex justify-between text-xs font-semibold mb-1">
                                        <span className="text-slate-700">{course.progress}% Complete</span>
                                        <span className="text-slate-400">5/12</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${course.progress}%` }}></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-3">
                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">Start Course</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Recent Lessons List */}
        <section>
             <h3 className="text-xl font-bold text-slate-900 mb-4">Recent Lessons</h3>
             <Card padding="none" className="overflow-hidden">
                 <div className="divide-y divide-slate-50">
                     {recentLessons.map(lesson => (
                         <div key={lesson.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                             <div className="flex items-center gap-4">
                                 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${lesson.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                     {lesson.completed ? <Check size={18} /> : <PlayCircle size={18} />}
                                 </div>
                                 <div>
                                     <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{lesson.title}</h4>
                                     <div className="text-xs text-slate-500 flex items-center gap-2">
                                         <span>{lesson.category}</span>
                                         <span>•</span>
                                         <span>{lesson.type}</span>
                                     </div>
                                 </div>
                             </div>
                             <div className="flex items-center gap-4">
                                 <span className="text-xs text-slate-400 font-medium">{lesson.duration}</span>
                                 <Button variant="outline" size="sm" className="hidden group-hover:flex">
                                     {lesson.completed ? 'Rewatch' : 'Resume'}
                                 </Button>
                             </div>
                         </div>
                     ))}
                 </div>
                 <div className="p-4 bg-slate-50 text-center">
                     <button className="text-sm font-bold text-blue-600 hover:text-blue-700">View All History</button>
                 </div>
             </Card>
        </section>
    </div>
  );
};
export default AcademyView;