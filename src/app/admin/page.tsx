'use client';

import { useState, useEffect, useCallback } from 'react';

interface ClientRequest {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  service?: string | null;
  budget?: string | null;
  message?: string | null;
  status: string;
}

interface Stats {
  totalRequests: number;
  pendingRequests: number;
  completedRequests: number;
  totalServices: number;
  recentRequests: ClientRequest[];
}

const TABS = ['overview', 'requests', 'services', 'pricing'] as const;
type Tab = (typeof TABS)[number];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/analytics/overview');
      setStats(await res.json());
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  }, []);

  const fetchRequests = useCallback(async () => {
    try {
      const res = await fetch('/api/clients');
      setRequests(await res.json());
    } catch (err) {
      console.error('Error fetching requests:', err);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    fetchRequests();
  }, [fetchStats, fetchRequests]);

  const updateRequestStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/clients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      fetchRequests();
      fetchStats();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  if (!stats) return <div style={{ padding: 40, textAlign: 'center', color: '#f0f2ff', background: '#0a0e1a', minHeight: '100vh' }}>Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0e1a', padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, padding: '0 20px' }}>
        <h1 style={{ color: '#f0f2ff', fontFamily: "'Exo 2', sans-serif", fontSize: '1.8rem', fontWeight: 800 }}>
          LaunchifyX <span style={{ color: '#4f8cff' }}>Admin</span>
        </h1>
        <button style={{
          padding: '10px 20px',
          background: 'linear-gradient(135deg, #4f8cff, #ff4d00)',
          border: 'none',
          borderRadius: 30,
          color: '#fff',
          cursor: 'pointer',
          fontWeight: 600,
        }}>
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 30, padding: '0 20px' }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 24px',
              background: activeTab === tab ? 'rgba(79,140,255,0.2)' : 'transparent',
              border: activeTab === tab ? '1px solid #4f8cff' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: 30,
              color: activeTab === tab ? '#4f8cff' : '#f0f2ff',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div style={{ padding: '0 20px' }}>
          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20, marginBottom: 30 }}>
            {[
              { label: 'Total Requests', value: stats.totalRequests, color: '#4f8cff' },
              { label: 'Pending', value: stats.pendingRequests, color: '#ff4d00' },
              { label: 'Completed', value: stats.completedRequests, color: '#22c55e' },
              { label: 'Active Services', value: stats.totalServices, color: '#ffb800' },
            ].map((stat, i) => (
              <div key={i} style={{
                background: 'rgba(13,22,51,0.6)',
                border: '1px solid rgba(79,140,255,0.15)',
                borderRadius: 20,
                padding: 24,
                backdropFilter: 'blur(20px)',
              }}>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: 8 }}>{stat.label}</div>
                <div style={{ color: stat.color, fontSize: '2.5rem', fontWeight: 800, fontFamily: "'Exo 2', sans-serif" }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Recent Requests */}
          <div style={{ background: 'rgba(13,22,51,0.6)', border: '1px solid rgba(79,140,255,0.15)', borderRadius: 20, padding: 24, backdropFilter: 'blur(20px)' }}>
            <h3 style={{ color: '#f0f2ff', marginBottom: 20, fontFamily: "'Exo 2', sans-serif" }}>Recent Requests</h3>
            {stats.recentRequests?.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {stats.recentRequests.map((req) => (
                  <div key={req.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px',
                    background: 'rgba(79,140,255,0.05)',
                    borderRadius: 12,
                    border: '1px solid rgba(79,140,255,0.1)',
                  }}>
                    <div>
                      <div style={{ color: '#f0f2ff', fontWeight: 600 }}>{req.name}</div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{req.email} • {req.service || 'General Inquiry'}</div>
                    </div>
                    <span style={{
                      padding: '6px 14px',
                      borderRadius: 20,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: req.status === 'pending' ? 'rgba(255,77,0,0.2)' : 'rgba(34,197,94,0.2)',
                      color: req.status === 'pending' ? '#ff4d00' : '#22c55e',
                      textTransform: 'uppercase',
                    }}>
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: 40 }}>No requests yet</div>
            )}
          </div>
        </div>
      )}

      {/* Requests Tab */}
      {activeTab === 'requests' && (
        <div style={{ padding: '0 20px' }}>
          <div style={{ background: 'rgba(13,22,51,0.6)', border: '1px solid rgba(79,140,255,0.15)', borderRadius: 20, padding: 24, backdropFilter: 'blur(20px)' }}>
            <h3 style={{ color: '#f0f2ff', marginBottom: 20, fontFamily: "'Exo 2', sans-serif" }}>All Client Requests</h3>
            {requests.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {requests.map((req) => (
                  <div key={req.id} style={{
                    padding: '20px',
                    background: 'rgba(79,140,255,0.05)',
                    borderRadius: 16,
                    border: '1px solid rgba(79,140,255,0.1)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div>
                        <div style={{ color: '#f0f2ff', fontWeight: 700, fontSize: '1.1rem' }}>{req.name}</div>
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>{req.email}</div>
                      </div>
                      <select
                        value={req.status}
                        onChange={(e) => updateRequestStatus(req.id, e.target.value)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: 20,
                          border: '1px solid rgba(79,140,255,0.3)',
                          background: 'rgba(13,22,51,0.8)',
                          color: '#f0f2ff',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    {req.company && <div style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Company: {req.company}</div>}
                    {req.service && <div style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Service: {req.service}</div>}
                    {req.budget && <div style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Budget: {req.budget}</div>}
                    {req.message && <div style={{ color: 'rgba(255,255,255,0.7)', marginTop: 12, padding: 12, background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>{req.message}</div>}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: 40 }}>No requests yet</div>
            )}
          </div>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div style={{ padding: '0 20px' }}>
          <div style={{ background: 'rgba(13,22,51,0.6)', border: '1px solid rgba(79,140,255,0.15)', borderRadius: 20, padding: 24, backdropFilter: 'blur(20px)' }}>
            <h3 style={{ color: '#f0f2ff', marginBottom: 20, fontFamily: "'Exo 2', sans-serif" }}>Manage Services</h3>
            <div style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: 40 }}>
              Services management coming soon...
            </div>
          </div>
        </div>
      )}

      {/* Pricing Tab */}
      {activeTab === 'pricing' && (
        <div style={{ padding: '0 20px' }}>
          <div style={{ background: 'rgba(13,22,51,0.6)', border: '1px solid rgba(79,140,255,0.15)', borderRadius: 20, padding: 24, backdropFilter: 'blur(20px)' }}>
            <h3 style={{ color: '#f0f2ff', marginBottom: 20, fontFamily: "'Exo 2', sans-serif" }}>Manage Pricing Plans</h3>
            <div style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: 40 }}>
              Pricing management coming soon...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
