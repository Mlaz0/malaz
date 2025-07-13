"use client";

import React from "react";
import {
  Users,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
  Heart,
  Brain,
  FileText,
  Shield,
  Bell,
  HelpCircle,
  Activity,
  Search,
  Filter,
  Download,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  UserPlus,
  PanelLeft,
} from "lucide-react";

// Mock components - replace with your actual UI components
const Card = ({ children, className = "" }) => (
  <div className={`card-modern rounded-lg ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 pb-3 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  const variants = {
    default: "btn-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
  >
    {children}
  </span>
);

const Avatar = ({ children, className = "" }) => (
  <div
    className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
  >
    {children}
  </div>
);

const AvatarImage = ({ src, alt }) => (
  <img
    className="aspect-square h-full w-full"
    src={src || "/placeholder.svg"}
    alt={alt}
  />
);

const AvatarFallback = ({ children }) => (
  <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
    {children}
  </div>
);

// Stats data
const stats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12.5%",
    changeType: "positive",
    icon: Users,
    description: "Active users this month",
  },
  {
    title: "Sessions Today",
    value: "156",
    change: "+8.2%",
    changeType: "positive",
    icon: Calendar,
    description: "Therapy sessions scheduled",
  },
  {
    title: "Messages",
    value: "1,234",
    change: "+23.1%",
    changeType: "positive",
    icon: MessageSquare,
    description: "Messages exchanged today",
  },
  {
    title: "Wellness Score",
    value: "87.3%",
    change: "+5.4%",
    changeType: "positive",
    icon: Heart,
    description: "Average user wellness",
  },
  {
    title: "Active Therapists",
    value: "89",
    change: "+2.1%",
    changeType: "positive",
    icon: Brain,
    description: "Online therapists",
  },
  {
    title: "Avg Session Time",
    value: "45m",
    change: "-3.2%",
    changeType: "negative",
    icon: Clock,
    description: "Average session duration",
  },
  {
    title: "Completion Rate",
    value: "94.2%",
    change: "+1.8%",
    changeType: "positive",
    icon: CheckCircle,
    description: "Session completion rate",
  },
  {
    title: "Growth Rate",
    value: "15.7%",
    change: "+4.3%",
    changeType: "positive",
    icon: TrendingUp,
    description: "Monthly user growth",
  },
];

// Recent activities data
const activities = [
  {
    id: 1,
    type: "session",
    user: "Emma Thompson",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "completed a therapy session",
    time: "2 minutes ago",
    status: "completed",
    icon: Calendar,
  },
  {
    id: 2,
    type: "message",
    user: "Dr. Michael Chen",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "sent a message to patient",
    time: "5 minutes ago",
    status: "active",
    icon: MessageSquare,
  },
  {
    id: 3,
    type: "registration",
    user: "Sarah Wilson",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "registered as new patient",
    time: "12 minutes ago",
    status: "new",
    icon: UserPlus,
  },
  {
    id: 4,
    type: "wellness",
    user: "James Rodriguez",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "updated wellness check-in",
    time: "18 minutes ago",
    status: "wellness",
    icon: Heart,
  },
  {
    id: 5,
    type: "alert",
    user: "System Alert",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "Crisis intervention triggered",
    time: "25 minutes ago",
    status: "urgent",
    icon: AlertCircle,
  },
];

const statusColors = {
  completed:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  active: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  new: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  wellness: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  urgent: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

// Sidebar component
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", icon: BarChart3, isActive: true },
        { title: "Analytics", icon: Activity },
      ],
    },
    {
      title: "User Management",
      items: [
        { title: "All Users", icon: Users },
        { title: "Therapists", icon: Heart },
        { title: "Patients", icon: Brain },
      ],
    },
    {
      title: "Content & Sessions",
      items: [
        { title: "Sessions", icon: Calendar },
        { title: "Messages", icon: MessageSquare },
        { title: "Resources", icon: FileText },
      ],
    },
    {
      title: "System",
      items: [
        { title: "Settings", icon: Settings },
        { title: "Security", icon: Shield },
        { title: "Notifications", icon: Bell },
        { title: "Help & Support", icon: HelpCircle },
      ],
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-64 bg-sidebar text-sidebar-foreground transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-sidebar-border">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-sidebar-primary">
              MindCare
            </h2>
            <p className="text-xs text-sidebar-foreground/70">
              Admin Dashboard
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          {navItems.map((section) => (
            <div key={section.title} className="px-3 py-2">
              <h3 className="mb-2 px-3 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.title}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                      item.isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="Dr. Sarah Johnson"
              />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                Dr. Sarah Johnson
              </p>
              <p className="text-xs text-sidebar-foreground/70 truncate">
                sarah@mentalhealth.app
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Stats Cards Component
const StatsCards = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {stats.map((stat, index) => (
      <Card
        key={stat.title}
        className="animate-fade-in-up"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {stat.title}
          </CardTitle>
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <stat.icon className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold gradient-text">{stat.value}</div>
          <div className="flex items-center space-x-2 text-xs">
            <span
              className={`font-medium ${
                stat.changeType === "positive"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {stat.change}
            </span>
            <span className="text-muted-foreground">from last month</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {stat.description}
          </p>
        </CardContent>
      </Card>
    ))}
  </div>
);

// Recent Activity Component
const RecentActivity = () => (
  <Card className="animate-fade-in-up">
    <CardHeader>
      <CardTitle className="gradient-text">Recent Activity</CardTitle>
      <CardDescription>
        Latest user interactions and system events
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-center space-x-4 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={activity.avatar || "/placeholder.svg"}
                  alt={activity.user}
                />
                <AvatarFallback>
                  {activity.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-gradient-primary flex items-center justify-center">
                <activity.icon className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium truncate">
                  <span className="gradient-text">{activity.user}</span>{" "}
                  {activity.action}
                </p>
                <Badge className={statusColors[activity.status]}>
                  {activity.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Simple Chart Component (you can replace with actual chart library)
const SimpleChart = () => (
  <Card className="animate-fade-in-scale">
    <CardHeader>
      <CardTitle className="gradient-text">User Growth & Engagement</CardTitle>
      <CardDescription>
        Monthly overview of user registrations, session bookings, and wellness
        scores
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-[300px] flex items-center justify-center bg-gradient-secondary rounded-lg">
        <div className="text-center">
          <BarChart3 className="h-16 w-16 mx-auto text-primary mb-4" />
          <p className="text-muted-foreground">
            Chart visualization would go here
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Replace with your preferred chart library
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Main Dashboard Component
const AdminDashboard = () => {
  // const [sidebarOpen, setSidebarOpen] = React.useState(false);
  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };
  // return (
  //   <div className="min-h-screen bg-gradient-hero">
  //     <div className="flex">
  //       {/* Sidebar */}
  //       <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
  //       {/* Main Content */}
  //       <div className="flex-1 lg:ml-0">
  //         {/* Header */}
  //         <header className="flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6">
  //           <Button
  //             variant="ghost"
  //             size="icon"
  //             className="lg:hidden"
  //             onClick={toggleSidebar}
  //           >
  //             <PanelLeft className="h-5 w-5" />
  //           </Button>
  //           <div className="flex-1">
  //             <h1 className="text-lg font-semibold gradient-text">Dashboard</h1>
  //           </div>
  //           <div className="flex items-center space-x-4">
  //             <div className="relative hidden md:block">
  //               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
  //               <Input
  //                 placeholder="Search users, sessions..."
  //                 className="w-64 pl-10 focus-ring"
  //               />
  //             </div>
  //             <Button
  //               variant="outline"
  //               size="sm"
  //               className="focus-ring bg-transparent"
  //             >
  //               <Filter className="h-4 w-4 mr-2" />
  //               Filter
  //             </Button>
  //             <Button
  //               variant="outline"
  //               size="sm"
  //               className="focus-ring bg-transparent"
  //             >
  //               <Download className="h-4 w-4 mr-2" />
  //               Export
  //             </Button>
  //             <Button size="sm" className="btn-primary focus-ring">
  //               <Plus className="h-4 w-4 mr-2" />
  //               Add User
  //             </Button>
  //             <Button
  //               variant="outline"
  //               size="icon"
  //               className="relative focus-ring bg-transparent"
  //             >
  //               <Bell className="h-4 w-4" />
  //               <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
  //                 3
  //               </Badge>
  //             </Button>
  //           </div>
  //         </header>
  //         {/* Main Content Area */}
  //         <main className="flex-1 p-4 lg:p-6 space-y-6">
  //           {/* Welcome Section */}
  //           <div className="animate-fade-in-up">
  //             <h1 className="text-3xl font-bold gradient-text mb-2">
  //               Welcome back, Dr. Johnson! 👋
  //             </h1>
  //             <p className="text-muted-foreground">
  //               Here's what's happening with your mental health platform today.
  //             </p>
  //           </div>
  //           {/* Stats Cards */}
  //           <StatsCards />
  //           {/* Charts and Activity */}
  //           <div className="grid gap-6 lg:grid-cols-3">
  //             <div className="lg:col-span-2">
  //               <SimpleChart />
  //             </div>
  //             <div className="lg:col-span-1">
  //               <RecentActivity />
  //             </div>
  //           </div>
  //           {/* Quick Actions */}
  //           <Card className="animate-fade-in-up">
  //             <CardHeader>
  //               <CardTitle className="gradient-text">Quick Actions</CardTitle>
  //               <CardDescription>
  //                 Common administrative tasks and shortcuts
  //               </CardDescription>
  //             </CardHeader>
  //             <CardContent>
  //               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  //                 <Button
  //                   variant="outline"
  //                   className="h-20 flex-col space-y-2 focus-ring bg-transparent"
  //                 >
  //                   <Plus className="h-6 w-6" />
  //                   <span>Add Therapist</span>
  //                 </Button>
  //                 <Button
  //                   variant="outline"
  //                   className="h-20 flex-col space-y-2 focus-ring bg-transparent"
  //                 >
  //                   <Bell className="h-6 w-6" />
  //                   <span>Send Notification</span>
  //                 </Button>
  //                 <Button
  //                   variant="outline"
  //                   className="h-20 flex-col space-y-2 focus-ring bg-transparent"
  //                 >
  //                   <Download className="h-6 w-6" />
  //                   <span>Generate Report</span>
  //                 </Button>
  //                 <Button
  //                   variant="outline"
  //                   className="h-20 flex-col space-y-2 focus-ring bg-transparent"
  //                 >
  //                   <Search className="h-6 w-6" />
  //                   <span>User Lookup</span>
  //                 </Button>
  //               </div>
  //             </CardContent>
  //           </Card>
  //           {/* System Status */}
  //           <div className="grid gap-6 md:grid-cols-2">
  //             <Card className="animate-fade-in-up">
  //               <CardHeader>
  //                 <CardTitle className="gradient-text">System Health</CardTitle>
  //                 <CardDescription>
  //                   Current system performance metrics
  //                 </CardDescription>
  //               </CardHeader>
  //               <CardContent>
  //                 <div className="space-y-4">
  //                   <div className="flex items-center justify-between">
  //                     <span className="text-sm font-medium">Server Uptime</span>
  //                     <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
  //                       99.9%
  //                     </Badge>
  //                   </div>
  //                   <div className="flex items-center justify-between">
  //                     <span className="text-sm font-medium">Response Time</span>
  //                     <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
  //                       120ms
  //                     </Badge>
  //                   </div>
  //                   <div className="flex items-center justify-between">
  //                     <span className="text-sm font-medium">
  //                       Active Sessions
  //                     </span>
  //                     <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
  //                       1,247
  //                     </Badge>
  //                   </div>
  //                   <div className="flex items-center justify-between">
  //                     <span className="text-sm font-medium">
  //                       Database Status
  //                     </span>
  //                     <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
  //                       Healthy
  //                     </Badge>
  //                   </div>
  //                 </div>
  //               </CardContent>
  //             </Card>
  //             <Card className="animate-fade-in-up">
  //               <CardHeader>
  //                 <CardTitle className="gradient-text">
  //                   Security Alerts
  //                 </CardTitle>
  //                 <CardDescription>
  //                   Recent security events and notifications
  //                 </CardDescription>
  //               </CardHeader>
  //               <CardContent>
  //                 <div className="space-y-4">
  //                   <div className="flex items-start space-x-3">
  //                     <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
  //                     <div>
  //                       <p className="text-sm font-medium">
  //                         All systems secure
  //                       </p>
  //                       <p className="text-xs text-muted-foreground">
  //                         Last scan: 2 hours ago
  //                       </p>
  //                     </div>
  //                   </div>
  //                   <div className="flex items-start space-x-3">
  //                     <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2"></div>
  //                     <div>
  //                       <p className="text-sm font-medium">2FA reminder sent</p>
  //                       <p className="text-xs text-muted-foreground">
  //                         To 15 users without 2FA
  //                       </p>
  //                     </div>
  //                   </div>
  //                   <div className="flex items-start space-x-3">
  //                     <div className="h-2 w-2 rounded-full bg-blue-500 mt-2"></div>
  //                     <div>
  //                       <p className="text-sm font-medium">
  //                         Password policy updated
  //                       </p>
  //                       <p className="text-xs text-muted-foreground">
  //                         Minimum 12 characters required
  //                       </p>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </CardContent>
  //             </Card>
  //           </div>
  //         </main>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default AdminDashboard;
