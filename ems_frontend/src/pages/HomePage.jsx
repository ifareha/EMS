import React from "react";
import {
  Users,
  Clock,
  DollarSign,
  Star,
  Shield,
  Zap,
  TrendingUp,
  CheckCircle,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div
    className="min-h-screen flex flex-col relative overflow-hidden"
    style={{
      background: "linear-gradient(to bottom, #8399a2, #eef2f3)",
    }}>
    {/* Animated background elements */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-24 h-24 bg-white rounded-full blur-lg animate-bounce delay-300"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full blur-md animate-pulse delay-700"></div>
    </div>

    {/* Header */}
    <header className="relative z-10 flex justify-between items-center p-6 lg:px-12">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
          <Users className="w-6 h-6 text-white/90" />
        </div>
        <span className="text-3xl font-bold text-white drop-shadow-lg">
          EMS
        </span>
      </div>
      <nav className="hidden md:flex items-center space-x-8">
        <a
          href="/about"
          className="text-white/90 hover:text-white transition-colors duration-300 font-medium hover:drop-shadow-lg">
          About
        </a>
        <a
          href="/features"
          className="text-white/90 hover:text-white transition-colors duration-300 font-medium hover:drop-shadow-lg">
          Features
        </a>
        <a
          href="/contact"
          className="text-white/90 hover:text-white transition-colors duration-300 font-medium hover:drop-shadow-lg">
          Contact
        </a>
        <div className="flex items-center space-x-3">
          <Link to="/login">
            <Button
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg group">
              <LogIn className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Login
            </Button>
          </Link>

          {/* signup button */}

          {/* <Button className="bg-white text-gray-800 hover:bg-white/90 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg group">
            <UserPlus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
            Sign Up
          </Button> */}
        </div>
      </nav>
    </header>

    {/* Main Content */}
    <main className="flex-1 flex flex-col items-center justify-center px-6 lg:px-12 relative z-10">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-6 animate-fade-in">
          <div className="inline-block">
            <span className="bg-white/15 backdrop-blur-sm text-white/95 px-4 py-2 rounded-full text-sm font-medium border border-white/25">
              ✨ Modern Employee Management
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-white/95 leading-tight drop-shadow-2xl animate-float">
            Employee
            <span className="block bg-gradient-to-r from-blue-100 to-white/90 bg-clip-text text-transparent animate-pulse-subtle">
              Management
            </span>
            <span className="block animate-bounce-subtle">System</span>
          </h1>

          <p className="text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Transform your HR operations with our comprehensive platform that
            streamlines
            <span className="font-semibold">
              {" "}
              payroll, attendance, and performance management
            </span>
            in one secure, intelligent solution.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button
            size="lg"
            className="bg-white text-gray-800 hover:bg-white/90 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 px-8 py-4 text-lg font-semibold animate-pulse-glow group">
            <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 group-hover:text-yellow-500 transition-all duration-300" />
            Get Started Free
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-500 hover:scale-110 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl group">
            <Star className="w-5 h-5 mr-2 group-hover:rotate-180 group-hover:text-yellow-300 transition-all duration-500" />
            Watch Demo
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center space-x-6 pt-8 text-white/70 animate-slide-up">
          <div className="flex items-center space-x-2 hover:text-white/90 transition-colors duration-300 hover:scale-105 transform">
            <CheckCircle className="w-5 h-5 animate-spin-slow" />
            <span className="text-sm font-medium">SOC 2 Compliant</span>
          </div>
          <div className="flex items-center space-x-2 hover:text-white/90 transition-colors duration-300 hover:scale-105 transform">
            <Shield className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-medium">Bank-Level Security</span>
          </div>
          <div className="flex items-center space-x-2 hover:text-white/90 transition-colors duration-300 hover:scale-105 transform">
            <TrendingUp className="w-5 h-5 animate-bounce-slow" />
            <span className="text-sm font-medium">99.9% Uptime</span>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mt-20 w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Users,
              title: "Employee Profiles",
              description:
                "Comprehensive employee data management with custom fields and document storage",
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: Clock,
              title: "Attendance & Leave",
              description:
                "Real-time tracking, automated approvals, and intelligent scheduling",
              color: "from-purple-500 to-purple-600",
            },
            {
              icon: DollarSign,
              title: "Smart Payroll",
              description:
                "Automated calculations, tax compliance, and direct deposit integration",
              color: "from-green-500 to-green-600",
            },
            {
              icon: Star,
              title: "Performance Reviews",
              description:
                "360° feedback, goal tracking, and data-driven performance insights",
              color: "from-orange-500 to-orange-600",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-110 hover:shadow-2xl cursor-pointer shadow-lg hover:rotate-1 transform">
              <CardContent className="p-6 text-center space-y-4">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} shadow-2xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 animate-float-delayed`}>
                  <feature.icon className="w-8 h-8 text-white group-hover:animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white mb-2 group-hover:text-shadow-lg transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-20 w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { number: "10,000+", label: "Happy Employees" },
            { number: "500+", label: "Companies Trust Us" },
            { number: "99.9%", label: "System Uptime" },
          ].map((stat, index) => (
            <div
              key={index}
              className="space-y-2 group hover:scale-110 transition-transform duration-500 animate-count-up">
              <div className="text-4xl lg:text-5xl font-bold text-white/95 drop-shadow-2xl group-hover:text-shadow-glow transition-all duration-300 animate-pulse-number">
                {stat.number}
              </div>
              <div className="text-white/70 font-medium group-hover:text-white/90 transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>

    {/* Footer */}
    <footer className="relative z-10 text-center py-8 text-white/70 border-t border-white/10">
      <div className="space-y-4">
        <div className="flex justify-center space-x-8 text-sm">
          <a href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="/support" className="hover:text-white transition-colors">
            Support
          </a>
        </div>
        <p className="text-sm">
          &copy; 2025 EMS. All rights reserved. Built with ❤️ for modern
          workplaces.
        </p>
      </div>
    </footer>
  </div>
);

export default HomePage;
