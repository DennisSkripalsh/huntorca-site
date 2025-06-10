import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronRight,
  Check,
  Target,
  Search,
  Package,
  ArrowRight,
  X,
  Zap,
  Shield,
  TrendingUp,
  Sparkles,
  Users,
  Globe,
} from 'lucide-react';

export default function HuntOrca() {
  const timeoutRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    icp: '',
    website: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onMouse = (e) =>
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });

    window.addEventListener('scroll', onScroll);
    window.addEventListener('mousemove', onMouse);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouse);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const { name, email, company, icp } = formData;
    if (name && email && company && icp) {
      try {
        const res = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Network response not ok');
        setSubmitted(true);
        timeoutRef.current = setTimeout(() => {
          setShowForm(false);
          setSubmitted(false);
          setFormData({ name: '', email: '', company: '', icp: '', website: '' });
        }, 2000);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const stats = [
    { value: '10K+', label: 'Leads Delivered', gradient: 'from-primary to-secondary' },
    { value: '$2.5M', label: 'Revenue Generated', gradient: 'from-secondary to-accent' },
    { value: '0.3%', label: 'Bounce Rate', gradient: 'from-accent to-primary' },
  ];

  const steps = [
    {
      id: 1,
      icon: <Target className="w-12 h-12 text-primary" />,
      title: 'Define Your Dream Client',
      description: "Tell us your ICP. We'll understand every nuance.",
      gradient: 'from-primary to-secondary',
      delay: 0,
    },
    {
      id: 2,
      icon: <Search className="w-12 h-12 text-secondary" />,
      title: 'AI + Human Intelligence',
      description: 'Our hybrid approach finds hidden opportunities.',
      gradient: 'from-secondary to-accent',
      delay: 100,
    },
    {
      id: 3,
      icon: <Package className="w-12 h-12 text-accent" />,
      title: 'Ready-to-Convert Leads',
      description: 'Get enriched data with intent signals included.',
      gradient: 'from-accent to-primary',
      delay: 200,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-text font-sans overflow-x-hidden">
      {/* Example of mapping with keys */}
      <div className="stats-container">
        {stats.map((s) => (
          <div key={s.label} className={`stat bg-gradient-to-r ${s.gradient}`}>
            <div className="value">{s.value}</div>
            <div className="label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="steps-container">
        {steps.map((step) => (
          <div key={step.id} style={{ transitionDelay: `${step.delay}ms` }} className="step">
            {step.icon}
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="lead-form">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
            required
          />
          {/* ... other inputs ... */}
          <button type="submit" disabled={submitted}>
            {submitted ? 'Submitted' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
}
