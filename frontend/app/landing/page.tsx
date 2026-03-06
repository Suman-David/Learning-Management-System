'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  PlayCircle, 
  Award, 
  Users, 
  CheckCircle,
  ArrowRight,
  Star,
  Menu,
  X
} from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <PlayCircle className="w-8 h-8" />,
      title: 'Video Learning',
      description: 'High-quality video courses from industry experts with interactive playback.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed progress tracking and achievements.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Expert Instructors',
      description: 'Learn from professionals with real-world experience in their fields.'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Structured Curriculum',
      description: 'Well-organized courses with sequential learning paths and assessments.'
    }
  ];

  const courses = [
    {
      title: 'AI & Machine Learning',
      description: 'Master the fundamentals of AI, neural networks, and deep learning.',
      image: '🤖',
      lessons: 24,
      students: '2.5k+',
      rating: 4.9
    },
    {
      title: 'Python Programming',
      description: 'Learn Python from scratch to advanced concepts and real-world applications.',
      image: '🐍',
      lessons: 32,
      students: '5k+',
      rating: 4.8
    },
    {
      title: 'Java Development',
      description: 'Build robust applications with Java, Spring Boot, and modern frameworks.',
      image: '☕',
      lessons: 28,
      students: '3k+',
      rating: 4.7
    },
    {
      title: 'Data Science',
      description: 'Analyze data, create visualizations, and build predictive models.',
      image: '📊',
      lessons: 20,
      students: '1.8k+',
      rating: 4.8
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Developer',
      content: 'The AI & ML course completely transformed my career. The structured approach and hands-on projects were exactly what I needed.',
      avatar: '👩‍💻'
    },
    {
      name: 'Michael Chen',
      role: 'Data Analyst',
      content: 'Best learning platform I\'ve used. The video quality is excellent and the progress tracking keeps me motivated.',
      avatar: '👨‍💼'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Student',
      content: 'I went from zero coding knowledge to building my own apps. The Python course is incredibly well-structured!',
      avatar: '👩‍🎓'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/landing" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                EduLearn
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className={`hover:text-indigo-500 transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}>Features</a>
              <a href="#courses" className={`hover:text-indigo-500 transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}>Courses</a>
              <a href="#testimonials" className={`hover:text-indigo-500 transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}>Testimonials</a>
              <Link 
                href="/auth/login"
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  isScrolled 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                    : 'bg-white text-indigo-600 hover:bg-gray-100'
                }`}
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white rounded-2xl shadow-xl mt-2 p-4">
              <a href="#features" className="block py-3 text-gray-700 hover:text-indigo-600">Features</a>
              <a href="#courses" className="block py-3 text-gray-700 hover:text-indigo-600">Courses</a>
              <a href="#testimonials" className="block py-3 text-gray-700 hover:text-indigo-600">Testimonials</a>
              <Link 
                href="/auth/login"
                className="block w-full text-center py-3 mt-2 bg-indigo-600 text-white rounded-full font-medium"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-8">
            <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
            Now with AI-Powered Learning Assistant
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Master New Skills<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
              Shape Your Future
            </span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Access world-class courses in AI, programming, and data science. 
            Learn at your own pace with expert-led video content and track your progress.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/register"
              className="px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
            >
              Start Learning Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/auth/login"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-full font-semibold text-lg hover:bg-white/20 transition-all"
            >
              Sign In
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">10K+</div>
              <div className="text-white/70 text-sm mt-1">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">50+</div>
              <div className="text-white/70 text-sm mt-1">Expert Courses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">95%</div>
              <div className="text-white/70 text-sm mt-1">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose EduLearn?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform is designed to provide the best learning experience 
              with cutting-edge features and expert content.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start your learning journey with our most popular courses 
              designed by industry experts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all group"
              >
                <div className="h-48 bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                  {course.image}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{course.rating}</span>
                    <span className="text-sm text-gray-400">({course.students} students)</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{course.lessons} lessons</span>
                    <Link 
                      href="/auth/register"
                      className="text-indigo-600 font-medium hover:text-indigo-700"
                    >
                      Enroll Now →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/auth/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors"
            >
              View All Courses
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied learners who have transformed their careers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Join our community of 10,000+ learners and start your journey today. 
            Get unlimited access to all courses with our free plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/register"
              className="px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all"
            >
              Create Free Account
            </Link>
            <div className="flex items-center justify-center gap-2 text-white/90">
              <CheckCircle className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">EduLearn</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering learners worldwide with quality education and cutting-edge technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#courses" className="hover:text-white transition-colors">Courses</a></li>
                <li><Link href="/auth/login" className="hover:text-white transition-colors">Sign In</Link></li>
                <li><Link href="/auth/register" className="hover:text-white transition-colors">Get Started</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Courses</h4>
              <ul className="space-y-2 text-gray-400">
                <li><span className="hover:text-white transition-colors cursor-pointer">AI & Machine Learning</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Python Programming</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Java Development</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Data Science</span></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@edulearn.com</li>
                <li>+1 (555) 123-4567</li>
                <li>San Francisco, CA</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EduLearn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
