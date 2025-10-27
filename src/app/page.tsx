'use client';

import {
  Menu,
  X,
  ArrowRight,
  Target,
  Eye,
  CheckCircle,
  Calendar,
  MapPin,
  Clock,
  Quote,
  MessageSquare,
  Send,
  Search,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Phone,
  Home as HomeIcon,
  Info,
  Briefcase,
  Newspaper,
  MessageCircle,
  Sparkles,
  Users,
  TrendingUp,
  Zap,
  FileText,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Asante!',
      description: 'Maoni yako yametumwa kikamilifu.',
    });
    setFeedbackData({ name: '', email: '', category: '', message: '' });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: `Kutafuta "${searchQuery}"...`,
      });
      setSearchQuery('');
    }
  };

  const handleNewsletterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      toast({
        title: 'Hongera!',
        description: 'Umejisajili kikamilifu kwa jarida letu.',
      });
      setNewsletterEmail('');
    }
  };

  const events = [
    {
      id: 1,
      title: 'Mkutano wa Wadau wa Kitaifa',
      description:
        'Mkutano mkubwa wa wadau kutoka mikoa yote ili kujadili mipango ya siku zijazo na kubadilishana uzoefu.',
      date: '15 Novemba 2024',
      time: '9:00 AM - 4:00 PM',
      location: 'Ukumbi Mkuu, Dar es Salaam',
      type: 'past',
      image:
        'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80',
    },
    {
      id: 2,
      title: 'Warsha ya Ujenzi wa Uwezo',
      description:
        'Mafunzo ya ujenzi wa uwezo kwa wafanyakazi na washirika wa taasisi katika nyanja mbalimbali za utendaji.',
      date: '28 Disemba 2024',
      time: '8:00 AM - 5:00 PM',
      location: 'Kituo cha Mafunzo, Arusha',
      type: 'past',
      image:
        'https://images.unsplash.com/photo-1716703435453-a7733d600d68?w=800&q=80',
    },
    {
      id: 3,
      title: 'Siku ya Jamii',
      description:
        'Sherehe maalum ya kushirikiana na jamii, kukutana na wadau, na kuonyesha mafanikio ya mwaka uliopita.',
      date: '15 Februari 2025',
      time: '10:00 AM - 3:00 PM',
      location: 'Uwanja wa Michezo, Mwanza',
      type: 'upcoming',
      image:
        'https://images.unsplash.com/photo-1625246433906-6cfa33544b31?w=800&q=80',
    },
    {
      id: 4,
      title: 'Mkutano wa Mwaka wa Bodi',
      description:
        'Mkutano wa kila mwaka wa wajumbe wa bodi kujadili sera, bajeti, na mipango ya mkakati.',
      date: '20 Machi 2025',
      time: '9:00 AM - 1:00 PM',
      location: 'Chumba cha Bodi, Ofisi Kuu',
      type: 'upcoming',
      image:
        'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80',
    },
  ];

  const upcomingEvents = events.filter((e) => e.type === 'upcoming');
  const pastEvents = events.filter((e) => e.type === 'past');
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { id: 'nyumbani', label: 'Nyumbani', icon: HomeIcon },
    { id: 'historia', label: 'Kuhusu Sisi', icon: Info },
    { id: 'matukio', label: 'Matukio', icon: Briefcase },
    { id: 'ujumbe', label: 'Ujumbe', icon: Newspaper },
    { id: 'maoni', label: 'Wasiliana', icon: MessageCircle },
  ];

  const headerHeight = isScrolled ? 'h-16' : 'h-24';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-900">
      {/* Top Contact Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-blue-950 text-white border-b border-blue-900 transition-transform duration-300 ${
          isScrolled ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-sm">
              <Phone size={16} className="text-blue-300" />
              <span className="hidden sm:inline">Hotline:</span>
              <a
                href="tel:1-001-234-5678"
                className="hover:text-blue-300 transition-colors font-medium"
              >
                1-001-234-5678
              </a>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm">
              <Mail size={16} className="text-blue-300" />
              <span className="hidden sm:inline">Email:</span>
              <a
                href="mailto:hello@dream-theme.com"
                className="hover:text-blue-300 transition-colors font-medium"
              >
                hello@dream-theme.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden lg:block">
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-48 h-8 pl-9 pr-3 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder:text-gray-400 focus:outline-none focus:bg-white/20 focus:border-white/30 transition-all"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const value = (e.target as HTMLInputElement).value;
                    if (value.trim()) {
                      setSearchQuery(value);
                      scrollToSection('search');
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
              />
            </div>
            <button
              className="lg:hidden p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => scrollToSection('search')}
            >
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-800/50 translate-y-0'
            : 'bg-transparent translate-y-12'
        } ${headerHeight}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900 dark:text-white">
                  Taasisi Yetu
                </h1>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  Mshirika wako wa kuaminika
                </p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`flex items-center gap-2 transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                    isScrolled
                      ? 'text-gray-700 dark:text-gray-300'
                      : 'text-white'
                  }`}
                >
                  <link.icon size={16} />
                  <span className="text-sm font-medium">{link.label}</span>
                </button>
              ))}
            </nav>

            <button
              className={`md:hidden ${
                isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800">
            <nav className="py-4 space-y-1 px-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                >
                  <link.icon size={16} />
                  <span>{link.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="pt-36">
        {/* Hero Section */}
        <section
          id="nyumbani"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?w=1920&q=80"
              alt="Jengo la Taasisi"
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-cover scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-blue-900/90 to-indigo-900/85"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center text-white mb-16">
              <div className="inline-block mb-6">
                <div className="px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium shadow-xl">
                  ✨ Taasisi ya Maendeleo na Ushirikiano
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Karibu Taasisi Yetu
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                Tunajitolea kuongoza katika maendeleo ya jamii kupitia utendaji
                bora, uwazi, na ushirikiano wa wadau wote.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
                <Button
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-blue-50 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 group px-8 py-6 text-base"
                  onClick={() => scrollToSection('historia')}
                >
                  Jifunze Zaidi
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:border-white/50 shadow-2xl transition-all duration-300 hover:scale-105 px-8 py-6 text-base"
                  onClick={() => scrollToSection('matukio')}
                >
                  Angalia Matukio
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: Target,
                  title: 'Dira Wazi',
                  desc: 'Malengo ya wazi na ya kina',
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  icon: TrendingUp,
                  title: 'Utendaji Bora',
                  desc: 'Tija katika kazi zetu',
                  color: 'from-purple-500 to-pink-500',
                },
                {
                  icon: Eye,
                  title: 'Uwazi Kamili',
                  desc: 'Uwajibikaji kwa wadau',
                  color: 'from-orange-500 to-red-500',
                },
                {
                  icon: Users,
                  title: 'Ushirikiano',
                  desc: 'Kushirikiana na jamii',
                  color: 'from-green-500 to-emerald-500',
                },
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer">
                  <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 p-6 h-full relative overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>
                    <div className="relative flex flex-col items-center text-center text-white">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <item.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-blue-200">{item.desc}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2 backdrop-blur-sm">
              <div className="w-1 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Historia Section */}
        <section
          id="historia"
          className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/20"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
                Kuhusu Sisi
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                Historia Yetu
              </h2>
              <div className="max-w-3xl mx-auto text-gray-600 dark:text-gray-400 space-y-4">
                <p className="text-lg">
                  Taasisi yetu ilianzishwa mwaka 2010 kwa lengo la kuchangia
                  maendeleo endelevu ya jamii kupitia utendaji wa kitaaluma na
                  kiserikali.
                </p>
                <p>
                  Kwa miaka zaidi ya kumi sasa, tumeweka msingi imara katika
                  nyanja mbalimbali za maendeleo, tukishirikiana na wadau wengi
                  ndani na nje ya nchi.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Eye,
                  title: 'Dira Yetu',
                  desc: 'Kuwa taasisi inayoongoza katika kuboresha ubora wa huduma kwa jamii, ikitegemea utendaji bora, uwazi, na ustadi wa hali ya juu.',
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  icon: Target,
                  title: 'Dhamira Yetu',
                  desc: 'Kutoa huduma bora za kitaaluma na kitaalam kwa jamii, tukitumia rasilimali zilizopo kwa ufanisi na uwajibikaji mkubwa.',
                  color: 'from-green-500 to-emerald-500',
                },
                {
                  icon: CheckCircle,
                  title: 'Malengo Yetu',
                  desc: 'Kuboresha ubora wa huduma\nKuimarisha ushirikiano wa wadau\nKuongeza ufanisi wa rasilimali\nKukuza ubunifu na uvumbuzi',
                  color: 'from-purple-500 to-pink-500',
                  isList: true,
                },
              ].map((item, i) => (
                <div key={i}>
                  <Card className="p-8 h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-500 hover:shadow-2xl group relative overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    ></div>
                    <div className="relative">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <item.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {item.title}
                      </h3>
                      {item.isList ? (
                        <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                          {item.desc.split('\n').map((line, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section
          id="matukio"
          className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-950/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium mb-4">
                Matukio
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                Matukio Yetu
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                Fuatilia matukio yetu ya sasa na yajayo. Tunapenda kushirikiana
                na wadau wetu katika shughuli mbalimbali.
              </p>
            </div>

            <div className="mb-20">
              <h3 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-8 flex items-center gap-3">
                <Zap className="h-8 w-8" />
                Matukio Yanayokuja
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {upcomingEvents.map((event) => (
                  <div key={event.id}>
                    <Card className="overflow-hidden group bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800 hover:shadow-2xl transition-all duration-500">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.title}
                          layout="fill"
                          objectFit="cover"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <Badge className="absolute top-4 right-4 bg-green-500 text-white border-0 shadow-lg">
                          Ijayo
                        </Badge>
                      </div>
                      <CardContent className="p-6">
                        <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">
                          {event.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {event.description}
                        </p>
                        <div className="space-y-2.5 text-gray-700 dark:text-gray-300">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                              <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                              <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                              <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg group">
                          Jisajili Sasa
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-600 dark:text-gray-400 mb-8">
                Matukio Yaliyopita
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {pastEvents.map((event) => (
                  <div key={event.id}>
                    <Card className="overflow-hidden group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-500 opacity-80 hover:opacity-100">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.title}
                          layout="fill"
                          objectFit="cover"
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <Badge
                          variant="outline"
                          className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90"
                        >
                          Imepita
                        </Badge>
                      </div>
                      <CardContent className="p-6">
                        <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">
                          {event.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {event.description}
                        </p>
                        <div className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Angalia Picha
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CEO Message Section */}
        <section
          id="ujumbe"
          className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/20 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-purple-950/10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent)]"></div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-4">
                Ujumbe Maalum
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
                Ujumbe wa Mkurugenzi Mkuu
              </h2>
            </div>

            <div>
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-gray-100 dark:border-gray-700 shadow-2xl">
                <CardContent className="p-8 md:p-12">
                  <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="flex justify-center">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                        <Image
                          src="https://images.unsplash.com/photo-1610631066894-62452ccb927c?w=400&q=80"
                          alt="Mkurugenzi Mkuu"
                          width={192}
                          height={192}
                          className="relative rounded-full w-48 h-48 object-cover shadow-2xl"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-xl">
                          <Quote className="h-6 w-6" />
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-4 text-gray-700 dark:text-gray-300">
                      <p className="text-2xl text-blue-600 dark:text-blue-400 italic font-medium">
                        "Tunaamini kwamba nguvu yetu ni ushirikiano na kujitolea
                        kwa lengo moja."
                      </p>
                      <p>
                        Nawashukuru wadau wetu wote kwa imani waliyotuamini
                        katika safari hii nzito ya kujenga taasisi yenye tija.
                        Kazi yetu haifanyiki kwa bidii tu, bali pia kwa kuwa na
                        dira wazi na dhamira ya kuwa na athari halisi kwa jamii.
                      </p>
                      <p>
                        Katika kipindi hiki cha mageuzi ya kiteknolojia na
                        kiuchumi, tunajitahidi kuboresha huduma zetu na kuwa
                        karibu zaidi na wadau wetu.
                      </p>
                      <p>
                        Ninawashukuru kwa msaada na ushirikiano wenu na
                        ninawakaribisha kushiriki katika mafanikio ya kesho.
                        Pamoja tunaweza kufanya mengi.
                      </p>

                      <div className="pt-6 border-t-2 border-gray-200 dark:border-gray-700 mt-6">
                        <p className="font-bold text-xl text-gray-900 dark:text-white">
                          Bi. Amina Mwangi
                        </p>
                        <p className="text-blue-600 dark:text-blue-400">
                          Mkurugenzi Mkuu
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section id="maoni" className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl mb-6 shadow-2xl">
                <MessageSquare className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                Maoni ya Wadau
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                Maoni yenu ni muhimu sana kwetu. Tunashukuru kwa muda wako wa
                kutushirikisha maoni, mapendekezo, au maswali yoyote.
              </p>
            </div>

            <div>
              <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-100 dark:border-gray-700 shadow-2xl">
                <CardContent className="p-8">
                  <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-gray-700 dark:text-gray-300"
                        >
                          Jina Kamili *
                        </Label>
                        <Input
                          id="name"
                          placeholder="Andika jina lako"
                          value={feedbackData.name}
                          onChange={(e) =>
                            setFeedbackData({ ...feedbackData, name: e.target.value })
                          }
                          required
                          className="border-2 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-gray-700 dark:text-gray-300"
                        >
                          Barua Pepe *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="barua@mfano.com"
                          value={feedbackData.email}
                          onChange={(e) =>
                            setFeedbackData({ ...feedbackData, email: e.target.value })
                          }
                          required
                          className="border-2 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="category"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        Kategoria ya Maoni *
                      </Label>
                      <select
                        id="category"
                        className="flex h-11 w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                        value={feedbackData.category}
                        onChange={(e) =>
                          setFeedbackData({ ...feedbackData, category: e.target.value })
                        }
                        required
                      >
                        <option value="">Chagua kategoria</option>
                        <option value="maoni">Maoni ya Jumla</option>
                        <option value="pendekezo">Pendekezo</option>
                        <option value="malalamiko">Malalamiko</option>
                        <option value="maswali">Maswali</option>
                        <option value="sifa">Sifa na Maongezi</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        Ujumbe Wako *
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Andika maoni yako hapa..."
                        rows={6}
                        value={feedbackData.message}
                        onChange={(e) =>
                          setFeedbackData({ ...feedbackData, message: e.target.value })
                        }
                        required
                        className="border-2 focus:border-blue-500 dark:focus:border-blue-400 transition-colors resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group text-base py-6"
                    >
                      Tuma Maoni
                      <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                      Tutajibu ndani ya siku 3 za kazi. Tunakushukuru kwa
                      kuwasiliana nasi.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section
          id="search"
          className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent)]"></div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                Tafuta Habari
              </h2>
              <p className="text-blue-100 text-lg">
                Tafuta habari, ripoti, matukio, na nyaraka zetu za awali kwa
                urahisi
              </p>
            </div>

            <div>
              <Card className="bg-white/10 backdrop-blur-xl border-2 border-white/20 shadow-2xl">
                <CardContent className="p-6">
                  <form
                    onSubmit={handleSearch}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Andika maneno muhimu ya kutafuta..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 h-14 border-2 border-white/30 bg-white/90 dark:bg-gray-900/90 focus:bg-white dark:focus:bg-gray-900 transition-colors text-base"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 px-8 h-14 text-base"
                    >
                      <Search className="mr-2 h-5 w-5" />
                      Tafuta
                    </Button>
                  </form>

                  <div className="mt-6 flex flex-wrap gap-3 justify-center text-sm">
                    <span className="text-white/90">Utafutaji maarufu:</span>
                    {['ripoti ya mwaka', 'matukio', 'sera', 'ajira'].map(
                      (term) => (
                        <button
                          key={term}
                          onClick={() => setSearchQuery(term)}
                          className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
                        >
                          {term}
                        </button>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-950/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div>
              <Card className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 border-0 shadow-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent)]"></div>

                <CardContent className="relative p-8 md:p-12 text-white">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl mb-6 shadow-xl">
                      <Mail className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                      Jiandikishe Jarida letu
                    </h2>
                    <p className="text-blue-100 max-w-2xl mx-auto text-lg">
                      Pata habari za hivi punde kuhusu shughuli zetu, matukio
                      yajayo, na maboresho ya taasisi.
                    </p>
                  </div>

                  <form
                    onSubmit={handleNewsletterSubscribe}
                    className="max-w-md mx-auto mb-10"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Input
                        type="email"
                        placeholder="barua@mfano.com"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        required
                        className="flex-1 h-14 bg-white/10 border-2 border-white/30 text-white placeholder:text-blue-200 focus:bg-white/20 focus:border-white/50 text-base backdrop-blur-sm"
                      />
                      <Button
                        type="submit"
                        size="lg"
                        className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 px-8 h-14 text-base"
                      >
                        Jiandikishe
                      </Button>
                    </div>
                  </form>

                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    {[
                      { icon: CheckCircle, text: 'Habari za kila wiki' },
                      { icon: Calendar, text: 'Matukio maalum' },
                      { icon: FileText, text: 'Ripoti za mwezi' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl"
                      >
                        <item.icon className="h-8 w-8 mb-3 text-blue-200" />
                        <p className="text-blue-100">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-white text-lg">
                  Taasisi Yetu
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Taasisi inayojitolea kuboresha maisha ya jamii kupitia utendaji
                bora, uwazi, na ushirikiano.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">
                Viungo vya Haraka
              </h3>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Wasiliana</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">
                    S.L.P 12345, Dar es Salaam, Tanzania
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-400">+255 123 456 789</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-400">info@taasisi.go.tz</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">
                Mitandao ya Kijamii
              </h3>
              <p className="text-gray-400 mb-4 text-sm">
                Tufuate katika mitandao yetu ya kijamii
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, color: 'hover:bg-blue-600' },
                  { icon: Twitter, color: 'hover:bg-sky-500' },
                  { icon: Instagram, color: 'hover:bg-pink-600' },
                  { icon: Linkedin, color: 'hover:bg-blue-700' },
                  { icon: Youtube, color: 'hover:bg-red-600' },
                ].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className={`w-11 h-11 bg-gray-800 rounded-xl flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p className="text-gray-400">
                © {currentYear} Taasisi Yetu. Haki zote zimehifadhiwa.
              </p>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Sera ya Faragha
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Masharti ya Matumizi
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
