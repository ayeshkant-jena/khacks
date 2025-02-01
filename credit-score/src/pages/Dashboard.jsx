import { useState, useEffect } from "react";
import { Menu, X, Home, BarChart, Settings } from "lucide-react";
import { Bar, Line, Pie } from "react-chartjs-2";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [lenderData, setLenderData] = useState(null);
  const [selectedLender, setSelectedLender] = useState(null);

  // Simulating data fetching for both charts and lender data
  useEffect(() => {
    const dummyChartData = {
      bar: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Monthly Income ($)",
            data: [5000, 7000, 8000, 6000, 9000, 10000],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      },
      pie: {
        labels: ["Paid", "Unpaid"],
        datasets: [
          {
            label: "Loan Repayment Probability",
            data: [75, 25], // 75% paid, 25% unpaid
            backgroundColor: ["#36A2EB", "#FF6384"],
          },
        ],
      },
      line: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Revenue Growth",
            data: [2000, 3000, 4000, 3500, 5000, 7000],
            borderColor: "rgba(255, 99, 132, 1)",
            fill: false,
          },
        ],
      },
    };
    setChartData(dummyChartData);

    // Simulating lender data
    const dummyLenderData = [
      {
        id: 1,
        name: "John Doe",
        loanAmount: 5000,
        loanStatus: "Paid",
        repaymentHistory: [2000, 1500, 1500],
      },
      {
        id: 2,
        name: "Jane Smith",
        loanAmount: 7000,
        loanStatus: "Unpaid",
        repaymentHistory: [0, 0, 0],
      },
    ];
    setLenderData(dummyLenderData);
  }, []);

  const handleLenderSelect = (lenderId) => {
    const lender = lenderData.find((lender) => lender.id === lenderId);
    setSelectedLender(lender);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>Dashboard</h2>
          <X className="close-icon" onClick={() => setSidebarOpen(false)} />
        </div>
        <nav className="sidebar-nav">
          <NavItem icon={Home} text="Home" />
          <NavItem icon={BarChart} text="Analytics" />
          <NavItem icon={Settings} text="Settings" />
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <div className="navbar">
          <Menu className="menu-icon" onClick={() => setSidebarOpen(true)} />
          <h1>Dashboard</h1>
        </div>

        {/* Content Area */}
        <div className="content-area">
          <DashboardCard title="Total Users" value="1,245" />
          <DashboardCard title="Revenue" value="$24,500" />
          <DashboardCard title="Orders" value="320" />

          {/* Lender Section */}
          <div className="lender-section">
            <h3>Select Lender</h3>
            <select
              onChange={(e) => handleLenderSelect(Number(e.target.value))}
              value={selectedLender ? selectedLender.id : ""}
            >
              <option value="">Select a lender</option>
              {lenderData &&
                lenderData.map((lender) => (
                  <option key={lender.id} value={lender.id}>
                    {lender.name}
                  </option>
                ))}
            </select>

            {selectedLender && (
              <div className="lender-details">
                <h4>Lender: {selectedLender.name}</h4>
                <p>Loan Amount: ${selectedLender.loanAmount}</p>
                <p>Status: {selectedLender.loanStatus}</p>
                <h5>Repayment History</h5>
                <ul>
                  {selectedLender.repaymentHistory.map((payment, index) => (
                    <li key={index}>Payment {index + 1}: ${payment}</li>
                  ))}
                </ul>

                {/* Display charts for the selected lender */}
                {chartData && (
                  <>
                    <div className="chart-container">
                      <h3>Monthly Income</h3>
                      <Bar data={chartData.bar} />
                    </div>
                    <div className="chart-container">
                      <h3>Loan Repayment Probability</h3>
                      <Pie data={chartData.pie} />
                    </div>
                    <div className="chart-container">
                      <h3>Revenue Trend</h3>
                      <Line data={chartData.line} />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Navbar item component
const NavItem = ({ icon: Icon, text }) => {
  return (
    <div className="nav-item">
      <Icon className="icon" />
      <span>{text}</span>
    </div>
  );
};

// Dashboard card component
const DashboardCard = ({ title, value }) => {
  return (
    <div className="dashboard-card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default Dashboard;
