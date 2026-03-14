import Header from '../components/Header';

const stats = [
  { label: 'Messages Received', value: 42, delta: '+18%' },
  { label: 'Profile Link Clicks', value: 128, delta: '+9%' },
  { label: 'Group Chat Reactions', value: 76, delta: '+25%' },
  { label: 'Inbox Reply Rate', value: '63%', delta: '+6%' },
];

const weeklyBars = [38, 55, 42, 68, 74, 59, 88];

export default function DashboardPage() {
  return (
    <>
      <Header title="Your weekly analytics" />
      <main className="container page-stack">
        <section className="panel">
          <h1>Weekly Dashboard</h1>
          <p>Track your anonymous engagement every week.</p>
          <div className="stats-grid">
            {stats.map((stat) => (
              <article key={stat.label} className="stat-card">
                <p>{stat.label}</p>
                <h2>{stat.value}</h2>
                <span>{stat.delta} vs last week</span>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>7-Day Message Activity</h2>
          <div className="chart-row" role="img" aria-label="Bar chart of 7-day anonymous message activity">
            {weeklyBars.map((height, index) => (
              <div key={index} className="chart-col-wrap">
                <div className="chart-col" style={{ height: `${height}%` }} />
                <small>D{index + 1}</small>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
